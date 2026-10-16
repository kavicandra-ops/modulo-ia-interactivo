/* Laboratorios del Taller 1 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>'].
   Actividades de la caja de herramientas (F1–F6), portadas de la edición didáctica con los mismos
   datos, instrucciones y textos de retroalimentación:
   units20 (¿cuánto es 20?), powers (explorador de potencias de diez), sci (traductor de notación
   científica), scales (escala larga y escala corta), addmul (sumar 10 o multiplicar por 10) y
   linlog (saltos en escala lineal y logarítmica). */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =================== Números en español (como en el guion original) =================== */
  function fmt(v, d) {
    var s = Math.abs(v).toFixed(d || 0).split('.');
    var i = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (v < 0 ? '−' : '') + i + (s[1] ? ',' + s[1] : '');
  }
  var pE = function (e) { return m2.pw(e); };
  /* 2.198e18 → «2,2 × 10¹⁸»; keepOne conserva «1 × 10ⁿ» */
  function sciO(v, d, keepOne) {
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
    var ms = Math.abs(v / Math.pow(10, e)).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; ms = Math.abs(v / Math.pow(10, e)).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ',');
    if (mant === '1' && !keepOne) return (v < 0 ? '−' : '') + pE(e);
    return (v < 0 ? '−' : '') + mant + ' × ' + pE(e);
  }
  /* número con 2–3 cifras significativas, en notación normal si cabe */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sciO(v, a >= 1e6 ? 2 : 1, true).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Cantidad con prefijo del SI: 2e-14 J → «20 fJ» */
  function siUnit(v, unit) {
    var P = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f'], [1e-18, 'a'], [1e-21, 'z']];
    for (var i = 0; i < P.length; i++) {
      if (v >= P[i][0] * 0.9995) { var m = v / P[i][0]; return fmt(m, m < 10 && Math.abs(m - Math.round(m)) > 0.05 ? 1 : 0) + ' ' + P[i][1] + unit; }
    }
    return sciO(v, 1) + ' ' + unit;
  }
  /* Escritura exacta de m × 10^e a partir de la mantisa como texto («2.198») */
  function digitsOf(mStr, e) {
    var sp = String(mStr).split('.'), a = sp[0], b = sp[1] || '';
    var digits = a + b, point = a.length + e;
    if (point <= 0) { digits = '0'.repeat(1 - point) + digits; point = 1; }
    if (point >= digits.length) digits = digits + '0'.repeat(point - digits.length);
    var ip = digits.slice(0, point).replace(/^0+(?=\d)/, ''), fp = digits.slice(point).replace(/0+$/, '');
    ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (fp) fp = fp.replace(/(\d{3})(?=\d)/g, '$1 ');
    return ip + (fp ? ',' + fp : '');
  }

  /* =================== Nombres de las potencias de diez =================== */
  var ES_POS = ['uno', 'diez', 'cien', 'mil', 'diez mil', 'cien mil', 'un millón', 'diez millones', 'cien millones', 'mil millones', 'diez mil millones', 'cien mil millones', 'un billón', 'diez billones', 'cien billones', 'mil billones', 'diez mil billones', 'cien mil billones', 'un trillón', 'diez trillones', 'cien trillones', 'mil trillones', 'diez mil trillones', 'cien mil trillones', 'un cuatrillón', 'diez cuatrillones', 'cien cuatrillones', 'mil cuatrillones', 'diez mil cuatrillones', 'cien mil cuatrillones', 'un quintillón'];
  var ES_NEG = ['', 'una décima', 'una centésima', 'una milésima', 'una diezmilésima', 'una cienmilésima', 'una millonésima', 'una diezmillonésima', 'una cienmillonésima', 'una milmillonésima', 'una diezmilmillonésima', 'una cienmilmillonésima', 'una billonésima', 'una diezbillonésima', 'una cienbillonésima', 'una milbillonésima', 'una diezmilbillonésima', 'una cienmilbillonésima', 'una trillonésima', 'una dieztrillonésima', 'una cientrillonésima', 'una miltrillonésima'];
  var EN_BIG = { 3: 'thousand', 6: 'million', 9: 'billion', 12: 'trillion', 15: 'quadrillion', 18: 'quintillion', 21: 'sextillion', 24: 'septillion', 27: 'octillion', 30: 'nonillion' };
  function enName(e) {
    var b, r;
    if (e < 0) {
      var k = -e;
      if (k === 1) return 'one tenth';
      if (k === 2) return 'one hundredth';
      b = Math.floor(k / 3) * 3; r = k - b;
      return 'one ' + (r === 0 ? '' : r === 1 ? 'ten-' : 'hundred-') + (b === 3 ? 'thousandth' : EN_BIG[b] + 'th');
    }
    if (e === 0) return 'one';
    if (e === 1) return 'ten';
    if (e === 2) return 'one hundred';
    b = Math.floor(e / 3) * 3; r = e - b;
    return (r === 0 ? 'one ' : r === 1 ? 'ten ' : 'one hundred ') + EN_BIG[b];
  }
  /* m × 10^e en palabras (escala larga), sin redondear: «13.800 millones» */
  function esWords(mStr, e) {
    var U = [[30, 'quintillón', 'quintillones'], [24, 'cuatrillón', 'cuatrillones'], [18, 'trillón', 'trillones'], [12, 'billón', 'billones'], [6, 'millón', 'millones']];
    for (var i = 0; i < U.length; i++) {
      if (e >= U[i][0]) { var d = digitsOf(mStr, e - U[i][0]); return d === '1' ? 'un ' + U[i][1] : d + ' ' + U[i][2]; }
    }
    return digitsOf(mStr, e);
  }
  function enWords(mStr, e) {
    var b = e >= 3 ? Math.floor(e / 3) * 3 : 0;
    var d = digitsOf(mStr, e - b).replace(/\./g, ' ').replace(',', '.').replace(/ /g, ',');
    return d + (b ? ' ' + EN_BIG[b] : '');
  }
  var PREF = { 30: 'quetta (Q)', 27: 'ronna (R)', 24: 'yotta (Y)', 21: 'zetta (Z)', 18: 'exa (E)', 15: 'peta (P)', 12: 'tera (T)', 9: 'giga (G)', 6: 'mega (M)', 3: 'kilo (k)', 2: 'hecto (h)', 1: 'deca (da)', '-1': 'deci (d)', '-2': 'centi (c)', '-3': 'mili (m)', '-6': 'micro (µ)', '-9': 'nano (n)', '-12': 'pico (p)', '-15': 'femto (f)', '-18': 'atto (a)', '-21': 'zepto (z)' };
  /* Dónde aparece cada orden de magnitud en el recorrido (cifras del documento original) */
  var SEEN = {
    '-21': ['≈ 3 × 10⁻²¹ J: límite de Landauer para borrar un bit a temperatura corporal'],
    '-17': ['≈ 2 × 10⁻¹⁷ J por operación del cerebro con la convención de 10¹⁸ FLOP/s [extrapolado]'],
    '-14': ['≈ 2 × 10⁻¹⁴ J por operación del cerebro con la convención central [extrapolado]', '≈ 6,7 × 10⁻¹⁴ J por operación de Hala Point [declarado]'],
    '-13': ['≈ 3,5 × 10⁻¹³ J por operación de una H100 en FP8, pico del chip [declarado]'],
    '-12': ['0,4–3,7 pJ por operación de punto flotante en tecnología de 45 nm [medido]', '≈ 2 × 10⁻¹² J por operación del cerebro con 10¹³ FLOP/s [extrapolado]'],
    '-11': ['≈ 1,8 × 10⁻¹¹ J por operación de Frontier [medido]', '≈ 1,4 × 10⁻¹¹ J por operación de KAIROS [medido]'],
    '-10': ['≈ 2,3 × 10⁻¹⁰ W: potencia media de una neurona [extrapolado]'],
    '-9': ['~10⁻⁹ J (10³ pJ) por acceso a la memoria DRAM externa [medido]'],
    '-8': ['tamaño de un transistor: ~10⁻⁸ m'],
    '-6': ['tamaño de una sinapsis: ~10⁻⁶ m'],
    '-3': ['tamaño de una neurona o de un microcircuito: ~10⁻³ m'],
    '-1': ['0,1–1 Hz: tasa media de disparo que adoptan los modelos [estimado]', '0,16 Hz: media cortical que permite el presupuesto energético [estimado]'],
    '0': ['1 bit: una respuesta de sí o no'],
    '1': ['~20 W: potencia del encéfalo en reposo [estimado]', '~10 bits/s: conducta deliberada [estimado]'],
    '2': ['98 cúbits de Helios [medido]', '302 neuronas de C. elegans [medido]', '453 Hz: máximo instantáneo medio de interneuronas rápidas, ex vivo [medido]', '700 W de una H100 [declarado]'],
    '3': ['2,6 kW de Hala Point [declarado]', '7.000: cifra popular de sinapsis por neurona neocortical'],
    '4': ['5,7 × 10⁴ células en 1 mm³ de corteza [medido]', '46 kW de KAIROS [medido]'],
    '5': ['~175.000 sinapsis de una célula de Purkinje de rata [medido]', '139.255 neuronas del encéfalo de la mosca [medido]'],
    '6': ['1,1 × 10⁶ equivalentes H100 en Colossus 2 [estimado]'],
    '7': ['24,6 MW de Frontier y 42,2 MW de LineShine [medido]'],
    '8': ['1,5 × 10⁸ sinapsis en 1 mm³ de corteza [medido]', '>10⁸ W (100 MW): la mayor corrida de entrenamiento de 2025 [estimado]', '10⁸ puertas lógicas cuánticas previstas para 2029 [proyectado]'],
    '9': ['~10⁹ bits/s de entrada sensorial [estimado]', '946 MW de Colossus 2 [estimado]', '1,15 × 10⁹ neuronas de silicio de Hala Point [declarado]'],
    '10': ['8,6 × 10¹⁰ neuronas del encéfalo [estimado]', '1,38 × 10¹⁰ W (13,8 GW) de 93 campus de IA [estimado]'],
    '11': ['1,28 × 10¹¹ sinapsis de Hala Point [declarado]'],
    '13': ['10¹³ FLOP/s: extremo inferior del cómputo cerebral [estimado]', '3,6 × 10¹³ tokens de entrenamiento de Qwen3 [declarado]'],
    '14': ['10¹⁴–10¹⁵ sinapsis del encéfalo [estimado]'],
    '15': ['~10¹⁵ FLOP/s: estimación central del cómputo cerebral [estimado]', '1,4 × 10¹⁵ bytes (1,4 PB) de imágenes de 1 mm³ [medido]', '2 × 10¹⁵ FLOP/s de una H100 en FP8 [declarado]'],
    '17': ['10¹⁷ FLOP/s: techo del intervalo de Carlsmith [estimado]'],
    '18': ['2,198 × 10¹⁸ FLOP/s de LineShine en FP64 [medido]'],
    '19': ['1,7 × 10¹⁹ FLOP/s de El Capitan en precisión mixta [medido]'],
    '20': ['6 × 10²⁰ FLOP/s de FugakuNEXT en FP8 con dispersión [proyectado]'],
    '21': ['≈ 6,7 × 10²¹ borrados de bit por segundo: cota de Landauer con 20 W [extrapolado]'],
    '23': ['≈ 9,5 × 10²³ FLOP: el «cómputo de una vida» [extrapolado]'],
    '25': ['≈ 2,1 × 10²⁵ FLOP: entrenamiento de GPT-4 [estimado]'],
    '26': ['3,5–5 × 10²⁶ FLOP: Grok-3, GPT-4.5 y Grok-4 [estimado]'],
    '27': ['~10²⁷ FLOP: la mayor corrida estimada de 2026 [estimado]'],
    '29': ['~2 × 10²⁹ FLOP: cota de factibilidad para 2030 [proyectado]']
  };

  /* =================== Piezas de interfaz =================== */
  var nR = 0;
  /* Deslizador con etiqueta, lectura y ayuda; set() no dispara on() (para los preajustes) */
  function rango(o) {
    var id = 't1-r-' + (++nR);
    var out = h('output', { for: id, class: 'desl-v' });
    var inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    var fila = h('div', { class: 'desl t1-desl' }, h('label', { for: id }, o.label), inp, out);
    function upd() { out.textContent = o.fmt ? o.fmt(+inp.value) : inp.value; inp.setAttribute('aria-valuetext', out.textContent); }
    inp.addEventListener('input', function () { upd(); if (o.on) o.on(+inp.value); });
    upd();
    var wrap = h('div', { class: 't1-ctrl' }, fila, o.help ? p(o.help, { class: 't1-help' }) : null);
    return { wrap: wrap, inp: inp, set: function (v) { inp.value = v; upd(); } };
  }
  /* Fichas pulsables (una elegida a la vez) */
  function chips(items, on, o) {
    o = o || {};
    var g = h('div', { class: 'chips t1-chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === o.sel) }, it.l);
      b.addEventListener('click', function () {
        bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        on(it, i);
      });
      g.appendChild(b);
      return b;
    });
    g.limpiar = function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); };
    return g;
  }
  /* Selector de dos o más modos */
  function seg(items, on, sel, label) {
    var g = h('div', { class: 't1-seg', role: 'group', 'aria-label': label || 'Opciones' });
    var bs = items.map(function (t, i) {
      var b = h('button', { type: 'button', 'aria-pressed': String(i === sel) }, t);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(i); });
      g.appendChild(b);
      return b;
    });
    return g;
  }
  function decir(nodo, texto) { M.clear(nodo); nodo.appendChild(rich(texto)); }

  /* =================== SVG =================== */
  function S(tag, attrs, parent) { var e = M.s(tag, attrs); if (parent) parent.appendChild(e); return e; }
  function T(parent, x, y, text, cls, extra) {
    var a = { x: x, y: y, class: cls };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    var t = S('text', a, parent);
    t.textContent = text;
    return t;
  }
  function svgRoot(host, w, hh, label) {
    M.clear(host);
    return S('svg', { viewBox: '0 0 ' + w + ' ' + hh, width: w, height: hh, role: 'img', 'aria-label': label || '', class: 't1-svg' }, host);
  }
  function logScale(d0, d1, r0, r1) {
    var l0 = Math.log10(d0), l1 = Math.log10(d1);
    var f = function (v) { return r0 + (Math.log10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    return f;
  }
  function linScale(d0, d1, r0, r1) { return function (v) { return r0 + (v - d0) / (d1 - d0) * (r1 - r0); }; }
  /* Eje logarítmico horizontal con marcas menores 2–9 (la huella visual del logaritmo) */
  function logAxisX(g, sc, e0, e1, y, o) {
    o = o || {};
    var step = o.every || 1, lab = o.label || pE, tick = 6;
    S('line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't1-ax' }, g);
    for (var e = e0; e <= e1; e++) {
      var x = sc.e(e);
      S('line', { x1: x, x2: x, y1: y, y2: y + tick, class: 't1-tk' }, g);
      if ((e - e0) % step === 0) T(g, x, y + tick + 13, lab(e), 't1-tl', { 'text-anchor': e === e0 ? 'start' : e === e1 ? 'end' : 'middle' });
      if (e < e1) for (var m = 2; m < 10; m++) { var xm = sc(m * Math.pow(10, e)); S('line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? tick * 0.7 : tick * 0.45), class: 't1-tkm' }, g); }
    }
  }
  function logAxisY(g, sc, e0, e1, x, o) {
    o = o || {};
    var step = o.every || 1;
    if (o.grid) for (var eg = e0; eg <= e1; eg++) S('line', { y1: sc.e(eg), y2: sc.e(eg), x1: o.grid[0], x2: o.grid[1], class: 't1-gl' }, g);
    S('line', { y1: sc.e(e0), y2: sc.e(e1), x1: x, x2: x, class: 't1-ax' }, g);
    for (var e = e0; e <= e1; e++) {
      var y = sc.e(e);
      S('line', { y1: y, y2: y, x1: x - 5, x2: x, class: 't1-tk' }, g);
      if ((e - e0) % step === 0) T(g, x - 9, y + 4, pE(e), 't1-tl', { 'text-anchor': 'end' });
      if (e < e1) for (var m = 2; m < 10; m++) { var ym = sc(m * Math.pow(10, e)); S('line', { y1: ym, y2: ym, x1: x - (m === 5 ? 3.5 : 2.2), x2: x, class: 't1-tkm' }, g); }
    }
  }
  /* Ancho real del contenedor; antes de entrar en la página se dibuja a 560 px */
  function ancho(box) { var w = Math.round(box.clientWidth); return w >= 120 ? Math.max(240, w) : 560; }
  /* Redibuja cuando cambia el ancho; deja de observar cuando la actividad sale de la página */
  function seguirAncho(box, draw) {
    if (!('ResizeObserver' in window)) { window.addEventListener('resize', function () { if (box.isConnected) draw(); }); return; }
    var ultimo = 0, conectado = false;
    var ro = new ResizeObserver(function () {
      if (!box.isConnected) { if (conectado) ro.disconnect(); return; }
      conectado = true;
      var w = Math.round(box.clientWidth);
      if (w >= 120 && Math.abs(w - ultimo) > 1) { ultimo = w; draw(); }
    });
    ro.observe(box);
  }

  /* ================= F1 · ¿Cuánto es 20? ================= */
  W['m2.units20'] = function (el) {
    var U = [
      { l: 'sin unidad', dim: 'ink', u: '', t: '«20», a secas, no dice nada: ¿veinte qué? ¿Personas, euros, grados? Sin unidad, el número no responde a ninguna pregunta.' },
      { l: 'neuronas', dim: 'cnt', u: 'neuronas', t: '**20 neuronas**: un grupito diminuto de las células que transmiten señales en el sistema nervioso. Tu encéfalo tiene unas 86.000 millones. Es una cantidad que se **cuenta** (regla de cantidad).' },
      { l: 'vatios (W)', dim: 'nrg', u: 'W', t: '**20 W** es una potencia: el **ritmo** al que se usa la energía, 20 julios cada segundo. Es lo que entrega un cargador rápido de teléfono y, según la estimación del recorrido, lo que consume tu encéfalo en reposo (regla de energía).' },
      { l: 'julios (J)', dim: 'nrg', u: 'J', t: '**20 J** es una **cantidad** de energía, no un ritmo: más o menos la necesaria para levantar una bolsa de 2 kilos a un metro de altura (2 kg × 9,8 m/s² × 1 m ≈ 20 J). Un cerebro de 20 W gasta 20 J en cada segundo.' },
      { l: 'bits', dim: 'inf', u: 'bits', t: '**20 bits** son 20 respuestas de sí o no. Con 20 bits se distinguen 2²⁰ ≈ 1 millón de posibilidades (regla de información).' },
      { l: 'FLOP', dim: 'cmp', u: 'FLOP', t: '**20 FLOP** son 20 operaciones aritméticas con decimales, como 20 sumas o multiplicaciones (regla de cómputo). Sin «por segundo», es un total, no una velocidad.' },
      { l: 'hercios (Hz)', dim: 'ink', u: 'Hz', t: '**20 Hz** significa 20 veces por segundo: una frecuencia. Una neurona típica dispara mucho menos: según los modelos, entre 0,1 y 1 vez por segundo de media (estimado).' }
    ];
    var big = h('div', { class: 't1-big' });
    var txt = h('p', { class: 't1-say' });
    var caja = h('div', { class: 't1-u-out', 'aria-live': 'polite' }, big, txt);
    var prog = h('p', { class: 'w-note-s' });
    var vistos = {}, n = 0;
    function show(u, i) {
      if (!vistos[i]) { vistos[i] = true; n++; }
      M.clear(big);
      big.appendChild(document.createTextNode('20'));
      big.appendChild(h('small', null, u.u || '¿?'));
      caja.className = 't1-u-out t1-d-' + u.dim;
      decir(txt, u.t);
      prog.textContent = 'Has probado ' + n + ' de ' + U.length + ' unidades.';
    }
    el.appendChild(h('div', { class: 't1-lab' },
      h('p', { class: 'w-note' }, 'Elige una unidad para el número 20 y lee qué significa cada vez.'),
      chips(U, show, { label: 'Unidad para el número 20', sel: 0 }),
      caja, prog));
    show(U[0], 0);
  };

  /* ================= F2 · Explorador de potencias de diez ================= */
  W['m2.powers'] = function (el) {
    var big = h('div', { class: 't1-big t1-pot' });
    var dg = h('div', { class: 't1-digits', 'aria-hidden': 'true' });
    var kv = h('dl', { class: 't1-kv', 'aria-live': 'polite' });
    var seen = h('ul', { class: 't1-seen' });
    function row(k, v) { kv.appendChild(h('div', null, h('dt', null, k), h('dd', null, v))); }
    function draw(n) {
      big.textContent = pE(n);
      var d = digitsOf('1', n);
      M.clear(dg);
      d.split('').forEach(function (c) { dg.appendChild(c === '0' ? h('span', { class: 'z' }, c) : document.createTextNode(c)); });
      M.clear(kv);
      row('Se escribe', d);
      row(n >= 0 ? 'Ceros detrás del 1' : 'Posición del 1 tras la coma', String(Math.abs(n)));
      row('En español', n >= 0 ? ES_POS[n] : ES_NEG[-n] + ' (1 entre ' + ES_POS[-n] + ')');
      row('En inglés', h('span', { lang: 'en' }, enName(n)));
      row('Prefijo del SI', PREF[n] || 'sin prefijo propio');
      M.clear(seen);
      (SEEN[String(n)] || ['Ninguna cifra del recorrido cae justo en este orden de magnitud.']).forEach(function (t) { seen.appendChild(h('li', null, rich(t))); });
    }
    var r = rango({ label: 'Exponente n', min: -21, max: 30, value: 3, fmt: pE, on: draw, help: 'Mueve el exponente: **hacia la derecha multiplica por 10** en cada paso; hacia la izquierda, divide entre 10. Con el teclado, usa las flechas.' });
    el.appendChild(h('div', { class: 't1-lab' }, r.wrap,
      h('div', { class: 't1-pw-out' }, big, dg, kv),
      h('div', null, h('p', { class: 't1-mini' }, h('b', null, 'Dónde aparece en este recorrido:')), seen)));
    draw(3);
  };

  /* ================= F3 · Traductor de notación científica ================= */
  W['m2.sci'] = function (el) {
    var P = [
      { l: 'Neuronas del encéfalo', m: '8.6', e: 10, u: 'neuronas' },
      { l: 'LineShine (FP64)', m: '2.198', e: 18, u: 'FLOP/s' },
      { l: '1 mm³ de corteza en imágenes', m: '1.4', e: 15, u: 'bytes' },
      { l: 'Julios por operación del cerebro', m: '2', e: -14, u: 'J' },
      { l: '«Cómputo de una vida»', m: '9.5', e: 23, u: 'FLOP' },
      { l: '93 campus de IA', m: '1.38', e: 10, u: 'W' }
    ];
    var m = '8.6', e = 10, u = 'neuronas';
    var out = h('div', { class: 'm2-out t1-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't1-say', 'aria-live': 'polite' });
    var pres = null;
    function draw() {
      var v = parseFloat(m) * Math.pow(10, e), mm = m.replace('.', ',');
      M.clear(out);
      function line(k, t) { out.appendChild(h('div', null, h('span', { class: 'k' }, k), h('span', { class: 'v' }, t))); }
      line('Notación científica: ', mm + ' × ' + pE(e) + (u ? ' ' + u : ''));
      line('Mover la coma ' + Math.abs(e) + (e >= 0 ? ' posiciones a la derecha: ' : ' posiciones a la izquierda: '), digitsOf(m, e));
      if (e >= 0) {
        line('En español (escala larga): ', esWords(m, e));
        line('En inglés (escala corta): ', h('span', { lang: 'en' }, enWords(m, e)));
      } else {
        line('Con prefijo: ', siUnit(v, u === 'J' ? 'J' : u === 'W' ? 'W' : '') + (u && u !== 'J' && u !== 'W' ? ' ' + u : ''));
        line('En palabras: ', mm + ' × ' + ES_NEG[-e]);
      }
      decir(say, e >= 0
        ? 'El exponente **' + e + '** dice que el número tiene ' + (e + 1) + ' cifras antes de la coma; la mantisa, ' + mm + ', dice cuántas veces ' + ES_POS[e] + '.'
        : 'El exponente negativo **' + m2.fmt(e) + '** indica un número menor que 1: la primera cifra distinta de cero está en la posición ' + (-e) + ' tras la coma.');
    }
    var rm = rango({ label: 'Mantisa', min: 10, max: 99, value: 86, fmt: function (v) { return fmt(v / 10, 1); }, on: function (v) { m = (v / 10).toFixed(1); u = ''; pres.limpiar(); draw(); }, help: 'La **mantisa** lleva las cifras importantes (entre 1 y 9,9).' });
    var re = rango({ label: 'Exponente', min: -21, max: 30, value: 10, fmt: pE, on: function (v) { e = v; u = ''; pres.limpiar(); draw(); }, help: 'El **exponente** dice el tamaño: cuántas posiciones se mueve la coma.' });
    pres = chips(P, function (q) { m = q.m; e = q.e; u = q.u; rm.set(Math.round(parseFloat(q.m) * 10)); re.set(q.e); draw(); }, { label: 'Cifras del recorrido', sel: 0 });
    el.appendChild(h('div', { class: 't1-lab' },
      h('p', { class: 'w-note' }, 'Elige una cifra del recorrido o compón la tuya con los dos controles.'),
      pres, h('div', { class: 'm2-grid2' }, rm.wrap, re.wrap), out, say));
    draw();
  };

  /* ================= F4 · Escala larga y escala corta ================= */
  W['m2.scales'] = function (el) {
    var R = [[3, 'mil', 'thousand', 'kilo (k)'], [6, 'un millón', 'million', 'mega (M)'], [9, 'mil millones', 'billion', 'giga (G)'], [12, 'un billón', 'trillion', 'tera (T)'], [15, 'mil billones', 'quadrillion', 'peta (P)'], [18, 'un trillón', 'quintillion', 'exa (E)']];
    var tb = h('tbody');
    var filas = R.map(function (r) {
      var tr = h('tr', null, h('td', { class: 't1-n' }, pE(r[0])), h('td', null, r[1]), h('td', { lang: 'en' }, r[2]), h('td', null, r[3]));
      tr.dataset.e = r[0];
      tb.appendChild(tr);
      return tr;
    });
    var tbl = h('div', { class: 'tablewrap m2-tabla t1-tabla' }, h('table', null,
      h('caption', { class: 'sr-only' }, 'Nombres de las potencias de diez en español e inglés'),
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Potencia'), h('th', { scope: 'col' }, 'Español'), h('th', { scope: 'col' }, 'Inglés'), h('th', { scope: 'col' }, 'Prefijo SI'))), tb));
    var TR = [
      { l: '«86 billion neurons»', e: 10, t: '**86 billion** = 86 × 10⁹ = 8,6 × 10¹⁰ = **86.000 millones** de neuronas. No son 86 billones (eso sería mil veces más).' },
      { l: '«2.2 quintillion FLOP/s»', e: 18, t: '**Quintillion** = 10¹⁸ en escala corta. 2,2 × 10¹⁸ = **2,2 trillones** de operaciones por segundo en español.' },
      { l: '«one trillion synapses»', e: 12, t: '**Trillion** = 10¹² = **un billón** en español. Un trillón español sería 10¹⁸.' },
      { l: '«13.8 gigawatts»', e: 9, t: 'El prefijo **giga** (10⁹) no cambia de idioma: 13,8 GW = 13,8 × 10⁹ W = **13.800 millones de vatios**.' },
      { l: '«485 terawatt-hours»', e: 12, t: '**Tera** = 10¹²: 485 TWh = 485 × 10¹² Wh = **485 billones de vatios-hora**. Con el prefijo no hay confusión posible.' }
    ];
    var say = h('p', { class: 't1-say', 'aria-live': 'polite' });
    var ch = chips(TR, function (t) {
      decir(say, t.t);
      filas.forEach(function (tr) { var fe = +tr.dataset.e; tr.classList.toggle('t1-on', fe === t.e || (t.e === 10 && fe === 9)); });
    }, { label: 'Frases en inglés para traducir' });
    Array.prototype.forEach.call(ch.children, function (b) { b.setAttribute('lang', 'en'); });
    el.appendChild(h('div', { class: 't1-lab' }, tbl,
      h('p', { class: 'w-note' }, 'Pulsa una frase en inglés para traducirla y ver su fila en la tabla:'), ch, say));
    say.textContent = 'Fíjate en la fila de 10⁹: «mil millones» frente a «billion». Y en la de 10¹²: «un billón» frente a «trillion».';
  };

  /* ================= F5 · Sumar 10 o multiplicar por 10 ================= */
  W['m2.addmul'] = function (el) {
    var k = 0, logv = false;
    var box = h('div', { class: 't1-svgbox' });
    var tblBox = h('div', { class: 'tablewrap m2-tabla t1-tabla' });
    var say = h('p', { class: 't1-say', 'aria-live': 'polite' });
    var bNext = h('button', { type: 'button', class: 'btn small primary' }, 'Dar un paso más');
    var bReset = h('button', { type: 'button', class: 'btn small ghost' }, 'Volver a empezar');
    var sg = seg(['Escala lineal', 'Escala logarítmica'], function (i) { logv = i === 1; draw(); }, 0, 'Escala del gráfico');
    bNext.addEventListener('click', function () { if (k < 9) { k++; draw(); } });
    bReset.addEventListener('click', function () { k = 0; draw(); });
    function A(i) { return 1 + 10 * i; }
    function B(i) { return Math.pow(10, i); }
    function draw() {
      var w = ancho(box), hh = 220, x0 = 68, x1 = w - 12, y0 = 190, y1 = 30;
      var svg = svgRoot(box, w, hh + 20, 'Dos series: sumar 10 y multiplicar por 10 durante ' + k + ' pasos, escala ' + (logv ? 'logarítmica' : 'lineal'));
      var sx = linScale(0, 9, x0, x1);
      var maxV = Math.max(10, B(k));
      var sy = logv ? logScale(1, 1e9, y0, y1) : linScale(0, maxV, y0, y1);
      if (logv) logAxisY(svg, sy, 0, 9, x0, { every: 3, grid: [x0, x1] });
      else {
        [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
          var v = maxV * f, y = sy(v);
          S('line', { x1: x0, x2: x1, y1: y, y2: y, class: 't1-gl' }, svg);
          T(svg, x0 - 6, y + 4, v >= 1e4 ? m2.sci(v, 1) : fmt(v), 't1-tl', { 'text-anchor': 'end' });
        });
      }
      S('line', { x1: x0, x2: x1, y1: y0, y2: y0, class: 't1-ax' }, svg);
      for (var i = 0; i <= 9; i++) T(svg, sx(i), y0 + 16, String(i), 't1-tl', { 'text-anchor': 'middle' });
      T(svg, x1, hh + 16, 'pasos', 't1-lbx', { 'text-anchor': 'end' });
      var pA = [], pB = [];
      for (var j = 0; j <= k; j++) { pA.push([sx(j), sy(Math.max(A(j), logv ? 1 : 0))]); pB.push([sx(j), sy(B(j))]); }
      if (k > 0) {
        S('path', { d: 'M' + pA.map(function (q) { return q.join(','); }).join('L'), class: 't1-ln t1-s-ink' }, svg);
        S('path', { d: 'M' + pB.map(function (q) { return q.join(','); }).join('L'), class: 't1-ln t1-s-nrg' }, svg);
      }
      pA.forEach(function (q) { S('circle', { cx: q[0], cy: q[1], r: 4, class: 't1-f-ink t1-ring' }, svg); });
      pB.forEach(function (q) { S('rect', { x: q[0] - 4, y: q[1] - 4, width: 8, height: 8, class: 't1-f-nrg t1-ring' }, svg); });
      /* Leyenda */
      S('circle', { cx: 10, cy: 12, r: 4, class: 't1-f-ink' }, svg);
      T(svg, 19, 16, 'sumar 10', 't1-lbs');
      S('rect', { x: 92, y: 8, width: 8, height: 8, class: 't1-f-nrg' }, svg);
      T(svg, 105, 16, 'multiplicar por 10', 't1-lbs');
      var rows = [];
      for (var r = 0; r <= k; r++) rows.push(h('tr', null, h('td', { class: 't1-n' }, String(r)), h('td', { class: 't1-n' }, fmt(A(r))), h('td', { class: 't1-n' }, fmt(B(r)))));
      M.clear(tblBox);
      tblBox.appendChild(h('table', null, h('caption', { class: 'sr-only' }, 'Valores de las dos series'),
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Paso'), h('th', { scope: 'col' }, 'Sumando 10'), h('th', { scope: 'col' }, 'Multiplicando por 10'))),
        h('tbody', null, rows)));
      decir(say, k === 0 ? 'Las dos series empiezan en 1. Pulsa «Dar un paso más».'
        : 'Tras **' + k + '** ' + (k === 1 ? 'paso' : 'pasos') + ': sumando 10 llegas a **' + fmt(A(k)) + '**; multiplicando por 10, a **' + fmt(B(k)) + '** (' + pE(k) + '), es decir, ' + fmt(B(k) / A(k), B(k) / A(k) < 10 ? 1 : 0) + ' veces más.' +
          (logv ? ' En la escala logarítmica, la serie que multiplica es una **recta**: cada paso sube un tramo igual.' : (k >= 4 ? ' En la escala lineal, la serie que suma queda aplastada contra el suelo: cambia a la logarítmica.' : '')));
      bNext.disabled = k >= 9;
    }
    el.appendChild(h('div', { class: 't1-lab' },
      h('div', { class: 'btnrow' }, bNext, bReset, sg),
      box, say,
      m2.desplegable('Ver los valores en una tabla', null, tblBox, 'datos')));
    seguirAncho(box, draw);
    draw();
  };

  /* ================= F6 · Saltos en escala lineal y logarítmica ================= */
  W['m2.linlog'] = function (el) {
    var J = [
      { l: '1 → 10', a: 1, b: 10 }, { l: '10 → 100', a: 10, b: 100 }, { l: '100 → 1.000', a: 100, b: 1000 }, { l: '1.000 → 10.000', a: 1000, b: 10000 },
      { l: '10 → 20 (sumar 10)', a: 10, b: 20 }, { l: '5.000 → 10.000 (×2)', a: 5000, b: 10000 }, { l: 'Los cuatro «×10» a la vez', all: true }
    ];
    var box = h('div', { class: 't1-svgbox' });
    var out = h('div', { class: 'm2-out t1-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't1-say', 'aria-live': 'polite' });
    var cur = J[0];
    var ch = chips(J, function (j) { cur = j; draw(); }, { label: 'Saltos para comparar', sel: 0 });
    /* deslizador logarítmico: posición 0..1000 ↔ valor de 1 a 10.000 */
    function toV(pos) { return Math.pow(10, 4 * pos / 1000); }
    function libre() { cur = { l: 'libre', a: Math.round(toV(+ra.inp.value)), b: Math.round(toV(+rb.inp.value)) }; ch.limpiar(); draw(); }
    var ra = rango({ label: 'Tu salto: desde', min: 0, max: 1000, value: 250, fmt: function (pos) { return fmt(Math.round(toV(pos))); }, on: libre });
    var rb = rango({ label: 'hasta', min: 0, max: 1000, value: 500, fmt: function (pos) { return fmt(Math.round(toV(pos))); }, on: libre });
    var COL = ['cnt', 'cmp', 'nrg', 'inf'];
    function draw() {
      var w = ancho(box), x0 = 16, x1 = w - 16, yL = 64, yG = 160, hh = 196;
      var svg = svgRoot(box, w, hh, 'El salto elegido dibujado en una escala lineal de 0 a 10.000 y en una logarítmica de 1 a 10.000');
      var sl = linScale(0, 10000, x0, x1), sgl = logScale(1, 10000, x0, x1);
      T(svg, x0, 18, w < 520 ? 'Lineal: cada marca suma 2.500' : 'Escala lineal: de 0 a 10.000 (cada marca suma 2.500)', 't1-lbx');
      S('line', { x1: x0, x2: x1, y1: yL, y2: yL, class: 't1-ax' }, svg);
      [0, 2500, 5000, 7500, 10000].forEach(function (v, i) {
        var x = sl(v);
        S('line', { x1: x, x2: x, y1: yL, y2: yL + 6, class: 't1-tk' }, svg);
        T(svg, x, yL + 20, fmt(v), 't1-tl', { 'text-anchor': i === 0 ? 'start' : i === 4 ? 'end' : 'middle' });
      });
      T(svg, x0, 114, w < 520 ? 'Logarítmica: cada marca multiplica por 10' : 'Escala logarítmica: de 1 a 10.000 (cada marca multiplica por 10)', 't1-lbx');
      logAxisX(svg, sgl, 0, 4, yG, { label: function (e) { return ['1', '10', '100', '1.000', '10.000'][e]; } });
      var saltos = cur.all ? J.slice(0, 4) : [cur];
      saltos.forEach(function (j, i) {
        var c = cur.all ? COL[i] : 'cnt', dy = cur.all ? -8 - i * 7 : -10;
        [[sl, yL], [sgl, yG]].forEach(function (par) {
          var sc = par[0], y = par[1] + dy;
          var xa = sc(Math.max(j.a, 1e-9)), xb = sc(j.b), dir = xb >= xa ? 1 : -1;
          S('line', { x1: xa, x2: xb, y1: y, y2: y, class: 't1-ln t1-s-' + c, 'stroke-width': 3.2 }, svg);
          S('circle', { cx: xa, cy: y, r: 3, class: 't1-f-' + c }, svg);
          S('path', { d: 'M' + xb + ',' + y + 'l' + (-7 * dir) + ',-4v8z', class: 't1-f-' + c }, svg);
        });
      });
      M.clear(out);
      function line(k, t) { out.appendChild(h('div', null, h('span', { class: 'k' }, k), h('span', { class: 'v' }, t))); }
      if (cur.all) {
        line('Cuatro saltos «×10»: ', '1→10, 10→100, 100→1.000 y 1.000→10.000');
        line('Escala lineal: ', 'ocupan el 0,09 %, el 0,9 %, el 9 % y el 90 % del eje');
        line('Escala logarítmica: ', 'el 25 % cada uno');
        decir(say, 'En la escala lineal, el último salto lo llena casi todo y los primeros son invisibles. En la logarítmica, los cuatro **miden exactamente lo mismo**, porque todos multiplican por 10.');
        return;
      }
      var a = cur.a, b = cur.b, lo = Math.min(a, b), hi = Math.max(a, b);
      var pl = (hi - lo) / 10000 * 100, pg = (Math.log10(hi) - Math.log10(lo)) / 4 * 100;
      line('Salto: ', fmt(a) + ' → ' + fmt(b));
      line('Diferencia (resta): ', (b >= a ? '+' : '−') + fmt(Math.abs(b - a)));
      line('Razón (cociente): ', '×' + nice(b / a) + ' = ' + nice(Math.log10(b / a)) + (Math.abs(Math.abs(Math.log10(b / a)) - 1) < 1e-9 ? ' orden de magnitud' : ' órdenes de magnitud'));
      line('Espacio que ocupa: ', fmt(pl, pl < 1 ? 2 : 1) + ' % del eje lineal · ' + fmt(pg, 1) + ' % del eje logarítmico');
      decir(say, 'La escala lineal mide la **diferencia** (' + fmt(Math.abs(b - a)) + '); la logarítmica, la **razón** (×' + nice(b / a) + '). ' + (Math.abs(b / a - 10) < 1e-9 ? 'Todo «×10» ocupa un cuarto del eje logarítmico, esté donde esté.' : ''));
    }
    el.appendChild(h('div', { class: 't1-lab' },
      h('p', { class: 'w-note' }, 'Elige un salto y compara cuánto espacio ocupa en cada escala. Después prueba tu propio salto con los dos controles.'),
      ch, box, out, say,
      h('div', { class: 'm2-grid2' }, ra.wrap, rb.wrap),
      h('p', { class: 't1-help' }, 'Los dos controles se mueven en pasos logarítmicos: cada cuarto del recorrido multiplica por 10.')));
    seguirAncho(box, draw);
    draw();
  };
})();
