/* Stardust Labs - motor de olhos do Karlu (porte do firmware v8 para canvas 2D)
 * Mesmo modelo de rosto: dois ovais inclinados + pupila, fundo preto, 24 combinacoes de cor.
 * Uso: new KarluEyes(canvas, { face: 0..23, reacts: ['happy','wink'], dpr: 2 })
 */
(function () {
  'use strict';
  var KS = 1.28;
  var D2R = Math.PI / 180;

  // cor olho esq, pupila esq, olho dir, pupila dir (igual ao firmware: lista FACES)
  var FACES = [
    [255, 66, 196, 250, 220, 184, 255, 66, 196, 250, 220, 184],
    [46, 92, 255, 170, 235, 255, 46, 92, 255, 170, 235, 255],
    [60, 255, 120, 255, 250, 150, 60, 255, 120, 255, 250, 150],
    [160, 80, 255, 255, 170, 230, 160, 80, 255, 255, 170, 230],
    [255, 140, 40, 255, 235, 120, 255, 140, 40, 255, 235, 120],
    [255, 45, 60, 255, 225, 225, 255, 45, 60, 255, 225, 225],
    [30, 230, 240, 20, 40, 150, 30, 230, 240, 20, 40, 150],
    [255, 226, 72, 255, 120, 40, 255, 226, 72, 255, 120, 40],
    [235, 240, 255, 70, 110, 255, 235, 240, 255, 70, 110, 255],
    [190, 255, 60, 30, 140, 70, 190, 255, 60, 30, 140, 70],
    [40, 220, 170, 255, 150, 200, 40, 220, 170, 255, 150, 200],
    [220, 60, 255, 120, 240, 255, 220, 60, 255, 120, 240, 255],
    [255, 110, 100, 255, 225, 190, 255, 110, 100, 255, 225, 190],
    [140, 200, 255, 150, 80, 255, 140, 200, 255, 150, 80, 255],
    [255, 190, 40, 230, 50, 50, 255, 190, 40, 230, 50, 50],
    [30, 170, 90, 190, 255, 215, 30, 170, 90, 190, 255, 215],
    [255, 66, 196, 250, 220, 184, 46, 92, 255, 170, 235, 255],
    [60, 255, 120, 255, 250, 150, 160, 80, 255, 255, 170, 230],
    [255, 140, 40, 40, 70, 200, 30, 230, 240, 255, 120, 40],
    [255, 226, 72, 230, 60, 40, 255, 45, 60, 255, 235, 120],
    [255, 66, 196, 120, 240, 255, 30, 230, 240, 255, 150, 210],
    [46, 92, 255, 255, 235, 120, 255, 140, 40, 170, 235, 255],
    [60, 255, 120, 255, 120, 190, 255, 66, 196, 190, 255, 200],
    [160, 80, 255, 255, 230, 90, 255, 226, 72, 160, 80, 255]
  ];

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function rf(a, b) { return a + (b - a) * Math.random(); }
  function rsign() { return Math.random() < 0.5 ? -1 : 1; }
  function env(t, d, rin, rout) { return Math.min(ease(t / rin), ease((d - t) / rout)); }
  function hsv(h) {
    h = ((h % 360) + 360) % 360; var x = h / 60, i = Math.floor(x), f = x - i, q = 1 - f, r, g, b;
    switch (i) { case 0: r = 1; g = f; b = 0; break; case 1: r = q; g = 1; b = 0; break; case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break; case 4: r = f; g = 0; b = 1; break; default: r = 1; g = 0; b = q; }
    return [r * 255, g * 255, b * 255];
  }

  function baseStyle(face) {
    var c = FACES[clamp(face | 0, 0, FACES.length - 1)];
    return {
      rx: 32 * KS, ry: 44 * KS, rot: 15, gap: 38 * KS, cy: 120 + (112 - 120) * KS,
      cutTop: 0, cutBot: 0, lid: 0, squint: 0, arc: 0, bend: 9, winkL: 0, winkR: 0,
      px: -7 * KS, py: 9 * KS, prx: 12.5 * KS, pry: 16 * KS, prot: -8, ps: 1, pa: 1, conv: 1,
      band: 0, bOy: 15, bRx: 36, bRy: 16,
      er: c[0], eg: c[1], eb: c[2], pr: c[3], pg: c[4], pb: c[5],
      er2: c[6], eg2: c[7], eb2: c[8], pr2: c[9], pg2: c[10], pb2: c[11]
    };
  }
  function tint(T, r, g, b, k) {
    k = clamp(k, 0, 1);
    T.er = lerp(T.er, r, k); T.eg = lerp(T.eg, g, k); T.eb = lerp(T.eb, b, k);
    T.er2 = lerp(T.er2, r, k); T.eg2 = lerp(T.eg2, g, k); T.eb2 = lerp(T.eb2, b, k);
  }
  function surprise(T, H) { // olho arregalado, pupila pequena
    T.cutTop = 0; T.cutBot = 0; T.lid = 0; T.rot = 3; T.rx = H.rx * 1.12; T.ry = H.ry * 1.12;
    T.ps = 0.55; T.py = H.py * 0.45; T.px = H.px * 0.3; T.prot = 0;
  }
  function angry(T, H, cut, lid) { // palpebra reta + brilho embaixo, sem pupila
    T.cutTop = cut; T.lid = lid; T.rot = 0; T.rx = H.rx * 1.09; T.ry = H.ry * 0.77; T.pa = 0;
    T.band = 110; T.bOy = 12 * KS; T.bRx = 28 * KS; T.bRy = 12 * KS;
  }

  // ---- reacoes: (t, d, e, sd, T, O, H, inst) ----
  var REACTS = {
    happy: { d: 2800, f: function (t, d, e, sd, T, O) { T.arc = 1; T.bend = -10; O.dy += 4 * e * Math.sin(t * 0.0046); T._tau = 160; } },
    love: { d: 3000, f: function (t, d, e, sd, T, O) {
      T.ps = 1.4; T.rx *= 1.1; T.ry *= 1.1; tint(T, 255, 90, 170, 0.45 * e);
      var q = (t * 0.0013) % 1; O.zoom *= 1 + 0.1 * e * (Math.exp(-q * 9) + 0.5 * Math.exp(-Math.abs(q - 0.28) * 22));
    } },
    surprise: { d: 1700, f: function (t, d, e, sd, T, O, H) {
      surprise(T, H); var pop = ease(1 - t / 260); O.zoom *= 1 + 0.08 * pop; O.dy -= 7 * pop; T._tau = 45;
    } },
    angry: { d: 2600, f: function (t, d, e, sd, T, O, H) {
      angry(T, H, 0.46, -24); tint(T, 255, 70, 70, 0.3 * e);
      O.dx += 1.6 * e * (Math.sin(t * 0.05) + 0.6 * Math.sin(t * 0.115)); T._tau = 70;
    } },
    sad: { d: 3200, f: function (t, d, e, sd, T, O, H) {
      T.rot = lerp(H.rot, -14, e); T.cutTop = 0.22 * e; T.lid = 12; T.py += 5 * e; T.rx *= 1 - 0.08 * e; T.ry *= 1 - 0.08 * e;
      tint(T, 110, 98, 255, 0.5 * e); O.dy += 3 * e; O.rot += -3 * sd * e;
    } },
    wink: { d: 1700, f: function (t, d, e, sd, T, O) {
      T.rot += 4 * e; O.rot += 5 * sd * e; var w = t > 300 && t < 950;
      if (sd > 0) T.winkR = w ? 1 : 0; else T.winkL = w ? 1 : 0; T._tau = 60;
    } },
    sleepy: { d: 3600, f: function (t, d, e, sd, T, O, H) {
      var tD = 2000;
      if (t < tD) { var a = ease(t / tD); T.arc = ease((a - 0.55) / 0.45); T.squint = 0.7 * a; T.bend = 9; O.dy += 10 * a; O.rot += 4 * sd * a; T._tau = 380; }
      else { var q = t - tD; surprise(T, H); T.rx *= 1.1 / 1.12; T.ry *= 1.1 / 1.12; O.dy += q < 110 ? lerp(10, -4, ease(q / 110)) : -4 * Math.exp(-(q - 110) / 260); T._tau = 50; }
    } },
    curious: { d: 2800, f: function (t, d, e, sd, T, O, H) {
      T.rot = H.rot * 0.35; T.rx *= 1.07; T.ry *= 1.07; T.ps = 1.1; T.pry = H.pry * 1.5; T.py = H.py * 0.4; T.px = H.px * 0.4;
      O.rot += 11 * sd * e; O.dx += 4 * sd * e;
    } },
    dizzy: { d: 3200, f: function (t, d, e, sd, T, O, H, I) {
      var A = 11 * Math.exp(-t * 0.0009); I.goX = A * Math.cos(t * 0.012); I.goY = 0.8 * A * Math.sin(t * 0.012);
      T.squint = 0.15; O.rot += 8 * e * Math.sin(t * 0.008);
    } },
    look: { d: 3400, f: function (t, d, e, sd, T, O, H, I) {
      I.goX = 12 * Math.sin(t * 0.0042) * e; O.dx += Math.sin(t * 0.0042) * 8 * e;
    } },
    think: { d: 3000, f: function (t, d, e, sd, T, O, H, I) {
      T.cutTop = 0.2 * e; T.lid = -14 * sd; T.rot = H.rot - 4 * e; O.rot += 6 * sd * e; O.dx += 3 * sd * e; I.goX = sd * 9 * e; I.goY = -10 * e;
    } },
    spin: { d: 2900, f: function (t, d, e, sd, T, O) {
      var a = ease(clamp((t - 350) / 1500, 0, 1)); O.rot += sd * 360 * a;
      var c1 = hsv(t * 0.45), c2 = hsv(t * 0.45 + 120);
      if (a > 0 && a < 1) { T.er = c1[0]; T.eg = c1[1]; T.eb = c1[2]; T.er2 = c2[0]; T.eg2 = c2[1]; T.eb2 = c2[2]; }
      O.dy -= 5 * Math.sin(Math.PI * a); T._tau = 60;
    } },
    cute: { d: 2800, f: function (t, d, e, sd, T, O) {
      T.rx *= 1.14; T.ry *= 1.14; T.ps = 1.35; T.py -= 2; O.dy -= 3 * e * Math.abs(Math.sin(t * 0.008));
    } },
    cool: { d: 2600, f: function (t, d, e, sd, T, O, H, I) {
      T.cutTop = 0.35 * e; T.lid = 0; I.goX = sd * 6 * e; I.goY = -3 * e; O.dy -= 2 * e;
    } }
  };
  var ALL = Object.keys(REACTS);

  function KarluEyes(canvas, opt) {
    opt = opt || {};
    this.cv = canvas; this.ctx = canvas.getContext('2d');
    this.face = opt.face || 0;
    this.H = baseStyle(this.face);
    this.cur = Object.assign({}, this.H);
    this.reacts = (opt.reacts && opt.reacts.length) ? opt.reacts.filter(function (r) { return REACTS[r]; }) : ALL;
    if (opt.reacts && opt.reacts[0] === 'all') this.reacts = ALL;
    this.fast = !!opt.fast;
    this.dpr = opt.dpr || Math.min(window.devicePixelRatio || 1, 2);
    this.size = 240;
    this.resize(canvas.clientWidth || 240);
    var now = performance.now();
    this.last = now; this.nextBlink = now + rf(900, 2200); this.blinkT0 = -1; this.blDouble = false;
    this.gX = 0; this.gY = 0; this.gSX = 0; this.gSY = 0; this.gTX = 0; this.gTY = 0; this.gT0 = now; this.gDur = 100; this.nextSacc = now + rf(600, 1500);
    this.mcX = 0; this.mcY = 0; this.mtX = 0; this.mtY = 0; this.nextMicro = now;
    this.hx = 0; this.hy = 0; this.goX = 0; this.goY = 0;
    this.act = null; this.actT0 = 0; this.actD = 0; this.actSide = 1; this.lastAct = '';
    this.nextAct = now + rf(900, 2200) + (opt.delay || 0);
    this.actGap = opt.gap || [3200, 5600];
    this.phase = Math.random() * 1000;
    this.fixedAct = opt.hold || null; // mantem uma reacao parada em loop (ex.: foto do anuncio)
    this.holdUntil = 0;
  }
  KarluEyes.FACES = FACES;
  KarluEyes.REACTS = ALL;

  KarluEyes.prototype.resize = function (cssSize) {
    var px = Math.min(560, Math.max(200, Math.round(cssSize * this.dpr)));
    if (this.cv.width !== px) { this.cv.width = px; this.cv.height = px; }
  };
  KarluEyes.prototype.setFace = function (i) { this.face = i; this.H = baseStyle(i); };
  KarluEyes.prototype.trigger = function (name, now) {
    if (!REACTS[name]) return;
    now = now || performance.now();
    this.act = name; this.actT0 = now; this.actD = REACTS[name].d + rf(0, 300); this.actSide = rsign(); this.lastAct = name;
    if (!this.blinkOn && name !== 'happy' && name !== 'wink' && name !== 'sleepy') this.startBlink(now);
  };
  KarluEyes.prototype.startBlink = function (now) {
    this.blinkOn = true; this.blinkT0 = now; this.blClose = rf(60, 95); this.blHold = rf(25, 60); this.blOpen = rf(100, 150);
    if (!this.blDouble && Math.random() < 0.18) { this.blDouble = true; this.nextBlink = now + rf(220, 320); }
    else { this.blDouble = false; this.nextBlink = now + rf(2300, 4300); }
  };
  KarluEyes.prototype.blinkFactor = function (now) {
    if (!this.blinkOn) return 0;
    var t = now - this.blinkT0;
    if (t < this.blClose) return ease(t / this.blClose);
    if (t < this.blClose + this.blHold) return 1;
    if (t < this.blClose + this.blHold + this.blOpen) return ease(1 - (t - this.blClose - this.blHold) / this.blOpen);
    this.blinkOn = false; return 0;
  };
  KarluEyes.prototype.gazeTo = function (x, y, now) {
    this.gSX = this.gX; this.gSY = this.gY; this.gTX = x; this.gTY = y; this.gT0 = now;
    this.gDur = 55 + Math.hypot(x - this.gX, y - this.gY) * 5;
  };
  KarluEyes.prototype.pickGaze = function (now) {
    var LX = 12, LY = 14, tx, ty, r = Math.random() * 100, away = Math.hypot(this.gTX / LX, this.gTY / LY) > 0.7;
    if (away && r < 70) { tx = rf(-0.25, 0.25) * LX; ty = rf(-0.2, 0.2) * LY; }
    else if (r < 55) { tx = rf(-0.5, 0.5) * LX; ty = rf(-0.35, 0.35) * LY; }
    else if (r < 82) { tx = rsign() * rf(0.65, 1) * LX; ty = rf(-0.3, 0.3) * LY; }
    else { ty = rsign() * rf(0.7, 1) * LY; tx = rf(-0.4, 0.4) * LX; }
    var amp = Math.hypot(tx - this.gX, ty - this.gY);
    this.gazeTo(tx, ty, now);
    this.nextSacc = now + rf(500, 1800) + Math.hypot(tx / LX, ty / LY) * rf(300, 1500);
    if (amp > 12 && !this.blinkOn && Math.random() < 0.35) this.nextBlink = now + rf(20, 70);
  };

  KarluEyes.prototype.frame = function (now) {
    var dt = clamp(now - this.last, 1, 100); this.last = now;
    this.goX = 0; this.goY = 0;
    // olhar
    if (!this.act && now >= this.nextSacc) this.pickGaze(now);
    var gp = (now - this.gT0) / this.gDur;
    if (gp >= 1) { this.gX = this.gTX; this.gY = this.gTY; } else { var ee = ease(gp); this.gX = this.gSX + (this.gTX - this.gSX) * ee; this.gY = this.gSY + (this.gTY - this.gSY) * ee; }
    if (now >= this.nextMicro) { this.mtX = rf(-0.9, 0.9); this.mtY = rf(-0.6, 0.6); this.nextMicro = now + rf(120, 520); }
    var kM = 1 - Math.exp(-dt / 28); this.mcX += (this.mtX - this.mcX) * kM; this.mcY += (this.mtY - this.mcY) * kM;
    var trX = 0.22 * Math.sin(now * 0.043) + 0.15 * Math.sin(now * 0.071 + 1.3), trY = 0.18 * Math.sin(now * 0.057 + 0.7) + 0.1 * Math.sin(now * 0.083);
    // piscar
    if (!this.blinkOn && now >= this.nextBlink) this.startBlink(now);
    var bl = this.blinkFactor(now);
    // reacao
    if (!this.act && now >= this.nextAct) {
      var pool = this.reacts, name, tries = 0;
      do { name = pool[(Math.random() * pool.length) | 0]; tries++; } while (name === this.lastAct && pool.length > 1 && tries < 6);
      this.trigger(name, now);
    }
    var H = this.H, T = Object.assign({}, H); T._tau = 110;
    var kH = 1 - Math.exp(-dt / 200); this.hx += (this.gX * 0.3 - this.hx) * kH; this.hy += (this.gY * 0.25 - this.hy) * kH;
    var ph = this.phase;
    var O = { rot: 1.2 * Math.sin(now * 0.00042 + ph) + 0.7 * Math.sin(now * 0.00117 + 2), dx: Math.sin(now * 0.0009 + 1) + this.hx, dy: 1.4 * Math.sin(now * 0.0013 + ph) + this.hy, zoom: 1 + 0.008 * Math.sin(now * 0.0013 + 0.8) };
    if (this.act) {
      var t = now - this.actT0, d = this.actD;
      if (t >= d) { this.act = null; this.nextAct = now + rf(this.actGap[0], this.actGap[1]); this.nextSacc = now + rf(400, 1200); this.gazeTo(0, 0, now); if (!this.blinkOn) this.nextBlink = now + 60; }
      else { var e = env(t, d, 300, 350); REACTS[this.act].f(t, d, e, this.actSide, T, O, H, this); }
    }
    var br = 1 + 0.012 * Math.sin(now * 0.0013); T.rx *= br; T.ry *= br;
    // suaviza
    var cur = this.cur, kk = 1 - Math.exp(-dt / (T._tau || 110));
    if (T.arc >= 0.5) { if (cur.arc < 0.03) cur.bend = T.bend; } else T.bend = cur.bend;
    for (var k in T) { if (k === '_tau') continue; if (typeof T[k] === 'number') cur[k] += (T[k] - cur[k]) * kk; }
    var gl = Math.hypot(this.gX / 14, this.gY / 14);
    var convEff = cur.conv * (1 - 0.6 * clamp(gl, 0, 1));
    this.draw(cur, bl, this.gX + this.mcX + trX + this.goX, this.gY + this.mcY + trY + this.goY, convEff, O);
  };

  KarluEyes.prototype.draw = function (S, bl, gx, gy, convEff, O) {
    var ctx = this.ctx, k = this.cv.width / 240;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 240);
    var arcA = clamp(S.arc, 0, 1);
    var sqA = ease(arcA / 0.55), aBody = 1 - ease((arcA - 0.56) / 0.22), aArc = ease((arcA - 0.5) / 0.05), arcP = ease((arcA - 0.5) / 0.5);
    var oR = O.rot * D2R, cR = Math.cos(oR), sR = Math.sin(oR);
    for (var i = 0; i < 2; i++) {
      var side = i === 0 ? -1 : 1, wink = i === 0 ? S.winkL : S.winkR;
      var cl = Math.max(bl, S.squint, wink);
      var sy = (1 - cl * 0.96) * (1 - 0.94 * sqA);
      var cx = 120 + side * S.gap, cy = S.cy + S.ry * cl * 0.12 * (1 - arcA), rot = side * S.rot * (1 - 0.75 * arcP);
      var relx = cx - 120, rely = cy - 118;
      var ex = 120 + O.dx + O.zoom * (relx * cR - rely * sR), ey = 118 + O.dy + O.zoom * (relx * sR + rely * cR), er = rot + O.rot;
      var Z = O.zoom;
      var fr = i ? S.er2 : S.er, fg = i ? S.eg2 : S.eg, fb = i ? S.eb2 : S.eb;
      var qr = i ? S.pr2 : S.pr, qg = i ? S.pg2 : S.pg, qb = i ? S.pb2 : S.pb;
      var eyeCol = 'rgb(' + (fr | 0) + ',' + (fg | 0) + ',' + (fb | 0) + ')';
      var rx = S.rx * (1 + 0.05 * cl) * Z, ry = S.ry * sy * Z;
      ctx.save();
      ctx.translate(ex, ey); ctx.rotate(er * D2R);
      if (aBody > 0.01 && ry > 0.3) {
        ctx.save();
        // palpebras (cortes retos)
        var lidA = side * S.lid * D2R;
        ctx.rotate(lidA);
        if (S.cutTop > 0.001) { var d1 = -ry + 2 * ry * S.cutTop; ctx.beginPath(); ctx.rect(-400, d1, 800, 800); ctx.clip(); }
        if (S.cutBot > 0.001) { var d2 = ry - 2 * ry * S.cutBot; ctx.beginPath(); ctx.rect(-400, d2 - 800, 800, 800); ctx.clip(); }
        ctx.rotate(-lidA);
        ctx.globalAlpha = aBody; ctx.fillStyle = eyeCol;
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832); ctx.fill();
        // dentro do olho: brilho + pupila
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832); ctx.clip();
        if (S.band > 1) {
          ctx.globalAlpha = clamp(S.band / 255, 0, 1) * aBody;
          ctx.fillStyle = 'rgb(' + ((fr + (255 - fr) * 0.45) | 0) + ',' + ((fg + (255 - fg) * 0.45) | 0) + ',' + ((fb + (255 - fb) * 0.45) | 0) + ')';
          ctx.beginPath(); ctx.ellipse(0, S.bOy * sy * Z, S.bRx * Z, S.bRy * sy * Z, 0, 0, 6.2832); ctx.fill();
        }
        var pf = ease((sy - 0.08) / 0.22), pa = clamp(S.pa, 0, 1) * aBody * pf;
        if (pa > 0.01) {
          var c0 = Math.cos(er * D2R), s0 = Math.sin(er * D2R);
          var lgx = gx * c0 + gy * s0, lgy = -gx * s0 + gy * c0;
          ctx.globalAlpha = pa; ctx.fillStyle = 'rgb(' + (qr | 0) + ',' + (qg | 0) + ',' + (qb | 0) + ')';
          ctx.beginPath();
          ctx.ellipse((side * S.px * convEff * S.ps + lgx) * Z, ((S.py) * sy + lgy * sy) * Z, S.prx * S.ps * Z, S.pry * S.ps * sy * Z, side * S.prot * D2R, 0, 6.2832);
          ctx.fill();
        }
        ctx.restore();
      }
      if (aArc > 0.02) { // olho fechado ^ ^ / u u
        var rad = 5.6 * KS * (0.3 + 0.7 * arcP) * Z, half = (S.rx * (1 + 0.05 * cl) - rad / Z * 0.75) * Z, bd = S.bend * KS * arcP * Z, yc = -0.5 * bd;
        ctx.globalAlpha = aArc; ctx.strokeStyle = eyeCol; ctx.lineWidth = rad * 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath();
        for (var n = 0; n <= 16; n++) { var u = -1 + 2 * n / 16; var px = u * half, py = yc + bd * (1 - u * u); if (n) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
        ctx.stroke();
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
