// src/components/layout/Footer/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const paymentMethods = [
    { icon: <FaCreditCard />, name: "Tarjetas de Crédito/Débito" },
    { icon: <FaUniversity />, name: "Transferencia Bancaria" },
    { icon: <FaMoneyBillWave />, name: "Efectivo" }, // Acortado para mejor visualización
  ];

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }} // Animación general del footer
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`container ${styles.footerContent}`}> {/* Contenedor principal del contenido */}

        {/* Sección Medios de Pago */}
        <motion.div
          className={styles.footerSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h4 className={styles.sectionTitle}>Medios de Pago</h4>
          <ul className={styles.paymentList}>
            {paymentMethods.map((method, index) => (
              <motion.li
                key={index}
                className={styles.paymentItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                <span className={styles.paymentIcon}>{method.icon}</span>
                {method.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Sección Elemento Interactivo */}
        <motion.div
          className={styles.footerSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.2 }} // Delay ligeramente mayor
        >
          <h4 className={styles.sectionTitle}>¿Más Productos?</h4>
          <div className={styles.interactiveContent}>
            <motion.p
              className={styles.interactiveText}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Explora nuestro catálogo completo.
            </motion.p>
            <motion.button
              className={styles.ctaButton}
              whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 0], transition: { yoyo: Infinity, duration: 0.4 } }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ¡Ver Catálogo Ahora!
            </motion.button>
          </div>
        </motion.div>

      </div>

      <div className={styles.copyRight}>
        <p>© {new Date().getFullYear()} Punilla Plan. Todos los derechos reservados.</p>
        <p>Desarrollado por Franco Zvilling - <a href="https://wa.me/5493541315119" target="_blank">3541315119</a></p>
      </div>
    </motion.footer>
  );
};

export default Footer;