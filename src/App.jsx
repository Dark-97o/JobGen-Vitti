import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import SaturnFundPage from './pages/SaturnFundPage';
import RegulatoryDisclosures from './components/RegulatoryDisclosures';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import FloatingAssistant from './components/FloatingAssistant';
import PageTransitionCurtain from './components/PageTransitionCurtain';
import ScrollRevealController from './components/ScrollRevealController';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('General Allocation');
  const [location, setLocation] = useState('AU'); // 'AU' for Australia, 'AE' for Dubai

  // Route state: 'home' | 'about' | 'saturn'
  const getRouteFromUrl = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    if (path === '/about-us' || path === '/about') return 'about';
    if (path === '/saturn-unit-trust-fund' || path === '/saturn-fund' || path === '/saturn') return 'saturn';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('about')) return 'about';
    if (hash.includes('saturn')) return 'saturn';
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromUrl);
  // Page Transition Stage: 'idle' | 'entering' | 'covered' | 'leaving'
  const [transitionStage, setTransitionStage] = useState('leaving');
  const isTransitioningRef = useRef(false);

  // Initial page load curtain unveil animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionStage('idle');
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize route state with browser back/forward and hash
  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getRouteFromUrl();
      if (nextRoute !== currentRoute && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        setTransitionStage('entering');

        setTimeout(() => {
          setCurrentRoute(nextRoute);
          window.scrollTo(0, 0);
          if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
          setTransitionStage('leaving');

          setTimeout(() => {
            setTransitionStage('idle');
            isTransitioningRef.current = false;
          }, 520);
        }, 460);
      } else {
        setCurrentRoute(nextRoute);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [currentRoute]);

  // Programmatic navigation helper with 3-bar curtain transition
  const navigate = (route, hash) => {
    let url = '/';
    if (route === 'about') url = '/about-us';
    else if (route === 'saturn') url = '/saturn-unit-trust-fund';
    else if (hash) url = '/' + hash;

    // Same route navigation: anchor scroll without curtain
    if (route === currentRoute) {
      window.history.pushState({}, '', url);
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) {
            if (window.__lenis) {
              window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 50);
      } else {
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 0.8 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Different route: Run 3-Bar Full Screen Transition
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setTransitionStage('entering');

    // At 460ms: 3 bars have fully cascaded from top to cover the screen
    setTimeout(() => {
      window.history.pushState({}, '', url);
      setCurrentRoute(route);

      // Reset scroll position immediately while screen is covered
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Phase 2: 3 bars cascade downwards to unveil new page
      setTransitionStage('leaving');

      setTimeout(() => {
        setTransitionStage('idle');
        isTransitioningRef.current = false;

        // If target hash exists on new page, smoothly scroll to it
        if (hash) {
          setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
              if (window.__lenis) {
                window.__lenis.scrollTo(target, { offset: -30, duration: 1.0 });
              } else {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 80);
        }
      }, 520);
    }, 460);
  };

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
    navigate('home', '#contact');
  };

  return (
    <div className="app-root">
      {/* 0. 3-BAR FULL-SCREEN PAGE TRANSITION CURTAIN */}
      <PageTransitionCurtain stage={transitionStage} />

      {/* 0.1 GLOBAL SCROLL REVEAL CONTROLLER (Fade In Info & Cards on Scroll) */}
      <ScrollRevealController 
        currentRoute={currentRoute} 
        transitionStage={transitionStage} 
      />

      {/* 1. NAVBAR */}
      <Navbar 
        location={location}
        onSelectLocation={setLocation}
        onOpenModal={handleOpenModal} 
        onOpenEligibility={handleOpenEligibility} 
        currentRoute={currentRoute}
        onNavigate={navigate}
      />

      {/* 2. PAGE CONTENT BASED ON CURRENT ROUTE */}
      <main className="main-page-content" id="main-content">
        {currentRoute === 'about' && (
          <AboutUsPage 
            onOpenModal={handleOpenModal} 
            onNavigate={navigate} 
          />
        )}

        {currentRoute === 'saturn' && (
          <SaturnFundPage 
            onOpenModal={handleOpenModal} 
            onNavigate={navigate} 
          />
        )}

        {currentRoute === 'home' && (
          <HomePage 
            location={location}
            onOpenModal={handleOpenModal} 
          />
        )}
      </main>

      {/* 3. STATUTORY REGULATORY DISCLOSURES & WHOLESALE NOTICE (Above Footer) */}
      <RegulatoryDisclosures />

      {/* 4. REFINED INSTITUTIONAL FOOTER */}
      <Footer onNavigate={navigate} />

      {/* 5. FLOATING 3D MODEL ASSISTANT */}
      <FloatingAssistant />

      {/* 6. GLOBAL MODAL */}
      <InquiryModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialTopic={modalTopic} 
      />
    </div>
  );
}
