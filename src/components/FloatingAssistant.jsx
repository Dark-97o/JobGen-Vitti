import React, { useEffect } from 'react';
import { Download } from 'lucide-react';

export default function FloatingAssistant() {
  // Load thrine script dynamically if not already loaded
  useEffect(() => {
    if (!document.querySelector('script[src="https://thrine.app/embed/v1.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://thrine.app/embed/v1.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/Vitti_Capital_Guide.pdf';
    link.download = 'Vitti_Capital_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <aside 
      className="floating-assistant-fixed-left"
      aria-label="Vitti Capital Guide Assistant"
    >
      <div 
        className="floating-embed-container"
        onClick={handleDownload}
        title="Download Vitti Capital Guide (PDF)"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDownload();
          }
        }}
      >
        <model-embed
          project="e_f0aecc04d9089a18d8db"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '759/763',
          }}
        />
        <div className="floating-guide-pill">
          <Download size={11} strokeWidth={2.6} className="guide-pill-icon" />
          <span>Guide</span>
        </div>
      </div>
    </aside>
  );
}
