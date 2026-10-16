/* Taller 3 (1980–1999): la computadora personal y la gran red */
(function () {
  'use strict';
  window.M = window.M || {};
  (window.M.talleres = window.M.talleres || []).push({
    n: 3,
    slug: 'taller3',
    titulo: 'La computadora personal y la gran red',
    periodo: '1980–1999',
    objeto: 'pc',
    objetoNombre: 'La computadora personal (PC)',
    corto: 'PC',
    intro: 'En estas dos décadas la computadora llegó a hogares y oficinas, se volvió fácil de usar con ventanas y ratón, y se conectó al mundo por Internet y la Web. La velocidad de los procesadores se multiplicó por cientos, y la IA pasó del auge de los sistemas expertos a un segundo invierno y a un renacer silencioso.',
    pregunta: '¿Cómo llegó la computadora a hogares y oficinas, y cómo se conectó al mundo?',
    ficha: {
      periodo: '1980–1999, con un cierre en el año 2000.',
      objeto: 'La computadora personal (PC), con su ratón y su módem.',
      objetivos: [
        'Identificar las partes de una PC y explicar qué hace cada una.',
        'Explicar por qué la arquitectura abierta del IBM PC creó una industria de compatibles y trasladó el poder hacia Intel y Microsoft.',
        'Diferenciar Internet y la Web.',
        'Comparar los sistemas expertos con las redes neuronales que aprenden de datos.'
      ]
    },
    secciones: [
      {
        id: 'linea', tipo: 'linea', icon: 'linea', nav: 'Línea de tiempo',
        titulo: 'Línea de tiempo, 1981–2000',
        eventos: [
          { a: '1981', h: 'IBM lanza el PC 5150 (IBM, s. f.-d; CHM, s. f.-u)', p: 'Arquitectura abierta: nace el estándar de los «compatibles»', t: 'ms' },
          { a: '1982', h: 'Time nombra a la computadora «Máquina del año»; Compaq presenta el primer portátil compatible con IBM; Japón lanza su proyecto de Quinta Generación (Friedrich, 1983; CHM, s. f.-n; CHM, s. f.-v)', p: 'La PC se vuelve fenómeno cultural y carrera tecnológica entre países', t: 'msi' },
          { a: '1983', h: 'ARPANET adopta TCP/IP el 1 de enero; Richard Stallman anuncia el proyecto GNU; Nintendo lanza la Famicom en Japón (Leiner et al., 1997; Stallman, 1983; Cifaldi, 2017)', p: 'Nace Internet técnicamente; nace el software libre; renacen los videojuegos', t: 'ms' },
          { a: '1984', h: 'Apple lanza la Macintosh; Fujio Masuoka, en Toshiba, inventa la memoria flash (CHM, s. f.-l; CHM, s. f.-w)', p: 'Ventanas y ratón para el gran público; la memoria que hoy está en celulares y memorias USB', t: 'm' },
          { a: '1985', h: 'Intel 386; Windows 1.0 (Intel, s. f.-b; Microsoft, 2015)', p: 'Procesadores de 32 bits y ventanas en las PC compatibles', t: 'm' },
          { a: '1986', h: 'Rumelhart, Hinton y Williams publican la retropropagación; EE. UU. y Japón firman un acuerdo de semiconductores (Rumelhart et al., 1986; Irwin, 1996)', p: 'Renacen las redes neuronales; los chips se vuelven asunto de Estado', t: 'is' },
          { a: '1987', h: 'Morris Chang funda TSMC en Taiwán (TSMC, s. f.)', p: 'Nace el modelo de «fundición»: fabricar chips diseñados por otros', t: 's' },
          { a: '1989', h: 'Tim Berners-Lee propone la Web en el CERN; Intel 486 (CERN, s. f.-b; Intel, s. f.-b)', p: 'Nace la idea de páginas enlazadas en todo el mundo', t: 'm' },
          { a: '1991', h: 'La Web se anuncia públicamente; Linus Torvalds anuncia Linux; primera llamada con telefonía digital GSM (CERN, s. f.-b; Torvalds, 1991; Elisa, s. f.)', p: 'La Web y el software libre se abren al mundo; el celular se digitaliza', t: 'm' },
          { a: '1992', h: 'Se envía el primer mensaje de texto (SMS) (Stewart, 2026)', p: 'Nace la mensajería móvil', t: 'm' },
          { a: '1993', h: 'El CERN libera la Web al dominio público; aparece el navegador Mosaic; Intel Pentium (CERN, s. f.-a; National Center for Supercomputing Applications [NCSA], s. f.; Intel, s. f.-b)', p: 'Cualquiera puede crear páginas web, ahora con imágenes', t: 'ms' },
          { a: '1994', h: 'Netscape Navigator; Sony PlayStation en Japón; Colombia se conecta a Internet (Norr, 2026; Britannica Editors, 2026b; Arias, 2019)', p: 'La Web se vuelve masiva y llega al país', t: 'ml' },
          { a: '1995', h: 'Windows 95; termina la financiación pública de la red troncal de Internet en EE. UU.; Amazon abre su tienda en línea (Microsoft, 2015; Leiner et al., 1997; Waters, 2026)', p: 'Internet se vuelve comercial', t: 'ms' },
          { a: '1996', h: 'Se introduce el puerto USB (Britannica Editors, 2026c)', p: 'Un solo conector para casi todo', t: 'm' },
          { a: '1997', h: 'Deep Blue vence a Garri Kaspárov; se publican las redes LSTM (CHM, s. f.-v; Hochreiter y Schmidhuber, 1997)', p: 'La máquina gana en ajedrez; nace una red clave para el lenguaje', t: 'i' },
          { a: '1998', h: 'Se funda Google; EE. UU. demanda a Microsoft por monopolio (Google Inc., 2004; U.S. Department of Justice [DOJ], s. f.)', p: 'Buscar se vuelve la puerta de entrada a la Web; la regulación mira al software', t: 's' },
          { a: '1999', h: 'Nvidia presenta la GeForce 256 como «la primera GPU» (Nvidia, s. f.)', p: 'El chip gráfico que décadas después moverá la IA', t: 'm' },
          { a: '2000', h: 'Primeros procesadores de 1 GHz; el índice Nasdaq toca su máximo y estalla la burbuja punto com (Advanced Micro Devices [AMD], 2000; Duignan, 2026)', p: 'Fin de la carrera de la frecuencia y de la euforia de Internet', t: 'ms' }
        ]
      },
      {
        id: 'conceptos', tipo: 'conceptos', icon: 'conceptos', nav: 'Conceptos',
        titulo: 'Conceptos fundamentales',
        desc: 'Doce ideas de la era de la PC y la red.',
        items: [
          { t: 'Computadora personal', d: 'Una computadora para una sola persona, en su escritorio y bajo su control, no en una sala compartida.' },
          { t: 'Arquitectura abierta y compatibles', d: 'IBM armó su PC con piezas de otros fabricantes y publicó cómo conectarlas (IBM, s. f.-d). Microsoft conservó el derecho de vender su sistema operativo, MS-DOS, a otros fabricantes, y Compaq reconstruyó legalmente el BIOS, el programa básico de arranque (Shustek, 2014; CHM, s. f.-n). Resultado: cualquiera podía fabricar PC «compatibles», y el poder pasó de IBM a Intel y Microsoft. Ejemplo: como si una marca de licuadoras publicara sus planos y otras fabricaran licuadoras que usan los mismos vasos.' },
          { t: 'Frecuencia de reloj', d: 'El reloj marca el ritmo del procesador: cada «tic» es un paso de trabajo. Un megahercio (MHz) es un millón de tics por segundo y un gigahercio (GHz), mil millones. Ejemplo: el metrónomo que marca el compás de una orquesta.', lab: 'reloj' },
          { t: 'Más trabajo por tic', d: 'Los procesadores también aceleraron haciendo más en cada ciclo: varias instrucciones a la vez, en línea de montaje, y una pequeña memoria caché muy rápida dentro del chip (Hennessy y Patterson, 2019). Ejemplo: una cocina que no solo trabaja más rápido, sino que pica, cocina y emplata al mismo tiempo.' },
          { t: 'Escalado de Dennard', d: 'Al encoger los transistores, cada uno consumía proporcionalmente menos y la densidad de potencia se mantenía constante (Dennard et al., 1974). Por eso se pudo subir la frecuencia sin derretir el chip, hasta que esa ventaja se agotó en los años 2000 (Taller 4).' },
          { t: 'Interfaz gráfica para todos', d: 'Con la Macintosh (1984) y Windows (desde 1985) la gente dejó de escribir comandos y empezó a señalar y hacer clic (CHM, s. f.-l; Microsoft, 2015).' },
          { t: 'Software libre', d: 'Programas que cualquiera puede usar, estudiar, modificar y compartir, como GNU (1983) y Linux (1991) (Stallman, 1983; Torvalds, 1991). Ejemplo: una receta compartida que cada cocinero puede mejorar y volver a compartir.' },
          { t: 'Internet y la Web no son lo mismo', d: 'Internet es la red de redes que conecta computadoras con un lenguaje común, TCP/IP, desde 1983. La Web es un servicio que viaja por ella: páginas enlazadas, con direcciones y navegadores (Leiner et al., 1997; CERN, s. f.-b). Ejemplo: Internet es la red de carreteras; la Web y el correo electrónico son servicios que circulan por ella.', ir: 'cierre' },
          { t: 'Módem', d: 'Convertía los datos en sonidos que viajaban por la línea telefónica, de ahí los chirridos al «conectarse». Ejemplo: dos máquinas que conversan por teléfono en su propio idioma.' },
          { t: 'Telefonía móvil digital', d: 'La red GSM digitalizó la voz desde 1991 y permitió los mensajes de texto desde 1992 (Elisa, s. f.; Stewart, 2026).' },
          { t: 'Memoria flash', d: 'Guarda datos sin electricidad atrapando cargas eléctricas en celdas; es la base de las memorias USB, las tarjetas de cámaras y, después, de los discos de estado sólido (CHM, s. f.-w).' },
          { t: 'GPU', d: 'Un procesador especializado en calcular millones de puntos de imagen (píxeles) al mismo tiempo. Nació para los videojuegos y en el Taller 4 se volverá el motor de la IA (Nvidia, s. f.).' }
        ],
        labs: [
          { id: 'reloj', n: 'Si cada tic durara un segundo' }
        ]
      },
      {
        id: 'frecuencia', tipo: 'grafico', icon: 'grafico', nav: 'Carrera de la frecuencia',
        titulo: 'La carrera de la frecuencia',
        desc: 'Frecuencia de reloj de diez procesadores, en escala que multiplica por diez en cada línea horizontal.',
        widget: 'graficoFrecuencia',
        pie: 'Parte de la aceleración vino del reloj y parte de hacer más trabajo en cada ciclo. La carrera terminó por el calor: desde mediados de los 2000 la industria sumó núcleos en lugar de subir la frecuencia (Hennessy y Patterson, 2019).',
        fuente: '10 procesadores, 1971–2000. Fuentes: (CHM, s. f.-i, s. f.-u; Intel, 2012, s. f.-b; AMD, 2000; Hachman, 2004)'
      },
      {
        id: 'maquina', tipo: 'maquinas', icon: 'maquina', nav: 'Por dentro',
        titulo: 'Por dentro de la máquina',
        desc: 'Primero, la anatomía de una PC de los noventa. Toque cada pieza. Después, seis máquinas representativas.',
        anatomia: 'pc',
        partes: [
          { k: 'placa', t: 'Placa base', d: 'Conecta todas las piezas', a: 'La calle principal de un barrio' },
          { k: 'cpu', t: 'Procesador (CPU)', d: 'Ejecuta las instrucciones', a: 'Quien cocina' },
          { k: 'ram', t: 'Memoria RAM', d: 'Guarda lo que se está usando y se borra al apagar', a: 'La mesa de trabajo' },
          { k: 'disco', t: 'Disco duro', d: 'Guarda programas y archivos de forma permanente', a: 'La alacena' },
          { k: 'unidades', t: 'Disquete y CD-ROM', d: 'Llevan información de un equipo a otro', a: 'Los recipientes para llevar comida' },
          { k: 'tarjetas', t: 'Tarjetas de expansión (video, sonido, módem)', d: 'Añaden funciones', a: 'Electrodomésticos que se enchufan' },
          { k: 'bios', t: 'BIOS', d: 'Programa básico que arranca la máquina', a: 'El portero que abre el edificio en la mañana' },
          { k: 'so', t: 'Sistema operativo (MS-DOS, Windows, Mac OS, Linux)', d: 'Administra la máquina y los programas', a: 'La administración del edificio' }
        ],
        campos: ['Año', 'Qué tenía por dentro', 'Por qué importó'],
        items: [
          { n: 'IBM PC 5150', v: ['1981', 'Procesador Intel 8088; 16 KB de RAM; 1.565 dólares', 'Fijó el estándar de los compatibles (IBM, s. f.-d; CHM, s. f.-u)'] },
          { n: 'Compaq Portable', v: ['1982', 'BIOS reconstruido legalmente', 'Primer portátil compatible: abrió el mercado de clones (CHM, s. f.-n)'] },
          { n: 'Apple Macintosh', v: ['1984', 'Motorola 68000; 128 KB de RAM; 2.495 dólares', 'Llevó ventanas y ratón al gran público (CHM, s. f.-l)'] },
          { n: 'Nintendo Famicom y NES', v: ['1983 en Japón; 1985–1986 en EE. UU.', 'Procesador derivado del 6502', 'Reactivó los videojuegos tras la crisis de 1983 (Cifaldi, 2017; IEEE Spectrum, 2017)'] },
          { n: 'Sony PlayStation', v: ['1994 en Japón', 'Juegos en disco compacto', 'Llevó el CD a la consola doméstica (Britannica Editors, 2026b)'] },
          { n: 'Deep Blue', v: ['1997', 'Supercomputadora de IBM con cientos de chips diseñados para el ajedrez', 'Evaluaba unos 200 millones de posiciones por segundo (Campbell et al., 2002; CHM, s. f.-v)'] }
        ]
      },
      {
        id: 'ia', tipo: 'ia', icon: 'hilo', nav: 'Hilo de la IA',
        titulo: 'El hilo de la IA: sistemas expertos, segundo invierno y renacer silencioso (1980–1999)',
        items: [
          { a: 'Años 80', t: 'El auge de los sistemas expertos', d: 'XCON, creado en Carnegie Mellon para la empresa DEC, configuraba pedidos de computadoras y fue uno de los primeros sistemas expertos exitosos en la industria (National Research Council, 1999). Muchas empresas compraron reglas «si… entonces…» y máquinas especializadas en el lenguaje Lisp.', e: 's' },
          { a: '1982–1992', t: 'Una carrera entre países', d: 'Japón lanzó en 1982 su proyecto de Computadoras de Quinta Generación, y EE. UU. respondió en 1983 con un programa de DARPA de 1.000 millones de dólares a diez años (National Research Council, 1999). Japón abandonó su proyecto en 1992 tras invertir cientos de millones de dólares (CHM, s. f.-v).', e: 's' },
          { a: 'Fin de los 80', t: 'El segundo invierno', d: 'Las estaciones de trabajo de uso general hundieron el negocio de las máquinas Lisp, y los sistemas expertos resultaron caros de mantener y frágiles ante casos no previstos (National Research Council, 1999). Entre finales de los ochenta y comienzos de los noventa cayeron la inversión y las expectativas.' },
          { a: '1986', t: 'Renacen las redes neuronales', d: 'En 1986 la retropropagación mostró cómo una red de varias capas aprende corrigiendo sus propios errores (Rumelhart et al., 1986). Ejemplo: afinar una guitarra: se escucha el error y se ajusta cada clavija un poco en la dirección correcta.', e: 'c' },
          { a: '1989–1998', t: 'Redes que leen', d: 'El equipo de Yann LeCun usó redes convolucionales para leer códigos postales escritos a mano en 1989; a finales de los noventa un sistema así leía varios millones de cheques al día (LeCun et al., 1989, 1998).', e: 'c' },
          { a: '1997', t: 'Memoria para secuencias', d: 'En 1997 Sepp Hochreiter y Jürgen Schmidhuber propusieron las redes LSTM, capaces de recordar información a lo largo de una frase o una señal (Hochreiter y Schmidhuber, 1997).', e: 'c' },
          { a: '1997', t: 'Deep Blue', d: 'El 11 de mayo de 1997 la supercomputadora de IBM venció al campeón mundial Garri Kaspárov por 3½ a 2½ (CHM, s. f.-v). Ganó con fuerza de cálculo y conocimiento de ajedrez programado, no aprendiendo como una persona (Campbell et al., 2002).', e: 's' }
        ],
        leccion: {
          t: 'La lección de la época',
          d: 'Escribir a mano todas las reglas del mundo resultó imposible. Mientras crecían el cómputo y los datos digitales, la IA empezó a cambiar de estrategia en términos de menos reglas escritas y más aprendizaje a partir de ejemplos.'
        }
      },
      {
        id: 'sociedad', tipo: 'sociedad', icon: 'sociedad', nav: 'Sociedad',
        titulo: 'Contexto social, económico y político',
        items: [
          { t: 'Del gigante a los clones', d: 'IBM definió el estándar, pero el negocio más rentable quedó en el procesador y el sistema operativo. IBM vivió una crisis a comienzos de los noventa, Louis Gerstner asumió su dirección el 1 de abril de 1993 para reestructurarla (IBM, s. f.-f), y en 2005 vendió su negocio de PC a la china Lenovo (IBM, 2005).', l: 'g' },
          { t: 'La guerra comercial de los chips', d: 'En los ochenta las empresas japonesas dominaron la memoria; en 1986 EE. UU. y Japón firmaron un acuerdo contra el *dumping*, y en 1987 EE. UU. impuso aranceles del 100 % a algunos productos japoneses (Irwin, 1996).', l: 'g' },
          { t: 'Nace la fundición', d: 'En 1987 Morris Chang fundó TSMC en Taiwán, con apoyo del gobierno, para fabricar chips diseñados por otras empresas (TSMC, s. f.; Hollar, s. f.). Ese modelo explica la geopolítica de los chips del Taller 4.', l: 'fg' },
          { t: 'Globalización e Internet comercial', d: 'Con el fin de la Guerra Fría se ampliaron las cadenas globales de producción. Internet pasó de proyecto académico y militar a red comercial cuando, en 1995, terminó la financiación pública de su red troncal en EE. UU. (Leiner et al., 1997).', l: 'f' },
          { t: 'Antimonopolio, segunda parte', d: 'En 1998 EE. UU. demandó a Microsoft por su dominio de Windows y del navegador; hubo fallo en 2000 y acuerdo en 2001 (DOJ, s. f., 2001).', l: 'g' },
          { t: 'La burbuja punto com', d: 'Los inversionistas apostaron por casi cualquier empresa «.com»; el índice Nasdaq llegó a 5.048 puntos en marzo de 2000 y luego se desplomó (Duignan, 2026).', l: 'f' },
          { t: 'El problema del año 2000', d: 'Muchos programas guardaban el año con dos dígitos y podían confundir 2000 con 1900. Solo para las agencias federales de EE. UU., el Congreso aprobó 3.350 millones de dólares de emergencia (U.S. General Accounting Office, 2000).', l: 'f' },
          { t: 'La PC entra al hogar', d: 'En EE. UU. tenía computadora el 8,2 % de los hogares en 1984 y el 51 % en 2000 (File, 2013; Newburger, 2001).', l: 'x', datos: { u: '%', max: 100, filas: [['Hogares de EE. UU. con computadora, 1984', 8.2], ['Hogares de EE. UU. con computadora, 2000', 51]] } },
          { t: 'Brecha de género', d: 'En EE. UU. las mujeres obtuvieron el 37,1 % de los títulos universitarios en computación en 1983–1984, su máximo histórico; en 2010–2011 eran el 17,6 % (National Center for Education Statistics [NCES], s. f.). La caída coincidió con la expansión de la PC, y sus causas siguen en estudio.', l: 'x', datos: { u: '%', max: 50, filas: [['Títulos en computación obtenidos por mujeres, 1983–1984', 37.1], ['Títulos en computación obtenidos por mujeres, 2010–2011', 17.6]] } }
        ]
      },
      {
        id: 'latam', tipo: 'latam', icon: 'latam', nav: 'América Latina',
        titulo: 'Mirada desde América Latina y Colombia',
        items: [
          { lugar: 'Región', a: '1982', t: 'La década perdida', d: 'Tras la crisis de la deuda que estalló en agosto de 1982, la inversión en América Latina cayó del 24,9 % del PIB (1975–1980) al 18,8 % (1981–1990) (Ocampo et al., 2014). Es razonable suponer que ese freno también retrasó la adopción de tecnología en la región.', datos: { u: '% del PIB', max: 30, filas: [['Inversión, 1975–1980', 24.9], ['Inversión, 1981–1990', 18.8]] } },
          { lugar: 'Brasil', a: '1991', t: 'Brasil abre su mercado', d: 'Una ley de 1991 desmontó la reserva de mercado informática que el país mantenía desde los setenta (Barros da Silva et al., 2025).' },
          { lugar: 'Colombia', a: '1991–1994', t: 'Colombia se conecta', d: 'El dominio .co fue delegado a la Universidad de los Andes el 24 de diciembre de 1991 (Internet Assigned Numbers Authority [IANA], 2020). El 4 de junio de 1994 se estableció la conexión entre EE. UU. y la Universidad de los Andes que marca la llegada de Internet al país (Arias, 2019), liderada por el ingeniero Hugo Sin (Redacción Semana, 2015).', co: true },
          { lugar: 'Colombia', a: '2000', t: 'Una agenda de país', d: 'En 2000 el documento CONPES 3072 lanzó la Agenda de Conectividad para masificar el uso de las tecnologías de la información en el Estado y la sociedad (Consejo Nacional de Política Económica y Social [CONPES], 2000).', co: true }
        ]
      },
      {
        id: 'mitos', tipo: 'mitos', icon: 'mitos', nav: 'Mitos',
        titulo: 'Mitos y precisiones',
        items: [
          { m: 'IBM inventó la computadora personal', v: 'falso', p: 'Ya había computadoras personales desde 1975–1977, como la Altair, la Apple II y la TRS-80; el IBM PC fijó el estándar empresarial (CHM, s. f.-j; IBM, s. f.-d).' },
          { m: 'Bill Gates escribió desde cero el sistema operativo del IBM PC', v: 'falso', p: 'Microsoft compró el sistema 86-DOS a otra empresa, primero con una licencia de 25.000 dólares y luego con todos los derechos por 50.000 más, y lo adaptó (Shustek, 2014).' },
          { m: 'Más megahercios siempre significa más rápido', v: 'falso', p: 'La frecuencia es solo una parte: también importan cuánto trabajo se hace por ciclo, la memoria caché y, más tarde, el número de núcleos (Hennessy y Patterson, 2019).' },
          { m: 'Deep Blue pensaba como un gran maestro', v: 'falso', p: 'Calculaba muchísimas jugadas por segundo con reglas y conocimiento programados; no aprendía de la experiencia como una persona (Campbell et al., 2002).' },
          { m: 'El problema del año 2000 fue un invento', v: 'falso', p: 'Hubo pocos fallos graves precisamente porque se invirtió a tiempo en corregir los programas (U.S. General Accounting Office, 2000).' }
        ]
      },
      {
        id: 'cierre', tipo: 'cierre', icon: 'cierre', nav: 'Cierre práctico',
        titulo: 'Cierre práctico del taller',
        actividades: [
          { t: 'Línea de tiempo viva', min: 20, d: 'Personas de distintas edades cuentan su primer contacto con una PC, un celular o Internet, y se ubican en la línea del taller.', widget: 'lineaViva' },
          { t: '¿Es la Web o solo usa Internet?', min: null, comparte: 'Dentro de los mismos 20 minutos', d: 'Además, el grupo clasifica servicios cotidianos (correo, WhatsApp, páginas web, juegos en línea) según si son parte de la Web o solo usan Internet.', widget: 'webInternet' }
        ]
      }
    ]
  });
})();
