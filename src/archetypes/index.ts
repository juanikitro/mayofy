import { archetypeIds, type ArchetypeId, type Business } from "../content/business-schema.js";

export type Archetype = {
  id: ArchetypeId;
  layout: "split" | "stacked" | "editorial" | "cards" | "conversion";
  fallbackPalette: {
    dominant: string;
    accent: string;
    supporting: string[];
  };
  typography: {
    primary: string;
    secondary: string;
  };
  tone: string;
};

export const archetypes: Record<ArchetypeId, Archetype> = {
  "automotive-premium-dark": {
    id: "automotive-premium-dark",
    layout: "split",
    fallbackPalette: {
      dominant: "#101820",
      accent: "#d7a94b",
      supporting: ["#f4f1ea", "#52616f"],
    },
    typography: { primary: "Archivo Narrow", secondary: "Merriweather Sans" },
    tone: "oscuro, preciso y orientado a servicios vehiculares de mayor ticket",
  },
  "local-clean-service": {
    id: "local-clean-service",
    layout: "stacked",
    fallbackPalette: {
      dominant: "#f7fbfa",
      accent: "#24746b",
      supporting: ["#163b40", "#d9ebe7"],
    },
    typography: { primary: "Nunito Sans", secondary: "Literata" },
    tone: "claro, cercano y ordenado para servicios barriales",
  },
  "industrial-garage": {
    id: "industrial-garage",
    layout: "editorial",
    fallbackPalette: {
      dominant: "#2d2a26",
      accent: "#d94f30",
      supporting: ["#f4efe6", "#7a7168"],
    },
    typography: { primary: "IBM Plex Sans Condensed", secondary: "Source Serif 4" },
    tone: "taller, oficio y materialidad industrial",
  },
  "minimal-professional": {
    id: "minimal-professional",
    layout: "stacked",
    fallbackPalette: {
      dominant: "#f8f7f3",
      accent: "#2f5d62",
      supporting: ["#1d2528", "#d7d2c8"],
    },
    typography: { primary: "Aptos", secondary: "Georgia" },
    tone: "minimalista, sobrio y profesional",
  },
  "bold-hero-photo": {
    id: "bold-hero-photo",
    layout: "split",
    fallbackPalette: {
      dominant: "#111111",
      accent: "#ffbf1f",
      supporting: ["#f2f2f0", "#7d7b76"],
    },
    typography: { primary: "Oswald", secondary: "Atkinson Hyperlegible" },
    tone: "hero fotografico fuerte y llamada comercial directa",
  },
  "cards-and-services": {
    id: "cards-and-services",
    layout: "cards",
    fallbackPalette: {
      dominant: "#edf3f1",
      accent: "#285f4c",
      supporting: ["#17211f", "#ffffff"],
    },
    typography: { primary: "Sora", secondary: "Fraunces" },
    tone: "servicios escaneables y contenido modular",
  },
  "classic-neighborhood-business": {
    id: "classic-neighborhood-business",
    layout: "editorial",
    fallbackPalette: {
      dominant: "#fff8ec",
      accent: "#8f3f2b",
      supporting: ["#2b2420", "#d9c7a7"],
    },
    typography: { primary: "Libre Franklin", secondary: "Libre Baskerville" },
    tone: "comercio de barrio, simple y confiable",
  },
  "modern-conversion-landing": {
    id: "modern-conversion-landing",
    layout: "conversion",
    fallbackPalette: {
      dominant: "#0c1f24",
      accent: "#36c5a1",
      supporting: ["#f5f8f6", "#41585e"],
    },
    typography: { primary: "Manrope", secondary: "Bitter" },
    tone: "conversion moderna con CTA visible y secciones compactas",
  },
};

export function getArchetype(id: ArchetypeId): Archetype {
  return archetypes[id];
}

export function resolveArchetype(business: Business, index: number): Archetype {
  if (business.site_plan?.archetype) {
    return getArchetype(business.site_plan.archetype);
  }

  return getArchetype(archetypeIds[index % archetypeIds.length]);
}
