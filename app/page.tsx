import { Check, ChevronRight, Gauge, ShieldCheck, Timer, Wind } from "lucide-react";
import { IntakeForm } from "./intake-form";

const offers = [
  { name: "Design Risk Snapshot", price: "Free", delivery: "1–2 business days", summary: "A one-page review of public or non-confidential information.", items: ["Three visible design risks", "Missing inputs", "Recommended next study"] },
  { name: "Mission Feasibility Check", price: "₹19,500 · US$320", delivery: "3–4 business days", summary: "A fast answer to whether one fixed-wing concept is worth advancing.", items: ["Mass, wing and energy bounds", "Major risks", "3–5 page memo and review call"] },
  { name: "Concept Feasibility Sprint", price: "₹96,000 · US$1,600", delivery: "7–10 business days", summary: "Compare up to two concepts against one clearly defined mission.", items: ["Geometry and aerodynamic screening", "Mission-energy and stability comparison", "Uncertainty-aware decision report"], featured: true },
  { name: "Custom Engineering", price: "Scoped proposal", delivery: "Agreed per project", summary: "Expanded analysis when the decision needs deeper engineering work.", items: ["Additional concepts", "Detailed CAD, CFD or FEA", "Optimization and expanded reporting"] },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="solveD home"><span className="brand-mark" aria-hidden="true">SD</span><span>solveD</span></a>
        <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#process">Process</a><a className="nav-cta" href="#intake">Start your project</a></nav>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Fixed-wing UAV concept engineering</p>
          <h1>Choose the design direction worth prototyping.</h1>
          <p className="hero-lead">solveD helps drone teams clarify mission requirements, compare early concepts and identify design risks before committing significant time and money to detailed engineering and physical testing.</p>
          <div className="hero-actions"><a className="button primary" href="#intake">Submit a project brief <ChevronRight size={18} /></a><a className="button secondary" href="#services">Review services</a></div>
          <div className="trust-row" aria-label="Service boundaries"><span><ShieldCheck size={17} /> Non-confidential intake</span><span><Timer size={17} /> Response within 2 business days</span></div>
        </div>
        <div className="mission-panel" aria-label="Typical decision path">
          <div className="panel-topline"><span>MISSION REVIEW</span><span className="status-pill">PRELIMINARY</span></div>
          <div className="flight-grid"><div className="aircraft-mark" aria-hidden="true"><span /></div><div className="metric"><small>01</small><strong>Define</strong><span>Mission and constraints</span></div><div className="metric"><small>02</small><strong>Compare</strong><span>Feasible directions</span></div><div className="metric"><small>03</small><strong>Decide</strong><span>What to prototype next</span></div></div>
          <p className="panel-note">Decision support—not certification, flight-worthiness approval or guaranteed performance.</p>
        </div>
      </section>

      <section id="services" className="section-shell section-block">
        <div className="section-heading"><p className="eyebrow">Service ladder</p><h2>Begin with the smallest useful engineering decision.</h2><p>Launch prices apply to conventional electric fixed-wing civil UAV projects that pass scope review.</p></div>
        <div className="service-grid">
          {offers.map((offer) => <article className={`service-card ${offer.featured ? "featured" : ""}`} key={offer.name}>{offer.featured && <span className="card-label">Most complete starting point</span>}<p className="delivery">{offer.delivery}</p><h3>{offer.name}</h3><p className="price">{offer.price}</p><p className="card-summary">{offer.summary}</p><ul>{offer.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><a href="#intake">Discuss this service</a></article>)}
        </div>
        <p className="commercial-note">Mission Feasibility Check fees are credited toward a Concept Feasibility Sprint when upgraded within 14 days for the same mission and baseline. Taxes and transaction charges are confirmed in the proposal.</p>
      </section>

      <section id="process" className="process-band"><div className="section-shell process-grid">
        <div className="section-heading light"><p className="eyebrow">How engagement works</p><h2>A controlled path from unclear requirement to prototype decision.</h2></div>
        <ol className="process-list"><li><span>01</span><div><strong>Submit the mission</strong><p>Tell us what the aircraft must carry, where it must operate and what decision is blocked.</p></div></li><li><span>02</span><div><strong>Engineering scope review</strong><p>We identify missing inputs, exclusions and whether a fixed-price package fits.</p></div></li><li><span>03</span><div><strong>Analysis and checkpoints</strong><p>We screen the agreed concepts and expose assumptions, risks and uncertainty.</p></div></li><li><span>04</span><div><strong>Decision handover</strong><p>You receive a concise report, review call and a recommended next engineering step.</p></div></li></ol>
      </div></section>

      <section className="section-shell capability-strip" aria-label="Typical evaluation areas"><div><Wind /><span>Aerodynamic screening</span></div><div><Gauge /><span>Mission and energy bounds</span></div><div><ShieldCheck /><span>Stability and risk review</span></div><div><Timer /><span>Fast decision cycles</span></div></section>

      <section id="intake" className="intake-section"><div className="section-shell intake-shell">
        <div className="intake-intro"><p className="eyebrow">Project intake</p><h2>Give engineering the right starting information.</h2><p>The guided brief takes about 8–12 minutes. Use approximate values where needed and label them as estimates.</p><div className="privacy-card"><ShieldCheck size={22} /><div><strong>Do not upload confidential design data yet.</strong><p>This first review uses public or non-confidential information. We can arrange a protected handover after scope and confidentiality needs are agreed.</p></div></div></div>
        <IntakeForm />
      </div></section>

      <footer className="site-footer section-shell"><div><strong>solveD</strong><p>Preliminary fixed-wing UAV engineering decision support.</p></div><p>Not certification, structural substantiation, flight-worthiness approval or a guarantee of aircraft performance.</p></footer>
    </main>
  );
}
