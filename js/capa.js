// CAPA VIVA: notas sobem pelas laterais, o equalizador do pé pulsa e os discos giram (CSS).
// Tocar ou clicar na capa solta notas no lugar do toque; com o som ligado, cada toque toca uma nota.
// Quem pede menos movimento no sistema vê a capa parada.
(function(){
  var capa = document.getElementById('inicio');
  var notas = document.getElementById('capaNotas');
  var eq = document.getElementById('capaEq');
  if (!capa || !notas || !eq) return;
  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SIMBOLOS = ['♪', '♫', '♩', '♬'];

  // equalizador: barras com alturas e ritmos diferentes
  var barras = Math.max(24, Math.min(90, Math.round(window.innerWidth / 18)));
  for (var i = 0; i < barras; i++){
    var b = document.createElement('i');
    b.style.setProperty('--a', (0.35 + Math.random() * 0.65).toFixed(2));
    b.style.animationDuration = (0.45 + Math.random() * 0.9).toFixed(2) + 's';
    b.style.animationDelay = (-Math.random()).toFixed(2) + 's';
    eq.appendChild(b);
  }
  // contador da linha de datas: o ano volta de 2026 a 1976, edições e anos sobem até 40 e 50
  var datas = document.getElementById('capaDatas');
  function contar(comSom){
    if (!datas) return;
    var cs = datas.querySelectorAll('.conta'), t0 = null, dur = 1800, ultimo = -1;
    datas.classList.add('contando');
    function passo(t){
      if (t0 === null) t0 = t;
      var x = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - x, 3);
      cs.forEach(function(c){
        var de = +c.dataset.de, ate = +c.dataset.ate;
        c.textContent = Math.round(de + (ate - de) * e);
      });
      var nota = Math.floor(e * 8);
      if (comSom && window.SOM && nota !== ultimo){ ultimo = nota; window.SOM.tocar(nota, { duracao: .5, volume: .12 }); }
      if (x < 1) requestAnimationFrame(passo); else datas.classList.remove('contando');
    }
    requestAnimationFrame(passo);
  }
  if (datas){
    datas.addEventListener('click', function(){ contar(true); });
    if (!parado) setTimeout(function(){ contar(false); }, 500);
  }

  if (parado) return;

  // notas subindo, mais nas laterais do que no meio (o título fica limpo)
  function soltarNota(){
    if (document.hidden) return;
    var n = document.createElement('span');
    n.className = 'capa-nota';
    n.textContent = SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)];
    var lado = Math.random() < 0.5 ? Math.random() * 24 : 76 + Math.random() * 24;
    n.style.left = lado + '%';
    n.style.fontSize = (16 + Math.random() * 26).toFixed(0) + 'px';
    n.style.setProperty('--dx', ((Math.random() - 0.5) * 80).toFixed(0) + 'px');
    n.style.setProperty('--o', (0.25 + Math.random() * 0.4).toFixed(2));
    n.style.animationDuration = (7 + Math.random() * 6).toFixed(1) + 's';
    n.addEventListener('animationend', function(){ n.remove(); });
    notas.appendChild(n);
  }
  for (var k = 0; k < 6; k++) setTimeout(soltarNota, k * 500);
  setInterval(soltarNota, 900);

  // toque na capa: um punhado de notas no lugar e, se o som estiver ligado, uma nota da escala
  var grau = 0;
  capa.addEventListener('pointerdown', function(e){
    if (e.target.closest('a, button')) return;
    var r = capa.getBoundingClientRect();
    for (var j = 0; j < 4; j++){
      var f = document.createElement('span');
      f.className = 'capa-faisca';
      f.textContent = SIMBOLOS[j % SIMBOLOS.length];
      f.style.left = (e.clientX - r.left - 10) + 'px';
      f.style.top = (e.clientY - r.top - 20) + 'px';
      f.style.setProperty('--dx', ((j - 1.5) * 34) + 'px');
      f.style.setProperty('--r', ((j - 1.5) * 20) + 'deg');
      f.addEventListener('animationend', function(){ this.remove(); });
      capa.appendChild(f);
    }
    if (window.SOM){ window.SOM.tocar([0, 2, 4, 7, 9, 7, 4, 2][grau % 8]); grau++; }
    capa.classList.add('tocando');
    clearTimeout(capa._t); capa._t = setTimeout(function(){ capa.classList.remove('tocando'); }, 1200);
  });
})();
