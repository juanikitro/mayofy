/**
 * Provisional Mayo. A flat SVG stand-in with the proportions of a border
 * collie, used until the 3D model from the `mayo-3d-character` worktree
 * delivers the GLB (full tier) and the static poses (lite/static tiers).
 * The wrapper keeps the slot the real asset will take: same class names,
 * same position hooks, same sizing.
 */
export type MayoPose = "idle" | "fall" | "play" | "jump" | "dig" | "run" | "chase" | "rest";

const labels: Record<MayoPose, string> = {
  idle: "Mayo, la border collie de Mayofy, parada en el borde de la isla",
  fall: "Mayo cayendo entre las nubes",
  play: "Mayo jugando entre rocas sueltas",
  jump: "Mayo saltando entre las plataformas de los packs",
  dig: "Mayo escarbando junto al invernadero",
  run: "Mayo corriendo por el sendero del proceso",
  chase: "Mayo persiguiendo luciérnagas",
  rest: "Mayo echada junto al fogón",
};

export function MayoFigure({
  pose,
  className = "",
}: {
  pose: MayoPose;
  className?: string;
}) {
  const label = labels[pose];

  return (
    <div className={`mayo mayo--${pose} ${className}`.trim()} data-mayo-pose={pose}>
      <svg
        className="mayo__art"
        viewBox="0 0 200 160"
        role="img"
        aria-label={label}
      >
        <title>{label}</title>
        <ellipse className="mayo__shadow" cx="100" cy="150" rx="58" ry="7" />
        {/* tail */}
        <path
          className="mayo__fur-dark"
          d="M42 92c-14-8-26-24-20-40 3 10 10 18 22 24z"
        />
        <path className="mayo__fur-light" d="M30 66c-2-6-2-10 0-14 4 6 8 10 12 14z" />
        {/* back legs */}
        <path className="mayo__fur-dark" d="M54 108l-6 34h12l4-30z" />
        <path className="mayo__fur-light" d="M48 142h12l1-8H49z" />
        {/* body */}
        <path
          className="mayo__fur-dark"
          d="M48 78c6-20 26-32 54-30 30 2 50 20 54 44 2 12-4 22-16 24H66c-16-2-24-18-18-38z"
        />
        <path
          className="mayo__fur-light"
          d="M92 82c14-6 32-6 50 2 10 4 14 14 12 24-4 8-12 10-22 8H86c-10-6-8-26 6-34z"
        />
        {/* front legs */}
        <path className="mayo__fur-light" d="M100 112l-4 30h12l2-30z" />
        <path className="mayo__fur-light" d="M130 112l2 30h12l-2-30z" />
        {/* neck + head */}
        <path
          className="mayo__fur-dark"
          d="M134 60c2-18 14-30 32-30 18 0 28 14 26 30-2 14-10 24-24 26-14 2-30-6-34-26z"
        />
        <path
          className="mayo__fur-light"
          d="M158 34c4-2 10-2 12 2-2 8-2 18 0 30 2 8 0 14-8 18-6 0-10-10-8-24 1-10 2-20 4-26z"
        />
        <path className="mayo__fur-light" d="M150 78c6 6 14 8 24 4-4 10-14 12-22 8z" />
        {/* ears */}
        <path className="mayo__fur-dark" d="M140 44l-8-20 20 10z" />
        <path className="mayo__fur-dark" d="M182 36l10-18-2 24z" />
        {/* eyes + nose */}
        <circle className="mayo__eye" cx="156" cy="52" r="3.5" />
        <circle className="mayo__eye" cx="178" cy="50" r="3.5" />
        <circle className="mayo__eye-light" cx="157" cy="51" r="1.2" />
        <circle className="mayo__eye-light" cx="179" cy="49" r="1.2" />
        <ellipse className="mayo__nose" cx="190" cy="66" rx="5" ry="4" />
        <path className="mayo__tongue" d="M176 80c4 8 10 8 14 0z" />
      </svg>
    </div>
  );
}
