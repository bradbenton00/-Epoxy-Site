# Google Sheets Lead Capture — Apps Script Setup

This script lets the website POST leads directly into a Google Sheet, no OAuth scope juggling, no n8n required.

## One-time setup (5 minutes)

### 1. Open Apps Script editor in your sheet

In your leads spreadsheet, click **Extensions → Apps Script**.

### 2. Paste this code (replace anything that's there):

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.zip || "",
    data.service || "",
    data.sqft || "",
    data.timeline || "",
    data.message || "",
    data.sourcePage || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy as web app

- Click **Deploy → New deployment**
- Click the gear icon next to "Select type" → choose **Web app**
- Settings:
  - **Description:** Lead capture
  - **Execute as:** Me (your account)
  - **Who has access:** Anyone
- Click **Deploy**
- Authorize when prompted (Google will warn it's "unverified" — click "Advanced → Go to project").
- **Copy the Web app URL** — it looks like `https://script.google.com/macros/s/AKfycb.../exec`

### 4. Add the URL as a Replit secret

In Replit Secrets:
- **Key:** `LEADS_SHEET_WEBHOOK_URL`
- **Value:** the URL you copied

Restart the api-server workflow (or redeploy) and you're done.

## Header row (optional but recommended)

Add this as row 1 of your sheet so columns are labeled:

| Submitted At | Name | Phone | Email | ZIP | Service | Sq Ft | Timeline | Message | Source Page |

## If you ever update the script

You must click **Deploy → Manage deployments → pencil icon → Version: New version → Deploy** again — Apps Script doesn't auto-pick-up edits.
