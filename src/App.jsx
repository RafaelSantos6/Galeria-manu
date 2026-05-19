import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, X, BookHeart, Image as ImageIcon, ShoppingBag, Download, Send, ImagePlus, PenTool } from 'lucide-react';
import { toPng } from 'html-to-image';

// --- IMPORTAÇÃO DO BANCO DE DADOS ---
import { db, storage } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// --- IMPORTAÇÕES DAS IMAGENS ---
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

const MERCADO_ITENS = [
  { id: 1, label: 'VALE ABRAÇOS', cor: '#ff4655' },
  { id: 2, label: 'VALE DATE', cor: '#ffb000' },
  { id: 3, label: 'VALE FILME', cor: '#00ccff' },
  { id: 4, label: 'R$ 200 LEO COSMÉTICOS', cor: '#ffb000' },
  { id: 5, label: 'VALE JANTAR', cor: '#ff4655' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('galeria');
  const [activeMessage, setActiveMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [revelados, setRevelados] = useState({});
  
  // Estados para a Nova Página de Envio de Cartas/Fotos
  const [mensagemManu, setMensagemManu] = useState('');
  const [imagemManu, setImagemManu] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  // Referência para baixar as imagens do Mercado Noturno corretamente
  const cardRefs = useRef({});

  const toggleRevelar = (id) => {
    setRevelados(prev => ({ ...prev, [id]: true }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2411') setIsAuthenticated(true);
    else alert('Senha incorreta! ❤️');
  };

  // Função para baixar os vales do Mercado Noturno
  const downloadVale = (id, label) => {
    if (cardRefs.current[id]) {
      toPng(cardRefs.current[id], { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${label}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error('Erro ao exportar imagem', err));
    }
  };

  // Função assíncrona para enviar os dados para o Firebase Storage e Firestore
  const enviarParaRafael = async () => {
    if (!mensagemManu && !imagemManu) {
      alert('Escreva algo ou adicione uma foto! irei ver tudo com muito carinho ❤️');
      return;
    }
    
    setEnviando(true);
    try {
      let imageUrl = "";
      
      // 1. Se ela selecionou uma foto, faz o upload para o Storage
      if (imagemManu) {
        const imageRef = ref(storage, `recados/${Date.now()}_${imagemManu.name}`);
        await uploadBytes(imageRef, imagemManu);
        imageUrl = await getDownloadURL(imageRef); 
      }

      await addDoc(collection(db, "cartas_para_rafael"), {
        texto: mensagemManu, // <--- O erro estava aqui! Troque o "j" pelo "m"
        fotoUrl: imageUrl,
        data: new Date()
      });

      setSucesso(true);
    } catch (erro) {
      console.error("Erro ao salvar no Firebase:", erro);
      alert('Ops! Ocorreu um erro ao enviar a mensagem.');
    }
    setEnviando(false);
  };

  // Definição dinâmica do fundo de ecrã baseado na página ativa
  const currentBg = (currentPage === 'mercado' || currentPage === 'escrever')
    ? '#0f1923' 
    : 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)';

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
    <div style={{ ...styles.container, background: currentBg }}>
      
      {/* CABEÇALHO RESPONSIVO */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <button onClick={() => { setCurrentPage('galeria'); setActiveMessage(null); }} style={currentPage === 'galeria' ? styles.navBtnActive : styles.navBtn}>
            <ImageIcon size={18} /> Galeria
          </button>
          <button onClick={() => setCurrentPage('mensagens')} style={currentPage === 'mensagens' ? styles.navBtnActive : styles.navBtn}>
            <BookHeart size={18} /> Leia...
          </button>
          <button onClick={() => setCurrentPage('escrever')} style={currentPage === 'escrever' ? styles.navBtnActive : styles.navBtn}>
            <PenTool size={18} /> Escrever
          </button>
        </nav>

        {/* Ícone Estilo Valorant do Mercado Noturno */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 70, 85, 0.8)' }}
          onClick={() => setCurrentPage('mercado')}
          style={{
            ...styles.mercadoIconBtn,
            background: currentPage === 'mercado' ? 'rgba(255, 70, 85, 0.2)' : 'transparent'
          }}
          title="Acessar Mercado.Noturno"
        >
          <div style={styles.smallDiamond}></div>
        </motion.button>
      </header>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          
          {/* TELA 1: GALERIA */}
          {currentPage === 'galeria' && (
            <motion.div key="galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.grid}>
              {MEMORIES.map((item) => (
                <motion.div key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)} animate={!selectedId ? { y: [0, -10, 0] } : { y: 0 }} transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} style={{ ...styles.cardFrame, opacity: selectedId === item.id ? 0 : 1, pointerEvents: selectedId ? 'none' : 'auto' }}>
                  <div style={styles.imageContainer}><img src={item.url} style={styles.imageFill} alt={item.title} /></div>
                  <p style={styles.cardTitle}>{item.title}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TELA 2: MENSAGENS */}
          {currentPage === 'mensagens' && (
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

          {/* TELA 3: MERCADO NOTURNO */}
          {currentPage === 'mercado' && (
            <motion.div key="mercado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.mercadoMain}>
              <h1 style={styles.mercadoHeader}>MERCADO.NOTURNO</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>ESTOQUE LIMITADO PARA VOCÊ</p>
              
              <div style={styles.mercadoGrid}>
                {MERCADO_ITENS.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <motion.div 
                      ref={el => cardRefs.current[item.id] = el}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleRevelar(item.id)}
                      style={{ ...styles.mercadoCard, borderColor: revelados[item.id] ? item.cor : 'rgba(255,255,255,0.3)', background: revelados[item.id] ? '#1a252e' : 'rgba(0,0,0,0.6)' }}
                    >
                      {!revelados[item.id] ? (
                        <div style={{ ...styles.cardCenter, color: 'rgba(255,255,255,0.3)' }}>
                          <div style={styles.diamondOuter}><div style={styles.diamondInner}></div></div>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={styles.cardContent}>
                          <span style={{ color: item.cor, fontSize: '0.7rem', fontWeight: 'bold' }}>VALORANT // VALE</span>
                          <h3 style={styles.mercadoLabel}>{item.label}</h3>
                          <div style={{ ...styles.glowEffect, backgroundColor: item.cor }}></div>
                        </motion.div>
                      )}
                    </motion.div>

                    {revelados[item.id] && (
                      <button onClick={() => downloadVale(item.id, item.label)} style={styles.downloadBtn}>
                        <Download size={16} /> Salvar Vale
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TELA 4: ESCREVER CARTA (NOVA!) */}
          {currentPage === 'escrever' && (
            <motion.div key="escrever" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.mercadoMain}>
              <h1 style={styles.mercadoHeader}>DEIXE UM RECADO</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>CARTA PARA O RAFA</p>
              
              <div style={styles.formContainer}>
                {!sucesso ? (
                  <>
                    <textarea 
                      style={styles.textArea} 
                      placeholder="Escreva aqui tudo o que você sente... Pode ser uma mensagem, um poema, uma lembrança ou até mesmo um desabafo. O importante é que venha do coração! ❤️"
                      value={mensagemManu}
                      onChange={(e) => setMensagemManu(e.target.value)}
                    />
                    
                    <label style={styles.uploadBtn}>
                      <ImagePlus size={20} />
                      {imagemManu ? imagemManu.name : "Anexar uma foto (Opcional)"}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImagemManu(e.target.files[0])} 
                        style={{ display: 'none' }} 
                      />
                    </label>

                    <button 
                      onClick={enviarParaRafael} 
                      disabled={enviando}
                      style={{ ...styles.downloadBtn, width: '100%', opacity: enviando ? 0.5 : 1, marginTop: '10px' }}
                    >
                      {enviando ? "ENVIANDO..." : <><Send size={16} style={{marginRight: '8px'}}/> ENVIAR PARA O RAFAEL</>}
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ padding: '20px' }}>
                    <Heart color="#ff4655" fill="#ff4655" size={60} style={{ margin: '0 auto 20px auto', display: 'block' }} />
                    <h2 style={{ color: '#fff' }}>Recado Guardado!</h2>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>Sua mensagem e foto já foram salvas com segurança.</p>
                    <button onClick={() => {setSucesso(false); setMensagemManu(''); setImagemManu(null);}} style={styles.navBtnActive}>Enviar outro recado</button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <button onClick={() => alert('Meu amor te encontra onde nós podemos ter o primeiro encontro depois do e-mail  🧭❤️')} style={styles.compassBtn}>
        <Compass size={20} /> Bússola
      </button>

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

const styles = {
  container: {
    minHeight: '100vh', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'sans-serif', padding: '20px', overflowX: 'hidden', transition: 'background 0.5s ease'
  },
  loginCard: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' },
  input: { padding: '12px', borderRadius: '10px', border: 'none', marginTop: '15px', textAlign: 'center', width: '200px' },
  button: { padding: '12px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#ff85a2', color: '#fff', cursor: 'pointer', marginTop: '15px' },
  
  // --- CABEÇALHO E NAVEGAÇÃO RESPONSIVA ---
  header: {
    position: 'fixed', top: 0, left: 0, width: '100%', padding: '15px 20px', boxSizing: 'border-box',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 100, pointerEvents: 'none' 
  },
  nav: {
    display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px 12px', borderRadius: '30px',
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', pointerEvents: 'auto', maxWidth: '75%' 
  },
  navBtn: { padding: '8px 15px', borderRadius: '25px', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' },
  navBtnActive: { padding: '8px 15px', borderRadius: '25px', border: 'none', background: '#fff', color: '#ff85a2', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' },
  
  // --- ÍCONE SUPERIOR DO MERCADO ---
  mercadoIconBtn: {
    pointerEvents: 'auto', border: '2px solid #ff4655', borderRadius: '4px', width: '35px', height: '50px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    boxShadow: '0 0 8px rgba(255, 70, 85, 0.4)', transition: 'background 0.3s', flexShrink: 0, marginTop: '2px' 
  },
  smallDiamond: { width: '10px', height: '10px', background: '#ff4655', transform: 'rotate(45deg)' },

  // --- RESTANTES COMPONENTES ---
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
  closeBtn: { position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' },
  
  // --- ESTILOS DO MERCADO NOTURNO ---
  mercadoMain: { width: '100%', maxWidth: '1000px', textAlign: 'center', marginTop: '100px', padding: '0 10px', boxSizing: 'border-box' },
  mercadoHeader: { color: '#ff4655', fontSize: 'clamp(1.8rem, 8vw, 3rem)', margin: 0, fontWeight: '900', letterSpacing: '2px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', wordBreak: 'break-word' },
  mercadoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', padding: '10px' },
  mercadoCard: { height: '260px', backdropFilter: 'blur(10px)', border: '2px solid', borderRadius: '8px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  cardCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  diamondOuter: { width: '40px', height: '40px', border: '2px solid currentColor', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  diamondInner: { width: '10px', height: '10px', background: 'currentColor' },
  cardContent: { padding: '20px', zIndex: 2 },
  mercadoLabel: { color: '#fff', fontSize: '1.2rem', margin: '20px 0', textTransform: 'uppercase', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' },
  glowEffect: { position: 'absolute', bottom: '-20px', left: '-20px', right: '-20px', height: '60px', filter: 'blur(40px)', opacity: 0.4, zIndex: 1 },
  downloadBtn: { background: '#00ff88', border: 'none', color: '#000', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0, 255, 136, 0.2)' },
  
  // --- ESTILOS DO FORMULÁRIO DE CARTAS (NOVOS!) ---
  formContainer: { background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '30px', maxWidth: '500px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px', boxSizing: 'border-box' },
  textArea: { width: '100%', height: '150px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#fff', padding: '15px', fontSize: '1rem', fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' },
  uploadBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed #ff4655', color: '#ff4655', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.3s' },
};