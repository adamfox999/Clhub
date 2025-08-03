// Order table component
import { useState } from 'react';

export default function OrderTable({ orders = [] }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
      <thead>
        <tr>
          <th>Order #</th>
          <th>Date</th>
          <th>Email</th>
          <th>Items</th>
          <th>Notes/Allergies</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{String(order.order_number).padStart(4, '0')}</td>
            <td>{new Date(order.created_at).toLocaleString()}</td>
            <td>{order.user_email}</td>
            <td>
              {Array.isArray(order.menu_items)
                ? order.menu_items.map(item => (
                    <div key={item.id}>
                      {item.name} {item.customisations?.length ? `(${item.customisations.map(c => c.name).join(', ')})` : ''}
                    </div>
                  ))
                : <span style={{ color: '#888' }}>No items</span>
              }
            </td>
            <td>
              {order.notes}
              {order.allergies && <div style={{ color: 'red' }}>Allergies: {order.allergies}</div>}
            </td>
            <td>{order.status}</td>
            <td>
              <button onClick={() => setSelectedOrder(order)}>View Notes</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
