// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import logoImage from '../../assets/images/logo-punilla-plan.png'; // ASEGÚRATE QUE ESTA RUTA Y NOMBRE SON CORRECTOS

const HeroSection = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Contenedor del Logo Imagen (ya no necesita el logoAndEffectContainer si solo está el logo) */}
      <motion.div
        className={styles.logoImageContainer}
        initial={{ opacity: 0, y: -30, scale: 0.9 }} // Animación de entrada para el logo
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <img 
          src={logoImage} 
          alt="Logo Punilla Plan" 
          className={styles.logoImage} 
          onError={(e) => { 
            console.error("Error al cargar la imagen del logo:", e.target.src);
            // Opcional: e.target.style.display = 'none'; 
          }}
        />
      </motion.div>
      {/* No hay estela, ni círculo, ni texto "PP" o "Punilla Plan" */}
    </motion.section>
  );
};

export default HeroSection;