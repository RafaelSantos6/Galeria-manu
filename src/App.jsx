import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, BookHeart, Image as ImageIcon, Download, Send, ImagePlus, PenTool, Music, Gift, Clock, Star, MapPin } from 'lucide-react';
import { toPng } from 'html-to-image';

// --- COMPONENTES DO MAPA REAL ---
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
import foto6 from './assets/Thousand.jpg';
import foto7 from './assets/Unwritten.jpg';
import foto8 from './assets/Tears.jpg';
import foto9 from './assets/FixYou.jpg';
import foto10 from './assets/Tekit.jpg';
import foto11 from './assets/escola.jpg';
import foto12 from './assets/kartodromo.jpg';
import foto13 from './assets/formatura.jpg';
import foto14 from './assets/passeio.jpg';
import foto15 from './assets/qd.jpg';
import foto16 from './assets/praia.jpg';
import foto17 from './assets/flores.jpg';

const SPECIAL_MESSAGES = {
  "Estiver com saudades": "Lembre-se que cada second longe é um segundo mais perto do nosso próximo abraço. Eu te amo!",
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

const NOSSAS_MUSICAS = [
  { id: 1, titulo: 'Nossa Música Principal', artista: 'A Thousand Years - Christina Perri', foto: foto6, audioUrl: '/Thousand.mp3' },
  { id: 2, titulo: 'Música que me lembra você', artista: 'Unwritten - Natasha Bedingfield', foto: foto7, audioUrl: '/Unwritten.mp3' },
  { id: 3, titulo: 'Momento Especial', artista: 'My Tears Ricochet - Taylor Swift', foto: foto8, audioUrl: '/TearsRicochet.mp3' },
  { id: 4, titulo: 'Para dias chuvosos', artista: 'Fix You - Coldplay', foto: foto9, audioUrl: '/FixYou.mp3' },
  { id: 5, titulo: 'Gosto mais por sua causa', artista: 'Tek It - Cafuné', foto: foto10, audioUrl: '/Cafuné.mp3' }
];

const MOTIVOS = [
  "Amo a sua paixão pela sua profissão de designer.",
  "Amo como a sua criatividade transforma qualquer momento simples em algo especial.",
  "Amo o seu bom gosto e o seu olhar único para tudo o que faz.",
  "Amo ver a dedicação e o carinho que você coloca nos seus projetos.",
  "Amo a forma como você repara nos detalhes que ninguém mais nota.",
  "Amo quando você me mostra suas ideias e seus olhos brilham.",
  "Amo a sua sensibilidade artística e o seu talento.",
  "Amo o fato de você tornar a minha vida muito mais colorida e bonita.",
  "Amo como a sua mente criativa me inspira a ser alguém melhor.",
  "Amo ver você orgulhosa do seu próprio trabalho.",
  "Amo o quanto a gente se diverte junto, não importa onde esteja.",
  "Amo as nossas conversas infinitas sobre tudo e nada.",
  "Amo que você topa minhas ideias, até as mais aleatórias.",
  "Amo o fato de você ser a minha melhor amiga e o meu amor ao mesmo tempo.",
  "Amo a nossa cumplicidade e o jeito que a gente se entende só pelo olhar.",
  "Amo quando a gente sai da rotina e vai passear ou viver uma aventura.",
  "Amo criar memórias ao seu lado, como os nossos dias em parques de diversão.",
  "Amo que o meu lugar favorito no mundo é qualquer lugar, desde que seja com você.",
  "Amo como a gente se completa e faz um time perfeito.",
  "Amo saber que posso conta com você para absolutamente tudo.",
  "Amo o som da sua risada (é a minha melodia favorita).",
  "Amo o fato de que até o silêncio com você é confortável.",
  "Amo como você aceita e abraça todas as minhas versões.",
  "Amo planejar o futuro com você, sabendo que o caminho vai ser incrível.",
  "Amo as nossas piadas internas que só nós dois entendemos.",
  "Amo como você desperta o meu lado mais poético.",
  "Amo que você é a musa inspiradora dos meus melhores pensamentos e poesias.",
  "Amo como o meu coração acelera (e desacelera) do jeito certo quando te vejo.",
  "Amo escrever sobre você, porque o amor que sinto transborda em palavras.",
  "Amo a paz que você me traz em dias cheios de responsabilidades.",
  "Amo o fato de você ser o meu refúgio seguro depois de um longo dia de trabalho.",
  "Amo como você me dá forças para enfrentar qualquer desafio na rotina militar.",
  "Amo o orgulho que sinto no peito toda vez que digo que você é a minha namorada.",
  "Amo como o seu abraço parece um encaixe perfeito, feito sob medida para mim.",
  "Amo o fato de você me fazer querer ser a melhor versão de mim mesmo todos os dias.",
  "Amo como o seu sorriso ilumina qualquer lugar.",
  "Amo o jeito carinhoso e doce que você cuida de mim.",
  "Amo o jeito como você me apoia nos meus hobbies e no meu trabalho com tecnologia.",
  "Amo quando você demonstra que estava pensando em mim do nada.",
  "Amo o cheiro do seu perfume que fica gravado na minha mente.",
  "Amo o toque das suas mãos nas minhas.",
  "Amo a sua voz e como ela me acalma instantaneamente.",
  "Amo quando você me olha com aquele olharzinho de quem está aprontando algo.",
  "Amo o seu jeito único de demonstrar afeto.",
  "Amo receber suas mensagens de carinho no meio do dia.",
  "Amo como você se importa com o meu bem-estar e com as minhas coisas.",
  "Amo quando a gente divide fones de ouvido para escutar nossa playlist no Spotify.",
  "Amo o cuidado que você tem com cada pequeno detalhe da nossa relação.",
  "Amo o seu abraço apertado, daqueles que parecem colar qualquer pedaço quebrado.",
  "Amo a leveza que você traz para os meus dias mais pesados.",
  "Amo a expectativa gostosa de planejar nossa próxima viagem juntos.",
  "Amo olhar para as nossas fotos e ver o quanto somos felizes juntos.",
  "Amo pegar a estrada sabendo que o destino final fica ainda melhor com você.",
  "Amo o seu espírito de companheirismo em cada passeio.",
  "Amo como até uma voltinha de carro vira um momento especial se você está no carona.",
  "Amo ver você empolgada conhecendo novos lugares e experiências.",
  "Amo o fato de que a vida é uma grande aventura ao seu lado.",
  "Amo quando a gente planeja até os mínimos detalhes dos nossos rolês.",
  "Amo olhar para trás e ver tudo o que já construímos e vivemos juntos.",
  "Amo saber que os melhores capítulos da nossa história ainda estão por vir.",
  "Amo a sua empatia e o seu coração enorme.",
  "Amo como você me faz sentir amado, valorizado e único.",
  "Amo o respeito profundo que temos um pelo outro.",
  "Amo a sua paciência e a sua capacidade incrível de ouvir.",
  "Amo como você consegue me fazer sorrir mesmo quando estou sério ou cansado.",
  "Amo o calor do seu abraço nos dias mais frios.",
  "Amo quando você segura a minha mão bem firme enquanto estamos andando.",
  "Amo o cafuné que você me dá quando estamos relaxando.",
  "Amo a segurança e o aconchego que sinto quando estamos juntos.",
  "Amo o fato de você ser exatamente quem você é, sem tirar nem pôr.",
  "Amo a sua autenticidade e a sua verdade.",
  "Amo a sua doçura misturada com a sua força indescritível.",
  "Amo como você vibra pelas minhas conquistas como se fossem suas.",
  "Amo saber que nos momentos difíceis nós seguramos a mão um do outro ainda mais forte.",
  "Amo a leveza do seu riso solto.",
  "Amo o fato de que você me conhece tão bem, às vezes melhor do que eu mesmo.",
  "Amo como a gente consegue conversar por horas sem ver o tempo passar.",
  "Amo o sincronismo perfeito dos nossos pensamentos.",
  "Amo quando a gente fala a mesma coisa ao mesmo tempo e dá risada.",
  "Amo o carinho com que você trata as coisas e as pessoas que são importantes para mim.",
  "Amo como a sua presença transforma qualquer ambiente em um lugar acolhedor.",
  "Amo a sua determinação e a forma como você corre atrás dos seus sonhos.",
  "Amo o brilho único que você tem e que ilumina toda a minha vida.",
  "Amo o jeito como você me desafia de forma positiva a crescer e a evoluir.",
  "Amo a sensação de paz que dá no peito só de lembrar de você durante o dia.",
  "Amo que você é a primeira pessoa com quem quero compartilhar qualquer novidade.",
  "Amo dormir e acordar com a certeza de que tenho você na minha vida.",
  "Amo o cheiro doce do seu cabelo.",
  "Amo o quanto o seu beijo ainda faz o meu mundo parar por completo.",
  "Amo a forma como você se encaixa perfeitamente na minha vida.",
  "Amo o fato de que o meu amor por você só cresce a cada dia que passa.",
  "Amo olhar para você e ter a certeza absoluta de que fiz a escolha certa.",
  "Amo como você faz o conceito de 'para sempre' parecer a coisa mais natural do mundo.",
  "Amo a nossa história, com cada detalhe, linha e curva que desenhamos juntos.",
  "Amo a certeza de que, não importa o que aconteça, estaremos do mesmo lado.",
  "Amo o jeito como você me faz acreditar em finais felizes todos os dias.",
  "Amo a sua alma, a sua essência e tudo o que te torna única.",
  "Amo você por inteiro: suas qualidades, suas manias e seu jeito lindo de ser.",
  "Amo o simples fato de você existir e ter me escolhido.",
  "Amo você simplesmente por ser você, a minha Manu.",
  "Amo a profundidade dos seus olhos castanhos, que parecem ler a minha alma.",
  "Amo como os seus olhos castanhos brilham quando você tem uma ideia nova de design.",
  "Amo ver o mundo através do seu olhar de designer, cheio de estética e significado.",
  "Amo a cor dos seus olhos castanhos quando recebem a luz do sol.",
  "Amo como você consegue expressar sentimentos tão lindos usando apenas o seu talento nos seu design.",
  "Amo me perder no calor e no mistério dos seus olhos castanhos.",
  "Amo o orgulho que sinto quando vejo uma arte linda que você criou do zero.",
  "Amo a harmonia perfeita entre o seu talento para o design e a doçura do seu olhar.",
  "Amo ver como os seus olhos castanhos ficam expressivos quando você está concentrada criando.",
  "Amo que o seu lado designer faz você enxergar beleza e potencial até nas coisas mais simples.",
  "Amo a sensibilidade que você transmite tanto nos seus olhos castanhos quanto nos seus projetos."
];

const DATA_DO_NAMORO = new Date('2023-11-24T19:00:00'); 

const NOSSA_HISTORIA = [
  { id: 1, data: 'O Começo', titulo: 'Como tudo começou', descricao: 'O dia em que os nossos caminhos se cruzaram e a minha vida ficou muito mais colorida eu mal conseguia olhar em seus olhos, mas não pude esconder os sentimentos que senti.' },
  { id: 2, data: 'O Primeiro Beijo', titulo: 'O instante mágico', descricao: 'O momento exato em que eu tive a certeza que você era a pessoa certa para mim, em uma sala de cinema e com nossos amigos em comum.' },
  { id: 3, data: 'A distância', titulo: 'Tempos complicados', descricao: 'Em minha rotina cansada no quartel, senti que a cada vez que nos falávamos, o coração acelerava e a saudade aumentava, e aos poucos fui sumindo.' },
  { id: 4, data: 'O Outubro', titulo: 'Nosso momento mais turbulento', descricao: 'Mesmo tendo outros amores, eu achava que estar próximo de você era o que me fazia sentir vivo. mas o mês de outubro me marcou, fui afastado e com o coração apertado eu atendi o pedido de seu coração, mas nunca deixei de pensar em você.' },
  { id: 5, data: 'O Reencontro', titulo: 'Voltando a ser nós', descricao: 'Depois de um tempo afastados, um E-mail cheio de sentimento e o destino nos colocou frente a frente novamente, e foi como se o tempo tivesse parado. A conexão que sempre tivemos voltou com força total, e eu soube que era hora de lutar por nós, meu maior desejo era lutar por nós.' },
  { id: 6, data: 'Hoje', titulo: 'O presente e o futuro', descricao: 'Foi como um sonho novamente, um sonho que eu tive que acordar... eu ainda espero por você todos os dias, mesmo que seja pior para mim eu ainda quero que seja você, meu amor, talvez não leia isso, mas eu te amo, não importa o tempo que precisse para se curar de suas feridas, eu estive aqui e vou estar para sempre! Sinto sua falta.' },
  { id: 7, data: 'O Futuro', titulo: 'Aguardando para poder te amar', descricao: 'Espero por você todos os dias... que possa sentir o meu amor por você, ele nunca vai acabar.' }
];

const PONTOS_MAPA = [
  {
    id: 1,
    titulo: "Onde tudo começou ❤️",
    subtitulo: "Primeiro Olhar",
    coords: [-26.360509406851072, -48.8145075853796], 
    descricao: "Foi aqui, nas ruas dessa cidade, que a nossa história começou a ser escrita. Cada canto daqui me lembra do seu sorriso.",
    foto: foto11
  },
  {
    id: 2,
    titulo: "Nosso Cantinho Favorito 🧺",
    subtitulo: "Refúgio de paz",
    coords: [-26.29794098630198, -48.883185497933624], 
    descricao: "O lugar onde as horas parecem minutos e o mundo lá fora simplesmente deixa de importar quando estou com você.",
    foto: foto1
  },
  {
    id: 3,
    titulo: "Aquele Passeio Inesquecível",
    subtitulo: "Praia Sol e Você",
    coords: [-26.69635115424046, -48.68009224740443], 
    descricao: "Cada passo ao seu lado aqui me fez ter certeza absoluta de que você é a mulher da minha vida.",
    foto: foto16
  },
  {id: 4,
    titulo: "Carros e Risadas 🚗",
    subtitulo: "Aventura a dois",
    coords: [-26.23010565233631, -48.82539200773499],
    descricao: "Os momentos de risada e emoção que compartilhamos em nossa jornada juntos.",
    foto: foto12
  },
  {id: 5,
    titulo: "Preparativos para sua festa",
    subtitulo: "Flores são lindas com você",
    coords: [-26.31794004133291, -48.84267400265913],
    descricao: "Os momentos em que o tempo parece parar e a beleza da vida se revela.",
    foto: foto17
  },
  {
    id: 6,
    titulo: "Queremos Deus com a gente",
    subtitulo: "Dança e suas lindas risadas",
    coords: [-26.34866949412732, -48.82130716958494],
    descricao: "Onde pude olhar você dançar e rir, momentos que guardarei para sempre.",
    foto: foto15
  }

];

// Ícone personalizado de coração para o mapa Leaflet
const heartIcon = new L.DivIcon({
  html: `<div style="color: #ff85a2; filter: drop-shadow(0px 2px 5px rgba(0,0,0,0.4)); animation: pulse 1.5s infinite alternate;"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ff85a2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>`,
  className: 'custom-heart-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14, { animate: true, duration: 1 });
  }, [center, map]);
  return null;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [currentPage, setCurrentPage] = useState('galeria');
  const [activeMessage, setActiveMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [revelados, setRevelados] = useState({});
  
  const [mensagemManu, setMensagemManu] = useState('');
  const [imagemManu, setImagemManu] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [motivoSorteado, setMotivoSorteado] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [mapCenter, setMapCenter] = useState([-26.3045, -48.8464]);

  const audioRefs = useRef({});
  const cardRefs = useRef({});

  const coracoesIniciais = useRef(
    Array.from({ length: 30 }).map((_, i) => ({
      id: i, left: `${Math.random() * 100}%`, delay: Math.random() * 5, duration: Math.random() * 6 + 5, size: Math.random() * 20 + 15
    }))
  ).current;

  useEffect(() => {
    if (currentPage === 'tempo') {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = now - DATA_DO_NAMORO;
        if (difference > 0) {
          setTimeTogether({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  const toggleRevelar = (id) => setRevelados(prev => ({ ...prev, [id]: true }));

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '2411') {
      setShowSuccessAnim(true);
      setTimeout(() => setIsAuthenticated(true), 1800);
    } else alert('Senha incorreta! ❤️');
  };

  const downloadVale = (id, label) => {
    if (cardRefs.current[id]) {
      toPng(cardRefs.current[id], { cacheBust: true }).then((dataUrl) => {
        const link = document.createElement('a'); link.download = `${label}.png`; link.href = dataUrl; link.click();
      }).catch((err) => console.error('Erro ao exportar imagem', err));
    }
  };

  const enviarParaRafael = async () => {
    if (!mensagemManu && !imagemManu) { alert('Escreva algo ou adicione uma foto! Irei ver tudo com muito carinho ❤️'); return; }
    setEnviando(true);
    try {
      let imageUrl = "";
      if (imagemManu) {
        const imageRef = ref(storage, `recados/${Date.now()}_${imagemManu.name}`);
        await uploadBytes(imageRef, imagemManu);
        imageUrl = await getDownloadURL(imageRef); 
      }
      await addDoc(collection(db, "cartas_para_rafael"), { texto: mensagemManu, fotoUrl: imageUrl, data: new Date() });
      setSucesso(true);
    } catch (erro) { console.error("Erro ao salvar:", erro); alert('Ops! Ocorreu um erro.'); }
    setEnviando(false);
  };

  const handlePlayAudio = (id) => {
    NOSSAS_MUSICAS.forEach((track) => {
      const audioElement = audioRefs.current[track.id];
      if (audioElement) {
        if (track.id === id) { audioElement.play(); setPlayingAudioId(id); } 
        else audioElement.pause();
      }
    });
  };

  const sortearMotivo = () => {
    if (isShaking) return;
    setIsShaking(true); setMotivoSorteado(null);
    setTimeout(() => {
      setMotivoSorteado(MOTIVOS[Math.floor(Math.random() * MOTIVOS.length)]);
      setIsShaking(false);
    }, 800);
  };

  const currentBg = ['mercado', 'escrever', 'tempo', 'historia', 'mapa'].includes(currentPage)
    ? '#0f1923' : 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)';

  if (!isAuthenticated) {
    return (
      <div style={{ ...styles.container, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
          {coracoesIniciais.map((c) => (
            <motion.div key={c.id} initial={{ y: '110vh', opacity: 0 }} animate={{ y: '-10vh', opacity: [0, 0.8, 0.8, 0], x: [0, -30, 30, 0] }} transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }} style={{ position: 'absolute', left: c.left, color: 'rgba(255, 255, 255, 0.5)' }}>
              <Heart fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.5)" size={c.size} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={showSuccessAnim ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ ...styles.loginCard, zIndex: 10 }}>
          <Heart color="#ff85a2" fill="#ff85a2" size={48} />
          <h2 style={{ color: '#fff', margin: '20px 0' }}>Céu de Memórias</h2>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            <br /><button type="submit" style={styles.button}>Entrar</button>
          </form>
        </motion.div>

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
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, background: currentBg }}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <button onClick={() => setCurrentPage('galeria')} style={currentPage === 'galeria' ? styles.navBtnActive : styles.navBtn}><ImageIcon size={16} /> Galeria</button>
          <button onClick={() => setCurrentPage('mensagens')} style={currentPage === 'mensagens' ? styles.navBtnActive : styles.navBtn}><BookHeart size={16} /> Momentos</button>
          <button onClick={() => setCurrentPage('escrever')} style={currentPage === 'escrever' ? styles.navBtnActive : styles.navBtn}><PenTool size={16} /> Cartas</button>
          <button onClick={() => setCurrentPage('motivos')} style={currentPage === 'motivos' ? styles.navBtnActive : styles.navBtn}><Gift size={16} /> Motivos</button>
          <button onClick={() => setCurrentPage('tempo')} style={currentPage === 'tempo' ? styles.navBtnActive : styles.navBtn}><Clock size={16} /> Tempo</button>
          <button onClick={() => setCurrentPage('historia')} style={currentPage === 'historia' ? styles.navBtnActive : styles.navBtn}><Star size={16} /> História</button>
          <button onClick={() => setCurrentPage('mapa')} style={currentPage === 'mapa' ? styles.navBtnActive : styles.navBtn}><MapPin size={16} /> Lugares</button>
        </nav>
        {/* CORREÇÃO AQUI: item.id consertado para carregar o Mercado Noturno perfeitamente */}
        <motion.button whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 70, 85, 0.8)' }} onClick={() => setCurrentPage('mercado')} style={{ ...styles.mercadoIconBtn, background: currentPage === 'mercado' ? 'rgba(255, 70, 85, 0.2)' : 'transparent' }} title="Acessar Mercado.Noturno"><div style={styles.smallDiamond}></div></motion.button>
      </header>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          
          {currentPage === 'galeria' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <motion.div key="galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.grid}>
                {MEMORIES.map((item) => (
                  <motion.div key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)} animate={!selectedId ? { y: [0, -10, 0] } : { y: 0 }} transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} style={{ ...styles.cardFrame, opacity: selectedId === item.id ? 0 : 1, pointerEvents: selectedId ? 'none' : 'auto' }}>
                    <div style={styles.imageContainer}><img src={item.url} style={styles.imageFill} alt={item.title} /></div>
                    <p style={styles.cardTitle}>{item.title}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage('musicas')} style={styles.musicPageBtn}>
                <Music size={18} /> Ouvir Nossa Trilha Sonora ❤️
              </motion.button>
            </div>
          )}

          {currentPage === 'mensagens' && (
            <motion.div key="mensagens" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={styles.messageContainer}>
              <h2 style={{ color: '#fff', marginBottom: '30px' }}>Para cada momento...</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {Object.keys(SPECIAL_MESSAGES).map((key) => (<button key={key} onClick={() => setActiveMessage(key)} style={styles.msgBtn}>{key}</button>))}
              </div>
              <AnimatePresence>
                {activeMessage && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.messageDisplay}><p style={{ color: '#fff', fontStyle: 'italic' }}>"{SPECIAL_MESSAGES[activeMessage]}"</p></motion.div>)}
              </AnimatePresence>
            </motion.div>
          )}

          {currentPage === 'mercado' && (
            <motion.div key="mercado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.mercadoMain}>
              <h1 style={styles.mercadoHeader}>MERCADO.NOTURNO</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>ESTOQUE LIMITADO PARA VOCÊ</p>
              <div style={styles.mercadoGrid}>
                {MERCADO_ITENS.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <motion.div ref={el => cardRefs.current[item.id] = el} whileHover={{ scale: 1.02 }} onClick={() => toggleRevelar(item.id)} style={{ ...styles.mercadoCard, borderColor: revelados[item.id] ? item.cor : 'rgba(255,255,255,0.3)', background: revelados[item.id] ? '#1a252e' : 'rgba(0,0,0,0.6)' }}>
                      {!revelados[item.id] ? (<div style={{ ...styles.cardCenter, color: 'rgba(255,255,255,0.3)' }}><div style={styles.diamondOuter}><div style={styles.diamondInner}></div></div></div>) : 
                      (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={styles.cardContent}><span style={{ color: item.cor, fontSize: '0.7rem', fontWeight: 'bold' }}>VALORANT // VALE</span><h3 style={styles.mercadoLabel}>{item.label}</h3><div style={{ ...styles.glowEffect, backgroundColor: item.cor }}></div></motion.div>)}
                    </motion.div>
                    {revelados[item.id] && (<button onClick={() => downloadVale(item.id, item.label)} style={styles.downloadBtn}><Download size={16} /> Salvar Vale</button>)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'escrever' && (
            <motion.div key="escrever" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.mercadoMain}>
              <h1 style={styles.mercadoHeader}>DEIXE UM RECADO</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>CARTA PARA O RAFA</p>
              <div style={styles.formContainer}>
                {!sucesso ? (
                  <>
                    <textarea style={styles.textArea} placeholder="Escreva aqui tudo o que você sente..." value={mensagemManu} onChange={(e) => setMensagemManu(e.target.value)} />
                    <label style={styles.uploadBtn}><ImagePlus size={20} />{imagemManu ? imagemManu.name : "Anexar uma foto (Opcional)"}<input type="file" accept="image/*" onChange={(e) => setImagemManu(e.target.files[0])} style={{ display: 'none' }} /></label>
                    <button onClick={enviarParaRafael} disabled={enviando} style={{ ...styles.downloadBtn, width: '100%', opacity: enviando ? 0.5 : 1, marginTop: '10px' }}>
                      {enviando ? "ENVIANDO..." : <><Send size={16} style={{marginRight: '8px'}}/> ENVIAR PARA O RAFAEL</>}
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ padding: '20px' }}><Heart color="#ff4655" fill="#ff4655" size={60} style={{ margin: '0 auto 20px auto', display: 'block' }} /><h2 style={{ color: '#fff' }}>Recado Guardado!</h2><button onClick={() => {setSucesso(false); setMensagemManu(''); setImagemManu(null);}} style={styles.navBtnActive}>Enviar outro recado</button></motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentPage === 'musicas' && (
            <motion.div key="musicas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={styles.mercadoMain}>
              <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)' }}>NOSSA TRILHA SONORA</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>MÚSICAS ESPECIAIS COM NOSSAS MEMÓRIAS</p>
              <div style={styles.musicGrid}>
                {NOSSAS_MUSICAS.map((track) => (
                  <motion.div key={track.id} whileHover={{ y: -5 }} style={styles.musicCard}>
                    <img src={track.foto} style={styles.musicImg} alt={track.titulo} />
                    <div style={styles.musicInfo}><h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1.1rem' }}>{track.titulo}</h4><p style={{ color: '#ddd', margin: '0 0 12px 0', fontSize: '0.85rem', fontStyle: 'italic' }}>{track.artista}</p><audio ref={(el) => (audioRefs.current[track.id] = el)} controls src={track.audioUrl} onPlay={() => handlePlayAudio(track.id)} style={styles.audioPlayer} /></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'motivos' && (
            <motion.div key="motivos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.messageContainer}>
              <h2 style={{ color: '#fff', marginBottom: '10px' }}>Pote de Motivos</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '40px', fontSize: '0.95rem' }}>Clique no pote para descobrir motivos do porquê eu te amo.</p>
              <motion.div onClick={sortearMotivo} animate={isShaking ? { rotate: [-5, 5, -5, 5, 0], scale: 1.05 } : { rotate: 0, scale: 1 }} transition={{ duration: 0.5 }} style={styles.poteContainer}>
                <div style={styles.poteLid}></div>
                <div style={styles.poteBody}><Heart size={40} color="#ff85a2" fill={isShaking ? "#ff85a2" : "none"} /><p style={{color: '#fff', marginTop: '10px', fontWeight: 'bold'}}>Me aperte</p></div>
              </motion.div>
              <AnimatePresence>
                {motivoSorteado && !isShaking && (
                  <motion.div initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={styles.papelMotivo}>
                    <p style={{ color: '#333', fontSize: '1.2rem', fontFamily: 'serif', fontStyle: 'italic', margin: 0 }}>"{motivoSorteado}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentPage === 'tempo' && (
            <motion.div key="tempo" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={styles.mercadoMain}>
              <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)' }}>NOSSO TEMPO</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>CADA SEGUNDO COM VOCÊ É UM PRESENTE</p>
              <div style={styles.timerContainer}>
                <div style={styles.timeBox}><span style={styles.timeNum}>{timeTogether.days}</span><span style={styles.timeLabel}>Dias</span></div>
                <div style={styles.timeBox}><span style={styles.timeNum}>{timeTogether.hours}</span><span style={styles.timeLabel}>Horas</span></div>
                <div style={styles.timeBox}><span style={styles.timeNum}>{timeTogether.minutes}</span><span style={styles.timeLabel}>Minutos</span></div>
                <div style={styles.timeBox}><span style={styles.timeNum}>{timeTogether.seconds}</span><span style={styles.timeLabel}>Segundos</span></div>
              </div>
            </motion.div>
          )}

          {currentPage === 'historia' && (
            <motion.div key="historia" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.mercadoMain}>
              <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)' }}>NOSSA HISTÓRIA</h1>
              <p style={{ color: '#fff', marginBottom: '40px', fontFamily: 'monospace' }}>OS CAPÍTULOS MAIS LINDOS DA MINHA VIDA</p>
              <div style={styles.timeline}>
                <div style={styles.timelineLine}></div>
                {NOSSA_HISTORIA.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={styles.timelineItem}>
                    <div style={styles.timelineDot}><Heart size={16} color="#fff" fill="#fff" /></div>
                    <div style={styles.timelineContent}>
                      <span style={styles.timelineDate}>{item.data}</span>
                      <h3 style={styles.timelineTitle}>{item.titulo}</h3>
                      <p style={styles.timelineText}>{item.descricao}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TELA 9: MAPA INTERATIVO CORRIGIDO E INTEGRADO */}
          {currentPage === 'mapa' && (
            <motion.div key="mapa" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={styles.mapPageWrapper}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ ...styles.mercadoHeader, color: '#fff', textShadow: '2px 2px 10px rgba(255,133,162,0.3)' }}>MAPA AFETIVO DE JOINVILLE</h1>
                <p style={{ color: '#fff', marginBottom: '30px', fontFamily: 'monospace' }}>CADA CANTO DA CIDADE GUARDA UM DETALHE NOSSO</p>
              </div>

              <div style={styles.mapLayoutContainer}>
                {/* LISTA LATERAL */}
                <div style={styles.mapSidebar}>
                  {PONTOS_MAPA.map((ponto) => (
                    <motion.div 
                      key={ponto.id} 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setMapCenter(ponto.coords)}
                      style={{ 
                        ...styles.sidebarCard, 
                        border: mapCenter === ponto.coords ? '2px solid #ff85a2' : '1px solid rgba(255,255,255,0.1)',
                        background: mapCenter === ponto.coords ? 'rgba(255,133,162,0.15)' : 'rgba(0,0,0,0.4)'
                      }}
                    >
                      <h4 style={{ color: '#ff85a2', margin: '0 0 5px 0', fontSize: '1.1rem' }}>{ponto.titulo}</h4>
                      <span style={{ color: '#00ff88', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{ponto.subtitulo}</span>
                    </motion.div>
                  ))}
                </div>

                {/* MAPA REAL */}
                <div style={styles.mapWrapperBox}>
                  <MapContainer center={mapCenter} zoom={14} style={{ width: '100%', height: '100%' }} zoomControl={true}>
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    <ChangeView center={mapCenter} />
                    
                    {PONTOS_MAPA.map((ponto) => (
                      <Marker key={ponto.id} position={ponto.coords} icon={heartIcon}>
                        <Popup className="custom-romantic-popup">
                          <div style={styles.popupContent}>
                            <img src={ponto.foto} style={styles.popupImage} alt={ponto.titulo} />
                            <h3 style={{ margin: '10px 0 3px 0', color: '#ff85a2', fontSize: '1.2rem' }}>{ponto.titulo}</h3>
                            <span style={{ color: '#00ff88', fontSize: '0.75rem', fontWeight: 'bold' }}>{ponto.subtitulo}</span>
                            <p style={{ color: '#333', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.4' }}>{ponto.descricao}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

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
      
      <style>{`
        .custom-romantic-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95) !important;
          border-radius: 15px !important;
          padding: 5px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important;
          max-width: 250px !important;
        }
        .custom-romantic-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95) !important;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', overflowX: 'hidden', transition: 'background 0.5s ease' },
  loginCard: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' },
  input: { padding: '12px', borderRadius: '10px', border: 'none', marginTop: '15px', textAlign: 'center', width: '200px', outline: 'none' },
  button: { padding: '12px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#ff85a2', color: '#fff', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' },
  
  header: { position: 'fixed', top: 0, left: 0, width: '100%', padding: '15px 20px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000, pointerEvents: 'none' },
  nav: { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px', borderRadius: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', pointerEvents: 'auto', maxWidth: 'calc(100% - 60px)', justifyContent: 'center' },
  navBtn: { padding: '8px 12px', borderRadius: '25px', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' },
  navBtnActive: { padding: '8px 12px', borderRadius: '25px', border: 'none', background: '#fff', color: '#ff85a2', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' },
  mercadoIconBtn: { pointerEvents: 'auto', border: '2px solid #ff4655', borderRadius: '4px', width: '35px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 8px rgba(255, 70, 85, 0.4)', transition: 'background 0.3s', flexShrink: 0, margin: 0 },
  smallDiamond: { width: '10px', height: '10px', background: '#ff4655', transform: 'rotate(45deg)' },

  grid: { display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '100px', maxWidth: '1000px' },
  cardFrame: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', width: '240px', height: '185px', padding: '10px', borderRadius: '20px', cursor: 'pointer' },
  imageContainer: { width: '100%', height: '135px', borderRadius: '12px', overflow: 'hidden', marginBottom: '8px' },
  imageFill: { width: '100%', height: '100%', objectFit: 'cover' },
  cardTitle: { color: '#fff', textAlign: 'center', fontSize: '0.9rem', margin: 0 },
  messageContainer: { textAlign: 'center', marginTop: '100px', maxWidth: '600px', width: '100%' },
  msgBtn: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', padding: '15px', borderRadius: '15px', color: '#fff', cursor: 'pointer', width: '180px' },
  messageDisplay: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '25px', borderRadius: '20px', marginTop: '30px', border: '1px solid rgba(255,255,255,0.3)' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modalContent: { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', position: 'relative' },
  modalImgFit: { maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px', objectFit: 'contain' },
  closeBtn: { position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' },
  
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
  formContainer: { background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '30px', maxWidth: '500px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px', boxSizing: 'border-box' },
  textArea: { width: '100%', height: '150px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#fff', padding: '15px', fontSize: '1rem', fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' },
  uploadBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed #ff4655', color: '#ff4655', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.3s' },
  musicPageBtn: { background: '#fff', color: '#ff85a2', border: 'none', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginTop: '35px' },
  musicGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '10px', width: '100%', maxWidth: '900px', margin: '0 auto' },
  musicCard: { display: 'flex', background: 'rgba(0, 0, 0, 0.67)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '15px', alignItems: 'center', gap: '15px', textAlign: 'left', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
  musicImg: { width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' },
  musicInfo: { flex: 1, display: 'flex', flexDirection: 'column' },
  audioPlayer: { width: '100%', height: '32px', borderRadius: '8px' },
  poteContainer: { width: '150px', margin: '0 auto', cursor: 'pointer' },
  poteLid: { width: '110px', height: '25px', background: 'rgba(255,255,255,0.5)', margin: '0 auto', borderRadius: '10px 10px 0 0', border: '2px solid rgba(255,255,255,0.6)', borderBottom: 'none' },
  poteBody: { width: '150px', height: '180px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(15px)', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.1)' },
  papelMotivo: { background: '#fdfbf7', padding: '25px', borderRadius: '15px', marginTop: '40px', border: '1px solid #e0dcd3', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', maxWidth: '400px', margin: '40px auto 0 auto' },
  timerContainer: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginTop: '30px' },
  timeBox: { background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '20px', minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  timeNum: { color: '#ff85a2', fontSize: '2.5rem', fontWeight: 'bold', margin: '0' },
  timeLabel: { color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' },
  timeline: { position: 'relative', maxWidth: '600px', margin: '0 auto', padding: '20px 0', textAlign: 'left' },
  timelineLine: { position: 'absolute', left: '14px', top: '0', bottom: '0', width: '2px', background: 'rgba(255, 133, 162, 0.4)', zIndex: 1 },
  timelineItem: { display: 'flex', gap: '20px', marginBottom: '40px', position: 'relative', zIndex: 2 },
  timelineDot: { width: '30px', height: '30px', background: '#ff85a2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 10px rgba(255, 133, 162, 0.8)' },
  timelineContent: { background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '20px', borderRadius: '15px', flex: 1 },
  timelineDate: { color: '#ff85a2', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' },
  timelineTitle: { color: '#fff', margin: '5px 0 10px 0', fontSize: '1.2rem' },
  timelineText: { color: '#ddd', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' },
  
  // --- ESTILOS DO CONTEÚDO DO MAPA REAL ---
  mapPageWrapper: { width: '100%', maxWidth: '1200px', marginTop: '100px', padding: '0 20px', boxSizing: 'border-box' },
  mapLayoutContainer: { display: 'flex', gap: '20px', height: '550px', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap-reverse' },
  mapSidebar: { width: '300px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '5px', flexShrink: 0, height: '100%', boxSizing: 'border-box' },
  sidebarCard: { padding: '15px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', backdropFilter: 'blur(5px)', transition: '0.2s' },
  mapWrapperBox: { flex: 2, minWidth: '300px', height: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 },
  popupContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  popupImage: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }
};