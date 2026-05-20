import type { Request, Response, NextFunction } from "express";
import { createHash, timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a, "utf8").digest();
  const bh = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ah, bh);
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) {
    res.status(503).json({ ok: false, error: "Admin auth not configured" });
    return;
  }

  const header = req.get("authorization") ?? "";
  const match = /^Basic\s+(.+)$/i.exec(header);
  if (match) {
    try {
      const decoded = Buffer.from(match[1]!, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const pass = idx >= 0 ? decoded.slice(idx + 1) : decoded;
      if (safeEqual(pass, expected)) {
        next();
        return;
      }
    } catch {
      // fall through to 401
    }
  }

  res.set("WWW-Authenticate", 'Basic realm="admin", charset="UTF-8"');
  res.status(401).json({ ok: false, error: "Authentication required" });
}
