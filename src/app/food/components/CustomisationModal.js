// Customisation modal component placeholder
// Props: open (bool), item (menu item), selected (array of idx), onChange (fn), onClose (fn), onConfirm (fn)
export default function CustomisationModal({ open, item, selected = [], onChange, onClose, onConfirm }) {
  if (!open || !item) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 2px 16px #0002' }}>
        <h2>Customise: {item.name}</h2>
        <div>{item.description}</div>
        <form style={{ marginTop: 16 }}>
          {item.customisations?.map((c, idx) => (
            <label key={c.name} style={{ display: 'block', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={selected.includes(idx)}
                onChange={e => {
                  if (onChange) {
                    onChange(idx, e.target.checked);
                  }
                }}
              />
              {c.name} (+£{c.price})
            </label>
          ))}
        </form>
        <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={onConfirm}>Add to Basket</button>
        </div>
      </div>
    </div>
  );
// ...existing code...
}
