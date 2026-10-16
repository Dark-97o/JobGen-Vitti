import React, { useState, useEffect, useRef } from 'react';
import FibreArc from './originkit/ui/fibre-arc';
import GlobeStudy from './originkit/ui/globe-study-custom-style';
import Ticker from './Ticker';

export default function Hero({ onOpenModal, selectedRegion = 'AU' }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic one-scroll smooth morph between fullscreen hero and card state
  useEffect(() => {
    let isAutoScrolling = false;
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (isAutoScrolling || isMobile) return;
      if (!trackRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const trackTop = trackRef.current.offsetTop;
      const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;

      // 1. One scroll down from top -> automatically glides smoothly to card state
      if (e.deltaY > 12 && scrollY <= 30 && scrollProgress < 0.1) {
        isAutoScrolling = true;
        const target = trackTop + scrollableDistance * 0.35;
        if (window.__lenis) {
          window.__lenis.scrollTo(target, {
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => {
              setTimeout(() => { isAutoScrolling = false; }, 120);
            },
          });
        } else {
          window.scrollTo({ top: target, behavior: 'smooth' });
          setTimeout(() => { isAutoScrolling = false; }, 850);
        }
      }
      // 2. One scroll up from card state -> automatically glides smoothly back to fullscreen hero
      else if (e.deltaY < -12 && scrollProgress > 0.22 && scrollProgress < 0.45) {
        isAutoScrolling = true;
        if (window.__lenis) {
          window.__lenis.scrollTo(0, {
            duration: 0.95,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => {
              setTimeout(() => { isAutoScrolling = false; }, 120);
            },
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => { isAutoScrolling = false; }, 850);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAutoScrolling || isMobile) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      const scrollY = window.scrollY || window.pageYOffset;

      if (diffY > 40 && scrollY <= 30 && scrollProgress < 0.1) {
        isAutoScrolling = true;
        const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;
        const target = trackRef.current.offsetTop + scrollableDistance * 0.35;
        if (window.__lenis) {
          window.__lenis.scrollTo(target, {
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => { isAutoScrolling = false; },
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, isMobile]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }
          const rect = trackRef.current.getBoundingClientRect();
          const scrollableDistance = rect.height - window.innerHeight;

          if (scrollableDistance > 0) {
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
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

  // Morph into card faster and smoother
  const rawProgress = Math.min(Math.max(scrollProgress / 0.32, 0), 1);
  const p = rawProgress * rawProgress * (3 - 2 * rawProgress);


  // Desktop card coordinates:
  // Card height decreased by 50px (top + 25px, bottom + 25px)
  // At p = 0, every offset is strictly 0px so the hero section covers 100% full screen!
  const cardStyle = isMobile
    ? {}
    : {
        top: p > 0.001 ? `calc(${(p * 24).toFixed(2)}vh + ${(p * 70).toFixed(1)}px)` : '0px',
        bottom: p > 0.001 ? `calc(${(p * 26).toFixed(2)}vh + ${(p * 10).toFixed(1)}px)` : '0px',
        right: p > 0.001 ? `${(p * 80).toFixed(1)}px` : '0px',
        left: `${(p * 65).toFixed(2)}%`,
        borderRadius: `${(p * 26).toFixed(1)}px`,
        boxShadow: p > 0.04 
          ? `0 25px 60px rgba(0, 0, 0, ${0.25 + p * 0.35}), 0 0 40px rgba(0, 229, 153, ${p * 0.2})` 
          : 'none',
        border: p > 0.04 
          ? `1px solid rgba(255, 255, 255, ${0.08 + p * 0.12})` 
          : '1px solid transparent',
      };

  // Headline interpolation: shifts from left offset (-165px, 50px) to centered card (0px, 0px) - added left spacing
  const headlineTranslateX = -165 * (1 - p);
  const headlineTranslateY = 50 * (1 - p);
  // Title scales cleanly
  const titleFontSize = 40 + (1 - p) * 52;

  // Who We Are content opacity and slide-in
  const whoWeAreOpacity = isMobile ? 1 : Math.min(1, Math.max(0, p * 1.15 - 0.05));
  const leftOpacity = whoWeAreOpacity;
  const leftTranslateY = isMobile ? 0 : (1 - p) * 20;

  // Phone image in bottom right corner (fades out as card contracts)
  const phoneOpacity = Math.max(0, 1 - p * 2.2);

  return (
    <section className="hero-scroll-track" ref={trackRef} id="hero-track">
      <div className="hero-sticky-frame">
        
        {/* ===================================================================
            ORIGINKIT GLOBE STUDY BACKGROUND (RIGHT SIDE, NON-INTERACTIVE)
            =================================================================== */}
        <div className="who-globe-bg-wrap" aria-hidden="true">
          <GlobeStudy
            background="transparent"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
          {/* Creme overlay layer */}
          <div className="who-globe-creme-overlay" />
        </div>

        {/* ===================================================================
            CREME LIGHT "WHO WE ARE" SECTION
            "WHO WE ARE?" all caps & bolder at the top
            Second headline and info shifted up by 60px
            No box for info text (pure text on creme background)
            Generous left & right padding with zero clipping
            =================================================================== */}
        <div 
          className="who-we-are-container"
          style={{
            opacity: leftOpacity,
            transform: `translateY(${leftTranslateY.toFixed(1)}px)`,
            pointerEvents: p > 0.3 ? 'auto' : 'none',
          }}
          id="who-we-are"
          aria-hidden={p < 0.2}
        >
          <div className="who-container-inner">
            
            {/* TOP HEADER: "WHO WE ARE" in same font as hero headline */}
            <div className="who-header-top">
              <h2 className="who-headline-1">
                WHO WE ARE
              </h2>
            </div>

            {/* LOWER ROW: Left Story Column (Shifted up by 60px) + Space for Floating Card (35%) */}
            <div className="who-lower-row">
              <div className="who-story-column">
                {/* Second Headline dynamically changes based on whether Australia or Dubai is selected */}
                <h2 className="who-headline-2">
                  {selectedRegion === 'AU'
                    ? 'Wholesale Investment Advisory for Australia & GCC'
                    : 'Wholesale Investment Advisory for Dubai & the GCC'}
                </h2>

                <p className="who-body-text">
                  Imagine a financial partner who treats your vision as the blueprint for every decision they make. At Vitti Capital, we weave sharp market intelligence with an unwavering ethical compass to bring that vision to life. Whether you seek to grow generational wealth, fund the next wave of innovation, or unlock value hidden deep within your balance sheet, our mission is to help you shape tomorrow’s wealth—today.
                </p>

                <div className="who-action-row">
                  <button 
                    type="button"
                    className="btn btn-dark-ink btn-lg who-cta-btn"
                    onClick={() => onOpenModal && onOpenModal(`Advisory Consultation (${selectedRegion === 'AU' ? 'Australia Desk' : 'Dubai Desk'})`)}
                  >
                    <span>Book Advisory Call</span>
                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* 2 Region Display Cards below info text: Australia & Dubai (Selected from navbar) */}
                <div className="who-region-cards-row" aria-label="Investment Desks">
                  {/* Australia Card */}
                  <div
                    className={`who-region-card who-region-display-card ${selectedRegion === 'AU' ? 'is-selected' : ''}`}
                    style={{ backgroundImage: `url('/assets/australia-card.jpg')` }}
                    aria-label="Australia desk"
                  >
                    <div className="who-region-overlay" />
                    <span className="who-region-label">AUSTRALIA</span>
                  </div>

                  {/* Dubai Card */}
                  <div
                    className={`who-region-card who-region-display-card ${selectedRegion === 'AE' ? 'is-selected' : ''}`}
                    style={{ backgroundImage: `url('/assets/dubai-card.jpg')` }}
                    aria-label="Dubai desk"
                  >
                    <div className="who-region-overlay" />
                    <span className="who-region-label">DUBAI</span>
                  </div>
                </div>
              </div>

              {/* Empty placeholder slot reserving space for the 35% floating Hero Card */}
              <div className="who-card-slot" aria-hidden="true" />
            </div>

          </div>
        </div>

        {/* ===================================================================
            HERO CARD: COVERS 100% FULLSCREEN AT TOP, CONTRACTS TO 35% ON SCROLL
            Card height decreased by 50px in Who We Are section
            =================================================================== */}
        <div 
          className={`hero-card-morph ${p > 0.08 ? 'is-card-state' : 'is-fullscreen-state'}`}
          style={cardStyle}
          id="hero"
        >
          {/* FibreArc WebGL Canvas (single persistent instance) */}
          <div className="hero-fibre-canvas-wrap" aria-hidden="true">
            <FibreArc
              background="#07090E"
              baseColor="#044D34"
              accentColor="#00E599"
              highlight="#FFFFFF"
              density={26}
              speed={65}
              direction={0}
              hover={180}
              reach={30}
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
                minWidth: '100%',
                minHeight: '100%',
              }}
            />
            <div className="hero-vignette-bottom" />
          </div>

          {/* City Silhouette Layer attached at the bottom over the background */}
          <div className="hero-city-backdrop-layer" aria-hidden="true">
            <img 
              src="/assets/city.png" 
              alt="City skyline" 
              className="hero-city-img" 
            />
          </div>

          {/* Main Focus: Pure White Funky Headline + Book a Call button in Hero */}
          <div className="hero-card-content-center">
            <div 
              className="hero-headline-wrapper"
              style={{
                transform: `translate(${headlineTranslateX.toFixed(1)}px, ${headlineTranslateY.toFixed(1)}px)`,
                textAlign: p > 0.3 ? 'center' : 'left',
                padding: p > 0.3 ? '0 20px' : '0 20px 0 clamp(28px, 4vw, 70px)',
                width: '100%',
                boxSizing: 'border-box',
                transition: 'none',
              }}
            >
              {/* Hero headline: smoothly interpolates size with zero layout jumps (scaled down by 10%) */}
              <h1 
                className="hero-funky-title"
                style={{
                  fontSize: `clamp(${(29 + (1 - p) * 21.5).toFixed(1)}px, ${(2.4 + (1 - p) * 4.3).toFixed(2)}vw, ${(38 + (1 - p) * 57.5).toFixed(1)}px)`,
                  lineHeight: (1.15 - (1 - p) * 0.17).toFixed(2),
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                GET MORE <br />
                FROM YOUR MONEY
              </h1>

              {/* Book a Call button: fades out smoothly with zero layout reflow */}
              <div 
                className="hero-action-row"
                style={{
                  opacity: Math.max(0, 1 - p * 3.5),
                  pointerEvents: p < 0.15 ? 'auto' : 'none',
                  justifyContent: 'flex-start',
                  marginTop: '32px',
                  visibility: p > 0.35 ? 'hidden' : 'visible',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <button 
                  type="button"
                  className="btn btn-primary-glow btn-lg hero-book-call-btn"
                  onClick={() => onOpenModal && onOpenModal('Book a Call')}
                >
                  <span>Book a Call</span>
                  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Phone Image in bottom right (fades out as card contracts) */}
          <div 
            className="hero-floating-phone-corner"
            style={{
              opacity: phoneOpacity,
              pointerEvents: p < 0.2 ? 'auto' : 'none',
            }}
          >
            <img 
              src="/assets/phone.png" 
              alt="Vitti Portfolio Mobile App" 
              className="hero-floating-phone-img"
            />
          </div>
        </div>

        {/* ===================================================================
            REAL-TIME FINANCIAL MARKETS TICKER RIBBON
            (Visible ONLY on the Who We Are section, hidden on Hero view)
            =================================================================== */}
        <div 
          className="hero-section-ticker-dock"
          style={{
            opacity: whoWeAreOpacity,
            pointerEvents: whoWeAreOpacity > 0.4 ? 'auto' : 'none',
            visibility: whoWeAreOpacity > 0.05 ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease',
          }}
        >
          <Ticker />
        </div>

      </div>
    </section>
  );
}
