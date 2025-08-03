// Order notes modal component
export default function OrderNotesModal({ order }) {
  if (!order) return null;
  return (
    <div style={{ position: 'fixed', top: 80, left: 0, right: 0, margin: '0 auto', maxWidth: 400, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 24, zIndex: 1000 }}>
      <h2>Order Notes</h2>
      <div><strong>Notes:</strong> {order.notes || 'None'}</div>
      <div style={{ color: 'red' }}><strong>Allergies:</strong> {order.allergies || 'None'}</div>
      <button style={{ marginTop: 16 }} onClick={() => window.dispatchEvent(new CustomEvent('closeOrderNotes'))}>Close</button>
    </div>
  );
}
