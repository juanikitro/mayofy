export type ProjectVisualVariant =
  | "threshold"
  | "current"
  | "canopy"
  | "monolith"
  | "delta"
  | "grove";

export type ProjectPortalLayout = "split-left" | "split-right" | "horizon";

/**
 * A screenshot of a project for the works index preview. Drop the file in
 * public/images/proyectos/<slug>/ and list it here; with none, the preview
 * shows a placeholder in the site's style (see WorksIndex).
 */
export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  /** Desktop screenshots, in order; the works index previews the first. */
  images: readonly ProjectImage[];
  /** Optional phone screenshot shown beside the desktop one in the preview. */
  phoneImage?: ProjectImage;
  url?: string;
};

export const projects = [
  {
    slug: "shineapp",
    index: "01",
    title: "Sistema de gestión para lavaderos",
    category: "Sistema a medida",
    summary:
      "Sistema para que lavaderos de autos manejen clientes, servicios y la agenda del día.",
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
    images: [
      { src: "/images/proyectos/shineapp/panel.jpg", alt: "Panel de ShineApp con la agenda del día, los indicadores del período y la caja por categoría", width: 1440, height: 900 },
      { src: "/images/proyectos/shineapp/escritorio.jpg", alt: "Pantalla de acceso de ShineApp", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/shineapp/celular.jpg", alt: "Indicadores del período en ShineApp, en el celular", width: 390, height: 844 },
    url: "https://shineapp.lat/",
  },
  {
    slug: "consignataria-hacienda",
    index: "02",
    title: "Página para una consignataria de hacienda",
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
    images: [
      { src: "/images/proyectos/consignataria-hacienda/escritorio.jpg", alt: "Inicio de la landing de la consignataria: hacienda pastando y la propuesta con sus botones de contacto", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/consignataria-hacienda/celular.jpg", alt: "Cotizador de hacienda de la consignataria en el celular", width: 390, height: 844 },
    url: "https://gymg.com.ar/",
  },
  {
    slug: "portfolio-desarrollador",
    index: "03",
    title: "Web personal de un programador",
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
    images: [
      { src: "/images/proyectos/portfolio-desarrollador/escritorio.jpg", alt: "Inicio del portfolio en tema oscuro, con el titular y los proyectos SISOC y ShineApp", width: 1440, height: 900 },
    ],
    phoneImage: { src: "/images/proyectos/portfolio-desarrollador/celular.jpg", alt: "Mapa de sistemas del portfolio en el celular", width: 390, height: 844 },
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
    images: [],
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
    images: [],
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
    images: [],
  },
] as const satisfies readonly ProjectEntry[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
