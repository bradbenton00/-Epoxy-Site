import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../config";

type Msg = { from: "bot" | "user"; text: string };
type Step =
  | "menu"
  | "quote_name"
  | "quote_phone"
  | "quote_email"
  | "quote_details"
  | "submitting"
  | "done"
  | "error";

const PHONE_DISPLAY = SITE.phone.display;
const PHONE_TEL = SITE.phone.digits;

const QUICK_REPLIES: { label: string; reply: string }[] = [
  {
    label: "Get a free quote",
    reply:
      "Great — I can get a free on-site estimate scheduled. Most quotes are turned around within 24 hours. What's your first name?",
  },
  {
    label: "How much does it cost?",
    reply:
      "Most 2-car garages run $1,800–$3,200 depending on prep work and the coating system (basic flake vs. polyaspartic vs. metallic). Every quote is free and on-site so you get a real number, not a guess. If you'd like a quote, just tell me your first name.",
  },
  {
    label: "How long does it take?",
    reply:
      "Most residential garages are a one-day install. We diamond-grind in the morning, lay the base coat, broadcast flake, and top with polyaspartic — you can walk on it that evening and park on it in 24 hours. If you'd like a free quote, what's your first name?",
  },
  {
    label: "Do you serve my area?",
    reply:
      `We're based in ${SITE.city} and cover all of ${SITE.county} plus surrounding areas — no travel charge. If you'd like a free estimate, what's your first name?`,
  },
  {
    label: "Talk to someone now",
    reply: `You can reach us directly at ${PHONE_DISPLAY} — calls answered 7am–7pm, 7 days a week. Or leave your info and we'll call you back today. What's your first name?`,
  },
];

const STORAGE_KEY = "etown-epoxy-chat-v1";

const initialMessages: Msg[] = [
  {
    from: "bot",
    text: "Hi! 👋 I'm here to help with epoxy floor questions or get you a free quote. What can I help with?",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pulsed, setPulsed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [step, setStep] = useState<Step>("menu");
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    details?: string;
  }>({});
  const transcriptRef = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current.clear();
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          messages: Msg[];
          step: Step;
          lead: typeof lead;
          transcript: string[];
        };
        if (parsed.messages?.length) {
          setMessages(parsed.messages);
          setStep(
            parsed.step === "submitting" ? "quote_details" : parsed.step,
          );
          setLead(parsed.lead ?? {});
          transcriptRef.current = parsed.transcript ?? [];
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          messages,
          step,
          lead,
          transcript: transcriptRef.current,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [messages, step, lead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current && step !== "menu" && step !== "done" && step !== "error") {
      inputRef.current.focus();
    }
  }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
    } else if (lastFocusRef.current) {
      lastFocusRef.current.focus?.();
    }
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const pushMsg = (m: Msg) => {
    transcriptRef.current = [
      ...transcriptRef.current,
      `${m.from === "bot" ? "Bot" : "Visitor"}: ${m.text}`,
    ];
    setMessages((prev) => [...prev, m]);
  };

  const botSay = (text: string, delay = 350) => {
    schedule(() => pushMsg({ from: "bot", text }), delay);
  };

  const handleQuick = (label: string, reply: string) => {
    pushMsg({ from: "user", text: label });
    botSay(reply);
    setStep("quote_name");
  };

  const submitLead = async (finalLead: typeof lead) => {
    setStep("submitting");
    botSay("Got it — sending this over to the team now…");
    try {
      const message = [
        finalLead.details ?? "",
        "",
        "— Chatbot conversation —",
        ...transcriptRef.current,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalLead.name,
          phone: finalLead.phone,
          email: finalLead.email,
          service: "Chatbot Inquiry",
          message,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStep("done");
      botSay(
        `Thanks ${finalLead.name}! We'll be in touch within a few hours during business hours. For anything urgent, call ${PHONE_DISPLAY}.`,
      );
    } catch {
      setStep("error");
      botSay(
        `Hmm, I couldn't send that. Please call us directly at ${PHONE_DISPLAY} and we'll get you taken care of.`,
      );
    }
  };

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;
    pushMsg({ from: "user", text: value });
    setInput("");

    if (step === "quote_name") {
      const next = { ...lead, name: value };
      setLead(next);
      setStep("quote_phone");
      botSay(`Nice to meet you, ${value}. What's the best phone number to reach you?`);
    } else if (step === "quote_phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) {
        botSay("That doesn't look like a full phone number — can you include the area code?");
        return;
      }
      const next = { ...lead, phone: value };
      setLead(next);
      setStep("quote_email");
      botSay("Perfect. What's your email address?");
    } else if (step === "quote_email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        botSay("That email looks off — mind double-checking it?");
        return;
      }
      const next = { ...lead, email: value };
      setLead(next);
      setStep("quote_details");
      botSay(
        "Last question — anything you'd like us to know? (square footage, garage/basement, timeline, city, etc.) Or just type 'no' to skip.",
      );
    } else if (step === "quote_details") {
      const details = /^no?$/i.test(value) ? "" : value;
      const next = { ...lead, details };
      setLead(next);
      void submitLead(next);
    }
  };

  const reset = () => {
    clearTimers();
    sessionStorage.removeItem(STORAGE_KEY);
    transcriptRef.current = [];
    setMessages(initialMessages);
    setStep("menu");
    setLead({});
    setInput("");
  };

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <button
        ref={bubbleRef}
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="etown-chat-panel"
        onClick={toggleOpen}
        className={`chat-bubble ${pulsed && !open ? "chat-bubble-pulse" : ""}`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="etown-chat-panel"
          ref={panelRef}
          className="chat-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Elizabethtown Epoxy Flooring"
        >
          <div className="chat-header">
            <div className="chat-avatar" aria-hidden="true">EE</div>
            <div className="chat-header-text">
              <div className="chat-header-title">Elizabethtown Epoxy</div>
              <div className="chat-header-sub">
                <span className="chat-status-dot" /> Typically replies in minutes
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="chat-reset"
              title="Start over"
              aria-label="Start over"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="chat-reset"
              title="Close chat"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="chat-messages" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.from}`}>
                <div className="chat-msg-bubble">{m.text}</div>
              </div>
            ))}
            {step === "submitting" && (
              <div className="chat-msg chat-msg-bot">
                <div className="chat-msg-bubble chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {step === "menu" && (
            <div className="chat-quickreplies">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => handleQuick(q.label, q.reply)}
                  className="chat-quickreply"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {(step === "done" || step === "error") && (
            <div className="chat-quickreplies">
              <a href={`tel:${PHONE_TEL}`} className="chat-quickreply chat-quickreply-primary">
                Call {PHONE_DISPLAY}
              </a>
              <button type="button" onClick={reset} className="chat-quickreply">
                Ask another question
              </button>
            </div>
          )}

          {(step === "quote_name" ||
            step === "quote_phone" ||
            step === "quote_email" ||
            step === "quote_details") && (
            <form
              className="chat-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                type={
                  step === "quote_email"
                    ? "email"
                    : step === "quote_phone"
                      ? "tel"
                      : "text"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  step === "quote_name"
                    ? "Your first name"
                    : step === "quote_phone"
                      ? "Phone number"
                      : step === "quote_email"
                        ? "Email address"
                        : "Anything else? (or 'no')"
                }
                className="chat-input"
                autoComplete={
                  step === "quote_name"
                    ? "given-name"
                    : step === "quote_phone"
                      ? "tel"
                      : step === "quote_email"
                        ? "email"
                        : "off"
                }
              />
              <button type="submit" className="chat-send" aria-label="Send message" disabled={!input.trim()}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          )}

          <div className="chat-footer">
            Or call us at{" "}
            <a href={`tel:${PHONE_TEL}`} className="chat-footer-link">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
