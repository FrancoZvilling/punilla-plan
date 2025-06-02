// src/components/CatalogIndex/CatalogIndex.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';
import CategoryCard from './CategoryCard';
import styles from './CatalogIndex.module.css';

const CatalogIndex = () => {
  return (
    <section className={styles.catalogIndexSection}>
      <div className="container"> {/* Clase de utilidad para centrar y padding */}
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Nuestro Catálogo
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explora nuestras categorías de productos.
        </motion.p>
        <div className={styles.cardsContainer}>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogIndex;