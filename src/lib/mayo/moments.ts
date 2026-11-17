/**
 * The journey of the 3D Mayo: one entry per landing moment. Ported from
 * mayo-3d/preview/moments.js (single source of truth for the real-time
 * camera and for the captured images). Light presets follow the landing
 * order of islands: Juani's island (arrive + rest) is island 6 at twilight
 * and the questions island (chase firefly) is island 7 at night, so 08–10
 * differ from the reference until its images are recaptured.
 */
export type LightName =
  | "dawn"
  | "morning"
  | "noon"
  | "golden"
  | "sunset"
  | "twilight"
  | "night";

export type CameraSpec = { azimuth: number; elevation: number; lens: number };

export type Moment = {
  id: string;
  clip: string;
  loop: boolean;
  /** Clip frame used for the still image (1-based). */
  still: number;
  yaw: number;
  pitch: number;
  ground: boolean;
  light: LightName;
  camera: CameraSpec;
  cameraEnd?: CameraSpec;
  /** One-shot clip played when arriving from the previous moment. */
  intro?: string;
};

export const MOMENTS: readonly Moment[] = [
  { id: "01-hero", clip: "sit", loop: true, still: 13, yaw: 0, pitch: 0, ground: true, light: "dawn",
    camera: { azimuth: 0, elevation: 20, lens: 50 } },
  { id: "02-jump-void", clip: "jump_void", loop: false, still: 26, yaw: 0, pitch: 6, ground: false, light: "dawn",
    camera: { azimuth: 60, elevation: 20, lens: 45 }, cameraEnd: { azimuth: 60, elevation: 48, lens: 40 } },
  { id: "03-fall-float", clip: "fall_float", loop: true, still: 13, yaw: 0, pitch: 0, ground: false, light: "morning",
    camera: { azimuth: 70, elevation: -12, lens: 35 } },
  { id: "04-play-rocks", clip: "play_rocks", intro: "land", loop: true, still: 1, yaw: 0, pitch: 0, ground: true, light: "morning",
    camera: { azimuth: 25, elevation: 4, lens: 50 } },
  { id: "05-platform-jump", clip: "platform_jump", loop: false, still: 15, yaw: 0, pitch: 0, ground: false, light: "noon",
    camera: { azimuth: 90, elevation: 8, lens: 50 } },
  { id: "06-dig", clip: "dig", loop: true, still: 1, yaw: 0, pitch: 0, ground: true, light: "golden",
    camera: { azimuth: 35, elevation: 30, lens: 50 } },
  { id: "07-run", clip: "run", loop: true, still: 12, yaw: 0, pitch: 0, ground: true, light: "sunset",
    camera: { azimuth: 90, elevation: 6, lens: 50 } },
  { id: "09-arrive-right", clip: "run", loop: true, still: 12, yaw: 90, pitch: 0, ground: true, light: "twilight",
    camera: { azimuth: 0, elevation: 6, lens: 50 } },
  { id: "10-rest", clip: "rest", loop: true, still: 1, yaw: 0, pitch: 0, ground: true, light: "twilight",
    camera: { azimuth: 20, elevation: 16, lens: 50 } },
  { id: "08-chase-firefly", clip: "chase_firefly", loop: true, still: 12, yaw: 0, pitch: 0, ground: true, light: "night",
    camera: { azimuth: 75, elevation: 2, lens: 50 } },
];

export const FPS = 24;
export const GAZE_CLIPS = new Set(["idle", "sit", "rest"]);

export function getMoment(id: string) {
  const moment = MOMENTS.find((m) => m.id === id);
  if (!moment) throw new Error(`Unknown Mayo moment: ${id}`);
  return moment;
}
