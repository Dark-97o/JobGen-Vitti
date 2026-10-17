import React, { useEffect } from 'react';

// Selectors for Section Info & Section Headers
const INFO_SELECTORS = [
  '.connected-header',
  '.market-updates-header',
  '.contact-header',
  '.blog-header',
  '.faq-header',
  '.about-company-headline',
  '.about-story-paragraphs',
  '.about-values-stage-header',
  '.about-governance-header',
  '.about-cta-heading',
  '.about-cta-sub',
  '.saturn-section-header',
  '.saturn-overview-grid',
  '.regulatory-card-header',
  '.regulatory-intro-block',
  '.section-header',
  '.sydney-col-story',
];

// Selectors for Cards & Card Grids across all pages
const CARD_SELECTORS = [
  '.connected-service-card',
  '.market-update-card',
  '.contact-channel-item',
  '.contact-form-box',
  '.blog-card-item',
  '.faq-row',
  '.big-white-stroke-card',
  '.smaller-inner-card',
  '.about-tenet-card',
  '.about-company-preview-card',
  '.about-values-preview-card',
  '.about-values-partition-item',
  '.about-desk-card',
  '.about-mission-box',
  '.about-cta-banner',
  '.saturn-flip-card-perspective',
  '.saturn-step-item',
  '.saturn-radar-square-card',
  '.saturn-calc-container',
  '.saturn-metric-card',
  '.saturn-faq-row',
  '.saturn-cta-banner',
  '.why-sector-card',
  '.footer-regulatory-card',
  '.footer-reg-box',
];

// Container groups whose direct children should have staggered delay
const GROUP_CONTAINERS = [
  '.saturn-features-flip-grid',
  '.saturn-radar-grid',
  '.why-sector-cards-row',
  '.about-tenets-grid',
  '.about-desks-grid',
  '.market-updates-track',
  '.blog-cards-track',
  '.contact-channels-list',
  '.faq-list',
];

export default function ScrollRevealController({ currentRoute, transitionStage }) {
  useEffect(() => {
    // Only initialize when transition is idle and DOM is settled
    if (transitionStage !== 'idle') return;

    let observer = null;
    let timerId = null;

    const setupObserver = () => {
      const allSelectors = [...INFO_SELECTORS, ...CARD_SELECTORS].join(', ');
      const elements = Array.from(document.querySelectorAll(allSelectors));

      if (!elements.length) return;

      // Assign staggered delays to children of grid/flex groups
      GROUP_CONTAINERS.forEach((groupSel) => {
        const containers = document.querySelectorAll(groupSel);
        containers.forEach((container) => {
          const children = Array.from(container.children);
          children.forEach((child, idx) => {
            if (!child.hasAttribute('data-delay')) {
              child.setAttribute('data-delay', ((idx % 6) + 1).toString());
            }
          });
        });
      });

      // Observer configuration: triggers when element is scrolled into view (50px buffer)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              el.classList.add('is-revealed');
              observer.unobserve(el);

              // After reveal transition completes, reset transform so native card hover animations remain intact
              const handleTransitionEnd = (e) => {
                if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                  el.style.transform = '';
                  el.removeEventListener('transitionend', handleTransitionEnd);
                }
              };
              el.addEventListener('transitionend', handleTransitionEnd);
              // Fallback timeout in case transitionend does not fire
              setTimeout(() => {
                el.style.transform = '';
              }, 900);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -45px 0px',
          threshold: 0.08,
        }
      );

      const vh = window.innerHeight || 800;

      elements.forEach((el) => {
        // Skip sticky scrub frames which handle their own dynamic scroll transitions
        if (el.closest('.hero-scroll-track') || el.closest('.success-scroll-track')) {
          return;
        }

        // Check if element is already inside the viewport on page load
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < vh * 0.92 && rect.bottom > 0;

        if (isInViewport) {
          // Already in view: reveal immediately
          el.classList.add('scroll-reveal', 'is-revealed');
        } else {
          // Below the fold: prepare for fade-in on scroll
          el.classList.add('scroll-reveal');
          observer.observe(el);
        }
      });
    };

    // Small delay to ensure route DOM and images have rendered
    timerId = setTimeout(setupObserver, 60);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (observer) observer.disconnect();
    };
  }, [currentRoute, transitionStage]);

  return null;
}
