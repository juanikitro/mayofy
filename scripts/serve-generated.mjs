#!/usr/bin/env node

import { createServer } from "node:http";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const generatedRoot = path.join(root, "generated");

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

function htmlPage(title, body) {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f6f5f1; color: #1d1d1b; }
      main { width: min(1080px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 48px; }
      h1 { margin: 0 0 20px; font-size: 32px; line-height: 1.1; }
      h2 { margin: 28px 0 12px; font-size: 22px; }
      a { color: #174f8a; }
      .grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      .card { background: #fff; border: 1px solid #dfddd5; border-radius: 8px; padding: 16px; box-shadow: 0 1px 2px rgb(0 0 0 / 5%); }
      .meta { color: #66645d; font-size: 14px; margin: 6px 0 12px; }
      .links { display: flex; gap: 12px; flex-wrap: wrap; }
      .button { appearance: none; border: 1px solid #174f8a; border-radius: 999px; background: #174f8a; color: #fff; padding: 8px 12px; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
      .button.secondary { background: transparent; color: #174f8a; }
      .message-actions { margin: 8px 0 10px; }
      .section { background: #fff; border: 1px solid #dfddd5; border-radius: 8px; padding: 18px; margin: 14px 0; }
      ul { padding-left: 22px; }
      li { margin: 6px 0; }
      pre { white-space: pre-wrap; font-family: inherit; background: #f4f3ee; padding: 12px; border-radius: 6px; }
    </style>
  </head>
  <body><main>${body}</main></body>
</html>`;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function isInside(parent, target) {
  const relative = path.relative(parent, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function generatedSessions() {
  const entries = await readdir(generatedRoot, { withFileTypes: true }).catch(() => []);
  const sessions = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const manifestPath = path.join(generatedRoot, entry.name, "manifest.json");
    try {
      const [manifest, info] = await Promise.all([readJson(manifestPath), stat(manifestPath)]);
      if (Array.isArray(manifest.sites)) {
        sessions.push({ name: entry.name, count: manifest.sites.length, mtime: info.mtime });
      }
    } catch {
      // Not a generated run.
    }
  }

  return sessions.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
}

function sendHtml(res, statusCode, title, body) {
  res.writeHead(statusCode, { "content-type": "text/html; charset=utf-8" });
  res.end(htmlPage(title, body));
}

function sendNotFound(res) {
  sendHtml(res, 404, "No encontrado", "<h1>No encontrado</h1>");
}

async function renderHome(res) {
  const sessions = await generatedSessions();
  const cards = sessions
    .map(
      (session) => `<article class="card">
        <h2><a href="/${encodeURIComponent(session.name)}/">${escapeHtml(session.name)}</a></h2>
        <p class="meta">${session.count} negocio(s) · ${escapeHtml(session.mtime.toLocaleString("es-AR"))}</p>
      </article>`,
    )
    .join("");

  sendHtml(res, 200, "Tandas generadas", `<h1>Tandas generadas</h1><div class="grid">${cards || "<p>No hay tandas generadas.</p>"}</div>`);
}

async function renderSession(res, sessionName) {
  const manifest = await readJson(path.join(generatedRoot, sessionName, "manifest.json"));
  if (!Array.isArray(manifest.sites)) {
    sendNotFound(res);
    return;
  }

  const cards = manifest.sites
    .map((site) => {
      const slug = site.slug ?? site.directory;
      return `<article class="card">
        <h2>${escapeHtml(site.name ?? slug)}</h2>
        <p class="meta">${escapeHtml(site.service ?? "")}${site.rating ? ` · ${escapeHtml(site.rating)}` : ""}</p>
        <div class="links">
          <a href="/${encodeURIComponent(sessionName)}/${encodeURIComponent(slug)}/index.html">Landing</a>
          <a href="/${encodeURIComponent(sessionName)}/${encodeURIComponent(slug)}/estudio">Estudio</a>
        </div>
      </article>`;
    })
    .join("");

  sendHtml(res, 200, sessionName, `<p><a href="/">← Todas las tandas</a></p><h1>${escapeHtml(sessionName)}</h1><div class="grid">${cards}</div>`);
}

function listItems(items) {
  const values = Array.isArray(items) ? items.filter((item) => item != null && String(item).trim()) : [];
  return values.length ? `<ul>${values.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "<p>No informado.</p>";
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

async function renderStudy(res, sessionName, slug) {
  const studyPath = path.join(generatedRoot, sessionName, "final-study.json");
  let study;
  try {
    study = await readJson(studyPath);
  } catch {
    sendHtml(
      res,
      200,
      "Estudio pendiente",
      `<p><a href="/${encodeURIComponent(sessionName)}/">← Volver a la tanda</a></p><h1>Estudio pendiente</h1><p>Todavía no se corrió <code>npm run study:final</code> para esta tanda.</p>`,
    );
    return;
  }

  const entry = Array.isArray(study.entries) ? study.entries.find((item) => item.slug === slug) : null;
  if (!entry) {
    sendNotFound(res);
    return;
  }

  const contacts = entry.contacts ?? [];
  const lead = entry.lead_score ?? {};
  const audit = entry.commercial_audit ?? {};
  const outreach = entry.outreach ?? {};
  const objections = Array.isArray(outreach.objection_replies) ? outreach.objection_replies : [];
  const body = `<p><a href="/${encodeURIComponent(sessionName)}/">← Volver a la tanda</a></p>
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
      <p>Probabilidad de contacto: ${escapeHtml(lead.contact_probability ?? "no informada")} · Oportunidad: ${escapeHtml(lead.opportunity ?? "no informada")}</p>
      <h3>Motivos</h3>${listItems(lead.reasons)}
      <h3>Riesgos</h3>${listItems(lead.risks)}
    </section>
    <section class="section">
      <h2>Mini auditoría comercial</h2>
      <p><strong>Problema que resuelve:</strong> ${escapeHtml(audit.problem_solved ?? "No informado.")}</p>
      <p><strong>Ángulo de oferta:</strong> ${escapeHtml(audit.offer_angle ?? "No informado.")}</p>
      <h3>Señales usadas</h3>${listItems(audit.public_signals_used)}
    </section>
    <section class="section">
      <h2>Contacto</h2>
      ${contactList(contacts)}
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
    </section>`;

  sendHtml(res, 200, `Estudio ${entry.business_name ?? slug}`, body);
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    }[extension] ?? "application/octet-stream"
  );
}

async function serveStatic(res, pathname) {
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.resolve(generatedRoot, relativePath);
  if (!isInside(generatedRoot, filePath)) {
    sendNotFound(res);
    return;
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      sendNotFound(res);
      return;
    }
    const body = await readFile(filePath);
    res.writeHead(200, { "content-type": contentType(filePath) });
    res.end(body);
  } catch {
    sendNotFound(res);
  }
}

async function handleRequest(req, res) {
  if (req.method !== "GET") {
    res.writeHead(405, { allow: "GET" });
    res.end("Method not allowed");
    return;
  }

  const url = new URL(req.url ?? "/", "http://localhost");
  const segments = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);

  try {
    if (segments.length === 0) {
      await renderHome(res);
      return;
    }

    if (segments.length === 1 && url.pathname.endsWith("/")) {
      await renderSession(res, segments[0]);
      return;
    }

    if (segments.length === 3 && segments[2] === "estudio") {
      await renderStudy(res, segments[0], segments[1]);
      return;
    }

    await serveStatic(res, url.pathname);
  } catch (error) {
    sendHtml(res, 500, "Error", `<h1>Error</h1><p>${escapeHtml(error instanceof Error ? error.message : String(error))}</p>`);
  }
}

const port = Number.parseInt(argValue(process.argv, "--port", "4310"), 10);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("--port must be a valid TCP port.");
}

createServer((req, res) => {
  void handleRequest(req, res);
}).listen(port, () => {
  console.log(`Generated browser running at http://localhost:${port}`);
});
