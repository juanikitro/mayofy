import type { ImgHTMLAttributes } from "react";

/**
 * An AVIF cutout with its WebP twin as the fallback, for browsers without
 * AVIF (Safari 15 and older). Every `*.avif` under /images/mundo-mayo has a
 * `*.webp` beside it. The <picture> is `display: contents` (world.css,
 * "Cross-browser fallbacks"), so the <img> lays out and matches selectors
 * exactly as a bare <img> would.
 */
export function AvifImg({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  return (
    <picture className="avif-img">
      <source type="image/avif" srcSet={src} />
      <img src={src.replace(/\.avif$/, ".webp")} alt={alt} {...props} />
    </picture>
  );
}
