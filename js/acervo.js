// ACERVO: é aqui que entram as fotos e os vídeos do site.
// Para acrescentar uma foto: salve o arquivo em img/acervo/ (WebP, até 1600 px no lado maior,
// sem GPS) com o nome ano_evento_musica.webp e copie um bloco { ... } abaixo.
//   ano       número (ou null se ainda não se sabe)
//   periodo   opcional: escreve 'anos 80' no lugar do ano quando só se sabe a década
//   foto      caminho do arquivo; deixe "" para mostrar uma moldura vazia, "foto a encontrar"
//   descricao o que a foto mostra, para quem não enxerga (leitores de tela)
//   legenda   o texto que aparece embaixo da foto
//   credito   quem fotografou ou cedeu (opcional)
//   provisorio true enquanto a legenda ainda não foi conferida
//   conferir  o que ainda falta confirmar (aparece como "a conferir")

var ACERVO_FOTOS = [
  { ano: 1976, foto: '', descricao: '', legenda: 'A primeira edição do Festival da Canção de Alvinópolis.', provisorio: true },
  { ano: 1980, periodo: 'anos 80', foto: '', descricao: '', legenda: 'Os festivais dos anos 1980: palco, plateia e cartazes da época.', provisorio: true },
  { ano: 1987, foto: 'img/acervo/1987_verde-terra_nos-os-loucos_capa.webp', w: 1200, h: 1200,
    descricao: 'Capa do LP Nós, os loucos, do Verde Terra: homens de terno sentados a uma mesa posta, com um garçom de pé',
    legenda: 'Capa do LP “Nós, os loucos”, do Verde Terra, banda nascida nos festivais.', credito: 'Foto da capa: Mauro Sérvulo Gomes' },
  { ano: 1990, periodo: 'anos 90', foto: '', descricao: '', legenda: 'Os festivais dos anos 1990.', provisorio: true },
  { ano: 2009, foto: 'img/acervo/2009_festival-alvinopolis_meu-triunfo-e-o-rock-n-roll.webp', w: 448, h: 336,
    descricao: 'Banda tocando guitarras no palco do festival, com luzes coloridas e fumaça',
    legenda: '29º Festival da Canção. Apresentação de “Meu triunfo é o rock n’ roll”, premiada como melhor intérprete.' },
  { ano: 2012, foto: 'img/acervo/2012_festival-alvinopolis_monotonia.webp', w: 960, h: 720,
    descricao: 'Integrantes de uma banda posando em tom de brincadeira numa praça à noite',
    legenda: 'Noite de festival em 2012. A banda Hard Case, melhor intérprete com “Monotonia”.' },
  { ano: 2014, foto: 'img/acervo/2014_festival-alvinopolis_o-espelho-do-outro-lado.webp', w: 960, h: 640,
    descricao: 'Banda no palco do Festival da Canção de Alvinópolis',
    legenda: 'Festival de 2014. Paralello apresenta “O espelho do outro lado”.', credito: 'Foto: fimagens.com' },
  { ano: 2014, foto: 'img/acervo/2014_festival-alvinopolis-premiacao_o-espelho-do-outro-lado.webp', w: 960, h: 720,
    descricao: 'Premiados no palco segurando o troféu em forma de clave de sol',
    legenda: 'Premiação de 2014, com o troféu em forma de clave de sol.' },
  { ano: 2016, foto: 'img/acervo/2016_festival-alvinopolis-fase-local_encruzilhada.webp', w: 960, h: 540,
    descricao: 'Banda tocando num bar, com o banner do 36º Festival da Canção ao fundo',
    legenda: '36º Festival da Canção. Fase local no Celeiro Bar.' },
  { ano: 2019, foto: 'img/acervo/2019_festival-alvinopolis-premiacao_no-leito.webp', w: 744, h: 690,
    descricao: 'Quatro amigos abraçados segurando o troféu de primeiro lugar geral',
    legenda: '37º Festival da Canção. Troféu de 1º lugar geral para “No Leito”.' },
  { ano: 2023, foto: 'img/acervo/2023_festival-alvinopolis_lugubre.webp', w: 1063, h: 563,
    descricao: 'Cantor de braços abertos no palco do festival',
    legenda: '38º Festival da Canção. Apresentação de “Lúgubre”.' },
  { ano: 2023, foto: 'img/acervo/2023_festival-alvinopolis-premiacao_lugubre.webp', w: 1599, h: 1066,
    descricao: 'Músicos no palco segurando os cheques da premiação',
    legenda: '38º Festival da Canção. Prêmio de Melhor Música de Alvinópolis.' },
  { ano: 2025, foto: 'img/acervo/2025_festival-alvinopolis-premiacao_meandros.webp', w: 1078, h: 832,
    descricao: 'Amigos comemoram com uma placa diante do banner do 39º Festival da Canção',
    legenda: '39º Festival da Canção. Melhor Música de Alvinópolis com “Meandros”.' },
  { ano: 2026, foto: 'img/acervo/2026_festival-alvinopolis_do-avesso-1.webp', w: 1600, h: 1200,
    descricao: 'Banda no palco, com o telão mostrando um disco e a torre de uma igreja',
    legenda: '40º Festival da Canção, cinquenta anos depois do primeiro.' },
  { ano: 2026, foto: 'img/acervo/2026_festival-alvinopolis_do-avesso-2.webp', w: 1200, h: 1600,
    descricao: 'Dois músicos tocando violões sob luzes azuis no palco',
    legenda: '40º Festival da Canção. Apresentação de “Do Avesso”.' },
  { ano: 2026, foto: 'img/acervo/2026_festival-alvinopolis-premiacao_do-avesso.webp', w: 1200, h: 1600,
    descricao: 'Grupo abraçado no palco com o troféu de Melhor Música de Alvinópolis',
    legenda: '40º Festival da Canção. Premiação de Melhor Música de Alvinópolis.' },
  // fotos do blog Alvinópolis Que Pensa, de Marcos Martino (aprovadas pelo Thales; legendas em acervo/para-o-site/fotos.json)
  {"ano": null, "foto": "img/acervo/blog/foto-musicos.webp", "w": 480, "h": 326, "descricao": "Babucho, Tutuia, Lete Morcego, José Sylvio, Tião, Tuca e Mauricio “Bife” no colo.", "legenda": "Músicos antigos de Alvinópolis.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Ano da foto desconhecido; quem está sentado: Dosa ou Sr. Darcy?"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-flavio.webp", "w": 485, "h": 322, "descricao": "Encontro no festival de 2010.", "legenda": "Jovelino e Flávio do Carmo, o primeiro campeão.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-04.webp", "w": 500, "h": 376, "descricao": "Festival de 2010", "legenda": "Festival de 2010.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Sem legenda no blog; título tirado do nome do arquivo (FESTIVAL 2010)."},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-05.webp", "w": 500, "h": 376, "descricao": "Jurados do festival", "legenda": "Jurados do festival.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Sem legenda no blog; título tirado do nome do arquivo (JURADOS II). Quem são?"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-06.webp", "w": 500, "h": 376, "descricao": "Jurados de Morte (RS)", "legenda": "Jurados de Morte (RS).", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Sem legenda no blog; o nome do arquivo é JURADOS DE MORTE (RS). É uma banda do RS ou os jurados?"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-07.webp", "w": 485, "h": 322, "descricao": "Legenda do blog: “Ponto Morto - Destaque da Terra”.", "legenda": "Ponto Morto, destaque da terra.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-08.webp", "w": 485, "h": 322, "descricao": "Legenda do blog: “BANDA ISQUEIRO D'GUA”.", "legenda": "Banda Isqueiro D'Água.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-09.webp", "w": 299, "h": 336, "descricao": "Legenda do blog: “O campeoníssimo Gil Damata”.", "legenda": "Gil Damata.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-10.webp", "w": 448, "h": 336, "descricao": "Legenda do blog: “Murilão, bom tê-lo de volta”.", "legenda": "Murilão.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-11.webp", "w": 333, "h": 336, "descricao": "Legenda do blog: “Zebeto, outro super campeão”.", "legenda": "Zebeto.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-2010-galeria-12.webp", "w": 500, "h": 376, "descricao": "Legenda do blog: “A lua também veio nos visitar”.", "legenda": "A lua também veio.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2010, "foto": "img/acervo/blog/foto-sicilianos-01.webp", "w": 320, "h": 238, "descricao": "Foto do post em que a banda fala do festival.", "legenda": "Babi Jaques e Os Sicilianos, do Recife.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Sem legenda no blog; não se sabe quem aparece."},
  {"ano": 2010, "foto": "img/acervo/blog/foto-sicilianos-02.webp", "w": 320, "h": 240, "descricao": "Foto do post em que a banda fala do festival.", "legenda": "Babi Jaques e Os Sicilianos, do Recife.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Sem legenda no blog; não se sabe quem aparece."},
  {"ano": 2010, "foto": "img/acervo/blog/foto-sicilianos-03.webp", "w": 320, "h": 240, "descricao": "Babi Jaques e Os Sicilianos recebendo o troféu e o cheque, ao lado de Marcos e Jovelino.", "legenda": "Babi Jaques e Os Sicilianos recebem o troféu.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-01.webp", "w": 640, "h": 480, "descricao": "1º Pré-Festival", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-02.webp", "w": 640, "h": 480, "descricao": "Foto publicada junto ao comentário sobre “Musa dos meus sonhos”.", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-03.webp", "w": 640, "h": 480, "descricao": "Foto publicada junto ao comentário sobre “Mentes que não mentem”.", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-04.webp", "w": 640, "h": 480, "descricao": "Foto publicada junto ao comentário sobre “Nirvana”.", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-05.webp", "w": 640, "h": 480, "descricao": "Foto publicada junto ao comentário sobre “Milhares de Vozes”.", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-06.webp", "w": 640, "h": 480, "descricao": "Foto publicada junto ao comentário sobre “Poeta do Interior”.", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-07.webp", "w": 640, "h": 480, "descricao": "Banda Case", "legenda": "Banda Case.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-08.webp", "w": 640, "h": 480, "descricao": "1º Pré-Festival", "legenda": "1º Pré-Festival.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa", "conferir": "Sem legenda no blog; quem está no palco?"},
  {"ano": 2011, "foto": "img/acervo/blog/foto-prefestival-09.webp", "w": 480, "h": 640, "descricao": "Quarrygirls", "legenda": "Quarrygirls.", "credito": "Fotos de Marcela de Belinha (Facebook), publicadas no blog Alvinópolis Que Pensa"},
  {"ano": 2014, "foto": "img/acervo/blog/foto-thayson.webp", "w": 526, "h": 394, "descricao": "Thayson Azevedo e a banda Paralela", "legenda": "Thayson Azevedo e a banda Paralela.", "credito": "Blog Alvinópolis Que Pensa, de Marcos Martino", "conferir": "Ano é o do post (2014), não necessariamente o da foto."},
  {"ano": 2017, "foto": "img/acervo/blog/foto-verdeterra.webp", "w": 960, "h": 528, "descricao": "Foto de Mirlene Dalmásio.", "legenda": "Verde Terra.", "credito": "Foto de Mirlene Dalmásio, publicada no blog Alvinópolis Que Pensa", "conferir": "Ano é o do post (2017), não necessariamente o da foto."}
];

// VÍDEOS: cole em "youtube" só o código do vídeo (o que vem depois de watch?v= no endereço).
// Sem código, o quadro mostra "em digitalização".
var ACERVO_VIDEOS = [
  { ano: null, youtube: '', titulo: 'Gravações em VHS dos anos 1980 e 1990', legenda: 'Fitas cedidas por moradores, em digitalização.', provisorio: true },
  { ano: null, youtube: '', titulo: 'Reportagens e transmissões locais', legenda: 'Material de rádio e TV sobre o festival.', provisorio: true },
  { ano: 2026, youtube: '', titulo: '40º Festival da Canção', legenda: 'Trechos das apresentações da edição de cinquenta anos.', provisorio: true }
];
