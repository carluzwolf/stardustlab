/* Starlyn Infinite - comportamento do site */
(function () {
  'use strict';
  var C = window.STARLYN, P = window.KARLU_PRODUCTS, CMP = window.KARLU_COMPARE;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : (v > b ? b : v); };

  function money(v) { return C.currency + ' ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function buyLink(p) {
    if (p.buyUrl) return p.buyUrl;
    if (C.whatsapp) return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent('Oi! Quero comprar o ' + p.name + '.');
    return C.instagram;
  }
  var ICON = {
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v4"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/></svg>',
    gyro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    bt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 003.4 17.3L2 22l4.8-1.3A11 11 0 1020.5 3.5zM12 20a8.9 8.9 0 01-4.5-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8.9 8.9 0 1112 20zm4.9-6.6c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.3 7.3 0 01-3.6-3.1c-.3-.5.3-.5.8-1.5a.5.5 0 000-.5c-.1-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4.1c1.7.7 2.4.8 3.2.7a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- header / footer ---------- */
  var path = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  function nav(h, label, key) { return '<a href="' + h + '"' + (path === key ? ' class="on"' : '') + '>' + label + '</a>'; }
  var hdr = document.createElement('header');
  hdr.className = 'hdr';
  hdr.innerHTML = '<div class="wrap"><a class="logo" href="index.html" aria-label="Starlyn Infinite"><img src="assets/logo-color.png" alt="Starlyn Infinite" width="63" height="40"></a>' +
    '<nav class="nav">' + nav('index.html', 'Início', 'index') + nav('sobre.html', 'Starlyn', 'sobre') + nav('karlu.html', 'Projeto Karlu', 'karlu') + nav('galeria.html', 'Galeria', 'galeria') +
    '<a href="index.html#modelos" class="cta">Ver modelos</a></nav><button class="burger" aria-label="Abrir menu"><span></span></button></div>';
  document.body.insertBefore(hdr, document.body.firstChild);
  $('.burger', hdr).addEventListener('click', function () { document.body.classList.toggle('menu-open'); });
  $$('.nav a', hdr).forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('menu-open'); }); });
  function onScroll() { hdr.classList.toggle('scrolled', window.scrollY > 10); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var ftr = document.createElement('footer');
  ftr.className = 'ftr';
  var contact = '<li><a href="' + C.instagram + '" target="_blank" rel="noopener">Instagram ' + C.instagramHandle + '</a></li>' +
    (C.whatsapp ? '<li><a href="https://wa.me/' + C.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a></li>' : '') +
    (C.email ? '<li><a href="mailto:' + C.email + '">' + C.email + '</a></li>' : '');
  ftr.innerHTML = '<div class="wrap"><div class="row"><div><img src="assets/logo-bw.png" alt="Starlyn Infinite" width="88" height="56"><p>Tecnologia brasileira, criada em Salvador, Bahia. O Karlu é o primeiro projeto da Starlyn Infinite.</p></div>' +
    '<div><h4>Navegar</h4><ul><li><a href="index.html">Início</a></li><li><a href="sobre.html">Sobre a Starlyn Infinite</a></li><li><a href="karlu.html">Projeto Karlu</a></li><li><a href="galeria.html">Galeria</a></li></ul></div>' +
    '<div><h4>Modelos</h4><ul>' + P.map(function (p) { return '<li><a href="produto.html?v=' + p.id + '">' + p.name + '</a></li>'; }).join('') + '</ul></div>' +
    '<div><h4>Contato</h4><ul>' + contact + '</ul></div></div>' +
    '<div class="copy"><span>© ' + new Date().getFullYear() + ' Starlyn Infinite. Todos os direitos reservados.</span><span class="legal-links"><a href="terms.html">Termos de Serviço</a> · <a href="privacy.html">Política de Privacidade</a></span><span>Feita no Brasil, em Salvador (BA).</span></div></div>';
  document.body.appendChild(ftr);

  /* ---------- display 3D ---------- */
  var scrollItems = [], dragItems = [], stageItems = [], studioItems = [];
  var mouse = { x: 0, y: 0 };
  window.addEventListener('pointermove', function (e) { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });

  function buildDisp(el) {
    if (el.__built) return el.__eyes; el.__built = true;
    var edges = '';
    for (var k = -2; k <= 2; k++) edges += '<div class="disp-edge" style="transform:translateZ(calc(var(--t) * ' + (k * 0.25) + '))"></div>';
    el.classList.add('disp');
    el.innerHTML = '<div class="disp-float"><div class="disp-3d">' + edges +
      '<div class="disp-back"><img src="assets/logo-bw.png" alt="" loading="lazy"><small>Karlu</small></div>' +
      '<div class="disp-front"><canvas></canvas></div></div></div><div class="disp-shadow"></div>';
    if (el.dataset.float === '0') el.classList.add('nofloat');
    if (el.dataset.shadow === '0') el.classList.add('noshadow');
    el.style.setProperty('--fd', (-Math.random() * 6).toFixed(2) + 's');
    var cv = $('canvas', el), d3 = $('.disp-3d', el);
    var face = parseInt(el.dataset.face || '0', 10);
    var reacts = el.dataset.react ? el.dataset.react.split(',') : ['all'];
    var gap = el.dataset.gap ? el.dataset.gap.split(',').map(Number) : null;
    var eyes = new KarluEyes(cv, { face: face, reacts: reacts, gap: gap || undefined, delay: parseInt(el.dataset.delay || '0', 10), dpr: Math.min(window.devicePixelRatio || 1, 2) });
    el.__eyes = eyes; el.__d3 = d3;
    if (reduce) KarluEyes.still(eyes, reacts[0] === 'all' ? 'happy' : reacts[0]); else KarluEyes.add(eyes);
    var mode = el.dataset.mode || 'scroll';
    var it = { el: el, d3: d3, cur: { rx: 0, ry: 0 }, vis: false };
    if (mode === 'scroll') { it.spin = parseFloat(el.dataset.spin || '1'); it.phase = parseFloat(el.dataset.phase || '0'); it.par = parseFloat(el.dataset.par || '0'); scrollItems.push(it); watch(it); }
    else if (mode === 'studio') { it.base = [parseFloat(el.dataset.rx || '5'), parseFloat(el.dataset.ry || '-15')]; it.host = el.closest('.pcard') || el; studioItems.push(it); watch(it); setT(it, it.base[0], it.base[1]); }
    else if (mode === 'drag') { it.ry = -16; it.rx = 5; it.vel = 0; it.target = null; dragItems.push(it); watch(it); initDrag(it); }
    else if (mode === 'stage') { it.stage = el.closest('.stage'); stageItems.push(it); watch(it); }
    else { setT(it, 0, 0); }
    return eyes;
  }
  function setT(it, rx, ry) { it.d3.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)'; }
  function watch(it) {
    if (!('IntersectionObserver' in window)) { it.vis = true; return; }
    new IntersectionObserver(function (en) { it.vis = en[0].isIntersecting; }, { rootMargin: '200px' }).observe(it.el);
  }
  function initDrag(it) {
    var host = it.el.closest('.studio') || it.el, down = false, lx = 0;
    host.addEventListener('pointerdown', function (e) { down = true; lx = e.clientX; it.vel = 0; it.target = null; try { host.setPointerCapture(e.pointerId); } catch (x) {} });
    host.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - lx; lx = e.clientX; it.ry += dx * 0.55; it.vel = dx * 0.55; });
    var up = function () { if (!down) return; down = false; it.idle = performance.now(); };
    host.addEventListener('pointerup', up); host.addEventListener('pointercancel', up);
    it.spinOnce = function () { it.target = Math.round(it.ry / 360) * 360 + 360; it.vel = 0; };
    it.el.__item = it;
  }

  var smooth = { };
  function raf() {
    requestAnimationFrame(raf);
    var vh = innerHeight, sy = scrollY, i, it, r, p;
    for (i = 0; i < scrollItems.length; i++) {
      it = scrollItems[i]; if (!it.vis) continue;
      r = it.el.getBoundingClientRect();
      p = (vh - (r.top + r.height / 2)) / vh;               // 0 entrando por baixo, 1 saindo por cima
      var ty = (p - 0.5) * 360 * it.spin + it.phase + mouse.x * 10 * (it.par || 1);
      var tx = (0.5 - p) * 14 + mouse.y * -6 * (it.par || 1);
      it.cur.ry += (ty - it.cur.ry) * 0.14; it.cur.rx += (tx - it.cur.rx) * 0.14;
      setT(it, it.cur.rx, it.cur.ry);
    }
    for (i = 0; i < stageItems.length; i++) {
      it = stageItems[i]; if (!it.vis || !it.stage) continue;
      r = it.stage.getBoundingClientRect();
      p = clamp(-r.top / (r.height - vh), 0, 1);
      var sty = p * 720 + mouse.x * 8, stx = Math.sin(p * 6.283) * 8 + mouse.y * -5;
      it.cur.ry += (sty - it.cur.ry) * 0.12; it.cur.rx += (stx - it.cur.rx) * 0.12;
      setT(it, it.cur.rx, it.cur.ry);
      var steps = $$('.step', it.stage), dots = $$('.dots i', it.stage), idx = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
      steps.forEach(function (s, k) { s.classList.toggle('on', k === idx); }); dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); });
    }
    for (i = 0; i < studioItems.length; i++) {
      it = studioItems[i]; if (!it.vis) continue;
      var h = it.host, hot = h.__hot, tgx = it.base[1], tgy = it.base[0];
      if (hot) { tgx = it.base[1] * 0.2 + h.__mx * 22; tgy = it.base[0] * 0.2 - h.__my * 14; }
      it.cur.ry += (tgx - it.cur.ry) * 0.1; it.cur.rx += (tgy - it.cur.rx) * 0.1;
      setT(it, it.cur.rx, it.cur.ry);
    }
    for (i = 0; i < dragItems.length; i++) {
      it = dragItems[i]; if (!it.vis) continue;
      if (it.target !== null && it.target !== undefined) { it.ry += (it.target - it.ry) * 0.07; if (Math.abs(it.target - it.ry) < 0.3) { it.ry = it.target; it.target = null; } }
      else {
        it.ry += it.vel; it.vel *= 0.94;
        if (it.idle && performance.now() - it.idle > 1400) { var n = Math.round((it.ry + 16) / 360) * 360 - 16; it.ry += (n - it.ry) * 0.04; }
      }
      setT(it, it.rx, it.ry);
    }
  }
  if (!reduce) requestAnimationFrame(raf);

  function hookStudio(card) {
    card.addEventListener('pointermove', function (e) { var b = card.getBoundingClientRect(); card.__mx = ((e.clientX - b.left) / b.width - 0.5) * 2; card.__my = ((e.clientY - b.top) / b.height - 0.5) * 2; card.__hot = true; });
    card.addEventListener('pointerleave', function () { card.__hot = false; });
  }

  /* ---------- cards de anuncio ---------- */
  function cardHTML(p) {
    return '<a class="pcard rv" href="produto.html?v=' + p.id + '" aria-label="' + p.name + '">' +
      '<span class="badge">Em breve</span>' + '<span class="tagpill">' + p.tag + '</span>' +
      '<div class="studio"><div class="floor"></div><div class="disp" data-mode="studio" data-face="' + p.face + '" data-react="' + p.holdReact + '" data-gap="500,1100" data-float="0"></div><div class="glint"></div></div>' +
      '<div class="body"><h3>' + p.name + '</h3><div class="tl">' + p.tagline + '</div><p>' + p.short + '</p>' +
      '<div class="price"><b>Em breve</b><small>Preço a definir</small></div>' +
      '<span class="btn btn-pink btn-block" style="margin-top:8px">Ver detalhes ' + ICON.arrow + '</span></div></a>';
  }
  $$('[data-cards]').forEach(function (box) {
    var skip = box.dataset.skip === 'auto' ? (new URLSearchParams(location.search).get('v') || 'v1').toLowerCase() : box.dataset.skip;
    box.innerHTML = P.filter(function (p) { return p.id !== skip; }).map(cardHTML).join('');
    $$('.pcard', box).forEach(hookStudio);
  });

  /* ---------- comparativo ---------- */
  $$('[data-compare]').forEach(function (box) {
    box.innerHTML = '<div class="cmp-wrap"><table class="cmp"><thead><tr><th></th>' + P.map(function (p) { return '<th>' + p.name + '</th>'; }).join('') + '</tr></thead><tbody>' +
      CMP.map(function (r) { return '<tr><td>' + r[0] + '</td>' + r[1].map(function (v) { return '<td>' + (v ? '<span class="y">✓</span>' : '<span class="n">—</span>') + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody><tfoot><tr><td></td>' + P.map(function (p) { return '<td style="padding:18px 8px"><b>Em breve</b></td>'; }).join('') + '</tr></tfoot></table></div>';
  });

  /* ---------- faixa de expressoes ---------- */
  $$('[data-reels]').forEach(function (box) {
    var L = [['Feliz', 'happy', 0], ['Apaixonado', 'love', 20], ['Surpreso', 'surprise', 2], ['Bravo', 'angry', 5], ['Triste', 'sad', 1], ['Piscadinha', 'wink', 3], ['Sonolento', 'sleepy', 13], ['Tonto', 'dizzy', 16], ['Curioso', 'curious', 6], ['Fofo', 'cute', 10]];
    var one = L.map(function (x) { return '<div class="reel-card"><div class="disp nofloat noshadow" data-mode="flat" data-face="' + x[2] + '" data-react="' + x[1] + '" data-gap="700,1400" data-delay="' + (Math.random() * 1500 | 0) + '"></div><span>' + x[0] + '</span></div>'; }).join('');
    box.innerHTML = '<div class="reel-track">' + one + one + '</div>';
  });

  /* ---------- pagina do produto ---------- */
  var pp = $('#pp-root');
  if (pp) {
    var id = (new URLSearchParams(location.search).get('v') || 'v1').toLowerCase();
    var p = P.filter(function (x) { return x.id === id; })[0] || P[0];
    document.title = p.name + ' | Starlyn Infinite';
    var FC = KarluEyes.FACES, sw = [0, 1, 2, 3, 4, 5, 6, 14, 16, 20, 18, 10];
    var swHTML = sw.map(function (i) {
      var c = FC[i], a = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')', b = 'rgb(' + c[6] + ',' + c[7] + ',' + c[8] + ')';
      return '<button class="sw' + (i === p.face ? ' on' : '') + '" data-face="' + i + '" aria-label="Cor ' + i + '" style="background:linear-gradient(90deg,' + a + ' 50%,' + b + ' 50%)"></button>';
    }).join('');
        pp.innerHTML =
      '<div class="wrap"><div class="pp-gallery"><div class="studio big"><div class="floor"></div><div class="disp" data-mode="drag" data-face="' + p.face + '" data-react="' + p.react.join(',') + '" data-gap="900,2200" data-float="0"></div></div>' +
      '<p class="pp-hint">Arraste para girar o Karlu · <button id="spin1" style="color:var(--pink);font-weight:700">girar 360°</button></p></div>' +
      '<div class="pp-info"><div class="crumb"><a href="index.html">Início</a> / <a href="index.html#modelos">Modelos</a> / ' + p.name + '</div>' +
      '<span class="eyebrow">' + p.tag + '</span><h1>' + p.name + '</h1><div class="tl">' + p.tagline + '</div><p class="desc">' + p.long + '</p>' +
      '<div class="pp-price"><b>Em breve</b><small>Preço a definir · lançamento previsto para ' + C.launch + '</small></div>' +
      '<div class="swatches"><label>Escolha o olhar</label><div class="sw-row">' + swHTML + '</div></div>' +
      '<div class="pp-buy"><a class="btn btn-pink btn-lg btn-block" href="' + C.instagram + '" target="_blank" rel="noopener">Quero ser avisado do lançamento</a>' +
      '<a class="btn btn-ghost btn-block" href="index.html#modelos">Ver os outros modelos</a></div>' +
      '<ul class="list">' + p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
      '<div class="trust"><span>✓ Controle por Bluetooth</span><span>✓ Criado em Salvador (BA)</span><span>✓ Tecnologia 100% brasileira</span></div></div></div>';
    var dEl = $('.disp', pp), d = buildDisp(dEl);
    $$('.sw', pp).forEach(function (b) { b.addEventListener('click', function () { $$('.sw', pp).forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); d.setFace(parseInt(b.dataset.face, 10)); d.trigger('cute'); }); });
    $('#spin1').addEventListener('click', function () { if (dEl.__item) dEl.__item.spinOnce(); d.trigger('spin'); });
    var fq = $('#faq-list');
    if (fq) fq.innerHTML = [
      ['Quando o Karlu será lançado?', 'O Karlu está em desenvolvimento e o lançamento está previsto para ' + C.launch + '. Siga a Starlyn Infinite no Instagram ' + C.instagramHandle + ' para acompanhar as novidades em primeira mão.'],
      ['Quanto vai custar?', 'O preço de cada versão ainda será definido. Assim que for anunciado, ele aparece aqui, na página de cada modelo.'],
      ['Como troco a cor dos olhos?', 'Pelo Bluetooth você escolhe entre 24 combinações de cores e dispara qualquer uma das 78 reações. O Karlu também troca de rosto sozinho, com uma nuvem de fumaça, a cada 1 a 3 minutos.'],
      ['Qual a diferença entre a V1, a V2 e a V3?', 'A V1 é o bichinho virtual de olhos animados. A V2 adiciona microfone com amplificador de voz e alto-falante. A V3 soma giroscópio e câmera, para reagir ao movimento e aos seus gestos.']
    ].map(function (q) { return '<details><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('');
  }

  /* ---------- monta todos os displays da pagina ---------- */
  $$('.disp').forEach(function (el) { if (!el.__built) buildDisp(el); });

  /* ---------- reveal ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    rv.forEach(function (el, i) { el.style.setProperty('--d', ((i % 3) * 0.08) + 's'); io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });
  document.addEventListener('DOMContentLoaded', function () {});
  // cards inseridos depois do primeiro passe
  setTimeout(function () { $$('.rv:not(.in)').forEach(function (el) { if (!('IntersectionObserver' in window)) el.classList.add('in'); }); }, 0);
})();
    
