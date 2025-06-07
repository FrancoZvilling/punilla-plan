// src/components/ProductList/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import styles from './ProductList.module.css';
import Modal from '../common/Modal/Modal';
import InstallmentTable from '../common/InstallmentTable/InstallmentTable';
import { calculateAllPlanDetails } from '../../data/paymentPlans';
import { toast } from 'react-toastify'; // <--- IMPORTAR toast

const cardVariants = { /* ... (sin cambios) ... */ };

const ProductCard = ({ product }) => {
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [calculatedPlans, setCalculatedPlans] = useState([]);

  const handleViewInstallments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const plans = calculateAllPlanDetails(product.price);
    setCalculatedPlans(plans);
    setShowInstallmentModal(true);
    // toast.info("Mostrando planes de pago disponibles."); // Opcional: Notificación al abrir modal
  };

  const closeInstallmentModal = () => {
    setShowInstallmentModal(false);
  };

  return (
    <>
      <motion.div /* ... (sin cambios) ... */ >
        {/* ... (contenido de la tarjeta sin cambios) ... */}
         <Link to={`/producto/${product.id}`} className={styles.cardLinkWrapper}>
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.priceContainer}>
              <p className={styles.productPrice}>
                ${new Intl.NumberFormat('es-AR').format(product.price)}
                <span className={styles.priceTag}> (precio de contado)</span>
              </p>
              <button
                onClick={handleViewInstallments}
                className={styles.viewInstallmentsLink}
              >
                ver precio en cuotas
              </button>
            </div>
            <ul className={styles.technicalDetailsList}>
              {product.technicalDetails.slice(0, 2).map((detail, index) => (
                <li key={index} className={styles.technicalDetailItem}>{detail}</li>
              ))}
              {product.technicalDetails.length > 2 && <li className={styles.technicalDetailItem}>...más</li>}
            </ul>
          </div>
        </Link>
        <div className={styles.cardActions}>
          <Link to={`/producto/${product.id}`} className={`${styles.actionButton} ${styles.viewDetailsButton}`}>
            <FaEye className={styles.actionIcon} /> Ver Detalles
          </Link>
        </div>
      </motion.div>

      <Modal
        isOpen={showInstallmentModal}
        onClose={closeInstallmentModal}
        title={`Planes de Pago para ${product.name}`}
      >
        <InstallmentTable
          calculatedPlans={calculatedPlans}
          isInteractive={false}
          productName={product.name}
        />
      </Modal>
    </>
  );
};

export default ProductCard;