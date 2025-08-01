// src/components/ContactSection/ContactSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import styles from './ContactSection.module.css';
import Modal from '../common/Modal/Modal'; 
import WhatsappContacts from './WhatsappContacts'; 

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2 // Anima los hijos en secuencia
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ContactSection = () => {
  const instagramUsername = "tuInstagramUser"; // Reemplaza con tu usuario de Instagram

  // Estado para controlar el modal de WhatsApp
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);

  const openWhatsappModal = () => setIsWhatsappModalOpen(true);
  const closeWhatsappModal = () => setIsWhatsappModalOpen(false);

   return (
    <>
      <motion.section
        className={styles.contactSection}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className={`container ${styles.contactContainer}`}>
          <motion.h2 className={styles.title} variants={itemVariants}>
            ¿Consultas? ¡Contáctanos!
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Estamos aquí para ayudarte. Elige tu forma preferida para comunicarte:
          </motion.p>

          <div className={styles.contactOptions}>
            <motion.div className={styles.optionCard} variants={itemVariants}>
              <FaWhatsapp className={`${styles.icon} ${styles.whatsappIcon}`} />
              <h3 className={styles.optionTitle}>WhatsApp Directo</h3>
              <p className={styles.optionDescription}>
                Contacta directamente a nuestros vendedores o al área de cobranzas.
              </p>
              {/* Este botón ahora abre el modal */}
              <motion.button
                onClick={openWhatsappModal}
                className={`${styles.contactButton} ${styles.whatsappButton}`}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(37, 211, 102, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className={styles.buttonIcon} /> Ver Contactos de WhatsApp
              </motion.button>
            </motion.div>

            <motion.div className={styles.optionCard} variants={itemVariants}>
              <FaInstagram className={`${styles.icon} ${styles.instagramIcon}`} />
              <h3 className={styles.optionTitle}>Síguenos en Instagram</h3>
              <p className={styles.optionDescription}>
                Descubre novedades, ofertas especiales y mira nuestros productos en acción.
              </p>
              <motion.a
                href={`https://www.instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactButton} ${styles.instagramButton}`}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(193, 53, 132, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className={styles.buttonIcon} /> Ver Perfil de Instagram
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Modal de Contactos de WhatsApp */}
      <Modal
        isOpen={isWhatsappModalOpen}
        onClose={closeWhatsappModal}
        title="Contactos de WhatsApp"
      >
        <WhatsappContacts />
      </Modal>
    </>
  );
};

export default ContactSection;