/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 1 del módulo 2: caja de herramientas I (lecciones F1–F6). Contenido del taller: textos, lecciones y secciones.
   Lo técnico de cada lección está en «Para profundizar»; las actividades viven en assets/js/m2/widgets/taller01.js. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 1,
 "slug": "m2t1",
 "etapa": "herr",
 "titulo": "Números para lo inmenso",
 "emblema": "10ⁿ",
 "pregunta": "¿Cómo se leen y se comparan números tan grandes o tan pequeños que no caben en la cabeza?",
 "intro": "Para comparar el cerebro con las máquinas hacen falta cifras con muchísimos ceros, delante o detrás de la coma. En este primer taller aprenderás a leerlas sin perderte: qué dice una unidad, cómo se cuentan los ceros, cómo se traducen los números del inglés y cómo se dibuja lo inmenso. Solo necesitas saber sumar, restar, multiplicar y dividir.",
 "objetivos": [
  "Reconocer que una cifra solo está completa con su número y su unidad, y comprobar la unidad antes de comparar dos cifras.",
  "Escribir y leer potencias de diez (10³, 10⁻³) y números en notación científica, como 8,6 × 10¹⁰.",
  "Traducir *billion* y *trillion* al español sin equivocarte: *billion* son mil millones, no un billón.",
  "Contar órdenes de magnitud restando exponentes y distinguir crecer sumando de crecer multiplicando.",
  "Leer una escala logarítmica, en la que cada tramo igual multiplica por el mismo factor (casi siempre, por diez)."
 ],
 "prerequisitos": [
  "Nada previo: este es el primer taller del módulo. Basta con saber sumar, restar, multiplicar y dividir, como para repartir una cuenta."
 ],
 "secciones": [
  {
   "id": "cap-fundamentos",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Antes de empezar · F1–F6",
   "titulo": "Caja de herramientas: números, medidas y gráficas",
   "bloques": [
    "**Primera etapa.** Antes de medir cerebros y máquinas, preparemos las herramientas: números, unidades y escalas.",
    "Este taller reúne las seis primeras, de la F1 a la F6, de las once lecciones breves con todo lo que necesitas para leer el resto del recorrido: qué es una unidad, cómo se escriben los números gigantes y los diminutos, cómo se traducen del inglés y cómo se lee una {{escala logarítmica|g-log}}; las otras cinco —qué diferencia hay entre un total y un ritmo, y qué tipos de cifras existen— están en el [Taller 2](#m2t2).",
    "Si ya dominas alguna, sáltala: cada lección funciona por separado. Al final tienes una [chuleta de símbolos y unidades](#m2t1-chuleta) para consultarla cuando la necesites."
   ]
  },
  {
   "id": "lec-f1",
   "tipo": "leccion",
   "codigo": "F1",
   "nav": "F1 · Cantidades y unidades",
   "titulo": "Cantidades y unidades: un número solo no dice nada",
   "pregunta": "Si alguien te dice «veinte», ¿sabes de qué habla?",
   "min": 5,
   "dim": "ink",
   "sencillo": [
    "Una *cantidad* es la respuesta a la pregunta «¿cuánto?». Tiene dos partes: un **número** y una *unidad*. El número dice cuántas veces; la unidad dice *de qué*. «20» no significa nada hasta que añadimos la unidad: 20 {{neuronas|g-neurona}}, 20 {{vatios|g-vatio}}, 20 {{bits|g-bit}}.",
    "Hay dos maneras básicas de obtener una cantidad. **Contando** objetos —neuronas, transistores, personas—, y entonces la unidad es el propio objeto. O **midiendo**, es decir, comparando con un patrón acordado, como el metro, el segundo o el julio; entonces la unidad es ese patrón.",
    "En este recorrido aparecen unidades de cuatro familias que no se pueden mezclar: objetos contados (neuronas, {{sinapsis|g-sinapsis}}, {{cúbits|g-cubit}}), operaciones de cálculo ({{FLOP|g-flop}}), energía (julios y vatios) e información (bits). Cada familia responde a una pregunta distinta. [El prólogo del Taller 3](#m2t3-cap-reglas) dedica a cada una su propia regla de medir."
   ],
   "vida": [
    "En la compra, «2» puede ser 2 kilos de manzanas, 2 euros o 2 bolsas. Nadie confundiría 2 kilos con 2 euros: responden a preguntas distintas, «¿cuánto pesa?» y «¿cuánto cuesta?». Y para saber si algo es caro necesitas las dos y dividirlas: euros por kilo. Esa misma idea —dividir dos cantidades de distinta clase para obtener una tercera— reaparecerá cuando hablemos de eficiencia: julios por operación."
   ],
   "imagen": {
    "pie": "El mismo número con tres unidades distintas: tres preguntas distintas.",
    "si": "Que la unidad forma parte de la cantidad: sin ella, el número es una cifra suelta.",
    "no": "Las tres tarjetas no se pueden ordenar de «menor» a «mayor»: 20 vatios no es ni más ni menos que 20 bits. Compararlas exigiría una regla de conversión que no existe.",
    "svg": "lec-f1"
   },
   "ejemplo": {
    "enunciado": "Desmontar una frase del recorrido: «el encéfalo consume unos 20 W en reposo».",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "La frase completa: «el encéfalo consume unos 20 W en reposo»."
     ],
     [
      "**Qué significa cada número**",
      "«20» es el número; «unos» avisa de que es aproximado; «en reposo» dice en qué situación se mide."
     ],
     [
      "**Qué unidades usa**",
      "W es el símbolo del {{vatio|g-vatio}}, unidad de potencia: energía por segundo. La [lección D3](#m2t3-lec-d3) lo explica a fondo."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Todavía ninguna: antes de calcular hay que identificar qué se mide. Es el paso que más se olvida."
     ],
     [
      "**El cálculo**",
      "20 W = 20 julios cada segundo"
     ],
     [
      "**El resultado**",
      "Una cantidad completa: número (20) × unidad (W), con su matiz (estimada, en reposo)."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "«Cada segundo, tu encéfalo usa unos 20 julios de energía.» Ahora sí sabemos qué pregunta responde la cifra."
     ]
    ]
   },
   "prediccion": {
    "q": "«20 vatios» y «20 julios»: ¿dicen lo mismo?",
    "opciones": [
     "Sí, es lo mismo",
     "No: uno es un ritmo y el otro una cantidad total",
     "Depende del aparato"
    ],
    "ok": 1,
    "porque": "Los vatios miden un **ritmo** (energía por segundo); los julios, una **cantidad** de energía. Un aparato de 20 vatios usa 20 julios cada segundo; en una hora, 72.000 julios."
   },
   "actividad": "units20",
   "descubrir": [
    "El número 20 cambió de significado siete veces sin cambiar de valor. Solo cambió la unidad, y con ella la pregunta que responde. Por eso, antes de comparar dos cifras, la primera pregunta es siempre: **¿se miden en la misma unidad?**"
   ],
   "error": {
    "mal": "Comparar cifras de unidades distintas porque el número se parece o porque aparecen juntas: «el cerebro tiene 10¹⁴ sinapsis (cien billones) y una supercomputadora hace 10¹⁸ operaciones por segundo (un trillón), así que la máquina es diez mil veces mayor».",
    "bien": "Antes de comparar, pregunta qué mide cada número. Sinapsis (objetos contados) y operaciones por segundo (un ritmo de cálculo) son magnitudes distintas: su cociente no significa «cuántas veces mayor»."
   },
   "quiz": {
    "q": "¿Cuál de estas cifras está completa, con número y unidad?",
    "opciones": [
     {
      "t": "«86.000 millones»",
      "fb": "Falta la unidad: ¿86.000 millones de qué? En el recorrido es el número de neuronas, pero la cifra sola no lo dice."
     },
     {
      "t": "«86.000 millones de neuronas»",
      "fb": "Tiene número (86.000 millones) y unidad (neuronas, objetos contados). Ya sabemos qué pregunta responde: ¿cuántas neuronas hay?",
      "ok": true
     },
     {
      "t": "«Muchísimas»",
      "fb": "Es una impresión, no una cantidad: no tiene número ni unidad."
     }
    ],
    "pista": "Busca la opción que responde a la vez a «¿cuánto?» y a «¿de qué?»."
   },
   "clave": {
    "sencillo": "Un número sin unidad es media respuesta.",
    "cientifico": "una magnitud se expresa como el producto de un valor numérico por una unidad; solo las magnitudes de la misma dimensión pueden sumarse o compararse directamente."
   },
   "profundizaSub": "dónde seguir leyendo",
   "profundiza": [
    "**Profundización científica, en el Taller 3:** [Prólogo: cuatro reglas, una por pregunta](#m2t3-cap-reglas)"
   ]
  },
  {
   "id": "lec-f2",
   "tipo": "leccion",
   "codigo": "F2",
   "nav": "F2 · Potencias de diez",
   "titulo": "Potencias de diez: contar ceros",
   "pregunta": "¿Cómo se escribe un número de quince cifras sin equivocarse?",
   "min": 6,
   "dim": "cnt",
   "sencillo": [
    "Multiplicar 10 por sí mismo varias veces da 10, 100, 1.000… Para no escribir tantos ceros usamos una abreviatura: *10ⁿ*, que se lee «diez elevado a n». El número pequeño de arriba se llama *exponente* y dice cuántas veces se multiplica el 10. En la práctica, **el exponente cuenta los ceros**: 10³ = 1.000 (tres ceros); 10⁶ = 1.000.000 (seis ceros).",
    "El exponente también puede ser negativo: entonces se divide en vez de multiplicar. 10⁻³ = 1 ÷ 1.000 = 0,001, una milésima. Con exponentes negativos hablaremos de cosas diminutas: el tamaño de una {{sinapsis|g-sinapsis}} (unos 10⁻⁶ metros, una millonésima de metro) o la energía de una operación de cálculo (unos 10⁻¹⁴ {{julios|g-vatio}}).",
    "Y 10⁰ = 1: multiplicar el 10 «cero veces» deja la unidad tal cual.",
    "Las potencias de diez más usadas tienen además un nombre y un prefijo, como *kilo* para 10³ o *mega* para 10⁶. Las que más verás, de femto a exa, están en «Para profundizar»."
   ],
   "vida": [
    "Las potencias de diez ya están en tu vida: 1 kilómetro son 10³ metros; 1 kilogramo, 10³ gramos; un disco de 1 terabyte guarda 10¹² {{bytes|g-bit}}. Los prefijos *kilo*, *mega*, *giga* y *tera* son nombres para 10³, 10⁶, 10⁹ y 10¹². Cuando un anuncio ofrece «100 megas» de conexión, habla de 100 × 10⁶ bits por segundo."
   ],
   "imagen": {
    "pie": "Cada nivel junta diez del anterior: 1, 10, 100, 1.000.",
    "si": "Que subir un paso el exponente equivale a multiplicar por diez: cada nivel contiene diez veces el anterior.",
    "no": "Dibujar 10¹⁵ puntos es imposible. La imagen sirve para los primeros pasos; después hay que confiar en la regla, no en la vista.",
    "svg": "lec-f2"
   },
   "ejemplo": {
    "enunciado": "¿Cuántos ceros tiene un billón y cómo se escribe?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "La palabra «billón», en español."
     ],
     [
      "**Qué significa cada número**",
      "En español, un billón es un millón de millones."
     ],
     [
      "**Qué unidades usa**",
      "Ninguna: es un número puro. Después se le pondrá unidad: un billón de sinapsis, de operaciones…"
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Un millón tiene 6 ceros (10⁶). Un millón de millones es 10⁶ × 10⁶. Al multiplicar potencias de diez se suman los exponentes (lo verás en la [lección F7](#m2t2-lec-f7))."
     ],
     [
      "**El cálculo**",
      "10⁶ × 10⁶ = 10⁶⁺⁶ = 10¹² = 1.000.000.000.000"
     ],
     [
      "**El resultado**",
      "Un billón = 10¹²: un 1 seguido de doce ceros."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Las sinapsis de tu encéfalo, entre 10¹⁴ y 10¹⁵, son entre cien y mil billones."
     ]
    ]
   },
   "prediccion": {
    "q": "Si pasas de 10⁶ a 10⁹, ¿cuántas veces más grande es el número?",
    "opciones": [
     "3 veces",
     "1.000 veces",
     "9 veces"
    ],
    "ok": 1,
    "porque": "Cada paso del exponente multiplica por 10. Tres pasos: 10 × 10 × 10 = 1.000. Pasar de un millón a mil millones es multiplicar por mil, no por tres."
   },
   "actividad": "powers",
   "descubrir": [
    "Mover el exponente un paso arriba multiplica el número por diez; un paso abajo lo divide entre diez. Un número con quince ceros como 10¹⁵ se maneja igual que uno con tres: basta con mirar el exponente. Los exponentes negativos describen lo diminuto: cada paso hacia abajo pone un cero más detrás de la coma."
   ],
   "error": {
    "mal": "Pensar que 10⁹ es «el triple» de 10³ porque 9 es el triple de 3.",
    "bien": "El exponente no funciona así: de 10³ a 10⁹ hay seis pasos y cada paso multiplica por diez. 10⁹ es un millón de veces 10³ (10⁶ veces)."
   },
   "quiz": {
    "q": "¿Qué número es 10⁻³?",
    "opciones": [
     {
      "t": "−1.000 (menos mil)",
      "fb": "El signo menos del exponente no vuelve negativo el número: indica que se divide. 10⁻³ es una cantidad positiva y pequeña."
     },
     {
      "t": "0,001 (una milésima)",
      "fb": "10⁻³ = 1 ÷ 10³ = 1 ÷ 1.000 = 0,001. Es el «mili» de milímetro o de milivatio.",
      "ok": true
     },
     {
      "t": "0,0001",
      "fb": "Cuenta las posiciones decimales: 10⁻³ deja el 1 en la tercera posición después de la coma (0,001), no en la cuarta."
     }
    ],
    "pista": "Un exponente negativo significa «uno dividido entre…»."
   },
   "clave": {
    "sencillo": "El exponente cuenta ceros: cada paso arriba multiplica por diez y cada paso abajo divide entre diez.",
    "cientifico": "10ⁿ es el producto de n factores 10 para n > 0; 10⁰ = 1, y 10⁻ⁿ = 1/10ⁿ."
   },
   "profundizaSub": "los prefijos, de femto a exa, y dónde seguir leyendo",
   "profundiza": [
    "Las potencias que más verás: 10³, mil (prefijo **kilo**, k); 10⁶, un millón (**mega**, M); 10⁹, mil millones (**giga**, G); 10¹², un billón (**tera**, T); 10¹⁵, mil billones (**peta**, P); 10¹⁸, un trillón (**exa**, E). Hacia abajo: 10⁻³, mili (m); 10⁻⁶, micro (µ); 10⁻⁹, nano (n); 10⁻¹², pico (p); 10⁻¹⁵, femto (f).",
    "**Profundización científica, en el Taller 3:** [Prólogo: «Cómo se llaman las potencias»](#m2t3-fig-como-se-llaman-las-potencias)"
   ]
  },
  {
   "id": "lec-f3",
   "tipo": "leccion",
   "codigo": "F3",
   "nav": "F3 · Notación científica",
   "titulo": "Notación científica: un número, dos partes",
   "pregunta": "¿Qué quiere decir «8,6 × 10¹⁰» y cómo se lee en voz alta?",
   "min": 6,
   "dim": "cnt",
   "sencillo": [
    "Casi ninguna cifra real es un 1 seguido de ceros. Para escribir 86.000.000.000 de forma compacta se separa en dos partes: una *mantisa*, un número entre 1 y 10 que lleva las cifras importantes, y una potencia de diez que da el tamaño. 86.000.000.000 = 8,6 × 10¹⁰. Esa forma de escribir se llama *{{notación científica|g-notacion}}*.",
    "Para leerla, mira primero el exponente (¿de qué tamaño hablamos?) y después la mantisa (¿cuántas veces ese tamaño?). 8,6 × 10¹⁰ es «8,6 veces diez mil millones», es decir, 86.000 millones.",
    "Para pasarla a un número corriente, mueve la coma de la mantisa tantas posiciones como indique el exponente: hacia la derecha si es positivo y hacia la izquierda si es negativo. 2 × 10⁻¹⁴ = 0,000 000 000 000 02.",
    "Este recorrido sigue la convención española: **coma** para los decimales (8,6) y **punto** para separar los miles (86.000). En los textos en inglés es al revés."
   ],
   "vida": [
    "Lo hacemos sin darnos cuenta cuando decimos «1,5 millones de habitantes» en vez de 1.500.000: hay una mantisa (1,5) y un tamaño (millones, 10⁶). La notación científica solo lleva esa costumbre hasta el final, con el exponente en lugar de la palabra."
   ],
   "imagen": {
    "pie": "La potencia de diez dice el tamaño; la mantisa, cuántas veces ese tamaño.",
    "si": "Que el exponente fija el tamaño general y la mantisa afina dentro de él.",
    "no": "No son dos números independientes que se puedan leer por separado: 8,6 × 10¹⁰ y 8,6 × 10¹¹ comparten mantisa y son cantidades diez veces distintas.",
    "svg": "lec-f3"
   },
   "ejemplo": {
    "enunciado": "Pasar a palabras la velocidad de la supercomputadora más rápida de 2026: 2,198 × 10¹⁸ FLOP/s.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "2,198 × 10¹⁸ FLOP/s."
     ],
     [
      "**Qué significa cada número**",
      "Mantisa: 2,198. Exponente: 18. {{FLOP/s|g-flop}} es la unidad: operaciones por segundo ([lección D2](#m2t3-lec-d2))."
     ],
     [
      "**Qué unidades usa**",
      "FLOP/s, un ritmo."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Mover la coma 18 posiciones a la derecha, o usar el nombre de 10¹⁸."
     ],
     [
      "**El cálculo**",
      "10¹⁸ = un trillón (escala española). 2,198 × 10¹⁸ = 2.198.000.000.000.000.000"
     ],
     [
      "**El resultado**",
      "Unos 2,2 trillones de operaciones por segundo."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "En cada segundo, esa máquina hace algo más de dos trillones de operaciones."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Qué número es mayor: 9,9 × 10⁸ o 1,1 × 10⁹?",
    "opciones": [
     "9,9 × 10⁸, porque 9,9 es mayor que 1,1",
     "1,1 × 10⁹, porque su exponente es mayor",
     "Son iguales"
    ],
    "ok": 1,
    "porque": "Manda el exponente: 1,1 × 10⁹ = 1.100.000.000 y 9,9 × 10⁸ = 990.000.000. La mantisa solo decide cuando los exponentes coinciden."
   },
   "actividad": "sci",
   "descubrir": [
    "La notación científica separa el tamaño (el exponente) del detalle (la mantisa). Para comparar dos cifras, mira primero los exponentes; solo si coinciden, compara las mantisas. Y fíjate en el signo del exponente: positivo, número grande; negativo, número diminuto."
   ],
   "error": {
    "mal": "Fijarse solo en la mantisa: creer que 8 × 10³ es mayor que 2 × 10⁵ porque 8 es mayor que 2.",
    "bien": "Compara primero los exponentes: 2 × 10⁵ = 200.000 y 8 × 10³ = 8.000. La segunda es 25 veces menor."
   },
   "quiz": {
    "q": "¿Cómo se escribe 1,4 × 10¹⁵ bytes, los 1,4 petabytes de imágenes de un milímetro cúbico de corteza cerebral?",
    "opciones": [
     {
      "t": "1.400.000.000.000.000 bytes",
      "fb": "Mueve la coma 15 posiciones a la derecha: 1,4 → 1.400.000.000.000.000. Son mil cuatrocientos billones de bytes.",
      "ok": true
     },
     {
      "t": "14.000.000.000.000.000 bytes",
      "fb": "Has movido la coma una posición de más: eso sería 1,4 × 10¹⁶."
     },
     {
      "t": "1,400000000000000 bytes",
      "fb": "Ese número sigue siendo 1,4: los ceros detrás de la coma no cambian el valor. El exponente 15 obliga a mover la coma a la derecha."
     }
    ],
    "pista": "El exponente 15 indica cuántas posiciones se mueve la coma hacia la derecha."
   },
   "clave": {
    "sencillo": "Primero el exponente (el tamaño), después la mantisa (el detalle).",
    "cientifico": "un número en notación científica es m × 10ᵉ, con 1 ≤ m < 10 y e entero; e coincide con el orden de magnitud del número."
   },
   "profundizaSub": "dónde seguir leyendo",
   "profundiza": [
    "**Profundización científica, en el Taller 4:** [Nivel 3: los 1,4 PB del milímetro cúbico](#m2t4-n-microcircuito)"
   ]
  },
  {
   "id": "lec-f4",
   "tipo": "leccion",
   "codigo": "F4",
   "nav": "F4 · Mil millones no es un billón",
   "titulo": "Mil millones no es un billón: escala larga y escala corta",
   "pregunta": "Si un artículo en inglés dice «86 billion neurons», ¿son 86 billones?",
   "min": 5,
   "dim": "cnt",
   "sencillo": [
    "En español usamos la *{{escala larga|g-escala-larga}}*: un nombre nuevo cada **seis** ceros. Un millón es 10⁶; un **billón**, un millón de millones (10¹²); un **trillón**, un millón de billones (10¹⁸). Entre medias decimos «mil millones» (10⁹), «mil billones» (10¹⁵) y «mil trillones» (10²¹).",
    "El inglés usa la *escala corta*: un nombre nuevo cada **tres** ceros. *Billion* es 10⁹ (nuestros mil millones) y *trillion*, 10¹² (nuestro billón). Las palabras se parecen pero no significan lo mismo: son «falsos amigos».",
    "Los prefijos del *Sistema Internacional de Unidades* (SI) evitan el problema porque son iguales en todos los idiomas: giga (G) siempre es 10⁹; tera (T), 10¹²; exa (E), 10¹⁸."
   ],
   "vida": [
    "Las noticias económicas traducidas del inglés tropiezan a menudo con esto: «three billion dollars» son tres mil millones de dólares, no tres billones. El error multiplica la cifra por mil. Casi todas las fuentes de este recorrido están en inglés: cuando leas una cifra grande, tradúcela por su potencia de diez, no por la palabra."
   ],
   "imagen": {
    "pie": "Dos escaleras para el mismo edificio: los nombres caen en pisos distintos.",
    "si": "Que los dos idiomas cuentan los mismos números y solo cambian dónde ponen los nombres.",
    "no": "No hay una escala correcta y otra equivocada: son convenciones. El error está en mezclarlas.",
    "svg": "lec-f4"
   },
   "ejemplo": {
    "enunciado": "Traducir «86 billion neurons».",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "«86 billion neurons», en inglés."
     ],
     [
      "**Qué significa cada número**",
      "*Billion*, en escala corta, vale 10⁹."
     ],
     [
      "**Qué unidades usa**",
      "Neuronas: objetos contados."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Sustituir la palabra por su potencia de diez y volver a nombrarla en español."
     ],
     [
      "**El cálculo**",
      "86 × 10⁹ = 8,6 × 10¹⁰ = 86.000.000.000"
     ],
     [
      "**El resultado**",
      "86.000 millones de neuronas (también «86 mil millones»)."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "No son 86 billones: eso serían mil veces más, 8,6 × 10¹³."
     ]
    ]
   },
   "prediccion": {
    "q": "«One trillion operations» en español es…",
    "opciones": [
     "un trillón de operaciones",
     "un billón de operaciones",
     "mil millones de operaciones"
    ],
    "ok": 1,
    "porque": "*Trillion* (escala corta) = 10¹² = un billón en español. Un trillón español es 10¹⁸: un millón de veces más."
   },
   "actividad": "scales",
   "descubrir": [
    "«Billón» y «trillón» cambian de valor al cruzar el idioma; las potencias de diez y los prefijos del SI, no. Por eso este recorrido escribe casi siempre la potencia de diez junto a la palabra."
   ],
   "error": {
    "mal": "Traducir *billion* por «billón».",
    "bien": "*Billion* = 10⁹ = mil millones. Comprueba siempre con la potencia de diez o con el prefijo (giga)."
   },
   "quiz": {
    "q": "La supercomputadora más rápida hace unos 2,2 × 10¹⁸ operaciones por segundo. ¿Cómo se dice en español?",
    "opciones": [
     {
      "t": "2,2 trillones",
      "fb": "10¹⁸ es un trillón en la escala larga española (un millón de billones). En inglés serían *2.2 quintillion*.",
      "ok": true
     },
     {
      "t": "2,2 billones",
      "fb": "Un billón español es 10¹²: te quedarías un millón de veces corto."
     },
     {
      "t": "2,2 mil millones",
      "fb": "Mil millones es 10⁹: te faltarían nueve órdenes de magnitud."
     }
    ],
    "pista": "En español, cada nombre nuevo llega cada seis ceros: millón (6), billón (12), trillón (18)."
   },
   "clave": {
    "sencillo": "*Billion* son mil millones; un billón es un millón de millones.",
    "cientifico": "escala larga: el nombre «‑llón» de orden n vale 10⁶ⁿ; escala corta: 10³ⁿ⁺³. Los prefijos del SI (k, M, G, T, P, E, Z) son invariables entre idiomas."
   },
   "profundizaSub": "dónde seguir leyendo",
   "profundiza": [
    "**Profundización científica, en la figura «Cómo se llaman las potencias» del Taller 3:** [Prólogo: «Cuidado con el inglés»](#m2t3-fig-como-se-llaman-las-potencias)"
   ]
  },
  {
   "id": "lec-f5",
   "tipo": "leccion",
   "codigo": "F5",
   "nav": "F5 · Orden de magnitud",
   "titulo": "Orden de magnitud: ¿diez unidades más o diez veces más?",
   "pregunta": "¿Qué crece más: algo que suma 10 en cada paso o algo que se multiplica por 10?",
   "min": 6,
   "dim": "log",
   "sencillo": [
    "Hay dos maneras de crecer. **Sumando**: 1, 11, 21, 31… cada paso añade lo mismo. **Multiplicando**: 1, 10, 100, 1.000… cada paso multiplica por el mismo factor. Al principio se parecen; enseguida, la multiplicación deja a la suma atrás de forma abrumadora.",
    "Un *{{orden de magnitud|g-orden}}* es un factor diez. Decir que dos cifras están «a tres órdenes de magnitud» significa que una es unas mil veces la otra (10 × 10 × 10). Para contar órdenes de magnitud entre dos números escritos como potencias de diez basta con **restar los exponentes**: entre 10¹⁴ y 10¹⁷ hay 17 − 14 = 3 órdenes.",
    "Cuando este recorrido dice que una estimación tiene «cuatro órdenes de magnitud de margen», quiere decir que su valor más alto es unas 10.000 veces el más bajo. Es un margen enorme."
   ],
   "vida": [
    "Si tu sueldo sube 100 euros cada año, en diez años cobrarás 1.000 euros más: crecimiento por suma. Si una deuda crece un 10 % cada año, cada año crece sobre lo ya acumulado: crecimiento por multiplicación. Casi todas las cifras de computación de este recorrido crecen multiplicando."
   ],
   "imagen": {
    "pie": "Sumar sube peldaños iguales; multiplicar, peldaños que se agrandan hasta salirse del papel.",
    "si": "Que la diferencia entre sumar y multiplicar se dispara con el número de pasos.",
    "no": "En el dibujo solo caben tres peldaños de la escalera que multiplica. En la realidad hay cifras con veinte o treinta pasos de ×10, imposibles de dibujar en una escala normal.",
    "svg": "lec-f5"
   },
   "ejemplo": {
    "enunciado": "¿Cuántos órdenes de magnitud separan los extremos del intervalo de cómputo cerebral, de 10¹³ a 10¹⁷ FLOP/s?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Extremo bajo: 10¹³. Extremo alto: 10¹⁷. Las dos en FLOP/s."
     ],
     [
      "**Qué significa cada número**",
      "Son las cotas que Carlsmith (2020) consideró plausibles para igualar el desempeño del cerebro."
     ],
     [
      "**Qué unidades usa**",
      "Las dos en FLOP/s: se pueden comparar."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir el alto entre el bajo (¿cuántas veces cabe uno en otro?), que con potencias de diez es restar exponentes."
     ],
     [
      "**El cálculo**",
      "10¹⁷ ÷ 10¹³ = 10¹⁷⁻¹³ = 10⁴ = 10.000"
     ],
     [
      "**El resultado**",
      "Cuatro órdenes de magnitud: un factor 10.000."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "El valor más alto del intervalo es diez mil veces el más bajo: no conocemos la cifra ni siquiera con una precisión de «diez veces arriba o abajo»."
     ]
    ]
   },
   "prediccion": {
    "q": "Empezando en 1, ¿a qué número llegas tras 6 pasos de «multiplicar por 10»?",
    "opciones": [
     "61",
     "1.000.000",
     "600"
    ],
    "ok": 1,
    "porque": "1 × 10 × 10 × 10 × 10 × 10 × 10 = 10⁶ = un millón. Sumando 10 seis veces llegarías a 61."
   },
   "actividad": "addmul",
   "descubrir": [
    "Tras pocos pasos, sumar y multiplicar dan resultados de mundos distintos: 61 frente a un millón tras seis pasos. Y en la vista logarítmica, la serie que multiplica se convierte en una línea recta: cada «×10» avanza la misma distancia. Por eso las cifras que crecen multiplicando se dibujan en escala logarítmica."
   ],
   "error": {
    "mal": "Leer «tres órdenes de magnitud» como «tres veces más».",
    "bien": "Tres órdenes son 10 × 10 × 10 = 1.000 veces. Para traducir órdenes a factor, eleva 10 al número de órdenes."
   },
   "quiz": {
    "q": "Una supercomputadora rinde 10¹⁸ FLOP/s y un chip, 10¹⁵ FLOP/s. ¿Cuántos órdenes de magnitud los separan?",
    "opciones": [
     {
      "t": "3 órdenes: la primera es unas 1.000 veces el chip",
      "fb": "18 − 15 = 3, y 10³ = 1.000. Ojo: además hay que comprobar que las dos cifras cuentan el mismo tipo de operación, con la misma precisión numérica ([lección D2](#m2t3-lec-d2)).",
      "ok": true
     },
     {
      "t": "3 veces",
      "fb": "Restar exponentes da órdenes de magnitud, no veces: 3 órdenes son 10³ = 1.000 veces."
     },
     {
      "t": "33 órdenes",
      "fb": "Los exponentes se restan (18 − 15); no se escriben uno detrás de otro."
     }
    ],
    "pista": "Resta los exponentes y después eleva 10 al resultado."
   },
   "clave": {
    "sencillo": "Sumar añade; multiplicar dispara. Un orden de magnitud es un factor diez.",
    "cientifico": "la distancia en órdenes de magnitud entre a y b es log₁₀(b/a); para potencias de diez, la diferencia de exponentes."
   },
   "profundizaSub": "dónde seguir leyendo",
   "profundiza": [
    "**Profundización científica, en el Taller 5:** [Acto I · 3: un intervalo de cuatro órdenes](#m2t5-cap-computo)"
   ]
  },
  {
   "id": "lec-f6",
   "tipo": "leccion",
   "codigo": "F6",
   "nav": "F6 · Escala lineal y escala logarítmica",
   "titulo": "Escala lineal y escala logarítmica: dos reglas de medir",
   "pregunta": "¿Cómo se dibujan en el mismo papel un gusano con 302 neuronas y un ser humano con 86.000 millones?",
   "min": 8,
   "dim": "log",
   "sencillo": [
    "Una *escala lineal* es una regla normal: cada tramo igual **suma** la misma cantidad. Pasar de 0 a 10 ocupa lo mismo que pasar de 1.000 a 1.010. Es perfecta cuando las cifras son parecidas.",
    "Una *{{escala logarítmica|g-log}}* es una regla en la que cada tramo igual **multiplica** por el mismo factor, normalmente diez: ir de 1 a 10 ocupa lo mismo que ir de 10 a 100 o de 1.000 a 10.000. No empieza en cero —por mucho que dividas entre diez, nunca llegas a cero— y sus marcas principales suelen ser potencias de diez.",
    "En ella, la distancia entre dos puntos no indica cuánto se diferencian (una resta) sino **cuántas veces** es uno mayor que el otro (un cociente). Por eso es la herramienta natural para comparar cantidades que difieren enormemente.",
    "El nombre viene de *logaritmo*, que no es más que el exponente: el logaritmo de 1.000 es 3, porque 1.000 = 10³. La explicación completa está en «Para profundizar»."
   ],
   "vida": [
    "Ya usas escalas que multiplican: en un piano, subir una octava duplica la frecuencia del sonido; en los decibelios del ruido, subir 10 decibelios multiplica por diez la intensidad. En ambas, un paso igual significa «multiplicar», no «sumar»."
   ],
   "imagen": {
    "pie": "Arriba, una regla que suma; abajo, una que multiplica. Las rayitas finas de abajo son 2, 3… 9 veces cada marca.",
    "si": "Que en la regla de abajo cada tramo igual es un «×10», y que los números muy distintos caben a la vez.",
    "no": "La escala logarítmica no «encoge» los números grandes por magia: cambia la pregunta. En ella no se pueden leer diferencias (restas) a simple vista, solo cocientes.",
    "svg": "lec-f6"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas veces más neuronas tiene el ser humano que el gusano *C. elegans*, y qué espacio ocupa esa diferencia en cada escala?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "302 neuronas (el gusano *C. elegans*, contadas una a una: medido) y unos 8,6 × 10¹⁰ (el encéfalo humano: estimado)."
     ],
     [
      "**Qué significa cada número**",
      "Dos recuentos de la misma clase de objeto: se pueden comparar."
     ],
     [
      "**Qué unidades usa**",
      "Neuronas."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir para saber cuántas veces, y tomar el logaritmo para saber cuántos órdenes de magnitud."
     ],
     [
      "**El cálculo**",
      "8,6 × 10¹⁰ ÷ 302 ≈ 2,85 × 10⁸ · log₁₀(2,85 × 10⁸) ≈ 8,45"
     ],
     [
      "**El resultado**",
      "Unos 285 millones de veces: ocho órdenes y medio de magnitud."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "En una escala lineal que llegue hasta el ser humano, el gusano ocuparía menos de una millonésima del ancho: sería invisible. En una logarítmica, los dos caben con holgura, separados por ocho tramos y medio."
     ]
    ]
   },
   "prediccion": {
    "q": "En una escala logarítmica, ¿qué salto ocupa más espacio: de 1 a 10 o de 1.000 a 10.000?",
    "opciones": [
     "De 1.000 a 10.000, porque son 9.000 unidades",
     "Los dos ocupan lo mismo",
     "De 1 a 10"
    ],
    "ok": 1,
    "porque": "Ambos saltos multiplican por 10, y en una escala logarítmica cualquier «×10» ocupa la misma distancia. En la lineal, en cambio, el segundo salto es mil veces más largo."
   },
   "actividad": "linlog",
   "descubrir": [
    "En la escala lineal, el salto de 1.000 a 10.000 ocupa casi todo el eje y los de 1 a 10 o de 10 a 100 apenas se ven. En la logarítmica, los tres saltos «×10» miden lo mismo. En cambio, sumar 10 (de 10 a 20) es casi invisible en la lineal y ocupa casi un tercio de tramo en la logarítmica, porque duplicar es un paso considerable cuando se mide en «veces». Así caben en el mismo papel el gusano (302 neuronas) y el ser humano (unos 8,6 × 10¹⁰): en la escala lineal, el gusano sería invisible; en la logarítmica, los separan ocho tramos y medio (la cuenta está en el ejemplo resuelto)."
   ],
   "error": {
    "mal": "Leer una gráfica logarítmica como si fuera lineal: «estas dos barras se ven casi iguales, así que las cifras son parecidas».",
    "bien": "En escala logarítmica, una diferencia visual pequeña puede ser un factor enorme. Mira las marcas: si van de diez en diez veces, cada tramo es ×10."
   },
   "quiz": {
    "q": "En una escala logarítmica, el punto A está en 10³ y el punto B, en 10⁷. ¿Qué dice la distancia entre ambos?",
    "opciones": [
     {
      "t": "Que B es 4 unidades mayor que A",
      "fb": "La distancia en escala logarítmica no mide restas sino cocientes: 10⁷ − 10³ es casi 10⁷, no 4."
     },
     {
      "t": "Que B es unas 10.000 veces A",
      "fb": "Cuatro tramos de ×10: 10⁷ ÷ 10³ = 10⁴ = 10.000. Esa es la lectura correcta de una distancia logarítmica.",
      "ok": true
     },
     {
      "t": "Que B es el doble de A",
      "fb": "Dos números a cuatro tramos de distancia en escala logarítmica difieren en un factor 10⁴, no 2."
     }
    ],
    "pista": "Cada tramo es un «×10». Cuenta los tramos."
   },
   "clave": {
    "sencillo": "En escala lineal, la distancia es una resta; en la logarítmica, un cociente.",
    "cientifico": "en una escala logarítmica la posición es proporcional a log₁₀ x; la distancia entre a y b es log₁₀(b/a), de modo que factores iguales ocupan longitudes iguales."
   },
   "profundizaSub": "las rayitas finas, qué es un logaritmo y dónde seguir leyendo",
   "profundiza": [
    "Entre las marcas 1 y 10 verás a menudo rayitas más finas, cada vez más juntas: son el 2, el 3… el 9. Ese apiñamiento es la huella de una escala logarítmica.",
    "La palabra viene de *logaritmo*. El logaritmo en base diez de un número, escrito log₁₀, es el exponente al que hay que elevar 10 para obtenerlo: log₁₀(1.000) = 3. Para números que no son potencias exactas da decimales: log₁₀(2) ≈ 0,3 y log₁₀(20) ≈ 1,3. La escala logarítmica coloca cada número en la posición de su logaritmo.",
    "**Profundización científica, en el Taller 3 y en el glosario:** [Prólogo · «Lineal o logarítmica»](#m2t3-fig-lineal-o-logaritmica) · [Glosario · escala logarítmica](#m2glosario-g-log)"
   ]
  },
  {
   "id": "chuleta",
   "tipo": "texto",
   "nav": "Chuleta",
   "kicker": "Para tener a mano",
   "titulo": "Chuleta de símbolos y unidades",
   "bloques": [
    {
     "tabla": [
      [
       "Símbolo",
       "Se lee",
       "Ejemplo"
      ],
      [
       "×  ÷",
       "por · entre",
       "8,6 × 10¹⁰"
      ],
      [
       "10ⁿ",
       "diez elevado a n: un 1 con n ceros",
       "10³ = 1.000"
      ],
      [
       "10⁻ⁿ",
       "uno entre 10ⁿ",
       "10⁻³ = 0,001"
      ],
      [
       "~  ≈",
       "aproximadamente",
       "~20 W"
      ],
      [
       "±",
       "más o menos (margen)",
       "86,1 ± 8,1"
      ],
      [
       "a–b",
       "entre a y b (intervalo)",
       "0,1–1 Hz"
      ],
      [
       "<  >",
       "menos de · más de",
       ">100 MW"
      ],
      [
       "/s",
       "por segundo (un ritmo)",
       "FLOP/s"
      ],
      [
       "log₁₀",
       "logaritmo en base 10: el exponente",
       "log₁₀ 1.000 = 3"
      ],
      [
       "%",
       "por ciento: de cada 100",
       "20 % = 0,2"
      ]
     ],
     "titulo": "Símbolos matemáticos del recorrido"
    },
    "**Unidades que verás**: vatios, julios, FLOP, bits, hercios y metros.",
    {
     "ul": [
      "**W**, {{vatio|g-vatio}}: potencia, energía por segundo. **kW, MW, GW**: mil, un millón, mil millones de vatios.",
      "**J**, julio: energía. **pJ, fJ**: billonésimas y milbillonésimas de julio. **Wh, TWh**: vatio-hora y {{teravatio-hora|g-twh}}.",
      "**{{FLOP|g-flop}}**: operación de cálculo con decimales. **FLOP/s**: operaciones por segundo. **PFLOP/s, {{EFLOP/s|g-exa}}**: 10¹⁵ y 10¹⁸ por segundo.",
      "**{{bit|g-bit}}**: un sí o un no. **byte**: 8 bits. **bits/s**: flujo de información. **PB**: petabyte, 10¹⁵ bytes.",
      "**Hz**, {{hercio|g-hercio}}: veces por segundo.",
      "**m, mm, µm, nm**: metro, milímetro, micrómetro (10⁻⁶ m) y nanómetro (10⁻⁹ m)."
     ]
    }
   ],
   "desc": "Para consultar cuando aparezca un símbolo o una unidad que no recuerdes. No hace falta memorizarla."
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "La cuerda de las potencias de diez",
     "min": 20,
     "d": [
      "Una cuerda tendida en el suelo, o una tira de cinta en la pared, se convierte en una escala logarítmica gigante. El grupo coloca en ella cifras de este taller y comprueba, caminando, que cada tramo igual multiplica en lugar de sumar.",
      "Materiales: una cuerda o cinta de unos 7 metros, pinzas o cinta adhesiva, un rotulador y nueve tarjetas."
     ],
     "pasos": [
      "Marca en la cuerda doce puntos grandes, uno cada 60 cm, y rotúlalos de izquierda a derecha: 10⁻¹⁵ (femto), 10⁻¹² (pico), 10⁻⁹ (nano), 10⁻⁶ (micro), 10⁻³ (mili), 10⁰ = 1, 10³ (kilo), 10⁶ (mega), 10⁹ (giga), 10¹² (tera), 10¹⁵ (peta) y 10¹⁸ (exa). Deja libre medio metro después de 10¹⁸: una de las tarjetas cae un poco más allá.",
      "Entre cada dos puntos grandes, haz dos marcas pequeñas, una cada 20 cm: son las potencias de diez intermedias (entre 10⁰ y 10³ quedan 10¹ y 10²). Cada paso pequeño es un «×10», como en la lección F6; cada tramo entre dos puntos grandes, un «×1.000»: tres órdenes de magnitud.",
      "Reparte las tarjetas con las cifras escritas sin unidad: 302 · 8,6 × 10¹⁰ · 10¹⁴ · 20 · 72.000 · 2,198 × 10¹⁸ · 1,4 × 10¹⁵ · 10⁻⁶ · 10⁻¹⁴. Pregunta: ¿qué es cada una? Recuerda la lección F1: un número sin unidad es media respuesta.",
      "Revela la unidad de cada tarjeta: 302 neuronas del gusano C. elegans; 8,6 × 10¹⁰ neuronas del encéfalo humano; 10¹⁴ sinapsis, el extremo bajo de las que tiene el encéfalo (entre 10¹⁴ y 10¹⁵); unos 20 W, el encéfalo en reposo; 72.000 julios, lo que usa en una hora un aparato de 20 W; 2,198 × 10¹⁸ FLOP/s, la supercomputadora más rápida de 2026; 1,4 × 10¹⁵ bytes de imágenes de un milímetro cúbico de corteza cerebral; unos 10⁻⁶ metros, el tamaño de una sinapsis; unos 10⁻¹⁴ julios, la energía de una operación de cálculo.",
      "Cada pareja escribe su tarjeta en notación científica y en palabras (escala larga) y la cuelga según su exponente: una cifra como 10¹⁴, justo en su marca; una con mantisa mayor que 1, entre la marca de su exponente y la siguiente, más cerca de la siguiente cuanto mayor sea la mantisa. Por ejemplo, 8,6 × 10¹⁰ va entre las marcas pequeñas 10¹⁰ y 10¹¹, casi tocando 10¹¹.",
      "Puesta en común: ¿cuántos órdenes de magnitud separan las 302 neuronas del gusano de las 8,6 × 10¹⁰ del ser humano? (unos ocho y medio, como en el ejemplo de la lección F6). ¿Qué tarjetas quedan cerca en la cuerda pero no se pueden comparar porque miden cosas distintas?"
     ],
     "nota": "La cuerda junta cifras de unidades distintas solo para practicar la lectura de exponentes. Que dos tarjetas queden cerca no significa que se puedan comparar: 10¹⁴ sinapsis y 1,4 × 10¹⁵ bytes miden cosas distintas (lección F1). Si el grupo es grande, forma equipos de cuatro o cinco personas, cada uno con su cuerda y el mismo juego de tarjetas, y en la puesta en común compara dónde colgó cada equipo cada tarjeta."
    },
    {
     "t": "Traductores de titulares",
     "min": 15,
     "d": "Por parejas, el grupo traduce al español frases en inglés con cifras grandes. La regla del juego, la de la lección F4: no se traduce la palabra, se traduce la potencia de diez.",
     "pasos": [
      "Escribe en la pizarra estas seis frases: «86 billion neurons», «100 trillion synapses», «one quadrillion operations per second», «946 megawatts», «1.4 petabytes» y «three billion dollars».",
      "Cada pareja escribe, para cada frase, la potencia de diez y su nombre en español, en escala larga.",
      "Las parejas intercambian sus hojas y corrigen con la tabla del laboratorio de la lección F4: potencia, español, inglés y prefijo del SI. Al final, abre las respuestas.",
      "Puesta en común: ¿en qué frases no hubo dudas? (las que usan un prefijo del SI, como mega o peta). ¿Cuánto se equivoca quien traduce «billion» por «billón»? (multiplica la cifra por mil)."
     ],
     "widget": "m2.t1-respuestas",
     "respuestas": [
      "«86 billion neurons»: 86 × 10⁹ = 8,6 × 10¹⁰, **86.000 millones** de neuronas. No son 86 billones.",
      "«100 trillion synapses»: 10¹⁴, **cien billones** de sinapsis, el extremo bajo de las que tiene el encéfalo (entre 10¹⁴ y 10¹⁵).",
      "«one quadrillion operations per second»: 10¹⁵, **mil billones** de operaciones por segundo, la estimación central del cómputo del cerebro.",
      "«946 megawatts»: 946 × 10⁶ vatios, **946 millones de vatios**, la potencia estimada de Colossus 2, el mayor campus de IA rastreado.",
      "«1.4 petabytes»: 1,4 × 10¹⁵ bytes, **mil cuatrocientos billones** de bytes, las imágenes de un milímetro cúbico de corteza cerebral.",
      "«three billion dollars»: *billion* = 10⁹, así que son **tres mil millones** de dólares. No son tres billones."
     ]
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "fundamentos"
 ]
});
})();
