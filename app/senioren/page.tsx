import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { seniorenTeams } from "@/lib/site";

export const metadata: Metadata = {
  title: "Senioren",
  description:
    "Seniorenteams van Leiden Lions: van competitie tot recreatief en het damesteam. IJshockey voor volwassenen in Leiden.",
};

export default function SeniorenPage() {
  return (
    <>
      <PageHeader
        title="Senioren"
        intro="Competitie, recreatief of net begonnen: er is een seniorenteam dat bij jouw niveau en ambitie past."
        crumbs={[{ label: "Home", href: "/" }, { label: "Senioren" }]}
      />
      <section className="bg-surface py-20">
        <div className="container-page">
          <ul>
            {seniorenTeams.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/senioren/${t.slug}`}
                  className="group flex items-center gap-5 border-t border-line py-6 transition-colors hover:bg-ice"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold">{t.name}</span>
                    <span className="mt-1 block max-w-prose text-sm text-muted">{t.blurb}</span>
                  </span>
                  <span className="label-mono shrink-0 rounded-full bg-ice px-3 py-1.5 text-steel">
                    {t.level}
                  </span>
                </Link>
                {i === seniorenTeams.length - 1 && <div className="border-t border-line" />}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
