/* Widgets compartidos: gráfico logarítmico, clima de la IA y anatomías clicables. */
(function () {
  'use strict';
  var M = window.M, h = M.h, s = M.s, W = M.widgets;

  /* ---------- Gráfico de dispersión con eje vertical logarítmico ---------- */
  M.logChart = function (el, cfg) {
    var VW = 820, VH = 430, m = { l: cfg.ml || 92, r: 30, t: 22, b: 46 };
    var lmin = Math.log10(cfg.yMin), lmax = Math.log10(cfg.yMax);
    function sx(x) { return m.l + (x - cfg.xMin) / (cfg.xMax - cfg.xMin) * (VW - m.l - m.r); }
    function sy(y) { return m.t + (1 - (Math.log10(y) - lmin) / (lmax - lmin)) * (VH - m.t - m.b); }
    var svg = s('svg', { viewBox: '0 0 ' + VW + ' ' + VH, role: 'img', 'aria-label': cfg.aria });
    var grid = s('g');
    for (var e = lmin; e <= lmax; e++) {
      var y = sy(Math.pow(10, e));
      grid.appendChild(s('line', { class: 'chart-grid', x1: m.l, x2: VW - m.r, y1: y, y2: y }));
      grid.appendChild(s('text', { class: 'chart-text', x: m.l - 10, y: y + 4, 'text-anchor': 'end' }, cfg.yFmt(Math.pow(10, e))));
    }
    for (var x = Math.ceil(cfg.xMin / 10) * 10; x <= cfg.xMax; x += 10) {
      grid.appendChild(s('line', { class: 'chart-axis', x1: sx(x), x2: sx(x), y1: VH - m.b, y2: VH - m.b + 6 }));
      grid.appendChild(s('text', { class: 'chart-text', x: sx(x), y: VH - m.b + 22, 'text-anchor': 'middle' }, String(x)));
    }
    grid.appendChild(s('line', { class: 'chart-axis', x1: m.l, x2: VW - m.r, y1: VH - m.b, y2: VH - m.b }));
    grid.appendChild(s('text', { class: 'chart-text', x: m.l - 10, y: 12, 'text-anchor': 'end' }, cfg.yLabel || ''));
    svg.appendChild(grid);

    if (cfg.ref) {
      var d = '', first = true;
      for (var xx = cfg.ref.from; xx <= cfg.ref.to; xx += 0.5) {
        var yy = cfg.ref.fn(xx);
        if (yy < cfg.yMin || yy > cfg.yMax) continue;
        d += (first ? 'M' : 'L') + sx(xx).toFixed(1) + ' ' + sy(yy).toFixed(1) + ' ';
        first = false;
      }
      svg.appendChild(s('path', { d: d, fill: 'none', stroke: 'var(--ink-3)', 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
      var lx = cfg.ref.labelAt;
      svg.appendChild(s('text', { class: 'chart-text', x: sx(lx) - 6, y: sy(cfg.ref.fn(lx)) - 10, 'text-anchor': 'end', style: 'font-style:italic' }, cfg.ref.label));
    }
    (cfg.marcas || []).forEach(function (mk) {
      var g = s('g', { class: 'chart-pt', tabindex: '0', role: 'button', 'aria-label': mk.aria });
      var cx = sx(mk.x), cy = sy(mk.y);
      g.appendChild(s('circle', { cx: cx, cy: cy, r: 9, fill: 'var(--surface)', stroke: 'var(--bad)', 'stroke-width': 2, 'stroke-dasharray': '3 3' }));
      g.appendChild(s('path', { d: 'M' + (cx - 4) + ' ' + (cy - 4) + 'l8 8M' + (cx + 4) + ' ' + (cy - 4) + 'l-8 8', stroke: 'var(--bad)', 'stroke-width': 2 }));
      g.appendChild(s('text', { class: 'chart-text', x: cx - 14, y: cy + 4, 'text-anchor': 'end', fill: 'var(--bad)' }, mk.label));
      ligarTip(g, mk.tip, cx, cy);
      svg.appendChild(g);
    });
    cfg.puntos.forEach(function (pt) {
      var g = s('g', { class: 'chart-pt', tabindex: '0', role: 'button', 'aria-label': pt.nombre + ', ' + pt.x + ': ' + cfg.yFmtLargo(pt.y) });
      var cx = sx(pt.x), cy = sy(pt.y);
      g.appendChild(s('circle', { cx: cx, cy: cy, r: 7, fill: 'var(--accent)', stroke: 'var(--surface)', 'stroke-width': 2 }));
      if (pt.lab) {
        var off = { r: [12, 4, 'start'], l: [-12, 4, 'end'], a: [0, -13, 'middle'], b: [0, 22, 'middle'], al: [-6, -10, 'end'], br: [8, 20, 'start'] }[pt.lab];
        g.appendChild(s('text', { class: 'chart-text-strong', x: cx + off[0], y: cy + off[1], 'text-anchor': off[2] }, pt.nombre));
      }
      ligarTip(g, '<b>' + pt.nombre + '</b> · ' + pt.x + '<br>' + cfg.yFmtLargo(pt.y) + (pt.nota ? '<br>' + pt.nota : ''), cx, cy);
      svg.appendChild(g);
    });
    function ligarTip(g, html, cx, cy) {
      function show() {
        var r = svg.getBoundingClientRect();
        var k = r.width / VW;
        M.tipShow(html, r.left + cx * k, r.top + cy * k);
      }
      g.addEventListener('mouseenter', show);
      g.addEventListener('focus', show);
      g.addEventListener('click', show);
      g.addEventListener('mouseleave', M.tipHide);
      g.addEventListener('blur', M.tipHide);
    }
    el.appendChild(h('div', { class: 'chartwrap' }, svg));
    var tabla = h('table', null, h('thead', null, h('tr', null, h('th', null, 'Año'), h('th', null, cfg.colNombre), h('th', null, cfg.colValor))),
      h('tbody', null, cfg.puntos.map(function (pt) { return h('tr', null, h('td', null, pt.x), h('td', null, pt.nombre), h('td', null, cfg.yFmtLargo(pt.y))); })));
    el.appendChild(h('details', { class: 'datos' }, h('summary', null, 'Ver los datos en tabla'), h('div', { class: 'tablewrap' }, tabla)));
  };

  /* ---------- El clima de la IA (portada) ---------- */
  W.clima = function (el) {
    var VW = 1000, VH = 270, x0 = 60, x1 = 975;
    function sx(y) { return x0 + (y - 1936) / 90 * (x1 - x0); }
    var NIV = { alto: 62, medio: 100, bajo: 140 };
    var tramos = [
      [1936, 1956, 'medio', null, 'neutro'],
      [1956, 1974, 'alto', 'Grandes promesas', 'calido'],
      [1974, 1980, 'bajo', 'Primer invierno', 'frio'],
      [1980, 1987, 'alto', 'Sistemas expertos', 'calido'],
      [1987, 1993, 'bajo', 'Segundo invierno', 'frio'],
      [1993, 2012, 'medio', 'Renacer silencioso', 'neutro'],
      [2012, 2026, 'alto', 'Auge', 'calido']
    ];
    var COL = { calido: 'var(--warn)', frio: 'var(--cold)', neutro: 'var(--ink-3)' };
    var svg = s('svg', { viewBox: '0 0 ' + VW + ' ' + VH, role: 'img', 'aria-label': 'Esquema del clima de la IA de 1936 a 2026: nace en 1956, grandes promesas, primer invierno entre 1974 y 1980, auge de los sistemas expertos, segundo invierno a finales de los ochenta y comienzos de los noventa, renacer silencioso y auge desde 2012.' });
    svg.appendChild(s('text', { class: 'chart-text', x: 8, y: NIV.alto + 4 }, 'Auge'));
    svg.appendChild(s('text', { class: 'chart-text', x: 8, y: NIV.bajo + 4 }, 'Invierno'));
    [NIV.alto, NIV.medio, NIV.bajo].forEach(function (y) { svg.appendChild(s('line', { class: 'chart-grid', x1: x0, x2: x1, y1: y, y2: y, 'stroke-dasharray': '2 4' })); });
    var dPrev = null;
    tramos.forEach(function (tr, i) {
      var y = NIV[tr[2]];
      if (tr[4] === 'frio') svg.appendChild(s('rect', { x: sx(tr[0]), y: 30, width: sx(tr[1]) - sx(tr[0]), height: 140, fill: 'var(--cold)', 'fill-opacity': 0.12 }));
      if (tr[4] === 'calido' && tr[3] === 'Auge') svg.appendChild(s('rect', { x: sx(tr[0]), y: 30, width: sx(tr[1]) - sx(tr[0]), height: 140, fill: 'var(--warn)', 'fill-opacity': 0.1 }));
      if (dPrev !== null) svg.appendChild(s('line', { x1: sx(tr[0]), x2: sx(tr[0]), y1: dPrev, y2: y, stroke: 'var(--ink-3)', 'stroke-width': 2 }));
      svg.appendChild(s('line', { x1: sx(tr[0]), x2: sx(tr[1]), y1: y, y2: y, stroke: COL[tr[4]], 'stroke-width': 5, 'stroke-linecap': 'round' }));
      if (tr[3]) {
        var cx = (sx(tr[0]) + sx(tr[1])) / 2;
        var ly = tr[2] === 'bajo' ? y + 22 : y - 12;
        svg.appendChild(s('text', { class: 'chart-text', x: cx, y: ly, 'text-anchor': 'middle', fill: COL[tr[4]] }, tr[3]));
      }
      dPrev = y;
    });
    [[1956, 'alto', '1956 · Nace la IA', -1], [1997, 'medio', '1997 · Deep Blue', -1], [2012, 'alto', '2012 · AlexNet', -2], [2022, 'alto', '2022 · ChatGPT', -1]].forEach(function (mk) {
      var cx = sx(mk[0]), cy = NIV[mk[1]];
      svg.appendChild(s('circle', { cx: cx, cy: cy, r: 6, fill: 'var(--surface)', stroke: 'var(--ink)', 'stroke-width': 2.5 }));
      svg.appendChild(s('text', { class: 'chart-text-strong', x: cx, y: cy + (mk[3] === -2 ? -30 : -14), 'text-anchor': mk[0] === 2022 ? 'end' : 'middle' }, mk[2]));
    });
    var eras = [[1936, 1960, 't1', 'Válvula'], [1960, 1980, 't2', 'Chip'], [1980, 2000, 't3', 'PC'], [2000, 2026, 't4', 'Teléfono inteligente']];
    eras.forEach(function (e) {
      svg.appendChild(s('rect', { x: sx(e[0]), y: 190, width: sx(e[1]) - sx(e[0]) - 2, height: 30, fill: 'var(--' + e[2] + ')' }));
      svg.appendChild(s('text', { x: (sx(e[0]) + sx(e[1])) / 2, y: 210, 'text-anchor': 'middle', fill: 'var(--on-accent)', style: 'font-family:var(--f-body);font-weight:700;font-size:13px' }, e[3]));
    });
    svg.appendChild(s('text', { class: 'chart-text', x: 8, y: 210 }, 'Época'));
    for (var y = 1940; y <= 2020; y += 10) {
      svg.appendChild(s('line', { class: 'chart-axis', x1: sx(y), x2: sx(y), y1: 222, y2: 230 }));
      svg.appendChild(s('text', { class: 'chart-text', x: sx(y), y: 248, 'text-anchor': 'middle' }, String(y)));
    }
    el.appendChild(h('div', { class: 'chartwrap' }, svg));
  };

  /* ---------- Anatomías clicables ---------- */
  var DIBUJOS = {
    pc:
      '<svg viewBox="0 0 520 370" role="group" aria-label="Esquema de una PC de los noventa">' +
      '<defs><pattern id="pcgrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="var(--line)" stroke-width="1"/></pattern></defs>' +
      // monitor
      '<rect x="18" y="20" width="220" height="168" rx="12" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<path d="M98 188l-10 26h80l-10-26" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<rect x="20" y="236" width="216" height="52" rx="6" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<g stroke="var(--ink-3)" stroke-width="2.4" stroke-linecap="round"><path d="M34 252h12M54 252h12M74 252h12M94 252h12M114 252h12M134 252h12M154 252h12M174 252h12M194 252h12M214 252h8M40 266h170M60 278h130"/></g>' +
      '<rect x="252" y="252" width="22" height="34" rx="11" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<g class="an-part" data-k="so" tabindex="0" role="button"><rect x="34" y="34" width="188" height="132" rx="6" fill="var(--t3)"/>' +
      '<rect x="48" y="46" width="96" height="66" rx="2" fill="var(--surface)"/><rect x="48" y="46" width="96" height="11" fill="var(--ink-2)"/>' +
      '<rect x="112" y="80" width="96" height="66" rx="2" fill="var(--surface)"/><rect x="112" y="80" width="96" height="11" fill="var(--ink-2)"/>' +
      '<path d="M120 102h60M120 112h70M120 122h40" stroke="var(--line-2)" stroke-width="4"/>' +
      '<rect class="hl" x="30" y="30" width="196" height="140" rx="8"/></g>' +
      // torre abierta
      '<rect x="288" y="12" width="218" height="346" rx="8" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<g class="an-part" data-k="placa" tabindex="0" role="button"><rect x="300" y="146" width="194" height="200" rx="3" fill="url(#pcgrid)" stroke="var(--t2)" stroke-width="3"/>' +
      '<path d="M376 186h30M376 196h30M440 210v40M300 330h194" stroke="var(--t2)" stroke-width="1.5" opacity=".7"/>' +
      '<rect class="hl" x="300" y="146" width="194" height="200" rx="3"/></g>' +
      '<g class="an-part" data-k="unidades" tabindex="0" role="button"><rect x="304" y="28" width="132" height="26" rx="2" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/>' +
      '<path d="M314 41h70" stroke="var(--ink-3)" stroke-width="3"/><circle cx="420" cy="41" r="4" fill="var(--ink-3)"/>' +
      '<rect x="304" y="60" width="132" height="18" rx="2" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/><path d="M340 69h50" stroke="var(--ink-2)" stroke-width="4"/>' +
      '<rect class="hl" x="300" y="24" width="140" height="58" rx="3"/></g>' +
      '<g class="an-part" data-k="disco" tabindex="0" role="button"><rect x="304" y="88" width="104" height="48" rx="3" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/>' +
      '<circle cx="340" cy="112" r="17" fill="none" stroke="var(--ink-3)" stroke-width="2"/><circle cx="340" cy="112" r="3" fill="var(--ink-3)"/><path d="M392 96l-40 14" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<rect class="hl" x="300" y="84" width="112" height="56" rx="3"/></g>' +
      '<g class="an-part" data-k="cpu" tabindex="0" role="button"><rect x="314" y="160" width="56" height="56" rx="2" fill="var(--ink-2)"/>' +
      '<path d="M320 168h44M320 176h44M320 184h44M320 192h44M320 200h44M320 208h44" stroke="var(--line-2)" stroke-width="2"/>' +
      '<rect class="hl" x="310" y="156" width="64" height="64" rx="3"/></g>' +
      '<g class="an-part" data-k="ram" tabindex="0" role="button"><rect x="384" y="156" width="10" height="70" fill="var(--t2)"/><rect x="398" y="156" width="10" height="70" fill="var(--t2)"/><rect x="412" y="156" width="10" height="70" fill="var(--t2)"/>' +
      '<path d="M386 166v50M400 166v50M414 166v50" stroke="var(--surface)" stroke-width="2" stroke-dasharray="4 4"/>' +
      '<rect class="hl" x="380" y="152" width="46" height="78" rx="3"/></g>' +
      '<g class="an-part" data-k="bios" tabindex="0" role="button"><rect x="440" y="164" width="34" height="20" rx="1" fill="var(--ink)"/><path d="M444 164v-4M452 164v-4M460 164v-4M468 164v-4M444 184v4M452 184v4M460 184v4M468 184v4" stroke="var(--ink)" stroke-width="2"/>' +
      '<rect class="hl" x="434" y="154" width="46" height="40" rx="3"/></g>' +
      '<g class="an-part" data-k="tarjetas" tabindex="0" role="button"><rect x="312" y="252" width="160" height="16" rx="1" fill="var(--t1)"/><rect x="312" y="276" width="160" height="16" rx="1" fill="var(--t4)"/><rect x="312" y="300" width="160" height="16" rx="1" fill="var(--t3)"/>' +
      '<path d="M320 268v6M330 268v6M340 268v6M350 268v6M320 292v6M330 292v6M340 292v6M320 316v6M330 316v6M340 316v6" stroke="var(--warn)" stroke-width="2"/>' +
      '<rect class="hl" x="306" y="246" width="172" height="80" rx="3"/></g>' +
      '</svg>',
    telefono:
      '<svg viewBox="0 0 520 370" role="group" aria-label="Esquema de un teléfono inteligente, de frente y abierto">' +
      '<text x="105" y="362" text-anchor="middle" class="chart-text">De frente</text><text x="375" y="362" text-anchor="middle" class="chart-text">Por dentro</text>' +
      '<g class="an-part" data-k="pantalla" tabindex="0" role="button"><rect x="30" y="14" width="150" height="326" rx="26" fill="var(--ink)"/>' +
      '<rect x="40" y="30" width="130" height="296" rx="16" fill="var(--t4)" opacity=".85"/>' +
      '<g fill="var(--surface)" opacity=".9"><rect x="52" y="62" width="50" height="16" rx="8"/><rect x="88" y="86" width="70" height="26" rx="10"/><rect x="52" y="120" width="64" height="16" rx="8"/><rect x="80" y="144" width="78" height="26" rx="10"/></g>' +
      '<rect class="hl" x="26" y="10" width="158" height="334" rx="28"/></g>' +
      '<g class="an-part" data-k="sensores" tabindex="0" role="button"><rect x="88" y="20" width="34" height="8" rx="4" fill="var(--ink-3)"/><circle cx="114" cy="24" r="3" fill="var(--surface)"/>' +
      '<rect x="270" y="26" width="58" height="96" rx="14" fill="var(--paper-2)" stroke="var(--ink-2)" stroke-width="2"/>' +
      '<circle cx="299" cy="52" r="15" fill="var(--ink)" stroke="var(--ink-3)" stroke-width="3"/><circle cx="299" cy="94" r="15" fill="var(--ink)" stroke="var(--ink-3)" stroke-width="3"/>' +
      '<rect class="hl" x="84" y="14" width="44" height="20" rx="6"/><rect class="hl" x="264" y="20" width="70" height="108" rx="16"/></g>' +
      '<rect x="256" y="14" width="238" height="326" rx="26" fill="none" stroke="var(--ink-2)" stroke-width="3"/>' +
      '<g class="an-part" data-k="modem" tabindex="0" role="button"><path d="M290 18h170M290 336h170" stroke="var(--t3)" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="444" y="30" width="34" height="40" rx="2" fill="var(--t3)"/><path d="M452 40h18M452 50h18M452 60h18" stroke="var(--surface)" stroke-width="2"/>' +
      '<rect class="hl" x="284" y="10" width="182" height="14" rx="4"/><rect class="hl" x="284" y="330" width="182" height="14" rx="4"/><rect class="hl" x="440" y="26" width="42" height="48" rx="3"/></g>' +
      '<rect x="336" y="26" width="102" height="118" rx="4" fill="var(--paper-2)" stroke="var(--t2)" stroke-width="2"/>' +
      '<g class="an-part" data-k="soc" tabindex="0" role="button"><rect x="344" y="36" width="54" height="54" rx="3" fill="var(--ink)"/>' +
      '<g fill="var(--surface)" opacity=".55"><rect x="350" y="42" width="18" height="18"/><rect x="372" y="42" width="20" height="18"/><rect x="350" y="64" width="42" height="9"/><rect x="350" y="76" width="42" height="8"/></g>' +
      '<rect class="hl" x="340" y="32" width="62" height="62" rx="4"/></g>' +
      '<g class="an-part" data-k="ram" tabindex="0" role="button"><rect x="404" y="36" width="30" height="24" rx="2" fill="var(--t2)"/><path d="M408 48h22" stroke="var(--surface)" stroke-width="2"/>' +
      '<rect class="hl" x="400" y="32" width="38" height="32" rx="3"/></g>' +
      '<g class="an-part" data-k="flash" tabindex="0" role="button"><rect x="404" y="66" width="30" height="24" rx="2" fill="var(--t1)"/><path d="M408 78h22" stroke="var(--surface)" stroke-width="2"/>' +
      '<rect class="hl" x="400" y="62" width="38" height="32" rx="3"/></g>' +
      '<g class="an-part" data-k="bateria" tabindex="0" role="button"><rect x="276" y="160" width="198" height="160" rx="12" fill="var(--paper-2)" stroke="var(--ok)" stroke-width="3"/>' +
      '<path d="M368 200l-18 38h24l-14 38" fill="none" stroke="var(--ok)" stroke-width="4" stroke-linejoin="round"/>' +
      '<rect class="hl" x="272" y="156" width="206" height="168" rx="14"/></g>' +
      '</svg>'
  };
  W.anatomia = function (el, ctx) {
    var partes = ctx.partes;
    var wrap = h('div', { class: 'anatomia' });
    var dibujo = h('div', { class: 'an-svg' });
    dibujo.appendChild(M.svgFrom(DIBUJOS[ctx.tipo]));
    var info = h('div', { class: 'an-info', 'aria-live': 'polite' });
    var lista = h('div', { class: 'an-list', role: 'group', 'aria-label': 'Piezas' });
    var botones = {};
    function elegir(k) {
      var pz = partes.filter(function (x) { return x.k === k; })[0];
      if (!pz) return;
      Array.prototype.forEach.call(dibujo.querySelectorAll('.an-part'), function (g) { g.classList.toggle('on', g.getAttribute('data-k') === k); });
      Object.keys(botones).forEach(function (b) { botones[b].setAttribute('aria-pressed', String(b === k)); });
      M.clear(info);
      info.appendChild(h('h4', null, pz.t));
      info.appendChild(h('dl', null, h('div', null, h('dt', null, 'Qué hace'), h('dd', null, pz.d)), h('div', null, h('dt', null, 'Analogía cotidiana'), h('dd', null, pz.a))));
    }
    partes.forEach(function (pz, i) {
      botones[pz.k] = h('button', { type: 'button', 'aria-pressed': 'false', onclick: function () { elegir(pz.k); } }, h('span', { class: 'k' }, String(i + 1).padStart(2, '0')), pz.t);
      lista.appendChild(botones[pz.k]);
    });
    Array.prototype.forEach.call(dibujo.querySelectorAll('.an-part'), function (g) {
      var k = g.getAttribute('data-k');
      var pz = partes.filter(function (x) { return x.k === k; })[0];
      if (pz) g.setAttribute('aria-label', pz.t);
      g.addEventListener('click', function () { elegir(k); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(k); } });
    });
    wrap.appendChild(h('div', { class: 'stack' }, dibujo, h('span', { class: 'w-note-s' }, 'Esquema simplificado, no a escala.')));
    wrap.appendChild(h('div', { class: 'stack' }, info, lista));
    el.appendChild(wrap);
    elegir(partes[0].k);
  };
})();
