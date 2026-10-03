import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { styles } from '../styles/themeStyles';
import { TEXTO_AVISO_ESPECIAL } from '../constants/dadosApp';

export default function LoginView({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [showPopupSurpresa, setShowPopupSurpresa] = useState(false);
  const [naoMostrarNovamente, setNaoMostrarNovamente] = useState(false);

  const coracoesIniciais = useRef(
    Array.from({ length: 30 }).map((_, i) => ({
      id: i, left: `${Math.random() * 100}%`, delay: Math.random() * 5, duration: Math.random() * 6 + 5, size: Math.random() * 20 + 15
    }))
  ).current;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2411') {
      setShowSuccessAnim(true);
      
      const avisoOcultoSalvo = localStorage.getItem('avisoOcultoTexto');
      
      setTimeout(() => {
        if (avisoOcultoSalvo === TEXTO_AVISO_ESPECIAL) {
          onLoginSuccess();
        } else {
          setShowPopupSurpresa(true);
        }
      }, 1800);
    } else {
      alert('Senha incorreta! ❤️');
    }
  };

  const fecharPopupEEntrar = () => {
    if (naoMostrarNovamente) {
      localStorage.setItem('avisoOcultoTexto', TEXTO_AVISO_ESPECIAL);
    }
    setShowPopupSurpresa(false);
    onLoginSuccess();
  };

  return (
    <div style={{ ...styles.container, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        {coracoesIniciais.map((c) => (
          <motion.div key={c.id} initial={{ y: '110vh', opacity: 0 }} animate={{ y: '-10vh', opacity: [0, 0.8, 0.8, 0], x: [0, -30, 30, 0] }} transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }} style={{ position: 'absolute', left: c.left, color: 'rgba(255, 255, 255, 0.5)' }}>
            <Heart fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.5)" size={c.size} />
          </motion.div>
        ))}
      </div>

      {!showPopupSurpresa && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={showSuccessAnim ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ ...styles.loginCard, zIndex: 10 }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart color="#ff85a2" fill="#ff85a2" size={48} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ color: '#fff', margin: '20px 0 5px 0' }}>
            Céu de Memórias
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '20px', fontStyle: 'italic' }}>
            Uma nova versão do nosso cantinho...
          </motion.p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            <br />
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ['0px 0px 0px rgba(255,133,162,0)', '0px 0px 15px rgba(255,133,162,0.6)', '0px 0px 0px rgba(255,133,162,0)'] }} transition={{ repeat: Infinity, duration: 1.5 }} style={styles.button}>
              Entrar
            </motion.button>
          </form>
        </motion.div>
      )}

      {showSuccessAnim && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, pointerEvents: 'none' }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 300 + 100;
            return (
              <motion.div key={`exp-${i}`} initial={{ opacity: 1, scale: 0, x: 0, y: 0 }} animate={{ opacity: [1, 1, 0], scale: [0, Math.random() * 1.5 + 0.8, 0], x: Math.cos(angle) * velocity, y: Math.sin(angle) * velocity }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ position: 'absolute' }}>
                <Heart fill="#ff85a2" color="#ff85a2" size={Math.random() * 20 + 15} />
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showPopupSurpresa && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={styles.popupSurpresaOverlay}>
            <div style={styles.popupSurpresaContent}>
              <Heart size={40} color="#ff85a2" fill="#ff85a2" style={{ marginBottom: '15px' }} />
              <h2 style={{ color: '#ff85a2', margin: '0 0 15px 0', fontFamily: 'serif' }}>Aviso Especial</h2>
              <p style={{ color: '#333', fontSize: '1.2rem', marginBottom: '20px', lineHeight: '1.5' }}>
                {TEXTO_AVISO_ESPECIAL}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px', cursor: 'pointer' }}>
                <input type="checkbox" id="naoMostrarNovamenteCheckbox" checked={naoMostrarNovamente} onChange={(e) => setNaoMostrarNovamente(e.target.checked)} style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#ff85a2' }} />
                <label htmlFor="naoMostrarNovamenteCheckbox" style={{ color: '#666', fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none' }}>
                  Não mostrar novamente este aviso
                </label>
              </div>
              <button onClick={fecharPopupEEntrar} style={styles.button}>
                Continuar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
