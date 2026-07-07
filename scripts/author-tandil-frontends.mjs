import { mkdir, rm, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const runSlug = "tandil-servicios-vehiculares";
const root = process.cwd();
const frontendsRoot = path.join(root, "data", "frontends", runSlug);
const specsPath = path.join(root, "data", "site-specs", "tandil-site-specs.json");

const sites = [
  {
    slug: "luxe-detailing",
    name: "Luxe Detailing",
    title: "Detailing con foco en terminación visible",
    segment: "Detailing y estética vehicular · Tandil",
    description:
      "Para coordinar el cuidado del auto con datos claros: teléfono, ubicación, reseñas y horario publicado.",
    phone: "0249 420-6233",
    address: "Los Aromos 678",
    hours: "Lunes a sábado con horario 24 horas registrado; domingo cerrado.",
    rating: "4.9",
    reviews: "13 reseñas",
    cta: "Consultar detailing",
    secondary: "Ver ubicación",
    proof: ["Trabajo prolijo", "Buena atención", "Amabilidad y responsabilidad"],
    review:
      "Excelente, trabajo prolijo y bien ejecutado. Totalmente recomendado.",
    reviewBy: "Soledad Larsen",
    mood: "inspection",
    chips: ["Detailing", "Cuidado exterior", "Interior", "Consulta por turno"],
    angle:
      "La página pone la foto y las señales de prolijidad antes que cualquier promesa.",
    flow: ["Ver el nivel de terminación", "Llamar para coordinar", "Llegar a Los Aromos 678"],
  },
  {
    slug: "boxes-centro-de-autolavado",
    name: "Boxes Centro de Autolavado",
    title: "Autolavado de paso, horario visible y decisión rápida",
    segment: "Lavadero de autos · Tandil",
    description:
      "Una landing liviana para decidir si acercarse ahora: dirección, reseñas, teléfono y horarios al frente.",
    phone: "0297 15-539-0936",
    address: "Av. Buzón 632",
    hours: "Lunes a sábado 9:00 a 20:00; domingo 10:00 a 17:00.",
    rating: "4.4",
    reviews: "353 reseñas",
    cta: "Consultar lavado",
    secondary: "Ver horarios",
    proof: ["Alto volumen de reseñas", "Abre todos los días", "Atención mencionada"],
    review:
      "Una forma rápida y práctica de mantener el auto limpio.",
    reviewBy: "Señal en reseñas",
    mood: "wash",
    chips: ["Lavado", "Autos", "Motos y camionetas", "Todos los días"],
    angle:
      "El diseño se comporta como un box: entrar, resolver los datos y seguir.",
    flow: ["Confirmar horario", "Ubicar Av. Buzón 632", "Consultar por teléfono"],
  },
  {
    slug: "lubricentro-y-gomeria-boxes",
    name: "Lubricentro y Gomeria BOXES",
    title: "Mantenimiento liviano con tablero de consulta",
    segment: "Lubricentro y gomería · Tandil",
    description:
      "El sitio ordena lo verificable: rubro mixto, horario partido, teléfono y dirección antes de ir.",
    phone: "0249 443-7843",
    address: "Ameghino 898",
    hours: "Lunes a sábado con horario partido; domingo cerrado.",
    rating: "4.7",
    reviews: "44 reseñas",
    cta: "Consultar mantenimiento",
    secondary: "Ver dirección",
    proof: ["Lubricentro", "Gomería", "Atención mencionada"],
    review:
      "Excelente atención siempre con toda la onda.",
    reviewBy: "Nicolas Davalo",
    mood: "oil",
    chips: ["Aceite", "Filtros", "Gomería", "Consulta en local"],
    angle:
      "La ficha concentra rubro, horario y teléfono para confirmar antes de acercarse.",
    flow: ["Identificar la consulta", "Llamar antes de ir", "Acercarse a Ameghino 898"],
  },
  {
    slug: "gomeria-y-auxilio-24-horas-landeyro",
    name: "Gomería y auxilio 24 horas Landeyro",
    title: "Auxilio de cubierta con teléfono en primer plano",
    segment: "Gomería y auxilio · Tandil",
    description:
      "Para una cubierta que no espera: llamada directa, dirección exacta y horario publicado sin vueltas.",
    phone: "0249 463-9850",
    address: "J. M. Dhers 25",
    hours: "24 horas de lunes a sábado; domingo 8:00 a 14:00.",
    rating: "4.8",
    reviews: "176 reseñas",
    cta: "Llamar por auxilio",
    secondary: "Ver datos",
    proof: ["24 horas lunes a sábado", "Rapidez mencionada", "Feriados en reseñas"],
    review:
      "Me atendieron muy rápido y bien. Tuve que dejar el neumático y al otro día ya estaba listo.",
    reviewBy: "Facundo Velazquez",
    mood: "dispatch",
    chips: ["Gomería", "Auxilio", "Pinchaduras", "24 horas"],
    angle:
      "La landing funciona como señal de ruta: teléfono grande, horario crítico y ubicación.",
    flow: ["Llamar", "Explicar la urgencia", "Coordinar llegada o reparación"],
  },
  {
    slug: "taller-franco-chapa-y-pintura",
    name: "Taller Franco Chapa y Pintura",
    title: "Chapa y pintura con señales de oficio",
    segment: "Chapa y pintura · Tandil",
    description:
      "Un sitio editorial para consultar trabajos de carrocería usando reseñas sobre golpes, pulido y terminación.",
    phone: "0249 454-4214",
    address: "Saavedra 458",
    hours: "Lunes a viernes con horario partido; sábado y domingo cerrado.",
    rating: "4.7",
    reviews: "67 reseñas",
    cta: "Consultar reparación",
    secondary: "Ver referencias",
    proof: ["Golpes mencionados", "Pulido mencionado", "Auto impecable en reseñas"],
    review:
      "Además de arreglar ese golpe, pedí un pulido y quedó espectacular.",
    reviewBy: "Yohana Romeo",
    mood: "primer",
    chips: ["Chapa", "Pintura", "Pulido", "Consulta por trabajo"],
    angle:
      "No arma un portfolio ficticio: usa señales reales de terminación.",
    flow: ["Contar el trabajo", "Coordinar revisión", "Avanzar con datos claros"],
  },
  {
    slug: "iturralde-repuestos",
    name: "Iturralde - Repuestos",
    title: "Mostrador de repuestos para preguntar por la pieza correcta",
    segment: "Repuestos para autos · Tandil",
    description:
      "La página empuja a una consulta concreta: qué pieza se necesita, teléfono, dirección y horario publicado.",
    phone: "0249 401-7903",
    address: "9 de Julio 1556",
    hours: "Lunes a viernes 8:30 a 18:00; sábado 8:30 a 12:30; domingo cerrado.",
    rating: "4.6",
    reviews: "295 reseñas",
    cta: "Consultar repuesto",
    secondary: "Ver local",
    proof: ["Atención mencionada", "Alto volumen de reseñas", "Mostrador local"],
    review:
      "Recibí una excelente atención del empleado que me tocó.",
    reviewBy: "Lorena Blanco",
    mood: "counter",
    chips: ["Repuestos", "Consulta por pieza", "Mostrador", "Atención local"],
    angle:
      "Convierte una búsqueda de pieza en una llamada concreta antes de moverse.",
    flow: ["Llamar con la consulta", "Confirmar el dato", "Ir a 9 de Julio 1556"],
  },
  {
    slug: "walter-gomez-servicio-multimarca",
    name: "Walter Gomez Servicio Multimarca",
    title: "Taller multimarca apoyado en casos de confianza",
    segment: "Taller mecánico · Tandil",
    description:
      "Una bitácora corta para quien necesita explicar el problema del auto y coordinar revisión.",
    phone: "0249 442-2400",
    address: "Av. Marconi 1678",
    hours: "Lunes a domingo 8:30 a 18:00 según registro.",
    rating: "4.7",
    reviews: "75 reseñas",
    cta: "Consultar turno",
    secondary: "Leer señales",
    proof: ["Honestidad mencionada", "Solución efectiva", "Atención todos los días"],
    review:
      "Empatía y honestidad es lo que los diferencia.",
    reviewBy: "Lucia Pereira Pinto",
    mood: "ledger",
    chips: ["Mecánica", "Service", "Reparaciones", "Consulta por turno"],
    angle:
      "La página deja que las reseñas de situaciones concretas hagan el trabajo comercial.",
    flow: ["Llamar", "Explicar el síntoma", "Coordinar revisión"],
  },
  {
    slug: "gomeria-el-viejo-matias-auxilio-24-hs",
    name: "Gomería El Viejo Matias - Auxilio 24 hs",
    title: "Gomería barrial con horario verificado al frente",
    segment: "Gomería · Tandil",
    description:
      "El nombre menciona auxilio; la landing muestra el horario publicado y empuja a llamar para confirmar.",
    phone: "0249 424-3685",
    address: "Av. Rivadavia 799",
    hours: "Lunes a viernes 8:00 a 18:00; sábado 8:00 a 13:00; domingo cerrado.",
    rating: "4.7",
    reviews: "328 reseñas",
    cta: "Llamar a la gomería",
    secondary: "Ver horario",
    proof: ["Rapidez mencionada", "Honestidad en reseñas", "Alto volumen de reseñas"],
    review:
      "Excelente servicio, muy atentos y rápidos para resolver.",
    reviewBy: "Ramiro Diez",
    mood: "tire",
    chips: ["Gomería", "Auxilio en el nombre", "Atención local", "Consulta por teléfono"],
    angle:
      "Diseño de taller de barrio: teléfono primero, datos publicados y cero promesas extra.",
    flow: ["Llamar", "Contar la situación", "Confirmar horario o llegada"],
  },
  {
    slug: "taller-di-sipio-chapa-y-pintura",
    name: '"Taller Di Sipio" Chapa Y Pintura',
    title: "Ficha de reparación para chapa y pintura",
    segment: "Chapa y pintura · Tandil",
    description:
      "La landing baja incertidumbre con señales de rapidez, cumplimiento y atención en reseñas públicas.",
    phone: "0249 460-4088",
    address: "C. Almafuerte 943",
    hours: "Lunes a viernes 8:00 a 16:00; sábado 8:00 a 13:00; domingo cerrado.",
    rating: "4.9",
    reviews: "35 reseñas",
    cta: "Consultar arreglo",
    secondary: "Ver señales",
    proof: ["Rapidez mencionada", "Cumplimiento mencionado", "Atención destacada"],
    review:
      "El trabajo perfecto y en tiempo, se cumplió todo lo que me dijeron.",
    reviewBy: "Mauricio Gallo",
    mood: "booth",
    chips: ["Chapa", "Pintura", "Reparaciones", "Consulta por trabajo"],
    angle:
      "Cada bloque parece una orden de taller: problema, llamada y revisión.",
    flow: ["Llamar", "Contar el trabajo", "Coordinar revisión"],
  },
  {
    slug: "mecanica-maz",
    name: "Mecanica Maz",
    title: "Taller para consultar imprevistos mecánicos",
    segment: "Taller mecánico · Tandil",
    description:
      "Una página de ruta y taller para conductores locales o de paso que necesitan explicar un problema.",
    phone: "0249 464-3419",
    address: "Laprida 961",
    hours: "Lunes a sábado 8:00 a 20:00; domingo cerrado.",
    rating: "4.9",
    reviews: "31 reseñas",
    cta: "Consultar taller",
    secondary: "Ver casos",
    proof: ["Casos de viaje", "Problemas resueltos en reseñas", "Trato mencionado"],
    review:
      "Estaba de viaje y un sábado por la tarde tuve un problema mecánico.",
    reviewBy: "Dmdi",
    mood: "routebook",
    chips: ["Mecánica", "Service", "Diagnóstico", "Consulta por turno"],
    angle:
      "El sitio se apoya en relatos de viaje sin convertirlos en promesas.",
    flow: ["Describir el síntoma", "Llamar al taller", "Coordinar revisión"],
  },
];

const moodTheme = {
  inspection: {
    bg: "#070b10",
    ink: "#fff8ea",
    muted: "#bac6c6",
    accent: "#d7a94b",
    accent2: "#8fd8c5",
    panel: "rgba(7, 11, 16, .74)",
    fontA: '"Archivo Narrow", "Bahnschrift", sans-serif',
    fontB: '"Merriweather Sans", "Candara", sans-serif',
    shape: "finish-meter",
  },
  wash: {
    bg: "#f3fbfb",
    ink: "#13242a",
    muted: "#47646a",
    accent: "#00a6a6",
    accent2: "#ff7a59",
    panel: "rgba(243, 251, 251, .82)",
    fontA: '"Trebuchet MS", "Aptos Display", sans-serif',
    fontB: '"Georgia", serif',
    shape: "water-tokens",
  },
  oil: {
    bg: "#221f1b",
    ink: "#fff4df",
    muted: "#d8c7a7",
    accent: "#e9542f",
    accent2: "#f2b94b",
    panel: "rgba(34, 31, 27, .82)",
    fontA: '"IBM Plex Sans Condensed", "Bahnschrift", sans-serif',
    fontB: '"Source Serif 4", "Cambria", serif',
    shape: "service-label",
  },
  dispatch: {
    bg: "#101418",
    ink: "#fbf6e8",
    muted: "#c4ced0",
    accent: "#ffd43b",
    accent2: "#28c5b5",
    panel: "rgba(16, 20, 24, .82)",
    fontA: '"Impact", "Bahnschrift", sans-serif',
    fontB: '"Aptos", "Verdana", sans-serif',
    shape: "road-signal",
  },
  primer: {
    bg: "#f2eee3",
    ink: "#191814",
    muted: "#6e6659",
    accent: "#f2b21b",
    accent2: "#242424",
    panel: "rgba(242, 238, 227, .84)",
    fontA: '"Oswald", "Franklin Gothic Medium", sans-serif',
    fontB: '"Atkinson Hyperlegible", "Verdana", sans-serif',
    shape: "paint-sheets",
  },
  counter: {
    bg: "#e9f3ef",
    ink: "#12221d",
    muted: "#51665d",
    accent: "#2f765e",
    accent2: "#dc5b3f",
    panel: "rgba(233, 243, 239, .86)",
    fontA: '"Sora", "Century Gothic", sans-serif',
    fontB: '"Fraunces", "Georgia", serif',
    shape: "drawer-grid",
  },
  ledger: {
    bg: "#fff6e5",
    ink: "#2d231e",
    muted: "#7b6252",
    accent: "#9b432d",
    accent2: "#315f72",
    panel: "rgba(255, 246, 229, .88)",
    fontA: '"Libre Franklin", "Franklin Gothic Medium", sans-serif',
    fontB: '"Libre Baskerville", "Georgia", serif',
    shape: "notebook",
  },
  tire: {
    bg: "#081b20",
    ink: "#f4fbf7",
    muted: "#b7c8c7",
    accent: "#37d7ae",
    accent2: "#f0c85a",
    panel: "rgba(8, 27, 32, .82)",
    fontA: '"Manrope", "Aptos Display", sans-serif',
    fontB: '"Bitter", "Georgia", serif',
    shape: "tread-poster",
  },
  booth: {
    bg: "#121b26",
    ink: "#fff7e6",
    muted: "#c9d0d8",
    accent: "#e6a13a",
    accent2: "#8fb6d6",
    panel: "rgba(18, 27, 38, .82)",
    fontA: '"Archivo Narrow", "Bahnschrift", sans-serif',
    fontB: '"Merriweather Sans", "Candara", sans-serif',
    shape: "repair-ticket",
  },
  routebook: {
    bg: "#f8f6ee",
    ink: "#202925",
    muted: "#687469",
    accent: "#426b55",
    accent2: "#c45d3e",
    panel: "rgba(248, 246, 238, .86)",
    fontA: '"Nunito Sans", "Aptos", sans-serif',
    fontB: '"Literata", "Georgia", serif',
    shape: "route-map",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function telHref(phone) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

function commercialPlan(site) {
  const text = `${site.segment} ${site.title} ${site.chips.join(" ")}`.toLowerCase();

  if (text.includes("detailing") || text.includes("lavadero") || text.includes("lavado")) {
    return {
      promise: "Servicios pensados para que el auto se note limpio antes de subirse.",
      services: [
        ["Exterior", "Presentación visible", "Lavado y terminación planteados como resultado, no como lista genérica."],
        ["Interior", "Cabina lista para usar", "Espacio para explicar aspirado, superficies o detalle interno si el negocio lo confirma."],
        ["Turno", "Consulta simple", "El CTA pide horario, tipo de vehículo y necesidad concreta."],
      ],
      packages: [
        ["Lavado exterior", "Precio a confirmar", ["Exterior", "Secado", "Terminación visual"]],
        ["Completo interior/exterior", "A confirmar", ["Interior", "Exterior", "Demora según agenda"]],
        ["Detalle puntual", "Editable", ["Necesidad específica", "Foto previa", "Turno a confirmar"]],
      ],
      gallery: [
        ["Antes", "Estado inicial", "Foto real del ingreso o del detalle que el cliente quiere resolver."],
        ["Después", "Entrega limpia", "Espacio para mostrar brillo, terminación o habitáculo listo."],
        ["Detalle", "Plano corto", "Material propio: espuma, paños, llantas, interior o terminación."],
      ],
    };
  }

  if (text.includes("gomer") || text.includes("auxilio") || text.includes("cubierta")) {
    return {
      promise: "Cuando el problema es una cubierta, la página tiene que convertir rápido.",
      services: [
        ["Pinchadura", "Resolver sin vueltas", "Consulta orientada a estado de la rueda, urgencia y disponibilidad real."],
        ["Cubiertas", "Pedir medida primero", "El usuario sabe que debe mandar medida o foto antes de hablar de stock."],
        ["Auxilio", "Llamada por prioridad", "Si aplica, el primer paso es llamar y confirmar alcance real del auxilio."],
      ],
      packages: [
        ["Pinchadura", "Precio a confirmar", ["Estado de cubierta", "Medida", "Disponibilidad"]],
        ["Cambio de cubierta", "A cotizar", ["Medida a consultar", "Stock a validar", "Trabajo en local"]],
        ["Auxilio / consulta", "Editable", ["Ubicación", "Teléfono visible", "Horario real"]],
      ],
      gallery: [
        ["Ruta", "Problema en contexto", "Espacio para foto de cubierta, herramienta o atención en local."],
        ["Local", "Mostrador o taller", "Imagen real para reforzar confianza barrial."],
        ["Resultado", "Rueda resuelta", "Antes/después editable con trabajo terminado."],
      ],
    };
  }

  if (text.includes("lubricentro") || text.includes("aceite") || text.includes("filtro")) {
    return {
      promise: "Mantenimiento claro: llevar el dato del auto antes de pedir precio.",
      services: [
        ["Aceite", "Producto a confirmar", "La consulta pide modelo, kilometraje y uso del vehículo."],
        ["Filtros", "Consumibles sin stock falso", "Espacio editable para filtros si el local los confirma."],
        ["Gomería", "Consulta mixta", "El rubro combinado queda ordenado sin mezclar promesas."],
      ],
      packages: [
        ["Cambio de aceite", "Precio a confirmar", ["Aceite a validar", "Filtro si corresponde", "Datos del vehículo"]],
        ["Chequeo rápido", "Editable", ["Kilometraje", "Uso del auto", "Consulta de consumibles"]],
        ["Kit mantenimiento", "A cotizar", ["Stock a confirmar", "Marca no inventada", "Turno sujeto a agenda"]],
      ],
      gallery: [
        ["Banco", "Insumos reales", "Foto del área de trabajo o mostrador."],
        ["Ficha", "Dato del vehículo", "Espacio para explicar qué enviar antes de ir."],
        ["Entrega", "Próximo cambio", "Campo visual para recordatorio o sticker si existe."],
      ],
    };
  }

  if (text.includes("repuesto")) {
    return {
      promise: "La consulta de repuesto se gana pidiendo el dato correcto.",
      services: [
        ["Pieza", "Modelo y año primero", "El sitio pide datos del vehículo antes de hablar de stock."],
        ["Mostrador", "Dirección clara", "El local aparece como punto de consulta y retiro."],
        ["Disponibilidad", "Stock a validar", "Marcas, precio y unidades quedan fuera hasta confirmación."],
      ],
      packages: [
        ["Consulta por pieza", "Precio a confirmar", ["Modelo", "Año o motor", "Foto o código"]],
        ["Accesorio puntual", "Editable", ["Tipo de accesorio", "Compatibilidad", "Stock a validar"]],
        ["Retiro en local", "A coordinar", ["Horario", "Dirección", "Teléfono"]],
      ],
      gallery: [
        ["Mostrador", "Atención en local", "Foto real del local o estanterías."],
        ["Pieza", "Detalle identificable", "Espacio para mostrar códigos o compatibilidad."],
        ["Retiro", "Consulta cerrada", "Visual para retirar en horario confirmado."],
      ],
    };
  }

  if (text.includes("chapa") || text.includes("pintura")) {
    return {
      promise: "Una reparación se consulta con fotos, alcance y revisión real.",
      services: [
        ["Chapa", "Evaluar el daño", "Pedir fotos evita prometer presupuesto sin ver el vehículo."],
        ["Pintura", "Terminación visible", "La galería queda lista para color, brillo y ajuste de paneles."],
        ["Revisión", "Turno con contexto", "El CTA empuja a enviar imágenes y coordinar taller."],
      ],
      packages: [
        ["Evaluación con fotos", "Sin precio publicado", ["Fotos del golpe", "Zona afectada", "Dirección del taller"]],
        ["Reparación puntual", "A cotizar", ["Alcance a definir", "Materiales a confirmar", "Turno"]],
        ["Pintura / terminación", "Editable", ["Color", "Paneles afectados", "Revisión presencial"]],
      ],
      gallery: [
        ["Antes", "Golpe o pieza", "Foto real del estado inicial."],
        ["Durante", "Proceso de taller", "Material visual propio, sin portfolio ficticio."],
        ["Después", "Terminación", "Resultado cargado cuando haya evidencia."],
      ],
    };
  }

  return {
    promise: "Primero entender qué le pasa al auto; después coordinar bien el turno.",
    services: [
      ["Diagnóstico", "Consulta con síntomas", "Ruido, falla, testigo o pérdida explicados antes de prometer solución."],
      ["Service", "Mantenimiento a confirmar", "Espacio para servicios reales del taller, sin marcas inventadas."],
      ["Turno", "Llamar con datos", "La landing prepara el mensaje para que el taller responda mejor."],
    ],
    packages: [
      ["Diagnóstico inicial", "A confirmar", ["Síntoma", "Kilometraje", "Turno"]],
      ["Service preventivo", "Editable", ["Aceite/filtros si aplica", "Revisión", "Datos del vehículo"]],
      ["Reparación puntual", "A cotizar", ["Falla reportada", "Revisión presencial", "Piezas a confirmar"]],
    ],
    gallery: [
      ["Ingreso", "Auto en taller", "Foto real del vehículo o área de trabajo."],
      ["Detalle", "Síntoma o pieza", "Espacio para mostrar contexto técnico sin inventar diagnóstico."],
      ["Salida", "Trabajo cerrado", "Resultado solo cuando exista evidencia real."],
    ],
  };
}

function fallbackSvg(site, theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100" role="img" aria-label="${escapeHtml(site.name)}">
  <rect width="1600" height="1100" fill="${theme.bg}"/>
  <path d="M-120 890 C 260 680, 440 720, 760 520 S 1250 300, 1720 420" fill="none" stroke="${theme.accent}" stroke-width="64" opacity=".72"/>
  <path d="M-80 1010 C 310 790, 520 820, 820 640 S 1210 440, 1680 570" fill="none" stroke="${theme.accent2}" stroke-width="28" opacity=".78"/>
  <circle cx="1160" cy="770" r="190" fill="none" stroke="${theme.ink}" stroke-width="36" opacity=".22"/>
  <circle cx="1160" cy="770" r="84" fill="none" stroke="${theme.ink}" stroke-width="22" opacity=".18"/>
  <rect x="96" y="118" width="1080" height="18" fill="${theme.accent}"/>
  <text x="96" y="260" fill="${theme.ink}" font-family="Verdana, sans-serif" font-size="84" font-weight="800">${escapeHtml(site.name)}</text>
  <text x="100" y="345" fill="${theme.muted}" font-family="Georgia, serif" font-size="42">${escapeHtml(site.segment)}</text>
</svg>`;
}

function html(site) {
  const theme = moodTheme[site.mood];
  const commercial = commercialPlan(site);
  const heroStats = [
    ["Valoración", site.rating],
    ["Reseñas", site.reviews],
    ["Dirección", site.address],
    ["Horario", site.hours],
  ];
  const proofItems = site.proof.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const chipItems = site.chips.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const flowItems = site.flow
    .map(
      (item, index) => `<article>
        <b>${String(index + 1).padStart(2, "0")}</b>
        <p>${escapeHtml(item)}</p>
      </article>`,
    )
    .join("");
  const serviceCards = commercial.services
    .map(
      ([label, title, body]) => `<article>
        <span>${escapeHtml(label)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(body)}</p>
      </article>`,
    )
    .join("");
  const packageCards = commercial.packages
    .map(
      ([name, price, items]) => `<article>
        <div class="package-head">
          <span>Combo editable</span>
          <strong>${escapeHtml(price)}</strong>
        </div>
        <h3>${escapeHtml(name)}</h3>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>`,
    )
    .join("");
  const galleryCards = commercial.gallery
    .map(
      ([label, title, body]) => `<article>
        <span>${escapeHtml(label)}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(body)}</p>
      </article>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(site.name)} | ${escapeHtml(site.segment)}</title>
    <meta name="description" content="${escapeHtml(site.description)}">
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body class="${escapeHtml(site.mood)}">
    <a class="skip-link" href="#contacto">Saltar al contacto</a>
    <nav class="nav" aria-label="Secciones">
      <a href="#senales">Señales</a>
      <a href="#consulta">Consulta</a>
      <a href="#servicios">Servicios</a>
      <a href="#combos">Combos</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <main>
      <section class="hero ${escapeHtml(theme.shape)}" aria-label="${escapeHtml(site.name)}">
        <img class="hero-image" src="./assets/hero.jpg" onerror="this.onerror=null;this.src='./assets/fallback.svg';" alt="Imagen de ${escapeHtml(site.name)}" loading="eager">
        <div class="hero-shade"></div>
        <div class="hero-mark" aria-hidden="true"></div>
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(site.segment)}</p>
          <h1>${escapeHtml(site.name)}</h1>
          <p class="title-line">${escapeHtml(site.title)}</p>
          <p class="lead">${escapeHtml(site.description)}</p>
          <div class="cta-row">
            <a class="button primary" href="${telHref(site.phone)}">${escapeHtml(site.cta)}</a>
            <a class="button secondary" href="#senales">${escapeHtml(site.secondary)}</a>
          </div>
        </div>
        <aside class="hero-panel" aria-label="Datos rápidos">
          ${heroStats
            .map(
              ([label, value]) => `<div>
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>`,
            )
            .join("")}
        </aside>
      </section>

      <section id="senales" class="signal-band">
        <div>
          <p class="section-kicker">Qué conviene saber</p>
          <h2>${escapeHtml(site.angle)}</h2>
        </div>
        <ul>${proofItems}</ul>
      </section>

      <section id="consulta" class="work-grid">
        <article class="service-panel">
          <p class="section-kicker">Rubro</p>
          <h2>${escapeHtml(site.title)}</h2>
          <div class="chips">${chipItems}</div>
        </article>
        <article class="quote-panel">
          <p class="quote">“${escapeHtml(site.review)}”</p>
          <p class="quote-by">${escapeHtml(site.reviewBy)}</p>
        </article>
      </section>

      <section id="servicios" class="commercial-intro">
        <div>
          <p class="section-kicker">Servicios</p>
          <h2>${escapeHtml(commercial.promise)}</h2>
        </div>
        <div class="commercial-cards">${serviceCards}</div>
      </section>

      <section id="combos" class="package-band">
        <div class="package-title">
          <p class="section-kicker">Paquetes</p>
          <h2>Combos para cotizar sin inventar precios.</h2>
          <p>Los valores, marcas, stock y alcances quedan a confirmar con el negocio antes de publicar.</p>
        </div>
        <div class="package-grid">${packageCards}</div>
      </section>

      <section class="visual-proof">
        <div class="proof-title">
          <p class="section-kicker">Antes / después</p>
          <h2>Galería preparada para fotos reales.</h2>
        </div>
        <div class="gallery-grid">${galleryCards}</div>
      </section>

      <section class="flow" aria-label="Pasos sugeridos">
        ${flowItems}
      </section>

      <section class="close-cta">
        <div>
          <p class="section-kicker">Próximo paso</p>
          <h2>${escapeHtml(site.name)}: consultar con el dato correcto.</h2>
          <p>${escapeHtml(site.angle)}</p>
        </div>
        <a class="button primary large" href="${telHref(site.phone)}">${escapeHtml(site.cta)}</a>
      </section>

      <section id="contacto" class="contact">
        <div>
          <p class="section-kicker">Contacto directo</p>
          <h2>${escapeHtml(site.phone)}</h2>
          <p>${escapeHtml(site.address)}, Tandil.</p>
          <p>${escapeHtml(site.hours)}</p>
        </div>
        <a class="button primary large" href="${telHref(site.phone)}">${escapeHtml(site.cta)}</a>
      </section>
    </main>
    <footer>
      <span>${escapeHtml(site.name)}</span>
      <span>Creado por JuaniKitro</span>
    </footer>
  </body>
</html>`;
}

function css(site) {
  const theme = moodTheme[site.mood];
  return `:root {
  color-scheme: ${["wash", "primer", "counter", "ledger", "routebook"].includes(site.mood) ? "light" : "dark"};
  --bg: ${theme.bg};
  --ink: ${theme.ink};
  --muted: ${theme.muted};
  --accent: ${theme.accent};
  --accent-2: ${theme.accent2};
  --panel: ${theme.panel};
  --line: color-mix(in srgb, var(--ink) 20%, transparent);
  --font-a: ${theme.fontA};
  --font-b: ${theme.fontB};
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-b);
  min-height: 100vh;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent 34%),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 7%, transparent) 0 1px, transparent 1px 70px);
}

body.inspection::before,
body.dispatch::before,
body.tire::before,
body.booth::before {
  background:
    radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--accent-2) 24%, transparent), transparent 30%),
    repeating-linear-gradient(118deg, color-mix(in srgb, var(--ink) 8%, transparent) 0 1px, transparent 1px 32px);
}

body.wash::before {
  background:
    radial-gradient(circle at 20% 16%, rgba(255,255,255,.8), transparent 22%),
    repeating-radial-gradient(circle at 88% 18%, color-mix(in srgb, var(--accent) 18%, transparent) 0 2px, transparent 2px 34px);
}

body.counter::before {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 26%),
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 9%, transparent) 0 1px, transparent 1px 58px),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 8%, transparent) 0 1px, transparent 1px 96px);
}

body.ledger::before,
body.routebook::before {
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent-2) 14%, transparent), transparent 42%),
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 10%, transparent) 0 1px, transparent 1px 36px);
}

.skip-link {
  position: absolute;
  left: 12px;
  top: -80px;
  z-index: 20;
  background: var(--accent);
  color: var(--bg);
  padding: 10px 12px;
  font-weight: 900;
}

.skip-link:focus {
  top: 12px;
}

.nav {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 12;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.nav a,
.button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
  font-family: var(--font-a);
  font-weight: 900;
  letter-spacing: 0;
  padding: 10px 14px;
  background: color-mix(in srgb, var(--bg) 74%, transparent);
  backdrop-filter: blur(14px);
}

.button.primary {
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
}

.button.secondary {
  background: color-mix(in srgb, var(--panel) 88%, transparent);
}

.button.large {
  align-self: center;
  min-width: 220px;
  font-size: 1.05rem;
}

main {
  overflow: hidden;
}

.hero {
  position: relative;
  min-height: min(760px, 88vh);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  padding: clamp(72px, 10vw, 118px) clamp(18px, 7vw, 92px) clamp(36px, 6vw, 58px);
  isolation: isolate;
}

.hero-image {
  position: absolute;
  inset: 0;
  z-index: -3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(.95) contrast(1.04);
}

.hero-shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--bg) 88%, transparent) 0 32%, color-mix(in srgb, var(--bg) 52%, transparent) 58%, color-mix(in srgb, var(--bg) 24%, transparent)),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent 58%);
}

body.wash .hero-shade,
body.counter .hero-shade,
body.routebook .hero-shade,
body.primer .hero-shade,
body.ledger .hero-shade {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--bg) 94%, transparent) 0 30%, color-mix(in srgb, var(--bg) 62%, transparent) 62%, color-mix(in srgb, var(--bg) 20%, transparent)),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent 58%);
}

.hero-mark {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.finish-meter .hero-mark {
  background:
    linear-gradient(90deg, var(--accent) 0 12px, transparent 12px) 6vw 18% / 18px 58% no-repeat,
    radial-gradient(circle at 72% 68%, transparent 0 90px, color-mix(in srgb, var(--accent) 40%, transparent) 92px 96px, transparent 98px);
}

.water-tokens .hero-mark {
  background:
    radial-gradient(circle at 72% 32%, color-mix(in srgb, var(--accent) 22%, transparent) 0 72px, transparent 73px),
    radial-gradient(circle at 82% 52%, color-mix(in srgb, var(--accent-2) 22%, transparent) 0 50px, transparent 51px),
    linear-gradient(110deg, transparent 60%, color-mix(in srgb, var(--accent) 34%, transparent) 60% 61%, transparent 61%);
}

.service-label .hero-mark {
  background:
    linear-gradient(118deg, transparent 0 55%, var(--accent) 55% 58%, transparent 58%),
    linear-gradient(90deg, transparent 0 8vw, color-mix(in srgb, var(--accent-2) 54%, transparent) 8vw calc(8vw + 80px), transparent calc(8vw + 80px));
}

.road-signal .hero-mark {
  background:
    repeating-linear-gradient(124deg, transparent 0 26px, color-mix(in srgb, var(--accent) 60%, transparent) 26px 38px, transparent 38px 70px),
    linear-gradient(90deg, transparent 60%, color-mix(in srgb, var(--accent-2) 28%, transparent));
  opacity: .42;
}

.paint-sheets .hero-mark {
  background:
    linear-gradient(100deg, transparent 0 62%, color-mix(in srgb, var(--accent) 66%, transparent) 62% 68%, transparent 68%),
    radial-gradient(circle at 78% 74%, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 22%);
}

.drawer-grid .hero-mark {
  background:
    repeating-linear-gradient(90deg, transparent 0 84px, color-mix(in srgb, var(--accent) 28%, transparent) 84px 88px),
    repeating-linear-gradient(0deg, transparent 0 58px, color-mix(in srgb, var(--accent-2) 22%, transparent) 58px 60px);
  mask-image: linear-gradient(90deg, transparent, #000 62%);
}

.notebook .hero-mark {
  background:
    linear-gradient(90deg, transparent 0 74px, color-mix(in srgb, var(--accent) 48%, transparent) 74px 78px, transparent 78px),
    radial-gradient(circle at 72% 72%, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 24%);
}

.tread-poster .hero-mark {
  background:
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent) 0 14px, transparent 14px 34px),
    radial-gradient(circle at 78% 70%, transparent 0 104px, color-mix(in srgb, var(--accent) 50%, transparent) 106px 118px, transparent 120px);
}

.repair-ticket .hero-mark {
  background:
    linear-gradient(90deg, transparent 0 70%, color-mix(in srgb, var(--accent) 54%, transparent) 70% 74%, transparent 74%),
    repeating-linear-gradient(0deg, transparent 0 30px, color-mix(in srgb, var(--ink) 10%, transparent) 30px 31px);
}

.route-map .hero-mark {
  background:
    radial-gradient(circle at 72% 68%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 20%),
    linear-gradient(128deg, transparent 48%, color-mix(in srgb, var(--accent-2) 44%, transparent) 48% 49%, transparent 49%);
}

.hero-copy {
  width: min(760px, 100%);
}

.eyebrow,
.section-kicker,
.hero-panel span,
.chips span,
.flow b,
.quote-by,
footer {
  font-family: var(--font-a);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
}

.eyebrow,
.section-kicker {
  color: var(--accent);
  margin: 0 0 14px;
}

h1,
h2 {
  font-family: var(--font-a);
  letter-spacing: 0;
  margin: 0;
}

h1 {
  max-width: 900px;
  font-size: clamp(3rem, 9vw, 8.7rem);
  line-height: .84;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.title-line {
  max-width: 760px;
  margin: 22px 0 0;
  color: var(--accent-2);
  font-family: var(--font-a);
  font-size: clamp(1.45rem, 3vw, 2.65rem);
  font-weight: 900;
  line-height: 1;
}

.lead {
  max-width: 680px;
  margin: 18px 0 0;
  font-size: clamp(1.08rem, 1.7vw, 1.32rem);
  line-height: 1.55;
  color: color-mix(in srgb, var(--ink) 84%, var(--muted));
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.hero-panel {
  position: absolute;
  right: clamp(16px, 5vw, 74px);
  bottom: clamp(18px, 5vw, 52px);
  width: min(390px, calc(100% - 32px));
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid var(--line);
  background: var(--line);
}

.hero-panel div {
  min-height: 110px;
  padding: 14px;
  background: var(--panel);
  backdrop-filter: blur(14px);
}

.hero-panel span {
  display: block;
  color: var(--muted);
  font-size: .8rem;
}

.hero-panel strong {
  display: block;
  margin-top: 9px;
  color: var(--ink);
  font-family: var(--font-a);
  font-size: clamp(1.3rem, 2vw, 2rem);
  line-height: 1;
  overflow-wrap: anywhere;
}

body.wash .hero-copy {
  margin-left: auto;
  text-align: right;
  max-width: 720px;
}

body.wash .cta-row {
  justify-content: flex-end;
}

body.wash .hero-shade {
  background:
    linear-gradient(270deg, color-mix(in srgb, var(--bg) 96%, transparent) 0 36%, color-mix(in srgb, var(--bg) 58%, transparent) 62%, color-mix(in srgb, var(--bg) 16%, transparent)),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent 58%);
}

body.wash .hero-panel,
body.primer .hero-panel,
body.booth .hero-panel {
  left: clamp(16px, 5vw, 74px);
  right: auto;
  grid-template-columns: 1fr;
  width: min(300px, calc(100% - 32px));
}

body.oil .hero-copy {
  max-width: 720px;
}

body.oil .hero-panel {
  left: clamp(16px, 6vw, 84px);
  right: auto;
  bottom: 26px;
  width: min(920px, calc(100% - 32px));
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

body.oil .hero-panel div {
  min-height: 96px;
}

body.dispatch .hero {
  align-items: center;
}

body.dispatch .hero-copy {
  margin-left: min(360px, 28vw);
  max-width: 860px;
}

body.dispatch .hero-panel {
  left: clamp(16px, 4vw, 58px);
  right: auto;
  top: 138px;
  bottom: auto;
  width: min(290px, calc(100% - 32px));
  grid-template-columns: 1fr;
}

body.dispatch h1 {
  font-size: clamp(4.6rem, 11vw, 10.5rem);
}

body.primer .hero-copy {
  margin-left: auto;
  max-width: 720px;
}

body.primer .hero-shade {
  background:
    linear-gradient(270deg, color-mix(in srgb, var(--bg) 92%, transparent) 0 28%, color-mix(in srgb, var(--bg) 54%, transparent) 62%, color-mix(in srgb, var(--bg) 18%, transparent)),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 86%, transparent), transparent 58%);
}

body.counter .hero-panel {
  top: 126px;
  bottom: auto;
  width: min(360px, calc(100% - 32px));
  grid-template-columns: 1fr;
}

body.counter .hero-copy {
  max-width: 690px;
}

body.ledger .hero-copy {
  margin-left: auto;
  text-align: right;
  max-width: 760px;
}

body.ledger .cta-row {
  justify-content: flex-end;
}

body.ledger .hero-shade {
  background:
    linear-gradient(270deg, color-mix(in srgb, var(--bg) 92%, transparent) 0 34%, color-mix(in srgb, var(--bg) 58%, transparent) 62%, color-mix(in srgb, var(--bg) 20%, transparent)),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent 58%);
}

body.ledger .hero-panel {
  left: clamp(16px, 5vw, 74px);
  right: auto;
  bottom: 58px;
  width: min(340px, calc(100% - 32px));
  grid-template-columns: 1fr;
}

body.tire .hero-copy {
  max-width: 900px;
}

body.tire .hero-panel {
  right: clamp(16px, 8vw, 108px);
  bottom: 78px;
}

body.booth .hero-copy {
  margin-left: auto;
  max-width: 740px;
}

body.routebook .hero-copy {
  margin-left: clamp(0px, 5vw, 86px);
  max-width: 720px;
}

body.routebook .hero-panel {
  right: clamp(16px, 7vw, 96px);
  bottom: 76px;
  transform: rotate(1deg);
}

.signal-band,
.work-grid,
.commercial-intro,
.package-band,
.visual-proof,
.flow,
.close-cta,
.contact {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.signal-band {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(280px, .92fr);
  gap: clamp(22px, 5vw, 64px);
  align-items: start;
  padding: clamp(40px, 7vw, 82px) 0;
}

.signal-band h2,
.contact h2,
.service-panel h2 {
  font-size: clamp(2rem, 4.8vw, 5rem);
  line-height: .92;
  text-wrap: balance;
}

.signal-band ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.signal-band li {
  border-left: 8px solid var(--accent);
  background: color-mix(in srgb, var(--panel) 78%, transparent);
  padding: 16px 18px;
  font-weight: 800;
}

.work-grid {
  display: grid;
  grid-template-columns: minmax(0, .88fr) minmax(320px, 1.12fr);
  gap: 14px;
  align-items: stretch;
}

.service-panel,
.quote-panel,
.flow article,
.contact {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel) 82%, transparent);
  backdrop-filter: blur(10px);
}

.service-panel,
.quote-panel {
  padding: clamp(22px, 4vw, 46px);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.chips span {
  border: 1px solid var(--line);
  padding: 8px 10px;
  color: var(--ink);
  background: color-mix(in srgb, var(--bg) 36%, transparent);
  font-size: .86rem;
}

.quote-panel {
  display: grid;
  align-content: center;
  min-height: 340px;
  position: relative;
  overflow: hidden;
}

.quote-panel::before {
  content: "";
  position: absolute;
  inset: 22px;
  border: 1px solid color-mix(in srgb, var(--accent) 52%, transparent);
  transform: rotate(-2deg);
  pointer-events: none;
}

.quote {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-b);
  font-size: clamp(1.45rem, 3vw, 3.2rem);
  line-height: 1.08;
  text-wrap: balance;
}

.quote-by {
  position: relative;
  z-index: 1;
  margin: 22px 0 0;
  color: var(--accent);
}

.commercial-intro {
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(320px, 1.18fr);
  gap: clamp(22px, 5vw, 66px);
  align-items: start;
  padding: clamp(42px, 7vw, 88px) 0 0;
}

.commercial-intro h2,
.package-title h2,
.proof-title h2,
.close-cta h2 {
  font-size: clamp(2.2rem, 5vw, 5.8rem);
  line-height: .9;
  text-wrap: balance;
}

.commercial-cards,
.package-grid,
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.commercial-cards article,
.package-grid article,
.gallery-grid article,
.close-cta {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--panel) 82%, transparent);
  backdrop-filter: blur(10px);
  min-width: 0;
}

.commercial-cards article {
  min-height: 270px;
  padding: 22px;
  display: grid;
  align-content: space-between;
}

.commercial-cards span,
.gallery-grid span,
.package-head span {
  font-family: var(--font-a);
  font-size: .78rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--accent);
}

.commercial-cards h3,
.package-grid h3,
.gallery-grid h3 {
  margin: 18px 0 12px;
  font-family: var(--font-a);
  font-size: clamp(1.55rem, 2.8vw, 3rem);
  line-height: .95;
  overflow-wrap: anywhere;
}

.commercial-cards p,
.gallery-grid p,
.package-title p,
.close-cta p {
  margin: 0;
  color: color-mix(in srgb, var(--ink) 78%, var(--muted));
  line-height: 1.48;
}

.package-band {
  margin-top: clamp(44px, 7vw, 92px);
  padding: clamp(24px, 5vw, 58px);
  display: grid;
  grid-template-columns: minmax(0, .88fr) minmax(320px, 1.12fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: start;
  border: 1px solid var(--line);
  background:
    linear-gradient(110deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent 44%),
    color-mix(in srgb, var(--panel) 68%, transparent);
}

.package-grid article {
  min-height: 310px;
  padding: 20px;
}

.package-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  min-height: 26px;
}

.package-head strong {
  color: var(--accent-2);
  font-family: var(--font-a);
  font-size: .86rem;
  line-height: 1.05;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-align: right;
}

.package-grid ul {
  display: grid;
  gap: 10px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.package-grid li {
  padding-top: 10px;
  border-top: 1px solid var(--line);
  overflow-wrap: anywhere;
}

.visual-proof {
  display: grid;
  grid-template-columns: minmax(260px, .42fr) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: stretch;
  padding: clamp(44px, 7vw, 88px) 0 0;
}

.gallery-grid {
  grid-template-columns: 1.15fr .92fr .92fr;
}

.gallery-grid article {
  min-height: 330px;
  padding: 22px;
  display: grid;
  align-content: end;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(to top, color-mix(in srgb, var(--bg) 82%, transparent), transparent 74%),
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--ink) 10%, transparent) 0 1px, transparent 1px 18px),
    color-mix(in srgb, var(--accent) 12%, var(--panel));
}

.gallery-grid article:first-child {
  min-height: 430px;
}

.gallery-grid article::before {
  content: "";
  position: absolute;
  inset: 22px 22px auto auto;
  width: 74px;
  height: 74px;
  border: 10px solid color-mix(in srgb, var(--accent) 48%, transparent);
  transform: rotate(12deg);
}

.close-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  margin-top: clamp(30px, 6vw, 72px);
  padding: clamp(24px, 5vw, 54px);
  background:
    linear-gradient(100deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent 54%),
    color-mix(in srgb, var(--panel) 76%, transparent);
}

.flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: clamp(28px, 5vw, 60px) 0;
}

.flow article {
  min-height: 190px;
  display: grid;
  align-content: space-between;
  padding: 20px;
}

.flow b {
  color: var(--accent);
  font-size: 3rem;
  line-height: .8;
}

.flow p {
  margin: 22px 0 0;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.28;
}

.contact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: clamp(24px, 5vw, 54px);
  margin-bottom: 38px;
}

.contact p {
  max-width: 760px;
  margin: 12px 0 0;
  color: color-mix(in srgb, var(--ink) 76%, var(--muted));
  font-size: 1.1rem;
  line-height: 1.45;
}

footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 20px 0 34px;
  color: var(--muted);
  border-top: 1px solid var(--line);
}

@media (max-width: 960px) {
  .hero {
    min-height: 82vh;
    padding-top: 96px;
  }

  .hero-panel,
  body.wash .hero-panel,
  body.oil .hero-panel,
  body.dispatch .hero-panel,
  body.primer .hero-panel,
  body.counter .hero-panel,
  body.ledger .hero-panel,
  body.tire .hero-panel,
  body.booth .hero-panel,
  body.routebook .hero-panel {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    width: min(560px, 100%);
    margin-top: 28px;
    transform: none;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  body.wash .hero-copy,
  body.ledger .hero-copy,
  body.primer .hero-copy,
  body.booth .hero-copy,
  body.routebook .hero-copy,
  body.dispatch .hero-copy {
    margin-left: 0;
    text-align: left;
  }

  body.wash .cta-row,
  body.ledger .cta-row {
    justify-content: flex-start;
  }

  .signal-band,
  .work-grid,
  .commercial-intro,
  .package-band,
  .visual-proof,
  .commercial-cards,
  .package-grid,
  .gallery-grid,
  .close-cta,
  .contact {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav {
    left: 10px;
    right: 10px;
    justify-content: center;
  }

  .nav a {
    min-height: 38px;
    padding: 8px 10px;
    font-size: .82rem;
  }

  .hero {
    min-height: auto;
    padding: 92px 16px 24px;
  }

  .hero-image {
    height: 46%;
    bottom: auto;
  }

  .hero-shade {
    background:
      linear-gradient(0deg, var(--bg) 0 48%, color-mix(in srgb, var(--bg) 68%, transparent) 100%),
      linear-gradient(90deg, color-mix(in srgb, var(--bg) 90%, transparent), transparent);
  }

  h1 {
    font-size: clamp(2.7rem, 15vw, 5.3rem);
  }

  .title-line {
    font-size: clamp(1.25rem, 7vw, 2.1rem);
  }

  .hero-panel,
  body.wash .hero-panel,
  body.oil .hero-panel,
  body.dispatch .hero-panel,
  body.primer .hero-panel,
  body.counter .hero-panel,
  body.ledger .hero-panel,
  body.tire .hero-panel,
  body.booth .hero-panel,
  body.routebook .hero-panel,
  .flow {
    grid-template-columns: 1fr;
  }

  .hero-panel div {
    min-height: 86px;
  }

  .signal-band,
  .work-grid,
  .commercial-intro,
  .package-band,
  .visual-proof,
  .flow,
  .close-cta,
  .contact {
    width: calc(100% - 24px);
  }

  .commercial-cards,
  .package-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .commercial-cards article,
  .package-grid article,
  .gallery-grid article,
  .gallery-grid article:first-child {
    min-height: auto;
  }

  .flow article {
    min-height: 104px;
    align-content: start;
  }

  .button.large {
    width: 100%;
  }
}
`;
}

async function writeFrontends() {
  await mkdir(frontendsRoot, { recursive: true });
  for (const site of sites) {
    const theme = moodTheme[site.mood];
    const siteDir = path.join(frontendsRoot, site.slug);
    const assetsDir = path.join(siteDir, "assets");
    await rm(siteDir, { recursive: true, force: true });
    await mkdir(assetsDir, { recursive: true });
    await writeFile(path.join(siteDir, "index.html"), `${html(site)}\n`, "utf8");
    await writeFile(path.join(siteDir, "styles.css"), css(site), "utf8");
    await writeFile(path.join(assetsDir, "fallback.svg"), fallbackSvg(site, theme), "utf8");
  }
}

async function updateSpecs() {
  const specs = JSON.parse(await readFile(specsPath, "utf8"));
  const slugs = new Set(sites.map((site) => site.slug));
  for (const spec of specs) {
    if (!slugs.has(spec.slug)) {
      continue;
    }
    spec.agent_frontend = {
      mode: "static-files",
      source_dir: `data/frontends/${runSlug}/${spec.slug}`,
      libraries: ["HTML", "CSS"],
      notes:
        "Landing estatica autoria de agente, con direccion visual propia y foto local del build final.",
    };
  }
  await writeFile(specsPath, `${JSON.stringify(specs, null, 2)}\n`, "utf8");
}

await writeFrontends();
await updateSpecs();
console.log(`Authored ${sites.length} Tandil frontends in data/frontends/${runSlug}`);
