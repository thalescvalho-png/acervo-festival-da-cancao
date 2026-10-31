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
