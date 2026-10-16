/* Laboratorios del Taller 6 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};
  var S = M.s;

  /* =====================================================================
     Utilidades compartidas por los laboratorios y animaciones del taller
     ===================================================================== */
  var nId = 0;
  function uid(pre) { return (pre || 't6') + '-' + (++nId); }
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  /* Dos cifras significativas: 0,35 · 3,7 · 270 */
  function sig(v) {
    var d = v >= 10 ? 0 : v >= 1 ? 1 : v >= 0.1 ? 2 : 3;
    var s = fmt(v, d);
    if (s.indexOf(',') >= 0) s = s.replace(/0+$/, '').replace(/,$/, '');
    return s;
  }
  /* «1,98 × 10¹⁵» (conserva el «1 ×» de la mantisa) */
  function sci(v, d) {
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
    var ms = (Math.abs(v) / Math.pow(10, e)).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; ms = (Math.abs(v) / Math.pow(10, e)).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '').replace('.', ',');
    return (v < 0 ? '−' : '') + ms + ' × ' + m2.pw(e);
  }
  /* Número legible con 2–3 cifras significativas */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* Deslizador logarítmico: posición 0…1000 ↔ valor */
  function logMap(lo, hi) {
    var l0 = Math.log10(lo), l1 = Math.log10(hi);
    return { toV: function (pp) { return Math.pow(10, l0 + (l1 - l0) * pp / 1000); } };
  }
  function logScale(d0, d1, r0, r1) {
    var l0 = Math.log10(d0), l1 = Math.log10(d1);
    var f = function (v) { return r0 + (Math.log10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    return f;
  }
  function T(parent, x, y, text, cls, extra) {
    var t = S('text', Object.assign({ x: x, y: y, class: cls }, extra || {}));
    t.textContent = text;
    parent.appendChild(t);
    return t;
  }
  function svgRoot(box, w, hh, label) {
    M.clear(box);
    var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + hh, class: 't6-svg', role: 'img', 'aria-label': label || '' });
    box.appendChild(svg);
    return svg;
  }
  function ancho(box, def) { return Math.max(280, Math.round(box.clientWidth) || def || 520); }
  /* Vuelve a dibujar cuando cambia el ancho del contenedor */
  function alCambiarAncho(box, dibujar) {
    var ultimo = -1;
    function ir() {
      var w = Math.round(box.clientWidth);
      if (w >= 120 && Math.abs(w - ultimo) > 1) { ultimo = w; dibujar(); }
    }
    if ('ResizeObserver' in window) new ResizeObserver(ir).observe(box);
    else window.addEventListener('resize', ir);
  }
  /* Texto que no se sale del dibujo: se recoloca dentro de [4, w − 4] */
  function etiqueta(svg, x, y, text, w, cls) {
    var tw = text.length * 6.5;
    var left = Math.max(4, Math.min(w - 4 - tw, x - tw / 2));
    return T(svg, left, y, text, cls || 't6-tx');
  }
  /* Marcador por tipo de cifra: rombo medido, círculo estimado, cuadrado declarado, huecos proyectado/extrapolado */
  function marcador(g, x, y, st, col, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var cls = hueco ? 't6-mk-h t6-s-' + col : 't6-mk t6-f-' + col;
    var el;
    if (st === 'med' || st === 'proy') el = S('rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls });
    else if (st === 'decl') el = S('rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls });
    else el = S('circle', { cx: x, cy: y, r: r * 0.92, class: cls });
    g.appendChild(el);
    return el;
  }
  /* Grupo de botones-ficha con rótulo visible; uno solo pulsado a la vez */
  function grupoChips(rotulo, items, alElegir, sel) {
    var id = uid('t6g');
    var grp = h('div', { class: 'chips', role: 'group', 'aria-labelledby': id });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === sel) }, it.l);
      b.addEventListener('click', function () {
        bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        alElegir(it, i);
      });
      grp.appendChild(b);
      return b;
    });
    return {
      el: h('div', { class: 't6-campo' }, h('span', { class: 't6-k', id: id }, rotulo), grp),
      marcar: function (f) { bs.forEach(function (b, i) { b.setAttribute('aria-pressed', String(!!f(items[i], i))); }); }
    };
  }
  function salida() { return h('div', { class: 'm2-out t6-out', 'aria-live': 'polite' }); }
  function comentario() { return h('p', { class: 't6-say', 'aria-live': 'polite' }); }
  function fila() { return h.apply(null, ['div', null].concat(Array.prototype.slice.call(arguments))); }
  function clave(t) { return h('span', { class: 't6-o' }, t); }

  /* =====================================================================
     Introducción · el hilo del recorrido
     Arriba se ramifica (acto I, el cerebro); desde aquí dobla en ángulo recto (acto II, el silicio).
     ===================================================================== */
  W['m2.t6-hilo'] = function (el, ctx) {
    ctx = ctx || {};
    var svg = S('svg', { class: 't6-hilo-svg', viewBox: '0 0 34 300', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
    var ve = { 'vector-effect': 'non-scaling-stroke' };
    [
      'M17 0 C 21 24, 13 46, 17 70 S 21 116, 17 138',
      'M18 20 C 24 16, 28 9, 31 3', 'M23 13 C 25 16, 27 17, 31 18',
      'M15 46 C 10 42, 6 36, 3 28', 'M8 38 C 6 42, 4 43, 2 44',
      'M18 84 C 24 82, 28 76, 31 70',
      'M16 112 C 11 110, 6 104, 3 97'
    ].forEach(function (d) { svg.appendChild(S('path', Object.assign({ class: 't6-hilo-bio', d: d }, ve))); });
    svg.appendChild(S('path', Object.assign({ class: 't6-hilo-sil', d: 'M17 138 V 160 H 28 V 190 H 6 V 222 H 27 V 254 H 9 V 280 H 17 V 300' }, ve)));
    var marco = h('div', { class: 't6-hilo-g' }, svg);
    var col = h('div', { class: 't6-hilo-t' },
      ctx.arriba ? h('span', { class: 't6-hilo-k t6-hilo-bio-k' }, rich(ctx.arriba)) : null,
      (ctx.texto || []).map(function (x) { return p(x); }),
      ctx.abajo ? h('span', { class: 't6-hilo-k t6-hilo-sil-k' }, rich(ctx.abajo)) : null);
    el.appendChild(h('div', { class: 't6-hilo' }, marco, col));
  };

  /* =====================================================================
     II.0 · Puertas lógicas (actividad «gates»)
     ===================================================================== */
  W['m2.gates'] = function (el) {
    var MODOS = [
      { l: 'En fila · Y (AND)', k: 'and', name: 'Y', f: function (a, b) { return a & b; }, t: 'La salida vale 1 solo si A **y** B valen 1: basta un interruptor abierto para cortar el paso.' },
      { l: 'En paralelo · O (OR)', k: 'or', name: 'O', f: function (a, b) { return a | b; }, t: 'La salida vale 1 si A **o** B (o los dos) valen 1: la corriente tiene dos caminos.' },
      { l: 'Inversor · NO (NOT)', k: 'not', name: 'NO', f: function (a) { return 1 - a; }, t: 'La salida es lo contrario de A. B no interviene.' },
      { l: 'Sumador de un bit', k: 'add', name: 'Σ', t: 'Suma A + B: la **cifra** la da O exclusivo (XOR) y el **acarreo**, Y (AND). 1 + 1 = «10» en binario, es decir, dos.' }
    ];
    var m = MODOS[0], A = 1, B = 0;
    var box = h('div', { class: 't6-svgbox' }), out = salida(), say = comentario(), tt = h('div', { class: 't6-ttbox' });
    var bA = h('button', { type: 'button', class: 'btn small t6-ab', 'aria-pressed': 'true' });
    var bB = h('button', { type: 'button', class: 'btn small t6-ab', 'aria-pressed': 'false' });
    bA.addEventListener('click', function () { A = 1 - A; draw(); });
    bB.addEventListener('click', function () { B = 1 - B; draw(); });
    var ch = grupoChips('Circuito', MODOS, function (x) { m = x; draw(); }, 0);
    var idAB = uid('t6ab');

    function lamp(svg, x, y, on, lab) {
      if (on) svg.appendChild(S('circle', { cx: x, cy: y, r: 20, class: 't6-halo' }));
      svg.appendChild(S('circle', { cx: x, cy: y, r: 14, class: on ? 't6-lamp-on' : 't6-lamp-off' }));
      T(svg, x, y + 32, lab, 't6-tx', { 'text-anchor': 'middle' });
    }
    function cable(svg, x1, x2, y, on) {
      svg.appendChild(S('line', { x1: x1, x2: x2, y1: y, y2: y, class: on ? 't6-w-on' : 't6-w-off' }));
    }
    function draw() {
      bA.textContent = 'A = ' + A + (A ? ' (cerrado)' : ' (abierto)'); bA.setAttribute('aria-pressed', String(!!A));
      bB.textContent = 'B = ' + B + (B ? ' (cerrado)' : ' (abierto)'); bB.setAttribute('aria-pressed', String(!!B)); bB.disabled = m.k === 'not';
      var w = ancho(box), hh = 164, gx = Math.round(w * 0.45);
      var svg = svgRoot(box, w, hh, 'Puerta ' + m.l + ' con A = ' + A + ' y B = ' + B);
      var ins = m.k === 'not' ? [['A', A, 82]] : [['A', A, 48], ['B', B, 116]];
      ins.forEach(function (it) {
        var y = it[2], v = it[1];
        cable(svg, 47, gx - 34, y, v);
        svg.appendChild(S('circle', { cx: 34, cy: y, r: 13, class: v ? 't6-in-on' : 't6-in-off' }));
        T(svg, 34, y + 5, String(v), 't6-txb', { 'text-anchor': 'middle' });
        T(svg, 12, y + 4, it[0], 't6-tx', { 'text-anchor': 'middle' });
      });
      svg.appendChild(S('rect', { x: gx - 34, y: 30, width: 68, height: 104, rx: 10, class: 't6-gate' }));
      T(svg, gx, 90, m.name, 't6-gname', { 'text-anchor': 'middle' });
      M.clear(out);
      if (m.k === 'add') {
        var s = A ^ B, c = A & B;
        cable(svg, gx + 34, w - 58, 48, s);
        cable(svg, gx + 34, w - 58, 116, c);
        lamp(svg, w - 44, 48, s, 'cifra: ' + s);
        lamp(svg, w - 44, 116, c, 'acarreo: ' + c);
        out.appendChild(fila(clave('A + B = '), A + ' + ' + B + ' = ', h('b', null, String(c) + String(s)), ' en binario = ', h('b', null, String(A + B))));
        out.appendChild(fila(clave('Cifra (XOR): '), String(s), ' · ', clave('acarreo (Y): '), String(c)));
      } else {
        var y = m.f(A, B);
        cable(svg, gx + 34, w - 58, 82, y);
        lamp(svg, w - 44, 82, y, 'salida: ' + y);
        out.appendChild(fila(clave('Salida ' + m.name + ': '), h('b', null, String(y)), ' · bombilla ' + (y ? 'encendida' : 'apagada')));
      }
      M.clear(say); say.appendChild(rich(m.t));
      /* tabla de verdad */
      var rows = m.k === 'not' ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
      var head = m.k === 'not' ? ['A', 'salida'] : m.k === 'add' ? ['A', 'B', 'acarreo', 'cifra'] : ['A', 'B', 'salida'];
      var tb = h('table', null,
        h('caption', { class: 'sr-only' }, 'Tabla de verdad de ' + m.l),
        h('thead', null, h('tr', null, head.map(function (x) { return h('th', { scope: 'col' }, x); }))),
        h('tbody', null, rows.map(function (r) {
          var a = r[0], b = r[1] || 0, cur = a === A && (m.k === 'not' || b === B);
          var vals = m.k === 'not' ? [a, 1 - a] : m.k === 'add' ? [a, b, a & b, a ^ b] : [a, b, m.f(a, b)];
          return h('tr', { class: cur ? 't6-cur' : null, 'aria-current': cur ? 'true' : null }, vals.map(function (v) { return h('td', null, String(v)); }));
        })));
      M.clear(tt);
      tt.appendChild(p('Tabla de verdad: todas las combinaciones posibles. La fila resaltada es la que tienes ahora.', { class: 'w-note-s' }));
      tt.appendChild(h('div', { class: 'tablewrap m2-tabla t6-tt' }, tb));
    }
    el.appendChild(h('div', { class: 't6-lab' },
      p('Elige un circuito y pulsa A y B para abrir o cerrar cada interruptor.', { class: 'w-note' }),
      ch.el,
      h('div', { class: 't6-campo' }, h('span', { class: 't6-k', id: idAB }, 'Interruptores'),
        h('div', { class: 'btnrow', role: 'group', 'aria-labelledby': idAB }, bA, bB)),
      box, out, say, tt));
    alCambiarAncho(box, draw);
    draw();
  };

  /* =====================================================================
     II.1 · El precio de mover datos (actividad «datamove»)
     ===================================================================== */
  W['m2.datamove'] = function (el) {
    var OPS = [{ l: 'Operación barata · 0,4 pJ', e: 0.4 }, { l: 'Operación cara · 3,7 pJ', e: 3.7 }];
    var DRAM = 1000, op = OPS[1], I = 1, LM = logMap(1, 1e4), r = null;
    var box = h('div', { class: 't6-svgbox' }), out = salida(), say = comentario();
    var ch = grupoChips('Energía de una operación (45 nm)', OPS, function (x) { op = x; draw(); }, 1);
    var ayuda = h('p', { class: 'w-note-s t6-ayuda', id: uid('t6ay') }, rich('Este control fija cuántas veces reutilizas cada dato antes de ir a por otro (la intensidad aritmética). Importa porque el costo del viaje se reparte entre esas operaciones.'));
    r = m2.deslizador({
      etiqueta: 'Operaciones que haces con cada dato traído de la DRAM', min: 0, max: 1000, step: 1, valor: 0,
      formato: function (pp) { return nice(Math.round(LM.toV(pp))); },
      alCambiar: function (pp) { I = Math.round(LM.toV(pp)); if (r) r.input.setAttribute('aria-valuetext', nice(I) + ' operaciones por dato'); draw(); }
    });
    r.input.setAttribute('aria-describedby', ayuda.id);
    var reset = h('button', { type: 'button', class: 'btn small ghost' }, 'Volver a una operación por dato');
    reset.addEventListener('click', function () { r.poner(0); });
    function draw() {
      var trip = DRAM / I, tot = op.e + trip, fr = trip / tot;
      var w = ancho(box), x0 = 8, x1 = w - 8, y = 34, bh = 30;
      var svg = svgRoot(box, w, 96, 'Reparto de la energía por operación: viaje ' + fmt(fr * 100, 1) + ' por ciento, operación ' + fmt((1 - fr) * 100, 1) + ' por ciento');
      var xm = x0 + (x1 - x0) * fr;
      svg.appendChild(S('rect', { x: x0, y: y, width: Math.max(0.5, xm - x0), height: bh, rx: 6, class: 't6-f-nrg' }));
      svg.appendChild(S('rect', { x: xm, y: y, width: Math.max(0.5, x1 - xm), height: bh, rx: 6, class: 't6-f-cmp' }));
      T(svg, x0, y - 10, 'viaje desde la DRAM: ' + fmt(fr * 100, fr > 0.999 ? 2 : 1) + ' %', 't6-tx t6-tx-nrg');
      T(svg, x1, y + bh + 20, 'operar: ' + fmt((1 - fr) * 100, (1 - fr) < 0.01 ? 2 : 1) + ' %', 't6-tx t6-tx-cmp', { 'text-anchor': 'end' });
      M.clear(out);
      out.appendChild(fila(clave('Por cada operación: '), sig(op.e) + ' pJ de operar + ' + nice(trip) + ' pJ de viaje (1.000 ÷ ' + nice(I) + ') = ', h('b', null, nice(tot) + ' pJ')));
      out.appendChild(fila(clave('Para que el viaje pese menos que la operación: '), 'más de ' + nice(Math.round(DRAM / op.e)) + ' operaciones por dato (1.000 ÷ ' + sig(op.e) + ')'));
      M.clear(say);
      say.appendChild(rich(fr > 0.9 ? 'Con tan pocas operaciones por dato, **casi toda la energía se va en el viaje**. Reutiliza más cada dato.' : fr > 0.5 ? 'El viaje todavía se lleva más de la mitad. Sigue subiendo la reutilización.' : 'Ahora manda el cálculo: cada dato se reutiliza lo bastante para repartir el costo de traerlo. Por eso los chips acercan la memoria y reutilizan los datos.'));
    }
    el.appendChild(h('div', { class: 't6-lab' },
      p('Valores de 45 nm (Horowitz, 2014): ~1.000 pJ por traer un dato de la DRAM y 0,4–3,7 pJ por operación. En chips actuales cambian los valores, no la idea.', { class: 'w-note' }),
      ch.el, r.el, ayuda, h('div', { class: 'btnrow' }, reset), box, out, say));
    alCambiarAncho(box, draw);
    draw();
  };

  /* =====================================================================
     II.2 · Pico, dispersión y uso real (actividad «sparsity»)
     ===================================================================== */
  W['m2.sparsity'] = function (el) {
    var P = 700, DENSE = 1.979e15;
    var MODES = [{ l: 'FP8 sin dispersión · 1.979 TFLOP/s', sp: false }, { l: 'FP8 con dispersión · 3.958 TFLOP/s', sp: true }];
    var PRE = [{ l: '100 % · pico teórico', v: 100 }, { l: '25 %', v: 25 }, { l: '1 % · como HPCG en supercomputación', v: 1 }];
    var md = MODES[0], u = 1, r = null, pre = null;
    var box = h('div', { class: 't6-svgbox' }), out = salida(), say = comentario();
    var ch = grupoChips('Cómo se cuenta el pico', MODES, function (x) { md = x; draw(); }, 0);
    var ayuda = h('p', { class: 'w-note-s t6-ayuda', id: uid('t6ay') }, rich('Este control fija qué parte del pico se aprovecha (100 % = el pico teórico). Es un supuesto tuyo: el pico no lo garantiza ninguna aplicación.'));
    r = m2.deslizador({
      etiqueta: 'Utilización: fracción del pico que aprovecha la aplicación', min: 1, max: 100, step: 1, valor: 100,
      formato: function (v) { return v + ' %'; },
      alCambiar: function (v) {
        u = v / 100;
        if (r) r.input.setAttribute('aria-valuetext', v + ' por ciento');
        if (pre) pre.marcar(function (it) { return it.v === v; });
        draw();
      }
    });
    r.input.setAttribute('aria-describedby', ayuda.id);
    pre = grupoChips('Utilizaciones de referencia', PRE, function (x) { r.poner(x.v); }, 0);
    function draw() {
      var counted = (md.sp ? 2 * DENSE : DENSE) * u, real = DENSE * u;
      var eC = P / counted, eR = P / real;
      var w = ancho(box), x0 = 24, x1 = w - 26, ym = 58, ya = 74;
      var svg = svgRoot(box, w, 106, 'Energía por operación en escala logarítmica: contada ' + fmt(eC * 1e12, 2) + ' picojulios, real ' + fmt(eR * 1e12, 2) + ' picojulios');
      var sc = logScale(1e-13, 1e-10, x0, x1);
      /* eje logarítmico con marcas menores 2–9 */
      svg.appendChild(S('line', { x1: sc.e(-13), x2: sc.e(-10), y1: ya, y2: ya, class: 'chart-axis' }));
      var LAB = ['0,1 pJ', '1 pJ', '10 pJ', '100 pJ'];
      for (var e = -13; e <= -10; e++) {
        var x = sc.e(e);
        svg.appendChild(S('line', { x1: x, x2: x, y1: ya, y2: ya + 6, class: 't6-tick' }));
        T(svg, x, ya + 19, LAB[e + 13], 't6-tx', { 'text-anchor': e === -13 ? 'start' : (e === -10 ? 'end' : 'middle'), dx: e === -13 ? -6 : (e === -10 ? 6 : 0) });
        if (e < -10) for (var k = 2; k < 10; k++) { var xm = sc(k * Math.pow(10, e)); svg.appendChild(S('line', { x1: xm, x2: xm, y1: ya, y2: ya + (k === 5 ? 4.2 : 2.7), class: 't6-tick-m' })); }
      }
      if (md.sp) {
        svg.appendChild(S('line', { x1: sc(eR), x2: sc(eC), y1: ym, y2: ym, class: 't6-guia' }));
        marcador(svg, sc(eC), ym, 'extr', 'cmp', 6);
        etiqueta(svg, sc(eC), ym - 32, 'por operación contada', w, 't6-tx t6-tx-cmp');
      }
      marcador(svg, sc(eR), ym, 'decl', 'nrg', 7);
      etiqueta(svg, sc(eR), ym - 14, 'por operación hecha', w, 't6-tx t6-tx-nrg');
      M.clear(out);
      out.appendChild(fila(clave('Operaciones contadas por segundo: '), sci(counted, 2) + ' FLOP/s'));
      out.appendChild(fila(clave('Operaciones hechas de verdad (sin los ceros omitidos): '), sci(real, 2) + ' FLOP/s'));
      out.appendChild(fila(clave('Energía por operación contada: '), '700 W ÷ ' + sci(counted, 2) + ' = ', h('b', null, sig(eC * 1e12) + ' pJ')));
      out.appendChild(fila(clave('Energía por operación hecha: '), h('b', null, sig(eR * 1e12) + ' pJ')));
      M.clear(say);
      say.appendChild(rich((md.sp ? 'Contar «con dispersión» **reduce a la mitad** la energía por operación contada sin que el chip haga más trabajo real. ' : '') +
        (u < 1 ? 'Con una utilización del ' + Math.round(u * 100) + ' %, la energía por operación útil se multiplica por ' + nice(1 / u) + '.' : 'Al 100 % estás en el pico teórico: un mejor caso que ninguna aplicación garantiza.')));
    }
    var leyenda = h('p', { class: 'w-note-s t6-ley' }, 'Forma de cada punto: ', m2.marca('declarado'), ' energía por operación hecha · ', m2.marca('extrapolado'), ' por operación contada «con dispersión».');
    el.appendChild(h('div', { class: 't6-lab' },
      p('NVIDIA H100: pico declarado de 3.958 TFLOP/s en FP8 con dispersión, equivalente a 1.979 sin ella, y hasta 700 W. La actividad supone que el chip gasta siempre 700 W; en realidad su potencia también varía con la carga, y eso no se modela aquí.', { class: 'w-note' }),
      ch.el, r.el, ayuda, pre.el, box, leyenda, out, say,
      p('Sobre el 25 %: es la utilización que supone Epoch AI para estimar el entrenamiento de GPT-6 Astra; no figura en el original y procede de la verificación externa de esta edición.', { class: 'w-note-s' })));
    alCambiarAncho(box, draw);
    draw();
  };

  /* =====================================================================
     Animaciones de los niveles: bucle con pausa, sin movimiento si se pide
     ===================================================================== */
  var mqReducir = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reducido() { return !!(mqReducir && mqReducir.matches); }
  /* Generador pseudoaleatorio con semilla: el fotograma fijo sale siempre igual */
  function azar(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
  }
  function motor(el, paso) {
    var raf = 0, ult = 0, quiere = false, visible = true, montado = false, espera = 0, io = null;
    function frame(t) {
      raf = 0;
      if (!el.isConnected) {
        if (montado || ++espera > 900) { if (io) io.disconnect(); return; }
        raf = requestAnimationFrame(frame);
        return;
      }
      if (!montado) {
        montado = true;
        if ('IntersectionObserver' in window) {
          io = new IntersectionObserver(function (es) {
            if (!el.isConnected) { io.disconnect(); return; }
            visible = es[es.length - 1].isIntersecting;
            if (visible) arrancar();
          });
          io.observe(el);
        }
      }
      var dt = ult ? Math.min(0.05, (t - ult) / 1000) : 0;
      ult = t;
      if (quiere && visible) { paso(dt); raf = requestAnimationFrame(frame); } else ult = 0;
    }
    function arrancar() { if (!raf && quiere) raf = requestAnimationFrame(frame); }
    return {
      play: function () { quiere = true; arrancar(); },
      pause: function () { quiere = false; },
      activo: function () { return quiere; }
    };
  }
  function botonPausa(mot, alCambiar) {
    var b = h('button', { type: 'button', class: 'btn small' });
    function pintar() {
      M.clear(b);
      var on = mot.activo();
      b.appendChild(M.icon(on ? 'pausa' : 'play'));
      b.appendChild(document.createTextNode(on ? 'Pausar la animación' : (reducido() ? 'Ver en movimiento' : 'Reanudar la animación')));
    }
    b.addEventListener('click', function () { if (mot.activo()) mot.pause(); else mot.play(); pintar(); if (alCambiar) alCambiar(); });
    pintar();
    return b;
  }

  /* =====================================================================
     Nivel 5 · Transistor de nanohojas en perspectiva
     ===================================================================== */
  W['m2.nv-transistor'] = function (el) {
    var box = h('div', { class: 't6-anim' });
    var estado = h('p', { class: 't6-estado' });
    var aviso = h('p', { class: 'sr-only', 'aria-live': 'polite' });
    var z = { on: 1, T: 0, el: [] };
    var SHEETS = [0.4, 1.5, 2.6];
    var G = null;
    var R = azar(97 + 4 * 13);
    /* cajas en unidades: [x, y, z, ancho x, fondo y, alto z] */
    var CAJAS = {
      sub: [-1, -1, -1.1, 10, 4.2, 0.9],
      src: [-0.6, 0, -0.2, 2.2, 2.6, 3.9],
      drn: [6.4, 0, -0.2, 2.2, 2.6, 3.9],
      gate: [3.1, -0.1, -0.2, 1.8, 2.8, 3.9]
    };
    function proy(ox, oy, a, b, c) { return function (x, y, zz) { return [ox + (x - y) * a, oy + (x + y) * b - zz * c]; }; }
    function esquinas(cj) {
      var pts = [];
      [0, cj[3]].forEach(function (dx) { [0, cj[4]].forEach(function (dy) { [0, cj[5]].forEach(function (dz) { pts.push([cj[0] + dx, cj[1] + dy, cj[2] + dz]); }); }); });
      return pts;
    }
    /* Caja isométrica: caras frontal (y máx.), lateral (x máx.) y superior */
    function caja(g, P, cj, cls, op, trazo) {
      var gx = cj[0], gy = cj[1], gz = cj[2], sx = cj[3], sy = cj[4], sz = cj[5];
      function q(a, b, c) { return P(gx + a, gy + b, gz + c).map(function (v) { return v.toFixed(1); }).join(','); }
      var caras = [
        [q(0, sy, 0), q(sx, sy, 0), q(sx, sy, sz), q(0, sy, sz)],
        [q(sx, 0, 0), q(sx, sy, 0), q(sx, sy, sz), q(sx, 0, sz)],
        [q(0, 0, sz), q(sx, 0, sz), q(sx, sy, sz), q(0, sy, sz)]
      ];
      var ops = [op[1], op[2], op[0]];
      return caras.map(function (pts, i) {
        var pol = S('polygon', { points: pts.join(' '), class: cls + ' ' + trazo, 'fill-opacity': ops[i] });
        g.appendChild(pol);
        return pol;
      });
    }
    function construir() {
      var w = Math.max(280, Math.round(box.clientWidth) || 560);
      var H = Math.round(Math.max(250, Math.min(380, w * 0.5)));
      var u = Math.min((w - 24) / 12.6, (H - 70) / 10.6);
      var a = u * 0.86, b = u * 0.5, c = u * 0.7;
      /* centrar el dibujo: caja que envuelve todas las piezas */
      var P0 = proy(0, 0, a, b, c), xs = [], ys = [];
      Object.keys(CAJAS).forEach(function (k) { esquinas(CAJAS[k]).forEach(function (pt) { var s = P0(pt[0], pt[1], pt[2]); xs.push(s[0]); ys.push(s[1]); }); });
      var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs), minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
      var ox = (w - (maxX - minX)) / 2 - minX, oy = 30 + ((H - 64) - (maxY - minY)) / 2 - minY;
      var P = proy(ox, oy, a, b, c);
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + H, class: 't6-svg', role: 'img', 'aria-label': 'Esquema de un transistor de nanohojas: fuente a la izquierda, drenador a la derecha y, en medio, tres láminas de silicio rodeadas por la puerta, que se enciende y se apaga' });
      var g = S('g');
      svg.appendChild(g);
      caja(g, P, CAJAS.sub, 't6-fi', [0.08, 0.05, 0.12], 't6-st3');
      caja(g, P, CAJAS.src, 't6-fi', [0.13, 0.08, 0.17], 't6-st3');
      SHEETS.forEach(function (zz) { caja(g, P, [1.6, 0.55, zz, 4.8, 1.5, 0.34], 't6-fi2', [0.22, 0.12, 0.3], 't6-st2'); });
      var capaE = S('g');
      g.appendChild(capaE);
      caja(g, P, CAJAS.drn, 't6-fi', [0.13, 0.08, 0.17], 't6-st3');
      var puerta = caja(g, P, CAJAS.gate, 't6-fn', [0.52, 0.42, 0.6], 't6-stn');
      /* rótulos */
      var pf = P(0.5, 0, 3.7), pd = P(7.5, 0, 3.7), pg = P(4, -0.1, 3.7);
      etiqueta(svg, pf[0], pf[1] - 10, 'fuente', w, 't6-lbl');
      etiqueta(svg, pd[0], pd[1] - 10, 'drenador', w, 't6-lbl');
      var lp = etiqueta(svg, pg[0], pg[1] - 10, 'puerta · encendida', w, 't6-lbl t6-lbl-nrg');
      var pn = P(4.6, 2.05, 0.4), yb = maxY + oy + 18;
      svg.appendChild(S('line', { x1: pn[0], y1: pn[1], x2: pn[0], y2: yb - 12, class: 't6-guia' }));
      etiqueta(svg, pn[0], yb, 'nanohojas de silicio', w, 't6-lbl');
      M.clear(box);
      box.appendChild(svg);
      z.el.forEach(function (e) { e.n = null; });
      G = { P: P, u: u, capaE: capaE, puerta: puerta, lp: lp };
      pintarPuerta();
      pintarElectrones();
    }
    function pintarPuerta() {
      if (!G) return;
      var ga = z.on ? 0.42 : 0.14;
      [ga, ga + 0.18, ga + 0.1].forEach(function (o, i) { G.puerta[i].setAttribute('fill-opacity', o.toFixed(2)); });
      G.lp.textContent = z.on ? 'puerta · encendida' : 'puerta · apagada';
      estado.textContent = z.on ? 'Puerta encendida: los electrones fluyen por las nanohojas, de la fuente al drenador. El interruptor deja pasar la corriente.' : 'Puerta apagada: el flujo casi se detiene. El interruptor corta la corriente.';
      bPuerta.textContent = z.on ? 'Apagar la puerta' : 'Encender la puerta';
    }
    function pintarElectrones() {
      if (!G) return;
      var rr = Math.max(2.2, G.u * 0.15);
      z.el.forEach(function (e) {
        if (!e.n) { e.n = S('circle', { r: rr.toFixed(1), class: 't6-e' }); G.capaE.appendChild(e.n); }
        var q = G.P(e.x, e.y, SHEETS[e.s] + 0.36);
        e.n.setAttribute('cx', q[0].toFixed(1));
        e.n.setAttribute('cy', q[1].toFixed(1));
      });
    }
    function paso(dt) {
      z.T += dt;
      if (z.T > (z.on ? 1.8 : 1.3)) { z.T = 0; z.on = 1 - z.on; pintarPuerta(); }
      if (z.on && R() < dt * 30) z.el.push({ s: (R() * 3) | 0, x: 1.6, y: 0.6 + R() * 1.3, v: 2.6 + R() });
      for (var i = z.el.length - 1; i >= 0; i--) {
        var e = z.el[i];
        e.x += e.v * dt * (z.on ? 1 : 0.2);
        if (e.x > 6.4) { if (e.n && e.n.parentNode) e.n.parentNode.removeChild(e.n); z.el.splice(i, 1); }
      }
      pintarElectrones();
    }
    /* fotograma fijo: puerta encendida y electrones repartidos por las láminas */
    for (var i = 0; i < 18; i++) z.el.push({ s: i % 3, x: 1.6 + R() * 4.8, y: 0.6 + R() * 1.3, v: 2.6 + R() });
    var mot = motor(el, paso);
    var bPuerta = h('button', { type: 'button', class: 'btn small ghost' }, 'Apagar la puerta');
    bPuerta.addEventListener('click', function () {
      z.on = 1 - z.on; z.T = 0; pintarPuerta();
      aviso.textContent = estado.textContent;
    });
    if (!reducido()) mot.play();
    var bPausa = botonPausa(mot);
    el.appendChild(h('div', { class: 't6-nv' }, box, estado, h('div', { class: 'btnrow' }, bPausa, bPuerta), aviso));
    alCambiarAncho(box, construir);
    construir();
  };

  /* =====================================================================
     Nivel 6 · Chip acelerador visto desde arriba
     ===================================================================== */
  W['m2.nv-chip'] = function (el) {
    var box = h('div', { class: 't6-anim' });
    var R = azar(97 + 5 * 13);
    var z = null;
    function construir() {
      var w = Math.max(280, Math.round(box.clientWidth) || 560);
      var H = Math.round(Math.max(230, Math.min(360, w * 0.58)));
      var pk = { x: w * 0.07, y: H * 0.1, w: w * 0.86, h: H * 0.8 };
      var die = { x: w * 0.3, y: H * 0.24, w: w * 0.4, h: H * 0.52 };
      var cols = 12, rows = 8, cw = die.w / cols, chh = die.h / rows, gap = Math.min(2, cw * 0.18);
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + H, class: 't6-svg', role: 'img', 'aria-label': 'Esquema de un acelerador visto desde arriba: en el centro, el chip de cómputo dividido en núcleos; a los lados, pilas de memoria HBM. Los datos viajan desde la memoria hasta los núcleos, que se iluminan al operar.' });
      svg.appendChild(S('rect', { x: pk.x, y: pk.y, width: pk.w, height: pk.h, rx: 16, class: 't6-pk' }));
      svg.appendChild(S('rect', { x: w * 0.1, y: die.y - 12, width: w * 0.8, height: die.h + 24, class: 't6-ip' }));
      var hbm = [];
      for (var i = 0; i < 3; i++) {
        var hy = die.y + i * die.h / 3 + 6, hh = die.h / 3 - 12;
        hbm.push({ x: w * 0.12, y: hy, w: w * 0.12, h: hh, side: 1 });
        hbm.push({ x: w * 0.76, y: hy, w: w * 0.12, h: hh, side: -1 });
      }
      hbm.forEach(function (m) {
        svg.appendChild(S('rect', { x: m.x, y: m.y, width: m.w, height: m.h, class: 't6-hbm' }));
        var d = '';
        for (var k = 1; k < 7; k++) { var yy = (m.y + k * m.h / 7).toFixed(1); d += 'M' + (m.x + 3).toFixed(1) + ' ' + yy + 'H' + (m.x + m.w - 3).toFixed(1); }
        svg.appendChild(S('path', { d: d, class: 't6-hbm-l' }));
      });
      var cores = [];
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        var co = { x: die.x + c * cw + gap, y: die.y + r * chh + gap, w: cw - 2 * gap, h: chh - 2 * gap, f: 0, fp: -1 };
        svg.appendChild(S('rect', { x: co.x, y: co.y, width: co.w, height: co.h, class: 't6-core' }));
        co.n = S('rect', { x: co.x, y: co.y, width: co.w, height: co.h, class: 't6-core-on', 'fill-opacity': 0 });
        svg.appendChild(co.n);
        cores.push(co);
      }
      svg.appendChild(S('rect', { x: die.x, y: die.y, width: die.w, height: die.h, class: 't6-die' }));
      var capa = S('g');
      svg.appendChild(capa);
      etiqueta(svg, hbm[0].x + hbm[0].w / 2, hbm[0].y - 8, 'memoria HBM', w, 't6-lbl t6-lbl-inf');
      etiqueta(svg, die.x + die.w / 2, die.y - 18, 'chip de cómputo', w, 't6-lbl');
      M.clear(box);
      box.appendChild(svg);
      z = { w: w, die: die, cores: cores, hbm: hbm, cols: cols, capa: capa, pkts: [], spk: [], next: 0 };
      fijo();
    }
    function nuevoPaquete() {
      var m = z.hbm[(R() * z.hbm.length) | 0], c = z.cores[(R() * z.cores.length) | 0], die = z.die;
      var sx = m.side > 0 ? m.x + m.w : m.x, sy = m.y + m.h * (0.2 + R() * 0.6);
      var path = [[sx, sy], [m.side > 0 ? die.x : die.x + die.w, sy], [c.x + c.w / 2, sy], [c.x + c.w / 2, c.y + c.h / 2]];
      var L = 0;
      for (var i = 1; i < path.length; i++) L += Math.abs(path[i][0] - path[i - 1][0]) + Math.abs(path[i][1] - path[i - 1][1]);
      var n = S('circle', { r: 3.2, class: 't6-pkt' });
      z.capa.appendChild(n);
      return { path: path, L: L, d: 0, c: c, n: n };
    }
    function posicion(pq) {
      var d = pq.d, x = pq.path[0][0], y = pq.path[0][1];
      for (var s = 1; s < pq.path.length; s++) {
        var a = pq.path[s - 1], b = pq.path[s], l = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
        if (d <= l) { var f = l ? d / l : 0; x = a[0] + (b[0] - a[0]) * f; y = a[1] + (b[1] - a[1]) * f; break; }
        d -= l; x = b[0]; y = b[1];
      }
      return [x, y];
    }
    function quitar(n) { if (n && n.parentNode) n.parentNode.removeChild(n); }
    function pintar() {
      z.cores.forEach(function (c) {
        var o = c.f > 0.05 ? Math.round(c.f * 80) / 100 : 0;
        if (o !== c.fp) { c.n.setAttribute('fill-opacity', o); c.fp = o; }
      });
      z.pkts.forEach(function (pq) { var q = posicion(pq); pq.n.setAttribute('cx', q[0].toFixed(1)); pq.n.setAttribute('cy', q[1].toFixed(1)); });
      z.spk.forEach(function (s) {
        s.n.setAttribute('cx', (s.a.x + s.a.w / 2 + (s.b.x - s.a.x) * s.k).toFixed(1));
        s.n.setAttribute('cy', (s.a.y + s.a.h / 2 + (s.b.y - s.a.y) * s.k).toFixed(1));
      });
    }
    function paso(dt) {
      if (!z) return;
      z.cores.forEach(function (c) { c.f = Math.max(0, c.f - dt * 2); });
      z.next -= dt;
      while (z.next <= 0) { z.next += 0.09; z.pkts.push(nuevoPaquete()); }
      for (var i = z.pkts.length - 1; i >= 0; i--) {
        var pq = z.pkts[i];
        pq.d += dt * pq.L / 1.3;
        if (pq.d >= pq.L) {
          pq.c.f = 1;
          var idx = z.cores.indexOf(pq.c);
          for (var k = 0; k < 2; k++) {
            var j = Math.max(0, Math.min(z.cores.length - 1, idx + [1, -1, z.cols, -z.cols][(R() * 4) | 0]));
            var sn = S('circle', { r: 2.4, class: 't6-spk' });
            z.capa.appendChild(sn);
            z.spk.push({ a: pq.c, b: z.cores[j], k: 0, n: sn });
          }
          quitar(pq.n);
          z.pkts.splice(i, 1);
        }
      }
      for (var s = z.spk.length - 1; s >= 0; s--) {
        var sp = z.spk[s];
        sp.k += dt * 5;
        if (sp.k >= 1) { sp.b.f = Math.max(sp.b.f, 0.6); quitar(sp.n); z.spk.splice(s, 1); }
      }
      pintar();
    }
    /* fotograma fijo: datos a medio camino y algunos núcleos operando */
    function fijo() {
      if (!z || z.pkts.length) return;
      for (var i = 0; i < 14; i++) { var pq = nuevoPaquete(); pq.d = R() * pq.L; z.pkts.push(pq); }
      for (var k = 0; k < 10; k++) z.cores[(R() * z.cores.length) | 0].f = 0.4 + R() * 0.6;
      pintar();
    }
    var mot = motor(el, paso);
    if (!reducido()) mot.play();
    var bPausa = botonPausa(mot);
    var ley = h('ul', { class: 't6-ley-anim' },
      h('li', null, h('i', { class: 't6-sw t6-sw-inf', 'aria-hidden': 'true' }), 'memoria HBM y datos que viajan desde ella'),
      h('li', null, h('i', { class: 't6-sw t6-sw-cmp', 'aria-hidden': 'true' }), 'núcleo que opera al recibir un dato'));
    el.appendChild(h('div', { class: 't6-nv' }, box, ley, h('div', { class: 'btnrow' }, bPausa)));
    alCambiarAncho(box, construir);
    construir();
  };
})();
