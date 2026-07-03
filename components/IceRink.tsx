"use client";

import { useEffect, useRef } from "react";

type Glow = { x: number; y: number; r: number; hue: string; alpha: number; dx: number; dy: number };
type Dust = { x: number; y: number; r: number; vy: number; vx: number; a: number };
type Trail = { x: number; y: number; age: number };
type Spark = { x: number; y: number; vx: number; vy: number; age: number; life: number; rot: number; len: number };

/**
 * Interactive ice-rink field.
 * Ambient: drifting arena glows, faceoff rings, ice dust, vignette.
 * Interactive: a puck that is shoved away from the cursor with friction and
 * momentum, a frost trail under the pointer, and an ice-shard burst on click.
 * Pauses on hidden tab, cleans up, DPR-capped, and renders a single static
 * frame (puck at rest, no input handlers) under reduced motion.
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
    let raf = 0;
    let running = false;

    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4, cx: 0, cy: 0, inside: false };
    let glows: Glow[] = [];
    let dust: Dust[] = [];
    const trail: Trail[] = [];
    const sparks: Spark[] = [];
    const puck = { x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0 };
    let lastTrail = { x: 0, y: 0 };

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
      puck.hx = w * 0.5;
      puck.hy = h * 0.64;
      if (puck.x === 0 && puck.y === 0) {
        puck.x = puck.hx;
        puck.y = puck.hy;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const cy = h * 1.04;
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

    const drawTrail = () => {
      ctx.globalCompositeOperation = "screen";
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age += 1;
        const life = 42;
        if (p.age > life) {
          trail.splice(i, 1);
          continue;
        }
        const k = p.age / life;
        const rad = 6 + k * 26;
        const alpha = (1 - k) * 0.14;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        grad.addColorStop(0, `rgba(150, 210, 245, ${alpha})`);
        grad.addColorStop(1, "rgba(150, 210, 245, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const updatePuck = () => {
      // repel from pointer
      if (pointer.inside) {
        const dx = puck.x - pointer.cx;
        const dy = puck.y - pointer.cy;
        const d = Math.hypot(dx, dy) || 1;
        const R = 150;
        if (d < R) {
          const f = (1 - d / R) * 0.9;
          puck.vx += (dx / d) * f;
          puck.vy += (dy / d) * f;
        }
      }
      // gentle pull home so it never parks in a corner
      puck.vx += (puck.hx - puck.x) * 0.0022;
      puck.vy += (puck.hy - puck.y) * 0.0022;
      // friction
      puck.vx *= 0.94;
      puck.vy *= 0.94;
      // clamp speed
      const sp = Math.hypot(puck.vx, puck.vy);
      const maxSp = 6;
      if (sp > maxSp) {
        puck.vx = (puck.vx / sp) * maxSp;
        puck.vy = (puck.vy / sp) * maxSp;
      }
      puck.x += puck.vx;
      puck.y += puck.vy;
      // bounce off edges
      const m = 22;
      if (puck.x < m) {
        puck.x = m;
        puck.vx = Math.abs(puck.vx) * 0.6;
      } else if (puck.x > w - m) {
        puck.x = w - m;
        puck.vx = -Math.abs(puck.vx) * 0.6;
      }
      if (puck.y < m) {
        puck.y = m;
        puck.vy = Math.abs(puck.vy) * 0.6;
      } else if (puck.y > h - m) {
        puck.y = h - m;
        puck.vy = -Math.abs(puck.vy) * 0.6;
      }
    };

    const drawPuck = () => {
      const r = 13;
      // soft shadow on ice
      const sh = ctx.createRadialGradient(puck.x, puck.y + 6, 0, puck.x, puck.y + 6, r * 2.2);
      sh.addColorStop(0, "rgba(3, 8, 22, 0.5)");
      sh.addColorStop(1, "rgba(3, 8, 22, 0)");
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.ellipse(puck.x, puck.y + 6, r * 2.1, r * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
      // body
      const body = ctx.createLinearGradient(puck.x, puck.y - r, puck.x, puck.y + r);
      body.addColorStop(0, "#26324f");
      body.addColorStop(1, "#0d1526");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.ellipse(puck.x, puck.y, r, r * 0.82, 0, 0, Math.PI * 2);
      ctx.fill();
      // rim light
      ctx.strokeStyle = "rgba(140, 175, 230, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(puck.x, puck.y - 1.5, r - 1, r * 0.82 - 1, 0, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
    };

    const drawSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += 1;
        if (s.age > s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += 0.12;
        s.vx *= 0.98;
        s.x += s.vx;
        s.y += s.vy;
        const alpha = (1 - s.age / s.life) * 0.9;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot + s.age * 0.1);
        ctx.strokeStyle = `rgba(190, 226, 248, ${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-s.len / 2, 0);
        ctx.lineTo(s.len / 2, 0);
        ctx.stroke();
        ctx.restore();
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
      drawTrail();
      updatePuck();
      drawPuck();
      drawSparks();
      drawVignette();

      if (running) raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      drawBase();
      drawGlows();
      drawRings();
      puck.x = w * 0.5;
      puck.y = h * 0.64;
      drawPuck();
      drawVignette();
    };

    const setPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      pointer.inside = lx >= 0 && lx <= rect.width && ly >= 0 && ly <= rect.height;
      pointer.cx = lx;
      pointer.cy = ly;
      pointer.tx = lx / rect.width;
      pointer.ty = ly / rect.height;
      if (pointer.inside) {
        const dx = lx - lastTrail.x;
        const dy = ly - lastTrail.y;
        if (dx * dx + dy * dy > 200) {
          trail.push({ x: lx, y: ly, age: 0 });
          if (trail.length > 26) trail.shift();
          lastTrail = { x: lx, y: ly };
        }
      }
    };

    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      if (lx < 0 || lx > rect.width || ly < 0 || ly > rect.height) return;
      const n = 14;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
        const sp = 2 + Math.random() * 4;
        if (sparks.length > 60) sparks.shift();
        sparks.push({
          x: lx,
          y: ly,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 1.5,
          age: 0,
          life: 26 + Math.random() * 22,
          rot: Math.random() * Math.PI,
          len: 4 + Math.random() * 6,
        });
      }
      // a nudge to the puck if the click is near it
      const pdx = puck.x - lx;
      const pdy = puck.y - ly;
      const pd = Math.hypot(pdx, pdy) || 1;
      if (pd < 120) {
        puck.vx += (pdx / pd) * 4;
        puck.vy += (pdy / pd) * 4;
      }
    };

    let onScreen = true;
    const shouldRun = () => !reduce && onScreen && !document.hidden;
    const ensureLoop = () => {
      if (shouldRun() && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun() && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const onVisibility = () => ensureLoop();

    // Stop burning frames when the hero is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        ensureLoop();
      },
      { threshold: 0 }
    );

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    io.observe(canvas);

    if (reduce) {
      renderStatic();
    } else {
      window.addEventListener("pointermove", setPointer, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      ensureLoop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
