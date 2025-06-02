// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products as allProducts } from '../data/products';
import ProductList from '../components/ProductList/ProductList'; // Crearemos este componente a continuación
import styles from './PageStyles.module.css'; // Un archivo de estilos común para páginas
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const CategoryPage = () => {
  const { categoryId } = useParams(); // Obtiene el :categoryId de la URL
  const category = categories.find(cat => cat.id === categoryId);
  const productsInCategory = allProducts.filter(product => product.categoryId === categoryId);

  if (!category) {
    return (
      <motion.div
        className={styles.pageContainer}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <h2 className={styles.pageTitleError}>Categoría no encontrada</h2>
        <Link to="/" className={styles.backLink}>Volver al inicio</Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.pageContainer}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container"> {/* Contenedor global de _utilities.css */}
        <Link to="/" className={styles.backLink}>
          ← Volver al Catálogo
        </Link>
        <h1 className={styles.pageTitle}>{category.name}</h1>
        {productsInCategory.length > 0 ? (
          <ProductList products={productsInCategory} />
        ) : (
          <p className={styles.noProductsText}>No hay productos en esta categoría por el momento.</p>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;