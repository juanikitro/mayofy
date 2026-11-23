import type { CSSProperties } from "react";

import { CasePicker } from "@/components/world/case-picker";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { NearGate } from "@/components/world/near-gate";
import { casePicker } from "@/content/case-picker";
import { islandCopy } from "@/content/islands";
import { islandPlates } from "@/content/stage";

/**
 * Where each question floats before it flies into the proposal, in % of
 * the desktop plate: over the island's left meadow, left of the proposal,
 * like its loose rocks.
 */
const askStarts = [
  ["21%", "41%"],
  ["25%", "31%"],
  ["20%", "52%"],
  ["27%", "47%"],
  ["30%", "38%"],
  ["23%", "57%"],
] as const;

/**
 * The system proposal that assembles itself: the base system, one module
 * per question (`--row`), and a closing line. On the pinned desktop stage it
 * stands on the island and the questions fly into it; elsewhere it sits in
 * the copy, each module with the question that brought it.
 */
function Proposal({ inScene }: { inScene: boolean }) {
  const { proposal } = casePicker;
  return (
    <div
      className={`proposal-frame ${inScene ? "proposal-frame--scene" : "proposal-frame--flow"}`}
    >
      <div className="proposal">
        <p className="proposal__base">
          <b>{proposal.base.title}</b>
          <span>{proposal.base.text}</span>
        </p>
        <ol className="proposal__modules">
          {proposal.modules.map((module, index) => (
            <li
              className="proposal__module"
              key={module.title}
              style={{ "--row": index } as CSSProperties}
            >
              {inScene ? null : (
                <span className="proposal__question">{module.question}</span>
              )}
              <b>{module.title}</b>
              <span>{module.text}</span>
            </li>
          ))}
        </ol>
        <p className="proposal__closing">{proposal.closing}</p>
      </div>
    </div>
  );
}

/**
 * Island 2: loose rocks, morning (Juani, 20 November 2026: options A and B
 * of docs/plans/2026-11-20-propuestas.md together, then "que vayan entrando
 * esas preguntas y se vaya construyendo una propuesta de sistema"). The copy
 * and the case picker (A) sit beside the island; on the island a system
 * proposal assembles itself as the questions answered by hand today fly into
 * it, one module each (B). On wide screens the stage is pinned while that
 * happens; elsewhere the proposal sits in the copy and its modules arrive as
 * it scrolls in. With reduced motion or without scroll-driven animations the
 * proposal stands complete and the questions never float.
 */
export function ProblemIsland() {
  const { proposal } = casePicker;

  return (
    <section
      id="problema"
      className="isle isle--morning problem"
      data-island="2"
      style={plateSceneStyle(islandPlates.problem)}
      aria-labelledby="problema-title"
    >
      {/* Its art (the butterfly's CSS background strip included) loads as the reader comes within a
          screen of the island or, after the page has loaded, once the fall's art is in. */}
      <NearGate ahead={1} />
      <div className="problem__stage">
        <IslandScene variant="morning" plate={islandPlates.problem}>
          <MayoFigure slot="problem" className="isle__mayo isle__mayo--play" />
        </IslandScene>
        {/* Over the scene (and its morning veil), in the plate's frame: the
            proposal stays crisp and the questions fly above everything. */}
        <div className="problem__demo" aria-hidden="true">
          <Proposal inScene />
          {/* After the proposal, so a question is never painted behind it. */}
          {proposal.modules.map((module, index) => (
            <span
              className="problem__ask"
              key={module.question}
              style={
                {
                  "--x0": askStarts[index][0],
                  "--y0": askStarts[index][1],
                  "--row": index,
                } as CSSProperties
              }
            >
              {module.question}
            </span>
          ))}
        </div>
        <div className="isle__content world-shell problem__content">
          <h2 id="problema-title">
            <IslandTitle segments={islandCopy.problem.title} />
          </h2>
          <Proposal inScene={false} />
          <CasePicker />
        </div>
      </div>
    </section>
  );
}
