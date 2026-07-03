"use client";

import { useEffect, useRef } from "react";
import { allTeams } from "@/lib/site";

/**
 * Team-name marquee whose speed and direction respond to scroll velocity.
 * Idle: slow leftward drift. Scrolling adds momentum; direction follows the
 * scroll. Reduced motion: fully static, still readable. Single rAF, passive
 * scroll listener, GPU transform.
 */
export function TeamMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let offset = 0;
    let half = track.scrollWidth / 2;
    let lastScroll = window.scrollY;
    let vel = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const onScroll = () => {
      vel += window.scrollY - lastScroll;
      lastScroll = window.scrollY;
    };

    const tick = () => {
      vel *= 0.9;
      // base drift + scroll contribution, clamped so fast scroll can't blur it
      let speed = 0.4 + vel * 0.22;
      speed = Math.max(-9, Math.min(9, speed));
      offset -= speed;
      if (half > 0) {
        if (offset <= -half) offset += half;
        else if (offset > 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="overflow-hidden bg-navy-900 py-5 text-white select-none">
      <div ref={trackRef} className="flex w-max items-center gap-8 pr-8 will-change-transform">
        {[...allTeams, ...allTeams].map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-xl font-bold tracking-tight text-white/90">{t.name}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
