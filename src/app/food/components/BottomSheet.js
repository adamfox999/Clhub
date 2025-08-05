import React from 'react';
import styles from '../FoodPage.module.css';

export default function BottomSheet({ 
  basket = [], 
  onRemove = () => {}, 
  getTotal = () => 0, 
  onConfirmOrder = () => {},
  isExpanded = false,
  onToggleExpanded = () => {},
  isSubmittingOrder = false
}) {
  const itemCount = basket.length;
  
  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className={styles.backdrop} 
          onClick={onToggleExpanded}
        />
      )}
      
      {/* Bottom Sheet */}
      <div className={`${styles.bottomSheet} ${isExpanded ? styles.expanded : ''}`}>
        {/* Handle/Drag indicator */}
        <div className={styles.handle} onClick={onToggleExpanded} />
        
        {/* Collapsed view - always visible */}
        <div className={styles.bottomSheetHeader}>
          <div className={styles.basketSummary} onClick={onToggleExpanded}>
            <div className={styles.basketInfo}>
              <span className={styles.itemCount}>
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
              <span className={styles.totalPrice}>
                £{getTotal().toFixed(2)}
              </span>
            </div>
            <div className={styles.expandIcon}>
              {isExpanded ? '⌄' : '⌃'}
            </div>
          </div>
          <button 
            onClick={onConfirmOrder} 
            disabled={basket.length === 0 || isSubmittingOrder}
            className={styles.bottomSheetButton}
          >
            {isSubmittingOrder ? 'Submitting...' : 'Confirm Pre-Order'}
          </button>
        </div>
        
        {/* Expanded content */}
        {isExpanded && (
          <div className={styles.bottomSheetContent}>
            <h3 style={{ margin: '0 0 16px 0' }}>Your Basket</h3>
            {basket.length === 0 ? (
              <div className={styles.emptyBasket}>No items in basket.</div>
            ) : (
              <ul className={styles.basketList}>
                {basket.map((item, idx) => (
                  <li key={idx} className={styles.basketItem}>
                    <div className={styles.itemDetails}>
                      <strong>{item.name}</strong>
                      <span className={styles.itemPrice}>£{item.price}</span>
                      {item.customisations?.length > 0 && (
                        <div className={styles.customisations}>
                          {item.customisations.map(c => c.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <button 
                      className={styles.removeButton}
                      onClick={() => onRemove(idx)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
