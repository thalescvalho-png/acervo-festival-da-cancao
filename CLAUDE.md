# Acervo do Festival da Canção de Alvinópolis

Leia isto antes de abrir outros arquivos. Só abra o que a tarefa exigir; detalhes no README.md.

## Regras de trabalho
- Responder em português, direto ao ponto, em linguagem simples.
- Economizar tokens: não varrer o repositório; ir direto ao arquivo pelo mapa abaixo.
- Site estático em HTML/CSS/JS puros, sem build. Mesma base do site da dupla, mas separado dele.
- Projeto independente, sem vínculo com a Prefeitura. Textos marcados "texto provisório" precisam ser conferidos antes de virar definitivos; não inventar fatos históricos.
- Fotos: `img/acervo/`, WebP até 1600 px, sem metadados/GPS, nome `ano_evento_musica.webp`.

## Onde fica cada coisa
- `index.html` — página inteira (abertura, sobre, linha do tempo `<article class="edicao">`, fotos, vídeos, documentário `#documentario`, contribua)
- `js/acervo.js` — dados das fotos e vídeos (um bloco por item)
- `js/principal.js` galeria, filtro por década, vídeos · `js/campeoes.js` · `js/causos.js` + `js/toca-causos.js` · `js/toca-discos.js` · `js/cartazes.js` · `js/mural.js` · `js/menu.js` · `js/rolagem.js`
- `css/estilo.css` — paleta em `:root` (claro e escuro)

## Testar e publicar
- Local: `python3 -m http.server 8765` → http://localhost:8765
- GitHub Pages, branch `main`, raiz. Com domínio próprio, tirar `robots noindex` do `index.html`.
