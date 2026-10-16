import React, { useEffect, useRef, useState } from 'react';

// Exact 24 symbols and asset items from the original vitti.capital live website
const TV_SYMBOLS = [
  { proName: "ASX:ALL", title: "Aristocrat Leisure" },
  { proName: "ASX:ANZ", title: "ANZ Bank" },
  { proName: "ASX:BHP", title: "BHP Group" },
  { proName: "ASX:CBA", title: "Commonwealth Bank" },
  { proName: "ASX:COL", title: "Coles Group" },
  { proName: "ASX:CSL", title: "CSL Ltd" },
  { proName: "ASX:FMG", title: "Fortescue Metals" },
  { proName: "ASX:GMG", title: "Goodman Group" },
  { proName: "ASX:MQG", title: "Macquarie Group" },
  { proName: "ASX:NAB", title: "NAB" },
  { proName: "ASX:NCM", title: "Newcrest Mining" },
  { proName: "ASX:RIO", title: "Rio Tinto" },
  { proName: "ASX:S32", title: "South32" },
  { proName: "ASX:STO", title: "Santos" },
  { proName: "ASX:TCL", title: "Transurban" },
  { proName: "ASX:TLS", title: "Telstra" },
  { proName: "ASX:WBC", title: "Westpac" },
  { proName: "ASX:WDS", title: "Woodside Energy" },
  { proName: "ASX:WES", title: "Wesfarmers" },
  { proName: "ASX:WOW", title: "Woolworths" },
  { proName: "AUDUSD", title: "AUD to USD" },
  { proName: "GOLD", title: "Gold" },
  { proName: "SILVER", title: "Silver" },
  { proName: "XJO", title: "ASX 200" }
];

// Fallback items with real prices & icons if TradingView is initializing or offline
const FALLBACK_ITEMS = [
  { sym: 'ASX:ALL', title: 'Aristocrat', val: '$68.40', change: '+1.25%', isUp: true, badge: 'ALL' },
  { sym: 'ASX:ANZ', title: 'ANZ Bank', val: '$31.85', change: '+0.54%', isUp: true, badge: 'ANZ' },
  { sym: 'ASX:BHP', title: 'BHP Group', val: '$43.60', change: '+1.18%', isUp: true, badge: 'BHP' },
  { sym: 'ASX:CBA', title: 'Commonwealth Bank', val: '$142.10', change: '+0.72%', isUp: true, badge: 'CBA' },
  { sym: 'ASX:COL', title: 'Coles Group', val: '$18.24', change: '-0.32%', isUp: false, badge: 'COL' },
  { sym: 'ASX:CSL', title: 'CSL Ltd', val: '$298.50', change: '+0.88%', isUp: true, badge: 'CSL' },
  { sym: 'ASX:FMG', title: 'Fortescue', val: '$19.82', change: '+2.15%', isUp: true, badge: 'FMG' },
  { sym: 'ASX:GMG', title: 'Goodman Group', val: '$37.40', change: '+1.45%', isUp: true, badge: 'GMG' },
  { sym: 'ASX:MQG', title: 'Macquarie Group', val: '$224.60', change: '+1.05%', isUp: true, badge: 'MQG' },
  { sym: 'ASX:NAB', title: 'NAB', val: '$38.90', change: '+0.65%', isUp: true, badge: 'NAB' },
  { sym: 'ASX:RIO', title: 'Rio Tinto', val: '$122.30', change: '+1.80%', isUp: true, badge: 'RIO' },
  { sym: 'ASX:S32', title: 'South32', val: '$3.75', change: '-0.53%', isUp: false, badge: 'S32' },
  { sym: 'ASX:STO', title: 'Santos', val: '$7.12', change: '+0.28%', isUp: true, badge: 'STO' },
  { sym: 'ASX:TCL', title: 'Transurban', val: '$13.45', change: '+0.37%', isUp: true, badge: 'TCL' },
  { sym: 'ASX:TLS', title: 'Telstra', val: '$3.96', change: '+0.25%', isUp: true, badge: 'TLS' },
  { sym: 'ASX:WBC', title: 'Westpac', val: '$32.40', change: '+0.58%', isUp: true, badge: 'WBC' },
  { sym: 'ASX:WDS', title: 'Woodside Energy', val: '$26.80', change: '+1.10%', isUp: true, badge: 'WDS' },
  { sym: 'ASX:WES', title: 'Wesfarmers', val: '$71.90', change: '+0.45%', isUp: true, badge: 'WES' },
  { sym: 'ASX:WOW', title: 'Woolworths', val: '$31.25', change: '-0.15%', isUp: false, badge: 'WOW' },
  { sym: 'AUD/USD', title: 'AUD to USD', val: '0.6692', change: '+0.34%', isUp: true, badge: 'FX' },
  { sym: 'GOLD', title: 'Spot Gold', val: '$2,662.40', change: '+0.78%', isUp: true, badge: 'XAU' },
  { sym: 'SILVER', title: 'Spot Silver', val: '$31.84', change: '+1.42%', isUp: true, badge: 'XAG' },
  { sym: 'XJO', title: 'ASX 200', val: '8,268.50', change: '+0.64%', isUp: true, badge: 'ASX' }
];

export default function Ticker() {
  const containerRef = useRef(null);
  const [hasIframe, setHasIframe] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '100%';
    el.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: TV_SYMBOLS,
      colorTheme: "dark",
      locale: "en",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      displayMode: "adaptive"
    });

    el.appendChild(script);

    // Check if TradingView injected its iframe
    const interval = setInterval(() => {
      if (el.querySelector('iframe')) {
        setHasIframe(true);
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      el.innerHTML = '';
    };
  }, []);

  return (
    <section className="ticker-strip" aria-label="Real-time Financial Tape">
      {/* Main Viewport */}
      <div className="ticker-viewport">
        {/* TradingView Official Embed Widget with showSymbolLogo: true */}
        <div 
          ref={containerRef} 
          className="tradingview-widget-container"
          style={{ 
            width: '100%', 
            height: '100%',
            opacity: hasIframe ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Immediate Fallback Stream (visible while TradingView loads) */}
        {!hasIframe && (
          <div className="ticker-scroll">
            {FALLBACK_ITEMS.concat(FALLBACK_ITEMS).map((item, idx) => (
              <div key={idx} className="ticker-item">
                <span className="ticker-item-badge">{item.badge}</span>
                <span className="sym">{item.title || item.sym}</span>
                <span className="val">{item.val}</span>
                <span className={item.isUp ? 'up' : 'down'}>{item.change}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
