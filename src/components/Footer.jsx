import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import ShapeMosaic from './originkit/ui/shape-mosaic-custom-style';

export default function Footer({ onNavigate }) {
  const handleNav = (e, route, hash) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route, hash);
    }
  };

  return (
    <footer className="refined-footer" id="footer">
      {/* Originkit Shape Mosaic Background Canvas */}
      <div className="footer-mosaic-bg-wrap" aria-hidden="true">
        <ShapeMosaic
          ink="#15261d"
          lit="#00FFA1"
          cell={32}
          size={9}
          kinds={6}
          fill={0}
          spin={18}
          turn={25}
          reach={18}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
        <div className="footer-mosaic-overlay" />
        <div className="footer-mosaic-vignette" />
      </div>

      <div className="container footer-container">
        
        {/* Top Tier: Brand, Global Desks & Navigation Columns */}
        {/* Top Tier: Two Columns Left, Big Brand in Middle, Two Columns Right */}
        <div className="footer-top-grid">
          
          {/* Left Column 1: Advisory Divisions */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-title">Advisory Divisions</h4>
            <ul className="footer-links-list">
              <li><a href="/#divisions" onClick={(e) => handleNav(e, 'home', '#divisions')}>Capital Raising</a></li>
              <li><a href="/#divisions" onClick={(e) => handleNav(e, 'home', '#divisions')}>Private Credit</a></li>
              <li><a href="/#divisions" onClick={(e) => handleNav(e, 'home', '#divisions')}>Cross-Border M&A</a></li>
              <li><a href="/#divisions" onClick={(e) => handleNav(e, 'home', '#divisions')}>Structured Finance</a></li>
              <li><a href="/#divisions" onClick={(e) => handleNav(e, 'home', '#divisions')}>Pre-IPO Advisory</a></li>
            </ul>
          </div>

          {/* Left Column 2: Intelligence & Navigation */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-title">Intelligence</h4>
            <ul className="footer-links-list">
              <li><a href="/about-us" onClick={(e) => handleNav(e, 'about')}>About Us</a></li>
              <li><a href="/saturn-unit-trust-fund" onClick={(e) => handleNav(e, 'saturn')}>Saturn Fund</a></li>
              <li><a href="/#why-partner" onClick={(e) => handleNav(e, 'home', '#why-partner')}>Why Vitti</a></li>
              <li><a href="/#success-story" onClick={(e) => handleNav(e, 'home', '#success-story')}>Success Stories</a></li>
              <li><a href="/#faq" onClick={(e) => handleNav(e, 'home', '#faq')}>FAQs</a></li>
            </ul>
          </div>

          {/* Middle Column: Big Vitti Full Logo */}
          <div className="footer-brand-column footer-brand-middle">
            <div className="footer-brand-header">
              <a 
                href="/" 
                onClick={(e) => handleNav(e, 'home')} 
                style={{ display: 'block', textDecoration: 'none' }}
                aria-label="Vitti Capital Home"
              >
                <img 
                  src="/assets/vitti-full.png" 
                  alt="Vitti Capital" 
                  className="footer-brand-full-logo" 
                />
              </a>
            </div>
          </div>

          {/* Right Column 1: Global Desks */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-title">Global Desks</h4>
            <div className="footer-desks-summary">
              <div className="footer-desk-item">
                <span className="desk-dot active-dot" />
                <div className="desk-info-group">
                  <span className="desk-city">Sydney Desk</span>
                  <span className="desk-addr">Level 49, 8 Parramatta Sq</span>
                </div>
              </div>
              <div className="footer-desk-item">
                <span className="desk-dot active-dot" />
                <div className="desk-info-group">
                  <span className="desk-city">Dubai Desk</span>
                  <span className="desk-addr">DET License No. 1537728</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column 2: Contact Information */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-title">Contact & Mandates</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-list-lbl">Direct Phone</span>
                <a href="tel:0285284508" className="contact-list-val">(02) 8528 4508</a>
              </li>
              <li>
                <span className="contact-list-lbl">Mandate Desk</span>
                <a href="mailto:info@vitti.capital" className="contact-list-val">info@vitti.capital</a>
              </li>
              <li>
                <span className="contact-list-lbl">Wholesale Verification</span>
                <a href="#contact" className="contact-list-val">Accountant Portal <ArrowUpRight size={12} className="inline ml-1" /></a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Legal Links */}
        <div className="footer-bottom-bar">
          <div className="footer-copy-text">
            © 2026 Vitti Capital Pty Ltd. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#faq">Wholesale Verification</a>
            <span className="legal-dot">•</span>
            <a href="https://vitti.capital" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
            <span className="legal-dot">•</span>
            <a href="#footer">Financial Services Guide (FSG)</a>
            <span className="legal-dot">•</span>
            <a href="#footer">Terms of Advisory</a>
            <span className="legal-dot">•</span>
            <span className="footer-powered-by">
              <span>Powered by JobGen</span>
              <img 
                src="/assets/Whitelogo.webp" 
                alt="JobGen" 
                className="footer-jobgen-logo" 
              />
            </span>
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
    </footer>
  );
}
