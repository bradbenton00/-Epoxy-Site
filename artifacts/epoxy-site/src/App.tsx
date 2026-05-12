import { useState } from "react";

const Icon = {
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Garage: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10 12 4l9 6v10H3z" />
      <rect x="6" y="13" width="12" height="6" rx="1" />
      <line x1="6" y1="16" x2="18" y2="16" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <line x1="9" y1="7" x2="9" y2="7" /><line x1="15" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="9" y2="11" /><line x1="15" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="9" y2="15" /><line x1="15" y1="15" x2="15" y2="15" />
      <path d="M10 21v-4h4v4" />
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Droplet: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Factory: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V10l5 3V10l5 3V7l8 5v9z" />
      <line x1="7" y1="17" x2="7" y2="17" /><line x1="12" y1="17" x2="12" y2="17" /><line x1="17" y1="17" x2="17" y2="17" />
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Logo: () => (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8c96a" />
          <stop offset="100%" stopColor="#b8922e" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="34" height="34" rx="8" fill="#1a2332" stroke="url(#logoGrad)" strokeWidth="2" />
      <path d="M10 26 L20 12 L30 26 Z" fill="url(#logoGrad)" />
      <rect x="10" y="26" width="20" height="2.5" fill="url(#logoGrad)" />
    </svg>
  ),
};

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
            <span className="nav-logo-mark"><Icon.Logo /></span>
            <span className="nav-logo-text">
              Elizabethtown <span>Epoxy Flooring</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#reviews">Reviews</a>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " show" : ""}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
          <a href="tel:+15022869032" onClick={() => setMenuOpen(false)}>Call (502) 286-9032</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Free Estimate</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" /> Serving Elizabethtown &amp; Hardin County
            </div>
            <h1>
              Premium <span>Epoxy Floors</span> Built to Last in Central Kentucky
            </h1>
            <p>
              Garage, basement, and commercial floor coatings installed by local pros. Diamond-ground
              prep, commercial-grade materials, and a 15+ year finish — backed by a written warranty.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
              <a href="tel:+15022869032" className="hero-cta-phone">
                <span className="hero-cta-phone-icon"><Icon.Phone /></span>
                (502) 286-9032
              </a>
            </div>
            <div className="hero-rating">
              <div className="hero-stars">
                {[0,1,2,3,4].map(i => <span key={i} className="hero-star"><Icon.Star /></span>)}
              </div>
              <span className="hero-rating-text">5.0 · Trusted by Hardin County homeowners &amp; businesses</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-card">
              <img src="/gallery/garage-metallic-blue.jpg" alt="Metallic blue epoxy garage floor in Elizabethtown KY" />
              <div className="hero-image-badge">
                <div className="hero-image-badge-num">15+</div>
                <div className="hero-image-badge-label">Year<br/>Durability</div>
              </div>
            </div>
            <div className="hero-image-card-sm">
              <img src="/gallery/garage-flake-gray.jpg" alt="Gray flake garage floor coating" />
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon"><Icon.Shield /></span> Licensed &amp; Insured</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Check /></span> Free Estimates</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Clock /></span> 15+ Year Durability</div>
          <div className="trust-item"><span className="trust-icon"><Icon.MapPin /></span> Local Hardin County</div>
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
            {[
              { icon: <Icon.Garage />, title: "Garage Floor Epoxy", desc: "The most popular upgrade for Elizabethtown homeowners. Resists stains, chemicals, hot tires, and daily wear. Available in dozens of colors and flake patterns." },
              { icon: <Icon.Building />, title: "Commercial Epoxy Flooring", desc: "Heavy-duty floor coatings for warehouses, showrooms, restaurants, and retail spaces. Built to handle high traffic and meet commercial standards." },
              { icon: <Icon.Bolt />, title: "Polyaspartic Coatings", desc: "The fastest cure time in the industry. Polyaspartic coatings can be applied and ready for use in a single day — perfect for businesses that can't afford downtime." },
              { icon: <Icon.Droplet />, title: "Basement Floor Coating", desc: "Seal out moisture and transform your basement into a clean, usable space. Perfect for finished basements, workshops, and home gyms." },
              { icon: <Icon.Factory />, title: "Industrial Floor Systems", desc: "High-build epoxy systems for manufacturing, auto shops, and industrial facilities. Chemical resistant, slip resistant, and built to take a beating." },
              { icon: <Icon.Sparkle />, title: "Decorative Flake & Metallic", desc: "Make a statement with decorative flake patterns or stunning metallic epoxy finishes. Perfect for showrooms, man caves, and anywhere you want a high-end look." },
            ].map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
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
            coatings, and commercial floors.
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

      <section id="reviews" className="reviews-section">
        <div className="section-inner">
          <div className="section-label">Customer Reviews</div>
          <div className="section-title">What Local Homeowners Are Saying</div>
          <div className="section-desc">
            Real feedback from Elizabethtown and Hardin County customers.
          </div>
          <div className="reviews-grid">
            {[
              {
                name: "Mark D.",
                location: "Elizabethtown, KY",
                service: "2-Car Garage Epoxy",
                quote: "Easily the best money I've spent on the house. They ground the concrete down to bare surface and the gray flake finish looks like a showroom. Two years in and it still wipes clean with a mop.",
              },
              {
                name: "Jennifer R.",
                location: "Radcliff, KY",
                service: "Basement Polyaspartic",
                quote: "We finished our basement and needed something tough but attractive. The polyaspartic coating was done in a day and we walked on it the next morning. Professional from quote to cleanup.",
              },
              {
                name: "Travis B.",
                location: "Vine Grove, KY",
                service: "Auto Shop Floor",
                quote: "Coated about 1,800 sq ft of my shop. Holds up to oil, brake fluid, dropped tools, you name it. Crew was punctual, clean, and the price came in right where they quoted. Highly recommend.",
              },
            ].map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-stars">
                  {[0,1,2,3,4].map(i => <span key={i}><Icon.Star /></span>)}
                </div>
                <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
                <div className="review-meta">
                  <div className="review-author">{r.name}</div>
                  <div className="review-detail">{r.service} · {r.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-cta">
            <span className="reviews-cta-stars">
              {[0,1,2,3,4].map(i => <span key={i}><Icon.Star /></span>)}
            </span>
            <span className="reviews-cta-text"><strong>5.0 average</strong> · Based on customer feedback</span>
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
              <span className="area-tag" key={a}><Icon.MapPin />{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Floors?</h2>
        <p>Get a free, no-obligation estimate for your epoxy flooring project today.</p>
        <div className="cta-actions">
          <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
          <a href="tel:+15022869032" className="hero-cta-phone">
            <span className="hero-cta-phone-icon"><Icon.Phone /></span>
            (502) 286-9032
          </a>
        </div>
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
                <div className="contact-success">
                  <div className="contact-success-icon"><Icon.Check /></div>
                  <strong>Thanks — we got your request!</strong>
                  <p>
                    We'll reach out within an hour during business hours to discuss your project
                    and schedule your free estimate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="leadForm">
                  <div className="form-row">
                    <input type="text" name="name" placeholder="Your Name *" required />
                    <input type="tel" name="phone" placeholder="Phone Number *" required />
                  </div>
                  <div className="form-row">
                    <input type="email" name="email" placeholder="Email Address *" required />
                    <input type="text" name="zip" placeholder="ZIP Code" />
                  </div>
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
                  <div className="form-row">
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
                  </div>
                  <textarea name="message" placeholder="Tell us about your project..." />
                  <button type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Request Free Estimate"}
                  </button>
                  <p className="form-note">
                    <Icon.Shield /> Your information is private and never sold.
                  </p>
                  {error && <p className="form-error">{error}</p>}
                </form>
              )}
            </div>
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <span className="contact-icon"><Icon.Phone /></span>
                <div>
                  <div className="contact-label">Call or Text</div>
                  <a href="tel:+15022869032" className="contact-value-strong">(502) 286-9032</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Icon.MapPin /></span>
                <div>
                  <div className="contact-label">Based In</div>
                  <div className="contact-value">Elizabethtown, KY 42701</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Icon.Clock /></span>
                <div>
                  <div className="contact-label">Hours</div>
                  <div className="contact-value">Mon-Fri: 7am - 6pm<br/>Sat: 8am - 2pm</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Icon.Map /></span>
                <div>
                  <div className="contact-label">Service Radius</div>
                  <div className="contact-value">60-mile radius from Elizabethtown</div>
                </div>
              </div>
              <div className="contact-promise">
                <strong>Why customers choose us</strong>
                <ul>
                  <li><Icon.Check /> Free estimates with no pressure</li>
                  <li><Icon.Check /> Licensed and fully insured</li>
                  <li><Icon.Check /> Diamond-ground prep on every job</li>
                  <li><Icon.Check /> Commercial-grade materials only</li>
                  <li><Icon.Check /> Most jobs done in a single day</li>
                </ul>
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
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-name">
                <span className="footer-logo-mark"><Icon.Logo /></span>
                <span>Elizabethtown <span className="gold">Epoxy Flooring</span></span>
              </div>
              <p className="footer-text">
                Professional epoxy and polyaspartic floor coatings in Elizabethtown, KY and surrounding areas.
                Licensed, insured, and locally operated.
              </p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">Garage Floor Epoxy</a>
              <a href="#services">Commercial Flooring</a>
              <a href="#services">Polyaspartic Coatings</a>
              <a href="#services">Basement Coatings</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#gallery">Gallery</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
              <a href="#areas">Service Areas</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="tel:+15022869032" className="footer-contact-phone">(502) 286-9032</a>
              <div className="footer-contact-line">Elizabethtown, KY 42701</div>
              <div className="footer-contact-line">Mon-Fri: 7am - 6pm</div>
              <div className="footer-contact-line">Sat: 8am - 2pm</div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 Elizabethtown Epoxy Flooring. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
