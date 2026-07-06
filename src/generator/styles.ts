import type { Archetype } from "../archetypes/index.js";
import type { ResolvedDesign } from "../design/palette.js";

export function renderStyles(archetype: Archetype, design: ResolvedDesign): string {
  const supporting = design.supporting[0] ?? "#f6f4ef";
  const muted = design.supporting[1] ?? "#6f777b";
  const isDark = archetype.id === "automotive-premium-dark" || archetype.id === "bold-hero-photo" || archetype.id === "modern-conversion-landing";

  return `:root {
  --ink: ${isDark ? "#f7f4ec" : "#1d2325"};
  --muted: ${muted};
  --canvas: ${design.dominant};
  --surface: ${supporting};
  --accent: ${design.accent};
  --line: color-mix(in srgb, var(--ink) 18%, transparent);
  --primary-font: "${design.primaryFont}", "Segoe UI", sans-serif;
  --secondary-font: "${design.secondaryFont}", Georgia, serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: var(--secondary-font);
  min-height: 100vh;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 28%),
    linear-gradient(120deg, color-mix(in srgb, var(--ink) 5%, transparent), transparent 44%);
  pointer-events: none;
}

main {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 18px 0;
  backdrop-filter: blur(18px);
}

.site-nav a {
  color: inherit;
  text-decoration: none;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--canvas) 78%, transparent);
  padding: 8px 12px;
  font-family: var(--primary-font);
  font-weight: 800;
  font-size: 0.9rem;
}

.hero {
  min-height: 78vh;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: clamp(28px, 6vw, 72px);
  align-items: center;
  padding: 28px 0 32px;
}

.layout-stacked .hero,
.layout-editorial .hero {
  grid-template-columns: 1fr;
  min-height: auto;
}

.layout-cards .hero,
.layout-conversion .hero {
  min-height: 72vh;
}

.composition-poster-bay .hero {
  grid-template-columns: minmax(0, 0.86fr) minmax(320px, 1.14fr);
}

.composition-route-card .hero {
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr);
}

.composition-route-card .hero-copy {
  order: 2;
}

.composition-service-ledger .hero {
  min-height: 58vh;
}

.composition-photo-board .hero-media {
  transform: rotate(-1.2deg);
}

.hero-copy {
  max-width: 680px;
}

.eyebrow,
.section-label,
.facts span {
  font-family: var(--primary-font);
  text-transform: uppercase;
  letter-spacing: 0;
  font-weight: 700;
  color: var(--accent);
}

h1,
h2,
strong {
  font-family: var(--primary-font);
}

h1 {
  margin: 0;
  font-size: clamp(3rem, 6.2vw, 6.2rem);
  line-height: 0.94;
  letter-spacing: 0;
  text-wrap: balance;
}

h2 {
  margin: 0 0 16px;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1;
  letter-spacing: 0;
}

p {
  font-size: 1.05rem;
  line-height: 1.65;
}

.lead {
  max-width: 590px;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
}

.service-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.service-pills span {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 24%, transparent);
  padding: 9px 13px;
  font-family: var(--primary-font);
  font-weight: 800;
}

.cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
  font-family: var(--primary-font);
  font-weight: 800;
  transition: transform 160ms ease, background 160ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button.primary {
  background: var(--accent);
  color: #111;
  border-color: var(--accent);
}

.button.secondary {
  background: color-mix(in srgb, var(--surface) 24%, transparent);
}

.hero-media {
  min-height: 420px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 46%, transparent);
  overflow: hidden;
  position: relative;
  box-shadow: 0 22px 70px color-mix(in srgb, #000 28%, transparent);
}

.hero-media::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 42%;
  background: linear-gradient(to top, color-mix(in srgb, #000 42%, transparent), transparent);
  pointer-events: none;
}

.hero-photo,
.photo-placeholder {
  width: 100%;
  height: 100%;
  min-height: 420px;
  display: block;
  object-fit: cover;
}

.hero-badge {
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: grid;
  gap: 4px;
  min-width: 132px;
  background: color-mix(in srgb, var(--canvas) 82%, transparent);
  border: 1px solid var(--line);
  padding: 14px;
}

.hero-badge span {
  font-family: var(--primary-font);
  color: var(--accent);
  font-weight: 900;
  text-transform: uppercase;
}

.hero-badge strong {
  font-size: 2.2rem;
  line-height: 1;
}

.photo-placeholder {
  display: grid;
  place-items: center;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 28%, transparent), transparent 44%),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 10%, transparent), color-mix(in srgb, var(--ink) 10%, transparent) 1px, transparent 1px, transparent 18px);
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 24px 0 28px;
}

.facts article,
.review-card,
.location {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 18%, transparent);
  padding: 22px;
}

.facts strong {
  display: block;
  margin-top: 10px;
  font-size: 1.25rem;
}

.proof-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 0 0 88px;
}

.proof-strip p {
  margin: 0;
  min-height: 116px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--accent) 13%, transparent);
  padding: 16px;
  font-family: var(--primary-font);
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.35;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 1.1fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: start;
  margin-bottom: 80px;
}

.resource-list {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 28px 0 0;
  list-style: none;
}

.resource-list li {
  border-left: 4px solid var(--accent);
  background: color-mix(in srgb, var(--surface) 22%, transparent);
  padding: 14px 16px;
  line-height: 1.45;
}

.review-list {
  display: grid;
  gap: 12px;
}

.review-list .section-label {
  margin: 0;
}

blockquote {
  margin: 0 0 16px;
  font-size: 1.08rem;
  line-height: 1.55;
}

figcaption {
  color: var(--muted);
}

.location {
  margin-bottom: 64px;
}

.location h2 {
  font-size: clamp(2rem, 4.4vw, 4.4rem);
}

.contact-line {
  font-family: var(--primary-font);
  font-size: clamp(1.35rem, 2.4vw, 2.4rem);
  font-weight: 900;
  line-height: 1.08;
  overflow-wrap: anywhere;
}

.mood-roadside-urgent {
  --line: color-mix(in srgb, var(--accent) 30%, transparent);
}

.mood-roadside-urgent .hero {
  border-top: 3px solid var(--accent);
}

.mood-workshop-trust .facts article {
  border-left: 5px solid var(--accent);
}

.mood-precision-service .service-pills span {
  border-radius: 999px;
}

.mood-neighborhood-direct .hero-media {
  border-radius: 0 0 56px 0;
}

.mood-fleet-utility .proof-strip p {
  min-height: 92px;
}

.hours-block {
  margin: 0 0 80px;
}

.hours-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}

.hours-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 22%, transparent);
  padding: 14px 16px;
}

.hours-list span {
  font-family: var(--primary-font);
  font-weight: 800;
}

.hours-list strong {
  text-align: right;
  font-size: 1rem;
}

.hours-list .is-closed {
  opacity: 0.72;
}

footer {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 36px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

@media (max-width: 820px) {
  .hero,
  .content-grid,
  .facts,
  .hours-list,
  .proof-strip {
    grid-template-columns: 1fr;
  }

  .site-nav {
    justify-content: flex-start;
    overflow-x: auto;
  }

  .composition-route-card .hero-copy {
    order: initial;
  }

  .hero {
    min-height: auto;
  }

  h1 {
    font-size: clamp(2.7rem, 15vw, 4.4rem);
  }
}
`;
}
