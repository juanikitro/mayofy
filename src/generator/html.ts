import type { Archetype } from "../archetypes/index.js";
import type { Business } from "../content/business-schema.js";
import { parseOpeningHours, summarizeOpeningHours } from "../content/hours.js";
import { businessAreaLabel } from "../content/location.js";
import { buildBusinessProfile } from "../content/local-copy.js";
import type { ResolvedDesign } from "../design/palette.js";
import type { CommercialSpec, CreativeSpec, SiteSpec } from "../site-specs/schema.js";

const footerText = "Creado por JuaniKitro";

type BusinessProfile = ReturnType<typeof buildBusinessProfile>;
type CreativeBlock = CreativeSpec["sections"][number];

type PageContext = {
  archetype: Archetype;
  business: Business;
  profile: BusinessProfile;
  pageSpec: SiteSpec;
  commercial: CommercialSpec;
  creative: CreativeSpec;
  heroSrc: string;
  area: string;
  hours: string;
  rating: string;
  bodyClass: string;
};

type NavLink = {
  href: string;
  label: string;
};

type CommercialCard = CommercialSpec["service_cards"][number];
type CommercialPackage = CommercialSpec["packages"][number];

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function contactLine(business: Business): string {
  const parts = [business.address];
  if (business.phone) {
    parts.push(business.phone);
  }
  return parts.join(" · ");
}

function phoneHref(phone: string): string {
  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized || phone;
}

function renderSiteNav(links: NavLink[], className = "site-nav"): string {
  return `<nav class="${className}" aria-label="Secciones">
    ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("\n")}
  </nav>`;
}

function renderReviews(business: Business): string {
  const reviews = business.reviews.filter((review) => review.rating >= 4).slice(0, 3);
  if (reviews.length === 0) {
    return `
      <figure class="review-card">
        <blockquote>Sin reseñas positivas suficientes para mostrar una cita confiable.</blockquote>
        <figcaption>Referencia pendiente</figcaption>
      </figure>`;
  }

  return reviews
    .map(
      (review) => `
        <figure class="review-card">
          <blockquote>${escapeHtml(review.text)}</blockquote>
          <figcaption>${escapeHtml(review.author ?? "Cliente")}</figcaption>
        </figure>`,
    )
    .join("\n");
}

function renderPhoto(business: Business, heroSrc: string, className = "hero-photo"): string {
  return `<img class="${className}" src="${escapeHtml(heroSrc)}" alt="${escapeHtml(`Imagen principal de ${business.name}`)}" loading="eager">`;
}

function renderServicePills(services: string[], className = "service-pills"): string {
  return `<div class="${className}">
    ${services.map((service) => `<span>${escapeHtml(service)}</span>`).join("\n")}
  </div>`;
}

function renderCreativeCards(cards: CreativeSpec["hero_cards"], className = "creative-cards"): string {
  return `<div class="${className}">
    ${cards
      .map(
        (card) => `<article>
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          ${card.note ? `<p>${escapeHtml(card.note)}</p>` : ""}
        </article>`,
      )
      .join("\n")}
  </div>`;
}

function renderCreativeBlock(block: CreativeBlock, extraClass = ""): string {
  const classes = ["creative-block", `block-${block.type}`, extraClass].filter(Boolean).join(" ");
  return `<article class="${classes}">
    <div class="block-heading">
      <p class="section-label">${escapeHtml(block.eyebrow)}</p>
      <h2>${escapeHtml(block.title)}</h2>
      <p>${escapeHtml(block.body)}</p>
    </div>
    <div class="block-items">
      ${block.items
        .map(
          (item) => `<div>
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
          </div>`,
        )
        .join("\n")}
    </div>
    ${block.callout ? `<p class="block-callout">${escapeHtml(block.callout)}</p>` : ""}
  </article>`;
}

function creativeFallback(profile: BusinessProfile, business: Business, pageSpec: SiteSpec, hours: string): CreativeSpec {
  return {
    concept: pageSpec.design_notes || `${profile.rubro} local con contacto claro y prueba social visible.`,
    audience: "Personas que quieren decidir rapido si llaman o se acercan al local.",
    visual_direction: "Landing local sobria con foto real, datos de contacto y reseñas como prueba.",
    layout: "mechanic-ledger",
    texture: "service-ledger",
    hero_angle: profile.lead,
    hero_cards: [
      { label: "Calificacion", value: business.rating.value.toFixed(1), note: `${business.rating.reviews_count} reseñas` },
      { label: "Horario", value: hours },
      { label: "Servicio", value: profile.rubro },
    ],
    sections: [
      {
        type: "service-board",
        eyebrow: "Servicio",
        title: pageSpec.resource_title,
        body: profile.body,
        items: pageSpec.service_tags.slice(0, 4).map((tag) => ({ label: "Consulta", value: tag })),
      },
      {
        type: "quick-actions",
        eyebrow: "Contacto",
        title: pageSpec.contact_heading,
        body: "Datos publicos ordenados para llamar, ubicar el local y decidir el proximo paso.",
        items: [
          { label: "Telefono", value: business.phone ?? "A confirmar" },
          { label: "Direccion", value: business.address },
        ],
      },
      {
        type: "metric-grid",
        eyebrow: "Referencias",
        title: pageSpec.review_heading,
        body: "La decision se apoya en calificacion, comentarios y datos verificables.",
        items: business.reviews.slice(0, 3).map((review) => ({ label: review.author ?? "Cliente", value: review.text })),
      },
    ],
  };
}

function commercialFallback(profile: BusinessProfile): CommercialSpec {
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
      "Las opciones marcadas como a confirmar ordenan la consulta sin publicar precios, stock o alcances no verificados.",
  };
}

function renderDemoFlag(isDemo?: boolean): string {
  return isDemo ? `<span class="demo-flag">A confirmar</span>` : "";
}

function renderCommercialCard(card: CommercialCard, className = "commercial-card"): string {
  return `<article class="${className}${card.is_demo ? " is-demo" : ""}">
    <div>
      ${card.label ? `<span>${escapeHtml(card.label)}</span>` : ""}
      ${renderDemoFlag(card.is_demo)}
    </div>
    <h3>${escapeHtml(card.title)}</h3>
    <p>${escapeHtml(card.body)}</p>
    ${card.meta ? `<strong>${escapeHtml(card.meta)}</strong>` : ""}
  </article>`;
}

function renderCommercialPackage(item: CommercialPackage): string {
  return `<article class="commercial-package${item.is_demo ? " is-demo" : ""}">
    <div class="package-top">
      <span>${renderDemoFlag(item.is_demo) || "Servicio"}</span>
      <strong>${escapeHtml(item.price_label)}</strong>
    </div>
    <h3>${escapeHtml(item.name)}</h3>
    <p>${escapeHtml(item.body)}</p>
    <ul>
      ${item.items.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("\n")}
    </ul>
  </article>`;
}

function renderCommercialTrust(ctx: PageContext): string {
  return `<section class="commercial-trust" aria-label="Datos de confianza">
    ${ctx.commercial.trust_bar.map((item) => renderCommercialCard(item, "trust-card")).join("\n")}
  </section>`;
}

function renderCommercialSections(ctx: PageContext): string {
  const c = ctx.commercial;
  return `
    ${renderCommercialTrust(ctx)}

    <section id="servicios" class="commercial-section commercial-services commercial-tone-${escapeHtml(c.tone)}">
      <div class="commercial-heading">
        <p class="section-label">Servicios</p>
        <h2>${escapeHtml(c.hero_claim)}</h2>
        <p>${escapeHtml(c.customer_type)}</p>
      </div>
      <div class="commercial-grid">
        ${c.service_cards.map((item) => renderCommercialCard(item)).join("\n")}
      </div>
    </section>

    <section class="commercial-section commercial-why">
      <div class="commercial-heading">
        <p class="section-label">Por que elegir</p>
        <h2>Argumentos concretos para reservar o consultar</h2>
      </div>
      <div class="commercial-grid compact">
        ${c.why_choose.map((item) => renderCommercialCard(item)).join("\n")}
      </div>
    </section>

    <section id="combos" class="commercial-section commercial-packages">
      <div class="commercial-heading">
        <p class="section-label">Opciones de consulta</p>
        <h2>Tres formas de pedir presupuesto sin publicar precios no confirmados</h2>
        <p>${escapeHtml(c.editable_note ?? "Los precios, stock y alcances se confirman antes de publicar una oferta final.")}</p>
      </div>
      <div class="package-grid">
        ${c.packages.map((item) => renderCommercialPackage(item)).join("\n")}
      </div>
    </section>

    <section class="commercial-section commercial-gallery">
      <div class="commercial-heading">
        <p class="section-label">Antes / despues</p>
        <h2>Prueba visual para que el resultado se entienda rapido</h2>
      </div>
      <div class="gallery-grid">
        ${c.gallery.map((item) => renderCommercialCard(item, "gallery-card")).join("\n")}
      </div>
    </section>

    <section class="commercial-section commercial-process">
      <div class="commercial-heading">
        <p class="section-label">Proceso</p>
        <h2>Como pasa de consulta a turno</h2>
      </div>
      <div class="process-rail">
        ${c.process
          .map(
            (item) => `<article>
              <span>${escapeHtml(item.step)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.body)}</p>
            </article>`,
          )
          .join("\n")}
      </div>
    </section>

    <section class="commercial-final-cta">
      <div>
        <p class="section-label">Reservar</p>
        <h2>${escapeHtml(c.final_cta.title)}</h2>
        <p>${escapeHtml(c.final_cta.body)}</p>
      </div>
      <div class="cta-row">
        ${
          ctx.business.phone
            ? `<a class="button primary" href="tel:${escapeHtml(phoneHref(ctx.business.phone))}">${escapeHtml(c.final_cta.primary_label)}</a>`
            : `<a class="button primary" href="#ubicacion">${escapeHtml(c.final_cta.primary_label)}</a>`
        }
        <a class="button secondary" href="#ubicacion">${escapeHtml(c.final_cta.secondary_label)}</a>
      </div>
    </section>`;
}

function renderHours(raw: string | null): string {
  const parsed = parseOpeningHours(raw);
  if (parsed.length === 0) {
    return `<p class="hours-fallback">Horario a confirmar</p>`;
  }

  return parsed
    .map(
      (entry) => `
        <li class="${entry.isClosed ? "is-closed" : ""}">
          <span>${escapeHtml(entry.day)}</span>
          <strong>${escapeHtml(entry.text)}</strong>
        </li>`,
    )
    .join("\n");
}

function blockByType(ctx: PageContext, type: CreativeBlock["type"]): CreativeBlock | null {
  return ctx.creative.sections.find((section) => section.type === type) ?? null;
}

function blocksExcept(ctx: PageContext, usedTypes: CreativeBlock["type"][]): CreativeBlock[] {
  return ctx.creative.sections.filter((section) => !usedTypes.includes(section.type));
}

function renderHeroActions(ctx: PageContext, className = "cta-row"): string {
  return `<div class="${className}">
    ${
      ctx.business.phone
        ? `<a class="button primary" href="tel:${escapeHtml(phoneHref(ctx.business.phone))}">${escapeHtml(ctx.pageSpec.primary_cta)}</a>`
        : ""
    }
    <a class="button secondary" href="#ubicacion">${escapeHtml(ctx.pageSpec.secondary_cta)}</a>
  </div>`;
}

function renderFactTiles(ctx: PageContext, className = "facts", id = ""): string {
  return `<section ${id ? `id="${escapeHtml(id)}"` : ""} class="${className}" aria-label="Datos principales">
    <article>
      <span>Servicio</span>
      <strong>${escapeHtml(ctx.profile.rubro)}</strong>
    </article>
    <article>
      <span>Calificacion</span>
      <strong>${escapeHtml(ctx.rating)}</strong>
    </article>
    <article>
      <span>Horario</span>
      <strong>${escapeHtml(ctx.hours)}</strong>
    </article>
  </section>`;
}

function renderProofPoints(ctx: PageContext, className = "proof-strip"): string {
  if (ctx.pageSpec.proof_points.length === 0) {
    return "";
  }

  return `<section class="${className}" aria-label="Pruebas rapidas">
    ${ctx.pageSpec.proof_points.map((item) => `<p>${escapeHtml(item)}</p>`).join("\n")}
  </section>`;
}

function renderHoursSection(ctx: PageContext, className = "hours-block", title = "Cuando conviene contactar"): string {
  return `<section id="horarios" class="${className}" aria-label="Horarios">
    <p class="section-label">Horarios</p>
    <h2>${escapeHtml(title)}</h2>
    <ul class="hours-list">
      ${renderHours(ctx.business.opening_hours.raw)}
    </ul>
  </section>`;
}

function renderReviewsSection(ctx: PageContext, className = "review-list review-wall", title = "Comentarios que ayudan a decidir"): string {
  return `<section id="resenas" class="${className}">
    <div>
      <p class="section-label">${escapeHtml(ctx.pageSpec.review_heading)}</p>
      <h2>${escapeHtml(title)}</h2>
    </div>
    ${renderReviews(ctx.business)}
  </section>`;
}

function renderContactSection(
  ctx: PageContext,
  className = "location",
  body = `Zona: ${ctx.area}. Conviene llamar antes de acercarse para confirmar disponibilidad y tiempos de atencion.`,
): string {
  return `<section id="ubicacion" class="${className}">
    <p class="section-label">Contacto</p>
    <h2>${escapeHtml(ctx.pageSpec.contact_heading)}</h2>
    <p class="contact-line">${escapeHtml(contactLine(ctx.business))}</p>
    <p>${escapeHtml(body)}</p>
    ${
      ctx.business.phone
        ? `<a class="button primary contact-button" href="tel:${escapeHtml(phoneHref(ctx.business.phone))}">${escapeHtml(ctx.pageSpec.primary_cta)}</a>`
        : ""
    }
  </section>`;
}

function renderDocument(ctx: PageContext, content: string): string {
  return `<!doctype html>
<html lang="es-AR" data-business-id="${escapeHtml(ctx.business.id)}" data-archetype="${ctx.archetype.id}" data-creative-layout="${escapeHtml(
    ctx.creative.layout,
  )}"${ctx.pageSpec.conversion_template ? ` data-conversion-template="${escapeHtml(ctx.pageSpec.conversion_template)}"` : ""}>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(ctx.business.name)} | ${escapeHtml(ctx.profile.rubro)} en ${escapeHtml(ctx.area)}</title>
    <meta name="description" content="${escapeHtml(
      `${ctx.business.name}: ${ctx.profile.rubro} en ${ctx.area}. Contacto, horarios, reseñas y ubicación.`,
    )}">
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body class="${ctx.bodyClass}">
    <main>
      ${content}
    </main>

    <footer>${footerText}</footer>
  </body>
</html>`;
}

function renderStudioDetail(ctx: PageContext): string {
  const material = blockByType(ctx, "material-story") ?? ctx.creative.sections[0];
  const process = blockByType(ctx, "process");
  const quote = blockByType(ctx, "quote-strip");
  const remaining = blocksExcept(ctx, [material.type, process?.type ?? "process", quote?.type ?? "quote-strip"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav([
        { href: "#detalle", label: "Detalle" },
        { href: "#servicio", label: "Proceso" },
        { href: "#resenas", label: "Resenas" },
        { href: "#ubicacion", label: "Contacto" },
      ])}
      <section id="detalle" class="studio-hero">
        <div class="studio-copy">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          <p class="hero-angle">${escapeHtml(ctx.creative.hero_angle)}</p>
          ${renderHeroActions(ctx)}
        </div>
        <div class="studio-media">
          ${renderPhoto(ctx.business, ctx.heroSrc)}
          ${renderCreativeCards(ctx.creative.hero_cards, "studio-cards")}
        </div>
      </section>

      <section id="servicio" class="studio-statement">
        ${renderCreativeBlock(material, "studio-material")}
        ${quote ? renderCreativeBlock(quote, "studio-quote") : ""}
      </section>

      ${process ? `<section class="studio-process">${renderCreativeBlock(process)}</section>` : ""}
      ${remaining.length > 0 ? `<section class="studio-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      ${renderReviewsSection(ctx, "studio-reviews", "Referencias de terminacion")}
      ${renderContactSection(ctx, "location studio-contact")}
    `,
  );
}

function renderWashFlow(ctx: PageContext): string {
  const process = blockByType(ctx, "process") ?? ctx.creative.sections[0];
  const quick = blockByType(ctx, "quick-actions");
  const service = blockByType(ctx, "service-board");
  const remaining = blocksExcept(ctx, [process.type, quick?.type ?? "quick-actions", service?.type ?? "service-board"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav(
        [
          { href: "#servicio", label: "Lavado" },
          { href: "#horarios", label: "Horarios" },
          { href: "#resenas", label: "Opiniones" },
          { href: "#ubicacion", label: "Llegar" },
        ],
        "site-nav wash-nav",
      )}
      <section class="wash-dock">
        <div class="wash-intro">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          ${renderServicePills(ctx.pageSpec.service_tags, "service-pills wash-pills")}
        </div>
        <div class="wash-window">
          ${renderPhoto(ctx.business, ctx.heroSrc)}
          <p>${escapeHtml(ctx.creative.hero_angle)}</p>
        </div>
      </section>

      ${renderProofPoints(ctx, "wash-proof")}

      <section id="servicio" class="wash-flow-grid">
        ${renderCreativeBlock(process, "wash-process")}
        <aside class="wash-sidebar">
          ${renderCreativeCards(ctx.creative.hero_cards, "wash-cards")}
          ${quick ? renderCreativeBlock(quick, "wash-actions") : ""}
        </aside>
      </section>

      ${service ? `<section class="wash-service">${renderCreativeBlock(service)}</section>` : ""}
      ${remaining.length > 0 ? `<section class="wash-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      <section class="wash-lower">
        ${renderHoursSection(ctx, "hours-block wash-hours", "Horario para pasar o consultar")}
        ${renderReviewsSection(ctx, "review-list wash-reviews", "Lo que dicen del paso por el lavadero")}
      </section>
      ${renderContactSection(ctx, "location wash-contact")}
    `,
  );
}

function renderOilBay(ctx: PageContext): string {
  const service = blockByType(ctx, "service-board") ?? ctx.creative.sections[0];
  const process = blockByType(ctx, "process");
  const metric = blockByType(ctx, "metric-grid");
  const remaining = blocksExcept(ctx, [service.type, process?.type ?? "process", metric?.type ?? "metric-grid"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav([
        { href: "#servicio", label: "Ficha" },
        { href: "#horarios", label: "Horario" },
        { href: "#resenas", label: "Referencias" },
        { href: "#ubicacion", label: "Consulta" },
      ])}
      <section class="oil-ticket">
        <div class="oil-ticket-copy">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          <p class="hero-angle">${escapeHtml(ctx.creative.hero_angle)}</p>
          ${renderHeroActions(ctx, "cta-row oil-actions")}
        </div>
        <div class="oil-hero-photo">${renderPhoto(ctx.business, ctx.heroSrc)}</div>
        <aside class="oil-metrics">
          ${renderCreativeCards(ctx.creative.hero_cards, "oil-cards")}
          ${renderFactTiles(ctx, "facts oil-facts")}
        </aside>
      </section>

      <section id="servicio" class="oil-bay-grid">
        <div class="oil-service-stack">
          ${renderCreativeBlock(service, "oil-service-board")}
          ${process ? renderCreativeBlock(process, "oil-process") : ""}
        </div>
      </section>

      ${metric ? `<section class="oil-metric-strip">${renderCreativeBlock(metric)}</section>` : ""}
      ${remaining.length > 0 ? `<section class="oil-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      <section class="oil-bottom">
        ${renderHoursSection(ctx, "hours-block oil-hours", "Ventana para coordinar mantenimiento")}
        ${renderContactSection(ctx, "location oil-contact", `Datos publicos para consultar mantenimiento en ${ctx.area} sin perder el telefono ni la direccion.`)}
      </section>
      ${renderReviewsSection(ctx, "review-list oil-reviews", "Comentarios sobre atencion y resolucion")}
    `,
  );
}

function renderRoadsideRescue(ctx: PageContext): string {
  const quick = blockByType(ctx, "quick-actions") ?? ctx.creative.sections[0];
  const process = blockByType(ctx, "process");
  const quote = blockByType(ctx, "quote-strip");
  const remaining = blocksExcept(ctx, [quick.type, process?.type ?? "process", quote?.type ?? "quote-strip"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav(
        [
          { href: "#ubicacion", label: "Llamar" },
          { href: "#servicio", label: "Auxilio" },
          { href: "#horarios", label: "Horario" },
          { href: "#resenas", label: "Confianza" },
        ],
        "site-nav rescue-nav",
      )}
      <section class="rescue-command">
        <div class="rescue-panel">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          ${
            ctx.business.phone
              ? `<a class="rescue-call" href="tel:${escapeHtml(phoneHref(ctx.business.phone))}">${escapeHtml(ctx.business.phone)}</a>`
              : ""
          }
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          <p class="hero-angle">${escapeHtml(ctx.creative.hero_angle)}</p>
        </div>
        <div class="rescue-map">
          ${renderPhoto(ctx.business, ctx.heroSrc)}
          ${renderCreativeCards(ctx.creative.hero_cards, "rescue-cards")}
        </div>
      </section>

      <section id="servicio" class="rescue-action-grid">
        ${renderCreativeBlock(quick, "rescue-actions")}
        ${process ? renderCreativeBlock(process, "rescue-process") : ""}
      </section>

      ${quote ? `<section class="rescue-quote">${renderCreativeBlock(quote)}</section>` : ""}
      ${remaining.length > 0 ? `<section class="rescue-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      <section class="rescue-strip">
        ${renderFactTiles(ctx, "facts rescue-facts")}
        ${renderProofPoints(ctx, "rescue-proof")}
      </section>
      <section class="rescue-lower">
        ${renderContactSection(ctx, "location rescue-contact", `Referencia local en ${ctx.area}. Para urgencias, el primer paso es llamar y confirmar disponibilidad.`)}
        ${renderHoursSection(ctx, "hours-block rescue-hours", "Disponibilidad publicada")}
      </section>
      ${renderReviewsSection(ctx, "review-list rescue-reviews", "Prueba social para decidir rapido")}
    `,
  );
}

function renderBodyshopCraft(ctx: PageContext): string {
  const material = blockByType(ctx, "material-story") ?? ctx.creative.sections[0];
  const quote = blockByType(ctx, "quote-strip");
  const process = blockByType(ctx, "process");
  const remaining = blocksExcept(ctx, [material.type, quote?.type ?? "quote-strip", process?.type ?? "process"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav([
        { href: "#servicio", label: "Oficio" },
        { href: "#resenas", label: "Referencias" },
        { href: "#horarios", label: "Horarios" },
        { href: "#ubicacion", label: "Contacto" },
      ])}
      <section class="bodyshop-editorial">
        <div class="bodyshop-title">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
        </div>
        <div class="bodyshop-lead">
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          <p class="hero-angle">${escapeHtml(ctx.creative.hero_angle)}</p>
          ${renderHeroActions(ctx)}
        </div>
        <div class="bodyshop-photo">${renderPhoto(ctx.business, ctx.heroSrc)}</div>
        ${renderCreativeCards(ctx.creative.hero_cards, "bodyshop-cards")}
      </section>

      <section id="servicio" class="bodyshop-craft-grid">
        ${renderCreativeBlock(material, "bodyshop-material")}
        ${process ? renderCreativeBlock(process, "bodyshop-process") : ""}
      </section>

      ${quote ? `<section class="bodyshop-quote">${renderCreativeBlock(quote)}</section>` : ""}
      ${remaining.length > 0 ? `<section class="bodyshop-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      <section class="bodyshop-lower">
        ${renderReviewsSection(ctx, "review-list bodyshop-reviews", "Lo que importa antes de dejar el auto")}
        ${renderHoursSection(ctx, "hours-block bodyshop-hours", "Horario de consulta")}
      </section>
      ${renderContactSection(ctx, "location bodyshop-contact")}
    `,
  );
}

function renderPartsCounter(ctx: PageContext): string {
  const service = blockByType(ctx, "service-board") ?? ctx.creative.sections[0];
  const quick = blockByType(ctx, "quick-actions");
  const metric = blockByType(ctx, "metric-grid");
  const remaining = blocksExcept(ctx, [service.type, quick?.type ?? "quick-actions", metric?.type ?? "metric-grid"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav(
        [
          { href: "#servicio", label: "Mostrador" },
          { href: "#ubicacion", label: "Consulta" },
          { href: "#horarios", label: "Horario" },
          { href: "#resenas", label: "Resenas" },
        ],
        "site-nav parts-nav",
      )}
      <section class="parts-counter-hero">
        <div class="parts-copy">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          ${renderServicePills(ctx.pageSpec.service_tags, "parts-tags")}
        </div>
        <div class="parts-photo">
          ${renderPhoto(ctx.business, ctx.heroSrc)}
          <div class="parts-sticker">${escapeHtml(ctx.creative.hero_angle)}</div>
        </div>
      </section>

      <section id="servicio" class="parts-catalog">
        ${renderCreativeCards(ctx.creative.hero_cards, "parts-cards")}
        ${renderCreativeBlock(service, "parts-service-board")}
      </section>

      <section class="parts-actions-grid">
        ${quick ? renderCreativeBlock(quick, "parts-actions") : ""}
        ${metric ? renderCreativeBlock(metric, "parts-metrics") : ""}
      </section>

      ${remaining.length > 0 ? `<section class="parts-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      <section class="parts-bottom">
        ${renderContactSection(ctx, "location parts-contact", `Para consultar repuestos en ${ctx.area}, conviene llamar con el dato del vehiculo y confirmar disponibilidad.`)}
        ${renderHoursSection(ctx, "hours-block parts-hours", "Horario de mostrador")}
      </section>
      ${renderReviewsSection(ctx, "review-list parts-reviews", "Referencias antes de consultar stock")}
    `,
  );
}

function renderMechanicLedger(ctx: PageContext): string {
  const material = blockByType(ctx, "material-story") ?? ctx.creative.sections[0];
  const service = blockByType(ctx, "service-board");
  const process = blockByType(ctx, "process");
  const remaining = blocksExcept(ctx, [material.type, service?.type ?? "service-board", process?.type ?? "process"]);

  return renderDocument(
    ctx,
    `
      ${renderSiteNav([
        { href: "#servicio", label: "Diagnostico" },
        { href: "#resenas", label: "Casos" },
        { href: "#horarios", label: "Agenda" },
        { href: "#ubicacion", label: "Contacto" },
      ])}
      <section class="ledger-hero">
        <div class="ledger-sheet">
          <p class="eyebrow">${escapeHtml(ctx.profile.rubro)} · ${escapeHtml(ctx.area)}</p>
          <h1>${escapeHtml(ctx.pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(ctx.pageSpec.subheadline)}</p>
          <p class="hero-angle">${escapeHtml(ctx.creative.hero_angle)}</p>
          ${renderHeroActions(ctx)}
        </div>
        <aside class="ledger-visual">
          <div class="ledger-hero-photo">${renderPhoto(ctx.business, ctx.heroSrc)}</div>
          ${renderCreativeCards(ctx.creative.hero_cards, "ledger-cards")}
          ${renderFactTiles(ctx, "facts ledger-facts")}
        </aside>
      </section>

      <section id="servicio" class="ledger-workbench">
        <div class="ledger-blocks">
          ${renderCreativeBlock(material, "ledger-material")}
          ${service ? renderCreativeBlock(service, "ledger-service") : ""}
          ${process ? renderCreativeBlock(process, "ledger-process") : ""}
        </div>
      </section>

      ${remaining.length > 0 ? `<section class="ledger-extra">${remaining.map((block) => renderCreativeBlock(block)).join("\n")}</section>` : ""}
      ${renderCommercialSections(ctx)}
      ${renderReviewsSection(ctx, "review-list ledger-reviews", "Notas de clientes")}
      <section class="ledger-bottom">
        ${renderHoursSection(ctx, "hours-block ledger-hours", "Horario para consultar turno")}
        ${renderContactSection(ctx, "location ledger-contact")}
      </section>
    `,
  );
}

function renderCreativePage(ctx: PageContext): string {
  switch (ctx.creative.layout) {
    case "studio-detail":
      return renderStudioDetail(ctx);
    case "wash-flow":
      return renderWashFlow(ctx);
    case "oil-bay":
      return renderOilBay(ctx);
    case "roadside-rescue":
      return renderRoadsideRescue(ctx);
    case "bodyshop-craft":
      return renderBodyshopCraft(ctx);
    case "parts-counter":
      return renderPartsCounter(ctx);
    case "mechanic-ledger":
      return renderMechanicLedger(ctx);
  }
}

export function renderBusinessPage(business: Business, archetype: Archetype, design: ResolvedDesign, heroSrc: string, spec?: SiteSpec): string {
  const profile = buildBusinessProfile(business);
  const pageSpec: SiteSpec = spec ?? {
    business_id: business.id,
    slug: business.slug,
    visual_mood: "workshop-trust",
    composition: "split-command",
    headline: business.name,
    subheadline: profile.lead,
    primary_cta: profile.cta,
    secondary_cta: "Ver ubicacion",
    service_tags: profile.services.slice(0, 5),
    proof_points: profile.resourceItems,
    resource_title: profile.resourceTitle,
    resource_items: profile.resourceItems,
    review_heading: "Lo que valoran quienes ya fueron",
    contact_heading: "Llegar o llamar sin vueltas",
    image_prompt: "",
    design_notes: "",
    commercial: commercialFallback(profile),
  };
  const area = businessAreaLabel(business);
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  const rating = `${business.rating.value.toFixed(1)} sobre 5 · ${business.rating.reviews_count} reseñas`;
  const commercial = pageSpec.commercial ?? commercialFallback(profile);
  const creative = pageSpec.creative ?? creativeFallback(profile, business, pageSpec, hours);
  const bodyClass = [
    `layout-${archetype.layout}`,
    `mood-${pageSpec.visual_mood}`,
    `composition-${pageSpec.composition}`,
    `commercial-${commercial.tone}`,
    "has-creative",
    `creative-${creative.layout}`,
    `texture-${creative.texture}`,
    `page-${creative.layout}`,
  ].join(" ");

  return renderCreativePage({
    archetype,
    business,
    profile,
    pageSpec,
    commercial,
    creative,
    heroSrc,
    area,
    hours,
    rating,
    bodyClass,
  });
}
