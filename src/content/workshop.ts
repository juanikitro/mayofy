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
  items: readonly string[];
};

/**
 * Island 4 copy rewritten on 23 November 2026 (Juani: the earlier wording
 * "parecen muy de IA"; the object eyebrows such as "El invernadero" are gone).
 * Plain words for a small-business owner; the items say what each thing does.
 */
export const workshopParts: readonly WorkshopPart[] = [
  {
    object: "greenhouse",
    pin: "Sistema a medida",
    title: "Tu propio sistema",
    items: [
      "Turnos y reservas online",
      "Clientes, ventas y cobros en un solo panel",
      "Cada persona del equipo ve lo suyo",
      "Conectado con lo que ya usás: planillas, facturación o pagos",
    ],
  },
  {
    object: "pot",
    pin: "Más consultas",
    title: "Que te encuentren más",
    items: [
      "Una página para cada promoción",
      "Una página por servicio o por zona",
      "Saber qué anuncios te traen clientes",
      "Aparecer en Google Maps de tu zona",
      "Tu página en otros idiomas",
    ],
  },
  {
    object: "toolbox",
    pin: "Contacto simple",
    title: "Que te escriban más fácil",
    items: [
      "Formularios que piden solo lo necesario",
      "Presupuestos que se calculan solos",
      "Cobro de señas online",
      "Un catálogo de lo que vendés o hacés",
    ],
  },
  {
    object: "gear",
    pin: "Seguimiento automático",
    title: "Que no se te escape ninguna consulta",
    items: [
      "Cada consulta queda guardada en una planilla",
      "Tu lista de clientes, ordenada",
      "Un aviso por mail cuando entra algo nuevo",
      "Respuestas automáticas",
      "Saber en qué quedó cada consulta",
    ],
  },
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
