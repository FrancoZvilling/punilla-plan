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
  const { cartItems, getTotalPrice, getTotalItems, clearCart: performClearCart } = useCart(); // Renombrar
  const navigate = useNavigate();
  const whatsappNumber = "5493518354396";

  const [showConfirmClearCartModal, setShowConfirmClearCartModal] = useState(false); // Estado para el modal

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    let message = "Hola! Quisiera realizar el siguiente pedido:\n\n";
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.name}`;
      if (item.planDescription) {
        message += ` (${item.planDescription})`;
      }
      message += ` - ${formatCurrency(item.finalPrice * item.quantity)}\n`;
      if (item.purchaseType === 'cuotas' && item.installmentDetails) {
          message += `    (Detalle: ${item.installmentDetails.days} cuotas diarias de ${formatCurrency(item.installmentDetails.dailyPayment)})\n`;
      }
    });
    message += `\nTotal del Pedido: ${formatCurrency(getTotalPrice())}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenClearCartModal = () => {
    if (cartItems.length > 0) {
      setShowConfirmClearCartModal(true);
    } else {
      toast.info("El carrito ya está vacío.");
    }
  };

  const handleConfirmClearCart = () => {
    performClearCart(); // Llama a la función del contexto (que ya tiene su toast.warn)
    setShowConfirmClearCartModal(false);
  };

  const handleCloseClearCartModal = () => {
    setShowConfirmClearCartModal(false);
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
                <CartItem key={`${item.id}-${item.planDescription}`} item={item} />
              ))}
            </div>

            <aside className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal ({getTotalItems()} productos):</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total:</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              <button onClick={handleCheckout} className={styles.checkoutButton}>
                <FaWhatsapp style={{ marginRight: '10px' }} />
                Finalizar Compra por WhatsApp
              </button>
              <button onClick={handleOpenClearCartModal} className={styles.clearCartButton}>
                Vaciar Carrito
              </button>
            </aside>
          </div>
        )}
      </div>

      <Modal
        isOpen={showConfirmClearCartModal}
        onClose={handleCloseClearCartModal}
        title="Confirmar Acción"
      >
        <div className={styles.confirmModalContent}>
          <p>¿Estás seguro de que deseas vaciar el carrito?</p>
          <div className={styles.confirmModalActions}>
            <motion.button
              className={`${styles.modalButton} ${styles.modalButtonConfirm}`}
              onClick={handleConfirmClearCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sí, Vaciar
            </motion.button>
            <motion.button
              className={`${styles.modalButton} ${styles.modalButtonCancel}`}
              onClick={handleCloseClearCartModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default CartPage;