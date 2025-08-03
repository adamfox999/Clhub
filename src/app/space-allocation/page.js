'use client';

// Moved from /app/page.js
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
// Removed devlink import

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 52.06714,
  lng: -0.52411
};

export default function UserMapPage() {
  // TODO: Replace with Supabase session
  const session = null;
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
      .then(res => res.json())
      .then(setSpaces);
    // ...fetch contacts, items, etc. as needed...
  }, [session]);

  // ...existing code for rendering map and UI...
}
