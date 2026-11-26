/* Integraties op de AIM CORE-pagina: twee voorbeelden van een koppelanimatie. standaard 'stroom' (Daniels keuze 12-11); ?integ=hub of ?integ=kolommen om te vergelijken. */
(function(){
  var q=/[?&]integ=(\w+)/.exec(location.search);var soort=q?q[1]:'stroom';if(soort==='kolommen')return;
  var lang=(document.documentElement.lang||'nl').slice(0,2);
  var L={nl:{gek:'gekoppeld',in:'Jouw model',uit:'Wat je krijgt',o:['3D-configurator','Stuklijst','Presentatie','Machine-app'],plug:'Eigen plug-in'},
    en:{gek:'connected',in:'Your model',uit:'What you get',o:['3D configurator','Bill of materials','Presentation','Machine app'],plug:'Own plug-in'},
    de:{gek:'verbunden',in:'Ihr Modell',uit:'Was Sie bekommen',o:['3D-Konfigurator','Stückliste','Präsentation','Maschinen-App'],plug:'Eigenes Plug-in'}}[lang]||null;
  var SW=[['autocad','AutoCAD'],['revit','Revit'],['autodesk','Inventor'],['autodesk','Navisworks'],['rhino','Rhino'],['dassault','SolidWorks'],['archicad','Archicad'],[null,'IFC']];
  var ic=function(lg,n){return lg?'<svg aria-hidden="true"><use href="#lg-'+lg+'"/></svg>':'<b>'+n+'</b>'};
  var AIM='<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#aim-merk-ijs"/></svg>';
  var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start=function(){
    var r=document.querySelector('.integ__r');if(!r||!L)return;r.innerHTML='';r.className='integ__r integ__r--'+soort;r.removeAttribute('aria-hidden');
    if(soort==='hub'){
      var n=SW.length,R=40;
      var h='<svg class="hub-lijnen" viewBox="0 0 100 100" preserveAspectRatio="none">';
      var pos=SW.map(function(_,i){var a=-Math.PI/2+i*2*Math.PI/n;return [50+R*Math.cos(a),50+R*Math.sin(a)*0.92]});
      pos.forEach(function(p,i){h+='<line class="hub-l" data-i="'+i+'" x1="'+p[0]+'" y1="'+p[1]+'" x2="50" y2="50"/>'});
      h+='</svg><div class="hub-mid"><span class="hub-tegel">'+AIM+'</span><small class="hub-tekst">AIM CORE</small></div>';
      pos.forEach(function(p,i){h+='<div class="hub-n" data-i="'+i+'" style="left:'+p[0]+'%;top:'+p[1]+'%"><span class="ig-ic">'+ic(SW[i][0],SW[i][1])+'</span><small>'+SW[i][1]+'</small></div>'});
      r.innerHTML=h;
      var k=0,lijn=r.querySelectorAll('.hub-l'),node=r.querySelectorAll('.hub-n'),tegel=r.querySelector('.hub-tegel'),tekst=r.querySelector('.hub-tekst');
      var tik=function(){[].forEach.call(lijn,function(l){l.classList.remove('is-aan')});[].forEach.call(node,function(x){x.classList.remove('is-aan')});
        lijn[k].classList.add('is-aan');node[k].classList.add('is-aan');tegel.classList.remove('is-gekoppeld');
        setTimeout(function(){tegel.classList.add('is-gekoppeld');tekst.textContent=SW[k%n][1]+' · '+L.gek},700);
        setTimeout(function(){k=(k+1)%n},50)};
      if(calm){tegel.classList.add('is-gekoppeld');return}
      tik();setInterval(tik,2000);
    }
    if(soort==='stroom'){
      var h2='<div class="st-kol st-in"><small class="label">'+L.in+'</small><div class="st-stapel">'+SW.map(function(s,i){return '<div class="st-k" data-i="'+i+'"><span class="ig-ic">'+ic(s[0],s[1])+'</span><b>'+s[1]+'</b></div>'}).join('')+'</div></div>'+
        '<div class="st-mid"><svg class="st-lijn" viewBox="0 0 100 10" preserveAspectRatio="none"><line x1="0" y1="5" x2="100" y2="5"/></svg><span class="st-dot st-dot-in"></span><span class="hub-tegel">'+AIM+'</span><svg class="st-lijn st-lijn2" viewBox="0 0 100 10" preserveAspectRatio="none"><line x1="0" y1="5" x2="100" y2="5"/></svg><span class="st-dot st-dot-uit"></span></div>'+
        '<div class="st-kol st-uit"><small class="label">'+L.uit+'</small>'+L.o.map(function(o,i){return '<div class="st-o" data-i="'+i+'"><i></i>'+o+'</div>'}).join('')+'</div>';
      r.innerHTML=h2;
      var ks=r.querySelectorAll('.st-k'),os=r.querySelectorAll('.st-o'),t2=r.querySelector('.hub-tegel'),j=0;
      var tik2=function(){[].forEach.call(ks,function(x,i){var d=((i-j)%ks.length+ks.length)%ks.length;x.dataset.p=d===0?'0':d===1?'1':d===ks.length-1?'-1':'x'});
        r.classList.remove('is-loopt');void r.offsetWidth;r.classList.add('is-loopt');t2.classList.remove('is-gekoppeld');
        setTimeout(function(){t2.classList.add('is-gekoppeld')},900);
        [].forEach.call(os,function(o,i){o.classList.remove('is-aan');setTimeout(function(){o.classList.add('is-aan')},1300+i*220)});
        j=(j+1)%ks.length};
      if(calm){[].forEach.call(os,function(o){o.classList.add('is-aan')});return}
      tik2();setInterval(tik2,3200);
    }
  };
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
