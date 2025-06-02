// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className={styles.logoContainer}>
        <motion.div
          className={styles.logoPP}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          PP
        </motion.div>

        <motion.div
          className={styles.blueTrail}
          initial={{ width: 0, opacity: 0, x: -10 }} // Inicia con ancho 0 y ligeramente a la izquierda de su posición final
          animate={{ width: 'clamp(40px, 10vw, 70px)', opacity: 1, x: 0 }} // Anima el ancho y la posición
          transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          {/* La estela ahora es un simple div estilizado con CSS */}
        </motion.div>

        <motion.div
          className={styles.redCircle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9, type: 'spring', bounce: 0.4 }}
        >
        </motion.div>
      </div>

      <motion.h2
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        Punilla Plan
      </motion.h2>
      {/* Podrías añadir el "Venta de Equipamientos Comerciales" aquí si lo deseas */}
      {/* <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        Venta de Equipamientos Comerciales
      </motion.p> */}
    </motion.section>
  );
};

export default HeroSection;