import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { styles } from '../styles/themeStyles';
import { ESTRELAS_CEU } from '../constants/dadosApp';

export default function JanelaCeu() {
  const [activeMessage, setActiveMessage] = useState(null);

  return (
    <motion.div key="ceu" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={styles.ceuMain}>
      <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)', lineHeight: '1.2' }}>
        JANELA PARA O CÉU
      </h1>
      <p style={{ color: '#fff', marginTop: '15px', marginBottom: '30px', fontFamily: 'monospace', letterSpacing: '1px' }}>
        RELAXA, RESPIRA E OLHA PARA AS ESTRELAS
      </p>

      <div style={styles.espacoCeu}>
        <motion.div
          animate={{ x: ['-10vw', '110vw'], y: ['-10vh', '80vh'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 7, ease: "easeOut" }}
          style={styles.estrelaCadente}
        />

        {ESTRELAS_CEU.map((estrela) => (
          <div key={estrela.id} style={{ position: 'absolute', top: estrela.top, left: estrela.left }}>
            <motion.div
              onClick={() => setActiveMessage(activeMessage === estrela.id ? null : estrela.id)}
              animate={{ scale: activeMessage === estrela.id ? [1, 1.5, 1.2] : [1, 1.4, 1], opacity: activeMessage === estrela.id ? 1 : [0.6, 1, 0.6] }}
              transition={{ duration: Math.random() * 2 + 2, repeat: activeMessage === estrela.id ? 0 : Infinity, ease: "easeInOut" }}
              style={styles.estrelaBrilho}
            >
              <Star size={16} fill={activeMessage === estrela.id ? "#ff85a2" : "#fff"} color={activeMessage === estrela.id ? "#ff85a2" : "#fff"} />
            </motion.div>
          </div>
        ))}

        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={styles.popupEstrelaFixo}
            >
              <h4 style={{ margin: '0 0 5px 0', color: '#ff85a2', fontSize: '1.05rem', fontWeight: 'bold' }}>
                {ESTRELAS_CEU.find(e => e.id === activeMessage)?.titulo}
              </h4>
              <p style={{ margin: 0, color: '#eee', fontSize: '0.9rem', lineHeight: '1.4' }}>
                {ESTRELAS_CEU.find(e => e.id === activeMessage)?.texto}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
