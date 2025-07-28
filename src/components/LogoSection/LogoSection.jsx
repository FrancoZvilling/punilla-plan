// src/components/LogoSection/LogoSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './LogoSection.module.css';
import logoImage from '../../assets/images/logo-punilla-plan.png'; // Importa tu logo

const LogoSection = () => {
  return (
    // Ahora es una sección con fondo y espaciado propio
    <section className={styles.logoSection}>
      <motion.div
        className={styles.logoWrapper}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <img src={logoImage} alt="Logo de Punilla Plan" className={styles.logoImage} />
      </motion.div>
    </section>
  );
};

export default LogoSection;