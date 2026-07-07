import type { Business } from "../content/business-schema.js";
import { summarizeOpeningHours } from "../content/hours.js";
import { buildBusinessProfile } from "../content/local-copy.js";
import type { CommercialSpec, Composition, CreativeSpec, SiteSpec, VisualMood } from "./schema.js";

const moods: VisualMood[] = [
  "roadside-urgent",
  "workshop-trust",
  "precision-service",
  "neighborhood-direct",
  "fleet-utility",
];

const compositions: Composition[] = [
  "split-command",
  "poster-bay",
  "route-card",
  "service-ledger",
  "photo-board",
];

function hasAny(value: string, terms: string[]): boolean {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function chooseMood(business: Business, index: number): VisualMood {
  const text = `${business.name} ${business.category} ${business.main_product_or_service} ${business.opening_hours.raw ?? ""}`;
  if (hasAny(text, ["wrapping", "wrap", "ploteo", "vinilo", "polarizado", "ppf"])) return "precision-service";
  if (hasAny(text, ["lubricentro", "lubricante", "aceite"])) return "precision-service";
  if (hasAny(text, ["lavadero", "lavado", "detailing", "estetica", "estética"])) return "neighborhood-direct";
  if (hasAny(text, ["repuesto", "repuestos", "accesorio", "autopart"])) return "fleet-utility";
  if (hasAny(text, ["chapa", "pintura", "pulido"])) return "precision-service";
  if (hasAny(text, ["24", "auxilio"])) return "roadside-urgent";
  if (hasAny(text, ["mecanica", "mecánica", "multimarca", "taller"])) return "workshop-trust";
  return moods[index % moods.length];
}

function reviewSignal(business: Business): string {
  const best = business.reviews.find((review) => review.text.length > 18);
  return best ? `Reseñas que destacan: "${best.text.slice(0, 92)}${best.text.length > 92 ? "..." : ""}"` : "Reseñas disponibles para comparar experiencias reales.";
}

function imageSubject(rubro: string): string {
  const normalized = rubro
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("customizacion") || normalized.includes("wrapping") || normalized.includes("proteccion")) {
    return "estudio urbano de wrapping, polarizado o proteccion vehicular, auto con terminacion brillante, herramientas limpias";
  }
  if (normalized.includes("lavadero") || normalized.includes("estetica")) {
    return "lavadero o estudio de detailing en Tandil, auto limpio, agua, espuma y terminaciones cuidadas";
  }
  if (normalized.includes("lubricentro")) {
    return "lubricentro en Tandil, area de mantenimiento, bidones de aceite, filtros y herramientas ordenadas";
  }
  if (normalized.includes("chapa")) {
    return "taller de chapa y pintura en Tandil, carroceria en reparacion, herramientas y luz de trabajo";
  }
  if (normalized.includes("repuesto")) {
    return "local de repuestos para autos en Tandil, mostrador, estanterias y accesorios automotores";
  }
  if (normalized.includes("gomeria")) {
    return "gomeria en Tandil, fachada de local barrial, herramientas y cubiertas";
  }
  return `${normalized} en Tandil, fachada de local barrial y herramientas de trabajo`;
}

function commercialFromProfile(profile: ReturnType<typeof buildBusinessProfile>): CommercialSpec {
  return {
    tone: profile.tone,
    customer_type: profile.customerType,
    hero_claim: profile.heroClaim,
    trust_bar: profile.trustBar,
    service_cards: profile.serviceCards,
    why_choose: profile.whyChoose,
    packages: profile.packages,
    gallery: profile.gallery,
    process: profile.process,
    final_cta: profile.finalCta,
    editable_note:
      "Los items marcados como demo son placeholders comerciales editables: reemplazar por datos reales antes de publicar o dejarlos explicitamente como a confirmar.",
  };
}

function creativeLayoutFor(profile: ReturnType<typeof buildBusinessProfile>): CreativeSpec["layout"] {
  switch (profile.tone) {
    case "premium-detailing":
      return "studio-detail";
    case "urban-custom":
      return "studio-detail";
    case "fast-local":
      return "roadside-rescue";
    case "parts-counter":
      return "parts-counter";
    case "bodyshop-craft":
      return "bodyshop-craft";
    case "practical-workshop":
      return profile.rubro === "Lubricentro" ? "oil-bay" : "mechanic-ledger";
  }
}

function creativeTextureFor(profile: ReturnType<typeof buildBusinessProfile>): CreativeSpec["texture"] {
  switch (profile.tone) {
    case "premium-detailing":
      return "polished-glass";
    case "urban-custom":
      return "road-markings";
    case "fast-local":
      return "road-markings";
    case "parts-counter":
      return "parts-shelf";
    case "bodyshop-craft":
      return "primer-dust";
    case "practical-workshop":
      return profile.rubro === "Lubricentro" ? "oil-label" : "service-ledger";
  }
}

function creativeFromProfile(profile: ReturnType<typeof buildBusinessProfile>, business: Business, hours: string): CreativeSpec {
  return {
    concept: `${profile.heroClaim} Direccion comercial para ${profile.customerType}`,
    audience: profile.customerType,
    visual_direction:
      profile.tone === "urban-custom"
        ? "Alto contraste, composicion urbana, tarjetas duras, fotos con recortes agresivos y CTA de proyecto."
        : profile.tone === "premium-detailing"
          ? "Automotor premium, textura brillante, espacios amplios, antes/despues y servicios empaquetados."
          : "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    layout: creativeLayoutFor(profile),
    texture: creativeTextureFor(profile),
    hero_angle: profile.heroClaim,
    hero_cards: profile.trustBar.slice(0, 4).map((item) => ({
      label: item.label ?? "Dato",
      value: item.title,
      note: item.meta ?? item.body,
    })),
    sections: [
      {
        type: "service-board",
        eyebrow: "Servicios",
        title: profile.resourceTitle,
        body: profile.body,
        items: profile.serviceCards.slice(0, 4).map((item) => ({
          label: item.label ?? "Servicio",
          value: item.title,
          note: item.body,
        })),
      },
      {
        type: "process",
        eyebrow: "Proceso",
        title: "De consulta a turno sin perder contexto",
        body: "El usuario entiende que informacion enviar, que se confirma y como avanzar.",
        items: profile.process.slice(0, 4).map((item) => ({
          label: item.step,
          value: item.title,
          note: item.body,
        })),
      },
      {
        type: "metric-grid",
        eyebrow: "Confianza",
        title: "Datos reales arriba, placeholders editables separados",
        body: "La pagina combina fuentes verificadas con bloques demo marcados para completar.",
        items: profile.trustBar.slice(0, 4).map((item) => ({
          label: item.label ?? "Dato",
          value: item.title,
          note: item.body,
        })),
      },
      {
        type: "quick-actions",
        eyebrow: "Accion",
        title: profile.finalCta.title,
        body: profile.finalCta.body,
        items: [
          { label: "CTA", value: profile.finalCta.primary_label, note: business.phone ? business.phone : "Telefono editable" },
          { label: "Ubicacion", value: business.address },
          { label: "Horario", value: hours },
        ],
      },
    ],
  };
}

export function composeLocalSiteSpec(business: Business, index: number): SiteSpec {
  const profile = buildBusinessProfile(business);
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  const mood = chooseMood(business, index);
  const composition = compositions[index % compositions.length];
  const service = profile.rubro.toLowerCase();
  const addressShort = business.address.split(",").slice(0, 2).join(",").trim();

  return {
    business_id: business.id,
    slug: business.slug,
    visual_mood: mood,
    composition,
    headline: business.name,
    subheadline: `${profile.heroClaim} ${profile.rubro} en Tandil con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.`,
    primary_cta: profile.cta,
    secondary_cta: "Ver ubicacion",
    service_tags: profile.services.slice(0, 5),
    proof_points: [
      `${business.rating.value.toFixed(1)} sobre 5 con ${business.rating.reviews_count} reseñas`,
      `Horario: ${hours}`,
      `Direccion: ${addressShort}`,
      reviewSignal(business),
    ].slice(0, 4),
    resource_title: profile.resourceTitle,
    resource_items: profile.resourceItems,
    review_heading: `Lo que valoran quienes ya fueron`,
    contact_heading: `Llegar o llamar sin vueltas`,
    image_prompt: `Escena editorial realista para ${imageSubject(profile.rubro)}, luz natural, sin texto, sin logos inventados.`,
    design_notes: `Mood ${mood}, composicion ${composition}, tono comercial ${profile.tone}. Evitar estetica SaaS generica; usar recursos visuales del rubro ${service}, direccion, prueba social, paquetes editables y CTA de turno.`,
    commercial: commercialFromProfile(profile),
    creative: creativeFromProfile(profile, business, hours),
  };
}
