/* Laboratorios del Taller 10 del módulo 2. Cada actividad se registra como M.widgets['m2.<nombre>']. */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, m2 = M.m2, W = M.widgets = M.widgets || {};

  /* ================= Siete ideas: explícalo con tus palabras =================
     Respuesta modelo (texto literal de la edición didáctica) y puntos clave de cada idea,
     reescritos en lenguaje llano con los mismos datos de la respuesta modelo.
     «r» enlaza las lecciones que cada tarjeta de las siete ideas propone repasar. */
  var IDEAS = [
    { t: 'I · Censo', m: 'Contamos unos 86.000 millones de neuronas y del orden de cien billones de sinapsis, pero no una a una: se estiman a partir de muestras. Las cifras tienen un margen amplio, y las conexiones por neurona cambian mucho según la región y el método.', k: ['unos 86.000 millones de neuronas', 'del orden de cien billones de sinapsis (~10¹⁴)', 'son estimaciones con margen, no recuentos uno a uno', 'el promedio de conexiones por neurona cambia con la región y el método'], r: [['lección I.5', '#m2t5-lec-i5'], ['lección I.6', '#m2t5-lec-i6']] },
    { t: 'II · Tiempo', m: 'Una neurona típica dispara poco: entre una vez cada diez segundos y una vez por segundo. Las ráfagas de cientos de impulsos por segundo existen, pero son breves y excepcionales; tomar ese máximo como media es un error.', k: ['de media, entre una vez cada diez segundos y una vez por segundo (0,1–1 Hz)', 'las ráfagas de ~450 impulsos por segundo son excepcionales y se midieron en tejido fuera del cuerpo (ex vivo)', 'un máximo no es una media'], r: [['lección I.2', '#m2t4-lec-i2']] },
    { t: 'III · Cómputo', m: 'No sabemos cuántas operaciones «hace» el cerebro: para traducirlo a FLOP/s hay que elegir una convención. La central es 10¹⁵, con un margen de 10¹³ a 10¹⁷. El «exaflop» es lo que costaría emularlo con más detalle, no su velocidad.', k: ['hace falta una convención para contar sus operaciones', '10¹⁵ operaciones por segundo como valor central', 'un margen enorme: de 10¹³ a 10¹⁷, cuatro órdenes de magnitud', 'el «exaflop» es lo que costaría imitarlo con más detalle, no su velocidad'], r: [['lección I.7', '#m2t5-lec-i7'], ['lección I.8', '#m2t5-lec-i8']] },
    { t: 'IV · Conducta', m: 'Las decisiones salen a unos 10 bits por segundo, aunque por los sentidos entren unos mil millones. Es un cuello de botella de información, y no se compara con FLOP/s.', k: ['salen como decisiones unos 10 bits por segundo', 'por los sentidos entran unos mil millones de bits por segundo', 'es información, no cómputo: no se compara con FLOP/s'], r: [['lección I.9', '#m2t5-lec-i9']] },
    { t: 'V · Energía', m: 'Comparar 20 W con 20 MW compara facturas. Para la eficiencia hay que dividir la energía entre el trabajo; con la convención central, el cerebro gasta unas mil veces menos por operación que la supercomputación de doble precisión, pero con otras convenciones la razón cambia mucho.', k: ['potencia no es eficiencia: 20 W frente a 20 MW compara facturas', 'la eficiencia es energía por operación: la potencia dividida entre las operaciones por segundo', 'el resultado depende de la convención elegida para el cerebro', 'con la convención central, unas mil veces menos energía por operación que la supercomputación científica'], r: [['lección III.1', '#m2t8-lec-iii1']] },
    { t: 'VI · Trayectoria', m: 'Si la máquina líder creciera un 25–30 % al año, en 2036 rondaría 20–30 EFLOP/s: es un «si», no una predicción. El entrenamiento de IA ya ronda 10²⁷ FLOP, y su futuro depende de la energía, los chips, el capital y la red eléctrica.', k: ['es un escenario: depende de la tasa de crecimiento que se suponga', '20–30 EFLOP/s en 2036 si la máquina líder creciera un 25–30 % al año', 'el entrenamiento de IA ya ronda 10²⁷ operaciones', 'los límites son físicos y económicos: energía, chips, capital y red eléctrica'], r: [['lección II.6', '#m2t7-lec-ii6'], ['lección III.2', '#m2t8-lec-iii2']] },
    { t: 'VII · Arquitectura', m: 'Lo más útil que podemos aprender del cerebro es cómo se organiza: guarda la memoria donde calcula, trabaja solo cuando hay eventos, se conforma con poca precisión y mantiene casi todo en silencio. Es una conclusión del autor.', k: ['memoria junto al cálculo', 'trabajar solo cuando hay eventos', 'conformarse con poca precisión', 'actividad dispersa: casi todo en silencio'], r: [['lección II.1', '#m2t6-lec-ii1'], ['lección II.3', '#m2t9-lec-ii3'], ['lección III.3', '#m2t9-lec-iii3']] }
  ];
  var OKEY = 'm2-ideas-propias';
  var nOwn = 0;

  W['m2.ownwords'] = function (el) {
    var saved = M.store.get(OKEY, {});
    if (!saved || typeof saved !== 'object') saved = {};
    var cur = 0, tmo = null, consejo = null, uid = 't10-own-' + (++nOwn);
    var ta = h('textarea', { id: uid, rows: 5, class: 'input t10-own-ta', placeholder: 'Escribe aquí tu explicación, como si se la contaras a alguien en un café…' });
    var lab = h('label', { for: uid, class: 't10-own-lab' });
    var show = h('button', { type: 'button', class: 'btn small', 'aria-expanded': 'false', 'aria-controls': uid + '-m' }, 'Ver una respuesta modelo');
    var clr = h('button', { type: 'button', class: 'btn small ghost' }, 'Borrar mi texto');
    var model = h('div', { class: 't10-model', id: uid + '-m', hidden: true, 'aria-live': 'polite' });
    var status = h('p', { class: 'w-note-s t10-own-st', 'aria-live': 'polite' });
    var grupo = h('div', { class: 'chips', role: 'group', 'aria-label': 'Idea que vas a explicar' });
    var botones = IDEAS.map(function (I, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === 0) }, I.t);
      b.addEventListener('click', function () {
        botones.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        cur = i; load();
      });
      grupo.appendChild(b);
      return b;
    });
    function ocultar() { model.hidden = true; show.textContent = 'Ver una respuesta modelo'; show.setAttribute('aria-expanded', 'false'); }
    function textoConsejo() {
      return ta.value.trim().length < 40 ? 'Consejo: intenta escribir al menos dos o tres frases antes de comparar.' : 'Si te falta algún punto, repasa la lección enlazada aquí debajo.';
    }
    /* Guarda al momento (al salir del cuadro o de la página) lo que la pausa de 600 ms aún no ha guardado */
    function guardarYa() {
      if (tmo === null) return;
      clearTimeout(tmo); tmo = null;
      M.store.set(OKEY, saved);
    }
    function load() {
      guardarYa();
      var I = IDEAS[cur];
      lab.textContent = 'Tu explicación de la idea ' + I.t;
      ta.value = saved[cur] || '';
      status.textContent = '';
      ocultar();
    }
    ta.addEventListener('input', function () {
      saved[cur] = ta.value;
      clearTimeout(tmo);
      tmo = setTimeout(function () { tmo = null; M.store.set(OKEY, saved); status.textContent = 'Guardado en este dispositivo.'; }, 600);
      if (!model.hidden && consejo) consejo.textContent = textoConsejo();
    });
    ta.addEventListener('blur', function () { if (tmo !== null) { guardarYa(); status.textContent = 'Guardado en este dispositivo.'; } });
    function alSalir() {
      if (!el.isConnected) { window.removeEventListener('pagehide', alSalir); return; }
      guardarYa();
    }
    window.addEventListener('pagehide', alSalir);
    clr.addEventListener('click', function () {
      clearTimeout(tmo); tmo = null;
      ta.value = ''; delete saved[cur]; M.store.set(OKEY, saved);
      if (!model.hidden && consejo) consejo.textContent = textoConsejo();
      status.textContent = 'Texto borrado.';
      ta.focus();
    });
    show.addEventListener('click', function () {
      var I = IDEAS[cur];
      if (!model.hidden) { ocultar(); return; }
      M.clear(model);
      model.appendChild(h('p', null, h('b', null, 'Una respuesta modelo: '), I.m));
      model.appendChild(h('p', { class: 'w-note-s' }, 'Puntos clave. Comprueba si los has mencionado, aunque sea con otras palabras:'));
      model.appendChild(h('ul', { class: 't10-keys' }, I.k.map(function (k) { return h('li', null, k); })));
      consejo = h('p', { class: 'w-note-s' }, textoConsejo());
      model.appendChild(consejo);
      model.appendChild(h('p', { class: 'w-note-s t10-own-rep' }, 'Repasa: ', I.r.map(function (r, j) { return [j ? ' · ' : '', h('a', { href: r[1] }, r[0])]; })));
      model.hidden = false;
      show.textContent = 'Ocultar la respuesta modelo';
      show.setAttribute('aria-expanded', 'true');
    });
    el.appendChild(h('div', { class: 't10-own' },
      p('Elige una idea y explícasela a alguien imaginario que no ha leído nada de esto. Después compara con una respuesta modelo y con la lista de puntos clave. Lo que escribas solo se guarda en este dispositivo.', { class: 'w-note' }),
      grupo, lab, ta,
      h('div', { class: 'btnrow' }, show, clr),
      status, model));
    load();
  };

  /* ================= Para el grupo: las once tarjetas de «Detectives de trampas» =================
     Toma de la sección «Once trampas» la afirmación engañosa de cada una (la frase entre comillas
     de su pregunta o, si no la hay, el campo «tarjeta»), su título y la clave: la opción correcta
     con su retroalimentación. Va plegado: es material para quien facilita. */
  function afirmacion(it) {
    if (it.tarjeta) return it.tarjeta;
    var q = (it.quiz && it.quiz.q) || '', ini = q.indexOf('«'), prof = 0;
    if (ini === -1) return q;
    for (var i = ini; i < q.length; i++) {
      if (q.charAt(i) === '«') prof++;
      else if (q.charAt(i) === '»' && --prof === 0) return q.slice(ini + 1, i);
    }
    return q;
  }
  /* Dentro de un enlace no caben los botones del glosario: se deja solo el texto del término */
  function sinTerminos(x) { return String(x || '').replace(/\{\{([^{}|]+)\|[a-z0-9-]+\}\}/g, '$1'); }
  function sinExacto(fb) {
    var x = String(fb || '').replace(/^Exacto[.:]\s*/, '');
    return x.charAt(0).toUpperCase() + x.slice(1);
  }
  W['m2.tarjetas-trampas'] = function (el, ctx) {
    var t = ctx && ctx.t, sec = t ? t.secciones.filter(function (s) { return s.tipo === 'trampas'; })[0] : null;
    if (!sec) return;
    var lista = h('ol', { class: 't10-tarj' }, sec.items.map(function (it, i) {
      var ok = ((it.quiz && it.quiz.opciones) || []).filter(function (o) { return o.ok; })[0];
      return h('li', null,
        h('p', { class: 't10-tarj-a' }, rich('«' + afirmacion(it) + '»')),
        h('p', null, h('b', null, 'Trampa: '), h('a', { href: '#' + t.slug + '-trampa-' + (i + 1) }, rich(sinTerminos(it.titulo)))),
        ok ? h('p', null, h('b', null, 'Clave: '), rich(ok.t.replace(/[.\s]*$/, '') + '. '), rich(sinExacto(ok.fb))) : null);
    }));
    el.appendChild(m2.desplegable('Las once tarjetas y su clave', 'para copiar o imprimir antes de la sesión',
      [p('Copia en cada tarjeta solo la afirmación entre comillas. El título de la trampa y la clave son para quien facilita: sirven para comprobar las respuestas de los grupos en la puesta en común.', { class: 'w-note-s' }), lista], 'paso'));
  };

  /* ================= Fuentes y método: seis clases de cifras ================= */
  W['m2.classify-figtypes'] = function (el) {
    m2.clasificar(el, {
      intro: 'Clasifica cada cifra o afirmación del recorrido en una de las seis clases. Tras elegir, lee la explicación.',
      cats: [{ k: 'obs', label: 'observada' }, { k: 'calc', label: 'calculada de mediciones' }, { k: 'est', label: 'estimación con supuestos' }, { k: 'decl', label: 'declarada por una empresa' }, { k: 'prev', label: 'previsión (tasa o plan)' }, { k: 'interp', label: 'interpretación del autor' }],
      items: [
        { t: 'La tomografía por emisión de positrones mide unos 17 W de consumo de glucosa en el encéfalo.', ok: 'obs', fb: 'Es una medición experimental con un instrumento.' },
        { t: 'Frontier gasta ≈1,8 × 10⁻¹¹ J por operación: 24,6 MW ÷ 1,353 EFLOP/s.', ok: 'calc', fb: 'Se obtiene dividiendo dos cifras medidas.' },
        { t: 'Con la convención central, el cerebro equivaldría a ~10¹⁵ FLOP/s.', ok: 'est', fb: 'Depende de supuestos explícitos y de un juicio experto.' },
        { t: 'SpiNNcloud reúne 35.000 chips con más de cinco millones de núcleos.', ok: 'decl', fb: 'Lo afirma quien construyó el sistema.' },
        { t: 'A un 37 % anual, la máquina líder rondaría 51 EFLOP/s en 2036.', ok: 'prev', fb: 'Es una previsión condicionada a una tasa supuesta: 2,198 × 1,37¹⁰ ≈ 51.' },
        { t: 'Lo más probable es que la neuromórfica y la cuántica funcionen como especialistas, no como sustitutos.', ok: 'interp', fb: 'Es una conclusión razonada del autor a partir de los datos, no una cifra.' },
        { t: 'IBM prevé Starling en 2029, con 10⁸ puertas sobre 200 cúbits lógicos.', ok: 'prev', fb: 'Es una hoja de ruta de la empresa: una previsión basada en un plan (proyectado).' },
        { t: 'En rebanadas de corteza humana, una sola célula llegó a 856 Hz.', ok: 'obs', fb: 'Es un valor medido en un experimento publicado.' },
        { t: 'JUPITER Booster hace ≈63 GFLOP/s por vatio: 1,000 EFLOP/s ÷ 15,8 MW.', ok: 'calc', fb: 'Se obtiene dividiendo dos cifras medidas en la lista TOP500.' }
      ]
    });
  };
})();
