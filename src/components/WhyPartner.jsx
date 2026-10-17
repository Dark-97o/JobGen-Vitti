import React, { useState, useEffect, useRef } from 'react';
import PredictiveArc from './originkit/ui/predictive-arc';

const PARTITIONS = [
  {
    id: '01',
    title: 'Visionary Strategy',
    info: 'Anticipating macroeconomic shifts and structuring long-horizon capital architectures that capture generational growth across APAC and the GCC.',
    image: '/assets/partner-visionary.jpg',
  },
  {
    id: '02',
    title: 'Aligned Interests',
    info: 'Principal co-investment and performance-linked models guarantee that our incentives remain completely synchronized with our wholesale partners.',
    image: '/assets/partner-aligned.jpg',
  },
  {
    id: '03',
    title: 'Strategic Solutions',
    info: 'Engineering bespoke hybrid securities, secured credit facilities, and cross-border syndications tailored to exact balance-sheet requirements.',
    image: '/assets/partner-strategic.jpg',
  },
  {
    id: '04',
    title: 'Unwavering Integrity',
    info: 'Institutional transparency, statutory fiduciary compliance, and uncompromised ethical stewardship underpin every advisory mandate we execute.',
    image: '/assets/partner-integrity.jpg',
  },
  {
    id: '05',
    title: 'Commitment to Excellence',
    info: 'Exhaustive bottom-up research, rigorous stress-testing, and hands-on transaction management from initial structuring to liquidity realization.',
    image: '/assets/partner-excellence.jpg',
  },
];

export default function WhyPartner({ onOpenModal }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll progress through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        setScrollProgress(progress);
      }
    };

    handleScroll();

    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Morph progress: completes briskly over first 0.22 of the track so transitioning to next section is fast
  const rawProgress = Math.min(Math.max(scrollProgress / 0.22, 0), 1);
  const p = rawProgress * rawProgress * (3 - 2 * rawProgress);

  // Initial Fullscreen Headline fades out cleanly as p increases
  const headlineOpacity = Math.max(0, 1 - p * 2.5);
  const headlineTranslateY = -p * 40;

  // Left side (5 partitions) fades and slides in
  const leftOpacity = isMobile ? 1 : Math.min(1, Math.max(0, (p - 0.10) / 0.90));
  const leftTranslateX = isMobile ? 0 : (1 - p) * -35;

  // Partner image coordinates:
  // Starts 100% full screen (top 0, bottom 0, left 0, right 0),
  // then shrinks to occupy 45% of the right side (left: 55%, right: 40px, top: 9vh, bottom: 9vh)
  const imageCardStyle = isMobile
    ? {
        transform: 'translateY(40px)',
      }
    : {
        top: p > 0.001 ? `calc(${(p * 16).toFixed(2)}vh + ${(p * 12 + 30).toFixed(1)}px)` : '0px',
        bottom: p > 0.001 ? `calc(${(p * 16).toFixed(2)}vh + ${(p * 12 - 30).toFixed(1)}px)` : '0px',
        right: p > 0.001 ? `${(p * 40).toFixed(1)}px` : '0px',
        left: p > 0.001 ? `calc(${(p * 55).toFixed(2)}% + ${(p * 18).toFixed(1)}px)` : '0px',
        borderRadius: p > 0.001 ? `${(p * 48).toFixed(1)}px ${(p * 48).toFixed(1)}px 0 0` : '0px',
        boxShadow: p > 0.05 
          ? `0 28px 72px rgba(0, 0, 0, ${0.45 + p * 0.45}), 0 0 36px rgba(0, 229, 153, ${p * 0.22})`
          : 'none',
        border: p > 0.05 
          ? `2px solid rgba(255, 255, 255, ${0.2 + p * 0.3})` 
          : 'none',
      };

  return (
    <section className="partner-scroll-track" ref={trackRef} id="why-partner">
      <div className="partner-sticky-frame">
        {/* White line separator attached to the top */}
        <div className="section-top-white-line" aria-hidden="true" />
        
        {/* Background Originkit Predictive Arc: Strictly background (z-index 0, pointer-events none) */}
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

        {/* ===================================================================
            1. PARTNER IMAGE: STARTS 100% FULLSCREEN, CONTRACTS TO 45% ON RIGHT
            =================================================================== */}
        <div 
          className={`partner-image-morph ${p > 0.08 ? 'is-card-state' : 'is-fullscreen-state'}`}
          style={imageCardStyle}
        >
          {/* Background image: partner.webp */}
          <div 
            className="partner-img-bg"
            style={{ backgroundImage: `url('/assets/partner.webp')` }}
          />

          {/* Vignette overlay */}
          <div className="partner-img-vignette" />

          {/* "WHY" in the same font as the headline, shown on the shrunk card */}
          {p > 0.22 && (
            <div 
              className="partner-card-why-overlay"
              style={{
                opacity: Math.min(1, Math.max(0, (p - 0.22) / 0.78)),
              }}
            >
              <span className="partner-card-why-text">WHY</span>
            </div>
          )}
        </div>

        {/* ===================================================================
            2. FULLSCREEN INITIAL HEADLINE: Fades out cleanly as image shrinks
            =================================================================== */}
        <div 
          className="partner-hero-headline-wrap"
          style={{
            opacity: headlineOpacity,
            transform: `translate(-50%, calc(-50% + ${(headlineTranslateY + 30).toFixed(1)}px))`,
            pointerEvents: p > 0.08 ? 'none' : 'auto',
          }}
        >
          <h2 className="partner-hero-headline">
            Why Partner With<br />Vitti Capital?
          </h2>
        </div>

        {/* ===================================================================
            3. LEFT SIDE (55%): DARK PARTITION WITH 5 BIGGER HORIZONTAL ROWS
            =================================================================== */}
        <div 
          className="partner-partitions-container"
          style={{
            opacity: leftOpacity,
            transform: `translate(${leftTranslateX.toFixed(1)}px, 30px)`,
            pointerEvents: p > 0.22 ? 'auto' : 'none',
          }}
          aria-hidden={p < 0.12}
        >
          <div className="partner-partitions-inner">
            {/* 5 Horizontal Partitions with White Line Separators (Larger in Height) */}
            <div className="partner-partitions-list">
              {PARTITIONS.map((item, idx) => {
                const isHovered = hoveredIdx === idx;

                return (
                  <div
                    key={item.id}
                    className={`partner-partition-row ${isHovered ? 'is-expanded' : ''}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => onOpenModal && onOpenModal(`Partner Pillar: ${item.title}`)}
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

                      {/* Small Info Text (Revealed on Hover) */}
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

            {/* 3 Sector Square Cards below the options column */}
            <div className="why-sector-cards-row">
              <div className="why-sector-card">
                <div className="why-sector-logo-wrap">
                  <img 
                    src="/assets/Infrastructure.png" 
                    alt="Infrastructure" 
                    className="why-sector-logo" 
                  />
                </div>
                <span className="why-sector-title">Infrastructure</span>
              </div>

              <div className="why-sector-connector" aria-hidden="true" />

              <div className="why-sector-card">
                <div className="why-sector-logo-wrap">
                  <img 
                    src="/assets/RealEstate-removebg-preview.png" 
                    alt="Real Estate" 
                    className="why-sector-logo" 
                  />
                </div>
                <span className="why-sector-title">Real Estate</span>
              </div>

              <div className="why-sector-connector" aria-hidden="true" />

              <div className="why-sector-card">
                <div className="why-sector-logo-wrap">
                  <img 
                    src="/assets/Green.png" 
                    alt="Green Technologies" 
                    className="why-sector-logo" 
                  />
                </div>
                <span className="why-sector-title">Green Technologies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay image aus in bottom corner at 50% transparency */}
        <img 
          src="/assets/aus.png" 
          alt="Australia" 
          className="section-corner-overlay corner-overlay-aus" 
          aria-hidden="true" 
        />
      </div>
    </section>
  );
}
