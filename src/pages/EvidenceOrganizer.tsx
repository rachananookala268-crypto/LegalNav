import React, { useState, useEffect } from 'react';
import { 
  FolderCheck, 
  PlusCircle, 
  Trash2, 
  Download, 
  Tag, 
  Calendar, 
  Search, 
  ShieldCheck, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { EvidenceItem } from '../types';
import { INITIAL_EVIDENCE_ITEMS } from '../data/sampleData';

const STORAGE_KEY = 'legalnav_evidence_items';

export const EvidenceOrganizer: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EVIDENCE_ITEMS;
      }
    }
    return INITIAL_EVIDENCE_ITEMS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Evidence Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EvidenceItem['category']>('Contract & Agreement');
  const [dateRecorded, setDateRecorded] = useState(() => new Date().toISOString().split('T')[0]);
  const [source, setSource] = useState('');
  const [relevanceDescription, setRelevanceDescription] = useState('');
  const [custodyStatus, setCustodyStatus] = useState<EvidenceItem['custodyStatus']>('Securely Stored Locally');
  const [tag, setTag] = useState('');
  const [notes, setNotes] = useState('');

  // Persist to localStorage whenever evidenceList changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evidenceList));
  }, [evidenceList]);

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !relevanceDescription.trim()) return;

    const newItem: EvidenceItem = {
      id: `ev-${Date.now()}`,
      title: title.trim(),
      category,
      dateRecorded,
      source: source.trim() || 'Uploaded / Recorded by User',
      relevanceDescription: relevanceDescription.trim(),
      custodyStatus,
      tag: tag.trim() || 'General Evidence',
      notes: notes.trim(),
      timestamp: Date.now()
    };

    setEvidenceList([newItem, ...evidenceList]);
    setIsAdding(false);
    
    // Reset Form
    setTitle('');
    setSource('');
    setRelevanceDescription('');
    setTag('');
    setNotes('');

    setNotification('New evidence item securely logged to local storage!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteItem = (id: string) => {
    setEvidenceList(evidenceList.filter(item => item.id !== id));
    setNotification('Evidence item removed from log.');
    setTimeout(() => setNotification(null), 2500);
  };

  const handleResetToDefault = () => {
    setEvidenceList(INITIAL_EVIDENCE_ITEMS);
    setNotification('Reset evidence list to default hackathon demonstration samples.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportSummary = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(evidenceList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `LegalNav_Evidence_Index_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const categories = [
    'All',
    'FIR & Police Report',
    'Financial & Banking',
    'Digital Communication',
    'Photographic / Video',
    'Contract & Agreement',
    'Witness Statement'
  ];

  const filteredEvidence = evidenceList.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.relevanceDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      {/* Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
            <FolderCheck size={18} />
            <span>DISPUTE READINESS & EVIDENCE CUSTODY</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Indian Legal Evidence Organizer
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#CBD5E1', maxWidth: '800px' }}>
            Maintain a structured chain of custody for disputes before courts, consumer commissions, or arbitral tribunals. 
            All evidence metadata is stored strictly in your browser's private local storage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-gold btn-sm"
            onClick={() => setIsAdding(!isAdding)}
          >
            <PlusCircle size={16} />
            {isAdding ? 'Close Form' : 'Add New Evidence'}
          </button>
          <button 
            className="btn btn-outline btn-sm"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}
            onClick={handleExportSummary}
          >
            <Download size={15} />
            Export Evidence JSON
          </button>
        </div>
      </div>

      {notification && (
        <div 
          style={{
            background: 'var(--success-bg)',
            color: 'var(--success)',
            border: '1px solid #A7F3D0',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={16} />
          {notification}
        </div>
      )}

      {/* Add Evidence Modal Form */}
      {isAdding && (
        <div className="card" style={{ marginBottom: '2rem', border: '2px solid var(--gold-500)' }}>
          <div className="card-header">
            <h3 className="card-title">
              <PlusCircle size={18} style={{ color: 'var(--gold-600)' }} />
              Log New Evidence Item (Chain of Custody)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stored in localStorage</span>
          </div>
          <form onSubmit={handleAddEvidence} className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Evidence Title *
                </label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bank Statement showing token transfer"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Evidence Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EvidenceItem['category'])}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  <option value="FIR & Police Report">FIR & Police Report</option>
                  <option value="Financial & Banking">Financial & Banking</option>
                  <option value="Digital Communication">Digital Communication (WhatsApp / Email)</option>
                  <option value="Photographic / Video">Photographic / Video</option>
                  <option value="Contract & Agreement">Contract & Agreement</option>
                  <option value="Witness Statement">Witness Statement</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Date of Occurrence / Capture
                </label>
                <input 
                  type="date"
                  value={dateRecorded}
                  onChange={(e) => setDateRecorded(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Source / Originating Device
                </label>
                <input 
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Exported from HDFC NetBanking"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Custody Status
                </label>
                <select
                  value={custodyStatus}
                  onChange={(e) => setCustodyStatus(e.target.value as EvidenceItem['custodyStatus'])}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  <option value="Securely Stored Locally">Securely Stored Locally</option>
                  <option value="Verified Copy">Verified Copy</option>
                  <option value="Original Physical with Client">Original Physical with Client</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Evidence Tag / Label
                </label>
                <input 
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Payment Proof or Sec 65B Electronic Record"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                Legal Relevance Description *
              </label>
              <textarea 
                required
                rows={2}
                value={relevanceDescription}
                onChange={(e) => setRelevanceDescription(e.target.value)}
                placeholder="Explain why this piece of evidence is crucial to substantiate your complaint, notice, or defense..."
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                Optional Technical Notes (e.g., Certificate requirements under Section 63 BSA / 65B IEA)
              </label>
              <input 
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Section 65B Indian Evidence Act affidavit drafted."
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Save Evidence Item
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search evidence items by title, relevance, tag, or source..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: selectedCategory === cat ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)',
                    background: selectedCategory === cat ? 'var(--navy-900)' : '#FFFFFF',
                    color: selectedCategory === cat ? 'var(--gold-400)' : 'var(--text-secondary)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button 
              onClick={handleResetToDefault}
              className="btn btn-outline btn-sm"
              title="Reset to default sample evidence"
            >
              <RefreshCw size={13} />
              Reset Demo Samples
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredEvidence.map((item) => (
          <div 
            key={item.id}
            className="card"
            style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span 
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '4px',
                      background: 'var(--navy-50)',
                      color: 'var(--navy-900)',
                      border: '1px solid var(--navy-100)'
                    }}
                  >
                    {item.category}
                  </span>

                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--gold-600)',
                      background: 'var(--gold-50)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '4px',
                      border: '1px solid var(--gold-100)'
                    }}
                  >
                    <Tag size={11} /> {item.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                  {item.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span 
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--success)',
                    background: 'var(--success-bg)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <ShieldCheck size={13} /> {item.custodyStatus}
                </span>

                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ color: 'var(--danger)', padding: '0.35rem', borderRadius: '4px' }}
                  title="Remove this item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <strong>Relevance in Dispute:</strong> {item.relevanceDescription}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div>
                <strong>Source:</strong> {item.source}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={13} /> Date Recorded: {item.dateRecorded}
              </div>
              {item.notes && (
                <div style={{ color: 'var(--navy-800)', fontWeight: 500 }}>
                  <strong>Notes:</strong> {item.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvidence.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
          <FolderCheck size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy-900)' }}>No evidence items match your filters</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Click "Add New Evidence" to log an item or reset to default samples.
          </p>
        </div>
      )}
    </div>
  );
};
