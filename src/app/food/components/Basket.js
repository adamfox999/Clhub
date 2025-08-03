// Basket component placeholder
export default function Basket() {
  // Props: basket (array), notes (string), allergies (string), onRemove (fn)
  // For demo, use dummy props if not provided
  const props = arguments[0] || {};
  const basket = props.basket || [];
  const notes = props.notes || '';
  const allergies = props.allergies || '';
  const onRemove = props.onRemove || (() => {});

  function getTotal() {
    return basket.reduce((sum, item) => {
      const customTotal = item.customisations?.reduce((cSum, c) => cSum + (c.price || 0), 0) || 0;
      return sum + item.price + customTotal;
    }, 0);
  }

  return (
    <div style={{padding: '16px 0' }}>
      <h2>Basket</h2>
      {basket.length === 0 ? (
        <div>No items in basket.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {basket.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
              <strong>{item.name}</strong> £{item.price}
              {item.customisations?.length > 0 && (
                <span> | Customisations: {item.customisations.map(c => c.name).join(', ')}</span>
              )}
              <button style={{ marginLeft: 16 }} onClick={() => onRemove(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 16, fontWeight: 'bold' }}>Total: £{getTotal().toFixed(2)}</div>
    </div>
  );
}
