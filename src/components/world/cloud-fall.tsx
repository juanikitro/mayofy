import type { CSSProperties } from "react";

import { MayoFigure } from "@/components/world/mayo-figure";
import { cloudFall } from "@/content/stage";

/** Share of the `--fall` cover range where the frames crossfade. */
const CROSSFADE_START = 18;
const CROSSFADE_END = 82;

/**
 * Scroll range (percent of `cover`) of frame `index`: from the moment it
 * starts fading in until the next frame is fully opaque over it, when it
 * drops out, so at most two frames are ever visible. Frame 01 is opaque from
 * the start and frame 10 never drops out.
 */
function frameRange(index: number, count: number) {
  const step = (CROSSFADE_END - CROSSFADE_START) / (count - 1);
  const start = index === 0 ? 0 : CROSSFADE_START + (index - 1) * step;
  const end = index === count - 1 ? CROSSFADE_END : CROSSFADE_START + (index + 1) * step;
  return { "--frame-from": `${start.toFixed(2)}%`, "--frame-to": `${end.toFixed(2)}%` } as CSSProperties;
}

/**
 * Transition between island 1 (dawn) and island 2 (morning): Mayo falls
 * through the clouds. Inside the sticky stage the ten painted frames of the
 * camera descent (60-nubes desktop, 61-nubes-cel mobile) are stacked
 * full-bleed and crossfade in order along the `--fall` view timeline (CSS
 * only, no scroll hijacking). The four isolated puffs (62-nube-suelta) rise
 * faster than the frames as foreground parallax: two behind Mayo's painted
 * fall strip and two in front of her, so she falls between the clouds.
 * The stage fades at its edges into the section gradient, which runs from
 * the hero plate's last row to island 2's first. The reduced tier,
 * `prefers-reduced-motion` and browsers without scroll-driven animations
 * show one static composition: the `still` frame, the puffs at rest and Mayo.
 */
export function CloudFall() {
  const count = cloudFall.frames.length;
  return (
    <section className="fall" aria-label="Transición: Mayo cae entre las nubes">
      <div className="fall__stage" aria-hidden="true">
        {cloudFall.frames.map((frame, index) => {
          const position = index === 0 ? "first" : index === count - 1 ? "last" : "middle";
          return (
            <picture
              key={frame.id}
              className="fall__frame"
              data-frame={frame.id}
              data-position={position}
              data-still={frame.id === cloudFall.still ? "" : undefined}
              style={frameRange(index, count)}
            >
              {/* WebP only: in this batch it is ~40 % lighter than the AVIF encode. */}
              <source media="(max-width: 48rem)" type="image/webp" srcSet={frame.mobile.webp} />
              <img
                src={frame.desktop.webp}
                alt=""
                width={frame.desktop.width}
                height={frame.desktop.height}
                loading="lazy"
                decoding="async"
              />
            </picture>
          );
        })}
        {cloudFall.puffs.map((puff, index) => (
          <picture key={puff.avif} className={`fall__puff fall__puff--${index + 1}`}>
            <source type="image/avif" srcSet={puff.avif} />
            <img src={puff.webp} alt="" width={puff.width} height={puff.height} loading="lazy" decoding="async" />
          </picture>
        ))}
        <MayoFigure slot="fall" className="fall__mayo" />
      </div>
    </section>
  );
}
