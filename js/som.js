// SOM: a caixinha de música do site inteiro. Começa desligada; o botão ♪ do topo liga e desliga.
// Qualquer parte do site toca uma nota com SOM.tocar(grau), em que grau é a posição na escala
// de dó maior (0 = dó central). Se o som estiver desligado, não toca nada.
(function(){
  var HZ = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
  var audio = null, ligado = false, avisos = [];

  function tocar(grau, opcoes){
    if (!ligado) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audio) audio = new AC();
    if (audio.state === 'suspended') audio.resume();
    opcoes = opcoes || {};
    var g0 = Math.max(0, Math.min(HZ.length - 1, grau));
    var agora = audio.currentTime + (opcoes.atraso || 0), dur = opcoes.duracao || 2.2;
    var saida = audio.createGain();
    saida.gain.setValueAtTime(0.0001, agora);
    saida.gain.exponentialRampToValueAtTime(opcoes.volume || 0.2, agora + 0.015);
    saida.gain.exponentialRampToValueAtTime(0.0001, agora + dur);
    saida.connect(audio.destination);
    [[1, 'triangle', 1], [2, 'sine', 0.35], [4.01, 'sine', 0.08]].forEach(function(p){
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = p[1]; o.frequency.value = HZ[g0] * p[0];
      g.gain.value = p[2];
      o.connect(g); g.connect(saida);
      o.start(agora); o.stop(agora + dur + 0.05);
    });
  }

  // uma frase curta: lista de graus, uma nota atrás da outra
  function frase(graus, passo){
    graus.forEach(function(g, i){ tocar(g, { atraso: i * (passo || 0.12), duracao: 1.2, volume: 0.14 }); });
  }

  // chiado de agulha descendo no disco
  function agulha(){
    if (!ligado) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audio) audio = new AC();
    var n = Math.floor(audio.sampleRate * 0.35), buf = audio.createBuffer(1, n, audio.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.02 ? 0.5 : 0.04) * (1 - i / n);
    var fonte = audio.createBufferSource(), g = audio.createGain();
    fonte.buffer = buf; g.gain.value = 0.5;
    fonte.connect(g); g.connect(audio.destination);
    fonte.start();
  }

  function definir(valor){
    ligado = valor;
    avisos.forEach(function(f){ f(ligado); });
  }

  window.SOM = {
    tocar: tocar,
    frase: frase,
    agulha: agulha,
    ligado: function(){ return ligado; },
    alternar: function(){ definir(!ligado); if (ligado) frase([0, 2, 4, 7]); },
    aoMudar: function(f){ avisos.push(f); f(ligado); }
  };

  // botões que ligam e desligam o som (o do topo e o do toca-discos)
  function prender(bt, rotulos){
    if (!bt) return;
    bt.addEventListener('click', SOM.alternar);
    SOM.aoMudar(function(l){
      bt.setAttribute('aria-pressed', l ? 'true' : 'false');
      if (rotulos) bt.textContent = l ? rotulos[1] : rotulos[0];
    });
  }
  prender(document.getElementById('somTopo'));
  prender(document.getElementById('somPartitura'), ['♪ Ligar o som', '♪ Desligar o som']);

  // o menu é a lista de faixas: passar o mouse toca a nota de cada faixa
  [].forEach.call(document.querySelectorAll('.menu a'), function(a, i){
    function nota(){ tocar([0, 2, 4, 5, 7, 9, 11][i % 7], { duracao: 1.1, volume: 0.12 }); }
    a.addEventListener('mouseenter', nota);
    a.addEventListener('focus', nota);
  });

  // botões tocam uma nota curta ao clicar
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.botao, .filtros button, .player-bt');
    if (b && b.id !== 'somTopo' && b.id !== 'somPartitura') tocar(7, { duracao: 0.9, volume: 0.12 });
  });

  // causos: passar por cima de um causo toca um "plim" diferente para cada um
  [].forEach.call(document.querySelectorAll('.causo'), function(c, i){
    c.addEventListener('mouseenter', function(){ frase([4 + (i % 3), 7 + (i % 3)], 0.09); });
  });
})();
