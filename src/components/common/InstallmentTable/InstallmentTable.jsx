// src/components/common/InstallmentTable/InstallmentTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './InstallmentTable.module.css';
import { FaCheckCircle } from 'react-icons/fa';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
};

const InstallmentTable = ({ calculatedPlans, isInteractive, onPlanSelected, productName }) => {
  if (!calculatedPlans || calculatedPlans.length === 0) {
    return <p>No hay planes de financiación disponibles para este producto.</p>;
  }

  // Textos abreviados para los data-label en MÓVIL
  const mobileLabels = {
    days: "Plan (Días)",
    daily: "x Día",        // Sin $
    weekly: "x Semana",   // Sin $
    total: "Total",       // Sin $
    action: "Elegir"
  };

  const renderPlanRow = (planDetails, planKey) => (
    <motion.tr
      key={`${planDetails.name}-${planKey}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (parseInt(planKey.split('-')[1]) || 0) * 0.05 + (planKey.startsWith('punctual') ? 0 : calculatedPlans.length * 0.05) }}
    >
      {/* data-label usa los textos de mobileLabels */}
      <td data-label={mobileLabels.days}>{planDetails.days} días</td>
      <td data-label={mobileLabels.daily}>{formatCurrency(planDetails.dailyPayment)}</td>
      <td data-label={mobileLabels.weekly}>{formatCurrency(planDetails.weeklyPayment)}</td>
      <td data-label={mobileLabels.total}>{formatCurrency(planDetails.totalToPay)}</td>
      {isInteractive && (
        <td data-label={mobileLabels.action}>
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
              {/* Encabezados para ESCRITORIO con texto original */}
              <th>Días del plan</th>
              <th>Cuota diaria</th>
              <th>Cuota semanal (6 días)</th>
              <th>Total a pagar</th>
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
              {/* Encabezados para ESCRITORIO con texto original */}
              <th>Días del plan</th>
              <th>Cuota diaria</th>
              <th>Cuota semanal (6 días)</th>
              <th>Total a pagar</th>
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