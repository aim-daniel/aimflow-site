/* AIM FLOW-pagina: (1) Webdesign-voorbeeld als nette voorbeeldsite in AIM-stijl, (2) AI-medewerker als zelfspelende demo. */
(function(){
  var MARK='<svg viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M0 0L100 0L100 100L0 100ZM65.66 55.93L88.38 55.93L80.55 87.63L67.53 87.63L57.7 79.12L70.13 79.12L74.56 64.06L42.6 87.63L24.9 87.63L24.9 85.31Z"/></svg>';
  var T={nl:{url:'noordbuitenleven.nl',merk:'NOORD',merk2:'Buitenleven',nav:['Overkappingen','Projecten','Werkwijze'],off:'Offerte',kick:'Lamellenoverkappingen op maat',h1:'Buiten leven,',h2:'het hele jaar.',p:'Ontworpen voor jouw tuin. Gemaakt en gemonteerd door ons eigen team.',b1:'Plan een adviesgesprek',b2:'Bekijk projecten',f:[['01','Ontwerp'],['02','Productie'],['03','Montage']],tag:'Project · Villa met tuin',ph:'Adviesgesprek',typ:'typt…'},
    en:{url:'northoutdoor.com',merk:'NORTH',merk2:'Outdoor living',nav:['Pergolas','Projects','How we work'],off:'Quote',kick:'Louvred pergolas, made to measure',h1:'Outdoor living,',h2:'all year round.',p:'Designed for your garden. Built and installed by our own team.',b1:'Book a consultation',b2:'View projects',f:[['01','Design'],['02','Production'],['03','Installation']],tag:'Project · Villa with garden',ph:'Consultation',typ:'typing…'},
    de:{url:'nordaussenleben.de',merk:'NORD',merk2:'Außenleben',nav:['Überdachungen','Projekte','Ablauf'],off:'Angebot',kick:'Lamellendächer nach Maß',h1:'Draußen leben,',h2:'das ganze Jahr.',p:'Für Ihren Garten entworfen. Gebaut und montiert von unserem eigenen Team.',b1:'Beratung vereinbaren',b2:'Projekte ansehen',f:[['01','Entwurf'],['02','Produktion'],['03','Montage']],tag:'Projekt · Villa mit Garten',ph:'Beratung',typ:'schreibt…'}};
  var start=function(){
    var lang=(document.documentElement.lang||'nl').slice(0,2),t=T[lang]||T.nl;
    /* ---- 1. webdesign ---- */
    var wb=document.querySelector('.ks.ks-wb');
    if(wb&&!wb.dataset.aim){wb.dataset.aim=1;wb.classList.add('w2');
      wb.innerHTML='<div class="w2-br"><div class="w2-bar"><i></i><i></i><i></i><span>'+t.url+'</span></div>'+
        '<div class="w2-site"><div class="w2-nav"><b>'+MARK+'<span>'+t.merk+'<small>'+t.merk2+'</small></span></b><nav>'+t.nav.map(function(n){return '<span>'+n+'</span>'}).join('')+'</nav><em>'+t.off+'</em></div>'+
        '<div class="w2-hero"><img src="/home/v7/villa-tuin-1200.webp" alt="" loading="lazy"><div class="w2-sh"></div>'+
        '<div class="w2-txt"><small><i></i>'+t.kick+'</small><h4>'+t.h1+'<br><span>'+t.h2+'</span></h4><p>'+t.p+'</p><div class="w2-bt"><span class="w2-b1">'+t.b1+' →</span><span class="w2-b2">'+t.b2+'</span></div></div>'+
        '<span class="w2-tag">'+t.tag+'</span></div>'+
        '<div class="w2-feat">'+t.f.map(function(x){return '<div><small>'+x[0]+'</small>'+x[1]+'</div>'}).join('')+'</div></div></div>'+
        '<div class="w2-ph"><div class="w2-ph-in"><div class="w2-ph-nav"><b>'+MARK+t.merk+'</b><i></i></div><img src="/home/v7/villa-lounge-1200.webp" alt="" loading="lazy"><small><i></i>'+t.kick+'</small><h5>'+t.h1+' <span>'+t.h2+'</span></h5><span class="w2-b1">'+t.ph+' →</span></div></div>';
    }

    /* ---- 3. automation: de stappen lopen vanzelf één voor één door ---- */
    var au=document.querySelector('.ks.ks-au');
    if(au&&!au.dataset.aim){au.dataset.aim=1;
      var L={nl:{nu:'Nu',k:['Binnen','Verstuurd','Gepland','Klaar','Gepland','Geboekt']},en:{nu:'Now',k:['Received','Sent','Scheduled','Ready','Booked','Recorded']},de:{nu:'Jetzt',k:['Eingegangen','Gesendet','Geplant','Bereit','Geplant','Gebucht']}}[lang]||null;
      var st=[].slice.call(au.querySelectorAll('.au-step'));
      var scr2=au.closest('.kr__scr'),calm2=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(L&&st.length&&!calm2){
        st.forEach(function(s){if(!s.querySelector('em')){var e=document.createElement('em');s.insertBefore(e,s.querySelector('b'))}});
        var i=0,tik=null;
        var zet=function(n){st.forEach(function(s,j){s.classList.remove('done','now','wacht');s.classList.add(j<n?'done':j===n?'now':'wacht');
          var e=s.querySelector('em');e.textContent=j<n?L.k[j]:j===n?L.nu:'';s.classList.toggle('au-flits',j===n)})};
        var stap=function(){zet(i);i=(i+1)%(st.length+2)};
        var kijk2=function(){var aan=!scr2||scr2.classList.contains('is-on');if(aan&&!tik){i=0;stap();tik=setInterval(stap,1500)}else if(!aan&&tik){clearInterval(tik);tik=null;zet(3)}};
        if(scr2&&'MutationObserver' in window)new MutationObserver(kijk2).observe(scr2,{attributes:true,attributeFilter:['class']});
        kijk2();
      }
    }
    /* ---- 2. AI-medewerker als demo ---- */
    var ag=document.querySelector('.ks.ks-ag');
    if(ag&&!ag.dataset.aim){ag.dataset.aim=1;
      var th=ag.querySelector('.ag-th');if(!th)return;
      var stukken=[].slice.call(th.querySelectorAll('.ag-msg,.ag-sys,.ag-box'));
      var typ=document.createElement('div');typ.className='ag-typ';typ.innerHTML='<i></i><i></i><i></i>';th.insertBefore(typ,th.querySelector('.ag-box')||null);
      var scr=ag.closest('.kr__scr'),calm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(calm)return;
      var timers=[],loopt=false;
      var reset=function(){timers.forEach(clearTimeout);timers=[];stukken.forEach(function(s){s.classList.add('ag-uit');s.classList.remove('ag-in')});typ.className='ag-typ';var g=ag.querySelector('.ag-box em');if(g)g.classList.remove('is-ok')};
      var na=function(ms,f){timers.push(setTimeout(f,ms))};
      var toon=function(el){el.classList.remove('ag-uit');el.classList.add('ag-in')};
      var speel=function(){reset();loopt=true;var tijd=400;
        stukken.forEach(function(el){
          if(el.classList.contains('ag-msg')){var uit=el.classList.contains('out');
            na(tijd,function(){typ.className='ag-typ is-aan'+(uit?' is-uit':'');th.insertBefore(typ,el)});tijd+=uit?1600:1100;
            na(tijd,function(){typ.className='ag-typ';toon(el)});tijd+=900}
          else{na(tijd,function(){toon(el)});tijd+=1100}});
        na(tijd+300,function(){var g=ag.querySelector('.ag-box em');if(g)g.classList.add('is-ok')});
        na(tijd+4200,function(){if(scr&&scr.classList.contains('is-on'))speel();else loopt=false})};
      var kijk=function(){if(scr&&scr.classList.contains('is-on')){if(!loopt)speel()}else{if(loopt){reset();loopt=false;stukken.forEach(toon)}}};
      if(scr&&'MutationObserver' in window)new MutationObserver(kijk).observe(scr,{attributes:true,attributeFilter:['class']});
      kijk();
    }
  };
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
