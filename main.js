/**
 * VITTI CAPITAL — CORE INTERACTIVE ENGINE
 * Features:
 * - Sydney & Dubai Live Jurisdiction Clocks
 * - Interactive Simulated Market Ticker
 * - Segmented Audience View Switcher (Wholesale vs Corporates)
 * - Saturn Unit Trust Fund Dynamic Return & Yield Calculator
 * - 3-Step Interactive Wholesale Investor Qualification Wizard
 * - Collapsible FAQ Accordion
 * - Interactive 3D Card Stage Tilt (Mouse Tracker)
 * - Modal Lead Capture & Deal Room Access Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. SYDNEY & DUBAI LIVE DUAL TIME INDICATORS
     ======================================================================== */
  function updateJurisdictionClocks() {
    const now = new Date();
    
    // Sydney Time (Australia/Sydney)
    try {
      const sydneyTimeStr = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      const clockSydney = document.getElementById('clock-sydney');
      if (clockSydney) clockSydney.textContent = `${sydneyTimeStr} AEST`;
    } catch (e) {
      // Fallback
    }

    // Dubai Time (Asia/Dubai)
    try {
      const dubaiTimeStr = new Intl.DateTimeFormat('en-AE', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      const clockDubai = document.getElementById('clock-dubai');
      if (clockDubai) clockDubai.textContent = `${dubaiTimeStr} GST`;
    } catch (e) {
      // Fallback
    }
  }

  updateJurisdictionClocks();
  setInterval(updateJurisdictionClocks, 1000);

  /* ========================================================================
     2. NAVBAR SCROLL BLUR STATE & MOBILE MENU
     ======================================================================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const primaryNav = document.getElementById('primary-nav');
  if (mobileBtn && primaryNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = primaryNav.style.display === 'flex';
      primaryNav.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        primaryNav.style.flexDirection = 'column';
        primaryNav.style.position = 'absolute';
        primaryNav.style.top = '100%';
        primaryNav.style.left = '20px';
        primaryNav.style.right = '20px';
        primaryNav.style.background = 'rgba(12, 16, 23, 0.98)';
        primaryNav.style.padding = '20px';
        primaryNav.style.borderRadius = '16px';
        primaryNav.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        primaryNav.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8)';
      }
    });
  }

  /* ========================================================================
     3. 3D CARD PERSPECTIVE TILT (Revolut / Stripe Card Tactility)
     ======================================================================== */
  const cardStage = document.getElementById('heroCardStage');
  if (cardStage && window.innerWidth > 992) {
    cardStage.addEventListener('mousemove', (e) => {
      const rect = cardStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      cardStage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    cardStage.addEventListener('mouseleave', () => {
      cardStage.style.transform = 'rotateX(0deg) rotateY(0deg)';
      cardStage.style.transition = 'transform 0.5s ease';
    });

    cardStage.addEventListener('mouseenter', () => {
      cardStage.style.transition = 'none';
    });
  }

  /* ========================================================================
     4. SEGMENTED AUDIENCE SWITCHER (Wholesale vs Corporates)
     ======================================================================== */
  const tabInvestors = document.getElementById('tab-investors');
  const tabCorporates = document.getElementById('tab-corporates');
  const investorsView = document.getElementById('investors-view');
  const corporatesView = document.getElementById('corporates-view');

  if (tabInvestors && tabCorporates && investorsView && corporatesView) {
    tabInvestors.addEventListener('click', () => {
      tabInvestors.classList.add('active');
      tabInvestors.setAttribute('aria-selected', 'true');
      tabCorporates.classList.remove('active');
      tabCorporates.setAttribute('aria-selected', 'false');

      corporatesView.style.display = 'none';
      investorsView.style.display = 'grid';
      investorsView.classList.add('animate-fade-in');
    });

    tabCorporates.addEventListener('click', () => {
      tabCorporates.classList.add('active');
      tabCorporates.setAttribute('aria-selected', 'true');
      tabInvestors.classList.remove('active');
      tabInvestors.setAttribute('aria-selected', 'false');

      investorsView.style.display = 'none';
      corporatesView.style.display = 'grid';
      corporatesView.classList.add('animate-fade-in');
    });
  }

  /* ========================================================================
     5. SATURN UNIT TRUST FUND DYNAMIC RETURN & YIELD CALCULATOR
     ======================================================================== */
  const amountSlider = document.getElementById('invest-amount-slider');
  const amountLabel = document.getElementById('amount-label');
  const calcMonthlyCash = document.getElementById('calc-monthly-cash');
  const calcTotalReturn = document.getElementById('calc-total-return');
  const calcFinalValue = document.getElementById('calc-final-value');
  const horizonToggle = document.getElementById('horizon-toggle');
  const payoutToggle = document.getElementById('payout-toggle');

  let currentAmount = 150000;
  let currentMonths = 24;
  let currentMode = 'cash'; // 'cash' or 'drp'
  const netAnnualRate = 0.11; // 11.0% target

  function formatCurrency(val) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(val);
  }

  function updateCalculator() {
    if (!amountSlider) return;

    currentAmount = parseFloat(amountSlider.value);
    amountLabel.textContent = formatCurrency(currentAmount);

    // Monthly interest = (Principal * Rate) / 12
    const monthlyReturn = (currentAmount * netAnnualRate) / 12;

    let totalProjectedReturn = 0;
    let finalVal = 0;

    if (currentMode === 'cash') {
      // Linear monthly cash payout
      totalProjectedReturn = monthlyReturn * currentMonths;
      finalVal = currentAmount + totalProjectedReturn;
      calcMonthlyCash.textContent = formatCurrency(monthlyReturn);
    } else {
      // Reinvestment (DRP compounding monthly)
      const monthlyRate = netAnnualRate / 12;
      finalVal = currentAmount * Math.pow(1 + monthlyRate, currentMonths);
      totalProjectedReturn = finalVal - currentAmount;
      // In DRP, show equivalent average monthly growth
      calcMonthlyCash.textContent = `~${formatCurrency(totalProjectedReturn / currentMonths)} (Compounded)`;
    }

    calcTotalReturn.textContent = formatCurrency(totalProjectedReturn);
    calcFinalValue.textContent = formatCurrency(finalVal);

    // Update reservation buttons with current amount
    document.querySelectorAll('.trigger-inquiry[data-topic="Saturn Fund Allocation"]').forEach(btn => {
      const span = btn.querySelector('span');
      if (span) span.textContent = `Reserve Allocation at ${formatCurrency(currentAmount)}`;
    });
  }

  if (amountSlider) {
    amountSlider.addEventListener('input', updateCalculator);
  }

  if (horizonToggle) {
    horizonToggle.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        horizonToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMonths = parseInt(btn.dataset.months, 10);
        updateCalculator();
      });
    });
  }

  if (payoutToggle) {
    payoutToggle.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        payoutToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        updateCalculator();
      });
    });
  }

  // Initial calculation
  updateCalculator();

  /* ========================================================================
     6. WHOLESALE INVESTOR QUALIFICATION WIZARD (Keyvo Modular Engine)
     ======================================================================== */
  const wPane1 = document.getElementById('wizardPane1');
  const wPane2 = document.getElementById('wizardPane2');
  const wPane3 = document.getElementById('wizardPane3');
  
  const wStepInd1 = document.getElementById('wStepInd1');
  const wStepInd2 = document.getElementById('wStepInd2');
  const wStepInd3 = document.getElementById('wStepInd3');

  const wizardOptBtns = document.querySelectorAll('.wizard-opt-btn');
  const wizardCriteriaBtns = document.querySelectorAll('.wizard-criteria-btn');
  const wizardBackBtn = document.getElementById('wizardBackBtn');
  const resetWizardBtn = document.getElementById('resetWizardBtn');

  // Step 1 Click
  wizardOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      wPane1.style.display = 'none';
      wPane2.style.display = 'block';
      wPane2.classList.add('animate-fade-in');

      wStepInd1.classList.remove('active');
      wStepInd2.classList.add('active');
    });
  });

  // Step 2 Click
  wizardCriteriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      wPane2.style.display = 'none';
      wPane3.style.display = 'block';
      wPane3.classList.add('animate-fade-in');

      wStepInd2.classList.remove('active');
      wStepInd3.classList.add('active');
    });
  });

  // Back to Step 1
  if (wizardBackBtn) {
    wizardBackBtn.addEventListener('click', () => {
      wPane2.style.display = 'none';
      wPane1.style.display = 'block';
      wStepInd2.classList.remove('active');
      wStepInd1.classList.add('active');
    });
  }

  // Reset Wizard
  if (resetWizardBtn) {
    resetWizardBtn.addEventListener('click', () => {
      wPane3.style.display = 'none';
      wPane2.style.display = 'none';
      wPane1.style.display = 'block';

      wStepInd3.classList.remove('active');
      wStepInd2.classList.remove('active');
      wStepInd1.classList.add('active');
    });
  }

  /* ========================================================================
     7. FAQ COLLAPSIBLE ACCORDION
     ======================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content').style.maxHeight = null;
            otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          }
        });

        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        }
      });
    }
  });

  /* ========================================================================
     8. MODAL WINDOW CONTROLLER (Inquiry & Data Room Gateway)
     ======================================================================== */
  const inquiryModal = document.getElementById('inquiryModal');
  const closeInquiryModal = document.getElementById('closeInquiryModal');
  const inquiryForm = document.getElementById('inquiryForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const modalSuccessClose = document.getElementById('modalSuccessClose');
  const topicSelect = document.getElementById('topic');

  function openModalWithTopic(topicName) {
    if (!inquiryModal) return;
    if (topicSelect && topicName) {
      for (let i = 0; i < topicSelect.options.length; i++) {
        if (topicSelect.options[i].value.includes(topicName) || topicName.includes(topicSelect.options[i].value)) {
          topicSelect.selectedIndex = i;
          break;
        }
      }
    }
    inquiryForm.style.display = 'flex';
    modalSuccess.style.display = 'none';
    inquiryModal.classList.add('active');
    inquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('active');
    inquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger buttons
  document.querySelectorAll('#open-inquiry-modal, .trigger-inquiry').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.dataset.topic || 'General Consultation';
      openModalWithTopic(topic);
    });
  });

  const openQualifyModalBtn = document.getElementById('open-qualify-modal');
  if (openQualifyModalBtn) {
    openQualifyModalBtn.addEventListener('click', () => {
      const qSection = document.getElementById('qualification-wizard');
      if (qSection) {
        qSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (closeInquiryModal) {
    closeInquiryModal.addEventListener('click', closeModal);
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal.classList.contains('active')) {
      closeModal();
    }
  });

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate encrypted institutional submission
      inquiryForm.style.display = 'none';
      modalSuccess.style.display = 'block';
    });
  }

  if (modalSuccessClose) {
    modalSuccessClose.addEventListener('click', closeModal);
  }

  // Download IM feedback
  const downloadImBtn = document.getElementById('download-im-btn');
  if (downloadImBtn) {
    downloadImBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModalWithTopic('Saturn Fund Allocation');
    });
  }

});
