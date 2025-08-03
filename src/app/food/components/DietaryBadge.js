// Dietary badge component placeholder
// Props: types (array of dietary strings, e.g. ['vegan', 'vegetarian', 'gluten-free'])
const ICONS = {
  vegan: '🌱',
  vegetarian: '🥕',
  'gluten-free': '🚫🌾',
  'dairy-free': '🥛🚫',
  halal: '🕌',
  kosher: '✡️',
};

export default function DietaryBadge({ types = [] }) {
  if (!types.length) return null;
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
      {types.map(type => (
        <span key={type} title={type} style={{ fontSize: '1.2em', border: '1px solid #eee', borderRadius: 6, padding: '2px 6px', background: '#f6f6f6' }}>
          {ICONS[type] || type}
        </span>
      ))}
    </div>
  );
}
