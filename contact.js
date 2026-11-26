/* Contact als korte vragenflow (3 stappen). De bestaande velden blijven: stap 1 en 2 vullen "Interesse" en zetten de antwoorden boven het bericht,
   zodat het WhatsApp-bericht van de site gewoon meekomt. */
(function(){
  var T={nl:{s:['Waar wil je mee verder?','Wanneer wil je dit geregeld hebben?','Waar mogen we je plan naartoe sturen?'],
      a:[['Mijn product in 3D laten zien','AIM CORE'],['Meer aanvragen via mijn website','AIM FLOW'],['Het werk na de aanvraag automatiseren','AIM FLOW'],['Iets anders, op maat','']],
      b:['Zo snel mogelijk','Binnen 3 maanden','Ik oriënteer me nog'],stap:'Stap',van:'van',terug:'← Terug',cta:'Plan mijn gratis adviesgesprek',doel:'Doel',wanneer:'Wanneer',noot:'Gratis en vrijblijvend · je ziet het bericht in WhatsApp voordat het weggaat'},
    en:{s:['What would you like to move forward with?','When would you like this sorted?','Where should we send your plan?'],
      a:[['Show my product in 3D','AIM CORE'],['More enquiries from my website','AIM FLOW'],['Automate the work after an enquiry','AIM FLOW'],['Something else, made to measure','']],
      b:['As soon as possible','Within 3 months','Just exploring'],stap:'Step',van:'of',terug:'← Back',cta:'Book my free strategy session',doel:'Goal',wanneer:'When',noot:'Free, no obligation · you see the message in WhatsApp before it is sent'},
    de:{s:['Wobei möchten Sie weiterkommen?','Bis wann soll das erledigt sein?','Wohin dürfen wir Ihren Plan schicken?'],
      a:[['Mein Produkt in 3D zeigen','AIM CORE'],['Mehr Anfragen über meine Website','AIM FLOW'],['Die Arbeit nach der Anfrage automatisieren','AIM FLOW'],['Etwas anderes, nach Maß','']],
      b:['So schnell wie möglich','Innerhalb von 3 Monaten','Ich informiere mich noch'],stap:'Schritt',van:'von',terug:'← Zurück',cta:'Mein kostenloses Beratungsgespräch planen',doel:'Ziel',wanneer:'Wann',noot:'Kostenlos und unverbindlich · Sie sehen die Nachricht in WhatsApp, bevor sie rausgeht'}};
  var start=function(){
    var f=document.getElementById('form');if(!f||f.dataset.flow)return;f.dataset.flow='1';
    var lang=(document.documentElement.lang||'nl').slice(0,2),t=T[lang]||T.nl;
    var sel=f.querySelector('select[name="over"]'),ta=f.querySelector('textarea[name="text"]'),send=f.querySelector('.send'),btn=send&&send.querySelector('button');
    var velden=[].slice.call(f.querySelectorAll(':scope > .fld, :scope > .two'));
    var keuze={doel:null,wanneer:null};
    var kop=document.createElement('div');kop.className='flow__kop';
    kop.innerHTML='<div class="flow__bar"><i></i><i></i><i></i></div><div class="flow__rij"><span class="label flow__tel"></span><button type="button" class="flow__terug">'+t.terug+'</button></div><h3 class="flow__vraag"></h3>';
    var keuzes=document.createElement('div');keuzes.className='flow__keuzes';
    var eerste=f.querySelector('.fld');f.insertBefore(kop,eerste);f.insertBefore(keuzes,eerste);
    if(btn){btn.firstChild.nodeValue=t.cta+' ';}
    var noot=send&&send.querySelector('p');if(noot)noot.textContent=t.noot;
    var stap=0;
    var toon=function(){
      [].forEach.call(kop.querySelectorAll('.flow__bar i'),function(b,i){b.classList.toggle('is-aan',i<=stap)});
      kop.querySelector('.flow__tel').textContent=t.stap+' '+(stap+1)+' '+t.van+' 3';
      kop.querySelector('.flow__vraag').textContent=t.s[stap];
      kop.querySelector('.flow__terug').style.visibility=stap?'visible':'hidden';
      var opts=stap===0?t.a.map(function(x){return x[0]}):stap===1?t.b:null;
      keuzes.innerHTML='';keuzes.hidden=!opts;
      if(opts)opts.forEach(function(o,i){var b=document.createElement('button');b.type='button';b.className='flow__opt';b.innerHTML='<span>'+o+'</span><i aria-hidden="true">→</i>';
        if((stap===0&&keuze.doel===i)||(stap===1&&keuze.wanneer===i))b.classList.add('is-on');
        b.addEventListener('click',function(){if(stap===0){keuze.doel=i;var v=t.a[i][1];if(sel){sel.value=v||sel.options[sel.options.length-1].value}}else keuze.wanneer=i;
          b.classList.add('is-on');setTimeout(function(){stap++;toon()},220)});keuzes.appendChild(b)});
      velden.forEach(function(v){v.hidden=stap<2});if(send)send.hidden=stap<2;
      f.classList.toggle('is-laatste',stap===2);
      if(stap===2){var n=f.querySelector('input[name="naam"]');if(n)setTimeout(function(){n.focus({preventScroll:true})},60)}
    };
    kop.querySelector('.flow__terug').addEventListener('click',function(){if(stap>0){stap--;toon()}});
    f.addEventListener('submit',function(){if(!ta)return;var pre=[];if(keuze.doel!=null)pre.push(t.doel+': '+t.a[keuze.doel][0]);if(keuze.wanneer!=null)pre.push(t.wanneer+': '+t.b[keuze.wanneer]);
      if(pre.length&&ta.value.indexOf(pre[0])<0)ta.value=pre.join('\n')+(ta.value?'\n\n'+ta.value:'')},true);
    toon();
  };
  if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();
