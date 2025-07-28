// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import LogoSection from '../components/LogoSection/LogoSection';
import CatalogIndex from '../components/CatalogIndex/CatalogIndex';
import ContactSection from '../components/ContactSection/ContactSection';

const HomePage = () => {
  return (
    <div>
      <LogoSection />
      <HeroSection />
      <CatalogIndex />
      <ContactSection />
      {/* Quitamos el <p> de placeholder */}
    </div>
  );
};

export default HomePage;