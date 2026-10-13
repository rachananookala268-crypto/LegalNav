import React from 'react';
import { 
  Scale, 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  FolderCheck, 
  CalendarClock, 
  Building2, 
  Info
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile
}) => {
  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
    { id: 'analyzer', label: 'Document Analyzer', icon: <FileText size={19} /> },
    { id: 'library', label: 'Indian Legal Library', icon: <BookOpen size={19} /> },
    { id: 'evidence', label: 'Evidence Organizer', icon: <FolderCheck size={19} /> },
    { id: 'timeline', label: 'Case Timeline Tracker', icon: <CalendarClock size={19} /> },
    { id: 'directory', label: 'Legal Aid Directory', icon: <Building2 size={19} /> },
    { id: 'about', label: 'About & Disclaimer', icon: <Info size={19} /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-badge">
          <div className="brand-icon-wrap">
            <Scale size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div className="brand-title">Legal<span>Nav</span></div>
            <div className="brand-subtitle">Indian Legal Navigation</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span 
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: 'rgba(212, 175, 55, 0.25)',
                    color: '#E2C258',
                    fontWeight: 700
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'center', fontWeight: 500 }}>
          LegalNav Platform • v2.4
        </div>
      </div>
    </aside>
  );
};
