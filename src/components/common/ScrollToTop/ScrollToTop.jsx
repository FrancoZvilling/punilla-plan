// src/components/common/ScrollToTop/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Obtiene el pathname actual de la URL

  useEffect(() => {
    // Hacer scroll al inicio de la página cada vez que el pathname cambie
    window.scrollTo(0, 0);
  }, [pathname]); // El efecto se ejecuta cuando el pathname cambia

  return null; // Este componente no renderiza nada visible
};

export default ScrollToTop;