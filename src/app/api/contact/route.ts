import {
  type ContactOptionField,
  getContactOptionLabel,
} from "@/content/contact-options";
import { getSiteUrl } from "@/lib/site-url";

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  contact?: unknown;
  pack?: unknown;
  timeline?: unknown;
  budget?: unknown;
  reference?: unknown;
  need?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

type ContactEndpoint = { url: URL; kind: "formsubmit" | "custom" };

const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Where the form lands when CONTACT_FORM_ENDPOINT is not set (Juani,
 * 22 November 2026: "Debe llegar a jpkitro@gmail.com por ahora"). It stays on
 * the server: the browser only ever talks to /api/contact.
 */
const DEFAULT_CONTACT_EMAIL = "jpkitro@gmail.com";

/**
 * FormSubmit has taken 25 to 60 s to answer; the form tells the visitor it is
 * still sending meanwhile. Past this the outcome is unknown, not failed.
 */
const DELIVERY_TIMEOUT_MS = 55_000;

const WHATSAPP_FALLBACK = "No pudimos enviar la consulta. Probá por WhatsApp.";

/**
 * CONTACT_FORM_ENDPOINT accepts either an HTTPS URL that receives the JSON
 * payload, or a plain email address; unset, it is DEFAULT_CONTACT_EMAIL. An
 * email address is delivered through FormSubmit (https://formsubmit.co),
 * which forwards the fields to that mailbox without an account; the first
 * submission triggers an activation email that Juani must confirm once, and
 * FormSubmit keeps what arrives before that for 30 days.
 */
function resolveEndpoint(value: string): ContactEndpoint {
  const trimmed = value.trim().replace(/^mailto:/i, "");
  // A URL first: "https://formsubmit.co/ajax/name@mail.com" also passes the
  // loose email pattern, and wrapping it again sent every consultation to a
  // FormSubmit address that does not exist.
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") throw new Error("Invalid protocol");
    return { url, kind: url.hostname === "formsubmit.co" ? "formsubmit" : "custom" };
  }
  if (!EMAIL_PATTERN.test(trimmed)) throw new Error("Not an email or a URL");
  return {
    url: new URL(`https://formsubmit.co/ajax/${encodeURIComponent(trimmed)}`),
    kind: "formsubmit",
  };
}

/**
 * The page the form was sent from. FormSubmit refuses a submission that does
 * not say which web page it came from ("Make sure you open this page through
 * a web server", https://formsubmit.co/help), and a request from this server
 * carries no browser Referer, so the route names the page itself.
 */
function contactPageUrl(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (origin) return new URL("/#contacto", origin).toString();
  } catch {
    // An unparseable Origin falls back to the configured site.
  }
  return new URL("/#contacto", getSiteUrl()).toString();
}

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readOption(field: ContactOptionField, value: unknown) {
  const text = readText(value, 40);
  return getContactOptionLabel(field, text) ? text : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { ok: false, message: "La consulta es demasiado extensa." },
      { status: 413 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, message: "No pudimos leer la consulta." },
      { status: 400 },
    );
  }

  const name = readText(payload.name, 80);
  const business = readText(payload.business, 120);
  const contact = readText(payload.contact, 160);
  const pack = readOption("pack", payload.pack);
  const timeline = readOption("timeline", payload.timeline);
  const budget = readOption("budget", payload.budget);
  const reference = readText(payload.reference, 300);
  const need = readText(payload.need, 1800);
  const company = readText(payload.company, 120);
  const startedAt =
    typeof payload.startedAt === "number" ? payload.startedAt : Date.now();

  if (company) {
    return Response.json({ ok: true });
  }

  if (Date.now() - startedAt < 2_500) {
    return Response.json(
      { ok: false, message: "Esperá un momento y volvé a intentar." },
      { status: 429 },
    );
  }

  // No field is mandatory, but an entirely empty form has nothing to deliver.
  if (!name && !business && !contact && !need && !reference) {
    return Response.json(
      { ok: false, message: "Contanos al menos cómo contactarte o qué necesitás." },
      { status: 400 },
    );
  }

  let endpoint: ContactEndpoint;

  try {
    endpoint = resolveEndpoint(
      process.env.CONTACT_FORM_ENDPOINT?.trim() || DEFAULT_CONTACT_EMAIL,
    );
  } catch {
    console.error("[contact] CONTACT_FORM_ENDPOINT is not an email or an HTTPS URL");
    return Response.json(
      { ok: false, message: "El formulario no está disponible. Escribinos por WhatsApp." },
      { status: 503 },
    );
  }

  const pageUrl = contactPageUrl(request);
  const fields = { name, business, contact, pack, timeline, budget, reference, need };

  try {
    const response = await fetch(endpoint.url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(endpoint.kind === "formsubmit"
          ? { Origin: new URL(pageUrl).origin, Referer: pageUrl }
          : {}),
        ...(process.env.CONTACT_FORM_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_FORM_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(
        endpoint.kind === "formsubmit"
          ? formSubmitBody(fields, pageUrl)
          : {
              ...fields,
              source: "mayofy-web",
              _subject: `Consulta de ${name} (${business}) desde mayofy.dev`,
              _template: "table",
            },
      ),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[contact] ${endpoint.url.hostname} answered HTTP ${response.status}`);
      return Response.json({ ok: false, message: WHATSAPP_FALLBACK }, { status: 502 });
    }

    // FormSubmit answers 200 even when it could not deliver (for example
    // while the mailbox is still unactivated); its JSON carries the verdict.
    const result = (await response.json().catch(() => null)) as
      | { success?: boolean | string; message?: string }
      | null;
    if (result && String(result.success) === "false") {
      console.error(`[contact] ${endpoint.url.hostname} did not deliver: ${result.message ?? "no message"}`);
      const pendingActivation = /activat/i.test(result.message ?? "");
      return Response.json(
        {
          ok: false,
          message: pendingActivation
            ? "El formulario todavía no está activado, así que tu consulta puede demorar en llegarnos. Escribinos por WhatsApp y lo vemos enseguida."
            : WHATSAPP_FALLBACK,
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error(
      `[contact] ${endpoint.url.hostname} ${timedOut ? `did not answer within ${DELIVERY_TIMEOUT_MS / 1000} s` : "could not be reached"}`,
    );
    return Response.json(
      {
        ok: false,
        message: timedOut
          ? "El envío tardó demasiado y no sabemos si llegó. Escribinos por WhatsApp para confirmarlo."
          : WHATSAPP_FALLBACK,
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}

/**
 * FormSubmit's email shows every key as a row label, so the fields go in
 * Spanish with the chosen options' labels (already validated by readOption),
 * and empty ones are left out.
 * Options: https://formsubmit.co (_subject, _replyto, _template, _captcha)
 * and https://formsubmit.co/help (_url).
 */
function formSubmitBody(
  fields: Record<"name" | "business" | "contact" | "pack" | "timeline" | "budget" | "reference" | "need", string>,
  pageUrl: string,
) {
  const rows: Record<string, string> = {
    Nombre: fields.name,
    Negocio: fields.business,
    "Responder a": fields.contact,
    "Qué necesita": getContactOptionLabel("pack", fields.pack) ?? "",
    Plazo: getContactOptionLabel("timeline", fields.timeline) ?? "",
    Presupuesto: getContactOptionLabel("budget", fields.budget) ?? "",
    Referencia: fields.reference,
    Mensaje: fields.need,
  };

  return {
    ...Object.fromEntries(Object.entries(rows).filter(([, value]) => value)),
    _subject: `Nueva consulta desde mayofy.dev${fields.name ? `: ${fields.name}` : ""}`,
    ...(EMAIL_PATTERN.test(fields.contact) ? { _replyto: fields.contact } : {}),
    _template: "table",
    _captcha: "false",
    _url: pageUrl,
  };
}
