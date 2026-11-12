/* Tekening <-> AIM CORE-pakket wisselt elke 7 seconden vanzelf (zolang hij in beeld is).
   Klik je zelf op een tab, dan stopt het automatisch wisselen. */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var start=function(){
    var cad=document.querySelector('[data-cad]');if(!cad)return;
    var tabs=[].slice.call(cad.querySelectorAll('.tabs .tab'));if(tabs.length<2)return;
    var zicht=false,handmatig=false,boven=false,t=null;
    var zet=function(m){cad.setAttribute('data-mode',String(m));tabs.forEach(function(x){x.setAttribute('aria-pressed',String(x.getAttribute('data-mode')===String(m)))})};
    var tik=function(){if(!zicht||handmatig||boven||document.hidden)return;var m=cad.getAttribute('data-mode')==='1'?0:1;zet(m)};
    tabs.forEach(function(b){b.addEventListener('click',function(e){if(e.isTrusted)handmatig=true})});
    cad.addEventListener('mouseenter',function(){boven=true});cad.addEventListener('mouseleave',function(){boven=false});
    if('IntersectionObserver' in window)new IntersectionObserver(function(es){zicht=es[0].isIntersecting},{threshold:.35}).observe(cad);else zicht=true;
    t=setInterval(tik,7000);
  };
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
