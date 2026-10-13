import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  PhoneCall, 
  ExternalLink,
  Lock,
  Code2,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      {/* Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.25rem',
          marginBottom: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
          <ShieldCheck size={18} />
          <span>LEGALNAV PLATFORM GOVERNANCE & ETHICS</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          About LegalNav & Statutory Legal Disclaimer
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#CBD5E1', maxWidth: '850px', lineHeight: '1.6' }}>
          A modern, privacy-first legal navigation platform engineered to simplify procedural justice, contract literacy, 
          and dispute preparation for everyday Indian citizens, students, and grassroots enterprises.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Comprehensive Legal Disclaimer & Terms of Use Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FFFDF7 0%, #FEF9E7 100%)',
            border: '2px solid rgba(212, 175, 55, 0.5)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
            <AlertTriangle size={32} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.75rem' }}>
                Complete Statutory Legal Disclaimer & Notice
              </h3>
              
              <div style={{ fontSize: '0.9rem', color: 'var(--navy-950)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <strong>1. Educational Prototype & Not Legal Advice:</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    LegalNav is developed strictly as an educational technology prototype. Nothing contained within this application—including 
                    the automated document analysis, plain-language translations, risk flags, timeline milestones, or source summaries—constitutes 
                    formal legal advice, legal opinion, representation, or solicitation under the <em>Advocates Act, 1961</em>.
                  </p>
                </div>

                <div>
                  <strong>2. No Advocate-Client Relationship:</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    Your access to, browsing of, or transmission of information to LegalNav does not create, and is not intended to create, 
                    an advocate-client (attorney-client) relationship between you and LegalNav or its contributors. Any communication through 
                    the platform is not protected by statutory advocate-client confidentiality.
                  </p>
                </div>

                <div>
                  <strong>3. Explicit Recommendation to Consult a Qualified Advocate:</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    Legal matters are inherently fact-specific and vary across state jurisdictions, local tenancy acts, and court circulars. 
                    <strong> You must not act or refrain from acting based solely upon information obtained from LegalNav.</strong> For any actual 
                    legal dispute, court filing, statutory notice, or agreement signing, you should always consult a licensed advocate enrolled 
                    with the State Bar Council or seek assistance from an authorized legal aid society.
                  </p>
                </div>

                <div>
                  <strong>4. Compliance with Bar Council of India Rules (Rule 36):</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    Pursuant to Rule 36 of Chapter II, Part VI of the <em>Bar Council of India Rules</em> under the <em>Advocates Act, 1961</em>, 
                    an advocate in India is prohibited from soliciting work or advertising, either directly or indirectly. LegalNav does not host commercial 
                    advertisements, attorney rankings, or sponsored referral networks. Directory listings are strictly limited to statutory government 
                    authorities (NALSA, SLSAs, DLSAs) and public legal empowerment portals.
                  </p>
                </div>

                <div>
                  <strong>5. Simulated Heuristic Limitations:</strong>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    The document analyzer functions purely via deterministic, client-side heuristic pattern detection and regular expressions. 
                    It is a working demonstration and does not possess judicial reasoning, nuanced contextual understanding, or case law awareness.
                  </p>
                </div>
              </div>

              {/* NALSA Helpline Card Inside About & Disclaimer */}
              <div 
                style={{
                  marginTop: '1.5rem',
                  padding: '1.25rem',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.95rem' }}>
                    <PhoneCall size={16} style={{ color: 'var(--gold-600)' }} />
                    Need Free Official Legal Assistance?
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Eligible citizens under Section 12 of the Legal Services Authorities Act, 1987 can access free advocates.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>National Helpline</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>15100</div>
                  </div>
                  <a
                    href="https://nalsa.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold btn-sm"
                  >
                    Visit NALSA Portal <ExternalLink size={12} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mission & Purpose */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Scale size={20} style={{ color: 'var(--navy-900)' }} />
              Platform Mission: Democratizing Legal Literacy in India
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-600)', fontWeight: 600 }}>Educational Platform</span>
          </div>
          <div className="card-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            <p style={{ marginBottom: '1rem' }}>
              For millions of citizens entering rental agreements, freelance arrangements, or consumer transactions, 
              complex legal phraseology creates an asymmetric barrier. Traditional legal advice can be intimidating 
              and cost-prohibitive for preliminary inquiries, while online searches frequently turn up outdated or US-centric legal blogs.
            </p>
            <p>
              <strong>LegalNav</strong> was engineered to bridge this informational divide. 
              By combining client-side contract deconstruction, structured evidence organization, and direct integration with 
              official Indian e-governance systems (India Code, eCourts, NALSA), LegalNav empowers individuals to understand 
              their rights before a formal dispute escalates.
            </p>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Cpu size={20} style={{ color: 'var(--navy-800)' }} />
              Architecture & Privacy-First Engineering
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Zero Paid APIs</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.25rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.4rem' }}>
                  <Lock size={17} style={{ color: 'var(--navy-800)' }} />
                  100% Local Browser Execution
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Uploaded documents and evidence entries never leave your browser. FileReader APIs and local storage handle all processing without backend exposure.
                </p>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.4rem' }}>
                  <Code2 size={17} style={{ color: 'var(--navy-800)' }} />
                  Modern Open-Source Stack
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Engineered with React 19, TypeScript, and Vite 8 for sub-second load times and rock-solid static type safety.
                </p>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={17} style={{ color: 'var(--navy-800)' }} />
                  Zero Paid APIs Required
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Self-contained and entirely cost-free to run, deploy, and evaluate. Uses verified public Government of India endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
