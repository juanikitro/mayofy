import type { Archetype } from "../archetypes/index.js";
import type { Business } from "../content/business-schema.js";

export type ResolvedDesign = {
  dominant: string;
  accent: string;
  supporting: string[];
  primaryFont: string;
  secondaryFont: string;
  paletteSource: string;
};

export function resolveDesign(business: Business, archetype: Archetype): ResolvedDesign {
  const businessPalette = business.brand?.palette;
  const palette = businessPalette ?? archetype.fallbackPalette;
  const typography = business.brand?.typography ?? archetype.typography;

  return {
    dominant: palette.dominant,
    accent: palette.accent,
    supporting: palette.supporting,
    primaryFont: typography.primary,
    secondaryFont: typography.secondary,
    paletteSource: businessPalette?.source ?? "archetype-fallback",
  };
}

export function dominantColorKey(color: string): string {
  return color.trim().toLowerCase();
}
