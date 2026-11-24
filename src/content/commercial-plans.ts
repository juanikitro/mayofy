export const commercialIntro = {
  title: "Tres packs. De una página simple a tu propio sistema.",
  body: "Precios de referencia para que sepas por dónde arrancar. El alcance, el plazo y el precio final se definen después de una charla gratis.",
  /** Under every pack price, so the currency and the monthly fee do not surprise (user test, L2). */
  priceNote: "Se puede pagar en pesos. El mantenimiento mensual es opcional.",
  /**
   * With the day's blue rate the peso amount itself answers "can I pay in
   * pesos?", so only the monthly-fee half of the note stays
   * (docs/plans/2026-11-23-comercial.md).
   */
  pesoRateLabel: "al dólar blue de hoy",
  priceNoteWithPesos: "El mantenimiento mensual es opcional.",
  /** How to pay, under the guarantees strip (Juani, 2026-11-23). */
  payment: {
    title: "Cómo se paga",
    items: [
      "Landing y Gestión: 50% al empezar y 50% en la entrega. Sistema a Medida: 30% al empezar y el resto por etapas, a medida que lo usás.",
      "Por transferencia, Mercado Pago (también en cuotas con tarjeta, con su recargo), efectivo o USDT.",
      "Los precios están en USD. Si pagás en pesos, se toma el dólar blue del día del pago.",
      "¿Estás fuera de Argentina? Pagás en dólares, por transferencia o USDT. También por Wise, si lo coordinamos antes.",
    ],
  },
} as const;

export const commercialPlans = [
  {
    id: "landing",
    name: "Landing",
    eyebrow: undefined,
    price: "USD 85",
    timeline: "1 a 2 semanas",
    description:
      "Una página propia para que quienes te encuentran entiendan qué ofrecés y te escriban por WhatsApp.",
    idealFor:
      "Negocios de servicios que reciben atención por Instagram, Google Maps o recomendaciones y necesitan un lugar propio para convertirla en consultas.",
    detailGroups: [
      {
        title: "Incluye",
        items: [
          "Unas preguntas cortas para entender tu negocio y a quién le querés vender.",
          "Una página que cuenta lo importante sin marear a nadie.",
          "Un diseño prolijo, pensado para tu rubro.",
          "Los textos ya escritos, ajustados a tu forma de hablar.",
          "Un botón para que te escriban por WhatsApp con el mensaje ya armado.",
          "Tu Instagram, tu ubicación en el mapa y tus otras redes, a un toque.",
          "La página publicada en tu propia dirección web, del estilo tunegocio.com.",
          "Una vuelta de cambios antes de publicarla.",
        ],
      },
      {
        title: "No incluye",
        items: [
          "Turnos, reservas o un sistema para gestionar tu negocio (eso es el pack Gestión).",
          "La creación completa de tu marca o logo.",
          "Secciones o páginas adicionales a las acordadas.",
        ],
      },
    ],
    footnote:
      "¿Necesitás varias páginas? La web institucional arranca desde USD 95 y se entrega en 3 a 4 semanas.",
    note: "La dirección web, el alojamiento y otros servicios se pagan aparte.",
    cta: "Quiero mi página",
    whatsappMessage: "Hola, quiero consultar por el pack Landing de Mayofy.",
  },
  {
    id: "gestion",
    name: "Gestión",
    eyebrow: "Recomendación de la casa",
    price: "USD 150",
    timeline: "3 a 6 semanas",
    description:
      "Un sistema para ordenar tu negocio: los turnos, el stock, los pedidos o tu tienda online. Lo manejás desde un panel propio.",
    idealFor:
      "Consultorios, peluquerías, centros de estética, gimnasios, academias y comercios que pierden horas coordinando por WhatsApp o anotando en un cuaderno.",
    detailGroups: [
      {
        title: "Incluye en el precio base",
        items: [
          "Un sistema para ordenar lo que más tiempo te lleva: turnos, stock, pedidos o ventas online.",
          "Tu propio panel para ver y manejar todo desde el celular o la compu.",
          "Un enlace para que tus clientes reserven, compren o pidan solos, sin esperar a que les contestes.",
          "Correos automáticos para vos y tus clientes, como el recordatorio del turno.",
          "Un botón para avisar por WhatsApp con el mensaje ya escrito.",
          "Acceso para una persona: vos o quien maneje el negocio.",
          "Cargamos tus datos para que arranques: servicios, horarios, productos o clientes.",
          "Una capacitación para que lo manejes sin ayuda desde el primer día.",
        ],
      },
      {
        title: "Se cotiza aparte",
        items: [
          "Varias sedes o un acceso distinto para cada empleado.",
          "Cobro de señas o pagos online.",
          "Avisos por WhatsApp 100% automáticos (Meta cobra cada mensaje aparte).",
        ],
      },
    ],
    footnote: "¿También querés una página para mostrar tu negocio? Sumá el pack Landing.",
    note: "El precio final depende de lo que necesite tu negocio. Si es algo grande, sube y se acerca al de un Sistema a Medida. Queda escrito en la propuesta, antes de empezar.",
    cta: "Quiero ordenar mi negocio",
    whatsappMessage: "Hola, quiero consultar por el pack Gestión de Mayofy.",
  },
  {
    id: "sistema",
    name: "Sistema a Medida",
    eyebrow: undefined,
    price: "USD 450",
    timeline: "1 a 6 meses",
    description:
      "Un sistema hecho a cómo trabaja tu negocio, que junta en un solo lugar lo que hoy está repartido: turnos, stock, cobros, equipos y los números del mes.",
    idealFor:
      "Negocios que necesitan integrar múltiples soluciones: turnos, stock, cobros y equipos con distintos roles, todo en un solo sistema.",
    detailGroups: [
      {
        title: "Incluye",
        items: [
          "Vemos cómo trabajás hoy y qué se sigue haciendo a mano.",
          "Un sistema diseñado para tu forma de trabajar.",
          "Un historial de cambios: quién hizo qué y cuándo.",
          "Los números que necesitás para decidir, a la vista.",
          "Se conecta con lo que ya usás: facturación, planillas o cobros.",
          "Entregas por etapas: empezás a usarlo antes de que esté terminado.",
          "Capacitación y guías de uso para tu equipo.",
          "Si ya tenés Gestión, crecemos desde ahí, sin empezar de cero.",
        ],
      },
    ],
    footnote: undefined,
    note: "El alcance y el precio final se definen después de la primera charla.",
    cta: "Quiero un sistema a medida",
    whatsappMessage: "Hola, quiero consultar por un Sistema a Medida de Mayofy.",
  },
] as const;

export const comingSoon = {
  label: "Próximamente",
  title: "Bot de WhatsApp y Telegram",
  description:
    "Un asistente que responde las consultas frecuentes, toma los datos de cada cliente y te deriva la conversación cuando hace falta una persona.",
  tiers: [
    {
      name: "Bot Esencial",
      price: "USD 120",
      timeline: "2 a 3 semanas",
      includes:
        "Un canal (WhatsApp o Telegram), respuestas a preguntas frecuentes, toma de datos del cliente y derivación a una persona.",
    },
    {
      name: "Bot Integrado",
      price: "USD 250",
      timeline: "4 a 6 semanas",
      includes:
        "Todo lo anterior, los dos canales y conexión con Gestión o un Sistema a Medida: reservar turnos, consultar estados o datos.",
    },
  ],
  monthly: "USD 30 por mes: alojamiento, control y ajustes menores.",
  note: "Las tarifas de WhatsApp Business (Meta cobra por conversación) y el uso de IA, si se usa, se trasladan aparte.",
  cta: "Quiero que me avisen",
  whatsappMessage:
    "Hola, quiero que me avisen cuando esté disponible el bot de WhatsApp y Telegram de Mayofy.",
} as const;

export const guarantees = {
  title: "Lo que garantizamos en todos los packs",
  /** Short seals for the strip under the pack cards; the speed guarantee first. */
  stripTitle: "En todos los packs",
  seals: [
    { icon: "speed", label: "Carga rápida en el celular o la corregimos gratis" },
    { icon: "ownership", label: "Todo queda a tu nombre" },
    { icon: "reply", label: "Respuesta en menos de 24 h hábiles" },
    { icon: "seo", label: "Lista para aparecer en Google" },
    { icon: "screens", label: "Accesible en cualquier pantalla" },
    { icon: "support", label: "Una semana de soporte" },
    { icon: "revisions", label: "Vueltas de cambios pactadas" },
  ],
  items: [
    "La web y su dirección son tuyas.",
    "Te respondemos en menos de 24 horas hábiles.",
    "Carga rápida en el celular, medida con la prueba de Google. Si no pasa, la corregimos gratis.",
    "Lista para aparecer en Google desde el primer día.",
    "Accesible y cómoda de usar en cualquier pantalla.",
    "Una semana de soporte después de publicar.",
    "Las vueltas de cambios se pactan antes de empezar.",
  ],
} as const;

export const maintenancePlan = {
  prices: [
    { label: "Landing", price: "USD 25 por mes", asterisk: false },
    { label: "Gestión y Sistema a Medida", price: "USD 50 por mes", asterisk: true },
  ],
  description:
    "Mantenemos tu web o tu sistema actualizado, funcionando y acompañando los cambios de tu negocio.",
  footnotes: [
    "Cada mes incluye hasta 5 cambios menores o 90 minutos de trabajo, lo que ocurra primero. Los cambios no usados no se acumulan para el mes siguiente.",
    "En Gestión y Sistema a Medida incluye copias de seguridad de tus datos, con los mismos límites mensuales.",
  ],
  cta: "Quiero mantenimiento mensual",
  whatsappMessage: "Hola, quiero consultar por el mantenimiento mensual de Mayofy.",
  detailGroups: [
    {
      title: "Incluye",
      items: [
        "Revisión de formularios, enlaces, botones y reservas.",
        "Control básico del funcionamiento.",
        "Actualizaciones técnicas necesarias.",
        "Resumen simple de visitas y consultas.",
        "Publicación de los cambios.",
      ],
    },
    {
      title: "Cambios menores",
      items: [
        "Modificar un texto o reemplazar una imagen.",
        "Actualizar horarios, servicios o precios.",
        "Cambiar un enlace o mensaje de WhatsApp.",
        "Agregar un testimonio.",
      ],
    },
    {
      title: "Se cotiza por separado",
      items: [
        "Crear una sección, página o función nueva.",
        "Rediseñar una parte completa.",
        "Integrar una plataforma externa.",
        "Crear o administrar campañas publicitarias.",
      ],
    },
  ],
} as const;

export const extensions = {
  title: "Automatizaciones sueltas",
  body: "No hace falta contratar un sistema completo para dejar de hacer una tarea a mano. Sumamos solo lo que necesitás, sobre lo que ya tenés.",
  categories: [
    {
      title: "Conseguí más consultas",
      items: [
        "Páginas para una promoción puntual.",
        "Páginas adicionales por servicio o zona.",
        "Medir tus anuncios en redes y Google.",
        "Aparecer en Google Maps de tu zona.",
        "Versiones en otros idiomas.",
      ],
    },
    {
      title: "Simplificá el contacto",
      items: [
        "Formularios avanzados.",
        "Presupuestos al instante.",
        "Pago de señas.",
        "Catálogos de productos o servicios.",
      ],
    },
    {
      title: "Automatizá el seguimiento",
      items: [
        "Consultas guardadas en una planilla.",
        "Lista de clientes ordenada.",
        "Avisos por correo.",
        "Respuestas automáticas.",
        "Clasificación y seguimiento de consultas.",
      ],
    },
  ],
  note: "Estas automatizaciones se cotizan según cada caso.",
  cta: "Consultar por una automatización",
  whatsappMessage: "Hola, quiero consultar por una automatización con Mayofy.",
} as const;
