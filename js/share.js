/* Compartilhar: foto (PNG) e clipe (video) do display */
(function () {
  'use strict';
  function out(blob, name, text, done) {
    var file; try { file = new File([blob], name, { type: blob.type }); } catch (e) {}
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'Karlu', text: text || 'Meu Karlu | Starlyn Infinite' }).then(function () { done && done('shared'); }).catch(function (e) { if (e && e.name !== 'AbortError') save(blob, name); done && done('cancel'); });
      return;
    }
    save(blob, name); done && done('saved');
  }
  function save(blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  /* foto 1080x1080: display redondo no centro, fundo escuro, legenda */
  function photo(cv, done) {
    var S = 1080, c = document.createElement('canvas'); c.width = c.height = S; var x = c.getContext('2d');
    var g = x.createRadialGradient(S / 2, S * .42, 40, S / 2, S / 2, S * .8); g.addColorStop(0, '#2a1030'); g.addColorStop(1, '#0b0b0f'); x.fillStyle = g; x.fillRect(0, 0, S, S);
    var R = 400, cx = S / 2, cy = S / 2 - 30;
    x.fillStyle = '#cfd2d9'; x.beginPath(); x.arc(cx, cy, R + 14, 0, 6.2832); x.fill();
    x.save(); x.beginPath(); x.arc(cx, cy, R, 0, 6.2832); x.clip(); x.drawImage(cv, cx - R, cy - R, R * 2, R * 2); x.restore();
    x.fillStyle = '#fff'; x.font = '800 44px -apple-system,Segoe UI,Roboto,Arial,sans-serif'; x.textAlign = 'center'; x.fillText('Karlu', S / 2, S - 92);
    x.fillStyle = '#ff42c4'; x.font = '600 26px -apple-system,Segoe UI,Roboto,Arial,sans-serif'; x.fillText('Starlyn Infinite', S / 2, S - 52);
    c.toBlob(function (b) { out(b, 'karlu.png', null, done); }, 'image/png');
  }
  /* clipe: grava o canvas por ms milissegundos (webm/mp4 conforme o navegador) */
  function clip(cv, ms, onStart, done) {
    if (!cv.captureStream || !window.MediaRecorder) { done && done('unsupported'); return; }
    var types = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'], mt = '';
    for (var i = 0; i < types.length; i++) if (MediaRecorder.isTypeSupported(types[i])) { mt = types[i]; break; }
    var rec, chunks = [];
    try { rec = new MediaRecorder(cv.captureStream(30), mt ? { mimeType: mt, videoBitsPerSecond: 4000000 } : undefined); } catch (e) { done && done('unsupported'); return; }
    rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = function () { var t = rec.mimeType || mt || 'video/webm', b = new Blob(chunks, { type: t.split(';')[0] }); out(b, 'karlu.' + (/mp4/.test(t) ? 'mp4' : 'webm'), null, done); };
    rec.start(); onStart && onStart();
    setTimeout(function () { if (rec.state !== 'inactive') rec.stop(); }, ms);
  }
  window.KarluShare = { photo: photo, clip: clip };
})();
