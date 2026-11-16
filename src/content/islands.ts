/**
 * Island titles and intros approved by Juani on 2026-11-16
 * (docs/plans/2026-11-16-texto-islas-propuesta.md). A title is a list of
 * segments; `{ em }` segments render in the serif italic. Commercial
 * substance stays in commercial-plans.ts, projects.ts and site.ts.
 */
export type TitleSegment = string | { em: string };

export type IslandCopy = {
  title: readonly TitleSegment[];
  body: string;
};

export const islandCopy = {
  problem: {
    title: ["Construyamos tu lugar en ", { em: "internet" }],
    body: "Instagram, Google Maps y recomendaciones ya te traen gente. Sin una página propia, cada consulta queda suelta, como estas rocas.",
  },
  packs: {
    title: ["Encontramos lo que necesita ", { em: "tu negocio" }, "."],
    body: "Precios de referencia para saber por dónde arrancar. El alcance y la inversión final se definen después de una reunión de diagnóstico gratis.",
  },
  systems: {
    title: [
      "Desde una web memorable para ",
      { em: "impactar," },
      " hasta un sistema a medida para ",
      { em: "optimizar" },
      ".",
    ],
    body: "Construimos el software que tu operación necesita, sin convertir la tecnología en protagonista.",
  },
  works: {
    title: ["Nuestra siembra, ", { em: "tus resultados" }, "."],
    body: "Un sistema a medida, una landing y una web personal, funcionando. Los casos completos se suman a medida que avanzan.",
  },
  process: {
    title: ["Seis pasos, sin ", { em: "sorpresas" }, "."],
    body: "Vas a saber en qué etapa está tu proyecto, por qué tomamos cada decisión y qué falta para publicar. Y después no te dejamos solo.",
  },
  questions: {
    title: ["Algunos detalles."],
    body: "Lo importante, sin letra chica ni respuestas de agencia.",
  },
  host: {
    title: ["Mayofy es la marca. Detrás ", { em: "estoy yo" }, "."],
    body: "",
  },
} as const satisfies Record<string, IslandCopy>;

/** Plain-text version of a title, for aria labels and metadata. */
export function titleText(title: readonly TitleSegment[]) {
  return title.map((segment) => (typeof segment === "string" ? segment : segment.em)).join("");
}
