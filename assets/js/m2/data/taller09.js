/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
/* Taller 9 del módulo 2. Este archivo es el contenido del taller: textos, lecciones y secciones.
   Lo técnico se guarda en desplegables («profundiza», «desplegables»); los laboratorios y figuras están en widgets/taller09.js. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {}; M.m2.talleres = M.m2.talleres || [];
  M.m2.talleres.push({
 "n": 9,
 "slug": "m2t9",
 "etapa": "acto3",
 "titulo": "Imitar al cerebro, saltar al cúbit",
 "emblema": "|ψ⟩",
 "pregunta": "¿Qué pueden aportar los chips que imitan al cerebro y las computadoras cuánticas, y qué no?",
 "intro": "Hay dos caminos para cambiar las reglas del juego. El primero copia la organización del cerebro: chips que solo trabajan cuando pasa algo. El segundo cambia de física: el cúbit, que no es un bit doble y cuyo enemigo es el ruido. Verás qué promete cada camino y dónde está su límite.",
 "objetivos": [
  "Explicar qué copian del cerebro los chips neuromórficos, hechos para calcular solo cuando pasa algo, y por qué saltar al cúbit es un camino distinto.",
  "Comprobar que el ahorro del procesamiento por eventos depende de que la actividad sea escasa.",
  "Contar cuántos órdenes de magnitud les faltan a los mayores sistemas neuromórficos para igualar las neuronas y las sinapsis de un encéfalo.",
  "Describir qué ocurre al medir un cúbit, por qué la superposición no es «0 y 1 a la vez» y cómo la interferencia suma o anula amplitudes.",
  "Distinguir cúbits físicos de cúbits lógicos y calcular cuántos físicos pide el código de superficie para cada lógico."
 ],
 "prerequisitos": [
  "Te ayudará repasar:",
  {
   "ul": [
    "[Lección F5 · Orden de magnitud](#m2t1-lec-f5), en el Taller 1",
    "[Lección F2 · Potencias de diez](#m2t1-lec-f2), en el Taller 1",
    "[Lección F11 · Cinco clases de cifras](#m2t2-lec-f11), en el Taller 2",
    "[Lección D4 · Bits](#m2t3-lec-d4), en el Taller 3",
    "[Lección II.0 · Bits e interruptores](#m2t6-lec-ii0) y [lección II.1 · El precio de mover datos](#m2t6-lec-ii1), en el Taller 6"
   ]
  }
 ],
 "secciones": [
  {
   "id": "lec-ii3",
   "tipo": "leccion",
   "codigo": "II.3",
   "nav": "II.3 · Chips neuromórficos",
   "titulo": "Chips neuromórficos: calcular solo cuando pasa algo",
   "pregunta": "¿Qué copian del cerebro los chips «neuromórficos»?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "*{{Neuromórfico|g-neuromorfico}}* significa «con forma de {{neurona|g-neurona}}». Estos chips imitan tres rasgos del cerebro del acto I: unidades que se comunican con **impulsos** (como las neuronas), **memoria junto a cada núcleo** (como las {{sinapsis|g-sinapsis}}, que guardan y calculan en el mismo sitio) y **gasto solo cuando ocurre algo**.",
    "Este último rasgo se llama *procesamiento por eventos*. Un procesador convencional sigue un reloj: en cada tic, todas sus unidades trabajan. Un chip neuromórfico solo activa las unidades que reciben un impulso; si la actividad es escasa —*{{dispersa|g-dispersion}}*—, la mayoría descansa.",
    "Ya existen sistemas grandes: Hala Point, de Intel, reúne 1.150 millones de «neuronas de silicio», y Darwin Monkey, de la Universidad de Zhejiang, más de 2.000 millones. Son cifras declaradas por sus fabricantes [declarado]."
   ],
   "vida": [
    "Un portero automático no vigila la puerta grabando vídeo sin parar: se activa cuando alguien pulsa el timbre. Gasta poco porque casi siempre espera. Si llamaran al timbre cada segundo, esa ventaja desaparecería."
   ],
   "imagen": {
    "pie": "Arriba trabaja todo en cada tic; abajo, solo lo que recibe un evento.",
    "si": "Que con actividad escasa, procesar solo los eventos ahorra trabajo.",
    "no": "Una «neurona de silicio» es un modelo muy simplificado, mucho más simple que una biológica. Y con actividad densa, la ventaja se esfuma: el ahorro depende de que pase poco.",
    "svg": "lec-ii3"
   },
   "ejemplo": {
    "enunciado": "Hala Point frente al encéfalo y su energía por operación.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "1,15 × 10⁹ neuronas de silicio (declarado, Intel, 2024); ~8,6 × 10¹⁰ neuronas en el encéfalo (estimado). Eficiencia: 15 × 10¹² operaciones por julio."
     ],
     [
      "**Qué significa cada número**",
      "15 TOPS/W = 15 billones de operaciones por segundo y por vatio, es decir, por julio."
     ],
     [
      "**Qué unidades usa**",
      "Neuronas (cantidad) y operaciones por julio (eficiencia)."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir neuronas entre neuronas da una fracción; invertir las operaciones por julio da julios por operación."
     ],
     [
      "**El cálculo**",
      "1,15 × 10⁹ ÷ 8,6 × 10¹⁰ ≈ 0,013 = 1,3 % · 1 ÷ (15 × 10¹²) ≈ 6,7 × 10⁻¹⁴ J"
     ],
     [
      "**El resultado**",
      "El 1,3 % de las neuronas de un encéfalo; ~6,7 × 10⁻¹⁴ J por operación (≈67 femtojulios) en la prueba del fabricante."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Ninguna de las dos cifras mide «inteligencia»: una cuenta unidades simplificadas, y la otra se midió en una red sintética muy dispersa elegida por el fabricante."
     ]
    ]
   },
   "prediccion": {
    "q": "Si el 10 % de las unidades recibe un impulso en cada instante, ¿cuánto trabajo se ahorra frente al reloj?",
    "opciones": [
     "Un 10 %",
     "La mitad",
     "Un 90 %"
    ],
    "ok": 2,
    "porque": "Un 90 %: solo trabaja una de cada diez unidades. Con un 50 % de actividad, el ahorro bajaría a la mitad, y con un 100 %, a nada."
   },
   "actividad": "events",
   "descubrir": [
    "El ahorro del procesamiento por eventos depende de lo dispersa que sea la actividad. Por eso estas máquinas brillan donde mandan los eventos escasos y la baja latencia (responder muy rápido) —sensores, robótica, dispositivos implantables— y no son candidatas a sustituir a los centros de datos."
   ],
   "error": {
    "mal": "«Hala Point tiene el 1,3 % del cerebro humano.»",
    "bien": "Tiene un número de neuronas de silicio igual al 1,3 % de las neuronas de un encéfalo, pero cada una es mucho más simple que una biológica. El recuento no dice qué problemas resuelve ([trampa 6](#m2t10-trampa-6))."
   },
   "quiz": {
    "q": "¿Cuándo pierde su ventaja el procesamiento por eventos?",
    "opciones": [
     {
      "t": "Cuando la actividad es muy escasa",
      "fb": "Al revés: con actividad escasa, casi todo descansa y el ahorro es máximo."
     },
     {
      "t": "Cuando casi todas las unidades se activan a la vez",
      "fb": "Exacto: si todas reciben eventos, trabaja todo, como con un reloj.",
      "ok": true
     },
     {
      "t": "Cuando el chip tiene memoria junto a cada núcleo",
      "fb": "La memoria cercana es otra ventaja, no un inconveniente."
     }
    ]
   },
   "clave": {
    "sencillo": "Los chips neuromórficos ahorran cuando pasa poco: su ventaja depende de la actividad dispersa.",
    "cientifico": "el cómputo neuromórfico combina comunicación por impulsos, memoria distribuida en los núcleos y procesamiento dirigido por eventos; su ventaja demostrada se concentra en cargas dispersas y de baja latencia (Kudithipudi et al., 2025)."
   },
   "profundizaSub": "las cifras de Hala Point y Darwin Monkey",
   "profundiza": [
    "Hala Point, de Intel, reúne 1.152 chips Loihi 2 con 1.150 millones de «neuronas de silicio», 128.000 millones de sinapsis y un consumo máximo de 2,6 kW. Su eficiencia de más de 15 billones de operaciones por segundo y por vatio (15 {{TOPS/W|g-tops}}, del inglés *tera-operations per second*) se midió en una red sintética de 8 bits muy dispersa, con un 10 % de actividad. Son cifras declaradas por el fabricante ([lección F11](#m2t2-lec-f11)). En agosto de 2025, la Universidad de Zhejiang presentó Darwin Monkey, con más de 2.000 millones de neuronas de impulsos en unos 2 kW.",
    "Para seguir:",
    {
     "ul": [
      "[Profundiza: qué se midió y cómo](#m2t9-n-neuromorfico)",
      "[Trampa 6 · Una neurona de silicio no es una neurona](#m2t10-trampa-6)",
      "[Lección III.3 · Especialistas, no sustitutos](#m2t9-lec-iii3)"
     ]
    }
   ]
  },
  {
   "id": "n-neuromorfico",
   "tipo": "nivel",
   "nav": "Nivel 7 · Sistema neuromórfico",
   "titulo": "Sistema neuromórfico",
   "n": 7,
   "mundo": "sil",
   "puente": "¿Y si, en lugar de forzar la arena, la organizamos como un cerebro?",
   "grupo": "Nivel 7 de 9 · Silicio",
   "lead": "Los chips {{neuromórficos|g-neuromorfico}} copian la organización del acto I: neuronas que se comunican por impulsos, memoria junto a cada núcleo y gasto solo cuando ocurre algo. Son el silicio intentando aprender la lección del cerebro.",
   "ancla": {
    "cifra": "1.150 millones",
    "que": "de neuronas de silicio en Hala Point, de Intel",
    "marca": "declarado",
    "palabras": "el 1,3 % de las neuronas de tu encéfalo",
    "analogia": "consume como máximo 2,6 kW, lo que un hervidor eléctrico encendido"
   },
   "evidencia": "ev-8",
   "widget": "m2.nv-neuromorfico",
   "escena": {
    "titulo": "Qué ves en la animación · esquema ilustrativo, sin escala física",
    "pares": [],
    "texto": [
     "Doce chips neuromórficos (cuadrados grandes), cada uno con 16 núcleos que tienen memoria propia. Un núcleo solo se ilumina cuando acumula suficientes impulsos —procesamiento por eventos— y envía impulsos (puntos azules) sobre todo a núcleos de su mismo chip.",
     "[↑ Lección II.3 · Los sistemas neuromórficos, paso a paso](#m2t9-lec-ii3)"
    ]
   },
   "desplegables": [
    {
     "tipo": "lay2",
     "titulo": "¿Por qué importa?",
     "subtitulo": "Una bisagra entre los dos mundos",
     "bloques": [
      "En agosto de 2025, la Universidad de Zhejiang presentó Darwin Monkey, con más de 2.000 millones de neuronas de impulsos y más de 10¹¹ sinapsis en unos 2 kW. SpiNNcloud, en Dresde, reúne 35.000 chips con más de cinco millones de núcleos. La ventaja demostrada de estas máquinas está en el borde de la red, donde mandan los eventos dispersos y la baja latencia (Kudithipudi et al., 2025).",
      {
       "cautela": [
        "Para comparar con cautela: una neurona de silicio es mucho más simple que una biológica, y su número no indica qué problemas resuelve el sistema.",
        "Además, casi todas estas cifras las declaran sus propios fabricantes.[Trampa 6 · Una neurona de silicio no es una neurona](#m2t10-trampa-6)"
       ]
      }
     ]
    },
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Qué se midió y cómo",
     "bloques": [
      "Hala Point integra 1.152 procesadores Loihi 2 con 128.000 millones de sinapsis en 140.544 núcleos. Su eficiencia de más de 15 {{TOPS/W|g-tops}} se midió en una red sintética de 8 bits podada a una dispersión de 10:1, con un 10 % de activación (Intel Corporation, 2024). Darwin Monkey usa 960 chips Darwin III (Zhejiang University, 2025). Un clúster liderado por Lynxi declara más de 10¹⁰ neuronas sin detallar el hardware ni el método de recuento (Du, 2026)."
     ]
    }
   ]
  },
  {
   "id": "cap-alternativas",
   "tipo": "texto",
   "nav": "Introducción: copiar al cerebro",
   "kicker": "Acto III · 3 · 10⁹ neuronas de silicio",
   "titulo": "Copiar al cerebro",
   "bloques": [
    "**Otros caminos.** Si la fuerza bruta tiene límites físicos, ¿pueden ayudar las máquinas que imitan al cerebro o las que usan otra física?",
    "Hay dos caminos para cambiar las reglas del juego. El primero copia la organización del cerebro: los chips {{neuromórficos|g-neuromorfico}} ya suman miles de millones de neuronas de silicio que se comunican por impulsos, aunque apenas reúnen el 0,05 % de las sinapsis de un encéfalo.",
    "No apuntan a sustituir a los centros de datos. Su ventaja demostrada está donde mandan los eventos dispersos y la baja latencia (responder muy rápido), como en sensores, robótica o dispositivos implantables, y lo más probable es que funcionen como especialistas dentro de un ecosistema heterogéneo, es decir, de máquinas distintas.",
    {
     "nota": "Aprenderás cuánto les falta a los chips neuromórficos para igualar al encéfalo y dónde está su ventaja demostrada. Te ayudará repasar [II.3 · Chips neuromórficos](#m2t9-lec-ii3), [F5 · Orden de magnitud](#m2t1-lec-f5) y [F11 · Clases de cifras](#m2t2-lec-f11)."
    }
   ]
  },
  {
   "id": "dato-ev-15",
   "tipo": "dato",
   "nav": "Máquinas inspiradas en el cerebro",
   "titulo": "Máquinas inspiradas en el cerebro",
   "evidencia": "ev-15"
  },
  {
   "id": "lec-iii3",
   "tipo": "leccion",
   "codigo": "III.3",
   "nav": "III.3 · Copiar al cerebro",
   "titulo": "Copiar al cerebro: especialistas, no sustitutos",
   "pregunta": "¿Sustituirán los chips neuromórficos a los centros de datos?",
   "min": 8,
   "dim": "cnt",
   "sencillo": [
    "Los chips neuromórficos ([lección II.3](#m2t9-lec-ii3)) ya suman miles de millones de neuronas de silicio, pero apenas el 0,05 % de las sinapsis de un encéfalo. Les faltan unos 1,6 {{órdenes de magnitud|g-orden}} en neuronas y unos 3,3 en sinapsis: la figura de más abajo lo muestra.",
    "Su ventaja demostrada está en el *borde de la red*, cerca de donde se producen los datos: sensores, robótica, dispositivos implantables, donde mandan los **eventos escasos** y la *baja latencia* (responder muy rápido). Lo más probable es que funcionen como especialistas dentro de un ecosistema de máquinas distintas, no como sustitutos de los centros de datos.",
    "Una pista interesante: NorthPole, de IBM, no usa impulsos y aun así obtuvo una eficiencia 25 veces mayor que una {{GPU|g-cpu}} de tecnología comparable en una tarea de reconocimiento de imágenes [medido], y guarda toda la memoria de la red dentro del chip. Sugiere que el principio cerebral más rentable a corto plazo puede ser **acercar la memoria al cómputo**, por encima de imitar la neurona."
   ],
   "vida": [
    "Una bicicleta no sustituye a un tren de mercancías, pero para un trayecto corto por la ciudad es difícil de batir. Cada vehículo tiene su terreno; nadie espera que uno los reemplace a todos."
   ],
   "imagen": {
    "pie": "Cada máquina en su terreno.",
    "si": "Que las distintas arquitecturas se reparten tareas según sus ventajas.",
    "no": "Los terrenos no son fijos: cambian con la tecnología. Y el dibujo no compara tamaños ni capacidades reales.",
    "svg": "lec-iii3"
   },
   "ejemplo": {
    "enunciado": "¿Cuántos órdenes de magnitud le faltan al mayor sistema neuromórfico de chips dedicados?",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Darwin Monkey: más de 2 × 10⁹ neuronas y más de 10¹¹ sinapsis (declarado). Encéfalo: ~8,6 × 10¹⁰ neuronas y ~2 × 10¹⁴ sinapsis (referencias del recorrido)."
     ],
     [
      "**Qué significa cada número**",
      "Recuentos de unidades de silicio frente a recuentos biológicos estimados."
     ],
     [
      "**Qué unidades usa**",
      "Neuronas y sinapsis: cantidades sin unidad física."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Dividir para obtener cuántas veces más; el logaritmo de ese cociente da los órdenes de magnitud."
     ],
     [
      "**El cálculo**",
      "8,6 × 10¹⁰ ÷ 2 × 10⁹ = 43 → log₁₀ 43 ≈ 1,6 · 2 × 10¹⁴ ÷ 10¹¹ = 2.000 → log₁₀ 2.000 ≈ 3,3"
     ],
     [
      "**El resultado**",
      "Faltan ~1,6 órdenes en neuronas y ~3,3 en sinapsis."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Además, cada neurona y cada sinapsis de silicio son mucho más simples que las biológicas, y las cifras las declaran los desarrolladores. Escalar a ~10¹⁰ neuronas hacia mediados de la década de 2030 es solo una hipótesis, de muy baja confianza."
     ]
    ]
   },
   "prediccion": {
    "q": "¿Dónde ha demostrado su ventaja el cómputo neuromórfico?",
    "opciones": [
     "Entrenando grandes modelos de lenguaje",
     "En sensores y robots, con eventos escasos y respuesta rápida",
     "En simulaciones científicas de {{doble precisión|g-fp}}"
    ],
    "ok": 1,
    "porque": "En el borde de la red: sensores, robótica y dispositivos implantables, donde los eventos son escasos y la latencia importa (Kudithipudi et al., 2025)."
   },
   "actividad": "classify-specialists",
   "descubrir": [
    "Imitar al cerebro no garantiza ventaja en todo: su fuerza aparece cuando la tarea se parece a lo que el cerebro hace bien con poca energía, reaccionar a eventos dispersos. Para entrenar grandes modelos o simular en {{doble precisión|g-fp}}, otras arquitecturas siguen siendo las adecuadas."
   ],
   "error": {
    "mal": "«Como imitan al cerebro, los chips neuromórficos acabarán sustituyendo a los centros de datos.»",
    "bien": "Su ventaja demostrada se limita a cargas dispersas y de baja latencia; para otras tareas, no. Lo más probable es un ecosistema de especialistas."
   },
   "quiz": {
    "q": "¿Qué sugiere el resultado de NorthPole, que no usa impulsos?",
    "opciones": [
     {
      "t": "Que los impulsos son imprescindibles para ser eficiente",
      "fb": "NorthPole obtuvo su eficiencia sin impulsos."
     },
     {
      "t": "Que acercar la memoria al cómputo puede ser el principio cerebral más rentable a corto plazo",
      "fb": "Exacto: guardar toda la memoria de la red en el chip evita el viaje de datos más caro (lección II.1).",
      "ok": true
     },
     {
      "t": "Que NorthPole tiene más neuronas que Hala Point",
      "fb": "NorthPole no se describe en neuronas: es otra arquitectura."
     }
    ]
   },
   "clave": {
    "sencillo": "Los chips neuromórficos son especialistas para eventos escasos y respuesta rápida, no sustitutos.",
    "cientifico": "la escala neuromórfica máxima declarada (~2 × 10⁹ neuronas, >10¹¹ sinapsis) queda ~1,6 y ~3,3 órdenes por debajo del encéfalo; su ventaja demostrada se da en cargas dispersas y de baja latencia (Kudithipudi et al., 2025); NorthPole: 25× en cuadros/s/W sin impulsos (Modha et al., 2023)."
   },
   "profundizaSub": "cuántos órdenes faltan, escala declarada y comparaciones",
   "profundiza": [
    "Para ver cuánto falta conviene contar **órdenes de magnitud** ([lección F5](#m2t1-lec-f5)): de ~2 × 10⁹ neuronas a ~8,6 × 10¹⁰ hay 1,6 órdenes; de ~10¹¹ sinapsis a ~2 × 10¹⁴, 3,3.",
    "Para seguir:",
    {
     "ul": [
      "[Profundiza: escala declarada y comparaciones](#m2t9-fig-neuronas-y-sinapsis-frente-al-encefalo)",
      "[Trampa 6 · Una neurona de silicio no es una neurona](#m2t10-trampa-6)",
      "[Trampa 10 · Declarado no es medido](#m2t10-trampa-10)"
     ]
    }
   ]
  },
  {
   "id": "fig-neuronas-y-sinapsis-frente-al-encefalo",
   "tipo": "figura",
   "nav": "Neuronas y sinapsis frente al encéfalo",
   "titulo": "Neuronas y sinapsis frente al encéfalo",
   "sub": "Escala logarítmica. La distancia hasta el encéfalo cuenta cuántos órdenes de magnitud faltan.",
   "widget": "m2.fig-neuro",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuánto les falta a los mayores sistemas neuromórficos para igualar las neuronas y las sinapsis de un encéfalo?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Dos bloques con escala logarítmica: neuronas (de 10⁸ a 10¹²) y sinapsis (de 10¹⁰ a 10¹⁶)."
     ],
     [
      "Unidades",
      "Neuronas y sinapsis (biológicas o de silicio)."
     ],
     [
      "Colores, símbolos y formas",
      "Cuadrados: declarados por sus desarrolladores. Círculo hueco: hipótesis extrapolada (~10¹⁰ neuronas hacia 2035, confianza muy baja). Círculo lleno con barra: el encéfalo (estimado). Flechas «→»: «más de». Corchetes: distancia en órdenes de magnitud."
     ],
     [
      "La escala",
      "Logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Toca una fila o pasa el cursor por ella (también puedes recorrerlas con el tabulador) para leer cada dato y su fuente."
     ],
     [
      "Qué permite concluir",
      "Que el mayor sistema reúne ~2,3 % de las neuronas y ~0,05 % de las sinapsis de un encéfalo."
     ],
     [
      "Qué no permite concluir",
      "Comparar capacidades: las neuronas de silicio no equivalen a las biológicas ([trampa 6](#m2t10-trampa-6)) y las cifras son declaradas ([trampa 10](#m2t10-trampa-10))."
     ]
    ],
    "texto": []
   },
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Escala declarada y comparaciones",
     "bloques": [
      {
       "ul": [
        "SpiNNcloud, en servicio en la Universidad Técnica de Dresde desde 2025 · **35.000 chips** [declarado] · más de cinco millones de núcleos de procesador",
        "Clúster liderado por Lynxi en Hangzhou, según la prensa china · **>10¹⁰ neuronas** [declarado] · sin detalle del hardware ni del método (Du, 2026)",
        "NorthPole, de IBM, frente a una GPU de tecnología comparable · **25× cuadros/s/W** [medido] · Modha et al. (2023), sin impulsos"
       ]
      },
      "Escalar a ~10¹⁰ neuronas en chips dedicados hacia mediados de la década de 2030 es solo una hipótesis exploratoria, de muy baja confianza: su única base es que la escala máxima declarada casi se duplicó entre 2024 y 2025. El resultado de NorthPole, que prescinde de los impulsos, sugiere que el principio cerebral más rentable a corto plazo puede ser acercar la memoria al cómputo, por encima de imitar la neurona (Kudithipudi et al., 2025; Modha et al., 2023)."
     ]
    }
   ],
   "notas": [
    "**Para comparar con cautela.** La mayoría de las cifras de escala neuromórfica son declaraciones de los propios desarrolladores, y las métricas no siempre son homogéneas: unas cuentan neuronas en chips dedicados; otras, núcleos de procesador o neuronas simuladas por software. [Trampa 10 · Declarado no es medido](#m2t10-trampa-10)"
   ]
  },
  {
   "id": "cap-cubit",
   "tipo": "texto",
   "nav": "Introducción: del bit al cúbit",
   "kicker": "Acto III · 4 · 2⁵⁰ amplitudes",
   "titulo": "Del bit al cúbit",
   "bloques": [
    "**Cambiar de física.** El segundo camino no copia al cerebro: cambia las reglas. ¿Qué es un cúbit y en qué se diferencia de un bit?",
    "Un {{bit|g-bit}} es un interruptor: vale 0 o 1, y leerlo no lo altera. Un {{cúbit|g-cubit}} se parece más a una flecha que puede apuntar a cualquier punto de una esfera. Al medirlo da 0 o 1 al azar, con probabilidades que dependen de hacia dónde apunte, y la propia medición lo cambia.",
    "Su fuerza no está en «probar todas las respuestas a la vez», sino en la {{interferencia|g-interferencia}}: como las ondas, sus {{amplitudes|g-amplitud}} pueden sumarse o anularse. Su debilidad es el ruido, que borra la información en cuanto el entorno la roza. Por eso el reto de esta década es corregir errores.",
    {
     "nota": "Tres lecciones, una idea nueva en cada una: qué es un cúbit y qué hace la medición ([III.4](#m2t9-lec-iii4)), qué es la interferencia ([III.5](#m2t9-lec-iii5)) y por qué el ruido obliga a corregir errores ([III.6](#m2t9-lec-iii6)). Después, el simulador repasa las seis ideas paso a paso. Te ayudará repasar [D4 · Bits](#m2t3-lec-d4), [F2 · Potencias de diez](#m2t1-lec-f2) y [II.0 · Bits e interruptores](#m2t6-lec-ii0)."
    }
   ]
  },
  {
   "id": "dato-ev-16",
   "tipo": "dato",
   "texto": [
    {
     "nota": "Para leer la cifra que sigue: cada cúbit añadido duplica los números necesarios para describir el conjunto; n cúbits exigen 2ⁿ {{amplitudes|g-amplitud}}. Lo verás en las lecciones siguientes y en el paso 5 del [simulador](#m2t9-fig-un-bit-y-un-cubit-paso-a-paso). La coincidencia con el número de sinapsis es solo de orden de magnitud."
    }
   ],
   "nav": "Cúbits",
   "titulo": "Cúbits",
   "evidencia": "ev-16"
  },
  {
   "id": "lec-iii4",
   "tipo": "leccion",
   "codigo": "III.4",
   "nav": "III.4 · Del bit al cúbit",
   "titulo": "Del bit al cúbit: medir cambia lo medido",
   "pregunta": "¿Qué es un cúbit, y por qué no es «0 y 1 a la vez»?",
   "min": 10,
   "dim": "inf",
   "sencillo": [
    "Un **bit** vale 0 o 1, y leerlo no lo altera: puedes mirarlo cien veces y siempre dirá lo mismo. Un *{{cúbit|g-cubit}}* (bit cuántico) se describe mejor como una **flecha** que puede apuntar a cualquier punto de una esfera, la *{{esfera de Bloch|g-bloch}}*. Arriba está el estado |0⟩ y abajo, |1⟩ (la notación |…⟩, «ket», solo indica que es un estado cuántico).",
    "Al *medir* un cúbit se obtiene siempre 0 o 1, nunca un valor intermedio. El resultado sale al azar, con una probabilidad que depende de la inclinación de la flecha. Si la flecha apunta arriba, siempre 0; al ecuador, mitad y mitad; abajo, siempre 1. Y la medición **cambia** el cúbit: después queda en el resultado obtenido, y medirlo otra vez lo repite.",
    "Cuando la flecha está entre los polos se dice que el cúbit está en *{{superposición|g-superposicion}}*. Los números que describen la flecha se llaman {{amplitudes|g-amplitud}}; elevados al cuadrado, dan las probabilidades. La superposición no significa que «valga 0 y 1 a la vez» en un sentido aprovechable: de cada medición sale un solo bit. Para conocer las probabilidades hay que preparar el mismo estado muchas veces y medir cada copia."
   ],
   "vida": [
    "Imagina una veleta que puede apuntar en cualquier dirección, pero que, al mirarla, salta a «arriba» o a «abajo», con más probabilidad hacia donde estaba más inclinada, y se queda allí. Mirarla una vez no te dice cómo estaba; mirar muchas veletas preparadas igual, sí te da las proporciones."
   ],
   "imagen": {
    "pie": "La inclinación de la flecha fija las probabilidades de medir 0 o 1.",
    "si": "Que el estado de un cúbit se describe con una dirección, que medir da solo dos resultados posibles y que las probabilidades dependen de la inclinación.",
    "no": "La flecha es una representación matemática, no un objeto que «apunta» en el espacio de verdad. Y la veleta es clásica: el azar cuántico no se debe a que ignoremos una dirección oculta.",
    "svg": "lec-iii4"
   },
   "ejemplo": {
    "enunciado": "Un cúbit inclinado 60°.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Inclinación θ = 60°. Se miden 100 copias preparadas igual."
     ],
     [
      "**Qué significa cada número**",
      "θ es el ángulo entre la flecha y el polo |0⟩."
     ],
     [
      "**Qué unidades usa**",
      "Ángulos en grados; probabilidades como fracción o porcentaje."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Aplicar la regla de Born, P(0) = cos²(θ/2), y multiplicar por el número de copias."
     ],
     [
      "**El cálculo**",
      "cos(30°) ≈ 0,866 → P(0) ≈ 0,866² = 0,75 · P(1) = 0,25 · 100 copias → ~75 ceros y ~25 unos"
     ],
     [
      "**El resultado**",
      "75 % de ceros y 25 % de unos, con pequeñas variaciones al azar en cada tanda de 100."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Cada copia, al medirse, da un solo bit y queda en ese resultado. La información sobre θ solo aparece en las proporciones de muchas copias."
     ]
    ]
   },
   "prediccion": {
    "q": "Si la flecha apunta al ecuador (θ = 90°) y mides 100 copias, ¿qué obtendrás?",
    "opciones": [
     "100 ceros",
     "Unos 50 ceros y 50 unos, en orden al azar",
     "Cien resultados «0 y 1 a la vez»"
    ],
    "ok": 1,
    "porque": "Unos 50 y 50: con θ = 90°, P(0) = cos²(45°) = 0,5. Cada medición da un solo resultado."
   },
   "actividad": "qmeasure",
   "descubrir": [
    "Un cúbit medido es un bit. Lo especial no se ve en una medición aislada, sino en cómo evolucionan las amplitudes antes de medir: eso es la interferencia, la siguiente lección."
   ],
   "error": {
    "mal": "«Un cúbit vale 0 y 1 a la vez, así que guarda el doble de información que un bit.»",
    "bien": "Al medirlo se obtiene un solo bit, y de n cúbits pueden extraerse como mucho n bits ({{cota de Holevo|g-holevo}}). La superposición no es un almacén doble ([trampa 11](#m2t10-trampa-11))."
   },
   "quiz": {
    "q": "¿Qué ocurre al medir un cúbit inclinado 60°?",
    "opciones": [
     {
      "t": "Da el número 0,75",
      "fb": "La medición nunca da valores intermedios: da 0 o 1."
     },
     {
      "t": "Da 0 con un 75 % de probabilidad o 1 con un 25 %, y el cúbit queda en el resultado",
      "fb": "Exacto: P(0) = cos²(30°) = 0,75, y la medición lo deja en |0⟩ o |1⟩.",
      "ok": true
     },
     {
      "t": "Da 0 y 1 a la vez",
      "fb": "Cada medición da un único resultado."
     }
    ]
   },
   "clave": {
    "sencillo": "Medir un cúbit da un solo bit, al azar, y lo cambia.",
    "cientifico": "|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1; regla de Born: P(0) = |α|² = cos²(θ/2); tras medir, el estado queda en el resultado; de n cúbits se extraen como máximo n bits (cota de Holevo)."
   },
   "profundizaSub": "la regla de Born y las amplitudes",
   "profundiza": [
    "El resultado sale al azar, con una probabilidad que depende de la inclinación θ de la flecha: P(0) = cos²(θ/2). Es la *regla de Born*, la que usa el ejemplo resuelto.",
    "Matemáticamente, el estado es α|0⟩ + β|1⟩, donde α y β son *amplitudes*: números (pueden ser negativos o complejos) cuyos cuadrados dan las probabilidades.",
    {
     "formula": "|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1 · P(0) = |α|² = cos²(θ/2)"
    },
    "Para seguir:",
    {
     "ul": [
      "[Profundiza: las matemáticas del cúbit](#m2t9-fig-cinco-etapas-hacia-la-computacion-cuanti)",
      "[Trampa 11 · Superposición no es «0 y 1 a la vez»](#m2t10-trampa-11)"
     ]
    }
   ]
  },
  {
   "id": "lec-iii5",
   "tipo": "leccion",
   "codigo": "III.5",
   "nav": "III.5 · Interferencia",
   "titulo": "Interferencia: amplitudes que se suman o se anulan",
   "pregunta": "Si medir solo da un bit, ¿de dónde sale la ventaja de una computadora cuántica?",
   "min": 10,
   "dim": "inf",
   "sencillo": [
    "Cuando dos ondas se encuentran, se suman: si sus crestas coinciden, se **refuerzan**; si la cresta de una cae en el valle de la otra, se **anulan**. Es la *{{interferencia|g-interferencia}}*.",
    "Las {{amplitudes|g-amplitud}} de un cúbit se comportan de forma parecida. Pueden ser positivas o negativas, y cuando varios «caminos» llevan al mismo resultado, sus amplitudes se suman con su signo. La *{{puerta de Hadamard|g-hadamard}}*, H, lo muestra: aplicada a |0⟩ da amplitudes iguales para 0 y 1 (mitad y mitad al medir). Aplicada otra vez, las dos contribuciones que llevan a |1⟩ llegan con signos opuestos y se anulan: el cúbit vuelve a |0⟩ con certeza. Una moneda lanzada dos veces seguiría saliendo al azar.",
    "Los algoritmos cuánticos útiles organizan las interferencias para que las respuestas equivocadas se anulen y la correcta se refuerce. Eso solo es posible en problemas con una estructura adecuada, como factorizar números con el *{{algoritmo de Shor|g-shor}}* o simular moléculas. No consiste en «probar todas las respuestas a la vez»."
   ],
   "vida": [
    "Los auriculares con cancelación de ruido escuchan el ruido exterior y emiten una onda opuesta: cresta contra valle, las dos se anulan y llega el silencio. Es interferencia destructiva, hecha a propósito."
   ],
   "imagen": {
    "pie": "En fase, las ondas se refuerzan; con media onda de desfase, se anulan.",
    "si": "Que dos contribuciones pueden sumarse o cancelarse según su «fase», y que eso permite eliminar resultados.",
    "no": "Las amplitudes no son ondas de agua ni de sonido en el espacio: son números que describen probabilidades. La analogía vale para la suma con signo, no para la naturaleza física del cúbit.",
    "svg": "lec-iii5"
   },
   "ejemplo": {
    "enunciado": "Aplicar H dos veces a |0⟩.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Estado inicial |0⟩: amplitud 1 para 0 y 0 para 1. Regla de H: |0⟩ → (|0⟩ + |1⟩)/√2 y |1⟩ → (|0⟩ − |1⟩)/√2."
     ],
     [
      "**Qué significa cada número**",
      "Las amplitudes indican, al cuadrado, la probabilidad de cada resultado; 1/√2 ≈ 0,707."
     ],
     [
      "**Qué unidades usa**",
      "Sin unidades: son números puros."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Aplicar H dos veces y sumar las contribuciones que llegan a cada resultado, con su signo."
     ],
     [
      "**El cálculo**",
      "1.ª H: (0,707 ; 0,707) → 50 % y 50 % · 2.ª H: a 0 llegan 0,707 × 0,707 + 0,707 × 0,707 = 1; a 1 llegan 0,707 × 0,707 − 0,707 × 0,707 = 0"
     ],
     [
      "**El resultado**",
      "Tras dos H, el cúbit está en |0⟩ con certeza: 100 % de ceros."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Los dos caminos hacia |1⟩ se anularon: interferencia destructiva. Una moneda, en cambio, no tiene amplitudes con signo: lanzarla dos veces sigue siendo azar."
     ]
    ]
   },
   "prediccion": {
    "q": "Dos ondas iguales, desplazadas media onda (180°): ¿qué da su suma?",
    "opciones": [
     "Una onda el doble de alta",
     "Nada: se anulan",
     "Una onda igual que cada una"
    ],
    "ok": 1,
    "porque": "Se anulan: donde una tiene cresta, la otra tiene valle. Es la interferencia destructiva."
   },
   "actividad": "waves",
   "descubrir": [
    "La interferencia es el recurso del cúbit: permite cancelar caminos. Pero solo sirve si el problema tiene una estructura que permita organizar esas cancelaciones; por eso la ventaja cuántica se limita a problemas concretos."
   ],
   "error": {
    "mal": "«Una computadora cuántica prueba todas las respuestas a la vez y se queda con la buena.»",
    "bien": "Al medir se obtiene un solo resultado. La ventaja viene de diseñar interferencias que amplifiquen la respuesta correcta, y solo existe en problemas con la estructura adecuada ([trampa 11](#m2t10-trampa-11))."
   },
   "quiz": {
    "q": "¿Por qué aplicar H dos veces devuelve el cúbit a |0⟩ con certeza?",
    "opciones": [
     {
      "t": "Porque H no hace nada",
      "fb": "Una sola H sí hace algo: lleva |0⟩ a mitad y mitad."
     },
     {
      "t": "Porque las dos contribuciones que llegan a |1⟩ tienen signos opuestos y se anulan",
      "fb": "Exacto: interferencia destructiva en |1⟩ y constructiva en |0⟩.",
      "ok": true
     },
     {
      "t": "Porque medir entre las dos H lo devuelve a |0⟩",
      "fb": "No se mide entre las dos H; si se midiera, se destruiría la interferencia."
     }
    ]
   },
   "clave": {
    "sencillo": "La ventaja cuántica nace de la interferencia: amplitudes que se refuerzan o se anulan.",
    "cientifico": "H|0⟩ = (|0⟩ + |1⟩)/√2, H|1⟩ = (|0⟩ − |1⟩)/√2, H·H = I; los algoritmos cuánticos útiles (Shor, simulación) diseñan interferencia constructiva en las respuestas correctas."
   },
   "profundizaSub": "la puerta H en fórmulas",
   "profundiza": [
    "Las amplitudes no solo pueden ser positivas o negativas: también pueden ser números complejos.",
    {
     "formula": "H|0⟩ = (|0⟩ + |1⟩)/√2 · H|1⟩ = (|0⟩ − |1⟩)/√2 · H·H = I"
    },
    "Para seguir:",
    {
     "ul": [
      "[Profundiza: puertas e interferencia](#m2t9-fig-cinco-etapas-hacia-la-computacion-cuanti)",
      "[Trampa 11 · Superposición no es «0 y 1 a la vez»](#m2t10-trampa-11)"
     ]
    }
   ]
  },
  {
   "id": "lec-iii6",
   "tipo": "leccion",
   "codigo": "III.6",
   "nav": "III.6 · Ruido y corrección de errores",
   "titulo": "Ruido y corrección de errores: muchos cúbits físicos para uno lógico",
   "pregunta": "¿Por qué hacen falta miles o millones de cúbits si un algoritmo usa unos pocos cientos?",
   "min": 10,
   "dim": "cnt",
   "sencillo": [
    "El enemigo del cúbit es el *ruido*: cualquier roce del entorno degrada su estado. Es la *{{decoherencia|g-decoherencia}}*; la flecha se acorta y las probabilidades tienden al 50 %.",
    "La solución es la *corrección de errores*: repartir un *{{cúbit lógico|g-cubitl}}*, el que usa el algoritmo, entre muchos *{{cúbits físicos|g-cubitf}}*, los del aparato. Unos guardan los datos y otros hacen *comprobaciones de paridad* que delatan los errores sin leer la información: miden si los cúbits vecinos concuerdan entre sí, sin mirar qué valor guarda cada uno.",
    "La *distancia* d de un código indica cuántos errores tolera: más distancia, más protección y más cúbits. En el *{{código de superficie|g-codsup}}* de distancia d se usan 2d² − 1 cúbits físicos por cada cúbit lógico: 17, 49 y 97 para d = 3, 5 y 7. A cambio de usar más cúbits físicos, el error lógico baja, siempre que esos cúbits sean lo bastante buenos (que su error quede por debajo de un *umbral*).",
    "El siguiente reto son las {{puertas lógicas|g-puerta}} fiables. Y para romper la criptografía con el {{algoritmo de Shor|g-shor}}, las estimaciones piden muchos más cúbits de los que tienen hoy las máquinas."
   ],
   "vida": [
    "Si dictas un número importante por un teléfono con interferencias, lo repites tres veces: si una copia llega mal, las otras dos permiten corregirla. Repartir la información y comprobar coincidencias protege frente al ruido."
   ],
   "imagen": {
    "pie": "Código de superficie de distancia 3: nueve cúbits de datos y ocho de comprobación.",
    "si": "Que la redundancia y las comprobaciones permiten detectar y corregir errores, a costa de usar muchas más piezas.",
    "no": "Un cúbit no puede copiarse como un número dictado (lo prohíbe la mecánica cuántica), ni leerse sin alterarlo. Por eso la corrección cuántica no repite copias: mide paridades entre cúbits sin mirar los datos.",
    "svg": "lec-iii6"
   },
   "ejemplo": {
    "enunciado": "Cuántos cúbits físicos para guardar 100 cúbits lógicos con d = 7, y cuánto baja el error.",
    "pasos": [
     [
      "**Qué datos tenemos**",
      "Distancia d = 7; 100 cúbits lógicos; Λ = 2,14 (Willow, medido)."
     ],
     [
      "**Qué significa cada número**",
      "d mide cuántos errores tolera el código; Λ, cuánto mejora el error lógico por cada +2 en d."
     ],
     [
      "**Qué unidades usa**",
      "Cúbits (cantidad); Λ es un factor sin unidad."
     ],
     [
      "**Qué operación hacemos y por qué**",
      "Aplicar 2d² − 1 y multiplicar por los cúbits lógicos; para el error, dividir por Λ una vez por cada +2 en d desde d = 3."
     ],
     [
      "**El cálculo**",
      "2 × 7² − 1 = 97 · 97 × 100 = 9.700 cúbits físicos · de d = 3 a d = 7: dos pasos → error ÷ 2,14² ≈ ÷ 4,6"
     ],
     [
      "**El resultado**",
      "~9.700 cúbits físicos solo para guardar 100 cúbits lógicos, con un error lógico unas 4,6 veces menor que con d = 3."
     ],
     [
      "**Qué quiere decir, en palabras**",
      "Cálculo ilustrativo de esta edición, solo para la memoria: un computador real necesita otros recursos que esta cuenta omite, y otros códigos (qLDPC) usan menos cúbits por cúbit lógico."
     ]
    ]
   },
   "prediccion": {
    "q": "Si pasas de d = 3 a d = 7, ¿cuántos cúbits físicos necesita cada cúbit lógico?",
    "opciones": [
     "El doble",
     "Casi seis veces más: de 17 a 97",
     "Los mismos"
    ],
    "ok": 1,
    "porque": "De 17 a 97, casi seis veces más: crecen con d². A cambio, el error lógico baja."
   },
   "actividad": "surfcalc",
   "descubrir": [
    "Un cúbit lógico fiable cuesta decenas o cientos de cúbits físicos. Por eso las máquinas de 2026, con unos cien cúbits físicos de alta calidad (o hasta 448 átomos), están todavía a uno o dos órdenes de magnitud de la estimación más baja para Shor (~10⁴ cúbits) y a más distancia de las otras; el reto de la década son las puertas lógicas fiables."
   ],
   "error": {
    "mal": "«Una máquina de 1.000 cúbits puede ejecutar cualquier algoritmo que necesite 1.000 cúbits.»",
    "bien": "Los algoritmos cuentan cúbits lógicos; las máquinas anuncian cúbits físicos. Con corrección de errores, cada lógico consume decenas o cientos de físicos."
   },
   "quiz": {
    "q": "En el código de superficie, ¿cuántos cúbits físicos usa un cúbit lógico de distancia 5?",
    "opciones": [
     {
      "t": "25",
      "fb": "Esos son solo los de datos (d²). Faltan los d² − 1 de comprobación."
     },
     {
      "t": "49",
      "fb": "Exacto: 2 × 5² − 1 = 49.",
      "ok": true
     },
     {
      "t": "5",
      "fb": "d no es el número de cúbits, sino la distancia del código."
     }
    ]
   },
   "clave": {
    "sencillo": "Un cúbit lógico fiable se fabrica con muchos cúbits físicos ruidosos.",
    "cientifico": "código de superficie rotado: 2d² − 1 cúbits físicos por cúbit lógico; por debajo del umbral, el error lógico cae un factor Λ por cada +2 en d (Willow: Λ = 2,14)."
   },
   "profundizaSub": "tiempos de ruido, el umbral, NISQ y las estimaciones para Shor",
   "profundiza": [
    "**El ruido.** Dos tiempos caracterizan la decoherencia: T₁, cuánto tarda |1⟩ en relajarse a |0⟩, y T₂, cuánto tarda en perderse la fase.",
    "**La corrección.** Por debajo de un *umbral* de calidad, cada aumento de 2 en d divide el error lógico por un factor Λ; el procesador Willow, de Google, midió Λ = 2,14.",
    "En 2018, John Preskill llamó *{{NISQ|g-nisq}}* (*noisy intermediate-scale quantum*, cuántico ruidoso de escala intermedia) a los procesadores de unos 50 a pocos cientos de cúbits sin corrección. El siguiente reto son las puertas lógicas fiables: IBM prevé para 2029 Starling, con 10⁸ puertas lógicas sobre 200 cúbits lógicos (proyectado), y hacia 2033, Blue Jay. Las estimaciones para romper la criptografía con Shor van de menos de un millón de cúbits ruidosos (Gidney, 2025) a menos de 10⁵ con códigos *{{qLDPC|g-qldpc}}* (*quantum low-density parity-check*, de comprobación de paridad de baja densidad) y del orden de 10⁴ átomos; las tres proceden de preprints.",
    "Para seguir:",
    {
     "ul": [
      "[Profundiza: ruido, corrección y los hitos](#m2t9-fig-cinco-etapas-hacia-la-computacion-cuanti)",
      "[Trampa 10 · Declarado no es medido](#m2t10-trampa-10)"
     ]
    }
   ]
  },
  {
   "id": "fig-un-bit-y-un-cubit-paso-a-paso",
   "tipo": "figura",
   "nav": "Un bit y un cúbit, paso a paso",
   "titulo": "Un bit y un cúbit, paso a paso",
   "sub": "Seis pasos; cada uno añade una idea y trae sus propios controles. A la izquierda, un bit. A la derecha, un cúbit en la {{esfera de Bloch|g-bloch}}: puedes arrastrar la punta de la flecha.",
   "widget": "m2.fig-qubit",
   "guia": {
    "titulo": "Explícame esta figura desde cero · qué es cada parte del simulador",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿En qué se diferencia un cúbit de un bit, y qué ocurre al medirlo?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "A la izquierda, un bit: una bola que solo puede estar arriba (0) o abajo (1). A la derecha, la esfera de Bloch: un cúbit se dibuja como una flecha desde el centro; el polo norte es |0⟩ y el polo sur, |1⟩."
     ],
     [
      "Unidades",
      "Probabilidades en porcentaje; ángulos en grados (θ, la inclinación; φ, la fase); en el paso 5, número de amplitudes."
     ],
     [
      "Colores, símbolos y formas",
      "Rosa: información (bits y cúbits). La línea punteada desde la punta de la flecha hasta el eje vertical marca su altura, que fija las probabilidades. Las barras «medir 0 / medir 1» dan esas probabilidades; la cuadrícula de 100 casillas muestra 100 copias medidas (llenas: 0; huecas: 1)."
     ],
     [
      "La escala",
      "En el paso 5, una regla logarítmica (azul, de cantidad) muestra cuántas amplitudes hacen falta frente a las neuronas y sinapsis del encéfalo."
     ],
     [
      "Cómo se usa el control",
      "Avanza por los seis pasos con las pestañas o «Siguiente →». Cada paso trae sus controles, explicados en la «guía del paso» de arriba."
     ],
     [
      "Qué ocurre al cambiar una variable",
      "La guía del paso, debajo de las pestañas, se actualiza contigo y dice qué hacer, qué observar y qué conclusión es legítima."
     ],
     [
      "Cómo interpretar el resultado",
      "La altura de la punta decide las probabilidades: arriba del todo, 100 % de medir 0; en el ecuador, 50 %."
     ],
     [
      "Qué permite concluir",
      "Entender qué es la superposición, qué hace una medición, cómo interfieren las amplitudes y por qué el ruido obliga a corregir errores."
     ],
     [
      "Qué no permite concluir",
      "Que un cúbit «pruebe todas las respuestas a la vez» ([trampa 11](#m2t10-trampa-11)). La esfera es una representación matemática, no una imagen de cómo es físicamente un cúbit."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": []
  },
  {
   "id": "fig-cubits-para-un-algoritmo-de-shor-criptog",
   "tipo": "figura",
   "nav": "Cúbits para el algoritmo de Shor",
   "titulo": "Cúbits para un algoritmo de Shor criptográfico",
   "sub": "Estimaciones de recursos frente a las máquinas de 2026, en escala logarítmica. Las tres estimaciones proceden de preprints.",
   "widget": "m2.fig-shor",
   "guia": {
    "titulo": "Explícame esta gráfica desde cero · qué muestra, cómo se lee y qué no dice",
    "pares": [
     [
      "¿Qué pregunta responde?",
      "¿Cuántos cúbits físicos estiman los estudios recientes para romper la criptografía con el algoritmo de Shor, frente a las máquinas de 2026?"
     ],
     [
      "Qué representa cada eje o dimensión",
      "Eje horizontal: cúbits físicos, en escala logarítmica de 10 a 10⁷."
     ],
     [
      "Unidades",
      "Cúbits físicos (sin corrección de errores)."
     ],
     [
      "Colores, símbolos y formas",
      "Círculos con flecha «←»: estimaciones del tipo «menos de» (preprints). Raya: 26.000 átomos para la curva criptográfica P-256. Barra con rombo: máquinas de 2026 (98–448 cúbits, medido). Corchete: distancia de 448 a 10⁴ (×22)."
     ],
     [
      "La escala",
      "Logarítmica."
     ],
     [
      "Cómo se usa el control",
      "Toca una fila o pasa el cursor por ella (también puedes recorrerlas con el tabulador) para leer cada dato y su fuente."
     ],
     [
      "Qué permite concluir",
      "Que las estimaciones han bajado de ~10⁶ a ~10⁴ cúbits y que las máquinas actuales están a uno o dos órdenes de magnitud."
     ],
     [
      "Qué no permite concluir",
      "Que la criptografía vaya a romperse en una fecha concreta: son estimaciones de recursos en preprints, y hacen falta cúbits de calidad, no solo cantidad."
     ]
    ],
    "texto": []
   },
   "desplegables": [],
   "notas": [
    "Gidney (2025): menos de 10⁶ cúbits ruidosos para RSA-2048. Webster et al. (2026): menos de 10⁵ con códigos {{qLDPC|g-qldpc}}. Cain et al. (2026): {{Shor|g-shor}} a escala criptográfica con ~10⁴ átomos."
   ]
  },
  {
   "id": "fig-cinco-etapas-hacia-la-computacion-cuanti",
   "tipo": "figura",
   "nav": "Cinco etapas hacia la cuántica útil",
   "titulo": "Cinco etapas hacia la computación cuántica tolerante a fallos",
   "sub": "El campo pasó de demostrar la corrección de errores a obtener {{cúbits lógicos|g-cubitl}} y memorias por debajo del umbral. El reto de la década son las puertas lógicas fiables.",
   "widget": "m2.fig-etapas",
   "guia": null,
   "desplegables": [
    {
     "tipo": "lay3",
     "titulo": "Profundiza",
     "subtitulo": "Las matemáticas del cúbit, el ruido y los hitos",
     "bloques": [
      {
       "ol": [
        "**Estado de un cúbit***|ψ⟩ = α|0⟩ + β|1⟩, con |α|² + |β|² = 1*α y β son {{amplitudes|g-amplitud}}, números complejos. La regla de Born da las probabilidades de medir: P(0) = |α|² y P(1) = |β|².",
        "**Esfera de Bloch***α = cos(θ/2) · β = e^(iφ) · sen(θ/2)*La inclinación θ fija las probabilidades: P(0) = cos²(θ/2) = (1 + z)/2, donde z es la altura de la punta. La fase φ no cambia lo que se mide directamente, pero decide cómo interfieren las amplitudes tras una puerta.",
        "**Puertas e interferencia***H|0⟩ = (|0⟩ + |1⟩)/√2 · H|1⟩ = (|0⟩ − |1⟩)/√2 · H·H = I*En la esfera, la {{puerta de Hadamard|g-hadamard}} es un giro de 180° alrededor del eje que bisecta x y z. Aplicada dos veces, las dos contribuciones a |1⟩ llegan con signos opuestos y se anulan: el cúbit vuelve a |0⟩ con certeza. X, el «no» cuántico, es un giro de 180° alrededor del eje x.",
        "**Muchos cúbits***n cúbits → 2ⁿ amplitudes · al medir, como máximo n bits*Con {{entrelazamiento|g-entrelazamiento}}, el estado conjunto no puede describirse cúbit a cúbit, y simularlo exige seguir las 2ⁿ amplitudes: con 37 cúbits superan a las neuronas del encéfalo (2³⁷ ≈ 1,4 × 10¹¹) y con 47–50, a sus sinapsis. La {{cota de Holevo|g-holevo}} limita, sin embargo, la información extraíble a n bits.",
        "**Ruido***T₁: |1⟩ → |0⟩ · T₂: pérdida de la fase*La {{decoherencia|g-decoherencia}} acorta la flecha de Bloch: el estado se vuelve una mezcla y las probabilidades tienden al 50 %. Los tiempos T₁ (relajación) y T₂ (desfase) acotan cuántas puertas caben antes de que el estado se degrade.",
        "**Corrección de errores***código de superficie de distancia d: d² + (d² − 1) = 2d² − 1 cúbits físicos por cúbit lógico*En el {{código de superficie|g-codsup}} rotado son 17, 49 y 97 cúbits para d = 3, 5 y 7: d² guardan los datos y d² − 1 miden las comprobaciones de paridad que delatan los errores sin leer la información. Por debajo del umbral, el error lógico cae un factor Λ por cada aumento de 2 en d; Willow, con 105 cúbits superconductores, midió Λ = 2,14 [medido]."
       ]
      },
      "**Los hitos**",
      {
       "ul": [
        "**2018** · Preskill acuña {{NISQ|g-nisq}} para los procesadores de unos 50 a pocos cientos de cúbits sin corrección de errores, útiles para investigar y limitados por el ruido",
        "**2025** · Willow, de Google: memoria lógica por debajo del umbral del código de superficie y ecos cuánticos verificables [medido]",
        "**jul. 2026** · IBM y la Universidad de Chicago declaran ventaja cuántica en circuitos lógicos: 70 cúbits lógicos, 468 puertas T, ~15 minutos, en un preprint [declarado]",
        "**2029** · Starling, de IBM: 10⁸ puertas lógicas sobre 200 cúbits lógicos [proyectado]",
        "**2033+** · Blue Jay, de IBM: 10⁹ puertas sobre hasta 2.000 cúbits lógicos [proyectado]"
       ]
      },
      "Helios, de Quantinuum, tiene 98 cúbits de iones de bario con conectividad total y fidelidades medias de 99,9975 % en una puerta y 99,921 % en dos (Ransford et al., 2026); los 48 cúbits lógicos con corrección y los 94 y 50 con solo detección proceden de la empresa (Quantinuum, 2025). Bluvstein et al. (2026) presentaron una arquitectura de átomos neutros de hasta 448 átomos, y Paetznick et al. (2026), mejoras de 11 a 800 veces en las tasas de error lógico.",
      "Cain et al. (2026) estiman que con 26.000 átomos la curva P-256 se resolvería en pocos días y RSA-2048 llevaría entre diez y cien veces más; esa tendencia justifica la migración a la criptografía poscuántica. Si las hojas de ruta se cumplen, un supuesto de baja confianza, hacia 2036 podrían operar máquinas con cientos a pocos miles de cúbits lógicos, acopladas como coprocesadores a sistemas de alto rendimiento para simular química y materiales."
     ]
    }
   ],
   "notas": [
    "**Para comparar con cautela.** La {{superposición|g-superposicion}} no es «0 y 1 a la vez». Un cúbit no prueba todas las respuestas en paralelo: al medirlo da un único resultado, y de n cúbits no pueden extraerse más de n bits. La ventaja aparece solo en problemas con una estructura que la interferencia pueda aprovechar, como la factorización con el algoritmo de Shor o la simulación de moléculas. [Trampa 11 · Superposición no es «0 y 1 a la vez»](#m2t10-trampa-11) · [Trampa 10 · Declarado no es medido](#m2t10-trampa-10)"
   ]
  },
  {
   "id": "hasta-aqui",
   "tipo": "texto",
   "nav": "Hasta aquí",
   "kicker": "Resumen del Acto III",
   "titulo": "Hasta aquí sabemos que…",
   "bloques": [
    {
     "ul": [
      "Comparar potencias no mide eficiencia. Con la convención central, la razón de energía por operación ronda 10³ frente a la supercomputación FP64, pero cambia con la convención (lo viste en la [lección III.1](#m2t8-lec-iii1), en el Taller 8).",
      "El entrenamiento de IA ronda 10²⁷ FLOP y podría acercarse a 2 × 10²⁹ hacia 2030 si la energía, los chips y el capital lo permiten ([lección III.2](#m2t8-lec-iii2), en el Taller 8).",
      "Un cúbit no es un bit doble: su recurso es la interferencia, y su enemigo, el ruido. Neuromórfica y cuántica avanzan como especialistas, no como sustitutos."
     ]
    },
    "**Para terminar.** Entonces, ¿qué nos llevamos? Lo verás en el [Taller 10](#m2t10)."
   ]
  },
  {
   "id": "cierre",
   "tipo": "cierre",
   "nav": "Para el grupo",
   "titulo": "Para hacer en grupo",
   "actividades": [
    {
     "t": "Medir cúbits con dos monedas",
     "min": 20,
     "d": [
      "Una simulación de mesa de lo que se ve al medir muchas copias de un cúbit inclinado 60°: cada copia da un solo bit, y solo las proporciones de muchas copias revelan la inclinación ([lección III.4](#m2t9-lec-iii4)).",
      "Materiales: dos monedas por pareja y una pizarra para sumar resultados."
     ],
     "pasos": [
      "Formen parejas. Cada lanzamiento de una pareja es **una copia** de un cúbit inclinado 60°, preparada igual que todas las demás. Según la [lección III.4](#m2t9-lec-iii4), al medirla da 0 con un 75 % de probabilidad y 1 con un 25 %.",
      "Para «medir» una copia, la pareja lanza sus dos monedas: si salen dos caras, el resultado es 1; si sale cualquier otra combinación, 0. *Cálculo ilustrativo:* dos caras salen una vez de cada cuatro (½ × ½ = ¼), es decir, un 25 % de las veces.",
      "Anoten cada resultado. Si alguien pide «medir otra vez» una copia ya medida, se repite lo anotado sin lanzar: la medición ya cambió el cúbit, que quedó en el resultado obtenido.",
      "Repitan hasta reunir unas 100 copias entre todo el grupo y sumen en la pizarra los ceros y los unos. Comparen con los ~75 ceros y ~25 unos del ejemplo resuelto: habrá pequeñas variaciones al azar.",
      "Conversen: ¿qué podían saber de la inclinación con una sola copia? ¿Y con cien? ¿Por qué el resultado de cada copia no es «0 y 1 a la vez»?"
     ],
     "nota": "Las monedas son un juego clásico: sirven para contar copias y proporciones, pero no imitan la interferencia ni el azar cuántico. Como advierte la [lección III.4](#m2t9-lec-iii4), el azar cuántico no se debe a que ignoremos una dirección oculta. Para la discusión final, repasen la [trampa 11](#m2t10-trampa-11)."
    },
    {
     "t": "Una cuerda de órdenes de magnitud",
     "min": 20,
     "d": [
      "Una regla logarítmica en el suelo o en la pizarra para ver, contando saltos de diez en diez, cuánto les falta a los chips neuromórficos y a las máquinas cuánticas.",
      "Materiales: una cuerda o una tira de papel de unos 3 m, cinta adhesiva, un rotulador y diez tarjetas, cada una con una cifra del taller y su marca:",
      {
       "ul": [
        "Hala Point: 1,15 × 10⁹ neuronas de silicio [declarado]",
        "Darwin Monkey: más de 2 × 10⁹ neuronas [declarado]",
        "Darwin Monkey: más de 10¹¹ sinapsis [declarado]",
        "El encéfalo: ~8,6 × 10¹⁰ neuronas [estimado]",
        "El encéfalo: ~2 × 10¹⁴ sinapsis [estimado]",
        "Helios, máquina cuántica de 2026: 98 cúbits físicos [medido]",
        "Arquitectura de átomos de 2026: hasta 448 cúbits físicos [medido]",
        "Algoritmo de Shor, estimación de Cain et al. (2026): ~10⁴ cúbits físicos (preprint)",
        "Algoritmo de Shor, estimación de Webster et al. (2026): menos de 10⁵ cúbits físicos (preprint)",
        "Algoritmo de Shor, estimación de Gidney (2025): menos de 10⁶ cúbits ruidosos (preprint)"
       ]
      }
     ],
     "pasos": [
      "Tiendan la cuerda o la tira de papel y marquen en ella, a distancias iguales (unos 20 cm), 10, 10², 10³… hasta 10¹⁵. Cada marca vale diez veces la anterior: es una {{escala logarítmica|g-log}}.",
      "Repartan las tarjetas: una por persona o por pareja; si sobran personas, que comprueben las posiciones. Cada cual cuelga su tarjeta en su sitio. Pista para las cifras que no son una potencia de diez justa: un «2 ×» va a unas tres décimas del tramo hasta la marca siguiente; un «5 ×», a unas siete décimas, y un «8 ×», casi en la marca siguiente (*cálculo ilustrativo*: log₁₀ 2 ≈ 0,3; log₁₀ 5 ≈ 0,7; log₁₀ 8 ≈ 0,9).",
      "Cuenten los saltos entre parejas de tarjetas y compárenlos con el taller: de Darwin Monkey al encéfalo faltan ~1,6 órdenes en neuronas y ~3,3 en sinapsis; de 448 cúbits a 10⁴ hay un factor ×22.",
      "Conversen: ¿qué distancia parece más difícil de recorrer? ¿Por qué el número de neuronas de silicio no dice qué problemas resuelve un sistema? ¿Por qué los algoritmos cuentan cúbits lógicos y las máquinas anuncian cúbits físicos?"
     ],
     "nota": "Recuerden las marcas de cada tarjeta: casi todas las cifras neuromórficas las declaran sus fabricantes ([trampa 10](#m2t10-trampa-10)) y una neurona de silicio no es una neurona ([trampa 6](#m2t10-trampa-6)). Las estimaciones para Shor proceden de preprints."
    }
   ]
  }
 ],
 "capitulos_fuente": [
  "hacia-fuera",
  "alternativas",
  "cubit"
 ]
});
})();
