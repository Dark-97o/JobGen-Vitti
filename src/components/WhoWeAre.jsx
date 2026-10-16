import React, { useRef, useState, useEffect } from 'react';
import FibreArc from './originkit/ui/fibre-arc';

export default function WhoWeAre({ onOpenModal }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When section top is at windowH (just entering from bottom), progress = 0
      // When section top is at 0 (fully aligned), progress = 1
      const p = Math.min(Math.max((windowH - rect.top) / windowH, 0), 1);
      setScrollProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const p = scrollProgress;
  // Dynamic scroll float-down offset: translates down by 220px as you scroll into the section
  const floatDownOffset = (1 - p) * -220;
  const floatScale = 1 + (1 - p) * 0.1;
  const cardOpacity = 0.6 + p * 0.4;

  return (
    <section className="who-we-are-snap-section snap-section" id="who-we-are" ref={sectionRef}>
      <div className="container who-we-are-layout-container">
        
        {/* ===================================================================
            LEFT COLUMN: CREME LIGHT SECTION CONTENT
            =================================================================== */}
        <div className="who-text-column">
          <div className="who-pill-badge">
            <span className="who-pill-accent" />
            <span>Who we are?</span>
          </div>

          <h2 className="who-headline-1">
            Who we are?
          </h2>

          <h3 className="who-headline-2">
            Wholesale Investment Advisory for Australia and the GCC
          </h3>

          <p className="who-body-text">
            Imagine a financial partner who treats your vision as the blueprint for every decision they make. At Vitti Capital, we weave sharp market intelligence with an unwavering ethical compass to bring that vision to life. Whether you seek to grow generational wealth, fund the next wave of innovation, or unlock value hidden deep within your balance sheet, our mission is to help you shape tomorrow’s wealth—today.
          </p>

          <div className="who-pillars-grid">
            <div className="who-pillar-item">
              <span className="who-pillar-icon">🏛️</span>
              <div>
                <strong>Generational Wealth</strong>
                <span>Direct balance-sheet preservation</span>
              </div>
            </div>
            <div className="who-pillar-item">
              <span className="who-pillar-icon">⚡</span>
              <div>
                <strong>Growth Innovation</strong>
                <span>Pre-IPO & hybrid venture structuring</span>
              </div>
            </div>
            <div className="who-pillar-item">
              <span className="who-pillar-icon">🌏</span>
              <div>
                <strong>Australia ⇄ GCC</strong>
                <span>Sydney & Dubai dual capital desks</span>
              </div>
            </div>
          </div>

          <div className="who-action-row">
            <button 
              type="button"
              className="btn btn-dark-ink btn-lg"
              onClick={() => onOpenModal && onOpenModal('Advisory Consultation (Who We Are)')}
            >
              <span>Book Advisory Call</span>
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <a href="#divisions" className="who-text-link">
              Explore Specialized Divisions →
            </a>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: FLOATING HERO CARD
            Contains the dark Fibre Arc background and "GET MORE FROM YOUR MONEY"
            Floats down from above into the right side of this section!
            =================================================================== */}
        <div className="who-card-column">
          <div 
            className="who-floated-hero-card"
            style={{
              transform: `translateY(${floatDownOffset.toFixed(1)}px) scale(${floatScale.toFixed(3)})`,
              opacity: cardOpacity,
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out',
            }}
          >
            {/* Fibre Arc Background */}
            <div className="who-card-fibre-wrap" aria-hidden="true">
              <FibreArc
                background="#07090E"
                baseColor="#044D34"
                accentColor="#00E599"
                highlight="#FFFFFF"
                density={24}
                speed={60}
                direction={0}
                hover={160}
                reach={28}
                bundle={{
                  curve: 155,
                  spread: 110,
                  thickness: 115,
                  comb: 175
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
              <div className="who-card-vignette" />
            </div>

            {/* Live System Badge */}
            <div className="who-card-status-badge">
              <span className="live-dot" />
              <span>CAPITAL SYSTEM</span>
            </div>

            {/* Main Focus: Pure White Funky Headline + Book a Call button */}
            <div className="who-card-content">
              <h3 className="who-card-funky-title">
                GET MORE <br />
                FROM YOUR MONEY
              </h3>

              <div className="who-card-action">
                <button 
                  className="btn btn-primary-glow btn-md who-card-btn"
                  onClick={() => onOpenModal && onOpenModal('Book a Call')}
                >
                  <span>Book a Call</span>
                  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Inner Emerald Glow Border */}
            <div className="who-card-ambient-glow" />
          </div>
        </div>

      </div>
    </section>
  );
}
