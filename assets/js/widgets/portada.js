/* Portada del proyecto: los dos módulos, con su progreso y una ruta sugerida. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, icon = M.icon;
  var W = M.widgets = M.widgets || {};

  var CEREBRO_CHIP = '<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M26 12a7 7 0 0 0-11.5 5 7 7 0 0 0-2.5 11.5 7 7 0 0 0 4.5 11 7 7 0 0 0 9.5 5.5z"/>' +
    '<path d="M26 20c-3 0-5 2-5 5M26 32c-4 0-6 2-6 5"/>' +
    '<rect x="34" y="20" width="22" height="22" rx="2"/><rect x="40" y="26" width="10" height="10"/>' +
    '<path d="M39 20v-5M45 20v-5M51 20v-5M39 42v5M45 42v5M51 42v5M34 26h-4M34 36h-4M56 26h4M56 36h4"/></svg>';

  function progreso(talleres, secciones) {
    var visto = M.ui.visto(), n = 0, total = 0;
    talleres.forEach(function (t) {
      var ids = ['ficha'].concat(secciones(t));
      total += ids.length;
      ids.forEach(function (id) { if (visto[t.slug + '-' + id]) n++; });
    });
    return { n: n, total: total };
  }
  function barra(pr) {
    var pct = pr.total ? Math.round(pr.n / pr.total * 100) : 0;
    return h('div', { class: 'mapa-prog' }, h('div', { class: 'bar' }, h('i', { style: { width: pct + '%' } })), h('span', null, pct ? pct + ' % visto' : 'Sin empezar'));
  }

  W.paginaPortada = function (main) {
    var m1 = M.modulo, m2 = M.m2 && M.m2.modulo;
    var pr1 = progreso(M.talleres, function (t) { return t.secciones.map(function (s) { return s.id; }); });
    var pr2 = M.m2 && M.m2.talleres ? progreso(M.m2.talleres, function (t) { return t.secciones.map(function (s) { return s.id; }); }) : { n: 0, total: 0 };

    main.appendChild(h('section', { class: 'hero' }, h('div', { class: 'wrap' },
      h('div', { class: 'stack', style: { gap: '16px', maxWidth: '60rem' } },
        h('span', { class: 'eyebrow', style: { color: 'var(--ink-2)' } }, 'Proyecto educativo · Computación e inteligencia artificial'),
        h('h1', { class: 'hero-title' }, 'El futuro tiene historia', h('span', { class: 'yrs' }, 'Dos módulos para entender las máquinas que calculan, de dónde vienen y cuánto se parecen a un cerebro')),
        p('Para personas de 18 a 60 años sin formación técnica. Cada módulo se puede recorrer por separado; cada taller explica sus herramientas antes de usarlas y deja lo más técnico en desplegables para quien quiera profundizar.', { class: 'hero-sub' })))));

    var tarjetas = h('div', { class: 'portada-mods' },
      h('a', { class: 'pmod m1', href: '#modulo1' },
        h('div', { class: 'pmod-top' },
          h('div', null, h('span', { class: 'pm-n' }, 'Módulo 1 · ' + m1.anios), h('h2', null, m1.titulo), h('p', { class: 'pm-sub' }, m1.subtitulo)),
          M.objeto('chip')),
        h('div', { class: 'pmod-b' },
          p('La historia: de la máquina imaginaria de Turing en 1936 a la IA generativa de 2026, en cuatro épocas con un objeto-símbolo cada una.'),
          h('ul', null, h('li', null, '4 talleres, unas 3 horas cada uno'), h('li', null, 'Línea de tiempo, laboratorios y juego final'), h('li', null, 'Una mirada desde América Latina y Colombia'))),
        h('div', { class: 'pmod-f' }, barra(pr1), h('span', { class: 'btn primary small' }, 'Entrar al módulo 1', icon('flecha')))),
      m2 ? h('a', { class: 'pmod m2', href: '#modulo2' },
        h('div', { class: 'pmod-top' },
          h('div', null, h('span', { class: 'pm-n' }, 'Módulo 2 · ' + m2.sub), h('h2', null, m2.titulo), h('p', { class: 'pm-sub' }, 'Cerebro y cómputo en potencias de diez')),
          M.svgFrom(CEREBRO_CHIP)),
        h('div', { class: 'pmod-b' },
          p('La comparación: tu cerebro funciona con unos 20 vatios; los centros de datos de IA, con gigavatios. Qué separa a unos de otros y qué puede aprender cada uno del otro.'),
          h('ul', null, h('li', null, '10 talleres de 60 a 120 minutos'), h('li', null, 'Lecciones con actividad, error frecuente y pregunta de repaso'), h('li', null, 'Fichas para saber de dónde sale cada cifra'))),
        h('div', { class: 'pmod-f' }, barra(pr2), h('span', { class: 'btn primary small' }, 'Entrar al módulo 2', icon('flecha')))) : null);

    main.appendChild(h('section', { class: 'band', id: 'inicio-modulos' }, h('div', { class: 'wrap' },
      h('header', { class: 'band-head' }, h('span', { class: 'eyebrow' }, 'Los módulos'), h('h2', null, 'Elige por dónde empezar')),
      tarjetas)));

    main.appendChild(h('section', { class: 'band', id: 'inicio-ruta' }, h('div', { class: 'wrap' },
      h('header', { class: 'band-head' }, h('span', { class: 'eyebrow' }, 'Una ruta posible'), h('h2', null, 'Primero la historia, después la comparación'),
        p('Los módulos no dependen uno del otro, pero se complementan: el primero cuenta cómo llegaron las máquinas a donde están; el segundo enseña a medirlas sin mezclar unidades.')),
      h('div', { class: 'portada-ruta' },
        h('div', null, icon('reloj'), h('b', null, 'Si tienes una tarde'), p('Un taller del módulo 1 (unas 3 horas), o los talleres 1 a 3 del módulo 2 por tu cuenta (unas dos horas): números grandes, unidades y las cuatro reglas para comparar.')),
        h('div', null, icon('cerebro'), h('b', null, 'Si te interesa el cerebro'), p('Del módulo 2, los talleres 1 a 3 como base y después los talleres 4 y 5: de la sinapsis al encéfalo completo.')),
        h('div', null, icon('rayo'), h('b', null, 'Si te interesa la IA de hoy'), p('El taller 4 del módulo 1 y, del módulo 2, los talleres 1 a 3 como base y después los talleres 7 y 8: centros de datos, eficiencia y entrenamiento de modelos (el 8 usa la convención de la lección I.7, en el taller 5).'))))));
  };
})();
