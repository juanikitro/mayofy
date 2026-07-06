import type { Business } from "./business-schema.js";
import { summarizeOpeningHours } from "./hours.js";

type BusinessProfile = {
  rubro: string;
  services: string[];
  resourceTitle: string;
  resourceItems: string[];
  lead: string;
  body: string;
  cta: string;
};

function hasAny(value: string, terms: string[]): boolean {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function context(business: Business): string {
  return `${business.name} ${business.category} ${business.main_product_or_service} ${business.reviews.map((review) => review.text).join(" ")}`;
}

function area(business: Business): string {
  return business.neighborhood_or_area ? `${business.neighborhood_or_area}, Tandil` : "Tandil";
}

export function buildBusinessProfile(business: Business): BusinessProfile {
  const text = context(business);
  const hours = summarizeOpeningHours(business.opening_hours.raw);
  const placeArea = area(business);

  if (hasAny(text, ["gomeria", "gomería", "cubierta", "pinchadura", "auxilio", "rueda"])) {
    const hasAuxilio = hasAny(text, ["auxilio", "24 hs", "24 horas"]) || hours.includes("24 horas");
    return {
      rubro: "Gomeria",
      services: hasAuxilio
        ? ["Cubiertas", "Pinchaduras", "Auxilio", "Atencion 24 horas"]
        : ["Cubiertas", "Pinchaduras", "Balanceo y consulta", "Atencion en local"],
      resourceTitle: "Para resolver cubiertas sin perder tiempo",
      resourceItems: [
        "Direccion visible para llegar directo al local.",
        hasAuxilio ? "Contacto util para urgencias y auxilios." : "Telefono disponible para consultar antes de ir.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} concentra lo importante para resolver cubiertas, pinchaduras y consultas de gomeria en ${placeArea}.`,
      body: "La pagina prioriza contacto, horarios, ubicacion y reseñas recientes para decidir rapido si conviene llamar o acercarse al local.",
      cta: hasAuxilio ? "Consultar auxilio" : "Consultar disponibilidad",
    };
  }

  if (hasAny(text, ["lubricentro", "lubricante", "aceite", "filtro"])) {
    return {
      rubro: "Lubricentro",
      services: ["Cambio de aceite", "Lubricantes", "Filtros", "Consulta por mantenimiento"],
      resourceTitle: "Mantenimiento simple, datos claros",
      resourceItems: [
        "Servicio principal enfocado en lubricacion y mantenimiento.",
        "Telefono y direccion listos para coordinar la visita.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} ofrece una referencia directa para mantenimiento, lubricantes y consultas del auto en ${placeArea}.`,
      body: "El contenido se centra en los datos que ayudan a coordinar una visita: ubicacion, horario, contacto y opiniones publicas.",
      cta: "Consultar mantenimiento",
    };
  }

  if (hasAny(text, ["mecanica", "mecánica", "multimarca", "taller", "reparacion", "service"])) {
    return {
      rubro: "Taller mecanico",
      services: ["Mecanica general", "Service", "Diagnostico", "Consulta por turno"],
      resourceTitle: "Informacion util antes de llevar el auto",
      resourceItems: [
        "Rubro y direccion destacados desde el primer bloque.",
        "Reseñas visibles para evaluar la atencion.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} aparece como opcion de taller y mantenimiento automotor en ${placeArea}, con datos de contacto a mano.`,
      body: "La propuesta evita promesas no verificadas y ordena la informacion publica para facilitar una primera consulta.",
      cta: "Consultar turno",
    };
  }

  if (hasAny(text, ["lavadero", "detailing", "estetica", "estética"])) {
    return {
      rubro: "Lavadero y estetica vehicular",
      services: ["Lavado", "Interior", "Exterior", "Detalle del vehiculo"],
      resourceTitle: "Para cuidar la presentacion del auto",
      resourceItems: [
        "Servicio principal visible desde el inicio.",
        "Contacto directo para consultar disponibilidad.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} reúne datos utiles para coordinar lavado, estetica o cuidado del vehiculo en ${placeArea}.`,
      body: "La pagina muestra lo necesario para decidir rapido: servicio, ubicacion, horario, contacto y reseñas.",
      cta: "Consultar lavado",
    };
  }

  if (hasAny(text, ["ropa", "indumentaria", "boutique", "moda", "prenda", "vestimenta", "tienda de ropa"])) {
    return {
      rubro: "Indumentaria",
      services: ["Ropa", "Atencion en local", "Consulta por disponibilidad", "Ubicacion comercial"],
      resourceTitle: "Para elegir antes de acercarse",
      resourceItems: [
        "Direccion y contacto visibles para consultar disponibilidad.",
        "Reseñas publicas para evaluar atencion y experiencia.",
        `Horario registrado: ${hours}.`,
      ],
      lead: `${business.name} reúne datos utiles para consultar indumentaria, coordinar una visita y ubicar el local en ${placeArea}.`,
      body: "La pagina evita inventar marcas, precios o stock. Ordena contacto, horario, ubicacion y referencias publicas para facilitar la primera consulta.",
      cta: "Consultar disponibilidad",
    };
  }

  return {
    rubro: business.category,
    services: [business.main_product_or_service, "Atencion en local", "Consulta directa", "Ubicacion en Tandil"],
    resourceTitle: "Datos claros para decidir",
    resourceItems: [
      "Nombre, direccion y contacto en un solo lugar.",
      "Reseñas visibles para evaluar la experiencia.",
      `Horario registrado: ${hours}.`,
    ],
    lead: `${business.name} presenta informacion concreta para contactar el local y conocer su servicio principal en ${placeArea}.`,
    body: "El sitio ordena datos publicos relevantes sin agregar servicios o promesas que no esten en las fuentes.",
    cta: "Consultar",
  };
}
