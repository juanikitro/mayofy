import type { Archetype } from "../archetypes/index.js";
import type { Business } from "../content/business-schema.js";
import { parseOpeningHours, summarizeOpeningHours } from "../content/hours.js";
import { buildBusinessProfile } from "../content/local-copy.js";
import type { ResolvedDesign } from "../design/palette.js";
import type { SiteSpec } from "../site-specs/schema.js";

const footerText = "Creado por JuaniKitro";

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

function renderReviews(business: Business): string {
  return business.reviews
    .slice(0, 3)
    .map(
      (review) => `
        <figure class="review-card">
          <blockquote>${escapeHtml(review.text)}</blockquote>
          <figcaption>${escapeHtml(review.author ?? "Cliente")}</figcaption>
        </figure>`,
    )
    .join("\n");
}

function renderPhoto(business: Business, heroSrc: string): string {
  return `<img class="hero-photo" src="${escapeHtml(heroSrc)}" alt="${escapeHtml(`Imagen principal de ${business.name}`)}" loading="eager">`;
}

function renderServicePills(services: string[]): string {
  return services.map((service) => `<span>${escapeHtml(service)}</span>`).join("\n");
}

function renderResources(items: string[]): string {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
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
    proof_points: [],
    resource_title: profile.resourceTitle,
    resource_items: profile.resourceItems,
    review_heading: "Lo que valoran quienes ya fueron",
    contact_heading: "Llegar o llamar sin vueltas",
    image_prompt: "",
    design_notes: "",
  };
  const area = business.neighborhood_or_area ? `${business.neighborhood_or_area}, Tandil` : "Tandil";
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  const rating = `${business.rating.value.toFixed(1)} sobre 5 · ${business.rating.reviews_count} reseñas`;

  return `<!doctype html>
<html lang="es-AR" data-business-id="${escapeHtml(business.id)}" data-archetype="${archetype.id}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(business.name)} | ${escapeHtml(profile.rubro)} en Tandil</title>
    <meta name="description" content="${escapeHtml(`${business.name}: ${profile.rubro} en ${area}. Contacto, horarios, reseñas y ubicación.`)}">
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body class="layout-${archetype.layout} mood-${pageSpec.visual_mood} composition-${pageSpec.composition}">
    <main>
      <nav class="site-nav" aria-label="Secciones">
        <a href="#servicio">Servicio</a>
        <a href="#resenas">Reseñas</a>
        <a href="#horarios">Horarios</a>
        <a href="#ubicacion">Contacto</a>
      </nav>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(profile.rubro)} · ${escapeHtml(area)}</p>
          <h1>${escapeHtml(pageSpec.headline)}</h1>
          <p class="lead">${escapeHtml(pageSpec.subheadline)}</p>
          <div class="service-pills">${renderServicePills(pageSpec.service_tags)}</div>
          <div class="cta-row">
            ${business.phone ? `<a class="button primary" href="tel:${escapeHtml(business.phone)}">${escapeHtml(pageSpec.primary_cta)}</a>` : ""}
            <a class="button secondary" href="#ubicacion">${escapeHtml(pageSpec.secondary_cta)}</a>
          </div>
        </div>
        <div class="hero-media">
          ${renderPhoto(business, heroSrc)}
          <div class="hero-badge">
            <span>${escapeHtml(profile.rubro)}</span>
            <strong>${escapeHtml(business.rating.value.toFixed(1))}</strong>
          </div>
        </div>
      </section>

      <section id="servicio" class="facts" aria-label="Datos principales">
        <article>
          <span>Servicio</span>
          <strong>${escapeHtml(profile.rubro)}</strong>
        </article>
        <article>
          <span>Calificacion</span>
          <strong>${escapeHtml(rating)}</strong>
        </article>
        <article>
          <span>Horario</span>
          <strong>${escapeHtml(hours)}</strong>
        </article>
      </section>

      <section class="proof-strip" aria-label="Pruebas rapidas">
        ${pageSpec.proof_points.map((item) => `<p>${escapeHtml(item)}</p>`).join("\n")}
      </section>

      <section class="content-grid">
        <div>
          <p class="section-label">Sobre el local</p>
          <h2>${escapeHtml(pageSpec.resource_title)}</h2>
          <p>${escapeHtml(profile.body)}</p>
          <ul class="resource-list">
            ${renderResources(pageSpec.resource_items)}
          </ul>
        </div>
        <div id="resenas" class="review-list">
          <p class="section-label">${escapeHtml(pageSpec.review_heading)}</p>
          ${renderReviews(business)}
        </div>
      </section>

      <section id="horarios" class="hours-block" aria-label="Horarios">
        <p class="section-label">Horarios</p>
        <h2>Cuando conviene contactar</h2>
        <ul class="hours-list">
          ${renderHours(business.opening_hours.raw)}
        </ul>
      </section>

      <section id="ubicacion" class="location">
        <p class="section-label">Contacto</p>
        <h2>${escapeHtml(pageSpec.contact_heading)}</h2>
        <p class="contact-line">${escapeHtml(contactLine(business))}</p>
        <p>${escapeHtml(`Zona: ${area}. Conviene llamar antes de acercarse para confirmar disponibilidad y tiempos de atencion.`)}</p>
      </section>
    </main>

    <footer>${footerText}</footer>
  </body>
</html>`;
}
