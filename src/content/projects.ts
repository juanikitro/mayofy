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
  placeholder: true;
};

export const projects = [
  {
    slug: "proyecto-01",
    index: "01",
    title: "Nombre del proyecto 01",
    category: "Categoría por definir",
    summary:
      "Resumen breve del negocio, el desafío y la solución construida. Reemplazar con contenido real.",
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
    scope: "Alcance por definir",
    visual: "threshold",
    layout: "split-left",
    placeholder: true,
  },
  {
    slug: "proyecto-02",
    index: "02",
    title: "Nombre del proyecto 02",
    category: "Categoría por definir",
    summary:
      "Resumen breve del negocio, el desafío y la solución construida. Reemplazar con contenido real.",
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
    scope: "Alcance por definir",
    visual: "current",
    layout: "split-right",
    placeholder: true,
  },
  {
    slug: "proyecto-03",
    index: "03",
    title: "Nombre del proyecto 03",
    category: "Categoría por definir",
    summary:
      "Resumen breve del negocio, el desafío y la solución construida. Reemplazar con contenido real.",
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
    scope: "Alcance por definir",
    visual: "canopy",
    layout: "horizon",
    placeholder: true,
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

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
