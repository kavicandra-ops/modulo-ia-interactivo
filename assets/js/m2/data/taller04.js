/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 4 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Lo técnico que estaba a la vista se ha trasladado, sin cambios, a los desplegables «Para profundizar». */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 4,
 "slug": "m2t4",
 "etapa": "acto1",
 "titulo": "Viaje al interior del cerebro",
 "emblema": "20 W",
 "pregunta": "¿Qué hay dentro de un cerebro que piensa con unos 20 vatios?",
 "intro": "Vas a hacer un viaje hacia dentro del cerebro, con cuatro paradas: la sinapsis, la neurona, un trocito de corteza y el encéfalo completo. En cada parada verás qué hace esa pieza, cuántas hay y cuánta energía gasta el conjunto. No necesitas saber biología: las palabras técnicas principales tienen su definición a un toque, y los detalles más técnicos esperan en desplegables, para cuando quieras profundizar.",
 "objetivos": [
  "Explicar qué es una neurona, qué es una sinapsis y cómo decide una neurona si dispara.",
  "Explicar por qué la sinapsis calcula, aprende y recuerda en el mismo sitio, y en qué se diferencia de una computadora.",
  "Distinguir la tasa media de disparo de una neurona (0,1–1 Hz en los modelos) de sus ráfagas de cientos de hercios.",
  "Reconocer que en un microcircuito muchas neuronas callan y pocas hablan, y que en un reparto así la media engaña.",
  "Calcular cuánta energía gasta tu cerebro, que funciona con unos 20 W, sin confundirla con los 10 bits por segundo de la decisión deliberada."
 ],
 "prerequisitos": [
  "Te ayudará repasar: [F2 · Potencias de diez: contar ceros](#m2t1-lec-f2) (Taller 1), [F4 · Mil millones no es un billón: escala larga y escala corta](#m2t1-lec-f4) (Taller 1), [F8 · Cantidad total y ritmo: el cubo y el grifo](#m2t2-lec-f8) (Taller 2) y [D3 · Energía: vatios, julios y kilovatios-hora](#m2t3-lec-d3) (Taller 3) y [D4 · Información: bits, bytes y bits por segundo](#m2t3-lec-d4) (Taller 3)."
 ],
 "secciones": [
  {
   "id": "cap-hacia-dentro",
   "tipo": "texto",
   "nav": "Introducción",
   "kicker": "Acto I · 1 · 10¹⁴ sinapsis",
   "titulo": "Hacia dentro: cuatro niveles",
   "bloques": [
    "**Acto I · La máquina de 20 vatios.** Empezamos por lo más pequeño y abrimos el zoom paso a paso: de una sola unión entre neuronas al encéfalo completo. En cada parada encontrarás una idea, una cifra ancla y una comparación cotidiana.",
    "Este taller es un viaje hacia dentro del cerebro en cuatro niveles: la {{sinapsis|g-sinapsis}}, la {{neurona|g-neurona}}, el microcircuito de la corteza y el encéfalo completo.",
    "Cinco lecciones te preparan: qué es una neurona y qué es una sinapsis (I.0), y una por cada nivel (I.1–I.4). Después de cada lección de nivel, una animación lo repasa con cifras.",
    "En cada animación también puedes usar los botones ‹ › de la figura, las flechas del teclado o deslizar el dedo sobre ella para ver los otros niveles del cerebro. Son los cuatro primeros de los nueve niveles del módulo; los cinco del silicio llegan en los talleres 6, 7 y 9."
   ],
   "widget": "m2.t4-mapa",
   "desplegables": [
    {
     "titulo": "La portada del acto I",
     "subtitulo": "la pregunta del acto y tres cifras que verás explicadas",
     "clase": "porque",
     "bloques": [
      "*¿Cómo cabe una mente en la energía de un cargador de teléfono?*",
      {
       "datos": [
        "**20 W** consume tu encéfalo en reposo [estimado]",
        "**20 %** de la energía de tu cuerpo, con el 2 % de su masa [estimado]",
        "**10 bits/s** salen como decisiones deliberadas [estimado]"
       ]
      },
      "No hace falta entender todavía estas tres cifras: se explican paso a paso en las lecciones [I.4](#m2t4-lec-i4) (los 20 W y el 20 %) y [I.9](#m2t5-lec-i9) (los 10 bits/s)."
     ]
    }
   ]
  },
  {
   "id": "lec-i0",
   "tipo": "leccion",
   "codigo": "I.0",
   "nav": "I.0 · Neuronas y sinapsis",
   "titulo": "Neuronas y sinapsis: las piezas del cerebro",
   "pregunta": "¿De qué está hecho, por dentro, un cerebro que piensa?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "El cerebro está hecho de células, como el resto del cuerpo. Las protagonistas de este recorrido son las *{{neuronas|g-neurona}}*: células especializadas en recibir, combinar y enviar señales. Tienen tres partes: las *dendritas*, ramas finas que reciben señales de otras neuronas; el *soma* o cuerpo celular, donde esas señales se combinan, y el *axón*, un cable largo que lleva la respuesta hasta otras neuronas, a veces muy lejos.",
    "Las neuronas no llegan a tocarse del todo. El punto donde el axón de una se acerca a la dendrita de otra se llama *{{sinapsis|g-sinapsis}}*. Allí la señal eléctrica se convierte en química: el extremo del axón suelta unas moléculas mensajeras, los *neurotransmisores*, que cruzan una hendidura diminuta y son captadas por los *receptores* de la otra neurona. Según la sinapsis, el mensaje empuja a la neurona receptora a activarse (sinapsis **excitadora**) o la frena (sinapsis **inhibidora**).",
    "Cada neurona suma lo que le llega. Si la suma supera un nivel llamado *umbral*, dispara un *impulso nervioso* —en lenguaje técnico, un *potencial de acción*, un pulso eléctrico muy breve— que recorre su axón. Si no lo supera, calla. El número de impulsos por segundo se mide en *{{hercios|g-hercio}}* (Hz): 1 Hz es un impulso por segundo.",
    "Al conjunto completo dentro del cráneo se le llama *encéfalo*: incluye el cerebro propiamente dicho, el *cerebelo* y el tronco encefálico. En el habla cotidiana, y a menudo en este recorrido, «cerebro» se usa como sinónimo."
   ],
   "vida": [
    "Piensa en un grupo de mensajería con cientos de participantes. Cada persona (una neurona) recibe mensajes de muchas otras, casi todos los lee y no contesta. Solo cuando varios mensajes importantes coinciden en poco tiempo, escribe ella —un mensaje breve, siempre igual— que llega a todos sus contactos. Algunos contactos la animan a hablar (excitación); otros le piden que calle (inhibición)."
   ],
   "imagen": {
    "pie": "Una neurona: recibe por las dendritas, combina en el soma y envía por el axón. En cada contacto con otra neurona hay una sinapsis.",
    "si": "El sentido de la señal (de las dendritas al axón) y la idea de sumar entradas hasta un umbral.",
    "no": "Las neuronas reales tienen formas muy variadas y miles de contactos; el umbral no es un número fijo, y la «suma» no es una suma simple: las dendritas también calculan (lo verás en la [lección I.2](#m2t4-lec-i2)).",
    "svg": "lec-i0"
   },
   "ejemplo": {
    "enunciado": "Si una neurona dispara 1 vez por segundo, ¿cuántos impulsos emite en un día?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Frecuencia: 1 Hz, el techo del intervalo que usan los modelos para la media (estimado). Tiempo: un día."
     ],
     [
      "**Qué significa cada número**",
      "1 Hz significa un impulso por segundo."
     ],
     [
      "**Qué unidades usa**",
      "Hz = impulsos por segundo; un día = 24 × 60 × 60 = 86.400 s."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Total = ritmo × tiempo ([lección F8](#m2t2-lec-f8))."
     ],
     [
      "**El cálculo**",
      "1 impulso/s × 86.400 s = 86.400 impulsos"
     ],
     [
      "**El resultado**",
      "86.400 impulsos al día."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "A 1 Hz, una neurona dispara unas 86.400 veces al día. A 0,16 Hz —la media que permite el presupuesto energético de la corteza (Lennie, 2003)— serían unas 14.000."
     ]
    ]
   },
   "prediccion": {
    "q": "Una neurona recibe a la vez cuatro señales excitadoras y tres inhibidoras. ¿Disparará?",
    "opciones": [
     "Sí, en cuanto recibe algo",
     "Depende de si el balance supera el umbral",
     "Nunca, si hay alguna inhibidora"
    ],
    "ok": 1,
    "porque": "La neurona no obedece a una señal suelta: suma las excitadoras, resta las inhibidoras y dispara solo si el total supera el umbral."
   },
   "actividad": "neuron",
   "descubrir": [
    "Una neurona decide por balance: muchas entradas excitadoras a la vez la llevan al umbral; las inhibidoras la alejan. El impulso es de todo o nada: no hay «medio impulso». La información está en **cuándo** y **con qué frecuencia** dispara, y en **qué sinapsis** transmiten con más fuerza. La actividad usa unidades arbitrarias: es un esquema, no una medición."
   ],
   "error": {
    "mal": "Pensar que cada neurona es un interruptor que se enciende con una sola señal, como un bombillo.",
    "bien": "Una neurona integra miles de entradas, excitadoras e inhibidoras, y dispara solo cuando el balance supera el umbral. Además, sus dendritas hacen cálculos propios."
   },
   "quiz": {
    "q": "¿Qué es una sinapsis?",
    "opciones": [
     {
      "t": "Una neurona especialmente grande",
      "fb": "La sinapsis no es una célula, sino un punto de contacto entre dos."
     },
     {
      "t": "El punto de contacto donde una neurona transmite su señal a otra",
      "fb": "Exacto: en la sinapsis, la señal eléctrica se convierte en química (neurotransmisores) y vuelve a influir eléctricamente en la neurona receptora.",
      "ok": true
     },
     {
      "t": "El cable largo por el que sale el impulso",
      "fb": "Ese cable es el axón. La sinapsis está en su extremo, donde contacta con otra neurona."
     }
    ]
   },
   "clave": {
    "sencillo": "Las neuronas suman las señales que reciben por sus sinapsis y, si superan un umbral, disparan un impulso.",
    "cientifico": "las neuronas integran potenciales postsinápticos excitadores e inhibidores; cuando el potencial de membrana alcanza el umbral, generan un potencial de acción de todo o nada que se propaga por el axón; la frecuencia de disparo se mide en hercios."
   },
   "profundizaSub": "dónde seguir",
   "profundiza": [
    "**Para seguir:**",
    {
     "ul": [
      "[Nivel 1: la sinapsis](#m2t4-n-sinapsis)",
      "[Glosario: sinapsis](#m2glosario-g-sinapsis)"
     ]
    }
   ]
  },
  {
   "id": "lec-i1",
   "tipo": "leccion",
   "codigo": "I.1",
   "nav": "I.1 · La sinapsis",
   "titulo": "La sinapsis: memoria y cálculo en el mismo sitio",
   "pregunta": "¿Dónde guarda tu cerebro un recuerdo?",
   "min": 7,
   "dim": "cnt",
   "sencillo": [
    "Una sinapsis no es un simple cable: puede transmitir con más o menos fuerza. Esa fuerza se llama *eficacia sináptica*. Además, cambia con el uso: la actividad puede reforzarla de forma duradera (*potenciación*) o debilitarla (*depresión*, que aquí no tiene nada que ver con el estado de ánimo). Juntos se conocen como {{LTP y LTD|g-ltp}}.",
    "Esos cambios duraderos son una base del aprendizaje y la memoria (Kennedy, 2016). Lo notable es que el mismo elemento **transforma** la señal (calcula), **cambia** con la experiencia (aprende) y **conserva** ese cambio (recuerda). En una computadora, la memoria y el procesador son piezas separadas, y los datos viajan sin cesar entre ellas. Esa diferencia será clave en el [Acto II](#m2t6).",
    "¿Cuántas sinapsis hay? Se estiman entre 10¹⁴ y 10¹⁵ en el encéfalo: entre cien billones y mil billones. Nadie las cuenta una a una: se calculan a partir de muestras diminutas de tejido."
   ],
   "vida": [
    "Un sendero en un césped se forma porque la gente pasa una y otra vez por el mismo sitio: cuanto más se usa, más marcado está y más fácil es seguirlo. Si nadie pasa, la hierba vuelve a crecer. Una sinapsis guarda la «huella» de su uso de forma parecida: la conexión que se usa se refuerza; la que no, se debilita."
   ],
   "imagen": {
    "pie": "El camino más usado se marca más: así se refuerza una sinapsis.",
    "si": "Que el uso repetido refuerza una conexión, que la falta de uso la debilita y que la «huella» queda en la propia conexión.",
    "no": "Las sinapsis no se refuerzan solo por repetición: el momento exacto de la actividad, otras sustancias y muchos mecanismos moleculares importan. Y un recuerdo no está en una sola sinapsis, sino repartido en redes.",
    "svg": "lec-i1"
   },
   "ejemplo": {
    "enunciado": "¿Qué significa «10¹⁴–10¹⁵ sinapsis» y cuántas corresponden, de media, a cada neurona?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "De 10¹⁴ a 10¹⁵ sinapsis en el encéfalo (estimado; revisión de Carlsmith, 2020). Referencia de cálculo del recorrido: ~2 × 10¹⁴. Neuronas: ~8,6 × 10¹⁰."
     ],
     [
      "**Qué significa cada número**",
      "El intervalo es amplio porque el cerebelo y las estructuras profundas están peor cuantificados que la neocorteza."
     ],
     [
      "**Qué unidades usa**",
      "Sinapsis y neuronas; su cociente da sinapsis por neurona."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Pasar a palabras (escala larga) y dividir para obtener un promedio."
     ],
     [
      "**El cálculo**",
      "10¹⁴ = cien billones · 10¹⁵ = mil billones · 2 × 10¹⁴ ÷ 8,6 × 10¹⁰ ≈ 2.300"
     ],
     [
      "**El resultado**",
      "Entre cien y mil billones de sinapsis; un promedio aritmético de unas 2.300 por neurona."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Ese promedio no describe a ninguna neurona real: las hay con unas 4 entradas y con unas 175.000 (lo verás en [«Tres preguntas al encéfalo»](#m2t5-cap-encefalo))."
     ]
    ]
   },
   "prediccion": {
    "q": "Si usas mucho la conexión A y nada la B, ¿qué pasará con la misma señal enviada por las dos?",
    "opciones": [
     "Saldrá igual por las dos",
     "A la transmitirá más fuerte y B más débil",
     "B la transmitirá más fuerte"
    ],
    "ok": 1,
    "porque": "El uso repetido refuerza la eficacia de A (potenciación); la falta de uso debilita a B (depresión). La misma señal de entrada produce respuestas distintas."
   },
   "actividad": "ltp",
   "descubrir": [
    "La misma señal de entrada produce efectos distintos según la historia de cada conexión: la memoria está en la fuerza de la sinapsis, en el mismo lugar donde se transforma la señal. La simulación usa números arbitrarios, pero el principio es el que describe la neurociencia."
   ],
   "error": {
    "mal": "«El cerebro guarda los recuerdos como un disco duro: en un almacén separado de donde piensa.»",
    "bien": "En el cerebro, guardar y calcular ocurren en las mismas piezas: las sinapsis. Es una diferencia de arquitectura con las computadoras convencionales, que separan memoria y procesador."
   },
   "quiz": {
    "q": "¿Por qué se dice que la sinapsis «computa, aprende y recuerda»?",
    "opciones": [
     {
      "t": "Porque cada sinapsis es una pequeña computadora con su procesador y su memoria separados",
      "fb": "Justo al revés: lo característico es que no hay separación; el mismo elemento hace las tres cosas."
     },
     {
      "t": "Porque transforma la señal, cambia su fuerza con la actividad y conserva ese cambio",
      "fb": "Exacto: transformar es computar; cambiar con la experiencia es aprender; conservar el cambio es recordar.",
      "ok": true
     },
     {
      "t": "Porque cada sinapsis guarda un recuerdo completo",
      "fb": "Los recuerdos no están en una sinapsis aislada: se reparten en redes de muchas."
     }
    ]
   },
   "clave": {
    "sencillo": "En la sinapsis, el mismo lugar calcula, aprende y recuerda.",
    "cientifico": "la plasticidad sináptica (LTP y LTD) modifica la eficacia de transmisión según la actividad; el elemento que transforma la señal es el mismo que almacena la traza, a diferencia de la arquitectura de von Neumann."
   },
   "profundizaSub": "eficacia sináptica, LTP y LTD, y cómo se cuentan las sinapsis",
   "profundiza": [
    "**Qué es, exactamente, la fuerza de una sinapsis**",
    "Esa fuerza se llama *eficacia sináptica* y depende de cuánto neurotransmisor libera la neurona emisora y del estado de los receptores que lo captan. Además, cambia con el uso: la actividad puede reforzarla de forma duradera —*potenciación a largo plazo*, LTP por sus siglas en inglés (*long-term potentiation*)— o debilitarla —*depresión a largo plazo*, LTD (*long-term depression*)—.",
    "**Cómo se cuentan las sinapsis**",
    "Nadie las cuenta una a una: se usa la *{{estereología|g-estereologia}}*, que mide al microscopio electrónico cuántas sinapsis hay en pequeños volúmenes de tejido (la densidad) y multiplica por el volumen total.",
    "**Para seguir:**",
    {
     "ul": [
      "[Profundiza: cómo se cuentan las sinapsis](#m2t4-n-sinapsis)"
     ]
    }
   ]
  },
  {
   "id": "n-sinapsis",
   "tipo": "nivel",
   "nav": "Nivel 1 · Sinapsis",
   "titulo": "Sinapsis",
   "n": 1,
   "mundo": "bio",
   "puente": "Todo empieza en un punto de contacto entre dos células.",
   "grupo": "Nivel 1 de 9 · Cerebro",
   "lead": "Una {{sinapsis|g-sinapsis}} es la unión entre dos neuronas. Guarda un rastro de lo vivido en la fuerza con que transmite la señal, y transforma esa señal en el mismo lugar donde la guarda. En una computadora, en cambio, la memoria y el procesador son piezas separadas.",
   "ancla": {
    "cifra": "10¹⁴–10¹⁵",
    "que": "sinapsis en el encéfalo",
    "marca": "estimado",
    "palabras": "entre cien billones y mil billones",
    "analogia": "entre cientos y miles de veces las estrellas de la Vía Láctea"
   },
   "evidencia": "ev-1",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Arriba, el **botón presináptico** (el extremo de un axón) con **vesículas** —círculos— llenas de neurotransmisor y una **mitocondria**, la central energética de la célula. Cada pocos segundos, una vesícula baja, se funde con la membrana y suelta neurotransmisor (puntos luminosos) que cruza la **hendidura sináptica** y activa los **receptores** (pequeños rectángulos) de la **espina dendrítica**, abajo. El destello que baja por el cuello es la señal que llega a la dendrita. Con el uso, la espina crece un poco: una representación de la potenciación.",
     "[↑ Lección I.1 · La sinapsis, paso a paso](#m2t4-lec-i1)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Memoria y cálculo en la misma pieza",
     "bloques": [
      "Cada sinapsis guarda información en su eficacia, que depende de cuánto neurotransmisor libera y del estado de los receptores que lo reciben. La actividad la refuerza o la debilita ({{potenciación y depresión a largo plazo|g-ltp}}), de modo que el mismo elemento computa, aprende y recuerda (Kennedy, 2016).",
      {
       "ul": [
        "**1,64 × 10¹⁴** sinapsis en la neocorteza [estimado]",
        "**hasta 50** sinapsis en una sola entrada axónica muy potente [medido]"
       ]
      },
      "Contar sinapsis dice poco de su variedad: en un milímetro cúbico de corteza humana conviven miles de contactos débiles por neurona con unas pocas entradas muy fuertes (Shapson-Coe et al., 2024)."
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Cómo se cuentan",
     "bloques": [
      "Las sinapsis no se cuentan una a una: se estiman por {{estereología|g-estereologia}}, multiplicando la densidad medida al microscopio electrónico por el volumen. Tang et al. (2001) obtuvieron 1,64 × 10¹⁴ en la neocorteza de cinco varones jóvenes, con un coeficiente de variación de 0,17. Pakkenberg et al. (2003), del mismo grupo, resumieron el orden en 0,15 × 10¹⁵, así que no es una estimación independiente.",
      "Para el encéfalo completo las revisiones usan un intervalo de 10¹⁴ a 10¹⁵ (Carlsmith, 2020); la contribución del cerebelo y de las estructuras subcorticales está peor cuantificada. Este recorrido toma ~2 × 10¹⁴ como referencia de cálculo."
     ]
    }
   ],
   "widget": "m2.nv-sinapsis"
  },
  {
   "id": "lec-i2",
   "tipo": "leccion",
   "codigo": "I.2",
   "nav": "I.2 · La neurona",
   "titulo": "La neurona: sumar, decidir y disparar despacio",
   "pregunta": "Si una neurona puede disparar cientos de veces por segundo, ¿por qué casi nunca lo hace?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "Una neurona suma lo que recibe y dispara si supera el umbral. Dos cifras describen su ritmo. La *{{tasa media|g-tasa}}* de disparo es cuántos impulsos emite por segundo, en promedio, a lo largo del tiempo: los modelos que usa este recorrido suponen entre 0,1 y 1 Hz, entre un impulso cada diez segundos y uno por segundo. La *frecuencia máxima* es cuánto puede acelerar en una ráfaga breve: algunas neuronas inhibidoras locales, las *{{interneuronas de disparo rápido|g-interneurona}}*, encadenan cientos de impulsos por segundo cuando se las estimula con fuerza en el laboratorio.",
    "¿Por qué la media es tan baja? Porque disparar cuesta energía. El presupuesto energético de la corteza acota su media en unas 0,16 descargas por segundo (Lennie, 2003): una media de 100 Hz sería incompatible con los 20 W del encéfalo.",
    "Y la neurona calcula más de lo que parece. Sus ramas, las dendritas, hacen pequeños cálculos propios: no se limitan a sumar (Gidon et al., 2020). Si quieres ver qué cálculo, ábrelo en «Para profundizar», al final de la lección."
   ],
   "vida": [
    "Un velocista puede esprintar, pero no esprinta todo el día. Igual que tu velocidad media en un día es muy inferior a tu sprint, la tasa media de una neurona es muy inferior a sus ráfagas."
   ],
   "imagen": {
    "pie": "Arriba, la rutina de una neurona típica; abajo, una ráfaga breve de una interneurona rápida estimulada.",
    "si": "La diferencia entre una media baja y unos máximos altos que solo duran ráfagas.",
    "no": "Las neuronas reales no disparan con un ritmo regular: sus impulsos llegan de forma irregular y su tasa cambia con la tarea.",
    "svg": "lec-i2"
   },
   "ejemplo": {
    "enunciado": "¿Cuántas veces más rápido que la media sostenible es el máximo medido?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Media cortical sostenible: ≈ 0,16 Hz (estimado; Lennie, 2003). Máximo instantáneo medio de interneuronas rápidas humanas: 453 Hz (medido ex vivo, n = 92; Wang et al., 2016)."
     ],
     [
      "**Qué significa cada número**",
      "«n = 92» es el número de células medidas; «ex vivo», en rebanadas de tejido fuera del cuerpo, con estimulación intensa."
     ],
     [
      "**Qué unidades usa**",
      "Hercios en los dos casos; el cociente no tiene unidad: son «veces»."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir, y tomar el logaritmo para expresarlo en órdenes de magnitud."
     ],
     [
      "**El cálculo**",
      "453 ÷ 0,16 ≈ 2.800 · log₁₀(2.800) ≈ 3,4"
     ],
     [
      "**El resultado**",
      "Unas 2.800 veces: tres órdenes y medio de magnitud."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "El sprint de una interneurona en el laboratorio es casi tres mil veces más rápido que la media sostenible de la corteza. Un caso extremo no describe la media ([trampa 7](#m2t10-trampa-7))."
     ]
    ]
   },
   "prediccion": {
    "q": "A 0,16 Hz, ¿cuántos impulsos emite una neurona en un minuto?",
    "opciones": [
     "Unos 10",
     "Unos 160",
     "Unos 0,16"
    ],
    "ok": 0,
    "porque": "0,16 impulsos por segundo × 60 segundos ≈ 9,6: unos 10 impulsos por minuto, uno cada seis segundos."
   },
   "actividad": "hz",
   "descubrir": [
    "Entre la media y el máximo hay miles de veces. Las cifras altas (453 Hz, 856 Hz) son reales, pero describen ráfagas breves de células especiales en condiciones de laboratorio. Para estimar el trabajo del cerebro hay que usar la media, no el máximo."
   ],
   "error": {
    "mal": "Usar el máximo como si fuera la media: «las neuronas disparan a 100 Hz, así que el cerebro hace muchísimas más operaciones».",
    "bien": "Una media de 100 Hz sería incompatible con el presupuesto energético. Los modelos usan 0,1–1 Hz de media; los cientos de hercios son ráfagas de interneuronas estimuladas en el laboratorio, en rebanadas de tejido (*ex vivo*)."
   },
   "quiz": {
    "q": "«Una interneurona humana llegó a 856 Hz.» ¿Qué se puede concluir?",
    "opciones": [
     {
      "t": "Que las neuronas humanas disparan a unos 856 Hz",
      "fb": "Es el récord de una sola célula, medido en rebanadas de tejido con estimulación intensa. No describe a las interneuronas en general, ni mucho menos a todas las neuronas."
     },
     {
      "t": "Que algunas células alcanzan ráfagas muy rápidas en condiciones de laboratorio",
      "fb": "Es un máximo individual, medido ex vivo: en rebanadas de tejido, fuera del cuerpo. Para la media, el presupuesto energético apunta a unas 0,16 descargas por segundo.",
      "ok": true
     },
     {
      "t": "Que el cerebro gasta más energía de la que se estima",
      "fb": "Un máximo breve de una célula no cambia el presupuesto energético medio del encéfalo."
     }
    ]
   },
   "clave": {
    "sencillo": "Las neuronas disparan despacio de media y deprisa solo en ráfagas.",
    "cientifico": "la tasa media cortical está acotada metabólicamente (~0,16 Hz; Lennie, 2003); las frecuencias de cientos de hercios corresponden a máximos instantáneos de interneuronas de disparo rápido medidos ex vivo (Wang et al., 2016)."
   },
   "profundizaSub": "el cálculo de las dendritas, imitar una neurona y el debate de las frecuencias",
   "profundiza": [
    "**Cuánto calcula una sola neurona**",
    "Sus dendritas no se limitan a sumar: en neuronas humanas se han observado impulsos dendríticos capaces de resolver la función lógica *XOR* («o exclusivo»: responder si llega una entrada *o* la otra, pero no las dos), algo que una neurona artificial simple, el *perceptrón*, no puede calcular (Gidon et al., 2020).",
    "La luz de una escalera con dos interruptores, uno abajo y otro arriba, funciona como un XOR: si cambias uno solo, la luz cambia; si cambias los dos, vuelve a como estaba. Una neurona humana puede hacer un cálculo de ese tipo en una sola de sus ramas.",
    "Imitar con precisión una sola neurona cortical exige una red artificial profunda de cinco a ocho capas (Beniaguev et al., 2021).",
    "**Para seguir:**",
    {
     "ul": [
      "[Profundiza: el debate del recuento y las frecuencias](#m2t4-n-neurona)",
      "[Trampa 7 · Un caso no es una media](#m2t10-trampa-7)"
     ]
    }
   ]
  },
  {
   "id": "n-neurona",
   "tipo": "nivel",
   "nav": "Nivel 2 · Neurona",
   "titulo": "Neurona",
   "n": 2,
   "mundo": "bio",
   "puente": "Una sinapsis sola no piensa. Hace falta integrar miles: entra la neurona.",
   "grupo": "Nivel 2 de 9 · Cerebro",
   "lead": "La {{neurona|g-neurona}} suma las señales de miles de sinapsis y, si superan un umbral, responde con un impulso eléctrico breve. Lo hace con calma: de media, un impulso cada pocos segundos. Las más rápidas encadenan cientos por segundo, pero solo en ráfagas.",
   "ancla": {
    "cifra": "~86.000 millones",
    "que": "de neuronas en el encéfalo",
    "marca": "estimado",
    "palabras": "los datos publicados admiten promedios de 61.000 a 99.000 millones",
    "analogia": "unas diez neuronas por cada habitante del planeta"
   },
   "evidencia": "ev-2",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Una **neurona piramidal**: el triángulo es el soma; las líneas ramificadas, las dendritas (la más larga, hacia arriba, es la dendrita apical, con pequeñas espinas); la línea que baja es el axón. Los puntos luminosos que recorren las dendritas son entradas: cuando se acumulan suficientes, el soma se ilumina y un impulso recorre el axón. Abajo a la derecha, un registro compara una neurona típica (pocos impulsos, ~0,1–1 Hz) con una interneurona rápida estimulada (ráfagas a ~450 Hz).",
     "[↑ Lección I.2 · La neurona, paso a paso](#m2t4-lec-i2)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Una neurona calcula más de lo que parece",
     "bloques": [
      "Las dendritas, las ramas que reciben las señales, hacen más que sumar. En neuronas humanas se han observado impulsos dendríticos capaces de resolver la función lógica XOR, que un perceptrón simple no puede calcular (Gidon et al., 2020). Imitar con precisión una sola neurona cortical exige una red artificial profunda de cinco a ocho capas (Beniaguev et al., 2021).",
      {
       "ul": [
        "**0,1–1 Hz** {{tasa media|g-tasa}} que adoptan los modelos [estimado]",
        "**453 Hz** máximo instantáneo medio de las {{interneuronas|g-interneurona}} más rápidas, en tejido ex vivo [medido]"
       ]
      },
      {
       "cautela": [
        "Para comparar con cautela",
        "Un máximo no es una media. Los 453 Hz se midieron en rebanadas de tejido con estimulación intensa; una media de 100 Hz sería incompatible con el presupuesto energético del cerebro.",
        "[Trampa 7 · Un caso no es una media](#m2t10-trampa-7)"
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "El debate del recuento",
     "bloques": [
      "Los 86.100 ± 8.100 millones proceden de cuatro encéfalos de varones contados con el {{fraccionador isotrópico|g-fraccionador}} (Azevedo et al., 2009). Con muestras tan pequeñas, los datos admiten promedios de 73.000 a 99.000 millones en varones y de 61.000 a 73.000 millones en mujeres (Goriely, 2025a, 2025b). Lent (2025), coautor del recuento, lo defendió como referencia razonable, y la estereología apoya 70.000–85.000 millones (von Bartheld, 2025).",
      "El presupuesto metabólico acota la media cortical en unas 0,16 descargas por segundo (Lennie, 2003). En rebanadas de corteza humana, las interneuronas de disparo rápido promedian 338 Hz de frecuencia media máxima y 453 Hz de instantánea máxima (n = 92); en el macaco, 450 y 611 Hz (n = 23). Una sola célula humana llegó a 856 Hz (Wang et al., 2016)."
     ]
    }
   ],
   "widget": "m2.nv-neurona"
  },
  {
   "id": "lec-i3",
   "tipo": "leccion",
   "codigo": "I.3",
   "nav": "I.3 · El microcircuito",
   "titulo": "El microcircuito: muchos callan, pocos hablan",
   "pregunta": "En un trocito de corteza del tamaño de un grano de arena, ¿cuántas neuronas están activas a la vez?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "La *corteza cerebral* es la capa externa, plegada, del cerebro. Se organiza en capas (de la L1, la más externa, a la L6) y en circuitos locales muy densos: en un milímetro cúbico —un grano de arena gruesa— caben unas 57.000 células y 150 millones de sinapsis (Shapson-Coe et al., 2024).",
    "En cada instante, solo una minoría dispara con fuerza; la mayoría casi calla. Las {{tasas de disparo|g-tasa}} se reparten de forma muy desigual: muchas células casi silenciosas y unas pocas muy activas (Buzsáki y Mizuseki, 2014). Esa actividad dispersa es una de las claves del ahorro energético.",
    "Para describir un reparto así no basta la media. También se usa la *mediana*, la neurona típica: si ordenas las neuronas de la menos activa a la más activa, es la que queda justo en el medio.",
    "Para entender un circuito habría que conocer todas sus conexiones: su *{{conectoma|g-conectoma}}*. Solo existen conectomas completos de sistemas mucho menores, como un gusano y la mosca de la fruta. En mamíferos, el mayor volumen reconstruido es ~1 mm³ de corteza de ratón. Aún no hay un conectoma completo de ningún mamífero."
   ],
   "vida": [
    "En una plataforma de música, unas pocas canciones acumulan millones de reproducciones y la inmensa mayoría, muy pocas. La media sale un número que no se parece ni a los éxitos ni a la mayoría. Con las neuronas pasa algo parecido: la «neurona media» no es la neurona típica."
   ],
   "imagen": {
    "pie": "En un microcircuito, la mayoría de las células está casi en silencio y unas pocas dominan la actividad.",
    "si": "La forma desigual del reparto: muchas casi calladas, pocas muy activas.",
    "no": "Las células activas no son siempre las mismas: cambian con la tarea, y el silencio de una célula también transmite información.",
    "svg": "lec-i3"
   },
   "ejemplo": {
    "enunciado": "¿Cuántos datos haría falta para fotografiar todo un encéfalo con el detalle del milímetro cúbico?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "1,4 PB para ~1 mm³ de corteza humana (medido; Shapson-Coe et al., 2024). Volumen del encéfalo: ~1,2 × 10⁶ mm³."
     ],
     [
      "**Qué significa cada número**",
      "1,4 PB son las imágenes en bruto que se tomaron de esa muestra. La pregunta es qué pasaría si se fotografiara así todo el encéfalo."
     ],
     [
      "**Qué unidades usa**",
      "bytes por mm³ × mm³ = bytes."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Multiplicar: una extrapolación ingenua que supone que todo el encéfalo se parece a esa muestra."
     ],
     [
      "**El cálculo**",
      "1,4 × 10¹⁵ × 1,2 × 10⁶ = 1,68 × 10²¹ ≈ 1,7 × 10²¹ bytes = 1,7 zettabytes"
     ],
     [
      "**El resultado**",
      "~1,7 ZB de almacenamiento bruto (zetta = 10²¹) [extrapolado]."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Es un orden de magnitud solo ilustrativo (cálculo B.4 del libro de origen): nada garantiza que la densidad de datos, el formato o la segmentación se mantengan en todo el encéfalo."
     ]
    ]
   },
   "prediccion": {
    "q": "En una población con tasas muy desiguales («log-normales»), ¿coincide la media con la tasa de la neurona típica (la mediana)?",
    "opciones": [
     "Sí, siempre",
     "No: la media queda por encima, arrastrada por las pocas muy activas",
     "No: la media queda por debajo"
    ],
    "ok": 1,
    "porque": "Unas pocas neuronas muy activas tiran de la media hacia arriba; la mayoría dispara por debajo de ella. Cuanto más desigual el reparto, más se separan la media y la mediana."
   },
   "actividad": "skew",
   "descubrir": [
    "Con un reparto desigual, la media engaña: queda por encima de lo que hace la mayoría, y una pequeña fracción de células produce buena parte de los impulsos. La simulación usa números ilustrativos; la forma del reparto es la que describen Buzsáki y Mizuseki (2014)."
   ],
   "error": {
    "mal": "Imaginar que todas las neuronas de un circuito trabajan a la vez y por igual.",
    "bien": "La actividad es dispersa y desigual: muchas callan y pocas dominan. Por eso la tasa media es baja y el gasto energético, contenido."
   },
   "quiz": {
    "q": "¿Qué es un conectoma?",
    "opciones": [
     {
      "t": "Una imagen de un trozo de cerebro",
      "fb": "Las imágenes son la materia prima; el conectoma es el mapa completo que se reconstruye a partir de ellas."
     },
     {
      "t": "El mapa completo de las neuronas de un sistema nervioso y de sus conexiones",
      "fb": "Exacto. Existe para el gusano C. elegans y para la mosca, pero no para ningún mamífero: el mayor volumen de mamífero reconstruido es ~1 mm³ de corteza de ratón.",
      "ok": true
     },
     {
      "t": "El número total de sinapsis de un cerebro",
      "fb": "Un recuento no es un mapa: el conectoma dice qué neurona conecta con cuál."
     }
    ]
   },
   "clave": {
    "sencillo": "En cada instante, muchas neuronas callan y pocas hablan: la actividad del cerebro es dispersa.",
    "cientifico": "las tasas de disparo corticales siguen distribuciones muy asimétricas, aproximadamente log-normales; solo existen conectomas completos de invertebrados, y en mamíferos el mayor volumen reconstruido es ~1 mm³."
   },
   "profundizaSub": "la forma exacta del reparto y los conectomas que existen",
   "profundiza": [
    "**La forma exacta del reparto: log-normal**",
    "Las tasas de disparo siguen una *distribución log-normal*: en una {{escala logarítmica|g-log}} forman una campana, lo que en una escala normal (lineal) significa muchas células casi silenciosas y unas pocas muy activas (Buzsáki y Mizuseki, 2014).",
    "**Los conectomas completos que existen**",
    "Solo existen conectomas completos de sistemas mucho menores: el gusano *C. elegans*, con 302 neuronas, y la mosca de la fruta, con 139.255 en su encéfalo adulto y unas 160.000–166.700 en su sistema nervioso central completo.",
    "**Para seguir:**",
    {
     "ul": [
      "[Profundiza: el zettabyte ingenuo](#m2t4-n-microcircuito)"
     ]
    }
   ]
  },
  {
   "id": "n-microcircuito",
   "tipo": "nivel",
   "nav": "Nivel 3 · Microcircuito cortical",
   "titulo": "Microcircuito cortical",
   "n": 3,
   "mundo": "bio",
   "puente": "Las neuronas no trabajan solas: forman circuitos muy densos.",
   "grupo": "Nivel 3 de 9 · Cerebro",
   "lead": "En un milímetro cúbico de corteza, el tamaño de un grano de arena gruesa, caben unas 57.000 células y 150 millones de sinapsis. En cada instante, solo una minoría dispara con fuerza; la mayoría casi calla.",
   "ancla": {
    "cifra": "1,4 PB",
    "que": "de imágenes para reconstruir ese milímetro cúbico",
    "marca": "medido",
    "palabras": "1,4 petabytes: un millón cuatrocientos mil gigabytes",
    "analogia": "11.000 teléfonos de 128 GB, llenos"
   },
   "evidencia": "ev-3",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Un bloque de corteza dividido en capas, de L1 a L6 (las franjas). Triángulos: neuronas piramidales; círculos pequeños: interneuronas; círculos medianos: células estrelladas de la capa L4. Los destellos son impulsos, y los puntos que viajan, señales entre células. Unas pocas células brillan casi siempre y la mayoría casi nunca: el reparto desigual de las tasas de disparo.",
     "[↑ Lección I.3 · El microcircuito, paso a paso](#m2t4-lec-i3)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Pocas células activas y mapas incompletos",
     "bloques": [
      "Las tasas de disparo siguen distribuciones muy asimétricas, aproximadamente log-normales: pocas células muy activas y muchas casi silenciosas (Buzsáki y Mizuseki, 2014). La figura reproduce esa dispersión.",
      "Los mapas completos de conexiones, los {{conectomas|g-conectoma}}, solo existen para sistemas mucho menores: el gusano *C. elegans*, con 302 neuronas; el encéfalo adulto de la mosca, con 139.255 (2024), y, desde 2026, su sistema nervioso central completo, con unas 160.000 a 166.700. En mamíferos, el mayor volumen reconstruido es ~1 mm³ de corteza visual de ratón, con más de 200.000 células y ~5 × 10⁸ sinapsis (MICrONS Consortium, 2025). Aún no hay conectoma completo de ningún mamífero."
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "El zettabyte ingenuo",
     "bloques": [
      "La reconstrucción nanométrica de Shapson-Coe et al. (2024) produjo 1,4 petabytes. Extrapolada al volumen del encéfalo (~1,2 × 10⁶ mm³) daría ~1,7 zettabytes de almacenamiento bruto (cálculo B.4 del libro de origen), un orden de magnitud solo ilustrativo: nada garantiza que la densidad de datos, el formato o la segmentación se mantengan en todo el encéfalo.",
      "El encéfalo humano tiene unas 6 × 10⁵ veces más neuronas que el conectoma del encéfalo de la mosca y 5 × 10⁵ veces más que el de su sistema nervioso central (cálculo B.12 del libro de origen). Fuentes: White et al. (1986); Dorkenwald et al. (2024); Bates et al. (2026); Berg et al. (2026)."
     ]
    }
   ],
   "widget": "m2.nv-microcircuito"
  },
  {
   "id": "lec-i4",
   "tipo": "leccion",
   "codigo": "I.4",
   "nav": "I.4 · El encéfalo",
   "titulo": "El encéfalo: 20 vatios y 10 bits por segundo",
   "pregunta": "¿Cuánta energía gasta pensar, y cuánta información sale de tantas neuronas?",
   "min": 8,
   "dim": "nrg",
   "sencillo": [
    "El encéfalo pesa alrededor del 2 % del cuerpo y consume cerca del 20 % de su energía en reposo: unos 20 {{vatios|g-vatio}} (Raichle y Gusnard, 2002). Una técnica de imagen médica ({{PET|g-pet}}) da una cifra parecida: unos 17 W.",
    "¿En qué se gasta? Sobre todo en **comunicar**: mantener las neuronas listas para disparar, propagar los impulsos por los axones y transmitirlos en las sinapsis. Una auditoría energética de la corteza (Levy y Calvert, 2021) encontró que la comunicación se lleva la mayor parte de esa energía, y el cálculo, apenas una pequeña fracción. También en el cerebro, mover información cuesta más que calcular.",
    "Y una asimetría sorprendente: por los sentidos entran unos mil millones (10⁹) de {{bits|g-bit}} por segundo, pero la conducta deliberada —lo que decides y haces conscientemente— fluye a unos 10 bits por segundo (Zheng y Meister, 2025). Esa cifra describe la decisión deliberada, no todo lo que procesa el cerebro."
   ],
   "vida": [
    "Un día de tu cerebro equivale, en energía, a un cargador rápido de teléfono encendido 24 horas: 20 W × 24 h = 480 Wh. Es una cantidad modesta: menos de lo que gasta un hervidor potente en un cuarto de hora (2.600 W × 0,25 h = 650 Wh)."
   ],
   "imagen": {
    "pie": "Un órgano pequeño con una factura grande, dentro del cuerpo: el 2 % de la masa y el 20 % de la energía en reposo.",
    "si": "La desproporción entre lo que pesa el encéfalo y lo que consume.",
    "no": "Que el encéfalo gaste mucho para su tamaño no contradice que 20 W sean muy poco frente a una máquina: son dos comparaciones distintas (dentro del cuerpo y frente al silicio).",
    "svg": "lec-i4"
   },
   "ejemplo": {
    "enunciado": "¿Cuánta energía gasta tu cerebro en un día, y cuánto tarda la supercomputadora Frontier en gastar lo mismo?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Encéfalo: 20 W (estimado). Un día: 86.400 s. Frontier: 24,6 MW durante la {{prueba HPL|g-hpl}} (medido)."
     ],
     [
      "**Qué significa cada número**",
      "Frontier es una supercomputadora (las supercomputadoras se explican en el [nivel 8](#m2t7-n-super)). 24,6 MW son 24,6 millones de vatios. Queremos la energía diaria del cerebro y el tiempo que tardaría Frontier en consumirla."
     ],
     [
      "**Qué unidades usa**",
      "W × s = J (energía); J ÷ W = s (tiempo)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Energía = potencia × tiempo; tiempo = energía ÷ potencia."
     ],
     [
      "**El cálculo**",
      "20 × 86.400 = 1,728 × 10⁶ J (≈ 480 Wh) · 1,728 × 10⁶ ÷ 2,46 × 10⁷ ≈ 0,07 s"
     ],
     [
      "**El resultado**",
      "Unos 1,7 millones de julios al día; Frontier los consume en unas siete centésimas de segundo."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "La energía de todo un día de tu cerebro es la que Frontier gasta en menos de lo que dura un parpadeo. Pero esto compara facturas eléctricas, no eficiencias: falta dividir por el trabajo que hace cada uno ([Acto III](#m2t8-lec-iii1))."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Cuánta energía gasta tu cerebro en una hora?",
    "opciones": [
     "20 julios",
     "72.000 julios (20 Wh)",
     "20 kilovatios-hora"
    ],
    "ok": 1,
    "porque": "20 W × 3.600 s = 72.000 J = 20 Wh. Los vatios son un ritmo; multiplicados por el tiempo dan la energía."
   },
   "actividad": "brainday",
   "descubrir": [
    "La energía del cerebro es pequeña en términos absolutos y grande para su tamaño: sale de multiplicar una potencia modesta por el tiempo. Y de toda la información que procesa, solo una pequeñísima parte sale como decisión deliberada: comparar esos 10 bits/s con su cómputo sería mezclar reglas."
   ],
   "error": {
    "mal": "«El cerebro solo procesa 10 bits por segundo.»",
    "bien": "Los 10 bits/s miden lo que sale como conducta deliberada. Por los sentidos entran unos 10⁹ bits/s, y el control inconsciente del movimiento maneja mucho más (Sauerbrei y Pruszynski, 2025)."
   },
   "quiz": {
    "q": "El encéfalo consume unos 20 W. ¿Qué significa?",
    "opciones": [
     {
      "t": "Que consume 20 julios cada segundo",
      "fb": "Un vatio es un julio por segundo: 20 W son 20 J cada segundo, unos 1,7 millones de julios al día.",
      "ok": true
     },
     {
      "t": "Que consume 20 julios en total cada día",
      "fb": "20 W es un ritmo, no un total: en un día son 20 × 86.400 ≈ 1,7 millones de julios."
     },
     {
      "t": "Que hace 20 operaciones por segundo",
      "fb": "Los vatios miden energía por segundo, no operaciones."
     }
    ]
   },
   "clave": {
    "sencillo": "Tu cerebro gasta unos 20 W, sobre todo en comunicar, y de todo lo que procesa salen unos 10 bits por segundo como decisión.",
    "cientifico": "el consumo en reposo (~20 % del metabolismo corporal, ~20 W; ~17 W de glucosa por PET) se dedica mayoritariamente a la comunicación; el caudal conductual deliberado (~10 bits/s) es una magnitud de información, no de cómputo."
   },
   "profundizaSub": "la medición con PET, la auditoría energética y el debate de los 10 bits/s",
   "profundiza": [
    "**Cómo se mide la energía del encéfalo**",
    "Una técnica de imagen médica, la *tomografía por emisión de positrones* (PET, del inglés *positron emission tomography*), que sigue el consumo de glucosa —el azúcar que usan las neuronas como combustible—, mide unos 17 W.",
    "**En qué se gasta, con cifras**",
    "Según una auditoría energética de la corteza, de unos 4,9 W de energía química, la comunicación se lleva ~3,5 W y el cálculo en las neuronas receptoras apenas ~0,1 W (Levy y Calvert, 2021).",
    "**El debate de los 10 bits por segundo**",
    "Otros investigadores objetan que el control inconsciente del movimiento maneja mucha más información (Sauerbrei y Pruszynski, 2025): la cifra describe la decisión deliberada, no todo el procesamiento.",
    "**Para seguir:**",
    {
     "ul": [
      "[Profundiza: supuestos de las cifras](#m2t4-n-encefalo)"
     ]
    }
   ]
  },
  {
   "id": "n-encefalo",
   "tipo": "nivel",
   "nav": "Nivel 4 · Encéfalo completo",
   "titulo": "Encéfalo completo",
   "n": 4,
   "mundo": "bio",
   "puente": "Junta 86.000 millones de neuronas y aparece la máquina completa.",
   "grupo": "Nivel 4 de 9 · Cerebro",
   "lead": "El encéfalo pesa el 2 % de tu cuerpo y consume el 20 % de tu energía en reposo: unos 20 {{vatios|g-vatio}}. Con eso percibe, recuerda y decide. Lo que decide, en cambio, sale despacio: la conducta deliberada fluye a unos 10 {{bits|g-bit}} por segundo, frente a mil millones que entran por los sentidos.",
   "ancla": {
    "cifra": "~20 W",
    "que": "de potencia en reposo",
    "marca": "estimado",
    "palabras": "veinte vatios: veinte julios cada segundo",
    "analogia": "lo que entrega un cargador rápido de teléfono"
   },
   "evidencia": "ev-4",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "La silueta de un hemisferio, con el cerebelo abajo a la derecha y el tronco encefálico. Cada punto representa unos 100 millones de neuronas: 163 en la corteza (azul claro), 690 en el cerebelo (azul intenso) y 7 en el resto (gris). El resplandor ámbar que late de fondo representa el consumo de unos 20 W.",
     "[↑ Lección I.4 · El encéfalo, paso a paso](#m2t4-lec-i4)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Dónde está cada neurona y en qué se gasta la energía",
     "bloques": [
      "En la figura, cada punto representa unos 100 millones de neuronas. El cerebelo, con cerca del 10 % de la masa, alberga el 80 % (69.000 millones); la corteza cerebral, con el 82 % de la masa, solo el 19 % (16.300 millones).",
      "También en el cerebro comunicar cuesta más que calcular. De los ~4,9 W de energía química de la corteza, la comunicación se lleva ~3,5 W y el cómputo postsináptico apenas ~0,1 W (Levy y Calvert, 2021)."
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Supuestos de las cifras",
     "bloques": [
      "Los 20 W resultan del 20 % de la energía del organismo en reposo (Raichle y Gusnard, 2002); la {{PET|g-pet}} mide unos 17 W de consumo de glucosa (Levy y Calvert, 2021). La auditoría energética incluye en «comunicación» los potenciales de reposo y de acción, la transmisión presináptica y todo el costo de la sustancia blanca.",
      "Los 10 bits/s proceden de tareas como la mecanografía o el cubo de Rubik a ciegas (Zheng y Meister, 2025). Sauerbrei y Pruszynski (2025) objetan que el control inconsciente del movimiento supera ampliamente ese límite: la cifra describe la decisión deliberada, no todo el procesamiento."
     ]
    }
   ],
   "widget": "m2.nv-encefalo"
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "La neurona humana: sumar, restar y decidir",
     "min": 15,
     "d": [
      "Representa con el grupo una neurona que suma señales y decide si dispara, como en la actividad de la [lección I.0](#m2t4-lec-i0). Es un esquema en unidades arbitrarias, no una medición.",
      "Material: un cartel «umbral = 5» (y otro con un número mayor, para subir el umbral), ocho tarjetas «+1» (E1 a E8) y cuatro tarjetas «−1,5» (I1 a I4)."
     ],
     "pasos": [
      "Pide a una persona que haga de neurona, en el centro, con el cartel «umbral = 5». Ocho personas son sinapsis excitadoras (cada una suma +1) y cuatro, inhibidoras (cada una resta 1,5). Si el grupo es más pequeño, una persona puede llevar dos tarjetas.",
      "Di en voz alta qué sinapsis se activan a la vez. Las activas levantan la mano.",
      "La neurona calcula el balance en voz alta y decide. Por ejemplo, con seis excitadoras y dos inhibidoras (cálculo ilustrativo): 6 − 2 × 1,5 = 3, que no llega a 5, así que calla. Si el balance llega al umbral, da una palmada: es el impulso, de todo o nada.",
      "Haz tres o cuatro rondas con combinaciones distintas y, después, sube el umbral. Pregunta al grupo: ¿qué hace falta para que dispare? ¿Qué pasa si se activan todas las inhibidoras?",
      "Cierra con la pregunta de la lección: ¿por qué una neurona no es un interruptor que se enciende con una sola señal, como un bombillo?"
     ],
     "nota": "Una neurona real integra miles de entradas, y sus dendritas también calculan (lección I.2). El juego solo muestra la idea del balance y del umbral."
    },
    {
     "t": "¿Media o caso extremo? Las tarjetas del cerebro",
     "min": 20,
     "d": [
      "En equipos pequeños, el grupo clasifica las cifras de este taller: qué cuenta cada una, si describe una media o un caso extremo y de dónde sale. Estas son las cifras para las tarjetas:",
      {
       "ul": [
        "10¹⁴–10¹⁵ sinapsis en el encéfalo",
        "~86.000 millones de neuronas",
        "0,1–1 Hz, la tasa media que adoptan los modelos",
        "453 Hz, el máximo instantáneo medio de las interneuronas más rápidas (el máximo de cada célula, promediado entre 92 células)",
        "856 Hz, el récord de una sola célula",
        "~57.000 células y 150 millones de sinapsis en un milímetro cúbico de corteza",
        "1,4 PB de imágenes de ese milímetro cúbico",
        "~20 W de potencia en reposo",
        "unos 10⁹ bits por segundo que entran por los sentidos",
        "unos 10 bits por segundo de conducta deliberada"
       ]
      },
      "Material: una tarjeta por cifra y, para la tercera ronda, el taller abierto en un teléfono o una computadora por equipo. Si no hay dispositivos, usa tú las respuestas que hay al final de la actividad."
     ],
     "pasos": [
      "Escribe una tarjeta por cada cifra de la lista y repártelas entre los equipos.",
      "Primera ronda: cada equipo escribe en sus tarjetas qué cuenta la cifra y en qué unidad (sinapsis, neuronas, impulsos por segundo, bytes, vatios o bits por segundo).",
      "Segunda ronda: los equipos separan las tarjetas que describen un máximo o un caso extremo y no una media. Pregunta: ¿por qué no sirven para estimar el trabajo de todo el cerebro?",
      "Tercera ronda: cada equipo busca si sus cifras son medidas o estimadas. Las marcas están en las fichas «¿De dónde sale este dato?» y en los desplegables «¿Por qué importa?» de los cuatro niveles. Si una cifra no lleva marca en este taller, se anota «sin marca», sin adivinarla. Por ejemplo, los 1,4 PB son medidos y los 20 W, estimados.",
      "Puesta en común: ¿qué cifra sorprendió más? ¿Qué se le puede responder a alguien que diga «las neuronas disparan a 100 Hz» o «el cerebro solo procesa 10 bits por segundo»?"
     ],
     "respuestas": [
      {
       "ul": [
        "**10¹⁴–10¹⁵ sinapsis** · cuenta sinapsis · un total: ni media ni máximo · [estimado] (ficha del [Nivel 1](#m2t4-n-sinapsis)).",
        "**~86.000 millones de neuronas** · cuenta neuronas · un total · [estimado] (ficha del [Nivel 2](#m2t4-n-neurona)).",
        "**0,1–1 Hz** · impulsos por segundo · una media: la que suponen los modelos · [estimado] («¿Por qué importa?» del Nivel 2).",
        "**453 Hz** · impulsos por segundo · un máximo: el máximo de cada célula, promediado entre 92 interneuronas humanas; describe ráfagas breves, no la media · [medido] («¿Por qué importa?» del Nivel 2).",
        "**856 Hz** · impulsos por segundo · un caso extremo: el récord de una sola célula · medido, como los 453 Hz (Wang et al., 2016), aunque en este taller no lleva marca.",
        "**~57.000 células y 150 millones de sinapsis** · cuenta células y sinapsis · un recuento en una sola muestra de 1 mm³, no una media de toda la corteza · sin marca propia: se identificaron en las imágenes de los 1,4 PB (ficha del [Nivel 3](#m2t4-n-microcircuito)).",
        "**1,4 PB** · bytes · el tamaño de las imágenes de una sola muestra · [medido] (ficha del Nivel 3).",
        "**~20 W** · vatios · un valor típico en reposo, redondeado; no un máximo · [estimado] (ficha del [Nivel 4](#m2t4-n-encefalo)).",
        "**10⁹ bits por segundo** · información que entra por los sentidos · un orden de magnitud · estimado (Zheng y Meister, 2025), aunque en este taller no lleva marca.",
        "**10 bits por segundo** · información que sale como decisión deliberada · el caudal habitual en tareas como teclear o resolver a ciegas el cubo de Rubik; no es un máximo · [estimado] (Zheng y Meister, 2025; se explica en la [lección I.9](#m2t5-lec-i9))."
       ]
      },
      "En la segunda ronda, los únicos máximos o casos extremos son los 453 Hz y los 856 Hz: los dos describen ráfagas medidas en rebanadas de tejido, en el laboratorio. Los recuentos (sinapsis, neuronas, células) no son medias ni máximos, sino totales."
     ],
     "nota": "Todas las cifras salen de este taller. Si hay dudas, vuelve con el grupo a la lección o al nivel correspondiente: el error frecuente de las lecciones I.2 y I.4 trata justo estas dos frases."
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "hacia-dentro"
 ]
});
})();
