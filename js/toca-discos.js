// Toca-discos dos campeões: os anos passam sozinhos no disco, de 1976 até hoje.
// Clicar no disco pausa; os botões e as setas do teclado voltam e avançam.
(function(){
  var dados = window.ACERVO_CAMPEOES || [];
  var disco = document.getElementById('disco');
  if (!disco || !dados.length) return;
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cada campeão toca uma nota desta melodia (graus da escala de dó maior; 0 = dó central).
  var MELODIA = [2, 4, 5, 4, 7, 5, 4, 2, 1, 2, 4, 5, 7, 8, 7, 5, 4, 5, 7, 9, 8, 7, 5, 4];
  var HZ = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99];

  // edição e nota de cada ano
  var edicao = 0, n = 0;
  dados.forEach(function(d){
    if (d.tipo === 'festival'){ edicao++; d.edicao = edicao; }
    if (d.tipo !== 'pausa'){ d.grau = MELODIA[n % MELODIA.length]; n++; }
  });

  // som: caixinha de música feita no próprio navegador (desligado até a pessoa ligar)
  var audio = null, somLigado = false;
  function tocar(grau){
    if (!somLigado) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audio) audio = new AC();
    if (audio.state === 'suspended') audio.resume();
    var agora = audio.currentTime, dur = 2.2;
    var saida = audio.createGain();
    saida.gain.setValueAtTime(0.0001, agora);
    saida.gain.exponentialRampToValueAtTime(0.2, agora + 0.015);
    saida.gain.exponentialRampToValueAtTime(0.0001, agora + dur);
    saida.connect(audio.destination);
    [[1, 'triangle', 1], [2, 'sine', 0.35], [4.01, 'sine', 0.08]].forEach(function(p){
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = p[1]; o.frequency.value = HZ[grau] * p[0];
      g.gain.value = p[2];
      o.connect(g); g.connect(saida);
      o.start(agora); o.stop(agora + dur + 0.05);
    });
  }

  // o toca-discos
  var ficha = document.getElementById('fichaDisco');
  var campos = {
    rotuloAno: document.getElementById('discoRotuloAno'),
    edicao: document.getElementById('discoEdicao'),
    musica: document.getElementById('discoMusica'),
    autor: document.getElementById('discoAutor'),
    cidade: document.getElementById('discoCidade'),
    obs: document.getElementById('discoObs')
  };
  var TEMPO = 5200, TEMPO_PAUSA = 3000;   // quanto tempo cada ano fica no disco (ms)
  var atual = 0;
  function escolher(i){
    atual = (i + dados.length) % dados.length;
    var d = dados[atual];
    campos.rotuloAno.textContent = d.ano;
    campos.edicao.textContent = d.ano + ' · ' + (d.tipo === 'festival' ? d.edicao + 'º festival'
      : d.tipo === 'fase-local' ? 'fase local' : 'sem festival');
    if (d.tipo === 'pausa'){
      campos.musica.textContent = 'Pausa';
      campos.autor.textContent = '';
    } else if (d.semVencedor){
      campos.musica.textContent = 'Sem campeão';
      campos.autor.textContent = d.autor;
    } else if (!d.musica){
      campos.musica.textContent = 'Vencedor a confirmar';
      campos.autor.textContent = 'Você sabe quem ganhou? Conte pra gente.';
    } else {
      campos.musica.textContent = '“' + d.musica + '”';
      campos.autor.textContent = d.autor;
    }
    campos.cidade.textContent = d.cidade || '';
    campos.obs.textContent = d.obs || '';
    disco.classList.toggle('silencio', d.tipo === 'pausa');
    if (!reduzir){ ficha.classList.remove('surgindo'); void ficha.offsetWidth; ficha.classList.add('surgindo'); }
    if (d.tipo !== 'pausa') tocar(d.grau);
  }

  // passagem automática: começa quando a seção aparece, para quando sai da tela
  var tocando = !reduzir, visivel = false, relogio = null;
  function agendar(){
    clearTimeout(relogio); relogio = null;
    if (!tocando || !visivel) return;
    relogio = setTimeout(function(){ escolher(atual + 1); agendar(); }, dados[atual].tipo === 'pausa' ? TEMPO_PAUSA : TEMPO);
  }
  function estado(){
    disco.classList.toggle('tocando', tocando && visivel);
    disco.setAttribute('aria-pressed', tocando ? 'false' : 'true');
    disco.setAttribute('aria-label', tocando ? 'Pausar a passagem dos campeões' : 'Continuar a passagem dos campeões');
    agendar();
  }
  disco.addEventListener('click', function(){ tocando = !tocando; estado(); });
  document.getElementById('discoAnterior').addEventListener('click', function(){ escolher(atual - 1); agendar(); });
  document.getElementById('discoProximo').addEventListener('click', function(){ escolher(atual + 1); agendar(); });

  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(e){ visivel = e[0].isIntersecting; estado(); }, { threshold: 0.35 })
      .observe(document.getElementById('campeoes'));
  } else { visivel = true; }

  var btSom = document.getElementById('somPartitura');
  btSom.addEventListener('click', function(){
    somLigado = !somLigado;
    btSom.setAttribute('aria-pressed', somLigado ? 'true' : 'false');
    btSom.textContent = somLigado ? '♪ Desligar o som' : '♪ Ligar o som';
    if (somLigado && dados[atual].tipo !== 'pausa') tocar(dados[atual].grau);
  });

  // setas do teclado, com o foco no toca-discos
  document.getElementById('vitrola').addEventListener('keydown', function(e){
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    escolher(atual + (e.key === 'ArrowRight' ? 1 : -1)); agendar();
  });

  // links de outras seções que levam a um ano da partitura (ex.: data-ano="1981")
  [].forEach.call(document.querySelectorAll('a[data-ano]'), function(a){
    a.addEventListener('click', function(){
      var i = dados.findIndex(function(d){ return String(d.ano) === a.getAttribute('data-ano'); });
      if (i >= 0){ tocando = false; escolher(i); estado(); }
    });
  });

  escolher(0);
  estado();
})();
