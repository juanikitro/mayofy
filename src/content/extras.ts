import { chatBot } from "@/content/commercial-plans";
import type { WorkshopObject } from "@/content/workshop";

/**
 * Island 4's priced extras, one per row under the four painted objects
 * (Juani, 24 November 2026, docs/plans/2026-11-24-isla4-extras.md: "Me gusta
 * el botón sumar"). Prices are Mayofy's own work in USD. External services
 * are contracted in the client's name and billed by the provider, so an
 * extra names the provider and how it charges, never an amount.
 */

/**
 * - `fixed`: only Mayofy's work, nothing external.
 * - `fixed+service`: a fixed price, plus a service the client pays straight to its provider.
 * - `from`: depends on the scope; the final price is written in the proposal before starting.
 */
export type ExtraKind = "fixed" | "fixed+service" | "from";

export type Extra = {
  id: string;
  group: WorkshopObject;
  title: string;
  /** A short plain line with the limits ("Hasta 5 opciones"). */
  detail?: string;
  /** Mayofy's price in USD, per unit when there is a quantity. */
  price: number;
  /** Beside the price: "cada una", "por idioma". */
  unit?: string;
  kind: ExtraKind;
  /** Who bills the external service and how, in the client's name. */
  service?: string;
  /** A stepper instead of a single unit; `many` names n units in the request. */
  quantity?: { max: number; many: string; one: string };
  /** Extras sharing a choice exclude each other (the two bots). */
  choice?: string;
};

export const extraSeals: Record<ExtraKind, string> = {
  fixed: "Precio cerrado",
  "fixed+service": "Precio cerrado + servicio a tu nombre",
  from: "Desde",
};

/** The seal as a short tag on each row; the whole seal and its meaning open from it (Toggletip). */
export const extraSealTags: Record<ExtraKind, string> = {
  fixed: "Cerrado",
  "fixed+service": "+ Servicio",
  from: "Según alcance",
};

/** What each seal means, first line of the row's toggletip. */
export const extraSealNotes: Record<ExtraKind, string> = {
  fixed: "Precio cerrado: solo trabajo de Mayofy.",
  "fixed+service": "Precio cerrado + servicio a tu nombre: el precio de Mayofy es fijo y el servicio lo pagás directo al proveedor.",
  from: "Desde: depende del alcance. El precio final queda escrito en la propuesta, antes de empezar.",
};

export const extrasCopy = {
  /** The fixed line under the list (Juani's proposal, accepted 24 November 2026). */
  servicesNote: "Los servicios externos quedan a tu nombre y te los cobra cada proveedor. Mayofy no les suma nada.",
  fromNote: "Lo marcado «desde» depende del alcance: el precio final queda escrito en la propuesta, antes de empezar.",
  add: "Sumar",
  summaryTitle: "Tu consulta",
  packLegend: "¿Con qué pack?",
  packUnsure: "Todavía no sé",
  empty: "Tocá Sumar en lo que te sirva y armamos el mensaje para WhatsApp.",
  workLabel: "Trabajo de Mayofy",
  servicesLabel: "A tu nombre, aparte",
  cta: "Enviar la consulta por WhatsApp",
  clear: "Vaciar",
  open: "Ver tu consulta",
  close: "Cerrar",
  customPrompt: "¿Necesitás todo esto junto?",
} as const;

const mercadoPago = "Mercado Pago cobra una comisión por cada cobro.";
const meta = chatBot.service;

export const extras: readonly Extra[] = [
  // Maceta: que te encuentren más.
  {
    id: "pagina-extra",
    group: "pot",
    title: "Página extra por servicio o zona",
    price: 20,
    unit: "cada una",
    kind: "fixed",
    quantity: { max: 10, one: "página extra por servicio o zona", many: "páginas extra por servicio o zona" },
  },
  { id: "pagina-promocion", group: "pot", title: "Página para una promoción", price: 60, kind: "fixed" },
  {
    id: "otro-idioma",
    group: "pot",
    title: "Tu página en otro idioma",
    detail: "Vos revisás la traducción antes de publicarla.",
    price: 35,
    unit: "por idioma",
    kind: "from",
    quantity: { max: 5, one: "idioma más para la página", many: "idiomas más para la página" },
  },
  {
    id: "google-maps",
    group: "pot",
    title: "Aparecer en Google Maps",
    detail: "Tu perfil de empresa, completo. Google no cobra.",
    price: 35,
    kind: "fixed",
  },
  {
    id: "medir-anuncios",
    group: "pot",
    title: "Medir qué anuncios te traen clientes",
    detail: "En Meta y Google, hasta 3 acciones: un mensaje, una reserva o una compra.",
    price: 45,
    kind: "fixed+service",
    service: "Lo que inviertas en anuncios lo pagás a Meta o Google.",
  },
  // Caja de herramientas: que te escriban más fácil.
  {
    id: "formulario",
    group: "toolbox",
    title: "Formulario a medida",
    detail: "Pide solo lo necesario y te avisa por mail.",
    price: 25,
    kind: "fixed",
  },
  {
    id: "presupuesto",
    group: "toolbox",
    title: "Presupuesto que se calcula solo",
    detail: "Hasta 5 opciones para elegir.",
    price: 60,
    kind: "fixed",
  },
  {
    id: "cobro-senas",
    group: "toolbox",
    title: "Cobro de señas con link de pago",
    price: 50,
    kind: "fixed+service",
    service: mercadoPago,
  },
  {
    id: "cobro-integrado",
    group: "toolbox",
    title: "Cobro en tu página, con confirmación automática",
    price: 90,
    kind: "fixed+service",
    service: mercadoPago,
  },
  { id: "catalogo", group: "toolbox", title: "Catálogo de hasta 30 productos o servicios", price: 60, kind: "fixed" },
  // Engranaje: que no se te escape ninguna consulta.
  {
    id: "planilla",
    group: "gear",
    title: "Cada consulta guardada en una planilla",
    price: 20,
    kind: "fixed+service",
    service: "Google Sheets es gratis con tu cuenta de Google.",
  },
  { id: "aviso-mail", group: "gear", title: "Aviso por mail cuando entra algo", price: 15, kind: "fixed" },
  { id: "respuesta-mail", group: "gear", title: "Respuesta automática por mail", price: 15, kind: "fixed" },
  {
    id: "seguimiento",
    group: "gear",
    title: "Seguimiento de consultas en una planilla",
    detail: "En qué quedó cada una.",
    price: 35,
    kind: "fixed",
  },
  {
    id: "panel-consultas",
    group: "gear",
    title: "Panel web de consultas",
    detail: "Para verlas y ordenarlas desde el celular o la compu.",
    price: 90,
    kind: "from",
  },
  ...chatBot.tiers.map(
    (tier): Extra => ({
      id: tier.id,
      group: "gear",
      title: tier.name,
      detail: `${tier.short} ${chatBot.monthlyShort}`,
      price: tier.usd,
      kind: "fixed+service",
      service: meta,
      choice: "bot",
    }),
  ),
  // Invernadero: conectarlo con lo que ya usás.
  {
    id: "conectar",
    group: "greenhouse",
    title: "Conectar con pagos o planillas que ya usás",
    price: 40,
    kind: "from",
  },
  {
    id: "facturacion-arca",
    group: "greenhouse",
    title: "Facturación electrónica con ARCA",
    detail: "Emitir tus facturas desde tu página o tu sistema.",
    price: 150,
    kind: "from",
    service: "Si hace falta un servicio de facturación, queda a tu nombre y te lo cobra ese proveedor.",
  },
];
