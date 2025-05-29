'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { FilledButton } from '@/devlink';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 52.06714,
  lng: -0.52411
};

export default function UserMapPage() {
  const { data: session } = useSession();
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
  const [userIds, setUserIds] = useState([]);
  const [billingInfo, setBillingInfo] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    fetch('/api/boat-spaces')
      .then(async res => {
        if (!res.ok) {
          console.error('Failed to fetch boat spaces');
          return [];
        }
        const text = await res.text();
        try {
          const data = text ? JSON.parse(text) : [];
          console.log('Fetched boat spaces:', data);
          return data;
        } catch (err) {
          console.error('Error parsing boat space response:', err);
          return [];
        }
      })
      .then(setSpaces);

    fetch('/api/contacts')
      .then(res => res.json())
      .then(setContacts);

    if (session?.user?.id) {
      fetch(`/api/item-ids/contact/${session.user.id}`)
        .then(async res => {
          if (!res.ok) return [];
          const text = await res.text();
          try {
            return text ? JSON.parse(text) : [];
          } catch (err) {
            console.error('Failed to parse item ID response:', err);
            return [];
          }
        })
        .then(setUserIds);

      setFormData(prev => ({ ...prev, ownerId: session.user.id }));

      fetch('/api/billing')
        .then(res => res.json())
        .then(setBillingInfo);
    }
  }, [session]);

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
      await fetch(`/api/boat-spaces/${selectedSpace.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billingContact: session.user.id })
      });

      alert('Item added!');
      setFormData({ itemType: 'Boat', itemId: '', ownerId: session.user.id, sailNumber: '', class: '' });
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

      {billingInfo && (
        <div style={{ marginBottom: '1rem', background: 'rgba(255 255 255 / 0.2)', padding: '1rem', borderRadius: '8px' }}>
          <h2>Your Billing Summary</h2>
          <p><strong>Total Spaces:</strong> {billingInfo.totalSpaces}</p>
          <p><strong>Paid Spaces:</strong> {billingInfo.paidSpaces}</p>
          <p><strong>Total Due:</strong> £{billingInfo.totalDue}</p>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        mapTypeId="satellite"
      >
        {spaces.map(space => {
          const lat = Number(space.lat);
          const lng = Number(space.lng);

          if (isNaN(lat) || isNaN(lng)) {
            console.warn(`Skipping invalid space ${space._id}:`, { lat: space.lat, lng: space.lng });
            return null;
          }

          return (
            <Marker
              key={space._id}
              position={{ lat, lng }}
              label={space._id}
              icon={{
                url: 
                space.assignedTo === session?.user?.id
                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                : space.status === 'occupied'
                  ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              }}
              onClick={() => {
              if (space.status !== 'occupied') {
                setSelectedSpace({ id: space._id, lat, lng });
        }
      }}
    />
  );
})}
      </GoogleMap>

      {selectedSpace && (
        <>
          <h2 style={{ marginTop: '1rem' }}>Selected Space: {selectedSpace.id}</h2>

          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <h3>Add Item to {selectedSpace.id}</h3>

            <label>Item ID Tag (allocated to you):</label>
            <select
              value={formData.itemId}
              onChange={e => setFormData({ ...formData, itemId: e.target.value })}
            >
              <option value="">-- Select your item ID --</option>
              {userIds.map(id => (
                <option key={id._id} value={id._id}>{id._id}</option>
              ))}
            </select>

            <label>Item Type:</label>
            <select value={formData.itemType} onChange={e => setFormData({ ...formData, itemType: e.target.value })}>
              <option>Boat</option>
              <option>Launch Trolley</option>
              <option>Road Trailer</option>
              <option>Kayak</option>
              <option>Other</option>
            </select>

            <input
              placeholder="Owner ID"
              value={formData.ownerId}
              disabled
            />

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
