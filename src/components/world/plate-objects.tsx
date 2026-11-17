/* eslint-disable @next/next/no-img-element -- already-optimised AVIF cutouts; next/image would re-encode them */
import type { CSSProperties } from "react";

import type { PlateObject } from "@/content/stage";

/** Isolated objects placed on a plate, bottom-centre anchored in percent of the plate. */
export function PlateObjects({ objects }: { objects: readonly PlateObject[] }) {
  return (
    <>
      {objects.map((object, index) => (
        <img
          key={`${object.src}-${index}`}
          className={`plate-object${object.glow ? " plate-object--glow" : ""}${object.float ? " plate-object--float" : ""}${object.chasedTo ? " plate-object--chased" : ""}`}
          src={object.src}
          alt=""
          width={object.width}
          height={object.height}
          loading="lazy"
          decoding="async"
          style={
            {
              "--x": object.x,
              "--y": object.y,
              "--w": object.w,
              "--x-m": object.mobile?.x,
              "--y-m": object.mobile?.y,
              "--w-m": object.mobile?.w,
              "--to": object.chasedTo,
              "--to-m": object.mobile?.chasedTo,
              "--float-delay": `${(index % 5) * 0.7}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
