// src/components/CatalogIndex/CategoryCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Usaremos Link para navegar a la página de la categoría
import styles from './CatalogIndex.module.css'; // Compartirá estilos con CatalogIndex

// Podríamos añadir iconos a las categorías en el futuro
// import { FaBlender, FaBed, FaTv, FaMobileAlt, FaChair, FaSnowflake, FaCoffee, FaShower, FaBoxOpen, FaSeedling, FaVolumeUp, FaShoppingCart } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ // (i) es el índice para el delay escalonado
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeInOut"
    }
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: { duration: 0.2 }
  }
};

const CategoryCard = ({ category, index }) => {
  // Aquí podríamos mapear category.id a un icono específico si los tuviéramos
  // const getCategoryIcon = (categoryId) => {
  //   switch (categoryId) {
  //     case 'pequenos-electrodomesticos': return <FaBlender size={30} />;
  //     case 'heladeras': return <FaBoxOpen size={30} />; // Placeholder, FaRefrigerator no existe en Fa
  //     // ... más casos
  //     default: return <FaShoppingCart size={30} />;
  //   }
  // };

  return (
    <motion.div
      className={styles.categoryCard}
      custom={index} // Pasa el índice a las variantes para el delay
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link to={`/categoria/${category.id}`} className={styles.cardLink}>
        {/* {getCategoryIcon(category.id)} */}
        <h3 className={styles.categoryName}>{category.name}</h3>
        <span className={styles.arrowIcon}>→</span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;