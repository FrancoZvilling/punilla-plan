// src/pages/ProductPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../contexts/CartContext';
import styles from './PageStyles.module.css';
import productDetailStyles from './ProductPage.module.css';
import { FaShoppingCart, FaArrowLeft, FaTags, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import InstallmentTable from '../components/common/InstallmentTable/InstallmentTable';
import { calculateAllPlanDetails } from '../data/paymentPlans';
import { toast } from 'react-toastify'; // <--- IMPORTAR toast

const pageVariants = { /* ... (sin cambios) ... */ };
const pageTransition = { /* ... (sin cambios) ... */ };

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // addToCart ya no necesita retornar el mensaje, lo manejamos aquí
  const product = allProducts.find(p => p.id === productId);

  const [selectedPlanType, setSelectedPlanType] = useState(null);
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState(null);
  const [showInstallmentPlans, setShowInstallmentPlans] = useState(false);
  // El showPlanSelectionWarning ya no es necesario, usaremos toast.warn
  // const [showPlanSelectionWarning, setShowPlanSelectionWarning] = useState(false);
  const [calculatedPlans, setCalculatedPlans] = useState([]);
  const addToCartButtonRef = useRef(null);

  // useEffect para showPlanSelectionWarning ya no es necesario

  useEffect(() => {
    if (product) {
      const plans = calculateAllPlanDetails(product.price);
      setCalculatedPlans(plans);
    }
  }, [product]);

  if (!product) { /* ... (sin cambios) ... */ }
  const category = categories.find(cat => cat.id === product.categoryId);

  const handleSelectPlanType = (planType) => {
    setSelectedPlanType(planType);
    setSelectedInstallmentPlan(null);
    // setShowPlanSelectionWarning(false); // Ya no se usa este estado
    if (planType === 'cuotas') {
      setShowInstallmentPlans(true);
    } else {
      setShowInstallmentPlans(false);
      setTimeout(() => {
        addToCartButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleInstallmentPlanSelected = (planDetails) => {
    setSelectedInstallmentPlan(planDetails);
    toast.success(`Seleccionaste: ${planDetails.name}`); // Notificación de plan seleccionado
    setTimeout(() => {
      addToCartButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleAddToCart = () => {
    if (!selectedPlanType) {
      toast.warn("Por favor, selecciona una opción de compra (contado o cuotas)."); // <--- CAMBIO
      return;
    }
    let productToAdd;
    let successMessage = "";

    if (selectedPlanType === 'contado') {
      productToAdd = {
        ...product,
        purchaseType: 'contado',
        finalPrice: product.price,
        planDescription: 'Pago de Contado',
      };
      successMessage = `${product.name} (Contado) agregado al carrito.`;
    } else if (selectedPlanType === 'cuotas') {
      if (!selectedInstallmentPlan) {
        toast.warn("Por favor, elija un plan de cuotas específico de la tabla."); // <--- CAMBIO
        return;
      }
      productToAdd = {
        ...product,
        purchaseType: 'cuotas',
        finalPrice: selectedInstallmentPlan.totalToPay,
        planDescription: `${selectedInstallmentPlan.planType} - ${selectedInstallmentPlan.days} días`,
        installmentDetails: selectedInstallmentPlan,
      };
      successMessage = `${product.name} (${selectedInstallmentPlan.name}) agregado al carrito.`;
    }
    
    if (productToAdd) {
        const result = addToCart(productToAdd, 1); // addToCart ahora podría no retornar nada específico para el mensaje
        // El console.log dentro de addToCart en CartContext nos dirá si se agregó.
        // Si addToCart manejara lógica de stock y pudiera fallar, aquí se manejaría el error.
        toast.success(successMessage); // <--- CAMBIO
    }
  };

  const handleViewInstallmentsLink = (/* ... (sin cambios) ... */) => {
    handleSelectPlanType('cuotas');
    setTimeout(() => {
        const plansSection = document.getElementById('installment-plans-section');
        if (plansSection) {
            plansSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 150);
  };

  const isAddToCartDisabled = !selectedPlanType || (selectedPlanType === 'cuotas' && !selectedInstallmentPlan);

  return (
    <motion.div /* ... (JSX principal sin cambios estructurales, solo el warning) ... */ >
      {/* ... */}
      <div className="container">
        {/* ... (Botón volver) ... */}
        <button onClick={() => navigate(-1)} className={`${styles.backLink} ${productDetailStyles.backButton}`}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          {category ? `Volver a ${category.name}` : 'Volver'}
        </button>

        <div className={productDetailStyles.productDetailLayout}>
          {/* ... (ImageGallery) ... */}
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
            {/* ... (Nombre, precio, descripción) ... */}
            <h1 className={productDetailStyles.productName}>{product.name}</h1>
            <div className={productDetailStyles.priceSection}>
              <p className={productDetailStyles.productPrice}>
                ${new Intl.NumberFormat('es-AR').format(product.price)}
                <span className={productDetailStyles.priceTag}> (precio de contado)</span>
              </p>
              <button onClick={handleViewInstallmentsLink} className={productDetailStyles.viewInstallmentsLinkDetail}>
                ver precio en cuotas
              </button>
            </div>
            <p className={productDetailStyles.shortDescription}>{product.shortDescription}</p>


            {/* ... (Botones de adquisición de plan) ... */}
            <div className={productDetailStyles.acquisitionOptions}>
              <h3 className={productDetailStyles.optionsTitle}>Selecciona una opción de compra:</h3>
              <div className={productDetailStyles.planButtonsContainer}>
                <motion.button
                  className={`${productDetailStyles.planButton} ${selectedPlanType === 'contado' ? productDetailStyles.activePlan : ''}`}
                  onClick={() => handleSelectPlanType('contado')}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <FaMoneyBillWave /> Adquirir de Contado
                </motion.button>
                <motion.button
                  className={`${productDetailStyles.planButton} ${selectedPlanType === 'cuotas' ? productDetailStyles.activePlan : ''}`}
                  onClick={() => handleSelectPlanType('cuotas')}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <FaTags /> Adquirir en Cuotas
                </motion.button>
              </div>
            </div>

            {/* ... (Tabla de cuotas) ... */}
            {showInstallmentPlans && selectedPlanType === 'cuotas' && (
              <motion.div
                id="installment-plans-section"
                className={productDetailStyles.installmentPlansSection}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 'var(--spacing-md)' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InstallmentTable
                  calculatedPlans={calculatedPlans}
                  isInteractive={true}
                  onPlanSelected={handleInstallmentPlanSelected}
                  productName={product.name}
                />
                {selectedInstallmentPlan && (
                  <p className={productDetailStyles.selectedPlanInfo}>
                    Plan seleccionado: {selectedInstallmentPlan.name} - Cuota: ${new Intl.NumberFormat('es-AR').format(selectedInstallmentPlan.dailyPayment)}/día
                  </p>
                )}
              </motion.div>
            )}

            {/* El warning <p> se elimina, ya que toast lo maneja */}
            {/* {showPlanSelectionWarning && ( ... )} */}

            <button
              ref={addToCartButtonRef}
              onClick={handleAddToCart}
              className={productDetailStyles.addToCartButton}
              disabled={isAddToCartDisabled}
            >
              <FaShoppingCart style={{ marginRight: '10px' }} />
              Agregar al Carrito
            </button>

            {/* ... (Detalles técnicos) ... */}
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