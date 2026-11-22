import { commercialPlans } from "@/content/commercial-plans";
import type { ProjectEntry } from "@/content/projects";
import { publicChannels, siteContent } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/*
 * Schema.org JSON-LD for search engines, built from the same content the page
 * renders so the markup never drifts from the visible copy. See
 * docs/plans/2026-11-22-seo-rendimiento.md for why each type is here.
 */

type JsonLdNode = Record<string, unknown>;

function absolute(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

const organizationId = () => absolute("/#organization");
const websiteId = () => absolute("/#website");

/*
 * Remote work reaches all of Argentina and Latin America; in person, the
 * partidos within about two hours of 25 de Mayo (Buenos Aires), the same
 * zones as the Google Business Profile (docs/plans/2026-11-22-perfil-google.md).
 * Titles and descriptions are never localised to the town (Juani, 2026-11-22).
 */
const inPersonPartidos = [
  "25 de Mayo",
  "Saladillo",
  "Alberti",
  "Bragado",
  "Chivilcoy",
  "Roque Pérez",
  "Lobos",
  "Nueve de Julio",
  "General Alvear",
  "Mercedes",
];

const areaServed = [
  { "@type": "Country", name: "Argentina" },
  { "@type": "Place", name: "Latinoamérica" },
  ...inPersonPartidos.map((name) => ({
    "@type": "AdministrativeArea",
    name: `Partido de ${name}`,
    containedInPlace: { "@type": "AdministrativeArea", name: "Provincia de Buenos Aires" },
  })),
];

/** "USD 85" → 85; the packs are "desde" prices, so they become a minimum. */
function minimumPrice(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function organization(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: siteContent.name,
    url: absolute("/"),
    logo: absolute("/icon.png"),
    description: siteContent.descriptor,
    email: publicChannels.email,
    // All of Argentina and Latin America, never the founder's town (Juani, 2026-11-22).
    areaServed,
    knowsLanguage: "es",
    // TODO(Juani): add the public Google Business Profile URL here once the
    // profile is verified (step 22 of docs/plans/2026-11-22-perfil-google.md).
    sameAs: [publicChannels.instagram],
    founder: {
      "@type": "Person",
      "@id": absolute("/#juani"),
      name: "Juan Ignacio Portilla Kitroser",
      alternateName: "Juani",
      jobTitle: "Fundador y desarrollador",
      url: publicChannels.linkedin,
      sameAs: [publicChannels.linkedin],
      worksFor: { "@id": organizationId() },
    },
  };
}

function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: siteContent.name,
    url: absolute("/"),
    inLanguage: "es-AR",
    publisher: { "@id": organizationId() },
  };
}

function services(): JsonLdNode[] {
  return commercialPlans.map((plan) => {
    const price = minimumPrice(plan.price);
    return {
      "@type": "Service",
      "@id": absolute(`/#pack-${plan.id}`),
      name: plan.name,
      description: plan.description,
      serviceType: "Desarrollo web y software a medida",
      provider: { "@id": organizationId() },
      areaServed,
      ...(price
        ? {
            offers: {
              "@type": "Offer",
              url: absolute("/#packs"),
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: price,
                priceCurrency: "USD",
              },
            },
          }
        : {}),
    };
  });
}

function faqPage(): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": absolute("/#preguntas"),
    mainEntity: siteContent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** The home page: who Mayofy is, the three packs and the visible FAQ. */
export function homeStructuredData(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), ...services(), faqPage()],
  };
}

/** A case study: its place under the works list and the work itself. */
export function projectStructuredData(project: ProjectEntry): JsonLdNode {
  const url = absolute(`/proyectos/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absolute("/") },
          { "@type": "ListItem", position: 2, name: "Trabajos", item: absolute("/#trabajos") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#trabajo`,
        name: project.title,
        description: project.summary,
        genre: project.category,
        url,
        inLanguage: "es-AR",
        creator: { "@id": organizationId() },
        ...(project.images[0] ? { image: absolute(project.images[0].src) } : {}),
      },
    ],
  };
}
