"use client";
import React from "react";
import OrderSummary from "../components/OrderSummary";

export default function FoodOrderPage() {
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Get order data from sessionStorage
    const orderDataString = sessionStorage.getItem('orderData');
    if (orderDataString) {
      try {
        const orderData = JSON.parse(orderDataString);
        setOrder(orderData);
      } catch (error) {
        console.error('Error parsing order data:', error);
        // Fallback to dummy data if parsing fails
        setOrder({
          orderNumber: 'ERROR',
          orderId: 'unknown',
          basket: [],
          notes: '',
          allergies: '',
          total: 0,
          confirmationSent: false
        });
      }
    } else {
      // No order data found - redirect back to food page
      window.location.href = '/food';
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading order confirmation...
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        fontSize: '18px',
        color: '#666'
      }}>
        Order not found. <a href="/food">Return to food ordering</a>
      </div>
    );
  }
  return (
    <>
      {/* Important notice about order number */}
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '16px',
        margin: '20px auto',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', marginRight: '8px' }}>✏️</span>
          <strong style={{ color: '#856404', fontSize: '16px' }}>Important: Please Write Down Your Order Number</strong>
        </div>
        <div style={{ margin: '16px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c3e50', letterSpacing: '2px' }}>
            {order.orderNumber}
          </div>
        </div>

      </div>
      
      <OrderSummary
        orderNumber={order.orderNumber}
        basket={order.basket}
        notes={order.notes}
        allergies={order.allergies}
        total={order.total}
        confirmationSent={order.confirmationSent}
      />
    </>
  );
}
