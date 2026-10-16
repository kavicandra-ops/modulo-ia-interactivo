/* Portada del módulo y juego «¿En la época de qué objeto ocurrió?». */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, W = M.widgets, store = M.store, icon = M.icon;
  var MOD = M.modulo;

  function banda(id, eyebrow, titulo, intro, cuerpo) {
    return h('section', { class: 'band', id: id },
      h('div', { class: 'wrap' },
        h('header', { class: 'band-head' }, h('span', { class: 'eyebrow' }, eyebrow), h('h2', null, titulo), intro ? p(intro) : null),
        cuerpo));
  }

  /* ---------- Visuales de las cinco ideas ---------- */
  var TRANSISTOR = '<svg viewBox="0 0 60 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M14 36V20a16 16 0 0 1 32 0v16z" fill="currentColor" fill-opacity=".15"/><path d="M12 36h36"/><path d="M20 38v36M30 38v36M40 38v36"/></svg>';
  var VISUAL = {
    mini: function () {
      var pasos = [
        [M.objeto('valvula'), 96, 'Válvula', 'La ENIAC (1945): 17.468 válvulas y más de 27 toneladas.'],
        [M.svgFrom(TRANSISTOR), 64, 'Transistor', 'Bell Labs (1947): el mismo interruptor, en un sólido pequeño y frío.'],
        [M.objeto('chip'), 50, 'Chip', 'Intel 4004 (1971): 2.300 transistores en un solo chip.'],
        [M.objeto('chip'), 34, 'Chip de IA', 'Nvidia Blackwell (2024): 208.000 millones de transistores.']
      ];
      return h('div', { class: 'mini-strip' }, pasos.map(function (pp) {
        pp[0].setAttribute('width', pp[1]); pp[0].setAttribute('height', pp[1]);
        return h('div', null, pp[0], h('b', null, pp[2]), h('span', null, pp[3]));
      }));
    },
    capas: function () {
      var nota = h('p', { class: 'small', 'aria-live': 'polite' });
      var lista = h('div', { class: 'capas', role: 'group', 'aria-label': 'Capas, de la más reciente a la más antigua' });
      var bts = [];
      function elegir(i) {
        bts.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
        var c = MOD.capas[i];
        M.clear(nota);
        nota.appendChild(document.createTextNode(c.n + ' '));
        nota.appendChild(h('a', { href: '#taller' + c.taller }, 'Ver en el Taller ' + c.taller));
      }
      MOD.capas.slice().reverse().forEach(function (c) {
        var i = MOD.capas.indexOf(c);
        var b = h('button', { type: 'button', 'aria-pressed': 'false', style: { marginLeft: (i * 3) + '%', marginRight: ((5 - i) * 3) + '%' }, onclick: function () { elegir(i); } }, h('span', { class: 'cy' }, c.a), h('span', null, c.t));
        bts[i] = b; lista.appendChild(b);
      });
      elegir(MOD.capas.length - 1);
      return h('div', { class: 'stack' }, lista, nota);
    },
    ingredientes: function () {
      var tabs = h('div', { class: 'ingr-tabs' });
      var grid = h('div', { class: 'ingr-grid', 'aria-live': 'polite' });
      var bts = [];
      function gauge(n) { var g = h('div', { class: 'gauge', 'aria-hidden': 'true' }); for (var i = 1; i <= 4; i++) g.appendChild(h('i', { class: i <= n ? 'on' : '' })); return g; }
      var NIV = { 1: 'Escaso', 2: 'Insuficiente', 3: 'Creciendo', 4: 'Abundante' };
      function elegir(i) {
        var d = MOD.ingredientes[i];
        bts.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
        M.clear(grid);
        [['ideas', 'idea', 'Ideas (algoritmos)'], ['datos', 'datos', 'Datos'], ['computo', 'computo', 'Capacidad de cómputo']].forEach(function (k) {
          grid.appendChild(h('div', { class: 'ingr era-' + d.taller },
            h('h4', null, icon(k[1]), k[2]), gauge(d[k[0]][0]), h('span', { class: 'gl' }, NIV[d[k[0]][0]]), h('p', null, d[k[0]][1])));
        });
      }
      MOD.ingredientes.forEach(function (d, i) {
        var t = M.talleres[d.taller - 1];
        var b = h('button', { class: 'chip', type: 'button', onclick: function () { elegir(i); } }, 'Taller ' + d.taller + ' · ' + d.rotulo);
        bts.push(b); tabs.appendChild(b);
      });
      elegir(1);
      return h('div', { class: 'stack' }, tabs, grid, h('span', { class: 'w-note-s' }, 'Lectura del módulo a partir del texto de cada taller, no una medición.'));
    },
    estado: function () {
      var cols = [
        ['Financiaron', 'dinero', ['El Ejército de EE. UU. contrató la ENIAC en junio de 1943 (Moye, 1996).', 'Hacia 1963 los prototipos del Apolo usaban el 60 % de los microcircuitos producidos en EE. UU. (Tomayko, 1988).']],
        ['Abarataron', 'sociedad', ['La IBM 650: casi 2.000 unidades, la primera producida en masa (IBM, s. f.-c).', 'Del mainframe que costaba millones a la Apple II de 1.298 dólares (CHM, s. f.-j).']],
        ['Redistribuyeron el poder', 'ley', ['Demandas antimonopolio contra IBM (1969–1982) y Microsoft (1998–2001) (Hagley Museum and Library, s. f.; DOJ, s. f., 2001).', 'La reserva de mercado de Brasil y la Ley de IA de la Unión Europea (Barros da Silva et al., 2025; European Parliament y Council of the European Union, 2024).']]
      ];
      return h('div', { class: 'ingr-grid' }, cols.map(function (c) {
        return h('div', { class: 'ingr' }, h('h4', null, icon(c[1]), c[0]), c[2].map(function (x) { return p(x); }));
      }));
    },
    lideres: function () {
      return h('div', { class: 'lideres' }, MOD.lideres.map(function (l) {
        return h('div', { class: 'lider' }, h('strong', null, l.n),
          h('span', null, h('b', { class: 'up' }, '▲ Dominó. '), l.up),
          h('span', null, h('b', { class: 'down' }, '▼ Tropezó. '), l.down),
          h('span', { class: 'w-note-s' }, 'Talleres ' + l.talleres.join(' y ')));
      }));
    }
  };

  W.paginaInicio = function (main, ctx) {
    /* Portada */
    var regla = h('div', { class: 'ruler' },
      h('div', { class: 'ruler-objs' }, M.talleres.map(function (t) {
        return h('a', { class: 'ruler-obj era-' + t.n, href: '#' + t.slug, 'aria-label': 'Taller ' + t.n + ': ' + t.titulo + ', ' + t.periodo },
          M.objeto(t.objeto), h('span', { class: 'ro-name' }, t.corto), h('span', { class: 'ro-yrs' }, t.periodo));
      })),
      h('div', { class: 'ruler-bar', 'aria-hidden': 'true' }, h('span'), h('span'), h('span'), h('span')),
      h('div', { class: 'ruler-ticks', 'aria-hidden': 'true' }, ['1936', '1960', '1980', '2000', '2026'].map(function (y) { return h('span', null, y); })),
      h('p', { class: 'w-note-s', style: { marginTop: '10px' } }, '¿En la época de qué objeto ocurrió? Con esa pregunta se ubica cualquier hito del módulo.'));
    var hero = h('section', { class: 'hero' },
      h('div', { class: 'wrap' },
        h('div', { class: 'hero-grid' },
          h('div', { class: 'stack', style: { gap: '18px' } },
            h('span', { class: 'eyebrow', style: { color: 'var(--ink-2)' } }, 'Módulo interactivo · Cuatro talleres'),
            h('h1', { class: 'hero-title' }, MOD.titulo, h('span', { class: 'yrs' }, MOD.subtitulo + ' · ' + MOD.anios)),
            h('p', { class: 'hero-sub' }, MOD.presentacion),
            h('div', { class: 'hero-facts' }, MOD.datos.map(function (d) { return h('span', { class: 'chip' }, d); })),
            h('div', { class: 'cta-row' },
              h('a', { class: 'btn primary', href: '#taller1' }, 'Empezar por el Taller 1', icon('flecha')),
              h('a', { class: 'btn', href: '#juego' }, icon('juego'), 'Jugar: ¿en la época de qué objeto?'))),
          regla)));
    main.appendChild(hero);

    /* Propósito */
    main.appendChild(banda('modulo1-proposito', 'Propósito', 'Para qué sirve este recorrido', null,
      h('div', { class: 'brujula' }, MOD.proposito.map(function (pp, i) {
        return h('div', null, icon(pp.icon), h('span', { class: 'bn' }, 'Propósito ' + (i + 1)), h('p', null, pp.t));
      }))));

    /* Enfoque */
    var hilos = h('div', { class: 'hilos3' }, Object.keys(M.HILOS).map(function (k, i) {
      var hl = M.HILOS[k];
      var color = ['var(--t2)', 'var(--t4)', 'var(--t1)', 'var(--t3)'][i];
      return h('div', { class: 'hilo-card', style: { borderTopColor: color } }, h('h3', null, h('span', { style: { color: color, display: 'inline-flex' } }, icon(hl.icon)), hl.n), h('p', null, hl.d));
    }));
    main.appendChild(banda('modulo1-enfoque', 'Enfoque', 'Un objeto por época, tres hilos en paralelo', null,
      h('div', { class: 'stack', style: { gap: '22px' } },
        h('div', { class: 'prose' }, MOD.enfoque.map(function (x) { return p(x); })),
        hilos,
        h('div', { class: 'notas-lectura' }, h('strong', null, 'Cómo leer este módulo'), h('ul', null, MOD.notas.map(function (n) { return h('li', null, n); }))))));

    /* Mapa */
    var mapa = h('div', { class: 'mapa' }, MOD.mapa.map(function (m) {
      var t = M.talleres[m.n - 1];
      var pr = ctx.progreso(t);
      return h('a', { class: 'mapa-card era-' + m.n, href: '#' + t.slug },
        h('div', { class: 'mapa-top' }, h('div', null, h('span', { class: 'mn' }, 'Taller ' + m.n + ' · ' + m.periodo), h('h3', null, m.titulo)), M.objeto(t.objeto)),
        h('p', { class: 'mapa-q' }, m.pregunta),
        h('dl', { class: 'mapa-dl' },
          h('div', null, h('dt', null, 'Objeto-símbolo'), h('dd', null, m.objeto)),
          h('div', null, h('dt', null, 'Hilo de la IA'), h('dd', null, m.ia)),
          h('div', null, h('dt', null, 'Contexto dominante'), h('dd', null, m.contexto))),
        h('div', { class: 'mapa-prog' }, h('div', { class: 'bar' }, h('i', { style: { width: (pr.n / pr.total * 100) + '%' } })), h('span', null, pr.n + '/' + pr.total + ' vistos')));
    }));
    var clima = h('figure', { class: 'fig mt-l' },
      h('div', { class: 'fig-box' }, M.montar('clima')),
      h('figcaption', null, h('p', null, MOD.climaPie), h('span', { class: 'src' }, M.rich(MOD.climaFuente + '. Esquema cualitativo; las fechas de los inviernos son aproximadas.'))));
    main.appendChild(banda('modulo1-mapa', 'Mapa del módulo', 'Cuatro talleres, cuatro objetos', MOD.mapaIntro, [mapa, clima]));

    /* Cinco ideas */
    var lista = h('div', { class: 'ideas-list', role: 'tablist', 'aria-label': 'Cinco ideas' });
    var panel = h('div', { class: 'idea-panel', role: 'tabpanel', 'aria-live': 'polite' });
    var bts = [];
    function elegir(i) {
      bts.forEach(function (b, j) { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      var idea = MOD.ideas[i];
      M.clear(panel);
      panel.appendChild(h('span', { class: 'eyebrow', style: { color: 'var(--ink-3)' } }, 'Idea ' + (i + 1) + ' de 5'));
      panel.appendChild(h('h3', null, idea.t));
      panel.appendChild(p(idea.d, { class: 'lead' }));
      panel.appendChild(VISUAL[idea.tipo]());
    }
    MOD.ideas.forEach(function (idea, i) {
      var b = h('button', { type: 'button', role: 'tab', onclick: function () { elegir(i); } }, h('span', { class: 'in' }, i + 1), h('span', null, idea.t));
      bts.push(b); lista.appendChild(b);
    });
    lista.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].indexOf(e.key) === -1) return;
      e.preventDefault();
      var cur = bts.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
      var nx = (cur + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + bts.length) % bts.length;
      elegir(nx); bts[nx].focus();
    });
    elegir(0);
    main.appendChild(banda('modulo1-ideas', 'Cinco ideas que atraviesan los cuatro talleres', 'Las ideas de fondo', null, h('div', { class: 'ideas' }, lista, panel)));

    /* Juego */
    main.appendChild(banda('modulo1-juego', 'Para repasar', '¿En la época de qué objeto ocurrió?', 'Diez hitos al azar. Ubique cada uno en su época: válvula, chip, PC o teléfono inteligente.',
      h('div', { class: 'cta-row' }, h('a', { class: 'btn primary', href: '#juego' }, icon('juego'), 'Empezar a jugar'))));
  };

  /* ---------- Juego ---------- */
  W.paginaJuego = function (main) {
    var RONDA = 10;
    var OPCION = ['La válvula de vacío', 'El chip', 'La computadora personal', 'El teléfono inteligente'];
    var EPOCA = ['la válvula', 'el chip', 'la computadora personal', 'el teléfono inteligente'];
    var preguntas, i, puntos, respondida;
    var caja = h('div', { class: 'juego' });
    var record = store.get('juego-record', 0);
    function nueva() { preguntas = M.shuffle(MOD.juego).slice(0, RONDA); i = 0; puntos = 0; respondida = false; pintar(); }
    function pintar() {
      M.clear(caja);
      if (i >= preguntas.length) {
        if (puntos > record) { record = puntos; store.set('juego-record', record); }
        var frase = puntos >= 9 ? 'Domina las cuatro épocas.' : puntos >= 6 ? 'Buen sentido del tiempo. Revise los hitos que fallaron.' : 'Vale la pena otra vuelta por los talleres.';
        caja.appendChild(h('div', { class: 'jq jend' },
          h('span', { class: 'eyebrow', style: { color: 'var(--ink-3)' } }, 'Resultado'),
          h('div', { class: 'w-big' }, puntos + ' / ' + RONDA),
          h('p', null, frase),
          h('p', { class: 'w-note-s' }, 'Mejor resultado en este navegador: ' + record + ' / ' + RONDA),
          h('div', { class: 'btnrow', style: { justifyContent: 'center' } }, h('button', { class: 'btn primary', type: 'button', onclick: nueva }, 'Otra ronda'), h('a', { class: 'btn', href: '#modulo1-mapa' }, 'Ver el mapa del módulo'))));
        caja.querySelector('button').focus();
        return;
      }
      var q = preguntas[i];
      var fb = h('div', { class: 'jfb', 'aria-live': 'polite', hidden: true });
      var opts = h('div', { class: 'jopts' });
      M.talleres.forEach(function (t) {
        var b = h('button', { type: 'button', class: 'jopt era-' + t.n, onclick: function () {
          if (respondida) return;
          respondida = true;
          var ok = t.n === q.era;
          if (ok) puntos++;
          Array.prototype.forEach.call(opts.children, function (x, k) { x.disabled = true; if (k + 1 === q.era) x.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          var era = M.talleres[q.era - 1];
          fb.hidden = false;
          fb.className = 'jfb ' + (ok ? 'ok' : 'no');
          M.clear(fb);
          fb.appendChild(h('b', null, (ok ? 'Correcto. ' : 'No exactamente. ') + 'Ocurrió en ' + q.a + ', en la época de ' + EPOCA[q.era - 1] + '.'));
          fb.appendChild(h('p', null, q.n));
          fb.appendChild(h('div', { class: 'btnrow' },
            h('button', { class: 'btn small primary', type: 'button', onclick: function () { i++; respondida = false; pintar(); } }, i + 1 < preguntas.length ? 'Siguiente' : 'Ver resultado', icon('flecha')),
            h('a', { class: 'btn small ghost', href: '#' + era.slug + '-linea' }, 'Ver la línea de tiempo del Taller ' + era.n)));
          fb.querySelector('button').focus();
        } }, M.objeto(t.objeto), OPCION[t.n - 1]);
        opts.appendChild(b);
      });
      caja.appendChild(h('div', { class: 'jq' },
        h('div', { class: 'jprog' }, h('span', null, 'Pregunta ' + (i + 1) + ' de ' + RONDA), h('span', null, 'Aciertos: ' + puntos)),
        h('p', { class: 'jtext' }, q.t),
        h('span', { class: 'w-note-s' }, '¿En la época de qué objeto ocurrió?'),
        opts, fb));
    }
    main.appendChild(h('div', { class: 'wrap' },
      h('header', { class: 'page-head' }, h('span', { class: 'eyebrow', style: { color: 'var(--ink-2)' } }, 'Juego de repaso'), h('h1', null, '¿En la época de qué objeto ocurrió?'),
        h('p', null, 'Diez hitos al azar de los cuatro talleres. Algunos tienen trampa: el transistor nació en la época de la válvula.')),
      caja));
    nueva();
  };
})();
