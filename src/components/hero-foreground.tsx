export function HeroForeground() {
  return (
    <svg
      className="hero__foreground"
      viewBox="0 0 1600 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <path
        className="hero__foreground-bank"
        d="M0 248 C126 212 238 224 356 274 C458 316 578 318 686 276 C804 230 914 214 1034 252 C1172 296 1306 302 1600 214 L1600 420 L0 420 Z"
      />
      <path
        className="hero__foreground-root"
        d="M0 272 C140 220 210 300 348 280 C476 262 536 338 688 286 M1012 274 C1120 226 1212 326 1334 282 C1430 248 1514 254 1600 224"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="hero__foreground-current hero__foreground-current--bed"
        d="M-24 350 C188 292 338 382 532 330 C734 274 862 354 1058 306 C1240 262 1396 300 1624 240"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="hero__foreground-current hero__foreground-current--glow"
        d="M-24 350 C188 292 338 382 532 330 C734 274 862 354 1058 306 C1240 262 1396 300 1624 240"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
