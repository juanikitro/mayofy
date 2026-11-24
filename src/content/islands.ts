/**
 * Island titles and intros approved by Juani on 2026-11-16
 * (docs/plans/2026-11-16-texto-islas-propuesta.md). A title is a list of
 * segments; `{ em }` segments render in the serif italic. Commercial
 * substance stays in commercial-plans.ts, projects.ts and site.ts.
 */
export type TitleSegment = string | { em: string };

export type IslandCopy = {
  title: readonly TitleSegment[];
  /** Optional: island 2 dropped its line on 22 November 2026, the works on 24 November. */
  body?: string;
  /** One line per item of a list the island walks through (the six steps). */
  details?: readonly string[];
};

export const islandCopy = {
  problem: {
    title: ["Construimos lo que ", { em: "necesitás" }, "."],
  },
  packs: {
    title: ["Elegí por dónde ", { em: "empezamos" }, "."],
    body: "Precios de referencia para saber por dónde arrancar. El alcance y el precio final se definen después de una charla gratis.",
  },
  // Shortened on 2026-11-20 with option B of docs/plans/2026-11-20-propuestas.md.
  systems: {
    title: ["Sistemas y automatizaciones ", { em: "a medida" }, "."],
    body: "Un sistema completo o una sola tarea que hoy hacés a mano. Lo armamos para cómo trabajás vos.",
  },
  // The works list goes straight under the title (Juani, 24 November 2026: the intro line was removed).
  works: {
    title: ["Hechos y ", { em: "andando" }, "."],
  },
  process: {
    title: ["Seis pasos, sin ", { em: "sorpresas" }, "."],
    // One line per step as approved with option A of the six steps
    // (docs/plans/2026-11-20-propuestas.md, Juani 2026-11-20); in the order of siteContent.process.
    // Juani, 24 November 2026: no lead, a new first line and "Hacés seguimiento" in the fourth.
    details: [
      "Nos contás cómo trabajás hoy y qué querés resolver primero.",
      "Te mandamos por escrito qué incluye, cuánto sale y cuándo está.",
      "Lo ves diseñado, con tu marca y tu rubro, antes de construirlo.",
      "Hacés seguimiento mientras lo construimos, no recién al final.",
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
