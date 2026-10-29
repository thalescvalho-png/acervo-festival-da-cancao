// Partitura dos campeões: cada festival é uma nota num pentagrama que vai de 1976 até hoje.
// Tocar uma nota mostra a canção vencedora no disco; os anos sem festival são pausas.
(function(){
  var dados = window.ACERVO_CAMPEOES || [];
  var pauta = document.getElementById('pauta');
  if (!pauta || !dados.length) return;
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Melodia: graus da escala de dó maior (0 = dó central). Repete-se ao longo das edições.
  var MELODIA = [2, 4, 5, 4, 7, 5, 4, 2, 1, 2, 4, 5, 7, 8, 7, 5, 4, 5, 7, 9, 8, 7, 5, 4];
  var HZ = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99];
  var PASSO = 7;          // meia distância entre linhas da pauta, em px
  var BASE = 88;          // altura (y) do dó central
  var LARGURA = 46;       // espaço de cada ano na pauta

  // edição e nota de cada ano
  var edicao = 0, n = 0;
  dados.forEach(function(d){
    if (d.tipo === 'festival'){ edicao++; d.edicao = edicao; }
    if (d.tipo !== 'pausa'){ d.grau = MELODIA[n % MELODIA.length]; n++; }
  });

  var trilho = document.createElement('div');
  trilho.className = 'pauta-trilho';
  trilho.style.width = (dados.length * LARGURA + 40) + 'px';
  pauta.appendChild(trilho);

  var botoes = dados.map(function(d, i){
    var x = 20 + i * LARGURA;
    if (d.ano % 10 === 0){
      var barra = document.createElement('span');
      barra.className = 'compasso';
      barra.style.left = (x - 4) + 'px';
      trilho.appendChild(barra);
    }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'nota ' + d.tipo + (d.tipo !== 'pausa' && !d.musica && !d.semVencedor ? ' incerta' : '');
    b.style.left = x + 'px';
    var rotulo = d.ano + ': ';
    if (d.tipo === 'pausa') rotulo += 'sem festival';
    else rotulo += (d.musica ? '“' + d.musica + '”, ' + d.autor : (d.autor || 'vencedor a confirmar'));
    b.setAttribute('aria-label', rotulo);
    if (d.tipo !== 'pausa'){
      var y = BASE - d.grau * PASSO;
      var cabeca = document.createElement('span');
      cabeca.className = 'cabeca-nota' + (d.grau >= 6 ? ' haste-baixo' : '');
      cabeca.style.top = (y - 6) + 'px';
      if (d.grau === 0) cabeca.classList.add('suplementar');
      b.appendChild(cabeca);
    } else {
      var pausa = document.createElement('span');
      pausa.className = 'pausa-sinal';
      b.appendChild(pausa);
    }
    var ano = document.createElement('span');
    ano.className = 'nota-ano';
    ano.textContent = "'" + String(d.ano).slice(2);
    b.appendChild(ano);
    b.addEventListener('click', function(){ parar(); escolher(i, true); });
    trilho.appendChild(b);
    return b;
  });

  // som: caixinha de música feita no próprio navegador
  var audio = null, somLigado = true;
  function tocar(grau, curta){
    if (!somLigado) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audio) audio = new AC();
    if (audio.state === 'suspended') audio.resume();
    var agora = audio.currentTime, dur = curta ? 0.9 : 1.6;
    var saida = audio.createGain();
    saida.gain.setValueAtTime(0.0001, agora);
    saida.gain.exponentialRampToValueAtTime(0.22, agora + 0.012);
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

  // o disco
  var disco = document.getElementById('disco');
  var campos = {
    ano: document.getElementById('discoAno'),
    rotuloAno: document.getElementById('discoRotuloAno'),
    edicao: document.getElementById('discoEdicao'),
    musica: document.getElementById('discoMusica'),
    autor: document.getElementById('discoAutor'),
    cidade: document.getElementById('discoCidade'),
    obs: document.getElementById('discoObs')
  };
  var atual = 0;
  function escolher(i, comSom){
    atual = i;
    var d = dados[i];
    botoes.forEach(function(b, j){ b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    campos.ano.textContent = d.ano;
    campos.rotuloAno.textContent = d.ano;
    campos.edicao.textContent = d.tipo === 'festival' ? d.edicao + 'º festival'
      : d.tipo === 'fase-local' ? 'fase local' : 'pausa';
    if (d.tipo === 'pausa'){
      campos.musica.textContent = 'Sem festival';
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
    // o disco troca: sai e volta girando
    if (!reduzir){
      disco.classList.remove('troca'); void disco.offsetWidth; disco.classList.add('troca');
    }
    // mantém a nota visível dentro da pauta, sem mexer na página
    var b = botoes[i], meio = b.offsetLeft - pauta.clientWidth / 2;
    pauta.scrollTo({ left: Math.max(0, meio), behavior: reduzir ? 'auto' : 'smooth' });
    if (comSom && d.tipo !== 'pausa') tocar(d.grau);
  }

  // tocar a partitura inteira
  var btTocar = document.getElementById('tocarPartitura');
  var btSom = document.getElementById('somPartitura');
  var relogio = null;
  function parar(){
    if (!relogio) return;
    clearTimeout(relogio); relogio = null;
    btTocar.textContent = '▶ Tocar a partitura';
    btTocar.setAttribute('aria-pressed', 'false');
    disco.classList.remove('girando');
  }
  function seguir(i){
    if (i >= dados.length){ parar(); return; }
    escolher(i, false);
    var d = dados[i];
    if (d.tipo !== 'pausa') tocar(d.grau, true);
    relogio = setTimeout(function(){ seguir(i + 1); }, d.tipo === 'pausa' ? 380 : 520);
  }
  btTocar.addEventListener('click', function(){
    if (relogio){ parar(); return; }
    btTocar.textContent = '■ Parar';
    btTocar.setAttribute('aria-pressed', 'true');
    if (!reduzir) disco.classList.add('girando');
    seguir(atual >= dados.length - 1 ? 0 : atual);
  });
  btSom.addEventListener('click', function(){
    somLigado = !somLigado;
    btSom.setAttribute('aria-pressed', somLigado ? 'true' : 'false');
    btSom.textContent = somLigado ? '♪ Som ligado' : '♪ Som desligado';
  });

  // setas do teclado andam pela pauta
  pauta.addEventListener('keydown', function(e){
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault(); parar();
    var j = Math.max(0, Math.min(dados.length - 1, atual + (e.key === 'ArrowRight' ? 1 : -1)));
    escolher(j, true); botoes[j].focus();
  });

  escolher(0, false);
})();
