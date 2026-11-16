import type { CSSProperties } from "react";

import { MayoFigure } from "@/components/world/mayo-figure";
import { commercialIntro, commercialPlans } from "@/content/commercial-plans";

type RockKind = "base" | "left" | "right" | "top";

type RockStyle = CSSProperties & {
  "--sx": string;
  "--sy": string;
  "--sr": string;
};

/**
 * Scatter offsets per rock (where it floats before the scroll assembles it).
 * The assembled state is the default layout, so every fallback tier shows
 * the platforms already built without extra CSS.
 */
const scatter: Record<RockKind, RockStyle> = {
  base: { "--sx": "-26vw", "--sy": "-34vh", "--sr": "-28deg" },
  left: { "--sx": "-34vw", "--sy": "10vh", "--sr": "48deg" },
  right: { "--sx": "30vw", "--sy": "-18vh", "--sr": "-54deg" },
  top: { "--sx": "18vw", "--sy": "-46vh", "--sr": "76deg" },
};

function Rock({ kind, index }: { kind: RockKind; index: number }) {
  return (
    <div
      className={`rock rock--${kind}`}
      style={{ ...scatter[kind], "--rock-index": index } as CSSProperties}
    >
      <svg viewBox="0 0 200 140" aria-hidden="true">
        {kind === "base" ? (
          <>
            <path className="rock__stone" d="M14 90c-10-40 30-80 90-82 60-2 100 30 92 74-6 36-40 54-96 54S22 118 14 90z" />
            <path className="rock__moss" d="M22 68c20-30 60-50 100-48 40 2 66 24 70 50-30-16-70-24-110-18-26 4-44 10-60 16z" />
            <path className="rock__shade" d="M30 110c40 20 110 20 150-6-10 24-40 36-80 36s-60-12-70-30z" />
          </>
        ) : null}
        {kind === "left" ? (
          <>
            <path className="rock__stone" d="M30 110c-20-30-14-70 20-90 30-18 70-10 90 20 18 30 8 70-20 86-30 16-70 12-90-16z" />
            <path className="rock__moss" d="M40 40c30-22 70-18 92 10-24-6-54-6-80 4-10 4-18 8-24 12 2-10 6-18 12-26z" />
          </>
        ) : null}
        {kind === "right" ? (
          <>
            <path className="rock__stone" d="M40 104c-24-26-20-66 10-86 32-20 80-10 100 24 16 28 6 66-24 82-28 16-64 8-86-20z" />
            <path className="rock__moss" d="M52 32c30-16 70-12 96 16-26-8-54-10-82 0-10 4-18 8-26 12 2-10 6-20 12-28z" />
          </>
        ) : null}
        {kind === "top" ? (
          <>
            <path className="rock__stone" d="M8 72c0-30 50-52 100-52s92 20 92 50c0 28-44 48-96 48S8 100 8 72z" />
            <path className="rock__moss" d="M12 66c10-26 56-42 100-42s84 14 94 40c-30-12-66-18-100-18-36 0-66 6-94 20z" />
            <path className="rock__shade" d="M20 90c40 18 120 18 164-4-8 20-44 32-84 32S30 108 20 90z" />
          </>
        ) : null}
      </svg>
    </div>
  );
}

export function RockIsland() {
  const titleParts = commercialIntro.title.split(". ");

  return (
    <section id="packs" className="rocks" aria-labelledby="packs-title">
      <div className="rocks__stage">
        <div className="scene scene--noon" aria-hidden="true">
          <div className="scene__sky" />
          <svg className="scene__island scene__island--wide" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet">
            <path
              className="island__rock"
              d="M140 230c-30 50 0 110 60 130 50 16 110 10 160 40 60 36 120 0 190 10 70 10 130-20 200-10 80 12 140-30 200-16 60 14 120-20 160-70 30-40 70-70 50-100-40-50-980-50-1020 16z"
            />
            <path
              className="island__moss"
              d="M130 230c0 24 20 42 50 48 20 4 40-6 60 2 30 10 50 0 80 4 40 6 60-10 100-4 40 6 70-6 110 0 50 8 80-10 120-2 40 8 80-12 120-4 60 12 110-10 140-40 20-30-780-40-780-4z"
            />
            <ellipse className="island__meadow" cx="800" cy="220" rx="700" ry="60" />
            <ellipse className="island__meadow-light" cx="840" cy="206" rx="520" ry="36" />
          </svg>
        </div>

        <header className="rocks__intro">
          <h2 id="packs-title">
            <em>{titleParts[0]}.</em> {titleParts.slice(1).join(". ")}
          </h2>
          <p>{commercialIntro.body}</p>
        </header>

        <div className="platforms">
          {commercialPlans.map((plan, index) => (
            <div className={`platform platform--${index + 1}`} key={plan.id}>
              <div className="platform__rocks" aria-hidden="true">
                <Rock kind="base" index={index} />
                <Rock kind="left" index={index} />
                <Rock kind="right" index={index} />
                <Rock kind="top" index={index} />
              </div>
              {index === 2 ? <MayoFigure pose="jump" className="platform__mayo" /> : null}
              <a className="platform__card" href={`#pack-${plan.id}`}>
                <span className="platform__name">{plan.name}</span>
                <span className="platform__from">Desde</span>
                <span className="platform__price">{plan.price}</span>
                <span className="platform__timeline">{plan.timeline}</span>
                <span className="platform__link">Ver qué incluye</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
