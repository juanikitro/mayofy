import type { CSSProperties } from "react";

import { type CurtainCloud, INTRO_PUFF, introCurtain } from "@/content/intro";
import { cloudFall } from "@/content/stage";
import { introScript } from "@/lib/intro";

function cloudStyle(cloud: CurtainCloud) {
  const style: Record<string, string> = {
    "--x": `${cloud.x}%`,
    "--y": `${cloud.y}%`,
    "--w": `${cloud.w}%`,
    "--dx": `${cloud.dx}%`,
    "--dy": `${cloud.dy}%`,
  };
  if (cloud.mobile) {
    Object.assign(style, {
      "--x-m": `${cloud.mobile.x}%`,
      "--y-m": `${cloud.mobile.y}%`,
      "--w-m": `${cloud.mobile.w}%`,
      "--dx-m": `${cloud.mobile.dx}%`,
      "--dy-m": `${cloud.mobile.dy}%`,
    });
  }
  return style as CSSProperties;
}

/**
 * The page intro's layers inside the hero scene (docs/plans/2026-11-25-intro-amanecer.md):
 * the cloud bank in front of the island and the pre-dawn light over the
 * whole scene. Both stay `display: none` unless the intro runs
 * (`.dawn[data-intro]`, set by `IntroScript`), so without JavaScript, on a
 * second visit or with reduced motion they are not there at all.
 */
export function IntroLayers() {
  const puff = cloudFall.puffs[INTRO_PUFF];
  return (
    <>
      <div className="intro-curtain" aria-hidden="true">
        {introCurtain.map((cloud, index) => (
          <picture
            key={index}
            className={`intro-cloud${cloud.flip ? " intro-cloud--flip" : ""}${cloud.mobile ? "" : " intro-cloud--desktop"}`}
            style={cloudStyle(cloud)}
          >
            {/* The fall's own files and formats, so the browser reuses what it already downloaded. */}
            <source type="image/avif" srcSet={puff.avif} />
            <img src={puff.webp} alt="" width={puff.width} height={puff.height} loading="lazy" decoding="async" />
          </picture>
        ))}
      </div>
      <div className="intro-light" aria-hidden="true" />
    </>
  );
}

/**
 * Decides and runs the intro while the HTML is parsed (`runIntro` in
 * src/lib/intro.ts). It goes after the scene, so the hero's images already
 * exist when it runs, and before the copy. The hero section needs
 * `suppressHydrationWarning`: `data-intro` is already on it when React hydrates.
 */
export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: introScript() }} />;
}
