"use client";
import React from "react";
import OrderSummary from "../components/OrderSummary";

export default function FoodOrderPage() {
  const [snackbar, setSnackbar] = React.useState(false);
  // Simulate adding item to basket (replace with real logic)
  // Show snackbar when an item is added to basket
  function handleAddToCheckout(item) {
    setSnackbar(true);
  }
  function handleEdit() {
    alert('Edit order (not implemented)');
  }
  function handleCancel() {
    alert('Cancel order (not implemented)');
  }
  React.useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);
  // Dummy order data
  const order = {
    orderNumber: '12345',
    orderId: 'abcde',
    basket: [
      { id: 1, name: 'Pizza', quantity: 2, price: 12.99 },
      { id: 2, name: 'Salad', quantity: 1, price: 7.99 }
    ],
    notes: 'No onions',
    allergies: 'Peanuts',
    total: 33.97,
    confirmationSent: false
  };
  return (
    <>
      {snackbar && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#323232',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: 10,
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          zIndex: 99999,
          fontSize: 18,
          opacity: snackbar ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }}>
          <span role="status" aria-live="polite">Item added to checkout</span>
        </div>
      )}
      <OrderSummary
        orderNumber={order.orderNumber}
        orderId={order.orderId}
        basket={order.basket}
        notes={order.notes}
        allergies={order.allergies}
        total={order.total}
        confirmationSent={order.confirmationSent}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onAddToCheckout={handleAddToCheckout}
      />
    </>
  );
}
