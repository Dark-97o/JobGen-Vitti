import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ onOpenModal, location = 'AU', onSelectLocation }) {
  const [scrolled, setScrolled] = useState(false);
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger floating rectangle when scrolling away from top of hero
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setLocationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (loc) => {
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
    setLocationMenuOpen(false);
    // Smoothly scroll to the who-we-are section or offices section
    const targetSection = document.getElementById('who-we-are') || document.getElementById('offices');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-navbar ${scrolled ? 'scrolled-floating-rect' : 'transparent-hero'}`}>
      <div className="container nav-fullscreen-container">
        
        {/* Official Vitti Full Logo (Bigger) */}
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

        {/* Nav Actions: Location Favicon Dropdown Selector (Australia & Dubai) */}
        <div className="nav-cta-group" ref={menuRef}>
          <div className="nav-location-dropdown-wrap">
            <button 
              type="button"
              className={`nav-location-favicon-btn ${locationMenuOpen ? 'is-active' : ''}`}
              onClick={() => setLocationMenuOpen(!locationMenuOpen)}
              aria-label="Select Location Desk"
              aria-expanded={locationMenuOpen}
              title={`Selected Desk: ${location === 'AU' ? 'Australia' : 'Dubai'}`}
            >
              <MapPin size={18} strokeWidth={2.4} className="nav-location-pin-icon" />
              <span className="nav-location-tag">{location === 'AU' ? 'Australia' : 'Dubai'}</span>
              <ChevronDown size={14} className={`nav-location-chevron ${locationMenuOpen ? 'rotated' : ''}`} />
            </button>

            {locationMenuOpen && (
              <div className="nav-location-dropdown-menu" role="menu">
                <button
                  type="button"
                  className={`nav-location-dropdown-item ${location === 'AU' ? 'selected' : ''}`}
                  onClick={() => handleSelectLocation('AU')}
                  role="menuitem"
                >
                  <span className="dropdown-item-flag">🇦🇺</span>
                  <div className="dropdown-item-info">
                    <span className="dropdown-item-title">Australia</span>
                    <span className="dropdown-item-sub">Sydney Desk</span>
                  </div>
                  {location === 'AU' && <Check size={16} className="dropdown-item-check" />}
                </button>
                <div className="nav-location-dropdown-divider" />
                <button
                  type="button"
                  className={`nav-location-dropdown-item ${location === 'AE' ? 'selected' : ''}`}
                  onClick={() => handleSelectLocation('AE')}
                  role="menuitem"
                >
                  <span className="dropdown-item-flag">🇦🇪</span>
                  <div className="dropdown-item-info">
                    <span className="dropdown-item-title">Dubai</span>
                    <span className="dropdown-item-sub">DET License No. 1537728</span>
                  </div>
                  {location === 'AE' && <Check size={16} className="dropdown-item-check" />}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
