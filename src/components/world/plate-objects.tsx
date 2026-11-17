/* eslint-disable @next/next/no-img-element -- already-optimised AVIF cutouts; next/image would re-encode them */
import type { CSSProperties } from "react";

import type { PlateObject } from "@/content/stage";

const pct = (value: string) => Number.parseFloat(value);

/** Chase drift as a `translate` in the object's own widths, so it runs on the compositor. */
const chaseOffset = (to: string | undefined, x: string, w: string) => (to ? `${((pct(to) - pct(x)) / pct(w)) * 100}%` : undefined);

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
              "--chase-d": chaseOffset(object.chasedTo, object.x, object.w),
              "--chase-m": object.mobile ? chaseOffset(object.mobile.chasedTo, object.mobile.x, object.mobile.w) : undefined,
              "--float-delay": `${(index % 5) * 0.7}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
