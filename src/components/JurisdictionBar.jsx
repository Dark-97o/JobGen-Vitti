import React, { useState, useEffect } from 'react';

export default function JurisdictionBar() {
  const [sydneyTime, setSydneyTime] = useState('');
  const [dubaiTime, setDubaiTime] = useState('');

  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      try {
        const syd = new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Sydney',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setSydneyTime(syd);
      } catch (e) {
        setSydneyTime('12:00:00');
      }

      try {
        const dxb = new Intl.DateTimeFormat('en-AE', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setDubaiTime(dxb);
      } catch (e) {
        setDubaiTime('06:00:00');
      }
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="top-bar">
      <div className="container top-bar-content">
        <div className="top-bar-left">
          <span className="live-dot" aria-hidden="true" />
          <span>AU REG: CAR #001306367</span>
          <span>•</span>
          <span>AFSL #518031</span>
          <span>•</span>
          <span>UAE DET #1537728</span>
          <span>•</span>
          <strong style={{ color: '#00E599' }}>Wholesale Clients Only (s761G)</strong>
        </div>

        <div className="top-bar-right">
          <div className="time-chip">
            <span className="city">Sydney</span>
            <span className="clock">{sydneyTime} AEST</span>
          </div>
          <span>/</span>
          <div className="time-chip">
            <span className="city">Dubai</span>
            <span className="clock">{dubaiTime} GST</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
