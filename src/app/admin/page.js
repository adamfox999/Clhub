'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 52.06714,
  lng: -0.52411
};

export default function AdminDashboard() {
  const [spaces, setSpaces] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [spaceId, setSpaceId] = useState('');
  const [status, setStatus] = useState('available');
  const [contacts, setContacts] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    fetch('/api/boat-spaces')
      .then(res => res.json())
      .then(setSpaces);

    fetch('/api/contacts')
      .then(res => res.json())
      .then(setContacts);

    fetch('/api/item-ids')
      .then(res => res.json())
      .then(setAvailableIds);
  }, []);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleSpaceSubmit = async (e) => {
    e.preventDefault();
    if (!markerPosition || !spaceId) return;

    const res = await fetch('/api/boat-spaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: spaceId,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
        status
      })
    });

    if (res.ok) {
      const updated = await fetch('/api/boat-spaces').then(res => res.json());
      setSpaces(updated);
      alert(`Space ${spaceId} saved.`);
      setMarkerPosition(null);
      setSpaceId('');
    } else {
      alert('Failed to save boat space.');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleIDSubmit = async (e) => {
    e.preventDefault();
    if (!selectedContactId || selectedIds.length === 0) return;

    await Promise.all(selectedIds.map(id => (
      fetch('/api/item-ids/assign', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, contactId: selectedContactId })
      })
    )));

    alert('Item IDs allocated!');
    setSelectedIds([]);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      {/* SECTION 1: Map Space Editor */}
      <h2>Set Boat Space Location</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        mapTypeId="satellite"
        onClick={handleMapClick}
      >
        {spaces.filter(space => typeof space.lat === 'number' && typeof space.lng === 'number').map(space => (
          <Marker
            key={space._id}
            position={{ lat: space.lat, lng: space.lng }}
            label={space._id}
            icon={{
              url: space.status === 'occupied' ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }}
            onClick={() => {
              setMarkerPosition({ lat: space.lat, lng: space.lng });
              setSpaceId(space._id);
              setStatus(space.status);
            }}
          />
        ))}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>

      {markerPosition && (
        <form onSubmit={handleSpaceSubmit} style={{ marginTop: '1rem' }}>
          <label>Select a Space ID:</label>
          <select
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          >
            <option value="">-- Choose a space --</option>
            {spaces.map(space => (
              <option key={space._id} value={space._id}>{space._id}</option>
            ))}
          </select>
<label style={{ marginLeft: '1rem' }}>Allocated To (billing contact):</label>
<select
  value={spaces.find(s => s._id === spaceId)?.billingContact  || ""}
  onChange={e => {
    // Find the selected space, then update its assignedTo in the backend
    const newContactId = e.target.value;
    setSpaces(prev =>
      prev.map(space =>
        space._id === spaceId
          ? { ...space, billingContact : newContactId }
          : space
      )
    );
  }}
>
  <option value="">-- Unassigned --</option>
  {contacts.map(c => (
    <option key={c._id} value={c._id}>{c.name} ({c.email})</option>
  ))}
</select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>

          <button type="submit">Save Space</button>
        </form>
      )}

      {/* SECTION 2: ID Allocation */}
      <h2 style={{ marginTop: '3rem' }}>Allocate Item IDs</h2>

      <label>Choose Contact:</label>
      <select value={selectedContactId} onChange={e => setSelectedContactId(e.target.value)}>
        <option value="">-- Select a contact --</option>
        {contacts.map(c => (
          <option key={c._id} value={c._id}>{c.name} ({c.email})</option>
        ))}
      </select>

      <form onSubmit={handleIDSubmit}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {availableIds.map(id => (
            <li key={id._id}>
              <label>
                <input
                  type="checkbox"
                  value={id._id}
                  checked={selectedIds.includes(id._id)}
                  onChange={() => handleCheckboxChange(id._id)}
                />
                {id._id}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Allocate Selected IDs</button>
      </form>
    </main>
  );
}
