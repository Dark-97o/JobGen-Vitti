import React, { useState } from 'react';

export default function SaturnCalculator({ onOpenModal }) {
  const [amount, setAmount] = useState(150000);
  const [months, setMonths] = useState(24);
  const [mode, setMode] = useState('cash'); // 'cash' or 'drp'

  const netAnnualRate = 0.11; // 11.0% net annual target

  const formatAUD = (val) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const monthlyCash = (amount * netAnnualRate) / 12;

  let totalReturn = 0;
  let finalValue = 0;

  if (mode === 'cash') {
    totalReturn = monthlyCash * months;
    finalValue = amount + totalReturn;
  } else {
    const monthlyRate = netAnnualRate / 12;
    finalValue = amount * Math.pow(1 + monthlyRate, months);
    totalReturn = finalValue - amount;
  }

  return (
    <section className="section-dark" id="saturn-fund">
      <div className="container">
        
        {/* Saturn Overview Card */}
        <div className="saturn-box">
          <div className="saturn-overview-grid">
            <div>
              <h2 className="section-title">The Saturn Unit Trust Fund</h2>
              <p className="section-subtitle" style={{ marginLeft: 0 }}>
                A defensive wholesale fund built for capital preservation and non-correlated monthly cash distributions.
              </p>

              <div className="alloc-chips">
                <div className="alloc-chip">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E599' }} />
                  <strong>60%</strong> Senior Secured Credit
                </div>
                <div className="alloc-chip">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8' }} />
                  <strong>30%</strong> Growth Hybrids
                </div>
                <div className="alloc-chip">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                  <strong>10%</strong> Liquid Cash Buffer
                </div>
              </div>
            </div>

            <div className="saturn-img-wrap">
              <img 
                src="/assets/saturn-vault.jpg" 
                alt="Saturn Fund Asset Management Visualization" 
                style={{ width: '100%', borderRadius: '32px 32px 0 0' }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Calculator Card */}
        <div className="calc-card-dark">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00E599', letterSpacing: '0.12em' }}>
                YIELD SIMULATION ENGINE
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginTop: 4 }}>
                Forecast Your Monthly Yield
              </h3>
            </div>
            <span style={{ background: 'rgba(0, 229, 153, 0.12)', color: '#00E599', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
              Target: 11.0% Net p.a.
            </span>
          </div>

          <div className="calc-grid">
            <div>
              <div className="calc-group">
                <div className="calc-label-row">
                  <span>Wholesale Allocation (AUD)</span>
                  <span className="slider-val">{formatAUD(amount)}</span>
                </div>
                <input 
                  type="range"
                  min="50000"
                  max="1500000"
                  step="25000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="calc-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
                  <span>$50k Min</span>
                  <span>$500k</span>
                  <span>$1.0M</span>
                  <span>$1.5M+</span>
                </div>
              </div>

              <div className="calc-group">
                <label style={{ fontSize: 12.5, color: '#94A3B8', display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  Holding Horizon
                </label>
                <div className="toggle-group">
                  {[12, 24, 36].map((m) => (
                    <button
                      key={m}
                      className={`toggle-btn ${months === m ? 'active' : ''}`}
                      onClick={() => setMonths(m)}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-group">
                <label style={{ fontSize: 12.5, color: '#94A3B8', display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  Distribution Option
                </label>
                <div className="toggle-group">
                  <button
                    className={`toggle-btn ${mode === 'cash' ? 'active' : ''}`}
                    onClick={() => setMode('cash')}
                  >
                    Monthly Cash Payout
                  </button>
                  <button
                    className={`toggle-btn ${mode === 'drp' ? 'active' : ''}`}
                    onClick={() => setMode('drp')}
                  >
                    Compounded Growth (DRP)
                  </button>
                </div>
              </div>
            </div>

            <div className="results-box">
              <div className="res-hero">
                <span className="res-hero-label">Estimated Monthly Cash Income</span>
                <div className="res-hero-val">
                  {mode === 'cash' ? formatAUD(monthlyCash) : `~${formatAUD(totalReturn / months)}`}
                </div>
                <span style={{ fontSize: 11.5, color: '#94A3B8' }}>
                  {mode === 'cash' ? 'Deposited directly to your bank monthly' : 'Automatically compounded monthly'}
                </span>
              </div>

              <div className="res-dual-grid">
                <div>
                  <span>Total Net Return</span>
                  <strong>{formatAUD(totalReturn)}</strong>
                </div>
                <div>
                  <span>Maturity Portfolio Value</span>
                  <strong style={{ color: '#00E599' }}>{formatAUD(finalValue)}</strong>
                </div>
              </div>

              <button 
                className="btn btn-primary-glow btn-block"
                onClick={() => onOpenModal(`Saturn Fund (${formatAUD(amount)})`)}
              >
                Reserve Allocation at {formatAUD(amount)} →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
