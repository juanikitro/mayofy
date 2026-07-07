import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { flagValue, resolveGeneratedDir } from "../generated-output.js";

type Severity = "blocker" | "warning";

type ReadinessIssue = {
  severity: Severity;
  code: string;
  slug: string;
  message: string;
};

type SiteRecord = {
  slug: string;
  business_id: string;
  name: string;
  frontend_mode?: "renderer-fallback" | "agent-static" | "agent-framework";
  directory: string;
};

type SiteJson = {
  site_spec?: {
    conversion_template?: string | null;
    design_brief?: {
      market_position?: string;
      visual_thesis?: string;
      copy_voice?: string;
      layout_signature?: string;
      asset_plan?: string;
      ai_fill_plan?: {
        copy?: string[];
        imagery?: string[];
        boundaries?: string[];
      };
      anti_patterns?: string[];
      rewrite_targets?: string[];
    } | null;
  } | null;
};

type Manifest = {
  sites: SiteRecord[];
};

type Args = {
  outDir: string;
  reportPath: string;
  minScore: number;
  slug: string | null;
};

const internalCopyPatterns = [
  /\bla\s+p[aá]gina\b/iu,
  /\blanding\b/iu,
  /\bfrontend\b/iu,
  /\btemplate\b/iu,
  /\bplaceholder\b/iu,
  /\beditable\b/iu,
  /\bdemo\b/iu,
  /\bmock\b/iu,
  /\bfotos?\s+reales\b/iu,
  /\bsin\s+inventar\b/iu,
  /\bdatos?\s+p[uú]blicos?\b/iu,
  /\bcreado\s+con\s+ia\b/iu,
  /\bgenerad[oa]s?\b/iu,
  /\[[^\]]+\]/u,
];

const weakCopyPatterns = [
  /soluciones integrales/iu,
  /calidad garantizada/iu,
  /experiencia unica/iu,
  /servicio de excelencia/iu,
  /mejor opcion/iu,
  /tu mejor aliado/iu,
  /profesionales altamente capacitados/iu,
  /compromiso con la excelencia/iu,
];

const requiredSignals = [
  { code: "hero_claim", label: "claim/hero", pattern: /\b(consultar|reservar|llamar|turno|resultado|limpio|repuesto|auxilio|taller|detalle|chapa|pintura)\b/iu },
  { code: "trust_signal", label: "confianza", pattern: /\b(valoraci[oó]n|reseñas|clientes?|confianza|atenci[oó]n|rating)\b/iu },
  { code: "service_signal", label: "servicios", pattern: /\b(servicios?|lavado|repuestos?|mec[aá]nica|gomer[ií]a|chapa|pintura|detailing|lubricentro)\b/iu },
  { code: "offer_signal", label: "oferta/paquetes", pattern: /\b(paquetes?|combos?|planes?|servicio|consulta|cotizar|presupuesto)\b/iu },
  { code: "visual_proof", label: "galeria/antes-despues", pattern: /\b(galer[ií]a|antes|despu[eé]s|fotos?|resultado|terminaci[oó]n)\b/iu },
  { code: "process_signal", label: "proceso", pattern: /\b(proceso|pasos?|primero|coordinar|confirmar|01|02|03)\b/iu },
  { code: "final_cta", label: "CTA final", pattern: /\b(consultar|reservar|llamar|whatsapp|turno|contacto)\b/iu },
];

function parseArgs(argv: string[]): Args {
  const outDir = resolveGeneratedDir(argv, { positionalIndex: 2, fallbackSession: "tandil" });
  const minScoreRaw = flagValue(argv, "--min-score", "85") ?? "85";
  const minScore = Number.parseInt(minScoreRaw, 10);
  const slug = flagValue(argv, "--slug", flagValue(argv, "--only", "") ?? "") ?? "";

  return {
    outDir,
    reportPath: flagValue(argv, "--report", path.join(outDir, "client-readiness-report.md")) ?? path.join(outDir, "client-readiness-report.md"),
    minScore: Number.isFinite(minScore) ? minScore : 85,
    slug: slug ? slug.trim() : null,
  };
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/giu, " ")
    .replace(/<style[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/&nbsp;/giu, " ")
    .replace(/&amp;/giu, "&")
    .replace(/&quot;/giu, '"')
    .replace(/&#039;/giu, "'")
    .replace(/\s+/gu, " ")
    .trim();
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function extractClasses(html: string): Set<string> {
  const classes = new Set<string>();
  for (const match of html.matchAll(/\bclass="([^"]+)"/giu)) {
    for (const item of match[1].split(/\s+/u)) {
      if (item.trim()) {
        classes.add(item.trim());
      }
    }
  }
  return classes;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const intersection = [...a].filter((item) => b.has(item)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function countWords(text: string): number {
  return text.split(/\s+/u).filter(Boolean).length;
}

function countMatches(text: string, pattern: RegExp): number {
  return [...text.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`))].length;
}

function imageTags(html: string): string[] {
  return [...html.matchAll(/<img\b[^>]*>/giu)].map((match) => match[0]);
}

function anchorTags(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/giu)].map((match) => match[0]);
}

function issue(severity: Severity, code: string, slug: string, message: string): ReadinessIssue {
  return { severity, code, slug, message };
}

async function readManifest(outDir: string): Promise<Manifest> {
  return JSON.parse(await readFile(path.join(outDir, "manifest.json"), "utf8")) as Manifest;
}

async function auditSite(outDir: string, site: SiteRecord): Promise<{ classes: Set<string>; issues: ReadinessIssue[]; score: number }> {
  const issues: ReadinessIssue[] = [];
  const siteDir = path.join(outDir, site.directory);
  const html = await readFile(path.join(siteDir, "index.html"), "utf8");
  const css = await readFile(path.join(siteDir, "styles.css"), "utf8");
  let siteJson: SiteJson | null = null;
  try {
    siteJson = JSON.parse(await readFile(path.join(siteDir, "site.json"), "utf8")) as SiteJson;
  } catch {
    siteJson = null;
  }
  const visibleText = stripTags(html);
  const normalizedText = normalize(visibleText);
  const classes = extractClasses(html);
  const spec = siteJson?.site_spec ?? null;

  if (!site.frontend_mode || site.frontend_mode === "renderer-fallback") {
    issues.push(issue("blocker", "renderer_fallback", site.slug, "usa renderer fallback; no es entregable cliente."));
  }

  if (!spec?.conversion_template) {
    issues.push(issue("blocker", "missing_conversion_template", site.slug, "no tiene conversion_template; falta una estructura comercial elegida."));
  }

  if (!spec?.design_brief) {
    issues.push(issue("blocker", "missing_design_brief", site.slug, "no tiene design_brief; falta tesis visual, plan de IA segura y objetivos de remake."));
  } else {
    const brief = spec.design_brief;
    const aiCopy = brief.ai_fill_plan?.copy ?? [];
    const aiImagery = brief.ai_fill_plan?.imagery ?? [];
    const aiBoundaries = brief.ai_fill_plan?.boundaries ?? [];
    const briefText = [
      brief.market_position ?? "",
      brief.visual_thesis ?? "",
      brief.copy_voice ?? "",
      brief.layout_signature ?? "",
      brief.asset_plan ?? "",
      ...aiCopy,
      ...aiImagery,
      ...aiBoundaries,
      ...(brief.anti_patterns ?? []),
      ...(brief.rewrite_targets ?? []),
    ].join(" ");

    if ((brief.visual_thesis ?? "").length < 80) {
      issues.push(issue("blocker", "thin_visual_thesis", site.slug, "design_brief.visual_thesis es demasiado fina para guiar una UI real."));
    }
    if ((brief.layout_signature ?? "").length < 80) {
      issues.push(issue("blocker", "thin_layout_signature", site.slug, "design_brief.layout_signature no describe una estructura de conversion concreta."));
    }
    if (!/IA|imagen|foto|escena|textura|visual/iu.test(brief.asset_plan ?? "") || aiImagery.length < 2) {
      issues.push(issue("blocker", "weak_ai_imagery_plan", site.slug, "falta plan claro para poblar visualmente con imagenes genericas seguras cuando los assets reales son pobres."));
    }
    if (aiCopy.length < 2 || !/microcopy|copy|CTA|secci[oó]n|paquete|rese[ñn]a/iu.test(briefText)) {
      issues.push(issue("blocker", "weak_ai_copy_plan", site.slug, "falta plan claro para enriquecer copy sin depender de datos pobres."));
    }
    if (!aiBoundaries.some((entry) => /precio|stock|marca|a[nñ]o|premio|garant|servicio|rese[ñn]a/iu.test(entry))) {
      issues.push(issue("blocker", "missing_ai_boundaries", site.slug, "el plan de IA no bloquea explicitamente datos comerciales falsos."));
    }
  }

  if (countWords(visibleText) < 420) {
    issues.push(issue("blocker", "thin_copy", site.slug, "menos de 420 palabras visibles; probablemente se siente flaca."));
  }

  for (const pattern of internalCopyPatterns) {
    if (pattern.test(visibleText)) {
      issues.push(issue("blocker", "internal_copy", site.slug, `copy visible contiene lenguaje interno o placeholder: ${pattern}.`));
    }
  }

  for (const pattern of weakCopyPatterns) {
    if (pattern.test(visibleText)) {
      issues.push(issue("blocker", "weak_copy", site.slug, `copy visible contiene frase generica: ${pattern}.`));
    }
  }

  for (const signal of requiredSignals) {
    if (!signal.pattern.test(normalizedText)) {
      issues.push(issue("blocker", signal.code, site.slug, `falta senal comercial de ${signal.label}.`));
    }
  }

  const ctaCount = anchorTags(html).filter((tag) => /\b(consultar|reservar|llamar|turno|contacto|whatsapp)\b/iu.test(stripTags(tag))).length;
  if (ctaCount < 2) {
    issues.push(issue("blocker", "weak_cta", site.slug, `solo ${ctaCount} CTA(s) claros; minimo 2.`));
  }

  const telLinks = countMatches(html, /href="tel:/iu);
  if (telLinks < 1) {
    issues.push(issue("warning", "missing_tel_link", site.slug, "no hay link tel: visible para contacto directo."));
  }

  const imgs = imageTags(html);
  if (imgs.length === 0) {
    issues.push(issue("blocker", "missing_image", site.slug, "no hay imagen principal o visual real."));
  }
  for (const img of imgs) {
    if (!/\balt="/iu.test(img)) {
      issues.push(issue("blocker", "image_alt", site.slug, "hay una imagen sin alt."));
    }
    if (!/\b(width|height)="/iu.test(img)) {
      issues.push(issue("warning", "image_dimensions", site.slug, "imagen sin width/height explicitos; puede generar CLS."));
    }
  }

  if (!/<main\b/iu.test(html) || !/<section\b/iu.test(html)) {
    issues.push(issue("blocker", "semantic_html", site.slug, "faltan landmarks HTML semanticos suficientes."));
  }

  if (!/skip-link|Saltar\s+al\s+contenido|Saltar\s+al\s+contacto/iu.test(html)) {
    issues.push(issue("warning", "skip_link", site.slug, "no se encontro skip link."));
  }

  if (!/@media\s*\(\s*max-width/iu.test(css)) {
    issues.push(issue("blocker", "responsive_css", site.slug, "no se encontro media query responsive."));
  }

  if (!/focus-visible/iu.test(css)) {
    issues.push(issue("blocker", "focus_state", site.slug, "faltan estilos :focus-visible para navegacion por teclado."));
  }

  if (/transition\s*:\s*all\b/iu.test(css)) {
    issues.push(issue("warning", "transition_all", site.slug, "usa transition: all; listar propiedades."));
  }

  if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/iu.test(html)) {
    issues.push(issue("blocker", "disabled_zoom", site.slug, "deshabilita zoom en mobile."));
  }

  const headingCount = countMatches(html, /<h[1-3]\b/iu);
  if (headingCount < 6) {
    issues.push(issue("warning", "heading_depth", site.slug, `solo ${headingCount} headings h1-h3; revisar jerarquia y escaneabilidad.`));
  }

  const blockers = issues.filter((item) => item.severity === "blocker").length;
  const warnings = issues.filter((item) => item.severity === "warning").length;
  const score = Math.max(0, 100 - blockers * 12 - warnings * 4);

  return { classes, issues, score };
}

function renderMarkdownReport(params: {
  outDir: string;
  slug: string | null;
  minScore: number;
  averageScore: number;
  decision: string;
  issues: ReadinessIssue[];
  scores: Map<string, number>;
}): string {
  const bySlug = new Map<string, ReadinessIssue[]>();
  for (const item of params.issues) {
    bySlug.set(item.slug, [...(bySlug.get(item.slug) ?? []), item]);
  }

  const lines = [
    "# Client Readiness Audit",
    "",
    `- output: \`${params.outDir}\``,
    ...(params.slug ? [`- slug: \`${params.slug}\``] : []),
    `- decision: **${params.decision}**`,
    `- average_score: ${params.averageScore.toFixed(0)} / 100`,
    `- min_score: ${params.minScore}`,
    "",
    "## Scores",
    "",
    ...[...params.scores.entries()].map(([slug, score]) => `- ${slug}: ${score} / 100`),
    "",
    "## Issues",
    "",
  ];

  if (params.issues.length === 0) {
    lines.push("No issues found.");
  } else {
    for (const [slug, items] of bySlug) {
      lines.push(`### ${slug}`, "");
      for (const item of items) {
        lines.push(`- ${item.severity.toUpperCase()} \`${item.code}\`: ${item.message}`);
      }
      lines.push("");
    }
  }

  lines.push(
    "## Human Gate",
    "",
    "Even if this audit passes, the agent must still inspect desktop and mobile screenshots and answer: would I send this to a real paying client without caveats?",
    "",
  );

  return `${lines.join("\n")}\n`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const manifest = await readManifest(args.outDir);
  const sites = args.slug ? manifest.sites.filter((site) => site.slug === args.slug) : manifest.sites;
  if (args.slug && sites.length === 0) {
    throw new Error(`No site with slug "${args.slug}" found in ${args.outDir}/manifest.json.`);
  }

  const allIssues: ReadinessIssue[] = [];
  const scores = new Map<string, number>();
  const classesBySlug = new Map<string, Set<string>>();

  for (const site of sites) {
    const result = await auditSite(args.outDir, site);
    classesBySlug.set(site.slug, result.classes);
    scores.set(site.slug, result.score);
    allIssues.push(...result.issues);
  }

  for (let index = 1; index < sites.length; index += 1) {
    const previous = sites[index - 1];
    const current = sites[index];
    const similarity = jaccard(classesBySlug.get(previous.slug) ?? new Set(), classesBySlug.get(current.slug) ?? new Set());
    if (similarity >= 0.86) {
      allIssues.push(
        issue(
          "blocker",
          "template_family",
          current.slug,
          `estructura de clases ${Math.round(similarity * 100)}% igual a ${previous.slug}; se siente familia de template.`,
        ),
      );
      scores.set(current.slug, Math.max(0, (scores.get(current.slug) ?? 100) - 12));
    }
  }

  const averageScore = [...scores.values()].reduce((sum, score) => sum + score, 0) / Math.max(scores.size, 1);
  const blockerCount = allIssues.filter((item) => item.severity === "blocker").length;
  const decision = blockerCount === 0 && averageScore >= args.minScore ? "CLIENT_READY" : "NOT_READY";

  const report = renderMarkdownReport({
    outDir: args.outDir,
    slug: args.slug,
    minScore: args.minScore,
    averageScore,
    decision,
    issues: allIssues,
    scores,
  });
  await mkdir(path.dirname(args.reportPath), { recursive: true });
  await writeFile(args.reportPath, report, "utf8");

  const summary = `Client readiness audit: ${decision} (${averageScore.toFixed(0)} / 100). Report: ${args.reportPath}`;
  if (decision === "CLIENT_READY") {
    console.log(summary);
  } else {
    console.error(summary);
    for (const item of allIssues.filter((entry) => entry.severity === "blocker").slice(0, 20)) {
      console.error(`- ${item.slug}: ${item.code} - ${item.message}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
