(function(){
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, classe, texto){
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }
  function decada(ano){ return ano ? Math.floor(ano / 10) * 10 : null; }
  function selo(){ return el('span', 'provisorio', 'texto provisório'); }

  // 1. Galeria: monta as fotos de js/acervo.js, com filtro por década
  var mosaico = document.getElementById('mosaico');
  var filtros = document.getElementById('filtros');
  var fotos = (window.ACERVO_FOTOS || []).slice().sort(function(a, b){ return (a.ano || 9999) - (b.ano || 9999); });
  var figuras = [];

  fotos.forEach(function(f){
    var fig = el('figure');
    fig.dataset.decada = decada(f.ano) || '';
    var moldura = el('div', 'retrato');
    if (f.foto){
      var bt = el('button');
      bt.type = 'button';
      bt.setAttribute('aria-label', 'Ampliar: ' + f.legenda);
      var img = el('img');
      img.src = f.foto; img.alt = f.descricao || ''; img.loading = 'lazy';
      if (f.w){ img.width = f.w; img.height = f.h; }
      bt.appendChild(img);
      moldura.appendChild(bt);
      fig.classList.add('com-foto');
    } else {
      var vazio = el('div', 'sem-foto');
      vazio.appendChild(el('b', '', f.periodo || f.ano || '?'));
      vazio.appendChild(document.createTextNode('Foto a encontrar. Você tem uma desta época?'));
      moldura.appendChild(vazio);
    }
    fig.appendChild(moldura);
    var leg = el('figcaption');
    if (f.ano){ leg.appendChild(el('b', '', f.periodo || String(f.ano))); leg.appendChild(document.createTextNode(' · ')); }
    leg.appendChild(document.createTextNode(f.legenda + ' '));
    if (f.provisorio) leg.appendChild(selo());
    if (f.credito) leg.appendChild(el('span', 'credito', f.credito));
    fig.appendChild(leg);
    mosaico.appendChild(fig);
    figuras.push(fig);
  });

  var decadas = [];
  fotos.forEach(function(f){ var d = decada(f.ano); if (d && decadas.indexOf(d) < 0) decadas.push(d); });
  function botaoFiltro(rotulo, valor){
    var b = el('button', '', rotulo);
    b.type = 'button';
    b.setAttribute('aria-pressed', valor === '' ? 'true' : 'false');
    b.addEventListener('click', function(){
      [].forEach.call(filtros.children, function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      figuras.forEach(function(fig){ fig.hidden = valor !== '' && fig.dataset.decada !== String(valor); });
    });
    filtros.appendChild(b);
  }
  if (decadas.length > 1){
    botaoFiltro('todas', '');
    decadas.forEach(function(d){ botaoFiltro('anos ' + String(d).slice(2), d); });
  }

  // Acervo fotográfico: um letreiro de cinema para cada edição; escolher um ano mostra a cena dela
  var cenas = [].slice.call(document.querySelectorAll('#cenas .cena'));
  var letreiros = document.getElementById('letreiros');
  if (cenas.length && letreiros){
    document.getElementById('cenas').classList.add('uma-cena');
    var cartelas = cenas.map(function(cena, i){
      var ano = cena.querySelector('.ano'), num = cena.querySelector('.numero');
      var b = el('button', 'letreiro' + (cena.classList.contains('marco-maior') ? ' marco' : ''));
      b.type = 'button';
      b.appendChild(el('b', '', ano ? ano.textContent : '?'));
      b.appendChild(el('span', '', num ? num.textContent : 'festival'));
      b.addEventListener('click', function(){ verCena(i, true); });
      letreiros.appendChild(b);
      return b;
    });
    function verCena(i, comSom){
      cenas.forEach(function(c, n){ c.hidden = n !== i; });
      cartelas.forEach(function(b, n){ b.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
      if (!reduzir){ cenas[i].classList.remove('corte'); void cenas[i].offsetWidth; cenas[i].classList.add('corte'); }
      if (comSom && window.SOM) SOM.tocar([0, 2, 4, 5, 7, 9, 11, 7, 4, 9, 12][i % 11], { duracao: 1.6, volume: 0.14 });
      montarRolo(cenas[i]);
    }

    // o rolo de filme: as fotos do período escolhido, em ordem, com a régua dos anos por cima
    var rolo = document.getElementById('rolo');
    function periodo(cena){
      var t = (cena.querySelector('.ano') || {}).textContent || '';
      var m = t.match(/^(\d{4})$/);
      if (m) return { de: +m[1], ate: +m[1], nome: m[1] };
      m = t.match(/anos (\d)0/);
      if (m){ var d = 1900 + (+m[1]) * 10; if (d < 1970) d += 100; return { de: d, ate: d + 9, nome: t }; }
      return null;
    }
    function montarRolo(cena){
      if (!rolo) return;
      rolo.textContent = '';
      var p = periodo(cena);
      if (!p) return;
      var lista = fotos.filter(function(f){ return f.ano >= p.de && f.ano <= p.ate; });
      var topo = el('div', 'rolo-topo');
      topo.appendChild(el('p', 'rotulo', 'linha do tempo das fotos · ' + p.nome));
      var regua = el('div', 'regua');
      var quadros = [];
      for (var a = p.de; a <= p.ate; a++) (function(a){
        var tem = lista.some(function(f){ return f.ano === a; });
        var b = el('button', 'regua-ano' + (tem ? ' tem' : ''), p.de === p.ate ? String(a) : "'" + String(a).slice(2));
        b.type = 'button';
        b.disabled = !tem;
        b.setAttribute('aria-label', tem ? 'Fotos de ' + a : a + ': sem fotos ainda');
        b.addEventListener('click', function(){
          var q = quadros.filter(function(x){ return x.ano === a; });
          quadros.forEach(function(x){ x.el.classList.toggle('aceso', x.ano === a); });
          [].forEach.call(regua.children, function(r){ r.setAttribute('aria-pressed', r === b ? 'true' : 'false'); });
          if (q[0]) faixa.scrollTo({ left: q[0].el.offsetLeft - 20, behavior: reduzir ? 'auto' : 'smooth' });
          if (window.SOM) SOM.tocar((a - p.de) % 12, { duracao: 1.2, volume: 0.12 });
        });
        regua.appendChild(b);
      })(a);
      topo.appendChild(regua);
      rolo.appendChild(topo);

      var faixa = el('div', 'filme');
      if (!lista.length){
        var vazio = el('div', 'quadro vazio-rolo');
        vazio.appendChild(el('b', '', p.nome));
        vazio.appendChild(document.createTextNode('Ainda não há fotos deste período no acervo. '));
        var a2 = el('a', '', 'Você tem alguma?'); a2.href = '#contribua';
        vazio.appendChild(a2);
        faixa.appendChild(vazio);
      }
      lista.forEach(function(f, n){
        var q = el('figure', 'quadro');
        q.style.setProperty('--n', n);
        if (f.foto){
          var bt = el('button');
          bt.type = 'button';
          bt.setAttribute('aria-label', 'Ampliar: ' + f.legenda);
          var img = el('img'); img.src = f.foto; img.alt = f.descricao || ''; img.loading = 'lazy';
          bt.appendChild(img);
          bt.addEventListener('click', function(){
            var alvo = figuras.filter(function(g){ var i2 = g.querySelector('img'); return i2 && i2.getAttribute('src') === f.foto; })[0];
            if (alvo){ alvo.hidden = false; alvo.querySelector('button').click(); }
          });
          q.appendChild(bt);
        } else {
          var sem = el('div', 'sem-foto');
          sem.appendChild(el('b', '', f.periodo || String(f.ano)));
          sem.appendChild(document.createTextNode('Foto a encontrar'));
          q.appendChild(sem);
        }
        var leg = el('figcaption');
        leg.appendChild(el('b', '', f.periodo || String(f.ano)));
        leg.appendChild(document.createTextNode(' ' + f.legenda));
        q.appendChild(leg);
        faixa.appendChild(q);
        quadros.push({ ano: f.ano, el: q });
      });
      rolo.appendChild(faixa);
      if (!reduzir){ rolo.classList.remove('puxando'); void rolo.offsetWidth; rolo.classList.add('puxando'); }
    }
    verCena(0, false);
  }

  // 2. Telas do YouTube: o vídeo só carrega quando a pessoa clica
  function montarTela(tela, codigo, titulo, aviso){
    tela.textContent = '';
    if (!codigo){
      var a = el('div', 'aguardando');
      a.appendChild(el('b', '', aviso || 'Em digitalização'));
      if (titulo) a.appendChild(document.createTextNode(titulo));
      tela.appendChild(a);
      return;
    }
    var play = el('button', 'play');
    play.type = 'button';
    play.setAttribute('aria-label', 'Assistir: ' + titulo);
    play.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + encodeURIComponent(codigo) + '/hqdefault.jpg)';
    play.appendChild(el('span', '', '▶'));
    play.addEventListener('click', function(){
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(codigo) + '?autoplay=1&rel=0';
      f.title = titulo;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      tela.replaceChild(f, play);
    });
    tela.appendChild(play);
  }

  var listaVideos = document.getElementById('videos');
  (window.ACERVO_VIDEOS || []).forEach(function(v){
    var fig = el('figure');
    var tela = el('div', 'tela');
    montarTela(tela, v.youtube, v.titulo, 'Em digitalização');
    fig.appendChild(tela);
    var leg = el('figcaption');
    if (v.ano){ leg.appendChild(el('b', '', String(v.ano))); leg.appendChild(document.createTextNode(' · ')); }
    leg.appendChild(document.createTextNode(v.titulo + '. ' + v.legenda + ' '));
    if (v.provisorio) leg.appendChild(selo());
    fig.appendChild(leg);
    listaVideos.appendChild(fig);
  });

  var doc = document.getElementById('telaDocumentario');
  if (doc) montarTela(doc, doc.dataset.youtube, doc.dataset.titulo, doc.dataset.aviso);

  // LP do Verde Terra: tocar no disco vira a capa
  var lp = document.getElementById('lpVirar');
  if (lp) lp.addEventListener('click', function(){
    var virado = lp.getAttribute('aria-pressed') !== 'true';
    lp.setAttribute('aria-pressed', virado ? 'true' : 'false');
    lp.setAttribute('aria-label', virado ? 'Virar o disco e ver a capa' : 'Virar o disco e ver a contracapa');
  });

  // 3. Foto ampliada: clicar abre, com setas, Esc e as setas do teclado (só entre as fotos visíveis)
  var janela = document.getElementById('ampliada');
  if (janela && janela.showModal){
    var grande = janela.querySelector('img');
    var legenda = janela.querySelector('p');
    var atual = 0, visiveis = [];
    function mostrar(i){
      atual = (i + visiveis.length) % visiveis.length;
      var img = visiveis[atual].querySelector('img');
      grande.src = img.currentSrc || img.src;
      grande.alt = img.alt;
      legenda.textContent = visiveis[atual].querySelector('figcaption').textContent;
    }
    figuras.forEach(function(fig){
      var bt = fig.querySelector('button');
      if (!bt) return;
      bt.addEventListener('click', function(){
        visiveis = figuras.filter(function(f){ return !f.hidden && f.classList.contains('com-foto'); });
        mostrar(visiveis.indexOf(fig));
        janela.showModal();
      });
    });
    janela.querySelector('.fechar').addEventListener('click', function(){ janela.close(); });
    janela.querySelector('.anterior').addEventListener('click', function(){ mostrar(atual - 1); });
    janela.querySelector('.proxima').addEventListener('click', function(){ mostrar(atual + 1); });
    janela.addEventListener('click', function(e){ if (e.target === janela) janela.close(); });
    janela.addEventListener('keydown', function(e){
      if (e.key === 'ArrowLeft') mostrar(atual - 1);
      if (e.key === 'ArrowRight') mostrar(atual + 1);
    });
    janela.addEventListener('close', function(){ var b = visiveis[atual] && visiveis[atual].querySelector('button'); if (b) b.focus(); });
  }

  // 4. Movimento ao rolar: as edições e as fotos sobem e se acomodam no álbum
  if (reduzir || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('mov');
  function grupo(seletor, ciclo){
    [].forEach.call(document.querySelectorAll(seletor), function(e, i){
      e.classList.add('revela');
      e.style.setProperty('--i', ciclo ? i % ciclo : 0);
    });
  }
  grupo('.mosaico figure', 3);
  grupo('.videos figure', 3);
  grupo('.sobre-in > div', 3);
  var olho = new IntersectionObserver(function(entradas){
    entradas.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.classList.add('visto');
      olho.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  [].forEach.call(document.querySelectorAll('.revela'), function(e){ olho.observe(e); });
})();
