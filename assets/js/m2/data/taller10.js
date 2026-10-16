/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 10 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 10,
 "slug": "m2t10",
 "etapa": "cierre",
 "titulo": "Siete ideas y once trampas",
 "emblema": "≠",
 "pregunta": "¿Qué ideas conviene llevarse del recorrido y qué trampas hay que evitar al comparar cerebros y computadoras?",
 "intro": "Este último taller reúne lo esencial del recorrido en siete ideas y te entrena para reconocer once confusiones que aparecen una y otra vez al comparar cerebros y computadoras. Explicarás una idea con tus palabras, pondrás a prueba cada trampa con una afirmación engañosa y terminarás con un reto que mezcla todo lo aprendido.",
 "objetivos": [
  "Explicar con tus palabras las siete ideas del recorrido: censo, tiempo, cómputo, conducta, energía, trayectoria y arquitectura.",
  "Reconocer las once trampas más frecuentes al comparar cerebros y computadoras, y decir por qué falla cada una.",
  "Distinguir potencia de eficiencia, información de cómputo y un caso extremo de una media cuando leas una cifra.",
  "Preguntar de qué clase es una cifra —medida, estimada, declarada, proyectada o extrapolada— antes de sacar conclusiones.",
  "Volver a la lección que desarrolla cada idea o cada trampa cuando necesites repasarla."
 ],
 "prerequisitos": [
  "Este taller cierra el módulo y repasa los [talleres 1 a 9](#modulo2-mapa). Cada idea y cada trampa enlazan con la lección donde se explica, por si necesitas volver.",
  "Si solo tienes tiempo para repasar tres lecciones, que sean estas: [F11 · Cinco clases de cifras](#m2t2-lec-f11) (Taller 2), [D5 · Cuatro reglas](#m2t3-lec-d5) (Taller 3) y [III.1 · Eficiencia](#m2t8-lec-iii1) (Taller 8)."
 ],
 "secciones": [
  {
   "id": "ideas",
   "tipo": "ideas",
   "nav": "Siete ideas",
   "titulo": "Siete ideas para llevarse",
   "intro": "Nadie sabe cuántos {{FLOP|g-flop}} «hace» el cerebro, y quizá esa pregunta no tenga una respuesta única. Lo que sí puede compararse, con convenciones explícitas, son {{órdenes de magnitud|g-orden}} de simulación, infraestructura, energía y {{eficiencia|g-eficiencia}}.",
   "items": [
    {
     "rotulo": "I · Censo",
     "titulo": "86.000 millones de neuronas",
     "textos": [
      "El encéfalo tiene unos 86.000 millones de {{neuronas|g-neurona}} y del orden de 10¹⁴ conexiones. Son estimaciones con un margen amplio, y el número de conexiones por neurona cambia mucho según la región y el método de recuento."
     ],
     "marcas": [
      "estimado",
      "extrapolado"
     ],
     "sencillo": "*Repasa:* [lección I.5](#m2t5-lec-i5) · [lección I.6](#m2t5-lec-i6), en el Taller 5."
    },
    {
     "rotulo": "II · Tiempo",
     "titulo": "Disparos lentos y escasos",
     "textos": [
      "Las neuronas {{disparan|g-tasa}} despacio: de media, entre una vez cada diez segundos y una vez por segundo. Los cientos de impulsos por segundo son ráfagas excepcionales, medidas en tejido aislado."
     ],
     "marcas": [
      "estimado",
      "medido"
     ],
     "sencillo": "*Repasa:* [lección I.2](#m2t4-lec-i2), en el Taller 4."
    },
    {
     "rotulo": "III · Cómputo",
     "titulo": "10¹³–10¹⁷ {{FLOP/s|g-flop}}",
     "textos": [
      "Traducir el cerebro a operaciones de computadora exige una {{convención|g-convencion}}. El valor central es 10¹⁵ operaciones por segundo, con un margen enorme. El famoso «exaflop cerebral» es el costo de imitarlo con más detalle, no su velocidad."
     ],
     "marcas": [
      "estimado"
     ],
     "sencillo": "*Repasa:* [lección I.7](#m2t5-lec-i7) · [lección I.8](#m2t5-lec-i8), en el Taller 5."
    },
    {
     "rotulo": "IV · Conducta",
     "titulo": "10 bits por segundo",
     "textos": [
      "De todo lo que el cerebro procesa, salen como decisiones unos 10 bits por segundo. Es un cuello de botella que se mide con otra regla, la de la información, no con FLOP/s."
     ],
     "marcas": [
      "estimado"
     ],
     "sencillo": "*Repasa:* [lección I.9](#m2t5-lec-i9), en el Taller 5."
    },
    {
     "rotulo": "V · Energía",
     "titulo": "Una razón que depende de la convención",
     "textos": [
      "Comparar 20 W con 20 MW no mide eficiencia. Dividiendo la energía entre el trabajo, y con la convención central, el cerebro gasta unas mil veces menos por operación que la supercomputación científica y entre diez y veinte veces menos que un acelerador de {{baja precisión|g-fp}} en su pico. Con otras convenciones, la razón cambia mucho."
     ],
     "marcas": [
      "extrapolado"
     ],
     "sencillo": "*Repasa:* [lección III.1](#m2t8-lec-iii1), en el Taller 8."
    },
    {
     "rotulo": "VI · Trayectoria",
     "titulo": "~20–30 {{EFLOP/s|g-exa}} en 2036",
     "textos": [
      "Si la supercomputadora líder creciera un 25–30 % al año, rondaría 20–30 EFLOP/s en 2036: es un {{escenario|g-extrapolacion}}, no una predicción. El entrenamiento de IA ya ronda 10²⁷ operaciones, y seguir creciendo depende de la energía, los chips, el capital y la red eléctrica."
     ],
     "marcas": [
      "medido",
      "extrapolado"
     ],
     "sencillo": "*Repasa:* [lección II.6](#m2t7-lec-ii6), en el Taller 7 · [lección III.2](#m2t8-lec-iii2), en el Taller 8."
    },
    {
     "rotulo": "VII · Arquitectura",
     "titulo": "La lección está en la organización",
     "textos": [
      "Lo más valioso que enseña el cerebro es su organización: memoria junto al cálculo, actividad escasa, números poco precisos y trabajo por eventos. Es una conclusión del autor, razonada a partir de los datos."
     ],
     "marcas": [],
     "sencillo": "*Repasa:* [lección II.1](#m2t6-lec-ii1), en el Taller 6 · [lección II.3](#m2t9-lec-ii3) · [lección III.3](#m2t9-lec-iii3), en el Taller 9."
    }
   ],
   "actividad": "ownwords"
  },
  {
   "id": "ideas-ciencia",
   "tipo": "texto",
   "kicker": "Para profundizar",
   "nav": "Con más detalle",
   "titulo": "Las siete ideas, en lenguaje científico",
   "bloques": [
    "Las tarjetas de la sección anterior cuentan cada idea en palabras sencillas. Aquí está la formulación técnica original, con sus márgenes y sus marcas de evidencia, por si quieres el detalle. No hace falta para seguir el taller."
   ],
   "desplegables": [
    {
     "titulo": "Las siete ideas en lenguaje científico",
     "subtitulo": "la formulación original, con cifras, márgenes y marcas",
     "clase": "prof",
     "bloques": [
      {
       "ul": [
        "**I · Censo · 86.000 millones de neuronas.** Es el valor de referencia más usado, con incertidumbre considerable; las {{sinapsis|g-sinapsis}} rondan 10¹⁴. Las 7.000 sinapsis por {{neurona|g-neurona}} describen a la neocortical y suben a 10.000–16.000 según el método de recuento. [estimado] [extrapolado]",
        "**II · Tiempo · Disparos lentos y escasos.** Los modelos adoptan de 0,1 a 1 {{Hz|g-hercio}} de media. 100 Hz es un régimen excepcional: las {{interneuronas más rápidas|g-interneurona}} promedian unos 450 Hz de máximo instantáneo ex vivo, con un récord individual de 856 Hz. [estimado] [medido] *«Ex vivo»: en rebanadas de tejido fuera del cuerpo.*",
        "**III · Cómputo · 10¹³–10¹⁷ {{FLOP/s|g-flop}}.** Un juicio experto con centro en 10¹⁵. El {{«exaflop cerebral»|g-exa}} mide el costo de emular el cerebro como red de impulsos, no su velocidad. [estimado]",
        "**IV · Conducta · 10 bits por segundo.** Mide el cuello de botella de la decisión, una magnitud ajena a los FLOP/s y al procesamiento cerebral en su conjunto. [estimado]",
        "**V · Energía · Una razón que depende de la convención.** Con la {{convención|g-convencion}} central, el cerebro gasta unas mil veces menos energía por operación que la supercomputación {{FP64|g-fp}} y unas diez veces menos que los aceleradores de baja precisión. Son cocientes, no mediciones. [extrapolado] *Revisión de esta edición: el original dice «unas diez veces»; el cálculo da ≈18, de modo que «entre diez y veinte veces» es más exacto. Ver la [nota de revisión](#m2t8-dato-ev-13).*",
        "**VI · Trayectoria · ~20–30 {{EFLOP/s|g-exa}} en 2036.** Es el {{escenario|g-extrapolacion}} central para el sistema científico líder. El entrenamiento de IA, ya en ~10²⁷ FLOP, dependerá de la energía, la red, el capital y los semiconductores. [medido] [extrapolado] *El «sistema científico líder» es la supercomputadora n.º 1 del {{TOP500|g-top500}}.*",
        "**VII · Arquitectura · Integración heterogénea.** La lección más fértil del cerebro está en su organización: localidad, dispersión, baja precisión y procesamiento por eventos. *En palabras sencillas: memoria junto al cálculo, actividad escasa, números poco precisos y trabajo por eventos. Sobre el ecosistema heterogéneo en el que los chips neuromórficos funcionarían como especialistas, ver [Taller 9 · Copiar al cerebro](#m2t9-cap-alternativas).*"
       ]
      }
     ]
    }
   ]
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
     "texto": "20 W frente a 20 MW compara facturas eléctricas. La {{eficiencia|g-eficiencia}} exige dividir la energía entre el trabajo hecho.",
     "donde": "Taller 8 · Acto III · 1",
     "quiz": {
      "q": "«El cerebro gasta 20 W y la supercomputadora Frontier, 24,6 MW: el cerebro es más de un millón de veces más eficiente.» ¿Qué falla en esta frase?",
      "opciones": [
       {
        "t": "Nada: 24,6 MW ÷ 20 W ≈ 1,2 millones, así que la cuenta es correcta",
        "fb": "La división está bien hecha, pero compara potencias: cuánta energía entra por segundo, no cuánto trabajo sale. Eso no es eficiencia."
       },
       {
        "t": "El error está en los vatios: el cerebro gasta mucho más de 20 W",
        "fb": "Los ~20 W son una estimación sólida (la {{PET|g-pet}} mide ~17 W de glucosa). El problema no es la cifra, sino lo que se compara."
       },
       {
        "t": "Compara potencias; la eficiencia exige dividir la energía entre el trabajo hecho, y en el cerebro eso requiere una convención",
        "fb": "Exacto. Con las convenciones del recorrido, la razón de energía por operación va de ~1 a casi 10⁶.",
        "ok": true
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 8 · La pregunta equivocada](#m2t8-cap-energia) · Explicación desarrollada: [Lección III.1 · Eficiencia](#m2t8-lec-iii1)"
    },
    {
     "id": "t-2",
     "titulo": "Vatios no son inteligencia",
     "texto": "Consumir más energía no significa pensar más ni mejor. Los {{vatios|g-vatio}} miden la infraestructura que exige un sistema.",
     "donde": "Taller 7 · Acto II · 3",
     "quiz": {
      "q": "«El campus de IA Colossus 2 consume como 47 millones de cerebros, así que es tan listo como 47 millones de personas.» ¿Qué conclusión es correcta?",
      "opciones": [
       {
        "t": "Solo puede concluirse que exige tanta potencia eléctrica como 47 millones de cerebros en reposo",
        "fb": "Exacto: la equivalencia en cerebros es solo de potencia.",
        "ok": true
       },
       {
        "t": "Es correcta si la potencia está bien estimada",
        "fb": "Aunque la potencia fuera exacta, los vatios miden la infraestructura eléctrica, no la capacidad de pensar."
       },
       {
        "t": "Es más listo que esas personas, porque gasta más",
        "fb": "Gastar más no implica pensar más ni mejor: un radiador gasta más que un teléfono."
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 7 · Centros de datos, medidos en cerebros](#m2t7-cap-centros) · Explicación desarrollada: [Lección II.7 · Medir en cerebros](#m2t7-lec-ii7)"
    },
    {
     "id": "t-3",
     "titulo": "Bits por segundo no son FLOP/s",
     "texto": "Los 10 {{bits/s|g-bit}} miden lo que sale como decisión; los {{FLOP/s|g-flop}}, el costo de reproducir el procesamiento que la hace posible.",
     "donde": "Taller 5 · Acto I · 3",
     "quiz": {
      "q": "Alguien razona: «Si de nuestro cerebro solo salen unos 10 bits por segundo, es imposible que equivalga a 10¹⁵ FLOP/s.» ¿Por qué falla el razonamiento?",
      "opciones": [
       {
        "t": "Porque la cifra de 10 bits/s está desfasada",
        "fb": "No es ese el problema: es una estimación vigente (Zheng y Meister, 2025)."
       },
       {
        "t": "Porque miden cosas distintas: lo que sale como decisión frente al costo de reproducir el procesamiento que la produce",
        "fb": "Exacto: son reglas distintas, información y cómputo. Un modelo de 10¹¹ parámetros también ejecuta ~2 × 10¹¹ FLOP por cada {{token|g-token}} de pocos bits.",
        "ok": true
       },
       {
        "t": "Porque en realidad salen 10¹⁵ bits por segundo",
        "fb": "No: ~10 bits/s es el caudal estimado de la conducta deliberada."
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 5 · ¿Cuántas operaciones es un pensamiento?](#m2t5-cap-computo) · Explicación desarrollada: [Lección I.9 · 10 bits por segundo](#m2t5-lec-i9)"
    },
    {
     "id": "t-4",
     "titulo": "Pico teórico no es rendimiento real",
     "texto": "En aplicaciones limitadas por la memoria, una supercomputadora rinde en torno al 1 % de su cifra del {{HPL|g-hpl}}. Lo muestra la prueba {{HPCG|g-hpcg}}, que se parece a ese tipo de aplicaciones.",
     "donde": "Taller 7 · Acto II · 2",
     "quiz": {
      "q": "Un anuncio dice: «Nuestra supercomputadora alcanza 2 EFLOP/s, así que tu simulación irá a 2 EFLOP/s.» ¿Qué deberías preguntar?",
      "opciones": [
       {
        "t": "Nada: el pico garantiza el rendimiento",
        "fb": "El pico es un techo teórico; ninguna aplicación tiene garantizado alcanzarlo."
       },
       {
        "t": "Cuántos vatios consume, porque eso fija la velocidad",
        "fb": "La potencia no fija la velocidad: dos máquinas con la misma potencia pueden rendir muy distinto."
       },
       {
        "t": "En qué problema se midió: en aplicaciones limitadas por la memoria, como HPCG, estas máquinas rinden ~1 % de su HPL",
        "fb": "Exacto: el rendimiento depende del problema.",
        "ok": true
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 7 · La carrera de la supercomputación](#m2t7-cap-super) · Explicación desarrollada: [Lección II.4 · Bancos de prueba](#m2t7-lec-ii4)"
    },
    {
     "id": "t-5",
     "titulo": "{{FP8|g-fp}} no es FP64, y «con dispersión» no es denso",
     "texto": "Una operación de 8 bits cuesta menos y vale menos que una de 64. El {{pico|g-pico}} con {{dispersión|g-dispersion}} duplica el denso contando como hechas operaciones con ceros. El pico denso, en cambio, solo cuenta las operaciones que el chip hace de verdad.",
     "donde": "Taller 6 · Nivel 6 · Chip acelerador",
     "quiz": {
      "q": "«La supercomputadora FugakuNEXT, prevista para ~2030, tendrá más de 600 EFLOP/s y LineShine, la más rápida de 2026, tiene 2,2: FugakuNEXT será unas 270 veces más rápida.» ¿Qué falta aclarar?",
      "opciones": [
       {
        "t": "Que una cifra es FP8 con dispersión y proyectada, y la otra FP64 medida en HPL: ni la operación ni la forma de contar son las mismas",
        "fb": "Exacto: solo pueden compararse tras aclarar esa diferencia.",
        "ok": true
       },
       {
        "t": "Nada: 600 ÷ 2,2 ≈ 270",
        "fb": "La división es correcta, pero compara cifras de formatos distintos."
       },
       {
        "t": "Que FugakuNEXT es una máquina japonesa",
        "fb": "El país no cambia la comparación; la precisión y el método, sí."
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 6 · Nivel 6 · Chip acelerador](#m2t6-n-chip) · Explicación desarrollada: [Lección II.2 · El chip acelerador](#m2t6-lec-ii2)"
    },
    {
     "id": "t-6",
     "titulo": "Una neurona de silicio no es una neurona",
     "texto": "Es mucho más simple que una biológica, y su número no dice qué problemas resuelve el sistema.",
     "donde": "Taller 9 · Nivel 7 · Sistema neuromórfico",
     "quiz": {
      "q": "«El sistema {{neuromórfico|g-neuromorfico}} Darwin Monkey tiene más de 2.000 millones de neuronas: ya tenemos un 2 % de cerebro artificial.» ¿Qué es lo más preciso?",
      "opciones": [
       {
        "t": "Es correcto: 2 × 10⁹ ÷ 8,6 × 10¹⁰ ≈ 2,3 %",
        "fb": "La cuenta del número es correcta, pero una neurona de silicio es un modelo muy simplificado: el recuento no dice qué problemas resuelve."
       },
       {
        "t": "No significa nada, porque las cifras de los fabricantes siempre son falsas",
        "fb": "Declarado no es falso: es una cifra sin evaluación independiente publicada. El error es leer el recuento como capacidad."
       },
       {
        "t": "Tiene tantas neuronas de silicio como el ~2 % de las del encéfalo, mucho más simples, con el 0,05 % de las sinapsis, y la cifra es declarada",
        "fb": "Exacto: recuento, simplificación y origen de la cifra, todo a la vez.",
        "ok": true
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 9 · Nivel 7 · Sistema neuromórfico](#m2t9-n-neuromorfico) · Explicación desarrollada: [Lección II.3 · Chips neuromórficos](#m2t9-lec-ii3)"
    },
    {
     "id": "t-7",
     "titulo": "Un caso no es una media",
     "texto": "Los 453 {{Hz|g-hercio}} son ráfagas medidas ex vivo, en rebanadas de tejido fuera del cuerpo; las 7.000 sinapsis describen a la neurona neocortical, no a todas.",
     "donde": "Taller 5 · Acto I · 2",
     "quiz": {
      "q": "«Las neuronas pueden disparar a 453 Hz, así que cada neurona envía cientos de impulsos por segundo.» ¿Qué falla?",
      "opciones": [
       {
        "t": "Confunde un máximo de ráfagas breves, medido ex vivo (en tejido fuera del cuerpo) en interneuronas rápidas, con la media: los modelos usan 0,1–1 Hz, y una media de 100 Hz sería incompatible con el presupuesto energético",
        "fb": "Exacto: un caso extremo no es una media.",
        "ok": true
       },
       {
        "t": "Nada: es una medición publicada",
        "fb": "La medición es real, pero describe otra cosa."
       },
       {
        "t": "Que 453 Hz es demasiado poco",
        "fb": "El problema no es el valor, sino generalizarlo a todas las neuronas y a todo momento."
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 5 · Tres preguntas al encéfalo](#m2t5-cap-encefalo) · Explicación desarrollada: [Lección I.2 · La neurona](#m2t4-lec-i2)"
    },
    {
     "id": "t-8",
     "titulo": "Una {{escala logarítmica|g-log}} no iguala unidades",
     "texto": "{{Sinapsis|g-sinapsis}}, vatios y FLOP no comparten regla. Por eso este recorrido usa cuatro.",
     "donde": "Taller 3 · Prólogo",
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
     "explicacion": "Dónde aparece: [Taller 3 · Cuatro reglas para medir lo inmenso](#m2t3-cap-reglas) · Explicación desarrollada: [Lección D5 · Cuatro reglas](#m2t3-lec-d5)",
     "tarjeta": "En esta gráfica logarítmica, 10¹⁵ sinapsis y 10¹⁵ FLOP/s caen en el mismo punto: el cerebro hace una operación por sinapsis y segundo."
    },
    {
     "id": "t-9",
     "titulo": "Extrapolar no es predecir",
     "texto": "Los {{escenarios|g-extrapolacion}} dependen de la tasa que se suponga. Son condicionales, no pronósticos.",
     "donde": "Taller 8 · Acto III · 2",
     "quiz": {
      "q": "«Con un crecimiento del 25 % anual, en 2036 la supercomputadora líder rondará 20 EFLOP/s: está demostrado.» ¿Qué es correcto?",
      "opciones": [
       {
        "t": "Está demostrado: 2,198 × 1,25¹⁰ ≈ 20,5",
        "fb": "La cuenta es correcta, pero «está demostrado» no: es la consecuencia de suponer una tasa."
       },
       {
        "t": "Es falso, porque el crecimiento siempre se acelera",
        "fb": "De hecho, el ritmo histórico se ha frenado: del 61 % al 19 % anual."
       },
       {
        "t": "Es una extrapolación condicionada a la tasa: con el 19 % de los últimos años saldrían unos 12,5 EFLOP/s",
        "fb": "Exacto: los escenarios son condicionales, no pronósticos.",
        "ok": true
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 8 · Entrenar una inteligencia artificial](#m2t8-cap-ia) · Explicación desarrollada: [Lección II.6 · Crecimiento compuesto](#m2t7-lec-ii6)"
    },
    {
     "id": "t-10",
     "titulo": "Declarado no es medido",
     "texto": "Muchas cifras de chips y sistemas proceden de sus fabricantes, sin evaluación independiente publicada.",
     "donde": "Taller 9 · Acto III · 3",
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
     "explicacion": "Dónde aparece: [Taller 9 · Copiar al cerebro](#m2t9-cap-alternativas) · Explicación desarrollada: [Lección F11 · Clases de cifras](#m2t2-lec-f11)",
     "tarjeta": "Este chip es 10 veces más eficiente: lo dice su fabricante, así que es una cifra medida."
    },
    {
     "id": "t-11",
     "titulo": "{{Superposición|g-superposicion}} no es «0 y 1 a la vez»",
     "texto": "Un {{cúbit|g-cubit}} no prueba todas las respuestas en paralelo: al medirlo da un solo resultado, y de n cúbits solo salen n bits. Su ventaja depende de la {{interferencia|g-interferencia}} y de la estructura del problema.",
     "donde": "Taller 9 · Acto III · 4",
     "quiz": {
      "q": "«Una computadora cuántica de 50 cúbits prueba a la vez 2⁵⁰ soluciones y te da la buena.» ¿Qué es correcto?",
      "opciones": [
       {
        "t": "Al medir, 50 cúbits dan solo 50 bits; la ventaja viene de organizar interferencias, y solo en problemas con la estructura adecuada",
        "fb": "Exacto: la superposición no es un buscador de todas las respuestas.",
        "ok": true
       },
       {
        "t": "Es correcto: por eso es tan potente",
        "fb": "Al medir se obtiene un solo resultado: de 50 cúbits salen 50 bits."
       },
       {
        "t": "Es falso porque 50 cúbits no pueden estar en superposición",
        "fb": "Sí pueden; el error está en lo que se cree que eso permite."
       }
      ]
     },
     "explicacion": "Dónde aparece: [Taller 9 · Del bit al cúbit](#m2t9-cap-cubit) · Explicación desarrollada: [Lección III.5 · Interferencia](#m2t9-lec-iii5)"
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
       "t": "Declarada por una empresa",
       "fb": "Procede de un informe de juicio experto, no de un fabricante."
      },
      {
       "t": "Estimada: una convención de juicio experto, con un margen de 10¹³ a 10¹⁷",
       "fb": "Exacto (Carlsmith, 2020).",
       "ok": true
      }
     ]
    },
    {
     "q": "¿Cuál de estas cifras es una {{energía|g-vatio}}?",
     "opciones": [
      {
       "t": "485 TWh",
       "fb": "Exacto: potencia acumulada durante un año. El {{teravatio-hora|g-twh}} es una unidad de energía.",
       "ok": true
      },
      {
       "t": "20 W",
       "fb": "Es una potencia: julios por segundo."
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
       "t": "Contar neuronas y transistores",
       "fb": "Contar piezas no dice cuánto trabajo hacen por julio."
      },
      {
       "t": "La energía por operación, con una convención explícita para el cerebro",
       "fb": "Exacto: E = P ÷ R, declarando qué R se atribuye al cerebro.",
       "ok": true
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
       "fb": "Exacto: con el {{código de superficie|g-codsup}}, 2d² − 1 por cada {{cúbit lógico|g-cubitl}}. Por ejemplo, con distancia d = 3 son 17 cúbits físicos para un solo cúbit lógico.",
       "ok": true
      },
      {
       "t": "Puede leerse sin alterarse",
       "fb": "Medir sigue cambiando el estado; la corrección mide paridades (comprobaciones que delatan los errores sin leer la información), no los datos."
      }
     ]
    }
   ]
  },
  {
   "id": "final",
   "tipo": "texto",
   "kicker": "Epílogo",
   "nav": "Para terminar",
   "titulo": "Una pregunta para seguir pensando",
   "bloques": [
    "Hace unos setenta años, von Neumann (1958) comparó el sistema nervioso con las computadoras de su época. Hoy la pregunta es otra. Las supercomputadoras más grandes ya hacen más operaciones por segundo que las 10¹⁵ que la convención central atribuye al cerebro (idea III). Pero ganar en esa cuenta dice poco de lo esencial: con qué economía convierte el cerebro energía, datos y experiencia en conducta (ideas V y VII).",
    "La «lección de organización» es la de la idea VII: memoria junto al cálculo, actividad escasa, números poco precisos y trabajo por eventos.",
    "**¿Sabremos construir máquinas que aprovechen esa lección de organización?**"
   ],
   "desplegables": [
    {
     "titulo": "El párrafo original",
     "subtitulo": "tal como cierra la edición científica",
     "clase": "prof",
     "bloques": [
      "Setenta años después de que von Neumann comparara el sistema nervioso con sus máquinas, la pregunta se ha desplazado. El rendimiento de las supercomputadoras {{exascala|g-exa}} ya supera la [estimación mecanicista central del cerebro](#m2t5-lec-i7), pero esa comparación dice poco sobre lo esencial: la economía con que el cerebro convierte energía, datos y experiencia en conducta.",
      "*«Estimación mecanicista»: la que calcula el cómputo del cerebro a partir de sus piezas, sinapsis × frecuencia × operaciones por activación; su centro es 10¹⁵ FLOP/s ([lección I.7](#m2t5-lec-i7)).*"
     ]
    }
   ]
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "Detectives de trampas",
     "min": 20,
     "d": "Cada equipo recibe algunas de las afirmaciones engañosas del [laboratorio de errores](#m2t10-trampas), descubre qué trampa esconde cada una y la reescribe para que diga solo lo que los datos permiten decir.",
     "pasos": [
      "Antes de la sesión, copia en tarjetas la afirmación engañosa de cada una de las once trampas, sin el título de la trampa. Las tienes listas, con su clave, en el desplegable «Las once tarjetas y su clave», al final de esta actividad. Por ejemplo: «El campus de IA Colossus 2 consume como 47 millones de cerebros, así que es tan listo como 47 millones de personas.»",
      "Formen grupos de tres o cuatro personas y repartan dos o tres tarjetas por grupo. Dejen a la vista la lista de los once títulos («Potencia no es eficiencia», «Vatios no son inteligencia»…).",
      "Cinco minutos: cada grupo decide qué trampa esconde cada tarjeta y subraya la palabra o la cuenta que engaña.",
      "Ocho minutos: reescriban cada afirmación para que sea correcta. Por ejemplo: «Colossus 2 exige tanta potencia eléctrica como 47 millones de cerebros en reposo; eso no dice nada de cuánto piensa.»",
      "Puesta en común: cada grupo lee en voz alta la versión engañosa y la corregida; el resto adivina el título de la trampa.",
      "Para cerrar, comprueben qué error se habría evitado con alguna de las tres preguntas que conviene hacer ante cualquier cifra: ¿quién lo dice?, ¿cómo lo sabe? y ¿qué supone?"
     ],
     "nota": "Para quien facilita: la clave de cada tarjeta está en el desplegable de arriba, en la retroalimentación de su trampa y en la lección enlazada debajo de cada una. Las tres preguntas proceden de la página [Fuentes y método](#m2fuentes).",
     "widget": "m2.tarjetas-trampas"
    },
    {
     "t": "Siete ideas en la pared",
     "min": 20,
     "d": "Cada grupo convierte una de las [siete ideas](#m2t10-ideas) en un cartel que entendería cualquiera que no haya hecho el recorrido, y después todo el grupo recorre los carteles como en una exposición.",
     "pasos": [
      "Repartan las siete ideas de la sección «Siete ideas» entre los grupos: una o dos por grupo.",
      "Diez minutos: en una hoja grande, cada grupo escribe la idea en una sola frase con sus palabras, copia su cifra principal con la marca que la acompaña (medido, estimado, declarado, proyectado o extrapolado) y añade un dibujo o un ejemplo de la vida diaria. La idea VII no tiene cifra ni marca: es una conclusión del autor, razonada a partir de los datos, y así debe decirlo el cartel.",
      "Debajo, anoten una de las once trampas que esa idea ayuda a evitar. Por ejemplo, la idea V («Una razón que depende de la convención») con la trampa «Potencia no es eficiencia».",
      "Recorrido de cinco minutos: todos pasan frente a los carteles y dejan una nota con una pregunta o una mejora.",
      "Cierre: lean juntos la pregunta final del recorrido —«¿Sabremos construir máquinas que aprovechen esa lección de organización?»— y que cada persona diga en una frase qué respondería hoy."
     ],
     "nota": "Para revisar los carteles sirven la respuesta modelo y los puntos clave de la actividad «Explícalo con tus palabras», el texto de cada tarjeta de la sección «Siete ideas» y, para el detalle técnico, el desplegable «Las siete ideas en lenguaje científico»."
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
