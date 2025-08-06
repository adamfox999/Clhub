"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Basket from "./components/Basket";
import BottomSheet from "./components/BottomSheet";
import styles from "./FoodPage.module.css";

// MenuItem component outside FoodPage for clarity
function MenuItem({ item, addToBasket }) {
  const [selected, setSelected] = React.useState([]);
  const [showCustomisations, setShowCustomisations] = React.useState(false);
  
  return (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      borderRadius: 8, 
      padding: 16, 
      marginBottom: 12, 
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <strong style={{ fontSize: '15px', color: '#333' }}>{item.name}</strong>
            <span style={{ 
              fontSize: '15px', 
              fontWeight: 'bold', 
              color: '#007bff'
            }}>£{item.price}</span>
          </div>
          <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.3' }}>{item.description}</div>
        </div>
        
        {item.customisations?.length > 0 && (
          <button
            onClick={() => setShowCustomisations(!showCustomisations)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
              color: '#666',
              fontSize: '12px'
            }}
          >
            <span style={{ marginRight: 4 }}>Customise</span>
            <span style={{ 
              transform: showCustomisations ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              fontSize: '12px'
            }}>▼</span>
          </button>
        )}
      </div>
      
      {item.customisations?.length > 0 && showCustomisations && (
        <div style={{ 
          marginBottom: 12, 
          padding: '8px 0',
          borderTop: '1px solid #f0f0f0',
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {item.customisations.map((c, idx) => (
              <label key={c.name} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '4px 0',
                fontSize: '14px'
              }}>
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
                  style={{
                    marginRight: 8,
                    width: '14px',
                    height: '14px',
                    accentColor: '#007bff'
                  }}
                />
                <span style={{ color: '#333' }}>
                  {c.name} <span style={{ color: '#007bff', fontWeight: '500' }}>(+£{c.price})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => addToBasket(item, selected)} 
        style={{ 
          width: '100%',
          padding: '8px 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#fff',
          background: '#007bff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#0056b3';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#007bff';
        }}
      >
        Add to Basket
      </button>
    </div>
  );
}

// Client component for interactive functionality
export default function FoodPageClient({ initialCategories, initialMenu }) {
  const router = useRouter();
  const [categories] = React.useState(initialCategories);
  const [menu] = React.useState(initialMenu);
  const [basket, setBasket] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [allergies, setAllergies] = React.useState('');
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarFade, setSnackbarFade] = React.useState(false);
  const [bottomSheetExpanded, setBottomSheetExpanded] = React.useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = React.useState(false);

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

  async function handleOrder() {
    // Prevent duplicate orders
    if (isSubmittingOrder) {
      return;
    }

    setIsSubmittingOrder(true);

    try {
      // Prepare order data for the API
      const orderData = {
        user_email: 'guest@example.com', // You might want to get this from auth context
        event_id: null, // Set this if you have an event system
        items: basket.map(item => ({
          name: item.name,
          price: item.price,
          quantity: 1, // Assuming quantity of 1 for each basket item
          customisations: item.customisations || []
        })),
        notes: notes,
        allergies: allergies,
        requested_time: new Date().toISOString() // Current time as requested time
      };

      // Save order using the existing API
      const response = await fetch('/api/food/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving order:', errorData);
        alert('Error submitting order. Please try again.');
        setIsSubmittingOrder(false); // Re-enable button on error
        return;
      }

      const result = await response.json();
      console.log('Order created:', result);

      // Close bottom sheet and navigate to confirmation
      setBottomSheetExpanded(false);
      
      // Navigate to order confirmation page with order data
      const confirmationData = {
        orderNumber: result.order.order_number,
        orderId: result.order.id,
        basket: basket,
        notes: notes,
        allergies: allergies,
        total: getTotal(),
        confirmationSent: false
      };
      
      // Store order data in sessionStorage so it can be accessed on the confirmation page
      sessionStorage.setItem('orderData', JSON.stringify(confirmationData));
      
      router.push('/food/order');
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
      setIsSubmittingOrder(false); // Re-enable button on error
    }
  }

  function toggleBottomSheet() {
    setBottomSheetExpanded(!bottomSheetExpanded);
  }

  return (
    <div className={styles.container}>
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
      
      <div className={styles.layout}>
        {/* Main Menu Column */}
        <div className={styles.menuColumn}>
          <h1>Wednesday Night Pizza</h1>
          <p style={{padding: '16px 0'}}>Please order your pizza for this upcoming Wednesday. You&apos;ll be able to order on the night, but we strongly recommend pre-ordering to avoid disappointment. If you have any special dietary requirements, please place your order by the end of Monday.</p>
          
          {categories.sort((a, b) => a.order - b.order).map(category => {
            const catItems = menu
              .filter(item => item.category_id === category.id && item.always_available)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            if (catItems.length === 0) return null;
            return (
              <div key={category.id} style={{ marginBottom: 32 }}>
                <h2>{category.name}</h2>
                {catItems.map(item => (
                  <MenuItem key={item.id} item={item} addToBasket={addToBasket} />
                ))}
              </div>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <label>
              Notes / Special Requests:<br />
              <textarea 
                value={notes} 
                onChange={e => setNotes(e.target.value)} 
                placeholder="Add any notes or requests..." 
                className={`${styles.formInput} ${styles.textArea}`}
              />
            </label>
          </div>
          <div style={{ marginTop: 16 }}>
            <label>
              Allergies:<br />
              <input 
                value={allergies} 
                onChange={e => setAllergies(e.target.value)} 
                placeholder="List any allergies..." 
                className={styles.formInput}
              />
            </label>
          </div>
          
          {/* Information and Allergens Section */}
          <div 
            data-section="allergens"
            style={{ marginTop: 48, padding: '24px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#495057' }}>Information & Allergens</h3>
          
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '8px', color: '#6c757d', fontSize: '16px' }}>Allergen Information</h4>
              <div style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.5' }}>
                <p style={{ margin: '0 0 12px 0' }}>
                  Vegan or gluten-free pizzas available with 48 hours notice (£1 charge for gluten-free bases).
                </p>
                <p style={{ margin: '0 0 12px 0' }}>
                  Although we take great care, we only have one small oven, so we cannot guarantee zero contamination of flour on gluten-free bases (not suitable for people with coeliac disease).
                </p>
                <p style={{ margin: '0' }}>
                  We handle all allergens in our prep kitchens and cannot guarantee zero cross-contamination of any allergen.
                </p>
              </div>
            </div>
            
            
          </div>
        </div>
        
        {/* Sticky container for basket and allergen card */}
        <div style={{
          position: 'sticky',
          top: '16px',
          height: 'fit-content'
        }}>
          {/* Basket/Order Column */}
          <div className={styles.basketColumn}>
            <Basket
              basket={basket}
              onRemove={removeFromBasket}
            />
            <div>
              <div className={styles.totalDisplay}>
                Total: £{getTotal().toFixed(2)}
              </div>
              <button 
                onClick={handleOrder} 
                disabled={true}
                className={styles.confirmButton}
              >
                Pre-ordering closed
              </button>
            </div>
          </div>
          
          {/* Allergen Information Card - Below basket card but in same sticky container */}
          <div className={styles.allergenCard}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px', marginRight: '8px' }}>⚠️</span>
              <strong style={{ color: '#856404' }}>Allergy Information</strong>
            </div>
            <p style={{ margin: '0 0 8px 0', color: '#856404', lineHeight: '1.4' }}>
              Please see allergen information from the caterer.
            </p>
            <button
              onClick={() => {
                const allergenSection = document.querySelector('[data-section="allergens"]');
                if (allergenSection) {
                  allergenSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                background: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#e0a800'}
              onMouseOut={(e) => e.target.style.background = '#ffc107'}
            >
              View Allergen Details
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Sheet for Mobile/Tablet */}
      <BottomSheet
        basket={basket}
        onRemove={removeFromBasket}
        getTotal={getTotal}
        onConfirmOrder={handleOrder}
        isExpanded={bottomSheetExpanded}
        onToggleExpanded={toggleBottomSheet}
        isSubmittingOrder={isSubmittingOrder}
      />
    </div>
  );
}
