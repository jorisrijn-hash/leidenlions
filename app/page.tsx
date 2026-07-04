import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/Featured";
import { Sponsors } from "@/components/Sponsors";
import { Updates } from "@/components/Updates";
import { TeamMarquee } from "@/components/home/TeamMarquee";
import { Reveal } from "@/components/Reveal";
import { Magnetic, Tilt } from "@/components/Interactive";
import { RinkLine, PhotoSlot } from "@/components/Bits";
import { jeugdTeams, seniorenTeams, allTeams, site } from "@/lib/site";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.rink.name} ${site.rink.street} ${site.rink.postal}`
)}`;

export default function Home() {
  return (
    <>
      <Hero />

      {/* Uitgelicht: the club's 3 key messages, surfaced right under the hero */}
      <Featured />

      {/* Intro ---------------------------------------------------------- */}
      <section id="intro" className="bg-ice py-24">
        <div className="container-page">
          <RinkLine className="mb-14 max-w-3xl" />
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
                Snel, fysiek en verslavend leuk
              </h2>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
                IJshockey is de snelste teamsport ter wereld. Bij Leiden Lions
                stap je het hele seizoen het ijs op, {site.season.toLowerCase()}.
                Of je nu nooit geschaatst hebt of al jaren meedraait, er is een
                team dat bij je past.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 max-w-md">
                <Fact k="Seizoen" v="Okt - mrt" />
                <Fact k="Speeldag" v="Elke zaterdag" />
                <Fact k="Locatie" v={site.rink.name} />
                <Fact k="Teams" v={`${allTeams.length} teams`} />
              </dl>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/inschrijven" className="btn btn-primary">
                  Kom proeftrainen
                </Link>
                <Link href="#teams" className="btn btn-ghost">
                  Bekijk de teams
                </Link>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <Tilt className="rounded-2xl">
                <PhotoSlot
                  src="/photos/action-goalie.webp"
                  alt="IJshockeyer in actie tijdens een wedstrijd"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[4/3] w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(10,20,48,0.5)]"
                />
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team-name marquee (scroll-velocity reactive) ------------------ */}
      <TeamMarquee />

      {/* Sponsors (surfaced high, between the carousel and the teams) --- */}
      <Sponsors />

      {/* Teams overview ------------------------------------------------- */}
      <section id="teams" className="bg-surface py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-[-0.02em]">
              Vind jouw team
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted">
              Van de allerjongsten op de ijshockeyschool tot recreanten en
              competitieteams. Kies waar je thuishoort.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Jeugd: an age ladder (order carries meaning) */}
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-display text-xl font-bold">Jeugd</h3>
                <span className="label-mono text-steel">t/m 16 jaar</span>
              </div>
              <ol className="relative">
                {jeugdTeams.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      href={`/jeugd/${t.slug}`}
                      className="group flex items-center gap-4 border-t border-line py-4 transition-colors hover:bg-ice"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy-900 font-mono text-sm font-bold text-white">
                        {t.short}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display font-bold">{t.name}</span>
                        <span className="block text-sm text-muted">{t.age}</span>
                      </span>
                      <span className="label-mono hidden text-steel sm:block">{t.level}</span>
                      <Arrow />
                    </Link>
                    {i === jeugdTeams.length - 1 && <div className="border-t border-line" />}
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Senioren: a roster with level tags */}
            <Reveal delay={80}>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-display text-xl font-bold">Senioren</h3>
                <span className="label-mono text-steel">{seniorenTeams.length} teams</span>
              </div>
              <ul>
                {seniorenTeams.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      href={`/senioren/${t.slug}`}
                      className="group flex items-center gap-4 border-t border-line py-4 transition-colors hover:bg-ice"
                    >
                      <span className="min-w-0 flex-1 font-display font-bold">{t.name}</span>
                      <span className="label-mono rounded-full bg-ice px-2.5 py-1 text-steel">
                        {t.level}
                      </span>
                      <Arrow />
                    </Link>
                    {i === seniorenTeams.length - 1 && <div className="border-t border-line" />}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IJshockeyschool feature (navy band for rhythm) ----------------- */}
      <section className="bg-navy-900 py-24 text-white">
        <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <PhotoSlot
              src="/photos/jeugd-kids.webp"
              alt="Jonge spelers van de ijshockeyschool op het ijs"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[3/2] w-full rounded-2xl"
            />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Nooit geschaatst? Begin hier.
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-hero-muted">
              De ijshockeyschool is de startplek voor iedereen die het spel wil
              leren. Je leert schaatsen, de stick hanteren en de eerste
              spelregels, in je eigen tempo en met plezier voorop.
            </p>
            <div className="mt-8">
              <Link href="/ijshockeyschool" className="btn btn-primary">
                Naar de ijshockeyschool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Praktisch / waar we spelen ------------------------------------- */}
      <section className="bg-ice py-24">
        <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-[-0.02em]">
              Waar we spelen
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              Alle trainingen en thuiswedstrijden zijn in {site.rink.name}. Kom
              gerust een keer langs op zaterdag om de sfeer te proeven.
            </p>
            <address className="mt-7 space-y-1 text-base not-italic leading-relaxed text-ink">
              <div className="font-display text-lg font-bold">{site.rink.name}</div>
              <div className="text-muted">{site.rink.street}</div>
              <div className="text-muted">{site.rink.postal}</div>
            </address>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Bekijk op de kaart
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <PhotoSlot
              src="/photos/rink.webp"
              alt={`Interieur van ${site.rink.name}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[16/9] w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(10,20,48,0.4)]"
            />
          </Reveal>
        </div>
      </section>

      {/* Sfeer gallery -------------------------------------------------- */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-[-0.02em]">
                Sfeer op het ijs
              </h2>
              <p className="max-w-sm text-muted">
                Teams, wedstrijden en de club door de jaren heen.
              </p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid gap-4 sm:grid-cols-4 sm:grid-rows-2">
              <PhotoSlot
                src="/photos/team-blues.webp"
                alt="Teamfoto Leiden Blues"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[16/10] rounded-xl sm:col-span-2 sm:row-span-2 sm:aspect-auto"
              />
              <PhotoSlot
                src="/photos/team-meiden.webp"
                alt="Teamfoto Leiden Meiden"
                sizes="(max-width: 640px) 100vw, 25vw"
                className="aspect-[4/3] rounded-xl sm:col-span-2"
              />
              <PhotoSlot
                src="/photos/action-wide.webp"
                alt="IJshockeywedstrijd in actie"
                sizes="(max-width: 640px) 100vw, 25vw"
                className="aspect-[4/3] rounded-xl sm:col-span-2"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Updates -------------------------------------------------------- */}
      <Updates />

      {/* Final CTA ------------------------------------------------------ */}
      <section className="bg-navy-900 py-24 text-white">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Klaar om het ijs op te gaan?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-hero-muted">
              Plan een gratis proeftraining en ontdek waarom ijshockey zo
              verslavend is. We zien je graag op zaterdag.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Link href="/inschrijven" className="btn btn-primary text-[1rem]">
                  Schrijf je in
                </Link>
              </Magnetic>
              <a href={`mailto:${site.email}`} className="btn btn-ghost-onnavy text-[1rem]">
                Stel een vraag
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="label-mono text-steel">{k}</dt>
      <dd className="mt-1 font-display text-lg font-bold">{v}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="shrink-0 text-steel transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-red"
    >
      <path d="M4 9h9M9 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
