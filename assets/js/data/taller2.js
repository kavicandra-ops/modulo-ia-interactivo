/* Taller 2 (1960–1979): El chip — el circuito integrado */
(function () {
  'use strict';
  window.M = window.M || {};
  (window.M.talleres = window.M.talleres || []).push({
    n: 2,
    slug: 'taller2',
    titulo: 'El chip',
    periodo: '1960–1979',
    objeto: 'chip',
    objetoNombre: 'El circuito integrado (chip)',
    corto: 'Chip',
    intro: 'En estas dos décadas el circuito integrado encogió la computadora: de la sala refrigerada a la oficina y, al final, al escritorio de la casa. IBM dominó el mercado, la carrera espacial pagó los primeros chips y la IA vivió su primer gran desencanto.',
    pregunta: '¿Cómo se encogió la computadora y quién podía usarla?',
    ficha: {
      periodo: '1960–1979.',
      objeto: 'El chip, una pieza de silicio del tamaño de una uña con muchos transistores ya conectados.',
      objetivos: [
        'Explicar qué son un circuito integrado y un microprocesador, y por qué abarataron la computación.',
        'Diferenciar mainframe, minicomputadora y microcomputadora.',
        'Interpretar la ley de Moore como una observación de la industria, no como una ley natural.',
        'Explicar por qué la IA vivió su primer «invierno».'
      ]
    },
    secciones: [
      {
        id: 'linea', tipo: 'linea', icon: 'linea', nav: 'Línea de tiempo',
        titulo: 'Línea de tiempo, 1960–1978',
        eventos: [
          { a: '1960', h: 'Fairchild fabrica los primeros circuitos integrados monolíticos que funcionan (CHM, s. f.-e)', p: 'Empieza la producción del chip', t: 'm' },
          { a: '1961', h: 'Clementina, primera computadora científica de Argentina, entra en operación continua en la Universidad de Buenos Aires (Universidad de Buenos Aires, 2025)', p: 'La computación llega a la universidad pública latinoamericana', t: 'l' },
          { a: '1963', h: 'Chih-Tang Sah y Frank Wanlass presentan el circuito CMOS (CHM, s. f.-g)', p: 'Su bajo consumo lo hará la base de casi todos los chips actuales', t: 'm' },
          { a: '1964', h: 'IBM anuncia la familia System/360 (IBM, s. f.-e)', p: 'El mismo software corre en máquinas de distinto tamaño', t: 'ms' },
          { a: '1965', h: 'Gordon Moore publica su predicción; DEC lanza la minicomputadora PDP-8 (Moore, 1965; NMAH, s. f.-d)', p: 'Nace la «ley de Moore»; la computadora baja de precio', t: 'ms' },
          { a: '1966', h: 'Joseph Weizenbaum publica ELIZA (Weizenbaum, 1966)', p: 'Primer programa conversacional famoso', t: 'i' },
          { a: '1968', h: 'Douglas Engelbart presenta el ratón y el hipertexto; se funda Intel; IBM obtiene la patente de la DRAM de un transistor (SRI International, 2012; Intel, s. f.-c; Dennard, 1968)', p: 'Interfaz, empresa y memoria del futuro', t: 'ms' },
          { a: '1969', h: 'El Apolo 11 aluniza guiado por una computadora de chips; ARPANET envía su primer mensaje; nace UNIX; EE. UU. demanda a IBM por monopolio (Hall, 1972; Kleinrock, 2019; Ritchie, 1984; Hagley Museum and Library, s. f.)', p: 'Un año clave para el espacio, las redes y el software', t: 'ms' },
          { a: '1970', h: 'Intel lanza la memoria 1103 (CHM, s. f.-t)', p: 'La DRAM empieza a reemplazar a los núcleos magnéticos', t: 'm' },
          { a: '1971', h: 'Intel 4004, primer microprocesador comercial; se populariza el nombre «Silicon Valley» (CHM, s. f.-i; Laws, 2015)', p: 'Un procesador completo cabe en un chip', t: 'ms' },
          { a: '1972', h: 'Magnavox Odyssey, primera consola doméstica, y Pong de Atari; Ray Tomlinson crea el correo electrónico de ARPANET (CHM, s. f.-q; Leiner et al., 1997)', p: 'Llegan los videojuegos a casa y la primera «aplicación estrella» de la red', t: 'ms' },
          { a: '1973', h: 'Xerox Alto, con ventanas, íconos y ratón; informe Lighthill en el Reino Unido (CHM, s. f.-k; National Research Council, 1999)', p: 'Nace la interfaz gráfica; empieza el primer invierno de la IA', t: 'mi' },
          { a: '1974', h: 'Vinton Cerf y Robert Kahn publican el protocolo TCP (Cerf y Kahn, 1974)', p: 'Un lenguaje común para conectar redes distintas', t: 'm' },
          { a: '1975', h: 'Altair 8800; Bill Gates y Paul Allen fundan Microsoft; MOS 6502 a 25 dólares (NMAH, s. f.-a; Microsoft, 2025; IEEE Spectrum, 2017)', p: 'La computadora personal empieza como kit de aficionados', t: 'ms' },
          { a: '1976', h: 'Steve Jobs, Steve Wozniak y Ronald Wayne fundan Apple (Levy y Montevirgen, 2026)', p: 'Otra empresa de garaje que cambiará la industria', t: 's' },
          { a: '1977', h: 'La «trinidad» de 1977: Apple II, Commodore PET y TRS-80; consola Atari VCS (CHM, s. f.-j; IEEE Spectrum, 2017)', p: 'La computadora se vende armada, para hogares y oficinas', t: 'ms' },
          { a: '1978', h: 'Intel 8086, de 16 bits y 29.000 transistores (Intel, 2012)', p: 'Antepasado directo de los procesadores de las PC actuales', t: 'm' }
        ]
      },
      {
        id: 'conceptos', tipo: 'conceptos', icon: 'conceptos', nav: 'Conceptos',
        titulo: 'Conceptos fundamentales',
        desc: 'Diez ideas para entender la época del chip. Tres de ellas tienen laboratorio.',
        items: [
          { t: 'Circuito integrado (chip)', d: 'Transistores, resistencias y conexiones se fabrican juntos sobre una misma pieza de silicio, en lugar de soldarse uno por uno. Se «imprimen» con luz, con técnicas parecidas a la fotografía. Ejemplo: pasar de copiar libros a mano a imprimirlos.' },
          { t: 'Ley de Moore', d: 'En 1965 Gordon Moore observó que los componentes por chip se duplicaban cada año y proyectó ese ritmo por una década; en 1975 lo ajustó a cada dos años (Moore, 1965; CHM, s. f.-h). No es una ley de la naturaleza: es una observación económica que la industria convirtió en meta. Ejemplo: algo que se duplica cada dos años se multiplica por más de mil en veinte años.', lab: 'duplicar' },
          { t: 'Microprocesador', d: 'Todo el procesador en un solo chip. El Intel 4004 de 1971 tenía 2.300 transistores (CHM, s. f.-i).' },
          { t: 'Mainframe, minicomputadora y microcomputadora', d: 'Tres escalas de una misma idea: el mainframe ocupaba una sala y costaba millones; la minicomputadora PDP-8 costaba 18.000 dólares; la microcomputadora Apple II, 1.298 (NMAH, s. f.-d; CHM, s. f.-j).' },
          { t: 'Tiempo compartido', d: 'Una gran computadora atendía a muchas personas desde terminales remotas, repartiendo su atención en turnos de fracciones de segundo. Ejemplo: un cocinero que atiende varias mesas pasando rápido de una a otra.' },
          { t: 'Compatibilidad', d: 'Con el System/360 los programas funcionaban en toda una familia de máquinas, así que una empresa podía crecer sin reescribir su software (IBM, s. f.-e). Ejemplo: un cargador que sirve para todos los celulares de una marca.' },
          { t: 'Memoria dinámica (DRAM)', d: 'Cada bit es una pequeña carga eléctrica que se escapa y debe recargarse muchas veces por segundo. Ejemplo: baldes con un agujerito que alguien rellena sin parar. Robert Dennard patentó la celda de un transistor en 1968, y el Intel 1103 popularizó este tipo de memoria desde 1970 (Dennard, 1968; CHM, s. f.-t).', lab: 'dram' },
          { t: 'Sistema operativo', d: 'El programa que administra la máquina y reparte sus recursos entre programas y personas. UNIX nació en 1969 en Bell Labs y en 1973 se reescribió en el lenguaje C, lo que facilitó llevarlo a otras máquinas (Ritchie, 1984, 1993).' },
          { t: 'Red de paquetes', d: 'Los mensajes se cortan en paquetes que viajan por separado y se reensamblan al llegar. Ejemplo: enviar una carta larga en postales numeradas por rutas distintas. El primer mensaje de ARPANET, el 29 de octubre de 1969, iba a decir «login»: llegaron la «l» y la «o» antes de que el sistema se cayera (Kleinrock, 2019).', lab: 'paquetes' },
          { t: 'Interfaz gráfica', d: 'Ventanas, íconos y un puntero que se mueve con el ratón, en lugar de comandos escritos. Engelbart la anticipó en 1968 y Xerox la desarrolló en el Alto (SRI International, 2012; CHM, s. f.-k).' }
        ],
        labs: [
          { id: 'duplicar', n: 'Duplicar cada dos años' },
          { id: 'dram', n: 'Baldes con agujerito' },
          { id: 'paquetes', n: 'Postales numeradas' }
        ]
      },
      {
        id: 'moore', tipo: 'grafico', icon: 'grafico', nav: 'Ley de Moore',
        titulo: 'La ley de Moore en números',
        desc: 'Transistores por chip, en escala que multiplica por diez en cada línea horizontal. Toque un punto para ver el chip.',
        widget: 'graficoMoore',
        pie: 'Cada línea horizontal multiplica por diez. Los chips siguieron de cerca el ritmo de duplicación cada dos años durante cinco décadas, aunque desde mediados de los 2000 ese crecimiento se tradujo en más núcleos y chips especializados, no en más velocidad de reloj (Hennessy y Patterson, 2019).',
        fuente: '12 chips, 1971–2024. Fuentes: (Intel, 2012, s. f.-a, s. f.-b; Apple, 2020; Nvidia, 2022, 2024)'
      },
      {
        id: 'maquina', tipo: 'maquinas', icon: 'maquina', nav: 'Por dentro',
        titulo: 'Por dentro de la máquina',
        desc: 'Del mainframe que ocupaba una sala a la microcomputadora de escritorio.',
        campos: ['Año', 'Tipo', 'Componentes clave', 'Precio o escala'],
        items: [
          { n: 'IBM System/360', v: ['1964', 'Familia de mainframes compatibles', 'Módulos SLT de cerámica de poco más de un centímetro con transistores; memoria de núcleos; cintas, discos, lectoras de tarjetas e impresoras', 'IBM invirtió 5.000 millones de dólares en cuatro años (IBM, s. f.-e)'] },
          { n: 'DEC PDP-8', v: ['1965', 'Minicomputadora', 'Palabras de 12 bits; memoria de núcleos', '18.000 dólares; más de 50.000 unidades contando todas sus versiones (NMAH, s. f.-d)'] },
          { n: 'Computadora de guiado del Apolo', v: ['1966–1969', 'Computadora de navegación a bordo', '2.800 chips con compuertas NOR en su versión final; programas fijos «tejidos» a mano en memoria de cuerda', 'En 1963 los prototipos del Apolo consumían el 60 % de los microcircuitos producidos en EE. UU. (Hall, 1972; Tomayko, 1988)'] },
          { n: 'Intel 4004', v: ['1971', 'Microprocesador', '2.300 transistores; 4 bits; 740 kHz', 'Hasta unas 90.000 instrucciones por segundo; hecho para calculadoras de la japonesa Busicom (CHM, s. f.-i; Intel, 2012)'] },
          { n: 'Xerox Alto', v: ['1973', 'Estación de trabajo experimental', 'Pantalla de mapa de bits, ratón y red Ethernet', 'Nunca se vendió masivamente (CHM, s. f.-k)'] },
          { n: 'Apple II', v: ['1977', 'Microcomputadora', 'Procesador MOS 6502; 4 KB de memoria en la versión básica', '1.298 dólares (CHM, s. f.-j)'] },
          { n: 'TRS-80 Model I', v: ['1977', 'Microcomputadora', 'Procesador Zilog Z80; pantalla y casete incluidos', '599,95 dólares; 10.000 vendidas el primer mes (CHM, s. f.-j)'] }
        ],
        notas: [
          { t: 'Por qué un mainframe seguía ocupando una sala', d: 'Cada módulo SLT del System/360 llevaba apenas unos pocos transistores, así que un procesador completo necesitaba miles de módulos en muchas tarjetas y gabinetes (IBM, s. f.-e). A eso se sumaban memoria, cintas, discos, lectoras e impresoras, unidos por cables bajo un piso elevado. El chip cambió la ecuación: cada pieza traía cada vez más transistores ya conectados.' },
          { t: 'La computadora que no se rindió', d: 'Durante el alunizaje del Apolo 11 aparecieron las alarmas 1201 y 1202: un interruptor de radar mal configurado sobrecargaba la computadora con tareas extra. El software, diseñado para reiniciarse y priorizar lo esencial, permitió continuar el descenso (Adler, 1998). En tierra, la NASA seguía la misión con cinco mainframes System/360 Modelo 75 en su centro de control de Houston (IBM, s. f.-a). Margaret Hamilton dirigía la división de ingeniería de software del laboratorio del MIT que programó esas computadoras (NASA, 2024).', estilo: 'apolo' }
        ]
      },
      {
        id: 'ia', tipo: 'ia', icon: 'hilo', nav: 'Hilo de la IA',
        titulo: 'El hilo de la IA: grandes promesas y primer invierno (1960–1979)',
        items: [
          { a: '1966', t: 'ELIZA', d: 'El programa de Joseph Weizenbaum imitaba a un psicoterapeuta devolviendo las frases como preguntas: «me siento triste» se convertía en «¿por qué se siente triste?» (Weizenbaum, 1966). Muchas personas le atribuían comprensión, el llamado «efecto ELIZA». Weizenbaum advirtió después contra delegar el juicio humano en las computadoras (Weizenbaum, 1976).', e: 's', lab: 'eliza' },
          { a: '1966–1972', t: 'Shakey', d: 'El robot del instituto SRI fue el primero en moverse razonando sobre sus propias acciones (CHM, s. f.-v).', e: 's' },
          { a: '1965–1980', t: 'Sistemas expertos', d: 'DENDRAL (1965), para química, y MYCIN (Stanford, 1972–1980), para infecciones, codificaban el saber de especialistas en reglas «si… entonces…» (National Research Council, 1999).', e: 's' },
          { a: '1969', t: 'El golpe al perceptrón', d: 'Marvin Minsky y Seymour Papert demostraron los límites de los perceptrones simples (Minsky y Papert, 1969), y durante años muchos investigadores abandonaron las redes neuronales.', e: 'c' },
          { a: '1974–1980', t: 'El primer invierno', d: 'En 1969 el Congreso de EE. UU. exigió que la investigación militar tuviera utilidad directa, y en 1973 el informe Lighthill criticó en el Reino Unido la falta de resultados. Los fondos cayeron aproximadamente entre 1974 y 1980 (National Research Council, 1999). «Invierno» es una etiqueta posterior, y sus fechas son aproximadas.' }
        ],
        labs: [
          { id: 'eliza', n: 'Converse con una ELIZA' },
          { id: 'explosion', n: 'La explosión de posibilidades' }
        ],
        leccion: {
          t: '¿Por qué fallaron las promesas?',
          d: 'Faltaban los tres ingredientes del módulo. Las reglas escritas a mano no alcanzaban para el sentido común; casi no había datos digitales; y las máquinas eran lentas y con poquísima memoria. Además, el número de posibilidades crece explosivamente en problemas reales. Ejemplo: en ajedrez, tras pocas jugadas ya hay millones de partidas posibles.'
        }
      },
      {
        id: 'sociedad', tipo: 'sociedad', icon: 'sociedad', nav: 'Sociedad',
        titulo: 'Contexto social, económico y político',
        items: [
          { t: 'El Estado compra los primeros chips', d: 'Hacia 1963 los prototipos del programa Apolo usaban el 60 % de los microcircuitos producidos en EE. UU., y luego el misil Minuteman fue el mayor comprador (Tomayko, 1988). Esas compras públicas ayudaron a la industria a aprender a fabricar en serie.', l: 'f' },
          { t: 'IBM, el gigante', d: 'IBM tenía cerca de dos tercios del mercado en los sesenta (CHM, s. f.-z). En 1969 el Gobierno de EE. UU. la demandó por monopolio; el juicio duró hasta 1982, cuando se retiró la demanda (Hagley Museum and Library, s. f.). Ese mismo 1969 IBM empezó a cobrar aparte el software y los servicios, lo que impulsó una industria independiente del software (Sherman, 2024).', l: 'g' },
          { t: 'Nace Silicon Valley', d: 'Alrededor de Fairchild creció una red de empresas de semiconductores, entre ellas Intel, fundada en 1968 por Robert Noyce y Gordon Moore. El periodista Don Hoefler popularizó el nombre «Silicon Valley» en 1971 (Intel, s. f.-c; Laws, 2015).', l: 'g' },
          { t: 'Aficionados y garajes', d: 'La Altair 8800 se vendía como kit por 395 dólares y recibió 4.000 pedidos en tres meses (NMAH, s. f.-a). Microsoft nació vendiendo un intérprete de BASIC para ella (Microsoft, 2025). Estas empresas imaginaron la computadora como herramienta personal, no solo corporativa.', l: 'g' },
          { t: 'El software como profesión', d: 'En 1968 una conferencia de la OTAN eligió a propósito la expresión «ingeniería de software» para pedir programas construidos con rigor de ingeniería (Naur y Randell, 1969).', l: 'f' },
          { t: 'Un nuevo mercado de consumo', d: 'La Odyssey (1972), basada en la «caja marrón» de Ralph Baer, vendió más de 350.000 unidades, y Pong llevó los videojuegos a bares y salas de juego (CHM, s. f.-q).', l: 'g' }
        ]
      },
      {
        id: 'latam', tipo: 'latam', icon: 'latam', nav: 'América Latina',
        titulo: 'Mirada desde América Latina y Colombia',
        items: [
          { lugar: 'Argentina', a: '1961–1971', t: 'Clementina', d: 'Una Ferranti Mercury financiada por el CONICET llegó a la UBA a finales de 1960 y funcionó de forma continua desde el 15 de mayo de 1961, impulsada por Manuel Sadosky y Rebeca Guber. Cecilia Berdichevsky es considerada la primera programadora del país, y el nombre de la máquina venía de una melodía que tocaba al terminar cada cálculo (Universidad de Buenos Aires, 2025; Campi, 2025).' },
          { lugar: 'Argentina', a: '1966', t: 'La política también apaga máquinas', d: 'Tras la «Noche de los Bastones Largos», el 29 de julio de 1966, renunciaron más de mil docentes de la UBA, incluido casi todo el Instituto de Cálculo; Clementina dejó de funcionar en 1971 (Universidad de Buenos Aires, 2025; Campi, 2025).' },
          { lugar: 'Chile', a: '1971–1973', t: 'Cybersyn', d: 'El gobierno de Salvador Allende, con Fernando Flores y el cibernetista británico Stafford Beer, diseñó un sistema para seguir la economía casi en tiempo real: una red de télex, un software estadístico, un simulador y una «sala de operaciones». La red ayudó a coordinar el abastecimiento durante el paro de octubre de 1972; la sala nunca pasó de prototipo, y el golpe del 11 de septiembre de 1973 terminó el proyecto (Medina, 2006, 2011).' },
          { lugar: 'Brasil', a: '1972', t: 'La reserva de mercado', d: 'Desde 1972 Brasil reservó el mercado de minicomputadoras y microcomputadoras a empresas nacionales, política que se volvió ley en 1984 y terminó hacia 1991–1992. Nació una industria local, pero también hubo atraso, copias y contrabando; su balance sigue en debate (Barros da Silva et al., 2025).' },
          { lugar: 'Colombia', a: '1963–1967', t: 'La computación entra a la universidad', d: 'En 1963 la Universidad de los Andes puso a funcionar una IBM 650 donada por IBM, la primera instalada en una universidad colombiana, y a finales de 1967 creó el primer programa de Ingeniería de Sistemas del país (Estrella, 2010). La Universidad Nacional fundó en 1963 su Centro de Cálculo Electrónico, recibió una IBM 1620 en 1966 y abrió en 1967 una maestría en sistemas, pionera en la región (Castellanos Aceros, 2001).', co: true }
        ]
      },
      {
        id: 'mitos', tipo: 'mitos', icon: 'mitos', nav: 'Mitos',
        titulo: 'Mitos y precisiones',
        items: [
          { m: 'Desde 1965 la ley de Moore dice que los transistores se duplican cada dos años', v: 'impreciso', p: 'En 1965 Moore habló de duplicación anual; el ritmo de dos años es su ajuste de 1975 (Moore, 1965; CHM, s. f.-h).' },
          { m: 'El 4004 fue el primer procesador', v: 'amedias', p: 'Fue el primer microprocesador de un solo chip a la venta; antes existieron procesadores repartidos en varios chips (CHM, s. f.-i).' },
          { m: 'ARPANET se creó para sobrevivir a una guerra nuclear', v: 'falso', p: 'Su propósito fue compartir recursos entre investigadores. La idea de una red resistente a ataques venía de un estudio distinto, de la corporación RAND, y de ahí nació el rumor (Leiner et al., 1997).' },
          { m: 'Margaret Hamilton inventó la expresión «ingeniería de software»', v: 'falso', p: 'La popularizó, pero ya se había usado en 1966 y en la conferencia de la OTAN de 1968 (Meyer, 2013; NASA, 2024).' },
          { m: 'Ken Olsen dijo que nadie querría una computadora en casa', v: 'contexto', p: 'Es una frase atribuida y sin transcripción; el fundador de DEC aclaró que hablaba de computadoras que controlaran todo el hogar (Quote Investigator, 2017).' }
        ]
      },
      {
        id: 'cierre', tipo: 'cierre', icon: 'cierre', nav: 'Cierre práctico',
        titulo: 'Cierre práctico del taller',
        actividades: [
          { t: 'El poder de duplicar', min: 15, d: 'Como en el cuento indio o árabe sobre el origen del ajedrez, se duplica un grano de arroz casilla por casilla en un tablero de ajedrez. Cada participante hace el cálculo de cada casilla hasta que sea necesario el logaritmo.', widget: 'arroz' }
        ]
      }
    ]
  });
})();
