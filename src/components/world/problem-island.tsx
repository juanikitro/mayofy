import type { CSSProperties } from "react";

import { CasePicker } from "@/components/world/case-picker";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { casePicker } from "@/content/case-picker";
import { islandCopy } from "@/content/islands";
import { islandPlates } from "@/content/stage";

/**
 * Where each question floats before it lands (start, % of the plate) and
 * the phone row it lands on, on the desktop and the mobile plate. The
 * questions wander over the island like its loose rocks.
 */
const askStarts = {
  d: [
    ["30%", "36%"],
    ["44%", "27%"],
    ["24%", "50%"],
    ["50%", "44%"],
  ],
  m: [
    ["8%", "31%"],
    ["22%", "24%"],
    ["4%", "42%"],
    ["14%", "52%"],
  ],
} as const;

/**
 * Island 2: loose rocks, morning (Juani, 20 November 2026: options A and B
 * of docs/plans/2026-11-20-propuestas.md together). The copy and the case
 * picker (A) sit beside the island; on the island a phone stands as "your
 * page" and, with the scroll, the questions answered by hand today fly into
 * it and come back answered (B). On wide screens the stage is pinned while
 * that happens; with reduced motion or without scroll-driven animations the
 * phone shows its answered page and the questions never float.
 */
export function ProblemIsland() {
  const { demo } = casePicker;

  return (
    <section id="problema" className="isle isle--morning problem" data-island="2" style={plateSceneStyle(islandPlates.problem)} aria-labelledby="problema-title">
      <div className="problem__stage">
        <IslandScene variant="morning" plate={islandPlates.problem}>
          <MayoFigure slot="problem" className="isle__mayo isle__mayo--play" />
          <div className="problem__demo">
            {demo.entries.map((entry, index) => (
              <span
                className="problem__ask"
                key={entry.question}
                style={
                  {
                    "--x0-d": askStarts.d[index][0],
                    "--y0-d": askStarts.d[index][1],
                    "--x0-m": askStarts.m[index][0],
                    "--y0-m": askStarts.m[index][1],
                    "--row": index,
                  } as CSSProperties
                }
              >
                {entry.question}
              </span>
            ))}
            <div className="problem__phone">
              <div className="problem__screen">
                <p className="problem__brand">
                  <b>{demo.name}</b>
                  <span>{demo.trade}</span>
                </p>
                <ul className="problem__answers">
                  {demo.entries.map((entry) => (
                    <li key={entry.title}>
                      <b>{entry.title}</b>
                      {entry.answer}
                    </li>
                  ))}
                </ul>
                <p className="problem__whatsapp">{demo.whatsapp}</p>
              </div>
            </div>
          </div>
        </IslandScene>
        <div className="isle__content world-shell problem__content">
          <h2 id="problema-title">
            <IslandTitle segments={islandCopy.problem.title} />
          </h2>
          <p className="isle__body">{islandCopy.problem.body}</p>
          <CasePicker />
        </div>
      </div>
    </section>
  );
}
