/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 10 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Los campos marcados PENDIENTE y las secciones con «pendiente» se completan a mano. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 10,
 "slug": "m2t10",
 "etapa": "cierre",
 "titulo": "Siete ideas y once trampas",
 "emblema": "≠",
 "pregunta": "PENDIENTE",
 "intro": "PENDIENTE",
 "objetivos": [],
 "prerequisitos": [],
 "secciones": [
  {
   "id": "ideas",
   "tipo": "ideas",
   "nav": "Siete ideas",
   "titulo": "Siete ideas para llevarse",
   "intro": "Nadie sabe cuántos FLOP «hace» el cerebro, y quizá esa pregunta no tenga una respuesta única. Lo que sí puede compararse, con convenciones explícitas, son órdenes de magnitud de simulación, infraestructura, energía y eficiencia.",
   "items": [
    {
     "rotulo": "I · Censo",
     "titulo": "86.000 millones de neuronas",
     "textos": [
      "Es el valor de referencia más usado, con incertidumbre considerable; las sinapsis rondan 10¹⁴. Las 7.000 sinapsis por neurona describen a la neocortical y suben a 10.000–16.000 según el método de recuento.",
      "[estimado] [extrapolado]"
     ],
     "marcas": [
      "estimado",
      "extrapolado"
     ]
    },
    {
     "rotulo": "II · Tiempo",
     "titulo": "Disparos lentos y escasos",
     "textos": [
      "Los modelos adoptan de 0,1 a 1 Hz de media. 100 Hz es un régimen excepcional: las interneuronas más rápidas promedian unos 450 Hz de máximo instantáneo ex vivo, con un récord individual de 856 Hz.",
      "[estimado] [medido]"
     ],
     "marcas": [
      "estimado",
      "medido"
     ]
    },
    {
     "rotulo": "III · Cómputo",
     "titulo": "10¹³–10¹⁷ FLOP/s",
     "textos": [
      "Un juicio experto con centro en 10¹⁵. El «exaflop cerebral» mide el costo de emular el cerebro como red de impulsos, no su velocidad.",
      "[estimado]"
     ],
     "marcas": [
      "estimado"
     ]
    },
    {
     "rotulo": "IV · Conducta",
     "titulo": "10 bits por segundo",
     "textos": [
      "Mide el cuello de botella de la decisión, una magnitud ajena a los FLOP/s y al procesamiento cerebral en su conjunto.",
      "[estimado]"
     ],
     "marcas": [
      "estimado"
     ]
    },
    {
     "rotulo": "V · Energía",
     "titulo": "Una razón que depende de la convención",
     "textos": [
      "Con la central, el cerebro gasta unas mil veces menos energía por operación que la supercomputación FP64 y unas diez veces menos que los aceleradores de baja precisión. Son cocientes, no mediciones.",
      "[extrapolado]"
     ],
     "marcas": [
      "extrapolado"
     ]
    },
    {
     "rotulo": "VI · Trayectoria",
     "titulo": "~20–30 EFLOP/s en 2036",
     "textos": [
      "Es el escenario central para el sistema científico líder. El entrenamiento de IA, ya en ~10²⁷ FLOP, dependerá de la energía, la red, el capital y los semiconductores.",
      "[medido] [extrapolado]"
     ],
     "marcas": [
      "medido",
      "extrapolado"
     ]
    },
    {
     "rotulo": "VII · Arquitectura",
     "titulo": "Integración heterogénea",
     "textos": [
      "La lección más fértil del cerebro está en su organización: localidad, dispersión, baja precisión y procesamiento por eventos."
     ],
     "marcas": []
    }
   ],
   "sencillas": [],
   "actividad": "ownwords"
  },
  {
   "id": "trampas",
   "tipo": "trampas",
   "nav": "Once trampas",
   "titulo": "Trampas frecuentes",
   "intro": "Once confusiones que aparecen una y otra vez cuando se comparan cerebros y computadoras. Las cajas «Para comparar con cautela» del recorrido remiten aquí.",
   "items": [
    {
     "id": "t-1",
     "titulo": "Potencia no es eficiencia",
     "texto": "20 W frente a 20 MW compara facturas eléctricas. La eficiencia exige dividir la energía entre el trabajo hecho.",
     "donde": "Acto III · 1",
     "quiz": {
      "q": "«El cerebro gasta 20 W y Frontier, 24,6 MW: el cerebro es más de un millón de veces más eficiente.» ¿Qué falla en esta frase?",
      "opciones": [
       {
        "t": "Nada: 24,6 MW ÷ 20 W ≈ 1,2 millones, así que la cuenta es correcta",
        "fb": "La división está bien hecha, pero compara potencias: cuánta energía entra por segundo, no cuánto trabajo sale. Eso no es eficiencia."
       },
       {
        "t": "Compara potencias; la eficiencia exige dividir la energía entre el trabajo hecho, y en el cerebro eso requiere una convención",
        "fb": "Exacto. Con las convenciones del recorrido, la razón de energía por operación va de ~1 a casi 10⁶.",
        "ok": true
       },
       {
        "t": "El error está en los vatios: el cerebro gasta mucho más de 20 W",
        "fb": "Los ~20 W son una estimación sólida (la PET mide ~17 W de glucosa). El problema no es la cifra, sino lo que se compara."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección III.1 · Eficiencia"
    },
    {
     "id": "t-2",
     "titulo": "Vatios no son inteligencia",
     "texto": "Consumir más energía no significa pensar más ni mejor. Los vatios miden la infraestructura que exige un sistema.",
     "donde": "Acto II · 3",
     "quiz": {
      "q": "«Colossus 2 consume como 47 millones de cerebros, así que es tan listo como 47 millones de personas.» ¿Qué conclusión es correcta?",
      "opciones": [
       {
        "t": "Es correcta si la potencia está bien estimada",
        "fb": "Aunque la potencia fuera exacta, los vatios miden la infraestructura eléctrica, no la capacidad de pensar."
       },
       {
        "t": "Solo puede concluirse que exige tanta potencia eléctrica como 47 millones de cerebros en reposo",
        "fb": "Exacto: la equivalencia en cerebros es solo de potencia.",
        "ok": true
       },
       {
        "t": "Es más listo que esas personas, porque gasta más",
        "fb": "Gastar más no implica pensar más ni mejor: un radiador gasta más que un teléfono."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección II.7 · Medir en cerebros"
    },
    {
     "id": "t-3",
     "titulo": "Bits por segundo no son FLOP/s",
     "texto": "Los 10 bits/s miden lo que sale como decisión; los FLOP/s, el costo de reproducir el procesamiento que la hace posible.",
     "donde": "Acto I · 3",
     "quiz": {
      "q": "Alguien razona: «Si de nuestro cerebro solo salen unos 10 bits por segundo, es imposible que equivalga a 10¹⁵ FLOP/s.» ¿Por qué falla el razonamiento?",
      "opciones": [
       {
        "t": "Porque la cifra de 10 bits/s está desfasada",
        "fb": "No es ese el problema: es una estimación vigente (Zheng y Meister, 2025)."
       },
       {
        "t": "Porque miden cosas distintas: lo que sale como decisión frente al costo de reproducir el procesamiento que la produce",
        "fb": "Exacto: son reglas distintas, información y cómputo. Un modelo de 10¹¹ parámetros también ejecuta ~2 × 10¹¹ FLOP por cada token de pocos bits.",
        "ok": true
       },
       {
        "t": "Porque en realidad salen 10¹⁵ bits por segundo",
        "fb": "No: ~10 bits/s es el caudal estimado de la conducta deliberada."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección I.9 · 10 bits por segundo"
    },
    {
     "id": "t-4",
     "titulo": "Pico teórico no es rendimiento real",
     "texto": "En aplicaciones limitadas por la memoria, una supercomputadora rinde en torno al 1 % de su cifra del HPL.",
     "donde": "Acto II · 2",
     "quiz": {
      "q": "Un anuncio dice: «Nuestra supercomputadora alcanza 2 EFLOP/s, así que tu simulación irá a 2 EFLOP/s.» ¿Qué deberías preguntar?",
      "opciones": [
       {
        "t": "Nada: el pico garantiza el rendimiento",
        "fb": "El pico es un techo teórico; ninguna aplicación tiene garantizado alcanzarlo."
       },
       {
        "t": "En qué problema se midió: en aplicaciones limitadas por la memoria, como HPCG, estas máquinas rinden ~1 % de su HPL",
        "fb": "Exacto: el rendimiento depende del problema.",
        "ok": true
       },
       {
        "t": "Cuántos vatios consume, porque eso fija la velocidad",
        "fb": "La potencia no fija la velocidad: dos máquinas con la misma potencia pueden rendir muy distinto."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección II.4 · Bancos de prueba"
    },
    {
     "id": "t-5",
     "titulo": "FP8 no es FP64, y «con dispersión» no es denso",
     "texto": "Una operación de 8 bits cuesta menos y vale menos que una de 64. El pico con dispersión duplica el denso contando como hechas operaciones con ceros.",
     "donde": "Nivel 6 · Chip acelerador",
     "quiz": {
      "q": "«FugakuNEXT tendrá más de 600 EFLOP/s y LineShine tiene 2,2: FugakuNEXT será unas 270 veces más rápida.» ¿Qué falta aclarar?",
      "opciones": [
       {
        "t": "Nada: 600 ÷ 2,2 ≈ 270",
        "fb": "La división es correcta, pero compara cifras de formatos distintos."
       },
       {
        "t": "Que una cifra es FP8 con dispersión y proyectada, y la otra FP64 medida en HPL: ni la operación ni la forma de contar son las mismas",
        "fb": "Exacto: solo pueden compararse tras aclarar esa diferencia.",
        "ok": true
       },
       {
        "t": "Que FugakuNEXT es una máquina japonesa",
        "fb": "El país no cambia la comparación; la precisión y el método, sí."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección II.2 · El chip acelerador"
    },
    {
     "id": "t-6",
     "titulo": "Una neurona de silicio no es una neurona",
     "texto": "Es mucho más simple que una biológica, y su número no dice qué problemas resuelve el sistema.",
     "donde": "Nivel 7 · Sistema neuromórfico",
     "quiz": {
      "q": "«Darwin Monkey tiene más de 2.000 millones de neuronas: ya tenemos un 2 % de cerebro artificial.» ¿Qué es lo más preciso?",
      "opciones": [
       {
        "t": "Es correcto: 2 × 10⁹ ÷ 8,6 × 10¹⁰ ≈ 2,3 %",
        "fb": "La cuenta del número es correcta, pero una neurona de silicio es un modelo muy simplificado: el recuento no dice qué problemas resuelve."
       },
       {
        "t": "Tiene tantas neuronas de silicio como el ~2 % de las del encéfalo, mucho más simples, con el 0,05 % de las sinapsis, y la cifra es declarada",
        "fb": "Exacto: recuento, simplificación y origen de la cifra, todo a la vez.",
        "ok": true
       },
       {
        "t": "No significa nada, porque las cifras de los fabricantes siempre son falsas",
        "fb": "Declarado no es falso: es una cifra sin evaluación independiente publicada. El error es leer el recuento como capacidad."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección II.3 · Chips neuromórficos"
    },
    {
     "id": "t-7",
     "titulo": "Un caso no es una media",
     "texto": "Los 453 Hz son ráfagas medidas ex vivo; las 7.000 sinapsis describen a la neurona neocortical, no a todas.",
     "donde": "Acto I · 2",
     "quiz": {
      "q": "«Las neuronas pueden disparar a 453 Hz, así que cada neurona envía cientos de impulsos por segundo.» ¿Qué falla?",
      "opciones": [
       {
        "t": "Nada: es una medición publicada",
        "fb": "La medición es real, pero describe otra cosa."
       },
       {
        "t": "Confunde un máximo de ráfagas breves, medido ex vivo en interneuronas rápidas, con la media: los modelos usan 0,1–1 Hz, y una media de 100 Hz sería incompatible con el presupuesto energético",
        "fb": "Exacto: un caso extremo no es una media.",
        "ok": true
       },
       {
        "t": "Que 453 Hz es demasiado poco",
        "fb": "El problema no es el valor, sino generalizarlo a todas las neuronas y a todo momento."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección I.2 · La neurona"
    },
    {
     "id": "t-8",
     "titulo": "Una escala logarítmica no iguala unidades",
     "texto": "Sinapsis, vatios y FLOP no comparten regla. Por eso este recorrido usa cuatro.",
     "donde": "Prólogo",
     "quiz": {
      "q": "En una gráfica logarítmica, 10¹⁵ sinapsis y 10¹⁵ FLOP/s caen en el mismo punto. ¿Qué puedes concluir?",
      "opciones": [
       {
        "t": "Que el cerebro hace una operación por sinapsis y segundo",
        "fb": "La coincidencia de números no relaciona magnitudes distintas."
       },
       {
        "t": "Nada sobre su relación: son unidades distintas que coinciden en número; por eso el recorrido usa cuatro reglas",
        "fb": "Exacto: una escala logarítmica no iguala unidades.",
        "ok": true
       },
       {
        "t": "Que la gráfica está mal dibujada",
        "fb": "Puede estar bien dibujada; lo engañoso sería leer la coincidencia como equivalencia."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección D5 · Cuatro reglas"
    },
    {
     "id": "t-9",
     "titulo": "Extrapolar no es predecir",
     "texto": "Los escenarios dependen de la tasa que se suponga. Son condicionales, no pronósticos.",
     "donde": "Acto III · 2",
     "quiz": {
      "q": "«Con un crecimiento del 25 % anual, en 2036 la supercomputadora líder rondará 20 EFLOP/s: está demostrado.» ¿Qué es correcto?",
      "opciones": [
       {
        "t": "Está demostrado: 2,198 × 1,25¹⁰ ≈ 20,5",
        "fb": "La cuenta es correcta, pero «está demostrado» no: es la consecuencia de suponer una tasa."
       },
       {
        "t": "Es una extrapolación condicionada a la tasa: con el 19 % de los últimos años saldrían unos 12,5 EFLOP/s",
        "fb": "Exacto: los escenarios son condicionales, no pronósticos.",
        "ok": true
       },
       {
        "t": "Es falso, porque el crecimiento siempre se acelera",
        "fb": "De hecho, el ritmo histórico se ha frenado: del 61 % al 19 % anual."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección II.6 · Crecimiento compuesto"
    },
    {
     "id": "t-10",
     "titulo": "Declarado no es medido",
     "texto": "Muchas cifras de chips y sistemas proceden de sus fabricantes, sin evaluación independiente publicada.",
     "donde": "Acto III · 3",
     "quiz": {
      "q": "Una empresa anuncia que su chip «es 10 veces más eficiente». Mientras no haya una evaluación independiente publicada, ¿qué marca le corresponde?",
      "opciones": [
       {
        "t": "Medido",
        "fb": "Medido exige una publicación revisada o una clasificación oficial."
       },
       {
        "t": "Declarado",
        "fb": "Exacto: lo afirma quien lo fabricó. No es necesariamente falso, pero nadie ajeno lo ha comprobado.",
        "ok": true
       },
       {
        "t": "Extrapolado",
        "fb": "Extrapolado es un cálculo propio del recorrido que prolonga una tendencia o divide cifras."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección F11 · Clases de cifras"
    },
    {
     "id": "t-11",
     "titulo": "Superposición no es «0 y 1 a la vez»",
     "texto": "Un cúbit no prueba todas las respuestas en paralelo: al medirlo da un solo resultado, y de n cúbits solo salen n bits. Su ventaja depende de la interferencia y de la estructura del problema.",
     "donde": "Acto III · 4",
     "quiz": {
      "q": "«Una computadora cuántica de 50 cúbits prueba a la vez 2⁵⁰ soluciones y te da la buena.» ¿Qué es correcto?",
      "opciones": [
       {
        "t": "Es correcto: por eso es tan potente",
        "fb": "Al medir se obtiene un solo resultado: de 50 cúbits salen 50 bits."
       },
       {
        "t": "Al medir, 50 cúbits dan solo 50 bits; la ventaja viene de organizar interferencias, y solo en problemas con la estructura adecuada",
        "fb": "Exacto: la superposición no es un buscador de todas las respuestas.",
        "ok": true
       },
       {
        "t": "Es falso porque 50 cúbits no pueden estar en superposición",
        "fb": "Sí pueden; el error está en lo que se cree que eso permite."
       }
      ]
     },
     "explicacion": "Explicación desarrollada: Lección III.5 · Interferencia"
    }
   ]
  },
  {
   "id": "reto",
   "tipo": "reto",
   "nav": "Reto final",
   "titulo": "Reto final",
   "intro": "Seis preguntas que mezclan todo el recorrido. Si fallas, lee la explicación y vuelve a intentarlo.",
   "preguntas": [
    {
     "q": "Tu amiga te dice que «el cerebro hace 10¹⁵ operaciones por segundo». ¿Qué tipo de cifra es?",
     "opciones": [
      {
       "t": "Medida con instrumentos en el cerebro",
       "fb": "Ningún instrumento mide FLOP en un cerebro: el cerebro no hace operaciones de punto flotante."
      },
      {
       "t": "Estimada: una convención de juicio experto, con un margen de 10¹³ a 10¹⁷",
       "fb": "Exacto (Carlsmith, 2020).",
       "ok": true
      },
      {
       "t": "Declarada por una empresa",
       "fb": "Procede de un informe de juicio experto, no de un fabricante."
      }
     ]
    },
    {
     "q": "¿Cuál de estas cifras es una energía?",
     "opciones": [
      {
       "t": "20 W",
       "fb": "Es una potencia: julios por segundo."
      },
      {
       "t": "485 TWh",
       "fb": "Exacto: potencia acumulada durante un año.",
       "ok": true
      },
      {
       "t": "2,2 EFLOP/s",
       "fb": "Es un ritmo de cómputo."
      }
     ]
    },
    {
     "q": "Un campus de 2 GW, ¿a cuántos cerebros de 20 W equivale en potencia?",
     "opciones": [
      {
       "t": "10 millones",
       "fb": "2 × 10⁹ ÷ 20 = 10⁸, no 10⁷."
      },
      {
       "t": "100 millones",
       "fb": "Exacto: 2 × 10⁹ W ÷ 20 W = 10⁸.",
       "ok": true
      },
      {
       "t": "1.000 millones",
       "fb": "Revisa los ceros: 2.000.000.000 ÷ 20 = 100.000.000."
      }
     ]
    },
    {
     "q": "En una escala logarítmica, ¿qué distancia hay entre 10³ y 10⁶?",
     "opciones": [
      {
       "t": "La misma que entre 1 y 1.000",
       "fb": "Exacto: tres órdenes de magnitud en los dos casos.",
       "ok": true
      },
      {
       "t": "Mil veces más que entre 1 y 1.000",
       "fb": "En la escala logarítmica, las distancias cuentan factores, no diferencias."
      },
      {
       "t": "La misma que entre 10⁶ y 10⁷",
       "fb": "Esa es un solo orden de magnitud."
      }
     ]
    },
    {
     "q": "¿Qué permite comparar con honestidad la eficiencia del cerebro y de una máquina?",
     "opciones": [
      {
       "t": "Comparar sus potencias",
       "fb": "Las potencias miden facturas, no eficiencias."
      },
      {
       "t": "La energía por operación, con una convención explícita para el cerebro",
       "fb": "Exacto: E = P ÷ R, declarando qué R se atribuye al cerebro.",
       "ok": true
      },
      {
       "t": "Contar neuronas y transistores",
       "fb": "Contar piezas no dice cuánto trabajo hacen por julio."
      }
     ]
    },
    {
     "q": "¿Qué es cierto de un cúbit lógico?",
     "opciones": [
      {
       "t": "Es un cúbit físico especialmente bueno",
       "fb": "Es una construcción con muchos cúbits físicos."
      },
      {
       "t": "Se codifica en muchos cúbits físicos que se protegen entre sí",
       "fb": "Exacto: con el código de superficie, 2d² − 1 por cada cúbit lógico.",
       "ok": true
      },
      {
       "t": "Puede leerse sin alterarse",
       "fb": "Medir sigue cambiando el estado; la corrección mide paridades, no los datos."
      }
     ]
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "tesis",
  "trampas",
  "fuentes"
 ]
});
})();
