import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Plus, 
  Minus, 
  Download, 
  CheckCircle2, 
  Activity, 
  Search, 
  FileCheck, 
  Layers, 
  BarChart3 
} from 'lucide-react';
import ShapeMosaic from '../components/originkit/ui/shape-mosaic-custom-style';

export default function SaturnFundPage({ onOpenModal, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  const keyFeatures = [
    {
      id: 'return',
      metric: '10–12%',
      metricSub: 'p.a. Target Return',
      title: 'Target Return',
      desc: '10–12% p.a. with cashflow smoothed through indicative monthly distributions—ideal for investors seeking reliable, institutional-grade income.',
      icon: TrendingUp,
      accent: '#00E599',
    },
    {
      id: 'mix',
      metric: '60 / 30 / 10',
      metricSub: 'Debt / Equity / Special',
      title: 'Portfolio Mix',
      desc: '60% Collateralised Debt & Convertible Notes anchor the fund, 30% Growth‑Infused Equities drive upside, and 10% Opportunistic Special Situations capture mis‑priced windows.',
      icon: PieChart,
      accent: '#33FFB5',
    },
    {
      id: 'risk',
      metric: '1st Rank',
      metricSub: 'Security Interests',
      title: 'Risk Mitigation',
      desc: 'First‑rank security interests, diversified borrower pool, and active covenant monitoring help shield principal through all market cycles.',
      icon: ShieldCheck,
      accent: '#00FFA1',
    },
    {
      id: 'liquidity',
      metric: '12 Mo.',
      metricSub: 'Lock-In / 90d Notice',
      title: 'Lock‑In & Liquidity',
      desc: 'A 12‑month commitment protects the portfolio from early liquidity drains; post‑lockup redemptions require just 90 days’ notice.',
      icon: Clock,
      accent: '#FFFFFF',
    },
  ];

  const processStages = [
    {
      num: '01',
      title: 'Discovery Consultation',
      desc: 'We map your investment objectives, liquidity needs, tax constraints, and ESG preferences in detail.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Opportunity Origination',
      desc: 'Our proprietary research engine and institutional partner network surface high-conviction deals matching your mandate profile.',
      icon: Activity,
    },
    {
      num: '03',
      title: 'Deep‑Dive Due Diligence',
      desc: 'We scrutinise financials, management calibre, technical margins of safety, and underlying legal frameworks.',
      icon: FileCheck,
    },
    {
      num: '04',
      title: 'Execution & Settlement',
      desc: 'Negotiation, documentation, clearance, and settlement are handled seamlessly, keeping you informed at every milestone.',
      icon: Layers,
    },
    {
      num: '05',
      title: 'Active Monitoring & Reporting',
      desc: 'You receive quarterly reporting packs, bespoke KPI dashboards, and proactive rebalancing recommendations.',
      icon: BarChart3,
    },
  ];

  const marketInsights = [
    {
      title: 'Equity Sector Pulse',
      desc: 'Quarterly scorecards ranking ASX sectors on valuation, momentum, and earnings revision.',
      tag: 'Equities',
    },
    {
      title: 'Private Credit Barometer',
      desc: 'Real‑time spreads, covenant trends, and supply‑demand dynamics in Australia’s non‑bank lending arena.',
      tag: 'Credit',
    },
    {
      title: 'Macro Lens',
      desc: 'Clear commentary on interest‑rate trajectories, fiscal policy, and global capital flows shaping local markets.',
      tag: 'Macro',
    },
    {
      title: 'Regulatory Radar',
      desc: 'What ASIC, APRA, and Treasury mean for your portfolio—summarised in actionable bullet points.',
      tag: 'Compliance',
    },
  ];

  const saturnFaqs = [
    {
      q: 'What is the Saturn Unit Trust Fund?',
      a: "The Saturn Unit Trust Fund is a wholesale managed fund structure that pools capital from eligible investors into a single trust, which is then deployed according to the fund's stated investment strategy and mandate.",
    },
    {
      q: 'How does a wholesale managed fund in Australia operate?',
      a: "A wholesale managed fund in Australia pools money from wholesale investors, with a trustee or responsible entity managing the pooled capital according to a defined mandate. Investors hold units representing a proportional interest in the fund's underlying assets.",
    },
    {
      q: 'What is a unit trust investment and how do units work?',
      a: "In a unit trust investment, the fund's assets are divided into units, and each investor's holding is represented by a number of units proportional to their contribution. Unit prices move with the value of the underlying assets, and income is distributed to unit holders.",
    },
    {
      q: 'Who is eligible to invest in the Saturn Unit Trust Fund?',
      a: 'Eligibility is generally restricted to wholesale investors who satisfy the net asset or income tests under the Corporations Act 2001 (Cth), or who hold a sophisticated investor certificate (Accountant Certificate pursuant to Section 761G/761GA), consistent with how the fund is offered.',
    },
    {
      q: 'What is the underlying investment strategy of the fund?',
      a: "The fund's underlying strategy and asset allocation are set out in its offer documents (Information Memorandum), which detail target sectors, risk profiles, return objectives (60% secured private credit, 30% growth equities, 10% special situations).",
    },
    {
      q: 'How are distributions and returns calculated in a unit trust?',
      a: "Distributions in a unit trust are generally paid from the income and realised gains generated by the underlying assets, calculated per unit held, with the frequency (indicative monthly distributions) and structure of payments set out in the trust's constitution and offer documents.",
    },
    {
      q: 'What are the risks and fees associated with investing in the fund?',
      a: "As with any managed fund, risks include market and asset-specific risk, liquidity constraints tied to the fund's redemption terms, and manager risk. Fees typically include management fees and may include performance fees—full details are transparently set out in the fund's Information Memorandum.",
    },
  ];

  return (
    <div className="subpage-wrapper saturn-fund-page">
      {/* 1. HERO SECTION: Full-width dark stage with ShapeMosaic canvas */}
      <section className="subpage-hero-section">
        <div className="subpage-mosaic-bg-wrap" aria-hidden="true">
          <ShapeMosaic
            ink="#10251B"
            lit="#00FFA1"
            cell={30}
            size={9}
            kinds={6}
            fill={0}
            spin={20}
            turn={28}
            reach={16}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
          <div className="subpage-hero-vignette" />
        </div>

        <div className="container subpage-hero-container">
          {/* Breadcrumb nav */}
          <nav className="subpage-breadcrumb" aria-label="Breadcrumb">
            <button 
              type="button" 
              onClick={() => onNavigate && onNavigate('home')}
              className="breadcrumb-link"
            >
              Home
            </button>
            <ChevronRight size={13} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Saturn Fund</span>
          </nav>

          {/* Prominent Bold Headline without top pills (strictly per Project Rules) */}
          <h1 className="subpage-hero-headline">
            Saturn Unit Trust Fund
          </h1>

          <p className="subpage-hero-subtext">
            The <strong>Saturn Unit Trust Fund</strong> is our flagship pooled vehicle, offering qualified investors a dependable gateway to Australia’s surging private credit and mid‑market equity landscape.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="subpage-metrics-ribbon">
            <div className="subpage-metric-item">
              <span className="metric-val">10–12%</span>
              <span className="metric-lbl">Target Return p.a.</span>
            </div>
            <div className="subpage-metric-divider" />
            <div className="subpage-metric-item">
              <span className="metric-val">Monthly</span>
              <span className="metric-lbl">Cashflow Distributions</span>
            </div>
            <div className="subpage-metric-divider" />
            <div className="subpage-metric-item">
              <span className="metric-val">1st Rank</span>
              <span className="metric-lbl">Collateralised Security</span>
            </div>
          </div>
        </div>

        {/* Australia corner overlay image at 80% transparency on bottom-right */}
        <img 
          src="/assets/aus.png" 
          alt="Australia" 
          className="section-corner-overlay corner-overlay-aus" 
          aria-hidden="true" 
        />
      </section>

      {/* 2. KEY FEATURES & WHAT YOU RECEIVE */}
      <section className="saturn-features-section">
        <div className="container saturn-features-container">
          <div className="saturn-section-header text-center">
            <h2 className="about-section-heading">
              Key Features & What You Receive
            </h2>
            <p className="about-section-subtext">
              Engineered for predictable yield, disciplined capital protection, and structural upside.
            </p>
          </div>

          <div className="saturn-features-grid">
            {keyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.id} className="saturn-feature-card">
                  <div className="saturn-card-header">
                    <div className="feature-icon-wrap">
                      <Icon size={24} style={{ color: feat.accent }} />
                    </div>
                    <div className="feature-metric-block">
                      <span className="feature-metric-num" style={{ color: feat.accent }}>{feat.metric}</span>
                      <span className="feature-metric-sub">{feat.metricSub}</span>
                    </div>
                  </div>

                  <h3 className="saturn-card-title">{feat.title}</h3>
                  <p className="saturn-card-desc">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OUR FIVE-STAGE PROCESS */}
      <section className="saturn-process-section">
        <div className="container saturn-process-container">
          <div className="saturn-section-header text-center">
            <h2 className="about-section-heading">
              Our Five-Stage Process
            </h2>
            <p className="about-section-subtext">
              Rigorous underwriting, institutional due diligence, and ongoing lifecycle governance.
            </p>
          </div>

          <div className="saturn-process-timeline">
            {processStages.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="saturn-process-step">
                  <div className="step-num-badge">{step.num}</div>
                  <div className="step-card">
                    <div className="step-icon-wrap">
                      <StepIcon size={20} className="step-icon" />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                  {idx < processStages.length - 1 && (
                    <div className="step-connector-line" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MARKET INSIGHTS RADAR */}
      <section className="saturn-insights-section">
        <div className="container saturn-insights-container">
          <div className="saturn-section-header text-center">
            <h2 className="about-section-heading">
              Market Insights Radar
            </h2>
            <p className="about-section-subtext">
              We distil complex macro and sector data into actionable wholesale intelligence.
            </p>
          </div>

          <div className="saturn-insights-grid">
            {marketInsights.map((ins, idx) => (
              <div key={idx} className="saturn-insight-card">
                <div className="insight-badge">{ins.tag}</div>
                <h3 className="insight-title">{ins.title}</h3>
                <p className="insight-desc">{ins.desc}</p>
                <div className="insight-footer">
                  <span className="insight-link-label">Institutional Analysis</span>
                  <ArrowUpRight size={14} className="insight-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dubai corner overlay image at 80% transparency on bottom-right */}
        <img 
          src="/assets/dub.png" 
          alt="Dubai" 
          className="section-corner-overlay corner-overlay-dub" 
          aria-hidden="true" 
        />
      </section>

      {/* 5. SATURN FUND FAQS */}
      <section className="saturn-faqs-section">
        <div className="container saturn-faqs-container">
          <div className="saturn-section-header text-center">
            <h2 className="about-section-heading">
              Frequently Asked Questions
            </h2>
            <p className="about-section-subtext">
              Statutory transparency regarding fund structure, eligibility, and distributions.
            </p>
          </div>

          <div className="saturn-accordion-wrap">
            {saturnFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`saturn-accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="saturn-accordion-trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="accordion-q-text">{faq.q}</span>
                    <span className="accordion-icon-box">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="saturn-accordion-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: Request Information Memorandum (IM) */}
      <section className="saturn-cta-section">
        <div className="container saturn-cta-container">
          <div className="saturn-cta-banner">
            <div className="saturn-cta-text">
              <h2 className="saturn-cta-heading">
                Ready to Allocate to the Saturn Fund?
              </h2>
              <p className="saturn-cta-sub">
                Request the full Information Memorandum (IM) or arrange a confidential briefing with our investment managers.
              </p>
            </div>

            <div className="saturn-cta-actions">
              <button 
                type="button" 
                className="saturn-primary-cta-btn"
                onClick={() => onOpenModal && onOpenModal('Saturn Fund Allocation')}
              >
                <span>Request Information Memorandum</span>
                <ArrowUpRight size={18} />
              </button>

              <a 
                href="/assets/Vitti_Capital_Guide.pdf"
                download="Vitti_Capital_Guide.pdf"
                className="saturn-secondary-cta-btn"
                title="Download Vitti Capital Guide (PDF)"
              >
                <Download size={16} />
                <span>Download Factsheet (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
