import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Stable, monotonic ids so React keys never collide or shift (array index keys
// reconcile incorrectly when messages are appended).
let messageCounter = 0;
const nextMessageId = () => `msg-${++messageCounter}`;

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi! I'm the ecomifyUSA assistant. Ask me about US LLC formation, EIN without SSN, sales tax compliance, Amazon/Walmart tax exemption, pricing, timelines — anything. How can I help?",
};

const QUICK_PROMPTS = [
  "How much does a Wyoming LLC cost?",
  "Can I get an EIN without SSN?",
  "Wyoming or Delaware — which is better?",
  "How long does formation take?",
];

export default function ChatWidget() {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  // Close the panel and return focus to the toggle button (a11y: focus restoration).
  function closePanel() {
    setOpen(false);
    // Defer so the button is mounted again before we focus it.
    requestAnimationFrame(() => toggleButtonRef.current?.focus());
  }

  // Keyboard handling for the open dialog: Escape closes, Tab is trapped inside the panel.
  function handlePanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closePanel();
      return;
    }
    if (e.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: nextMessageId(), role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m !== GREETING),
          accessToken: session?.access_token ?? null,
        }),
      });
      const data = (await response.json()) as { reply: string; error?: string };
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I didn't get a response. Try again or WhatsApp +1 (307) 218-0376.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content:
            "Network glitch — please try again, or WhatsApp +1 (307) 218-0376.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <style>{`
        @keyframes ec-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ec-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .ec-panel { animation: ec-fade-up 0.25s ease forwards; }
        .ec-dot { animation: ec-typing 1.2s ease-in-out infinite; display: inline-block; }
        .ec-dot:nth-child(2) { animation-delay: 0.15s; }
        .ec-dot:nth-child(3) { animation-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .ec-panel { animation: none; }
          .ec-dot { animation: none; }
        }
        .ec-input:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 1px;
          border-color: #2563eb;
        }
        @keyframes ec-breathe {
          0%, 100% { box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45); }
          50% { box-shadow: 0 4px 28px rgba(37, 211, 102, 0.75); }
        }
        .ec-breathe { animation: ec-breathe 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ec-breathe { animation: none; }
        }
      `}</style>

      {/* Concierge dock — bottom-right stack: WhatsApp (human) above AI chat */}
      {!open && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <a
            href="https://wa.me/13072180376?text=Hi%2C%20I%27m%20interested%20in%20forming%20a%20US%20LLC.%20Can%20you%20help%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="ec-breathe"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white" aria-hidden="true">
              <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4a11.4 11.4 0 0 1-5.8-1.58l-.42-.24-4.42 1.04 1.06-4.3-.28-.44A11.36 11.36 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.24-8.52c-.34-.18-2.02-1-2.34-1.1-.32-.12-.56-.18-.8.18-.22.34-.88 1.1-1.08 1.34-.2.22-.4.24-.74.08-.34-.18-1.44-.52-2.74-1.66-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.4.52-.6.18-.2.22-.34.34-.56.12-.22.06-.42-.02-.6-.08-.18-.8-1.92-1.1-2.62-.28-.68-.58-.58-.8-.6h-.68c-.22 0-.58.08-.9.42-.3.34-1.16 1.14-1.16 2.78s1.18 3.22 1.34 3.44c.18.22 2.34 3.56 5.66 4.98.8.34 1.42.54 1.9.7.8.26 1.52.22 2.1.14.64-.1 1.98-.82 2.26-1.6.28-.8.28-1.48.2-1.62-.1-.14-.3-.22-.64-.4z" />
            </svg>
          </a>
          <button
            ref={toggleButtonRef}
            onClick={() => setOpen(true)}
            aria-label="Open chat assistant"
            aria-haspopup="dialog"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              border: "none",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37, 99, 235, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <MessageCircle size={28} />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="ec-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ec-chat-title"
          onKeyDown={handlePanelKeyDown}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9998,
            width: "min(380px, calc(100vw - 56px))",
            height: "min(560px, calc(100vh - 56px))",
            background: "white",
            borderRadius: 20,
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              color: "white",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <div id="ec-chat-title" style={{ fontWeight: 700, fontSize: 14 }}>
                  ecomifyUSA Assistant
                </div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>
                  Powered by AI · Usually replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={closePanel}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: -8,
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              background: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}
            {sending && (
              <div
                role="status"
                aria-label="Assistant is typing"
                style={{
                  alignSelf: "flex-start",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  padding: "10px 14px",
                  fontSize: 14,
                  color: "#64748b",
                }}
              >
                <span className="ec-dot">●</span>
                <span className="ec-dot" style={{ marginLeft: 4 }}>●</span>
                <span className="ec-dot" style={{ marginLeft: 4 }}>●</span>
              </div>
            )}

            {messages.length <= 1 && !sending && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    style={{
                      textAlign: "left",
                      background: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: 10,
                      padding: "8px 12px",
                      fontSize: 13,
                      color: "#1e40af",
                      cursor: "pointer",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#eff6ff";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#3b82f6";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "white";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#cbd5e1";
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: "1px solid #e2e8f0",
              padding: 12,
              background: "white",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about LLCs, EIN, taxes…"
              aria-label="Type your message"
              rows={1}
              className="ec-input"
              style={{
                flex: 1,
                resize: "none",
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 14,
                fontFamily: "inherit",
                maxHeight: 120,
              }}
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send"
              style={{
                background: input.trim() && !sending ? "#2563eb" : "#cbd5e1",
                color: "white",
                border: "none",
                borderRadius: 12,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() && !sending ? "pointer" : "not-allowed",
                transition: "background 0.15s",
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
        background: isUser ? "#2563eb" : "white",
        color: isUser ? "white" : "#0f172a",
        border: isUser ? "none" : "1px solid #e2e8f0",
        borderRadius: 16,
        borderBottomRightRadius: isUser ? 4 : 16,
        borderBottomLeftRadius: isUser ? 16 : 4,
        padding: "10px 14px",
        fontSize: 14,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {content}
    </div>
  );
}
