/* =====================================================================
   core-m2.js — piezas compartidas del módulo 2 (De la sinapsis al centro de datos)
   - formatos: potencias de diez, cerebros, números en español
   - bloques de texto, desplegables, marcas de evidencia y fichas
     «¿De dónde sale este dato?»
   - componentes didácticos: predicción, pregunta con reintento,
     clasificador y deslizador (para los laboratorios de cada taller)
   Los laboratorios se registran como M.widgets['m2.<nombre>'] = function (el, ctx) {}.
   ===================================================================== */
(function () {
  'use strict';
  var M = window.M, h = M.h, p = M.p, rich = M.rich, icon = M.icon, store = M.store;
  var m2 = M.m2 = M.m2 || {};

  /* ---------- Términos del glosario para {{texto|g-id}} ---------- */
  M.terminos = M.terminos || {};
  (m2.glosario || []).forEach(function (g) { M.terminos[g.id] = g; });

  /* ---------- Formatos ---------- */
  m2.fmt = function (v, d) {
    var s = M.dec(Math.abs(v), d || 0);
    return (v < 0 ? '−' : '') + s;
  };
  m2.pw = function (e) { return '10' + M.sup(e < 0 ? '-' + Math.abs(e) : e); };
  /* «2,2 × 10¹⁸» con n decimales en la mantisa */
  m2.sci = function (v, d) {
    if (v === 0) return '0';
    var e = Math.floor(Math.log10(Math.abs(v)));
    var m = v / Math.pow(10, e);
    var dd = d == null ? 1 : d;
    if (Number(m.toFixed(dd)) >= 10) { m /= 10; e += 1; }
    var ms = M.dec(m, dd).replace(/,0+$/, '');
    if (e === 0) return ms;
    return (ms === '1' ? '' : ms + ' × ') + m2.pw(e);
  };
  /* Palabras en escala larga: 1e9 → «mil millones», 2e14 → «200 billones» */
  m2.palabras = function (v) {
    var E = [[1e18, 'trillón', 'trillones'], [1e15, 'mil billones', 'mil billones'], [1e12, 'billón', 'billones'], [1e9, 'mil millones', 'mil millones'], [1e6, 'millón', 'millones']];
    for (var i = 0; i < E.length; i++) {
      if (Math.abs(v) >= E[i][0]) {
        var q = v / E[i][0];
        var txt = q >= 100 ? M.miles(Math.round(q)) : M.dec(q, q % 1 === 0 || q >= 10 ? 0 : 1).replace(/,0$/, '');
        if (q === 1 && E[i][1].indexOf('mil') === 0) return E[i][1];
        return (q === 1 ? 'un ' + E[i][1] : txt + ' ' + E[i][2]);
      }
    }
    return M.miles(Math.round(v));
  };
  /* Potencia en cerebros de 20 W: solo una equivalencia de potencia */
  m2.cerebros = function (vatios) {
    var n = vatios / 20;
    if (n < 1.5) return M.dec(n, 1).replace(/,0$/, '') + ' cerebro' + (n >= 1.05 ? 's' : '');
    var w = m2.palabras(n);
    return w + (/(millones|millón|billones|billón)$/.test(w) ? ' de cerebros' : ' cerebros');
  };

  /* ---------- Bloques de texto ---------- */
  function bloque(b) {
    if (b == null) return null;
    if (typeof b === 'string') return p(b);
    if (b.ul) return h('ul', { class: 'm2-lista' }, b.ul.map(function (x) { return h('li', null, rich(x)); }));
    if (b.ol) return h('ol', { class: 'm2-lista' }, b.ol.map(function (x) { return h('li', null, rich(x)); }));
    if (b.tabla) {
      var filas = b.tabla;
      return h('div', { class: 'tablewrap m2-tabla' }, h('table', null,
        b.titulo ? h('caption', null, b.titulo) : null,
        h('thead', null, h('tr', null, filas[0].map(function (c) { return h('th', { scope: 'col' }, rich(c)); }))),
        h('tbody', null, filas.slice(1).map(function (f) { return h('tr', null, f.map(function (c) { return h('td', null, rich(c)); })); }))));
    }
    if (b.cautela) {
      var c = b.cautela;
      return h('aside', { class: 'cautela' }, h('strong', null, icon('mitos'), rich(c[0])), c.slice(1).map(function (x) { return p(x); }));
    }
    if (b.nota) return p(b.nota, { class: 'w-note' });
    if (b.formula) return h('div', { class: 'formula' }, rich(b.formula));
    if (b.widget) return M.montar(b.widget, b.ctx || {});
    if (b.datos) return h('ul', { class: 'datos-clave' }, b.datos.map(function (x) { return h('li', null, rich(x)); }));
    return null;
  }
  m2.bloque = bloque;
  m2.bloques = function (arr) { return (arr || []).map(bloque); };

  /* ---------- Desplegables ---------- */
  var ICONO_DESP = { paso: 'lista', prof: 'lupa', evid: 'lupa', guia: 'grafico', datos: 'memoria', porque: 'idea', escena: 'idea', cient: 'libro' };
  m2.desplegable = function (titulo, sub, cuerpo, clase, abierto) {
    var abrir = abierto || (M.prefs && M.prefs.desp === 'abiertos');
    var d = h('details', { class: 'dsp' + (clase ? ' dsp-' + clase : ''), open: abrir },
      h('summary', null,
        h('span', { class: 'dsp-ic', 'aria-hidden': 'true' }, icon(ICONO_DESP[clase] || 'flecha')),
        h('span', { class: 'dsp-t' }, rich(titulo), sub ? h('small', null, rich(sub)) : null),
        h('span', { class: 'dsp-mas', 'aria-hidden': 'true' })),
      h('div', { class: 'dsp-body' }, cuerpo));
    return d;
  };

  /* ---------- Marcas de evidencia y fichas ---------- */
  m2.marca = function (k) {
    if (!k) return null;
    return M.marcaNodo(k);
  };
  m2.ancla = function (an) {
    if (!an) return null;
    return h('div', { class: 'ancla' },
      h('div', { class: 'an-cifra' }, rich(an.cifra)),
      h('div', { class: 'an-que' }, rich(an.que), ' ', m2.marca(an.marca)),
      an.palabras ? p(an.palabras, { class: 'an-pal' }) : null,
      an.analogia ? h('p', { class: 'an-anal' }, '≈ ', rich(an.analogia)) : null);
  };
  m2.evidencia = function (id, abierta) {
    var ev = m2.evidencias && m2.evidencias[id];
    if (!ev) return null;
    var dl = h('dl', { class: 'evid-dl' });
    ev.campos.forEach(function (c) {
      var k = /permite|no puede/i.test(c[0]) ? ' no' : '';
      dl.appendChild(h('div', { class: 'evid-f' + k }, h('dt', null, c[0]), h('dd', null, rich(c[1]))));
    });
    var notas = (ev.verificacion || []).map(function (v) {
      return h('div', { class: 'evid-ver ' + (v.tipo === 'ok' ? 'ok' : 'nota') }, h('strong', null, rich(v.titulo.replace(/\*\*/g, ''))), p(v.texto));
    });
    var d = m2.desplegable('¿De dónde sale este dato?', (ev.ancla && ev.ancla.cifra ? ev.ancla.cifra + ' · ' : '') + ev.marca, [dl, notas], 'evid', abierta);
    d.id = 'evid-' + id;
    d.classList.add('evid');
    return d;
  };

  /* ---------- Predicción («antes de tocar nada») ---------- */
  m2.prediccion = function (pr) {
    if (!pr || !pr.opciones) return null;
    var out = h('p', { class: 'pred-out', 'aria-live': 'polite' });
    var grupo = h('div', { class: 'chips', role: 'group', 'aria-label': 'Elige tu predicción' });
    pr.opciones.forEach(function (o, i) {
      grupo.appendChild(h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', onclick: function () {
        Array.prototype.forEach.call(grupo.children, function (b) { b.setAttribute('aria-pressed', String(b === this)); }, this);
        var ok = i === pr.ok;
        M.clear(out);
        out.className = 'pred-out ' + (ok ? 'ok' : 'no');
        out.appendChild(h('strong', null, ok ? '✓ Bien pensado. ' : '✗ No exactamente. '));
        if (!ok) out.appendChild(h('span', null, 'La respuesta es «', rich(pr.opciones[pr.ok]), '». '));
        out.appendChild(rich(pr.porque));
      } }, rich(o)));
    });
    return h('div', { class: 'pred' }, h('span', { class: 'pred-k' }, 'Antes de tocar nada · tu predicción'), p(pr.q, { class: 'pred-q' }), grupo, out);
  };

  /* ---------- Pregunta con retroalimentación y reintento ---------- */
  var QKEY = 'm2-quiz';
  m2.quizHecho = function (id) { return !!store.get(QKEY, {})[id]; };
  m2.quiz = function (q, id, onOk) {
    if (!q || !q.opciones) return null;
    var nombre = 'q-' + id;
    var intentos = 0;
    var fs = h('fieldset', { class: 'quiz-fs' }, h('legend', null, rich(q.q)));
    var radios = q.opciones.map(function (o, i) {
      var r = h('input', { type: 'radio', name: nombre, id: nombre + '-' + i, value: String(i) });
      fs.appendChild(h('label', { class: 'quiz-op', for: nombre + '-' + i }, r, h('span', null, rich(o.t))));
      return r;
    });
    var fb = h('div', { class: 'quiz-fb', 'aria-live': 'polite' });
    var bCheck = h('button', { type: 'button', class: 'btn small primary' }, 'Comprobar');
    var bRetry = h('button', { type: 'button', class: 'btn small', hidden: true }, 'Intentar de nuevo');
    var bShow = h('button', { type: 'button', class: 'btn small ghost', hidden: true }, 'Ver la respuesta explicada');
    var okIdx = q.opciones.findIndex(function (o) { return o.ok; });
    var box = h('div', { class: 'quiz' + (m2.quizHecho(id) ? ' hecho' : '') }, fs, h('div', { class: 'btnrow' }, bCheck, bRetry, bShow), fb);
    function marcar(i, final) {
      var o = q.opciones[i], ok = i === okIdx;
      M.clear(fb);
      fb.className = 'quiz-fb ' + (ok ? 'ok' : 'no');
      fb.appendChild(h('strong', null, ok ? '✓ Correcto. ' : '✗ Todavía no. '));
      fb.appendChild(rich(o.fb));
      if (!ok && q.pista && !final) fb.appendChild(h('p', { class: 'quiz-pista' }, h('b', null, 'Pista: '), rich(q.pista)));
      radios.forEach(function (r, j) { r.disabled = true; r.parentNode.classList.toggle('es-ok', (ok || final) && j === okIdx); r.parentNode.classList.toggle('es-no', !ok && j === i); });
      bCheck.hidden = true;
      if (ok || final) {
        bRetry.hidden = true; bShow.hidden = true;
        if (ok) { var st = store.get(QKEY, {}); st[id] = true; store.set(QKEY, st); box.classList.add('hecho'); if (onOk) onOk(); }
      } else { bRetry.hidden = false; bShow.hidden = intentos < 1; }
    }
    bCheck.addEventListener('click', function () {
      var sel = radios.findIndex(function (r) { return r.checked; });
      if (sel === -1) { M.clear(fb); fb.className = 'quiz-fb'; fb.appendChild(document.createTextNode('Elige una opción y pulsa «Comprobar».')); return; }
      intentos++;
      marcar(sel, false);
    });
    bRetry.addEventListener('click', function () {
      radios.forEach(function (r) { r.disabled = false; r.checked = false; r.parentNode.classList.remove('es-ok', 'es-no'); });
      M.clear(fb); fb.className = 'quiz-fb';
      bCheck.hidden = false; bRetry.hidden = true; bShow.hidden = true;
    });
    bShow.addEventListener('click', function () {
      radios[okIdx].checked = true;
      M.clear(fb); marcar(okIdx, true);
      fb.insertBefore(h('strong', null, 'La respuesta: «' + q.opciones[okIdx].t.replace(/\*/g, '') + '». '), fb.firstChild);
    });
    return box;
  };

  /* ---------- Clasificador: cada afirmación en su categoría ----------
     cfg = { intro, cats: [{ k, label }], items: [{ t, ok, fb, no: { k: 'explicación si elige k' } }] } */
  m2.clasificar = function (el, cfg) {
    var right = 0, answered = 0;
    var score = h('p', { class: 'w-note', 'aria-live': 'polite' });
    var box = h('div', { class: 'clasif-m2' });
    if (cfg.intro) box.appendChild(p(cfg.intro, { class: 'w-note' }));
    cfg.items.forEach(function (it, i) {
      var fb = h('p', { class: 'cfb', 'aria-live': 'polite' });
      var item = h('div', { class: 'citem' });
      var grp = h('div', { class: 'chips', role: 'group', 'aria-label': 'Elige una categoría para la afirmación ' + (i + 1) });
      var hecho = false;
      cfg.cats.forEach(function (c) {
        var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false' }, rich(c.label));
        b.addEventListener('click', function () {
          Array.prototype.forEach.call(grp.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          var bien = c.k === it.ok;
          if (!hecho) { answered++; if (bien) right++; hecho = true; }
          item.classList.toggle('ok', bien); item.classList.toggle('bad', !bien);
          M.clear(fb);
          fb.appendChild(h('b', null, bien ? '✓ Bien. ' : '✗ Revisa. '));
          if (!bien) {
            if (it.no && it.no[c.k]) fb.appendChild(rich(it.no[c.k] + ' '));
            var cat = cfg.cats.filter(function (z) { return z.k === it.ok; })[0];
            fb.appendChild(rich('La categoría adecuada es «' + cat.label + '». '));
          }
          fb.appendChild(rich(it.fb || ''));
          score.textContent = 'Primeros intentos acertados: ' + right + ' de ' + answered + (answered === cfg.items.length ? ' · ¡completo!' : ' · quedan ' + (cfg.items.length - answered));
        });
        grp.appendChild(b);
      });
      item.appendChild(h('p', null, h('b', null, (i + 1) + '. '), rich(it.t)));
      item.appendChild(grp); item.appendChild(fb);
      box.appendChild(item);
    });
    var reset = h('button', { type: 'button', class: 'btn small ghost' }, 'Empezar de nuevo');
    reset.addEventListener('click', function () { M.clear(el); m2.clasificar(el, cfg); });
    box.appendChild(h('div', { class: 'btnrow' }, score, reset));
    el.appendChild(box);
  };

  /* ---------- Deslizador con etiqueta y lectura ----------
     cfg = { id, etiqueta, min, max, step, valor, formato: function (v) -> texto, alCambiar: function (v) } */
  var nDesl = 0;
  m2.deslizador = function (cfg) {
    var id = cfg.id || ('m2r-' + (++nDesl));
    var lectura = h('output', { class: 'desl-v', for: id });
    var input = h('input', { type: 'range', id: id, min: cfg.min, max: cfg.max, step: cfg.step || 1, value: cfg.valor != null ? cfg.valor : cfg.min });
    function pintar() {
      var v = Number(input.value);
      lectura.textContent = cfg.formato ? cfg.formato(v) : String(v);
      if (cfg.alCambiar) cfg.alCambiar(v);
    }
    input.addEventListener('input', pintar);
    var el = h('div', { class: 'desl' }, h('label', { for: id }, rich(cfg.etiqueta)), input, lectura);
    setTimeout(pintar, 0);
    return { el: el, input: input, valor: function () { return Number(input.value); }, poner: function (v) { input.value = v; pintar(); } };
  };

  /* ---------- Duración aproximada de un taller ---------- */
  m2.minutos = function (t) {
    return t.secciones.reduce(function (acc, s) {
      if (s.tipo === 'leccion') return acc + (s.min || 6);
      if (s.tipo === 'figura') return acc + 4;
      if (s.tipo === 'nivel' || s.tipo === 'dato') return acc + 3;
      if (s.tipo === 'trampas') return acc + 20;
      if (s.tipo === 'reto' || s.tipo === 'ideas') return acc + 10;
      if (s.tipo === 'texto') return acc + 2;
      return acc;
    }, 0);
  };
})();
