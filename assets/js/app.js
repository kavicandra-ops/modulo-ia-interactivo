/* =====================================================================
   app.js — estructura, navegación y segmentos de cada taller
   Rutas por ancla simple:
     #inicio                 portada del proyecto (los dos módulos)
     Módulo 1: #modulo1, #taller1 … #taller4, #taller1-linea, #juego,
               #glosario, #referencias, #referencias-ref-12
     Módulo 2: #modulo2, #m2t1 … #m2t10, #m2t3-lec-d2, #m2glosario,
               #m2fuentes (lo registra assets/js/m2/app-m2.js)
   ===================================================================== */
(function () {
  'use strict';
  var M = window.M;
  var h = M.h, p = M.p, rich = M.rich, icon = M.icon, store = M.store;

  M.talleres.sort(function (a, b) { return a.n - b.n; });
  M.indexRefs('m1', M.referencias, 'ref-');
  M.paginas = M.paginas || {};

  /* Módulos del proyecto. Cada uno declara sus páginas, su navegación y su glosario rápido. */
  M.modulos = M.modulos || {};
  M.modulos.m1 = {
    id: 'm1', home: 'modulo1', corto: 'Módulo 1',
    titulo: 'El futuro tiene historia',
    sub: '90 años entre computadoras e inteligencias artificiales (1936–2026)',
    esPagina: function (pg) { return pg === 'modulo1' || pg === 'juego' || pg === 'glosario' || pg === 'referencias' || /^taller\d+$/.test(pg); },
    nav: function (nav) {
      nav.appendChild(h('a', { href: '#modulo1', dataset: { page: 'modulo1' } }, 'Módulo 1'));
      M.talleres.forEach(function (t) {
        nav.appendChild(h('a', { href: '#' + t.slug, class: 'era-' + t.n, dataset: { page: t.slug }, title: 'Taller ' + t.n + ': ' + t.titulo },
          h('span', { class: 'n' }, t.n), M.objeto(t.objeto), t.corto));
      });
      nav.appendChild(h('a', { href: '#juego', dataset: { page: 'juego' } }, 'Juego'));
      nav.appendChild(h('a', { href: '#glosario', dataset: { page: 'glosario' } }, 'Glosario'));
      nav.appendChild(h('a', { href: '#referencias', dataset: { page: 'referencias' } }, 'Referencias'));
    },
    glosarioRapido: function () { return M.glosario.map(function (g) { return { t: g.t, d: g.d }; }); },
    glosarioHref: '#glosario',
    pie: function () { return M.modulo.verificacion; }
  };
  function moduloDe(pg) {
    var ids = Object.keys(M.modulos);
    for (var i = 0; i < ids.length; i++) if (M.modulos[ids[i]].esPagina(pg)) return M.modulos[ids[i]];
    return null;
  }
  M.moduloDe = moduloDe;

  /* ---------- Preferencias ---------- */
  var prefs = Object.assign({ tema: 'auto', tam: 'm', citas: 'on', desp: 'cerrados' }, store.get('prefs', {}));
  M.prefs = prefs;
  function aplicarPrefs() {
    var r = document.documentElement;
    if (prefs.tema === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', prefs.tema);
    if (prefs.tam === 'm') r.removeAttribute('data-size'); else r.setAttribute('data-size', prefs.tam);
    r.setAttribute('data-citas', prefs.citas);
  }
  function guardarPrefs() { store.set('prefs', prefs); aplicarPrefs(); }
  aplicarPrefs();

  /* ---------- Progreso ---------- */
  var visto = store.get('visto', {});
  function marcarVisto(id, val) { if (val) visto[id] = true; else delete visto[id]; store.set('visto', visto); actualizarIndice(); }
  function seccionesDe(t) { return [{ id: 'ficha', nav: 'Ficha', icon: 'ficha' }].concat(t.secciones); }
  function progresoTaller(t) {
    var secs = seccionesDe(t);
    var n = secs.filter(function (s) { return visto[t.slug + '-' + s.id]; }).length;
    return { n: n, total: secs.length };
  }

  /* ---------- Estructura fija ---------- */
  var main, nav, popover, tip, brandName, pieTexto, navMod = null;
  function pintarNav(mod) {
    var clave = mod ? mod.id : 'portada';
    if (navMod === clave) return;
    navMod = clave;
    M.clear(nav);
    if (!mod) {
      nav.appendChild(h('a', { href: '#inicio', dataset: { page: 'inicio' } }, 'Portada'));
      Object.keys(M.modulos).forEach(function (k) {
        var md = M.modulos[k];
        nav.appendChild(h('a', { href: '#' + md.home, dataset: { page: md.home }, title: md.titulo }, h('span', { class: 'n' }, md.corto.replace('Módulo ', 'M')), md.titulo));
      });
    } else {
      nav.appendChild(h('a', { href: '#inicio', class: 'navback', title: 'Portada del proyecto', 'aria-label': 'Portada del proyecto' }, icon('atras')));
      mod.nav(nav);
    }
    brandName.textContent = mod ? mod.titulo : 'El futuro tiene historia';
    M.clear(pieTexto);
    if (mod) {
      pieTexto.appendChild(h('strong', null, mod.corto + ' · ' + mod.titulo + ': ' + mod.sub));
      pieTexto.appendChild(p(mod.pie()));
    } else {
      pieTexto.appendChild(h('strong', null, 'Proyecto educativo · Computación e inteligencia artificial para público no experto'));
    }
  }
  function construirMarco() {
    var app = document.getElementById('app');
    var header = h('header', { class: 'topbar' },
      h('div', { class: 'wrap' },
        h('a', { class: 'brand', href: '#inicio', 'aria-label': 'Portada del proyecto: los módulos' },
          h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, h('span'), h('span'), h('span'), h('span')),
          (brandName = h('span', { class: 'brand-name' }, 'El futuro tiene historia'))),
        (nav = h('nav', { class: 'mainnav', 'aria-label': 'Talleres y secciones' })),
        h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Ajustes de lectura', title: 'Ajustes de lectura', onclick: abrirAjustes }, icon('ajustes'))
      )
    );
    main = h('main', { id: 'contenido', tabindex: '-1' });
    pieTexto = h('div', { class: 'stack' });
    var foot = h('footer', { class: 'site-foot' },
      h('div', { class: 'wrap' },
        pieTexto,
        h('div', { class: 'row' },
          h('a', { href: '#inicio' }, 'Portada del proyecto'),
          h('a', { href: '#modulo1' }, 'Módulo 1 · El futuro tiene historia'),
          M.modulos.m2 ? h('a', { href: '#modulo2' }, 'Módulo 2 · ' + M.modulos.m2.titulo) : null),
        h('p', { class: 'small' }, 'Tipografías Archivo y Chivo Mono (Omnibus-Type, Argentina) y Alegreya (Huerta Tipográfica, Argentina). Las preferencias y el progreso se guardan solo en este navegador.')
      )
    );
    var fab = h('button', { class: 'fab', type: 'button', onclick: abrirGlosarioRapido, 'aria-label': 'Abrir glosario rápido' }, icon('libro'), 'Glosario');
    popover = h('div', { class: 'popover', role: 'dialog', 'aria-label': 'Referencia', hidden: true });
    tip = h('div', { class: 'tip', role: 'status', hidden: true });
    app.appendChild(h('a', { class: 'skip', href: '#contenido', onclick: function (e) { e.preventDefault(); main.focus(); } }, 'Saltar al contenido'));
    app.appendChild(header);
    app.appendChild(main);
    app.appendChild(foot);
    app.appendChild(fab);
    app.appendChild(popover);
    app.appendChild(tip);
  }

  /* ---------- Citas: ventana emergente ---------- */
  function urlDe(texto, ref) { if (ref && ref.url) return ref.url; var m = texto.match(/(https?:\/\/\S+)$/); return m ? m[1] : null; }
  function textoConEnlace(texto) {
    var url = urlDe(texto);
    if (!url) return document.createTextNode(texto);
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(texto.slice(0, texto.length - url.length)));
    frag.appendChild(h('a', { href: url, target: '_blank', rel: 'noopener' }, url));
    return frag;
  }
  function refPorId(id) {
    var listas = [M.referencias || []].concat(M.m2 && M.m2.referencias ? [M.m2.referencias] : []);
    for (var i = 0; i < listas.length; i++) { var r = listas[i].filter(function (x) { return x.id === id; })[0]; if (r) return r; }
    return null;
  }
  function hrefLista(ref) { return /^m2/.test(ref.id) ? '#m2fuentes-' + ref.id : '#referencias-' + ref.id; }
  function mostrarCita(btn) {
    var ref = refPorId(btn.getAttribute('data-ref'));
    if (!ref) return;
    M.clear(popover);
    var url = urlDe(ref.t, ref);
    popover.appendChild(h('div', { class: 'pk' }, 'Referencia · ' + ref.k));
    popover.appendChild(h('div', { class: 'ptxt' }, ref.url ? document.createTextNode(ref.t) : textoConEnlace(ref.t)));
    popover.appendChild(h('div', { class: 'btnrow' },
      url ? h('a', { class: 'btn small', href: url, target: '_blank', rel: 'noopener' }, icon('externo'), 'Abrir fuente') : null,
      h('a', { class: 'btn small ghost', href: hrefLista(ref), onclick: cerrarCita }, 'Ver en la lista'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: cerrarCita }, 'Cerrar')));
    colocarPopover(btn);
  }
  /* Término del glosario en línea: definición sencilla sin salir de la página */
  function mostrarTermino(btn) {
    var g = M.terminos && M.terminos[btn.getAttribute('data-g')];
    if (!g) return;
    M.clear(popover);
    popover.appendChild(h('div', { class: 'pk' }, 'Glosario'));
    popover.appendChild(h('h3', { class: 'ptitle' }, g.termino));
    if (btn.classList.contains('marca')) popover.appendChild(h('p', { class: 'ptxt' }, h('b', null, btn.textContent + ': '), (btn.getAttribute('title') || '').replace(/^Tipo de cifra: [a-z]+\. /, '')));
    popover.appendChild(p(g.sencillo, { class: 'ptxt' }));
    if (g.ejemplo) popover.appendChild(p('Ejemplo: ' + g.ejemplo, { class: 'ptxt small muted' }));
    popover.appendChild(h('div', { class: 'btnrow' },
      h('a', { class: 'btn small ghost', href: '#m2glosario-' + g.id, onclick: cerrarCita }, 'Definición completa'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: cerrarCita }, 'Cerrar')));
    colocarPopover(btn);
  }
  function colocarPopover(btn) {
    popover.hidden = false;
    var r = btn.getBoundingClientRect();
    var pw = popover.offsetWidth, ph = popover.offsetHeight;
    var x = Math.min(Math.max(12, r.left), window.innerWidth - pw - 12);
    var y = r.bottom + 8;
    if (y + ph > window.innerHeight - 12) y = Math.max(12, r.top - ph - 8);
    popover.style.left = x + 'px';
    popover.style.top = y + 'px';
    popover._from = btn;
    var first = popover.querySelector('a,button');
    if (first) first.focus({ preventScroll: true });
  }
  function cerrarCita() {
    if (popover.hidden) return;
    popover.hidden = true;
    if (popover._from && document.contains(popover._from)) popover._from.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.cita button[data-ref]');
    if (b) { e.preventDefault(); mostrarCita(b); return; }
    var tb = e.target.closest && e.target.closest('button.gterm[data-g], button.marca[data-g]');
    if (tb) { e.preventDefault(); mostrarTermino(tb); return; }
    if (!popover.hidden && !popover.contains(e.target)) cerrarCita();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { cerrarCita(); cerrarHoja(); }
  });
  window.addEventListener('scroll', function () { if (!popover.hidden) cerrarCita(); M.tipHide(); }, { passive: true });

  /* Tooltip compartido para gráficos */
  M.tipShow = function (html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    var w = tip.offsetWidth, hh = tip.offsetHeight;
    tip.style.left = Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8) + 'px';
    tip.style.top = Math.max(8, y - hh - 12) + 'px';
  };
  M.tipHide = function () { if (tip) tip.hidden = true; };

  /* ---------- Hojas laterales: ajustes y glosario rápido ---------- */
  var hoja = null;
  function cerrarHoja() {
    if (!hoja) return;
    hoja.back.remove(); hoja.el.remove();
    if (hoja.from) hoja.from.focus({ preventScroll: true });
    hoja = null;
  }
  function abrirHoja(titulo, cuerpo) {
    cerrarHoja();
    var back = h('div', { class: 'sheet-back', onclick: cerrarHoja });
    var el = h('aside', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': titulo },
      h('div', { class: 'sheet-h' }, h('h2', null, titulo),
        h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Cerrar', onclick: cerrarHoja }, icon('cerrar'))),
      h('div', { class: 'sheet-b' }, cuerpo));
    hoja = { back: back, el: el, from: document.activeElement };
    document.body.appendChild(back);
    document.body.appendChild(el);
    var f = el.querySelector('input, button:not(.iconbtn)') || el.querySelector('button');
    if (f) f.focus();
  }
  function segCtl(opciones, valor, onChange) {
    var wrap = h('div', { class: 'seg-ctl', role: 'group' });
    opciones.forEach(function (o) {
      wrap.appendChild(h('button', { type: 'button', 'aria-pressed': String(o[0] === valor), onclick: function () {
        Array.prototype.forEach.call(wrap.children, function (b) { b.setAttribute('aria-pressed', 'false'); });
        this.setAttribute('aria-pressed', 'true');
        onChange(o[0]);
      } }, o[1]));
    });
    return wrap;
  }
  function abrirAjustes() {
    var confirmar = h('div', { class: 'btnrow', hidden: true },
      h('span', { class: 'small' }, '¿Borrar progreso, objetivos, puntajes y notas de las actividades?'),
      h('button', { class: 'btn small primary', type: 'button', onclick: function () {
        store.keys().forEach(function (k) { if (k.indexOf('prefs') === -1) { try { localStorage.removeItem(k); } catch (e) { /* nada */ } } });
        visto = {};
        cerrarHoja();
        render(true);
      } }, 'Sí, borrar'),
      h('button', { class: 'btn small', type: 'button', onclick: function () { confirmar.hidden = true; } }, 'Cancelar'));
    abrirHoja('Ajustes de lectura', [
      h('div', { class: 'opt-group' }, h('span', null, 'Tema'),
        segCtl([['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']], prefs.tema, function (v) { prefs.tema = v; guardarPrefs(); })),
      h('div', { class: 'opt-group' }, h('span', null, 'Tamaño de letra'),
        segCtl([['m', 'Normal'], ['l', 'Grande'], ['xl', 'Muy grande']], prefs.tam, function (v) { prefs.tam = v; guardarPrefs(); })),
      h('div', { class: 'opt-group' }, h('span', null, 'Módulo 2: explicaciones técnicas'),
        segCtl([['cerrados', 'Plegadas (lo esencial)'], ['abiertos', 'Desplegadas (todo)']], prefs.desp, function (v) { prefs.desp = v; guardarPrefs(); if (M.moduloDe(ruta().page) && M.moduloDe(ruta().page).id === 'm2') render(true); }),
        h('p', { class: 'w-note-s' }, 'Plegadas: a la vista queda lo esencial y cada detalle técnico se abre con un toque. Desplegadas: todo abierto, para profundizar o proyectar.')),
      h('div', { class: 'opt-group' }, h('span', null, 'Citas en el texto'),
        segCtl([['on', 'Mostrar'], ['off', 'Ocultar']], prefs.citas, function (v) { prefs.citas = v; guardarPrefs(); }),
        h('p', { class: 'w-note-s' }, 'Ocultarlas aligera la lectura en voz alta o en pantalla grande. Las referencias siguen en su página.')),
      h('div', { class: 'opt-group' }, h('span', null, 'Progreso'),
        h('p', { class: 'small muted' }, 'Los segmentos vistos, los objetivos y los puntajes se guardan solo en este navegador.'),
        h('button', { class: 'btn small', type: 'button', onclick: function () { confirmar.hidden = false; } }, icon('reset'), 'Reiniciar progreso'),
        confirmar)
    ]);
  }
  function abrirGlosarioRapido() {
    var mod = moduloDe(ruta().page) || M.modulos.m1;
    var fuente = mod.glosarioRapido();
    var lista = h('div');
    var input = h('input', { class: 'input', type: 'search', id: 'gq-buscar', placeholder: 'Buscar un término…', 'aria-label': 'Buscar en el glosario' });
    function pintar() {
      var q = norm(input.value);
      M.clear(lista);
      fuente.filter(function (g) { return !q || norm(g.t + ' ' + g.d).indexOf(q) !== -1; }).forEach(function (g) {
        lista.appendChild(h('div', { class: 'gq-item' }, h('h3', null, g.t), p(g.d)));
      });
      if (!lista.children.length) lista.appendChild(h('p', { class: 'small muted' }, 'Ningún término coincide. Pruebe con otra palabra.'));
    }
    input.addEventListener('input', pintar);
    pintar();
    abrirHoja('Glosario rápido · ' + mod.corto, [input, lista, h('a', { class: 'btn small', href: mod.glosarioHref, onclick: cerrarHoja }, 'Abrir el glosario completo')]);
  }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  M.norm = norm;

  /* ---------- Piezas reutilizables ---------- */
  function chipHilo(c) {
    var hl = M.HILOS[c];
    return h('span', { class: 'chip', title: hl.d }, icon(hl.icon), hl.n);
  }
  function barras(datos) {
    var max = datos.max || Math.max.apply(null, datos.filas.map(function (f) { return f[1]; }));
    var wrap = h('div', { class: 'barras' });
    datos.filas.forEach(function (f) {
      var dec = String(f[1]).split('.')[1];
      var val = dec ? M.dec(f[1], dec.length) : M.miles(f[1]);
      wrap.appendChild(h('div', { class: 'barra' + (f[2] ? ' ref' : '') },
        h('div', { class: 'bl' }, h('span', null, f[0]), h('b', null, val + ' ' + datos.u)),
        h('div', { class: 'bt', 'aria-hidden': 'true' }, h('i', { style: { width: Math.min(100, f[1] / max * 100) + '%' } }))));
    });
    if (datos.nota) wrap.appendChild(h('div', { class: 'bnote' }, datos.nota));
    return wrap;
  }
  M.barras = barras;
  function montar(nombre, ctx) {
    var c = h('div', { class: 'w' });
    var fn = M.widgets[nombre];
    if (fn) {
      try { fn(c, ctx || {}); }
      catch (e) { c.appendChild(h('p', { class: 'w-note' }, 'No se pudo cargar esta actividad.')); if (window.console) console.error(nombre, e); }
    }
    return c;
  }
  M.montar = montar;

  function panelLab(labs, ctx, idBase) {
    var tabs = h('div', { class: 'lab-tabs', role: 'tablist', 'aria-label': 'Actividades del laboratorio' });
    var body = h('div', { class: 'lab-body' });
    var el = h('div', { class: 'lab', id: idBase + '-lab' },
      h('div', { class: 'lab-head' }, h('div', { class: 'lab-title' }, icon('lab'), 'Laboratorio'), tabs), body);
    var paneles = {}, botones = {};
    function select(id, scroll) {
      Object.keys(botones).forEach(function (k) {
        botones[k].setAttribute('aria-selected', String(k === id));
        botones[k].tabIndex = k === id ? 0 : -1;
        if (paneles[k]) paneles[k].hidden = k !== id;
      });
      if (!paneles[id]) {
        paneles[id] = h('div', { role: 'tabpanel', id: idBase + '-lab-' + id, 'aria-label': (labs.filter(function (l) { return l.id === id; })[0] || {}).n });
        paneles[id].appendChild(montar(id, ctx));
        body.appendChild(paneles[id]);
      }
      if (scroll) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    labs.forEach(function (l) {
      botones[l.id] = h('button', { type: 'button', role: 'tab', 'aria-controls': idBase + '-lab-' + l.id, onclick: function () { select(l.id); } }, l.n);
      tabs.appendChild(botones[l.id]);
    });
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var ids = labs.map(function (l) { return l.id; });
      var cur = ids.indexOf(Object.keys(botones).filter(function (k) { return botones[k].getAttribute('aria-selected') === 'true'; })[0]);
      var nx = (cur + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length;
      select(ids[nx]); botones[ids[nx]].focus();
    });
    select(labs[0].id);
    el.select = select;
    return el;
  }

  function temporizador(min) {
    var opciones = [10, 15, 20, 30, 45];
    var total = (min || 20) * 60, resto = total, timer = null;
    var tt = h('div', { class: 'tt', 'aria-live': 'off' });
    var el = h('div', { class: 'timer' });
    function pintar() { tt.textContent = String(Math.floor(resto / 60)).padStart(2, '0') + ':' + String(resto % 60).padStart(2, '0'); }
    var btnPlay = h('button', { class: 'btn small primary', type: 'button', onclick: function () {
      if (timer) { clearInterval(timer); timer = null; btnPlay.textContent = 'Seguir'; return; }
      if (resto <= 0) { resto = total; el.classList.remove('done'); }
      btnPlay.textContent = 'Pausar';
      timer = setInterval(function () {
        resto--; pintar();
        if (resto <= 0) { clearInterval(timer); timer = null; el.classList.add('done'); btnPlay.textContent = 'Iniciar'; M.beep(660, 0.3); setTimeout(function () { M.beep(880, 0.5); }, 350); }
      }, 1000);
    } }, 'Iniciar');
    var btnReset = h('button', { class: 'btn small', type: 'button', onclick: function () { clearInterval(timer); timer = null; resto = total; el.classList.remove('done'); btnPlay.textContent = 'Iniciar'; pintar(); } }, 'Reiniciar');
    el.appendChild(h('span', { class: 'eyebrow' }, min ? 'Tiempo sugerido' : 'Temporizador'));
    el.appendChild(tt);
    if (!min) {
      var sel = h('select', { class: 'input', 'aria-label': 'Minutos', id: 'tmin-' + Math.random().toString(36).slice(2, 7), onchange: function () { total = Number(sel.value) * 60; resto = total; pintar(); } },
        opciones.map(function (o) { return h('option', { value: o, selected: o === 20 }, o + ' min'); }));
      el.appendChild(sel);
    }
    el.appendChild(h('div', { class: 'btnrow' }, btnPlay, btnReset));
    pintar();
    return el;
  }

  /* ---------- Segmentos ---------- */
  var KICKER = {
    ficha: 'Ficha del taller', prologo: 'Prólogo', linea: 'Línea de tiempo', conceptos: 'Conceptos fundamentales',
    grafico: 'En números', maquinas: 'Por dentro de la máquina', caso: 'Caso de estudio', ia: 'El hilo de la IA',
    sociedad: 'Contexto social, económico y político', latam: 'Mirada desde América Latina y Colombia', mitos: 'Mitos y precisiones',
    cierre: 'Cierre práctico', regulacion: 'Regulación', futuro: 'Tendencias abiertas', memoria: 'Memoria'
  };
  function seccion(t, sec, cuerpo) {
    var id = t.slug + '-' + sec.id;
    var btn = h('button', { class: 'btn small visto', type: 'button', 'aria-pressed': String(!!visto[id]) });
    function pintarBtn() { btn.textContent = ''; btn.appendChild(icon('check')); btn.appendChild(document.createTextNode(visto[id] ? 'Visto' : 'Marcar como visto')); btn.setAttribute('aria-pressed', String(!!visto[id])); }
    btn.addEventListener('click', function () { marcarVisto(id, !visto[id]); pintarBtn(); });
    pintarBtn();
    return h('section', { class: 'seg seg-' + sec.tipo, id: id, 'aria-labelledby': id + '-h', dataset: { sec: sec.id } },
      h('header', { class: 'seg-head' },
        h('div', { class: 'seg-kicker' }, icon(sec.icon || 'idea'), KICKER[sec.tipo] || sec.nav),
        h('h2', { id: id + '-h' }, sec.titulo),
        sec.desc ? p(sec.desc, { class: 'seg-desc' }) : null),
      cuerpo,
      h('footer', { class: 'seg-foot' }, btn));
  }

  var R = {};
  R.ficha = function (t) {
    var guard = store.get('obj-' + t.slug, []);
    var lista = h('ol', { class: 'obj-list' });
    t.ficha.objetivos.forEach(function (o, i) {
      var cb = h('input', { type: 'checkbox', id: t.slug + '-obj-' + i, checked: !!guard[i] });
      cb.addEventListener('change', function () { guard[i] = cb.checked; store.set('obj-' + t.slug, guard); });
      lista.appendChild(h('li', null, h('label', { for: t.slug + '-obj-' + i }, cb, h('span', { class: 'ol' }, String.fromCharCode(97 + i) + '.'), h('span', null, o))));
    });
    return h('div', { class: 'ficha' },
      h('div', { class: 'ficha-a' },
        h('dl', null,
          h('div', null, h('dt', null, 'Período'), h('dd', null, t.ficha.periodo)),
          h('div', null, h('dt', null, 'Objeto-símbolo'), h('dd', null, t.ficha.objeto)),
          h('div', null, h('dt', null, 'Pregunta guía'), h('dd', { style: { fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.15rem' } }, t.pregunta)),
          h('div', null, h('dt', null, 'Duración sugerida'), h('dd', null, 'Unas 3 horas, o dos sesiones de 90 minutos')))),
      h('div', { class: 'ficha-b' },
        h('h3', null, 'Objetivos de aprendizaje'),
        h('p', { class: 'small muted' }, 'Al terminar, cada participante podrá… Marque cada objetivo cuando sienta que lo logró.'),
        lista));
  };
  R.prologo = function (sec, t) {
    var grid = h('div', { class: 'prologo' }, sec.items.map(function (it) {
      return h('article', null, h('div', { class: 'py' }, it.a), h('h3', null, it.t), p(it.d));
    }));
    return [grid,
      h('div', { class: 'callout mt-m' }, icon('mano'), p(sec.ejemplo)),
      sec.widget ? h('div', { class: 'mt-m' }, montar(sec.widget, { t: t, sec: sec })) : null];
  };
  R.linea = function (sec, t) {
    var filtro = 'todos';
    var lis = [];
    var ol = h('ol', { class: 'tl' }, sec.eventos.map(function (ev) {
      var li = h('li', { dataset: { t: ev.t } },
        h('div', { class: 'ty' }, ev.a),
        h('div', { class: 'tdot', 'aria-hidden': 'true' }),
        h('div', { class: 'tcard' },
          h('div', { class: 'th' }, rich(ev.h)),
          h('div', { class: 'tp' }, h('b', null, 'Por qué importa'), ev.p),
          h('div', { class: 'tags' }, ev.t.split('').map(chipHilo))));
      lis.push(li);
      return li;
    }));
    var botones = [];
    var cuenta = h('span', { class: 'w-note-s', 'aria-live': 'polite' });
    function aplicar() {
      var n = 0;
      lis.forEach(function (li) { var ok = filtro === 'todos' || li.dataset.t.indexOf(filtro) !== -1; li.hidden = !ok; if (ok) n++; });
      botones.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === filtro)); });
      cuenta.textContent = n + ' de ' + lis.length + ' hitos';
    }
    var filtros = h('div', { class: 'tl-filters' }, h('span', { class: 'flab' }, 'Seguir un hilo:'));
    [['todos', 'Todos', null]].concat(Object.keys(M.HILOS).map(function (k) { return [k, M.HILOS[k].n, M.HILOS[k].icon]; })).forEach(function (f) {
      var usado = f[0] === 'todos' || sec.eventos.some(function (ev) { return ev.t.indexOf(f[0]) !== -1; });
      if (!usado) return;
      var b = h('button', { type: 'button', class: 'chip', dataset: { f: f[0] }, onclick: function () { filtro = f[0]; aplicar(); } }, f[2] ? icon(f[2]) : null, f[1]);
      botones.push(b); filtros.appendChild(b);
    });
    filtros.appendChild(cuenta);
    aplicar();
    return [filtros, ol];
  };
  R.conceptos = function (sec, t) {
    var lab = sec.labs ? panelLab(sec.labs, { t: t, sec: sec }, t.slug + '-conceptos') : null;
    var grid = h('div', { class: 'conceptos' }, sec.items.map(function (c, i) {
      return h('article', { class: 'concepto' },
        h('div', { class: 'concepto-h' }, h('span', { class: 'cn' }, String(i + 1).padStart(2, '0')), h('h3', null, c.t)),
        p(c.d),
        c.lab ? h('button', { class: 'btn small', type: 'button', onclick: function () { lab.select(c.lab, true); } }, icon('lab'), 'Probar en el laboratorio') : null,
        c.ir ? h('a', { class: 'btn small', href: '#' + t.slug + '-' + c.ir }, icon('flecha'), 'Practicar en el cierre del taller') : null);
    }));
    return [grid, lab];
  };
  R.grafico = function (sec, t) {
    return h('figure', { class: 'fig' },
      h('div', { class: 'fig-box' }, montar(sec.widget, { t: t, sec: sec })),
      h('figcaption', null, p(sec.pie), h('span', { class: 'src' }, rich(sec.fuente))));
  };
  function tarjetasMaquinas(sec) {
    return h('div', { class: 'maquinas' }, sec.items.map(function (it) {
      var dl = h('dl');
      sec.campos.slice(1).forEach(function (c, j) {
        dl.appendChild(h('div', null, h('dt', null, c), h('dd', { class: j === sec.campos.length - 2 ? 'dato' : null }, rich(it.v[j + 1]))));
      });
      return h('article', { class: 'maq' },
        h('div', { class: 'maq-top' }, h('span', { class: 'my' }, it.v[0]), h('h3', null, it.n)), dl);
    }));
  }
  R.maquinas = function (sec, t) {
    var out = [];
    if (sec.anatomia) {
      out.push(montar('anatomia', { t: t, sec: sec, tipo: sec.anatomia, partes: sec.partes }));
      if (sec.items) out.push(h('h3', { class: 'mt-l', style: { fontSize: 'var(--fs-xl)', marginBottom: '14px' } }, t.n === 3 ? 'Máquinas representativas' : 'Más máquinas'));
    }
    if (sec.items) out.push(tarjetasMaquinas(sec));
    if (sec.notas) {
      out.push(h('div', { class: 'notas' }, sec.notas.map(function (n) {
        if (n.estilo === 'apolo') {
          return h('article', { class: 'nota apolo' + (n.wide ? ' wide' : '') },
            h('div', { class: 'alarm', 'aria-label': 'Alarmas 1201 y 1202' }, h('span', null, '1201'), h('span', null, '1202')),
            h('h3', { style: { color: '#e9ffe9' } }, n.t), p(n.d));
        }
        return h('article', { class: 'nota' + (n.wide ? ' wide' : '') }, h('h3', null, n.t), p(n.d), n.widget ? montar(n.widget, { t: t, sec: sec }) : null);
      })));
    }
    return out;
  };
  R.caso = function (sec, t) {
    return h('div', { class: 'caso' },
      h('ol', { class: 'capitulos' }, sec.capitulos.map(function (c, i) {
        return h('li', null, h('span', { class: 'capn' }, String(i + 1).padStart(2, '0')), h('h3', null, c.t), p(c.d));
      })),
      h('div', { class: 'caso-side' }, sec.widgets.map(function (w) { return montar(w, { t: t, sec: sec }); })));
  };
  R.ia = function (sec, t) {
    var lab = sec.labs ? panelLab(sec.labs, { t: t, sec: sec }, t.slug + '-ia') : null;
    var list = h('ol', { class: 'hilo' }, sec.items.map(function (it) {
      return h('li', null,
        h('div', { class: 'hy' }, it.a),
        h('div', { class: 'hk', 'aria-hidden': 'true' }),
        h('div', { class: 'hb' },
          h('h3', null, it.t),
          it.e ? h('span', { class: 'enfoque ' + it.e }, it.e === 's' ? 'IA simbólica' : 'IA conexionista') : null,
          p(it.d),
          it.datos ? barras(it.datos) : null,
          it.lab ? h('button', { class: 'btn small', type: 'button', style: { justifySelf: 'start' }, onclick: function () { lab.select(it.lab, true); } }, icon('lab'), 'Probar en el laboratorio') : null));
    }));
    var leyenda = h('div', { class: 'btnrow', style: { marginBottom: '14px' } },
      h('span', { class: 'enfoque s' }, 'IA simbólica'), h('span', { class: 'small muted' }, 'reglas y lógica escritas a mano'),
      h('span', { class: 'enfoque c' }, 'IA conexionista'), h('span', { class: 'small muted' }, 'redes que aprenden de ejemplos'));
    var lec = sec.leccion;
    var leccion = lec ? h('div', { class: 'leccion' }, h('h3', null, lec.t), p(lec.d),
      lec.caminos ? h('div', { class: 'dos-caminos' },
        h('div', null, h('b', null, 'IA simbólica'), h('span', null, 'Un recetario: reglas y lógica escritas a mano.'), h('span', null, 'Ejemplo de la época: el Logic Theorist (1956).')),
        h('div', null, h('b', null, 'IA conexionista'), h('span', null, 'Probar y corregir la sazón: redes que ajustan sus conexiones con ejemplos.'), h('span', null, 'Ejemplo de la época: el perceptrón (1958).'))) : null,
      lec.ingredientes ? h('div', { class: 'dos-caminos', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' } },
        [['idea', 'Algoritmos mejores'], ['datos', 'Datos masivos de Internet'], ['computo', 'Chips de cálculo paralelo']].map(function (x) {
          return h('div', null, icon(x[0]), h('b', null, x[1]));
        })) : null) : null;
    return [leyenda, list, lab, leccion];
  };
  R.sociedad = function (sec) {
    var filtro = null;
    var items = sec.items.map(function (it) {
      return h('article', { class: 'recorte', dataset: { l: it.l || '' } },
        h('div', { class: 'rl' }, (it.l || '').split('').map(function (c) { return h('span', { class: 'chip' }, icon(M.LENTES[c].icon), M.LENTES[c].n); })),
        h('h3', null, it.t), p(it.d), it.datos ? barras(it.datos) : null);
    });
    var botones = [];
    var lentes = h('div', { class: 'lentes' }, h('span', { class: 'flab' }, 'Mirar con la lente de:'));
    Object.keys(M.LENTES).forEach(function (k) {
      var b = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', onclick: function () {
        filtro = filtro === k ? null : k;
        botones.forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.k === filtro)); });
        items.forEach(function (it) { it.hidden = !!filtro && it.dataset.l.indexOf(filtro) === -1; });
      }, dataset: { k: k } }, icon(M.LENTES[k].icon), M.LENTES[k].n);
      botones.push(b); lentes.appendChild(b);
    });
    lentes.appendChild(h('span', { class: 'w-note-s' }, 'Las lentes son una guía de lectura: cada recorte puede mirarse con más de una.'));
    return [lentes, h('div', { class: 'recortes' }, items)];
  };
  R.latam = function (sec) {
    return h('div', { class: 'postales' }, sec.items.map(function (it) {
      return h('article', { class: 'postal' + (it.co ? ' co' : '') },
        h('div', { class: 'postal-h' }, h('h3', null, it.t),
          h('div', { class: 'sello', 'aria-label': it.lugar + (it.a ? ', ' + it.a : '') }, h('b', null, it.lugar), it.a ? h('span', null, it.a) : null)),
        p(it.d), it.datos ? barras(it.datos) : null);
    }));
  };
  R.regulacion = function (sec) {
    return h('div', { class: 'regula' }, sec.items.map(function (it) {
      return h('article', { class: 'reg' + (it.co ? ' co' : '') },
        h('div', { class: 'reg-h' }, h('span', { class: 'chip', style: { justifySelf: 'start' } }, it.tipo), h('h3', null, it.actor), h('div', { class: 'ri' }, it.inst)),
        h('dl', null,
          h('div', null, h('dt', null, 'Enfoque'), h('dd', null, rich(it.enf))),
          h('div', null, h('dt', null, 'Situación a octubre de 2026'), h('dd', null, rich(it.sit)))));
    }));
  };
  R.futuro = function (sec) {
    return h('div', { class: 'futuro' }, sec.items.map(function (it) { return h('article', { class: 'fut' }, h('h3', null, it.t), p(it.d)); }));
  };
  R.memoria = function (sec, t) {
    return [h('div', { class: 'prose' }, sec.textos.map(function (x) { return p(x); })),
      h('figure', { class: 'fig mt-m' }, h('div', { class: 'fig-box' }, montar('memoria', { t: t, sec: sec })), h('figcaption', null, h('span', { class: 'src' }, sec.pie)))];
  };
  var VEREDICTO = {
    falso: ['Falso', 'falso'], depende: ['Depende', 'matiz'], impreciso: ['Impreciso', 'matiz'],
    amedias: ['A medias', 'matiz'], contexto: ['Fuera de contexto', 'matiz'], debate: ['En debate', 'matiz']
  };
  R.mitos = function (sec, t) {
    var clave = 'mitos-' + t.slug;
    var res = store.get(clave, {});
    var marcador = h('span', { class: 'chip' });
    function pintarMarcador() {
      var r = Object.keys(res).length, ok = Object.keys(res).filter(function (k) { return res[k]; }).length;
      marcador.textContent = r ? ok + ' de ' + r + ' acertados' : 'Aún sin respuestas';
    }
    var tarjetas = sec.items.map(function (it, i) {
      var v = VEREDICTO[it.v];
      var fb = h('div', { class: 'fb' });
      var rev = h('div', { class: 'rev', hidden: true },
        h('span', { class: 'sellov ' + v[1] }, v[0]), p(it.p), it.widget ? montar(it.widget, { t: t, sec: sec }) : null, fb);
      var opts = h('div', { class: 'opts' });
      function revelar(eleccion) {
        rev.hidden = false;
        Array.prototype.forEach.call(opts.querySelectorAll('button'), function (b) { b.disabled = true; });
        if (!eleccion) { fb.textContent = ''; return; }
        var acierto = (eleccion === 'falso' && it.v === 'falso') || (eleccion === 'matiz' && it.v !== 'falso');
        var txt;
        if (acierto) txt = 'Bien visto.';
        else if (eleccion === 'cierto') txt = 'Es una creencia común, pero no se sostiene tal cual.';
        else if (eleccion === 'falso') txt = 'Casi: no es del todo falso, pero tampoco es exacto.';
        else txt = 'Es más que un matiz: la afirmación es falsa.';
        fb.textContent = txt;
        fb.className = 'fb ' + (acierto ? 'ok' : 'no');
        res[i] = acierto; store.set(clave, res); pintarMarcador();
      }
      [['cierto', 'Es cierto'], ['falso', 'Es falso'], ['matiz', 'Depende o a medias']].forEach(function (o) {
        opts.appendChild(h('button', { class: 'btn small', type: 'button', onclick: function () { revelar(o[0]); } }, o[1]));
      });
      opts.appendChild(h('button', { class: 'btn small ghost', type: 'button', onclick: function () { revelar(null); } }, 'Solo ver la precisión'));
      return { el: h('article', { class: 'mito' }, h('span', { class: 'mq' }, 'Se oye decir'), h('q', null, it.m), opts, rev), revelar: revelar, rev: rev };
    });
    pintarMarcador();
    return [h('div', { class: 'mitos-score' }, h('span', null, '¿Mito o realidad? Elija una respuesta y luego lea la precisión.'), marcador,
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { tarjetas.forEach(function (x) { if (x.rev.hidden) x.revelar(null); }); } }, 'Revelar todas'),
      h('button', { class: 'btn small ghost', type: 'button', onclick: function () { store.del(clave); render(true, t.slug + '-mitos'); } }, 'Volver a jugar')),
      h('div', { class: 'mitos' }, tarjetas.map(function (x) { return x.el; }))];
  };
  R.cierre = function (sec, t) {
    return sec.actividades.map(function (a) {
      return h('article', { class: 'actividad' },
        h('div', { class: 'act-h' },
          h('div', null, h('span', { class: 'eyebrow' }, a.min ? 'Actividad · ' + a.min + ' min' : a.comparte ? 'Actividad · ' + a.comparte.toLowerCase() : 'Actividad'), h('h3', null, a.t), p(a.d)),
          a.comparte ? null : temporizador(a.min)),
        a.widget ? montar(a.widget, { t: t, sec: sec }) : null);
    });
  };

  /* ---------- Páginas ---------- */
  function paginaTaller(t) {
    main.className = 'era-' + t.n;
    var objPreg = h('div', { class: 'pregunta' }, h('small', null, 'Pregunta guía'), t.pregunta);
    var hero = h('section', { class: 'era-hero' },
      h('div', { class: 'wrap' },
        h('div', null,
          h('div', { class: 'era-num' }, h('b', null, 'Taller ' + t.n), h('span', null, t.periodo), h('span', null, 'Objeto-símbolo: ' + t.objetoNombre.toLowerCase())),
          h('h1', null, t.titulo),
          h('p', { class: 'lede' }, t.intro),
          objPreg),
        h('div', { class: 'obj' }, M.objeto(t.objeto))));

    var indice = h('ol');
    var secs = seccionesDe(t);
    secs.forEach(function (s) {
      var id = t.slug + '-' + s.id;
      indice.appendChild(h('li', null, h('a', { href: '#' + id, dataset: { id: id } }, icon(s.icon || 'idea'), h('span', null, s.nav), h('span', { class: 'ok', 'aria-label': 'visto' }, icon('check')))));
    });
    var prog = h('div', { class: 'indice-prog' }, h('span', { class: 'pt' }), h('div', { class: 'bar' }, h('i')));
    var aside = h('nav', { class: 'indice', 'aria-label': 'Segmentos del taller' }, h('div', { class: 'indice-t' }, 'En este taller'), indice, prog);

    var cuerpo = h('div', { class: 'taller-main' });
    cuerpo.appendChild(seccion(t, { id: 'ficha', tipo: 'ficha', icon: 'ficha', titulo: 'Ficha del taller', nav: 'Ficha' }, R.ficha(t)));
    t.secciones.forEach(function (s) {
      var fn = R[s.tipo];
      cuerpo.appendChild(seccion(t, s, fn ? fn(s, t) : null));
    });

    var prev = M.talleres[t.n - 2], next = M.talleres[t.n];
    var pager = h('nav', { class: 'pager', 'aria-label': 'Otros talleres' },
      prev ? h('a', { href: '#' + prev.slug }, h('small', null, '← Taller ' + prev.n + ' · ' + prev.periodo), h('b', null, prev.titulo)) : h('a', { href: '#modulo1' }, h('small', null, '← Módulo 1'), h('b', null, 'Presentación del módulo')),
      next ? h('a', { class: 'next', href: '#' + next.slug }, h('small', null, 'Taller ' + next.n + ' · ' + next.periodo + ' →'), h('b', null, next.titulo)) : h('a', { class: 'next', href: '#juego' }, h('small', null, 'Repaso →'), h('b', null, 'Juego: ¿en la época de qué objeto?')));
    cuerpo.appendChild(pager);

    main.appendChild(hero);
    main.appendChild(h('div', { class: 'wrap' }, h('div', { class: 'taller-layout' }, aside, cuerpo)));
    actualizarIndice();
    espiar();
  }
  function actualizarIndice() {
    if (!main) return;
    var links = main.querySelectorAll('.indice a[data-id]');
    if (!links.length) return;
    var n = 0;
    Array.prototype.forEach.call(links, function (a) { var d = !!visto[a.dataset.id]; a.classList.toggle('done', d); if (d) n++; });
    var pt = main.querySelector('.indice-prog .pt'), bar = main.querySelector('.indice-prog .bar i');
    if (pt) pt.textContent = n + ' de ' + links.length + ' segmentos vistos';
    if (bar) bar.style.width = (n / links.length * 100) + '%';
  }
  var observador = null;
  function espiar() {
    if (observador) observador.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    Array.prototype.forEach.call(main.querySelectorAll('.indice a[data-id]'), function (a) { links[a.dataset.id] = a; });
    observador = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === en.target.id); });
        var a = links[en.target.id];
        var ol = a && a.parentNode.parentNode;
        if (a && ol && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.parentNode.offsetLeft - 20, behavior: 'smooth' });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Array.prototype.forEach.call(main.querySelectorAll('.seg'), function (s) { observador.observe(s); });
  }

  M.paginas.modulo1 = function () { main.className = 'era-0'; M.widgets.paginaInicio(main, { progreso: progresoTaller }); };
  M.paginas.inicio = function () { main.className = 'era-0'; M.widgets.paginaPortada(main); };
  M.paginas.juego = function () { main.className = 'era-0'; M.widgets.paginaJuego(main); };
  M.paginas.glosario = function () {
    main.className = 'era-0';
    var q = '', taller = 0;
    var grid = h('div', { class: 'glosario' });
    var items = M.glosario.map(function (g) {
      var el = h('article', { class: 'term' }, h('h3', null, g.t), h('p', null, g.d),
        h('div', { class: 'tt' }, g.talleres.map(function (n) { return h('a', { class: 'era-' + n, href: '#taller' + n, title: M.talleres[n - 1].titulo }, 'Taller ' + n); })));
      grid.appendChild(el);
      return { el: el, g: g };
    });
    var cuenta = h('span', { class: 'w-note-s', 'aria-live': 'polite' });
    function filtrar() {
      var n = 0;
      items.forEach(function (it) {
        var ok = (!q || M.norm(it.g.t + ' ' + it.g.d).indexOf(q) !== -1) && (!taller || it.g.talleres.indexOf(taller) !== -1);
        it.el.hidden = !ok; if (ok) n++;
      });
      cuenta.textContent = n + ' términos';
      botones.forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.n) === taller)); });
    }
    var input = h('input', { class: 'input', type: 'search', id: 'glosario-buscar', placeholder: 'Buscar un término o una palabra…', 'aria-label': 'Buscar en el glosario', oninput: function () { q = M.norm(input.value); filtrar(); } });
    var botones = [0, 1, 2, 3, 4].map(function (n) {
      return h('button', { class: 'chip', type: 'button', dataset: { n: n }, onclick: function () { taller = n; filtrar(); } }, n ? 'Taller ' + n : 'Todos');
    });
    main.appendChild(h('div', { class: 'wrap' },
      h('header', { class: 'page-head' }, h('span', { class: 'eyebrow' }, 'Glosario básico'), h('h1', null, 'Palabras para no perderse'),
        h('p', null, 'Definiciones breves de los términos técnicos del módulo, con los talleres en que aparecen.')),
      h('div', { class: 'toolbar' }, input, botones, cuenta),
      grid));
    filtrar();
  };
  M.paginas.referencias = function () {
    main.className = 'era-0';
    var ol = h('ol', { class: 'refs' });
    var items = M.referencias.map(function (r) {
      var li = h('li', { id: r.id }, textoConEnlace(r.t));
      ol.appendChild(li);
      return { li: li, r: r };
    });
    var cuenta = h('span', { class: 'w-note-s', 'aria-live': 'polite' });
    var input = h('input', { class: 'input', type: 'search', id: 'refs-buscar', placeholder: 'Buscar autor, año o tema…', 'aria-label': 'Buscar en las referencias', oninput: function () {
      var q = M.norm(input.value), n = 0;
      items.forEach(function (it) { var ok = !q || M.norm(it.r.t).indexOf(q) !== -1; it.li.hidden = !ok; if (ok) n++; });
      cuenta.textContent = n + ' referencias';
    } });
    cuenta.textContent = items.length + ' referencias';
    main.appendChild(h('div', { class: 'wrap' },
      h('header', { class: 'page-head' }, h('span', { class: 'eyebrow' }, 'Referencias · APA 7'), h('h1', null, 'De dónde sale cada dato'),
        h('p', null, 'Cada cita del texto remite a esta lista. Toque una cita en cualquier taller para ver su referencia sin salir de la página.')),
      h('div', { class: 'verif' }, h('strong', null, 'Nota de verificación. '), M.modulo.verificacion),
      h('div', { class: 'toolbar' }, input, cuenta),
      ol));
  };

  function tallerActual() {
    var r = ruta();
    return M.talleres.filter(function (t) { return t.slug === r.page; })[0] || null;
  }
  function ruta() {
    var raw = decodeURIComponent((location.hash || '').slice(1)) || 'inicio';
    if (raw.indexOf('inicio-') === 0) raw = 'modulo1-' + raw.slice(7);
    var i = raw.indexOf('-');
    return { raw: raw, page: i === -1 ? raw : raw.slice(0, i), sec: i === -1 ? null : raw.slice(i + 1) };
  }
  var paginaActual = null;
  function render(forzar, destino) {
    var r = ruta();
    var esTaller = M.talleres.some(function (t) { return t.slug === r.page; });
    if (!esTaller && !M.paginas[r.page]) { r = { raw: 'inicio', page: 'inicio', sec: null }; }
    var cambia = forzar || paginaActual !== r.page;
    if (cambia) {
      if (observador) observador.disconnect();
      M.tipHide(); cerrarCita();
      M.clear(main);
      paginaActual = r.page;
      var mod = moduloDe(r.page);
      M.usarModulo(mod ? mod.id : 'm1');
      pintarNav(mod);
      if (esTaller) paginaTaller(tallerActual());
      else M.paginas[r.page]();
      Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
        if (a.dataset.page === r.page) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      var actual = nav.querySelector('[aria-current="page"]');
      if (actual && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: actual.offsetLeft - 40 });
      var t = tallerActual();
      var cur = nav.querySelector('[aria-current="page"]');
      var base = mod ? mod.titulo : 'El futuro tiene historia';
      document.title = t ? 'Taller ' + t.n + ': ' + t.titulo + ' · ' + base : (r.page === 'inicio' || !cur ? base : cur.getAttribute('title') || cur.textContent + ' · ' + base);
      if (M.paginaTitulo) { document.title = M.paginaTitulo; M.paginaTitulo = null; }
    }
    var objetivo = destino || (r.sec ? r.raw : null);
    if (objetivo) {
      var el = document.getElementById(objetivo) || (r.sec && document.getElementById(r.sec));
      if (el) {
        requestAnimationFrame(function () {
          el.scrollIntoView({ behavior: cambia ? 'instant' : 'smooth', block: 'start' });
          if (el.tagName === 'LI') { el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 2400); }
        });
      }
    } else if (cambia) {
      window.scrollTo(0, 0);
    }
  }
  M.render = render;
  M.ruta = ruta;
  M.ui = {
    seccion: seccion, panelLab: panelLab, temporizador: temporizador, montar: montar, barras: barras,
    textoConEnlace: textoConEnlace, abrirHoja: abrirHoja, cerrarHoja: cerrarHoja, espiar: espiar,
    visto: function () { return visto; }, marcarVisto: marcarVisto, actualizarIndice: actualizarIndice,
    main: function () { return main; }
  };
  window.addEventListener('hashchange', function () { render(false); });

  function arrancar() { construirMarco(); render(true); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else setTimeout(arrancar, 0);
})();
