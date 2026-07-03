"use client";

import { useEffect, useRef, type ReactNode } from "react";

const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Magnetic wrapper: the child eases toward the cursor by a fraction of the
 * offset, capped small, and springs back on leave. Fine-pointer + motion only.
 * GPU transform, interruptible (lerp retargets from current position).
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const clamp = (v: number) => Math.max(-max, Math.min(max, v));

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) * strength);
      ty = clamp((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [strength, max]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", willChange: "transform" }}>
      {children}
    </span>
  );
}

/**
 * Subtle cursor tilt for a single hero-scale element. Rotates a few degrees
 * toward the pointer, eased, resets on leave. Fine-pointer + motion only.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let trx = 0;
    let tryy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      trx = -py * max * 2;
      tryy = px * max * 2;
    };
    const onLeave = () => {
      trx = 0;
      tryy = 0;
    };
    const tick = () => {
      rx += (trx - rx) * 0.12;
      ry += (tryy - ry) * 0.12;
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
