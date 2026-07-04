import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { sponsors, sponsorKliks, site } from "@/lib/site";

/**
 * Sponsors section. Each sponsor renders its logo when `logo` is set, otherwise
 * a clean text fallback, so the layout is complete before logo files are added.
 */
export function Sponsors() {
  return (
    <section id="sponsors" className="bg-ice py-24">
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-5 rounded-2xl border border-line bg-surface p-6 outline-none ring-navy-600 transition-colors duration-200 ease-out hover:border-navy-600 focus-visible:ring-2"
              >
                <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-ice">
                  {s.logo ? (
                    <div className="relative h-12 w-full">
                      <Image src={s.logo} alt={s.name} fill sizes="96px" className="object-contain p-1" />
                    </div>
                  ) : (
                    <span className="px-2 text-center font-display text-sm font-extrabold leading-tight tracking-tight text-navy-900">
                      {s.name}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold">{s.name}</div>
                  {s.blurb && <div className="text-sm text-muted">{s.blurb}</div>}
                  <div className="mt-1 truncate font-mono text-xs text-steel">
                    {s.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* SponsorKliks: free fundraising */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy-900 p-7 text-white sm:flex-row sm:items-center">
            <div>
              <div className="font-display text-lg font-bold">{sponsorKliks.label}</div>
              <p className="mt-1 text-sm text-hero-muted">
                Doe je aankopen via SponsorKliks en steun de club, zonder dat het jou iets extra kost.
              </p>
            </div>
            <a
              href={sponsorKliks.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shrink-0"
            >
              Naar SponsorKliks
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
