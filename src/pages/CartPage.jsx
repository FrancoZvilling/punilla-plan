// src/pages/CartPage.jsx
import React, { useState } from 'react'; // Añadido useState
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/Cart/CartItem';
import styles from '../components/Cart/CartStyles.module.css';
import pageStyles from './PageStyles.module.css';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from '../components/common/Modal/Modal'; // Importar Modal
import { toast } from 'react-toastify'; // Para el toast si ya está vacío

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
};

const CartPage = () => {
  const { cartItems, getTotalItems, clearCart } = useCart(); // Quitamos getTotalPrice
  const navigate = useNavigate();
  const whatsappNumber = "5493518354396";

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    let message = "Hola! Quisiera consultar por los siguientes productos:\n\n";
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.name}\n`; // Mensaje solo con cantidad y nombre
    });
    message += `\nTotal de productos: ${getTotalItems()}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      className={`${pageStyles.pageContainer} ${styles.cartPageContainer}`}
      initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
    >
      <div className="container">
        <button onClick={() => navigate(-1)} className={`${pageStyles.backLink} ${styles.backButtonCart}`}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Seguir Viendo Productos
        </button>
        <h1 className={styles.cartTitle}>Tu Pedido</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            <p>Tu carrito está vacío.</p>
            <Link to="/">Explora nuestros productos</Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItemsList}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <aside className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
              <div className={styles.summaryRow}>
                <span>Total de productos:</span>
                <span>{getTotalItems()}</span>
              </div>
              <button onClick={handleCheckout} className={styles.checkoutButton}>
                <FaWhatsapp style={{ marginRight: '10px' }} />
                Consultar por WhatsApp
              </button>
              <button onClick={clearCart} className={styles.clearCartButton}>
                Vaciar Pedido
              </button>
            </aside>
          </div>
        )}
      </div>
      {/* El modal de confirmación de vaciar carrito puede seguir aquí si quieres */}
    </motion.div>
  );
};

export default CartPage;