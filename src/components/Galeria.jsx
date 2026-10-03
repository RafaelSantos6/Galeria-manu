import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X } from 'lucide-react';
import { styles } from '../styles/themeStyles';
import { MEMORIES } from '../constants/dadosApp';

export default function Galeria({ selectedId, setSelectedId, navigateTo }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <motion.div key="galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.grid}>
        {MEMORIES.map((item, index) => {
          const rotacao = index % 2 === 0 ? -4 : (index % 3 === 0 ? 3 : 4);

          return (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelectedId(item.id)}
              initial={{ rotate: rotacao, opacity: 0, y: 20 }}
              animate={{ rotate: rotacao, opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
              style={{
                ...styles.cardFrame,
                background: '#fff',
                padding: '12px 12px 35px 12px',
                border: 'none',
                boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                opacity: selectedId === item.id ? 0 : 1,
                pointerEvents: selectedId ? 'none' : 'auto'
              }}
            >
              <div style={styles.imageContainer}>
                <img src={item.url} style={styles.imageFill} alt={item.title} />
              </div>
              <p style={{ ...styles.cardTitle, color: '#333', fontFamily: 'serif', fontStyle: 'italic', marginTop: '10px' }}>
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
      
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo('musicas')} style={styles.musicPageBtn}>
        <Music size={18} /> Ouvir Nossa Trilha Sonora ❤️
      </motion.button>

      <AnimatePresence>
        {selectedId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setSelectedId(null)}>
            <motion.div layoutId={selectedId} style={styles.modalContent} transition={{ type: "spring", stiffness: 250, damping: 30 }}>
              <button style={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}><X /></button>
              <img src={MEMORIES.find(m => m.id === selectedId).url} style={styles.modalImgFit} alt="Zoom" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
