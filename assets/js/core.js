/* =====================================================================
   core.js — utilidades compartidas del módulo
   - h() / s(): creación de nodos HTML y SVG
   - rich(): texto con citas APA clicables y etiquetas «Ejemplo:»
   - store: localStorage protegido con try/catch
   - formatos numéricos con punto para miles y coma para decimales
   - íconos y las ilustraciones de los cuatro objetos-símbolo
   ===================================================================== */
(function () {
  'use strict';
  var M = (window.M = window.M || {});
  M.talleres = M.talleres || [];
  M.widgets = M.widgets || {};

  /* ---------- DOM ---------- */
  function setAttrs(el, attrs, isSvg) {
    if (!attrs) return;
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el.setAttribute(k, v === true ? '' : v);
    });
  }
  function append(el, kids) {
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i];
      if (k == null || k === false) continue;
      if (Array.isArray(k)) { append(el, k); continue; }
      el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
    }
    return el;
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    setAttrs(el, attrs);
    return append(el, Array.prototype.slice.call(arguments, 2));
  }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    setAttrs(el, attrs, true);
    return append(el, Array.prototype.slice.call(arguments, 2));
  }
  function svgFrom(str) {
    var t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstChild;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

  /* ---------- Almacenamiento local (opcional) ---------- */
  var PREFIX = 'futuro-historia:';
  var store = {
    get: function (k, d) {
      try { var v = window.localStorage.getItem(PREFIX + k); return v == null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { window.localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ }
    },
    del: function (k) { try { window.localStorage.removeItem(PREFIX + k); } catch (e) { /* nada */ } },
    keys: function () {
      try { return Object.keys(window.localStorage).filter(function (k) { return k.indexOf(PREFIX) === 0; }); }
      catch (e) { return []; }
    }
  };

  /* ---------- Números (punto para miles, coma para decimales) ---------- */
  function miles(n) {
    var str = typeof n === 'bigint' ? n.toString() : String(Math.round(Number(n)));
    var neg = str.charAt(0) === '-';
    var d = neg ? str.slice(1) : str;
    return (neg ? '-' : '') + d.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function dec(x, digits) {
    if (digits == null) digits = 1;
    var fixed = Number(x).toFixed(digits);
    var parts = fixed.split('.');
    var ent = miles(parts[0]);
    return parts[1] ? ent + ',' + parts[1] : ent;
  }
  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function sup(n) { return String(n).split('').map(function (c) { return SUP[c] || c; }).join(''); }
  /* Notación científica de un BigInt o número: «9,22 × 10¹⁸» */
  function sci(v, digits) {
    if (digits == null) digits = 2;
    var str = typeof v === 'bigint' ? v.toString() : String(Math.round(v));
    var exp = str.length - 1;
    if (exp < 4) return miles(str);
    var mant = Number(str.slice(0, digits + 2)) / Math.pow(10, digits + 1);
    var m = mant.toFixed(digits);
    if (Number(m) >= 10) { m = (Number(m) / 10).toFixed(digits); exp++; }
    return m.replace('.', ',') + ' × 10' + sup(exp);
  }
  /* «2,1 mil millones», «15 billones»… en escala larga española */
  function enPalabras(v) {
    var big = typeof v === 'bigint' ? v : BigInt(Math.round(v));
    var escalas = [
      [BigInt('1000000000000000000'), 'trillones', 'trillón'],
      [BigInt('1000000000000000'), 'mil billones', 'mil billones'],
      [BigInt('1000000000000'), 'billones', 'billón'],
      [BigInt('1000000000'), 'mil millones', 'mil millones'],
      [BigInt('1000000'), 'millones', 'millón']
    ];
    for (var i = 0; i < escalas.length; i++) {
      var e = escalas[i];
      if (big >= e[0]) {
        var q = Number(big * 10n / e[0]) / 10;
        var txt = q >= 100 ? miles(Math.round(q)) : dec(q, q % 1 === 0 ? 0 : 1);
        return txt + ' ' + (q === 1 ? e[2] : e[1]);
      }
    }
    return miles(big);
  }

  /* ---------- Referencias y citas (un índice por módulo) ---------- */
  function normKey(k) { return String(k).replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim(); }
  M.normKey = normKey;
  M.refIndices = {};
  M.modActual = 'm1';
  M.indexRefs = function (mod, lista, prefijo) {
    mod = mod || 'm1';
    lista = lista || M.referencias || [];
    var idx = new Map();
    lista.forEach(function (r, i) {
      r.id = (prefijo || 'ref-') + (i + 1);
      idx.set(normKey(r.k), r);
    });
    M.refIndices[mod] = idx;
    if (mod === 'm1') M.refIndex = idx;
    return idx;
  };
  M.usarModulo = function (mod) { M.modActual = mod || 'm1'; };
  function refIdx() { return M.refIndices[M.modActual] || M.refIndices.m1 || new Map(); }
  M.buscarRef = function (key) { return refIdx().get(normKey(key)); };
  var YEAR = '(?:\\d{4}[a-z]?(?:\\/\\d{4})?|s\\. f\\.(?:-[a-z])?)';
  var SEG_RE = new RegExp('^(.+?), (' + YEAR + '(?:, ' + YEAR + ')*)$');
  var ONLY_YEARS = new RegExp('^' + YEAR + '(?:, ' + YEAR + ')*$');
  function splitYears(str) { return str.split(/, (?=\d{4}|s\. f\.)/); }
  /* Autor de una cita con palabras delante: «revisión de Carlsmith» → «Carlsmith»,
     «declarado, Intel» → «Intel». Si nada coincide, se deja la etiqueta entera. */
  function clave(label, y) {
    if (refIdx().get(normKey(label + ', ' + y))) return label;
    var w = label.split(' ');
    for (var i = 1; i < w.length && i <= 4; i++) {
      var cand = w.slice(i).join(' ');
      if (refIdx().get(normKey(cand + ', ' + y))) return cand;
    }
    return label;
  }
  /* Cada segmento separado por «; » es una cita (autor, año) o texto suelto,
     como en «(~0,16 Hz; Lennie, 2003)». */
  function parseCites(inner) {
    var segs = inner.split('; ');
    var out = [];
    var last = null;
    for (var i = 0; i < segs.length; i++) {
      var sg = segs[i];
      var m = sg.match(SEG_RE);
      if (m && !/^\d/.test(m[1])) {
        var label = m[1];
        var ab = label.match(/^(.*) \[(.+)\]$/);
        var key = ab ? ab[2] : clave(label, splitYears(m[2])[0]);
        last = key;
        out.push({ label: label, key: key, years: splitYears(m[2]) });
      } else if (last && ONLY_YEARS.test(sg)) {
        out.push({ label: null, key: last, years: splitYears(sg) });
      } else {
        out.push({ texto: sg });
      }
    }
    return out.some(function (s) { return !s.texto; }) ? out : null;
  }
  M.unresolved = [];
  function citeNode(segs, ninguna) {
    var span = h('span', { class: 'cita' });
    span.appendChild(document.createTextNode('('));
    var found = 0;
    segs.forEach(function (sg, i) {
      if (i) span.appendChild(document.createTextNode('; '));
      if (sg.texto != null) { span.appendChild(document.createTextNode(sg.texto)); return; }
      if (sg.label) span.appendChild(document.createTextNode(sg.label + ', '));
      sg.years.forEach(function (y, j) {
        if (j) span.appendChild(document.createTextNode(', '));
        var ref = refIdx().get(normKey(sg.key + ', ' + y));
        if (ref) {
          found++;
          span.appendChild(h('button', { type: 'button', 'data-ref': ref.id, 'aria-label': 'Ver referencia: ' + sg.key + ', ' + y }, y));
        } else {
          if (!ninguna) M.unresolved.push(M.modActual + ': ' + sg.key + ', ' + y);
          span.appendChild(document.createTextNode(y));
        }
      });
    });
    span.appendChild(document.createTextNode(')'));
    return found ? span : null;
  }
  /* Cita narrativa: «Azevedo et al. (2009)». Busca el autor en las palabras previas. */
  function citaNarrativa(previo, anios) {
    var palabras = previo.replace(/\s+$/, '').split(/\s+/);
    var ys = splitYears(anios);
    for (var n = Math.min(7, palabras.length); n >= 1; n--) {
      var autor = palabras.slice(palabras.length - n).join(' ').replace(/^[«(“"¿¡]+/, '');
      if (!autor) continue;
      if (refIdx().get(normKey(autor + ', ' + ys[0]))) return { key: autor, years: ys };
    }
    return null;
  }
  /* Formato en línea: **negrita**, *cursiva*, términos {{texto|g-id}}, marcas [medido],
     etiquetas de ejemplo y enlaces [texto](#destino) */
  var MARCAS = { medido: 'med', estimado: 'est', declarado: 'decl', proyectado: 'proy', extrapolado: 'extr' };
  M.MARCAS = MARCAS;
  /* Marca de evidencia: si el módulo tiene la entrada del glosario «g-marcas», se puede tocar
     para leer qué significa cada tipo de cifra (como los términos del glosario). */
  function tituloMarca(k) {
    var d = M.m2 && M.m2.marcas ? M.m2.marcas.filter(function (x) { return x.k === k; })[0] : null;
    return 'Tipo de cifra: ' + k + (d ? '. ' + d.d : '');
  }
  function marcaNodo(k) {
    var cls = 'marca m-' + (MARCAS[k] || k);
    if (M.terminos && M.terminos['g-marcas']) return h('button', { type: 'button', class: cls, 'data-g': 'g-marcas', title: tituloMarca(k) }, k);
    return h('span', { class: cls, title: tituloMarca(k) }, k);
  }
  M.marcaNodo = marcaNodo;
  var INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\{\{([^{}|]+)\|([a-z0-9-]+)\}\}|\[(medido|estimado|declarado|proyectado|extrapolado)\]|(Ejemplo cotidiano:|Ejemplo:|Analogía de cocina:)|\[([^\[\]]+)\]\((#[\w-]+|https?:\/\/[^)\s]+)\)/g;
  function inline(text, frag) {
    /* Expresión propia de cada llamada: la recursión (negrita dentro de cursiva) no comparte lastIndex */
    var re = new RegExp(INLINE.source, 'g'), last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[1]) { var b = h('strong'); inline(m[1], b); frag.appendChild(b); }
      else if (m[2]) { var e = h('em'); inline(m[2], e); frag.appendChild(e); }
      else if (m[3]) {
        var g = M.terminos && M.terminos[m[4]];
        if (g) frag.appendChild(h('button', { type: 'button', class: 'gterm', 'data-g': m[4], title: (g.sencillo || '').replace(/\*+/g, '').replace(/\{\{([^{}|]+)\|[a-z0-9-]+\}\}/g, '$1') }, m[3]));
        else frag.appendChild(document.createTextNode(m[3]));
      }
      else if (m[5]) frag.appendChild(marcaNodo(m[5]));
      else if (m[6]) frag.appendChild(h('span', { class: 'lbl-ej' }, m[6]));
      else { var a = h('a', { href: m[8] }); if (m[8].charAt(0) !== '#') { a.target = '_blank'; a.rel = 'noopener'; } inline(m[7], a); frag.appendChild(a); }
      last = re.lastIndex;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
  }
  var PAREN = /( ?)\(([^()]+)\)/g;
  function rich(text) {
    var frag = document.createDocumentFragment();
    if (text == null) return frag;
    text = String(text);
    var last = 0, m;
    PAREN.lastIndex = 0;
    while ((m = PAREN.exec(text))) {
      var node = null;
      if (ONLY_YEARS.test(m[2])) {
        var nar = citaNarrativa(text.slice(last, m.index), m[2]);
        if (nar) node = citeNode([{ label: null, key: nar.key, years: nar.years }], true);
      } else {
        var segs = parseCites(m[2]);
        if (segs) node = citeNode(segs);
      }
      if (!node) continue;
      inline(text.slice(last, m.index), frag);
      if (m[1]) node.insertBefore(document.createTextNode(' '), node.firstChild);
      frag.appendChild(node);
      last = PAREN.lastIndex;
    }
    inline(text.slice(last), frag);
    return frag;
  }
  function p(text, attrs) { return h('p', attrs || null, rich(text)); }

  /* ---------- Íconos (trazo, 24×24) ---------- */
  var I = {
    maquina: '<path d="M8 3v3M12 3v3M16 3v3M8 18v3M12 18v3M16 18v3M3 8h3M3 12h3M3 16h3M18 8h3M18 12h3M18 16h3"/><rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/>',
    ia: '<circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="7" r="2"/><circle cx="19" cy="17" r="2"/><path d="M6.8 8l3.4 2.8M6.8 16l3.4-2.8M13.8 11l3.4-2.6M13.8 13l3.4 2.6"/>',
    sociedad: '<circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6M14 14.5c.8-.4 1.6-.6 2.5-.6 2.6 0 4.5 2.3 4.5 5.1"/>',
    latam: '<path d="M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.3"/>',
    ficha: '<path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    prologo: '<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8 12h8M8 16h6"/>',
    linea: '<path d="M3 12h18"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 6v4M12 14v4M18 6v4"/>',
    conceptos: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    grafico: '<path d="M4 20V4M4 20h16"/><path d="M7 16l4-5 3 3 5-7"/>',
    caso: '<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M7 10h1M10 10h1M13 10h1M16 10h1M7 14h10"/>',
    hilo: '<path d="M4 20c4-2 4-6 8-8s4-6 8-8"/><circle cx="4" cy="20" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="20" cy="4" r="1.5"/>',
    mitos: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.2v.3"/>',
    cierre: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    memoria: '<rect x="4" y="3" width="16" height="4" rx="1"/><rect x="4" y="10" width="16" height="4" rx="1"/><rect x="4" y="17" width="16" height="4" rx="1"/>',
    ley: '<path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',
    futuro: '<path d="M12 2l2.4 6.6L21 9l-5.2 4.3L17.6 20 12 16.3 6.4 20l1.8-6.7L3 9l6.6-.4z"/>',
    lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    ajustes: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    libro: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    atras: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    pausa: '<path d="M8 5v14M16 5v14"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>',
    copiar: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    juego: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 11v4M6 13h4M15.5 12h.01M18 14h.01"/>',
    dinero: '<circle cx="12" cy="12" r="9"/><path d="M15 9.2c-.6-.9-1.7-1.4-3-1.4-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.3-3 2.3-1.4 0-2.6-.6-3.2-1.6M12 6v1.8M12 16.9v1.6"/>',
    trofeo: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9.5 17h5"/>',
    fuera: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6 1.3 0 2.4.4 3.4 1M15 15l5 5M20 15l-5 5"/>',
    idea: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    datos: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    computo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    brujula: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    capas: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    mano: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 11V8.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 15a1.6 1.6 0 0 1 2.6-1.8L7 14.5"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    red: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M7 12h3M13.7 11l3.6-3.8M13.7 13l3.6 3.8"/>',
    campana: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h1M4 12h1M4 18h1"/>',
    casa: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    cerebro: '<path d="M9.5 4.5a3 3 0 0 0-5 2.2 3 3 0 0 0-1 5 3 3 0 0 0 2 4.8 3 3 0 0 0 4.5 2.5V4.5zM14.5 4.5a3 3 0 0 1 5 2.2 3 3 0 0 1 1 5 3 3 0 0 1-2 4.8 3 3 0 0 1-4.5 2.5V4.5z"/>',
    rayo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    error: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    llave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M15 8l2 2"/>',
    ojo: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
  };
  function icon(name, cls) {
    var body = I[name] || I.idea;
    return svgFrom('<svg class="' + (cls || 'ic') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>');
  }

  /* ---------- Los cuatro objetos-símbolo ---------- */
  var OBJ = {
    valvula:
      '<svg viewBox="0 0 120 150" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<defs><radialGradient id="glowV" cx="50%" cy="58%" r="45%"><stop offset="0" stop-color="currentColor" stop-opacity=".55"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs>' +
      '<path d="M34 118V54c0-24 11-40 26-40s26 16 26 40v64z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="3"/>' +
      '<ellipse cx="60" cy="80" rx="30" ry="34" fill="url(#glowV)"/>' +
      '<rect x="46" y="56" width="28" height="46" rx="2" stroke="currentColor" stroke-width="2.5" fill="none" opacity=".75"/>' +
      '<path class="fil" d="M60 104V92l-5-4 10-6-10-6 10-6-5-4V60" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M50 30c4-6 8-8 14-8" stroke="currentColor" stroke-width="2" opacity=".45"/>' +
      '<rect x="28" y="116" width="64" height="16" rx="3" fill="currentColor"/>' +
      '<path d="M40 132v12M53 132v12M67 132v12M80 132v12" stroke="currentColor" stroke-width="3"/>' +
      '</svg>',
    chip:
      '<svg viewBox="0 0 150 150" aria-hidden="true" fill="none" stroke-linecap="round">' +
      '<g stroke="currentColor" stroke-width="3">' +
      '<path d="M45 28V14M60 28V14M75 28V14M90 28V14M105 28V14M45 136v-14M60 136v-14M75 136v-14M90 136v-14M105 136v-14M28 45H14M28 60H14M28 75H14M28 90H14M28 105H14M136 45h-14M136 60h-14M136 75h-14M136 90h-14M136 105h-14"/>' +
      '</g>' +
      '<rect x="28" y="28" width="94" height="94" rx="6" fill="currentColor"/>' +
      '<rect x="48" y="48" width="54" height="54" rx="2" fill="var(--surface)" opacity=".92"/>' +
      '<g stroke="currentColor" stroke-width="1.6" opacity=".9"><path d="M54 58h14v10h10V58h18M54 72h8v14h20v-8h14M54 92h26v6M88 90v8h8"/><circle cx="68" cy="68" r="2.2" fill="currentColor"/><circle cx="82" cy="86" r="2.2" fill="currentColor"/></g>' +
      '<circle cx="38" cy="38" r="3" fill="var(--surface)" opacity=".8"/>' +
      '</svg>',
    pc:
      '<svg viewBox="0 0 170 150" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="30" y="10" width="110" height="84" rx="8" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="3"/>' +
      '<rect x="42" y="21" width="86" height="60" rx="4" fill="currentColor"/>' +
      '<rect x="50" y="29" width="40" height="28" rx="1.5" fill="var(--surface)" opacity=".92"/>' +
      '<path d="M50 35h40" stroke="currentColor" stroke-width="3"/>' +
      '<rect x="80" y="44" width="40" height="28" rx="1.5" fill="var(--surface)" opacity=".75"/>' +
      '<path d="M80 50h40" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M98 66l6 6 3-3" stroke="var(--surface)" stroke-width="2.4"/>' +
      '<path d="M70 94l-6 14h42l-6-14" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="3"/>' +
      '<rect x="24" y="114" width="100" height="22" rx="3" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M34 121h4M44 121h4M54 121h4M64 121h4M74 121h4M84 121h4M94 121h4M104 121h4M114 121h2M40 129h64" stroke="currentColor" stroke-width="2.4"/>' +
      '<rect x="134" y="116" width="18" height="26" rx="9" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M143 116v-8c0-6 -6-8 -12-8" stroke="currentColor" stroke-width="2"/>' +
      '</svg>',
    telefono:
      '<svg viewBox="0 0 150 150" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M84 34a16 16 0 0 1 31-5 13 13 0 0 1 17 12 11 11 0 0 1-3 21H86a14 14 0 0 1-2-28z" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M76 76l14-10M66 70l2-8M82 84l12-4" stroke="currentColor" stroke-width="2.4" stroke-dasharray="1 6"/>' +
      '<rect x="22" y="40" width="54" height="100" rx="10" fill="currentColor"/>' +
      '<rect x="27" y="49" width="44" height="82" rx="4" fill="var(--surface)" opacity=".94"/>' +
      '<rect x="41" y="43" width="16" height="3" rx="1.5" fill="var(--surface)" opacity=".7"/>' +
      '<g fill="currentColor"><rect x="32" y="56" width="16" height="7" rx="3.5" opacity=".35"/><rect x="40" y="67" width="26" height="12" rx="5"/><rect x="32" y="83" width="22" height="7" rx="3.5" opacity=".35"/><rect x="44" y="94" width="22" height="12" rx="5"/></g>' +
      '<path d="M33 119h20" stroke="currentColor" stroke-width="2.4" opacity=".45"/>' +
      '</svg>'
  };
  function objeto(name) { return svgFrom(OBJ[name] || OBJ.valvula); }

  /* ---------- Varios ---------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function copiar(texto, btn) {
    function ok() { if (btn) { var o = btn.textContent; btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = o; }, 1600); } }
    function fallback() {
      var ta = h('textarea', { class: 'sr-only', readonly: true });
      ta.value = texto; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { /* se queda seleccionado */ }
      setTimeout(function () { ta.remove(); }, 0);
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }
  var audioCtx = null;
  function beep(freq, dur) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = freq || 660; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (dur || 0.4));
      o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + (dur || 0.4) + 0.05);
    } catch (e) { /* sin audio */ }
  }

  M.h = h; M.s = s; M.svgFrom = svgFrom; M.clear = clear; M.store = store;
  M.miles = miles; M.dec = dec; M.sci = sci; M.sup = sup; M.enPalabras = enPalabras;
  M.rich = rich; M.p = p; M.parseCites = parseCites; M.icon = icon; M.objeto = objeto;
  M.shuffle = shuffle; M.copiar = copiar; M.beep = beep;
  M.HILOS = {
    m: { n: 'Máquina', icon: 'maquina', d: 'Qué hace y qué tiene por dentro' },
    i: { n: 'IA', icon: 'ia', d: 'Ideas, logros y tropiezos' },
    s: { n: 'Sociedad', icon: 'sociedad', d: 'Quién financia, quién gana y quién queda por fuera' },
    l: { n: 'América Latina', icon: 'latam', d: 'La mirada desde la región y Colombia' }
  };
  M.LENTES = {
    f: { n: 'Quién financia', icon: 'dinero' },
    g: { n: 'Quién gana', icon: 'trofeo' },
    x: { n: 'Quién queda por fuera', icon: 'fuera' }
  };
})();
