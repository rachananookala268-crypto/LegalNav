import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Scale
} from 'lucide-react';
import { TimelineEvent } from '../types';
import { INITIAL_TIMELINE_EVENTS } from '../data/sampleData';

const STORAGE_KEY = 'legalnav_timeline_events';

export const TimelineTracker: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TIMELINE_EVENTS;
      }
    }
    return INITIAL_TIMELINE_EVENTS;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Form State (used for both Add and Edit)
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [stage, setStage] = useState<TimelineEvent['stage']>('Notice Sent');
  const [status, setStatus] = useState<TimelineEvent['status']>('upcoming');
  const [description, setDescription] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [statuteReference, setStatuteReference] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const openAddForm = () => {
    setEditingId(null);
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setStage('Notice Sent');
    setStatus('upcoming');
    setDescription('');
    setActionRequired('');
    setStatuteReference('');
    setIsAdding(true);
  };

  const openEditForm = (ev: TimelineEvent) => {
    setEditingId(ev.id);
    setTitle(ev.title);
    setDate(ev.date);
    setStage(ev.stage);
    setStatus(ev.status);
    setDescription(ev.description);
    setActionRequired(ev.actionRequired || '');
    setStatuteReference(ev.statuteReference || '');
    setIsAdding(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingId) {
      // Update existing
      setEvents(events.map(ev => {
        if (ev.id === editingId) {
          return {
            ...ev,
            title: title.trim(),
            date,
            stage,
            status,
            description: description.trim(),
            actionRequired: actionRequired.trim() || undefined,
            statuteReference: statuteReference.trim() || undefined
          };
        }
        return ev;
      }));
      setNotification('Timeline milestone updated!');
    } else {
      // Add new
      const newEv: TimelineEvent = {
        id: `tl-${Date.now()}`,
        title: title.trim(),
        date,
        stage,
        status,
        description: description.trim(),
        actionRequired: actionRequired.trim() || undefined,
        statuteReference: statuteReference.trim() || undefined
      };
      setEvents([...events, newEv]);
      setNotification('New timeline milestone added!');
    }

    setIsAdding(false);
    setEditingId(null);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
    setNotification('Milestone removed from timeline.');
    setTimeout(() => setNotification(null), 2500);
  };

  const handleResetToDefault = () => {
    setEvents(INITIAL_TIMELINE_EVENTS);
    setNotification('Reset timeline to default Indian consumer dispute procedure.');
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredEvents = events.filter(ev => {
    if (statusFilter === 'All') return true;
    return ev.status === statusFilter;
  });

  const getStatusBadge = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return <span className="badge-status completed"><CheckCircle2 size={12} /> Milestone Completed</span>;
      case 'in_progress':
        return <span className="badge-status in_progress"><Clock size={12} /> In Progress / Pending</span>;
      case 'upcoming':
        return <span className="badge-status upcoming"><Clock size={12} /> Scheduled Upcoming</span>;
      case 'critical':
        return <span className="badge-status critical"><AlertTriangle size={12} /> Critical Statutory Deadline</span>;
    }
  };

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
            <CalendarClock size={18} />
            <span>INDIAN PROCEDURAL DISPUTE TIMELINE</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Case Timeline & Milestone Tracker
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#CBD5E1', maxWidth: '800px' }}>
            Track chronological stages from pre-litigation statutory notices and Lok Adalat mediation to court institution 
            and evidence examination. Never miss crucial limitation deadlines.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-gold btn-sm"
            onClick={openAddForm}
          >
            <PlusCircle size={16} />
            Add Milestone
          </button>
          <button 
            className="btn btn-outline btn-sm"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}
            onClick={handleResetToDefault}
          >
            <RefreshCw size={14} />
            Reset Samples
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

      {/* Add / Edit Event Form */}
      {isAdding && (
        <div className="card" style={{ marginBottom: '2rem', border: '2px solid var(--gold-500)' }}>
          <div className="card-header">
            <h3 className="card-title">
              <CalendarClock size={18} style={{ color: 'var(--gold-600)' }} />
              {editingId ? 'Edit Timeline Milestone' : 'Add New Dispute Milestone'}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stored Locally</span>
          </div>
          <form onSubmit={handleSaveEvent} className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Milestone Title *
                </label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Reply to Legal Notice Received"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Date *
                </label>
                <input 
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Procedural Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as TimelineEvent['stage'])}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  <option value="Pre-Litigation">Pre-Litigation Grievance / Conciliation</option>
                  <option value="Notice Sent">Notice Sent / Reply Received</option>
                  <option value="Filing / Institution">Filing / Institution in Court or Commission</option>
                  <option value="Evidence & Examination">Evidence & Examination of Parties</option>
                  <option value="Order / Judgment">Final Order / Decree / Execution</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Milestone Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TimelineEvent['status'])}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="critical">Critical Deadline (Limitation Alert)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                Description / Occurrence Details *
              </label>
              <textarea 
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of what transpired during this procedural step..."
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Action Item / Pending Task (Optional)
                </label>
                <input 
                  type="text"
                  value={actionRequired}
                  onChange={(e) => setActionRequired(e.target.value)}
                  placeholder="e.g. Procure certified postal tracking proof"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                  Statute / Rule Reference (Optional)
                </label>
                <input 
                  type="text"
                  value={statuteReference}
                  onChange={(e) => setStatuteReference(e.target.value)}
                  placeholder="e.g. Section 38(2)(a) Consumer Protection Act 2019"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => { setIsAdding(false); setEditingId(null); }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                {editingId ? 'Update Milestone' : 'Save to Timeline'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Filter Status:</span>
        {['All', 'completed', 'in_progress', 'upcoming', 'critical'].map(st => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              border: statusFilter === st ? '1px solid var(--gold-500)' : '1px solid var(--border-subtle)',
              background: statusFilter === st ? 'var(--navy-900)' : '#FFFFFF',
              color: statusFilter === st ? 'var(--gold-400)' : 'var(--text-secondary)',
              textTransform: 'capitalize'
            }}
          >
            {st === 'critical' ? 'Critical Deadlines' : st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Visual Chronological Timeline */}
      <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px dashed var(--gold-500)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredEvents.map((ev, index) => (
          <div 
            key={ev.id}
            className="card"
            style={{
              position: 'relative',
              boxShadow: 'var(--shadow-sm)',
              border: ev.status === 'critical' ? '2px solid #EF4444' : '1px solid var(--border-subtle)'
            }}
          >
            {/* Timeline node marker */}
            <div 
              style={{
                position: 'absolute',
                left: '-2.15rem',
                top: '1.25rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: ev.status === 'critical' ? '#EF4444' : ev.status === 'completed' ? '#059669' : 'var(--navy-900)',
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 0 2px var(--gold-500)'
              }}
            />

            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: 'var(--navy-50)',
                        color: 'var(--navy-900)'
                      }}
                    >
                      Stage: {ev.stage}
                    </span>

                    {getStatusBadge(ev.status)}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    {ev.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => openEditForm(ev)}
                    style={{ color: 'var(--navy-700)', padding: '0.35rem', borderRadius: '4px' }}
                    title="Edit milestone"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(ev.id)}
                    style={{ color: 'var(--danger)', padding: '0.35rem', borderRadius: '4px' }}
                    title="Delete milestone"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: 600, marginBottom: '0.65rem' }}>
                Date: {ev.date}
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '0.75rem' }}>
                {ev.description}
              </p>

              {ev.actionRequired && (
                <div 
                  style={{
                    background: 'var(--gold-50)',
                    borderLeft: '3px solid var(--gold-500)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    fontSize: '0.82rem',
                    color: 'var(--navy-950)',
                    marginBottom: '0.5rem'
                  }}
                >
                  <strong>Required Citizen Action:</strong> {ev.actionRequired}
                </div>
              )}

              {ev.statuteReference && (
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  <strong>Legal Basis:</strong> {ev.statuteReference}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginTop: '1.5rem' }}>
          <CalendarClock size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy-900)' }}>No milestones for selected status</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Adjust your filter or click "Add Milestone" to schedule a court or notice date.
          </p>
        </div>
      )}
    </div>
  );
};
