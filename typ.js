/* De uitspraken van het team worden getypt zodra ze in beeld komen (één keer). Ruimte blijft gereserveerd, dus niets verspringt. */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var start=function(){
    var qs=[].slice.call(document.querySelectorAll('.tq__q'));if(!qs.length||!('IntersectionObserver' in window))return;
    qs.forEach(function(q){
      var tekst=[],w=document.createTreeWalker(q,NodeFilter.SHOW_TEXT,null),n;
      while((n=w.nextNode()))if(n.nodeValue.length)tekst.push({n:n,t:n.nodeValue});
      if(!tekst.length)return;
      q.style.minHeight=q.offsetHeight+'px';
      tekst.forEach(function(x){x.n.nodeValue=''});
      var caret=document.createElement('span');caret.className='typ-caret';caret.setAttribute('aria-hidden','true');
      q.setAttribute('aria-label',tekst.map(function(x){return x.t}).join(' '));
      var gedaan=false;
      new IntersectionObserver(function(es,io){if(!es[0].isIntersecting||gedaan)return;gedaan=true;io.disconnect();
        var d=0,i=0;
        (function stap(){
          var x=tekst[d];if(!x){setTimeout(function(){caret.classList.add('is-uit')},1400);return}
          i++;x.n.nodeValue=x.t.slice(0,i);x.n.parentNode.insertBefore(caret,x.n.nextSibling);
          var c=x.t.charAt(i-1),wacht=/[,.;:]/.test(c)?260:(c===' '?55:34+Math.random()*40);
          if(i>=x.t.length){d++;i=0;wacht=320}
          setTimeout(stap,wacht)})();
      },{threshold:.6}).observe(q);
    });
  };
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
