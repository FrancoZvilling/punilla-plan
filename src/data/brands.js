// src/data/brands.js

// Importa los logos
import bestcoldLogo from '../assets/brands/bestcold.png';
import dandaLogo from '../assets/brands/danda.png';
import dreanLogo from '../assets/brands/drean.jpg';
import famLogo from '../assets/brands/fam.png';
import flLogo from '../assets/brands/fl.png';
import nebaLogo from '../assets/brands/neba.png';
import sol from '../assets/brands/sol.png';
import systel from '../assets/brands/systel.jpg';
import winco from '../assets/brands/winco.jpg';

export const brands = [
    { id: 'bestcold', name: 'BestCold', logo: bestcoldLogo },
    { id: 'danda', name: 'Danda', logo: dandaLogo },
    { id: 'drean', name: 'Drean', logo: dreanLogo },
    { id: 'fam', name: 'FAM', logo: famLogo },
    { id: 'fl', name: 'FL', logo: flLogo },
    { id: 'neba', name: 'Neba', logo: nebaLogo },
    { id: 'sol', name: 'Sol Real', logo: sol },
    { id: 'systel', name: 'Systel', logo: systel },
    { id: 'winco', name: 'Winco', logo: winco }
].sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente