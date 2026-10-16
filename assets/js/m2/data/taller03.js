/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 3 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Los campos marcados PENDIENTE y las secciones con «pendiente» se completan a mano. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 3,
 "slug": "m2t3",
 "etapa": "prol",
 "titulo": "Cuatro reglas para medir lo inmenso",
 "emblema": "×10",
 "pregunta": "¿Por qué hacen falta cuatro reglas distintas para comparar el cerebro y las máquinas?",
 "intro": "En este prólogo aprenderás qué mide cada una de las cuatro reglas —cantidad, cómputo, energía e información— y por qué nunca se mezclan. Primero repasarás cómo se leen las cifras enormes, en las que cada paso multiplica por diez; después verás una lección para cada regla y, al final, las cuatro reglas juntas en una sola figura.",
 "objetivos": [
  "Distinguir qué pregunta responde cada regla: cuántos hay (cantidad), cuántas operaciones (cómputo), cuánta potencia (energía) y cuánta información.",
  "Diferenciar un total de un ritmo: FLOP frente a FLOP/s, y julios frente a vatios.",
  "Calcular la energía de un aparato como potencia × tiempo y su eficiencia como energía por tarea.",
  "Explicar qué es un bit y por qué adivinar un número entre 1 y 1.024 cuesta 10 preguntas de sí o no.",
  "Leer una escala logarítmica y comparar solo cifras de una misma regla."
 ],
 "prerequisitos": [
  "Te ayudará repasar, del Taller 1, [F2 · Potencias de diez: contar ceros](#m2t1-lec-f2) y [F6 · Escala lineal y escala logarítmica: dos reglas de medir](#m2t1-lec-f6).",
  "Del Taller 2, [F8 · Cantidad total y ritmo: el cubo y el grifo](#m2t2-lec-f8) y [F11 · Cinco clases de cifras: medido, estimado, declarado, proyectado y extrapolado](#m2t2-lec-f11)."
 ],
 "secciones": [
  {
   "id": "cap-reglas",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Prólogo · ×10 por paso",
   "titulo": "Cuatro reglas para medir lo inmenso",
   "bloques": [
    "En este viaje aparecen cifras que van de 1 a casi 10³⁰. Para que quepan en una página usamos {{escalas logarítmicas|g-log}}, en las que cada paso a la derecha multiplica por diez: un {{orden de magnitud|g-orden}}. Una regla así solo sirve si todo lo que hay en ella se mide con la misma unidad: no tiene sentido poner en fila {{sinapsis|g-sinapsis}}, {{vatios|g-vatio}} y operaciones.",
    "Por eso usaremos cuatro reglas, una por pregunta. Cada una tiene su color y su icono, y los mantiene en las figuras y en la etiqueta de regla de cada lección del módulo.",
    {
     "widget": "m2.leyenda-reglas",
     "ctx": {
      "reglas": [
       {
        "dim": "cnt",
        "t": "**Cantidad** · ¿Cuántos hay? {{Neuronas|g-neurona}}, sinapsis, {{transistores|g-transistor}}, {{cúbits|g-cubit}}."
       },
       {
        "dim": "cmp",
        "t": "**Cómputo** · ¿Cuántas operaciones? {{FLOP|g-flop}} por segundo y FLOP totales."
       },
       {
        "dim": "nrg",
        "t": "**Energía** · ¿Cuánta potencia? Vatios, julios y {{teravatios-hora|g-twh}}."
       },
       {
        "dim": "inf",
        "t": "**Información** · ¿Cuánta información? {{Bits|g-bit}} por segundo y bytes guardados."
       }
      ]
     }
    },
    "Lo que no encaja en ninguna de las cuatro, como la {{frecuencia de disparo|g-tasa}} de una neurona, en {{hercios|g-hercio}}, aparece en gris.",
    "Antes de ver las cuatro reglas juntas, una lección para cada una y otra sobre por qué no se mezclan: [D1 · Cantidad](#m2t3-lec-d1), [D2 · Cómputo](#m2t3-lec-d2), [D3 · Energía](#m2t3-lec-d3), [D4 · Información](#m2t3-lec-d4) y [D5 · Por qué cuatro reglas](#m2t3-lec-d5).",
    "Pero antes, dos figuras de repaso para leer cifras enormes: [Cada escalón multiplica por diez](#m2t3-fig-cada-escalon-multiplica-por-diez) y [Cómo se llaman las potencias](#m2t3-fig-como-se-llaman-las-potencias). Si ya te manejas con las potencias de diez y con prefijos como kilo o mega, puedes pasar directamente a la lección D1."
   ]
  },
  {
   "id": "fig-cada-escalon-multiplica-por-diez",
   "tipo": "figura",
   "nav": "Cada escalón multiplica por diez",
   "titulo": "Cada escalón multiplica por diez",
   "sub": "Desliza de un punto a cien mil. En la escala lineal, el número se pega al cero; en la {{logarítmica|g-log}}, cada factor diez avanza un paso igual.",
   "widget": "m2.fig-escalon",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Qué le pasa a un número cuando se multiplica por diez una y otra vez, y cómo se ve en dos escalas?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Arriba, una cuadrícula con exactamente 10ⁿ puntos. Debajo, dos ejes: uno lineal de 0 a 100.000 y otro logarítmico de 1 a 100.000; el círculo marca dónde cae el número en cada uno."
     ],
     [
      "Unidades",
      "Ninguna: son puntos contados (dimensión de cantidad)."
     ],
     [
      "Colores, símbolos y formas",
      "Cada punto azul es una unidad. Desde 10.000 puntos, se dibujan como píxeles porque ya no caben como círculos."
     ],
     [
      "La escala",
      "El eje superior es lineal (marcas cada 25.000); el inferior, logarítmico (cada marca, ×10)."
     ],
     [
      "Cómo se usa el control",
      "Mueve el control «Exponente» de 0 a 5, con el ratón o con las flechas del teclado."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "El número de puntos se multiplica por 10 en cada paso. El círculo del eje logarítmico avanza un escalón igual cada vez; el del lineal casi no se mueve hasta los últimos pasos."
     ],
     [
      "Cómo interpretar el resultado",
      "La nota bajo la figura describe lo que ocurre en cada paso."
     ],
     [
      "Qué permite concluir",
      "Ver que la escala logarítmica reparte por igual los factores diez, mientras que la lineal aplasta los números pequeños contra el cero."
     ],
     [
      "Qué no permite concluir",
      "Leer a ojo el número exacto de puntos a partir de 10.000: la cuadrícula se vuelve una mancha, y esa es precisamente la lección."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Por qué contar en potencias de diez",
     "bloques": [
      "Nuestra intuición funciona bien con cantidades que podemos ver, como diez manzanas o cien personas. A partir de unos miles, los objetos se funden en una mancha. La escala logarítmica devuelve el detalle: reserva el mismo espacio para pasar de 10 a 100 que de mil millones a diez mil millones."
     ]
    }
   ],
   "notas": [
    "**Este control cambia el exponente n**: la cuadrícula tiene 10ⁿ puntos. Importa porque muestra que cada paso igual multiplica por diez."
   ],
   "notas_vivas": [
    "Un solo punto. En las dos escalas de abajo, el 1 queda en el origen.",
    "Diez puntos. En la escala lineal apenas se separan del cero; en la logarítmica ya ocupan el primer escalón.",
    "Cien puntos, otro factor diez. En la escala lineal siguen pegados al cero; en la logarítmica avanzan un escalón más.",
    "Mil puntos todavía se distinguen. En la escala lineal ocupan el 1 % del recorrido; en la logarítmica, tres de los cinco escalones.",
    "Diez mil puntos ya forman una trama. En la escala lineal llegan al 10 % del recorrido.",
    "Con cien mil, los puntos se funden en una mancha. La escala lineal llega al final; la logarítmica avanzó un solo escalón más."
   ]
  },
  {
   "id": "fig-como-se-llaman-las-potencias",
   "tipo": "figura",
   "nav": "Cómo se llaman las potencias",
   "titulo": "Cómo se llaman las potencias",
   "sub": "El español usa la {{escala larga|g-escala-larga}}: un billón es un millón de millones. Los prefijos del Sistema Internacional avanzan de mil en mil.",
   "widget": "m2.fig-potencias",
   "guia": null,
   "desplegables": [],
   "notas": []
  },
  {
   "id": "lec-d1",
   "tipo": "leccion",
   "codigo": "D1",
   "nav": "D1 · Cantidad",
   "titulo": "Cantidad: qué estamos contando",
   "pregunta": "Si una máquina tiene más «neuronas» que otra, ¿es más capaz?",
   "min": 5,
   "dim": "cnt",
   "sencillo": [
    "La primera regla responde a «¿cuántos hay?». Se cuentan objetos: *{{neuronas|g-neurona}}*, las células que transmiten señales eléctricas en el sistema nervioso; *{{sinapsis|g-sinapsis}}*, los puntos de contacto entre neuronas; *{{transistores|g-transistor}}*, los interruptores microscópicos de los chips, o *{{cúbits|g-cubit}}*, las unidades de información de una computadora cuántica. Todos se explicarán con calma más adelante.",
    "Contar es imprescindible, pero no basta. Dos sistemas con el mismo número de piezas pueden comportarse de forma muy distinta según **cómo se conectan**, **qué hace cada pieza** y **a qué ritmo trabajan**. Además, una neurona biológica y una «neurona de silicio» se llaman igual pero no son el mismo objeto: comparar sus números es comparar manzanas con dibujos de manzanas."
   ],
   "vida": [
    "Dos orquestas de 80 músicos no suenan igual. Una biblioteca con un millón de libros sin catálogo sirve menos que una de diez mil bien ordenada. El número de piezas es un dato, no un veredicto."
   ],
   "imagen": {
    "pie": "Seis nodos en cada lado: la cantidad coincide; la organización, no.",
    "si": "Que el número de piezas no determina por sí solo lo que puede hacer el conjunto.",
    "no": "Las redes reales tienen miles de millones de nodos y conexiones de fuerzas distintas; el dibujo solo muestra que la organización importa.",
    "svg": "lec-d1"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas conexiones distintas puede haber en un grupo de 10 neuronas si todas se conectan con todas?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "10 neuronas; una conexión entre cada pareja."
     ],
     [
      "**Qué significa cada número**",
      "Queremos contar parejas distintas."
     ],
     [
      "**Qué unidades usa**",
      "Conexiones (pares de neuronas)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Cada una de las 10 puede unirse con las otras 9; así cada pareja se cuenta dos veces (A con B y B con A), de modo que hay que dividir entre 2."
     ],
     [
      "**El cálculo**",
      "10 × 9 ÷ 2 = 45"
     ],
     [
      "**El resultado**",
      "45 conexiones posibles."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Con las mismas 10 piezas puede haber desde 9 conexiones (en cadena) hasta 45 (todas con todas). En el encéfalo real, cada neurona recibe entre unas 4 y unas 175.000 sinapsis según su tipo."
     ]
    ]
   },
   "prediccion": {
    "q": "Si duplicas el número de nodos de una red «todos con todos», ¿cuánto crecen las conexiones?",
    "opciones": [
     "Se duplican",
     "Se multiplican por unas 4",
     "No cambian"
    ],
    "ok": 1,
    "porque": "En una red de todos con todos, las conexiones crecen con el cuadrado: n × (n − 1) ÷ 2. Con 10 nodos hay 45; con 20, 190: más de cuatro veces."
   },
   "actividad": "network",
   "descubrir": [
    "Con el mismo número de nodos, cambiar la organización multiplica las conexiones o alarga los caminos que debe recorrer un mensaje. Por eso este recorrido nunca deduce la capacidad de un sistema a partir de un simple recuento."
   ],
   "error": {
    "mal": "«Darwin Monkey tiene más de 2.000 millones de neuronas: equivale al 2,3 % de un cerebro humano.»",
    "bien": "Darwin Monkey es un {{sistema neuromórfico|g-neuromorfico}} que la Universidad de Zhejiang presentó en 2025. Equivale al 2,3 % del *número* de neuronas, no de la capacidad. Una neurona de silicio es mucho más simple que una biológica, y su número no dice qué problemas resuelve el sistema."
   },
   "quiz": {
    "q": "¿Qué conclusión permite, por sí solo, un recuento de piezas?",
    "opciones": [
     {
      "t": "Cuántas piezas hay, y nada más sobre lo que el sistema puede hacer",
      "fb": "Exacto: contar responde a «¿cuántos?». Para hablar de capacidad hacen falta otras reglas —cómputo, energía, información— y conocer la organización del sistema.",
      "ok": true
     },
     {
      "t": "Qué sistema es más inteligente",
      "fb": "La inteligencia no se deduce de un recuento: depende de la organización, del tipo de piezas y de lo que hacen."
     },
     {
      "t": "Cuánta energía consume",
      "fb": "El consumo se mide con otra regla, la de energía, y depende de mucho más que del número de piezas."
     }
    ]
   },
   "clave": {
    "sencillo": "Contar dice cuántos hay, no qué pueden hacer.",
    "cientifico": "los recuentos de elementos (neuronas, sinapsis, transistores, cúbits) no determinan por sí solos la capacidad computacional, que depende de la conectividad, la dinámica y la función de cada elemento."
   },
   "profundizaSub": "dónde se amplía esta idea",
   "profundiza": [
    "**Profundización científica** (Taller 9):",
    {
     "ul": [
      "[Acto III · 3: neuronas de silicio frente al encéfalo](#m2t9-cap-alternativas)"
     ]
    }
   ]
  },
  {
   "id": "lec-d2",
   "tipo": "leccion",
   "codigo": "D2",
   "nav": "D2 · Cómputo",
   "titulo": "Cómputo: qué es una operación y qué significa FLOP/s",
   "pregunta": "¿Qué cuenta exactamente una computadora cuando dice que hace mil billones de operaciones por segundo?",
   "min": 9,
   "dim": "cmp",
   "sencillo": [
    "Una *operación* es un paso aritmético elemental: una suma, una resta, una multiplicación o una división. Las computadoras científicas y de inteligencia artificial trabajan sobre todo con números con decimales, que en informática se llaman *de punto flotante*. Una operación con esos números es un *{{FLOP|g-flop}}*, del inglés *floating-point operation*, «operación de punto flotante».",
    "**FLOP** es un total: cuántas operaciones se hicieron. **FLOP/s** es un ritmo: cuántas por segundo. Entrenar un gran modelo de IA en 2026 cuesta del orden de 10²⁷ FLOP (un total); una supercomputadora de primera fila hace del orden de 10¹⁸ FLOP/s (un ritmo).",
    "Un detalle decisivo: cada número ocupa cierta cantidad de *{{bits|g-bit}}* (dígitos binarios: ceros y unos). Hay formatos de 64, 16 y 8 bits, llamados {{FP64, FP16 y FP8|g-fp}}: cuantos más bits, más cifras exactas se guardan. Una operación con números cortos gasta menos energía y es más rápida, pero es menos precisa. Por eso **un FLOP en FP8 no vale lo mismo que uno en FP64**, y comparar cifras de rendimiento exige aclarar la precisión."
   ],
   "vida": [
    "Cuadrar la cuenta del supermercado son unas pocas operaciones: multiplicar el precio por la cantidad de cada producto y sumarlo todo. Tres productos son tres multiplicaciones y dos sumas: cinco operaciones. Si las haces con centavos (dos decimales) o con diez decimales, el resultado útil es el mismo, pero con diez decimales el trabajo es mucho mayor. Las máquinas eligen la precisión según lo que necesitan: una simulación del clima pide muchos decimales; reconocer un gato en una foto, muy pocos."
   ],
   "imagen": {
    "pie": "Tres reglas para colocar el mismo valor: cuantos menos bits, más separadas las marcas y mayor el redondeo.",
    "si": "Que con menos bits los números se redondean a valores más separados entre sí.",
    "no": "En los formatos reales las marcas no están igual de separadas en todo el recorrido: la separación crece con el tamaño del número. Por eso se llaman «de punto flotante».",
    "svg": "lec-d2"
   },
   "ejemplo": {
    "enunciado": "¿Cuánto tardaría una persona en hacer lo que la estimación central atribuye a un solo segundo de cerebro?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "10¹⁵ operaciones: un segundo de cerebro según la convención central (estimado). Una persona hace 1 operación por segundo."
     ],
     [
      "**Qué significa cada número**",
      "Queremos el tiempo necesario para completar 10¹⁵ operaciones a ese ritmo."
     ],
     [
      "**Qué unidades usa**",
      "operaciones ÷ (operaciones por segundo) = segundos. Después, segundos a años: un año tiene unos 3,156 × 10⁷ s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Tiempo = total ÷ ritmo."
     ],
     [
      "**El cálculo**",
      "10¹⁵ ÷ 1 = 10¹⁵ s · 10¹⁵ ÷ 3,156 × 10⁷ ≈ 3,2 × 10⁷ años"
     ],
     [
      "**El resultado**",
      "Unos 32 millones de años."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Haciendo una cuenta por segundo, sin dormir, tardarías unos 32 millones de años en hacer lo que esa estimación atribuye a un segundo de cerebro."
     ]
    ]
   },
   "prediccion": {
    "q": "Si guardas el número π = 3,14159… con solo 8 bits, ¿qué obtendrás?",
    "opciones": [
     "3,14159… exactamente",
     "Algo como 3,25",
     "Nada: no se puede guardar"
    ],
    "ok": 1,
    "porque": "Con solo 8 bits caben muy pocas cifras: cerca de 3, los valores posibles van de 0,25 en 0,25. π se redondea a 3,25, con un error de más del 3 %."
   },
   "actividad": "precision",
   "descubrir": [
    "Cuantos menos bits, mayor es el error de redondeo, y algunos números ni siquiera caben: en FP16 el máximo es 65.504; en FP8 E4M3, 448. A cambio, cada número ocupa ocho veces menos que en FP64, y el hardware puede hacer muchas más operaciones con la misma energía. Por eso las cifras de rendimiento solo se comparan dentro de una misma precisión."
   ],
   "error": {
    "mal": "Comparar un {{exaflop|g-exa}} en FP8 con uno en FP64 como si fueran equivalentes.",
    "bien": "Pregunta siempre «¿en qué precisión?» y «¿{{pico teórico|g-pico}} o rendimiento medido?». Un trillón de operaciones con números de 8 bits no equivale a un trillón de operaciones con números de 64 bits."
   },
   "quiz": {
    "q": "¿Qué diferencia hay entre «10²⁷ FLOP» y «10¹⁸ FLOP/s»?",
    "opciones": [
     {
      "t": "Ninguna: las dos miden cómputo",
      "fb": "Las dos miden cómputo, pero una es un total y la otra un ritmo: no son la misma clase de cifra."
     },
     {
      "t": "10²⁷ FLOP es un total de operaciones; 10¹⁸ FLOP/s es un ritmo, operaciones por segundo",
      "fb": "Exacto. Para relacionarlas hace falta un tiempo: a 10¹⁸ FLOP/s, completar 10²⁷ FLOP llevaría 10⁹ segundos, unos 32 años.",
      "ok": true
     },
     {
      "t": "10¹⁸ FLOP/s es mayor porque lleva «por segundo»",
      "fb": "No tiene sentido decir cuál es «mayor»: una es una cantidad y otra una velocidad, como kilómetros y kilómetros por hora."
     }
    ]
   },
   "clave": {
    "sencillo": "Un FLOP es una operación; FLOP/s, cuántas por segundo; y la precisión decide cuánto vale cada una.",
    "cientifico": "el rendimiento se expresa en operaciones de punto flotante por segundo para un formato numérico dado (FP64, FP16, FP8…); el pico teórico, con o sin dispersión, no equivale al rendimiento sostenido en una carga real."
   },
   "profundiza": [
    "**Por qué «punto flotante».** Las computadoras científicas y de inteligencia artificial trabajan sobre todo con números con decimales, que en informática se llaman *de punto flotante* porque la coma «flota»: cada número se guarda como una mantisa y un exponente, igual que en la notación científica.",
    "**Cuántas cifras caben en cada formato.** Con 64 bits, el formato *FP64* o «doble precisión», se guardan unas 16 cifras significativas; con 16 bits (**FP16**), unas 3; con 8 bits (**FP8**), apenas una o dos.",
    "**El formato FP8 de la predicción.** Con 8 bits en el formato FP8 llamado E4M3 solo caben 3 bits para la mantisa: cerca de 3, los valores representables están separados por 0,25. (La *mantisa* son las cifras del número; el exponente dice dónde va la coma.)",
    "**Pico teórico.** La cifra que anuncian los fabricantes suele ser el *{{pico teórico|g-pico}}*, lo máximo que el chip podría hacer en condiciones ideales. En una aplicación real, el rendimiento puede ser una pequeña fracción de ese pico.",
    "**Un ejemplo real.** Los más de 600 EFLOP/s proyectados para FugakuNEXT (FP8 con {{dispersión|g-dispersion}}) y los 2,2 EFLOP/s medidos de LineShine (FP64) no pueden ir en la misma frase sin aclararlo.",
    "**Profundización científica** (talleres 6 y 7):",
    {
     "ul": [
      "[Nivel 6: precisión y dispersión](#m2t6-n-chip)",
      "[Acto II · 2: pico frente a rendimiento real](#m2t7-cap-super)"
     ]
    }
   ]
  },
  {
   "id": "lec-d3",
   "tipo": "leccion",
   "codigo": "D3",
   "nav": "D3 · Energía",
   "titulo": "Energía: vatios, julios y kilovatios-hora",
   "pregunta": "¿Por qué una máquina que consume menos no es necesariamente más eficiente?",
   "min": 9,
   "dim": "nrg",
   "sencillo": [
    "La *energía* es la capacidad de producir un cambio: calentar agua, mover un carro, cambiar el estado de un {{transistor|g-transistor}}. Se mide en *{{julios|g-vatio}}* (J). Levantar una bolsa de 2 kilos a un metro de altura cuesta unos 20 julios.",
    "La *potencia* es el **ritmo** al que se usa esa energía y se mide en *vatios* (W): 1 vatio es 1 julio por segundo. El encéfalo consume unos 20 W: 20 julios cada segundo.",
    "Como la potencia es un ritmo, la energía total es potencia × tiempo. Las compañías eléctricas usan una unidad práctica, el *vatio-hora* (Wh): la energía de 1 vatio durante 1 hora, es decir, 3.600 julios. Para cantidades mayores se usan múltiplos, del kilovatio-hora (kWh) al {{teravatio-hora|g-twh}} (TWh), la unidad con que se mide el consumo de países enteros.",
    "La *{{eficiencia|g-eficiencia}}* es otra pregunta: cuánta energía cuesta cada unidad de trabajo útil (julios por operación, por ejemplo). Una máquina puede consumir poca potencia y ser ineficiente si hace muy poco; otra puede consumir muchísima y ser eficiente si hace muchísimo."
   ],
   "vida": [
    "Un hervidor eléctrico potente consume unos 2.600 W (es la comparación que usa este recorrido) y un cargador rápido de teléfono, unos 20 W. Pero el hervidor encendido un minuto gasta 2.600 × 60 = 156.000 J, unos 43 Wh, mientras que el cargador encendido 8 horas gasta 20 × 8 = 160 Wh: casi cuatro veces más. Potencia alta no significa gasto alto: depende del tiempo. Y para saber si un aparato es eficiente hay que preguntar qué hace con esa energía."
   ],
   "imagen": {
    "pie": "Una bici gasta poco y lleva poca carga; un tren gasta muchísimo y lleva muchísima. ¿Cuál es más eficiente? Depende de la energía por kilo transportado.",
    "si": "Que para hablar de eficiencia hay que dividir la energía entre el trabajo útil, no mirar solo el gasto.",
    "no": "El cerebro y una supercomputadora no transportan «la misma carga»: su trabajo no se mide en la misma unidad. Por eso hará falta una {{convención|g-convencion}}, que verás en el Acto III ([Taller 8](#m2t8-cap-energia)).",
    "svg": "lec-d3"
   },
   "ejemplo": {
    "enunciado": "Energía por operación de la supercomputadora Frontier.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Potencia: 24,6 MW durante la prueba de rendimiento HPL (medido). Rendimiento: 1,353 × 10¹⁸ FLOP/s (medido)."
     ],
     [
      "**Qué significa cada número**",
      "Queremos saber cuántos julios cuesta cada operación."
     ],
     [
      "**Qué unidades usa**",
      "W = J/s y FLOP/s. Al dividir, (J/s) ÷ (FLOP/s) = J por FLOP: los segundos se cancelan."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Energía por operación = potencia ÷ rendimiento."
     ],
     [
      "**El cálculo**",
      "24,6 × 10⁶ ÷ 1,353 × 10¹⁸ = (24,6 ÷ 1,353) × 10⁶⁻¹⁸ ≈ 18,2 × 10⁻¹² ≈ 1,8 × 10⁻¹¹ J"
     ],
     [
      "**El resultado**",
      "Unos 1,8 × 10⁻¹¹ julios por operación: unos 18 picojulios."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Cada operación de Frontier cuesta unos 18 billonésimos de julio. Para compararla con el cerebro habría que saber cuántas «operaciones» hace el cerebro, y eso exige una convención."
     ]
    ]
   },
   "prediccion": {
    "q": "Máquina A: 10 W y 100 tareas por segundo. Máquina B: 1.000 W y 1.000.000 de tareas por segundo. ¿Cuál gasta menos energía por tarea?",
    "opciones": [
     "A, porque consume menos",
     "B, aunque consume más",
     "Las dos igual"
    ],
    "ok": 1,
    "porque": "A: 10 ÷ 100 = 0,1 J por tarea. B: 1.000 ÷ 1.000.000 = 0,001 J por tarea, cien veces menos. B consume cien veces más potencia, pero hace diez mil veces más trabajo."
   },
   "actividad": "energy",
   "descubrir": [
    "Potencia, energía y eficiencia son tres preguntas distintas: ¿a qué ritmo se gasta? (W), ¿cuánto se gastó en total? (J o Wh) y ¿cuánto cuesta cada unidad de trabajo útil? (J por tarea). La primera habla de infraestructura; la segunda, de la factura; solo la tercera, de eficiencia."
   ],
   "error": {
    "mal": "«El cerebro gasta 20 W y una supercomputadora 20 MW: el cerebro es un millón de veces más eficiente.»",
    "bien": "Eso compara potencias, no eficiencias. La eficiencia exige dividir la energía entre el trabajo hecho; el Acto III —en el [Taller 8](#m2t8-lec-iii1)— lo calcula paso a paso y muestra que la razón depende de la convención elegida."
   },
   "quiz": {
    "q": "Un chip consume 700 W y hace 2 × 10¹⁵ operaciones por segundo. ¿Cuánta energía gasta por operación?",
    "opciones": [
     {
      "t": "3,5 × 10⁻¹³ J",
      "fb": "700 ÷ (2 × 10¹⁵) = 350 × 10⁻¹⁵ = 3,5 × 10⁻¹³ J, unos 0,35 picojulios. Es la cifra de pico de la NVIDIA H100 en FP8 sin dispersión, declarada por el fabricante.",
      "ok": true
     },
     {
      "t": "1,4 × 10¹⁸ J",
      "fb": "Has multiplicado. La energía por operación es potencia ÷ operaciones por segundo."
     },
     {
      "t": "700 J",
      "fb": "700 W son 700 julios por segundo, repartidos entre 2 × 10¹⁵ operaciones."
     }
    ]
   },
   "clave": {
    "sencillo": "Vatios: un ritmo. Julios: un total. Eficiencia: julios por unidad de trabajo útil.",
    "cientifico": "la potencia es energía por unidad de tiempo (1 W = 1 J/s); la energía es potencia integrada en el tiempo (1 Wh = 3.600 J); la eficiencia de cálculo se expresa como energía por operación, E = P/R, o su inversa, operaciones por julio."
   },
   "profundiza": [
    "**Los múltiplos del vatio-hora.** Con prefijos: kWh (10³ Wh), MWh (10⁶), GWh (10⁹) y TWh, el *teravatio-hora* (10¹² Wh), la unidad con que se mide el consumo de países enteros o de todos los centros de datos del mundo.",
    "**Profundización científica** (Taller 8 y glosario):",
    {
     "ul": [
      "[Acto III · 1: la pregunta equivocada](#m2t8-cap-energia)",
      "[Glosario: teravatio-hora](#m2glosario-g-twh)"
     ]
    }
   ]
  },
  {
   "id": "lec-d4",
   "tipo": "leccion",
   "codigo": "D4",
   "nav": "D4 · Información",
   "titulo": "Información: bits, bytes y bits por segundo",
   "pregunta": "¿Cuánta información hay en una respuesta de «sí» o «no»?",
   "min": 8,
   "dim": "inf",
   "sencillo": [
    "El *{{bit|g-bit}}* es la unidad mínima de información: la respuesta a una pregunta de sí o no, un 0 o un 1. Con 2 bits se distinguen 4 posibilidades (00, 01, 10, 11); con 3, 8; con 10, 1.024. **Cada bit adicional duplica las posibilidades.** Por eso adivinar un número entre 1 y 1.024 cuesta, con buenas preguntas, exactamente 10 preguntas de sí o no: 10 bits.",
    "Un *byte* son 8 bits. Los archivos se miden en bytes: un mensaje corto ocupa decenas o cientos de bytes; una foto de celular, unos millones (megabytes, MB); una película, miles de millones (gigabytes, GB). Un *petabyte* (PB) son 10¹⁵ bytes.",
    "Los **bits por segundo** (bits/s) miden un flujo: cuánta información pasa cada segundo por un canal. Se estima que por tus sentidos entran unos mil millones de bits por segundo, pero que lo que sale como decisión deliberada ronda los 10 bits por segundo (Zheng y Meister, 2025).",
    "Conviene separar tres cosas: la información que **entra** en un sistema, la que **procesa** por dentro y la que **sale** como resultado o decisión. Y no confundir bits/s con {{FLOP/s|g-flop}}: los primeros cuentan información; los segundos, operaciones."
   ],
   "vida": [
    "Al cruzar una calle, tus ojos reciben una avalancha de datos (colores, movimientos, distancias), tu cerebro los procesa y al final sale una decisión de un bit: cruzo o espero. La cámara de tu celular guarda una foto de varios megabytes, pero si solo quieres saber «¿hay un gato en la foto?», la respuesta cabe en un bit."
   ],
   "imagen": {
    "pie": "Mucha información entra; poca sale como decisión.",
    "si": "Que el flujo de entrada y el de salida pueden diferir en muchos órdenes de magnitud.",
    "no": "Lo que «se queda dentro» no se pierde sin más: el procesamiento interno usa esa información aunque no salga. Y el dibujo no dice cuántas operaciones se hacen dentro de la caja.",
    "svg": "lec-d4"
   },
   "ejemplo": {
    "enunciado": "Un mecanógrafo a 120 palabras por minuto: ¿cuántos bits por segundo produce?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "120 palabras por minuto. Supuesto habitual en mecanografía: 5 caracteres por palabra, contando el espacio. Supuesto de Zheng y Meister: ~1 bit por carácter, porque el texto es muy predecible."
     ],
     [
      "**Qué significa cada número**",
      "Queremos el ritmo de información que sale por los dedos."
     ],
     [
      "**Qué unidades usa**",
      "palabras/min → caracteres/min → caracteres/s → bits/s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar y dividir para cambiar de unidad, sin cambiar la cantidad."
     ],
     [
      "**El cálculo**",
      "120 × 5 = 600 caracteres/min · 600 ÷ 60 = 10 caracteres/s · 10 × 1 bit = 10 bits/s"
     ],
     [
      "**El resultado**",
      "Unos 10 bits/s."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Teclear muy deprisa transmite unos 10 bits por segundo: la misma cifra que el recorrido atribuye a la conducta deliberada."
     ]
    ]
   },
   "prediccion": {
    "q": "Para adivinar un número entre 1 y 1.024 con preguntas de sí o no, ¿cuántas preguntas necesitas como mínimo si preguntas bien?",
    "opciones": [
     "1.024",
     "10",
     "100"
    ],
    "ok": 1,
    "porque": "Cada buena pregunta parte las posibilidades por la mitad: 1.024 → 512 → … → 1. Son diez mitades, porque 2¹⁰ = 1.024. Cada respuesta aporta 1 bit."
   },
   "actividad": "guess",
   "descubrir": [
    "Una buena pregunta de sí o no aporta un bit porque parte las posibilidades por la mitad; una mala («¿es el 7?») casi siempre recibe un «no» y aporta muy poco. La información mide cuánta incertidumbre se elimina, no cuántas palabras se dicen. Y entrada, procesamiento y salida son tres flujos distintos."
   ],
   "error": {
    "mal": "Comparar 10 bits/s de conducta con 10¹⁵ FLOP/s de cómputo y concluir que el cerebro «es lento» o que las dos cifras se contradicen.",
    "bien": "Son reglas distintas: bits/s mide la información que sale como decisión; FLOP/s, el costo de reproducir el procesamiento que la hace posible. Un modelo de IA también ejecuta billones de operaciones para producir unos pocos bits de respuesta."
   },
   "quiz": {
    "q": "Un archivo ocupa 2 bytes. ¿Cuántos bits son?",
    "opciones": [
     {
      "t": "2 bits",
      "fb": "Un byte son 8 bits; 2 bytes son más."
     },
     {
      "t": "16 bits",
      "fb": "2 × 8 = 16 bits. Con 16 bits se distinguen 2¹⁶ = 65.536 posibilidades.",
      "ok": true
     },
     {
      "t": "256 bits",
      "fb": "256 es el número de posibilidades que caben en un byte (2⁸), no el número de bits."
     }
    ]
   },
   "clave": {
    "sencillo": "Un bit es un sí o un no; un byte, 8 bits; bits/s, un flujo de información.",
    "cientifico": "elegir entre N alternativas equiprobables requiere log₂ N bits; la tasa de información (bits/s) es una magnitud distinta del número de operaciones (FLOP/s) necesarias para procesarla."
   },
   "profundizaSub": "dónde se amplía esta idea",
   "profundiza": [
    "**Profundización científica** (Taller 5):",
    {
     "ul": [
      "[Acto I · 3: 10 bits por segundo](#m2t5-lec-i9)"
     ]
    }
   ]
  },
  {
   "id": "fig-lineal-o-logaritmica",
   "tipo": "figura",
   "nav": "Lineal o logarítmica",
   "titulo": "Lineal o logarítmica",
   "sub": "Neuronas de cuatro sistemas nerviosos y dos {{chips neuromórficos|g-neuromorfico}}. Cambia de escala y mira qué pasa con todo lo que no es el encéfalo humano.",
   "widget": "m2.fig-linlog",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cómo cambia la comparación de seis sistemas al pasar de escala lineal a logarítmica?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Cada fila es un sistema; la longitud de su barra horizontal es su número de neuronas."
     ],
     [
      "Unidades",
      "Neuronas: biológicas en los sistemas nerviosos y «de silicio» en los chips neuromórficos."
     ],
     [
      "Colores, símbolos y formas",
      "Barras azul intenso con glifo de neurona: sistemas nerviosos. Barras azul claro con glifo de chip: sistemas neuromórficos. El texto a la derecha da el valor."
     ],
     [
      "La escala",
      "Los botones «Lineal» y «Logarítmica» cambian el eje horizontal con una transición."
     ],
     [
      "Cómo se usa el control",
      "Pulsa los botones. Pasa el cursor por una fila para ver qué porcentaje de las neuronas humanas representa."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "En lineal, todo salvo el encéfalo humano queda pegado al cero; en logarítmica, las seis barras se distinguen."
     ],
     [
      "Cómo interpretar el resultado",
      "En logarítmica, la diferencia de longitud entre dos barras es su cociente: del gusano al ser humano hay ocho órdenes y medio de magnitud."
     ],
     [
      "Qué permite concluir",
      "Ver por qué hace falta la escala logarítmica cuando las cifras difieren en muchos órdenes de magnitud."
     ],
     [
      "Qué no permite concluir",
      "Que las neuronas de silicio equivalgan a las biológicas: comparten regla de cantidad, pero son objetos distintos ([trampa 6](#m2t10-trampa-6)). Además, las cifras de los chips son declaradas por sus fabricantes."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "**Los botones «Lineal» y «Logarítmica»** cambian la escala del eje horizontal. Importa porque la escala decide qué diferencias puedes ver."
   ],
   "notas_vivas": {
    "logaritmica": "En escala logarítmica, del gusano al ser humano hay ocho órdenes y medio de magnitud.",
    "lineal": "En escala lineal, el gusano y la mosca quedan a menos de dos millonésimas del ancho, y Hala Point ocupa el 1,3 %."
   }
  },
  {
   "id": "lec-d5",
   "tipo": "leccion",
   "codigo": "D5",
   "nav": "D5 · Por qué cuatro reglas",
   "titulo": "Por qué cuatro reglas: una escala logarítmica no iguala unidades",
   "pregunta": "Si todo cabe en una escala logarítmica, ¿por qué no ponerlo todo en la misma regla?",
   "min": 6,
   "dim": "log",
   "sencillo": [
    "La {{escala logarítmica|g-log}} hace caber en una página cifras que van de lo diminuto a lo inmenso. Pero solo ordena cifras **de la misma unidad**. Poner en una misma fila 10¹⁴ {{sinapsis|g-sinapsis}}, 20 {{vatios|g-vatio}} y 10¹⁸ {{FLOP/s|g-flop}} produce una imagen ordenada y un razonamiento absurdo: ¿qué significa que los FLOP/s queden «más a la derecha» que las sinapsis?",
    "Por eso el recorrido usa **cuatro reglas paralelas**, una por pregunta, con un color y un icono cada una: cantidad (azul, puntos), cómputo (verde azulado, aspa en un cuadro), energía (ámbar, rayo) e información (rosa, señal cuadrada). Lo que no encaja en ninguna, como las frecuencias en {{hercios|g-hercio}}, va en gris. Una marca solo se compara con las de su propia regla.",
    "Además, cada regla empieza en un valor distinto. Que dos marcas de reglas distintas queden una encima de otra es una casualidad del dibujo."
   ],
   "vida": [
    "En un termómetro de horno y en una báscula de cocina, el número 200 puede aparecer a la misma altura: 200 grados y 200 gramos. Nadie diría que el horno «pesa» lo mismo que la harina. Las cuatro reglas de este recorrido son instrumentos distintos colocados uno junto a otro."
   ],
   "imagen": {
    "pie": "Cuatro reglas paralelas: se compara a lo largo de cada una, nunca de una a otra.",
    "si": "Que cada regla tiene su unidad y solo admite comparaciones internas.",
    "no": "Hay cifras que sí relacionan dos reglas, pero mediante una división con significado físico: energía ÷ operaciones = julios por operación. Eso crea una magnitud nueva; no compara las reglas entre sí.",
    "svg": "lec-d5"
   },
   "ejemplo": {
    "enunciado": "¿Se pueden comparar 2 × 10¹⁴ sinapsis con 2,2 × 10¹⁸ FLOP/s?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "2 × 10¹⁴ sinapsis (cantidad, estimado) y 2,2 × 10¹⁸ FLOP/s (cómputo, medido)."
     ],
     [
      "**Qué significa cada número**",
      "Una es un recuento de objetos; la otra, un ritmo de operaciones."
     ],
     [
      "**Qué unidades usa**",
      "«Sinapsis» frente a «FLOP/s»: unidades distintas."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Comprobar las unidades antes de dividir. Si no coinciden, el cociente no significa «cuántas veces mayor»."
     ],
     [
      "**El cálculo**",
      "2,2 × 10¹⁸ ÷ 2 × 10¹⁴ = 1,1 × 10⁴ … ¿de qué? De «FLOP/s por sinapsis»."
     ],
     [
      "**El resultado**",
      "Un número que solo tendría sentido como una magnitud nueva (operaciones por segundo y por sinapsis), no como comparación."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "No se puede decir que la máquina sea «diez mil veces mayor» que el cerebro. Para relacionar dimensiones hay que construir una magnitud con sentido (como julios por operación) y declarar la convención."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Qué ocurrirá si comparas «20 W del encéfalo» con «10¹⁵ FLOP/s del encéfalo»?",
    "opciones": [
     "Saldrá cuántas veces es mayor uno que otro",
     "El comparador se negará: son reglas distintas",
     "Saldrá cero"
    ],
    "ok": 1,
    "porque": "Vatios y FLOP/s son dimensiones distintas. Dividirlos da otra magnitud (julios por operación), no un «cuántas veces mayor»."
   },
   "actividad": "orders",
   "descubrir": [
    "Dentro de una regla, el cociente de dos cifras dice cuántas veces cabe una en otra, y su logaritmo, cuántos órdenes de magnitud las separan. Entre reglas distintas, el cociente no compara nada: como mucho, define una magnitud nueva que hay que justificar. Incluso dentro de una misma regla, hay que comprobar que se cuenta lo mismo: neuronas biológicas y de silicio, o FLOP en FP8 y en FP64."
   ],
   "error": {
    "mal": "Leer dos marcas de reglas distintas que quedan a la misma altura como si fueran «del mismo tamaño».",
    "bien": "Compara solo a lo largo de una misma regla. Si necesitas relacionar dos reglas, construye una magnitud con sentido (por ejemplo, energía ÷ operaciones) y dilo explícitamente."
   },
   "quiz": {
    "q": "¿Cuál de estas comparaciones es legítima?",
    "opciones": [
     {
      "t": "20 W del encéfalo frente a 24,6 MW de Frontier",
      "fb": "Las dos son potencias en vatios: misma regla. Su cociente (unos 1,2 millones) compara potencias eléctricas, aunque no dice nada de eficiencia ni de inteligencia.",
      "ok": true
     },
     {
      "t": "10¹⁴ sinapsis frente a 10¹⁸ FLOP/s",
      "fb": "Sinapsis (cantidad) y FLOP/s (cómputo) son reglas distintas."
     },
     {
      "t": "10 bits/s frente a 10¹⁵ FLOP/s",
      "fb": "Bits/s (información) y FLOP/s (cómputo) miden cosas distintas: ni se contradicen ni se comparan."
     }
    ]
   },
   "clave": {
    "sencillo": "Una escala logarítmica ordena cifras de la misma unidad; no iguala unidades distintas.",
    "cientifico": "solo son conmensurables las magnitudes de igual dimensión; los cocientes entre dimensiones distintas definen magnitudes derivadas (p. ej., J por operación) cuya interpretación exige una convención explícita."
   },
   "profundiza": [
    "**Dónde empieza cada regla.** Las cuatro reglas comparten la longitud de cada tramo «×10», pero no su origen: la de energía empieza en una diezmilmillonésima de vatio (10⁻¹⁰ W) y la de cómputo en 10¹² FLOP/s.",
    "Las cuatro reglas, con sus cifras principales, están dibujadas en la figura [Cuatro reglas paralelas](#m2t3-fig-cuatro-reglas-paralelas).",
    "**Profundización científica** (Taller 10):",
    {
     "ul": [
      "[Trampa 8 · Una escala logarítmica no iguala unidades](#m2t10-trampa-8)"
     ]
    }
   ]
  },
  {
   "id": "fig-cuatro-reglas-paralelas",
   "tipo": "figura",
   "nav": "Cuatro reglas paralelas",
   "titulo": "Cuatro reglas paralelas",
   "sub": "En las cuatro, un paso de diez mide lo mismo; por eso tienen largos distintos. Una marca solo se compara con las de su propia regla. Pasa el cursor o el dedo por una regla para leer cualquier punto en palabras.",
   "widget": "m2.fig-reglas",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Dónde cae cada cifra importante del recorrido dentro de su propia regla de medida?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Cuatro reglas horizontales, una por dimensión: cantidad, cómputo (con dos pistas: FLOP/s arriba y FLOP totales debajo), energía e información. La posición de cada marca a lo largo de su regla corresponde al logaritmo de su valor."
     ],
     [
      "Unidades",
      "Cantidad: unidades contadas (neuronas, sinapsis, transistores, cúbits, equivalentes H100). Cómputo: FLOP/s de 10¹² a 10²¹ y FLOP totales de 10²³ a 10³⁰. Energía: vatios, de 10⁻¹⁰ a 10¹¹ W. Información: bits por segundo, de 1 a 10²²."
     ],
     [
      "Colores, símbolos y formas",
      "El color y el icono de cada regla indican su dimensión. La forma del marcador indica la confianza: rombo lleno, medido; círculo lleno, estimado; cuadrado, declarado; rombo hueco, proyectado; círculo hueco, extrapolado. El pequeño glifo junto a cada rótulo dice el «mundo»: neurona (cerebro) o chip (silicio). Una barra gruesa alrededor de una marca es un intervalo (por ejemplo, 10¹⁴–10¹⁵ sinapsis). Los corchetes señalan cocientes: ×10⁸ entre entrada sensorial y conducta, y «× 30 años» entre un ritmo (FLOP/s) y un total (FLOP)."
     ],
     [
      "La escala",
      "Logarítmica. En las cuatro reglas, un tramo «×10» mide lo mismo; por eso tienen largos distintos (abarcan distinto número de tramos) y orígenes distintos (cantidad empieza en 1; energía en 10⁻¹⁰ W; cómputo en 10¹² FLOP/s; información en 1 bit/s)."
     ],
     [
      "Cómo se usa el control",
      "Pasa el cursor o el dedo a lo largo de una regla: una línea vertical y una nota te dicen, en palabras, el valor de ese punto. Pasa por un rótulo, o llega a él con el tabulador, para leer su ficha. En pantallas estrechas, desliza la figura horizontalmente."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "No hay controles que cambien los datos: la interacción solo sirve para leer valores."
     ],
     [
      "Cómo interpretar el resultado",
      "Compara marcas de una misma regla contando tramos: dos marcas separadas por tres tramos difieren en un factor 1.000."
     ],
     [
      "Incertidumbre e intervalos",
      "Los intervalos visibles (sinapsis, cómputo cerebral) abarcan de uno a cuatro órdenes de magnitud; el resto de las marcas son valores centrales con su propia incertidumbre, explicada en las fichas «¿De dónde sale este dato?»."
     ],
     [
      "Qué permite concluir",
      "Ordenar las cifras dentro de cada dimensión y ver cuántos órdenes de magnitud las separan; por ejemplo, que el cómputo de entrenamiento estimado para 2026 es unas mil veces el «cómputo de una vida»."
     ],
     [
      "Qué no permite concluir",
      "Comparar marcas de reglas distintas: que una marca de energía quede encima de una de cantidad no significa nada ([trampa 8](#m2t10-trampa-8)). Tampoco comparar cifras de cómputo con precisiones distintas (FP8 frente a FP64) sin aclararlo."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Marcas de confianza y convenciones",
     "bloques": [
      {
       "ul": [
        "[medido] Resultado publicado con revisión por pares o clasificación oficial de rendimiento.",
        "[estimado] Modelo o juicio experto con supuestos explícitos.",
        "[declarado] Dato de quien construyó el sistema, sin evaluación independiente publicada.",
        "[proyectado] Hoja de ruta, objetivo o escenario de terceros.",
        "[extrapolado] Cálculo propio a partir de las fuentes citadas."
       ]
      },
      "Toda cifra de rendimiento va con su precisión numérica ({{FP64, FP8|g-fp}}), con su banco de pruebas y, cuando procede, con la aclaración de si cuenta la {{dispersión|g-dispersion}}. Las equivalencias en cerebros dividen la potencia entre 20 W. Los valores derivados se redondean a dos cifras significativas o al orden de magnitud pertinente, como en el Apéndice B del libro (sus fórmulas y razones se resumen en el [Taller 8](#m2t8-fig-energia-por-operacion)).",
      "Las cuatro reglas comparten la longitud de cada tramo «×10», pero no su origen: la de cantidad empieza en 1, la de energía en 10⁻¹⁰ W, la de cómputo en 10¹² FLOP/s y la de información en 1 bit/s. La pista inferior de la regla de cómputo cuenta operaciones totales (FLOP), no operaciones por segundo; un ritmo multiplicado por un tiempo da un total."
     ]
    }
   ],
   "notas": []
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "Cuatro reglas en la pared",
     "min": 25,
     "d": [
      "Un juego de clasificación: el grupo coloca cifras del taller en cuatro reglas de papel y decide qué comparaciones tienen sentido.",
      "Material: cuatro tiras de papel largas, rotuladores de cuatro colores y tarjetas con las cifras del paso 2."
     ],
     "pasos": [
      "Dibuja en la pared o en la mesa cuatro reglas horizontales, una por pregunta: Cantidad (¿cuántos hay?), Cómputo (¿cuántas operaciones?), Energía (¿cuánta potencia?) e Información (¿cuánta información?). Marca en cada una tramos iguales (por ejemplo, de 10 cm): cada tramo multiplica por diez. Para que quepan todas las tarjetas basta con que la de cantidad vaya de 1 a 10¹⁵; la de cómputo, de 10¹⁵ a 10¹⁹ FLOP/s; la de energía, de 10 W a 10⁸ W, y la de información, de 1 a 10⁹ bits/s.",
      "Reparte tarjetas con cifras del taller: 302 neuronas del gusano C. elegans; 8,6 × 10¹⁰ neuronas del encéfalo; 10¹⁴–10¹⁵ sinapsis del encéfalo; 1,15 × 10⁹ neuronas de silicio de Hala Point; 20 W del encéfalo; 700 W de una H100; 24,6 MW de Frontier; ~10¹⁵ FLOP/s del encéfalo (convención); 2 × 10¹⁵ FLOP/s de una H100 (FP8, pico); 2,2 × 10¹⁸ FLOP/s de LineShine (FP64); ~10 bits/s de conducta deliberada; ~10⁹ bits/s de entrada sensorial.",
      "Cada persona coloca su tarjeta en la regla que le corresponde y, dentro de ella, en el tramo de su potencia de diez. Antes de pegarla, dice en voz alta qué pregunta responde su cifra. Si hay más personas que tarjetas, que trabajen en parejas; si hay menos, reparte dos tarjetas por persona.",
      "Pide a cada pareja que elija dos tarjetas y responda: ¿están en la misma regla? Si lo están, ¿cuántos tramos las separan y cuántas veces es mayor una que otra? Si no lo están, ¿por qué no se pueden comparar?",
      "Puesta en común: ¿alguna pareja estaba en la misma regla y aun así contaba cosas distintas, como neuronas biológicas y de silicio, o FLOP en FP8 y en FP64?"
     ],
     "nota": "Para quien facilita: 20 W del encéfalo frente a 24,6 MW de Frontier es una comparación legítima, porque las dos son potencias; su cociente, unos 1,2 millones, compara potencias eléctricas, no eficiencias (lección D5). Entre la entrada sensorial y la conducta deliberada hay un factor 10⁸. Una tarjeta de energía y una de cómputo no se comparan: dividirlas crea otra magnitud, julios por operación. Dentro del cómputo, la cifra del encéfalo es una {{convención|g-convencion}}, no una medida, y la de la H100 es un pico en FP8: ninguna de las dos se compara con la de LineShine, en FP64, sin aclararlo."
    },
    {
     "t": "¿Gasta más el que más potencia tiene?",
     "min": 15,
     "d": "Un reto de estimación para separar potencia, energía y eficiencia, con los datos de la lección D3.",
     "pasos": [
      "Plantea la pregunta sin dar datos: ¿qué gasta más energía, un hervidor encendido un minuto o un cargador rápido de teléfono encendido 8 horas? Cada persona vota a mano alzada.",
      "Da los datos del taller: hervidor, unos 2.600 W; cargador, unos 20 W. Pide a grupos pequeños que calculen la energía de cada uno: energía = potencia × tiempo. Antes de multiplicar, que pasen los dos tiempos a la misma unidad: a horas (1 minuto = 1/60 de hora) para obtener vatios-hora, o a segundos para obtener julios.",
      "Comprobación: el hervidor gasta 2.600 × 60 = 156.000 J, unos 43 Wh (en horas: 2.600 × 1/60 ≈ 43 Wh); el cargador, 20 × 8 = 160 Wh: casi cuatro veces más. Pregunta quién cambió de opinión y por qué.",
      "Segunda ronda: máquina A, 10 W y 100 tareas por segundo; máquina B, 1.000 W y 1.000.000 de tareas por segundo. ¿Cuál gasta menos energía por tarea? (A: 0,1 J por tarea; B: 0,001 J por tarea.)",
      "Cierre: cada grupo escribe en una sola frase la diferencia entre vatios, julios y eficiencia, y la lee al resto."
     ],
     "nota": "La idea que debe quedar: «Vatios: un ritmo. Julios: un total. Eficiencia: julios por unidad de trabajo útil.» Puedes proyectar la calculadora de la [lección D3](#m2t3-lec-d3) para comprobar los cálculos en pantalla."
    }
   ]
  },
  {
   "id": "puente",
   "tipo": "texto",
   "nav": "Con las reglas en la mano",
   "kicker": "Hacia el Acto I",
   "titulo": "Con las reglas en la mano",
   "bloques": [
    "Entremos en la máquina más eficiente que conocemos. ¿Qué hace una sola sinapsis?",
    "Lo verás en el [Taller 4 · Viaje al interior del cerebro](#m2t4), que abre el Acto I · La máquina de 20 vatios."
   ]
  }
 ],
 "capitulos_fuente": [
  "reglas"
 ]
});
})();
