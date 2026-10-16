import React, { useState, useEffect, useRef } from 'react';
import PredictiveArc from './originkit/ui/predictive-arc';

// 4 Corporates Services with Natural Photography
const CORPORATE_CARDS = [
  {
    id: 'corp-1',
    title: 'Capital Raising Advisory',
    info: 'From seed rounds to ASX listings, we architect funding structures that optimise valuation, minimise dilution, and accelerate momentum.',
    image: '/assets/natural-corp-capital.jpg',
  },
  {
    id: 'corp-2',
    title: 'M&A Advisory',
    info: 'Our M&A team navigates negotiations, due diligence, and integration to unlock synergies and sustainable value.',
    image: '/assets/natural-corp-ma.jpg',
  },
  {
    id: 'corp-3',
    title: 'Debt Restructuring & Structured Solutions',
    info: 'If your balance sheet faces pressure, we engineer refinancing packages, covenant resets, and creditor negotiations that buy time and restore growth capacity.',
    image: '/assets/natural-corp-debt.jpg',
  },
  {
    id: 'corp-4',
    title: 'Strategic Transaction Advisory',
    info: 'Looking to expand into a new geography, divest a non‑core division, or secure ESG accreditation? We combine industry insight with implementation muscle to make strategy actionable.',
    image: '/assets/natural-corp-strategic.jpg',
  },
];

// 4 Investors Services with Natural Photography
const INVESTOR_CARDS = [
  {
    id: 'inv-1',
    title: 'Australian Equities & Public Markets',
    info: 'We deploy a bottom‑up research process—financial statement modelling, field interviews, and on‑the‑ground channel checks—to identify under‑appreciated catalysts in ASX‑listed companies. Expect concise investment theses supported by crisp data dashboards and clear risk controls.',
    image: '/assets/natural-inv-asx.jpg',
  },
  {
    id: 'inv-2',
    title: 'Private Credit',
    info: 'Tap into senior secured loans, mezzanine tranches, and asset‑backed facilities that deliver predictable coupons while prioritising capital preservation. All credit opportunities undergo rigorous collateral analysis and covenant stress‑testing.',
    image: '/assets/natural-inv-credit.jpg',
  },
  {
    id: 'inv-3',
    title: 'Structured Finance',
    info: 'We design hybrid securities—convertibles, preferred equity, and revenue‑participation notes—that align return potential with risk appetite, perfect for investors seeking bespoke payoff profiles.',
    image: '/assets/natural-inv-struct.jpg',
  },
  {
    id: 'inv-4',
    title: 'Early‑Stage & Pre‑IPO',
    info: 'Leverage our network of founders, venture studios, and pre‑IPO brokers to access growth stories well before they reach public markets. Every opportunity is accompanied by deep‑dive diligence and a clearly articulated exit path.',
    image: '/assets/natural-inv-ipo.jpg',
  },
];

export default function DivisionsBento({ onOpenModal }) {
  // Option switcher above cards: 'corporate' or 'investors'
  const [activeTab, setActiveTab] = useState('corporate');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const containerRef = useRef(null);
  const isPausedRef = useRef(false);

  const CARD_WIDTH = 340;  // vertical rectangle width
  const CARD_HEIGHT = 480; // vertical rectangle height
  const CARD_GAP = 32;
  const TOTAL_ITEM_WIDTH = CARD_WIDTH + CARD_GAP;
  const activeCards = activeTab === 'corporate' ? CORPORATE_CARDS : INVESTOR_CARDS;
  const LOOP_WIDTH = activeCards.length * TOTAL_ITEM_WIDTH;

  // Quadruple cards for seamless infinite horizontal rotation
  const items = [...activeCards, ...activeCards, ...activeCards, ...activeCards];

  // Start with track centered so cards exist on both sides
  const [offset, setOffset] = useState(-LOOP_WIDTH);

  // Direction: Corporates moves left-to-right; Investors moves right-to-left
  const isLeftToRight = activeTab === 'corporate';

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isPausedRef.current) {
        const speed = 44; // smooth pixels per second
        setOffset((prev) => {
          let next;
          if (isLeftToRight) {
            // Corporates: moves Left to Right
            next = prev + speed * dt;
            if (next >= 0) {
              next -= LOOP_WIDTH;
            }
          } else {
            // Investors: moves Right to Left
            next = prev - speed * dt;
            if (next <= -2 * LOOP_WIDTH) {
              next += LOOP_WIDTH;
            }
          }
          return next;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isLeftToRight, LOOP_WIDTH]);

  // Center focal point calculation for center-growth effect
  const viewportWidth = 1200;
  const centerX = viewportWidth / 2;

  return (
    <section className="connected-universe-section" id="divisions">
      {/* Background Originkit Predictive Arc: Strictly background (z-index 0, pointer-events none) */}
      <div className="connected-arc-bg-wrap" aria-hidden="true">
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

      <div className="connected-universe-container">
        {/* Prominent Section Headline: strictly NO PILLS above per AGENTS.md */}
        <div className="connected-universe-header">
          <h2 className="connected-universe-headline">
            ENTER A NEW UNIVERSE OF CONNECTED SERVICES
          </h2>
        </div>

        {/* OPTIONS ABOVE THE CARDS: Clean pill buttons WITHOUT DOTS */}
        <div className="connected-options-bar">
          <div className="connected-options-pill-group" role="tablist" aria-label="Select Mandate Category">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'corporate'}
              className={`connected-option-btn ${activeTab === 'corporate' ? 'is-active-corp' : ''}`}
              onClick={() => {
                setActiveTab('corporate');
                setOffset(-LOOP_WIDTH);
              }}
            >
              CORPORATES
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'investors'}
              className={`connected-option-btn ${activeTab === 'investors' ? 'is-active-inv' : ''}`}
              onClick={() => {
                setActiveTab('investors');
                setOffset(-LOOP_WIDTH);
              }}
            >
              INVESTORS
            </button>
          </div>
        </div>

        {/* HORIZONTAL ROTATING CARDS: Clean smooth scale zoom on center card */}
        <div className="connected-carousel-wrap">
          <div 
            className="connected-horizontal-viewport"
            ref={containerRef}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; setHoveredCardId(null); }}
          >
            <div 
              className="connected-horizontal-track"
              style={{
                transform: `translateX(${offset}px)`,
                willChange: 'transform',
              }}
            >
              {items.map((card, idx) => {
                const itemCenterX = idx * TOTAL_ITEM_WIDTH + offset + CARD_WIDTH / 2;
                const distFromCenter = itemCenterX - centerX;
                const absDist = Math.abs(distFromCenter);
                const maxDist = viewportWidth * 0.40;
                const focus = Math.max(0, 1 - absDist / maxDist);
                
                // Active card that arrives in the middle grows bigger (0.90 -> 1.15), then smoothly reduces
                const centerScale = 0.90 + 0.25 * Math.pow(focus, 1.4);
                const isHovered = hoveredCardId === `${card.id}-${idx}`;

                return (
                  <div
                    key={`${card.id}-${idx}`}
                    className={`connected-service-card ${focus > 0.65 ? 'is-front-facing' : ''} ${isHovered ? 'is-card-hovered' : ''}`}
                    style={{
                      width: `${CARD_WIDTH}px`,
                      height: `${CARD_HEIGHT}px`,
                      minWidth: `${CARD_WIDTH}px`,
                      transform: `scale(${isHovered ? 1.16 : centerScale})`,
                      zIndex: isHovered ? 40 : Math.round(15 + focus * 20),
                      opacity: 1, // Completely 100% opaque, background cannot show through!
                    }}
                    onMouseEnter={() => setHoveredCardId(`${card.id}-${idx}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => onOpenModal && onOpenModal(card.title)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inquire about ${card.title}`}
                  >
                    {/* Natural Background Image: Always visible, slight scale on hover */}
                    <div 
                      className="connected-card-bg"
                      style={{ backgroundImage: `url('${card.image}')` }}
                    />

                    {/* Natural Ambient Vignette */}
                    <div className="connected-card-vignette" />

                    {/* Default View: ONLY Headline with Plus Jakarta Sans */}
                    <div className="connected-card-front-content">
                      <h4 className="connected-card-title">{card.title}</h4>
                    </div>

                    {/* Hover View: Information Overlay directly on the SAME background */}
                    <div className={`connected-card-info-overlay ${isHovered ? 'show-info' : ''}`}>
                      <div>
                        <h4 className="connected-card-overlay-title">{card.title}</h4>
                        <p className="connected-card-desc">{card.info}</p>
                      </div>
                      <div className="connected-card-cta-row">
                        <span className="connected-inquire-pill">
                          Inquire Service →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
