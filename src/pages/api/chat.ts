import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import { TOOL_DEFINITIONS, runTool, type ToolContext } from "@/lib/ai/tools";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOOL_LOOPS = 4;
const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_MESSAGES = 30;

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: ClientMessage[];
  accessToken?: string | null;
}

interface ChatResponseBody {
  reply: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponseBody>,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ reply: "", error: "Method not allowed" });
  }

  // Rate limit: 20 messages per IP per minute. Tune as needed.
  const ip = getClientIp(req);
  const limit = rateLimit(`chat:${ip}`, 20, 60 * 1000);
  if (!limit.ok) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    return res.status(429).json({
      reply: `You're sending messages a bit fast — please wait ${limit.retryAfterSeconds}s and try again.`,
      error: "rate_limited",
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-ant-placeholder")) {
    return res.status(200).json({
      reply:
        "👋 The AI assistant isn't fully connected yet — the site owner needs to add an Anthropic API key. In the meantime, please WhatsApp us at +1 (307) 218-0376 or email support@ecomifyusa.com and we'll get back to you fast!",
    });
  }

  const body = req.body as ChatRequestBody | undefined;
  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return res
      .status(400)
      .json({ reply: "", error: "messages[] is required" });
  }

  // Sanitize incoming history: cap count, cap per-message length, validate shape.
  // The client can craft any payload; we don't want to let them blow up the context
  // window (cost) or inject malformed roles.
  const sanitizedMessages = body.messages
    .slice(-MAX_HISTORY_MESSAGES)
    .filter(
      (m): m is ClientMessage =>
        m != null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0,
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  if (sanitizedMessages.length === 0) {
    return res
      .status(400)
      .json({ reply: "", error: "no valid messages after sanitization" });
  }

  // Identify the user if they sent a Supabase access token.
  const accessToken = body.accessToken || null;
  let userId: string | null = null;
  let userEmail: string | null = null;

  if (accessToken) {
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supaUrl && supaKey) {
      try {
        const supabase = createClient(supaUrl, supaKey);
        const { data } = await supabase.auth.getUser(accessToken);
        if (data.user) {
          userId = data.user.id;
          userEmail = data.user.email ?? null;
        }
      } catch (err) {
        console.warn("[chat] token verify failed:", err);
      }
    }
  }

  const systemPrompt = buildSystemPrompt({ userId, userEmail });
  const anthropic = new Anthropic({ apiKey });

  // Convert sanitized message history into Anthropic format.
  const messages: Anthropic.MessageParam[] = sanitizedMessages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const toolCtx: ToolContext = {
    userId,
    userEmail,
    accessToken,
    conversationForEmail: sanitizedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    userAgent: String(req.headers["user-agent"] ?? ""),
  };

  try {
    let loops = 0;
    while (loops < MAX_TOOL_LOOPS) {
      loops++;

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        tools: TOOL_DEFINITIONS,
        messages,
      });

      const toolUses = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      );

      if (toolUses.length === 0 || response.stop_reason !== "tool_use") {
        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return res.status(200).json({
          reply: text || "Sorry, I didn't catch that. Could you rephrase?",
        });
      }

      // Echo the assistant turn (text + tool_use blocks) back into the message history.
      messages.push({ role: "assistant", content: response.content });

      // Execute each tool call and add tool_result blocks for the next turn.
      const toolResultBlocks: Anthropic.ToolResultBlockParam[] = [];
      for (const toolUse of toolUses) {
        const result = await runTool(
          toolUse.name,
          (toolUse.input ?? {}) as Record<string, unknown>,
          toolCtx,
        );
        toolResultBlocks.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: result,
        });
      }
      messages.push({ role: "user", content: toolResultBlocks });
    }

    return res.status(200).json({
      reply:
        "I hit my limit chasing that down. Could you email support@ecomifyusa.com so we can look into it?",
    });
  } catch (err) {
    console.error("[chat] handler error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown chat error";
    return res.status(500).json({
      reply:
        "Something went wrong on my end. Please WhatsApp +1 (307) 218-0376 or try again in a moment.",
      error: errorMessage,
    });
  }
}
