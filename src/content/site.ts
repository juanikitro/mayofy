export const siteContent = {
  name: "Mayofy",
  descriptor: "Estudio de desarrollo web y software a medida",
  hero: {
    title: "Webs que venden. Sistemas que ordenan.",
    titleLines: ["Webs que venden.", "Sistemas que ordenan."],
    body: "Diseñamos landings, webs con turnos y sistemas a medida para negocios de servicios. Empezamos con una charla gratis para entender qué necesitás.",
    primaryCta: "Agendá una charla gratis",
    primaryMessage: "Hola Juani, quiero trabajar con Mayofy...",
    secondaryCta: "Ver packs",
  },
  scheduling: {
    url: "https://cal.com/juan-ignacio-portilla-kitroser-svfbs3/mayofy-first-meeting",
    calLink: "juan-ignacio-portilla-kitroser-svfbs3/mayofy-first-meeting",
  },
  channels: ["Instagram", "Google Maps", "Recomendaciones"],
  offerPath: [
    {
      step: "01",
      title: "Ordenamos lo que ya funciona.",
      body: "Partimos de una oferta real, de cómo te encuentran hoy y de las tareas que todavía hacés a mano.",
    },
    {
      step: "02",
      title: "Le damos un recorrido propio.",
      body: "Jerarquía, tono, imágenes e interfaz trabajan para que entender tu negocio sea fácil y escribirte, reservar o gestionar sea el siguiente paso natural.",
    },
    {
      step: "03",
      title: "Lo construimos para salir al mundo.",
      body: "Diseñamos, desarrollamos, publicamos y dejamos configurados el contacto y una medición básica, sin entregarte una maqueta a medio camino.",
    },
  ],
  process: [
    "Charla gratis de 30 minutos",
    "Propuesta con alcance y plazo",
    "Diseño con identidad",
    "Construcción con avances visibles",
    "Publicación y medición",
    "Soporte después del lanzamiento",
  ],
  systems: {
    title: "Cuando una planilla ya no alcanza.",
    body: "Construimos el software que tu operación necesita, con la misma exigencia de diseño que una web y sin convertir la tecnología en protagonista.",
    items: [
      "Turnos y reservas",
      "Un panel con todo",
      "Cada uno ve lo que le toca",
      "Integraciones con lo que ya usás",
      "Automatizaciones",
    ],
  },
  founder: {
    title: "Mayofy es la marca. Detrás estoy yo.",
    // Shortened on 2026-11-20 (island 6, option A of docs/plans/2026-11-20-propuestas.md).
    lead: "Soy Juani. Hace 5 años construyo software y hoy lidero técnicamente un sistema con unos 750 usuarios activos.",
    body: "Vas a hablar conmigo desde la primera charla hasta la publicación, sin capas comerciales.",
  },
  faq: [
    {
      question: "¿Cuánto tarda un proyecto?",
      answer: "Depende de lo que construyamos. Como referencia: el pack Landing, de 1 a 2 semanas; una web con turnos y panel, de 3 a 9 semanas; un sistema a medida, de 1 a 6 meses. El plazo exacto queda escrito en la propuesta.",
    },
    {
      question: "¿Cuánto cuesta?",
      answer: "Los packs arrancan desde USD 85 (Landing), USD 150 (Web + Gestión) y USD 450 (Sistema a Medida). Son precios base: después de la charla te mandamos una propuesta con el alcance y la inversión final.",
    },
    {
      question: "¿Qué pasa en la charla gratis?",
      answer: "Es una videollamada de 30 minutos, sin compromiso, para entender tu negocio, cómo te encuentran hoy y qué necesitás resolver. Con eso preparamos una propuesta con alcance, plazo e inversión.",
    },
    {
      question: "¿Cómo se paga?",
      answer: "50% al inicio y 50% en la entrega. Los precios están en USD y podés pagar en pesos al cambio del día.",
    },
    {
      question: "¿Qué tecnologías usan?",
      answer: "Next.js, React y TypeScript para webs e interfaces; Python, Django y PostgreSQL para sistemas; Docker y servicios en la nube para publicar y operar. Elegimos lo que mejor resuelve tu caso, no lo que está de moda.",
    },
    {
      question: "¿Se ocupan del dominio y el alojamiento?",
      answer: "Sí. Te ayudamos a registrar el dominio a tu nombre y dejamos todo publicado y configurado. El dominio (tu dirección, como tunegocio.com) y el alojamiento se pagan aparte, y los dos quedan a tu nombre, igual que el código.",
    },
    {
      question: "¿Ofrecen mantenimiento?",
      answer: "Sí. Cuesta USD 50 por mes para el pack Landing y USD 25 por mes para Web + Gestión y Sistema a Medida. Incluye hasta 5 cambios menores o 90 minutos de trabajo por mes.",
    },
    {
      question: "¿Puedo traer mi propio diseño?",
      answer: "Sí. Si ya tenés un diseño o una identidad definida, lo respetamos y lo llevamos a una web o a un sistema que funcione bien en el celular.",
    },
    {
      question: "¿Trabajan solo en Argentina?",
      answer: "No. Arrancamos por Argentina y trabajamos de forma remota con negocios de servicios de toda Latinoamérica.",
    },
    {
      question: "¿Con quién voy a trabajar?",
      answer: "Con Juani, de forma directa. Mayofy es un estudio unipersonal: no hay capas comerciales ni un equipo ficticio entre la primera conversación y la entrega.",
    },
  ],
} as const;

export const publicChannels = {
  instagram: "https://www.instagram.com/mayofy.web/",
  linkedin: "https://www.linkedin.com/in/juanikitro/",
  email: "jpkitro@gmail.com",
} as const;
