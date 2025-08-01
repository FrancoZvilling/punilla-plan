// src/components/Cart/CartItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import styles from './CartStyles.module.css';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
};

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImageContainer}>
        <img src={item.image} alt={item.name} className={styles.cartItemImage} />
      </div>
      <div className={styles.cartItemInfo}>
        <Link to={`/producto/${item.id}`} className={styles.cartItemNameLink}>
          <h3 className={styles.cartItemName}>{item.name}</h3>
        </Link>

        

        <div className={styles.quantityControls}>
          <button onClick={handleDecreaseQuantity} aria-label="Disminuir cantidad"> <FaMinus /> </button>
          <span>{item.quantity}</span>
          <button onClick={handleIncreaseQuantity} aria-label="Aumentar cantidad"> <FaPlus /> </button>
        </div>
      </div>

      

      <button
        onClick={() => removeFromCart(item.id)}
        className={styles.removeItemButton}
        aria-label="Eliminar producto"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;