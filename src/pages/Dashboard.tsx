import React from 'react';
import { 
  FileText, 
  BookOpen, 
  FolderCheck, 
  CalendarClock, 
  Building2, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall,
  Sparkles,
  Compass
} from 'lucide-react';
import { NavTab } from '../types';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
  documentCount: number;
  evidenceCount: number;
  timelineCount: number;
  resourceCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  documentCount,
  evidenceCount,
  timelineCount,
  resourceCount
}) => {
  const featureCards = [
    {
      tab: 'analyzer' as NavTab,
      title: 'Legal Document Analyzer',
      description: 'Upload PDF or TXT agreements (leases, NDAs, service contracts) for client-side plain-language clause translation and risk flagging.',
      icon: <FileText size={22} />,
      badge: 'Interactive Demo',
      color: 'navy'
    },
    {
      tab: 'library' as NavTab,
      title: 'Indian Legal Information Library',
      description: 'Browse verified, official Government of India resources including India Code, eCourts Services, NALSA, and Supreme Court rulings.',
      icon: <BookOpen size={22} />,
      badge: 'Official Sources Only',
      color: 'gold'
    },
    {
      tab: 'evidence' as NavTab,
      title: 'Evidence Organizer',
      description: 'Catalog receipts, contracts, communications, and photos. Tag chain-of-custody metadata and export summaries directly from local storage.',
      icon: <FolderCheck size={22} />,
      badge: 'Local Storage Ready',
      color: 'navy'
    },
    {
      tab: 'timeline' as NavTab,
      title: 'Case Timeline Tracker',
      description: 'Map dispute milestones from pre-litigation notices and mediation to court filings. Track statutory deadlines under Indian procedure.',
      icon: <CalendarClock size={22} />,
      badge: 'Milestones & Deadlines',
      color: 'gold'
    },
    {
      tab: 'directory' as NavTab,
      title: 'Lawyer & Legal-Aid Directory',
      description: 'Verified directory of statutory legal aid authorities (NALSA, SLSAs, DLSAs), Tele-Law centers, and DoJ Nyaya Bandhu pro bono network.',
      icon: <Building2 size={22} />,
      badge: 'Verified Helplines',
      color: 'navy'
    },
    {
      tab: 'about' as NavTab,
      title: 'About LegalNav & Terms',
      description: 'Explore our platform mission, privacy-preserving client-side architecture, and full statutory legal disclaimers.',
      icon: <Info size={22} />,
      badge: 'Disclaimers & Ethics',
      color: 'gold'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-subtitle-badge">
          <Sparkles size={13} />
          <span>AI-Powered Indian Legal Tech Platform</span>
        </div>
        <h1 className="hero-heading">
          Demystifying the Indian Legal Journey with <span>LegalNav</span>
        </h1>
        <p className="hero-desc">
          A modern, privacy-first legal navigation platform designed for Indian citizens, students, and small enterprises. 
          Analyze legal contracts in plain language, organize evidence for disputes, track case milestones, and access 
          official statutory resources—all running securely in your browser.
        </p>

        <div className="hero-actions">
          <button 
            className="btn btn-gold"
            onClick={() => onNavigate('analyzer')}
          >
            <FileText size={17} />
            Try Document Analyzer
          </button>
          <button 
            className="btn btn-outline"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
            onClick={() => onNavigate('library')}
          >
            <BookOpen size={17} />
            Explore Indian Law Library
          </button>
          <button 
            className="btn btn-outline"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
            onClick={() => onNavigate('timeline')}
          >
            <CalendarClock size={17} />
            View Case Tracker
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-grid">
        <div className="metric-card" onClick={() => onNavigate('analyzer')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon-wrap metric-icon-navy">
            <FileText size={24} />
          </div>
          <div>
            <div className="metric-value">{documentCount}</div>
            <div className="metric-label">Demo Legal Documents Ready</div>
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigate('timeline')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon-wrap metric-icon-gold">
            <CalendarClock size={24} />
          </div>
          <div>
            <div className="metric-value">{timelineCount}</div>
            <div className="metric-label">Active Dispute Milestones</div>
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigate('evidence')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon-wrap metric-icon-emerald">
            <FolderCheck size={24} />
          </div>
          <div>
            <div className="metric-value">{evidenceCount}</div>
            <div className="metric-label">Preserved Evidence Items</div>
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigate('library')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon-wrap metric-icon-blue">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="metric-value">{resourceCount}</div>
            <div className="metric-label">Verified Official Portals</div>
          </div>
        </div>
      </section>

      {/* Primary Feature Cards Grid */}
      <section>
        <h2 className="section-title">
          <Compass size={22} style={{ color: 'var(--gold-600)' }} />
          Platform Modules & Navigation
        </h2>
        
        <div className="feature-grid">
          {featureCards.map((card) => (
            <div 
              key={card.tab}
              className="feature-card"
              onClick={() => onNavigate(card.tab)}
            >
              <div>
                <div className="feature-icon-wrap">
                  {card.icon}
                </div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-desc">{card.description}</p>
              </div>

              <div className="feature-badge-row">
                <span className="feature-badge">
                  <ShieldCheck size={14} />
                  {card.badge}
                </span>
                <span className="feature-arrow">
                  Open Module <ArrowRight size={15} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Government Helplines & Emergency Assistance Strip */}
      <section style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        <div 
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PhoneCall size={18} style={{ color: 'var(--gold-600)' }} />
                Official Indian Citizen Helplines & Immediate Legal Support
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Verified government telephone helplines providing free legal aid, consumer redressal, and emergency assistance.
              </p>
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('directory')}
            >
              View Full Directory <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-800)', textTransform: 'uppercase' }}>NALSA Free Legal Aid</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '0.25rem 0' }}>15100</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Toll-Free National Helpline under Legal Services Authorities Act, 1987.</div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-800)', textTransform: 'uppercase' }}>National Consumer Helpline</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '0.25rem 0' }}>1915</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Department of Consumer Affairs for unfair trade practices & warranty issues.</div>
            </div>

            <div style={{ padding: '1rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-800)', textTransform: 'uppercase' }}>National Cyber Crime Helpline</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '0.25rem 0' }}>1930</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Immediate reporting of financial cyber fraud, online phishing & identity theft.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
