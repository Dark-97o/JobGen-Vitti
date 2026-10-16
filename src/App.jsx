import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SydneyCapitalMarkets from './components/SydneyCapitalMarkets';
import DivisionsBento from './components/DivisionsBento';
import WhyPartner from './components/WhyPartner';
import SuccessStory from './components/SuccessStory';
import MarketUpdatesBand from './components/MarketUpdatesBand';
import ContactSection from './components/ContactSection';
import BlogBand from './components/BlogBand';
import FaqSection from './components/FaqSection';
import StayInTheLoopCard from './components/StayInTheLoopCard';
import RegulatoryDisclosures from './components/RegulatoryDisclosures';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('General Allocation');

  // Initialize frictionless Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // frictionless exponential glide
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept internal anchor links for buttery-smooth glide
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -30, duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  const handleOpenModal = (topic = 'General Allocation') => {
    setModalTopic(topic);
    setModalOpen(true);
  };

  const handleOpenEligibility = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#contact', { offset: -50, duration: 1.2 });
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-root">
      {/* 1. NAVBAR */}
      <Navbar onOpenModal={handleOpenModal} onOpenEligibility={handleOpenEligibility} />

      {/* 2. FULL SCREEN HERO + WHO WE ARE (Hero morphs into card and floats to Who We Are on scroll) */}
      <Hero onOpenModal={handleOpenModal} />

      {/* 3. FROM SYDNEY TO GLOBAL CAPITAL MARKETS (Woman Background with half-cut bottom stroke) */}
      <SydneyCapitalMarkets />

      {/* 4. CONNECTED SERVICES (Dark Horizontal Rotation) */}
      <DivisionsBento onOpenModal={handleOpenModal} />

      {/* 5. WHY PARTNER WITH VITTI CAPITAL? (Morphing Partner Image & 5 Partitions) */}
      <WhyPartner onOpenModal={handleOpenModal} />

      {/* 6. SUCCESS STORY (Nasdaq Bell Ringing Background + Scroll Light Black Overlay + Braiin Link) */}
      <SuccessStory onOpenModal={handleOpenModal} />

      {/* 7. MARKET UPDATES BAND (Solid Black, Left 30% "Market Updates", Right 70% scrolling ticker) */}
      <MarketUpdatesBand onOpenModal={handleOpenModal} />

      {/* 8. CONTACT CARD (Can We Help? headline + Head Office + Contact Conversation + Form) */}
      <ContactSection onOpenModal={handleOpenModal} />

      {/* 9. BLOG BAND (Solid Black, Left 30% "Blogs", Right 70% scrolling blogs just like daily updates) */}
      <BlogBand onOpenModal={handleOpenModal} />

      {/* 10. FAQ SECTION (7 Exact FAQs from vitti.capital) */}
      <FaqSection />

      {/* 11. BIG WHITE STROKE CARD WITH SMALLER INNER CARD ("Stay in the loop. Get the latest insights") */}
      <StayInTheLoopCard />

      {/* 12. STATUTORY REGULATORY DISCLOSURES & WHOLESALE NOTICE (Above Footer) */}
      <RegulatoryDisclosures />

      {/* 13. REFINED INSTITUTIONAL FOOTER */}
      <Footer />

      {/* GLOBAL MODAL */}
      <InquiryModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialTopic={modalTopic} 
      />
    </div>
  );
}
