import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import type { Business } from "../content/business-schema.js";
import { flagValue, resolveGeneratedDir } from "../generated-output.js";

type Args = {
  generatedDir: string;
  businessesPath: string;
  specsPath: string | null;
  briefsDir: string | null;
  outPath: string;
  jsonPath: string;
  price: string;
  baseUrl: string | null;
};

type SiteRecord = {
  slug: string;
  business_id: string;
  name: string;
  directory: string;
  service?: string;
  rating?: string;
  creative_concept?: string | null;
};

type Manifest = {
  sites: SiteRecord[];
};

type ContactMedium = "instagram" | "whatsapp" | "whatsapp_probable" | "phone" | "missing";
type ContactConfidence = "high" | "medium" | "low";

type ContactChoice = {
  medium: ContactMedium;
  label: string;
  value: string;
  confidence: ContactConfidence;
  reason: string;
};

type LeadScore = {
  priority: number;
  contact_probability: ContactConfidence;
  opportunity: ContactConfidence;
  reasons: string[];
  risks: string[];
};

type CommercialAudit = {
  problem_solved: string;
  public_signals_used: string[];
  owner_data_to_request: string[];
  suggested_improvements: string[];
  offer_angle: string;
};

type ObjectionReply = {
  objection: string;
  reply: string;
};

type OutreachPack = {
  whatsapp_short: string;
  formal_message: string;
  follow_up_24h: string;
  follow_up_48h: string;
  direct_close: string;
  objection_replies: ObjectionReply[];
};

type StudyEntry = {
  slug: string;
  business_name: string;
  landing_url: string;
  landing_path: string;
  service: string;
  rating: string;
  preferred_contact: ContactChoice;
  lead_score: LeadScore;
  commercial_audit: CommercialAudit;
  outreach: OutreachPack;
  proposal_message: string;
};

type ExecutiveSummary = {
  total_landings: number;
  suggested_price: string;
  top_3_to_contact_first: Array<Pick<StudyEntry, "slug" | "business_name"> & { priority: number; reason: string }>;
  strongest_contact_channels: Array<Pick<StudyEntry, "slug" | "business_name"> & { contact: string; confidence: ContactConfidence }>;
  best_commercial_opportunities: Array<Pick<StudyEntry, "slug" | "business_name"> & { opportunity: ContactConfidence; reason: string }>;
  needs_contact_validation: Array<Pick<StudyEntry, "slug" | "business_name"> & { contact: string; risk: string }>;
  contact_breakdown: Record<ContactMedium, number>;
};

type RawRecord = Record<string, unknown>;

function parseArgs(argv: string[]): Args {
  const businessesPath = flagValue(argv, "--businesses");
  if (!businessesPath) {
    throw new Error("Usage: tsx src/delivery/create-final-study.ts --businesses <businesses.json> [--session <run>]");
  }

  const generatedDir = resolveGeneratedDir(argv, { positionalIndex: 2, datasetPath: businessesPath, outFlag: null });
  const outPath = flagValue(argv, "--out", path.join(generatedDir, "final-study.md")) ?? path.join(generatedDir, "final-study.md");
  const jsonPath = flagValue(argv, "--json", outPath.replace(/\.md$/iu, ".json")) ?? outPath.replace(/\.md$/iu, ".json");

  return {
    generatedDir,
    businessesPath,
    specsPath: flagValue(argv, "--specs"),
    briefsDir: flagValue(argv, "--briefs"),
    outPath,
    jsonPath,
    price: flagValue(argv, "--price", "[PRECIO]") ?? "[PRECIO]",
    baseUrl: flagValue(argv, "--base-url"),
  };
}

async function existsFile(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

function stringifyUnknown(value: unknown): string {
  if (value == null) {
    return "";
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(stringifyUnknown).join("\n");
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(stringifyUnknown).join("\n");
  }
  return "";
}

function rawBySlug(records: unknown[]): Map<string, RawRecord> {
  const map = new Map<string, RawRecord>();
  for (const record of records) {
    if (record && typeof record === "object" && "slug" in record) {
      const raw = record as RawRecord;
      if (typeof raw.slug === "string") {
        map.set(raw.slug, raw);
      }
    }
  }
  return map;
}

function specsBySlug(records: unknown): Map<string, RawRecord> {
  const map = new Map<string, RawRecord>();
  if (!Array.isArray(records)) {
    return map;
  }
  for (const record of records) {
    if (record && typeof record === "object" && "slug" in record) {
      const raw = record as RawRecord;
      if (typeof raw.slug === "string") {
        map.set(raw.slug, raw);
      }
    }
  }
  return map;
}

async function readBrief(briefsDir: string | null, slug: string): Promise<string> {
  if (!briefsDir) {
    return "";
  }
  const filePath = path.join(briefsDir, `${slug}.md`);
  if (!(await existsFile(filePath))) {
    return "";
  }
  return readFile(filePath, "utf8");
}

async function readGeneratedHtml(generatedDir: string, site: SiteRecord): Promise<string> {
  const filePath = path.join(generatedDir, site.directory, "index.html");
  if (!(await existsFile(filePath))) {
    return "";
  }
  return readFile(filePath, "utf8");
}

function extractInstagram(source: string): string | null {
  const urlMatch = source.match(/https?:\/\/(?:www\.)?instagram\.com\/([a-z0-9._]+)/iu);
  if (urlMatch?.[1]) {
    return `https://instagram.com/${urlMatch[1].replace(/\/+$/u, "")}`;
  }

  const handleMatch = source.match(/instagram[^@\n\r]{0,80}@([a-z0-9._]+)/iu);
  if (handleMatch?.[1]) {
    return `@${handleMatch[1]}`;
  }

  return null;
}

function extractWhatsappUrl(source: string): string | null {
  const match = source.match(/https?:\/\/(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\/[^\s"'<>)]*/iu);
  return match?.[0] ?? null;
}

function hasWhatsappMention(source: string): boolean {
  return /\b(whatsapp|wsp|wa\.me)\b/iu.test(source);
}

function looksLikeMobilePhone(phone: string | null): boolean {
  if (!phone) {
    return false;
  }
  return /\b15[\s-]/u.test(phone) || /\+?54\s*9/u.test(phone);
}

function chooseContact(business: Business, source: string): ContactChoice {
  const instagram = extractInstagram(source);
  if (instagram) {
    return {
      medium: "instagram",
      label: "Instagram",
      value: instagram,
      confidence: "high",
      reason: "Aparece un perfil o link de Instagram en los datos/brief disponibles.",
    };
  }

  const whatsappUrl = extractWhatsappUrl(source);
  if (whatsappUrl) {
    return {
      medium: "whatsapp",
      label: "WhatsApp",
      value: whatsappUrl,
      confidence: "high",
      reason: "Aparece un link de WhatsApp en los datos/brief disponibles.",
    };
  }

  if (business.phone && hasWhatsappMention(source)) {
    return {
      medium: "whatsapp_probable",
      label: "WhatsApp probable",
      value: business.phone,
      confidence: "medium",
      reason: "El material disponible menciona WhatsApp, pero no hay link verificado; se usa el telefono publicado.",
    };
  }

  if (business.phone && looksLikeMobilePhone(business.phone)) {
    return {
      medium: "whatsapp_probable",
      label: "WhatsApp probable",
      value: business.phone,
      confidence: "medium",
      reason: "El numero publicado parece celular argentino, pero no hay link de WhatsApp verificado.",
    };
  }

  if (business.phone) {
    return {
      medium: "phone",
      label: "Telefono",
      value: business.phone,
      confidence: "high",
      reason: "No hay red social ni WhatsApp verificado; el telefono publicado es el contacto mas seguro.",
    };
  }

  return {
    medium: "missing",
    label: "Contacto faltante",
    value: "Sin telefono o red social verificada",
    confidence: "low",
    reason: "El negocio no tiene un canal directo verificado en el dataset actual.",
  };
}

function landingUrl(args: Args, site: SiteRecord): string {
  if (args.baseUrl) {
    return `${args.baseUrl.replace(/\/+$/u, "")}/${site.directory}/`;
  }
  return path.join(args.generatedDir, site.directory, "index.html").replaceAll("\\", "/");
}

function isVisualService(service: string): boolean {
  return /\b(detailing|lavadero|car wash|chapa|pintura|gomer[ií]a|auxilio)\b/iu.test(service);
}

function serviceFamily(service: string): "detailing" | "wash" | "tire" | "bodyshop" | "parts" | "mechanic" | "generic" {
  if (/\b(detailing|detalle)\b/iu.test(service)) {
    return "detailing";
  }
  if (/\b(lavadero|car wash|lavado)\b/iu.test(service)) {
    return "wash";
  }
  if (/\b(gomer[ií]a|auxilio|cubierta)\b/iu.test(service)) {
    return "tire";
  }
  if (/\b(chapa|pintura|carrocer[ií]a)\b/iu.test(service)) {
    return "bodyshop";
  }
  if (/\b(repuesto|pieza|mostrador)\b/iu.test(service)) {
    return "parts";
  }
  if (/\b(mec[aá]nic|taller|service|lubricentro)\b/iu.test(service)) {
    return "mechanic";
  }
  return "generic";
}

function clampScore(score: number): number {
  return Math.max(1, Math.min(10, Math.round(score)));
}

function contactProbability(contact: ContactChoice, business: Business): ContactConfidence {
  if (contact.medium === "missing") {
    return "low";
  }
  if ((contact.medium === "instagram" || contact.medium === "whatsapp") && contact.confidence === "high") {
    return "high";
  }
  if (contact.medium === "phone" && business.rating.reviews_count >= 50) {
    return "high";
  }
  return "medium";
}

function opportunityLevel(priority: number): ContactConfidence {
  if (priority >= 8) {
    return "high";
  }
  if (priority >= 5) {
    return "medium";
  }
  return "low";
}

function leadScore(business: Business, service: string, contact: ContactChoice): LeadScore {
  let score = 4;
  const reasons: string[] = [];
  const risks: string[] = [];

  if (!business.has_own_website) {
    score += 2;
    reasons.push("No tiene sitio propio registrado en los datos disponibles.");
  }

  if (business.rating.value >= 4.8) {
    score += 2;
    reasons.push(`Rating fuerte: ${business.rating.value.toFixed(1)} sobre 5.`);
  } else if (business.rating.value >= 4.5) {
    score += 1;
    reasons.push(`Buen rating publico: ${business.rating.value.toFixed(1)} sobre 5.`);
  }

  if (business.rating.reviews_count >= 100) {
    score += 2;
    reasons.push(`Volumen alto de reseñas: ${business.rating.reviews_count}.`);
  } else if (business.rating.reviews_count >= 30) {
    score += 1;
    reasons.push(`Volumen util de reseñas: ${business.rating.reviews_count}.`);
  } else {
    risks.push(`Pocas reseñas para sostener prueba social: ${business.rating.reviews_count}.`);
  }

  if (isVisualService(service)) {
    score += 1;
    reasons.push("Rubro visual: una landing con fotos y CTA puede mostrar valor rapido.");
  }

  if (contact.confidence === "high") {
    score += 1;
    reasons.push(`Contacto directo confiable: ${contact.label}.`);
  }

  if (contact.medium === "whatsapp_probable") {
    risks.push("WhatsApp no verificado; conviene validar canal antes de escribir como si fuera oficial.");
  }
  if (contact.medium === "phone") {
    risks.push("Sin Instagram ni WhatsApp verificado; el primer contacto puede sentirse mas frio.");
  }
  if (contact.medium === "missing") {
    risks.push("No hay canal directo verificado.");
  }

  const priority = clampScore(score);
  return {
    priority,
    contact_probability: contactProbability(contact, business),
    opportunity: opportunityLevel(priority),
    reasons,
    risks,
  };
}

function problemSolved(service: string): string {
  switch (serviceFamily(service)) {
    case "detailing":
      return "Convierte una consulta visual de cuidado del auto en una pagina con fotos, reseñas y CTA claro para coordinar.";
    case "wash":
      return "Reduce friccion para quien quiere lavar el auto: horario, ubicacion, reseñas y llamado quedan en un solo lugar.";
    case "tire":
      return "Ayuda a quien tiene un problema de cubierta o auxilio a encontrar telefono, direccion y proximo paso sin vueltas.";
    case "bodyshop":
      return "Transforma un daño visible del auto en una consulta ordenada con fotos, revision y contacto.";
    case "parts":
      return "Ordena la consulta por pieza: dato del auto, disponibilidad a confirmar y contacto de mostrador.";
    case "mechanic":
      return "Hace mas concreta la primera consulta: sintoma, horario, direccion, reseñas y forma de coordinar revision.";
    default:
      return "Reune señales publicas y contacto en una experiencia clara para pedir informacion o coordinar.";
  }
}

function publicSignals(business: Business): string[] {
  const signals = [
    `Rating ${business.rating.value.toFixed(1)} con ${business.rating.reviews_count} reseñas.`,
    `Direccion publicada: ${business.address}.`,
  ];

  if (business.phone) {
    signals.push(`Telefono publicado: ${business.phone}.`);
  }
  if (business.opening_hours.raw) {
    signals.push("Horario publicado disponible para orientar la consulta.");
  }
  const reviewSnippets = business.reviews
    .slice(0, 2)
    .map((review) => review.text.trim())
    .filter(Boolean)
    .map((text) => `Reseña usada como señal: "${text.slice(0, 120)}${text.length > 120 ? "..." : ""}"`);
  signals.push(...reviewSnippets);
  return signals;
}

function ownerDataToRequest(service: string, contact: ContactChoice): string[] {
  const family = serviceFamily(service);
  const items = [
    "WhatsApp confirmado y nombre de quien responde consultas.",
    "Logo o marca actual si existe.",
    "Fotos propias autorizadas para publicar.",
    "Lista real de servicios y limites de lo que no quieren prometer.",
    "Horario final, zona de atencion y direccion revisada.",
    "Dominio deseado o nombre corto para publicar.",
  ];

  if (contact.medium === "phone" || contact.medium === "whatsapp_probable") {
    items.unshift("Confirmar si el telefono publicado tambien recibe WhatsApp.");
  }

  if (family === "bodyshop" || family === "detailing" || family === "wash") {
    items.push("Fotos antes/despues o trabajos terminados para reemplazar imagenes genericas.");
  }
  if (family === "parts") {
    items.push("Rubros de repuestos principales, marcas que trabajan y politica de stock/precio.");
  }
  if (family === "mechanic" || family === "tire") {
    items.push("Tipos de trabajo que quieren captar y casos que prefieren derivar.");
  }

  return items;
}

function suggestedImprovements(service: string): string[] {
  const improvements = [
    "Boton de WhatsApp real con mensaje prearmado.",
    "Dominio propio o URL corta para compartir.",
    "SEO local basico: rubro, ciudad, direccion y datos estructurados.",
    "Medicion basica de consultas con Analytics o eventos de click.",
    "Galeria real con fotos del local, trabajos o productos.",
    "Revision final de copy con el dueño para confirmar servicios y tono.",
  ];

  if (serviceFamily(service) === "parts") {
    improvements.push("Formulario simple para pedir pieza por modelo, motor o foto.");
  }
  if (serviceFamily(service) === "bodyshop") {
    improvements.push("CTA para enviar foto del golpe antes de coordinar revision.");
  }
  if (serviceFamily(service) === "tire") {
    improvements.push("CTA de urgencia con ubicacion y medida de cubierta.");
  }

  return improvements;
}

function commercialAudit(business: Business, service: string, contact: ContactChoice): CommercialAudit {
  return {
    problem_solved: problemSolved(service),
    public_signals_used: publicSignals(business),
    owner_data_to_request: ownerDataToRequest(service, contact),
    suggested_improvements: suggestedImprovements(service),
    offer_angle: `La muestra ya ordena la informacion publica; la venta es dejarla lista para publicar con datos propios, canal confirmado y medicion de consultas por ${business.name}.`,
  };
}

type BaseEntry = Omit<StudyEntry, "proposal_message" | "outreach">;

function stripTrailingPeriod(value: string): string {
  return value.trim().replace(/[.。]+$/u, "");
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function sentenceFragment(value: string): string {
  const stripped = stripTrailingPeriod(value);
  return /^[A-Z]{2,}\b/u.test(stripped) ? stripped : lowerFirst(stripped);
}

function proposalMessage(entry: BaseEntry, price: string): string {
  const contactSentence =
    entry.preferred_contact.medium === "instagram"
      ? "Te lo paso por aca porque parece ser el canal mas directo que tienen publicado."
      : entry.preferred_contact.medium === "whatsapp" || entry.preferred_contact.medium === "whatsapp_probable"
        ? "Te lo mando por este medio porque es el canal mas practico para verlo rapido desde el telefono."
        : "Te escribo al contacto publicado porque no encontre un Instagram o WhatsApp verificado.";

  return `Hola, como va? Soy Juan. Prepare una muestra de landing para ${entry.business_name}: ${entry.landing_url}

La pense para que una persona vea rapido el rubro (${entry.service}), las resenas, direccion, horario y un llamado claro para consultar. No invente precios, servicios ni promociones: use la informacion publica disponible y deje la estructura lista para ajustar con fotos/textos propios del negocio.

${contactSentence}

Si les interesa, por ${price} puedo dejarla lista para publicar y mejorarla con dominio/hosting, boton de contacto, ajustes de copy, cambios de fotos, medicion basica de consultas y una revision final con ustedes. Queres que te mande el link para verla?`;
}

function outreachPack(entry: BaseEntry, price: string): OutreachPack {
  const coreValue = `prepare una muestra de landing para ${entry.business_name} con la informacion publica disponible: rubro, reseñas, direccion, horario y contacto`;
  const improvements = entry.commercial_audit.suggested_improvements.slice(0, 3).map(sentenceFragment).join(", ");

  return {
    whatsapp_short: `Hola, como va? Soy Juan. ${coreValue.charAt(0).toUpperCase() + coreValue.slice(1)}. No es una plantilla generica; esta pensada para que alguien consulte mas rapido. Si te sirve, por ${price} la dejo lista para publicar con ${improvements}. Te paso el link? ${entry.landing_url}`,
    formal_message: proposalMessage(entry, price),
    follow_up_24h: `Hola, te escribo de nuevo por la muestra de ${entry.business_name}. La idea no es venderte algo abstracto: ya hay una landing armada para revisar. Si queres, te mando el link y me decis si tiene sentido ajustarla con fotos y WhatsApp real.`,
    follow_up_48h: `Cierro por aca para no insistir. Si en algun momento quieren una pagina simple para convertir consultas de ${entry.service}, ya deje una base hecha y se puede publicar rapido por ${price}.`,
    direct_close: `Si te gusta la muestra, el siguiente paso es simple: me confirmas WhatsApp, fotos, servicios reales y dominio/nombre. Con eso la dejo lista para publicar por ${price}.`,
    objection_replies: [
      {
        objection: "Ya tengo Instagram",
        reply: "Perfecto. La landing no reemplaza Instagram: sirve para mandar a una persona interesada a un lugar con servicios, reseñas, ubicacion y boton de consulta sin que tenga que revisar publicaciones.",
      },
      {
        objection: "No necesito web",
        reply: "Puede ser. La idea no es una web grande, sino una pagina corta para convertir mejor a quien ya te busca o te pide informacion por mensaje.",
      },
      {
        objection: "Cuanto sale",
        reply: `La version lista para publicar queda en ${price}. Incluye ajustes de texto, fotos, boton de contacto, dominio/hosting basico si hace falta y revision final con ustedes.`,
      },
      {
        objection: "Lo veo despues",
        reply: "Dale. Te dejo el link para que lo veas cuando puedas; si te cierra, lo ajustamos con tus fotos y datos reales antes de publicarlo.",
      },
    ],
  };
}

function firstReason(entry: StudyEntry): string {
  return entry.lead_score.reasons.find((reason) => !reason.startsWith("No tiene sitio propio")) ?? entry.lead_score.reasons[0] ?? entry.commercial_audit.problem_solved;
}

function executiveSummary(entries: StudyEntry[], args: Args): ExecutiveSummary {
  const byPriority = [...entries].sort((a, b) => b.lead_score.priority - a.lead_score.priority);
  const strongestContact = entries
    .filter((entry) => entry.preferred_contact.medium !== "missing")
    .sort((a, b) => {
      const rank = { high: 3, medium: 2, low: 1 };
      return rank[b.preferred_contact.confidence] - rank[a.preferred_contact.confidence] || b.lead_score.priority - a.lead_score.priority;
    });
  const needsContactValidation = entries.filter(
    (entry) => entry.preferred_contact.medium === "whatsapp_probable" || entry.preferred_contact.confidence !== "high",
  );
  const contact_breakdown = entries.reduce<Record<ContactMedium, number>>(
    (acc, entry) => {
      acc[entry.preferred_contact.medium] += 1;
      return acc;
    },
    { instagram: 0, whatsapp: 0, whatsapp_probable: 0, phone: 0, missing: 0 },
  );

  return {
    total_landings: entries.length,
    suggested_price: args.price,
    top_3_to_contact_first: byPriority.slice(0, 3).map((entry) => ({
      slug: entry.slug,
      business_name: entry.business_name,
      priority: entry.lead_score.priority,
      reason: firstReason(entry),
    })),
    strongest_contact_channels: strongestContact.slice(0, 5).map((entry) => ({
      slug: entry.slug,
      business_name: entry.business_name,
      contact: `${entry.preferred_contact.label}: ${entry.preferred_contact.value}`,
      confidence: entry.preferred_contact.confidence,
    })),
    best_commercial_opportunities: byPriority.slice(0, 5).map((entry) => ({
      slug: entry.slug,
      business_name: entry.business_name,
      opportunity: entry.lead_score.opportunity,
      reason: firstReason(entry),
    })),
    needs_contact_validation: needsContactValidation.map((entry) => ({
      slug: entry.slug,
      business_name: entry.business_name,
      contact: `${entry.preferred_contact.label}: ${entry.preferred_contact.value}`,
      risk: entry.lead_score.risks[0] ?? entry.preferred_contact.reason,
    })),
    contact_breakdown,
  };
}

function mdList(items: string[]): string[] {
  return items.map((item) => `- ${item}`);
}

function renderOutreach(entry: StudyEntry): string[] {
  return [
    "#### Mensaje corto WhatsApp",
    "",
    "```text",
    entry.outreach.whatsapp_short,
    "```",
    "",
    "#### Mensaje formal Instagram/email",
    "",
    "```text",
    entry.outreach.formal_message,
    "```",
    "",
    "#### Follow-up 24 hs",
    "",
    "```text",
    entry.outreach.follow_up_24h,
    "```",
    "",
    "#### Follow-up 48 hs",
    "",
    "```text",
    entry.outreach.follow_up_48h,
    "```",
    "",
    "#### Cierre directo",
    "",
    "```text",
    entry.outreach.direct_close,
    "```",
    "",
    "#### Objeciones",
    "",
    ...entry.outreach.objection_replies.flatMap((reply) => [`- ${reply.objection}: ${reply.reply}`]),
  ];
}

function renderMarkdown(entries: StudyEntry[], args: Args, summary: ExecutiveSummary): string {
  const lines = [
    "# Estudio final de entrega",
    "",
    `- landings: \`${args.generatedDir}\``,
    `- precio oferta: \`${args.price}\``,
    `- base_url: ${args.baseUrl ? `\`${args.baseUrl}\`` : "`no configurada; se usan paths locales`"}`,
    "",
    "## Regla de contacto favorito",
    "",
    "1. Instagram verificado en datos/brief.",
    "2. Link de WhatsApp verificado.",
    "3. WhatsApp probable si el material lo menciona o el telefono parece celular.",
    "4. Telefono publicado como fallback seguro.",
    "",
    "## Resumen ejecutivo",
    "",
    `- total landings: ${summary.total_landings}`,
    `- precio sugerido: ${summary.suggested_price}`,
    `- contactos: Instagram ${summary.contact_breakdown.instagram}, WhatsApp ${summary.contact_breakdown.whatsapp}, WhatsApp probable ${summary.contact_breakdown.whatsapp_probable}, telefono ${summary.contact_breakdown.phone}, faltantes ${summary.contact_breakdown.missing}`,
    "",
    "### Top 3 para contactar primero",
    "",
    ...summary.top_3_to_contact_first.map((entry, index) => `${index + 1}. ${entry.business_name} (${entry.priority}/10): ${entry.reason}`),
    "",
    "### Contactos mas fuertes",
    "",
    ...summary.strongest_contact_channels.map((entry) => `- ${entry.business_name}: ${entry.contact} (${entry.confidence})`),
    "",
    "### Mejores oportunidades comerciales",
    "",
    ...summary.best_commercial_opportunities.map((entry) => `- ${entry.business_name}: ${entry.opportunity}. ${entry.reason}`),
    "",
    "### Requieren validar canal",
    "",
    ...(summary.needs_contact_validation.length > 0
      ? summary.needs_contact_validation.map((entry) => `- ${entry.business_name}: ${entry.contact}. ${entry.risk}`)
      : ["- Ninguno."]),
    "",
    "## Resumen",
    "",
    "| Negocio | Prioridad | Prob. contacto | Landing | Contacto favorito | Confianza | Razon |",
    "| --- | ---: | --- | --- | --- | --- | --- |",
    ...entries.map(
      (entry) =>
        `| ${entry.business_name} | ${entry.lead_score.priority}/10 | ${entry.lead_score.contact_probability} | [Abrir](${entry.landing_url}) | ${entry.preferred_contact.label}: ${entry.preferred_contact.value} | ${entry.preferred_contact.confidence} | ${entry.preferred_contact.reason} |`,
    ),
    "",
    "## Detalle por negocio",
    "",
  ];

  for (const entry of entries) {
    lines.push(`### ${entry.business_name}`, "");
    lines.push(`- landing: ${entry.landing_url}`);
    lines.push(`- contacto favorito: ${entry.preferred_contact.label} (${entry.preferred_contact.value})`);
    lines.push(`- prioridad: ${entry.lead_score.priority}/10`);
    lines.push(`- probabilidad de contacto: ${entry.lead_score.contact_probability}`);
    lines.push(`- oportunidad comercial: ${entry.lead_score.opportunity}`);
    lines.push("");
    lines.push("#### Por que vale la pena escribirle");
    lines.push("");
    lines.push(...mdList(entry.lead_score.reasons));
    lines.push("");
    lines.push("#### Riesgos");
    lines.push("");
    lines.push(...(entry.lead_score.risks.length > 0 ? mdList(entry.lead_score.risks) : ["- Sin riesgos fuertes detectados con los datos actuales."]));
    lines.push("");
    lines.push("#### Mini auditoria comercial");
    lines.push("");
    lines.push(`- problema que resuelve: ${entry.commercial_audit.problem_solved}`);
    lines.push(`- angulo de oferta: ${entry.commercial_audit.offer_angle}`);
    lines.push("");
    lines.push("Señales publicas usadas:");
    lines.push(...mdList(entry.commercial_audit.public_signals_used));
    lines.push("");
    lines.push("Datos a pedirle al dueño:");
    lines.push(...mdList(entry.commercial_audit.owner_data_to_request));
    lines.push("");
    lines.push("Mejoras vendibles:");
    lines.push(...mdList(entry.commercial_audit.suggested_improvements));
    lines.push("");
    lines.push("#### Mensaje base");
    lines.push("");
    lines.push("```text");
    lines.push(entry.proposal_message);
    lines.push("```");
    lines.push("");
    lines.push(...renderOutreach(entry));
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const businesses = approvedBusinesses(await loadBusinesses(args.businessesPath));
  const rawBusinesses = rawBySlug(await readJson<unknown[]>(args.businessesPath));
  const rawSpecs = args.specsPath && (await existsFile(args.specsPath)) ? specsBySlug(await readJson<unknown>(args.specsPath)) : new Map<string, RawRecord>();
  const manifest = await readJson<Manifest>(path.join(args.generatedDir, "manifest.json"));
  const businessById = new Map(businesses.map((business) => [business.id, business]));

  const entries: StudyEntry[] = [];

  for (const site of manifest.sites) {
    const business = businessById.get(site.business_id);
    if (!business) {
      throw new Error(`${site.slug}: manifest business_id is not present in approved businesses.`);
    }

    const rawBusiness = rawBusinesses.get(business.slug);
    const rawSpec = rawSpecs.get(business.slug);
    const brief = await readBrief(args.briefsDir, business.slug);
    const html = await readGeneratedHtml(args.generatedDir, site);
    const source = [stringifyUnknown(rawBusiness), stringifyUnknown(rawSpec), brief, html].join("\n");
    const landing_path = path.join(args.generatedDir, site.directory, "index.html").replaceAll("\\", "/");
    const service = site.service ?? business.main_product_or_service;
    const preferred_contact = chooseContact(business, source);
    const commercial_audit = commercialAudit(business, service, preferred_contact);
    const lead_score = leadScore(business, service, preferred_contact);

    const baseEntry = {
      slug: business.slug,
      business_name: business.name,
      landing_url: landingUrl(args, site),
      landing_path,
      service,
      rating: site.rating ?? `${business.rating.value.toFixed(1)} (${business.rating.reviews_count})`,
      preferred_contact,
      lead_score,
      commercial_audit,
    };

    entries.push({
      ...baseEntry,
      outreach: outreachPack(baseEntry, args.price),
      proposal_message: proposalMessage(baseEntry, args.price),
    });
  }

  const summary = executiveSummary(entries, args);

  await mkdir(path.dirname(args.outPath), { recursive: true });
  await mkdir(path.dirname(args.jsonPath), { recursive: true });
  await writeFile(args.outPath, renderMarkdown(entries, args, summary), "utf8");
  await writeFile(args.jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), executive_summary: summary, entries }, null, 2)}\n`, "utf8");

  console.log(`Final study written to ${args.outPath}`);
  console.log(`Final study JSON written to ${args.jsonPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
