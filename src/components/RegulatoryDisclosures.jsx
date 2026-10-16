import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function RegulatoryDisclosures() {
  return (
    <section className="regulatory-disclosures-section" id="disclosures">
      <div className="container">
        <div className="footer-regulatory-card">
          <div className="regulatory-card-header">
            <ShieldCheck size={18} className="regulatory-icon" />
            <span className="regulatory-title">Statutory Regulatory Disclosures & Wholesale Notice</span>
          </div>

          <div className="regulatory-body-text">
            <p>
              <strong>Corporate Authorisation:</strong> Vitti Capital Pty Ltd (ABN 13 670 030 145) is a Corporate Authorised Representative (001306367) of Point Capital Group Pty Ltd (ABN 41 625 931 900), the holder of Australian Financial Services Licence (AFSL) number 518031.
            </p>
            <p>
              <strong>Wholesale Client Restriction:</strong> The information contained in this website is only intended for the use of those persons who satisfy the Wholesale definition, pursuant to Section 761G and Section 761GA of the <em>Corporations Act 2001 (Cth)</em> (“the Act”). Persons accessing this information should consider whether they are wholesale clients in accordance with the Act before relying on any information contained herein.
            </p>
            <p>
              <strong>General Advice Warning:</strong> Any advice contained in this communication is general only and does not consider your objectives, financial situation or needs, and you should consider whether it’s appropriate for you. This might mean that you seek personal advice from a representative authorised to provide personal advice. If you are thinking about acquiring a financial product, you should consider the relevant Product Disclosure Statement or Prospectus (if there is one available) first.
            </p>
            <p>
              <strong>Performance & Risk Disclaimer:</strong> Past returns do not always indicate future returns, and there is always a risk of loss when trading and investing. Our Privacy Statement is available at <a href="https://vitti.capital" target="_blank" rel="noopener noreferrer" className="regulatory-link">www.vitti.capital</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
