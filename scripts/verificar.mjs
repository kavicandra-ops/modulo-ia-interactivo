// Verificaciones rápidas del contenido, sin navegador, para los dos módulos:
//  1. Toda cita «(Autor, año)» del texto tiene su referencia en la lista de su módulo.
//  2. Las referencias que nadie cita (aviso, no error).
//  3. Cada widget nombrado en los datos existe.
//  4. Módulo 2: cada término {{texto|g-id}} existe en el glosario, cada enlace
//     [texto](#destino) lleva a una página o sección real y cada ficha de evidencia
//     citada existe.
//  5. El simulador de Enigma reproduce el vector conocido AAAAA → BDZGO.
// Uso: node scripts/verificar.mjs
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const m2data = ['referencias', 'glosario', 'evidencias', 'analogias', 'modulo2']
  .concat(Array.from({ length: 10 }, (_, i) => 'taller' + String(i + 1).padStart(2, '0')))
  .map((n) => 'assets/js/m2/data/' + n + '.js');
const m2widgets = readdirSync(join(raiz, 'assets/js/m2/widgets')).filter((f) => f.endsWith('.js')).sort().map((f) => 'assets/js/m2/widgets/' + f);
const archivos = [
  'assets/js/core.js',
  'assets/js/data/referencias.js', 'assets/js/data/glosario.js', 'assets/js/data/modulo.js',
  'assets/js/data/taller1.js', 'assets/js/data/taller2.js', 'assets/js/data/taller3.js', 'assets/js/data/taller4.js',
  ...m2data,
  'assets/js/widgets/comunes.js', 'assets/js/widgets/inicio.js',
  'assets/js/widgets/taller1.js', 'assets/js/widgets/taller2.js', 'assets/js/widgets/taller3.js', 'assets/js/widgets/taller4.js',
  'assets/js/m2/core-m2.js', ...m2widgets
];
const ctx = { console, Map, Set, BigInt, Math, JSON, setTimeout, clearTimeout };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of archivos) vm.runInContext(readFileSync(join(raiz, f), 'utf8'), ctx, { filename: f });
const M = ctx.M, m2 = M.m2;
M.indexRefs();
M.indexRefs('m2', m2.referencias, 'm2ref-');
for (const [k, v] of Object.entries(m2.aliasRefs || {})) {
  const r = M.refIndices.m2.get(M.normKey(v));
  if (r) M.refIndices.m2.set(M.normKey(k), r);
}

const errores = [];
const avisos = [];
const norm = (k) => k.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
function recorrer(v, ruta, out) {
  if (typeof v === 'string') out.push([v, ruta]);
  else if (Array.isArray(v)) v.forEach((x, i) => recorrer(x, ruta + '[' + i + ']', out));
  else if (v && typeof v === 'object') Object.keys(v).forEach((k) => recorrer(v[k], ruta + '.' + k, out));
  return out;
}
function cadenasDeWidgets(rutas) {
  const src = rutas.map((r) => readFileSync(join(raiz, r), 'utf8')).join('\n');
  return [...src.matchAll(/'([^'\n]*\([^()'\n]*(?:\d{4}|s\. f\.)[^()'\n]*\)[^'\n]*)'/g)].map((m) => [m[1], 'widgets']);
}

/* Citas: un recorrido por módulo, con el índice de referencias de ese módulo */
function revisarCitas(mod, textos, lista, excepciones) {
  M.usarModulo(mod);
  const idx = M.refIndices[mod];
  const citadas = new Set();
  const PAREN = /\(([^()]+)\)/g;
  for (const [t, ruta] of textos) {
    for (const m of t.matchAll(PAREN)) {
      const segs = M.parseCites(m[1]);
      if (!segs) {
        if (excepciones.includes(m[1])) continue;
        if (/\b(1[89]\d\d|20\d\d)[a-z]?\b|s\. f\./.test(m[1]) && /, (1[89]\d\d|20\d\d|s\. f\.)/.test(m[1]) && !/^\d/.test(m[1])) avisos.push(mod + ' · ¿Cita mal formada? «(' + m[1] + ')» en ' + ruta);
        continue;
      }
      for (const sg of segs) {
        if (sg.texto != null) continue;
        for (const y of sg.years) {
          const k = norm(sg.key + ', ' + y);
          const r = idx.get(k);
          if (r) citadas.add(r.k);
          else errores.push(mod + ' · Cita sin referencia: «' + k + '» en ' + ruta);
        }
      }
    }
    // Citas narrativas: «Azevedo et al. (2009)»
    for (const m of t.matchAll(/([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚáéíóúñü'’.-]*(?: (?:et al\.|y|&|de|del|[A-ZÁÉÍÓÚÑ][\wáéíóúñü'’.-]*))*) \((\d{4}[a-z]?)\)/g)) {
      const pal = m[1].split(' ');
      for (let n = Math.min(7, pal.length); n >= 1; n--) {
        const r = idx.get(norm(pal.slice(pal.length - n).join(' ') + ', ' + m[2]));
        if (r) { citadas.add(r.k); break; }
      }
    }
  }
  for (const r of lista) if (!citadas.has(r.k)) avisos.push(mod + ' · Referencia sin citar: ' + r.k);
  return citadas.size;
}

/* ---------- Módulo 1 ---------- */
const textos1 = recorrer({ modulo: M.modulo, talleres: M.talleres }, 'M', []).concat(cadenasDeWidgets(['inicio', 'taller1', 'taller2', 'taller3', 'taller4'].map((n) => 'assets/js/widgets/' + n + '.js')));
const citadas1 = revisarCitas('m1', textos1, M.referencias, ['Stanford, 1972–1980']);

const nombres1 = new Set();
for (const t of M.talleres) for (const s of t.secciones) {
  if (s.widget) nombres1.add(s.widget);
  (s.widgets || []).forEach((w) => nombres1.add(w));
  (s.labs || []).forEach((l) => nombres1.add(l.id));
  ['items', 'notas', 'actividades'].forEach((k) => (s[k] || []).forEach((it) => it.widget && nombres1.add(it.widget)));
}
['anatomia', 'clima', 'memoria'].forEach((n) => nombres1.add(n));
for (const n of nombres1) if (typeof M.widgets[n] !== 'function') errores.push('m1 · Widget inexistente: ' + n);

/* ---------- Módulo 2 ---------- */
const textos2 = recorrer({ modulo: m2.modulo, fuentes: m2.fuentes, talleres: m2.talleres, evidencias: m2.evidencias, glosario: m2.glosario }, 'm2', []).concat(cadenasDeWidgets(m2widgets));
const citadas2 = revisarCitas('m2', textos2, m2.referencias, []);

const nombres2 = new Set(['m2.classify-figtypes']);
(function widgets(v) {
  if (Array.isArray(v)) return v.forEach(widgets);
  if (!v || typeof v !== 'object') return;
  if (typeof v.widget === 'string') nombres2.add(v.widget);
  if (v.tipo && typeof v.actividad === 'string') nombres2.add('m2.' + v.actividad);
  Object.values(v).forEach(widgets);
})(m2.talleres);
for (const n of nombres2) if (typeof M.widgets[n] !== 'function') errores.push('m2 · Widget inexistente: ' + n);

const idsGlos = new Set(m2.glosario.map((g) => g.id));
const anclas = new Set(['inicio', 'modulo1', 'modulo2', 'm2glosario', 'm2fuentes', 'glosario', 'referencias', 'juego',
  'modulo2-presentacion', 'modulo2-como', 'modulo2-mapa', 'modulo2-mas']);
m2.talleres.forEach((t) => { anclas.add(t.slug); anclas.add(t.slug + '-ficha'); t.secciones.forEach((s) => anclas.add(t.slug + '-' + s.id)); });
M.talleres.forEach((t) => anclas.add(t.slug));
m2.glosario.forEach((g) => anclas.add('m2glosario-' + g.id));
m2.talleres.forEach((t) => t.secciones.forEach((s) => (s.items || []).forEach((it, i) => { if (s.tipo === 'trampas') anclas.add(t.slug + '-trampa-' + (i + 1)); })));
let terminos = 0, enlaces = 0;
for (const [t, ruta] of textos2) {
  for (const m of t.matchAll(/\{\{([^{}|]+)\|([a-z0-9-]+)\}\}/g)) { terminos++; if (!idsGlos.has(m[2])) errores.push('m2 · Término de glosario inexistente: ' + m[0] + ' en ' + ruta); }
  for (const m of t.matchAll(/\[([^[\]]+)\]\((#[\w-]+)\)/g)) { enlaces++; if (!anclas.has(m[2].slice(1))) errores.push('m2 · Enlace roto: ' + m[0] + ' en ' + ruta); }
  if (/PENDIENTE/.test(t)) errores.push('m2 · Texto pendiente en ' + ruta);
}
m2.glosario.forEach((g) => (g.enlaces || []).forEach((e) => { enlaces++; if (!anclas.has(e[1].slice(1))) errores.push('m2 · Enlace roto en el glosario: ' + g.id + ' → ' + e[1]); }));
const fichas = new Set();
m2.talleres.forEach((t) => t.secciones.forEach((s) => {
  [s.evidencia].concat(s.evidencias || []).filter(Boolean).forEach((id) => { fichas.add(id); if (!m2.evidencias[id]) errores.push('m2 · Ficha de evidencia inexistente: ' + id + ' en ' + t.slug + '-' + s.id); });
}));
Object.keys(m2.evidencias).forEach((id) => { if (!fichas.has(id)) avisos.push('m2 · Ficha de evidencia que ningún taller muestra: ' + id); });

/* ---------- Enigma ---------- */
const enigma = M.enigma.texto('AAAAA', [0, 0, 0], {});
if (enigma !== 'BDZGO') errores.push('Enigma: se esperaba BDZGO y salió ' + enigma);
const ida = M.enigma.texto('HOLADESDEBOGOTA', [3, 11, 20], { A: 'B', B: 'A', C: 'Q', Q: 'C' });
const vuelta = M.enigma.texto(ida, [3, 11, 20], { A: 'B', B: 'A', C: 'Q', Q: 'C' });
if (vuelta !== 'HOLADESDEBOGOTA') errores.push('Enigma no es recíproca: ' + vuelta);
if ([...ida].some((c, i) => c === 'HOLADESDEBOGOTA'[i])) errores.push('Enigma cifró una letra como sí misma');

console.log('Módulo 1 · textos: ' + textos1.length + ' · referencias: ' + M.referencias.length + ' · citadas: ' + citadas1 + ' · widgets: ' + nombres1.size + ' · Enigma AAAAA → ' + enigma);
console.log('Módulo 2 · textos: ' + textos2.length + ' · referencias: ' + m2.referencias.length + ' · citadas: ' + citadas2 + ' · widgets: ' + nombres2.size + ' · términos: ' + terminos + ' · enlaces: ' + enlaces + ' · fichas: ' + fichas.size + '/' + Object.keys(m2.evidencias).length);
avisos.forEach((a) => console.log('AVISO  ' + a));
errores.forEach((e) => console.log('ERROR  ' + e));
if (errores.length) { console.log(errores.length + ' error(es).'); process.exit(1); }
console.log('Todo en orden.');
