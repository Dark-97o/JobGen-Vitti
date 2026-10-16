import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import PredictiveArc from './originkit/ui/predictive-arc';

export default function StayInTheLoopCard() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <section className="stay-loop-section" id="newsletter">
      {/* Background Originkit Predictive Arc */}
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

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* =================================================================
            BIG WHITE STROKE CARD:
            A large card with a bold white stroke outline as requested
            ================================================================= */}
        <div className="big-white-stroke-card">
          
          {/* Subtle ambient back-glow behind the white stroke */}
          <div className="big-stroke-glow" aria-hidden="true" />

          {/* ===============================================================
              SMALLER CARD INSIDE WITH EXACT COPY FROM WEBSITE:
              "Stay in the loop. Get the latest insights"
              =============================================================== */}
          <div className="smaller-inner-card">
            
            <div className="inner-card-header">
              <h2 className="inner-card-headline">
                Stay in the loop.<br className="hidden sm:inline" /> <span className="headline-green-accent">Get the latest insights</span>
              </h2>
              <p className="inner-card-subtext">
                Receive curated ASX market analysis, private debt allocations, and corporate advisory dispatches direct to your inbox.
              </p>
            </div>

            {isSubscribed ? (
              <div className="inner-card-success">
                <CheckCircle2 size={36} className="inner-card-success-icon" />
                <h4 className="inner-card-success-title">You're Subscribed</h4>
                <p className="inner-card-success-text">
                  Welcome to the Vitti Capital intelligence network. You will receive our next executive commentary.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inner-card-form">
                <div className="inner-form-row">
                  <div className="inner-input-wrap">
                    <label htmlFor="loop-email" className="sr-only">Email address</label>
                    <input 
                      type="email" 
                      id="loop-email"
                      required
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="inner-email-input"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="inner-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Joining...</span>
                    ) : (
                      <>
                        <span>Stay in the loop</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="inner-form-disclaimer">
                  <ShieldCheck size={14} className="disclaimer-icon" />
                  <span>Wholesale & Sophisticated investors only. We respect your confidentiality.</span>
                </div>
              </form>
            )}

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
    </section>
  );
}
