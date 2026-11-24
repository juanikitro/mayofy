/*
 * The funnel events sent to Google Analytics 4, and the one way to send them.
 *
 * Every event is named and typed here, so a report never meets a misspelled
 * name. Parameters carry only what the page itself says (section ids, pack
 * ids, button text, link domains): never anything a visitor typed.
 *
 * GA loads after the page (google-analytics.tsx); until then events wait in a
 * short queue and are sent in order once it is ready. `track` never throws,
 * so a click or a navigation never depends on analytics.
 */

/** Where on the site something was tapped: an island id, "nav", "float", "footer", "agenda", "case_study"... */
type Placement = { placement: string };

export type AnalyticsEvents = {
  /** A call to action inside the site: book a call, see the packs, see one pack. */
  cta_click: Placement & { cta: "agenda" | "packs" | "pack"; pack?: string; link_text?: string };
  /** "Ver todo lo que incluye" on a pack card. */
  pack_details_open: { pack: string };
  /** Any WhatsApp link or button, with where it was. */
  whatsapp_click: Placement & { pack?: string; link_text?: string };
  /**
   * "Enviar la consulta por WhatsApp" in island 4's extras builder: the pack
   * ("unsure" for "Todavía no sé", "none" when not picked), how many extras
   * and Mayofy's estimate in USD (`from` when it is a "desde" total).
   */
  extras_request: { pack: string; extras: number; total_usd: number; from: boolean };
  /** The contact form was sent, by WhatsApp or by mail ("callback"). */
  contact_form_submit: { channel: "whatsapp" | "callback" };
  contact_form_success: { channel: "whatsapp" | "callback" };
  contact_form_error: { reason: "timeout" | "network" | "rejected" };
  /** The phone button that opens Cal.com's popup. */
  booking_open: Placement;
  /** Cal.com's agenda finished loading and is on screen. */
  booking_view: { mode: "inline" | "popup" };
  /**
   * The first day or time picked in Cal.com's agenda (once per page view).
   * Cal.com has no public event for either; this is its internal route change.
   */
  booking_started: { mode: "inline" | "popup" };
  /** A call was booked. */
  booking_complete: { mode: "inline" | "popup" };
  /** The direct cal.com link (fallback or failure panel). */
  booking_link_click: Placement;
  /** A case study page was opened. */
  case_study_view: { project: string };
  /** A link to another site: a client's site, a social profile. */
  outbound_click: Placement & { link_domain: string; link_type: "client_site" | "social" | "email"; link_text?: string };
  /** The reader reached an island (once per island per visit to the page). */
  section_reached: { section: string; island: number };
  /** A jump from the top navigation. */
  nav_click: { section: string; item: "brand" | "link" | "sheet" | "cta" };
  /** The phone navigation's section list was opened. */
  nav_menu_open: { section: string };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

type Gtag = (...args: unknown[]) => void;

/** Events kept while GA loads; past this the oldest are dropped. */
const queueLimit = 40;

let gtag: Gtag | null = null;
const queue: Array<[AnalyticsEventName, object]> = [];

/*
 * The single consent check. Allowed by default; a consent gate replaces it
 * with `setAnalyticsConsent` and every later `track` call follows it.
 */
let consentCheck: () => boolean = () => true;

export function setAnalyticsConsent(check: () => boolean) {
  consentCheck = check;
  if (!allowed()) queue.length = 0;
}

function allowed() {
  try {
    return consentCheck();
  } catch {
    return false;
  }
}

function send(fn: Gtag, name: AnalyticsEventName, params: object) {
  try {
    fn("event", name, params);
  } catch {
    // Analytics never breaks the page.
  }
}

/** Sends one funnel event now, or once GA is ready. */
export function track<Name extends AnalyticsEventName>(name: Name, params: AnalyticsEvents[Name]) {
  if (typeof window === "undefined" || !allowed()) return;
  if (gtag) {
    send(gtag, name, params);
    return;
  }
  if (queue.length >= queueLimit) queue.shift();
  queue.push([name, params]);
}

/** Called by the GA loader right after `config`: sends what waited. */
export function markAnalyticsReady(fn: Gtag) {
  gtag = fn;
  const waiting = queue.splice(0);
  if (!allowed()) return;
  for (const [name, params] of waiting) send(fn, name, params);
}
