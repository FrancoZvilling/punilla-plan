// src/components/ProductList/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';
import { motion } from 'framer-motion';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Anima las tarjetas una por una
    }
  }
};

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className={styles.noProductsFound}>No se encontraron productos.</p>;
  }

  return (
    <motion.div
      className={styles.productListGrid}
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductList;