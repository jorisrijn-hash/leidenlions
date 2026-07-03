import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { site, type Team } from "@/lib/site";

export function TeamDetail({ team }: { team: Team }) {
  const categoryLabel = team.category === "jeugd" ? "Jeugd" : "Senioren";
  const categoryHref = team.category === "jeugd" ? "/jeugd" : "/senioren";
  const meta = [team.age, team.level].filter(Boolean).join(" \u00b7 ");

  return (
    <>
      <PageHeader
        eyebrow={meta || categoryLabel}
        title={team.name}
        intro={team.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: categoryLabel, href: categoryHref },
          { label: team.name },
        ]}
      />

      <section className="bg-surface py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="max-w-prose">
            <h2 className="font-display text-2xl font-bold">Over {team.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{team.blurb}</p>
            <p className="mt-4 leading-relaxed text-muted">
              Trainingstijden, de wedstrijdkalender en teamcontacten worden
              binnenkort toegevoegd. Wil je nu al een keer meetrainen? Neem
              contact op, dan plannen we een gratis proeftraining in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inschrijven" className="btn btn-primary">
                Plan een proeftraining
              </Link>
              <Link href={categoryHref} className="btn btn-ghost">
                Alle {categoryLabel.toLowerCase()}teams
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl bg-ice p-7">
            <h3 className="label-mono text-steel">Praktisch</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-steel">Niveau</dt>
                <dd className="font-display text-base font-bold">{team.level}</dd>
              </div>
              {team.age && (
                <div>
                  <dt className="text-steel">Leeftijd</dt>
                  <dd className="font-display text-base font-bold">{team.age}</dd>
                </div>
              )}
              <div>
                <dt className="text-steel">Locatie</dt>
                <dd className="font-display text-base font-bold">{site.rink.name}</dd>
                <dd className="text-muted">
                  {site.rink.street}, {site.rink.postal}
                </dd>
              </div>
              <div>
                <dt className="text-steel">Contact</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-semibold text-navy-600 underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
