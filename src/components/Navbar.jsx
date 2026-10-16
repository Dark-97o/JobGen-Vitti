import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState('AU'); // 'AU' for Australia, 'AE' for Dubai

  useEffect(() => {
    const handleScroll = () => {
      // Trigger floating rectangle when scrolling away from top of hero
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectLocation = (loc) => {
    setLocation(loc);
    // Smoothly scroll to the offices section to highlight the selected desk
    const officesSection = document.getElementById('offices');
    if (officesSection) {
      officesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-navbar ${scrolled ? 'scrolled-floating-rect' : 'transparent-hero'}`}>
      <div className="container nav-fullscreen-container">
        
        {/* Official Vitti Full Logo */}
        <a href="#" className="nav-brand-logo-wrap" aria-label="Vitti Capital Home">
          <img 
            src="/assets/vitti-full.png" 
            alt="Vitti Capital" 
            className="nav-brand-full-logo" 
          />
        </a>

        {/* Navigation Bar Options */}
        <nav className="nav-menu">
          <a href="#divisions" className="nav-item-link">Divisions</a>
          <a href="#saturn-fund" className="nav-item-link">Saturn Fund</a>
          <a href="#execution" className="nav-item-link">Methodology</a>
          <a href="#track-record" className="nav-item-link">Mandates</a>
          <a href="#vitti-lens" className="nav-item-link">Lens</a>
          <a href="#offices" className="nav-item-link">Offices</a>
        </nav>

        {/* Nav Actions: Location Selector (Australia / Dubai) + Action Button */}
        <div className="nav-cta-group">
          {/* Location Selector of Australia and Dubai */}
          <div className="nav-location-toggle" role="group" aria-label="Jurisdiction Selector">
            <button 
              type="button"
              className={`nav-location-pill ${location === 'AU' ? 'active' : ''}`}
              onClick={() => handleSelectLocation('AU')}
              title="Sydney, Australia Office & Desks"
            >
              <span className="location-flag">🇦🇺</span>
              <span className="location-text">Australia</span>
            </button>
            <button 
              type="button"
              className={`nav-location-pill ${location === 'AE' ? 'active' : ''}`}
              onClick={() => handleSelectLocation('AE')}
              title="Dubai, UAE Office & Desks"
            >
              <span className="location-flag">🇦🇪</span>
              <span className="location-text">Dubai</span>
            </button>
          </div>

          {/* Action Button on Hero / Floating Nav */}
          <button 
            type="button"
            className="btn btn-primary-glow btn-sm nav-book-call-btn"
            onClick={() => onOpenModal && onOpenModal(`Book a Call (${location === 'AU' ? 'Sydney Desk' : 'Dubai Desk'})`)}
          >
            <span>Book a Call</span>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}
