import React, { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  Scale, 
  HelpCircle, 
  Search,
  Filter,
  CheckCircle2,
  Users
} from 'lucide-react';
import { OFFICIAL_LEGAL_AID_ORGS } from '../data/sampleData';

export const LegalAidDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = [
    'All',
    'Statutory Authority (NALSA/SLSA)',
    'Ministry of Law & Justice Portal',
    'Court Committee',
    'Consumer Redressal'
  ];

  const filteredOrgs = OFFICIAL_LEGAL_AID_ORGS.filter(org => {
    const matchesSearch = 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.eligibilityCriteria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.servicesOffered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'All' || org.type === selectedType;

    return matchesSearch && matchesType;
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
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--gold-400)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
          <Building2 size={18} />
          <span>STATUTORY LEGAL AID & PRO BONO ADVOCATE CHANNELS</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          Official Indian Legal Aid & Services Directory
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#CBD5E1', maxWidth: '850px', lineHeight: '1.55' }}>
          In strict compliance with Bar Council of India guidelines, LegalNav does not host commercial advertisements 
          or fictitious lawyer profiles. Below are verified, statutory government bodies that provide free or pro bono 
          legal aid under the <em>Legal Services Authorities Act, 1987</em>.
        </p>
      </div>

      {/* Statutory Section 12 Eligibility Explainer Card */}
      <div 
        style={{
          background: 'var(--gold-50)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale size={20} style={{ color: 'var(--gold-600)' }} />
          Who Qualifies for 100% Free Legal Aid in India? (Section 12 of LSA Act, 1987)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--navy-950)', marginBottom: '0.75rem' }}>
          Under Section 12 of the <em>Legal Services Authorities Act, 1987</em>, free legal aid (including advocate fees, court fees, paper books, and representation) is guaranteed to:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Women and Children
          </div>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Members of Scheduled Castes (SC) & Scheduled Tribes (ST)
          </div>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Industrial Workmen & Laborers
          </div>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Persons in Custody / Undertrials
          </div>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Persons with Disabilities (PwD)
          </div>
          <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            ✓ Low-Income Citizens (Below State Ceiling)
          </div>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search legal aid organizations, services, or eligibility criteria..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={13} /> Filter Authority:
            </span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  border: selectedType === t ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)',
                  background: selectedType === t ? 'var(--navy-900)' : '#FFFFFF',
                  color: selectedType === t ? 'var(--gold-400)' : 'var(--text-secondary)'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredOrgs.map((org) => (
          <div 
            key={org.id}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span 
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background: 'var(--navy-50)',
                    color: 'var(--navy-900)',
                    fontWeight: 700
                  }}
                >
                  {org.type}
                </span>

                <span 
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--success)',
                    background: 'var(--success-bg)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <ShieldCheck size={12} /> Statutory Resource
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                {org.name}
              </h3>

              <div 
                style={{
                  background: 'var(--gold-50)',
                  border: '1px solid var(--gold-100)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--navy-900)',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <PhoneCall size={14} style={{ color: 'var(--gold-600)' }} />
                {org.helpline}
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                <strong>Jurisdiction:</strong> {org.jurisdiction}
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
                  Statutory Eligibility:
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {org.eligibilityCriteria}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Available Services:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {org.servicesOffered.map((svc, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--success)' }} />
                      {svc}
                    </div>
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
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Official Government Portal
              </span>
              <a 
                href={org.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                Access Official Portal <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
