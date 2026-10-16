/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 7 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Lo técnico va en desplegables; las actividades, figuras y animaciones están en widgets/taller07.js. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 7,
 "slug": "m2t7",
 "etapa": "acto2",
 "titulo": "Supercomputadoras y centros de datos",
 "emblema": "GW",
 "pregunta": "¿Qué miden de verdad las cifras de las supercomputadoras y de los centros de datos de inteligencia artificial?",
 "intro": "Subimos a las máquinas más grandes que existen: las supercomputadoras que resuelven problemas científicos y los campus que entrenan y ejecutan inteligencia artificial. Verás cómo se decide cuál es la más rápida, por qué un campus se mide en gigavatios y su consumo en teravatios-hora, y qué significa decir que «equivale a 47 millones de cerebros». Todo se resuelve con multiplicaciones y divisiones, y con mucha atención a lo que cada cifra no dice.",
 "objetivos": [
  "Explicar qué mide la lista TOP500 y por qué la misma supercomputadora da cifras muy distintas según el banco de pruebas.",
  "Calcular la eficiencia de una supercomputadora dividiendo sus operaciones por segundo entre su potencia.",
  "Distinguir potencia (gigavatios) de energía (teravatios-hora) y pasar de una a otra con las horas y el uso medio.",
  "Calcular un crecimiento compuesto y explicar por qué los escenarios para 2036 son extrapolaciones, no predicciones.",
  "Traducir una potencia a «cerebros de 20 W» y reconocer que esa equivalencia no compara cómputo ni inteligencia."
 ],
 "prerequisitos": [
  {
   "ul": [
    "[D2 · FLOP y FLOP/s](#m2t3-lec-d2) y [D3 · Vatios y julios](#m2t3-lec-d3), del Taller 3: qué es una operación por segundo y en qué se diferencian potencia y energía",
    "[F5 · Orden de magnitud](#m2t1-lec-f5) y [F6 · Escala logarítmica](#m2t1-lec-f6), del Taller 1, y [F7 · Multiplicar potencias](#m2t2-lec-f7) y [F10 · Leer una gráfica](#m2t2-lec-f10), del Taller 2",
    "[F11 · Clases de cifras](#m2t2-lec-f11), del Taller 2: medido, estimado, declarado, proyectado y extrapolado",
    "El [Taller 6](#m2t6), que sube del interruptor al chip; aquí la escalera de niveles continúa hasta las supercomputadoras y los centros de datos"
   ]
  }
 ],
 "secciones": [
  {
   "id": "lec-ii4",
   "tipo": "leccion",
   "codigo": "II.4",
   "nav": "II.4 · La supercomputadora y sus bancos de prueba",
   "titulo": "La supercomputadora y sus bancos de prueba",
   "pregunta": "¿Cómo se decide cuál es la computadora más rápida del mundo?",
   "min": 9,
   "dim": "cmp",
   "sencillo": [
    "Una *supercomputadora* une miles de procesadores con una red muy rápida para que trabajen como una sola máquina en problemas científicos: el clima, los materiales, la física nuclear. Para compararlas, la lista {{TOP500|g-top500}} pone a todas a resolver el mismo problema, un *banco de pruebas* llamado {{HPL|g-hpl}}.",
    "El resultado se llama *{{Rmax|g-pico}}*: operaciones por segundo **medidas** durante la prueba. El *Rpeak* es el pico teórico. En junio de 2026, el n.º 1 es LineShine, en Shenzhen: 2,198 EFLOP/s (un exaflop por segundo, EFLOP/s, son 10¹⁸ operaciones por segundo), con 42,2 MW de potencia durante la medición. Le siguen El Capitan, Frontier, Aurora y JUPITER Booster: cinco máquinas de *{{exaescala|g-exa}}*, es decir, de al menos 10¹⁸ FLOP/s.",
    "Si divides las operaciones por segundo entre la potencia (un vatio es un julio por segundo), obtienes la *{{eficiencia|g-eficiencia}}*: cuántas operaciones hace la máquina con cada julio de energía. Se expresa en GFLOP/s por vatio.",
    "El HPL mantiene muy ocupados los procesadores. En otra prueba, el banco {{HPCG|g-hpcg}}, que los obliga a esperar a la memoria, las mismas máquinas rinden en torno al 1\u00a0% de su cifra en HPL. Y con {{precisión mixta|g-mixta}}, es decir, con números de distintos tamaños, El Capitan rinde 9,2 veces más. Una máquina, tres cifras."
   ],
   "vida": [
    "La velocidad máxima de un coche se mide en un circuito vacío. En la ciudad, con semáforos y atascos, irá mucho más despacio. Ninguna de las dos cifras miente: responden a preguntas distintas."
   ],
   "imagen": {
    "pie": "La misma máquina rinde el 100\u00a0% en HPL y ~1\u00a0% en HPCG.",
    "si": "Que el resultado depende del problema: unos dejan trabajar a los procesadores sin pausa y otros los hacen esperar a la memoria.",
    "no": "El HPCG no es «la velocidad real» de la máquina: es otra carga concreta. Cada aplicación cae en su propio punto entre los dos extremos.",
    "svg": "lec-ii4"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas operaciones hace Frontier por cada julio?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Rmax = 1,353 EFLOP/s; potencia durante la medición = 24,607 MW (TOP500, medido)."
     ],
     [
      "**Qué significa cada número**",
      "1,353 × 10¹⁸ operaciones por segundo con un consumo de 24,607 × 10⁶ julios por segundo."
     ],
     [
      "**Qué unidades usa**",
      "FLOP/s ÷ W = FLOP/J: operaciones por julio."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir el rendimiento entre la potencia; después, invertir para obtener julios por operación."
     ],
     [
      "**El cálculo**",
      "1,353 × 10¹⁸ ÷ 24,607 × 10⁶ ≈ 5,5 × 10¹⁰ FLOP/J = 55 GFLOP/s por vatio · 1 ÷ 5,5 × 10¹⁰ ≈ 1,8 × 10⁻¹¹ J"
     ],
     [
      "**El resultado**",
      "≈ 55 GFLOP/s por vatio, ~18 pJ por operación FP64."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es la eficiencia en HPL. La tabla del desplegable «Profundiza» de la figura [«Una máquina, tres cifras»](#m2t7-fig-una-maquina-tres-cifras) trae esta columna para las cinco máquinas: compruébala con la actividad."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Qué máquina hace más operaciones por julio: LineShine, la más rápida, o JUPITER Booster, la quinta?",
    "opciones": [
     "LineShine",
     "JUPITER Booster",
     "Hacen las mismas"
    ],
    "ok": 1,
    "porque": "JUPITER Booster: 63,3 GFLOP/s por vatio frente a 52,1 de LineShine. Ser el más rápido no implica ser el más eficiente."
   },
   "actividad": "tablecalc",
   "descubrir": [
    "Rapidez y eficiencia son preguntas distintas, y las dos dependen del banco de pruebas. Además, el «{{nivel|g-nivel}}» de medición de la potencia cambia qué parte del sistema se mide: las eficiencias de la tabla no son estrictamente homogéneas."
   ],
   "error": {
    "mal": "«La supercomputadora más rápida es también la más eficiente y rinde lo mismo en cualquier problema.»",
    "bien": "La más rápida en HPL no es la que más opera por julio, y en HPCG las mismas máquinas rinden ~1 % de su HPL. Pico, HPL y HPCG responden a preguntas distintas ([trampa 4](#m2t10-trampas))."
   },
   "quiz": {
    "q": "¿Qué mide Rmax en la lista TOP500?",
    "opciones": [
     {
      "t": "El pico teórico de la máquina",
      "fb": "Ese es Rpeak. Rmax se mide."
     },
     {
      "t": "Las operaciones por segundo medidas al resolver el banco HPL",
      "fb": "Exacto: es un rendimiento sostenido en un problema concreto, en doble precisión.",
      "ok": true
     },
     {
      "t": "La velocidad media de todas las aplicaciones científicas",
      "fb": "No: un solo banco de pruebas no describe todas las aplicaciones; en HPCG se obtiene ~1 %."
     }
    ]
   },
   "clave": {
    "sencillo": "La cifra de una supercomputadora depende del problema: en HPL rinde cien veces más que en HPCG.",
    "cientifico": "el TOP500 clasifica por Rmax en HPL (FP64); HPCG, limitado por la memoria, da ~1 % de esa cifra y HPL-MxP, con precisión mixta, hasta 9,2 veces más; la eficiencia se expresa en GFLOP/s por vatio."
   },
   "profundizaSub": "nombres técnicos y enlaces",
   "profundiza": [
    "**Con sus nombres técnicos.** Para compararlas, la lista *TOP500* —las 500 más potentes, publicada dos veces al año— usa un *banco de pruebas*, un problema estándar que todas resuelven: el *HPL* (*High-Performance Linpack*), un sistema enorme de ecuaciones lineales en doble precisión, {{FP64|g-fp}}.",
    "El HPL mantiene muy ocupados los procesadores. Otros problemas no: en el banco *{{HPCG|g-hpcg}}* (*High-Performance Conjugate Gradients*), limitado por la memoria y la comunicación, estas máquinas rinden en torno al 1 % de su HPL. Y en *{{HPL-MxP|g-mxp}}*, que usa *precisión mixta* (números de distintos tamaños), El Capitan rinde 9,2 veces más. Una máquina, tres cifras.",
    {
     "ul": [
      "Profundiza: [la tabla de los cinco exascala](#m2t7-fig-una-maquina-tres-cifras)",
      "[Trampa 4 · Pico teórico no es rendimiento real](#m2t10-trampas)"
     ]
    }
   ]
  },
  {
   "id": "fig-una-maquina-tres-cifras",
   "tipo": "figura",
   "nav": "Una máquina, tres cifras",
   "titulo": "Una máquina, tres cifras",
   "sub": "El mismo sistema rinde ~1 % de su HPL en {{HPCG|g-hpcg}}, limitado por la memoria, y hasta 9,2 veces más en {{HPL-MxP|g-mxp}}, con {{precisión mixta|g-mixta}}.",
   "widget": "m2.fig-bench",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánto rinde la misma máquina en tres pruebas distintas?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: PFLOP/s en escala logarítmica. Dos filas: El Capitan y LineShine."
     ],
     [
      "Unidades",
      "PFLOP/s (10¹⁵ operaciones por segundo)."
     ],
     [
      "Colores, símbolos y formas",
      "Rombos: resultados medidos en HPCG (izquierda), HPL (centro) y HPL-MxP (derecha). Corchetes: los cocientes (÷100 ≈ 1 %; ×9,2 y ×3,6)."
     ],
     [
      "La escala",
      "Logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Toca o pasa el cursor por cada rombo."
     ],
     [
      "Cómo interpretar el resultado",
      "El HPCG, limitado por la memoria, da en torno al 1 % del HPL; la precisión mixta multiplica la cifra."
     ],
     [
      "Qué permite concluir",
      "Que una sola cifra no describe una máquina: depende de la prueba y de la precisión."
     ],
     [
      "Qué no permite concluir",
      "Decidir cuál es «la verdadera» velocidad: cada prueba representa un tipo de problema."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Los cinco sistemas exascala y dónde está el cálculo de los escenarios",
     "bloques": [
      {
       "tabla": [
        [
         "Sistema",
         "Rmax (EF)",
         "Rpeak (EF)",
         "Potencia (MW)",
         "GFLOP/s/W",
         "Nivel"
        ],
        [
         "LineShine · Shenzhen",
         "2,198",
         "2,736",
         "42,2",
         "52,1",
         "1"
        ],
        [
         "El Capitan · LLNL",
         "1,809",
         "2,821",
         "29,7",
         "60,9",
         "2"
        ],
        [
         "Frontier · ORNL",
         "1,353",
         "2,056",
         "24,6",
         "55,0",
         "2"
        ],
        [
         "Aurora · ANL",
         "1,012",
         "1,980",
         "38,7",
         "26,2",
         "2"
        ],
        [
         "JUPITER Booster · Jülich",
         "1,000",
         "1,226",
         "15,8",
         "63,3",
         "1"
        ]
       ],
       "titulo": "Sistemas exascala de la lista TOP500 de junio de 2026"
      },
      "LLNL: Laboratorio Nacional Lawrence Livermore; ORNL: Laboratorio Nacional de Oak Ridge; ANL: Laboratorio Nacional Argonne (los tres, en EE. UU.). Rmax: rendimiento medido en el HPL; Rpeak: pico teórico ([lección II.4](#m2t7-lec-ii4)).",
      "El nivel 1 de medición abarca una fracción menor del sistema y de la ejecución que el nivel 2, de modo que las eficiencias no son estrictamente homogéneas (TOP500, 2026b, 2026c).",
      "El cálculo de los escenarios de 2036 (B.7) está en el desplegable «Profundiza» de la figura [«Cada nuevo n.º 1 y cuatro escenarios para 2036»](#m2t7-fig-cada-nuevo-n-1-y-cuatro-escenarios-para-)."
     ]
    }
   ],
   "notas": [
    "PFLOP/s en escala logarítmica (TOP500, 2026c)."
   ]
  },
  {
   "id": "n-super",
   "tipo": "nivel",
   "nav": "Nivel 8 · Supercomputadora",
   "titulo": "Supercomputadora",
   "n": 8,
   "mundo": "sil",
   "puente": "Para la ciencia, decenas de miles de procesadores trabajan como uno solo.",
   "grupo": "Nivel 8 de 9 · Silicio",
   "lead": "La supercomputadora más rápida de 2026, LineShine, en Shenzhen, sostiene 2,2 trillones de operaciones por segundo en doble precisión. Es la primera que supera dos {{exaflops|g-exa}}, y lo hace solo con {{procesadores centrales|g-cpu}}, sin aceleradores.",
   "ancla": {
    "cifra": "2,198 EFLOP/s",
    "que": "en FP64 ({{HPL|g-hpl}}), n.º 1 del TOP500 en junio de 2026",
    "marca": "medido",
    "palabras": "2,2 trillones de operaciones por segundo",
    "analogia": "si cada habitante del planeta hiciera una operación por segundo, tardaría unos ocho años y medio en igualar un solo segundo de esta máquina"
   },
   "evidencia": "ev-9",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Filas de armarios de cómputo (*racks*) en perspectiva, sobre un suelo técnico, con luces de actividad. Por las bandejas de cables de la **red de interconexión** viajan pulsos (verde azulado): miles de procesadores coordinados como si fueran una sola máquina.",
     "↑ [Lección II.4 · La supercomputadora, paso a paso](#m2t7-lec-ii4)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Cinco máquinas exascala y un 1 % incómodo",
     "bloques": [
      "Tras LineShine figuran El Capitan (1,809 EFLOP/s), Frontier (1,353), Aurora (1,012) y JUPITER Booster (1,000): por primera vez hay cinco sistemas exascala, en tres continentes. Pero muchas aplicaciones científicas están limitadas por la memoria y la comunicación: en el banco {{HPCG|g-hpcg}}, estas máquinas rinden en torno al 1 % de su cifra del HPL.",
      {
       "ul": [
        "**42,2 MW** de potencia durante la medición, con el {{nivel 1|g-nivel}} de la metodología [medido]"
       ]
      },
      {
       "cautela": [
        "Para comparar con cautela",
        "Una cifra de pico o de un solo banco de pruebas no describe la capacidad de una máquina: el mismo sistema da ~1 % en HPCG y hasta nueve veces más en precisión mixta ([Trampa 4 · Pico teórico no es rendimiento real](#m2t10-trampas))."
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Salvedades de LineShine",
     "bloques": [
      "LineShine usa {{CPU|g-cpu}} LX2 de arquitectura Armv9 y 304 núcleos unidas por la red LingQi, y sostiene ~80 % de su pico teórico. Su presentación técnica no es pública, su potencia se midió con el {{nivel 1|g-nivel}} y el número de núcleos de la medición equivale a unos 22.680 nodos, frente a 20.480 descritos para la máquina completa (Prickett Morgan, 2026; TOP500, 2026d). Es el primer sistema chino en el n.º 1 desde 2017, un dato que refleja los envíos a la lista: China había dejado de enviar resultados en 2023 (Moss, 2026)."
     ]
    }
   ],
   "widget": "m2.nv-super"
  },
  {
   "id": "lec-ii5",
   "tipo": "leccion",
   "codigo": "II.5",
   "nav": "II.5 · Centros de datos",
   "titulo": "Centros de datos: de vatios a teravatios-hora",
   "pregunta": "Si un campus de IA tiene 1 gigavatio, ¿cuánta electricidad consume?",
   "min": 9,
   "dim": "nrg",
   "sencillo": [
    "Un *{{centro de datos|g-centro}}* es un edificio, o un campus de edificios, lleno de computadoras, con su alimentación eléctrica y su refrigeración. Su tamaño se mide en **potencia**: la *{{potencia IT|g-potit}}* (de *information technology*, tecnologías de la información) es la que llega a los equipos de cómputo; a ella se suma la de la refrigeración y otras cargas. El mayor campus rastreado, Colossus 2, en Memphis, tiene unos 946 megavatios de potencia IT (estimado por Epoch AI).",
    "El consumo, en cambio, es **energía**: potencia por tiempo ([lección D3](#m2t3-lec-d3)). Un año tiene 8.760 horas, así que 1 gigavatio funcionando todo el año a plena carga consume 8.760 gigavatios-hora, unos 8,8 *{{teravatios-hora|g-twh}}* (TWh; un teravatio-hora son 10¹² vatios-hora). En la práctica, los equipos no trabajan siempre al máximo: la base de Epoch AI describe capacidad instalada, y el uso medio ronda el 60–80 %.",
    "Para el conjunto del mundo, la Agencia Internacional de Energía (IEA, del inglés *International Energy Agency*) estima que los centros de datos consumieron unos 485 TWh en 2025 y proyecta unos 950 TWh en 2030."
   ],
   "vida": [
    "Tu factura de la luz no cobra vatios, sino kilovatios-hora. Un horno de 2.000 W encendido media hora consume 1 kWh; una bombilla de 10 W necesita cien horas para gastar lo mismo. La potencia es «cuánto a la vez»; la energía, «cuánto en total»."
   ],
   "imagen": {
    "pie": "La energía es el área: altura (potencia) por anchura (tiempo).",
    "si": "Que para pasar de potencia a energía hay que multiplicar por el tiempo, y que la misma energía puede venir de mucha potencia poco tiempo o de poca potencia mucho tiempo.",
    "no": "Un centro de datos no consume a potencia constante: su carga sube y baja, a veces más de un 50 % en menos de un segundo. El rectángulo es la versión media.",
    "svg": "lec-ii5"
   },
   "ejemplo": {
    "enunciado": "Del consumo anual de todos los centros de datos a su potencia media.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "485 TWh consumidos en 2025 (IEA, 2026; estimado). Un año = 8.760 horas."
     ],
     [
      "**Qué significa cada número**",
      "Una energía total (TWh) repartida en un tiempo (horas)."
     ],
     [
      "**Qué unidades usa**",
      "TWh = 10¹² Wh; dividir Wh entre h deja W, una potencia."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir la energía entre el tiempo da la potencia media."
     ],
     [
      "**El cálculo**",
      "485 × 10¹² Wh ÷ 8.760 h ≈ 5,5 × 10¹⁰ W = 55 GW"
     ],
     [
      "**El resultado**",
      "≈ 55 GW de potencia media, la de unos 2.800 millones de cerebros de 20 W."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es una media de todos los centros de datos del mundo, no solo los de IA, y no indica el pico. La división muestra que energía y potencia se convierten con el tiempo."
     ]
    ]
   },
   "prediccion": {
    "q": "Un campus de 1 GW que funcionara todo el año al 70 % de su capacidad, ¿cuánta energía consumiría?",
    "opciones": [
     "0,7 TWh",
     "Unos 6 TWh",
     "Unos 61 TWh"
    ],
    "ok": 1,
    "porque": "Unos 6 TWh: 1 GW × 8.760 h × 0,7 ≈ 6.100 GWh ≈ 6,1 TWh. Cálculo ilustrativo, con un uso supuesto."
   },
   "actividad": "twh",
   "descubrir": [
    "Gigavatios y teravatios-hora no compiten: los primeros dicen cuánta infraestructura eléctrica exige un campus; los segundos, cuánta energía consume en un periodo. Para pasar de uno a otro necesitas el tiempo y el uso medio, que casi nunca es del 100 %."
   ],
   "error": {
    "mal": "«Un campus de 1 GW consume 1 GW al año.»",
    "bien": "El gigavatio es un ritmo, no una cantidad. En un año, a plena carga, 1 GW consume 8.760 GWh ≈ 8,8 TWh; con un uso del 60–80 %, menos."
   },
   "quiz": {
    "q": "Los centros de datos del mundo consumieron unos 485 TWh en 2025. ¿Qué tipo de magnitud es?",
    "opciones": [
     {
      "t": "Una potencia, como los 946 MW de Colossus 2",
      "fb": "Los teravatios-hora son energía: potencia acumulada durante un tiempo."
     },
     {
      "t": "Una energía: lo consumido durante todo el año",
      "fb": "Exacto. Dividida entre las 8.760 horas del año da una potencia media de ~55 GW.",
      "ok": true
     },
     {
      "t": "Una eficiencia: operaciones por julio",
      "fb": "No hay operaciones en esa cifra: solo energía."
     }
    ]
   },
   "clave": {
    "sencillo": "Potencia por tiempo es energía: un gigavatio durante un año son casi 9 TWh si funciona sin parar.",
    "cientifico": "E = P × t; 1 GW × 8.760 h = 8,76 TWh a plena carga; la potencia media de todos los centros de datos en 2025 fue ≈ 485 TWh ÷ 8.760 h ≈ 55 GW."
   },
   "profundizaSub": "enlaces para seguir",
   "profundiza": [
    {
     "ul": [
      "Profundiza: [cómo se estiman los campus](#m2t7-n-centro)",
      "[Capítulo: centros de datos, medidos en cerebros](#m2t7-cap-centros)"
     ]
    }
   ]
  },
  {
   "id": "n-centro",
   "tipo": "nivel",
   "nav": "Nivel 9 · Centro de datos de IA",
   "titulo": "Centro de datos de IA",
   "n": 9,
   "mundo": "sil",
   "puente": "Fuera de las listas científicas crece otra escala, la industrial.",
   "grupo": "Nivel 9 de 9 · Silicio",
   "lead": "Los campus que entrenan y ejecutan inteligencia artificial ya se miden en {{gigavatios|g-vatio}}. El mayor rastreado, Colossus 2, en Memphis, dedica unos 946 megavatios a sus equipos de cómputo: casi lo que produce un reactor nuclear grande.",
   "ancla": {
    "cifra": "946 MW",
    "que": "de {{potencia IT|g-potit}} en Colossus 2",
    "marca": "estimado",
    "palabras": "con unos 1,1 millones de {{equivalentes H100|g-h100e}}",
    "analogia": "casi un reactor nuclear grande, de ~1 GW"
   },
   "evidencia": "ev-10",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Un campus visto desde arriba. A la izquierda, una **subestación eléctrica** (ámbar); las líneas discontinuas en movimiento llevan la energía a seis naves de cómputo, en cuya cubierta giran los enfriadores. El resplandor de cada nave late como su carga eléctrica.",
     "↑ [Lección II.5 · El centro de datos de IA, paso a paso](#m2t7-lec-ii5)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "La escala física de la IA",
     "bloques": [
      "La base de Epoch AI suma 93 instalaciones con 13,8 GW de potencia IT, unos 17,9 GW al añadir refrigeración y otras cargas. En conjunto, los centros de datos del mundo consumieron unos 485 {{TWh|g-twh}} en 2025, algo más del 1,5 % de la electricidad mundial, y la Agencia Internacional de Energía proyecta unos 950 TWh en 2030. Entre 2020 y 2025, la densidad de potencia de los servidores de IA se multiplicó por 11, y su carga oscila más de un 50 % en menos de un segundo (IEA, 2026)."
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Cómo se estiman",
     "bloques": [
      "Epoch AI construye su base con imágenes satelitales, permisos y documentos de las empresas (versión del 5 de octubre de 2026, consultada el 10 de octubre): 14,4 millones de {{H100e|g-h100e}}. El 80 % de las veces, sus estimaciones de potencia IT aciertan dentro de un factor de 1,4 y las de cómputo, de 1,5. Cubriría el 43 % del cómputo de IA desplegado (intervalo del 90 %, 23–81 %), y describe capacidad instalada: el uso medio ronda el 60–80 % (Epoch AI, 2026a). El récord de potencia de un solo centro se duplica cada ~10 meses y el de cómputo, cada ~7, con señales de desaceleración hacia 2028 (Campos y Cottier, 2026; Cottier, 2026)."
     ]
    }
   ],
   "widget": "m2.nv-centro"
  },
  {
   "id": "cap-super",
   "tipo": "texto",
   "nav": "La carrera de la supercomputación",
   "kicker": "Acto II · 2 · 2,2 × 10¹⁸ FLOP/s",
   "titulo": "La carrera de la supercomputación",
   "bloques": [
    "Desde 2008, cada nuevo número uno de la lista {{TOP500|g-top500}} ha superado al anterior, pero cada vez más despacio: un 61 % anual entre 2008 y 2018, un 37 % entre 2016 y 2026 y un 19 % desde 2022. ¿Dónde estará en 2036? Depende de la tasa que se suponga, y en una {{escala logarítmica|g-log}} cada tasa dibuja una recta distinta.",
    {
     "nota": "**Te ayudará repasar** [F5 · Orden de magnitud](#m2t1-lec-f5), [F6 · Escala logarítmica](#m2t1-lec-f6), [F10 · Leer una gráfica](#m2t2-lec-f10), [F11 · Clases de cifras](#m2t2-lec-f11) y [II.4 · Bancos de prueba](#m2t7-lec-ii4). **Aprenderás** a leer una tasa de crecimiento en escala logarítmica y por qué los escenarios de 2036 son extrapolaciones, no predicciones."
    }
   ]
  },
  {
   "id": "dato-ev-11",
   "tipo": "dato",
   "nav": "La más rápida en 2036 (escenario)",
   "titulo": "La supercomputadora más rápida en 2036: un escenario",
   "evidencia": "ev-11"
  },
  {
   "id": "lec-ii6",
   "tipo": "leccion",
   "codigo": "II.6",
   "nav": "II.6 · Crecer un porcentaje cada año",
   "titulo": "Crecer un porcentaje cada año: el interés compuesto de las máquinas",
   "pregunta": "Si algo crece un 25 % cada año, ¿cuánto habrá crecido en diez años?",
   "min": 10,
   "dim": "cmp",
   "sencillo": [
    "Crecer un 25 % al año significa multiplicar por 1,25 cada año. Al cabo de dos años no se ha crecido un 50 %, sino algo más: la cantidad se ha multiplicado por 1,25 × 1,25 = 1,5625, porque el segundo año crece también lo que se ganó el primero. Es el *crecimiento compuesto*, el mismo del interés de un préstamo.",
    "Por eso, a un 25 % anual, en diez años la cantidad se multiplica por 1,25¹⁰ ≈ 9,3: más de nueve veces. En una gráfica con {{escala logarítmica|g-log}} ([lección F6](#m2t1-lec-f6)), una tasa constante dibuja una **recta**.",
    "El número uno del {{TOP500|g-top500}} creció un 61 % anual entre 2008 y 2018, un 37 % entre 2016 y 2026 y un 19 % desde 2022. Proyectar 2036 exige **elegir** una tasa: es una *{{extrapolación|g-extrapolacion}}*, no una predicción ([lección F11](#m2t2-lec-f11))."
   ],
   "vida": [
    "Si una hucha gana un 10 % al año y no tocas los intereses, en siete años casi duplica su contenido, y en diez lo multiplica por unas 2,6 veces. Si gana un 20 %, en diez años lo multiplica por más de seis. Doblar la tasa no dobla el resultado: lo hace crecer mucho más (cálculo ilustrativo: 1,1¹⁰ ≈ 2,6 y 1,2¹⁰ ≈ 6,2)."
   ],
   "imagen": {
    "pie": "Cada barra es la anterior por 1,25: los aumentos crecen con el tamaño.",
    "si": "Que crecer un porcentaje fijo hace que los aumentos sean cada vez mayores en valor absoluto.",
    "no": "La realidad no sigue una tasa fija: el ritmo histórico se ha frenado de un 61 % a un 19 % anual. La escalera muestra lo que pasaría «si», no lo que pasará.",
    "svg": "lec-ii6"
   },
   "ejemplo": {
    "enunciado": "El escenario central de 2036, paso a paso.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Punto de partida: 2,198 EFLOP/s en 2026 (LineShine, medido). Tasa supuesta: g = 0,25. Plazo: 10 años."
     ],
     [
      "**Qué significa cada número**",
      "g = 0,25 significa que cada año la cifra es 1,25 veces la del año anterior."
     ],
     [
      "**Qué unidades usa**",
      "EFLOP/s al principio y al final; el factor de crecimiento no tiene unidades."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar diez veces por 1,25, es decir, elevar 1,25 a la décima potencia, y aplicarlo al punto de partida."
     ],
     [
      "**El cálculo**",
      "1,25¹⁰ ≈ 9,31 · 2,198 × 9,31 ≈ 20,5 EFLOP/s"
     ],
     [
      "**El resultado**",
      "~20,5 EFLOP/s en 2036, el extremo inferior del escenario central (20,5–30,3)."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Con un 30 % anual saldría ~30,3 EFLOP/s. Es una consecuencia aritmética de la tasa elegida: si la tasa cambia, cambia todo."
     ]
    ]
   },
   "prediccion": {
    "q": "Si una tasa es el doble que otra (20 % frente a 40 % anual), ¿cuántas veces mayor es su resultado a diez años?",
    "opciones": [
     "El doble",
     "Unas cinco veces",
     "Unas veinte veces"
    ],
    "ok": 1,
    "porque": "Unas cinco veces: 1,4¹⁰ ≈ 28,9 frente a 1,2¹⁰ ≈ 6,2, y 28,9 ÷ 6,2 ≈ 4,7. El crecimiento compuesto amplifica las diferencias de tasa."
   },
   "actividad": "growth",
   "descubrir": [
    "A diez años vista, pequeñas diferencias en la tasa multiplican el resultado. Por eso los escenarios de 2036 van de ~9 a ~51 EFLOP/s: no porque alguien sepa más o menos, sino porque se suponen tasas distintas."
   ],
   "error": {
    "mal": "«Crecer un 25 % al año durante diez años es crecer un 250 %.»",
    "bien": "Eso sería sumar porcentajes. Al componer, se multiplica: 1,25¹⁰ ≈ 9,3, es decir, un aumento del 831 %."
   },
   "quiz": {
    "q": "En una gráfica con eje vertical logarítmico, ¿qué forma dibuja una cantidad que crece un 25 % cada año?",
    "opciones": [
     {
      "t": "Una curva que se dispara hacia arriba",
      "fb": "Así se ve en escala lineal. En la logarítmica, los multiplicadores iguales se ven como pasos iguales."
     },
     {
      "t": "Una recta",
      "fb": "Exacto: cada año se multiplica por 1,25, así que en la escala logarítmica sube siempre lo mismo, unos 0,1 órdenes de magnitud.",
      "ok": true
     },
     {
      "t": "Una línea horizontal",
      "fb": "Horizontal sería no crecer."
     }
    ]
   },
   "clave": {
    "sencillo": "Crecer un porcentaje fijo es multiplicar: en diez años al 25 %, por más de nueve.",
    "cientifico": "R(n) = R₀ × (1 + g)ⁿ; en escala logarítmica, una tasa constante es una recta de pendiente log₁₀(1 + g); los escenarios de 2036 (B.7) son extrapolaciones condicionadas a g."
   },
   "profundizaSub": "la fórmula y enlaces",
   "profundiza": [
    "**La fórmula general.** Tras n años al ritmo g, la cantidad se multiplica por (1 + g)ⁿ. A un 25 % anual, en diez años, por 1,25¹⁰ ≈ 9,3. Por eso, en una escala logarítmica ([lección F6](#m2t1-lec-f6)), una tasa constante dibuja una **recta**: cada año sube el mismo número de {{órdenes de magnitud|g-orden}}, log₁₀(1 + g).",
    {
     "ul": [
      "Profundiza: [el cálculo de los escenarios (B.7)](#m2t7-fig-cada-nuevo-n-1-y-cuatro-escenarios-para-)",
      "[Trampa 9 · Extrapolar no es predecir](#m2t10-trampas)"
     ]
    }
   ]
  },
  {
   "id": "fig-cada-nuevo-n-1-y-cuatro-escenarios-para-",
   "tipo": "figura",
   "nav": "Cada nuevo n.º 1 y escenarios para 2036",
   "titulo": "Cada nuevo n.º 1 y cuatro escenarios para 2036",
   "sub": "En escala logarítmica, una tasa constante dibuja una recta, más inclinada cuanto mayor es la tasa. Cambia a escala lineal para ver por qué hace falta la logarítmica.",
   "widget": "m2.fig-top500",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿A qué ritmo crece la supercomputadora más rápida y dónde podría estar en 2036 con distintas tasas?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: años, de 2008 a 2036. Eje vertical: rendimiento en la prueba HPL, en doble precisión (FP64)."
     ],
     [
      "Unidades",
      "EFLOP/s (10¹⁸ operaciones por segundo); en las marcas, PF = 10¹⁵ y EF = 10¹⁸."
     ],
     [
      "Colores, símbolos y formas",
      "Rombos: cada nuevo n.º 1 de la lista TOP500 (medidos). Franja verde: escenario central (25–30 % anual). Líneas punteada, discontinua y de trazo largo: escenarios bajo (15 %), conservador (19 %) y alto (37 %). Línea gruesa clara: tu escenario. Línea horizontal discontinua: 1 EFLOP/s, la exascala. Línea vertical: hoy (junio de 2026). El triángulo sobre tu línea marca cuánto crece en 5 años."
     ],
     [
      "La escala",
      "Logarítmica por defecto (cada marca, ×10); el botón «Lineal» la cambia para que veas por qué no sirve aquí."
     ],
     [
      "Cómo se usa el control",
      "Mueve «Tu escenario: tasa anual» entre 5 y 45 %. Toca o pasa el cursor por la zona futura para leer los escenarios en cualquier año."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "Tu línea se inclina más o menos; la lectura de abajo da el valor de 2036, la pendiente, el tiempo de duplicación y el de multiplicar por diez."
     ],
     [
      "Cómo interpretar el resultado",
      "En escala logarítmica, una tasa constante dibuja una recta; su pendiente, log₁₀(1 + g), dice cuántos órdenes de magnitud sube cada año. La pendiente de la recta es el ritmo: a un 25 % anual, la cifra se multiplica por más de nueve cada diez años."
     ],
     [
      "Incertidumbre e intervalos",
      "Los puntos son mediciones; todo lo que queda a la derecha de «hoy» es extrapolado."
     ],
     [
      "Qué permite concluir",
      "Ver las consecuencias de cada tasa supuesta y que el ritmo histórico se ha frenado: 61 % anual en 2008–2018, 37 % en 2016–2026 y 19 % desde 2022."
     ],
     [
      "Qué no permite concluir",
      "Predecir 2036: los escenarios son extrapolaciones condicionadas a una tasa ([trampa 9](#m2t10-trampas))."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Las próximas máquinas",
     "bloques": [
      {
       "ul": [
        "**Discovery** · 2028 · EE. UU. Sucesor de Frontier, con CPU AMD «Venice» y GPU MI430X. Sus primeras aplicaciones deben correr de 3 a 5 veces más rápido que en Frontier (Rumsey, 2026). [proyectado]",
        "**Alice Recoque** · Desde 2026 · Francia. El siguiente exascala europeo tras JUPITER, con AMD «Venice» y MI430X. Su instalación comienza en 2026 (EuroHPC Joint Undertaking, 2025). [proyectado]",
        "**FugakuNEXT** · ~2030 · Japón. Más de 600 EFLOP/s en FP8 con dispersión, es decir, 0,6 ZFLOP/s, con ≥50 EFLOP/s efectivos en IA y un límite de 40 MW (RIKEN, 2025; RIKEN Center for Computational Science, 2026). [proyectado]"
       ]
      },
      {
       "cautela": [
        "Para comparar con cautela",
        "Los escenarios de 2036 son extrapolaciones condicionadas a una tasa, no predicciones. Y los 600 EFLOP/s de FugakuNEXT, en FP8 con dispersión, solo pueden compararse con los 2,2 EFLOP/s en FP64 de LineShine tras aclarar esa diferencia.",
        "[Trampa 9 · Extrapolar no es predecir](#m2t10-trampas)"
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "La pendiente de cada recta y el cálculo de los escenarios",
     "bloques": [
      "En escala logarítmica, una tasa constante dibuja una recta cuya pendiente es log₁₀(1 + g).",
      "Por eso la lectura bajo la gráfica da, para tu tasa, el valor de 2036, la pendiente, el tiempo de duplicación y el de multiplicar por diez.",
      "Escenarios (cálculo B.7): R₂₀₃₆ = 2,198 × (1 + g)¹⁰. Bajo, g = 0,15–0,16: 8,9–9,7 EFLOP/s; conservador, 0,19–0,21: 12,5–14,8; central, 0,25–0,30: 20,5–30,3; alto, 0,35–0,37: 44,2–51,2, un escenario de estrés. Tasas históricas: (0,1223 ÷ 0,001026)¹/¹⁰ − 1 ≈ 0,61 para 2008–2018; (2,198 ÷ 0,0930)¹/¹⁰ − 1 ≈ 0,37 para 2016–2026."
     ]
    }
   ],
   "notas": [
    "**«Logarítmica» y «Lineal»** cambian la escala del eje vertical; **la tasa anual** fija un crecimiento constante para tu escenario. Importa porque, a diez años vista, pequeñas diferencias de tasa multiplican el resultado."
   ]
  },
  {
   "id": "cap-centros",
   "tipo": "texto",
   "nav": "Centros de datos, en cerebros",
   "kicker": "Acto II · 3 · 1,4 × 10¹⁰ W",
   "titulo": "Centros de datos, medidos en cerebros",
   "bloques": [
    "Un gigavatio equivale a la potencia de unos cincuenta millones de cerebros. Los 93 campus de IA que rastrea Epoch AI suman 13,8 GW de {{potencia para sus equipos|g-potit}}, es decir, 690 millones de cerebros, y aun así la base solo cubriría el 43 % del cómputo de IA desplegado.",
    {
     "nota": "**Te ayudará repasar** [D3 · Vatios y julios](#m2t3-lec-d3), [F7 · Multiplicar potencias](#m2t2-lec-f7) y [II.5 · De vatios a teravatios-hora](#m2t7-lec-ii5). **Aprenderás** qué significa medir una potencia en cerebros y por qué la equivalencia no dice nada del cómputo ni de la inteligencia."
    }
   ]
  },
  {
   "id": "dato-ev-12",
   "tipo": "dato",
   "nav": "Los 93 campus de IA",
   "titulo": "Los 93 campus de IA rastreados",
   "evidencia": "ev-12"
  },
  {
   "id": "lec-ii7",
   "tipo": "leccion",
   "codigo": "II.7",
   "nav": "II.7 · Medir en cerebros",
   "titulo": "Medir en cerebros: una equivalencia solo de potencia",
   "pregunta": "¿Qué significa decir que un campus «equivale a 47 millones de cerebros»?",
   "min": 8,
   "dim": "nrg",
   "sencillo": [
    "Para hacer imaginables los {{vatios|g-vatio}}, este recorrido los traduce a cerebros: como un encéfalo gasta unos 20 W, una potencia P equivale a P ÷ 20 W cerebros. Un megavatio son 50.000 cerebros; un gigavatio, 50 millones.",
    "La equivalencia es honesta si se lee bien: compara **solo potencia eléctrica**, el tamaño de la factura por segundo. No dice nada del cómputo (lo que la máquina calcula) ni de la inteligencia (lo que puede resolver). Decir que Colossus 2 «equivale a 47 millones de cerebros» significa que consume tanta potencia como ellos; no que piense como ellos."
   ],
   "vida": [
    "Decir que un camión «gasta como veinte coches» compara combustible, no lo que transporta ni lo útil que es. Un camión puede llevar la carga de cien coches o ir vacío: la equivalencia solo habla del depósito."
   ],
   "imagen": {
    "pie": "La balanza solo pesa vatios.",
    "si": "Que la equivalencia en cerebros traduce una potencia a una unidad que imaginamos mejor.",
    "no": "No pesa el cálculo, ni la utilidad, ni la inteligencia. Tampoco la energía consumida en un periodo: un cerebro y un enchufe de 20 W pueden pasar horas distintas encendidos.",
    "svg": "lec-ii7"
   },
   "ejemplo": {
    "enunciado": "Colossus 2, medido en cerebros.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Colossus 2: ~946 MW de potencia IT (estimado, Epoch AI). Un cerebro: ~20 W (estimado)."
     ],
     [
      "**Qué significa cada número**",
      "Dos potencias: la del campus y la de un encéfalo en reposo."
     ],
     [
      "**Qué unidades usa**",
      "W en los dos casos (946 MW = 946 × 10⁶ W): al dividir queda un número de cerebros."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir la potencia del campus entre la de un cerebro."
     ],
     [
      "**El cálculo**",
      "946 × 10⁶ W ÷ 20 W = 4,73 × 10⁷"
     ],
     [
      "**El resultado**",
      "≈ 47 millones de cerebros de potencia."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Solo dice que el campus consume tanta potencia eléctrica como 47 millones de cerebros en reposo. No dice cuánto calcula ni lo que puede resolver."
     ]
    ]
   },
   "prediccion": {
    "q": "Una potencia de 1 GW, ¿a cuántos cerebros de 20 W equivale?",
    "opciones": [
     "5 millones",
     "50 millones",
     "500 millones"
    ],
    "ok": 1,
    "porque": "50 millones: 10⁹ W ÷ 20 W = 5 × 10⁷."
   },
   "actividad": "brains",
   "descubrir": [
    "Medir en cerebros convierte gigavatios abstractos en una cantidad imaginable, pero no compara capacidades. Cada vez que leas «X millones de cerebros», tradúcelo a «la potencia eléctrica de…»."
   ],
   "error": {
    "mal": "«Si Colossus 2 equivale a 47 millones de cerebros, es tan inteligente como 47 millones de personas.»",
    "bien": "La equivalencia es solo de potencia eléctrica. La inteligencia ni siquiera se mide en vatios ([trampa 2](#m2t10-trampas))."
   },
   "quiz": {
    "q": "13,8 GW equivalen a 690 millones de cerebros. ¿Qué comparan esas dos cifras?",
    "opciones": [
     {
      "t": "El cómputo de los campus y el del cerebro",
      "fb": "No interviene ningún FLOP: solo vatios."
     },
     {
      "t": "La potencia eléctrica de los campus y la de 690 millones de cerebros en reposo",
      "fb": "Exacto: 13,8 × 10⁹ W ÷ 20 W = 6,9 × 10⁸.",
      "ok": true
     },
     {
      "t": "La inteligencia de los modelos de IA frente a la humana",
      "fb": "La inteligencia no se mide en vatios: es la [trampa 2](#m2t10-trampas)."
     }
    ]
   },
   "clave": {
    "sencillo": "«Equivale a N cerebros» quiere decir «gasta la potencia de N cerebros»; nada más.",
    "cientifico": "cerebros equivalentes = P ÷ 20 W (cálculo B.10); en escala logarítmica, log₁₀(P/20) = log₁₀ P − 1,3; la equivalencia es de potencia, no de cómputo ni de capacidad."
   },
   "profundizaSub": "la equivalencia en escala logarítmica",
   "profundiza": [
    "En {{escala logarítmica|g-log}}, dividir entre 20 equivale a restar log₁₀ 20 ≈ 1,3: la escala de cerebros es la escala de vatios desplazada 1,3 {{órdenes de magnitud|g-orden}} ([lección F7](#m2t2-lec-f7)).",
    {
     "ul": [
      "Profundiza: [señales de la escala física](#m2t7-fig-consumo-electrico-de-los-centros-de-dato)",
      "[Trampa 2 · Vatios no son inteligencia](#m2t10-trampas)"
     ]
    }
   ]
  },
  {
   "id": "fig-cada-punto-un-millon-de-cerebros",
   "tipo": "figura",
   "nav": "Cada punto, un millón de cerebros",
   "titulo": "Cada punto, un millón de cerebros",
   "sub": "Un millón de cerebros de 20 W suman 20 MW. Elige una instalación o un conjunto: la matriz es lineal, y debajo verás la misma comparación en escala logarítmica.",
   "widget": "m2.fig-cerebros",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuántos «cerebros de 20 W» caben en la potencia de cada instalación?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Una matriz de 2.880 puntos: cada punto lleno representa un millón de cerebros (20 MW). Debajo, la misma comparación en escala logarítmica."
     ],
     [
      "Unidades",
      "Cerebros de 20 W, es decir, vatios ÷ 20."
     ],
     [
      "Colores, símbolos y formas",
      "Puntos ámbar: llenos; grises: vacíos. En la regla de abajo, la forma del marcador indica la confianza de cada cifra de potencia."
     ],
     [
      "La escala",
      "La matriz es lineal (el área es proporcional a la potencia); la regla de abajo, logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Elige una instalación o un conjunto con los botones de arriba."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "La matriz se llena o se vacía; la cifra grande, la cuenta y la nota explican el origen del dato."
     ],
     [
      "Cómo interpretar el resultado",
      "LineShine ocupa dos puntos; los 93 campus de IA, 690. Esos 13,8 GW son unos catorce reactores nucleares grandes."
     ],
     [
      "Qué permite concluir",
      "Comparar potencias eléctricas con una unidad intuitiva."
     ],
     [
      "Qué no permite concluir",
      "Comparar capacidades: aquí «cerebro» es solo una unidad de potencia (20 W), no de inteligencia ni de cómputo ([trampa 2](#m2t10-trampas))."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**Los botones eligen qué potencia convertir** en cerebros de 20 W. Recuerda: es una equivalencia de potencia eléctrica, no de capacidad."
   ]
  },
  {
   "id": "fig-consumo-electrico-de-los-centros-de-dato",
   "tipo": "figura",
   "nav": "Consumo eléctrico de los centros de datos",
   "titulo": "Consumo eléctrico de los centros de datos",
   "sub": "Teravatios-hora por año, según los escenarios base de la Agencia Internacional de Energía. Escala lineal: los valores son del mismo orden.",
   "widget": "m2.fig-iea",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánta electricidad consumen los centros de datos del mundo y cuánta podrían consumir?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje vertical: teravatios-hora por año. Tres columnas: 2025, 2030 y 2035."
     ],
     [
      "Unidades",
      "TWh por año (10¹² vatios-hora)."
     ],
     [
      "Colores, símbolos y formas",
      "Columna lisa: estimación de 2025. Columnas rayadas: proyecciones. En 2030, la parte inferior corresponde a los centros orientados a la IA (~465 TWh). La línea entre columnas marca la duplicación aproximada (≈ ×2)."
     ],
     [
      "La escala",
      "Lineal: los valores son del mismo orden."
     ],
     [
      "Cómo se usa el control",
      "Toca o pasa el cursor por cada columna."
     ],
     [
      "Cómo interpretar el resultado",
      "La altura de cada columna es el consumo anual total."
     ],
     [
      "Qué permite concluir",
      "Que, según los escenarios base de la Agencia Internacional de Energía, el consumo casi se duplicaría entre 2025 y 2030."
     ],
     [
      "Qué no permite concluir",
      "Que vaya a ocurrir así: son escenarios. Tampoco atribuir todo el consumo a la IA."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Señales de la escala física",
     "bloques": [
      {
       "ul": [
        "El récord de {{potencia IT|g-potit}} de un solo centro se duplica **cada ~10 meses** [estimado] · Campos y Cottier (2026), desde mediados de 2024",
        "El récord de capacidad de cómputo de un solo centro se duplica **cada ~7 meses** [estimado] · Cottier (2026)",
        "Las tres instalaciones previstas para 2028 alcanzarían **~½ de la tendencia** [estimado] · una señal de posible desaceleración",
        "Densidad de potencia de los servidores de IA, 2020–2025 · **×11** [estimado] · IEA (2026) · otro ×4 hacia 2027",
        "Oscilaciones de carga en menos de un segundo · **>50 %** [medido] · IEA (2026), de la capacidad nominal"
       ]
      },
      "Equivalencias (cálculo B.10): 1 GW ÷ 20 W = 5 × 10⁷ cerebros; 5 GW ÷ 20 W = 2,5 × 10⁸. La potencia media de todos los centros de datos en 2025 resulta de 485 TWh ÷ 8.760 h ≈ 55 GW."
     ]
    }
   ],
   "notas": [
    "2025 y 2030: IEA (2026); 2035: IEA (2025). En 2030, la parte de los centros orientados a la IA rondaría 465 TWh."
   ]
  },
  {
   "id": "hasta-aqui",
   "tipo": "texto",
   "nav": "Hasta aquí",
   "kicker": "Resumen del Acto II",
   "titulo": "Hasta aquí sabemos que…",
   "bloques": [
    {
     "ul": [
      "El transistor sigue mejorando, pero ya no regala eficiencia: lo caro es mover datos.",
      "En 2026 hay cinco supercomputadoras exascala y campus de IA que rozan el gigavatio.",
      "El silicio gana en velocidad bruta. Si gana en eficiencia es otra pregunta, y depende de cómo se formule."
     ]
    },
    "**Cara a cara.** ¿Es justo comparar 20 vatios con 20 megavatios? Lo verás en el [Taller 8](#m2t8)."
   ]
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "Cada cifra en su columna",
     "min": 20,
     "d": "Un juego de clasificación para no mezclar unidades. Con tarjetas de papel o en la pizarra, el grupo ordena las cifras del taller según lo que miden y según de dónde salen.",
     "pasos": [
      "Prepara nueve tarjetas: 2,198 EFLOP/s (LineShine), 42,2 MW (LineShine durante la medición), 63,3 GFLOP/s por vatio (JUPITER Booster), 946 MW (Colossus 2), 13,8 GW (93 campus de IA), 485 TWh (todos los centros de datos en 2025), unos 950 TWh (todos los centros de datos en 2030), ~20–30 EFLOP/s (el sistema líder en 2036, escenario central) y 20 W (un encéfalo).",
      "Forma grupos de tres o cuatro personas. Cada grupo coloca cada tarjeta en una de cuatro columnas: «cómputo» (operaciones por segundo), «potencia» (vatios), «energía» (vatios-hora) o «eficiencia» (operaciones por julio).",
      "Pide que marquen cada tarjeta con su tipo de cifra: medido, estimado, proyectado o extrapolado.",
      "Cada grupo elige dos potencias y las traduce a cerebros de 20 W (dividir entre 20), y elige una y calcula su energía en un año a plena carga (multiplicar por 8.760 horas).",
      "Puesta en común: ¿qué tarjetas costó más clasificar? ¿Qué pregunta responde cada columna? ¿Por qué no tiene sentido sumar una tarjeta de una columna con otra de otra?"
     ],
     "nota": "Para quien facilita. Cómputo: 2,198 EFLOP/s [medido] y ~20–30 EFLOP/s [extrapolado]. Potencia: 42,2 MW [medido], 946 MW [estimado], 13,8 GW [estimado] y 20 W [estimado]. Energía: 485 TWh [estimado] y unos 950 TWh [proyectado]. Eficiencia: 63,3 GFLOP/s por vatio [medido]: es el cociente de dos cifras medidas del TOP500 (operaciones por segundo y potencia). Equivalencias del taller: 946 MW ≈ 47 millones de cerebros; 13,8 GW ≈ 690 millones; 1 GW durante un año a plena carga ≈ 8,8 TWh."
    },
    {
     "t": "Cuatro tasas, cuatro futuros",
     "min": 15,
     "d": "Un debate corto sobre extrapolar. Cada grupo calcula y defiende un escenario para la supercomputadora más rápida de 2036, y descubre que la diferencia está en la tasa supuesta, no en quién sabe más.",
     "pasos": [
      "Divide la sala en cuatro grupos y asigna a cada uno un escenario: bajo (15 % anual), conservador (19 %), central (25 % y 30 %) y alto (37 %).",
      "Cada grupo parte de 2,198 EFLOP/s (LineShine en 2026) y, con una calculadora, multiplica diez veces seguidas por 1 + la tasa: 1,15, 1,19, 1,25 (y 1,30) o 1,37.",
      "Cada grupo escribe su cifra para 2036 y un argumento a favor de su tasa usando solo los ritmos históricos del n.º 1: 61 % anual en 2008–2018, 37 % en 2016–2026 y 19 % desde 2022.",
      "Escribe las cifras en la pizarra, de menor a mayor, y compáralas: ¿cuántas veces mayor es la más alta que la más baja?",
      "Cierra con dos preguntas: ¿es esto una predicción? ¿Qué tendría que pasar para que se cumpliera cada escenario?"
     ],
     "nota": "Resultados (2,198 × (1 + tasa)¹⁰): bajo (15 %), 8,9 EFLOP/s; conservador (19 %), 12,5; central (25–30 %), 20,5–30,3; alto (37 %), 51,2. La más alta es unas seis veces la más baja (cálculo ilustrativo: 51,2 ÷ 8,9 ≈ 5,8). Todas son extrapolaciones [extrapolado]: consecuencias aritméticas de una tasa supuesta, no predicciones ([trampa 9](#m2t10-trampas))."
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "hacia-fuera",
  "super",
  "centros"
 ]
});
})();
