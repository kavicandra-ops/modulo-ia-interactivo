/* Laboratorios del Taller 3 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};
  var S = M.s;

  /* =====================================================================
     Utilidades: números en español (las mismas reglas que la fuente),
     escalas, interfaz, tooltip y animación
     ===================================================================== */
  var L10 = Math.log10, TAU = Math.PI * 2;
  function P10(e) { return Math.pow(10, e); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  var pw = m2.pw;
  /* 2.198e18 → «2,2 × 10¹⁸»; d = decimales de la mantisa */
  function sci(v, d, keepOne) {
    if (d == null) d = 1;
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(L10(Math.abs(v)) + 1e-9);
    var ms = (Math.abs(v) / P10(e)).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; ms = (Math.abs(v) / P10(e)).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ','), sg = v < 0 ? '−' : '';
    if (mant === '1' && !keepOne) return sg + pw(e);
    return sg + mant + ' × ' + pw(e);
  }
  /* Cantidades grandes en palabras: 4,7e7 → «47 millones» */
  function words(n) {
    if (n >= 1e12) return fmt(n / 1e12, n < 1e13 ? 1 : 0) + ' billones';
    if (n >= 1e9) return fmt(n / 1e9, n < 1e10 ? 1 : 0).replace(/,0$/, '') + ' mil millones';
    if (n >= 1e6) { var v = n / 1e6, s = fmt(v, v < 10 ? 1 : 0).replace(/,0$/, ''); return s + (s === '1' ? ' millón' : ' millones'); }
    if (n >= 1e4) return fmt(Math.round(n / 100) * 100);
    return fmt(n, n < 10 && n % 1 ? 1 : 0);
  }
  /* Escala larga en palabras, con dos cifras significativas: 3,5e16 → «35.000 billones» */
  function longName(v) {
    if (!isFinite(v) || v <= 0) return '0';
    var e0 = Math.floor(L10(v)), q = P10(e0 - 1);
    v = Math.round(v / q) * q;
    if (v < 1e6) return v < 10 ? fmt(v, v % 1 ? 1 : 0) : fmt(Math.round(v));
    var U = [[1e30, 'quintillón', 'quintillones'], [1e24, 'cuatrillón', 'cuatrillones'], [1e18, 'trillón', 'trillones'], [1e12, 'billón', 'billones'], [1e6, 'millón', 'millones']];
    for (var i = 0; i < U.length; i++) {
      var u = U[i][0];
      if (v < u * 0.9999) continue;
      var m = v / u;
      if (Math.abs(m - 1) < 1e-6) return '1 ' + U[i][1];
      if (Math.abs(m - 1000) < 1e-3) return 'mil ' + U[i][2];
      return fmt(m, m < 10 && Math.abs(m - Math.round(m)) > 1e-6 ? 1 : 0) + ' ' + U[i][2];
    }
    return fmt(v);
  }
  /* Valor con prefijo del SI: 3200 → «3,2 kW» */
  function siUnit(v, unit) {
    var P = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f'], [1e-18, 'a'], [1e-21, 'z']];
    for (var i = 0; i < P.length; i++) {
      var k = P[i][0];
      if (v >= k * 0.9995) { var m = v / k; return fmt(m, m < 10 && Math.abs(m - Math.round(m)) > 0.05 ? 1 : 0) + ' ' + P[i][1] + unit; }
    }
    return sci(v, 1) + ' ' + unit;
  }
  function cerebros(n) { var w = words(n); return w + (/(millones|millón|billones)$/.test(w) ? ' de cerebros' : (n < 1.5 ? ' cerebro' : ' cerebros')); }
  /* Energía en la unidad más legible */
  function joules(J) {
    var parts = [siUnit(J, 'J')], wh = J / 3600;
    if (wh >= 1e9) parts.push(fmt(wh / 1e12, wh / 1e12 < 10 ? 2 : 1) + ' TWh');
    else if (wh >= 1e6) parts.push(fmt(wh / 1e6, wh / 1e6 < 10 ? 2 : 1) + ' MWh');
    else if (wh >= 1e3) parts.push(fmt(wh / 1e3, wh / 1e3 < 10 ? 2 : 1) + ' kWh');
    else if (wh >= 0.01) parts.push(fmt(wh, wh < 10 ? 2 : 1) + ' Wh');
    return parts.join(' = ');
  }
  /* Duración legible */
  function dur(s) {
    if (s < 1e-6) return sci(s, 1, true) + ' s';
    if (s < 1) return siUnit(s, 's');
    if (s < 120) return fmt(s, s < 10 ? 1 : 0) + ' s';
    if (s < 7200) return fmt(s / 60, s < 600 ? 1 : 0) + ' min';
    if (s < 172800) return fmt(s / 3600, s < 36000 ? 1 : 0) + ' h';
    if (s < 3.156e7 * 2) return fmt(s / 86400, s < 864000 ? 1 : 0) + ' días';
    var y = s / 3.156e7;
    return (y >= 1e6 ? words(y) : fmt(y, y < 10 ? 1 : 0)) + ' años';
  }
  /* Número con 2–3 cifras significativas, en notación normal si cabe */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1, true).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Deslizador logarítmico: posición 0..1000 ↔ valor */
  function logMap(lo, hi) {
    var a = L10(lo), b = L10(hi);
    return {
      toV: function (pp) { return Math.pow(10, a + (b - a) * pp / 1000); },
      toP: function (v) { return Math.round((L10(v) - a) / (b - a) * 1000); }
    };
  }

  /* ---------- Interfaz ---------- */
  var nId = 0;
  function uid(pref) { return 't3-' + pref + '-' + (++nId); }
  /* Deslizador con etiqueta, lectura y ayuda; «on» solo se llama al moverlo */
  function rango(o) {
    var id = uid('r');
    var out = h('output', { class: 'desl-v', for: id });
    var inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    var fila = h('div', { class: 'desl t3-desl' + (o.dim ? ' t3-d-' + o.dim : '') }, h('label', { for: id }, o.label), inp, out);
    var wrap = o.help ? h('div', { class: 't3-ctrl' }, fila, h('p', { class: 'w-note-s' }, rich(o.help))) : fila;
    function upd() { out.textContent = o.fmt ? o.fmt(+inp.value) : inp.value; }
    inp.addEventListener('input', function () { upd(); if (o.on) o.on(+inp.value); });
    upd();
    return { wrap: wrap, inp: inp, out: out, set: function (v) { inp.value = v; upd(); } };
  }
  /* Botones de elección con aria-pressed */
  function chips(items, on, o) {
    o = o || {};
    var g = h('div', { class: 'chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === (o.sel == null ? -1 : o.sel)) }, it.l || it);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(it, i); });
      g.appendChild(b);
      return b;
    });
    g.pick = function (i) { bs.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === i)); }); };
    g.limpiar = function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); };
    return g;
  }
  function outBox() { return h('div', { class: 'm2-out t3-out', 'aria-live': 'polite' }); }
  function sayBox() { return h('p', { class: 't3-say', 'aria-live': 'polite' }); }
  function decir(el, txt) { M.clear(el); el.appendChild(rich(txt)); }
  function linea(k, resto) { return h('div', null, h('span', { class: 't3-k' }, k), resto); }
  function tabla(cab, filas, titulo) {
    return h('div', { class: 'tablewrap m2-tabla t3-tabla' }, h('table', null,
      titulo ? h('caption', { class: 'sr-only' }, titulo) : null,
      h('thead', null, h('tr', null, cab.map(function (c) { return h('th', { scope: 'col' }, c); }))),
      h('tbody', null, filas.map(function (f) {
        return h('tr', null, f.map(function (v, i) { return h('td', { class: i > 0 && /^[~≈<>0-9−\-]/.test(String(v)) ? 't3-n' : null }, v); }));
      }))));
  }

  /* ---------- Tooltip (el compartido de la aplicación) ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tipHtml(lines) { return lines.filter(Boolean).map(function (l, i) { return '<div class="' + (i === 0 ? 't3-tipv' : 't3-tipl') + '">' + esc(l) + '</div>'; }).join(''); }
  function tipShow(lines, x, y) { if (M.tipShow) M.tipShow(tipHtml(lines), x, y); }
  function tipHide() { if (M.tipHide) M.tipHide(); }
  function bindTip(el, getLines) {
    el.setAttribute('tabindex', '0');
    el.addEventListener('pointerenter', function (e) { el.classList.add('on'); tipShow(getLines(), e.clientX, e.clientY); });
    el.addEventListener('pointermove', function (e) { tipShow(getLines(), e.clientX, e.clientY); });
    el.addEventListener('pointerleave', function () { el.classList.remove('on'); tipHide(); });
    el.addEventListener('focus', function () { el.classList.add('on'); var r = el.getBoundingClientRect(); tipShow(getLines(), r.left + r.width / 2, r.top); });
    el.addEventListener('blur', function () { el.classList.remove('on'); tipHide(); });
  }

  /* ---------- SVG ---------- */
  function T(g, x, y, txt, cls, extra) {
    var t = S('text', Object.assign({ x: x, y: y, class: cls }, extra || {}), txt);
    g.appendChild(t);
    return t;
  }
  function add(g, el) { g.appendChild(el); return el; }
  /* Marcador por clase de cifra: rombo medido, círculo estimado, cuadrado declarado, huecos proyectado/extrapolado */
  function marcador(g, x, y, st, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var cls = 't3-mk ' + (hueco ? 't3-mk-h' : 't3-mk-f');
    if (st === 'med' || st === 'proy') return add(g, S('rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls }));
    if (st === 'decl') return add(g, S('rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls }));
    return add(g, S('circle', { cx: x, cy: y, r: r * 0.92, class: cls }));
  }
  /* Glifo de mundo: neurona (cerebro) o chip (silicio) */
  function glifoMundo(g, x, y, kind, s) {
    s = s || 12;
    var k = s / 16;
    var grp = add(g, S('g', { class: 't3-wg', transform: 'translate(' + (x - s / 2).toFixed(1) + ',' + (y - s / 2).toFixed(1) + ') scale(' + k.toFixed(3) + ')', 'aria-hidden': 'true' }));
    if (kind === 'bio') { grp.appendChild(S('circle', { cx: 8, cy: 8.4, r: 2.7 })); grp.appendChild(S('path', { d: 'M7.6 5.8L5.6 1.4M5.6 9.6L1.4 11.6M10.5 9.4l4 3.4M10.2 6.6l3.6-3.2' })); }
    else { grp.appendChild(S('rect', { x: 4.2, y: 4.2, width: 7.6, height: 7.6, rx: 1.2 })); grp.appendChild(S('path', { d: 'M6.2 1.4v2.4M9.8 1.4v2.4M6.2 12.2v2.4M9.8 12.2v2.4M1.4 6.2h2.4M1.4 9.8h2.4M12.2 6.2h2.4M12.2 9.8h2.4' })); }
    return grp;
  }
  /* Icono de cada regla: puntos, aspa en un cuadro, rayo y señal cuadrada */
  function iconoRegla(g, x, y, dim, s) {
    s = s || 16;
    var k = s / 16;
    var grp = add(g, S('g', { transform: 'translate(' + (x - s / 2).toFixed(1) + ',' + (y - s / 2).toFixed(1) + ') scale(' + k.toFixed(3) + ')', 'aria-hidden': 'true' }));
    if (dim === 'cnt') { for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) grp.appendChild(S('circle', { cx: 3 + i * 5, cy: 3 + j * 5, r: 1.7, class: 't3-if' })); }
    else if (dim === 'cmp') { grp.appendChild(S('rect', { x: 1.6, y: 1.6, width: 12.8, height: 12.8, rx: 3, class: 't3-is', 'stroke-width': 1.7 })); grp.appendChild(S('path', { d: 'M5.2 5.2l5.6 5.6M10.8 5.2l-5.6 5.6', class: 't3-is', 'stroke-width': 1.9, 'stroke-linecap': 'round' })); }
    else if (dim === 'nrg') grp.appendChild(S('path', { d: 'M9.6 .8L2.8 9.2h4.6L6.2 15.2l7-8.6H8.6z', class: 't3-if' }));
    else grp.appendChild(S('path', { d: 'M1 11.6h3.2V4.4h3.6v7.2h3.4V4.4H15', class: 't3-is', 'stroke-width': 1.9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    return grp;
  }
  /* Corchete de razón entre dos posiciones de un eje logarítmico */
  function corchete(g, xa, xb, y, text) {
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb);
    var grp = add(g, S('g', { class: 't3-br' }));
    grp.appendChild(S('path', { d: 'M' + x0 + ',' + (y + 5) + 'V' + y + 'H' + x1 + 'V' + (y + 5), class: 't3-br-l' }));
    if (text) T(grp, (x0 + x1) / 2, y - 6, text, 't3-br-t', { 'text-anchor': 'middle' });
    return grp;
  }

  /* ---------- Movimiento, ancho y tema ---------- */
  function reducido() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  /* Interpolación con requestAnimationFrame; se detiene si el elemento sale de la página */
  function tween(el, ms, fn, done) {
    if (reducido()) { fn(1); if (done) done(); return function () {}; }
    var t0 = performance.now(), vivo = true;
    function paso(now) {
      if (!vivo) return;
      if (!el.isConnected) { vivo = false; return; }
      var t = clamp((now - t0) / ms, 0, 1);
      fn(ease(t));
      if (t < 1) requestAnimationFrame(paso); else if (done) done();
    }
    requestAnimationFrame(paso);
    return function () { vivo = false; };
  }
  /* Vuelve a dibujar cuando cambia el ancho del contenedor */
  function alObservarAncho(host, render, w0) {
    var lastW = w0, conectado = false;
    render(w0);
    function go() {
      var w = Math.round(host.clientWidth);
      if (w >= 120 && Math.abs(w - lastW) > 1) { lastW = w; render(w); }
    }
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () {
        if (host.isConnected) conectado = true;
        else if (conectado) { ro.disconnect(); return; }
        go();
      });
      ro.observe(host);
    } else {
      window.addEventListener('resize', function onR() { if (!host.isConnected) { window.removeEventListener('resize', onR); return; } go(); });
      setTimeout(go, 0);
    }
  }
  /* Vuelve a pintar los lienzos si cambia el tema claro u oscuro */
  function observarTema(el, fn) {
    var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var mo = window.MutationObserver ? new MutationObserver(re) : null;
    function quitar() { if (mo) mo.disconnect(); if (mq && mq.removeEventListener) mq.removeEventListener('change', re); }
    function re() { if (!el.isConnected) { quitar(); return; } fn(); }
    if (mo) mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (mq && mq.addEventListener) mq.addEventListener('change', re);
  }
  function rgbDe(str) {
    var m = String(str).match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    return m ? [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3])] : [128, 128, 128];
  }

  var ST = { med: 'medido', est: 'estimado', decl: 'declarado', proy: 'proyectado', extr: 'extrapolado' };

  /* =====================================================================
     Introducción · las cuatro reglas con su color y su icono
     ctx.reglas = [{ dim, t }] (el texto viene de los datos del taller)
     ===================================================================== */
  W['m2.leyenda-reglas'] = function (el, ctx) {
    var reglas = (ctx && ctx.reglas) || [];
    el.appendChild(h('ul', { class: 't3-leyenda' }, reglas.map(function (r) {
      var svg = S('svg', { viewBox: '0 0 20 20', class: 't3-ley-ic t3-d-' + r.dim, 'aria-hidden': 'true', focusable: 'false' });
      iconoRegla(svg, 10, 10, r.dim, 16);
      return h('li', { class: 't3-ley-it t3-d-' + r.dim }, svg, h('span', null, rich(r.t)));
    })));
  };

  /* =====================================================================
     FIGURA · Cuatro reglas paralelas, una por dimensión
     Cada pista ubica sus valores con x = x0 + (log₁₀ v − base) · píxeles por década.
     Todas las reglas comparten los píxeles por década, no el origen.
     ===================================================================== */
  W['m2.fig-reglas'] = function (el) {
    var R = [
      { dim: 'cnt', name: 'Cantidad', unit: 'unidades', q: '¿Cuántos hay?', base: 0,
        tracks: [{ e0: 0, e1: 15, tick: function (e) { return ({ 0: '1', 3: 'mil', 6: 'millón', 9: 'mil millones', 12: 'billón', 15: 'mil billones' })[e]; },
          hover: function (v) { return ['≈ ' + sci(v, 1), longName(v)]; },
          items: [
            { v: 98, t: '98', n: 'cúbits · Helios', st: 'med', w: 'sil' },
            { v: 302, t: '302', n: 'neuronas · C. elegans', st: 'med', w: 'bio' },
            { v: 5.7e4, t: '5,7 × 10⁴', n: 'células · 1 mm³', st: 'med', w: 'bio' },
            { v: 1.1e6, t: '1,1 × 10⁶', n: 'H100e · Colossus 2', st: 'est', w: 'sil' },
            { v: 1.15e9, t: '1,15 × 10⁹', n: 'neuronas · Hala Point', st: 'decl', w: 'sil' },
            { v: 2.2e10, t: '2,2 × 10¹⁰', n: 'transistores · NorthPole', st: 'med', w: 'sil' },
            { v: 8.6e10, t: '8,6 × 10¹⁰', n: 'neuronas · encéfalo', st: 'est', w: 'bio' },
            { v: 2e14, a: 1e14, b: 1e15, t: '10¹⁴–10¹⁵', n: 'sinapsis · encéfalo', st: 'est', w: 'bio' }
          ] }] },
      { dim: 'cmp', name: 'Cómputo', unit: 'FLOP/s y FLOP', q: '¿Cuántas operaciones?', base: 12,
        tracks: [
          { e0: 12, e1: 21, tick: function (e) { return ({ 12: 'TFLOP/s', 15: 'PFLOP/s', 18: 'EFLOP/s', 21: 'ZFLOP/s' })[e]; },
            hover: function (v) { return ['≈ ' + sci(v, 1) + ' FLOP/s', longName(v) + ' de operaciones por segundo']; },
            items: [
              { v: 1e15, a: 1e13, b: 1e17, t: '~10¹⁵', n: 'encéfalo · equivalente', st: 'est', w: 'bio' },
              { v: 2e15, t: '2 × 10¹⁵', n: 'H100 · FP8', st: 'decl', w: 'sil' },
              { v: 2.198e18, t: '2,2 × 10¹⁸', n: 'LineShine · FP64', st: 'med', w: 'sil' },
              { v: 1.67e19, t: '1,7 × 10¹⁹', n: 'El Capitan · mixta', st: 'med', w: 'sil' },
              { v: 6e20, t: '6 × 10²⁰', n: 'FugakuNEXT · FP8', st: 'proy', w: 'sil' }
            ] },
          { e0: 23, e1: 30, tick: function (e) { return ({ 24: 'FLOP', 27: 'FLOP', 30: 'FLOP' })[e]; },
            hover: function (v) { return ['≈ ' + sci(v, 1) + ' FLOP', longName(v) + ' de operaciones en total']; },
            items: [
              { v: 9.5e23, t: '9,5 × 10²³', n: 'una vida de cerebro', st: 'extr', w: 'bio' },
              { v: 2.1e25, t: '2,1 × 10²⁵', n: 'GPT-4 · entrenamiento', st: 'est', w: 'sil' },
              { v: 1e27, t: '10²⁷', n: 'GPT-6 Astra', st: 'est', w: 'sil' },
              { v: 2e29, t: '2 × 10²⁹', n: 'cota de 2030', st: 'proy', w: 'sil' }
            ] }
        ] },
      { dim: 'nrg', name: 'Energía', unit: 'vatios (W)', q: '¿Cuánta potencia?', base: -10,
        tracks: [{ e0: -10, e1: 11, tick: function (e) { return ({ '-9': '1 nW', '-6': '1 µW', '-3': '1 mW', 0: '1 W', 3: '1 kW', 6: '1 MW', 9: '1 GW' })[e]; },
          hover: function (v) { return ['≈ ' + siUnit(v, 'W'), v >= 20 ? 'la potencia de ' + cerebros(v / 20) : 'un cerebro gasta ' + longName(20 / v) + ' veces más']; },
          items: [
            { v: 2.3e-10, t: '2,3 × 10⁻¹⁰ W', n: 'una neurona · media', st: 'extr', w: 'bio' },
            { v: 20, t: '20 W', n: 'encéfalo', st: 'est', w: 'bio' },
            { v: 700, t: '700 W', n: 'H100', st: 'decl', w: 'sil' },
            { v: 2600, t: '2,6 kW', n: 'Hala Point', st: 'decl', w: 'sil' },
            { v: 46e3, t: '46 kW', n: 'KAIROS', st: 'med', w: 'sil' },
            { v: 24.6e6, t: '24,6 MW', n: 'Frontier', st: 'med', w: 'sil' },
            { v: 42.2e6, t: '42,2 MW', n: 'LineShine', st: 'med', w: 'sil' },
            { v: 946e6, t: '946 MW', n: 'Colossus 2 · IT', st: 'est', w: 'sil' },
            { v: 13.8e9, t: '13,8 GW', n: '93 campus de IA', st: 'est', w: 'sil' },
            { v: 5.5e10, t: '≈55 GW', n: 'todos los centros', st: 'extr', w: 'sil' }
          ] }] },
      { dim: 'inf', name: 'Información', unit: 'bits por segundo', q: '¿Cuánta información?', base: 0,
        tracks: [{ e0: 0, e1: 22, tick: function (e) { return ({ 0: '1 bit/s', 3: 'kbit/s', 6: 'Mbit/s', 9: 'Gbit/s', 12: 'Tbit/s', 15: 'Pbit/s', 18: 'Ebit/s', 21: 'Zbit/s' })[e]; },
          hover: function (v) { return ['≈ ' + sci(v, 1) + ' bits/s', longName(v) + ' de bits por segundo']; },
          items: [
            { v: 10, t: '~10 bits/s', n: 'conducta deliberada', st: 'est', w: 'bio' },
            { v: 1e9, t: '~10⁹ bits/s', n: 'entrada sensorial', st: 'est', w: 'bio' },
            { v: 6.7e21, t: '6,7 × 10²¹', n: 'Landauer · borrados/s', st: 'extr', w: 'bio', note: 'Cota de borrados irreversibles de bit por segundo con 20 W a 310 K' }
          ],
          bracket: [10, 1e9, '× 10⁸: el número de cribado'] }] }
    ];
    var DEC = 22, ROW = 31, GAP_UP = 24, TICKS = 44, MINW = 900;

    /* Etiquetas en filas escalonadas sobre la regla, sin choques (todas las pistas de una regla juntas) */
    function place(items, X, xMin, xMax) {
      var rows = [];
      items.slice().sort(function (a, b) { return X(a.v) - X(b.v); }).forEach(function (it) {
        var wv = it.t.length * 7.3 + 16, wn = it.n.length * 5.9;
        it.bw = Math.max(wv, wn) + 4;
        var cx = clamp(X(it.v), xMin + it.bw / 2, xMax - it.bw / 2);
        it.cx = cx;
        var r = 0;
        for (; r < 6; r++) { var last = rows[r]; if (last === undefined || cx - it.bw / 2 >= last + 10) break; }
        rows[r] = cx + it.bw / 2;
        it.row = r;
      });
      return rows.length;
    }

    var host = h('div', { class: 't3-reglas' });
    var scroller = h('div', { class: 'scroll-x t3-scroll', tabindex: '0', role: 'region', 'aria-label': 'Figura desplazable horizontalmente: cuatro reglas paralelas' }, host);

    function dibujar(wHost) {
      var w = Math.max(MINW, wHost);
      var headW = 166, x0 = headW + 22, x1 = w - 26, pxd = (x1 - x0) / DEC;
      var blocks = R.map(function (rl) {
        var X = function (v) { return x0 + (L10(v) - rl.base) * pxd; };
        var todos = [];
        rl.tracks.forEach(function (tr) { tr.xs = X(P10(tr.e0)); tr.xe = X(P10(tr.e1)); tr.items.forEach(function (it) { todos.push(it); }); });
        var filas = place(todos, X, x0 - 8, w - 4);
        var extraUp = rl.tracks.some(function (t) { return t.bracket; }) ? 1 : 0;
        var extraDown = rl.tracks.length > 1 ? 40 : 0;
        var up = (Math.max(1, filas) + extraUp) * ROW + GAP_UP;
        return { rl: rl, X: X, up: up, h: up + TICKS + extraDown + 26 };
      });
      var top = 6, H = top + blocks.reduce(function (s, b) { return s + b.h; }, 0);
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + H, width: w, height: H, class: 't3-reglas-svg', role: 'group', 'aria-label': 'Cuatro reglas logarítmicas paralelas: cantidad, cómputo, energía e información, con sus hitos principales' });
      var y = top;
      blocks.forEach(function (B, bi) {
        var rl = B.rl, X = B.X, yb = y + B.up;
        var g = add(svg, S('g', { class: 't3-d-' + rl.dim }));
        if (bi > 0) g.appendChild(S('line', { x1: 0, x2: w, y1: y, y2: y, class: 't3-sep' }));
        /* cabecera: icono, nombre, unidad y pregunta */
        iconoRegla(g, 10, yb - 15, rl.dim, 16);
        T(g, 24, yb - 10, rl.name, 't3-rh');
        T(g, 0, yb + 9, rl.unit, 't3-ru');
        T(g, 0, yb + 26, rl.q, 't3-rq');
        var rowsTop = yb - B.up + 4;
        rl.tracks.forEach(function (tr) {
          var xs = tr.xs, xe = tr.xe;
          /* cuerpo de la regla */
          g.appendChild(S('rect', { x: xs, y: yb - 4, width: xe - xs, height: 8, rx: 2, class: 't3-band' }));
          g.appendChild(S('line', { x1: xs, x2: xe, y1: yb, y2: yb, class: 't3-base' }));
          for (var e = tr.e0; e <= tr.e1; e++) {
            var x = X(P10(e)), major = ((e % 3) + 3) % 3 === 0;
            g.appendChild(S('line', { x1: x, x2: x, y1: yb, y2: yb + (major ? 11 : 7), class: 't3-tk' }));
            if (major) {
              T(g, x, yb + 25, pw(e), 't3-tl', { 'text-anchor': 'middle' });
              var wd = tr.tick(e);
              if (wd) T(g, x, yb + 38, wd, 't3-tw', { 'text-anchor': 'middle' });
            }
            if (e < tr.e1) for (var m = 2; m < 10; m++) { var xm = X(m * P10(e)); g.appendChild(S('line', { x1: xm, x2: xm, y1: yb, y2: yb + (m === 5 ? 5 : 3.5), class: 't3-tkm' })); }
          }
          /* lectura continua al pasar el cursor o el dedo */
          var hair = add(g, S('line', { x1: 0, x2: 0, y1: rowsTop, y2: yb + 12, class: 't3-hair', visibility: 'hidden' }));
          var ov = add(g, S('rect', { x: xs - 4, y: rowsTop, width: xe - xs + 8, height: yb + 14 - rowsTop, class: 't3-ov', 'aria-hidden': 'true' }));
          function leer(ev) {
            var r = svg.getBoundingClientRect(), px = clamp((ev.clientX - r.left) * (w / r.width), xs, xe);
            var lv = (px - x0) / pxd + rl.base, v = P10(lv);
            hair.setAttribute('x1', px); hair.setAttribute('x2', px); hair.setAttribute('visibility', 'visible');
            var L = tr.hover(v);
            tipShow([L[0], L[1], 'log₁₀ = ' + fmt(lv, 1) + ' · regla de ' + rl.name.toLowerCase()], ev.clientX, ev.clientY);
          }
          ov.addEventListener('pointermove', leer);
          ov.addEventListener('pointerdown', leer);
          ov.addEventListener('pointerleave', function () { hair.setAttribute('visibility', 'hidden'); tipHide(); });
          /* corchete de razón (la distancia es el logaritmo del cociente) */
          if (tr.bracket) {
            var a = tr.bracket[0], b = tr.bracket[1], ybr = yb - B.up + GAP_UP - 6;
            corchete(g, X(a), X(b), ybr + 10, tr.bracket[2]);
            [a, b].forEach(function (v) { g.appendChild(S('line', { x1: X(v), x2: X(v), y1: ybr + 15, y2: yb - 8, class: 't3-conn' })); });
          }
        });
        /* hitos: las guías van en una capa inferior para no tachar los rótulos */
        var gLead = add(g, S('g', { class: 't3-leads' }));
        rl.tracks.forEach(function (tr) {
          tr.items.forEach(function (it) {
            var x = X(it.v), ly = yb - GAP_UP - it.row * ROW;
            var gg = add(g, S('g', null));
            if (it.a) gg.appendChild(S('rect', { x: X(it.a), y: yb - 5, width: X(it.b) - X(it.a), height: 10, rx: 5, class: 't3-rng' }));
            gLead.appendChild(S('path', { d: 'M' + x + ',' + (yb - 7) + 'L' + x + ',' + (ly + 3) + (Math.abs(it.cx - x) > 2 ? 'L' + it.cx + ',' + (ly - 1) : ''), class: 't3-lead' }));
            marcador(gg, x, yb, it.st, 5.6);
            var lx = it.cx - it.bw / 2;
            glifoMundo(gg, lx + 6, ly - 15, it.w, 11);
            T(gg, lx + 14, ly - 11, it.t, 't3-vt');
            T(gg, lx, ly + 1, it.n, 't3-vn');
            var lineas = [it.t, it.n.replace(' · ', ', ') + (it.w === 'bio' ? ' · cerebro' : ' · silicio'), (it.note ? it.note + ' · ' : '') + ST[it.st]];
            var hit = add(gg, S('rect', { x: Math.min(lx, x - 8), y: ly - 24, width: Math.max(it.bw, Math.abs(it.cx - x) + it.bw / 2 + 8), height: yb + 8 - (ly - 24), class: 't3-hit', role: 'img', 'aria-label': rl.name + ': ' + it.t + ', ' + it.n + ' (' + ST[it.st] + ')' }));
            bindTip(hit, function () { return lineas; });
          });
        });
        if (rl.tracks.length > 1) {
          /* puente entre pistas: ritmo × tiempo = total */
          var xa = X(1e15), xb = X(9.5e23), yy = yb + 48;
          var br = add(g, S('g', { class: 't3-br' }));
          br.appendChild(S('path', { d: 'M' + xa + ',' + (yy - 4) + 'V' + (yy + 6) + 'H' + xb + 'V' + (yy - 4), class: 't3-br-l' }));
          br.appendChild(S('path', { d: 'M' + (xb - 4) + ',' + yy + 'l4,-5l4,5', class: 't3-br-l' }));
          T(br, (xa + xb) / 2, yy + 20, '× 30 años (≈ 9,5 × 10⁸ s): ritmo × tiempo = total', 't3-br-t', { 'text-anchor': 'middle' });
          /* corte del eje entre las dos unidades */
          var xg = X(1e22);
          g.appendChild(S('path', { d: 'M' + (xg - 7) + ',' + (yb + 6) + 'l6,-12M' + (xg + 1) + ',' + (yb + 6) + 'l6,-12', class: 't3-tk' }));
        }
        y += B.h;
      });
      M.clear(host);
      host.appendChild(svg);
    }

    /* tabla gemela */
    var filas = [];
    R.forEach(function (rl) {
      rl.tracks.forEach(function (tr) {
        tr.items.forEach(function (it) {
          filas.push([rl.name, it.n.replace(' · ', ', '), it.t + (rl.dim === 'cmp' ? (tr.e0 > 21 ? ' FLOP' : ' FLOP/s') : ''), it.w === 'bio' ? 'cerebro' : 'silicio', ST[it.st]]);
        });
      });
    });
    var leyenda = h('p', { class: 'w-note-s t3-ley' }, rich('Cada cifra lleva una marca de confianza: [medido] [estimado] [declarado] [proyectado] [extrapolado] Pasa el cursor por una marca para ver qué significa.'));
    el.appendChild(h('p', { class: 'w-note-s t3-pista' }, 'En pantallas estrechas, desliza la figura horizontalmente.'));
    el.appendChild(scroller);
    el.appendChild(leyenda);
    el.appendChild(m2.desplegable('Ver los datos de las cuatro reglas', null, tabla(['Regla', 'Hito', 'Valor', 'Mundo', 'Estatus'], filas, 'Hitos de las cuatro reglas'), 'datos'));
    alObservarAncho(scroller, dibujar, MINW);
  };

  /* =====================================================================
     FIGURA · Cada escalón multiplica por diez
     ===================================================================== */
  W['m2.fig-escalon'] = function (el, ctx) {
    var s = (ctx && ctx.s) || {};
    var NOTAS = s.notas_vivas || [];
    var NAMES = ['uno', 'diez', 'cien', 'mil', 'diez mil', 'cien mil'];
    var n = 3, reveal = 1, pos = 3, parar = null;
    var id = uid('exp');
    var out = h('output', { class: 'desl-v', for: id });
    var inp = h('input', { type: 'range', id: id, min: 0, max: 5, step: 1, value: 3 });
    var ctrl = h('div', { class: 'desl t3-desl t3-d-cnt' }, h('label', { for: id }, 'Exponente'), inp, out);
    var cv = h('canvas', { class: 't3-dec-cv', width: 600, height: 600, role: 'img', 'aria-label': 'Cuadrícula de puntos que representa 10 elevado al exponente elegido' });
    var ax = h('div', { class: 't3-dec-ax' });
    var nota = h('p', { class: 'w-note t3-nota', 'aria-live': 'polite' });

    function draw() {
      var c2 = cv.getContext && cv.getContext('2d');
      if (!c2) return;
      var st = getComputedStyle(cv), col = rgbDe(st.color), lin = rgbDe(st.caretColor);
      var w = cv.width, hh = cv.height;
      c2.clearRect(0, 0, w, hh);
      var N = Math.round(P10(n)), shown = Math.max(1, Math.round(N * reveal));
      var cols = Math.ceil(Math.sqrt(N)), rows = Math.ceil(N / cols);
      var pad = 10, cell = Math.min((w - 2 * pad) / cols, (hh - 2 * pad) / rows);
      var ox = (w - cols * cell) / 2, oy = (hh - rows * cell) / 2;
      var i, c, rr;
      if (cell >= 6) {
        var r = cell * 0.34;
        c2.fillStyle = 'rgb(' + col.join(',') + ')';
        c2.beginPath();
        for (i = 0; i < shown; i++) { c = i % cols; rr = (i / cols) | 0; var x = ox + (c + 0.5) * cell, y = oy + (rr + 0.5) * cell; c2.moveTo(x + r, y); c2.arc(x, y, r, 0, TAU); }
        c2.fill();
      } else {
        /* modo de píxeles: más rápido que cien mil arcos */
        var img = c2.createImageData(w, hh), d = img.data;
        var sz = Math.max(1, Math.floor(cell * 0.7));
        for (i = 0; i < shown; i++) {
          c = i % cols; rr = (i / cols) | 0;
          var px = Math.floor(ox + c * cell), py = Math.floor(oy + rr * cell);
          for (var yy = 0; yy < sz; yy++) for (var xx = 0; xx < sz; xx++) {
            var k = ((py + yy) * w + px + xx) * 4;
            if (k >= 0 && k < d.length) { d[k] = col[0]; d[k + 1] = col[1]; d[k + 2] = col[2]; d[k + 3] = 235; }
          }
        }
        c2.putImageData(img, 0, 0);
      }
      c2.strokeStyle = 'rgba(' + lin.join(',') + ',0.45)';
      c2.lineWidth = 2;
      c2.strokeRect(ox - 5, oy - 5, cols * cell + 10, rows * cell + 10);
    }

    var linMk = null, logMk = null, sl = null, sg = null;
    function renderAx(w) {
      var H = 112, x0 = 14, x1 = w - 14;
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + H, class: 'm2-svg t3-ax', role: 'img', 'aria-label': 'Posición del número en una escala lineal y en una logarítmica' });
      sl = function (v) { return x0 + v / 1e5 * (x1 - x0); };
      sg = function (v) { return x0 + L10(Math.max(v, 1)) / 5 * (x1 - x0); };
      T(svg, x0, 14, 'Escala lineal, de 0 a 100.000', 't3-axl');
      svg.appendChild(S('line', { x1: x0, x2: x1, y1: 30, y2: 30, class: 't3-axis' }));
      [0, 25e3, 5e4, 75e3, 1e5].forEach(function (v, i) {
        var x = sl(v);
        svg.appendChild(S('line', { x1: x, x2: x, y1: 30, y2: 35, class: 't3-tk' }));
        T(svg, x, 47, ['0', '25.000', '50.000', '75.000', '100.000'][i], 't3-tl', { 'text-anchor': i === 0 ? 'start' : (i === 4 ? 'end' : 'middle') });
      });
      T(svg, x0, 70, 'Escala logarítmica, de 1 a 100.000', 't3-axl');
      svg.appendChild(S('line', { x1: sg(1), x2: sg(1e5), y1: 86, y2: 86, class: 't3-axis' }));
      for (var e = 0; e <= 5; e++) {
        var x = sg(P10(e));
        svg.appendChild(S('line', { x1: x, x2: x, y1: 86, y2: 91, class: 't3-tk' }));
        T(svg, x, 104, pw(e), 't3-tl', { 'text-anchor': e === 0 ? 'start' : (e === 5 ? 'end' : 'middle') });
        if (e < 5) for (var m = 2; m < 10; m++) { var xm = sg(m * P10(e)); svg.appendChild(S('line', { x1: xm, x2: xm, y1: 86, y2: 86 + (m === 5 ? 3.5 : 2.25), class: 't3-tkm' })); }
      }
      linMk = add(svg, S('g', null)); linMk.appendChild(S('circle', { cx: 0, cy: 30, r: 5.5, class: 't3-ring' }));
      logMk = add(svg, S('g', null)); logMk.appendChild(S('circle', { cx: 0, cy: 86, r: 5.5, class: 't3-ring' }));
      M.clear(ax);
      ax.appendChild(svg);
      placeAx(pos);
    }
    function placeAx(pp) {
      if (!linMk) return;
      linMk.setAttribute('transform', 'translate(' + sl(P10(pp)).toFixed(2) + ',0)');
      logMk.setAttribute('transform', 'translate(' + sg(P10(pp)).toFixed(2) + ',0)');
    }
    function update(anim) {
      n = +inp.value;
      out.textContent = pw(n) + ' = ' + fmt(P10(n)) + ' · ' + NAMES[n];
      M.clear(nota);
      if (NOTAS[n]) nota.appendChild(rich(NOTAS[n]));
      var from = pos;
      if (parar) parar();
      if (anim) {
        reveal = 0;
        parar = tween(el, 650, function (t) { reveal = Math.max(0.02, t); draw(); pos = lerp(from, n, t); placeAx(pos); });
      } else { reveal = 1; draw(); pos = n; placeAx(n); }
    }
    inp.addEventListener('input', function () { update(true); });
    el.appendChild(h('div', { class: 't3-dec' },
      h('span', { class: 'dimchip d-cnt' }, 'Cantidad'),
      ctrl,
      h('div', { class: 't3-dec-grid' }, h('div', { class: 't3-dec-cvbox' }, cv), h('div', { class: 't3-dec-der' }, ax, nota))));
    alObservarAncho(ax, renderAx, 320);
    update(false);
    /* los colores del lienzo se leen de los tokens: se vuelve a pintar al entrar en la página y al cambiar de tema */
    requestAnimationFrame(function () { if (el.isConnected) draw(); });
    observarTema(el, draw);
  };

  /* =====================================================================
     FIGURA · Lineal o logarítmica: neuronas de seis sistemas
     ===================================================================== */
  W['m2.fig-linlog'] = function (el, ctx) {
    var s = (ctx && ctx.s) || {};
    var NV = s.notas_vivas || {};
    var D = [
      { l: 'C. elegans', v: 302, s: '302', st: 'med', g: 'bio' },
      { l: 'Mosca, encéfalo', v: 139255, s: '139.255', st: 'med', g: 'bio' },
      { l: 'Mosca, SNC completo', v: 166700, s: '166.700', st: 'med', g: 'bio' },
      { l: 'Hala Point', v: 1.15e9, s: '1,15 × 10⁹', st: 'decl', g: 'sil' },
      { l: 'Darwin Monkey', v: 2e9, s: '>2 × 10⁹', st: 'decl', g: 'sil' },
      { l: 'Encéfalo humano', v: 8.6e10, s: '8,6 × 10¹⁰', st: 'est', g: 'bio' }
    ];
    var mode = 1, cur = 1, ancho = 560, parar = null;
    var host = h('div', { class: 't3-ll' });
    var nota = h('p', { class: 'w-note t3-nota', 'aria-live': 'polite' }, rich(NV.logaritmica || ''));
    var bLin = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false' }, 'Lineal');
    var bLog = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'true' }, 'Logarítmica');
    var grupo = h('div', { class: 'chips t3-seg', role: 'group', 'aria-label': 'Tipo de escala' }, bLin, bLog);

    function render(w) {
      ancho = w;
      var narrow = w < 520;
      var x0 = narrow ? 8 : 150, x1 = w - (narrow ? 78 : 92), rowH = narrow ? 44 : 34, top = 8;
      var H = top + D.length * rowH + 74;
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + H, class: 'm2-svg t3-ll-svg', role: 'group', 'aria-label': 'Barras horizontales del número de neuronas en escala ' + (cur > 0.5 ? 'logarítmica' : 'lineal') });
      var lin = function (v) { return x0 + v / 9e10 * (x1 - x0); };
      var lgE = function (e) { return x0 + e / 11 * (x1 - x0); };
      var lg = function (v) { return lgE(L10(Math.max(v, 1))); };
      var X = function (v) { return lerp(lin(v), lg(v), cur); };
      /* ejes: lineal y logarítmico se funden */
      var gLin = add(svg, S('g', { opacity: (1 - cur).toFixed(3) })), gLog = add(svg, S('g', { opacity: cur.toFixed(3) }));
      var yAx = top + D.length * rowH + 6;
      svg.appendChild(S('line', { x1: x0, x2: x1, y1: yAx, y2: yAx, class: 't3-axis' }));
      [0, 2e10, 4e10, 6e10, 8e10].forEach(function (v, i) {
        var x = lin(v);
        gLin.appendChild(S('line', { x1: x, x2: x, y1: top, y2: yAx, class: 't3-gl' }));
        gLin.appendChild(S('line', { x1: x, x2: x, y1: yAx, y2: yAx + 5, class: 't3-tk' }));
        if (!narrow || i % 2 === 0) T(gLin, x, yAx + 18, v === 0 ? '0' : sci(v, 0), 't3-tl', { 'text-anchor': v === 0 && narrow ? 'start' : 'middle' });
      });
      for (var e = 0; e <= 11; e++) {
        var x = lgE(e);
        gLog.appendChild(S('line', { x1: x, x2: x, y1: top, y2: yAx, class: 't3-gl' }));
        gLog.appendChild(S('line', { x1: x, x2: x, y1: yAx, y2: yAx + 5, class: 't3-tk' }));
        if (e % (narrow ? 2 : 1) === 0) T(gLog, x, yAx + 18, pw(e), 't3-tl', { 'text-anchor': e === 0 && narrow ? 'start' : 'middle' });
        if (e < 11) for (var m = 2; m < 10; m++) { var xm = lg(m * P10(e)); gLog.appendChild(S('line', { x1: xm, x2: xm, y1: yAx, y2: yAx + 3, class: 't3-tkm' })); }
      }
      T(svg, x1, yAx + 34, cur > 0.5 ? 'neuronas · escala logarítmica' : 'neuronas · escala lineal', 't3-vn', { 'text-anchor': 'end' });
      D.forEach(function (d, i) {
        var yr = top + i * rowH;
        var y = narrow ? yr + 30 : yr + rowH / 2;
        if (narrow) {
          glifoMundo(svg, x0 + 5, yr + 9, d.g, 11);
          T(svg, x0 + 14, yr + 13, d.l, 't3-vn');
        } else {
          T(svg, x0 - 10, y + 4, d.l, 't3-ls', { 'text-anchor': 'end' });
          glifoMundo(svg, 9, y, d.g, 11);
        }
        var xe = Math.max(x0, X(d.v)), len = xe - x0, bh = 12;
        var cls = d.g === 'bio' ? 't3-bar-bio' : 't3-bar-sil';
        if (len > 0.5) svg.appendChild(S('path', { d: 'M' + x0 + ',' + (y - bh / 2) + 'h' + Math.max(0, len - 4) + 'a4,4 0 0 1 4,4v' + (bh - 8) + 'a4,4 0 0 1 -4,4h' + (-Math.max(0, len - 4)) + 'z', class: cls }));
        else svg.appendChild(S('rect', { x: x0, y: y - bh / 2, width: 1.5, height: bh, class: cls }));
        T(svg, xe + 7, y + 4, d.s, 't3-vt');
        var hit = add(svg, S('rect', { x: 0, y: yr, width: w, height: rowH, class: 't3-hit', role: 'img', 'aria-label': d.l + ': ' + d.s + ' neuronas' }));
        bindTip(hit, function () {
          var pc = d.v / 8.6e10 * 100;
          return [d.s + ' neuronas', d.l, ST[d.st] + ' · ' + (pc < 0.01 ? '<0,01' : fmt(pc, pc < 10 ? 1 : 0)) + ' % de las neuronas humanas'];
        });
      });
      /* leyenda (dos series) */
      var ly = H - 12, lx = narrow ? 0 : x0;
      svg.appendChild(S('rect', { x: lx, y: ly - 8, width: 10, height: 10, rx: 2, class: 't3-bar-bio' }));
      glifoMundo(svg, lx + 21, ly - 4, 'bio', 11);
      T(svg, lx + 30, ly, 'sistemas nerviosos', 't3-vn');
      svg.appendChild(S('rect', { x: lx + 150, y: ly - 8, width: 10, height: 10, rx: 2, class: 't3-bar-sil' }));
      glifoMundo(svg, lx + 171, ly - 4, 'sil', 11);
      T(svg, lx + 180, ly, 'neuromórficos', 't3-vn');
      M.clear(host);
      host.appendChild(svg);
    }
    function go(m) {
      if (m === mode) return;
      var from = cur;
      mode = m;
      M.clear(nota);
      nota.appendChild(rich((m ? NV.logaritmica : NV.lineal) || ''));
      if (parar) parar();
      parar = tween(el, 900, function (t) { cur = lerp(from, m, t); render(ancho); });
    }
    [bLin, bLog].forEach(function (b) {
      b.addEventListener('click', function () {
        bLin.setAttribute('aria-pressed', String(b === bLin));
        bLog.setAttribute('aria-pressed', String(b === bLog));
        go(b === bLog ? 1 : 0);
      });
    });
    el.appendChild(grupo);
    el.appendChild(host);
    el.appendChild(nota);
    el.appendChild(m2.desplegable('Ver los datos', null, tabla(['Sistema', 'Neuronas', 'Estatus'], D.map(function (d) { return [d.l, d.s, ST[d.st]]; }), 'Neuronas de seis sistemas'), 'datos'));
    alObservarAncho(host, render, 560);
  };

  /* =====================================================================
     FIGURA · Cómo se llaman las potencias
     ===================================================================== */
  W['m2.fig-potencias'] = function (el) {
    var N = [['10³', 'mil', 'kilo · k'], ['10⁶', 'millón', 'mega · M'], ['10⁹', 'mil millones', 'giga · G'], ['10¹²', 'billón', 'tera · T'], ['10¹⁵', 'mil billones', 'peta · P'], ['10¹⁸', 'trillón', 'exa · E'], ['10²¹', 'mil trillones', 'zetta · Z']];
    el.appendChild(h('div', { class: 't3-names', role: 'list', 'aria-label': 'Nombres de las potencias de diez en español y prefijos del Sistema Internacional' }, N.map(function (r, i) {
      return h('div', { role: 'listitem', class: 't3-name' },
        h('span', { class: 't3-ne' }, r[0]),
        h('span', { class: 't3-nw' }, r[1]),
        h('span', { class: 't3-np' }, r[2]),
        i ? h('span', { class: 't3-nx', 'aria-hidden': 'true' }, '× 1.000') : null);
    })));
    el.appendChild(h('aside', { class: 'cautela t3-caut', role: 'note' },
      h('strong', null, h('span', { class: 't3-ci', 'aria-hidden': 'true' }, '≠'), 'Cuidado con el inglés'),
      p('Un *billion* son mil millones (10⁹), no un billón. Hacia abajo, los prefijos son mili (10⁻³), micro (10⁻⁶), nano (10⁻⁹), pico (10⁻¹²), femto (10⁻¹⁵), atto (10⁻¹⁸) y zepto (10⁻²¹).')));
  };

  /* =====================================================================
     D1 · Redes con los mismos nodos
     ===================================================================== */
  W['m2.network'] = function (el) {
    var n = 8, topo = 0;
    var TOPO = [{ l: 'en cadena' }, { l: 'en anillo' }, { l: 'con vecinos cercanos' }, { l: 'todos con todos' }];
    var box = h('div', { class: 't3-net' }), out = outBox(), say = sayBox();
    var rn = rango({ label: 'Número de nodos', min: 4, max: 24, value: 8, dim: 'cnt', fmt: function (v) { return v + ' nodos'; }, on: function (v) { n = v; draw(); }, help: 'Cambia la **cantidad** de piezas.' });
    var ch = chips(TOPO, function (t, i) { topo = i; draw(); }, { label: 'Forma de conectar los nodos', sel: 0 });
    function edges() {
      var E = [];
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
        var d = Math.min(j - i, n - (j - i));
        if (topo === 0 && j === i + 1) E.push([i, j]);
        else if (topo === 1 && d === 1) E.push([i, j]);
        else if (topo === 2 && d <= 2) E.push([i, j]);
        else if (topo === 3) E.push([i, j]);
      }
      return E;
    }
    function diameter(E) {
      var adj = [], D = 0, s2, u;
      for (var i = 0; i < n; i++) adj.push([]);
      E.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });
      for (s2 = 0; s2 < n; s2++) {
        var dist = [];
        for (var k = 0; k < n; k++) dist.push(-1);
        dist[s2] = 0;
        var q = [s2];
        while (q.length) { u = q.shift(); adj[u].forEach(function (v) { if (dist[v] < 0) { dist[v] = dist[u] + 1; q.push(v); } }); }
        D = Math.max.apply(null, [D].concat(dist));
      }
      return D;
    }
    function draw() {
      var E = edges(), cx = 180, cy = 160, R = 130;
      var svg = S('svg', { viewBox: '0 0 360 320', class: 'm2-svg t3-net-svg', role: 'img', 'aria-label': n + ' nodos conectados ' + TOPO[topo].l + ': ' + E.length + ' enlaces' });
      var P = [];
      for (var i = 0; i < n; i++) P.push([cx + R * Math.cos(i / n * TAU - Math.PI / 2), cy + R * Math.sin(i / n * TAU - Math.PI / 2)]);
      E.forEach(function (e) { svg.appendChild(S('line', { x1: P[e[0]][0], y1: P[e[0]][1], x2: P[e[1]][0], y2: P[e[1]][1], class: 't3-edge' })); });
      P.forEach(function (pp) { svg.appendChild(S('circle', { cx: pp[0], cy: pp[1], r: 7, class: 't3-node' })); });
      M.clear(box);
      box.appendChild(svg);
      var dia = diameter(E);
      M.clear(out);
      out.appendChild(linea('Nodos: ', String(n)));
      out.appendChild(linea('Enlaces: ', [h('b', null, String(E.length)), topo === 3 ? ' = ' + n + ' × ' + (n - 1) + ' ÷ 2' : '']));
      out.appendChild(linea('Saltos máximos para que un mensaje cruce la red: ', String(dia)));
      decir(say, 'Mismos **' + n + '** nodos: conectados ' + TOPO[topo].l + ' tienen **' + E.length + '** enlaces y un mensaje necesita hasta **' + dia + '** ' + (dia === 1 ? 'salto' : 'saltos') + '. El recuento de nodos no cambia; lo que el sistema puede hacer, sí.');
    }
    el.appendChild(h('div', { class: 't3-lab' }, ch, rn.wrap, box, out, say));
    draw();
  };

  /* =====================================================================
     D2 · Laboratorio de precisión numérica
     ===================================================================== */
  function minifloat(x, eb, mb, maxFinite, satNaN) {
    if (!isFinite(x)) return x;
    if (x === 0) return 0;
    var s = Math.sign(x), a = Math.abs(x), bias = Math.pow(2, eb - 1) - 1, eMin = 1 - bias;
    var e = Math.floor(Math.log2(a));
    if (Math.pow(2, e) > a) e--;
    if (Math.pow(2, e + 1) <= a) e++;
    var q = Math.pow(2, Math.max(e, eMin) - mb);
    var t = a / q, fl = Math.floor(t), fr = t - fl;
    var nn = fr > 0.5 ? fl + 1 : fr < 0.5 ? fl : (fl % 2 === 0 ? fl : fl + 1);
    var r = nn * q;
    if (r > maxFinite) return satNaN ? NaN : s * Infinity;
    return s * r;
  }
  W['m2.precision'] = function (el) {
    var NUM = [{ l: 'π', v: Math.PI, s: 'π = 3,14159265358979…' }, { l: '1/3', v: 1 / 3, s: '1/3 = 0,33333…' }, { l: '0,1', v: 0.1, s: '0,1' }, { l: '86,1', v: 86.1, s: '86,1' }, { l: '300', v: 300, s: '300' }, { l: '1.000.001', v: 1000001, s: '1.000.001' }, { l: '0,00002', v: 2e-5, s: '0,00002' }];
    var F = [
      { n: 'FP64 («doble precisión»)', b: 64, f: function (v) { return v; }, max: 1.8e308 },
      { n: 'FP32 («simple precisión»)', b: 32, f: function (v) { return Math.fround(v); }, max: 3.4e38 },
      { n: 'FP16 («media precisión»)', b: 16, f: function (v) { return minifloat(v, 5, 10, 65504, false); }, max: 65504 },
      { n: 'FP8 (E4M3)', b: 8, f: function (v) { return minifloat(v, 4, 3, 448, true); }, max: 448 }
    ];
    var cur = NUM[0];
    var tb = h('tbody'), say = sayBox();
    function shown(v) {
      if (Number.isNaN(v)) return 'no cabe (máximo 448)';
      if (!isFinite(v)) return 'no cabe: desbordamiento (infinito)';
      if (v === 0) return '0 (se pierde por completo)';
      var a = Math.abs(v);
      if (a >= 1e5 || a < 1e-3) {
        var t = v.toPrecision(10);
        if (/e/.test(t)) return t.replace(/\.?0+e/, 'e').replace(/e([+-])(\d+)$/, function (_, sg, ex) { return ' × ' + pw(sg === '-' ? -ex : +ex); }).replace('.', ',');
        /* sin exponente: los mismos dígitos, sin ceros sobrantes y con punto de millares */
        return fmt(+t, (t.split('.')[1] || '').replace(/0+$/, '').length);
      }
      return String(+v.toPrecision(12)).replace('.', ',');
    }
    function draw() {
      M.clear(tb);
      var worst = null;
      F.forEach(function (f) {
        var r = f.f(cur.v), err = isFinite(r) && !Number.isNaN(r) ? Math.abs(r - cur.v) / Math.abs(cur.v) * 100 : null;
        tb.appendChild(h('tr', null, h('td', null, f.n), h('td', { class: 't3-n' }, String(f.b)), h('td', { class: 't3-n' }, shown(r)),
          h('td', { class: 't3-n' }, err === null ? '—' : err === 0 ? '0 %' : (err < 1e-6 ? '< 0,000001 %' : fmt(err, err < 0.01 ? 6 : err < 1 ? 3 : 1) + ' %'))));
        if (f.b === 8) worst = { r: r, err: err };
      });
      var r16 = F[2].f(cur.v);
      decir(say, Number.isNaN(worst.r)
        ? '**' + cur.l + '** no cabe en FP8 E4M3: su máximo es 448. En FP16 ' + (isFinite(r16) ? 'sí cabe' : 'tampoco: su máximo es 65.504') + '. Elegir la precisión es también elegir el rango de números posibles.'
        : 'Con 8 bits, **' + cur.l + '** se guarda como **' + shown(worst.r) + '**, con un error del ' + fmt(worst.err, worst.err < 1 ? 2 : 1) + ' %. Con 64 bits el error es inapreciable. A cambio, en 1 GB caben 125 millones de números FP64 o 1.000 millones en FP8: ocho veces más.');
    }
    var ch = chips(NUM, function (x) { cur = x; draw(); }, { label: 'Número para guardar', sel: 0 });
    var tbl = h('div', { class: 'tablewrap m2-tabla t3-tabla' }, h('table', null,
      h('caption', { class: 'sr-only' }, 'El mismo número guardado en cuatro formatos'),
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Formato'), h('th', { scope: 'col' }, 'Bits'), h('th', { scope: 'col' }, 'Valor guardado'), h('th', { scope: 'col' }, 'Error relativo'))),
      tb));
    el.appendChild(h('div', { class: 't3-lab' }, h('p', { class: 'w-note' }, 'Elige un número y mira cómo lo guarda cada formato. Los valores se calculan de verdad con las reglas de redondeo de cada formato (redondeo al par más cercano).'), ch, tbl, say));
    draw();
  };

  /* =====================================================================
     D3 · Potencia × tiempo y eficiencia (dos actividades de la lección)
     ===================================================================== */
  function calculadoraEnergia(el) {
    var DEV = [{ l: 'Cargador rápido · 20 W', p: 20 }, { l: 'Encéfalo · 20 W', p: 20 }, { l: 'Microondas pequeño · 700 W', p: 700 }, { l: 'Hervidor · 2.600 W', p: 2600 }, { l: 'Frontier · 24,6 MW', p: 24.6e6 }];
    var TIM = [{ l: '1 segundo', t: 1 }, { l: '1 minuto', t: 60 }, { l: '1 hora', t: 3600 }, { l: '8 horas', t: 28800 }, { l: '1 día', t: 86400 }, { l: '1 año', t: 3.156e7 }];
    var P = 20, t = 3600;
    var PM = logMap(1, 1e8), TM = logMap(1, 3.156e7);
    var out = outBox(), say = sayBox();
    var dev, tim;
    var rp = rango({ label: 'Potencia', min: 0, max: 1000, value: PM.toP(20), dim: 'nrg', fmt: function (pp) { return siUnit(PM.toV(pp), 'W'); }, on: function (pp) { P = PM.toV(pp); dev.limpiar(); draw(); }, help: 'La **potencia** es el ritmo de gasto (control en escala logarítmica).' });
    var rt = rango({ label: 'Tiempo encendido', min: 0, max: 1000, value: TM.toP(3600), fmt: function (pp) { return dur(TM.toV(pp)); }, on: function (pp) { t = TM.toV(pp); tim.limpiar(); draw(); }, help: 'El **tiempo** multiplica el ritmo para dar el total.' });
    dev = chips(DEV, function (d) { P = d.p; rp.set(PM.toP(d.p)); draw(); }, { label: 'Aparatos', sel: 0 });
    tim = chips(TIM, function (d) { t = d.t; rt.set(TM.toP(d.t)); draw(); }, { label: 'Tiempos', sel: 2 });
    var cmp = h('button', { type: 'button', class: 'btn small ghost' }, 'Comparar: hervidor 1 minuto frente a cargador 8 horas');
    function draw() {
      var E = P * t;
      M.clear(out);
      out.appendChild(h('div', null, h('span', { class: 't3-k' }, 'energía = potencia × tiempo = '), siUnit(P, 'W') + ' × ' + dur(t) + (t >= 60 ? ' (' + sci(t, 2) + ' s)' : '') + ' = ', h('b', null, joules(E))));
      decir(say, 'La potencia (' + siUnit(P, 'W') + ') no cambia con el tiempo; la energía, sí: con el doble de tiempo, el doble de julios. 1 Wh = 3.600 J.');
    }
    cmp.addEventListener('click', function () {
      var a = 2600 * 60, b = 20 * 28800;
      decir(say, '**Hervidor**: 2.600 W × 60 s = ' + fmt(a) + ' J ≈ ' + fmt(a / 3600, 0) + ' Wh. **Cargador**: 20 W × 8 h = ' + fmt(b) + ' J = ' + fmt(b / 3600, 0) + ' Wh. El aparato de menor potencia gastó **' + fmt(b / a, 1) + ' veces** más energía, porque estuvo encendido mucho más tiempo.');
    });
    el.appendChild(h('p', { class: 'w-note' }, h('b', null, 'Calculadora de energía. '), 'Elige un aparato y un tiempo, o usa los controles.'));
    el.appendChild(dev);
    el.appendChild(tim);
    el.appendChild(h('div', { class: 'm2-grid2' }, rp.wrap, rt.wrap));
    el.appendChild(out);
    el.appendChild(h('div', { class: 'btnrow' }, cmp));
    el.appendChild(say);
    draw();
  }
  function comparadorEficiencia(el) {
    var PM = logMap(1, 1e7), RM = logMap(1, 1e18);
    var MQ = [{ n: 'Máquina A', P: 10, R: 100 }, { n: 'Máquina B', P: 1000, R: 1e6 }];
    var out = outBox(), say = sayBox();
    var cols = MQ.map(function (m) {
      var rp = rango({ label: m.n + ' · potencia', min: 0, max: 1000, value: PM.toP(m.P), dim: 'nrg', fmt: function (pp) { return siUnit(PM.toV(pp), 'W'); }, on: function (pp) { m.P = PM.toV(pp); draw(); } });
      var rr = rango({ label: m.n + ' · trabajo útil', min: 0, max: 1000, value: RM.toP(m.R), dim: 'cmp', fmt: function (pp) { return nice(RM.toV(pp)) + ' tareas/s'; }, on: function (pp) { m.R = RM.toV(pp); draw(); } });
      return h('div', { class: 't3-maq' }, rp.wrap, rr.wrap);
    });
    function draw() {
      var e = MQ.map(function (m) { return m.P / m.R; });
      M.clear(out);
      MQ.forEach(function (m, i) { out.appendChild(h('div', null, h('span', { class: 't3-k' }, m.n + ': '), siUnit(m.P, 'W') + ' ÷ ' + nice(m.R) + ' tareas/s = ', h('b', null, siUnit(e[i], 'J') + ' por tarea'))); });
      var morePower = MQ[0].P > MQ[1].P ? 0 : 1, eff = e[0] < e[1] ? 0 : 1, ratio = Math.max(e[0], e[1]) / Math.min(e[0], e[1]);
      decir(say, 'Consume más potencia la **' + MQ[morePower].n + '**; gasta menos energía por tarea —es más eficiente— la **' + MQ[eff].n + '**, ' + (ratio < 1.05 ? 'aunque la diferencia es mínima.' : 'unas ' + (ratio >= 1e4 ? sci(ratio, 1) : fmt(ratio, ratio < 10 ? 1 : 0)) + ' veces menos.') + (morePower === eff ? ' Aquí la que más consume es también la más eficiente: **consumir menos no significa ser más eficiente**.' : ''));
    }
    el.appendChild(h('p', { class: 'w-note' }, h('b', null, 'Comparador de eficiencia. '), 'Dos máquinas inventadas: ajusta cuánta potencia consume cada una y cuánto trabajo útil hace por segundo.'));
    el.appendChild(h('div', { class: 'm2-grid2' }, cols));
    el.appendChild(out);
    el.appendChild(say);
    draw();
  }
  W['m2.energy'] = function (el) {
    var a = h('div', { class: 't3-lab' }), b = h('div', { class: 't3-lab' });
    calculadoraEnergia(a);
    comparadorEficiencia(b);
    el.appendChild(a);
    el.appendChild(h('hr', { class: 't3-hr' }));
    el.appendChild(b);
  };

  /* =====================================================================
     D4 · Adivina el número (bits) y clasifica los flujos de información
     ===================================================================== */
  function adivina(el) {
    var lo, hi, secret, qs;
    var bar = h('div', { class: 't3-gbar' }), out = outBox(), say = sayBox();
    var list = h('ol', { class: 't3-log', 'aria-label': 'Preguntas hechas' });
    var thr = rango({ label: 'Tu pregunta: «¿es mayor que…?»', min: 1, max: 1023, value: 512, dim: 'inf', fmt: function (v) { return fmt(v); }, help: 'Por defecto se propone la **mitad** del rango posible, la mejor pregunta. Pruébalo también con preguntas peores.' });
    var ask = h('button', { type: 'button', class: 'btn small primary' }, 'Preguntar');
    var best = h('button', { type: 'button', class: 'btn small ghost' }, 'Proponer la mejor pregunta');
    var again = h('button', { type: 'button', class: 'btn small ghost' }, 'Nueva partida');
    var anchoBar = 520;
    function newGame() {
      lo = 1; hi = 1024; secret = 1 + Math.floor(Math.random() * 1024); qs = 0;
      M.clear(list); thr.set(512); ask.disabled = false; draw();
      decir(say, 'He pensado un número entre 1 y 1.024. Hay **1.024 posibilidades**. Pregunta y observa cómo se reducen.');
    }
    function pintarBarra(w) {
      anchoBar = w;
      var x0 = 10, x1 = w - 10;
      var sc = function (v) { return x0 + (v - 1) / 1023 * (x1 - x0); };
      var svg = S('svg', { viewBox: '0 0 ' + w + ' 56', class: 'm2-svg', role: 'img', 'aria-label': 'Rango posible: de ' + lo + ' a ' + hi });
      svg.appendChild(S('rect', { x: x0, y: 18, width: x1 - x0, height: 14, rx: 7, class: 't3-gwash' }));
      svg.appendChild(S('rect', { x: sc(lo), y: 18, width: Math.max(3, sc(hi) - sc(lo)), height: 14, rx: 7, class: 't3-grng' }));
      T(svg, x0, 50, '1', 't3-tl');
      T(svg, x1, 50, '1.024', 't3-tl', { 'text-anchor': 'end' });
      M.clear(bar);
      bar.appendChild(svg);
    }
    function draw() {
      pintarBarra(anchoBar);
      var nn = hi - lo + 1;
      M.clear(out);
      out.appendChild(linea('Posibilidades que quedan: ', [h('b', null, fmt(nn)), ' (de ' + fmt(lo) + ' a ' + fmt(hi) + ')']));
      out.appendChild(linea('Preguntas hechas (bits obtenidos como máximo): ', String(qs)));
    }
    ask.addEventListener('click', function () {
      var x = +thr.inp.value, yes = secret > x, before = hi - lo + 1;
      qs++;
      if (yes) lo = Math.max(lo, x + 1); else hi = Math.min(hi, x);
      var after = hi - lo + 1, info = Math.log2(before / after);
      list.appendChild(h('li', null, '¿Es mayor que ' + fmt(x) + '? → ' + (yes ? 'sí' : 'no') + ' · quedan ' + fmt(after) + ' · información obtenida: ' + fmt(info, 2) + ' bits'));
      draw();
      if (lo === hi) {
        ask.disabled = true;
        decir(say, '¡Es el **' + fmt(lo) + '**! Lo encontraste en **' + qs + '** preguntas. Con la mejor estrategia siempre bastan **10**, porque 2¹⁰ = 1.024: cada buena respuesta aporta 1 bit.');
      } else {
        thr.set(Math.floor((lo + hi - 1) / 2));
        decir(say, info > 0.95 ? 'Buena pregunta: partió las posibilidades casi por la mitad y aportó ~1 bit.' : 'Esa pregunta aportó solo ' + fmt(info, 2) + ' bits: no partió las posibilidades por la mitad.');
      }
    });
    best.addEventListener('click', function () { thr.set(Math.floor((lo + hi - 1) / 2)); });
    again.addEventListener('click', newGame);
    el.appendChild(h('p', { class: 'w-note' }, h('b', null, 'Adivina el número. '), 'Cada pregunta de sí o no, si está bien hecha, aporta un bit.'));
    el.appendChild(bar);
    el.appendChild(thr.wrap);
    el.appendChild(h('div', { class: 'btnrow' }, ask, best, again));
    el.appendChild(out);
    el.appendChild(say);
    el.appendChild(list);
    newGame();
    alObservarAncho(bar, pintarBarra, 520);
  }
  var FLUJOS = {
    intro: '¿Entra en el sistema, se procesa dentro o sale como resultado? Clasifica cada situación.',
    cats: [{ k: 'in', label: 'entra' }, { k: 'proc', label: 'se procesa' }, { k: 'out', label: 'sale' }],
    items: [
      { t: 'La luz que llega a tus ojos mientras miras una calle.', ok: 'in', fb: 'Es información sensorial que entra: forma parte de los ~10⁹ bits/s estimados de entrada.' },
      { t: 'Tu cerebro reconoce que el objeto que se acerca es un coche.', ok: 'proc', fb: 'Es procesamiento interno: transforma la entrada sin que todavía salga una decisión.' },
      { t: 'Decides esperar y no cruzar.', ok: 'out', fb: 'Es la decisión que sale como conducta: unos pocos bits.' },
      { t: 'El micrófono del móvil graba un audio.', ok: 'in', fb: 'Un sensor capta información del exterior: entrada.' },
      { t: 'El móvil comprime la foto antes de enviarla.', ok: 'proc', fb: 'Transformar los datos dentro del aparato es procesamiento.' },
      { t: 'Escribes un mensaje de texto con el teclado.', ok: 'out', fb: 'Lo que tecleas sale de ti: a unos 10 bits por segundo, como mucho, si eres muy rápido.' }
    ]
  };
  W['m2.guess'] = function (el) {
    var a = h('div', { class: 't3-lab' }), b = h('div', { class: 't3-lab' });
    adivina(a);
    m2.clasificar(b, FLUJOS);
    el.appendChild(a);
    el.appendChild(h('hr', { class: 't3-hr' }));
    el.appendChild(h('p', { class: 't3-sub' }, 'Entrada, procesamiento y salida'));
    el.appendChild(b);
  };
  /* La clasificación también puede montarse sola */
  W['m2.classify-flows'] = function (el) { m2.clasificar(el, FLUJOS); };

  /* =====================================================================
     D5 · ¿Se pueden comparar?
     ===================================================================== */
  W['m2.orders'] = function (el) {
    var I = [
      { l: 'Neuronas de C. elegans · 302', v: 302, d: 'cnt', ent: 'neuronas' },
      { l: 'Neuronas de la mosca · 139.255', v: 139255, d: 'cnt', ent: 'neuronas' },
      { l: 'Neuronas de Hala Point · 1,15 × 10⁹', v: 1.15e9, d: 'cnt', ent: 'neuronas de silicio' },
      { l: 'Neuronas del encéfalo · 8,6 × 10¹⁰', v: 8.6e10, d: 'cnt', ent: 'neuronas' },
      { l: 'Sinapsis del encéfalo · 2 × 10¹⁴', v: 2e14, d: 'cnt', ent: 'sinapsis' },
      { l: 'Encéfalo · 20 W', v: 20, d: 'nrg', ent: 'W' },
      { l: 'NVIDIA H100 · 700 W', v: 700, d: 'nrg', ent: 'W' },
      { l: 'Frontier · 24,6 MW', v: 24.6e6, d: 'nrg', ent: 'W' },
      { l: 'Colossus 2 · 946 MW', v: 946e6, d: 'nrg', ent: 'W' },
      { l: 'Encéfalo · ~10¹⁵ FLOP/s (convención)', v: 1e15, d: 'cmp', ent: 'FLOP/s', p: 'conv' },
      { l: 'H100 · 2 × 10¹⁵ FLOP/s (FP8, pico)', v: 2e15, d: 'cmp', ent: 'FLOP/s', p: 'FP8' },
      { l: 'LineShine · 2,2 × 10¹⁸ FLOP/s (FP64)', v: 2.198e18, d: 'cmp', ent: 'FLOP/s', p: 'FP64' },
      { l: 'Conducta deliberada · 10 bits/s', v: 10, d: 'inf', ent: 'bits/s' },
      { l: 'Entrada sensorial · 10⁹ bits/s', v: 1e9, d: 'inf', ent: 'bits/s' }
    ];
    var DN = { cnt: 'cantidad', cmp: 'cómputo', nrg: 'energía', inf: 'información' };
    function mk(lab, sel) {
      var id = uid('sel');
      var s = h('select', { id: id, class: 'input t3-select' });
      I.forEach(function (it, i) { s.appendChild(h('option', { value: i, selected: i === sel ? true : null }, it.l)); });
      return { wrap: h('div', { class: 't3-field' }, h('label', { for: id }, lab), s), s: s };
    }
    var A = mk('Cifra A', 3), B = mk('Cifra B', 0), out = outBox(), say = sayBox();
    function veces(r) { return r >= 1e4 ? sci(r, 1) : fmt(r, r < 10 ? 1 : 0); }
    function draw() {
      var a = I[+A.s.value], b = I[+B.s.value];
      M.clear(out);
      if (a.d !== b.d) {
        out.appendChild(linea('Reglas: ', DN[a.d] + ' frente a ' + DN[b.d]));
        out.appendChild(h('div', null, h('b', null, 'No se comparan.')));
        decir(say, '**' + a.ent + '** y **' + b.ent + '** pertenecen a reglas distintas. Su cociente no dice «cuántas veces mayor»; como mucho define una magnitud nueva' + ((a.d === 'nrg' && b.d === 'cmp') || (a.d === 'cmp' && b.d === 'nrg') ? ' —aquí, julios por operación, la base de la comparación de eficiencia del Acto III—' : '') + '.');
        return;
      }
      if (a === b) { out.appendChild(h('div', null, 'Has elegido la misma cifra dos veces.')); decir(say, 'Elige dos cifras distintas.'); return; }
      var r = Math.max(a.v, b.v) / Math.min(a.v, b.v), big = a.v >= b.v ? a : b, small = a.v >= b.v ? b : a;
      out.appendChild(linea('Regla: ', DN[a.d]));
      out.appendChild(linea('Cociente: ', h('b', null, veces(r) + ' veces')));
      out.appendChild(linea('Órdenes de magnitud (log₁₀ del cociente): ', fmt(L10(r), 1)));
      var note = '';
      if (a.ent !== b.ent) note = ' **Pero ojo:** aunque las dos son cantidades, cuentan objetos distintos (' + a.ent + ' y ' + b.ent + '). El cociente no dice «cuántas veces mayor»; ' + (a.ent === 'sinapsis' || b.ent === 'sinapsis' ? 'dice cuántas sinapsis hay por neurona.' : 'una neurona de silicio no es una neurona biológica.');
      if (a.d === 'cmp' && a.p !== b.p) note = ' **Pero ojo:** las dos cifras usan convenciones distintas (' + (a.p === 'conv' ? 'una convención para el cerebro' : a.p) + ' frente a ' + (b.p === 'conv' ? 'una convención para el cerebro' : b.p) + '). Sin aclararlo, el cociente engaña.';
      if (a.d === 'nrg') note = ' Es una comparación legítima de **potencia eléctrica**; no dice nada de eficiencia ni de inteligencia.';
      decir(say, '**' + big.l.split(' · ')[0] + '** es unas ' + veces(r) + ' veces **' + small.l.split(' · ')[0] + '**.' + note);
    }
    A.s.addEventListener('change', draw);
    B.s.addEventListener('change', draw);
    el.appendChild(h('div', { class: 't3-lab' }, h('p', { class: 'w-note' }, 'Elige dos cifras del recorrido. El comparador solo calcula el cociente si las dos están en la misma regla, y te avisa de los matices.'), h('div', { class: 'm2-grid2' }, A.wrap, B.wrap), out, say));
    draw();
  };
})();
