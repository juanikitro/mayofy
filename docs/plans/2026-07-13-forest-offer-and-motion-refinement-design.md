# Forest offer and motion refinement

## Goal

Turn the transition from the projects disclosure into the offer section into one
continuous nocturnal scene, while fixing the interactions that currently feel
static or abrupt.

## Approved direction

- Keep the existing Photographic / Workbench system, typography, tokens and
  `#00F69D` accent.
- Reduce the empty tail below “Ver más proyectos” and let the forest cover the
  complete offer section.
- Place the offer introduction and all three offer steps over that same forest
  stage, without cards or a new content wrapper.
- Feather the forest vertically and darken its lateral edges so the asset blends
  into the section instead of reading as a rectangular crop.
- Keep particle movement CSS-only. Use four asynchronous paths with larger
  travel and shorter, still-calm durations so movement is visible without a
  scroll listener or animation library.
- Preserve the shared native `<details>` implementation and guarantee a painted
  collapsed frame before the first opening transition begins.
- Give “Antes de escribir.” a one-shot, stepped text reveal triggered by the
  existing IntersectionObserver. The final text occupies its full layout from
  the start, so the effect cannot shift surrounding content.

## Accessibility and performance

- `prefers-reduced-motion` shows final states without spatial animation.
- The page remains a Server Component; only the existing details component uses
  client-side event logic.
- No dependency, scroll handler, canvas, layout-reading loop or new image is
  introduced.
- Responsive checks cover 320, 375, 414, 768 and desktop widths.

## Verification

- Measure the gap between the projects disclosure and the offer boundary.
- Sample particle transforms over time and confirm visible displacement.
- Trace the first opening of projects and FAQ at multiple timestamps.
- Verify the type reveal runs once and its reduced-motion final state is legible.
- Check horizontal overflow, console errors and the forest crop at the required
  responsive widths.
