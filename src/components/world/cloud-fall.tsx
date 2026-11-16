import { MayoFigure } from "@/components/world/mayo-figure";

const layers = [
  { className: "fall__layer fall__layer--far", clouds: [[200, 120, 180, 50], [900, 80, 220, 60], [1400, 200, 160, 44]] },
  { className: "fall__layer fall__layer--mid", clouds: [[500, 300, 260, 70], [1200, 420, 300, 80], [100, 520, 200, 60]] },
  { className: "fall__layer fall__layer--near", clouds: [[300, 700, 360, 100], [1100, 640, 420, 110], [1500, 820, 260, 80]] },
] as const;

/**
 * Transition between island 1 (dawn) and island 2 (morning): Mayo falls
 * through clouds. Provisional version: three SVG cloud layers moved with
 * scroll-driven animations; the asset agent delivers the real frame
 * sequence (10–12 light images) and the lite tier shows the first frame.
 */
export function CloudFall() {
  return (
    <section className="fall" aria-label="Transición: Mayo cae entre las nubes">
      <div className="fall__stage" aria-hidden="true">
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
        <MayoFigure pose="fall" className="fall__mayo" />
      </div>
    </section>
  );
}
