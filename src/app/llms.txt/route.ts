import { chatBot, commercialPlans } from "@/content/commercial-plans";
import { extraSeals, extras, extrasCopy } from "@/content/extras";
import { formatUsd } from "@/lib/extras-request";
import { publishedProjects } from "@/content/projects";
import { publicChannels, siteContent } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/*
 * /llms.txt (llmstxt.org): a plain summary for AI assistants and answer
 * engines, built from the same content the page renders so it never drifts.
 */
export const dynamic = "force-static";

export function GET() {
  const url = (path: string) => new URL(path, getSiteUrl()).toString();
  const lines = [
    `# ${siteContent.name}`,
    "",
    `> ${siteContent.descriptor} para negocios de servicios en Argentina y Latinoamérica. ${siteContent.hero.body}`,
    "",
    "## Packs",
    ...commercialPlans.map((plan) => `- ${plan.name} (desde ${plan.price}, ${plan.timeline}): ${plan.description}`),
    "",
    `## ${chatBot.title}`,
    chatBot.description,
    ...chatBot.tiers.map((tier) => `- ${tier.name} (${formatUsd(tier.usd)}, ${tier.timeline}): ${tier.includes}`),
    `- ${chatBot.monthly} ${chatBot.note}`,
    "",
    "## Extras para sumar a un pack",
    `Precios del trabajo de Mayofy. ${extrasCopy.servicesNote}`,
    ...extras
      .filter((extra) => !extra.choice)
      .map(
        (extra) =>
          `- ${extra.title}: ${extra.kind === "from" ? "desde " : ""}${formatUsd(extra.price)}${extra.unit ? ` ${extra.unit}` : ""} (${extraSeals[extra.kind].toLowerCase()}${extra.service ? `; ${extra.service}` : ""})`,
      ),
    "",
    "## Casos",
    ...publishedProjects.map((project) => `- [${project.title}](${url(`/proyectos/${project.slug}`)}): ${project.summary}`),
    "",
    "## Preguntas frecuentes",
    ...siteContent.faq.map((item) => `- ${item.question} ${item.answer}`),
    "",
    "## Contacto",
    `- Sitio: ${url("/")}`,
    `- Agenda: ${siteContent.scheduling.url}`,
    `- Email: ${publicChannels.email}`,
    `- Instagram: ${publicChannels.instagram}`,
    `- Política de privacidad: ${url("/privacidad")}`,
    `- Términos y condiciones: ${url("/terminos")}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
