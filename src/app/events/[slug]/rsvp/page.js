'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function RSVPPage() {
  const [showPopover, setShowPopover] = useState(false);
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState('');
  const [partySize, setPartySize] = useState(1);
  // Remove submitted state, always allow RSVP changes
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasRSVP, setHasRSVP] = useState(false);
  const [rsvpId, setRsvpId] = useState(null);

  useEffect(() => {
    async function fetchEventAndRSVP() {
      const { supabase } = await import('@/lib/supabaseClient');
      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (eventError) setError('Event not found.');
      setEvent(eventData);

      // Fetch IP address
      let ip = '';
      try {
        const res = await fetch('https://api64.ipify.org?format=json');
        const json = await res.json();
        ip = json.ip;
      } catch (e) {
        // fallback: don't block RSVP, but can't enforce limit
      }

      // Check for existing RSVP for this event and IP
      if (eventData && ip) {
        const { data: rsvpData } = await supabase
          .from('event_rsvps')
          .select('*')
          .eq('event_id', eventData.id)
          .eq('ip_address', ip)
          .maybeSingle();
        if (rsvpData) {
          setHasRSVP(true);
          setRsvpId(rsvpData.id);
          // No longer set submitted, just update status
          setStatus(rsvpData.status);
          if (rsvpData.party_size) setPartySize(rsvpData.party_size);
        }
      }
      setLoading(false);
    }
    fetchEventAndRSVP();
  }, [slug]);

  const handleRSVP = async (selectedStatus) => {
    setError('');
    setStatus(selectedStatus);
    let ip = '';
    try {
      const res = await fetch('https://api64.ipify.org?format=json');
      const json = await res.json();
      ip = json.ip;
    } catch (e) {}
    if (!event) return;
    const { supabase } = await import('@/lib/supabaseClient');
    const user_email = '';
    const rsvpObj = {
      event_id: event.id,
      user_email,
      status: selectedStatus,
      party_size: selectedStatus === 'going' ? partySize : null,
      ip_address: ip,
    };
    console.log('RSVP object:', rsvpObj);
    if (hasRSVP && rsvpId) {
      // Update existing RSVP
      const { error } = await supabase
        .from('event_rsvps')
        .update(rsvpObj)
        .eq('id', rsvpId);
      if (error) {
        setError('Failed to update RSVP. Please try again.');
      }
    } else {
      // Insert new RSVP
      const { error } = await supabase
        .from('event_rsvps')
        .insert([rsvpObj]);
      if (error) {
        setError('Failed to save RSVP. Please try again.');
      } else {
        setHasRSVP(true);
      }
    }
  };

  if (loading) return <main style={{ padding: '2rem' }}>Loading event...</main>;
  if (error) return <main style={{ padding: '2rem', color: 'red' }}>{error}</main>;
  if (!event) return <main style={{ padding: '2rem' }}>Event not found.</main>;

  return (
    <main style={{ padding: '2rem', maxWidth: 500, margin: '0 auto', overflow: 'visible' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{event.name}</h1>
        {event.event_image && (
          <img
            src={event.event_image}
            alt={event.name}
            style={{ width: '100%', maxWidth: 350, borderRadius: 12, marginBottom: 16, objectFit: 'cover' }}
          />
        )}
        {event.description && (
          <p style={{ fontSize: '1.1rem', marginBottom: 0, textAlign: 'center' }}>{event.description}</p>
        )}
      </div>
      <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
        <h2>Your RSVP</h2>
        <p>Status: <strong>{status || 'No response yet'}</strong></p>
        {status === 'going' && <p>Party size: <strong>{partySize}</strong></p>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, overflow: 'visible', position: 'relative' }}>
        <button
          type="button"
          id="going-btn"
          style={{ padding: '0.75rem 1.5rem', fontSize: 16, background: '#4caf50', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => setShowPopover(v => !v)}
        >
          Going
        </button>
        <button
          type="button"
          style={{ padding: '0.75rem 1.5rem', fontSize: 16, background: '#f44336', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => handleRSVP('not_going')}
        >
          Not Going
        </button>
        <button
          type="button"
          style={{ padding: '0.75rem 1.5rem', fontSize: 16, background: '#ff9800', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => handleRSVP('interested')}
        >
          Interested
        </button>
        {showPopover && (
          <div
            id="rsvp-popover"
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#e5e5e5',
              borderRadius: 32,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              zIndex: 1000,
              minWidth: 340,
              padding: '32px 24px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              border: 'none',
            }}
          >
            <div style={{ width: '100%', textAlign: 'left', fontSize: 22, fontWeight: 400, marginBottom: 8 }}>Who’s going?</div>
            <button
              type="button"
              style={{
                width: '100%',
                background: '#ff1ee7',
                color: 'white',
                border: 'none',
                borderRadius: 40,
                fontSize: 40,
                fontWeight: 400,
                padding: '16px 0',
                marginBottom: 8,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => {
                setPartySize(1);
                handleRSVP('going');
                setShowPopover(false);
              }}
            >
              Just Me
            </button>
            <div style={{ width: '100%', textAlign: 'left', fontSize: 22, fontWeight: 400, margin: '16px 0 8px 0' }}>
              More, my party size is
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <button
                type="button"
                aria-label="Decrease"
                style={{
                  width: 64,
                  height: 64,
                  background: '#aaa',
                  border: 'none',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setPartySize(p => Math.max(1, (typeof p === 'number' ? p : 1) - 1))}
              >
                <span style={{ fontSize: 48, fontWeight: 200, lineHeight: 1 }}>–</span>
              </button>
              <div
                style={{
                  width: 90,
                  height: 64,
                  background: 'white',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  fontWeight: 400,
                  border: 'none',
                }}
              >
                {partySize}
              </div>
              <button
                type="button"
                aria-label="Increase"
                style={{
                  width: 64,
                  height: 64,
                  background: '#aaa',
                  border: 'none',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  color: 'white',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setPartySize(p => (typeof p === 'number' ? p + 1 : 2))}
              >
                <span style={{ fontSize: 48, fontWeight: 200, lineHeight: 1 }}>+</span>
              </button>
            </div>
            <button
              type="button"
              style={{
                width: '100%',
                background: '#ff1ee7',
                color: 'white',
                border: 'none',
                borderRadius: 40,
                fontSize: 40,
                fontWeight: 400,
                padding: '16px 0',
                marginTop: 8,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => {
                handleRSVP('going');
                setShowPopover(false);
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </main>
  );
}
