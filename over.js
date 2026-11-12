/* Over ons: stappen en cijfers bewegen één keer in zodra ze in beeld komen; daarna loopt er rustig een lichtje over de stappenlijn. */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var start=function(){
    if(!('IntersectionObserver' in window))return;
    var st=document.querySelector('ol.steps'),fa=document.querySelector('.facts');
    if(st){var br=function(){st.style.setProperty('--stappen-b',st.offsetWidth+'px')};br();addEventListener('resize',br);st.classList.add('is-wacht');new IntersectionObserver(function(es,io){if(es[0].isIntersecting){st.classList.add('is-in');io.disconnect()}},{threshold:.4}).observe(st)}
    if(fa){var bs=[].slice.call(fa.querySelectorAll('b'));fa.classList.add('is-wacht');
      new IntersectionObserver(function(es,io){if(!es[0].isIntersecting)return;io.disconnect();fa.classList.add('is-in');
        bs.forEach(function(b,i){var t=b.textContent.trim(),n=parseInt(t,10);
          if(!isNaN(n)&&String(n)===t){var k=0;b.textContent='0';var stap=function(){k++;b.textContent=String(Math.min(k,n));if(k<n)setTimeout(stap,260)};setTimeout(stap,300+i*150)}
          else{b.textContent='';var j=0;var typ=function(){j++;b.textContent=t.slice(0,j);if(j<t.length)setTimeout(typ,110)};setTimeout(typ,500+i*150)}})},{threshold:.5}).observe(fa)}
  };
  /* vangnet: ook zonder IntersectionObserver-melding (verborgen tab, oude browser) komt alles in beeld */
  var check=function(){[].forEach.call(document.querySelectorAll('ol.steps.is-wacht:not(.is-in),.facts.is-wacht:not(.is-in)'),function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight*.85&&r.bottom>0){el.classList.add('is-in');if(el.classList.contains('facts')&&!el.dataset.geteld){el.dataset.geteld=1}}})};
  addEventListener('scroll',check,{passive:true});setTimeout(check,1500);
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
