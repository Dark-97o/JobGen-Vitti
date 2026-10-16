import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS_FROM_WEBSITE = [
  {
    q: 'What types of private investments are available in Australia?',
    a: 'Wholesale investors in Australia can access private equity, private credit, pre-IPO placements, unit trusts and other alternative assets that sit outside the ASX. These private investments are typically sourced and structured by an investment advisory firm rather than bought directly on an exchange, and are generally reserved for wholesale or sophisticated investors.'
  },
  {
    q: 'Who qualifies as a wholesale investor in Australia?',
    a: 'Under the Corporations Act, an individual generally qualifies as a wholesale investor by meeting the net assets test ($2.5 million or more) or the gross income test ($250,000 or more for the last two years), or by holding a qualified accountant’s sophisticated investor certificate. Companies and trusts can also qualify based on asset size.'
  },
  {
    q: 'What does an investment advisory firm in Australia do?',
    a: 'An investment advisory firm sources, structures and manages access to private and public market opportunities on behalf of clients. This typically includes due diligence on deals and fund managers, portfolio construction, capital raising support, and ongoing reporting, tailored to a wholesale investor’s objectives and risk appetite.'
  },
  {
    q: 'Why choose a Sydney-based investment firm for private market access?',
    a: 'A Sydney-based investment firm sits close to Australia’s largest concentration of fund managers, corporate advisers and ASX-listed companies, which supports faster access to deal flow and local market intelligence. Proximity also helps with cross-border transactions routed through Australia’s major financial hub.'
  },
  {
    q: 'What is private equity investment and how does it differ from public market investing?',
    a: 'Private equity investment involves taking direct or fund-based stakes in companies that are not listed on a public exchange, generally over a multi-year horizon. Unlike public market investing, private equity is illiquid and priced infrequently, but it can offer an illiquidity premium and closer alignment with company performance.'
  },
  {
    q: 'What are alternative investments and why do wholesale investors consider them?',
    a: 'Alternative investments cover asset classes outside traditional listed shares and bonds, such as private credit, private equity, real assets and unit trusts. Wholesale investors often add alternatives to diversify a portfolio, reduce correlation to public market swings, and target different return and risk profiles.'
  },
  {
    q: 'How do I get started investing with an advisory firm like Vitti Capital?',
    a: 'The process typically starts with verifying wholesale investor status, followed by a consultation to understand your objectives, liquidity needs and risk tolerance. From there, an advisory firm can present suitable private and public market opportunities and help structure an appropriate portfolio.'
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="faq-section-wrap light-theme-grid-bg" id="faq">
      <div className="container">
        
        {/* Header: strictly NO PILLS above headline per AGENTS.md rule */}
        <div className="faq-header-center">
          <h2 className="faq-main-title">
            FAQ's
          </h2>
          <p className="faq-subtitle">
            Direct clarity on wholesale eligibility, alternative assets, and private market structuring in Australia.
          </p>
        </div>

        <div className="faq-list-container">
          {FAQS_FROM_WEBSITE.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon-box">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer-block">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
