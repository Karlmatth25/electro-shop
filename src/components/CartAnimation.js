import React, { useEffect } from 'react';
import './CartAnimation.css';

function CartAnimation({ onEnd = () => {} }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div 
      className="cart-animation"
      style={{
        position: 'fixed',
        right: '20px',
        top: '20px',
        background: '#28a745',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      ✔ Article ajouté au panier !
    </div>
  );
}

export default CartAnimation;