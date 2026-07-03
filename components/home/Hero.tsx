import Link from "next/link";
import { IceRink } from "@/components/IceRink";
import { Magnetic } from "@/components/Interactive";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-navy-900 text-white">
      <IceRink className="absolute inset-0 -z-10 h-full w-full" />

      <div className="container-page py-24">
        <div className="max-w-[46rem]">
          <p
            className="rise label-mono flex items-center gap-2 text-hero-muted"
            style={{ animationDelay: "40ms" }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-red" />
            {site.rink.name}
          </p>

          <h1
            className="rise mt-5 font-display text-[clamp(2.9rem,7.5vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em]"
            style={{ animationDelay: "110ms" }}
          >
            De snelste
            <br />
            teamsport <span className="text-red">ter wereld</span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg leading-relaxed text-hero-muted"
            style={{ animationDelay: "190ms" }}
          >
            IJshockey bij Leiden Lions. Elke zaterdag op het ijs in {site.rink.name},
            van oktober tot en met maart. Van de allerjongsten tot recreanten en
            competitie, er is een plek voor iedereen.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "260ms" }}>
            <Magnetic>
              <Link href="/inschrijven" className="btn btn-primary text-[1rem]">
                Kom proeftrainen
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#teams" className="btn btn-ghost-onnavy text-[1rem]">
                Bekijk de teams
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#intro"
        aria-label="Scroll naar beneden"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-hero-muted transition-colors hover:text-white sm:flex"
      >
        <span className="label-mono text-[0.62rem]">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden>
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="7" r="2" fill="currentColor">
            <animate
              attributeName="cy"
              values="7;13;7"
              dur="1.8s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.23 1 0.32 1; 0.23 1 0.32 1"
            />
          </circle>
        </svg>
      </a>
    </section>
  );
}
