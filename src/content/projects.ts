/**
 * A screenshot for the works index on the landing and the share card. Drop
 * the file in public/images/proyectos/<slug>/ and list it here.
 */
export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A capture on the case page, served as AVIF, WebP and JPG at every width
 * (`<src>-<width>.<ext>`, made by scripts/case-captures.mjs). `width` and
 * `height` are the trimmed source's, for the aspect ratio. Client names,
 * amounts and personal data are blurred before the files are made.
 */
export type CaseShot = {
  src: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
  device: "browser" | "phone";
  /** The address shown in the browser frame; the project's host by default. */
  host?: string;
};

export type CaseFeature = {
  title: string;
  body: string;
  shot: CaseShot;
};

export type ProjectEntry = {
  slug: string;
  index: string;
  /** Short name on the landing's works index, the share card and the breadcrumb. */
  title: string;
  /** The case page's h1: the category in words people search for. */
  headline: string;
  /** Words of the headline set in the serif italic, like the landing's titles. */
  accent: string;
  category: string;
  /** One or two sentences for the works index and search results. */
  summary: string;
  /** The opening paragraph under the h1. */
  intro: string;
  facts: readonly { label: string; value: string }[];
  cover: CaseShot;
  before: {
    title: string;
    paragraphs: readonly string[];
    /** How the work was done before and how it is done now, row by row. */
    changes?: readonly { before: string; now: string }[];
  };
  features: readonly CaseFeature[];
  decisions: readonly { title: string; body: string }[];
  result: {
    title: string;
    paragraphs: readonly string[];
    quote?: { text: string; author: string; role: string };
  };
  /** The pack on the landing this kind of work belongs to (commercial-plans.ts). */
  pack: "landing" | "gestion" | "sistema";
  /** True while a case has no confirmed content: never built in production. */
  placeholder: boolean;
  /** Desktop screenshots, in order; the works index previews the first. */
  images: readonly ProjectImage[];
  /** Optional phone screenshot shown beside the desktop one in the preview. */
  phoneImage?: ProjectImage;
  url?: string;
};

const desktop = { widths: [800, 1280, 1680], width: 1690, device: "browser" } as const;
const phone = { widths: [320, 390], width: 390, height: 844, device: "phone" } as const;

/*
 * Every sentence below comes from Juani, his published portfolio
 * (juanikitro.com/es/shineapp) or the client's live site. Sources and what
 * is still unconfirmed: docs/plans/2026-11-23-casos.md.
 */
export const projects = [
  {
    slug: "shineapp",
    index: "01",
    title: "Sistema de gestión para lavaderos",
    headline: "Un sistema de gestión para un lavadero de autos",
    accent: "lavadero de autos",
    category: "Sistema a medida",
    summary:
      "ShineApp ordena la agenda, los presupuestos, la caja y los materiales de un lavadero y detailing.",
    intro:
      "The King Shine es una estética vehicular: lavado y detailing. Los turnos, la caja y los materiales vivían en un cuaderno y en Excel. Hice ShineApp para que todo eso esté en un solo lugar.",
    facts: [
      { label: "Cliente", value: "The King Shine, estética vehicular" },
      { label: "Qué hice", value: "Todo: producto, diseño, programación y puesta en marcha" },
      { label: "Desde", value: "Marzo de 2026" },
      { label: "Estado", value: "En uso en The King Shine" },
    ],
    cover: {
      ...desktop,
      src: "/images/proyectos/shineapp/panel",
      height: 977,
      alt: "Panel de ShineApp: la próxima tarea, los indicadores del mes y la caja por servicio",
      host: "shineapp.lat",
    },
    before: {
      title: "Un lavadero tiene más cuentas de las que parece.",
      paragraphs: [
        "Turnos, autos, servicios que gastan materiales, cobros, deudas y una caja que tiene que cerrar todos los días. En The King Shine todo eso estaba en papel y en planillas.",
      ],
      changes: [
        { before: "Turnos anotados en un cuaderno", now: "Agenda por día, semana y mes, con lugares por sector" },
        { before: "La caja en una planilla de Excel", now: "Caja con cierre diario, deudas y gastos fijos" },
        { before: "Materiales contados a mano", now: "Materiales que se descuentan solos según el servicio" },
      ],
    },
    features: [
      {
        title: "Una agenda que sabe cuántos autos entran",
        body: "Turnos por día, semana o mes, separados en lavadero y detailing. Cada tarjeta muestra el auto, el servicio, el estado y lo que falta cobrar. Se entrega y se cobra desde ahí.",
        shot: {
          ...desktop,
          src: "/images/proyectos/shineapp/agenda",
          height: 974,
          alt: "Agenda semanal de ShineApp con las reservas de cada día, su estado y los botones para entregar y cobrar",
          host: "shineapp.lat",
        },
      },
      {
        title: "Presupuestos en PDF, listos para mandar",
        body: "Un presupuesto puede sumar hasta 25 autos. Sale en PDF, se manda por WhatsApp y, cuando el cliente acepta, pasa a la agenda como reserva.",
        shot: {
          ...desktop,
          src: "/images/proyectos/shineapp/presupuestos",
          height: 975,
          alt: "Presupuestos de ShineApp: los que faltan enviar y los enviados, con sus servicios y botones de PDF y WhatsApp",
          host: "shineapp.lat",
        },
      },
      {
        title: "Una caja que cierra todos los días",
        body: "Lo que entra y lo que sale, las deudas, los gastos fijos, los proveedores y los materiales. Los empleados usan el sistema, pero no ven los números del negocio.",
        shot: {
          ...desktop,
          src: "/images/proyectos/shineapp/caja",
          height: 972,
          alt: "Caja del mes en ShineApp con ingresos, egresos, saldo y el detalle de movimientos",
          host: "shineapp.lat",
        },
      },
      {
        title: "Los clientes piden turno desde el celular",
        body: "Cada negocio tiene su página para pedir turno, con sus datos y los del auto. Nada entra a la agenda hasta que el dueño lo acepta.",
        shot: {
          ...phone,
          src: "/images/proyectos/shineapp/reserva",
          widths: [320, 417],
          width: 417,
          height: 897,
          alt: "Página de The King Shine para reservar un turno desde el celular",
        },
      },
    ],
    decisions: [
      {
        title: "Pensado para muchos lavaderos",
        body: "Arrancó con uno, pero cada negocio tiene sus datos separados y hay pruebas que confirman que ninguno ve los de otro. Sumar un lavadero no obliga a rehacer nada.",
      },
      {
        title: "Ágil sin gastar en servidores",
        body: "Funciona sobre servicios gratuitos. Para que no se sienta lento, la pantalla muestra lo que ya tiene mientras trae lo nuevo y adelanta lo que vas a abrir.",
      },
      {
        title: "Diseñado al lado de quien lo usa",
        body: "ShineApp se hizo al lado del dueño del lavadero. Sentarse con quien usa la herramienta enseña más que cualquier lista de requisitos.",
      },
    ],
    result: {
      title: "The King Shine trabaja con ShineApp.",
      paragraphs: [
        "Usa la agenda, los presupuestos, la caja, las deudas, los materiales y la página de reservas. El control de stock y los mensajes automáticos de WhatsApp ya están hechos y esperan su momento.",
      ],
    },
    pack: "sistema",
    placeholder: false,
    images: [
      { src: "/images/proyectos/shineapp/panel.jpg", alt: "Panel de ShineApp con la próxima tarea, los indicadores del mes y la caja por servicio", width: 1440, height: 832 },
      { src: "/images/proyectos/shineapp/escritorio.jpg", alt: "Pantalla de acceso de ShineApp", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/shineapp/reserva-417.jpg", alt: "Página para reservar un turno en The King Shine, en el celular", width: 417, height: 897 },
    url: "https://shineapp.lat/",
  },
  {
    slug: "consignataria-hacienda",
    index: "02",
    title: "Página para una consignataria de hacienda",
    headline: "Una página web para una consignataria de hacienda",
    accent: "consignataria de hacienda",
    category: "Landing",
    summary:
      "La página de GyMG: qué operan, precios de referencia, un cotizador de hacienda y cada consulta directo a WhatsApp.",
    intro:
      "GyMG es una consignataria familiar de 25 de Mayo, provincia de Buenos Aires. Su página cuenta qué operan, muestra precios de referencia del mercado y lleva cada consulta directo a su WhatsApp.",
    facts: [
      { label: "Cliente", value: "GyMG Consignataria de Hacienda" },
      { label: "Qué hice", value: "Diseño, programación y publicación" },
      { label: "Tiempo", value: "3 días" },
      { label: "Rubro", value: "Hacienda: gordo, invernada y cría" },
    ],
    cover: {
      ...desktop,
      src: "/images/proyectos/consignataria-hacienda/inicio",
      height: 974,
      alt: "Inicio de la página de GyMG: hacienda pastando y la propuesta con los botones de WhatsApp y llamada",
      host: "gymg.com.ar",
    },
    before: {
      title: "Un productor quiere saber con quién habla.",
      paragraphs: [
        "GyMG opera en Buenos Aires, Santa Fe, Córdoba, La Pampa y el litoral. Antes de mandar hacienda, un productor que no los conoce necesita ver quiénes son, qué operan y cuánto vale lo que tiene.",
      ],
    },
    features: [
      {
        title: "Precios de referencia, con su fuente",
        body: "Gordo, invernada, cría, granos y monedas, en pesos o en dólares, con la variación de cada categoría. La tabla dice de dónde salen los valores: el Mercado Agroganadero de Cañuelas.",
        shot: {
          ...desktop,
          src: "/images/proyectos/consignataria-hacienda/precios",
          height: 978,
          alt: "Precios de referencia en la página de GyMG: índices del mercado y la tabla de hacienda gorda con mínimo, máximo y promedio",
          host: "gymg.com.ar",
        },
      },
      {
        title: "Un cotizador que arma la consulta",
        body: "El productor elige la categoría, el peso y las cabezas, y ve una estimación con el promedio de referencia. Un botón abre WhatsApp con la operación ya escrita.",
        shot: {
          ...phone,
          src: "/images/proyectos/consignataria-hacienda/cotizador",
          alt: "Cotizador de hacienda de GyMG en el celular",
        },
      },
    ],
    decisions: [
      {
        title: "Una promesa que se entiende",
        body: "\"Compra y venta de hacienda con trato directo y respaldo familiar.\" Arriba de todo, sobre una foto de campo, con dos botones: WhatsApp y llamar.",
      },
      {
        title: "Números que no prometen de más",
        body: "Los precios y el cotizador dicen que son orientativos. El precio final se habla con GyMG, que es lo que la página busca.",
      },
      {
        title: "Cada camino termina en WhatsApp",
        body: "Cada tipo de operación tiene su botón \"Consultar por\", y el mensaje llega con lo que el productor ya eligió.",
      },
    ],
    result: {
      title: "GyMG tiene su página en 3 días.",
      paragraphs: [
        "Está publicada en gymg.com.ar, con modo claro y oscuro, y un enlace a su Instagram.",
      ],
    },
    pack: "landing",
    placeholder: false,
    images: [
      { src: "/images/proyectos/consignataria-hacienda/escritorio.jpg", alt: "Inicio de la landing de la consignataria: hacienda pastando y la propuesta con sus botones de contacto", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/consignataria-hacienda/celular.jpg", alt: "Cotizador de hacienda de la consignataria en el celular", width: 390, height: 844 },
    url: "https://gymg.com.ar/",
  },
  {
    slug: "portfolio-desarrollador",
    index: "03",
    title: "Web personal de un programador",
    headline: "Una web personal para un programador",
    accent: "programador",
    category: "Web personal",
    summary:
      "Mi propia web de programador backend: la trayectoria y dos casos reales, explicados para quien no estuvo ahí.",
    intro:
      "Es mi web personal. La uso para buscar trabajo remoto como programador backend. Muestra mi trayectoria y dos casos reales, SISOC y ShineApp, explicados para que los entienda alguien que no estuvo ahí.",
    facts: [
      { label: "Cliente", value: "Yo, Juani" },
      { label: "Qué hice", value: "Textos, diseño, diagramas y programación" },
      { label: "Tiempo", value: "Una semana" },
      { label: "Idiomas", value: "Español e inglés" },
    ],
    cover: {
      ...desktop,
      src: "/images/proyectos/portfolio-desarrollador/inicio",
      widths: [800, 1280, 1440],
      width: 1440,
      height: 900,
      alt: "Inicio de juanikitro.com en tema oscuro, con el titular y las tarjetas de SISOC y ShineApp",
      host: "juanikitro.com",
    },
    before: {
      title: "Un currículum no muestra cómo trabajás.",
      paragraphs: [
        "Una lista de tecnologías se parece a todas las demás. Lo que distingue a un programador es cómo resolvió problemas reales, y eso hay que poder contarlo en pocos minutos.",
      ],
    },
    features: [
      {
        title: "La trayectoria, trabajo por trabajo",
        body: "Desde 2021, cada puesto con qué hice y con qué herramientas. Los que tienen caso propio llevan el enlace.",
        shot: {
          ...desktop,
          src: "/images/proyectos/portfolio-desarrollador/experiencia",
          height: 971,
          alt: "Línea de tiempo de la experiencia en juanikitro.com, del Ministerio de Capital Humano a la Municipalidad de San Miguel",
          host: "juanikitro.com",
        },
      },
      {
        title: "Un sistema grande, dibujado como un mapa de subte",
        body: "SISOC tiene decenas de programas e integraciones. Dibujado como líneas y estaciones, se ve en un vistazo qué partes hay y cómo se conectan.",
        shot: {
          ...desktop,
          src: "/images/proyectos/portfolio-desarrollador/mapa",
          height: 972,
          alt: "Mapa de SISOC dibujado como un plano de subte, con el núcleo, los programas y las integraciones",
          host: "juanikitro.com",
        },
      },
      {
        title: "Resultados sin inventar números",
        body: "No había mediciones de antes. Por eso el caso muestra qué cambió, de tareas en un grupo de WhatsApp a una versión nueva cada jueves, y el camino que recorre cada cambio.",
        shot: {
          ...desktop,
          src: "/images/proyectos/portfolio-desarrollador/resultado",
          height: 972,
          alt: "Tabla de antes y ahora de SISOC y el diagrama del recorrido de cada cambio hasta producción",
          host: "juanikitro.com",
        },
      },
      {
        title: "También en el celular",
        body: "En una pantalla chica el mapa se redibuja en vertical, así se lee sin hacer zoom. Hay tema claro y oscuro.",
        shot: {
          ...phone,
          src: "/images/proyectos/portfolio-desarrollador/mapa-celular",
          alt: "Mapa de sistemas de juanikitro.com en el celular",
        },
      },
    ],
    decisions: [
      {
        title: "Mostrar el sistema, no la lista",
        body: "Cada caso cuenta el problema, la solución y el resultado, con diagramas dibujados a mano de los sistemas reales.",
      },
      {
        title: "En dos idiomas",
        body: "Está en español y en inglés, con el currículum para bajar en los dos, porque apunta a empresas de afuera.",
      },
      {
        title: "Lo que no se sabe, se dice",
        body: "Donde no hay números de antes y después, la página lo aclara y muestra lo que sí se puede ver.",
      },
    ],
    result: {
      title: "Publicada en juanikitro.com.",
      paragraphs: [
        "Reúne en una sola dirección la trayectoria, los dos casos, el contacto y el currículum.",
      ],
    },
    pack: "landing",
    placeholder: false,
    images: [
      { src: "/images/proyectos/portfolio-desarrollador/escritorio.jpg", alt: "Inicio del portfolio en tema oscuro, con el titular y los proyectos SISOC y ShineApp", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/portfolio-desarrollador/celular.jpg", alt: "Mapa de sistemas del portfolio en el celular", width: 390, height: 844 },
    url: "https://juanikitro.com/",
  },
] as const satisfies readonly ProjectEntry[];

/** Real case studies: the only ones published, listed in the sitemap and indexed. */
export const publishedProjects = projects.filter((project) => !project.placeholder);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
