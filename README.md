# Acervo do Festival da Canção de Alvinópolis

Site-acervo do Festival da Canção de Alvinópolis (MG), desde 1976: a história do festival edição por
edição, fotos com legendas, vídeos de arquivo e o documentário *Festival da Canção de Alvinópolis –
Histórias* (PNAB 2026). Projeto independente e sem fins lucrativos, sem vínculo com a Prefeitura.

Site estático em HTML, CSS e JS puros, sem etapa de build (a mesma base do site da dupla, separada dele).

```
index.html        a página inteira: abertura, sobre, linha do tempo, fotos, vídeos, documentário, contribua
css/estilo.css    estilos (a paleta fica nas variáveis de :root, com versão clara e escura)
js/acervo.js      AS FOTOS E OS VÍDEOS DO ACERVO: é só acrescentar um bloco por item
js/principal.js   monta a galeria e os vídeos, filtro por década, foto ampliada, telas do YouTube
js/rolagem.js     rolagem suave dos links do menu (igual à do site da dupla)
img/acervo/       fotos em WebP, até 1600 px no lado maior, sem metadados/GPS
```

## Como acrescentar

- **Foto na galeria:** salve em `img/acervo/` com o nome `ano_evento_musica.webp` e copie um bloco em
  `js/acervo.js` (ano, foto, descrição, legenda, crédito). Sem `foto`, aparece uma moldura vazia.
- **Marco na linha do tempo:** copie um `<article class="edicao">` em `index.html`.
- **Vídeo de arquivo:** em `js/acervo.js`, cole em `youtube` só o código do vídeo (o que vem depois de
  `watch?v=`). O vídeo só carrega quando a pessoa clica.
- **Documentário:** o mesmo código vai em `data-youtube` na seção `#documentario` do `index.html`.
- Textos marcados como **texto provisório** ainda precisam ser escritos ou conferidos.

## Testar no computador

Nesta pasta: `python3 -m http.server 8765` e abra `http://localhost:8765`.

## Publicar

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / raiz. Quando houver domínio próprio,
coloque-o em Settings → Pages → Custom domain e tire a linha `robots noindex` do `index.html`.
