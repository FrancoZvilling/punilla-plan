// src/components/common/InstallmentTable/InstallmentTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './InstallmentTable.module.css';
import { FaCheckCircle } from 'react-icons/fa'; // Icono para el botón de elegir

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
};

const InstallmentTable = ({ calculatedPlans, isInteractive, onPlanSelected, productName }) => {
  if (!calculatedPlans || calculatedPlans.length === 0) {
    return <p>No hay planes de financiación disponibles para este producto.</p>;
  }

  const renderPlanRow = (planDetails, planKey) => (
    <motion.tr
      key={`${planDetails.name}-${planKey}`} // Clave única
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: planKey * 0.05 }} // Animación escalonada
    >
      <td>{planDetails.days} días</td>
      <td>{formatCurrency(planDetails.dailyPayment)}</td>
      <td>{formatCurrency(planDetails.weeklyPayment)}</td>
      <td>{formatCurrency(planDetails.totalToPay)}</td>
      {isInteractive && (
        <td>
          <motion.button
            className={styles.selectPlanButton}
            onClick={() => onPlanSelected(planDetails)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCheckCircle /> Elegir Plan
          </motion.button>
        </td>
      )}
    </motion.tr>
  );

  return (
    <div className={styles.installmentTableContainer}>
      {productName && <h3 className={styles.tableProductTitle}>Financiación para: {productName}</h3>}
      
      <div className={styles.planCategory}>
        <h4 className={styles.categoryTitle}>Plan Pago Puntual (con descuento)</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Días</th>
              <th>Cuota Diaria</th>
              <th>Cuota Semanal (6 días)</th>
              <th>Total a Pagar</th>
              {isInteractive && <th>Acción</th>}
            </tr>
          </thead>
          <tbody>
            {calculatedPlans.map((planPair, index) => renderPlanRow(planPair.punctual, `punctual-${index}`))}
          </tbody>
        </table>
      </div>

      <div className={styles.planCategory}>
        <h4 className={styles.categoryTitle}>Plan Sin Descuento</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Días</th>
              <th>Cuota Diaria</th>
              <th>Cuota Semanal (6 días)</th>
              <th>Total a Pagar</th>
              {isInteractive && <th>Acción</th>}
            </tr>
          </thead>
          <tbody>
            {calculatedPlans.map((planPair, index) => renderPlanRow(planPair.noDiscount, `noDiscount-${index}`))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstallmentTable;