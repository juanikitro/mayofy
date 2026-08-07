# Firefly glow and forest image quality

## Goal

Give the moving particles a visible firefly glow without bringing back scroll jank, and restore detail to the forest behind “No vendemos una página suelta” without changing its composition.

## Root causes

- The current firefly treatment is only a faint stroke around each moving circle, so the pulse brightens the point but does not create a soft light field.
- The desktop forest master is 1774 × 887 pixels and the mobile master is 862 × 1825 pixels.
- After the forest was expanded to cover the full offer section, `object-fit: cover` started enlarging the desktop asset beyond its native resolution.
- Next.js also re-encodes the already compressed WebP as AVIF at quality 80. This is a secondary loss of microdetail; the primary issue is the missing source pixels.

## Approved design

### Fireflies

- Wrap each moving particle in one SVG group.
- Keep the existing drift and double-flash opacity animations on that group.
- Render a compact core and a radial-gradient halo inside the group.
- Make the halo approximately 4.8 times the core radius.
- Share one SVG radial gradient across all fireflies.
- Do not use `filter`, `drop-shadow`, `feGaussianBlur`, animated radius, or another animation loop.
- Keep the existing mobile particle limits.
- Hide the halo in `lite`, `reduced`, and `prefers-reduced-motion` modes.

### Forest

- Request approximately two times the current resolution while preserving the existing desktop and mobile compositions.
- Preserve framing, tree placement, luminous path, green lighting, exposure, darkness, and negative space.
- Save versioned project assets instead of overwriting the current masters.
- Use a lossless generated master as the source and let Next.js perform a single delivery encode at quality 90.
- The built-in edit model retained the original pixel dimensions, so the final implementation uses its regenerated microdetail plus the lossless-to-quality-90 delivery path instead of claiming a literal 2× raster.

## Expected files

- `src/components/particle-field.tsx`
- `src/app/globals.css`
- `src/components/forest-rift.tsx`
- `next.config.ts`
- `public/images/forest-rift-desktop-hq.png`
- `public/images/forest-rift-mobile-hq.png`
- `.hallmark/log.json`

No files are deleted.

## Acceptance criteria

- Every moving firefly has a soft green halo that brightens with its existing double flash.
- The halo does not add filters or JavaScript animation work.
- `lite`, `reduced`, and reduced-motion modes do not render an animated halo.
- The forest composition remains recognizably identical while showing materially more bark, leaf, mist, and path detail.
- Desktop and mobile load the correct art-directed asset.
- The page has no horizontal overflow at 320, 375, 414, or 768 pixels.
- A focused browser trace shows no new long tasks during scroll.
