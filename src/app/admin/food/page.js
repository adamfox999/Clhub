'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import OrderTable from './components/OrderTable';
import OrderFilter from './components/OrderFilter';
import OrderNotesModal from './components/OrderNotesModal';
import MenuManager from './components/MenuManager';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminFoodPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAdminAndFetchOrders() {
      // Get auth user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        window.location.href = '/auth/signin';
        return;
      }
      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profileError || !profile || profile.role !== 'admin') {
        window.location.href = '/auth/signin';
        return;
      }
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (!ordersError) setOrders(ordersData);
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