import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Origination',
    desc: 'Proprietary deal flow from founders, bankers, and GCC sovereign funds. Less than 4% acceptance rate.',
    tag: '< 4% Acceptance'
  },
  {
    num: '02',
    title: 'Diligence',
    desc: 'Forensic audit of financials, customer concentration, and collateral asset valuations.',
    tag: 'Downside Stress-Testing'
  },
  {
    num: '03',
    title: 'Structuring',
    desc: 'First-ranking General Security Agreements (GSA), registered mortgages, and personal guarantees.',
    tag: 'PPSR 1st Ranking'
  },
  {
    num: '04',
    title: 'Execution',
    desc: 'Syndicate settlement with verified wholesale investors, escrow management, and legal closing.',
    tag: 'Escrow Settlement'
  },
  {
    num: '05',
    title: 'Liquidity',
    desc: 'Monthly distribution sweeps, continuous covenant monitoring, and structured exits via IPO or M&A.',
    tag: 'Monthly Sweeps'
  }
];

export default function ExecutionSteps() {
  return (
    <section className="section-light section-light-soft" id="execution">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="section-title">5-Stage Institutional Execution Engine</h2>
          <p className="section-subtitle">
            A disciplined underwriting process engineered to insulate principal while capturing asymmetric upside.
          </p>
        </div>

        <div className="stepper-grid-light">
          {STEPS.map((step) => (
            <div key={step.num} className="step-card-light">
              <div className="step-number">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: 11, fontWeight: 700, color: '#00B377' }}>
                {step.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
