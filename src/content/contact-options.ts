export type ContactOption = {
  value: string;
  label: string;
};

export const contactOptions = {
  pack: [
    { value: "landing", label: "Landing" },
    { value: "gestion", label: "Gestión (turnos, stock, pedidos o tienda)" },
    { value: "sistema", label: "Sistema a Medida" },
    { value: "automatizacion", label: "Automatización suelta" },
    { value: "bot", label: "Bot de WhatsApp o Telegram (próximamente)" },
    { value: "no-se", label: "No sé todavía" },
  ],
  timeline: [
    { value: "1-2-semanas", label: "1 a 2 semanas" },
    { value: "1-mes", label: "1 mes" },
    { value: "2-3-meses", label: "2 a 3 meses" },
    { value: "explorando", label: "Estoy explorando" },
  ],
  budget: [
    { value: "hasta-150", label: "Hasta USD 150" },
    { value: "150-450", label: "USD 150 a 450" },
    { value: "mas-450", label: "Más de USD 450" },
    { value: "a-definir", label: "Prefiero verlo en la reunión" },
  ],
} as const satisfies Record<string, readonly ContactOption[]>;

export type ContactOptionField = keyof typeof contactOptions;

export function getContactOptionLabel(field: ContactOptionField, value: string) {
  return contactOptions[field].find((option) => option.value === value)?.label;
}

export type ContactDetails = {
  name: string;
  business: string;
  contact: string;
  pack: string;
  timeline: string;
  budget: string;
  reference: string;
  need: string;
};

/** Builds the WhatsApp message from the form. Every field is optional; empty ones are skipped. */
export function formatContactMessage(details: ContactDetails) {
  const who = [details.name, details.business && `(${details.business})`]
    .filter(Boolean)
    .join(" ");
  const lines = [who ? `\u{1F44B} Hola Juani, soy ${who}.` : "\u{1F44B} Hola Juani, quiero trabajar con Mayofy..."];

  const pack = getContactOptionLabel("pack", details.pack);
  const timeline = getContactOptionLabel("timeline", details.timeline);
  const budget = getContactOptionLabel("budget", details.budget);
  if (pack) lines.push(`Me interesa: ${pack}.`);
  if (timeline) lines.push(`Plazo: ${timeline}.`);
  if (budget) lines.push(`Presupuesto: ${budget}.`);
  if (details.contact) lines.push(`Contacto: ${details.contact}`);
  if (details.reference) lines.push(`Referencia: ${details.reference}`);
  if (details.need) lines.push("", details.need);

  return lines.join("\n");
}
