// Empaqueta el módulo en un solo archivo HTML, con CSS y JS en línea.
// Sirve para compartirlo por correo o memoria USB y abrirlo sin conexión
// (las tipografías se cargan de Google Fonts si hay Internet; si no, usa las del sistema).
//
// Uso:
//   node scripts/empaquetar.mjs                  → dist/el-futuro-tiene-historia.html
//   node scripts/empaquetar.mjs --fragmento RUTA  → solo el contenido del <head> y el <body>
//                                                  (para plataformas que ponen su propio esqueleto)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(raiz, 'index.html'), 'utf8');
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');

let salida = html
  .replace(/<link rel="stylesheet" href="(assets\/[^"]+)">/g, (_, ruta) => '<style>\n' + leer(ruta) + '\n</style>')
  .replace(/<script src="(assets\/[^"]+)"><\/script>/g, (_, ruta) => {
    const js = leer(ruta);
    if (/<\/script/i.test(js)) throw new Error('El archivo ' + ruta + ' contiene «</script»');
    return '<script>\n' + js + '\n</script>';
  });

const i = process.argv.indexOf('--fragmento');
if (i !== -1) {
  const destino = process.argv[i + 1];
  const head = salida.match(/<head>([\s\S]*?)<\/head>/)[1]
    .replace(/<meta charset[^>]*>\s*/, '')
    .replace(/<meta name="viewport"[^>]*>\s*/, '');
  const body = salida.match(/<body>([\s\S]*?)<\/body>/)[1];
  writeFileSync(destino, head.trim() + '\n' + body.trim() + '\n');
  console.log('Fragmento escrito en ' + destino);
} else {
  mkdirSync(join(raiz, 'dist'), { recursive: true });
  const destino = join(raiz, 'dist', 'el-futuro-tiene-historia.html');
  writeFileSync(destino, salida);
  console.log('Archivo único escrito en ' + destino + ' (' + Math.round(salida.length / 1024) + ' KB)');
}
