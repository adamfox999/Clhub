// Order filter component
import { useState, useEffect } from 'react';

export default function OrderFilter({ orders = [], onFilterChange = () => {} }) {
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    customer: '',
  });

  // Filter options
  const statusOptions = ['All Status', 'pending', 'completed', 'cancelled'];

  function handleChange(e) {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Apply filters and call parent callback
    const filtered = applyFilters(orders, newFilters);
    onFilterChange(filtered);
  }

  function applyFilters(ordersList, filterCriteria) {
    return ordersList.filter(order => {
      // Status filter
      if (filterCriteria.status && order.status !== filterCriteria.status) {
        return false;
      }
      
      // Date filter (simple contains check)
      if (filterCriteria.date && !order.created_at?.includes(filterCriteria.date)) {
        return false;
      }
      
      // Customer filter (simple contains check)
      if (filterCriteria.customer) {
        const customer = order.customer || order.user_email || '';
        if (!customer.toLowerCase().includes(filterCriteria.customer.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  }

  // Update filtered orders when orders prop changes
  useEffect(() => {
    const filtered = applyFilters(orders, filters);
    onFilterChange(filtered);
  }, [orders]);

  return (
    <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Filter Orders</h3>
      <form style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Status:
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt === 'All Status' ? '' : opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Date:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Customer:
          <input
            type="text"
            name="customer"
            value={filters.customer}
            onChange={handleChange}
            placeholder="Search customer..."
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setFilters({ status: '', date: '', customer: '' });
            onFilterChange(orders);
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            marginTop: 24
          }}
        >
          Clear Filters
        </button>
      </form>
    </div>
  );
}
