"use client";

import { type CSSProperties, useEffect, useRef } from "react";

import { type AmbientIsland, type CanopyBox, ambientCanopies } from "@/content/ambient";
import { onFrame } from "@/lib/ambient";

const MOBILE = "(max-width: 48rem)";

/** Largest sway at the top of the crown, in CSS pixels. */
const SWAY_PX = 2.2;
/** Frames drawn per second: a breeze needs no more, and it halves the cost. */
const FPS = 30;

const VERTEX = `
attribute vec2 corner;
varying vec2 uv;
void main() {
  uv = corner * 0.5 + 0.5;
  uv.y = 1.0 - uv.y;
  gl_Position = vec4(corner, 0.0, 1.0);
}`;

/*
 * Displaces the cutout's pixels inside the box: a slow sway that grows with
 * the height above the trunk's base, gusts that come and go, and a much
 * smaller, quicker shimmer for the leaves. The weight falls to zero at the
 * box's edges, so the canvas meets the untouched cutout around it without
 * a seam; the field is smooth, so no leaf is stretched more than a pixel.
 */
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D image;
uniform float time;
uniform float pivot;
uniform vec2 amplitude;
varying vec2 uv;
void main() {
  float height = clamp((pivot - uv.y) / pivot, 0.0, 1.0);
  float edge = smoothstep(0.0, 0.14, uv.x) * smoothstep(0.0, 0.14, 1.0 - uv.x) * smoothstep(0.0, 0.1, uv.y);
  float weight = height * height * edge;
  float gust = 0.6 + 0.4 * sin(time * 0.37) * sin(time * 0.13 + 1.3);
  float sway = 0.62 * sin(time * 1.05 + uv.y * 2.2) + 0.26 * sin(time * 1.83 + 0.7 + uv.x * 1.5);
  vec2 offset = vec2(sway * gust, 0.22 * sin(time * 1.37 + uv.x * 3.1)) * amplitude;
  offset += vec2(sin(uv.y * 34.0 + time * 3.1), cos(uv.x * 37.0 + time * 2.6)) * amplitude * 0.1 * gust;
  gl_FragColor = texture2D(image, uv + offset * weight);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

type Breeze = { draw: (seconds: number) => void; dispose: () => void };

function createBreeze(canvas: HTMLCanvasElement, bitmap: ImageBitmap, box: CanopyBox, cssWidth: number): Breeze | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const corner = gl.getAttribLocation(program, "corner");
  gl.enableVertexAttribArray(corner);
  gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

  const time = gl.getUniformLocation(program, "time");
  gl.uniform1f(gl.getUniformLocation(program, "pivot"), (box.pivot - box.y) / box.h);
  const swayUv = SWAY_PX / cssWidth;
  gl.uniform2f(gl.getUniformLocation(program, "amplitude"), swayUv, swayUv * (canvas.width / canvas.height));
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);

  return {
    draw(seconds) {
      // Wrapped so mediump phones keep their precision; the jump comes once every ~17 minutes.
      gl.uniform1f(time, seconds % 1000);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

/** Position of the hole in the cutout's mask: CSS `mask-position` percentages place the box's far edge, not its near one. */
const holePosition = (start: number, size: number) => `${size >= 100 ? 0 : (start / (100 - size)) * 100}%`;

/**
 * A breeze in a tree's crown (docs/plans/2026-11-24-ambiente.md): a WebGL
 * canvas over the canopy box redraws that part of the island cutout with a
 * gentle, smooth displacement, while a mask cuts the same box out of the
 * cutout below so nothing shows twice. Only on the `full` tier, only while
 * the island is on screen (on the shared frame loop, at 30 fps), and only
 * once the cutout has loaded; if WebGL fails, the still cutout stays.
 */
export function CanopyBreeze({ island }: { island: AmbientIsland }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const boxes = ambientCanopies[island];

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.closest("section");
    const picture = canvas?.parentElement?.querySelector<HTMLElement>(".plate__picture--island");
    const image = picture?.querySelector("img");
    if (!canvas || !section || !picture || !image || !boxes) return;

    const media = window.matchMedia(MOBILE);
    let breeze: Breeze | null = null;
    let stop: (() => void) | null = null;
    let preparing = false;
    let disposed = false;

    function hide() {
      stop?.();
      stop = null;
      breeze?.dispose();
      breeze = null;
      picture!.removeAttribute("data-breeze");
      canvas!.removeAttribute("data-ready");
    }

    async function prepare() {
      preparing = true;
      try {
        if (!image!.complete) await new Promise((resolve) => image!.addEventListener("load", resolve, { once: true }));
        await image!.decode?.();
        const box = media.matches ? boxes!.mobile : boxes!.desktop;
        const rect = canvas!.getBoundingClientRect();
        if (disposed || !box || rect.width === 0 || !image!.naturalWidth) return;
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        canvas!.width = Math.round(rect.width * scale);
        canvas!.height = Math.round(rect.height * scale);
        const { naturalWidth: width, naturalHeight: height } = image!;
        const bitmap = await createImageBitmap(
          image!,
          Math.round((box.x / 100) * width),
          Math.round((box.y / 100) * height),
          Math.round((box.w / 100) * width),
          Math.round((box.h / 100) * height),
          { premultiplyAlpha: "premultiply" },
        );
        if (disposed) return bitmap.close();
        breeze = createBreeze(canvas!, bitmap, box, rect.width);
        bitmap.close();
        if (!breeze) return;
        breeze.draw(0);
        // Cut the box out of the cutout only once the canvas holds the crown. The
        // hole is 1.5 px smaller on every side than the canvas: at a fractional
        // position the two would otherwise leave a hairline of sky between them,
        // and at the box's edges the canvas draws the cutout's own pixels anyway.
        const insetX = 1.5 / (rect.width / box.w); // 1.5 px in % of the plate
        const insetY = 1.5 / (rect.height / box.h);
        const hole = { x: box.x + insetX, y: box.y + insetY, w: box.w - 2 * insetX, h: box.h - 2 * insetY };
        picture!.style.setProperty("--amb-hole-x", holePosition(hole.x, hole.w));
        picture!.style.setProperty("--amb-hole-y", holePosition(hole.y, hole.h));
        picture!.style.setProperty("--amb-hole-w", `${hole.w}%`);
        picture!.style.setProperty("--amb-hole-h", `${hole.h}%`);
        picture!.setAttribute("data-breeze", "");
        canvas!.setAttribute("data-ready", "");
      } catch {
        hide();
      } finally {
        preparing = false;
        update();
      }
    }

    function update() {
      if (disposed) return;
      const live =
        section!.hasAttribute("data-ambient-near") &&
        section!.hasAttribute("data-ambient-live") &&
        document.documentElement.dataset.ambient === "full";
      if (!live) {
        stop?.();
        stop = null;
        return;
      }
      if (!breeze) {
        if (!preparing && (media.matches ? boxes!.mobile : boxes!.desktop)) void prepare();
        return;
      }
      if (stop) return;
      let last = 0;
      const start = performance.now();
      stop = onFrame((now) => {
        if (now - last < 1000 / FPS - 2) return;
        last = now;
        breeze?.draw((now - start) / 1000);
      });
    }

    function reset() {
      hide();
      update();
    }

    const watch = new MutationObserver(update);
    watch.observe(section, { attributes: true, attributeFilter: ["data-ambient-live", "data-ambient-near"] });
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ambient"] });
    media.addEventListener("change", reset);
    canvas.addEventListener("webglcontextlost", hide);
    update();

    return () => {
      disposed = true;
      watch.disconnect();
      media.removeEventListener("change", reset);
      canvas.removeEventListener("webglcontextlost", hide);
      hide();
    };
  }, [boxes]);

  if (!boxes) return null;
  const { desktop, mobile } = boxes;
  const style = {
    "--amb-bx": `${desktop.x}%`,
    "--amb-by": `${desktop.y}%`,
    "--amb-bw": `${desktop.w}%`,
    "--amb-bh": `${desktop.h}%`,
    // The box's height as a number, to turn a shift in plate heights into canvas heights (the hero's lift).
    "--amb-bh-n": desktop.h,
    ...(mobile
      ? { "--amb-bx-m": `${mobile.x}%`, "--amb-by-m": `${mobile.y}%`, "--amb-bw-m": `${mobile.w}%`, "--amb-bh-m": `${mobile.h}%` }
      : {}),
  } as CSSProperties;
  return <canvas ref={ref} className={mobile ? "ambient-breeze" : "ambient-breeze ambient-breeze--desktop"} style={style} aria-hidden="true" />;
}
