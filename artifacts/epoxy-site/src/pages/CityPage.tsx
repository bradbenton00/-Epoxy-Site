import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Icon } from "../components/Icon";
import { cityBySlug, cities } from "../data/cities";

export default function CityPage() {
  const [, params] = useRoute("/epoxy-flooring/:slug");
  const city = params?.slug ? cityBySlug(params.slug) : undefined;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!city) return;
    const title = `Epoxy Flooring ${city.name}, ${city.state} | Garage Floors & Coatings`;
    const desc = `Professional epoxy and polyaspartic floor coatings in ${city.name}, ${city.state}. Diamond-ground prep, commercial-grade materials, written warranty. Free estimates — call (502) 286-9032.`;
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:url", `https://elizabethtownepoxyflooring.com/epoxy-flooring/${city.slug}/`, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setCanonical(`https://elizabethtownepoxyflooring.com/epoxy-flooring/${city.slug}/`);
    setLocalBusinessSchema(city);
    window.scrollTo(0, 0);
  }, [city]);

  if (!city) {
    return (
      <div style={{ padding: "100px 24px", textAlign: "center" }}>
        <h1>City page not found</h1>
        <p>
          <Link href="/" className="nav-cta">Back to home</Link>
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload: Record<string, string> = { source_city: city.name };
      formData.forEach((v, k) => {
        payload[k] = String(v);
      });
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
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
          <Link href="/" className="nav-logo">
            <span className="nav-logo-mark"><Icon.Logo /></span>
            <span className="nav-logo-text">
              Elizabethtown <span>Epoxy Flooring</span>
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/#about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#gallery">Gallery</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/#faq">FAQ</Link>
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
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/#gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <a href="tel:+15022869032" onClick={() => setMenuOpen(false)}>Call (502) 286-9032</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Free Estimate</a>
        </div>
      </nav>

      <section className="hero city-hero">
        <div className="hero-inner city-hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              SERVING {city.name.toUpperCase()}, KY · {city.zip}
            </div>
            <h1 className="hero-title">
              Epoxy Flooring in <span className="hero-title-accent">{city.name}, KY</span>
            </h1>
            <p className="hero-subtitle">
              Premium garage, basement, and commercial floor coatings installed by your local
              Elizabethtown epoxy crew — {city.distanceFromEtown}. Diamond-ground prep,
              commercial-grade resins, written warranty.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="hero-cta">Get Your Free {city.name} Estimate</a>
              <a href="tel:+15022869032" className="hero-cta-phone">
                <span className="hero-cta-phone-icon"><Icon.Phone /></span>
                (502) 286-9032
              </a>
            </div>
            <div className="hero-rating">
              <div className="hero-stars">
                {[...Array(5)].map((_, i) => <span key={i}><Icon.Star /></span>)}
              </div>
              <span><strong>5.0</strong> · Trusted by {city.county} homeowners &amp; businesses</span>
            </div>
          </div>
          <div className="hero-visual city-hero-visual">
            <div className="hero-image-card hero-image-1">
              <img src={city.heroImage} alt={`Epoxy floor coating installed in ${city.name}, KY`} />
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-item"><span className="trust-icon"><Icon.Shield /></span> Licensed &amp; Insured</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Check /></span> Free On-Site Estimates</div>
          <div className="trust-item"><span className="trust-icon"><Icon.Clock /></span> Most Jobs Done in 1 Day</div>
          <div className="trust-item"><span className="trust-icon"><Icon.MapPin /></span> Local to {city.county}</div>
        </div>
      </div>

      <section className="about-section">
        <div className="section-inner about-inner">
          <div className="about-text">
            <div className="section-label">{city.name} Floor Coatings</div>
            <h2 className="section-title">Your Local Epoxy Crew for {city.name}, KY</h2>
            <p className="about-lead">{city.intro}</p>
            <p>{city.localFlavor}</p>
            <p>
              We're based in Elizabethtown, so {city.name} is right in our daily service area —
              there's no long-distance travel charge, no waiting weeks for a quote, and no
              third-party subcontractors. The same crew that grinds your floor pours your epoxy
              and applies your top coat. Most {city.name} garage projects are completed in a
              single day and ready for foot traffic the next morning.
            </p>
            <div className="about-values">
              <div className="about-value">
                <div className="about-value-icon"><Icon.MapPin /></div>
                <div>
                  <strong>Right in our service area</strong>
                  <span>{city.distanceFromEtown}. No travel surcharge.</span>
                </div>
              </div>
              <div className="about-value">
                <div className="about-value-icon"><Icon.Shield /></div>
                <div>
                  <strong>Licensed &amp; Insured for {city.state}</strong>
                  <span>Fully covered for residential and commercial work in {city.county}.</span>
                </div>
              </div>
              <div className="about-value">
                <div className="about-value-icon"><Icon.Check /></div>
                <div>
                  <strong>Same-day quotes</strong>
                  <span>On-site visit and written estimate within 24 hours.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-image-main">
              <img src={city.heroImage} alt={`${city.name} KY epoxy garage floor`} loading="lazy" />
            </div>
            <div className="about-image-stat">
              <div className="about-stat-num">15+</div>
              <div className="about-stat-label">Year warranty<br/>on every install</div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-inner">
          <div className="section-label">{city.name} Services</div>
          <h2 className="section-title">Floor Coating Services in {city.name}</h2>
          <div className="section-desc">
            Every coating system we install in {city.name} starts with diamond grinding, full crack
            and patch repair, and a moisture-tested slab — never an acid etch shortcut.
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><Icon.Garage /></div>
              <h3>Garage Floor Epoxy</h3>
              <p>
                Full-flake and metallic garage systems for {city.name} homeowners. Hot-tire
                resistant, oil and gas resistant, and built to handle Kentucky's freeze-thaw cycles.
              </p>
              <ul>
                <li><Icon.Check /> Diamond-ground concrete prep</li>
                <li><Icon.Check /> 100%-solids commercial epoxy base</li>
                <li><Icon.Check /> Polyaspartic UV top coat option</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon"><Icon.Building /></div>
              <h3>Commercial Epoxy</h3>
              <p>
                Showrooms, retail, restaurants, auto bays, and warehouses across {city.county}.
                Installed after-hours when needed to avoid disrupting your business.
              </p>
              <ul>
                <li><Icon.Check /> Heavy-duty resin systems</li>
                <li><Icon.Check /> Anti-slip aggregate available</li>
                <li><Icon.Check /> After-hours scheduling</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon"><Icon.Bolt /></div>
              <h3>Polyaspartic Coatings</h3>
              <p>
                The premium upgrade for {city.name} garages — UV-stable, chemical resistant, and
                cures fast enough to drive on the next day. Will not yellow or chalk.
              </p>
              <ul>
                <li><Icon.Check /> 4× more abrasion-resistant than epoxy</li>
                <li><Icon.Check /> Same-day or next-day return to service</li>
                <li><Icon.Check /> 15+ year lifespan</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon"><Icon.Droplet /></div>
              <h3>Basement Floor Coatings</h3>
              <p>
                Seal {city.name} basement concrete against moisture, eliminate dust, and add a
                clean, finished surface ready for living space, gym, or workshop use.
              </p>
              <ul>
                <li><Icon.Check /> Moisture-mitigating primers</li>
                <li><Icon.Check /> Mold and mildew resistant</li>
                <li><Icon.Check /> Easy to clean and disinfect</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon"><Icon.Factory /></div>
              <h3>Industrial Floor Systems</h3>
              <p>
                Heavy-traffic shop, warehouse, and manufacturing floors throughout {city.county}.
                Mortar systems, urethane cements, and chemical-resistant coatings.
              </p>
              <ul>
                <li><Icon.Check /> Forklift &amp; pallet jack rated</li>
                <li><Icon.Check /> USDA / FDA compliant systems</li>
                <li><Icon.Check /> Full color &amp; line striping</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon"><Icon.Sparkle /></div>
              <h3>Decorative &amp; Metallic</h3>
              <p>
                High-end metallic and decorative finishes for {city.name} garages, sunrooms, and
                showrooms. One-of-a-kind looks no two floors are exactly alike.
              </p>
              <ul>
                <li><Icon.Check /> Copper, slate, pearl, ocean tones</li>
                <li><Icon.Check /> Custom color matching</li>
                <li><Icon.Check /> Decorative quartz &amp; flake blends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-inner">
          <div className="section-label">Local Coverage</div>
          <h2 className="section-title">Where We Work in {city.name}</h2>
          <div className="section-desc">
            Common project types and neighborhoods we cover throughout {city.name} and the
            surrounding {city.county} area.
          </div>
          <div className="why-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div className="why-card">
              <h3 style={{ marginBottom: 16 }}>Common {city.name} Projects</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {city.popularJobs.map((j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--gold-dark)", flexShrink: 0, width: 18, height: 18, marginTop: 2 }}><Icon.Check /></span>
                    <span>{j}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="why-card">
              <h3 style={{ marginBottom: 16 }}>{city.name} Neighborhoods We Serve</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {city.neighborhoods.map((n) => (
                  <li key={n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--gold-dark)", flexShrink: 0, width: 18, height: 18, marginTop: 2 }}><Icon.MapPin /></span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
                Don't see your area? We cover all of {city.county} — call us at (502) 286-9032
                to confirm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready for a New Floor in {city.name}?</h2>
        <p>Free, no-pressure estimate. Most {city.name} garages installed in a single day.</p>
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
          <div className="section-title">Get Your Free {city.name} Estimate</div>
          <div className="section-desc">
            Tell us about your {city.name} project and we'll get back to you within an hour during
            business hours.
          </div>
          <div className="contact-grid">
            <div className="contact-form">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon"><Icon.Check /></div>
                  <strong>Thanks — we got your request!</strong>
                  <p>
                    We'll reach out within an hour during business hours to discuss your {city.name}
                    project and schedule your free estimate.
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
                    <input type="text" name="zip" placeholder="ZIP Code" defaultValue={city.zip} />
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
                  <textarea name="message" placeholder={`Tell us about your ${city.name} project...`} />
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
              <h3>Serving {city.name}, KY</h3>
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
                  <div className="contact-label">Service Area</div>
                  <div className="contact-value">{city.name}, KY {city.zip}<br/>{city.county}</div>
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
                  <div className="contact-label">Distance</div>
                  <div className="contact-value">{city.distanceFromEtown}</div>
                </div>
              </div>
              <div className="contact-promise">
                <strong>Why {city.name} customers choose us</strong>
                <ul>
                  <li><Icon.Check /> Free estimates with no pressure</li>
                  <li><Icon.Check /> Licensed and fully insured in {city.state}</li>
                  <li><Icon.Check /> Diamond-ground prep on every job</li>
                  <li><Icon.Check /> Commercial-grade materials only</li>
                  <li><Icon.Check /> Most jobs done in a single day</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" style={{ background: "var(--light)" }}>
        <div className="section-inner">
          <div className="section-label">Other Service Areas</div>
          <h2 className="section-title">We Also Coat Floors In</h2>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/epoxy-flooring/${c.slug}/`}
                  className="service-card"
                  style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  <div className="service-icon"><Icon.MapPin /></div>
                  <h3>Epoxy Flooring {c.name}</h3>
                  <p>{c.distanceFromEtown}. {c.county}, {c.state} {c.zip}.</p>
                </Link>
              ))}
            <Link
              href="/"
              className="service-card"
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              <div className="service-icon"><Icon.MapPin /></div>
              <h3>Elizabethtown</h3>
              <p>Our home base. Hardin County, KY 42701.</p>
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-name">
                <span className="footer-logo-mark"><Icon.Logo /></span>
                <span>Elizabethtown <span className="gold">Epoxy Flooring</span></span>
              </div>
              <p className="footer-text">
                Professional epoxy and polyaspartic floor coatings serving {city.name} and all of
                {" "}{city.county}. Licensed, insured, and locally operated.
              </p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <Link href="/#services">Garage Floor Epoxy</Link>
              <Link href="/#services">Commercial Flooring</Link>
              <Link href="/#services">Polyaspartic Coatings</Link>
              <Link href="/#services">Basement Coatings</Link>
            </div>
            <div className="footer-col">
              <h4>Service Areas</h4>
              <Link href="/">Elizabethtown</Link>
              {cities.map((c) => (
                <Link key={c.slug} href={`/epoxy-flooring/${c.slug}`}>{c.name}</Link>
              ))}
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="tel:+15022869032" className="footer-contact-phone">(502) 286-9032</a>
              <div className="footer-contact-line">{city.name}, KY {city.zip}</div>
              <div className="footer-contact-line">Mon-Fri 7am-6pm</div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Elizabethtown Epoxy Flooring · Licensed &amp; Insured</div>
            <div><Link href="/">Home</Link></div>
          </div>
        </div>
      </footer>
    </>
  );
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setLocalBusinessSchema(city: { name: string; slug: string; county: string; state: string; zip: string }) {
  const id = "city-localbusiness-jsonld";
  document.getElementById(id)?.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://elizabethtownepoxyflooring.com/epoxy-flooring/${city.slug}#business`,
    name: `Elizabethtown Epoxy Flooring — ${city.name}`,
    image: "https://elizabethtownepoxyflooring.com/opengraph.jpg",
    url: `https://elizabethtownepoxyflooring.com/epoxy-flooring/${city.slug}`,
    telephone: "+1-502-286-9032",
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: city.state,
      containedInPlace: { "@type": "AdministrativeArea", name: city.county },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.zip,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "27",
    },
  });
  document.head.appendChild(script);
}
