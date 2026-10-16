// Verificaciones rápidas del contenido, sin navegador:
//  1. Toda cita «(Autor, año)» del texto tiene su referencia en la lista.
//  2. Las referencias que nadie cita (aviso, no error).
//  3. Cada widget nombrado en los datos existe.
//  4. El simulador de Enigma reproduce el vector conocido AAAAA → BDZGO.
// Uso: node scripts/verificar.mjs
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const archivos = [
  'assets/js/core.js',
  'assets/js/data/referencias.js', 'assets/js/data/glosario.js', 'assets/js/data/modulo.js',
  'assets/js/data/taller1.js', 'assets/js/data/taller2.js', 'assets/js/data/taller3.js', 'assets/js/data/taller4.js',
  'assets/js/widgets/comunes.js', 'assets/js/widgets/inicio.js',
  'assets/js/widgets/taller1.js', 'assets/js/widgets/taller2.js', 'assets/js/widgets/taller3.js', 'assets/js/widgets/taller4.js'
];
const ctx = { console, Map, BigInt, Math, JSON };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of archivos) vm.runInContext(readFileSync(join(raiz, f), 'utf8'), ctx, { filename: f });
const M = ctx.M;
M.indexRefs();

const errores = [];
const avisos = [];
const citadas = new Set();
const textos = [];
(function recorrer(v, ruta) {
  if (typeof v === 'string') textos.push([v, ruta]);
  else if (Array.isArray(v)) v.forEach((x, i) => recorrer(x, ruta + '[' + i + ']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach((k) => recorrer(v[k], ruta + '.' + k));
})({ modulo: M.modulo, talleres: M.talleres }, 'M');

// Cadenas de widgets que llevan citas
const widgetsSrc = ['inicio', 'taller1', 'taller2', 'taller3', 'taller4'].map((n) => readFileSync(join(raiz, 'assets/js/widgets/' + n + '.js'), 'utf8')).join('\n');
for (const m of widgetsSrc.matchAll(/'([^'\n]*\([^()'\n]*(?:\d{4}|s\. f\.)[^()'\n]*\)[^'\n]*)'/g)) textos.push([m[1], 'widgets']);

const norm = (k) => k.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
const PAREN = /\(([^()]+)\)/g;
for (const [t, ruta] of textos) {
  for (const m of t.matchAll(PAREN)) {
    const segs = M.parseCites(m[1]);
    if (!segs) {
      if (m[1] === 'Stanford, 1972–1980') continue; // MYCIN: no es una cita
      if (/\b(1[89]\d\d|20\d\d)[a-z]?\b|s\. f\./.test(m[1]) && /,/.test(m[1]) && !/^\d/.test(m[1])) avisos.push('¿Cita mal formada? «(' + m[1] + ')» en ' + ruta);
      continue;
    }
    for (const sg of segs) for (const y of sg.years) {
      const k = norm(sg.key + ', ' + y);
      if (M.refIndex.has(k)) citadas.add(k);
      else errores.push('Cita sin referencia: «' + k + '» en ' + ruta);
    }
  }
}
for (const r of M.referencias) if (!citadas.has(norm(r.k))) avisos.push('Referencia sin citar: ' + r.k);

// Widgets nombrados en los datos
const nombres = new Set();
for (const t of M.talleres) for (const s of t.secciones) {
  if (s.widget) nombres.add(s.widget);
  (s.widgets || []).forEach((w) => nombres.add(w));
  (s.labs || []).forEach((l) => nombres.add(l.id));
  ['items', 'notas', 'actividades'].forEach((k) => (s[k] || []).forEach((it) => it.widget && nombres.add(it.widget)));
}
nombres.add('anatomia'); nombres.add('clima'); nombres.add('memoria');
for (const n of nombres) if (typeof M.widgets[n] !== 'function') errores.push('Widget inexistente: ' + n);

// Enigma
const enigma = M.enigma.texto('AAAAA', [0, 0, 0], {});
if (enigma !== 'BDZGO') errores.push('Enigma: se esperaba BDZGO y salió ' + enigma);
const ida = M.enigma.texto('HOLADESDEBOGOTA', [3, 11, 20], { A: 'B', B: 'A', C: 'Q', Q: 'C' });
const vuelta = M.enigma.texto(ida, [3, 11, 20], { A: 'B', B: 'A', C: 'Q', Q: 'C' });
if (vuelta !== 'HOLADESDEBOGOTA') errores.push('Enigma no es recíproca: ' + vuelta);
if ([...ida].some((c, i) => c === 'HOLADESDEBOGOTA'[i])) errores.push('Enigma cifró una letra como sí misma');

console.log('Textos revisados: ' + textos.length + ' · referencias: ' + M.referencias.length + ' · citadas: ' + citadas.size);
console.log('Widgets usados: ' + nombres.size + ' · Enigma AAAAA → ' + enigma);
avisos.forEach((a) => console.log('AVISO  ' + a));
errores.forEach((e) => console.log('ERROR  ' + e));
if (errores.length) { console.log(errores.length + ' error(es).'); process.exit(1); }
console.log('Todo en orden.');
