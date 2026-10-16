import React from 'react';

export default function Offices() {
  return (
    <section className="section-light section-light-soft" id="offices">
      <div className="container">
        
        <div className="section-header text-center">
          <h2 className="section-title">Sydney Headquarters & Dubai Gateway</h2>
          <p className="section-subtitle">
            Bridging institutional Australasian deal flow with Middle Eastern sovereign & family office capital.
          </p>
        </div>

        <div className="offices-grid-light">
          
          <div className="office-box-light">
            <span className="bento-badge-tag">AUSTRALIAN HEADQUARTERS</span>
            <h3>Sydney, Australia</h3>
            <p>
              <strong>Vitti Capital Pty Ltd</strong><br />
              Level 49, 8 Parramatta Square<br />
              10 Darcy Street, Parramatta NSW 2150
            </p>
            <div className="office-meta-line">
              <strong>Phone:</strong> (02) 8528 4508
            </div>
            <div className="office-meta-line">
              <strong>Inquiries:</strong> info@vitti.capital
            </div>
            <div className="office-meta-line">
              <strong>Regulatory:</strong> CAR #001306367 | AFSL #518031
            </div>
          </div>

          <div className="office-box-light">
            <span className="bento-badge-tag">MIDDLE EAST & GCC</span>
            <h3>Dubai, United Arab Emirates</h3>
            <p>
              <strong>Vitti Wealth Financing Broker L.L.C</strong><br />
              (فيتي ويلث وسيط تمويل ذ.م.م)<br />
              Dubai, United Arab Emirates
            </p>
            <div className="office-meta-line">
              <strong>Direct Phone:</strong> +971 56 595 0088
            </div>
            <div className="office-meta-line">
              <strong>Commercial License:</strong> 1537728 | Reg #2670952
            </div>
            <div className="office-meta-line">
              <strong>Chamber of Commerce:</strong> Membership #632588
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
