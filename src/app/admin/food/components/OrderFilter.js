// Order filter component
import { useState } from 'react';

export default function OrderFilter() {
  const [filters, setFilters] = useState({
    event: '',
    date: '',
    category: '',
  });

  // Dummy event/category options for UI
  const eventOptions = ['All Events', 'Regatta', 'Dinner', 'Training'];
  const categoryOptions = ['All Categories', 'Food', 'Drink', 'Merch'];

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
    // TODO: Call onFilterChange if passed as prop
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Order Filter</h2>
      <form style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label>
          Event:
          <select name="event" value={filters.event} onChange={handleChange}>
            {eventOptions.map(opt => (
              <option key={opt} value={opt === 'All Events' ? '' : opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input name="date" type="date" value={filters.date} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleChange}>
            {categoryOptions.map(opt => (
              <option key={opt} value={opt === 'All Categories' ? '' : opt}>{opt}</option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}
