/* Starlyn Infinite - motor de olhos do Karlu
 * PORTE DO FIRMWARE STARBOY v13 (starboy_v13_ble.ino) para canvas 2D.
 * O que vem do v13 (identico ao display real):
 *   - olho CHEIO (oval completo, padrao ~40% do tempo) e olho em CUPULA (base reta inclinada, ~48% do tempo), humores atento/largo/triste raros
 *   - pupila redonda grande (embaixo/dentro) e pupila que "respira"
 *   - piscada nova: a palpebra desce ate a base, olho vira um arco fino; 3 tipos (rapida/normal/sonolenta) e piscada dupla
 *   - virada de cabeca em falso 3D (olho de perto cresce, o de longe encolhe)
 *   - 77 rostos (cores, heterocromia, degrades, Polly, Starboy Original), troca de rosto fechando e abrindo o olho
 *   - reacoes: sorrisao, sorriso de canto, pensando, bocejo, risada, triste, susto, cambalhota, nao, sim, curioso, piscadinha,
 *     vesgo, resmungando, sono, apaixonado (coracao), olhos de estrela, fofura, olhar em volta, desconfiado, tonto
 * Uso: new KarluEyes(canvas, { face: 0..76, reacts: ['happy','wink'], dpr: 2 })
 */
(function () {
  'use strict';
  var KS = 1.28, D2R = Math.PI / 180, LOOK_X = 12, LOOK_Y = 14, HEAD_TURN = 1;
  var BLINK_MIN = 2300, BLINK_MAX = 4300, MOOD_MIN = 5000, MOOD_MAX = 14000;

  // cor olho esq, pupila esq, olho dir, pupila dir (R,G,B) - lista FACES do firmware v13 (77 rostos)
  var FACES = [
    [255,66,196,250,220,184,255,66,196,250,220,184],
    [46,92,255,170,235,255,46,92,255,170,235,255],
    [60,255,120,255,250,150,60,255,120,255,250,150],
    [160,80,255,255,170,230,160,80,255,255,170,230],
    [255,140,40,255,235,120,255,140,40,255,235,120],
    [255,45,60,255,225,225,255,45,60,255,225,225],
    [30,230,240,20,40,150,30,230,240,20,40,150],
    [255,226,72,255,120,40,255,226,72,255,120,40],
    [235,240,255,70,110,255,235,240,255,70,110,255],
    [190,255,60,30,140,70,190,255,60,30,140,70],
    [40,220,170,255,150,200,40,220,170,255,150,200],
    [220,60,255,120,240,255,220,60,255,120,240,255],
    [255,110,100,255,225,190,255,110,100,255,225,190],
    [140,200,255,150,80,255,140,200,255,150,80,255],
    [255,190,40,230,50,50,255,190,40,230,50,50],
    [30,170,90,190,255,215,30,170,90,190,255,215],
    [255,66,196,250,220,184,46,92,255,170,235,255],
    [60,255,120,255,250,150,160,80,255,255,170,230],
    [255,140,40,40,70,200,30,230,240,255,120,40],
    [255,226,72,230,60,40,255,45,60,255,235,120],
    [255,66,196,120,240,255,30,230,240,255,150,210],
    [46,92,255,255,235,120,255,140,40,170,235,255],
    [60,255,120,255,120,190,255,66,196,190,255,200],
    [160,80,255,255,230,90,255,226,72,160,80,255],
    [255,170,205,150,30,85,255,170,205,150,30,85],
    [100,50,215,255,240,150,100,50,215,255,240,150],
    [150,215,255,255,255,255,255,120,40,255,230,100],
    [0,255,100,0,45,15,0,255,100,0,45,15],
    [255,50,170,130,225,255,255,50,170,130,225,255],
    [255,245,220,225,165,35,255,245,220,225,165,35],
    [0,115,225,130,255,235,0,115,225,130,255,235],
    [255,115,70,145,40,165,255,115,70,145,40,165],
    [150,255,210,255,140,170,150,255,210,255,140,170],
    [225,30,30,255,220,60,225,30,30,255,220,60],
    [175,255,60,255,40,200,175,255,60,255,40,200],
    [255,170,205,150,30,85,0,115,225,130,255,235],
    [205,15,45,28,0,8,205,15,45,28,0,8],
    [70,120,255,255,80,200,70,120,255,255,80,200],
    [215,115,60,70,215,200,215,115,60,70,215,200],
    [195,165,255,255,240,160,195,165,255,255,240,160],
    [20,200,115,255,205,70,20,200,115,255,205,70],
    [35,65,205,225,230,255,35,65,205,225,230,255],
    [225,25,90,255,200,220,225,25,90,255,200,220],
    [150,55,220,232,205,255,150,55,220,232,205,255],
    [255,178,60,110,55,20,255,178,60,110,55,20],
    [200,245,255,10,90,115,200,245,255,10,90,115],
    [255,185,155,230,80,90,255,185,155,230,80,90],
    [240,255,80,110,40,200,240,255,80,110,40,200],
    [205,212,228,30,40,110,205,212,228,30,40,110],
    [232,40,115,160,255,215,232,40,115,160,255,215],
    [80,255,205,170,85,250,80,255,205,170,85,250],
    [245,246,255,30,28,70,245,246,255,30,28,70],
    [205,212,228,30,40,110,255,195,50,230,90,20],
    [255,66,196,250,220,184,185,255,50,30,145,75],
    [30,230,240,20,40,150,230,50,200,255,215,250],
    [235,40,60,255,220,220,50,100,255,160,235,255],
    [155,80,255,255,160,225,35,215,165,255,140,190],
    [255,195,60,150,60,10,205,212,228,55,70,120],
    [20,200,115,255,210,70,255,120,180,120,20,70],
    [75,40,150,255,240,170,255,215,115,120,35,20],
    [255,200,60,110,20,100,255,200,60,110,20,100],
    [110,235,255,10,25,100,110,235,255,10,25,100],
    [110,255,190,20,20,90,110,255,190,20,20,90],
    [255,170,215,255,255,255,255,170,215,255,255,255],
    [255,235,70,120,10,10,255,235,70,120,10,10],
    [200,255,110,255,240,140,200,255,110,255,240,140],
    [195,100,255,255,240,150,195,100,255,255,240,150],
    [255,95,95,25,0,5,255,95,95,25,0,5],
    [255,255,255,110,150,255,255,255,255,110,150,255],
    [255,255,255,20,60,160,255,255,255,20,60,160],
    [255,50,200,20,10,60,255,50,200,20,10,60],
    [255,240,190,120,50,0,255,240,190,120,50,0],
    [255,215,40,255,88,160,255,215,40,255,88,160],
    [253,149,198,254,232,110,253,149,198,254,232,110],
    [255,215,40,255,88,160,254,98,179,255,230,101],
    [255,235,115,127,22,88,255,235,115,127,22,88],
    [229,63,23,220,196,224,229,63,23,220,196,224]
  ];
  // cor de BAIXO do degrade dos rostos 60..71 e 75
  var GRADB = [
    [255,50,130],
    [20,70,200],
    [150,70,255],
    [110,200,255],
    [255,50,20],
    [10,115,85],
    [25,15,125],
    [110,0,35],
    [255,140,200],
    [60,160,255],
    [40,255,255],
    [230,145,15],
    [250,100,165]
  ];
  var FLOWER_C = [255, 112, 177];

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function rf(a, b) { return a + (b - a) * Math.random(); }
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a)); }
  function rsign() { return Math.random() < 0.5 ? -1 : 1; }
  function env(t, d, rin, rout) { return Math.min(ease(t / rin), ease((d - t) / rout)); }
  function hsv(h) {
    h = ((h % 360) + 360) % 360; var x = h / 60, i = Math.floor(x), f = x - i, q = 1 - f, r, g, b;
    switch (i) { case 0: r = 1; g = f; b = 0; break; case 1: r = q; g = 1; b = 0; break; case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break; case 4: r = f; g = 0; b = 1; break; default: r = 1; g = 0; b = q; }
    return [r * 255, g * 255, b * 255];
  }

  // ---- estilo base do v13 (initStyles): olho CHEIO; a cupula entra como humor (cutBot) ----
  function baseStyle(face) {
    var i = clamp(face | 0, 0, FACES.length - 1), c = FACES[i];
    var S = {
      rx: 33 * KS, ry: 44 * KS, rot: 7, gap: 37 * KS, cy: 120 + (114 - 120) * KS,
      cutTop: 0, cutBot: 0, lid: 0, cbAng: 8,
      prx: 12.7 * KS, pry: 16.3 * KS, px: -9.2 * KS, py: 6.9 * KS, prot: 0, pa: 1,
      band: 0, bOy: 15, bRx: 36, bRy: 16, arc: 0, bend: 9, squint: 0, conv: 1, winkL: 0, winkR: 0, ps: 1,
      scL: 1, scR: 1, cheek: 0, hl: 0, pHeart: 0, pStar: 0, pFlower: 0, gA: 0, gbr: 0, gbg: 0, gbb: 0,
      er: c[0], eg: c[1], eb: c[2], pr: c[3], pg: c[4], pb: c[5],
      er2: c[6], eg2: c[7], eb2: c[8], pr2: c[9], pg2: c[10], pb2: c[11]
    };
    if ((i >= 60 && i < 72) || i === 75) { var g = GRADB[i === 75 ? 12 : i - 60]; S.gA = 1; S.gbr = g[0]; S.gbg = g[1]; S.gbb = g[2]; }
    if (i === 73) S.pFlower = 1;
    return S;
  }
  function tint(T, r, g, b, k) {
    k = clamp(k, 0, 1);
    T.er = lerp(T.er, r, k); T.eg = lerp(T.eg, g, k); T.eb = lerp(T.eb, b, k);
    T.er2 = lerp(T.er2, r, k); T.eg2 = lerp(T.eg2, g, k); T.eb2 = lerp(T.eb2, b, k);
    T.gbr = lerp(T.gbr, r, k); T.gbg = lerp(T.gbg, g, k); T.gbb = lerp(T.gbb, b, k);
  }
  function pupTint(T, r, g, b, k) {
    k = clamp(k, 0, 1);
    T.pr = lerp(T.pr, r, k); T.pg = lerp(T.pg, g, k); T.pb = lerp(T.pb, b, k);
    T.pr2 = lerp(T.pr2, r, k); T.pg2 = lerp(T.pg2, g, k); T.pb2 = lerp(T.pb2, b, k);
  }
  function setSurprise(T, H) { // olho arregalado, pupila pequena
    T.cutTop = 0; T.cutBot = 0; T.lid = 0; T.rot = 3; T.rx = H.rx * 1.12; T.ry = H.ry * 1.12;
    T.ps = 0.62; T.py = H.py * 0.45; T.px = H.px * 0.3; T.prot = 0;
  }
  function setAngry(T, H, cut, lid) { // palpebra reta + brilho embaixo, sem pupila
    T.cutTop = cut; T.cutBot = 0; T.lid = lid; T.rot = 0; T.rx = H.rx * 1.09; T.ry = H.ry * 0.77; T.pa = 0;
    T.band = 110; T.bOy = 12 * KS; T.bRx = 28 * KS; T.bRy = 12 * KS;
  }

  // ---- reacoes (do firmware v13): f(t, d, e, sd, T, O, H, I)  I.goX/goY = deslocamento do olhar ----
  var R = {
    grin: { d: 2900, f: function (t, d, e, sd, T, O, H) { T.cutTop = 0; T.cutBot = 0; T.cheek = 0.55 * e; T.ry = H.ry * 0.95; T.rot = H.rot * 0.75; T.lid = 0; O.dy += -3 * e * Math.abs(Math.sin(t * 0.006)); } },
    smirk: { d: 2400, f: function (t, d, e, sd, T, O, H) { T.cheek = 0.30 * e; T.rot = H.rot + 6 * e; T.squint = 0.12 * e; O.rot += 4 * sd * e; O.dx += 2 * sd * e; } },
    think: { d: 3000, f: function (t, d, e, sd, T, O, H) { T.cutTop = 0.2 * e; T.lid = -14 * sd; T.rot = H.rot - 4 * e; O.rot += 6 * sd * e; O.dx += 3 * sd * e; } },
    yawn: { d: 2600, f: function (t, d, e, sd, T, O, H) {
      var oe = env(t, d, 600, 500); T.squint = 0.92 * env(t, d, 500, 450); T.rot = lerp(H.rot, -8, oe);
      tint(T, 175, 120, 255, 0.55 * oe); O.rot += -3 * oe; O.dy += -3 * oe; O.zoom *= 1 + 0.03 * oe; T._tau = 80; } },
    happy: { d: 2800, f: function (t, d, e, sd, T, O) { T.arc = 1; T.bend = -10; O.dy += 4 * e * Math.sin(t * 0.0046); T._tau = 160; } },
    sad: { d: 3200, f: function (t, d, e, sd, T, O, H) {
      T.rot = lerp(H.rot, -14, e); T.cutTop = 0.22 * e; T.lid = 12; T.py += 5 * e; T.rx *= 1 - 0.08 * e; T.ry *= 1 - 0.08 * e;
      tint(T, 110, 98, 255, 0.5 * e); O.dy += 3 * e; O.rot += -3 * sd * e; } },
    surprise: { d: 1700, f: function (t, d, e, sd, T, O, H) {
      setSurprise(T, H); T.ps = 0.5; var pop = ease(1 - t / 220); O.zoom *= 1 + 0.07 * pop; O.dy -= 7 * pop; T._tau = 45; } },
    spin: { d: 3000, f: function (t, d, e, sd, T, O, H, I) { // agacha, gira 360 (olhos arco-iris), cai tonto, "ta-da"
      var tA = 420, tS = 1300, c1 = hsv(t * 0.45), c2 = hsv(t * 0.45 + 120);
      T.rx *= 1.06; T.ry *= 1.06; T.er = c1[0]; T.eg = c1[1]; T.eb = c1[2]; T.gA = 0; T.er2 = c2[0]; T.eg2 = c2[1]; T.eb2 = c2[2]; T._tau = 60;
      if (t < tA) { var a = ease(t / tA); O.zoom *= 1 - 0.07 * a; O.dy += 5 * a; O.rot += -sd * 10 * a; }
      else if (t < tA + tS) {
        var p = (t - tA) / tS, a2 = ease(p), wind = -sd * 10;
        O.rot += wind + (sd * 360 - wind) * a2; O.dy += lerp(5, 0, ease(p * 4)) - 5 * Math.sin(Math.PI * p);
        O.zoom *= (1 - 0.07 * (1 - ease(p * 3))) + 0.02 * Math.sin(Math.PI * p);
      } else {
        var q = (t - tA - tS) / 1000;
        O.rot += sd * 360 + sd * 8 * Math.exp(-3 * q) * Math.sin(q * 16); O.dy += 5 * Math.exp(-6 * q); O.zoom *= 1 - 0.06 * Math.exp(-7 * q);
        if (q < 0.75) { var A = 10 * Math.exp(-2.2 * q); I.goX = A * Math.cos(q * 14); I.goY = 0.8 * A * Math.sin(q * 14); T.squint = 0.1; }
        else { T.rx = H.rx; T.ry = H.ry; T.er = H.er; T.eg = H.eg; T.eb = H.eb; T.er2 = H.er2; T.eg2 = H.eg2; T.eb2 = H.eb2; T.gA = H.gA; O.dy -= 2.5 * Math.abs(Math.sin((q - 0.75) * 9)); }
      } } },
    no: { d: 2400, f: function (t, d, e, sd, T, O, H, I) {
      var nx = 13 * e * Math.sin(t * 0.0155); setAngry(T, H, 0.46, -24); O.dx += nx; O.rot += 7 * e * Math.sin(t * 0.0155 + 0.5); I.goX = -nx * 0.5; } },
    yes: { d: 2400, f: function (t, d, e, sd, T, O, H, I) {
      var ny = 7 * e * Math.sin(t * 0.0165); T.cutTop = 0; T.lid = 0; T.cheek = 0.35 * e; T.ps = 1 + 0.12 * e; T.rot = 4; O.dy += ny; I.goY = -ny * 0.5; } },
    curious: { d: 2800, f: function (t, d, e, sd, T, O, H) {
      T.cutTop = 0; T.lid = 0; T.rot = H.rot * 0.35; T.rx *= 1.07; T.ry *= 1.07; T.ps = 1.1; T.pry = H.pry * 1.5; T.py = H.py * 0.4; T.px = H.px * 0.4;
      O.rot += 11 * sd * e; O.dx += 4 * sd * e; } },
    wink: { d: 1700, f: function (t, d, e, sd, T, O, H) {
      T.rot = H.rot + 4 * e; O.rot += 5 * sd * e; var w = t > 250 && t < 850; if (sd > 0) T.winkR = w ? 1 : 0; else T.winkL = w ? 1 : 0; T._tau = 60; } },
    cross: { d: 2400, f: function (t, d, e, sd, T, O, H) { T.conv = 1.9; T.py += 4; O.rot += 3 * Math.sin(t * 0.009); } },
    angry: { d: 2600, f: function (t, d, e, sd, T, O, H) { // R-10 "bravo"
      setAngry(T, H, 0.5 * e + H.cutTop * (1 - e), -26 * e); tint(T, 255, 70, 70, 0.25 * e);
      O.dx += 0.9 * e * (Math.sin(t * 0.05) + 0.6 * Math.sin(t * 0.115)); O.dy += 0.63 * e * Math.sin(t * 0.085); O.rot += 0.54 * e * Math.sin(t * 0.065); T._tau = 70; } },
    mumble: { d: 2800, f: function (t, d, e, sd, T, O, H, I) {
      var m = 0.5 + 0.5 * Math.sin(t * 0.011) * Math.sin(t * 0.0031 + 1); setAngry(T, H, 0.5 - 0.06 * m, -26); T.ry *= 1 + 0.04 * m;
      O.rot += 2 * Math.sin(t * 0.008); O.dy += 1.5 * m; T._tau = 50; } },
    sleepy: { d: 3300, f: function (t, d, e, sd, T, O, H) {
      var tD = 1700;
      if (t < tD) { var a = ease(t / tD); T.arc = ease((a - 0.55) / 0.45); T.squint = 0.7 * a; T.bend = 9; O.dy += 10 * a; O.rot += 4 * sd * a; T._tau = 380; }
      else { var q = t - tD; setSurprise(T, H); T.rx *= 1.1 / 1.12; T.ry *= 1.1 / 1.12;
        O.dy += q < 110 ? lerp(10, -4, ease(q / 110)) : -4 * Math.exp(-(q - 110) / 260); O.rot += 4 * sd * (1 - ease(q / 110)); O.zoom *= 1 + 0.05 * Math.exp(-q / 200); T._tau = 50; } } },
    love: { d: 3000, f: function (t, d, e, sd, T, O, H) { // R-02 olhos de coracao
      T.pHeart = e; pupTint(T, 255, 60, 110, e); tint(T, 255, 120, 190, 0.35 * e); T.rx *= 1 + 0.06 * e; T.ry *= 1 + 0.06 * e; T.ps = H.ps * lerp(1, 1.2, e); T.cutTop = 0; T.lid = 0;
      var q = (t * 0.0013) % 1; O.zoom *= 1 + 0.07 * e * (Math.exp(-q * 9) + 0.5 * Math.exp(-Math.abs(q - 0.28) * 22)); } },
    star: { d: 3000, f: function (t, d, e, sd, T, O, H, I) { // R-01 olhos de estrela
      T.pStar = e; pupTint(T, 255, 225, 90, e); T.rx *= 1 + 0.08 * e; T.ry *= 1 + 0.08 * e; T.ps = H.ps * lerp(1, 1.25, e); T.cutTop = 0; T.lid = 0;
      T.ps *= 1 + 0.12 * e * Math.sin(t * 0.008); O.rot += 4 * sd * e; O.dx += 1.2 * sd * e; I.goY = -1 * e; } },
    cute: { d: 2800, f: function (t, d, e, sd, T, O, H) { // R-22 fofura (olhao brilhante)
      T.rx *= 1 + 0.14 * e; T.ry *= 1 + 0.14 * e; T.ps = H.ps * lerp(1, 1.35, e) * (1 + 0.15 * e * Math.sin(t * 0.012)); T.py -= 2 * e; T.cutTop = 0; T.lid = 0; T.hl = 0.9 * e;
      O.dy -= 2 * e * Math.abs(Math.sin(t * 0.008)); } },
    look: { d: 3400, f: function (t, d, e, sd, T, O, H, I) { // olhando em volta, com a cabeca virando (3D)
      var y = 0.5 * e * Math.sin(t * 0.0042); T.gap *= Math.max(Math.cos(y), 0.3); T.rx *= 0.7 + 0.3 * Math.cos(y); O.dx += Math.sin(y) * 22; I.goX = 12 * Math.sin(t * 0.0042) * e; } },
    cool: { d: 2600, f: function (t, d, e, sd, T, O, H, I) { // R-10 desconfiado
      T.cutTop = 0.33 * e; T.cutBot = 0.2 * e; T.lid = -8 * sd * e; I.goX = sd * 8 * e; I.goY = -1 * e; O.rot += 5 * sd * e; O.dx += 1.5 * sd * e; } },
    dizzy: { d: 3200, f: function (t, d, e, sd, T, O, H, I) {
      var A = 11 * Math.exp(-t * 0.0009); I.goX = A * Math.cos(t * 0.012); I.goY = 0.8 * A * Math.sin(t * 0.012); T.squint = 0.15; O.rot += 8 * e * Math.sin(t * 0.008); } }
  };
  var ALL = ['happy', 'love', 'surprise', 'angry', 'sad', 'wink', 'sleepy', 'curious', 'dizzy', 'look', 'think', 'spin', 'cute', 'cool', 'grin', 'smirk', 'yawn', 'no', 'yes', 'cross', 'mumble', 'star'];
  // reacoes que "pestanejam" ao comecar (as outras tem transicao propria) - softEdge() do firmware
  var NOBLINK = { happy: 1, wink: 1, sleepy: 1, surprise: 1, spin: 1, yawn: 1 };

  function KarluEyes(canvas, opt) {
    opt = opt || {};
    this.cv = canvas; this.ctx = canvas.getContext('2d');
    this.face = clamp(opt.face || 0, 0, FACES.length - 1);
    this.H = baseStyle(this.face);
    this.cur = Object.assign({}, this.H); this.mid = Object.assign({}, this.H);
    this.reacts = (opt.reacts && opt.reacts.length) ? opt.reacts.filter(function (r) { return R[r]; }) : ALL;
    if (opt.reacts && opt.reacts[0] === 'all') this.reacts = ALL;
    if (!this.reacts.length) this.reacts = ALL;
    this.fast = !!opt.fast;
    this.dpr = opt.dpr || Math.min(window.devicePixelRatio || 1, 2);
    this.resize(canvas.clientWidth || 240);
    var now = performance.now();
    this.last = now; this.nextBlink = now + rf(900, 2200); this.blinkT0 = -1; this.blinkOn = false; this.blDouble = false;
    this.blClose = 80; this.blHold = 40; this.blOpen = 110;
    this.gX = 0; this.gY = 0; this.gSX = 0; this.gSY = 0; this.gTX = 0; this.gTY = 0; this.gT0 = now; this.gDur = 100; this.nextSacc = now + rf(600, 1500);
    this.mcX = 0; this.mcY = 0; this.mtX = 0; this.mtY = 0; this.nextMicro = now; this.flickN = 0; this.flickSign = 1; this.nextFlick = now + rf(5000, 11000);
    this.hx = 0; this.hy = 0; this.turn = 0; this.goX = 0; this.goY = 0;
    this.act = null; this.actT0 = 0; this.actD = 0; this.actSide = 1; this.lastAct = '';
    this.nextAct = now + rf(900, 2200) + (opt.delay || 0);
    this.actGap = opt.gap || [3200, 5600];
    this.phase = Math.random() * 1000;
    this.fixedAct = opt.hold || null;
    this.mood = { ct: 0, cb: 0, lid: 0, sq: 0, rot: 0, sx: 1, sy: 1 }; this.moodS = { ct: 0, cb: 0, lid: 0, sq: 0, rot: 0, sx: 1, sy: 1 };
    this.nextMood = 0; this.lastMood = -1; this.morph = null; this.lidX = 0;
  }
  KarluEyes.FACES = FACES;
  KarluEyes.REACTS = ALL; KarluEyes.R = R;

  KarluEyes.prototype.resize = function (cssSize) {
    var px = Math.min(560, Math.max(200, Math.round(cssSize * this.dpr)));
    if (this.cv.width !== px) { this.cv.width = px; this.cv.height = px; }
  };
  // troca de rosto como no v13: o olho fecha numa linha, troca fechado e abre devagar no rosto novo
  KarluEyes.prototype.setFace = function (i) {
    i = clamp(i | 0, 0, FACES.length - 1);
    if (i === this.face && !this.morph) return;
    this.face = i; this.morph = { t0: performance.now(), swapped: false };
  };
  KarluEyes.prototype.trigger = function (name, now) {
    if (!R[name]) return;
    now = now || performance.now();
    this.act = name; this.actT0 = now; this.actD = R[name].d + rf(0, 300); this.actSide = rsign(); this.lastAct = name;
    if (!this.blinkOn && !NOBLINK[name]) this.startBlink(now);
  };
  // piscar do v13: 3 tipos (rapida / normal / sonolenta) + piscada dupla
  KarluEyes.prototype.startBlink = function (now) {
    this.blinkOn = true; this.blinkT0 = now;
    var dbl2 = this.blDouble, k = Math.random() * 100;
    if (dbl2 || k < 22) { this.blClose = ri(50, 80); this.blHold = ri(0, 25); this.blOpen = ri(120, 175); }
    else if (k < 80) { this.blClose = ri(70, 110); this.blHold = ri(20, 80); this.blOpen = ri(170, 300); }
    else { this.blClose = ri(110, 150); this.blHold = ri(140, 260); this.blOpen = ri(280, 420); }
    var total = this.blClose + this.blHold + this.blOpen;
    if (!dbl2 && Math.random() * 100 < 16) { this.blDouble = true; this.blClose = ri(50, 80); this.blHold = ri(0, 25); this.blOpen = ri(130, 180); total = this.blClose + this.blHold + this.blOpen; this.nextBlink = now + total + ri(40, 110); }
    else { this.blDouble = false; this.nextBlink = now + total + ri(BLINK_MIN, BLINK_MAX); }
  };
  KarluEyes.prototype.blinkFactor = function (now) {
    if (!this.blinkOn) return 0;
    var t = now - this.blinkT0;
    if (t < this.blClose) return ease(t / this.blClose);
    if (t < this.blClose + this.blHold) return 1;
    if (t < this.blClose + this.blHold + this.blOpen) { var v = 1 - (t - this.blClose - this.blHold) / this.blOpen; return v * v * v; }
    this.blinkOn = false; return 0;
  };
  function gazeCurve(p) { p = clamp(p, 0, 1); var a = p * p * (3 - 2 * p), b = 1 - (1 - p) * (1 - p) * (1 - p); return 0.45 * a + 0.55 * b; }
  KarluEyes.prototype.gazeTo = function (x, y, now) {
    this.gSX = this.gX; this.gSY = this.gY; this.gTX = x; this.gTY = y; this.gT0 = now;
    this.gDur = 78 + Math.hypot(x - this.gX, y - this.gY) * 6.5;
  };
  KarluEyes.prototype.pickGaze = function (now) {
    var tx, ty, r = Math.random() * 100, away = Math.hypot(this.gTX / LOOK_X, this.gTY / LOOK_Y) > 0.7;
    if (away && r < 70) { tx = rf(-0.25, 0.25) * LOOK_X; ty = rf(-0.2, 0.2) * LOOK_Y; }
    else if (r < 55) { tx = rf(-0.5, 0.5) * LOOK_X; ty = rf(-0.35, 0.35) * LOOK_Y; }
    else if (r < 82) { tx = rsign() * rf(0.65, 1) * LOOK_X; ty = rf(-0.3, 0.3) * LOOK_Y; }
    else { ty = rsign() * rf(0.7, 1) * LOOK_Y; tx = rf(-0.4, 0.4) * LOOK_X; }
    var amp = Math.hypot(tx - this.gX, ty - this.gY);
    this.gazeTo(tx, ty, now);
    this.nextSacc = now + rf(500, 1800) + Math.hypot(tx / LOOK_X, ty / LOOK_Y) * rf(300, 1500);
    if (amp > 12 && !this.blinkOn && Math.random() < 0.35) this.nextBlink = now + rf(20, 70);
  };
  // humor do v13: olho CHEIO ~40% | CUPULA ~48% | atento/largo | triste (raro)
  KarluEyes.prototype.pickMood = function (now) {
    var rr = Math.random() * 100, m;
    if (rr < 40) m = 0; else if (rr < 88) m = 10;
    else if (Math.random() * 100 < 45) m = 8 + ri(0, 2);
    else { do { m = 1 + ri(0, 7); } while (m === this.lastMood); }
    this.lastMood = m;
    var d = { ct: 0, cb: 0, lid: 0, sq: 0, rot: 0, sx: 1, sy: 1 };
    switch (m) {
      case 0: case 5: break;
      case 1: d.ct = 0.12; d.lid = 4; d.rot = -2; break;
      case 2: d.sq = 0.30; d.ct = 0.04; break;
      case 3: d.cb = 0.18; d.ct = 0.04; d.rot = -3; break;
      case 4: d.sq = 0.42; d.ct = 0.08; d.lid = 3; break;
      case 6: d.ct = 0.06; d.cb = 0.10; d.lid = -6; d.sq = 0.12; break;
      case 10: d.cb = 0.20; break;
      case 8: d.sy = 1.20; d.sx = 0.97; d.cb = -0.04; break;
      case 9: d.sx = 1.17; d.sy = 0.82; d.sq = 0.10; break;
      default: d.ct = 0.16; d.lid = 8; d.sq = 0.18; d.rot = -5; break;
    }
    this.mood = d; this.nextMood = now + rf(MOOD_MIN, MOOD_MAX);
  };

  KarluEyes.prototype.frame = function (now) {
    var dt = clamp(now - this.last, 1, 100); this.last = now;
    this.goX = 0; this.goY = 0;
    // reacao sorteada
    if (!this.act && now >= this.nextAct) {
      var pool = this.reacts, name, tries = 0;
      do { name = pool[(Math.random() * pool.length) | 0]; tries++; } while (name === this.lastAct && pool.length > 1 && tries < 6);
      this.trigger(name, now);
    }
    // olhar
    if (!this.act && now >= this.nextSacc) this.pickGaze(now);
    var gp = (now - this.gT0) / this.gDur;
    if (gp >= 1) { this.gX = this.gTX; this.gY = this.gTY; } else { var ee = gazeCurve(gp); this.gX = this.gSX + (this.gTX - this.gSX) * ee; this.gY = this.gSY + (this.gTY - this.gSY) * ee; }
    if (this.flickN === 0 && now >= this.nextFlick) { this.flickN = 3; this.flickSign = rsign(); this.nextFlick = now + rf(5000, 11000); this.nextMicro = now; }
    if (now >= this.nextMicro) {
      if (this.flickN > 0) { this.mtX = this.flickSign * rf(1.4, 2.4); this.mtY = rf(-0.6, 0.6); this.flickSign = -this.flickSign; this.flickN--; this.nextMicro = now + rf(70, 115); }
      else { this.mtX = rf(-0.9, 0.9); this.mtY = rf(-0.6, 0.6); this.nextMicro = now + rf(120, 520); }
    }
    var kM = 1 - Math.exp(-dt / 28); this.mcX += (this.mtX - this.mcX) * kM; this.mcY += (this.mtY - this.mcY) * kM;
    var trX = 0.22 * Math.sin(now * 0.043) + 0.15 * Math.sin(now * 0.071 + 1.3), trY = 0.18 * Math.sin(now * 0.057 + 0.7) + 0.1 * Math.sin(now * 0.083);
    // piscar
    if (!this.blinkOn && now >= this.nextBlink) this.startBlink(now);
    var bl = this.blinkFactor(now);
    // troca de rosto (fecha, troca, abre)
    this.lidX = 0;
    if (this.morph) {
      var mt = now - this.morph.t0;
      if (mt < 170) this.lidX = ease(mt / 170); else if (mt < 400) this.lidX = 1;
      else if (mt < 830) { var u = 1 - (mt - 400) / 430; this.lidX = u * u * u; } else this.morph = null;
      if (this.morph && !this.morph.swapped && mt >= 273) {
        this.morph.swapped = true; this.H = baseStyle(this.face);
        for (var k0 in this.H) { if (typeof this.H[k0] === 'number' && /^(er|eg|eb|pr|pg|pb|gA|gb|pFlower)/.test(k0)) { this.cur[k0] = this.H[k0]; this.mid[k0] = this.H[k0]; } }
      }
    }
    // humor
    if (now >= this.nextMood) this.pickMood(now);
    var kMd = 1 - Math.exp(-dt / 650), md = this.mood, ms = this.moodS;
    for (var mk in md) ms[mk] += (md[mk] - ms[mk]) * kMd;
    var H = this.H, T = Object.assign({}, H); T._tau = 110;
    if (!this.act) {
      T.cutTop = clamp(T.cutTop + ms.ct + 0.06 * clamp(this.gY / LOOK_Y, 0, 1), 0, 0.6);
      T.cutBot = clamp(T.cutBot + ms.cb, 0, 0.5);
      T.lid += ms.lid; T.squint = clamp(T.squint + ms.sq, 0, 0.9); T.rot += ms.rot; T.rx *= ms.sx; T.ry *= ms.sy;
    }
    // a cabeca acompanha o olhar (virada de cabeca em falso 3D)
    var kH = 1 - Math.exp(-dt / 240);
    this.hx += (this.gX * (HEAD_TURN ? 0.95 : 0.30) - this.hx) * kH; this.hy += (this.gY * 0.30 - this.hy) * kH;
    this.turn = clamp(this.hx / (LOOK_X * 0.8), -1, 1);
    var ph = this.phase;
    var O = { rot: 1.2 * Math.sin(now * 0.00042 + ph) + 0.7 * Math.sin(now * 0.00117 + 2), dx: Math.sin(now * 0.0009 + 1) + this.hx, dy: 1.4 * Math.sin(now * 0.0013 + ph) + this.hy, zoom: 1 + 0.008 * Math.sin(now * 0.0013 + 0.8) };
    if (this.act) {
      var t = now - this.actT0, d = this.actD;
      if (t >= d) { this.act = null; this.nextAct = now + rf(this.actGap[0], this.actGap[1]); this.nextSacc = now + rf(400, 1200); this.gazeTo(0, 0, now); if (!this.blinkOn && !NOBLINK[this.lastAct]) this.nextBlink = now + 60; }
      else { var e = env(t, d, 300, 350); R[this.act].f(t, d, e, this.actSide, T, O, H, this); }
    }
    bl = Math.max(bl, this.lidX);
    this.goY += 1.3 * bl;                                                  // o olhar desce um tico ao fechar
    var br = 1 + 0.012 * Math.sin(now * 0.0013); T.rx *= br; T.ry *= br;  // o olho "respira"
    T.ps *= 1 + 0.020 * Math.sin(now * 0.0019) + 0.012 * Math.sin(now * 0.0047 + 1);   // a pupila tambem
    // suaviza em 2 estagios (comeca suave, acelera e freia)
    var cur = this.cur, mid = this.mid, kk = 1 - Math.exp(-dt / ((T._tau || 110) * 0.6));
    if (T.arc >= 0.5) { if (mid.arc < 0.03) mid.bend = T.bend; if (cur.arc < 0.03) cur.bend = T.bend; } else T.bend = cur.bend;
    for (var k in T) { if (k === '_tau' || typeof T[k] !== 'number') continue; if (mid[k] === undefined) mid[k] = T[k]; if (cur[k] === undefined) cur[k] = T[k]; mid[k] += (T[k] - mid[k]) * kk; cur[k] += (mid[k] - cur[k]) * kk; }
    var gl = Math.hypot(this.gX / 14, this.gY / 14);
    var convEff = cur.conv * (1 - 0.6 * clamp(gl, 0, 1));
    this.draw(cur, bl, this.gX + this.mcX + trX + this.goX, this.gY + this.mcY + trY + this.goY, convEff, O);
  };

  function heart(c, cx, cy, W) {
    c.beginPath(); c.ellipse(cx - 0.5 * W, cy - 0.3 * W, 0.54 * W, 0.54 * W, 0, 0, 6.2832); c.fill();
    c.beginPath(); c.ellipse(cx + 0.5 * W, cy - 0.3 * W, 0.54 * W, 0.54 * W, 0, 0, 6.2832); c.fill();
    c.beginPath(); c.ellipse(cx, cy - 0.02 * W, 0.6 * W, 0.42 * W, 0, 0, 6.2832); c.fill();
    c.lineCap = 'round'; c.lineWidth = 0.6 * W;
    c.beginPath(); c.moveTo(cx - 0.42 * W, cy + 0.06 * W); c.lineTo(cx, cy + 0.76 * W); c.stroke();
    c.beginPath(); c.moveTo(cx + 0.42 * W, cy + 0.06 * W); c.lineTo(cx, cy + 0.76 * W); c.stroke();
  }
  function star(c, cx, cy, Rr) {
    c.beginPath(); c.ellipse(cx, cy, 0.36 * Rr, 0.36 * Rr, 0, 0, 6.2832); c.fill(); c.lineCap = 'round';
    for (var i = 0; i < 5; i++) {
      var an = (-90 + 72 * i) * D2R, co = Math.cos(an), si = Math.sin(an);
      c.lineWidth = 0.40 * Rr; c.beginPath(); c.moveTo(cx + 0.20 * Rr * co, cy + 0.20 * Rr * si); c.lineTo(cx + 0.55 * Rr * co, cy + 0.55 * Rr * si); c.stroke();
      c.lineWidth = 0.12 * Rr; c.beginPath(); c.moveTo(cx + 0.55 * Rr * co, cy + 0.55 * Rr * si); c.lineTo(cx + 0.97 * Rr * co, cy + 0.97 * Rr * si); c.stroke();
    }
  }
  function rgb(r, g, b) { return 'rgb(' + (clamp(r, 0, 255) | 0) + ',' + (clamp(g, 0, 255) | 0) + ',' + (clamp(b, 0, 255) | 0) + ')'; }

  KarluEyes.prototype.draw = function (S, bl, gx, gy, convEff, O) {
    var ctx = this.ctx, k = this.cv.width / 240;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 240);
    if (gy < 0) gy *= 1 + 0.6 * (1 - clamp(Math.abs(gx) / (LOOK_X * 0.8), 0, 1));   // olhando reto pra cima a pupila sobe mais
    // piscada do v13: 0..0.8 o olho achata e gira pro horizontal; 0.8..1 vira um arco fino (olho fechado)
    var blB = clamp(bl, 0, 1), blEff = 0, blArc = 0, blRot = 0;
    if (blB < 0.8) { var kb = blB / 0.8; blEff = blB * 0.93; blRot = kb * kb; }
    else { var u = (blB - 0.8) / 0.2; blEff = 0.74 * (1 - u); blArc = 0.35 + 0.65 * ease(u); blRot = 1; }
    var arcA = clamp(Math.max(S.arc, blArc), 0, 1), blinkArc = blArc > S.arc, bendUse = blinkArc ? -4 : S.bend;
    var sqA = ease(arcA / 0.55), aBody = 1 - ease((arcA - 0.56) / 0.22), aArc = ease((arcA - 0.50) / 0.05), arcP = ease((arcA - 0.50) / 0.50);
    var oR = O.rot * D2R, cR = Math.cos(oR), sR = Math.sin(oR), Z = O.zoom;
    for (var i = 0; i < 2; i++) {
      var side = i === 0 ? -1 : 1, sc = i ? S.scR : S.scL, RX = S.rx * sc, RY = S.ry * sc;
      var tn = HEAD_TURN ? this.turn : 0; RX *= 1 - side * 0.15 * tn; RY *= 1 - side * 0.05 * tn;   // falso 3D
      var wink = i === 0 ? S.winkL : S.winkR;
      var cl = Math.max(blEff, S.squint, wink);
      var sy = (1 - cl * 0.96) * (1 - 0.94 * sqA);
      var cx0 = 120 + side * S.gap + side * (sc - 1) * S.rx * 0.35;
      var anchor = Math.max(cl, blB * 0.93);                                  // ao piscar a base reta fica parada e a palpebra desce
      var cy0 = S.cy + RY * (3 * S.cutBot) * anchor * 0.96;
      var rot0 = side * lerp(S.rot, S.rot * 0.2, blRot) * (1 - 0.75 * arcP);
      var lidAngB = -side * S.cbAng * (side > 0 ? 1.3 : 0.6) - rot0;          // base reta inclinada (ponta de dentro mais baixa)
      var relx = cx0 - 120, rely = cy0 - 118;
      var ex = 120 + O.dx + Z * (relx * cR - rely * sR), ey = 118 + O.dy + Z * (relx * sR + rely * cR), er = rot0 + O.rot;
      var fr = i ? S.er2 : S.er, fg = i ? S.eg2 : S.eg, fb = i ? S.eb2 : S.eb;
      var qr = i ? S.pr2 : S.pr, qg = i ? S.pg2 : S.pg, qb = i ? S.pb2 : S.pb;
      var eyeCol = rgb(fr, fg, fb);
      var rx = RX * (1 + 0.05 * cl), ry = RY * sy;
      ctx.save(); ctx.translate(ex, ey); ctx.rotate(er * D2R); ctx.scale(Z, Z);
      if (aBody > 0.01 && ry > 0.3) {
        ctx.save();
        var lidA = side * S.lid * D2R;                                        // palpebras (cortes retos)
        ctx.rotate(lidA);
        if (S.cutTop > 0.001) { ctx.beginPath(); ctx.rect(-400, -ry + 2 * ry * S.cutTop, 800, 800); ctx.clip(); }
        ctx.rotate(-lidA);
        if (S.cutBot > 0.001) {                                               // base reta da CUPULA (angulo proprio)
          var lb = lidAngB * D2R; ctx.rotate(lb); ctx.beginPath(); ctx.rect(-400, ry - 2 * ry * S.cutBot - 800, 800, 800); ctx.clip(); ctx.rotate(-lb);
        }
        ctx.globalAlpha = aBody;
        if (S.gA > 0.01) {
          var ga = clamp(S.gA, 0, 1), gr = ctx.createLinearGradient(0, -ry, 0, ry);
          gr.addColorStop(0, eyeCol); gr.addColorStop(1, rgb(lerp(fr, S.gbr, ga), lerp(fg, S.gbg, ga), lerp(fb, S.gbb, ga))); ctx.fillStyle = gr;
        } else ctx.fillStyle = eyeCol;
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832); ctx.fill();
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832); ctx.clip();   // dentro do olho: brilho + pupila
        if (S.band > 1) {
          ctx.globalAlpha = clamp(S.band / 255, 0, 1) * aBody;
          ctx.fillStyle = rgb(fr + (255 - fr) * 0.45, fg + (255 - fg) * 0.45, fb + (255 - fb) * 0.45);
          ctx.beginPath(); ctx.ellipse(0, S.bOy * sy, S.bRx, S.bRy * sy, 0, 0, 6.2832); ctx.fill();
        }
        var pf = ease((sy - 0.08) / 0.22), pa = clamp(S.pa, 0, 1) * aBody * pf;
        if (pa > 0.01) {
          var c0 = Math.cos(rot0 * D2R), s0 = Math.sin(rot0 * D2R), lgx = gx * c0 + gy * s0, lgy = -gx * s0 + gy * c0;
          var ppx = side * S.px * convEff * S.ps + lgx, ppy = S.py * sy + lgy * sy;
          var shM = Math.max(clamp(S.pHeart, 0, 1), clamp(S.pStar, 0, 1)), flA = clamp(S.pFlower, 0, 1) * (1 - shM), dotA = 1 - Math.max(shM, flA);
          var prE = S.prx * S.ps * sc, pryE = S.pry * S.ps * sc, big = Math.max(S.prx, S.pry) * S.ps * sc, pc = rgb(qr, qg, qb);
          ctx.fillStyle = pc; ctx.strokeStyle = pc;
          if (dotA > 0.02) { ctx.globalAlpha = pa * dotA; ctx.beginPath(); ctx.ellipse(ppx, ppy, prE, pryE * sy, side * S.prot * D2R, 0, 6.2832); ctx.fill(); }
          if (S.pHeart > 0.02) { ctx.globalAlpha = pa * clamp(S.pHeart, 0, 1); heart(ctx, ppx, ppy, 1.15 * big); }
          if (S.pStar > 0.02) { ctx.globalAlpha = pa * clamp(S.pStar, 0, 1); star(ctx, ppx, ppy, 1.55 * big); }
          if (flA > 0.02) {                                                   // pupila em flor (rosto 73)
            ctx.globalAlpha = pa * flA; var FR = 1.4 * big;
            for (var q = 0; q < 5; q++) { var an = (-90 + 72 * q) * D2R; ctx.beginPath(); ctx.ellipse(ppx + 0.6 * FR * Math.cos(an), ppy + 0.6 * FR * Math.sin(an), 0.4 * FR, 0.4 * FR, 0, 0, 6.2832); ctx.fill(); }
            ctx.fillStyle = rgb(FLOWER_C[0], FLOWER_C[1], FLOWER_C[2]); ctx.beginPath(); ctx.ellipse(ppx, ppy, 0.26 * FR, 0.26 * FR, 0, 0, 6.2832); ctx.fill();
          }
          if (S.hl > 0.02) {                                                  // brilhinho branco na pupila
            ctx.globalAlpha = clamp(S.hl, 0, 1) * 0.92 * aBody * pf; ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.ellipse(ppx - 0.34 * prE, ppy - 0.36 * pryE * sy, 0.30 * prE, 0.28 * pryE * sy, 0, 0, 6.2832); ctx.fill();
            ctx.beginPath(); ctx.ellipse(ppx + 0.30 * prE, ppy + 0.34 * pryE * sy, 0.15 * prE, 0.14 * pryE * sy, 0, 0, 6.2832); ctx.fill();
          }
        }
        ctx.restore();
      }
      if (S.cheek > 0.02 && aBody > 0.01) {                                   // bochecha curva (olho sorrindo)
        var ch = clamp(S.cheek, 0, 1); ctx.globalAlpha = 1; ctx.fillStyle = '#000';
        ctx.save(); ctx.translate(0, ry * (1.66 - 0.78 * ch)); ctx.rotate(side * 4 * D2R); ctx.beginPath(); ctx.ellipse(0, 0, 1.5 * RX, 0.66 * ry, 0, 0, 6.2832); ctx.fill(); ctx.restore();
      }
      if (aArc > 0.02) {                                                      // olho fechado: ^ ^ / traco fino da piscada
        var rad = (blinkArc ? 4.4 : 5.6) * KS * (0.30 + 0.70 * arcP), half = rx - rad * 0.75, bd = bendUse * KS * arcP, yc = -0.5 * bd, N = blinkArc ? 12 : 14;
        ctx.globalAlpha = aArc; ctx.strokeStyle = eyeCol; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for (var n = 0; n < N; n++) {
          var u0 = -1 + 2 * n / N, u1 = -1 + 2 * (n + 1) / N, um = 0.5 * (u0 + u1), rr2 = blinkArc ? rad * (0.38 + 0.62 * Math.sqrt(Math.max(0, 1 - um * um))) : rad;
          ctx.lineWidth = rr2 * 2; ctx.beginPath(); ctx.moveTo(u0 * half, yc + bd * (1 - u0 * u0)); ctx.lineTo(u1 * half, yc + bd * (1 - u1 * u1)); ctx.stroke();
        }
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  };

  // ---- laco global (um unico requestAnimationFrame para todos os displays) ----
  var items = [], running = false, lowEnd = false, lastTick = 0;
  try { lowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4); } catch (e) {}
  var minDt = lowEnd ? 1000 / 30 : 1000 / 45;
  function loop(now) {
    if (!items.length) { running = false; return; }
    requestAnimationFrame(loop);
    if (now - lastTick < minDt) return;
    lastTick = now;
    for (var i = 0; i < items.length; i++) { if (items[i].visible) items[i].eyes.frame(now); }
  }
  KarluEyes.add = function (eyes) {
    var it = { eyes: eyes, visible: true }; items.push(it);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { it.visible = en[0].isIntersecting; if (it.visible) eyes.last = performance.now(); }, { rootMargin: '120px' });
      io.observe(eyes.cv); it.io = io;
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
    return it;
  };
  KarluEyes.still = function (eyes, name) { // um quadro parado (modo sem animacao)
    var now = performance.now(); if (name) { eyes.trigger(name, now); }
    var t = now; for (var i = 0; i < 12; i++) { t += 100; eyes.frame(t); }
  };
  window.KarluEyes = KarluEyes;
})();
