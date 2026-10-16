import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const MARKET_ITEMS = [
  {
    date: '14 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-14',
    summary: 'A broad but uneven selloff gripped the ASX on Wednesday, with financials bearing the brunt of selling pressure while energy and rate-sensitive names showed resilient institutional bids.',
    badge: 'ASX 200',
    stat: '-0.64%',
    statColor: '#FF6B6B'
  },
  {
    date: '13 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-13',
    summary: 'A sharp rotation out of technology and materials into defensives and yield-sensitives defined Tuesday’s session, leaving selective opportunities in senior-secured private debt.',
    badge: 'ROTATION',
    stat: '+0.42%',
    statColor: '#00E599'
  },
  {
    date: '12 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-12',
    summary: 'A broad-based risk-on session carried the ASX 200 to its best close in recent weeks, with Financials and Materials doing the heavy lifting across institutional books.',
    badge: 'RALLY',
    stat: '+1.18%',
    statColor: '#00E599'
  },
  {
    date: '09 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-09',
    summary: 'A broad-based risk-on session carried the ASX 200 to a solid Friday finish, with growth-sensitive sectors and cross-border syndicates leading the charge.',
    badge: 'EQUITIES',
    stat: '+0.85%',
    statColor: '#00E599'
  },
  {
    date: '08 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-08',
    summary: 'A defensive rotation defined Thursday’s session on the ASX, with investors retreating from cyclicals and resources into high-yielding alternative structured debt.',
    badge: 'DEFENSIVE',
    stat: '10.8% Yield',
    statColor: '#00E599'
  },
  {
    date: '07 OCT 2026',
    title: 'Daily ASX Market Commentary – 2026-10-07',
    summary: 'A quiet but defensive session on Wednesday saw the ASX 200 shed just 8.00 points, with investors rotating into rate-sensitive corporate issuance facilities.',
    badge: 'DEBT MARKETS',
    stat: '-8.00 pts',
    statColor: '#FFB84D'
  }
];

export default function MarketUpdatesBand({ onOpenModal }) {
  // Duplicate items for continuous seamless infinite marquee scroll
  const scrollItems = [...MARKET_ITEMS, ...MARKET_ITEMS];

  return (
    <section className="market-updates-band" id="market-updates">
      <div className="market-band-container">
        
        {/* Left 30%: Text "Market Updates" (strictly NO PILLS above per AGENTS.md rule) */}
        <div className="market-band-left">
          <div className="market-band-left-inner">
            <h2 className="market-band-headline">
              Market Updates
            </h2>
          </div>
        </div>

        {/* Right 70%: Horizontally scrolling market updates from https://vitti.capital/ */}
        <div className="market-band-right">
          <div className="market-ticker-track">
            {scrollItems.map((item, idx) => (
              <div 
                key={`${item.date}-${idx}`} 
                className="market-update-card"
                onClick={() => onOpenModal && onOpenModal(`Market Update: ${item.title}`)}
                role="button"
                tabIndex={0}
              >
                <div className="market-card-top">
                  <span className="market-card-date">{item.date}</span>
                  <span className="market-card-stat" style={{ color: item.statColor }}>
                    {item.stat}
                  </span>
                </div>
                <h4 className="market-card-title">{item.title}</h4>
                <p className="market-card-summary">{item.summary}</p>
                <div className="market-card-footer">
                  <span className="market-card-read">
                    Read Update <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
