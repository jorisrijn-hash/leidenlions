import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { jeugdTeams } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jeugd",
  description:
    "Jeugdteams van Leiden Lions, van U7 tot en met de junioren U17. IJshockey voor kinderen in Leiden.",
};

export default function JeugdPage() {
  return (
    <>
      <PageHeader
        title="Jeugd"
        intro="Van de allereerste stappen op het ijs tot de junioren. Elk jeugdteam speelt op zijn eigen niveau, met plezier en ontwikkeling voorop."
        crumbs={[{ label: "Home", href: "/" }, { label: "Jeugd" }]}
      />
      <section className="bg-surface py-20">
        <div className="container-page">
          <ol>
            {jeugdTeams.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/jeugd/${t.slug}`}
                  className="group flex items-center gap-5 border-t border-line py-6 transition-colors hover:bg-ice"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-900 font-mono text-base font-bold text-white">
                    {t.short}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold">{t.name}</span>
                    <span className="block text-sm text-muted">
                      {t.age} &middot; {t.level}
                    </span>
                    <span className="mt-1 block max-w-prose text-sm text-muted">{t.blurb}</span>
                  </span>
                </Link>
                {i === jeugdTeams.length - 1 && <div className="border-t border-line" />}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
