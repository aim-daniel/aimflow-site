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

/* 14-11: kader om de stappen; een licht vlak schuift elke 2,4 s een stap naar rechts (01 > 04, dan weer 01).
   Hover op een stap: het vlak gaat erheen en blijft staan tot de muis het kader verlaat. */
(function(){var kader=function(){
  var st=document.querySelector('ol.steps');if(!st||st.closest('.stappen-kader'))return;
  var k=document.createElement('div');k.className='stappen-kader';st.parentNode.insertBefore(k,st);k.appendChild(st);
  var hl=document.createElement('i');hl.className='stappen-hl';hl.setAttribute('aria-hidden','true');k.insertBefore(hl,st);
  var li=[].slice.call(st.children),nu=0,vast=false,rust=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var zet=function(i){nu=i;var e=li[i];if(!e)return;var kr=k.getBoundingClientRect(),r=e.getBoundingClientRect(),p=14;
    hl.style.transform='translate('+(r.left-kr.left-p)+'px,'+(r.top-kr.top-p-6)+'px)';hl.style.width=(r.width+2*p)+'px';hl.style.height=(r.height+2*p+6)+'px';
    li.forEach(function(x,j){x.classList.toggle('is-actief',j===i)})};
  var loop=function(){if(!vast&&!document.hidden&&k.classList.contains('is-loopt'))zet((nu+1)%li.length)};
  var begin=function(){if(k.classList.contains('is-loopt'))return;k.classList.add('is-loopt');zet(0);if(!rust)setInterval(loop,2400)};
  li.forEach(function(e,i){e.addEventListener('mouseenter',function(){vast=true;zet(i)})});
  k.addEventListener('mouseleave',function(){vast=false});
  addEventListener('resize',function(){zet(nu)});
  var kijk=function(){var r=k.getBoundingClientRect();if(r.top<innerHeight*.8&&r.bottom>0){setTimeout(begin,st.classList.contains('is-wacht')?2300:200);removeEventListener('scroll',kijk)}};
  addEventListener('scroll',kijk,{passive:true});setTimeout(kijk,600);
};if(document.readyState!=='loading')kader();else document.addEventListener('DOMContentLoaded',kader)})();
