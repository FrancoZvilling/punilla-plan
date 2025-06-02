// src/pages/ProductPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../contexts/CartContext';
import styles from './PageStyles.module.css'; // Reutilizamos estilos comunes
import productDetailStyles from './ProductPage.module.css'; // Estilos específicos para esta página
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Mismas variantes de página que CategoryPage para consistencia
const pageVariants = {
  initial: { opacity: 0, x: "100vw" }, // Entra desde la derecha
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100vw" } // Sale hacia la izquierda
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <motion.div
        className={styles.pageContainer} // Estilo común
        initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
      >
        <h2 className={styles.pageTitleError}>Producto no encontrado</h2>
        <button onClick={() => navigate(-1)} className={styles.backLink}>
          <FaArrowLeft /> Volver
        </button>
      </motion.div>
    );
  }

  const category = categories.find(cat => cat.id === product.categoryId);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ha sido agregado al carrito.`); // Feedback simple
  };

  return (
    <motion.div
      className={`${styles.pageContainer} ${productDetailStyles.productPageContainer}`}
      initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
    >
      <div className="container"> {/* Contenedor global */}
        <button onClick={() => navigate(-1)} className={`${styles.backLink} ${productDetailStyles.backButton}`}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          {category ? `Volver a ${category.name}` : 'Volver'}
        </button>

        <div className={productDetailStyles.productDetailLayout}>
          <motion.div
            className={productDetailStyles.imageGallery}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <img src={product.image} alt={product.name} className={productDetailStyles.mainImage} />
            {/* Aquí podríamos tener miniaturas si hay múltiples imágenes */}
          </motion.div>

          <motion.div
            className={productDetailStyles.productInfo}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h1 className={productDetailStyles.productName}>{product.name}</h1>
            <p className={productDetailStyles.productPrice}>
              ${new Intl.NumberFormat('es-AR').format(product.price)}
            </p>
            <p className={productDetailStyles.shortDescription}>{product.shortDescription}</p>

            <h2 className={productDetailStyles.detailsTitle}>Detalles Técnicos:</h2>
            <ul className={productDetailStyles.technicalDetails}>
              {product.technicalDetails.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

            <button onClick={handleAddToCart} className={productDetailStyles.addToCartButton}>
              <FaShoppingCart style={{ marginRight: '10px' }} />
              Agregar al Carrito
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;