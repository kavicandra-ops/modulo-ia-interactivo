/* Laboratorios del Taller 7 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =====================================================================
     Utilidades comunes: números en español, escalas, ejes, marcadores
     de evidencia, controles y lecturas. Puertos fieles de las funciones
     de la edición didáctica (fmt, sci, siUnit, words, nice, joules…).
     ===================================================================== */
  var L10 = Math.log10, P10 = function (e) { return Math.pow(10, e); };
  var REDUCIR = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var ST = { med: 'medido', est: 'estimado', decl: 'declarado', proy: 'proyectado', extr: 'extrapolado' };
  var nId = 0;
  function uid(pre) { return 't7' + pre + '-' + (++nId); }

  function fmt(v, d) { return m2.fmt(v, d || 0); }
  function pw(e) { return '10' + M.sup(String(e)); }
  /* «5,21 × 10¹⁰»: d decimales en la mantisa, sin ceros finales */
  function sci(v, d) {
    if (d == null) d = 1;
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(L10(Math.abs(v)) + 1e-9), m = v / P10(e), ms = Math.abs(m).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; m = v / P10(e); ms = Math.abs(m).toFixed(d); }
    if (ms.indexOf('.') !== -1) ms = ms.replace(/0+$/, '').replace(/\.$/, '');
    return (v < 0 ? '−' : '') + ms.replace('.', ',') + ' × ' + pw(e);
  }
  /* Potencia o energía con prefijo del SI: 3200 → «3,2 kW» */
  function siUnit(v, unit) {
    var P = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f'], [1e-18, 'a'], [1e-21, 'z']];
    for (var i = 0; i < P.length; i++) {
      if (v >= P[i][0] * 0.9995) { var m = v / P[i][0]; return fmt(m, m < 10 && Math.abs(m - Math.round(m)) > 0.05 ? 1 : 0) + ' ' + P[i][1] + unit; }
    }
    return sci(v, 1) + ' ' + unit;
  }
  /* Cantidades grandes en palabras: 4,7e7 → «47 millones» */
  function words(n) {
    if (n >= 1e12) return fmt(n / 1e12, n < 1e13 ? 1 : 0) + ' billones';
    if (n >= 1e9) return fmt(n / 1e9, n < 1e10 ? 1 : 0).replace(/,0$/, '') + ' mil millones';
    if (n >= 1e6) { var v = n / 1e6, s = fmt(v, v < 10 ? 1 : 0).replace(/,0$/, ''); return s + (s === '1' ? ' millón' : ' millones'); }
    if (n >= 1e4) return fmt(Math.round(n / 100) * 100);
    return fmt(n, n < 10 && n % 1 ? 1 : 0);
  }
  /* 2–3 cifras significativas, en notación normal si cabe */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Energía en julios y en la unidad de vatios-hora más legible */
  function joules(J) {
    var parts = [siUnit(J, 'J')], wh = J / 3600;
    if (wh >= 1e12) parts.push(fmt(wh / 1e12, wh / 1e12 < 10 ? 2 : 1) + ' TWh');
    else if (wh >= 1e9) parts.push(fmt(wh / 1e9, wh / 1e9 < 10 ? 2 : 1) + ' GWh');
    else if (wh >= 1e6) parts.push(fmt(wh / 1e6, wh / 1e6 < 10 ? 2 : 1) + ' MWh');
    else if (wh >= 1e3) parts.push(fmt(wh / 1e3, wh / 1e3 < 10 ? 2 : 1) + ' kWh');
    else if (wh >= 0.01) parts.push(fmt(wh, wh < 10 ? 2 : 1) + ' Wh');
    return parts.join(' = ');
  }
  /* Deslizador logarítmico: posición 0..1000 ↔ valor */
  function logMap(lo, hi) {
    var a = L10(lo), b = L10(hi);
    return { toV: function (p) { return P10(a + (b - a) * p / 1000); }, toP: function (v) { return Math.round((L10(v) - a) / (b - a) * 1000); } };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  /* ancho aproximado de un texto en px, para no salirse del dibujo */
  function tw(txt, size, mono) { return String(txt).length * (size || 11) * (mono ? 0.62 : 0.56); }

  /* ---------- SVG ---------- */
  function S(tag, attrs, parent) { var e = M.s(tag, attrs || null); if (parent) parent.appendChild(e); return e; }
  function T(parent, x, y, text, cls, extra) {
    var a = { x: x, y: y, class: cls || 't7-tl' };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    var t = S('text', a, parent); t.textContent = text; return t;
  }
  function svgRoot(host, w, hh, label) {
    M.clear(host);
    return S('svg', { viewBox: '0 0 ' + w + ' ' + hh, class: 't7-svg', role: 'img', 'aria-label': label || '', focusable: 'false' }, host);
  }
  function logScale(d0, d1, r0, r1) {
    var l0 = L10(d0), l1 = L10(d1);
    var f = function (v) { return r0 + (L10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    f.inv = function (q) { return P10(l0 + (q - r0) / (r1 - r0) * (l1 - l0)); };
    return f;
  }
  function linScale(d0, d1, r0, r1) {
    var f = function (v) { return r0 + (v - d0) / (d1 - d0) * (r1 - r0); };
    f.inv = function (q) { return d0 + (q - r0) / (r1 - r0) * (d1 - d0); };
    return f;
  }
  /* Eje logarítmico horizontal con marcas menores 2–9 */
  function logAxisX(g, sc, e0, e1, y, o) {
    o = o || {};
    var step = o.every || 1, lab = o.label || pw, tick = o.tick || 6;
    if (o.grid) for (var e = e0; e <= e1; e++) S('line', { x1: sc.e(e), x2: sc.e(e), y1: o.grid[0], y2: o.grid[1], class: 't7-gl' }, g);
    S('line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't7-ax' }, g);
    for (var k = e0; k <= e1; k++) {
      var x = sc.e(k);
      S('line', { x1: x, x2: x, y1: y, y2: y + tick, class: 't7-tk' }, g);
      if ((k - e0) % step === 0) T(g, x, y + tick + 13, lab(k), 't7-tl', { 'text-anchor': o.ends && k === e0 ? 'start' : o.ends && k === e1 ? 'end' : 'middle' });
      if (k < e1) for (var m = 2; m < 10; m++) { var xm = sc(m * P10(k)); S('line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? tick * 0.7 : tick * 0.45), class: 't7-tkm' }, g); }
    }
  }
  function logAxisY(g, sc, e0, e1, x, o) {
    o = o || {};
    var lab = o.label || pw;
    if (o.grid) for (var e = e0; e <= e1; e++) S('line', { y1: sc.e(e), y2: sc.e(e), x1: o.grid[0], x2: o.grid[1], class: 't7-gl' }, g);
    S('line', { y1: sc.e(e0), y2: sc.e(e1), x1: x, x2: x, class: 't7-ax' }, g);
    for (var k = e0; k <= e1; k++) {
      var y = sc.e(k);
      S('line', { y1: y, y2: y, x1: x - 5, x2: x, class: 't7-tk' }, g);
      T(g, x - 9, y + 4, lab(k), 't7-tl', { 'text-anchor': 'end' });
      if (k < e1) for (var m = 2; m < 10; m++) { var ym = sc(m * P10(k)); S('line', { y1: ym, y2: ym, x1: x - (m === 5 ? 3.5 : 2.2), x2: x, class: 't7-tkm' }, g); }
    }
  }
  /* Marcador por tipo de cifra: rombo lleno medido, círculo lleno estimado,
     cuadrado declarado, rombo hueco proyectado, círculo hueco extrapolado */
  function marker(g, x, y, st, col, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var cls = 't7-mk ' + (hueco ? 't7-mkh t7-mk-' + col : 't7-mkf t7-mk-' + col);
    var grp = S('g', { class: 't7-mkg' }, g);
    if (st === 'med' || st === 'proy') S('rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls }, grp);
    else if (st === 'decl') S('rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls }, grp);
    else S('circle', { cx: x, cy: y, r: r * 0.92, class: cls }, grp);
    return grp;
  }
  /* Corchete de razón entre dos posiciones de un eje logarítmico */
  function ratioBracket(g, xa, xb, y, text) {
    var a = Math.min(xa, xb), b = Math.max(xa, xb);
    var grp = S('g', { class: 't7-rb' }, g);
    S('path', { d: 'M' + a + ',' + (y + 5) + 'V' + y + 'H' + b + 'V' + (y + 5), class: 't7-rbl' }, grp);
    if (text) T(grp, (a + b) / 2, y - 6, text, 't7-rbt', { 'text-anchor': 'middle' });
    return grp;
  }
  /* Lectura emergente (ratón, toque y teclado) con M.tipShow */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tipHtml(lines) { return lines.filter(Boolean).map(function (l, i) { return '<div class="' + (i === 0 ? 't7-tv' : 't7-tt') + '">' + esc(l) + '</div>'; }).join(''); }
  function bindTip(target, lines, focusable) {
    var get = typeof lines === 'function' ? lines : function () { return lines; };
    function enPunto(e) { M.tipShow(tipHtml(get()), e.clientX, e.clientY); }
    target.addEventListener('pointerenter', enPunto);
    target.addEventListener('pointermove', enPunto);
    target.addEventListener('pointerdown', enPunto);
    target.addEventListener('pointerleave', function () { M.tipHide(); });
    if (focusable) {
      target.setAttribute('tabindex', '0');
      target.addEventListener('focus', function () { var r = target.getBoundingClientRect(); M.tipShow(tipHtml(get()), r.left + r.width / 2, r.top); });
      target.addEventListener('blur', function () { M.tipHide(); });
    }
  }
  function hitRect(g, x, y, w, hh, label, lines) {
    var r = S('rect', { x: x, y: y, width: w, height: hh, class: 't7-hit', role: 'img', 'aria-label': label }, g);
    bindTip(r, lines, true);
    return r;
  }

  /* ---------- Controles y lecturas ---------- */
  function range(o) {
    var id = uid('r');
    var out = h('output', { class: 'desl-v', for: id });
    var inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    var wrap = h('div', { class: 'desl t7-desl' + (o.dim ? ' t7-d-' + o.dim : '') }, h('label', { for: id }, o.label), inp, out);
    if (o.help) wrap.appendChild(p(o.help, { class: 'w-note-s t7-help' }));
    function upd() { out.textContent = o.fmt ? o.fmt(+inp.value) : inp.value; }
    inp.addEventListener('input', function () { upd(); if (o.on) o.on(+inp.value); });
    upd();
    return { wrap: wrap, inp: inp, set: function (v) { inp.value = v; upd(); } };
  }
  function chips(items, on, o) {
    o = o || {};
    var g = h('div', { class: 'chips t7-chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === (o.sel == null ? -1 : o.sel)) }, it.l || it);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(it, i); });
      g.appendChild(b);
      return b;
    });
    g.pick = function (i) { bs.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === i)); }); };
    g.clear = function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); };
    return g;
  }
  function seg(items, on, sel, label) {
    var g = h('div', { class: 'seg-ctl t7-seg', role: 'group', 'aria-label': label || 'Opciones' });
    var bs = items.map(function (t, i) {
      var b = h('button', { type: 'button', 'aria-pressed': String(i === sel) }, t);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(i); });
      g.appendChild(b);
      return b;
    });
    return g;
  }
  function outBox() { return h('div', { class: 'm2-out t7-out', 'aria-live': 'polite' }); }
  function sayBox() { return h('p', { class: 'w-note t7-say', 'aria-live': 'polite' }); }
  function K(t) { return h('span', { class: 't7-k' }, t); }
  function linea() { return h('div', { class: 't7-row' }, Array.prototype.slice.call(arguments)); }
  function fill(box, rows) { M.clear(box); rows.forEach(function (r) { if (r) box.appendChild(r); }); }
  function lab(children) { return h('div', { class: 't7-lab' }, children); }
  function boxW(box, fallback) { return Math.max(280, Math.round(box.clientWidth || fallback || 520)); }
  /* Redibuja al cambiar el ancho del contenedor */
  function ro(box, f) {
    if (!('ResizeObserver' in window)) { window.addEventListener('resize', f); return; }
    var last = 0;
    new ResizeObserver(function () { var w = Math.round(box.clientWidth); if (w && Math.abs(w - last) > 1) { last = w; f(); } }).observe(box);
  }
  /* Interpolación animada (se omite con movimiento reducido) */
  function tween(el, ms, step, done) {
    if (REDUCIR) { step(1); if (done) done(); return function () {}; }
    var t0 = performance.now(), parado = false;
    function fr(now) {
      if (parado || !el.isConnected) return;
      var k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      step(e);
      if (k < 1) requestAnimationFrame(fr); else if (done) done();
    }
    requestAnimationFrame(fr);
    return function () { parado = true; };
  }
  /* Leyenda HTML con muestras dibujadas */
  function leyenda(items) {
    return h('ul', { class: 't7-leg', 'aria-label': 'Leyenda' }, items.map(function (it) {
      var sv = S('svg', { viewBox: '0 0 24 12', class: 't7-legsw', 'aria-hidden': 'true', focusable: 'false' });
      it[0](sv);
      return h('li', null, sv, h('span', null, rich(it[1])));
    }));
  }
  function swLinea(cls) { return function (sv) { S('line', { x1: 1, x2: 23, y1: 6, y2: 6, class: cls }, sv); }; }
  function swRect(cls, fillAttr) { return function (sv) { S('rect', { x: 2, y: 1, width: 20, height: 10, rx: 2, class: cls, fill: fillAttr || null }, sv); }; }
  function swMarca(st, col) { return function (sv) { marker(sv, 12, 6, st, col, 4.6); }; }

  /* =====================================================================
     II.4 · La tabla de los exascala (tablecalc)
     ===================================================================== */
  W['m2.tablecalc'] = function (el) {
    var D = [
      { l: 'LineShine', rmax: 2.198, rpeak: 2.736, mw: 42.2, tab: '52,1', lev: 1, hpcg: 22.0, mxp: 7.92 },
      { l: 'El Capitan', rmax: 1.809, rpeak: 2.821, mw: 29.7, tab: '60,9', lev: 2, hpcg: 17.41, mxp: 16.7 },
      { l: 'Frontier', rmax: 1.353, rpeak: 2.056, mw: 24.6, tab: '55,0', lev: 2 },
      { l: 'Aurora', rmax: 1.012, rpeak: 1.980, mw: 38.7, tab: '26,2', lev: 2 },
      { l: 'JUPITER Booster', rmax: 1.000, rpeak: 1.226, mw: 15.8, tab: '63,3', lev: 1 }
    ];
    var d = D[0];
    var box = h('div', { class: 't7-svgbox' }), out = outBox(), say = sayBox();
    var ch = chips(D, function (x) { d = x; draw(); }, { label: 'Sistema de la tabla', sel: 0 });
    function draw() {
      var eta = d.rmax * 1e18 / (d.mw * 1e6), e = 1 / eta;
      var w = boxW(box), x0 = 112, x1 = w - 46, rowH = 24, hh = D.length * rowH + 30;
      var svg = svgRoot(box, w, hh, 'Eficiencia en GFLOP por segundo y por vatio de los cinco sistemas exascala; seleccionado: ' + d.l + ', ' + fmt(d.rmax * 1e3 / d.mw, 1));
      var sc = linScale(0, 70, x0, x1);
      D.forEach(function (s, i) {
        var y = 10 + i * rowH, v = s.rmax * 1e3 / s.mw, cur = s === d;
        T(svg, x0 - 8, y + 14, s.l, cur ? 't7-lb' : 't7-lbx', { 'text-anchor': 'end' });
        S('rect', { x: x0, y: y + 3, width: Math.max(1, sc(v) - x0), height: 15, rx: 3, class: cur ? 't7-bar-on' : 't7-bar' }, svg);
        T(svg, sc(v) + 5, y + 15, fmt(v, 1), cur ? 't7-tlb' : 't7-tl');
      });
      T(svg, 8, hh - 4, 'GFLOP/s por vatio (Rmax ÷ potencia)', 't7-lbx');
      fill(out, [
        linea(K('Eficiencia: '), fmt(d.rmax, 3) + ' × 10¹⁸ FLOP/s ÷ ' + fmt(d.mw, 1) + ' × 10⁶ W = ', h('b', null, sci(eta, 2) + ' FLOP/J = ' + fmt(eta / 1e9, 1) + ' GFLOP/s por vatio'), ' (tabla: ' + d.tab + ')'),
        linea(K('Energía por operación FP64: '), '1 ÷ η = ' + sci(e, 2) + ' J ≈ ' + fmt(e * 1e12, 0) + ' pJ'),
        linea(K('Fracción del pico (Rmax ÷ Rpeak): '), fmt(d.rmax / d.rpeak * 100, 1) + '\u00a0%'),
        linea(K('Nivel de medición de la potencia: '), d.lev + (d.lev === 1 ? ' (abarca una fracción menor del sistema y de la ejecución)' : '')),
        d.hpcg ? linea(K('HPCG: '), fmt(d.hpcg, 2) + ' PF = ' + fmt(d.hpcg / (d.rmax * 1e3) * 100, 1) + ' % del HPL · ', K('HPL-MxP: '), fmt(d.mxp, 2) + ' EF = ×' + fmt(d.mxp / d.rmax, 1)) : null
      ]);
      M.clear(say);
      say.appendChild(rich(d.l === 'JUPITER Booster' ? 'La quinta en velocidad es **la primera en eficiencia** de las cinco.' : d.l === 'Aurora' ? 'Aurora hace menos de la mitad de operaciones por julio que JUPITER Booster.' : d.l === 'LineShine' ? 'La más rápida no es la más eficiente: tres de las cinco hacen más operaciones por julio.' : 'Compara su barra con las demás: rapidez y eficiencia no van juntas.'));
    }
    el.appendChild(lab([p('Datos de la tabla «Sistemas exascala de la lista TOP500 de junio de 2026» [medido]. Elige un sistema y comprueba su eficiencia dividiendo. La tabla da la potencia redondeada a 0,1 MW y calcula la eficiencia con la potencia sin redondear: tu división puede diferir en la última cifra.', { class: 'w-note-s' }), ch, box, out, say]));
    ro(box, draw); draw();
  };

  /* =====================================================================
     II.5 · De vatios a teravatios-hora (twh)
     ===================================================================== */
  W['m2.twh'] = function (el) {
    var LM = logMap(1e6, 1e11);
    var PER = [{ l: '1 día · 24 h', hr: 24 }, { l: '1 mes · 730 h', hr: 730 }, { l: '1 año · 8.760 h', hr: 8760 }];
    var P = 1e9, u = 0.7, per = PER[2];
    var out = outBox(), say = sayBox();
    var rp = range({ label: 'Potencia instalada', min: 0, max: 1000, value: LM.toP(1e9), dim: 'nrg', fmt: function (q) { return siUnit(LM.toV(q), 'W'); }, on: function (q) { P = LM.toV(q); pre.clear(); draw(); },
      help: 'Este control fija la potencia del campus, de 1 MW a 100 GW. Importa porque la energía es proporcional a ella.' });
    var ru = range({ label: 'Uso medio de esa potencia', min: 0, max: 100, value: 70, dim: 'nrg', fmt: function (v) { return v + ' %'; }, on: function (v) { u = v / 100; draw(); },
      help: 'Supuesto tuyo: los equipos no trabajan siempre al máximo. Epoch AI sitúa el uso medio de los campus en torno al 60–80 %.' });
    var cp = chips(PER, function (x) { per = x; draw(); }, { label: 'Periodo', sel: 2 });
    var pre = chips([{ l: 'Frontier · 24,6 MW', w: 24.6e6 }, { l: 'Colossus 2 · 946 MW', w: 946e6 }, { l: '1 GW', w: 1e9 }, { l: '93 campus · 13,8 GW', w: 13.8e9 }], function (x) { P = x.w; rp.set(LM.toP(x.w)); draw(); }, { label: 'Potencias del recorrido' });
    function draw() {
      var E = P * per.hr * u; /* Wh */
      var res = E >= 1e12 ? fmt(E / 1e12, E / 1e12 < 10 ? 2 : 1) + ' TWh' : E >= 1e9 ? fmt(E / 1e9, E / 1e9 < 10 ? 2 : 1) + ' GWh' : fmt(E / 1e6, E / 1e6 < 10 ? 2 : 1) + ' MWh';
      fill(out, [
        linea(K('Energía = potencia × horas × uso = '), siUnit(P, 'W') + ' × ' + fmt(per.hr) + ' h × ' + fmt(u, 2) + ' = ', h('b', { class: 't7-res' }, res)),
        linea(K('En julios: '), sci(E * 3600, 2) + ' J'),
        linea(K('Potencia en cerebros de 20 W: '), words(P / 20))
      ]);
      M.clear(say);
      say.appendChild(rich((u === 0 ? 'Con un uso del 0 % no se consume nada: la potencia instalada es capacidad, no consumo. ' : '') +
        'La potencia dice «cuánto a la vez»; la energía, «cuánto en total». Referencia: 485 TWh consumidos por todos los centros de datos en 2025 ÷ 8.760 h ≈ 55 GW de potencia media.'));
    }
    el.appendChild(lab([p('Cálculo ilustrativo: el uso y el periodo los eliges tú. No son consumos medidos de ningún campus.', { class: 'w-note-s' }),
      h('div', { class: 't7-grupo' }, h('span', { class: 't7-cap' }, 'Potencias del recorrido'), pre), rp.wrap, ru.wrap,
      h('div', { class: 't7-grupo' }, h('span', { class: 't7-cap' }, 'Periodo'), cp), out, say]));
    draw();
  };

  /* =====================================================================
     II.6 · Dos tasas, diez años (growth)
     ===================================================================== */
  W['m2.growth'] = function (el) {
    var R0 = 2.198, Y0 = 2026;
    var gA = 0.19, gB = 0.37, lg = true;
    var box = h('div', { class: 't7-svgbox' }), out = outBox(), say = sayBox(), tbl = h('div');
    var rA = range({ label: 'Tasa A (anual)', min: 0, max: 70, value: 19, dim: 'cmp', fmt: function (v) { return v + ' %'; }, on: function (v) { gA = v / 100; cA.clear(); draw(); }, help: 'Mueve una sola tasa y mira cómo cambia su curva; la otra queda fija para comparar.' });
    var rB = range({ label: 'Tasa B (anual)', min: 0, max: 70, value: 37, dim: 'inf', fmt: function (v) { return v + ' %'; }, on: function (v) { gB = v / 100; cB.clear(); draw(); } });
    var cA = chips([{ l: '61 % · 2008–2018', v: 61 }, { l: '37 % · 2016–2026', v: 37 }, { l: '19 % · desde 2022', v: 19 }], function (x) { gA = x.v / 100; rA.set(x.v); draw(); }, { label: 'Fija la tasa A en una tasa histórica' });
    var cB = chips([{ l: 'Bajo · 15 %', v: 15 }, { l: 'Conservador · 20 %', v: 20 }, { l: 'Central · 25 %', v: 25 }, { l: 'Central · 30 %', v: 30 }, { l: 'Alto · 36 %', v: 36 }], function (x) { gB = x.v / 100; rB.set(x.v); draw(); }, { label: 'Fija la tasa B en un escenario de 2036' });
    var sc0 = seg(['Escala logarítmica', 'Escala lineal'], function (i) { lg = i === 0; draw(); }, 0, 'Escala del eje vertical');
    var reset = h('button', { type: 'button', class: 'btn small ghost' }, 'Restablecer (19 % y 37 %)');
    reset.addEventListener('click', function () { gA = 0.19; gB = 0.37; rA.set(19); rB.set(37); cA.clear(); cB.clear(); draw(); });
    function val(g, n) { return R0 * Math.pow(1 + g, n); }
    function dbl(g) { return g <= 0 ? null : Math.log(2) / Math.log(1 + g); }
    function draw() {
      var vA = val(gA, 10), vB = val(gB, 10), top = Math.max(vA, vB, R0 * 1.5);
      var w = boxW(box, 560), x0 = 46, x1 = w - 70, y0 = 200, y1 = 14, hh = 232;
      var svg = svgRoot(box, w, hh, 'Dos trayectorias de 2026 a 2036 desde 2,198 EFLOP/s: tasa A ' + Math.round(gA * 100) + ' por ciento, 2036 ' + fmt(vA, 1) + ' EFLOP/s; tasa B ' + Math.round(gB * 100) + ' por ciento, 2036 ' + fmt(vB, 1));
      var sx = linScale(0, 10, x0, x1), sy;
      if (lg) {
        var e1 = Math.ceil(L10(top) + 0.05);
        sy = logScale(1, P10(e1), y0, y1);
        logAxisY(svg, sy, 0, e1, x0, { grid: [x0, x1], label: function (e) { return fmt(P10(e)); } });
      } else {
        var mx = top * 1.08; sy = linScale(0, mx, y0, y1);
        var st = mx > 40 ? 10 : mx > 16 ? 5 : mx > 8 ? 2 : 1;
        for (var v = 0; v <= mx; v += st) { S('line', { x1: x0, x2: x1, y1: sy(v), y2: sy(v), class: 't7-gl' }, svg); T(svg, x0 - 6, sy(v) + 4, fmt(v), 't7-tl', { 'text-anchor': 'end' }); }
        S('line', { x1: x0, x2: x0, y1: y0, y2: y1, class: 't7-ax' }, svg);
      }
      S('line', { x1: x0, x2: x1, y1: y0, y2: y0, class: 't7-ax' }, svg);
      for (var n = 0; n <= 10; n += 2) T(svg, sx(n), y0 + 16, String(Y0 + n), 't7-tl', { 'text-anchor': 'middle' });
      T(svg, x0, hh - 2, w < 560 ? 'EFLOP/s · escala ' + (lg ? 'logarítmica' : 'lineal') : 'EFLOP/s del n.º 1 · ' + (lg ? 'escala logarítmica: una tasa fija dibuja una recta' : 'escala lineal: una tasa fija dibuja una curva'), 't7-lbx');
      [[gA, 'cmp', 'A'], [gB, 'inf', 'B']].forEach(function (s) {
        var g = s[0], c = s[1], nm = s[2], dd = '';
        for (var k = 0; k <= 40; k++) { var tt = k / 4; dd += (k ? 'L' : 'M') + sx(tt).toFixed(1) + ',' + sy(val(g, tt)).toFixed(1); }
        S('path', { d: dd, class: 't7-ln t7-s-' + c, 'stroke-width': 2.4, 'stroke-dasharray': '6 4' }, svg);
        for (var j = 0; j <= 10; j++) marker(svg, sx(j), sy(val(g, j)), j ? 'extr' : 'med', c, j ? 3.4 : 5.5);
        var dy = nm === 'A' && Math.abs(sy(vA) - sy(vB)) < 14 ? (vA < vB ? 14 : -6) : 4;
        T(svg, sx(10) + 8, sy(val(g, 10)) + dy, nm + ': ' + fmt(val(g, 10), 1), 't7-lbx t7-c-' + c);
      });
      var dA = dbl(gA), dB = dbl(gB);
      fill(out, [
        linea(K('A (' + Math.round(gA * 100) + ' %): '), '(1 + ' + fmt(gA, 2) + ')¹⁰ = ×' + nice(Math.pow(1 + gA, 10)) + ' → ', h('b', null, fmt(vA, 1) + ' EFLOP/s en 2036'), dA ? ' · se duplica cada ' + fmt(dA, 1) + ' años' : ' · no crece'),
        linea(K('B (' + Math.round(gB * 100) + ' %): '), '(1 + ' + fmt(gB, 2) + ')¹⁰ = ×' + nice(Math.pow(1 + gB, 10)) + ' → ', h('b', null, fmt(vB, 1) + ' EFLOP/s en 2036'), dB ? ' · se duplica cada ' + fmt(dB, 1) + ' años' : ' · no crece'),
        linea(K('En 2036, B ÷ A = '), vA > 0 ? '×' + nice(vB / vA) : '—', ' · ', K('las tasas difieren en '), Math.abs(Math.round((gB - gA) * 100)) + ' puntos')
      ]);
      M.clear(say);
      say.appendChild(rich('Las dos líneas parten del mismo punto medido (rombo lleno) y todo lo demás es **extrapolado** (círculos huecos): una consecuencia aritmética de cada tasa, no una predicción.'));
      var rows = [];
      for (var q = 0; q <= 10; q++) rows.push(h('tr', null, h('td', null, String(Y0 + q)), h('td', null, fmt(val(gA, q), 2)), h('td', null, fmt(val(gB, q), 2))));
      var abierto = tbl.firstChild && tbl.firstChild.open;
      M.clear(tbl);
      var dsp = m2.desplegable('Ver los valores año a año', null, h('div', { class: 'tablewrap m2-tabla' }, h('table', null,
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Año'), h('th', { scope: 'col' }, 'A · EFLOP/s'), h('th', { scope: 'col' }, 'B · EFLOP/s'))), h('tbody', null, rows))), 'datos');
      if (abierto) dsp.open = true;
      tbl.appendChild(dsp);
    }
    el.appendChild(lab([p('Las dos curvas parten de 2,198 EFLOP/s en 2026 (LineShine). Elige dos tasas y compáralas a diez años.', { class: 'w-note-s' }),
      h('div', { class: 'm2-grid2' }, h('div', { class: 't7-col' }, rA.wrap, cA), h('div', { class: 't7-col' }, rB.wrap, cB)),
      h('div', { class: 't7-fila' }, sc0, reset), box, out, say, tbl]));
    ro(box, draw); draw();
  };

  /* =====================================================================
     II.7 · Medir en cerebros (brains)
     ===================================================================== */
  W['m2.brains'] = function (el) {
    var LM = logMap(1, 1e11);
    var PRE = [
      { l: 'Un cerebro · 20 W', w: 20, st: 'est' }, { l: 'NVIDIA H100 · 700 W', w: 700, st: 'decl' }, { l: 'Hala Point · 2,6 kW', w: 2600, st: 'decl' },
      { l: 'KAIROS · 46 kW', w: 46e3, st: 'med' }, { l: 'Frontier · 24,6 MW', w: 24.6e6, st: 'med' }, { l: 'LineShine · 42,2 MW', w: 42.2e6, st: 'med' },
      { l: 'Colossus 2 · 946 MW', w: 946e6, st: 'est' }, { l: '93 campus · 13,8 GW', w: 13.8e9, st: 'est' }, { l: 'Todos los centros, media 2025 · ≈55 GW', w: 485e12 / 8760, st: 'extr' }
    ];
    var P = 946e6, st = 'est';
    var box = h('div', { class: 't7-svgbox' }), out = outBox(), say = sayBox();
    var r = range({ label: 'Potencia eléctrica', min: 0, max: 1000, value: LM.toP(946e6), dim: 'nrg', fmt: function (q) { return siUnit(LM.toV(q), 'W'); }, on: function (q) { P = LM.toV(q); st = null; ch.clear(); draw(); },
      help: 'Este control cambia la potencia, de 1 W a 100 GW, en pasos logarítmicos. Lo único que se convierte en cerebros es esta potencia.' });
    var ch = chips(PRE, function (x) { P = x.w; st = x.st; r.set(LM.toP(x.w)); draw(); }, { label: 'Potencias del recorrido', sel: 6 });
    function draw() {
      var n = P / 20;
      var w = boxW(box, 560), x0 = 14, x1 = w - 16, yW = 58, yB = 104;
      var svg = svgRoot(box, w, 136, siUnit(P, 'W') + ' equivalen a ' + words(n) + ' cerebros de 20 vatios');
      var sc = logScale(1, 1e11, x0, x1);
      T(svg, x0, 14, w < 640 ? 'Arriba, vatios; abajo, cerebros de 20 W' : 'Vatios (arriba) y cerebros de 20 W (abajo): la misma regla desplazada 1,3 órdenes', 't7-lbx');
      logAxisX(svg, sc, 0, 11, yW, { every: w < 520 ? 2 : 1, ends: true });
      S('line', { x1: x0, x2: x1, y1: yB, y2: yB, class: 't7-ax' }, svg);
      for (var e = 0; e <= 9; e++) {
        if (w < 520 && e % 2) continue;
        var xe = sc(20 * P10(e));
        S('line', { x1: xe, x2: xe, y1: yB, y2: yB + 6, class: 't7-tk' }, svg);
        T(svg, xe, yB + 20, pw(e), 't7-tl', { 'text-anchor': 'middle' });
      }
      var x = sc(P);
      S('line', { x1: x, x2: x, y1: yW - 18, y2: yB, class: 't7-ref' }, svg);
      marker(svg, x, yW - 8, st || 'extr', 'nrg', 6.5);
      var t1 = siUnit(P, 'W'), t2 = words(n) + (/(millones|millón|billones)$/.test(words(n)) ? ' de cerebros' : ' cerebros');
      T(svg, clamp(x, x0 + tw(t1, 12) / 2 + 2, x1 - tw(t1, 12) / 2 - 2), yW - 22, t1, 't7-lb', { 'text-anchor': 'middle' });
      T(svg, clamp(x, x0 + tw(t2) / 2 + 2, x1 - tw(t2) / 2 - 2), yB - 6, t2, 't7-lbx', { 'text-anchor': 'middle' });
      fill(out, [
        linea(K('Cerebros = potencia ÷ 20 W = '), siUnit(P, 'W') + ' ÷ 20 W = ', h('b', null, n < 1 ? fmt(n, 2) : words(n))),
        linea(K('En exponentes: '), 'log₁₀ ' + nice(P) + ' − log₁₀ 20 = ' + fmt(L10(P), 2) + ' − 1,30 = ' + fmt(L10(n), 2)),
        linea(K('Energía en un año a plena potencia (máximo teórico): '), joules(P * 8760 * 3600))
      ]);
      M.clear(say);
      if (st) { say.appendChild(m2.marca(ST[st])); say.appendChild(document.createTextNode(' ')); }
      say.appendChild(rich('Esto dice cuánta **potencia eléctrica** exige; no dice cuánto calcula ni qué puede resolver. ' + (n < 1 ? 'Gasta menos que un cerebro en reposo, pero eso tampoco la hace más o menos «lista».' : '')));
    }
    el.appendChild(lab([p('Elige una potencia del recorrido o mueve el control. La conversión es siempre la misma: dividir entre 20 W.', { class: 'w-note-s' }), ch, r.wrap, box, out, say,
      h('div', { class: 'lec-lim t7-lim' },
        h('p', { class: 'si' }, h('b', null, 'Lo que sí dice'), 'Cuánta infraestructura eléctrica pide un sistema, en una unidad que podemos imaginar.'),
        h('p', { class: 'no' }, h('b', null, 'Lo que no dice'), 'Ni el cómputo, ni la eficiencia, ni la inteligencia. Tampoco la energía consumida en un periodo, que depende del tiempo y del uso.'))]));
    ro(box, draw); draw();
  };

  /* =====================================================================
     Figura · Cada nuevo n.º 1 y cuatro escenarios para 2036
     ===================================================================== */
  W['m2.fig-top500'] = function (el) {
    var D = [
      ['Roadrunner', 2008.47, 0.001026, 'junio de 2008'], ['Jaguar', 2009.88, 0.001759, 'noviembre de 2009'],
      ['Tianhe-1A', 2010.88, 0.002566, 'noviembre de 2010'], ['K computer', 2011.47, 0.008162, 'junio de 2011'],
      ['Sequoia', 2012.47, 0.01632, 'junio de 2012'], ['Titan', 2012.88, 0.01759, 'noviembre de 2012'],
      ['Tianhe-2', 2013.47, 0.03386, 'junio de 2013'], ['Sunway TaihuLight', 2016.47, 0.09301, 'junio de 2016'],
      ['Summit', 2018.47, 0.1223, 'junio de 2018'], ['Fugaku', 2020.47, 0.4155, 'junio de 2020'],
      ['Frontier', 2022.47, 1.102, 'junio de 2022'], ['El Capitan', 2024.88, 1.742, 'noviembre de 2024'],
      ['LineShine', 2026.47, 2.198, 'junio de 2026']
    ];
    var LAB = { Roadrunner: 1, Summit: 1, Fugaku: 1, Frontier: 1, LineShine: 1 };
    var Y0 = 2026.47, V0 = 2.198, Y1 = 2036.47;
    var SC = [
      { g: 0.15, cls: 't7-scn t7-dot' }, { g: 0.19, cls: 't7-scn t7-dash' }, { g: 0.37, cls: 't7-scn t7-dash2' }
    ];
    var mode = 1, cur = 1, gU = 0.25, cancel = null;
    function at(gr, y) { return V0 * Math.pow(1 + gr, y - Y0); }
    var box = h('div', { class: 't7-svgbox' });
    var out = outBox();
    var sg = seg(['Logarítmica', 'Lineal'], function (i) {
      var m = i === 0 ? 1 : 0; if (m === mode) return; mode = m;
      var from = cur;
      if (cancel) cancel();
      cancel = tween(el, 1000, function (k) { cur = lerp(from, m, k); render(); });
    }, 0, 'Escala del eje vertical');
    var rg = range({ label: 'Tu escenario: tasa anual', min: 5, max: 45, value: 25, dim: 'cmp', fmt: function (v) { return v + ' %'; }, on: function (v) { gU = v / 100; readout(); render(); } });
    var clipN = uid('clip');
    function render() {
      var w = boxW(box, 760), narrow = w < 600, x0 = narrow ? 50 : 58, x1 = w - (narrow ? 96 : 132), top = 20, ph = narrow ? 300 : 360, yB = top + ph, hh = yB + 44;
      var svg = svgRoot(box, w, hh, 'Rendimiento del sistema n.º 1 del TOP500 de 2008 a 2026 y escenarios hasta 2036, escala ' + (cur > 0.5 ? 'logarítmica' : 'lineal'));
      var sx = linScale(2008, 2037, x0, x1);
      var sLog = logScale(1e-3, 1e2, yB, top), sLin = linScale(0, 60, yB, top);
      function Y(v) { return lerp(sLin(v), sLog(Math.max(v, 1e-4)), cur); }
      var defs = S('defs', null, svg), cp = S('clipPath', { id: clipN }, defs);
      S('rect', { x: x0, y: top, width: x1 - x0 + 2, height: ph }, cp);
      /* ejes que se funden al cambiar de escala */
      var gLog = S('g', { opacity: cur }, svg), gLin = S('g', { opacity: 1 - cur }, svg);
      logAxisY(gLog, sLog, -3, 2, x0, { grid: [x0, x1], label: function (e) { return ['1 PF', '10 PF', '100 PF', '1 EF', '10 EF', '100 EF'][e + 3]; } });
      S('line', { x1: x0, x2: x0, y1: top, y2: yB, class: 't7-ax' }, gLin);
      for (var v = 0; v <= 60; v += 10) { var yv = sLin(v); S('line', { x1: x0, x2: x1, y1: yv, y2: yv, class: 't7-gl' }, gLin); S('line', { x1: x0 - 5, x2: x0, y1: yv, y2: yv, class: 't7-tk' }, gLin); T(gLin, x0 - 9, yv + 4, v + ' EF', 't7-tl', { 'text-anchor': 'end' }); }
      S('line', { x1: x0, x2: x1, y1: yB, y2: yB, class: 't7-ax' }, svg);
      for (var yr = 2008; yr <= 2036; yr += 2) {
        var xt = sx(yr);
        S('line', { x1: xt, x2: xt, y1: yB, y2: yB + (yr % 4 === 0 ? 6 : 3), class: 't7-tk' }, svg);
        if (yr % 4 === 0 && (!narrow || yr % 8 === 0)) T(svg, xt, yB + 19, String(yr), 't7-tl', { 'text-anchor': 'middle' });
      }
      T(svg, x0, hh - 4, narrow ? 'EFLOP/s (HPL, FP64) · escala ' + (cur > 0.5 ? 'logarítmica' : 'lineal') : 'EFLOP/s en FP64 (HPL) · eje vertical en escala ' + (cur > 0.5 ? 'logarítmica' : 'lineal'), 't7-lbx');
      /* umbral de 1 EFLOP/s y «hoy» */
      var y1e = Y(1);
      S('line', { x1: x0, x2: x1, y1: y1e, y2: y1e, class: 't7-ref' }, svg);
      T(svg, x0 + 6, y1e - 6, narrow ? 'exaescala' : '1 EFLOP/s · exaescala', 't7-lbx');
      var xNow = sx(Y0);
      S('line', { x1: xNow, x2: xNow, y1: top, y2: yB, class: 't7-now' }, svg);
      T(svg, xNow - 4, top + 10, 'hoy', 't7-lbx', { 'text-anchor': 'end' });
      /* escenarios (recortados al área del gráfico) */
      var gc = S('g', { 'clip-path': 'url(#' + clipN + ')' }, svg);
      var NP = 40;
      function pts(gr) { var a = []; for (var i = 0; i <= NP; i++) { var y = Y0 + (Y1 - Y0) * i / NP; a.push([sx(y), Y(at(gr, y))]); } return a; }
      var up = pts(0.30), dn = pts(0.25).reverse();
      S('path', { d: 'M' + up.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join('L') + 'L' + dn.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join('L') + 'Z', class: 't7-wash' }, gc);
      function path(gr, cls) { return S('path', { d: 'M' + pts(gr).map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join('L'), class: cls }, gc); }
      SC.forEach(function (s) { path(s.g, s.cls); });
      path(gU, 't7-user');
      /* triángulo de pendiente sobre tu escenario (solo en escala logarítmica) */
      if (cur > 0.02) {
        var a = 2028.47, b = 2033.47, xa = sx(a), xb = sx(b), ya = Y(at(gU, a)), yb = Y(at(gU, b));
        var tri = S('g', { opacity: cur }, svg);
        S('path', { d: 'M' + xa + ',' + ya + 'H' + xb + 'V' + yb, class: 't7-slope' }, tri);
        T(tri, (xa + xb) / 2, ya + 15, '5 años', 't7-lbx', { 'text-anchor': 'middle' });
        T(tri, xb + 6, clamp((ya + yb) / 2 + 4, top + 10, yB - 4), '×' + fmt(Math.pow(1 + gU, 5), 1), 't7-tlb');
      }
      /* etiquetas finales con separación */
      var ends = [
        { t: 'alto ~' + fmt(at(0.37, Y1), 0), v: at(0.37, Y1), c: 't7-lbx' },
        { t: 'central ' + fmt(at(0.25, Y1), 0) + '–' + fmt(at(0.30, Y1), 0), v: Math.sqrt(at(0.25, Y1) * at(0.30, Y1)), c: 't7-lbx' },
        { t: (narrow ? 'conserv. ~' : 'conservador ~') + fmt(at(0.19, Y1), 0), v: at(0.19, Y1), c: 't7-lbx' },
        { t: 'bajo ~' + fmt(at(0.15, Y1), 0), v: at(0.15, Y1), c: 't7-lbx' },
        { t: 'tú: ' + fmt(at(gU, Y1), at(gU, Y1) < 10 ? 1 : 0) + ' EF', v: at(gU, Y1), c: 't7-lb' }
      ].map(function (e) { var y = clamp(Y(e.v), top, yB); return { t: e.t, c: e.c, y: y, ly: y + 4 }; });
      var ord = ends.slice().sort(function (p1, p2) { return p2.ly - p1.ly; });
      for (var i = 1; i < ord.length; i++) if (ord[i - 1].ly - ord[i].ly < 13) ord[i].ly = ord[i - 1].ly - 13;
      var xe = sx(Y1);
      ends.forEach(function (e) {
        if (Math.abs(e.ly - 4 - e.y) > 2) S('path', { d: 'M' + (xe + 2) + ',' + e.y + 'L' + (xe + 8) + ',' + (e.ly - 4), class: 't7-leader' }, svg);
        T(svg, xe + 10, e.ly, e.t, e.c);
      });
      /* retícula de lectura de los escenarios */
      var hair = S('line', { x1: 0, x2: 0, y1: top, y2: yB, class: 't7-hair', visibility: 'hidden' }, svg);
      var ov = S('rect', { x: xNow, y: top, width: x1 - xNow, height: ph, class: 't7-hit t7-cross' }, svg);
      function lee(e) {
        var rc = svg.getBoundingClientRect(), px = (e.clientX - rc.left) * (w / rc.width), y = sx.inv(px);
        hair.setAttribute('x1', px); hair.setAttribute('x2', px); hair.setAttribute('visibility', 'visible');
        M.tipShow(tipHtml([String(Math.floor(y)) + ' · escenarios', 'bajo ' + fmt(at(0.15, y), 1) + ' · conservador ' + fmt(at(0.19, y), 1) + ' EF', 'central ' + fmt(at(0.25, y), 1) + '–' + fmt(at(0.30, y), 1) + ' · alto ' + fmt(at(0.37, y), 1) + ' EF', 'tu tasa (' + Math.round(gU * 100) + ' %): ' + fmt(at(gU, y), 1) + ' EF · extrapolado']), e.clientX, e.clientY);
      }
      ov.addEventListener('pointermove', lee);
      ov.addEventListener('pointerdown', lee);
      ov.addEventListener('pointerleave', function () { hair.setAttribute('visibility', 'hidden'); M.tipHide(); });
      /* puntos medidos */
      D.forEach(function (d) {
        var x = sx(d[1]), y = Y(d[2]), n = d[0];
        marker(svg, x, y, 'med', 'cmp', 5.2);
        if (LAB[n] && !(narrow && n !== 'LineShine' && n !== 'Roadrunner')) {
          if (n === 'Roadrunner') T(svg, x + 16, y + 3, n, 't7-lbx');
          else T(svg, x + (n === 'LineShine' ? -8 : 8), y - 9, n, 't7-lbx', { 'text-anchor': n === 'LineShine' ? 'end' : 'start' });
        }
        var txt = d[2] >= 1 ? fmt(d[2], 3) + ' EFLOP/s' : fmt(d[2] * 1000, d[2] < 0.01 ? 3 : 1) + ' PFLOP/s';
        hitRect(svg, x - 9, y - 9, 18, 18, n + ': ' + txt + ', n.º 1 en ' + d[3] + ', medido', [txt, n + ' · n.º 1 en ' + d[3], 'TOP500 · medido']);
      });
    }
    function readout() {
      var gr = gU, r = at(gr, Y1), sl = L10(1 + gr), db = Math.LN2 / Math.log(1 + gr);
      fill(out, [
        linea(K('R₂₀₃₆ = 2,198 × (1 + ' + fmt(gr, 2) + ')¹⁰ = '), h('b', null, fmt(r, r < 10 ? 1 : 0) + ' EFLOP/s')),
        linea(K('Pendiente: log₁₀(1 + g) = '), fmt(sl, 3) + ' órdenes de magnitud por año; se duplica cada ' + fmt(db, 1) + ' años y se multiplica por diez cada ' + fmt(1 / sl, 1) + '.')
      ]);
    }
    var filas = [['Sistema', 'Primera lista como n.º 1', 'Rmax (EFLOP/s)', 'Estatus']].concat(D.map(function (d) { return [d[0], d[3], fmt(d[2], 3), 'medido']; }),
      [['Escenario bajo (15–16 %)', '2036', '~9–10', 'extrapolado'], ['Escenario conservador (19–21 %)', '2036', '~12–15', 'extrapolado'], ['Escenario central (25–30 %)', '2036', '~20–30', 'extrapolado'], ['Escenario alto (35–37 %)', '2036', '~44–51', 'extrapolado']]);
    var datos = m2.desplegable('Ver los datos', 'los n.º 1 del TOP500 y los cuatro escenarios', m2.bloque({ tabla: filas, titulo: 'Cada nuevo n.º 1 del TOP500 y escenarios para 2036' }), 'datos');
    var ley = leyenda([
      [swMarca('med', 'cmp'), 'cada nuevo n.º 1 [medido]'],
      [swLinea('t7-scn t7-dot'), 'bajo · 15 %'],
      [swLinea('t7-scn t7-dash'), 'conservador · 19 %'],
      [swRect('t7-wash'), 'central · 25–30 %'],
      [swLinea('t7-scn t7-dash2'), 'alto · 37 %'],
      [swLinea('t7-user'), 'tu escenario'],
      [swLinea('t7-ref'), '1 EFLOP/s, la exascala']
    ]);
    el.appendChild(lab([h('div', { class: 't7-fila' }, sg, h('div', { class: 't7-grow' }, rg.wrap)), box, ley, out, datos]));
    readout();
    ro(box, render); render();
  };

  /* =====================================================================
     Figura · Una máquina, tres cifras
     ===================================================================== */
  W['m2.fig-bench'] = function (el) {
    var R = [
      { n: 'El Capitan', v: [17.41, 1809, 16700], t: ['17,41', '1.809', '16.700'], k: '× 9,2' },
      { n: 'LineShine', v: [22.0, 2198.4, 7920], t: ['22,0', '2.198', '7.920'], k: '× 3,6' }
    ];
    var B = ['HPCG', 'HPL', 'HPL-MxP'];
    var box = h('div', { class: 't7-svgbox' });
    function render() {
      var w = boxW(box, 640), narrow = w < 520, x0 = 12, x1 = w - 14, rowH = narrow ? 112 : 104, top = 8, yAx = top + R.length * rowH + 4, hh = yAx + 44;
      var svg = svgRoot(box, w, hh, 'Rendimiento de El Capitan y LineShine en tres bancos de prueba, en PFLOP/s y escala logarítmica: El Capitan 17,41 en HPCG, 1.809 en HPL y 16.700 en HPL-MxP; LineShine 22,0, 2.198 y 7.920');
      var sc = logScale(10, 1e5, x0, x1);
      logAxisX(svg, sc, 1, 5, yAx, { grid: [top, yAx], ends: true, label: function (e) { return ['10 PF', '100 PF', '1 EF', '10 EF', '100 EF'][e - 1]; } });
      T(svg, x1, hh - 4, 'PFLOP/s · escala logarítmica', 't7-lbx', { 'text-anchor': 'end' });
      R.forEach(function (r, i) {
        var y = top + i * rowH + 66, g = S('g', null, svg);
        T(svg, x0, top + i * rowH + 14, r.n, 't7-lb');
        var xs = r.v.map(function (v) { return sc(v); });
        S('line', { x1: xs[0], x2: xs[2], y1: y, y2: y, class: 't7-ln t7-s-cmp t7-op6' }, g);
        ratioBracket(g, xs[0], xs[1], y - 30, '÷100 ≈ 1 %');
        ratioBracket(g, xs[1], xs[2], y - 30, r.k);
        xs.forEach(function (x, j) {
          marker(g, x, y, 'med', 'cmp', 6);
          if (narrow) {
            var wl = Math.max(tw(B[j], 11, true), tw(r.t[j], 11, true)), an2, xl;
            if (j === 0) { an2 = 'middle'; xl = clamp(x, x0 + wl / 2 + 2, x1 - wl / 2); }
            else if (j === 1) { an2 = 'end'; xl = Math.max(x + 6, x0 + wl); }
            else { an2 = 'start'; xl = Math.min(x - 6, x1 - wl); }
            T(g, xl, y + 22, B[j], 't7-tl', { 'text-anchor': an2 });
            T(g, xl, y + 36, r.t[j], 't7-tlb', { 'text-anchor': an2 });
          } else {
            var anc = j === 0 ? 'middle' : j === 1 ? 'end' : 'start', dx = j === 1 ? 4 : j === 2 ? -4 : 0, lbl = B[j] + ' ' + r.t[j];
            var xl2 = j === 0 ? clamp(x, x0 + tw(lbl, 11, true) / 2, x1) : j === 2 ? Math.min(x + dx, x1 - tw(lbl, 11, true)) : x + dx;
            T(g, xl2, y + 22, lbl, 't7-tl', { 'text-anchor': anc });
          }
          hitRect(svg, x - 10, y - 10, 20, 20, r.n + ', ' + B[j] + ': ' + r.t[j] + ' PFLOP/s, medido', [r.t[j] + ' PFLOP/s', r.n + ' · ' + B[j], 'TOP500 (2026c) · medido']);
        });
      });
    }
    el.appendChild(lab([box, leyenda([[swMarca('med', 'cmp'), 'resultado medido en cada banco de pruebas'], [function (sv) { S('path', { d: 'M2,10V4H22V10', class: 't7-rbl' }, sv); }, 'corchete: cuántas veces más (o menos)']])]));
    ro(box, render); render();
  };

  /* =====================================================================
     Figura · Cada punto, un millón de cerebros
     ===================================================================== */
  W['m2.fig-cerebros'] = function (el) {
    var COLS = 64, ROWS = 45, CAP = COLS * ROWS, CELL = 10;
    var D = [
      { l: 'LineShine', w: 42.2e6, txt: '42,2 MW', st: 'med', n: 'Potencia medida durante el HPL, con el nivel 1 de la metodología (TOP500, 2026b). En esta matriz ocupa apenas dos puntos.' },
      { l: 'Colossus 2', w: 946e6, txt: '946 MW', st: 'est', n: 'Potencia IT estimada de la mayor instalación de la base de Epoch AI (2026a), en Memphis, con ~1,1 millones de equivalentes H100.' },
      { l: 'Campus de 5 GW', w: 5e9, txt: '5 GW', st: 'proy', n: 'Escala de campus que Sevilla et al. (2024) consideran para corridas de entrenamiento de hasta ~3 × 10²⁹ FLOP hacia 2030.' },
      { l: '93 centros de IA', w: 13.8e9, txt: '13,8 GW', st: 'est', n: 'Potencia IT de las 93 instalaciones de la base de Epoch AI (versión del 5 de octubre de 2026), que cubriría el 43 % del cómputo de IA desplegado.' },
      { l: 'Todos los centros de datos, 2025', w: 485e12 / 8760, txt: '≈55 GW', st: 'extr', n: 'Potencia media equivalente: 485 TWh consumidos en 2025 (IEA, 2026) ÷ 8.760 horas. Incluye todos los centros de datos, no solo los de IA.' }
    ];
    var sel = 1, shown = D[1].w / 20e6, cancel = null;
    var big = h('div', { class: 't7-big', 'aria-live': 'polite' }), out = outBox(), note = h('p', { class: 'w-note t7-note' });
    var ch = chips(D, function (x, i) { pick(i); }, { label: 'Instalación o conjunto', sel: sel });
    /* matriz: dos trazados (vacíos y llenos) y un punto parcial */
    var VW = COLS * CELL, VH = ROWS * CELL;
    var msvg = S('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 't7-svg t7-matriz', role: 'img', 'aria-label': 'Matriz de 2.880 puntos en la que cada punto equivale a un millón de cerebros', focusable: 'false' });
    var pVac = S('path', { class: 't7-dot-off' }, msvg), pLle = S('path', { class: 't7-dot-on' }, msvg), pPar = S('circle', { r: 3.4, class: 't7-dot-on', visibility: 'hidden' }, msvg);
    function dots(a, b, r) {
      var s = [];
      for (var i = a; i < b; i++) { var c = (i / ROWS) | 0, rr = i % ROWS, x = (c + 0.5) * CELL, y = (rr + 0.5) * CELL; s.push('M' + (x - r) + ' ' + y + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0'); }
      return s.join('');
    }
    function pintar() {
      var full = Math.floor(shown), frac = shown - full;
      pVac.setAttribute('d', dots(Math.ceil(shown), CAP, 2.4));
      pLle.setAttribute('d', dots(0, full, 3.4));
      if (frac > 0.01) {
        var c = (full / ROWS) | 0, rr = full % ROWS;
        pPar.setAttribute('cx', (c + 0.5) * CELL); pPar.setAttribute('cy', (rr + 0.5) * CELL); pPar.setAttribute('opacity', 0.25 + 0.75 * frac); pPar.setAttribute('visibility', 'visible');
      } else pPar.setAttribute('visibility', 'hidden');
    }
    msvg.addEventListener('pointerleave', function () { M.tipHide(); });
    function leeMatriz(e) {
      var rc = msvg.getBoundingClientRect(), c = Math.floor((e.clientX - rc.left) / rc.width * COLS), rr = Math.floor((e.clientY - rc.top) / rc.height * ROWS);
      if (c < 0 || c >= COLS || rr < 0 || rr >= ROWS) { M.tipHide(); return; }
      var i = c * ROWS + rr;
      var L = i < shown ? ['Punto ' + fmt(i + 1) + ' de ' + fmt(Math.ceil(shown)), D[sel].l + ' · ' + D[sel].txt, '1 punto = 1 millón de cerebros = 20 MW'] : ['Capacidad de la matriz', fmt(CAP) + ' puntos = 2.880 millones de cerebros', '= 57,6 GW'];
      M.tipShow(tipHtml(L), e.clientX, e.clientY);
    }
    msvg.addEventListener('pointermove', leeMatriz);
    msvg.addEventListener('pointerdown', leeMatriz);
    /* gemela logarítmica */
    var logBox = h('div', { class: 't7-svgbox' });
    function relog() {
      var w = boxW(logBox, 640), x0 = 10, x1 = w - 12, y = 46, hh = 92;
      var svg = svgRoot(logBox, w, hh, 'Las cinco cifras en una escala logarítmica de cerebros');
      var sc = logScale(1e6, 1e10, x0, x1);
      T(svg, x0, 12, 'La misma comparación en escala logarítmica', 't7-lbx');
      logAxisX(svg, sc, 6, 10, y + 10, { label: pw, ends: true });
      D.forEach(function (d, i) {
        var n = d.w / 20, x = sc(n), on = i === sel;
        if (on) S('circle', { cx: x, cy: y, r: 13, class: 't7-halo' }, svg);
        marker(svg, x, y, d.st, 'nrg', on ? 7 : 5);
        if (on) T(svg, clamp(x, x0 + tw(d.l, 12) / 2 + 2, x1 - tw(d.l, 12) / 2 - 2), y - 18, d.l, 't7-lb', { 'text-anchor': 'middle' });
        hitRect(svg, x - 9, y - 9, 18, 18, d.l + ': ' + words(n) + ' de cerebros, ' + ST[d.st], [words(n) + (/(millones|millón)$/.test(words(n)) ? ' de cerebros' : ' cerebros'), d.l + ' · ' + d.txt, ST[d.st]]);
      });
    }
    function readout() {
      var d = D[sel], n = d.w / 20, pts = n / 1e6;
      var wd = words(n), m = wd.match(/^(.*?)\s((?:mil\s)?millones|millón)$/);
      M.clear(big);
      big.appendChild(document.createTextNode(m ? m[1] + ' ' + m[2] : wd));
      big.appendChild(h('small', null, 'de cerebros'));
      fill(out, [
        linea(K(d.txt + ' ÷ 20 W = '), sci(n, 1) + ' cerebros'),
        linea(K('En la matriz: '), fmt(pts, pts < 10 ? 2 : 0) + ' de ' + fmt(CAP) + ' puntos')
      ]);
      M.clear(note);
      note.appendChild(m2.marca(ST[d.st]));
      note.appendChild(document.createTextNode(' '));
      note.appendChild(rich(d.n));
    }
    function pick(i) {
      if (i === sel) return;
      sel = i;
      var from = shown, to = D[sel].w / 20e6;
      if (cancel) cancel();
      cancel = tween(el, clamp(500 + Math.abs(to - from) * 0.5, 600, 1600), function (k) { shown = lerp(from, to, k); pintar(); });
      readout(); relog();
    }
    el.appendChild(lab([ch,
      h('div', { class: 'm2-grid2 t7-mgrid' }, h('div', { class: 't7-mwrap' }, msvg), h('div', { class: 't7-mside' }, big, out, note)),
      logBox,
      leyenda([[function (sv) { S('circle', { cx: 6, cy: 6, r: 3.6, class: 't7-dot-on' }, sv); S('circle', { cx: 17, cy: 6, r: 2.6, class: 't7-dot-off' }, sv); }, 'punto lleno: un millón de cerebros (20 MW); punto gris: vacío'],
        [swMarca('med', 'nrg'), 'medido'], [swMarca('est', 'nrg'), 'estimado'], [swMarca('proy', 'nrg'), 'proyectado'], [swMarca('extr', 'nrg'), 'extrapolado']])]));
    pintar(); readout();
    ro(logBox, relog); relog();
  };

  /* =====================================================================
     Figura · Consumo eléctrico de los centros de datos
     ===================================================================== */
  W['m2.fig-iea'] = function (el) {
    var box = h('div', { class: 't7-svgbox' });
    var cols = [
      { y: '2025', v: 485, st: 'est', src: 'IEA (2026)' },
      { y: '2030', v: 950, ai: 465, st: 'proy', src: 'IEA (2026)' },
      { y: '2035', v: 1200, st: 'proy', src: 'IEA (2025)' }
    ];
    function hatch(svg, cls) {
      var id = uid('h');
      var pt = S('pattern', { id: id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, S('defs', null, svg));
      S('rect', { width: 6, height: 6, class: cls + '-bg' }, pt);
      S('line', { x1: 0, y1: 0, x2: 0, y2: 6, class: cls + '-ln' }, pt);
      return 'url(#' + id + ')';
    }
    function render() {
      var w = boxW(box, 560), narrow = w < 460, x0 = 52, x1 = w - 12, top = 40, ph = 220, yB = top + ph, hh = yB + (narrow ? 84 : 70);
      var svg = svgRoot(box, w, hh, 'Consumo eléctrico de los centros de datos: 485 TWh en 2025, ~950 en 2030 y ~1.200 en 2035');
      var sy = linScale(0, 1300, yB, top);
      for (var v = 0; v <= 1250; v += 250) { var yv = sy(v); S('line', { x1: x0, x2: x1, y1: yv, y2: yv, class: 't7-gl' }, svg); T(svg, x0 - 8, yv + 4, fmt(v), 't7-tl', { 'text-anchor': 'end' }); }
      S('line', { x1: x0, x2: x1, y1: yB, y2: yB, class: 't7-ax' }, svg);
      T(svg, x0 - 8, top - 16, 'TWh por año', 't7-lbx', { 'text-anchor': 'start' });
      var hpI = hatch(svg, 't7-hi'), hpS = hatch(svg, 't7-hs');
      var bw = 24;
      function cx(i) { return x0 + (x1 - x0) * (i + 0.5) / 3; }
      function top4(x, y, ww, hgt) { return 'M' + x + ',' + (y + hgt) + 'V' + (y + 4) + 'a4,4 0 0 1 4,-4h' + (ww - 8) + 'a4,4 0 0 1 4,4V' + (y + hgt) + 'Z'; }
      cols.forEach(function (c, i) {
        var x = cx(i) - bw / 2, g = S('g', null, svg), yT = sy(c.v);
        if (c.ai) {
          var yAi = sy(c.ai);
          S('rect', { x: x, y: yAi, width: bw, height: yB - yAi, fill: hpS }, g);
          S('rect', { x: x + 0.5, y: yAi + 0.5, width: bw - 1, height: yB - yAi - 1, class: 't7-ol-nrg' }, g);
          S('path', { d: top4(x, yT, bw, yAi - yT - 2), fill: hpI }, g);
          S('path', { d: top4(x + 0.5, yT + 0.5, bw - 1, yAi - yT - 3), class: 't7-ol-nrg2' }, g);
          T(g, x + bw + 8, (yAi + yB) / 2 + 4, narrow ? 'IA' : 'IA ~465', 't7-tl');
          T(g, x + bw + 8, (yT + yAi) / 2 + 4, narrow ? 'resto' : 'resto ~485', 't7-tl');
        } else if (c.st === 'proy') {
          S('path', { d: top4(x, yT, bw, yB - yT), fill: hpI }, g);
          S('path', { d: top4(x + 0.5, yT + 0.5, bw - 1, yB - yT - 1), class: 't7-ol-nrg2' }, g);
        } else {
          S('path', { d: top4(x, yT, bw, yB - yT), class: 't7-f-nrg2' }, g);
        }
        var vt = (c.st === 'proy' ? '~' : '') + fmt(c.v) + ' TWh';
        T(svg, cx(i), yT - 10, vt, 't7-tlb', { 'text-anchor': 'middle' });
        T(svg, cx(i), yB + 18, c.y, 't7-tlb', { 'text-anchor': 'middle' });
        var stt = narrow ? ST[c.st] : ST[c.st] + ' · ' + c.src;
        T(svg, cx(i) + 6, yB + 32, stt, 't7-lbx', { 'text-anchor': 'middle' });
        marker(svg, cx(i) + 6 - tw(stt) / 2 - 8, yB + 28, c.st, 'nrg', 4.2);
        hitRect(svg, cx(i) - 40, top, 80, ph, c.y + ': ' + vt + ', ' + ST[c.st] + ', ' + c.src, [vt + ' en ' + c.y, c.ai ? 'De ellos, ~465 TWh en centros orientados a la IA' : (c.y === '2025' ? '≈55 GW de media ≈ 2.800 millones de cerebros' : 'Escenario base del informe de 2025'), ST[c.st] + ' · ' + c.src]);
      });
      /* duplicación en cinco años */
      var xa = cx(0) + bw / 2 + 6, xb = cx(1) - bw / 2 - 6, ya = sy(485), yb = sy(950);
      S('path', { d: 'M' + xa + ',' + ya + 'L' + xb + ',' + yb, class: 't7-conn' }, svg);
      T(svg, (xa + xb) / 2 - 6, (ya + yb) / 2 - 8, '≈ ×2', 't7-rbt', { 'text-anchor': 'middle' });
      /* leyenda */
      var lg = S('g', { transform: 'translate(' + (narrow ? 8 : x0) + ',' + (hh - (narrow ? 26 : 12)) + ')' }, svg);
      S('rect', { x: 0, y: -9, width: 10, height: 10, rx: 2, class: 't7-f-nrg2' }, lg); T(lg, 16, 0, 'todos los centros', 't7-lbx');
      S('rect', { x: 128, y: -9, width: 10, height: 10, rx: 2, fill: hpS }, lg); S('rect', { x: 128.5, y: -8.5, width: 9, height: 9, rx: 2, class: 't7-ol-nrg' }, lg); T(lg, 144, 0, 'orientados a la IA', 't7-lbx');
      var l3x = narrow ? 0 : 262, l3y = narrow ? 16 : 0;
      S('rect', { x: l3x, y: l3y - 9, width: 10, height: 10, rx: 2, fill: hpI }, lg);
      S('rect', { x: l3x + 0.5, y: l3y - 8.5, width: 9, height: 9, rx: 2, class: 't7-ol-nrg2' }, lg);
      T(lg, l3x + 16, l3y, 'trama: proyección', 't7-lbx');
    }
    el.appendChild(lab([box]));
    ro(box, render); render();
  };

  /* =====================================================================
     Animaciones de los niveles 8 y 9: esquemas ilustrativos, sin escala.
     Botón de pausa; con movimiento reducido arrancan detenidas en un
     fotograma fijo; el bucle se detiene cuando el elemento sale del DOM.
     ===================================================================== */
  function animar(el, root, tick) {
    var reproduciendo = !REDUCIR, visible = true, raf = 0, last = 0, t = 12.5, conectado = false, intentos = 0;
    var btn = h('button', { type: 'button', class: 'btn small t7-play' });
    function rotulo() {
      M.clear(btn);
      btn.appendChild(M.icon(reproduciendo ? 'pausa' : 'play'));
      btn.appendChild(document.createTextNode(reproduciendo ? 'Pausar la animación' : 'Reproducir la animación'));
    }
    function frame(now) {
      raf = 0;
      if (el.isConnected) conectado = true;
      else if (conectado || ++intentos > 240) return; /* fuera del DOM: se detiene */
      if (!reproduciendo) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (visible && !document.hidden && el.isConnected) { t += dt; tick(t, dt, false); }
      raf = requestAnimationFrame(frame);
    }
    function play() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    btn.addEventListener('click', function () { reproduciendo = !reproduciendo; rotulo(); if (reproduciendo) play(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[es.length - 1].isIntersecting; }, { rootMargin: '120px 0px' }).observe(root);
    tick(t, 0, true);
    rotulo();
    if (reproduciendo) play();
    return btn;
  }
  function pieAnim(btn, items) {
    return h('div', { class: 't7-animpie' }, btn, leyenda(items),
      REDUCIR ? p('Tu sistema pide reducir el movimiento: la animación empieza detenida.', { class: 'w-note-s' }) : null);
  }

  /* ---------- Nivel 8 · Supercomputadora ---------- */
  W['m2.nv-super'] = function (el) {
    var VW = 640, VH = 410, rows = 4, cols = 8, u = Math.min(VW / 17, VH / 11.5);
    var a = u * 0.86, b = u * 0.5, c = u * 0.75, HR = 2.2, ZT = 2.6;
    var ox = VW / 2 + 3, oy = 12 + ZT * c;
    function P(x, y, z) { return [ox + (x - y) * a, oy + (x + y) * b - z * c]; }
    function poly(pts) { return pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); }
    var svg = S('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 't7-svg t7-anim', role: 'img', 'aria-label': 'Esquema animado: filas de armarios de cómputo sobre un suelo técnico, con luces de actividad; por las bandejas de cables de la red de interconexión viajan pulsos.', focusable: 'false' });
    /* suelo técnico */
    var fl = '';
    for (var i = 0; i <= cols; i++) { var f1 = P(i, -0.5, 0), f2 = P(i, rows * 2.4, 0); fl += 'M' + f1[0].toFixed(1) + ',' + f1[1].toFixed(1) + 'L' + f2[0].toFixed(1) + ',' + f2[1].toFixed(1); }
    for (var j = -0.5; j <= rows * 2.4; j += 1.2) { var g1 = P(-0.5, j, 0), g2 = P(cols + 0.5, j, 0); fl += 'M' + g1[0].toFixed(1) + ',' + g1[1].toFixed(1) + 'L' + g2[0].toFixed(1) + ',' + g2[1].toFixed(1); }
    S('path', { d: fl, class: 't7-floor' }, svg);
    var leds = [], trays = [], seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var r = 0; r < rows; r++) {
      var gy = r * 2.4;
      for (var cc = 0; cc < cols; cc++) {
        var x = cc + 0.06, sx = 0.88, sy = 1;
        var q = function (dx, dy, dz) { return P(x + dx, gy + dy, dz); };
        S('polygon', { points: poly([q(0, sy, 0), q(sx, sy, 0), q(sx, sy, HR), q(0, sy, HR)]), class: 't7-rk-fr' }, svg);
        S('polygon', { points: poly([q(sx, 0, 0), q(sx, sy, 0), q(sx, sy, HR), q(sx, 0, HR)]), class: 't7-rk-ld' }, svg);
        S('polygon', { points: poly([q(0, 0, HR), q(sx, 0, HR), q(sx, sy, HR), q(0, sy, HR)]), class: 't7-rk-tp' }, svg);
        for (var k = 0; k < 10; k++) {
          var lp = P(cc + 0.2 + (k % 2) * 0.5, gy + 1, 0.35 + Math.floor(k / 2) * 0.38);
          var le = S('rect', { x: (lp[0] - 2).toFixed(1), y: (lp[1] - 2).toFixed(1), width: 4, height: 4, class: 't7-led' }, svg);
          leds.push({ el: le, ph: rnd() * Math.PI * 2, sp: 0.5 + rnd() * 2.5, b: rnd() < 0.2, fijo: (k + cc + r) % 3 === 0, on: null });
        }
      }
      /* bandeja de cables de la red de interconexión, con pulsos */
      var ta = P(0, gy + 0.4, ZT), tb = P(cols, gy + 0.4, ZT);
      S('line', { x1: ta[0], y1: ta[1], x2: tb[0], y2: tb[1], class: 't7-tray' }, svg);
      trays.push({ a: ta, b: tb });
    }
    var gp = S('g', null, svg), pool = [], pul = [];
    for (var n = 0; n < 16; n++) {
      var pg = S('g', { visibility: 'hidden' }, gp);
      S('circle', { r: 9, class: 't7-pulse-o' }, pg); S('circle', { r: 3.6, class: 't7-pulse-i' }, pg);
      pool.push(pg);
    }
    /* rótulos en zonas libres del dibujo */
    var tEnd = trays[0].b;
    S('path', { d: 'M' + (VW - 70) + ',' + 44 + 'L' + (tEnd[0] + 2) + ',' + (tEnd[1] - 6), class: 't7-leader' }, svg);
    T(svg, VW - 12, 36, 'red de interconexión', 't7-alb', { 'text-anchor': 'end' });
    var rk = P(2.5, (rows - 1) * 2.4 + 1, 0.9);
    S('path', { d: 'M' + 70 + ',' + (VH - 40) + 'L' + rk[0] + ',' + rk[1], class: 't7-leader' }, svg);
    T(svg, 12, VH - 24, 'armarios de cómputo (racks)', 't7-alb');
    function tick(t, dt, est) {
      leds.forEach(function (L) {
        var on = est ? L.fijo : Math.sin(t * L.sp + L.ph) > 0.35;
        if (on !== L.on) { L.on = on; L.el.setAttribute('class', on ? (L.b ? 't7-led t7-on t7-onb' : 't7-led t7-on') : 't7-led'); }
      });
      if (est) { pul = trays.map(function (tr, i) { return { r: i, k: 0.3 + i * 0.15 }; }); }
      else {
        for (var i2 = 0; i2 < rows; i2++) if (Math.random() < dt * 2.2 && pul.length < pool.length) pul.push({ r: i2, k: 0 });
        pul.forEach(function (pp) { pp.k += dt * 0.7; });
        pul = pul.filter(function (pp) { return pp.k < 1; });
      }
      pool.forEach(function (pg, i3) {
        var pp = pul[i3];
        if (!pp) { pg.setAttribute('visibility', 'hidden'); return; }
        var tr = trays[pp.r], px = lerp(tr.a[0], tr.b[0], pp.k), py = lerp(tr.a[1], tr.b[1], pp.k);
        pg.setAttribute('transform', 'translate(' + px.toFixed(1) + ',' + py.toFixed(1) + ')');
        pg.setAttribute('visibility', 'visible');
      });
    }
    var btn = animar(el, svg, tick);
    el.appendChild(h('div', { class: 't7-animbox' }, svg, pieAnim(btn, [
      [swRect('t7-rk-fr'), 'armarios de cómputo (*racks*)'],
      [function (sv) { S('rect', { x: 4, y: 4, width: 4, height: 4, class: 't7-led t7-on' }, sv); S('rect', { x: 14, y: 4, width: 4, height: 4, class: 't7-led' }, sv); }, 'luces de actividad'],
      [function (sv) { S('line', { x1: 1, x2: 23, y1: 6, y2: 6, class: 't7-tray' }, sv); S('circle', { cx: 12, cy: 6, r: 3, class: 't7-pulse-i' }, sv); }, 'red de interconexión y sus pulsos']
    ])));
  };

  /* ---------- Nivel 9 · Centro de datos de IA ---------- */
  W['m2.nv-centro'] = function (el) {
    var VW = 640, VH = 360;
    var svg = S('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 't7-svg t7-anim', role: 'img', 'aria-label': 'Esquema animado de un campus visto desde arriba: a la izquierda, una subestación eléctrica; líneas de energía en movimiento llevan la electricidad a seis naves de cómputo con enfriadores girando en la cubierta.', focusable: 'false' });
    var gr = '';
    for (var x = 0; x <= VW; x += 28) gr += 'M' + x + ',0V' + VH;
    for (var y = 0; y <= VH; y += 28) gr += 'M0,' + y + 'H' + VW;
    S('path', { d: gr, class: 't7-grid' }, svg);
    S('rect', { x: VW * 0.04, y: VH * 0.08, width: VW * 0.93, height: VH * 0.84, class: 't7-perim' }, svg);
    var s = { x: VW * 0.06, y: VH * 0.36, w: VW * 0.14, h: VH * 0.28 };
    var bw = VW * 0.2, bh = VH * 0.2, bld = [], seed = 3;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) bld.push({ x: VW * 0.3 + c * (bw + VW * 0.03), y: VH * 0.17 + r * (bh + VH * 0.14), ph: rnd() * Math.PI * 2 });
    /* líneas de alimentación con flujo */
    var gap = VH * 0.14;
    var lines = bld.map(function (b, i) {
      var arriba = i < 3, bus = arriba ? b.y + bh + gap * 0.3 : b.y - gap * 0.3, entra = arriba ? b.y + bh : b.y;
      return S('path', { d: 'M' + (s.x + s.w) + ',' + (s.y + s.h / 2) + 'H' + VW * 0.26 + 'V' + bus + 'H' + (b.x + bw / 2) + 'V' + entra, class: 't7-pwr' }, svg);
    });
    /* subestación */
    S('rect', { x: s.x, y: s.y, width: s.w, height: s.h, class: 't7-sub' }, svg);
    for (var i = 0; i < 3; i++) S('rect', { x: s.x + s.w * 0.18, y: s.y + s.h * (0.12 + i * 0.28), width: s.w * 0.64, height: s.h * 0.2, class: 't7-sub-i' }, svg);
    /* naves con enfriadores en la cubierta */
    var fans = [];
    bld.forEach(function (b) {
      b.glow = S('ellipse', { cx: b.x + bw / 2, cy: b.y + bh / 2, rx: bw * 0.6, ry: bh * 0.66, class: 't7-glow' }, svg);
      S('rect', { x: b.x, y: b.y, width: bw, height: bh, class: 't7-hall' }, svg);
      var nx = 4, ny = 2, rr = Math.min(bw / nx, bh / ny) * 0.32;
      for (var ii = 0; ii < nx; ii++) for (var jj = 0; jj < ny; jj++) {
        var cx = b.x + (ii + 0.5) * bw / nx, cy = b.y + (jj + 0.5) * bh / ny;
        S('circle', { cx: cx, cy: cy, r: rr, class: 't7-fan' }, svg);
        var g = S('g', null, svg), dd = '';
        for (var k = 0; k < 3; k++) { var an = k * Math.PI * 2 / 3; dd += 'M' + cx + ',' + cy + 'L' + (cx + Math.cos(an) * rr * 0.85).toFixed(1) + ',' + (cy + Math.sin(an) * rr * 0.85).toFixed(1); }
        S('path', { d: dd, class: 't7-fan' }, g);
        fans.push({ g: g, cx: cx, cy: cy, off: ii + jj });
      }
    });
    T(svg, s.x + s.w / 2, s.y - 10, 'subestación', 't7-alb', { 'text-anchor': 'middle' });
    T(svg, bld[0].x, bld[0].y - 10, 'salas de cómputo y enfriadores', 't7-alb');
    function tick(t, dt, est) {
      var off = est ? 0 : -t * 40;
      lines.forEach(function (l) { l.setAttribute('stroke-dashoffset', off.toFixed(1)); });
      bld.forEach(function (b) { var br = est ? 0.5 : 0.5 + 0.5 * Math.sin(t * 1.1 + b.ph); b.glow.setAttribute('opacity', (0.08 + br * 0.2).toFixed(3)); });
      fans.forEach(function (f) { var a0 = (est ? 0 : t * 6) + f.off; f.g.setAttribute('transform', 'rotate(' + (a0 * 180 / Math.PI).toFixed(1) + ' ' + f.cx.toFixed(1) + ' ' + f.cy.toFixed(1) + ')'); });
    }
    var btn = animar(el, svg, tick);
    el.appendChild(h('div', { class: 't7-animbox' }, svg, pieAnim(btn, [
      [swRect('t7-sub'), 'subestación eléctrica'],
      [swLinea('t7-pwr'), 'líneas de energía'],
      [function (sv) { S('rect', { x: 2, y: 1, width: 20, height: 10, rx: 1, class: 't7-hall' }, sv); S('circle', { cx: 12, cy: 6, r: 3, class: 't7-fan' }, sv); }, 'nave de cómputo con enfriadores'],
      [function (sv) { S('ellipse', { cx: 12, cy: 6, rx: 10, ry: 5, class: 't7-glow', opacity: 0.35 }, sv); }, 'resplandor: la carga eléctrica']
    ])));
  };
})();
