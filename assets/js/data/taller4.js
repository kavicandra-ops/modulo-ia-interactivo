/* Taller 4 (2000–2026): Máquinas de bolsillo, la nube y la IA */
(function () {
  'use strict';
  window.M = window.M || {};
  (window.M.talleres = window.M.talleres || []).push({
    n: 4,
    slug: 'taller4',
    titulo: 'Máquinas de bolsillo, la nube y la IA',
    periodo: '2000–2026',
    objeto: 'telefono',
    objetoNombre: 'El teléfono inteligente',
    corto: 'Bolsillo',
    intro: 'En el siglo XXI la computadora cupo en el bolsillo y se conectó a enormes centros de datos. Cuando los procesadores dejaron de acelerar subiendo la frecuencia, la industria multiplicó los núcleos y apostó por chips especializados; esa potencia, unida a datos masivos, impulsó el auge de la IA. Hoy la computación es también un asunto de geopolítica, energía y derechos.',
    pregunta: '¿Cómo llegamos a llevar en el bolsillo una computadora que conversa?',
    ficha: {
      periodo: '2000–2026.',
      objeto: 'Un teléfono inteligente sin botones conectado a la nube.',
      objetivos: [
        'Explicar por qué la industria pasó de subir la frecuencia a multiplicar núcleos y usar chips especializados.',
        'Describir la jerarquía de memoria y las partes de un teléfono inteligente y de un servidor de IA.',
        'Explicar con palabras sencillas cómo aprende una red neuronal y qué es un modelo de lenguaje.',
        'Analizar el papel de empresas y gobiernos en los chips y en la regulación de la IA, incluido el caso colombiano.'
      ]
    },
    secciones: [
      {
        id: 'linea', tipo: 'linea', icon: 'linea', nav: 'Línea de tiempo',
        titulo: 'Línea de tiempo, 2004–2026',
        eventos: [
          { a: '2004–2005', h: 'Intel cancela su Pentium 4 de 4 GHz y llegan los primeros procesadores de doble núcleo (Hachman, 2004; Hennessy y Patterson, 2019)', p: 'Termina la carrera de la frecuencia', t: 'm' },
          { a: '2006', h: 'Amazon lanza sus servicios de nube S3 y EC2; Nvidia presenta CUDA (Barr, 2006, 2014; Dobson, 2006)', p: 'El cómputo se alquila; la GPU sirve para cálculo general', t: 'ms' },
          { a: '2007', h: 'Apple presenta el iPhone (Apple, 2007)', p: 'El teléfono se vuelve computadora', t: 'm' },
          { a: '2008', h: 'Abre la App Store con más de 500 aplicaciones; sale el primer teléfono con Android (Apple, 2008; T-Mobile, 2008)', p: 'Nacen los ecosistemas de aplicaciones', t: 'ms' },
          { a: '2009', h: 'Se publica la base de imágenes ImageNet (Deng et al., 2009)', p: 'Datos masivos para entrenar visión artificial', t: 'i' },
          { a: '2012', h: 'La red AlexNet gana el concurso ImageNet entrenada con GPU (Krizhevsky et al., 2012)', p: 'Arranca el auge del aprendizaje profundo', t: 'i' },
          { a: '2014', h: 'Microsoft compra el negocio de celulares de Nokia (Microsoft, 2014)', p: 'El líder del celular clásico pierde la era del teléfono inteligente', t: 's' },
          { a: '2016', h: 'AlphaGo vence a Lee Sedol en el juego de go; Google presenta su chip TPU (Silver et al., 2016; Jouppi et al., 2017)', p: 'La IA domina un juego de intuición; llegan chips hechos para IA', t: 'im' },
          { a: '2017', h: 'Se publica la arquitectura Transformer (Vaswani et al., 2017)', p: 'Base de los modelos de lenguaje actuales', t: 'i' },
          { a: '2019', h: 'Premio Turing a Bengio, Hinton y LeCun; Colombia aprueba el CONPES 3975 (Association for Computing Machinery [ACM], 2019; CONPES, 2019)', p: 'Reconocimiento al aprendizaje profundo; primera política colombiana que incluye la IA', t: 'il' },
          { a: '2020', h: 'GPT-3, con 175.000 millones de parámetros; Apple pasa de Intel a sus propios chips (Brown et al., 2020; Apple, 2020)', p: 'Modelos gigantes; Intel pierde un cliente emblemático', t: 'ims' },
          { a: '2022', h: 'EE. UU. aprueba la Ley CHIPS y restringe la exportación de chips avanzados a China; OpenAI lanza ChatGPT (The White House, 2022; Bureau of Industry and Security [BIS], 2022; OpenAI, 2022)', p: 'Los chips se vuelven geopolítica y la IA llega al gran público', t: 'si' },
          { a: '2023', h: 'OpenAI lanza GPT-4 (OpenAI, 2023)', p: 'Modelos que combinan texto e imagen', t: 'i' },
          { a: '2024', h: 'Se publica la Ley de IA de la Unión Europea; Nobel de Física para Hopfield y Hinton, y de Química para Baker, Hassabis y Jumper (European Parliament y Council of the European Union, 2024; Royal Swedish Academy of Sciences, 2024a, 2024b)', p: 'Primera ley integral de IA; la IA entra a la ciencia premiada', t: 'si' },
          { a: '2025', h: 'DeepSeek-R1 sacude a Nvidia; Colombia aprueba el CONPES 4144; Nvidia supera los 5 billones de dólares en bolsa; EE. UU. compra el 9,9 % de Intel (DeepSeek, 2025; CONPES, 2025; Axios, 2025; Intel, 2025)', p: 'Competencia global, política nacional de IA y Estado accionista', t: 'isl' },
          { a: '2026', h: 'Se lanza Latam-GPT; la Ley de IA europea entra en aplicación general (Centro Nacional de Inteligencia Artificial [CENIA], 2026; European Commission, 2026)', p: 'La región crea su propio modelo; la regulación se vuelve realidad', t: 'ls' }
        ]
      },
      {
        id: 'conceptos', tipo: 'conceptos', icon: 'conceptos', nav: 'Conceptos',
        titulo: 'Conceptos fundamentales',
        desc: 'Diez ideas para entender el teléfono, la nube y la IA de hoy.',
        items: [
          { t: 'El muro de la potencia', d: 'Subir más la frecuencia calentaba demasiado los chips. En 2004 Intel canceló su Pentium 4 de 4 GHz y en 2005 llegaron los procesadores de doble núcleo (Hachman, 2004). El escalado de Dennard se frenó desde 2007 y casi desapareció hacia 2012 (Hennessy y Patterson, 2019). Ejemplo: en vez de una cocinera que pica cada vez más rápido, varias cocineras que trabajan a la vez.' },
          { t: 'Sistema en un chip', d: 'En un teléfono, el procesador de varios núcleos, los gráficos, el módem y un acelerador de IA comparten una sola pieza de silicio. Casi todos usan diseños de la empresa británica Arm, que afirma estar en el 99 % de los teléfonos inteligentes (Arm, s. f.).' },
          { t: 'La nube', d: 'Computadoras ajenas, en grandes centros de datos, que se alquilan por uso a través de Internet (Barr, 2014). Ejemplo: como el acueducto: no hace falta un pozo propio, se paga por lo que se consume.' },
          { t: 'GPU y cálculo en paralelo', d: 'Una CPU tiene pocos núcleos muy versátiles; una GPU tiene miles de núcleos sencillos que repiten la misma operación sobre muchos datos a la vez. Ejemplo: un profesor que resuelve problemas difíciles frente a un estadio lleno de estudiantes haciendo sumas al mismo tiempo. Desde 2006 la plataforma CUDA permitió usar las GPU para cálculo general (Dobson, 2006).', lab: 'gpu' },
          { t: 'Aprendizaje automático', d: 'En lugar de escribir reglas, se muestran muchos ejemplos y el sistema ajusta sus números internos para equivocarse menos. Ejemplo: aprender a reconocer frutas viendo miles de fotos etiquetadas, no leyendo una definición.' },
          { t: 'Red neuronal profunda', d: 'Una red con muchas capas: las primeras detectan bordes, las siguientes formas y las últimas objetos completos (LeCun et al., 2015).' },
          { t: 'Parámetros', d: 'Los números ajustables de una red, como perillas de una consola de sonido. GPT-3 tenía 175.000 millones (Brown et al., 2020).' },
          { t: 'Modelo de lenguaje y Transformer', d: 'Un modelo de lenguaje predice el siguiente fragmento de texto, o *token*, a partir de los anteriores. Cada token se representa con una lista de miles de números que lo ubica en un «mapa» de significados, donde palabras parecidas quedan cerca. El Transformer (2017) usa un mecanismo de «atención» para decidir qué partes del texto pesan más en cada predicción (Vaswani et al., 2017). Ejemplo: el autocompletado del celular, pero entrenado con muchísimo más texto y capaz de seguir instrucciones.', lab: 'autocompletar' },
          { t: 'Alucinaciones y sesgos', d: 'Como produce texto plausible, un modelo puede afirmar falsedades con total seguridad, a lo que se llama «alucinación». También puede reproducir prejuicios de sus datos. Por eso sus respuestas se verifican.' },
          { t: 'Memoria de gran ancho de banda (HBM)', d: 'Los chips de IA mueven cantidades enormes de datos, así que se rodean de pilas de memoria DRAM conectadas verticalmente y montadas junto al procesador. El estándar HBM4, publicado en 2025, llega a unos 2 terabytes por segundo (TB/s) por pila (JEDEC, 2025).' }
        ],
        labs: [
          { id: 'gpu', n: 'Profesor frente a estadio' },
          { id: 'autocompletar', n: 'Un autocompletado de juguete' }
        ]
      },
      {
        id: 'memoria', tipo: 'memoria', icon: 'memoria', nav: 'Jerarquía de memoria',
        titulo: 'La jerarquía de memoria, explicada con una cocina',
        desc: 'Si leer un registro tomara un segundo, traer un dato de Internet tomaría años: por eso la computadora intenta tener cerca lo que va a usar. Toque cada nivel.',
        textos: [
          'Ninguna memoria es a la vez rápida, grande y barata. Por eso la computadora combina varias: arriba, pequeñas y rapidísimas; abajo, enormes, lentas y baratas. Todo funciona bien porque los datos que se van a usar suben a tiempo, como quien saca de la alacena lo que va a cocinar.',
          'Cada nivel usa una tecnología distinta. La caché usa celdas de varios transistores por bit; la RAM guarda cada bit en un diminuto condensador que hay que recargar; la memoria flash atrapa cargas que permanecen sin energía; y el disco duro magnetiza un plato que gira. En los servidores de IA se suma la HBM, pegada al procesador.'
        ],
        pie: 'Jerarquía de memoria · valores aproximados; escala humana = cada tiempo multiplicado por unos 3.000 millones.'
      },
      {
        id: 'maquina', tipo: 'maquinas', icon: 'maquina', nav: 'Por dentro',
        titulo: 'Por dentro de la máquina',
        desc: 'La anatomía de un teléfono inteligente: toque cada pieza. Después, un servidor de IA por dentro.',
        anatomia: 'telefono',
        partes: [
          { k: 'soc', t: 'Sistema en un chip', d: 'Reúne CPU de varios núcleos, GPU, acelerador de IA y módem', a: 'Una cocina completa en un solo mueble' },
          { k: 'ram', t: 'Memoria RAM', d: 'Mantiene abiertas las aplicaciones en uso', a: 'El mesón' },
          { k: 'flash', t: 'Almacenamiento flash', d: 'Guarda fotos, mensajes y aplicaciones sin necesidad de energía', a: 'La alacena' },
          { k: 'sensores', t: 'Sensores (cámaras, GPS, acelerómetro, micrófono, huella)', d: 'Perciben el entorno y a la persona', a: 'Los sentidos' },
          { k: 'modem', t: 'Módem y antenas', d: 'Conectan con la red móvil y el wifi', a: 'La línea telefónica de la casa' },
          { k: 'bateria', t: 'Batería y gestión de energía', d: 'Alimentan el equipo y racionan el consumo', a: 'El tanque de gas' },
          { k: 'pantalla', t: 'Pantalla táctil', d: 'Muestra información y recibe órdenes con el dedo', a: 'Ventana y tablero a la vez' }
        ],
        notas: [
          { t: 'Un servidor de IA por dentro', d: 'Su corazón son aceleradores como la GPU Blackwell de Nvidia, con 208.000 millones de transistores repartidos en dos piezas de silicio (Nvidia, 2024). Cada uno va rodeado de pilas de HBM, y decenas de ellos trabajan conectados entre sí. Todo eso exige mucha refrigeración y energía: un centro de datos típico dedicado a la IA consume tanta electricidad como 100.000 hogares (International Energy Agency [IEA], 2025).', wide: true }
        ]
      },
      {
        id: 'ia', tipo: 'ia', icon: 'hilo', nav: 'Hilo de la IA',
        titulo: 'El hilo de la IA: del aprendizaje profundo a la IA generativa (2000–2026)',
        items: [
          { a: '2009–2012', t: 'Se juntan los tres ingredientes', d: 'ImageNet reunió más de 3 millones de imágenes etiquetadas en 2009, y hoy supera los 14 millones (Deng et al., 2009; ImageNet, s. f.). En 2012 AlexNet, entrenada de cinco a seis días en dos GPU para videojuegos, redujo el error del concurso al 15,3 %, frente al 26,2 % del segundo lugar (Krizhevsky et al., 2012).', e: 'c', datos: { u: '% de error', max: 30, filas: [['AlexNet (2012)', 15.3], ['Segundo lugar', 26.2, true]], nota: 'Menos es mejor.' } },
          { a: '2012–2019', t: 'Del laboratorio a la vida diaria', d: 'El aprendizaje profundo mejoró el reconocimiento de voz, la traducción automática y la búsqueda de fotos (LeCun et al., 2015). En 2019 sus pioneros, Yoshua Bengio, Geoffrey Hinton y Yann LeCun, recibieron el Premio Turing (ACM, 2019).', e: 'c' },
          { a: '2016', t: 'Juegos y chips propios', d: 'En marzo de 2016 AlphaGo venció 4 a 1 al campeón Lee Sedol en go, un juego con más posiciones posibles que el ajedrez (Silver et al., 2016). Ese año Google presentó su TPU, un chip para IA entre 15 y 30 veces más rápido que los procesadores de su tiempo en esas tareas (Jouppi et al., 2017).', e: 'c' },
          { a: 'Desde 2010', t: 'La explosión del cómputo', d: 'El cómputo usado para entrenar los modelos más avanzados creció entre 4 y 5 veces por año desde 2010 (Sevilla y Roldán, 2024).' },
          { a: '2022', t: 'ChatGPT', d: 'Lanzado el 30 de noviembre de 2022, alcanzó unos 100 millones de usuarios mensuales en dos meses, según un análisis del banco UBS; a TikTok le tomó unos nueve meses (OpenAI, 2022; Hu, 2023).', e: 'c', datos: { u: 'meses', max: 10, filas: [['ChatGPT: 100 millones de usuarios', 2], ['TikTok: 100 millones de usuarios', 9, true]], nota: 'Meses para llegar a unos 100 millones de usuarios mensuales.' } },
          { a: '2024', t: 'La ciencia premiada', d: 'El Nobel de Física reconoció a John Hopfield y Geoffrey Hinton por las bases del aprendizaje con redes neuronales. El de Química premió a David Baker por el diseño de proteínas y a Demis Hassabis y John Jumper por predecir su estructura con AlphaFold, usado ya por más de dos millones de personas en 190 países (Royal Swedish Academy of Sciences, 2024a, 2024b).' },
          { a: '2025', t: 'Modelos abiertos y competencia global', d: 'El 20 de enero de 2025 la empresa china DeepSeek publicó su modelo R1 con pesos abiertos. El 27 de enero las acciones de Nvidia cayeron 17 % y la empresa perdió unos 589.000 millones de dólares en valor, la mayor pérdida de valor de una empresa en un solo día en la historia bursátil (DeepSeek, 2025; Saul, 2025).' },
          { a: '2022–2025', t: 'IA más barata y más presente', d: 'Usar un modelo del nivel de GPT-3.5 se volvió más de 280 veces más barato entre finales de 2022 y finales de 2024 (Maslej, 2025). Con el uso creció el registro de incidentes: en 2025 se reportó un récord de 362 incidentes de IA (Stanford Institute for Human-Centered Artificial Intelligence [Stanford HAI], 2026).' }
        ],
        leccion: {
          t: 'La lección de la época',
          d: 'Las redes neuronales que Rosenblatt imaginó en 1958 triunfaron cuando por fin coincidieron los tres ingredientes: algoritmos mejores, datos masivos de Internet y chips capaces de cálculo paralelo.',
          ingredientes: true
        }
      },
      {
        id: 'sociedad', tipo: 'sociedad', icon: 'sociedad', nav: 'Sociedad',
        titulo: 'Contexto social, económico y político',
        items: [
          { t: 'Nuevos gigantes, viejos líderes en apuros', d: 'Nokia, que dominó el celular clásico, vendió su negocio de teléfonos a Microsoft en 2014 (Microsoft, 2014). Intel perdió terreno en móviles y en 2020 Apple dejó sus procesadores por chips propios (Apple, 2020). Nvidia, en cambio, fue en octubre de 2025 la primera empresa en valer 5 billones de dólares, es decir, cinco millones de millones (Axios, 2025).', l: 'g' },
          { t: 'El Estado vuelve a la industria', d: 'La Ley CHIPS de EE. UU. (2022) destinó 52.700 millones de dólares a los semiconductores (The White House, 2022). En agosto de 2025 el gobierno estadounidense compró el 9,9 % de Intel por 8.900 millones (Intel, 2025), y en 2026 la empresa reportó su mayor crecimiento de ingresos en más de quince años (Intel, 2026).', l: 'f' },
          { t: 'La geopolítica de los chips', d: 'Con datos de 2019, el 92 % de la capacidad mundial para fabricar los chips más avanzados estaba en Taiwán, sobre todo en TSMC (Varas et al., 2021). La neerlandesa ASML es la única que fabrica las máquinas de litografía EUV, que cuestan desde unos 220 millones de dólares (Tarasov, 2025). Desde 2022 EE. UU. restringe la venta de chips avanzados a China, y en enero de 2026 pasó a revisar caso por caso algunos modelos, con condiciones (BIS, 2022, 2026). La Unión Europea apuntó al 20 % de la producción mundial para 2030 con su propia ley de chips, una meta que su tribunal de cuentas considera muy improbable (European Commission, 2024; European Court of Auditors, 2025).', l: 'fg' },
          { t: 'Energía', d: 'Los centros de datos consumieron unos 415 TWh en 2024, cerca del 1,5 % de la electricidad mundial, y la AIE proyecta que esa cifra se duplique hacia 2030 (IEA, 2025). En 2025 su consumo creció 17 % (IEA, 2026). La demanda de servidores de IA también presiona los precios de la memoria y encarece computadoras y celulares (TrendForce, 2026).', l: 'x' },
          { t: 'Brecha digital', d: 'En 2025 unos 6.000 millones de personas usaban Internet, cerca de tres cuartas partes de la población, y 2.200 millones seguían desconectadas. Usaba Internet el 94 % de la población en países de ingreso alto y el 23 % en los de ingreso bajo (International Telecommunication Union [ITU], 2025).', l: 'x', datos: { u: '%', max: 100, filas: [['Usa Internet: países de ingreso alto', 94], ['Usa Internet: países de ingreso bajo', 23]] } },
          { t: 'Trabajo', d: 'El FMI estimó que casi el 40 % del empleo mundial está expuesto a la IA (Georgieva, 2024). La OIT calculó que uno de cada cuatro trabajadores tiene alguna exposición a la IA generativa, con mayor exposición en empleos de mujeres (Gmyrek et al., 2025). En EE. UU., el empleo de jóvenes de 22 a 25 años en los oficios más expuestos quedó 19 % por debajo de lo esperado a mediados de 2026, sobre todo por menos contrataciones; los autores lo presentan como un hallazgo descriptivo, no causal (Brynjolfsson et al., 2026).', l: 'x' },
          { t: 'Información y democracia', d: 'En las elecciones de 2024 no hubo evidencia de que la desinformación con IA cambiara resultados, pero sí contaminó el ambiente informativo y sirvió para atacar a candidatas con montajes sexuales (Stockwell et al., 2024). El Informe Internacional sobre la Seguridad de la IA de 2026 concluyó que el contenido generado por IA ya persuade tanto como el escrito por personas (International AI Safety Report, 2026).', l: 'x' }
        ]
      },
      {
        id: 'regulacion', tipo: 'regulacion', icon: 'ley', nav: '¿Quién regula?',
        titulo: '¿Quién regula la IA?',
        desc: 'Siete actores, siete instrumentos. Situación a octubre de 2026.',
        items: [
          { actor: 'UNESCO', inst: 'Recomendación sobre la ética de la IA (2021)', enf: 'Valores y principios aprobados por 193 Estados; voluntaria', sit: 'Vigente como guía (UNESCO, 2021)', tipo: 'Recomendación' },
          { actor: 'OCDE', inst: 'Principios de IA (2019, actualizados en 2024)', enf: 'IA confiable; 47 adherentes, incluida Colombia', sit: 'Vigentes (OECD, 2024)', tipo: 'Principios' },
          { actor: 'Unión Europea', inst: 'Ley de IA, Reglamento (UE) 2024/1689', enf: 'Por niveles de riesgo: prohíbe algunos usos y exige más a los de alto riesgo; multas de hasta 35 millones de euros o el 7 % de la facturación mundial', sit: 'Aplicación general desde el 2 de agosto de 2026; reglas de alto riesgo aplazadas a diciembre de 2027 y agosto de 2028 (European Parliament y Council of the European Union, 2024; European Commission, 2026)', tipo: 'Ley' },
          { actor: 'Consejo de Europa', inst: 'Convenio Marco sobre IA y derechos humanos (2024)', enf: 'Primer tratado internacional vinculante sobre IA', sit: 'Aún no está en vigor; Uruguay es el único firmante latinoamericano (Council of Europe, s. f., 2024)', tipo: 'Tratado' },
          { actor: 'EE. UU.', inst: 'Plan de Acción de IA y orden ejecutiva sobre leyes estatales (2025)', enf: 'Prioriza innovación, infraestructura y seguridad nacional; busca un marco federal único', sit: 'Vigentes (The White House, 2025a, 2025b)', tipo: 'Plan y orden ejecutiva' },
          { actor: 'China', inst: 'Medidas sobre IA generativa (2023) y etiquetado de contenido sintético (2025)', enf: 'Control estatal, registro de algoritmos y etiquetas obligatorias', sit: 'Vigentes (Cyberspace Administration of China, 2023, 2025)', tipo: 'Medidas' },
          { actor: 'Colombia', inst: 'CONPES 4144, Política Nacional de IA (2025)', enf: 'Hoja de ruta de inversión y capacidades hasta 2030', sit: 'En ejecución; proyectos de ley en trámite (CONPES, 2025; Congreso Visible, 2026)', tipo: 'Política pública', co: true }
        ]
      },
      {
        id: 'latam', tipo: 'latam', icon: 'latam', nav: 'América Latina',
        titulo: 'Mirada desde América Latina y Colombia',
        items: [
          { lugar: 'Colombia', a: '2025', t: 'Conectividad', d: 'En 2025 el 73,9 % de los hogares colombianos tenía Internet: el 78,8 % en las cabeceras municipales y el 56,9 % en los centros poblados y zonas rurales dispersas (Departamento Administrativo Nacional de Estadística [DANE], 2026).', co: true, datos: { u: '%', max: 100, filas: [['Total nacional', 73.9], ['Cabeceras municipales', 78.8], ['Centros poblados y rural disperso', 56.9]], nota: 'Hogares con Internet, 2025.' } },
          { lugar: 'Colombia', a: '2019–2025', t: 'Política pública', d: 'El CONPES 3975 (2019) incluyó la IA en la transformación digital del país. El CONPES 4144 (2025) creó la Política Nacional de Inteligencia Artificial, con unos 479.273 millones de pesos para 106 acciones en seis ejes entre 2024 y 2030 (CONPES, 2019, 2025).', co: true },
          { lugar: 'Colombia', a: '2026', t: 'Leyes en trámite', d: 'A octubre de 2026 Colombia no tiene una ley general de IA. Entre varios proyectos, el 25 de 2026 de la Cámara, radicado en julio, tenía publicada su ponencia para primer debate en la Comisión Sexta (Congreso Visible, 2026).', co: true },
          { lugar: 'Colombia', a: '2024', t: 'La justicia y la IA', d: 'En la sentencia T-323 de 2024 la Corte Constitucional revisó el caso de un juez de Cartagena que consultó ChatGPT en una tutela de salud. No halló violación del debido proceso porque el juez ya había decidido, pero fijó principios como la no sustitución del juicio humano y ordenó crear lineamientos para la Rama Judicial (Corte Constitucional de Colombia, 2024).', co: true },
          { lugar: 'Región', a: '2025', t: 'Posición regional', d: 'En el Índice Latinoamericano de IA 2025, Colombia obtuvo 55,84 puntos y fue cuarta de 19 países, en la categoría de «adoptantes», detrás de Chile (70,5), Brasil (67,3) y Uruguay (62,3); el promedio regional fue 43,02 (CENIA, 2025).', datos: { u: 'puntos', max: 100, filas: [['Chile', 70.5], ['Brasil', 67.3], ['Uruguay', 62.3], ['Colombia', 55.84], ['Promedio regional', 43.02, true]], nota: 'Índice Latinoamericano de IA 2025.' } },
          { lugar: 'Región', a: '2026', t: 'Latam-GPT', d: 'El 10 de febrero de 2026 se lanzó el primer gran modelo de lenguaje abierto de la región, liderado por el CENIA de Chile. Se construyó sobre el modelo Llama 3.1 de 70.000 millones de parámetros, con más de 300.000 millones de tokens de textos regionales obtenidos con permisos (CENIA, 2026). Participan el Ministerio de Ciencia de Colombia y universidades como Los Andes, la Javeriana y Uniminuto (LatamGPT, s. f.).' },
          { lugar: 'Región', a: '2025', t: 'Infraestructura', d: 'En 2025 América Latina y el Caribe contaba con 8 supercomputadoras públicas o público-privadas para IA (Stanford HAI, 2026).' }
        ]
      },
      {
        id: 'futuro', tipo: 'futuro', icon: 'futuro', nav: '¿Hacia dónde va?',
        titulo: '¿Hacia dónde va la computación?',
        desc: 'Estas son tendencias abiertas, no predicciones.',
        items: [
          { t: 'Más allá de encoger transistores', d: 'El progreso ya no depende solo de la ley de Moore: depende de especializar los chips para tareas concretas y de apilar piezas, como en la HBM (Hennessy y Patterson, 2019; JEDEC, 2025).' },
          { t: 'Computación cuántica', d: 'Usa cúbits, que aprovechan efectos cuánticos. En 2024 el chip Willow de Google, de 105 cúbits, mostró que los errores bajaban al crecer el sistema de corrección, y en 2025 Google reportó una ventaja cuántica verificable en una tarea específica (Google Quantum AI and Collaborators, 2025a, 2025b). IBM planea una máquina tolerante a fallos para 2029 (Mandelbaum et al., 2025), y el Nobel de Física 2025 premió los experimentos que están en su base (Royal Swedish Academy of Sciences, 2025). Su utilidad práctica a gran escala sigue siendo incierta.' },
          { t: 'IA más eficiente y en el propio dispositivo', d: 'Usar IA es cada vez más barato (Maslej, 2025); si la tendencia sigue, más funciones podrían correr en el propio celular, sin depender de la nube y con ventajas de privacidad.' },
          { t: 'Energía y agua', d: 'El crecimiento de los centros de datos depende de redes eléctricas y de su impacto ambiental (IEA, 2025, 2026).' },
          { t: 'Soberanía y gobernanza', d: '¿Quién controla los chips, los datos y los modelos? Iniciativas como Latam-GPT y las leyes en debate muestran que la región busca voz propia.' }
        ]
      },
      {
        id: 'mitos', tipo: 'mitos', icon: 'mitos', nav: 'Mitos',
        titulo: 'Mitos y precisiones',
        items: [
          { m: 'ChatGPT fue la primera IA', v: 'falso', p: 'La IA existe como campo desde 1956 y los programas conversacionales desde ELIZA, en 1966. Lo nuevo es la escala.' },
          { m: 'La IA entiende como una persona', v: 'debate', p: 'Los modelos de lenguaje detectan patrones estadísticos en enormes cantidades de texto. Si eso es «entender» sigue en debate: es la pregunta de Turing de 1950, todavía abierta.' },
          { m: 'La ley de Moore murió', v: 'amedias', p: 'El número de transistores sigue creciendo, pero la frecuencia se estancó hacia 2005 y el progreso depende cada vez más de la especialización y del empaquetado (Hennessy y Patterson, 2019).' },
          { m: 'La nube no ocupa espacio', v: 'falso', p: 'La nube son edificios llenos de computadoras que consumen electricidad y agua (IEA, 2025).' },
          { m: 'Solo las potencias pueden crear modelos de IA', v: 'amedias', p: 'Latam-GPT muestra que la cooperación regional es posible, aunque se apoya en un modelo base creado por una empresa estadounidense (CENIA, 2026).' },
          { m: 'Esas cifras son fijas', v: 'falso', p: 'Usuarios, valor en bolsa o consumo de energía cambian cada mes: siempre hay que mirar la fecha del dato.' }
        ]
      },
      {
        id: 'cierre', tipo: 'cierre', icon: 'cierre', nav: 'Cierre práctico',
        titulo: 'Cierre práctico del taller',
        actividades: [
          { t: 'Guion colectivo: la máquina que controla el mundo', min: null, d: 'Crear, de forma colectiva, el guion de una película futurista sobre una máquina que controla el mundo.', widget: 'guion' }
        ]
      }
    ]
  });
})();
