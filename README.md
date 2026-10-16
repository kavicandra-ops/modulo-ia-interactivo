# El futuro tiene historia

**90 años entre computadoras e inteligencias artificiales (1936–2026)**

Módulo interactivo de cuatro talleres que recorre noventa años de computación e inteligencia artificial (IA), de 1936 a 2026. Está pensado para personas de 18 a 60 años sin formación técnica. Cada taller gira alrededor de un objeto-símbolo: la válvula de vacío, el chip, la computadora personal y el teléfono inteligente conectado a la nube.

## Cómo abrirlo

| Forma | Para quién | Cómo |
|---|---|---|
| Archivo único | Facilitadores que quieren llevarlo en una memoria USB o enviarlo por correo | Abrir `dist/el-futuro-tiene-historia.html` con doble clic. Funciona sin conexión (sin Internet usa las tipografías del sistema). |
| Carpeta del proyecto | Quien edita el contenido | Abrir `index.html` con doble clic. No necesita servidor ni instalación. |
| GitHub Pages | Publicarlo en la web | En el repositorio: *Settings → Pages → Deploy from a branch*, rama principal, carpeta raíz. |

## Qué hay dentro

Una portada con la presentación, el propósito, el enfoque, el mapa del módulo, el «clima» de la IA y las cinco ideas transversales. Luego, cuatro talleres, un glosario con buscador, la lista de referencias (APA 7) y un juego de repaso.

Cada segmento de cada taller tiene un formato propio:

| Segmento | Formato |
|---|---|
| Ficha del taller | Boleto con período, objeto, pregunta guía y objetivos que la persona marca al lograrlos |
| Prólogo (Taller 1) | Cuatro escenas fechadas y una tarjeta perforada que el grupo «tabula» como en el censo de 1890 |
| Línea de tiempo | Hitos con su «por qué importa», filtrables por hilo: máquina, IA, sociedad o América Latina |
| Conceptos fundamentales | Tarjetas numeradas con su ejemplo cotidiano y un laboratorio para probar los conceptos clave |
| En números (Talleres 2 y 3) | Gráficos de la ley de Moore y de la carrera de la frecuencia, con tabla de datos |
| Por dentro de la máquina | Fichas de máquinas; anatomía clicable de una PC de los noventa y de un teléfono inteligente |
| Caso de estudio (Taller 1) | Ocho capítulos sobre Enigma y Bletchley Park, con un simulador de Enigma y el cálculo de los 159 trillones de ajustes |
| El hilo de la IA | Hilo cronológico que distingue IA simbólica y conexionista, con laboratorios (neurona, perceptrón, ELIZA, autocompletado) |
| Contexto social | «Recortes de prensa» que se pueden mirar con tres lentes: quién financia, quién gana, quién queda por fuera |
| América Latina y Colombia | Postales con sello de país y año |
| Mitos y precisiones | Juego «¿mito o realidad?» con veredicto (falso, depende, a medias…) y la precisión con su fuente |
| Cierre práctico | Temporizador y una herramienta para la actividad: juego de la imitación, tablero de arroz, línea de tiempo viva y clasificador Web/Internet, guion colectivo |

Además: citas clicables que muestran la referencia completa, ajustes de lectura (tema claro u oscuro, tres tamaños de letra, ocultar citas), progreso por segmento y un glosario rápido siempre a mano.

El progreso, los puntajes y lo que el grupo escribe en las actividades se guardan **solo en el navegador** donde se usa el módulo.

## Estructura

```
index.html                 Página principal
assets/css/main.css        Estilos (colores por época, tema claro y oscuro)
assets/js/core.js          Utilidades: citas APA clicables, números, íconos, objetos
assets/js/app.js           Navegación y formato de cada segmento
assets/js/data/            Contenido: modulo.js, taller1–4.js, glosario.js, referencias.js
assets/js/widgets/         Laboratorios y actividades interactivas
scripts/verificar.mjs      Revisa citas, referencias, widgets y el simulador de Enigma
scripts/empaquetar.mjs     Genera el archivo único de dist/
dist/                      Versión en un solo archivo HTML
```

## Cómo editar el contenido

1. El texto de cada taller está en `assets/js/data/tallerN.js`, organizado por segmento.
2. Las citas se escriben como en el texto fuente: `(Moye, 1996; CHM, s. f.-p)`. Se vuelven clicables solas si existe una referencia con esa clave en `assets/js/data/referencias.js` (la primera columna de cada referencia).
3. Después de editar, revise y regenere el archivo único:

```
node scripts/verificar.mjs
node scripts/empaquetar.mjs
```

`verificar.mjs` falla si alguna cita no tiene referencia o si falta un widget, y avisa de las referencias que nadie cita.

## Ajustes editoriales sobre el texto fuente

- «Computadoras Mammut» se escribió **«Computadoras Mamut»**, según la ortografía del español (RAE).
- Se corrigieron erratas: «contemporaneo», «geopolitico», «Sistema operative», «películoa», «elm undo» y la mayúscula en «deben Clasificar».
- Los enunciados de los cierres prácticos de los talleres 2, 3 y 4 se reescribieron levemente para que fueran oraciones completas, sin cambiar la actividad.

## Qué se añadió al texto original

El contenido verificado del documento fuente se conserva tal cual. Para hacer el módulo interactivo se añadieron estos elementos, que conviene revisar con el mismo rigor:

- **Gráfico de la ley de Moore**: los 12 chips y sus transistores (Intel 4004, 8008, 8086, 80286, 386, 486, Pentium, Pentium 4, Core 2 Duo; Apple M1; Nvidia H100 y Blackwell), tomados de las fuentes que cita el pie del gráfico (Intel, Apple, Nvidia).
- **Gráfico de la frecuencia**: 10 procesadores entre 1971 y 2000 (de 740 kHz a 1 GHz) y la marca del Pentium 4 de 4 GHz cancelado en 2004.
- **Jerarquía de memoria**: tiempos aproximados por nivel (de ~0,3 ns a ~150 ms), su equivalente en «escala humana» y una analogía de cocina para cada nivel.
- **Clima de la IA** (portada): tramos aproximados de auge e invierno; es un esquema cualitativo, no una medición.
- **Tres ingredientes por época** (portada): niveles de 1 a 4 para ideas, datos y cómputo, como lectura del texto de cada taller.
- **Ajedrez**: número de partidas posibles tras 1, 2 y 3 jugadas por bando (400; 197.281; 119.060.324).
- **Enigma**: cableado histórico de los rotores I, II y III y del reflector B; desglose de los 1,59 × 10²⁰ ajustes (60 × 17.576 × 150.738.274.937.250).
- **Laboratorios**: ELIZA en español con una docena de reglas, perceptrón de juguete, autocompletado entrenado con el propio texto del módulo, tabla Latin-1 en los bits, nodos UCLA y SRI en la red de paquetes.
- **Juego de la imitación**: cuatro respuestas de ejemplo escritas por un chatbot, marcadas como ejemplo, para mostrar la herramienta.
- **Guion colectivo**: un guion de ejemplo y 14 cartas de inspiración basadas en datos del módulo.
- **Juego de repaso**: 31 hitos tomados de las líneas de tiempo, con una nota breve en cada uno.
- **Etiquetas de diseño**: titulares de las postales, lentes de los recortes de prensa, veredictos de los mitos y etiquetas «simbólica/conexionista» en el hilo de la IA.

## Notas técnicas

Sin dependencias ni paso de compilación: HTML, CSS y JavaScript sin frameworks. Las tipografías (Archivo y Chivo Mono, de Omnibus-Type; Alegreya, de Huerta Tipográfica; ambas fundiciones argentinas) se cargan de Google Fonts. La interfaz funciona con teclado, respeta la preferencia de movimiento reducido y se adapta a teléfonos desde 360 px de ancho.
