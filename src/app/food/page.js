"use client";
import React from "react";
import Basket from "./components/Basket";
import { createClient } from "@supabase/supabase-js";

// MenuItem component outside FoodPage for clarity
function MenuItem({ item, addToBasket, showSummary }) {
  const [selected, setSelected] = React.useState([]);
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <strong>{item.name}</strong> <span>£{item.price}</span><br />
      <span>{item.description}</span><br />
      {item.customisations?.length > 0 ? (
        <div style={{ marginTop: 8 }}>
          <span>Customisations:</span>
          {item.customisations.map((c, idx) => (
            <label key={c.name} style={{ marginLeft: 12 }}>
              <input
                type="checkbox"
                checked={selected.includes(idx)}
                onChange={e => {
                  setSelected(sel =>
                    e.target.checked
                      ? [...sel, idx]
                      : sel.filter(i => i !== idx)
                  );
                }}
              />
              {c.name} (+£{c.price})
            </label>
          ))}
        </div>
      ) : null}
      <button style={{ marginTop: 8 }} onClick={() => addToBasket(item, selected)} disabled={showSummary}>Add to Basket</button>
    </div>
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// Food menu & basket page placeholder
export default function FoodPage() {
  const [categories, setCategories] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [basket, setBasket] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [allergies, setAllergies] = React.useState('');
  const [showSummary, setShowSummary] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [orderId, setOrderId] = React.useState(null);
  const [confirmationSent, setConfirmationSent] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarFade, setSnackbarFade] = React.useState(false);

  React.useEffect(() => {
    async function fetchMenu() {
      const catRes = await fetch('/api/food/categories');
      const catData = await catRes.json();
      if (catRes.ok) {
        setCategories(catData.categories || []);
      } else {
        setCategories([]);
      }
      const itemRes = await fetch('/api/food/admin');
      const itemData = await itemRes.json();
      if (itemRes.ok) {
        setMenu(itemData.items || []);
      } else {
        setMenu([]);
      }
    }
    fetchMenu();
  }, []);

  function addToBasket(item, customisationIdxs) {
    setBasket(prev => [
      ...prev,
      {
        ...item,
        customisations: customisationIdxs.map(idx => item.customisations[idx]),
      },
    ]);
    setSnackbarVisible(true);
    setSnackbarFade(false);
  }

  React.useEffect(() => {
    if (snackbarVisible) {
      const fadeTimer = setTimeout(() => setSnackbarFade(true), 1500);
      const hideTimer = setTimeout(() => setSnackbarVisible(false), 2000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [snackbarVisible]);

  function removeFromBasket(idx) {
    setBasket(prev => prev.filter((_, i) => i !== idx));
  }

  function getTotal() {
    return basket.reduce((sum, item) => {
      const customTotal = item.customisations?.reduce((cSum, c) => cSum + (c.price || 0), 0) || 0;
      return sum + item.price + customTotal;
    }, 0);
  }

  function handleOrder() {
    setShowSummary(true);
  }

  return (
    <div>
      {snackbarVisible && (
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
          opacity: snackbarFade ? 0 : 1,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
        }}>
          <span role="status" aria-live="polite">Item added to checkout</span>
        </div>
      )}
      {showSummary ? (
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
              </li>
            ))}
          </ul>
          <div>Notes: {notes}</div>
          <div>Allergies: {allergies}</div>
          <div style={{ marginTop: 16, fontWeight: 'bold' }}>Total: £{getTotal().toFixed(2)}</div>
          <div style={{ marginTop: 24 }}>
            <button onClick={() => setShowSummary(false)}>Edit Order</button>
            {/* TODO: Cancel order, manage via UUID link, cutoff logic */}
          </div>
          {confirmationSent && <div style={{ marginTop: 16, color: 'green' }}>Confirmation email sent! (stub)</div>}
        </div>
      ) : (
        <div style={{ maxWidth: 700, margin: '32px auto', padding: 24 }}>
          <h1>Food Menu</h1>
          {categories.sort((a, b) => a.order - b.order).map(category => {
            const catItems = menu
              .filter(item => item.category_id === category.id && item.always_available)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            if (catItems.length === 0) return null;
            return (
              <div key={category.id} style={{ marginBottom: 32 }}>
                <h2>{category.name}</h2>
                {catItems.map(item => (
                  <MenuItem key={item.id} item={item} addToBasket={addToBasket} showSummary={showSummary} />
                ))}
              </div>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <label>
              Notes / Special Requests:<br />
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add any notes or requests..." style={{ width: '100%' }} />
            </label>
          </div>
          <div style={{ marginTop: 16 }}>
            <label>
              Allergies:<br />
              <input value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="List any allergies..." style={{ width: '100%' }} />
            </label>
          </div>
          <Basket
            basket={basket}
            onRemove={removeFromBasket}
          />
          <div>
            <button onClick={handleOrder} disabled={basket.length === 0}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
