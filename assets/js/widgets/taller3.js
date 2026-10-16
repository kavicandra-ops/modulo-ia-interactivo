/* Widgets del Taller 3: reloj, carrera de la frecuencia, línea de tiempo viva y
   clasificador «¿Web o solo Internet?». */
(function () {
  'use strict';
  var M = window.M, h = M.h, s = M.s, W = M.widgets, store = M.store;

  function duracion(seg) {
    if (seg < 120) return M.dec(seg, 0) + ' segundos';
    if (seg < 7200) return M.dec(seg / 60, 0) + ' minutos';
    if (seg < 86400 * 2) return M.dec(seg / 3600, 1) + ' horas';
    if (seg < 86400 * 365) return M.dec(seg / 86400, 0) + ' días';
    return M.dec(seg / (86400 * 365.25), 1) + ' años';
  }

  /* ---------- Si cada tic durara un segundo ---------- */
  W.reloj = function (el) {
    var P = [
      ['Intel 4004 (1971)', 0.74e6, '740 kHz'],
      ['IBM PC con Intel 8088 (1981)', 4.77e6, '4,77 MHz'],
      ['Pentium (1993)', 60e6, '60 MHz'],
      ['AMD Athlon (2000)', 1e9, '1 GHz']
    ];
    var sel = 1;
    var big = h('div', { class: 'w-big' });
    var txt = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var opts = h('div', { class: 'btnrow' });
    var metro = h('span', { class: 'metro tic', 'aria-hidden': 'true' });
    function pintar() {
      M.clear(opts);
      P.forEach(function (pp, i) { opts.appendChild(h('button', { class: 'chip', type: 'button', 'aria-pressed': String(i === sel), onclick: function () { sel = i; pintar(); } }, pp[0])); });
      var hz = P[sel][1];
      big.textContent = duracion(hz);
      txt.textContent = 'A ' + P[sel][2] + ', el reloj da ' + M.miles(hz) + ' tics en un solo segundo. Si cada tic durara un segundo, contarlos todos tomaría ' + duracion(hz) + '.';
    }
    el.appendChild(h('p', { class: 'w-note' }, 'El reloj marca el ritmo del procesador como un metrónomo. Elija un procesador:'));
    el.appendChild(opts);
    el.appendChild(h('div', { class: 'w-row' }, metro, big));
    el.appendChild(txt);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Ojo: más megahercios no siempre significa más rápido. También importa cuánto trabajo se hace en cada tic.'));
    pintar();
  };

  /* ---------- La carrera de la frecuencia ---------- */
  var ESCF = { '-1': '100 kHz', 0: '1 MHz', 1: '10 MHz', 2: '100 MHz', 3: '1 GHz', 4: '10 GHz' };
  function mhz(v) { return v < 1 ? M.miles(v * 1000) + ' kHz' : v < 1000 ? M.dec(v, v % 1 ? 2 : 0) + ' MHz' : M.dec(v / 1000, v % 1000 ? 1 : 0) + ' GHz'; }
  W.graficoFrecuencia = function (el) {
    M.logChart(el, {
      aria: 'Frecuencia de reloj de diez procesadores entre 1971 y 2000, en escala logarítmica.',
      xMin: 1969, xMax: 2007, yMin: 0.1, yMax: 10000, ml: 96,
      yLabel: 'Frecuencia', colNombre: 'Procesador', colValor: 'Frecuencia',
      yFmt: function (v) { return ESCF[Math.round(Math.log10(v))]; },
      yFmtLargo: mhz,
      puntos: [
        { x: 1971, y: 0.74, nombre: 'Intel 4004', lab: 'a' },
        { x: 1974, y: 2, nombre: 'Intel 8080', lab: 'b' },
        { x: 1981, y: 4.77, nombre: 'Intel 8088 (IBM PC)', lab: 'b' },
        { x: 1982, y: 6, nombre: 'Intel 80286' },
        { x: 1985, y: 16, nombre: 'Intel 386', lab: 'b' },
        { x: 1989, y: 25, nombre: 'Intel 486', lab: 'b' },
        { x: 1993, y: 60, nombre: 'Pentium', lab: 'b' },
        { x: 1997, y: 233, nombre: 'Pentium II', lab: 'l' },
        { x: 1999, y: 500, nombre: 'Pentium III', lab: 'l' },
        { x: 2000, y: 1000, nombre: 'AMD Athlon', lab: 'l' }
      ],
      marcas: [{ x: 2004, y: 4000, label: 'Pentium 4 de 4 GHz', tip: '<b>2004</b> · Intel cancela su Pentium 4 de 4 GHz: fin de la carrera de la frecuencia', aria: '2004: Intel cancela su Pentium 4 de 4 GHz' }]
    });
  };

  /* ---------- Línea de tiempo viva ---------- */
  var TIPOS = { pc: ['Una PC', 't3'], cel: ['Un celular', 't4'], net: ['Internet', 't2'] };
  W.lineaViva = function (el) {
    var datos = store.get('linea-viva', []);
    var x0 = 40, x1 = 880, A0 = 1960, A1 = 2026;
    function sx(a) { return x0 + (a - A0) / (A1 - A0) * (x1 - x0); }
    var svgBox = h('div', { class: 'viva chartwrap' });
    var lista = h('ul');
    var vacio = h('p', { class: 'w-note-s' });
    function dibujar() {
      var svg = s('svg', { viewBox: '0 0 900 250', role: 'img', 'aria-label': 'Línea de tiempo con los primeros contactos del grupo' });
      [[1960, 1980, 't2', 'Chip'], [1980, 2000, 't3', 'PC'], [2000, 2026, 't4', 'Bolsillo']].forEach(function (e) {
        svg.appendChild(s('rect', { x: sx(e[0]), y: 196, width: sx(e[1]) - sx(e[0]) - 2, height: 14, fill: 'var(--' + e[2] + ')' }));
        svg.appendChild(s('text', { class: 'chart-text', x: sx(e[0]) + 4, y: 228 }, e[3] + ' · ' + e[0]));
      });
      [[1981, 'IBM PC'], [1992, 'Primer SMS'], [1994, 'Internet llega a Colombia'], [2007, 'iPhone'], [2022, 'ChatGPT']].forEach(function (r, i) {
        var x = sx(r[0]);
        svg.appendChild(s('line', { x1: x, x2: x, y1: 40, y2: 196, stroke: 'var(--line-2)', 'stroke-dasharray': '3 4' }));
        var ultimo = r[0] > 2015;
        svg.appendChild(s('text', { class: 'chart-text', x: ultimo ? x - 4 : x + 4, y: 16 + (i % 2) * 14, 'text-anchor': ultimo ? 'end' : 'start' }, r[0] + ' ' + r[1]));
      });
      var pila = {};
      datos.forEach(function (d) {
        var a = Math.max(A0, Math.min(A1, d.a));
        var k = pila[a] = (pila[a] || 0) + 1;
        var cy = 196 - 12 - (k - 1) * 18;
        if (cy < 44) return;
        var g = s('g', null);
        var col = 'var(--' + TIPOS[d.t][1] + ')';
        if (d.t === 'pc') g.appendChild(s('rect', { x: sx(a) - 7, y: cy - 7, width: 14, height: 14, rx: 2, fill: col }));
        else if (d.t === 'cel') g.appendChild(s('rect', { x: sx(a) - 5, y: cy - 8, width: 10, height: 16, rx: 3, fill: col }));
        else g.appendChild(s('circle', { cx: sx(a), cy: cy, r: 7, fill: col }));
        g.appendChild(s('title', null, (d.n || 'Alguien') + ' · ' + TIPOS[d.t][0] + ' · ' + d.a));
        svg.appendChild(g);
      });
      M.clear(svgBox); svgBox.appendChild(svg);
      M.clear(lista);
      datos.slice().sort(function (a, b) { return a.a - b.a; }).forEach(function (d) {
        lista.appendChild(h('li', null, h('b', null, d.a), h('span', null, (d.n ? d.n + ': ' : '') + TIPOS[d.t][0].toLowerCase() + (d.r ? '. «' + d.r + '»' : '')),
          h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Quitar', onclick: function () { datos.splice(datos.indexOf(d), 1); store.set('linea-viva', datos); dibujar(); } }, 'Quitar')));
      });
      vacio.textContent = datos.length ? datos.length + (datos.length === 1 ? ' recuerdo en la línea.' : ' recuerdos en la línea.') : 'Todavía no hay recuerdos. Agregue el primero con el formulario: aparecerá como un punto sobre su año.';
    }
    var nombre = h('input', { class: 'input', id: 'viva-n', placeholder: 'Nombre o iniciales (opcional)', maxlength: 30 });
    var anio = h('input', { class: 'input', id: 'viva-a', type: 'number', min: A0, max: A1, placeholder: 'Año' });
    var tipo = h('select', { class: 'input', id: 'viva-t' }, Object.keys(TIPOS).map(function (k) { return h('option', { value: k }, TIPOS[k][0]); }));
    var rec = h('input', { class: 'input', id: 'viva-r', placeholder: 'Un recuerdo corto (opcional)', maxlength: 90 });
    var err = h('p', { class: 'w-note-s', 'aria-live': 'polite' });
    var form = h('form', { class: 'stack' },
      h('div', { class: 'viva-form' },
        h('label', { class: 'w-field', for: 'viva-n' }, h('span', null, 'Quién'), nombre),
        h('label', { class: 'w-field', for: 'viva-a' }, h('span', null, 'Año'), anio),
        h('label', { class: 'w-field', for: 'viva-t' }, h('span', null, 'Primer contacto con'), tipo),
        h('button', { class: 'btn primary', type: 'submit' }, 'Agregar a la línea')),
      h('label', { class: 'w-field', for: 'viva-r' }, h('span', null, 'Recuerdo'), rec), err);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var a = Number(anio.value);
      if (!a || a < A0 || a > A1) { err.textContent = 'Escriba un año entre ' + A0 + ' y ' + A1 + '.'; return; }
      err.textContent = '';
      datos.push({ n: nombre.value.trim(), a: a, t: tipo.value, r: rec.value.trim() });
      store.set('linea-viva', datos);
      nombre.value = ''; anio.value = ''; rec.value = '';
      dibujar(); nombre.focus();
    });
    el.appendChild(form);
    el.appendChild(svgBox);
    el.appendChild(h('div', { class: 'btnrow' }, Object.keys(TIPOS).map(function (k) { return h('span', { class: 'chip' }, h('span', { style: { width: '10px', height: '10px', background: 'var(--' + TIPOS[k][1] + ')', borderRadius: k === 'net' ? '50%' : '2px', display: 'inline-block' } }), TIPOS[k][0]); }), vacio));
    el.appendChild(h('div', { class: 'viva-list' }, lista));
    dibujar();
  };

  /* ---------- ¿Es la Web o solo usa Internet? ---------- */
  W.webInternet = function (el) {
    var ITEMS = [
      { t: 'Una página web de noticias', b: 'web', e: 'Es una página con dirección y enlaces que se abre en un navegador: eso es la Web.' },
      { t: 'Correo electrónico', b: 'net', e: 'El correo es otro servicio que circula por Internet, como la Web. Nació en ARPANET en 1972, antes que la Web. Si se lee en el navegador, la Web es solo la ventana.' },
      { t: 'WhatsApp en el celular', b: 'net', e: 'La aplicación usa Internet para enviar los mensajes, pero no muestra páginas web enlazadas.' },
      { t: 'Wikipedia en el navegador', b: 'web', e: 'Páginas enlazadas con direcciones, abiertas en un navegador: la Web en estado puro.' },
      { t: 'Un juego en línea instalado en la consola', b: 'net', e: 'El juego usa Internet con su propio programa para conectar a los jugadores, sin páginas web.' },
      { t: 'Una tienda en línea abierta en el navegador', b: 'web', e: 'Son páginas web con direcciones y enlaces, aunque detrás haya un negocio.' },
      { t: 'Una videollamada desde una aplicación', b: 'net', e: 'La aplicación envía voz e imagen por Internet, sin pasar por páginas web.' }
    ];
    var pos = {}, armado = null, revisado = false;
    var pool = h('div', { class: 'cl-pool', 'aria-label': 'Servicios por clasificar' });
    var bins = {};
    var exp = h('div', { class: 'cl-exp', 'aria-live': 'polite' });
    function chipItem(it, i) {
      var cls = 'cl-item';
      if (revisado && pos[i]) cls += pos[i] === it.b ? ' ok' : ' no';
      var b = h('button', { type: 'button', class: cls, draggable: 'true', 'aria-pressed': String(armado === i), onclick: function (e) { e.stopPropagation(); armado = armado === i ? null : i; pintar(); } }, it.t);
      b.addEventListener('dragstart', function (e) { armado = i; try { e.dataTransfer.setData('text/plain', String(i)); } catch (x) { /* nada */ } });
      return b;
    }
    function colocar(dest) { if (armado === null) return; if (dest) pos[armado] = dest; else delete pos[armado]; armado = null; revisado = false; pintar(); }
    function crearBin(k, titulo, ic, ayuda) {
      var zona = h('div', { class: 'cl-in' });
      var b = h('div', { class: 'cl-bin', role: 'button', tabindex: '0', 'aria-label': 'Colocar en: ' + titulo, onclick: function () { colocar(k); }, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); colocar(k); } } },
        h('h4', null, M.icon(ic), titulo), h('span', { class: 'w-note-s' }, ayuda), zona);
      b.addEventListener('dragover', function (e) { e.preventDefault(); });
      b.addEventListener('drop', function (e) { e.preventDefault(); colocar(k); });
      bins[k] = { el: b, zona: zona };
      return b;
    }
    pool.addEventListener('dragover', function (e) { e.preventDefault(); });
    pool.addEventListener('drop', function (e) { e.preventDefault(); colocar(null); });
    pool.addEventListener('click', function () { if (armado !== null) colocar(null); });
    function pintar() {
      M.clear(pool); M.clear(bins.web.zona); M.clear(bins.net.zona);
      ITEMS.forEach(function (it, i) { (pos[i] ? bins[pos[i]].zona : pool).appendChild(chipItem(it, i)); });
      if (!pool.children.length) pool.appendChild(h('span', { class: 'w-note-s' }, 'Todo clasificado. Toque «Revisar».'));
      Object.keys(bins).forEach(function (k) { bins[k].el.classList.toggle('armed', armado !== null); });
      M.clear(exp);
      if (revisado) {
        var ok = 0;
        ITEMS.forEach(function (it, i) {
          if (!pos[i]) return;
          var bien = pos[i] === it.b; if (bien) ok++;
          exp.appendChild(h('p', { class: bien ? 'ok' : 'no' }, h('strong', null, it.t + ': '), (bien ? 'bien. ' : 'va en «' + (it.b === 'web' ? 'Es parte de la Web' : 'Usa Internet, pero no es la Web') + '». ') + it.e));
        });
        exp.insertBefore(h('p', null, h('strong', null, ok + ' de ' + Object.keys(pos).length + ' bien clasificados.')), exp.firstChild);
      }
    }
    el.appendChild(h('p', { class: 'w-note' }, 'Toque un servicio y luego la caja donde va (o arrástrelo). Recuerde: Internet es la red de carreteras; la Web y el correo electrónico son servicios que circulan por ella.'));
    el.appendChild(pool);
    el.appendChild(h('div', { class: 'cl-bins' },
      crearBin('web', 'Es parte de la Web', 'web', 'Páginas enlazadas, con direcciones y navegadores'),
      crearBin('net', 'Usa Internet, pero no es la Web', 'red', 'Otros servicios que viajan por la red')));
    el.appendChild(h('div', { class: 'btnrow' },
      h('button', { class: 'btn small primary', type: 'button', onclick: function () { revisado = true; pintar(); } }, 'Revisar'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { pos = {}; armado = null; revisado = false; pintar(); } }, 'Empezar de nuevo')));
    el.appendChild(exp);
    pintar();
  };
})();
