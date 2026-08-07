import type { ProjectVisualVariant } from "@/content/projects";

type ProjectVisualProps = {
  label: string;
  variant: ProjectVisualVariant;
  compact?: boolean;
};

const visualPaths: Record<
  ProjectVisualVariant,
  { ground: string; current: string; branch: string }
> = {
  threshold: {
    ground: "M0 188 C168 128 282 206 444 158 C612 108 742 178 940 116 L940 360 L0 360 Z",
    current: "M-20 286 C170 230 312 312 488 254 C648 202 770 258 960 184",
    branch: "M118 0 C148 86 108 146 178 212 M812 0 C768 70 824 128 748 210",
  },
  current: {
    ground: "M0 122 C152 172 286 94 430 142 C602 198 730 104 940 152 L940 360 L0 360 Z",
    current: "M-20 230 C148 176 306 252 458 214 C642 166 780 216 960 132",
    branch: "M54 40 C198 10 250 112 356 146 M628 30 C738 78 764 142 908 176",
  },
  canopy: {
    ground: "M0 164 C136 104 240 206 382 156 C516 108 660 202 940 112 L940 360 L0 360 Z",
    current: "M-20 264 C204 198 318 306 518 236 C674 182 812 232 960 170",
    branch: "M0 56 C156 104 244 18 394 64 M548 48 C690 102 792 20 940 54",
  },
  monolith: {
    ground: "M0 212 C210 194 282 238 440 206 C636 168 742 226 940 170 L940 360 L0 360 Z",
    current: "M-20 290 C204 248 356 304 530 256 C682 214 804 236 960 206",
    branch: "M472 28 L540 28 L564 208 L442 208 Z",
  },
  delta: {
    ground: "M0 176 C122 124 254 218 390 164 C538 106 722 206 940 138 L940 360 L0 360 Z",
    current: "M-20 232 C176 196 286 250 438 218 M438 218 C618 164 744 220 960 150 M438 218 C610 256 718 302 960 266",
    branch: "M188 24 C226 96 188 140 250 186 M746 18 C700 76 748 116 696 168",
  },
  grove: {
    ground: "M0 198 C158 136 284 220 432 174 C588 124 760 208 940 146 L940 360 L0 360 Z",
    current: "M-20 272 C156 216 318 292 482 238 C644 186 784 244 960 174",
    branch: "M126 0 C100 78 156 126 116 202 M336 0 C304 82 354 130 308 196 M742 0 C708 70 770 122 714 194 M874 0 C840 76 900 116 850 182",
  },
};

export function ProjectVisual({ label, variant, compact = false }: ProjectVisualProps) {
  const paths = visualPaths[variant];

  return (
    <figure
      className={`project-visual project-visual--${variant}${compact ? " project-visual--compact" : ""}`}
    >
      <svg viewBox="0 0 940 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="project-visual__atmosphere" d={paths.branch} />
        <path className="project-visual__ground" d={paths.ground} />
        <path className="project-visual__current project-visual__current--bed" d={paths.current} />
        <path className="project-visual__current project-visual__current--glow" d={paths.current} />
      </svg>
      <figcaption>
        <span>{label}</span>
        <small>Visual pendiente</small>
      </figcaption>
    </figure>
  );
}
