// --- IMPORTAÇÕES DAS IMAGENS ---
import foto1 from '../assets/piquenique.jpg';
import foto2 from '../assets/date.jpg';
import foto3 from '../assets/juntos.jpg';
import foto4 from '../assets/fofa.jpg';
import foto5 from '../assets/adesivo.jpg';
import foto6 from '../assets/Thousand.jpg';
import foto7 from '../assets/Unwritten.jpg';
import foto8 from '../assets/Tears.jpg';
import foto9 from '../assets/FixYou.jpg';
import foto10 from '../assets/Tekit.jpg';
import foto11 from '../assets/escola.jpg';
import foto12 from '../assets/kartodromo.jpg';
import foto13 from '../assets/formatura.jpg';
import foto14 from '../assets/passeio.jpg';
import foto15 from '../assets/qd.jpg';
import foto16 from '../assets/praia.jpg';
import foto17 from '../assets/flores.jpg';

export const SPECIAL_MESSAGES = {
  "Estiver com saudades": "Lembre-se que cada segundo longe é um segundo mais perto do nosso próximo abraço. Eu te amo!",
  "Tiver tido um dia difícil": "Você é a pessoa mais forte que eu conheço. Descanse, amanhã o sol nasce de novo e eu estarei aqui por você.",
  "Estiver feliz": "Sua felicidade é o meu combustível! Guarda esse sorriso em um potinho e me conta tudo depois.",
  "Precisar de um incentivo": "Você é capaz de conquistar o mundo. Eu acredito em você mais do que qualquer pessoa!",
  "Estiver insegura": "Olhe para tudo o que você já conquistou até aqui. Você é talentosa, inteligente e a designer mais incrível que eu conheço!",
  "Precisar conversar": "Lembra que eu atravessaria a cidade para te fazer experimentar um macarrão e ter a pequena chance de ouvir seu coração!",
  "Estiver brava comigo": "Desculpa se eu fiz algo errado, amor. Respire fundo e lembre que meu coração é todo seu, mesmo quando eu sou meio bobo.",
  "Precisar de um abraço": "Imagine que estou te apertando bem forte agora mesmo. Sinta todo o meu carinho chegando aí!"
};

export const MEMORIES = [
  { id: 1, url: foto1, title: 'Nosso Momento' },
  { id: 2, url: foto2, title: 'Um dia Especial' },
  { id: 3, url: foto3, title: 'Juntos' },
  { id: 4, url: foto4, title: 'Fofa' },
  { id: 5, url: foto5, title: 'Adesivo' }
];

export const MERCADO_ITENS = [
  { id: 1, label: 'VALE ABRAÇOS', cor: '#ff4655' },
  { id: 2, label: 'VALE DATE', cor: '#ffb000' },
  { id: 3, label: 'VALE FILME', cor: '#00ccff' },
  { id: 4, label: 'R$ 200 LEO COSMÉTICOS', cor: '#ffb000' },
  { id: 5, label: 'VALE JANTAR', cor: '#ff4655' },
];

export const NOSSAS_MUSICAS = [
  { id: 1, titulo: 'Nossa Música Principal', artista: 'A Thousand Years - Christina Perri', foto: foto6, audioUrl: '/Thousand.mp3' },
  { id: 2, titulo: 'Música que me lembra você', artista: 'Unwritten - Natasha Bedingfield', foto: foto7, audioUrl: '/Unwritten.mp3' },
  { id: 3, titulo: 'Momento Especial', artista: 'My Tears Ricochet - Taylor Swift', foto: foto8, audioUrl: '/TearsRicochet.mp3' },
  { id: 4, titulo: 'Para dias chuvosos', artista: 'Fix You - Coldplay', foto: foto9, audioUrl: '/FixYou.mp3' },
  { id: 5, titulo: 'Gosto mais por sua causa', artista: 'Tek It - Cafuné', foto: foto10, audioUrl: '/Cafuné.mp3' }
];

export const MOTIVOS = [
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
  "Amo saber que posso contar com você para absolutamente tudo."
];

export const DATA_DO_NAMORO = new Date('2023-11-24T19:00:00');

export const TEXTO_AVISO_ESPECIAL = "Atualização: Agora Você pode responder as mensagens de maneira individual e realizado ajustes na estilização do site";

export const NOSSA_HISTORIA = [
  { id: 1, data: 'O Começo', titulo: 'Como tudo começou', descricao: 'O dia em que os nossos caminhos se cruzaram e a minha vida ficou muito mais colorida eu mal conseguia olhar em seus olhos, mas não pude esconder os sentimentos que senti.' },
  { id: 2, data: 'O Primeiro Beijo', titulo: 'O instante mágico', descricao: 'O momento exato em que eu tive a certeza que você era a pessoa certa para mim, em uma sala de cinema e com nossos amigos em comum.' },
  { id: 3, data: 'A distância', titulo: 'Tempos complicados', descricao: 'Em minha rotina cansada no quartel, senti que a cada vez que nos falávamos, o coração acelerava e a saudade aumentava, e aos poucos fui sumindo.' },
  { id: 4, data: 'O Outubro', titulo: 'Nosso momento mais turbulento', descricao: 'Mesmo tendo outros amores, eu achava que estar próximo de você era o que me fazia sentir vivo. mas o mês de outubro me marcou, fui afastado e com o coração apertado eu atendi o pedido de seu coração, mas nunca deixei de pensar em você.' },
  { id: 5, data: 'O Reencontro', titulo: 'Voltando a ser nós', descricao: 'Depois de um tempo afastados, um E-mail cheio de sentimento e o destino nos colocou frente a frente novamente, e foi como se o tempo tivesse parado. A conexão que sempre tivemos voltou com força total, e eu soube que era hora de lutar por nós, meu maior desejo era lutar por nós.' },
  { id: 6, data: 'Hoje', titulo: 'O presente e o futuro', descricao: 'Foi como um sonho novamente, um sonho que eu tive que acordar... eu ainda espero por você todos os dias, mesmo que seja pior para mim eu ainda quero que seja você, meu amor, talvez não leia isso, mas eu te amo, não importa o tempo que precisse para se curar de suas feridas, eu estive aqui e vou estar para sempre! Sinto sua falta.' },
  { id: 7, data: 'O Futuro', titulo: 'Aguardando para poder te amar', descricao: 'Espero por você todos os dias... que possa sentir o meu amor por você, ele nunca vai acabar.' }
];

export const PONTOS_MAPA = [
  { id: 1, titulo: "Onde tudo começou ❤️", subtitulo: "Primeiro Olhar", coords: [-26.360509406851072, -48.8145075853796], descricao: "Foi aqui, nas ruas dessa cidade, que a nossa história começou a ser escrita. Cada canto daqui me lembra do seu sorriso.", foto: foto11 },
  { id: 2, titulo: "Nosso Cantinho Favorito 🧺", subtitulo: "Refúgio de paz", coords: [-26.29794098630198, -48.883185497933624], descricao: "O lugar onde as horas parecem minutos e o mundo lá fora simplesmente deixa de importar quando estou com você.", foto: foto1 },
  { id: 3, titulo: "Aquele Passeio Inesquecível", subtitulo: "Praia Sol e Você", coords: [-26.69635115424046, -48.68009224740443], descricao: "Cada passo ao seu lado aqui me fez ter certeza absoluta de que você é a mulher da minha vida.", foto: foto16 },
  { id: 4, titulo: "Carros e Risadas 🚗", subtitulo: "Aventura a dois", coords: [-26.23010565233631, -48.82539200773499], descricao: "Os momentos de risada e emoção que compartilhamos em nossa jornada juntos.", foto: foto12 },
  { id: 5, titulo: "Preparativos para sua festa", subtitulo: "Flores são lindas com você", coords: [-26.31794004133291, -48.84267400265913], descricao: "Os momentos em que o tempo parece parar e a beleza da vida se revela.", foto: foto17 },
  { id: 6, titulo: "Queremos Deus com a gente", subtitulo: "Dança e suas lindas risadas", coords: [-26.34866949412732, -48.82130716958494], descricao: "Onde pude olhar você dançar e rir, momentos que guardarei para sempre.", foto: foto15 }
];

export const ESTRELAS_CEU = [
  { id: 1, top: '22%', left: '35%', titulo: "Brilho ✨", texto: "Admiro a sua luz própria e a sua individualidade, mesmo quando observo de longe." },
  { id: 2, top: '32%', left: '20%', titulo: "Presença 🤍", texto: "Mesmo nos dias mais silenciosos, o meu carinho por você continua firme e imutável aqui." },
  { id: 3, top: '50%', left: '22%', titulo: "Calma 🍃", texto: "Não há pressa, não há cobranças. O amor verdadeiro sabe esperar o tempo de cada um." },
  { id: 4, top: '68%', left: '34%', titulo: "Apoio 🌟", texto: "Estou sempre aqui torcendo por você e por cada conquista sua, com muito orgulho." },
  { id: 5, top: '82%', left: '50%', titulo: "Abrigo 🏠", texto: "Saiba que o meu abraço e o meu respeito continuam sendo um porto seguro para você." },
  { id: 6, top: '68%', left: '66%', titulo: "Espaço 🕊️", texto: "Amo a sua independência e respeito profundamente o seu tempo e o seu momento." },
  { id: 7, top: '50%', left: '78%', titulo: "Cuidado 🌸", texto: "Cuide bem de você e da sua mente. O seu bem-estar é o que mais importa para mim." },
  { id: 8, top: '32%', left: '80%', titulo: "Constância 🌌", texto: "O meu sentimento por você é como o céu da noite: calmo, imenso e permanente." },
  { id: 9, top: '22%', left: '65%', titulo: "Leveza 🎈", texto: "Que o seu dia traga paz e respostas leves, exatamente da forma que você precisar." },
  { id: 10, top: '35%', left: '50%', titulo: "Nós 🔐", texto: "Guardo com infinito carinho e proteção absoluta cada pedacinho da nossa história." }
];
