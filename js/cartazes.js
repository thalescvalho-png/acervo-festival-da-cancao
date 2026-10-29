// MURAL DE CARTAZES: marcas e cartazes do festival, guardados no blog de Marcos Martino.
// Para pendurar um cartaz: salve a imagem em img/cartazes/ (WebP, até 1600 px) e escreva o
// caminho em "imagem". Sem imagem, o mural mostra uma moldura vazia com o link do original.
var ACERVO_CARTAZES = [
  {
    "id": "cartaz-2009",
    "titulo": "Marca do Festival 2009",
    "ano": "2009",
    "autor": "Arte de Alessandro Magno",
    "imagem": "img/cartazes/cartaz-2009.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgicsIJxFImJcd_3e6yqHypsn9wbRr5d21gCHmlr27JDr9lqYM8cjv336rvFsux94lt6capj4seFo10Aq1YeVLa9E88mZrkweLPd8D_Lxo4Xf6RN_VIfaCrkKFJdoD-Rlpvcjfa7B1nCjI/s1600-h/MARCA_FESTIALVI.jpg",
    "w": 250,
    "h": 164
  },
  {
    "id": "cartaz-2010-30anos",
    "titulo": "Logo dos 30 anos",
    "ano": "2010",
    "autor": "Angelo Hosken (Krawy)",
    "imagem": "img/cartazes/cartaz-2010-30anos.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvhYlrY6wcOiBhAcHtEcxsJf2e3Hwc8g6T9v15fM3n83Y770-ymsZuKll-_MS29nNvTxcFuVDgvoQvXC91dOIGWOT3ENNus1IpI7NfC6-WgFOeuYFHktKugkWOiA7_hLRkLqirQYhl-x0/s1600-h/Logo+Festival+30+anos+-+logo+final.jpg",
    "w": 592,
    "h": 574
  },
  {
    "id": "cartaz-2011-pre",
    "titulo": "Cartaz do Pré-Festival",
    "ano": "2011",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2011-pre.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhB3NYL6kdQeATWGatQ5mc57PWeqQp8_glVBZuqntQr8V6nReJ-xtVPhRbZVvBviehCI552fJgrim3vyp8E1fHvYQvEIo38lypCvdIWYHf4bZSb_6cJLeLdIw9V300ukLe-EjbQjrrON2g/s1600/prefestival2011.jpg",
    "w": 225,
    "h": 144
  },
  {
    "id": "cartaz-2011-31",
    "titulo": "Logo do 31º Festival",
    "ano": "2011",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2011-31.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkkkQncUD5me9gOBPR0VJN0f4QlptP3KijiPhY_eb39ZdpFL_f-N9tKNNRjLv-lUdTDXWCkD4lRwXUx4jEVm_hzli0ArXJ_ZVBM8XVjAm284SFmGnLHnG7Y1nA5lGJ82fHwMTFjTyHTWc/s1600/LOGO+31%25C2%25BA+FESTIVAL+DE+M%25C3%259ASICA+DE+ALVIN%25C3%2593POLIS.png",
    "w": 250,
    "h": 193
  },
  {
    "id": "cartaz-2011-logo",
    "titulo": "Logo do Festival 2011",
    "ano": "2011",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2011-logo.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg589fqDejQtjKfOJBYTWWYtoCsNZorcWJAWlnt0duS_t3ivDjOtltyGBT_mIaj2ThQm_0tEW8seAr23A6SXnDm-vL4Asj1c4KKP9eKGboOSOgTdKePNdQNiJfaa1yRezwDztYNq3B2SOc/s1600/LOGO+FESTIVAL+2011+ALVIN%25C3%2593POLIS.jpg",
    "w": 1600,
    "h": 862
  },
  {
    "id": "cartaz-2012",
    "titulo": "Arte do Festival 2012",
    "ano": "2012",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2012.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEglucaIxuRwVyj0zuS-AZINcUp6CLPckBxazb5PCk9dwEDtrZTP5VFGPiPiZ0qgfL5aOSF8Eij5WuMhZ0JWql2zCcRHSmymTql4ZEZU5CZCz23MUPAVjz99txk4P887aFuOo1lOTz7f1vI/s1600/FESTIVAL+2012+-+ALVIN%25C3%2593POLIS.png",
    "w": 250,
    "h": 194
  },
  {
    "id": "cartaz-2014",
    "titulo": "Logo 2014 em amarelo",
    "ano": "2014",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2014.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQTHm7PgH4zsymjrpYRUUDX-wGSx72Kdkn8ya8SX5nyrLtFTtZDidn-lChHiYsJnAMyANYD_E7_CvEI8CfjuqOOsKtYoT64XsT_GGxfkViYFzUTck-AZwyKhjdESr4f2XeOZFt-UmE1vk/s1600/LOGO+FESTIVAL+2014+em+AMARELO.jpg",
    "w": 415,
    "h": 198
  },
  {
    "id": "cartaz-2015",
    "titulo": "Cartaz 2015",
    "ano": "2015",
    "autor": "",
    "imagem": "img/cartazes/cartaz-2015.webp",
    "original": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMXQM7sJYij8A3p3Qza-trbaT4T7VNu538qZ-t0A5ST05hRWti1BrBPPh-4KX5BaMdIoPdnT-5ZoILXil6w22qbe_NQgvjum5UnTkKtmWsGyW610xEPbbIz3Dtjj3BQjcTNEnbldZEd64/s1600/festival+alvin%25C3%25B3polis+2015.jpg",
    "w": 306,
    "h": 164
  }
];
