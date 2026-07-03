import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhotoSlot } from "@/components/Bits";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IJshockeyschool",
  description:
    "De ijshockeyschool van Leiden Lions: leer schaatsen en ijshockeyen in Leiden, ook zonder ervaring. Voor kinderen en volwassenen.",
};

const steps = [
  { t: "Schaatsen", d: "Je begint met vertrouwd raken op het ijs: balans, afzetten, remmen en bochten." },
  { t: "Stickhandling", d: "Daarna komt de puck erbij. Dribbelen, passen en de eerste schoten op doel." },
  { t: "Het spel", d: "Ten slotte de spelregels en kleine partijtjes, zodat je klaar bent voor een team." },
];

export default function IjshockeyschoolPage() {
  return (
    <>
      <PageHeader
        title="De ijshockeyschool"
        intro="Nooit eerder geschaatst of gehockeyd? Geen probleem. Bij de ijshockeyschool leer je stap voor stap alles wat je nodig hebt, in je eigen tempo."
        crumbs={[{ label: "Home", href: "/" }, { label: "IJshockeyschool" }]}
      />

      <section className="bg-surface py-20">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <PhotoSlot
            src="/photos/jeugd-kids.webp"
            alt="Deelnemers van de ijshockeyschool op het ijs"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[3/2] w-full rounded-2xl"
          />
          <div>
            <h2 className="font-display text-2xl font-bold">Voor wie?</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
              De ijshockeyschool is er voor iedereen die het spel wil leren, jong
              en oud. Je hebt geen eigen uitrusting nodig om te starten. Kom in
              sportkleding en met handschoenen, wij helpen je op weg.
            </p>

            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-900 font-mono text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold">{s.t}</h3>
                    <p className="mt-1 max-w-prose text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/inschrijven" className="btn btn-primary">
                Meld je aan
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                Stel een vraag
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
