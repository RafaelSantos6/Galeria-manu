import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PenTool } from 'lucide-react';
import { styles } from '../styles/themeStyles';

export default function DiarioModal({ 
  cartaDiarioAtiva, 
  setCartaDiarioAtiva, 
  isReplyingDiario, 
  setIsReplyingDiario,
  respostaManuDiario,
  setRespostaManuDiario,
  enviarRespostaDiario,
  enviandoRespostaDiario 
}) {
  if (!cartaDiarioAtiva) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setCartaDiarioAtiva(null)}>
        <motion.div
          style={{
            ...styles.modalContent,
            maxWidth: '500px',
            width: '90%',
            padding: '40px 20px 20px 20px',
            background: '#fdfbf7',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
          <button
            style={{
              ...styles.closeBtn,
              color: '#333',
              top: '15px',
              right: '15px',
              zIndex: 10
            }}
            onClick={() => setCartaDiarioAtiva(null)}
          >
            <X />
          </button>

          <h2 style={{ color: '#ff85a2', margin: '0 0 20px 0', fontFamily: 'serif', textAlign: 'center', width: '100%', flexShrink: 0 }}>
            Carta de {cartaDiarioAtiva.dataDesbloqueio.split('-').reverse().join('/')}
          </h2>

          <div style={{ overflowY: 'auto', width: '100%', paddingRight: '5px', flexGrow: 1, paddingBottom: '20px' }}>
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: '1.6', fontFamily: 'serif', whiteSpace: 'pre-wrap', margin: 0, textAlign: 'left' }}>
              {cartaDiarioAtiva.texto}
            </p>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8, duration: 1 }} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '30px', marginBottom: '20px', fontFamily: "'Brush Script MT', 'Comic Sans MS', cursive", fontSize: '1.6rem', color: '#ff85a2', justifyContent: 'flex-start' }}
            >
              <span>Com amor, Rafa</span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff85a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
                />
              </svg>
            </motion.div>

            <div style={{ width: '100%', borderTop: '1px dashed #e0dcd3', paddingTop: '20px', marginTop: '20px' }}>
              {cartaDiarioAtiva.respostaManu ? (
                <div style={{ background: 'rgba(255, 133, 162, 0.1)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #ff85a2' }}>
                  <h4 style={{ color: '#ff85a2', margin: '0 0 5px 0', fontSize: '0.9rem' }}>Sua resposta:</h4>
                  <p style={{ color: '#555', fontSize: '1rem', fontStyle: 'italic', margin: 0 }}>{cartaDiarioAtiva.respostaManu}</p>
                </div>
              ) : (
                <div>
                  {!isReplyingDiario ? (
                    <button onClick={() => setIsReplyingDiario(true)} style={{ ...styles.btnResponderRafa, width: '100%', justifyContent: 'center' }}>
                      <PenTool size={16} /> Quero responder essa carta
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <textarea
                        style={{ ...styles.textAreaResposta, background: '#fff', color: '#333', border: '1px solid #ccc', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)' }}
                        placeholder="Escreva sua resposta aqui..."
                        value={respostaManuDiario}
                        onChange={(e) => setRespostaManuDiario(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={enviarRespostaDiario} disabled={enviandoRespostaDiario} style={{ ...styles.btnSalvarResposta, flex: 1 }}>
                          {enviandoRespostaDiario ? "Enviando..." : "Enviar Resposta"}
                        </button>
                        <button onClick={() => setIsReplyingDiario(false)} style={{ ...styles.btnCancelarResposta, color: '#666', border: '1px solid #ccc' }}>
                          Cancelar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
