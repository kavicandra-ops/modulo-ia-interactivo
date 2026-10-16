/* Widgets del Taller 4: CPU frente a GPU, autocompletado de juguete, jerarquía
   de memoria y guion colectivo. */
(function () {
  'use strict';
  var M = window.M, h = M.h, W = M.widgets, store = M.store;

  function vivo(el) { return document.body.contains(el); }
  function colorVar(nombre) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
    return v || '#888';
  }

  /* ---------- Profesor frente a estadio (CPU y GPU) ---------- */
  W.gpu = function (el) {
    var N = 16, TOTAL = N * N;
    function lienzo() { var c = h('canvas', { width: N, height: N, 'aria-hidden': 'true' }); return c; }
    var cCpu = lienzo(), cGpu = lienzo();
    var tCpu = h('span', { class: 'gt' }, 'Pasos: 0'), tGpu = h('span', { class: 'gt' }, 'Pasos: 0');
    var msg = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var corriendo = false;
    function colorPixel(x, y) {
      var cx = x - 7.5, cy = y - 7.5, d = Math.sqrt(cx * cx + cy * cy);
      var cols = [colorVar('--t1'), colorVar('--t2'), colorVar('--t3'), colorVar('--t4')];
      if (d > 7.6) return colorVar('--surface');
      var ang = (Math.atan2(cy, cx) + Math.PI) / (2 * Math.PI);
      if (d < 2.4) return colorVar('--ink');
      return cols[Math.floor(ang * 4) % 4];
    }
    function limpiar(c) { var g = c.getContext('2d'); g.fillStyle = colorVar('--surface-2'); g.fillRect(0, 0, N, N); }
    function pintarPx(c, i) { var g = c.getContext('2d'); var x = i % N, y = Math.floor(i / N); g.fillStyle = colorPixel(x, y); g.fillRect(x, y, 1, 1); }
    function correr() {
      if (corriendo) return; corriendo = true;
      limpiar(cCpu); limpiar(cGpu);
      var paso = 0, cpuHecho = 0, gpuHecho = false;
      msg.textContent = 'Pintando 256 píxeles…';
      var it = setInterval(function () {
        if (!vivo(el)) { clearInterval(it); return; }
        paso++;
        if (!gpuHecho) { for (var i = 0; i < TOTAL; i++) pintarPx(cGpu, i); gpuHecho = true; tGpu.textContent = 'Pasos: 1 · 256 núcleos a la vez'; }
        for (var k = 0; k < 4 && cpuHecho < TOTAL; k++) pintarPx(cCpu, cpuHecho++);
        tCpu.textContent = 'Pasos: ' + paso + ' · 4 núcleos';
        if (cpuHecho >= TOTAL) {
          clearInterval(it); corriendo = false;
          msg.textContent = 'La CPU necesitó 64 pasos; la GPU, uno solo. Entrenar una red neuronal es repetir operaciones sencillas sobre millones de números: justo lo que hace bien la GPU.';
        }
      }, 60);
    }
    limpiar(cCpu); limpiar(cGpu);
    el.appendChild(h('p', { class: 'w-note' }, 'Hay que pintar 256 puntos de una imagen. La CPU tiene 4 núcleos muy versátiles; la GPU, cientos de núcleos sencillos que hacen lo mismo a la vez.'));
    el.appendChild(h('div', { class: 'gpu' },
      h('div', { class: 'gp' }, h('b', null, 'CPU: el profesor'), cCpu, tCpu),
      h('div', { class: 'gp' }, h('b', null, 'GPU: el estadio de estudiantes'), cGpu, tGpu)));
    el.appendChild(h('div', { class: 'btnrow' }, h('button', { class: 'btn small primary', type: 'button', onclick: correr }, M.icon('play'), 'Pintar la imagen')));
    el.appendChild(msg);
    el.appendChild(h('p', { class: 'w-note-s' }, 'Simplificación: cada núcleo de una GPU es más sencillo y lento que uno de CPU; su ventaja está en hacer la misma operación muchas veces a la vez.'));
  };

  /* ---------- Un autocompletado de juguete ---------- */
  var modelo = null;
  function corpus() {
    var textos = [];
    function add(t) { if (typeof t === 'string') textos.push(t); }
    M.talleres.forEach(function (t) {
      add(t.intro);
      t.secciones.forEach(function (sec) {
        ['items', 'eventos', 'capitulos', 'actividades'].forEach(function (k) {
          (sec[k] || []).forEach(function (it) { add(it.d); add(it.h); add(it.p); });
        });
        if (sec.leccion) add(sec.leccion.d);
        (sec.notas || []).forEach(function (n) { add(n.d); });
        (sec.textos || []).forEach(add);
      });
    });
    return textos.join(' ');
  }
  function entrenar() {
    if (modelo) return modelo;
    var txt = corpus().replace(/\([^()]*\)/g, ' ').toLowerCase();
    var palabras = txt.match(/[a-záéíóúüñ]+/g) || [];
    var big = {};
    for (var i = 0; i < palabras.length - 1; i++) {
      var a = palabras[i], b = palabras[i + 1];
      (big[a] || (big[a] = {}))[b] = (big[a][b] || 0) + 1;
    }
    modelo = { big: big, n: palabras.length, voc: Object.keys(big).length };
    return modelo;
  }
  W.autocompletar = function (el) {
    var mod = entrenar();
    var texto = ['la'];
    var caja = h('div', { class: 'auto-txt', 'aria-live': 'polite' });
    var opts = h('div', { class: 'auto-opts' });
    var aviso = h('p', { class: 'w-note-s' });
    function siguientes(w) {
      var d = mod.big[w]; if (!d) return [];
      var tot = 0; Object.keys(d).forEach(function (k) { tot += d[k]; });
      return Object.keys(d).map(function (k) { return { w: k, p: d[k] / tot }; }).sort(function (a, b) { return b.p - a.p; });
    }
    function pintar() {
      M.clear(caja);
      caja.appendChild(document.createTextNode(texto.join(' ')));
      caja.appendChild(h('span', { class: 'cur' }));
      M.clear(opts);
      var sg = siguientes(texto[texto.length - 1]);
      if (!sg.length) { aviso.textContent = 'El modelo nunca vio nada después de «' + texto[texto.length - 1] + '». Borre una palabra o empiece de nuevo.'; return; }
      aviso.textContent = 'Toque una palabra para seguir. Los porcentajes salen de contar qué palabra viene después de «' + texto[texto.length - 1] + '» en el texto del módulo.';
      sg.slice(0, 4).forEach(function (o) {
        opts.appendChild(h('button', { type: 'button', onclick: function () { texto.push(o.w); pintar(); } },
          h('span', { class: 'aw' }, o.w), h('span', { class: 'ap' }, M.dec(o.p * 100, 0) + ' %'), h('span', { class: 'apb' }, h('i', { style: { width: (o.p * 100) + '%' } }))));
      });
    }
    function azar() {
      var sg = siguientes(texto[texto.length - 1]);
      if (!sg.length) return;
      var r = Math.random(), acc = 0;
      for (var i = 0; i < sg.length; i++) { acc += sg[i].p; if (r <= acc) { texto.push(sg[i].w); break; } }
      pintar();
    }
    var inicios = ['la', 'el', 'una', 'en', 'los', 'colombia'];
    el.appendChild(h('p', { class: 'w-note' }, 'Este modelo de juguete aprendió del propio texto del módulo (unas ' + M.miles(mod.n) + ' palabras). Solo mira la palabra anterior y predice cuál suele venir después.'));
    el.appendChild(h('div', { class: 'btnrow' }, h('span', { class: 'w-note-s' }, 'Empezar con:'), inicios.map(function (w) { return h('button', { class: 'chip', type: 'button', onclick: function () { texto = [w]; pintar(); } }, w); })));
    el.appendChild(caja);
    el.appendChild(opts);
    el.appendChild(aviso);
    el.appendChild(h('div', { class: 'btnrow' },
      h('button', { class: 'btn small primary', type: 'button', onclick: azar }, 'Que elija el modelo'),
      h('button', { class: 'btn small', type: 'button', onclick: function () { for (var i = 0; i < 8; i++) azar(); } }, 'Ocho palabras seguidas'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { if (texto.length > 1) texto.pop(); pintar(); } }, 'Borrar la última')));
    el.appendChild(h('p', { class: 'w-note-s' }, 'Fíjese: a veces arma frases que suenan bien pero son falsas. Es una alucinación en miniatura. Los modelos reales miran miles de tokens, no una sola palabra, y tienen miles de millones de parámetros.'));
    pintar();
  };

  /* ---------- La jerarquía de memoria ---------- */
  W.memoria = function (el) {
    var NIV = [
      { n: 'Registro', d: 'Dentro del propio procesador', s: 0.3e-9, real: '~0,3 ns', hum: '~1 segundo', a: 'Lo que ya tiene en la mano' },
      { n: 'Caché', d: 'Celdas de varios transistores por bit', s: 3e-9, real: '~1 a 10 ns', hum: '~3 a 30 segundos', a: 'La tabla de picar, junto a la estufa' },
      { n: 'Memoria RAM', d: 'Un diminuto condensador por bit que hay que recargar', s: 100e-9, real: '~100 ns', hum: '~5 minutos', a: 'El mesón' },
      { n: 'Memoria flash', d: 'Atrapa cargas que permanecen sin energía', s: 100e-6, real: '~100 µs', hum: '~3 o 4 días', a: 'La alacena' },
      { n: 'Disco duro', d: 'Magnetiza un plato que gira', s: 10e-3, real: '~10 ms', hum: '~1 año', a: 'El depósito del edificio' },
      { n: 'Internet', d: 'Otras computadoras, a través de la red', s: 150e-3, real: '~150 ms', hum: '~14 años', a: 'Encargarlo a otra ciudad' }
    ];
    var lmin = Math.log10(0.1e-9), lmax = Math.log10(1);
    var lista = h('div', { class: 'memoria', role: 'group', 'aria-label': 'Niveles de memoria' });
    var detalle = h('div', { class: 'mem-detail', 'aria-live': 'polite' });
    var botones = [];
    function elegir(i) {
      botones.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
      var nv = NIV[i];
      M.clear(detalle);
      detalle.appendChild(h('div', { class: 'md-big' }, nv.hum.replace('~', '')));
      detalle.appendChild(h('div', null, h('p', null, h('strong', null, nv.n + '. '), 'Si un registro tardara 1 segundo, aquí tardaría ' + nv.hum.replace('~', 'unos ').replace('unos 1 ', 'un ') + '. En la cocina: ' + nv.a.toLowerCase() + '.'), h('p', null, 'Tecnología: ' + nv.d.toLowerCase() + '. Tiempo real aproximado: ' + nv.real.replace('~', '') + '.')));
    }
    NIV.forEach(function (nv, i) {
      var w = (Math.log10(nv.s) - lmin) / (lmax - lmin) * 100;
      var b = h('button', { type: 'button', class: 'mem-row', 'aria-pressed': 'false', onclick: function () { elegir(i); } },
        h('span', { class: 'mn' }, nv.n, h('small', null, nv.a)),
        h('span', { class: 'mb', 'aria-hidden': 'true' }, h('i', { style: { width: w + '%' } })),
        h('span', { class: 'mt' }, h('b', null, nv.hum), nv.real));
      botones.push(b); lista.appendChild(b);
    });
    el.appendChild(h('div', { class: 'w-row', style: { justifyContent: 'space-between' } }, h('span', { class: 'w-note-s' }, 'Arriba: pequeña, rápida y cara'), h('span', { class: 'w-note-s' }, 'Barra: tiempo, en escala que multiplica por diez')));
    el.appendChild(lista);
    el.appendChild(h('span', { class: 'w-note-s' }, 'Abajo: enorme, lenta y barata'));
    el.appendChild(detalle);
    elegir(2);
  };

  /* ---------- Guion colectivo ---------- */
  var CARTAS = [
    { t: 'El 92 % de la capacidad para fabricar los chips más avanzados está en un solo lugar.', f: 'Taller 4 (Varas et al., 2021)' },
    { t: 'Un centro de datos de IA consume tanta electricidad como 100.000 hogares.', f: 'Taller 4 (IEA, 2025)' },
    { t: 'Un juez consulta a un chatbot antes de decidir. ¿Puede la máquina reemplazar su juicio?', f: 'Taller 4 (Corte Constitucional de Colombia, 2024)' },
    { t: 'Nadie logra distinguir si quien escribe es una persona o una máquina.', f: 'Taller 1 (Turing, 1950)' },
    { t: 'La máquina afirma una falsedad con total seguridad.', f: 'Taller 4: alucinaciones y sesgos' },
    { t: '2.200 millones de personas siguen desconectadas.', f: 'Taller 4 (ITU, 2025)' },
    { t: 'Suenan las alarmas 1201 y 1202 en el peor momento posible.', f: 'Taller 2 (Adler, 1998)' },
    { t: 'El líder de hoy tropieza mañana, como IBM, Intel o Nokia.', f: 'Cinco ideas: ningún líder es para siempre' },
    { t: 'Una región crea su propio modelo con textos obtenidos con permisos.', f: 'Taller 4 (CENIA, 2026)' },
    { t: '«La máquina solo hace lo que se le ordena»… ¿o no?', f: 'Taller 1: la objeción de Lady Lovelace (Hollings et al., 2018)' },
    { t: 'Se acaban los fondos: llega un «invierno».', f: 'Taller 2 (National Research Council, 1999)' },
    { t: 'Una clave fácil de adivinar delata todo el sistema.', f: 'Taller 1: las cillies de Enigma (Sale, s. f.)' },
    { t: 'El contenido hecho por la máquina ya persuade tanto como el escrito por personas.', f: 'Taller 4 (International AI Safety Report, 2026)' },
    { t: 'Las programadoras hacen el trabajo, pero la publicidad solo nombra a los ingenieros.', f: 'Taller 1 (Light, 1999)' }
  ];
  var CAMPOS = [
    ['titulo', 'Título de la película', 'input', 'Ej.: La red que no duerme', true],
    ['anio', 'Año en que ocurre', 'input', 'Ej.: 2049'],
    ['maquina', 'Nombre de la máquina', 'input', 'Ej.: MAMUT'],
    ['controla', '¿Qué controla y cómo llegó a hacerlo?', 'textarea', 'Ej.: el agua y la energía de todo un continente, después de una crisis…', true],
    ['financia', '¿Quién la financió?', 'input', ''],
    ['gana', '¿Quién gana con ella?', 'input', ''],
    ['fuera', '¿Quién queda por fuera?', 'input', ''],
    ['ingrediente', '¿Qué ingrediente la hizo posible?', 'select', ''],
    ['conflicto', 'El conflicto', 'textarea', '¿Qué sale mal y a quién afecta?', true],
    ['giro', 'El giro', 'textarea', '¿Qué descubre el grupo protagonista?', true],
    ['final', 'El final', 'textarea', '¿Cómo termina? ¿Quién decide?', true]
  ];
  var EJEMPLO_GUION = {
    ejemplo: true, titulo: 'Invierno en Silicio', anio: '2051', maquina: 'ORÁCULO',
    controla: 'Reparte la electricidad del planeta. Empezó como un asistente para ahorrar energía en los centros de datos y terminó decidiendo qué ciudades tienen luz.',
    financia: 'Un consorcio de gobiernos y empresas de chips', gana: 'Quien posee los centros de datos', fuera: 'Las regiones rurales y quienes no tienen Internet',
    ingrediente: 'Los tres: ideas, datos y cómputo',
    conflicto: 'Una sequía baja la generación eléctrica y ORÁCULO apaga primero las zonas que «producen menos datos».',
    giro: 'Una programadora de Medellín descubre que la máquina aprendió ese criterio de datos históricos sesgados.',
    final: 'Una asamblea ciudadana vuelve a escribir las reglas y decide que ninguna máquina reemplaza el juicio humano.',
    escenas: [{ lugar: 'Sala de control, Bogotá', quien: 'Ingeniera de turno', pasa: 'Ve en la pantalla cómo se apagan, una a una, las veredas del mapa.' }]
  };
  W.guion = function (el) {
    var g = store.get('guion', null) || JSON.parse(JSON.stringify(EJEMPLO_GUION));
    var carta = 0;
    var cont = h('div');
    function guardar() { g.ejemplo = false; store.set('guion', g); prevTxt.textContent = texto(); banner.hidden = true; }
    function texto() {
      var t = (g.titulo || 'SIN TÍTULO').toUpperCase() + '\n' + 'Una película sobre ' + (g.maquina || 'una máquina') + (g.anio ? ', en ' + g.anio : '') + '.\n\n';
      CAMPOS.slice(3).forEach(function (c) { if (g[c[0]]) t += c[1] + '\n' + g[c[0]] + '\n\n'; });
      (g.escenas || []).forEach(function (e, i) {
        t += 'ESCENA ' + (i + 1) + (e.lugar ? '. ' + e.lugar.toUpperCase() : '') + '\n' + (e.quien ? e.quien + ': ' : '') + (e.pasa || '') + '\n\n';
      });
      return t.trim();
    }
    var banner = h('p', { class: 'banner' }, 'Guion de ejemplo para mostrar la herramienta. Empiece en blanco para escribir el del grupo.');
    var prevTxt = h('div', { class: 'preview-guion', 'aria-live': 'off' });
    function pintar() {
      M.clear(cont);
      banner.hidden = !g.ejemplo;
      var form = h('div', { class: 'guion-form' });
      CAMPOS.forEach(function (c) {
        var id = 'guion-' + c[0], ctl;
        if (c[2] === 'select') {
          ctl = h('select', { class: 'input', id: id }, ['', 'Ideas (algoritmos)', 'Datos', 'Capacidad de cómputo', 'Los tres: ideas, datos y cómputo'].map(function (o) { return h('option', { value: o, selected: g[c[0]] === o }, o || 'Elegir…'); }));
          ctl.addEventListener('change', function () { g[c[0]] = ctl.value; guardar(); });
        } else {
          ctl = h(c[2], { class: 'input', id: id, placeholder: c[3], rows: c[2] === 'textarea' ? 2 : null });
          ctl.value = g[c[0]] || '';
          ctl.addEventListener('input', function () { g[c[0]] = ctl.value; guardar(); });
        }
        form.appendChild(h('label', { class: 'w-field' + (c[4] ? ' full' : ''), for: id }, h('span', null, c[1]), ctl));
      });
      var escenas = h('div', { class: 'escenas' });
      (g.escenas || []).forEach(function (e, i) {
        function campo(k, ph) {
          var x = h(k === 'pasa' ? 'textarea' : 'input', { class: 'input', id: 'esc-' + i + '-' + k, placeholder: ph, 'aria-label': ph, rows: k === 'pasa' ? 2 : null });
          x.value = e[k] || '';
          x.addEventListener('input', function () { e[k] = x.value; guardar(); });
          return x;
        }
        escenas.appendChild(h('div', { class: 'escena' },
          h('div', { class: 'eh' }, h('span', null, 'Escena ' + (i + 1)), h('button', { class: 'btn small ghost', type: 'button', onclick: function () { g.escenas.splice(i, 1); guardar(); pintar(); } }, 'Quitar')),
          h('div', { class: 'guion-form' }, campo('lugar', 'Lugar'), campo('quien', 'Quién habla o actúa'), h('div', { class: 'full' }, campo('pasa', 'Qué pasa')))));
      });
      var confirmar = h('div', { class: 'btnrow', hidden: true }, h('span', { class: 'small' }, '¿Borrar todo el guion?'),
        h('button', { class: 'btn small primary', type: 'button', onclick: function () { g = { ejemplo: false, escenas: [] }; store.set('guion', g); pintar(); } }, 'Sí, borrar'),
        h('button', { class: 'btn small', type: 'button', onclick: function () { confirmar.hidden = true; } }, 'Cancelar'));
      var copiarBtn = h('button', { class: 'btn small primary', type: 'button', onclick: function () { M.copiar(texto(), copiarBtn); } }, M.icon('copiar'), 'Copiar el guion');
      var cartaEl = h('div', { class: 'carta', 'aria-live': 'polite' });
      function pintarCarta() {
        M.clear(cartaEl);
        cartaEl.appendChild(h('span', { class: 'ck' }, 'Carta de inspiración ' + (carta + 1) + ' de ' + CARTAS.length));
        cartaEl.appendChild(h('p', { class: 'ct' }, CARTAS[carta].t));
        cartaEl.appendChild(h('span', { class: 'cs' }, M.rich('Viene del módulo: ' + CARTAS[carta].f)));
      }
      pintarCarta();
      cont.appendChild(h('div', { class: 'guion' },
        h('div', { class: 'stack' }, banner, form,
          h('h4', { class: 'mt-s' }, 'Escenas'), escenas,
          h('div', { class: 'btnrow' },
            h('button', { class: 'btn small', type: 'button', onclick: function () { (g.escenas = g.escenas || []).push({}); guardar(); pintar(); } }, 'Añadir escena'),
            h('button', { class: 'btn small ghost', type: 'button', onclick: function () { confirmar.hidden = false; } }, 'Empezar en blanco'),
            h('button', { class: 'btn small ghost', type: 'button', onclick: function () { g = JSON.parse(JSON.stringify(EJEMPLO_GUION)); store.del('guion'); pintar(); } }, 'Ver el ejemplo')),
          confirmar),
        h('div', { class: 'stack' },
          cartaEl,
          h('div', { class: 'btnrow' }, h('button', { class: 'btn small', type: 'button', onclick: function () { carta = Math.floor(Math.random() * CARTAS.length); pintarCarta(); } }, 'Sacar otra carta'),
            h('span', { class: 'w-note-s' }, 'Cada grupo saca una carta y la mete en su escena.')),
          h('h4', { class: 'mt-s' }, 'Así va el guion'), prevTxt,
          h('div', { class: 'btnrow' }, copiarBtn, h('span', { class: 'w-note-s' }, 'Se guarda solo en este navegador.')))));
      prevTxt.textContent = texto();
    }
    el.appendChild(h('p', { class: 'w-note' }, 'Cada grupo completa una parte o escribe una escena. Usen las preguntas del módulo: ¿quién financia?, ¿quién gana?, ¿quién queda por fuera?, ¿qué ingrediente la hizo posible?'));
    el.appendChild(cont);
    pintar();
  };
})();
