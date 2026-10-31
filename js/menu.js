// Menu das faixas em telas menores: o botão "faixas" abre a lista do disco por baixo do topo.
// Fecha ao escolher uma faixa, ao tocar fora, com Esc ou quando a tela volta a ser larga.
(function(){
  var bt = document.getElementById('faixasBt');
  var menu = document.getElementById('menu');
  if (!bt || !menu) return;
  var largo = window.matchMedia('(min-width:1301px)');

  function abrir(sim){
    menu.classList.toggle('aberto', sim);
    bt.setAttribute('aria-expanded', sim ? 'true' : 'false');
  }
  bt.addEventListener('click', function(){ abrir(bt.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function(e){ if (e.target.closest('a')) abrir(false); });
  document.addEventListener('click', function(e){
    if (!menu.classList.contains('aberto') || e.target.closest('#menu, #faixasBt')) return;
    abrir(false);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && menu.classList.contains('aberto')){ abrir(false); bt.focus(); }
  });
  (largo.addEventListener ? largo.addEventListener.bind(largo, 'change') : largo.addListener.bind(largo))(function(){ abrir(false); });
})();
