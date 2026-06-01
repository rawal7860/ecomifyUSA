import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export type ReminderEmailPayload = {
  clientName: string;
  clientEmail: string;
  companyName: string;
  deadlineType: string;
  dueDate: string;
  daysRemaining: number;
};

const resend = new Resend(process.env.RESEND_API_KEY || "");
const cronSecret = process.env.CRON_SECRET;

function isAuthorizedCronRequest(req: NextApiRequest): boolean {
  if (!cronSecret) return false;
  const header = req.headers.authorization;
  if (typeof header !== "string") return false;
  const expected = `Bearer ${cronSecret}`;
  return header.length === expected.length && header === expected;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function urgencyText(daysRemaining: number) {
  if (daysRemaining <= 7) {
    return "This deadline is urgent and requires attention right away.";
  }

  if (daysRemaining <= 30) {
    return "This deadline is coming up soon. Please make sure you stay on track.";
  }

  return "This deadline is on the horizon — a gentle reminder to keep everything moving smoothly.";
}

function buildEmailHtml(payload: ReminderEmailPayload) {
  const urgency = urgencyText(payload.daysRemaining);
  // Escape every DB-sourced string interpolated into the HTML body.
  const safeClientName = escapeHtml(payload.clientName);
  const safeCompanyName = escapeHtml(payload.companyName);
  const safeDeadlineType = escapeHtml(payload.deadlineType);
  const safeDueDate = escapeHtml(payload.dueDate);

  return `
    <html>
      <body style="margin:0;padding:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f9ff;color:#0f172a;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f9ff;padding:32px 0;">
          <tr>
            <td align="center">
              <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(15,23,42,0.08);">
                <tr>
                  <td style="background:#eff6ff;padding:32px 40px;">
                    <h1 style="margin:0;font-size:28px;line-height:1.1;color:#0f172a;">Hi ${safeClientName},</h1>
                    <p style="margin:16px 0 0;font-size:16px;line-height:1.75;color:#334155;">This is a reminder from <strong>ecomifyUSA</strong> for your business <strong>${safeCompanyName}</strong>.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 40px;">
                    <div style="padding:24px;background:rgba(59,130,246,0.08);border-radius:20px;border:1px solid rgba(59,130,246,0.12);">
                      <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;">Upcoming deadline</p>
                      <p style="margin:12px 0 0;font-size:20px;font-weight:700;color:#0f172a;">${safeDeadlineType}</p>
                      <p style="margin:8px 0 0;font-size:15px;color:#475569;">Due ${safeDueDate} • ${payload.daysRemaining} day${payload.daysRemaining === 1 ? "" : "s"} remaining</p>
                    </div>

                    <div style="margin-top:24px;font-size:16px;line-height:1.8;color:#334155;">
                      <p style="margin:0 0 16px;">${urgency}</p>
                      <p style="margin:0 0 16px;">We recommend reviewing your documents and reaching out if anything needs immediate support.</p>
                    </div>

                    <a
                      href="https://wa.me/13072180376"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;background:#2563eb;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 16px 40px rgba(37,99,235,0.18);"
                    >
                      Message us on WhatsApp
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid rgba(15,23,42,0.04);">
                    <p style="margin:0;font-size:14px;color:#94a3b8;">If you have questions, reply to this email or use the WhatsApp link above. ecomifyUSA is here to keep your business compliant.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendReminderEmail(payload: ReminderEmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const html = buildEmailHtml(payload);
  const subject = `Reminder: ${payload.deadlineType} due in ${payload.daysRemaining} day${payload.daysRemaining === 1 ? "" : "s"}`;

  return resend.emails.send({
    from: "support@ecomifyusa.com",
    to: payload.clientEmail,
    subject,
    html,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthorizedCronRequest(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Partial<ReminderEmailPayload> | undefined;
  const clientName = typeof body?.clientName === "string" ? body.clientName : "";
  const clientEmail = typeof body?.clientEmail === "string" ? body.clientEmail : "";
  const companyName = typeof body?.companyName === "string" ? body.companyName : "";
  const deadlineType = typeof body?.deadlineType === "string" ? body.deadlineType : "";
  const dueDate = typeof body?.dueDate === "string" ? body.dueDate : "";
  const daysRemaining =
    typeof body?.daysRemaining === "number" ? body.daysRemaining : NaN;

  if (
    !clientName ||
    !clientEmail ||
    !companyName ||
    !deadlineType ||
    !dueDate ||
    Number.isNaN(daysRemaining)
  ) {
    return res.status(400).json({ error: "Missing or invalid payload fields." });
  }

  try {
    await sendReminderEmail({
      clientName,
      clientEmail,
      companyName,
      deadlineType,
      dueDate,
      daysRemaining,
    });
    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send reminder email.";
    return res.status(500).json({ error: message });
  }
}
