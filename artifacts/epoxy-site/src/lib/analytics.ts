/** Fire a GA4 generate_lead event (no-op if gtag isn't loaded). */
export function trackLead(source: string): void {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", { lead_source: source });
  }
}
