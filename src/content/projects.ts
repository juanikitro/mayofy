export type ProjectVisualVariant =
  | "threshold"
  | "current"
  | "canopy"
  | "monolith"
  | "delta"
  | "grove";

export type ProjectPortalLayout = "split-left" | "split-right" | "horizon";

export type ProjectEntry = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  challenge: string;
  approach: string;
  decisions: readonly string[];
  conversionSteps: readonly string[];
  outcome: string;
  scope: string;
  visual: ProjectVisualVariant;
  layout: ProjectPortalLayout;
  placeholder: boolean;
  url?: string;
};

export const projects = [
  {
    slug: "shineapp",
    index: "01",
    title: "Sistema de gestión para lavaderos",
    category: "Sistema a medida",
    summary:
      "Plataforma para que lavaderos y negocios de detailing gestionen clientes, servicios y la operación del día a día.",
    context:
      "Contexto del negocio, su oferta, su audiencia y la forma en que llegaban las consultas antes del proyecto.",
    challenge:
      "Problema comercial o de experiencia que el proyecto necesitaba resolver. Completar con evidencia real.",
    approach:
      "Síntesis del enfoque de estrategia, diseño y desarrollo aplicado al proyecto.",
    decisions: [
      "Decisión clave de mensaje o posicionamiento.",
      "Decisión clave de experiencia o interfaz.",
      "Decisión clave técnica o de implementación.",
    ],
    conversionSteps: [
      "Punto de entrada",
      "Comprensión de la oferta",
      "Construcción de confianza",
      "Contacto o reserva",
    ],
    outcome:
      "Resultado, aprendizaje o señal verificable a completar cuando el caso sea reemplazado.",
    scope: "Producto, diseño y desarrollo",
    visual: "threshold",
    layout: "split-left",
    placeholder: false,
    url: "https://shineapp.lat/",
  },
  {
    slug: "consignataria-hacienda",
    index: "02",
    title: "Landing para una consignataria de hacienda",
    category: "Landing",
    summary:
      "Presencia propia para una consignataria familiar: qué hace, cómo trabaja y una vía directa de contacto.",
    context:
      "Contexto del negocio, su oferta, su audiencia y la forma en que llegaban las consultas antes del proyecto.",
    challenge:
      "Problema comercial o de experiencia que el proyecto necesitaba resolver. Completar con evidencia real.",
    approach:
      "Síntesis del enfoque de estrategia, diseño y desarrollo aplicado al proyecto.",
    decisions: [
      "Decisión clave de mensaje o posicionamiento.",
      "Decisión clave de experiencia o interfaz.",
      "Decisión clave técnica o de implementación.",
    ],
    conversionSteps: [
      "Punto de entrada",
      "Comprensión de la oferta",
      "Construcción de confianza",
      "Contacto o reserva",
    ],
    outcome:
      "Resultado, aprendizaje o señal verificable a completar cuando el caso sea reemplazado.",
    scope: "Diseño, desarrollo y publicación",
    visual: "current",
    layout: "split-right",
    placeholder: false,
    url: "https://gymg.com.ar/",
  },
  {
    slug: "portfolio-desarrollador",
    index: "03",
    title: "Portfolio de un desarrollador",
    category: "Web personal",
    summary:
      "Sitio de presentación profesional con trayectoria y casos técnicos explicados con claridad.",
    context:
      "Contexto del negocio, su oferta, su audiencia y la forma en que llegaban las consultas antes del proyecto.",
    challenge:
      "Problema comercial o de experiencia que el proyecto necesitaba resolver. Completar con evidencia real.",
    approach:
      "Síntesis del enfoque de estrategia, diseño y desarrollo aplicado al proyecto.",
    decisions: [
      "Decisión clave de mensaje o posicionamiento.",
      "Decisión clave de experiencia o interfaz.",
      "Decisión clave técnica o de implementación.",
    ],
    conversionSteps: [
      "Punto de entrada",
      "Comprensión de la oferta",
      "Construcción de confianza",
      "Contacto o reserva",
    ],
    outcome:
      "Resultado, aprendizaje o señal verificable a completar cuando el caso sea reemplazado.",
    scope: "Diseño, desarrollo y publicación",
    visual: "canopy",
    layout: "horizon",
    placeholder: false,
    url: "https://juanikitro.com/",
  },
  {
    slug: "proyecto-04",
    index: "04",
    title: "Nombre del proyecto 04",
    category: "Categoría por definir",
    summary:
      "Resumen breve del proyecto y su aporte principal. Reemplazar con contenido real.",
    context: "Contexto del proyecto a completar.",
    challenge: "Desafío principal a completar.",
    approach: "Enfoque y alcance a completar.",
    decisions: [
      "Primera decisión a documentar.",
      "Segunda decisión a documentar.",
      "Tercera decisión a documentar.",
    ],
    conversionSteps: ["Entrada", "Oferta", "Confianza", "Contacto"],
    outcome: "Resultado verificable a completar.",
    scope: "Alcance por definir",
    visual: "monolith",
    layout: "split-left",
    placeholder: true,
  },
  {
    slug: "proyecto-05",
    index: "05",
    title: "Nombre del proyecto 05",
    category: "Categoría por definir",
    summary:
      "Resumen breve del proyecto y su aporte principal. Reemplazar con contenido real.",
    context: "Contexto del proyecto a completar.",
    challenge: "Desafío principal a completar.",
    approach: "Enfoque y alcance a completar.",
    decisions: [
      "Primera decisión a documentar.",
      "Segunda decisión a documentar.",
      "Tercera decisión a documentar.",
    ],
    conversionSteps: ["Entrada", "Oferta", "Confianza", "Contacto"],
    outcome: "Resultado verificable a completar.",
    scope: "Alcance por definir",
    visual: "delta",
    layout: "split-right",
    placeholder: true,
  },
  {
    slug: "proyecto-06",
    index: "06",
    title: "Nombre del proyecto 06",
    category: "Categoría por definir",
    summary:
      "Resumen breve del proyecto y su aporte principal. Reemplazar con contenido real.",
    context: "Contexto del proyecto a completar.",
    challenge: "Desafío principal a completar.",
    approach: "Enfoque y alcance a completar.",
    decisions: [
      "Primera decisión a documentar.",
      "Segunda decisión a documentar.",
      "Tercera decisión a documentar.",
    ],
    conversionSteps: ["Entrada", "Oferta", "Confianza", "Contacto"],
    outcome: "Resultado verificable a completar.",
    scope: "Alcance por definir",
    visual: "grove",
    layout: "horizon",
    placeholder: true,
  },
] as const satisfies readonly ProjectEntry[];

export const placeholderProjects = projects.filter((project) => project.placeholder);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
