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
    // Solo permitir aumentar cantidad si no es un plan de cuotas (o si la lógica de negocio lo permite)
    if (item.purchaseType === 'contado') {
      updateQuantity(item.id, item.planDescription, item.quantity + 1);
    } else {
      // Para planes de cuotas, usualmente la cantidad es 1.
      alert("Para cambiar la cantidad de un plan de financiamiento, por favor elimínelo y agréguelo nuevamente con las condiciones deseadas, o contacte a ventas.");
    }
  };

  const handleDecreaseQuantity = () => {
    if (item.purchaseType === 'contado') {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.planDescription, item.quantity - 1);
      } else {
        removeFromCart(item.id, item.planDescription); // Si es 1 y disminuye, se remueve
      }
    } else {
      // Para planes de cuotas, si la cantidad es 1, disminuir significa remover.
      removeFromCart(item.id, item.planDescription);
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

        {item.planDescription && (
          <p className={styles.cartItemPlanDescription}>{item.planDescription}</p>
        )}

        {item.purchaseType === 'cuotas' && item.installmentDetails && (
          <div className={styles.cartItemInstallmentDetails}>
            <p>Cuota Diaria: {formatCurrency(item.installmentDetails.dailyPayment)}</p>
            <p>Total del Plan: {formatCurrency(item.installmentDetails.totalToPay)}</p>
          </div>
        )}

        {item.purchaseType === 'contado' && (
             <p className={styles.cartItemPrice}>
                Precio Contado: {formatCurrency(item.finalPrice)}
            </p>
        )}

        <div className={styles.quantityControls}>
          <button
            onClick={handleDecreaseQuantity}
            aria-label="Disminuir cantidad"
            // Si es plan de cuotas, el botón de disminuir podría solo funcionar si la cantidad es > 0 (y llevaría a remover)
            // o directamente no estar si la cantidad siempre es 1.
            // Por ahora, si es plan de cuotas, disminuir siempre remueve.
          >
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            aria-label="Aumentar cantidad"
            disabled={item.purchaseType === 'cuotas'} // Deshabilitar Aumentar para planes de cuotas
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className={styles.cartItemSubtotal}>
        <p>Subtotal: {formatCurrency(item.finalPrice * item.quantity)}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id, item.planDescription)}
        className={styles.removeItemButton}
        aria-label="Eliminar producto"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;