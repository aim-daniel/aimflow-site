/* Eén accentkleur voor de hele site: salie (home, AIM CORE, AIM FLOW, alle talen). Testen met ?kleur=... kan nog.
   */
(function(){
  window.AIMkleur=function(){var h=document.documentElement;if(!h.hasAttribute('data-kleur'))return null;return getComputedStyle(h).getPropertyValue('--kr').trim()||null};
  var q=/[?&]kleur=(\w+)/.exec(location.search);
  document.documentElement.setAttribute('data-kleur',q?q[1]:'salie');
  var lg=/[?&]logos=(\w+)/.exec(location.search);if(lg)document.documentElement.setAttribute('data-logos',lg[1]);
  /* variant 'midden': het logo dat door het midden van de band schuift kleurt salie */
  var midden=function(){var m=document.querySelector('.marq');if(!m)return;var lis=[].slice.call(m.querySelectorAll('.soft__list li'));
    (function loop(){if(document.documentElement.getAttribute('data-logos')==='midden'){var r=m.getBoundingClientRect(),c=r.left+r.width/2,w=r.width*.11;
      lis.forEach(function(li){var q=li.getBoundingClientRect(),x=q.left+q.width/2;li.classList.toggle('is-mid',Math.abs(x-c)<w)})}
      requestAnimationFrame(loop)})()};
  if(document.readyState!=='loading')midden();else document.addEventListener('DOMContentLoaded',midden);
})();
