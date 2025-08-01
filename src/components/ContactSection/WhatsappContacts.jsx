// src/components/ContactSection/WhatsappContacts.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappContacts } from '../../data/contacts';
import styles from './ContactSection.module.css'; // Reutilizaremos los estilos

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Anima cada contacto uno por uno
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const WhatsappContacts = () => {
  const defaultMessage = "Hola! Vengo desde la web y quisiera hacer una consulta.";
  
  return (
    <div className={styles.whatsappModalLayout}>
      {/* Columna de Vendedores */}
      <div className={styles.contactColumn}>
        <h3 className={styles.columnTitle}>Vendedores</h3>
        <motion.ul
          className={styles.contactList}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {whatsappContacts.vendedores.map((vendedor, index) => (
            <motion.li key={index} className={styles.contactItem} variants={itemVariants}>
              <span className={styles.contactName}>{vendedor.name}</span>
              <a
                href={`https://wa.me/${vendedor.number}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLinkButton}
              >
                <FaWhatsapp /> Chatear
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Columna de Cobradores */}
      <div className={styles.contactColumn}>
        <h3 className={styles.columnTitle}>Cobradores</h3>
        <motion.ul
          className={styles.contactList}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {whatsappContacts.cobradores.map((cobrador, index) => (
            <motion.li key={index} className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactInfo}>
                <span className={styles.contactName}>{cobrador.name}</span>
                <span className={styles.contactZone}>{cobrador.zone}</span>
              </div>
              <a
                href={`https://wa.me/${cobrador.number}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLinkButton}
              >
                <FaWhatsapp /> Chatear
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default WhatsappContacts;