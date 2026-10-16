import React from 'react';
import Hero from '../components/Hero';
import SydneyCapitalMarkets from '../components/SydneyCapitalMarkets';
import DivisionsBento from '../components/DivisionsBento';
import WhyPartner from '../components/WhyPartner';
import SuccessStory from '../components/SuccessStory';
import MarketUpdatesBand from '../components/MarketUpdatesBand';
import ContactSection from '../components/ContactSection';
import BlogBand from '../components/BlogBand';
import FaqSection from '../components/FaqSection';
import StayInTheLoopCard from '../components/StayInTheLoopCard';

export default function HomePage({ location, onOpenModal }) {
  return (
    <div className="home-page-flow">
      {/* 2. FULL SCREEN HERO + WHO WE ARE */}
      <Hero 
        selectedRegion={location}
        onOpenModal={onOpenModal} 
      />

      {/* 3. FROM SYDNEY TO GLOBAL CAPITAL MARKETS */}
      <SydneyCapitalMarkets />

      {/* 4. CONNECTED SERVICES (Dark Horizontal Rotation) */}
      <DivisionsBento onOpenModal={onOpenModal} />

      {/* 5. WHY PARTNER WITH VITTI CAPITAL? */}
      <WhyPartner onOpenModal={onOpenModal} />

      {/* 6. SUCCESS STORY */}
      <SuccessStory onOpenModal={onOpenModal} />

      {/* 7. MARKET UPDATES BAND */}
      <MarketUpdatesBand onOpenModal={onOpenModal} />

      {/* 8. CONTACT CARD (Can We Help?) */}
      <ContactSection onOpenModal={onOpenModal} />

      {/* 9. BLOG BAND */}
      <BlogBand onOpenModal={onOpenModal} />

      {/* 10. FAQ SECTION */}
      <FaqSection />

      {/* 11. STAY IN THE LOOP CARD */}
      <StayInTheLoopCard />
    </div>
  );
}
