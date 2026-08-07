type BridgeVariant = "water" | "roots" | "canopy" | "mist";

type SectionBridgeProps = {
  variant: BridgeVariant;
  reverse?: boolean;
};

const bridgePaths: Record<BridgeVariant, { main: string; secondary: string }> = {
  water: {
    main: "M-20 66 C120 2 226 126 386 54 C552 -20 698 112 862 42 C1022 -22 1154 104 1300 46",
    secondary: "M-20 96 C142 38 250 144 416 86 C580 28 736 132 892 76 C1054 18 1168 122 1300 72",
  },
  roots: {
    main: "M-20 28 C126 20 174 128 332 88 C474 50 518 10 670 42 C824 76 878 136 1022 88 C1134 50 1198 38 1300 58",
    secondary: "M112 42 C174 58 198 94 220 142 M670 42 C704 82 720 110 746 148 M1022 88 C1082 102 1118 126 1144 154",
  },
  canopy: {
    main: "M-20 110 C138 128 170 4 352 36 C514 64 566 146 728 104 C884 64 922 -4 1084 28 C1176 46 1240 96 1300 108",
    secondary: "M54 96 C128 70 182 54 246 62 M728 104 C794 86 846 72 912 76 M1084 28 C1142 46 1178 66 1214 92",
  },
  mist: {
    main: "M-20 74 C158 16 294 134 466 66 C636 -2 784 130 952 64 C1100 8 1194 62 1300 52",
    secondary: "M-20 112 C140 70 302 150 474 104 C666 52 792 150 980 102 C1116 66 1218 90 1300 84",
  },
};

export function SectionBridge({ variant, reverse = false }: SectionBridgeProps) {
  const paths = bridgePaths[variant];

  return (
    <div
      className={`section-bridge section-bridge--${variant}${reverse ? " section-bridge--reverse" : ""}`}
      data-bridge
      aria-hidden="true"
    >
      <svg viewBox="0 0 1280 170" preserveAspectRatio="none">
        <path
          className="section-bridge__path section-bridge__path--main"
          d={paths.main}
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="section-bridge__path section-bridge__path--secondary"
          d={paths.secondary}
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="section-bridge__pulse" />
    </div>
  );
}
