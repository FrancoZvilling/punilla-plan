// src/hooks/useScrollDirection.js
import { useState, useEffect } from 'react';

const useScrollDirection = (threshold = 10) => {
  const [scrollDir, setScrollDir] = useState(null); // 'up' o 'down'
  const [isPastHero, setIsPastHero] = useState(false); // Para saber si pasamos la Hero Section

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      // Determinar si hemos pasado la altura de la Hero Section (aprox. 60vh)
      // Podríamos hacer esto más dinámico si el Hero tuviera una ref y obtuviéramos su altura.
      // Por ahora, usamos un valor aproximado. 300px podría ser un buen umbral.
      const heroSectionHeightThreshold = window.innerHeight * 0.5; // 50% de la altura de la ventana
      setIsPastHero(scrollY > heroSectionHeightThreshold);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    // Ejecutar una vez al montar para estado inicial de isPastHero
    updateScrollDir();


    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDir, isPastHero };
};

export default useScrollDirection;