/* Presentación del módulo, mapa, cinco ideas y banco del juego «¿En la época de qué objeto?». */
(function () {
  'use strict';
  window.M = window.M || {};
  window.M.modulo = {
    titulo: 'El futuro tiene historia',
    subtitulo: '90 años entre computadoras e inteligencias artificiales',
    anios: '1936–2026',
    presentacion: 'Este módulo recorre noventa años de computación e inteligencia artificial (IA), de 1936 a 2026, en cuatro talleres de unas dos décadas cada uno. Está pensado para personas de 18 a 60 años sin formación técnica.',
    datos: ['4 talleres', 'Unas 3 horas por taller, o dos sesiones de 90 minutos', 'Para personas de 18 a 60 años sin formación técnica'],

    proposito: [
      { icon: 'maquina', t: 'Entender cómo y por qué las computadoras pasaron de ocupar habitaciones enteras a caber en un bolsillo.' },
      { icon: 'ia', t: 'Reconocer los grandes momentos de la IA desde su nacimiento, sus promesas, sus crisis y su auge contemporáneo.' },
      { icon: 'sociedad', t: 'Relacionar cada avance técnico con su contexto social, económico y geopolítico.' },
      { icon: 'lupa', t: 'Desarrollar pensamiento crítico al leer noticias sobre tecnología, es decir, distinguir hechos, promesas y mitos.' }
    ],

    enfoque: [
      'Cada taller gira alrededor de un objeto fácil de recordar: la válvula de vacío (1936–1959), el chip (1960–1979), la computadora personal (1980–1999) y el teléfono inteligente conectado a la nube (2000–2026). Así, cualquier hito se puede ubicar con una pregunta sencilla: ¿en la época de qué objeto ocurrió?',
      'En cada época avanzan tres hilos en paralelo: la máquina (qué hace y qué tiene por dentro), la IA (ideas, logros y tropiezos) y la sociedad (quién financia, quién gana y quién queda por fuera). Cada taller incluye además una mirada desde América Latina y Colombia.',
      'Las explicaciones parten de cero y se apoyan en analogías cotidianas. Duración sugerida: unas 3 horas por taller, o dos sesiones de 90 minutos.'
    ],
    notas: [
      'Las sugerencias didácticas son mínimas a propósito: esta versión prioriza el contenido verificado.',
      'Las citas en el texto remiten a la lista de referencias del final (APA 7). Toque cualquier cita para ver la referencia completa.',
      'Los números usan punto para los miles y coma para los decimales (17.468; 1,5).'
    ],

    mapaIntro: 'Cuatro talleres, cuatro objetos-símbolo y una pregunta guía por época ordenan el recorrido de 1936 a 2026.',
    mapa: [
      { n: 1, titulo: 'Computadoras Mamut', periodo: '1936–1959', objeto: 'La válvula de vacío', pregunta: '¿Cómo pasó el cálculo de las personas a las máquinas?', ia: 'Nace la pregunta: ¿pueden pensar las máquinas?', contexto: 'Segunda Guerra Mundial e inicio de la Guerra Fría; los gobiernos financian y son los primeros clientes' },
      { n: 2, titulo: 'El chip', periodo: '1960–1979', objeto: 'El circuito integrado (chip)', pregunta: '¿Cómo se encogió la computadora y quién podía usarla?', ia: 'Grandes promesas y primer «invierno»', contexto: 'Carrera espacial, dominio de IBM, nacimiento de Silicon Valley' },
      { n: 3, titulo: 'La computadora personal y la gran red', periodo: '1980–1999', objeto: 'La computadora personal (PC)', pregunta: '¿Cómo llegó la computadora a hogares y oficinas, y cómo se conectó al mundo?', ia: 'Sistemas expertos, segundo invierno y victoria de Deep Blue', contexto: 'Fin de la Guerra Fría, globalización, auge y burbuja de Internet' },
      { n: 4, titulo: 'Máquinas de bolsillo, la nube y la IA', periodo: '2000–2026', objeto: 'El teléfono inteligente', pregunta: '¿Cómo llegamos a llevar en el bolsillo una computadora que conversa?', ia: 'Aprendizaje profundo e IA generativa', contexto: 'Plataformas digitales, geopolítica de los chips, energía y regulación' }
    ],
    climaPie: 'Cada época dura unas dos décadas y tiene su objeto-símbolo. La línea de la IA muestra que su avance no fue parejo: tras nacer en 1956, tuvo dos inviernos antes del auge que empezó en 2012.',
    climaFuente: 'Períodos del módulo; hitos de IA según (McCarthy et al., 2006; National Research Council, 1999; Krizhevsky et al., 2012; OpenAI, 2022)',

    ideas: [
      {
        t: 'Miniaturización',
        d: 'Cada época hizo más cálculo con menos espacio, energía y dinero: de la válvula al transistor, del transistor al chip, y del chip a miles de millones de transistores en una pieza del tamaño de una uña.',
        tipo: 'mini'
      },
      {
        t: 'Capas que acercan la máquina a las personas',
        d: 'Primero había que recablear la máquina. Luego llegaron los programas almacenados, los lenguajes de programación, las ventanas y el ratón, las pantallas táctiles y, hoy, las instrucciones en lenguaje cotidiano. Cada capa sumó millones de nuevos usuarios.',
        tipo: 'capas'
      },
      {
        t: 'La IA necesita tres ingredientes',
        d: 'Ideas (algoritmos), datos y capacidad de cómputo. Sus auges y sus «inviernos» se entienden preguntando qué ingrediente faltaba en cada época.',
        tipo: 'ingredientes'
      },
      {
        t: 'Gobiernos y empresas se necesitan',
        d: 'Guerras y carreras espaciales financiaron los primeros equipos; los mercados masivos los abarataron; las leyes antimonopolio, las políticas industriales y las regulaciones redistribuyeron el poder.',
        tipo: 'estado'
      },
      {
        t: 'Ningún líder es para siempre',
        d: 'IBM, Intel o Nokia dominaron una época y tropezaron en la siguiente. Preguntar «¿quién domina hoy y por qué?» es una buena forma de leer el presente.',
        tipo: 'lideres'
      }
    ],

    /* Idea 2: las capas, con el taller en que aparecen */
    capas: [
      { a: '1945', t: 'Recablear la máquina a mano', taller: 1, n: 'La ENIAC: cada problema nuevo exigía reconectar cables e interruptores.' },
      { a: '1948', t: 'Programa almacenado', taller: 1, n: 'La «Baby» de Manchester ejecuta el primer programa almacenado.' },
      { a: '1957', t: 'Lenguajes de programación', taller: 1, n: 'IBM entrega el compilador de FORTRAN, primer lenguaje de alto nivel de uso amplio.' },
      { a: '1984', t: 'Ventanas y ratón', taller: 3, n: 'La Macintosh (1984) y Windows (desde 1985) llevan la interfaz gráfica al gran público.' },
      { a: '2007', t: 'Pantallas táctiles', taller: 4, n: 'El iPhone convierte el teléfono en computadora.' },
      { a: '2022', t: 'Instrucciones en lenguaje cotidiano', taller: 4, n: 'ChatGPT lleva la IA conversacional al gran público.' }
    ],

    /* Idea 3: diagnóstico de los tres ingredientes, según el propio texto de cada taller.
       Nivel de 1 (escaso) a 4 (abundante). Es una lectura del módulo, no una medición. */
    ingredientes: [
      {
        taller: 1, rotulo: 'Nace la pregunta',
        ideas: [2, 'Brotan las ideas fundadoras: la neurona artificial (1943), el juego de la imitación (1950) y el perceptrón (1958).'],
        datos: [1, 'Los datos viven en tarjetas perforadas y cintas.'],
        computo: [1, 'Máquinas de válvulas: la ENIAC hacía unas 5.000 operaciones por segundo.']
      },
      {
        taller: 2, rotulo: 'Primer invierno',
        ideas: [2, 'Las reglas escritas a mano no alcanzaban para el sentido común.'],
        datos: [1, 'Casi no había datos digitales.'],
        computo: [1, 'Las máquinas eran lentas y con poquísima memoria.']
      },
      {
        taller: 3, rotulo: 'Segundo invierno y renacer',
        ideas: [3, 'La retropropagación (1986) muestra cómo aprende una red de varias capas; escribir todas las reglas a mano resultó imposible.'],
        datos: [2, 'Crecen los datos digitales.'],
        computo: [2, 'Crece el cómputo: la velocidad de los procesadores se multiplicó por cientos.']
      },
      {
        taller: 4, rotulo: 'Auge',
        ideas: [4, 'Algoritmos mejores, como el Transformer (2017).'],
        datos: [4, 'Datos masivos de Internet: ImageNet reunió millones de imágenes etiquetadas.'],
        computo: [4, 'Chips capaces de cálculo paralelo: GPU y aceleradores de IA.']
      }
    ],

    /* Idea 5 */
    lideres: [
      { n: 'IBM', up: 'Dominó los mainframes: cerca de dos tercios del mercado en los sesenta.', down: 'Su estándar abierto de PC trasladó el poder a Intel y Microsoft; vendió su negocio de PC a Lenovo en 2005.', talleres: [2, 3] },
      { n: 'Intel', up: 'Con la PC compatible, el poder pasó de IBM a Intel y Microsoft.', down: 'Perdió terreno en móviles y en 2020 Apple dejó sus procesadores por chips propios.', talleres: [3, 4] },
      { n: 'Nokia', up: 'Dominó el celular clásico.', down: 'Vendió su negocio de teléfonos a Microsoft en 2014.', talleres: [4] }
    ],

    verificacion: 'Los datos del módulo se contrastaron en octubre de 2026 con fuentes primarias, académicas o institucionales; cuando las fuentes difieren, el texto lo indica.',

    /* Juego: ¿en la época de qué objeto ocurrió? (era = número de taller) */
    juego: [
      { t: 'Alan Turing describe una «máquina universal».', a: '1936', era: 1, n: 'La semilla del software nace en la época de la válvula, antes incluso de las computadoras electrónicas.' },
      { t: 'John Bardeen y Walter Brattain demuestran el transistor en Bell Labs.', a: '1947', era: 1, n: 'El sucesor de la válvula nace en plena época de la válvula; los modelos transistorizados llegaron a finales de los cincuenta.' },
      { t: 'Jack Kilby demuestra el circuito integrado.', a: '1958', era: 1, n: 'El chip se inventa al final de la época de la válvula; su producción empieza en 1960.' },
      { t: 'Se celebra el taller de Dartmouth y la IA nace como campo.', a: '1956', era: 1, n: 'La propuesta de 1955 acuñó la expresión «inteligencia artificial».' },
      { t: 'Frank Rosenblatt presenta el perceptrón.', a: '1958', era: 1, n: 'Las redes neuronales nacen en la época de la válvula y triunfan medio siglo después.' },
      { t: 'Funciona Colossus en Bletchley Park.', a: '1944', era: 1, n: 'Primera computadora electrónica digital programable, aunque para una sola tarea.' },
      { t: 'La cervecería Bavaria instala una IBM 650, considerada la primera computadora de Colombia.', a: '1957 o 1958', era: 1, n: 'Las fuentes difieren entre 1957 y 1958.' },
      { t: 'IBM anuncia la familia System/360.', a: '1964', era: 2, n: 'El mismo software corre en máquinas de distinto tamaño.' },
      { t: 'Joseph Weizenbaum publica ELIZA.', a: '1966', era: 2, n: 'Primer programa conversacional famoso, más de medio siglo antes de ChatGPT.' },
      { t: 'ARPANET envía su primer mensaje: llegan la «l» y la «o» antes de que el sistema se caiga.', a: '1969', era: 2, n: 'La red que dio origen a Internet nace en la época del chip.' },
      { t: 'Intel lanza el 4004, primer microprocesador comercial.', a: '1971', era: 2, n: 'Un procesador completo cabe en un chip.' },
      { t: 'Chile diseña Cybersyn para seguir la economía casi en tiempo real.', a: '1971–1973', era: 2, n: 'El golpe del 11 de septiembre de 1973 terminó el proyecto.' },
      { t: 'Xerox presenta el Alto, con ventanas, íconos y ratón.', a: '1973', era: 2, n: 'La interfaz gráfica nace en la época del chip, una década antes de llegar al gran público.' },
      { t: 'Steve Jobs, Steve Wozniak y Ronald Wayne fundan Apple.', a: '1976', era: 2, n: 'La empresa de garaje nace en la época del chip; la PC masiva llega en la siguiente.' },
      { t: 'Clementina entra en operación continua en la Universidad de Buenos Aires.', a: '1961', era: 2, n: 'Primera computadora científica de Argentina.' },
      { t: 'IBM lanza el PC 5150.', a: '1981', era: 3, n: 'Arquitectura abierta: nace el estándar de los «compatibles».' },
      { t: 'Rumelhart, Hinton y Williams publican la retropropagación.', a: '1986', era: 3, n: 'Renacen las redes neuronales en la época de la PC.' },
      { t: 'Tim Berners-Lee propone la Web en el CERN.', a: '1989', era: 3, n: 'Nace la idea de páginas enlazadas en todo el mundo.' },
      { t: 'Se envía el primer mensaje de texto (SMS).', a: '1992', era: 3, n: 'La mensajería móvil nace en la época de la PC, antes del teléfono inteligente.' },
      { t: 'Colombia se conecta a Internet desde la Universidad de los Andes.', a: '1994', era: 3, n: 'La conexión del 4 de junio de 1994 marca la llegada de Internet al país.' },
      { t: 'Deep Blue vence a Garri Kaspárov.', a: '1997', era: 3, n: 'Ganó con fuerza de cálculo y conocimiento programado.' },
      { t: 'Nvidia presenta la GeForce 256 como «la primera GPU».', a: '1999', era: 3, n: 'El chip gráfico que décadas después moverá la IA nace en la época de la PC.' },
      { t: 'Morris Chang funda TSMC en Taiwán.', a: '1987', era: 3, n: 'Nace el modelo de «fundición»: fabricar chips diseñados por otros.' },
      { t: 'Amazon lanza sus servicios de nube S3 y EC2.', a: '2006', era: 4, n: 'El cómputo empieza a alquilarse.' },
      { t: 'Apple presenta el iPhone.', a: '2007', era: 4, n: 'El teléfono se vuelve computadora.' },
      { t: 'La red AlexNet gana el concurso ImageNet entrenada con GPU.', a: '2012', era: 4, n: 'Arranca el auge del aprendizaje profundo.' },
      { t: 'Se publica la arquitectura Transformer.', a: '2017', era: 4, n: 'Base de los modelos de lenguaje actuales.' },
      { t: 'OpenAI lanza ChatGPT.', a: '2022', era: 4, n: 'La IA llega al gran público.' },
      { t: 'Microsoft compra el negocio de celulares de Nokia.', a: '2014', era: 4, n: 'El líder del celular clásico pierde la era del teléfono inteligente.' },
      { t: 'Colombia aprueba el CONPES 4144, Política Nacional de IA.', a: '2025', era: 4, n: 'Unos 479.273 millones de pesos para 106 acciones entre 2024 y 2030.' },
      { t: 'Se lanza Latam-GPT, el primer gran modelo de lenguaje abierto de la región.', a: '2026', era: 4, n: 'Liderado por el CENIA de Chile, con participación colombiana.' }
    ]
  };
})();
