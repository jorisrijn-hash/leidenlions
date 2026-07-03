import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inschrijven",
  description:
    "Word lid van Leiden Lions. Plan een gratis proeftraining en start met ijshockey in Leiden.",
};

const steps = [
  {
    t: "Neem contact op",
    d: "Mail ons welke leeftijd en welk niveau het betreft. We laten je weten wanneer je kunt komen proeftrainen.",
  },
  {
    t: "Kom proeftrainen",
    d: "Je eerste training is gratis en vrijblijvend. We regelen materiaal zodat je meteen het ijs op kunt.",
  },
  {
    t: "Word lid",
    d: "Beviel het? Dan schrijven we je in bij het team dat bij je past en ben je officieel een Lion.",
  },
];

export default function InschrijvenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gratis en vrijblijvend"
        title="Kom proeftrainen"
        intro="Ijshockey ervaar je het best op het ijs zelf. Plan een gratis proeftraining, wij zorgen voor de rest."
        crumbs={[{ label: "Home", href: "/" }, { label: "Inschrijven" }]}
      />

      <section className="bg-surface py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold">Zo werkt het</h2>
            <ol className="mt-8 space-y-8">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-5 border-t border-line pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red font-mono text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.t}</h3>
                    <p className="mt-1.5 max-w-prose leading-relaxed text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit rounded-2xl bg-navy-900 p-8 text-white">
            <h2 className="font-display text-xl font-bold">Aanmelden</h2>
            <p className="mt-3 leading-relaxed text-hero-muted">
              Stuur een mail met je naam, leeftijd en ervaring. We reageren snel
              met een datum voor je proeftraining.
            </p>
            <a href={`mailto:${site.email}?subject=Proeftraining`} className="btn btn-primary mt-6 w-full justify-center">
              Mail ons
            </a>
            <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-hero-muted">
              <div className="font-display text-base font-bold text-white">{site.rink.name}</div>
              <div>{site.rink.street}</div>
              <div>{site.rink.postal}</div>
              <div className="mt-3">{site.season}</div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
