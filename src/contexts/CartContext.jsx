// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(undefined); // Inicializar con undefined es una práctica común

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    // Este error se lanzará si useCart se usa fuera de CartProvider
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
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.planDescription === product.planDescription
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        if (product.purchaseType === 'contado') {
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return updatedItems; // La notificación de éxito se maneja en el componente que llama
        } else {
            toast.info(`"${product.name} (${product.planDescription})" ya está en tu carrito.`);
            return prevItems; // No modificar si es el mismo plan de cuotas
        }
      } else {
        return [...prevItems, { ...product, quantity }]; // La notificación de éxito se maneja en el componente que llama
      }
    });
    console.log("Producto procesado en CartContext:", product);
  };

  const removeFromCart = (productId, planDescription) => {
    let itemName = "";
    let itemExisted = false;
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === productId && item.planDescription === planDescription);
        if (itemToRemove) {
            itemName = itemToRemove.name;
            itemExisted = true;
        }
        return prevItems.filter(item => !(item.id === productId && item.planDescription === planDescription));
    });
    if (itemExisted) {
        toast.error(`${itemName} eliminado del carrito.`);
    }
  };

  const updateQuantity = (productId, planDescription, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === productId && item.planDescription === planDescription)
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
    // Opcional: toast.success('Cantidad actualizada');
  };
  
  const clearCart = () => {
    if (cartItems.length > 0) {
        setCartItems([]);
        toast.warn("El carrito ha sido vaciado.");
    } else {
        // No hacer nada o toast.info("El carrito ya está vacío");
        setCartItems([]); // Asegurar que el estado es []
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.finalPrice * item.quantity);
    }, 0);
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