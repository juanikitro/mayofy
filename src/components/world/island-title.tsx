import type { TitleSegment } from "@/content/islands";

/** Renders an island title with its serif-italic keyword segments. */
export function IslandTitle({ segments }: { segments: readonly TitleSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          <span key={index}>{segment}</span>
        ) : (
          <em key={index}>{segment.em}</em>
        ),
      )}
    </>
  );
}
