/* =====================================================================
   app-m2.js — páginas del módulo 2: portada, diez talleres, glosario y fuentes
   Cada lección muestra lo esencial a la vista (pregunta, idea sencilla,
   vida diaria, imagen, actividad, error frecuente, comprobación e idea
   clave) y guarda lo técnico en desplegables: ejemplo resuelto paso a paso,
   lenguaje científico, fichas de evidencia y profundización.
   ===================================================================== */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, icon = M.icon, store = M.store;
  var m2 = M.m2, ui = M.ui;
  if (!m2 || !m2.talleres) return;

  m2.talleres.sort(function (a, b) { return a.n - b.n; });
  M.indexRefs('m2', m2.referencias, 'm2ref-');
  /* Alias de citas: formas del texto que remiten a una misma referencia */
  var ALIAS = m2.aliasRefs || {};
  Object.keys(ALIAS).forEach(function (k) {
    var r = M.refIndices.m2.get(M.normKey(ALIAS[k]));
    if (r) M.refIndices.m2.set(M.normKey(k), r);
  });

  M.modulos.m2 = {
    id: 'm2', home: 'modulo2', corto: 'Módulo 2',
    titulo: m2.modulo.titulo, sub: m2.modulo.sub,
    esPagina: function (pg) { return pg === 'modulo2' || pg === 'm2glosario' || pg === 'm2fuentes' || /^m2t\d+$/.test(pg); },
    nav: function (nav) {
      nav.appendChild(h('a', { href: '#modulo2', dataset: { page: 'modulo2' } }, 'Módulo 2'));
      m2.talleres.forEach(function (t) {
        nav.appendChild(h('a', { href: '#' + t.slug, class: 'm2n m2e-' + t.etapa, dataset: { page: t.slug }, title: 'Taller ' + t.n + ': ' + t.titulo, 'aria-label': 'Taller ' + t.n + ': ' + t.titulo }, h('span', { class: 'n' }, t.n)));
      });
      nav.appendChild(h('a', { href: '#m2glosario', dataset: { page: 'm2glosario' } }, 'Glosario'));
      nav.appendChild(h('a', { href: '#m2fuentes', dataset: { page: 'm2fuentes' } }, 'Fuentes'));
    },
    glosarioRapido: function () { return m2.glosario.map(function (g) { return { t: g.termino, d: g.sencillo }; }); },
    glosarioHref: '#m2glosario',
    pie: function () { return m2.modulo.verificacion; }
  };

  var bloques = m2.bloques, desp = m2.desplegable;
  function abiertos() { return M.prefs && M.prefs.desp === 'abiertos'; }

  /* ---------- Renderizadores de secciones ---------- */
  var R = {};
  var ICONOS = { leccion: 'conceptos', nivel: 'capas', dato: 'lupa', figura: 'grafico', texto: 'prologo', ideas: 'idea', trampas: 'mitos', reto: 'juego', cierre: 'cierre' };

  function kickerDe(s) {
    if (s.tipo === 'leccion') return 'Lección ' + s.codigo + (s.min ? ' · ≈ ' + s.min + ' min' : '') + (s.opcional ? ' · opcional' : '');
    if (s.tipo === 'nivel') return 'Nivel ' + s.n + ' de 9 · ' + (s.n <= 4 ? 'Cerebro' : 'Silicio');
    if (s.tipo === 'dato') return 'Cifra ancla';
    if (s.tipo === 'figura') return 'Figura interactiva';
    if (s.tipo === 'cierre') return 'Actividad para el grupo';
    return s.kicker || s.nav || '';
  }

  function imagen(s) {
    var im = s.imagen;
    if (!im) return null;
    var svg = im.svg && m2.analogias[im.svg] ? M.svgFrom(m2.analogias[im.svg]) : null;
    if (svg) { svg.setAttribute('class', 'an-svg'); svg.setAttribute('focusable', 'false'); }
    return h('figure', { class: 'lec-img' },
      h('span', { class: 'lec-k' }, icon('idea'), 'Una imagen para pensarlo'),
      svg ? h('div', { class: 'lec-img-svg' }, svg) : null,
      im.widget ? M.montar(im.widget, { s: s }) : null,
      im.pie ? h('figcaption', null, rich(im.pie)) : null,
      h('div', { class: 'lec-lim' },
        im.si ? h('p', { class: 'si' }, h('b', null, 'Lo que sí representa'), rich(im.si)) : null,
        im.no ? h('p', { class: 'no' }, h('b', null, 'Dónde deja de valer'), rich(im.no)) : null));
  }
  function ejemplo(e) {
    return desp('Ejemplo resuelto, paso a paso', e.enunciado, h('ol', { class: 'pasos' }, e.pasos.map(function (ps) {
      var t = ps[0].replace(/\*\*/g, '');
      var calc = /cálculo/i.test(t);
      return h('li', null, h('b', null, t), h('div', { class: calc ? 'calc' : null }, rich(ps[1])));
    })), 'paso');
  }
  function actividad(s, t) {
    var nombre = 'm2.' + s.actividad;
    if (!M.widgets[nombre]) return h('p', { class: 'w-note-s' }, 'Actividad interactiva en preparación.');
    return h('div', { class: 'lec-act' }, M.montar(nombre, { t: t, s: s }));
  }
  function marcarSiQuiz(secId) {
    var b = document.querySelector('#' + secId + ' .seg-foot .visto');
    if (b && b.getAttribute('aria-pressed') !== 'true') b.click();
  }
  R.leccion = function (s, t) {
    var secId = t.slug + '-' + s.id;
    var cuerpo = [];
    cuerpo.push(h('p', { class: 'lec-q' }, rich(s.pregunta)));
    var vida = s.vida && s.vida.length ? h('aside', { class: 'lec-vida' }, h('span', { class: 'lec-k' }, icon('casa'), 'En tu vida diaria'), bloques(s.vida)) : null;
    cuerpo.push(h('div', { class: 'lec-cols' }, h('div', { class: 'lec-texto' }, h('div', { class: 'prose' }, bloques(s.sencillo)), vida), imagen(s)));
    if (s.ejemplo) cuerpo.push(ejemplo(s.ejemplo));
    var prueba = h('section', { class: 'lec-prueba' }, h('span', { class: 'lec-k' }, icon('lab'), 'Compruébalo tú'),
      m2.prediccion(s.prediccion),
      s.actividad ? actividad(s, t) : null,
      s.nota_actividad && s.nota_actividad.length ? bloques(s.nota_actividad).map(function (x) { if (x) x.classList.add('w-note-s'); return x; }) : null,
      s.descubrir && s.descubrir.length ? h('div', { class: 'lec-desc' }, h('b', null, '¿Qué acabas de descubrir?'), bloques(s.descubrir)) : null);
    cuerpo.push(prueba);
    var err = s.error ? h('div', { class: 'lec-error' },
      h('span', { class: 'lec-k' }, icon('error'), 'Un error frecuente'),
      h('p', { class: 'mal' }, h('b', null, '✗ La confusión'), rich(s.error.mal)),
      h('p', { class: 'bien' }, h('b', null, '✓ Cómo evitarla'), rich(s.error.bien))) : null;
    var qz = s.quiz ? h('div', { class: 'lec-quiz' }, h('span', { class: 'lec-k' }, icon('check'), 'Comprueba lo que sabes'), m2.quiz(s.quiz, s.id, function () { marcarSiQuiz(secId); })) : null;
    cuerpo.push(h('div', { class: 'lec-repaso' }, err, qz));
    if (s.clave) {
      cuerpo.push(h('div', { class: 'lec-clave' }, h('span', { class: 'lec-k' }, icon('llave'), 'Si solo recuerdas una cosa…'),
        h('p', { class: 'clave' }, rich(s.clave.sencillo)),
        s.clave.cientifico ? desp('En lenguaje científico', null, p(s.clave.cientifico), 'cient') : null));
    }
    if (s.profundiza && s.profundiza.length) cuerpo.push(desp('Para profundizar', s.profundizaSub || 'datos, métodos y fuentes', bloques(s.profundiza), 'prof'));
    if (s.evidencias) s.evidencias.forEach(function (ev) { cuerpo.push(m2.evidencia(ev)); });
    var dim = s.dim && m2.dimensiones[s.dim] ? h('span', { class: 'dimchip d-' + s.dim, title: m2.dimensiones[s.dim].p }, m2.dimensiones[s.dim].n) : null;
    var art = h('div', { class: 'lec lec-d-' + (s.dim || 'ink') }, dim ? h('div', { class: 'lec-meta' }, dim) : null, cuerpo);
    if (s.opcional) {
      return [p(s.opcionalNota || 'Esta lección es más técnica. Puedes saltarla sin perder el hilo del taller o abrirla para profundizar.', { class: 'w-note' }),
        desp('Abrir la lección completa', s.pregunta, art, 'prof')];
    }
    return art;
  };

  R.nivel = function (s) {
    var esc = h('ol', { class: 'escalera', 'aria-label': 'Los nueve niveles del recorrido' }, m2.niveles.map(function (nm, i) {
      return h('li', { class: (i < 4 ? 'bio' : 'sil') + (i + 1 === s.n ? ' on' : ''), 'aria-current': i + 1 === s.n ? 'step' : null }, h('span', { class: 'esc-n' }, i + 1), h('span', { class: 'esc-t' }, nm));
    }));
    return h('div', { class: 'nivel ' + (s.n <= 4 ? 'bio' : 'sil') },
      esc,
      s.puente ? p(s.puente, { class: 'nv-puente' }) : null,
      s.lead ? p(s.lead, { class: 'nv-lead' }) : null,
      s.texto ? h('div', { class: 'prose' }, bloques(s.texto)) : null,
      m2.ancla(s.ancla),
      s.widget && M.widgets[s.widget] ? h('div', { class: 'fig-box nv-anim' }, M.montar(s.widget, { s: s })) : null,
      s.escena ? escena(s.escena) : null,
      s.evidencia ? m2.evidencia(s.evidencia) : null,
      (s.desplegables || []).map(function (d) { return desp(d.titulo, d.subtitulo, bloques(d.bloques), d.tipo === 'lay3' ? 'prof' : 'porque'); }));
  };
  /* Descripción de la animación de un nivel: qué se ve y qué representa */
  function escena(e) {
    var t = (e.titulo || 'Qué ves en la animación').split(' · ');
    var cuerpo = [];
    if (e.pares && e.pares.length) cuerpo.push(h('dl', { class: 'guia-dl' }, e.pares.map(function (pr) { return h('div', { class: 'guia-f' }, h('dt', null, rich(pr[0])), h('dd', null, rich(pr[1]))); })));
    cuerpo.push(bloques(e.texto));
    return desp(t[0], t.slice(1).join(' · ') || null, cuerpo, 'escena');
  }

  R.dato = function (s) {
    var ev = m2.evidencias[s.evidencia] || {};
    return h('div', { class: 'dato' },
      s.texto ? h('div', { class: 'prose' }, bloques(s.texto)) : null,
      m2.ancla(ev.ancla),
      m2.evidencia(s.evidencia));
  };

  R.figura = function (s, t) {
    var guia = s.guia && s.guia.pares && s.guia.pares.length ? desp('Explícame esta gráfica desde cero', 'qué muestra, cómo se lee y qué no dice',
      h('dl', { class: 'guia-dl' }, s.guia.pares.map(function (pr) {
        var k = /no permite/i.test(pr[0]) ? ' no' : (/permite concluir/i.test(pr[0]) ? ' si' : '');
        return h('div', { class: 'guia-f' + k }, h('dt', null, pr[0]), h('dd', null, rich(pr[1])));
      })), 'guia') : null;
    return h('div', { class: 'm2fig' },
      s.sub ? p(s.sub, { class: 'seg-desc' }) : null,
      s.texto ? h('div', { class: 'prose' }, bloques(s.texto)) : null,
      s.widget && M.widgets[s.widget] ? h('div', { class: 'fig-box' }, M.montar(s.widget, { t: t, s: s })) : null,
      (s.notas || []).map(function (n) { return p(n, { class: 'w-note' }); }),
      guia,
      s.datos ? desp('Ver los datos', s.datos.titulo || null, bloques([s.datos]), 'datos') : null,
      (s.desplegables || []).map(function (d) { return desp(d.titulo, d.subtitulo, bloques(d.bloques), d.tipo === 'lay3' ? 'prof' : 'porque'); }),
      s.fuente ? h('p', { class: 'src' }, rich(s.fuente)) : null);
  };

  R.texto = function (s, t) {
    return h('div', { class: 'm2texto' },
      h('div', { class: 'prose' }, bloques(s.bloques)),
      s.widget ? M.montar(s.widget, { t: t, s: s }) : null,
      (s.desplegables || []).map(function (d) { return desp(d.titulo, d.subtitulo, bloques(d.bloques), d.clase || 'prof'); }));
  };

  R.ideas = function (s, t) {
    return [s.intro ? p(s.intro, { class: 'seg-desc' }) : null,
      h('div', { class: 'ideas7' }, s.items.map(function (it) {
        return h('article', { class: 'idea7' }, h('span', { class: 'i7-r' }, it.rotulo), h('h3', null, rich(it.titulo)),
          (it.textos || []).filter(function (x) { return !/^(\[[a-z]+\]\s*)+$/.test(x); }).map(function (x) { return p(x); }),
          h('div', { class: 'i7-m' }, (it.marcas || []).map(m2.marca)),
          it.sencillo ? p(it.sencillo, { class: 'i7-s' }) : null);
      })),
      s.sencillas && s.sencillas.length ? desp('Las siete ideas, en palabras sencillas', null, bloques(s.sencillas), 'porque', true) : null,
      s.actividad && M.widgets['m2.' + s.actividad] ? h('div', { class: 'lec-prueba' }, h('span', { class: 'lec-k' }, icon('lab'), 'Explícalo con tus palabras'), M.montar('m2.' + s.actividad, { t: t, s: s })) : null];
  };

  R.trampas = function (s) {
    return [s.intro ? p(s.intro, { class: 'seg-desc' }) : null,
      p('Laboratorio de errores: en cada trampa encontrarás una afirmación engañosa. Elige la mejor explicación y compárala con la retroalimentación.', { class: 'w-note' }),
      h('ol', { class: 'trampas' }, s.items.map(function (it, i) {
        return h('li', { class: 'trampa', id: 'trampa-' + (i + 1) },
          h('div', { class: 'tr-h' }, h('span', { class: 'tr-n' }, i + 1), h('div', null, h('h3', null, rich(it.titulo)), p(it.texto), it.donde ? h('span', { class: 'chip tr-donde' }, rich(it.donde)) : null)),
          it.quiz ? m2.quiz(it.quiz, 'm2-' + it.id) : null,
          it.explicacion ? p(it.explicacion, { class: 'w-note-s' }) : null);
      }))];
  };

  R.reto = function (s) {
    var hechos = h('p', { class: 'w-note', 'aria-live': 'polite' });
    function cuenta() { var n = s.preguntas.filter(function (q, i) { return m2.quizHecho('m2-reto-' + i); }).length; hechos.textContent = n + ' de ' + s.preguntas.length + ' preguntas superadas.'; }
    var lista = h('ol', { class: 'reto' }, s.preguntas.map(function (q, i) { return h('li', null, m2.quiz(q, 'm2-reto-' + i, cuenta)); }));
    cuenta();
    return [s.intro ? p(s.intro, { class: 'seg-desc' }) : null, hechos, lista];
  };

  R.cierre = function (s, t) {
    return (s.actividades || []).map(function (a) {
      return h('article', { class: 'actividad' },
        h('div', { class: 'act-h' },
          h('div', null, h('span', { class: 'eyebrow' }, a.min ? 'Actividad · ' + a.min + ' min' : 'Actividad'), h('h3', null, rich(a.t)), h('div', { class: 'prose' }, bloques([].concat(a.d)))),
          ui.temporizador(a.min)),
        a.pasos ? h('ol', { class: 'pasos act-pasos' }, a.pasos.map(function (x) { return h('li', null, h('div', null, rich(x))); })) : null,
        a.widget && M.widgets[a.widget] ? M.montar(a.widget, { t: t, s: s }) : null,
        a.nota ? (Array.isArray(a.nota) ? h('div', { class: 'w-note-s act-nota' }, bloques(a.nota)) : p(a.nota, { class: 'w-note-s' })) : null,
        a.respuestas ? desp('Respuestas, para corregir al final', 'para quien facilita la actividad', bloques([].concat(a.respuestas)), 'paso') : null);
    });
  };

  /* ---------- Ficha del taller ---------- */
  function ficha(t) {
    var guard = store.get('obj-' + t.slug, []);
    var lista = h('ol', { class: 'obj-list' });
    (t.objetivos || []).forEach(function (o, i) {
      var cb = h('input', { type: 'checkbox', id: t.slug + '-obj-' + i, checked: !!guard[i] });
      cb.addEventListener('change', function () { guard[i] = cb.checked; store.set('obj-' + t.slug, guard); });
      lista.appendChild(h('li', null, h('label', { for: t.slug + '-obj-' + i }, cb, h('span', { class: 'ol' }, String.fromCharCode(97 + i) + '.'), h('span', null, rich(o)))));
    });
    var lecs = t.secciones.filter(function (s) { return s.tipo === 'leccion'; });
    var min = m2.minutos(t);
    var hayPaso = t.secciones.some(function (s) { return !!s.ejemplo; });
    var hayProf = t.secciones.some(function (s) { return (s.profundiza && s.profundiza.length) || s.evidencia || (s.evidencias && s.evidencias.length) || (s.desplegables || []).length || (s.guia && s.guia.pares); });
    return h('div', { class: 'ficha' },
      h('div', { class: 'ficha-a' },
        h('dl', null,
          h('div', null, h('dt', null, 'Etapa'), h('dd', null, m2.etapas[t.etapa].n)),
          h('div', null, h('dt', null, 'Pregunta guía'), h('dd', { class: 'ficha-preg' }, rich(t.pregunta))),
          h('div', null, h('dt', null, 'Duración'), h('dd', null, '≈ ' + min + ' min de lectura y actividades; en grupo, una sesión de ' + (min > 70 ? '90 a 120' : '60 a 90') + ' minutos')),
          lecs.length ? h('div', null, h('dt', null, 'Lecciones'), h('dd', null, lecs.map(function (l) { return l.codigo; }).join(' · '))) : null,
          t.prerequisitos && t.prerequisitos.length ? h('div', null, h('dt', null, 'Conviene haber visto'), h('dd', null, bloques(t.prerequisitos))) : null)),
      h('div', { class: 'ficha-b' },
        h('h3', null, 'Al terminar podrás…'),
        h('p', { class: 'small muted' }, 'Marca cada objetivo cuando sientas que lo lograste.'),
        lista,
        h('div', { class: 'niveles-lect' },
          h('span', { class: 'nl' }, icon('ojo'), h('b', null, 'A la vista'), ' lo esencial'),
          hayPaso ? h('span', { class: 'nl' }, icon('lista'), h('b', null, 'Paso a paso'), ' ejemplos resueltos') : null,
          hayProf ? h('span', { class: 'nl' }, icon('lupa'), h('b', null, 'Para profundizar'), ' datos, métodos y fuentes') : null)));
  }

  /* ---------- Página de taller ---------- */
  function paginaTaller(t) {
    var main = ui.main();
    main.className = 'm2 m2e-' + t.etapa;
    var hero = h('section', { class: 'era-hero m2-hero' },
      h('div', { class: 'wrap' },
        h('div', null,
          h('div', { class: 'era-num' }, h('b', null, 'Taller ' + t.n + ' de ' + m2.talleres.length), h('span', null, m2.etapas[t.etapa].n)),
          h('h1', null, rich(t.titulo)),
          h('p', { class: 'lede' }, rich(t.intro)),
          h('div', { class: 'pregunta' }, h('small', null, 'Pregunta guía'), rich(t.pregunta))),
        h('div', { class: 'm2-emblema', 'aria-hidden': 'true' }, h('span', null, t.emblema), h('small', null, 'Taller ' + t.n))));
    var secs = [{ id: 'ficha', tipo: 'ficha', nav: 'Antes de empezar', titulo: 'Antes de empezar' }].concat(t.secciones);
    var indice = h('ol');
    secs.forEach(function (s) {
      var id = t.slug + '-' + s.id;
      indice.appendChild(h('li', null, h('a', { href: '#' + id, dataset: { id: id }, class: 'ix-' + s.tipo }, icon(s.tipo === 'ficha' ? 'ficha' : (ICONOS[s.tipo] || 'idea')), h('span', null, s.nav), h('span', { class: 'ok', 'aria-label': 'visto' }, icon('check')))));
    });
    var prog = h('div', { class: 'indice-prog' }, h('span', { class: 'pt' }), h('div', { class: 'bar' }, h('i')));
    var abrirTodo = h('button', { type: 'button', class: 'btn small ghost', onclick: function () {
      var cerrados = cuerpo.querySelectorAll('details.dsp:not([open])');
      var todos = cuerpo.querySelectorAll('details.dsp');
      var abrir = cerrados.length > 0;
      Array.prototype.forEach.call(todos, function (d) { d.open = abrir; });
      abrirTodo.textContent = abrir ? 'Plegar los desplegables' : 'Abrir los desplegables';
    } }, abiertos() ? 'Plegar los desplegables' : 'Abrir los desplegables');
    var aside = h('nav', { class: 'indice', 'aria-label': 'Secciones del taller' }, h('div', { class: 'indice-t' }, 'En este taller'), indice, prog, h('div', { class: 'indice-acc' }, abrirTodo));
    var cuerpo = h('div', { class: 'taller-main' });
    secs.forEach(function (s) {
      var body = s.tipo === 'ficha' ? ficha(t) : (R[s.tipo] ? R[s.tipo](s, t) : null);
      var vista = Object.assign({}, s, { tipo: 'm2-' + s.tipo, nav: kickerDe(s), icon: s.tipo === 'ficha' ? 'ficha' : (ICONOS[s.tipo] || 'idea'), desc: s.tipo === 'figura' ? null : s.desc });
      if (s.tipo === 'ficha') vista.nav = 'Ficha del taller';
      cuerpo.appendChild(ui.seccion(t, vista, body));
    });
    var prev = m2.talleres[t.n - 2], next = m2.talleres[t.n];
    cuerpo.appendChild(h('nav', { class: 'pager', 'aria-label': 'Otros talleres' },
      prev ? h('a', { href: '#' + prev.slug }, h('small', null, '← Taller ' + prev.n), h('b', null, rich(prev.titulo))) : h('a', { href: '#modulo2' }, h('small', null, '← Módulo 2'), h('b', null, 'Presentación del módulo')),
      next ? h('a', { class: 'next', href: '#' + next.slug }, h('small', null, 'Taller ' + next.n + ' →'), h('b', null, rich(next.titulo))) : h('a', { class: 'next', href: '#m2fuentes' }, h('small', null, 'Para terminar →'), h('b', null, 'Fuentes y método'))));
    main.appendChild(hero);
    main.appendChild(h('div', { class: 'wrap' }, h('div', { class: 'taller-layout' }, aside, cuerpo)));
    ui.actualizarIndice();
    ui.espiar();
    M.paginaTitulo = 'Taller ' + t.n + ': ' + t.titulo + ' · ' + m2.modulo.titulo;
  }
  m2.talleres.forEach(function (t) { M.paginas[t.slug] = function () { paginaTaller(t); }; });

  /* ---------- Portada del módulo ---------- */
  function reglaPotencia() {
    /* De 10 W a 1 GW en escala logarítmica, con tres cifras ancla del recorrido.
       Regla en HTML para que los rótulos se lean igual en un teléfono que en una pantalla grande. */
    function pos(w) { return (Math.log10(w) - 1) / 8 * 100; }
    var et = ['10 W', '100 W', '1 kW', '10 kW', '100 kW', '1 MW', '10 MW', '100 MW', '1 GW'];
    var anclas = [[20, 'Tu encéfalo', '20 W', 'bio', 'estimado'], [24.607e6, 'Supercomputadora Frontier', '24,6 MW', 'sil', 'medido'], [946e6, 'Mayor campus de IA rastreado', '946 MW', 'enc', 'estimado']];
    var pista = h('div', { class: 'pwr-pista', role: 'img', 'aria-label': 'Regla logarítmica de potencia, de 10 vatios a mil millones de vatios: encéfalo 20 W, supercomputadora Frontier 24,6 MW y el mayor campus de IA rastreado, 946 MW' },
      h('div', { class: 'pwr-eje' }),
      et.map(function (e, i) { return h('span', { class: 'pwr-t', style: { left: (i / 8 * 100) + '%' } }, h('i'), h('b', null, e)); }),
      anclas.map(function (m, i) { return h('span', { class: 'pwr-m pw-' + m[3], style: { left: pos(m[0]) + '%' } }, String(i + 1)); }));
    return h('div', { class: 'ruler m2-ruler' },
      h('span', { class: 'eyebrow' }, 'Potencia, en potencias de diez'),
      pista,
      h('ol', { class: 'pwr-ley' }, anclas.map(function (m, i) {
        return h('li', { class: 'pw-' + m[3] }, h('span', { class: 'pwr-n' }, String(i + 1)), h('span', null, m[1] + ' · ', h('b', null, m[2])), m2.marca(m[4]));
      })),
      h('p', { class: 'w-note-s' }, 'Cada marca de la regla multiplica por diez la anterior. Entre tu encéfalo y el mayor campus de IA hay casi ocho órdenes de magnitud de potencia. Pero potencia no es eficiencia, ni inteligencia: de eso tratan los diez talleres.'));
  }
  function progresoTaller(t) {
    var v = ui.visto();
    var ids = ['ficha'].concat(t.secciones.map(function (s) { return s.id; }));
    var n = ids.filter(function (id) { return v[t.slug + '-' + id]; }).length;
    return { n: n, total: ids.length };
  }
  M.paginas.modulo2 = function () {
    var main = ui.main();
    main.className = 'm2 m2-portada';
    var mod = m2.modulo;
    main.appendChild(h('section', { class: 'hero' }, h('div', { class: 'wrap' }, h('div', { class: 'hero-grid' },
      h('div', { class: 'stack', style: { gap: '18px' } },
        h('span', { class: 'eyebrow', style: { color: 'var(--ink-2)' } }, 'Módulo 2 · ' + mod.sub),
        h('h1', { class: 'hero-title' }, mod.titulo, h('span', { class: 'yrs' }, 'Diez talleres para comparar el cerebro y las máquinas sin mezclar unidades')),
        h('p', { class: 'hero-sub' }, mod.lede),
        h('div', { class: 'hero-facts' }, ['10 talleres', '40 lecciones con actividad', 'Sin conocimientos previos'].map(function (d) { return h('span', { class: 'chip' }, d); })),
        h('div', { class: 'cta-row' },
          h('a', { class: 'btn primary', href: '#m2t1' }, 'Empezar por el Taller 1', icon('flecha')),
          h('a', { class: 'btn', href: '#modulo2-mapa' }, icon('capas'), 'Ver los diez talleres'))),
      reglaPotencia()))));
    function banda(id, eb, tit, intro, cuerpo) {
      return h('section', { class: 'band', id: id }, h('div', { class: 'wrap' }, h('header', { class: 'band-head' }, h('span', { class: 'eyebrow' }, eb), h('h2', null, tit), intro ? p(intro) : null), cuerpo));
    }
    main.appendChild(banda('modulo2-presentacion', 'Antes de empezar', 'Qué vas a aprender y qué necesitas', null,
      h('div', { class: 'm2-pres' },
        h('div', { class: 'prose' }, mod.presentacion.map(function (x) { return p(x); })),
        h('div', { class: 'm2-cards' },
          h('div', { class: 'm2-card' }, h('span', { class: 'eyebrow' }, 'Qué vas a aprender'), h('ul', { class: 'm2-lista' }, mod.aprenderas.map(function (x) { return h('li', null, rich(x)); }))),
          h('div', { class: 'm2-card' }, h('span', { class: 'eyebrow' }, 'Qué necesitas saber antes'), h('p', { class: 'm2-big' }, 'Nada.'), p(mod.necesitas))))));
    main.appendChild(banda('modulo2-como', 'Cómo leer este módulo', 'Lo esencial a la vista; lo técnico, a un toque', 'Cada lección sigue los mismos pasos. A la vista queda lo que necesitas para entender la idea; los detalles técnicos esperan en desplegables, para quien quiera profundizar. Puedes abrirlos todos desde los ajustes de lectura.',
      h('div', { class: 'm2-como' },
        h('div', { class: 'm2-niveles' },
          h('div', { class: 'm2-niv' }, icon('ojo'), h('b', null, 'A la vista'), p('La pregunta, la idea en palabras sencillas, un ejemplo de tu vida diaria, una imagen, una actividad para probar, el error frecuente, una pregunta de repaso y la idea clave.')),
          h('div', { class: 'm2-niv' }, icon('lista'), h('b', null, 'Paso a paso'), p('El ejemplo resuelto: datos, unidades, operación, cálculo, resultado y qué quiere decir.')),
          h('div', { class: 'm2-niv' }, icon('lupa'), h('b', null, 'Para profundizar'), p('El lenguaje científico, los métodos, los supuestos, la incertidumbre y las fichas «¿De dónde sale este dato?».'))),
        h('div', { class: 'm2-leyendas' },
          h('div', { class: 'm2-card' }, h('span', { class: 'eyebrow' }, 'Cuatro reglas para medir'), h('ul', { class: 'dims' }, Object.keys(m2.dimensiones).map(function (k) { var d = m2.dimensiones[k]; return h('li', null, h('span', { class: 'dimchip d-' + k }, d.n), h('span', null, d.p + ' ', h('small', null, d.u))); }))),
          h('div', { class: 'm2-card' }, h('span', { class: 'eyebrow' }, 'Cinco tipos de cifra'), h('ul', { class: 'marcas-ley' }, m2.marcas.map(function (m) { return h('li', null, m2.marca(m.k), h('span', null, m.d)); })))),
        p('Las palabras técnicas, como {{orden de magnitud|g-orden}}, aparecen subrayadas con puntos: tócalas para leer su definición sencilla sin salir de la página.', { class: 'w-note' }))));
    var grupos = {};
    m2.talleres.forEach(function (t) { (grupos[t.etapa] = grupos[t.etapa] || []).push(t); });
    var mapa = h('div', { class: 'm2-mapa' }, Object.keys(m2.etapas).filter(function (k) { return grupos[k]; }).map(function (k) {
      return h('div', { class: 'm2-etapa m2e-' + k + ' n' + grupos[k].length }, h('div', { class: 'm2-etapa-h' }, h('b', null, m2.etapas[k].n), h('span', null, m2.etapas[k].d)),
        h('div', { class: 'm2-etapa-t' }, grupos[k].map(function (t) {
          var pr = progresoTaller(t);
          var lecs = t.secciones.filter(function (s) { return s.tipo === 'leccion'; }).length;
          return h('a', { class: 'm2-tcard', href: '#' + t.slug },
            h('div', { class: 'tc-top' }, h('span', { class: 'tc-n' }, t.n), h('span', { class: 'tc-em', 'aria-hidden': 'true' }, t.emblema)),
            h('h3', null, rich(t.titulo)),
            h('p', { class: 'tc-q' }, rich(t.pregunta)),
            h('div', { class: 'tc-meta' }, h('span', null, '≈ ' + m2.minutos(t) + ' min'), lecs ? h('span', null, lecs + (lecs === 1 ? ' lección' : ' lecciones')) : null),
            h('div', { class: 'mapa-prog' }, h('div', { class: 'bar' }, h('i', { style: { width: (pr.n / pr.total * 100) + '%' } })), h('span', null, pr.n + '/' + pr.total)));
        })));
    }));
    main.appendChild(banda('modulo2-mapa', 'Mapa del módulo', 'Diez talleres en seis etapas', 'Los dos primeros talleres preparan las herramientas; el tercero presenta las cuatro reglas para medir. Después, el cerebro (talleres 4 y 5), el silicio (6 y 7), su encuentro (8 y 9) y un cierre para no caer en las trampas más comunes.', mapa));
    main.appendChild(banda('modulo2-mas', 'Para consultar', 'Glosario y fuentes', null, h('div', { class: 'cta-row' },
      h('a', { class: 'btn', href: '#m2glosario' }, icon('libro'), 'Glosario: ' + m2.glosario.length + ' términos'),
      h('a', { class: 'btn', href: '#m2fuentes' }, icon('lupa'), 'Fuentes y método: ' + m2.referencias.length + ' referencias'))));
  };

  /* ---------- Glosario ---------- */
  M.paginas.m2glosario = function () {
    var main = ui.main();
    main.className = 'm2';
    var q = '', tema = '';
    var grid = h('div', { class: 'glosario m2-glos' });
    var items = m2.glosario.slice().sort(function (a, b) { return a.termino.localeCompare(b.termino, 'es'); }).map(function (g) {
      var mas = [g.preciso ? h('p', null, h('b', null, 'Definición precisa. '), rich(g.preciso)) : null,
        g.ejemplo ? h('p', null, h('b', null, 'Ejemplo. '), rich(g.ejemplo)) : null,
        (g.enlaces || []).length ? null : (g.mas ? h('p', { class: 'w-note-s' }, 'Explicación completa: ' + g.mas) : null)];
      var lecs = (g.enlaces || []).length ? h('p', { class: 'g-lecs' }, h('b', null, 'Se explica en: '), g.enlaces.map(function (e, i) { return [i ? ' · ' : '', h('a', { href: e[1] }, e[0])]; })) : null;
      var el = h('article', { class: 'term', id: 'm2glosario-' + g.id }, h('h3', null, g.termino, g.nueva ? h('span', { class: 'g-nueva', title: 'Entrada añadida en la edición didáctica' }, 'nueva') : null), p(g.sencillo),
        (g.preciso || g.ejemplo) ? desp('Definición precisa y ejemplo', null, mas, 'cient') : null,
        lecs,
        g.tema && m2.temasGlosario[g.tema] ? h('span', { class: 'chip' }, m2.temasGlosario[g.tema]) : null);
      grid.appendChild(el);
      return { el: el, g: g };
    });
    var cuenta = h('span', { class: 'w-note-s', 'aria-live': 'polite' });
    var botones = [];
    function filtrar() {
      var n = 0;
      items.forEach(function (it) {
        var ok = (!q || M.norm(it.g.termino + ' ' + it.g.sencillo + ' ' + (it.g.preciso || '')).indexOf(q) !== -1) && (!tema || it.g.tema === tema || (tema === 'nueva' && it.g.nueva));
        it.el.hidden = !ok; if (ok) n++;
      });
      cuenta.textContent = n + ' términos';
      botones.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.t === tema)); });
    }
    var input = h('input', { class: 'input', type: 'search', id: 'm2glos-buscar', placeholder: 'Buscar un término…', 'aria-label': 'Buscar en el glosario', oninput: function () { q = M.norm(input.value); filtrar(); } });
    botones = [['', 'Todos']].concat(Object.keys(m2.temasGlosario).map(function (k) { return [k, m2.temasGlosario[k]]; }), [['nueva', 'Añadidas en esta edición']]).map(function (t2) {
      return h('button', { class: 'chip', type: 'button', dataset: { t: t2[0] }, onclick: function () { tema = t2[0]; filtrar(); } }, t2[1]);
    });
    main.appendChild(h('div', { class: 'wrap' },
      h('header', { class: 'page-head' }, h('span', { class: 'eyebrow' }, 'Módulo 2 · Glosario'), h('h1', null, 'Las palabras del recorrido'),
        p('Cada término tiene una definición en sencillo y, en su desplegable, la definición precisa y un ejemplo. En los talleres, las palabras subrayadas con puntos abren esta definición sin salir de la página.')),
      h('div', { class: 'toolbar' }, input, h('div', { class: 'chips', role: 'group', 'aria-label': 'Filtrar por tema' }, botones), cuenta), grid));
    filtrar();
  };

  /* ---------- Fuentes y método ---------- */
  function dondeEvidencia(id) {
    for (var i = 0; i < m2.talleres.length; i++) {
      var t = m2.talleres[i];
      for (var j = 0; j < t.secciones.length; j++) {
        var s = t.secciones[j];
        if (s.evidencia === id || (s.evidencias && s.evidencias.indexOf(id) !== -1)) return { t: t, s: s };
      }
    }
    return null;
  }
  M.paginas.m2fuentes = function () {
    var main = ui.main();
    main.className = 'm2';
    var F = m2.fuentes;
    var fichas = h('ol', { class: 'evid-hub' }, Object.keys(m2.evidencias).map(function (id) {
      var ev = m2.evidencias[id], d = dondeEvidencia(id), an = ev.ancla || {};
      return h('li', null, h('b', null, rich(an.cifra || id)), ' ', h('span', null, rich(an.que || '')), ' ', m2.marca(ev.marca),
        d ? h('a', { href: '#' + d.t.slug + '-' + d.s.id }, ' · Taller ' + d.t.n) : null);
    }));
    var grupos = {};
    m2.referencias.forEach(function (r) { (grupos[r.grupo] = grupos[r.grupo] || []).push(r); });
    var refsBox = h('div');
    var items = [];
    Object.keys(grupos).forEach(function (g) {
      refsBox.appendChild(h('h3', { class: 'refs-g' }, g));
      var ol = h('ol', { class: 'refs' });
      grupos[g].forEach(function (r) {
        var li = h('li', { id: r.id }, r.t, ' ', r.url ? h('a', { href: r.url, target: '_blank', rel: 'noopener' }, 'Abrir') : null);
        ol.appendChild(li); items.push({ li: li, r: r });
      });
      refsBox.appendChild(ol);
    });
    var cuenta = h('span', { class: 'w-note-s', 'aria-live': 'polite' }, items.length + ' referencias');
    var input = h('input', { class: 'input', type: 'search', id: 'm2refs-buscar', placeholder: 'Buscar autor, año o tema…', 'aria-label': 'Buscar en las referencias', oninput: function () {
      var q = M.norm(input.value), n = 0;
      items.forEach(function (it) { var ok = !q || M.norm(it.r.t).indexOf(q) !== -1; it.li.hidden = !ok; if (ok) n++; });
      cuenta.textContent = n + ' referencias';
    } });
    main.appendChild(h('div', { class: 'wrap' },
      h('header', { class: 'page-head' }, h('span', { class: 'eyebrow' }, 'Módulo 2 · Fuentes y método'), h('h1', null, 'Cómo se sabe lo que se sabe'), p(F.intro)),
      h('div', { class: 'verif' }, h('strong', null, 'Nota de verificación. '), rich(m2.modulo.verificacion)),
      h('section', { class: 'm2-fsec' }, h('h2', null, 'Cinco palabras para hablar de evidencia'),
        h('dl', { class: 'guia-dl' }, F.comoSeSabe.map(function (x) { return h('div', { class: 'guia-f' }, h('dt', null, x[0]), h('dd', null, rich(x[1]))); }))),
      h('section', { class: 'm2-fsec' }, h('h2', null, 'Seis clases de cifras'), bloques([{ tabla: F.seisClases }]), p(F.tresPreguntas, { class: 'w-note' }),
        M.widgets['m2.classify-figtypes'] ? h('div', { class: 'lec-prueba' }, h('span', { class: 'lec-k' }, icon('lab'), 'Compruébalo tú'), M.montar('m2.classify-figtypes', {})) : null),
      h('section', { class: 'm2-fsec' }, h('h2', null, 'Las dieciséis fichas «¿De dónde sale este dato?»'), p('Cada ficha explica el origen, lo que mide la cifra, el método, los supuestos, la incertidumbre y lo que no permite concluir. Toca el taller para leerla en su contexto.', { class: 'w-note' }), fichas),
      h('section', { class: 'm2-fsec' }, h('h2', null, 'Revisión de esta edición'), bloques(F.revision),
        desp('Afirmaciones que conviene verificar o actualizar', 'registro de pendientes de la edición didáctica', h('ul', { class: 'm2-lista' }, F.pendientes.map(function (x) { return h('li', null, rich(x)); })), 'prof')),
      h('section', { class: 'm2-fsec' }, h('h2', null, 'Las ' + m2.referencias.length + ' referencias'), h('div', { class: 'toolbar' }, input, cuenta), refsBox)));
  };
})();
