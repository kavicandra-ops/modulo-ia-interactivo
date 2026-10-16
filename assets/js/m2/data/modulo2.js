/* Módulo 2 · De la sinapsis al centro de datos — portada, etapas y «Fuentes y método».
   Texto tomado de «De la sinapsis al centro de datos · edición didáctica» (datos revisados
   al 10 de octubre de 2026), reorganizado en diez talleres. */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {};

  M.m2.modulo = {
    titulo: 'De la sinapsis al centro de datos',
    sub: 'Cerebro y cómputo, 2026–2036',
    lede: 'Tu cerebro funciona con unos 20 vatios, lo que entrega un cargador rápido de teléfono. Con esa energía percibe, recuerda y decide. Las máquinas que hoy entrenan inteligencia artificial ya se miden en gigavatios. Este módulo cuenta, en potencias de diez, qué separa a unas de otras y qué puede aprender cada una de la otra.',
    presentacion: [
      'Este recorrido compara dos máquinas muy distintas. Una es tu cerebro, que piensa, recuerda y decide con unos 20 vatios, la potencia de un cargador de teléfono. La otra es el conjunto de computadoras más grandes del mundo, que ya se alimentan con millones y miles de millones de vatios. Compararlas parece fácil y es muy fácil hacerlo mal: se mezclan unidades, se confunden velocidades con totales y se presentan estimaciones como si fueran hechos.',
      'Aquí aprenderás a compararlas bien, desde el principio. No hace falta ninguna formación previa en neurociencia, física, electrónica, informática ni matemáticas: cada herramienta se explica antes de usarla, con ejemplos de la vida diaria y actividades para comprobar que la has entendido.'
    ],
    aprenderas: [
      'A leer números enormes y diminutos sin perderte: potencias de diez, notación científica y escalas logarítmicas.',
      'A distinguir cuatro preguntas que suelen mezclarse: cuántos hay, cuántas operaciones, cuánta energía y cuánta información.',
      'Cómo funciona el cerebro por dentro, de una sinapsis al encéfalo, y por qué gasta tan poca energía.',
      'Cómo calculan las máquinas, de un transistor a un centro de datos de un gigavatio.',
      'Qué comparaciones entre cerebro y silicio son legítimas, cuáles engañan y por qué.',
      'A distinguir un dato medido de una estimación, una declaración del fabricante, una proyección y una extrapolación.',
      'Las bases de la computación cuántica: qué es un cúbit, qué pasa al medirlo y por qué el ruido es su gran enemigo.'
    ],
    necesitas: 'Basta con saber sumar, restar, multiplicar y dividir, como para repartir una cuenta. Todo lo demás —qué es una potencia de diez, un vatio, un bit o una escala logarítmica— se enseña en los tres primeros talleres (la caja de herramientas y el prólogo) antes de aparecer en el relato.',
    verificacion: 'Las cifras proceden de «Cerebro y cómputo (2026–2036)», revisado al 10 de octubre de 2026, y de las fuentes primarias que cita; el 13 de octubre de 2026 se contrastaron 30 afirmaciones clave con fuentes externas: 28 quedaron confirmadas y 2 solo en parte. Las equivalencias en cerebros dividen la potencia entre 20 W, y las analogías cotidianas son aproximaciones de orden de magnitud.'
  };

  /* Las seis etapas del recorrido original, ahora repartidas en diez talleres */
  M.m2.etapas = {
    herr: { n: 'Caja de herramientas', d: 'Números grandes y pequeños, unidades, escalas, estimaciones y cómo leer una gráfica' },
    prol: { n: 'Prólogo · Cuatro reglas', d: 'Cantidad, cómputo, energía e información: qué mide cada una' },
    acto1: { n: 'Acto I · La máquina de 20 vatios', d: 'De una sinapsis al encéfalo completo, y cuánto cómputo «es» un cerebro' },
    acto2: { n: 'Acto II · La arena que calcula', d: 'Del transistor a los centros de datos de gigavatios' },
    acto3: { n: 'Acto III · El encuentro', d: 'Eficiencia, entrenamiento de IA, máquinas inspiradas en el cerebro y cúbits' },
    cierre: { n: 'Cierre', d: 'Siete ideas, laboratorio de errores y reto final' }
  };

  /* Las cuatro reglas (dimensiones) y las cinco marcas de evidencia */
  M.m2.dimensiones = {
    cnt: { n: 'Cantidad', p: '¿Cuántos hay?', u: 'objetos contados: neuronas, sinapsis, transistores, cúbits' },
    cmp: { n: 'Cómputo', p: '¿Cuántas operaciones?', u: 'FLOP y FLOP/s' },
    nrg: { n: 'Energía', p: '¿Cuánta potencia?', u: 'julios (J) y vatios (W)' },
    inf: { n: 'Información', p: '¿Cuánta información?', u: 'bits y bits por segundo' }
  };
  /* Definiciones literales de la lección F11 de la fuente */
  M.m2.marcas = [
    { k: 'medido', d: 'Resultado publicado con revisión por pares —otros científicos lo revisaron antes de publicarse— o en una clasificación oficial de rendimiento.' },
    { k: 'estimado', d: 'Sale de un modelo o del juicio de expertos, con supuestos explícitos. Puede ser excelente, pero depende de esos supuestos.' },
    { k: 'declarado', d: 'Lo afirma quien construyó el sistema, sin una evaluación independiente publicada. No es necesariamente falso, pero nadie ajeno lo ha comprobado.' },
    { k: 'proyectado', d: 'Una hoja de ruta, un objetivo o un escenario de terceros sobre el futuro.' },
    { k: 'extrapolado', d: 'Un cálculo propio de este recorrido a partir de las fuentes citadas; por ejemplo, prolongar una tendencia o dividir dos cifras.' }
  ];

  /* Formas abreviadas con que el texto cita algunas referencias */
  M.m2.aliasRefs = {
    'Intel, 2024': 'Intel Corporation, 2024',
    'TSMC, s. f.': 'Taiwan Semiconductor Manufacturing Company, s. f.',
    'TSMC, 2025': 'Taiwan Semiconductor Manufacturing Company, 2025',
    'TSMC, 2026': 'Taiwan Semiconductor Manufacturing Company, 2026',
    'IEA, 2025': 'International Energy Agency, 2025',
    'IEA, 2026': 'International Energy Agency, 2026',
    'Universidad de Zhejiang, 2025': 'Zhejiang University, 2025'
  };

  /* Nombres de los nueve niveles del zoom (cuatro del cerebro y cinco del silicio) */
  M.m2.niveles = ['Sinapsis', 'Neurona', 'Microcircuito cortical', 'Encéfalo completo', 'Transistor', 'Chip acelerador', 'Sistema neuromórfico', 'Supercomputadora', 'Centro de datos de IA'];

  /* Fuentes y método */
  M.m2.fuentes = {
    intro: 'Todas las cifras proceden de *Cerebro y cómputo (2026–2036)*, revisado al 10 de octubre de 2026, y de las fuentes primarias que cita. Las equivalencias en cerebros dividen la potencia entre 20 W, y las analogías cotidianas son aproximaciones de orden de magnitud. Las animaciones son esquemas ilustrativos, sin escala física.',
    apendice: 'Cuando un texto dice «cálculo B.1», «B.6» o «Apéndice B», remite a los cálculos del Apéndice B de ese libro, *Cerebro y cómputo (2026–2036)*. Este módulo no reproduce el apéndice: cada cálculo que usa se explica en su lección o en su ficha.',
    comoSeSabe: [
      ['Fuente primaria', 'El documento donde aparece por primera vez un dato: el artículo que describe un experimento, la lista oficial TOP500 o el comunicado de una empresa sobre su propio chip. Citar la fuente primaria permite comprobar el dato en su origen.'],
      ['Publicación científica', 'Un artículo en una revista con *revisión por pares*: otros especialistas lo revisaron antes de publicarse. Un *preprint* (arXiv, bioRxiv) es un artículo difundido antes, o sin, esa revisión: puede ser bueno, pero aún no ha pasado ese filtro.'],
      ['Medición experimental', 'Un valor obtenido con un instrumento o una prueba controlada: la tomografía que mide el consumo de glucosa del cerebro, o la prueba HPL que mide una supercomputadora. También tiene margen de error.'],
      ['Modelo', 'Una representación simplificada que calcula algo a partir de supuestos. Multiplicar sinapsis × frecuencia × operaciones por evento es un modelo: su resultado vale lo que valgan sus supuestos.'],
      ['Proyección', 'Una afirmación sobre el futuro: una hoja de ruta de una empresa, un objetivo de diseño o un escenario de un organismo. Describe intenciones o posibilidades, no hechos.']
    ],
    seisClases: [
      ['Clase de cifra', 'Ejemplo del recorrido', 'Marca'],
      ['Observada directamente', 'LineShine sostuvo 2,198 EFLOP/s en la prueba HPL (TOP500, junio de 2026).', '[medido]'],
      ['Calculada a partir de otras mediciones', 'Frontier gasta ≈1,8 × 10⁻¹¹ J por operación: 24,607 MW ÷ 1,353 EFLOP/s, dos cifras medidas en el TOP500 (B.6).', 'En la figura de energía por operación lleva la marca de sus mediciones, [medido]; otros cálculos propios del recorrido se marcan [extrapolado].'],
      ['Estimación que depende de supuestos', '~10¹⁵ FLOP/s para igualar al cerebro (Carlsmith, 2020).', '[estimado]'],
      ['Declarada por una empresa', 'Hala Point tiene 1.150 millones de neuronas de silicio (Intel, 2024).', '[declarado]'],
      ['Previsión condicionada por una tasa o un plan', '~20–30 EFLOP/s en 2036 si el crecimiento fuera del 25–30 % anual; FugakuNEXT hacia 2030.', '[extrapolado] · [proyectado]'],
      ['Interpretación o conclusión del autor', '«La lección más fértil del cerebro está en su organización» (idea VII).', 'sin marca: es un razonamiento, no una cifra']
    ],
    tresPreguntas: 'Las seis clases no sustituyen a las cinco marcas de la [lección F11](#m2t2-lec-f11): la última columna de la tabla dice qué marca lleva cada clase, y la sexta, la interpretación del autor, no lleva ninguna. Ante cualquier cifra, tres preguntas: **¿quién lo dice?**, **¿cómo lo sabe?** y **¿qué supone?** Las fichas «¿De dónde sale este dato?» responden a las tres para las dieciséis cifras principales.',
    revision: [
      'Los datos del original están **revisados al 10 de octubre de 2026**, y esa fecha se mantiene. Para la edición didáctica, el 13 de octubre de 2026 se contrastaron con fuentes externas —primarias siempre que fue posible; a veces, secundarias, como agregadores de datos, notas de prensa o la versión preprint de un artículo— 30 afirmaciones clave: 28 quedaron confirmadas y 2 solo en parte. **No se ha cambiado ninguna cifra del original.** Las discrepancias y matices se señalan en notas visibles, dentro de las fichas de evidencia correspondientes:',
      { ul: [
        '**Parcial · conectoma de la mosca** (ficha del nivel 3): las «160.000 a 166.700» neuronas corresponden a dos conectomas distintos, de una hembra (Bates et al., 2026) y de un macho (Berg et al., 2026).',
        '**Parcial · base de Epoch AI** (ficha de los 13,8 GW): se actualizó el 12 de octubre de 2026, después de la revisión del original (94 sitios, 14,1 GW de TI, 18,3 GW con sobrecarga, 14,6 millones de H100e, cobertura del 44 %). La versión del 5 de octubre no pudo recuperarse.',
        '**Inconsistencias internas**: «×100–1.000» frente a ~270–2.500 con las cifras de la propia fuente y su marca (nivel 5); las convenciones del cerebro marcadas como «estimado» en una figura y como «extrapolado» en el ancla, y «unas diez veces» frente a ≈18 (energía por operación).',
        '**Matices de atribución o redacción**: «algo más del 1,5 %» frente a «alrededor del 1,5 %» y la cifra de 465 TWh (Colossus 2); la etiqueta «especulativo» de Grok 4 (entrenamiento); la fidelidad de una puerta de Helios y los cúbits del experimento de Willow (cúbits); las unidades «vatios de ATP» de Levy y Calvert (encéfalo); la cifra densa de la H100 (chip).'
      ] },
      'Las 111 referencias del original se conservan sin cambios, agrupadas en sus cinco áreas, al final de esta página.',
      'Esta edición no añade referencias nuevas a la lista; las páginas consultadas en la verificación se citan, cuando hace falta, en las propias notas.'
    ],
    pendientes: [
      'Base de Epoch AI: la versión citada (5 de octubre de 2026) no pudo recuperarse; la actual (12 de octubre) da cifras algo mayores. Decidir si se actualizan las cifras de los capítulos «Centros de datos» y «Nivel 9», con nueva fecha y fuente.',
      'Conectoma de la mosca: separar en el texto las cifras de la hembra (Bates et al., 2026, ~160.000) y del macho (Berg et al., 2026, 166.700).',
      'Corregir, si el autor lo confirma, «×100–1.000» (con las cifras de Horowitz, ~270–2.500) y unificar la marca de las convenciones del cerebro en la figura de energía por operación.',
      'Revisar «unas diez veces» frente al ≈18 del apéndice B.6, «algo más del 1,5 %» frente a «alrededor del 1,5 %» y la etiqueta «especulativo» de Grok 4.',
      'No se pudieron leer las cifras del informe de diseño de FugakuNEXT de mayo de 2026 ni la página de *PNAS* de Levy y Calvert; las comprobaciones se hicieron con las diapositivas de 2025 y la versión de bioRxiv.',
      'Ficha de los 13,8 GW, «Qué no puede inferirse»: el original remite a la «lección II.7» para el consumo anual, pero la multiplicación por las horas y el uso medio se explica en la lección II.5; en este módulo el enlace lleva a la II.5.',
      'Los cálculos ilustrativos añadidos por la edición didáctica (por ejemplo, la energía anual de un campus con un uso supuesto, los cúbits físicos para 100 cúbits lógicos o la energía de una corrida con ritmos supuestos) están marcados como tales y no proceden de las fuentes.'
    ]
  };
})();
