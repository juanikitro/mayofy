import { MayoFigure } from "@/components/world/mayo-figure";

// The mid and near layers also carry clouds along their bottom edge: they
// rise faster than the stage, and without them the last third of the fall
// showed empty sky above island 2.
const layers = [
  { className: "fall__layer fall__layer--far", clouds: [[200, 120, 180, 50], [900, 80, 220, 60], [1400, 200, 160, 44]] },
  { className: "fall__layer fall__layer--mid", clouds: [[500, 300, 260, 70], [1200, 420, 300, 80], [100, 520, 200, 60], [320, 900, 280, 75], [1050, 950, 320, 85]] },
  { className: "fall__layer fall__layer--near", clouds: [[300, 700, 360, 100], [1100, 640, 420, 110], [1500, 820, 260, 80], [700, 960, 380, 110], [1480, 990, 300, 90]] },
] as const;

/**
 * Transition between island 1 (dawn) and island 2 (morning): Mayo falls
 * through clouds. Provisional version: three SVG cloud layers moved with
 * scroll-driven animations; the asset agent delivers the real frame
 * sequence (10–12 light images); the reduced tier shows the first frame.
 * The near layer passes in front of Mayo (world.css), so she falls between
 * the clouds rather than over them; each cloud is lit from above.
 */
export function CloudFall() {
  return (
    <section className="fall" aria-label="Transición: Mayo cae entre las nubes">
      <div className="fall__stage" aria-hidden="true">
        <svg className="fall__defs" width="0" height="0" focusable="false">
          <defs>
            <linearGradient id="fall-cloud-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffaf6" />
              <stop offset="1" stopColor="#ecdde6" />
            </linearGradient>
          </defs>
        </svg>
        {layers.map((layer) => (
          <svg
            key={layer.className}
            className={layer.className}
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            {layer.clouds.map(([x, y, rx, ry], index) => (
              <g key={index} className="fall__cloud">
                <ellipse cx={x} cy={y} rx={rx} ry={ry} />
                <ellipse cx={x + rx * 0.35} cy={y - ry * 0.6} rx={rx * 0.55} ry={ry * 0.9} />
                <ellipse cx={x - rx * 0.4} cy={y - ry * 0.3} rx={rx * 0.45} ry={ry * 0.7} />
              </g>
            ))}
          </svg>
        ))}
        <MayoFigure slot="fall" className="fall__mayo" />
      </div>
    </section>
  );
}
