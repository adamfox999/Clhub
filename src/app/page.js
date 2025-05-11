'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 52.06714,
  lng: -0.52411
};

export default function UserMapPage() {
  const [spaces, setSpaces] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [formData, setFormData] = useState({
    itemType: 'Boat',
    itemId: '',
    ownerId: '',
    sailNumber: '',
    class: ''
  });

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
  }, []);

  useEffect(() => {
    if (selectedSpace?.id) {
      fetch('/api/items')
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(item => item.locationId === selectedSpace.id);
          setItems(filtered);
        });
    } else {
      setItems([]);
    }
  }, [selectedSpace]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = {
      ...formData,
      locationId: selectedSpace.id
    };

    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });

    if (res.ok) {
      alert('Item added!');
      setFormData({ itemType: 'Boat', itemId: '', ownerId: '', sailNumber: '', class: '' });
      const newItem = await res.json();
      setItems(prev => [...prev, newItem]);
    } else {
      alert('Something went wrong.');
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Select a Boat Space</h1>
      <p>Click on a green marker to add an item to that boat space.</p>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        mapTypeId="satellite"
      >
        {spaces.filter(space => typeof space.lat === 'number' && typeof space.lng === 'number').map(space => (
          <Marker
            key={space._id}
            position={{ lat: space.lat, lng: space.lng }}
            label={space._id}
            icon={{
              url: space.status === 'occupied'
                ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }}
            onClick={() => {
              if (space.status !== 'occupied') {
                setSelectedSpace({ id: space._id, lat: space.lat, lng: space.lng });
              }
            }}
          />
        ))}
      </GoogleMap>

      {selectedSpace && (
        <>
          <h2 style={{ marginTop: '1rem' }}>Selected Space: {selectedSpace.id}</h2>

          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <h3>Add Item to {selectedSpace.id}</h3>
            <label>Item Type:</label>
            <select value={formData.itemType} onChange={e => setFormData({ ...formData, itemType: e.target.value })}>
              <option>Boat</option>
              <option>Launch Trolley</option>
              <option>Road Trailer</option>
              <option>Kayak</option>
              <option>Other</option>
            </select>

            <input
              placeholder="Item ID"
              value={formData.itemId}
              onChange={e => setFormData({ ...formData, itemId: e.target.value })}
            />

            <label>Owner:</label>
            <select
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
            >
              <option value="">-- Choose owner --</option>
              {contacts.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            {formData.itemType === 'Boat' && (
              <>
                <input
                  placeholder="Class"
                  value={formData.class}
                  onChange={e => setFormData({ ...formData, class: e.target.value })}
                />
                <input
                  placeholder="Sail Number"
                  value={formData.sailNumber}
                  onChange={e => setFormData({ ...formData, sailNumber: e.target.value })}
                />
              </>
            )}

            <button type="submit">Add Item</button>
          </form>

          <h3 style={{ marginTop: '2rem' }}>Items in {selectedSpace.id}</h3>
          <ul>
            {items.map(item => (
              <li key={item._id}>
                <strong>{item.itemId}</strong> — {item.itemType}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
