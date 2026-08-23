"use client";

import { useEffect, useRef, useState } from "react";

import { FRAGMENT_SHADER, VERTEX_SHADER } from "@/components/hero/shader";

/**
 * WebGL2 hero field. No three.js.
 *
 * One fullscreen triangle and one fragment shader is the entire requirement;
 * three + @react-three/fiber would add ~200KB gzipped of scene graph, cameras
 * and loaders to draw a rectangle. This file plus the shader is under 8KB.
 *
 * Fades in over the CSS hero that is already painted underneath, so the LCP
 * element never waits on WebGL and a failure here is invisible.
 */
export function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Gates. Any failure leaves the CSS hero in place. ────────────────────
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return;

    // ── Program ─────────────────────────────────────────────────────────────
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vert = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");
    const uPaper = gl.getUniformLocation(program, "uPaper");
    const uInk = gl.getUniformLocation(program, "uInk");

    /* The hero draws ink on paper, so it has to follow the palette rather than
       carry its own copy of it — otherwise dark mode gets a bright rectangle. */
    let paper: [number, number, number] = [0.949, 0.937, 0.902];
    let ink: [number, number, number] = [0.078, 0.071, 0.055];

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      paper = parseColor(styles.getPropertyValue("--color-paper")) ?? paper;
      ink = parseColor(styles.getPropertyValue("--color-ink")) ?? ink;
    };
    readPalette();

    const themeWatcher = new MutationObserver(readPalette);
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ── State ───────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const smoothed = { x: 0, y: 0 };
    let intensity = 1;
    let inView = true;
    let running = true;
    let frame = 0;
    let lastDraw = 0;

    const isNarrow = window.innerWidth < 768;
    const fpsInterval = isNarrow ? 1000 / 30 : 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1 : 1.5);
      const scale = isNarrow ? 0.6 : 1;
      const w = Math.floor(canvas!.clientWidth * dpr * scale);
      const h = Math.floor(canvas!.clientHeight * dpr * scale);
      if (canvas!.width === w && canvas!.height === h) return;
      canvas!.width = w;
      canvas!.height = h;
      gl!.viewport(0, 0, w, h);
    }

    function onPointerMove(e: PointerEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = 1 - (e.clientY / window.innerHeight) * 2;
    }

    function onScroll() {
      // Full strength at the top, gone by one viewport down.
      intensity = Math.max(0, 1 - window.scrollY / window.innerHeight);
    }

    function onContextLost(e: Event) {
      e.preventDefault();
      running = false;
      setVisible(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    function onVisibility() {
      if (document.hidden) return;
      lastDraw = 0;
    }

    function render(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(render);

      // Off-screen or backgrounded: keep the loop alive but do no GPU work.
      if (!inView || document.hidden || intensity <= 0.001) return;
      if (fpsInterval && now - lastDraw < fpsInterval) return;
      lastDraw = now;

      resize();
      smoothed.x += (mouse.x - smoothed.x) * 0.06;
      smoothed.y += (mouse.y - smoothed.y) * 0.06;

      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, now * 0.001);
      gl!.uniform2f(uMouse, smoothed.x, smoothed.y);
      gl!.uniform1f(uIntensity, intensity);
      gl!.uniform3f(uPaper, paper[0], paper[1], paper[2]);
      gl!.uniform3f(uInk, ink[0], ink[1], ink[2]);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    resize();
    onScroll();
    setVisible(true);
    frame = requestAnimationFrame(render);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      themeWatcher.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 size-full transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

/** "#f2efe6" or "rgb(...)" to linear 0-1 triplets. Returns null if unreadable. */
function parseColor(value: string): [number, number, number] | null {
  const v = value.trim();
  const hex = /^#?([0-9a-f]{6})$/i.exec(v);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const rgb = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(v);
  if (rgb) return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];
  return null;
}
