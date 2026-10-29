// Toca-causos: cada causo de js/causos.js é uma faixa do disco. Escolher uma faixa baixa a agulha
// e o causo sai impresso como primeira página de jornal. Clicar no disco pausa e volta a girar.
(function(){
  var causos = window.ACERVO_CAUSOS || [];
  var caixa = document.getElementById('tocaCausos');
  if (!caixa || !causos.length) return;
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var disco = document.getElementById('tcDisco');
  var selo = document.getElementById('tcSelo');
  var jornal = document.getElementById('tcJornal');
  var lista = document.getElementById('tcFaixas');
  var contador = document.getElementById('tcContador');
  var metade = Math.ceil(causos.length / 2);
  var atual = 0, girando = true;

  function el(tag, classe, texto){
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }
  function numero(i){ return (i < 9 ? '0' : '') + (i + 1); }
  function lado(i){ return i < metade ? 'A' : 'B'; }

  // a lista de faixas, dividida em lado A e lado B
  var botoes = [];
  causos.forEach(function(c, i){
    if (i === 0) lista.appendChild(el('p', 'tc-lado', 'Lado A'));
    if (i === metade) lista.appendChild(el('p', 'tc-lado', 'Lado B'));
    var b = el('button', 'tc-faixa');
    b.type = 'button';
    b.appendChild(el('span', 'tc-n', numero(i)));
    b.appendChild(el('span', '', c.titulo));
    if (c.destaque) b.appendChild(el('span', 'tc-estrela', '★'));
    b.addEventListener('click', function(){
      escolher(i, true);
      if (window.innerWidth < 860) jornal.scrollIntoView({ block: 'start', behavior: reduzir ? 'auto' : 'smooth' });
    });
    lista.appendChild(b);
    botoes.push(b);
  });

  function escolher(i, comSom){
    atual = (i + causos.length) % causos.length;
    var c = causos[atual];
    botoes.forEach(function(b, n){ b.setAttribute('aria-current', n === atual ? 'true' : 'false'); });
    selo.textContent = c.titulo;
    selo.appendChild(el('small', '', 'lado ' + lado(atual) + ' · faixa ' + numero(atual)));
    contador.textContent = 'faixa ' + numero(atual) + ' de ' + causos.length + ' · 33⅓ rpm';

    // a primeira página
    jornal.textContent = '';
    jornal.classList.toggle('tem-hit', !!c.destaque);
    if (c.destaque) jornal.appendChild(el('span', 'tc-hit', 'faixa de trabalho'));
    var cab = el('header', 'tc-cabeca');
    var nome = el('span', 'tc-nome', 'O Toca-');
    nome.appendChild(el('i', '', 'Causos'));
    cab.appendChild(nome);
    var ed = el('span', 'tc-edicao');
    ed.appendChild(el('span', '', 'Alvinópolis · MG'));
    ed.appendChild(el('span', '', 'lado ' + lado(atual) + ' · faixa ' + numero(atual)));
    ed.appendChild(el('span', '', c.ano ? 'ano: ' + c.ano : 'ano: o blog não diz'));
    cab.appendChild(ed);
    jornal.appendChild(cab);
    jornal.appendChild(el('p', 'tc-chapeu', c.destaque ? '♫ faixa de trabalho · crença da terra' : '♪ causos do festival'));
    jornal.appendChild(el('h3', '', c.titulo));
    if (c.linhaFina) jornal.appendChild(el('p', 'tc-linhafina', c.linhaFina));
    var pauta = el('div', 'tc-pauta');
    pauta.setAttribute('aria-hidden', 'true');
    ['♪', '♩', '♫', '♪'].forEach(function(s, k){
      var n = el('span', '', s);
      n.style.left = (8 + k * 22 + ((atual * 7 + k * 13) % 9)) + '%';
      n.style.top = (-8 + ((atual + k) % 4) * 4) + 'px';
      pauta.appendChild(n);
    });
    jornal.appendChild(pauta);
    var col = el('div', 'tc-colunas');
    (c.paragrafos || []).forEach(function(p){ col.appendChild(el('p', '', p)); });
    jornal.appendChild(col);
    if (c.conferir){ var cf = el('p', 'tc-conferir', c.conferir); jornal.appendChild(cf); }
    var fonte = el('p', 'causo-fonte');
    fonte.appendChild(document.createTextNode('Fonte: Marcos Martino, “'));
    var a = el('a', '', c.fonte);
    a.href = c.url; a.target = '_blank'; a.rel = 'noopener';
    fonte.appendChild(a);
    fonte.appendChild(document.createTextNode('”, blog Alvinópolis Que Pensa' + (c.data ? ', ' + c.data : '') + '. História adaptada para o site' + (c.adaptacao ? ' por ' + c.adaptacao : '') + '.'));
    jornal.appendChild(fonte);

    if (!reduzir){ jornal.classList.remove('chegando'); void jornal.offsetWidth; jornal.classList.add('chegando'); }
    if (comSom && window.SOM){ SOM.agulha(); SOM.frase([0, 2, 4, 7].map(function(g){ return g + (atual % 3); }), 0.13); }
    girando = true; estado();
  }

  function estado(){
    caixa.classList.toggle('girando', girando);
    disco.setAttribute('aria-label', girando ? 'Pausar o disco' : 'Pôr o disco para girar');
  }
  disco.addEventListener('click', function(){ girando = !girando; estado(); if (girando && window.SOM) SOM.agulha(); });
  document.getElementById('tcAnterior').addEventListener('click', function(){ escolher(atual - 1, true); });
  document.getElementById('tcProximo').addEventListener('click', function(){ escolher(atual + 1, true); });
  document.getElementById('tcSorte').addEventListener('click', function(){
    var n = atual;
    while (causos.length > 1 && n === atual) n = Math.floor(Math.random() * causos.length);
    escolher(n, true);
  });

  escolher(0, false);
})();
