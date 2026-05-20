// Sends customer estimate-request leads via Gmail integration (connector: google-mail)
import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();

const LEAD_RECIPIENT = "bradbenton@ironpointconsulting.org";

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  zip: "ZIP Code",
  service: "Service Requested",
  sqft: "Approximate Square Footage",
  timeline: "Timeline",
  message: "Project Details",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(to: string, subject: string, html: string): string {
  const boundary = "----=_Part_" + Date.now();
  const message = [
    `To: ${to}`,
    `From: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

router.post("/leads", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  const fields: Record<string, string> = {};
  for (const key of Object.keys(FIELD_LABELS)) {
    const v = body[key];
    if (typeof v === "string" && v.trim().length > 0) {
      fields[key] = v.trim();
    }
  }

  if (!fields.name || !fields.phone || !fields.email) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;background:#f5f3f0;font-weight:600;color:#1a2332;border-bottom:1px solid #fff;vertical-align:top;width:200px;">${escapeHtml(
          FIELD_LABELS[k] ?? k,
        )}</td><td style="padding:8px 14px;border-bottom:1px solid #eee;vertical-align:top;">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const subject = `New Epoxy Lead: ${fields.name}${fields.service ? ` — ${fields.service}` : ""}`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:640px;">
      <div style="background:#1a2332;padding:18px 22px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-family:Arial,sans-serif;">New Lead — Elizabethtown Epoxy Flooring</h2>
        <div style="color:#d4a843;font-size:13px;margin-top:4px;">A new estimate request just came in from the website.</div>
      </div>
      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e0ddd8;border-top:none;border-radius:0 0 8px 8px;">${rows}</table>
      <p style="color:#888;font-size:12px;margin-top:14px;">
        Submitted ${new Date().toUTCString()} · Reply directly to the customer at
        <a href="mailto:${escapeHtml(fields.email)}" style="color:#b8922e;">${escapeHtml(fields.email)}</a>
        or call <a href="tel:${escapeHtml(fields.phone.replace(/[^0-9+]/g, ""))}" style="color:#b8922e;">${escapeHtml(fields.phone)}</a>.
      </p>
    </div>
  `;

  try {
    const connectors = new ReplitConnectors();
    const raw = buildEmail(LEAD_RECIPIENT, subject, html);
    const response = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      req.log.error({ status: response.status, text }, "Gmail send failed");
      res.status(502).json({ ok: false, error: "Failed to send notification" });
      return;
    }

    const sheetId = process.env["LEADS_SHEET_ID"];
    if (sheetId) {
      const submittedAt = new Date().toISOString();
      const row = [
        submittedAt,
        fields.name ?? "",
        fields.phone ?? "",
        fields.email ?? "",
        fields.zip ?? "",
        fields.service ?? "",
        fields.sqft ?? "",
        fields.timeline ?? "",
        fields.message ?? "",
        req.get("referer") ?? "",
      ];
      const range = encodeURIComponent("Sheet1!A:J");
      const path = `/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      void (async () => {
        try {
          const sheets = new ReplitConnectors();
          const sheetRes = await sheets.proxy("google-sheet", path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values: [row] }),
          });
          if (!sheetRes.ok) {
            const text = await sheetRes.text().catch(() => "");
            req.log.warn(
              { status: sheetRes.status, text },
              "Google Sheets append failed",
            );
          }
        } catch (err) {
          req.log.warn({ err }, "Google Sheets append error");
        }
      })();
    }

    const webhookUrl = process.env["N8N_WEBHOOK_URL"];
    if (webhookUrl) {
      const payload = {
        ...fields,
        submittedAt: new Date().toISOString(),
        source: "elizabethtownepoxyflooring.com",
        userAgent: req.get("user-agent") ?? null,
        referer: req.get("referer") ?? null,
      };
      void fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (r) => {
          if (!r.ok) {
            const text = await r.text().catch(() => "");
            req.log.warn(
              { status: r.status, text },
              "n8n webhook returned non-OK",
            );
          }
        })
        .catch((err: unknown) => {
          req.log.warn({ err }, "n8n webhook forward failed");
        });
    }

    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Lead submission error");
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

export default router;
