// src/pages/ProductPage.jsx
import React from 'react'; // Quitamos useState, useEffect, useRef
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../contexts/CartContext';
import styles from './PageStyles.module.css';
import productDetailStyles from './ProductPage.module.css';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
// Ya no se necesitan imports de InstallmentTable, paymentPlans, etc.

const pageVariants = {
  initial: { opacity: 0, x: "100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100vw" }
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = allProducts.find(p => p.id === productId);

  // Toda la lógica de estado para planes, warnings, y refs se ha eliminado

  if (!product) {
    return (
      <motion.div
        className={styles.pageContainer}
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
    // Lógica simplificada: agregar el producto base
    addToCart(product); // Pasamos el producto original
    toast.success(`${product.name} ha sido agregado al carrito.`);
  };

  return (
    <motion.div
      className={`${styles.pageContainer} ${productDetailStyles.productPageContainer}`}
      initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
    >
      <div className="container">
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
          </motion.div>

          <motion.div
            className={productDetailStyles.productInfo}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h1 className={productDetailStyles.productName}>{product.name}</h1>
            
            

            <p className={productDetailStyles.shortDescription}>{product.shortDescription}</p>

            {/* Sección de adquisición de planes ELIMINADA */}

            {/* Botón de Agregar al Carrito ahora es directo y siempre está habilitado */}
            <button
              onClick={handleAddToCart}
              className={productDetailStyles.addToCartButton}
            >
              <FaShoppingCart style={{ marginRight: '10px' }} />
              Agregar al Carrito
            </button>

            <h2 className={productDetailStyles.detailsTitle}>Detalles Técnicos:</h2>
            <ul className={productDetailStyles.technicalDetails}>
              {product.technicalDetails.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;