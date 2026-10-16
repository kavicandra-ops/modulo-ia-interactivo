/* Laboratorios del Taller 8 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =====================================================================
     Utilidades compartidas: números y dibujo en SVG.
     Portadas de la edición didáctica (fmt, sci, words, escalas, ejes,
     marcadores por tipo de cifra) para que las lecturas sean idénticas.
     ===================================================================== */
  var S = M.s;
  var L10 = Math.log10, P10 = function (e) { return Math.pow(10, e); };
  var ST = { med: 'medido', est: 'estimado', decl: 'declarado', proy: 'proyectado', extr: 'extrapolado' };
  var nId = 0;
  function uid(pref) { nId += 1; return 't8-' + pref + '-' + nId; }

  /* Números en español: coma decimal y punto de millares */
  function fmt(v, d) {
    d = d || 0;
    var neg = v < 0, s = Math.abs(v).toFixed(d), pr = s.split('.');
    var i = pr[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '−' : '') + i + (pr[1] ? ',' + pr[1] : '');
  }
  var SUPM = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '−': '⁻' };
  function supU(n) { return String(n).split('').map(function (c) { return SUPM[c] !== undefined ? SUPM[c] : c; }).join(''); }
  function pw(e) { return '10' + supU(e < 0 ? '−' + Math.abs(e) : e); }
  /* 2.198e18 → «2,2 × 10¹⁸»; d = decimales de la mantisa */
  function sci(v, d, keepOne) {
    if (d == null) d = 1;
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(L10(Math.abs(v)) + 1e-9);
    var m = v / P10(e);
    var ms = Math.abs(m).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; m = v / P10(e); ms = Math.abs(m).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ',');
    if (mant === '1' && !keepOne) return (v < 0 ? '−' : '') + pw(e);
    return (v < 0 ? '−' : '') + mant + ' × ' + pw(e);
  }
  /* número con 2–3 cifras significativas, en notación normal si cabe */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1, true).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Cantidades grandes en palabras: 4,7e7 → «47 millones» */
  function words(n) {
    if (n >= 1e12) return fmt(n / 1e12, n < 1e13 ? 1 : 0) + ' billones';
    if (n >= 1e9) return fmt(n / 1e9, n < 1e10 ? 1 : 0).replace(/,0$/, '') + ' mil millones';
    if (n >= 1e6) { var v = n / 1e6, s = fmt(v, v < 10 ? 1 : 0).replace(/,0$/, ''); return s + (s === '1' ? ' millón' : ' millones'); }
    if (n >= 1e4) return fmt(Math.round(n / 100) * 100);
    return fmt(n, n < 10 && n % 1 ? 1 : 0);
  }
  function cerebros(n) { var w = words(n); return w + (/(millones|millón|billones)$/.test(w) ? ' de cerebros' : (n < 1.5 ? ' cerebro' : ' cerebros')); }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- SVG ---------- */
  function E(g, tag, attrs) { var e = S(tag, attrs); g.appendChild(e); return e; }
  function T(g, x, y, txt, cls, extra) {
    var a = { x: +(+x).toFixed(1), y: +(+y).toFixed(1), class: cls };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    var t = S('text', a); t.textContent = txt; g.appendChild(t); return t;
  }
  function svgRoot(host, w, hh, label) {
    M.clear(host);
    var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + hh, width: w, height: hh, role: 'img', 'aria-label': label, class: 't8-svg' });
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
    var step = o.every || 1, lab = o.label || pw, tick = o.tick || 6, e, m;
    if (o.bands) for (e = e0; e < e1; e++) if ((e - e0) % 2 === 0) E(g, 'rect', { x: sc.e(e), y: o.bands[0], width: sc.e(e + 1) - sc.e(e), height: o.bands[1] - o.bands[0], class: 't8-band' });
    if (o.grid) for (e = e0; e <= e1; e++) E(g, 'line', { x1: sc.e(e), x2: sc.e(e), y1: o.grid[0], y2: o.grid[1], class: 't8-gl' });
    E(g, 'line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't8-ax' });
    for (e = e0; e <= e1; e++) {
      var x = sc.e(e);
      E(g, 'line', { x1: x, x2: x, y1: y, y2: y + tick, class: 't8-tk' });
      if ((e - e0) % step === 0) T(g, x, y + tick + 13, lab(e), 't8-tl', { 'text-anchor': 'middle' });
      if (e < e1) for (m = 2; m < 10; m++) { var xm = sc(m * P10(e)); E(g, 'line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? tick * 0.7 : tick * 0.45), class: 't8-tkm' }); }
    }
  }
  function logAxisY(g, sc, e0, e1, x, o) {
    o = o || {};
    var step = o.every || 1, lab = o.label || pw, e, m;
    if (o.grid) for (e = e0; e <= e1; e++) E(g, 'line', { y1: sc.e(e), y2: sc.e(e), x1: o.grid[0], x2: o.grid[1], class: 't8-gl' });
    E(g, 'line', { y1: sc.e(e0), y2: sc.e(e1), x1: x, x2: x, class: 't8-ax' });
    for (e = e0; e <= e1; e++) {
      var y = sc.e(e);
      E(g, 'line', { y1: y, y2: y, x1: x - 5, x2: x, class: 't8-tk' });
      if ((e - e0) % step === 0) T(g, x - 9, y + 4, lab(e), 't8-tl', { 'text-anchor': 'end' });
      if (e < e1) for (m = 2; m < 10; m++) { var ym = sc(m * P10(e)); E(g, 'line', { y1: ym, y2: ym, x1: x - (m === 5 ? 3.5 : 2.2), x2: x, class: 't8-tkm' }); }
    }
  }
  /* Marcador por tipo de cifra: rombo medido, círculo estimado, cuadrado declarado;
     rombo hueco proyectado y círculo hueco extrapolado */
  function marker(g, x, y, st, col, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var grp = E(g, 'g', { class: 't8-mk t8-k-' + col + (hueco ? ' t8-mk-h' : ' t8-mk-f') });
    if (st === 'med' || st === 'proy') E(grp, 'rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')' });
    else if (st === 'decl') E(grp, 'rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2 });
    else E(grp, 'circle', { cx: x, cy: y, r: r * 0.92 });
    return grp;
  }
  /* Corchete de razón entre dos marcas */
  function bracket(g, xa, xb, y, text, wmax) {
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb);
    var grp = E(g, 'g', { class: 't8-rb' });
    E(grp, 'path', { d: 'M' + x0 + ',' + (y + 5) + 'V' + y + 'H' + x1 + 'V' + (y + 5) });
    if (text) {
      var half = text.length * 3.6 + 6, cx = (x0 + x1) / 2;
      if (wmax) cx = Math.max(half, Math.min(wmax - half, cx));
      T(grp, cx, y - 6, text, 't8-rbt', { 'text-anchor': 'middle' });
    }
    return grp;
  }
  /* Glifo de mundo (neurona o chip): identidad sin depender del color */
  function glyph(g, x, y, kind, s) {
    s = s || 12; var k = s / 16;
    var grp = E(g, 'g', { class: 't8-glyph', transform: 'translate(' + (x - s / 2).toFixed(1) + ',' + (y - s / 2).toFixed(1) + ') scale(' + k.toFixed(3) + ')', 'aria-hidden': 'true' });
    if (kind === 'bio') { E(grp, 'circle', { cx: 8, cy: 8.4, r: 2.7 }); E(grp, 'path', { d: 'M7.6 5.8L5.6 1.4M5.6 9.6L1.4 11.6M10.5 9.4l4 3.4M10.2 6.6l3.6-3.2' }); }
    else { E(grp, 'rect', { x: 4.2, y: 4.2, width: 7.6, height: 7.6, rx: 1.2 }); E(grp, 'path', { d: 'M6.2 1.4v2.4M9.8 1.4v2.4M6.2 12.2v2.4M9.8 12.2v2.4M1.4 6.2h2.4M1.4 9.8h2.4M12.2 6.2h2.4M12.2 9.8h2.4' }); }
    return grp;
  }
  /* Ancho real de un texto ya dibujado (o una estimación si aún no se puede medir) */
  function largo(t, est) {
    try { var l = t.getComputedTextLength(); if (l > 0) return l; } catch (e) { /* sin medida */ }
    return est;
  }
  function hatch(svg, id) {
    var defs = E(svg, 'defs', {});
    var pat = E(defs, 'pattern', { id: id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
    E(pat, 'line', { x1: 0, y1: 0, x2: 0, y2: 6, class: 't8-hatch' });
    return 'url(#' + id + ')';
  }
  /* Zona invisible que muestra una lectura al pasar el cursor, al tocarla o al llegar con el teclado.
     Con el dedo, la lectura se queda a la vista hasta que tocas en otro sitio o desplazas la página. */
  var tipDe = null;
  function tipFuera() { tipDe = null; if (M.tipHide) M.tipHide(); }
  document.addEventListener('pointerdown', function (e) {
    if (tipDe && !(e.target && e.target.closest && e.target.closest('.t8-hit'))) tipFuera();
  }, true);
  function tip(g, x, y, w, hh, lines) {
    var r = E(g, 'rect', { x: x, y: y, width: Math.max(0, w), height: Math.max(0, hh), class: 't8-hit', tabindex: '0', role: 'img', 'aria-label': lines.filter(Boolean).join('. ') });
    var html = '<b>' + esc(lines[0]) + '</b>' + lines.slice(1).filter(Boolean).map(function (l) { return '<br>' + esc(l); }).join('');
    var tocado = 0;
    function mostrar(cx, cy) { if (!M.tipShow) return; M.tipShow(html, cx, cy); tipDe = r; }
    function show(e) { mostrar(e.clientX, e.clientY); }
    r.addEventListener('pointerenter', show);
    r.addEventListener('pointermove', show);
    r.addEventListener('pointerdown', function (e) { tocado = Date.now(); show(e); });
    r.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch' && tipDe === r) tipFuera(); });
    r.addEventListener('focus', function () {
      if (Date.now() - tocado < 1500) return;
      var b = r.getBoundingClientRect();
      mostrar(b.left + Math.min(b.width / 2, 120), b.top);
    });
    r.addEventListener('blur', function () { if (tipDe === r) tipFuera(); });
    return r;
  }
  /* Redibuja al cambiar el ancho del contenedor; se desconecta al salir de la página */
  function responsive(host, render) {
    var lastW = 0, visto = false, ro = null;
    function go() {
      if (!host.isConnected) { if (visto && ro) ro.disconnect(); return; }
      visto = true;
      var w = Math.round(host.clientWidth);
      if (w >= 120 && Math.abs(w - lastW) > 1) { lastW = w; render(w); }
    }
    if ('ResizeObserver' in window) { ro = new ResizeObserver(go); ro.observe(host); }
    else window.addEventListener('resize', go);
    render(560); lastW = 0;
    setTimeout(go, 0);
    return function () { lastW = 0; if (host.isConnected) go(); else render(560); };
  }
  /* Grupo de botones excluyentes con etiqueta visible */
  function opciones(etq, items, sel, on) {
    var id = uid('g');
    var g = h('div', { class: 'chips', role: 'group', 'aria-labelledby': id });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === sel) }, it.l || it);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(it, i); });
      g.appendChild(b); return b;
    });
    return h('div', { class: 't8-ctrl' }, h('span', { class: 't8-ctrl-k', id: id }, etq), g);
  }
  function linea(k, resto) { return h('span', { class: 't8-ln' }, h('span', { class: 't8-k' }, k), resto); }
  /* Razón con dos cifras significativas, como en las figuras y el texto: 17,5 → «18»; 0,175 → «0,18» */
  function rtxt(r) { r *= 1 + 1e-9; return r >= 1e4 ? sci(r, 1) : r >= 100 ? fmt(Math.round(r / 10) * 10) : r >= 10 ? fmt(r, 0) : fmt(r, r < 1 ? 2 : 1); }
  /* Potencia con prefijo: 2,4607e7 → «24,6 MW» */
  function vatios(v) {
    var U = [[1e9, 'GW'], [1e6, 'MW'], [1e3, 'kW'], [1, 'W']];
    for (var i = 0; i < U.length; i++) if (v >= U[i][0]) { var q = v / U[i][0]; return fmt(q, q < 100 && q % 1 ? 1 : 0).replace(/,0$/, '') + ' ' + U[i][1]; }
    return fmt(v) + ' W';
  }
  /* Leyenda con marcadores dibujados igual que en la figura */
  function swatch(dibujo) {
    var svg = S('svg', { viewBox: '0 0 22 14', width: 22, height: 14, class: 't8-svg t8-swsvg', 'aria-hidden': 'true', focusable: 'false' });
    dibujo(svg);
    return svg;
  }
  function leyenda(items, etq) {
    return h('ul', { class: 't8-ley', 'aria-label': etq || 'Leyenda' }, items.map(function (it) { return h('li', null, it[0], h('span', null, rich(it[1]))); }));
  }
  function swMarca(st, col) { return swatch(function (s) { marker(s, 11, 7, st, col, 5); }); }

  var CONV = [{ l: '10¹³ FLOP/s · extremo inferior', v: 1e13 }, { l: '10¹⁵ FLOP/s · convención central', v: 1e15 }, { l: '10¹⁸ FLOP/s · red de impulsos', v: 1e18 }];

  /* =====================================================================
     III.1 · Energía por operación (effcalc)
     ===================================================================== */
  W['m2.effcalc'] = function (el) {
    var REF = [
      { l: 'KAIROS · FP64 · sistema de 46 kW', s: 'KAIROS', e: 1.36e-11, p: 46e3, st: 'med' },
      { l: 'Frontier · FP64 · sistema completo', s: 'Frontier', e: 1.8e-11, p: 24.607e6, st: 'med' },
      { l: 'El Capitan · FP64 · sistema completo', s: 'El Capitan', e: 1.6e-11, p: 29.7e6, st: 'med' },
      { l: 'H100 · FP8 denso · pico del chip', s: 'H100', e: 3.5e-13, p: 700, st: 'decl' },
      { l: 'Hala Point · 8 bits · red dispersa', s: 'Hala Point', e: 6.7e-14, p: 2600, st: 'decl' }
    ];
    var cv = CONV[1], rf = REF[0];
    var box = h('div', { class: 't8-svgbox' });
    var out = h('div', { class: 'm2-out t8-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't8-say', 'aria-live': 'polite' });
    function draw(w) {
      var eb = 20 / cv.v, r = rf.e / eb, pr = rf.p / 20;
      w = Math.max(280, w);
      var x0 = 14, x1 = w - 14, y = 62, yA = 108, hh = 150;
      var svg = svgRoot(box, w, hh, 'Energía por operación en escala logarítmica: cerebro ' + sci(eb, 1) + ' julios, ' + rf.s + ' ' + sci(rf.e, 1) + ' julios');
      var sc = logScale(1e-18, 1e-10, x0, x1);
      logAxisX(svg, sc, -18, -10, yA, { every: w < 560 ? 2 : 1 });
      T(svg, x1, hh - 4, 'julios por operación · escala logarítmica', 't8-lbx', { 'text-anchor': 'end' });
      CONV.forEach(function (c) {
        var on = c === cv;
        E(svg, 'circle', { cx: sc(20 / c.v), cy: y, r: on ? 7 : 4, class: on ? 't8-brain' : 't8-brain t8-off' });
      });
      var xb = sc(eb), xr = sc(rf.e);
      marker(svg, xr, y, rf.st, 'nrg', 7);
      var cerca = Math.abs(xb - xr) < 70;
      var anc = function (x) { return x > x1 - 40 ? 'end' : (x < x0 + 30 ? 'start' : 'middle'); };
      T(svg, xb, y + 24, 'cerebro', 't8-lbs', { 'text-anchor': anc(xb) });
      T(svg, xr, y + (cerca ? 38 : 24), rf.s, 't8-lbs', { 'text-anchor': anc(xr) });
      var txt = (r >= 1 ? '×' + nice(r) : '÷' + nice(1 / r)) + ' · ' + fmt(Math.abs(L10(r)), 1) + ' órdenes';
      bracket(svg, xb, xr, y - 26, txt, w);
      M.clear(out);
      out.appendChild(linea('Cerebro: ', ['20 W ÷ ' + pw(Math.round(L10(cv.v))) + ' FLOP/s = ', h('b', null, sci(eb, 1) + ' J'), ' por operación equivalente']));
      out.appendChild(linea(rf.s + ': ', sci(rf.e, 2) + ' J por operación'));
      out.appendChild(linea('Razón de energía por operación: ', [h('b', null, nice(r)), ' (' + rf.s + ' ÷ cerebro)']));
      out.appendChild(linea('Razón de potencias, «la frase de siempre»: ', nice(rf.p) + ' W ÷ 20 W = ' + nice(pr)));
      M.clear(say);
      say.appendChild(m2.marca(ST[rf.st]));
      say.appendChild(document.createTextNode(' '));
      if (r < 1) say.appendChild(h('span', null, 'Con esta convención, el silicio ', h('b', null, 'gasta menos'), ' por operación que el cerebro. '));
      else say.appendChild(document.createTextNode('Con esta convención, el cerebro gasta ' + nice(r) + ' veces menos por operación. '));
      say.appendChild(document.createTextNode('La razón de potencias (' + nice(pr) + ') no cambia con la convención: por eso no mide eficiencia. ' +
        (rf.s === 'H100' ? 'La H100 es un chip aislado en su pico teórico.' : rf.s === 'Hala Point' ? 'Hala Point se midió en una red sintética muy dispersa.' : rf.s === 'KAIROS' ? 'KAIROS es un sistema pequeño, no representativo de un exascala.' : '')));
    }
    var redraw = function () {};
    var c1 = opciones('Convención para el cerebro', CONV, 1, function (x) { cv = x; redraw(); });
    var c2 = opciones('Sistema de referencia', REF, 0, function (x) { rf = x; redraw(); });
    el.appendChild(h('div', { class: 't8-lab' },
      p('Elige una convención para el cerebro y un sistema de referencia. La razón es un cociente bajo supuestos (extrapolado), no una eficiencia medida del cerebro.', { class: 'w-note' }),
      c1, c2, box, out, say));
    redraw = responsive(box, draw);
  };

  /* =====================================================================
     III.2 · Vidas de cómputo (lifecalc) y cuatro ritmos (motors)
     ===================================================================== */
  function vidas(el) {
    var MOD = [
      { l: 'GPT-6 Astra · ~10²⁷ FLOP', v: 1e27, n: 'Estimación de Epoch AI (2026), intervalo de 5 × 10²⁶ a 2 × 10²⁷.' },
      { l: 'Grok 4 · ~5 × 10²⁶', v: 5e26, n: 'Estimación vigente de Epoch AI; el original la califica de especulativa (ver la nota de revisión).' },
      { l: 'GPT-4.5 · ~3,8 × 10²⁶', v: 3.8e26, n: 'Estimación vigente de Epoch AI.' },
      { l: 'Grok-3 · ~3,5 × 10²⁶', v: 3.5e26, n: 'Estimación vigente, revisada desde 4,6 × 10²⁶ en 2025.' }
    ];
    var cv = CONV[1], md = MOD[0];
    var out = h('div', { class: 'm2-out t8-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't8-say', 'aria-live': 'polite' });
    function draw() {
      var life = cv.v * 30 * 3.156e7, n = md.v / life;
      M.clear(out);
      out.appendChild(linea('Una «vida» = ' + pw(Math.round(L10(cv.v))) + ' FLOP/s × 30 años × 3,156 × 10⁷ s = ', sci(life, 2) + ' FLOP'));
      out.appendChild(linea('Vidas en el entrenamiento: ', [sci(md.v, 1) + ' ÷ ' + sci(life, 2) + ' = ', h('b', { class: 'big' }, n >= 10 ? words(Math.round(n)) : fmt(n, n < 1 ? 2 : 1))]));
      M.clear(say);
      say.appendChild(m2.marca('estimado'));
      say.appendChild(document.createTextNode(' ' + md.n + ' La cifra de vidas cambia ' + (cv.v === 1e15 ? '' : 'por completo ') + 'con la convención: con 10¹³, 10¹⁵ y 10¹⁸ FLOP/s, el mismo entrenamiento son ~' +
        words(Math.round(md.v / (1e13 * 9.468e8))) + ', ~' + words(Math.round(md.v / (1e15 * 9.468e8))) + ' y ~' + fmt(md.v / (1e18 * 9.468e8), 1) + ' vidas.'));
    }
    var c1 = opciones('Convención para el cerebro', CONV, 1, function (x) { cv = x; draw(); });
    var c2 = opciones('Entrenamiento', MOD, 0, function (x) { md = x; draw(); });
    el.appendChild(h('div', { class: 't8-lab' },
      h('p', { class: 't8-lab-t' }, h('b', null, '1 · Vidas de cómputo cerebral: '), 'elige una convención y un entrenamiento. Las cifras de entrenamiento son estimaciones de Epoch AI que cita el original.'),
      c1, c2, out, say));
    draw();
  }
  function ritmos(el) {
    var t = 2, comp = 4;
    var box = h('div', { class: 't8-svgbox' });
    var out = h('div', { class: 'm2-out t8-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't8-say', 'aria-live': 'polite' });
    function filas() {
      return [
        { l: 'Cómputo total (FLOP)', d: 'Cómputo total de la mayor corrida (FLOP)', f: comp, c: 'cmp', src: comp === 4 ? '~4× por año, factible hasta 2030 según Sevilla et al. (2024)' : 'tendencia de ~5× por año' },
        { l: 'Potencia de la corrida (W)', d: 'Potencia de la mayor corrida (W)', f: 2.2, c: 'nrg', src: '~2,2× por año observado; más de 100 MW en 2025' },
        { l: 'Algoritmos (cómputo ahorrado)', d: 'Algoritmos: menos cómputo para el mismo desempeño', f: 3, c: 'inf', src: 'mitad cada ~8 meses, cerca de ×3 por año (IC 95 %: 5–14 meses; Ho et al., 2024)' },
        { l: 'Operaciones por julio (GPU)', d: 'Operaciones por julio de las GPU de gama alta', f: 1.4, c: 'cnt', src: '~40 % anual, del 30 al 60 % (You et al., 2025)' }
      ];
    }
    function draw(w) {
      var F = filas();
      w = Math.max(280, w);
      var x0 = 10, x1 = w - 76, rowH = 46, hh = F.length * rowH + 36;
      var svg = svgRoot(box, w, hh, 'Multiplicadores tras ' + fmt(t, 1) + ' años para los cuatro ritmos');
      var maxO = Math.max(1, L10(Math.pow(5, 6)));
      var sc = linScale(0, maxO, x0, x1);
      F.forEach(function (m, i) {
        var y = 8 + i * rowH, f = Math.pow(m.f, t), o = L10(f);
        T(svg, x0, y + 12, m.l, 't8-lbs');
        E(svg, 'rect', { x: x0, y: y + 18, width: Math.max(1.5, sc(o) - x0), height: 14, rx: 3, class: 't8-bar t8-k-' + m.c });
        T(svg, sc(o) + 6, y + 30, '×' + nice(f), 't8-tm');
      });
      for (var o = 0; o <= Math.floor(maxO); o++) {
        E(svg, 'line', { x1: sc(o), x2: sc(o), y1: hh - 26, y2: hh - 20, class: 't8-tk' });
        T(svg, sc(o), hh - 8, pw(o), 't8-tl', { 'text-anchor': 'middle' });
      }
      M.clear(out);
      F.forEach(function (m) { out.appendChild(h('span', { class: 't8-ln' }, h('span', { class: 't8-k' }, m.d + ': '), '×' + nice(Math.pow(m.f, t)) + ' · ', rich(m.src))); });
      M.clear(say);
      say.appendChild(h('span', null, 'Las cuatro barras usan la misma regla de órdenes de magnitud, pero ', h('b', null, 'miden cosas distintas'), ': no se suman ni se comparan directamente. '));
      say.appendChild(document.createTextNode('Ejercicio de esta edición: si el cómputo creciera ×' + comp + ' al año y las operaciones por julio ×1,4, la energía de la corrida crecería en torno a ×' + fmt(comp / 1.4, 1) + ' al año, si todo lo demás se mantuviera igual. Es una cuenta para practicar, no una cifra de las fuentes.'));
    }
    var redraw = function () {};
    var cs = opciones('Ritmo del cómputo total', ['Cómputo ×4 por año', 'Cómputo ×5 por año'], 0, function (x, i) { comp = i ? 5 : 4; redraw(); });
    var r = m2.deslizador({ etiqueta: 'Años transcurridos', min: 0, max: 12, step: 1, valor: 4,
      formato: function (v) { return fmt(v / 2, 1).replace(',0', '') + (v === 2 ? ' año' : ' años'); },
      alCambiar: function (v) { t = v / 2; redraw(); } });
    el.appendChild(h('div', { class: 't8-lab' },
      h('p', { class: 't8-lab-t' }, h('b', null, '2 · Cuatro ritmos: '), 'deja correr el tiempo y compara cuánto se multiplica cada magnitud. Todas las tasas proceden del original y son estimaciones.'),
      cs, r.el,
      p('Este control fija cuántos años dejas correr cada ritmo, suponiendo que se mantuviera constante. Es una extrapolación, no una predicción.', { class: 'w-note-s' }),
      box, out, say));
    redraw = responsive(box, draw);
  }
  W['m2.lifecalc'] = function (el) {
    vidas(el);
    ritmos(el);
  };
  W['m2.motors'] = ritmos;

  /* =====================================================================
     Figura · De la pregunta equivocada a la correcta (tres pasos)
     ===================================================================== */
  W['m2.fig-pregunta'] = function (el) {
    var P_FR = 24.607e6, R_FR = 1.353e18, E_FR = P_FR / R_FR;
    var step = 0, conv = 15;
    var ratioTxt = { 13: '≈ 9', 15: '≈ 900', 18: '≈ 9 × 10⁵' };
    var CAPS = [
      'Frontier consume 1,2 millones de veces la potencia del encéfalo. Pero la potencia solo dice cuánta energía entra por segundo, no cuánto trabajo sale: compara el tamaño de la factura eléctrica, no la eficiencia.',
      'La eficiencia es energía por operación: potencia dividida entre rendimiento. Para Frontier sale ~1,8 × 10⁻¹¹ J, unos 18 picojulios. Para el cerebro falta el denominador, porque no hace operaciones de punto flotante.',
      null
    ];
    var CONV_CAP = {
      13: 'Con 10¹³ FLOP/s, el extremo inferior de las estimaciones, el cerebro gastaría ~2 × 10⁻¹² J por operación: unas 9 veces menos que Frontier.',
      15: 'Con la convención central, 10¹⁵ FLOP/s, el cerebro gastaría ~2 × 10⁻¹⁴ J por operación: unas 900 veces menos que Frontier.',
      18: 'Con 10¹⁸ FLOP/s, el costo de emularlo como red de impulsos, la razón sube a ~9 × 10⁵. Solo bajo esta convención se acerca al millón de la frase de siempre, y por un camino distinto.'
    };
    var NOMBRES = ['Comparar potencias', 'Dividir entre el trabajo', 'Fijar una convención'];
    var pid = uid('panel');
    var host = h('div', { class: 't8-svgbox t8-anim' });
    var cap = h('p', { class: 't8-cap', 'aria-live': 'polite' });
    var tabs = NOMBRES.map(function (n, i) {
      return h('button', { type: 'button', role: 'tab', id: pid + '-t' + i, class: 't8-tab', 'aria-controls': pid, 'aria-selected': String(i === 0), tabindex: i === 0 ? '0' : '-1' }, h('b', null, String(i + 1)), n);
    });
    var lista = h('div', { class: 't8-tabs', role: 'tablist', 'aria-label': 'Pasos' }, tabs);
    var convBox = opciones('Convención para el cerebro', ['10¹³ FLOP/s', '10¹⁵ FLOP/s', '10¹⁸ FLOP/s'], 1, function (x, i) {
      conv = [13, 15, 18][i]; ponerCap(); redraw();
    });
    var next = h('button', { type: 'button', class: 'btn small' }, 'Siguiente →');
    var panel = h('div', { id: pid, role: 'tabpanel', 'aria-labelledby': pid + '-t0', class: 't8-panel' }, host, cap, h('div', { class: 't8-foot' }, convBox, next));

    function render(w) {
      var narrow = w < 560, svg, x0, x1, yA, hh, sc;
      host.classList.remove('t8-go'); void host.offsetWidth; host.classList.add('t8-go');
      if (step === 0) {
        x0 = 14; x1 = w - 14; yA = 118; hh = 196;
        svg = svgRoot(host, w, hh, 'Potencia del encéfalo, 20 vatios, frente a Frontier, 24,6 megavatios, en escala logarítmica: una razón de 1,2 millones');
        sc = logScale(1, 1e8, x0, x1);
        logAxisX(svg, sc, 0, 8, yA + 14, { label: function (e) { return ({ 0: '1 W', 3: '1 kW', 6: '1 MW' })[e] || pw(e); }, every: w < 420 ? 2 : 1 });
        T(svg, x1, hh - 4, 'vatios · escala logarítmica', 't8-lbx', { 'text-anchor': 'end' });
        var xa = sc(20), xb = sc(P_FR);
        marker(svg, xa, yA, 'est', 'nrg', 7); marker(svg, xb, yA, 'med', 'nrg', 7);
        glyph(svg, xa - 6, yA - 24, 'bio', 12); T(svg, xa + 2, yA - 20, 'Encéfalo · 20 W', 't8-lbs');
        glyph(svg, xb - 106, yA - 24, 'sil', 12); T(svg, xb - 98, yA - 20, 'Frontier · 24,6 MW', 't8-lbs');
        bracket(svg, xa, xb, yA - 52, '× 1,2 millones', w);
        var cx = (xa + xb) / 2, stO = E(svg, 'g', { transform: 'rotate(-5 ' + cx + ' ' + (yA - 89) + ')', class: 't8-stamp' });
        var stt = narrow ? 'FACTURA, NO EFICIENCIA' : 'COMPARA FACTURAS, NO EFICIENCIAS', tw = stt.length * (narrow ? 7.6 : 8.6) + 26;
        E(stO, 'rect', { x: cx - tw / 2, y: yA - 104, width: tw, height: 30, rx: 4 });
        T(stO, cx, yA - 84, stt, 't8-stampt', { 'text-anchor': 'middle', style: narrow ? 'font-size:12px' : null });
        tip(svg, xa - 12, yA - 12, 24, 24, ['20 W', 'Encéfalo humano en reposo', 'estimado · Raichle y Gusnard (2002)']);
        tip(svg, xb - 12, yA - 12, 24, 24, ['24,6 MW', 'Frontier durante el HPL', 'medido · TOP500 (2026b)']);
      } else if (step === 1) {
        hh = narrow ? 350 : 214;
        svg = svgRoot(host, w, hh, 'Energía por operación igual a potencia dividida entre rendimiento: Frontier, 1,8 por 10 a la menos 11 julios; el cerebro, sin denominador');
        T(svg, w / 2, 22, 'E = P ÷ R', 't8-f', { 'text-anchor': 'middle' });
        if (w < 470) {
          T(svg, w / 2, 40, 'energía por operación =', 't8-fl', { 'text-anchor': 'middle' });
          T(svg, w / 2, 55, 'potencia ÷ operaciones por segundo', 't8-fl', { 'text-anchor': 'middle' });
        } else T(svg, w / 2, 40, 'energía por operación = potencia ÷ operaciones por segundo', 't8-fl', { 'text-anchor': 'middle' });
        var cols = narrow ? [[w / 2, 74], [w / 2, 206]] : [[w * 0.28, 78], [w * 0.72, 78]];
        [
          { g: 'sil', n: 'Frontier', p: '24,6 MW', r: '1,35 × 10¹⁸ FLOP/s', e: '≈ 1,8 × 10⁻¹¹ J' },
          { g: 'bio', n: 'Encéfalo', p: '20 W', r: '? FLOP/s', e: '?' }
        ].forEach(function (it, i) {
          var c = cols[i][0], y = cols[i][1], g = E(svg, 'g', {});
          glyph(g, c - 34, y + 2, it.g, 12); T(g, c - 26, y + 6, it.n, 't8-lb');
          T(g, c, y + 34, it.p, 't8-f', { 'text-anchor': 'middle' });
          E(g, 'line', { x1: c - 82, x2: c + 82, y1: y + 44, y2: y + 44, class: 't8-tk' });
          T(g, c, y + 64, it.r, it.e === '?' ? 't8-fl' : 't8-f', { 'text-anchor': 'middle' });
          if (it.e === '?') { T(g, c, y + 106, '?', 't8-q', { 'text-anchor': 'middle' }); T(g, c, y + 124, 'no hace operaciones de punto flotante', 't8-lbx', { 'text-anchor': 'middle' }); }
          else { T(g, c, y + 98, '= ' + it.e, 't8-f', { 'text-anchor': 'middle' }); T(g, c, y + 116, 'unos 18 picojulios por operación', 't8-lbx', { 'text-anchor': 'middle' }); }
        });
      } else {
        x0 = 14; x1 = w - 14; yA = 112; hh = 214;
        svg = svgRoot(host, w, hh, 'Energía por operación en julios, escala logarítmica: Frontier frente al cerebro bajo la convención elegida');
        sc = logScale(1e-18, 1e-10, x0, x1);
        logAxisX(svg, sc, -18, -10, yA + 14, { every: narrow ? 2 : 1 });
        [[-18, 'aJ'], [-15, 'fJ'], [-12, 'pJ']].forEach(function (u) { T(svg, sc.e(u[0]), yA + 52, '1 ' + u[1], 't8-lbx', { 'text-anchor': 'middle' }); });
        T(svg, x0, hh - 4, 'julios por operación · escala logarítmica', 't8-lbx');
        [13, 15, 18].forEach(function (c) {
          if (c === conv) return;
          var x = sc(20 / P10(c));
          E(svg, 'circle', { cx: x, cy: yA, r: 4, class: 't8-ghost' });
          T(svg, x, yA - 12, pw(c), 't8-tl t8-off', { 'text-anchor': 'middle' });
        });
        var eB = 20 / P10(conv), xbb = sc(eB), xf = sc(E_FR);
        marker(svg, xf, yA, 'med', 'nrg', 7); marker(svg, xbb, yA, 'extr', 'nrg', 7.5);
        E(svg, 'circle', { cx: xbb, cy: yA, r: 14, class: 't8-halo t8-k-nrg' });
        var fx = Math.min(x1, xf + 12);
        var tF = T(svg, fx, yA + 76, 'Frontier · 1,8 × 10⁻¹¹ J', 't8-lbs', { 'text-anchor': 'end' });
        glyph(svg, fx - largo(tF, 150) - 10, yA + 72, 'sil', 11);
        E(svg, 'line', { x1: xf, x2: xf, y1: yA + 10, y2: yA + 62, class: 't8-conn' });
        var lbR = xbb + 160 > x1;
        glyph(svg, lbR ? xbb - 150 : xbb - 6, yA - 34, 'bio', 11);
        T(svg, lbR ? xbb - 142 : xbb + 2, yA - 30, 'cerebro · 20 W ÷ ' + pw(conv) + ' FLOP/s', 't8-lbs');
        bracket(svg, xbb, xf, yA - 62, ratioTxt[conv] + ' veces · ' + fmt(L10(E_FR / eB), 1) + ' órdenes', w);
        tip(svg, xf - 12, yA - 12, 24, 24, ['≈ 1,8 × 10⁻¹¹ J por operación', 'Frontier, FP64: 24,6 MW ÷ 1,353 × 10¹⁸ FLOP/s', 'medido · TOP500 (2026b)']);
        tip(svg, xbb - 12, yA - 12, 24, 24, ['≈ ' + sci(eB, 0) + ' J por operación', '20 W ÷ ' + pw(conv) + ' FLOP/s', 'extrapolado · cálculo B.6']);
      }
    }
    function ponerCap() {
      M.clear(cap);
      cap.appendChild(rich(step === 2 ? CONV_CAP[conv] + ' [extrapolado]' : CAPS[step]));
    }
    var redraw = function () {};
    function setStep(k, foco) {
      step = Math.max(0, Math.min(2, k));
      tabs.forEach(function (t, i) { var on = i === step; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', tabs[step].id);
      if (foco) tabs[step].focus();
      convBox.hidden = step !== 2;
      next.textContent = step === 2 ? 'Empezar de nuevo ↺' : 'Siguiente →';
      ponerCap();
      redraw();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { setStep(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); setStep((i + 1) % 3, true); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); setStep((i + 2) % 3, true); }
        else if (e.key === 'Home') { e.preventDefault(); setStep(0, true); }
        else if (e.key === 'End') { e.preventDefault(); setStep(2, true); }
      });
    });
    next.addEventListener('click', function () { setStep(step === 2 ? 0 : step + 1); });
    el.appendChild(h('div', { class: 't8-fig t8-wq' }, lista, panel));
    redraw = responsive(host, render);
    setStep(0);
  };

  /* =====================================================================
     Figura · Energía por operación (filas en escala logarítmica)
     ===================================================================== */
  W['m2.fig-epo'] = function (el) {
    var D = [
      { grp: 'Silicio', l: 'Frontier', s: 'FP64 · sistema completo', v: 1.8e-11, st: 'med', g: 'nrg', txt: '≈18 pJ', src: 'TOP500 (2026b), nivel 2' },
      { l: 'El Capitan', s: 'FP64 · sistema completo', v: 1.6e-11, st: 'med', g: 'nrg', txt: '≈16 pJ', src: 'TOP500 (2026c), nivel 2' },
      { l: 'KAIROS', s: 'FP64 · sistema de 46 kW', v: 1.36e-11, st: 'med', g: 'nrg', txt: '≈14 pJ', ref: 'k', src: 'Green500, junio de 2026' },
      { l: 'Operación de punto flotante, 45 nm', s: 'según el tipo y la precisión', a: 4e-13, b: 3.7e-12, v: 1.2e-12, st: 'med', g: 'nrg', txt: '0,4–3,7 pJ', src: 'Horowitz (2014)' },
      { l: 'Acceso a DRAM externa', s: 'mover un dato fuera del chip', v: 1e-9, st: 'med', g: 'nrg', txt: '~10³ pJ', src: 'Horowitz (2014)' },
      { l: 'NVIDIA H100', s: 'FP8 denso · pico teórico del chip', v: 3.5e-13, st: 'decl', g: 'nrg', txt: '≈0,35 pJ', ref: 'h', src: 'NVIDIA (s. f.)' },
      { l: 'Hala Point', s: '8 bits · red sintética dispersa', v: 6.7e-14, st: 'decl', g: 'nrg', txt: '≈67 fJ', src: 'Intel Corporation (2024)' },
      { grp: 'Cerebro, bajo tres convenciones', l: '20 W ÷ 10¹³ FLOP/s', s: 'extremo inferior mecanicista', v: 2e-12, st: 'est', g: 'bio', txt: '≈2 pJ', conv: 13, src: 'Cálculo propio (B.6)' },
      { l: '20 W ÷ 10¹⁵ FLOP/s', s: 'convención central', v: 2e-14, st: 'est', g: 'bio', txt: '≈20 fJ', conv: 15, src: 'Cálculo propio (B.6)' },
      { l: '20 W ÷ 10¹⁸ FLOP/s', s: 'emulación como red de impulsos', v: 2e-17, st: 'est', g: 'bio', txt: '≈0,02 fJ', conv: 18, src: 'Cálculo propio (B.6)' },
      { grp: 'Física', l: 'Límite de Landauer', s: 'borrar un bit a 310 K: k·T·ln 2', v: 2.97e-21, st: null, g: 'ink', txt: '≈3 × 10⁻²¹ J', src: 'Landauer (1961)' }
    ];
    var conv = 15, ref = 'k';
    var PREF = { '-21': 'zJ', '-18': 'aJ', '-15': 'fJ', '-12': 'pJ', '-9': 'nJ' };
    var host = h('div', { class: 't8-svgbox' });
    var out = h('p', { class: 'm2-out t8-out', 'aria-live': 'polite' });
    function rtxt(r) { r *= 1 + 1e-9; return r >= 1e4 ? sci(r, 1) : r >= 100 ? fmt(Math.round(r / 10) * 10) : r >= 10 ? fmt(r, 0) : fmt(r, r < 1 ? 2 : 1); }
    function ordTxt(v) { return fmt(Math.abs(v), Math.abs(v) < 9.95 ? 1 : 0); }
    function render(w) {
      var narrow = w < 640, lw = narrow ? 0 : 236, x0 = narrow ? 10 : lw + 16, x1 = w - (narrow ? 14 : 60);
      var rowH = narrow ? 40 : 27, gH = 22, top = 66, y = top, pos = [];
      D.forEach(function (d) { if (d.grp) y += gH; pos.push(y + rowH / 2); y += rowH; });
      var yAx = y + 8, hh = yAx + 50;
      var svg = svgRoot(host, w, hh, 'Energía por operación en julios, escala logarítmica de 10 elevado a menos 21 a 10 elevado a menos 8');
      var sc = logScale(1e-21, 1e-8, x0, x1);
      logAxisX(svg, sc, -21, -8, yAx, { grid: [top - 10, yAx], bands: [top - 10, yAx], every: narrow ? 3 : 1 });
      for (var e = -21; e <= -9; e += 3) T(svg, sc.e(e), yAx + 33, '1 ' + PREF[e], 't8-lbx', { 'text-anchor': 'middle' });
      T(svg, w - 4, hh - 2, 'julios por operación · escala logarítmica', 't8-lbx', { 'text-anchor': 'end' });
      D.forEach(function (d, i) {
        var yc = pos[i], g = E(svg, 'g', {});
        if (d.grp) T(svg, narrow ? x0 : 4, yc - rowH / 2 - 7, d.grp.toUpperCase(), 't8-grp');
        var on = (d.ref && d.ref === ref) || (d.conv && d.conv === conv);
        if (narrow) T(svg, x0, yc - 9, d.l + ' · ' + d.txt, on ? 't8-lb t8-sm' : 't8-lbs t8-sm');
        else T(svg, lw, yc + 4, d.l, on ? 't8-lb' : 't8-lbs', { 'text-anchor': 'end' });
        var ym = yc + (narrow ? 7 : 0);
        if (d.a) E(g, 'rect', { x: sc(d.a), y: ym - 4, width: sc(d.b) - sc(d.a), height: 8, rx: 4, class: 't8-rng t8-k-nrg' });
        if (d.st) marker(g, sc(d.v), ym, d.st, d.g, on ? 7 : 5.6);
        else {
          E(svg, 'line', { x1: sc(d.v), x2: sc(d.v), y1: top - 10, y2: yAx, class: 't8-ref' });
          E(g, 'circle', { cx: sc(d.v), cy: ym, r: 5, class: 't8-ghost t8-solid' });
        }
        if (on) E(g, 'circle', { cx: sc(d.v), cy: ym, r: 12, class: 't8-halo t8-k-' + d.g });
        if (!narrow) {
          var xt = sc(d.b || d.v) + 11;
          if (xt + d.txt.length * 6.6 > w - 2) T(g, sc(d.a || d.v) - 11, yc + 4, d.txt, 't8-tm', { 'text-anchor': 'end' });
          else T(g, xt, yc + 4, d.txt, 't8-tm');
        }
        tip(svg, 0, yc - rowH / 2, w, rowH, [d.txt + ' por operación', d.l + ' · ' + d.s, (d.st ? ST[d.st] + ' · ' : '') + d.src]);
      });
      var iR = D.findIndex(function (d) { return d.ref === ref; }), iB = D.findIndex(function (d) { return d.conv === conv; });
      var vR = D[iR].v, vB = D[iB].v, ratio = vR / vB, ord = L10(ratio), yB = top - 30;
      bracket(svg, sc(vR), sc(vB), yB, '× ' + rtxt(ratio) + ' · ' + ordTxt(ord) + (Math.abs(ord) < 1.05 && Math.abs(ord) > 0.95 ? ' orden' : ' órdenes'), w);
      E(svg, 'line', { x1: sc(vR), x2: sc(vR), y1: yB + 5, y2: pos[iR] + (narrow ? 7 : 0) - 8, class: 't8-conn' });
      E(svg, 'line', { x1: sc(vB), x2: sc(vB), y1: yB + 5, y2: pos[iB] + (narrow ? 7 : 0) - 8, class: 't8-conn' });
      var nmR = ref === 'k' ? 'KAIROS (FP64, sistema completo)' : 'H100 (FP8, pico del chip)';
      M.clear(out);
      out.appendChild(linea('Razón: ', sci(vR, 2) + ' J ÷ ' + sci(vB, 0) + ' J ≈ ' + rtxt(ratio)));
      out.appendChild(linea('Lectura: ', ratio >= 1
        ? nmR + ' gasta ~' + rtxt(ratio) + ' veces la energía por operación que el cerebro bajo la convención de ' + pw(conv) + ' FLOP/s; en la escala, ' + ordTxt(ord) + ' órdenes de magnitud.'
        : nmR + ' gasta ~' + rtxt(ratio) + ' veces la energía por operación del cerebro bajo la convención de ' + pw(conv) + ' FLOP/s, es decir, menos; en la escala, ' + ordTxt(ord) + ' órdenes por debajo.'));
    }
    var redraw = function () {};
    var c1 = opciones('Convención para el cerebro', ['10¹³ FLOP/s', '10¹⁵ FLOP/s', '10¹⁸ FLOP/s'], 1, function (x, i) { conv = [13, 15, 18][i]; redraw(); });
    var c2 = opciones('Sistema de referencia', ['KAIROS · FP64', 'H100 · FP8'], 0, function (x, i) { ref = i ? 'h' : 'k'; redraw(); });
    el.appendChild(h('div', { class: 't8-fig' }, h('div', { class: 't8-ctrls' }, c1, c2), host, out));
    redraw = responsive(host, render);
  };

  /* =====================================================================
     Figura · Potencia, medida en cerebros (dos escalas, la misma regla)
     ===================================================================== */
  W['m2.fig-pow'] = function (el) {
    var D = [
      { l: 'Encéfalo humano', v: 20, st: 'est', txt: '20 W', src: 'Raichle y Gusnard (2002)' },
      { l: 'NVIDIA H100', v: 700, st: 'decl', txt: '700 W', src: 'NVIDIA (s. f.)' },
      { l: 'Hala Point', v: 2600, st: 'decl', txt: '2,6 kW', src: 'Intel Corporation (2024)' },
      { l: 'KAIROS', v: 46e3, st: 'med', txt: '46 kW', src: 'Green500, junio de 2026' },
      { l: 'Frontier', v: 24.6e6, st: 'med', txt: '24,6 MW', src: 'TOP500 (2026b)' },
      { l: 'LineShine', v: 42.2e6, st: 'med', txt: '42,2 MW', src: 'TOP500 (2026b), nivel 1' },
      { l: 'Colossus 2', v: 946e6, st: 'est', txt: '946 MW', src: 'Epoch AI (2026a), potencia IT' },
      { l: 'Campus de 5 GW', v: 5e9, st: 'proy', txt: '5 GW', src: 'Sevilla et al. (2024), escenario' },
      { l: '93 centros de IA (Epoch AI)', v: 13.8e9, st: 'est', txt: '13,8 GW', src: 'Epoch AI (2026a), potencia IT' },
      { l: 'Mayor corrida de IA, 2030', a: 4e9, b: 16e9, v: 8e9, st: 'proy', txt: '4–16 GW', src: 'Intervalo modelizado por EPRI y Epoch AI (You et al., 2025)' },
      { l: 'Centros de datos del mundo, 2025', v: 485e12 / 8760, st: 'extr', txt: '≈55 GW de media', src: '485 TWh ÷ 8.760 h (IEA, 2026)' }
    ];
    var WL = ['10 W', '100 W', '1 kW', '10 kW', '100 kW', '1 MW', '10 MW', '100 MW', '1 GW', '10 GW', '100 GW'];
    function brainsTxt(d) { return d.a ? words(d.a / 20).replace(' millones', '') + '–' + words(d.b / 20) + ' de cerebros' : cerebros(d.v / 20); }
    var host = h('div', { class: 't8-svgbox' });
    function render(w) {
      /* Ancho: rótulos a la izquierda, como en el original. Estrecho: rótulo encima de cada fila. */
      var narrow = w < 640;
      var lw = narrow ? 0 : 214, x0 = narrow ? 12 : lw + 20, x1 = narrow ? w - 14 : w - 150, rowH = narrow ? 40 : 27, top = narrow ? 86 : 64;
      var yAx = top + D.length * rowH + 8, hh = yAx + 46;
      var svg = svgRoot(host, w, hh, 'Potencia de once sistemas en vatios y en cerebros de 20 W, escala logarítmica');
      var sc = logScale(10, 1e11, x0, x1);
      logAxisX(svg, sc, 1, 11, yAx, { grid: [top - 26, yAx], bands: [top - 26, yAx], every: narrow ? 3 : 1, label: function (e) { return WL[e - 1]; } });
      T(svg, narrow ? w - 4 : x0, hh - 4, 'vatios · escala logarítmica', 't8-lbx', narrow ? { 'text-anchor': 'end' } : null);
      var yT = top - 26;
      E(svg, 'line', { x1: sc(20), x2: sc(20e9), y1: yT, y2: yT, class: 't8-ax' });
      for (var k = 0; k <= 9; k++) {
        var x = sc(20 * P10(k));
        E(svg, 'line', { x1: x, x2: x, y1: yT - 5, y2: yT, class: 't8-tk' });
        if (!narrow || k % 3 === 0) T(svg, x, yT - 9, pw(k), 't8-tl', { 'text-anchor': 'middle' });
        if (k < 9) for (var m = 2; m < 10; m++) { var xm = sc(20 * m * P10(k)); E(svg, 'line', { x1: xm, x2: xm, y1: yT - 2.5, y2: yT, class: 't8-tkm' }); }
      }
      if (narrow) {
        T(svg, x0, yT - 28, 'cerebros (escala superior)', 't8-lbx');
        T(svg, w - 4, yT - 28, '10ᵏ cerebros = 2 × 10ᵏ⁺¹ W', 't8-lbx', { 'text-anchor': 'end' });
      } else {
        T(svg, x0 - 10, yT - 9, 'cerebros', 't8-lbx', { 'text-anchor': 'end' });
        T(svg, w - 10, yT - 9, '10ᵏ cerebros = 2 × 10ᵏ⁺¹ W', 't8-lbx', { 'text-anchor': 'end' });
      }
      var x20 = sc(20);
      E(svg, 'line', { x1: x20, x2: x20, y1: yT, y2: yAx, class: 't8-ref' });
      T(svg, x20 + 6, yT + 15, '1 cerebro = 20 W', 't8-lbx');
      D.forEach(function (d, i) {
        var yc = top + i * rowH + rowH / 2, g = E(svg, 'g', {}), ym = yc;
        if (narrow) { T(svg, x0, yc - 8, d.l + ' · ' + d.txt, 't8-lbs t8-sm'); ym = yc + 8; }
        else T(svg, lw, yc + 4, d.l, 't8-lbs', { 'text-anchor': 'end' });
        if (d.a) E(g, 'rect', { x: sc(d.a), y: ym - 5, width: sc(d.b) - sc(d.a), height: 10, rx: 5, class: 't8-rng t8-k-nrg' });
        marker(g, sc(d.v), ym, d.st, 'nrg', 5.8);
        var lab = narrow ? brainsTxt(d) : d.txt + ' · ' + brainsTxt(d), tl = lab.length * (narrow ? 6.1 : 6.6), xt = sc(d.b || d.v) + 12;
        if (xt + tl > w - 6) T(g, sc(d.a || d.v) - 12, ym + 4, lab, 't8-tm', { 'text-anchor': 'end' });
        else T(g, xt, ym + 4, lab, 't8-tm');
        tip(svg, 0, yc - rowH / 2, w, rowH, [d.txt, d.l + ' · ' + brainsTxt(d) + ' de 20 W', ST[d.st] + ' · ' + d.src]);
      });
    }
    el.appendChild(h('div', { class: 't8-fig' }, h('div', { class: 'scroll-x t8-scroll' }, host)));
    responsive(host, render);
  };

  /* =====================================================================
     Figura · Del cómputo de una vida a la cota de 2030
     ===================================================================== */
  W['m2.fig-aic'] = function (el) {
    var rate = 4, base = 'astra';
    var BASE = {
      astra: { y: 2026.67, v: 1e27, l: 'GPT-6 Astra (~10²⁷ FLOP, septiembre de 2026)', n: 'GPT-6 Astra', marks: [[3.5, 'comienzos de 2030'], [4.3, 'finales de 2030']] },
      grok: { y: 2025.13, v: 4.6e26, l: 'la estimación de 2025 para Grok-3 (~4,6 × 10²⁶ FLOP)', n: 'Grok-3 (estimación de 2025)', marks: [[5, 'comienzos de 2030']] }
    };
    var MD = [
      { n: 'GPT-4', y: 2023.2, v: 2.1e25, st: 'est', s: 'Estimación de Epoch AI' },
      { n: 'Grok-3', y: 2025.13, v: 3.5e26, st: 'est', s: 'Estimación vigente; en 2025 se estimó en 4,6 × 10²⁶' },
      { n: 'GPT-4.5', y: 2025.16, v: 3.8e26, st: 'est', s: 'Estimación vigente de Epoch AI' },
      { n: 'Grok-4', y: 2025.53, v: 5e26, st: 'est', s: 'Estimación especulativa' },
      { n: 'GPT-6 Astra', y: 2026.67, v: 1e27, st: 'est', lo: 5e26, hi: 2e27, s: 'Intervalo de 5 × 10²⁶ a 2 × 10²⁷' }
    ];
    var host = h('div', { class: 't8-svgbox' });
    var out = h('p', { class: 'm2-out t8-out', 'aria-live': 'polite' });
    var hid = uid('hatch');
    function render(w) {
      var narrow = w < 640, x0 = narrow ? 40 : 52, x1 = w - (narrow ? 12 : 20), top = 22, ph = narrow ? 340 : 420, yB = top + ph, hh = yB + 44;
      var svg = svgRoot(host, w, hh, 'Cómputo de entrenamiento de IA en FLOP, escala logarítmica, de 2022 a 2036, con referencias y extrapolaciones');
      var sx = linScale(2022.5, 2036.8, x0, x1), sy = logScale(1e23, 1e33, yB, top);
      var hp = hatch(svg, hid);
      E(svg, 'rect', { x: x0, y: sy(1e32), width: x1 - x0, height: sy(3e30) - sy(1e32), fill: hp, class: 't8-wall' });
      E(svg, 'line', { x1: x0, x2: x1, y1: sy(3e30), y2: sy(3e30), class: 't8-gl t8-strong' });
      T(svg, x0 + 8, sy(1e32) + 15, narrow ? 'muro de latencia' : 'muro de latencia: 3 × 10³⁰–10³² FLOP (Sevilla et al., 2024)', 't8-lbx');
      logAxisY(svg, sy, 23, 33, x0, { grid: [x0, x1], every: narrow ? 2 : 1 });
      E(svg, 'line', { x1: x0, x2: x1, y1: yB, y2: yB, class: 't8-ax' });
      for (var yr = 2023; yr <= 2036; yr++) {
        var xx = sx(yr);
        E(svg, 'line', { x1: xx, x2: xx, y1: yB, y2: yB + (yr % 2 === 0 ? 6 : 3), class: 't8-tk' });
        if (yr % 2 === 0 && (!narrow || yr % 4 === 0)) T(svg, xx, yB + 19, String(yr), 't8-tl', { 'text-anchor': 'middle' });
      }
      T(svg, x0, hh - 4, 'FLOP de entrenamiento · escala logarítmica', 't8-lbx');
      /* cómputo de una vida */
      var yLife = sy(9.5e23);
      E(svg, 'line', { x1: x0, x2: x1, y1: yLife, y2: yLife, class: 't8-life' });
      T(svg, x1 - 4, yLife - 7, narrow ? 'cómputo de una vida ≈ 9,5 × 10²³' : '«cómputo de una vida»: 30 años a 10¹⁵ FLOP/s ≈ 9,5 × 10²³', 't8-lbx', { 'text-anchor': 'end' });
      tip(svg, x0, yLife - 6, x1 - x0, 12, ['~9,5 × 10²³ FLOP', '«Cómputo de una vida»: 30 años a 10¹⁵ FLOP/s', 'extrapolado']);
      /* abanico 2036 */
      E(svg, 'path', { d: 'M' + sx(2030) + ',' + sy(2e29) + 'L' + sx(2036) + ',' + sy(1.5e32) + 'L' + sx(2036) + ',' + sy(2.3e30) + 'Z', class: 't8-fan' });
      E(svg, 'line', { x1: sx(2036), x2: sx(2036), y1: sy(1.5e32), y2: sy(2.3e30), class: 't8-fanl' });
      T(svg, sx(2036) - 8, sy(2.3e30) + 18, narrow ? '2036' : '2036 a 1,5–3× por año: 2 × 10³⁰–1,5 × 10³²', 't8-lbx', { 'text-anchor': 'end' });
      tip(svg, sx(2036) - 8, sy(1.5e32), 16, sy(2.3e30) - sy(1.5e32), ['~2 × 10³⁰–1,5 × 10³² FLOP', 'Mayor corrida de 2036 a 1,5–3× por año desde 2030', 'extrapolado']);
      /* barras de 2030: campus y red distribuida */
      [[2029.72, 1e28, 3e29, 'campus de 1–5 GW'], [2030.28, 2e28, 2e30, 'red de 2–45 GW']].forEach(function (b) {
        E(svg, 'rect', { x: sx(b[0]) - 4, y: sy(b[2]), width: 8, height: sy(b[1]) - sy(b[2]), rx: 4, class: 't8-rng t8-k-cmp' });
        tip(svg, sx(b[0]) - 8, sy(b[2]), 16, sy(b[1]) - sy(b[2]), [sci(b[1], 0) + '–' + sci(b[2], 0) + ' FLOP', 'Corridas factibles hacia 2030 · ' + b[3], 'Sevilla et al. (2024) · proyectado']);
      });
      if (!narrow) {
        T(svg, sx(2030) + 14, sy(1e28) + 40, '2030: campus de 1–5 GW', 't8-lbx', { 'text-anchor': 'middle' });
        T(svg, sx(2030) + 14, sy(1e28) + 53, 'y red distribuida de 2–45 GW', 't8-lbx', { 'text-anchor': 'middle' });
      }
      /* cota de factibilidad */
      var xF = sx(2030), yF = sy(2e29);
      marker(svg, xF, yF, 'proy', 'cmp', 8);
      T(svg, xF - 12, yF - 10, narrow ? '~2 × 10²⁹' : 'cota de factibilidad ~2 × 10²⁹', 't8-lbs', { 'text-anchor': 'end' });
      tip(svg, xF - 10, yF - 10, 20, 20, ['~2 × 10²⁹ FLOP en 2030', 'Corridas probablemente factibles, unas 10.000 veces GPT-4', 'Sevilla et al. (2024) · proyectado']);
      /* tendencia observada con las estimaciones vigentes */
      E(svg, 'line', { x1: sx(2025.145), x2: sx(2026.67), y1: sy(3.65e26), y2: sy(1e27), class: 't8-obs' });
      if (!narrow) T(svg, sx(2025.55), sy(3.65e26) + 26, 'observado: ~1,9–2× por año', 't8-lbx');
      /* tu extrapolación: escalera de un año por peldaño */
      var B = BASE[base], lr = L10(rate), yEnd = 2031.2;
      var f = function (y) { return B.v * Math.pow(rate, y - B.y); };
      var st = '';
      for (var k = 0; B.y + k < yEnd; k++) { var ya = B.y + k, yb = Math.min(B.y + k + 1, yEnd); st += (k ? 'L' : 'M') + sx(ya) + ',' + sy(f(ya)) + 'H' + sx(yb) + 'V' + sy(f(yb)); }
      E(svg, 'path', { d: st, class: 't8-stairs' });
      E(svg, 'line', { x1: sx(B.y), x2: sx(yEnd), y1: sy(B.v), y2: sy(f(yEnd)), class: 't8-user' });
      var k1y = B.y + 1;
      if (!narrow) T(svg, sx(k1y) + 6, (sy(f(k1y)) + sy(f(k1y - 1))) / 2 + 4, '+' + fmt(lr, 1) + ' por año', 't8-tl');
      B.marks.forEach(function (mk) {
        var yy = B.y + mk[0];
        E(svg, 'circle', { cx: sx(yy), cy: sy(f(yy)), r: 5, class: 't8-ghost t8-solid' });
        tip(svg, sx(yy) - 9, sy(f(yy)) - 9, 18, 18, ['~' + sci(f(yy), 1) + ' FLOP', 'A ' + rate + '× por año, ' + mk[1], 'Extrapolado desde ' + (base === 'astra' ? 'GPT-6 Astra' : 'Grok-3 (estimación de 2025)')]);
      });
      /* modelos */
      var yG3 = sy(3.5e26), yG3o = sy(4.6e26);
      E(svg, 'line', { x1: sx(2025.13), x2: sx(2025.13), y1: yG3o + 4, y2: yG3 - 4, class: 't8-conn' });
      E(svg, 'circle', { cx: sx(2025.13), cy: yG3o, r: 4.2, class: 't8-hollow t8-k-cmp' });
      tip(svg, sx(2025.13) - 8, yG3o - 8, 16, 12, ['~4,6 × 10²⁶ FLOP', 'Grok-3 · estimación publicada en 2025', 'Epoch AI (2025b)']);
      MD.forEach(function (d) {
        var x = sx(d.y), y = sy(d.v);
        if (d.lo) E(svg, 'line', { x1: x, x2: x, y1: sy(d.hi), y2: sy(d.lo), class: 't8-iv' });
        var m = marker(svg, x, y, d.st, 'cmp', 5.4);
        if (d.n === 'Grok-4') m.classList.add('t8-spec');
        var lab = d.n === 'GPT-4' ? ['GPT-4', 8, 4, 'start'] : d.n === 'GPT-6 Astra' ? [narrow ? 'Astra' : 'GPT-6 Astra', 8, 18, 'start'] : d.n === 'Grok-4' ? (narrow ? null : ['Grok-4', 0, -12, 'middle']) : d.n === 'GPT-4.5' ? (narrow ? null : ['GPT-4.5 · Grok-3', -14, 4, 'end']) : null;
        if (lab) T(svg, x + lab[1], y + lab[2], lab[0], 't8-lbx', { 'text-anchor': lab[3] });
        tip(svg, x - 9, y - 9, 18, 18, ['~' + sci(d.v, 1) + ' FLOP', d.n + ' · ' + d.s, 'Epoch AI · estimado']);
      });
      M.clear(out);
      out.appendChild(h('span', { class: 't8-ln' }, h('span', { class: 't8-k' }, 'Desde ' + B.l + ' a ' + rate + '× por año: '),
        rich(B.marks.map(function (mk) { return '~' + sci(f(B.y + mk[0]), 1) + ' FLOP a ' + mk[1]; }).join(' y ') + ' [extrapolado].')));
      out.appendChild(h('span', { class: 't8-ln' }, h('span', { class: 't8-k' }, 'En la escala: '),
        rich('cada año suma log₁₀ ' + rate + ' ≈ ' + fmt(lr, 2) + ' órdenes de magnitud. La cota prudente de factibilidad para 2030 es ~2 × 10²⁹ FLOP [proyectado].')));
    }
    var redraw = function () {};
    var c1 = opciones('Tasa', ['4× por año', '5× por año'], 0, function (x, i) { rate = i ? 5 : 4; redraw(); });
    var c2 = opciones('Punto de partida', ['GPT-6 Astra · 2026', 'Grok-3 · 2025'], 0, function (x, i) { base = i ? 'grok' : 'astra'; redraw(); });
    var ley = h('ul', { class: 't8-ley', 'aria-label': 'Leyenda' },
      h('li', null, h('i', { class: 't8-sw t8-sw-mod' }), 'modelos (estimados)'),
      h('li', null, h('i', { class: 't8-sw t8-sw-life' }), 'cómputo de una vida'),
      h('li', null, h('i', { class: 't8-sw t8-sw-obs' }), 'crecimiento observado'),
      h('li', null, h('i', { class: 't8-sw t8-sw-user' }), 'tu extrapolación'),
      h('li', null, h('i', { class: 't8-sw t8-sw-wall' }), 'muro de latencia'));
    el.appendChild(h('div', { class: 't8-fig' }, h('div', { class: 't8-ctrls' }, c1, c2), host, ley, out));
    redraw = responsive(host, render);
  };

  /* =====================================================================
     Figura · Potencia de la mayor corrida: dos referencias, sin línea entre ellas
     ===================================================================== */
  W['m2.fig-aipw'] = function (el) {
    var host = h('div', { class: 't8-svgbox t8-narrowfig' });
    function render(w) {
      var x0 = 52, x1 = w - 10, top = 14, ph = 170, yB = top + ph, hh = yB + 40;
      var svg = svgRoot(host, w, hh, 'Potencia de la mayor corrida de entrenamiento: más de 100 MW en 2025 y de 4 a 16 GW en 2030 según los escenarios de EPRI y Epoch AI');
      var sx = linScale(2024.4, 2030.9, x0, x1), sy = logScale(1e7, 1e11, yB, top);
      logAxisY(svg, sy, 7, 11, x0, { grid: [x0, x1], label: function (e) { return ['10 MW', '100 MW', '1 GW', '10 GW', '100 GW'][e - 7]; } });
      E(svg, 'line', { x1: x0, x2: x1, y1: yB, y2: yB, class: 't8-ax' });
      [2025, 2030].forEach(function (yr) { E(svg, 'line', { x1: sx(yr), x2: sx(yr), y1: yB, y2: yB + 5, class: 't8-tk' }); T(svg, sx(yr), yB + 18, String(yr), 't8-tl', { 'text-anchor': 'middle' }); });
      var xa = sx(2025), ya = sy(1e8);
      marker(svg, xa, ya, 'est', 'nrg', 6);
      E(svg, 'path', { d: 'M' + xa + ',' + (ya - 9) + 'V' + (ya - 22) + 'm-4,5l4,-5l4,5', class: 't8-jump' });
      T(svg, xa + 10, ya + 4, '>100 MW', 't8-tm');
      tip(svg, xa - 10, ya - 24, 20, 34, ['>100 MW', 'Mayor corrida de entrenamiento, 2025', 'You et al. (2025) · estimado']);
      var xb = sx(2030);
      E(svg, 'rect', { x: xb - 5, y: sy(16e9), width: 10, height: sy(4e9) - sy(16e9), rx: 5, class: 't8-rng t8-k-nrg t8-proy' });
      T(svg, xb - 10, sy(8e9) - 2, '4–16 GW', 't8-tm', { 'text-anchor': 'end' });
      T(svg, xb - 10, sy(8e9) + 12, 'intervalo modelizado', 't8-lbx', { 'text-anchor': 'end' });
      T(svg, xb - 10, sy(8e9) + 25, '200–800 millones de cerebros', 't8-lbx', { 'text-anchor': 'end' });
      tip(svg, xb - 10, sy(16e9), 20, sy(4e9) - sy(16e9), ['4–16 GW en 2030', 'Escenarios de EPRI y Epoch AI (You et al., 2025)', 'No resulta de aplicar una tasa fija a 100 MW · proyectado']);
    }
    el.appendChild(h('div', { class: 't8-fig' }, host,
      h('p', { class: 't8-ley-l' }, m2.marca('estimado'), ' más de 100 MW en 2025 · ', m2.marca('proyectado'), ' 4–16 GW en 2030')));
    responsive(host, render);
  };

  /* =====================================================================
     Figuras de cifra grande: algoritmos más eficientes y datos de entrenamiento
     ===================================================================== */
  function cifra(el, dim, dimTxt, grande, pie) {
    el.appendChild(h('div', { class: 't8-stat' },
      h('span', { class: 'dimchip d-' + dim }, dimTxt),
      h('div', { class: 't8-big' }, grande),
      h('div', { class: 't8-big-s' }, pie)));
  }
  W['m2.fig-algo'] = function (el) { cifra(el, 'cmp', 'FLOP', '×3', 'por año'); };
  W['m2.fig-tokens'] = function (el) { cifra(el, 'inf', 'Tokens', '10⁴–10⁵', 'veces el lenguaje de un niño'); };
})();
