// src/pages/BrandPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BrandPage = () => {
    const { brandId } = useParams();
    
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Productos de la Marca: {brandId}</h1>
            <p>(Página en construcción)</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
};

export default BrandPage;