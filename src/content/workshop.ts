import { chatBot } from "@/content/commercial-plans";

/**
 * Island 4 (Juani, 20 November 2026: option B of
 * docs/plans/2026-11-20-propuestas.md). The island stays in view while the
 * scroll goes through what the workshop builds, one painted object at a
 * time.
 */
/** Painted objects of the island 4 plate, in % of the desktop and mobile cutouts. */
export type WorkshopObject = "greenhouse" | "pot" | "toolbox" | "gear";

export type WorkshopPart = {
  object: WorkshopObject;
  /** Short label pinned over the object on the island. */
  pin: string;
  title: string;
  /**
   * A second panel under the same object for these extras: the whole group
   * would not fit one phone screen while its panel is fully shown.
   */
  split?: { title: string; ids: readonly string[] };
};

/**
 * Island 4 copy rewritten on 23 November 2026 (Juani: the earlier wording
 * "parecen muy de IA"; the object eyebrows such as "El invernadero" are gone).
 * Since 24 November 2026 each object is a group of priced extras
 * (src/content/extras.ts, docs/plans/2026-11-24-isla4-extras.md), in the
 * order of the proposal: from being found to connecting what the client
 * already uses, which leads to the Sistema a Medida pack.
 */
export const workshopParts: readonly WorkshopPart[] = [
  { object: "pot", pin: "Más consultas", title: "Que te encuentren más" },
  { object: "toolbox", pin: "Contacto simple", title: "Que te escriban más fácil" },
  {
    object: "gear",
    pin: "Seguimiento",
    title: "Que no se te escape ninguna consulta",
    split: { title: "Un bot que responde por vos", ids: chatBot.tiers.map((tier) => tier.id) },
  },
  { object: "greenhouse", pin: "Conexiones", title: "Conectalo con lo que ya usás" },
];

/**
 * Where each object sits on the island cutouts (centre of the object, % of
 * the plate) and where its pin stands (the pin's foot). Measured on
 * 40-isla4-escritorio-v2-isla (1672 x 941) and 40-isla4-celular-v2-isla
 * (864 x 1536).
 */
export const workshopSpots: Record<WorkshopObject, { d: [number, number]; m: [number, number]; pinD: [number, number]; pinM: [number, number] }> = {
  greenhouse: { d: [61, 58], m: [65, 71.6], pinD: [61, 47.5], pinM: [65, 68.6] },
  pot: { d: [33.8, 63.5], m: [30.3, 75.3], pinD: [33.8, 59], pinM: [30.3, 73.6] },
  toolbox: { d: [70, 58], m: [77, 72.5], pinD: [72.5, 53.5], pinM: [78, 71] },
  gear: { d: [51.5, 60.5], m: [52.8, 73.4], pinD: [51.5, 55.5], pinM: [52.8, 71.8] },
};
