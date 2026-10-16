import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Sparkles, Users, Award } from 'lucide-react';

export default function SydneyCapitalMarkets() {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.w <= 960;

  // One-scroll trigger: expands stroke rectangle to full screen on a single scroll
  useEffect(() => {
    let isAutoScrolling = false;
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (isAutoScrolling || isMobile) return;
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;
      const trackTop = window.scrollY + rect.top;

      // 1. One scroll down when stroke rectangle is initial state -> smoothly expands to 100% full screen
      if (e.deltaY > 12 && rect.top <= 80 && rect.top >= -100 && scrollProgress < 0.08) {
        isAutoScrolling = true;
        const target = trackTop + scrollableDistance * 0.165;
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
      // 2. One scroll up when stroke rectangle is full screen -> smoothly shrinks back to preview card
      else if (e.deltaY < -12 && scrollProgress > 0.12 && scrollProgress < 0.22) {
        isAutoScrolling = true;
        if (window.__lenis) {
          window.__lenis.scrollTo(trackTop, {
            duration: 0.95,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => {
              setTimeout(() => { isAutoScrolling = false; }, 120);
            },
          });
        } else {
          window.scrollTo({ top: trackTop, behavior: 'smooth' });
          setTimeout(() => { isAutoScrolling = false; }, 850);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAutoScrolling || isMobile) return;
      if (!trackRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;
      const trackTop = window.scrollY + rect.top;

      if (diffY > 40 && rect.top <= 80 && rect.top >= -100 && scrollProgress < 0.08) {
        isAutoScrolling = true;
        const target = trackTop + scrollableDistance * 0.165;
        if (window.__lenis) {
          window.__lenis.scrollTo(target, {
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => {
              setTimeout(() => { isAutoScrolling = false; }, 120);
            },
          });
        }
      } else if (diffY < -40 && scrollProgress > 0.12 && scrollProgress < 0.22) {
        isAutoScrolling = true;
        if (window.__lenis) {
          window.__lenis.scrollTo(trackTop, {
            duration: 0.95,
            easing: (t) => 1 - Math.pow(1 - t, 3.2),
            onComplete: () => {
              setTimeout(() => { isAutoScrolling = false; }, 120);
            },
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

  // 1. Rectangle expansion: FASTER & SNAPPY expansion (completes over first 0.18 of the track)
  const expandRaw = Math.min(Math.max(scrollProgress / 0.18, 0), 1);
  // Snappy power ease-out (immediate brisk expansion, silky deceleration into full screen)
  const ep = 1 - Math.pow(1 - expandRaw, 2.5);

  // 2. Whole screen turns into creme background (#FBFBF5) as rectangle completes
  const cremeScreenOpacity = Math.min(Math.max((scrollProgress - 0.04) / 0.12, 0), 1);

  // 3. Three cards & "YOUR MONEY, REIMAGINED" appear horizontally in center (0.13 -> 0.26)
  const cardsRaw = Math.min(Math.max((scrollProgress - 0.13) / 0.13, 0), 1);
  const cp = cardsRaw * cardsRaw * (3 - 2 * cardsRaw);

  // 4. Choreography: Side cards tuck BEHIND main card with edges poking out,
  // deck shifts to the LEFT, and text appears on the background of the RIGHT (0.26 -> 0.50)
  // (Much faster card swipe animation requiring far less scrolling!)
  const deckRaw = Math.min(Math.max((scrollProgress - 0.26) / 0.24, 0), 1);
  // Snappy easeInOutCubic for crisp, fluid motion
  const dp = deckRaw < 0.5 
    ? 4 * deckRaw * deckRaw * deckRaw 
    : 1 - Math.pow(-2 * deckRaw + 2, 3) / 2;

  // Starting dimensions for the creme stroke rectangle
  const initialW = isMobile
    ? Math.min(Math.max(220, windowSize.w * 0.64), 360)
    : Math.min(Math.max(280, windowSize.w * 0.35), 480);
  const initialH = isMobile
    ? Math.min(Math.max(230, windowSize.h * 0.34), 340)
    : Math.min(Math.max(340, windowSize.h * 0.46), 540);
  const initialRadius = isMobile ? 24 : 36;

  // Expanding stroke rectangle: smoothly expands in width and height until it becomes full screen
  const currentW = initialW + (windowSize.w - initialW) * ep;
  const currentH = initialH + (windowSize.h - initialH) * ep;
  const currentRadius = (1 - ep) * initialRadius;

  // Stroke border width & creme color (#FBFBF5)
  const strokeBorderWidth = isMobile ? '3.5px' : '4.5px';
  const bottomStrokeColor = `rgba(251, 251, 245, ${(ep * 0.98).toFixed(3)})`;
  const rectFillColor = cp > 0.05 
    ? 'transparent' 
    : `rgba(251, 251, 245, ${ep > 0.08 ? (Math.min(1, (ep - 0.08) / 0.68) * 0.35).toFixed(3) : 0})`;

  // Preview card inside rectangle at start, fades out promptly as rectangle expands
  const previewCardOpacity = Math.max(0, 1 - ep * 3.2);

  // Initial headline lifts slightly and gracefully fades as rectangle expands
  const headlineTranslateY = isMobile
    ? -80 - ep * 25
    : -110 - ep * 35;
  const headlineOpacity = Math.max(0, 1 - ep * 2.5);

  // Background image parallax
  const bgScale = 1 + ep * 0.05;

  // Card fan tucking offset (side cards tuck behind center card leaving outer edges poking out)
  const tuckOffset = isMobile ? 45 : 155;
  const containerW = Math.min(windowSize.w - (isMobile ? 32 : 80), 1600);
  const centerShiftX = containerW * 0.325;

  return (
    <section 
      className="sydney-scroll-track" 
      ref={trackRef} 
      id="sydney-markets" 
      aria-label="From Sydney to Global Capital Markets"
    >
      <div className="sydney-sticky-frame">
        {/* Full Background Image: woman.png */}
        <div 
          className="sydney-bg-image" 
          style={{ 
            backgroundImage: `url('/assets/woman.png')`,
            transform: `scale(${bgScale.toFixed(3)})`,
          }}
        >
          <div className="sydney-overlay" />
        </div>

        {/* Green & Blue Gradient Background Transition Layer */}
        <div 
          className="sydney-creme-backdrop light-theme-grid-bg" 
          style={{ opacity: cremeScreenOpacity }}
          aria-hidden="true"
        />

        {/* Phase 1 Main Content: "FROM SYDNEY TO GLOBAL CAPITAL MARKETS" */}
        <div 
          className="sydney-content-container"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineTranslateY.toFixed(1)}px)`,
            pointerEvents: ep > 0.5 ? 'none' : 'auto',
          }}
        >
          <h2 className="sydney-headline">
            FROM SYDNEY TO <br className="sydney-headline-br" />
            GLOBAL CAPITAL MARKETS
          </h2>
        </div>

        {/* Phase 1 Creme Stroke Rectangle with card inside saying Account Personal & $6,821 */}
        <div 
          className="sydney-bottom-stroke" 
          style={{
            width: `${currentW.toFixed(1)}px`,
            height: `${currentH.toFixed(1)}px`,
            borderWidth: strokeBorderWidth,
            borderTopLeftRadius: `${currentRadius.toFixed(1)}px`,
            borderTopRightRadius: `${currentRadius.toFixed(1)}px`,
            borderBottom: ep > 0.02 ? `${strokeBorderWidth} solid ${bottomStrokeColor}` : 'none',
            backgroundColor: 'transparent',
            boxShadow: `0 -8px 30px rgba(0, 0, 0, ${0.35 + ep * 0.15}), 0 0 ${(25 + ep * 20).toFixed(0)}px rgba(251, 251, 245, ${(0.15 + ep * 0.2).toFixed(2)})`,
          }}
          aria-hidden="true" 
        >
          {/* Gradient fill that emerges smoothly inside the expanding rectangle */}
          <div 
            className="sydney-stroke-gradient-fill light-theme-grid-bg"
            style={{
              opacity: ep > 0.08 ? Math.min(1, (ep - 0.08) / 0.65) : 0,
            }}
            aria-hidden="true"
          />

          {/* Authentic High-End Physical Account Card: Account Personal •••• 6821 */}
          <div 
            className="sydney-rect-preview-card"
            style={{
              opacity: previewCardOpacity,
              transform: `translateX(-50%) translateY(${ep * 18}px)`,
            }}
          >
            {/* Holographic Sheen Overlay */}
            <div className="card-holo-sheen" aria-hidden="true" />

            {/* Card Header: Brand Monogram & Contactless Wave */}
            <div className="account-card-header">
              <div className="account-card-brand">
                <img 
                  src="/assets/vitti.png" 
                  alt="Vitti" 
                  className="account-card-brand-icon" 
                />
                <span className="account-card-brand-name">VITTI WEALTH</span>
              </div>
              <div className="account-card-contactless">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                </svg>
              </div>
            </div>

            {/* Card Chip & Balance */}
            <div className="account-card-mid">
              <div className="account-card-chip">
                <div className="chip-line chip-line-1" />
                <div className="chip-line chip-line-2" />
                <div className="chip-line chip-line-3" />
              </div>
              <div className="account-card-balance-block">
                <span className="account-card-type-label">ACCOUNT · PERSONAL</span>
                <span className="account-card-balance-val">$6,821</span>
              </div>
            </div>

            {/* Card Number & Cardholder Footer */}
            <div className="account-card-footer">
              <div className="account-card-number">
                <span className="card-dots">••••</span>
                <span className="card-dots">••••</span>
                <span className="card-dots">••••</span>
                <span className="card-last-four">6821</span>
              </div>
              <div className="account-card-meta-row">
                <div className="account-card-holder">
                  <span className="holder-label">CARDHOLDER</span>
                  <span className="holder-name">ALEXANDER CHEN</span>
                </div>
                <div className="account-card-expiry">
                  <span className="expiry-label">VALID THRU</span>
                  <span className="expiry-val">09/29</span>
                </div>
                <div className="account-card-network">
                  <span className="network-circle network-circle-emerald" />
                  <span className="network-circle network-circle-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 & 3: Whole Screen Creme with Black Headline, Cards & Right Story */}
        <div 
          className="sydney-reimagined-stage"
          style={{
            opacity: cp,
            transform: `translateY(${((1 - cp) * 32).toFixed(1)}px)`,
            pointerEvents: cp > 0.4 ? 'auto' : 'none',
          }}
          aria-hidden={cp < 0.2}
        >
          {/* Black Headline: YOUR MONEY, REIMAGINED (No pills above headline) */}
          <div className="sydney-reimagined-header">
            <h2 className="sydney-black-headline">
              YOUR MONEY, REIMAGINED
            </h2>
          </div>

          {/* Two-Column Responsive Split: Left (35%) Cards + Right (65%) Story */}
          <div className="sydney-two-col-layout">
            {/* Left Column: 35% */}
            <div className="sydney-col-cards">
              <div 
                className="sydney-cards-shift-wrap"
                style={isMobile ? {} : {
                  transform: `translateX(${((1 - dp) * centerShiftX).toFixed(1)}px)`,
                  transformOrigin: 'center center',
                }}
              >
                <div className="sydney-cards-row">
                  {/* Card 1 (Left): Tucks behind middle card with left edge poking out */}
                  <div 
                    className="sydney-card sydney-card-left"
                    style={{
                      transform: isMobile 
                        ? `translateX(${(dp * 50).toFixed(1)}px) rotate(${(-dp * 5).toFixed(1)}deg)` 
                        : `translateX(${(dp * tuckOffset).toFixed(1)}px) rotate(${(-dp * 7.5).toFixed(1)}deg) scale(${(1 - dp * 0.04).toFixed(3)})`,
                      zIndex: 2,
                    }}
                  >
                    <div 
                      className="sydney-card-bg"
                      style={{ backgroundImage: `url('/assets/card-coffee.jpg')` }}
                    >
                      <div className="sydney-card-vignette" />
                    </div>

                    {/* Card Bottom Content: Amount & Account aligned to the bottom */}
                    <div className="sydney-card-bottom-stack">
                      <div className="sydney-card-amount-block">
                        <span className="sydney-card-sublabel">Personal · EUR</span>
                        <span className="sydney-card-balance">€3,126</span>
                        <button type="button" className="sydney-card-accounts-btn">
                          Accounts
                        </button>
                      </div>

                      {/* Floating Bottom Transaction Pill */}
                      <div className="sydney-card-bottom-pill">
                        <div className="sydney-pill-icon sydney-icon-coffee">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                            <line x1="6" y1="1" x2="6" y2="4"></line>
                            <line x1="10" y1="1" x2="10" y2="4"></line>
                            <line x1="14" y1="1" x2="14" y2="4"></line>
                          </svg>
                        </div>
                        <div className="sydney-pill-details">
                          <span className="sydney-pill-title">Coffee in Paris</span>
                          <span className="sydney-pill-subtitle">Yesterday, 09:02</span>
                        </div>
                        <span className="sydney-pill-amount">-€3.25</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 (Middle - Larger Primary): Sits in front of deck */}
                  <div 
                    className="sydney-card sydney-card-middle"
                    style={{ zIndex: 5 }}
                  >
                    <div 
                      className="sydney-card-bg"
                      style={{ backgroundImage: `url('/assets/woman.png')` }}
                    >
                      <div className="sydney-card-vignette" />
                    </div>

                    {/* Card Bottom Content: Amount & Account aligned to the bottom */}
                    <div className="sydney-card-bottom-stack">
                      <div className="sydney-card-amount-block">
                        <span className="sydney-card-sublabel">Personal</span>
                        <span className="sydney-card-balance">£6,012</span>
                        <button type="button" className="sydney-card-accounts-btn">
                          Accounts
                        </button>
                      </div>

                      {/* Floating Bottom Security & Switch Guarantee Banner */}
                      <div className="sydney-card-bottom-banner">
                        <div className="sydney-fscs-block">
                          <span className="fscs-lock-icon">🔒</span>
                          <div className="fscs-text-wrap">
                            <span className="fscs-bold">fscs</span>
                            <span className="fscs-tag">PROTECTED</span>
                          </div>
                        </div>
                        <div className="sydney-banner-divider" />
                        <div className="sydney-switch-block">
                          <div className="switch-text-lines">
                            <span className="switch-t1">CURRENT ACCOUNT</span>
                            <span className="switch-t2">SWITCH GUARANTEE</span>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5 12 12 5 19 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 (Right): Tucks behind middle card with right edge poking out */}
                  <div 
                    className="sydney-card sydney-card-right"
                    style={{
                      transform: isMobile 
                        ? `translateX(${(-dp * 50).toFixed(1)}px) rotate(${(dp * 5).toFixed(1)}deg)` 
                        : `translateX(${(-dp * tuckOffset).toFixed(1)}px) rotate(${(dp * 7.5).toFixed(1)}deg) scale(${(1 - dp * 0.04).toFixed(3)})`,
                      zIndex: 2,
                    }}
                  >
                    <div 
                      className="sydney-card-bg"
                      style={{ backgroundImage: `url('/assets/card-man.jpg')` }}
                    >
                      <div className="sydney-card-vignette" />
                    </div>

                    {/* Card Bottom Content: Amount & Account aligned to the bottom */}
                    <div className="sydney-card-bottom-stack">
                      <div className="sydney-card-amount-block">
                        <span className="sydney-card-sublabel">Personal</span>
                        <span className="sydney-card-balance">£2,350</span>
                        <button type="button" className="sydney-card-accounts-btn">
                          Accounts
                        </button>
                      </div>

                      {/* Floating Bottom Transaction Pill */}
                      <div className="sydney-card-bottom-pill">
                        <div className="sydney-pill-icon sydney-icon-house">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        </div>
                        <div className="sydney-pill-details">
                          <span className="sydney-pill-title">House bills</span>
                          <span className="sydney-pill-subtitle">Due today</span>
                        </div>
                        <span className="sydney-pill-amount">-£225</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 65% of screen directly on creme background */}
            <div 
              className="sydney-col-story"
              style={isMobile ? {
                opacity: dp > 0.25 ? dp : 0,
                display: dp > 0.2 ? 'flex' : 'none',
              } : {
                opacity: dp,
                transform: `translateX(${((1 - dp) * 35).toFixed(1)}px)`,
                pointerEvents: dp > 0.5 ? 'auto' : 'none',
              }}
            >
              <h3 className="sydney-story-direct-title">
                Institutional Capital. Disciplined Advisory.
              </h3>
              
              <p className="sydney-story-direct-lead">
                Founded in 2023 and headquartered in Sydney, Vitti Capital serves wholesale investors across Australia, the GCC, and the broader APAC region with transparent, high-conviction wealth solutions.
              </p>

              <p className="sydney-story-direct-body">
                We believe institutional finance should be easier to understand and simpler to navigate. Backed by rigorous due diligence and active risk mitigation, our multidisciplinary team brings comprehensive buy-side, sell-side, and corporate finance mastery across equity capital markets, private debt, structured credit, and cross-border M&A.
              </p>

              {/* 4 Core Value Favicons: Integrity, Innovation, Collaboration, Excellence */}
              <div className="sydney-values-grid">
                <div className="sydney-value-item">
                  <div className="sydney-value-icon">
                    <ShieldCheck size={34} strokeWidth={2.2} />
                  </div>
                  <span className="sydney-value-label">Integrity</span>
                </div>

                <div className="sydney-value-connector" aria-hidden="true" />

                <div className="sydney-value-item">
                  <div className="sydney-value-icon">
                    <Sparkles size={34} strokeWidth={2.2} />
                  </div>
                  <span className="sydney-value-label">Innovation</span>
                </div>

                <div className="sydney-value-connector" aria-hidden="true" />

                <div className="sydney-value-item">
                  <div className="sydney-value-icon">
                    <Users size={34} strokeWidth={2.2} />
                  </div>
                  <span className="sydney-value-label">Collaboration</span>
                </div>

                <div className="sydney-value-connector" aria-hidden="true" />

                <div className="sydney-value-item">
                  <div className="sydney-value-icon">
                    <Award size={34} strokeWidth={2.2} />
                  </div>
                  <span className="sydney-value-label">Excellence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay images aus and dub in the bottom corners at 50% transparency */}
          <img 
            src="/assets/aus.png" 
            alt="Australia" 
            className="white-section-corner-overlay corner-overlay-aus" 
            aria-hidden="true" 
          />
          <img 
            src="/assets/dub.png" 
            alt="Dubai" 
            className="white-section-corner-overlay corner-overlay-dub" 
            aria-hidden="true" 
          />
        </div>
      </div>
    </section>
  );
}
