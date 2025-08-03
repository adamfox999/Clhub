'use client';
import { useEffect, useState } from 'react';
import OrderTable from './components/OrderTable';
import OrderFilter from './components/OrderFilter';
import OrderNotesModal from './components/OrderNotesModal';
import MenuManager from './components/MenuManager';

export default function AdminFoodPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAdminAndFetchOrders() {
      // Get auth user from API
      const userRes = await fetch('/api/auth/user');
      const userData = await userRes.json();
      setUser(userData.user);
      if (!userData.user) {
        window.location.href = '/auth/signin';
        return;
      }
      // Get profile from API
      const profileRes = await fetch(`/api/profiles/${userData.user.id}`);
      const profileData = await profileRes.json();
      if (!profileData || profileData.role !== 'admin') {
        window.location.href = '/auth/signin';
        return;
      }
      // Fetch orders from API
      const ordersRes = await fetch('/api/admin/orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData.orders || []);
      setLoading(false);
    }
    checkAdminAndFetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (!user) return <div>Checking admin access...</div>;

  return (
    <div style={{ padding: 32 }}>
      <h1>Food Orders Admin Dashboard</h1>
      <OrderFilter />
      <OrderTable orders={orders} />
      <OrderNotesModal />
      <MenuManager />
    </div>
  );
}