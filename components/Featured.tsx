import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/Bits";
import { highlights } from "@/lib/site";

/**
 * "Uitgelicht": the club's priority messages, previously the rotating hero
 * slides. Shown all at once (no auto-carousel) directly under the hero so none
 * of the three is ever hidden.
 */
export function Featured() {
  return (
    <section id="uitgelicht" className="bg-ice py-20">
      <div className="container-page">
        <Reveal>
          <h2 className="mb-10 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-[-0.02em]">
            Uitgelicht
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 70}>
              <Link
                href={h.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_20px_40px_-28px_rgba(10,20,48,0.35)] outline-none ring-navy-600 transition-shadow duration-200 ease-out hover:shadow-[0_28px_54px_-26px_rgba(10,20,48,0.5)] focus-visible:ring-2"
              >
                <PhotoSlot
                  src={h.image}
                  alt=""
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="label-mono text-red-ink">{h.kicker}</span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.01em]">
                    {h.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{h.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-navy-600">
                    Lees verder
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      <path d="M4 9h9M9 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
