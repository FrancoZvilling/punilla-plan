// src/components/CatalogIndex/IndexCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CatalogIndex.module.css'; // Sigue usando los mismos estilos

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeInOut" }
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: { duration: 0.2 }
  }
};

// El componente ahora acepta un 'item' genérico
const IndexCard = ({ item, basePath, index }) => {
  return (
    <motion.div
      className={styles.categoryCard} // Mantenemos la clase de estilo
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link to={`${basePath}/${item.id}`} className={styles.cardLink}>
        {/* Renderizar el logo si existe en el item */}
        {item.logo && <img src={item.logo} alt={`Logo de ${item.name}`} className={styles.cardLogo} />}
        <h3 className={styles.categoryName}>{item.name}</h3>
        <span className={styles.arrowIcon}>→</span>
      </Link>
    </motion.div>
  );
};

export default IndexCard;