export const commercialIntro = {
  title: "Tres packs. Desde una landing hasta tu propio sistema.",
  body: "Precios de referencia para que sepas por dónde arrancar. El alcance, el plazo y la inversión final se definen después de una reunión de diagnóstico gratis.",
  payment:
    "Pago: 50% al inicio y 50% en la entrega. Precios en USD; podés pagar en pesos al cambio del día.",
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
          "Un cuestionario breve para conocer tu negocio, tu servicio y a quién querés atraer.",
          "Una página con hasta 5 secciones para contar lo importante sin marear a nadie.",
          "Un diseño cuidado y adaptado a tu rubro.",
          "Textos base para presentar tu negocio, ajustables a tu estilo.",
          "Botones para que te escriban por WhatsApp con el mensaje listo.",
          "Enlaces a Instagram, ubicación y las redes que uses.",
          "Una buena presentación cuando compartís el enlace por WhatsApp o redes.",
          "Tu dominio conectado y la página publicada.",
          "Una instancia de ajustes antes de publicar.",
        ],
      },
      {
        title: "No incluye",
        items: [
          "Formularios especiales, turnos o reservas.",
          "La creación completa de tu marca o logo.",
          "Secciones o páginas adicionales a las acordadas.",
        ],
      },
    ],
    footnote:
      "¿Necesitás varias páginas? La web institucional arranca desde USD 95 y se entrega en 3 a 4 semanas.",
    note: "El dominio, el hosting y los servicios externos se abonan por separado.",
    cta: "Quiero mi landing",
    whatsappMessage: "Hola, quiero consultar por el pack Landing de Mayofy.",
  },
  {
    id: "web-gestion",
    name: "Web + Gestión",
    eyebrow: "Web y sistema en uno",
    price: "USD 150",
    timeline: "3 a 9 semanas",
    description:
      "Tu web más un sistema simple para que tus clientes saquen turno o reserven solos y vos gestiones todo desde un panel propio.",
    idealFor:
      "Consultorios, gimnasios, estudios, academias y centros de estética que necesitan más que una vidriera.",
    detailGroups: [
      {
        title: "Incluye en el precio base",
        items: [
          "Todo lo del pack Landing.",
          "Turnos o reservas online para una agenda.",
          "Un panel para ver y gestionar reservas y clientes.",
          "Acceso para una persona administradora.",
          "Aviso por correo de cada reserva nueva.",
          "Carga inicial de tus servicios y horarios.",
        ],
      },
      {
        title: "Se cotiza aparte",
        items: [
          "Varias sedes, profesionales o agendas.",
          "Pagos online o cobro de señas.",
          "Recordatorios automáticos por WhatsApp.",
          "Usuarios con distintos roles y permisos.",
        ],
      },
    ],
    footnote: undefined,
    note: "El precio base cubre una agenda y un panel simple. Si tu operación necesita más, lo definimos en la propuesta antes de empezar.",
    cta: "Quiero web con turnos",
    whatsappMessage: "Hola, quiero consultar por el pack Web + Gestión de Mayofy.",
  },
  {
    id: "sistema",
    name: "Sistema a Medida",
    eyebrow: undefined,
    price: "USD 450",
    timeline: "1 a 6 meses",
    description:
      "Software pensado para tu operación cuando las planillas y las herramientas genéricas ya no alcanzan.",
    idealFor:
      "Negocios con procesos propios: gestión interna, stock, clientes, cobranzas o equipos con distintos roles.",
    detailGroups: [
      {
        title: "Incluye",
        items: [
          "Relevamiento de tus procesos y de lo que hoy se hace a mano.",
          "Diseño del sistema y de sus datos pensado para tu caso.",
          "Usuarios con roles y permisos.",
          "Paneles con la información que necesitás para decidir.",
          "Integración con lo que ya usás: facturación, planillas o pagos.",
          "Entregas por etapas para que lo uses antes de terminarlo todo.",
          "Documentación y capacitación para tu equipo.",
        ],
      },
    ],
    footnote: undefined,
    note: "El alcance y la inversión final se definen después de la reunión de diagnóstico.",
    cta: "Quiero un sistema a medida",
    whatsappMessage: "Hola, quiero consultar por un Sistema a Medida de Mayofy.",
  },
] as const;

export const comingSoon = {
  label: "Próximamente",
  title: "Bot de WhatsApp y Telegram",
  description:
    "Un asistente que responde las consultas frecuentes, toma los datos de cada cliente y te deriva la conversación cuando hace falta una persona.",
  cta: "Quiero que me avisen",
  whatsappMessage:
    "Hola, quiero que me avisen cuando esté disponible el bot de WhatsApp y Telegram de Mayofy.",
} as const;

export const guarantees = {
  title: "Lo que garantizamos en todos los packs",
  items: [
    "El código y el dominio son tuyos.",
    "Te respondemos en menos de 24 horas hábiles.",
    "Carga rápida en el celular, medida con Core Web Vitals. Si no pasa, la corregimos sin costo.",
    "SEO técnico desde el primer día.",
    "Accesible y cómoda de usar en cualquier pantalla.",
    "Una semana de soporte después de publicar.",
    "Rondas de revisión acordadas antes de empezar.",
  ],
} as const;

export const maintenancePlan = {
  prices: [
    { label: "Landing", price: "USD 50 por mes", asterisk: false },
    { label: "Web + Gestión y Sistema a Medida", price: "USD 25 por mes", asterisk: true },
  ],
  description:
    "Mantenemos tu web o tu sistema actualizado, funcionando y acompañando los cambios de tu negocio.",
  footnotes: [
    "Cada mes incluye hasta 5 cambios menores o 90 minutos de trabajo, lo que ocurra primero. Los cambios no usados no se acumulan para el mes siguiente.",
    "Precio promocional para clientes de Web + Gestión y Sistema a Medida, con los mismos límites mensuales.",
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
        "Landings para campañas específicas.",
        "Páginas adicionales por servicio o zona.",
        "Meta Pixel y Google Ads.",
        "Google Business Profile y SEO local.",
        "Versiones en otros idiomas.",
      ],
    },
    {
      title: "Simplificá el contacto",
      items: [
        "Formularios avanzados.",
        "Cotizadores interactivos.",
        "Pago de señas.",
        "Catálogos de productos o servicios.",
      ],
    },
    {
      title: "Automatizá el seguimiento",
      items: [
        "Envío de contactos a Google Sheets.",
        "Integración con CRM.",
        "Notificaciones por correo.",
        "Respuestas automáticas.",
        "Clasificación y seguimiento de consultas.",
      ],
    },
  ],
  note: "Estas automatizaciones se cotizan según cada caso.",
  cta: "Consultar por una automatización",
  whatsappMessage: "Hola, quiero consultar por una automatización con Mayofy.",
} as const;
