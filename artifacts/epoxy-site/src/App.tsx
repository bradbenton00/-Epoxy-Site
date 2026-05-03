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
            Elizabethtown <span>Epoxy Flooring</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#areas">Service Areas</a>
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
          <a href="#process" onClick={() => setMenuOpen(false)}>Our Process</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
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
          <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
          <div className="hero-phone">
            or call us now: <a href="tel:REPLACEPHONENUMBER">(XXX) XXX-XXXX</a>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon">✓</span> Licensed & Insured</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Free Estimates</div>
          <div className="trust-item"><span className="trust-icon">✓</span> 15+ Year Durability</div>
          <div className="trust-item"><span className="trust-icon">✓</span> Local & Veteran Owned</div>
        </div>
      </div>

      <section id="services">
        <div className="section-inner">
          <div className="section-label">Our Services</div>
          <div className="section-title">Epoxy & Floor Coating Solutions</div>
          <div className="section-desc">
            From residential garages to commercial warehouses, we deliver high-performance floor coatings
            that look great and hold up for years.
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Garage Floor Epoxy</h3>
              <p>The most popular upgrade for Elizabethtown homeowners. Our garage floor coatings resist stains, chemicals, hot tires, and daily wear. Available in dozens of colors and flake patterns.</p>
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
              <p>Seal out moisture and transform your basement into a clean, usable space. Our moisture-resistant epoxy systems are perfect for finished basements, workshops, and home gyms.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏭</div>
              <h3>Industrial Floor Systems</h3>
              <p>High-build epoxy systems for manufacturing, auto shops, and industrial facilities. Chemical resistant, slip resistant, and built to take a beating.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Decorative Flake & Metallic</h3>
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
              <p>Our commercial-grade epoxy and polyaspartic systems are built to handle vehicles, chemicals, and heavy foot traffic for over 15 years.</p>
            </div>
            <div className="why-item">
              <div className="why-number">Free</div>
              <h3>Estimates & Consultation</h3>
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

      <section id="areas" className="areas-section">
        <div className="section-inner">
          <div className="section-label">Service Areas</div>
          <div className="section-title">Proudly Serving Hardin County & Beyond</div>
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
            Fill out the form below or give us a call. We'll get back to you within an hour.
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
                  <strong style={{ fontSize: 18 }}>Thanks — we got your request.</strong>
                  <p style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }}>
                    We'll reach out within an hour during business hours to schedule your free estimate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="leadForm">
                  <input type="text" name="name" placeholder="Your Name *" required />
                  <input type="tel" name="phone" placeholder="Phone Number *" required />
                  <input type="email" name="email" placeholder="Email Address" />
                  <select name="service" defaultValue="">
                    <option value="" disabled>What type of floor? *</option>
                    <option>Garage Floor Epoxy</option>
                    <option>Commercial Epoxy Flooring</option>
                    <option>Polyaspartic Coating</option>
                    <option>Basement Floor Coating</option>
                    <option>Industrial Floor System</option>
                    <option>Decorative / Metallic Epoxy</option>
                    <option>Other</option>
                  </select>
                  <input type="text" name="sqft" placeholder="Approximate Square Footage" />
                  <textarea name="message" placeholder="Tell us about your project..." />
                  <button type="submit">Request Free Estimate</button>
                </form>
              )}
            </div>
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:REPLACEPHONENUMBER">(XXX) XXX-XXXX</a>
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
                  Free estimates with no pressure. Licensed and insured. Professional diamond grinding on every job. Commercial-grade materials only. Most jobs completed in a single day.
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
          <div className="footer-text">Licensed & Insured | Free Estimates | Serving Hardin County</div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
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
