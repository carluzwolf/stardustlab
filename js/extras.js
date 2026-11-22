/* Extras do site: modo escuro + registro do PWA */
(function () {
  'use strict';
  var root = document.documentElement;
  function stored() { try { return localStorage.getItem('karlu.theme'); } catch (e) { return null; } }
  function sys() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  function apply(t) {
    root.dataset.theme = t;
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'dark' ? '#0b0b10' : '#ffffff');
    var b = document.querySelector('.theme-btn'); if (b) { b.setAttribute('aria-pressed', t === 'dark'); b.title = t === 'dark' ? 'Modo claro' : 'Modo escuro'; b.innerHTML = t === 'dark' ? SUN : MOON; }
  }
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var hw = document.querySelector('.hdr .wrap');
  if (hw) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'theme-btn'; b.setAttribute('aria-label', 'Alternar modo escuro');
    var burger = hw.querySelector('.burger'); hw.insertBefore(b, burger || null);
    b.addEventListener('click', function () { var t = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('karlu.theme', t); } catch (e) {} apply(t); });
  }
  apply(stored() || sys());
  if (window.matchMedia) { var mq = matchMedia('(prefers-color-scheme: dark)'); var h = function () { if (!stored()) apply(sys()); }; if (mq.addEventListener) mq.addEventListener('change', h); }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
