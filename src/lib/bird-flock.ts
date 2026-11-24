/*
 * A flock of distant birds crossing an island's sky (docs/plans/2026-11-24-ambiente.md).
 * Pure simulation in plate units (x and y as fractions of the plate's width
 * and height); BirdFlock draws it. Each bird keeps a slot in a loose,
 * staggered line behind the leader, wanders around it on slow sine noise and
 * is pushed apart from any neighbour that comes too close, so the spacing
 * breathes like a real flock without ever collapsing. Wings flap in bursts
 * and glide in between, each bird on its own clock.
 */

export type Bird = {
  /** Slot behind the leader, in wingspans. */
  slotX: number;
  slotY: number;
  /** Current offset from the slot (wander + separation), in wingspans. */
  dx: number;
  dy: number;
  /** Size relative to the flock's wingspan. */
  scale: number;
  /** Flap phase (radians), beats per second, and the burst clock. */
  phase: number;
  beat: number;
  burst: number;
  flapFor: number;
  glideFor: number;
  /** 0 gliding, 1 flapping, eased between. */
  effort: number;
  seed: number;
};

export type Flock = {
  birds: Bird[];
  /** +1 crosses to the right, -1 to the left. */
  heading: 1 | -1;
  /** Seconds since the flock appeared, and the time it takes to cross. */
  time: number;
  duration: number;
  /** Altitude of the leader at the start (fraction of the plate height) and its slow swell. */
  y0: number;
  swell: number;
  swellRate: number;
  climb: number;
  /** Wingspan as a fraction of the plate width. */
  span: number;
  /** Aspect of the plate (height / width), to keep wingspans round in both axes. */
  aspect: number;
};

export type FlockOptions = {
  band: readonly [number, number];
  aspect: number;
  /** Wingspan as a fraction of the plate width. */
  span: number;
};

const MIN_GAP = 1.6; // wingspans

export function createFlock(random: () => number, { band, aspect, span }: FlockOptions): Flock {
  const count = 4 + Math.floor(random() * 5); // 4 to 8
  const birds: Bird[] = [];
  for (let i = 0; i < count; i++) {
    // Staggered line: every bird a bit behind and alternately above or below the one before.
    const rank = Math.ceil(i / 2);
    const side = i === 0 ? 0 : i % 2 === 0 ? 1 : -1;
    birds.push({
      slotX: -rank * (2.2 + random() * 0.8),
      slotY: side * rank * (1.1 + random() * 0.6),
      dx: (random() - 0.5) * 0.6,
      dy: (random() - 0.5) * 0.6,
      scale: 0.82 + random() * 0.32,
      phase: random() * Math.PI * 2,
      beat: 3.1 + random() * 1.1,
      burst: random() * 1.5,
      flapFor: 0.9 + random() * 0.9,
      glideFor: 0.5 + random() * 1.0,
      effort: 1,
      seed: random() * 1000,
    });
  }
  const [top, bottom] = band;
  return {
    birds,
    heading: random() < 0.5 ? 1 : -1,
    time: 0,
    duration: 12 + random() * 6,
    y0: (top + random() * (bottom - top)) / 100,
    swell: 0.01 + random() * 0.02,
    swellRate: 0.25 + random() * 0.25,
    climb: (random() - 0.5) * 0.06,
    span: span * (0.85 + random() * 0.3),
    aspect,
  };
}

/** Advances the flock by `seconds`. Returns false once it has left the plate. */
export function stepFlock(flock: Flock, seconds: number) {
  flock.time += seconds;
  const t = flock.time;
  for (const bird of flock.birds) {
    // Wander: two slow sines per axis on the bird's own seed.
    const s = bird.seed;
    const targetX = 0.35 * Math.sin(t * 0.7 + s) + 0.2 * Math.sin(t * 1.3 + s * 1.7);
    const targetY = 0.3 * Math.sin(t * 0.9 + s * 2.3) + 0.15 * Math.sin(t * 1.7 + s * 0.6);
    const follow = 1 - Math.exp(-seconds * 1.5);
    bird.dx += (targetX - bird.dx) * follow;
    bird.dy += (targetY - bird.dy) * follow;

    // Flap in bursts, glide in between.
    bird.burst += seconds;
    const flapping = bird.burst % (bird.flapFor + bird.glideFor) < bird.flapFor;
    bird.effort += ((flapping ? 1 : 0) - bird.effort) * (1 - Math.exp(-seconds * 6));
    bird.phase += seconds * bird.beat * Math.PI * 2 * (0.35 + 0.65 * bird.effort);
  }
  separate(flock.birds);
  return t < flock.duration;
}

/** Pushes apart any two birds closer than MIN_GAP wingspans. */
function separate(birds: Bird[]) {
  for (let i = 0; i < birds.length; i++) {
    for (let j = i + 1; j < birds.length; j++) {
      const a = birds[i];
      const b = birds[j];
      const x = a.slotX + a.dx - (b.slotX + b.dx);
      const y = a.slotY + a.dy - (b.slotY + b.dy);
      const distance = Math.hypot(x, y) || 0.0001;
      if (distance >= MIN_GAP) continue;
      const push = (MIN_GAP - distance) / 2;
      a.dx += (x / distance) * push;
      a.dy += (y / distance) * push;
      b.dx -= (x / distance) * push;
      b.dy -= (y / distance) * push;
    }
  }
}

export type BirdPose = {
  /** Centre, as fractions of the plate (x of its width, y of its height). */
  x: number;
  y: number;
  /** Wingspan, fraction of the plate width. */
  span: number;
  /** Wing position, -1 (down) to 1 (up). */
  wing: number;
  /** How far the wings are spread out of a glide's flat V, 0..1. */
  effort: number;
};

/** Where each bird is and how its wings sit now. */
export function flockPoses(flock: Flock): BirdPose[] {
  const progress = flock.time / flock.duration;
  // The leader crosses from just off one side to just off the other.
  const margin = 0.08;
  const travel = -margin + progress * (1 + 2 * margin);
  const leaderX = flock.heading > 0 ? travel : 1 - travel;
  const leaderY = flock.y0 + flock.climb * progress + flock.swell * Math.sin(flock.time * flock.swellRate * Math.PI * 2);
  const spanY = flock.span / flock.aspect; // a wingspan in plate heights
  return flock.birds.map((bird) => ({
    x: leaderX + flock.heading * (bird.slotX + bird.dx) * flock.span,
    y: leaderY + (bird.slotY + bird.dy) * spanY * 0.55,
    span: flock.span * bird.scale,
    wing: Math.sin(bird.phase),
    effort: bird.effort,
  }));
}
