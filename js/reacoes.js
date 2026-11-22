/* Reações do firmware v14 (tabela RXT, ids 17..129) rodando na pré-visualização. Geradas do .ino. */
(function(){'use strict';var E=window.KarluEyes;if(!E||!E.R)return;var R=E.R;
var RX={"17":{"d":3400.0,"gm":"SCAN","ga":12.0,"gf":0.0042,"m1":["TURN",0.5,0.0042]},"18":{"d":2000.0,"gm":"CIRCLE","ga":12.0,"gf":0.0065,"cT":0.12},"19":{"d":2800.0,"gx":0.0,"gy":0.0,"m1":["TILT",10.0,0.0],"ps":1.15,"sc":1.05,"cT":0.0},"20":{"d":2800.0,"gx":5.0,"gy":8.0,"cT":0.14,"py":2.0,"m1":["TILT",7.0,0.0],"m2":["SWAY",2.0,0.005],"tn":[255.0,120.0,150.0,0.3]},"21":{"d":3000.0,"gx":7.0,"gy":9.0,"sq":0.15,"sc":0.94,"m1":["SWAY",3.0,0.003]},"22":{"d":3400.0,"gx":0.0,"gy":8.0,"cT":0.2,"lid":13.0,"rot":-6.0,"ps":1.25,"py":2.0,"m1":["TREMBLE",1.1,0.045],"m2":["SINK",3.0,0.0],"tn":[120.0,170.0,255.0,0.25]},"23":{"d":2600.0,"gx":0.0,"gy":6.0,"cT":0.15,"lid":12.0,"sq":0.2,"m1":["BOUNCE",2.6,0.0125]},"24":{"d":3400.0,"gx":0.0,"gy":5.0,"sq":0.55,"m1":["SINK",4.0,0.0],"m2":["TILT",5.0,0.0]},"25":{"d":1300.0,"sq":0.95},"26":{"d":2600.0,"gx":10.0,"gy":-1.0,"cT":0.33,"cB":0.2,"lid":-8.0,"m1":["TILT",5.0,0.0]},"27":{"d":2600.0,"band":1,"cT":0.5,"lid":-26.0,"rot":0.0,"pa":0.0,"m1":["TREMBLE",0.9,0.05],"tn":[255.0,70.0,70.0,0.25]},"28":{"d":3000.0,"gx":7.0,"gy":9.0,"cT":0.3,"lid":14.0,"rot":-6.0,"m1":["SINK",3.0,0.0]},"29":{"d":3200.0,"gm":"SCAN","ga":6.0,"gf":0.0022,"cT":0.35,"lid":0.0,"sq":0.2},"30":{"d":2200.0,"gx":0.0,"gy":0.0,"ps":0.62,"sc":1.1,"cT":0.0,"lid":0.0,"m1":["TREMBLE",1.8,0.06]},"31":{"d":2600.0,"gx":0.0,"gy":2.0,"ps":0.7,"cT":0.0,"m1":["AWAY",0.3,0.0],"m2":["TREMBLE",1.2,0.07]},"32":{"d":3200.0,"gx":0.0,"gy":0.0,"m1":["AWAY",0.55,0.0]},"33":{"d":3000.0,"gx":0.0,"gy":0.0,"m1":["CLOSE",0.35,0.0]},"34":{"d":3000.0,"gm":"SCAN","ga":8.0,"gf":0.003,"m1":["TURN",0.95,0.003]},"35":{"d":2400.0,"gx":10.0,"gy":0.0,"m1":["TILT",6.0,0.0]},"36":{"d":2600.0,"gx":0.0,"gy":-10.0,"cT":0.0,"lid":0.0},"37":{"d":2800.0,"gx":0.0,"gy":10.0,"cT":0.25,"lid":12.0,"m1":["SINK",3.0,0.0]},"38":{"d":2600.0,"sc":1.14,"ps":1.35,"py":-2.0,"cT":0.0,"lid":0.0,"m1":["BOUNCE",2.0,0.008],"m2":["PUPIL",0.15,0.012]},"39":{"d":2000.0,"wink":2.0,"cT":0.0,"m1":["TILT",5.0,0.0]},"40":{"d":3400.0,"sq":0.48,"cT":0.1,"lid":8.0},"41":{"d":3000.0,"arc":1,"bend":-9.0,"cT":0.0,"m1":["NOD",3.2,0.0036]},"42":{"d":3400.0,"arc":1,"bend":9.0,"m1":["TILT",6.0,0.0],"m2":["SINK",3.0,0.0]},"43":{"d":3200.0,"gm":"SPIRAL","ga":11.0,"gf":0.012,"sq":0.15,"m1":["WOBBLE",8.0,0.008]},"44":{"d":2800.0,"gm":"CIRCLE","ga":7.0,"gf":0.0032,"ps":0.7,"sc":1.05,"cT":0.0},"45":{"d":3000.0,"ps":1.4,"sc":1.1,"cT":0.0,"lid":0.0,"py":-1.0,"m1":["HEART",0.1,0.0013],"tn":[255.0,90.0,170.0,0.45]},"46":{"d":3400.0,"gx":0.0,"gy":8.0,"cT":0.3,"sq":0.3,"m1":["NOD",4.0,0.0028]},"47":{"d":2800.0,"gm":"DART","ga":4.0,"gf":0.0,"cT":0.12,"lid":-10.0,"m1":["TILT",12.0,0.0]},"48":{"d":1500.0,"gx":0.0,"gy":-2.0,"ps":0.8,"sc":1.08,"cT":0.0,"lid":0.0,"m1":["POP",0.07,320.0]},"49":{"d":1800.0,"sc":1.18,"ps":0.55,"cT":0.0,"lid":0.0,"m1":["POP",0.12,260.0],"m2":["TREMBLE",1.2,0.07]},"50":{"d":2800.0,"sq":0.1,"m1":["TREMBLE",1.6,0.09],"tn":[150.0,190.0,255.0,0.35]},"51":{"d":2800.0,"gm":"DART","ga":9.0,"gf":0.0,"ps":0.8,"cT":0.0,"m1":["TREMBLE",0.7,0.05]},"52":{"d":3400.0,"gx":8.0,"gy":-6.0,"cT":0.15,"m1":["TILT",6.0,0.0]},"53":{"d":2800.0,"cT":0.0,"lid":0.0,"sc":1.04,"wink":1.0,"m1":["TILT",8.0,0.0],"m2":["BOUNCE",3.0,0.01]},"54":{"d":2600.0,"cT":0.0,"lid":0.0,"sc":1.1,"ps":1.2,"m1":["BOUNCE",5.0,0.013]},"55":{"d":2600.0,"gx":0.0,"gy":-4.0,"cT":0.0,"cB":0.12,"lid":0.0,"m1":["SINK",-3.0,0.0]},"56":{"d":2600.0,"gx":6.0,"gy":-3.0,"cT":0.35,"cB":0.0,"lid":0.0,"m1":["SINK",-2.0,0.0]},"57":{"d":1500.0,"m1":["FLUTTER",1.0,0.022]},"58":{"d":2800.0,"sc":1.08,"ps":1.1,"cT":0.0,"m1":["PUPIL",0.3,0.009]},"59":{"d":2600.0,"cv":2.2,"py":4.0,"m1":["WOBBLE",2.5,0.007]},"60":{"d":1800.0,"gx":0.0,"gy":0.0,"m1":["SNEEZE",9.0,0.0]},"61":{"d":3000.0,"gx":0.0,"gy":-2.0,"sc":1.15,"ps":1.35,"cT":0.2,"lid":14.0,"m1":["TILT",8.0,0.0]},"62":{"d":3200.0,"gx":-4.0,"gy":9.0,"cT":0.25,"lid":14.0,"rot":-10.0,"sc":0.94,"m1":["SINK",5.0,0.0]},"63":{"d":3200.0,"gm":"SCAN","ga":13.0,"gf":0.0072,"m1":["TURN",0.6,0.0072],"cT":0.0},"64":{"d":2200.0,"arc":1,"bend":-9.0,"cT":0.0,"m1":["NOD",2.2,0.022]},"65":{"d":3200.0,"m1":["NODOFF",10.0,0.0]},"66":{"d":1500.0,"m1":["GLITCH",9.0,0.0]},"67":{"d":3400.0,"gx":0.0,"gy":0.0,"m1":["FLIP",180.0,0.0]},"68":{"d":3400.0,"arc":1,"bend":-9.0,"cT":0.0,"m1":["NOD",4.0,0.0042]},"69":{"d":2600.0,"cT":0.0,"m1":["DROP",16.0,0.009]},"70":{"d":2600.0,"ps":0.8,"m1":["FALL",0.0,0.0]},"71":{"d":2600.0,"band":1,"cT":0.46,"lid":-22.0,"rot":0.0,"pa":0.0,"m1":["TREMBLE",2.0,0.06],"m2":["SHAKE",3.0,0.05],"tn":[255.0,40.0,40.0,0.4]},"72":{"d":2400.0,"sq":0.85,"cT":0.0,"lid":0.0,"m1":["SINK",3.0,0.0]},"73":{"d":2800.0,"gx":-8.0,"gy":-6.0,"cT":0.2,"m1":["TILT",-8.0,0.0]},"74":{"d":3000.0,"cT":0.4,"cB":0.15,"ps":0.85,"gx":0.0,"gy":0.0},"75":{"d":3200.0,"gx":0.0,"gy":0.0,"ps":0.9,"sc":1.04,"cT":0.0,"lid":0.0,"m1":["CLOSE",0.12,0.0]},"76":{"d":3000.0,"arc":1,"bend":-8.0,"m1":["NOD",3.6,0.0034]},"77":{"d":1800.0,"ps":0.5,"sc":1.15,"cT":0.0,"lid":0.0,"m1":["POP",0.22,380.0]},"78":{"d":3200.0,"gm":"CIRCLE","ga":6.0,"gf":0.003,"m1":["SWAY",9.0,0.0022],"sq":0.3},"79":{"d":3000.0,"gx":0.0,"gy":-1.0,"sh":3.0,"pt":[255.0,225.0,90.0,1.0],"sc":1.08,"ps":1.25,"cT":0.0,"lid":0.0,"m1":["PUPIL",0.12,0.008],"m2":["TILT",4.0,0.0]},"80":{"d":3000.0,"gx":0.0,"gy":0.0,"sh":2.0,"pt":[255.0,60.0,110.0,1.0],"tn":[255.0,120.0,190.0,0.35],"sc":1.06,"ps":1.2,"cT":0.0,"lid":0.0,"m1":["HEART",0.07,0.0013]},"81":{"d":2600.0,"gx":0.0,"gy":-9.0,"ps":0.9,"sc":1.1,"cT":0.0,"lid":0.0,"tn":[255.0,240.0,120.0,0.2],"m1":["POP",0.07,320.0]},"82":{"d":3200.0,"gm":"VSCAN","ga":13.0,"gf":0.004,"cT":0.08,"tn":[60.0,230.0,255.0,0.22]},"83":{"d":3000.0,"band":1,"cT":0.42,"lid":-20.0,"rot":0.0,"ps":0.8,"tn":[170.0,60.0,255.0,0.22],"m1":["CLOSE",0.1,0.0],"m2":["TREMBLE",0.5,0.04]},"84":{"d":2800.0,"cv":2.3,"py":5.0,"sq":0.12,"tn":[150.0,215.0,255.0,0.3],"m1":["TREMBLE",1.4,0.07]},"85":{"d":3200.0,"gx":0.0,"gy":5.0,"tn":[255.0,100.0,55.0,0.35],"sq":0.32,"py":3.0,"m1":["SINK",3.0,0.0],"m2":["TILT",5.0,0.0]},"86":{"d":3200.0,"gm":"SPIRAL","ga":5.0,"gf":0.006,"tn":[120.0,220.0,100.0,0.32],"sq":0.22,"cT":0.12,"m1":["TILT",8.0,0.0],"m2":["SINK",3.0,0.0]},"87":{"d":2400.0,"wink":1.0,"cT":0.0,"lid":0.0,"tn":[255.0,120.0,190.0,0.22],"m1":["TILT",6.0,0.0]},"88":{"d":2800.0,"gx":0.0,"gy":0.0,"cT":0.0,"m1":["HIC",8.0,0.0014]},"89":{"d":2800.0,"boot":1},"90":{"d":3200.0,"gx":9.0,"gy":0.0,"m1":["PEEK",40.0,0.0]},"91":{"d":3000.0,"cT":0.34,"lid":-12.0,"sc":1.05,"tn":[80.0,150.0,255.0,0.28],"m1":["CLOSE",0.12,0.0],"m2":["WOBBLE",2.0,0.004]},"92":{"d":3000.0,"gx":3.0,"gy":-6.0,"sc":1.2,"ps":1.55,"py":-2.0,"cT":0.0,"lid":0.0,"m1":["PUPIL",0.12,0.01]},"93":{"d":3000.0,"sh":1.0,"tn":[190.0,255.0,60.0,0.95],"pt":[15.0,25.0,5.0,1.0],"cT":0.2,"lid":-10.0,"gm":"SCAN","ga":6.0,"gf":0.003,"m1":["TILT",4.0,0.0]},"94":{"d":3600.0,"arc":1,"bend":9.0,"cT":0.0,"m1":["SINK",4.0,0.0],"m2":["TILT",4.0,0.0]},"95":{"d":3000.0,"arc":1,"bend":-9.0,"m1":["WOBBLE",4.0,0.012],"m2":["NOD",3.0,0.012]},"96":{"d":3200.0,"rb":0.35,"sc":1.04,"m1":["BOUNCE",5.0,0.012],"m2":["WOBBLE",5.0,0.006]},"97":{"d":3000.0,"gx":0.0,"gy":0.0,"sh":4.0,"tn":[150.0,255.0,170.0,0.92],"pt":[30.0,160.0,70.0,1.0],"sc":1.1,"ps":1.2,"cT":0.0,"lid":0.0,"m1":["BOUNCE",2.0,0.008]},"98":{"d":3200.0,"sh":5.0,"m1":["TILT",10.0,0.0],"m2":["SINK",6.0,0.0]},"99":{"d":3200.0,"gx":0.0,"gy":1.0,"band":1,"cT":0.46,"lid":-24.0,"rot":0.0,"pa":0.0,"m1":["TREMBLE",1.0,0.05],"cu":1.0},"100":{"d":2800.0,"gx":4.0,"gy":-9.0,"cT":0.0,"lid":0.0,"ps":0.95,"m1":["TILT",11.0,0.0],"cu":2.0},"101":{"d":3600.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":3.0},"102":{"d":3600.0,"gx":0.0,"gy":-2.0,"sc":1.06,"ps":1.3,"cT":0.0,"lid":0.0,"m1":["PUPIL",0.1,0.01],"cu":4.0},"103":{"d":3400.0,"gx":0.0,"gy":0.0,"cT":0.24,"lid":-14.0,"m1":["CLOSE",0.08,0.0],"m2":["TILT",4.0,0.0],"cu":5.0},"104":{"d":2400.0,"gx":0.0,"gy":-1.0,"cT":0.0,"lid":0.0,"cu":6.0},"105":{"d":3600.0,"gx":0.0,"gy":2.0,"cT":0.0,"lid":0.0,"cu":7.0},"106":{"d":3600.0,"gx":0.0,"gy":0.0,"ps":0.9,"cu":8.0},"107":{"d":3000.0,"gx":0.0,"gy":0.0,"sc":1.04,"cT":0.0,"lid":0.0,"cu":9.0},"108":{"d":3800.0,"gx":0.0,"gy":8.0,"cT":0.22,"lid":12.0,"m1":["SINK",3.0,0.0],"cu":10.0},"109":{"d":4200.0,"gx":0.0,"gy":3.0,"m1":["SINK",4.0,0.0],"m2":["TILT",4.0,0.0],"cu":11.0},"110":{"d":4200.0,"gx":0.0,"gy":0.0,"m1":["TILT",3.0,0.0],"cu":12.0},"111":{"d":3600.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":13.0},"112":{"d":3600.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":14.0},"113":{"d":4200.0,"gx":0.0,"gy":0.0,"cT":0.1,"cu":15.0},"114":{"d":3400.0,"gx":0.0,"gy":0.0,"cu":16.0},"115":{"d":3000.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"sc":1.04,"cu":17.0},"116":{"d":4000.0,"gx":0.0,"gy":0.0,"cT":0.08,"ps":0.9,"cu":18.0},"117":{"d":3600.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"sc":1.06,"cu":19.0},"118":{"d":3200.0,"gx":0.0,"gy":0.0,"cu":20.0},"119":{"d":2400.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":21.0},"120":{"d":3600.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":22.0},"121":{"d":3600.0,"gx":0.0,"gy":-2.0,"sc":1.08,"cT":0.0,"lid":0.0,"cu":23.0},"122":{"d":3400.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"cu":24.0},"123":{"d":3600.0,"gx":0.0,"gy":0.0,"cu":25.0},"124":{"d":3800.0,"gx":0.0,"gy":0.0,"cu":26.0},"125":{"d":4000.0,"gx":0.0,"gy":0.0,"cu":27.0},"126":{"d":3000.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"rot":11.0,"chv":0.55,"m1":["NOD",1.6,0.004]},"127":{"d":3200.0,"gx":0.0,"gy":-1.0,"cT":0.0,"lid":0.0,"rot":9.0,"chv":0.85,"m1":["BOUNCE",3.0,0.01]},"128":{"d":3000.0,"gx":0.0,"gy":0.0,"cT":0.0,"lid":0.0,"rot":12.0,"chv":0.4,"hlv":1.0,"sc":1.06,"ps":1.3,"m1":["PUPIL",0.12,0.009]},"129":{"d":7600.0,"gx":0.0,"gy":0.0,"cu":28.0}};

var cl=function(v,a,b){return v<a?a:v>b?b:v},lp=function(a,b,k){return a+(b-a)*k};
function ease(x){x=cl(x,0,1);return x*x*(3-2*x)}
function hsv(h){h=((h%360)+360)%360;var x=h/60,i=Math.floor(x),f=x-i,q=1-f,r,g,b;switch(i){case 0:r=1;g=f;b=0;break;case 1:r=q;g=1;b=0;break;case 2:r=0;g=1;b=f;break;case 3:r=0;g=q;b=1;break;case 4:r=f;g=0;b=1;break;default:r=1;g=0;b=q}return[r*255,g*255,b*255]}
function tint(T,r,g,b,k){k=cl(k,0,1);T.er=lp(T.er,r,k);T.eg=lp(T.eg,g,k);T.eb=lp(T.eb,b,k);T.er2=lp(T.er2,r,k);T.eg2=lp(T.eg2,g,k);T.eb2=lp(T.eb2,b,k);T.gbr=lp(T.gbr||0,r,k);T.gbg=lp(T.gbg||0,g,k);T.gbb=lp(T.gbb||0,b,k)}
var gl={n:0,x:0,y:0,r:0,g:0,b:0,t:false,dn:0,dX:0,dY:0};
function motion(m,a,f,t,d,e,sd,T,O){
  var p=cl(t/d,0,1),bump=Math.min(ease(t/(.33*d)),ease((d-t)/(.33*d))),q,u,y,now=performance.now();
  switch(m){
    case'SHAKE':O.dx+=a*e*Math.sin(t*f);O.rot+=.5*a*e*Math.sin(t*f+.5);break;
    case'NOD':O.dy+=a*e*Math.sin(t*f);break;
    case'TILT':O.rot+=a*sd*e;O.dx+=.3*a*sd*e;break;
    case'WOBBLE':O.rot+=a*e*Math.sin(t*f);break;
    case'BOUNCE':O.dy-=a*e*Math.abs(Math.sin(t*f));break;
    case'ZOOMP':O.zoom*=1+a*e*Math.sin(t*f);break;
    case'AWAY':O.zoom*=1-a*bump;O.dy-=8*bump;break;
    case'CLOSE':O.zoom*=1+a*bump;O.dy+=4*bump;break;
    case'TURN':y=a*e*Math.sin(t*f);T.gap*=Math.max(Math.cos(y),.3);T.rx*=.7+.3*Math.cos(y);O.dx+=Math.sin(y)*22;break;
    case'FLIP':O.rot+=a*sd*Math.min(ease(p/.25),ease((1-p)/.25));break;
    case'DROP':O.dy-=a*Math.exp(-t*.0011)*Math.abs(Math.sin(t*f));break;
    case'TREMBLE':O.dx+=a*e*(Math.sin(t*f)+.6*Math.sin(t*f*2.3+1));O.dy+=a*e*.7*Math.sin(t*f*1.7+2);O.rot+=a*.6*e*Math.sin(t*f*1.3);break;
    case'SWAY':O.dx+=a*e*Math.sin(t*f);O.rot+=.8*a*e*Math.sin(t*f);O.dy-=2*e*Math.abs(Math.sin(t*f));break;
    case'HEART':q=(t*f)%1;O.zoom*=1+a*e*(Math.exp(-q*9)+.5*Math.exp(-Math.abs(q-.28)*22));break;
    case'FLUTTER':q=Math.max(Math.sin(t*f),0);T.squint=Math.max(T.squint||0,.95*q*q*q*e);break;
    case'PUPIL':T.ps*=1+a*e*Math.sin(t*f);break;
    case'SNEEZE':
      if(p<.55){q=ease(p/.55);O.dy-=.55*a*q;O.zoom*=1+.03*q;T.squint=Math.max(T.squint||0,.25*q)}
      else if(p<.68){q=ease((p-.55)/.13);O.dy+=lp(-.55*a,.8*a,q);T.squint=lp(.25,1,q)}
      else{q=(p-.68)/.32;O.dy+=.8*a*(1-ease(q));T.squint=Math.max(T.squint||0,1-ease(cl(q*1.6,0,1)))}break;
    case'NODOFF':
      if(p<.62){q=ease(p/.62);O.dy+=a*q;O.rot+=3*sd*q;T.squint=Math.max(T.squint||0,.55*q)}
      else if(p<.72){q=ease((p-.62)/.1);O.dy+=lp(a,-4,q);T.squint=lp(.55,0,q);O.zoom*=1+.05*q}
      else{q=(p-.72)/.28;O.dy+=-4*(1-ease(q));O.zoom*=1+.05*(1-ease(q))}break;
    case'GLITCH':
      if(now>=gl.n){gl.x=Math.random()<.33?0:(Math.random()*2-1)*a;gl.y=Math.random()<.33?0:(Math.random()*2-1)*a*.4;gl.r=Math.random()*255;gl.g=Math.random()*255;gl.b=Math.random()*255;gl.t=Math.random()<.5;gl.n=now+50+Math.random()*90}
      O.dx+=gl.x*e;O.dy+=gl.y*e;if(gl.t)tint(T,gl.r,gl.g,gl.b,.7*e);break;
    case'FALL':if(p<.35){q=p/.35;O.dy+=340*q*q}else if(p<.55)O.dy+=340;else{q=(p-.55)/.45;O.dy+=-260*(1-ease(q))}break;
    case'POP':u=ease(1-t/f);O.zoom*=1+a*u;O.dy-=a*60*u;break;
    case'SINK':O.dy+=a*e;O.rot-=.8*(a>0?1:-1)*e;break;
    case'HIC':q=(t*f)%1;u=Math.exp(-q*9);O.dy-=a*e*u;O.zoom*=1+.012*a*e*u;T.ps*=1-.18*e*u;break;
    case'PEEK':q=p<.42?ease(p/.2):1-.7*ease((p-.42)/.18);O.dy+=a*q;O.zoom*=1-.06*q;T.squint=Math.max(T.squint||0,.5*q*(p<.42?1:.4));if(p>=.42)O.rot-=5*sd*ease((p-.42)/.1);break;
  }
}
function apply(r,t,d,e,sd,T,O,H,I){
  var KS=1,p=t/d,k,i;
  if(r.cT!=null)T.cutTop=lp(H.cutTop,r.cT,e);
  if(r.cB!=null)T.cutBot=lp(H.cutBot,r.cB,e);
  if(r.lid!=null)T.lid=lp(H.lid,r.lid,e);
  if(r.rot!=null)T.rot=lp(H.rot,r.rot,e);
  T.squint=(r.sq||0)*e;T.ps=H.ps*lp(1,r.ps==null?1:r.ps,e);
  var sc=lp(1,r.sc==null?1:r.sc,e);T.rx=H.rx*sc;T.ry=H.ry*sc;
  T.conv=lp(H.conv,r.cv==null?1:r.cv,e);T.pa=H.pa*lp(1,r.pa==null?1:r.pa,e);
  T.py+=(r.py||0)*e;
  if(r.band){T.band=110;T.bOy=12;T.bRx=28;T.bRy=12}
  if(r.arc){T.arc=1;T.bend=r.bend;T._tau=160}
  if(r.wink){T._tau=60;if(r.wink==1){if(p>.25&&p<.6){if(sd>0)T.winkR=1;else T.winkL=1}}else{if(p>.15&&p<.4)T.winkL=1;if(p>.55&&p<.8)T.winkR=1}}
  if(r.tn&&r.tn[3]>0)tint(T,r.tn[0],r.tn[1],r.tn[2],r.tn[3]*e);
  if(r.chv>0)T.cheek=r.chv*e;if(r.hlv>0)T.hl=r.hlv*e;
  if(r.pt&&r.pt[3]>0){k=r.pt[3]*e;T.pr=lp(T.pr,r.pt[0],k);T.pg=lp(T.pg,r.pt[1],k);T.pb=lp(T.pb,r.pt[2],k);T.pr2=lp(T.pr2,r.pt[0],k);T.pg2=lp(T.pg2,r.pt[1],k);T.pb2=lp(T.pb2,r.pt[2],k)}
  T.pSlit=r.sh==1?e:0;T.pHeart=r.sh==2?e:0;T.pStar=r.sh==3?e:0;T.pDollar=r.sh==4?e:0;T.xEye=r.sh==5?e:0;
  if(r.rb>0){
    var c1=hsv(t*r.rb),c2=hsv(t*r.rb+150),c3=hsv(t*r.rb+180),c4=hsv(t*r.rb+330);T.gA=lp(T.gA,0,e);
    T.er=lp(T.er,c1[0],e);T.eg=lp(T.eg,c1[1],e);T.eb=lp(T.eb,c1[2],e);T.er2=lp(T.er2,c2[0],e);T.eg2=lp(T.eg2,c2[1],e);T.eb2=lp(T.eb2,c2[2],e);
    T.pr=lp(T.pr,lp(c3[0],255,.35),e);T.pg=lp(T.pg,lp(c3[1],255,.35),e);T.pb=lp(T.pb,lp(c3[2],255,.35),e);
    T.pr2=lp(T.pr2,lp(c4[0],255,.35),e);T.pg2=lp(T.pg2,lp(c4[1],255,.35),e);T.pb2=lp(T.pb2,lp(c4[2],255,.35),e);T._tau=70}
  if(r.boot){T._tau=70;
    if(p<.25)T.squint=.95*ease(p/.12);
    else if(p<.7){T.squint=0;T.pa=0;tint(T,210,235,255,.75)}
    else{var q=ease((p-.7)/.15);T.squint=0;T.pa=H.pa*q;tint(T,210,235,255,.75*(1-q))}}
  var A=r.ga||0,F=r.gf||0;
  switch(r.gm){
    case'G_TARGET':I.goX=(r.gx||0)*e;I.goY=(r.gy||0)*e;break;
    case'G_CIRCLE':I.goX=A*Math.cos(t*F)*e;I.goY=.8*A*Math.sin(t*F)*e;break;
    case'G_SCAN':I.goX=A*Math.sin(t*F)*e;break;
    case'G_VSCAN':I.goY=A*Math.sin(t*F)*e;break;
    case'G_SPIRAL':var s=A*Math.exp(-t*.0009);I.goX=s*Math.cos(t*F);I.goY=.8*s*Math.sin(t*F);break;
    case'G_DART':if(performance.now()>=gl.dn){gl.dX=(Math.random()*2-1)*A;gl.dY=(Math.random()*2-1)*A*.7;gl.dn=performance.now()+160+Math.random()*260}I.goX=gl.dX*e;I.goY=gl.dY*e;break;
    default:if(r.gx||r.gy){I.goX=(r.gx||0)*e;I.goY=(r.gy||0)*e}}
  if(r.m1)motion(r.m1[0],r.m1[1],r.m1[2],t,d,e,sd,T,O);
  if(r.m2)motion(r.m2[0],r.m2[1],r.m2[2],t,d,e,sd,T,O);
}
Object.keys(RX).forEach(function(id){var r=RX[id];R['rx'+id]={d:r.d,f:function(t,d,e,sd,T,O,H,I){apply(r,t,d,e,sd,T,O,H,I)},exact:!r.cu};});
E.rxMotion=motion;E.rxTint=tint;E.RXIDS=Object.keys(RX).map(Number);
})();
