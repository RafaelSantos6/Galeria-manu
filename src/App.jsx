import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, X, BookHeart, Image as ImageIcon } from 'lucide-react';

import foto1 from './assets/piquenique.jpg';
import foto2 from './assets/date.jpg';
import foto3 from './assets/juntos.jpg';
import foto4 from './assets/fofa.jpg';
import foto5 from './assets/adesivo.jpg';


const SPECIAL_MESSAGES = {
  "Estiver com saudades": "Lembre-se que cada segundo longe é um segundo mais perto do nosso próximo abraço. Eu te amo!",
  "Tiver tido um dia difícil": "Você é a pessoa mais forte que eu conheço. Descanse, amanhã o sol nasce de novo e eu estarei aqui por você.",
  "Estiver feliz": "Sua felicidade é o meu combustível! Guarda esse sorriso em um potinho e me conta tudo depois.",
  "Precisar de um incentivo": "Você é capaz de conquistar o mundo. Eu acredito em você mais do que qualquer pessoa!",
  "Estiver insegura": "Olhe para tudo o que você já conquistou até aqui. Você é talentosa, inteligente e a designer mais incrível que eu conheço!",
  "Precisar conversar": "Lembra que eu atravessaria a cidade para te fazer esperimentar um macarrão e ter a pequena chance de ouvir seu coração!",
  "Estiver brava comigo": "Desculpa se eu fiz algo errado, amor. Respire fundo e lembre que meu coração é todo seu, mesmo quando eu sou meio bobo.",
  "Precisar de um abraço": "Imagine que estou te apertando bem forte agora mesmo. Sinta todo o meu carinho chegando aí!"
};

const MEMORIES = [
  { id: 1, url: foto1, title: 'Nosso Momento' },
  { id: 2, url: foto2, title: 'Um dia Especial' },
  { id: 3, url: foto3, title: 'Juntos' },
  { id: 4, url: foto4, title: 'Fofa' },
  { id: 5, url: foto5, title: 'Adesivo' }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('galeria');
  const [activeMessage, setActiveMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2411') setIsAuthenticated(true);
    else alert('Senha incorreta! ❤️');
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.loginCard}>
          <Heart color="#ff85a2" fill="#ff85a2" size={48} />
          <h2 style={{ color: '#fff', margin: '20px 0' }}>Céu de Memórias</h2>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            <br />
            <button type="submit" style={styles.button}>Entrar</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <button onClick={() => { setCurrentPage('galeria'); setActiveMessage(null); }} style={currentPage === 'galeria' ? styles.navBtnActive : styles.navBtn}>
          <ImageIcon size={18} /> Galeria
        </button>
        <button onClick={() => setCurrentPage('mensagens')} style={currentPage === 'mensagens' ? styles.navBtnActive : styles.navBtn}>
          <BookHeart size={18} /> Leia quando...
        </button>
      </nav>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {currentPage === 'galeria' ? (
            <motion.div key="galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.grid}>
              {MEMORIES.map((item) => (
                <motion.div 
                  key={item.id} 
                  layoutId={item.id}
                  onClick={() => setSelectedId(item.id)}
                  animate={!selectedId ? { y: [0, -10, 0] } : { y: 0 }}
                  transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                  style={{ 
                    ...styles.cardFrame, 
                    opacity: selectedId === item.id ? 0 : 1,
                    pointerEvents: selectedId ? 'none' : 'auto' 
                  }}
                >
                  <div style={styles.imageContainer}>
                    <img src={item.url} style={styles.imageFill} alt={item.title} />
                  </div>
                  <p style={styles.cardTitle}>{item.title}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="mensagens" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={styles.messageContainer}>
              <h2 style={{ color: '#fff', marginBottom: '30px' }}>Para cada momento...</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {Object.keys(SPECIAL_MESSAGES).map((key) => (
                  <button key={key} onClick={() => setActiveMessage(key)} style={styles.msgBtn}>{key}</button>
                ))}
              </div>
              <AnimatePresence>
                {activeMessage && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.messageDisplay}>
                    <p style={{ color: '#fff', fontStyle: 'italic' }}>"{SPECIAL_MESSAGES[activeMessage]}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <button onClick={() => alert('Meu amor te encontra onde nós podemos ter o primeiro encontro depois do e-mail  🧭❤️')} style={styles.compassBtn}>
        <Compass size={20} /> Bússola
      </button>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={styles.overlay} 
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={selectedId} 
              style={styles.modalContent}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              <button style={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}><X /></button>
              <img src={MEMORIES.find(m => m.id === selectedId).url} style={styles.modalImgFit} alt="Zoom" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'sans-serif', padding: '20px', overflowX: 'hidden'
  },
  loginCard: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' },
  nav: { position: 'fixed', top: '20px', display: 'flex', gap: '10px', zIndex: 100, padding: '10px', borderRadius: '30px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' },
  navBtn: { padding: '10px 20px', borderRadius: '25px', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  navBtnActive: { padding: '10px 20px', borderRadius: '25px', border: 'none', background: '#fff', color: '#ff85a2', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' },
  input: { padding: '12px', borderRadius: '10px', border: 'none', marginTop: '15px', textAlign: 'center', width: '200px' },
  button: { padding: '12px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#ff85a2', color: '#fff', cursor: 'pointer', marginTop: '15px' },
  grid: { display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '100px', maxWidth: '1000px' },
  cardFrame: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', width: '240px', height: '185px', padding: '10px', borderRadius: '20px', cursor: 'pointer' },
  imageContainer: { width: '100%', height: '135px', borderRadius: '12px', overflow: 'hidden', marginBottom: '8px' },
  imageFill: { width: '100%', height: '100%', objectFit: 'cover' },
  cardTitle: { color: '#fff', textAlign: 'center', fontSize: '0.9rem', margin: 0 },
  messageContainer: { textAlign: 'center', marginTop: '100px', maxWidth: '600px' },
  msgBtn: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', padding: '15px', borderRadius: '15px', color: '#fff', cursor: 'pointer', width: '180px' },
  messageDisplay: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '25px', borderRadius: '20px', marginTop: '30px', border: '1px solid rgba(255,255,255,0.3)' },
  compassBtn: { position: 'fixed', bottom: '25px', padding: '12px 25px', borderRadius: '30px', border: 'none', background: '#fff', color: '#ff85a2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 },
  modalContent: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', position: 'relative' },
  modalImgFit: { maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px', objectFit: 'contain' },
  closeBtn: { position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }
};