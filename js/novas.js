(function(){'use strict';
var page=document.body.dataset.page,D=window.KARLU_DATA,$=function(s){return document.querySelector(s)};
var disp=$('#nv-disp'),grid=$('#nv-grid');if(!grid)return;
function eyes(){return disp&&disp.__eyes}
var cap=$('#nv-cap'),chips=$('#nv-chips'),cnt=$('#nv-count');
function chipsFor(list,cb){chips.innerHTML=list.map(function(c,i){return '<button type="button" data-k="'+c[0]+'" class="'+(i?'':'on')+'">'+c[1]+'</button>'}).join('');
 chips.onclick=function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(chips.children,function(x){x.classList.toggle('on',x===b)});cb(b.dataset.k)}}
if(page==='reacoes'){
 var CATS=[['all','Todas'],['feliz',/feliz|risad|sorri|contente|rindo|festa|parab|empolg|brilh|estrela/i],['amor',/cora|apaix|amor|charm|piscad/i],['triste',/triste|chor|solu|desap|emocion/i],['bravo',/brav|raiva|furios|veia|emburr|plano|fogo/i],['susto',/susto|assust|choque|medo|calafrio|boom|surpres/i],['tech',/hacker|erro|reinic|carreg|scan|radar|alvo|bluetooth|glitch|conect|zoom/i],['sono',/sono|zzz|soneca|bocejo|cansad|noite|cabece/i],['clima',/chuva|calor|gelo|congel|eletri|dia|galax/i]];
 var NAMES=D.reacoes.map(function(n){return n.replace(/\s*\(.*\)$/,'').replace(/^[RS]-\d+\s*/,'').replace(/^./,function(c){return c.toUpperCase()})});
 var cat='all',q='';
 chipsFor(CATS.map(function(c){return [c[0],c[1]===c[1]+''?c[1]:c[0][0].toUpperCase()+c[0].slice(1)]}),function(k){cat=k;draw()});
 var rx={};CATS.forEach(function(c){rx[c[0]]=c[1]});
 function draw(){var h='',n=0;NAMES.forEach(function(nm,i){var raw=D.reacoes[i];if(q&&raw.toLowerCase().indexOf(q)<0&&nm.toLowerCase().indexOf(q)<0)return;if(cat!=='all'&&!rx[cat].test(raw))return;n++;h+='<button type="button" data-r="'+(i+1)+'">'+nm+'</button>'});
  grid.innerHTML=h||'<p>Nenhuma reação encontrada.</p>';cnt.textContent=n+' de '+NAMES.length+' reações'}
 $('#nv-q').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();draw()});
 grid.addEventListener('click',function(e){var b=e.target.closest('button[data-r]');if(!b)return;var id=+b.dataset.r,E=eyes();cap.textContent='Karlu: '+NAMES[id-1]+' (id '+id+')';
  if(E){var k='rx'+id;if(window.KarluEyes.R[k])E.trigger(k);else{var a=window.KarluEyes.REACTS[id-1];if(a)E.trigger(a)}}});
 draw();
}else{
 var gi=function(i){var f=window.KarluEyes.FACES[i];if(i===76)return 'special';if(i>=72)return 'polly';if(i>=60)return 'grad';return (f[0]!==f[6]||f[1]!==f[7]||f[2]!==f[8])?'hetero':'solid'};
 var T={all:'Todos',solid:'Uma cor',hetero:'Heterocromia',grad:'Degradê',polly:'Polly',special:'Especial'},cur='all';
 chipsFor(Object.keys(T).map(function(k){return [k,T[k]]}),function(k){cur=k;draw()});
 var F=window.KarluEyes.FACES;function rgb(f,o){return 'rgb('+f[o]+','+f[o+1]+','+f[o+2]+')'}
 function draw(){var h='',n=0;D.rostos.forEach(function(nm,i){if(cur!=='all'&&gi(i)!==cur)return;n++;var f=F[i];h+='<button type="button" data-f="'+i+'"><span class="nv-sw"><i style="background:'+rgb(f,0)+'"></i><i style="background:'+rgb(f,3)+'"></i><i style="background:'+rgb(f,6)+'"></i></span>'+i+' · '+nm+'</button>'});
  grid.innerHTML=h;cnt.textContent=n+' de '+D.rostos.length+' olhares'}
 grid.addEventListener('click',function(e){var b=e.target.closest('button[data-f]');if(!b)return;var i=+b.dataset.f;[].forEach.call(grid.children,function(x){x.classList.toggle('on',x===b)});cap.textContent='Olhar '+i+': '+D.rostos[i];if(eyes())eyes().setFace(i)});
 draw();
}})();
