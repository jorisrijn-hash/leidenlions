"use client";

import { useEffect, useRef } from "react";

type Glow = { x: number; y: number; r: number; hue: string; alpha: number; dx: number; dy: number };
type Dust = { x: number; y: number; r: number; vy: number; vx: number; a: number };

/**
 * Ambient ice-rink field. Deliberately subtle and dark so hero text stays >=AA.
 * - drifting cold "arena light" glows
 * - faint faceoff rings
 * - sparse rising ice dust
 * Pauses when the tab is hidden; renders a single static frame under reduced
 * motion; cleans up on unmount.
 */
export function IceRink({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    let glows: Glow[] = [];
    let dust: Dust[] = [];

    const buildScene = () => {
      glows = [
        { x: 0.22, y: 0.28, r: 0.55, hue: "87, 199, 236", alpha: 0.16, dx: 0.00006, dy: 0.00004 },
        { x: 0.78, y: 0.16, r: 0.5, hue: "30, 68, 168", alpha: 0.22, dx: -0.00005, dy: 0.00003 },
        { x: 0.6, y: 0.78, r: 0.62, hue: "87, 199, 236", alpha: 0.1, dx: 0.00004, dy: -0.00005 },
        { x: 0.12, y: 0.82, r: 0.45, hue: "30, 68, 168", alpha: 0.16, dx: 0.00005, dy: -0.00003 },
      ];
      const count = Math.min(46, Math.round((w * h) / 34000));
      dust = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.4 + Math.random() * 1.3,
        vy: 0.00003 + Math.random() * 0.00007,
        vx: (Math.random() - 0.5) * 0.00004,
        a: 0.15 + Math.random() * 0.35,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    };

    const drawBase = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0a1430");
      g.addColorStop(0.55, "#0c1a3d");
      g.addColorStop(1, "#0a1430");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawGlows = () => {
      const px = (pointer.x - 0.5) * 0.04;
      const py = (pointer.y - 0.5) * 0.04;
      ctx.globalCompositeOperation = "screen";
      for (const gl of glows) {
        const cx = (gl.x + px) * w;
        const cy = (gl.y + py) * h;
        const rad = gl.r * Math.max(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(${gl.hue}, ${gl.alpha})`);
        grad.addColorStop(1, `rgba(${gl.hue}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const drawRings = () => {
      const cx = w * 0.5;
      const cy = h * 1.02;
      const base = Math.min(w, h);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(160, 190, 240, 0.10)";
      ctx.lineWidth = 1.5;
      for (const rr of [0.42, 0.62, 0.86]) {
        ctx.beginPath();
        ctx.arc(0, 0, base * rr, Math.PI, Math.PI * 2);
        ctx.stroke();
      }
      // red center hash
      ctx.strokeStyle = "rgba(224, 51, 42, 0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-base * 0.06, -base * 0.42);
      ctx.lineTo(base * 0.06, -base * 0.42);
      ctx.stroke();
      ctx.restore();
    };

    const drawDust = (t: number) => {
      for (const d of dust) {
        d.y -= d.vy;
        d.x += d.vx + Math.sin(t * 0.0004 + d.y * 12) * 0.00002;
        if (d.y < -0.02) {
          d.y = 1.02;
          d.x = Math.random();
        }
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 222, 255, ${d.a})`;
        ctx.fill();
      }
    };

    const drawVignette = () => {
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.42,
        Math.min(w, h) * 0.2,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      grad.addColorStop(0, "rgba(10,20,48,0)");
      grad.addColorStop(1, "rgba(6,12,30,0.72)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    const frame = (t: number) => {
      // ease pointer toward target for spring-like feel without a library
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (const gl of glows) {
        gl.x += gl.dx;
        gl.y += gl.dy;
        if (gl.x < 0.05 || gl.x > 0.95) gl.dx *= -1;
        if (gl.y < 0.05 || gl.y > 0.95) gl.dy *= -1;
      }

      drawBase();
      drawGlows();
      drawRings();
      drawDust(t);
      drawVignette();

      if (running) raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      drawBase();
      drawGlows();
      drawRings();
      drawVignette();
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) {
      renderStatic();
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
