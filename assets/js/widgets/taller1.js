/* Widgets del Taller 1: tarjeta perforada, bits, César, partes, ENIAC, cinta, Enigma,
   número enorme, neurona, perceptrón, «¿cuál fue la primera?» y juego de la imitación. */
(function () {
  'use strict';
  var M = window.M, h = M.h, W = M.widgets, store = M.store;

  /* ---------- Tarjeta perforada y tabuladora ---------- */
  W.perforada = function (el) {
    var PREG = [
      { q: 'Edad', o: ['18–29', '30–44', '45–60'] },
      { q: 'Primer contacto con una computadora', o: ['Antes de 1990', '1990–2009', 'Desde 2010'] },
      { q: '¿Cómo llegó hoy?', o: ['A pie', 'Bus', 'Carro o moto', 'Bicicleta'] }
    ];
    var marcas = PREG.map(function () { return -1; });
    var cuenta = store.get('tabuladora', PREG.map(function (pq) { return pq.o.map(function () { return 0; }); }));
    var tarjetas = store.get('tabuladora-n', 0);
    var card = h('div', { class: 'card-p', role: 'group', 'aria-label': 'Tarjeta perforada' });
    var dials = h('div', { class: 'dials' });
    var nTarj = h('span', { class: 'chip' });
    var aviso = h('p', { class: 'w-note-s', 'aria-live': 'polite' });
    function pintarTarjeta() {
      M.clear(card);
      card.appendChild(h('div', { class: 'cph' }, h('span', null, 'Censo del taller'), h('span', null, 'Tarjeta n.º ' + (tarjetas + 1))));
      PREG.forEach(function (pq, i) {
        card.appendChild(h('div', { class: 'row' }, h('span', { class: 'rq' }, pq.q),
          h('div', { class: 'holes' }, pq.o.map(function (o, j) {
            return h('button', { type: 'button', class: 'hole' + (marcas[i] === j ? ' on' : ''), 'aria-pressed': String(marcas[i] === j), onclick: function () { marcas[i] = marcas[i] === j ? -1 : j; pintarTarjeta(); } }, h('i'), o);
          }))));
      });
    }
    function pintarDiales(bump) {
      M.clear(dials);
      PREG.forEach(function (pq, i) {
        pq.o.forEach(function (o, j) {
          dials.appendChild(h('div', { class: 'dial' + (bump && bump[i] === j ? ' bump' : '') }, h('div', { class: 'dn' }, cuenta[i][j]), h('span', null, o)));
        });
      });
      nTarj.textContent = tarjetas + (tarjetas === 1 ? ' tarjeta tabulada' : ' tarjetas tabuladas');
    }
    var tabular = h('button', { class: 'btn primary', type: 'button', onclick: function () {
      if (marcas.every(function (m) { return m === -1; })) { aviso.textContent = 'Perfore al menos un hueco antes de pasar la tarjeta.'; return; }
      var hechas = marcas.slice();
      marcas.forEach(function (m, i) { if (m !== -1) cuenta[i][m]++; });
      tarjetas++;
      store.set('tabuladora', cuenta); store.set('tabuladora-n', tarjetas);
      marcas = PREG.map(function () { return -1; });
      aviso.textContent = 'La corriente pasó por cada hueco y movió su contador. Tarjeta lista para la siguiente persona.';
      M.beep(520, 0.12);
      pintarTarjeta(); pintarDiales(hechas);
    } }, 'Pasar por la tabuladora');
    var reset = h('button', { class: 'btn small ghost', type: 'button', onclick: function () {
      cuenta = PREG.map(function (pq) { return pq.o.map(function () { return 0; }); }); tarjetas = 0;
      store.set('tabuladora', cuenta); store.set('tabuladora-n', 0); aviso.textContent = 'Contadores en cero.'; pintarDiales();
    } }, 'Poner contadores en cero');
    pintarTarjeta(); pintarDiales();
    el.appendChild(h('div', { class: 'perfo' },
      h('div', { class: 'stack' }, h('p', { class: 'w-note' }, 'Cada participante perfora su tarjeta y la pasa por la tabuladora. Así se contó el censo de 1890: cada hueco deja pasar la corriente y hace avanzar un contador.'), card, h('div', { class: 'btnrow' }, tabular), aviso),
      h('div', { class: 'tabu' }, h('div', { class: 'btnrow', style: { justifyContent: 'space-between' } }, h('b', null, 'Tabuladora'), nTarj), dials, reset, h('span', { class: 'w-note-s' }, 'Simulación simplificada. El conteo se guarda solo en este navegador.'))));
  };

  /* ---------- Ocho interruptores (bits) ---------- */
  W.bits = function (el) {
    var v = 65;
    var fila = h('div', { class: 'bits' });
    var dec = h('div', { class: 'w-big' });
    var car = h('div', { class: 'w-out' });
    var inp = h('input', { class: 'input', id: 'bits-letra', maxlength: 1, style: { maxWidth: '90px', fontSize: '1.3rem', textAlign: 'center' }, 'aria-label': 'Escriba una letra' });
    function pintar() {
      M.clear(fila);
      for (var i = 7; i >= 0; i--) {
        (function (i) {
          var on = (v >> i) & 1;
          fila.appendChild(h('button', { type: 'button', class: 'bit' + (on ? ' on' : ''), 'aria-pressed': String(!!on), 'aria-label': 'Interruptor de valor ' + (1 << i), onclick: function () { v ^= (1 << i); pintar(); } },
            h('span', { class: 'sw' }), h('span', { class: 'bv' }, on), h('span', { class: 'bp' }, 1 << i)));
        })(i);
      }
      dec.textContent = v;
      var visible = (v >= 32 && v <= 126) || (v >= 161 && v <= 255);
      car.textContent = visible ? 'Como letra: «' + String.fromCharCode(v) + '»' : 'Este número no corresponde a una letra visible en la tabla.';
      inp.value = visible ? String.fromCharCode(v) : '';
    }
    inp.addEventListener('input', function () {
      var c = inp.value.charCodeAt(0);
      if (c && c <= 255) { v = c; pintar(); }
    });
    pintar();
    el.appendChild(h('p', { class: 'w-note' }, 'Toque los interruptores. Cada uno vale el doble que el de su derecha; el número es la suma de los que están encendidos. Con 8 interruptores (un byte) hay 256 combinaciones, de 0 a 255.'));
    el.appendChild(fila);
    el.appendChild(h('div', { class: 'w-row' }, h('div', null, h('span', { class: 'w-note-s' }, 'Número'), dec), car));
    el.appendChild(h('div', { class: 'w-row' }, h('label', { class: 'w-field', for: 'bits-letra' }, h('span', null, 'O escriba una letra'), inp),
      h('span', { class: 'w-note-s', style: { maxWidth: '46ch' } }, 'Se usa la tabla de caracteres Latin-1, que incluye la ñ y las tildes: la «A» es el 65 y la «ñ», el 241.')));
    el.appendChild(h('p', { class: 'w-note-s' }, M.rich('Actividad sin computadora para el aula: tarjetas binarias de CS Unplugged (Computer Science Education Research Group, s. f.).')));
  };

  /* ---------- Cifrado César ---------- */
  W.cesar = function (el) {
    var AB = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    var n = 3, modo = 1;
    var entrada = h('textarea', { class: 'input', id: 'cesar-in', rows: 2, 'aria-label': 'Mensaje' });
    entrada.value = 'NOS VEMOS EN BLETCHLEY PARK';
    var salida = h('div', { class: 'w-out', 'aria-live': 'polite', style: { fontSize: '1.15rem', letterSpacing: '0.06em' } });
    var tabla = h('div', { class: 'w-out', style: { fontSize: '0.8rem', lineHeight: '1.7' } });
    var lblN = h('b');
    var rango = h('input', { type: 'range', min: 1, max: 26, value: n, id: 'cesar-n', 'aria-label': 'Desplazamiento' });
    function limpiar(t) { return t.toUpperCase().replace(/[ÁÀÄ]/g, 'A').replace(/[ÉÈË]/g, 'E').replace(/[ÍÌÏ]/g, 'I').replace(/[ÓÒÖ]/g, 'O').replace(/[ÚÙÜ]/g, 'U'); }
    function cifrar(t, k) {
      return limpiar(t).split('').map(function (c) { var i = AB.indexOf(c); return i === -1 ? c : AB[(i + k + 27 * 3) % 27]; }).join('');
    }
    function pintar() {
      lblN.textContent = n;
      salida.textContent = cifrar(entrada.value, n * modo);
      tabla.textContent = AB.split('').join(' ') + '\n' + AB.split('').map(function (c) { return cifrar(c, n); }).join(' ');
      tabla.style.whiteSpace = 'pre-wrap';
    }
    rango.addEventListener('input', function () { n = Number(rango.value); pintar(); });
    entrada.addEventListener('input', pintar);
    var bC = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'true', onclick: function () { modo = 1; bC.setAttribute('aria-pressed', 'true'); bD.setAttribute('aria-pressed', 'false'); pintar(); } }, 'Cifrar');
    var bD = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', onclick: function () { modo = -1; bD.setAttribute('aria-pressed', 'true'); bC.setAttribute('aria-pressed', 'false'); pintar(); } }, 'Descifrar');
    el.appendChild(h('p', { class: 'w-note' }, 'Cada letra se cambia por la que está n lugares más adelante en el alfabeto español de 27 letras. Con n = 3, la A se vuelve D. Para descifrar, se cuenta hacia atrás con la misma clave.'));
    el.appendChild(h('label', { class: 'w-field', for: 'cesar-in' }, h('span', null, 'Mensaje'), entrada));
    el.appendChild(h('div', { class: 'w-row' }, bC, bD, h('label', { class: 'w-field', for: 'cesar-n', style: { flex: '1', minWidth: '200px' } }, h('span', null, ['Clave: desplazar ', lblN, ' lugares']), rango)));
    el.appendChild(h('div', { class: 'w-field' }, h('span', null, 'Resultado'), salida));
    el.appendChild(h('details', { class: 'datos' }, h('summary', null, 'Ver la tabla de sustitución'), tabla));
    el.appendChild(h('p', { class: 'w-note-s' }, 'Con solo 26 claves posibles, el César se rompe probando todas. Enigma, en cambio, cambiaba la regla con cada tecla: pruébela en el caso de estudio.'));
    pintar();
  };

  /* ---------- Las cinco partes, con la cocina ---------- */
  W.partes = function (el) {
    var P = [
      { k: 'Entrada', a: 'Los ingredientes que llegan', d: 'Por donde entran los datos y las instrucciones. En la ENIAC, las tarjetas perforadas.' },
      { k: 'Memoria', a: 'La alacena y el recetario', d: 'Guarda los datos y, desde el programa almacenado, también las instrucciones.' },
      { k: 'Unidad de control', a: 'Quien cocina siguiendo la receta', d: 'Junto con la unidad aritmético-lógica forma el procesador: lee la receta y decide el siguiente paso.', proc: true },
      { k: 'Unidad aritmético-lógica', a: 'Quien cocina siguiendo la receta', d: 'La otra mitad del procesador: hace las cuentas y las comparaciones.', proc: true },
      { k: 'Salida', a: 'El plato servido', d: 'Por donde salen los resultados. En la ENIAC, otra vez tarjetas perforadas.' }
    ];
    var info = h('div', { class: 'an-info', 'aria-live': 'polite' });
    var fila = h('div', { class: 'partes' });
    function elegir(i) {
      Array.prototype.forEach.call(fila.children, function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      M.clear(info);
      info.appendChild(h('h4', null, P[i].k + (P[i].proc ? ' · parte del procesador' : '')));
      info.appendChild(h('dl', null, h('div', null, h('dt', null, 'En la cocina'), h('dd', null, P[i].a)), h('div', null, h('dt', null, 'En la máquina'), h('dd', null, P[i].d))));
    }
    P.forEach(function (pt, i) {
      fila.appendChild(h('button', { type: 'button', class: 'parte' + (pt.proc ? ' proc' : ''), onclick: function () { elegir(i); } }, h('span', { class: 'pn' }, (i + 1) + (pt.proc ? ' · procesador' : '')), h('b', null, pt.k)));
    });
    el.appendChild(h('p', { class: 'w-note' }, 'Toque cada parte. Las dos del medio, con borde punteado, forman juntas el procesador.'));
    el.appendChild(fila);
    el.appendChild(info);
    elegir(0);
  };

  /* ---------- ENIAC contra el cálculo a mano ---------- */
  W.eniac = function (el) {
    var barH = h('i'), barE = h('i'), tH = h('span', { class: 'ct' }, '20 h'), tE = h('span', { class: 'ct' }, '30 s');
    var msg = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var raf = null;
    function correr() {
      cancelAnimationFrame(raf);
      var dur = 8000, t0 = performance.now();
      msg.textContent = 'Calculando la trayectoria de un proyectil que vuela 60 segundos…';
      function paso(now) {
        var f = Math.min(1, (now - t0) / dur);
        var horas = f * 20;
        barH.style.width = (f * 100) + '%';
        var fe = Math.min(1, f * 2400);
        barE.style.width = (fe * 100) + '%';
        tH.textContent = M.dec(horas, 1) + ' h';
        tE.textContent = fe >= 1 ? '30 s ✓' : Math.round(fe * 30) + ' s';
        if (f < 1) raf = requestAnimationFrame(paso);
        else msg.textContent = 'La ENIAC terminó unas 2.400 veces antes: 30 segundos frente a unas 20 horas (72.000 segundos) de cálculo a mano.';
      }
      raf = requestAnimationFrame(paso);
    }
    el.appendChild(h('div', { class: 'carrera' },
      h('div', { class: 'cr h' }, h('span', null, 'Cálculo a mano'), h('div', { class: 'ctrack' }, barH), tH),
      h('div', { class: 'cr' }, h('span', null, 'ENIAC (1945)'), h('div', { class: 'ctrack' }, barE), tE)));
    el.appendChild(h('div', { class: 'btnrow' }, h('button', { class: 'btn small primary', type: 'button', onclick: correr }, M.icon('play'), 'Lanzar el cálculo'), h('span', { class: 'w-note-s' }, 'Animación acelerada: 8 segundos equivalen a 20 horas.')));
    el.appendChild(msg);
  };

  /* ---------- Cinta frente a disco ---------- */
  W.cinta = function (el) {
    var N = 12, objetivo = 9, ocupado = false;
    var fila = h('div', { class: 'cinta-row' });
    var celdas = [];
    for (var i = 1; i <= N; i++) { var c = h('span', null, i); celdas.push(c); fila.appendChild(c); }
    var res = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var sel = h('select', { class: 'input', id: 'cinta-obj', style: { maxWidth: '140px' }, onchange: function () { objetivo = Number(sel.value); } },
      celdas.map(function (c, i) { return h('option', { value: i + 1, selected: i + 1 === objetivo }, 'Canción ' + (i + 1)); }));
    function limpiar() { celdas.forEach(function (c) { c.className = ''; }); }
    function cinta() {
      if (ocupado) return; ocupado = true; limpiar();
      var i = 0;
      var it = setInterval(function () {
        celdas[i].className = i + 1 === objetivo ? 'hit' : 'read';
        i++;
        if (i >= objetivo) { clearInterval(it); ocupado = false; res.textContent = 'Cinta: hubo que pasar por ' + objetivo + ' posiciones para llegar a la canción ' + objetivo + '.'; }
      }, 220);
    }
    function disco() {
      if (ocupado) return; limpiar();
      celdas[objetivo - 1].className = 'hit';
      res.textContent = 'Disco: el brazo saltó directo a la canción ' + objetivo + ', en un solo movimiento.';
    }
    el.appendChild(h('div', { class: 'cinta' },
      h('div', { class: 'cinta-lab' }, h('span', null, 'Inicio de la cinta'), h('span', null, 'Final')), fila,
      h('div', { class: 'btnrow' }, h('label', { class: 'sr-only', for: 'cinta-obj' }, 'Canción buscada'), sel,
        h('button', { class: 'btn small', type: 'button', onclick: cinta }, 'Buscar en la cinta'),
        h('button', { class: 'btn small primary', type: 'button', onclick: disco }, 'Buscar en el disco')),
      res));
  };

  /* ---------- Enigma I (rotores I-II-III, reflector B) ---------- */
  var ROT = [
    { n: 'I', w: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' },
    { n: 'II', w: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' },
    { n: 'III', w: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' }
  ];
  var REFL_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
  var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function idx(c) { return c.charCodeAt(0) - 65; }
  M.enigma = {
    paso: function (pos) {
      var L = pos[0], Mi = pos[1], R = pos[2];
      var mNotch = A[Mi] === ROT[1].notch, rNotch = A[R] === ROT[2].notch;
      if (mNotch) { Mi = (Mi + 1) % 26; L = (L + 1) % 26; }
      else if (rNotch) { Mi = (Mi + 1) % 26; }
      R = (R + 1) % 26;
      return [L, Mi, R];
    },
    letra: function (c, pos, tablero) {
      var ruta = [c];
      var x = tablero[c] || c; ruta.push(x);
      var k = idx(x);
      function fwd(r, p) { var sh = (k + p) % 26; return (idx(ROT[r].w[sh]) - p + 26) % 26; }
      function bwd(r, p) { var sh = (k + p) % 26; return (ROT[r].w.indexOf(A[sh]) - p + 26) % 26; }
      k = fwd(2, pos[2]); ruta.push(A[k]);
      k = fwd(1, pos[1]); ruta.push(A[k]);
      k = fwd(0, pos[0]); ruta.push(A[k]);
      k = idx(REFL_B[k]); ruta.push(A[k]);
      k = bwd(0, pos[0]); ruta.push(A[k]);
      k = bwd(1, pos[1]); ruta.push(A[k]);
      k = bwd(2, pos[2]); ruta.push(A[k]);
      var out = tablero[A[k]] || A[k]; ruta.push(out);
      return { c: out, ruta: ruta };
    },
    texto: function (txt, pos, tablero) {
      var out = '';
      pos = pos.slice();
      txt.toUpperCase().replace(/[^A-Z]/g, '').split('').forEach(function (c) { pos = M.enigma.paso(pos); out += M.enigma.letra(c, pos, tablero || {}).c; });
      return out;
    }
  };
  W.enigma = function (el) {
    var inicio = [0, 0, 0], pos = inicio.slice(), tablero = {};
    var entrada = '', salida = '';
    var lamps = {}, keys = {};
    var wins = [];
    var tapeIn = h('div'), tapeOut = h('div');
    var ruta = h('div', { class: 'path', 'aria-live': 'polite' });
    var aviso = h('div', { class: 'path' });
    var root = h('div', { class: 'enigma', tabindex: '0', 'aria-label': 'Simulador de Enigma. Use el teclado en pantalla o el del computador.' });
    var rot = h('div', { class: 'rotors' });
    ['I', 'II', 'III'].forEach(function (nombre, i) {
      var win = h('div', { class: 'win', 'aria-live': 'off' });
      wins.push(win);
      rot.appendChild(h('div', { class: 'rotor' },
        h('button', { type: 'button', 'aria-label': 'Subir rotor ' + nombre, onclick: function () { pos[i] = (pos[i] + 1) % 26; inicio = pos.slice(); limpiarCinta(); pintar(); } }, '▲'),
        win,
        h('button', { type: 'button', 'aria-label': 'Bajar rotor ' + nombre, onclick: function () { pos[i] = (pos[i] + 25) % 26; inicio = pos.slice(); limpiarCinta(); pintar(); } }, '▼'),
        h('small', null, 'Rotor ' + nombre)));
    });
    var FILAS = ['QWERTZUIO', 'ASDFGHJK', 'PYXCVBNML'];
    var lampEl = h('div', { class: 'lamps', 'aria-hidden': 'true' }, FILAS.map(function (f) { return h('div', { class: 'r' }, f.split('').map(function (c) { lamps[c] = h('span', { class: 'lamp' }, c); return lamps[c]; })); }));
    var keyEl = h('div', { class: 'keys' }, FILAS.map(function (f) { return h('div', { class: 'r' }, f.split('').map(function (c) { keys[c] = h('button', { type: 'button', class: 'key', 'aria-label': 'Tecla ' + c, onclick: function () { pulsar(c); } }, c); return keys[c]; })); }));
    var plug = h('input', { id: 'enigma-plug', placeholder: 'Ej.: AB CD EF', autocomplete: 'off' });
    plug.addEventListener('input', function () {
      tablero = {};
      var pares = plug.value.toUpperCase().replace(/[^A-Z ]/g, '').split(/\s+/).filter(Boolean);
      var usados = {}, n = 0;
      pares.forEach(function (pr) {
        if (pr.length !== 2 || pr[0] === pr[1] || usados[pr[0]] || usados[pr[1]] || n >= 10) return;
        tablero[pr[0]] = pr[1]; tablero[pr[1]] = pr[0]; usados[pr[0]] = usados[pr[1]] = 1; n++;
      });
      aviso.textContent = n ? n + (n === 1 ? ' cable conectado.' : ' cables conectados.') : 'Sin cables: cada letra entra tal cual.';
      limpiarCinta(); pos = inicio.slice(); pintar();
    });
    var apagado = null;
    function pulsar(c) {
      pos = M.enigma.paso(pos);
      var r = M.enigma.letra(c, pos, tablero);
      entrada += c; salida += r.c;
      Object.keys(lamps).forEach(function (k) { lamps[k].classList.remove('on'); });
      lamps[r.c].classList.add('on');
      keys[c].classList.add('down');
      setTimeout(function () { keys[c].classList.remove('down'); }, 140);
      clearTimeout(apagado);
      apagado = setTimeout(function () { lamps[r.c].classList.remove('on'); }, 900);
      ruta.textContent = 'Ruta de la corriente: ' + r.ruta[0] + ' → tablero ' + r.ruta[1] + ' → III ' + r.ruta[2] + ' → II ' + r.ruta[3] + ' → I ' + r.ruta[4] + ' → reflector ' + r.ruta[5] + ' → I ' + r.ruta[6] + ' → II ' + r.ruta[7] + ' → III ' + r.ruta[8] + ' → tablero ' + r.ruta[9] + '. Se enciende la ' + r.c + '.';
      pintar();
    }
    function grupos(t) { return t.replace(/(.{5})/g, '$1 ').trim(); }
    function limpiarCinta() { entrada = ''; salida = ''; ruta.textContent = ''; }
    function pintar() {
      wins.forEach(function (w, i) { w.textContent = A[pos[i]]; });
      tapeIn.textContent = grupos(entrada) || '—';
      tapeOut.textContent = grupos(salida) || '—';
    }
    root.addEventListener('keydown', function (e) {
      if (e.target === plug) return;
      var c = (e.key || '').toUpperCase();
      if (c.length === 1 && c >= 'A' && c <= 'Z') { e.preventDefault(); pulsar(c); }
    });
    root.appendChild(h('div', { class: 'eh' }, h('b', null, 'ENIGMA'), h('span', null, 'Rotores I · II · III · reflector B')));
    root.appendChild(rot);
    root.appendChild(lampEl);
    root.appendChild(keyEl);
    root.appendChild(h('div', { class: 'tape' }, h('small', null, 'Pulsado'), tapeIn));
    root.appendChild(h('div', { class: 'tape' }, h('small', null, 'Encendido (texto cifrado)'), tapeOut));
    root.appendChild(ruta);
    root.appendChild(h('div', { class: 'ebtns' },
      h('button', { type: 'button', onclick: function () { pos = inicio.slice(); limpiarCinta(); pintar(); } }, 'Volver a la posición inicial'),
      h('button', { type: 'button', onclick: function () { inicio = [0, 0, 0]; pos = [0, 0, 0]; limpiarCinta(); pintar(); } }, 'Poner AAA')));
    root.appendChild(h('label', { for: 'enigma-plug' }, 'Tablero de conexiones: hasta 10 pares de letras', plug));
    root.appendChild(aviso);
    el.appendChild(h('p', { class: 'w-note' }, 'Pruebe: desde AAA, pulse cinco veces la A. La misma letra se cifra distinto cada vez y nunca como sí misma. Para descifrar, vuelva a la posición inicial y escriba el texto cifrado.'));
    el.appendChild(root);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Simulación de la Enigma de tres rotores con el cableado histórico de los rotores I, II y III y el reflector B; los anillos están fijos en A.'));
    pintar();
  };

  /* ---------- ¿De dónde sale el número enorme? ---------- */
  W.enorme = function (el) {
    var ordenes = 5n * 4n * 3n, posiciones = 26n ** 3n, tablero = 150738274937250n;
    var total = ordenes * posiciones * tablero;
    el.appendChild(h('div', { class: 'enorme' },
      h('b', null, '¿De dónde salen los 159 trillones?'),
      h('div', { class: 'fx' },
        h('span', null, M.miles(ordenes), h('small', null, 'órdenes de 3 rotores entre 5')), '×',
        h('span', null, M.miles(posiciones), h('small', null, 'posiciones iniciales (26³)')), '×',
        h('span', null, M.miles(tablero), h('small', null, 'formas de poner 10 cables')), '=',
        h('span', null, M.miles(total), h('small', null, '≈ ' + M.sci(total) + ' ajustes'))),
      h('table', { class: 'escala' },
        h('thead', null, h('tr', null, h('th', null, 'Número'), h('th', null, 'En español'), h('th', null, 'En inglés'))),
        h('tbody', null,
          h('tr', null, h('td', null, '10⁹'), h('td', null, 'mil millones'), h('td', null, 'billion')),
          h('tr', null, h('td', null, '10¹²'), h('td', null, 'un billón'), h('td', null, 'trillion')),
          h('tr', null, h('td', null, '10¹⁸'), h('td', null, 'un trillón'), h('td', null, 'quintillion')))),
      h('p', { class: 'w-note-s' }, 'Probando un ajuste por segundo, sin descansar, harían falta unos 5 billones de años. Por eso la clave no fue la fuerza bruta, sino los cribs, los descuidos de los operadores y las bombes.')));
  };

  /* ---------- El timbre de la neurona (McCulloch y Pitts) ---------- */
  W.neurona = function (el) {
    var on = [false, false, false], umbral = 2;
    var amigos = h('div', { class: 'amigos' });
    var campana = h('div', { class: 'campana' });
    var lectura = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var lblU = h('b');
    var rango = h('input', { type: 'range', min: 1, max: 3, value: umbral, id: 'neurona-u', 'aria-label': 'Umbral' });
    var NOM = ['Ana', 'Beto', 'Caro'];
    function pintar() {
      M.clear(amigos);
      NOM.forEach(function (n, i) {
        amigos.appendChild(h('button', { type: 'button', class: 'amigo', 'aria-pressed': String(on[i]), onclick: function () { on[i] = !on[i]; pintar(); } }, h('span', { class: 'ab' }), n + (on[i] ? ' presiona' : ' no presiona')));
      });
      var suma = on.filter(Boolean).length, suena = suma >= umbral;
      M.clear(campana);
      campana.appendChild(M.icon('campana'));
      campana.appendChild(h('span', null, suena ? '¡Suena!' : 'En silencio'));
      campana.className = 'campana' + (suena ? ' on' : '');
      lblU.textContent = umbral;
      var logica = umbral === 1 ? 'Con umbral 1 basta un amigo: es la lógica «O».' : umbral === 3 ? 'Con umbral 3 tienen que ser todos: es la lógica «Y».' : 'Con umbral 2, al menos dos de tres.';
      lectura.textContent = 'Señales: ' + suma + (suena ? ' ≥ ' : ' < ') + 'umbral ' + umbral + '. ' + logica;
      if (suena) M.beep(880, 0.15);
    }
    rango.addEventListener('input', function () { umbral = Number(rango.value); pintar(); });
    el.appendChild(h('p', { class: 'w-note' }, 'La neurona artificial de 1943 se «enciende» si recibe suficientes señales. Toque a los amigos para presionar el timbre.'));
    el.appendChild(h('div', { class: 'timbre' }, amigos, campana));
    el.appendChild(h('label', { class: 'w-field', for: 'neurona-u', style: { maxWidth: '320px' } }, h('span', null, ['Umbral: ', lblU, ' señales']), rango));
    el.appendChild(lectura);
    pintar();
  };

  /* ---------- Entrene un perceptrón ---------- */
  W.perceptron = function (el) {
    var C = 6, F = 4, N = C * F;
    var w, b, intentos, aciertos, hist, actual;
    function reiniciar() { w = new Array(N).fill(0); b = 0; intentos = 0; hist = []; actual = null; }
    function nuevaTarjeta() {
      var lado = Math.random() < 0.5 ? -1 : 1;
      var x = new Array(N).fill(0);
      var col = lado < 0 ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 3);
      var fila = Math.floor(Math.random() * (F - 1));
      x[fila * C + col] = 1; x[(fila + 1) * C + col] = 1;
      if (Math.random() < 0.5 && col % 3 !== 2) x[fila * C + col + 1] = 1;
      return { x: x, y: lado };
    }
    var gTarjeta = h('div', { class: 'pgrid', 'aria-hidden': 'true' });
    var gPesos = h('div', { class: 'pgrid w', 'aria-hidden': 'true' });
    var stats = h('div', { class: 'pstats' });
    var log = h('div', { class: 'plog', 'aria-hidden': 'true' });
    var msg = h('p', { class: 'w-note', 'aria-live': 'polite' });
    function predecir(x) { var s = b; for (var i = 0; i < N; i++) s += w[i] * x[i]; return s >= 0 ? 1 : -1; }
    function intento(silencioso) {
      actual = nuevaTarjeta();
      var pr = predecir(actual.x);
      var ok = pr === actual.y;
      if (!ok) { for (var i = 0; i < N; i++) w[i] += actual.y * actual.x[i]; b += actual.y; }
      intentos++; hist.push(ok); if (hist.length > 60) hist.shift();
      if (!silencioso) msg.textContent = 'Tarjeta marcada a la ' + (actual.y < 0 ? 'izquierda' : 'derecha') + '. El perceptrón dijo «' + (pr < 0 ? 'izquierda' : 'derecha') + '»: ' + (ok ? 'acertó, no cambia nada.' : 'se equivocó y ajusta sus conexiones.');
      pintar();
    }
    function pintar() {
      M.clear(gTarjeta); M.clear(gPesos); M.clear(log);
      for (var i = 0; i < N; i++) {
        gTarjeta.appendChild(h('i', { class: actual && actual.x[i] ? 'on' : '' }));
        var v = w[i], mx = Math.max.apply(null, w.map(Math.abs)) || 1;
        var col = v > 0 ? 'var(--t3)' : v < 0 ? 'var(--t1)' : 'var(--surface-2)';
        gPesos.appendChild(h('i', { style: { background: v ? 'color-mix(in srgb, ' + col + ' ' + Math.round(25 + 75 * Math.abs(v) / mx) + '%, var(--surface))' : 'var(--surface-2)' } }));
      }
      hist.forEach(function (ok) { log.appendChild(h('i', { class: ok ? 'ok' : 'no' })); });
      var ult = hist.slice(-10), acc = ult.length ? ult.filter(Boolean).length : 0;
      M.clear(stats);
      stats.appendChild(h('span', null, 'Intentos'));
      stats.appendChild(h('span', { class: 'big' }, intentos));
      stats.appendChild(h('span', null, 'Aciertos en los últimos 10: ' + acc + ' de ' + ult.length));
    }
    reiniciar(); pintar();
    el.appendChild(h('p', { class: 'w-note' }, 'Como en la demostración de 1958, el perceptrón debe decir si cada tarjeta está marcada a la izquierda o a la derecha. Nadie le da la regla: solo corrige sus conexiones cuando se equivoca.'));
    el.appendChild(h('div', { class: 'percep' },
      h('div', { class: 'pbox' }, h('b', null, 'Tarjeta'), gTarjeta),
      h('div', { class: 'pbox' }, h('b', null, 'Conexiones que aprendió'), gPesos, h('span', { class: 'w-note-s' }, 'Azul empuja a «derecha»; ámbar, a «izquierda».')),
      h('div', { class: 'pbox' }, h('b', null, 'Marcador'), stats, log)));
    el.appendChild(h('div', { class: 'btnrow' },
      h('button', { class: 'btn small primary', type: 'button', onclick: function () { intento(false); } }, 'Mostrar una tarjeta'),
      h('button', { class: 'btn small', type: 'button', onclick: function () { for (var i = 0; i < 10; i++) intento(true); msg.textContent = 'Diez intentos más. Mire cómo se organizan las conexiones.'; } }, 'Diez intentos seguidos'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { reiniciar(); msg.textContent = 'Conexiones en cero: el perceptrón olvidó todo.'; pintar(); } }, 'Empezar de cero')));
    el.appendChild(msg);
  };

  /* ---------- ¿Cuál fue la primera computadora? ---------- */
  W.primera = function (el) {
    var CRIT = [['e', 'Electrónica'], ['p', 'Programable'], ['g', 'De propósito general'], ['a', 'Con programa almacenado']];
    var MAQ = [
      { n: 'Z3', a: 1941, e: 0, p: 1, g: 0, s: 0 },
      { n: 'Atanasoff-Berry', a: 1942, e: 1, p: 0, g: 0, s: 0 },
      { n: 'Colossus', a: 1944, e: 1, p: 1, g: 0, s: 0 },
      { n: 'ENIAC', a: 1945, e: 1, p: 1, g: 1, s: 0 },
      { n: 'Baby de Manchester', a: 1948, e: 1, p: 1, g: 1, s: 1 }
    ];
    var sel = { e: true, p: false, g: false, a: false };
    var crit = h('div', { class: 'crit', role: 'group', 'aria-label': 'Criterios' });
    var tabla = h('div', { class: 'tablewrap' });
    var res = h('p', { class: 'w-note', 'aria-live': 'polite' });
    function cumple(m) { return (!sel.e || m.e) && (!sel.p || m.p) && (!sel.g || m.g) && (!sel.a || m.s); }
    function pintar() {
      M.clear(crit);
      CRIT.forEach(function (c) { crit.appendChild(h('button', { class: 'chip', type: 'button', 'aria-pressed': String(sel[c[0]]), onclick: function () { sel[c[0]] = !sel[c[0]]; pintar(); } }, c[1])); });
      var ganadora = MAQ.filter(cumple)[0];
      M.clear(tabla);
      tabla.appendChild(h('table', null,
        h('thead', null, h('tr', null, h('th', null, 'Máquina'), h('th', null, 'Elec.'), h('th', null, 'Progr.'), h('th', null, 'Gral.'), h('th', null, 'Almac.'))),
        h('tbody', null, MAQ.map(function (m) {
          function c(v) { return h('td', { class: v ? 'y' : 'n' }, v ? 'sí' : 'no'); }
          return h('tr', { class: m === ganadora ? 'win' : '' }, h('td', null, m.n + ' (' + m.a + ')'), c(m.e), c(m.p), c(m.g), c(m.s));
        }))));
      var ninguno = !sel.e && !sel.p && !sel.g && !sel.a;
      res.textContent = ninguno ? 'Elija al menos un criterio.' : 'Con esa definición, la primera es: ' + ganadora.n + ' (' + ganadora.a + ').';
    }
    el.appendChild(h('p', { class: 'w-note' }, '¿Qué cuenta como computadora? Elija los criterios y vea cuál resulta «primera».'));
    el.appendChild(crit); el.appendChild(res); el.appendChild(h('div', { class: 'primera' }, tabla));
    pintar();
  };

  /* ---------- El juego de la imitación ---------- */
  var EJEMPLO = {
    ejemplo: true,
    pregunta: '¿Qué haría con una tarde libre?',
    respuestas: [
      { t: 'Saldría a caminar sin rumbo fijo y terminaría tomándome un tinto en alguna panadería del barrio.', o: 'm' },
      { t: 'Depende del clima. Si llueve, una película; si hace sol, visitar a mi familia.', o: 'm' },
      { t: 'Dormir una siesta larga. Después vería qué hacer, sin planes.', o: 'm' },
      { t: 'Cocinaría algo que nunca he preparado y llamaría a alguien para compartirlo.', o: 'm' }
    ]
  };
  W.imitacion = function (el) {
    var datos = store.get('imitacion', null) || JSON.parse(JSON.stringify(EJEMPLO));
    var modo = 'jugar', orden = [], votos = {}, revelado = false;
    function guardar() { store.set('imitacion', datos); }
    var cont = h('div', { class: 'imi' });
    function barajar() { orden = M.shuffle(datos.respuestas.map(function (_, i) { return i; })); votos = {}; revelado = false; }
    function pintar() {
      M.clear(cont);
      var tabs = h('div', { class: 'btnrow' },
        h('button', { class: 'chip', type: 'button', 'aria-pressed': String(modo === 'jugar'), onclick: function () { modo = 'jugar'; pintar(); } }, 'Jugar con el grupo'),
        h('button', { class: 'chip', type: 'button', 'aria-pressed': String(modo === 'preparar'), onclick: function () { modo = 'preparar'; pintar(); } }, 'Preparar respuestas'));
      cont.appendChild(tabs);
      if (datos.ejemplo) cont.appendChild(h('p', { class: 'banner' }, 'Ronda de ejemplo: estas cuatro respuestas las escribió un chatbot para mostrar cómo funciona la herramienta. Antes del taller, use «Preparar respuestas» para cargar respuestas reales de personas y de un chatbot.'));
      if (modo === 'jugar') jugar(); else preparar();
    }
    function jugar() {
      if (!orden.length || orden.length !== datos.respuestas.length) barajar();
      cont.appendChild(h('div', { class: 'imi-q' }, datos.pregunta || 'Escriba una pregunta en «Preparar respuestas».'));
      var grid = h('div', { class: 'imi-ans' });
      orden.forEach(function (ri, k) {
        var r = datos.respuestas[ri];
        var v = votos[ri] || (votos[ri] = { p: 0, m: 0 });
        function contador(tipo, etiqueta) {
          var n = h('span', { class: 'vn' }, v[tipo]);
          return h('div', null,
            h('button', { type: 'button', 'aria-label': 'Restar voto ' + etiqueta, onclick: function () { v[tipo] = Math.max(0, v[tipo] - 1); n.textContent = v[tipo]; } }, '−'),
            h('span', { class: 'center' }, etiqueta, ' ', n),
            h('button', { type: 'button', 'aria-label': 'Sumar voto ' + etiqueta, onclick: function () { v[tipo]++; n.textContent = v[tipo]; } }, '+'));
        }
        grid.appendChild(h('article', { class: 'imi-card' },
          h('span', { class: 'il' }, 'Respuesta ' + String.fromCharCode(65 + k)),
          h('p', { class: 'it' }, '«' + r.t + '»'),
          h('div', { class: 'imi-votes' }, contador('p', 'Persona'), contador('m', 'Máquina')),
          revelado ? h('div', { class: 'imi-truth', style: { color: r.o === 'p' ? 'var(--ok)' : 'var(--accent)' } }, 'La escribió: ' + (r.o === 'p' ? 'una persona' : 'un chatbot')) : null));
      });
      cont.appendChild(grid);
      var resumen = null;
      if (revelado) {
        var ok = 0, tot = 0;
        datos.respuestas.forEach(function (r, i) { var v = votos[i] || { p: 0, m: 0 }; tot += v.p + v.m; ok += r.o === 'p' ? v.p : v.m; });
        resumen = h('p', { class: 'w-note' }, tot ? 'El grupo acertó ' + ok + ' de ' + tot + ' votos. ¿Qué pistas usaron? ¿Qué diría Turing?' : 'Nadie votó. ¿Qué pistas habrían usado?');
      }
      cont.appendChild(h('div', { class: 'btnrow' },
        h('button', { class: 'btn small primary', type: 'button', onclick: function () { revelado = true; pintar(); } }, 'Revelar quién escribió cada una'),
        h('button', { class: 'btn small', type: 'button', onclick: function () { barajar(); pintar(); } }, 'Barajar y empezar otra vez')));
      if (resumen) cont.appendChild(resumen);
    }
    function preparar() {
      var q = h('input', { class: 'input', id: 'imi-preg', value: datos.pregunta, placeholder: 'Pregunta para todos', oninput: function () { datos.pregunta = q.value; datos.ejemplo = false; guardar(); } });
      cont.appendChild(h('label', { class: 'w-field', for: 'imi-preg' }, h('span', null, 'Pregunta'), q));
      var lista = h('div', { class: 'imi-edit' });
      datos.respuestas.forEach(function (r, i) {
        var ta = h('textarea', { class: 'input', id: 'imi-r-' + i, rows: 2, 'aria-label': 'Respuesta ' + (i + 1), oninput: function () { r.t = ta.value; datos.ejemplo = false; guardar(); } });
        ta.value = r.t;
        var se = h('select', { class: 'input', id: 'imi-o-' + i, 'aria-label': 'Quién la escribió', onchange: function () { r.o = se.value; datos.ejemplo = false; guardar(); } },
          h('option', { value: 'p', selected: r.o === 'p' }, 'Persona'), h('option', { value: 'm', selected: r.o === 'm' }, 'Chatbot'));
        lista.appendChild(h('div', { class: 'ie-row' }, ta, se, h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Quitar respuesta ' + (i + 1), onclick: function () { datos.respuestas.splice(i, 1); datos.ejemplo = false; guardar(); orden = []; pintar(); } }, 'Quitar')));
      });
      cont.appendChild(lista);
      cont.appendChild(h('div', { class: 'btnrow' },
        h('button', { class: 'btn small', type: 'button', onclick: function () { datos.respuestas.push({ t: '', o: 'p' }); datos.ejemplo = false; guardar(); orden = []; pintar(); } }, 'Añadir respuesta'),
        h('button', { class: 'btn small ghost', type: 'button', onclick: function () { datos = { ejemplo: false, pregunta: '', respuestas: [{ t: '', o: 'p' }, { t: '', o: 'm' }] }; guardar(); orden = []; pintar(); } }, 'Empezar en blanco'),
        h('button', { class: 'btn small ghost', type: 'button', onclick: function () { datos = JSON.parse(JSON.stringify(EJEMPLO)); store.del('imitacion'); orden = []; pintar(); } }, 'Volver al ejemplo')));
      cont.appendChild(h('p', { class: 'w-note-s' }, 'Las respuestas se guardan solo en este navegador. La persona que facilita las prepara con antelación y luego proyecta el modo «Jugar».'));
    }
    pintar();
    el.appendChild(cont);
  };
})();
