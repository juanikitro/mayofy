import type { ReactNode } from "react";

import { IslandPlate } from "@/components/world/island-plate";
import type { PlateSpec } from "@/content/stage";

export type SceneVariant = "morning" | "golden" | "sunset" | "dusk" | "night";

/**
 * Scene for islands 2 and 4–7: sky gradient (per the bible's light table)
 * under the island's generated plate, with island-specific objects passed
 * as children (see docs/plans/2026-11-16-biblia-visual-mundo-mayo.md).
 */
export function IslandScene({
  variant,
  plate,
  children,
  backdrop,
}: {
  variant: SceneVariant;
  plate: PlateSpec;
  children?: ReactNode;
  /** Between the plate's background layer and its island cutout (IslandPlate). */
  backdrop?: ReactNode;
}) {
  return (
    <div className={`scene scene--${variant} scene--plated`} aria-hidden="true">
      <div className="scene__sky" />
      <IslandPlate plate={plate} backdrop={backdrop}>
        {children}
      </IslandPlate>
    </div>
  );
}
