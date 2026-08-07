export function NatureCurrent() {
  return (
    <div className="nature-current" aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          className="nature-current__bed"
          d="M78 0 C58 88 93 146 72 226 C49 313 86 382 61 469 C38 548 78 633 54 720 C36 785 67 884 42 1000"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="nature-current__glow"
          d="M78 0 C58 88 93 146 72 226 C49 313 86 382 61 469 C38 548 78 633 54 720 C36 785 67 884 42 1000"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="nature-current__branch"
          d="M72 226 C54 250 36 260 18 276 M61 469 C78 492 86 514 92 544 M54 720 C39 742 21 754 8 778"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
