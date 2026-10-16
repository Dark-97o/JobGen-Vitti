import React, { useState, useEffect, useRef } from 'react';

export default function SuccessStory({ onOpenModal }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Phase 1: Full background image with pure bold SUCCESS STORY headline
  // Phase 2: Light black overlay smoothly fades in, revealing the company button, "add text image", and story text (no cards/boxes)
  const overlayRaw = Math.min(Math.max((scrollProgress - 0.10) / 0.26, 0), 1);
  const overlayOpacity = overlayRaw * overlayRaw * (3 - 2 * overlayRaw);

  const contentRaw = Math.min(Math.max((scrollProgress - 0.14) / 0.30, 0), 1);
  const contentProgress = contentRaw * contentRaw * (3 - 2 * contentRaw);
  const contentTranslateY = (1 - contentProgress) * 30;

  return (
    <section className="success-scroll-track" ref={trackRef} id="success-story">
      <div className="success-sticky-frame">
        
        {/* ===================================================================
            1. SUCCESS IMAGE BACKGROUND: Nasdaq Bell Ringing Photo
            =================================================================== */}
        <div 
          className="success-bg-image"
          style={{ backgroundImage: `url('/assets/success.webp')` }}
        />

        {/* ===================================================================
            2. LIGHT BLACK OVERLAY: Only appears when further scrolled
            =================================================================== */}
        <div 
          className="success-black-overlay"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Subtle cinematic vignette */}
        <div className="success-vignette" />

        {/* ===================================================================
            3. SECTION HEADLINE: "SUCCESS STORY"
               (Brought down by 30px, increased size by 6px, NO pills per AGENTS.md)
            =================================================================== */}
        <div className="success-header-wrap">
          <h2 className="success-main-headline">
            SUCCESS STORY
          </h2>
        </div>

        {/* ===================================================================
            4. REVEALED CONTENT ON FURTHER SCROLL:
               Pure text on the black overlay — NO cards, NO boxes, NO enclosures!
            =================================================================== */}
        <div 
          className="success-content-container"
          style={{
            opacity: contentProgress,
            transform: `translateY(${contentTranslateY.toFixed(1)}px)`,
            pointerEvents: contentProgress > 0.25 ? 'auto' : 'none',
          }}
        >
          <div className="success-pure-text-wrap">
            {/* Subheadline and Story Narrative: Pure Text */}
            <h3 className="success-story-subheadline">
              Dual-Listing Mandate & Global Capital Positioning
            </h3>
            
            <p className="success-story-lead">
              Vitti Capital served as lead corporate advisor, orchestrating multi-stage capital structuring and US public market positioning for Braiin’s AI edge-robotics and technology platform.
            </p>

            <div className="success-add-text-image-row">
              <p className="success-quote-text">
                “Vitti’s bridge between Australian private equity and US public listing frameworks provided the exact structuring advantage we needed to ring the bell on the world stage.”
              </p>
            </div>

            {/* Transaction Key Highlights: Pure Text Row (No boxes) */}
            <div className="success-metrics-pure-row">
              <div className="success-metric-pure">
                <span className="success-metric-val">NASDAQ</span>
                <span className="success-metric-lbl">Target Exchange</span>
              </div>
              <div className="success-metric-divider" />
              <div className="success-metric-pure">
                <span className="success-metric-val">Cross-Border</span>
                <span className="success-metric-lbl">Australia ⇄ United States</span>
              </div>
              <div className="success-metric-divider" />
              <div className="success-metric-pure">
                <span className="success-metric-val">Pre-IPO</span>
                <span className="success-metric-lbl">Capital Architecture</span>
              </div>
            </div>

          </div>
        </div>

        {/* Overlay image dub in bottom corner at 50% transparency */}
        <img 
          src="/assets/dub.png" 
          alt="Dubai" 
          className="section-corner-overlay corner-overlay-dub" 
          aria-hidden="true" 
        />
      </div>
    </section>
  );
}
