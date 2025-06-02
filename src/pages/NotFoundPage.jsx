// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl) var(--spacing-md)' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={{ color: 'var(--color-secondary)', marginTop: 'var(--spacing-lg)', display: 'inline-block' }}>
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;