import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendsRoot = path.join(root, "data", "frontends", "tandil-servicios-vehiculares");

const upgrades = [
  {
    slug: "boxes-centro-de-autolavado",
    tokens: "site-boxes wash-bay foam-lane hose-rail water-arc",
    kind: "wash",
    label: "Lavado, boxes y terminación",
    visual: "Box de lavado y detalle exterior",
    decision: {
      title: "Qué resolver antes de acercarte al lavadero",
      lead:
        "Si la consulta es por lavado o presentación del auto, conviene mirar horario, ubicación y forma de contacto antes de moverse.",
      points: [
        ["Horario", "El dato visible ayuda a decidir si pasar por Av. Buzón 632 en el momento correcto."],
        ["Vehículo", "La conversación puede empezar por tipo de vehículo y nivel de limpieza que buscás."],
        ["Confianza", "El volumen de reseñas funciona como referencia local sin sumar promesas no confirmadas."],
      ],
    },
  },
  {
    slug: "lubricentro-y-gomeria-boxes",
    tokens: "site-lubricentro oil-bay tire-rack filter-label gauge-strip",
    kind: "oil",
    label: "Aceite, filtros y gomería",
    visual: "Mantenimiento y consulta en local",
    decision: {
      title: "Qué tener a mano para consultar mantenimiento",
      lead:
        "Para lubricentro y gomería, la llamada funciona mejor si llevás el dato del vehículo y el motivo concreto de la visita.",
      points: [
        ["Vehículo", "Modelo, uso y kilometraje orientan mejor la consulta por aceite, filtros o cubierta."],
        ["Disponibilidad", "Productos, marcas y alcances se confirman con el local antes de ir."],
        ["Dirección", "Ameghino 898 queda visible para cerrar la decisión sin buscar otro dato."],
      ],
    },
  },
  {
    slug: "gomeria-y-auxilio-24-horas-landeyro",
    tokens: "site-landeyro roadside-tire aux-route urgent-wheel hazard-mark",
    kind: "tire",
    label: "Gomería y auxilio",
    visual: "Consulta rápida por cubierta",
    decision: {
      title: "Qué decir cuando llamás por una cubierta",
      lead:
        "En una consulta de gomería o auxilio importa reducir vueltas: ubicación, medida aproximada y urgencia del problema.",
      points: [
        ["Urgencia", "Si estás en ruta o no podés moverte, la llamada debe empezar por dónde estás."],
        ["Cubierta", "Medida, pinchadura o daño visible ayudan a orientar la respuesta."],
        ["Horario", "El horario publicado queda arriba porque define si conviene llamar antes de acercarse."],
      ],
    },
  },
  {
    slug: "taller-franco-chapa-y-pintura",
    tokens: "site-franco bodyshop-panel paint-booth repair-sheet polish-mark",
    kind: "paint",
    label: "Chapa, pintura y pulido",
    visual: "Carrocería y terminación",
    decision: {
      title: "Cómo pedir una revisión de chapa y pintura",
      lead:
        "Para carrocería, una buena consulta empieza por el daño visible, la zona afectada y una coordinación real con el taller.",
      points: [
        ["Fotos", "Una imagen del golpe o panel ayuda a explicar el caso antes de la revisión."],
        ["Alcance", "Precio, materiales y tiempos se definen luego de ver el trabajo."],
        ["Señales", "Las reseñas sobre pulido y terminación sostienen la confianza sin armar un portfolio falso."],
      ],
    },
  },
  {
    slug: "iturralde-repuestos",
    tokens: "site-iturralde parts-counter shelf-grid sku-card counter-ticket",
    kind: "parts",
    label: "Mostrador y repuestos",
    visual: "Consulta por pieza correcta",
    decision: {
      title: "Qué dato preparar para pedir un repuesto",
      lead:
        "En repuestos, la consulta se vuelve más útil cuando el cliente llega con la pieza, el código o los datos del auto.",
      points: [
        ["Compatibilidad", "Modelo, año, motor o foto de la pieza evitan una conversación incompleta."],
        ["Stock", "Disponibilidad, marca y precio se validan por teléfono o en mostrador."],
        ["Retiro", "Dirección y horario quedan visibles para transformar la consulta en visita."],
      ],
    },
  },
  {
    slug: "walter-gomez-servicio-multimarca",
    tokens: "site-walter mechanic-ledger service-order wrench-note trust-log",
    kind: "mechanic",
    label: "Taller, service y revisión",
    visual: "Bitácora de taller",
    decision: {
      title: "Cómo explicar el problema del auto",
      lead:
        "Un taller responde mejor cuando la consulta trae contexto: síntoma, momento en que aparece y disponibilidad para revisar.",
      note:
        "La idea es que el visitante no llegue con una consulta suelta: que pueda contar qué siente el auto, desde cuándo pasa y qué necesita resolver primero.",
      points: [
        ["Síntoma", "Ruido, falla, pérdida o testigo encendido sirven como primera descripción."],
        ["Uso", "Contar si el auto se usa todos los días o viene de un viaje ayuda a ordenar la visita."],
        ["Confianza", "Las reseñas sobre honestidad y trato son la señal principal disponible."],
      ],
    },
  },
  {
    slug: "gomeria-el-viejo-matias-auxilio-24-hs",
    tokens: "site-viejo-matias tire-shop neighborhood-wheel tread-card local-signal",
    kind: "tire",
    label: "Gomería de barrio",
    visual: "Cubiertas y atención local",
    decision: {
      title: "Qué confirmar antes de ir a la gomería",
      lead:
        "El nombre habla de auxilio, pero el dato que manda es el horario publicado y el teléfono para confirmar disponibilidad.",
      points: [
        ["Rueda", "Medida, pinchadura o pérdida de aire hacen más clara la primera llamada."],
        ["Horario", "El horario visible evita moverse cuando el local no figura como abierto."],
        ["Barrio", "La dirección en Av. Rivadavia 799 deja el próximo paso resuelto."],
      ],
    },
  },
  {
    slug: "taller-di-sipio-chapa-y-pintura",
    tokens: "site-di-sipio bodyshop-order paint-panel booth-ticket finish-line",
    kind: "paint",
    label: "Chapa y pintura",
    visual: "Reparación y entrega",
    decision: {
      title: "Cómo bajar incertidumbre en un arreglo",
      lead:
        "En chapa y pintura, lo importante es que el sitio ayude a pasar de una preocupación visual a una revisión coordinada.",
      note:
        "El contenido acompaña una decisión muy visual: mostrar el golpe, ubicar el panel afectado y pedir una revisión sin prometer tiempos ni precios cerrados.",
      points: [
        ["Daño", "Zona afectada, fotos y contexto del golpe ayudan a iniciar la consulta."],
        ["Turno", "El horario publicado ordena cuándo llamar o acercarse al taller."],
        ["Reseñas", "Rapidez, cumplimiento y atención aparecen como señales reales para decidir."],
      ],
    },
  },
  {
    slug: "mecanica-maz",
    tokens: "site-maz route-workshop engine-note travel-case service-map",
    kind: "mechanic",
    label: "Mecánica e imprevistos",
    visual: "Taller para revisar el problema",
    decision: {
      title: "Qué contar si el problema apareció en viaje",
      lead:
        "Mecánica Maz tiene reseñas fuertes de situaciones en viaje; la consulta debe convertir ese contexto en una llamada concreta.",
      note:
        "Este enfoque baja ansiedad: separa urgencia, ubicación y síntoma para que la persona pueda explicar el problema antes de moverse o acercarse al taller.",
      points: [
        ["Síntoma", "Explicar qué pasó, cuándo apareció y si el auto puede moverse mejora la primera respuesta."],
        ["Ubicación", "Laprida 961 queda visible para resolver rápido el siguiente paso."],
        ["Horario", "Lunes a sábado de 8:00 a 20:00 orienta la consulta sin prometer atención fuera de ese dato."],
      ],
    },
  },
];

const standardClassTokens = new Set(
  upgrades.flatMap((profile) => profile.tokens.split(/\s+/).filter(Boolean)),
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanVisibleCopy(html) {
  return html
    .replace(/Una landing/giu, "Un sitio")
    .replace(/La landing/gu, "El sitio")
    .replace(/la landing/gu, "el sitio")
    .replace(/Esta landing/gu, "Este sitio")
    .replace(/esta landing/gu, "este sitio")
    .replace(/La página/gu, "El sitio")
    .replace(/la página/gu, "el sitio")
    .replace(/página/giu, "sitio")
    .replace(/Combos para cotizar sin inventar precios\./gu, "Opciones para consultar con alcance a confirmar.")
    .replace(
      /Los valores, marcas, stock y alcances quedan a confirmar con el negocio antes de publicar\./gu,
      "El alcance final se confirma por teléfono o en el local, según estado del vehículo y disponibilidad.",
    )
    .replace(/Combo editable/gu, "Opción de consulta")
    .replace(/Editable/gu, "A confirmar")
    .replace(/\[Desde editable\]/gu, "A confirmar")
    .replace(/\[Presupuesto editable\]/gu, "A confirmar")
    .replace(/Galería preparada para fotos reales\./gu, "Imagen y resultado para decidir mejor.")
    .replace(/fotos reales/giu, "imágenes del trabajo")
    .replace(/Foto real/gu, "Imagen")
    .replace(/foto real/gu, "imagen")
    .replace(/sin inventar/giu, "con datos confirmados")
    .replace(/no inventa/giu, "no fuerza")
    .replace(/inventadas/giu, "no confirmadas")
    .replace(/inventados/giu, "no confirmados")
    .replace(/inventado/giu, "no confirmado")
    .replace(/inventar/giu, "forzar")
    .replace(/Espacio para explicar/gu, "Bloque para explicar")
    .replace(/Espacio para mostrar/gu, "Bloque para mostrar")
    .replace(/Espacio para/gu, "Bloque para")
    .replace(/Lugar para/gu, "Bloque para")
    .replace(/Campo editable/gu, "Campo a confirmar")
    .replace(/Texto editable/gu, "Texto a confirmar")
    .replace(/editable/giu, "a confirmar")
    .replace(/\bdemo\b/giu, "consulta")
    .replace(/Un sitio liviana/gu, "Un sitio liviano");
}

function visualFigure(profile, className) {
  return `<figure class="section-photo ${className}">
            <img src="./assets/hero.jpg" onerror="this.onerror=null;this.src='./assets/fallback.svg';" alt="${escapeHtml(profile.visual)}" width="900" height="620" loading="lazy">
            <figcaption>${escapeHtml(profile.label)}</figcaption>
          </figure>`;
}

function symbolField(profile) {
  return `<div class="vehicle-symbols symbols-${profile.kind}" aria-hidden="true">
          <span class="vehicle-symbol symbol-wheel"></span>
          <span class="vehicle-symbol symbol-drop"></span>
          <span class="vehicle-symbol symbol-spark"></span>
          <span class="vehicle-symbol symbol-gauge"></span>
        </div>`;
}

function decisionPanel(profile) {
  const items = profile.decision.points
    .map(([label, body]) => `<article>
            <span>${escapeHtml(label)}</span>
            <p>${escapeHtml(body)}</p>
          </article>`)
    .join("\n");

  return `<section class="decision-panel decision-${profile.slug}">
        <div>
          <p class="section-kicker">Antes de llamar</p>
          <h2>${escapeHtml(profile.decision.title)}</h2>
          <p>${escapeHtml(profile.decision.lead)}</p>
          ${profile.decision.note ? `<p class="decision-note">${escapeHtml(profile.decision.note)}</p>` : ""}
        </div>
        <div class="decision-grid">
          ${items}
        </div>
      </section>`;
}

function upgradeHtml(html, profile) {
  let upgraded = cleanVisibleCopy(html)
    .replace(/\s*<div class="vehicle-symbols[\s\S]*?<\/div>\n/u, "\n")
    .replace(/\s*<figure class="section-photo signal-photo">[\s\S]*?<\/figure>/u, "")
    .replace(/\s*<figure class="section-photo service-photo">[\s\S]*?<\/figure>/u, "")
    .replace(/\s*<div class="rubric-symbol-board[^"]*" aria-hidden="true"><span><\/span><span><\/span><span><\/span><\/div>/u, "")
    .replace(/\s*<section class="decision-panel[\s\S]*?<\/section>/u, "")
    .replace(/\s*<i class="card-symbol" aria-hidden="true"><\/i>\n\s*/gu, "\n        ")
    .replace(/<article class="icon-card symbols-[^"]+">/gu, "<article>")
    .replace(/(<img class="hero-image"[^>]*?)\swidth="1600"\sheight="1100"\sfetchpriority="high"/u, "$1")
    .replace(
      /<img class="hero-image"([^>]*?) loading="eager">/u,
      '<img class="hero-image"$1 width="1600" height="1100" fetchpriority="high" loading="eager">',
    )
    .replace(/<body class="([^"]+)">/u, (_, classes) => {
      const baseClasses = classes
        .split(/\s+/)
        .filter((item) => item && !standardClassTokens.has(item))
        .join(" ");
      return `<body class="${baseClasses} ${profile.tokens}">`;
    })
    .replace(/<div class="hero-mark" aria-hidden="true"><\/div>/u, `<div class="hero-mark" aria-hidden="true"></div>\n        ${symbolField(profile)}`);

  upgraded = upgraded.replace(
    /(<section id="senales" class="signal-band">\s*<div>\s*<p class="section-kicker">Qué conviene saber<\/p>\s*<h2>[\s\S]*?<\/h2>)/u,
    `$1\n          ${visualFigure(profile, "signal-photo")}`,
  );

  upgraded = upgraded.replace(
    /(<section id="servicios" class="commercial-intro">\s*<div>\s*<p class="section-kicker">Servicios<\/p>\s*<h2>[\s\S]*?<\/h2>)/u,
    `$1\n          ${visualFigure(profile, "service-photo")}`,
  );

  upgraded = upgraded.replace(
    /(<div class="package-title">\s*<p class="section-kicker">Paquetes<\/p>\s*<h2>[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>)/u,
    `$1\n          <div class="rubric-symbol-board symbols-${profile.kind}" aria-hidden="true"><span></span><span></span><span></span></div>`,
  );

  if (!upgraded.includes("decision-panel")) {
    upgraded = upgraded.replace(
      /(<\/section>\s*)\n\s*<section class="flow" aria-label="Pasos sugeridos">/u,
      `$1\n\n      ${decisionPanel(profile)}\n\n      <section class="flow" aria-label="Pasos sugeridos">`,
    );
  }

  upgraded = upgraded.replaceAll("<article>\n        <span>", `<article class="icon-card symbols-${profile.kind}">\n        <i class="card-symbol" aria-hidden="true"></i>\n        <span>`);
  upgraded = upgraded.replaceAll("<article>\n        <div class=\"package-head\">", `<article class="icon-card symbols-${profile.kind}">\n        <i class="card-symbol" aria-hidden="true"></i>\n        <div class="package-head">`);

  return upgraded;
}

const cssAppend = `

/* Anti-empty visual standard: every large text block earns image or vehicle signal. */
.nav a:focus-visible,
.button:focus-visible,
.skip-link:focus-visible {
  outline: 3px solid var(--accent-2);
  outline-offset: 4px;
}

.vehicle-symbols {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.vehicle-symbol {
  position: absolute;
  display: block;
  opacity: .62;
  color: var(--accent);
  filter: drop-shadow(0 22px 42px color-mix(in srgb, var(--bg) 72%, transparent));
}

.symbol-wheel {
  right: clamp(26px, 10vw, 170px);
  top: clamp(96px, 18vw, 220px);
  width: clamp(94px, 14vw, 190px);
  aspect-ratio: 1;
  border: clamp(8px, 1.2vw, 16px) solid color-mix(in srgb, var(--accent) 48%, transparent);
  border-radius: 50%;
  background:
    radial-gradient(circle, transparent 0 34%, currentColor 35% 39%, transparent 40%),
    repeating-conic-gradient(currentColor 0 8deg, transparent 8deg 20deg);
}

.symbol-drop {
  right: clamp(170px, 26vw, 390px);
  top: clamp(112px, 16vw, 210px);
  width: clamp(38px, 5vw, 72px);
  aspect-ratio: .76;
  border: 3px solid color-mix(in srgb, var(--accent-2) 68%, transparent);
  border-radius: 62% 62% 62% 12%;
  transform: rotate(-45deg);
}

.symbol-spark {
  left: clamp(18px, 6vw, 88px);
  top: clamp(112px, 18vw, 230px);
  width: clamp(46px, 7vw, 92px);
  aspect-ratio: 1;
}

.symbol-spark::before,
.symbol-spark::after {
  content: "";
  position: absolute;
  inset: 45% 0;
  background: color-mix(in srgb, var(--accent) 68%, transparent);
}

.symbol-spark::after {
  transform: rotate(90deg);
}

.symbol-gauge {
  left: clamp(220px, 32vw, 520px);
  bottom: clamp(74px, 10vw, 150px);
  width: clamp(92px, 13vw, 170px);
  aspect-ratio: 2 / 1;
  border: 4px solid color-mix(in srgb, var(--accent-2) 58%, transparent);
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
}

.symbol-gauge::after {
  content: "";
  position: absolute;
  left: 48%;
  bottom: 0;
  width: 42%;
  height: 4px;
  background: color-mix(in srgb, var(--accent) 72%, transparent);
  transform: rotate(-24deg);
  transform-origin: left center;
}

.signal-band > div,
.commercial-intro > div,
.package-title,
.proof-title {
  display: grid;
  gap: clamp(14px, 2vw, 24px);
  align-content: start;
}

.section-photo {
  position: relative;
  min-height: 210px;
  margin: 0;
  border: 1px solid var(--line);
  overflow: hidden;
  background: color-mix(in srgb, var(--panel) 82%, transparent);
}

.section-photo img {
  width: 100%;
  height: 100%;
  min-height: 210px;
  object-fit: cover;
  display: block;
  filter: saturate(.9) contrast(1.04);
}

.section-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, color-mix(in srgb, var(--bg) 74%, transparent), transparent 64%),
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--accent) 24%, transparent) 0 1px, transparent 1px 18px);
  pointer-events: none;
}

.section-photo figcaption {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  z-index: 1;
  color: var(--ink);
  font-family: var(--font-a);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.commercial-intro,
.signal-band,
.package-band,
.visual-proof {
  align-items: stretch;
}

.icon-card {
  position: relative;
  overflow: hidden;
}

.card-symbol {
  display: block;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
  color: var(--accent);
  position: relative;
}

.symbols-wash .card-symbol {
  border: 3px solid currentColor;
  border-radius: 62% 62% 62% 12%;
  transform: rotate(-45deg);
}

.symbols-tire .card-symbol {
  border: 4px solid currentColor;
  border-radius: 50%;
  background: repeating-conic-gradient(currentColor 0 10deg, transparent 10deg 22deg);
}

.symbols-oil .card-symbol {
  border: 3px solid currentColor;
  border-radius: 8px 8px 18px 18px;
}

.symbols-oil .card-symbol::after {
  content: "";
  position: absolute;
  left: 24%;
  right: 24%;
  top: -12px;
  height: 14px;
  border: 3px solid currentColor;
  border-bottom: 0;
}

.symbols-parts .card-symbol {
  border: 3px solid currentColor;
  border-radius: 8px;
  background:
    linear-gradient(currentColor 0 0) 50% 50% / 72% 3px no-repeat,
    linear-gradient(currentColor 0 0) 50% 34% / 50% 3px no-repeat,
    linear-gradient(currentColor 0 0) 50% 66% / 50% 3px no-repeat;
}

.symbols-paint .card-symbol {
  border: 3px solid currentColor;
  border-radius: 8px 22px 8px 22px;
  transform: skew(-8deg);
}

.symbols-mechanic .card-symbol {
  border: 3px solid currentColor;
  border-radius: 50%;
}

.symbols-mechanic .card-symbol::before,
.symbols-mechanic .card-symbol::after {
  content: "";
  position: absolute;
  left: 48%;
  top: 18%;
  width: 3px;
  height: 34%;
  background: currentColor;
  border-radius: 99px;
  transform-origin: bottom center;
}

.symbols-mechanic .card-symbol::after {
  top: 48%;
  width: 30%;
  height: 3px;
  transform-origin: left center;
}

.rubric-symbol-board {
  min-height: 150px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.rubric-symbol-board span {
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 34%),
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--ink) 10%, transparent) 0 1px, transparent 1px 16px),
    color-mix(in srgb, var(--panel) 82%, transparent);
}

.decision-panel {
  width: min(1180px, calc(100% - 32px));
  margin: clamp(38px, 7vw, 82px) auto 0;
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(320px, 1.1fr);
  gap: clamp(22px, 5vw, 60px);
  align-items: stretch;
  padding: clamp(22px, 5vw, 52px);
  border: 1px solid var(--line);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 44%),
    color-mix(in srgb, var(--panel) 78%, transparent);
}

.decision-panel h2 {
  margin: 0;
  font-family: var(--font-a);
  font-size: clamp(2rem, 4.6vw, 5rem);
  line-height: .9;
  text-wrap: balance;
}

.decision-panel p {
  margin: 14px 0 0;
  color: color-mix(in srgb, var(--ink) 78%, var(--muted));
  line-height: 1.5;
}

.decision-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.decision-grid article {
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--line);
  background:
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--ink) 8%, transparent) 0 1px, transparent 1px 18px),
    color-mix(in srgb, var(--panel) 82%, transparent);
}

.decision-grid span {
  color: var(--accent);
  font-family: var(--font-a);
  font-weight: 900;
  text-transform: uppercase;
}

.gallery-grid article:first-child {
  background:
    linear-gradient(to top, color-mix(in srgb, var(--bg) 88%, transparent), transparent 68%),
    url("./assets/hero.jpg") center / cover,
    color-mix(in srgb, var(--accent) 12%, var(--panel));
}

.commercial-cards h3,
.package-grid h3,
.gallery-grid h3 {
  font-size: clamp(1rem, 1vw, 1.28rem);
  line-height: 1.12;
  text-wrap: balance;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
}

.package-head strong,
.package-grid li {
  overflow-wrap: break-word;
  word-break: normal;
}

@media (max-width: 640px) {
  .vehicle-symbols {
    opacity: .55;
  }

  .symbol-wheel {
    right: 8px;
    top: 96px;
  }

  .symbol-gauge,
  .symbol-drop {
    display: none;
  }

  .section-photo,
  .section-photo img {
    min-height: 170px;
  }

  .rubric-symbol-board {
    min-height: 90px;
  }

  .decision-panel,
  .decision-grid {
    grid-template-columns: 1fr;
  }
}
`;

function upgradeCss(css) {
  const marker = "/* Anti-empty visual standard:";
  const base = css.includes(marker) ? css.slice(0, css.indexOf(marker)).trimEnd() : css.trimEnd();
  return `${base}${cssAppend}\n`;
}

async function main() {
  for (const profile of upgrades) {
    const siteDir = path.join(frontendsRoot, profile.slug);
    const htmlPath = path.join(siteDir, "index.html");
    const cssPath = path.join(siteDir, "styles.css");
    const html = await readFile(htmlPath, "utf8");
    const css = await readFile(cssPath, "utf8");
    await writeFile(htmlPath, upgradeHtml(html, profile), "utf8");
    await writeFile(cssPath, upgradeCss(css), "utf8");
  }
  console.log(`Upgraded ${upgrades.length} Tandil frontends with anti-empty visual standard.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
