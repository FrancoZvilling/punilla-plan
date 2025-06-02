// src/data/categories.js
export const categories = [
  { id: 'accesorios-oficina', name: 'Accesorios de oficina' },
  { id: 'articulos-bano', name: 'Artículos de baño' },
  { id: 'audio', name: 'Audio' },
  { id: 'cafeteras', name: 'Cafeteras' },
  { id: 'camas-colchones', name: 'Camas y Colchones' },
  { id: 'celulares', name: 'Celulares' },
  { id: 'climatizacion', name: 'Climatización' },
  { id: 'heladeras', name: 'Heladeras' },
  { id: 'lavado', name: 'Lavado' },
  { id: 'patio-jardin', name: 'Patio o Jardín' },
  { id: 'pequenos-electrodomesticos', name: 'Pequeños electrodomésticos' },
  { id: 'tv-video', name: 'TV y Video' },
].sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente