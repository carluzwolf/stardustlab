/* ============================================================
 * CONFIGURACAO DO SITE - edite aqui precos, textos e links.
 * (Tudo abaixo e exemplo: ajuste quando os valores estiverem fechados.)
 * ============================================================ */
window.STARDUST = {
  instagram: 'https://instagram.com/stardust.ino',
  instagramHandle: '@stardust.ino',
  email: '',          // ex.: 'contato@stardustlabs.com.br'  (deixe '' para esconder)
  whatsapp: '',       // ex.: '5511999999999'  (so numeros, com DDI+DDD). Se preencher, o botao Comprar usa o WhatsApp.
  currency: 'R$',
  launch: '2027',     // previsao de lancamento
  founder: 'Carlos Henrique',
  founderInstagram: 'https://instagram.com/carluzsnt',
  founderHandle: '@carluzsnt'
};

window.KARLU_PRODUCTS = [
  {
    id: 'v1',
    name: 'Karlu V1',
    tag: 'Essencial',
    price: null,   // preco a definir (quando fechar, ex.: 249.9)
    face: 1,        // cor dos olhos (0-23, igual ao firmware)
    react: ['happy', 'wink', 'cute'],
    holdReact: 'happy',
    tagline: 'O olhar que ganha vida.',
    short: 'O bichinho virtual de olhos animados para levar no chaveiro, na mochila ou na calça. Display redondo e 78 reações.',
    long: 'A versão essencial do Karlu traz o coração do projeto: um bichinho virtual de olhos expressivos que piscam, olham em volta, mudam de humor e reagem sozinhos. Um acessório tecnológico para levar com você e começar a sua coleção.',
    features: [
      'Display redondo 1,28" com olhos animados em alta definição',
      '24 combinações de cores de olhos (inclusive heterocromia)',
      '78 reações: risada, sono, susto, paixão, bravo, tonto e muito mais',
      'Piscadas, olhares e humores naturais, nunca repetitivos',
      'Troca de rosto com nuvem de fumaça a cada 1 a 3 minutos',
      'Controle por Bluetooth: escolha cores e reações do celular',
      'Animação de abertura com a marca Stardust Labs'
    ]
  },
  {
    id: 'v2',
    name: 'Karlu V2',
    tag: 'Voz e som',
    price: null,   // preco a definir (quando fechar, ex.: 249.9)
    face: 2,
    react: ['curious', 'cute', 'wink'],
    holdReact: 'curious',
    tagline: 'Ele ouve. Ele responde.',
    short: 'Tudo da V1, com microfone amplificador de voz e alto-falante: o Karlu escuta você e faz sons.',
    long: 'A V2 dá ouvidos ao Karlu. Com o amplificador de voz ele percebe quando você fala e reage na hora: inclina a cabeça, arregala os olhos, leva susto com barulho forte e até faz cambalhota com duas palmas. E com o alto-falante, ele também sabe fazer som.',
    features: [
      'Tudo o que a V1 tem',
      'Microfone com amplificador de voz: escuta e reage à sua voz',
      'Susto com barulho forte; duas palmas = cambalhota',
      'Alto-falante para sons, bipes e reações sonoras',
      'Inclina a cabeça e arregala os olhos quando você fala',
      'Controle por Bluetooth'
    ]
  },
  {
    id: 'v3',
    name: 'Karlu V3',
    tag: 'Completo',
    price: null,   // preco a definir (quando fechar, ex.: 249.9)
    face: 20,
    react: ['surprise', 'dizzy', 'think'],
    holdReact: 'surprise',
    tagline: 'Ele vê, sente e se mexe com você.',
    short: 'O Karlu completo: voz, som, giroscópio e câmera. Reage ao ambiente, ao movimento e até aos seus gestos.',
    long: 'A V3 é o Karlu em sua forma máxima. Além da voz e do som, o giroscópio sente quando ele é girado ou balançado (e ele fica tonto!), e a câmera deixa o robô enxergar o ambiente e reagir aos seus gestos: faça um joinha e ele sorri, mostre o dedo e ele fica triste.',
    features: [
      'Tudo o que a V2 tem',
      'Giroscópio: detecta giro e movimento, e ele fica tonto',
      'Câmera: reage ao ambiente e aos gestos da sua mão',
      'Joinha deixa ele feliz; gesto feio deixa ele triste',
      'Mais expressões e reações em cada novidade',
      'Controle por Bluetooth'
    ]
  }
];

// tabela de comparacao (linhas) - true / false por versao [v1, v2, v3]
window.KARLU_COMPARE = [
  ['Display redondo com olhos animados', [true, true, true]],
  ['24 cores de olhos + 78 reações', [true, true, true]],
  ['Controle por Bluetooth', [true, true, true]],
  ['Microfone amplificador de voz', [false, true, true]],
  ['Alto-falante', [false, true, true]],
  ['Giroscópio (detecta giro e movimento)', [false, false, true]],
  ['Câmera (ambiente e gestos)', [false, false, true]]
];
