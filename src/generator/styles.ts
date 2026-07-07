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
    linear-gradient(120deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent 42%),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 5%, transparent), color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px, transparent 34px);
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
  max-width: 100%;
  font-size: clamp(3rem, 6.2vw, 6.2rem);
  line-height: 0.94;
  letter-spacing: 0;
  text-wrap: balance;
  overflow-wrap: anywhere;
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
  clip-path: polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%);
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

.has-creative main {
  width: min(1180px, calc(100% - 32px));
}

.has-creative .site-nav {
  padding-top: 20px;
}

.has-creative .hero {
  position: relative;
  min-height: 76vh;
  grid-template-columns: minmax(0, 1fr) minmax(330px, 0.92fr);
  gap: clamp(30px, 5vw, 82px);
}

.has-creative .hero::before {
  content: "";
  position: absolute;
  inset: 7% auto auto -4%;
  width: 170px;
  height: 12px;
  background: var(--accent);
  transform: skewX(-22deg);
}

.has-creative h1 {
  max-width: 760px;
  font-size: clamp(3.8rem, 7.4vw, 8.6rem);
}

.hero-angle {
  max-width: 640px;
  margin: 16px 0 0;
  font-family: var(--primary-font);
  font-size: clamp(1.04rem, 1.6vw, 1.32rem);
  font-weight: 800;
  line-height: 1.35;
  color: color-mix(in srgb, var(--ink) 78%, var(--accent));
  overflow-wrap: anywhere;
}

.has-creative .lead {
  max-width: 660px;
  overflow-wrap: anywhere;
}

.has-creative .hero-media {
  isolation: isolate;
  min-height: 500px;
}

.has-creative .hero-photo {
  min-height: 500px;
  filter: saturate(1.08) contrast(1.03);
}

.hero-cards {
  margin: -22px 0 40px;
}

.creative-cards,
.block-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.creative-cards article,
.block-items div {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 28%, transparent);
  padding: 18px;
  min-height: 132px;
  position: relative;
  overflow: hidden;
}

.creative-cards article::after,
.block-items div::after {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 12px;
  height: 2px;
  background: color-mix(in srgb, var(--accent) 70%, transparent);
}

.creative-cards span,
.block-items span {
  display: block;
  font-family: var(--primary-font);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--accent);
}

.creative-cards strong,
.block-items strong {
  display: block;
  margin-top: 8px;
  font-size: clamp(1.25rem, 2.1vw, 2rem);
  line-height: 1.05;
}

.creative-cards p,
.block-items p {
  margin: 8px 0 0;
  font-size: 0.94rem;
  line-height: 1.38;
}

.has-creative .facts {
  grid-template-columns: 0.85fr 1fr 1fr;
  margin: 22px 0 18px;
}

.has-creative .proof-strip {
  margin-bottom: 54px;
}

.creative-stack {
  display: grid;
  gap: 18px;
  margin: 0 0 88px;
}

.creative-block {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(22px, 4vw, 58px);
  align-items: stretch;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 18%, transparent);
  padding: clamp(20px, 4vw, 44px);
}

.creative-block h2 {
  max-width: 780px;
}

.creative-block .block-heading p:not(.section-label) {
  max-width: 580px;
}

.block-callout {
  grid-column: 1 / -1;
  margin: 0;
  border-top: 1px solid var(--line);
  padding-top: 18px;
  font-family: var(--primary-font);
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 900;
}

.block-quote-strip {
  grid-template-columns: 1fr;
}

.block-quote-strip .block-heading {
  max-width: 920px;
}

.block-quote-strip h2 {
  font-size: clamp(2.5rem, 5.4vw, 6rem);
}

.block-quote-strip .block-items {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.block-process .block-items,
.block-quick-actions .block-items {
  counter-reset: step;
}

.block-process .block-items div::before,
.block-quick-actions .block-items div::before {
  counter-increment: step;
  content: "0" counter(step);
  position: absolute;
  right: 16px;
  top: 14px;
  font-family: var(--primary-font);
  font-weight: 900;
  color: color-mix(in srgb, var(--ink) 16%, transparent);
  font-size: 2.6rem;
  line-height: 1;
}

.review-wall {
  grid-template-columns: 0.75fr repeat(3, minmax(0, 1fr));
  align-items: stretch;
  margin-bottom: 82px;
}

.review-wall h2 {
  font-size: clamp(2.1rem, 3.4vw, 3.8rem);
}

.review-wall .review-card {
  margin: 0;
}

.has-creative .location {
  position: relative;
  overflow: hidden;
}

.has-creative .location::before {
  content: "";
  position: absolute;
  inset: 0;
  border-left: 10px solid var(--accent);
  pointer-events: none;
}

.contact-button {
  margin-top: 16px;
}

.creative-studio-detail {
  --ink: #f7f4ec;
  --muted: #b9c9c2;
  --canvas: #101820;
  --surface: #f3f7f4;
  --accent: #80d1b8;
}

.creative-studio-detail .hero-media {
  transform: rotate(1deg);
  border: 8px solid color-mix(in srgb, var(--surface) 88%, transparent);
}

.creative-studio-detail .hero-badge,
.creative-studio-detail .hero-cards article:nth-child(2) {
  transform: rotate(-2deg);
}

.creative-wash-flow {
  --ink: #1b262a;
  --muted: #527077;
  --canvas: #f3fbff;
  --surface: #d7eef2;
  --accent: #1a8ea0;
}

.creative-wash-flow .hero {
  grid-template-columns: minmax(0, 0.9fr) minmax(340px, 1.1fr);
}

.creative-wash-flow .hero-media,
.creative-wash-flow .creative-block {
  clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
}

.creative-oil-bay {
  --ink: #f8f1df;
  --muted: #cfbf9d;
  --canvas: #201d18;
  --surface: #eee1c7;
  --accent: #f0a928;
}

.creative-oil-bay .service-pills span,
.creative-oil-bay .button {
  text-transform: uppercase;
}

.creative-oil-bay .creative-block {
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 8%, transparent), color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px, transparent 18px),
    color-mix(in srgb, var(--surface) 18%, transparent);
}

.creative-roadside-rescue {
  --ink: #fbf4de;
  --muted: #d3c58f;
  --canvas: #111315;
  --surface: #f0ede3;
  --accent: #ffcb2f;
}

.creative-roadside-rescue .hero::after {
  content: "";
  position: absolute;
  inset: auto 0 8%;
  height: 8px;
  background: repeating-linear-gradient(90deg, var(--accent) 0 80px, transparent 80px 128px);
}

.creative-roadside-rescue .button.primary {
  min-width: 220px;
}

.creative-bodyshop-craft {
  --ink: #20211f;
  --muted: #6e6760;
  --canvas: #f2eee8;
  --surface: #2d2b2a;
  --accent: #d85c3b;
}

.creative-bodyshop-craft .hero {
  grid-template-columns: minmax(0, 1.18fr) minmax(300px, 0.82fr);
}

.creative-bodyshop-craft .hero-media {
  box-shadow: -16px 16px 0 color-mix(in srgb, var(--accent) 58%, transparent);
}

.creative-parts-counter {
  --ink: #1d2423;
  --muted: #536662;
  --canvas: #eef4ee;
  --surface: #1c2b28;
  --accent: #2e705c;
}

.creative-parts-counter .creative-block,
.creative-parts-counter .proof-strip {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.creative-parts-counter .creative-block .block-heading {
  grid-column: span 2;
}

.creative-parts-counter .creative-block .block-items {
  grid-column: span 2;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.creative-mechanic-ledger {
  --ink: #1c2427;
  --muted: #647075;
  --canvas: #f8f4ec;
  --surface: #20272b;
  --accent: #315e68;
}

.creative-mechanic-ledger .creative-block {
  border-left: 12px solid var(--accent);
}

.texture-water-ripple::before {
  background:
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), color-mix(in srgb, var(--accent) 10%, transparent) 2px, transparent 2px, transparent 18px),
    linear-gradient(90deg, color-mix(in srgb, #fff 35%, transparent), transparent);
}

.texture-road-markings::before {
  background:
    repeating-linear-gradient(90deg, transparent 0 44px, color-mix(in srgb, var(--accent) 18%, transparent) 44px 52px, transparent 52px 96px),
    linear-gradient(120deg, color-mix(in srgb, #000 14%, transparent), transparent);
}

.texture-parts-shelf::before,
.texture-service-ledger::before {
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 7%, transparent), color-mix(in srgb, var(--ink) 7%, transparent) 1px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink) 5%, transparent), color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px, transparent 40px);
}

.texture-polished-glass::before {
  background:
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 24%),
    linear-gradient(135deg, color-mix(in srgb, #fff 10%, transparent), transparent 42%),
    repeating-linear-gradient(115deg, color-mix(in srgb, #fff 7%, transparent), color-mix(in srgb, #fff 7%, transparent) 1px, transparent 1px, transparent 22px);
}

.texture-oil-label::before {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 34%),
    repeating-linear-gradient(0deg, color-mix(in srgb, #000 16%, transparent), color-mix(in srgb, #000 16%, transparent) 1px, transparent 1px, transparent 26px);
}

.texture-primer-dust::before {
  background:
    radial-gradient(circle at 22% 22%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 24%),
    repeating-radial-gradient(circle at 70% 34%, color-mix(in srgb, #000 6%, transparent), color-mix(in srgb, #000 6%, transparent) 1px, transparent 1px, transparent 14px);
}

.studio-hero,
.wash-dock,
.oil-ticket,
.rescue-command,
.bodyshop-editorial,
.parts-counter-hero,
.ledger-hero {
  min-height: 74vh;
  margin: 12px 0 64px;
}

.studio-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.18fr);
  gap: clamp(28px, 5vw, 76px);
  align-items: end;
}

.studio-copy {
  min-width: 0;
  border-left: 10px solid var(--accent);
  padding: clamp(20px, 4vw, 54px) 0 clamp(18px, 3vw, 38px) clamp(18px, 3vw, 36px);
}

.studio-copy h1 {
  max-width: 600px;
  font-size: clamp(3.8rem, 6.8vw, 8rem);
}

.studio-media {
  position: relative;
  min-height: 620px;
}

.studio-media .hero-photo {
  height: 620px;
  min-height: 620px;
  border: 8px solid color-mix(in srgb, var(--surface) 88%, transparent);
  box-shadow: -22px 24px 0 color-mix(in srgb, var(--accent) 55%, transparent);
}

.studio-cards {
  position: absolute;
  right: -18px;
  bottom: 22px;
  width: min(420px, 84%);
  grid-template-columns: 1fr 1fr;
}

.studio-cards article:first-child {
  grid-column: 1 / -1;
}

.studio-cards article,
.rescue-cards article {
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 35px color-mix(in srgb, #000 22%, transparent);
}

.studio-statement {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(260px, 0.92fr);
  gap: 18px;
  margin-bottom: 72px;
}

.studio-statement .creative-block,
.studio-process .creative-block {
  min-height: 100%;
}

.studio-extra,
.wash-extra,
.oil-extra,
.rescue-extra,
.bodyshop-extra,
.parts-extra,
.ledger-extra {
  display: grid;
  gap: 18px;
  margin-bottom: 72px;
}

.studio-reviews {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 72px;
}

.studio-reviews .review-card:nth-child(odd) {
  margin-left: clamp(0px, 10vw, 150px);
}

.wash-dock {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(340px, 1.08fr);
  gap: 0;
  align-items: stretch;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 40%, transparent);
}

.wash-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(24px, 5vw, 62px);
}

.wash-intro h1 {
  font-size: clamp(3.3rem, 6.3vw, 7.3rem);
}

.wash-window {
  position: relative;
  min-height: 580px;
  overflow: hidden;
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
}

.wash-window .hero-photo {
  height: 100%;
  min-height: 580px;
}

.wash-window p {
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 24px;
  margin: 0;
  background: color-mix(in srgb, var(--canvas) 82%, transparent);
  border: 1px solid var(--line);
  padding: 16px;
  font-family: var(--primary-font);
  font-weight: 900;
  line-height: 1.3;
}

.wash-proof {
  display: grid;
  grid-template-columns: 1.45fr 0.85fr 0.85fr 0.85fr;
  gap: 10px;
  margin: -38px 22px 72px;
  position: relative;
  z-index: 2;
}

.wash-proof p {
  min-height: 126px;
  margin: 0;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--canvas) 92%, transparent);
  padding: 18px;
  font-family: var(--primary-font);
  font-weight: 900;
  line-height: 1.35;
}

.wash-flow-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(280px, 0.88fr);
  gap: 18px;
  margin-bottom: 72px;
}

.wash-sidebar {
  display: grid;
  gap: 18px;
}

.wash-cards {
  grid-template-columns: 1fr;
}

.wash-lower,
.oil-bottom,
.rescue-lower,
.bodyshop-lower,
.parts-bottom,
.ledger-bottom {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 1.08fr);
  gap: 18px;
  align-items: start;
  margin-bottom: 72px;
}

.oil-ticket {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(330px, 430px);
  gap: 18px;
  align-items: stretch;
  border-top: 12px solid var(--accent);
  border-bottom: 1px solid var(--line);
  padding: clamp(24px, 5vw, 62px) 0;
}

.oil-ticket-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.oil-ticket h1 {
  font-size: clamp(3.6rem, 7vw, 8rem);
}

.oil-metrics {
  display: grid;
  gap: 14px;
  align-content: center;
}

.oil-cards,
.oil-facts {
  grid-template-columns: 1fr;
  margin: 0;
}

.oil-facts article {
  min-height: auto;
}

.oil-bay-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
  gap: 18px;
  margin-bottom: 72px;
}

.oil-photo-rail {
  min-height: 760px;
  border: 1px solid var(--line);
  overflow: hidden;
}

.oil-photo-rail .hero-photo {
  height: 100%;
  min-height: 760px;
}

.oil-service-stack,
.ledger-blocks {
  display: grid;
  gap: 18px;
}

.oil-metric-strip {
  margin-bottom: 72px;
}

.rescue-command {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(340px, 1.12fr);
  gap: 18px;
  align-items: stretch;
}

.rescue-panel {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), transparent 42%),
    color-mix(in srgb, var(--surface) 10%, transparent);
  padding: clamp(24px, 5vw, 58px);
}

.rescue-panel h1 {
  font-size: clamp(3.3rem, 6.5vw, 7.8rem);
}

.rescue-call {
  display: block;
  margin: 24px 0 6px;
  color: var(--accent);
  font-family: var(--primary-font);
  font-size: clamp(2.4rem, 5vw, 5.2rem);
  font-weight: 900;
  line-height: 0.95;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.rescue-map {
  position: relative;
  min-height: 610px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.rescue-map .hero-photo {
  height: 100%;
  min-height: 610px;
}

.rescue-cards {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rescue-action-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 1.08fr);
  gap: 18px;
  margin-bottom: 72px;
}

.rescue-strip {
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) minmax(0, 1.2fr);
  gap: 18px;
  margin-bottom: 72px;
}

.rescue-proof {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.rescue-proof p {
  margin: 0;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  padding: 18px;
  font-family: var(--primary-font);
  font-weight: 900;
}

.bodyshop-editorial {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
  grid-template-rows: auto 1fr;
  gap: 18px clamp(24px, 5vw, 72px);
  align-items: stretch;
  border-bottom: 0;
  padding-bottom: 0;
}

.bodyshop-title,
.bodyshop-lead {
  min-width: 0;
}

.bodyshop-title {
  align-self: end;
}

.bodyshop-title h1 {
  max-width: 900px;
  font-size: clamp(3.6rem, 7vw, 8.4rem);
}

.bodyshop-lead {
  align-self: start;
  border-top: 8px solid var(--accent);
  padding-top: 22px;
}

.bodyshop-editorial .bodyshop-photo {
  grid-column: 2;
  grid-row: 1 / span 2;
  min-height: 640px;
}

.bodyshop-editorial .bodyshop-photo .hero-photo {
  height: 100%;
  min-height: 640px;
}

.bodyshop-editorial .bodyshop-cards {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  justify-self: start;
  z-index: 2;
  width: min(430px, 88%);
  margin: 0 0 22px -42px;
}

.bodyshop-editorial .bodyshop-cards article {
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  box-shadow: 0 14px 36px color-mix(in srgb, #000 18%, transparent);
}

.bodyshop-photo-band {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 18px;
  align-items: end;
  margin-bottom: 72px;
}

.bodyshop-photo {
  min-height: 560px;
  overflow: hidden;
  box-shadow: -18px 18px 0 color-mix(in srgb, var(--accent) 52%, transparent);
}

.bodyshop-photo .hero-photo {
  height: 100%;
  min-height: 560px;
}

.bodyshop-cards {
  grid-template-columns: 1fr;
}

.bodyshop-craft-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  margin-bottom: 72px;
}

.bodyshop-craft-grid .creative-block:first-child {
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
}

.parts-counter-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(340px, 0.98fr);
  gap: 18px;
  align-items: stretch;
}

.parts-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 8%, transparent);
  padding: clamp(24px, 5vw, 62px);
}

.parts-copy h1 {
  font-size: clamp(3.8rem, 7.4vw, 8.8rem);
}

.parts-tags {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 24px;
}

.parts-tags span {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--canvas) 72%, transparent);
  padding: 12px 14px;
  font-family: var(--primary-font);
  font-weight: 900;
}

.parts-photo {
  position: relative;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.parts-photo .hero-photo {
  height: 100%;
  min-height: 600px;
}

.parts-sticker {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  padding: 16px;
  font-family: var(--primary-font);
  font-weight: 900;
  line-height: 1.3;
}

.parts-catalog {
  display: grid;
  grid-template-columns: minmax(270px, 0.86fr) minmax(0, 1.14fr);
  gap: 18px;
  margin-bottom: 72px;
}

.parts-cards {
  grid-template-columns: 1fr;
}

.parts-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 72px;
}

.ledger-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(360px, 1.14fr);
  gap: 18px;
  align-items: stretch;
}

.ledger-sheet {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--line);
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 7%, transparent), color-mix(in srgb, var(--ink) 7%, transparent) 1px, transparent 1px, transparent 34px),
    color-mix(in srgb, var(--canvas) 94%, transparent);
  padding: clamp(24px, 5vw, 62px);
}

.ledger-sheet h1 {
  font-size: clamp(3.5rem, 6.8vw, 8rem);
}

.ledger-visual {
  position: relative;
  min-height: 680px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 12%, transparent);
}

.ledger-hero-photo,
.ledger-hero-photo .hero-photo {
  height: 100%;
  min-height: 680px;
}

.ledger-hero-photo .hero-photo {
  filter: saturate(0.96) contrast(1.06);
}

.ledger-cards {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ledger-facts {
  position: absolute;
  top: 18px;
  right: 18px;
  width: min(320px, calc(100% - 36px));
  grid-template-columns: 1fr;
  margin: 0;
}

.ledger-cards article,
.ledger-facts article {
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  backdrop-filter: blur(10px);
}

.ledger-workbench {
  display: block;
  margin-bottom: 72px;
}

.ledger-photo {
  min-height: 700px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.ledger-photo .hero-photo {
  height: 100%;
  min-height: 700px;
}

.ledger-reviews {
  grid-template-columns: minmax(0, 0.9fr) repeat(3, minmax(0, 1fr));
}

/* Second-pass art direction: stronger silhouettes and less dashboard-like UI. */
.has-creative main {
  width: min(1280px, calc(100% - 28px));
}

.has-creative .site-nav {
  width: fit-content;
  margin-left: auto;
}

.has-creative .site-nav a {
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  box-shadow: 0 10px 24px color-mix(in srgb, #000 8%, transparent);
}

.studio-hero,
.wash-dock,
.oil-ticket,
.rescue-command,
.bodyshop-editorial,
.parts-counter-hero,
.ledger-hero {
  min-height: min(780px, calc(100vh - 82px));
}

.studio-hero > *,
.wash-dock > *,
.oil-ticket > *,
.rescue-command > *,
.bodyshop-editorial > *,
.parts-counter-hero > *,
.ledger-hero > * {
  min-width: 0;
}

.creative-cards article,
.block-items div,
.facts article {
  border-radius: 0;
}

.creative-cards article {
  min-height: 108px;
}

.creative-cards strong,
.block-items strong {
  overflow-wrap: anywhere;
}

.has-creative h1 {
  overflow-wrap: normal;
  word-break: normal;
}

.has-creative .cta-row {
  flex-wrap: wrap;
}

.has-creative .button {
  max-width: 100%;
  white-space: normal;
  text-align: center;
}

.creative-studio-detail .studio-media {
  min-height: 680px;
}

.creative-studio-detail .studio-media::before {
  content: "";
  position: absolute;
  inset: 20px auto auto -34px;
  z-index: -1;
  width: 72%;
  height: 72%;
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
}

.creative-studio-detail .studio-cards {
  width: min(500px, 88%);
}

.creative-wash-flow .wash-dock {
  border: 0;
  background: transparent;
}

.creative-wash-flow .wash-intro {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 55%, transparent);
}

.creative-wash-flow .wash-window,
.creative-wash-flow .wash-window .hero-photo {
  min-height: 650px;
}

.creative-oil-bay .oil-ticket {
  grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.12fr) minmax(230px, 0.56fr);
  border: 0;
  padding: 0;
}

.oil-hero-photo {
  min-height: 720px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: -18px 18px 0 color-mix(in srgb, var(--accent) 42%, transparent);
}

.oil-hero-photo .hero-photo {
  width: 100%;
  height: 100%;
  min-height: 720px;
  object-fit: cover;
}

.creative-oil-bay .oil-ticket-copy {
  border-top: 14px solid var(--accent);
  border-bottom: 1px solid var(--line);
  padding: clamp(22px, 4vw, 54px) 0;
}

.creative-oil-bay .oil-ticket-copy h1 {
  font-size: clamp(3.2rem, 5.6vw, 5.8rem);
  line-height: 0.95;
  overflow-wrap: anywhere;
}

.creative-oil-bay .oil-metrics {
  align-content: end;
}

.creative-oil-bay .oil-cards article,
.creative-oil-bay .oil-facts article {
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
}

.creative-oil-bay .oil-bay-grid {
  grid-template-columns: 1fr;
}

.creative-bodyshop-craft .bodyshop-editorial {
  grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1.18fr);
}

.creative-bodyshop-craft .bodyshop-title {
  align-self: center;
}

.creative-bodyshop-craft .bodyshop-title h1 {
  font-size: clamp(3.6rem, 7.1vw, 8rem);
}

.creative-bodyshop-craft .bodyshop-lead {
  border-top: 0;
  border-left: 12px solid var(--accent);
  padding: 0 0 0 22px;
}

.creative-bodyshop-craft .bodyshop-editorial .bodyshop-photo {
  min-height: 700px;
  transform: rotate(-1.2deg);
}

.creative-bodyshop-craft .bodyshop-editorial .bodyshop-photo .hero-photo {
  min-height: 700px;
  filter: saturate(1.06) contrast(1.04);
}

.creative-bodyshop-craft .bodyshop-editorial .bodyshop-cards {
  width: min(520px, 88%);
  margin: 0 0 38px -34px;
}

.creative-bodyshop-craft .bodyshop-editorial .bodyshop-cards article {
  background: color-mix(in srgb, #fff 78%, transparent);
  border-left: 8px solid var(--accent);
  min-height: 86px;
  padding: 14px 18px;
}

.creative-parts-counter .parts-counter-hero {
  grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.18fr);
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 8%, transparent);
}

.creative-parts-counter .parts-copy {
  border: 0;
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 6%, transparent), color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px, transparent 48px),
    color-mix(in srgb, var(--canvas) 88%, transparent);
}

.creative-parts-counter .parts-copy h1 {
  font-size: clamp(4.2rem, 7vw, 7.4rem);
  line-height: 0.92;
}

.creative-parts-counter .parts-photo {
  min-height: 690px;
  border: 0;
  border-left: 1px solid var(--line);
}

.creative-parts-counter .parts-photo .hero-photo {
  min-height: 690px;
}

.creative-parts-counter .parts-sticker {
  left: 28px;
  right: auto;
  bottom: 28px;
  width: min(520px, calc(100% - 56px));
  border-left: 10px solid var(--accent);
}

.creative-mechanic-ledger .ledger-hero {
  grid-template-columns: minmax(0, 0.78fr) minmax(420px, 1.22fr);
}

.creative-mechanic-ledger .ledger-sheet {
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 6%, transparent), color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px, transparent 42px),
    color-mix(in srgb, var(--canvas) 96%, transparent);
  border-top: 12px solid var(--accent);
}

.creative-mechanic-ledger .ledger-sheet h1 {
  font-size: clamp(4rem, 6.2vw, 7rem);
  line-height: 0.94;
}

.creative-mechanic-ledger .ledger-visual {
  min-height: 720px;
  box-shadow: -18px 18px 0 color-mix(in srgb, var(--accent) 28%, transparent);
}

.creative-mechanic-ledger .ledger-hero-photo,
.creative-mechanic-ledger .ledger-hero-photo .hero-photo {
  min-height: 720px;
}

.creative-mechanic-ledger .ledger-cards {
  left: 24px;
  right: 24px;
  bottom: 24px;
}

.creative-mechanic-ledger .ledger-facts {
  top: 24px;
  right: 24px;
}

.creative-mechanic-ledger .ledger-cards article,
.creative-mechanic-ledger .ledger-facts article {
  border-left: 8px solid var(--accent);
}

.commercial-trust {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  margin: 0 0 82px;
  border: 1px solid var(--line);
  background: var(--line);
}

.trust-card,
.commercial-card,
.gallery-card,
.commercial-package {
  position: relative;
  min-width: 0;
  min-height: 100%;
  padding: clamp(18px, 2.6vw, 30px);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--surface) 20%, transparent), transparent 64%),
    color-mix(in srgb, var(--canvas) 88%, transparent);
  overflow: hidden;
}

.trust-card::after,
.commercial-card::after,
.gallery-card::after,
.commercial-package::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 5px;
  background: var(--accent);
  transform: scaleX(0.28);
  transform-origin: left;
}

.trust-card div,
.commercial-card div,
.gallery-card div,
.package-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 24px;
  margin-bottom: 14px;
}

.trust-card span,
.commercial-card span,
.gallery-card span,
.package-top span,
.demo-flag {
  font-family: var(--primary-font);
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
  color: var(--accent);
}

.demo-flag {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border: 1px solid color-mix(in srgb, var(--accent) 72%, transparent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: inherit;
}

.trust-card h3,
.commercial-card h3,
.gallery-card h3,
.commercial-package h3,
.process-rail h3 {
  margin: 0 0 10px;
  font-family: var(--primary-font);
  font-size: clamp(1.35rem, 2.1vw, 2.1rem);
  line-height: 1;
  overflow-wrap: anywhere;
}

.trust-card p,
.commercial-card p,
.gallery-card p,
.commercial-package p,
.process-rail p {
  margin: 0;
  color: color-mix(in srgb, var(--ink) 76%, transparent);
}

.trust-card strong,
.commercial-card strong,
.gallery-card strong {
  display: block;
  margin-top: 16px;
  font-size: 0.86rem;
  color: var(--accent);
  text-transform: uppercase;
}

.commercial-section {
  margin: 0 0 96px;
}

.commercial-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(260px, 0.68fr);
  gap: clamp(18px, 4vw, 58px);
  align-items: end;
  margin-bottom: 24px;
}

.commercial-heading h2 {
  margin: 0;
  max-width: 920px;
}

.commercial-heading p:not(.section-label) {
  max-width: 560px;
  margin: 0;
}

.commercial-grid,
.package-grid,
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.commercial-grid.compact {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.commercial-card {
  min-height: 280px;
  border: 1px solid var(--line);
}

.commercial-why .commercial-card {
  min-height: 230px;
  background:
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--ink) 5%, transparent), color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px, transparent 16px),
    color-mix(in srgb, var(--surface) 12%, transparent);
}

.commercial-packages {
  padding: clamp(22px, 4vw, 44px);
  border: 1px solid var(--line);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 46%),
    color-mix(in srgb, var(--surface) 10%, transparent);
}

.commercial-package {
  display: flex;
  min-height: 340px;
  flex-direction: column;
  border: 1px solid var(--line);
}

.package-top strong {
  font-size: 0.92rem;
  color: var(--accent);
  max-width: 100%;
  overflow-wrap: anywhere;
  text-align: right;
}

.commercial-package ul {
  display: grid;
  gap: 10px;
  margin: auto 0 0;
  padding: 22px 0 0;
  list-style: none;
}

.commercial-package li {
  border-top: 1px solid var(--line);
  padding-top: 10px;
  color: color-mix(in srgb, var(--ink) 78%, transparent);
  overflow-wrap: anywhere;
}

.gallery-grid {
  grid-template-columns: 1.1fr 0.9fr 0.9fr;
}

.gallery-card {
  min-height: 320px;
  border: 1px solid var(--line);
  background:
    linear-gradient(to top, color-mix(in srgb, #000 22%, transparent), transparent 58%),
    repeating-linear-gradient(45deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px, transparent 22px),
    color-mix(in srgb, var(--surface) 18%, transparent);
}

.gallery-card:first-child {
  min-height: 420px;
}

.process-rail {
  counter-reset: commercial-step;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 8%, transparent);
}

.process-rail article {
  position: relative;
  min-height: 260px;
  padding: clamp(18px, 2.8vw, 34px);
  border-right: 1px solid var(--line);
}

.process-rail article:last-child {
  border-right: 0;
}

.process-rail span {
  display: block;
  margin-bottom: 34px;
  font-family: var(--primary-font);
  font-size: clamp(2.4rem, 5vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  color: color-mix(in srgb, var(--accent) 72%, transparent);
}

.commercial-final-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(20px, 4vw, 54px);
  align-items: center;
  margin: 0 0 96px;
  padding: clamp(24px, 5vw, 58px);
  border: 1px solid var(--line);
  background:
    linear-gradient(100deg, color-mix(in srgb, var(--accent) 22%, transparent), transparent 50%),
    color-mix(in srgb, var(--surface) 18%, transparent);
}

.commercial-final-cta h2 {
  margin-bottom: 10px;
}

.commercial-final-cta p:not(.section-label) {
  max-width: 720px;
  margin: 0;
}

.commercial-urban-custom .commercial-final-cta,
.commercial-urban-custom .commercial-package,
.commercial-urban-custom .gallery-card {
  clip-path: polygon(0 0, 100% 0, 96% 100%, 0 100%);
}

.commercial-fast-local .commercial-trust,
.commercial-fast-local .commercial-final-cta {
  border-top: 12px solid var(--accent);
}

.commercial-parts-counter .commercial-card,
.commercial-parts-counter .commercial-package {
  background:
    repeating-linear-gradient(0deg, color-mix(in srgb, var(--ink) 6%, transparent), color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px, transparent 34px),
    color-mix(in srgb, var(--canvas) 92%, transparent);
}

footer {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 36px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

@media (max-width: 820px) {
  .has-creative main {
    width: min(100% - 28px, 1280px);
    overflow-x: hidden;
  }

  .hero,
  .content-grid,
  .facts,
  .hours-list,
  .proof-strip,
  .creative-cards,
  .block-items,
  .creative-block,
  .review-wall,
  .studio-hero,
  .studio-statement,
  .wash-dock,
  .wash-proof,
  .wash-flow-grid,
  .wash-lower,
  .oil-ticket,
  .oil-bay-grid,
  .oil-bottom,
  .rescue-command,
  .rescue-action-grid,
  .rescue-strip,
  .rescue-proof,
  .rescue-lower,
  .bodyshop-editorial,
  .bodyshop-photo-band,
  .bodyshop-craft-grid .creative-block:first-child,
  .bodyshop-lower,
  .parts-counter-hero,
  .parts-tags,
  .parts-catalog,
  .parts-actions-grid,
  .parts-bottom,
  .ledger-hero,
  .ledger-workbench,
  .ledger-bottom,
  .ledger-reviews,
  .commercial-trust,
  .commercial-heading,
  .commercial-grid,
  .commercial-grid.compact,
  .package-grid,
  .gallery-grid,
  .process-rail,
  .commercial-final-cta {
    grid-template-columns: 1fr;
  }

  .site-nav {
    justify-content: flex-start;
    overflow-x: auto;
  }

  .has-creative .site-nav {
    width: 100%;
    margin-left: 0;
  }

  .site-nav a {
    flex: 0 0 auto;
  }

  .has-creative .lead,
  .has-creative .hero-angle {
    max-width: 100%;
  }

  .has-creative .cta-row .button {
    flex: 1 1 100%;
    width: 100%;
  }

  .composition-route-card .hero-copy {
    order: initial;
  }

  .hero {
    min-height: auto;
  }

  .has-creative .hero {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: clamp(2.7rem, 15vw, 4.4rem);
  }

  .has-creative h1 {
    font-size: clamp(2.9rem, 13vw, 4.8rem);
  }

  .has-creative .hero-media,
  .has-creative .hero-photo {
    min-height: 360px;
  }

  .hero-cards {
    margin-top: 8px;
  }

  .creative-block,
  .creative-parts-counter .creative-block {
    display: grid;
    grid-template-columns: 1fr;
  }

  .creative-parts-counter .creative-block .block-heading,
  .creative-parts-counter .creative-block .block-items {
    grid-column: auto;
  }

  .creative-studio-detail .hero-media,
  .composition-photo-board .hero-media {
    transform: none;
  }

  .studio-hero,
  .wash-dock,
  .oil-ticket,
  .rescue-command,
  .bodyshop-editorial,
  .parts-counter-hero,
  .ledger-hero {
    min-height: auto;
    margin-bottom: 42px;
  }

  .studio-copy,
  .wash-intro,
  .parts-copy,
  .ledger-sheet,
  .rescue-panel {
    padding: 18px;
  }

  .studio-copy {
    border-left-width: 6px;
  }

  .studio-media {
    order: -1;
  }

  .studio-copy h1,
  .wash-intro h1,
  .bodyshop-title h1,
  .ledger-sheet h1 {
    font-size: clamp(2.6rem, 12vw, 4.1rem);
  }

  .studio-media,
  .studio-media .hero-photo,
  .wash-window,
  .wash-window .hero-photo,
  .oil-photo-rail,
  .oil-photo-rail .hero-photo,
  .oil-hero-photo,
  .oil-hero-photo .hero-photo,
  .rescue-map,
  .rescue-map .hero-photo,
  .bodyshop-photo,
  .bodyshop-photo .hero-photo,
  .parts-photo,
  .parts-photo .hero-photo,
  .ledger-photo,
  .ledger-photo .hero-photo,
  .ledger-visual,
  .ledger-hero-photo,
  .ledger-hero-photo .hero-photo {
    min-height: 340px;
    height: auto;
  }

  .studio-cards,
  .rescue-cards {
    position: static;
    width: auto;
    grid-template-columns: 1fr;
    margin-top: 12px;
  }

  .studio-media .hero-photo,
  .bodyshop-photo {
    box-shadow: none;
  }

  .wash-window,
  .creative-wash-flow .hero-media,
  .creative-wash-flow .creative-block {
    clip-path: none;
  }

  .wash-window,
  .wash-window .hero-photo {
    min-height: 280px;
  }

  .wash-proof {
    margin: 0 0 42px;
  }

  .rescue-call {
    font-size: clamp(2rem, 12vw, 3rem);
  }

  .parts-sticker {
    position: static;
    margin: 12px;
  }

  .bodyshop-title {
    order: 1;
  }

  .bodyshop-editorial .bodyshop-photo {
    order: 2;
    grid-column: auto;
    grid-row: auto;
    min-height: 300px;
  }

  .bodyshop-editorial .bodyshop-photo .hero-photo {
    min-height: 300px;
  }

  .bodyshop-editorial .bodyshop-cards {
    order: 3;
    grid-column: auto;
    grid-row: auto;
    width: auto;
    margin: 0;
  }

  .bodyshop-lead {
    order: 4;
  }

  .creative-oil-bay .oil-ticket-copy h1 {
    font-size: clamp(2.35rem, 10.5vw, 3.3rem);
  }

  .creative-oil-bay .oil-ticket,
  .creative-bodyshop-craft .bodyshop-editorial,
  .creative-parts-counter .parts-counter-hero,
  .creative-mechanic-ledger .ledger-hero {
    grid-template-columns: 1fr;
  }

  .creative-oil-bay .oil-ticket-copy {
    padding: 22px 0;
  }

  .oil-hero-photo,
  .oil-hero-photo .hero-photo,
  .creative-parts-counter .parts-photo,
  .creative-parts-counter .parts-photo .hero-photo,
  .creative-mechanic-ledger .ledger-visual,
  .creative-mechanic-ledger .ledger-hero-photo,
  .creative-mechanic-ledger .ledger-hero-photo .hero-photo {
    min-height: 320px;
  }

  .creative-bodyshop-craft .bodyshop-editorial .bodyshop-photo {
    transform: none;
  }

  .creative-bodyshop-craft .bodyshop-editorial .bodyshop-cards {
    margin: 12px 0 0;
  }

  .creative-bodyshop-craft .bodyshop-lead {
    border-left-width: 8px;
    padding-left: 16px;
  }

  .creative-parts-counter .parts-copy h1 {
    font-size: clamp(3rem, 13vw, 4.2rem);
  }

  .creative-parts-counter .parts-sticker {
    position: static;
    width: auto;
    margin: 12px;
  }

  .ledger-cards,
  .ledger-facts {
    position: static;
    width: auto;
    grid-template-columns: 1fr;
    margin: 12px;
  }

  .creative-mechanic-ledger .ledger-sheet h1 {
    font-size: clamp(3rem, 13vw, 4.2rem);
  }

  .commercial-trust,
  .commercial-section,
  .commercial-final-cta {
    margin-bottom: 48px;
  }

  .trust-card,
  .commercial-card,
  .gallery-card,
  .commercial-package,
  .process-rail article {
    min-height: auto;
  }

  .commercial-heading {
    align-items: start;
  }

  .gallery-card:first-child {
    min-height: 300px;
  }

  .process-rail article {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .process-rail article:last-child {
    border-bottom: 0;
  }

  .commercial-final-cta .cta-row {
    width: 100%;
  }
}
`;
}
