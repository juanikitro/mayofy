import type { CaseShot as Shot } from "@/content/projects";

function srcSet(shot: Shot, format: "avif" | "webp" | "jpg") {
  return shot.widths.map((width) => `${shot.src}-${width}.${format} ${width}w`).join(", ");
}

/**
 * A real capture of a case study, inside a browser window or a phone, at the
 * capture's own aspect ratio. `sizes` is the frame's rendered width; the
 * cover passes `priority` so the browser fetches it first.
 */
export function CaseShot({ shot, sizes, priority = false }: { shot: Shot; sizes: string; priority?: boolean }) {
  const fallback = `${shot.src}-${shot.widths[Math.min(1, shot.widths.length - 1)]}.jpg`;
  const picture = (
    <picture className="caso-frame__picture">
      <source type="image/avif" srcSet={srcSet(shot, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(shot, "webp")} sizes={sizes} />
      <img
        src={fallback}
        srcSet={srcSet(shot, "jpg")}
        sizes={sizes}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );

  if (shot.device === "phone") return <div className="caso-frame caso-frame--phone">{picture}</div>;

  return (
    <div className="caso-frame caso-frame--browser">
      <div className="caso-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        {shot.host ? <span>{shot.host}</span> : null}
      </div>
      {picture}
    </div>
  );
}
