// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al inicio
    const localData = localStorage.getItem('punillaPlanCart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // Guardar carrito en localStorage cuando cambie
    localStorage.setItem('punillaPlanCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si el item ya existe, actualiza la cantidad
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Si es un item nuevo, agrégalo
        return [...prevItems, { ...product, quantity }];
      }
    });
    // Aquí podríamos añadir una notificación visual de "Producto agregado"
    console.log(`${product.name} agregado al carrito.`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item // Asegura que la cantidad no sea menor a 1
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};