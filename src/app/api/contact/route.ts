type ContactPayload = {
  name?: unknown;
  business?: unknown;
  contact?: unknown;
  need?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

const MAX_BODY_BYTES = 12_000;

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  if (
    name.length < 2 ||
    business.length < 2 ||
    contact.length < 5 ||
    need.length < 20
  ) {
    return Response.json(
      { ok: false, message: "Revisá los campos antes de enviar." },
      { status: 400 },
    );
  }

  const endpointValue = process.env.CONTACT_FORM_ENDPOINT;

  if (!endpointValue) {
    return Response.json(
      {
        ok: false,
        message: "El formulario todavía no está configurado. Escribinos por WhatsApp.",
      },
      { status: 503 },
    );
  }

  let endpoint: URL;

  try {
    endpoint = new URL(endpointValue);
    if (endpoint.protocol !== "https:") throw new Error("Invalid protocol");
  } catch {
    return Response.json(
      { ok: false, message: "El formulario no está disponible." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_FORM_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_FORM_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ name, business, contact, need, source: "mayofy-web" }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error("Contact endpoint rejected request");

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        ok: false,
        message: "No pudimos enviar la consulta. Probá por WhatsApp.",
      },
      { status: 502 },
    );
  }
}
