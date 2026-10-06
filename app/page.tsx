import { IntakeForm } from "./intake-form";

const offers = [
  { name: "Design Risk Snapshot", price: "Free", delivery: "1–2 business days", scope: "A one-page review of public or non-confidential material, identifying three visible risks, missing inputs and the most useful next study." },
  { name: "Mission Feasibility Check", price: "₹19,500 / US$320", delivery: "3–4 business days", scope: "One concept assessed against a defined mission, with preliminary mass, wing and energy bounds, major risks, a short memo and a review call." },
  { name: "Concept Feasibility Sprint", price: "₹96,000 / US$1,600", delivery: "7–10 business days", scope: "Up to two concepts compared through preliminary geometry, aerodynamic screening, mission-energy analysis, stability review and an uncertainty-aware decision report." },
  { name: "Custom Engineering", price: "Quoted separately", delivery: "By agreement", scope: "Additional concepts, detailed CAD, CFD, FEA, optimization or expanded analysis when the work falls outside the fixed-price packages." },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="solveD home">solve<span>D</span></a>
        <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#process">Process</a><a href="#intake">Project brief</a></nav>
      </header>

      <section className="intro section-shell">
        <div className="intro-main"><p className="kicker">Fixed-wing UAV concept engineering</p><h1>Make the right prototype decision before detailed engineering begins.</h1><p className="intro-copy">solveD helps civil drone teams turn mission requirements into a defensible early design direction. We compare concepts, identify missing inputs and show where further engineering effort is justified.</p><a className="primary-link" href="#intake">Start a project brief</a></div>
        <aside className="decision-list" aria-label="Typical decisions"><p>Typical decisions</p><ol><li><span>01</span>Is the mission feasible within the current mass and energy limits?</li><li><span>02</span>Which concept should proceed to detailed design?</li><li><span>03</span>What information or test should be obtained next?</li></ol><small>Preliminary decision support only. Not certification, flight-worthiness approval or guaranteed performance.</small></aside>
      </section>

      <section id="services" className="section-shell content-section">
        <div className="section-title"><p>01 / Services</p><h2>Start with the smallest study that can change a decision.</h2></div>
        <div className="service-list">{offers.map((offer) => <article className="service-row" key={offer.name}><div><h3>{offer.name}</h3><p>{offer.scope}</p></div><dl><div><dt>Delivery</dt><dd>{offer.delivery}</dd></div><div><dt>Launch price</dt><dd>{offer.price}</dd></div></dl><a href="#intake">Request review</a></article>)}</div>
        <p className="service-note">Mission Feasibility Check fees are credited toward a Concept Feasibility Sprint when upgraded within 14 days for the same mission and baseline. Taxes and transaction charges are confirmed in the proposal.</p>
      </section>

      <section id="process" className="process-section"><div className="section-shell">
        <div className="section-title"><p>02 / Working process</p><h2>A defined review before any analysis starts.</h2></div>
        <ol className="process-list"><li><span>01</span><strong>Submit the mission</strong><p>Provide the intended use, payload, operating conditions, constraints and decision deadline.</p></li><li><span>02</span><strong>Confirm scope</strong><p>We identify missing information, exclusions, assumptions and the appropriate service level.</p></li><li><span>03</span><strong>Run the study</strong><p>Engineering work follows an agreed baseline with documented checks and review points.</p></li><li><span>04</span><strong>Make the decision</strong><p>You receive the comparison, uncertainties, main risks and recommended next action.</p></li></ol>
      </div></section>

      <section id="intake" className="intake-section"><div className="section-shell intake-layout">
        <div className="intake-copy"><p className="kicker">03 / Project brief</p><h2>Tell us what the aircraft must do.</h2><p>This structured brief takes about ten minutes. Approximate values are acceptable when clearly identified as estimates.</p><div className="intake-guidance"><strong>Initial review</strong><p>Use only public or non-confidential information. If an NDA is required, select that option and keep sensitive files out of this form.</p></div></div>
        <IntakeForm />
      </div></section>

      <footer className="section-shell site-footer"><div className="wordmark">solve<span>D</span></div><p>Preliminary engineering decision support for fixed-wing civil UAV teams.</p><p>Scope and commercial terms are confirmed before work begins.</p></footer>
    </main>
  );
}
