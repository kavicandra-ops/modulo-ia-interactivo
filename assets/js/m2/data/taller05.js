/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 5 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 5,
 "slug": "m2t5",
 "etapa": "acto1",
 "titulo": "¿Cuánto calcula un cerebro?",
 "emblema": "10¹⁵",
 "pregunta": "¿Cuántas neuronas tiene un cerebro y cuántas operaciones de computadora haría falta para igualarlo?",
 "intro": "Nadie ha contado una a una las neuronas de un cerebro, y el cerebro no hace cuentas con decimales. Aun así, se puede estimar cuántas neuronas hay, dónde están y cuántas operaciones de computadora haría falta para igualar lo que hace. En este taller verás de dónde salen esas cifras, por qué ninguna neurona es «promedio» y por qué cada número viene con su margen.",
 "objetivos": [
  "Explicar por qué ningún promedio describe a las neuronas: la mayoría está en el cerebelo y sus conexiones van de unas 4 a unas 175.000 según el tipo.",
  "Describir cómo se cuentan las neuronas por muestreo y por qué «86.000 millones» es una referencia con incertidumbre, no un dato exacto.",
  "Calcular el cómputo «equivalente» del cerebro con la convención sinapsis × frecuencia × operaciones y reconocer sus cuatro órdenes de magnitud de margen.",
  "Distinguir el costo de copiar un cerebro con cierto detalle (la escalera de la emulación) de lo necesario para igualar su desempeño.",
  "Explicar por qué los 10 bits por segundo de la decisión deliberada no contradicen los 10¹⁵ FLOP/s."
 ],
 "prerequisitos": [
  "Para la primera parte te ayudará repasar [F6 · Escala logarítmica](#m2t1-lec-f6), [F9 · Estimaciones](#m2t2-lec-f9) e [I.2 · Tasas de disparo](#m2t4-lec-i2).",
  "Para la segunda, [D2 · FLOP y FLOP/s](#m2t3-lec-d2), [F7 · Multiplicar potencias](#m2t2-lec-f7) y [D4 · Bits](#m2t3-lec-d4)."
 ],
 "secciones": [
  {
   "id": "cap-encefalo",
   "tipo": "texto",
   "nav": "Introducción: las neuronas",
   "kicker": "Acto I · 2 · 8,6 × 10¹⁰ neuronas",
   "titulo": "Tres preguntas al encéfalo",
   "bloques": [
    "**Del zoom al censo.** Ninguna neurona es «promedio». ¿Dónde están, cuántas conexiones reciben y con qué frecuencia disparan?",
    "Ninguna {{neurona|g-neurona}} es «promedio». Tres preguntas sencillas lo muestran: dónde están las neuronas, cuántas conexiones recibe cada una y con qué frecuencia disparan. Las respuestas cambian según la región y el tipo de célula, a veces en cinco {{órdenes de magnitud|g-orden}}.",
    {
     "ul": [
      "**80 %** de las neuronas están en el cerebelo, que pesa el 10 % [medido]",
      "**4 → 175.000** conexiones por neurona, según el tipo [medido]",
      "**0,1–1** disparos por segundo ({{Hz|g-hercio}}) de media, según los modelos [estimado]"
     ]
    },
    "*≈ como si el 80 % de la población de un país viviera en una región que ocupa el 10 % del territorio*",
    {
     "nota": "Aprenderás dónde están las neuronas, cuántas conexiones recibe cada una, con qué frecuencia disparan y cómo se cuentan."
    }
   ]
  },
  {
   "id": "lec-i5",
   "tipo": "leccion",
   "codigo": "I.5",
   "nav": "I.5 · Dónde están las neuronas y cuántas conexiones reciben",
   "titulo": "Dónde están las neuronas y cuántas conexiones reciben",
   "pregunta": "Si el 80 % de las neuronas está en el cerebelo, ¿por qué se habla tanto de la corteza?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "Las {{neuronas|g-neurona}} no se reparten por igual. El *cerebelo*, una estructura situada en la parte posterior e inferior del encéfalo que interviene en la coordinación del movimiento, entre otras funciones, pesa cerca del 10 % del encéfalo pero alberga el 80 % de sus neuronas: unos 69.000 millones. La *corteza cerebral*, que ocupa el 82 % de la masa, tiene solo el 19 %: unos 16.300 millones (Azevedo et al., 2009). La mayoría de las neuronas del cerebelo son *células granulares*, diminutas y con unas cuatro entradas excitadoras cada una (señales que las empujan a disparar).",
    "Tampoco las conexiones se reparten por igual. Según el tipo, una neurona recibe desde unas 4 {{sinapsis|g-sinapsis}} (las granulares del cerebelo) hasta unas 175.000 (las *células de Purkinje* del cerebelo, medidas en la rata). La cifra popular de 7.000 describe solo a un tipo de neurona, la de la *neocorteza*, la parte evolutivamente más reciente de la corteza.",
    "Por eso el promedio de todo el encéfalo —unas 2.000 a 3.000 sinapsis por neurona— no describe a ninguna población real. Ese promedio sale de repartir entre todas las neuronas la **referencia de cálculo** del recorrido: unas 2 × 10¹⁴ sinapsis en todo el encéfalo."
   ],
   "vida": [
    "En un país, el 80 % de la población puede vivir en una región que ocupa el 10 % del territorio. Si dices «cada kilómetro cuadrado tiene tantos habitantes», el promedio no describe ni la ciudad abarrotada ni el campo vacío. Con las neuronas y sus conexiones pasa lo mismo: el promedio esconde mundos distintos."
   ],
   "imagen": {
    "pie": "Mucha población en poco territorio: así se reparten las neuronas entre el cerebelo y la corteza.",
    "si": "Que una región pequeña puede concentrar la mayor parte de los elementos.",
    "no": "Más neuronas no significa más importancia: la corteza tiene menos neuronas, pero más grandes y con muchas más conexiones cada una. Contar no basta (lección [D1](#m2t3-lec-d1)).",
    "svg": "lec-i5"
   },
   "ejemplo": {
    "enunciado": "El error de multiplicar 86.000 millones por 7.000.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "8,6 × 10¹⁰ neuronas; 7.000 sinapsis por neurona (cifra popular, que describe a la neocortical); referencia de cálculo: ~2 × 10¹⁴ sinapsis."
     ],
     [
      "**Qué significa cada número**",
      "El producto supone que todas las neuronas son neocorticales."
     ],
     [
      "**Qué unidades usa**",
      "neuronas × sinapsis por neurona = sinapsis."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar y comparar con la referencia (dividir)."
     ],
     [
      "**El cálculo**",
      "8,6 × 10¹⁰ × 7 × 10³ = 6,02 × 10¹⁴ · 6,02 × 10¹⁴ ÷ 2 × 10¹⁴ ≈ 3"
     ],
     [
      "**El resultado**",
      "~6 × 10¹⁴ sinapsis: el triple de la referencia."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "El error no es aritmético: es suponer que el caso de la neocorteza vale para todas. La mayoría de las neuronas son granulares del cerebelo, con unas cuatro entradas."
     ]
    ]
   },
   "prediccion": {
    "q": "Si tomas como «sinapsis por neurona» el valor de la célula de Purkinje (175.000), ¿cuánto te pasarás de la referencia?",
    "opciones": [
     "Unas 3 veces",
     "Unas 75 veces",
     "Unas 1.000 veces"
    ],
    "ok": 1,
    "porque": "8,6 × 10¹⁰ × 1,75 × 10⁵ ≈ 1,5 × 10¹⁶: unas 75 veces los ~2 × 10¹⁴ de referencia. Tomar un caso extremo como si fuera el típico dispara el resultado."
   },
   "actividad": "naive",
   "descubrir": [
    "Elegir qué neurona representa «la media» cambia el total de sinapsis en más de cuatro órdenes de magnitud: de unas 4 a unas 175.000 por neurona. Solo un valor cercano a 2.300, que no describe a ninguna célula real, reproduce la referencia. Un caso no es una media."
   ],
   "error": {
    "mal": "Usar la cifra de un tipo de neurona como si valiera para todas: las 7.000 sinapsis o los 453 Hz (el máximo de unas neuronas muy rápidas, visto en la lección [I.2](#m2t4-lec-i2)).",
    "bien": "Pregunta siempre «¿de qué población es esta cifra?». La neocortical no es la típica del encéfalo: por número, la típica es una granular del cerebelo."
   },
   "quiz": {
    "q": "¿Qué región del encéfalo tiene más neuronas?",
    "opciones": [
     {
      "t": "La corteza cerebral, porque es la más grande",
      "fb": "La corteza tiene el 82 % de la masa pero solo el 19 % de las neuronas: las suyas son más grandes y están más conectadas."
     },
     {
      "t": "El cerebelo, con cerca del 80 %",
      "fb": "Con un 10 % de la masa encefálica, el cerebelo alberga unos 69.000 millones de neuronas, el 80 %, sobre todo células granulares diminutas (Azevedo et al., 2009).",
      "ok": true
     },
     {
      "t": "Están repartidas por igual",
      "fb": "El reparto es muy desigual: cerebelo, ~80 %; corteza, ~19 %; resto, menos del 1 %."
     }
    ]
   },
   "clave": {
    "sencillo": "Las neuronas y sus conexiones se reparten de forma muy desigual: ningún promedio las describe.",
    "cientifico": "el cerebelo contiene ~80 % de las neuronas con ~10 % de la masa; las sinapsis por neurona van de ~4 (células granulares) a ~1,75 × 10⁵ (Purkinje, rata); el cociente neocortical depende del denominador (7.200–16.000)."
   },
   "profundiza": [
    "La cifra popular de 7.000, una estimación (Drachman, 2005), describe a la neurona de la *neocorteza* —la parte evolutivamente más reciente de la corteza— con un método de recuento; con otros, sube a 10.000–16.000.",
    "Sigue leyendo: [Profundiza: de dónde salen 7.200, 10.000 y 16.000](#m2t5-fig-sinapsis-por-neurona-de-4-a-175-000) · [Profundiza: el debate de los 86.000 millones](#m2t5-fig-un-valor-de-referencia-con-incertidumbre) · [Trampa 7 · Un caso no es una media](#m2t10-trampa-7)"
   ],
   "profundizaSub": "qué describe la cifra de 7.000"
  },
  {
   "id": "lec-i6",
   "tipo": "leccion",
   "codigo": "I.6",
   "nav": "I.6 · Contar neuronas",
   "titulo": "Contar neuronas: métodos e incertidumbre",
   "pregunta": "Si nadie puede contar 86.000 millones de neuronas una a una, ¿cómo se sabe cuántas hay?",
   "min": 9,
   "dim": "cnt",
   "sencillo": [
    "Hay dos métodos principales, y los dos **muestrean**: cuentan una parte pequeña y extrapolan al total.",
    "El *{{fraccionador isotrópico|g-fraccionador}}* disuelve el tejido hasta convertirlo en una «sopa» homogénea de núcleos celulares. Se cuentan los núcleos en pequeñas muestras de esa sopa, se identifica cuáles son de neuronas con un marcador químico y se multiplica por el volumen total. Así se obtuvieron los 86.100 ± 8.100 millones, a partir de cuatro encéfalos de varones (Azevedo et al., 2009).",
    "La *{{estereología|g-estereologia}}* no disuelve nada: corta el tejido en láminas finas, cuenta en pequeños volúmenes elegidos con reglas estadísticas y multiplica la densidad por el volumen.",
    "Dos fuentes de incertidumbre se suman. Una es el **error de muestreo**: contar poco da estimaciones que bailan. La otra es la **variación biológica**: cada persona tiene un número distinto, y con muestras de cuatro o cinco encéfalos el promedio de la población queda incierto.",
    "Por eso, según el estudio y el sexo, los datos publicados admiten promedios de 61.000 a 99.000 millones, y sugieren promedios menores en mujeres. Con tan pocos encéfalos, los especialistas no se ponen de acuerdo en el margen exacto: es un debate científico abierto."
   ],
   "vida": [
    "Para estimar cuántas lentejas hay en un saco de 10 kilos no las cuentas todas: cuentas las de una cucharada, la pesas y haces una regla de tres. Si repites con otra cucharada, saldrá un número algo distinto. Y si el saco es de otra variedad, quizá las lentejas sean más grandes. Ahí tienes el error de muestreo y la variación entre «individuos»."
   ],
   "imagen": {
    "pie": "Contar unas pocas cucharadas y multiplicar: el principio del fraccionador isotrópico.",
    "si": "La lógica de muestrear y extrapolar, y por qué dos muestras dan resultados algo distintos.",
    "no": "El método real exige que la sopa sea homogénea, distinguir los núcleos de neuronas de los de otras células y controlar las pérdidas; cada paso añade su propia incertidumbre.",
    "svg": "lec-i6"
   },
   "ejemplo": {
    "enunciado": "Del recuento de una muestra al total, con números redondos **inventados** solo para practicar el método.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Una muestra de 0,01 mL contiene 120 núcleos de neuronas; la sopa completa ocupa 50 mL. (Números inventados.)"
     ],
     [
      "**Qué significa cada número**",
      "La muestra representa una fracción del total: 0,01 mL de 50 mL."
     ],
     [
      "**Qué unidades usa**",
      "núcleos por mL × mL = núcleos."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Densidad = recuento ÷ volumen de la muestra; total = densidad × volumen total."
     ],
     [
      "**El cálculo**",
      "120 ÷ 0,01 = 12.000 núcleos/mL · 12.000 × 50 = 600.000 núcleos"
     ],
     [
      "**El resultado**",
      "Unas 600.000 neuronas en esa sopa."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Si otra muestra hubiera dado 110 núcleos, el total saldría 550.000: un 8 % menos. Por eso se cuentan muchas muestras y se informa del margen."
     ]
    ]
   },
   "prediccion": {
    "q": "Si cuentas 16 muestras en vez de 1, ¿qué pasará con las estimaciones repetidas?",
    "opciones": [
     "Saldrán siempre idénticas",
     "Se dispersarán menos alrededor del valor real",
     "Se dispersarán más"
    ],
    "ok": 1,
    "porque": "Más muestras promedian el azar: la dispersión baja, aproximadamente con la raíz cuadrada del número de muestras. Pero nunca llega a cero, y no corrige la variación entre personas."
   },
   "actividad": "sampling",
   "descubrir": [
    "Contar más muestras estrecha la dispersión del recuento de un encéfalo, pero no resuelve la otra incertidumbre: con cuatro o cinco personas, el promedio de la población sigue siendo incierto, porque cada encéfalo tiene un número distinto. Por eso «86.000 millones» es una referencia útil con una incertidumbre considerable, no un dato exacto."
   ],
   "error": {
    "mal": "Creer que «86.000 millones» es un recuento exacto válido para cualquier persona.",
    "bien": "Es una estimación por muestreo en cuatro encéfalos de varones. Su margen, su método y el tamaño de la muestra forman parte del dato."
   },
   "quiz": {
    "q": "¿Por qué los datos publicados admiten promedios tan distintos, de 61.000 a 99.000 millones?",
    "opciones": [
     {
      "t": "Porque uno de los dos métodos es incorrecto",
      "fb": "Los dos métodos son válidos; el problema principal es el tamaño de las muestras y la variación entre personas."
     },
     {
      "t": "Porque se midieron muy pocos encéfalos y las personas difieren entre sí, también según el sexo",
      "fb": "Con cuatro o cinco encéfalos por grupo, el promedio de la población queda incierto; además, los datos sugieren valores distintos en varones y en mujeres.",
      "ok": true
     },
     {
      "t": "Porque el número de neuronas de un adulto cambia cada día",
      "fb": "El número de neuronas de un adulto es bastante estable; la incertidumbre viene de cómo se estima."
     }
    ]
   },
   "clave": {
    "sencillo": "Las neuronas se cuentan por muestreo: la cifra viene con su método, su muestra y su margen.",
    "cientifico": "las estimaciones por fraccionador isotrópico (86,1 ± 8,1 × 10⁹; n = 4) y por estereología (70–85 × 10⁹) combinan error de muestreo y variación biológica; con muestras pequeñas, los promedios poblacionales compatibles van de 61 a 99 × 10⁹ según el sexo y el estudio."
   },
   "profundiza": [
    "**Estereología.** Con ella se estiman entre 70.000 y 85.000 millones (von Bartheld, 2025).",
    "**El debate.** Con muestras de cuatro o cinco encéfalos, el promedio de la población queda incierto. Con esos datos, Goriely (2025a, 2025b) sostiene que los promedios compatibles van de 73.000 a 99.000 millones en varones y de 61.000 a 73.000 millones en mujeres; Lent (2025), coautor del recuento, defendió los 86.000 millones como referencia razonable. Es un debate científico abierto.",
    "Sigue leyendo: [Profundiza: un valor de referencia con incertidumbre](#m2t5-fig-un-valor-de-referencia-con-incertidumbre)"
   ],
   "profundizaSub": "las cifras del debate"
  },
  {
   "id": "fig-donde-estan-las-neuronas",
   "tipo": "figura",
   "nav": "Dónde están las neuronas",
   "titulo": "Dónde están las neuronas",
   "sub": "Cada cuadro representa unos 100 millones de neuronas. Pulsa una región para aislarla.",
   "widget": "m2.fig-donde",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cómo se reparten las neuronas del encéfalo entre sus grandes regiones?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "No hay ejes: es un gráfico de cuadros. Hay 860 cuadros y cada uno representa unos 100 millones de neuronas."
     ],
     [
      "Unidades",
      "Neuronas, en paquetes de ~10⁸."
     ],
     [
      "Colores, símbolos y formas",
      "Azul intenso: cerebelo (690 cuadros). Azul claro: corteza cerebral, sustancia gris y blanca (163). Gris: resto del encéfalo (7). Los destellos al azar recuerdan que la actividad es dispersa; no representan ninguna cantidad."
     ],
     [
      "La escala",
      "Proporcional: el área de cada color es proporcional a su número de neuronas."
     ],
     [
      "Cómo se usa el control",
      "Pulsa el nombre de una región, debajo de la figura, para aislarla; vuelve a pulsarlo para ver todas. Pasa el cursor sobre un cuadro, o tócalo, para saber a qué región pertenece."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "Al aislar una región, las demás se atenúan."
     ],
     [
      "Cómo interpretar el resultado",
      "Compara áreas: el cerebelo ocupa cuatro quintas partes."
     ],
     [
      "Incertidumbre e intervalos",
      "Los recuentos proceden de cuatro encéfalos de varones; véase el debate de los 86.000 millones en la figura [«Un valor de referencia con incertidumbre»](#m2t5-fig-un-valor-de-referencia-con-incertidumbre)."
     ],
     [
      "Qué permite concluir",
      "Que el 80 % de las neuronas está en el cerebelo y el 19 % en la corteza, según Azevedo et al. (2009)."
     ],
     [
      "Qué no permite concluir",
      "Qué región es más importante para pensar, cuántas conexiones tiene cada neurona o cuánto ocupa cada región: la corteza es el 82 % de la masa."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**Pulsa una región** para aislarla y comparar su área con el total.",
    "Azevedo et al. (2009), cuatro encéfalos de varones. La corteza incluye sustancia gris y blanca."
   ]
  },
  {
   "id": "fig-con-que-frecuencia-disparan",
   "tipo": "figura",
   "nav": "Con qué frecuencia disparan",
   "titulo": "Con qué frecuencia disparan",
   "sub": "{{Escala logarítmica|g-log}} de {{hercios|g-hercio}}. La curva muestra la forma log-normal típica de los registros (una campana en escala logarítmica), sin ajuste a datos concretos. Repaso de la lección [I.2](#m2t4-lec-i2): las neuronas disparan despacio de media; las {{interneuronas de disparo rápido|g-interneurona}} encadenan cientos de impulsos por segundo, pero solo en ráfagas.",
   "widget": "m2.fig-frecuencia",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Con qué frecuencia disparan las neuronas, de media y en sus máximos?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "El eje horizontal es la frecuencia de disparo. Arriba, una curva ilustrativa de cómo se reparten las tasas; debajo, filas con datos concretos."
     ],
     [
      "Unidades",
      "Hercios (impulsos por segundo), de 0,01 a 1.000."
     ],
     [
      "Colores, símbolos y formas",
      "Gris: frecuencias (no encajan en ninguna de las cuatro reglas). Círculo: estimado; rombos: medidos. La franja sombreada es el intervalo de los modelos (0,1–1 Hz). La línea discontinua en 100 Hz señala una media incompatible con el presupuesto energético; el corchete mide la distancia desde el escenario central (0,5 Hz) hasta 100 Hz: ×200, 2,3 órdenes."
     ],
     [
      "La escala",
      "Logarítmica: cada marca multiplica por 10."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor por cada fila, o tócala, para leer su ficha."
     ],
     [
      "Cómo interpretar el resultado",
      "La media sostenible (0,16 Hz) y los máximos medidos (de 338 a 856 Hz) están separados por más de tres órdenes de magnitud."
     ],
     [
      "Incertidumbre e intervalos",
      "La media de 0,16 Hz es una cota estimada a partir del presupuesto metabólico; los máximos son promedios de los máximos de cada célula (n = 92 en humano y n = 23 en macaco)."
     ],
     [
      "Qué permite concluir",
      "Distinguir medias de máximos y ver que los máximos son ráfagas medidas ex vivo (en tejido extraído, en el laboratorio)."
     ],
     [
      "Qué no permite concluir",
      "La distribución real de una población concreta: la curva es una forma típica, sin ajuste a datos. Tampoco usar los máximos como media (trampa 7)."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "Lennie (2003); Carlsmith (2020); Wang et al. (2016). Los máximos son promedios de los máximos de cada célula, medidos ex vivo (en tejido extraído, en el laboratorio) con estimulación intensa."
   ]
  },
  {
   "id": "fig-sinapsis-por-neurona-de-4-a-175-000",
   "tipo": "figura",
   "nav": "Sinapsis por neurona, de 4 a 175.000",
   "titulo": "Sinapsis por neurona, de 4 a 175.000",
   "sub": "{{Escala logarítmica|g-log}}: la distancia desde 1 cuenta {{órdenes de magnitud|g-orden}}.",
   "widget": "m2.fig-sinapsis",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuántas sinapsis recibe una neurona según su tipo?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Cada fila es una población de neuronas; su línea sale de 1 y llega a su número de sinapsis por neurona."
     ],
     [
      "Unidades",
      "Sinapsis por neurona, de 1 a 1 millón."
     ],
     [
      "Colores, símbolos y formas",
      "Rombos: medidos. Círculos huecos: extrapolados (cálculos del recorrido). La banda de la fila neocortical muestra cómo cambia el cociente según el método (7.200 con estereología, 10.000 con Azevedo, 16.000 con el fraccionador). La línea discontinua marca la cifra popular de 7.000; el corchete de arriba, la distancia de 4 a 175.000: ×44.000, 4,6 órdenes."
     ],
     [
      "La escala",
      "Logarítmica: la distancia desde 1 cuenta órdenes de magnitud, y el texto sobre cada línea los dice."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor por las filas, o tócalas, para ver su fuente."
     ],
     [
      "Cómo interpretar el resultado",
      "La línea más corta y la más larga difieren en más de cuatro órdenes de magnitud."
     ],
     [
      "Qué permite concluir",
      "Que el número de conexiones varía muchísimo según el tipo de neurona, y que el promedio del encéfalo no describe ninguna población real."
     ],
     [
      "Qué no permite concluir",
      "Comparar especies sin cautela: la cifra de la célula de Purkinje es de rata."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "titulo": "Para comparar con cautela",
     "subtitulo": "Trampa 7 · Un caso no es una media",
     "bloques": [
      "La cifra popular de 7.000 describe a la neurona neocortical con un método de recuento; con otro, el cociente sube a 10.000–16.000.",
      "Multiplicar 86.000 millones de neuronas por 7.000 sinapsis da 6 × 10¹⁴, el triple de la referencia de cálculo. El error está en suponer que todas las neuronas son neocorticales: la mayoría son células granulares del cerebelo, con unas cuatro entradas cada una.",
      "[Trampa 7 · Un caso no es una media](#m2t10-trampa-7)"
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "De dónde salen 7.200, 10.000 y 16.000",
     "bloques": [
      "El cociente de sinapsis por neurona neocortical depende del denominador (cálculo B.1): 1,64 × 10¹⁴ sinapsis ÷ 2,28 × 10¹⁰ neuronas contadas por estereología en varones (Pakkenberg y Gundersen, 1997) ≈ 7.200; ÷ 1,63 × 10¹⁰ neuronas corticales de Azevedo et al. (2009) ≈ 10.000; ÷ 1,02 × 10¹⁰ neuronas neocorticales por fraccionador isotrópico en 43 encéfalos (Castro-Fonseca et al., 2023) ≈ 16.000. Con un total de ~2 × 10¹⁴ sinapsis, la media aritmética del encéfalo sería de 2.000 a 3.000, una cifra que no describe a ninguna población real.",
      "Las células granulares del cerebelo reciben en promedio unas cuatro entradas excitadoras de fibras musgosas (Litwin-Kumar et al., 2017); una célula de Purkinje integra del orden de 10⁵ sinapsis de fibras paralelas, unas 175.000 en la rata (Napper y Harvey, 1988)."
     ]
    }
   ],
   "notas": [],
   "datos": {
    "titulo": "Sinapsis por neurona según la población",
    "tabla": [
     [
      "Población",
      "Sinapsis por neurona",
      "Tipo de cifra",
      "Fuente"
     ],
     [
      "Célula granular del cerebelo",
      "~4",
      "[medido]",
      "Litwin-Kumar et al. (2017)"
     ],
     [
      "Promedio del encéfalo",
      "2.000–3.000",
      "[extrapolado]",
      "Cálculo propio"
     ],
     [
      "Neurona neocortical",
      "7.200–16.000",
      "[extrapolado]",
      "Tang et al. (2001); Pakkenberg y Gundersen (1997); Azevedo et al. (2009); Castro-Fonseca et al. (2023)"
     ],
     [
      "Célula de Purkinje (rata)",
      "~175.000",
      "[medido]",
      "Napper y Harvey (1988)"
     ],
     [
      "Cifra popular (neurona neocortical)",
      "7.000",
      "[estimado]",
      "Drachman (2005)"
     ]
    ]
   }
  },
  {
   "id": "fig-un-valor-de-referencia-con-incertidumbre",
   "tipo": "figura",
   "nav": "Un valor con incertidumbre",
   "titulo": "Un valor de referencia con incertidumbre",
   "sub": "Promedios compatibles con los datos publicados, en miles de millones de neuronas. Escala lineal: aquí los valores son del mismo orden.",
   "widget": "m2.fig-incertidumbre",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Qué intervalos admiten los datos publicados para el número total de neuronas?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: miles de millones de neuronas. Cada fila es una estimación distinta."
     ],
     [
      "Unidades",
      "Miles de millones de neuronas (10⁹)."
     ],
     [
      "Colores, símbolos y formas",
      "Barra intensa con rombo: la medición de Azevedo et al. (2009), media ± una desviación estándar. Barras más claras: intervalos estimados. Línea discontinua: la referencia de 86.000 millones."
     ],
     [
      "La escala",
      "Lineal: aquí los valores son del mismo orden, así que no hace falta la logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor por las filas, o tócalas."
     ],
     [
      "Cómo interpretar el resultado",
      "La referencia cae dentro de varios intervalos, pero no del de las mujeres."
     ],
     [
      "Qué permite concluir",
      "Que el valor depende del método y de la muestra, y que los datos sugieren promedios menores en mujeres."
     ],
     [
      "Qué no permite concluir",
      "Elegir «el valor verdadero»: las barras no son probabilidades y proceden de análisis distintos."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "Esta figura resume **el debate de los 86.000 millones**. Qué sostiene cada autor: [I.6 · Para profundizar](#m2t5-lec-i6).",
    "Goriely (2025a, 2025b); Lent (2025); von Bartheld (2025). La cifra de 86.000 millones es la referencia más usada, pero su magnitud exacta depende del método y de la muestra."
   ]
  },
  {
   "id": "cap-computo",
   "tipo": "texto",
   "nav": "Introducción: el cómputo",
   "kicker": "Acto I · 3 · 10¹⁵ FLOP/s",
   "titulo": "¿Cuántas operaciones es un pensamiento?",
   "bloques": [
    "**La pregunta de traducción.** Si el cerebro no hace {{operaciones de punto flotante|g-flop}}, ¿cuántas haría falta para igualarlo?",
    {
     "nota": "Aprenderás a traducir el cerebro a operaciones con una convención explícita, por qué el resultado tiene cuatro órdenes de margen y por qué 10 bits/s no contradicen 10¹⁵ FLOP/s."
    },
    "El cerebro no suma con decimales ni sigue un reloj, así que traducirlo a operaciones de computadora exige una {{convención|g-convencion}}. La más citada multiplica tres factores: cuántas sinapsis hay, con qué frecuencia se activan y cuántas operaciones digitales cuesta imitar cada activación.",
    "El resultado central ronda los 10¹⁵ {{FLOP/s|g-flop}}, mil billones de operaciones por segundo, con un margen enorme: de 10¹³ a 10¹⁷. Y de todo ese procesamiento sale muy poco como decisión consciente: unos 10 bits por segundo."
   ]
  },
  {
   "id": "dato-ev-5",
   "tipo": "dato",
   "nav": "Cuánto cómputo «es» un cerebro",
   "titulo": "Cuánto cómputo «es» un cerebro",
   "evidencia": "ev-5"
  },
  {
   "id": "lec-i7",
   "tipo": "leccion",
   "codigo": "I.7",
   "nav": "I.7 · Traducir el cerebro a operaciones",
   "titulo": "Traducir el cerebro a operaciones: sinapsis × frecuencia × operaciones",
   "pregunta": "Si el cerebro no hace cuentas con decimales, ¿cómo puede «equivaler» a tantas operaciones por segundo?",
   "min": 10,
   "dim": "cmp",
   "sencillo": [
    "El cerebro no ejecuta {{FLOP|g-flop}}: no tiene números de punto flotante ni un reloj que marque los pasos. Para compararlo con una computadora hay que elegir una *{{convención|g-convencion}}*: una regla acordada para traducir lo que hace el cerebro a operaciones equivalentes. La más citada multiplica tres factores, cada uno con su propia incertidumbre:",
    {
     "ul": [
      "**S, el número de {{sinapsis|g-sinapsis}}**: cuántos puntos de contacto pueden transmitir señales. Intervalo: de 10¹⁴ a 10¹⁵ (estimado). Valor central del recorrido: ~2 × 10¹⁴.",
      "**f, la frecuencia media de activación**: cuántas veces por segundo se activa, de media, cada sinapsis, en {{hercios|g-hercio}}. Intervalo de los modelos: de 0,1 a 1 Hz. Valor central: 0,5 Hz, una activación cada dos segundos.",
      "**k, las operaciones por activación**: cuántas operaciones digitales costaría imitar lo que hace una sinapsis cada vez que se activa. Intervalo: de 1 a 100 FLOP. Valor central: ~10."
     ]
    },
    {
     "formula": "Cómputo equivalente = S × f × k."
    },
    "El intervalo resultante, de 10¹³ a 10¹⁷ FLOP/s, es un **juicio experto** (Carlsmith, 2020), no una medición fisiológica: Carlsmith juzgó más probable que improbable que 10¹⁵ FLOP/s bastaran con el software adecuado."
   ],
   "vida": [
    "Para comparar el trabajo de un panadero con el de una amasadora, podrías contar «cuántas veces amasa por minuto» y «cuántos movimientos de máquina costaría imitar cada amasado». La cifra final depende de lo que decidas contar y de cuánto detalle quieras imitar. No es falsa: es una convención, y otra persona razonable podría elegir otra."
   ],
   "imagen": {
    "pie": "En escala logarítmica, cada factor es una flecha: el resultado cae donde termina la última.",
    "si": "Que multiplicar factores equivale a sumar sus exponentes, y que el resultado se mueve tanto como se muevan los factores.",
    "no": "Las flechas no dicen si la convención es buena: un cálculo exacto con supuestos discutibles sigue siendo discutible.",
    "svg": "lec-i7"
   },
   "ejemplo": {
    "enunciado": "El escenario central, paso a paso.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "S ≈ 2 × 10¹⁴ sinapsis; f = 0,5 Hz; k ≈ 10 FLOP por activación."
     ],
     [
      "**Qué significa cada número**",
      "S cuenta sinapsis; f, activaciones por segundo de cada una; k, operaciones para imitar cada activación."
     ],
     [
      "**Qué unidades usa**",
      "sinapsis × (activaciones/s) × (FLOP/activación) = FLOP/s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar los tres factores, es decir, sumar sus exponentes."
     ],
     [
      "**El cálculo**",
      "2 × 10¹⁴ × 0,5 = 10¹⁴ activaciones/s · × 10 = 10¹⁵ FLOP/s · en exponentes: 14,3 + (−0,3) + 1 = 15"
     ],
     [
      "**El resultado**",
      "~10¹⁵ FLOP/s [estimado]."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Con estos supuestos, igualar el procesamiento del cerebro exigiría unos mil billones de operaciones por segundo. Con los supuestos más bajos sale 10¹³; con los más altos, 10¹⁷: cuatro órdenes de margen."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Cuál de los tres factores, moviéndose dentro de su intervalo, cambia más el resultado?",
    "opciones": [
     "S, el número de sinapsis",
     "f, la frecuencia",
     "k, las operaciones por activación"
    ],
    "ok": 2,
    "porque": "S y f recorren un factor 10 cada uno (un orden de magnitud); k recorre un factor 100 (de 1 a 100: dos órdenes). Juntos suman los cuatro órdenes del intervalo de Carlsmith."
   },
   "actividad": "sfkone",
   "descubrir": [
    "Cada factor se mueve dentro de su intervalo y arrastra el resultado: S y f, un orden de magnitud cada uno; k, dos. Por eso la estimación final abarca cuatro órdenes. El «exaflop cerebral» (~10¹⁸) solo aparece si se infla S unas 3 veces y f unas 200 respecto del escenario central. Debajo, en la figura [«Sinapsis × frecuencia × operaciones por evento»](#m2t5-fig-sinapsis-x-frecuencia-x-operaciones-por-), puedes mover los tres a la vez y ver de dónde sale cada cifra famosa."
   ],
   "error": {
    "mal": "«El cerebro hace 10¹⁵ operaciones por segundo», como si fuera una medición.",
    "bien": "Es la estimación central de una convención: «igualar el desempeño del cerebro podría exigir del orden de 10¹⁵ FLOP/s, con un intervalo de 10¹³ a 10¹⁷». El cerebro no hace FLOP."
   },
   "quiz": {
    "q": "Si duplicas la frecuencia media f (de 0,5 a 1 Hz) y dejas S y k igual, ¿qué pasa con el resultado?",
    "opciones": [
     {
      "t": "Se duplica: de 10¹⁵ a 2 × 10¹⁵ FLOP/s",
      "fb": "El resultado es proporcional a cada factor: multiplicar f por 2 multiplica el producto por 2 (sube ≈ 0,3 órdenes de magnitud).",
      "ok": true
     },
     {
      "t": "Sube un orden de magnitud: a 10¹⁶",
      "fb": "Para subir un orden habría que multiplicar f por 10, no por 2."
     },
     {
      "t": "No cambia, porque S es mucho mayor",
      "fb": "En un producto, cada factor cuenta por igual en proporción, sea grande o pequeño."
     }
    ]
   },
   "clave": {
    "sencillo": "El cómputo cerebral «equivalente» es una convención: sinapsis × frecuencia × operaciones por activación.",
    "cientifico": "C ≈ S·f·k; con S ∈ [10¹⁴, 10¹⁵], f ∈ [0,1; 1] Hz y k ∈ [1, 100] FLOP, C ∈ [10¹³, 10¹⁷] FLOP/s, con valor central ~10¹⁵ (Carlsmith, 2020; juicio experto, no medición)."
   },
   "profundiza": [
    "Las unidades encajan: sinapsis × activaciones por segundo × FLOP por activación = FLOP por segundo.",
    "Sigue leyendo: [Profundiza: juicio experto, emulación y cotas físicas](#m2t5-hasta-aqui)"
   ],
   "profundizaSub": "unidades y juicio experto"
  },
  {
   "id": "lec-i8",
   "tipo": "leccion",
   "codigo": "I.8",
   "nav": "I.8 · La escalera de la emulación",
   "titulo": "La escalera de la emulación: cuánto detalle copiar",
   "pregunta": "¿Hace falta simular cada molécula para copiar un cerebro?",
   "min": 6,
   "dim": "cmp",
   "sencillo": [
    "Una *emulación* es una simulación tan detallada que reproduce el funcionamiento del original. Su costo depende del **nivel de detalle**. Sandberg y Bostrom (2008) lo estimaron para cada nivel: va de unas 10¹⁵ {{FLOP/s|g-flop}} si basta con modelar poblaciones de neuronas a 10⁴³ en los niveles moleculares más finos, y pasa por el famoso «{{exaflop|g-exa}} cerebral» (10¹⁸), que corresponde a emular el cerebro como red de neuronas de impulsos (un modelo en el que cada neurona solo suma lo que recibe y dispara un impulso si supera un umbral).",
    "Cada peldaño multiplica el costo. Nadie sabe qué nivel es necesario para reproducir lo que hace un cerebro: es una de las grandes preguntas abiertas.",
    "Ojo con una confusión frecuente: estas cifras miden el costo de **copiar** el cerebro con cierto detalle, no la «velocidad» del cerebro. La [convención S × f × k de la lección I.7](#m2t5-lec-i7) (10¹³–10¹⁷) intenta estimar lo necesario para **igualar su desempeño**, que es otra pregunta."
   ],
   "vida": [
    "Para predecir el tráfico de una ciudad puedes simular flujos de carros por calle (barato), cada carro (más caro) o cada pieza del motor de cada carro (carísimo). Cuál necesitas depende de la pregunta: para saber dónde habrá atasco basta lo primero; para saber cuánto se desgastan los frenos, quizá haga falta lo último."
   ],
   "imagen": {
    "pie": "Cada peldaño de detalle multiplica el costo de la emulación.",
    "si": "Que el costo crece a saltos de varios órdenes de magnitud al añadir detalle.",
    "no": "Los peldaños no están medidos: son estimaciones de 2008 con supuestos fuertes. Y subir un peldaño no garantiza una copia más «fiel» si no se sabe qué detalle importa.",
    "svg": "lec-i8"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas veces más cuesta emular al nivel electrofisiológico que como red de impulsos?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "10¹⁸ FLOP/s (red de impulsos) y 10²² FLOP/s (electrofisiológico) [estimado; Sandberg y Bostrom, 2008]."
     ],
     [
      "**Qué significa cada número**",
      "Dos niveles de detalle para la misma tarea."
     ],
     [
      "**Qué unidades usa**",
      "FLOP/s en los dos casos: misma regla."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir, es decir, restar exponentes."
     ],
     [
      "**El cálculo**",
      "10²² ÷ 10¹⁸ = 10⁴ = 10.000"
     ],
     [
      "**El resultado**",
      "Diez mil veces más."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Pasar de modelar impulsos a modelar la electricidad de cada neurona multiplica el costo por diez mil. LineShine (2,2 × 10¹⁸ FLOP/s en FP64) llegaría en el papel al primer nivel, pero quedaría a casi cuatro órdenes del segundo."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Bastaría LineShine, la supercomputadora más rápida de 2026 (2,2 × 10¹⁸ FLOP/s), para emular el cerebro como red de impulsos (10¹⁸ FLOP/s)?",
    "opciones": [
     "Sí, en el papel le sobra más del doble",
     "No, le faltan varios órdenes de magnitud",
     "Es imposible saberlo"
    ],
    "ok": 0,
    "porque": "En el papel, 2,2 × 10¹⁸ supera 10¹⁸. Pero el resultado descansa en supuestos fuertes: que ese nivel de detalle baste, que la máquina rinda en esa tarea como en la prueba {{HPL|g-hpl}} y que la precisión {{FP64|g-fp}} sea la adecuada."
   },
   "actividad": "ladder",
   "descubrir": [
    "Las máquinas de 2026 ya alcanzan, en el papel, los peldaños más bajos de la escalera; los más altos quedan a muchos órdenes de magnitud. Pero «alcanzar el número» no significa poder emular: el rendimiento real en una simulación así podría ser una pequeña fracción del de la prueba {{HPL|g-hpl}} (como sugiere el banco {{HPCG|g-hpcg}} del [Acto II](#m2t7-lec-ii4)), y nadie sabe qué nivel de detalle hace falta."
   ],
   "error": {
    "mal": "«El cerebro es una máquina de un exaflop.»",
    "bien": "El exaflop es el costo estimado de emularlo como red de neuronas de impulsos (Sandberg y Bostrom, 2008), no su «velocidad». Con otros niveles de detalle, la cifra va de 10¹⁵ a 10⁴³."
   },
   "quiz": {
    "q": "¿Qué mide la «escalera de la emulación»?",
    "opciones": [
     {
      "t": "La velocidad del cerebro en FLOP/s",
      "fb": "El cerebro no hace FLOP; la escalera estima lo que costaría simularlo en una computadora."
     },
     {
      "t": "Lo que costaría simular el cerebro en tiempo real según cuánto detalle se copie",
      "fb": "Exacto: cada peldaño es un nivel de detalle, y el costo crece a saltos de varios órdenes de magnitud.",
      "ok": true
     },
     {
      "t": "Cuántas neuronas tiene cada región del encéfalo",
      "fb": "Eso es un recuento (regla de cantidad); la escalera pertenece a la regla de cómputo."
     }
    ]
   },
   "clave": {
    "sencillo": "Copiar el cerebro cuesta más cuanto más detalle se reproduzca, y nadie sabe cuánto hace falta.",
    "cientifico": "Sandberg y Bostrom (2008) estiman 10¹⁸ FLOP/s para una emulación como red de neuronas de impulsos, 10²² electrofisiológica, 10²⁵ con el metaboloma, 10²⁶ con el proteoma y 10²⁷–10⁴³ en niveles moleculares: requisitos de emulación, no medidas del rendimiento cerebral."
   },
   "profundiza": [
    "Sandberg y Bostrom (2008) estimaron cuántas FLOP/s exigiría emular el cerebro en tiempo real según ese nivel: unas 10¹⁵ si basta con modelar poblaciones de neuronas; 10¹⁸ como red de neuronas de impulsos —el famoso «exaflop cerebral»—; 10²² con modelos electrofisiológicos de cada neurona; 10²⁵ si hay que incluir el *metaboloma* (el conjunto de moléculas del metabolismo); 10²⁶ con el *proteoma* (el conjunto de proteínas), y de 10²⁷ a 10⁴³ en niveles moleculares más finos.",
    "Sigue leyendo: [Profundiza: la cadena del «exaflop»](#m2t5-hasta-aqui)"
   ],
   "profundizaSub": "los peldaños, uno a uno"
  },
  {
   "id": "lec-i9",
   "tipo": "leccion",
   "codigo": "I.9",
   "nav": "I.9 · 10 bits por segundo",
   "titulo": "10 bits por segundo: el embudo de la decisión",
   "pregunta": "Si el cerebro procesa tanto, ¿por qué no puedes leer dos libros a la vez?",
   "min": 7,
   "dim": "inf",
   "sencillo": [
    "Zheng y Meister (2025) estimaron cuánta información sale de una persona en tareas que exigen decidir deliberadamente: teclear, jugar a videojuegos rápidos o memorizar un cubo de Rubik para resolverlo a ciegas. En todas, el caudal ronda los **10 {{bits|g-bit}} por segundo**. Por los sentidos, en cambio, entran del orden de **10⁹ bits por segundo**. La relación entre ambos, unos 10⁸, se llama *{{número de cribado|g-cribado}}*: ocho órdenes de magnitud de criba entre lo que entra y lo que sale como decisión.",
    "Esas dos cifras no contradicen los ~10¹⁵ {{FLOP/s|g-flop}}: miden cosas distintas. Los bits/s cuentan la información que cruza el cuello de botella de la decisión; los FLOP/s, el costo de reproducir el procesamiento que la hace posible. Con la IA pasa algo parecido: un modelo hace muchísimas operaciones para producir cada fragmento de texto, que lleva solo unos pocos bits.",
    "Hay debate sobre el alcance de ese límite: la cifra describe la decisión deliberada, no todo lo que hace el cerebro."
   ],
   "vida": [
    "Puedes caminar, mantener el equilibrio, oír la calle y distinguir colores a la vez, pero no puedes seguir dos conversaciones con atención a la vez. Lo primero ocurre en paralelo y sin decidirlo; lo segundo pasa por un cuello de botella estrecho: la atención deliberada."
   ],
   "imagen": {
    "pie": "Ocho escalones de ÷10: de mil millones de bits por segundo a diez.",
    "si": "La enorme diferencia entre la información que entra y la que sale como decisión deliberada.",
    "no": "El embudo no significa que la información «se tire»: gran parte se usa sin llegar a la conciencia, por ejemplo para coordinar movimientos.",
    "svg": "lec-i9"
   },
   "ejemplo": {
    "enunciado": "Memorizar un cubo de Rubik: ¿cuántos bits por segundo?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "~65 bits de información en la posición de un cubo de Rubik; ~5,5 s para memorizarla en las mejores marcas de resolución a ciegas (Zheng y Meister, 2025)."
     ],
     [
      "**Qué significa cada número**",
      "Un cubo tiene unas 4,3 × 10¹⁹ posiciones posibles, y log₂(4,3 × 10¹⁹) ≈ 65: hacen falta unos 65 bits para identificar una de ellas (lección [D4](#m2t3-lec-d4))."
     ],
     [
      "**Qué unidades usa**",
      "bits ÷ segundos = bits/s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Ritmo = total ÷ tiempo."
     ],
     [
      "**El cálculo**",
      "65 ÷ 5,5 ≈ 11,8"
     ],
     [
      "**El resultado**",
      "~12 bits/s."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Incluso en una hazaña de memoria de élite, el caudal deliberado ronda la decena de bits por segundo."
     ]
    ]
   },
   "prediccion": {
    "q": "Si tecleas el doble de rápido (240 palabras por minuto), ¿cuántos bits por segundo produces, con ~1 bit por carácter?",
    "opciones": [
     "Unos 20 bits/s",
     "Unos 200 bits/s",
     "Unos 10 bits/s, igual"
    ],
    "ok": 0,
    "porque": "El caudal es proporcional a la velocidad: el doble de caracteres por segundo, el doble de bits. 240 × 5 ÷ 60 = 20 caracteres/s ≈ 20 bits/s."
   },
   "actividad": "typing",
   "descubrir": [
    "Incluso con velocidades extremas, la conducta deliberada se queda en decenas de bits por segundo, ocho órdenes por debajo de la entrada sensorial. Ese número de cribado describe un cuello de botella de la decisión, no la capacidad de cálculo del cerebro."
   ],
   "error": {
    "mal": "«Si solo salen 10 bits por segundo, el cerebro es más lento que un módem antiguo.»",
    "bien": "Los 10 bits/s miden la salida deliberada. El procesamiento que la hace posible —percibir, predecir, coordinar— es enorme y se mide con otra regla (cómputo): bajo la convención central, ~10¹⁵ FLOP/s."
   },
   "quiz": {
    "q": "¿Por qué no se contradicen «10 bits/s» y «10¹⁵ FLOP/s»?",
    "opciones": [
     {
      "t": "Porque una de las dos está mal medida",
      "fb": "Las dos pueden ser correctas: responden a preguntas distintas."
     },
     {
      "t": "Porque una mide la información que sale como decisión y la otra el costo de reproducir el procesamiento",
      "fb": "Exacto: son reglas distintas (información y cómputo). Una calculadora también hace muchas operaciones para darte un resultado de pocos dígitos.",
      "ok": true
     },
     {
      "t": "Porque 10¹⁵ es mucho mayor que 10",
      "fb": "No se comparan por tamaño: tienen unidades distintas."
     }
    ]
   },
   "clave": {
    "sencillo": "Del cerebro salen unos 10 bits por segundo como decisión, aunque entren mil millones: es un cuello de botella, no una medida de su cálculo.",
    "cientifico": "el caudal conductual deliberado (~10 bits/s) frente a la entrada sensorial (~10⁹ bits/s) define un número de cribado de ~10⁸ (Zheng y Meister, 2025); bits/s y FLOP/s son dimensiones distintas."
   },
   "profundiza": [
    "Un modelo de IA de 10¹¹ *parámetros* (los números ajustables que aprende) también ejecuta ~2 × 10¹¹ FLOP para producir cada *{{token|g-token}}* (un fragmento de texto) de unos pocos bits.",
    "Y hay debate: Sauerbrei y Pruszynski (2025) objetan que el control inconsciente del movimiento supera con mucho ese límite.",
    "Sigue leyendo: [Profundiza: Landauer y el número de cribado](#m2t5-hasta-aqui) · [Trampa 3 · Bits por segundo no son FLOP/s](#m2t10-trampa-3)"
   ],
   "profundizaSub": "la IA, el debate y las cotas físicas"
  },
  {
   "id": "fig-sinapsis-x-frecuencia-x-operaciones-por-",
   "tipo": "figura",
   "nav": "Sinapsis × frecuencia × operaciones",
   "titulo": "Sinapsis × frecuencia × operaciones por evento",
   "sub": "Elige un escenario y verás de dónde sale cada cifra famosa, o mueve los factores a mano. En escala logarítmica, multiplicar es sumar flechas: el resultado cae donde termina la última.",
   "widget": "m2.fig-sfk",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿De dónde sale cada cifra famosa del cómputo cerebral?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Un eje logarítmico de FLOP/s (abajo) y cuatro carriles: S (número de sinapsis), × f (frecuencia), × k (operaciones por activación) y = (resultado)."
     ],
     [
      "Unidades",
      "El punto S se lee como número de sinapsis; las flechas, como factores; el resultado, en FLOP/s."
     ],
     [
      "Colores, símbolos y formas",
      "Franja verde azulada: intervalo de Carlsmith (10¹³–10¹⁷). Zona rayada: 10²⁰–10²¹, de Allyn-Feuer y Sanders (preprint). Línea discontinua: el «exaflop» (10¹⁸). Rombo pequeño abajo: LineShine, medido en FP64, como referencia. Círculo con halo: tu resultado (estimado)."
     ],
     [
      "La escala",
      "Logarítmica: multiplicar por un factor es sumar la longitud de su flecha."
     ],
     [
      "Cómo se usa el control",
      "Elige un escenario (Conservador, Central, Techo del intervalo, «Exaflop» popular o Allyn-Feuer) o mueve los tres controles. Debajo verás la cuenta en exponentes y una explicación de lo que acabas de cambiar."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "Cada control desplaza su flecha y, con ella, el resultado; el recuadro verde narra el escenario."
     ],
     [
      "Cómo interpretar el resultado",
      "Si el círculo final cae dentro de la franja, la combinación es compatible con el juicio de Carlsmith (2020)."
     ],
     [
      "Incertidumbre e intervalos",
      "Cuatro órdenes de magnitud entre los extremos del intervalo."
     ],
     [
      "Qué permite concluir",
      "Ver qué supuestos producen cada cifra; por ejemplo, que el «exaflop» exige suponer 100 Hz de media para todas las neuronas."
     ],
     [
      "Qué no permite concluir",
      "Medir el cómputo del cerebro: es una convención. Tampoco comparar con LineShine sin recordar que su cifra es FP64 en la prueba HPL."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**S**: número de sinapsis (de 10¹⁴ a 10¹⁵). **f**: frecuencia media de activación de cada sinapsis, en hercios. **k**: operaciones digitales necesarias para imitar cada activación. Los tres se multiplican: cada control desplaza el resultado tanto como cambie él. Los escenarios de arriba colocan los tres a la vez.",
    "Unidades: sinapsis × eventos por segundo × FLOP por evento = FLOP/s. Intervalos de Carlsmith (2020): S de 10¹⁴ a 10¹⁵, f de 0,1 a 1 Hz y k de 1 a 100; el control de k llega a 10⁵ solo para el escenario ilustrativo de Allyn-Feuer y Sanders."
   ]
  },
  {
   "id": "fig-la-escalera-de-la-emulacion",
   "tipo": "figura",
   "nav": "La escalera de la emulación",
   "titulo": "La escalera de la emulación",
   "sub": "FLOP/s para emular el cerebro en tiempo real según el nivel de detalle (Sandberg y Bostrom, 2008), frente a máquinas de 2026. Cada peldaño multiplica el costo.",
   "widget": "m2.fig-escalera",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánto cómputo exigiría emular el cerebro según el nivel de detalle, y dónde quedan las máquinas de 2026?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje vertical: FLOP/s en escala logarítmica, de 10¹² a 10⁴⁴. A la izquierda, los peldaños de emulación; a la derecha, los sistemas."
     ],
     [
      "Unidades",
      "FLOP/s."
     ],
     [
      "Colores, símbolos y formas",
      "Peldaños verdes: niveles de emulación (Sandberg y Bostrom, 2008; estimados). Flechas «×10³», «×10⁴»: saltos entre peldaños. Franja verde: intervalo de Carlsmith. Zona rayada: niveles moleculares (10²⁷–10⁴³). Rombos: sistemas medidos; rombo hueco: proyectado. Línea punteada rosa: la cota de Landauer, que pertenece a otra regla (bits por segundo) y solo aparece como recordatorio."
     ],
     [
      "La escala",
      "Logarítmica vertical: cada marca rotulada son cuatro órdenes de magnitud."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor por cada peldaño o sistema, o tócalo. En pantallas estrechas, desliza horizontalmente."
     ],
     [
      "Cómo interpretar el resultado",
      "Cuanto más arriba, más cómputo; la distancia vertical entre dos marcas es su cociente."
     ],
     [
      "Qué permite concluir",
      "Ver que las máquinas de 2026 alcanzan los peldaños bajos y quedan muy lejos de los altos."
     ],
     [
      "Qué no permite concluir",
      "Comparar sin cautela: LineShine se mide en FP64, El Capitan en precisión mixta y FugakuNEXT es un objetivo en FP8 con dispersión. Ni comparar con la cota de Landauer, que mide otra cosa."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "LineShine se mide en {{FP64|g-fp}}; El Capitan, en {{precisión mixta|g-mixta}}; FugakuNEXT es un objetivo en FP8 con {{dispersión|g-dispersion}}. La cota de {{Landauer|g-landauer}} cuenta bits borrados por segundo: otra regla, la de información."
   ]
  },
  {
   "id": "fig-10-bits-por-segundo",
   "tipo": "figura",
   "nav": "10 bits por segundo",
   "titulo": "10 bits por segundo",
   "sub": "La conducta deliberada transmite unos 10 bits/s frente a ~10⁹ bits/s de entrada sensorial: ocho órdenes de magnitud de criba (Zheng y Meister, 2025).",
   "widget": "m2.fig-embudo",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánto se reduce el flujo de información entre los sentidos y la conducta deliberada?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "De izquierda a derecha, el flujo atraviesa ocho compuertas; la altura de la cuña representa el exponente."
     ],
     [
      "Unidades",
      "Bits por segundo: de ~10⁹ a ~10."
     ],
     [
      "Colores, símbolos y formas",
      "Rosa: información. Cada compuerta divide entre 10; las partículas que no pasan salen como chispas grises."
     ],
     [
      "La escala",
      "La altura es proporcional al exponente (es decir, logarítmica): por eso el estrechamiento es recto."
     ],
     [
      "Cómo se usa el control",
      "No tiene controles: es una animación."
     ],
     [
      "Cómo interpretar el resultado",
      "Ocho compuertas de ÷10 suman un factor 10⁸: el número de cribado."
     ],
     [
      "Qué permite concluir",
      "Ver el tamaño del cuello de botella de la decisión deliberada."
     ],
     [
      "Qué no permite concluir",
      "Concluir que la información que no sale se desperdicia, ni comparar estos bits/s con FLOP/s. Las partículas son ilustrativas: no hay una por bit."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "titulo": "Para comparar con cautela",
     "subtitulo": "Trampa 3 · Bits por segundo no son FLOP/s",
     "bloques": [
      "Los 10 bits/s y los 10¹⁵ FLOP/s no se contradicen: miden cosas distintas. Uno cuenta la información que cruza el cuello de botella de la decisión; el otro, el costo de reproducir el procesamiento que la hace posible. Un modelo de 10¹¹ parámetros también ejecuta ~2 × 10¹¹ FLOP por cada token de pocos bits.",
      "[Trampa 3 · Bits por segundo no son FLOP/s](#m2t10-trampa-3)"
     ]
    }
   ],
   "notas": []
  },
  {
   "id": "hasta-aqui",
   "tipo": "texto",
   "nav": "Hasta aquí",
   "kicker": "Resumen del taller",
   "titulo": "Hasta aquí sabemos que…",
   "bloques": [
    {
     "ul": [
      "El encéfalo tiene unos 86.000 millones de neuronas y del orden de 10¹⁴ sinapsis, repartidas de forma muy desigual.",
      "Dispara despacio, gasta unos 20 W (lo viste en la lección [I.4](#m2t4-lec-i4)) y deja salir unos 10 bits por segundo como decisiones.",
      "Traducido a operaciones digitales podría equivaler a ~10¹⁵ FLOP/s, con cuatro órdenes de magnitud de margen."
     ]
    },
    "**Cambio de mundo.** ¿Qué hace falta para construir, con arena, algo que se le parezca? Lo verás en el [Taller 6](#m2t6)."
   ],
   "desplegables": [
    {
     "titulo": "Profundiza",
     "subtitulo": "Juicio experto, emulación y cotas físicas",
     "clase": "prof",
     "bloques": [
      "Carlsmith (2020) consideró plausible el intervalo de 10¹³ a 10¹⁷ FLOP/s para igualar el desempeño cerebral, juzgó más probable que improbable que 10¹⁵ bastaran con el software adecuado y asignó menos de un 10 % de probabilidad a que se necesitaran más de 10²¹. Es un juicio experto probabilístico, ajeno a la medición fisiológica. Allyn-Feuer y Sanders (2023) sitúan el cómputo cerebral en 10²⁰–10²¹ FLOP/s en un preprint sin revisión por pares. Li et al. (2026) proponen estimar la computación a partir de la dinámica neural observada.",
      "La cadena del «exaflop» (cálculo B.2): 8,6 × 10¹⁰ neuronas × 7.000 sinapsis = 6 × 10¹⁴; × 100 Hz = 6 × 10¹⁶ eventos/s; × 14 FLOP ≈ 8,4 × 10¹⁷ FLOP/s. El valor k = 14 es un supuesto de reconstrucción sin fuente; frente al escenario central, S se infla un factor ~3 y f un factor 200. Sandberg y Bostrom (2008) asignan 10¹⁸ FLOP/s a la emulación como red de neuronas de impulsos, 10²² al nivel electrofisiológico, 10²⁵ al metaboloma, 10²⁶ al proteoma y de 10²⁷ a 10⁴³ a niveles moleculares más finos.",
      "{{Principio de Landauer|g-landauer}} (B.5): kBT ln 2 ≈ 2,97 × 10⁻²¹ J a 310 K; con 20 W, el cerebro no podría hacer más de ~6,7 × 10²¹ borrados irreversibles de bit por segundo. El {{número de cribado|g-cribado}} entre la entrada sensorial y la conducta ronda 10⁸ (Zheng y Meister, 2025)."
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
     "t": "Cada cifra con su apellido",
     "min": 20,
     "d": [
      "Seis cifras sobre el cerebro circulan en noticias y charlas. Cada equipo toma una y le pone «apellido»: de qué población, tarea o regla habla, qué tipo de cifra es y qué no permite concluir. Todo lo necesario está en este taller.",
      "Lecciones de apoyo: [I.5](#m2t5-lec-i5) e [I.6](#m2t5-lec-i6) para las tres primeras cifras, [I.7](#m2t5-lec-i7) e [I.8](#m2t5-lec-i8) para las de cómputo e [I.9](#m2t5-lec-i9) para la última."
     ],
     "pasos": [
      "Escribe seis tarjetas (o seis líneas en la pizarra): 86.000 millones de neuronas · 7.000 sinapsis por neurona · 175.000 sinapsis por neurona · 10¹⁵ FLOP/s · un exaflop (10¹⁸ FLOP/s) · 10 bits por segundo.",
      "Forma equipos de dos o tres personas y reparte las tarjetas. Cada equipo responde tres preguntas: ¿de qué población, tarea o regla es esta cifra? ¿Es medida, estimada o extrapolada? ¿Qué no permite concluir?",
      "Para responder, cada equipo busca su cifra en las lecciones de apoyo que aparecen arriba.",
      "Cada equipo presenta su tarjeta en un minuto. El resto del grupo puede objetar con la pregunta de la lección I.5: «¿de qué población es esta cifra?».",
      "Para cerrar, el grupo ordena las seis tarjetas de la más sólida a la más discutible y explica su orden."
     ],
     "nota": "Respuestas de referencia (población o regla · tipo de cifra · qué no permite concluir). **86.000 millones**: todo el encéfalo adulto · estimada: un recuento por muestreo en cuatro encéfalos de varones, multiplicado por volúmenes · no es un número exacto ni vale igual para cualquier persona. **7.000**: la neurona de la neocorteza · estimada (Drachman, 2005) · no describe a la neurona típica del encéfalo. **175.000**: la célula de Purkinje de la rata · medida · no es una media ni un dato humano. **10¹⁵ FLOP/s**: la estimación central de una convención (regla de cómputo) · estimada, por juicio experto, no medida · no dice que el cerebro haga operaciones de computadora. **Un exaflop**: el costo de emular el cerebro como red de neuronas de impulsos · estimada (Sandberg y Bostrom, 2008) · no es la «velocidad» del cerebro. **10 bits por segundo**: la salida deliberada, con otra regla, la información · estimada (Zheng y Meister, 2025) · no contradice los 10¹⁵ FLOP/s ni mide todo lo que procesa el cerebro."
    },
    {
     "t": "Contar lentejas: el error de muestreo en la mesa",
     "min": 20,
     "d": "Una versión de cocina del fraccionador isotrópico (lección [I.6](#m2t5-lec-i6)): estimar cuántas lentejas hay en una bolsa sin contarlas todas, y ver por qué cada equipo obtiene un número algo distinto.",
     "pasos": [
      "Materiales: una bolsa de lentejas (mejor que arroz: los granos son más grandes y se cuentan antes), una cucharita por equipo, una balanza de cocina y una hoja para anotar.",
      "Antes de empezar, pesa juntas diez cucharaditas rasas y divide entre diez: así obtienes el peso medio de una cucharadita sin que el error de la balanza cuente demasiado. Anota también el peso de la bolsa (viene en la etiqueta).",
      "Cada equipo saca una cucharadita rasa y cuenta sus lentejas; conviene repartir el montón entre dos o tres personas para ir más rápido.",
      "Con una regla de tres, cada equipo calcula el total: lentejas de su cucharadita × (peso de la bolsa ÷ peso medio de una cucharadita).",
      "Anota en la pizarra la estimación de cada equipo. ¿Cuánto se separan? Ese baile es el error de muestreo.",
      "Si queda tiempo, cada equipo cuenta una segunda cucharadita, promedia sus dos recuentos y recalcula. ¿Se estrecha la franja de resultados de la pizarra?",
      "Por último, promedia las estimaciones de todos los equipos: es como contar tantas cucharaditas como equipos hay. ¿Por qué ese promedio es más fiable que una estimación suelta?",
      "Para cerrar: si cada equipo tuviera una bolsa de otra variedad, ¿bastaría con contar mejor? Relaciónalo con la variación biológica entre personas y con los «86.000 millones»."
     ],
     "nota": "No hace falta conocer el total real: lo importante es comparar la dispersión de las estimaciones sueltas con la del promedio de varias cucharaditas. Si el grupo quiere comprobarlo, puede contar entera una bolsa pequeña al final."
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "encefalo",
  "computo"
 ]
});
})();
