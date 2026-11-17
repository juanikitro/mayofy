import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { LIGHT_PRESETS, type LightPreset } from "@/lib/mayo/lighting";
import { FPS, GAZE_CLIPS, type CameraSpec, type Moment } from "@/lib/mayo/moments";

/*
 * Real-time Mayo scene, ported from mayo-3d/preview/mayo-scene.js:
 * renderer, look (lights, tone mapping, environment, contact shadow),
 * model + clips, per-moment camera and the cursor gaze. The captured
 * images are frames of exactly this scene, so the swap image → 3D is exact
 * when the page keeps the moment camera and a square viewport.
 */

const SENSOR = 36;
const MARGIN = 1.12;
const AO_DIRECT = 0.6;
/** NDC band (of 1) where the contact shadow fades out at the frame edge. */
const SHADOW_EDGE = 0.3;

export type CameraPose = {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  azimuth: number;
};

export type MayoScene = Awaited<ReturnType<typeof createMayoScene>>;

export async function createMayoScene({
  canvas,
  modelUrl,
}: {
  canvas: HTMLCanvasElement;
  modelUrl: string;
}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.18;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 50);

  const rig = new THREE.Group();
  scene.add(rig);
  const key = new THREE.DirectionalLight(0xffffff, 1);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 14;
  key.shadow.blurSamples = 24;
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.01;
  Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 1.5, bottom: -1.5, near: 0.1, far: 10 });
  const fill = new THREE.DirectionalLight(0xffffff, 1);
  const rim = new THREE.DirectionalLight(0xffffff, 1);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.3);
  for (const light of [key, fill, rim]) {
    rig.add(light);
    rig.add(light.target);
  }
  scene.add(hemi);
  let preset: LightPreset = LIGHT_PRESETS.morning;
  let camAzimuth = 0;
  const camTarget = new THREE.Vector3();

  // Long low-sun shadows reach the edge of the square frame; fade them out
  // over the outer SHADOW_EDGE of the viewport so the canvas (and the
  // captured images) never show a hard cut line.
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
  floorMaterial.onBeforeCompile = (shader) => {
    const declare = "varying vec4 vClip;\nvoid main() {";
    shader.vertexShader = shader.vertexShader
      .replace("void main() {", declare)
      .replace("#include <project_vertex>", "#include <project_vertex>\n  vClip = gl_Position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("void main() {", declare)
      .replace(
        "#include <tonemapping_fragment>",
        `vec2 ndc = abs(vClip.xy / vClip.w);
        gl_FragColor.a *= smoothstep(0.0, ${SHADOW_EDGE.toFixed(2)}, 1.0 - max(ndc.x, ndc.y));
        #include <tonemapping_fragment>`,
      );
  };
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(modelUrl);
  const holder = new THREE.Group();
  holder.rotation.order = "YXZ";
  holder.add(gltf.scene);
  scene.add(holder);
  const meshes: THREE.Mesh[] = [];
  const eyeBones: THREE.Bone[] = [];
  gltf.scene.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      meshes.push(mesh);
      const material = mesh.material as THREE.Material;
      if (material && (material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        const standard = material as THREE.MeshStandardMaterial;
        if (standard.name === "mayo_eye") {
          standard.roughness = 0.08;
        } else if (standard.name === "mayo_tongue") {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: standard.color,
            roughness: 0.32,
            clearcoat: 0.5,
            clearcoatRoughness: 0.3,
            sheen: 0.2,
            sheenColor: new THREE.Color(0xff5a6a),
          });
        } else {
          const coat = new THREE.MeshPhysicalMaterial({
            map: standard.map,
            normalMap: standard.normalMap,
            normalScale: standard.normalScale,
            roughnessMap: standard.roughnessMap,
            metalnessMap: standard.metalnessMap,
            roughness: standard.roughness,
            metalness: standard.metalness,
            color: standard.color,
            aoMap: standard.aoMap,
            aoMapIntensity: 1.0,
            sheen: 0.12,
            sheenRoughness: 0.6,
            sheenColor: new THREE.Color(0x8c99b3),
          });
          // three.js applies aoMap to indirect light only; also darken direct
          // light in the baked creases so the volume survives a strong sun.
          coat.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <aomap_fragment>",
              `#include <aomap_fragment>
              #ifdef USE_AOMAP
                reflectedLight.directDiffuse *= mix(1.0, ambientOcclusion, ${AO_DIRECT.toFixed(2)});
                reflectedLight.directSpecular *= mix(1.0, ambientOcclusion, ${AO_DIRECT.toFixed(2)});
              #endif`,
            );
          };
          mesh.material = coat;
        }
      }
    }
    if ((object as THREE.Bone).isBone && /^DEF-eye[LR]$/.test(object.name)) {
      eyeBones.push(object as THREE.Bone);
    }
  });

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const actions: Record<string, THREE.AnimationAction> = {};
  for (const clip of gltf.animations) actions[clip.name] = mixer.clipAction(clip);

  let current: THREE.AnimationAction | null = null;
  let currentName = "";

  function play(name: string, { loop = true, fade = 0.35, time = null as number | null } = {}) {
    const next = actions[name];
    if (!next) return;
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
    next.clampWhenFinished = !loop;
    if (next !== current) {
      next.reset().play();
      if (current && fade > 0) current.crossFadeTo(next, fade, false);
      else if (current) current.stop();
      current = next;
      currentName = name;
    }
    if (time !== null) {
      next.time = time;
      mixer.update(0);
    }
  }

  function applyMoment(moment: Moment) {
    holder.rotation.set(THREE.MathUtils.degToRad(moment.pitch), THREE.MathUtils.degToRad(moment.yaw), 0);
    floor.visible = moment.ground;
    if (moment.light) setLight(moment.light);
  }

  /** Pose a moment at a clip frame without blending. */
  function pose(moment: Moment, frame: number) {
    for (const action of Object.values(actions)) action.stop();
    current = null;
    play(moment.clip, { loop: moment.loop, fade: 0, time: (frame - 1) / FPS });
    applyMoment(moment);
  }

  /** Pose a moment at its still frame and return its framing sphere. */
  function frameOf(moment: Moment) {
    pose(moment, moment.still);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3();
    for (const mesh of meshes) box.expandByObject(mesh, true);
    return box.getBoundingSphere(new THREE.Sphere());
  }

  function cameraPose(sphere: THREE.Sphere, aspect: number, cam: CameraSpec): CameraPose {
    const { azimuth, elevation, lens } = cam;
    const vfov = 2 * Math.atan(SENSOR / (2 * lens) / Math.max(aspect, 1));
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    const dist = (sphere.radius * MARGIN) / Math.sin(Math.min(vfov, hfov) / 2);
    const a = THREE.MathUtils.degToRad(azimuth);
    const e = THREE.MathUtils.degToRad(elevation);
    const dir = new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
    return {
      position: sphere.center.clone().addScaledVector(dir, dist),
      target: sphere.center.clone(),
      fov: THREE.MathUtils.radToDeg(vfov),
      azimuth,
    };
  }

  function setCamera(cameraPoseValue: CameraPose) {
    camera.position.copy(cameraPoseValue.position);
    camera.fov = cameraPoseValue.fov;
    camera.lookAt(cameraPoseValue.target);
    camera.updateProjectionMatrix();
    camAzimuth = cameraPoseValue.azimuth;
    camTarget.copy(cameraPoseValue.target);
    applyLight();
  }

  function applyLight() {
    renderer.toneMappingExposure = preset.exposure;
    scene.environmentIntensity = preset.env;
    const pairs: Array<[THREE.DirectionalLight, LightPreset["key"]]> = [
      [key, preset.key],
      [fill, preset.fill],
      [rim, preset.rim],
    ];
    for (const [light, spec] of pairs) {
      light.color.set(spec.color);
      light.intensity = spec.intensity;
      const a = THREE.MathUtils.degToRad(camAzimuth + spec.offset);
      const e = THREE.MathUtils.degToRad(spec.el);
      light.position
        .copy(camTarget)
        .add(new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)).multiplyScalar(4));
      light.target.position.copy(camTarget);
    }
    hemi.color.set(preset.hemi.sky);
    hemi.groundColor.set(preset.hemi.ground);
    hemi.intensity = preset.hemi.intensity;
    floorMaterial.opacity = preset.shadow;
  }

  function setLight(value: LightPreset | keyof typeof LIGHT_PRESETS) {
    preset = typeof value === "string" ? LIGHT_PRESETS[value] : value;
    applyLight();
  }

  const pointer = new THREE.Vector2();
  let gazeOn = false;
  let gazeApplied = false;
  const MAX_GAZE = THREE.MathUtils.degToRad(28);
  const ray = new THREE.Raycaster();
  const UP = new THREE.Vector3(0, 1, 0);
  const clipPoses = new WeakMap<THREE.Bone, THREE.Quaternion>();

  function setPointer(x: number, y: number) {
    pointer.set(x, y);
    gazeOn = true;
  }

  function applyGaze() {
    gazeApplied = false;
    if (!gazeOn || !eyeBones.length || !GAZE_CLIPS.has(currentName)) return;
    gazeApplied = true;
    scene.updateMatrixWorld();
    ray.setFromCamera(pointer, camera);
    const distance = camera.position.distanceTo(holder.getWorldPosition(new THREE.Vector3()));
    const target = ray.ray.at(distance, new THREE.Vector3());
    for (const bone of eyeBones) {
      let saved = clipPoses.get(bone);
      if (!saved) {
        saved = new THREE.Quaternion();
        clipPoses.set(bone, saved);
      }
      saved.copy(bone.quaternion);
      const worldQuat = bone.getWorldQuaternion(new THREE.Quaternion());
      const forward = UP.clone().applyQuaternion(worldQuat);
      const dir = target.clone().sub(bone.getWorldPosition(new THREE.Vector3())).normalize();
      const angle = forward.angleTo(dir);
      if (angle > MAX_GAZE) dir.lerpVectors(forward, dir, MAX_GAZE / angle).normalize();
      const delta = new THREE.Quaternion().setFromUnitVectors(forward, dir);
      const parentInverse = bone.parent!.getWorldQuaternion(new THREE.Quaternion()).invert();
      bone.quaternion.copy(parentInverse.multiply(delta.multiply(worldQuat)));
    }
  }

  function render(dt = 0) {
    if (dt) mixer.update(dt);
    applyGaze();
    renderer.render(scene, camera);
    if (gazeApplied) {
      for (const bone of eyeBones) {
        const saved = clipPoses.get(bone);
        if (saved) bone.quaternion.copy(saved);
      }
    }
  }

  function dispose() {
    renderer.setAnimationLoop(null);
    mixer.stopAllAction();
    pmrem.dispose();
    renderer.dispose();
  }

  return {
    renderer,
    scene,
    camera,
    mixer,
    actions,
    holder,
    play,
    pose,
    applyMoment,
    frameOf,
    cameraPose,
    setCamera,
    setLight,
    setPointer,
    render,
    dispose,
    get currentName() {
      return currentName;
    },
  };
}
