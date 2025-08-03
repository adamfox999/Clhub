// Props: orderNumber, orderId, basket, notes, allergies, total, confirmationSent, onEdit, onCancel
export default function OrderSummary({
  orderNumber,
  orderId,
  basket = [],
  notes = '',
  allergies = '',
  total = 0,
  confirmationSent = false,
  onEdit,
  onCancel,
  onAddToCheckout,
}) {
  return (
    <div style={{ maxWidth: 500, margin: '32px auto', padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      <h2>Order Confirmation</h2>
      <div>Order Number: <strong>{orderNumber}</strong></div>
      <div>Order ID: <span style={{ fontSize: '0.9em' }}>{orderId}</span></div>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {basket.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.name}</strong> £{item.price}
            {item.customisations?.length > 0 && (
              <span> | Customisations: {item.customisations.map(c => c.name).join(', ')}</span>
            )}
            {onAddToCheckout && (
              <button style={{ marginLeft: 12 }} onClick={() => onAddToCheckout(item)}>
                Add to Checkout
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>Notes: {notes}</div>
      <div>Allergies: {allergies}</div>
      <div style={{ marginTop: 16, fontWeight: 'bold' }}>Total: £{total.toFixed(2)}</div>
      <div style={{ marginTop: 24 }}>
        {onEdit && <button onClick={onEdit}>Edit Order</button>}
        {onCancel && <button style={{ marginLeft: 12 }} onClick={onCancel}>Cancel Order</button>}
      </div>
      {confirmationSent && <div style={{ marginTop: 16, color: 'green' }}>Confirmation email sent! (stub)</div>}
    </div>
  );
}
