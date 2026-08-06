/**
 * RENTER CONFIG — edit this file when handing the site to a new contractor.
 * Every phone number, business name, city, and link on the site comes from here.
 */
export const SITE = {
  businessName: "Elizabethtown Epoxy Flooring",
  phone: {
    display: "(502) 488-2621",
    tel: "+15024882621",
    digits: "5024882621",
  },
  city: "Elizabethtown",
  state: "KY",
  zip: "42701",
  county: "Hardin County",
  serviceArea: "Louisville, Elizabethtown & All of Central & Western Kentucky",
  serviceAreaShort: "Central & Western KY",
  googleReviewUrl: "https://g.page/r/CWhLb1jIlCywEAE/review",
  facebookUrl:
    "https://www.facebook.com/people/Elizabethtown-Epoxy-Flooring/61590315914006",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50532.26599088652!2d-85.89!3d37.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886849e5a1bcb7dd%3A0x32a5a809b98ae773!2sElizabethtown%2C%20KY%2042701!5e0!3m2!1sen!1sus!4v1",
  domainUrl: "https://elizabethtownepoxyflooring.com",
};

/**
 * Base URL for the Replit API server.
 * When the site is served from Cloudflare Pages, relative /api/* URLs won't
 * reach the Replit backend — so we use the deployed production URL by default.
 * Override via VITE_API_BASE_URL during local dev if you want to hit a
 * different backend (leave it unset to hit the live API server).
 */
export const API_BASE: string =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined) ??
  "https://epoxy-floor-quote.replit.app";
