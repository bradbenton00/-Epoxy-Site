import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Elizabethtown <span>Epoxy Pros</span>
          </a>
          <div className="nav-links">
            <a href="#how">How It Works</a>
            <a href="#services">Projects</a>
            <a href="#areas">Service Areas</a>
            <a href="#quote" className="nav-cta">Get Free Quotes</a>
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
          <a href="#services" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
          <a href="#quote" onClick={() => setMenuOpen(false)}>Get Free Quotes</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Elizabethtown & Hardin County, KY</div>
          <h1>
            Get Matched With <span>Trusted Epoxy Flooring Pros</span> Near You
          </h1>
          <p>
            Compare free, no-obligation quotes from vetted local epoxy and polyaspartic flooring
            contractors in the Elizabethtown area. One quick form — up to 3 quotes in 24 hours.
          </p>
          <a href="#quote" className="hero-cta">Get My Free Quotes</a>
          <div className="hero-phone">
            100% free for homeowners &amp; business owners — no obligation
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon">✓</span> Vetted Local Pros</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Up to 3 Free Quotes</div>
          <div className="trust-item"><span className="trust-icon">✓</span> No Obligation</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Replies in 24 Hours</div>
        </div>
      </div>

      <section id="how">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <div className="section-title">Free Quotes in 3 Easy Steps</div>
          <div className="section-desc">
            Skip the cold calls and confusing pricing. We'll connect you with the right local
            contractor for your project — fast.
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Tell Us About Your Project</h3>
              <p>Take 60 seconds to share what kind of floor you need coated and roughly how big it is.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>We Match You With Pros</h3>
              <p>We'll match your project with up to 3 vetted, insured epoxy contractors in your area.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Compare & Choose</h3>
              <p>Receive free quotes, compare options, and pick the contractor that's right for you.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="areas-section">
        <div className="section-inner">
          <div className="section-label">Project Types</div>
          <div className="section-title">Epoxy & Coating Projects We Match</div>
          <div className="section-desc">
            Whatever your project, we'll connect you with a contractor who specializes in it.
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Garage Floor Coating</h3>
              <p>Get quotes for residential garage epoxy and polyaspartic coatings — flake, solid color, or metallic finishes.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Commercial Epoxy</h3>
              <p>Quotes for warehouses, showrooms, restaurants, and retail spaces from contractors who handle commercial jobs.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Polyaspartic Coatings</h3>
              <p>Compare pros who offer same-day cure polyaspartic systems — perfect when downtime isn't an option.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Basement Floors</h3>
              <p>Find contractors who specialize in moisture-resistant basement epoxy for finished spaces, gyms, and workshops.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏭</div>
              <h3>Industrial & Auto Shops</h3>
              <p>Heavy-duty floor systems for manufacturing, mechanic shops, and industrial facilities — matched to specialists.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Decorative & Metallic</h3>
              <p>Want a high-end metallic or custom flake finish? We'll match you with pros who do decorative work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-inner">
          <div className="section-label">Why Use Us</div>
          <div className="section-title">The Easiest Way to Hire an Epoxy Contractor</div>
          <div className="section-desc">
            We do the homework so you don't have to. Every contractor in our network is vetted before
            we send you their quote.
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-number">3</div>
              <h3>Quotes to Compare</h3>
              <p>Get up to three competitive quotes from local contractors so you can compare pricing and approach.</p>
            </div>
            <div className="why-item">
              <div className="why-number">24h</div>
              <h3>Fast Response</h3>
              <p>Most homeowners hear back from matched contractors within 24 hours of submitting their project.</p>
            </div>
            <div className="why-item">
              <div className="why-number">100%</div>
              <h3>Free & No Obligation</h3>
              <p>Our service costs you nothing. You're never obligated to hire any of the pros we match you with.</p>
            </div>
            <div className="why-item">
              <div className="why-number">✓</div>
              <h3>Vetted Contractors</h3>
              <p>We only work with licensed, insured epoxy pros who have a track record of quality work in Kentucky.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="areas">
        <div className="section-inner">
          <div className="section-label">Service Areas</div>
          <div className="section-title">Matching Customers With Pros Across Central Kentucky</div>
          <div className="section-desc">
            We connect homeowners and businesses with epoxy flooring contractors throughout Hardin
            County and surrounding areas.
          </div>
          <div className="areas-list">
            {[
              "Elizabethtown","Radcliff","Vine Grove","Fort Knox","Hodgenville",
              "Shepherdsville","Bardstown","Lebanon Junction","Rineyville","Cecilia",
              "Sonora","West Point","Brandenburg","Hardin County","Meade County",
              "LaRue County","Bullitt County","Nelson County",
            ].map((a) => (
              <span className="area-tag" key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Your Free Quotes?</h2>
        <p>One quick form. Up to 3 free quotes from local epoxy pros. No obligation, ever.</p>
        <a href="#quote" className="hero-cta">Get My Free Quotes</a>
      </section>

      <section id="quote">
        <div className="section-inner">
          <div className="section-label">Free Quote Request</div>
          <div className="section-title">Tell Us About Your Project</div>
          <div className="section-desc">
            Fill out the form below and we'll match you with up to 3 vetted local epoxy contractors.
            It takes about 60 seconds — and it's completely free.
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
                  <strong style={{ fontSize: 18 }}>Thanks — we got your request!</strong>
                  <p style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }}>
                    We're matching you with local epoxy pros now. Expect to hear from up to 3 contractors
                    within the next 24 hours with free quotes for your project.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="leadForm">
                  <input type="text" name="name" placeholder="Your Name *" required />
                  <input type="tel" name="phone" placeholder="Phone Number *" required />
                  <input type="email" name="email" placeholder="Email Address *" required />
                  <input type="text" name="zip" placeholder="ZIP Code *" required />
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Project type *</option>
                    <option>Garage Floor Coating</option>
                    <option>Commercial Epoxy Flooring</option>
                    <option>Polyaspartic Coating</option>
                    <option>Basement Floor Coating</option>
                    <option>Industrial / Auto Shop Floor</option>
                    <option>Decorative / Metallic Epoxy</option>
                    <option>Not Sure Yet</option>
                  </select>
                  <select name="sqft" required defaultValue="">
                    <option value="" disabled>Approximate square footage *</option>
                    <option>Under 400 sq ft (1-car garage)</option>
                    <option>400-800 sq ft (2-car garage)</option>
                    <option>800-1,500 sq ft</option>
                    <option>1,500-3,000 sq ft</option>
                    <option>3,000+ sq ft (commercial)</option>
                    <option>Not sure</option>
                  </select>
                  <select name="timeline" defaultValue="">
                    <option value="" disabled>Timeline</option>
                    <option>ASAP</option>
                    <option>Within 2 weeks</option>
                    <option>Within 1 month</option>
                    <option>1-3 months</option>
                    <option>Just gathering quotes</option>
                  </select>
                  <textarea name="message" placeholder="Anything else we should know? (optional)" />
                  <button type="submit">Get My Free Quotes</button>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                    By submitting, you agree to be contacted by matched contractors about your project.
                  </p>
                </form>
              )}
            </div>
            <div className="contact-info">
              <h3>What Happens Next</h3>
              <div className="contact-item">
                <span className="contact-icon">1️⃣</span>
                <span>We review your project details (usually within an hour).</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">2️⃣</span>
                <span>We match you with up to 3 vetted local epoxy contractors.</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">3️⃣</span>
                <span>Contractors reach out directly with free quotes — usually within 24 hours.</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">4️⃣</span>
                <span>You compare quotes and choose. No obligation to hire anyone.</span>
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
                  Why homeowners use our service:
                </strong>
                <p style={{ fontSize: 13, marginTop: 8, color: "var(--muted)" }}>
                  No more cold-calling random contractors. We pre-screen every pro for licensing,
                  insurance, and quality. Free to use. No obligation. Compare and choose with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="map-section">
        <iframe
          title="Elizabethtown KY map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50532.26599088652!2d-85.89!3d37.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886849e5a1bcb7dd%3A0x32a5a809b98ae773!2sElizabethtown%2C%20KY%2042701!5e0!3m2!1sen!1sus!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-name">
            Elizabethtown <span>Epoxy Pros</span>
          </div>
          <div className="footer-text">
            We connect homeowners and businesses in Elizabethtown, KY with vetted local epoxy
            flooring contractors. Free to use. No obligation.
          </div>
          <div className="footer-text">
            Not a contractor — a free matching service for the Hardin County area.
          </div>
          <div className="footer-links">
            <a href="#how">How It Works</a>
            <a href="#services">Projects</a>
            <a href="#areas">Service Areas</a>
            <a href="#quote">Get Quotes</a>
          </div>
          <div className="footer-text" style={{ marginTop: 16, fontSize: 11 }}>
            © 2026 Elizabethtown Epoxy Pros. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
