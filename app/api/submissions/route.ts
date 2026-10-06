import { getDb } from "../../../db";
import { projectSubmissions } from "../../../db/schema";
import { z } from "zod";

const submissionSchema = z.object({
  companyName: z.string().trim().min(2).max(150), contactName: z.string().trim().min(2).max(120), workEmail: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).default(""), country: z.string().trim().min(2).max(100), companyWebsite: z.string().trim().max(300).default(""),
  serviceInterest: z.string().trim().min(2).max(100), configuration: z.string().trim().min(2).max(100), developmentStage: z.string().trim().min(2).max(120),
  missionSummary: z.string().trim().min(20).max(4000), payloadMass: z.string().trim().min(1).max(40), endurance: z.string().trim().min(1).max(40), cruiseSpeed: z.string().trim().min(1).max(40),
  range: z.string().trim().max(40).default(""), mtow: z.string().trim().max(40).default(""), operatingAltitude: z.string().trim().max(40).default(""), launchRecovery: z.string().trim().max(300).default(""), sizeConstraint: z.string().trim().max(300).default(""),
  timeline: z.string().trim().min(2).max(100), budgetRange: z.string().trim().min(2).max(120), availableData: z.array(z.string().max(100)).max(12), constraints: z.string().trim().max(3000).default(""),
  confidentiality: z.enum(["non-confidential", "nda-needed"]), consent: z.literal(true), website: z.string().max(0),
});

function referenceCode() { const date = new Date().toISOString().slice(0, 10).replaceAll("-", ""); return `SD-${date}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`; }

export async function POST(request: Request) {
  try {
    const parsed = submissionSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Please review the form and complete every required field." }, { status: 400 });
    const data = parsed.data; const reference = referenceCode();
    const technicalPayload = JSON.stringify({ payloadMassKg: data.payloadMass, enduranceMinutes: data.endurance, cruiseSpeedMps: data.cruiseSpeed, rangeKm: data.range, mtowKg: data.mtow, operatingAltitudeM: data.operatingAltitude, launchRecovery: data.launchRecovery, sizeConstraint: data.sizeConstraint });
    await getDb().insert(projectSubmissions).values({ referenceCode: reference, companyName: data.companyName, contactName: data.contactName, workEmail: data.workEmail, phone: data.phone, country: data.country, companyWebsite: data.companyWebsite, serviceInterest: data.serviceInterest, configuration: data.configuration, developmentStage: data.developmentStage, missionSummary: data.missionSummary, technicalPayload, timeline: data.timeline, budgetRange: data.budgetRange, availableData: JSON.stringify(data.availableData), constraints: data.constraints, confidentiality: data.confidentiality });
    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    console.error("project submission failed", error);
    return Response.json({ error: "The brief could not be saved. Your entries are still visible—please try again." }, { status: 500 });
  }
}
