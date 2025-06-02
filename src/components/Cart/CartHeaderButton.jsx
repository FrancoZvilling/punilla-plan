// src/components/Cart/CartHeaderButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import styles from './CartStyles.module.css'; // Seguimos usando CartStyles.module.css por ahora

// Cambiamos el nombre de la función del componente para que coincida con el archivo
const CartHeaderButton = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.div
      className={styles.persistentCartButtonContainer}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.3 }}
    >
      <Link to="/carrito" className={styles.cartLinkPersistent}>
        <FaShoppingCart className={styles.cartIconPersistent} />
        <span className={styles.cartTextPersistent}>Tu Carrito</span>
        {totalItems > 0 && (
          <span className={styles.itemCountBadgePersistent}>{totalItems}</span>
        )}
      </Link>
    </motion.div>
  );
};

export default CartHeaderButton; // Asegúrate que la exportación coincide