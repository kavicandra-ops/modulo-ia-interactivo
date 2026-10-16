/* Laboratorios del Taller 9 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =====================================================================
     Utilidades comunes de este taller
     ===================================================================== */
  var L10 = Math.log10, P10 = function (e) { return Math.pow(10, e); }, TAU = Math.PI * 2;
  var MQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reducido() { return !!(MQ && MQ.matches); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  var SUPM = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '−': '⁻' };
  function supU(n) { return String(n).split('').map(function (c) { return SUPM[c] !== undefined ? SUPM[c] : c; }).join(''); }
  function pw(e) { return '10' + supU(e < 0 ? '−' + Math.abs(e) : e); }
  /* 2.198e18 → «2,2 × 10¹⁸» (como el original) */
  function sci(v, d, keepOne) {
    if (d == null) d = 1;
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(L10(Math.abs(v)) + 1e-9), m = v / P10(e), ms = Math.abs(m).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; m = v / P10(e); ms = Math.abs(m).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ',');
    if (mant === '1' && !keepOne) return (v < 0 ? '−' : '') + pw(e);
    return (v < 0 ? '−' : '') + mant + ' × ' + pw(e);
  }
  /* número con 2–3 cifras significativas */
  function nice(v) {
    if (!isFinite(v)) return '∞';
    var a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 1e6 || a < 1e-3) return sci(v, a >= 1e6 ? 2 : 1, true).replace(/,0+ ×/, ' ×');
    var d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    return fmt(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  }
  /* generador pseudoaleatorio con semilla: los dibujos son estables entre recargas */
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var nId = 0;
  function uid(pref) { return 't9-' + pref + '-' + (++nId); }

  /* ---------- SVG ---------- */
  function sv(tag, attrs, parent) { var e = M.s(tag, attrs); if (parent) parent.appendChild(e); return e; }
  function tx(parent, x, y, text, cls, extra) { var t = sv('text', Object.assign({ x: x, y: y, class: cls }, extra || {}), parent); t.textContent = text; return t; }
  function lienzo(host, w, hh, label) {
    M.clear(host);
    return sv('svg', { viewBox: '0 0 ' + w + ' ' + hh, class: 't9-svg', role: 'img', 'aria-label': label || '', focusable: 'false' }, host);
  }
  function ancho(box, def) { var w = Math.round(box.clientWidth || 0); return Math.max(260, w || def); }
  /* Vuelve a dibujar cuando cambia el ancho real de la caja (así los rótulos se leen a su tamaño) */
  function alCambiarAncho(box, fn) {
    if (!('ResizeObserver' in window)) return;
    var ult = 0, visto = false;
    var ro = new ResizeObserver(function () {
      if (!box.isConnected) { if (visto) ro.disconnect(); return; }
      visto = true;
      var w = Math.round(box.clientWidth);
      if (w > 0 && Math.abs(w - ult) > 1) { ult = w; fn(); }
    });
    ro.observe(box);
  }
  /* Añade una clase a la sección que contiene el widget (para dar formato a sus desplegables) */
  function marcarSeccion(el, clase) {
    var intentos = 0;
    (function mirar() {
      var seg = el.closest && el.closest('.seg');
      if (seg) { seg.classList.add(clase); return; }
      if (++intentos < 40) setTimeout(mirar, 50);
    })();
  }

  /* ---------- Escalas y ejes logarítmicos ---------- */
  function escalaLog(d0, d1, r0, r1) {
    var l0 = L10(d0), l1 = L10(d1);
    var f = function (v) { return r0 + (L10(Math.max(v, 1e-300)) - l0) / (l1 - l0) * (r1 - r0); };
    f.e = function (e) { return r0 + (e - l0) / (l1 - l0) * (r1 - r0); };
    return f;
  }
  function ejeLogX(g, sc, e0, e1, y, o) {
    o = o || {};
    var paso = o.every || 1, lab = o.label || pw, tick = 6, e, m;
    if (o.bands) for (e = e0; e < e1; e++) if ((e - e0) % 2 === 0) sv('rect', { x: sc.e(e), y: o.bands[0], width: sc.e(e + 1) - sc.e(e), height: o.bands[1] - o.bands[0], class: 't9-band' }, g);
    if (o.grid) for (e = e0; e <= e1; e++) sv('line', { x1: sc.e(e), x2: sc.e(e), y1: o.grid[0], y2: o.grid[1], class: 't9-gl' }, g);
    sv('line', { x1: sc.e(e0), x2: sc.e(e1), y1: y, y2: y, class: 't9-ax' }, g);
    for (e = e0; e <= e1; e++) {
      var x = sc.e(e);
      sv('line', { x1: x, x2: x, y1: y, y2: y + tick, class: 't9-ax' }, g);
      if ((e - e0) % paso === 0) tx(g, x, y + tick + 13, lab(e), 't9-tl', { 'text-anchor': 'middle' });
      if (e < e1) for (m = 2; m < 10; m++) { var xm = sc(m * P10(e)); sv('line', { x1: xm, x2: xm, y1: y, y2: y + (m === 5 ? tick * 0.7 : tick * 0.45), class: 't9-tkm' }, g); }
    }
  }
  /* Marcador por tipo de cifra: rombo medido, círculo estimado, cuadrado declarado, huecos proyectado y extrapolado */
  function marcador(g, x, y, st, col, r) {
    r = r || 5.5;
    var hueco = st === 'proy' || st === 'extr';
    var cls = hueco ? 't9-mk-hueco t9-s-' + col : 't9-f-' + col + ' t9-ring';
    var grp = sv('g', { class: 't9-mk' }, g);
    if (st === 'med' || st === 'proy') sv('rect', { x: x - r * 0.78, y: y - r * 0.78, width: r * 1.56, height: r * 1.56, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls, 'stroke-width': 2 }, grp);
    else if (st === 'decl') sv('rect', { x: x - r * 0.8, y: y - r * 0.8, width: r * 1.6, height: r * 1.6, rx: 1.2, class: cls, 'stroke-width': 2 }, grp);
    else sv('circle', { cx: x, cy: y, r: r * 0.92, class: cls, 'stroke-width': 2 }, grp);
    return grp;
  }
  function corchete(g, xa, xb, y, texto) {
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), grp = sv('g', { class: 't9-rb' }, g);
    sv('path', { d: 'M' + x0 + ',' + (y + 5) + 'V' + y + 'H' + x1 + 'V' + (y + 5), class: 't9-rb-l' }, grp);
    if (texto) tx(grp, (x0 + x1) / 2, y - 6, texto, 't9-rb-t', { 'text-anchor': 'middle' });
    return grp;
  }
  var ordTxt = function (v) { return fmt(Math.abs(v), Math.abs(v) < 9.95 ? 1 : 0); };

  /* ---------- Lectura flotante (cursor o foco) ---------- */
  function tipHtml(lines) {
    return lines.filter(Boolean).map(function (l, i, a) {
      if (i === 0) return '<b>' + esc(l) + '</b>';
      if (i === a.length - 1 && a.length > 2) return '<span class="t9-tip-s">' + esc(l) + '</span>';
      return esc(l);
    }).join('<br>');
  }
  function conTip(node, lines) {
    node.setAttribute('tabindex', '0');
    var ver = function (x, y) { if (M.tipShow) M.tipShow(tipHtml(lines), x, y); };
    node.addEventListener('pointerenter', function (e) { node.classList.add('t9-on'); ver(e.clientX, e.clientY); });
    node.addEventListener('pointermove', function (e) { ver(e.clientX, e.clientY); });
    node.addEventListener('pointerleave', function () { node.classList.remove('t9-on'); if (M.tipHide) M.tipHide(); });
    node.addEventListener('focus', function () { node.classList.add('t9-on'); var r = node.getBoundingClientRect(); ver(r.left + r.width / 2, r.top); });
    node.addEventListener('blur', function () { node.classList.remove('t9-on'); if (M.tipHide) M.tipHide(); });
  }

  /* ---------- Piezas de interfaz ---------- */
  function boton(txt, cls, fn) { var b = h('button', { type: 'button', class: 'btn small' + (cls ? ' ' + cls : '') }, txt); if (fn) b.addEventListener('click', fn); return b; }
  /* Deslizador con etiqueta y lectura que se puede mover desde el código sin disparar su acción */
  function deslizador(o) {
    var id = uid('r');
    var out = h('output', { class: 'desl-v', for: id });
    var inp = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    var wrap = h('div', { class: 'desl t9-desl' }, h('label', { for: id }, rich(o.label)), inp, out);
    if (o.help) wrap.appendChild(p(o.help, { class: 'w-note-s t9-help' }));
    var upd = function () { out.textContent = o.fmt ? o.fmt(+inp.value) : inp.value; };
    inp.addEventListener('input', function () { upd(); if (o.on) o.on(+inp.value); });
    upd();
    return { wrap: wrap, inp: inp, set: function (v) { inp.value = v; upd(); } };
  }
  function grupoChips(items, on, o) {
    o = o || {};
    var g = h('div', { class: 'chips', role: 'group', 'aria-label': o.label || 'Opciones' });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === o.sel) }, it.l);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); on(it, i); });
      g.appendChild(b); return b;
    });
    g.pick = function (i) { bs.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === i)); }); };
    return g;
  }
  function salida() { return h('div', { class: 'm2-out t9-out', 'aria-live': 'polite' }); }
  function dice() { return h('p', { class: 't9-say', 'aria-live': 'polite' }); }
  function k(t) { return h('span', { class: 't9-k' }, t); }
  function mini(t) { return p(t, { class: 'w-note-s t9-mini' }); }

  /* =====================================================================
     II.3 · Reloj frente a eventos
     ===================================================================== */
  W['m2.events'] = function (el) {
    var N = 100, act = 10, tick = 1;
    var out = salida(), say = dice();
    var r = deslizador({ label: 'Actividad: unidades que reciben un impulso en cada instante', min: 1, max: 100, value: 10, fmt: function (v) { return v + ' %'; }, on: function (v) { act = v; draw(); },
      help: 'Este control fija lo dispersa que es la actividad. Importa porque el procesamiento por eventos solo trabaja con las unidades activas.' });
    var nx = boton('Siguiente instante', '', function () { tick++; draw(); });
    var labR = h('p', { class: 't9-ev-l' }), labE = h('p', { class: 't9-ev-l' });
    var boxR = h('div', { class: 't9-ev-g' }), boxE = h('div', { class: 't9-ev-g' });
    var grids = h('div', { class: 't9-ev', role: 'img' }, h('div', null, labR, boxR), h('div', null, labE, boxE));
    function rejilla(box, activa, cls) {
      var svg = lienzo(box, 150, 150, '');
      svg.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < N; i++) sv('rect', { x: (i % 10) * 15 + 1, y: Math.floor(i / 10) * 15 + 1, width: 12.5, height: 12.5, rx: 2.5, class: activa(i) ? cls : 't9-off' }, svg);
    }
    function draw() {
      var R = rng(tick * 97 + 13), idx = [], i;
      for (i = 0; i < N; i++) idx.push(i);
      for (i = N - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)), t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
      var kk = Math.round(act), on = {};
      idx.slice(0, kk).forEach(function (x) { on[x] = true; });
      labR.textContent = 'Por reloj: trabajan 100';
      labE.textContent = 'Por eventos: trabajan ' + kk;
      rejilla(boxR, function () { return true; }, 't9-on-cmp');
      rejilla(boxE, function (x) { return !!on[x]; }, 't9-on-cnt');
      grids.setAttribute('aria-label', 'A la izquierda, por reloj, trabajan las 100 unidades; a la derecha, por eventos, trabajan ' + kk);
      M.clear(out);
      out.appendChild(h('span', null, k('Actualizaciones en este instante: '), 'reloj 100 · eventos ' + kk));
      out.appendChild(h('span', null, k('Trabajo ahorrado por los eventos: '), h('b', null, (100 - kk) + ' %'), ' (factor ' + nice(100 / kk) + ')'));
      say.textContent = kk <= 10 ? 'Con actividad dispersa, la mayoría descansa: es el terreno de los chips neuromórficos. La eficiencia de Hala Point se midió con un 10 % de actividad.' : kk >= 70 ? 'Con tanta actividad, la ventaja casi desaparece: trabajar por eventos se parece a trabajar por reloj.' : 'El ahorro baja a medida que sube la actividad.';
    }
    el.appendChild(h('div', { class: 't9-lab' }, mini('Cien unidades. Ilustración: solo cuenta las actualizaciones; ignora la comunicación, la memoria y el costo de detectar los eventos.'),
      r.wrap, h('div', { class: 'btnrow' }, nx), grids, out, say));
    draw();
  };

  /* =====================================================================
     III.3 · Especialistas, no sustitutos
     ===================================================================== */
  W['m2.classify-specialists'] = function (el) {
    m2.clasificar(el, {
      intro: '¿Encaja cada tarea con la ventaja demostrada de los chips neuromórficos (eventos escasos y respuesta rápida, en el borde de la red)? Clasifícala y lee la explicación.',
      cats: [{ k: 'si', label: 'encaja con su ventaja' }, { k: 'no', label: 'mejor otra arquitectura' }],
      items: [
        { t: 'Un sensor de visión que solo reacciona cuando algo se mueve en la escena.', ok: 'si', fb: 'Eventos escasos y necesidad de responder rápido: el terreno donde el original sitúa su ventaja.' },
        { t: 'Entrenar un modelo de lenguaje de frontera con ~10²⁷ operaciones.', ok: 'no', fb: 'Es cómputo denso y masivo: el terreno de los centros de datos con aceleradores. El original no atribuye ventaja demostrada a los neuromórficos aquí.' },
        { t: 'Un brazo robótico que debe reaccionar en milisegundos a lo que toca.', ok: 'si', fb: 'Baja latencia y señales que llegan como eventos: robótica es uno de los ejemplos del original.' },
        { t: 'Simular el clima en doble precisión (FP64).', ok: 'no', fb: 'Es supercomputación científica en FP64: otra arquitectura.' },
        { t: 'Un dispositivo implantable que debe gastar muy poco y responder a señales nerviosas escasas.', ok: 'si', fb: 'Los dispositivos implantables figuran entre los ejemplos del original: poca energía y eventos dispersos.' },
        { t: 'Servir las respuestas de un gran modelo a millones de usuarios a la vez.', ok: 'no', fb: 'Carga densa y continua en centros de datos; el original no señala ventaja neuromórfica demostrada en ella.' }
      ]
    });
  };

  /* =====================================================================
     III.4 · Medir un cúbit
     ===================================================================== */
  W['m2.qmeasure'] = function (el) {
    var th = 60, state = null, batch = null, seed = 7;
    var out = salida(), say = dice();
    var circ = h('div', { class: 't9-qm-c' }), bars = h('div', { class: 't9-qm-b' });
    var r = deslizador({ label: 'Inclinación de la flecha, θ', min: 0, max: 180, value: 60, fmt: function (v) { return v + '°'; }, on: function (v) { th = v; state = null; batch = null; draw(); },
      help: 'Este control inclina la flecha desde |0⟩ (0°) hasta |1⟩ (180°). Importa porque la inclinación decide las probabilidades de medir 0 o 1.' });
    var p0 = function () { return Math.pow(Math.cos(th * Math.PI / 360), 2); };
    var b1 = boton('Medir una vez', 'primary', function () { var R = rng(seed++); var cur = state === null ? p0() : (state === 0 ? 1 : 0); state = R() < cur ? 0 : 1; batch = null; draw(); });
    var b100 = boton('Medir 100 copias', '', function () { var R = rng(seed++ * 31); var z = 0; for (var i = 0; i < 100; i++) if (R() < p0()) z++; batch = z; state = null; draw(); });
    var bp = boton('Preparar de nuevo', 'ghost', function () { state = null; batch = null; draw(); });
    function draw() {
      var P = p0(), ang = state === null ? th : state * 180;
      var cx = 86, cy = 95, R = 62;
      var svg = lienzo(circ, 172, 190, 'Flecha inclinada ' + ang + ' grados; probabilidad de medir 0: ' + Math.round(P * 100) + ' por ciento');
      sv('circle', { cx: cx, cy: cy, r: R, class: 't9-qm-ring' }, svg);
      sv('line', { x1: cx, x2: cx, y1: cy - R - 8, y2: cy + R + 8, class: 't9-ref' }, svg);
      tx(svg, cx, cy - R - 13, '|0⟩', 't9-lb', { 'text-anchor': 'middle' });
      tx(svg, cx, cy + R + 25, '|1⟩', 't9-lb', { 'text-anchor': 'middle' });
      var a = ang * Math.PI / 180, px = cx + R * Math.sin(a), py = cy - R * Math.cos(a);
      sv('line', { x1: cx, y1: cy, x2: px, y2: py, class: 't9-arrow' }, svg);
      sv('circle', { cx: px, cy: py, r: 5, class: 't9-f-inf' }, svg);
      sv('circle', { cx: cx, cy: cy, r: 2.4, class: 't9-f-ink' }, svg);
      M.clear(bars);
      [[0, P, 'medir 0'], [1, 1 - P, 'medir 1']].forEach(function (x) {
        var kk = x[0], pp = x[1];
        var cuenta = batch !== null ? (kk ? 100 - batch : batch) : null;
        var pista = h('span', { class: 't9-qbar' }, h('i', { class: kk ? 't9-qbar-1' : 't9-qbar-0', style: { width: Math.max(0.5, pp * 100) + '%' } }),
          cuenta !== null ? h('span', { class: 't9-qbar-m', style: { left: cuenta + '%' }, title: 'en tus 100 copias' }) : null);
        bars.appendChild(h('div', { class: 't9-qbar-f' }, h('p', null, x[2] + ': ', h('b', null, fmt(pp * 100, 0) + ' %'), cuenta !== null ? ' · en tus 100 copias: ' + cuenta : ''), pista));
      });
      if (batch !== null) bars.appendChild(p('La raya vertical marca lo que salió en tus 100 copias.', { class: 'w-note-s' }));
      M.clear(out);
      out.appendChild(h('span', null, k('P(0) = cos²(θ/2) = cos²(' + fmt(th / 2, 1) + '°) = '), h('b', null, fmt(P, 3)), ' · P(1) = ' + fmt(1 - P, 3)));
      if (state !== null) out.appendChild(h('span', null, k('Resultado: '), h('b', null, String(state)), ' → ahora el cúbit está en |' + state + '⟩; medirlo otra vez repetirá ' + state + '.'));
      else if (batch !== null) out.appendChild(h('span', null, k('100 copias: '), h('b', null, batch + ' ceros y ' + (100 - batch) + ' unos'), ' (esperado ≈ ' + Math.round(P * 100) + ' y ' + Math.round((1 - P) * 100) + ')'));
      else out.appendChild(k('Estado preparado: todavía no has medido.'));
      M.clear(say);
      say.appendChild(rich(state !== null ? 'La medición dio **un solo bit** y **cambió** el cúbit: la flecha saltó al polo del resultado. Pulsa «Preparar de nuevo» para volver a la inclinación elegida.' :
        batch !== null ? 'Las proporciones se acercan a las probabilidades, con pequeñas variaciones al azar. Solo así, con muchas copias, se «ve» la inclinación.' : 'Mide una vez o mide 100 copias preparadas igual.'));
    }
    el.appendChild(h('div', { class: 't9-lab' }, mini('Versión simplificada, en un plano, de la esfera de Bloch. Mueve θ, mide y compara.'), r.wrap,
      h('div', { class: 'btnrow' }, b1, b100, bp), h('div', { class: 't9-qm' }, circ, bars), out, say));
    draw();
  };

  /* =====================================================================
     III.5 · Ondas e interferencia, y H dos veces
     ===================================================================== */
  W['m2.waves'] = function (el) {
    var dp = 0, amps = [1, 0], hs = 0;
    var box = h('div', { class: 't9-wv' }), out = salida(), say = dice();
    var r = deslizador({ label: 'Desfase entre las dos ondas', min: 0, max: 360, step: 5, value: 0, fmt: function (v) { return v + '°'; }, on: function (v) { dp = v; draw(); },
      help: 'Este control desplaza la segunda onda respecto de la primera. Importa porque el desfase decide si las ondas se refuerzan o se anulan.' });
    var pre = grupoChips([{ l: 'En fase · 0°', v: 0 }, { l: 'Cuarto de onda · 90°', v: 90 }, { l: 'Media onda · 180°', v: 180 }], function (x) { dp = x.v; r.set(x.v); draw(); }, { label: 'Desfases de referencia', sel: 0 });
    var hbox = salida();
    var s2 = Math.SQRT1_2;
    var bH = boton('Aplicar H', 'primary', function () { var a = amps[0], b = amps[1]; amps = [s2 * (a + b), s2 * (a - b)]; hs++; drawH(); });
    var b0 = boton('Empezar en |0⟩', 'ghost', function () { amps = [1, 0]; hs = 0; drawH(); });
    var b1 = boton('Empezar en |1⟩', 'ghost', function () { amps = [0, 1]; hs = 0; drawH(); });
    function sgn(v) { return Math.abs(v) < 1e-9 ? '0' : (v < 0 ? '−' : '+') + fmt(Math.abs(v), 3); }
    function drawH() {
      var a = amps[0], b = amps[1];
      M.clear(hbox);
      hbox.appendChild(h('span', null, k('Puertas H aplicadas: '), String(hs)));
      hbox.appendChild(h('span', null, k('Amplitudes: '), 'para 0: ', h('b', null, sgn(a)), ' · para 1: ', h('b', null, sgn(b))));
      hbox.appendChild(h('span', null, k('Probabilidades al medir (amplitud al cuadrado): '), '0 → ' + fmt(a * a * 100, 0) + ' % · 1 → ' + fmt(b * b * 100, 0) + ' %'));
      if (hs >= 2 && (Math.abs(a * a - 1) < 1e-9 || Math.abs(b * b - 1) < 1e-9)) hbox.appendChild(h('span', null, h('b', null, 'Interferencia: '), 'las contribuciones con signos opuestos se anularon y el resultado vuelve a ser seguro.'));
    }
    function draw() {
      var w = ancho(box, 560), x0 = 10, x1 = w - 10, hh = 210, rows = [42, 104, 170];
      var amp = 2 * Math.abs(Math.cos(dp * Math.PI / 360));
      var svg = lienzo(box, w, hh, 'Dos ondas con un desfase de ' + dp + ' grados y su suma, de amplitud ' + fmt(amp, 2));
      var A = 16, kw = 2 * Math.PI / Math.max(120, (x1 - x0) / 2.5), ph = dp * Math.PI / 180;
      function path(y0, f) { var d = ''; for (var x = x0; x <= x1; x += 3) d += (x === x0 ? 'M' : 'L') + x + ',' + (y0 - A * f(x)).toFixed(1); return d; }
      rows.forEach(function (y) { sv('line', { x1: x0, x2: x1, y1: y, y2: y, class: 't9-gl' }, svg); });
      tx(svg, x0, 14, 'onda 1', 't9-lbx');
      sv('path', { d: path(rows[0], function (x) { return Math.sin(kw * x); }), class: 't9-ln t9-s-inf' }, svg);
      tx(svg, x0, 76, 'onda 2, desplazada ' + dp + '°', 't9-lbx');
      sv('path', { d: path(rows[1], function (x) { return Math.sin(kw * x - ph); }), class: 't9-ln t9-s-cmp' }, svg);
      tx(svg, x0, 132, 'suma', 't9-lbx');
      sv('path', { d: path(rows[2], function (x) { return Math.sin(kw * x) + Math.sin(kw * x - ph); }), class: 't9-ln t9-s-nrg t9-ln-g' }, svg);
      M.clear(out);
      out.appendChild(h('span', null, k('Amplitud de la suma: '), '2 × |cos(' + fmt(dp / 2, 1) + '°)| = ', h('b', null, fmt(amp, 2)), ' (cada onda sola: 1)'));
      out.appendChild(h('span', null, k('Su cuadrado, la «intensidad»: '), fmt(amp * amp, 2) + ' (cada onda sola: 1)'));
      M.clear(say);
      say.appendChild(rich(amp > 1.9 ? '**Interferencia constructiva**: las crestas coinciden y la suma dobla la amplitud.' : amp < 0.1 ? '**Interferencia destructiva**: cresta contra valle, la suma se anula.' : 'Interferencia parcial: la suma queda entre 0 y 2.'));
    }
    el.appendChild(h('div', { class: 't9-lab' }, mini('1 · Dos ondas: cambia su desfase y mira la suma.'), pre, r.wrap, box, out, say,
      mini('2 · Lo mismo con amplitudes de un cúbit: empieza en |0⟩ y aplica H dos veces. Fíjate en los signos.'), h('div', { class: 'btnrow' }, bH, b0, b1), hbox));
    draw(); drawH();
    alCambiarAncho(box, draw);
  };

  /* =====================================================================
     III.6 · Código de superficie
     ===================================================================== */
  W['m2.surfcalc'] = function (el) {
    var LAM = 2.14, lo = 1, hi = 2000;
    var toV = function (q) { return Math.pow(10, L10(lo) + (L10(hi) - L10(lo)) * q / 1000); };
    var toP = function (v) { return Math.round((L10(v) - L10(lo)) / (L10(hi) - L10(lo)) * 1000); };
    var d = 5, N = 100;
    var box = h('div', { class: 't9-sc' }), out = salida(), say = dice();
    var rd = deslizador({ label: 'Distancia del código, d', min: 3, max: 25, step: 2, value: 5, fmt: function (v) { return 'd = ' + v; }, on: function (v) { d = v; draw(); },
      help: 'Este control fija la distancia del código: cuántos errores tolera. Importa porque los cúbits físicos crecen con d², y el error lógico baja con cada +2.' });
    var rn = deslizador({ label: 'Cúbits lógicos que quieres guardar', min: 0, max: 1000, value: toP(100), fmt: function (q) { return fmt(Math.round(toV(q))); }, on: function (q) { N = Math.round(toV(q)); draw(); } });
    var REFS = [
      { l: 'Helios · 98', v: 98, st: 'med' }, { l: 'Willow · 105', v: 105, st: 'med' }, { l: 'hasta 448 átomos', v: 448, st: 'med' },
      { l: '~10⁴ (Cain et al.)', v: 1e4, st: 'est' }, { l: '<10⁵ (Webster et al.)', v: 1e5, st: 'est' }, { l: '<10⁶ (Gidney)', v: 1e6, st: 'est' }
    ];
    var ley = h('ul', { class: 't9-ley' },
      h('li', null, m2.marca('medido'), ' máquinas de 2026: Helios · 98, Willow · 105, hasta 448 átomos'),
      h('li', null, m2.marca('estimado'), ' estimaciones para Shor (preprints): ~10⁴ (Cain et al.), <10⁵ (Webster et al.), <10⁶ (Gidney)'));
    function draw() {
      var per = 2 * d * d - 1, tot = per * N, red = Math.pow(LAM, (d - 3) / 2);
      var w = ancho(box, 560), x0 = 14, x1 = w - 14, y = 74, estrecho = w < 560;
      var svg = lienzo(box, w, 132, 'Cúbits físicos necesarios: ' + fmt(tot) + ', frente a las máquinas de 2026 y las estimaciones para Shor');
      var sc = escalaLog(10, 1e8, x0, x1);
      ejeLogX(svg, sc, 1, 8, y + 12, { every: estrecho ? 2 : 1 });
      tx(svg, x1, 128, 'cúbits físicos · escala logarítmica', 't9-lbx', { 'text-anchor': 'end' });
      REFS.forEach(function (rf, i) {
        var x = sc(rf.v);
        marcador(svg, x, y, rf.st, rf.st === 'est' ? 'inf' : 'cnt', 4.5);
        if (!estrecho || i % 2 === 0) tx(svg, x, y - (i % 2 ? 26 : 12), rf.l, 't9-tl', { 'text-anchor': i === 0 ? (estrecho ? 'start' : 'end') : i === REFS.length - 1 ? 'end' : 'middle' });
      });
      var xt = sc(Math.min(1e8, tot));
      sv('line', { x1: xt, x2: xt, y1: 22, y2: y + 6, class: 't9-s-nrg t9-ln-g' }, svg);
      tx(svg, Math.min(Math.max(xt, x0 + 70), x1 - 70), 16, 'tu cuenta: ' + fmt(tot), 't9-lb', { 'text-anchor': 'middle' });
      M.clear(out);
      out.appendChild(h('span', null, k('Por cada cúbit lógico: '), '2 × ' + d + '² − 1 = ', h('b', null, String(per)), ' cúbits físicos (' + d * d + ' de datos + ' + (d * d - 1) + ' de comprobación)'));
      out.appendChild(h('span', null, k('Para ' + fmt(N) + ' cúbits lógicos: '), fmt(N) + ' × ' + per + ' = ', h('b', null, fmt(tot) + ' cúbits físicos')));
      out.appendChild(h('span', null, k('Error lógico frente a d = 3: '), d === 3 ? 'igual' : '÷ ' + nice(red) + ' (2,14 elevado a ' + fmt((d - 3) / 2) + ')'));
      M.clear(say);
      say.appendChild(rich((d > 7 ? 'Ojo: Willow midió Λ = 2,14 hasta d = 7; suponer que se mantiene con distancias mayores es una **extrapolación** de esta actividad. ' : '') +
        'Cálculo ilustrativo: solo la memoria del código de superficie. Un computador real necesita otros recursos, y otros códigos (qLDPC) usan menos cúbits físicos por cúbit lógico.'));
    }
    el.appendChild(h('div', { class: 't9-lab' }, mini('Elige la distancia y cuántos cúbits lógicos quieres, y compara el total con las máquinas de 2026 (rombos llenos: medido) y con las estimaciones para Shor (preprints).'),
      rd.wrap, rn.wrap, box, ley, out, say));
    draw();
    alCambiarAncho(box, draw);
  };

  /* =====================================================================
     Figuras de filas sobre un eje logarítmico (neuromórfica y Shor)
     ===================================================================== */
  function filasLog(svg, o) {
    var x0 = o.x0, x1 = o.x1, rowH = o.rowH, rows = o.rows, lw = o.lw, estrecho = o.estrecho, color = o.color;
    var sc = escalaLog(P10(o.e0), P10(o.e1), x0, x1);
    var y = o.top;
    if (o.title) { tx(svg, estrecho ? x0 : 0, y + 4, o.title.toUpperCase(), 't9-grp'); y += 18; }
    var yBr = o.bracket ? y + 14 : y; if (o.bracket) y += 30;
    var yAx = y + rows.length * rowH + 4;
    ejeLogX(svg, sc, o.e0, o.e1, yAx, { grid: [y - 4, yAx], bands: [y - 4, yAx], label: o.axisLabel });
    rows.forEach(function (r, i) {
      var yc = y + i * rowH + rowH / 2 + (estrecho ? 6 : 0), g = sv('g', null, svg), col = r.g || color;
      if (estrecho) tx(svg, x0, yc - 12, r.l + ' · ' + r.txt, 't9-lbs'); else tx(svg, lw, yc + 4, r.l, 't9-lbs', { 'text-anchor': 'end' });
      if (r.a) sv('rect', { x: sc(r.a), y: yc - 5, width: sc(r.b) - sc(r.a), height: 10, rx: 5, class: 't9-f-' + col + ' t9-op4' }, g);
      if (r.lt) sv('path', { d: 'M' + (sc(r.v) - 9) + ',' + yc + 'h-12m4,-4l-4,4l4,4', class: 't9-jump t9-s-' + col }, g);
      if (r.gt) sv('path', { d: 'M' + (sc(r.v) + 9) + ',' + yc + 'h12m-4,-4l4,4l-4,4', class: 't9-jump t9-s-' + col }, g);
      if (r.v) marcador(g, sc(r.v), yc, r.st, col, 6);
      if (r.tick) { sv('line', { x1: sc(r.tick[0]), x2: sc(r.tick[0]), y1: yc - 8, y2: yc + 8, class: 't9-tick2 t9-s-' + col }, g); if (!estrecho) tx(g, sc(r.tick[0]), yc + 21, r.tick[1], 't9-lbx', { 'text-anchor': 'middle' }); }
      if (!estrecho) {
        var xe = sc(r.b || r.v) + (r.gt ? 26 : 12), izq = xe + 120 > x1 + 60;
        tx(g, izq ? sc(r.a || r.v) - (r.lt ? 26 : 12) : xe, yc + 4, r.txt, 't9-tlm', { 'text-anchor': izq ? 'end' : 'start' });
      }
      var hit = sv('rect', { x: 0, y: yc - rowH / 2, width: x1 + 12, height: rowH, class: 't9-hit', role: 'img', 'aria-label': r.l + ': ' + r.txt }, svg);
      conTip(hit, r.tip);
    });
    if (o.bracket) corchete(svg, sc(o.bracket[0]), sc(o.bracket[1]), yBr, o.bracket[2]);
    return yAx + 46;
  }
  function leyendaMarcas(items) {
    return h('ul', { class: 't9-ley' }, items.map(function (it) { return h('li', null, it[0] ? m2.marca(it[0]) : null, ' ', rich(it[1])); }));
  }

  /* ---------- Neuronas y sinapsis frente al encéfalo ---------- */
  W['m2.fig-neuro'] = function (el) {
    var box = h('div', { class: 't9-fig' });
    function draw() {
      var w = ancho(box, 640), estrecho = w < 520, lw = estrecho ? 0 : 150, x0 = estrecho ? 10 : lw + 16, x1 = w - 12, rowH = estrecho ? 40 : 30;
      var svg = lienzo(box, w, 10, 'Neuronas y sinapsis de los mayores sistemas neuromórficos frente al encéfalo humano, en escala logarítmica');
      var y = filasLog(svg, { x0: x0, x1: x1, lw: lw, estrecho: estrecho, top: 6, rowH: rowH, e0: 8, e1: 12, color: 'cnt', title: 'Neuronas',
        bracket: [2e9, 8.6e10, '2,3 % = ' + ordTxt(L10(43)) + ' órdenes por debajo'],
        rows: [
          { l: 'Hala Point (2024)', v: 1.15e9, st: 'decl', txt: '1,15 × 10⁹ · 1,3 %', tip: ['1,15 × 10⁹ neuronas', 'Hala Point, Intel · 1,3 % del encéfalo', 'Declarado (Intel Corporation, 2024)'] },
          { l: 'Darwin Monkey (2025)', v: 2e9, gt: true, st: 'decl', txt: '>2 × 10⁹ · 2,3 %', tip: ['>2 × 10⁹ neuronas', 'Darwin Monkey, Universidad de Zhejiang · 2,3 %', 'Declarado (Zhejiang University, 2025)'] },
          { l: 'Hipótesis, ~2035', v: 1e10, st: 'extr', txt: '~10¹⁰', tip: ['~10¹⁰ neuronas', 'Escalado exploratorio en chips dedicados', 'Extrapolado · confianza muy baja'] },
          { l: 'Encéfalo humano', v: 8.6e10, st: 'est', txt: '8,6 × 10¹⁰', tip: ['8,6 × 10¹⁰ neuronas', 'Valor de referencia', 'Estimado (Azevedo et al., 2009)'] }
        ] });
      y = filasLog(svg, { x0: x0, x1: x1, lw: lw, estrecho: estrecho, top: y + 8, rowH: rowH, e0: 10, e1: 16, color: 'cnt', title: 'Sinapsis',
        bracket: [1e11, 2e14, '0,05 % = ' + ordTxt(L10(2000)) + ' órdenes por debajo'],
        rows: [
          { l: 'Hala Point (2024)', v: 1.28e11, st: 'decl', txt: '1,28 × 10¹¹', tip: ['1,28 × 10¹¹ sinapsis', 'Hala Point · ~0,06 % de 2 × 10¹⁴', 'Declarado'] },
          { l: 'Darwin Monkey (2025)', v: 1e11, gt: true, st: 'decl', txt: '>10¹¹', tip: ['>10¹¹ sinapsis', 'Darwin Monkey · ~0,05 % de 2 × 10¹⁴', 'Declarado'] },
          { l: 'Encéfalo humano', a: 1e14, b: 1e15, v: 2e14, st: 'est', txt: '10¹⁴–10¹⁵', tip: ['10¹⁴–10¹⁵ sinapsis', 'Referencia de cálculo ~2 × 10¹⁴', 'Estimado (Carlsmith, 2020)'] }
        ] });
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + y);
    }
    el.appendChild(box);
    el.appendChild(leyendaMarcas([['declarado', 'cuadrado: cifra de sus desarrolladores'], ['extrapolado', 'círculo hueco: hipótesis de muy baja confianza'], ['estimado', 'círculo lleno: el encéfalo; la barra marca el intervalo'], [null, '«›»: «más de» · corchete: distancia en órdenes de magnitud']]));
    el.appendChild(p('Pasa el cursor por las filas, o recórrelas con el tabulador, para leer cada dato y su fuente.', { class: 'w-note-s' }));
    draw();
    alCambiarAncho(box, draw);
  };

  /* ---------- Cúbits para un algoritmo de Shor criptográfico ---------- */
  W['m2.fig-shor'] = function (el) {
    var box = h('div', { class: 't9-fig' });
    function draw() {
      var w = ancho(box, 640), estrecho = w < 520, lw = estrecho ? 0 : 150, x0 = estrecho ? 10 : lw + 16, x1 = w - 12, rowH = estrecho ? 42 : 32;
      var svg = lienzo(box, w, 10, 'Cúbits físicos estimados para el algoritmo de Shor a escala criptográfica frente a las máquinas de 2026, escala logarítmica');
      var y = filasLog(svg, { x0: x0, x1: x1, lw: lw, estrecho: estrecho, top: 6, rowH: rowH, e0: 1, e1: 7, color: 'cnt',
        bracket: [448, 1e4, '×22 = ' + ordTxt(L10(1e4 / 448)) + ' órdenes'],
        axisLabel: pw,
        rows: [
          { l: 'Gidney (2025)', v: 1e6, lt: true, st: 'est', txt: '<10⁶ ruidosos', tip: ['<10⁶ cúbits físicos ruidosos', 'Factorizar RSA-2048', 'Estimación de recursos · preprint'] },
          { l: 'Webster et al. (2026)', v: 1e5, lt: true, st: 'est', txt: '<10⁵ · qLDPC', tip: ['<10⁵ cúbits físicos', 'RSA-2048 con códigos qLDPC', 'Estimación de recursos · preprint'] },
          { l: 'Cain et al. (2026)', v: 1e4, st: 'est', txt: '~10⁴ átomos', tick: [26000, '26.000: P-256'], tip: ['~10⁴ cúbits de átomos reconfigurables', 'Shor a escala criptográfica; con 26.000, P-256 en días', 'Estimación de recursos · preprint'] },
          { l: 'Máquinas de 2026', a: 98, b: 448, v: 98, st: 'med', txt: '98–448', tip: ['98–448 cúbits físicos', 'Helios (98 iones) y una arquitectura de 448 átomos', 'Medido (Ransford et al., 2026; Bluvstein et al., 2026)'] }
        ] });
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + y);
      tx(svg, x1, y - 4, 'cúbits físicos · escala logarítmica', 't9-lbx', { 'text-anchor': 'end' });
    }
    el.appendChild(box);
    el.appendChild(leyendaMarcas([['estimado', 'círculo: estimación de recursos (preprint); «‹»: «menos de»'], ['medido', 'rombo y barra: máquinas de 2026, de 98 a 448 cúbits'], [null, 'raya: 26.000 átomos para la curva P-256 · corchete: de 448 a 10⁴']]));
    el.appendChild(p('Pasa el cursor por las filas, o recórrelas con el tabulador, para leer cada dato y su fuente.', { class: 'w-note-s' }));
    draw();
    alCambiarAncho(box, draw);
  };

  /* =====================================================================
     Cinco etapas hacia la computación cuántica tolerante a fallos
     ===================================================================== */
  W['m2.fig-etapas'] = function (el) {
    var E = [
      { e: 'hecha', t: '{{Cúbit físico|g-cubitf}}', d: 'Helios: 98 cúbits, 99,921 % de fidelidad en dos cúbits [medido]' },
      { e: 'hecha', t: 'Cúbit lógico', d: '48 cúbits lógicos con corrección de errores en Helios [declarado]' },
      { e: 'hecha', t: '{{Memoria lógica|g-memlog}}', d: 'Willow, por debajo del umbral: Λ = 2,14 [medido]' },
      { e: 'parte', t: '{{Puertas lógicas|g-puerta}}', d: 'Arquitecturas tolerantes a fallos de hasta 448 átomos; ventaja declarada en 2026 [declarado]' },
      { e: 'falta', t: '{{Tolerancia a fallos útil|g-tolerancia}}', d: 'Starling, 2029: 10⁸ puertas sobre 200 cúbits lógicos [proyectado]' }
    ];
    var NOM = { hecha: 'etapa alcanzada', parte: 'en curso', falta: 'por alcanzar' };
    var ol = h('ol', { class: 't9-et' }, E.map(function (x, i) {
      return h('li', { class: 't9-et-' + x.e },
        h('span', { class: 't9-et-n', 'aria-hidden': 'true' }, String(i + 1)),
        h('div', { class: 't9-et-c' }, h('b', null, rich(x.t)), h('span', { class: 't9-et-st' }, NOM[x.e]), h('p', null, rich(x.d))));
    }));
    el.appendChild(ol);
    el.appendChild(h('ul', { class: 't9-ley t9-et-ley' },
      h('li', null, h('span', { class: 't9-et-dot t9-et-hecha', 'aria-hidden': 'true' }), ' círculo lleno: etapa alcanzada'),
      h('li', null, h('span', { class: 't9-et-dot t9-et-parte', 'aria-hidden': 'true' }), ' medio lleno: en curso, el reto de la década'),
      h('li', null, h('span', { class: 't9-et-dot t9-et-falta', 'aria-hidden': 'true' }), ' hueco: por alcanzar')));
    marcarSeccion(el, 't9-seg-etapas');
  };

  /* =====================================================================
     Un bit y un cúbit, paso a paso (simulador en seis pasos)
     ===================================================================== */
  W['m2.fig-qubit'] = function (el) {
    var DEG = Math.PI / 180, KET = function (s) { return '|' + s + '⟩'; };
    var dot = function (a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
    var len3 = function (a) { return Math.hypot(a[0], a[1], a[2]); };
    var mul = function (a, q) { return [a[0] * q, a[1] * q, a[2] * q]; };
    var add3 = function (a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; };
    var unit = function (a) { var l = len3(a) || 1; return mul(a, 1 / l); };
    var cross = function (a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; };
    var fromAng = function (th, ph) { return [Math.sin(th * DEG) * Math.cos(ph * DEG), Math.sin(th * DEG) * Math.sin(ph * DEG), Math.cos(th * DEG)]; };
    function angOf(v) { var u = unit(v), th = Math.acos(clamp(u[2], -1, 1)) / DEG, ph = Math.atan2(u[1], u[0]) / DEG; if (ph < 0) ph += 360; if (th < 0.5 || th > 179.5) ph = 0; return [th, ph]; }
    function rot(v, q, a) { var c = Math.cos(a), s = Math.sin(a), kv = cross(q, v), kd = dot(q, v); return [0, 1, 2].map(function (i) { return v[i] * c + kv[i] * s + q[i] * kd * (1 - c); }); }
    function slerp(a, b, t) {
      var la = len3(a), lb = len3(b), ua = unit(a), ub = unit(b), om = Math.acos(clamp(dot(ua, ub), -1, 1)), u;
      if (om < 1e-4) u = ub;
      else if (Math.PI - om < 2e-3) { var ax = cross(ua, [0, 1, 0]); if (len3(ax) < 1e-3) ax = cross(ua, [1, 0, 0]); u = rot(ua, unit(ax), om * t); }
      else { var so = Math.sin(om); u = add3(mul(ua, Math.sin((1 - t) * om) / so), mul(ub, Math.sin(t * om) / so)); }
      return mul(unit(u), lerp(la, lb, t));
    }
    var P0 = function (v) { return clamp((1 + v[2]) / 2, 0, 1); };
    var HAX = unit([1, 0, 1]);
    var pct = function (q) { return fmt(Math.round(q * 100)) + ' %'; };
    var amp = function (n) { return n <= 20 ? fmt(Math.pow(2, n)) : sci(Math.pow(2, n), 1); };
    function stateName(v) {
      if (len3(v) < 0.97) return null;
      var N = [[[0, 0, 1], KET('0')], [[0, 0, -1], KET('1')], [[1, 0, 0], KET('+')], [[-1, 0, 0], KET('−')], [[0, 1, 0], KET('+i')], [[0, -1, 0], KET('−i')]];
      for (var i = 0; i < N.length; i++) if (dot(unit(v), N[i][0]) > 0.9995) return N[i][1];
      return null;
    }
    var ahora = function () { return performance.now(); };

    /* ---------- Estado ---------- */
    var st = {
      step: 0, bit: 0, bitY: 0, reads: [], readT0: -1e9,
      v: fromAng(60, 0), prep: fromAng(60, 0), anim: null, flash: null, last: null,
      copies: [], copiesT0: 0, copiesP: null, hCount: 0, start: '0',
      coin: [], coinT0: -1e9, coinRes: 0,
      n: 50, noise: 0.4, d: 5, trail: [], errs: []
    };
    /* Cámara fija (la del fotograma estático del original) */
    var CA = 22 * DEG, CE = 17 * DEG;
    var B = { c: [Math.cos(CE) * Math.cos(CA), Math.cos(CE) * Math.sin(CA), Math.sin(CE)], r: [-Math.sin(CA), Math.cos(CA), 0], u: [-Math.sin(CE) * Math.cos(CA), -Math.sin(CE) * Math.sin(CA), Math.cos(CE)] };
    function proj(S, q) { return [S.cx + S.R * dot(q, B.r), S.cy - S.R * dot(q, B.u), dot(q, B.c)]; }
    function ring(z, r) { var a = []; for (var i = 0; i <= 72; i++) a.push([r * Math.cos(i / 72 * TAU), r * Math.sin(i / 72 * TAU), z]); return a; }
    function meridian(lon) { var a = []; for (var i = 0; i <= 72; i++) { var t = i / 72 * TAU; a.push([Math.sin(t) * Math.cos(lon), Math.sin(t) * Math.sin(lon), Math.cos(t)]); } return a; }
    function curva(g, S, pts, clsF, clsB) {
      var f = '', b = '', pr = null;
      pts.forEach(function (q) { var s = proj(S, q); if (pr) { var seg = 'M' + pr[0].toFixed(1) + ',' + pr[1].toFixed(1) + 'L' + s[0].toFixed(1) + ',' + s[1].toFixed(1); if (pr[2] + s[2] >= 0) f += seg; else b += seg; } pr = s; });
      if (b) sv('path', { d: b, class: clsB }, g);
      if (f) sv('path', { d: f, class: clsF }, g);
    }

    /* ---------- Esfera de Bloch ---------- */
    function esfera(g, S, o) {
      o = o || {};
      var cx = S.cx, cy = S.cy, R = S.R;
      sv('circle', { cx: cx, cy: cy, r: R, class: 't9-bl-disc' }, g);
      [-60, -30, 30, 60].forEach(function (la) { curva(g, S, ring(Math.sin(la * DEG), Math.cos(la * DEG)), 't9-bl-f', 't9-bl-b'); });
      [30, 60, 90, 120, 150].forEach(function (lo) { curva(g, S, meridian(lo * DEG), 't9-bl-f t9-bl-m', 't9-bl-b'); });
      curva(g, S, ring(0, 1), 't9-bl-eq', 't9-bl-eqb');
      curva(g, S, meridian(0), 't9-bl-m0', 't9-bl-eqb');
      [[[0, 0, -1.16], [0, 0, 1.16]], [[-1.2, 0, 0], [1.2, 0, 0]], [[0, -1.2, 0], [0, 1.2, 0]]].forEach(function (ab, i) {
        var pa = proj(S, ab[0]), pb = proj(S, ab[1]);
        sv('line', { x1: pa[0], y1: pa[1], x2: pb[0], y2: pb[1], class: i ? 't9-bl-ax2' : 't9-bl-ax' }, g);
      });
      var lab = function (q, s, fuerte) { var t = proj(S, q); tx(g, t[0], t[1] + 5, s, fuerte ? 't9-ket' : 't9-ket2', { 'text-anchor': 'middle' }); };
      lab([0, 0, 1.3], KET('0'), true); lab([0, 0, -1.36], KET('1'), true);
      if (!o.compact) { lab([1.36, 0, 0], KET('+')); lab([-1.33, 0, 0], KET('−')); lab([0, 1.32, 0], KET('+i')); }
      if (st.anim && st.anim.kind === 'rot') {
        var a = proj(S, mul(HAX, -1.28)), b = proj(S, mul(HAX, 1.28));
        sv('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 't9-bl-hax' }, g);
        tx(g, b[0] + 6, b[1] - 4, 'eje de H', 't9-lbx');
      }
      if (o.trail && st.trail.length) st.trail.forEach(function (q, i) { var t = proj(S, q); sv('circle', { cx: t[0], cy: t[1], r: 2.6, class: 't9-f-inf', opacity: (0.35 * (i + 1) / st.trail.length).toFixed(2) }, g); });
      /* la flecha */
      var v = st.v, r = len3(v), tip = proj(S, v), atras = tip[2] < -0.05;
      var rr = Math.sqrt(Math.max(0, 1 - v[2] * v[2]));
      if (r > 0.97 && rr > 0.02 && !o.noRing) curva(g, S, ring(v[2], rr), 't9-bl-lat', 't9-bl-latb');
      var zp = proj(S, [0, 0, v[2]]);
      sv('line', { x1: tip[0], y1: tip[1], x2: zp[0], y2: zp[1], class: 't9-bl-alt' }, g);
      sv('circle', { cx: zp[0], cy: zp[1], r: 2.8, class: 't9-f-inf' }, g);
      var dx = tip[0] - cx, dy = tip[1] - cy, dl = Math.hypot(dx, dy);
      sv('line', { x1: cx, y1: cy, x2: tip[0] - (dl > 12 ? dx / dl * 7 : 0), y2: tip[1] - (dl > 12 ? dy / dl * 7 : 0), class: 't9-arrow' + (atras ? ' t9-atras' : '') }, g);
      if (dl > 10) { var ux = dx / dl, uy = dy / dl; sv('path', { d: 'M' + tip[0] + ',' + tip[1] + 'L' + (tip[0] - ux * 13 - uy * 6) + ',' + (tip[1] - uy * 13 + ux * 6) + 'L' + (tip[0] - ux * 13 + uy * 6) + ',' + (tip[1] - uy * 13 - ux * 6) + 'Z', class: 't9-f-inf' + (atras ? ' t9-atras' : '') }, g); }
      sv('circle', { cx: tip[0], cy: tip[1], r: 14, class: 't9-glow' + (atras ? ' t9-atras' : '') }, g);
      sv('circle', { cx: cx, cy: cy, r: 2.6, class: 't9-f-ink' }, g);
      if (st.flash) {
        var kq = (ahora() - st.flash.t0) / 900;
        if (kq < 1 || o.stat) {
          var kk = (o.stat || reducido()) ? 0.45 : kq, q = proj(S, [0, 0, st.flash.res ? -1 : 1]);
          sv('circle', { cx: q[0], cy: q[1], r: 6 + kk * 26, class: 't9-flash', opacity: (1 - kk).toFixed(2) }, g);
          tx(g, q[0] + 26, q[1] + (st.flash.res ? 22 : -10), String(st.flash.res), 't9-flash-t', { opacity: Math.min(1, 1.6 - kk).toFixed(2) });
        }
      }
    }
    /* ---------- El bit (o la moneda) ---------- */
    function bit(g, S, x, moneda) {
      var top = S.cy - S.R * Math.cos(CE), bot = S.cy + S.R * Math.cos(CE);
      tx(g, x, top - 30, moneda ? 'Moneda' : 'Bit', 't9-qb-tt', { 'text-anchor': 'middle' });
      tx(g, x, top - 15, moneda ? 'un bit al azar' : 'interruptor', 't9-lbx', { 'text-anchor': 'middle' });
      sv('rect', { x: x - 9, y: top - 9, width: 18, height: bot - top + 18, rx: 9, class: 't9-rail' }, g);
      sv('line', { x1: x, x2: x, y1: top + 14, y2: bot - 14, class: 't9-bl-ax2' }, g);
      [[top, '0'], [bot, '1']].forEach(function (q) { sv('circle', { cx: x, cy: q[0], r: 6, class: 't9-rail-p' }, g); tx(g, x - 20, q[0] + 5, q[1], 't9-ket', { 'text-anchor': 'end' }); });
      if (!moneda && S.link) [top, bot].forEach(function (y) { sv('line', { x1: x + 14, x2: S.cx - 8, y1: y, y2: y, class: 't9-bl-ax2' }, g); });
      var yb = lerp(top, bot, st.bitY);
      if (moneda) { var kq = (ahora() - st.coinT0) / 700; yb = (kq < 1 && kq >= 0 && !reducido()) ? lerp(top, bot, 0.5 + 0.5 * Math.sin(kq * 24) * (1 - kq * 0.3)) : lerp(top, bot, st.coinRes); }
      sv('circle', { cx: x, cy: yb, r: 18, class: 't9-glow' }, g);
      sv('circle', { cx: x, cy: yb, r: 9.5, class: 't9-f-inf' }, g);
      var rk = (ahora() - st.readT0) / 700;
      if (rk >= 0 && rk < 1 && !moneda && !reducido()) sv('circle', { cx: x, cy: yb, r: 12 + rk * 18, class: 't9-flash', opacity: (1 - rk).toFixed(2) }, g);
      var hist = moneda ? st.coin : st.reads;
      tx(g, x, bot + 32, moneda ? 'tiradas' : 'lecturas', 't9-lbx', { 'text-anchor': 'middle' });
      var vis = hist.slice(-6);
      tx(g, x, bot + 50, vis.length ? vis.join(' ') : '—', 't9-hist', { 'text-anchor': 'middle' });
    }
    /* ---------- Piezas del panel lateral ---------- */
    function barras(titulo, p0) {
      var b = h('div', { class: 't9-qb-bars' }, h('p', { class: 't9-qb-k' }, titulo));
      [[0, p0], [1, 1 - p0]].forEach(function (x) {
        b.appendChild(h('div', { class: 't9-qb-bar' }, h('span', null, 'medir ' + x[0]),
          h('span', { class: 't9-qbar' }, h('i', { class: x[0] ? 't9-qbar-1' : 't9-qbar-0', style: { width: (x[1] * 100) + '%' } })),
          h('b', null, pct(x[1]))));
      });
      return b;
    }
    function copias() {
      var n = st.copies.length ? (reducido() ? 100 : clamp(Math.floor((ahora() - st.copiesT0) / 14), 0, 100)) : 0, z = 0;
      var svg = sv('svg', { viewBox: '0 0 357 87', class: 't9-svg t9-copias', 'aria-hidden': 'true' });
      for (var i = 0; i < 100; i++) {
        var x = (i % 20) * 18, y = Math.floor(i / 20) * 18;
        if (i < n) { var rr = st.copies[i]; if (rr === 0) z++; sv('rect', rr === 0 ? { x: x, y: y, width: 15, height: 15, rx: 2.5, class: 't9-f-inf' } : { x: x + 0.6, y: y + 0.6, width: 13.8, height: 13.8, rx: 2.5, class: 't9-cp1' }, svg); }
        else sv('rect', { x: x, y: y, width: 15, height: 15, rx: 2.5, class: 't9-cp' }, svg);
      }
      var pie = n ? h('p', { class: 't9-qb-cp' }, h('span', { class: 't9-sq t9-sq0', 'aria-hidden': 'true' }), '0: ' + z, h('span', { class: 't9-sq t9-sq1', 'aria-hidden': 'true' }), '1: ' + (n - z),
        st.copiesP !== null ? h('small', null, 'esperado ' + Math.round(st.copiesP * 100) + ' / ' + (100 - Math.round(st.copiesP * 100))) : null) : h('p', { class: 't9-qb-cp' }, h('small', null, 'aún sin medir'));
      return h('div', { class: 't9-qb-copias' }, h('p', { class: 't9-qb-k' }, '100 copias del mismo estado, medidas'), svg, pie);
    }
    function circuito() {
      var svg = sv('svg', { viewBox: '0 0 300 44', class: 't9-svg t9-circ', role: 'img', 'aria-label': 'Circuito: estado inicial, ' + st.hCount + ' puertas H y medición' });
      var y = 24, xm = 270;
      sv('line', { x1: 34, x2: xm - 13, y1: y, y2: y, class: 't9-wire' }, svg);
      tx(svg, 0, y + 5, KET(st.start), 't9-ket');
      var nH = st.hCount, show = Math.min(nH, 5), bx0 = 52;
      for (var i = 0; i < show; i++) { var bx = bx0 + i * 40; sv('rect', { x: bx, y: y - 13, width: 26, height: 26, rx: 4, class: 't9-gate' }, svg); tx(svg, bx + 13, y + 5, 'H', 't9-gate-t', { 'text-anchor': 'middle' }); }
      if (nH > 5) tx(svg, bx0 + show * 40, y + 4, '… ×' + nH, 't9-lb');
      if (!nH) tx(svg, bx0, y - 8, 'sin puertas', 't9-lbx');
      sv('rect', { x: xm - 13, y: y - 13, width: 26, height: 26, rx: 4, class: 't9-gate' }, svg);
      sv('path', { d: 'M' + (xm - 8) + ',' + (y + 4) + 'A8,8 0 0 1 ' + (xm + 8) + ',' + (y + 4) + 'M' + xm + ',' + (y + 6) + 'L' + (xm + 6) + ',' + (y - 6), class: 't9-meter' }, svg);
      return h('div', { class: 't9-qb-circ' }, h('p', { class: 't9-qb-k' }, 'circuito'), svg);
    }
    /* ---------- Paso 6: código de superficie ---------- */
    function geomCodigo(d) {
      var data = [], meas = [], o = (d - 1) / 2, i, j;
      for (i = 0; i < d; i++) for (j = 0; j < d; j++) data.push([i - o, j - o]);
      for (i = 0; i < d - 1; i++) for (j = 0; j < d - 1; j++) meas.push({ x: i + 0.5 - o, y: j + 0.5 - o, k: (i + j) % 2, nx: 0, ny: 0 });
      for (i = 0; i < d - 1; i++) meas.push(i % 2 === 0 ? { x: i + 0.5 - o, y: -o, k: 1, nx: 0, ny: -1 } : { x: i + 0.5 - o, y: o, k: 1, nx: 0, ny: 1 });
      for (j = 0; j < d - 1; j++) meas.push(j % 2 === 1 ? { x: -o, y: j + 0.5 - o, k: 0, nx: -1, ny: 0 } : { x: o, y: j + 0.5 - o, k: 0, nx: 1, ny: 0 });
      return { data: data, meas: meas };
    }
    function codigo(stat) {
      var d = st.d, gm = geomCodigo(d), size = 220, cx = 120, cy = 120, s = size / (d + 0.4);
      var svg = sv('svg', { viewBox: '0 0 240 240', class: 't9-svg t9-code', role: 'img', 'aria-label': 'Código de superficie de distancia ' + d + ': ' + d * d + ' cúbits de datos y ' + (d * d - 1) + ' de comprobación' });
      gm.meas.forEach(function (m) {
        var px = cx + m.x * s, py = cy + m.y * s, cls = m.k ? 't9-pl1' : 't9-pl0';
        if (!m.nx && !m.ny) sv('rect', { x: px - s / 2, y: py - s / 2, width: s, height: s, class: cls }, svg);
        else {
          var a0 = Math.atan2(m.ny, m.nx), a1 = a0 - Math.PI / 2, a2 = a0 + Math.PI / 2, r = s / 2;
          sv('path', { d: 'M' + (px + r * Math.cos(a1)) + ',' + (py + r * Math.sin(a1)) + 'A' + r + ',' + r + ' 0 0 1 ' + (px + r * Math.cos(a2)) + ',' + (py + r * Math.sin(a2)) + 'Z', class: cls }, svg);
        }
      });
      var T = ahora() / 1000, vivos = st.errs.filter(function (e) { return stat || T - e.t0 < 1.3; }), lit = {};
      vivos.forEach(function (e) { var dd = gm.data[e.i % gm.data.length]; gm.meas.forEach(function (m, q) { if (Math.abs(m.x - dd[0]) < 0.6 && Math.abs(m.y - dd[1]) < 0.6) lit[q] = true; }); });
      gm.meas.forEach(function (m, q) {
        var px = cx + (m.x + m.nx * 0.24) * s, py = cy + (m.y + m.ny * 0.24) * s, qq = Math.max(3, s * 0.12);
        sv('rect', { x: px - qq, y: py - qq, width: qq * 2, height: qq * 2, class: lit[q] ? 't9-chk-on' : 't9-chk' }, svg);
      });
      gm.data.forEach(function (xy, q) {
        var px = cx + xy[0] * s, py = cy + xy[1] * s, rr = Math.max(3.5, s * 0.16);
        var e = vivos.filter(function (z) { return z.i % gm.data.length === q; })[0];
        if (e) { var a = stat ? 0.8 : 1 - (T - e.t0) / 1.3; sv('circle', { cx: px, cy: py, r: rr * 2.6, class: 't9-glow2', opacity: (0.7 * a).toFixed(2) }, svg); }
        sv('circle', { cx: px, cy: py, r: rr, class: 't9-dato' }, svg);
      });
      return svg;
    }
    function infoCodigo() {
      var rows = [[3, 17, 1], [5, 49, 1 / 2.14], [7, 97, 1 / (2.14 * 2.14)]];
      return h('div', { class: 't9-qb-err' }, h('p', { class: 't9-qb-k' }, 'error lógico relativo · Λ = 2,14 (Willow)'),
        rows.map(function (r, i) {
          return h('div', { class: 't9-qb-er' + (r[0] === st.d ? ' t9-on' : '') }, h('span', null, 'd = ' + r[0]), h('span', null, r[1] + ' cúbits'),
            h('span', { class: 't9-qbar t9-qbar-e' }, h('i', { class: r[0] === st.d ? 't9-qbar-0' : 't9-qbar-g', style: { width: (r[2] * 100) + '%' } })),
            h('span', null, i ? '÷' + fmt(Math.pow(2.14, i), 1) : '×1'));
        }));
    }

    /* ---------- Textos de cada paso ---------- */
    var CAPS = [
      'Un bit es un interruptor: vale 0 o 1, sin estados intermedios. Puedes leerlo cuantas veces quieras y siempre dará lo mismo; leerlo no lo cambia. En la esfera de la derecha, un bit solo podría apuntar a uno de los dos polos: «Invertir» lo hace saltar del uno al otro.',
      'Un cúbit se describe con una flecha que puede apuntar a cualquier punto de una esfera. Arriba está |0⟩; abajo, |1⟩; entre ambos, superposiciones. La altura de la punta decide las probabilidades de medir 0 o 1, y el giro alrededor del eje vertical, llamado fase, no cambia esas probabilidades.',
      'Medir obliga al cúbit a decidirse: da 0 o 1 al azar, con las probabilidades que marca su altura, y la medición lo transforma. Después ya es |0⟩ o |1⟩, y medir otra vez repite el resultado. Para conocer las probabilidades hay que preparar el mismo estado muchas veces.',
      'Aplica H: |0⟩ pasa al ecuador, mitad y mitad. Aplícala otra vez y vuelve a |0⟩ con total certeza, mientras que una moneda lanzada dos veces sigue saliendo al azar. Las amplitudes se suman o se anulan como las ondas en unos auriculares que cancelan el ruido. Empieza en |−⟩: la misma probabilidad, otra fase, y H lo lleva a |1⟩.',
      'Cada cúbit añadido duplica los números necesarios para describir el conjunto: n cúbits exigen 2ⁿ amplitudes. Con 37 superan a las neuronas de tu encéfalo y con unos 50, a sus sinapsis. Pero al medirlos solo salen n bits: la ventaja no es guardar más información, sino calcular con interferencias.',
      'El entorno perturba al cúbit: la flecha tiembla y se acorta, y las probabilidades se acercan al 50 %. Para protegerlo, un cúbit lógico se reparte entre muchos cúbits físicos; los de comprobación delatan los errores sin leer los datos. En Willow, cada aumento de 2 en la distancia del código dividió el error lógico por 2,14.'
    ];
    var HINTS = ['Pulsa «Leer el bit» varias veces.', 'Arrastra la punta de la flecha o usa los controles.', 'Mide una vez y luego mide 100 copias.', 'Aplica H dos veces y compara con la moneda.', 'Mueve n y mira cuánto crece 2ⁿ.', 'Sube el ruido y cambia la distancia del código.'];
    var GUIA = [
      { d: 'Pulsa «Invertir el bit» y después «Leer el bit» varias veces.', s: 'El bit cambia entre 0 y 1 solo cuando lo inviertes; leerlo siempre da lo mismo.', m: 'Así es la información clásica: leer no altera el valor.', l: ['#m2t3-lec-d4', 'D4 · Bits'] },
      { d: 'Mueve «Inclinación, θ» o pulsa |0⟩, |1⟩, |+⟩ y «75 % · 25 %». Después mueve «Fase, φ».', s: 'Los porcentajes de la lectura: con θ = 0°, 100 % de 0; con 90°, mitad y mitad; con 180°, 100 % de 1. La fase gira la flecha sin cambiar los porcentajes.', m: 'El estado del cúbit es la dirección de la flecha; los porcentajes son probabilidades de lo que saldría al medir.', l: ['#m2t9-lec-iii4', 'III.4 · Del bit al cúbit'] },
      { d: 'Pulsa «Medir una vez» varias veces; luego «Medir 100 copias» y «Preparar de nuevo».', s: 'Cada medición da 0 o 1 y la flecha salta al polo del resultado; con 100 copias, las proporciones se acercan a las probabilidades.', m: 'Medir da un solo bit y cambia el estado. Para conocer las probabilidades hacen falta muchas copias.', l: ['#m2t9-lec-iii4', 'III.4 · Medir cambia lo medido'] },
      { d: 'Con «Empezar en |0⟩», pulsa «Aplicar H» y mide 100 copias; aplica H otra vez y vuelve a medir. Compáralo con «Lanzar la moneda».', s: 'Tras una H, mitad y mitad; tras dos, 100 % de 0. La moneda sigue saliendo al azar.', m: 'Las amplitudes interfieren: los caminos hacia 1 se anulan. Es el recurso del cúbit.', l: ['#m2t9-lec-iii5', 'III.5 · Interferencia'] },
      { d: 'Mueve «Número de cúbits, n».', s: 'Las amplitudes necesarias, 2ⁿ, crecen muchísimo más deprisa que los bits que pueden leerse, n.', m: 'Describir muchos cúbits es caro para una computadora corriente, pero al medir solo salen n bits (cota de Holevo).', l: ['#m2t1-lec-f2', 'F2 · Potencias de diez'] },
      { d: 'Sube «Ruido del entorno» y pulsa «Preparar de nuevo»; después prueba d = 3, 5 y 7.', s: 'La flecha tiembla y se acorta, y las probabilidades tienden al 50 %. Al aumentar la distancia del código, cada cúbit lógico usa más cúbits físicos.', m: 'El ruido borra la información; la corrección de errores la protege a costa de muchos cúbits físicos.', l: ['#m2t9-lec-iii6', 'III.6 · Ruido y corrección'] }
    ];
    var NOMBRES = ['Un bit', 'Un cúbit', 'Medir', 'Interferencia', 'Muchos cúbits', 'Ruido y corrección'];

    /* ---------- Estructura ---------- */
    var base = uid('qb');
    var tabs = NOMBRES.map(function (n, i) {
      return h('button', { type: 'button', role: 'tab', id: base + '-t' + i, 'aria-controls': base + '-p', 'aria-selected': String(i === 0), tabindex: i ? '-1' : '0', class: 't9-qb-tab' }, h('b', null, String(i + 1)), ' ' + n);
    });
    var tablist = h('div', { class: 't9-qb-tabs', role: 'tablist', 'aria-label': 'Los seis pasos del simulador' }, tabs);
    var cap = h('p', { class: 't9-qb-cap', 'aria-live': 'polite' });
    /* vista A: bit + esfera, y panel lateral (pasos 1 a 4) */
    var stageA = h('div', { class: 't9-qb-stage' });
    var drag = h('div', { class: 't9-qb-drag', 'aria-hidden': 'true' });
    var stageWrap = h('div', { class: 't9-qb-sw' }, stageA, drag);
    var sideA = h('div', { class: 't9-qb-side' });
    var vistaA = h('div', { class: 't9-qb-a' }, stageWrap, sideA);
    /* vista B: muchos cúbits (paso 5) */
    var gridB = h('div', { class: 't9-qb-grid' }), bigB = h('p', { class: 't9-qb-big' }), subB = h('p', { class: 't9-qb-sub' }), reglaB = h('div', { class: 't9-qb-regla' }), bitsB = h('div', { class: 't9-qb-bits' });
    var vistaB = h('div', { class: 't9-qb-b', hidden: true }, gridB, bigB, subB, reglaB, bitsB);
    /* vista C: ruido y código (paso 6) */
    var esfC = h('div', { class: 't9-qb-esf' }), leeC = h('div', { class: 't9-qb-lee' }), codC = h('div', { class: 't9-qb-cod' }), infC = h('div');
    var titC = h('p', { class: 't9-qb-tt2' });
    var leyC = h('p', { class: 't9-qb-cp' }, h('span', { class: 't9-dot-d', 'aria-hidden': 'true' }), 'datos', h('span', { class: 't9-sq t9-sq1', 'aria-hidden': 'true' }), 'comprobación');
    var vistaC = h('div', { class: 't9-qb-c', hidden: true }, h('div', null, esfC, leeC), h('div', null, titC, codC, leyC, infC));
    var escena = h('div', { class: 't9-qb-escena', role: 'img' }, vistaA, vistaB, vistaC);

    /* controles */
    var dTh = deslizador({ label: 'Inclinación, θ', min: 0, max: 180, value: 60, fmt: function (v) { return v + '°'; }, on: function () { setPrep(fromAng(dTh.inp.value, dPh.inp.value), false); } });
    var dPh = deslizador({ label: 'Fase, φ', min: 0, max: 359, value: 0, fmt: function (v) { return v + '°'; }, on: function () { setPrep(fromAng(dTh.inp.value, dPh.inp.value), false); } });
    var presets = h('div', { class: 'chips', role: 'group', 'aria-label': 'Estados de referencia' }, [['0,0', '|0⟩'], ['180,0', '|1⟩'], ['90,0', '|+⟩'], ['90,180', '|−⟩'], ['90,90', '|+i⟩'], ['60,0', '75 % · 25 %']].map(function (x) {
      return h('button', { type: 'button', class: 'chip', onclick: function () { var ab = x[0].split(',').map(Number); setPrep(fromAng(ab[0], ab[1]), true); } }, x[1]);
    }));
    var bNot = boton('Invertir el bit', 'primary', function () { st.bit ^= 1; st.v = [0, 0, st.bit ? -1 : 1]; st.anim = null; st.flash = { res: st.bit, t0: ahora() }; report(); pedir(); });
    var bRead = boton('Leer el bit', '', function () { st.reads.push(st.bit); if (st.reads.length > 24) st.reads.shift(); st.readT0 = ahora(); report(); pedir(); });
    var bMeas = boton('Medir una vez', 'primary', function () {
      if (st.anim) { st.v = st.anim.to.slice(); st.anim = null; }
      var res = Math.random() < P0(st.v) ? 0 : 1; st.last = res;
      animTo([0, 0, res ? -1 : 1], 480, function () { st.flash = { res: res, t0: ahora() }; });
      report();
    });
    var bM100 = boton('Medir 100 copias', '', function () { copiesOf(st.prep); });
    var bPrep = boton('Preparar de nuevo', 'ghost', function () { st.last = null; st.flash = null; animTo(st.prep, 600); report(); });
    var bH = boton('Aplicar H', 'primary', function () {
      if (st.anim) { st.v = st.anim.to.slice(); st.anim = null; }
      var to = [st.v[2], -st.v[1], st.v[0]];
      st.hCount++; st.copies = [];
      animTo(to, 1000, null, 'rot'); report();
    });
    var bMI = boton('Medir 100 copias', '', function () { if (st.anim) { st.v = st.anim.to.slice(); st.anim = null; } copiesOf(st.v); });
    var bCoin = boton('Lanzar la moneda', 'ghost', function () { st.coinRes = Math.random() < 0.5 ? 0 : 1; st.coin.push(st.coinRes); if (st.coin.length > 24) st.coin.shift(); st.coinT0 = ahora(); report(); pedir(); });
    var inicios = grupoChips([{ l: 'Empezar en |0⟩', a: 0, b: 0 }, { l: 'Empezar en |+⟩', a: 90, b: 0 }, { l: 'Empezar en |−⟩', a: 90, b: 180 }], function (x) {
      st.start = x.a === 0 ? '0' : x.b ? '−' : '+';
      st.hCount = 0; st.copies = []; animTo(fromAng(x.a, x.b), 500); report();
    }, { label: 'Estado inicial', sel: 0 });
    var dN = deslizador({ label: 'Número de cúbits, n', min: 1, max: 100, value: 50, fmt: function (v) { return String(v); }, on: function (v) { st.n = v; report(); render(); } });
    var dNz = deslizador({ label: 'Ruido del entorno', min: 0, max: 100, step: 5, value: 40, fmt: function (v) { return v + ' %'; }, on: function (v) { st.noise = v / 100; if (!st.noise) st.errs = []; report(); render(); pedir(); } });
    var bRep = boton('Preparar de nuevo', 'ghost', function () { st.v = fromAng(55, 30); st.trail = []; st.errs = []; report(); render(); pedir(); });
    var dists = grupoChips([{ l: 'd = 3', d: 3 }, { l: 'd = 5', d: 5 }, { l: 'd = 7', d: 7 }], function (x) { st.d = x.d; st.errs = []; report(); render(); }, { label: 'Distancia del código', sel: 1 });
    var C = [
      h('div', { class: 'btnrow' }, bNot, bRead),
      h('div', null, dTh.wrap, h('div', { class: 't9-solo1' }, dPh.wrap)),
      presets,
      h('div', { class: 'btnrow' }, bMeas, bM100, bPrep),
      h('div', { class: 'btnrow' }, bH, bMI, bCoin),
      inicios,
      dN.wrap,
      h('div', { class: 't9-qb-row' }, dNz.wrap, bRep),
      h('div', { class: 't9-qb-row2' }, h('span', { class: 't9-qb-l' }, 'Distancia del código'), dists)
    ];
    /* para cada grupo de controles de C, los pasos en los que se ve */
    var PASOS_DE = [[0], [1, 2], [1], [2], [3], [3], [4], [5], [5]];
    var ctrls = h('div', { class: 't9-qb-ctrls' }, C);
    var out = h('p', { class: 't9-qb-out', 'aria-live': 'polite' });
    var gN = h('span'), gDo = h('dd'), gSee = h('dd'), gMean = h('dd'), gLink = h('p', { class: 'w-note-s' });
    var guia = h('div', { class: 't9-qb-guia', 'aria-live': 'polite' },
      h('p', { class: 't9-qb-gk' }, 'Guía para principiantes · paso ', gN, ' de 6'),
      h('dl', null, h('dt', null, 'Qué hacer'), gDo, h('dt', null, 'Qué observar'), gSee, h('dt', null, 'Qué significa'), gMean), gLink);
    var hint = h('span', { class: 't9-qb-hint' });
    var next = boton('Siguiente →', 'primary', function () { setStep(st.step === 5 ? 0 : st.step + 1); });
    var panel = h('div', { id: base + '-p', role: 'tabpanel', 'aria-labelledby': base + '-t0', class: 't9-qb-panel' }, escena, cap, ctrls, out, guia, h('div', { class: 't9-qb-foot' }, hint, next));
    el.appendChild(h('div', { class: 't9-qb' }, tablist, panel));

    /* ---------- Dibujo ---------- */
    var SA = { cx: 272, cy: 165, R: 100 };
    function render() {
      var kk = st.step, stat = reducido();
      if (kk <= 3) {
        var svg = lienzo(stageA, 420, 330, '');
        esfera(svg, { cx: SA.cx, cy: SA.cy, R: SA.R }, { stat: stat });
        bit(svg, { cx: SA.cx, cy: SA.cy, R: SA.R, link: kk <= 2 }, 66, kk === 3);
        M.clear(sideA);
        if (kk === 0) {
          sideA.appendChild(barras('el bit, al leerlo', st.bit ? 0 : 1));
          sideA.appendChild(p('un bit no tiene probabilidades: su valor se conoce sin dudas', { class: 't9-qb-nota' }));
        } else if (kk === 1) {
          var ang = angOf(st.v);
          sideA.appendChild(barras('probabilidad al medir', P0(st.v)));
          sideA.appendChild(p('α = ' + fmt(Math.cos(ang[0] * DEG / 2), 2) + '   β = ' + fmt(Math.sin(ang[0] * DEG / 2), 2) + (Math.round(ang[1]) && ang[0] > 0.5 && ang[0] < 179.5 ? ' · e^(i·' + Math.round(ang[1]) + '°)' : ''), { class: 't9-qb-amp' }));
          sideA.appendChild(p('P(0) = |α|²  ·  P(1) = |β|²', { class: 't9-qb-nota' }));
        } else if (kk === 2) {
          sideA.appendChild(barras(st.last !== null ? 'probabilidad al medir de nuevo' : 'probabilidad al medir', P0(st.anim ? st.anim.to : st.v)));
          sideA.appendChild(copias());
        } else {
          sideA.appendChild(circuito());
          sideA.appendChild(barras('probabilidad al medir', P0(st.v)));
          sideA.appendChild(copias());
        }
      } else if (kk === 4) {
        dibujarMuchos();
      } else {
        if (stat) { var rr = clamp(1 - st.noise * 0.7, 0.05, 1); st.v = mul(fromAng(55, 30), rr); st.trail = []; if (st.noise > 0 && !st.errs.length) st.errs = [{ i: 7, t0: 0 }, { i: 18, t0: 0 }]; if (st.noise === 0) st.errs = []; }
        var s2 = lienzo(esfC, 260, 270, 'Cúbit con ruido: la flecha mide ' + fmt(len3(st.v), 2));
        esfera(s2, { cx: 130, cy: 135, R: 95 }, { stat: stat, trail: true, compact: true, noRing: true });
        M.clear(leeC);
        leeC.appendChild(p('longitud de la flecha: **' + fmt(len3(st.v), 2) + '**', { class: 't9-qb-amp' }));
        leeC.appendChild(p('medir 0: ' + pct(P0(st.v)) + ' · medir 1: ' + pct(1 - P0(st.v)), { class: 't9-qb-nota' }));
        titC.textContent = '1 cúbit lógico · d = ' + st.d + ' → ' + (2 * st.d * st.d - 1) + ' cúbits físicos';
        M.clear(codC); codC.appendChild(codigo(stat || reducido()));
        M.clear(infC); infC.appendChild(infoCodigo());
      }
    }
    function dibujarMuchos() {
      var g = lienzo(gridB, 400, 100, '');
      g.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < 100; i++) {
        var x = (i % 20 + 0.5) * 20, y = (Math.floor(i / 20) + 0.5) * 20, on = i < st.n;
        sv('circle', { cx: x, cy: y, r: 7.2, class: on ? 't9-qn-on' : 't9-qn-off' }, g);
        if (on) { var a = i * 2.39996; sv('line', { x1: x, y1: y, x2: x + Math.cos(a) * 6.1, y2: y - Math.sin(a) * 6.1, class: 't9-qn-h' }, g); }
      }
      M.clear(bigB); bigB.appendChild(document.createTextNode('2' + supU(st.n) + (st.n <= 20 ? ' = ' : ' ≈ ') + amp(st.n) + ' amplitudes'));
      subB.textContent = 'números necesarios para describir el estado; al medir solo salen ' + st.n + (st.n === 1 ? ' bit' : ' bits');
      dibujarRegla();
      M.clear(bitsB);
      bitsB.appendChild(h('span', { class: 't9-qb-k' }, 'al medir:'));
      var cajas = h('span', { class: 't9-qb-bitsq', 'aria-hidden': 'true' });
      for (var j = 0; j < st.n; j++) cajas.appendChild(h('i'));
      bitsB.appendChild(cajas);
      bitsB.appendChild(h('b', null, st.n + (st.n === 1 ? ' bit' : ' bits')));
    }
    function dibujarRegla() {
      if (st.step !== 4) return;
      var w = ancho(reglaB, 560), estrecho = w < 520, x0 = 14, x1 = w - 14, yR = 48, E1 = 30;
      var X = function (ex) { return x0 + clamp(ex, 0, E1) / E1 * (x1 - x0); };
      var e = st.n * Math.LOG10E * Math.LN2;
      var svg = lienzo(reglaB, w, 104, 'Regla logarítmica de 10⁰ a 10³⁰: 2 elevado a ' + st.n + ' amplitudes frente a las neuronas y las sinapsis del encéfalo');
      sv('rect', { x: x0, y: yR - 4, width: x1 - x0, height: 8, class: 't9-rg-fondo' }, svg);
      sv('line', { x1: x0, x2: x1, y1: yR, y2: yR, class: 't9-rg-eje' }, svg);
      for (var q = 0; q <= E1; q++) {
        var x = X(q), may = q % 6 === 0;
        sv('line', { x1: x, x2: x, y1: yR, y2: yR + (may ? 9 : 4), class: 't9-ax' }, svg);
        if (may && (!estrecho || q % 12 === 0)) tx(svg, x, yR + 22, pw(q), 't9-tl', { 'text-anchor': 'middle' });
      }
      var hitos = estrecho ? [[L10(8.6e10), 'neuronas'], [14.5, 'sinapsis', 14, 15], [L10(3.17e29), 'Helios: 2⁹⁸']] : [[L10(8.6e10), 'neuronas del encéfalo'], [14.5, 'sinapsis del encéfalo', 14, 15], [L10(3.17e29), '2⁹⁸ · los 98 cúbits de Helios']];
      hitos.forEach(function (mm, i) {
        var xx = X(mm[0]), ly = yR - 18 - (i % 2) * 15;
        if (mm[2]) sv('rect', { x: X(mm[2]), y: yR - 5, width: X(mm[3]) - X(mm[2]), height: 10, class: 't9-rg-band' }, svg);
        sv('line', { x1: xx, x2: xx, y1: yR - 6, y2: ly + 3, class: 't9-tkm' }, svg);
        var cerD = xx > x1 - 110, cerI = xx < x0 + 70;
        tx(svg, cerD ? x1 : cerI ? x0 : xx, ly, mm[1], 't9-tl', { 'text-anchor': cerD ? 'end' : cerI ? 'start' : 'middle' });
      });
      var xm = X(e);
      sv('rect', { x: xm - 7, y: yR - 7, width: 14, height: 14, transform: 'rotate(45 ' + xm + ' ' + yR + ')', class: 't9-f-cnt t9-ring' }, svg);
      tx(svg, clamp(xm, x0 + 14, x1 - 14), yR + 40, '2' + supU(st.n), 't9-lb', { 'text-anchor': 'middle' });
    }
    alCambiarAncho(reglaB, dibujarRegla);

    /* ---------- Lectura accesible ---------- */
    function report() {
      var kk = st.step; M.clear(out);
      var b = function (t) { return h('b', null, t); };
      var v = st.anim ? st.anim.to : st.v, pp = P0(v), nm = stateName(v), ang = angOf(v), th = ang[0], ph = ang[1];
      if (kk === 0) {
        var ult = st.reads.slice(-8);
        out.append('Valor del bit: ', b(String(st.bit)), ' · lecturas: ', ult.length ? ult.join(' ') + (ult.length > 1 && ult.every(function (r) { return r === st.bit; }) ? ', siempre iguales' : '') : 'ninguna todavía', '.');
      } else if (kk === 1) out.append(nm ? 'Estado ' + nm + ' · ' : '', 'θ = ' + Math.round(th) + '° · φ = ' + Math.round(ph) + '° → medir 0: ', b(pct(pp)), ' · medir 1: ', b(pct(1 - pp)), ' · amplitudes α = ' + fmt(Math.cos(th * DEG / 2), 2) + ' y |β| = ' + fmt(Math.sin(th * DEG / 2), 2) + '.');
      else if (kk === 2) {
        out.append('Estado preparado: medir 0 con ', b(pct(P0(st.prep))), '. ');
        if (st.last !== null) out.append('Última medición: ', b(String(st.last)), ' → ahora el cúbit es ' + KET(String(st.last)) + '. ');
        if (st.copies.length) { var z = st.copies.filter(function (r) { return r === 0; }).length; out.append('100 copias: ' + z + ' ceros y ' + (100 - z) + ' unos.'); }
      } else if (kk === 3) {
        out.append('Estado: ', b(nm || ('θ = ' + Math.round(th) + '°')), ' · medir 0: ' + pct(pp) + ' · H aplicada ' + st.hCount + (st.hCount === 1 ? ' vez' : ' veces') + '. ');
        if (st.copies.length) { var z2 = st.copies.filter(function (r) { return r === 0; }).length; out.append('100 copias: ' + z2 + ' ceros y ' + (100 - z2) + ' unos. '); }
        if (st.coin.length) out.append('Moneda: ' + st.coin.slice(-8).join(' ') + '.');
      } else if (kk === 4) {
        out.append('n = ' + st.n + ' → 2' + supU(st.n) + (st.n <= 20 ? ' = ' : ' ≈ '), b(amp(st.n)), ' amplitudes ', m2.marca('extrapolado'), ' · al medir, ' + st.n + (st.n === 1 ? ' bit.' : ' bits.'));
      } else {
        out.append('Ruido ' + Math.round(st.noise * 100) + ' %: la flecha se acorta con el tiempo y las probabilidades tienden al 50 %. Con d = ' + st.d + ', un cúbit lógico usa ', b((2 * st.d * st.d - 1) + ' cúbits físicos'), ' (' + st.d * st.d + ' de datos y ' + (st.d * st.d - 1) + ' de comprobación) · Λ = 2,14 ', m2.marca('medido'), '.');
      }
      escena.setAttribute('aria-label', ['Un bit, como interruptor, junto a un cúbit en la esfera de Bloch.', 'Cúbit en la esfera de Bloch con probabilidad ' + pct(pp) + ' de medir 0.', 'Medición de un cúbit y de 100 copias.', 'Circuito con puertas H y comparación con una moneda.', 'Crecimiento de 2 elevado a n amplitudes en escala logarítmica.', 'Cúbit con ruido y código de superficie de distancia ' + st.d + '.'][kk]);
    }

    /* ---------- Acciones ---------- */
    function animTo(to, dur, done, kind) {
      if (st.anim) { st.v = st.anim.to.slice(); st.anim = null; }
      if (reducido()) { st.v = to.slice(); if (done) done(); report(); render(); return; }
      st.anim = { kind: kind || 'slerp', from: st.v.slice(), to: to.slice(), t0: ahora(), dur: dur || 650, done: done };
      pedir();
    }
    function syncSliders(v) { var a = angOf(v); dTh.set(Math.round(a[0])); dPh.set(Math.round(a[1])); }
    function setPrep(v, animar) { st.prep = unit(v); st.last = null; st.copies = []; syncSliders(st.prep); if (animar) animTo(st.prep, 600); else { st.anim = null; st.v = st.prep.slice(); } report(); render(); }
    function copiesOf(v) { var q = P0(v); st.copies = []; for (var i = 0; i < 100; i++) st.copies.push(Math.random() < q ? 0 : 1); st.copiesP = q; st.copiesT0 = ahora(); report(); render(); pedir(); }

    /* ---------- Bucle de animación: solo corre mientras hay algo en marcha ---------- */
    var raf = 0, ult = 0, visible = true;
    function pendiente() {
      var T = ahora();
      if (st.anim) return true;
      if (reducido()) return false;
      if (st.flash && T - st.flash.t0 < 900) return true;
      if (T - st.coinT0 < 700 || T - st.readT0 < 700) return true;
      if (st.copies.length && T - st.copiesT0 < 1450) return true;
      if (Math.abs(st.bitY - st.bit) > 0.002) return true;
      if (st.step === 5 && st.noise > 0 && visible) return true;
      return st.step === 5 && st.errs.length > 0 && visible;
    }
    function pedir() { if (!raf && el.isConnected) { ult = ahora(); raf = requestAnimationFrame(cuadro); } }
    function cuadro() {
      raf = 0;
      if (!el.isConnected) return;
      var T = ahora(), dt = Math.min(0.05, (T - ult) / 1000); ult = T;
      if (st.anim) {
        var a = st.anim, e = clamp((T - a.t0) / a.dur, 0, 1), ee = ease(e);
        st.v = a.kind === 'rot' ? rot(a.from, HAX, Math.PI * ee) : slerp(a.from, a.to, ee);
        if (e >= 1) { st.v = a.to.slice(); st.anim = null; if (a.done) a.done(); report(); }
      }
      st.bitY = reducido() ? st.bit : st.bitY + (st.bit - st.bitY) * Math.min(1, dt * 16);
      if (Math.abs(st.bitY - st.bit) < 0.002) st.bitY = st.bit;
      if (st.step === 5 && !reducido() && visible) {
        if (st.noise > 0) {
          var u = unit(st.v), rnd = unit([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]);
          var r = len3(st.v) * Math.exp(-st.noise * 0.42 * dt);
          st.v = mul(unit(add3(u, mul(rnd, st.noise * 2.2 * dt))), Math.max(0.02, r));
          st.trail.push(st.v.slice()); if (st.trail.length > 46) st.trail.shift();
          if (Math.random() < st.noise * 3.2 * dt) st.errs.push({ i: (Math.random() * 1e6) | 0, t0: T / 1000 });
        }
        st.errs = st.errs.filter(function (z) { return T / 1000 - z.t0 < 1.4; });
      }
      render();
      if (pendiente()) raf = requestAnimationFrame(cuadro);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (x) { visible = x.isIntersecting; if (visible) pedir(); }); }, { rootMargin: '80px 0px' });
      io.observe(el);
    }

    /* ---------- Arrastrar la punta de la flecha (pasos 2 y 3) ---------- */
    var arrastrando = false;
    function pick(e) {
      var svg = stageA.querySelector('svg'); if (!svg) return null;
      var r = svg.getBoundingClientRect(); if (!r.width) return null;
      var x = (e.clientX - r.left) * 420 / r.width, y = (e.clientY - r.top) * 330 / r.height;
      var a = (x - SA.cx) / SA.R, b = (SA.cy - y) / SA.R, q = a * a + b * b;
      if (q > 1.44) return null;
      if (q > 1) { var kq = 1 / Math.sqrt(q); a *= kq; b *= kq; }
      var c = Math.sqrt(Math.max(0, 1 - a * a - b * b));
      return unit(add3(add3(mul(B.r, a), mul(B.u, b)), mul(B.c, c)));
    }
    drag.addEventListener('pointerdown', function (e) {
      if (st.step !== 1 && st.step !== 2) return;
      var q = pick(e); if (!q) return;
      arrastrando = true; try { drag.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      drag.classList.add('t9-grab'); st.flash = null; setPrep(q, false);
    });
    drag.addEventListener('pointermove', function (e) { if (arrastrando) { var q = pick(e); if (q) setPrep(q, false); } });
    var fin = function () { arrastrando = false; drag.classList.remove('t9-grab'); };
    drag.addEventListener('pointerup', fin); drag.addEventListener('pointercancel', fin);
    /* posición de la zona de arrastre sobre la esfera, en proporción al dibujo */
    var R12 = SA.R * 1.2;
    Object.assign(drag.style, { left: ((SA.cx - R12) / 420 * 100) + '%', top: ((SA.cy - R12) / 330 * 100) + '%', width: (2 * R12 / 420 * 100) + '%', height: (2 * R12 / 330 * 100) + '%' });

    /* ---------- Pasos ---------- */
    function setStep(kk, foco) {
      kk = clamp(kk, 0, 5); var prev = st.step; st.step = kk;
      tabs.forEach(function (t, i) { var on = i === kk; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', tabs[kk].id);
      if (foco) tabs[kk].focus();
      PASOS_DE.forEach(function (pasos, i) { C[i].hidden = pasos.indexOf(kk) === -1; });
      dPh.wrap.parentNode.hidden = kk !== 1;
      vistaA.hidden = kk > 3; vistaB.hidden = kk !== 4; vistaC.hidden = kk !== 5;
      drag.hidden = !(kk === 1 || kk === 2);
      st.anim = null; st.flash = null; st.copies = [];
      if (kk === 0) st.v = [0, 0, st.bit ? -1 : 1];
      if (kk === 1 || kk === 2) { st.last = null; if (prev === 0 && !reducido()) { st.v = [0, 0, st.bit ? -1 : 1]; animTo(st.prep, 900); } else st.v = st.prep.slice(); }
      if (kk === 3) { st.hCount = 0; st.start = '0'; st.v = [0, 0, 1]; inicios.pick(0); }
      if (kk === 5) { st.v = fromAng(55, 30); st.trail = []; st.errs = []; }
      cap.textContent = CAPS[kk]; hint.textContent = HINTS[kk];
      next.textContent = kk === 5 ? 'Empezar de nuevo ↺' : 'Siguiente →';
      var gg = GUIA[kk];
      gN.textContent = String(kk + 1); gDo.textContent = gg.d; gSee.textContent = gg.s; gMean.textContent = gg.m;
      M.clear(gLink); gLink.append('Si te pierdes, repasa la lección ', h('a', { href: gg.l[0] }, gg.l[1]), '.');
      report(); render(); pedir();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { setStep(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); setStep((i + 1) % 6, true); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); setStep((i + 5) % 6, true); }
        else if (e.key === 'Home') { e.preventDefault(); setStep(0, true); }
        else if (e.key === 'End') { e.preventDefault(); setStep(5, true); }
      });
    });
    setStep(0);
  };

  /* =====================================================================
     Nivel 7 · Sistema neuromórfico (animación esquemática)
     Doce chips de 16 núcleos con memoria propia. Un núcleo se enciende cuando acumula
     suficientes impulsos y envía impulsos, sobre todo, a núcleos de su mismo chip.
     ===================================================================== */
  W['m2.nv-neuromorfico'] = function (el) {
    var chipC = 4, chipR = 3, per = 4, cs = 24, gap = 12, m = 12;
    var chipS = cs * per, tw = chipC * chipS + (chipC - 1) * gap, th = chipR * chipS + (chipR - 1) * gap;
    var VW = tw + 2 * m, VH = th + 2 * m;
    var R = rng(20260710);
    var cores = [];
    for (var cr = 0; cr < chipR; cr++) for (var cc = 0; cc < chipC; cc++) for (var r = 0; r < per; r++) for (var c = 0; c < per; c++) {
      cores.push({ x: m + cc * (chipS + gap) + c * cs, y: m + cr * (chipS + gap) + r * cs, chip: cr * chipC + cc, v: R() * 0.6, f: 0 });
    }
    var pk = [];
    var svg = sv('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 't9-svg t9-nv-svg', role: 'img', 'aria-label': 'Esquema animado: doce chips neuromórficos de 16 núcleos; los núcleos se iluminan al recibir suficientes impulsos y envían impulsos, sobre todo, a núcleos de su mismo chip' });
    for (cr = 0; cr < chipR; cr++) for (cc = 0; cc < chipC; cc++) sv('rect', { x: m + cc * (chipS + gap) - 4, y: m + cr * (chipS + gap) - 4, width: chipS + 8, height: chipS + 8, rx: 4, class: 't9-nv-chip' }, svg);
    cores.forEach(function (q) {
      sv('rect', { x: q.x + 1.5, y: q.y + 1.5, width: cs - 3, height: cs - 3, rx: 2, class: 't9-nv-core' }, svg);
      q.on = sv('rect', { x: q.x + 1.5, y: q.y + 1.5, width: cs - 3, height: cs - 3, rx: 2, class: 't9-nv-on', opacity: 0 }, svg);
      q.gl = sv('circle', { cx: q.x + cs / 2, cy: q.y + cs / 2, r: cs * 0.9, class: 't9-nv-glow', opacity: 0 }, svg);
    });
    var capaPk = sv('g', null, svg);
    var puntos = [];
    function punto() { var g = sv('g', null, capaPk); sv('circle', { r: 6, class: 't9-nv-halo' }, g); sv('circle', { r: 3, class: 't9-nv-pk' }, g); return g; }
    function paso(dt, azar) {
      cores.forEach(function (q) {
        if (azar() < dt * 0.35) q.v += 0.5;
        if (q.v >= 1) {
          q.v = 0; q.f = 1;
          var n = 1 + ((azar() * 2) | 0);
          for (var j = 0; j < n; j++) {
            var mismo = azar() < 0.7;
            var pool = mismo ? cores.filter(function (o) { return o.chip === q.chip && o !== q; }) : cores;
            var tg = pool[(azar() * pool.length) | 0];
            if (tg && tg !== q && pk.length < 90) pk.push({ a: q, b: tg, k: 0, v: 1 / (0.25 + Math.hypot(tg.x - q.x, tg.y - q.y) / (VW * 1.6)) });
          }
        }
        q.f = Math.max(0, q.f - dt * 2.4);
      });
      for (var i = pk.length - 1; i >= 0; i--) { var pq = pk[i]; pq.k += dt * pq.v; if (pq.k >= 1) { pq.b.v += 0.6; pk.splice(i, 1); } }
    }
    function pintar() {
      cores.forEach(function (q) { q.on.setAttribute('opacity', q.f > 0.05 ? (q.f * 0.9).toFixed(2) : 0); q.gl.setAttribute('opacity', q.f > 0.05 ? (0.3 * q.f).toFixed(2) : 0); });
      while (puntos.length < pk.length) puntos.push(punto());
      puntos.forEach(function (g, i) {
        var pq = pk[i];
        if (!pq) { g.setAttribute('display', 'none'); return; }
        g.removeAttribute('display');
        var ax = pq.a.x + cs / 2, ay = pq.a.y + cs / 2, bx = pq.b.x + cs / 2, by = pq.b.y + cs / 2;
        var L1 = Math.abs(bx - ax), L = L1 + Math.abs(by - ay) || 1, d = pq.k * L;
        var x = d < L1 ? ax + Math.sign(bx - ax) * d : bx, y = d < L1 ? ay : ay + Math.sign(by - ay) * (d - L1);
        g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');
      });
    }
    /* fotograma inicial: unos segundos de simulación con semilla fija */
    for (var t = 0; t < 150; t++) paso(1 / 60, R);
    pintar();
    var jugando = !reducido(), raf = 0, ult = 0, visible = true;
    var bt = h('button', { type: 'button', class: 'btn small', 'aria-pressed': 'false' });
    function etiqueta() { M.clear(bt); bt.appendChild(M.icon(jugando ? 'pausa' : 'play')); bt.appendChild(document.createTextNode(jugando ? 'Pausar' : 'Reproducir')); bt.setAttribute('aria-pressed', String(!jugando)); }
    function cuadro(now) {
      raf = 0;
      if (!el.isConnected || !jugando) return;
      if (!visible || document.hidden) { ult = 0; return; }
      var dt = ult ? Math.min(0.05, (now - ult) / 1000) : 1 / 60; ult = now;
      paso(dt, Math.random); pintar();
      raf = requestAnimationFrame(cuadro);
    }
    function arrancar() { if (!raf && jugando && el.isConnected) { ult = 0; raf = requestAnimationFrame(cuadro); } }
    bt.addEventListener('click', function () { jugando = !jugando; etiqueta(); if (jugando) arrancar(); });
    etiqueta();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (x) { visible = x.isIntersecting; if (visible) arrancar(); }); }, { rootMargin: '60px 0px' });
      io.observe(el);
    }
    var alVolver = function () { if (!el.isConnected) { document.removeEventListener('visibilitychange', alVolver); return; } if (!document.hidden) arrancar(); };
    document.addEventListener('visibilitychange', alVolver);
    el.appendChild(h('div', { class: 't9-nv' },
      h('div', { class: 't9-nv-top' }, h('p', { class: 't9-nv-l' }, 'chips neuromórficos · núcleos con memoria propia'), bt),
      svg,
      h('p', { class: 'w-note-s' }, reducido() ? 'Tu sistema pide reducir el movimiento: se muestra un fotograma fijo. Pulsa «Reproducir» si quieres verla en marcha.' : 'Esquema ilustrativo, sin escala física: cada cuadrado pequeño es un núcleo; los puntos son impulsos.')));
    setTimeout(arrancar, 0);
    marcarSeccion(el, 't9-seg-nv');
  };
})();
