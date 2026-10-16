/* Laboratorios del Taller 5 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =====================================================================
     Utilidades comunes de los laboratorios y figuras del taller
     ===================================================================== */
  var L10 = Math.log10, P10 = function (e) { return Math.pow(10, e); };
  var RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var ST = { med: 'medido', est: 'estimado', decl: 'declarado', proy: 'proyectado', extr: 'extrapolado' };
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  function sci(v, d) { return m2.sci(v, d == null ? 1 : d); }
  /* Dos cifras significativas: 0,5 · 14 · 100 */
  function sig(v) {
    var d = v >= 10 ? 0 : v >= 1 ? 1 : v >= 0.1 ? 2 : 3;
    var s = fmt(v, d);
    if (s.indexOf(',') >= 0) s = s.replace(/0+$/, '').replace(/,$/, '');
    return s;
  }
  /* Exponente con signo y dos decimales: «+14,30», «−0,30» */
  function lgTxt(v) { return (v < 0 ? '−' : '+') + fmt(Math.abs(v), 2); }
  function ordTxt(v) { return fmt(Math.abs(v), Math.abs(v) < 9.95 ? 1 : 0); }
  /* Número legible con 2–3 cifras significativas */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1);
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Generador pseudoaleatorio con semilla y normal estándar */
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
  }
  function gauss(R) { var u = 0, v = 0; while (u === 0) u = R(); while (v === 0) v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  /* Deslizador logarítmico: posición 0..1000 ↔ valor */
  function logMap(lo, hi) {
    var a = L10(lo), b = L10(hi);
    return { toV: function (q) { return P10(a + (b - a) * q / 1000); }, toP: function (v) { return Math.round((L10(v) - a) / (b - a) * 1000); } };
  }

  /* ---------- SVG ---------- */
  function add(par, tag, attrs, txt) {
    var e = M.s(tag, attrs || null);
    if (txt != null) e.textContent = txt;
    par.appendChild(e);
    return e;
  }
  function T(par, x, y, txt, cls, extra) { return add(par, 'text', Object.assign({ x: x, y: y, class: cls }, extra || {}), txt); }
  function svgRoot(host, w, hh, label, cls) {
    M.clear(host);
    var svg = M.s('svg', { viewBox: '0 0 ' + w + ' ' + hh, width: w, height: hh, role: 'img', 'aria-label': label || '', class: 't5-svg' + (cls ? ' ' + cls : '') });
    host.appendChild(svg);
    return svg;
  }
  function logScale(d0, d1, r0, r1) {
    var l0 = L10(d0), l1 = L10(d1);
    var f = function (v) { return r0 + (L10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    return f;
  }
  function linScale(d0, d1, r0, r1) { return function (v) { return r0 + (v - d0) / (d1 - d0) * (r1 - r0); }; }
  /* Eje logarítmico horizontal con marcas menores 2–9 */
  function logAxisX(g, sc, e0, e1, y, o) {
    o = o || {};
    var step = o.every || 1, lab = o.label || function (e) { return m2.pw(e); }, tick = 6, e;
    if (o.bands) for (e = e0; e < e1; e++) if ((e - e0) % 2 === 0) add(g, 'rect', { x: sc.e(e), y: o.bands[0], width: sc.e(e + 1) - sc.e(e), height: o.bands[1] - o.bands[0], class: 't5-band' });
    if (o.grid) for (e = e0; e <= e1; e++) add(g, 'line', { x1: sc.e(e), x2: sc.e(e), y1: o.grid[0], y2: o.grid[1], class: 't5-grid' });
    add(g, 'line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't5-ax' });
    for (e = e0; e <= e1; e++) {
      var x = sc.e(e);
      add(g, 'line', { x1: x, x2: x, y1: y, y2: y + tick, class: 't5-ax' });
      if ((e - e0) % step === 0) T(g, x, y + tick + 13, lab(e), 't5-tl', { 'text-anchor': 'middle' });
      if (e < e1 && !o.noMinor) for (var m = 2; m < 10; m++) { var xm = sc(m * P10(e)); add(g, 'line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? tick * 0.7 : tick * 0.45), class: 't5-tkm' }); }
    }
  }
  /* Eje logarítmico vertical */
  function logAxisY(g, sc, e0, e1, x, o) {
    o = o || {};
    var step = o.every || 1, e;
    if (o.grid) for (e = e0; e <= e1; e += (o.gridEvery || 1)) add(g, 'line', { y1: sc.e(e), y2: sc.e(e), x1: o.grid[0], x2: o.grid[1], class: 't5-grid' });
    add(g, 'line', { y1: sc.e(e0), y2: sc.e(e1), x1: x, x2: x, class: 't5-ax' });
    for (e = e0; e <= e1; e++) {
      var y = sc.e(e);
      add(g, 'line', { y1: y, y2: y, x1: x - 5, x2: x, class: 't5-ax' });
      if ((e - e0) % step === 0) T(g, x - 9, y + 4, m2.pw(e), 't5-tl', { 'text-anchor': 'end' });
      if (e < e1) for (var m = 2; m < 10; m++) { var ym = sc(m * P10(e)); add(g, 'line', { y1: ym, y2: ym, x1: x - (m === 5 ? 3.5 : 2.2), x2: x, class: 't5-tkm' }); }
    }
  }
  /* Marcador según el tipo de cifra: rombo lleno medido, círculo lleno estimado,
     cuadrado declarado, rombo hueco proyectado, círculo hueco extrapolado */
  function marker(g, x, y, st, col, r) {
    r = r || 5.5;
    var grp = add(g, 'g', { class: 't5-mk' });
    var hueco = st === 'proy' || st === 'extr';
    var cls = hueco ? 't5-hueco t5-s-' + col : 't5-f-' + col + ' t5-ring';
    if (st === 'med' || st === 'proy') add(grp, 'rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls });
    else if (st === 'decl') add(grp, 'rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls });
    else add(grp, 'circle', { cx: x, cy: y, r: r * 0.92, class: cls });
    return grp;
  }
  /* Corchete de razón entre dos posiciones de un eje logarítmico */
  function bracket(g, xa, xb, y, text) {
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb);
    var grp = add(g, 'g', { class: 't5-rb' });
    add(grp, 'path', { d: 'M' + x0 + ',' + (y + 5) + 'V' + y + 'H' + x1 + 'V' + (y + 5), class: 't5-rb-l' });
    if (text) T(grp, (x0 + x1) / 2, y - 6, text, 't5-rb-t', { 'text-anchor': 'middle' });
    return grp;
  }
  var nId = 0;
  function hatch(svg, cls) {
    var id = 't5h-' + (++nId);
    var defs = add(svg, 'defs');
    var pt = add(defs, 'pattern', { id: id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
    add(pt, 'line', { x1: 0, y1: 0, x2: 0, y2: 6, class: cls, 'stroke-width': 1.6 });
    return 'url(#' + id + ')';
  }

  /* ---------- Lecturas al pasar el cursor, tocar o enfocar con el teclado ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tipHtml(lines) { return lines.filter(Boolean).map(function (l, i) { return i === 0 ? '<b>' + esc(l) + '</b>' : esc(l); }).join('<br>'); }
  function bindTip(node, lines) {
    var get = typeof lines === 'function' ? lines : function () { return lines; };
    function show(x, y) { if (M.tipShow) M.tipShow(tipHtml(get()), x, y); }
    function hide() { if (M.tipHide) M.tipHide(); }
    node.addEventListener('pointermove', function (e) { show(e.clientX, e.clientY); });
    node.addEventListener('pointerdown', function (e) { show(e.clientX, e.clientY); });
    node.addEventListener('pointerleave', hide);
    node.addEventListener('focus', function () { var r = node.getBoundingClientRect(); show(r.left + Math.min(r.width / 2, 140), r.top + 4); });
    node.addEventListener('blur', hide);
  }
  /* Franja invisible que recibe el cursor y el foco */
  function hitRow(g, x, y, w, hh, label, lines) {
    var r = add(g, 'rect', { x: x, y: y, width: Math.max(0, w), height: Math.max(0, hh), class: 't5-hit', tabindex: 0, role: 'img', 'aria-label': label });
    bindTip(r, lines);
    return r;
  }

  /* ---------- Redibujar al cambiar el ancho ---------- */
  function responsive(host, render) {
    var lastW = 0;
    function go() {
      var w = Math.round(host.clientWidth);
      if (w < 120 || Math.abs(w - lastW) <= 1) return;
      lastW = w; render(w);
    }
    if ('ResizeObserver' in window) new ResizeObserver(go).observe(host);
    else window.addEventListener('resize', go);
    render(320);
    return function () { lastW = 0; go(); };
  }
  /* Animaciones: siguen mientras el elemento está en la página */
  function vivo(el, st) {
    if (el.isConnected) { st.visto = true; return true; }
    return !st.visto && (performance.now() - st.t0 < 10000);
  }

  /* ---------- Piezas de interfaz ---------- */
  var nR = 0;
  function rango(o) {
    var id = 't5r-' + (++nR);
    var out = h('output', { class: 'desl-v', for: id });
    var inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    var wrap = h('div', { class: 'desl t5-desl' + (o.dim ? ' t5-d-' + o.dim : '') }, h('label', { for: id }, rich(o.label)), inp, out,
      o.help ? p(o.help, { class: 't5-help' }) : null);
    function upd() { var t = o.fmt ? o.fmt(+inp.value) : String(inp.value); out.textContent = t; inp.setAttribute('aria-valuetext', t); }
    inp.addEventListener('input', function () { if (o.on) o.on(+inp.value); upd(); });
    upd();
    return { wrap: wrap, inp: inp, set: function (v) { inp.value = v; upd(); } };
  }
  function chips(items, on, o) {
    o = o || {};
    var g = h('div', { class: 'chips t5-chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === o.sel) }, it.l != null ? it.l : it);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(it, i); });
      g.appendChild(b);
      return b;
    });
    g.pick = function (i) { bs.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === i)); }); };
    g.clear = function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); };
    return g;
  }
  function outBox() { return h('div', { class: 'm2-out t5-out', 'aria-live': 'polite' }); }
  function sayBox() { return h('p', { class: 't5-say', 'aria-live': 'polite' }); }
  function kk(txt) { return h('span', { class: 't5-k' }, txt); }
  function linea() { return h.apply(null, ['div', null].concat(Array.prototype.slice.call(arguments))); }
  function poner(box, nodos) { M.clear(box); nodos.forEach(function (n) { if (n) box.appendChild(n); }); }
  function decir(box, md) { M.clear(box); box.appendChild(rich(md)); }
  function rotulo(t) { return h('p', { class: 't5-glabel' }, t); }

  /* =====================================================================
     I.5 · La multiplicación ingenua
     ===================================================================== */
  W['m2.naive'] = function (el) {
    var P = [{ l: '4 · célula granular', v: 4 }, { l: '≈2.300 · promedio aritmético', v: 2326 }, { l: '7.000 · cifra popular', v: 7000 }, { l: '10.000 · neocortical (otro recuento)', v: 10000 }, { l: '16.000 · neocortical (un tercer recuento)', v: 16000 }, { l: '175.000 · Purkinje (rata)', v: 175000 }];
    var LM = logMap(1, 1e6), s = 7000, r;
    var box = h('div', { class: 't5-box' }), out = outBox(), say = sayBox();
    var ch = chips(P, function (x) { s = x.v; r.set(LM.toP(s)); draw(); }, { label: 'Sinapsis por neurona supuestas', sel: 2 });
    r = rango({ label: 'Sinapsis por neurona que supones para todas', min: 0, max: 1000, value: LM.toP(7000), dim: 'cnt',
      fmt: function () { return fmt(s); }, on: function (q) { s = Math.round(LM.toV(q)); ch.clear(); draw(); },
      help: 'Control logarítmico: cada sexto del recorrido multiplica por 10.' });
    function draw() {
      var tot = 8.6e10 * s, rat = tot / 2e14;
      var w = Math.max(280, box.clientWidth || 320), x0 = 18, x1 = w - 18, y = 60;
      var svg = svgRoot(box, w, 104, 'Total de sinapsis resultante frente a la referencia de 10 elevado a 14 a 10 elevado a 15');
      var sc = logScale(1e11, 1e17, x0, x1);
      add(svg, 'rect', { x: sc(1e14), y: y - 30, width: sc(1e15) - sc(1e14), height: 40, class: 't5-wash-cnt' });
      T(svg, sc(1e14) + 4, y - 34, w < 460 ? 'referencia 10¹⁴–10¹⁵' : 'intervalo de referencia 10¹⁴–10¹⁵', 't5-lbx');
      add(svg, 'line', { x1: sc(2e14), x2: sc(2e14), y1: y - 30, y2: y + 10, class: 't5-ref' });
      logAxisX(svg, sc, 11, 17, y + 12, {});
      marker(svg, sc(clamp(tot, 1e11, 1e17)), y - 8, 'extr', 'cnt', 7);
      poner(out, [
        linea(kk('8,6 × 10¹⁰ neuronas × '), fmt(s) + ' = ', h('b', null, sci(tot, 1) + ' sinapsis')),
        linea(kk('Frente a la referencia (2 × 10¹⁴): '), rat >= 1 ? '×' + fmt(rat, rat < 10 ? 1 : 0) : '÷' + fmt(1 / rat, 1 / rat < 10 ? 1 : 0))
      ]);
      say.textContent = Math.abs(L10(rat)) < 0.08 ? 'Coincide con la referencia, pero con un valor (~2.300) que no describe a ninguna neurona real: es solo el promedio aritmético.'
        : (rat > 1 ? 'Te pasas: has supuesto que todas las neuronas tienen ' + fmt(s) + ' sinapsis, y la mayoría (las granulares del cerebelo) tienen unas cuatro.'
          : 'Te quedas corto: las granulares son la mayoría por número, pero otras neuronas tienen miles o cientos de miles de sinapsis.');
    }
    el.appendChild(h('div', { class: 't5-lab' },
      p('Elige cuántas sinapsis supones para cada neurona y compara el total con la referencia de cálculo (unas 2 × 10¹⁴ sinapsis en todo el encéfalo).', { class: 't5-mini' }),
      ch, r.wrap, box, out, say));
    responsive(box, draw);
  };

  /* =====================================================================
     I.6 · Contar por muestreo
     ===================================================================== */
  W['m2.sampling'] = function (el) {
    var U = 5000, lam = 80 + Math.floor(Math.random() * 80), k = 4, runs = [], ppl = [], ultimos = null;
    var R = rng((Date.now() % 100000) + 7);
    function truth() { return lam * U; }
    function pois(l) { var L = Math.exp(-l), pr = 1, n = 0; do { n++; pr *= R(); } while (pr > L); return n - 1; }
    function est() { var s = 0; for (var i = 0; i < k; i++) s += pois(lam); return s / k * U; }
    var box = h('div', { class: 't5-box' }), out = outBox(), say = sayBox(), box2 = h('div', { class: 't5-box' }), out2 = outBox();
    var ch = chips([{ l: '1 muestra', k: 1 }, { l: '4 muestras', k: 4 }, { l: '16 muestras', k: 16 }, { l: '64 muestras', k: 64 }], function (x) { k = x.k; runs = []; draw(); }, { label: 'Número de muestras', sel: 1 });
    var b1 = h('button', { type: 'button', class: 'btn small primary' }, 'Contar y estimar');
    var b20 = h('button', { type: 'button', class: 'btn small' }, 'Repetir 20 veces');
    var bN = h('button', { type: 'button', class: 'btn small ghost' }, 'Sopa nueva (otro total)');
    b1.addEventListener('click', function () { runs.push(est()); draw(); });
    b20.addEventListener('click', function () { for (var i = 0; i < 20; i++) runs.push(est()); draw(); });
    bN.addEventListener('click', function () { lam = 80 + Math.floor(Math.random() * 80); runs = []; draw(); });
    var bP = h('button', { type: 'button', class: 'btn small primary' }, 'Medir 4 encéfalos distintos y promediar');
    bP.addEventListener('click', function () {
      var pop = 600000, sd = 0.09, cuatro = [0, 1, 2, 3].map(function () { return pop * (1 + sd * gauss(R)); });
      ppl.push(cuatro.reduce(function (a, b) { return a + b; }, 0) / 4); ultimos = cuatro; drawP();
    });
    function axis(svg, w, lo, hi, y, conNumeros) {
      var sc = linScale(lo, hi, 16, w - 16);
      [lo, (lo + hi) / 2, hi].forEach(function (v, i) {
        add(svg, 'line', { x1: sc(v), x2: sc(v), y1: y, y2: y + 5, class: 't5-ax' });
        if (conNumeros) T(svg, sc(v), y + 18, fmt(v), 't5-tl', { 'text-anchor': i === 0 ? 'start' : i === 2 ? 'end' : 'middle' });
      });
      add(svg, 'line', { x1: 16, x2: w - 16, y1: y, y2: y, class: 't5-ax' });
      return sc;
    }
    function draw() {
      var w = Math.max(280, box.clientWidth || 320), t = truth();
      var svg = svgRoot(box, w, 96, 'Estimaciones repetidas frente al total verdadero');
      var sc = axis(svg, w, t * 0.5, t * 1.5, 62, runs.length > 0);
      add(svg, 'line', { x1: sc(t), x2: sc(t), y1: 14, y2: 62, class: 't5-ref' });
      T(svg, w < 460 ? sc(t) - 5 : sc(t) + 5, 18, 'total verdadero', 't5-lbx', w < 460 ? { 'text-anchor': 'end' } : {});
      runs.forEach(function (v, i) { add(svg, 'circle', { cx: sc(clamp(v, t * 0.5, t * 1.5)), cy: 50 - (i % 6) * 5, r: 3.4, class: 't5-f-cnt t5-op7' }); });
      if (!runs.length) { poner(out, [linea('Elige cuántas muestras contar y pulsa «Contar y estimar».')]); say.textContent = ''; return; }
      var last = runs[runs.length - 1], err = (last - t) / t * 100, lo = Math.min.apply(null, runs), hi = Math.max.apply(null, runs);
      poner(out, [
        linea(kk('Última estimación (' + k + (k === 1 ? ' muestra' : ' muestras') + '): '), fmt(Math.round(last)) + ' · error ' + (err >= 0 ? '+' : '−') + fmt(Math.abs(err), 1) + ' %'),
        linea(kk('Total verdadero: '), fmt(t)),
        linea(kk(runs.length + (runs.length === 1 ? ' estimación' : ' estimaciones') + ', de '), fmt(Math.round(lo)) + ' a ' + fmt(Math.round(hi)))
      ]);
      decir(say, 'Con **' + k + '** ' + (k === 1 ? 'muestra' : 'muestras') + ', las estimaciones se reparten ' + (runs.length > 4 ? 'en una franja de ±' + fmt((hi - lo) / 2 / t * 100, 0) + ' % alrededor del total' : 'alrededor del total') + '. Prueba con más muestras: la franja se estrecha, pero nunca desaparece.');
    }
    function drawP() {
      var w = Math.max(280, box2.clientWidth || 320);
      var svg = svgRoot(box2, w, 96, 'Totales de cuatro encéfalos y su promedio');
      var sc = axis(svg, w, 420000, 780000, 62, true);
      add(svg, 'line', { x1: sc(600000), x2: sc(600000), y1: 14, y2: 62, class: 't5-ref' });
      T(svg, sc(600000) + 5, 11, w < 460 ? 'promedio real' : 'promedio real de la población', 't5-lbx');
      if (ultimos) ultimos.forEach(function (v) { var x = sc(clamp(v, 420000, 780000)); add(svg, 'rect', { x: x - 3.5, y: 40, width: 7, height: 7, class: 't5-f-ink' }); });
      ppl.forEach(function (v, i) { marker(svg, sc(clamp(v, 420000, 780000)), 34 - (i % 3) * 5, 'est', 'cnt', 5); });
      if (!ppl.length) { poner(out2, [linea('Cada persona tiene su propio total. Pulsa el botón para medir a cuatro y promediar.')]); return; }
      var lo = Math.min.apply(null, ppl), hi = Math.max.apply(null, ppl);
      poner(out2, [
        linea(kk('Promedios de 4 personas obtenidos: '), String(ppl.length)),
        linea(kk('Han ido de '), fmt(Math.round(lo)) + ' a ' + fmt(Math.round(hi)) + ' (el real es 600.000)')
      ]);
    }
    el.appendChild(h('div', { class: 't5-lab' },
      p('Simulación con números inventados. Primero, el error de muestreo en una sola «sopa»:', { class: 't5-mini' }),
      ch, h('div', { class: 'btnrow' }, b1, b20, bN), box, out, say,
      p('**Después, la variación entre personas.** Aunque cada encéfalo se contara perfectamente, cada persona tiene un total distinto (en esta simulación, cada persona se aparta del promedio un 9 % típico). ¿Cuánto se acerca al promedio de la población el promedio de solo cuatro?', { class: 't5-mini t5-sep' }),
      h('div', { class: 'btnrow' }, bP), box2, out2));
    responsive(box, function () { draw(); drawP(); });
  };

  /* =====================================================================
     I.7 · Un factor cada vez
     ===================================================================== */
  W['m2.sfkone'] = function (el) {
    var F = [
      { k: 'S', l: 'S · sinapsis', lo: 1e14, hi: 1e15, why: 'Cuántas sinapsis hay. Su intervalo (10¹⁴–10¹⁵) refleja que el cerebelo y otras regiones están peor cuantificados que la neocorteza.' },
      { k: 'f', l: 'f · frecuencia', lo: 0.1, hi: 1, why: 'Con qué frecuencia media se activa cada sinapsis. El intervalo de 0,1–1 Hz procede de los modelos y del presupuesto energético.' },
      { k: 'k', l: 'k · operaciones por activación', lo: 1, hi: 100, why: 'Cuántas operaciones digitales costaría imitar cada activación. Es el factor más incierto: depende de cuánto detalle de la sinapsis haga falta copiar.' }
    ];
    var cur = 0, val = { S: 2e14, f: 0.5, k: 10 }, LM = logMap(F[0].lo, F[0].hi);
    var out = outBox(), say = sayBox(), box = h('div', { class: 't5-box' }), why = h('p', { class: 't5-help t5-why', 'aria-live': 'polite' });
    function fmtF(f, v) { return f.k === 'S' ? sci(v, 1) + ' sinapsis' : f.k === 'f' ? sig(v) + ' Hz' : sig(v) + ' FLOP'; }
    function decirPorque(f) { decir(why, '**' + f.l + ':** ' + f.why); }
    var r = rango({ label: 'Valor del factor elegido', min: 0, max: 1000, value: LM.toP(2e14), dim: 'cmp',
      fmt: function (q) { return fmtF(F[cur], LM.toV(q)); }, on: function (q) { val[F[cur].k] = LM.toV(q); draw(); } });
    /* Al cambiar de factor, los tres vuelven a su valor central: así solo se mueve el elegido */
    var ch = chips(F, function (f, i) { cur = i; LM = logMap(f.lo, f.hi); val.S = 2e14; val.f = 0.5; val.k = 10; r.set(LM.toP(val[f.k])); decirPorque(f); draw(); }, { label: 'Factor que quieres mover', sel: 0 });
    var reset = h('button', { type: 'button', class: 'btn small ghost' }, 'Volver al escenario central');
    reset.addEventListener('click', function () { val.S = 2e14; val.f = 0.5; val.k = 10; r.set(LM.toP(val[F[cur].k])); draw(); });
    function draw() {
      var C = val.S * val.f * val.k, d = L10(C / 1e15);
      poner(out, [
        linea(kk('S × f × k = '), sci(val.S, 1) + ' × ' + sig(val.f) + ' × ' + sig(val.k) + ' = ', h('b', null, sci(C, 1) + ' FLOP/s')),
        linea(kk('En exponentes: '), fmt(L10(val.S), 2) + ' ' + lgTxt(L10(val.f)).replace(/^([+−])/, '$1 ') + ' ' + lgTxt(L10(val.k)).replace(/^([+−])/, '$1 ') + ' = ' + fmt(L10(C), 2)),
        linea(kk('Respecto del escenario central (10¹⁵): '), Math.abs(d) < 0.005 ? 'igual' : (d > 0 ? '+' : '−') + fmt(Math.abs(d), 2) + ' órdenes de magnitud')
      ]);
      var w = Math.max(280, box.clientWidth || 320), x0 = 18, x1 = w - 18, y = 52;
      var svg = svgRoot(box, w, 92, 'Resultado en una escala logarítmica de 10 elevado a 12 a 10 elevado a 18 FLOP por segundo');
      var sc = logScale(1e12, 1e18, x0, x1);
      add(svg, 'rect', { x: sc(1e13), y: y - 26, width: sc(1e17) - sc(1e13), height: 34, class: 't5-wash-cmp' });
      T(svg, sc(1e13) + 4, y - 30, 'intervalo de Carlsmith (2020)', 't5-lbx');
      logAxisX(svg, sc, 12, 18, y + 10, {});
      marker(svg, sc(clamp(C, 1e12, 1e18)), y - 6, 'est', 'cmp', 7);
      var f = F[cur], span = L10(f.hi / f.lo);
      decir(say, 'Moviendo solo **' + f.l + '** de un extremo a otro de su intervalo, el resultado recorre **' + fmt(span, 0) + (Math.round(span) === 1 ? ' orden' : ' órdenes') + ' de magnitud**, porque el resultado es proporcional a cada factor.');
    }
    decirPorque(F[0]);
    el.appendChild(h('div', { class: 't5-lab' },
      p('Experimento con una sola variable: elige un factor y muévelo dentro de su intervalo; los otros dos se quedan en su valor central.', { class: 't5-mini' }),
      ch, why, r.wrap, h('div', { class: 'btnrow' }, reset), box, out, say));
    responsive(box, draw);
  };

  /* =====================================================================
     I.8 · Escalera de la emulación frente a las máquinas
     ===================================================================== */
  W['m2.ladder'] = function (el) {
    var LV = [{ l: 'Poblaciones · 10¹⁵', v: 1e15, d: 'grupos de neuronas modelados en conjunto' }, { l: 'Red de impulsos · 10¹⁸', v: 1e18, d: 'cada neurona solo suma lo que recibe y dispara impulsos' },
      { l: 'Electrofisiología · 10²²', v: 1e22, d: 'la electricidad de cada neurona, con modelos electrofisiológicos' }, { l: 'Metaboloma · 10²⁵', v: 1e25, d: 'además, el metaboloma: el conjunto de moléculas del metabolismo' },
      { l: 'Proteoma · 10²⁶', v: 1e26, d: 'además, el proteoma: el conjunto de proteínas' }, { l: 'Molecular · desde 10²⁷', v: 1e27, min: true, d: 'niveles moleculares más finos, de 10²⁷ a 10⁴³' }];
    var MC = [{ l: 'LineShine · 2,2 × 10¹⁸', v: 2.198e18, p: 'FP64', st: 'med' }, { l: 'El Capitan · 1,7 × 10¹⁹', v: 1.67e19, p: 'mixta', st: 'med' }, { l: 'FugakuNEXT · 6 × 10²⁰ (objetivo)', v: 6e20, p: 'FP8', st: 'proy' }];
    var lv = LV[1], mc = MC[0];
    var out = outBox(), say = sayBox();
    var a = chips(LV, function (x) { lv = x; draw(); }, { label: 'Nivel de detalle', sel: 1 });
    var b = chips(MC, function (x) { mc = x; draw(); }, { label: 'Máquina', sel: 0 });
    function draw() {
      var r = lv.v / mc.v, nm = mc.l.split(' · ')[0];
      /* Dos cifras significativas: «unas 2,2 veces», «unas 4.500 máquinas» */
      function unas(v) { return v >= 1e6 ? sci(v, 1) : nice(Number(v.toPrecision(2))); }
      poner(out, [
        linea(kk('Qué se copia: '), lv.d),
        linea(kk('Necesario para ese nivel: '), (lv.min ? 'desde ' : '') + sci(lv.v, 0) + ' FLOP/s ', m2.marca('estimado')),
        linea(kk('Disponible en ' + nm + ': '), sci(mc.v, 1) + ' FLOP/s ', m2.marca(ST[mc.st]))
      ]);
      decir(say, (r <= 1 ? 'En el papel, ' + nm + ' tiene unas **' + unas(1 / r) + ' veces** lo necesario para ese nivel.' : 'Harían falta unas **' + unas(r) + '** máquinas como esta funcionando a su cifra máxima.') +
        ' Salvedades: la cifra de la máquina es de ' + (mc.p === 'FP64' ? 'la prueba {{HPL|g-hpl}} en doble precisión ({{FP64|g-fp}})' : mc.p === 'mixta' ? 'la prueba HPL-MxP, en {{precisión mixta|g-mixta}}' : 'un objetivo en {{FP8|g-fp}} con {{dispersión|g-dispersion}}') + ', no de una emulación real; y nadie sabe qué nivel de detalle es necesario.');
    }
    el.appendChild(h('div', { class: 't5-lab' },
      p('Elige un nivel de detalle (Sandberg y Bostrom, 2008; estimado) y una máquina de 2026.', { class: 't5-mini' }),
      rotulo('Nivel de detalle'), a, rotulo('Máquina'), b, out, say));
    draw();
  };

  /* =====================================================================
     I.9 · Bits por segundo al teclear
     ===================================================================== */
  W['m2.typing'] = function (el) {
    var wpm = 120, bpc = 1;
    var out = outBox(), say = sayBox();
    var r1 = rango({ label: 'Velocidad', min: 20, max: 240, step: 5, value: 120, dim: 'inf', fmt: function (v) { return v + ' palabras/min'; }, on: function (v) { wpm = v; draw(); },
      help: 'Supuesto habitual: **5 caracteres por palabra**, contando el espacio.' });
    var r2 = rango({ label: 'Información por carácter', min: 5, max: 48, value: 10, dim: 'inf', fmt: function (v) { return fmt(v / 10, 1) + ' bits'; }, on: function (v) { bpc = v / 10; draw(); },
      help: '**~1 bit** es la estimación para texto muy predecible (Zheng y Meister, 2025). Un texto completamente al azar con 27 símbolos daría log₂ 27 ≈ 4,75 bits.' });
    function draw() {
      var cps = wpm * 5 / 60, bps = cps * bpc;
      poner(out, [
        linea(kk(wpm + ' × 5 ÷ 60 = '), fmt(cps, 1) + ' caracteres/s · × ' + fmt(bpc, 1) + ' bits = ', h('b', null, fmt(bps, 1) + ' bits/s')),
        linea(kk('Frente a la entrada sensorial (~10⁹ bits/s): '), '≈ ' + sci(1e9 / bps, 1) + ' veces menos')
      ]);
      /* El mensaje sigue a los deslizadores: cuántos bits/s y cuántos órdenes por debajo de la entrada */
      var n = Math.round(L10(1e9 / bps)), NUM = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
      var cuanto = bps < 10 ? 'menos de 10 bits por segundo' : bps < 100 ? 'decenas de bits por segundo' : 'unos cien bits por segundo';
      decir(say, 'Con estos valores, la salida deliberada se queda en **' + cuanto + '**: unos ' + NUM[n] + (n === 1 ? ' orden' : ' órdenes') + ' de magnitud por debajo de lo que entra por los sentidos.' +
        (wpm >= 200 ? ' Y eso, a un ritmo de récord.' : ''));
    }
    el.appendChild(h('div', { class: 't5-lab' },
      p('Mueve la velocidad de escritura y la información que lleva cada carácter, y mira cuántos bits por segundo salen.', { class: 't5-mini' }),
      h('div', { class: 'm2-grid2' }, r1.wrap, r2.wrap), out, say));
    draw();
  };

  /* =====================================================================
     Figura · Dónde están las neuronas (860 cuadros de ~100 millones)
     ===================================================================== */
  W['m2.fig-donde'] = function (el) {
    var COLS = 43, ROWS = 20, N = COLS * ROWS, s = 10, gap = 1.6;
    var G = [
      { n: 690, c: 'cer', l: 'Cerebelo', v: '69.000 millones', p: '80 %', d: 'cerca del 10 % de la masa encefálica' },
      { n: 163, c: 'cor', l: 'Corteza cerebral', v: '16.300 millones', p: '19 %', d: 'sustancia gris y blanca, ~82 % de la masa' },
      { n: 7, c: 'res', l: 'Resto del encéfalo', v: '~690 millones', p: '<1 %', d: 'tronco, diencéfalo y núcleos basales' }
    ];
    var grp = [], i;
    G.forEach(function (g, kx) { for (var j = 0; j < g.n; j++) grp.push(kx); });
    var svg = M.s('svg', { viewBox: '0 0 ' + (COLS * s) + ' ' + (ROWS * s), class: 't5-svg t5-waf', role: 'img', 'aria-label': 'Gráfico de cuadros: 690 del cerebelo, 163 de la corteza cerebral y 7 del resto del encéfalo' });
    var capas = G.map(function (g, kx) { return add(svg, 'g', { class: 't5-waf-g t5-waf-' + g.c, 'data-k': kx }); });
    var rects = [];
    for (i = 0; i < N; i++) {
      var col = (i / ROWS) | 0, row = i % ROWS;
      rects.push(add(capas[grp[i]], 'rect', { x: col * s + gap / 2, y: row * s + gap / 2, width: s - gap, height: s - gap, rx: 1.4 }));
    }
    var foco = -1;
    var lee = h('p', { class: 't5-mini t5-waf-lee', 'aria-live': 'polite' }, 'Se ven las tres regiones. Pulsa una para aislarla.');
    var btns = G.map(function (g, kx) {
      var b = h('button', { type: 'button', class: 'chip t5-waf-chip', 'aria-pressed': 'false' },
        h('span', { class: 't5-sw t5-sw-' + g.c, 'aria-hidden': 'true' }), g.l + ' ', h('span', { class: 't5-cv' }, g.v + ' · ' + g.p));
      b.addEventListener('click', function () {
        foco = foco === kx ? -1 : kx;
        btns.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === foco)); });
        capas.forEach(function (c, j) { c.classList.toggle('t5-dim', foco >= 0 && j !== foco); });
        lee.textContent = foco < 0 ? 'Se ven las tres regiones.' : G[foco].l + ': ' + G[foco].v + ' de neuronas, ' + G[foco].p + ' del total (' + G[foco].d + '). Cada cuadro ≈ 100 millones.';
      });
      return b;
    });
    /* Ficha del cuadro al pasar el cursor o al tocarlo en una pantalla táctil */
    function ficha(e) {
      var g = e.target && e.target.parentNode && e.target.parentNode.getAttribute ? e.target.parentNode.getAttribute('data-k') : null;
      if (g == null) { if (M.tipHide) M.tipHide(); return; }
      var d = G[+g];
      if (M.tipShow) M.tipShow(tipHtml([d.v + ' de neuronas', d.l + ' · ' + d.p + ' del total', d.d + ' · cada cuadro ≈ 100 millones']), e.clientX, e.clientY);
    }
    svg.addEventListener('pointermove', ficha);
    svg.addEventListener('pointerdown', ficha);
    svg.addEventListener('pointerleave', function () { if (M.tipHide) M.tipHide(); });

    /* Destellos al azar: la actividad es dispersa (no representan ninguna cantidad) */
    var st = { t0: performance.now(), visto: false }, activo = !RM.matches, timer = 0, R = rng(7), enVista = true;
    var pausa = h('button', { type: 'button', class: 'btn small ghost t5-pausa', 'aria-pressed': String(!activo) });
    function rotular() { M.clear(pausa); pausa.appendChild(M.icon(activo ? 'pausa' : 'play')); pausa.appendChild(document.createTextNode(activo ? 'Pausar los destellos' : 'Ver los destellos')); pausa.setAttribute('aria-pressed', String(!activo)); }
    function destello() {
      timer = 0;
      if (!activo || !enVista) return;
      if (!vivo(el, st)) return;
      if (el.isConnected) {
        var r = rects[(R() * N) | 0];
        r.classList.remove('t5-flash');
        void r.getBoundingClientRect();
        r.classList.add('t5-flash');
        setTimeout(function () { r.classList.remove('t5-flash'); }, 1000);
      }
      timer = setTimeout(destello, 65);
    }
    pausa.addEventListener('click', function () { activo = !activo; rotular(); if (activo && !timer) destello(); });
    rotular();
    el.appendChild(h('div', { class: 't5-lab t5-fig' },
      h('div', { class: 't5-waf-box' }, svg),
      h('div', { class: 'chips t5-chips', role: 'group', 'aria-label': 'Aislar una región' }, btns),
      lee,
      h('div', { class: 'btnrow' }, pausa, h('span', { class: 'w-note-s' }, 'Los destellos recuerdan que la actividad es dispersa; no representan ninguna cantidad.'))));
    /* Fuera de la pantalla, los destellos se detienen y vuelven al reaparecer */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { enVista = es[es.length - 1].isIntersecting; if (enVista && activo && !timer) destello(); }).observe(svg);
    }
    if (activo) destello();
  };

  /* =====================================================================
     Figura · Con qué frecuencia disparan (escala logarítmica de hercios)
     ===================================================================== */
  W['m2.fig-frecuencia'] = function (el) {
    var HZ = ['0,01', '0,1', '1', '10', '100', '1.000'];
    var box = h('div', { class: 't5-box' });
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, box));
    responsive(box, function (w) {
      var narrow = w < 600, x0 = 18, x1 = w - 18;
      var sc = logScale(1e-2, 1e3, x0, x1);
      var cTop = 54, cBot = 170, rowH = 30, rows0 = cBot + 26, yAx = rows0 + 4 * rowH + 4, hh = yAx + 46;
      var svg = svgRoot(box, w, hh, 'Distribución ilustrativa de tasas de disparo en escala logarítmica, con la media metabólica, el intervalo de los modelos y los máximos medidos', narrow ? 't5-narrow' : '');
      add(svg, 'rect', { x: sc(0.1), y: cTop - 22, width: sc(1) - sc(0.1), height: yAx - cTop + 22, class: 't5-wash-ink' });
      T(svg, sc(0.1) + 6, cTop - 8, narrow ? 'modelos: 0,1–1 Hz' : 'modelos: 0,1–1 Hz (Carlsmith, 2020)', 't5-lbx');
      logAxisX(svg, sc, -2, 3, yAx, { grid: [cTop - 22, yAx], label: function (e) { return HZ[e + 2]; } });
      T(svg, x1, hh - 4, narrow ? 'hercios · escala logarítmica' : 'hercios (impulsos por segundo) · escala logarítmica', 't5-lbx', { 'text-anchor': 'end' });
      /* Curva log-normal ilustrativa: una gaussiana en el espacio del logaritmo */
      var mu = -0.35, sg = 0.62, pk = cBot - cTop, dA = 'M' + sc(1e-2) + ',' + cBot, dL = '';
      for (var i = 0; i <= 160; i++) {
        var e = -2 + 5 * i / 160, y = cBot - pk * Math.exp(-0.5 * Math.pow((e - mu) / sg, 2)), x = sc.e(e);
        dA += 'L' + x.toFixed(1) + ',' + y.toFixed(1); dL += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
      }
      dA += 'L' + sc(1e3) + ',' + cBot + 'Z';
      add(svg, 'path', { d: dA, class: 't5-wash-ink' });
      add(svg, 'path', { d: dL, class: 't5-ln t5-s-ink' });
      add(svg, 'line', { x1: x0, x2: x1, y1: cBot, y2: cBot, class: 't5-ax' });
      if (narrow) T(svg, x0 + 3, cBot - 7, 'forma log-normal', 't5-lbx');
      else T(svg, sc.e(mu - sg * 1.15) - 6, cTop + 46, 'forma log-normal ilustrativa', 't5-lbx', { 'text-anchor': 'end' });
      /* 100 Hz: incompatible con el presupuesto energético */
      var x100 = sc(100);
      add(svg, 'line', { x1: x100, x2: x100, y1: cTop - 22, y2: yAx, class: 't5-ref' });
      T(svg, x100 - 6, cTop + 8, '100 Hz de media:', 't5-lbx', { 'text-anchor': 'end' });
      if (narrow) { T(svg, x100 - 6, cTop + 21, 'incompatible', 't5-lbx', { 'text-anchor': 'end' }); T(svg, x100 - 6, cTop + 34, 'con la energía', 't5-lbx', { 'text-anchor': 'end' }); }
      else T(svg, x100 - 6, cTop + 21, 'incompatible con la energía', 't5-lbx', { 'text-anchor': 'end' });
      /* Corchete: del escenario central (0,5 Hz) a 100 Hz */
      var br = bracket(svg, sc(0.5), x100, cTop - 32, '× 200 = ' + ordTxt(L10(200)) + ' órdenes');
      add(br, 'circle', { cx: sc(0.5), cy: cTop - 27, r: 2.5, class: 't5-f-ink' });
      var RR = [
        { y: 0, l: narrow ? 'Media cortical sostenible' : 'Media cortical sostenible (Lennie, 2003)', v: [0.16], st: 'est', txt: '0,16 Hz', tip: ['≈0,16 Hz', 'Media cortical que permite el presupuesto metabólico', 'Un impulso cada ~6 s · estimado'] },
        { y: 1, l: narrow ? 'Máximos, humano: 338 · 453 Hz' : 'Interneuronas rápidas, humano (n = 92)', v: [338, 453], st: 'med', txt: '338 · 453 Hz', tip: ['338 y 453 Hz', 'Frecuencia media máxima e instantánea máxima', 'Promedios entre células, ex vivo · medido'] },
        { y: 2, l: narrow ? 'Máximos, macaco: 450 · 611 Hz' : 'Interneuronas rápidas, macaco (n = 23)', v: [450, 611], st: 'med', txt: '450 · 611 Hz', tip: ['450 y 611 Hz', 'Frecuencia media máxima e instantánea máxima', 'Promedios entre células, ex vivo · medido'] },
        { y: 3, l: narrow ? 'Una célula humana: 856 Hz' : 'Máximo individual, una célula humana', v: [856], st: 'med', txt: '856 Hz', tip: ['856 Hz', 'Frecuencia instantánea de una interneurona humana', 'Wang et al. (2016) · medido'] }
      ];
      RR.forEach(function (r) {
        var yc = rows0 + r.y * rowH + rowH / 2, g = add(svg, 'g');
        if (r.v.length > 1) add(g, 'line', { x1: sc(r.v[0]), x2: sc(r.v[1]), y1: yc, y2: yc, class: 't5-ln t5-s-ink' });
        r.v.forEach(function (v) { marker(g, sc(v), yc, r.st, 'ink', 5.8); });
        if (r.v[0] < 1) T(g, sc(r.v[0]) + 12, yc + 4, r.l + ' · ' + r.txt, 't5-lbs');
        else T(g, sc(r.v[0]) - 12, yc + 4, r.l + (narrow ? '' : ' · ' + r.txt), 't5-lbs', { 'text-anchor': 'end' });
        hitRow(svg, 0, yc - rowH / 2, w, rowH, narrow && r.y > 0 ? r.l : r.l + ': ' + r.txt, r.tip);
      });
    });
  };

  /* =====================================================================
     Figura · Sinapsis por neurona, de 4 a 175.000
     ===================================================================== */
  W['m2.fig-sinapsis'] = function (el) {
    var D = [
      { l: 'Célula granular del cerebelo', s: 'entradas excitadoras de fibras musgosas', v: 4, txt: '~4', st: 'med', src: 'Litwin-Kumar et al. (2017)' },
      { l: 'Promedio del encéfalo', s: '~2 × 10¹⁴ sinapsis ÷ 8,6 × 10¹⁰ neuronas', a: 2000, b: 3000, v: 2326, txt: '2.000–3.000', st: 'extr', src: 'Cálculo propio' },
      { l: 'Neurona neocortical', s: '1,64 × 10¹⁴ sinapsis ÷ tres recuentos', a: 7200, b: 16000, v: 10000, txt: '7.200–16.000', st: 'extr', src: 'Tang et al. (2001); Pakkenberg y Gundersen (1997); Azevedo et al. (2009); Castro-Fonseca et al. (2023)',
        ticks: [[7200, 'estereología'], [10000, 'Azevedo'], [16000, 'fraccionador']] },
      { l: 'Célula de Purkinje (rata)', s: 'sinapsis de fibras paralelas', v: 175000, txt: '~175.000', st: 'med', src: 'Napper y Harvey (1988)' }
    ];
    var box = h('div', { class: 't5-box' });
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, box));
    responsive(box, function (w) {
      var narrow = w < 620, lw = narrow ? 0 : 212, x0 = narrow ? 14 : lw + 18, x1 = w - (narrow ? 30 : 70);
      var rowH = narrow ? 66 : 58, top = 62, yAx = top + D.length * rowH, hh = yAx + 52;
      var svg = svgRoot(box, w, hh, 'Sinapsis por neurona en escala logarítmica, de 4 a 175.000', narrow ? 't5-narrow' : '');
      var sc = logScale(1, 1e6, x0, x1);
      logAxisX(svg, sc, 0, 6, yAx, { grid: [top - 26, yAx], bands: [top - 26, yAx], every: narrow && w < 400 ? 2 : 1, label: function (e) { return ['1', '10', '100', '1.000', '10.000', '100.000', '1 millón'][e]; } });
      T(svg, x1, hh - 4, 'sinapsis por neurona · escala logarítmica', 't5-lbx', { 'text-anchor': 'end' });
      var xp = sc(7000);
      add(svg, 'line', { x1: xp, x2: xp, y1: top - 22, y2: yAx, class: 't5-ref' });
      T(svg, xp - 6, top - 14, 'cifra popular: 7.000', 't5-lbx', { 'text-anchor': 'end' });
      bracket(svg, sc(4), sc(175000), 18, '× 44.000 ≈ ' + ordTxt(L10(175000 / 4)) + ' órdenes de magnitud');
      D.forEach(function (d, i) {
        var y0 = top + i * rowH, yc = y0 + (narrow ? 44 : rowH / 2 + 4), g = add(svg, 'g');
        if (narrow) T(svg, x0, yc - 22, d.l, 't5-lbs');
        else { T(svg, lw, yc - 2, d.l, 't5-lbs', { 'text-anchor': 'end' }); T(svg, lw, yc + 12, d.s, 't5-lbx', { 'text-anchor': 'end' }); }
        var xe = sc(d.a || d.v);
        add(g, 'line', { x1: sc(1), x2: xe, y1: yc, y2: yc, class: 't5-ln t5-s-cnt t5-stem' });
        if (d.a) add(g, 'rect', { x: sc(d.a), y: yc - 5, width: sc(d.b) - sc(d.a), height: 10, rx: 5, class: 't5-f-cnt t5-op4' });
        if (d.ticks) d.ticks.forEach(function (tk, j) {
          add(g, 'line', { x1: sc(tk[0]), x2: sc(tk[0]), y1: yc - 9, y2: yc + 9, class: 't5-s-cnt t5-tick2' });
          if (!narrow) T(g, sc(tk[0]) + (j === 0 ? -3 : j === 2 ? 3 : 0), j === 1 ? yc - 14 : yc + 22, tk[1], 't5-lbx', { 'text-anchor': j === 0 ? 'end' : j === 2 ? 'start' : 'middle' });
        });
        marker(g, sc(d.v), yc, d.st, 'cnt', 6.5);
        var xt = sc(d.b || d.v) + 12;
        var vt = T(g, xt, yc + 4, d.txt, 't5-tm');
        var dec = L10(d.b || d.v), dec0 = d.a ? L10(d.a) : null;
        var oTxt = (dec0 !== null ? ordTxt(dec0) + '–' : '') + ordTxt(dec) + ' órdenes', oMid = (sc(1) + xe) / 2;
        /* Si la línea es muy corta, el rótulo arranca en el origen para no salirse por la izquierda */
        if (oMid - oTxt.length * 2.9 < 2) T(g, sc(1) + 2, yc - 8, oTxt, 't5-lbx');
        else T(g, oMid, yc - 8, oTxt, 't5-lbx', { 'text-anchor': 'middle' });
        if (xt + 70 > w) { vt.setAttribute('x', sc(d.a || d.v) - 12); vt.setAttribute('text-anchor', 'end'); vt.setAttribute('y', yc - 9); }
        hitRow(svg, 0, y0, w, rowH, d.l + ': ' + d.txt, [d.txt + ' sinapsis por neurona', d.l + ' · ' + ST[d.st], d.src]);
      });
    });
  };

  /* =====================================================================
     Figura · Un valor de referencia con incertidumbre (escala lineal)
     ===================================================================== */
  W['m2.fig-incertidumbre'] = function (el) {
    var D = [
      { l: 'Azevedo et al. (2009)', s: 'fraccionador isotrópico · 4 varones', a: 78.0, b: 94.2, m: 86.1, st: 'med', txt: '86,1 ± 8,1', tip: 'Media ± 1 desviación estándar' },
      { l: 'Goriely (2025a) · varones', s: 'promedios compatibles con los datos', a: 73, b: 99, st: 'est', txt: '73–99', tip: 'Según el estudio considerado' },
      { l: 'Goriely (2025a) · mujeres', s: 'promedios compatibles con los datos', a: 61, b: 73, st: 'est', txt: '61–73', tip: 'Según el estudio considerado' },
      { l: 'von Bartheld (2025)', s: 'estimaciones estereológicas', a: 70, b: 85, st: 'est', txt: '70–85', tip: 'Recuentos por estereología' }
    ];
    var box = h('div', { class: 't5-box' });
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, box));
    responsive(box, function (w) {
      var narrow = w < 540, lw = narrow ? 0 : 214, x0 = narrow ? 14 : lw + 14, x1 = w - 16;
      var rowH = narrow ? 54 : 46, top = 30, yAx = top + D.length * rowH + 2, hh = yAx + 46;
      var svg = svgRoot(box, w, hh, 'Intervalos del número de neuronas del encéfalo humano según cuatro estimaciones, en miles de millones', narrow ? 't5-narrow' : '');
      var sc = linScale(55, 105, x0, x1), v;
      for (v = 60; v <= 100; v += 10) { add(svg, 'line', { x1: sc(v), x2: sc(v), y1: top - 8, y2: yAx, class: 't5-grid' }); T(svg, sc(v), yAx + 17, fmt(v), 't5-tl', { 'text-anchor': 'middle' }); }
      for (v = 55; v <= 105; v += 5) if (v % 10) add(svg, 'line', { x1: sc(v), x2: sc(v), y1: yAx, y2: yAx + 3, class: 't5-tkm' });
      add(svg, 'line', { x1: x0, x2: x1, y1: yAx, y2: yAx, class: 't5-ax' });
      T(svg, x1, hh - 6, narrow ? 'miles de millones · escala lineal' : 'miles de millones de neuronas · escala lineal', 't5-lbx', { 'text-anchor': 'end' });
      var xr = sc(86);
      add(svg, 'line', { x1: xr, x2: xr, y1: top - 16, y2: yAx, class: 't5-ref' });
      var rEnd = xr + 150 > w;
      T(svg, xr + (rEnd ? -6 : 6), top - 12, 'referencia: 86.000 millones', 't5-lbx', { 'text-anchor': rEnd ? 'end' : 'start' });
      D.forEach(function (d, i) {
        var y0 = top + i * rowH, yc = y0 + (narrow ? 36 : rowH / 2 + 2);
        if (narrow) T(svg, x0, yc - 14, d.l + ': ' + d.txt, 't5-lbs');
        else { T(svg, lw, yc - 3, d.l, 't5-lbs', { 'text-anchor': 'end' }); T(svg, lw, yc + 11, d.s, 't5-lbx', { 'text-anchor': 'end' }); }
        var g = add(svg, 'g');
        add(g, 'rect', { x: sc(d.a), y: yc - 4, width: sc(d.b) - sc(d.a), height: 8, rx: 4, class: 't5-f-cnt' + (d.st === 'med' ? '' : ' t5-op6') });
        if (!narrow) T(g, (sc(d.a) + sc(d.b)) / 2, yc - 10, d.txt, 't5-tm', { 'text-anchor': 'middle' });
        if (d.m) marker(g, sc(d.m), yc, 'med', 'cnt', 6.5);
        hitRow(svg, 0, y0, w, rowH, d.l + ': ' + d.txt + ' miles de millones', [d.txt + ' mil millones', d.l, d.tip + ' · ' + ST[d.st]]);
      });
    });
  };

  /* =====================================================================
     Figura · Sinapsis × frecuencia × operaciones por evento
     ===================================================================== */
  W['m2.fig-sfk'] = function (el) {
    var P = [
      { l: 'Conservador', v: [0, 0, 0], h: 'Conservador.', t: ' 10¹⁴ sinapsis que se activan una vez cada diez segundos, con una sola operación por activación: 10¹³ FLOP/s, el extremo inferior del intervalo de Carlsmith (2020).' },
      { l: 'Central', v: [301, 233, 200], h: 'Central.', t: ' ~2 × 10¹⁴ sinapsis, una activación cada dos segundos y ~10 operaciones por activación: ~10¹⁵ FLOP/s. Es la convención que usa este recorrido.' },
      { l: 'Techo del intervalo', v: [1000, 333, 400], h: 'Techo del intervalo.', t: ' 10¹⁵ sinapsis a 1 Hz, con 100 operaciones por activación: 10¹⁷ FLOP/s, el máximo que Carlsmith considera plausible.' },
      { l: '«Exaflop» popular', v: [778, 1000, 229], h: '«Exaflop» popular.', t: ' Supone que todas las neuronas son neocorticales (6 × 10¹⁴ sinapsis), que todas disparan a 100 Hz y que cada activación cuesta 14 operaciones: ~8 × 10¹⁷ FLOP/s. Infla S unas 3 veces y f unas 200 respecto del escenario central.' },
      { l: 'Allyn-Feuer, ilustrativo', v: [1000, 333, 1000], h: 'Allyn-Feuer y Sanders, a modo ilustrativo.', t: ' Para llegar a ~10²⁰ FLOP/s con este producto habría que suponer ~10⁵ operaciones por activación. Los autores usan otro método, en un preprint sin revisión por pares.' }
    ];
    var NAME = { S: 'el número de sinapsis S', f: 'la frecuencia media f', k: 'las operaciones por activación k' };
    var preset = 1, cancel = null, prev = null, W0 = 0;
    var story = h('p', { class: 't5-say', 'aria-live': 'polite' });
    var box = h('div', { class: 't5-box' }), out = outBox(), live = h('p', { class: 't5-help t5-live', 'aria-live': 'polite' });
    var rS = rango({ label: 'Sinapsis, S', min: 0, max: 1000, value: 301, dim: 'cnt', fmt: function (v) { return sci(P10(14 + v / 1000), 1); }, on: manual });
    var rF = rango({ label: 'Frecuencia media, f', min: 0, max: 1000, value: 233, dim: 'ink', fmt: function (v) { return sig(P10(-1 + 3 * v / 1000)) + ' Hz'; }, on: manual });
    var rK = rango({ label: 'Operaciones por activación, k', min: 0, max: 1000, value: 200, dim: 'cmp', fmt: function (v) { var x = P10(5 * v / 1000); return x >= 1e4 ? sci(x, 1) : sig(x); }, on: manual });
    var R3 = [rS, rF, rK];
    function lv() { return { S: 14 + rS.inp.value / 1000, f: -1 + 3 * rF.inp.value / 1000, k: 5 * rK.inp.value / 1000 }; }
    var pre = chips(P, function (x, i) {
      preset = i;
      var from = R3.map(function (r) { return +r.inp.value; });
      if (cancel) cancel();
      tell();
      if (RM.matches) { R3.forEach(function (r, j) { r.set(x.v[j]); }); update(); contar(true); return; }
      var t0 = performance.now(), vivoT = true;
      cancel = function () { vivoT = false; cancel = null; };
      (function paso(now) {
        if (!vivoT) return;
        var t = Math.min(1, (now - t0) / 750), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        R3.forEach(function (r, j) { r.set(Math.round(from[j] + (x.v[j] - from[j]) * e)); });
        update();
        if (t < 1 && el.isConnected) requestAnimationFrame(paso); else { cancel = null; contar(true); }
      })(t0);
    }, { label: 'Escenarios', sel: 1 });
    function manual() { if (cancel) cancel(); preset = -1; pre.clear(); update(); tell(); contar(true); }
    function tell() {
      M.clear(story);
      if (preset >= 0) { story.appendChild(h('b', null, P[preset].h)); story.appendChild(rich(P[preset].t)); return; }
      var c = lv(), l2 = c.S + c.f + c.k, inC = l2 >= 13 - 1e-6 && l2 <= 17 + 1e-6;
      story.appendChild(h('b', null, 'Tu combinación.'));
      story.appendChild(rich(' ' + sci(P10(c.S), 1) + ' sinapsis × ' + sig(P10(c.f)) + ' Hz × ' + sig(P10(c.k)) + (Math.abs(c.k) < 0.02 ? ' operación' : ' operaciones') + ' por activación ≈ ' + sci(P10(l2), 1) + ' FLOP/s, ' + (inC ? 'dentro' : l2 > 17 ? 'por encima' : 'por debajo') + ' del intervalo de Carlsmith (2020).'));
    }
    /* «¿Qué acabas de hacer?»: lectura en vivo bajo el calculador */
    /* Un escenario se compara con el central; un control movido a mano, con el paso anterior */
    var CENTRAL = { S: 14 + 301 / 1000, f: -1 + 3 * 233 / 1000, k: 5 * 200 / 1000 };
    function ords(d) { var a = Math.abs(d), t = fmt(a, a < 0.1 ? 2 : 1); return t === '1,0' ? '1 orden' : t + ' órdenes'; }
    function contar(cambio) {
      var c = lv(), tot = c.S + c.f + c.k, partes = [], ref = preset >= 0 ? CENTRAL : prev;
      if (cambio && ref && preset !== 1) ['S', 'f', 'k'].forEach(function (x) {
        var d = c[x] - ref[x];
        var fx = P10(Math.abs(d));
        if (Math.abs(d) > 0.004) partes.push(NAME[x] + ' ' + (d > 0 ? 'sube' : 'baja') + ' ' + ords(d) + ' (×' + (d > 0 ? '' : '1/') + nice(Number(fx.toPrecision(fx < 10 ? 3 : 2))) + ')');
      });
      var lead = partes.length ? (preset >= 0 ? 'Respecto del escenario central, ' : 'Con ese cambio, ') + partes.join('; ') + '. El resultado se desplaza lo mismo que la suma de esos cambios. ' : '';
      decir(live, '**¿Qué acabas de hacer?** ' + lead +
        'Ahora: ' + sci(P10(tot), 1) + ' FLOP/s, ' + (Math.abs(tot - 15) < 0.005 ? 'igual que la convención central.' : ords(tot - 15) + (tot > 15 ? ' por encima' : ' por debajo') + ' de la convención central (10¹⁵).') +
        (tot > 17 ? ' Estás **por encima** del intervalo de Carlsmith: o la frecuencia o las operaciones por activación son mayores de lo que admite su juicio experto.' : tot < 13 ? ' Estás **por debajo** del intervalo de Carlsmith.' : ''));
      prev = c;
    }
    function render(w) {
      W0 = w;
      var c = lv(), lS = c.S, lF = c.f, lK = c.k, l1 = lS + lF, l2 = l1 + lK;
      var narrow = w < 560, x0 = narrow ? 14 : 64, x1 = w - 16;
      var top = 58, lane = 40, yAx = top + 4 * lane + 6, hh = yAx + 44;
      var svg = svgRoot(box, w, hh, 'Composición del producto de sinapsis, frecuencia y operaciones por evento en una escala logarítmica de FLOP por segundo', narrow ? 't5-narrow' : '');
      var sc = logScale(1e12, 1e22, x0, x1);
      add(svg, 'rect', { x: sc(1e13), y: top - 22, width: sc(1e17) - sc(1e13), height: yAx - top + 22, class: 't5-wash-cmp' });
      T(svg, sc(1e13) + 6, top - 9, narrow ? 'Carlsmith: 10¹³–10¹⁷' : 'Carlsmith (2020): 10¹³–10¹⁷ FLOP/s', 't5-lbx');
      var hp = hatch(svg, 't5-s-ink');
      add(svg, 'rect', { x: sc(1e20), y: top - 22, width: sc(1e21) - sc(1e20), height: yAx - top + 22, fill: hp, class: 't5-op35' });
      T(svg, sc(1e21) - 4, top - 9, narrow ? '10²⁰–10²¹' : 'Allyn-Feuer y Sanders: 10²⁰–10²¹', 't5-lbx', { 'text-anchor': 'end' });
      logAxisX(svg, sc, 12, 22, yAx, { grid: [top - 22, yAx], every: narrow ? 2 : 1 });
      T(svg, x1, hh - 4, 'FLOP por segundo · escala logarítmica', 't5-lbx', { 'text-anchor': 'end' });
      var xE = sc(1e18);
      add(svg, 'line', { x1: xE, x2: xE, y1: top - 30, y2: yAx, class: 't5-ref' });
      T(svg, xE + 5, top - 34, '«exaflop»', 't5-lbx');
      function yl(i) { return top + i * lane + lane / 2; }
      if (!narrow) ['S', '× f', '× k', '='].forEach(function (t, i) { T(svg, x0 - 14, yl(i) + 4, t, 't5-lane', { 'text-anchor': 'end' }); });
      var g = add(svg, 'g');
      [[lS, 0, 1], [l1, 1, 2], [l2, 2, 3]].forEach(function (q) { add(g, 'line', { x1: sc.e(q[0]), x2: sc.e(q[0]), y1: yl(q[1]), y2: yl(q[2]), class: 't5-conn' }); });
      add(g, 'circle', { cx: sc.e(lS), cy: yl(0), r: 5.5, class: 't5-f-cnt t5-ring' });
      var sRight = sc.e(lS) > (x0 + x1) / 2;
      T(g, sc.e(lS) + (sRight ? -10 : 10), yl(0) + 4, 'S = ' + sci(P10(lS), 1) + ' sinapsis', 't5-tm', { 'text-anchor': sRight ? 'end' : 'start' });
      function arrow(la, lb, y, txt, col) {
        var xa = sc.e(la), xb = sc.e(lb), dir = xb >= xa ? 1 : -1, len = Math.abs(xb - xa);
        var grp = add(g, 'g', { class: 't5-arw' });
        if (len > 7) add(grp, 'line', { x1: xa, x2: xb - dir * 6, y1: y, y2: y, class: 't5-ln t5-s-' + col, 'stroke-width': 2.4 });
        if (len > 2) add(grp, 'path', { d: 'M' + xb + ',' + y + 'l' + (-dir * 9) + ',-5v10z', class: 't5-f-' + col });
        else add(grp, 'circle', { cx: xb, cy: y, r: 3.2, class: 't5-f-' + col });
        var right = xb > (x0 + x1) / 2;
        T(grp, right ? Math.min(xa, xb) - 10 : Math.max(xa, xb) + 10, y + 4, txt, 't5-tm', { 'text-anchor': right ? 'end' : 'start' });
      }
      arrow(lS, l1, yl(1), '× ' + sig(P10(lF)) + ' Hz', 'ink');
      arrow(l1, l2, yl(2), '× ' + (P10(lK) >= 1e4 ? sci(P10(lK), 1) : sig(P10(lK))) + ' FLOP', 'cmp');
      var xr = sc.e(l2), inC = l2 >= 13 - 1e-6 && l2 <= 17 + 1e-6;
      add(g, 'circle', { cx: xr, cy: yl(3), r: 14, class: 't5-halo' });
      marker(g, xr, yl(3), 'est', 'cmp', 8);
      T(g, xr + (xr > w * 0.66 ? -18 : 18), yl(3) + 4, '≈ ' + sci(P10(l2), 1) + ' FLOP/s', 't5-lb', { 'text-anchor': xr > w * 0.66 ? 'end' : 'start' });
      var xL = sc(2.198e18);
      marker(svg, xL, yAx - 10, 'med', 'cmp', 5);
      T(svg, xL + 9, yAx - 6, narrow ? 'LineShine' : 'LineShine (FP64)', 't5-lbx');
      hitRow(svg, 0, yl(3) - lane / 2, w, lane, 'Resultado: ' + sci(P10(l2), 1) + ' FLOP/s', ['≈ ' + sci(P10(l2), 1) + ' FLOP/s', inC ? 'Dentro del intervalo de Carlsmith (2020)' : 'Fuera del intervalo de Carlsmith (2020)', 'exponente: ' + fmt(l2, 2) + ' · estimado']);
      var status = inC ? 'dentro del intervalo de Carlsmith (2020)' : (l2 > 17 ? 'por encima del intervalo de Carlsmith (2020)' : 'por debajo del intervalo de Carlsmith (2020)');
      poner(out, [
        linea(kk('En exponentes: '), fmt(lS, 2) + ' ' + lgTxt(lF).replace(/^([+−])/, '$1 ') + ' ' + lgTxt(lK).replace(/^([+−])/, '$1 ') + ' = ' + fmt(l2, 2)),
        linea(kk('S · f · k ≈ '), sci(P10(l2), 1) + ' FLOP/s, ' + status + '.')
      ]);
    }
    function update() { if (W0) render(W0); }
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, pre, story, h('div', { class: 'm2-grid3 t5-sfk-ctl' }, rS.wrap, rF.wrap, rK.wrap), box, out, live));
    tell();
    responsive(box, render);
    contar(false);
  };

  /* =====================================================================
     Figura · La escalera de la emulación (eje vertical logarítmico)
     ===================================================================== */
  W['m2.fig-escalera'] = function (el) {
    var LV = [
      { e: 15, l: 'Poblaciones', s: 'modelo de poblaciones neuronales' },
      { e: 18, l: 'Red de impulsos', s: 'red de neuronas de impulsos: el «exaflop cerebral»' },
      { e: 22, l: 'Electrofisiología', s: 'modelo electrofisiológico' },
      { e: 25, l: 'Metaboloma', s: 'inclusión del metaboloma' },
      { e: 26, l: 'Proteoma', s: 'inclusión del proteoma' }
    ];
    var MC = [
      { v: 2.198e18, l: 'LineShine', s: 'HPL · FP64', txt: '2,2 × 10¹⁸', st: 'med' },
      { v: 1.67e19, l: 'El Capitan', s: 'HPL-MxP · precisión mixta', txt: '1,7 × 10¹⁹', st: 'med' },
      { v: 6e20, l: 'FugakuNEXT', s: 'objetivo hacia 2030 · FP8 con dispersión', txt: '6 × 10²⁰', st: 'proy' }
    ];
    var box = h('div', { class: 't5-box' }), wrap = h('div', { class: 'scroll-x t5-scroll' }, box);
    var aviso = h('p', { class: 'w-note-s t5-aviso', hidden: true }, 'Desliza la figura hacia los lados para ver los sistemas.');
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, aviso, wrap));
    function dodge(items, gap) {
      var s = items.slice().sort(function (a, b) { return b.y - a.y; });
      for (var i = 1; i < s.length; i++) if (s[i - 1].ly - s[i].ly < gap) s[i].ly = s[i - 1].ly - gap;
      return items;
    }
    responsive(wrap, function (wHost) {
      var narrow = wHost < 440, w = Math.min(Math.max(wHost, narrow ? 280 : 440), 640);
      /* El aviso solo aparece si de verdad queda figura fuera de la vista */
      aviso.hidden = w - wHost <= 16;
      var top = 26, bot = 34, H = 640, hh = top + H + bot;
      var svg = svgRoot(box, w, hh, 'Escalera logarítmica de FLOP por segundo para emular el cerebro según el nivel de detalle, frente a sistemas de 2026', 't5-svg-fijo' + (narrow ? ' t5-narrow' : ''));
      svg.style.width = w + 'px';
      var sc = logScale(1e12, 1e44, top + H, top);
      var xA = 46, mid = Math.round(w * (narrow ? 0.6 : w < 520 ? 0.5 : 0.54)), xR = w - 8;
      logAxisY(svg, sc, 12, 44, xA, { every: 4, grid: [xA, xR], gridEvery: 4 });
      T(svg, xA + 6, hh - 8, 'FLOP/s · escala logarítmica', 't5-lbx');
      T(svg, xA + 12, top - 10, 'Emulación del cerebro', 't5-lbx');
      T(svg, mid + 12, top - 10, 'Sistemas', 't5-lbx');
      add(svg, 'line', { x1: mid, x2: mid, y1: top - 4, y2: top + H, class: 't5-grid' });
      add(svg, 'rect', { x: xA + 1, y: sc(1e17), width: mid - xA - 8, height: sc(1e13) - sc(1e17), class: 't5-wash-cmp' });
      T(svg, mid - 14, sc(1e13) - 6, 'Carlsmith: 10¹³–10¹⁷', 't5-lbx', { 'text-anchor': 'end' });
      var hp = hatch(svg, 't5-s-cmp');
      add(svg, 'rect', { x: xA + 1, y: sc(1e43), width: mid - xA - 8, height: sc(1e27) - sc(1e43), fill: hp, class: 't5-op3' });
      add(svg, 'rect', { x: xA + 1, y: sc(1e43), width: mid - xA - 8, height: sc(1e27) - sc(1e43), class: 't5-outline-cmp' });
      T(svg, xA + 14, sc(1e35) - 4, 'Niveles moleculares', 't5-lbs');
      T(svg, xA + 14, sc(1e35) + 11, 'de 10²⁷ a 10⁴³', 't5-lbx');
      hitRow(svg, xA, sc(1e43), mid - xA, sc(1e27) - sc(1e43), 'Niveles moleculares: de 10²⁷ a 10⁴³ FLOP/s', ['10²⁷–10⁴³ FLOP/s', 'Niveles moleculares cada vez más finos', 'Sandberg y Bostrom (2008) · estimado']);
      LV.forEach(function (d) {
        var y = sc.e(d.e), g = add(svg, 'g');
        add(g, 'line', { x1: xA + 1, x2: mid - 8, y1: y, y2: y, class: 't5-rung' });
        T(g, xA + 12, y - 5, m2.pw(d.e) + ' · ' + d.l, 't5-lbs');
        hitRow(svg, xA, y - 15, mid - xA, 20, d.l + ': ' + m2.pw(d.e) + ' FLOP/s', [m2.pw(d.e) + ' FLOP/s', d.s, 'Sandberg y Bostrom (2008) · estimado']);
      });
      [[15, 18], [18, 22], [22, 25]].forEach(function (q) {
        var ya = sc.e(q[0]), yb = sc.e(q[1]), x = mid - 24;
        add(svg, 'path', { d: 'M' + x + ',' + (ya - 3) + 'V' + (yb + 5) + 'm-3.5,5l3.5,-5l3.5,5', class: 't5-jump' });
        T(svg, x - 6, (ya + yb) / 2 + 4, '×' + m2.pw(q[1] - q[0]), 't5-tl', { 'text-anchor': 'end' });
      });
      /* Sistemas, con etiquetas separadas si chocan (en pantallas estrechas, en dos líneas) */
      var items = MC.map(function (d) { return { d: d, y: sc(d.v), ly: sc(d.v) + (narrow ? 1 : 4) }; });
      var yLand = sc(6.7e21);
      items.push({ land: true, y: yLand, ly: yLand - 5 });
      dodge(items, narrow ? 27 : 15);
      items.forEach(function (it) {
        if (it.land) {
          add(svg, 'line', { x1: mid + 6, x2: xR, y1: yLand, y2: yLand, class: 't5-ref t5-dot t5-s-inf' });
          if (narrow) {
            T(svg, xR, it.ly, '~7 × 10²¹ bit/s', 't5-lbx t5-t-inf', { 'text-anchor': 'end' });
            T(svg, xR, it.ly - 12, 'Landauer:', 't5-lbx t5-t-inf', { 'text-anchor': 'end' });
            T(svg, xR, it.ly - 24, 'otra regla: información', 't5-lbx', { 'text-anchor': 'end' });
          } else {
            T(svg, xR, it.ly, 'Landauer: ~7 × 10²¹ bit/s', 't5-lbx t5-t-inf', { 'text-anchor': 'end' });
            T(svg, xR, it.ly - 13, 'otra regla: información', 't5-lbx', { 'text-anchor': 'end' });
          }
          hitRow(svg, mid, yLand - 8, xR - mid, 16, 'Cota de Landauer', ['~7 × 10²¹ borrados de bit por segundo', 'Máximo con 20 W a 310 K', 'Otra unidad, no comparable con FLOP/s']);
          return;
        }
        var d = it.d, x = mid + (narrow ? 16 : 26), xt = x + (narrow ? 12 : 18);
        marker(svg, x, it.y, d.st, 'cmp', 6);
        var dy = it.ly - it.y - (narrow ? 1 : 4);
        if (Math.abs(dy) > 1) add(svg, 'path', { d: 'M' + (x + 8) + ',' + it.y + 'L' + (xt - 2) + ',' + (it.y + dy), class: 't5-leader' });
        if (narrow) { T(svg, xt, it.ly, d.l, 't5-lbs'); T(svg, xt, it.ly + 13, d.txt, 't5-lbx'); }
        else T(svg, xt, it.ly, d.l + ' · ' + d.txt, 't5-lbs');
        hitRow(svg, mid, it.y - 8, xR - mid, 16, d.l + ': ' + d.txt + ' FLOP/s', [d.txt + ' FLOP/s', d.l + ' · ' + d.s, ST[d.st]]);
      });
    });
  };

  /* =====================================================================
     Figura · 10 bits por segundo: embudo de ocho escalones (animación)
     ===================================================================== */
  W['m2.fig-embudo'] = function (el) {
    var box = h('div', { class: 't5-box t5-fun' });
    var activo = !RM.matches;
    var pausa = h('button', { type: 'button', class: 'btn small ghost t5-pausa' });
    function rotular() { M.clear(pausa); pausa.appendChild(M.icon(activo ? 'pausa' : 'play')); pausa.appendChild(document.createTextNode(activo ? 'Pausar' : 'Reproducir')); pausa.setAttribute('aria-pressed', String(!activo)); }
    rotular();
    el.appendChild(h('div', { class: 't5-lab t5-fig' }, box,
      h('div', { class: 'btnrow' }, pausa, h('span', { class: 'w-note-s' }, 'Esquema ilustrativo: no está a escala física.')),
      h('ul', { class: 't5-facts' },
        h('li', null, h('span', null, 'Un mecanógrafo a 120 palabras por minuto, con ~1 bit por carácter'), h('b', null, '~10 bits/s')),
        h('li', null, h('span', null, 'Memorizar un cubo de Rubik (~65 bits) en unos 5,5 s'), h('b', null, '~12 bits/s')))));
    var R = rng(31), geo = null, gP = null, gS = null, parts = [], sparks = [], acc = 0, last = 0, raf = 0, enVista = true;
    var st = { t0: performance.now(), visto: false };
    function E(k) { return 9 - k; }
    function build(w) {
      var hh = clamp(Math.round(w * 0.62), 230, 400), narrow = w < 440;
      var svg = svgRoot(box, w, hh, 'Embudo que reduce un flujo de 10 elevado a 9 bits por segundo a 10 bits por segundo en ocho escalones de diez', narrow ? 't5-narrow' : '');
      var xL = w * 0.1, xR = w * 0.9, mid = hh * 0.52, Hm = hh * 0.5;
      var X = function (k) { return xL + (xR - xL) * k / 8; }, Hk = function (e) { return Hm * e / 9; };
      var hAt = function (x) { return Hk(9 - 8 * clamp((x - xL) / (xR - xL), 0, 1)); };
      geo = { w: w, hh: hh, xL: xL, xR: xR, mid: mid, Hm: Hm, X: X, Hk: Hk, hAt: hAt, narrow: narrow };
      add(svg, 'path', { d: 'M' + xL + ',' + (mid - Hm / 2) + 'L' + xR + ',' + (mid - Hk(1) / 2) + 'L' + xR + ',' + (mid + Hk(1) / 2) + 'L' + xL + ',' + (mid + Hm / 2) + 'Z', class: 't5-wedge' });
      for (var k = 0; k <= 8; k++) {
        var x = X(k), half = Hk(E(k)) / 2;
        add(svg, 'line', { x1: x, x2: x, y1: mid - half - 5, y2: mid + half + 5, class: 't5-gate' + (k === 0 || k === 8 ? ' t5-gate-x' : '') });
        if (!narrow || k % 2 === 0) T(svg, x, mid + Hm / 2 + 20, '10' + M.sup(E(k)), 't5-tl', { 'text-anchor': 'middle' });
        if (k < 8) { var xc = (x + X(k + 1)) / 2; T(svg, xc, mid - hAt(xc) / 2 - 9, '÷10', 't5-tl t5-t3', { 'text-anchor': 'middle' }); }
      }
      gS = add(svg, 'g', { class: 't5-sparks' });
      gP = add(svg, 'g', { class: 't5-parts' });
      var yT = Math.max(16, hh * 0.09);
      T(svg, 4, yT, '~10⁹ bits/s', 't5-tm t5-strong');
      T(svg, 4, yT + (narrow ? 13 : 15), 'entrada sensorial', 't5-lbx');
      T(svg, w - 4, yT, '~10 bits/s', 't5-tm t5-strong', { 'text-anchor': 'end' });
      T(svg, w - 4, yT + (narrow ? 13 : 15), 'conducta deliberada', 't5-lbx', { 'text-anchor': 'end' });
      T(svg, w / 2, hh - 6, narrow ? 'altura = exponente · ocho veces ÷10 = ÷10⁸' : 'la altura representa el exponente: ocho escalones de ÷10 suman ÷10⁸', 't5-lbx', { 'text-anchor': 'middle' });
      parts = []; sparks = [];
      sembrar();
    }
    /* Fotograma fijo: partículas repartidas según el exponente */
    function sembrar() {
      for (var i = 0; i < 150; i++) {
        var u = Math.pow(R(), 1.6) * 8;
        parts.push(nueva(geo.X(u), Math.floor(u) + 1));
      }
      pintar(0);
    }
    function nueva(x, k) {
      var c = add(gP, 'circle', { r: geo.narrow ? 2.2 : 2.6, class: 't5-part' });
      return { x: x, r: R() * 2 - 1, v: 0.9 + R() * 0.25, k: k, ph: R() * 2 * Math.PI, c: c };
    }
    function pintar(t) {
      for (var i = 0; i < parts.length; i++) {
        var q = parts[i], half = geo.hAt(q.x) / 2 * 0.88, y = geo.mid + q.r * half + Math.sin(t * 3 + q.ph) * 1.2;
        var a = q.x > geo.xR ? clamp(1 - (q.x - geo.xR) / 34, 0, 1) : 1;
        q.c.setAttribute('cx', q.x.toFixed(1)); q.c.setAttribute('cy', y.toFixed(1));
        if (a < 1) q.c.setAttribute('opacity', a.toFixed(2));
      }
    }
    function paso(dt, t) {
      var g = geo, speed = (g.xR - g.xL) / 6.5;
      acc += dt * (g.narrow ? 28 : 45);
      while (acc > 1) { parts.push(nueva(g.xL, 1)); acc--; }
      for (var i = parts.length - 1; i >= 0; i--) {
        var q = parts[i], dead = false;
        q.x += speed * q.v * dt;
        while (q.k <= 8 && q.x >= g.X(q.k)) {
          if (R() > E(q.k) / E(q.k - 1)) {
            var half = g.hAt(q.x) / 2;
            sparks.push({ x: q.x, y: g.mid + q.r * half * 0.9, vx: speed * 0.3, vy: (q.r >= 0 ? 1 : -1) * (45 + R() * 60), t0: t, el: add(gS, 'line', { class: 't5-spark' }) });
            dead = true; break;
          }
          q.k++;
        }
        if (dead || q.x > g.xR + 34) { q.c.remove(); parts.splice(i, 1); }
      }
      pintar(t);
      for (var j = sparks.length - 1; j >= 0; j--) {
        var s = sparks[j], age = t - s.t0;
        if (age > 0.7) { s.el.remove(); sparks.splice(j, 1); continue; }
        var x = s.x + s.vx * age, y = s.y + s.vy * age;
        s.el.setAttribute('x1', x.toFixed(1)); s.el.setAttribute('y1', y.toFixed(1));
        s.el.setAttribute('x2', (x - s.vx * 0.05).toFixed(1)); s.el.setAttribute('y2', (y - s.vy * 0.05).toFixed(1));
        s.el.setAttribute('opacity', (0.75 * (1 - age / 0.7)).toFixed(2));
      }
    }
    function frame(now) {
      raf = 0;
      if (!activo || !enVista) return;
      if (!vivo(el, st)) return;
      if (el.isConnected && geo) {
        var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
        last = now;
        paso(dt, now / 1000);
      }
      raf = requestAnimationFrame(frame);
    }
    function arrancar() { if (!raf && activo && enVista) { last = 0; raf = requestAnimationFrame(frame); } }
    pausa.addEventListener('click', function () {
      activo = !activo; rotular();
      if (activo) arrancar(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { enVista = es[es.length - 1].isIntersecting; if (enVista) arrancar(); }).observe(box);
    }
    responsive(box, build);
    arrancar();
  };
})();
