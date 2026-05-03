// Sends contractor inquiry leads via Gmail integration (connector: google-mail)
import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();

const LEAD_RECIPIENT = "Beadbenton@ironpointconsulting.org";

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
  const body = req.body ?? {};
  const fields: Record<string, string> = {
    Name: String(body.name ?? "").trim(),
    "Business Name": String(body.company ?? "").trim(),
    Phone: String(body.phone ?? "").trim(),
    Email: String(body.email ?? "").trim(),
    Website: String(body.website ?? "").trim(),
    "Years Experience": String(body.years ?? "").trim(),
    "Monthly Capacity": String(body.capacity ?? "").trim(),
    Message: String(body.message ?? "").trim(),
  };

  if (!fields.Name || !fields.Phone || !fields.Email) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const rows = Object.entries(fields)
    .filter(([, v]) => v.length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;background:#f5f3f0;font-weight:600;color:#1a2332;">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;">
      <h2 style="color:#1a2332;border-bottom:3px solid #d4a843;padding-bottom:8px;">New Site Rental Inquiry</h2>
      <p style="color:#555;">A contractor just submitted the "Claim This Site" form on elizabethtownepoxyflooring.com.</p>
      <table style="border-collapse:collapse;width:100%;max-width:600px;margin-top:12px;">${rows}</table>
      <p style="color:#888;font-size:12px;margin-top:20px;">Submitted ${new Date().toUTCString()}</p>
    </div>
  `;

  try {
    const connectors = new ReplitConnectors();
    const raw = buildEmail(
      LEAD_RECIPIENT,
      `New Lead: ${fields.Name}${fields["Business Name"] ? ` (${fields["Business Name"]})` : ""}`,
      html,
    );

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

    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Lead submission error");
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

export default router;
