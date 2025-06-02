// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import CatalogIndex from '../components/CatalogIndex/CatalogIndex';
import ContactSection from '../components/ContactSection/ContactSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CatalogIndex />
      <ContactSection />
      {/* Quitamos el <p> de placeholder */}
    </div>
  );
};

export default HomePage;