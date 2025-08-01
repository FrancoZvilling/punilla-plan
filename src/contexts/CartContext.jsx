// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('punillaPlanCart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
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
    console.log("Producto agregado/actualizado en CartContext:", product);
  };

  const removeFromCart = (productId) => {
    let itemName = "";
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === productId);
        if (itemToRemove) itemName = itemToRemove.name;
        return prevItems.filter(item => item.id !== productId);
    });
    if (itemName) {
        toast.error(`${itemName} eliminado del carrito.`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  
  const clearCart = () => {
    if (cartItems.length > 0) {
        setCartItems([]);
        toast.warn("El carrito ha sido vaciado.");
    } else {
        setCartItems([]);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
 

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};