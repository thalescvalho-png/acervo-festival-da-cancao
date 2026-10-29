// Mural de cartazes: monta os cartazes de js/cartazes.js, cada um pregado com fita crepe.
// Tocar num cartaz abre a imagem grande; sem imagem ainda, fica a moldura vazia com o link do original.
(function(){
  var mural = document.getElementById('mural');
  var cartazes = window.ACERVO_CARTAZES || [];
  if (!mural) return;

  function el(tag, classe, texto){
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  var lupa = null, voltar = null;
  function fechar(){
    if (!lupa) return;
    lupa.remove(); lupa = null;
    if (voltar) voltar.focus();
  }
  function abrir(c, botao){
    fechar();
    voltar = botao;
    lupa = el('div', 'lupa');
    lupa.setAttribute('role', 'dialog');
    lupa.setAttribute('aria-label', c.titulo);
    lupa.tabIndex = -1;
    var img = el('img');
    img.src = c.imagem; img.alt = c.titulo + (c.ano ? ' (' + c.ano + ')' : '');
    lupa.appendChild(img);
    lupa.appendChild(el('p', '', c.titulo + (c.ano ? ' · ' + c.ano : '') + ' · toque para fechar'));
    lupa.addEventListener('click', fechar);
    document.body.appendChild(lupa);
    lupa.focus();
    if (window.SOM) SOM.frase([4, 7, 9], 0.1);
  }
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') fechar(); });

  cartazes.forEach(function(c){
    var fig = el('figure', 'cartaz');
    if (c.imagem){
      var bt = el('button', 'cartaz-img');
      bt.type = 'button';
      bt.setAttribute('aria-label', 'Ver de perto: ' + c.titulo);
      var img = el('img');
      img.src = c.imagem; img.alt = c.titulo + (c.ano ? ' (' + c.ano + ')' : ''); img.loading = 'lazy';
      bt.appendChild(img);
      bt.addEventListener('click', function(){ abrir(c, bt); });
      fig.appendChild(bt);
    } else {
      var vazio = el('div', 'cartaz-vazio');
      vazio.appendChild(el('span', 'cartaz-nota', '♫'));
      vazio.appendChild(el('span', '', 'cartaz a pendurar'));
      if (c.original){
        var a = el('a', '', 'ver o original ↗');
        a.href = c.original; a.target = '_blank'; a.rel = 'noopener';
        vazio.appendChild(a);
      }
      fig.appendChild(vazio);
    }
    var leg = el('figcaption');
    leg.appendChild(el('b', '', c.titulo));
    var extra = [c.ano, c.autor].filter(Boolean).join(' · ');
    if (extra) leg.appendChild(document.createTextNode(extra));
    fig.appendChild(leg);
    mural.appendChild(fig);
  });
})();
