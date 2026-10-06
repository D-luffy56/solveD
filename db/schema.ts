import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const projectSubmissions = sqliteTable(
  "project_submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    referenceCode: text("reference_code").notNull(),
    companyName: text("company_name").notNull(),
    contactName: text("contact_name").notNull(),
    workEmail: text("work_email").notNull(),
    phone: text("phone").notNull().default(""),
    country: text("country").notNull(),
    companyWebsite: text("company_website").notNull().default(""),
    serviceInterest: text("service_interest").notNull(),
    configuration: text("configuration").notNull(),
    developmentStage: text("development_stage").notNull(),
    missionSummary: text("mission_summary").notNull(),
    technicalPayload: text("technical_payload").notNull(),
    timeline: text("timeline").notNull(),
    budgetRange: text("budget_range").notNull(),
    availableData: text("available_data").notNull(),
    constraints: text("constraints").notNull().default(""),
    confidentiality: text("confidentiality").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("idx_project_submissions_reference").on(table.referenceCode),
    index("idx_project_submissions_created_at").on(table.createdAt),
    index("idx_project_submissions_status").on(table.status),
  ],
);
