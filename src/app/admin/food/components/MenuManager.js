// Menu manager component
import { useState, useEffect } from 'react';

export default function MenuManager() {
  // Track categories from API
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    image: '',
    customisations: '',
    available: true,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const catRes = await fetch('/api/food/categories');
        const catData = await catRes.json();
        setCategories(catData.categories || []);
        const itemRes = await fetch('/api/food/admin');
        const itemData = await itemRes.json();
        let itemsArr = itemData.items || [];
        // Normalize order values for items within each category
        const grouped = {};
        itemsArr.forEach(item => {
          grouped[item.category_id] = grouped[item.category_id] || [];
          grouped[item.category_id].push(item);
        });
        let normalizedItems = [];
        await Promise.all(Object.values(grouped).map(async group => {
          // If any order is duplicate or zero, normalize
          const uniqueOrders = new Set(group.map(i => i.order));
          if (uniqueOrders.size !== group.length || group.some(i => i.order === 0)) {
            group = group
              .sort((a, b) => a.id - b.id)
              .map((item, idx) => ({ ...item, order: idx }));
            // Persist normalized order to backend
            await Promise.all(group.map(item =>
              fetch('/api/food/admin', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, order: item.order })
              })
            ));
          }
          normalizedItems = normalizedItems.concat(group);
        }));
        setItems(normalizedItems.length ? normalizedItems : itemsArr);
      } catch (err) {
        setError('Failed to fetch menu data');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/food/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          category_id: form.category_id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          name: '',
          description: '',
          category_id: '',
          price: '',
          image: '',
          customisations: '',
          available: true,
        });
        // Refresh categories and menu items
        const catRes = await fetch('/api/food/categories');
        const catData = await catRes.json();
        if (catRes.ok) setCategories(catData.categories || []);
        const itemRes = await fetch('/api/food/admin');
        const itemData = await itemRes.json();
        if (itemRes.ok) setItems(itemData.items || []);
      } else {
        setError(data.error || 'Failed to add menu item');
      }
    } catch (err) {
      setError('Failed to add menu item');
    }
    setLoading(false);
  }

  // Move category up/down
  function moveCategory(idx, direction) {
    let sorted = [...categories].sort((a, b) => a.order - b.order);
    let currentIdx = idx;
    let targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    // Ensure all categories have unique sequential order before swap
    const uniqueOrders = new Set(sorted.map(c => c.order));
    if (uniqueOrders.size !== sorted.length || sorted.some(c => c.order === 0)) {
      sorted = sorted
        .sort((a, b) => a.id - b.id)
        .map((cat, idx) => ({ ...cat, order: idx }));
    }
    // Swap order fields (use actual order values, not index)
    const orderA = sorted[currentIdx].order;
    const orderB = sorted[targetIdx].order;
    sorted[currentIdx].order = orderB;
    sorted[targetIdx].order = orderA;
    // If moving down, re-sort so the moved item stays in the correct position
    if (direction === 1) {
      sorted = sorted.sort((a, b) => a.order - b.order);
    }
    setCategories([...sorted]);
    // Persist order changes
    Promise.all([
      fetch('/api/food/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sorted[currentIdx].id, name: sorted[currentIdx].name, order: sorted[currentIdx].order }),
      }).then(res => res.json()).then(data => {
        console.log('Category move PUT response idx:', data);
      }),
      fetch('/api/food/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sorted[targetIdx].id, name: sorted[targetIdx].name, order: sorted[targetIdx].order }),
      }).then(res => res.json()).then(data => {
        console.log('Category move PUT response targetIdx:', data);
      })
    ]).then(async () => {
      // Refetch categories from backend
      const catRes = await fetch('/api/food/categories');
      const catData = await catRes.json();
      if (catRes.ok) setCategories(catData.categories || []);
    });
  }

  // Move item up/down within a category
  function moveItem(category, idx, direction) {
    let catItems = items.filter(item => item.category_id === category.id).sort((a, b) => a.order - b.order);
    let currentIdx = idx;
    let targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= catItems.length) return;
    // Swap order values (use actual order values, not index)
    const orderA = catItems[currentIdx].order;
    const orderB = catItems[targetIdx].order;
    catItems[currentIdx].order = orderB;
    catItems[targetIdx].order = orderA;
    // If moving down, re-sort so the moved item stays in the correct position
    if (direction === 1) {
      catItems = catItems.sort((a, b) => a.order - b.order);
    }
    // Update items array
    const updatedItems = items.map(i => {
      const found = catItems.find(ci => ci.id === i.id);
      return found ? found : i;
    });
    setItems(updatedItems);
    // Persist order changes
    Promise.all([
      fetch('/api/food/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: catItems[currentIdx].id, order: catItems[currentIdx].order }),
      }),
      fetch('/api/food/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: catItems[targetIdx].id, order: catItems[targetIdx].order }),
      })
    ]).then(async () => {
      // Refetch items from backend
      const itemRes = await fetch('/api/food/admin');
      const itemData = await itemRes.json();
      if (itemRes.ok) setItems(itemData.items || []);
    });
  }

  // Main component return
  return (
    <div style={{ marginTop: 32 }}>
      <h2>Menu Manager</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'grid', gap: 12, maxWidth: 400 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <select name="category_id" value={form.category_id} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.sort((a, b) => a.order - b.order).map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" step="0.01" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <input name="customisations" value={form.customisations} onChange={handleChange} placeholder="Customisations (e.g. Cheese:1,Bacon:1.5)" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input name="available" type="checkbox" checked={form.available} onChange={handleChange} />
          Available
        </label>
        <button type="submit" disabled={loading}>Add Menu Item</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <div>
        <h3>Menu Items</h3>
        {loading ? (
          <div>Loading...</div>
        ) : items.length === 0 ? (
          <div>No menu items yet.</div>
        ) : (
          // Group items by category and render in custom order
          categories.sort((a, b) => a.order - b.order).map((category, catIdx) => {
            const catItems = items
              .filter(item => item.category_id === category.id)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            return (
              <div key={category.id} style={{ marginBottom: 24 }}>
                <h4 style={{ marginBottom: 8 }}>
                  {category.name}
                  <button style={{ marginLeft: 8 }} onClick={() => moveCategory(catIdx, -1)} disabled={catIdx === 0}>↑</button>
                  <button style={{ marginLeft: 4 }} onClick={() => moveCategory(catIdx, 1)} disabled={catIdx === categories.length - 1}>↓</button>
                </h4>
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {catItems.map((item, idx) => (
                    <li key={item.id || idx} style={{ marginBottom: 16, border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
                      <strong>{item.name}</strong> ({category.name})<br />
                      <span>{item.description}</span><br />
                      <span>Price: £{item.price}</span><br />
                      {item.image_url && (<img src={item.image_url} alt={item.name} style={{ maxWidth: 100, marginTop: 8 }} />)}
                      <div>Customisations: {Array.isArray(item.customisations)
                        ? item.customisations.map(c => `${c.name}${c.price ? ` (£${c.price})` : ''}`).join(', ')
                        : ''}
                      </div>
                      <div>Status: {item.always_available ? 'Available' : 'Unavailable'}</div>
                      <div style={{ marginTop: 8 }}>
                        <button onClick={() => moveItem(category, idx, -1)} disabled={idx === 0}>↑</button>
                        <button onClick={() => moveItem(category, idx, 1)} disabled={idx === catItems.length - 1}>↓</button>
                    <button style={{ marginLeft: 8 }} onClick={() => setEditingId(item.id)}>Edit</button>
                    <button style={{ marginLeft: 4, color: 'red' }} onClick={async () => {
                      if (window.confirm('Delete this item?')) {
                        setLoading(true);
                        setError(null);
                        try {
                          const res = await fetch('/api/food/admin', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: item.id }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            // Refresh items
                            const itemRes = await fetch('/api/food/admin');
                            const itemData = await itemRes.json();
                            if (itemRes.ok) setItems(itemData.items || []);
                          } else {
                            setError(data.error || 'Failed to delete item');
                          }
                        } catch (err) {
                          setError('Failed to delete item');
                        }
                        setLoading(false);
                      }
                    }}>Delete</button>
                      </div>
                  {editingId === item.id && (
                    <form style={{ marginTop: 12, background: '#f9f9f9', padding: 12, borderRadius: 8 }}
                      onSubmit={async e => {
                        e.preventDefault();
                        setLoading(true);
                        setError(null);
                        try {
                          const res = await fetch('/api/food/admin', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              id: item.id,
                              name: editForm?.name ?? item.name,
                              description: editForm?.description ?? item.description,
                              price: editForm?.price ?? item.price,
                              image: editForm?.image ?? item.image_url,
                              customisations: editForm?.customisations ?? item.customisations,
                              always_available: editForm?.always_available ?? item.always_available,
                            }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setEditingId(null);
                            setEditForm(null);
                            // Refresh items
                            const itemRes = await fetch('/api/food/admin');
                            const itemData = await itemRes.json();
                            if (itemRes.ok) setItems(itemData.items || []);
                          } else {
                            setError(data.error || 'Failed to update item');
                          }
                        } catch (err) {
                          setError('Failed to update item');
                        }
                        setLoading(false);
                      }}>
                      <input
                        name="name"
                        defaultValue={item.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Name"
                        required
                      />
                      <textarea
                        name="description"
                        defaultValue={item.description}
                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Description"
                      />
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={item.price}
                        onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                        placeholder="Price"
                        required
                      />
                      <input
                        name="image"
                        defaultValue={item.image_url}
                        onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))}
                        placeholder="Image URL"
                      />
                      <input
                        name="customisations"
                        defaultValue={Array.isArray(item.customisations) ? item.customisations.map(c => `${c.name}${c.price ? `:${c.price}` : ''}`).join(',') : ''}
                        onChange={e => setEditForm(f => ({ ...f, customisations: e.target.value }))}
                        placeholder="Customisations (e.g. Cheese:1,Bacon:1.5)"
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          name="always_available"
                          type="checkbox"
                          defaultChecked={item.always_available}
                          onChange={e => setEditForm(f => ({ ...f, always_available: e.target.checked }))}
                        />
                        Available
                      </label>
                      <button type="submit" disabled={loading}>Save</button>
                      <button type="button" style={{ marginLeft: 8 }} onClick={() => { setEditingId(null); setEditForm(null); }}>Cancel</button>
                    </form>
                  )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
