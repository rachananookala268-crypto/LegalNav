import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X, ShieldAlert, ExternalLink } from 'lucide-react';

interface DisclaimerBannerProps {
  onOpenDirectory?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onOpenDirectory }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div 
        style={{
          background: '#0B192C',
          color: '#E2C258',
          padding: '0.35rem 1.75rem',
          fontSize: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={14} />
          <span><strong>Educational Hackathon Prototype:</strong> Not legal advice or an advocate solicitation service under the Advocates Act, 1961.</span>
        </div>
        <button 
          onClick={() => setIsDismissed(false)}
          style={{ color: '#FFFFFF', textDecoration: 'underline', fontSize: '0.72rem' }}
        >
          View Full Disclaimer
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Legal Disclaimer" className="disclaimer-banner">
      <div className="disclaimer-content">
        <AlertTriangle size={18} style={{ color: '#E2C258', flexShrink: 0 }} />
        <div>
          <span>
            <strong>IMPORTANT LEGAL NOTICE & DISCLAIMER:</strong> LegalNav is an educational prototype built for a college hackathon (October 2026). 
            It does <strong>not</strong> provide legal advice, representation, or attorney solicitation under the <em>Advocates Act, 1961</em>. 
            All document insights are simulated client-side heuristic demos. For actual legal issues, consult a licensed advocate or contact NALSA.
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <a 
          href="https://nalsa.gov.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid #D4AF37',
            color: '#E2C258',
            padding: '0.25rem 0.65rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          <PhoneCall size={12} />
          NALSA Free Helpline: 15100
          <ExternalLink size={11} />
        </a>
        <button 
          onClick={() => setIsDismissed(true)} 
          style={{ color: '#94A3B8', padding: '0.2rem' }}
          title="Minimize Disclaimer"
          aria-label="Minimize Disclaimer"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
};
