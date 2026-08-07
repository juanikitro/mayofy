import type { CSSProperties } from "react";

const particleLayers = [
  {
    className: "particle-field__layer particle-field__layer--far",
    particles: [
      [72, 96, 1, 1],
      [184, 276, 1.4, 0],
      [314, 68, 0.9, 0],
      [438, 512, 1.2, 2],
      [552, 188, 0.8, 0],
      [682, 742, 1.3, 0],
      [806, 362, 1, 3],
      [924, 102, 1.4, 0],
      [1048, 612, 0.9, 0],
      [1176, 248, 1.1, 4],
      [1328, 768, 1.3, 0],
      [1392, 436, 0.8, 0],
    ],
  },
  {
    className: "particle-field__layer particle-field__layer--mid",
    particles: [
      [128, 684, 1.8, 3],
      [258, 398, 1.5, 0],
      [392, 824, 2, 1],
      [526, 96, 1.6, 0],
      [648, 446, 1.9, 4],
      [772, 224, 1.5, 0],
      [902, 782, 2.1, 2],
      [1032, 318, 1.7, 0],
      [1168, 548, 1.9, 3],
      [1304, 132, 1.6, 0],
    ],
  },
  {
    className: "particle-field__layer particle-field__layer--near",
    particles: [
      [214, 154, 2.5, 0],
      [346, 628, 2.2, 4],
      [612, 292, 2.8, 0],
      [838, 586, 2.4, 1],
      [1094, 176, 2.7, 0],
      [1256, 704, 2.3, 2],
    ],
  },
] as const;

function getMotionStyle(cx: number, cy: number) {
  return {
    "--particle-duration": `${17 + ((cx + cy) % 8)}s`,
    "--particle-delay": `${-3 - ((cx * 3 + cy) % 18)}s`,
    "--particle-pulse-duration": `${5 + ((cx * 7 + cy) % 5)}s`,
    "--particle-pulse-delay": `${-1 - ((cx + cy * 5) % 17)}s`,
  } as CSSProperties;
}

export function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="firefly-halo-gradient">
            <stop
              className="particle-field__halo-stop particle-field__halo-stop--core"
              offset="0%"
            />
            <stop
              className="particle-field__halo-stop particle-field__halo-stop--mid"
              offset="42%"
            />
            <stop
              className="particle-field__halo-stop particle-field__halo-stop--edge"
              offset="100%"
            />
          </radialGradient>
        </defs>
        {particleLayers.map((layer) => (
          <g className={layer.className} key={layer.className}>
            {layer.particles.map(([cx, cy, radius, motion]) =>
              motion ? (
                <g
                  className={`particle-field__dot--moving particle-field__dot--motion-${motion}`}
                  key={`${cx}-${cy}`}
                  style={getMotionStyle(cx, cy)}
                >
                  <circle
                    className="particle-field__firefly-halo"
                    cx={cx}
                    cy={cy}
                    r={radius * 4.8}
                  />
                  <circle
                    className="particle-field__firefly-core"
                    cx={cx}
                    cy={cy}
                    r={radius}
                  />
                </g>
              ) : (
                <circle
                  className="particle-field__dot"
                  cx={cx}
                  cy={cy}
                  key={`${cx}-${cy}`}
                  r={radius}
                />
              ),
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
