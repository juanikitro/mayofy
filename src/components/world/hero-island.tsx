import { AmbientBackdrop, AmbientClouds } from "@/components/world/ambient-sky";
import { IslandPlate, plateSceneStyle } from "@/components/world/island-plate";
import { MayoFigure } from "@/components/world/mayo-figure";
import { islandPlates } from "@/content/stage";

/**
 * Island 1: dawn meadow. The generated plate (01 desktop / 02 mobile) is
 * the whole backdrop; Mayo sits on it at the anchor from stage.ts. The
 * separate sky (03) and foreground (04) layers join when the island
 * cutouts arrive, so sky, island and foliage can move at different speeds.
 */
export function HeroIsland() {
  return (
    <div className="scene scene--dawn scene--plated" style={plateSceneStyle(islandPlates.hero)} aria-hidden="true">
      <div className="scene__sky" />
      <IslandPlate plate={islandPlates.hero} eager backdrop={<AmbientBackdrop island="hero" />}>
        <MayoFigure slot="hero" className="scene__mayo" eager />
        <AmbientClouds island="hero" depth="near" />
      </IslandPlate>
    </div>
  );
}
