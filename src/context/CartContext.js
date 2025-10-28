import React, { createContext, useState } from 'react'; // Supprime useContext

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    updateCartTotal();
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    updateCartTotal();
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    updateCartTotal();
  };

  const clearCart = () => {
    setCart([]);
    setCartTotal(0);
  };

  const updateCartTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  };

  return (
    <CartContext.Provider value={{ cart, cartTotal, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };