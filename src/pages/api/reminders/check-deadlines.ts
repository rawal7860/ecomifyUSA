import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { sendReminderEmail, ReminderEmailPayload } from "./send-email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const REMINDER_DAYS = [7, 30, 60];

async function loadUpcomingDeadlines() {
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
    deadlines.map(async (deadline) => {
      const dueDate = parseISO(deadline.deadline_date as string);
      const daysRemaining = differenceInCalendarDays(dueDate, today);

      const { data: service, error: serviceError } = await supabase
        .from("client_services")
        .select("client_id,service_name")
        .eq("id", deadline.client_service_id)
        .single();

      if (serviceError || !service) {
        return null;
      }

      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("name,email")
        .eq("id", service.client_id)
        .single();

      if (clientError || !client) {
        return null;
      }

      const { data: company } = await supabase
        .from("companies")
        .select("name")
        .eq("client_id", service.client_id)
        .single();

      return {
        id: deadline.id,
        clientName: client.name,
        clientEmail: client.email,
        companyName: company?.name || service.service_name || "Your company",
        deadlineType: deadline.description || service.service_name || "Deadline",
        deadlineDate: format(dueDate, "MMMM d, yyyy"),
        daysRemaining,
        status: deadline.status,
      };
    })
  );

  return results.filter(Boolean) as Array<{
    id: string;
    clientName: string;
    clientEmail: string;
    companyName: string;
    deadlineType: string;
    deadlineDate: string;
    daysRemaining: number;
    status: string;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const upcoming = await loadUpcomingDeadlines();
      return res.status(200).json({ upcoming });
    } catch (error: any) {
      console.error("Load deadlines failed", error);
      return res.status(500).json({ error: error.message || "Unable to load upcoming deadlines." });
    }
  }

  if (req.method === "POST") {
    try {
      const upcoming = await loadUpcomingDeadlines();
      const targets = upcoming.filter((item) => REMINDER_DAYS.includes(item.daysRemaining));

      const sent = [] as Array<{ id: string; success: boolean; error?: string }>;

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
        } catch (error: any) {
          console.error("Reminder email send failed", reminder.id, error);
          sent.push({ id: reminder.id, success: false, error: error.message || "Failed to send" });
        }
      }

      return res.status(200).json({ sent, count: sent.length });
    } catch (error: any) {
      console.error("Send reminders failed", error);
      return res.status(500).json({ error: error.message || "Unable to send reminder emails." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
