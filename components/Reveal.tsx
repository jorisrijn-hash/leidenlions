"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms delay for staggering siblings. Keep small (30-80ms steps). */
  delay?: number;
  as?: ElementType;
};

/**
 * Reveal-safe by design: the server/no-JS render is fully visible. Motion is
 * an enhancement layered on after mount, and disabled under reduced-motion.
 * This avoids the classic failure where a class-gated transition never fires
 * (hidden tab, crawler) and ships a blank section.
 */
export function Reveal({ children, className, delay = 0, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount: show without hiding first (no flash).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;

  return (
    <Tag
      ref={ref}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
        transition: `opacity 0.6s var(--ease-out) ${delay}ms, transform 0.6s var(--ease-out) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
