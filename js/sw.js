/* Service worker do Karlu: rede primeiro, cache como reserva (funciona offline depois da primeira visita) */
var V = 'karlu-v1';
var CORE = ['configurar.html', 'criar.html', 'ajuda.html', 'css/style.css', 'css/configurar.css', 'css/extras.css', 'js/products.js', 'js/eyes.js', 'js/main.js', 'js/reacoes.js', 'js/reacoes2.js', 'js/configurar.js', 'js/share.js', 'js/criar.js', 'js/extras.js', 'assets/logo-color.png', 'assets/logo-bw.png', 'assets/favicon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return Promise.all(CORE.map(function (u) { return c.add(u).catch(function () {}); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); }
    return res;
  }).catch(function () { return caches.match(r).then(function (m) { return m || caches.match('configurar.html'); }); }));
});
