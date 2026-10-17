import React from 'react';

/**
 * 3-Bar Full Screen Page Transition Curtain
 * 
 * Flow:
 * - 3 vertical columns come down from the top to cover the screen
 * - Center bar prominently displays the Vitti Full Logo with emerald glow
 * - The underlying page routes change while covered
 * - The 3 bars cascade downwards to unveil the new page seamlessly
 */
export default function PageTransitionCurtain({ stage }) {
  if (stage === 'idle') return null;

  return (
    <div 
      className={`page-transition-curtain-root stage-${stage}`}
      aria-hidden="true"
    >
      {/* 1. Left Bar */}
      <div className="curtain-col curtain-col-left">
        <div className="curtain-col-inner" />
        <div className="curtain-edge-border right" />
      </div>

      {/* 2. Middle Bar (With Official Vitti Full Logo) */}
      <div className="curtain-col curtain-col-center">
        <div className="curtain-col-inner" />
        <div className="curtain-edge-border left" />
        <div className="curtain-edge-border right" />
        
        <div className="curtain-logo-container">
          <div className="curtain-logo-emblem">
            <img 
              src="/assets/vitti-full.webp" 
              alt="Vitti Capital" 
              className="curtain-vitti-img"
              onError={(e) => { e.currentTarget.src = '/assets/vitti-full.png'; }}
            />
            <div className="curtain-logo-halo" />
          </div>
          <div className="curtain-loading-pulse-bar" />
        </div>
      </div>

      {/* 3. Right Bar */}
      <div className="curtain-col curtain-col-right">
        <div className="curtain-col-inner" />
        <div className="curtain-edge-border left" />
      </div>
    </div>
  );
}
