"use client";
import React from "react";

// Dummy order fetch by token (replace with backend call)
function fetchOrder(token) {
  // Simulate order data
  return {
    orderNumber: '0123',
    orderId: token,
    basket: [
      { name: 'Fish & Chips', price: 10, customisations: [{ name: 'Mushy peas', price: 1.5 }] },
      { name: 'Regatta Burger', price: 12, customisations: [{ name: 'Cheese', price: 1 }] },
    ],
    notes: 'No salt',
    allergies: 'None',
    total: 24.5,
    status: 'active', // or 'cancelled'
    cutoff: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    placedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 min ago
  };
}

export default function ManageOrderPage({ params }) {
  const { orderToken } = params || {};
  const [order, setOrder] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);

  React.useEffect(() => {
    if (orderToken) {
      setOrder(fetchOrder(orderToken));
    }
  }, [orderToken]);

  if (!order) return <div>Loading order...</div>;
  if (cancelled || order.status === 'cancelled') return <div>Your order has been cancelled.</div>;

  const canEditOrCancel = new Date() < new Date(order.cutoff);

  function handleEdit() {
    setEditing(true);
  }
  function handleCancel() {
    // TODO: Call backend to cancel order
    setCancelled(true);
  }
  function handleSaveEdit() {
    // TODO: Save edited order to backend
    setEditing(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '32px auto', padding: 24 }}>
      <h1>Manage Your Order</h1>
      <div>Order Number: <strong>{order.orderNumber}</strong></div>
      <div>Order ID: <span style={{ fontSize: '0.9em' }}>{order.orderId}</span></div>
      <div>Placed: {order.placedAt.toLocaleString()}</div>
      <div>Cutoff: {order.cutoff.toLocaleString()}</div>
      <ul style={{ padding: 0, listStyle: 'none', marginTop: 16 }}>
        {order.basket.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.name}</strong> £{item.price}
            {item.customisations?.length > 0 && (
              <span> | Customisations: {item.customisations.map(c => c.name).join(', ')}</span>
            )}
          </li>
        ))}
      </ul>
      <div>Notes: {order.notes}</div>
      <div>Allergies: {order.allergies}</div>
      <div style={{ marginTop: 16, fontWeight: 'bold' }}>Total: £{order.total.toFixed(2)}</div>
      {canEditOrCancel ? (
        <div style={{ marginTop: 24 }}>
          {!editing ? (
            <>
              <button onClick={handleEdit}>Edit Order</button>
              <button style={{ marginLeft: 12 }} onClick={handleCancel}>Cancel Order</button>
            </>
          ) : (
            <>
              {/* TODO: Show editable basket/notes/allergies UI */}
              <div style={{ marginBottom: 12 }}>Editing not implemented (stub)</div>
              <button onClick={handleSaveEdit}>Save Changes</button>
              <button style={{ marginLeft: 12 }} onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      ) : (
        <div style={{ marginTop: 24, color: 'red' }}>Order can no longer be edited or cancelled (cutoff passed).</div>
      )}
    </div>
  );
}
