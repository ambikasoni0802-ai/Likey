import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.product._id === product._id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.product._id !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

