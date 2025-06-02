// src/data/products.js
import smartTv50Image from '../assets/products/smart-tv-50.jpg';
import proyectorPortatilImage from '../assets/products/proyector-portatil.jpg';

// IDs de categorías deben coincidir con los de src/data/categories.js
export const products = [
  // Pequeños electrodomésticos
  {
    id: 'pe-001',
    categoryId: 'pequenos-electrodomesticos',
    name: 'Licuadora Potente 700W',
    price: 45000,
    image: 'https://placehold.co/400x400/E9E9E9/333?text=Licuadora',
    shortDescription: 'Prepara batidos y salsas fácilmente.',
    technicalDetails: ['700W de potencia', 'Vaso de vidrio 1.5L', '3 velocidades + pulso']
  },
  {
    id: 'pe-002',
    categoryId: 'pequenos-electrodomesticos',
    name: 'Tostadora 2 Ranuras Anchas',
    price: 25000,
    image: 'https://placehold.co/400x400/E9E9E9/333?text=Tostadora',
    shortDescription: 'Tostadas perfectas cada mañana.',
    technicalDetails: ['800W', 'Función cancelar', 'Bandeja recogemigas']
  },
  // Heladeras
  {
    id: 'hel-001',
    categoryId: 'heladeras',
    name: 'Heladera No Frost 320L',
    price: 350000,
    image: 'https://placehold.co/400x400/DDEEFF/333?text=Heladera',
    shortDescription: 'Gran capacidad y tecnología No Frost.',
    technicalDetails: ['320 Litros', 'Eficiencia Energética A+', 'Color Inox']
  },
  // TV y Video
  {
    id: 'tv-001',
    categoryId: 'tv-video',
    name: 'Smart TV LED 50" 4K UHD',
    price: 420000,
    image: smartTv50Image,
    shortDescription: 'Imágenes vibrantes y acceso a apps.',
    technicalDetails: ['Resolución 3840x2160', 'HDR10', '3 HDMI, 2 USB']
  },
  {
    id: 'tv-002',
    categoryId: 'tv-video',
    name: 'Proyector Portátil HD',
    price: 180000,
    image: proyectorPortatilImage,
    shortDescription: 'Cine en casa donde quieras.',
    technicalDetails: ['Resolución Nativa 720p', '2000 Lúmenes', 'Conexión WiFi']
  },
  // Camas y Colchones
  {
    id: 'cc-001',
    categoryId: 'camas-colchones',
    name: 'Colchón Resortes Queen',
    price: 280000,
    image: 'https://placehold.co/400x400/FFF0E1/333?text=Colchón',
    shortDescription: 'Descanso superior y confort.',
    technicalDetails: ['Medida 160x200cm', 'Resortes Pocket', 'Tela Jacquard']
  },
  // Cafeteras
  {
    id: 'caf-001',
    categoryId: 'cafeteras',
    name: 'Cafetera Express Manual',
    price: 95000,
    image: 'https://placehold.co/400x400/A47A4A/FFF?text=Cafetera',
    shortDescription: 'Disfruta un café de barista en casa.',
    technicalDetails: ['15 Bares de presión', 'Vaporizador de leche', 'Acero inoxidable']
  },
  {
    id: 'caf-002',
    categoryId: 'cafeteras',
    name: 'Cafetera de Goteo Programable',
    price: 38000,
    image: 'https://placehold.co/400x400/B08050/FFF?text=Cafetera+Goteo',
    shortDescription: 'Café listo cuando despiertas.',
    technicalDetails: ['Capacidad 1.2L', 'Filtro permanente', 'Timer 24hs']
  },
  // Climatización
  {
    id: 'cli-001',
    categoryId: 'climatizacion',
    name: 'Aire Acondicionado Split 3000F',
    price: 390000,
    image: 'https://placehold.co/400x400/ADD8E6/333?text=Aire+Acond.',
    shortDescription: 'Frescura en verano, calor en invierno.',
    technicalDetails: ['Frío/Calor', 'Eficiencia A', 'Control Remoto']
  },
  // Accesorios de oficina
  {
    id: 'ao-001',
    categoryId: 'accesorios-oficina',
    name: 'Silla de Oficina Ergonómica',
    price: 120000,
    image: 'https://placehold.co/400x400/D3D3D3/333?text=Silla+Oficina',
    shortDescription: 'Comodidad para largas jornadas.',
    technicalDetails: ['Respaldo Reclinable', 'Soporte Lumbar Ajustable', 'Ruedas reforzadas']
  },
  // Artículos de baño
  {
    id: 'ab-001',
    categoryId: 'articulos-bano',
    name: 'Set de Accesorios Baño (5 piezas)',
    price: 18000,
    image: 'https://placehold.co/400x400/E0FFFF/333?text=Set+Baño',
    shortDescription: 'Organiza y decora tu baño.',
    technicalDetails: ['Material: Cerámica', 'Incluye: Jabonera, Vaso, Dispenser, etc.', 'Diseño moderno']
  },
  // Patio o Jardín
  {
    id: 'pj-001',
    categoryId: 'patio-jardin',
    name: 'Juego de Jardín (Mesa + 4 Sillas)',
    price: 150000,
    image: 'https://placehold.co/400x400/90EE90/333?text=Juego+Jardín',
    shortDescription: 'Disfruta al aire libre con estilo.',
    technicalDetails: ['Material: Ratán sintético', 'Resistente UV', 'Almohadones incluidos']
  },
  // Celulares
  {
    id: 'cel-001',
    categoryId: 'celulares',
    name: 'Smartphone Gama Media 128GB',
    price: 290000,
    image: 'https://placehold.co/400x400/B0C4DE/333?text=Smartphone',
    shortDescription: 'Rendimiento y buena cámara.',
    technicalDetails: ['Pantalla 6.5" FHD+', 'Cámara Triple 48MP', 'Batería 5000mAh']
  },
  // Audio
  {
    id: 'aud-001',
    categoryId: 'audio',
    name: 'Auriculares Bluetooth Inalámbricos',
    price: 32000,
    image: 'https://placehold.co/400x400/FFDAB9/333?text=Auriculares',
    shortDescription: 'Sonido de calidad sin cables.',
    technicalDetails: ['Cancelación de Ruido (pasiva)', 'Autonomía 20hs', 'Estuche de carga']
  },
  // Lavado
  {
    id: 'lav-001',
    categoryId: 'lavado',
    name: 'Lavarropas Carga Frontal 8Kg',
    price: 330000,
    image: 'https://placehold.co/400x400/E6E6FA/333?text=Lavarropas',
    shortDescription: 'Ropa limpia y cuidada.',
    technicalDetails: ['1200 RPM', 'Múltiples Programas', 'Eficiencia Energética A++']
  },
  // Un producto más para llegar a 16
  {
    id: 'pe-003', // Pequeño electrodoméstico
    categoryId: 'pequenos-electrodomesticos',
    name: 'Batidora de Mano con Accesorios',
    price: 28000,
    image: 'https://placehold.co/400x400/E9E9E9/333?text=Batidora+Mano',
    shortDescription: 'Ideal para repostería casera.',
    technicalDetails: ['300W de potencia', '5 velocidades', 'Incluye ganchos amasadores']
  }
];