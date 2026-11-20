/**
 * Island 2 (Juani, 20 November 2026: options A and B of
 * docs/plans/2026-11-20-propuestas.md, together). The visitor picks the
 * situation that sounds like theirs and gets the pack to start with (A),
 * beside a phone where the questions they answer by hand today land on
 * their own page (B). Pack names, prices and timelines come from
 * commercial-plans.ts; the copy here is the approved mockup copy.
 */
import { commercialPlans } from "@/content/commercial-plans";

export type CasePlanId = (typeof commercialPlans)[number]["id"];

export type CaseOption = {
  planId: CasePlanId;
  /** The visitor's situation, in their words. */
  text: string;
  /** Painted loose rock of the island 2 plate that marks the option. */
  rock: string;
};

export const casePicker = {
  prompt: "¿Qué te está pasando hoy? Elegí lo que más se parece y te mostramos por dónde empezar.",
  options: [
    { planId: "landing", text: "Me encuentran, pero no tengo dónde mostrar lo que hago.", rock: "33-isla2-roca-02" },
    { planId: "web-gestion", text: "Paso el día coordinando turnos por WhatsApp.", rock: "33-isla2-roca-05" },
    { planId: "sistema", text: "Mi operación vive en planillas y ya no alcanza.", rock: "33-isla2-roca-04" },
  ] satisfies readonly CaseOption[],
  resultEyebrow: "Te conviene empezar por",
  detailsCta: "Ver qué incluye",
  bookingCta: "Agendá tu diagnóstico",
  /**
   * The phone demo (decorative): an example business whose page answers the
   * questions before they are asked. Illustrative, not a client.
   */
  demo: {
    name: "Estudio Ámbar",
    trade: "Estética y bienestar",
    entries: [
      { question: "¿Cuánto sale?", title: "Precios", answer: "Limpieza facial desde $18.000" },
      { question: "¿Tenés turno el jueves?", title: "Turnos", answer: "Lunes a sábados, de 9 a 19" },
      { question: "¿Dónde quedan?", title: "Dónde estamos", answer: "Palermo, a 2 cuadras del subte" },
      { question: "¿Qué incluye el servicio?", title: "Qué incluye", answer: "Diagnóstico de piel y rutina para casa" },
    ],
    whatsapp: "Escribinos por WhatsApp",
  },
} as const;

/** The pack a case recommends, with its commercial substance. */
export function planFor(planId: CasePlanId) {
  const plan = commercialPlans.find((candidate) => candidate.id === planId);
  if (!plan) throw new Error(`Unknown plan: ${planId}`);
  return plan;
}
