import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { adminAuth } from "../middleware/adminAuth";

const router: IRouter = Router();

router.use("/admin", adminAuth);

router.get("/admin/leads", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.submittedAt))
      .limit(1000);
    res.json({ ok: true, leads: rows });
  } catch (err) {
    req.log.error({ err }, "Failed to load leads");
    res.status(500).json({ ok: false, error: "Failed to load leads" });
  }
});

function csvCell(v: unknown): string {
  if (v == null) return "";
  let s = v instanceof Date ? v.toISOString() : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

router.get("/admin/leads.csv", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.submittedAt));
    const headers = [
      "id",
      "submittedAt",
      "name",
      "phone",
      "email",
      "zip",
      "service",
      "sqft",
      "timeline",
      "message",
      "sourcePage",
      "userAgent",
      "ipAddress",
    ];
    const lines: string[] = [headers.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.id,
          r.submittedAt,
          r.name,
          r.phone,
          r.email,
          r.zip,
          r.service,
          r.sqft,
          r.timeline,
          r.message,
          r.sourcePage,
          r.userAgent,
          r.ipAddress,
        ]
          .map(csvCell)
          .join(","),
      );
    }
    const csv = lines.join("\r\n") + "\r\n";
    const stamp = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="leads_${stamp}.csv"`,
    );
    res.send(csv);
  } catch (err) {
    req.log.error({ err }, "Failed to export leads");
    res.status(500).json({ ok: false, error: "Failed to export leads" });
  }
});

export default router;
