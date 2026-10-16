import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import ShapeMosaic from './originkit/ui/shape-mosaic-custom-style';

export default function Footer() {
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
              <li><a href="#universe">Capital Raising Advisory</a></li>
              <li><a href="#universe">Private Credit Syndication</a></li>
              <li><a href="#universe">Cross-Border M&A Advisory</a></li>
              <li><a href="#universe">Structured Finance Solutions</a></li>
              <li><a href="#universe">Pre-IPO & Dual-Listing</a></li>
            </ul>
          </div>

          {/* Left Column 2: Intelligence & Navigation */}
          <div className="footer-nav-column">
            <h4 className="footer-nav-title">Intelligence</h4>
            <ul className="footer-links-list">
              <li><a href="#market-updates">Market Updates</a></li>
              <li><a href="#why-partner">Why Vitti Capital</a></li>
              <li><a href="#success-story">Success Stories</a></li>
              <li><a href="#blogs">Blogs & Insights</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Middle Column: Big Vitti Full Logo */}
          <div className="footer-brand-column footer-brand-middle">
            <div className="footer-brand-header">
              <img 
                src="/assets/vitti-full.png" 
                alt="Vitti Capital" 
                className="footer-brand-full-logo" 
              />
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
          </div>
        </div>

      </div>
    </footer>
  );
}
