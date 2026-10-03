import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ImagePlus, Send, PenTool, MessageCircleHeart } from 'lucide-react';
import { styles } from '../styles/themeStyles';

export default function CaixaCartas({
  cartasTab, setCartasTab,
  notificacoes,
  sucesso, setSucesso,
  mensagemManu, setMensagemManu,
  imagemManu, setImagemManu,
  enviarParaRafael, enviando,
  carregandoCartas, cartasList,
  respondendoId, setRespondendoId,
  respostaRafa, setRespostaRafa,
  enviarResposta, marcarComoLida
}) {
  return (
    <motion.div key="escrever" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.mercadoMain}>
      <h1 style={styles.mercadoHeader}>CAIXA DE CARTAS</h1>
      <p style={{ color: '#fff', marginBottom: '30px', fontFamily: 'monospace' }}>NOSSO ESPAÇO DE MENSAGENS</p>

      <div style={styles.cartasTabContainer}>
        <button onClick={() => setCartasTab('escrever')} style={cartasTab === 'escrever' ? styles.cartasTabBtnActive : styles.cartasTabBtn}>Escrever Novo Recado</button>
        <button onClick={() => setCartasTab('lidas')} style={cartasTab === 'lidas' ? styles.cartasTabBtnActive : styles.cartasTabBtn}>
          Nossas Cartas {notificacoes > 0 && `(${notificacoes})`}
        </button>
      </div>

      {cartasTab === 'escrever' ? (
        <div style={styles.formContainer}>
          {!sucesso ? (
            <>
              <textarea style={styles.textArea} placeholder="Escreva aqui tudo o que você sente..." value={mensagemManu} onChange={(e) => setMensagemManu(e.target.value)} />
              <label style={styles.uploadBtn}>
                <ImagePlus size={20} />
                {imagemManu ? imagemManu.name : "Anexar uma foto (Opcional)"}
                <input type="file" accept="image/*" onChange={(e) => setImagemManu(e.target.files[0])} style={{ display: 'none' }} />
              </label>
              <button onClick={enviarParaRafael} disabled={enviando} style={{ ...styles.downloadBtn, width: '100%', opacity: enviando ? 0.5 : 1, marginTop: '10px' }}>
                {enviando ? "ENVIANDO..." : <><Send size={16} style={{ marginRight: '8px' }} /> ENVIAR PARA O RAFAEL</>}
              </button>
            </>
          ) : (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ padding: '20px' }}>
              <Heart color="#ff4655" fill="#ff4655" size={60} style={{ margin: '0 auto 20px auto', display: 'block' }} />
              <h2 style={{ color: '#fff' }}>Recado Guardado!</h2>
              <button onClick={() => { setSucesso(false); setMensagemManu(''); setImagemManu(null); }} style={styles.navBtnActiveStyle}>Escrever mais um</button>
            </motion.div>
          )}
        </div>
      ) : (
        <div style={styles.listaCartasContainer}>
          {carregandoCartas ? (
            <p style={{ color: '#fff' }}>Procurando no coração do banco de dados...</p>
          ) : cartasList.length === 0 ? (
            <p style={{ color: '#fff' }}>Nenhuma carta foi enviada ainda. Que tal ser a primeira a escrever?</p>
          ) : (
            cartasList.map((carta, index) => (
              <motion.div
                key={carta.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                style={styles.cartaItem}
              >
                <div style={styles.cartaGlowEfeito}></div>
                <div style={styles.cartaHeader}>
                  <span style={styles.cartaData}>
                    {carta.data?.toDate ? carta.data.toDate().toLocaleDateString('pt-BR') : 'Data desconhecida'}
                  </span>
                  <Heart size={16} fill="rgba(255,133,162,0.3)" color="#ff85a2" />
                </div>
                {carta.fotoUrl && (
                  <div style={styles.cartaImagemContainer}>
                    <img src={carta.fotoUrl} alt="Anexo da carta" style={styles.cartaFotoUrl} />
                  </div>
                )}
                <p style={styles.cartaTexto}>{carta.texto}</p>
                {carta.resposta ? (
                  <div style={styles.respostaBox}>
                    <h4 style={{ color: '#00ff88', margin: '0 0 8px 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <MessageCircleHeart size={18} /> Rafa respondeu:
                    </h4>
                    <p style={styles.respostaTexto}>{carta.resposta}</p>
                    {carta.lidaPorManu === false && (
                      <button onClick={() => marcarComoLida(carta.id)} style={styles.btnMarcarLida}>
                        <Heart size={14} fill="#ff85a2" color="#ff85a2" /> Marcar como lida
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ marginTop: '15px', position: 'relative', zIndex: 2 }}>
                    {respondendoId === carta.id ? (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <textarea
                          style={styles.textAreaResposta}
                          placeholder="Escreva a sua resposta..."
                          value={respostaRafa}
                          onChange={(e) => setRespostaRafa(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => enviarResposta(carta.id)} style={styles.btnSalvarResposta}>Salvar Resposta</button>
                          <button onClick={() => setRespondendoId(null)} style={styles.btnCancelarResposta}>Cancelar</button>
                        </div>
                      </motion.div>
                    ) : (
                      <button onClick={() => setRespondendoId(carta.id)} style={styles.btnResponderRafa}>
                        <PenTool size={14} /> Responder (Apenas Rafa)
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
