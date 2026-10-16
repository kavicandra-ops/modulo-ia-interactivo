/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 6 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Los campos marcados PENDIENTE y las secciones con «pendiente» se completan a mano. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 6,
 "slug": "m2t6",
 "etapa": "acto2",
 "titulo": "Del interruptor al chip",
 "emblema": "0|1",
 "pregunta": "PENDIENTE",
 "intro": "PENDIENTE",
 "objetivos": [],
 "prerequisitos": [],
 "secciones": [
  {
   "id": "cap-hacia-fuera",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Acto II · 1 10² → 10⁹ W",
   "titulo": "Hacia fuera: cinco niveles",
   "bloques": [
    "Ahora el zoom se abre en sentido contrario, del interruptor más pequeño a un campus industrial. Fíjate en el hilo de la izquierda: a partir de aquí deja de ramificarse y empieza a doblar en ángulo recto."
   ]
  },
  {
   "id": "lec-ii0",
   "tipo": "leccion",
   "codigo": "II.0",
   "nav": "II.0 · Interruptores que calculan",
   "titulo": "Interruptores que calculan: bits y puertas lógicas",
   "pregunta": "¿Cómo puede calcular algo que solo sabe encenderse y apagarse?",
   "min": 8,
   "dim": "cmp",
   "sencillo": [
    "Un *interruptor* tiene dos estados: deja pasar la corriente o la corta. Si llamamos 1 al primero y 0 al segundo, un interruptor guarda un **bit**, la unidad mínima de información (lección D4).",
    "Lo interesante empieza al combinar interruptores. Dos en fila solo dejan pasar la corriente si los dos están cerrados: es la *puerta lógica Y* (en inglés, *AND*). Dos en paralelo la dejan pasar si cualquiera de ellos está cerrado: es la *puerta O* (*OR*). Un circuito que devuelve lo contrario de lo que recibe es la *puerta NO* (*NOT*).",
    "Con estas piezas se puede sumar. Para sumar dos bits basta otra puerta, el *O exclusivo* (*XOR*, «uno u otro, pero no los dos»), que da la cifra del resultado, y una puerta Y, que da el «me llevo una». Encadenando sumadores se suman números de 8, 16 o 64 bits, y con sumas se construyen las multiplicaciones. Un *chip* es eso a una escala enorme: miles de millones de interruptores microscópicos, los *transistores*, que cambian de estado miles de millones de veces por segundo."
   ],
   "vida": [
    "La luz de una escalera con dos interruptores, uno abajo y otro arriba, es una pequeña puerta lógica: cambiar cualquiera de los dos invierte el estado de la bombilla. Las luces del coche que solo se encienden «si la llave está puesta **y** la puerta abierta» funcionan con la lógica Y."
   ],
   "imagen": {
    "pie": "Interruptores en fila calculan «Y»; en paralelo calculan «O».",
    "si": "Que combinar interruptores permite tomar decisiones lógicas y, con ellas, hacer cuentas.",
    "no": "Un transistor no es un interruptor mecánico: no tiene piezas móviles y cambia de estado en billonésimas de segundo. Tampoco «entiende» los números: solo deja pasar o corta corriente; el significado lo ponemos al codificar.",
    "svg": "lec-ii0"
   },
   "ejemplo": {
    "enunciado": "Sumar 1 + 1 solo con puertas lógicas.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Dos bits de entrada: A = 1 y B = 1."
     ],
     [
      "**Qué significa cada número**",
      "Cada bit es un interruptor cerrado (1) o abierto (0)."
     ],
     [
      "**Qué unidades usa**",
      "Bits: unidades de información con dos valores posibles."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "La cifra del resultado la da XOR (vale 1 si exactamente una entrada vale 1) y el acarreo, Y (vale 1 si las dos valen 1)."
     ],
     [
      "**El cálculo**",
      "XOR(1, 1) = 0 · Y(1, 1) = 1 → resultado: «1 0»"
     ],
     [
      "**El resultado**",
      "«10» en binario, es decir, dos."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Un sumador es solo una combinación de interruptores. Un chip repite combinaciones así miles de millones de veces cada segundo: eso es «calcular» para una máquina."
     ]
    ]
   },
   "prediccion": {
    "q": "Con dos interruptores en fila, ¿cuántas de las cuatro combinaciones posibles de A y B encienden la bombilla?",
    "opciones": [
     "Ninguna",
     "Una",
     "Dos",
     "Tres"
    ],
    "ok": 1,
    "porque": "Solo una: A y B cerrados. En fila, basta un interruptor abierto para cortar el paso. En paralelo, en cambio, la encienden tres de las cuatro."
   },
   "actividad": "gates",
   "descubrir": [
    "Con dos estados y unas pocas reglas para combinarlos aparece la aritmética. Lo que distingue a un chip de otro no es una lógica distinta, sino cuántos interruptores tiene, cómo los organiza y cuánta energía gasta en cada cambio y en cada viaje de los datos."
   ],
   "error": {
    "mal": "«Un chip entiende los números como nosotros.»",
    "bien": "Un chip solo maneja estados de corriente. Los números, letras o imágenes son códigos de bits que nosotros decidimos; la máquina aplica reglas lógicas a esos bits."
   },
   "quiz": {
    "q": "¿Qué puerta lógica da la «cifra» al sumar dos bits?",
    "opciones": [
     {
      "t": "Y (AND)",
      "fb": "Y da el acarreo: vale 1 solo cuando las dos entradas valen 1."
     },
     {
      "t": "O exclusivo (XOR)",
      "fb": "Exacto: XOR vale 1 cuando exactamente una de las entradas vale 1, que es la cifra de la suma (0 + 1 = 1; 1 + 1 = 0, y me llevo una).",
      "ok": true
     },
     {
      "t": "NO (NOT)",
      "fb": "NO invierte una sola entrada; no combina dos."
     }
    ]
   },
   "clave": {
    "sencillo": "Combinando interruptores se construyen puertas lógicas, y con ellas, sumas: así calcula un chip.",
    "cientifico": "las puertas lógicas (AND, OR, NOT, XOR) implementan funciones booleanas; un semisumador obtiene la suma con XOR y el acarreo con AND, y los circuitos aritméticos se construyen componiendo puertas."
   },
   "profundiza": [],
   "fuente_enlaces": [
    {
     "texto": "Profundiza: el transistor de nanohojas",
     "href": "#n-transistor"
    }
   ]
  },
  {
   "id": "lec-ii1",
   "tipo": "leccion",
   "codigo": "II.1",
   "nav": "II.1 · El transistor y el precio de mover datos",
   "titulo": "El transistor y el precio de mover datos",
   "pregunta": "¿Qué gasta más energía en un chip: calcular o ir a buscar los datos?",
   "min": 9,
   "dim": "nrg",
   "sencillo": [
    "Un *transistor* es un interruptor sin piezas móviles: una tensión eléctrica en su *puerta* abre o cierra el paso de corriente por un canal de silicio. Los más modernos rodean el canal por todos lados, sobre láminas finísimas de silicio llamadas *nanohojas*; el primer nodo de nanohojas de la empresa TSMC, N2, está en producción en volumen desde finales de 2025.",
    "Durante décadas, al encoger el transistor también bajaban su tensión y su corriente, de modo que cada chip nuevo era más rápido sin calentarse más. Esa «mejora gratuita» se llama *escala de Dennard*; empezó a frenarse hacia 2007 y casi había desaparecido en 2012.",
    "Desde entonces, el gran gasto no es conmutar, sino **mover datos**. En tecnología de 45 nanómetros, una operación de punto flotante cuesta de 0,4 a 3,7 picojulios (pJ; un picojulio es una billonésima de julio, 10⁻¹² J) y traer un dato de la memoria externa, unos 1.000 pJ (Horowitz, 2014). Esa memoria externa es la *DRAM* (en inglés, *dynamic random-access memory*, memoria dinámica de acceso aleatorio): grande y barata, pero lejos del procesador. Es la cara energética del *cuello de botella de von Neumann*: en una computadora clásica, memoria y procesador están separados y los datos viajan sin parar entre ellos. El cerebro, recuerda la lección I.1, guarda y calcula en el mismo sitio."
   ],
   "vida": [
    "Cocinar un huevo frito lleva un par de minutos. Si cada vez que necesitas un ingrediente tienes que ir al supermercado, la mayor parte del tiempo y de la energía se te va en ir y volver. Por eso tenemos despensa y nevera en la cocina: acercar los ingredientes a los fogones."
   ],
   "imagen": {
    "pie": "Traer el ingrediente de la despensa cuesta mucho más que cocinarlo.",
    "si": "Que la distancia entre el lugar donde se guardan los datos y donde se usan domina el gasto, y que acercarlos ahorra energía.",
    "no": "Las cifras son de una tecnología de 45 nm, antigua frente a los chips actuales: los valores absolutos han cambiado. Y un chip no «camina»: los datos viajan como señales eléctricas por cables microscópicos, y cuanto más largo es el cable, más energía cuesta.",
    "svg": "lec-ii1"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas veces más cuesta traer un dato que operar con él?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Traer un dato de la DRAM: ~10³ pJ. Operar con él: de 0,4 a 3,7 pJ (45 nm, Horowitz, 2014; medido)."
     ],
     [
      "**Qué significa cada número**",
      "Las dos son energías por acción: una por viaje de un dato y otra por operación."
     ],
     [
      "**Qué unidades usa**",
      "Picojulios en los dos casos: al dividir, la unidad se cancela y queda un número de veces."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir la energía del viaje entre la de la operación, en los dos extremos del intervalo."
     ],
     [
      "**El cálculo**",
      "10³ ÷ 3,7 ≈ 270 · 10³ ÷ 0,4 = 2.500"
     ],
     [
      "**El resultado**",
      "Traer un dato cuesta entre ~270 y ~2.500 veces más que operar con él."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Si cada dato traído se usa una sola vez, casi toda la energía se va en el viaje. Por eso los chips modernos apilan memoria junto al procesador. Nota: la portada del acto II dice «×100–1.000»; con estas cifras el intervalo es ~270–2.500 (ver la ficha «¿De dónde sale este dato?» del nivel 5)."
     ]
    ]
   },
   "prediccion": {
    "q": "Si cada dato que traes de la memoria externa lo usas en una sola operación, ¿qué parte de la energía se va en el viaje?",
    "opciones": [
     "Menos de la mitad",
     "Más o menos la mitad",
     "Más del 99 %"
    ],
    "ok": 2,
    "porque": "Más del 99 %: con ~1.000 pJ por viaje y 0,4–3,7 pJ por operación, el viaje se lleva entre el 99,6 % y el 99,96 % de la energía."
   },
   "actividad": "datamove",
   "descubrir": [
    "El gasto depende de cuántas veces reutilizas cada dato antes de devolverlo: lo que los ingenieros llaman *intensidad aritmética*, operaciones por dato traído. Con pocas operaciones por dato manda el viaje; solo con cientos o miles de operaciones por dato manda el cálculo. Por eso «acercar la memoria al cómputo» es la estrategia que repiten los aceleradores, los chips neuromórficos y NorthPole."
   ],
   "error": {
    "mal": "«Lo que más energía gasta en un chip es hacer cuentas.»",
    "bien": "Desde el fin de la escala de Dennard, mover datos cuesta mucho más que operar con ellos: un acceso a memoria externa equivale a cientos o miles de operaciones."
   },
   "quiz": {
    "q": "¿Por qué dejaron de llegar las «mejoras gratuitas» al encoger los transistores?",
    "opciones": [
     {
      "t": "Porque los transistores dejaron de encoger",
      "fb": "Siguen encogiendo: N2 es de 2025 y hay nodos previstos hasta 2029. Lo que se perdió fue otra cosa."
     },
     {
      "t": "Porque su tensión y su corriente dejaron de bajar al encogerlos (fin de la escala de Dennard)",
      "fb": "Exacto: sin esa bajada, más transistores en el mismo espacio significan más calor, y el límite pasa a ser la energía.",
      "ok": true
     },
     {
      "t": "Porque el silicio se agotó",
      "fb": "El silicio sale de la arena: no escasea. El límite es energético."
     }
    ]
   },
   "clave": {
    "sencillo": "Hoy, mover un dato cuesta mucha más energía que operar con él.",
    "cientifico": "tras el fin de la escala de Dennard (~2007–2012), el costo energético está dominado por el movimiento de datos: en 45 nm, ~10³ pJ por acceso a DRAM frente a 0,4–3,7 pJ por operación (Horowitz, 2014)."
   },
   "profundiza": [],
   "fuente_enlaces": [
    {
     "texto": "Profundiza: hoja de ruta de la industria",
     "href": "#n-transistor"
    }
   ]
  },
  {
   "id": "n-transistor",
   "tipo": "nivel",
   "nav": "Nivel 5 · Transistor",
   "titulo": "Transistor",
   "n": 5,
   "mundo": "sil",
   "puente": "Volvemos a lo más pequeño, ahora en silicio.",
   "grupo": "Nivel 5 de 9 · Silicio",
   "lead": "Un transistor es un interruptor que deja pasar la corriente o la corta. Los más nuevos rodean el canal por todos lados con la puerta, sobre láminas de silicio llamadas {{nanohojas|g-nanohoja}}. Pero lo caro ya no es conmutar: es mover datos.",
   "ancla": {
    "cifra": "~10³ pJ",
    "que": "por traer un dato de la memoria {{DRAM|g-dram}} externa",
    "marca": "medido",
    "palabras": "frente a 0,4–3,7 pJ por operación en tecnología de 45 nm",
    "analogia": ""
   },
   "evidencia": "ev-6",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Un transistor de nanohojas en perspectiva. A izquierda y derecha, la **fuente** y el **drenador**; en medio, tres láminas de silicio (las **nanohojas**) rodeadas por la **puerta**, en ámbar. Cuando la puerta se enciende, los electrones (puntos luminosos) fluyen por las láminas; cuando se apaga, el flujo casi se detiene. El dibujo alterna los dos estados: es un interruptor.",
     "↑ Lección II.1 · El transistor, paso a paso"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "El fin de las mejoras gratuitas",
     "bloques": [
      "Durante décadas, al encoger el transistor también bajaban su voltaje y su corriente, de modo que cada chip nuevo era más rápido sin calentarse más: la {{escala de Dennard|g-dennard}}. Empezó a frenarse hacia 2007 y casi había desaparecido en 2012. Desde entonces, la miniaturización abarata la lógica mucho más que las conexiones largas, y mover un dato cuesta más energía que operar con él (Horowitz, 2014). Es la cara energética del {{cuello de botella de von Neumann|g-vonneumann}}.",
      {
       "ul": [
        "**N2** primer nodo de nanohojas de TSMC, en producción en volumen desde el cuarto trimestre de 2025 [declarado]",
        "**2027 · 2028** A16 se aplazó a 2027; A14 está previsto para 2028 [proyectado]"
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Hoja de ruta de la industria",
     "bloques": [
      "N2P llega en el segundo semestre de 2026; A16, con alimentación por la cara posterior, en 2027; A14, en 2028, con hasta un 15 % más de velocidad a igual potencia o un 30 % menos de consumo a igual velocidad respecto de N2; A13 y A12, en 2029, y N2U, en 2028 (TSMC, 2025, 2026; TrendForce, 2025, 2026). imec prolonga las nanohojas hasta el nodo A10 con la variante *forksheet* y sitúa el {{CFET|g-cfet}} a partir del nodo A7 (imec, 2026). Son objetivos industriales; su cumplimiento depende de la ingeniería y de la demanda."
     ]
    }
   ]
  },
  {
   "id": "lec-ii2",
   "tipo": "leccion",
   "codigo": "II.2",
   "nav": "II.2 · El chip acelerador",
   "titulo": "El chip acelerador: paralelismo, precisión y picos",
   "pregunta": "¿Por qué la cifra de un chip puede duplicarse sin que el chip cambie?",
   "min": 9,
   "dim": "cmp",
   "sencillo": [
    "Un procesador central (*CPU*, del inglés *central processing unit*) hace de todo, con pocos núcleos muy capaces. Un *acelerador* —por ejemplo, una *GPU* (*graphics processing unit*, unidad de procesamiento gráfico) dedicada a la inteligencia artificial— reúne miles de núcleos sencillos que hacen la misma operación sobre muchos datos a la vez: es *paralelismo*. Además apila memoria *HBM* (*high-bandwidth memory*, memoria de gran ancho de banda) en el mismo encapsulado, pegada al chip: acercar los datos ahorra la energía más cara (lección II.1).",
    "Su cifra estrella es el *pico teórico*: cuántas operaciones haría por segundo si todas sus unidades trabajaran sin pausa. Ese pico depende de la **precisión**: con números de 8 bits (*FP8*) caben muchas más operaciones que con números de 64 bits (*FP64*), los de la simulación científica (lección D2). Y puede contarse «con *dispersión*»: si la mitad de los números son ceros, el chip se salta esas operaciones y aun así las cuenta como hechas.",
    "La NVIDIA H100 declara 3.958 billones de operaciones por segundo (TFLOP/s) en FP8 con dispersión, que equivalen a 1.979 sin ella, con una potencia de diseño de hasta 700 W. En el pico denso, eso son unos 0,35 pJ por operación."
   ],
   "vida": [
    "Una cocina con cien pinches que solo saben pelar patatas pela patatas mucho más deprisa que un gran chef, aunque el chef sepa hacer de todo. Y si cuentas como «peladas» las patatas que ya venían peladas, tu récord se duplica sin que nadie trabaje más."
   ],
   "imagen": {
    "pie": "Miles de núcleos sencillos y la memoria HBM pegada al chip.",
    "si": "Que el acelerador gana repitiendo la misma operación en paralelo y acercando la memoria.",
    "no": "El dibujo no está a escala ni muestra el número real de núcleos. Y que quepan muchas operaciones no significa que una aplicación real las aproveche: el pico es un techo.",
    "svg": "lec-ii2"
   },
   "ejemplo": {
    "enunciado": "¿Cuánta energía gasta la H100 por operación en su pico?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Potencia de diseño: hasta 700 W. Pico FP8 sin dispersión: 1.979 TFLOP/s ≈ 2 × 10¹⁵ FLOP/s, la mitad de los 3.958 «con dispersión» que declara NVIDIA (marca: declarado)."
     ],
     [
      "**Qué significa cada número**",
      "700 W es lo máximo que el chip puede gastar; 2 × 10¹⁵, lo máximo que puede operar por segundo con números de 8 bits."
     ],
     [
      "**Qué unidades usa**",
      "W = julios por segundo; FLOP/s = operaciones por segundo."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir la potencia entre el ritmo: (J/s) ÷ (operaciones/s) = julios por operación."
     ],
     [
      "**El cálculo**",
      "700 ÷ (2 × 10¹⁵) = 3,5 × 10⁻¹³ J = 0,35 pJ"
     ],
     [
      "**El resultado**",
      "~0,35 pJ por operación, en el pico denso del chip."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es un mejor caso: chip aislado, sin memoria externa ni refrigeración, y con todas sus unidades ocupadas. Y es FP8: no se puede comparar sin más con una operación FP64."
     ]
    ]
   },
   "prediccion": {
    "q": "Si una aplicación aprovecha la cuarta parte del pico y el chip gasta lo mismo, ¿qué pasa con la energía por operación útil?",
    "opciones": [
     "Se queda igual",
     "Se multiplica por cuatro",
     "Se divide entre cuatro"
    ],
    "ok": 1,
    "porque": "Se multiplica por cuatro: la misma energía se reparte entre cuatro veces menos operaciones."
   },
   "actividad": "sparsity",
   "descubrir": [
    "Una misma máquina puede presentarse con cifras muy distintas según la precisión, la dispersión y el uso real. Antes de comparar dos picos, pregunta: ¿qué precisión?, ¿con o sin dispersión?, ¿pico teórico o medido en una aplicación?"
   ],
   "error": {
    "mal": "«Un exaflop es un exaflop: si dos máquinas declaran lo mismo, valen lo mismo.»",
    "bien": "Un exaflop en FP8 no equivale a uno en FP64, y un pico «con dispersión» cuenta operaciones que no se hacen. Sin precisión y método, dos cifras iguales no son comparables (trampa 5)."
   },
   "quiz": {
    "q": "La H100 declara 3.958 TFLOP/s en FP8 «con dispersión». ¿Qué significa ese añadido?",
    "opciones": [
     {
      "t": "Que el chip está más disperso por dentro y por eso es más rápido",
      "fb": "La dispersión se refiere a los datos, no a la forma del chip."
     },
     {
      "t": "Que cuenta como hechas operaciones con ceros que el hardware se salta",
      "fb": "Exacto: por eso la cifra con dispersión es el doble de la densa (1.979 TFLOP/s).",
      "ok": true
     },
     {
      "t": "Que es una cifra medida en una aplicación real",
      "fb": "Es un pico teórico declarado por el fabricante."
     }
    ]
   },
   "clave": {
    "sencillo": "El pico de un chip depende de la precisión y de cómo se cuente: no es el rendimiento real.",
    "cientifico": "los picos teóricos escalan inversamente con el número de bits del formato (FP8 frente a FP64) y la cifra «con dispersión» duplica la densa al contar operaciones omitidas; el rendimiento sostenido depende de la aplicación y de la memoria."
   },
   "profundiza": [],
   "fuente_enlaces": [
    {
     "texto": "Profundiza: de dónde salen los picos",
     "href": "#n-chip"
    },
    {
     "texto": "Trampa 5 · FP8 no es FP64",
     "href": "#t-5"
    }
   ]
  },
  {
   "id": "n-chip",
   "tipo": "nivel",
   "nav": "Nivel 6 · Chip acelerador",
   "titulo": "Chip acelerador",
   "n": 6,
   "mundo": "sil",
   "puente": "Miles de millones de transistores forman un chip, y los mejores se especializan.",
   "grupo": "Nivel 6 de 9 · Silicio",
   "lead": "Un acelerador de inteligencia artificial reúne miles de núcleos que trabajan en paralelo y apila la memoria junto al procesador. Su cifra de pico es enorme, pero depende de cuántos dígitos tenga cada número: no vale lo mismo una operación de 8 bits que una de 64.",
   "ancla": {
    "cifra": "~2 × 10¹⁵ FLOP/s",
    "que": "en {{FP8|g-fp}} sin {{dispersión|g-dispersion}}, pico de una NVIDIA H100",
    "marca": "declarado",
    "palabras": "dos mil billones por segundo; el doble si se cuenta la dispersión",
    "analogia": ""
   },
   "evidencia": "ev-7",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Un acelerador visto desde arriba. En el centro, el chip de cómputo dividido en núcleos (cuadros); a los lados, pilas de memoria **HBM** (rosa). Los puntos rosas son datos que viajan desde la memoria hasta un núcleo; cuando llegan, el núcleo se ilumina (verde azulado) y pasa resultados a sus vecinos. La idea clave: los datos tienen que viajar antes de poder operar con ellos.",
     "↑ Lección II.2 · El chip acelerador, paso a paso"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Precisión, memoria cercana y picos",
     "bloques": [
      "Un número en FP64 usa 64 bits y sirve para la simulación científica; uno en FP8 usa 8 y basta para buena parte de la inteligencia artificial. Cuantos menos bits, más operaciones por vatio. Por eso los aceleradores integran memoria {{HBM|g-hbm}} apilada en el mismo encapsulado: acercar los datos ahorra la energía más cara.",
      {
       "ul": [
        "**128 GB** de HBM3 compartida en la {{APU|g-apu}} MI300A de El Capitan [declarado]",
        "**22.000 millones** de transistores en NorthPole, de IBM, con toda la memoria de la red dentro del chip [medido]"
       ]
      },
      {
       "cautela": [
        "Para comparar con cautelaUn exaflop en FP8 no equivale a uno en FP64, y un pico «con dispersión» cuenta como hechas las operaciones con ceros que el hardware omite. Las cifras de pico describen el chip aislado, sin memoria externa ni refrigeración.Trampa 5 · FP8 no es FP64"
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "De dónde salen los picos",
     "bloques": [
      "La H100 SXM declara 3.958 TFLOP/s en FP8 con dispersión, equivalentes a 1.979 sin ella, y una potencia de diseño de hasta 700 W: ~0,35 pJ por operación en el pico denso del chip (NVIDIA, s. f.). NorthPole obtuvo en ResNet-50 una eficiencia 25 veces mayor, en cuadros por segundo por vatio, que una {{GPU|g-cpu}} de tecnología comparable, sin usar impulsos (Modha et al., 2023). El encapsulado avanzado y la producción de HBM figuran entre los principales cuellos de botella de la fabricación de aceleradores (Sevilla et al., 2024)."
     ]
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "hacia-fuera"
 ]
});
})();
