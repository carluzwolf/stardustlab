var REACT_NAMES=["Sorrisão", "Sorriso de canto", "Pensando", "Bocejo", "Risada", "Triste", "Surpresa", "Cambalhota", "Não", "Sim", "Curioso", "Piscadinha", "Vesgo", "Resmungando", "Sono", "Troca de rosto", "Olhando em volta", "Rolando os olhos", "Ouvindo atento", "Envergonhado", "Timido", "Chorando", "Solucando", "Com sono", "Piscada lenta", "Desconfiado", "Bravo", "Emburrado", "Entediado", "Assustado", "Encolhido de medo", "Indo pra longe (3D)", "Chegando perto (3D)", "Virando a cabeca (3D)", "Olhar de lado", "Olhando pra cima", "Olhando pra baixo", "Fofura (olhao brilhante)", "Piscadinhas alternadas", "Meio fechado", "Contente ^ ^ (v7: \"sim\" leve e devagar, sem balancar de lado)", "Sonhando u u", "Tonto", "Hipnotizado", "Apaixonado", "Cansado suspirando", "Confuso", "Surpresa leve", "Choque", "Calafrio", "Nervoso", "Pensativo", "Brincalhao", "Empolgado", "Orgulhoso", "Metido", "Borboleta (piscadas rapidas)", "Olhos brilhando", "Vesgo pesado", "Espirro", "Cachorrinho pidao", "Desapontado", "Procurando", "Risinho", "Cabeceando de sono", "Glitch", "De cabeca pra baixo", "Dancando (v7: olho fechado ^ ^ + \"sim\" leve, sem balanco)", "Bola quicando", "Caindo da tela e voltando", "Furioso", "Aliviado", "Duvidando", "Concentrado", "Encarando", "Cantarolando (v7: sem balanco de lado)", "Susto de pulo", "Tontinho (bamboleando)", "R-01 olhos de estrela", "R-02 olhos de coracao", "R-03 ideia!", "R-04 escaneando", "R-05 maquinando", "R-06 dor de gelo", "R-07 com calor", "R-08 enjoado", "R-09 piscadela charmosa", "R-10 soluco", "R-11 reiniciando", "R-12 escondendo e espiando", "R-13 determinado", "R-14 deslumbrado (uau)", "R-15 olhar de gato", "R-16 dormindo Zzz", "R-17 rindo ate chorar", "R-18 modo festa (cores)", "R-19 olhos de cifrao", "R-20 desmaiou (X X)", "R-21 raiva com veia", "R-22 ha?", "R-23 ouvindo musica", "R-24 emocionado", "R-25 plano maligno", "R-26 boom!", "R-27 pegando fogo", "R-28 congelando", "R-29 eletrizado", "R-30 dia de chuva", "R-31 boa noite", "R-32 bom dia", "R-33 alvo travado", "R-34 carregando", "R-35 modo hacker", "R-36 erro de sistema", "R-37 foto!", "R-38 radar", "R-39 hipnose espiral", "R-40 tontura", "R-41 gelatina", "R-42 zoom", "R-43 galaxia nos olhos", "R-44 parabens!", "S-01 bluetooth conectou", "S-02 bluetooth caiu", "S-03 procurando bluetooth", "R-45 feliz de bochecha", "R-46 sorrisao", "R-47 olhos brilhantes felizes", "R-48 carregando / conectado"],FACE_NAMES=["ROSA + bege", "Azul eletrico + celeste", "Verde neon + amarelo claro", "Roxo + rosa claro", "Laranja + amarelo", "Vermelho + branco rosado", "Ciano + azul marinho", "Amarelo + laranja", "Branco gelo + azul", "Lima + verde escuro", "Turquesa + rosa", "Magenta + ciano claro", "Coral + bege", "Azul gelo + violeta", "Dourado + vermelho", "Verde floresta + menta", "Rosa | azul", "Verde | roxo", "Laranja | ciano", "Amarelo | vermelho", "Rosa | ciano", "Azul | laranja", "Verde | rosa", "Roxo | amarelo", "Sakura", "Galaxia", "Fogo & Gelo", "Matrix", "Chiclete", "Ouro branco", "Oceano", "Por do sol", "Menta & rosa", "Lava", "Alienigena", "Sakura | Oceano", "Vampiro", "Neon azul e rosa", "Cobre e turquesa", "Lavanda e manteiga", "Esmeralda e ouro", "Safira e prata", "Rubi e rose", "Ametista", "Mel e chocolate", "Gelo seco", "Pessego e coral", "Limao e roxo", "Lua prata", "Framboesa e menta", "Aurora", "Fantasma", "Lua | Sol", "Rosa | Limao", "Ciano | Magenta", "Vermelho | Azul", "Roxo | Turquesa", "Ouro | Prata", "Esmeralda | Rosa", "Eclipse | Sol", "D-01 Por do sol", "D-02 Oceano fundo", "D-03 Aurora", "D-04 Algodao doce", "D-05 Fogo", "D-06 Floresta", "D-07 Galaxia", "D-08 Vampiro", "D-09 Nuvem", "D-10 Gelo", "D-11 Neon", "D-12 Ouro", "P-01 Polly Sol", "P-02 Sakura da Polly", "P-03 Polly | Ana", "P-04 Pollyana Radiante", "Starboy Original"];
/* Configurar o Karlu - Web Bluetooth (protocolo do firmware starboy v14) */
(function () {
  'use strict';
  var SVC = '7a1c0001-5b1a-4c3e-9d7a-1f0e5a5e0001', RX = '7a1c0002-5b1a-4c3e-9d7a-1f0e5a5e0001', TX = '7a1c0003-5b1a-4c3e-9d7a-1f0e5a5e0001';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var eyes = $('#cfg-disp').__eyes, FACES = KarluEyes.FACES;
  var S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    bt: '<path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/>', eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.6 2.4 2.2 4 2.2s2.8-.6 4-2.2"/><path d="M9 9.5v.5M15 9.5v.5"/>',
    drop: '<path d="M12 3s6 6.4 6 10.5a6 6 0 01-12 0C6 9.400 12 3 12 3z"/>', spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'
  };
  $$('[data-i]').forEach(function (n) { n.innerHTML = '<svg ' + S + '>' + ICONS[n.dataset.i] + '</svg>'; });

  /* ---------- aviso / toast ---------- */
  var toastT, lastHint = 0;
  function toast(t) { var el = $('#cfg-toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 2600); }

  /* ---------- Bluetooth ---------- */
  var dev = null, rxC = null, queue = Promise.resolve(), conn = false, timers = {};
  function setConn(on, label) {
    conn = on; $('#cfg-live').classList.toggle('on', on); $('#cfg-live-t').textContent = on ? 'Karlu conectado' : 'Pré-visualização';
    $('#btn-connect-t').textContent = on ? 'Desconectar' : (label || 'Conectar ao Karlu');
  }
  function send(bytes) {
    if (!conn || !rxC) { if (Date.now() - lastHint > 5000) { lastHint = Date.now(); toast('Só na pré-visualização. Conecte ao Karlu para enviar.'); } return; }
    var d = new Uint8Array(bytes);
    queue = queue.then(function () { return rxC.writeValueWithoutResponse ? rxC.writeValueWithoutResponse(d) : rxC.writeValue(d); }).catch(function () {});
  }
  function sendSoon(key, bytes, ms) { clearTimeout(timers[key]); timers[key] = setTimeout(function () { send(bytes); }, ms || 45); }
  function i8(v) { v = Math.round(v); return (v < -127 ? -127 : v > 127 ? 127 : v) & 255; }

  function unsupported() {
    var w = $('#cfg-warn'); w.hidden = false;
    w.textContent = !window.isSecureContext ? 'O Bluetooth só funciona em página segura (https).' : 'Este navegador não tem Bluetooth Web. No Android use Chrome, Samsung Internet ou Edge. No computador use Chrome ou Edge. iPhone e iPad não são compatíveis.';
  }
  function onTx(e) {
    var v = e.target.value; if (!v || v.byteLength < 12) return;
    if (v.getUint8(0) === 0x10 && v.byteLength >= 19) {
      var id = v.getUint8(17); if (id && id !== lastAct) { lastAct = id; preview(id); $('#cfg-live-t').textContent = 'Karlu: ' + (REACT_NAMES[id - 1] || 'reação'); setTimeout(function () { if (conn) $('#cfg-live-t').textContent = 'Karlu conectado'; }, 2500); } if (!id) lastAct = 0;
    }
  }
  var lastAct = 0;
  async function connect() {
    if (!navigator.bluetooth || !window.isSecureContext) return unsupported();
    $('#cfg-warn').hidden = true;
    try {
      setConn(false, 'Procurando...');
      dev = await navigator.bluetooth.requestDevice({ filters: [{ services: [SVC] }, { name: 'Starboy' }], optionalServices: [SVC] });
      dev.addEventListener('gattserverdisconnected', function () { setConn(false); rxC = null; toast('Karlu desconectado'); });
      var srv = await dev.gatt.connect(), svc = await srv.getPrimaryService(SVC);
      rxC = await svc.getCharacteristic(RX);
      try { var tx = await svc.getCharacteristic(TX); await tx.startNotifications(); tx.addEventListener('characteristicvaluechanged', onTx); } catch (x) {}
      setConn(true); toast('Conectado! O Karlu vai te dar um oi.');
      syncAll();
    } catch (err) { setConn(false); if (err && err.name !== 'NotFoundError') toast('Não consegui conectar. Tente de novo.'); }
  }
  $('#btn-connect').addEventListener('click', function () { if (conn && dev) { dev.gatt.disconnect(); } else connect(); });

  /* ---------- estado ---------- */
  var cur = { face: 0, hold: false, rgb: null, lock: false, charge: false };
  function syncAll() { send([0x02, autoBits()]); }

  /* ---------- rostos ---------- */
  var grid = $('#face-grid');
  function rgb(a, i) { return 'rgb(' + a[i] + ',' + a[i + 1] + ',' + a[i + 2] + ')'; }
  grid.innerHTML = FACES.map(function (f, i) { return '<button type="button" data-f="' + i + '"><i style="--a:' + rgb(f, 0) + ';--b:' + rgb(f, 6) + '"></i><span>' + (FACE_NAMES[i] || 'Rosto ' + i) + '</span></button>'; }).join('');
  function markFace() { $$('button', grid).forEach(function (b) { b.classList.toggle('on', +b.dataset.f === cur.face); }); $('#now-face').textContent = FACE_NAMES[cur.face] || 'Rosto ' + cur.face; }
  function pickFace(i) {
    cur.face = i; if (cur.hold) releaseColor(true);
    eyes.setFace(i); eyes.trigger('cute'); markFace();
    var c = FACES[i]; $('#now-dot').style.background = 'linear-gradient(90deg,' + rgb(c, 0) + ' 50%,' + rgb(c, 6) + ' 50%)'; $('#now-hex').textContent = 'do rosto';
    send([0x0A, i, $('#face-lock').checked ? 1 : 0]);
  }
  grid.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) pickFace(+b.dataset.f); });
  $('#face-q').addEventListener('input', function (e) { var q = e.target.value.toLowerCase(); $$('button', grid).forEach(function (b) { b.hidden = b.textContent.toLowerCase().indexOf(q) < 0; }); });
  markFace();

  /* ---------- cores (roda) ---------- */
  var wc = $('#wheel'), wx = wc.getContext('2d'), hsv = { h: 325, s: .74, v: 1 };
  function hsv2rgb(h, s, v) { var f = function (n) { var k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); }; return [Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255)]; }
  function rgb2hsv(r, g, b) { r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0; if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return { h: h, s: mx ? d / mx : 0, v: mx }; }
  function drawWheel() {
    var n = 300, im = wx.createImageData(n, n), r = n / 2, x, y, k = 0;
    for (y = 0; y < n; y++) for (x = 0; x < n; x++) {
      var dx = x - r + .5, dy = y - r + .5, d = Math.sqrt(dx * dx + dy * dy), p = (y * n + x) * 4;
      if (d > r) { im.data[p + 3] = 0; continue; }
      var a = Math.atan2(dy, dx) * 180 / Math.PI, c = hsv2rgb((a + 360) % 360, d / r, 1);
      im.data[p] = c[0]; im.data[p + 1] = c[1]; im.data[p + 2] = c[2]; im.data[p + 3] = 255;
    }
    wx.putImageData(im, 0, 0);
  }
  drawWheel();
  function hex(c) { return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('').toUpperCase(); }
  function setPrev(c) {
    var H = eyes.H, T = [eyes.cur, eyes.mid];
    [H].concat(T).forEach(function (o) { if (!o) return; o.er = o.er2 = c[0]; o.eg = o.eg2 = c[1]; o.eb = o.eb2 = c[2]; o.gA = 0; });
  }
  function applyColor(c, push) {
    cur.hold = true; cur.rgb = c; setPrev(c); $('#c-hex').value = hex(c);
    $('#now-dot').style.background = hex(c); $('#now-hex').textContent = hex(c);
    var pt = $('#wheel-pt'), a = hsv.h * Math.PI / 180, rr = hsv.s * 50;
    pt.style.left = (50 + Math.cos(a) * rr) + '%'; pt.style.top = (50 + Math.sin(a) * rr) + '%';
    var m = [0x03, c[0], c[1], c[2], 1]; if (push) send(m); else sendSoon('col', m, 50);
  }
  function fromHSV(push) { applyColor(hsv2rgb(hsv.h, hsv.s, hsv.v), push); }
  function wheelAt(e) {
    var b = wc.getBoundingClientRect(), dx = e.clientX - b.left - b.width / 2, dy = e.clientY - b.top - b.height / 2, r = b.width / 2;
    hsv.h = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360; hsv.s = Math.min(1, Math.sqrt(dx * dx + dy * dy) / r); fromHSV(false);
  }
  var wd = false;
  wc.addEventListener('pointerdown', function (e) { wd = true; wc.setPointerCapture(e.pointerId); wheelAt(e); });
  wc.addEventListener('pointermove', function (e) { if (wd) wheelAt(e); });
  wc.addEventListener('pointerup', function () { wd = false; });
  $('#c-v').addEventListener('input', function (e) { hsv.v = e.target.value / 100; $('#c-vo').textContent = e.target.value + '%'; fromHSV(false); });
  $('#c-hex').addEventListener('input', function (e) {
    var m = /^#?([0-9a-f]{6})$/i.exec(e.target.value.trim()); if (!m) return;
    var n = parseInt(m[1], 16), c = [n >> 16, (n >> 8) & 255, n & 255]; hsv = rgb2hsv(c[0], c[1], c[2]); $('#c-v').value = Math.round(hsv.v * 100); $('#c-vo').textContent = Math.round(hsv.v * 100) + '%'; applyColor(c, false);
  });
  $('#c-apply').addEventListener('click', function () { fromHSV(true); toast('Cor aplicada'); });
  function releaseColor(silent) {
    cur.hold = false; send([0x03, 0, 0, 0, 0]); if (silent) return;
    eyes.face = -1; eyes.setFace(cur.face); var c = FACES[cur.face];
    $('#now-dot').style.background = 'linear-gradient(90deg,' + rgb(c, 0) + ' 50%,' + rgb(c, 6) + ' 50%)'; $('#now-hex').textContent = 'do rosto'; toast('Voltou à cor do rosto');
  }
  $('#c-off').addEventListener('click', function () { releaseColor(false); });
  var PRE = ['#FF1493', '#FF42C4', '#FF3B30', '#FF8A00', '#FFD60A', '#7CFF4D', '#00E5A0', '#00D0FF', '#2E5CFF', '#7A3CFF', '#C14BFF', '#FFFFFF'];
  $('#c-pre').innerHTML = PRE.map(function (h) { return '<button type="button" aria-label="Cor ' + h + '" data-h="' + h + '" style="background:' + h + '"></button>'; }).join('');
  $('#c-pre').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; $('#c-hex').value = b.dataset.h; $('#c-hex').dispatchEvent(new Event('input')); fromHSV(true); });
  hsv = rgb2hsv(255, 66, 196); $('#c-hex').value = '#FF42C4';
  $('#wheel-pt').style.left = (50 + Math.cos(hsv.h * Math.PI / 180) * hsv.s * 50) + '%'; $('#wheel-pt').style.top = (50 + Math.sin(hsv.h * Math.PI / 180) * hsv.s * 50) + '%';

  /* ---------- reações ---------- */
  var MAP = [[/cora|amor|paix/i, 'love'], [/estrela|brilh|dsl|deslum/i, 'star'], [/brav|raiva|furios|veia/i, 'angry'], [/triste|chor|solu/i, 'sad'], [/sono|dorm|zzz|noite|boc/i, 'sleepy'], [/ton|espiral|hipnos/i, 'dizzy'], [/susto|choque|assust|medo|boom/i, 'surprise'], [/pisc/i, 'wink'], [/curios|ha\?|ideia/i, 'curious'], [/pens|maquin/i, 'think'], [/risa|feliz|sorri|festa|parab|dan|cantar|bom dia/i, 'happy'], [/cambal|girando|rolando/i, 'spin'], [/vesg/i, 'cross'], [/resmung|determin/i, 'mumble'], [/olhando|escane|radar|alvo/i, 'look'], [/gato|legal|hacker/i, 'cool']];
  var BASE = { 1: 'grin', 2: 'smirk', 3: 'think', 4: 'yawn', 5: 'happy', 6: 'sad', 7: 'surprise', 8: 'spin', 9: 'no', 10: 'yes', 11: 'curious', 12: 'wink', 13: 'cross', 14: 'mumble', 15: 'sleepy' };
  function preview(id) {
    var n = REACT_NAMES[id - 1] || '', k = BASE[id]; if (KarluEyes.R['rx' + id] && KarluEyes.R['rx' + id].exact) { eyes.trigger('rx' + id); return; } if (id === 16) { eyes.face = -1; eyes.setFace((cur.face + 1) % FACES.length); return; }
    if (!k) for (var i = 0; i < MAP.length; i++) if (MAP[i][0].test(n)) { k = MAP[i][1]; break; }
    eyes.trigger(k || 'cute');
  }
  var rg = $('#rx-grid');
  rg.innerHTML = REACT_NAMES.map(function (n, i) { return '<button type="button" data-r="' + (i + 1) + '">' + n + '</button>'; }).join('');
  rg.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var id = +b.dataset.r; preview(id); send([0x01, id]); b.classList.add('fire'); setTimeout(function () { b.classList.remove('fire'); }, 600); });
  $('#rx-q').addEventListener('input', function (e) { var q = e.target.value.toLowerCase(); $$('button', rg).forEach(function (b) { b.hidden = b.textContent.toLowerCase().indexOf(q) < 0; }); });

  /* ---------- atalhos ---------- */
  $('#q-blink').addEventListener('click', function () { eyes.startBlink(performance.now()); send([0x09]); });
  $('#q-random').addEventListener('click', function () { var id = 1 + Math.floor(Math.random() * 129); preview(id); send([0x01, id]); toast(REACT_NAMES[id - 1]); });
  $('#q-charge').addEventListener('click', function (e) { cur.charge = !cur.charge; e.currentTarget.classList.toggle('on', cur.charge); send([0x0B, cur.charge ? 1 : 0]); if (cur.charge) eyes.trigger('happy'); });

  /* ---------- olhar ---------- */
  var pad = $('#pad'), pd = false;
  function padAt(e) {
    var b = pad.getBoundingClientRect(), r = b.width / 2, x = (e.clientX - b.left - r) / r, y = (e.clientY - b.top - r) / r, d = Math.sqrt(x * x + y * y);
    if (d > 1) { x /= d; y /= d; }
    $('#pad-pt').style.left = (50 + x * 50) + '%'; $('#pad-pt').style.top = (50 + y * 50) + '%';
    $('#g-on').checked = true; eyes.gazeTo(x * 10, y * 10, performance.now()); sendSoon('gz', [0x07, 1, i8(x * 50), i8(y * 50)], 50);
  }
  pad.addEventListener('pointerdown', function (e) { pd = true; pad.setPointerCapture(e.pointerId); padAt(e); });
  pad.addEventListener('pointermove', function (e) { if (pd) padAt(e); });
  pad.addEventListener('pointerup', function () { pd = false; });
  $('#g-on').addEventListener('change', function (e) { if (!e.target.checked) { send([0x07, 0, 0, 0]); $('#pad-pt').style.left = '50%'; $('#pad-pt').style.top = '50%'; } else send([0x07, 1, 0, 0]); });

  /* ---------- ajustes finos (modo manual) ---------- */
  var FINE = [['Inclinação', -10, 30, 1, 9, .3], ['Tamanho do olho', .4, 2, .02, 1, .02], ['Pupila', .4, 2, .02, 1, .02], ['Olho apertado', 0, 1, .01, 0, .01], ['Vesgo', 0, 2.5, .02, 1, .02], ['Piscadinha esq.', 0, 1, .01, 0, .01], ['Piscadinha dir.', 0, 1, .01, 0, .01], ['Giro do rosto', -40, 40, 1, 0, .5], ['Rosto na horizontal', -40, 40, 1, 0, .4], ['Rosto na vertical', -40, 40, 1, 0, .4], ['Zoom do rosto', .6, 1.4, .01, 1, .005]];
  var fv = FINE.map(function (f) { return f[4]; });
  $('#fine-list').innerHTML = FINE.map(function (f, i) { return '<label class="cfg-sl"><span>' + f[0] + '</span><input type="range" data-k="' + i + '" min="' + f[1] + '" max="' + f[2] + '" step="' + f[3] + '" value="' + f[4] + '"><output>' + f[4] + '</output></label>'; }).join('');
  function pushFine() { var m = [0x05]; FINE.forEach(function (f, i) { m.push(i8(i === 10 ? (fv[i] - 1) / .005 : fv[i] / f[5])); }); sendSoon('fine', m, 60); }
  $('#fine-list').addEventListener('input', function (e) { var k = +e.target.dataset.k; fv[k] = +e.target.value; e.target.nextElementSibling.textContent = fv[k]; if (!$('#m-on').checked) { $('#m-on').checked = true; send([0x06, 1]); } pushFine(); });
  $('#m-on').addEventListener('change', function (e) { send([0x06, e.target.checked ? 1 : 0]); if (e.target.checked) pushFine(); });
  $('#m-reset').addEventListener('click', function () { $$('#fine-list input').forEach(function (n, i) { n.value = FINE[i][4]; fv[i] = FINE[i][4]; n.nextElementSibling.textContent = FINE[i][4]; }); pushFine(); });

  /* ---------- modo automatico ---------- */
  function autoBits() { return ($('#a-act').checked ? 1 : 0) | ($('#a-blink').checked ? 2 : 0) | ($('#a-gaze').checked ? 4 : 0) | ($('#a-mic').checked ? 8 : 0); }
  $$('#pane-auto input').forEach(function (n) { n.addEventListener('change', function () { send([0x02, autoBits()]); }); });

  /* ---------- abas ---------- */
  $$('.cfg-tabs button').forEach(function (b) { b.addEventListener('click', function () {
    $$('.cfg-tabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
    $$('.cfg-pane').forEach(function (p) { p.classList.toggle('on', p.id === 'pane-' + b.dataset.tab); });
  }); });
  if (!navigator.bluetooth) unsupported();
})();
 (n) { n.addEventListener('change', function () { send([0x02, autoBits()
