/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {};
  M.m2.evidencias = {
 "ev-1": {
  "id": "ev-1",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Recuento de la neocorteza de Tang et al. (2001), resumido por Pakkenberg et al. (2003), del mismo grupo; intervalo para el encéfalo completo tomado de la revisión de Carlsmith (2020)."
   ],
   [
    "Qué mide exactamente",
    "Un **número de objetos** (regla de la cantidad): cuántos contactos entre neuronas hay en todo el encéfalo. No mide su fuerza ni lo que hace cada uno."
   ],
   [
    "Método",
    "**Estereología**: nadie cuenta las sinapsis una a una. Se fotografían muestras diminutas al microscopio electrónico, se mide cuántas sinapsis hay por milímetro cúbico (la densidad) y se multiplica por el volumen de cada región."
   ],
   [
    "Supuestos",
    "Que las muestras representan bien cada región; que cinco varones jóvenes representan a las personas en general; que la densidad medida vale para todo el volumen. El cerebelo y las estructuras subcorticales están peor cuantificados."
   ],
   [
    "Incertidumbre",
    "En la neocorteza, el coeficiente de variación es 0,17: entre personas, la dispersión típica ronda el 17 % de la media. Para el encéfalo completo, el intervalo abarca un factor diez (de 10¹⁴ a 10¹⁵). El recorrido toma ~2 × 10¹⁴ como referencia de cálculo."
   ],
   [
    "Qué no puede inferirse",
    "Cuánto calcula el cerebro: para eso hacen falta más supuestos (lección I.7). Tampoco dice lo distintas que son las sinapsis: en un milímetro cúbico conviven miles de contactos débiles con unas pocas entradas muy fuertes. La comparación con las estrellas de la Vía Láctea es solo de orden de magnitud."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado**: no es un conteo directo, sino densidades medidas multiplicadas por volúmenes, más un intervalo de revisión."
   ]
  ],
  "verificacion": [],
  "ancla": {
   "cifra": "10¹⁴–10¹⁵",
   "que": "sinapsis en el encéfalo",
   "marca": "estimado",
   "palabras": "entre cien billones y mil billones",
   "analogia": "entre cientos y miles de veces las estrellas de la Vía Láctea"
  }
 },
 "ev-2": {
  "id": "ev-2",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Azevedo et al. (2009): 86.100 ± 8.100 millones. Debate posterior: Goriely (2025a, 2025b), Lent (2025) y von Bartheld (2025)."
   ],
   [
    "Qué mide exactamente",
    "Un **número de células**: cuántas neuronas tiene el encéfalo adulto completo."
   ],
   [
    "Método",
    "**Fraccionador isotrópico**: se disuelve el tejido hasta obtener una «sopa» homogénea de núcleos celulares, se cuentan en muestras de esa sopa los núcleos de neuronas y se multiplica por el volumen total (lección I.6)."
   ],
   [
    "Supuestos",
    "Que la sopa está bien mezclada y que las muestras son representativas; que cuatro encéfalos de varones representan a la especie."
   ],
   [
    "Incertidumbre",
    "± 8.100 millones en el estudio original. Con muestras tan pequeñas, los datos publicados admiten promedios de 73.000 a 99.000 millones en varones y de 61.000 a 73.000 millones en mujeres; la estereología apoya 70.000–85.000 millones."
   ],
   [
    "Qué no puede inferirse",
    "Un número exacto y universal: cada encéfalo es distinto. Tampoco dice dónde están (el 80 % en el cerebelo) ni cuánto calcula cada neurona. «Diez neuronas por habitante» es solo una forma de imaginar la cantidad."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado**: procede de muestras de cuatro encéfalos multiplicadas por volúmenes, y su representatividad se discute en la literatura."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en las fuentes: Azevedo et al. (2009) dan 86,1 ± 8,1 mil millones, con 69,03 mil millones (80 %) en el cerebelo y 16,34 (19 %) en la corteza; Goriely (Brain, 148) da 73–99 mil millones en varones (n = 4) y 61–73 en mujeres (n = 5). También se confirmaron las frecuencias de Wang et al. (2016): 338 Hz de media máxima, 453 Hz instantánea (n = 92) y un máximo de 856 Hz."
   }
  ],
  "ancla": {
   "cifra": "~86.000 millones",
   "que": "de neuronas en el encéfalo",
   "marca": "estimado",
   "palabras": "los datos publicados admiten promedios de 61.000 a 99.000 millones",
   "analogia": "unas diez neuronas por cada habitante del planeta"
  }
 },
 "ev-3": {
  "id": "ev-3",
  "marca": "medido",
  "campos": [
   [
    "De dónde procede",
    "Shapson-Coe et al. (2024): reconstrucción nanométrica de ~1 mm³ de corteza humana."
   ],
   [
    "Qué mide exactamente",
    "El **tamaño de un conjunto de imágenes** (regla de la información, en bytes): lo que ocupan las fotografías al microscopio electrónico de ese milímetro cúbico, en el que se identificaron ~57.000 células y ~150 millones de sinapsis."
   ],
   [
    "Método",
    "El bloque de tejido se corta en láminas finísimas, cada una se fotografía con un microscopio electrónico y un programa reconstruye en tres dimensiones las células y sus contactos."
   ],
   [
    "Supuestos",
    "Ninguno para la cifra en sí: es el tamaño de un conjunto de datos publicado. Sí los tiene la extrapolación a todo el encéfalo (~1,7 zettabytes, cálculo B.4): supone que la densidad de datos, el formato y la segmentación se mantienen en ~1,2 × 10⁶ mm³."
   ],
   [
    "Incertidumbre",
    "Depende de la resolución y del formato elegidos: otra reconstrucción del mismo volumen podría ocupar más o menos. Es una sola muestra."
   ],
   [
    "Qué no puede inferirse",
    "Cuánta información *almacena* ese trozo de cerebro: 1,4 PB es lo que pesan las fotos, no la memoria de la persona. Tampoco que haya un conectoma humano completo: aún no existe el de ningún mamífero."
   ],
   [
    "Por qué lleva esta marca",
    "**Medido**: es el tamaño de un conjunto de datos real, descrito en una publicación revisada."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado: Shapson-Coe et al. describen 1 mm³, ~57.000 células, ~150 millones de sinapsis y 1,4 PB. MICrONS: más de 200.000 células y 0,5 mil millones de sinapsis en 1,3 × 0,87 × 0,82 mm³ (≈ 0,93 mm³). Mosca: 139.255 neuronas en el encéfalo adulto (Dorkenwald et al., 2024)."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "Matiz sobre «unas 160.000 a 166.700» neuronas del sistema nervioso central de la mosca: según la verificación, no es un margen de error, sino dos conectomas distintos. Bates et al. (2026) describen el encéfalo y el cordón nervioso de una **hembra** (~160.000 neuronas) y Berg et al. (2026), el sistema nervioso central completo de un **macho** (166.700). El texto original no se ha modificado."
   }
  ],
  "ancla": {
   "cifra": "1,4 PB",
   "que": "de imágenes para reconstruir ese milímetro cúbico",
   "marca": "medido",
   "palabras": "1,4 petabytes: un millón cuatrocientos mil gigabytes",
   "analogia": "11.000 teléfonos de 128 GB, llenos"
  }
 },
 "ev-4": {
  "id": "ev-4",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Raichle y Gusnard (2002): el encéfalo usa ~20 % de la energía del cuerpo en reposo. Levy y Calvert (2021): la tomografía por emisión de positrones (PET, en inglés *positron emission tomography*) mide ~17 W de consumo de glucosa."
   ],
   [
    "Qué mide exactamente",
    "Una **potencia** (regla de la energía): cuánta energía por segundo gasta el encéfalo en reposo. 20 W = 20 julios cada segundo."
   ],
   [
    "Método",
    "Dos caminos: aplicar la fracción del 20 % al gasto en reposo de todo el cuerpo, o medir con PET cuánta glucosa capta el encéfalo y convertirla en vatios."
   ],
   [
    "Supuestos",
    "Condiciones de reposo; una conversión fija de glucosa a energía; un cuerpo adulto típico."
   ],
   [
    "Incertidumbre",
    "Los dos caminos dan ~17 y ~20 W: 20 W es un valor típico y redondeado, no una constante."
   ],
   [
    "Qué no puede inferirse",
    "Eficiencia ni inteligencia: una potencia solo dice cuánta energía entra por segundo (trampas 1 y 2). Tampoco cómo se reparte: de los ~4,9 W de la corteza, ~3,5 W van a comunicar y ~0,1 W al cómputo postsináptico. El cargador de teléfono es una comparación de potencia, nada más."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado**: combina una medición (PET) con fracciones y conversiones; la cifra redonda es una estimación."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado: Levy y Calvert dan 4,94 W para la corteza, 3,52 W para la comunicación y ~0,1 W para el cómputo (35:1); Lennie (2003), 0,16 impulsos por segundo y neurona. Zheng y Meister (2025) dan «unos 10 bits/s» frente a ~10⁹ bits/s, y el comentario crítico de Sauerbrei y Pruszynski (2025) existe con ese título."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "Las cifras de Levy y Calvert están expresadas en «vatios de ATP» (energía química disponible para la célula); los 3,52 W de comunicación incluyen la sustancia blanca (en la sustancia gris son 1,67 W). Un preprint anterior, de 2020, daba otras cifras: conviene citar la versión publicada en *PNAS* en 2021, que es la que cita el original."
   }
  ],
  "ancla": {
   "cifra": "~20 W",
   "que": "de potencia en reposo",
   "marca": "estimado",
   "palabras": "la tomografía por emisión de positrones mide unos 17 W de glucosa",
   "analogia": "lo que entrega un cargador rápido de teléfono"
  }
 },
 "ev-5": {
  "id": "ev-5",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Carlsmith (2020), informe de juicio experto. Alternativas que cita el original: Allyn-Feuer y Sanders (2023), preprint sin revisión por pares; Sandberg y Bostrom (2008), escalera de la emulación; Li et al. (2026)."
   ],
   [
    "Qué mide exactamente",
    "Un **ritmo de cómputo hipotético**: cuántas operaciones digitales por segundo necesitaría una computadora para igualar lo que hace el cerebro. No es una medición del cerebro."
   ],
   [
    "Método",
    "Multiplicar tres factores: sinapsis (S) × frecuencia media de activación (f) × operaciones digitales para imitar cada activación (k), combinado con otros métodos y con juicio experto. Intervalos de Carlsmith: S de 10¹⁴ a 10¹⁵; f de 0,1 a 1 Hz; k de 1 a 100."
   ],
   [
    "Supuestos",
    "Que lo esencial del procesamiento cerebral puede reproducirse contando eventos sinápticos; que basta un número modesto de operaciones por evento; que existe el software adecuado."
   ],
   [
    "Incertidumbre",
    "Intervalo plausible de 10¹³ a 10¹⁷ FLOP/s: cuatro órdenes de magnitud. Carlsmith juzga «más probable que improbable» que 10¹⁵ basten y da menos de un 10 % de probabilidad a que hagan falta más de 10²¹. Otros autores llegan a 10²⁰–10²¹, y la emulación detallada, a 10¹⁸–10⁴³."
   ],
   [
    "Qué no puede inferirse",
    "Que el cerebro «haga» operaciones de punto flotante, ni que una máquina de 10¹⁵ FLOP/s piense como una persona. Tampoco se compara con los 10 bits/s: miden reglas distintas (trampa 3)."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado**: juicio experto probabilístico con supuestos explícitos, ajeno a la medición fisiológica."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en la página actual del informe: «~1e13–1e17 FLOP/s»; «more likely than not» que 10¹⁵ basten; «unlikely (<10%)» que se requieran más de 10²¹. Los «32 millones de años» de la comparación se comprueban así: 10¹⁵ s ÷ 3,156 × 10⁷ s por año ≈ 3,2 × 10⁷ años."
   }
  ],
  "ancla": {
   "cifra": "~10¹⁵ FLOP/s",
   "que": "de cómputo digital que podría igualar al cerebro",
   "marca": "estimado",
   "palabras": "mil billones por segundo, con un intervalo de 10¹³ a 10¹⁷",
   "analogia": "a una operación por segundo, una persona tardaría unos 32 millones de años en hacer lo que esta estimación atribuye a un segundo de cerebro"
  }
 },
 "ev-6": {
  "id": "ev-6",
  "marca": "medido",
  "campos": [
   [
    "De dónde procede",
    "Horowitz (2014), ponencia en la conferencia internacional de circuitos de estado sólido (ISSCC) del IEEE."
   ],
   [
    "Qué mide exactamente",
    "Una **energía por acción**: unos 1.000 picojulios (10⁻⁹ J) por traer un dato de la memoria externa (DRAM, en inglés *dynamic random-access memory*), frente a 0,4–3,7 pJ por operación de punto flotante."
   ],
   [
    "Método",
    "Valores de referencia publicados para circuitos fabricados con tecnología de 45 nanómetros, según el tipo de operación y de memoria."
   ],
   [
    "Supuestos",
    "Tecnología de 45 nm, ya antigua frente a los nodos actuales (N2 está en producción desde finales de 2025); los valores absolutos de hoy son otros, pero la jerarquía —mover datos cuesta mucho más que operar— es la idea que el original toma de la fuente."
   ],
   [
    "Incertidumbre",
    "Son órdenes de magnitud: dependen del tamaño del dato, de la memoria y de la tecnología."
   ],
   [
    "Qué no puede inferirse",
    "La energía de los chips actuales (la H100 no es de 45 nm). La comparación del ingrediente y la cocina es cualitativa."
   ],
   [
    "Por qué lleva esta marca",
    "**Medido** en el original: valores publicados a partir de una tecnología real."
   ]
  ],
  "verificacion": [
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "Dos matices sin corregir. 1) La portada del acto II dice «×100–1.000», pero con las cifras de la propia fuente la razón es 10³ ÷ 3,7 ≈ 270 y 10³ ÷ 0,4 = 2.500: de ~270 a ~2.500 veces (la analogía, «cientos de veces», sí encaja con el extremo inferior). 2) Esa razón es un cociente calculado a partir de dos cifras medidas; según las definiciones del propio recorrido, un cociente propio se marcaría como [extrapolado], aunque la portada lo marca como [medido]."
   }
  ],
  "ancla": {
   "cifra": "~10³ pJ",
   "que": "por traer un dato de la memoria {{DRAM|g-dram}} externa",
   "marca": "medido",
   "palabras": "frente a 0,4–3,7 pJ por operación en tecnología de 45 nm",
   "analogia": "como si ir a buscar un ingrediente costara cientos de veces más que cocinarlo"
  }
 },
 "ev-7": {
  "id": "ev-7",
  "marca": "declarado",
  "campos": [
   [
    "De dónde procede",
    "NVIDIA (s. f.), ficha técnica de la H100 SXM."
   ],
   [
    "Qué mide exactamente",
    "Un **pico teórico** de cómputo (FLOP/s) de un solo chip, con números de 8 bits (FP8) y sin dispersión; potencia de diseño de hasta 700 W."
   ],
   [
    "Método",
    "El fabricante lo calcula a partir del diseño: lo que haría el chip si todas sus unidades operaran sin pausa. No es el resultado de una aplicación real."
   ],
   [
    "Supuestos",
    "Todas las unidades ocupadas, datos siempre disponibles, precisión FP8. La cifra «con dispersión» (3.958 TFLOP/s) cuenta como hechas las operaciones con ceros que el hardware se salta."
   ],
   [
    "Incertidumbre",
    "Las aplicaciones reales logran una fracción del pico, que varía mucho con el problema. Los 700 W son un máximo configurable."
   ],
   [
    "Qué no puede inferirse",
    "Rendimiento real, ni equivalencia con FP64: un exaflop en FP8 no es uno en FP64 (trampa 5). Describe el chip aislado, sin memoria externa ni refrigeración; los ~0,35 pJ por operación salen de ese pico."
   ],
   [
    "Por qué lleva esta marca",
    "**Declarado**: cifra publicada por el fabricante, sin medición independiente."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en la página de NVIDIA: FP8 «3,958 teraFLOPS*» (*con dispersión) y potencia de diseño «hasta 700 W (configurable)»."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "La cifra densa de 1.979 TFLOP/s (la que usa el ancla, ~2 × 10¹⁵) no aparece en la página de NVIDIA: es la mitad de la cifra con dispersión, la convención habitual porque el modo disperso omite la mitad de las operaciones."
   }
  ],
  "ancla": {
   "cifra": "~2 × 10¹⁵ FLOP/s",
   "que": "en {{FP8|g-fp}} sin {{dispersión|g-dispersion}}, pico de una NVIDIA H100",
   "marca": "declarado",
   "palabras": "dos mil billones por segundo; el doble si se cuenta la dispersión",
   "analogia": "consume hasta 700 W, lo que un microondas pequeño"
  }
 },
 "ev-8": {
  "id": "ev-8",
  "marca": "declarado",
  "campos": [
   [
    "De dónde procede",
    "Intel Corporation (2024), comunicado de prensa."
   ],
   [
    "Qué mide exactamente",
    "Una **capacidad**: cuántas neuronas artificiales —modelos de circuito muy simplificados— caben en los 1.152 chips Loihi 2 del sistema, con 128.000 millones de sinapsis y 140.544 núcleos; consumo máximo de 2,6 kW."
   ],
   [
    "Método",
    "Es la capacidad de diseño que declara el fabricante, no un recuento independiente. La eficiencia de más de 15 TOPS/W se midió en una red sintética de 8 bits podada a una dispersión de 10:1, con un 10 % de activación."
   ],
   [
    "Supuestos",
    "Que una «neurona de silicio» es la unidad que se cuenta; la eficiencia depende de una red muy dispersa, favorable a este hardware."
   ],
   [
    "Incertidumbre",
    "Sin evaluación independiente publicada que conste en el original. El 1,3 % se calcula frente a ~86.000 millones de neuronas, cifra que a su vez es una estimación."
   ],
   [
    "Qué no puede inferirse",
    "Que el sistema tenga el 1,3 % de la capacidad de un cerebro: una neurona de silicio es mucho más simple que una biológica, y su número no dice qué problemas resuelve (trampa 6). El hervidor es una comparación de potencia."
   ],
   [
    "Por qué lleva esta marca",
    "**Declarado**: lo afirma quien construyó el sistema."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en el comunicado de Intel (17 de abril de 2024): 1,15 mil millones de neuronas, 128 mil millones de sinapsis, 140.544 núcleos, 1.152 Loihi 2, máximo de 2.600 W y «>15 TOPS/W» en 8 bits. La infografía de Intel trae una errata («1,512 Loihi 2»); el texto dice 1.152, como el original. Darwin Monkey: «>2 billion» neuronas de impulsos, «>100 billion» sinapsis, 960 chips Darwin 3 y unos 2.000 W, presentado el 2 de agosto de 2025; la fuente leída es el portal municipal de Hangzhou, no una página de la Universidad de Zhejiang."
   }
  ],
  "ancla": {
   "cifra": "1.150 millones",
   "que": "de neuronas de silicio en Hala Point, de Intel",
   "marca": "declarado",
   "palabras": "el 1,3 % de las neuronas de tu encéfalo",
   "analogia": "consume como máximo 2,6 kW, lo que un hervidor eléctrico encendido"
  }
 },
 "ev-9": {
  "id": "ev-9",
  "marca": "medido",
  "campos": [
   [
    "De dónde procede",
    "Lista TOP500 de junio de 2026; análisis técnico de Prickett Morgan (2026) y noticia de Moss (2026)."
   ],
   [
    "Qué mide exactamente",
    "Un **rendimiento sostenido** (FLOP/s) en doble precisión (FP64) al resolver un sistema enorme de ecuaciones lineales: el banco de pruebas HPL."
   ],
   [
    "Método",
    "La máquina ejecuta el HPL completo; del número de operaciones y del tiempo sale Rmax. La potencia (42,2 MW) se midió durante la ejecución con el nivel 1 de la metodología."
   ],
   [
    "Supuestos",
    "Que el HPL, un problema que mantiene los procesadores muy ocupados, sirve de referencia común. Otras cargas dan cifras muy distintas."
   ],
   [
    "Incertidumbre",
    "El nivel 1 mide una fracción menor del sistema y de la ejecución que el nivel 2. La presentación técnica no es pública, y los núcleos de la medición equivalen a ~22.680 nodos frente a los 20.480 descritos para la máquina completa."
   ],
   [
    "Qué no puede inferirse",
    "El rendimiento en aplicaciones reales: en HPCG estas máquinas rinden ~1 % de su HPL (trampa 4). Ni inteligencia, ni comparación directa con cifras en FP8."
   ],
   [
    "Por qué lleva esta marca",
    "**Medido**: resultado oficial de una clasificación con un banco de pruebas estándar."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en el TOP500: Rmax 2.198,40 PF, Rpeak 2.735,82 PF, 42.220 kW, nivel 1, primer sistema chino en el n.º 1 desde 2017; El Capitan 1.809 PF y 29.685 kW; Frontier 1.353 y 24.607; Aurora 1.012 y 38.698; JUPITER Booster 1.000 y 15.794. CPU LX2 de 304 núcleos a 1,55 GHz (Armv9.2; según The Next Platform, 304 activos de 384 por zócalo), red LingQi, 13.789.440 núcleos y 80,35 % del pico. HPCG: LineShine 22,00 PF; El Capitan 17,41 PF. HPL-MxP: El Capitan 16,7 EF; LineShine 7,92 EF."
   }
  ],
  "ancla": {
   "cifra": "2,198 EFLOP/s",
   "que": "en FP64 ({{HPL|g-hpl}}), n.º 1 del TOP500 en junio de 2026",
   "marca": "medido",
   "palabras": "2,2 trillones de operaciones por segundo",
   "analogia": "si cada habitante del planeta hiciera una operación por segundo, tardaría unos ocho años y medio en igualar un solo segundo de esta máquina"
  }
 },
 "ev-10": {
  "id": "ev-10",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Epoch AI (2026a), base de datos de centros de datos de IA (versión del 5 de octubre de 2026, consultada el 10 de octubre)."
   ],
   [
    "Qué mide exactamente",
    "Una **potencia instalada** de los equipos de cómputo ({{potencia IT|g-potit}}), sin refrigeración ni otras cargas, y una capacidad de ~1,1 millones de {{equivalentes H100|g-h100e}}."
   ],
   [
    "Método",
    "Epoch AI la reconstruye con imágenes satelitales, permisos y documentos de las empresas: la infraestructura visible se convierte en vatios y en chips."
   ],
   [
    "Supuestos",
    "Que la infraestructura observada permite inferir la potencia y el número de chips; la unidad H100e traduce chips distintos a una referencia común."
   ],
   [
    "Incertidumbre",
    "El 80 % de las veces, las estimaciones de potencia IT aciertan dentro de un factor de 1,4, y las de cómputo, de 1,5. Es capacidad instalada: el uso medio ronda el 60–80 %."
   ],
   [
    "Qué no puede inferirse",
    "Cuánta energía consume al año ni qué hace con ella. «Casi un reactor nuclear» compara potencias, no producción ni efectos."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado** por un tercero a partir de pruebas indirectas."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "La ficha actual de Colossus 2 en Epoch AI da 946 MW y 1.112.000 H100e. IEA (2026): 485 TWh en 2025, unos 950 TWh en 2030, densidad de servidores de IA ×11 entre 2020 y 2025 y oscilaciones de carga de más del 50 % en menos de un segundo; IEA (2025): unos 1.200 TWh en 2035. Duplicación del récord de potencia cada diez meses y del de cómputo cada siete: confirmadas."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "Matices de redacción, sin corregir: Our World in Data, citando a la IEA (2026), dice que 485 TWh son «alrededor del 1,5 %» de la electricidad mundial, no «algo más del 1,5 %»; la cifra de 465 TWh para la IA en 2030 solo se encontró en un gráfico de Our World in Data que cita a la IEA (2026). La base de Epoch AI se actualizó el 12 de octubre de 2026 (ver la ficha de los 13,8 GW)."
   }
  ],
  "ancla": {
   "cifra": "946 MW",
   "que": "de {{potencia IT|g-potit}} en Colossus 2",
   "marca": "estimado",
   "palabras": "con unos 1,1 millones de {{equivalentes H100|g-h100e}}",
   "analogia": "casi un reactor nuclear grande, de ~1 GW"
  }
 },
 "ev-11": {
  "id": "ev-11",
  "marca": "extrapolado",
  "campos": [
   [
    "De dónde procede",
    "Cálculo propio del recorrido (B.7) a partir de los números uno históricos del TOP500."
   ],
   [
    "Qué mide exactamente",
    "Qué rendimiento HPL en FP64 tendría el sistema líder en 2036 **si** creciera a un ritmo constante del 25–30 % anual."
   ],
   [
    "Método",
    "R₂₀₃₆ = 2,198 × (1 + g)¹⁰: diez años de interés compuesto (lección II.6)."
   ],
   [
    "Supuestos",
    "Una tasa constante durante diez años, elegida entre las históricas: 61 % anual en 2008–2018, 37 % en 2016–2026 y 19 % desde 2022."
   ],
   [
    "Incertidumbre",
    "Bajo: 8,9–9,7 EFLOP/s; conservador: 12,5–14,8; central: 20,5–30,3; alto: 44,2–51,2, un escenario de estrés."
   ],
   [
    "Qué no puede inferirse",
    "Una predicción: es una consecuencia aritmética de una tasa supuesta (trampa 9). No dice qué máquina será ni dónde, ni incluye cifras en FP8 como las de FugakuNEXT."
   ],
   [
    "Por qué lleva esta marca",
    "**Extrapolado**: cálculo del propio recorrido, condicionado a una tasa."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Comprobaciones aritméticas: 1,25¹⁰ ≈ 9,3 («más de nueve»); 20,5 ÷ 2,198 ≈ 9,3 y 30,3 ÷ 2,198 ≈ 13,8 («entre nueve y catorce veces»). Proyectos: Discovery (HPE, CPU «Venice» y GPU MI430X, entrega en 2028); el «3 a 5 veces» de Rumsey (2026) se refiere a las primeras aplicaciones, no al pico. Alice Recoque: instalación desde 2026. FugakuNEXT: «>600 EFLOPS en FP8 (con dispersión)», unos 40 MW, hacia 2030; los ≥50 EFLOPS efectivos proceden de diapositivas de agosto de 2025, y «0,6 ZFLOP/s» es una conversión de 600 EF, no una cifra textual de la fuente."
   }
  ],
  "ancla": {
   "cifra": "~20–30 EFLOP/s",
   "que": "para el sistema líder en 2036, escenario central",
   "marca": "extrapolado",
   "palabras": "entre nueve y catorce veces la máquina más rápida de hoy",
   "analogia": "la pendiente de la recta es el ritmo: a un 25 % anual, la cifra se multiplica por más de nueve cada diez años"
  }
 },
 "ev-12": {
  "id": "ev-12",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Epoch AI (2026a), versión del 5 de octubre de 2026, consultada el 10 de octubre. La equivalencia en cerebros es un cálculo propio (B.10)."
   ],
   [
    "Qué mide exactamente",
    "La suma de la **potencia IT instalada** en 93 campus de IA rastreados; unos 17,9 GW al añadir refrigeración y otras cargas. «690 millones de cerebros» = 13,8 × 10⁹ W ÷ 20 W."
   ],
   [
    "Método",
    "La misma reconstrucción de la ficha de Colossus 2, sumada campus a campus; después, una división entre 20 W."
   ],
   [
    "Supuestos",
    "Que la base cubre el 43 % del cómputo de IA desplegado (intervalo del 90 %: 23–81 %); que cada cerebro gasta 20 W."
   ],
   [
    "Incertidumbre",
    "Factor de 1,4 en la potencia el 80 % de las veces; la cobertura tiene un intervalo muy amplio. Es capacidad instalada, no consumo."
   ],
   [
    "Qué no puede inferirse",
    "Que esos campus calculen o piensen como 690 millones de personas: la equivalencia es **solo de potencia eléctrica**. Tampoco su consumo anual: para eso hay que multiplicar por las horas y por el uso medio (lección II.7)."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado** por Epoch AI; la conversión a cerebros es un cálculo del recorrido."
   ]
  ],
  "verificacion": [
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "**Actualización posterior a la fecha de revisión del original.** El 12 de octubre de 2026, Epoch AI actualizó su base: 94 sitios, 14,1 GW de TI, 18,3 GW con sobrecarga (TI más un 20–50 %), 14,6 millones de H100e y cobertura del 44 % (intervalo del 90 %: 23–81 %). Esta edición conserva las cifras originales (93 campus, 13,8 GW, 17,9 GW, 14,4 millones, 43 %), fechadas el 5 de octubre; esa versión ya no pudo consultarse para comprobarlas. Con 14,1 GW, la equivalencia sería de unos 705 millones de cerebros (cálculo de esta edición)."
   }
  ],
  "ancla": {
   "cifra": "13,8 GW",
   "que": "en 93 campus de IA",
   "marca": "estimado",
   "palabras": "la potencia de 690 millones de cerebros",
   "analogia": "unos catorce reactores nucleares grandes"
  }
 },
 "ev-13": {
  "id": "ev-13",
  "marca": "extrapolado",
  "campos": [
   [
    "De dónde procede",
    "Cálculo propio (B.6) con 20 W y la convención de 10¹⁵ FLOP/s de Carlsmith (2020). Referencias de silicio: TOP500 y Green500 (Frontier, El Capitan, KAIROS), NVIDIA (H100) e Intel (Hala Point)."
   ],
   [
    "Qué mide exactamente",
    "La **energía por operación equivalente** del cerebro (julios por operación) bajo la convención central."
   ],
   [
    "Método",
    "E = P ÷ R: 20 W ÷ 10¹⁵ FLOP/s = 2 × 10⁻¹⁴ J. Con 10¹³ o 10¹⁸ FLOP/s salen 2 × 10⁻¹² y 2 × 10⁻¹⁷ J (lección III.1)."
   ],
   [
    "Supuestos",
    "Los 20 W y, sobre todo, la convención: cuántas operaciones digitales «vale» un segundo de cerebro."
   ],
   [
    "Incertidumbre",
    "Según la convención (10¹³, 10¹⁵ o 10¹⁸ FLOP/s), la razón frente a KAIROS va de ≈6,8 a ≈6,8 × 10⁵; frente a la H100, de ≈0,18 a ≈1,8 × 10⁴, y frente a Frontier, de ≈9 a ≈9 × 10⁵ (B.6): «de la paridad a casi un millón»."
   ],
   [
    "Qué no puede inferirse",
    "Una eficiencia empírica: es un cociente bajo una convención. KAIROS es un sistema de 46 kW, no representativo de un exascala; la H100 es un chip aislado en su pico teórico. «El cerebro es un millón de veces más eficiente» no se sigue de comparar 20 W con 20 MW (trampa 1)."
   ],
   [
    "Por qué lleva esta marca",
    "**Extrapolado**: un cociente calculado por el recorrido."
   ]
  ],
  "verificacion": [
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "**Inconsistencias internas, señaladas y sin corregir.** 1) El ancla marca esta cifra como [extrapolado], pero la figura «Energía por operación» marca las tres convenciones del cerebro como [estimado], con la fuente «Cálculo propio (B.6)». 2) El texto dice que, con la convención central, el cerebro gastaría «unas diez veces menos» que un acelerador de baja precisión; el apéndice B.6 da ≈18 frente a la H100. Diez es el orden de magnitud; la razón calculada se acerca más a veinte."
   },
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "KAIROS (Green500, junio de 2026): 73,282 GFLOP/s por vatio, 46 kW y 3,05 PF; ya lideraba la lista de noviembre de 2025, así que conserva el n.º 1. Las divisiones de B.6 se rehicieron en esta edición: 20 ÷ 10¹⁵ = 2 × 10⁻¹⁴; 1,36 × 10⁻¹¹ ÷ 2 × 10⁻¹⁴ = 680; 3,5 × 10⁻¹³ ÷ 2 × 10⁻¹⁴ = 17,5 ≈ 18."
   }
  ],
  "ancla": {
   "cifra": "~2 × 10⁻¹⁴ J",
   "que": "por operación equivalente del cerebro, con la convención central",
   "marca": "extrapolado",
   "palabras": "unos 20 femtojulios; la supercomputación FP64 gasta del orden de 10⁻¹¹ J",
   "analogia": "comparar 20 W con 20 MW es como comparar lo que gastan una bicicleta y un tren sin preguntar cuánta carga lleva cada uno"
  }
 },
 "ev-14": {
  "id": "ev-14",
  "marca": "estimado",
  "campos": [
   [
    "De dónde procede",
    "Epoch AI (2026b), base de datos de modelos de IA."
   ],
   [
    "Qué mide exactamente",
    "Un **total de operaciones** (FLOP, sin «/s»): todo el cómputo usado para entrenar el mayor modelo estimado de 2026. Es una cantidad acumulada, no un ritmo (lección F8)."
   ],
   [
    "Método",
    "Epoch AI lo estima a partir de tres datos inferidos de información pública: cuántos chips se usaron, durante cuánto tiempo y con qué utilización media. La cuenta es chips × pico por chip × utilización × segundos. Los valores concretos que supone figuran en la verificación externa de abajo."
   ],
   [
    "Supuestos",
    "Que esos tres datos, inferidos de información incompleta, son correctos."
   ],
   [
    "Incertidumbre",
    "Intervalo de ~5 × 10²⁶ a 2 × 10²⁷."
   ],
   [
    "Qué no puede inferirse",
    "La calidad ni la inteligencia del modelo. Las «mil vidas de cómputo cerebral» solo valen con la convención central (10¹⁵ FLOP/s × 30 años ≈ 9,5 × 10²³ FLOP)."
   ],
   [
    "Por qué lleva esta marca",
    "**Estimado** por un tercero, Epoch AI, con supuestos explícitos."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Confirmado en Epoch AI: GPT-6 Astra, 1,0001 × 10²⁷ FLOP, confianza «probable» (*Likely*), intervalo ~[5 × 10²⁶, 2 × 10²⁷]. Supuestos de esa estimación (no figuran en el original): al menos 100.000 chips GB200, como cota inferior; unos 90 días, y un 25 % de utilización en FP8. Fichas actuales: Grok-3, 3,5 × 10²⁶; GPT-4.5, 3,8 × 10²⁶; Grok 4, 5,0 × 10²⁶. Ho et al. (2024): reducción a la mitad cada ~8 meses (IC 95 %, de 5 a 14). Qwen3: 36 billones de tokens. Sevilla et al. (2024): ~4× anual y 2 × 10²⁹ FLOP factibles hacia 2030; Epoch–EPRI (2025): más de 100 MW, 2,2× anual y 4–16 GW en 2030."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "La ficha actual de Grok 4 en Epoch AI no muestra la etiqueta «especulativo» que le atribuye el texto. La estimación de 2025 de Grok-3 (4,6 × 10²⁶) figuraba como de alta precisión y aun así se rebajó a 3,5 × 10²⁶: las estimaciones cambian. El texto original no se ha modificado."
   }
  ],
  "ancla": {
   "cifra": "~10²⁷ FLOP",
   "que": "en la mayor corrida estimada de 2026, GPT-6 Astra",
   "marca": "estimado",
   "palabras": "mil cuatrillones de operaciones, con un intervalo de 5 × 10²⁶ a 2 × 10²⁷",
   "analogia": "mil «vidas» de cómputo cerebral, con la convención central"
  }
 },
 "ev-15": {
  "id": "ev-15",
  "marca": "declarado",
  "campos": [
   [
    "De dónde procede",
    "Darwin Monkey (Universidad de Zhejiang, 2025): más de 2.000 millones de neuronas de impulsos y más de 10¹¹ sinapsis, cifras de los desarrolladores. Los porcentajes son un cálculo propio."
   ],
   [
    "Qué mide exactamente",
    "Una **razón entre dos recuentos**: neuronas del mayor sistema neuromórfico de chips dedicados frente a las neuronas estimadas del encéfalo."
   ],
   [
    "Método",
    "2 × 10⁹ ÷ 8,6 × 10¹⁰ ≈ 2,3 %; para las sinapsis, 10¹¹ ÷ 2 × 10¹⁴ = 0,05 %."
   ],
   [
    "Supuestos",
    "Las cifras declaradas («más de»); las referencias del encéfalo (86.000 millones de neuronas, 2 × 10¹⁴ sinapsis)."
   ],
   [
    "Incertidumbre",
    "El numerador es una declaración; el denominador, una estimación con un margen amplio (61.000–99.000 millones)."
   ],
   [
    "Qué no puede inferirse",
    "Que el sistema tenga el 2,3 % de las capacidades de un encéfalo. Las métricas no son homogéneas: unos cuentan neuronas en chips dedicados; otros, núcleos o neuronas simuladas (trampa 10)."
   ],
   [
    "Por qué lleva esta marca",
    "**Declarado**, porque la cifra de partida es de los desarrolladores; el porcentaje es un cálculo derivado."
   ]
  ],
  "verificacion": [],
  "ancla": {
   "cifra": "2,3 %",
   "que": "de las neuronas humanas en el mayor sistema neuromórfico de chips dedicados",
   "marca": "declarado",
   "palabras": "y solo el 0,05 % de las sinapsis",
   "analogia": "un mapa con el 2 % de las ciudades y apenas el 0,05 % de las carreteras"
  }
 },
 "ev-16": {
  "id": "ev-16",
  "marca": "extrapolado",
  "campos": [
   [
    "De dónde procede",
    "Propiedad matemática de la mecánica cuántica: describir n cúbits exige 2n amplitudes; la cota de Holevo limita lo que puede leerse a n bits."
   ],
   [
    "Qué mide exactamente",
    "Cuántos **números** (amplitudes) necesita una computadora corriente para describir exactamente el estado general de 50 cúbits."
   ],
   [
    "Método",
    "2⁵⁰ = 1.125.899.906.842.624 ≈ 1,1 × 10¹⁵."
   ],
   [
    "Supuestos",
    "Un estado general, entrelazado; algunos estados particulares admiten descripciones mucho más cortas."
   ],
   [
    "Incertidumbre",
    "Ninguna en la cuenta: es aritmética exacta. La marca indica que es un cálculo del recorrido."
   ],
   [
    "Qué no puede inferirse",
    "Que una computadora cuántica guarde o procese 10¹⁵ resultados utilizables: al medir 50 cúbits se obtienen 50 bits. Tampoco que «pruebe todas las respuestas a la vez» (trampa 11). La coincidencia con el número de sinapsis es solo de orden de magnitud."
   ],
   [
    "Por qué lleva esta marca",
    "**Extrapolado**: cálculo del recorrido a partir de la teoría estándar."
   ]
  ],
  "verificacion": [
   {
    "tipo": "ok",
    "titulo": "**Verificación externa · 13 de octubre de 2026**",
    "texto": "Hitos confirmados: Helios (Ransford et al., *Nature*, 17 de junio de 2026), 98 cúbits de iones de bario, 99,921 % de fidelidad en dos cúbits; Willow, Λ = 2,14 ± 0,02 en un procesador de 105 cúbits (publicado en línea en diciembre de 2024, número de febrero de 2025); IBM y la Universidad de Chicago (30 de julio de 2026): 70 cúbits lógicos, 468 puertas T, ~15 minutos, preprint arXiv:2607.25941; Gidney (2025), Webster et al. (2026) y Cain et al. (2026): menos de un millón, menos de cien mil y del orden de diez mil cúbits; IBM Starling (2029) y Blue Jay (~2033); Bluvstein et al., hasta 448 átomos; Paetznick et al., de 11 a 800 veces."
   },
   {
    "tipo": "nota",
    "titulo": "**Nota de revisión de esta edición**",
    "texto": "Matices de atribución: la fidelidad de una puerta (99,9975 %) se encontró en el material de lanzamiento de Quantinuum, no en el artículo de *Nature* que cita el original. El experimento de distancia 7 de Willow usa 101 de sus 105 cúbits; la fórmula 2d² − 1 da 97 para el código en sí, y esta edición no ha comprobado a qué se deben los cuatro restantes. En la hoja de ruta de IBM, el PDF no dice «lógicos» de forma explícita; la prensa especializada sí."
   }
  ],
  "ancla": {
   "cifra": "2⁵⁰ ≈ 10¹⁵",
   "que": "amplitudes para describir solo 50 cúbits",
   "marca": "extrapolado",
   "palabras": "mil billones de números; al medirlos, en cambio, solo se obtienen 50 bits",
   "analogia": "tantas como sinapsis hay en tu encéfalo"
  }
 }
};
})();
