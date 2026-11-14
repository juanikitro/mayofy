export type ContactOption = {
  value: string;
  label: string;
};

export const contactOptions = {
  pack: [
    { value: "landing", label: "Landing" },
    { value: "web-gestion", label: "Web + Gestión (turnos, reservas, clientes)" },
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
  domain: [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" },
    { value: "no-se", label: "No sé" },
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
  domain: string;
  reference: string;
  need: string;
};

export function formatContactMessage(details: ContactDetails) {
  const lines = [
    `Hola Juani, soy ${details.name} (${details.business}).`,
    `Me interesa: ${getContactOptionLabel("pack", details.pack) ?? "No sé todavía"}.`,
    `Plazo: ${getContactOptionLabel("timeline", details.timeline) ?? "Sin definir"}.`,
    `Presupuesto: ${getContactOptionLabel("budget", details.budget) ?? "Sin definir"}.`,
    `¿Tengo dominio?: ${getContactOptionLabel("domain", details.domain) ?? "No sé"}.`,
  ];

  if (details.reference) lines.push(`Referencia: ${details.reference}`);
  lines.push("", details.need);

  return lines.join("\n");
}
