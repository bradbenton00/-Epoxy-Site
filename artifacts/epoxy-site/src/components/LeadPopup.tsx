import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { API_BASE, SITE } from "../config";
import { trackLead } from "../lib/analytics";

const STORAGE_KEY = "eef_lead_popup_seen";

function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    const show = () => {
      if (triggered.current) return;
      triggered.current = true;
      setOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    const timer = window.setTimeout(show, 15000);

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload: Record<string, string> = {};
      formData.forEach((v, k) => {
        payload[k] = String(v);
      });
      payload["message"] = "Requested a free estimate via website popup.";
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead("popup");
      setSubmitted(true);
    } catch {
      setError(
        `Something went wrong. Please try again or call ${SITE.phone.display}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="lead-popup-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Free estimate offer"
    >
      <div className="lead-popup" onClick={(e) => e.stopPropagation()}>
        <button
          className="lead-popup-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="lead-popup-success">
            <span className="lead-popup-check"><Icon.Check /></span>
            <h3>You're all set!</h3>
            <p>
              Thanks — we got your request and will reach out shortly, usually
              within an hour during business hours.
            </p>
            <button
              className="lead-popup-btn"
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="lead-popup-badge">Free On-Site Estimate</div>
            <h3 className="lead-popup-title">
              Get Your Free Epoxy Floor Quote
            </h3>
            <p className="lead-popup-sub">
              No pressure, no obligation. Leave your details and we'll get right
              back to you — most quotes go out within the hour.
            </p>
            <form onSubmit={handleSubmit} className="lead-popup-form">
              <input type="text" name="name" placeholder="Your Name *" required />
              <input type="tel" name="phone" placeholder="Phone Number *" required />
              <input type="email" name="email" placeholder="Email Address *" required />
              <button
                type="submit"
                className="lead-popup-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Get My Free Estimate"}
              </button>
              {error && <p className="lead-popup-error">{error}</p>}
              <p className="lead-popup-note">
                <Icon.Shield /> Your information is private and never sold.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadPopup;
