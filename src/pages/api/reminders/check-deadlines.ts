import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { sendReminderEmail, type ReminderEmailPayload } from "./send-email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Server-side cron route that reads client PII across ALL accounts. It MUST use
// the service-role key: the CRM tables (clients/companies/deadlines/...) are
// locked to service_role via RLS, so the public anon key cannot read them.
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const cronSecret = process.env.CRON_SECRET;

const REMINDER_DAYS = [7, 30, 60];

interface DeadlineSummary {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  deadlineType: string;
  deadlineDate: string;
  daysRemaining: number;
  status: string;
}

function isAuthorizedCronRequest(req: NextApiRequest): boolean {
  if (!cronSecret) return false;
  const header = req.headers.authorization;
  if (typeof header !== "string") return false;
  const expected = `Bearer ${cronSecret}`;
  // simple constant-time-ish check
  return header.length === expected.length && header === expected;
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unexpected error";
}

async function loadUpcomingDeadlines(): Promise<DeadlineSummary[]> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env vars are not configured");
  }
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
  const today = new Date();
  const maxDate = addDays(today, 60);
  const formattedToday = format(today, "yyyy-MM-dd");
  const formattedMaxDate = format(maxDate, "yyyy-MM-dd");

  const { data: deadlines, error } = await supabase
    .from("deadlines")
    .select("id,deadline_date,description,status,client_service_id")
    .gte("deadline_date", formattedToday)
    .lte("deadline_date", formattedMaxDate)
    .order("deadline_date", { ascending: true });

  if (error) {
    throw error;
  }
  if (!deadlines) {
    return [];
  }

  const results = await Promise.all(
    deadlines.map(async (deadline): Promise<DeadlineSummary | null> => {
      const dueDate = parseISO(deadline.deadline_date as string);
      const daysRemaining = differenceInCalendarDays(dueDate, today);

      const { data: service, error: serviceError } = await supabase
        .from("client_services")
        .select("client_id,service_name")
        .eq("id", deadline.client_service_id)
        .single();

      if (serviceError || !service) return null;

      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("name,email")
        .eq("id", service.client_id)
        .single();

      if (clientError || !client) return null;

      const { data: company } = await supabase
        .from("companies")
        .select("name")
        .eq("client_id", service.client_id)
        .single();

      return {
        id: deadline.id as string,
        clientName: client.name as string,
        clientEmail: client.email as string,
        companyName: (company?.name as string) || (service.service_name as string) || "Your company",
        deadlineType:
          (deadline.description as string) || (service.service_name as string) || "Deadline",
        deadlineDate: format(dueDate, "MMMM d, yyyy"),
        daysRemaining,
        status: deadline.status as string,
      };
    }),
  );

  return results.filter((r): r is DeadlineSummary => r !== null);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Both GET and POST require the cron secret — they expose PII and trigger email sends.
  if (!isAuthorizedCronRequest(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const upcoming = await loadUpcomingDeadlines();
      return res.status(200).json({ upcoming });
    } catch (err: unknown) {
      return res
        .status(500)
        .json({ error: getErrorMessage(err) });
    }
  }

  if (req.method === "POST") {
    try {
      const upcoming = await loadUpcomingDeadlines();
      const targets = upcoming.filter((item) =>
        REMINDER_DAYS.includes(item.daysRemaining),
      );

      const sent: Array<{ id: string; success: boolean; error?: string }> = [];

      for (const reminder of targets) {
        try {
          const payload: ReminderEmailPayload = {
            clientName: reminder.clientName,
            clientEmail: reminder.clientEmail,
            companyName: reminder.companyName,
            deadlineType: reminder.deadlineType,
            dueDate: reminder.deadlineDate,
            daysRemaining: reminder.daysRemaining,
          };
          await sendReminderEmail(payload);
          sent.push({ id: reminder.id, success: true });
        } catch (err: unknown) {
          sent.push({
            id: reminder.id,
            success: false,
            error: getErrorMessage(err),
          });
        }
      }

      return res.status(200).json({ sent, count: sent.length });
    } catch (err: unknown) {
      return res
        .status(500)
        .json({ error: getErrorMessage(err) });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
