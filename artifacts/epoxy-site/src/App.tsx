import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your inquiry. Please try again or call/email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Elizabethtown <span>Epoxy Flooring</span>
          </a>
          <div className="nav-links">
            <a href="#how">How It Works</a>
            <a href="#whatyouget">What You Get</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#claim" className="nav-cta">Claim This Site</a>
          </div>
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " show" : ""}`}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#whatyouget" onClick={() => setMenuOpen(false)}>What You Get</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#claim" onClick={() => setMenuOpen(false)}>Claim This Site</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">For Epoxy Contractors in Hardin County, KY</div>
          <h1>
            This Website is <span>For Rent</span> — and It Sends Epoxy Leads to One Local Contractor
          </h1>
          <p>
            ElizabethtownEpoxyFlooring.com is built to rank on Google for "epoxy flooring
            Elizabethtown KY" and similar searches. We rent the entire site — phone calls, form
            submissions, the works — to <strong>one</strong> epoxy contractor in the area at a time.
            Could be you.
          </p>
          <a href="#claim" className="hero-cta">Claim This Site</a>
          <div className="hero-phone">
            One contractor. Exclusive leads. Cancel anytime.
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon">✓</span> Exclusive to One Contractor</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Calls Forwarded to You</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Form Leads Emailed Instantly</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Month-to-Month, No Contract</div>
        </div>
      </div>

      <section id="how">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <div className="section-title">Rent the Site, Get the Leads</div>
          <div className="section-desc">
            We own and rank this website. You pay a flat monthly fee and every lead it generates
            goes straight to you — exclusively.
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>You Claim the Site</h3>
              <p>Reach out below. If the site is available in your area, we'll set up a quick call.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>We Forward the Leads</h3>
              <p>Phone number on the site forwards to your line. Form submissions email straight to you.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>You Quote & Close</h3>
              <p>Treat every lead like your own. You set the prices, do the work, keep 100% of the revenue.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Pay a Flat Monthly Rent</h3>
              <p>One simple monthly rate. No per-lead fees, no surprise charges, cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="whatyouget" className="areas-section">
        <div className="section-inner">
          <div className="section-label">What You Get</div>
          <div className="section-title">Everything You Need to Pick Up the Phone</div>
          <div className="section-desc">
            One flat monthly rent gets you the entire site and every lead it generates.
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📞</div>
              <h3>Exclusive Phone Calls</h3>
              <p>The phone number on this site forwards directly to your business line. Every caller is yours — no sharing, no bidding wars.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📨</div>
              <h3>Form Submissions Emailed</h3>
              <p>Every quote request from the contact form is delivered to your inbox in real time. Name, phone, project type, square footage — all the info you need to bid.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🥇</div>
              <h3>Top Google Rankings</h3>
              <p>We handle ongoing SEO so the site stays visible for high-intent searches like "epoxy garage floor Elizabethtown KY."</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Truly Exclusive</h3>
              <p>Only one contractor rents this site at a time. You're never competing with 5 other companies for the same lead.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Flat Monthly Rate</h3>
              <p>No per-lead pricing. No commissions on jobs you close. Pay one predictable monthly rent, keep 100% of the revenue.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛠️</div>
              <h3>We Handle the Tech</h3>
              <p>Hosting, updates, SEO, call forwarding, lead delivery — all included. You focus on coating floors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-inner">
          <div className="section-label">The Math</div>
          <div className="section-title">Why Renting a Ranked Site Beats Lead Services</div>
          <div className="section-desc">
            Compare it to what you're already paying for HomeAdvisor, Angi, or shared lead services.
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-number">1</div>
              <h3>One Contractor, Not Five</h3>
              <p>Lead-share platforms sell the same lead to 4-5 contractors. Here, every lead is exclusively yours.</p>
            </div>
            <div className="why-item">
              <div className="why-number">$0</div>
              <h3>Per-Lead Fees</h3>
              <p>You pay one flat monthly rent. No $80 charges every time someone fills out a form.</p>
            </div>
            <div className="why-item">
              <div className="why-number">100%</div>
              <h3>Of the Revenue is Yours</h3>
              <p>We don't take a cut of the jobs you close. Land a $6,000 garage? You keep $6,000.</p>
            </div>
            <div className="why-item">
              <div className="why-number">∞</div>
              <h3>Lead Volume</h3>
              <p>Get one call or twenty in a month — your monthly rent doesn't change.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="section-inner">
          <div className="section-label">Pricing</div>
          <div className="section-title">Simple, Custom Monthly Pricing</div>
          <div className="section-desc">
            One flat monthly rate based on this site's current Google traffic and lead volume —
            no per-lead fees, no commissions, no long-term contract.
          </div>
          <div
            style={{
              maxWidth: 520,
              margin: "0 auto",
              background: "var(--white)",
              border: "2px solid var(--gold)",
              borderRadius: 12,
              padding: 36,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(212, 168, 67, 0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "var(--gold-dark)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Exclusive Site Rental
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 38,
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              Custom Monthly Rate
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
              Priced based on current lead volume for this site
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 24px 0",
                textAlign: "left",
                display: "inline-block",
              }}
            >
              {[
                "Exclusive — only one contractor at a time",
                "All phone calls forwarded to your line",
                "All form submissions emailed instantly",
                "Ongoing SEO & site maintenance included",
                "Month-to-month, cancel with 30 days notice",
                "No per-lead fees, no job commissions",
              ].map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: 14,
                    color: "var(--charcoal)",
                    padding: "6px 0",
                    paddingLeft: 24,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "var(--gold)", fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#claim" className="hero-cta" style={{ display: "block" }}>
              Request Current Pricing
            </a>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="section-inner">
          <div className="section-label">FAQ</div>
          <div className="section-title">Common Questions From Contractors</div>
          <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
            <div className="service-card">
              <h3>How much does it cost?</h3>
              <p>It depends on the site's traffic and rankings. Reach out and we'll send you the current monthly rate for this property along with recent call/form volume.</p>
            </div>
            <div className="service-card">
              <h3>Am I locked in to a long contract?</h3>
              <p>No. It's month-to-month. Cancel anytime with 30 days notice.</p>
            </div>
            <div className="service-card">
              <h3>What if the leads aren't any good?</h3>
              <p>You'll see real call/form data before you commit. We're happy to do a short trial period so you can verify the lead quality yourself.</p>
            </div>
            <div className="service-card">
              <h3>What service area does the site cover?</h3>
              <p>Elizabethtown, Radcliff, Vine Grove, Fort Knox, and the rest of Hardin County plus surrounding areas — basically anyone Googling for epoxy flooring within a ~60 mile radius.</p>
            </div>
            <div className="service-card">
              <h3>What happens to the site if I cancel?</h3>
              <p>We rent it to another local epoxy contractor. The site, the domain, and the rankings stay with us — you're renting access to the lead flow, not buying the site.</p>
            </div>
            <div className="service-card">
              <h3>Can I customize the phone number or branding?</h3>
              <p>The phone number gets forwarded to your line. The site stays branded as a neutral local epoxy site — that's part of why it ranks so well.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Want Exclusive Epoxy Leads in Hardin County?</h2>
        <p>Claim this site before another local contractor does. One simple form below.</p>
        <a href="#claim" className="hero-cta">Claim This Site</a>
      </section>

      <section id="claim">
        <div className="section-inner">
          <div className="section-label">Claim This Site</div>
          <div className="section-title">Lock In Exclusive Leads in Your Area</div>
          <div className="section-desc">
            Tell us about your epoxy business. If the site is still available, we'll be in touch
            within 24 hours with current lead volume and pricing.
          </div>
          <div className="contact-grid">
            <div className="contact-form">
              {submitted ? (
                <div
                  style={{
                    background: "rgba(212,168,67,0.1)",
                    border: "1px solid rgba(212,168,67,0.3)",
                    borderRadius: 8,
                    padding: 24,
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--navy)",
                  }}
                >
                  <strong style={{ fontSize: 18 }}>Thanks — request received.</strong>
                  <p style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }}>
                    We'll reach out within 24 hours with current lead volume, pricing, and next steps.
                    If the site has already been claimed by another contractor, we'll let you know
                    and add you to the waitlist.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="leadForm">
                  <input type="text" name="name" placeholder="Your Name *" required />
                  <input type="text" name="company" placeholder="Business Name *" required />
                  <input type="tel" name="phone" placeholder="Phone Number *" required />
                  <input type="email" name="email" placeholder="Email Address *" required />
                  <input type="text" name="website" placeholder="Your Website (if any)" />
                  <select name="years" required defaultValue="">
                    <option value="" disabled>Years doing epoxy work *</option>
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                  <select name="capacity" required defaultValue="">
                    <option value="" disabled>How many jobs/month can you handle? *</option>
                    <option>1-3 jobs</option>
                    <option>4-8 jobs</option>
                    <option>9-15 jobs</option>
                    <option>15+ jobs</option>
                  </select>
                  <textarea name="message" placeholder="Anything else we should know? (service area, specialties, etc.)" />
                  <button type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Claim This Site"}
                  </button>
                  {error && (
                    <p style={{ fontSize: 13, color: "#c0392b", marginTop: 10, textAlign: "center" }}>
                      {error}
                    </p>
                  )}
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                    No payment now. We'll review and follow up within 24 hours.
                  </p>
                </form>
              )}
            </div>
            <div className="contact-info">
              <h3>What Happens Next</h3>
              <div className="contact-item">
                <span className="contact-icon">1️⃣</span>
                <span>We review your business to make sure you're a fit (licensed, insured, real epoxy work).</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">2️⃣</span>
                <span>We send you the current monthly rent and recent lead volume for this site.</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">3️⃣</span>
                <span>If you're in, we forward the phone and route form leads to your inbox — usually same day.</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">4️⃣</span>
                <span>You start getting exclusive epoxy leads from Hardin County. We handle the site.</span>
              </div>
              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: "rgba(212,168,67,0.08)",
                  border: "1px solid rgba(212,168,67,0.2)",
                  borderRadius: 8,
                }}
              >
                <strong
                  style={{
                    color: "var(--navy)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                  }}
                >
                  One contractor at a time.
                </strong>
                <p style={{ fontSize: 13, marginTop: 8, color: "var(--muted)" }}>
                  We only rent this site to one epoxy contractor in the Elizabethtown area. Once
                  it's claimed, it's off the market until that contractor cancels. First serious
                  inquiry usually wins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-name">
            Elizabethtown <span>Epoxy Flooring</span>
          </div>
          <div className="footer-text">
            This site is operated as a lead-generation property and rented exclusively to one
            licensed epoxy flooring contractor serving the Elizabethtown, KY area.
          </div>
          <div className="footer-links">
            <a href="#how">How It Works</a>
            <a href="#whatyouget">What You Get</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#claim">Claim This Site</a>
          </div>
          <div className="footer-text" style={{ marginTop: 16, fontSize: 11 }}>
            © 2026 Elizabethtown Epoxy Flooring. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
