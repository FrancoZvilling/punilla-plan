// src/components/CatalogIndex/IndexSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import IndexCard from './IndexCard'; // Importa el nuevo IndexCard
import styles from './CatalogIndex.module.css';

// El componente ahora es genérico y recibe props
const IndexSection = ({ title, subtitle, items, basePath, cardClassName }) => {
  return (
    <section className={styles.catalogIndexSection}>
      <div className="container">
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        <div className={styles.cardsContainer}>
          {items.map((item, index) => (
            <IndexCard key={item.id} item={item} basePath={basePath} index={index} customClassName={cardClassName} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSection;