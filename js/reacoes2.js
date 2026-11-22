/* Reações com linha do tempo própria (R-21..R-48, S-01..S-03) + enfeites ao redor do rosto, portados do firmware v14 */
(function(){'use strict';var E=window.KarluEyes;if(!E||!E.R||!E.rxTint)return;var R=E.R,tint=E.rxTint,motion=E.rxMotion;
var DC={"79":{"b":["spark"],"c":[255,225,90]},"80":{"b":["heart"],"c":[255,90,150]},"81":{"b":["bulb"],"c":[255,235,120]},"82":{"b":["scan"],"c":[60,230,255]},"84":{"b":["spark"],"c":[190,235,255]},"85":{"b":["sweat"],"c":[120,200,255]},"87":{"b":["heart"],"c":[255,90,150]},"88":{"b":["bang"],"c":[235,235,240]},"89":{"b":["dots"],"c":[190,200,220]},"92":{"b":["spark"],"c":[255,255,255]},"94":{"b":["z"],"c":[180,190,255]},"95":{"b":["tear"],"c":[120,200,255]},"96":{"b":["spark"],"c":[255,225,70]},"97":{"b":["spark"],"c":[150,255,170]},"127":{"b":["spark"],"c":[255,225,250]},"128":{"b":["spark"],"c":[255,230,245]}},CU={"99":1,"100":2,"101":3,"102":4,"103":5,"104":6,"105":7,"106":8,"107":9,"108":10,"109":11,"110":12,"111":13,"112":14,"113":15,"114":16,"115":17,"116":18,"117":19,"118":20,"119":21,"120":22,"121":23,"122":24,"123":25,"124":26,"125":27,"129":28};
var cl=function(v,a,b){return v<a?a:v>b?b:v},lp=function(a,b,k){return a+(b-a)*k};
function ease(x){x=cl(x,0,1);return x*x*(3-2*x)}
function rmp(p,a,b){return ease((p-a)/(b-a))}
function pup(T,r,g,b,k){k=cl(k,0,1);T.pr=lp(T.pr,r,k);T.pg=lp(T.pg,g,k);T.pb=lp(T.pb,b,k);T.pr2=lp(T.pr2,r,k);T.pg2=lp(T.pg2,g,k);T.pb2=lp(T.pb2,b,k)}
function pl(p,a,b,c){return Math.min(ease((p-a)/(b-a)),ease((c-p)/(c-b)))}
var S=Math.sin,C=Math.cos,X=Math.exp;
/* linhas do tempo: p=0..1, e=envelope, dc=enfeites, col(r,g,b)=cor dos enfeites */
var TL={
1:function(p,t,d,e,sd,T,O,H,I,dc,col){tint(T,255,45,90,.7*rmp(p,.12,.40)*e);dc.vein=rmp(p,.14,.34)*e;dc.steam=rmp(p,.38,.62)*(1-rmp(p,.88,1))*e},
2:function(p,t,d,e,sd,T,O,H,I,dc){dc.quest=rmp(p,.16,.30)*e;dc.questS=.25+.75*rmp(p,.20,.80);dc.quest2=rmp(p,.68,.82)*e;T.rx*=1+.05*rmp(p,.4,.7);T.ry*=1+.05*rmp(p,.4,.7)},
3:function(p,t,d,e,sd,T,O,H,I,dc){T.arc=rmp(p,.12,.34)*e;T.bend=-9;T._tau=160;var sw=rmp(p,.30,.46)*e;O.rot+=8*sw*S(t*.0058);O.dy+=2*sw*S(t*.0116);dc.notes=rmp(p,.22,.36)*(1-rmp(p,.92,1))*e},
4:function(p,t,d,e,sd,T,O,H,I,dc,col){T.hl=rmp(p,0,.15)*e;T.wet=rmp(p,.18,.50)*(1-.25*rmp(p,.8,1))*e;dc.tear=rmp(p,.46,.62)*e;var sm=rmp(p,.66,.80)*e;T.cheek=.45*sm;T.ry*=1-.10*sm;T.rot=lp(T.rot,H.rot*.6,sm);dc.spark=sm*.9;col(255,225,250);O.dy+=2*sm*S(t*.012)},
5:function(p,t,d,e,sd,T,O,H,I,dc,col){var k=rmp(p,.10,.40);tint(T,205,45,205,.9*k*e);pup(T,252,225,190,k*e);T.pSlit=rmp(p,.22,.46)*e;T.cutBot+=.14*rmp(p,.40,.60)*e;dc.spark=rmp(p,.62,.80)*e;col(150,60,235)},
6:function(p,t,d,e,sd,T,O,H,I,dc,col){var u=t>.14*d?ease(1-(t-.14*d)/260):0,big=rmp(p,.14,.20)*(1-rmp(p,.55,.70));T.rx*=1+.2*big;T.ry*=1+.2*big;T.ps*=1-.5*big;T.cutTop=0;T.lid=0;O.zoom*=1+.12*u;O.dy-=7*u;O.dx+=2.2*big*S(t*.09);var eco=rmp(p,.55,.80);tint(T,255,170,200,.55*eco*e);dc.burst=rmp(p,.14,.20)*(1-rmp(p,.62,.92))*e;dc.burstR=rmp(p,.14,.50);col(lp(255,150,eco),lp(235,140,eco),lp(90,95,eco))},
7:function(p,t,d,e,sd,T,O,H,I,dc){var h=rmp(p,.05,.75),c2=rmp(p,.40,.80);tint(T,255,lp(125,55,c2),lp(110,30,c2),.88*rmp(p,.05,.35)*e);pup(T,255,235,70,rmp(p,.05,.30)*e);var lk=rmp(p,.45,.72)*e;T.cutTop=lp(T.cutTop,.24,lk);T.lid=lp(T.lid,-16,lk);dc.fire=rmp(p,.10,.40)*e;dc.fireH=.3+.7*rmp(p,.20,.80);O.dx+=h*S(t*.06)*e},
8:function(p,t,d,e,sd,T,O,H,I,dc){var cold=rmp(p,.05,.50),fz=rmp(p,.62,.86);tint(T,150,205,255,.7*cold*e);tint(T,215,235,255,.7*fz*e);pup(T,195,210,230,fz*e);T.ice=fz*e;T.pa*=1-.5*fz;var sh=(1+4*cold)*(1-rmp(p,.60,.70));O.dx+=.55*sh*S(t*.075)*e;O.rot+=.8*sh*S(t*.061+.7)*e;dc.snow=rmp(p,.10,.30)*e},
9:function(p,t,d,e,sd,T,O,H,I,dc,col){var k=rmp(p,.08,.28);tint(T,255,228,70,.85*k*e);pup(T,255,150,70,k*e);T.ps*=1-.55*k;dc.bolt=rmp(p,.10,.22)*(1-rmp(p,.90,1))*e;O.dx+=2.4*k*e*(S(t*.11)+.5*S(t*.27));O.dy+=1.2*k*e*S(t*.13+1);dc.spark=rmp(p,.55,.70)*.8*e;col(255,240,120)},
10:function(p,t,d,e,sd,T,O,H,I,dc){tint(T,120,100,235,.55*rmp(p,.08,.30)*e);T.wet=.85*rmp(p,.62,.92)*e;dc.cloud=rmp(p,.05,.22)*e;dc.rain=rmp(p,.14,.32)*e;dc.tear=rmp(p,.80,.92)*.8*e},
11:function(p,t,d,e,sd,T,O,H,I,dc,col){var a1=rmp(p,.05,.50);T.dim=.5*a1*e;T.squint=.62*rmp(p,.12,.40)*(1-rmp(p,.40,.50))*e;T.arc=rmp(p,.40,.60)*e;T.bend=9;T._tau=200;tint(T,150,70,170,.5*a1*e);dc.moon=rmp(p,.50,.70)*e;dc.spark=rmp(p,.56,.76)*.8*e;col(255,235,120);dc.z=rmp(p,.68,.84)*e},
12:function(p,t,d,e,sd,T,O,H,I,dc,col){T.arc=(1-rmp(p,.28,.44))*e;T.bend=9;T._tau=180;T.squint=.7*rmp(p,.30,.46)*(1-rmp(p,.50,.70))*e;T.dim=.4*(1-rmp(p,.10,.62))*e;var op=rmp(p,.72,.90)*e;T.rx*=1+.08*op;T.ry*=1+.08*op;dc.sun=e;dc.sunP=rmp(p,.04,.55);dc.spark=rmp(p,.80,.90)*e;col(255,225,90)},
13:function(p,t,d,e,sd,T,O,H,I,dc,col){var s1=rmp(p,.18,.30),lock=rmp(p,.70,.80);I.goX=10*S(t*.0065)*(1-s1)*e;I.goY=0;T.pCross=rmp(p,.20,.32)*e;pup(T,255,225,190,T.pCross);tint(T,255,55,90,(.35*rmp(p,.20,.40)+.5*rmp(p,.40,.80))*e);T.cutTop=lp(T.cutTop,.18,rmp(p,.40,.60)*e);dc.brk=rmp(p,.16,.28)*e;dc.brkK=rmp(p,.28,.80);col(255,lp(70,255,lock),lp(90,255,lock));O.dx+=1.6*lock*(1-rmp(p,.84,.92))*S(t*.1)},
14:function(p,t,d,e,sd,T,O,H,I,dc,col){var sh=rmp(p,.10,.26)*(1-rmp(p,.86,.96));T.rx*=1-.58*sh;T.ry*=1-.5*sh;T.ps*=1-.55*sh;var tail=1-rmp(p,.86,.92);T.ld=rmp(p,.26,.36)*tail*e;dc.dots=rmp(p,.30,.40)*tail*e;col(215,218,230);T._tau=70},
15:function(p,t,d,e,sd,T,O,H,I,dc,col){var gk=rmp(p,.14,.46),neon=rmp(p,.62,.84);tint(T,lp(168,lp(40,0,neon),gk),lp(158,lp(225,255,neon),gk),lp(185,lp(110,90,neon),gk),.95*rmp(p,.02,.12)*e);pup(T,4,44,16,rmp(p,.06,.22)*e);dc.code=rmp(p,0,.14)*e;dc.scan=rmp(p,.40,.52)*e;dc.scanY=52+128*(.5+.5*S(t*.0042));col(70,255,140)},
16:function(p,t,d,e,sd,T,O,H,I,dc){var er=rmp(p,.12,.26);tint(T,255,20,100,.92*er*e);T.ps*=1-.4*er;dc.warn=rmp(p,.16,.26)*(1-rmp(p,.92,1))*e;T.xEye=rmp(p,.50,.58)*(1-rmp(p,.74,.80))*e;var g=rmp(p,.76,.82)*(1-rmp(p,.94,1));T.squint=Math.max(T.squint||0,.55*g);dc.glitchL=g*e;if(p<.14)motion('GLITCH',4,0,t,d,e,sd,T,O);else if(p>.74)motion('GLITCH',8,0,t,d,e,sd,T,O)},
17:function(p,t,d,e,sd,T,O,H,I,dc,col){var gr=rmp(p,.44,.52);dc.brk=rmp(p,.04,.14)*(1-rmp(p,.66,.70))*e;dc.brkK=rmp(p,.10,.50);col(lp(175,110,gr),lp(175,255,gr),lp(185,140,gr));dc.focus=rmp(p,.50,.56)*(1-rmp(p,.66,.70))*e;if(p>.18&&p<.50)T.ps*=1+.28*S((p-.18)*17)*e;var c=rmp(p,.64,.70)*(1-rmp(p,.86,.97));T.squint=Math.max(T.squint||0,.95*c);dc.flash=p>=.70?1-rmp(p,.72,.90):0;T._tau=60},
18:function(p,t,d,e,sd,T,O,H,I,dc,col){tint(T,195,110,235,.55*rmp(p,.05,.20)*e);var f=rmp(p,.76,.86);I.goX=(9*S(t*.0042)*(1-f)+9*f)*e;I.goY=-6*f*e;dc.sonar=rmp(p,.06,.16)*e;dc.sonarM=116;col(40,222,240);dc.blip=f*e},
19:function(p,t,d,e,sd,T,O){var k=rmp(p,.05,.24);tint(T,255,172,226,.88*k*e);pup(T,88,14,120,k*e);T.pSpiral=k*e;O.rot+=4*S(t*.0035)*e;O.dx+=2*S(t*.0023)*e},
20:function(p,t,d,e,sd,T,O,H,I,dc){I.goX=8*C(t*.012)*e;I.goY=6.5*S(t*.012)*e;var w=S(t*.0085);O.rot+=11*w*e;O.dx+=4*S(t*.0085+1.2)*e;T.scL=1-.1*w*e;T.scR=1+.1*w*e;T.squint+=.08*e;dc.orbit=rmp(p,.05,.18)*e},
21:function(p,t,d,e,sd,T,O){var amp=1.25*X(-t/820)*ease(t/120),s=amp*C(t*.0115-.4),sx=cl(1-.3*s,.55,1.55),sy=cl(1+.36*s,.5,1.6);T.rx*=sx;T.ry*=sy;T.prx*=sx;T.pry*=sy;O.dy-=5*s*e;tint(T,255,40,160,.5*e);pup(T,120,225,255,e);T._tau=28},
22:function(p,t,d,e,sd,T,O,H,I,dc,col){var a=rmp(p,.08,.30),b=rmp(p,.48,.70),c=rmp(p,.78,.92),L=lp(lp(lp(1,1.4,a),.62,b),1.22,c),Rr=lp(lp(lp(1,.6,a),1.4,b),1.22,c);T.scL=1+(L-1)*e;T.scR=1+(Rr-1)*e;dc.spark=rmp(p,.84,.94)*e;col(255,255,255);T._tau=90},
23:function(p,t,d,e,sd,T,O,H,I,dc,col){var k=rmp(p,.08,.36);tint(T,62,30,150,.93*k*e);T.gal=k*e;dc.spark=rmp(p,.30,.50)*.9*e;col(170,100,255)},
24:function(p,t,d,e,sd,T,O,H,I,dc){T.arc=rmp(p,.18,.36)*e;T.bend=-9;T._tau=160;var sw=rmp(p,.30,.44)*e;O.rot+=8*sw*S(t*.0068);O.dy+=3*sw*S(t*.0136);dc.confetti=rmp(p,.02,.14)*(1-rmp(p,.90,1))*e},
25:function(p,t,d,e,sd,T,O,H,I,dc,col){var w=rmp(p,.14,.38);T.dim=.55*(1-w);T.squint=Math.max(T.squint||0,.5*(1-w));tint(T,160,60,190,.45*rmp(p,.18,.34)*(1-rmp(p,.40,.50)));tint(T,205,85,225,.30*rmp(p,.40,.50)*(1-rmp(p,.66,.78)));dc.bt=rmp(p,.16,.28)*(1-.45*rmp(p,.66,.80))*(1-rmp(p,.95,1));dc.sonar=rmp(p,.38,.44)*(1-rmp(p,.66,.76));dc.sonarM=92;var hp=rmp(p,.68,.82)*(1-rmp(p,.94,1));T.arc=hp;T.bend=-9;T._tau=130;tint(T,255,70,190,.25*hp);dc.spark=rmp(p,.62,.76)*(1-rmp(p,.92,1));col(170,210,255)},
26:function(p,t,d,e,sd,T,O,H,I,dc){var st=rmp(p,.16,.30),du=rmp(p,.38,.58),sa=rmp(p,.64,.80);dc.bt=1-rmp(p,.93,1);dc.btDim=du;dc.btSlash=rmp(p,.18,.30);T.rx*=1+.07*st*(1-du);T.ry*=1+.07*st*(1-du);T.ps*=1-.25*st*(1-du);I.goY=-6*st*(1-du);tint(T,170,95,175,.5*du);T.cutTop=lp(T.cutTop,.28,du);T.lid=lp(T.lid,10,du);tint(T,140,60,170,.5*sa);T.cutTop=lp(T.cutTop,.40,sa);T.lid=lp(T.lid,14,sa);T.dim=.3*sa;T.py+=4*sa;O.dy+=3*sa;O.rot-=5*sd*sa},
27:function(p,t,d,e,sd,T,O,H,I,dc){tint(T,225,90,215,.35*e);I.goX=9*S(t*.003)*e;I.goY=-1*e;dc.bt=e;dc.btWaves=rmp(p,.06,.16)*e;O.rot+=3*S(t*.003+1)*e},
28:function(p,t,d,e,sd,T,O,H,I){var endK=1-rmp(p,.90,1);tint(T,0,170,0,rmp(p,0,.07)*endK);pup(T,229,63,23,rmp(p,0,.07)*endK);T._tau=90;var sh=rmp(p,.235,.30)*(1-rmp(p,.80,.86)),bolt=sh*(1-rmp(p,.50,.515)*(1-rmp(p,.60,.615))),lid=Math.max(pl(p,.215,.240,.285),pl(p,.795,.820,.865)),ov=sh*(1-bolt);I.lidX=Math.max(I.lidX||0,lid);T.cutBot=lp(.2,0,sh);T.cutTop=lp(H.cutTop,0,sh);T.rx=H.rx*lp(1,.9,sh);T.ry=H.ry*lp(1,1.3,sh);T.rot=lp(H.rot,3,sh);T.lid=lp(H.lid,0,sh);T.pBolt=bolt;T.prx=H.prx*(1-.5*ov);T.pry=H.pry*(1+1.1*ov);T.prot=-14*ov;T.px=H.px*(1-.5*sh);var sw=S(t*.0026);O.rot+=19*sh*sw;O.dx+=5*sh*S(t*.0026+.8);T.scL=1+.13*sh*S(t*.0026+.6);T.scR=1-.13*sh*S(t*.0026+.6);I.goX+=7*S(t*.0042)*((1-sh)*rmp(p,.06,.14)*(1-rmp(p,.20,.23)))}
};
/* liga as reações: base da tabela + linha do tempo + enfeites */
function wrap(id){var b=R['rx'+id];if(!b)return;var base=b.f,cu=CU[id]?TL[CU[id]]:null,dcm=DC[id],d0=b.d;
  b.f=function(t,d,e,sd,T,O,H,I){base(t,d,e,sd,T,O,H,I);I.dc=I.dc||{};I.dcol=I.dcol||[255,255,255];
    if(dcm){dcm.b.forEach(function(k){I.dc[k]=e});I.dcol=dcm.c}
    if(cu)cu(clamp01(t/d),t,d,e,sd,T,O,H,I,I.dc,function(r,g,bb){I.dcol=[r,g,bb]})};b.exact=true}
function clamp01(v){return v<0?0:v>1?1:v}
E.RXIDS.forEach(wrap);
/* limpa os enfeites a cada quadro */
var pf=E.prototype.frame,ZK=['dim','wet','ice','gal','ld','pSpiral','pCross','pSlit','xEye','pDollar','pBolt','prot'];
E.prototype.frame=function(now){this.dc={};this.lidX=0;var H=this.H;if(H)ZK.forEach(function(k){if(H[k]===undefined)H[k]=0});return pf.call(this,now)};
/* desenho dos enfeites (por cima do rosto) */
function rgbs(c,a){return'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+cl(a,0,1)+')'}
function sp(c,x,y,r){c.beginPath();c.moveTo(x,y-r);c.quadraticCurveTo(x,y,x+r,y);c.quadraticCurveTo(x,y,x,y+r);c.quadraticCurveTo(x,y,x-r,y);c.quadraticCurveTo(x,y,x,y-r);c.fill()}
function ht(c,x,y,s){c.beginPath();c.moveTo(x,y+s);c.bezierCurveTo(x-s*1.6,y-s*.2,x-s*.7,y-s*1.4,x,y-s*.5);c.bezierCurveTo(x+s*.7,y-s*1.4,x+s*1.6,y-s*.2,x,y+s);c.fill()}
function tx(c,s,x,y,px,col){c.font='800 '+px+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle=col;c.fillText(s,x,y)}
var PS=[[38,62],[202,66],[56,186],[190,182],[120,26],[28,130],[212,134]];
function overlay(eyes,S2){
  var c=eyes.ctx,k=eyes.cv.width/240,dc=eyes.dc||{},col=eyes.dcol||[255,255,255],t=performance.now(),i,a,x,y;
  c.setTransform(k,0,0,k,0,0);c.globalAlpha=1;
  if(S2&&S2.dim>.01){c.fillStyle='rgba(0,0,0,'+cl(S2.dim*.8,0,.85)+')';c.fillRect(0,0,240,240)}
  if(S2&&S2.ice>.01){c.fillStyle='rgba(215,240,255,'+S2.ice*.28+')';c.fillRect(0,0,240,240);c.strokeStyle='rgba(255,255,255,'+S2.ice*.9+')';c.lineWidth=1.4;c.beginPath();c.moveTo(70,80);c.lineTo(88,110);c.lineTo(76,140);c.moveTo(160,92);c.lineTo(146,118);c.lineTo(166,150);c.stroke()}
  if(S2&&S2.gal>.01){for(i=0;i<22;i++){x=40+(i*47)%160;y=40+(i*71)%160;c.fillStyle='rgba(255,255,255,'+S2.gal*(.4+.6*Math.abs(S(t*.004+i)))+')';c.fillRect(x,y,1.6,1.6)}}
  if(S2&&S2.wet>.01){c.fillStyle='rgba(180,220,255,'+S2.wet*.5+')';[83,157].forEach(function(ex){c.beginPath();c.ellipse(ex,136,24,6,0,0,6.3);c.fill()})}
  if(S2){[83,157].forEach(function(ex,j){var ey=114;
    if(S2.pDollar>.01)tx(c,'$',ex,ey+2,46*S2.pDollar+4,'rgba(255,211,74,'+S2.pDollar+')');
    if(S2.xEye>.01){c.strokeStyle='rgba(20,20,28,'+S2.xEye+')';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(ex-17,ey-24);c.lineTo(ex+17,ey+24);c.moveTo(ex+17,ey-24);c.lineTo(ex-17,ey+24);c.stroke()}
    if(S2.pSlit>.01){c.fillStyle='rgba(30,10,40,'+S2.pSlit+')';c.beginPath();c.ellipse(ex,ey+6,4.5,24,0,0,6.3);c.fill()}
    if(S2.pSpiral>.01){c.strokeStyle='rgba(88,14,120,'+S2.pSpiral+')';c.lineWidth=3;c.beginPath();for(var q=0;q<60;q++){var an=q*.35+t*.008*(j?-1:1),rr=q*.38;c.lineTo(ex+C(an)*rr*.8,ey+6+S(an)*rr)}c.stroke()}
    if(S2.pCross>.01){c.strokeStyle='rgba(255,225,190,'+S2.pCross+')';c.lineWidth=2.5;c.beginPath();c.arc(ex,ey+6,11,0,6.3);c.moveTo(ex-18,ey+6);c.lineTo(ex+18,ey+6);c.moveTo(ex,ey-12);c.lineTo(ex,ey+24);c.stroke()}
    if(S2.pBolt>.01){c.fillStyle='rgba(229,63,23,'+S2.pBolt+')';c.beginPath();c.moveTo(ex+5,ey-14);c.lineTo(ex-9,ey+8);c.lineTo(ex-1,ey+8);c.lineTo(ex-5,ey+26);c.lineTo(ex+10,ey+2);c.lineTo(ex+2,ey+2);c.closePath();c.fill()}})}
  var cs=rgbs(col,1);
  if(dc.spark>.01){for(i=0;i<PS.length;i++){a=dc.spark*(.35+.65*Math.abs(S(t*.005+i*1.7)));c.fillStyle=rgbs(col,a);sp(c,PS[i][0],PS[i][1],5+5*a)}}
  if(dc.heart>.01){for(i=0;i<5;i++){a=(t*.0006+i*.2)%1;c.fillStyle=rgbs(col,dc.heart*(1-a));ht(c,40+i*40,200-a*150,5+3*(i%2))}}
  if(dc.tear>.01){[70,170].forEach(function(x0,j){a=(t*.0008+j*.4)%1;c.fillStyle='rgba(120,200,255,'+dc.tear*(1-a*.6)+')';c.beginPath();c.ellipse(x0,148+a*60,3.4,5.2,0,0,6.3);c.fill()})}
  if(dc.z>.01){for(i=0;i<3;i++){a=(t*.0005+i*.33)%1;tx(c,'Z',170+a*24,80-a*50,14+i*5,'rgba(190,210,255,'+dc.z*(1-a)+')')}}
  if(dc.sweat>.01){c.fillStyle='rgba(150,215,255,'+dc.sweat+')';c.beginPath();c.ellipse(192,76+(t*.02)%14,4,6,0,0,6.3);c.fill()}
  if(dc.bulb>.01){c.fillStyle=rgbs(col,dc.bulb);c.beginPath();c.arc(120,26,12,0,6.3);c.fill();c.fillRect(114,36,12,7);c.strokeStyle=rgbs(col,dc.bulb);c.lineWidth=2;for(i=0;i<5;i++){a=(-150+i*30)*Math.PI/180;c.beginPath();c.moveTo(120+C(a)*17,26+S(a)*17);c.lineTo(120+C(a)*25,26+S(a)*25);c.stroke()}}
  if(dc.scan>.01){y=dc.scanY||(60+120*(.5+.5*S(t*.004)));c.fillStyle=rgbs(col,.9*dc.scan);c.fillRect(20,y-1.5,200,3);c.fillStyle=rgbs(col,.22*dc.scan);c.fillRect(20,y-12,200,24)}
  if(dc.dots>.01){for(i=0;i<3;i++){c.fillStyle=rgbs(col,dc.dots*(.35+.65*Math.max(0,S(t*.008-i))));c.beginPath();c.arc(100+i*20,196,5,0,6.3);c.fill()}}
  if(dc.bang>.01)tx(c,'!',120,28,34,rgbs(col,dc.bang));
  if(dc.quest>.01)tx(c,'?',176,52,30*(dc.questS||1),rgbs([255,235,120],dc.quest));
  if(dc.quest2>.01)tx(c,'?',64,40,22,rgbs([255,235,120],dc.quest2));
  if(dc.vein>.01){c.strokeStyle=rgbs([255,60,70],dc.vein);c.lineWidth=3;c.lineCap='round';[[-7,-7,-2,-2],[7,-7,2,-2],[-7,7,-2,2],[7,7,2,2]].forEach(function(v){c.beginPath();c.moveTo(178+v[0],56+v[1]);c.lineTo(178+v[2],56+v[3]);c.stroke()})}
  if(dc.steam>.01){for(i=0;i<4;i++){a=(t*.0007+i*.25)%1;c.fillStyle='rgba(240,240,255,'+dc.steam*(1-a)*.8+')';c.beginPath();c.arc(i%2?36:204,150-a*90,7+a*9,0,6.3);c.fill()}}
  if(dc.notes>.01){for(i=0;i<4;i++){a=(t*.0006+i*.25)%1;tx(c,'\u266A',60+i*38,190-a*140,18+(i%2)*6,'rgba(255,230,120,'+dc.notes*(1-a)+')')}}
  if(dc.burst>.01){c.strokeStyle=rgbs(col,dc.burst);c.lineWidth=4;c.lineCap='round';var r0=30+(dc.burstR||0)*80;for(i=0;i<12;i++){a=i*Math.PI/6;c.beginPath();c.moveTo(120+C(a)*r0,118+S(a)*r0);c.lineTo(120+C(a)*(r0+26),118+S(a)*(r0+26));c.stroke()}}
  if(dc.fire>.01){var fh=(dc.fireH||1)*90;for(i=0;i<9;i++){x=30+i*22;y=240-fh*(.5+.5*Math.abs(S(t*.012+i*2)));c.fillStyle='rgba(255,'+(110+i*10)+',30,'+dc.fire*.9+')';c.beginPath();c.moveTo(x-11,240);c.quadraticCurveTo(x,y,x+11,240);c.fill()}}
  if(dc.snow>.01){for(i=0;i<16;i++){a=(t*.0004+i*.37)%1;c.fillStyle='rgba(240,250,255,'+dc.snow*.9+')';c.beginPath();c.arc((i*53)%230+5,a*240,2.2,0,6.3);c.fill()}}
  if(dc.bolt>.01){c.strokeStyle=rgbs([255,240,90],dc.bolt);c.lineWidth=4;c.lineJoin='round';[[30,60],[210,70]].forEach(function(b){c.beginPath();c.moveTo(b[0],b[1]-24);c.lineTo(b[0]-9,b[1]);c.lineTo(b[0]+6,b[1]+2);c.lineTo(b[0]-6,b[1]+28);c.stroke()})}
  if(dc.cloud>.01){c.fillStyle='rgba(150,160,190,'+dc.cloud+')';[[90,26,20],[120,20,24],[152,26,20]].forEach(function(o){c.beginPath();c.arc(o[0],o[1],o[2],0,6.3);c.fill()})}
  if(dc.rain>.01){c.strokeStyle='rgba(120,180,255,'+dc.rain+')';c.lineWidth=2;for(i=0;i<14;i++){a=(t*.0012+i*.23)%1;x=60+i*9;y=40+a*180;c.beginPath();c.moveTo(x,y);c.lineTo(x-3,y+10);c.stroke()}}
  if(dc.moon>.01){c.fillStyle='rgba(255,240,170,'+dc.moon+')';c.beginPath();c.arc(190,48,16,0,6.3);c.fill();c.globalCompositeOperation='destination-out';c.beginPath();c.arc(197,43,14,0,6.3);c.fill();c.globalCompositeOperation='source-over'}
  if(dc.sun>.01){y=lp(40,10,dc.sunP||0);c.fillStyle='rgba(255,210,70,'+dc.sun+')';c.beginPath();c.arc(120,y-10,16,0,6.3);c.fill();c.strokeStyle=c.fillStyle;c.lineWidth=3;for(i=0;i<9;i++){a=-Math.PI+i*Math.PI/8;c.beginPath();c.moveTo(120+C(a)*21,y-10+S(a)*21);c.lineTo(120+C(a)*30,y-10+S(a)*30);c.stroke()}}
  if(dc.brk>.01){var kk=lp(66,38,dc.brkK||0),L=22;c.strokeStyle=rgbs(col,dc.brk);c.lineWidth=4;c.lineCap='round';[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){c.beginPath();c.moveTo(120+q[0]*(kk+L),118+q[1]*kk*1.0);c.lineTo(120+q[0]*kk,118+q[1]*kk);c.lineTo(120+q[0]*kk,118+q[1]*(kk+L));c.stroke()})}
  if(dc.focus>.01){c.strokeStyle=rgbs([110,255,140],dc.focus);c.lineWidth=3;c.beginPath();c.arc(120,118,24,0,6.3);c.stroke()}
  if(dc.warn>.01){c.fillStyle=rgbs([255,60,90],dc.warn);c.beginPath();c.moveTo(120,24);c.lineTo(146,68);c.lineTo(94,68);c.closePath();c.fill();tx(c,'!',120,53,20,'rgba(255,255,255,'+dc.warn+')')}
  if(dc.glitchL>.01){for(i=0;i<7;i++){c.fillStyle='rgba('+(Math.random()<.5?'0,255,255':'255,0,90')+','+dc.glitchL*.7+')';c.fillRect(Math.random()*120,40+Math.random()*160,60+Math.random()*100,3)}}
  if(dc.sonar>.01){c.strokeStyle='rgba(40,222,240,'+dc.sonar+')';c.lineWidth=2.5;for(i=0;i<3;i++){a=(t*.0007+i*.33)%1;c.globalAlpha=1-a;c.beginPath();c.arc(120,118,10+a*(dc.sonarM||110),0,6.3);c.stroke()}c.globalAlpha=1}
  if(dc.blip>.01){c.fillStyle=rgbs([255,80,90],dc.blip);c.beginPath();c.arc(176,64,6+3*Math.abs(S(t*.01)),0,6.3);c.fill()}
  if(dc.orbit>.01){for(i=0;i<3;i++){a=t*.006+i*2.09;c.fillStyle=rgbs([255,230,90],dc.orbit);sp(c,120+C(a)*86,40+S(a)*14,6)}}
  if(dc.confetti>.01){var CC=['#ff4ec4','#ffd60a','#00d0ff','#7cff4d','#ff3b30'];for(i=0;i<24;i++){a=(t*.0005+i*.173)%1;c.fillStyle=CC[i%5];c.globalAlpha=dc.confetti;c.fillRect((i*37)%230+4+8*S(t*.004+i),a*250-10,5,8);}c.globalAlpha=1}
  if(dc.code>.01){c.font='700 12px monospace';c.textAlign='center';for(i=0;i<14;i++){a=(t*.0006+i*.31)%1;c.fillStyle='rgba(70,255,140,'+dc.code*(1-a)+')';c.fillText(((t/90+i*7|0)%2)?'1':'0',14+i*15,a*250)}}
  if(dc.bt>.01){c.strokeStyle=rgbs(dc.btDim?[170,170,200]:[90,150,255],dc.bt);c.lineWidth=5;c.lineJoin='round';c.lineCap='round';c.beginPath();c.moveTo(104,98);c.lineTo(136,130);c.lineTo(120,146);c.lineTo(120,90);c.lineTo(136,106);c.lineTo(104,138);c.stroke();if(dc.btSlash>.01){c.strokeStyle='rgba(255,70,90,'+dc.btSlash+')';c.beginPath();c.moveTo(90,86);c.lineTo(150,150);c.stroke()}}
  if(dc.btWaves>.01){c.strokeStyle='rgba(90,150,255,'+dc.btWaves+')';c.lineWidth=3;for(i=0;i<2;i++){a=(t*.0009+i*.5)%1;c.globalAlpha=1-a;c.beginPath();c.arc(120,118,40+a*60,-.6,.6);c.stroke()}c.globalAlpha=1}
  if(dc.flash>.01){c.fillStyle='rgba(255,255,255,'+dc.flash+')';c.fillRect(0,0,240,240)}
}
var pd=E.prototype.draw;E.prototype.draw=function(S2){var r=pd.apply(this,arguments);try{overlay(this,S2)}catch(x){}return r};
})();
