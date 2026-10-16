/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 8 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Los campos marcados PENDIENTE y las secciones con «pendiente» se completan a mano. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 8,
 "slug": "m2t8",
 "etapa": "acto3",
 "titulo": "La pregunta equivocada: energía y entrenamiento",
 "emblema": "J/op",
 "pregunta": "PENDIENTE",
 "intro": "PENDIENTE",
 "objetivos": [],
 "prerequisitos": [],
 "secciones": [
  {
   "id": "cap-energia",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Acto III · 1 10⁻¹⁴ J por operación",
   "titulo": "La pregunta equivocada",
   "bloques": [
    "La frase de siempre«El cerebro gasta 20 W y una supercomputadora, 20 MW: es un millón de veces más eficiente».",
    "La pregunta correcta¿Cuánta energía cuesta cada operación, y bajo qué convención?",
    "La frase de siempre circula incluso en la divulgación institucional, pero compara potencias: el tamaño de la factura eléctrica, no lo que se hace con ella. Para hablar de eficiencia hay que dividir la energía entre el trabajo, y el cerebro no hace operaciones de punto flotante, así que hay que elegir una convención.",
    "Con la convención central de 10¹⁵ FLOP/s, el cerebro gastaría unas mil veces menos energía por operación que la supercomputación de doble precisión y unas diez veces menos que un acelerador de baja precisión. Con otras convenciones, la razón va de la paridad a casi un millón.",
    "comparar 20 W con 20 MW es como comparar lo que gastan una bicicleta y un tren sin preguntar cuánta carga lleva cada uno",
    {
     "cautela": [
      "Para comparar con cautelaLa potencia mide cuánta infraestructura exige un sistema, no cuán bien trabaja ni cuán inteligente es. Por eso los 20 W frente a los 24,6 MW de Frontier dicen mucho de la red eléctrica y poco de la eficiencia.Trampa 1 · Potencia no es eficiencia Trampa 2 · Vatios no son inteligencia"
     ]
    }
   ]
  },
  {
   "id": "dato-ev-13",
   "tipo": "dato",
   "nav": "Energía por operación",
   "titulo": "Energía por operación",
   "evidencia": "ev-13"
  },
  {
   "id": "lec-iii1",
   "tipo": "leccion",
   "codigo": "III.1",
   "nav": "III.1 · Eficiencia",
   "titulo": "Eficiencia: dividir la energía entre el trabajo",
   "pregunta": "¿Es el cerebro «un millón de veces más eficiente» que una supercomputadora?",
   "min": 10,
   "dim": "nrg",
   "sencillo": [
    "La frase circula mucho: «el cerebro gasta 20 W y una supercomputadora, 20 MW; es un millón de veces más eficiente». Pero compara **potencias**, el tamaño de la factura por segundo (lección D3). La *eficiencia* es otra cosa: cuánto trabajo se obtiene por cada unidad de energía. Para medirla hay que dividir.",
    "La energía por operación es E = P ÷ R: potencia (julios por segundo) entre rendimiento (operaciones por segundo) da julios por operación. Su inversa, η = R ÷ P, son operaciones por julio; 1 GFLOP/s por vatio son 10⁹ operaciones por julio. Frontier: 24,6 MW ÷ 1,353 × 10¹⁸ FLOP/s ≈ 1,8 × 10⁻¹¹ J, unos 18 picojulios. KAIROS, el n.º 1 de la lista de eficiencia *Green500*, ≈ 1,4 × 10⁻¹¹ J.",
    "Para el cerebro falta el denominador: no hace operaciones de punto flotante. Hay que elegir una *convención* (lección I.7). Con 10¹⁵ FLOP/s, 20 W ÷ 10¹⁵ = 2 × 10⁻¹⁴ J, unos 20 *femtojulios* (un femtojulio es 10⁻¹⁵ J). Con 10¹³ o 10¹⁸, el resultado cambia cien o mil veces. Por eso la razón entre cerebro y silicio va «de la paridad a casi un millón»: depende de la convención y del sistema con el que compares."
   ],
   "vida": [
    "Un camión gasta mucho más gasóleo por hora que una furgoneta. ¿Es menos eficiente? Depende de cuánta carga lleve: si transporta diez veces más, puede gastar menos por tonelada transportada. Para comparar eficiencias se divide el consumo entre el trabajo hecho."
   ],
   "imagen": {
    "pie": "Comparar 20 W con 20 MW es comparar una bicicleta y un tren sin preguntar cuánta carga lleva cada uno.",
    "si": "Que la potencia sola no dice si un sistema trabaja bien: falta dividir entre lo que hace.",
    "no": "En los vehículos la «carga» se mide sin discusión; en el cerebro, el trabajo en operaciones es una convención. Por eso aquí la razón no es una medida empírica, sino un cociente condicionado.",
    "svg": "lec-iii1"
   },
   "ejemplo": {
    "enunciado": "El cerebro frente a KAIROS, con la convención central.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Cerebro: 20 W y 10¹⁵ FLOP/s (convención central). KAIROS: 73,28 GFLOP/s por vatio (Green500, medido)."
     ],
     [
      "**Qué significa cada número**",
      "73,28 GFLOP/s por vatio = 73,28 × 10⁹ operaciones por julio."
     ],
     [
      "**Qué unidades usa**",
      "Julios por operación para los dos."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir potencia entre rendimiento en el cerebro; invertir la eficiencia en KAIROS; después, dividir una energía por operación entre la otra."
     ],
     [
      "**El cálculo**",
      "cerebro: 20 ÷ 10¹⁵ = 2 × 10⁻¹⁴ J · KAIROS: 1 ÷ 7,328 × 10¹⁰ ≈ 1,36 × 10⁻¹¹ J · razón: 1,36 × 10⁻¹¹ ÷ 2 × 10⁻¹⁴ ≈ 680"
     ],
     [
      "**El resultado**",
      "Con la convención central, KAIROS gasta ~680 veces más energía por operación que el cerebro."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Con 10¹³ FLOP/s saldría ≈6,8; con 10¹⁸, ≈6,8 × 10⁵. Y KAIROS es un sistema pequeño (46 kW), no un exascala. La cifra es un cociente bajo supuestos, no una eficiencia medida del cerebro."
     ]
    ]
   },
   "prediccion": {
    "q": "Si cambias la convención de 10¹⁵ a 10¹⁸ FLOP/s, ¿qué le pasa a la razón frente a KAIROS?",
    "opciones": [
     "No cambia",
     "Se multiplica por mil",
     "Se divide entre mil"
    ],
    "ok": 1,
    "porque": "Se multiplica por mil: si el cerebro «hace» mil veces más operaciones con los mismos 20 W, cada una le cuesta mil veces menos, y la razón pasa de ≈680 a ≈6,8 × 10⁵."
   },
   "actividad": "effcalc",
   "descubrir": [
    "La razón de eficiencia no es una propiedad del cerebro: es un cociente que depende de la convención elegida y del sistema de referencia. Lo único sólido es el procedimiento: dividir la energía entre un trabajo definido de forma explícita."
   ],
   "error": {
    "mal": "«El cerebro gasta 20 W y una supercomputadora, 20 MW: es un millón de veces más eficiente.»",
    "bien": "Eso compara potencias, no eficiencias. Hay que dividir entre el trabajo; con las convenciones del recorrido, la razón va de ~1 a casi 10⁶ (trampa 1)."
   },
   "quiz": {
    "q": "¿Qué hace falta, además de la potencia, para hablar de eficiencia?",
    "opciones": [
     {
      "t": "Nada más: a menos vatios, más eficiencia",
      "fb": "Menos vatios significa una factura más pequeña, no necesariamente más trabajo por julio."
     },
     {
      "t": "El trabajo hecho por segundo y, para el cerebro, una convención para expresarlo en operaciones",
      "fb": "Exacto: E = P ÷ R, y en el cerebro R depende de la convención.",
      "ok": true
     },
     {
      "t": "El tamaño de la máquina",
      "fb": "El tamaño no entra en la cuenta: solo energía y trabajo."
     }
    ]
   },
   "clave": {
    "sencillo": "Eficiencia es energía por operación; en el cerebro depende de una convención.",
    "cientifico": "E = P/R = 1/η; con 10¹³, 10¹⁵ y 10¹⁸ FLOP/s, el cerebro da 2 × 10⁻¹², 2 × 10⁻¹⁴ y 2 × 10⁻¹⁷ J; frente a KAIROS (1,36 × 10⁻¹¹ J), las razones son ≈6,8, ≈680 y ≈6,8 × 10⁵ (B.6)."
   },
   "profundiza": [],
   "fuente_enlaces": [
    {
     "texto": "Profundiza: fórmulas y razones del Apéndice B",
     "href": "#energia"
    },
    {
     "texto": "Trampa 1 · Potencia no es eficiencia",
     "href": "#t-1"
    },
    {
     "texto": "Trampa 2 · Vatios no son inteligencia",
     "href": "#t-2"
    }
   ]
  },
  {
   "id": "fig-de-la-pregunta-equivocada-a-la-correcta",
   "tipo": "figura",
   "nav": "De la pregunta equivocada a la correct",
   "titulo": "De la pregunta equivocada a la correcta",
   "sub": "Tres pasos. Avanza con los botones o con «Siguiente».",
   "widget": null,
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Por qué «20 W frente a 20 MW» no mide la eficiencia, y qué hay que calcular en su lugar?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Paso 1: eje logarítmico de vatios. Paso 2: la fórmula E = P ÷ R. Paso 3: eje logarítmico de julios por operación."
     ],
     [
      "Unidades",
      "W (potencia), FLOP/s (rendimiento) y julios por operación (energía por operación)."
     ],
     [
      "Colores, símbolos y formas",
      "Glifo de neurona: cerebro; glifo de chip: Frontier. Rombo: Frontier, medido; círculo hueco: el cerebro, extrapolado. El sello del paso 1 recuerda que esa comparación es de facturas."
     ],
     [
      "Cómo se usa el control",
      "Avanza con las pestañas numeradas o con «Siguiente →» (también con las flechas del teclado sobre las pestañas). En el paso 3, elige la convención del cerebro: 10¹³, 10¹⁵ o 10¹⁸ FLOP/s."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "La convención mueve el punto del cerebro y cambia la razón: unas 9, 900 o 9 × 10⁵ veces."
     ],
     [
      "Cómo interpretar el resultado",
      "En el paso 3, la distancia entre los dos puntos es la razón de energía por operación."
     ],
     [
      "Qué permite concluir",
      "Que la razón depende por completo de la convención elegida para el cerebro."
     ],
     [
      "Qué no permite concluir",
      "Que el cerebro sea «un millón de veces más eficiente» sin más: una cifra de ese orden solo aparece con la convención de emulación (10¹⁸)."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [],
   "fuente_ids": [
    "wqp",
    "wq",
    "wqConv"
   ],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "fig-energia-por-operacion",
   "tipo": "figura",
   "nav": "Energía por operación",
   "titulo": "Energía por operación",
   "sub": "Julios por operación, en escala logarítmica. Elige una convención para el cerebro y un sistema de referencia: la distancia entre ambas marcas es la razón de energía.",
   "widget": null,
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánta energía cuesta cada operación en distintos sistemas y en el cerebro, según la convención?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: julios por operación, en escala logarítmica de 10⁻²¹ a 10⁻⁸ J. Filas agrupadas: silicio, cerebro bajo tres convenciones y física."
     ],
     [
      "Unidades",
      "Julios por operación. Debajo, con prefijos: zJ (10⁻²¹), aJ (10⁻¹⁸), fJ (10⁻¹⁵), pJ (10⁻¹²) y nJ (10⁻⁹)."
     ],
     [
      "Colores, símbolos y formas",
      "Rombos: medidos. Cuadrados: declarados. Círculos: el cerebro (ver la nota de revisión en la ficha de evidencia). Barra: el intervalo de 45 nm. Círculo hueco con línea punteada: límite de Landauer. Halos: las dos marcas elegidas; el corchete superior da su razón."
     ],
     [
      "La escala",
      "Logarítmica: cada marca es un factor 10."
     ],
     [
      "Cómo se usa el control",
      "Elige la convención del cerebro (10¹³, 10¹⁵ o 10¹⁸ FLOP/s) y el sistema de referencia (KAIROS en FP64 o H100 en FP8)."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "El corchete y la lectura recalculan la razón entre las dos marcas elegidas."
     ],
     [
      "Cómo interpretar el resultado",
      "Más a la izquierda significa menos energía por operación: más eficiente bajo esa convención."
     ],
     [
      "Qué permite concluir",
      "Ver que, con la convención central, el cerebro gasta unas 680 veces menos por operación que KAIROS y unas 18 veces menos que una H100 en su pico."
     ],
     [
      "Qué no permite concluir",
      "Medir la eficiencia empírica del cerebro: son cocientes bajo una convención. Tampoco comparar sin cautela un sistema completo (KAIROS) con un chip aislado en su pico (H100) o con una red dispersa (Hala Point)."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**La convención** fija la energía por operación que se atribuye al cerebro; **el sistema de referencia**, la del silicio. La razón entre ambas depende de las dos elecciones.",
    "",
    "Las razones expresan cocientes bajo una convención y no miden una eficiencia empírica. KAIROS, n.º 1 del {{Green500|g-green500}}, es un sistema completo de 46 kW; la H100, un chip aislado en su pico teórico denso; Hala Point se midió sobre una red dispersa."
   ],
   "fuente_ids": [
    "epo",
    "epoTable"
   ],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "fig-potencia-medida-en-cerebros",
   "tipo": "figura",
   "nav": "Potencia, medida en cerebros",
   "titulo": "Potencia, medida en cerebros",
   "sub": "Vatios en la escala inferior y cerebros de 20 W en la superior: es la misma escala desplazada 1,3 órdenes de magnitud, porque dividir entre 20 equivale a restar log₁₀ 20.",
   "widget": null,
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánta potencia consume cada sistema, en vatios y en «cerebros»?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje inferior: vatios, en escala logarítmica de 10 W a 100 GW. Eje superior: cerebros de 20 W, la misma escala desplazada log₁₀ 20 ≈ 1,3 órdenes."
     ],
     [
      "Unidades",
      "W y cerebros de 20 W."
     ],
     [
      "Colores, símbolos y formas",
      "La forma de cada marcador indica la confianza de la cifra. Barra: el intervalo de 4–16 GW para la mayor corrida de 2030 (proyectado). Línea discontinua: 1 cerebro = 20 W."
     ],
     [
      "La escala",
      "Logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor por las filas; en pantallas estrechas, desliza la figura."
     ],
     [
      "Cómo interpretar el resultado",
      "Cada tramo es un factor 10 de potencia; el texto da también el número de cerebros."
     ],
     [
      "Qué permite concluir",
      "Comparar las potencias eléctricas de once sistemas en una sola regla."
     ],
     [
      "Qué no permite concluir",
      "Comparar eficiencia o inteligencia: es solo potencia (trampas 1 y 2)."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Fórmulas y razones del Apéndice B",
     "bloques": [
      "La energía por operación es E = P/R, donde P es la potencia y R el rendimiento; de forma equivalente, E = 1/η, con η en operaciones por julio (1 GFLOP/s por vatio = 10⁹ FLOP/J). Para el cerebro, 20 W ÷ 10¹³, 10¹⁵ y 10¹⁸ FLOP/s dan 2 × 10⁻¹², 2 × 10⁻¹⁴ y 2 × 10⁻¹⁷ J. Frontier: 24,607 × 10⁶ W ÷ 1,353 × 10¹⁸ FLOP/s ≈ 1,8 × 10⁻¹¹ J. El Capitan: η = 60,94 × 10⁹ FLOP/J, E ≈ 1,6 × 10⁻¹¹ J. KAIROS: η = 73,28 × 10⁹ FLOP/J, E ≈ 1,4 × 10⁻¹¹ J. H100 (FP8 denso, pico del chip): 700 W ÷ 2 × 10¹⁵ ≈ 3,5 × 10⁻¹³ J. Hala Point: η = 15 × 10¹² operaciones/J, E ≈ 6,7 × 10⁻¹⁴ J (cálculo B.6).",
      "Frente a KAIROS (1,36 × 10⁻¹¹ J), las razones son ≈6,8, ≈680 y ≈6,8 × 10⁵ para 10¹³, 10¹⁵ y 10¹⁸ FLOP/s; frente a la H100, ≈0,18, ≈18 y ≈1,8 × 10⁴. Frente a Frontier, las mismas divisiones dan ≈9, ≈900 y ≈9 × 10⁵ [extrapolado]. KAIROS, con 46 kW, no es representativo de un sistema exascala. En 45 nm, una operación de punto flotante cuesta de 0,4 a 3,7 pJ y un acceso a DRAM externa ~10³ pJ (Horowitz, 2014)."
     ]
    }
   ],
   "notas": [],
   "fuente_ids": [
    "pow",
    "powTable"
   ],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "cap-ia",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Acto III · 2 10²⁷ FLOP",
   "titulo": "Entrenar una inteligencia artificial",
   "bloques": [
    "Entrenar un modelo de lenguaje de frontera exige hoy del orden de 10²⁷ operaciones. Es unas mil veces el «cómputo de una vida» humana bajo la convención central: treinta años de cerebro a 10¹⁵ FLOP/s. Que esos sistemas no igualen de forma general la cognición humana sugiere que la diferencia ya no está en la cantidad de cómputo, sino en la eficiencia con que se usan la energía y los datos.",
    "Hacia 2030, la cota de factibilidad que maneja Epoch AI ronda 2 × 10²⁹ FLOP. Llegar ahí dependerá de la energía, los chips, el capital y la red eléctrica.",
    "mil «vidas» de cómputo cerebral, con la convención central"
   ]
  },
  {
   "id": "dato-ev-14",
   "tipo": "dato",
   "nav": "La mayor corrida de entrenamiento",
   "titulo": "La mayor corrida de entrenamiento",
   "evidencia": "ev-14"
  },
  {
   "id": "lec-iii2",
   "tipo": "leccion",
   "codigo": "III.2",
   "nav": "III.2 · Entrenar una IA",
   "titulo": "Entrenar una IA: cuatro magnitudes que no hay que mezclar",
   "pregunta": "Si entrenar un modelo cuesta 10²⁷ operaciones, ¿es mucho o poco?",
   "min": 11,
   "dim": "cmp",
   "sencillo": [
    "*Entrenar* un modelo de lenguaje es ajustar sus *parámetros* —números internos; un modelo de 10¹¹ parámetros tiene cien mil millones— a partir de enormes cantidades de texto, medidas en *tokens* (fragmentos de palabra). El conjunto declarado de Qwen3, por ejemplo, ronda 3,6 × 10¹³ tokens.",
    "Ese esfuerzo se describe con cuatro magnitudes distintas:",
    {
     "ul": [
      "**Cómputo total**, en FLOP (sin «/s»): todas las operaciones del entrenamiento. La mayor corrida estimada de 2026, GPT-6 Astra, ronda 10²⁷ FLOP, con un intervalo de 5 × 10²⁶ a 2 × 10²⁷ (Epoch AI).",
      "**Potencia** de la mayor corrida, en vatios: más de 100 MW en 2025, con un crecimiento observado de ~2,2 veces por año.",
      "**Energía**, en julios o vatios-hora: la potencia por la duración del entrenamiento.",
      "**Eficiencia**: el cómputo necesario para un mismo desempeño se reduce a la mitad cada ~8 meses (cerca de ×3 por año, por mejores algoritmos), y la eficiencia energética de las GPU de gama alta mejora ~40 % al año."
     ]
    },
    "Para darle escala, el recorrido define el «*cómputo de una vida*»: 30 años de cerebro a 10¹⁵ FLOP/s ≈ 9,5 × 10²³ FLOP. Así, 10²⁷ FLOP son unas mil «vidas»… con la convención central."
   ],
   "vida": [
    "Un viaje en coche tiene una distancia total (kilómetros), una velocidad (kilómetros por hora), un consumo total (litros) y un rendimiento del motor (kilómetros por litro). Son cuatro cifras del mismo viaje; ninguna sustituye a las demás, y confundirlas lleva a conclusiones absurdas."
   ],
   "imagen": {
    "pie": "Cuatro esferas, cuatro unidades: no se suman ni se comparan entre sí.",
    "si": "Que cada magnitud responde a una pregunta distinta y tiene su propio ritmo de crecimiento.",
    "no": "Las cuatro no son independientes: la energía depende de la potencia y la duración, y el cómputo útil, de los algoritmos. El dibujo solo recuerda que tienen unidades distintas.",
    "svg": "lec-iii2"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas «vidas» de cómputo cerebral son 10²⁷ FLOP?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Cómputo de GPT-6 Astra: ~10²⁷ FLOP (estimado). Convención central: 10¹⁵ FLOP/s. Una vida: 30 años; un año ≈ 3,156 × 10⁷ s."
     ],
     [
      "**Qué significa cada número**",
      "Una «vida» es lo que haría un cerebro durante 30 años al ritmo de la convención."
     ],
     [
      "**Qué unidades usa**",
      "FLOP (total) = FLOP/s (ritmo) × s (tiempo)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar ritmo por tiempo para obtener la vida en FLOP; después, dividir el cómputo del modelo entre ella."
     ],
     [
      "**El cálculo**",
      "30 × 3,156 × 10⁷ s ≈ 9,5 × 10⁸ s · × 10¹⁵ ≈ 9,5 × 10²³ FLOP · 10²⁷ ÷ 9,5 × 10²³ ≈ 1.050"
     ],
     [
      "**El resultado**",
      "Unas mil «vidas» de cómputo cerebral."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Con 10¹³ FLOP/s serían ~105.000 vidas; con 10¹⁸, ~1. La comparación depende por completo de la convención. Que estos sistemas no igualen la cognición humana en general sugiere, según el original, que la diferencia está en la eficiencia con que se usan la energía y los datos."
     ]
    ]
   },
   "prediccion": {
    "q": "Con la convención de 10¹⁸ FLOP/s (emulación como red de impulsos), ¿cuántas «vidas» son 10²⁷ FLOP?",
    "opciones": [
     "Unas mil",
     "Alrededor de una",
     "Un millón"
    ],
    "ok": 1,
    "porque": "Alrededor de una: 10¹⁸ × 9,5 × 10⁸ s ≈ 9,5 × 10²⁶ FLOP por vida, casi lo mismo que el entrenamiento entero."
   },
   "actividad": "lifecalc",
   "descubrir": [
    "«Mucho» o «poco» depende de con qué se compare y de la convención. Lo que sí puede decirse sin convenciones es cómo crecen las cuatro magnitudes, y que lo hacen a ritmos distintos."
   ],
   "error": {
    "mal": "«Las líneas de 2030 y 2036 son pronósticos de lo que ocurrirá.»",
    "bien": "Son extrapolaciones de una tasa. De hecho, con las estimaciones vigentes, el máximo pasó de 3,5–3,8 × 10²⁶ FLOP (febrero de 2025) a ~10²⁷ (septiembre de 2026): unas 1,9–2 veces por año, muy por debajo de la tendencia de cinco veces (trampa 9)."
   },
   "quiz": {
    "q": "¿En qué unidad se mide el costo total de entrenar un modelo?",
    "opciones": [
     {
      "t": "En FLOP/s",
      "fb": "FLOP/s es un ritmo. El entrenamiento acumula operaciones durante meses: un total."
     },
     {
      "t": "En FLOP",
      "fb": "Exacto: un total de operaciones, como los ~10²⁷ de GPT-6 Astra.",
      "ok": true
     },
     {
      "t": "En vatios",
      "fb": "Los vatios miden la potencia de la corrida, otra magnitud."
     }
    ]
   },
   "clave": {
    "sencillo": "Entrenar cuesta un total de operaciones; no es una potencia, ni una energía, ni una eficiencia.",
    "cientifico": "C ≈ 10²⁷ FLOP (GPT-6 Astra, estimado, intervalo 5 × 10²⁶–2 × 10²⁷); potencia de la mayor corrida >100 MW (×~2,2/año); eficiencia algorítmica ×~3/año (Ho et al., 2024); «vida» = 9,5 × 10²³ FLOP con 10¹⁵ FLOP/s (B.9)."
   },
   "profundiza": [],
   "fuente_enlaces": [
    {
     "texto": "Profundiza: estimaciones, cotas y cálculos",
     "href": "#ia"
    },
    {
     "texto": "Trampa 9 · Extrapolar no es predecir",
     "href": "#t-9"
    }
   ]
  },
  {
   "id": "fig-del-computo-de-una-vida-a-la-cota-de-203",
   "tipo": "figura",
   "nav": "Del cómputo de una vida a la cota de 2",
   "titulo": "Del cómputo de una vida a la cota de 2030",
   "sub": "Escala logarítmica de FLOP. A cuatro veces por año, cada año sube 0,6 órdenes de magnitud; a cinco, 0,7. Elige la tasa y el punto de partida.",
   "widget": null,
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánto cómputo se usa para entrenar los mayores modelos de IA y adónde llevaría cada ritmo de crecimiento?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: años, de 2022 a 2036. Eje vertical: FLOP de entrenamiento, en escala logarítmica de 10²³ a 10³³."
     ],
     [
      "Unidades",
      "FLOP: operaciones totales, no por segundo."
     ],
     [
      "Colores, símbolos y formas",
      "Círculos verdes: estimaciones de cómputo de modelos (Epoch AI); el de Grok-4 es más claro porque es especulativo, y el círculo hueco de Grok-3 es su estimación de 2025. Línea discontinua horizontal: el «cómputo de una vida» (extrapolado). Trazo grueso claro: crecimiento observado (~1,9–2× por año). Línea clara y escalera punteada: tu extrapolación (un peldaño por año); sus círculos huecos marcan comienzos y finales de 2030. Barras: corridas factibles en 2030 según la infraestructura; rombo hueco: cota de factibilidad ~2 × 10²⁹ (proyectados). Abanico: 2036 con 1,5–3× por año. Zona rayada: muro de latencia."
     ],
     [
      "La escala",
      "Logarítmica vertical."
     ],
     [
      "Cómo se usa el control",
      "Elige la tasa (4× o 5× por año) y el punto de partida (GPT-6 Astra en 2026 o Grok-3 en 2025)."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "La recta y la escalera cambian de pendiente o de origen; la lectura de abajo da los valores de 2030."
     ],
     [
      "Cómo interpretar el resultado",
      "Cada año a 4× suma 0,6 órdenes de magnitud; a 5×, 0,7."
     ],
     [
      "Incertidumbre e intervalos",
      "El cómputo de los modelos cerrados se estima de forma indirecta; el de GPT-6 Astra tiene un intervalo de 5 × 10²⁶ a 2 × 10²⁷."
     ],
     [
      "Qué permite concluir",
      "Ver cuánto se separan las extrapolaciones del crecimiento observado recientemente, calculado con las estimaciones vigentes."
     ],
     [
      "Qué no permite concluir",
      "Predecir los modelos futuros: las líneas son extrapolaciones de una tasa (trampa 9), y el ritmo observado (~2× por año) está muy por debajo de 4–5×."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**La tasa** decide la pendiente de la extrapolación; **el punto de partida**, desde qué modelo se extrapola. Ninguna de las dos convierte la línea en una predicción.",
    ""
   ],
   "fuente_ids": [
    "aic",
    "aiTable"
   ],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "fig-potencia-de-la-mayor-corrida",
   "tipo": "figura",
   "nav": "Potencia de la mayor corrida",
   "titulo": "Potencia de la mayor corrida",
   "sub": "Más de 100 MW en 2025, con un crecimiento observado de ~2,2 veces por año. Para 2030, EPRI (Electric Power Research Institute, instituto estadounidense de investigación sobre electricidad) y Epoch AI modelizan un intervalo de 4 a 16 GW.",
   "widget": null,
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánta potencia eléctrica necesita la mayor corrida de entrenamiento?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: 2025 y 2030. Eje vertical: vatios, en escala logarítmica de 10 MW a 100 GW."
     ],
     [
      "Unidades",
      "Vatios (MW = 10⁶; GW = 10⁹)."
     ],
     [
      "Colores, símbolos y formas",
      "Círculo con flecha hacia arriba: más de 100 MW en 2025 (estimado). Barra: intervalo de 4–16 GW modelizado para 2030 (proyectado)."
     ],
     [
      "La escala",
      "Logarítmica."
     ],
     [
      "Qué permite concluir",
      "Que la potencia de la mayor corrida podría multiplicarse por decenas en cinco años según esos escenarios."
     ],
     [
      "Qué no permite concluir",
      "Unir los dos puntos con una línea: el intervalo de 2030 procede de escenarios, no de aplicar una tasa fija a los 100 MW."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "El intervalo de 2030 procede de sus escenarios (You et al., 2025); no resulta de aplicar a los 100 MW una tasa anual fija."
   ],
   "fuente_ids": [
    "aipw"
   ],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "fig-algoritmos-mas-eficientes",
   "tipo": "figura",
   "nav": "Algoritmos más eficientes",
   "titulo": "Algoritmos más eficientes",
   "sub": "El cómputo necesario para un mismo desempeño se reduce a la mitad cada ~8 meses (IC 95 %, de 5 a 14), cerca de tres veces por año (Ho et al., 2024).",
   "widget": null,
   "guia": null,
   "desplegables": [],
   "notas": [
    "La eficiencia energética de las GPU de IA de gama alta mejora ~40 % anual (del 30 al 60 %; You et al., 2025)."
   ],
   "fuente_ids": [],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  },
  {
   "id": "fig-datos-de-entrenamiento",
   "tipo": "figura",
   "nav": "Datos de entrenamiento",
   "titulo": "Datos de entrenamiento",
   "sub": "Los conjuntos declarados rondan las decenas de billones de tokens; el de Qwen3 alcanza unos 3,6 × 10¹³ (Qwen Team, 2025).",
   "widget": null,
   "guia": null,
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Estimaciones, cotas y cálculos",
     "bloques": [
      "Grok-3 fue el primer modelo estimado por encima de 10²⁶ FLOP, con ~4,6 × 10²⁶ en la estimación de 2025; las estimaciones vigentes, revisadas, dan ~3,5 × 10²⁶ para Grok-3, ~3,8 × 10²⁶ para GPT-4.5 y ~5 × 10²⁶ para Grok-4, este con carácter especulativo (Epoch AI, 2025a, 2025b, 2026b). Para varios modelos cerrados no hay información suficiente para estimar su cómputo.",
      "Sevilla et al. (2024) consideran técnicamente factible mantener ~4 veces por año hasta 2030 y estiman probablemente factibles corridas de ~2 × 10²⁹ FLOP, unas 10⁴ veces GPT-4; un campus de 1–5 GW permitiría 10²⁸–3 × 10²⁹ y una red distribuida de 2–45 GW, 2 × 10²⁸–2 × 10³⁰. Sitúan el {{muro de latencia|g-latencia}} entre 3 × 10³⁰ y 10³² FLOP. Extrapolaciones (B.13): desde Grok-3 (2025) a 4× y 5× por año, ~4,7 × 10²⁹ y ~1,4 × 10³⁰ a comienzos de 2030; desde GPT-6 Astra, ~1,3 × 10²⁹ y ~2,8 × 10²⁹ a comienzos de 2030 y ~3,9 × 10²⁹ y ~1,0 × 10³⁰ a finales. Si el ritmo se desacelera a 1,5–3 veces por año después de 2030, la mayor corrida de 2036 rondaría 2 × 10³⁰–1,5 × 10³² FLOP (B.8). «Cómputo de una vida» (B.9): 30 años × 3,156 × 10⁷ s ≈ 9,5 × 10⁸ s; × 10¹⁵ FLOP/s ≈ 9,5 × 10²³ FLOP."
     ]
    }
   ],
   "notas": [
    "Frank (2023) estimó cuatro o cinco órdenes de magnitud; con conjuntos de este tamaño, la brecha está en el extremo superior."
   ],
   "fuente_ids": [],
   "pendiente": "Implementar el widget de la figura o decidir mostrarla solo con su guía y sus datos."
  }
 ],
 "capitulos_fuente": [
  "energia",
  "ia"
 ]
});
})();
