import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

// Samples a photo into a cloud of points. Brightness drives size and depth,
// so the portrait has real relief when it tilts toward the cursor.

const COLS = 170;
const PLANE_H = 2.6;
const FOV = 35;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  uniform float uMouseStrength;

  attribute vec3 aStart;
  attribute float aLum;
  attribute float aSeed;
  attribute float aTint;

  varying float vLum;
  varying float vTint;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    float t = clamp((uProgress - aSeed * 0.45) / 0.55, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);

    vec3 target = position;
    target.z += sin(uTime * 0.9 + position.y * 3.0 + aSeed * 6.2831) * 0.018;

    vec3 p = mix(aStart, target, t);
    p += (aStart - target) * uScatter * (0.25 + aSeed * 0.6);

    vec2 d = p.xy - uMouse.xy;
    float heat = smoothstep(0.42, 0.0, length(d)) * uMouseStrength;
    p.xy += normalize(d + 1e-5) * heat * 0.16;
    p.z += heat * 0.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.45 + aLum) * uPixelRatio * (1.0 + heat * 0.9) / -mv.z;

    vLum = aLum;
    vTint = aTint;
    vAlpha = t;
    vHeat = heat;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;

  varying float vLum;
  varying float vTint;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, r);
    vec3 col = mix(uInk * (0.45 + 0.75 * vLum), uAccent, clamp(vTint + vHeat * 0.9, 0.0, 1.0));
    gl_FragColor = vec4(col, soft * (0.2 + 0.8 * vAlpha) * (0.45 + 0.55 * vLum));
  }
`;

function sampleImage(img: HTMLImageElement) {
  const rows = Math.round((COLS * img.naturalHeight) / img.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = COLS;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, COLS, rows);
  const { data } = ctx.getImageData(0, 0, COLS, rows);

  const planeW = (PLANE_H * COLS) / rows;
  const cell = PLANE_H / rows;
  const target: number[] = [];
  const start: number[] = [];
  const lum: number[] = [];
  const seed: number[] = [];
  const tint: number[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < COLS; x++) {
      const i = (y * COLS + x) * 4;
      const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
      // stretch contrast so mid-tones (suit, background) still register
      const l = Math.pow(Math.min(1, Math.max(0, (0.299 * r + 0.587 * g + 0.114 * b - 0.08) / 0.72)), 0.85);
      if (l < 0.07) continue;

      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;

      target.push(
        (x / COLS - 0.5) * planeW + (Math.random() - 0.5) * cell * 0.6,
        (0.5 - y / rows) * PLANE_H + (Math.random() - 0.5) * cell * 0.6,
        (l - 0.4) * 0.55,
      );

      // scattered start positions on a loose shell around the portrait
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const rad = 2 + Math.random() * 2.5;
      start.push(rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi));

      lum.push(l);
      seed.push(Math.random());
      tint.push(sat > 0.28 ? 1 : 0);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(target), 3));
  geometry.setAttribute("aStart", new BufferAttribute(new Float32Array(start), 3));
  geometry.setAttribute("aLum", new BufferAttribute(new Float32Array(lum), 1));
  geometry.setAttribute("aSeed", new BufferAttribute(new Float32Array(seed), 1));
  geometry.setAttribute("aTint", new BufferAttribute(new Float32Array(tint), 1));
  return { geometry, rows, count: lum.length };
}

type Props = {
  src: string;
  reducedMotion: boolean;
  onReady?: (count: number) => void;
  onError?: () => void;
};

export default function ParticlePortrait({ src, reducedMotion, onReady, onError }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      onError?.();
      return;
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
    const group = new Group();
    scene.add(group);

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: reducedMotion ? 1 : 0 },
      uScatter: { value: 0 },
      uSize: { value: 10 },
      uPixelRatio: { value: pixelRatio },
      uMouse: { value: new Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uInk: { value: new Color("#f2f4f7") },
      uAccent: { value: new Color("#c6ff3d") },
    };
    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    let rows = 200;
    let points: Points | null = null;
    let disposed = false;
    let readyAt = 0;

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      // fit the portrait's height (with a little breathing room) into view
      camera.position.z = (PLANE_H / 2 / Math.tan((FOV * Math.PI) / 360)) * 1.12;
      camera.updateProjectionMatrix();
      const pxPerUnit = h / (2 * camera.position.z * Math.tan((FOV * Math.PI) / 360));
      uniforms.uSize.value = (PLANE_H / rows) * pxPerUnit * camera.position.z * 1.25;
    };

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      const sampled = sampleImage(img);
      rows = sampled.rows;
      points = new Points(sampled.geometry, material);
      group.add(points);
      readyAt = performance.now();
      resize();
      onReady?.(sampled.count);
    };
    img.onerror = () => onError?.();

    // pointer → position on the portrait plane, in the group's local space
    const ndc = new Vector2();
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const hit = new Vector3();
    let hovering = false;
    const tilt = new Vector2();

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      hovering = true;
    };
    const onLeave = () => (hovering = false);
    const onUp = (e: PointerEvent) => e.pointerType !== "mouse" && onLeave();
    const onClick = () => {
      if (!reducedMotion) uniforms.uScatter.value = 1;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("click", onClick);

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // only animate while on screen and the tab is visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden || !points) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;

      if (!reducedMotion && uniforms.uProgress.value < 1) {
        uniforms.uProgress.value = Math.min(1, (now - readyAt) / 2600);
      }
      uniforms.uScatter.value *= Math.exp(-dt * 2.4);

      // tilt toward the cursor; gentle sway when idle
      const tx = hovering ? ndc.x : reducedMotion ? 0 : Math.sin(uniforms.uTime.value * 0.35) * 0.45;
      const ty = hovering ? ndc.y : reducedMotion ? 0 : Math.sin(uniforms.uTime.value * 0.27) * 0.2;
      tilt.x += (tx - tilt.x) * Math.min(1, dt * 4);
      tilt.y += (ty - tilt.y) * Math.min(1, dt * 4);
      group.rotation.y = tilt.x * 0.42;
      group.rotation.x = -tilt.y * 0.22;
      group.updateMatrixWorld();

      const strengthTarget = hovering ? 1 : 0;
      uniforms.uMouseStrength.value += (strengthTarget - uniforms.uMouseStrength.value) * Math.min(1, dt * 6);
      if (hovering) {
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(group.worldToLocal(hit));
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("click", onClick);
      points?.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src, reducedMotion]);

  return <div ref={hostRef} className="absolute inset-0 cursor-crosshair touch-pan-y" />;
}
