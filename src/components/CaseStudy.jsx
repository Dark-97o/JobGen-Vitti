import React from 'react';

export default function CaseStudy() {
  return (
    <section className="section-dark" id="track-record">
      <div className="container">
        
        <div className="case-spotlight-card">
          <div className="case-spotlight-grid">
            <div>
              <h2 className="section-title">Braiin Holdings: NASDAQ Dual-Listing Mandate</h2>
              <p className="section-subtitle" style={{ marginLeft: 0 }}>
                Vitti Capital served as lead corporate advisor, orchestrating multi-stage capital structuring and US public market positioning for Braiin's AI edge-robotics platform.
              </p>

              <div className="case-stat-row">
                <div className="c-stat">
                  <strong>NASDAQ</strong>
                  <span>Target Exchange</span>
                </div>
                <div className="c-stat">
                  <strong>Cross-Border</strong>
                  <span>Australia ⇄ US</span>
                </div>
                <div className="c-stat">
                  <strong>Pre-IPO</strong>
                  <span>Capital Structure</span>
                </div>
              </div>

              <blockquote style={{ fontStyle: 'italic', fontSize: 13.5, color: '#94A3B8', borderLeft: '2px solid #00E599', paddingLeft: 14 }}>
                “Vitti's bridge between Australian private equity and US public listing frameworks provided the exact structuring advantage we needed.”
              </blockquote>
            </div>

            <div className="case-summary-box">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>
                TRANSACTION TEARSHEET
              </div>
              <div className="spec-line">
                <span>Issuer:</span> <strong>Braiin Holdings Ltd</strong>
              </div>
              <div className="spec-line">
                <span>Sector:</span> <strong>AI & Agritech Autonomous Robotics</strong>
              </div>
              <div className="spec-line">
                <span>Advisory:</span> <strong>Pre-IPO & Cross-Border Capital</strong>
              </div>
              <div className="spec-line">
                <span>Jurisdiction:</span> <strong>Sydney, Australia & New York, USA</strong>
              </div>
              
              <div style={{ marginTop: 16, padding: '8px 12px', background: 'rgba(0, 229, 153, 0.12)', border: '1px solid rgba(0, 229, 153, 0.25)', borderRadius: 6, fontSize: 12, fontWeight: 700, color: '#00E599', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="live-dot" /> Mandate Executed & Successfully Positioned
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
