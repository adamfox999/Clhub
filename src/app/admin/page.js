'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 52.06714,
  lng: -0.52411
};

export default function AdminMapPage() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [spaceId, setSpaceId] = useState('');
  const [status, setStatus] = useState('available');
  const [spaces, setSpaces] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    fetch('/api/boat-spaces')
      .then(res => res.json())
      .then(setSpaces);
  }, []);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!markerPosition || !spaceId) {
      alert('Please select a location and enter a space ID.');
      return;
    }

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
      alert(`Space ${spaceId} saved.`);
      // Refresh the space list to show the updated marker
      const updated = await fetch('/api/boat-spaces').then(res => res.json());
      setSpaces(updated);
      setMarkerPosition(null);
      setSpaceId('');
    } else {
      alert('Failed to save boat space.');
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Admin: Set Boat Space Location</h1>
      <p>Click on the map to set the location for a boat space.</p>

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
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <label>Select Existing Space:</label>
          <select
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          >
            <option value="">-- Select Space --</option>
            {spaces.map(space => (
              <option key={space._id} value={space._id}>{space._id}</option>
            ))}
          </select>

          <label>Status:</label>
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
    </main>
  );
}
