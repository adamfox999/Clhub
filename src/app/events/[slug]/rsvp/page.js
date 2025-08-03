"use client";
import Image from 'next/image';
// Helper to wait for grecaptcha to load
const waitForGrecaptcha = () =>
  new Promise(resolve => {
    if (window.grecaptcha) return resolve();
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
// This is the RSVPPage component
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';

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

    // Wait for grecaptcha to load
    await waitForGrecaptcha();

    // Check if grecaptcha is loaded
    if (!window.grecaptcha) {
      setError('Spam protection failed to load. Please try again.');
      return;
    }

    // Get reCAPTCHA token
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const token = await window.grecaptcha.execute(siteKey, { action: 'rsvp' });

    // Verify token with backend
    const verifyRes = await fetch('/api/recaptcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.ok) {
      setError('Failed spam check. Please try again.');
      return;
    }

    // ...existing RSVP logic...
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
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <main style={{ padding: '2rem', maxWidth: 500, margin: '0 auto', overflow: 'visible' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{event.name}</h1>
        {/* Show event start and end time above the image and summary */}
        {event && event.start_time && event.end_time && (() => {
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);
          const sameDay = start.toDateString() === end.toDateString();
          // Helper to get ordinal suffix
          const nth = d => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
              case 1: return 'st';
              case 2: return 'nd';
              case 3: return 'rd';
              default: return 'th';
            }
          };
          // Format: Wednesday, 6th August - 6pm
          const dayName = start.toLocaleDateString(undefined, { weekday: 'long' });
          const day = start.getDate();
          const month = start.toLocaleDateString(undefined, { month: 'long' });
          const hour = start.getHours();
          const minute = start.getMinutes();
          const ampm = hour >= 12 ? 'pm' : 'am';
          const hour12 = hour % 12 === 0 ? 12 : hour % 12;
          const time = `${hour12}${minute ? ':' + String(minute).padStart(2, '0') : ''}${ampm}`;
          if (sameDay) {
            return (
              <div style={{ marginBottom: 12, fontSize: 16, color: '#444', textAlign: 'center' }}>
                {dayName}, {day}{nth(day)} {month} - {time}
              </div>
            );
          } else {
            // If not same day, show both start and end
            const endDayName = end.toLocaleDateString(undefined, { weekday: 'long' });
            const endDay = end.getDate();
            const endMonth = end.toLocaleDateString(undefined, { month: 'long' });
            const endHour = end.getHours();
            const endMinute = end.getMinutes();
            const endAmpm = endHour >= 12 ? 'pm' : 'am';
            const endHour12 = endHour % 12 === 0 ? 12 : endHour % 12;
            const endTime = `${endHour12}${endMinute ? ':' + String(endMinute).padStart(2, '0') : ''}${endAmpm}`;
            return (
              <div style={{ marginBottom: 12, fontSize: 16, color: '#444', textAlign: 'center' }}>
                {dayName}, {day}{nth(day)} {month} - {time}<br />
                to {endDayName}, {endDay}{nth(endDay)} {endMonth} - {endTime}
              </div>
            );
          }
        })()}
        {/* Show event summary below the times and above the image */}
        {event && event.summary && (
          <div style={{ marginBottom: 12, fontSize: 17, color: '#222', textAlign: 'center', fontStyle: 'italic', maxWidth: 400 }}>
            {event.summary}
          </div>
        )}
        {event.event_image && (
          <Image
            src={event.event_image}
            alt={event.name}
            style={{ width: '100%', maxWidth: 350, borderRadius: 12, marginBottom: 16, objectFit: 'cover' }}
          width={400}
          height={300}
          />
        )}
        {/* Show current RSVP status above the buttons */}
        {status && (
          <div style={{ marginBottom: 16, fontSize: 18, color: '#333', textAlign: 'center' }}>
            Current RSVP status: <strong>{status.replace('_', ' ')}</strong>
          </div>
        )}
        {/*
          Party size display is commented out for now. To restore, uncomment this line.
          {status === 'going' && <p>Party size: <strong>{partySize}</strong></p>}
        */}
      </div>
      {/*
        Popover UI for party size selection is commented out for now. To restore, uncomment this block.
        {showPopover && (
          ...popover code...
        )}
      */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, overflow: 'visible', position: 'relative' }}>
        <button
          type="button"
          id="going-btn"
          style={{ padding: '0.75rem 1.5rem', fontSize: 16, background: '#4caf50', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => {
            setPartySize(1); // Always 1 for now
            handleRSVP('going');
          }}
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
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </main>
    </>
  );
}
