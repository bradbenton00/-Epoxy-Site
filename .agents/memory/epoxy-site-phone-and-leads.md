---
name: epoxy-site phone number & lead pipeline
description: How the epoxy-site phone number is spread across files and how leads flow; gotchas for site-wide edits.
---

## Phone number changes are site-wide and multi-format
The displayed phone number lives in ~14 source files of `artifacts/epoxy-site` in 4 formats that must ALL be changed together:
- `(502) XXX-XXXX` (display)
- `+1502XXXXXXX` (E.164, in JSON-LD `telephone`)
- `502XXXXXXX` (bare digits, ChatWidget tel)
- `+1-502-XXX-XXXX` (dashed, prerender.mts + CityPage.tsx)

Files: `index.html`, `prerender.mts`, `src/App.tsx`, `src/components/ChatWidget.tsx`, `src/pages/CityPage.tsx`, and the 9 static pages `public/epoxy-flooring/*/index.html`.

**How to apply:** sed all formats in correct order (E.164 + dashed BEFORE bare digits, so digit substrings don't collide). Then `PORT=24903 BASE_PATH=/ pnpm run build` and verify `rg -c <old> dist/public -g '*.html'` returns 0. Tell user to Republish.

**Why:** the number is a swappable GoHighLevel call-tracking number, so it changes occasionally; missing a format leaves stale click-to-call links or bad schema.

**Do NOT edit** `attached_assets/*` — those are old reference uploads, not the live site, even though grep finds the number there.

## Lead pipeline (single endpoint)
All site forms POST to `/api/leads` (api-server `src/routes/leads.ts`). One submission fans out to: Gmail notification, Postgres `leads` table, Google Sheets webhook (`LEADS_SHEET_WEBHOOK_URL`), and GoHighLevel webhook (`GHL_WEBHOOK_URL`). Server only reads keys in `FIELD_LABELS` (name, phone, email, zip, service, sqft, timeline, message); name+phone+email are required (email column is `notNull`). Tag a lead's source by setting the `message` field.

## Cost calculator
- Homepage has an interactive upfront cost calculator: `src/components/CostCalculator.tsx`, rendered between why-section and compare-section, nav anchor `#calculator` (labeled "Pricing"). Styles `.calc-*` in index.css.
- Outputs a ballpark $ range (size × coating rate + concrete-condition modifier, $1,200 job floor). Pricing anchored on ~$12/sqft (per owner). **Constraint:** three pricing spots must stay consistent if any changes — calculator coating rates (CostCalculator.tsx), the FAQ "how much does it cost" answer, and the compare-table "Typical cost (2-car)" row in App.tsx.
- CTA scrolls to #contact (does not auto-submit a lead). Always labeled a ballpark requiring a free on-site visit.
