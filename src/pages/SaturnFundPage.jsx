import React, { useState, useEffect, useRef } from 'react';
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
  Activity, 
  Search, 
  FileCheck, 
  Layers, 
  BarChart3 
} from 'lucide-react';
import ShapeMosaic from '../components/originkit/ui/shape-mosaic-custom-style';
import PredictiveArc from '../components/originkit/ui/predictive-arc';

export default function SaturnFundPage({ onOpenModal, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  // 1. Key Features Cards with relevant photography (Reverted flip cards)
  const keyFeatures = [
    {
      id: 'return',
      metric: '10–12%',
      metricSub: 'p.a. Target Return',
      title: 'Target Return',
      desc: '10–12% p.a. with cashflow smoothed through indicative monthly distributions—ideal for wholesale allocators seeking dependable, institutional-grade yield.',
      icon: TrendingUp,
      accent: '#00E599',
      image: '/assets/inv-private-credit.jpg',
    },
    {
      id: 'mix',
      metric: '60 / 30 / 10',
      metricSub: 'Debt / Equity / Special',
      title: 'Portfolio Mix',
      desc: '60% Collateralised Debt & Convertible Notes anchor the fund, 30% Growth‑Infused Equities drive upside, and 10% Opportunistic Special Situations capture mis‑priced windows.',
      icon: PieChart,
      accent: '#33FFB5',
      image: '/assets/inv-structured-finance.jpg',
    },
    {
      id: 'risk',
      metric: '1st Rank',
      metricSub: 'Security Interests',
      title: 'Risk Mitigation',
      desc: 'First‑rank security interests, diversified borrower pool, and active covenant monitoring help shield principal through all market cycles.',
      icon: ShieldCheck,
      accent: '#00FFA1',
      image: '/assets/partner-integrity.jpg',
    },
    {
      id: 'liquidity',
      metric: '12 Mo.',
      metricSub: 'Lock-In / 90d Notice',
      title: 'Lock‑In & Liquidity',
      desc: 'A 12‑month commitment protects the portfolio from early liquidity drains; post‑lockup redemptions require just 90 days’ notice.',
      icon: Clock,
      accent: '#FFFFFF',
      image: '/assets/natural-corp-strategic.jpg',
    },
  ];

  // 2. Five-Stage Process: Circular Favicons Only, Text Outside, Angled Connecting Lines (No Numbers)
  const processStages = [
    {
      id: 'discovery',
      title: 'Discovery',
      desc: 'Mapping mandate objectives, liquidity horizon, and risk tolerance profile.',
      icon: Search,
    },
    {
      id: 'origination',
      title: 'Origination',
      desc: 'Sourcing high-conviction credit tranches and unlisted growth equity.',
      icon: Activity,
    },
    {
      id: 'due-diligence',
      title: 'Due Diligence',
      desc: 'Institutional balance-sheet stress-testing and first-rank collateral analysis.',
      icon: FileCheck,
    },
    {
      id: 'execution',
      title: 'Execution',
      desc: 'Structured documentation, legal clearance, and capital allocation.',
      icon: Layers,
    },
    {
      id: 'governance',
      title: 'Governance',
      desc: 'Indicative monthly cash distributions and quarterly portfolio surveillance.',
      icon: BarChart3,
    },
  ];

  // Scroll listener for five-stage process to turn cards green one by one
  const processRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current) return;
      const rect = processRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      
      // Progress across section: starts turning when entering view, fills as user scrolls through
      const triggerTop = winH * 0.75;
      const triggerBottom = winH * 0.25;
      const totalSpan = rect.height + (triggerTop - triggerBottom);
      const currentScroll = triggerTop - rect.top;
      const progress = Math.min(Math.max(currentScroll / totalSpan, 0), 1);
      
      // Step 1 to 5
      const calculatedStep = Math.min(Math.max(Math.ceil(progress * 5), 1), 5);
      setActiveStep(calculatedStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Market Insights Radar: 4 rectangles forming a square
  const marketInsights = [
    {
      id: 'debt',
      title: 'Private Credit Barometer',
      desc: 'Real‑time spreads, covenant trends, and supply‑demand dynamics in Australia’s non‑bank lending arena.',
      tag: 'Credit',
      image: '/assets/radar-debt.jpg',
    },
    {
      id: 'equities',
      title: 'Equity Sector Pulse',
      desc: 'Quarterly scorecards ranking ASX sectors on valuation, momentum, and earnings revision.',
      tag: 'Equities',
      image: '/assets/radar-equities.jpg',
    },
    {
      id: 'convert',
      title: 'Hybrid Convertible Notes',
      desc: 'Deep analysis on hybrid convertible notes balancing senior security with equity participation upside.',
      tag: 'Structured',
      image: '/assets/radar-convertible.jpg',
    },
    {
      id: 'liquidity',
      title: 'Macro & Liquidity Lens',
      desc: 'Clear commentary on interest‑rate trajectories, fiscal policy, and global capital flows shaping local markets.',
      tag: 'Liquidity',
      image: '/assets/radar-liquidity.jpg',
    },
  ];

  // 4. Saturn Fund FAQs matching Landing Page
  const saturnFaqs = [
    {
      q: 'What is the Saturn Unit Trust Fund?',
      a: "The Saturn Unit Trust Fund is a wholesale managed fund structure that pools capital from eligible wholesale investors into a single vehicle, deployed according to a mandate emphasizing collateralised private credit and growth equity.",
    },
    {
      q: 'How does a wholesale managed fund in Australia operate?',
      a: "A wholesale managed fund in Australia pools capital from wholesale and sophisticated investors. A professional trustee or committee manages assets under a transparent mandate, distributing unit certificates and monthly income yields.",
    },
    {
      q: 'What is a unit trust investment and how do units work?',
      a: "In a unit trust investment, fund assets are divided into units. Each investor holds units proportional to their subscription. Unit pricing reflects underlying net asset values, and cashflow distributions are paid per unit held.",
    },
    {
      q: 'Who is eligible to invest in the Saturn Unit Trust Fund?',
      a: 'Eligibility is restricted to wholesale and sophisticated investors satisfying the statutory criteria under Section 708 / 761G of the Corporations Act 2001 (Cth), verified via an Accountant Certificate.',
    },
    {
      q: 'What is the underlying investment strategy of the fund?',
      a: "The fund targets 60% secured private debt & convertible notes for cashflow yield, 30% growth equities for upside participation, and 10% opportunistic special situations to capture market mispricings.",
    },
    {
      q: 'How are distributions and returns calculated in a unit trust?',
      a: "Distributions are generated from portfolio loan coupons, hybrid income, and realized equity gains. Indicative distributions are calculated and disbursed on a smoothed monthly cadence.",
    },
    {
      q: 'What are the risks and fees associated with investing in the fund?',
      a: "Risks include credit defaults, market volatility, and liquidity lock-in periods. All management fees and performance hurdle benchmarks are transparently disclosed in the Information Memorandum (IM).",
    },
  ];

  return (
    <div className="subpage-wrapper saturn-fund-page">
      
      {/* ===================================================================
          1. HERO SECTION: Full-width dark stage (Metrics Ribbon Removed)
          =================================================================== */}
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
            The <strong>Saturn Unit Trust Fund</strong> is our flagship pooled vehicle, offering qualified wholesale investors a dependable gateway to Australia’s surging private credit and mid‑market equity landscape.
          </p>
        </div>

        {/* Australia corner overlay image at 80% transparency on bottom-right */}
        <img 
          src="/assets/aus.png" 
          alt="Australia" 
          className="section-corner-overlay corner-overlay-aus" 
          aria-hidden="true" 
        />
      </section>

      {/* ===================================================================
          2. KEY FEATURES: Title & Background Only, Black Overlay Behind Title Only,
             Flips on X axis to reveal info on hover
          =================================================================== */}
      {/* ===================================================================
          2. KEY FEATURES: Natural Generated Images, Text & Favicon Only (No Card)
          =================================================================== */}
      <section className="saturn-features-section">
        {/* Background Originkit Predictive Arc: strictly background (WHY section background) */}
        <div className="connected-arc-bg-wrap" style={{ height: '100%', zIndex: 0 }} aria-hidden="true">
          <PredictiveArc
            background="#07090E"
            baseColor="#033826"
            accentColor="#00E599"
            highlight="#FFFFFF"
            density={85}
            dotSize={110}
            speed={55}
            arch={{ peak: 26, archHeight: 65, thickness: 110, falloff: 240 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div className="connected-vignette-overlay" />
        </div>

        <div className="container saturn-features-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="saturn-section-header text-center">
            <h2 className="saturn-section-headline">
              KEY FEATURES & WHAT YOU RECEIVE
            </h2>
            <p className="saturn-section-subtext">
              Engineered for predictable yield, disciplined capital protection, and structural upside.
            </p>
          </div>

          <div className="saturn-features-flip-grid">
            {keyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.id} className="saturn-flip-card-perspective">
                  <div className="saturn-flip-card-inner">
                    
                    {/* FRONT FACE: Background image + Title with black overlay ONLY behind title */}
                    <div 
                      className="saturn-flip-card-front"
                      style={{ backgroundImage: `url('${feat.image}')` }}
                    >
                      <div className="saturn-flip-title-overlay-pill">
                        <div className="saturn-flip-icon-dot" style={{ color: feat.accent }}>
                          <Icon size={18} />
                        </div>
                        <span className="saturn-flip-title-text">{feat.title}</span>
                      </div>
                    </div>

                    {/* BACK FACE: Revealed on X-axis hover flip */}
                    <div className="saturn-flip-card-back">
                      <div className="saturn-back-top-row">
                        <div className="saturn-back-icon-pod" style={{ color: feat.accent }}>
                          <Icon size={22} />
                        </div>
                        <div className="saturn-back-metric-box">
                          <span className="saturn-back-metric-num" style={{ color: feat.accent }}>
                            {feat.metric}
                          </span>
                          <span className="saturn-back-metric-label">
                            {feat.metricSub}
                          </span>
                        </div>
                      </div>

                      <h3 className="saturn-back-card-title">{feat.title}</h3>
                      <p className="saturn-back-card-desc">{feat.desc}</p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. OUR FIVE-STAGE PROCESS: Circular Favicons Only, Text Outside,
             Angled Connecting Lines (No Numbers)
          =================================================================== */}
      <section className="saturn-process-section" ref={processRef}>
        <div className="container saturn-process-container">
          <div className="saturn-section-header text-center">
            <h2 className="saturn-section-headline">
              OUR FIVE-STAGE PROCESS
            </h2>
            <p className="saturn-section-subtext">
              Rigorous underwriting, institutional due diligence, and ongoing lifecycle governance.
            </p>
          </div>

          <div className="saturn-angled-process-track">
            {/* Angled Connecting SVG Lines */}
            <svg 
              className="saturn-process-angled-svg" 
              viewBox="0 0 1000 360" 
              preserveAspectRatio="none" 
              aria-hidden="true"
            >
              {/* Background Guide Line */}
              <polyline 
                points="100,110 300,250 500,110 700,250 900,110" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.16)" 
                strokeWidth="3" 
                strokeDasharray="6 6" 
              />

              {/* Progress Line Illuminated on Scroll */}
              {activeStep >= 2 && (
                <polyline 
                  points={
                    activeStep === 2 ? "100,110 300,250" :
                    activeStep === 3 ? "100,110 300,250 500,110" :
                    activeStep === 4 ? "100,110 300,250 500,110 700,250" :
                    "100,110 300,250 500,110 700,250 900,110"
                  }
                  fill="none" 
                  stroke="#00E599" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0, 229, 153, 0.85))' }}
                />
              )}
            </svg>

            {/* 5 Alternating Node Columns */}
            <div className="saturn-angled-nodes-grid">
              {processStages.map((step, idx) => {
                const StepIcon = step.icon;
                const isGreen = idx < activeStep;
                const isUp = idx % 2 === 0;

                return (
                  <div 
                    key={step.id} 
                    className={`saturn-angled-node-col ${isUp ? 'is-up-node' : 'is-down-node'}`}
                  >
                    {/* Text Above for UP nodes */}
                    {isUp && (
                      <div className="saturn-node-text-outer text-above">
                        <h3 className="node-text-title">{step.title}</h3>
                        <p className="node-text-desc">{step.desc}</p>
                      </div>
                    )}

                    {/* Circular Card with ONLY Favicon Inside (No Numbers, No Text) */}
                    <div className={`saturn-pure-circle-favicon ${isGreen ? 'is-green-state' : 'is-white-state'}`}>
                      <StepIcon size={24} className="node-favicon-icon" />
                    </div>

                    {/* Text Below for DOWN nodes */}
                    {!isUp && (
                      <div className="saturn-node-text-outer text-below">
                        <h3 className="node-text-title">{step.title}</h3>
                        <p className="node-text-desc">{step.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. MARKET INSIGHTS RADAR: Smaller 2x2 Square with WHY Section Background
          =================================================================== */}
      <section className="saturn-insights-section">
        {/* Background Originkit Predictive Arc: strictly background (WHY section background) */}
        <div className="connected-arc-bg-wrap" style={{ height: '100%', zIndex: 0 }} aria-hidden="true">
          <PredictiveArc
            background="#07090E"
            baseColor="#033826"
            accentColor="#00E599"
            highlight="#FFFFFF"
            density={85}
            dotSize={110}
            speed={55}
            arch={{ peak: 26, archHeight: 65, thickness: 110, falloff: 240 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div className="connected-vignette-overlay" />
        </div>

        <div className="container saturn-insights-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="saturn-section-header text-center">
            <h2 className="saturn-section-headline">
              MARKET INSIGHTS RADAR
            </h2>
            <p className="saturn-section-subtext">
              We distil complex macro and sector data into actionable wholesale intelligence.
            </p>
          </div>

          {/* Row of Square Cards with Left Green Vertical Title Bar and Black Overlay Behind Info */}
          <div className="saturn-radar-row">
            {marketInsights.map((ins) => (
              <div 
                key={ins.id} 
                className="saturn-radar-square-card"
                style={{ backgroundImage: `url('${ins.image}')` }}
                onClick={() => onOpenModal && onOpenModal(`Market Insight: ${ins.title}`)}
                role="button"
                tabIndex={0}
              >
                {/* Left side: Green bar with vertical title */}
                <div className="saturn-radar-vertical-bar" aria-hidden="true">
                  <span className="saturn-radar-vertical-title">{ins.title}</span>
                </div>

                {/* Right side: Body area with black overlay behind info text (no title inside square card) */}
                <div className="saturn-radar-body-area">
                  <div className="saturn-radar-black-overlay">
                    <p className="saturn-radar-quadrant-desc">{ins.desc}</p>
                    
                    <div className="saturn-radar-quadrant-footer">
                      <span className="saturn-radar-link-text">Institutional Analysis</span>
                      <ArrowUpRight size={14} className="saturn-radar-arrow-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SATURN FUND FAQS: Just like the one in landing page
          =================================================================== */}
      <section className="faq-section-wrap light-theme-grid-bg" id="saturn-faqs">
        <div className="container">
          <div className="faq-header-center">
            <h2 className="faq-main-title">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="faq-subtitle">
              Statutory transparency regarding fund structure, eligibility, and distributions.
            </p>
          </div>

          <div className="faq-list-container">
            {saturnFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon-box">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-block">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. READY TO ALLOCATE: Full-width Edge-to-Edge Band matching "Have Questions?"
          =================================================================== */}
      <section className="about-questions-band" id="ready-to-allocate">
        <div className="about-questions-band-container">
          
          {/* Left (50% Green): Headline in Unbounded style */}
          <div className="about-questions-band-left">
            <div className="about-questions-band-left-inner">
              <h2 className="about-questions-band-headline">
                READY TO ALLOCATE?
              </h2>
              <p className="about-questions-band-subtext">
                Request the full Information Memorandum (IM) or arrange a confidential briefing with our investment managers.
              </p>
            </div>
          </div>

          {/* Right (50% Dark): CTA button and Factsheet download */}
          <div className="about-questions-band-right">
            <div className="saturn-band-actions-wrap">
              <button 
                type="button" 
                className="about-questions-band-btn"
                onClick={() => onOpenModal && onOpenModal('Saturn Fund Allocation')}
              >
                <span>Request Information Memorandum</span>
                <ArrowUpRight size={18} />
              </button>

              <a 
                href="/assets/Vitti_Capital_Guide.pdf"
                download="Vitti_Capital_Guide.pdf"
                className="saturn-band-factsheet-btn"
                title="Download Vitti Capital Guide (PDF)"
              >
                <Download size={16} />
                <span>Download Factsheet (PDF)</span>
              </a>
            </div>
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

    </div>
  );
}
