/* Laboratorios del Taller 2 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>'].
   Portados de la edición didáctica (ED.W.expo, bucket, estimate, readgraph y 'classify-evidence'):
   mismos datos, mismas instrucciones y mismos textos de retroalimentación. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};
  var S = M.s;
  var nId = 0;
  function uid(pre) { return 't2-' + pre + '-' + (++nId); }

  /* ---------- Números en español (como en la fuente) ---------- */
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  function pE(e) { return m2.pw(e); }
  function sg(n) { return n < 0 ? '−' + Math.abs(n) : String(n); }
  /* «2,95 × 10⁹»: d decimales en la mantisa, sin ceros sobrantes */
  function sciT(v, d) {
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
    var ms = (Math.abs(v) / Math.pow(10, e)).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; ms = (Math.abs(v) / Math.pow(10, e)).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ',');
    return (v < 0 ? '−' : '') + (mant === '1' ? '' : mant + ' × ') + pE(e);
  }

  /* ---------- Movimiento y tamaño ---------- */
  function reducido() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }
  /* Interpolación de 0 a 1; se detiene si la actividad sale de la página */
  function tween(el, dur, fn) {
    if (reducido()) { fn(1); return function () {}; }
    var t0 = null, vivo = true;
    function paso(now) {
      if (!vivo) return;
      if (!el.isConnected) { vivo = false; return; }
      if (t0 === null) t0 = now;
      var t = Math.min(1, (now - t0) / dur);
      fn(1 - Math.pow(1 - t, 3));
      if (t < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
    return function () { vivo = false; };
  }
  /* Vuelve a dibujar cuando cambia el ancho de la caja (las letras no se encogen en el móvil) */
  function alCambiarAncho(el, caja, dibujar) {
    if (!('ResizeObserver' in window)) { window.addEventListener('resize', dibujar); return; }
    var ultimo = 0, visto = false;
    var ro = new ResizeObserver(function () {
      if (el.isConnected) visto = true;
      else if (visto) { ro.disconnect(); return; }
      var w = Math.round(caja.clientWidth);
      if (w >= 120 && Math.abs(w - ultimo) > 1) { ultimo = w; dibujar(); }
    });
    ro.observe(caja);
  }

  /* ---------- SVG ---------- */
  function A(tag, attrs, padre) { var e = S(tag, attrs); if (padre) padre.appendChild(e); return e; }
  function T(padre, x, y, txt, cls, extra) {
    var a = { x: x, y: y, class: cls };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    var t = A('text', a, padre);
    t.textContent = txt;
    return t;
  }
  function lienzo(caja, w, alto, etiqueta) {
    M.clear(caja);
    return A('svg', { viewBox: '0 0 ' + w + ' ' + alto, width: w, height: alto, role: 'img', 'aria-label': etiqueta, focusable: 'false', class: 't2-svg' }, caja);
  }
  function escalaLog(d0, d1, r0, r1) {
    var l0 = Math.log10(d0), l1 = Math.log10(d1);
    var f = function (v) { return r0 + (Math.log10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    return f;
  }
  /* Eje logarítmico horizontal con marcas menores 2–9 */
  function ejeLog(g, sc, e0, e1, y) {
    A('line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't2-ax' }, g);
    for (var e = e0; e <= e1; e++) {
      var x = sc.e(e);
      A('line', { x1: x, x2: x, y1: y, y2: y + 6, class: 't2-tk' }, g);
      T(g, x, y + 19, pE(e), 't2-tl', { 'text-anchor': 'middle' });
      if (e < e1) for (var m = 2; m < 10; m++) { var xm = sc(m * Math.pow(10, e)); A('line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? 4.2 : 2.7), class: 't2-tkm' }, g); }
    }
  }
  /* Marcador por tipo de cifra: rombo lleno medido, círculo lleno estimado, cuadrado declarado,
     rombo hueco proyectado, círculo hueco extrapolado */
  function marcador(g, x, y, st, col, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var cls = hueco ? 't2-hueco t2-s-' + col : 't2-f-' + col + ' t2-ring';
    var grp = A('g', { class: 't2-mk' }, g);
    if (st === 'med' || st === 'proy') A('rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls }, grp);
    else if (st === 'decl') A('rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls }, grp);
    else A('circle', { cx: x, cy: y, r: r * 0.92, class: cls }, grp);
    return grp;
  }
  /* Trama diagonal (proyecciones y zonas hipotéticas) */
  function rayado(svg, cls) {
    var id = uid('rayas');
    var defs = svg.querySelector('defs') || A('defs', null, svg);
    var pat = A('pattern', { id: id, width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    A('line', { x1: 0, y1: 0, x2: 0, y2: 6, class: cls, 'stroke-width': 1.6 }, pat);
    return 'url(#' + id + ')';
  }

  /* ---------- Piezas de interfaz ---------- */
  function fichas(items, alElegir, o) {
    o = o || {};
    var g = h('div', { class: 'chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === o.sel) }, it.l);
      b.addEventListener('click', function () {
        bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        alElegir(it, i);
      });
      g.appendChild(b);
      return b;
    });
    g.botones = bs;
    return g;
  }
  function decir(nodo, texto) { M.clear(nodo); nodo.appendChild(rich(texto)); }
  function linea(caja, k, resto, cls) {
    caja.appendChild(h('div', { class: cls || null }, h('span', { class: 't2-k' }, k), resto));
  }

  /* =====================================================================
     F7 · Máquina de exponentes
     ===================================================================== */
  W['m2.expo'] = function (el) {
    var P = [
      { l: 'Neuronas × sinapsis por neurona', a: [8.6, 10], b: [7, 3], op: '×', ua: 'neuronas', ub: 'sinapsis por neurona', ur: 'sinapsis' },
      { l: 'Potencia del encéfalo × un día', a: [2, 1], b: [8.64, 4], op: '×', ua: 'W (julios por segundo)', ub: 's', ur: 'J' },
      { l: '20 W ÷ 10¹⁵ FLOP/s', a: [2, 1], b: [1, 15], op: '÷', ua: 'W', ub: 'FLOP/s', ur: 'J por operación' },
      { l: '946 MW ÷ 20 W', a: [9.46, 8], b: [2, 1], op: '÷', ua: 'W', ub: 'W por cerebro', ur: 'cerebros (de potencia)' }
    ];
    var cur = P[0];
    var out = h('div', { class: 'm2-out t2-pasos', 'aria-live': 'polite' });
    var say = h('p', { class: 't2-say', 'aria-live': 'polite' });
    var ch = fichas(P, function (x) { cur = x; draw(); }, { label: 'Cuentas del recorrido', sel: 0 });
    function norm(m, e) {
      while (Math.abs(m) >= 10) { m /= 10; e++; }
      while (Math.abs(m) < 1 && m !== 0) { m *= 10; e--; }
      return [m, e];
    }
    function f(v) { return fmt(v, Math.abs(v - Math.round(v)) < 1e-9 ? 0 : 2).replace(/(,\d*?)0+$/, '$1').replace(/,$/, ''); }
    function draw() {
      var ma = cur.a[0], ea = cur.a[1], mb = cur.b[0], eb = cur.b[1], mul = cur.op === '×';
      var mr = mul ? ma * mb : ma / mb, er = mul ? ea + eb : ea - eb;
      var nr = norm(mr, er), mn = nr[0], en = nr[1];
      var reajuste = Math.abs(mr) >= 10 || Math.abs(mr) < 1;
      M.clear(out);
      linea(out, 'Cuenta: ', '(' + f(ma) + ' × ' + pE(ea) + ' ' + cur.ua + ') ' + cur.op + ' (' + f(mb) + ' × ' + pE(eb) + ' ' + cur.ub + ')', 't2-cuenta');
      linea(out, '1. Mantisas: ', f(ma) + ' ' + cur.op + ' ' + f(mb) + ' = ' + f(mr));
      linea(out, '2. Exponentes (' + (mul ? 'se suman' : 'se restan') + '): ', sg(ea) + (mul ? ' + ' : ' − ') + (eb < 0 ? '(' + sg(eb) + ')' : eb) + ' = ' + sg(er));
      linea(out, '3. Juntar: ', f(mr) + ' × ' + pE(er) + (reajuste ? ' = ' + f(mn) + ' × ' + pE(en) + ' (mantisa reajustada)' : ''));
      linea(out, 'Resultado: ', h('b', null, f(mn) + ' × ' + pE(en) + ' ' + cur.ur), 't2-res');
      decir(say, 'Las unidades también se operan: **' + cur.ua + '** ' + cur.op + ' **' + cur.ub + '** → **' + cur.ur + '**.' +
        (cur.ur.indexOf('cerebros') >= 0 ? ' Ojo: «cerebros» aquí solo significa «potencias de 20 W», no capacidad de pensar.' : ''));
    }
    el.appendChild(h('div', { class: 't2-lab' },
      p('Elige una cuenta del recorrido y sigue los tres pasos: mantisas, exponentes y resultado.', { class: 'w-note' }),
      ch, out, say));
    draw();
  };

  /* =====================================================================
     F8 · El grifo y el cubo
     ===================================================================== */
  W['m2.bucket'] = function (el) {
    var DOM = [
      { l: 'agua', r: 'litros por minuto', t: 'minutos', tot: 'litros', rk: 'L/min' },
      { l: 'energía', r: 'vatios (J/s)', t: 'segundos', tot: 'julios', rk: 'W' },
      { l: 'cómputo', r: 'FLOP/s', t: 'segundos', tot: 'FLOP', rk: 'FLOP/s' },
      { l: 'información', r: 'bits/s', t: 'segundos', tot: 'bits', rk: 'bits/s' },
      { l: 'impulsos', r: 'hercios (impulsos/s)', t: 'segundos', tot: 'impulsos', rk: 'Hz' }
    ];
    var d = DOM[0], rate = 10, tm = 5, fill = 1, cancelar = null;
    var caja = h('div', { class: 't2-svgbox t2-cubo' });
    var out = h('div', { class: 'm2-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't2-say', 'aria-live': 'polite' });
    function parar() { if (cancelar) { cancelar(); cancelar = null; } }
    var rr = m2.deslizador({ id: uid('ritmo'), etiqueta: 'Ritmo', min: 1, max: 20, step: 1, valor: 10,
      formato: function (v) { return v + ' ' + d.rk; }, alCambiar: function (v) { rate = v; parar(); fill = 1; draw(); textos(); } });
    var rt = m2.deslizador({ id: uid('tiempo'), etiqueta: 'Tiempo', min: 1, max: 30, step: 1, valor: 5,
      formato: function (v) { return v + ' ' + d.t; }, alCambiar: function (v) { tm = v; parar(); fill = 1; draw(); textos(); } });
    var dom = fichas(DOM, function (x) { d = x; rr.poner(rate); rt.poner(tm); draw(); textos(); }, { label: 'Qué fluye', sel: 0 });
    var play = h('button', { type: 'button', class: 'btn small' }, '▶ Abrir el grifo desde cero');
    play.addEventListener('click', function () {
      parar(); fill = 0; draw();
      cancelar = tween(el, 1600, function (t) { fill = t; draw(); });
    });
    function draw() {
      var Wd = 300, H = 210, cap = 600, tot = rate * tm, lvl = tot * fill;
      var svg = lienzo(caja, Wd, H, 'Cubo con ' + fmt(lvl) + ' ' + d.tot + ' de ' + fmt(cap));
      A('path', { d: 'M40 20h70v14h-16v10h-38v-10h-16z', class: 't2-l' }, svg);
      A('line', { x1: 75, x2: 75, y1: 48, y2: 94, class: 't2-chorro', 'stroke-width': Math.max(1, rate / 3), 'stroke-dasharray': '4 4' }, svg);
      var bx = 40, by = 100, bw = 90, bh = 100, k = Math.min(1, lvl / cap);
      A('path', { d: 'M' + bx + ',' + by + 'h' + bw + 'l-8,' + bh + 'h' + (-bw + 16) + 'z', class: 't2-f' }, svg);
      var yy = by + bh - bh * k;
      A('path', { d: 'M' + (bx + 8 * (1 - k)) + ',' + yy + 'H' + (bx + bw - 8 * (1 - k)) + 'L' + (bx + bw - 8) + ',' + (by + bh) + 'H' + (bx + 8) + 'z', class: 't2-nivel' }, svg);
      T(svg, 150, 40, 'ritmo: ' + rate + ' ' + d.rk, 't2-lbs');
      T(svg, 150, 64, 'tiempo: ' + fmt(tm * fill, fill < 1 ? 1 : 0) + ' ' + d.t, 't2-lbs');
      T(svg, 150, 160, 'total: ' + fmt(lvl, 0) + ' ' + d.tot, 't2-lb');
    }
    /* La lectura y la explicación no cambian durante la animación: se escriben solo al mover un control */
    function textos() {
      M.clear(out);
      out.appendChild(h('div', null, h('span', { class: 't2-k' }, 'total = ritmo × tiempo = '),
        rate + ' ' + d.rk + ' × ' + tm + ' ' + d.t + ' = ', h('b', null, fmt(rate * tm) + ' ' + d.tot)));
      decir(say, d.l === 'agua'
        ? 'Con el doble de tiempo, el mismo grifo acumula el doble. Con el doble de ritmo durante la mitad de tiempo, el total no cambia.'
        : 'Es la misma cuenta con otra «agua»: **' + d.r + '** (un ritmo) por **' + d.t + '** dan **' + d.tot + '** (un total).' +
          (d.l === 'energía' ? ' Por eso un aparato de 20 W encendido una hora gasta 20 × 3.600 = 72.000 J.' : ''));
    }
    el.appendChild(h('div', { class: 't2-lab' },
      p('Mueve el ritmo y el tiempo, y cambia lo que fluye: la relación no cambia.', { class: 'w-note' }),
      dom,
      h('div', { class: 't2-cubo-grid' }, caja,
        h('div', { class: 't2-ctrl' },
          rr.el, p('El **ritmo** es cuánto llega en cada unidad de tiempo.', { class: 'w-note-s' }),
          rt.el, p('El **tiempo** es cuánto rato está abierto el grifo.', { class: 'w-note-s' }),
          h('div', { class: 'btnrow' }, play))),
      out, say));
    draw();
    textos();
  };

  /* =====================================================================
     F9 · Estimar con intervalos
     ===================================================================== */
  W['m2.estimate'] = function (el) {
    var bpm = 70, mb = 15, yrs = 80, my = 10;
    var out = h('div', { class: 'm2-out', 'aria-live': 'polite' });
    var say = h('p', { class: 't2-say', 'aria-live': 'polite' });
    var caja = h('div', { class: 't2-svgbox' });
    var MIN_Y = 525960; /* minutos en un año de 365,25 días */
    var listo = false;
    function upd() { if (listo) { draw(); textos(); } }
    var r1 = m2.deslizador({ id: uid('pulso'), etiqueta: 'Supuesto 1 · pulsaciones por minuto (valor central)', min: 50, max: 100, valor: 70,
      formato: function (v) { return v + ' por minuto'; }, alCambiar: function (v) { bpm = v; upd(); } });
    var r2 = m2.deslizador({ id: uid('margen1'), etiqueta: 'Margen del supuesto 1', min: 0, max: 40, valor: 15,
      formato: function (v) { return '± ' + v + ' %'; }, alCambiar: function (v) { mb = v; upd(); } });
    var r3 = m2.deslizador({ id: uid('anios'), etiqueta: 'Supuesto 2 · años de vida (valor central)', min: 50, max: 100, valor: 80,
      formato: function (v) { return v + ' años'; }, alCambiar: function (v) { yrs = v; upd(); } });
    var r4 = m2.deslizador({ id: uid('margen2'), etiqueta: 'Margen del supuesto 2', min: 0, max: 30, valor: 10,
      formato: function (v) { return '± ' + v + ' %'; }, alCambiar: function (v) { my = v; upd(); } });
    function cuentas() {
      return {
        c: bpm * MIN_Y * yrs,
        lo: bpm * (1 - mb / 100) * MIN_Y * yrs * (1 - my / 100),
        hi: bpm * (1 + mb / 100) * MIN_Y * yrs * (1 + my / 100)
      };
    }
    function textos() {
      var r = cuentas(), c = r.c, lo = r.lo, hi = r.hi;
      M.clear(out);
      out.appendChild(h('div', null, h('span', { class: 't2-k' }, 'Central: '), bpm + ' × 525.960 min/año × ' + yrs + ' años ≈ ', h('b', null, sciT(c, 2)), ' latidos'));
      out.appendChild(h('div', null, h('span', { class: 't2-k' }, 'Intervalo: '), sciT(lo, 1) + ' – ' + sciT(hi, 1) + ' (el alto es ' + fmt(hi / lo, 2) + ' veces el bajo)'));
      decir(say, 'Cada margen ensancha el resultado. Con ±' + mb + ' % y ±' + my + ' %, el extremo alto es **' + fmt(hi / lo, 2) + ' veces** el bajo. ' +
        (mb + my === 0 ? 'Sin márgenes no hay intervalo, pero tampoco honestidad: los supuestos nunca son exactos.' : 'Una persona razonable con otros supuestos daría otro valor central dentro de esta zona.'));
    }
    function draw() {
      var r = cuentas(), c = r.c, lo = r.lo, hi = r.hi;
      var w = Math.max(280, Math.round(caja.clientWidth) || 520), x0 = 16, x1 = w - 16, y = 52;
      var svg = lienzo(caja, w, 92, 'Intervalo de la estimación en escala logarítmica de mil millones a diez mil millones');
      var sc = escalaLog(1e9, 1e10, x0, x1);
      ejeLog(svg, sc, 9, 10, y + 12);
      var xa = sc(Math.max(lo, 1e9)), xb = sc(Math.min(hi, 1e10));
      A('rect', { x: xa, y: y - 6, width: Math.max(2, xb - xa), height: 12, rx: 6, class: 't2-rng-cnt' }, svg);
      marcador(svg, sc(c), y, 'est', 'cnt', 7);
      T(svg, x0 - 2, 16, w < 460 ? 'círculo: valor central · barra: intervalo' : 'Tu estimación (círculo: valor central; barra: intervalo)', 't2-lbx');
    }
    el.appendChild(h('div', { class: 't2-lab' },
      p('Un ejemplo sin relación con el cerebro para practicar: ¿cuántas veces late un corazón a lo largo de una vida? Los valores son supuestos tuyos, no datos.', { class: 'w-note' }),
      h('div', { class: 'm2-grid2 t2-ctrls' }, r1.el, r2.el, r3.el, r4.el),
      caja, out, say));
    listo = true;
    draw();
    textos();
    alCambiarAncho(el, caja, draw);
  };

  /* =====================================================================
     F10 · Anatomía de una gráfica
     ===================================================================== */
  W['m2.readgraph'] = function (el) {
    var PARTS = [
      { k: 'q', l: '1 · La pregunta', t: 'El título dice qué pregunta responde la figura: aquí, «¿cuánta potencia consume cada sistema?». Si la pregunta no está clara, nada de lo demás lo estará.' },
      { k: 'ax', l: '2 · El eje y su unidad', t: 'El eje horizontal mide **potencia en vatios (W)**. Cada posición es una cantidad de vatios; la etiqueta del eje lo dice.' },
      { k: 'sc', l: '3 · La escala', t: 'Es **logarítmica**: las marcas 10¹, 10³, 10⁵… están igual de separadas y entre ellas hay rayitas cada vez más juntas. Cada tramo multiplica por 100 (dos órdenes de magnitud por marca).' },
      { k: 'mk', l: '4 · La forma del marcador', t: 'Rombo lleno: **medido**; círculo lleno: **estimado**; cuadrado: **declarado**. La forma dice la confianza del dato, sin depender del color.' },
      { k: 'rg', l: '5 · Un intervalo', t: 'La barra alargada marca un **intervalo**: el valor podría estar en cualquier punto entre sus extremos (aquí, de 4 a 16 GW, un escenario).' },
      { k: 'ref', l: '6 · Una referencia', t: 'La línea discontinua es una **referencia** para comparar: aquí, la potencia de un cerebro, 20 W.' },
      { k: 'hat', l: '7 · Una trama', t: 'La trama de rayas indica una **proyección** o una zona hipotética: no es una observación.' },
      { k: 'col', l: '8 · El color', t: 'El color ámbar dice la **dimensión**: energía. Las cifras de cómputo serían verde azulado; las de cantidad, azules; las de información, rosas.' }
    ];
    var caja = h('div', { class: 't2-svgbox t2-graf' });
    var say = h('p', { class: 't2-say', 'aria-live': 'polite' });
    var on = null;
    var ch = fichas(PARTS, function (x) { on = x.k; draw(); decir(say, x.t); }, { label: 'Partes de la gráfica' });
    /* Tocar una parte del dibujo equivale a pulsar su botón */
    caja.addEventListener('click', function (ev) {
      var g = ev.target.closest && ev.target.closest('[data-part]');
      if (!g) return;
      var i = PARTS.map(function (x) { return x.k; }).indexOf(g.getAttribute('data-part'));
      if (i >= 0) ch.botones[i].click();
    });
    function draw() {
      var w = Math.max(300, Math.round(caja.clientWidth) || 560), x0 = 20, x1 = w - 20, y = 120, hh = 180;
      var svg = lienzo(caja, w, hh, 'Gráfica de ejemplo con sus partes: pregunta, eje, escala logarítmica, marcadores, intervalo, referencia y trama');
      var sc = escalaLog(1, 1e11, x0, x1);
      var g = function (k) { var gg = A('g', { 'data-part': k, class: 't2-parte' + (on === k ? ' on' : '') }, svg); if (on && on !== k) gg.setAttribute('opacity', '.32'); return gg; };
      var gh = g('hat'), hp = rayado(svg, 't2-s-nrg');
      var xh = sc(4e9);
      A('rect', { x: xh, y: 36, width: Math.max(4, Math.min(sc(16e9) + 60, w - 2) - xh), height: y - 40, fill: hp, opacity: 0.3 }, gh);
      T(g('q'), x0, 18, w < 460 ? '¿Cuánta potencia consume? (ejemplo)' : '¿Cuánta potencia consume cada sistema? (ejemplo)', 't2-lb');
      var ga = g('ax');
      A('line', { x1: x0, x2: x1, y1: y, y2: y, class: 't2-ax' }, ga);
      T(ga, x1, hh - 6, 'vatios (W) · escala logarítmica', 't2-lbx', { 'text-anchor': 'end' });
      var gs = g('sc'), e, m;
      for (e = 1; e <= 11; e += 2) {
        A('line', { x1: sc.e(e), x2: sc.e(e), y1: y, y2: y + 7, class: 't2-tk' }, gs);
        T(gs, sc.e(e), y + 22, pE(e), 't2-tl', { 'text-anchor': 'middle' });
      }
      for (e = 0; e < 11; e++) for (m = 2; m < 10; m++) A('line', { x1: sc(m * Math.pow(10, e)), x2: sc(m * Math.pow(10, e)), y1: y, y2: y + 3.5, class: 't2-tkm' }, gs);
      var gr = g('ref');
      A('line', { x1: sc(20), x2: sc(20), y1: 34, y2: y, class: 't2-ref' }, gr);
      T(gr, sc(20) + 5, 44, '1 cerebro = 20 W', 't2-lbx');
      var gm = g('mk');
      marcador(gm, sc(20), 84, 'est', 'nrg', 6);
      marcador(gm, sc(700), 84, 'decl', 'nrg', 6);
      marcador(gm, sc(24.6e6), 84, 'med', 'nrg', 6);
      T(gm, sc(700), 70, 'H100', 't2-lbx', { 'text-anchor': 'middle' });
      T(gm, sc(24.6e6), 70, 'Frontier', 't2-lbx', { 'text-anchor': 'middle' });
      var gg2 = g('rg');
      A('rect', { x: sc(4e9), y: 79, width: sc(16e9) - sc(4e9), height: 10, rx: 5, class: 't2-rng-nrg' }, gg2);
      T(gg2, sc(8e9), 70, '4–16 GW', 't2-lbx', { 'text-anchor': 'middle' });
      var gc = g('col');
      A('rect', { x: x1 - 120, y: 26, width: 10, height: 10, rx: 2, class: 't2-f-nrg' }, gc);
      T(gc, x1 - 105, 35, 'ámbar = energía', 't2-lbx');
    }
    el.appendChild(h('div', { class: 't2-lab' },
      p('Pulsa cada parte para resaltarla en la gráfica de ejemplo y leer qué significa. Los datos son del recorrido; la combinación es solo para practicar.', { class: 'w-note' }),
      ch, caja, say));
    say.textContent = 'Empieza por «1 · La pregunta» y avanza en orden.';
    draw();
    alCambiarAncho(el, caja, draw);
  };

  /* =====================================================================
     F10 · Leyenda del recorrido (imagen de la lección: solo repite el texto)
     ===================================================================== */
  W['m2.leyenda-f10'] = function (el) {
    function ico(dibujar) {
      var svg = A('svg', { viewBox: '0 0 28 18', width: 28, height: 18, 'aria-hidden': 'true', focusable: 'false', class: 't2-ico' });
      dibujar(svg);
      return svg;
    }
    function item(icono, a, b) { return h('li', null, icono, h('span', null, h('b', null, a), ' ', b)); }
    var dims = [['cnt', 'azul', 'cantidad'], ['cmp', 'verde azulado', 'cómputo'], ['nrg', 'ámbar', 'energía'], ['inf', 'rosa', 'información'], ['gris', 'gris', 'otras']];
    var formas = [['med', 'rombo lleno', 'medido'], ['est', 'círculo lleno', 'estimado'], ['decl', 'cuadrado lleno', 'declarado'], ['proy', 'rombo hueco', 'proyectado'], ['extr', 'círculo hueco', 'extrapolado']];
    var lista1 = h('ul', { class: 't2-ley' }, dims.map(function (x) {
      return item(ico(function (s) { A('rect', { x: 4, y: 3, width: 20, height: 12, rx: 3, class: 't2-f-' + x[0] }, s); }), x[1] + ':', x[2]);
    }));
    var lista2 = h('ul', { class: 't2-ley' }, formas.map(function (x) {
      return item(ico(function (s) { marcador(s, 14, 9, x[0], 'ink', 7); }), x[1] + ',', x[2]);
    }));
    var lista3 = h('ul', { class: 't2-ley t2-ley-1' },
      item(ico(function (s) { A('rect', { x: 2, y: 5, width: 24, height: 8, rx: 4, class: 't2-rng-ink' }, s); marcador(s, 14, 9, 'est', 'ink', 5); }), 'Una barra alrededor de un punto:', 'un intervalo'),
      item(ico(function (s) { A('line', { x1: 2, x2: 26, y1: 9, y2: 9, class: 't2-ref' }, s); }), 'Una línea discontinua:', 'una referencia'),
      item(ico(function (s) { var hp = rayado(s, 't2-s-ink'); A('rect', { x: 2, y: 2, width: 24, height: 14, rx: 2, fill: hp, class: 't2-trama' }, s); }), 'Una trama de rayas:', 'una proyección o una zona hipotética'));
    el.appendChild(h('div', { class: 't2-leyenda' },
      h('div', null, h('p', { class: 't2-ley-t' }, 'El color: la dimensión'), lista1),
      h('div', null, h('p', { class: 't2-ley-t' }, 'La forma del marcador: la confianza del dato'), lista2),
      h('div', null, h('p', { class: 't2-ley-t' }, 'Otros signos'), lista3)));
  };

  /* =====================================================================
     F11 · Clasificar cifras por su tipo de evidencia
     ===================================================================== */
  var EVC = [{ k: 'med', label: 'medido' }, { k: 'est', label: 'estimado' }, { k: 'decl', label: 'declarado' }, { k: 'proy', label: 'proyectado' }, { k: 'extr', label: 'extrapolado' }];
  W['m2.classify-evidence'] = function (el) {
    m2.clasificar(el, {
      intro: 'Clasifica cada afirmación del recorrido. Tras elegir, lee la explicación: el primer intento cuenta para la puntuación.',
      cats: EVC,
      items: [
        { t: 'LineShine sostuvo 2,198 EFLOP/s en la prueba HPL de la lista TOP500 de junio de 2026.', ok: 'med', fb: 'Es un resultado en una clasificación oficial de rendimiento: medido.' },
        { t: 'Intel afirma que Hala Point integra 1.150 millones de neuronas de silicio.', ok: 'decl', fb: 'Lo dice el fabricante, sin evaluación independiente publicada: declarado.' },
        { t: 'El encéfalo humano tiene unos 86.000 millones de neuronas.', ok: 'est', fb: 'Procede de recuentos por muestreo en pocos encéfalos, con supuestos y un margen considerable: el recorrido la marca como estimada.' },
        { t: 'FugakuNEXT superará los 600 EFLOP/s en FP8 con dispersión hacia 2030.', ok: 'proy', fb: 'Es un objetivo de diseño para el futuro: proyectado.' },
        { t: 'A un 25 % anual, el sistema líder rondaría 20 EFLOP/s en 2036.', ok: 'extr', fb: 'Es un cálculo del recorrido que prolonga una tendencia con una tasa supuesta: extrapolado.' },
        { t: 'Con la convención de 10¹⁵ FLOP/s, el cerebro gastaría unos 2 × 10⁻¹⁴ J por operación.', ok: 'extr', fb: 'Es una división hecha por el propio recorrido (20 W ÷ 10¹⁵ FLOP/s) bajo una convención: extrapolado.' },
        { t: 'En rebanadas de corteza humana, las interneuronas rápidas alcanzaron de media 453 Hz de frecuencia instantánea máxima (n = 92).', ok: 'med', fb: 'Es una medición experimental publicada con revisión por pares: medido.' },
        { t: 'Carlsmith (2020) considera plausible que igualar al cerebro exija de 10¹³ a 10¹⁷ FLOP/s.', ok: 'est', fb: 'Es un juicio experto probabilístico, con supuestos explícitos: estimado.' },
        { t: 'IBM prevé en 2029 un sistema que ejecute 10⁸ puertas lógicas sobre 200 cúbits lógicos (Starling).', ok: 'proy', fb: 'Es una hoja de ruta de la empresa: proyectado.' }
      ]
    });
  };
})();
