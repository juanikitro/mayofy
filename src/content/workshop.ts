/**
 * Island 4 (Juani, 20 November 2026: option B of
 * docs/plans/2026-11-20-propuestas.md). The island stays in view while the
 * scroll goes through what the workshop builds, one painted object at a
 * time. Items come from site.ts (custom systems) and commercial-plans.ts
 * (loose automations); only the object names are new copy (approved mockup).
 */
import { extensions } from "@/content/commercial-plans";
import { siteContent } from "@/content/site";

/** Painted objects of the island 4 plate, in % of the desktop and mobile cutouts. */
export type WorkshopObject = "greenhouse" | "pot" | "toolbox" | "gear";

export type WorkshopPart = {
  object: WorkshopObject;
  /** Eyebrow naming the object, so the text points at the island. */
  objectName: string;
  /** Short label pinned over the object on the island. */
  pin: string;
  title: string;
  items: readonly string[];
};

const [leads, contact, followUp] = extensions.categories;

export const workshopParts: readonly WorkshopPart[] = [
  {
    object: "greenhouse",
    objectName: "El invernadero",
    pin: "Sistema a medida",
    title: "Un sistema a medida",
    items: siteContent.systems.items.slice(0, 4),
  },
  { object: "pot", objectName: "La maceta", pin: "Más consultas", title: leads.title, items: leads.items },
  { object: "toolbox", objectName: "La caja de herramientas", pin: "Contacto simple", title: contact.title, items: contact.items },
  { object: "gear", objectName: "El engranaje", pin: "Seguimiento automático", title: followUp.title, items: followUp.items },
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
