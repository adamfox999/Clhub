'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/SupabaseAuthContext';
import { exportOrdersToPDF } from '@/lib/pdfExport';
import OrderTable from './components/OrderTable';
import OrderFilter from './components/OrderFilter';
import OrderNotesModal from './components/OrderNotesModal';
import MenuManager from './components/MenuManager';

export default function AdminFoodPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [exportOptions, setExportOptions] = useState({
    includeCustomer: true,
    includeNotes: true,
    includeAllergies: true,
    includeStatus: true,
    groupByItem: true
  });
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    async function checkAdminAndFetchOrders() {
      if (authLoading) return; // Wait for auth to load
      
      if (!user) {
        window.location.href = '/auth/signin';
        return;
      }
      
      try {
        // Fetch real orders from API
        const response = await fetch('/api/food/admin/orders');
        if (response.ok) {
          const ordersData = await response.json();
          console.log('Successfully fetched orders from Supabase:', ordersData.length);
          setOrders(ordersData);
          setFilteredOrders(ordersData);
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch orders:', response.status, errorText);
          alert(`Failed to fetch orders from database: ${response.status}`);
          // Fallback to dummy data with realistic structure
          const dummyOrders = [
            { 
              id: 1, 
              orderNumber: '001', 
              order_number: '001',
              user_email: 'john@example.com', 
              customer: 'john@example.com',
              total: 25.99, 
              status: 'pending',
              items: [
                { name: 'Margherita Pizza', price: 12, quantity: 1, customisations: [{ name: 'Extra cheese', price: 1.5 }] },
                { name: 'Caesar Salad', price: 8.50, quantity: 1, customisations: [] }
              ],
              notes: 'Extra crispy please',
              allergies: 'Nuts'
            },
            { 
              id: 2, 
              orderNumber: '002',
              order_number: '002', 
              user_email: 'jane@example.com',
              customer: 'jane@example.com', 
              total: 18.50, 
              status: 'completed',
              items: [
                { name: 'Pepperoni Pizza', price: 14, quantity: 1, customisations: [] }
              ],
              notes: '',
              allergies: 'Dairy intolerant'
            }
          ];
          console.log('Using fallback dummy data');
          setOrders(dummyOrders);
          setFilteredOrders(dummyOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert(`Network error fetching orders: ${error.message}`);
      }
      
      setLoading(false);
    }
    
    checkAdminAndFetchOrders();
  }, [user, authLoading]);

  const handleExportPDF = () => {
    const ordersToExport = filteredOrders.length > 0 ? filteredOrders : orders;
    
    if (ordersToExport.length === 0) {
      alert('No orders to export!');
      return;
    }

    exportOrdersToPDF(ordersToExport, {
      title: 'Food Orders - Supplier Export',
      ...exportOptions
    });
  };

  const handleFilterChange = (filtered) => {
    setFilteredOrders(filtered);
  };

  if (authLoading || loading) return <div>Loading...</div>;
  if (!user) return <div>Redirecting to login...</div>;

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1>Food Orders Admin Dashboard</h1>
          <p>Welcome, {user.email}</p>
        </div>
        
        {/* Export Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handleExportPDF}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            📄 Export to PDF ({filteredOrders.length || orders.length} orders)
          </button>
          
          {/* Export Options */}
          <div style={{ 
            fontSize: '12px', 
            display: 'flex', 
            gap: 12, 
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={exportOptions.groupByItem}
                onChange={(e) => setExportOptions(prev => ({ ...prev, groupByItem: e.target.checked }))}
              />
              Group by Item
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={exportOptions.includeCustomer}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeCustomer: e.target.checked }))}
              />
              Include Customer
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={exportOptions.includeNotes}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeNotes: e.target.checked }))}
              />
              Include Notes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={exportOptions.includeAllergies}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeAllergies: e.target.checked }))}
              />
              Include Allergies
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={exportOptions.includeStatus}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeStatus: e.target.checked }))}
              />
              Include Status
            </label>
          </div>
        </div>
      </div>

      <OrderFilter orders={orders} onFilterChange={handleFilterChange} />
      <OrderTable orders={filteredOrders} />
      <OrderNotesModal />
      <MenuManager />
    </div>
  );
}