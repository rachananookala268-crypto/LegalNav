import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Landmark, 
  Scale, 
  HelpCircle,
  FileCheck2,
  Filter
} from 'lucide-react';
import { OFFICIAL_INDIAN_LEGAL_RESOURCES } from '../data/sampleData';
import { LegalResource } from '../types';

export const LegalLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Statutes & Central Acts',
    'Courts & e-Services',
    'Free Legal Aid & Rights',
    'Consumer Protection'
  ];

  const filteredResources = OFFICIAL_INDIAN_LEGAL_RESOURCES.filter((res) => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.keyActsOrTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      {/* Informative Header Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
          <Landmark size={18} />
          <span>OFFICIAL GOVERNMENT OF INDIA LEGAL REPOSITORIES</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Verified Indian Legal Information Library
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#CBD5E1', maxWidth: '850px', lineHeight: '1.55' }}>
          LegalNav links directly to authoritative Government of India portals and statutory authorities. 
          To protect users from hallucinated legal data, we never synthesize fictional laws or invented citations.
          Access official statutes, case status trackers, and grievance redressal machinery below.
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by act name (e.g., 'Indian Contract Act', 'BNS', 'eCourts', 'Consumer Protection', 'NALSA')..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={13} /> Filter Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: selectedCategory === cat ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)',
                  background: selectedCategory === cat ? 'var(--navy-900)' : '#FFFFFF',
                  color: selectedCategory === cat ? 'var(--gold-400)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Official Resources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((resource) => (
          <div 
            key={resource.id} 
            className="card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <span 
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    background: 'var(--navy-50)',
                    color: 'var(--navy-900)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {resource.category}
                </span>

                {resource.isGovPortal && (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.7rem',
                      color: 'var(--success)',
                      fontWeight: 600,
                      background: 'var(--success-bg)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      border: '1px solid #A7F3D0'
                    }}
                  >
                    <ShieldCheck size={12} /> Verified Official
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                {resource.title}
              </h3>

              <div style={{ fontSize: '0.75rem', color: 'var(--gold-600)', fontWeight: 600, marginBottom: '0.65rem' }}>
                {resource.authority}
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1rem' }}>
                {resource.description}
              </p>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Coverage & Key Topics:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {resource.keyActsOrTopics.map((topic, i) => (
                    <span 
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'var(--slate-100)',
                        color: 'var(--navy-800)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div 
              style={{
                padding: '0.85rem 1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--slate-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Direct Government Link
              </span>
              <a 
                href={resource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                Open Official Portal <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
          <BookOpen size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy-900)' }}>No resources found for "{searchTerm}"</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Try searching for "India Code", "NALSA", "eCourts", or "Consumer".
          </p>
        </div>
      )}
    </div>
  );
};
