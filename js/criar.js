/* Criar rosto do Karlu */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = $('#ex-disp'), E = el.__eyes, base = { rx: E.H.rx, ry: E.H.ry, gap: E.H.gap };
  var DEF = { c: ['#ff42c4', '#fadcb8', '#ff42c4', '#fadcb8'], link: 1, size: 1, psize: 1, gap: 1, tilt: 7, shape: 'full', ptype: 'dot' };
  var st = JSON.parse(JSON.stringify(DEF)), tT;
  function toast(t) { var n = $('#cfg-toast'); n.textContent = t; n.classList.add('on'); clearTimeout(tT); tT = setTimeout(function () { n.classList.remove('on'); }, 2200); }
  function rgb(h) { var n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function apply() {
    var a = rgb(st.c[0]), b = rgb(st.c[1]), c = rgb(st.c[2]), d = rgb(st.c[3]);
    var v = { er: a[0], eg: a[1], eb: a[2], pr: b[0], pg: b[1], pb: b[2], er2: c[0], eg2: c[1], eb2: c[2], pr2: d[0], pg2: d[1], pb2: d[2], gA: 0,
      rx: base.rx * st.size, ry: base.ry * st.size, ps: st.psize, gap: base.gap * st.gap, rot: st.tilt, cutBot: st.shape === 'dome' ? 0.2 : 0,
      pHeart: st.ptype === 'heart' ? 1 : 0, pStar: st.ptype === 'star' ? 1 : 0, pFlower: st.ptype === 'flower' ? 1 : 0 };
    [E.H, E.cur, E.mid].forEach(function (o) { for (var k in v) o[k] = v[k]; });
  }
  function sync() {
    st.c.forEach(function (h, i) { $('#x-c' + i).value = h; });
    $('#x-link').checked = !!st.link;
    ['size', 'psize', 'gap', 'tilt'].forEach(function (k) { var n = $('#x-' + k); n.value = st[k]; n.nextElementSibling.textContent = st[k]; });
    $$('#x-shape button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === st.shape); });
    $$('#x-ptype button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === st.ptype); });
    apply();
  }
  function enc() { return 'c=' + st.c.map(function (h) { return h.slice(1); }).join(',') + '&l=' + st.link + '&s=' + st.size + '&p=' + st.psize + '&g=' + st.gap + '&t=' + st.tilt + '&h=' + st.shape + '&k=' + st.ptype; }
  function dec(str) {
    try {
      var q = new URLSearchParams(str.replace(/^#/, '')), c = (q.get('c') || '').split(',');
      if (c.length === 4 && c.every(function (x) { return /^[0-9a-f]{6}$/i.test(x); })) st.c = c.map(function (x) { return '#' + x.toLowerCase(); });
      var num = function (k, lo, hi) { var v = parseFloat(q.get(k)); return isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null; };
      st.link = q.get('l') === '0' ? 0 : 1;
      [['s', 'size', .6, 1.4], ['p', 'psize', .5, 1.6], ['g', 'gap', .7, 1.3], ['t', 'tilt', -10, 25]].forEach(function (a) { var v = num(a[0], a[2], a[3]); if (v !== null) st[a[1]] = v; });
      if (/^(full|dome)$/.test(q.get('h'))) st.shape = q.get('h');
      if (/^(dot|heart|star|flower)$/.test(q.get('k'))) st.ptype = q.get('k');
    } catch (x) {}
  }
  function save() { try { history.replaceState(null, '', '#' + enc()); } catch (x) {} }
  [0, 1, 2, 3].forEach(function (i) {
    $('#x-c' + i).addEventListener('input', function (e) {
      st.c[i] = e.target.value;
      if ($('#x-link').checked) { if (i < 2) { st.c[i + 2] = e.target.value; $('#x-c' + (i + 2)).value = e.target.value; } else { st.c[i - 2] = e.target.value; $('#x-c' + (i - 2)).value = e.target.value; } }
      st.link = $('#x-link').checked ? 1 : 0; apply(); save();
    });
  });
  $('#x-link').addEventListener('change', function (e) { st.link = e.target.checked ? 1 : 0; if (st.link) { st.c[2] = st.c[0]; st.c[3] = st.c[1]; sync(); } save(); });
  ['size', 'psize', 'gap', 'tilt'].forEach(function (k) { $('#x-' + k).addEventListener('input', function (e) { st[k] = +e.target.value; e.target.nextElementSibling.textContent = st[k]; apply(); save(); }); });
  [['#x-shape', 'shape'], ['#x-ptype', 'ptype']].forEach(function (p) { $(p[0]).addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; st[p[1]] = b.dataset.v; sync(); save(); }); });
  $('#x-rx').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) E.trigger(b.dataset.r); });
  function hsl(h, s, l) { s /= 100; l /= 100; var k = function (n) { return (n + h / 30) % 12; }, a = s * Math.min(l, 1 - l), f = function (n) { return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); }; return '#' + [f(0), f(8), f(4)].map(function (v) { return ('0' + Math.round(v * 255).toString(16)).slice(-2); }).join(''); }
  $('#x-rand').addEventListener('click', function () {
    var h = Math.random() * 360, h2 = Math.random() < .4 ? h : (h + 60 + Math.random() * 200) % 360, link = Math.random() < .6;
    st.c = [hsl(h, 90, 58), hsl((h + 30) % 360, 70, 88), link ? hsl(h, 90, 58) : hsl(h2, 90, 58), link ? hsl((h + 30) % 360, 70, 88) : hsl((h2 + 30) % 360, 70, 88)];
    st.link = link ? 1 : 0; st.size = +(0.85 + Math.random() * .4).toFixed(2); st.psize = +(0.7 + Math.random() * .7).toFixed(2); st.gap = +(0.9 + Math.random() * .25).toFixed(2); st.tilt = Math.round(Math.random() * 18);
    st.shape = Math.random() < .35 ? 'dome' : 'full'; st.ptype = ['dot', 'dot', 'dot', 'heart', 'star', 'flower'][Math.floor(Math.random() * 6)];
    sync(); save(); E.trigger('cute');
  });
  $('#x-reset').addEventListener('click', function () { st = JSON.parse(JSON.stringify(DEF)); sync(); save(); });
  $('#ex-copy').addEventListener('click', function () {
    save(); var u = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function () { toast('Link copiado!'); }, function () { prompt('Copie o link:', u); });
    else prompt('Copie o link:', u);
  });
  $('#ex-photo').addEventListener('click', function () { KarluShare.photo($('canvas', el), function (r) { if (r === 'saved') toast('Foto salva'); }); });
  if (location.hash.length > 3) dec(location.hash);
  sync();
})();
