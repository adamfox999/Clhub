// Props: times (array of time strings), value (selected), onChange (fn)
export default function PickupTimeSelector({ times = [], value = '', onChange }) {
  // Dummy times if not provided
  const defaultTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
  ];
  const options = times.length ? times : defaultTimes;

  return (
    <div style={{ margin: '16px 0' }}>
      <label>
        Pickup Time:
        <select value={value} onChange={e => onChange && onChange(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="">Select...</option>
          {options.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
    </div>
  );
// ...existing code...
}
