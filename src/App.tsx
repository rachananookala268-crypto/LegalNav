import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { DocumentAnalyzer } from './pages/DocumentAnalyzer';
import { LegalLibrary } from './pages/LegalLibrary';
import { EvidenceOrganizer } from './pages/EvidenceOrganizer';
import { TimelineTracker } from './pages/TimelineTracker';
import { LegalAidDirectory } from './pages/LegalAidDirectory';
import { AboutPage } from './pages/AboutPage';
import { SAMPLE_DOCUMENTS, OFFICIAL_INDIAN_LEGAL_RESOURCES, INITIAL_EVIDENCE_ITEMS, INITIAL_TIMELINE_EVENTS } from './data/sampleData';
import { ExternalLink } from 'lucide-react';
import './App.css';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [evidenceCount, setEvidenceCount] = useState<number>(INITIAL_EVIDENCE_ITEMS.length);
  const [timelineCount, setTimelineCount] = useState<number>(INITIAL_TIMELINE_EVENTS.length);

  // Read saved counts from localStorage on load / tab changes
  useEffect(() => {
    try {
      const savedEv = localStorage.getItem('legalnav_evidence_items');
      if (savedEv) {
        setEvidenceCount(JSON.parse(savedEv).length);
      }
      const savedTl = localStorage.getItem('legalnav_timeline_events');
      if (savedTl) {
        setTimelineCount(JSON.parse(savedTl).length);
      }
    } catch {
      // fallback to initial
    }
  }, [currentTab]);

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={setCurrentTab}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="main-wrapper">
        {/* Top Navbar */}
        <Navbar 
          currentTab={currentTab} 
          onToggleMobile={() => setMobileOpen(!mobileOpen)} 
        />

        {/* Dynamic Page Views */}
        <main style={{ flex: 1 }}>
          {currentTab === 'dashboard' && (
            <Dashboard 
              onNavigate={setCurrentTab}
              documentCount={SAMPLE_DOCUMENTS.length}
              evidenceCount={evidenceCount}
              timelineCount={timelineCount}
              resourceCount={OFFICIAL_INDIAN_LEGAL_RESOURCES.length}
            />
          )}

          {currentTab === 'analyzer' && <DocumentAnalyzer />}

          {currentTab === 'library' && <LegalLibrary />}

          {currentTab === 'evidence' && <EvidenceOrganizer />}

          {currentTab === 'timeline' && <TimelineTracker />}

          {currentTab === 'directory' && <LegalAidDirectory />}

          {currentTab === 'about' && <AboutPage />}
        </main>

        {/* Clean Professional SaaS Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-links">
              <div>
                © 2026 <strong>LegalNav India</strong> • Privacy-First Legal Tech Navigation & Case Readiness.
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  onClick={() => setCurrentTab('about')}
                  style={{ color: 'var(--navy-700)', textDecoration: 'underline', fontSize: '0.82rem', fontWeight: 600 }}
                >
                  Legal Disclaimer & Terms
                </button>
                <a href="https://www.indiacode.nic.in/" target="_blank" rel="noopener noreferrer">
                  India Code <ExternalLink size={10} style={{ display: 'inline' }} />
                </a>
                <a href="https://ecourts.gov.in/" target="_blank" rel="noopener noreferrer">
                  eCourts <ExternalLink size={10} style={{ display: 'inline' }} />
                </a>
                <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer">
                  NALSA <ExternalLink size={10} style={{ display: 'inline' }} />
                </a>
                <a href="https://www.sci.gov.in/" target="_blank" rel="noopener noreferrer">
                  Supreme Court <ExternalLink size={10} style={{ display: 'inline' }} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
