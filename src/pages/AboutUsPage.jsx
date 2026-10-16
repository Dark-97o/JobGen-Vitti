import React, { useEffect } from 'react';
import { ArrowUpRight, Shield, Users, Lightbulb, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import PredictiveArc from '../components/originkit/ui/predictive-arc';

export default function AboutUsPage({ onOpenModal, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      id: 'integrity',
      title: 'Integrity',
      subtitle: 'Ethical Foundation',
      desc: "We are committed to unwavering honesty, transparency, and ethical practices, prioritising our clients' best interests in every advisory mandate.",
      icon: Shield,
      tag: 'Core Pillar 01',
      bgImg: '/assets/partner-integrity.jpg',
    },
    {
      id: 'relationships',
      title: 'Relationships',
      subtitle: 'Enduring Partnerships',
      desc: 'We cherish long-term connections, offering personalised attention and genuine care to foster enduring partnerships spanning generations.',
      icon: Users,
      tag: 'Core Pillar 02',
      bgImg: '/assets/partner-aligned.jpg',
    },
    {
      id: 'innovation',
      title: 'Innovation',
      subtitle: 'Alpha Discovery',
      desc: 'Thriving on creativity, we constantly explore innovative approaches and cutting-edge financial architectures to unearth exceptional cross-border value.',
      icon: Lightbulb,
      tag: 'Core Pillar 03',
      bgImg: '/assets/partner-visionary.jpg',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      subtitle: 'Syndicate Power',
      desc: 'At our core, we believe in the power of teamwork—internally among our sector principals and externally with institutional syndicates—to achieve optimal execution.',
      icon: Compass,
      tag: 'Core Pillar 04',
      bgImg: '/assets/partner-strategic.jpg',
    },
  ];

  return (
    <div className="subpage-wrapper about-us-page">
      {/* 1. HERO SECTION: Full-width dark stage with PredictiveArc background */}
      <section className="subpage-hero-section">
        <div className="subpage-arc-bg-wrap" aria-hidden="true">
          <PredictiveArc
            background="#07090E"
            baseColor="#033826"
            accentColor="#00E599"
            highlight="#FFFFFF"
            density={75}
            dotSize={100}
            speed={45}
            arch={{ peak: 30, archHeight: 70, thickness: 120, falloff: 260 }}
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
            <span className="breadcrumb-current">About Us</span>
          </nav>

          {/* Prominent Bold Headline without top pills (strictly per Project Rules) */}
          <h1 className="subpage-hero-headline">
            Building a Brighter<br />Financial Future.
          </h1>

          <p className="subpage-hero-subtext">
            Vitti Capital is a premier wholesale financial services organisation specialising in corporate finance consulting, private market syndication, and high-conviction capital markets execution across Australia and the GCC.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="subpage-metrics-ribbon">
            <div className="subpage-metric-item">
              <span className="metric-val">AFSL 518031</span>
              <span className="metric-lbl">CAR 001306367</span>
            </div>
            <div className="subpage-metric-divider" />
            <div className="subpage-metric-item">
              <span className="metric-val">Sydney & Dubai</span>
              <span className="metric-lbl">Parramatta Sq & DIFC Desks</span>
            </div>
            <div className="subpage-metric-divider" />
            <div className="subpage-metric-item">
              <span className="metric-val">Wholesale Only</span>
              <span className="metric-lbl">Corporations Act 2001 (Cth)</span>
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

      {/* 2. ABOUT OUR COMPANY: Deep Story & Distinctive Identity */}
      <section className="about-narrative-section">
        <div className="container about-narrative-container">
          <div className="about-narrative-grid">
            
            {/* Left Column: Visual Brand Story Card */}
            <div className="about-story-visual-card">
              <div 
                className="about-visual-bg" 
                style={{ backgroundImage: `url('/assets/hero-cards.jpg')` }}
              />
              <div className="about-visual-overlay" />
              <div className="about-visual-content">
                <span className="about-visual-tag">Institutional Heritage</span>
                <h3 className="about-visual-quote">
                  "Continually supporting the enterprises we back, with unwavering conviction."
                </h3>
                <div className="about-visual-signature">
                  <span className="sig-line">Vitti Capital Corporate Advisory</span>
                  <span className="sig-sub">Sydney • Dubai</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Official Narrative from vitti.capital */}
            <div className="about-story-text-column">
              <h2 className="about-section-heading">
                ABOUT OUR COMPANY
              </h2>
              
              <div className="about-story-paragraphs">
                <p className="lead-paragraph">
                  <strong>Vitti Capital</strong> stands out as a dynamic and innovative financial services organisation, specialising in corporate finance consulting and stock trading.
                </p>
                <p>
                  Our distinctive identity is rooted in building trust and cultivating long-term connections with our diverse clientele. We actively seek high-alpha opportunities in both early and mature stages, aiming to unlock unparalleled growth potential.
                </p>
                <p>
                  What sets our brand apart is our commitment to continually support the companies we present to our clients for investments, demonstrating a profound belief in the prospects we endorse.
                </p>
              </div>

              {/* Key Tenets Bento Grid */}
              <div className="about-tenets-grid">
                <div className="about-tenet-card">
                  <CheckCircle2 size={18} className="tenet-icon" />
                  <div className="tenet-info">
                    <h4>High-Alpha Origination</h4>
                    <p>Proprietary access to institutional placements and unlisted growth rounds.</p>
                  </div>
                </div>
                <div className="about-tenet-card">
                  <CheckCircle2 size={18} className="tenet-icon" />
                  <div className="tenet-info">
                    <h4>Direct Sponsor Co-Investment</h4>
                    <p>We align incentives by putting our own capital behind endorsed mandates.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES: Circular / Neomorphic Institutional Cards */}
      <section className="about-values-section">
        <div className="container about-values-container">
          <div className="about-values-header text-center">
            <h2 className="about-section-heading">
              Our Core Values
            </h2>
            <p className="about-section-subtext">
              The four foundational pillars guiding every client mandate and transaction.
            </p>
          </div>

          <div className="about-values-grid">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.id} className="about-value-card">
                  <div 
                    className="about-value-card-bg"
                    style={{ backgroundImage: `url('${val.bgImg}')` }}
                  />
                  <div className="about-value-card-overlay" />
                  
                  <div className="about-value-card-content">
                    <div className="value-icon-bubble">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>
                    <span className="value-tag-badge">{val.tag}</span>
                    <h3 className="value-card-title">{val.title}</h3>
                    <h4 className="value-card-sub">{val.subtitle}</h4>
                    <p className="value-card-desc">{val.desc}</p>
                  </div>
                </div>
              );
            })}
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

      {/* 4. OUR MISSION: Distinctive Institutional Callout Stage */}
      <section className="about-mission-section">
        <div className="container about-mission-container">
          <div className="about-mission-box">
            <div className="mission-glow-orb" />
            
            <div className="about-mission-inner">
              <h2 className="about-mission-heading">
                Empowering Growth, Together.
              </h2>
              
              <blockquote className="about-mission-statement">
                "To introduce you to a realm of investment opportunities poised to redefine your financial future by identifying and leveraging high-conviction investments within the charted and uncharted territories of listed and unlisted entities."
              </blockquote>

              <div className="mission-author-line">
                <span className="mission-author-title">The Vitti Capital Investment Committee</span>
                <span className="mission-author-loc">Sydney & Dubai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUAL-DESK GLOBAL GOVERNANCE */}
      <section className="about-governance-section">
        <div className="container about-governance-container">
          <div className="about-governance-header text-center">
            <h2 className="about-section-heading">
              Dual-Desk Global Presence
            </h2>
            <p className="about-section-subtext">
              Direct presence across Asia-Pacific and Gulf financial hubs.
            </p>
          </div>

          <div className="about-desks-grid">
            {/* Sydney Desk */}
            <div className="about-desk-card">
              <div 
                className="desk-card-bg"
                style={{ backgroundImage: `url('/assets/australia-card.jpg')` }}
              />
              <div className="desk-card-overlay" />
              <div className="desk-card-content">
                <span className="desk-badge">Australian Headquarters</span>
                <h3>Sydney Desk</h3>
                <p className="desk-address">Level 49, 8 Parramatta Square, 10 Darcy St, Parramatta NSW 2150</p>
                <div className="desk-meta">
                  <span>Phone: (02) 8528 4508</span>
                  <span>AFSL Authorized: 001306367</span>
                </div>
              </div>
            </div>

            {/* Dubai Desk */}
            <div className="about-desk-card">
              <div 
                className="desk-card-bg"
                style={{ backgroundImage: `url('/assets/dubai-card.jpg')` }}
              />
              <div className="desk-card-overlay" />
              <div className="desk-card-content">
                <span className="desk-badge">GCC Gateway</span>
                <h3>Dubai Desk</h3>
                <p className="desk-address">DIFC Capital Gate, Dubai, United Arab Emirates</p>
                <div className="desk-meta">
                  <span>Licensing: DET License No. 1537728</span>
                  <span>Mandate: Wholesale Advisory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: Have Questions? */}
      <section className="about-cta-section">
        <div className="container about-cta-container">
          <div className="about-cta-banner">
            <div className="about-cta-content">
              <h2 className="about-cta-heading">
                Have Questions? We Are Here To Help You.
              </h2>
              <p className="about-cta-sub">
                Speak directly with our senior corporate advisory principals in Sydney or Dubai.
              </p>
            </div>
            
            <button 
              type="button" 
              className="about-cta-btn"
              onClick={() => onOpenModal && onOpenModal('Corporate Advisory Mandate')}
            >
              <span>Speak With A Principal</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
