/* Generado a partir de «De la sinapsis al centro de datos · edición didáctica» (datos revisados al 10 de octubre de 2026). */
(function () {
  'use strict';
  var M = window.M = window.M || {}; M.m2 = M.m2 || {};
  M.m2.temasGlosario = {
 "num": "Números y unidades",
 "bio": "Cerebro",
 "sil": "Silicio y supercomputación",
 "nrg": "Energía y centros de datos",
 "ia": "Inteligencia artificial",
 "q": "Cuántica",
 "met": "Método"
};
  M.m2.glosario = [
 {
  "id": "g-shor",
  "termino": "Algoritmo de Shor",
  "sencillo": "Una receta para computadoras cuánticas que encuentra los factores de números enormes, es decir, qué números multiplicados dan otro. Si llegara a funcionar a gran escala, rompería buena parte de la criptografía que protege internet.",
  "preciso": "Algoritmo cuántico que factoriza enteros y calcula logaritmos discretos; es la base de los ataques a RSA y a la criptografía de curvas elípticas.",
  "ejemplo": "Factorizar 15 es fácil (3 × 5); factorizar un número de más de 600 cifras, como los de RSA-2048, está fuera del alcance de las computadoras actuales.",
  "mas": "Lección III.5 · Interferencia · Acto III · 4",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.5 · Interferencia",
    "#m2t9-lec-iii5"
   ],
   [
    "Acto III · 4",
    "#m2t9-cap-cubit"
   ]
  ]
 },
 {
  "id": "g-amplitud",
  "termino": "Amplitud (cuántica)",
  "sencillo": "Un número asociado a cada resultado posible de un cúbit. Elevado al cuadrado da la probabilidad de obtener ese resultado al medir. Puede ser negativo (o complejo), y por eso las amplitudes pueden anularse entre sí.",
  "preciso": "Número complejo asociado a cada resultado posible de un sistema cuántico; el cuadrado de su módulo es la probabilidad de obtener ese resultado al medir.",
  "ejemplo": "Amplitud 0,707 → probabilidad 0,707² ≈ 0,5, es decir, 50 %.",
  "mas": "Lección III.4 · Del bit al cúbit",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ]
  ]
 },
 {
  "id": "g-apu",
  "termino": "APU",
  "sencillo": "Un chip que junta en un mismo paquete los dos tipos de procesador: el de uso general (CPU) y el especializado en cálculos en paralelo (GPU), a menudo con memoria compartida. APU viene del inglés *accelerated processing unit*, unidad de procesamiento acelerada.",
  "preciso": "Procesador que integra núcleos de CPU y de GPU en un mismo encapsulado, a menudo con memoria compartida.",
  "ejemplo": "El Capitan usa la APU MI300A, con 128 GB de memoria HBM3 compartida.",
  "mas": "Lección II.2 · El chip acelerador",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.2 · El chip acelerador",
    "#m2t6-lec-ii2"
   ]
  ]
 },
 {
  "id": "g-bit",
  "termino": "Bit y byte añadida en esta edición",
  "sencillo": "Un bit es la unidad mínima de información: un sí o un no, un 0 o un 1. Un byte son 8 bits.",
  "preciso": "El bit es la información necesaria para distinguir entre dos alternativas igual de probables; 1 byte = 8 bits; 1 petabyte (PB) = 10¹⁵ bytes.",
  "ejemplo": "1,4 PB de imágenes = 1,4 × 10¹⁵ bytes.",
  "mas": "Lección D4 · Información",
  "tema": "num",
  "nueva": true,
  "enlaces": [
   [
    "Lección D4 · Información",
    "#m2t3-lec-d4"
   ]
  ]
 },
 {
  "id": "g-centro",
  "termino": "Centro de datos añadida en esta edición",
  "sencillo": "Un edificio o un campus lleno de computadoras, con su alimentación eléctrica y su refrigeración.",
  "preciso": "Instalación que aloja equipos de cómputo, almacenamiento y red; su tamaño se expresa en potencia IT (sin refrigeración) o total (con ella), y su consumo, en energía (TWh por año).",
  "ejemplo": "Colossus 2, en Memphis: ~946 MW de potencia IT (estimado).",
  "mas": "Lección II.5 · Centros de datos",
  "tema": "nrg",
  "nueva": true,
  "enlaces": [
   [
    "Lección II.5 · Centros de datos",
    "#m2t7-lec-ii5"
   ]
  ]
 },
 {
  "id": "g-cfet",
  "termino": "CFET",
  "sencillo": "Un diseño futuro de transistor que apila uno encima de otro los dos tipos de transistor que forman los circuitos, para ocupar menos superficie. CFET viene del inglés *complementary FET*, transistor de efecto de campo complementario.",
  "preciso": "Transistor que apila verticalmente los dispositivos de tipo n y p para reducir el área de las celdas lógicas.",
  "ejemplo": "imec lo sitúa a partir del nodo A7.",
  "mas": "Lección II.1 · El transistor · Nivel 5",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.1 · El transistor",
    "#m2t6-lec-ii1"
   ],
   [
    "Nivel 5",
    "#m2t6-n-transistor"
   ]
  ]
 },
 {
  "id": "g-codsup",
  "termino": "Código de superficie",
  "sencillo": "Una forma de proteger la información cuántica: un cúbit fiable (lógico) se reparte entre muchos cúbits físicos colocados en una cuadrícula, que se vigilan entre sí para detectar errores sin leer los datos.",
  "preciso": "Código de corrección de errores que dispone los cúbits físicos en una retícula plana; en su versión rotada, un cúbit lógico de distancia d usa d² cúbits de datos y d² − 1 de medida.",
  "ejemplo": "Con distancia 3: 9 cúbits de datos + 8 de comprobación = 17 cúbits físicos por cúbit lógico.",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-qldpc",
  "termino": "Códigos qLDPC",
  "sencillo": "Otra familia de códigos de corrección de errores cuánticos: protege más cúbits lógicos con menos cúbits físicos que el código de superficie. qLDPC viene del inglés *quantum low-density parity-check*, comprobación de paridad de baja densidad.",
  "preciso": "Familia de códigos cuánticos de baja densidad que protegen más cúbits lógicos con menos cúbits físicos que el código de superficie.",
  "ejemplo": "Webster et al. (2026) estiman menos de 10⁵ cúbits para el algoritmo de Shor con estos códigos (preprint).",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-tolerancia",
  "termino": "Computación tolerante a fallos",
  "sencillo": "Hacer cálculos cuánticos largos sin que los errores los arruinen, porque se corrigen continuamente mientras se calcula.",
  "preciso": "Ejecución de algoritmos largos sobre cúbits lógicos, con corrección continua de errores y un error total lo bastante bajo para completar el cálculo.",
  "ejemplo": "IBM prevé Starling en 2029: 10⁸ puertas sobre 200 cúbits lógicos (proyectado).",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-conectoma",
  "termino": "Conectoma",
  "sencillo": "El mapa completo de un sistema nervioso: todas sus neuronas y todas sus conexiones.",
  "preciso": "Mapa completo de las neuronas de un sistema nervioso y de sus conexiones sinápticas.",
  "ejemplo": "El del gusano C. elegans tiene 302 neuronas; el del encéfalo de la mosca adulta, 139.255. Aún no existe el de ningún mamífero.",
  "mas": "Lección I.3 · El microcircuito",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.3 · El microcircuito",
    "#m2t4-lec-i3"
   ]
  ]
 },
 {
  "id": "g-convencion",
  "termino": "Convención (de comparación) añadida en esta edición",
  "sencillo": "Una regla acordada para poder comparar cosas que no se miden igual, como el cerebro y una computadora.",
  "preciso": "En este recorrido, la cifra de FLOP/s que se atribuye al cerebro (10¹³, 10¹⁵ o 10¹⁸) para calcular su energía por operación; los resultados cambian con ella.",
  "ejemplo": "Con 10¹⁵ FLOP/s, el cerebro gasta 2 × 10⁻¹⁴ J por operación; con 10¹⁸, 2 × 10⁻¹⁷ J.",
  "mas": "Lección I.7 · S × f × k · Lección III.1 · Eficiencia",
  "tema": "met",
  "nueva": true,
  "enlaces": [
   [
    "Lección I.7 · S × f × k",
    "#m2t5-lec-i7"
   ],
   [
    "Lección III.1 · Eficiencia",
    "#m2t8-lec-iii1"
   ]
  ]
 },
 {
  "id": "g-holevo",
  "termino": "Cota de Holevo",
  "sencillo": "Un límite de la física cuántica: de n cúbits solo pueden sacarse, como mucho, n bits de información al medirlos.",
  "preciso": "Límite según el cual de n cúbits no pueden extraerse más de n bits clásicos de información.",
  "ejemplo": "Describir 50 cúbits exige ~10¹⁵ números, pero al medirlos dan solo 50 bits.",
  "mas": "Lección III.4 · Del bit al cúbit",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ]
  ]
 },
 {
  "id": "g-cpu",
  "termino": "CPU y GPU añadida en esta edición",
  "sencillo": "La CPU es el procesador de uso general, con pocos núcleos muy capaces; la GPU, uno con miles de núcleos sencillos que repiten la misma operación sobre muchos datos a la vez.",
  "preciso": "CPU, del inglés *central processing unit* (procesador central); GPU, de *graphics processing unit* (unidad de procesamiento gráfico), hoy usada como acelerador de IA y de cálculo científico.",
  "ejemplo": "LineShine solo usa CPU; las máquinas de IA, sobre todo GPU.",
  "mas": "Lección II.2 · El chip acelerador",
  "tema": "sil",
  "nueva": true,
  "enlaces": [
   [
    "Lección II.2 · El chip acelerador",
    "#m2t6-lec-ii2"
   ]
  ]
 },
 {
  "id": "g-cubit",
  "termino": "Cúbit",
  "sencillo": "La unidad de información de una computadora cuántica. Puede imaginarse como una flecha que apunta a cualquier punto de una esfera; al medirla da 0 o 1, al azar, con probabilidades que dependen de hacia dónde apunte.",
  "preciso": "Unidad de información cuántica. A diferencia del bit, puede estar en una superposición de 0 y 1; al medirlo da uno de los dos valores, con probabilidades fijadas por sus amplitudes.",
  "ejemplo": "Inclinada 60° desde arriba: 75 % de medir 0 y 25 % de medir 1.",
  "mas": "Lección III.4 · Del bit al cúbit",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ]
  ]
 },
 {
  "id": "g-cubitf",
  "termino": "Cúbit físico",
  "sencillo": "Un cúbit «de verdad» del aparato —un ion, un átomo o un circuito superconductor—, sin protección contra errores.",
  "preciso": "Dispositivo material que almacena un cúbit sin la protección de un código de corrección de errores.",
  "ejemplo": "Helios tiene 98 cúbits físicos.",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-cubitl",
  "termino": "Cúbit lógico",
  "sencillo": "Un cúbit fiable fabricado con muchos cúbits físicos que se protegen entre sí mediante un código de corrección de errores. Es el que usan los algoritmos.",
  "preciso": "Unidad de información cuántica protegida por un código de corrección de errores y codificada en varios cúbits físicos.",
  "ejemplo": "Con el código de superficie de distancia 5, un cúbit lógico usa 49 físicos.",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-vonneumann",
  "termino": "Cuello de botella de von Neumann",
  "sencillo": "El atasco que se produce porque, en una computadora clásica, la memoria y el procesador están separados y los datos tienen que viajar sin parar entre ellos, gastando tiempo y energía.",
  "preciso": "Limitación de rendimiento y de energía derivada de la separación física entre el procesador y la memoria.",
  "ejemplo": "Traer un dato de la memoria externa cuesta ~10³ pJ, frente a 0,4–3,7 pJ por operación (45 nm).",
  "mas": "Lección II.1 · El precio de mover datos",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.1 · El precio de mover datos",
    "#m2t6-lec-ii1"
   ]
  ]
 },
 {
  "id": "g-decoherencia",
  "termino": "Decoherencia",
  "sencillo": "La pérdida de la información de un cúbit por culpa del entorno. La flecha que lo representa se acorta, y el cúbit acaba comportándose como una moneda al aire: 50 % y 50 %.",
  "preciso": "Pérdida de la información cuántica por la interacción con el entorno; en la esfera de Bloch acorta la flecha y convierte el estado en una mezcla.",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-dispersion",
  "termino": "Dispersión (sparsity)",
  "sencillo": "Cuántos datos son ceros o están inactivos. Muchos chips se saltan las operaciones con ceros; si se cuentan como hechas, la cifra de pico «con dispersión» se duplica sin que el chip trabaje más.",
  "preciso": "Proporción de elementos nulos o inactivos. El rendimiento «con dispersión» cuenta como ejecutadas operaciones con ceros que el hardware omite y, con dispersión estructurada, duplica el pico denso.",
  "ejemplo": "H100: 3.958 TFLOP/s en FP8 con dispersión, 1.979 sin ella.",
  "mas": "Lección II.2 · El chip acelerador · Trampa 5",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.2 · El chip acelerador",
    "#m2t6-lec-ii2"
   ],
   [
    "Trampa 5",
    "#m2t10-trampa-5"
   ]
  ]
 },
 {
  "id": "g-dram",
  "termino": "DRAM añadida en esta edición",
  "sencillo": "La memoria principal de una computadora: grande y barata, pero fuera del procesador, así que traer datos desde ella cuesta mucha energía.",
  "preciso": "Del inglés *dynamic random-access memory*, memoria dinámica de acceso aleatorio. En 45 nm, ~10³ pJ por acceso a DRAM externa (Horowitz, 2014).",
  "mas": "Lección II.1 · El precio de mover datos",
  "tema": "sil",
  "nueva": true,
  "enlaces": [
   [
    "Lección II.1 · El precio de mover datos",
    "#m2t6-lec-ii1"
   ]
  ]
 },
 {
  "id": "g-eficiencia",
  "termino": "Eficiencia energética añadida en esta edición",
  "sencillo": "Cuánto trabajo se obtiene por cada unidad de energía; o, al revés, cuánta energía cuesta cada operación.",
  "preciso": "η = R/P, en operaciones por julio, o su inversa E = P/R, en julios por operación; 1 GFLOP/s por vatio = 10⁹ FLOP/J.",
  "ejemplo": "Frontier: ≈ 55 GFLOP/s por vatio ≈ 1,8 × 10⁻¹¹ J por operación.",
  "mas": "Lección III.1 · Eficiencia · Trampa 1",
  "tema": "nrg",
  "nueva": true,
  "enlaces": [
   [
    "Lección III.1 · Eficiencia",
    "#m2t8-lec-iii1"
   ],
   [
    "Trampa 1",
    "#m2t10-trampa-1"
   ]
  ]
 },
 {
  "id": "g-entrelazamiento",
  "termino": "Entrelazamiento",
  "sencillo": "Una conexión cuántica entre cúbits: el estado del conjunto no puede describirse cúbit a cúbit. Por eso describir n cúbits exige 2ⁿ números.",
  "preciso": "Correlación cuántica entre cúbits que impide describir el estado de cada uno por separado.",
  "ejemplo": "Con 37 cúbits, las amplitudes ya superan a las neuronas del encéfalo (2³⁷ ≈ 1,4 × 10¹¹).",
  "mas": "Lección III.4 · Del bit al cúbit · Acto III · 4",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ],
   [
    "Acto III · 4",
    "#m2t9-cap-cubit"
   ]
  ]
 },
 {
  "id": "g-h100e",
  "termino": "Equivalente H100 (H100e)",
  "sencillo": "Una unidad para expresar la capacidad de cálculo de un centro de datos como si todos sus chips fueran NVIDIA H100, aunque tenga chips distintos.",
  "preciso": "Unidad de capacidad de cómputo de IA expresada como el rendimiento pico de una GPU NVIDIA H100.",
  "ejemplo": "Colossus 2: unos 1,1 millones de H100e (estimado).",
  "mas": "Lección II.5 · Centros de datos",
  "tema": "nrg",
  "enlaces": [
   [
    "Lección II.5 · Centros de datos",
    "#m2t7-lec-ii5"
   ]
  ]
 },
 {
  "id": "g-dennard",
  "termino": "Escala de Dennard",
  "sencillo": "La regla que durante décadas hizo que cada transistor más pequeño fuera también más rápido sin calentar más el chip. Dejó de cumplirse hacia 2007–2012.",
  "preciso": "Regla según la cual, al reducir el transistor, también bajan su voltaje y su corriente, de modo que la densidad de potencia se mantiene. Empezó a frenarse hacia 2007 y casi había desaparecido en 2012.",
  "mas": "Lección II.1 · El transistor",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.1 · El transistor",
    "#m2t6-lec-ii1"
   ]
  ]
 },
 {
  "id": "g-escala-larga",
  "termino": "Escala larga y escala corta añadida en esta edición",
  "sencillo": "Dos maneras de nombrar los números grandes. En español, un billón es un millón de millones (10¹²); en inglés, *a billion* son mil millones (10⁹).",
  "preciso": "Escala larga (español): millón 10⁶, billón 10¹², trillón 10¹⁸. Escala corta (inglés): *million* 10⁶, *billion* 10⁹, *trillion* 10¹².",
  "ejemplo": "«2 billion pulsed neurons» = 2.000 millones de neuronas de impulsos.",
  "mas": "Lección F4 · Billón y billion",
  "tema": "num",
  "nueva": true,
  "enlaces": [
   [
    "Lección F4 · Billón y billion",
    "#m2t1-lec-f4"
   ]
  ]
 },
 {
  "id": "g-log",
  "termino": "Escala logarítmica",
  "sencillo": "Una regla de medir en la que cada paso igual **multiplica** por el mismo número (normalmente 10), en lugar de sumar. Permite ver en una misma figura cifras diminutas y enormes.",
  "preciso": "Escala en la que cada paso igual multiplica por el mismo factor, normalmente diez; la distancia entre dos marcas indica cuántas veces cabe una cifra en la otra.",
  "ejemplo": "1, 10, 100 y 1.000 quedan igual de separados.",
  "mas": "Lección F6 · Escala logarítmica",
  "tema": "num",
  "enlaces": [
   [
    "Lección F6 · Escala logarítmica",
    "#m2t1-lec-f6"
   ]
  ]
 },
 {
  "id": "g-bloch",
  "termino": "Esfera de Bloch",
  "sencillo": "El dibujo que representa un cúbit como una flecha dentro de una esfera: arriba está |0⟩ y abajo |1⟩; la altura de la punta da las probabilidades, y el giro alrededor del eje, la fase.",
  "preciso": "Representación del estado de un cúbit como un punto de una esfera: el polo norte es |0⟩, el sur es |1⟩, la altura fija las probabilidades y la longitud, la fase.",
  "mas": "Lección III.4 · Del bit al cúbit",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ]
  ]
 },
 {
  "id": "g-estereologia",
  "termino": "Estereología",
  "sencillo": "Una forma de contar objetos microscópicos sin contarlos todos: se cuentan en muestras pequeñas y se multiplica la densidad por el volumen total.",
  "preciso": "Método que estima cantidades en tres dimensiones a partir de muestras de cortes de tejido, multiplicando una densidad medida por un volumen.",
  "ejemplo": "Así se estimaron las sinapsis de la neocorteza: 1,64 × 10¹⁴ (Tang et al., 2001).",
  "mas": "Lección I.1 · La sinapsis · Lección I.6 · Contar neuronas",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.1 · La sinapsis",
    "#m2t4-lec-i1"
   ],
   [
    "Lección I.6 · Contar neuronas",
    "#m2t5-lec-i6"
   ]
  ]
 },
 {
  "id": "g-exa",
  "termino": "Exaflop y exascala",
  "sencillo": "Un exaflop por segundo son 10¹⁸ operaciones con decimales por segundo: un trillón. Una máquina de «exaescala» sostiene esa cifra en doble precisión en la prueba HPL.",
  "preciso": "10¹⁸ operaciones de punto flotante por segundo. En el TOP500, la exascala exige sostenerlas en doble precisión en el HPL.",
  "ejemplo": "LineShine: 2,198 EFLOP/s (junio de 2026).",
  "mas": "Lección II.4 · La supercomputadora",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · La supercomputadora",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-extrapolacion",
  "termino": "Extrapolación y proyección añadida en esta edición",
  "sencillo": "Extrapolar es prolongar una tendencia con una tasa supuesta («si sigue así…»); proyectar es anunciar un objetivo, una hoja de ruta o un escenario sobre el futuro. Ninguna de las dos es una predicción segura.",
  "preciso": "En este recorrido, «extrapolado» marca un cálculo propio (prolongar una tendencia o dividir cifras) y «proyectado», una hoja de ruta, un objetivo o un escenario de terceros.",
  "ejemplo": "~20–30 EFLOP/s en 2036 a un 25–30 % anual (extrapolado); FugakuNEXT hacia 2030 (proyectado).",
  "mas": "Lección F11 · Clases de cifras · Lección II.6 · Crecimiento compuesto · Trampa 9",
  "tema": "met",
  "nueva": true,
  "enlaces": [
   [
    "Lección F11 · Clases de cifras",
    "#m2t2-lec-f11"
   ],
   [
    "Lección II.6 · Crecimiento compuesto",
    "#m2t7-lec-ii6"
   ],
   [
    "Trampa 9",
    "#m2t10-trampa-9"
   ]
  ]
 },
 {
  "id": "g-flop",
  "termino": "FLOP y FLOP/s",
  "sencillo": "Un FLOP es una operación aritmética (sumar, multiplicar…) con números con decimales; FLOP/s, cuántas de esas operaciones se hacen por segundo. El primero es un total; el segundo, un ritmo. FLOP viene del inglés *floating-point operation*, operación de punto flotante.",
  "preciso": "Operación de punto flotante (una cantidad) y número de esas operaciones por segundo (una tasa).",
  "ejemplo": "Entrenar GPT-6 Astra: ~10²⁷ FLOP (un total). LineShine: ~2,2 × 10¹⁸ FLOP/s (un ritmo).",
  "mas": "Lección D2 · Cómputo · Lección F8 · Total y ritmo",
  "tema": "num",
  "enlaces": [
   [
    "Lección D2 · Cómputo",
    "#m2t3-lec-d2"
   ],
   [
    "Lección F8 · Total y ritmo",
    "#m2t2-lec-f8"
   ]
  ]
 },
 {
  "id": "g-fp",
  "termino": "FP64, FP16, FP8",
  "sencillo": "Tamaños de número con decimales: 64, 16 u 8 bits. Más bits, más precisión; menos bits, operaciones más baratas. FP viene del inglés *floating point*, punto flotante.",
  "preciso": "Formatos de números de 64, 16 y 8 bits. Cuanto menor el formato, menor el costo energético por operación y menor la precisión numérica.",
  "ejemplo": "La simulación científica usa FP64; buena parte de la IA, FP8.",
  "mas": "Lección D2 · Cómputo · Lección II.2 · El chip acelerador",
  "tema": "sil",
  "enlaces": [
   [
    "Lección D2 · Cómputo",
    "#m2t3-lec-d2"
   ],
   [
    "Lección II.2 · El chip acelerador",
    "#m2t6-lec-ii2"
   ]
  ]
 },
 {
  "id": "g-fraccionador",
  "termino": "Fraccionador isotrópico",
  "sencillo": "Un método para contar células: se disuelve el tejido hasta obtener una «sopa» uniforme de núcleos celulares, se cuentan muestras y se multiplica por el volumen total.",
  "preciso": "Método que convierte el tejido en una suspensión homogénea de núcleos celulares y cuenta muestras de ella para estimar el número total de células.",
  "ejemplo": "Así se obtuvieron los 86.100 millones de neuronas de Azevedo et al. (2009).",
  "mas": "Lección I.6 · Contar neuronas",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.6 · Contar neuronas",
    "#m2t5-lec-i6"
   ]
  ]
 },
 {
  "id": "g-green500",
  "termino": "Green500",
  "sencillo": "La clasificación de las supercomputadoras del TOP500 según su eficiencia: cuántas operaciones hacen por cada vatio en la prueba HPL.",
  "preciso": "Clasificación de los sistemas del TOP500 según su rendimiento en el HPL por vatio consumido.",
  "ejemplo": "KAIROS: 73,28 GFLOP/s por vatio, n.º 1 en junio de 2026.",
  "mas": "Lección III.1 · Eficiencia",
  "tema": "sil",
  "enlaces": [
   [
    "Lección III.1 · Eficiencia",
    "#m2t8-lec-iii1"
   ]
  ]
 },
 {
  "id": "g-hbm",
  "termino": "HBM",
  "sencillo": "Memoria apilada en capas y colocada pegada al procesador, dentro del mismo paquete, para que los datos viajen poco. HBM viene del inglés *high-bandwidth memory*, memoria de gran ancho de banda.",
  "preciso": "Memoria de gran ancho de banda: DRAM apilada verticalmente e integrada junto al procesador en el mismo encapsulado.",
  "mas": "Lección II.2 · El chip acelerador",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.2 · El chip acelerador",
    "#m2t6-lec-ii2"
   ]
  ]
 },
 {
  "id": "g-hercio",
  "termino": "Hercio (Hz) añadida en esta edición",
  "sencillo": "Una vez por segundo. Mide frecuencias: cuántas veces ocurre algo cada segundo.",
  "preciso": "Unidad del sistema internacional de frecuencia: 1 Hz = 1 s⁻¹.",
  "ejemplo": "0,5 Hz = una vez cada dos segundos; 453 Hz = 453 veces por segundo.",
  "mas": "Lección I.2 · La neurona",
  "tema": "num",
  "nueva": true,
  "enlaces": [
   [
    "Lección I.2 · La neurona",
    "#m2t4-lec-i2"
   ]
  ]
 },
 {
  "id": "g-hpcg",
  "termino": "HPCG",
  "sencillo": "Una prueba para supercomputadoras que depende mucho de la memoria, como muchas aplicaciones reales. En ella, las máquinas rinden en torno al 1 % de su cifra en HPL. HPCG viene del inglés *High-Performance Conjugate Gradients*, por el método de cálculo que usa.",
  "preciso": "Banco de pruebas basado en el método del gradiente conjugado, representativo de aplicaciones limitadas por el acceso a memoria.",
  "ejemplo": "LineShine: 22,0 PFLOP/s en HPCG frente a 2.198 PFLOP/s en HPL.",
  "mas": "Lección II.4 · Bancos de prueba",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · Bancos de prueba",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-hpl",
  "termino": "HPL",
  "sencillo": "La prueba de la lista TOP500: resolver un sistema enorme de ecuaciones en doble precisión. Mantiene muy ocupados los procesadores. HPL viene del inglés *High-Performance Linpack*.",
  "preciso": "Banco de pruebas que resuelve un sistema de ecuaciones lineales denso en doble precisión; es la base de la lista TOP500.",
  "mas": "Lección II.4 · Bancos de prueba",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · Bancos de prueba",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-mxp",
  "termino": "HPL-MxP",
  "sencillo": "Una versión de la prueba HPL que permite usar números más pequeños en parte del cálculo; da cifras mucho mayores. MxP abrevia *mixed precision*, precisión mixta.",
  "preciso": "Variante del HPL que admite precisión mixta y refleja el potencial de los formatos reducidos.",
  "ejemplo": "El Capitan: 16,7 EFLOP/s en HPL-MxP frente a 1,809 en HPL (×9,2).",
  "mas": "Lección II.4 · Bancos de prueba",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · Bancos de prueba",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-interferencia",
  "termino": "Interferencia",
  "sencillo": "Lo que pasa cuando dos ondas se encuentran: se refuerzan si coinciden y se anulan si están opuestas. En un cúbit les pasa lo mismo a las amplitudes; es su recurso para calcular.",
  "preciso": "Suma de amplitudes que puede reforzarlas o anularlas, como ocurre con las ondas; es el recurso que aprovechan los algoritmos cuánticos.",
  "ejemplo": "Los auriculares con cancelación de ruido emiten una onda opuesta al ruido para anularlo.",
  "mas": "Lección III.5 · Interferencia",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.5 · Interferencia",
    "#m2t9-lec-iii5"
   ]
  ]
 },
 {
  "id": "g-interneurona",
  "termino": "Interneurona de disparo rápido",
  "sencillo": "Un tipo de neurona local que frena a sus vecinas y puede encadenar impulsos muy deprisa, cientos por segundo, durante ráfagas breves.",
  "preciso": "Neurona inhibidora local capaz de encadenar impulsos a cientos de hercios durante ráfagas breves.",
  "ejemplo": "En corteza humana, ex vivo: 453 Hz de máximo instantáneo medio (Wang et al., 2016).",
  "mas": "Lección I.2 · La neurona",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.2 · La neurona",
    "#m2t4-lec-i2"
   ]
  ]
 },
 {
  "id": "g-landauer",
  "termino": "Landauer (principio de)",
  "sencillo": "Un límite de la física: borrar un bit de información cuesta como mínimo una pequeñísima cantidad de energía, que depende de la temperatura.",
  "preciso": "Cota termodinámica según la cual borrar un bit de información disipa al menos kBT ln 2 de energía, unos 3 × 10⁻²¹ J a la temperatura corporal.",
  "ejemplo": "Unos 3 × 10⁻²¹ J por bit a la temperatura del cuerpo; con 20 W, como mucho ~6,7 × 10²¹ borrados por segundo.",
  "mas": "Acto I · 3 · Profundiza · Lección III.1 · Eficiencia",
  "tema": "nrg",
  "enlaces": [
   [
    "Acto I · 3 · Profundiza",
    "#m2t5-cap-computo"
   ],
   [
    "Lección III.1 · Eficiencia",
    "#m2t8-lec-iii1"
   ]
  ]
 },
 {
  "id": "g-ltp",
  "termino": "LTP y LTD",
  "sencillo": "Refuerzo (LTP) y debilitamiento (LTD) duraderos de una sinapsis según cuánto se use. Son una base del aprendizaje y la memoria. Del inglés *long-term potentiation* y *long-term depression*.",
  "preciso": "Potenciación y depresión a largo plazo: cambios duraderos de la eficacia sináptica que dependen de la actividad.",
  "ejemplo": "Como un sendero en el césped: el que más se usa, más marcado está.",
  "mas": "Lección I.1 · La sinapsis",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.1 · La sinapsis",
    "#m2t4-lec-i1"
   ]
  ]
 },
 {
  "id": "g-marcas",
  "termino": "Medido, estimado, declarado, proyectado y extrapolado añadida en esta edición",
  "sencillo": "Las cinco marcas de confianza del recorrido: dicen de dónde sale cada cifra y cuánto conviene fiarse de ella.",
  "preciso": "Medido: resultado revisado por pares o de una clasificación oficial. Estimado: modelo o juicio experto con supuestos. Declarado: afirmación de quien construyó el sistema, sin evaluación independiente publicada. Proyectado: hoja de ruta, objetivo o escenario de terceros. Extrapolado: cálculo propio a partir de las fuentes.",
  "mas": "Lección F11 · Clases de cifras · Fuentes y método",
  "tema": "met",
  "nueva": true,
  "enlaces": [
   [
    "Lección F11 · Clases de cifras",
    "#m2t2-lec-f11"
   ],
   [
    "Fuentes y método",
    "#m2fuentes"
   ]
  ]
 },
 {
  "id": "g-memlog",
  "termino": "Memoria lógica",
  "sencillo": "Guardar información cuántica en cúbits lógicos durante mucho tiempo, corrigiendo errores sin parar. Si los cúbits son lo bastante buenos, cuanto mayor es el código, menos errores quedan.",
  "preciso": "Conservación de un estado codificado en cúbits lógicos durante muchos ciclos de corrección; por debajo del umbral, su error disminuye al aumentar el tamaño del código.",
  "ejemplo": "Willow, de Google: Λ = 2,14 (medido).",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-latencia",
  "termino": "Muro de latencia",
  "sencillo": "Un límite al tamaño de un entrenamiento de IA: si se reparten entre demasiados chips, el tiempo que tardan en comunicarse frena el cálculo.",
  "preciso": "Límite que la latencia de comunicación entre aceleradores impone al tamaño de una corrida de entrenamiento con las topologías de red actuales.",
  "ejemplo": "Sevilla et al. (2024) lo sitúan entre 3 × 10³⁰ y 10³² FLOP.",
  "mas": "Lección III.2 · Entrenar una IA",
  "tema": "ia",
  "enlaces": [
   [
    "Lección III.2 · Entrenar una IA",
    "#m2t8-lec-iii2"
   ]
  ]
 },
 {
  "id": "g-nanohoja",
  "termino": "Nanohoja",
  "sencillo": "Una lámina de silicio finísima, de pocos nanómetros, por la que circula la corriente en los transistores más modernos, rodeada por la puerta.",
  "preciso": "Lámina de silicio de pocos nanómetros de grosor que forma el canal de los transistores de puerta envolvente.",
  "ejemplo": "N2, de TSMC, es su primer nodo de nanohojas (producción en volumen desde finales de 2025).",
  "mas": "Lección II.1 · El transistor",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.1 · El transistor",
    "#m2t6-lec-ii1"
   ]
  ]
 },
 {
  "id": "g-neurona",
  "termino": "Neurona añadida en esta edición",
  "sencillo": "La célula del sistema nervioso que recibe señales, las combina y, si superan un umbral, envía un impulso eléctrico breve a otras neuronas.",
  "preciso": "Célula excitable con dendritas (entrada), soma (integración) y axón (salida), que se comunica mediante potenciales de acción y sinapsis.",
  "ejemplo": "Unas 86.000 millones en el encéfalo humano (estimado).",
  "mas": "Lección I.0 · Neuronas y sinapsis · Lección I.2 · La neurona",
  "tema": "bio",
  "nueva": true,
  "enlaces": [
   [
    "Lección I.0 · Neuronas y sinapsis",
    "#m2t4-lec-i0"
   ],
   [
    "Lección I.2 · La neurona",
    "#m2t4-lec-i2"
   ]
  ]
 },
 {
  "id": "g-nisq",
  "termino": "NISQ",
  "sencillo": "Nombre de los procesadores cuánticos sin corrección de errores: de unos 50 a pocos cientos de cúbits, útiles para investigar pero limitados por el ruido. NISQ viene del inglés *noisy intermediate-scale quantum*.",
  "preciso": "Siglas inglesas de «cuántico ruidoso de escala intermedia»: procesadores de unos 50 a pocos cientos de cúbits sin corrección de errores (Preskill, 2018).",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-nivel",
  "termino": "Nivel de medición (TOP500)",
  "sencillo": "Lo exigente que es la medición de la potencia durante la prueba HPL: el nivel 1 mide solo una parte de la máquina durante parte del tiempo; el nivel 3, toda la máquina durante toda la prueba.",
  "preciso": "Exigencia con que se mide la potencia durante el HPL: el nivel 1 admite medir una fracción del sistema durante parte de la ejecución; el nivel 3 exige medir el sistema completo durante toda la ejecución.",
  "ejemplo": "LineShine y JUPITER Booster se midieron con el nivel 1; El Capitan, Frontier y Aurora, con el 2.",
  "mas": "Lección II.4 · La supercomputadora",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · La supercomputadora",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-notacion",
  "termino": "Notación científica y potencias de diez añadida en esta edición",
  "sencillo": "Una forma corta de escribir números enormes o diminutos: un número entre 1 y 10 multiplicado por 10 elevado a algo.",
  "preciso": "m × 10e, con 1 ≤ m < 10 y e entero; 10e es un 1 seguido de e ceros (o, si e es negativo, la fracción 1/10⁻e).",
  "ejemplo": "2.198.000.000.000.000.000 = 2,198 × 10¹⁸.",
  "mas": "Lección F2 · Potencias de diez · Lección F3 · Notación científica",
  "tema": "num",
  "nueva": true,
  "enlaces": [
   [
    "Lección F2 · Potencias de diez",
    "#m2t1-lec-f2"
   ],
   [
    "Lección F3 · Notación científica",
    "#m2t1-lec-f3"
   ]
  ]
 },
 {
  "id": "g-cribado",
  "termino": "Número de cribado",
  "sencillo": "Cuántas veces es mayor la información que entra por los sentidos que la que sale como decisiones: unos cien millones de veces.",
  "preciso": "Cociente entre el caudal de información sensorial y el conductual, del orden de 10⁸.",
  "ejemplo": "~10⁹ bits/s de entrada frente a ~10 bits/s de salida.",
  "mas": "Lección I.9 · 10 bits por segundo",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.9 · 10 bits por segundo",
    "#m2t5-lec-i9"
   ]
  ]
 },
 {
  "id": "g-orden",
  "termino": "Orden de magnitud",
  "sencillo": "Un factor diez. «Dos órdenes de magnitud» significa cien veces; «tres», mil veces.",
  "preciso": "Un factor diez. Entre 10¹⁴ y 10¹⁷ hay tres órdenes de magnitud, es decir, un factor mil.",
  "ejemplo": "De 10¹⁴ a 10¹⁷ hay tres órdenes de magnitud.",
  "mas": "Lección F5 · Orden de magnitud",
  "tema": "num",
  "enlaces": [
   [
    "Lección F5 · Orden de magnitud",
    "#m2t1-lec-f5"
   ]
  ]
 },
 {
  "id": "g-pet",
  "termino": "PET (tomografía por emisión de positrones) añadida en esta edición",
  "sencillo": "Una técnica de imagen médica que permite medir cuánta glucosa, el combustible del cerebro, consume cada región.",
  "preciso": "Del inglés *positron emission tomography*: detecta la radiación de un marcador administrado al paciente para medir procesos como el consumo de glucosa.",
  "ejemplo": "Mide unos 17 W de consumo de glucosa en el encéfalo (Levy y Calvert, 2021).",
  "mas": "Lección I.4 · El encéfalo",
  "tema": "bio",
  "nueva": true,
  "enlaces": [
   [
    "Lección I.4 · El encéfalo",
    "#m2t4-lec-i4"
   ]
  ]
 },
 {
  "id": "g-pico",
  "termino": "Pico teórico y rendimiento medido (Rpeak y Rmax) añadida en esta edición",
  "sencillo": "El pico es lo máximo que podría hacer una máquina si todo trabajara sin pausa; el rendimiento medido es lo que hace de verdad en una prueba concreta.",
  "preciso": "Rpeak: rendimiento teórico calculado a partir del diseño; Rmax: rendimiento sostenido medido en el HPL. Su cociente es la fracción del pico que se aprovecha.",
  "ejemplo": "LineShine: Rpeak 2,736 EF y Rmax 2,198 EF, el 80 %.",
  "mas": "Lección II.4 · Bancos de prueba · Trampa 4",
  "tema": "sil",
  "nueva": true,
  "enlaces": [
   [
    "Lección II.4 · Bancos de prueba",
    "#m2t7-lec-ii4"
   ],
   [
    "Trampa 4",
    "#m2t10-trampa-4"
   ]
  ]
 },
 {
  "id": "g-potit",
  "termino": "Potencia IT",
  "sencillo": "La potencia eléctrica que llega a las computadoras, el almacenamiento y la red de un centro de datos, sin contar la refrigeración ni otras cargas. IT viene del inglés *information technology*, tecnologías de la información.",
  "preciso": "Potencia eléctrica destinada a los equipos de cómputo, almacenamiento y red de un centro de datos, sin la refrigeración ni otras cargas de la instalación.",
  "ejemplo": "Colossus 2: ~946 MW de potencia IT (estimado).",
  "mas": "Lección II.5 · Centros de datos",
  "tema": "nrg",
  "enlaces": [
   [
    "Lección II.5 · Centros de datos",
    "#m2t7-lec-ii5"
   ]
  ]
 },
 {
  "id": "g-mixta",
  "termino": "Precisión mixta",
  "sencillo": "Usar en un mismo cálculo números de distintos tamaños: grandes donde hace falta exactitud y pequeños donde basta.",
  "preciso": "Uso combinado de formatos numéricos de distinta longitud dentro de un mismo cálculo.",
  "mas": "Lección II.4 · Bancos de prueba",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · Bancos de prueba",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-hadamard",
  "termino": "Puerta de Hadamard (H)",
  "sencillo": "Una operación sobre un cúbit que lo deja «a medio camino» entre 0 y 1 (mitad y mitad al medir) y que, aplicada otra vez, lo devuelve donde estaba.",
  "preciso": "Operación de un cúbit que lleva |0⟩ a una superposición equilibrada de |0⟩ y |1⟩, y la deshace si se aplica de nuevo.",
  "ejemplo": "H aplicada dos veces a |0⟩ devuelve |0⟩ con certeza.",
  "mas": "Lección III.5 · Interferencia",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.5 · Interferencia",
    "#m2t9-lec-iii5"
   ]
  ]
 },
 {
  "id": "g-puerta",
  "termino": "Puerta lógica cuántica",
  "sencillo": "Una operación sobre cúbits lógicos hecha sin perder la protección contra errores. Es el siguiente reto tras conseguir conservar la información.",
  "preciso": "Operación ejecutada sobre cúbits lógicos sin abandonar la protección del código de corrección de errores.",
  "mas": "Lección III.6 · Ruido y corrección",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.6 · Ruido y corrección",
    "#m2t9-lec-iii6"
   ]
  ]
 },
 {
  "id": "g-sinapsis",
  "termino": "Sinapsis",
  "sencillo": "El punto de contacto entre dos neuronas, donde la señal pasa de una a otra. Allí la señal se transforma y la memoria se guarda.",
  "preciso": "Unión funcional entre dos neuronas, en la que la señal se almacena y se transforma.",
  "ejemplo": "Entre 10¹⁴ y 10¹⁵ en el encéfalo (estimado).",
  "mas": "Lección I.0 · Neuronas y sinapsis · Lección I.1 · La sinapsis",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.0 · Neuronas y sinapsis",
    "#m2t4-lec-i0"
   ],
   [
    "Lección I.1 · La sinapsis",
    "#m2t4-lec-i1"
   ]
  ]
 },
 {
  "id": "g-neuromorfico",
  "termino": "Sistema neuromórfico",
  "sencillo": "Hardware que copia la organización del cerebro: neuronas artificiales que se comunican con impulsos, memoria junto a cada núcleo y gasto solo cuando ocurre algo.",
  "preciso": "Hardware con neuronas y sinapsis artificiales que se comunican por impulsos, con la memoria junto a cada núcleo y un procesamiento dirigido por eventos.",
  "ejemplo": "Hala Point, de Intel: 1.150 millones de neuronas de silicio (declarado).",
  "mas": "Lección II.3 · Chips neuromórficos · Lección III.3",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.3 · Chips neuromórficos",
    "#m2t9-lec-ii3"
   ],
   [
    "Lección III.3",
    "#m2t9-lec-iii3"
   ]
  ]
 },
 {
  "id": "g-superposicion",
  "termino": "Superposición",
  "sencillo": "El estado de un cúbit «entre» 0 y 1, descrito por dos amplitudes. No significa que valga 0 y 1 a la vez: al medirlo da uno solo de los dos resultados.",
  "preciso": "Estado de un cúbit que combina |0⟩ y |1⟩ con ciertas amplitudes; al medirlo se obtiene uno solo de los dos resultados.",
  "mas": "Lección III.4 · Del bit al cúbit · Trampa 11",
  "tema": "q",
  "enlaces": [
   [
    "Lección III.4 · Del bit al cúbit",
    "#m2t9-lec-iii4"
   ],
   [
    "Trampa 11",
    "#m2t10-trampa-11"
   ]
  ]
 },
 {
  "id": "g-tasa",
  "termino": "Tasa de disparo",
  "sencillo": "Cuántos impulsos eléctricos emite una neurona por segundo, medido en hercios (Hz).",
  "preciso": "Número de potenciales de acción que emite una neurona por segundo, expresado en hercios.",
  "ejemplo": "Media cortical sostenible: ~0,16 Hz; los modelos usan de 0,1 a 1 Hz.",
  "mas": "Lección I.2 · La neurona",
  "tema": "bio",
  "enlaces": [
   [
    "Lección I.2 · La neurona",
    "#m2t4-lec-i2"
   ]
  ]
 },
 {
  "id": "g-twh",
  "termino": "Teravatio-hora (TWh)",
  "sencillo": "Una unidad de energía: lo que consume una potencia de un billón de vatios (10¹² W) durante una hora, o lo equivalente. Se usa para consumos anuales de países o sectores.",
  "preciso": "Energía de 10¹² vatios durante una hora. 485 TWh al año equivalen a unos 55 GW de potencia media.",
  "ejemplo": "Centros de datos del mundo en 2025: unos 485 TWh (estimado).",
  "mas": "Lección II.5 · De vatios a teravatios-hora",
  "tema": "nrg",
  "enlaces": [
   [
    "Lección II.5 · De vatios a teravatios-hora",
    "#m2t7-lec-ii5"
   ]
  ]
 },
 {
  "id": "g-token",
  "termino": "Token añadida en esta edición",
  "sencillo": "Un trocito de texto —una palabra o parte de una— con el que trabajan los modelos de lenguaje. Los datos de entrenamiento se cuentan en tokens.",
  "preciso": "Unidad en que un modelo de lenguaje divide el texto de entrada y de salida.",
  "ejemplo": "El conjunto declarado de Qwen3: unos 3,6 × 10¹³ tokens.",
  "mas": "Lección III.2 · Entrenar una IA",
  "tema": "ia",
  "nueva": true,
  "enlaces": [
   [
    "Lección III.2 · Entrenar una IA",
    "#m2t8-lec-iii2"
   ]
  ]
 },
 {
  "id": "g-top500",
  "termino": "TOP500",
  "sencillo": "La lista, publicada dos veces al año, de las 500 supercomputadoras más rápidas del mundo según la prueba HPL.",
  "preciso": "Clasificación semestral de las supercomputadoras más rápidas según su rendimiento en el HPL.",
  "ejemplo": "N.º 1 en junio de 2026: LineShine.",
  "mas": "Lección II.4 · La supercomputadora",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.4 · La supercomputadora",
    "#m2t7-lec-ii4"
   ]
  ]
 },
 {
  "id": "g-tops",
  "termino": "TOPS/W",
  "sencillo": "Billones de operaciones por segundo por cada vatio: una medida de eficiencia, usada sobre todo con números enteros de 8 bits. TOPS viene del inglés *tera-operations per second*.",
  "preciso": "Billones (10¹²) de operaciones por segundo por vatio; medida de eficiencia habitual para operaciones enteras de 8 bits.",
  "ejemplo": "Hala Point: más de 15 TOPS/W según Intel (declarado), en una red sintética dispersa.",
  "mas": "Lección II.3 · Chips neuromórficos",
  "tema": "sil",
  "enlaces": [
   [
    "Lección II.3 · Chips neuromórficos",
    "#m2t9-lec-ii3"
   ]
  ]
 },
 {
  "id": "g-transistor",
  "termino": "Transistor añadida en esta edición",
  "sencillo": "Un interruptor microscópico sin piezas móviles: una tensión eléctrica en su puerta deja pasar o corta la corriente. Un chip tiene miles de millones.",
  "preciso": "Dispositivo semiconductor que controla la corriente entre fuente y drenador mediante la tensión de la puerta; los más recientes rodean el canal (nanohojas).",
  "ejemplo": "NorthPole, de IBM: 22.000 millones de transistores.",
  "mas": "Lección II.0 · Interruptores · Lección II.1 · El transistor",
  "tema": "sil",
  "nueva": true,
  "enlaces": [
   [
    "Lección II.0 · Interruptores",
    "#m2t6-lec-ii0"
   ],
   [
    "Lección II.1 · El transistor",
    "#m2t6-lec-ii1"
   ]
  ]
 },
 {
  "id": "g-vatio",
  "termino": "Vatio (W), julio (J) y vatio-hora (Wh) añadida en esta edición",
  "sencillo": "El julio mide energía, una cantidad; el vatio mide potencia, un ritmo: julios por segundo. El vatio-hora es la energía de 1 W durante una hora.",
  "preciso": "1 W = 1 J/s; 1 Wh = 3.600 J; 1 kWh = 3,6 × 10⁶ J; 1 TWh = 10¹² Wh.",
  "ejemplo": "El cerebro gasta ~20 W: 20 julios cada segundo, unos 1,7 × 10⁶ J al día.",
  "mas": "Lección D3 · Energía · Lección F8 · Total y ritmo",
  "tema": "num",
  "nueva": true,
  "enlaces": [
   [
    "Lección D3 · Energía",
    "#m2t3-lec-d3"
   ],
   [
    "Lección F8 · Total y ritmo",
    "#m2t2-lec-f8"
   ]
  ]
 }
];
})();
