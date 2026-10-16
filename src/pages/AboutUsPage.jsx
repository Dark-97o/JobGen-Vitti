import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import PredictiveArc from '../components/originkit/ui/predictive-arc';

const CORE_VALUE_PARTITIONS = [
  {
    id: '01',
    title: 'Integrity',
    info: "We are committed to unwavering honesty, transparency, and statutory ethical fiduciary practices, prioritising our clients' best interests in every single advisory mandate.",
    image: '/assets/partner-integrity.jpg',
  },
  {
    id: '02',
    title: 'Relationships',
    info: 'We cherish long-term connections, offering personalised attention and genuine care to foster enduring institutional partnerships spanning generations.',
    image: '/assets/partner-aligned.jpg',
  },
  {
    id: '03',
    title: 'Innovation',
    info: 'Thriving on creativity, we constantly explore innovative approaches and cutting-edge financial architectures to unearth exceptional cross-border alpha.',
    image: '/assets/partner-visionary.jpg',
  },
  {
    id: '04',
    title: 'Collaboration',
    info: 'At our core, we believe in the power of teamwork—internally among our sector principals and externally with institutional syndicates—to achieve optimal execution.',
    image: '/assets/partner-strategic.jpg',
  },
  {
    id: '05',
    title: 'Excellence',
    info: 'Exhaustive bottom-up research, rigorous stress-testing, and hands-on transaction management from initial structuring to liquidity realization.',
    image: '/assets/partner-excellence.jpg',
  },
];

export default function AboutUsPage({ onOpenModal, onNavigate }) {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper about-us-page">
      {/* 1. ABOUT OUR COMPANY: PredictiveArc background used in Why section, Text on Left, Floating Tablet on Right */}
      <section className="about-company-hero-section">
        {/* Background Component used in WHY section: PredictiveArc Canvas */}
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

        <div className="container about-company-container">
          <div className="about-company-grid about-company-grid-switched">
            
            {/* Left Column (Switched): Full Official Narrative from vitti.capital */}
            <div className="about-company-text-col">
              <h1 className="about-company-headline">
                ABOUT OUR COMPANY
              </h1>
              
              <div className="about-story-paragraphs">
                <p className="lead-paragraph">
                  <strong>Vitti Capital</strong> stands out as a dynamic and innovative financial services organisation, specialising in corporate finance consulting, stock trading, and wholesale asset allocation.
                </p>
                <p>
                  Our distinctive identity is rooted in building trust and cultivating long-term connections with our diverse clientele. We actively seek high-alpha opportunities in both early and mature stages, aiming to unlock unparalleled growth potential across Australia, the GCC, and the Asia-Pacific corridor.
                </p>
                <p>
                  What sets our brand apart is our commitment to continually support the enterprises we present to our wholesale partners, demonstrating a profound belief in the prospects we endorse through direct co-investment and active advisory stewardship.
                </p>
              </div>

              {/* Key Tenets Grid */}
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

            {/* Right Column (Switched): Floating Tablet Image directly on background (No box, no card frame) */}
            <div className="about-company-tablet-col">
              <div className="about-tablet-float-wrap">
                <img 
                  src="/assets/tablet.png" 
                  alt="Vitti Capital Portal" 
                  className="about-floating-tablet-img" 
                />
              </div>
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

      {/* 2. OUR CORE VALUES: Copied exact layout & aesthetics from Landing Page WHY section (Infrastructure cards removed) */}
      <section className="about-values-why-section" id="core-values">
        <div className="container about-values-why-container">
          
          <div className="about-values-stage-header">
            <h2 className="about-values-main-headline">
              OUR CORE VALUES
            </h2>
            <p className="about-values-stage-subtext">
              The five foundational pillars guiding every client mandate, investment allocation, and cross-border partnership.
            </p>
          </div>

          <div className="about-values-why-stage">
            {/* Left Column (55%): Interactive Horizontal Partitions with white separators */}
            <div className="about-values-partitions-col">
              <div className="partner-partitions-list">
                {CORE_VALUE_PARTITIONS.map((item, idx) => {
                  const isHovered = hoveredIdx === idx;

                  return (
                    <div
                      key={item.id}
                      className={`partner-partition-row ${isHovered ? 'is-expanded' : ''}`}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onClick={() => onOpenModal && onOpenModal(`Core Value: ${item.title}`)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isHovered}
                    >
                      {/* Partition Photographic Background (Expands on Hover) */}
                      <div 
                        className="partner-partition-bg"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      <div className="partner-partition-bg-overlay" />

                      {/* Content Row */}
                      <div className="partner-partition-content">
                        <div className="partner-partition-main-line">
                          <div className="partner-partition-title-group">
                            <span className="partner-partition-num">{item.id}</span>
                            <h4 className="partner-partition-title">{item.title}</h4>
                          </div>
                          <span className="partner-partition-arrow">
                            {isHovered ? '↓' : '→'}
                          </span>
                        </div>

                        {/* Info Text Revealed on Hover/Expansion */}
                        <div className="partner-partition-info-wrap">
                          <p className="partner-partition-info-text">{item.info}</p>
                          <div className="partner-partition-cta-row">
                            <span className="partner-partition-cta">
                              Explore Alignment →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (45%): Visual Hero Card with "VALUES" overlay (Pill and innovation text removed) */}
            <div className="about-values-preview-col">
              <div className="about-values-preview-card">
                <div 
                  className="about-values-preview-bg"
                  style={{ 
                    backgroundImage: `url('${CORE_VALUE_PARTITIONS[hoveredIdx]?.image || CORE_VALUE_PARTITIONS[0].image}')` 
                  }}
                />
                <div className="about-values-preview-vignette" />
                <div className="about-values-preview-overlay">
                  <span className="about-values-wordmark">VALUES</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DUAL-DESK GLOBAL GOVERNANCE with Empowering Growth Card nested inside (black background) */}
      <section className="about-governance-section">
        <div className="container about-governance-container">
          <div className="about-governance-header text-center">
            <h2 className="about-governance-main-title">
              Dual-Desk Global Presence
            </h2>
            <p className="about-section-subtext">
              Direct presence and regulatory licensing across Asia-Pacific and Gulf financial hubs.
            </p>
          </div>

          <div className="about-desks-grid">
            {/* Sydney Desk (Pills removed, clean typography) */}
            <div className="about-desk-card">
              <div 
                className="desk-card-bg"
                style={{ backgroundImage: `url('/assets/australia-card.jpg')` }}
              />
              <div className="desk-card-overlay" />
              <div className="desk-card-content">
                <h3 className="desk-card-title">Sydney Desk</h3>
                <p className="desk-address">Level 49, 8 Parramatta Square, 10 Darcy St, Parramatta NSW 2150</p>
                <div className="desk-meta">
                  <span>Phone: (02) 8528 4508</span>
                  <span>AFSL Authorized: 001306367</span>
                </div>
              </div>
            </div>

            {/* Dubai Desk (Pills removed, clean typography) */}
            <div className="about-desk-card">
              <div 
                className="desk-card-bg"
                style={{ backgroundImage: `url('/assets/dubai-card.jpg')` }}
              />
              <div className="desk-card-overlay" />
              <div className="desk-card-content">
                <h3 className="desk-card-title">Dubai Desk</h3>
                <p className="desk-address">DIFC Capital Gate, Dubai, United Arab Emirates</p>
                <div className="desk-meta">
                  <span>Licensing: DET License No. 1537728</span>
                  <span>Mandate: Wholesale Advisory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Empowering Growth Card: Black background, shifted inside Dual Desk section */}
          <div className="about-mission-box about-mission-box-black">
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

      {/* 4. HAVE QUESTIONS: Full-width Edge-to-Edge Band (matching Market Updates & Blog Band) */}
      <section className="about-questions-band" id="have-questions">
        <div className="about-questions-band-container">
          
          {/* Left: Headline in Unbounded style */}
          <div className="about-questions-band-left">
            <div className="about-questions-band-left-inner">
              <h2 className="about-questions-band-headline">
                HAVE QUESTIONS?
              </h2>
              <p className="about-questions-band-subtext">
                Speak directly with our senior corporate advisory principals in Sydney or Dubai.
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <div className="about-questions-band-right">
            <button 
              type="button" 
              className="about-questions-band-btn"
              onClick={() => onOpenModal && onOpenModal('Corporate Advisory Mandate')}
            >
              <span>Speak With A Principal</span>
              <ArrowUpRight size={18} />
            </button>
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

