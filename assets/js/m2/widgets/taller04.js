/* Laboratorios del Taller 4 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* =====================================================================
     Utilidades del taller
     ===================================================================== */
  var TAU = Math.PI * 2;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  var RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reducido() { return !!(RM && RM.matches); }
  /* Generador pseudoaleatorio con semilla: las simulaciones son estables entre recargas */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
  }
  function gauss(R) { var u = 0, v = 0; while (u === 0) u = R(); while (v === 0) v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
  function fmt(v, d) { return m2.fmt(v, d || 0); }
  /* 8,1e-7 → «8,1 × 10⁻⁷» */
  function sci(v, d, keepOne) {
    if (!isFinite(v) || v === 0) return '0';
    var e = Math.floor(Math.log10(Math.abs(v)) + 1e-9);
    var ms = Math.abs(v / Math.pow(10, e)).toFixed(d);
    if (parseFloat(ms) >= 10) { e += 1; ms = Math.abs(v / Math.pow(10, e)).toFixed(d); }
    ms = ms.replace(/\.?0+$/, '');
    var mant = ms.replace('.', ',');
    if (mant === '1' && !keepOne) return (v < 0 ? '−' : '') + m2.pw(e);
    return (v < 0 ? '−' : '') + mant + ' × ' + m2.pw(e);
  }
  /* 3200 J → «3,2 kJ» */
  function siUnit(v, unit) {
    var P = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p']];
    for (var i = 0; i < P.length; i++) {
      if (v >= P[i][0] * 0.9995) { var m = v / P[i][0]; return fmt(m, m < 10 && Math.abs(m - Math.round(m)) > 0.05 ? 1 : 0) + ' ' + P[i][1] + unit; }
    }
    return sci(v, 1) + ' ' + unit;
  }
  /* Energía en la unidad más legible: «1,7 MJ = 480,0 Wh» */
  function julios(J) {
    var partes = [siUnit(J, 'J')], wh = J / 3600;
    if (wh >= 1e9) partes.push(fmt(wh / 1e12, wh / 1e12 < 10 ? 2 : 1) + ' TWh');
    else if (wh >= 1e6) partes.push(fmt(wh / 1e6, wh / 1e6 < 10 ? 2 : 1) + ' MWh');
    else if (wh >= 1e3) partes.push(fmt(wh / 1e3, wh / 1e3 < 10 ? 2 : 1) + ' kWh');
    else if (wh >= 0.01) partes.push(fmt(wh, wh < 10 ? 2 : 1) + ' Wh');
    return partes.join(' = ');
  }
  /* Duración legible: «70 ms», «26 s», «3,5 h» */
  function duracion(s) {
    if (s < 1e-6) return sci(s, 1, true) + ' s';
    if (s < 1) return siUnit(s, 's');
    if (s < 120) return fmt(s, s < 10 ? 1 : 0) + ' s';
    if (s < 7200) return fmt(s / 60, s < 600 ? 1 : 0) + ' min';
    if (s < 172800) return fmt(s / 3600, s < 36000 ? 1 : 0) + ' h';
    if (s < 3.156e7 * 2) return fmt(s / 86400, s < 864000 ? 1 : 0) + ' días';
    var y = s / 3.156e7;
    return fmt(y, y < 10 ? 1 : 0) + ' años';
  }
  function S(tag, attrs, padre) { var e = M.s(tag, attrs); if (padre) padre.appendChild(e); return e; }
  function T(padre, x, y, txt, cls, extra) {
    var a = { x: x, y: y, class: cls || 't4-lb' };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    return S('text', a, padre).appendChild(document.createTextNode(txt)).parentNode;
  }
  function salida() { return h('div', { class: 'm2-out t4-out', 'aria-live': 'polite' }); }
  function dice() { return h('p', { class: 't4-say', 'aria-live': 'polite' }); }
  /* Grupo de botones excluyentes (aria-pressed) */
  function chipsUno(items, alElegir, sel, etiqueta) {
    var g = h('div', { class: 'chips', role: 'group', 'aria-label': etiqueta });
    var bs = items.map(function (it, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === sel) }, it.l);
      b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); alElegir(it, i); });
      g.appendChild(b);
      return b;
    });
    return g;
  }
  /* Redibuja cuando cambia el ancho del contenedor (y una vez al montarse) */
  function alAncho(caja, fn) {
    var ultimo = 0;
    function ir() {
      if (!caja.isConnected) return;
      var w = Math.round(caja.clientWidth);
      if (w >= 120 && Math.abs(w - ultimo) > 1) { ultimo = w; fn(w); }
    }
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { if (!caja.isConnected && ultimo) { ro.disconnect(); return; } ir(); });
      ro.observe(caja);
    } else {
      window.addEventListener('resize', ir);
    }
    setTimeout(ir, 0);
  }

  /* =====================================================================
     Lección I.0 · Umbral de una neurona (actividad «neuron»)
     ===================================================================== */
  W['m2.neuron'] = function (el) {
    var NE = 8, NI = 4, WE = 1, WI = 1.5;
    var th = 5, fired = 0, cancelar = null, i;
    var ex = [], inh = [];
    for (i = 0; i < NE; i++) ex.push(false);
    for (i = 0; i < NI; i++) inh.push(false);
    var caja = h('div', { class: 't4-svgbox t4-neuron' }), out = salida(), say = dice();
    var botonesE = [], botonesI = [];
    function grupo(arr, lista, etiqueta, tipo) {
      var g = h('div', { class: 'chips', role: 'group', 'aria-label': etiqueta });
      arr.forEach(function (_, k) {
        var b = h('button', { type: 'button', class: 'chip t4-chip-' + tipo, 'aria-pressed': 'false' }, (tipo === 'e' ? 'E' : 'I') + (k + 1));
        b.addEventListener('click', function () { arr[k] = !arr[k]; b.setAttribute('aria-pressed', String(arr[k])); dibujar(false); });
        lista.push(b);
        g.appendChild(b);
      });
      return g;
    }
    var gE = grupo(ex, botonesE, 'Sinapsis excitadoras activas', 'e'), gI = grupo(inh, botonesI, 'Sinapsis inhibidoras activas', 'i');
    var umbral = m2.deslizador({ etiqueta: 'Umbral (unidades arbitrarias)', min: 3, max: 8, step: 1, valor: 5, formato: function (v) { return String(v); }, alCambiar: function (v) { if (v !== th) { th = v; dibujar(false); } } });
    var bFire = h('button', { type: 'button', class: 'btn small primary' }, 'Enviar las señales a la vez');
    var bClear = h('button', { type: 'button', class: 'btn small ghost' }, 'Desactivar todas');
    bFire.addEventListener('click', function () { dibujar(true); });
    bClear.addEventListener('click', function () {
      ex.fill(false); inh.fill(false);
      botonesE.concat(botonesI).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      dibujar(false);
    });

    function dibujar(go) {
      var nE = ex.filter(Boolean).length, nI = inh.filter(Boolean).length;
      var sumE = nE * WE, sumI = nI * WI, v = sumE - sumI, ok = v >= th;
      if (cancelar) { cancelar(); cancelar = null; }
      M.clear(caja);
      var svg = S('svg', { viewBox: '84 8 400 210', class: 'm2-svg', role: 'img', 'aria-label': 'Neurona esquemática con ' + nE + ' entradas excitadoras y ' + nI + ' inhibidoras activas; ' + (ok ? 'supera el umbral' : 'no llega al umbral') }, caja);
      var cx = 200, cy = 118, k, a, x, y;
      for (k = 0; k < NE; k++) {
        a = -2.5 + k * (2.1 / (NE - 1)); x = cx + Math.cos(a) * 120; y = cy + Math.sin(a) * 92;
        S('path', { d: 'M' + cx + ',' + cy + 'L' + x.toFixed(1) + ',' + y.toFixed(1), class: 't4-conn' }, svg);
        S('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 11, class: ex[k] ? 't4-f-cnt' : 't4-f-bg t4-s-cnt' }, svg);
        T(svg, x, y + 5, '+', 't4-sym' + (ex[k] ? ' on' : ''), { 'text-anchor': 'middle' });
      }
      for (k = 0; k < NI; k++) {
        a = 1.0 + k * 0.42; x = cx + Math.cos(a) * 110; y = cy + Math.sin(a) * 84;
        S('path', { d: 'M' + cx + ',' + cy + 'L' + x.toFixed(1) + ',' + y.toFixed(1), class: 't4-conn' }, svg);
        S('rect', { x: (x - 10).toFixed(1), y: (y - 10).toFixed(1), width: 20, height: 20, rx: 3, class: inh[k] ? 't4-f-inf' : 't4-f-bg t4-s-inf' }, svg);
        T(svg, x, y + 5, '−', 't4-sym' + (inh[k] ? ' on' : ''), { 'text-anchor': 'middle' });
      }
      S('path', { d: 'M' + cx + ',' + (cy - 18) + 'l18,30h-36z', class: ok && go ? 't4-soma on' : 't4-soma' }, svg);
      var ax = S('path', { d: 'M' + (cx + 18) + ',' + (cy + 8) + 'C260,130 300,120 360,118', class: 't4-axon' }, svg);
      T(svg, 300, 108, 'axón', 't4-lb t4-lb-s', { 'text-anchor': 'middle' });
      /* termómetro del balance: de −6 a +8 */
      var bx = 392, by0 = 28, bh = 150;
      function sc(val) { return by0 + bh - (val + 6) / 14 * bh; }
      S('rect', { x: bx, y: by0, width: 28, height: bh, rx: 6, class: 't4-wash' }, svg);
      var yv = sc(clamp(v, -6, 8)), y0 = sc(0);
      S('rect', { x: bx + 4, y: Math.min(yv, y0), width: 20, height: Math.max(0.5, Math.abs(y0 - yv)), rx: 3, class: v >= 0 ? 't4-f-cnt' : 't4-f-inf' }, svg);
      S('line', { x1: bx - 6, x2: bx + 34, y1: sc(th), y2: sc(th), class: 't4-ref' }, svg);
      T(svg, bx + 38, sc(th) + 5, 'umbral', 't4-lb');
      T(svg, bx + 38, y0 + 5, '0', 't4-lb');
      T(svg, bx + 14, by0 + bh + 22, 'balance', 't4-lb', { 'text-anchor': 'middle' });
      if (go && ok) {
        fired++;
        var punto = S('circle', { cx: cx + 18, cy: cy + 8, r: 7, class: 't4-f-nrg' }, svg);
        var L = ax.getTotalLength ? ax.getTotalLength() : 0;
        var colocar = function (f) { if (!L) return; var q = ax.getPointAtLength(L * f); punto.setAttribute('cx', q.x.toFixed(1)); punto.setAttribute('cy', q.y.toFixed(1)); };
        if (reducido() || !L) colocar(1);
        else {
          var t0 = performance.now(), vivo = true;
          var paso = function (now) {
            if (!vivo || !svg.isConnected) return;
            var f = clamp((now - t0) / 900, 0, 1); colocar(ease(f));
            if (f < 1) requestAnimationFrame(paso);
          };
          requestAnimationFrame(paso);
          cancelar = function () { vivo = false; };
        }
      }
      M.clear(out);
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Balance: '), '+' + fmt(sumE) + ' − ' + fmt(sumI, sumI % 1 ? 1 : 0) + ' = ', h('b', null, fmt(v, v % 1 ? 1 : 0)), ' · umbral ' + th + ' → ', h('b', null, ok ? 'dispara' : 'no dispara'), fired ? ' · impulsos emitidos: ' + fired : ''));
      M.clear(say);
      say.appendChild(rich(go ? (ok ? '**¡Impulso!** El balance alcanza el umbral y la neurona dispara un pulso de todo o nada por el axón.' : 'Nada: el balance (' + fmt(v, v % 1 ? 1 : 0) + ') no llega al umbral (' + th + '). Activa más excitadoras o quita inhibidoras.') : 'Activa sinapsis y pulsa «Enviar las señales a la vez». Prueba también a subir el umbral.'));
    }
    el.appendChild(h('div', { class: 't4-lab' },
      p('Esquema simplificado en unidades arbitrarias: no representa voltajes reales.', { class: 'w-note-s' }),
      h('div', { class: 'm2-grid2' },
        h('div', null, h('p', { class: 't4-mini' }, 'Excitadoras (+1 cada una):'), gE),
        h('div', null, h('p', { class: 't4-mini' }, 'Inhibidoras (−1,5 cada una):'), gI)),
      umbral.el,
      p('Cada excitadora suma **+1**; cada inhibidora resta **−1,5**. Valores esquemáticos.', { class: 'w-note-s' }),
      h('div', { class: 'btnrow' }, bFire, bClear),
      caja,
      p('Círculos: sinapsis excitadoras · cuadrados: inhibidoras · rellenos: activas', { class: 'w-note-s' }),
      out, say));
    dibujar(false);
  };

  /* =====================================================================
     Lección I.1 · Refuerzo y debilitamiento sináptico (actividad «ltp»)
     ===================================================================== */
  W['m2.ltp'] = function (el) {
    var S0 = 0.3, wA = S0, wB = S0, uA = 0, uB = 0, enviada = null;
    var out = salida(), say = dice(), barras = h('div', { class: 't4-bars' });
    var bA = h('button', { type: 'button', class: 'btn small primary' }, 'Usar la conexión A');
    var bB = h('button', { type: 'button', class: 'btn small' }, 'Usar la conexión B');
    var bT = h('button', { type: 'button', class: 'btn small ghost' }, 'Dejar pasar el tiempo');
    var bS = h('button', { type: 'button', class: 'btn small primary' }, 'Enviar la misma señal por A y por B');
    var bR = h('button', { type: 'button', class: 'btn small ghost' }, 'Reiniciar');
    function usar(w) { return w + 0.15 * (1 - w); }
    function olvidar(w) { return S0 * 0.5 + (w - S0 * 0.5) * 0.85; }
    bA.addEventListener('click', function () { wA = usar(wA); uA++; wB = olvidar(wB); enviada = null; dibujar(); });
    bB.addEventListener('click', function () { wB = usar(wB); uB++; wA = olvidar(wA); enviada = null; dibujar(); });
    bT.addEventListener('click', function () { wA = olvidar(wA); wB = olvidar(wB); enviada = null; dibujar(); });
    bS.addEventListener('click', function () { enviada = [wA, wB]; dibujar(); });
    bR.addEventListener('click', function () { wA = wB = S0; uA = uB = 0; enviada = null; dibujar(); });
    function barra(lab, v, cls) {
      return h('div', { class: 't4-bar ' + cls },
        h('span', { class: 't4-bar-l' }, lab),
        h('span', { class: 'm2-bar', 'aria-hidden': 'true' }, h('i', { style: { width: (v * 100).toFixed(1) + '%' } })),
        h('span', { class: 't4-bar-v' }, fmt(v * 100, 0) + ' %'));
    }
    function dibujar() {
      M.clear(barras);
      barras.appendChild(barra('Eficacia de A', wA, 't4-a'));
      barras.appendChild(barra('Eficacia de B', wB, 't4-b'));
      if (enviada) {
        barras.appendChild(barra('Respuesta por A', enviada[0], 't4-a t4-resp'));
        barras.appendChild(barra('Respuesta por B', enviada[1], 't4-b t4-resp'));
      }
      M.clear(out);
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Usos: '), 'A ' + uA + ' · B ' + uB));
      M.clear(say);
      say.appendChild(rich(enviada ? 'La **misma señal** sale ' + (Math.abs(wA - wB) < 0.02 ? 'igual por las dos conexiones: aún no tienen historia distinta.' : 'más fuerte por **' + (wA > wB ? 'A' : 'B') + '** (' + fmt(Math.max(wA, wB) / Math.min(wA, wB), 1) + ' veces): la conexión «recuerda» su historia de uso.') :
        (uA + uB === 0 ? 'Las dos conexiones empiezan iguales. Usa una más que la otra y después envía la misma señal por las dos.' : 'Cada uso refuerza la conexión usada (potenciación) y, con el tiempo, la que no se usa se debilita (depresión). Los valores son esquemáticos.')));
    }
    el.appendChild(h('div', { class: 't4-lab' },
      h('div', { class: 'btnrow' }, bA, bB, bT),
      barras,
      h('div', { class: 'btnrow' }, bS, bR),
      out, say));
    dibujar();
  };

  /* =====================================================================
     Lección I.2 · Ritmos de disparo (actividad «hz»)
     ===================================================================== */
  W['m2.hz'] = function (el) {
    var RATES = [
      { l: '0,16 Hz · media sostenible', r: 0.16, st: 'estimado', t: 'Es la media cortical que permite el presupuesto energético (Lennie, 2003): un impulso cada seis segundos, aproximadamente.' },
      { l: '1 Hz · techo de los modelos', r: 1, st: 'estimado', t: 'Es el extremo alto del intervalo de 0,1–1 Hz que usan los modelos para la media.' },
      { l: '100 Hz como media (hipótesis)', r: 100, st: null, t: 'Una media así sería **incompatible** con el presupuesto energético del cerebro: más de 600 veces la media sostenible. Solo se usa en la cadena del «exaflop» popular.' },
      { l: '453 Hz · ráfaga máxima', r: 453, st: 'medido', burst: true, t: 'Es el máximo instantáneo medio de las interneuronas rápidas humanas, medido ex vivo con estimulación intensa (Wang et al., 2016). Ocurre en ráfagas breves, no como media.' }
    ];
    var cur = RATES[0], ancho = 560;
    var caja = h('div', { class: 't4-svgbox t4-ancha' }), out = salida(), say = dice();
    var ch = chipsUno(RATES, function (r) { cur = r; dibujar(); }, 0, 'Frecuencias de disparo');
    function impulsos(rate, Tt, seed) { var R = rng(seed), s = [], t = 0; for (;;) { t += -Math.log(1 - R()) / rate; if (t > Tt) break; s.push(t); } return s; }
    function dibujar() {
      var w = Math.max(280, ancho), x0 = 10, x1 = w - 10, y = 46;
      M.clear(caja);
      var svg = S('svg', { viewBox: '0 0 ' + w + ' 86', class: 'm2-svg', role: 'img', 'aria-label': 'Registro de 10 segundos de impulsos a ' + cur.l }, caja);
      function sx(s) { return x0 + s / 10 * (x1 - x0); }
      S('line', { x1: x0, x2: x1, y1: y, y2: y, class: 'chart-axis' }, svg);
      for (var s = 0; s <= 10; s++) {
        S('line', { x1: sx(s), x2: sx(s), y1: y, y2: y + 5, class: 'chart-axis' }, svg);
        if (s % 2 === 0) T(svg, sx(s), y + 18, s + ' s', 'chart-text', { 'text-anchor': s === 0 ? 'start' : (s === 10 ? 'end' : 'middle') });
      }
      var lista = cur.burst ? Array.from({ length: 22 }, function (_, i) { return 4.2 + i / 453; }) : impulsos(cur.r, 10, 5 + Math.round(cur.r * 7));
      if (lista.length > 400) S('rect', { x: x0, y: y - 22, width: x1 - x0, height: 20, class: 't4-f-inf', opacity: 0.55 }, svg);
      else {
        var g = S('g', { class: 't4-spk' + (cur.burst ? ' fino' : '') }, svg);
        lista.forEach(function (t) { S('line', { x1: sx(t).toFixed(1), x2: sx(t).toFixed(1), y1: y - 22, y2: y - 2 }, g); });
      }
      T(svg, x0, 12, cur.burst ? (w < 460 ? '22 impulsos a 453 Hz: menos de 0,05 s' : 'una ráfaga de 22 impulsos a 453 Hz dura menos de 0,05 s') : (w < 460 ? 'cada raya, un impulso (simulación)' : 'cada raya es un impulso (simulación al azar con esa media)'), 'chart-text');
      var porMin = cur.r * 60, porDia = cur.r * 86400;
      M.clear(out);
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'En estos 10 s: '), String(lista.length) + ' impulsos'));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, cur.burst ? 'Si ese ritmo se sostuviera (no se sostiene): ' : 'Media por minuto: '), fmt(porMin, porMin < 10 ? 1 : 0) + (cur.burst ? ' por minuto' : '')));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, cur.burst ? '…y por día: ' : 'Media por día: '), fmt(porDia, 0)));
      M.clear(say);
      if (cur.st) { say.appendChild(m2.marca(cur.st)); say.appendChild(document.createTextNode(' ')); }
      say.appendChild(rich(cur.t));
    }
    el.appendChild(h('div', { class: 't4-lab' }, ch, caja, out, say));
    dibujar();
    alAncho(caja, function (w) { ancho = w; dibujar(); });
  };

  /* =====================================================================
     Lección I.3 · Un reparto log-normal (actividad «skew»)
     ===================================================================== */
  W['m2.skew'] = function (el) {
    var sg = 0.9, semilla = 11, ancho = 560;
    var caja = h('div', { class: 't4-svgbox t4-ancha' }), out = salida(), say = dice();
    var desl = m2.deslizador({ etiqueta: 'Desigualdad del reparto (σ del logaritmo)', min: 2, max: 16, step: 1, valor: 9, formato: function (v) { return fmt(v / 10, 1); }, alCambiar: function (v) { if (v / 10 !== sg) { sg = v / 10; dibujar(); } } });
    var nb = h('button', { type: 'button', class: 'btn small ghost' }, 'Otra población al azar');
    nb.addEventListener('click', function () { semilla++; dibujar(); });
    function dibujar() {
      var R = rng(semilla * 101), N = 200, med0 = 0.3;
      var tasas = Array.from({ length: N }, function () { return med0 * Math.exp(sg * gauss(R)); }).sort(function (a, b) { return b - a; });
      var media = tasas.reduce(function (a, b) { return a + b; }, 0) / N, mediana = (tasas[99] + tasas[100]) / 2;
      var top = tasas.slice(0, 20).reduce(function (a, b) { return a + b; }, 0) / (media * N) * 100;
      var bajo = tasas.filter(function (x) { return x < media; }).length;
      var w = Math.max(280, ancho), x0 = 40, x1 = w - 8, y0 = 170, y1 = 14, hh = 196;
      M.clear(caja);
      var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + hh, class: 'm2-svg', role: 'img', 'aria-label': '200 neuronas ordenadas de más a menos activa; media ' + fmt(media, 2) + ' Hz y mediana ' + fmt(mediana, 2) + ' Hz' }, caja);
      var mx = tasas[0];
      function sy(v) { return y0 + v / mx * (y1 - y0); }
      var bw = (x1 - x0) / N;
      [0, mx / 2, mx].forEach(function (v) {
        S('line', { x1: x0, x2: x1, y1: sy(v), y2: sy(v), class: 'chart-grid' }, svg);
        T(svg, x0 - 5, sy(v) + 4, v === 0 ? '0' : fmt(v, v < 10 ? 1 : 0), 'chart-text', { 'text-anchor': 'end' });
      });
      tasas.forEach(function (v, i) {
        S('rect', { x: (x0 + i * bw).toFixed(2), y: sy(v).toFixed(1), width: Math.max(0.6, bw - 0.3).toFixed(2), height: (y0 - sy(v)).toFixed(1), class: i < 20 ? 't4-f-inf' : 't4-f-ink' }, svg);
      });
      S('line', { x1: x0, x2: x1, y1: sy(media), y2: sy(media), class: 't4-ref' }, svg);
      T(svg, x1, sy(media) - 5, 'media ' + fmt(media, 2) + ' Hz', 't4-lb-x t4-halo', { 'text-anchor': 'end' });
      S('line', { x1: x0, x2: x1, y1: sy(mediana), y2: sy(mediana), class: 't4-ref t4-dot' }, svg);
      T(svg, x1, sy(mediana) + 13, 'mediana ' + fmt(mediana, 2) + ' Hz', 't4-lb-x t4-halo', { 'text-anchor': 'end' });
      T(svg, x0, hh - 4, w < 460 ? '200 neuronas ordenadas · eje: Hz' : '200 neuronas, de la más activa a la menos · eje vertical: Hz', 'chart-text');
      M.clear(out);
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Media: '), fmt(media, 2) + ' Hz · ', h('span', { class: 't4-k' }, 'mediana (la neurona típica): '), fmt(mediana, 2) + ' Hz'));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'El 10 % más activo (rosa) produce: '), h('b', null, fmt(top, 0) + ' % de los impulsos')));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Neuronas por debajo de la media: '), bajo + ' de 200'));
      M.clear(say);
      say.appendChild(rich(sg < 0.5 ? 'Con poca desigualdad, media y mediana casi coinciden.' : 'La media queda por encima de la mediana: **' + bajo + ' de 200** neuronas disparan menos que la «media». Unas pocas muy activas tiran de ella hacia arriba.'));
    }
    el.appendChild(h('div', { class: 't4-lab' },
      p('Simulación ilustrativa: 200 tasas al azar con forma log-normal. Los valores no son mediciones.', { class: 'w-note-s' }),
      desl.el,
      p('Con σ pequeño, casi todas disparan parecido; con σ grande, unas pocas dominan.', { class: 'w-note-s' }),
      h('div', { class: 'btnrow' }, nb),
      caja, out, say));
    dibujar();
    alAncho(caja, function (w) { ancho = w; dibujar(); });
  };

  /* =====================================================================
     Lección I.4 · La energía de un día de cerebro (actividad «brainday»)
     ===================================================================== */
  W['m2.brainday'] = function (el) {
    var TT = [{ l: '1 segundo', t: 1 }, { l: '1 minuto', t: 60 }, { l: '1 hora', t: 3600 }, { l: '1 día', t: 86400 }, { l: '1 año', t: 3.156e7 }];
    var out = salida(), say = dice();
    var ch = chipsUno(TT, function (x) { dibujar(x); }, 3, 'Tiempo');
    function dibujar(x) {
      var E = 20 * x.t, fr = E / 24.6e6, kcal = E / 4184;
      M.clear(out);
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Energía = 20 W × ' + x.l + ' = '), h('b', null, julios(E))));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'En kilocalorías alimentarias (1 kcal = 4.184 J): '), fmt(kcal, kcal < 10 ? 2 : 0) + ' kcal'));
      out.appendChild(h('span', null, h('span', { class: 't4-k' }, 'Frontier (24,6 MW) gasta esa energía en: '), duracion(fr)));
      M.clear(say);
      say.appendChild(rich('Tu cerebro gasta en ' + x.l + ' lo mismo que un cargador rápido de 20 W en ese tiempo. Frontier lo gasta en ' + duracion(fr) + '. Recuerda: esto compara **facturas**, no eficiencias.'));
    }
    el.appendChild(h('div', { class: 't4-lab' },
      p('Elige un tiempo y multiplica la potencia del encéfalo, 20 W (estimado), por él.', { class: 'w-note-s' }),
      ch, out, say));
    dibujar(TT[3]);
  };

  /* =====================================================================
     Los cuatro niveles: datos comunes
     ===================================================================== */
  var NIVELES = [
    { n: 1, t: 'Sinapsis', m: '10¹⁴–10¹⁵ sinapsis', s: 'tamaño ~10⁻⁶ m', dim: 'cnt', sec: 'n-sinapsis', lec: 'I.1',
      ley: 'Círculos: vesículas llenas de neurotransmisor · puntos luminosos: neurotransmisor que cruza la hendidura · rectángulos pequeños: receptores · con el uso, la espina crece un poco.' },
    { n: 2, t: 'Neurona', m: '8,6 × 10¹⁰ neuronas', s: 'tamaño ~10⁻³ m', dim: 'cnt', sec: 'n-neurona', lec: 'I.2',
      ley: 'Triángulo: soma · líneas ramificadas: dendritas · línea que baja: axón · puntos luminosos: entradas que viajan hacia el soma · abajo a la derecha, el registro de impulsos.' },
    { n: 3, t: 'Microcircuito cortical', m: '1,5 × 10⁸ sinapsis en 1 mm³', s: 'tamaño ~10⁻³ m', dim: 'cnt', sec: 'n-microcircuito', lec: 'I.3',
      ley: 'Triángulos: neuronas piramidales · círculos pequeños: interneuronas · círculos medianos: células estrelladas de la capa L4 · destellos: impulsos · puntos que viajan: señales entre células.' },
    { n: 4, t: 'Encéfalo completo', m: '~2 × 10¹ W', s: 'tamaño ~10⁻¹ m', dim: 'nrg', sec: 'n-encefalo', lec: 'I.4', ley: null }
  ];

  /* Introducción: mapa de los cuatro niveles con sus cifras y escalas */
  W['m2.t4-mapa'] = function (el) {
    var ol = h('ol', { class: 't4-mapa' }, NIVELES.map(function (nv) {
      return h('li', null, h('a', { href: '#m2t4-' + nv.sec, class: 't4-mapa-a' },
        h('span', { class: 't4-mapa-n' }, 'Nivel ' + nv.n),
        h('b', null, nv.t),
        h('span', { class: 't4-mapa-m d-' + nv.dim }, nv.m),
        h('span', { class: 't4-mapa-s' }, nv.s)));
    }));
    el.appendChild(h('div', { class: 't4-mapa-box' },
      h('span', { class: 'lec-k' }, 'Los cuatro niveles del viaje'),
      ol,
      p('Cada nivel tiene su lección: [I.1](#m2t4-lec-i1) · [I.2](#m2t4-lec-i2) · [I.3](#m2t4-lec-i3) · [I.4](#m2t4-lec-i4). Empieza por la [lección I.0](#m2t4-lec-i0): neuronas y sinapsis.', { class: 'w-note-s' })));
  };

  /* =====================================================================
     Animaciones de los niveles (SVG + requestAnimationFrame)
     Cada escena: init(svg, w, h, R, uid) → estado; paso(z, t, dt, quieto).
     Con «quieto» se dibuja un fotograma fijo, sin movimiento.
     ===================================================================== */
  /* Reserva de círculos de brillo: se reutilizan en cada fotograma */
  function reserva(padre, n, cls) {
    var els = [], usados = 0, visibles = 0;
    return {
      inicio: function () { usados = 0; },
      brillo: function (x, y, r, a) {
        if (usados >= n || a <= 0.01) return;
        var e = els[usados];
        if (!e) { e = S('circle', { class: cls }, padre); els.push(e); }
        e.setAttribute('cx', x.toFixed(1)); e.setAttribute('cy', y.toFixed(1)); e.setAttribute('r', r.toFixed(1)); e.setAttribute('opacity', Math.min(1, a).toFixed(2));
        if (e.style.display) e.style.display = '';
        usados++;
      },
      fin: function () {
        for (var i = usados; i < Math.max(visibles, usados); i++) if (els[i]) els[i].style.display = 'none';
        visibles = usados;
      }
    };
  }
  function degradado(defs, id, cls) {
    var g = S('radialGradient', { id: id }, defs);
    S('stop', { offset: '0', class: cls, 'stop-opacity': '0.95' }, g);
    S('stop', { offset: '0.4', class: cls, 'stop-opacity': '0.45' }, g);
    S('stop', { offset: '1', class: cls, 'stop-opacity': '0' }, g);
    return 'url(#' + id + ')';
  }
  /* Rótulo con línea guía; ancho estimado para que nunca se salga de la figura */
  function rotulo(g, w, x, y, txt, anchor, cls) {
    var lineas = txt.split('\n'), tw = Math.max.apply(null, lineas.map(function (l) { return l.length; })) * 6.4;
    var lx = anchor === 'end' ? x - tw : (anchor === 'middle' ? x - tw / 2 : x);
    lx = clamp(lx, 6, Math.max(6, w - 6 - tw));
    var t = S('text', { x: lx.toFixed(1), y: y.toFixed(1), class: cls || 't4-nv-lb' }, g);
    lineas.forEach(function (l, i) { var ts = S('tspan', { x: lx.toFixed(1), dy: i ? '1.2em' : 0 }, t); ts.textContent = l; });
    return t;
  }
  function guia(g, x1, y1, x2, y2) { S('line', { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), class: 't4-nv-ld' }, g); }
  function elipseArco(cx, cy, rx, ry, a0, a1, n) {
    var d = '';
    for (var i = 0; i <= n; i++) { var a = lerp(a0, a1, i / n); d += (i ? 'L' : 'M') + (cx + rx * Math.cos(a)).toFixed(1) + ',' + (cy + ry * Math.sin(a)).toFixed(1); }
    return d;
  }

  /* ---------- 1. Sinapsis ---------- */
  var esSinapsis = {
    init: function (svg, w, hh, R, uid) {
      var estrecho = w < 480;
      var s = Math.min(w, hh), cx = w * (estrecho ? 0.34 : 0.42);
      var b = { x: cx, y: hh * 0.27, rx: Math.min(w * (estrecho ? 0.22 : 0.25), s * 0.44), ry: hh * 0.2 };
      var sp = { x: cx, y: hh * 0.675, rx: Math.min(w * 0.16, s * 0.3), ry: hh * 0.1 };
      var az = b.y + b.ry;
      var defs = S('defs', null, svg), brillo = degradado(defs, uid + '-gc', 't4-st-cnt');
      var gBase = S('g', null, svg);
      S('rect', { x: -2, y: (hh * 0.885).toFixed(1), width: w + 4, height: (hh * 0.2).toFixed(1), class: 't4-memb' }, gBase);
      S('path', { d: 'M' + (sp.x - sp.rx * 0.2) + ',' + (sp.y + sp.ry * 0.6) + 'Q' + (sp.x - sp.rx * 0.12) + ',' + (hh * 0.8) + ' ' + (sp.x - sp.rx * 0.3) + ',' + (hh * 0.885) + 'L' + (sp.x + sp.rx * 0.3) + ',' + (hh * 0.885) + 'Q' + (sp.x + sp.rx * 0.12) + ',' + (hh * 0.8) + ' ' + (sp.x + sp.rx * 0.2) + ',' + (sp.y + sp.ry * 0.6) + 'Z', class: 't4-memb' }, gBase);
      var gSp = S('g', null, gBase);
      S('ellipse', { cx: sp.x, cy: sp.y, rx: sp.rx, ry: sp.ry, class: 't4-memb' }, gSp);
      S('path', { d: elipseArco(sp.x, sp.y, sp.rx, sp.ry, Math.PI * 1.22, Math.PI * 1.78, 16), class: 't4-dens' }, gSp);
      S('ellipse', { cx: b.x, cy: b.y, rx: b.rx, ry: b.ry, class: 't4-memb' }, gBase);
      S('path', { d: elipseArco(b.x, b.y, b.rx, b.ry, Math.PI * 0.3, Math.PI * 0.7, 16), class: 't4-dens' }, gBase);
      /* mitocondria */
      var mx = b.x - b.rx * 0.45, my = b.y - b.ry * 0.35;
      var gM = S('g', { transform: 'translate(' + mx.toFixed(1) + ',' + my.toFixed(1) + ') rotate(-20)' }, gBase);
      S('ellipse', { cx: 0, cy: 0, rx: (s * 0.085).toFixed(1), ry: (s * 0.035).toFixed(1), class: 't4-mito' }, gM);
      var dm = '';
      for (var i = -3; i <= 3; i++) dm += 'M' + (i * s * 0.02).toFixed(1) + ',' + (-s * 0.025).toFixed(1) + 'Q' + (i * s * 0.02 + s * 0.01).toFixed(1) + ',0 ' + (i * s * 0.02).toFixed(1) + ',' + (s * 0.025).toFixed(1);
      S('path', { d: dm, class: 't4-mito-c' }, gM);
      /* receptores (dentro del grupo de la espina, que crece con el uso) */
      var rec = [];
      for (i = 0; i < 9; i++) {
        var rx = sp.x - sp.rx * 0.66 + (i + 0.5) / 9 * sp.rx * 1.32;
        var ry = sp.y - sp.ry * Math.sqrt(Math.max(0, 1 - Math.pow((rx - sp.x) / sp.rx, 2)));
        var base = S('rect', { x: (rx - s * 0.011).toFixed(1), y: (ry - s * 0.004).toFixed(1), width: (s * 0.022).toFixed(1), height: (s * 0.014).toFixed(1), class: 't4-rec' }, gSp);
        var on = S('rect', { x: (rx - s * 0.011).toFixed(1), y: (ry - s * 0.004).toFixed(1), width: (s * 0.022).toFixed(1), height: (s * 0.014).toFixed(1), class: 't4-rec-on', opacity: 0 }, gSp);
        rec.push({ x: rx, y: ry, f: 0, on: on, base: base });
      }
      /* vesículas */
      var gV = S('g', null, svg), ves = [];
      for (i = 0; i < 30; i++) {
        var a = R() * TAU, rr = Math.sqrt(R()) * 0.78;
        var v = { hx: b.x + Math.cos(a) * b.rx * rr * 0.82, hy: b.y + Math.sin(a) * b.ry * rr * 0.7 - b.ry * 0.05, r: s * (0.015 + R() * 0.007), st: 0, k: 0, ph: R() * TAU, fade: 1 };
        v.el = S('circle', { cx: v.hx.toFixed(1), cy: v.hy.toFixed(1), r: v.r.toFixed(1), class: 't4-ves' }, gV);
        ves.push(v);
      }
      var gG = S('g', { fill: brillo }, svg);
      /* rótulos */
      var gL = S('g', { 'aria-hidden': 'true' }, svg);
      var top = sp.y - sp.ry, lx = Math.min(w - 12, b.x + b.rx + (estrecho ? 14 : 26));
      rotulo(gL, w, lx, b.y - b.ry * 0.5, estrecho ? 'botón\npresináptico' : 'botón presináptico', 'start');
      guia(gL, b.x + b.rx * 0.9, b.y - b.ry * 0.4, lx - 6, b.y - b.ry * 0.5 - 3);
      rotulo(gL, w, lx, (az + top) / 2 + 4, estrecho ? 'hendidura\nsináptica' : 'hendidura sináptica', 'start');
      guia(gL, b.x + b.rx * 0.45, (az + top) / 2, lx - 6, (az + top) / 2);
      rotulo(gL, w, lx, sp.y + 4, estrecho ? 'espina\ndendrítica' : 'espina dendrítica', 'start');
      guia(gL, sp.x + sp.rx, sp.y, lx - 6, sp.y);
      rotulo(gL, w, 16, hh * 0.865, 'dendrita', 'start');
      if (!estrecho) {
        rotulo(gL, w, b.x - b.rx - 14, b.y + b.ry * 0.25, 'vesículas', 'end');
        guia(gL, b.x - b.rx * 0.55, b.y + b.ry * 0.2, b.x - b.rx - 10, b.y + b.ry * 0.25 - 3);
        rotulo(gL, w, b.x - b.rx - 14, my - b.ry * 0.45, 'mitocondria', 'end');
        guia(gL, mx - s * 0.06, my - s * 0.02, b.x - b.rx - 10, my - b.ry * 0.45 - 3);
        rotulo(gL, w, sp.x - sp.rx - 14, top + 6, 'receptores', 'end');
        guia(gL, sp.x - sp.rx * 0.55, top + sp.ry * 0.2, sp.x - sp.rx - 10, top + 3);
      }
      return { s: s, b: b, sp: sp, az: az, hh: hh, ves: ves, rec: rec, nt: [], next: 0.3, psp: [], ltp: 0, gSp: gSp, k: 1, glow: reserva(gG, 140, 't4-glow') };
    },
    paso: function (z, t, dt, quieto) {
      var s = z.s, b = z.b, sp = z.sp, az = z.az, hh = z.hh, i;
      if (!quieto) {
        z.next -= dt; z.ltp = Math.max(0, z.ltp - dt * 0.05);
        if (z.next <= 0) {
          z.next = 1.1 + Math.random() * 0.9;
          var libres = z.ves.filter(function (v) { return v.st === 0; });
          var v0 = libres[(Math.random() * libres.length) | 0];
          if (v0) { v0.st = 1; v0.k = 0; v0.sx = v0.hx; v0.sy = v0.hy; v0.tx = b.x + (Math.random() - 0.5) * b.rx * 0.7; v0.ty = az - v0.r - 1; }
        }
      }
      var k = 1 + z.ltp * 0.05, top = sp.y - sp.ry * k;
      if (Math.abs(k - z.k) > 0.002) {
        z.k = k;
        z.gSp.setAttribute('transform', 'translate(' + sp.x.toFixed(1) + ',' + sp.y.toFixed(1) + ') scale(' + k.toFixed(3) + ') translate(' + (-sp.x).toFixed(1) + ',' + (-sp.y).toFixed(1) + ')');
      }
      var G = z.glow; G.inicio();
      z.ves.forEach(function (v) {
        var x = v.hx + Math.sin(t * 0.8 + v.ph) * 2, y = v.hy + Math.cos(t * 0.7 + v.ph) * 2, a = v.fade;
        if (v.st === 1) {
          v.k += dt / 0.55; var e = ease(Math.min(1, v.k)); x = lerp(v.sx, v.tx, e); y = lerp(v.sy, v.ty, e);
          if (v.k >= 1) { v.st = 2; v.k = 0; for (var j = 0; j < 26; j++) z.nt.push({ x: v.tx + (Math.random() - 0.5) * v.r, y: az + 1, vx: (Math.random() - 0.5) * s * 0.25, vy: s * (0.12 + Math.random() * 0.2), age: 0 }); }
        } else if (v.st === 2) {
          x = v.tx; y = v.ty; v.k += dt / 0.5; a = 1 - v.k;
          if (v.k >= 1) { v.st = 0; v.fade = 0; }
        } else if (v.fade < 1) v.fade = Math.min(1, v.fade + dt * 0.8);
        v.el.setAttribute('cx', x.toFixed(1)); v.el.setAttribute('cy', y.toFixed(1)); v.el.setAttribute('opacity', clamp(a, 0, 1).toFixed(2));
        if (v.st === 2) G.brillo(x, y + v.r, v.r * 3.5, 0.7 * (1 - v.k));
      });
      if (quieto && !z.nt.length) for (i = 0; i < 18; i++) z.nt.push({ x: b.x + (Math.random() - 0.5) * b.rx * 0.5, y: lerp(az, top, Math.random()), vx: 0, vy: 0, age: 0.5 });
      for (i = z.nt.length - 1; i >= 0; i--) {
        var q = z.nt[i];
        if (!quieto) { q.age += dt; q.vx += (Math.random() - 0.5) * s * 2 * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy *= (1 - dt * 0.4); }
        if (!quieto && q.y >= top - 2 && Math.abs(q.x - sp.x) < sp.rx * 0.7) {
          var mejor = null, bd = 1e9;
          z.rec.forEach(function (r) { var d = Math.abs(r.x - q.x); if (d < bd) { bd = d; mejor = r; } });
          if (mejor) { mejor.f = 1; z.ltp = Math.min(1, z.ltp + 0.02); if (z.psp.length < 6 && Math.random() < 0.2) z.psp.push({ k: 0 }); }
          z.nt.splice(i, 1); continue;
        }
        if (q.age > 2.4 || q.y > hh) { z.nt.splice(i, 1); continue; }
        G.brillo(q.x, q.y, 5, 0.75);
      }
      z.rec.forEach(function (r) {
        if (!quieto) r.f = Math.max(0, r.f - dt * 1.4);
        if (r.f > 0.02) G.brillo(r.x, sp.y + (r.y - sp.y) * k, 11, 0.7 * r.f);
        var o = r.f > 0.05 ? r.f : 0;
        if (o !== r.o) { r.o = o; r.on.setAttribute('opacity', o.toFixed(2)); }
      });
      for (i = z.psp.length - 1; i >= 0; i--) {
        var ps = z.psp[i];
        if (!quieto) ps.k += dt / 1.1;
        if (ps.k >= 1) { z.psp.splice(i, 1); continue; }
        G.brillo(sp.x, lerp(sp.y, hh * 0.93, ease(ps.k)), s * 0.06 * (1 + ps.k), 0.5 * (1 - ps.k));
      }
      G.fin();
    }
  };

  /* ---------- 2. Neurona ---------- */
  var esNeurona = {
    init: function (svg, w, hh, R, uid) {
      var s = Math.min(w, hh), sx = w * 0.38, sy = hh * 0.58, r0 = Math.max(9, s * 0.032);
      var seg = [];
      function crecer(x, y, ang, len, wid, d, padre, tipo, maxD) {
        var x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
        var curva = (R() - 0.5) * len * 0.35;
        var cx = (x + x2) / 2 + Math.cos(ang + Math.PI / 2) * curva, cy = (y + y2) / 2 + Math.sin(ang + Math.PI / 2) * curva;
        var i = seg.length;
        seg.push({ x1: x, y1: y, x2: x2, y2: y2, cx: cx, cy: cy, w: wid, d: d, p: padre, tipo: tipo, hoja: true });
        if (d < maxD) {
          var nb = d < 1 ? 2 : (R() < 0.75 ? 2 : 1);
          seg[i].hoja = false;
          for (var k = 0; k < nb; k++) crecer(x2, y2, ang + (nb === 1 ? (R() - 0.5) * 0.5 : (k ? 1 : -1) * (0.25 + R() * 0.45)), len * (0.68 + R() * 0.12), wid * 0.7, d + 1, i, tipo, maxD);
        }
      }
      crecer(sx, sy - r0, -Math.PI / 2 + (R() - 0.5) * 0.2, hh * 0.17, 3.2, 0, -1, 'api', 5);
      [Math.PI * 0.85, Math.PI * 1.12, Math.PI * 0.12, -Math.PI * 0.1].forEach(function (a) { crecer(sx, sy, a + (R() - 0.5) * 0.2, hh * 0.085, 2.2, 0, -1, 'bas', 3); });
      var ax = [], x = sx + r0 * 0.2, y = sy + r0, a = Math.PI * 0.45;
      for (var i = 0; i < 14; i++) { var len = hh * 0.045, x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; ax.push({ x1: x, y1: y, x2: x2, y2: y2 }); x = x2; y = y2; a -= 0.11; if (y > hh * 0.9) a -= 0.25; }
      var hojas = [];
      seg.forEach(function (q, k) { if (q.hoja) hojas.push(k); });
      var defs = S('defs', null, svg), brillo = degradado(defs, uid + '-gc', 't4-st-cnt');
      var gB = S('g', null, svg);
      seg.forEach(function (q) { S('path', { d: 'M' + q.x1.toFixed(1) + ',' + q.y1.toFixed(1) + 'Q' + q.cx.toFixed(1) + ',' + q.cy.toFixed(1) + ' ' + q.x2.toFixed(1) + ',' + q.y2.toFixed(1), class: 't4-den', 'stroke-width': Math.max(0.8, q.w).toFixed(2) }, gB); });
      var esp = '';
      seg.forEach(function (q) {
        if (q.tipo !== 'api' || q.d < 1) return;
        for (var k = 1; k < 5; k++) { var u = k / 5, v = 1 - u; var px = v * v * q.x1 + 2 * v * u * q.cx + u * u * q.x2, py = v * v * q.y1 + 2 * v * u * q.cy + u * u * q.y2; esp += 'M' + (px + (k % 2 ? 2 : -3.5)).toFixed(1) + ',' + py.toFixed(1) + 'h1.8v1.8h-1.8z'; }
      });
      if (esp) S('path', { d: esp, class: 't4-espinas' }, gB);
      var dAx = 'M' + ax[0].x1.toFixed(1) + ',' + ax[0].y1.toFixed(1);
      ax.forEach(function (q) { dAx += 'L' + q.x2.toFixed(1) + ',' + q.y2.toFixed(1); });
      S('path', { d: dAx, class: 't4-axon-n' }, gB);
      var gG = S('g', { fill: brillo }, svg);
      var somaHalo = S('circle', { cx: sx, cy: sy, r: r0 * 3, fill: brillo, opacity: 0.25 }, svg);
      var dSoma = 'M' + sx + ',' + (sy - r0 * 1.5) + 'L' + (sx + r0 * 1.25) + ',' + (sy + r0) + 'L' + (sx - r0 * 1.25) + ',' + (sy + r0) + 'Z';
      S('path', { d: dSoma, class: 't4-soma-n' }, svg);
      var somaOn = S('path', { d: dSoma, class: 't4-soma-on', opacity: 0.25 }, svg);
      /* registro: neurona típica frente a interneurona rápida estimulada */
      var nw = w < 480, bx = w * (nw ? 0.5 : 0.56), bw = w * (nw ? 0.47 : 0.4), bh = Math.max(72, hh * 0.2), by = Math.min(hh * (nw ? 0.66 : 0.7), hh - bh - 6);
      var gR = S('g', null, svg);
      S('rect', { x: bx.toFixed(1), y: by.toFixed(1), width: bw.toFixed(1), height: bh.toFixed(1), rx: 8, class: 't4-raster' }, gR);
      var filas = [by + bh * 0.42, by + bh * 0.86];
      rotulo(gR, w, bx + 10, by + 14, nw ? 'típica · 0,1–1 Hz' : 'neurona típica · ~0,1–1 Hz', 'start');
      rotulo(gR, w, bx + 10, by + bh * 0.6 + 2, nw ? 'rápida · ~450 Hz' : 'rápida, estimulada · ~450 Hz', 'start');
      var lineas = filas.map(function (yy) {
        S('line', { x1: (bx + 10).toFixed(1), x2: (bx + bw - 10).toFixed(1), y1: yy.toFixed(1), y2: yy.toFixed(1), class: 't4-raster-base' }, gR);
        return S('path', { d: '', class: 't4-raster-spk' }, gR);
      });
      var gL = S('g', { 'aria-hidden': 'true' }, svg);
      rotulo(gL, w, sx + r0 * 2.2, sy + 4, 'soma', 'start');
      rotulo(gL, w, seg[0].x2 + 10, seg[0].y2, 'dendrita apical', 'start');
      var am = ax[5];
      rotulo(gL, w, am.x2 - 10, am.y2 + 4, 'axón', 'end');
      return { s: s, sx: sx, sy: sy, r0: r0, seg: seg, ax: ax, hojas: hojas, pul: [], v: 0, ap: [], flash: 0, spk: [[], []], nextIn: 0.2, nextB: 1.2,
        glow: reserva(gG, 90, 't4-glow'), somaHalo: somaHalo, somaOn: somaOn, rb: { x0: bx + 10, x1: bx + bw - 10, filas: filas, lineas: lineas } };
    },
    paso: function (z, t, dt, quieto) {
      var G = z.glow, i;
      G.inicio();
      if (!quieto) {
        z.nextIn -= dt;
        if (z.nextIn <= 0) {
          z.nextIn = 0.12 + Math.random() * 0.3;
          var hoja = z.hojas[(Math.random() * z.hojas.length) | 0], camino = [], k = hoja;
          while (k >= 0) { camino.push(k); k = z.seg[k].p; }
          z.pul.push({ camino: camino, i: 0, u: 0, big: Math.random() < 0.12 });
        }
      }
      for (i = z.pul.length - 1; i >= 0; i--) {
        var pu = z.pul[i];
        if (!quieto) {
          pu.u += dt * (pu.big ? 2.2 : 3.4);
          if (pu.u >= 1) { pu.u = 0; pu.i++; if (pu.i >= pu.camino.length) { z.v += pu.big ? 0.45 : 0.14; z.pul.splice(i, 1); continue; } }
        }
        var qq = z.seg[pu.camino[pu.i]], u = 1 - pu.u, v = 1 - u;
        G.brillo(u * u * qq.x2 + 2 * u * v * qq.cx + v * v * qq.x1, u * u * qq.y2 + 2 * u * v * qq.cy + v * v * qq.y1, pu.big ? 10 : 6, pu.big ? 0.85 : 0.6);
      }
      if (quieto && !z.pul.length) for (i = 0; i < 10; i++) { var qs = z.seg[(i * 7919) % z.seg.length]; G.brillo(qs.x2, qs.y2, 6, 0.55); }
      if (z.v >= 1 && !quieto) { z.v = 0; z.flash = 1; z.ap.push({ k: 0 }); z.spk[0].push(t); }
      if (!quieto) { z.v = Math.max(0, z.v - dt * 0.08); z.flash = Math.max(0, z.flash - dt * 2); }
      for (i = z.ap.length - 1; i >= 0; i--) {
        var ap = z.ap[i];
        if (!quieto) ap.k += dt * 1.4;
        if (ap.k >= 1) { z.ap.splice(i, 1); continue; }
        var pos = ap.k * z.ax.length, j = Math.min(z.ax.length - 1, Math.floor(pos)), f = pos - j, sg = z.ax[j];
        G.brillo(lerp(sg.x1, sg.x2, f), lerp(sg.y1, sg.y2, f), 13, 0.95);
      }
      z.somaHalo.setAttribute('r', (z.r0 * 3 + z.flash * z.r0 * 3).toFixed(1));
      z.somaHalo.setAttribute('opacity', Math.min(1, 0.25 + z.v * 0.3 + z.flash * 0.6).toFixed(2));
      z.somaOn.setAttribute('opacity', Math.min(1, 0.25 + z.v * 0.4 + z.flash * 0.4).toFixed(2));
      /* registro */
      var win = 4;
      if (!quieto) {
        if (Math.random() < dt * 0.8) z.spk[0].push(t);
        z.nextB -= dt;
        if (z.nextB <= 0) { z.nextB = 2.6 + Math.random(); for (i = 0; i < 22; i++) z.spk[1].push(t + i / 450); }
      } else if (!z.spk[0].length) {
        z.spk[0] = [t - 1.1, t - 2.9];
        for (i = 0; i < 22; i++) z.spk[1].push(t - 1.8 + i / 450);
      }
      var rb = z.rb;
      [0, 1].forEach(function (r) {
        var yy = rb.filas[r], d = '';
        z.spk[r] = z.spk[r].filter(function (ts) { return t - ts < win; });
        z.spk[r].forEach(function (ts) { if (ts > t) return; var x = rb.x1 - (t - ts) / win * (rb.x1 - rb.x0); d += 'M' + x.toFixed(1) + ',' + (yy - 9).toFixed(1) + 'v10'; });
        rb.lineas[r].setAttribute('d', d);
      });
      G.fin();
    }
  };

  /* ---------- 3. Microcircuito cortical ---------- */
  var esMicro = {
    init: function (svg, w, hh, R, uid) {
      var x0 = Math.max(w * 0.13, 46), x1 = w * 0.95, y0 = hh * 0.08, y1 = hh * 0.93;
      var fr = [0.09, 0.29, 0.14, 0.26, 0.22], nombres = ['L1', 'L2/3', 'L4', 'L5', 'L6'], cuota = [0.05, 0.3, 0.18, 0.25, 0.22];
      var bandas = [], yy = y0;
      fr.forEach(function (f, i) { var bh = (y1 - y0) * f; bandas.push({ y: yy, h: bh, n: nombres[i] }); yy += bh; });
      var N = Math.round(clamp(w * hh / 2400, 90, 230)), celdas = [];
      bandas.forEach(function (b, li) {
        var cnt = Math.round(N * cuota[li]);
        for (var i = 0; i < cnt; i++) {
          var inter = li === 0 || R() < (li === 2 ? 0.3 : 0.2);
          celdas.push({ x: lerp(x0 + 8, x1 - 8, R()), y: b.y + 6 + R() * (b.h - 12), tipo: inter ? 'i' : (li === 2 ? 's' : 'p'), rate: Math.exp(gauss(R) * 1.15 - 1.0), f: 0, out: [] });
        }
      });
      celdas.forEach(function (c, i) { for (var k = 0; k < 2; k++) { var j = (R() * celdas.length) | 0, d = celdas[j]; if (j !== i && Math.hypot(d.x - c.x, d.y - c.y) < w * 0.2) c.out.push(j); } });
      var defs = S('defs', null, svg), brillo = degradado(defs, uid + '-gc', 't4-st-cnt');
      var gB = S('g', null, svg);
      bandas.forEach(function (b, i) {
        if (i % 2 === 0) S('rect', { x: x0.toFixed(1), y: b.y.toFixed(1), width: (x1 - x0).toFixed(1), height: b.h.toFixed(1), class: 't4-banda' }, gB);
        S('line', { x1: x0.toFixed(1), x2: x1.toFixed(1), y1: b.y.toFixed(1), y2: b.y.toFixed(1), class: 't4-banda-l' }, gB);
        rotulo(gB, w, x0 - 8, b.y + b.h / 2 + 4, b.n, 'end', 't4-nv-lb t4-capa');
      });
      var dCon = '';
      celdas.forEach(function (c, i) { if (i % 3) return; c.out.forEach(function (j) { var d = celdas[j]; dCon += 'M' + c.x.toFixed(1) + ',' + c.y.toFixed(1) + 'L' + d.x.toFixed(1) + ',' + d.y.toFixed(1); }); });
      S('path', { d: dCon, class: 't4-conex' }, gB);
      var gFijo = S('g', { fill: brillo }, svg);
      celdas.forEach(function (c) { if (c.rate > 2.2) S('circle', { cx: c.x.toFixed(1), cy: c.y.toFixed(1), r: 10, opacity: 0.3 }, gFijo); });
      var gG = S('g', { fill: brillo }, svg);
      var gC = S('g', null, svg);
      celdas.forEach(function (c) {
        var a = 0.45 + clamp(Math.log10(c.rate + 0.05) + 1, 0, 2) * 0.22;
        if (c.tipo === 'p') c.el = S('path', { d: 'M' + c.x.toFixed(1) + ',' + (c.y - 5.2).toFixed(1) + 'l4.5,8.4h-9z', class: 't4-cel', 'fill-opacity': a.toFixed(2) }, gC);
        else c.el = S('circle', { cx: c.x.toFixed(1), cy: c.y.toFixed(1), r: c.tipo === 'i' ? 2.4 : 3.3, class: 't4-cel', 'fill-opacity': a.toFixed(2) }, gC);
        c.a = a; c.on = false;
      });
      return { celdas: celdas, tr: [], glow: reserva(gG, 170, 't4-glow') };
    },
    paso: function (z, t, dt, quieto) {
      var G = z.glow, i;
      G.inicio();
      z.celdas.forEach(function (c) {
        if (!quieto && Math.random() < c.rate * 1.2 * dt) { c.f = 1; c.out.forEach(function (j) { if (z.tr.length < 90) z.tr.push({ a: c, b: z.celdas[j], k: 0 }); }); }
        if (!quieto) c.f = Math.max(0, c.f - dt * 2.2);
        else if (c.rate > 2.2) c.f = 0.8;
        if (c.f > 0.02) G.brillo(c.x, c.y, 8 + c.f * 10, 0.75 * c.f);
        var on = c.f > 0.05;
        if (on !== c.on) { c.on = on; c.el.setAttribute('class', on ? 't4-cel on' : 't4-cel'); c.el.setAttribute('fill-opacity', on ? '1' : c.a.toFixed(2)); }
      });
      for (i = z.tr.length - 1; i >= 0; i--) {
        var q = z.tr[i];
        if (!quieto) q.k += dt * 2.6;
        if (q.k >= 1) { z.tr.splice(i, 1); continue; }
        G.brillo(lerp(q.a.x, q.b.x, q.k), lerp(q.a.y, q.b.y, q.k), 4, 0.8);
      }
      G.fin();
    }
  };

  /* ---------- 4. Encéfalo completo ---------- */
  var esEncefalo = {
    init: function (svg, w, hh, R, uid) {
      var ancho = w >= 480;
      var cx = w * (ancho ? 0.4 : 0.47), cy = hh * 0.42, rx = Math.min(w * (ancho ? 0.3 : 0.38), hh * 0.62), ry = Math.min(hh * 0.3, rx * 0.66);
      function borde(th) { var wob = 1 + 0.045 * Math.sin(3 * th) + 0.02 * Math.sin(7 * th), sy = Math.sin(th); return [cx + rx * Math.cos(th) * wob, cy + ry * (sy > 0 ? sy * 0.72 : sy) * wob]; }
      var cb = { x: cx + rx * 0.55, y: cy + ry * 0.72, rx: rx * 0.3, ry: ry * 0.3 };
      var defs = S('defs', null, svg), ambar = degradado(defs, uid + '-gn', 't4-st-nrg'), brillo = degradado(defs, uid + '-gc', 't4-st-cnt');
      var halo = S('circle', { cx: cx.toFixed(1), cy: cy.toFixed(1), r: (rx * 1.25).toFixed(1), fill: ambar, opacity: 0.2 }, svg);
      var gB = S('g', null, svg);
      S('path', { d: 'M' + (cx + rx * 0.18) + ',' + (cy + ry * 0.55) + 'L' + (cx + rx * 0.34) + ',' + (cy + ry * 0.58) + 'L' + (cx + rx * 0.36) + ',' + (cy + ry * 1.45) + 'L' + (cx + rx * 0.26) + ',' + (cy + ry * 1.45) + 'Z', class: 't4-memb' }, gB);
      S('ellipse', { cx: cb.x.toFixed(1), cy: cb.y.toFixed(1), rx: cb.rx.toFixed(1), ry: cb.ry.toFixed(1), transform: 'rotate(-8.6 ' + cb.x.toFixed(1) + ' ' + cb.y.toFixed(1) + ')', class: 't4-memb' }, gB);
      var df = '';
      for (var i = 1; i < 6; i++) { var fy = (i / 6 - 0.5) * 1.6, fx = cb.rx * Math.sqrt(1 - fy * fy) * 0.95; df += elipseArco(cb.x, cb.y + cb.ry * fy, fx, cb.ry * 0.12, Math.PI, TAU, 10); }
      S('path', { d: df, class: 't4-folia', transform: 'rotate(-8.6 ' + cb.x.toFixed(1) + ' ' + cb.y.toFixed(1) + ')' }, gB);
      var dh = '';
      for (i = 0; i <= 120; i++) { var pt = borde(i / 120 * TAU); dh += (i ? 'L' : 'M') + pt[0].toFixed(1) + ',' + pt[1].toFixed(1); }
      S('path', { d: dh + 'Z', class: 't4-memb t4-hemi' }, gB);
      var dg = '';
      for (var r = 0; r < 3; r++) {
        for (i = 0; i <= 90; i++) { var th = i / 90 * TAU, q = borde(th), rho = 0.62 + r * 0.1 + 0.025 * Math.sin(th * 11 + r); dg += (i ? 'L' : 'M') + (cx + (q[0] - cx) * rho).toFixed(1) + ',' + (cy + (q[1] - cy) * rho).toFixed(1); }
      }
      S('path', { d: dg, class: 't4-giros' }, gB);
      /* neuronas: cada punto, ~100 millones */
      var puntos = [];
      for (i = 0; i < 163; i++) { var a = R() * TAU, ro = lerp(0.82, 0.97, R()), pb = borde(a); puntos.push({ x: cx + (pb[0] - cx) * ro, y: cy + (pb[1] - cy) * ro, g: 'cor' }); }
      var k = 0;
      while (k < 690) { var ux = R() * 2 - 1, uy = R() * 2 - 1; if (ux * ux + uy * uy <= 1) { puntos.push({ x: cb.x + ux * cb.rx, y: cb.y + uy * cb.ry, g: 'cer' }); k++; } }
      for (i = 0; i < 7; i++) puntos.push({ x: cx + rx * (0.05 + R() * 0.3), y: cy + ry * (0.15 + R() * 0.4), g: 'res' });
      var gG = S('g', { fill: brillo }, svg);
      var dCor = '', dCer = '', dRes = '';
      puntos.forEach(function (d) {
        var rr = d.g === 'cer' ? 1.35 : 1.9, c = 'M' + (d.x - rr).toFixed(1) + ',' + d.y.toFixed(1) + 'a' + rr + ',' + rr + ' 0 1,0 ' + (2 * rr) + ',0a' + rr + ',' + rr + ' 0 1,0 ' + (-2 * rr) + ',0';
        if (d.g === 'cor') dCor += c; else if (d.g === 'cer') dCer += c; else dRes += c;
        d.f = 0;
      });
      S('path', { d: dCor, class: 't4-pt-cor' }, svg);
      S('path', { d: dCer, class: 't4-pt-cer' }, svg);
      S('path', { d: dRes, class: 't4-pt-res' }, svg);
      if (ancho) {
        var gL = S('g', { 'aria-hidden': 'true' }, svg), lx = cx + rx + 22;
        rotulo(gL, w, lx, cy - ry * 0.55, 'corteza cerebral · 19 %', 'start');
        guia(gL, cx + rx * 0.78, cy - ry * 0.5, lx - 6, cy - ry * 0.55 - 3);
        rotulo(gL, w, lx, cb.y + 4, 'cerebelo · 80 %', 'start');
        guia(gL, cb.x + cb.rx, cb.y, lx - 6, cb.y);
        rotulo(gL, w, lx, cy + ry * 1.3, 'cada punto ≈ 100 millones', 'start', 't4-nv-lb t4-nv-lb3');
        rotulo(gL, w, cx + rx * 0.14, cy + ry * 1.38, 'tronco encefálico', 'end');
      }
      return { puntos: puntos, halo: halo, glow: reserva(gG, 80, 't4-glow') };
    },
    paso: function (z, t, dt, quieto) {
      var br = quieto ? 0.5 : 0.5 + 0.5 * Math.sin(t * 1.4);
      z.halo.setAttribute('opacity', (0.16 + br * 0.2).toFixed(3));
      var G = z.glow;
      G.inicio();
      z.puntos.forEach(function (d) {
        if (!quieto && Math.random() < dt * 0.08) d.f = 1;
        if (!quieto) d.f = Math.max(0, d.f - dt * 1.5);
        if (d.f > 0.05) G.brillo(d.x, d.y, 6, 0.7 * d.f);
      });
      G.fin();
    }
  };

  var ESCENAS = [esSinapsis, esNeurona, esMicro, esEncefalo];
  var nZoom = 0;

  /* Figura de los niveles: empieza en su nivel; ‹ ›, flechas o deslizar el dedo cambian de nivel */
  function zoom(k0) {
    return function (el) {
      var k = k0, z = null, w = 0, hh = 0, t = 0, ultimo = 0, raf = 0;
      var enMarcha = !reducido(), visible = false, uid = 't4z' + (++nZoom);
      var hud = h('div', { class: 't4-nv-hud' });
      var escenario = h('div', { class: 't4-nv-stage', tabindex: '0', role: 'group' });
      var ley = h('p', { class: 'w-note-s t4-nv-ley' });
      var aviso = h('p', { class: 'sr-only', 'aria-live': 'polite' });
      var bPrev = h('button', { type: 'button', class: 'btn small t4-nv-fl' }, '‹');
      var bNext = h('button', { type: 'button', class: 'btn small t4-nv-fl' }, '›');
      var puntos = h('span', { class: 't4-nv-dots', 'aria-hidden': 'true' }, NIVELES.map(function () { return h('i'); }));
      var bPlay = h('button', { type: 'button', class: 'btn small ghost t4-nv-play' });
      var svg = null;

      function pintarPlay() {
        M.clear(bPlay);
        bPlay.appendChild(M.icon(enMarcha ? 'pausa' : 'play'));
        bPlay.appendChild(document.createTextNode(enMarcha ? 'Pausar' : 'Reproducir'));
        bPlay.setAttribute('aria-pressed', String(!enMarcha));
        bPlay.setAttribute('aria-label', enMarcha ? 'Pausar la animación' : 'Reproducir la animación');
      }
      function pintarHud() {
        var nv = NIVELES[k];
        M.clear(hud);
        hud.appendChild(h('span', { class: 't4-nv-n' }, '0' + nv.n));
        hud.appendChild(h('span', { class: 't4-nv-g' }, 'Cerebro'));
        hud.appendChild(h('b', { class: 't4-nv-t' }, nv.t));
        hud.appendChild(h('span', { class: 'dimchip d-' + nv.dim }, nv.m));
        hud.appendChild(h('span', { class: 't4-nv-s' }, nv.s));
        M.clear(ley);
        if (nv.ley) ley.appendChild(rich(nv.ley));
        else ley.appendChild(h('span', { class: 't4-ley-enc' },
          h('span', null, h('i', { class: 't4-sw t4-sw-cor' }), 'corteza: 163 puntos (azul claro)'),
          h('span', null, h('i', { class: 't4-sw t4-sw-cer' }), 'cerebelo: 690 (azul intenso)'),
          h('span', null, h('i', { class: 't4-sw t4-sw-res' }), 'resto: 7 (gris)'),
          h('span', null, 'cada punto ≈ 100 millones de neuronas · resplandor ámbar: unos 20 W')));
        Array.prototype.forEach.call(puntos.children, function (d, i) { d.classList.toggle('on', i === k); });
        bPrev.disabled = k === 0; bNext.disabled = k === NIVELES.length - 1;
        bPrev.setAttribute('aria-label', k > 0 ? 'Nivel anterior: ' + NIVELES[k - 1].t : 'Primer nivel');
        bNext.setAttribute('aria-label', k < NIVELES.length - 1 ? 'Nivel siguiente: ' + NIVELES[k + 1].t : 'Último nivel del cerebro');
        escenario.setAttribute('aria-label', 'Animación del nivel ' + nv.n + ' de 9: ' + nv.t + '. Usa las flechas izquierda y derecha para cambiar de nivel.');
      }
      function construir() {
        var ww = Math.round(escenario.clientWidth);
        w = ww >= 120 ? ww : 640;
        hh = Math.round(clamp(w * 0.62, 270, 430));
        if (svg) svg.remove();
        svg = S('svg', { viewBox: '0 0 ' + w + ' ' + hh, class: 't4-nv-svg', role: 'img', 'aria-label': 'Esquema animado: ' + NIVELES[k].t + '. ' + (NIVELES[k].ley || 'Silueta de un hemisferio con el cerebelo y el tronco encefálico; cada punto representa unos 100 millones de neuronas.') }, escenario);
        z = ESCENAS[k].init(svg, w, hh, rng(97 + k * 13), uid);
        ESCENAS[k].paso(z, t, 0, !enMarcha);
      }
      function fotograma(now) {
        raf = 0;
        if (!el.isConnected) { detener(); return; }
        var dt = ultimo ? Math.min(0.05, (now - ultimo) / 1000) : 0;
        ultimo = now; t += dt;
        ESCENAS[k].paso(z, t, dt, false);
        if (enMarcha && visible) raf = requestAnimationFrame(fotograma);
      }
      function arrancar() { if (!raf && enMarcha && visible && el.isConnected) { ultimo = 0; raf = requestAnimationFrame(fotograma); } }
      function parar() { if (raf) cancelAnimationFrame(raf); raf = 0; }
      var io = null, ro = null;
      function detener() { parar(); if (io) io.disconnect(); if (ro) ro.disconnect(); }
      function ir(nk) {
        if (nk < 0 || nk >= NIVELES.length || nk === k) return;
        k = nk; pintarHud(); construir();
        aviso.textContent = 'Nivel ' + NIVELES[k].n + ' de 9: ' + NIVELES[k].t;
      }
      bPrev.addEventListener('click', function () { ir(k - 1); });
      bNext.addEventListener('click', function () { ir(k + 1); });
      bPlay.addEventListener('click', function () {
        enMarcha = !enMarcha; pintarPlay();
        if (enMarcha) arrancar(); else parar();
      });
      escenario.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault(); ir(k + (e.key === 'ArrowRight' ? 1 : -1));
      });
      var toque = null;
      escenario.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') return; toque = { x: e.clientX, y: e.clientY, t: performance.now() }; });
      escenario.addEventListener('pointerup', function (e) {
        if (!toque) return;
        var dx = e.clientX - toque.x, dy = e.clientY - toque.y, dur = performance.now() - toque.t; toque = null;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4 && dur < 800) ir(k + (dx < 0 ? 1 : -1));
      });
      escenario.addEventListener('pointercancel', function () { toque = null; });

      pintarPlay(); pintarHud();
      el.appendChild(h('div', { class: 't4-nv' }, hud, escenario, ley,
        h('div', { class: 't4-nv-ctl' }, h('div', { class: 't4-nv-nav' }, bPrev, puntos, bNext), bPlay),
        p('Esquema ilustrativo, sin escala física. Cambia de nivel con ‹ ›, con las flechas del teclado (sobre la figura) o deslizando el dedo.', { class: 'w-note-s' }),
        aviso));
      construir();
      setTimeout(function () {
        if ('IntersectionObserver' in window) {
          io = new IntersectionObserver(function (es) {
            if (!el.isConnected) { detener(); return; }
            visible = es[es.length - 1].isIntersecting;
            if (visible) arrancar(); else parar();
          }, { rootMargin: '60px 0px' });
          io.observe(escenario);
        } else { visible = true; arrancar(); }
        if ('ResizeObserver' in window) {
          ro = new ResizeObserver(function () {
            if (!el.isConnected) { detener(); return; }
            var ww = Math.round(escenario.clientWidth);
            if (ww >= 120 && Math.abs(ww - w) > 1) construir();
          });
          ro.observe(escenario);
        }
      }, 0);
    };
  }
  W['m2.nv-sinapsis'] = zoom(0);
  W['m2.nv-neurona'] = zoom(1);
  W['m2.nv-microcircuito'] = zoom(2);
  W['m2.nv-encefalo'] = zoom(3);
})();
