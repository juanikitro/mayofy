#!/usr/bin/env node

import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const AUTH_USER = "juani";
const AUTH_PASSWORD = "landings";
const AUTH_STORAGE_KEY = "ia-landing-generator.catalog-auth";

function argValue(argv, flag, fallback = null) {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return fallback;
  }
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrlSegment(value) {
  return encodeURIComponent(String(value ?? ""));
}

function isInside(parent, target) {
  const relative = path.relative(path.resolve(parent), path.resolve(target));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function safeJoin(parent, ...segments) {
  const target = path.resolve(parent, ...segments);
  if (!isInside(parent, target)) {
    throw new Error(`Refusing to write outside ${parent}: ${target}`);
  }
  return target;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function discoverRuns(generatedRoot) {
  const entries = await readdir(generatedRoot, { withFileTypes: true }).catch(() => []);
  const runs = [];
  for (const entry of entries) {
    if (entry.isDirectory() && (await fileExists(path.join(generatedRoot, entry.name, "manifest.json")))) {
      runs.push(entry.name);
    }
  }
  return runs.sort();
}

function parseRuns(argv, generatedRoot) {
  const raw = argValue(argv, "--runs") ?? process.env.RUNS_JSON;
  if (!raw) {
    return discoverRuns(generatedRoot);
  }

  const runs = JSON.parse(raw);
  if (!Array.isArray(runs) || runs.some((run) => typeof run !== "string" || !/^[a-z0-9][a-z0-9-]*$/u.test(run))) {
    throw new Error("--runs must be a JSON array of run slugs.");
  }
  return Promise.resolve([...new Set(runs)].sort());
}

function authGuardScript() {
  return `<script>
(() => {
  if (localStorage.getItem(${JSON.stringify(AUTH_STORAGE_KEY)}) !== "ok") {
    location.replace("/");
  }
})();
</script>`;
}

function logoutButton() {
  return `<button class="logout" type="button" onclick="localStorage.removeItem(${JSON.stringify(
    AUTH_STORAGE_KEY,
  )});location.href='/'">Salir</button>`;
}

function page(title, body, { guarded = false } = {}) {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #171713;
        --muted: #67675d;
        --line: #d8d2c3;
        --canvas: #f6f3ea;
        --surface: #fffdf7;
        --accent: #b6402c;
        --accent-2: #1f6c66;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        background:
          linear-gradient(120deg, rgba(182, 64, 44, 0.11), transparent 34%),
          linear-gradient(300deg, rgba(31, 108, 102, 0.12), transparent 38%),
          repeating-linear-gradient(90deg, rgba(23, 23, 19, 0.045), rgba(23, 23, 19, 0.045) 1px, transparent 1px, transparent 54px),
          var(--canvas);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 36px 0 56px; }
      a { color: inherit; }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 30px;
      }
      .brand { font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.76rem; color: var(--muted); }
      h1 { margin: 0; max-width: 880px; font-size: clamp(2.25rem, 6vw, 5.9rem); line-height: 0.95; letter-spacing: 0; }
      h2 { margin: 0; font-size: clamp(1.35rem, 3vw, 2.45rem); line-height: 1.02; letter-spacing: 0; }
      h3 { margin: 22px 0 8px; font-size: 1rem; }
      p { line-height: 1.55; }
      .lead { max-width: 650px; color: var(--muted); font-size: 1.03rem; }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 26px; }
      .card {
        display: grid;
        min-height: 190px;
        grid-template-rows: auto 1fr auto;
        gap: 18px;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: color-mix(in srgb, var(--surface) 94%, transparent);
        text-decoration: none;
        box-shadow: 0 1px 0 rgba(23, 23, 19, 0.04);
      }
      a.card:hover { border-color: var(--accent); box-shadow: 0 16px 36px rgba(23, 23, 19, 0.12); transform: translateY(-2px); }
      .meta { display: flex; flex-wrap: wrap; gap: 8px; color: var(--muted); font-size: 0.82rem; font-weight: 760; }
      .pill { border: 1px solid var(--line); border-radius: 999px; padding: 5px 8px; background: #ffffffa8; }
      .links { display: flex; flex-wrap: wrap; gap: 10px; }
      .button,
      .logout {
        appearance: none;
        border: 1px solid var(--ink);
        border-radius: 999px;
        background: var(--ink);
        color: white;
        padding: 10px 14px;
        font: inherit;
        font-weight: 800;
        text-decoration: none;
        cursor: pointer;
      }
      .button.secondary { background: transparent; color: var(--ink); border-color: var(--line); }
      .message-actions { margin: 8px 0 10px; }
      .section {
        margin-top: 18px;
        padding: 20px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }
      .login-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .login {
        width: min(440px, 100%);
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        padding: 24px;
        box-shadow: 0 24px 70px rgba(23, 23, 19, 0.13);
      }
      label { display: block; margin: 14px 0 6px; color: var(--muted); font-weight: 800; font-size: 0.84rem; }
      input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: white;
        padding: 12px;
        font: inherit;
      }
      .error { min-height: 22px; color: var(--accent); font-weight: 800; }
      pre { white-space: pre-wrap; font: inherit; background: #f1eee4; border-radius: 6px; padding: 12px; overflow: auto; }
      ul { padding-left: 21px; }
      li { margin: 6px 0; }
      @media (max-width: 860px) {
        .grid { grid-template-columns: 1fr; }
        .topbar { align-items: flex-start; }
      }
    </style>
  </head>
  <body>${guarded ? authGuardScript() : ""}${body}</body>
</html>`;
}

function loginPage() {
  return page(
    "Acceso al catalogo",
    `<div class="login-shell">
      <form class="login" id="login-form">
        <p class="brand">ia-landing-generator</p>
        <h1>Catalogo de landings</h1>
        <p class="lead">Acceso interno simple para navegar las sesiones generadas.</p>
        <label for="user">Usuario</label>
        <input id="user" name="user" autocomplete="username" required>
        <label for="password">Clave</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
        <p class="error" id="error" aria-live="polite"></p>
        <button class="button" type="submit">Entrar</button>
      </form>
    </div>
    <script>
(() => {
  const form = document.getElementById("login-form");
  const error = document.getElementById("error");
  if (localStorage.getItem(${JSON.stringify(AUTH_STORAGE_KEY)}) === "ok") {
    location.replace("/catalog/");
    return;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get("user") === ${JSON.stringify(AUTH_USER)} && data.get("password") === ${JSON.stringify(AUTH_PASSWORD)}) {
      localStorage.setItem(${JSON.stringify(AUTH_STORAGE_KEY)}, "ok");
      location.href = "/catalog/";
      return;
    }
    error.textContent = "Credenciales invalidas.";
  });
})();
    </script>`,
  );
}

function catalogHome(sessions) {
  const totalSites = sessions.reduce((sum, session) => sum + session.sites.length, 0);
  const cards = sessions
    .map(
      (session) => `<a class="card" href="/catalog/${safeUrlSegment(session.name)}/">
        <div class="meta"><span class="pill">${session.sites.length} landings</span><span class="pill">${escapeHtml(session.updated)}</span></div>
        <div><h2>${escapeHtml(session.name)}</h2><p class="lead">${escapeHtml(session.summary)}</p></div>
        <strong>Ver sesion</strong>
      </a>`,
    )
    .join("");

  return page(
    "Catalogo de sesiones",
    `<main>
      <div class="topbar"><span class="brand">ia-landing-generator</span>${logoutButton()}</div>
      <h1>Catalogo de sesiones</h1>
      <p class="lead">${totalSites} landings publicas agrupadas por sesion. La URL publica para enviar al negocio esta en cada tarjeta.</p>
      <section class="grid" aria-label="Sesiones generadas">${cards || "<p>No hay sesiones generadas.</p>"}</section>
    </main>`,
    { guarded: true },
  );
}

function sessionPage(session) {
  const cards = session.sites
    .map((site) => {
      const slug = site.slug ?? site.directory;
      const publicUrl = `/${safeUrlSegment(session.name)}/${safeUrlSegment(slug)}/`;
      const studyUrl = `/catalog/${safeUrlSegment(session.name)}/${safeUrlSegment(slug)}/estudio/`;
      return `<article class="card">
        <div class="meta">
          <span class="pill">${escapeHtml(site.service ?? "")}</span>
          <span class="pill">${escapeHtml(site.rating ?? "")}</span>
          <span class="pill">${escapeHtml(site.frontend_mode ?? "frontend")}</span>
        </div>
        <div>
          <h2>${escapeHtml(site.name ?? slug)}</h2>
          <p class="lead">${escapeHtml(site.creative_concept ?? site.creative_layout ?? "Landing generada desde datos verificados.")}</p>
        </div>
        <div class="links">
          <a class="button" href="${publicUrl}">Abrir landing</a>
          <a class="button secondary" href="${studyUrl}">Estudio</a>
        </div>
      </article>`;
    })
    .join("");

  return page(
    session.name,
    `<main>
      <div class="topbar"><a class="button secondary" href="/catalog/">Todas las sesiones</a>${logoutButton()}</div>
      <h1>${escapeHtml(session.name)}</h1>
      <p class="lead">${session.sites.length} landings listas para compartir con URL publica directa.</p>
      <section class="grid" aria-label="Landings de ${escapeHtml(session.name)}">${cards}</section>
    </main>`,
    { guarded: true },
  );
}

function listItems(items) {
  const values = Array.isArray(items) ? items.filter((item) => item != null && String(item).trim()) : [];
  return values.length ? `<ul>${values.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "<p>No informado.</p>";
}

function whatsappMessageUrl(contacts, message) {
  const values = Array.isArray(contacts) ? contacts : [];
  const whatsapp = values.find((contact) => ["whatsapp", "whatsapp_probable"].includes(contact?.medium) && /^https:\/\/wa\.me\/\d+$/u.test(contact?.href));
  const phone = values.find((contact) => contact?.medium === "phone" && /^tel:\+\d+$/u.test(contact?.href));
  const baseUrl = whatsapp?.href || (phone ? `https://wa.me/${phone.href.slice("tel:+".length)}` : "https://wa.me/");
  return `${baseUrl}?text=${encodeURIComponent(message || "")}`;
}

function messageBlock(label, value, contacts) {
  const message = value || "No informado.";
  const encodedMessage = encodeURIComponent(message);
  return `<h3>${escapeHtml(label)}</h3>
    <div class="links message-actions">
      <button class="button secondary" type="button" data-message="${encodedMessage}" onclick="const text=decodeURIComponent(this.dataset.message);if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{this.textContent='Copiado'}).catch(()=>window.prompt('Copiá el mensaje:',text));}else{window.prompt('Copiá el mensaje:',text);}">Copiar</button>
      <a class="button" href="${escapeHtml(whatsappMessageUrl(contacts, message))}" target="_blank" rel="noopener">Abrir WhatsApp</a>
    </div>
    <pre>${escapeHtml(message)}</pre>`;
}

function safeContactHref(value) {
  const href = String(value ?? "");
  if (/^(?:tel:|mailto:)/iu.test(href)) {
    return href;
  }
  try {
    const url = new URL(href);
    if (url.protocol === "https:" && /(?:^|\.)(?:instagram\.com|facebook\.com|fb\.com|wa\.me)$/iu.test(url.hostname)) {
      return url.href;
    }
  } catch {
    // Invalid links are rendered as plain text below.
  }
  return "";
}

function contactList(contacts) {
  const values = Array.isArray(contacts) ? contacts : [];
  if (values.length === 0) {
    return "<p>No se encontraron contactos directos.</p>";
  }
  return `<ul>${values
    .map((contact) => {
      const label = `${contact?.label ?? "Contacto"}: ${contact?.value ?? ""}`;
      const href = safeContactHref(contact?.href);
      return `<li>${href ? `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>` : escapeHtml(label)}</li>`;
    })
    .join("")}</ul>`;
}

function studyPage(sessionName, slug, entry) {
  const contacts = entry?.contacts ?? [];
  const lead = entry?.lead_score ?? {};
  const audit = entry?.commercial_audit ?? {};
  const outreach = entry?.outreach ?? {};
  const objections = Array.isArray(outreach.objection_replies) ? outreach.objection_replies : [];

  if (!entry) {
    return page(
      "Estudio pendiente",
      `<main>
        <div class="topbar"><a class="button secondary" href="/catalog/${safeUrlSegment(sessionName)}/">Volver</a>${logoutButton()}</div>
        <h1>Estudio pendiente</h1>
        <p class="lead">Todavia no se genero el estudio final para ${escapeHtml(slug)}.</p>
      </main>`,
      { guarded: true },
    );
  }

  return page(
    `Estudio ${entry.business_name ?? slug}`,
    `<main>
      <div class="topbar"><a class="button secondary" href="/catalog/${safeUrlSegment(sessionName)}/">Volver</a>${logoutButton()}</div>
      <h1>${escapeHtml(entry.business_name ?? slug)}</h1>
      <section class="section">
        <h2>Mensajes de outreach</h2>
        ${messageBlock("Mensaje inicial", outreach.initial_message, contacts)}
        ${messageBlock("Follow-up 24h", outreach.follow_up_24h, contacts)}
        ${messageBlock("Follow-up 48h", outreach.follow_up_48h, contacts)}
      </section>
      <section class="section">
        <h2>Lead score</h2>
        <p>Prioridad: ${escapeHtml(lead.priority ?? "no informada")}</p>
        <p>Probabilidad de contacto: ${escapeHtml(lead.contact_probability ?? "no informada")} - Oportunidad: ${escapeHtml(lead.opportunity ?? "no informada")}</p>
        <h3>Motivos</h3>${listItems(lead.reasons)}
        <h3>Riesgos</h3>${listItems(lead.risks)}
      </section>
      <section class="section">
        <h2>Mini auditoria comercial</h2>
        <p><strong>Problema que resuelve:</strong> ${escapeHtml(audit.problem_solved ?? "No informado.")}</p>
        <p><strong>Angulo de oferta:</strong> ${escapeHtml(audit.offer_angle ?? "No informado.")}</p>
        <h3>Senales usadas</h3>${listItems(audit.public_signals_used)}
      </section>
      <section class="section">
        <h2>Contacto</h2>
        ${contactList(contacts)}
      </section>
      <section class="section">
        <h2>Referencias de precios en Argentina</h2>
        <p>Relevamiento comercial de julio de 2026 para contextualizar la propuesta; no reemplaza la cotizacion final segun alcance.</p>
        <ul>
          <li><strong>Landing express o basada en plantilla:</strong> AR$ 90.000 a AR$ 200.000.</li>
          <li><strong>Landing profesional para un negocio:</strong> AR$ 200.000 a AR$ 500.000.</li>
          <li><strong>Landing a medida con integraciones, metricas o automatizaciones:</strong> desde AR$ 500.000.</li>
        </ul>
      </section>
      <section class="section">
        <h2>Objeciones</h2>
        ${objections.length ? objections.map((item) => `<p><strong>${escapeHtml(item.objection)}</strong><br>${escapeHtml(item.reply)}</p>`).join("") : "<p>No informado.</p>"}
      </section>
      <section class="section">
        <h2>Mejoras sugeridas</h2>
        ${listItems(audit.suggested_improvements)}
      </section>
      <section class="section">
        <h2>Datos a pedir</h2>
        ${listItems(audit.owner_data_to_request)}
      </section>
    </main>`,
    { guarded: true },
  );
}

function redirectPage(target) {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0; url=${escapeHtml(target)}">
    <title>Redireccionando</title>
  </head>
  <body><a href="${escapeHtml(target)}">Ir al catalogo</a><script>location.replace(${JSON.stringify(target)});</script></body>
</html>`;
}

async function readSession(generatedRoot, runName) {
  const sessionDir = path.join(generatedRoot, runName);
  const manifestPath = path.join(sessionDir, "manifest.json");
  const [manifest, info] = await Promise.all([readJson(manifestPath), stat(manifestPath)]);
  if (!Array.isArray(manifest.sites)) {
    throw new Error(`${manifestPath} must contain a sites array.`);
  }

  return {
    name: runName,
    generatedDir: sessionDir,
    sites: manifest.sites,
    updated: info.mtime.toLocaleString("es-AR"),
    summary: `${manifest.sites.length} landing(s) generadas`,
  };
}

async function copyPublicLanding(session, site, outRoot) {
  const directory = site.directory ?? site.slug;
  if (!directory || typeof directory !== "string") {
    throw new Error(`${session.name}: manifest site is missing directory.`);
  }

  const source = path.resolve(session.generatedDir, directory);
  if (!isInside(session.generatedDir, source)) {
    throw new Error(`${session.name}/${directory}: source escapes generated session.`);
  }

  const target = safeJoin(outRoot, session.name, directory);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true });
}

async function writeSessionStudies(session, outRoot) {
  const studyPath = path.join(session.generatedDir, "final-study.json");
  let entries = [];
  if (await fileExists(studyPath)) {
    const study = await readJson(studyPath);
    entries = Array.isArray(study.entries) ? study.entries : [];
  }

  for (const site of session.sites) {
    const slug = site.slug ?? site.directory;
    const entry = entries.find((item) => item.slug === slug);
    const studyDir = safeJoin(outRoot, "catalog", session.name, slug, "estudio");
    await mkdir(studyDir, { recursive: true });
    await writeFile(path.join(studyDir, "index.html"), studyPage(session.name, slug, entry), "utf8");
  }
}

async function buildCatalog() {
  const root = process.cwd();
  const generatedRoot = path.join(root, "generated");
  const outRoot = path.resolve(root, argValue(process.argv, "--out", path.join("dist", "vercel-catalog")));
  const runs = await parseRuns(process.argv, generatedRoot);

  await rm(outRoot, { recursive: true, force: true });
  await mkdir(outRoot, { recursive: true });

  const sessions = [];
  for (const runName of runs) {
    const session = await readSession(generatedRoot, runName);
    sessions.push(session);

    for (const site of session.sites) {
      await copyPublicLanding(session, site, outRoot);
    }

    const runRoot = safeJoin(outRoot, session.name);
    await mkdir(runRoot, { recursive: true });
    await writeFile(path.join(runRoot, "index.html"), redirectPage(`/catalog/${safeUrlSegment(session.name)}/`), "utf8");

    const sessionCatalogDir = safeJoin(outRoot, "catalog", session.name);
    await mkdir(sessionCatalogDir, { recursive: true });
    await writeFile(path.join(sessionCatalogDir, "index.html"), sessionPage(session), "utf8");
    await writeSessionStudies(session, outRoot);
  }

  const catalogDir = safeJoin(outRoot, "catalog");
  await mkdir(catalogDir, { recursive: true });
  await writeFile(path.join(outRoot, "index.html"), loginPage(), "utf8");
  await writeFile(path.join(catalogDir, "index.html"), catalogHome(sessions), "utf8");
  await writeFile(path.join(outRoot, "404.html"), redirectPage("/catalog/"), "utf8");
  await writeFile(path.join(outRoot, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf8");
  await writeFile(
    path.join(outRoot, "vercel.json"),
    `${JSON.stringify(
      {
        cleanUrls: true,
        trailingSlash: true,
        headers: [{ source: "/(.*)", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }],
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  const totalSites = sessions.reduce((sum, session) => sum + session.sites.length, 0);
  console.log(`Built Vercel catalog in ${outRoot} (${sessions.length} session(s), ${totalSites} landing(s)).`);
}

buildCatalog().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
