import { MayoFigure } from "@/components/world/mayo-figure";

/**
 * Island 1: dawn meadow. Provisional scene drawn with SVG layers so the
 * composition, parallax hooks and Mayo slot exist before the generated
 * plates arrive. Each layer maps to one asset from the visual bible:
 * sky (03), far islands (01 background), main island (01), foliage (04).
 */
export function HeroIsland() {
  return (
    <div className="scene scene--dawn" aria-hidden="true">
      <div className="scene__sky">
        <svg className="scene__clouds" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice">
          <g className="scene__cloud">
            <ellipse cx="260" cy="150" rx="150" ry="42" />
            <ellipse cx="310" cy="120" rx="90" ry="48" />
            <ellipse cx="200" cy="130" rx="70" ry="36" />
          </g>
          <g className="scene__cloud scene__cloud--far">
            <ellipse cx="1180" cy="110" rx="190" ry="40" />
            <ellipse cx="1240" cy="80" rx="100" ry="46" />
          </g>
          <g className="scene__cloud scene__cloud--low">
            <ellipse cx="1420" cy="420" rx="170" ry="38" />
            <ellipse cx="1470" cy="396" rx="80" ry="40" />
          </g>
        </svg>
      </div>

      <svg className="scene__far" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
        <g className="scene__far-island">
          <ellipse cx="1290" cy="300" rx="120" ry="22" />
          <path d="M1180 302c20 60 60 90 110 100 50-10 90-40 110-100z" />
        </g>
        <g className="scene__far-island scene__far-island--small">
          <ellipse cx="300" cy="360" rx="70" ry="14" />
          <path d="M236 362c12 36 36 54 64 60 28-6 52-24 64-60z" />
        </g>
      </svg>

      <svg className="scene__island" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax meet">
        <g className="island">
          <path
            className="island__rock"
            d="M120 300c-30 60-10 120 40 150 40 24 90 20 130 60 40 40 80 10 130 20 60 10 90-30 150-20 70 12 110-30 150-20 50 12 100-30 120-80 20-50 60-90 40-130-30-60-820-60-760 20z"
          />
          <path
            className="island__rock-shade"
            d="M200 360c20 60 60 90 110 100 50-10 90-40 110-100-40 30-120 30-220 0z"
          />
          <path
            className="island__moss"
            d="M110 300c0 30 20 50 50 56 20 4 40-6 60 2 30 10 50 0 80 4 40 6 60-10 100-4 40 6 70-6 110 0 50 8 80-10 120-2 40 8 80-12 120-4 60 12 110-10 130-50 0-30-770-40-770-2z"
          />
          <ellipse className="island__meadow" cx="600" cy="286" rx="500" ry="70" />
          <ellipse className="island__meadow-light" cx="640" cy="266" rx="360" ry="40" />
          <g className="island__tree">
            <path className="island__trunk" d="M236 270c-2-40 0-80 6-120h14c-2 40-2 80 2 120z" />
            <circle className="island__canopy" cx="244" cy="130" r="56" />
            <circle className="island__canopy-light" cx="262" cy="112" r="34" />
          </g>
          <g className="island__stones">
            <ellipse cx="880" cy="290" rx="34" ry="18" />
            <ellipse cx="930" cy="304" rx="22" ry="12" />
          </g>
          <g className="island__flowers">
            <circle cx="420" cy="300" r="4" />
            <circle cx="470" cy="312" r="3" />
            <circle cx="720" cy="318" r="4" />
            <circle cx="780" cy="296" r="3" />
          </g>
        </g>
      </svg>

      <svg className="scene__fore" viewBox="0 0 600 300" preserveAspectRatio="xMinYMax meet">
        <path d="M0 300c20-90 50-150 110-190-30 70-50 130-50 190z" />
        <path d="M60 300c10-70 40-120 90-150-20 60-40 100-40 150z" />
        <path d="M140 300c30-60 70-90 120-100-50 30-80 60-90 100z" />
        <path className="scene__fore-light" d="M20 300c30-60 60-100 100-120-40 50-60 80-70 120z" />
      </svg>

      <MayoFigure slot="hero" className="scene__mayo" eager />
    </div>
  );
}
