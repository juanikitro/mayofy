/**
 * Island titles and intros approved by Juani on 2026-11-16
 * (docs/plans/2026-11-16-texto-islas-propuesta.md). A title is a list of
 * segments; `{ em }` segments render in the serif italic. Commercial
 * substance stays in commercial-plans.ts, projects.ts and site.ts.
 */
export type TitleSegment = string | { em: string };

export type IslandCopy = {
  title: readonly TitleSegment[];
  /** Optional: island 2 dropped its line on 22 November 2026. */
  body?: string;
  /** One line per item of a list the island walks through (the six steps). */
  details?: readonly string[];
};

export const islandCopy = {
  problem: {
    title: ["Construimos lo que ", { em: "necesitás" }, "."],
  },
  packs: {
    title: ["Encontramos lo que necesita ", { em: "tu negocio" }, "."],
    body: "Precios de referencia para saber por dónde arrancar. El alcance y el precio final se definen después de una charla gratis.",
  },
  // Shortened on 2026-11-20 with option B of docs/plans/2026-11-20-propuestas.md.
  systems: {
    title: ["Sistemas y automatizaciones ", { em: "a medida" }, "."],
    body: "Lo que tu operación necesita, sin convertir la tecnología en protagonista.",
  },
  works: {
    title: ["Trabajos que ya ", { em: "están andando" }, "."],
    body: "Un sistema con agenda para lavaderos, una página para una consignataria y una web personal. Se suman más a medida que terminan.",
  },
  process: {
    title: ["Seis pasos, sin ", { em: "sorpresas" }, "."],
    // Lead and one line per step as approved with option A of the six steps
    // (docs/plans/2026-11-20-propuestas.md, Juani 2026-11-20); in the order of siteContent.process.
    body: "Vas a saber en qué etapa está tu proyecto y qué falta para publicar.",
    details: [
      "Charlamos 30 minutos sobre tu negocio y lo que necesitás.",
      "Te mandamos por escrito qué incluye, cuánto sale y cuándo está.",
      "Lo ves diseñado, con tu marca y tu rubro, antes de construirlo.",
      "Seguís el avance mientras lo construimos, no recién al final.",
      "Publicamos con tu dominio y dejamos medidas las visitas y consultas.",
      "Una semana de soporte incluida; después, mantenimiento si lo querés.",
    ],
  },
  questions: {
    title: ["Algunos detalles."],
    body: "Lo importante, sin letra chica ni respuestas de agencia.",
  },
  host: {
    title: ["Mayofy es la marca. Detrás ", { em: "estoy yo" }, "."],
    body: "",
  },
  // Island 6, under the intro (option A of docs/plans/2026-11-20-propuestas.md).
  reach: {
    title: ["Empecemos por una charla ", { em: "gratis" }, "."],
    body: "Contanos qué necesitás. Te respondemos en menos de 24 horas hábiles.",
  },
} as const satisfies Record<string, IslandCopy>;
