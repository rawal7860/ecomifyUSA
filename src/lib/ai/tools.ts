import type Anthropic from "@anthropic-ai/sdk";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { COMPANY } from "./knowledge";

export const TOOL_DEFINITIONS: Anthropic.Tool[] = [
  {
    name: "lookup_order",
    description:
      "Look up the signed-in user's most recent orders by their user_id. Only call this when the user is authenticated (the system prompt will tell you).",
    input_schema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Max number of orders to return. Default 5, max 10.",
        },
      },
    },
  },
  {
    name: "capture_lead",
    description:
      "Save the user's contact details and current question to our support inbox. Use when the user asks something you can't answer, asks for human follow-up, or shares an email and wants a callback. Always confirm with the user before calling this.",
    input_schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The user's email address.",
        },
        name: {
          type: "string",
          description: "The user's name, if they shared it.",
        },
        message: {
          type: "string",
          description:
            "Short summary of what the user needs help with — one or two sentences.",
        },
      },
      required: ["email", "message"],
    },
  },
  {
    name: "handoff_to_support",
    description:
      "Email the full conversation to our human support team and tell the user they'll get a reply by email. Use only after capture_lead has succeeded and the user explicitly asks for a human.",
    input_schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The user's email so support can reply directly.",
        },
        urgency: {
          type: "string",
          enum: ["normal", "urgent"],
          description: "How urgent the user said this is. Default 'normal'.",
        },
      },
      required: ["email"],
    },
  },
];

/**
 * Server-side Supabase client for the chat lead insert.
 * Prefers the service-role key (bypasses RLS, never shipped to the browser);
 * falls back to the anon key, which still works because chat_leads has a public INSERT policy.
 */
function getSupabaseForLeadInsert(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getSupabaseAsUser(accessToken: string): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

export interface ToolContext {
  userId: string | null;
  userEmail: string | null;
  accessToken: string | null;
  conversationForEmail: Array<{ role: string; content: string }>;
  userAgent: string;
}

export async function runTool(
  name: string,
  input: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  switch (name) {
    case "lookup_order":
      return lookupOrder(input, ctx);
    case "capture_lead":
      return captureLead(input, ctx);
    case "handoff_to_support":
      return handoffToSupport(input, ctx);
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

async function lookupOrder(
  input: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  if (!ctx.userId || !ctx.accessToken) {
    return JSON.stringify({
      error: "User is not signed in. Tell them to sign in at /login first.",
    });
  }
  const supabase = getSupabaseAsUser(ctx.accessToken);
  if (!supabase) {
    return JSON.stringify({ error: "Database not configured." });
  }
  const limit = Math.min(Number(input.limit) || 5, 10);
  const { data, error } = await supabase
    .from("orders")
    .select(
      "order_number, business_name, service_type, state, status, payment_status, amount, created_at",
    )
    .eq("user_id", ctx.userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return JSON.stringify({ error: error.message });
  }
  if (!data || data.length === 0) {
    return JSON.stringify({
      orders: [],
      note: "No orders found for this user. Suggest /checkout to start one.",
    });
  }
  return JSON.stringify({ orders: data });
}

async function captureLead(
  input: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  const email = String(input.email || "").trim();
  const message = String(input.message || "").trim();
  const name = input.name ? String(input.name).trim() : null;

  if (!email || !message) {
    return JSON.stringify({
      error: "Email and message are required to capture a lead.",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return JSON.stringify({ error: "That email address doesn't look valid." });
  }

  const supabase = getSupabaseForLeadInsert();
  if (!supabase) {
    return JSON.stringify({ error: "Database not configured." });
  }

  const { error } = await supabase.from("chat_leads").insert({
    user_id: ctx.userId,
    email,
    name,
    message,
    conversation: ctx.conversationForEmail,
    user_agent: ctx.userAgent,
    source: "chat_widget",
  });

  if (error) {
    // Table missing or RLS misconfigured — log it so we don't lose the lead silently.
    console.warn("[chat] capture_lead failed:", error.message);
    return JSON.stringify({
      saved: false,
      fallback: true,
      message: `Couldn't save right now. Ask the user to email ${COMPANY.contact.email} or WhatsApp ${COMPANY.contact.whatsapp}.`,
    });
  }

  return JSON.stringify({
    saved: true,
    message: `Lead saved. Confirm to the user that our team will reply to ${email} within one business day.`,
  });
}

async function handoffToSupport(
  input: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  const email = String(input.email || "").trim();
  // Narrow safely instead of an unchecked `as string` — only "urgent" or "normal" reach the email subject.
  const urgency: "urgent" | "normal" = input.urgency === "urgent" ? "urgent" : "normal";

  if (!email) {
    return JSON.stringify({ error: "Need the user's email first." });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const supportEmail = process.env.SUPPORT_EMAIL || COMPANY.contact.email;
  // Resend's sandbox sender works without domain verification. Override once you've verified ecomifyusa.com.
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // The lead has already been captured by capture_lead. This step just emails support.
  if (!resendKey || resendKey.startsWith("re_placeholder")) {
    return JSON.stringify({
      emailed: false,
      message: `Email handoff isn't configured yet (no RESEND_API_KEY). Tell the user their question is saved and our team will reply to ${email}. Also share WhatsApp ${COMPANY.contact.whatsapp} for faster help.`,
    });
  }

  const transcript = ctx.conversationForEmail
    .map((m) => `[${m.role}] ${m.content}`)
    .join("\n\n");

  const subject = `[Chat handoff${urgency === "urgent" ? " — URGENT" : ""}] ${email}`;
  const html = `<p><strong>From:</strong> ${email}</p>
<p><strong>Urgency:</strong> ${urgency}</p>
<p><strong>User ID:</strong> ${ctx.userId ?? "(guest)"}</p>
<hr/>
<pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(transcript)}</pre>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${COMPANY.name} Assistant <${fromEmail}>`,
        to: [supportEmail],
        reply_to: email,
        subject,
        html,
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend ${response.status}: ${body}`);
    }
    return JSON.stringify({
      emailed: true,
      message: `Our team has been emailed and will reply to ${email}. For faster help they can also WhatsApp ${COMPANY.contact.whatsapp}.`,
    });
  } catch (err) {
    console.warn("[chat] handoff_to_support email failed:", err);
    return JSON.stringify({
      emailed: false,
      message: `Email send failed. Tell the user their question is saved and to WhatsApp ${COMPANY.contact.whatsapp} for fastest help.`,
    });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
