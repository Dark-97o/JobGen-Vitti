import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, X } from 'lucide-react';

const SECTION_INSIGHTS = [
  {
    name: 'hero',
    title: 'Vitti Capital Advisory',
    text: 'Connecting institutional investors to high-conviction cross-border opportunities.',
    isLight: false,
  },
  {
    name: 'who-we-are',
    title: 'Dual-Desk Synergy',
    text: 'Regulated wholesale investment advisory spanning Australia and the GCC.',
    isLight: true,
  },
  {
    name: 'sydney-markets',
    title: 'Capital Markets',
    text: 'Bridging institutional liquidity between Sydney and global financial hubs.',
    isLight: false,
  },
  {
    name: 'sydney-reimagined',
    title: 'Your Money, Reimagined',
    text: 'Unlocking value with disciplined private debt and structured equity.',
    isLight: true,
  },
  {
    name: 'divisions',
    title: 'Connected Divisions',
    text: 'Bespoke corporate financing, syndicated credit, and M&A advisory mandates.',
    isLight: false,
  },
  {
    name: 'why-partner',
    title: 'The Vitti Advantage',
    text: 'Visionary alignment, institutional fiduciary rigor, and proven execution.',
    isLight: false,
  },
  {
    name: 'success-story',
    title: 'Proven Track Record',
    text: 'Advising marquee transactions including landmark Nasdaq listings.',
    isLight: false,
  },
  {
    name: 'market-updates',
    title: 'Real-Time Intelligence',
    text: 'Daily macroeconomic analysis across Asia-Pacific and Gulf credit markets.',
    isLight: false,
  },
  {
    name: 'contact',
    title: 'Direct Partner Access',
    text: 'Schedule a confidential consultation with our Sydney or Dubai principals.',
    isLight: false,
  },
  {
    name: 'blog',
    title: 'Strategic Insights',
    text: 'In-depth research on wealth structuring and cross-border capital flows.',
    isLight: false,
  },
  {
    name: 'faq',
    title: 'Statutory Transparency',
    text: 'Wholesale compliance governed by strict Australian and UAE regulatory standards.',
    isLight: false,
  },
  {
    name: 'newsletter',
    title: 'Stay Informed',
    text: 'Institutional wealth intelligence delivered weekly to private clients.',
    isLight: false,
  },
  {
    name: 'offices',
    title: 'Global Presence',
    text: 'Headquartered at Parramatta Square, Sydney and DIFC, Dubai.',
    isLight: false,
  },
];

export default function FloatingAssistant() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Load thrine script dynamically if not already loaded
  useEffect(() => {
    if (!document.querySelector('script[src="https://thrine.app/embed/v1.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://thrine.app/embed/v1.js';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor scroll position to determine active section and alternate left/right
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const scrollCenter = scrollY + viewportHeight * 0.45;

      const sectionElements = [
        { el: document.getElementById('hero-track'), index: 0 },
        { el: document.getElementById('who-we-are'), index: 1 },
        { el: document.getElementById('sydney-markets'), index: 2 },
        { el: document.querySelector('.sydney-reimagined-stage'), index: 3 },
        { el: document.getElementById('divisions'), index: 4 },
        { el: document.getElementById('why-partner'), index: 5 },
        { el: document.getElementById('success-story'), index: 6 },
        { el: document.getElementById('market-updates'), index: 7 },
        { el: document.getElementById('contact'), index: 8 },
        { el: document.getElementById('blog'), index: 9 },
        { el: document.getElementById('faq'), index: 10 },
        { el: document.getElementById('newsletter'), index: 11 },
        { el: document.getElementById('offices'), index: 12 },
      ];

      // Find the currently active section
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          const top = rect.top + scrollY;
          if (scrollCenter >= top - 100) {
            setSectionIndex(item.index);
            break;
          }
        }
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

  const activeInsight = SECTION_INSIGHTS[sectionIndex] || SECTION_INSIGHTS[0];
  const isLightSection = activeInsight.isLight;

  // Alternate left/right based on section index: 0 = left, 1 = right, 2 = left, 3 = right...
  const isLeft = sectionIndex % 2 === 0;

  return (
    <div 
      ref={containerRef}
      className={`floating-assistant-wrap ${isLeft ? 'position-left' : 'position-right'} ${isLightSection ? 'theme-light-section' : 'theme-dark-section'}`}
      style={{
        zIndex: 9999,
      }}
      aria-label="Vitti Capital Assistant"
    >
      {/* Speech / Chat Box (Appears left or right of character, not up top) */}
      {!isClosed && (
        <div 
          className={`floating-chat-bubble ${isLightSection ? 'bubble-light' : 'bubble-dark'} ${isLeft ? 'bubble-on-right' : 'bubble-on-left'}`}
          role="complementary"
          aria-live="polite"
        >
          {/* Red Cross Close Button */}
          <button 
            type="button" 
            className="floating-chat-close-red" 
            onClick={(e) => {
              e.stopPropagation();
              setIsClosed(true);
            }}
            aria-label="Close message"
            title="Close"
          >
            <X size={12} strokeWidth={2.8} />
          </button>

          <div className="floating-chat-body">
            {/* Line 1: Short 1-line text about Vitti Capital (no pill) */}
            <p className="floating-chat-line-1">
              {activeInsight.text}
            </p>

            {/* Line 2: Compact download guide row with PDF download button */}
            <div className="floating-chat-download-row">
              <span className="floating-chat-line-2">Download guide here:</span>
              <a 
                href="/assets/Vitti_Capital_Guide.pdf" 
                download="Vitti_Capital_Guide.pdf"
                className="floating-pdf-btn"
                title="Download Vitti Capital Guide (PDF)"
              >
                <FileText size={13} className="floating-pdf-icon" />
                <span>Download Guide</span>
                <Download size={12} className="floating-download-icon" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating 3D Model Embed Widget */}
      <div 
        className="floating-embed-container"
        onClick={() => {
          if (isClosed) setIsClosed(false);
        }}
        title={isClosed ? 'Click to show Vitti Capital guide' : 'Vitti Capital 3D Model'}
        role="button"
        tabIndex={0}
      >
        <model-embed
          project="e_f0aecc04d9089a18d8db"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '759/763',
          }}
        />
        
        {/* Subtle indicator ring when chat bubble is minimized */}
        {isClosed && (
          <div className="floating-embed-minimized-hint">
            <span>Guide</span>
          </div>
        )}
      </div>
    </div>
  );
}
