import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection({ onOpenModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section className="contact-card-section light-theme-grid-bg" id="contact">
      <div className="container contact-container">
        
        {/* Top Header: "Can We Help?" Headline (strictly NO pills above per AGENTS.md rule) */}
        <div className="contact-header-block">
          <h2 className="contact-headline">
            Can We Help?
          </h2>
          <p className="contact-subheadline">
            Our team was handpicked for their understanding of process and passion. We are always willing to share our deep knowledge and understanding.
          </p>
        </div>

        {/* Content placed directly on background - NO enclosing big box, NO info boxes */}
        <div className="contact-grid">
          
          {/* Left Column: Head Office & Let's Start a Conversation (unboxed, directly on background) */}
          <div className="contact-info-col">
            
            {/* Head Office (Unboxed) */}
            <div className="contact-info-direct">
              <div className="contact-icon-title-row">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <h3 className="contact-block-title">Head Office</h3>
              </div>
              <p className="contact-block-desc">
                Level 49, 8 Parramatta Square,<br />
                10 Darcy St, Parramatta NSW 2150
              </p>
              <div className="contact-meta-badge">
                <span>Sydney Financial District</span>
              </div>
            </div>

            {/* Let's Start a Conversation (Unboxed) */}
            <div className="contact-info-direct">
              <div className="contact-icon-title-row">
                <div className="contact-icon-box">
                  <Phone size={22} />
                </div>
                <h3 className="contact-block-title">Let’s Start a Conversation</h3>
              </div>
              
              <div className="contact-channels-list">
                <a href="tel:0285284508" className="contact-channel-item">
                  <Phone size={16} className="contact-ch-icon" />
                  <div>
                    <span className="contact-ch-label">Phone</span>
                    <strong className="contact-ch-val">(02) 8528 4508</strong>
                  </div>
                </a>

                <a href="mailto:info@vitti.capital" className="contact-channel-item">
                  <Mail size={16} className="contact-ch-icon" />
                  <div>
                    <span className="contact-ch-label">Email</span>
                    <strong className="contact-ch-val">info@vitti.capital</strong>
                  </div>
                </a>
              </div>

              <p className="contact-consultation-note">
                Prefer a face‑to‑face consultation? Schedule a coffee at our Parramatta headquarters or request a virtual meeting—whichever suits your calendar.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form (Direct on background) */}
          <div className="contact-form-col">
            <div className="contact-form-direct">
              {isSubmitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={48} className="contact-success-icon" />
                  <h4 className="contact-success-title">Message Received</h4>
                  <p className="contact-success-desc">
                    Thank you for contacting Vitti Capital. A senior principal from our Parramatta desk will review your mandate and respond within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-dark-ink"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-inner">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      placeholder="Direct phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      required
                      placeholder="institutional@firm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea 
                      id="contact-message" 
                      rows={4}
                      required
                      placeholder="Describe your mandate, private credit requirement, or investment criteria..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input-field form-textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary-glow btn-block contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Transmitting Mandate...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
