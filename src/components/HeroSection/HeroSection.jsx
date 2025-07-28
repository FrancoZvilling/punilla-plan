// src/components/HeroSection/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

// Importa tus imágenes para el carrusel desde la carpeta 'hero'
import heroImage1 from '../../assets/images/hero/hero-1.jpg'; // Ruta corregida y sin ';'
import heroImage2 from '../../assets/images/hero/hero-2.jpg';
import heroImage3 from '../../assets/images/hero/hero-3.jpg';

// El array ahora usa las imágenes locales importadas
const heroImages = [
  heroImage1,
  heroImage2,
  heroImage3
];

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    // Configura un intervalo para cambiar la imagen cada 3 segundos (3000 ms)
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(interval);
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez (al montar)

  return (
    <section className={styles.heroSlider}>
      <AnimatePresence>
        <motion.div
          key={imageIndex} // La key es crucial para que AnimatePresence detecte el cambio
          className={styles.slideImage}
          style={{ backgroundImage: `url(${heroImages[imageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }} // Duración de la transición de fundido
        />
      </AnimatePresence>
      {/* El overlay se maneja con el pseudo-elemento ::before en el CSS */}
    </section>
  );
};

export default HeroSection;