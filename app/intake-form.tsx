"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CircleAlert, Loader2 } from "lucide-react";

type FormData = {
  companyName: string; contactName: string; workEmail: string; phone: string; country: string; companyWebsite: string;
  serviceInterest: string; configuration: string; developmentStage: string; missionSummary: string;
  payloadMass: string; endurance: string; cruiseSpeed: string; range: string; mtow: string; operatingAltitude: string;
  launchRecovery: string; sizeConstraint: string; timeline: string; budgetRange: string; availableData: string[];
  constraints: string; confidentiality: string; consent: boolean; website: string;
};

const initial: FormData = {
  companyName: "", contactName: "", workEmail: "", phone: "", country: "", companyWebsite: "",
  serviceInterest: "", configuration: "", developmentStage: "", missionSummary: "",
  payloadMass: "", endurance: "", cruiseSpeed: "", range: "", mtow: "", operatingAltitude: "",
  launchRecovery: "", sizeConstraint: "", timeline: "", budgetRange: "", availableData: [],
  constraints: "", confidentiality: "non-confidential", consent: false, website: "",
};

const steps = ["Contact", "Mission", "Targets", "Project", "Review"];
const dataOptions = ["Mission requirements", "Mass estimate", "Existing CAD", "Airfoil or aerodynamic data", "Propulsion data", "Flight-test data", "None yet"];

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}{required && <em> *</em>}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const progress = ((step + 1) / steps.length) * 100;
  const fixedPriceFit = useMemo(() => !form.configuration ? "pending" : ["conventional-fixed-wing", "flying-wing"].includes(form.configuration) ? "likely" : "custom", [form.configuration]);
  const set = (key: keyof FormData, value: string | boolean | string[]) => setForm((old) => ({ ...old, [key]: value }));
  const input = (key: keyof FormData) => ({ value: String(form[key] ?? ""), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(key, event.target.value) });

  const validate = () => {
    const requiredByStep = [["companyName", "contactName", "workEmail", "country"], ["configuration", "developmentStage", "missionSummary"], ["payloadMass", "endurance", "cruiseSpeed"], ["serviceInterest", "timeline", "budgetRange", "confidentiality"], []];
    const missing = requiredByStep[step].some((key) => !String(form[key as keyof FormData] ?? "").trim());
    if (missing) { setError("Complete the required fields before continuing."); return false; }
    if (step === 0 && !/^\S+@\S+\.\S+$/.test(form.workEmail)) { setError("Enter a valid work email address."); return false; }
    setError(""); return true;
  };
  const next = () => { if (validate()) { setStep((value) => Math.min(value + 1, 4)); document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" }); } };
  const back = () => { setError(""); setStep((value) => Math.max(value - 1, 0)); };

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!form.consent) { setError("Confirm that the information may be used to review this request."); return; }
    setSubmitting(true); setError("");
    try {
      const response = await fetch("/api/submissions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json() as { reference?: string; error?: string };
      if (!response.ok || !data.reference) throw new Error(data.error || "Submission could not be saved.");
      setReference(data.reference);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Submission could not be saved. Please try again."); }
    finally { setSubmitting(false); }
  }

  useEffect(() => {
    const context = typeof document === "undefined" ? undefined : (document as Document & { modelContext?: { registerTool?: (tool: unknown, options?: unknown) => unknown } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({ name: "start_project_intake", title: "Start solveD project intake", description: "Open the solveD project intake flow at the contact step without submitting data.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: () => { setStep(0); document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" }); return { state: "intake_open", step: "Contact" }; } }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* WebMCP is optional in unsupported browsers. */ }
    return () => lifecycle.abort();
  }, []);

  if (reference) return <div className="intake-card success-card" role="status"><span className="success-icon"><Check size={28} /></span><p className="eyebrow">Brief received</p><h3>Thank you. Your reference is {reference}.</h3><p>solveD will review scope, missing inputs and package fit. Expect an initial response within two business days. No engineering work begins until scope, assumptions and commercial terms are agreed.</p><button className="button secondary" onClick={() => { setForm(initial); setStep(0); setReference(""); }}>Submit another project</button></div>;

  return <form className="intake-card" onSubmit={submit} noValidate>
    <div className="step-header"><div><span>Step {step + 1} of {steps.length}</span><strong>{steps[step]}</strong></div><span>{Math.round(progress)}%</span></div>
    <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
    <div className="step-dots" aria-label="Form progress">{steps.map((name, index) => <span className={index <= step ? "active" : ""} key={name}>{name}</span>)}</div>

    {step === 0 && <div className="form-grid">
      <Field label="Company name" required><input {...input("companyName")} autoComplete="organization" /></Field><Field label="Your name" required><input {...input("contactName")} autoComplete="name" /></Field>
      <Field label="Work email" required><input {...input("workEmail")} type="email" autoComplete="email" /></Field><Field label="Phone or WhatsApp"><input {...input("phone")} autoComplete="tel" /></Field>
      <Field label="Country" required><input {...input("country")} autoComplete="country-name" /></Field><Field label="Company website"><input {...input("companyWebsite")} type="url" placeholder="https://" /></Field>
      <label className="honeypot" aria-hidden="true">Website<input {...input("website")} tabIndex={-1} autoComplete="off" /></label>
    </div>}

    {step === 1 && <div className="form-grid one-column">
      <Field label="Aircraft configuration" required><select {...input("configuration")}><option value="">Select one</option><option value="conventional-fixed-wing">Conventional fixed-wing</option><option value="flying-wing">Flying wing</option><option value="hybrid-vtol">Hybrid VTOL / transition aircraft</option><option value="multirotor">Multirotor only</option><option value="other">Other or undecided</option></select></Field>
      {fixedPriceFit === "custom" && <div className="fit-notice"><CircleAlert size={19} /><p>This configuration needs custom scope review and is outside the fixed-price packages.</p></div>}
      <Field label="Development stage" required><select {...input("developmentStage")}><option value="">Select one</option><option>Requirements only</option><option>Early sketches or spreadsheet sizing</option><option>CAD concept exists</option><option>Prototype exists</option><option>Flight-test iteration</option></select></Field>
      <Field label="Mission and blocked decision" required hint="Describe the payload, operating environment and the decision you need to make."><textarea {...input("missionSummary")} rows={6} placeholder="Example: compare two wing concepts for a mapping mission carrying a 1.2 kg payload..." /></Field>
    </div>}

    {step === 2 && <div className="form-grid">
      <Field label="Payload mass" required hint="kg"><input {...input("payloadMass")} inputMode="decimal" placeholder="1.2" /></Field><Field label="Target endurance" required hint="minutes"><input {...input("endurance")} inputMode="decimal" placeholder="90" /></Field>
      <Field label="Cruise speed" required hint="m/s"><input {...input("cruiseSpeed")} inputMode="decimal" placeholder="22" /></Field><Field label="Target range" hint="km"><input {...input("range")} inputMode="decimal" /></Field>
      <Field label="Estimated maximum take-off mass" hint="kg"><input {...input("mtow")} inputMode="decimal" /></Field><Field label="Operating altitude" hint="m above mean sea level"><input {...input("operatingAltitude")} inputMode="decimal" /></Field>
      <Field label="Launch and recovery"><input {...input("launchRecovery")} placeholder="Runway, catapult, belly landing..." /></Field><Field label="Size or transport constraint"><input {...input("sizeConstraint")} placeholder="Maximum span, case size..." /></Field>
    </div>}

    {step === 3 && <div className="form-grid one-column">
      <Field label="Service of interest" required><select {...input("serviceInterest")}><option value="">Select one</option><option>Design Risk Snapshot</option><option>Mission Feasibility Check</option><option>Concept Feasibility Sprint</option><option>Custom Engineering</option><option>Not sure—recommend the right level</option></select></Field>
      <div className="form-grid nested"><Field label="Required decision timeline" required><select {...input("timeline")}><option value="">Select one</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option><option>More than 3 months</option><option>Exploratory</option></select></Field><Field label="Indicative budget" required><select {...input("budgetRange")}><option value="">Select one</option><option>Free initial review only</option><option>Below ₹25,000 / US$400</option><option>₹25,000–₹100,000 / US$400–$1,700</option><option>Above ₹100,000 / US$1,700</option><option>Budget not set</option></select></Field></div>
      <fieldset className="checkbox-group"><legend>Information currently available</legend>{dataOptions.map((option) => <label key={option}><input type="checkbox" checked={form.availableData.includes(option)} onChange={() => set("availableData", form.availableData.includes(option) ? form.availableData.filter((item) => item !== option) : [...form.availableData, option])} /><span>{option}</span></label>)}</fieldset>
      <Field label="Other constraints or context"><textarea {...input("constraints")} rows={4} /></Field><Field label="Information classification" required><select {...input("confidentiality")}><option value="non-confidential">Public or non-confidential information only</option><option value="nda-needed">An NDA is needed before detailed data is shared</option></select></Field>
    </div>}

    {step === 4 && <div className="review-panel">
      <div className={`fit-banner ${fixedPriceFit}`}><span>Scope signal</span><strong>{fixedPriceFit === "likely" ? "Likely fixed-price fit—subject to engineering review" : "Custom scope review required"}</strong></div>
      <Review title="Contact" rows={[["Company", form.companyName], ["Contact", form.contactName], ["Email", form.workEmail], ["Country", form.country]]} /><Review title="Mission" rows={[["Configuration", form.configuration], ["Stage", form.developmentStage], ["Mission", form.missionSummary]]} />
      <Review title="Key targets" rows={[["Payload", `${form.payloadMass} kg`], ["Endurance", `${form.endurance} min`], ["Cruise", `${form.cruiseSpeed} m/s`], ["Range", form.range ? `${form.range} km` : "Not supplied"]]} /><Review title="Engagement" rows={[["Service", form.serviceInterest], ["Timeline", form.timeline], ["Budget", form.budgetRange], ["Available data", form.availableData.join(", ") || "None listed"]]} />
      <label className="consent"><input type="checkbox" checked={form.consent} onChange={(event) => set("consent", event.target.checked)} /><span>I confirm this submission contains no restricted or confidential design information and may be used by solveD to assess scope and contact me about this request.</span></label>
    </div>}

    {error && <p className="form-error" role="alert"><CircleAlert size={18} />{error}</p>}
    <div className="form-actions">{step > 0 ? <button className="button secondary" type="button" onClick={back}><ChevronLeft size={18} />Back</button> : <span />}{step < 4 ? <button className="button primary" type="button" onClick={next}>Continue<ChevronRight size={18} /></button> : <button className="button primary" type="submit" disabled={submitting}>{submitting ? <><Loader2 className="spin" size={18} />Submitting</> : "Submit project brief"}</button>}</div>
  </form>;
}

function Review({ title, rows }: { title: string; rows: string[][] }) { return <section className="review-section"><h4>{title}</h4><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "Not supplied"}</dd></div>)}</dl></section>; }
