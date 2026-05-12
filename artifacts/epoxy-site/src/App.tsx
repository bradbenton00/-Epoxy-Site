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
        "Something went wrong sending your request. Please try again or call us at (502) 286-9032.",
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
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#faq">FAQ</a>
            <a href="#areas">Service Areas</a>
            <a href="tel:+15022869032" className="nav-phone">(502) 286-9032</a>
            <a href="#contact" className="nav-cta">Free Estimate</a>
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
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
          <a href="tel:+15022869032" onClick={() => setMenuOpen(false)}>Call (502) 286-9032</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Free Estimate</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Serving Elizabethtown & Hardin County</div>
          <h1>
            Professional <span>Epoxy Flooring</span> for Your Garage, Basement & Business
          </h1>
          <p>
            Transform your concrete floors with durable, beautiful epoxy and polyaspartic coatings.
            Built to last 15+ years. Free estimates for homes and businesses in the Elizabethtown area.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
            <a href="tel:+15022869032" className="hero-cta-phone">📞 (502) 286-9032</a>
          </div>
          <div className="hero-phone">
            Free, no-obligation estimates &middot; Most jobs done in a single day
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon">✓</span> Licensed &amp; Insured</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Free Estimates</div>
          <div className="trust-item"><span className="trust-icon">✓</span> 15+ Year Durability</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Local Hardin County</div>
        </div>
      </div>

      <section id="services">
        <div className="section-inner">
          <div className="section-label">Our Services</div>
          <div className="section-title">Epoxy &amp; Floor Coating Solutions</div>
          <div className="section-desc">
            From residential garages to commercial warehouses, we deliver high-performance floor
            coatings that look great and hold up for years.
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Garage Floor Epoxy</h3>
              <p>The most popular upgrade for Elizabethtown homeowners. Resists stains, chemicals, hot tires, and daily wear. Available in dozens of colors and flake patterns.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Commercial Epoxy Flooring</h3>
              <p>Heavy-duty floor coatings for warehouses, showrooms, restaurants, and retail spaces. Built to handle high traffic and meet commercial standards.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Polyaspartic Coatings</h3>
              <p>The fastest cure time in the industry. Polyaspartic coatings can be applied and ready for use in a single day — perfect for businesses that can't afford downtime.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Basement Floor Coating</h3>
              <p>Seal out moisture and transform your basement into a clean, usable space. Perfect for finished basements, workshops, and home gyms.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏭</div>
              <h3>Industrial Floor Systems</h3>
              <p>High-build epoxy systems for manufacturing, auto shops, and industrial facilities. Chemical resistant, slip resistant, and built to take a beating.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Decorative Flake &amp; Metallic</h3>
              <p>Make a statement with decorative flake patterns or stunning metallic epoxy finishes. Perfect for showrooms, man caves, and anywhere you want a high-end look.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-inner">
          <div className="section-label">Why Choose Us</div>
          <div className="section-title">Built to Last. Backed by Experience.</div>
          <div className="section-desc">
            We don't cut corners. Every floor we coat gets the preparation, materials, and attention it deserves.
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-number">100%</div>
              <h3>Surface Preparation</h3>
              <p>We diamond grind or shot blast every floor before coating. No shortcuts. Proper prep is why our floors last 15+ years.</p>
            </div>
            <div className="why-item">
              <div className="why-number">1-Day</div>
              <h3>Quick Turnaround</h3>
              <p>Most residential floors are completed in a single day. Polyaspartic options can be walked on in hours, not days.</p>
            </div>
            <div className="why-item">
              <div className="why-number">15+</div>
              <h3>Years of Durability</h3>
              <p>Our commercial-grade systems are built to handle vehicles, chemicals, and heavy foot traffic for over 15 years.</p>
            </div>
            <div className="why-item">
              <div className="why-number">Free</div>
              <h3>Estimates &amp; Consultation</h3>
              <p>We'll visit your property, measure your space, discuss your options, and give you a transparent quote — no pressure, no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <div className="section-title">From Bare Concrete to Beautiful in 4 Steps</div>
          <div className="section-desc">Our proven process ensures a flawless, long-lasting finish every time.</div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Free Consultation</h3>
              <p>We visit your property, assess your floor, discuss colors and options, and provide a free estimate.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Surface Preparation</h3>
              <p>We diamond grind or shot blast the concrete to create the perfect surface for maximum coating adhesion.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Coating Application</h3>
              <p>We apply your chosen epoxy or polyaspartic system — base coat, flake or metallic, and clear topcoat.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Walk-On Ready</h3>
              <p>Your new floor cures quickly. Most residential floors are ready for foot traffic within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="section-inner">
          <div className="section-label">Project Gallery</div>
          <div className="section-title">Recent Epoxy Floor Installations</div>
          <div className="section-desc">
            A look at the kind of finishes we deliver — flake systems, metallic epoxy, polyaspartic
            coatings, and commercial floors. Photos shown for reference; we'll build out a local
            project gallery as new jobs are completed.
          </div>
          <div className="gallery-grid">
            {[
              { src: "/gallery/garage-flake-gray.jpg", label: "Gray Flake Garage Floor", tag: "Residential" },
              { src: "/gallery/garage-metallic-blue.jpg", label: "Metallic Blue Epoxy Garage", tag: "Decorative" },
              { src: "/gallery/basement-polyaspartic.jpg", label: "Polyaspartic Basement Coating", tag: "Basement" },
              { src: "/gallery/garage-after-poly.jpg", label: "Polyaspartic Garage Finish", tag: "Residential" },
              { src: "/gallery/commercial-showroom.jpg", label: "High-Gloss Commercial Floor", tag: "Commercial" },
              { src: "/gallery/decorative-metallic.jpg", label: "Decorative Metallic Epoxy", tag: "Decorative" },
            ].map((g) => (
              <div className="gallery-item" key={g.src}>
                <img src={g.src} alt={g.label} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{g.tag}</span>
                  <span className="gallery-label">{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-inner">
          <div className="section-label">Common Questions</div>
          <div className="section-title">Epoxy Flooring FAQs</div>
          <div className="section-desc">
            Answers to the questions Elizabethtown homeowners and business owners ask us most often.
          </div>
          <div className="faq-list">
            {[
              {
                q: "How much does epoxy flooring cost in Elizabethtown, KY?",
                a: "For a typical 2-car garage in the Elizabethtown area (about 400-500 sq ft), professional epoxy flooring runs roughly $4-$8 per square foot installed, or about $1,800-$3,500 total. Pricing depends on the system you choose (standard epoxy vs. polyaspartic), the condition of your concrete, decorative options like flake or metallic, and prep work needed. We give free, transparent quotes — no high-pressure sales.",
              },
              {
                q: "How long does epoxy flooring last?",
                a: "A properly installed professional-grade epoxy or polyaspartic system lasts 15-20+ years in a residential garage with normal use. Commercial-grade systems hold up under heavy traffic and chemicals. The key is proper surface preparation — diamond grinding the concrete first, never just acid etching. That's why we never skip prep on any job.",
              },
              {
                q: "Epoxy vs. polyaspartic — which is better for my garage?",
                a: "Both are excellent. Epoxy is the most cost-effective option and offers the widest range of decorative looks. Polyaspartic cures faster (your garage can be back in use the same day instead of 2-3 days), is more UV stable, and has slightly better flexibility. For most Elizabethtown homeowners we recommend a hybrid system — epoxy base coat with a polyaspartic top coat — to get the best of both.",
              },
              {
                q: "How long until I can park on my new garage floor?",
                a: "With a polyaspartic system, you can walk on the floor in about 4-6 hours and park vehicles within 24 hours. Standard epoxy takes 24 hours for foot traffic and 3-5 days before you should park heavy vehicles on it. We'll give you exact timing for your specific install.",
              },
              {
                q: "Do you serve Radcliff, Vine Grove, Fort Knox, and the rest of Hardin County?",
                a: "Yes. We service all of Hardin County including Elizabethtown, Radcliff, Vine Grove, Fort Knox, Cecilia, Sonora, and Rineyville, plus surrounding counties (Meade, LaRue, Bullitt, Nelson) — roughly a 60-mile radius from Elizabethtown. There's no extra travel charge inside Hardin County.",
              },
              {
                q: "Will epoxy stick to my old, stained, or cracked concrete?",
                a: "In most cases yes. We diamond grind the surface to remove old sealers, oil stains, and weak top layers, then patch any cracks or pitting with a structural concrete repair compound before coating. Floors that look beyond saving usually clean up beautifully. We'll inspect your floor during the free estimate and tell you straight if it's a candidate.",
              },
              {
                q: "Is epoxy flooring slippery when wet?",
                a: "Standard epoxy can be slick when wet, but we add an aluminum oxide or silica anti-slip additive to the topcoat at no extra charge. The result is a floor with traction similar to a textured concrete pool deck — safe in wet conditions while still easy to clean.",
              },
              {
                q: "Can you apply epoxy in cold weather?",
                a: "Yes — we work year-round in Kentucky. Modern polyaspartic and low-temperature epoxy formulations cure properly down to about 35°F. For unheated garages in the dead of winter we use temporary heaters to maintain the working temperature. Most jobs in our area happen seamlessly from spring through fall.",
              },
              {
                q: "Do you offer a warranty on your epoxy floors?",
                a: "Yes. All of our residential installations come with a written warranty covering adhesion failure, peeling, and bubbling. Commercial systems include extended warranty options. We'll go over the specifics with you during your estimate.",
              },
              {
                q: "How do I get a free estimate?",
                a: "Easiest options: call (502) 286-9032 or fill out the form below. We'll usually respond within an hour during business hours, schedule a free on-site visit, measure your space, discuss color and finish options, and email you a written quote. No deposit, no pressure.",
              },
            ].map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="areas-section">
        <div className="section-inner">
          <div className="section-label">Service Areas</div>
          <div className="section-title">Proudly Serving Hardin County &amp; Beyond</div>
          <div className="section-desc">We provide professional epoxy flooring services throughout Central Kentucky.</div>
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
        <h2>Ready to Transform Your Floors?</h2>
        <p>Get a free, no-obligation estimate for your epoxy flooring project today.</p>
        <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
      </section>

      <section id="contact">
        <div className="section-inner">
          <div className="section-label">Contact Us</div>
          <div className="section-title">Get Your Free Estimate</div>
          <div className="section-desc">
            Fill out the form below and we'll get back to you within an hour during business hours.
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
                    We'll reach out within an hour during business hours to discuss your project
                    and schedule your free estimate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="leadForm">
                  <input type="text" name="name" placeholder="Your Name *" required />
                  <input type="tel" name="phone" placeholder="Phone Number *" required />
                  <input type="email" name="email" placeholder="Email Address *" required />
                  <input type="text" name="zip" placeholder="ZIP Code" />
                  <select name="service" required defaultValue="">
                    <option value="" disabled>What type of floor? *</option>
                    <option>Garage Floor Epoxy</option>
                    <option>Commercial Epoxy Flooring</option>
                    <option>Polyaspartic Coating</option>
                    <option>Basement Floor Coating</option>
                    <option>Industrial Floor System</option>
                    <option>Decorative / Metallic Epoxy</option>
                    <option>Not Sure Yet</option>
                  </select>
                  <select name="sqft" defaultValue="">
                    <option value="" disabled>Approximate square footage</option>
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
                  <textarea name="message" placeholder="Tell us about your project..." />
                  <button type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Request Free Estimate"}
                  </button>
                  {error && (
                    <p style={{ fontSize: 13, color: "#c0392b", marginTop: 10, textAlign: "center" }}>
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a
                  href="tel:+15022869032"
                  style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "none", fontSize: 18 }}
                >
                  (502) 286-9032
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Elizabethtown, KY 42701</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <span>Mon-Fri: 7am - 6pm | Sat: 8am - 2pm</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🗺️</span>
                <span>Serving a 60-mile radius from Elizabethtown</span>
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
                  Why customers choose us:
                </strong>
                <p style={{ fontSize: 13, marginTop: 8, color: "var(--muted)" }}>
                  Free estimates with no pressure. Licensed and insured. Professional diamond
                  grinding on every job. Commercial-grade materials only. Most jobs completed in
                  a single day.
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
            Elizabethtown <span>Epoxy Flooring</span>
          </div>
          <div className="footer-text">
            Professional epoxy and polyaspartic floor coatings in Elizabethtown, KY and surrounding areas.
          </div>
          <div className="footer-text">Licensed &amp; Insured | Free Estimates | Serving Hardin County</div>
          <div className="footer-text" style={{ marginTop: 12, fontSize: 16 }}>
            <a href="tel:+15022869032" style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "none" }}>
              📞 (502) 286-9032
            </a>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#faq">FAQ</a>
            <a href="#areas">Service Areas</a>
            <a href="#contact">Contact</a>
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
