export const commercialPlans = [
  {
    id: "esencial",
    name: "Landing Esencial",
    eyebrow: undefined,
    price: "USD 119",
    payment: "Pago único",
    maintenance: "Mantenimiento opcional: USD 50 por mes.",
    description:
      "Una página profesional para que quienes te encuentran entiendan qué ofrecés y te escriban con facilidad.",
    idealFor:
      "Negocios locales que quieren verse profesionales online, mostrar un servicio concreto o llevar personas desde Instagram, Google Maps o WhatsApp a una página propia.",
    detailGroups: [
      {
        title: "Incluye",
        items: [
          "Un cuestionario breve para conocer tu negocio, tu servicio y a quién querés atraer.",
          "Una página con hasta 5 secciones para contar lo importante sin marear a nadie.",
          "Un diseño cuidado, inspirado en referencias y adaptado a tu rubro.",
          "Textos base para presentar tu negocio y que puedas ajustar a tu estilo.",
          "Botones para que te escriban por WhatsApp con el mensaje listo.",
          "Enlaces a Instagram, ubicación y las redes que uses.",
          "Tus fotos, menú, catálogo o contenido integrado en la página.",
          "Una buena presentación cuando compartís el enlace por WhatsApp o redes.",
          "Tu dominio conectado y la página publicada.",
          "Una instancia para reunir tus ajustes antes de publicar.",
          "Corrección de errores que aparezcan después del lanzamiento.",
        ],
      },
      {
        title: "No incluye",
        items: [
          "Un estudio profundo de tu mercado o de tus competidores.",
          "La creación completa de tu marca o logo.",
          "Un diseño hecho desde cero para tu negocio.",
          "Un plan para posicionarte en Google o medir cada consulta.",
          "Formularios especiales, respuestas automáticas o mantenimiento mensual.",
          "Secciones o páginas adicionales a las acordadas.",
        ],
      },
    ],
    note: "El dominio, hosting y los servicios externos se abonan por separado.",
    cta: "Quiero mi landing",
    whatsappMessage: "Hola, quiero consultar por la Landing Esencial de Mayofy.",
  },
  {
    id: "conversion",
    name: "Landing Conversión",
    eyebrow: "Más completa",
    price: "USD 399",
    payment: "Pago único",
    maintenance: "Mantenimiento opcional: USD 25 por mes.",
    description:
      "Una página pensada para mostrar por qué elegirte, hacer que más personas consulten y saber qué resultados está dando.",
    idealFor:
      "Negocios locales que quieren conseguir más consultas, destacarse en su zona o aprovechar mejor la publicidad, Instagram y Google.",
    detailGroups: [
      {
        title: "Todo lo de Landing Esencial, más",
        items: [
          "Una reunión para entender tu negocio, tu cliente ideal y qué te diferencia en tu zona.",
          "Un mensaje claro que explica qué ofrecés, por qué elegirte y cómo dar el siguiente paso.",
          "Un diseño hecho a medida para que tu negocio se vea más sólido y memorable.",
          "Hasta 8 secciones para mostrar servicios, beneficios, preguntas frecuentes, testimonios o casos reales.",
          "Fotos y piezas visuales ajustadas para que la página se vea mejor al compartirla.",
          "La forma de contacto que más te convenga: WhatsApp, formulario, llamada o reserva.",
          "Un formulario simple para ordenar las consultas y recibirlas por mail o en una planilla.",
          "Una base para que te encuentren mejor cuando buscan tu servicio y tu ubicación en Google.",
          "Estadísticas para saber cuántas personas te visitan, te escriben o completan un formulario.",
          "La página lista para acompañar campañas en Google o redes cuando decidas hacer publicidad.",
          "Dos instancias de ajustes y 30 días de acompañamiento después de publicar.",
        ],
      },
    ],
    note:
      "La optimización para Google es una base inicial y no asegura aparecer primero ni generar una cantidad específica de consultas. Las campañas de publicidad, respuestas automáticas y funciones especiales se cotizan por separado.",
    cta: "Quiero generar más consultas",
    whatsappMessage: "Hola, quiero consultar por la Landing Conversión de Mayofy.",
  },
] as const;

export const commercialBenefits = [
  "Se ve bien y es fácil de usar desde el celular, la tablet y la compu.",
  "Carga ágil y guía a cada visitante hacia la información importante.",
  "Botones de contacto que funcionan y navegación protegida.",
  "Tu propio dominio conectado.",
  "Preparada para compartirla y para que Google entienda de qué trata.",
  "Publicación profesional y una base lista para crecer con tu negocio.",
] as const;

export const maintenancePlan = {
  price: "USD 50 por mes",
  description:
    "Mantenemos tu landing actualizada, funcionando correctamente y acompañando los cambios de tu negocio. Para Landing Conversión, el mantenimiento opcional tiene un precio preferencial de USD 25 por mes.",
  note: "Los cambios no utilizados no se acumulan para el mes siguiente.",
  cta: "Quiero mantenimiento mensual",
  whatsappMessage:
    "Hola, quiero consultar por el mantenimiento mensual de mi landing.",
  detailGroups: [
    {
      title: "Incluye",
      items: [
        "Hasta 5 cambios menores o un máximo de 90 minutos de trabajo mensual.",
        "Revisión de formularios, enlaces y botones.",
        "Control básico del funcionamiento de la landing.",
        "Actualizaciones técnicas necesarias.",
        "Resumen simple de visitas y consultas para Landing Conversión.",
        "Soporte para publicar los cambios.",
      ],
    },
    {
      title: "Cambios menores",
      items: [
        "Modificar un texto o reemplazar una imagen.",
        "Actualizar horarios o precios.",
        "Cambiar un enlace o mensaje de WhatsApp.",
        "Agregar un testimonio.",
        "Agregar o quitar un servicio dentro de una sección existente.",
      ],
    },
    {
      title: "Se cotiza por separado",
      items: [
        "Crear una sección o página nueva.",
        "Rediseñar completamente una parte de la landing.",
        "Integrar una plataforma externa.",
        "Agregar reservas, pagos o automatizaciones.",
        "Reescribir toda la página.",
        "Crear o administrar campañas publicitarias.",
      ],
    },
  ],
} as const;

export const extensions = {
  categories: [
    {
      title: "Conseguí más consultas",
      items: [
        "Landings para campañas específicas.",
        "Páginas adicionales por servicio.",
        "Páginas orientadas a ciudades o zonas.",
        "Meta Pixel y Google Ads.",
        "Google Business Profile.",
        "SEO local.",
        "Versiones en otros idiomas.",
        "Sitios multipágina.",
      ],
    },
    {
      title: "Simplificá el contacto",
      items: [
        "Formularios avanzados.",
        "Sistemas de reservas.",
        "Calendarios de turnos.",
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
        "Clasificación de consultas.",
        "Seguimiento de potenciales clientes.",
        "Panel de consultas.",
      ],
    },
  ],
  note: "Estas ampliaciones se cotizan según las necesidades del proyecto.",
  cta: "Consultar por una ampliación",
  whatsappMessage: "Hola, quiero consultar por una ampliación para mi landing.",
} as const;
