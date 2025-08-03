import React from "react";
import DietaryBadge from "./DietaryBadge";

// Props: menu (array of items), onAdd (fn)
export default function MenuList({ menu = [], onAdd }) {
  if (!menu.length) return <div>No menu items available.</div>;
  return (
    <div>
      {menu.map(item => (
        <div key={item.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <strong>{item.name}</strong> <span>£{item.price}</span><br />
          <span>{item.description}</span><br />
          <DietaryBadge types={item.dietary || []} />
          <button style={{ marginTop: 8 }} onClick={() => onAdd && onAdd(item)}>Add to Basket</button>
        </div>
      ))}
    </div>
  );
// ...existing code...
}
