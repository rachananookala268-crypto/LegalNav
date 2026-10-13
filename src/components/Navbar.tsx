import React from 'react';
import { Menu, Cpu, ShieldCheck } from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onToggleMobile: () => void;
}

const TAB_TITLES: Record<NavTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Platform Dashboard',
    subtitle: 'Indian Legal Navigation & Case Readiness Hub'
  },
  analyzer: {
    title: 'Legal Document Analyzer',
    subtitle: 'Client-Side Heuristic Clause Extraction & Plain-Language Breakdown'
  },
  library: {
    title: 'Indian Legal Information Library',
    subtitle: 'Verified Statutes, Court Portals, and Government Repositories'
  },
  evidence: {
    title: 'Evidence Organizer',
    subtitle: 'Chain-of-Custody Logging & Digital Evidence Preparation (Local Storage)'
  },
  timeline: {
    title: 'Legal Case Timeline Tracker',
    subtitle: 'Milestone Tracking & Procedural Deadline Awareness'
  },
  directory: {
    title: 'Official Legal Aid & Services Directory',
    subtitle: 'Verified Statutory Authorities, SLSAs, DLSAs, and Pro Bono Initiatives'
  },
  about: {
    title: 'About LegalNav & Terms',
    subtitle: 'Platform Mission, Architecture, and Statutory Legal Disclaimers'
  }
};

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onToggleMobile }) => {
  const current = TAB_TITLES[currentTab] || { title: 'LegalNav', subtitle: '' };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button 
          className="mobile-toggle"
          onClick={onToggleMobile}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="current-view-title">{current.title}</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{current.subtitle}</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="badge-simulated-indicator" title="All processing occurs strictly inside your web browser. No external API calls are made.">
          <Cpu size={13} />
          <span>Client-Side Local Processing</span>
        </div>

        <div className="badge-disclaimer-pill" title="Verified Indian Statutory Sources">
          <ShieldCheck size={13} style={{ color: 'var(--gold-600)' }} />
          <span>Verified Sources</span>
        </div>
      </div>
    </header>
  );
};
