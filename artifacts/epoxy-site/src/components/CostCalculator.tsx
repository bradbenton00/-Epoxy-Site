import { useState } from "react";
import { Icon } from "./Icon";

type Opt = { key: string; label: string };

const SIZES: (Opt & { sqft: number; hint: string })[] = [
  { key: "1", label: "1-Car Garage", sqft: 250, hint: "~250 sq ft" },
  { key: "2", label: "2-Car Garage", sqft: 450, hint: "~450 sq ft" },
  { key: "3", label: "3-Car Garage", sqft: 650, hint: "~650 sq ft" },
  { key: "custom", label: "Other Size", sqft: 0, hint: "Enter sq ft" },
];

const COATINGS: (Opt & { low: number; high: number; desc: string })[] = [
  { key: "solid", label: "Solid Color Epoxy", low: 4, high: 5, desc: "Clean, one-color finish" },
  { key: "flake", label: "Decorative Flake", low: 4, high: 6, desc: "Most popular — speckled look" },
  { key: "metallic", label: "Metallic Epoxy", low: 6, high: 8, desc: "High-end, marbled finish" },
  { key: "poly", label: "Polyaspartic (1-Day)", low: 5, high: 7, desc: "Fastest — walk on next day" },
];

const CONDITIONS: (Opt & { low: number; high: number })[] = [
  { key: "good", label: "Good shape", low: 0, high: 0 },
  { key: "minor", label: "Cracks or stains", low: 0.5, high: 1 },
  { key: "rough", label: "Rough / needs repair", low: 1.5, high: 3 },
];

const MIN_JOB = 1200;

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}
function roundTo(n: number, step = 50): number {
  return Math.round(n / step) * step;
}

function CostCalculator() {
  const [size, setSize] = useState("2");
  const [customSqft, setCustomSqft] = useState("");
  const [coating, setCoating] = useState("flake");
  const [condition, setCondition] = useState("good");

  const sizeObj = SIZES.find((s) => s.key === size)!;
  const sqft =
    size === "custom"
      ? Math.max(0, parseInt(customSqft, 10) || 0)
      : sizeObj.sqft;
  const coat = COATINGS.find((c) => c.key === coating)!;
  const cond = CONDITIONS.find((c) => c.key === condition)!;

  const hasEstimate = sqft > 0;
  let low = roundTo(sqft * (coat.low + cond.low));
  let high = roundTo(sqft * (coat.high + cond.high));
  if (hasEstimate) {
    low = Math.max(low, MIN_JOB);
    high = Math.max(high, Math.round(MIN_JOB * 1.4));
  }

  return (
    <section id="calculator" className="calc-section">
      <div className="section-inner">
        <div className="section-label">Upfront Pricing</div>
        <div className="section-title">What Will It Cost to Cover My Concrete?</div>
        <div className="section-desc">
          Cracked, stained, peeling, or just plain ugly concrete? Get a ballpark
          price in seconds — then book a free on-site visit for your exact quote.
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            <div className="calc-field">
              <label className="calc-label">1. How big is the space?</label>
              <div className="calc-options">
                {SIZES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    className={`calc-opt${size === s.key ? " active" : ""}`}
                    onClick={() => setSize(s.key)}
                    aria-pressed={size === s.key}
                  >
                    <span className="calc-opt-label">{s.label}</span>
                    <span className="calc-opt-hint">{s.hint}</span>
                  </button>
                ))}
              </div>
              {size === "custom" && (
                <input
                  type="number"
                  min="0"
                  className="calc-input"
                  placeholder="Enter square footage"
                  value={customSqft}
                  onChange={(e) => setCustomSqft(e.target.value)}
                />
              )}
            </div>

            <div className="calc-field">
              <label className="calc-label">2. Which finish?</label>
              <div className="calc-options">
                {COATINGS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`calc-opt${coating === c.key ? " active" : ""}`}
                    onClick={() => setCoating(c.key)}
                    aria-pressed={coating === c.key}
                  >
                    <span className="calc-opt-label">{c.label}</span>
                    <span className="calc-opt-hint">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-field">
              <label className="calc-label">3. Condition of the concrete?</label>
              <div className="calc-options">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`calc-opt${condition === c.key ? " active" : ""}`}
                    onClick={() => setCondition(c.key)}
                    aria-pressed={condition === c.key}
                  >
                    <span className="calc-opt-label">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calc-result">
            {hasEstimate ? (
              <>
                <div className="calc-result-label">Estimated Cost — This is an estimate only</div>
                <div className="calc-result-range">
                  {money(low)} <span>–</span> {money(high)}
                </div>
                <div className="calc-result-sub">
                  Based on {sqft.toLocaleString("en-US")} sq ft · {coat.label}
                </div>
                <a href="#contact" className="calc-cta">
                  Get My Exact Free Quote
                </a>
                <p className="calc-note">
                  <Icon.Shield /> This is an estimate only. Your exact price depends on an
                  on-site visit — which is free, with no pressure or obligation.
                </p>
              </>
            ) : (
              <div className="calc-result-empty">
                Enter your square footage above to see an estimate.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CostCalculator;
