export function CanopyConvergence() {
  return (
    <div className="canopy-convergence" data-bridge aria-hidden="true">
      <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
        <path
          className="canopy-convergence__mass canopy-convergence__mass--left"
          d="M0 0H496C452 35 431 79 402 119C365 171 316 193 253 213C164 241 86 291 0 333Z"
        />
        <path
          className="canopy-convergence__mass canopy-convergence__mass--crown"
          d="M0 0H1440V34C1310 22 1222 62 1106 44C1003 28 930 69 817 49C706 30 622 70 510 48C394 25 305 67 198 46C116 30 61 30 0 38Z"
        />
        <path
          className="canopy-convergence__mass canopy-convergence__mass--right"
          d="M1440 0H1018C1079 34 1098 90 1134 133C1178 187 1233 205 1296 229C1365 256 1408 296 1440 340Z"
        />
        <g className="canopy-convergence__trunks">
          <path d="M70 360C62 278 104 184 82 0" />
          <path d="M224 360C205 260 289 145 246 0" />
          <path d="M82 178C154 158 191 119 263 88" />
          <path d="M1212 360C1251 251 1178 145 1225 0" />
          <path d="M1375 360C1344 248 1392 128 1340 0" />
          <path d="M1222 170C1158 148 1118 113 1056 83" />
        </g>
        <g className="canopy-convergence__roots">
          <path
            className="canopy-convergence__root canopy-convergence__root--quiet"
            d="M0 276C221 218 426 245 720 332"
            pathLength="1"
          />
          <path
            className="canopy-convergence__root canopy-convergence__root--main"
            d="M353 210C504 226 592 270 720 332"
            pathLength="1"
          />
          <path
            className="canopy-convergence__root canopy-convergence__root--quiet"
            d="M1440 274C1201 219 1015 252 720 332"
            pathLength="1"
          />
        </g>
      </svg>
      <span className="canopy-convergence__opening" />
    </div>
  );
}
