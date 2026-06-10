import { useState } from "react";
import { Link } from "wouter";
import { cities } from "./data/cities";
import { Icon } from "./components/Icon";
import LeadPopup from "./components/LeadPopup";
import CostCalculator from "./components/CostCalculator";
import { SITE } from "./config";

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
        `Something went wrong sending your request. Please try again or call us at ${SITE.phone.display}.`,
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
              {SITE.city} <span>Epoxy Flooring</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#calculator">Pricing</a>
            <a href="#gallery">Gallery</a>
            <a href="#countertops">Countertops</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href={`tel:${SITE.phone.tel}`} className="nav-phone">{SITE.phone.display}</a>
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
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#calculator" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#countertops" onClick={() => setMenuOpen(false)}>Countertops</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
          <a href={`tel:${SITE.phone.tel}`} onClick={() => setMenuOpen(false)}>Call {SITE.phone.display}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Free Estimate</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" /> Serving {SITE.serviceArea}
            </div>
            <h1>
              Epoxy Garage Floors in {SITE.city}, {SITE.state}
            </h1>
            <p>
              Simple, affordable floor coatings done right by {SITE.state}-based pros. We make it easy —
              one free visit, one upfront price, most jobs finished in a single day. Garage, basement,
              and commercial floors built to last 15+ years, backed by a written warranty.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
              <a href={`tel:${SITE.phone.tel}`} className="hero-cta-phone">
                <span className="hero-cta-phone-icon"><Icon.Phone /></span>
                {SITE.phone.display}
              </a>
            </div>
            <div className="hero-rating">
              <div className="hero-stars">
                {[0,1,2,3,4].map(i => <span key={i} className="hero-star"><Icon.Star /></span>)}
              </div>
              <span className="hero-rating-text">5.0 · Trusted by {SITE.state} homeowners &amp; businesses</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-card">
              <img src="/gallery/garage-flake-gray.jpg" alt={`Gray flake epoxy garage floor coating in ${SITE.city} ${SITE.state}`} />
              <div className="hero-image-badge">
                <div className="hero-image-badge-num">15+</div>
                <div className="hero-image-badge-label">Year<br/>Durability</div>
              </div>
            </div>
            <div className="hero-image-card-sm">
              <img src="/gallery/concrete-grinding.jpg" alt="Diamond grinding concrete floor before epoxy coating" />
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><span className="trust-icon"><Icon.Shield /></span> Licensed &amp; Insured</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Check /></span> Free Estimates</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Clock /></span> 15+ Year Durability</div>
          <div className="trust-item"><span className="trust-icon"><Icon.MapPin /></span> {SITE.state} Owned &amp; Operated</div>
        </div>
      </div>

      <section id="about" className="about-section">
        <div className="section-inner about-inner">
          <div className="about-visual">
            <div className="about-image-main">
              <img src="/gallery/garage-flake-gray.jpg" alt={`Gray flake epoxy garage floor installed in ${SITE.city} ${SITE.state}`} loading="lazy" />
            </div>
            <div className="about-image-stat">
              <div className="about-stat-num">7+</div>
              <div className="about-stat-label">Years coating floors<br/>across {SITE.state}</div>
            </div>
          </div>
          <div className="about-text">
            <div className="section-label">About Us</div>
            <h2 className="section-title">Locally Owned. Built on Doing the Job Right.</h2>
            <p className="about-lead">
              {SITE.businessName} is a {SITE.state}-owned and operated floor coating company
              serving homeowners and businesses throughout {SITE.serviceArea}.
            </p>
            <p>
              We started this company because we kept seeing the same problem in garages all
              around {SITE.city} — beautiful epoxy jobs that started peeling and bubbling
              within a year or two because the installer skipped the prep. Concrete that's been
              acid-etched instead of diamond-ground will fail. Bargain-grade big-box materials
              will yellow and chip. So we built our business on the opposite philosophy: do the
              prep right, use commercial-grade resins, and stand behind the work in writing.
            </p>
            <p>
              Every project starts with a free on-site visit. We measure your space, talk through
              color and finish options (flake, metallic, solid, polyaspartic top coat), and email
              you a transparent written quote within 24 hours. No sales pitch, no deposit
              required, no surprises on install day. Most residential garages are completed in a
              single day and ready for foot traffic the next morning.
            </p>
            <p>
              Whether it's a 2-car garage, a basement workshop, an auto shop in {SITE.city}, or
              a 5,000 sq ft warehouse — we bring the same prep, the same materials, and the same
              workmanship to every job.
            </p>
            <div className="about-values">
              <div className="about-value">
                <div className="about-value-icon"><Icon.Shield /></div>
                <div>
                  <strong>Licensed &amp; Insured</strong>
                  <span>Fully covered for residential and commercial work.</span>
                </div>
              </div>
              <div className="about-value">
                <div className="about-value-icon"><Icon.MapPin /></div>
                <div>
                  <strong>{SITE.serviceAreaShort} Coverage</strong>
                  <span>Based in {SITE.city}, serving {SITE.serviceArea}.</span>
                </div>
              </div>
              <div className="about-value">
                <div className="about-value-icon"><Icon.Check /></div>
                <div>
                  <strong>Written Warranty</strong>
                  <span>Every install backed in writing, not just a handshake.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="section-inner">
          <div className="section-label">Our Services</div>
          <div className="section-title">Epoxy &amp; Floor Coating Solutions</div>
          <div className="section-desc">
            From a simple one-color garage floor to a full commercial warehouse, we keep it easy and
            affordable — high-performance coatings that look great and hold up for years.
          </div>
          <div className="services-grid">
            {[
              { icon: <Icon.Garage />, title: "Garage Floor Epoxy", desc: `The most popular upgrade for ${SITE.city} homeowners. Resists stains, chemicals, hot tires, and daily wear. Available in dozens of colors and flake patterns.` },
              { icon: <Icon.Building />, title: "Commercial Epoxy Flooring", desc: "Heavy-duty floor coatings for warehouses, showrooms, restaurants, and retail spaces. Built to handle high traffic and meet commercial standards." },
              { icon: <Icon.Bolt />, title: "Polyaspartic Coatings", desc: "The fastest cure time in the industry. Polyaspartic coatings can be applied and ready for use in a single day — perfect for businesses that can't afford downtime." },
              { icon: <Icon.Droplet />, title: "Basement Floor Coating", desc: "Seal out moisture and transform your basement into a clean, usable space. Perfect for finished basements, workshops, and home gyms." },
              { icon: <Icon.Factory />, title: "Industrial Floor Systems", desc: "High-build epoxy systems for manufacturing, auto shops, and industrial facilities. Chemical resistant, slip resistant, and built to take a beating." },
              { icon: <Icon.Sparkle />, title: "Decorative Flake & Metallic", desc: "Make a statement with decorative flake patterns or stunning metallic epoxy finishes. Perfect for showrooms, man caves, and anywhere you want a high-end look." },
              { icon: <Icon.Sparkle />, title: "Countertops", desc: "Seamless, heat- and scratch-resistant countertops with a glossy, custom-poured finish. A durable, one-of-a-kind look for kitchens, bars, bathrooms, and workspaces." },
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

      <CostCalculator />


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
              { src: "/gallery/concrete-grinding.jpg", label: "Diamond Grinding — Concrete Prep", tag: "Process" },
              { src: "/gallery/basement-polyaspartic.jpg", label: "Polyaspartic Basement Coating", tag: "Basement" },
              { src: "/gallery/garage-after-poly.jpg", label: "Polyaspartic Garage Finish", tag: "Residential" },
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

      <section id="countertops" className="countertops-section">
        <div className="section-inner">
          <div className="section-label">Countertops</div>
          <div className="section-title">Countertop Transformations — Before &amp; After</div>
          <div className="section-desc">
            Custom-poured countertops applied right over your existing surface — no demolition, no full
            replacement. Real kitchens we resurfaced across {SITE.city} and {SITE.serviceAreaShort}.
          </div>
          <div className="ba-grid">
            {[
              {
                before: "/gallery/countertops-white-before.jpg",
                after: "/gallery/countertops-white-after.jpg",
                beforeAlt: `Kitchen countertop before resurfacing in ${SITE.city}, ${SITE.state}`,
                afterAlt: `Kitchen countertop after resurfacing — white marble finish in ${SITE.city}, ${SITE.state}`,
                label: "White Marble Finish",
              },
              {
                before: "/gallery/countertops-oak-before.jpg",
                after: "/gallery/countertops-oak-after.jpg",
                beforeAlt: "Kitchen countertop before resurfacing — dated wood-laminate countertop with oak cabinets",
                afterAlt: "Kitchen countertop after resurfacing — high-gloss black and copper marble-look poured finish",
                label: "Black & Copper Finish",
              },
            ].map((b) => (
              <div className="ba-card" key={b.label}>
                <div className="ba-pair">
                  <figure className="ba-photo">
                    <img src={b.before} alt={b.beforeAlt} loading="lazy" width="1024" height="768" />
                    <figcaption className="ba-badge ba-badge-before">Before</figcaption>
                  </figure>
                  <figure className="ba-photo">
                    <img src={b.after} alt={b.afterAlt} loading="lazy" width="1024" height="768" />
                    <figcaption className="ba-badge ba-badge-after">After</figcaption>
                  </figure>
                </div>
                <div className="ba-label">{b.label}</div>
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
            Real feedback from {SITE.city} and {SITE.county} customers.
          </div>
          <div className="reviews-grid">
            {[
              {
                name: "Mark D.",
                location: `${SITE.city}, ${SITE.state}`,
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
            <a href={SITE.googleReviewUrl} target="_blank" rel="noopener" className="reviews-cta-btn">Leave us a Google review</a>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-inner">
          <div className="section-label">Common Questions</div>
          <div className="section-title">Epoxy Flooring FAQs</div>
          <div className="section-desc">
            Answers to the questions {SITE.city} homeowners and business owners ask us most often.
          </div>
          <div className="faq-list">
            {[
              {
                q: `How much does epoxy flooring cost in ${SITE.city}, ${SITE.state}?`,
                a: `For a typical 2-car garage in the ${SITE.city} area (about 400-500 sq ft), professional epoxy flooring runs roughly $4-$6 per square foot installed, or about $1,800-$2,700 total. These are estimates only — your exact price depends on the condition of your concrete, the finish you choose, and an on-site measurement. We give free, no-pressure quotes.`,
              },
              {
                q: "How long does epoxy flooring last?",
                a: "A properly installed professional-grade epoxy or polyaspartic system lasts 15-20+ years in a residential garage with normal use. Commercial-grade systems hold up under heavy traffic and chemicals. The key is proper surface preparation — diamond grinding the concrete first, never just acid etching. That's why we never skip prep on any job.",
              },
              {
                q: "Epoxy vs. polyaspartic — which is better for my garage?",
                a: `Both are excellent. Epoxy is the most cost-effective option and offers the widest range of decorative looks. Polyaspartic cures faster (your garage can be back in use the same day instead of 2-3 days), is more UV stable, and has slightly better flexibility. For most ${SITE.city} homeowners we recommend a hybrid system — epoxy base coat with a polyaspartic top coat — to get the best of both.`,
              },
              {
                q: "How long until I can park on my new garage floor?",
                a: "With a polyaspartic system, you can walk on the floor in about 4-6 hours and park vehicles within 24 hours. Standard epoxy takes 24 hours for foot traffic and 3-5 days before you should park heavy vehicles on it. We'll give you exact timing for your specific install.",
              },
              {
                q: `Do you serve ${SITE.serviceAreaShort}?`,
                a: `Yes — and a lot more. We service ${SITE.serviceArea} including Louisville and the entire Jefferson County metro, all of Hardin County (${SITE.city}, Radcliff, Vine Grove, Fort Knox, Cecilia, Sonora, Rineyville), Bullitt County (Shepherdsville, Mt Washington), Meade County (Brandenburg, Muldraugh), LaRue County (Hodgenville), Nelson County (Bardstown), and Grayson County (Leitchfield). There's no extra trip charge anywhere in our service area.`,
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
                a: `Yes — we work year-round in ${SITE.state}. Modern polyaspartic and low-temperature epoxy formulations cure properly down to about 35°F. For unheated garages in the dead of winter we use temporary heaters to maintain the working temperature. Most jobs in our area happen seamlessly from spring through fall.`,
              },
              {
                q: "Do you offer a warranty on your epoxy floors?",
                a: "Yes. All of our residential installations come with a written warranty covering adhesion failure, peeling, and bubbling. Commercial systems include extended warranty options. We'll go over the specifics with you during your estimate.",
              },
              {
                q: "How do I get a free estimate?",
                a: `Easiest options: call ${SITE.phone.display} or fill out the form below. We'll usually respond within an hour during business hours, schedule a free on-site visit, measure your space, discuss color and finish options, and email you a written quote. No deposit, no pressure.`,
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
          <div className="section-title">Serving {SITE.serviceArea}</div>
          <div className="section-desc">We provide professional epoxy flooring services across {SITE.state} — from the Louisville metro down through Hardin, LaRue, Nelson, Bullitt, Meade, and Grayson counties.</div>
          <div className="areas-list">
            <span className="area-tag"><Icon.MapPin />{SITE.city}</span>
            {cities.map((c) => (
              <Link key={c.slug} href={`/epoxy-flooring/${c.slug}/`} className="area-tag area-tag-link">
                <Icon.MapPin />{c.name}
              </Link>
            ))}
            {[
              "Lebanon Junction","Rineyville","Cecilia","Sonora","West Point",
              "Muldraugh","Hardin County","Jefferson County","Bullitt County",
              "Meade County","LaRue County","Nelson County","Grayson County",
            ].map((a) => (
              <span className="area-tag" key={a}><Icon.MapPin />{a}</span>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
            Looking for service in a specific city? See our dedicated pages for{" "}
            {cities.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/epoxy-flooring/${c.slug}/`} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  {c.name}
                </Link>
                {i < cities.length - 2 ? ", " : i === cities.length - 2 ? ", and " : "."}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Floors?</h2>
        <p>Getting started is simple — book a free, no-obligation quote today and we'll handle the rest.</p>
        <div className="cta-actions">
          <a href="#contact" className="hero-cta">Get Your Free Estimate</a>
          <a href={`tel:${SITE.phone.tel}`} className="hero-cta-phone">
            <span className="hero-cta-phone-icon"><Icon.Phone /></span>
            {SITE.phone.display}
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
                  <a href={`tel:${SITE.phone.tel}`} className="contact-value-strong">{SITE.phone.display}</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><Icon.MapPin /></span>
                <div>
                  <div className="contact-label">Based In</div>
                  <div className="contact-value">{SITE.city}, {SITE.state} {SITE.zip}</div>
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
                  <div className="contact-label">Service Area</div>
                  <div className="contact-value">{SITE.serviceArea}</div>
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
          title={`${SITE.city} ${SITE.state} map`}
          src={SITE.mapsEmbedUrl}
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
                <span>{SITE.city} <span className="gold">Epoxy Flooring</span></span>
              </div>
              <p className="footer-text">
                Professional epoxy and polyaspartic floor coatings in {SITE.city}, {SITE.state} and surrounding areas.
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
              <a href="#about">About</a>
              <a href="#gallery">Gallery</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
              <a href={SITE.facebookUrl} target="_blank" rel="noopener">Facebook</a>
            </div>
            <div className="footer-col">
              <h4>Service Areas</h4>
              {cities.map((c) => (
                <Link key={c.slug} href={`/epoxy-flooring/${c.slug}/`}>{c.name}</Link>
              ))}
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href={`tel:${SITE.phone.tel}`} className="footer-contact-phone">{SITE.phone.display}</a>
              <div className="footer-contact-line">{SITE.city}, {SITE.state} {SITE.zip}</div>
              <div className="footer-contact-line">Mon-Fri: 7am - 6pm</div>
              <div className="footer-contact-line">Sat: 8am - 2pm</div>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} {SITE.businessName}. All rights reserved.
          </div>
        </div>
      </footer>

      <div className="sticky-cta" role="region" aria-label="Quick contact">
        <a href={`tel:${SITE.phone.tel}`} className="sticky-cta-btn sticky-cta-call">
          <Icon.Phone />
          <span>Call {SITE.phone.display}</span>
        </a>
        <a href="#contact" className="sticky-cta-btn sticky-cta-quote">
          <span>Free Estimate</span>
        </a>
      </div>

      <LeadPopup />
    </>
  );
}

export default App;
