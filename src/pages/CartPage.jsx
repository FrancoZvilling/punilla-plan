// src/pages/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/Cart/CartItem'; // Importa el componente CartItem
import styles from '../components/Cart/CartStyles.module.css'; // Estilos del carrito
import pageStyles from './PageStyles.module.css'; // Estilos comunes de página
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const CartPage = () => {
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const whatsappNumber = "5493541315119"; // Reemplaza con tu número

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "Hola! Quisiera realizar el siguiente pedido:\n\n";
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.name} - $${new Intl.NumberFormat('es-AR').format(item.price * item.quantity)}\n`;
    });
    message += `\nTotal: $${new Intl.NumberFormat('es-AR').format(getTotalPrice())}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    // Opcional: limpiar el carrito después de enviar a WhatsApp
    // clearCart();
    // navigate('/'); // Redirigir a la home
  };

  return (
    <motion.div
      className={`${pageStyles.pageContainer} ${styles.cartPageContainer}`}
      initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
    >
      <div className="container">
        <button onClick={() => navigate(-1)} className={`${pageStyles.backLink} ${styles.backButtonCart}`}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Seguir Comprando
        </button>
        <h1 className={styles.cartTitle}>Tu Carrito de Compras</h1>

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
                <span>Subtotal ({getTotalItems()} productos):</span>
                <span>${new Intl.NumberFormat('es-AR').format(getTotalPrice())}</span>
              </div>
              {/* Aquí podrías añadir filas para Envío, Descuentos, etc. */}
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total:</span>
                <span>${new Intl.NumberFormat('es-AR').format(getTotalPrice())}</span>
              </div>
              <button onClick={handleCheckout} className={styles.checkoutButton}>
                <FaWhatsapp style={{ marginRight: '10px' }} />
                Finalizar Compra por WhatsApp
              </button>
              <button onClick={clearCart} className={styles.clearCartButton}>
                Vaciar Carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;