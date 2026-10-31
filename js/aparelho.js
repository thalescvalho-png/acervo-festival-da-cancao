// Identifica TVs (Smart TV, Android TV, Fire TV, Chromecast, Apple TV etc.) e marca <html class="tv">.
// O resto da adaptação (celular, tablet, computador, telas grandes) é feito pelo tamanho da tela, no CSS.
(function(){
  var ua = navigator.userAgent || '';
  if (/Smart-?TV|SMART-TV|Tizen|Web0S|webOS|NetCast|HbbTV|BRAVIA|Android TV|GoogleTV|AFT[A-Z]|CrKey|AppleTV|Roku|VIDAA|Opera TV|PhilipsTV|Viera|TV Safari/i.test(ua)) {
    document.documentElement.classList.add('tv');
  }
})();
