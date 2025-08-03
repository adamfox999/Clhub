'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/SupabaseAuthContext';
import OrderTable from './components/OrderTable';
import OrderFilter from './components/OrderFilter';
import OrderNotesModal from './components/OrderNotesModal';
import MenuManager from './components/MenuManager';

export default function AdminFoodPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    async function checkAdminAndFetchOrders() {
      if (authLoading) return; // Wait for auth to load
      
      if (!user) {
        window.location.href = '/auth/signin';
        return;
      }
      
      // TODO: Check if user has admin role
      // For now, assume all authenticated users can access admin
      
      // TODO: Fetch orders from API
      // For now, use dummy data
      const dummyOrders = [
        { id: 1, orderNumber: '001', customer: 'John Doe', total: 25.99, status: 'pending' },
        { id: 2, orderNumber: '002', customer: 'Jane Smith', total: 18.50, status: 'completed' }
      ];
      
      setOrders(dummyOrders);
      setLoading(false);
    }
    
    checkAdminAndFetchOrders();
  }, [user, authLoading]);

  if (authLoading || loading) return <div>Loading...</div>;
  if (!user) return <div>Redirecting to login...</div>;

  return (
    <div style={{ padding: 32 }}>
      <h1>Food Orders Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <OrderFilter />
      <OrderTable orders={orders} />
      <OrderNotesModal />
      <MenuManager />
    </div>
  );
}