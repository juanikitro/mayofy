# Firefly particles and bridge cleanup

## Goal

Remove the decorative line that reads as a broken connection between the forest offer and the following bridge, then make the moving background particles feel like independent fireflies without bringing back scroll jank.

## Root cause

The marked line is not part of the section bridge SVG. It is the separate `.forest-rift__current` element, positioned at a fixed horizontal percentage and stretched through the final quarter of the forest. Its endpoint nearly touches the curved bridge, but the long vertical stem creates an accidental T-junction and begins without a visual source.

The moving particles currently use four three-point paths with `alternate`, so each one visibly retraces the same route. Their opacity is static, which prevents them from reading as living light.

## Approved design

- Remove the independent forest current and let the existing mist bridge own the section transition.
- Keep the current number of moving particles; do not animate the full field.
- Replace back-and-forth drift with closed paths whose first and final positions match.
- Give each path five or six waypoints and a small scale variation for more organic motion.
- Add a second, independent opacity animation with two short flashes and a longer resting interval.
- Derive drift and pulse durations and negative delays from each particle's coordinates so the field never synchronizes.
- Use a faint static stroke as the halo. Do not use blur, filters, animated radius, or animated stroke width.
- Preserve the existing `lite`, `reduced`, mobile, and `prefers-reduced-motion` fallbacks.

## Scope

- `src/components/forest-rift.tsx`
- `src/components/particle-field.tsx`
- `src/app/globals.css`
- `.hallmark/log.json`

No dependencies, routes, copy, tokens, or production files are removed.

## Acceptance criteria

- The vertical filament is absent at desktop and mobile widths.
- Moving particles follow non-reversing closed routes.
- Firefly flashes are visible, irregular, and desynchronized.
- Only transform and opacity animate.
- Reduced-motion and lite tiers do not run the new animations.
- The page remains free of horizontal overflow at 320, 375, 414, and 768 pixels.
