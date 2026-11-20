/**
 * Island 2 (Juani, 20 November 2026: options A and B of
 * docs/plans/2026-11-20-propuestas.md, together). The visitor picks the
 * situation that sounds like theirs and gets the pack to start with (A),
 * beside a system proposal that assembles itself as the questions they
 * answer by hand today land on it (B; Juani, 20 November 2026: "que vayan
 * entrando esas preguntas y se vaya construyendo una propuesta de sistema").
 * Pack names, prices and timelines come from commercial-plans.ts.
 */
import { commercialPlans } from "@/content/commercial-plans";

export type CasePlanId = (typeof commercialPlans)[number]["id"];

export type CaseOption = {
  planId: CasePlanId;
  /** The visitor's situation, in their words. */
  text: string;
  /** Painted art that marks the option and grows out of its card. */
  art: CaseArt;
};

/**
 * Custom art for an option, painted for the picker (Juani, 2026-11-20: "una
 * flor, una plantita y una mariposa colorida"), a file in
 * public/images/mundo-mayo. `frames` > 1 is a horizontal strip of square
 * cells played back and forth (the butterfly's flutter). Until the
 * illustrator delivers 34-isla2-flor, 34-isla2-brote and the five-frame
 * 34-isla2-mariposa-tira, the slots show the plant crops already painted
 * (34-isla2-planta-*): swap `src` (and set `frames: 5` on the butterfly).
 */
export type CaseArt = { src: string; frames?: number };

export const casePicker = {
  prompt: "¿Qué te está pasando hoy? Elegí lo que más se parece y te mostramos por dónde empezar.",
  // Art in order: the flower (34-isla2-flor), the small plant (34-isla2-brote), the butterfly
  // (34-isla2-mariposa-tira, 5 frames). Placeholders until they arrive.
  options: [
    { planId: "landing", text: "Me encuentran, pero no tengo dónde mostrar lo que hago.", art: { src: "34-isla2-planta-01" } },
    { planId: "web-gestion", text: "Paso el día coordinando turnos por WhatsApp.", art: { src: "34-isla2-planta-02" } },
    { planId: "sistema", text: "Mi operación vive en planillas y ya no alcanza.", art: { src: "34-isla2-planta-03" } },
  ] satisfies readonly CaseOption[],
  resultEyebrow: "Te conviene empezar por",
  detailsCta: "Ver qué incluye",
  bookingCta: "Agendá tu diagnóstico",
  /**
   * The proposal that builds itself (decorative): the base system, then one
   * module per question as it lands, and a closing line.
   */
  proposal: {
    eyebrow: "Tu propuesta",
    base: { title: "Sistema de gestión", text: "Clientes, ventas y turnos en un solo panel." },
    modules: [
      { question: "¿Cuánto sale?", title: "Bot de WhatsApp", text: "Responde precios y consultas al instante." },
      { question: "¿Tenés turno el jueves?", title: "Turnos online", text: "Tus clientes reservan solos." },
      { question: "¿Te queda en stock?", title: "Control de stock", text: "Sabés qué hay y qué falta." },
      { question: "¿Y si se corta internet?", title: "Disponibilidad offline", text: "Sigue funcionando sin conexión." },
    ],
    closing: "Un solo sistema, armado a tu medida.",
  },
} as const;

/** The pack a case recommends, with its commercial substance. */
export function planFor(planId: CasePlanId) {
  const plan = commercialPlans.find((candidate) => candidate.id === planId);
  if (!plan) throw new Error(`Unknown plan: ${planId}`);
  return plan;
}
