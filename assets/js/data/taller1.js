/* Taller 1 (1936–1959): Computadoras Mamut — la válvula de vacío */
(function () {
  'use strict';
  window.M = window.M || {};
  (window.M.talleres = window.M.talleres || []).push({
    n: 1,
    slug: 'taller1',
    titulo: 'Computadoras Mamut',
    periodo: '1936–1959',
    objeto: 'valvula',
    objetoNombre: 'La válvula de vacío',
    corto: 'Válvula',
    intro: 'En estas dos décadas el cálculo pasó de las manos de personas a máquinas electrónicas del tamaño de una habitación. La guerra y los gobiernos las financiaron, y en esos mismos años nació la pregunta por la inteligencia artificial.',
    pregunta: '¿Cómo pasó el cálculo de las personas a las máquinas?',
    ficha: {
      periodo: '1936–1959, con un prólogo desde 1834.',
      objeto: 'La válvula de vacío, un tubo de vidrio parecido a un bombillo que funciona como interruptor.',
      objetivos: [
        'Explicar qué es un algoritmo, un programa y una computadora programable.',
        'Describir las partes básicas de una computadora con el ejemplo de la ENIAC.',
        'Relacionar la Segunda Guerra Mundial y la Guerra Fría con el nacimiento de la computación y de la IA.',
        'Reconocer el papel de las mujeres que calcularon, programaron y descifraron códigos.'
      ]
    },
    secciones: [
      {
        id: 'prologo', tipo: 'prologo', icon: 'prologo', nav: 'Prólogo',
        titulo: 'Antes de las computadoras electrónicas',
        desc: 'Cuatro escenas que preparan el terreno, de 1834 a 1945.',
        items: [
          { a: '1834', t: 'Una máquina imaginada', d: 'En 1834 Charles Babbage concibió la Máquina Analítica, con un «almacén» (memoria), un «molino» (procesador) y tarjetas perforadas para programarla. Nunca se terminó (Computer History Museum [CHM], s. f.-o).' },
          { a: '1843', t: 'Un antecedente del programa', d: 'En 1843 Ada Lovelace publicó notas sobre esa máquina. Su Nota G detalla paso a paso cómo calcular los números de Bernoulli. En la Nota A intuyó que podría manipular símbolos, no solo números, e incluso componer música (Hollings et al., 2018).' },
          { a: '1890', t: 'Datos en tarjetas', d: 'Herman Hollerith usó tarjetas perforadas y tabuladoras eléctricas en el censo de EE. UU. de 1890, cuyos resultados salieron 18 meses antes que los de 1880. Tras varias fusiones, su empresa dio origen a IBM en 1924 (Gauthier, 2016; IBM, 2025).' },
          { a: '~1945', t: '«Computadora» era un oficio', d: 'Hasta cerca de 1945 la palabra designaba a personas que calculaban a mano. Durante la guerra, casi 200 mujeres jóvenes calcularon trayectorias de proyectiles para el Ejército de EE. UU. (Light, 1999).' }
        ],
        ejemplo: 'Ejemplo cotidiano: una tarjeta perforada funciona como un formulario de selección múltiple. Cada hueco es un dato, y la máquina lo «lee» porque la corriente pasa por él.',
        widget: 'perforada'
      },
      {
        id: 'linea', tipo: 'linea', icon: 'linea', nav: 'Línea de tiempo',
        titulo: 'Línea de tiempo, 1932–1959',
        eventos: [
          { a: '1932–1939', h: 'Matemáticos polacos rompen la máquina Enigma y comparten su método en julio de 1939 (Wilcox, 2024)', p: 'Dan la base del descifrado británico', t: 's' },
          { a: '1936', h: 'Alan Turing describe una «máquina universal», publicada a fines de ese año (Turing, 1937)', p: 'Una sola máquina puede imitar a cualquier otra si recibe su descripción: la semilla del software', t: 'm' },
          { a: '1938', h: 'Claude Shannon aplica el álgebra de Boole a circuitos de relés (Shannon, 1938)', p: 'Los interruptores de «sí/no» pueden hacer lógica y aritmética', t: 'm' },
          { a: '1940', h: 'Llega a Bletchley Park la primera bombe británica, «Victory» (Wilcox, 2024)', p: 'Automatiza la búsqueda de claves de Enigma', t: 'ms' },
          { a: '1941', h: 'Konrad Zuse presenta la Z3 en Berlín (Rojas, 1997)', p: 'Primera máquina programable y automática que funcionó; usaba relés', t: 'm' },
          { a: '1944', h: 'Funciona Colossus en Bletchley Park; IBM y Harvard presentan la Mark I (The National Museum of Computing [TNMOC], s. f.; IBM, s. f.-b)', p: 'Primera computadora electrónica digital programable, aunque para una sola tarea', t: 'ms' },
          { a: '1945', h: 'Se completa la ENIAC; John von Neumann describe el programa almacenado (Moye, 1996; von Neumann, 1945)', p: 'Primera computadora electrónica de propósito general y la arquitectura que aún usamos', t: 'm' },
          { a: '1947', h: 'John Bardeen y Walter Brattain demuestran el transistor en Bell Labs (CHM, s. f.-a)', p: 'Nace el sucesor de la válvula', t: 'm' },
          { a: '1948', h: 'La «Baby» de Manchester ejecuta el primer programa almacenado; Shannon publica su teoría de la información (University of Manchester, 1999; Shannon, 1948)', p: 'El programa vive en la memoria y el bit se vuelve unidad de medida', t: 'm' },
          { a: '1950', h: 'Turing propone el «juego de la imitación» (Turing, 1950)', p: 'Pregunta fundadora de la IA', t: 'i' },
          { a: '1951', h: 'La UNIVAC I entra en servicio en la Oficina del Censo de EE. UU. (U.S. Census Bureau, 2024)', p: 'Una de las primeras computadoras comerciales', t: 'ms' },
          { a: '1954', h: 'IBM entrega la primera IBM 650 (IBM, s. f.-c)', p: 'Primera computadora producida en masa: casi 2.000 unidades', t: 'ms' },
          { a: '1956', h: 'Taller de Dartmouth sobre inteligencia artificial; IBM despacha el primer disco duro comercial (McCarthy et al., 2006; CHM, s. f.-c)', p: 'Nace la IA como campo; los datos dejan de depender solo de cintas y tarjetas', t: 'im' },
          { a: '1957', h: 'La URSS lanza el Sputnik; IBM entrega el compilador de FORTRAN (Launius, s. f.; CHM, s. f.-x)', p: 'Empieza la carrera espacial; primer lenguaje de alto nivel de uso amplio', t: 'sm' },
          { a: '1958', h: 'Jack Kilby demuestra el circuito integrado; Frank Rosenblatt presenta el perceptrón; la UNAM estrena su IBM 650 (CHM, s. f.-d; Lefkowitz, 2019; de la Peña Sobarzo y Zárate Méndez, 2018)', p: 'Semillas del chip, de las redes neuronales y de la computación latinoamericana', t: 'mil' },
          { a: '1959', h: 'Robert Noyce patenta el circuito integrado monolítico; Atalla y Kahng logran el MOSFET, presentado en 1960; se acuerda crear COBOL (CHM, s. f.-e; CHM, s. f.-f; Britannica Editors, 2026a)', p: 'Bases técnicas del Taller 2', t: 'm' }
        ]
      },
      {
        id: 'conceptos', tipo: 'conceptos', icon: 'conceptos', nav: 'Conceptos',
        titulo: 'Conceptos fundamentales',
        desc: 'Diez ideas para entender la época. Las que tienen laboratorio se pueden probar abajo.',
        items: [
          { t: 'Algoritmo', d: 'Una secuencia finita de pasos precisos para resolver un problema. Ejemplo: una receta de arepas o las instrucciones para armar un mueble.' },
          { t: 'Programa', d: 'Un algoritmo escrito en un lenguaje que la máquina puede seguir.' },
          { t: 'Computadora programable y de propósito general', d: 'Hace tareas distintas con solo cambiar el programa. Ejemplo: el mismo celular es calculadora, cámara y mapa. La bombe y Colossus, en cambio, servían para una sola familia de tareas.' },
          { t: 'Bit y sistema binario', d: 'Un bit es la unidad mínima de información: sí o no, 1 o 0. Ejemplo: un interruptor de luz. Con 8 interruptores (un byte) hay 256 combinaciones, suficientes para todas las letras. Shannon mostró que los circuitos de interruptores pueden razonar con lógica (Shannon, 1938).', lab: 'bits' },
          { t: 'Electromecánico frente a electrónico', d: 'Un relé es un interruptor con piezas que se mueven y hacen «clic». Una válvula no tiene partes móviles y conmuta muchísimo más rápido.' },
          { t: 'Válvula de vacío', d: 'Un tubo de vidrio que deja pasar o corta la corriente. Era veloz, pero se calentaba, consumía mucha energía y se quemaba: la ENIAC perdía una válvula cada uno o dos días (CHM, s. f.-p).' },
          { t: 'Transistor', d: 'Hace el mismo trabajo de interruptor con un sólido semiconductor: más pequeño, frío y durable. Los primeros, de germanio, eran delicados y sensibles al calor; los de silicio, desde 1954, resistieron mucho mejor (CHM, s. f.-b).' },
          { t: 'Programa almacenado', d: 'Las instrucciones se guardan en la misma memoria que los datos. Cambiar de tarea es cargar otro programa, no recablear la máquina. Ejemplo: guardar la receta en el mismo cuaderno donde se anotan las cuentas del mercado.' },
          { t: 'Las cinco partes de una computadora', d: 'Entrada, memoria, unidad aritmético-lógica, unidad de control y salida; las dos del medio forman el procesador. Analogía de cocina: los ingredientes que llegan son la entrada; la alacena y el recetario, la memoria; quien cocina siguiendo la receta, el procesador; el plato servido, la salida.', lab: 'partes' },
          { t: 'Cifrado', d: 'Transformar un mensaje para que solo lo entienda quien tiene la clave. El cifrado César cambia cada letra por otra fija (A por D). Enigma cambiaba esa regla con cada tecla pulsada.', lab: 'cesar' }
        ],
        labs: [
          { id: 'bits', n: 'Ocho interruptores' },
          { id: 'partes', n: 'Las cinco partes' },
          { id: 'cesar', n: 'Cifrado César' }
        ]
      },
      {
        id: 'maquina', tipo: 'maquinas', icon: 'maquina', nav: 'Por dentro',
        titulo: 'Por dentro de la máquina',
        desc: 'Siete máquinas, de los relés al primer disco duro comercial.',
        campos: ['Año y país', 'Tecnología', 'Cómo se programaba', 'Dato para recordar'],
        items: [
          { n: 'Z3', v: ['1941, Alemania', 'Unos 2.400 relés; aritmética binaria', 'Cinta perforada, sin saltos condicionales', 'Fue destruida en un bombardeo (Rojas, 1997)'] },
          { n: 'Colossus Mark 1 y Mark 2', v: ['1944, Reino Unido', 'Unas 1.600 y 2.400 válvulas', 'Cables y conmutadores, sin programa almacenado', 'Diez máquinas al final de la guerra; secreto oficial hasta 1975 (TNMOC, s. f.)'] },
          { n: 'Harvard Mark I', v: ['1944, EE. UU.', 'Electromecánica; unos 15 m de largo', 'Cinta de papel perforada', 'Grace Hopper fue una de sus primeras programadoras (IBM, s. f.-b; Yale University, s. f.)'] },
          { n: 'ENIAC', v: ['1945, EE. UU.', '17.468 válvulas; más de 27 toneladas; 167 m²; 150 kW', 'Cables e interruptores, reconectados a mano', 'Unas 5.000 operaciones por segundo; costó 486.804 dólares (Moye, 1996; National Museum of the United States Army, s. f.)'] },
          { n: 'UNIVAC I', v: ['1951, EE. UU.', 'Unas 5.000 válvulas; memoria de líneas de retardo de mercurio; cinta magnética', 'Programa almacenado', '46 sistemas en seis años, a cerca de un millón de dólares cada uno (CHM, s. f.-y; Freiberger y Swaine, s. f.)'] },
          { n: 'IBM 650', v: ['1954, EE. UU.', 'Válvulas; tambor magnético a 12.500 rpm', 'Programa almacenado', 'Casi 2.000 unidades: la primera producida en masa (IBM, s. f.-c)'] },
          { n: 'IBM 305 RAMAC con disco 350', v: ['1956, EE. UU.', '50 discos de 24 pulgadas a 1.200 rpm', '—', '5 millones de caracteres (unos 3,75 MB) en más de una tonelada (CHM, s. f.-c)'] }
        ],
        notas: [
          { t: 'Un recorrido por la ENIAC', d: 'No tenía pantalla ni teclado. Los datos entraban y salían en tarjetas perforadas, y cada problema nuevo exigía reconectar cables e interruptores a mano. Una trayectoria de artillería de 60 segundos tomaba unas 20 horas de cálculo manual; la ENIAC la resolvía en 30 segundos (Moye, 1996).', widget: 'eniac', wide: true },
          { t: 'La memoria como eco', d: 'La UNIVAC I guardaba datos como pulsos de sonido que recorrían tubos de mercurio y se reinyectaban sin cesar, como un eco que se repite para no olvidarse (CHM, s. f.-y). Para grandes volúmenes usaba cinta magnética, una especie de casete gigante. Otras máquinas usaron memoria de núcleos magnéticos, pequeños anillos de ferrita atravesados por alambres, desde el Whirlwind del MIT en 1953 (CHM, s. f.-s).' },
          { t: 'Llegan los transistores', d: 'En 1955 la británica Harwell CADET ya calculaba solo con transistores (Lavington, 1980). A finales de la década los grandes fabricantes lanzaron modelos transistorizados, más pequeños y confiables.' },
          { t: 'Del casete al disco', d: 'En una cinta hay que recorrer todo hasta llegar al dato; en el disco RAMAC, un brazo saltaba directo al lugar indicado. Ejemplo: es la diferencia entre buscar una canción en un casete y en un disco de vinilo.', widget: 'cinta', wide: true }
        ]
      },
      {
        id: 'caso', tipo: 'caso', icon: 'caso', nav: 'Caso: Enigma',
        titulo: 'Caso de estudio: Enigma, Bletchley Park y Colossus',
        desc: 'La Segunda Guerra Mundial convirtió el descifrado de códigos en una industria del procesamiento de información. El caso muestra cómo se combinaron matemáticas, máquinas y trabajo colectivo.',
        capitulos: [
          { t: 'Cómo funcionaba Enigma', d: 'Arthur Scherbius la patentó en 1918 y se vendió comercialmente antes de que las fuerzas armadas alemanas adoptaran versiones reforzadas. Cada tecla enviaba corriente por tres rotores y un reflector, y encendía otra letra. El rotor derecho avanzaba con cada pulsación, así que la misma letra se cifraba distinto cada vez; y por el reflector, ninguna letra se cifraba como sí misma (Wilcox, 2024).' },
          { t: 'Un número enorme', d: 'Con 3 rotores elegidos entre 5, sus posiciones iniciales y 10 cables en el tablero de conexiones había unos 1,59 × 10²⁰ ajustes posibles: unos 159 trillones (Miller, 2019). Ojo con las palabras: en español un billón es 10¹² y un trillón 10¹⁸, mientras que el billion inglés es 10⁹.' },
          { t: 'El aporte polaco', d: 'En 1932 Marian Rejewski reconstruyó el cableado de los rotores militares con teoría de permutaciones y con documentos que el espía Hans-Thilo Schmidt entregó a la inteligencia francesa. Con Jerzy Różycki y Henryk Zygalski construyó en 1938 máquinas llamadas bomby. En julio de 1939, en Pyry, los polacos entregaron todo a británicos y franceses (Wilcox, 2024).' },
          { t: 'Bletchley Park', d: 'Para 1945 trabajaban allí casi 9.000 personas, y cerca del 75 % eran mujeres (Bletchley Park, 2022). Turing diseñó la bombe británica y Gordon Welchman le añadió un «tablero diagonal» que la hizo mucho más eficaz; se construyeron unas 210 (Wilcox, 2024).' },
          { t: 'Cómo se rompía', d: 'La clave estaba en los *cribs*, fragmentos de texto previsibles como los partes del clima, y en los descuidos de los operadores. Las *cillies* eran claves de mensaje fáciles de adivinar, y la «pista de Herivel» aprovechaba que los operadores apenas movían los rotores al empezar el día (O\'Connor y Robertson, 2015; Sale, s. f.).' },
          { t: 'La Enigma naval', d: 'Turing ideó el Banburismus, un método estadístico que medía la evidencia en *bans*, una unidad logarítmica (Sale, s. f.). La versión de cuatro rotores dejó a los aliados sin lectura de febrero a diciembre de 1942, y documentos rescatados del submarino U-559 fueron decisivos (Wilcox, 2024).' },
          { t: 'Lorenz y Colossus', d: 'El alto mando alemán usaba otra máquina, la Lorenz, que Bill Tutte reconstruyó en 1942 sin haberla visto. El ingeniero Tommy Flowers construyó Colossus: la primera funcionó desde febrero de 1944 y la segunda estuvo lista el 1 de junio, días antes del desembarco de Normandía (Copeland, 2010; TNMOC, s. f.). Ayudó a confirmar que Hitler esperaba la invasión por Calais (GCHQ, 2024).' },
          { t: '¿Cuánto pesó?', d: 'El historiador Harry Hinsley estimó que esta inteligencia acortó la guerra al menos dos años, y probablemente cuatro. Es una estimación contrafactual y debatida (Hinsley, 1993; Lewis, 2026).' }
        ],
        widgets: ['enigma', 'enorme']
      },
      {
        id: 'ia', tipo: 'ia', icon: 'hilo', nav: 'Hilo de la IA',
        titulo: 'El hilo de la IA: nace una pregunta (1943–1959)',
        items: [
          { a: '1943', t: 'La neurona artificial', d: 'Warren McCulloch y Walter Pitts describieron la neurona como una unidad lógica que se «enciende» si recibe suficientes señales (McCulloch y Pitts, 1943). Ejemplo: un timbre que solo suena si al menos dos de tres amigos lo presionan a la vez.', e: 'c', lab: 'neurona' },
          { a: '1948', t: 'La cibernética', d: 'Norbert Wiener estudió el control por retroalimentación en animales y máquinas (Wiener, 1948). Ejemplo: un termostato que mide la temperatura y corrige la calefacción.' },
          { a: '1950', t: 'La pregunta', d: 'Turing abrió su artículo preguntando si las máquinas pueden pensar y la reemplazó por el «juego de la imitación»: si en una conversación escrita un juez no distingue a la máquina de una persona, ¿qué nos impide decir que piensa? (Turing, 1950). Allí respondió a la «objeción de Lady Lovelace», según la cual la máquina solo hace lo que se le ordena (Hollings et al., 2018).' },
          { a: '1955–1956', t: 'El nombre', d: 'John McCarthy, Marvin Minsky, Nathaniel Rochester y Claude Shannon firmaron la propuesta del taller de Dartmouth, del 31 de agosto de 1955, donde aparece la expresión «inteligencia artificial». Pedían un estudio de dos meses con diez hombres para el verano de 1956: optimismo y una comunidad casi solo masculina (McCarthy et al., 2006).' },
          { a: '1956', t: 'Un programa que razona', d: 'Allen Newell, Herbert Simon y Cliff Shaw presentaron el Logic Theorist, que demostró 38 teoremas de los *Principia Mathematica* (Newell y Simon, 1956; CHM, s. f.-v).', e: 's' },
          { a: '1958', t: 'Una máquina que aprende', d: 'Frank Rosenblatt presentó el perceptrón, una red de neuronas artificiales que ajusta sus conexiones con ejemplos. En una demostración financiada por la Marina de EE. UU., aprendió tras 50 intentos a distinguir tarjetas marcadas a la izquierda o a la derecha, y la prensa exageró sus alcances (Rosenblatt, 1958; Lefkowitz, 2019). Su versión física, el Mark I Perceptron, se conserva en el Smithsonian (National Museum of American History [NMAH], s. f.-b).', e: 'c', lab: 'perceptron' },
          { a: '1959', t: 'Aprendizaje automático', d: 'Arthur Samuel, de IBM, mostró un programa de damas que aprendía a jugar mejor que su propio autor, y popularizó la expresión *machine learning* (Samuel, 1959).' }
        ],
        labs: [
          { id: 'neurona', n: 'El timbre de la neurona' },
          { id: 'perceptron', n: 'Entrene un perceptrón' }
        ],
        leccion: {
          t: 'Dos caminos que recorren todo el módulo',
          d: 'La IA simbólica escribe reglas y lógica a mano, como el Logic Theorist. La IA conexionista ajusta redes con ejemplos, como el perceptrón. Ejemplo: aprender a cocinar con un recetario frente a aprender probando y corrigiendo la sazón. La primera dominó hasta los años ochenta; la segunda volvió con fuerza en los talleres 3 y 4.',
          caminos: true
        }
      },
      {
        id: 'sociedad', tipo: 'sociedad', icon: 'sociedad', nav: 'Sociedad',
        titulo: 'Contexto social, económico y político',
        items: [
          { t: 'La guerra como motor', d: 'El Ejército de EE. UU. contrató la ENIAC en junio de 1943 para calcular tablas de tiro (Moye, 1996). Gran Bretaña convirtió Bletchley Park en una fábrica de inteligencia (Bletchley Park, 2022).', l: 'f' },
          { t: 'El Estado como primer cliente', d: 'Ejército, censo y defensa aérea compraron las primeras máquinas. El sistema de defensa SAGE, con computadoras IBM de 250 toneladas por centro, operó desde 1958 y costó entre 8.000 y más de 10.000 millones de dólares, según la fuente (IBM, s. f.-g; CHM, s. f.-r).', l: 'fg' },
          { t: 'La Guerra Fría y la ciencia', d: 'El Sputnik soviético, lanzado el 4 de octubre de 1957, llevó a EE. UU. a crear ARPA en febrero de 1958 y la NASA, que empezó a operar en octubre (Launius, s. f.; Defense Advanced Research Projects Agency [DARPA], 2018). ARPA financiaría después redes de computadoras e investigación en IA.', l: 'f' },
          { t: 'Empresas que se reinventan', d: 'IBM pasó de tabuladoras a computadoras; Remington Rand comercializó la UNIVAC; Bell Labs, de AT&T, inventó el transistor; Texas Instruments y Fairchild apostaron por el silicio (Freiberger y Swaine, s. f.; CHM, s. f.-a, s. f.-b, s. f.-e).', l: 'g' },
          { t: 'Mujeres invisibles', d: 'Las seis programadoras de la ENIAC —Kathleen McNulty, Jean Jennings, Betty Snyder, Marlyn Wescoff, Frances Bilas y Ruth Lichterman— venían del cuerpo de «computadoras» humanas. La publicidad oficial solo nombró a los ingenieros, y solo en 1997 ingresaron al Salón de la Fama de Women in Technology International (Light, 1999; Penn Engineering, s. f.).', l: 'x' },
          { t: 'Secreto y discriminación', d: 'El secreto sobre Colossus hizo que la historia pública se escribiera alrededor de la ENIAC. Turing fue condenado en 1952 por su homosexualidad, entonces delito en el Reino Unido, y sometido a castración química; murió en 1954 y recibió un indulto póstumo en 2013 (Ministry of Justice, 2013; Hodges, 1983/2014).', l: 'x' }
        ]
      },
      {
        id: 'latam', tipo: 'latam', icon: 'latam', nav: 'América Latina',
        titulo: 'Mirada desde América Latina y Colombia',
        items: [
          { lugar: 'México', a: '1958', t: 'Un centro de cálculo en la UNAM', d: 'El 8 de junio de 1958 la UNAM fundó su Centro de Cálculo Electrónico con una IBM 650. La UNAM la presenta como la primera de América Latina, pero hubo equipos anteriores en Brasil y Colombia, según qué se cuente como computadora (de la Peña Sobarzo y Zárate Méndez, 2018).' },
          { lugar: 'Brasil', a: '1957', t: 'Agua, Univac y una Burroughs', d: 'El gobierno del estado de São Paulo adquirió un equipo Univac para calcular el consumo de agua, y en 1960 llegó una Burroughs B-205 a la PUC de Río (Universidade de São Paulo, 2025).' },
          { lugar: 'Colombia', a: '1957 o 1958', t: 'Una IBM 650 en una cervecería', d: 'La cervecería Bavaria instaló una IBM 650, considerada la primera computadora del país; las fuentes difieren entre 1957 y 1958 (Redacción Semana, 2017; Jarava Otero, 2020). Según una reconstrucción académica, empresas como EPM y Ecopetrol también incorporaron computadoras a finales de la década (Jarava Otero, 2020).', co: true },
          { lugar: 'Región', a: '', t: 'Una diferencia de fondo', d: 'En EE. UU. y el Reino Unido las primeras computadoras nacieron de proyectos militares y estatales. En América Latina llegaron importadas, para empresas, universidades y oficinas públicas, casi una década después.' }
        ]
      },
      {
        id: 'mitos', tipo: 'mitos', icon: 'mitos', nav: 'Mitos',
        titulo: 'Mitos y precisiones',
        items: [
          { m: 'La primera computadora fue la ENIAC', v: 'depende', p: 'Depende de la definición. La Z3 (1941) era programable pero electromecánica; la Atanasoff-Berry (1942), electrónica pero no programable; Colossus (1944), electrónica y programable, pero para una sola tarea; la ENIAC (1945), electrónica y de propósito general; la Baby (1948), la primera con programa almacenado. En 1973 un juez de EE. UU. anuló la patente de la ENIAC y reconoció el trabajo previo de John Atanasoff (CHM, s. f.-m; JVA Initiative Committee, 2011).', widget: 'primera' },
          { m: 'Turing descifró Enigma solo', v: 'falso', p: 'Fue un trabajo colectivo que empezó en Polonia y reunió a miles de personas, en su mayoría mujeres.' },
          { m: 'El primer bug fue una polilla', v: 'falso', p: 'Thomas Edison ya llamaba *bugs* a los fallos en la década de 1870. La polilla hallada en la Harvard Mark II el 9 de septiembre de 1947 fue registrada en broma como el primer caso real de un *bug* encontrado (NMAH, s. f.-c).' },
          { m: 'Turingery fue el método contra la Enigma naval', v: 'falso', p: 'No: contra la Enigma naval se usó el Banburismus; Turingery fue un método de 1942 contra la cifra Lorenz (Copeland, 2010; Imperial War Museums [IWM], s. f.).' },
          { m: 'Bletchley Park acortó la guerra exactamente dos años', v: 'impreciso', p: 'Es una estimación contrafactual, y su autor la extendía incluso a cuatro años (Hinsley, 1993).' }
        ]
      },
      {
        id: 'cierre', tipo: 'cierre', icon: 'cierre', nav: 'Cierre práctico',
        titulo: 'Cierre práctico del taller',
        actividades: [
          { t: 'El juego de la imitación', min: 30, d: 'Se leen respuestas anónimas a una misma pregunta, unas escritas por personas y otras por un chatbot, preparadas con antelación. El grupo intenta distinguirlas y discute la pregunta de Turing.', widget: 'imitacion' }
        ]
      }
    ]
  });
})();
