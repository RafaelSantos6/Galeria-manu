import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, BookHeart, Image as ImageIcon, PenTool, Music, Gift, Clock, Star, MapPin, Moon } from 'lucide-react';
import { styles } from '../styles/themeStyles';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, notificacoes, notificacaoVoz, currentPage, navigateTo }) {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} style={styles.sidebarOverlay} />
          <motion.nav initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} style={styles.sidebarNav}>
            <div style={styles.sidebarHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart fill="#ff85a2" color="#ff85a2" size={20} />
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Menu Céu</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} style={styles.closeMenuBtn}><X size={20} /></button>
            </div>

            <div style={styles.sidebarMenuGrid}>
              <button onClick={() => navigateTo('galeria')} style={currentPage === 'galeria' ? styles.sideNavBtnActive : styles.sidebarBtn}>
                <ImageIcon size={18} /> Galeria
              </button>
              <button onClick={() => navigateTo('mensagens')} style={currentPage === 'mensagens' ? styles.sideNavBtnActive : styles.sidebarBtn}>
                <BookHeart size={18} /> Leia Me quando...
              </button>

              <button onClick={() => navigateTo('escrever')} style={currentPage === 'escrever' ? styles.sideNavBtnActive : styles.sidebarBtn}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <PenTool size={18} />
                  {notificacoes > 0 && <span style={styles.badgeNotificacaoSidebar}>{notificacoes}</span>}
                </div>
                Cartas
              </button>
              <button onClick={() => navigateTo('voz')} style={currentPage === 'voz' ? styles.sideNavBtnActive : styles.sidebarBtn}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Music size={18} />
                  {notificacaoVoz && <span style={styles.badgeNotificacaoSidebar}>1</span>}
                </div>
                Mensagem de Voz
              </button>
              <button onClick={() => navigateTo('diario')} style={currentPage === 'diario' ? styles.navBtnActiveStyle : styles.sidebarBtn}>
                <BookHeart size={18} /> O Diário
              </button>

              <button onClick={() => navigateTo('motivos')} style={currentPage === 'motivos' ? styles.sideNavBtnActive : styles.sidebarBtn}>
                <Gift size={18} /> Motivos
              </button>
              <button onClick={() => navigateTo('tempo')} style={currentPage === 'tempo' ? styles.navBtnActiveStyle : styles.sidebarBtn}>
                <Clock size={18} /> Tempo
              </button>
              <button onClick={() => navigateTo('historia')} style={currentPage === 'historia' ? styles.navBtnActiveStyle : styles.sidebarBtn}>
                <Star size={18} /> História
              </button>
              <button onClick={() => navigateTo('mapa')} style={currentPage === 'mapa' ? styles.navBtnActiveStyle : styles.sidebarBtn}>
                <MapPin size={18} /> Lugares
              </button>
              <button onClick={() => navigateTo('ceu')} style={currentPage === 'ceu' ? styles.navBtnActiveStyle : styles.sidebarBtn}>
                <Moon size={18} /> Nosso Céu
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
