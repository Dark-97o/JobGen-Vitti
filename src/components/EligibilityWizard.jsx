import React, { useState } from 'react';

export default function EligibilityWizard({ onOpenModal }) {
  const [step, setStep] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('');

  const handleEntitySelect = (type) => {
    setSelectedEntity(type);
    setStep(2);
  };

  const handleCriteriaSelect = (crit) => {
    setSelectedCriteria(crit);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedEntity('');
    setSelectedCriteria('');
  };

  return (
    <section className="section-light" id="eligibility">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="section-title">Wholesale Investor Self-Certification</h2>
          <p className="section-subtitle">
            Verify your statutory eligibility per Sections 761G / 761GA of the Corporations Act 2001 (Cth) in 30 seconds.
          </p>
        </div>

        <div className="wizard-box-light">
          
          <div className="wizard-steps-bar">
            <span className={step >= 1 ? 'active-step' : ''}>1. Entity Classification</span>
            <span>→</span>
            <span className={step >= 2 ? 'active-step' : ''}>2. Benchmark Test</span>
            <span>→</span>
            <span className={step === 3 ? 'active-step' : ''}>3. Access Clearance</span>
          </div>

          {step === 1 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 18 }}>
                Select your investment capacity:
              </h4>
              <div className="wizard-grid-2">
                <button className="w-btn" onClick={() => handleEntitySelect('Individual HNW')}>
                  <strong>Individual HNW</strong>
                  <span>Personal balance sheet allocation</span>
                </button>
                <button className="w-btn" onClick={() => handleEntitySelect('SMSF Trustee')}>
                  <strong>SMSF Trustee</strong>
                  <span>Self-Managed Superannuation Fund</span>
                </button>
                <button className="w-btn" onClick={() => handleEntitySelect('Family Office')}>
                  <strong>Family Office / Corporate</strong>
                  <span>Institutional investment company</span>
                </button>
                <button className="w-btn" onClick={() => handleEntitySelect('Corporate Issuer')}>
                  <strong>Corporate Founder</strong>
                  <span>Seeking capital raising or M&A</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 18 }}>
                Do you satisfy any statutory criterion?
              </h4>
              <div className="w-criteria-stack">
                <button className="criteria-item-btn" onClick={() => handleCriteriaSelect('Assets Test')}>
                  <strong>Net Assets Benchmark:</strong> Net assets of at least AUD $2,500,000 certified by an accountant.
                </button>
                <button className="criteria-item-btn" onClick={() => handleCriteriaSelect('Income Test')}>
                  <strong>Gross Income Benchmark:</strong> Annual income of at least AUD $250,000 for each of the last 2 years.
                </button>
                <button className="criteria-item-btn" onClick={() => handleCriteriaSelect('Entity Test')}>
                  <strong>Wholesale / Corporate Entity:</strong> Operating company with net assets over $10M or holding an AFSL.
                </button>
              </div>
              <button 
                onClick={() => setStep(1)} 
                style={{ marginTop: 14, fontSize: 12.5, color: '#64748B', fontWeight: 600 }}
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(0, 179, 119, 0.15)', color: '#00B377', fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                Wholesale Status Confirmed
              </h3>
              <p style={{ fontSize: 14, color: '#475569', maxWidth: 480, margin: '0 auto 20px' }}>
                You satisfy the criteria for <strong>Wholesale Client & Sophisticated Investor</strong> access. You may now review confidential deal rooms and fund memorandums.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button 
                  className="btn btn-primary-glow"
                  onClick={() => onOpenModal('Wholesale Deal Room Access')}
                >
                  Access Virtual Deal Room →
                </button>
                <button className="btn btn-light-outline" onClick={handleReset}>
                  Reset Test
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
