/* Galeria - lightbox simples (as imagens ja estao no HTML, entao funcionam sem JS) */
(function () {
  'use strict';
  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lb]'));
  if (!links.length) return;
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Imagem ampliada');
  lb.innerHTML = '<button class="x" aria-label="Fechar">&times;</button><button class="pv" aria-label="Anterior">&#8249;</button><button class="nx" aria-label="Próxima">&#8250;</button><img alt=""><p></p>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('p'), cur = 0;
  function show(i) {
    cur = (i + links.length) % links.length;
    var a = links[cur], t = a.querySelector('img');
    img.src = a.getAttribute('href'); img.alt = t ? t.alt : ''; cap.textContent = a.dataset.cap || '';
    lb.classList.add('on'); document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('on'); document.body.style.overflow = ''; }
  links.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); show(i); }); });
  lb.querySelector('.x').addEventListener('click', close);
  lb.querySelector('.pv').addEventListener('click', function () { show(cur - 1); });
  lb.querySelector('.nx').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
