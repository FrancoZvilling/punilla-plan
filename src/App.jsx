// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

import Footer from './components/layout/Footer/Footer';
import CartHeaderButton from './components/Cart/CartHeaderButton';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import ScrollToTopButton from './components/layout/ScrollToTopButton/ScrollToTopButton'; // <--- IMPORTAR

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <CartHeaderButton />
      <ToastContainer /* ... (props como estaban) ... */ />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:categoryId" element={<CategoryPage />} />
            <Route path="/producto/:productId" element={<ProductPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton /> {/* <--- AÑADIR AQUÍ, después del Footer */}
    </>
  );
}

export default App;