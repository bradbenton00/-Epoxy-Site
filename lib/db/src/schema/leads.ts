import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    submittedAt: timestamp("submitted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    zip: text("zip"),
    service: text("service"),
    sqft: text("sqft"),
    timeline: text("timeline"),
    message: text("message"),
    sourcePage: text("source_page"),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
  },
  (t) => ({
    submittedAtIdx: index("leads_submitted_at_idx").on(t.submittedAt),
  }),
);

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  submittedAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
