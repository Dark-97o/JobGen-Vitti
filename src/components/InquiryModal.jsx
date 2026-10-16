import React, { useState, useEffect } from 'react';

export default function InquiryModal({ isOpen, onClose, initialTopic }) {
  const [topic, setTopic] = useState(initialTopic || 'General Allocation');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
    if (isOpen) {
      setSubmitted(false);
    }
  }, [initialTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {!submitted ? (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '8px 0 4px', color: '#FFF' }}>
              Request Allocation or Mandate Discussion
            </h3>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
              Connect with our Sydney or Dubai principals. All communications are bound by statutory confidentiality.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11.5, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. David Miller" 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '9px 12px', borderRadius: 6, color: '#FFF', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11.5, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="david@company.com.au" 
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '9px 12px', borderRadius: 6, color: '#FFF', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11.5, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+61 400 000 000" 
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '9px 12px', borderRadius: 6, color: '#FFF', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11.5, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Service Name *</label>
                <input 
                  type="text" 
                  required 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Capital Raising Advisory" 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '9px 12px', borderRadius: 6, color: '#00E599', fontWeight: 600, fontSize: 13, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11.5, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Your Message *</label>
                <textarea 
                  required 
                  rows={3}
                  placeholder="Outline your mandate requirements, timing, or inquiry details..." 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '9px 12px', borderRadius: 6, color: '#FFF', fontSize: 13, outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: '#64748B', marginTop: 2 }}>
                <input type="checkbox" required id="modalCheck" style={{ marginTop: 2 }} />
                <label htmlFor="modalCheck">
                  I confirm that I qualify as a Wholesale / Sophisticated Investor per s761G/GA of the Corporations Act 2001 (Cth) or represent a corporate entity.
                </label>
              </div>

              <button type="submit" className="btn btn-primary-glow btn-block" style={{ marginTop: 8 }}>
                Submit Service Inquiry →
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0, 229, 153, 0.15)', color: '#00E599', fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              ✓
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#FFF' }}>
              Inquiry Dispatched
            </h3>
            <p style={{ fontSize: 13.5, color: '#94A3B8', marginBottom: 20 }}>
              An Investment Director from our Sydney or Dubai desk will review your details and initiate confidential contact within 4 business hours.
            </p>
            <button className="btn btn-dark-glass btn-block" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
