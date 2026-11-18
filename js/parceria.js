(function(){
'use strict';
// ---- senha: guarda so o hash SHA-256 de "0812" (troque o hash quando mudar a senha: veja README) ----
var $=function(i){return document.getElementById(i)};
var gate=$('gate'),page=$('page'),pass=$('pass'),pin=$('pin'),err=$('err');
// SENHA: edite aqui para trocar (depois voce pode trocar por hash)
var SENHA='0812';
var started=false;
function unlock(){gate.hidden=true;page.hidden=false;try{sessionStorage.setItem('bgbr','1')}catch(e){}if(!started){started=true;startShow();}}
function tryEnter(){
  if(pass.value===SENHA){unlock();}
  else{err.hidden=false;gate.querySelector('.gate-box').classList.remove('shake');void gate.offsetWidth;gate.querySelector('.gate-box').classList.add('shake');pass.value='';pin.innerHTML='';}
}
pass.addEventListener('input',function(){err.hidden=true;pin.innerHTML='<i></i>'.repeat(pass.value.length);if(pass.value.length===SENHA.length)tryEnter();});
pass.addEventListener('keydown',function(e){if(e.key==='Enter')tryEnter()});
$('enter').addEventListener('click',tryEnter);
try{if(sessionStorage.getItem('bgbr')==='1')unlock();else pass.focus();}catch(e){}

// ---- rostos (mesma ideia do firmware: cor dos olhos, pupila, fundo, efeito) ----
var FACES=[
 {n:'Blue',e:[170,220,255],p:[20,60,160],bg:[10,40,130],fx:0},
 {n:'Vermelho Billie Global',e:[255,255,255],p:[200,0,0],bg:[200,0,0],fx:0},
 {n:'Fogo',e:[255,150,30],p:[255,240,120],bg:[170,10,10],fx:1},
 {n:'Água',e:[140,230,255],p:[10,60,140],bg:[0,70,110],fx:2},
 {n:'Flor',e:[255,170,210],p:[255,240,120],bg:[20,110,60],fx:3},
 {n:'Bad Guy',e:[150,255,0],p:[0,0,0],bg:[0,0,0],fx:0},
 {n:'Lunch',e:[255,90,150],p:[255,230,200],bg:[100,10,50],fx:0},
 {n:'Birds',e:[230,240,255],p:[60,80,200],bg:[10,10,60],fx:4}
];
var cur=0,from=0,mix=1,lastSwap=0,fxLayer=0;
var chips=$('chips'),nameEl=$('faceName');
FACES.forEach(function(f,i){var b=document.createElement('button');b.textContent=f.n;b.onclick=function(){go(i,true)};chips.appendChild(b)});
function go(i,manual){from=cur;cur=i;mix=0;lastSwap=performance.now();if(manual)lastSwap+=8000;
  nameEl.textContent=FACES[i].n;[].forEach.call(chips.children,function(c,k){c.classList.toggle('on',k===i)});}
function L(a,b,t){return a+(b-a)*t}
function mixc(a,b,t){return [L(a[0],b[0],t),L(a[1],b[1],t),L(a[2],b[2],t)]}
function rgb(c,a){return 'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+(a==null?1:a)+')'}

function startShow(){
  var cv=$('eyes'),ctx=cv.getContext('2d'),fx=$('fx'),fc=fx.getContext('2d');
  var parts=[];
  function size(){fx.width=innerWidth;fx.height=innerHeight}size();addEventListener('resize',size);
  go(0);
  var blink=0,blinkT=0,nextBlink=2000,gx=0,gy=0,tgx=0,tgy=0,nextGaze=1000;
  function eye(x,y,side,t,F,fxk){
    var rx=82,ry=112;
    ctx.save();ctx.translate(x,y);ctx.rotate(side*15*Math.PI/180);
    var sy=1-blink*0.95;
    ctx.fillStyle=rgb(F.e);ctx.beginPath();ctx.ellipse(0,0,rx,ry*sy,0,0,7);ctx.fill();
    ctx.save();ctx.beginPath();ctx.ellipse(0,0,rx,ry*sy,0,0,7);ctx.clip();
    ctx.fillStyle=rgb(F.p);ctx.beginPath();ctx.ellipse(side*-18+gx,22+gy,32,41*sy,side*-8*Math.PI/180,0,7);ctx.fill();
    if(fxk===2){ctx.fillStyle='rgba(205,245,255,.4)';ctx.beginPath();ctx.ellipse(0,ry*.55,rx*.6,6+2*Math.sin(t*3),0,0,7);ctx.fill();}
    ctx.restore();ctx.restore();
  }
  function frame(now){
    var t=now/1000;
    if(mix<1)mix=Math.min(1,mix+0.04);
    if(now-lastSwap>9000){go((cur+1)%FACES.length);}
    var F={e:mixc(FACES[from].e,FACES[cur].e,mix),p:mixc(FACES[from].p,FACES[cur].p,mix),bg:mixc(FACES[from].bg,FACES[cur].bg,mix)};
    var fxk=FACES[cur].fx;
    if(now>nextBlink){blinkT=now;nextBlink=now+2300+Math.random()*2000}
    if(now>nextGaze){tgx=(Math.random()-.5)*20;tgy=(Math.random()-.5)*22;nextGaze=now+900+Math.random()*2200}
    gx+=(tgx-gx)*.2;gy+=(tgy-gy)*.2;
    ctx.fillStyle=rgb(F.bg);ctx.fillRect(0,0,480,480);
    var bt=now-blinkT;var save=blink;blink=(bt>0&&bt<180)?Math.sin(bt/180*Math.PI):0;
    eye(240-96,218,-1,t,F,fxk);eye(240+96,218,1,t,F,fxk);
    blink=save;
    // efeitos no mostrador
    for(var k=0;k<2;k++){var s=k?1:-1,ex=240+s*96,ey=218;
      if(fxk===1){for(var i=0;i<5;i++){var u=(i-2)/2,ph=t*7+i*1.9+k*2.3,x=ex+u*60,top=ey-112*(0.8-0.28*Math.abs(u)),h=40+16*Math.sin(ph)+8*Math.sin(ph*2.3);
        ctx.fillStyle='rgba(255,100,15,.92)';ctx.beginPath();ctx.ellipse(x+4*Math.sin(ph*.8),top-h*.4,17,h*.62,0,0,7);ctx.fill();
        ctx.fillStyle='rgba(255,225,90,.95)';ctx.beginPath();ctx.ellipse(x,top-h*.28,9,h*.38,0,0,7);ctx.fill();}}
      if(fxk===2){for(i=0;i<3;i++){var q=((t*.55+i*.34+k*.17)%1),dx=ex+(i-1)*42,dy=ey+112*.82+q*100;
        ctx.fillStyle='rgba(170,235,255,'+(.9*(1-q*q))+')';ctx.beginPath();ctx.ellipse(dx,dy,11,16+6*q,0,0,7);ctx.fill();}}
      if(fxk===3){for(var f=0;f<2;f++){var cx=f?ex-s*45:ex+s*62,cy=f?ey+95:ey-90,sc=f?.72:1,r=t*.66*s+f*.4;
        for(var p=0;p<5;p++){var a=r+p*1.2566;ctx.fillStyle='rgba(255,185,215,.95)';ctx.beginPath();ctx.ellipse(cx+22*sc*Math.cos(a),cy+22*sc*Math.sin(a),18*sc,10*sc,a,0,7);ctx.fill();}
        ctx.fillStyle='#ffe146';ctx.beginPath();ctx.arc(cx,cy,10*sc,0,7);ctx.fill();}}
      if(fxk===4){for(i=0;i<4;i++){var tw=.5+.5*Math.sin(t*3+i*1.7+k),x2=ex+(i-1.5)*44;
        ctx.fillStyle='rgba(255,255,235,'+(.3+.7*tw)+')';ctx.beginPath();ctx.arc(x2,ey-112-26-14*Math.sin(i*2.1),3+5*tw,0,7);ctx.fill();}}
    }
    // particulas de fundo da pagina (fogo/agua/flor), mudam com o rosto
    if(Math.random()<.35){var kinds=['#ff6a00','#ffd23c','#7fd8ff','#ff9fd0','#d80003','#6be08a'];
      var kc=fxk===1?[0,1,4]:fxk===2?[2,2,2]:fxk===3?[3,5,3]:[3,2,4];
      parts.push({x:Math.random()*fx.width,y:fxk===2?-10:fx.height+10,vy:(fxk===2?1:-1)*(.8+Math.random()*1.6),vx:(Math.random()-.5)*.8,r:3+Math.random()*7,c:kinds[kc[(Math.random()*3)|0]],life:1,petal:fxk===3});}
    fc.clearRect(0,0,fx.width,fx.height);
    for(var j=parts.length-1;j>=0;j--){var P=parts[j];P.x+=P.vx+Math.sin(P.y*.02)*.4;P.y+=P.vy;P.life-=.004;
      if(P.life<=0){parts.splice(j,1);continue}
      fc.globalAlpha=Math.min(.55,P.life);fc.fillStyle=P.c;fc.beginPath();
      if(P.petal)fc.ellipse(P.x,P.y,P.r*1.4,P.r*.7,P.y*.05,0,7);else fc.arc(P.x,P.y,P.r,0,7);fc.fill();}
    fc.globalAlpha=1;
    document.body.style.transition='background 1.2s';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
})();
