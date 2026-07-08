import type { Business } from "../content/business-schema.js";
import { summarizeOpeningHours } from "../content/hours.js";
import { businessCityLabel } from "../content/location.js";
import { buildBusinessProfile } from "../content/local-copy.js";
import type { CommercialSpec, Composition, ConversionTemplate, CreativeSpec, DesignBrief, SiteSpec, VisualMood } from "./schema.js";

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

function publicText(value: string): string {
  return value
    .replace(/\b[Ee]l frontend debe dejar visible que falta cargar telefono o WhatsApp antes de publicar\./gu, "El canal directo queda marcado como dato a confirmar antes de publicar.")
    .replace(/\b[Pp]laceholders?\b/gu, "datos a completar")
    .replace(/\b[Pp]laceholder\b/gu, "dato a completar")
    .replace(/\b[Dd]emo editable\b/gu, "A confirmar")
    .replace(/\b[Dd]emo\b/gu, "Orientativo")
    .replace(/\beditable\b/giu, "a confirmar")
    .replace(/\blanding\b/giu, "sitio")
    .replace(/\bfrontend\b/giu, "sitio")
    .replace(/\b[Ll]a pagina\b/gu, "El sitio")
    .replace(/\bsin inventar\b/giu, "con datos confirmados")
    .replace(/\bno se inventan\b/giu, "se confirman")
    .replace(/\bno inventar\b/giu, "confirmar antes de publicar")
    .replace(/\[([^\]]+)\]/gu, "$1")
    .replace(/\s+/gu, " ")
    .trim();
}

function publicCard<T extends { title: string; body: string; label?: string; meta?: string }>(card: T): T {
  return {
    ...card,
    label: card.label ? publicText(card.label) : card.label,
    title: publicText(card.title),
    body: publicText(card.body),
    meta: card.meta ? publicText(card.meta) : card.meta,
  };
}

function publicPackage(item: CommercialSpec["packages"][number]): CommercialSpec["packages"][number] {
  return {
    ...item,
    name: publicText(item.name),
    price_label: publicText(item.price_label),
    body: publicText(item.body),
    items: item.items.map(publicText),
  };
}

function publicProcess(item: CommercialSpec["process"][number]): CommercialSpec["process"][number] {
  return {
    step: publicText(item.step),
    title: publicText(item.title),
    body: publicText(item.body),
  };
}

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

function imageSubject(rubro: string, city: string): string {
  const normalized = rubro
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("customizacion") || normalized.includes("wrapping") || normalized.includes("proteccion")) {
    return "estudio urbano de wrapping, polarizado o proteccion vehicular, auto con terminacion brillante, herramientas limpias";
  }
  if (normalized.includes("lavadero") || normalized.includes("estetica")) {
    return `lavadero o estudio de detailing en ${city}, auto limpio, agua, espuma y terminaciones cuidadas`;
  }
  if (normalized.includes("lubricentro")) {
    return `lubricentro en ${city}, area de mantenimiento, bidones de aceite, filtros y herramientas ordenadas`;
  }
  if (normalized.includes("chapa")) {
    return `taller de chapa y pintura en ${city}, carroceria en reparacion, herramientas y luz de trabajo`;
  }
  if (normalized.includes("repuesto")) {
    return `local de repuestos para autos en ${city}, mostrador, estanterias y accesorios automotores`;
  }
  if (normalized.includes("gomeria")) {
    return `gomeria en ${city}, fachada de local barrial, herramientas y cubiertas`;
  }
  return `${normalized} en ${city}, fachada de local barrial y herramientas de trabajo`;
}

function commercialFromProfile(profile: ReturnType<typeof buildBusinessProfile>): CommercialSpec {
  return {
    tone: profile.tone,
    customer_type: publicText(profile.customerType),
    hero_claim: publicText(profile.heroClaim),
    trust_bar: profile.trustBar.map(publicCard),
    service_cards: profile.serviceCards.map(publicCard),
    why_choose: profile.whyChoose.map(publicCard),
    packages: profile.packages.map(publicPackage),
    gallery: profile.gallery.map(publicCard),
    process: profile.process.map(publicProcess),
    final_cta: {
      title: publicText(profile.finalCta.title),
      body: publicText(profile.finalCta.body),
      primary_label: publicText(profile.finalCta.primary_label),
      secondary_label: publicText(profile.finalCta.secondary_label),
    },
    editable_note:
      "Las opciones marcadas como a confirmar ordenan la consulta sin publicar precios, stock o alcances no verificados.",
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

function conversionTemplateFor(profile: ReturnType<typeof buildBusinessProfile>): ConversionTemplate {
  switch (profile.tone) {
    case "premium-detailing":
    case "urban-custom":
      return "hero-proof-offer";
    case "fast-local":
      return "urgent-call-first";
    case "parts-counter":
      return "catalog-counter";
    case "bodyshop-craft":
      return "service-diagnostic";
    case "practical-workshop":
      return profile.rubro === "Lubricentro" ? "service-diagnostic" : "editorial-local-story";
  }
}

function visualThesisFor(profile: ReturnType<typeof buildBusinessProfile>, business: Business): string {
  switch (conversionTemplateFor(profile)) {
    case "hero-proof-offer":
      return "Hero fotografico con prueba social arriba del pliegue, oferta en paquetes y galeria preparada para antes/despues.";
    case "editorial-local-story":
      return `Pagina editorial de comercio local: nombre, oficio, direccion y criterios de decision se leen como una marca real, no como una grilla generica.`;
    case "visual-menu":
      return "Composicion de menu visual: productos o servicios agrupados como decisiones concretas, con foto protagonista y etiquetas cortas.";
    case "service-diagnostic":
      return "Flujo diagnostico: el visitante entiende que datos mandar, que se confirma y cuando conviene llamar o acercarse.";
    case "catalog-counter":
      return "Mostrador de consulta: foco en compatibilidad, disponibilidad a confirmar y datos que evitan ida y vuelta.";
    case "urgent-call-first":
      return "CTA de urgencia primero: telefono, zona, horario y pasos minimos dominan la pantalla antes que cualquier bloque comercial.";
  }
}

function designBriefFromProfile(profile: ReturnType<typeof buildBusinessProfile>, business: Business, hours: string): DesignBrief {
  const template = conversionTemplateFor(profile);
  const hasWeakPhotos = business.photos.length < 2 || business.photos.every((photo) => photo.usage_status !== "allowed");
  const hasThinReviews = business.reviews.length < 2 || business.rating.reviews_count < 15;

  return {
    market_position: `${business.name} debe vender una consulta concreta de ${profile.rubro.toLowerCase()} para personas que ya estan cerca de decidir, no una presentacion institucional.`,
    visual_thesis: visualThesisFor(profile, business),
    copy_voice:
      "Español argentino claro, comercial y local. Frases cortas, verbos de accion y beneficios visibles. Hablarle a alguien que esta por llamar, pedir presupuesto o acercarse.",
    layout_signature:
      template === "catalog-counter"
        ? "Hero con mostrador/foto grande, fichas de consulta por pieza y bloque de datos para llamar con modelo, medida o codigo."
        : template === "service-diagnostic"
          ? "Hero con problema/resultado, seccion de diagnostico por pasos y paquetes orientativos sin precios falsos."
          : template === "urgent-call-first"
            ? "Telefono y zona como primer objeto visual, seguido por pasos de emergencia y prueba social corta."
            : "Foto principal dominante, barra de confianza compacta, oferta en tarjetas y cierre de contacto con CTA repetido.",
    asset_plan: hasWeakPhotos
      ? "Usar la mejor foto real disponible como ancla y completar con imagenes genericas del rubro generadas por IA: detalle de herramientas, mostrador, textura, producto o proceso, sin logos ni datos falsos."
      : "Usar fotos reales como protagonistas. La IA puede completar fondos, texturas, iconos, escenas de detalle y placeholders visuales del proceso sin reemplazar datos del negocio.",
    ai_fill_plan: {
      copy: [
        "Convertir datos pobres en microcopy de decision: que mandar, que preguntar, que se confirma.",
        "Crear nombres de secciones, etiquetas y CTAs naturales sin mencionar IA, template ni demo.",
        "Escribir paquetes orientativos como caminos de consulta, no como precios ni servicios inventados.",
        "Reformular reseñas publicas como señales de confianza sin inventar testimonios.",
      ],
      imagery: [
        "Generar escenas genericas del rubro cuando las fotos reales no alcancen: manos trabajando, detalle de material, mostrador, fachada abstracta o producto sin marca.",
        "Crear placeholders visuales utiles para antes/durante/despues con labels honestos, no fotos stock irrelevantes.",
        "Usar textura y color del rubro para que la pagina no dependa de una sola foto mala.",
      ],
      boundaries: [
        "No inventar precios, stock, marcas, años, premios, personal, garantias ni servicios no verificados.",
        "No inventar reseñas ni atribuir imagenes generadas al local.",
        "No mostrar placeholders crudos en la version cliente; convertirlos en campos editables solo para revision interna.",
      ],
    },
    anti_patterns: [
      "Hero generico con slogan abstracto y cards iguales debajo.",
      "Copy meta como 'esta landing puede convertir' o 'la pagina debe'.",
      "Grillas de tres tarjetas repetidas sin jerarquia visual.",
      "Imagen chica decorativa que no manda la composicion.",
      "CTA unico al final o botones con texto vago.",
      ...(hasThinReviews ? ["Hacer pasar pocas reseñas por prueba social fuerte."] : []),
    ],
    rewrite_targets: [
      "Rehacer el hero para que el negocio parezca real en los primeros 5 segundos.",
      "Cambiar bloques explicativos por decisiones del cliente: llamar, mandar foto, consultar disponibilidad, pasar por el local.",
      "Usar imagenes genericas IA solo para poblar contexto visual seguro, nunca como evidencia del negocio.",
      `Mostrar horario publicado como dato operativo: ${hours}.`,
      "Bajar cualquier frase institucional que no ayude a pedir presupuesto o turno.",
    ],
  };
}

function creativeFromProfile(profile: ReturnType<typeof buildBusinessProfile>, business: Business, hours: string): CreativeSpec {
  return {
    concept: publicText(`${profile.heroClaim} Direccion comercial para ${profile.customerType}`),
    audience: publicText(profile.customerType),
    visual_direction:
      profile.tone === "urban-custom"
        ? "Alto contraste, composicion urbana, tarjetas duras, fotos con recortes agresivos y CTA de proyecto."
        : profile.tone === "premium-detailing"
          ? "Automotor premium, textura brillante, espacios amplios, antes/despues y servicios empaquetados."
          : "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    layout: creativeLayoutFor(profile),
    texture: creativeTextureFor(profile),
    hero_angle: publicText(profile.heroClaim),
    hero_cards: profile.trustBar.slice(0, 4).map((item) => ({
      label: publicText(item.label ?? "Dato"),
      value: publicText(item.title),
      note: publicText(item.meta ?? item.body),
    })),
    sections: [
      {
        type: "service-board",
        eyebrow: "Servicios",
        title: publicText(profile.resourceTitle),
        body: publicText(profile.body),
        items: profile.serviceCards.slice(0, 4).map((item) => ({
          label: publicText(item.label ?? "Servicio"),
          value: publicText(item.title),
          note: publicText(item.body),
        })),
      },
      {
        type: "process",
        eyebrow: "Proceso",
        title: "De consulta a turno sin perder contexto",
        body: "El usuario entiende que informacion enviar, que se confirma y como avanzar.",
        items: profile.process.slice(0, 4).map((item) => ({
          label: publicText(item.step),
          value: publicText(item.title),
          note: publicText(item.body),
        })),
      },
      {
        type: "metric-grid",
        eyebrow: "Confianza",
        title: "Datos reales arriba, informacion a confirmar separada",
        body: "El sitio combina fuentes verificadas con opciones comerciales que se completan antes de publicar.",
        items: profile.trustBar.slice(0, 4).map((item) => ({
          label: publicText(item.label ?? "Dato"),
          value: publicText(item.title),
          note: publicText(item.body),
        })),
      },
      {
        type: "material-story",
        eyebrow: "Direccion visual",
        title: "El sitio se apoya en imagen real y escenas seguras de contexto.",
        body: "Cuando los datos o fotos son pobres, la composicion puede sumar atmosfera, textura y proceso sin atribuir esos recursos al negocio.",
        items: [
          { label: "Foto real", value: "Usar como prueba", note: "Priorizar la mejor imagen publica disponible." },
          { label: "Apoyo visual", value: "Poblar contexto", note: "Herramientas, material, mostrador o proceso sin marcas falsas." },
          { label: "Cliente", value: "Siguiente paso claro", note: publicText(profile.cta) },
        ],
      },
      {
        type: "quick-actions",
        eyebrow: "Accion",
        title: publicText(profile.finalCta.title),
        body: publicText(profile.finalCta.body),
        items: [
          { label: "CTA", value: publicText(profile.finalCta.primary_label), note: business.phone ? business.phone : "Telefono a confirmar" },
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
  const city = businessCityLabel(business);
  const addressShort = business.address.split(",").slice(0, 2).join(",").trim();

  return {
    business_id: business.id,
    slug: business.slug,
    visual_mood: mood,
    composition,
    headline: business.name,
    subheadline: publicText(`${profile.heroClaim} ${profile.rubro} en ${city} con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.`),
    primary_cta: publicText(profile.cta),
    secondary_cta: "Ver ubicacion",
    service_tags: profile.services.slice(0, 5).map(publicText),
    proof_points: [
      `${business.rating.value.toFixed(1)} sobre 5 con ${business.rating.reviews_count} reseñas`,
      `Horario: ${hours}`,
      `Direccion: ${addressShort}`,
      reviewSignal(business),
    ].slice(0, 4),
    resource_title: publicText(profile.resourceTitle),
    resource_items: profile.resourceItems.map(publicText),
    review_heading: `Lo que valoran quienes ya fueron`,
    contact_heading: `Llegar o llamar sin vueltas`,
    image_prompt: `Escena editorial realista para ${imageSubject(profile.rubro, city)}, luz natural, usable como imagen generica de apoyo si las fotos reales son pobres, sin texto, sin logos, sin marcas ni datos inventados del negocio.`,
    design_notes: `Mood ${mood}, composicion ${composition}, template de conversion ${conversionTemplateFor(profile)}, tono comercial ${profile.tone}. Evitar estetica SaaS generica; usar recursos visuales del rubro ${service}, direccion, prueba social, paquetes editables y CTA de turno.`,
    conversion_template: conversionTemplateFor(profile),
    design_brief: designBriefFromProfile(profile, business, hours),
    commercial: commercialFromProfile(profile),
    creative: creativeFromProfile(profile, business, hours),
  };
}
