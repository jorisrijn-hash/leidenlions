import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { sponsors, site } from "@/lib/site";

/**
 * Sponsors: three centered logo cards. Each renders its logo when set, else a
 * text fallback so the layout stays complete before a logo file exists.
 */
export function Sponsors() {
  return (
    <section id="sponsors" className="bg-ice py-20">
      <div className="container-page">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-[-0.02em]">
              Sponsors
            </h2>
            <a
              href={`mailto:${site.email}?subject=Sponsoring`}
              className="font-display text-sm font-bold text-navy-600 underline-offset-4 hover:underline"
            >
              Sponsor worden?
            </a>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {sponsors.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center rounded-2xl border border-line bg-surface p-7 text-center outline-none ring-navy-600 transition-colors duration-200 ease-out hover:border-navy-600 focus-visible:ring-2"
              >
                <div className="mb-5 flex h-20 w-full items-center justify-center">
                  {s.logo ? (
                    <div className="relative h-16 w-full">
                      <Image
                        src={s.logo}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 70vw, 220px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
                      {s.name}
                    </span>
                  )}
                </div>
                {s.blurb && <div className="text-sm font-semibold text-ink">{s.blurb}</div>}
                <div className="mt-1 font-mono text-xs text-steel">
                  {s.url.replace(/^https?:\/\/(www\.)?/, "")}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
