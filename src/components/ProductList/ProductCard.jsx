// src/components/ProductList/ProductCard.jsx
import React from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import styles from './ProductList.module.css';


const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 }
  }
};

const ProductCard = ({ product }) => {

  return (
    <motion.div
      className={styles.productCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Link to={`/producto/${product.id}`} className={styles.cardLinkWrapper}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.productName}>{product.name}</h3>
          {/* Contenedor de precio simplificado */}
          
          <ul className={styles.technicalDetailsList}>
            {product.technicalDetails.slice(0, 2).map((detail, index) => (
              <li key={index} className={styles.technicalDetailItem}>{detail}</li>
            ))}
            {product.technicalDetails.length > 2 && <li className={styles.technicalDetailItem}>...más</li>}
          </ul>
        </div>
      </Link>
      <div className={styles.cardActions}>
        <Link to={`/producto/${product.id}`} className={`${styles.actionButton} ${styles.viewDetailsButton}`}>
          <FaEye className={styles.actionIcon} /> Ver Detalles
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;