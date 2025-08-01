// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import LogoSection from '../components/LogoSection/LogoSection';
import IndexSection from '../components/CatalogIndex/IndexSection';
import ContactSection from '../components/ContactSection/ContactSection';
import { categories } from '../data/categories'; // Importar datos de categorías
import { brands } from '../data/brands'; // Importar datos de marcas

const HomePage = () => {
  return (
    <div>
      <LogoSection />
      <HeroSection />
      {/* Primera sección: Catálogo de Categorías */}
      <IndexSection
        title="Nuestro Catálogo"
        subtitle="Explora nuestras categorías de productos."
        items={categories}
        basePath="/categoria"
      />
      
      {/* Segunda sección: Catálogo de Marcas */}
      <IndexSection
        title="Nuestras Marcas"
        subtitle="Encuentra productos de tus marcas preferidas."
        items={brands}
        basePath="/marca" // Nota: esta ruta aún no existe, la crearemos después
      />
      <ContactSection />
      {/* Quitamos el <p> de placeholder */}
    </div>
  );
};

export default HomePage;