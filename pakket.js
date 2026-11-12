/* Klik op een pakket = gekozen (blijft omhoog); nog een klik elders kiest een ander. */
(function(){var st=function(){var ps=[].slice.call(document.querySelectorAll('.plan'));ps.forEach(function(p){p.addEventListener('click',function(e){ps.forEach(function(x){x.classList.toggle('is-gekozen',x===p)})})})};
if(document.readyState!=='loading')st();else document.addEventListener('DOMContentLoaded',st)})();
