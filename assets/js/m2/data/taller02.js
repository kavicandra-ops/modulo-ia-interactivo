/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 2 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Textos fieles a la fuente: lo técnico se reubica en desplegables, no se elimina. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 2,
 "slug": "m2t2",
 "etapa": "herr",
 "titulo": "Totales, ritmos y cifras con apellido",
 "emblema": "≈",
 "pregunta": "¿Qué hay que mirar en una cifra para saber qué dice y cuánto fiarse de ella?",
 "intro": "Aprenderás a multiplicar números gigantes sin calculadora, sumando los exponentes de las potencias de diez, y a distinguir un total de un ritmo. Después verás por qué una misma cantidad puede tener varios valores razonables y aprenderás a leer las gráficas de este recorrido. Por último, le pondrás «apellido» a cada cifra: de dónde sale y cuánto fiarse de ella.",
 "objetivos": [
  "Multiplicar y dividir potencias de diez sumando o restando exponentes, sin olvidar las unidades.",
  "Distinguir un total de un ritmo y pasar de uno a otro con **total = ritmo × tiempo**.",
  "Leer una estimación con sus tres partes: valor central, margen y origen.",
  "Leer una gráfica en orden: pregunta, ejes y unidades, escala, símbolos, datos y límites.",
  "Clasificar una cifra como medida, estimada, declarada, proyectada o extrapolada preguntando quién lo dice, cómo lo sabe y qué supone."
 ],
 "prerequisitos": [
  "Te ayudará repasar el [Taller 1 · Números para lo inmenso](#m2t1), sobre todo las lecciones [F2 · Potencias de diez: contar ceros](#m2t1-lec-f2), [F3 · Notación científica: un número, dos partes](#m2t1-lec-f3) y [F6 · Escala lineal y escala logarítmica: dos reglas de medir](#m2t1-lec-f6)."
 ],
 "secciones": [
  {
   "id": "lec-f7",
   "tipo": "leccion",
   "codigo": "F7",
   "nav": "F7 · Multiplicar con potencias de diez",
   "titulo": "Multiplicar con potencias de diez: sumar exponentes",
   "pregunta": "¿Cómo se multiplican dos números gigantes sin calculadora?",
   "min": 6,
   "dim": "cmp",
   "sencillo": [
    "Una regla convierte las cuentas con números gigantes en algo sencillo: **al multiplicar {{potencias de diez|g-notacion}} se suman los exponentes; al dividirlas, se restan**. 10³ × 10⁴ = 10⁷, porque tres ceros más cuatro ceros son siete ceros.",
    "Con la notación científica completa se trabaja por separado: las {{mantisas|g-notacion}} —el número entre 1 y 10 que va delante: el 2 de 2 × 10¹⁴— se multiplican entre sí y los exponentes se suman. (2 × 10¹⁴) × (5 × 10³) = (2 × 5) × 10¹⁴⁺³ = 10 × 10¹⁷ = 10¹⁸. Si la mantisa pasa de 10, se corre la coma y se suma 1 al exponente.",
    "Las unidades viajan con los números: también se multiplican y se dividen. {{Vatios|g-vatio}} ÷ (operaciones por segundo) = julios por operación. Si al final la unidad no tiene sentido, la cuenta está mal planteada."
   ],
   "vida": [
    "Si una caja tiene 1.000 sobres (10³) y cada sobre, 100 hojas (10²), hay 10³ × 10² = 10⁵ = 100.000 hojas: tres ceros más dos ceros. Si repartes esas 100.000 hojas entre 1.000 personas, cada una recibe 10⁵ ÷ 10³ = 10² = 100: cinco ceros menos tres."
   ],
   "imagen": {
    "pie": "En escala logarítmica, multiplicar es encadenar flechas: 10³ × 10² = 10⁵.",
    "si": "Que el exponente del producto es la suma de los exponentes, igual que la longitud de dos flechas encadenadas es la suma de sus longitudes.",
    "no": "Las mantisas no se suman: se multiplican. 2 × 10³ por 3 × 10² da 6 × 10⁵, no 5 × 10⁵.",
    "svg": "lec-f7"
   },
   "ejemplo": {
    "enunciado": "Neuronas × sinapsis por neurona: la multiplicación que infla el recuento de sinapsis.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "8,6 × 10¹⁰ neuronas y 7.000 = 7 × 10³ sinapsis por neurona (la cifra popular)."
     ],
     [
      "**Qué significa cada número**",
      "El producto daría el total de sinapsis *si* todas las neuronas tuvieran 7.000."
     ],
     [
      "**Qué unidades usa**",
      "neuronas × (sinapsis por neurona) = sinapsis."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar las mantisas y sumar los exponentes."
     ],
     [
      "**El cálculo**",
      "Mantisas: 8,6 × 7 = 60,2\nExponentes: 10¹⁰ × 10³ = 10¹³\nJuntar: 60,2 × 10¹³ = 6,02 × 10¹⁴"
     ],
     [
      "**El resultado**",
      "Unos 6 × 10¹⁴ sinapsis."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es el triple de la referencia de cálculo (~2 × 10¹⁴). El error no está en la cuenta sino en el supuesto: la mayoría de las neuronas no tienen 7.000 sinapsis. Lo verás en el [Taller 5, en la figura «Sinapsis por neurona»](#m2t5-fig-sinapsis-por-neurona-de-4-a-175-000)."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Cuánto es 10¹⁵ ÷ 10¹⁵?",
    "opciones": [
     "0",
     "1",
     "10³⁰"
    ],
    "ok": 1,
    "porque": "Al dividir se restan los exponentes: 15 − 15 = 0, y 10⁰ = 1. Cualquier número dividido entre sí mismo da 1."
   },
   "actividad": "expo",
   "descubrir": [
    "Con la regla de los exponentes, una cuenta como 20 W ÷ 10¹⁵ {{FLOP/s|g-flop}} se resuelve de cabeza: basta restar los exponentes para obtener los julios por operación (compruébalo tú en la pregunta de abajo). Fíjate también en cómo se combinan las unidades: el resultado debe tener un significado claro."
   ],
   "error": {
    "mal": "Sumar las mantisas o multiplicar los exponentes: (2 × 10³) × (3 × 10²) = 5 × 10⁶.",
    "bien": "Mantisas: se multiplican (2 × 3 = 6). Exponentes: se suman (3 + 2 = 5). Resultado: 6 × 10⁵."
   },
   "quiz": {
    "q": "El cerebro consume unos 20 W. Si equivaliera a 10¹⁵ operaciones por segundo, ¿cuánta energía gastaría por operación?",
    "opciones": [
     {
      "t": "2 × 10⁻¹⁴ J",
      "fb": "20 W = 2 × 10¹ julios por segundo. Dividir: 2 × 10¹ ÷ 10¹⁵ = 2 × 10¹⁻¹⁵ = 2 × 10⁻¹⁴ julios por operación, unos 20 femtojulios.",
      "ok": true
     },
     {
      "t": "2 × 10¹⁶ J",
      "fb": "Has sumado los exponentes; al dividir, se restan."
     },
     {
      "t": "20 × 10¹⁵ J",
      "fb": "Eso sería multiplicar. La energía por operación es energía ÷ número de operaciones."
     }
    ],
    "pista": "Energía por operación = potencia ÷ operaciones por segundo. Al dividir, resta los exponentes."
   },
   "clave": {
    "sencillo": "Para multiplicar potencias de diez, suma los exponentes; para dividir, réstalos.",
    "cientifico": "10ᵃ · 10ᵇ = 10ᵃ⁺ᵇ y 10ᵃ / 10ᵇ = 10ᵃ⁻ᵇ; en notación científica, (m₁·10ᵃ)(m₂·10ᵇ) = (m₁m₂)·10ᵃ⁺ᵇ, renormalizando la mantisa. Las unidades se combinan con las mismas operaciones (análisis dimensional)."
   },
   "profundizaSub": "la regla en una escala logarítmica y dónde se usa",
   "profundiza": [
    "Esta regla explica por qué, en una escala logarítmica, **multiplicar es como encadenar distancias**: el [calculador del cómputo cerebral del Taller 5](#m2t5-fig-sinapsis-x-frecuencia-x-operaciones-por-) dibuja cada factor como una flecha y el resultado cae donde termina la última.",
    "**Profundización científica**: S × f × k, en el [Taller 5 · Lección I.7: traducir el cerebro a operaciones](#m2t5-lec-i7)."
   ]
  },
  {
   "id": "lec-f8",
   "tipo": "leccion",
   "codigo": "F8",
   "nav": "F8 · Cantidad total y ritmo",
   "titulo": "Cantidad total y ritmo: el cubo y el grifo",
   "pregunta": "¿Es lo mismo «cuánta agua hay» que «a qué velocidad cae»?",
   "min": 6,
   "dim": "cnt",
   "sencillo": [
    "Muchas cifras de este recorrido vienen en parejas engañosamente parecidas. Una es un *total*: cuánto hay, o cuánto se ha hecho en conjunto. La otra es una *tasa* o ritmo: cuánto ocurre **por unidad de tiempo**. Se reconocen por la barra «/s» («por segundo») o por expresiones como «por hora» o «al año».",
    "La relación es siempre la misma: **total = ritmo × tiempo**. Y al revés: ritmo = total ÷ tiempo.",
    {
     "ul": [
      "**Energía:** {{julios|g-vatio}} (J), un total; vatios (W = J/s), un ritmo.",
      "**Cómputo:** {{FLOP|g-flop}}, operaciones totales; FLOP/s, operaciones por segundo.",
      "**Información:** {{bits o bytes|g-bit}}, un total; bits/s, un ritmo.",
      "**Impulsos de una {{neurona|g-neurona}}:** número de impulsos, un total; *{{hercios|g-hercio}}* (Hz), impulsos por segundo."
     ]
    }
   ],
   "vida": [
    "Un grifo abierto a 10 litros por minuto (ritmo) durante 5 minutos llena 50 litros (total). La factura del agua cobra el total, no el ritmo. Con la electricidad pasa igual: la potencia de tu horno (vatios) es el ritmo; lo que pagas es la energía consumida (kilovatios-hora), que depende de cuánto tiempo esté encendido."
   ],
   "imagen": {
    "pie": "El grifo marca el ritmo; el cubo acumula el total; el reloj los une.",
    "si": "Que el total depende a la vez del ritmo y del tiempo: un grifo lento abierto mucho rato puede llenar más que uno rápido abierto un instante.",
    "no": "El agua se ve y se toca; la energía o la información no se acumulan en un cubo visible. La relación matemática es la misma; la imagen es solo una ayuda.",
    "svg": "lec-f8"
   },
   "ejemplo": {
    "enunciado": "El «cómputo de una vida»: pasar de un ritmo (FLOP/s) a un total (FLOP).",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Ritmo convencional del cerebro: 10¹⁵ FLOP/s (estimado). Tiempo: 30 años."
     ],
     [
      "**Qué significa cada número**",
      "Queremos el total de operaciones equivalentes en 30 años, según esa convención."
     ],
     [
      "**Qué unidades usa**",
      "FLOP/s × segundos = FLOP. Antes hay que pasar los años a segundos: un año tiene unos 3,156 × 10⁷ s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Total = ritmo × tiempo."
     ],
     [
      "**El cálculo**",
      "Tiempo: 30 × 3,156 × 10⁷ s ≈ 9,5 × 10⁸ s\nTotal: 10¹⁵ × 9,5 × 10⁸ = 9,5 × 10²³ FLOP"
     ],
     [
      "**El resultado**",
      "Unos 9,5 × 10²³ FLOP."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Treinta años de cerebro, traducidos con la convención central, equivalen a casi un cuatrillón de operaciones. Entrenar un modelo de IA de frontera en 2026 costó del orden de 10²⁷ FLOP: unas mil «vidas»."
     ]
    ]
   },
   "prediccion": {
    "q": "Un grifo A echa 2 litros por minuto durante 30 minutos; un grifo B, 20 litros por minuto durante 2 minutos. ¿Cuál llena más?",
    "opciones": [
     "B, porque es diez veces más rápido",
     "A",
     "Los dos igual"
    ],
    "ok": 1,
    "porque": "A: 2 × 30 = 60 litros. B: 20 × 2 = 40 litros. El más rápido no siempre acumula más: el total depende también del tiempo."
   },
   "actividad": "bucket",
   "descubrir": [
    "Mismo total con ritmos distintos, o mismo ritmo con totales distintos: lo decide el tiempo. Si una unidad lleva «/s», es un ritmo; si no, un total. Comparar un ritmo con un total es como comparar la velocidad de un carro con la distancia que recorrió."
   ],
   "error": {
    "mal": "Comparar FLOP con FLOP/s, o julios con vatios, como si fueran la misma cosa.",
    "bien": "Mira si la unidad lleva «por segundo». Para pasar de ritmo a total, multiplica por el tiempo; para pasar de total a ritmo, divide entre el tiempo."
   },
   "quiz": {
    "q": "Los centros de datos del mundo consumieron unos 485 {{TWh|g-twh}} en 2025. ¿Qué tipo de cifra es «485 TWh»?",
    "opciones": [
     {
      "t": "Un total de energía, acumulado durante un año",
      "fb": "El teravatio-hora es una unidad de energía (potencia × tiempo) y la cifra se refiere a un periodo, un año. Dividida entre las 8.760 horas del año da el ritmo medio: unos 55 GW.",
      "ok": true
     },
     {
      "t": "Un ritmo, porque los teravatios son potencia",
      "fb": "El «‑hora» del teravatio-hora convierte la potencia en energía: TW × h es un total, igual que litros = (litros por minuto) × minutos."
     },
     {
      "t": "Un número de máquinas",
      "fb": "TWh es una unidad de energía, no un recuento."
     }
    ],
    "pista": "¿La unidad lleva «por segundo» o multiplica una potencia por un tiempo?"
   },
   "clave": {
    "sencillo": "Total = ritmo × tiempo. Fíjate siempre en si la unidad lleva «por segundo».",
    "cientifico": "una tasa es la variación por unidad de tiempo de una cantidad acumulada; para una tasa constante, total = tasa × duración (en general, la integral de la tasa en el intervalo)."
   },
   "profundizaSub": "dónde se usa esta herramienta",
   "profundiza": [
    "**Profundización científica**: el cómputo de una vida, en el [Taller 8 · Lección III.2: entrenar una IA](#m2t8-lec-iii2).",
    "[Glosario: teravatio-hora](#m2glosario-g-twh)"
   ]
  },
  {
   "id": "lec-f9",
   "tipo": "leccion",
   "codigo": "F9",
   "nav": "F9 · Estimar",
   "titulo": "Estimar: por qué una cifra puede tener varios valores razonables",
   "pregunta": "¿Cómo es posible que dos estudios serios den números distintos para lo mismo?",
   "min": 6,
   "dim": "cnt",
   "sencillo": [
    "Medir no siempre es posible: nadie ha contado una a una las {{neuronas|g-neurona}} de un {{encéfalo|g-encefalo}} humano. Cuando no se puede medir directamente, se *estima*: se combinan mediciones parciales con supuestos razonables. Si cambian los supuestos o las muestras, cambia el resultado. Por eso muchas cifras vienen con un *intervalo*: un valor más bajo y otro más alto entre los que probablemente está la cantidad.",
    "Símbolos que verás: «~» y «≈» significan «aproximadamente»; «61–99» significa «entre 61 y 99»; «±» indica un margen alrededor de un valor central (86,1 ± 8,1 se lee «86,1, más o menos 8,1»); «<» y «>» significan «menos de» y «más de».",
    "Una estimación honesta dice tres cosas: el valor central, el margen y **de dónde salen**. Ocultar el margen para que la cifra parezca más firme convierte una estimación en una falsa certeza."
   ],
   "vida": [
    "Si te preguntan cuánto tardas en llegar al trabajo, dirás «unos 25 minutos; entre 20 y 40 si hay mucho tráfico». Es una estimación con intervalo, basada en tu experiencia (tus mediciones previas) y en supuestos (que no haya huelga). Otra persona que haga el trayecto a otra hora dará otra cifra igual de razonable."
   ],
   "imagen": {
    "pie": "Un valor central y su margen: la barra dice cuánto podría moverse la cifra.",
    "si": "Que una estimación es una zona, no un punto.",
    "no": "Un intervalo no garantiza que el valor real esté dentro: depende de cómo se calculó. Y un intervalo estrecho no prueba que esté bien centrado.",
    "svg": "lec-f9"
   },
   "ejemplo": {
    "enunciado": "¿Qué significa «86,1 ± 8,1 mil millones de neuronas»?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "86,1 ± 8,1 mil millones de neuronas (Azevedo et al., 2009), a partir de cuatro encéfalos de varones."
     ],
     [
      "**Qué significa cada número**",
      "86,1 es la media de los cuatro; 8,1 es la *desviación estándar*, una medida de cuánto se apartaban los cuatro valores de esa media."
     ],
     [
      "**Qué unidades usa**",
      "Miles de millones de neuronas (10⁹)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Restar y sumar el margen al valor central."
     ],
     [
      "**El cálculo**",
      "Extremo bajo: 86,1 − 8,1 = 78,0\nExtremo alto: 86,1 + 8,1 = 94,2"
     ],
     [
      "**El resultado**",
      "De unos 78.000 a unos 94.200 millones."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Los cuatro encéfalos medidos se movían, típicamente, entre 78.000 y 94.000 millones. Con muestras tan pequeñas, otros análisis admiten promedios de 73.000 a 99.000 millones en varones y de 61.000 a 73.000 millones en mujeres (Goriely, 2025a, 2025b)."
     ]
    ]
   },
   "prediccion": {
    "q": "Si haces más ancho el margen de uno de tus supuestos, ¿qué le pasa al intervalo del resultado?",
    "opciones": [
     "No cambia",
     "Se ensancha",
     "Se estrecha"
    ],
    "ok": 1,
    "porque": "Cuanto más inciertos son los supuestos, más ancho es el intervalo del resultado: la incertidumbre se arrastra a lo largo de la cuenta."
   },
   "actividad": "estimate",
   "descubrir": [
    "Cada supuesto con margen ensancha el resultado. Cuando se multiplican varios supuestos inciertos, el intervalo final se ensancha más que el de cualquiera de ellos. Por eso las estimaciones encadenadas, como la del cómputo cerebral (tres factores multiplicados), terminan con márgenes de varios {{órdenes de magnitud|g-orden}}."
   ],
   "error": {
    "mal": "Quedarse con el valor central y olvidar el intervalo: «el cerebro tiene exactamente 86.000 millones de neuronas».",
    "bien": "Da la cifra con su margen y su origen: «unos 86.000 millones, según cuatro encéfalos de varones; los datos admiten de 61.000 a 99.000 millones según el sexo y el estudio»."
   },
   "quiz": {
    "q": "Un estudio da «entre 10¹³ y 10¹⁷ FLOP/s, con valor central 10¹⁵». ¿Qué afirmación es correcta?",
    "opciones": [
     {
      "t": "El valor real es 10¹⁵ FLOP/s",
      "fb": "10¹⁵ es el valor central de una estimación, no una medición: el propio estudio admite cuatro órdenes de magnitud de margen."
     },
     {
      "t": "Es una estimación con un margen enorme: el extremo alto es 10.000 veces el bajo",
      "fb": "17 − 13 = 4 órdenes de magnitud: un factor 10.000. El valor central sirve como convención de cálculo, no como dato firme.",
      "ok": true
     },
     {
      "t": "Con tanto margen, la cifra no sirve para nada",
      "fb": "Un intervalo amplio sigue siendo información: descarta los valores que quedan fuera y permite razonar en órdenes de magnitud."
     }
    ],
    "pista": "Distingue entre un valor central y un valor medido."
   },
   "clave": {
    "sencillo": "Una estimación honesta da un valor, un margen y su origen.",
    "cientifico": "las estimaciones combinan mediciones y supuestos; su incertidumbre se propaga (en productos, se acumulan las incertidumbres relativas o logarítmicas) y debe comunicarse junto al valor central."
   },
   "profundizaSub": "dónde se usa esta herramienta",
   "profundiza": [
    "**Profundización científica**: el debate de los 86.000 millones, en el [Taller 5 · Lección I.6: contar neuronas](#m2t5-lec-i6)."
   ]
  },
  {
   "id": "lec-f10",
   "tipo": "leccion",
   "codigo": "F10",
   "nav": "F10 · Cómo leer una gráfica de este recorrido",
   "titulo": "Cómo leer una gráfica de este recorrido",
   "pregunta": "¿Qué hay que mirar primero en una gráfica para no malinterpretarla?",
   "min": 6,
   "dim": "ink",
   "sencillo": [
    "Primero, la pregunta: cada figura responde a una pregunta concreta, y solo a esa. La guía «Explícame esta gráfica desde cero» que acompaña a cada figura compleja la escribe explícitamente, junto con lo que la figura **no** permite concluir.",
    "Después, antes de mirar los datos, mira el marco. Una gráfica tiene *ejes* —las líneas con marcas que hacen de regla—, y cada eje dice qué se mide y en qué unidad. Lo primero del marco es responder: ¿qué representa cada eje? ¿En qué unidad? ¿La escala es lineal o {{logarítmica|g-log}}?",
    "Luego, los símbolos: el **color** indica la dimensión, y la **forma del marcador**, {{la confianza del dato|g-marcas}}. Tienes la leyenda completa en la imagen: colores, formas y otros signos, como la trama de rayas de una {{proyección|g-extrapolacion}}."
   ],
   "vida": [
    "Un mapa del tiempo no se lee igual que uno de carreteras: primero miras la leyenda (¿los colores son temperaturas o lluvia?) y la escala. Con las gráficas pasa lo mismo: quien mira los colores antes que la leyenda se equivoca."
   ],
   "imagen": {
    "widget": "m2.leyenda-f10",
    "pie": "La leyenda de este recorrido: tenla a mano al leer cualquier figura."
   },
   "ejemplo": {
    "enunciado": "Leer un punto en una gráfica logarítmica.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Un rombo lleno sobre un eje logarítmico de vatios, justo a mitad de camino entre las marcas 10⁷ y 10⁸."
     ],
     [
      "**Qué significa cada número**",
      "Rombo lleno: dato medido. El eje mide potencia."
     ],
     [
      "**Qué unidades usa**",
      "Vatios (W)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "En escala logarítmica, «a mitad de camino» entre 10⁷ y 10⁸ es 10⁷·⁵ (exponente 7,5), no la media aritmética 5,5 × 10⁷."
     ],
     [
      "**El cálculo**",
      "10⁷·⁵ = 10⁷ × 10⁰·⁵ ≈ 10⁷ × 3,16 ≈ 3,2 × 10⁷ W"
     ],
     [
      "**El resultado**",
      "Unos 32 MW, medidos."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Un sistema que consume unos 32 megavatios, dato medido. La mitad visual entre dos marcas logarítmicas vale ×3,16, no la media de los dos valores."
     ]
    ]
   },
   "prediccion": {
    "q": "En un eje logarítmico, ¿qué valor está a mitad de camino entre 1 y 100?",
    "opciones": [
     "50",
     "10",
     "Unos 31"
    ],
    "ok": 1,
    "porque": "Entre 1 y 100 hay dos tramos de ×10; la mitad es un tramo: 10. En escala logarítmica, la mitad visual es la media geométrica (√(1 × 100) = 10), no la aritmética."
   },
   "actividad": "readgraph",
   "descubrir": [
    "Leer bien una gráfica es seguir un orden: pregunta → ejes y unidades → escala → símbolos → datos → límites. Quien se salta los primeros pasos hace decir a los datos cosas que no dicen."
   ],
   "error": {
    "mal": "Comparar alturas o longitudes en una gráfica logarítmica como si fueran proporcionales a las cantidades.",
    "bien": "En escala logarítmica, compara contando tramos (factores de diez), no midiendo longitudes como si fueran cantidades."
   },
   "quiz": {
    "q": "En una figura ves un rombo hueco. ¿Qué te dice su forma?",
    "opciones": [
     {
      "t": "Que es un dato medido",
      "fb": "El dato medido es un rombo *lleno*. El hueco indica algo que todavía no ha ocurrido —una proyección— o un cálculo derivado: no una observación."
     },
     {
      "t": "Que es una proyección: una hoja de ruta, un objetivo o un escenario",
      "fb": "Rombo hueco = proyectado. Las formas huecas (rombo y círculo) se reservan para cifras que no son observaciones: proyecciones y extrapolaciones.",
      "ok": true
     },
     {
      "t": "Que es un dato poco importante",
      "fb": "La forma no indica importancia sino el tipo de evidencia."
     }
    ],
    "pista": "Lleno: observado o estimado hoy. Hueco: futuro o cálculo derivado."
   },
   "clave": {
    "sencillo": "Primero la pregunta, los ejes, las unidades y la escala; después, los datos.",
    "cientifico": "interpretar una visualización exige identificar las variables codificadas (posición, color, forma), sus escalas y unidades, y el alcance inferencial de lo representado."
   },
   "profundizaSub": "la leyenda en palabras y dónde se usa",
   "profundiza": [
    "**La leyenda completa, en palabras.** En este recorrido, el **color** indica la dimensión (azul: cantidad; verde azulado: cómputo; ámbar: energía; rosa: información; gris: otras), y la **forma del marcador**, la confianza del dato: rombo lleno, medido; círculo lleno, estimado; cuadrado lleno, declarado; rombo hueco, proyectado; círculo hueco, extrapolado. Una barra alrededor de un punto marca un intervalo; una línea discontinua, una referencia; una trama de rayas, una proyección o una zona hipotética.",
    "**Profundización científica**: las cuatro reglas y su leyenda, en el [Taller 3 · Cuatro reglas para medir lo inmenso](#m2t3-cap-reglas)."
   ]
  },
  {
   "id": "lec-f11",
   "tipo": "leccion",
   "codigo": "F11",
   "nav": "F11 · Cinco clases de cifras",
   "titulo": "Cinco clases de cifras: medido, estimado, declarado, proyectado y extrapolado",
   "pregunta": "¿Vale lo mismo un récord medido que lo que anuncia el fabricante de una máquina?",
   "min": 7,
   "dim": "ink",
   "sencillo": [
    "No todas las cifras tienen la misma solidez. Este recorrido marca cada una con su {{tipo de evidencia|g-marcas}}, y en las figuras la forma del marcador lo repite:",
    {
     "ul": [
      "[medido] **Medido:** resultado publicado con *revisión por pares* —otros científicos lo revisaron antes de publicarse— o en una clasificación oficial de rendimiento. Es lo más sólido, aunque también tiene margen de error.",
      "[estimado] **Estimado:** sale de un modelo o del juicio de expertos, con supuestos explícitos. Puede ser excelente, pero depende de esos supuestos.",
      "[declarado] **Declarado:** lo afirma quien construyó el sistema, sin una evaluación independiente publicada. No es necesariamente falso, pero nadie ajeno lo ha comprobado.",
      "[proyectado] **Proyectado:** una hoja de ruta, un objetivo o un escenario de terceros sobre el futuro.",
      "[extrapolado] **Extrapolado:** un cálculo propio de este recorrido a partir de las fuentes citadas; por ejemplo, {{prolongar una tendencia|g-extrapolacion}} o dividir dos cifras."
     ]
    },
    "Toca cualquier etiqueta (o pasa el cursor por ella) para recordar su significado. Ante cualquier cifra, la pregunta clave es: **¿quién lo dice, cómo lo sabe y qué supone?**"
   ],
   "vida": [
    "Un carro puede anunciar un consumo de 5 litros cada 100 km (declarado por el fabricante, en condiciones de laboratorio); una revista puede medirlo en carretera (medido); tú puedes calcular cuánto gastarás en un viaje (extrapolado), y el fabricante puede prometer que el modelo del año que viene gastará menos (proyectado). Las cuatro cifras hablan del mismo carro y no valen lo mismo."
   ],
   "imagen": {
    "pie": "La forma del marcador lleva el tipo de evidencia: lleno, el presente; hueco, el futuro o un cálculo derivado.",
    "si": "Que la forma permite distinguir de un vistazo la solidez de cada punto, incluso sin distinguir colores.",
    "no": "La marca resume el origen del dato, no su exactitud: un dato medido puede tener un margen amplio, y una estimación prudente puede ser muy buena.",
    "svg": "lec-f11"
   },
   "ejemplo": {
    "enunciado": "Clasificar la frase «Hala Point tiene 1.150 millones de neuronas de silicio».",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "1,15 × 10⁹ neuronas de silicio; fuente: comunicado de prensa de Intel (2024)."
     ],
     [
      "**Qué significa cada número**",
      "Es una cifra que da el fabricante sobre su propio sistema."
     ],
     [
      "**Qué unidades usa**",
      "Neuronas de silicio: objetos contados de un tipo especial, mucho más simples que las neuronas biológicas."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Ninguna aritmética: se trata de identificar la fuente y si existe una evaluación independiente."
     ],
     [
      "**El cálculo**",
      "¿Lo publica el fabricante? Sí.\n¿Hay evaluación independiente publicada? No consta."
     ],
     [
      "**El resultado**",
      "[declarado]"
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es una cifra plausible y útil, pero procede de quien construyó la máquina. Su porcentaje respecto del encéfalo humano (1,3 %) es, además, un cálculo propio: extrapolado."
     ]
    ]
   },
   "prediccion": {
    "q": "«Con un crecimiento del 25 % anual, la supercomputadora líder rondaría 20 {{EFLOP/s|g-exa}} en 2036.» ¿Qué tipo de cifra es?",
    "opciones": [
     "Medida: un resultado ya observado",
     "Proyectada: un objetivo anunciado para el futuro",
     "Extrapolada: un cálculo condicionado a una tasa"
    ],
    "ok": 2,
    "porque": "Es un cálculo que prolonga una tendencia con una tasa supuesta: una extrapolación. No es una medición ni un objetivo anunciado."
   },
   "actividad": "classify-evidence",
   "descubrir": [
    "Una misma frase puede contener cifras de tipos distintos: un dato declarado y un porcentaje calculado a partir de él. Al simplificar el lenguaje es fácil convertir una estimación en un hecho; las marcas de confianza existen para impedirlo."
   ],
   "error": {
    "mal": "Tratar una cifra declarada por un fabricante, o una proyección, como si fuera un resultado medido.",
    "bien": "Busca la marca: [declarado] y [proyectado] exigen más cautela que [medido]. Pregunta siempre quién lo dice y cómo lo sabe."
   },
   "quiz": {
    "q": "Willow, un procesador cuántico de Google, obtuvo un factor de supresión del error Λ = 2,14 en un experimento publicado en la revista científica *Nature*, que hace revisar cada artículo por otros expertos antes de publicarlo. ¿Qué marca le corresponde?",
    "opciones": [
     {
      "t": "Medido",
      "fb": "Es un resultado experimental publicado con revisión por pares: medido.",
      "ok": true
     },
     {
      "t": "Declarado",
      "fb": "Aunque lo obtuvo la propia empresa, se publicó en una revista con revisión por pares: eso lo convierte en medido."
     },
     {
      "t": "Proyectado",
      "fb": "No es un objetivo futuro: es un resultado ya obtenido."
     }
    ],
    "pista": "¿Hubo revisión de otros científicos antes de publicarse?"
   },
   "clave": {
    "sencillo": "Pregunta siempre: ¿quién lo dice, cómo lo sabe y qué supone?",
    "cientifico": "el estatus epistémico de una cifra —observación revisada, modelo, declaración no verificada, escenario o cálculo derivado— condiciona qué inferencias legitima."
   },
   "profundizaSub": "dónde se usa esta herramienta",
   "profundiza": [
    "**Profundización científica**: [Fuentes y método: tipos de fuentes y de cifras](#m2fuentes)"
   ]
  },
  {
   "id": "hasta-aqui",
   "tipo": "texto",
   "nav": "Hasta aquí",
   "kicker": "Resumen · Talleres 1 y 2",
   "titulo": "Con la caja de herramientas sabes que…",
   "bloques": [
    {
     "ul": [
      "Una cifra completa tiene número y unidad, y solo se compara con cifras de la misma unidad.",
      "El exponente de una potencia de diez cuenta ceros; un orden de magnitud es un factor diez; multiplicar potencias es sumar exponentes.",
      "En una escala logarítmica, la distancia es un cociente: cada tramo igual multiplica por diez.",
      "Total = ritmo × tiempo; las unidades con «/s» son ritmos.",
      "Una estimación honesta da valor, margen y origen, y cada cifra lleva una marca de confianza."
     ]
    },
    "**Con las herramientas en la mano.** ¿Qué cuatro preguntas hay que separar para comparar un cerebro con una máquina? Lo verás en el [Taller 3 · Cuatro reglas para medir lo inmenso](#m2t3-cap-reglas)."
   ]
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "Cifras con margen: la misma cuenta, varios valores razonables",
     "min": 15,
     "d": [
      "Cada persona estima cuántas veces late un corazón a lo largo de una vida con sus propios supuestos, como en la actividad de la lección [F9](#m2t2-lec-f9). Después, el grupo compara valores centrales e intervalos."
     ],
     "pasos": [
      "Cada persona anota sus dos supuestos —pulsaciones por minuto y años de vida— y un margen en porcentaje para cada uno (por ejemplo, ±10 % o ±20 %).",
      "Con la calculadora de la lección F9, obtiene su valor central y su intervalo. Recuerda la lección F8: el total de latidos es un ritmo (latidos por minuto) multiplicado por un tiempo (los minutos de toda una vida). Si no hay un dispositivo para cada persona, quien coordina proyecta la calculadora y va poniendo los supuestos de cada una.",
      "En la pizarra, dibuja una línea recta que empiece en 0 y tenga diez marcas iguales, una cada 10⁹ (cada 1.000 millones); numera las marcas del 1 al 10. Cada persona marca su valor central con un círculo y su intervalo con una barra. La mantisa dice dónde va cada valor: uno que empieza por 2 y lleva × 10⁹ cae entre las marcas 2 y 3, y uno escrito con 10⁸ (menos de 1.000 millones) queda entre el 0 y la marca 1.",
      "Conversen: ¿por qué salen valores distintos si todos los supuestos son razonables? ¿Qué le pasa al intervalo cuando alguien ensancha un margen? ¿Cómo dirían el resultado del grupo con valor central, margen y origen?"
     ],
     "nota": "Los valores de esta actividad son supuestos, no datos. Lo que se practica es decir una estimación honesta: valor central, margen y de dónde salen."
    },
    {
     "t": "¿Quién lo dice? Cinco columnas para clasificar cifras",
     "min": 20,
     "d": "En grupos pequeños, clasifiquen cifras del taller según su marca de confianza y defiendan cada decisión con la pregunta clave: **¿quién lo dice, cómo lo sabe y qué supone?** Las afirmaciones salen de la actividad de la lección [F11](#m2t2-lec-f11).",
     "pasos": [
      "Antes de la sesión, copia en tarjetas las afirmaciones de la actividad de la lección F11, una por tarjeta, y añade las cuatro cifras del carro de «En tu vida diaria» de esa misma lección: el consumo que anuncia el fabricante, el que mide una revista en carretera, el gasto que calculas para tu viaje y lo que promete el fabricante para el modelo del año que viene.",
      "Dibuja en un papel grande cinco columnas, cada una con su forma: rombo lleno, medido; círculo lleno, estimado; cuadrado lleno, declarado; rombo hueco, proyectado; círculo hueco, extrapolado.",
      "Reparte las tarjetas. Cada grupo las coloca en una columna y escribe al lado, en una frase, quién lo dice y cómo lo sabe.",
      "Puesta en común: ¿qué tarjetas provocaron desacuerdo? Comparen su decisión con la explicación que da la actividad de la lección F11 y, para las tarjetas del carro, con el párrafo «En tu vida diaria» de esa lección.",
      "Para cerrar, busquen una frase que contenga dos tipos de cifra a la vez, como la de Hala Point del ejemplo resuelto: un dato declarado y un porcentaje calculado a partir de él."
     ],
     "nota": "Sin tiempo para preparar tarjetas, proyecta la actividad de la lección F11 y voten cada afirmación a mano alzada antes de pulsar la respuesta. Para quien coordina, el origen de cada tipo de cifra se explica en [Fuentes y método: tipos de fuentes y de cifras](#m2fuentes)."
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "fundamentos"
 ]
});
})();
