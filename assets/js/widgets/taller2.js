/* Widgets del Taller 2: duplicar, DRAM, paquetes, gráfico de Moore, ELIZA,
   explosión de posibilidades y el tablero de arroz. */
(function () {
  'use strict';
  var M = window.M, h = M.h, s = M.s, W = M.widgets;

  function vivo(el) { return document.body.contains(el); }

  /* ---------- Duplicar cada dos años ---------- */
  W.duplicar = function (el) {
    var anios = 20, periodo = 2;
    var big = h('div', { class: 'w-big' });
    var txt = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var lbl = h('b');
    var rango = h('input', { type: 'range', min: 0, max: 40, value: anios, id: 'dup-anios', 'aria-label': 'Años' });
    var b2 = h('button', { class: 'chip', type: 'button' }, 'Cada dos años (ajuste de 1975)');
    var b1 = h('button', { class: 'chip', type: 'button' }, 'Cada año (predicción de 1965)');
    function pintar() {
      var veces = Math.floor(anios / periodo);
      var factor = BigInt(2) ** BigInt(veces);
      lbl.textContent = anios;
      big.textContent = '× ' + M.miles(factor);
      var desde = BigInt(2300) * factor;
      txt.textContent = 'En ' + anios + ' años hay ' + veces + (veces === 1 ? ' duplicación' : ' duplicaciones') + '. Si se parte de los 2.300 transistores del Intel 4004 (1971), en ' + (1971 + anios) + ' serían unos ' + M.miles(desde) + ' (' + M.enPalabras(desde) + ').';
      b2.setAttribute('aria-pressed', String(periodo === 2));
      b1.setAttribute('aria-pressed', String(periodo === 1));
    }
    b2.addEventListener('click', function () { periodo = 2; pintar(); });
    b1.addEventListener('click', function () { periodo = 1; pintar(); });
    rango.addEventListener('input', function () { anios = Number(rango.value); pintar(); });
    el.appendChild(h('div', { class: 'btnrow' }, b2, b1));
    el.appendChild(h('label', { class: 'w-field', for: 'dup-anios' }, h('span', null, ['Años transcurridos: ', lbl]), rango));
    el.appendChild(big);
    el.appendChild(txt);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Es una cuenta, no una predicción: la ley de Moore es una observación de la industria, no una ley de la naturaleza.'));
    pintar();
  };

  /* ---------- DRAM: baldes con agujerito ---------- */
  W.dram = function (el) {
    var letra = 'A', bits = [], nivel = [], auto = true, ultimo = 0, reloj = null;
    var fila = h('div', { class: 'baldes', 'aria-hidden': 'true' });
    var lectura = h('div', { class: 'w-out', 'aria-live': 'polite' });
    var inp = h('input', { class: 'input', id: 'dram-letra', maxlength: 1, value: letra, style: { maxWidth: '80px', fontSize: '1.2rem', textAlign: 'center' }, 'aria-label': 'Letra que se guarda' });
    var bAuto = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'true' }, 'Recarga automática encendida');
    function escribir() {
      var c = (inp.value || 'A').charCodeAt(0) & 255;
      letra = String.fromCharCode(c);
      bits = []; nivel = [];
      for (var i = 7; i >= 0; i--) { var b = (c >> i) & 1; bits.push(b); nivel.push(b ? 1 : 0); }
      ultimo = performance.now();
    }
    function leer() { return nivel.map(function (n) { return n >= 0.5 ? 1 : 0; }); }
    function recargar() {
      nivel = nivel.map(function (n) { return n >= 0.5 ? 1 : 0; });
      ultimo = performance.now();
    }
    function pintar() {
      M.clear(fila);
      var lei = leer();
      nivel.forEach(function (n, i) {
        fila.appendChild(h('div', { class: 'balde' }, h('div', { class: 'bk' }, h('i', { style: { height: (n * 100) + '%' } })), h('span', { class: 'bb' }, lei[i])));
      });
      var code = parseInt(lei.join(''), 2);
      var intacto = lei.join('') === bits.join('');
      lectura.textContent = 'Se guardó «' + letra + '». Hoy se lee: ' + (code >= 32 && code !== 127 ? '«' + String.fromCharCode(code) + '»' : 'un carácter invisible (' + code + ')') + (intacto ? '. El dato está intacto.' : '. ¡El dato se perdió por falta de recarga!');
    }
    function tick() {
      if (!vivo(el)) { clearInterval(reloj); return; }
      nivel = nivel.map(function (n) { return Math.max(0, n - 0.03); });
      if (auto && performance.now() - ultimo > 1200) recargar();
      pintar();
    }
    bAuto.addEventListener('click', function () { auto = !auto; bAuto.setAttribute('aria-pressed', String(auto)); bAuto.textContent = auto ? 'Recarga automática encendida' : 'Recarga automática apagada'; });
    inp.addEventListener('input', function () { escribir(); pintar(); });
    escribir(); pintar();
    reloj = setInterval(tick, 100);
    el.appendChild(h('p', { class: 'w-note' }, 'Cada bit es un balde: lleno es 1, vacío es 0. Los baldes se vacían solos. Apague la recarga y mire qué pasa con la letra guardada.'));
    el.appendChild(h('div', { class: 'w-row' }, h('label', { class: 'w-field', for: 'dram-letra' }, h('span', null, 'Letra'), inp), bAuto,
      h('button', { class: 'btn small', type: 'button', onclick: function () { recargar(); pintar(); } }, 'Recargar ahora'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { escribir(); pintar(); } }, 'Volver a escribir la letra')));
    el.appendChild(fila);
    el.appendChild(lectura);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Animación muy lenta a propósito: en un chip real la recarga ocurre muchas veces por segundo.'));
  };

  /* ---------- Red de paquetes: «login» ---------- */
  W.paquetes = function (el) {
    var NODOS = { ucla: [60, 120], a: [250, 40], b: [250, 200], sri: [440, 120] };
    var RUTAS = [['ucla', 'a', 'sri'], ['ucla', 'b', 'sri'], ['ucla', 'a', 'b', 'sri'], ['ucla', 'b', 'a', 'sri']];
    var svg = s('svg', { viewBox: '0 0 500 250', role: 'img', 'aria-label': 'Red de cuatro nodos entre UCLA y SRI' });
    [['ucla', 'a'], ['ucla', 'b'], ['a', 'sri'], ['b', 'sri'], ['a', 'b']].forEach(function (e) {
      svg.appendChild(s('line', { class: 'edge', x1: NODOS[e[0]][0], y1: NODOS[e[0]][1], x2: NODOS[e[1]][0], y2: NODOS[e[1]][1] }));
    });
    Object.keys(NODOS).forEach(function (k) {
      svg.appendChild(s('circle', { class: 'node', cx: NODOS[k][0], cy: NODOS[k][1], r: k === 'ucla' || k === 'sri' ? 24 : 14 }));
      if (k === 'ucla' || k === 'sri') svg.appendChild(s('text', { class: 'nlab', x: NODOS[k][0], y: NODOS[k][1] + 44, 'text-anchor': 'middle' }, k.toUpperCase()));
    });
    var capa = s('g');
    svg.appendChild(capa);
    var llegada = h('div', { class: 'w-big', style: { letterSpacing: '0.2em' } }, '_ _ _ _ _');
    var msg = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var corriendo = false;
    function punto(ruta, f) {
      var segs = ruta.length - 1, t = f * segs, i = Math.min(segs - 1, Math.floor(t)), r = t - i;
      var A = NODOS[ruta[i]], B = NODOS[ruta[i + 1]];
      return [A[0] + (B[0] - A[0]) * r, A[1] + (B[1] - A[1]) * r];
    }
    function enviar(modo1969) {
      if (corriendo) return;
      corriendo = true;
      M.clear(capa);
      var palabra = 'LOGIN'.split('');
      var recibido = palabra.map(function () { return '_'; });
      llegada.textContent = recibido.join(' ');
      var paquetes = palabra.map(function (c, i) {
        var ruta = modo1969 ? RUTAS[0] : RUTAS[Math.floor(Math.random() * RUTAS.length)];
        var g = s('g', null, s('circle', { class: 'pk', r: 15 }), s('text', { class: 'pkt', 'text-anchor': 'middle', y: 5 }, c), s('text', { class: 'nlab', 'text-anchor': 'middle', y: -20 }, String(i + 1)));
        capa.appendChild(g);
        return { c: c, i: i, ruta: ruta, g: g, inicio: modo1969 ? i * 900 : i * 250 + Math.random() * 300, dur: modo1969 ? 1500 : 1300 + Math.random() * 1600 * (ruta.length - 2), listo: false };
      });
      var t0 = performance.now(), caido = false, orden = [];
      function frame(now) {
        if (!vivo(el)) return;
        var t = now - t0, activos = 0;
        paquetes.forEach(function (pq) {
          if (pq.listo) return;
          var f = (t - pq.inicio) / pq.dur;
          if (caido || f < 0) { pq.g.setAttribute('opacity', caido ? 0 : 0); if (!caido) activos++; return; }
          pq.g.setAttribute('opacity', 1);
          if (f >= 1) {
            pq.listo = true; pq.g.setAttribute('opacity', 0);
            recibido[pq.i] = pq.c; orden.push(pq.i + 1);
            llegada.textContent = recibido.join(' ');
            if (modo1969 && orden.length === 2) {
              caido = true;
              msg.textContent = 'Llegaron la «L» y la «O»… y el sistema se cayó. Así fue el primer mensaje de ARPANET, el 29 de octubre de 1969.';
            }
            return;
          }
          activos++;
          var p = punto(pq.ruta, f);
          pq.g.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ')');
        });
        if (!caido && activos > 0) requestAnimationFrame(frame);
        else {
          corriendo = false;
          if (!modo1969) msg.textContent = 'Los paquetes llegaron en este orden: ' + orden.join(', ') + '. Gracias a su número, SRI reconstruyó «LOGIN» aunque viajaran por rutas distintas.';
        }
      }
      msg.textContent = modo1969 ? 'Enviando letra por letra…' : 'Cada paquete toma la ruta que encuentre libre…';
      requestAnimationFrame(frame);
    }
    el.appendChild(h('p', { class: 'w-note' }, 'La palabra «LOGIN» viaja cortada en postales numeradas. Cada una puede tomar una ruta distinta y llegar en otro orden.'));
    el.appendChild(h('div', { class: 'paq' }, svg));
    el.appendChild(h('div', { class: 'w-row' }, h('span', { class: 'w-note-s' }, 'Recibido en SRI'), llegada));
    el.appendChild(h('div', { class: 'btnrow' },
      h('button', { class: 'btn small primary', type: 'button', onclick: function () { enviar(false); } }, 'Enviar por la red'),
      h('button', { class: 'btn small', type: 'button', onclick: function () { enviar(true); } }, 'Enviar como en 1969')));
    el.appendChild(msg);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Simulación simplificada: aquí cada letra viaja como un paquete.'));
  };

  /* ---------- La ley de Moore en números ---------- */
  var ESC = { 3: '1.000', 4: '10.000', 5: '100.000', 6: '1 millón', 7: '10 millones', 8: '100 millones', 9: '1.000 millones', 10: '10.000 millones', 11: '100.000 millones', 12: '1 billón' };
  W.graficoMoore = function (el) {
    M.logChart(el, {
      aria: 'Transistores por chip entre 1971 y 2024 en escala logarítmica, junto a una línea que se duplica cada dos años.',
      xMin: 1968, xMax: 2027, yMin: 1e3, yMax: 1e12, ml: 128,
      yLabel: 'Transistores', colNombre: 'Chip', colValor: 'Transistores',
      yFmt: function (v) { return ESC[Math.round(Math.log10(v))]; },
      yFmtLargo: function (v) { return M.miles(v) + ' transistores'; },
      ref: { from: 1971, to: 2025, fn: function (x) { return 2300 * Math.pow(2, (x - 1971) / 2); }, label: 'Duplicar cada dos años', labelAt: 2009 },
      puntos: [
        { x: 1971, y: 2300, nombre: 'Intel 4004', lab: 'al' },
        { x: 1972, y: 3500, nombre: 'Intel 8008' },
        { x: 1978, y: 29000, nombre: 'Intel 8086', lab: 'br' },
        { x: 1982, y: 134000, nombre: 'Intel 80286' },
        { x: 1985, y: 275000, nombre: 'Intel 386', lab: 'br' },
        { x: 1989, y: 1200000, nombre: 'Intel 486' },
        { x: 1993, y: 3100000, nombre: 'Pentium', lab: 'br' },
        { x: 2000, y: 42000000, nombre: 'Pentium 4', lab: 'br' },
        { x: 2006, y: 291000000, nombre: 'Core 2 Duo', lab: 'br' },
        { x: 2020, y: 16e9, nombre: 'Apple M1', lab: 'br' },
        { x: 2022, y: 80e9, nombre: 'Nvidia H100' },
        { x: 2024, y: 208e9, nombre: 'Nvidia Blackwell', lab: 'l', nota: 'Repartidos en dos piezas de silicio' }
      ]
    });
  };

  /* ---------- ELIZA en español ---------- */
  W.eliza = function (el) {
    var REFLEJO = { 'mi': 'su', 'mis': 'sus', 'me': 'se', 'yo': 'usted', 'conmigo': 'con usted', 'estoy': 'está', 'soy': 'es', 'tengo': 'tiene', 'siento': 'siente', 'quiero': 'quiere', 'puedo': 'puede', 'mío': 'suyo', 'mía': 'suya' };
    function reflejar(t) { return t.split(/\s+/).map(function (w) { var k = M.norm(w); return REFLEJO[k] || w; }).join(' ').replace(/[.!?¡¿]+$/, ''); }
    var REGLAS = [
      [/\bme siento (.+)/i, ['¿Por qué se siente $1?', '¿Desde cuándo se siente $1?']],
      [/\bestoy (.+)/i, ['¿Hace cuánto está $1?', '¿Qué le hace estar $1?']],
      [/\bcreo que (.+)/i, ['¿Realmente cree que $1?', '¿Por qué lo cree?']],
      [/\bno puedo (.+)/i, ['¿Qué le impide $1?', '¿Ha intentado $1?']],
      [/\bquiero (.+)/i, ['¿Qué significaría para usted $1?', '¿Por qué quiere $1?']],
      [/\bmi (madre|mamá|padre|papá|familia|hermano|hermana|hijo|hija|pareja)\b/i, ['Cuénteme más sobre su $1.', '¿Cómo es su relación con su $1?']],
      [/\b(computador|computadora|máquina|robot|chatbot|ia)\b/i, ['¿Le preocupan las máquinas?', '¿Por qué menciona las máquinas?']],
      [/\bporque (.+)/i, ['¿Es esa la verdadera razón?', '¿Qué otras razones se le ocurren?']],
      [/^(sí|si)\b/i, ['Parece muy seguro.', 'Entiendo.']],
      [/^no\b/i, ['¿Por qué no?', '¿Está seguro?']],
      [/\b(hola|buenas)\b/i, ['Hola. Cuénteme qué le preocupa.']]
    ];
    var DEFECTO = ['Continúe, por favor.', '¿Qué le hace pensar eso?', 'Entiendo. ¿Y cómo se siente con eso?', 'Cuénteme más.', '¿Eso le pasa a menudo?'];
    var n = 0;
    function responder(t) {
      for (var i = 0; i < REGLAS.length; i++) {
        var m = t.match(REGLAS[i][0]);
        if (m) { var op = REGLAS[i][1][n++ % REGLAS[i][1].length]; return op.replace('$1', m[1] ? reflejar(m[1]) : ''); }
      }
      return DEFECTO[n++ % DEFECTO.length];
    }
    var scr = h('div', { class: 'el-scr', 'aria-live': 'polite' }, h('div', null, 'ELIZA: Hola. ¿Cómo se siente hoy?'));
    var inp = h('input', { id: 'eliza-in', placeholder: 'Escriba, por ejemplo: me siento triste', autocomplete: 'off', 'aria-label': 'Su mensaje' });
    var form = h('form', null, inp, h('button', { type: 'submit' }, 'Enviar'));
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = inp.value.trim(); if (!t) return;
      scr.appendChild(h('div', { class: 'u' }, t));
      scr.appendChild(h('div', null, 'ELIZA: ' + responder(t)));
      inp.value = '';
      scr.scrollTop = scr.scrollHeight;
    });
    el.appendChild(h('p', { class: 'w-note' }, 'Escriba como si hablara con una terapeuta. Observe que ELIZA no entiende nada: solo busca palabras clave y le devuelve sus frases como preguntas.'));
    el.appendChild(h('div', { class: 'eliza' }, scr, form));
    el.appendChild(h('p', { class: 'w-note-s' }, 'Versión en español con una docena de reglas, inspirada en la idea de 1966; no es el programa original. ¿Sintió por un momento que le entendía? Eso es el «efecto ELIZA».'));
  };

  /* ---------- La explosión de posibilidades ---------- */
  W.explosion = function (el) {
    var F = [['1 jugada por bando', 400], ['2 jugadas por bando', 197281], ['3 jugadas por bando', 119060324]];
    el.appendChild(h('p', { class: 'w-note' }, 'Partidas de ajedrez posibles desde la posición inicial, contando todas las jugadas legales.'));
    el.appendChild(M.barras({ u: 'partidas', max: Math.log10(119060324), filas: F.map(function (f) { return [f[0], f[1]]; }) }));
    var bars = el.querySelectorAll('.barra .bt i');
    F.forEach(function (f, i) { bars[i].style.width = (Math.log10(f[1]) / Math.log10(119060324) * 100) + '%'; });
    el.appendChild(h('p', { class: 'w-note-s' }, 'Barras en escala logarítmica: cada paso multiplica. Con reglas escritas a mano y máquinas lentas, revisar todo era imposible.'));
  };

  /* ---------- El tablero de arroz ---------- */
  W.arroz = function (el) {
    var DOS = BigInt(2);
    function granos(n) { return DOS ** BigInt(n - 1); }
    var hechas = 0, sel = 1;
    var tablero = h('div', { class: 'board', role: 'grid', 'aria-label': 'Tablero de ajedrez de 64 casillas' });
    var casillas = [];
    var pregunta = h('label', { class: 'w-field', for: 'arroz-in' });
    var inp = h('input', { class: 'input', id: 'arroz-in', inputmode: 'numeric', autocomplete: 'off', placeholder: 'Escriba el número de granos' });
    var fb = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var detalle = h('div', { class: 'an-info' });
    var logN = 64;
    var logBox = h('div', { class: 'an-info' });
    var rangoLog = h('input', { type: 'range', min: 1, max: 64, value: logN, id: 'arroz-log', 'aria-label': 'Casilla para el cálculo con logaritmo' });
    function corto(n) {
      if (n <= 20) return M.miles(granos(n));
      return h('span', null, '2', h('sup', null, n - 1));
    }
    for (var i = 1; i <= 64; i++) {
      (function (n) {
        var fila = Math.floor((n - 1) / 8), col = (n - 1) % 8;
        var b = h('button', { type: 'button', class: 'sq ' + ((fila + col) % 2 ? 'd' : 'l'), 'aria-label': 'Casilla ' + n, onclick: function () { sel = n; pintar(); } });
        casillas.push(b); tablero.appendChild(b);
      })(i);
    }
    function pintar() {
      casillas.forEach(function (b, i) {
        var n = i + 1;
        b.classList.toggle('done', n <= hechas);
        b.classList.toggle('cur', n === hechas + 1);
        b.classList.toggle('sel', n === sel);
        M.clear(b);
        if (n <= hechas) { var c = corto(n); b.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
        else b.appendChild(h('span', { class: 'q' }, n === hechas + 1 ? '?' : ''));
      });
      var sig = hechas + 1;
      M.clear(pregunta);
      if (sig <= 64) {
        pregunta.appendChild(h('span', null, '¿Cuántos granos hay en la casilla ' + sig + '?'));
        pregunta.appendChild(inp);
      } else {
        pregunta.appendChild(h('span', null, '¡Tablero completo!'));
      }
      var g = granos(sel);
      M.clear(detalle);
      detalle.appendChild(h('h4', null, 'Casilla ' + sel));
      detalle.appendChild(h('dl', null,
        h('div', null, h('dt', null, 'Granos'), h('dd', { class: 'mono', style: { overflowWrap: 'anywhere' } }, M.miles(g))),
        sel > 20 ? h('div', null, h('dt', null, 'En notación científica'), h('dd', null, M.sci(g) + ' · unos ' + M.enPalabras(g))) : null,
        h('div', null, h('dt', null, 'Total acumulado hasta aquí'), h('dd', { class: 'mono', style: { overflowWrap: 'anywhere' } }, M.miles(granos(sel + 1) - 1n)))));
      pintarLog();
    }
    function pintarLog() {
      var e = (logN - 1) * 0.30103;
      var ent = Math.floor(e), mant = Math.pow(10, e - ent);
      M.clear(logBox);
      logBox.appendChild(h('h4', null, 'Llegó la hora del logaritmo'));
      logBox.appendChild(h('p', { class: 'small' }, 'La casilla n tiene 2 multiplicado por sí mismo n − 1 veces. El logaritmo responde cuántas veces hay que multiplicar 10 para llegar a ese número. Como multiplicar por 2 equivale a sumar 0,30103 al logaritmo:'));
      logBox.appendChild(h('div', { class: 'w-out' },
        'log(granos) = (' + logN + ' − 1) × 0,30103 = ' + M.dec(e, 2), h('br'),
        '→ unas ' + (ent + 1) + ' cifras: cerca de ' + M.dec(mant, 1) + ' × 10', h('sup', null, ent), ' granos'));
      logBox.appendChild(h('label', { class: 'w-field', for: 'arroz-log' }, h('span', null, 'Pruebe con otra casilla: ' + logN), rangoLog));
    }
    rangoLog.addEventListener('input', function () { logN = Number(rangoLog.value); pintarLog(); });
    function comprobar() {
      var sig = hechas + 1;
      if (sig > 64) return;
      var limpio = inp.value.replace(/[.\s ]/g, '');
      if (!/^\d+$/.test(limpio)) { fb.textContent = 'Escriba solo cifras; puede usar punto para los miles.'; return; }
      if (BigInt(limpio) === granos(sig)) {
        hechas = sig; sel = sig; inp.value = '';
        fb.textContent = sig === 64 ? '¡Completo! El tablero tiene en total ' + M.miles(granos(65) - 1n) + ' granos.' : 'Correcto. Siga con la casilla ' + (sig + 1) + '.';
        if (sig === 21) fb.textContent += ' Los números ya pasan del millón: pruebe el atajo del logaritmo.';
        pintar(); inp.focus();
      } else {
        fb.textContent = sig === 1 ? 'Pista: en la primera casilla hay un solo grano.' : 'Todavía no. Pista: es el doble de la casilla ' + (sig - 1) + ', que tiene ' + M.miles(granos(sig - 1)) + '.';
      }
    }
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); comprobar(); } });
    el.appendChild(h('div', { class: 'arroz' },
      h('div', { class: 'stack' }, tablero, h('span', { class: 'w-note-s' }, 'Desde la casilla 21 el tablero muestra potencias de 2 para que los números quepan. Toque una casilla para ver su valor exacto.')),
      h('div', { class: 'stack' },
        pregunta,
        h('div', { class: 'btnrow' },
          h('button', { class: 'btn small primary', type: 'button', onclick: comprobar }, 'Comprobar'),
          h('button', { class: 'btn small', type: 'button', onclick: function () { if (hechas < 64) { hechas++; sel = hechas; fb.textContent = 'Casilla ' + hechas + ' rellenada.'; pintar(); } } }, 'Rellenar esta casilla'),
          h('button', { class: 'btn small ghost', type: 'button', onclick: function () { hechas = 64; sel = 64; fb.textContent = 'Tablero completo: ' + M.miles(granos(65) - 1n) + ' granos en total, unos ' + M.enPalabras(granos(65) - 1n) + '.'; pintar(); } }, 'Llenar todo'),
          h('button', { class: 'btn small ghost', type: 'button', onclick: function () { hechas = 0; sel = 1; fb.textContent = ''; pintar(); } }, 'Empezar de nuevo')),
        fb, detalle, logBox,
        h('p', { class: 'w-note-s' }, 'Conexión con la ley de Moore: duplicar cada dos años durante 20 años equivale a avanzar 10 casillas, es decir, multiplicar por 1.024.'))));
    pintar();
  };
})();
