import Link from "next/link";
import Image from "next/image";
import { jeugdTeams, seniorenTeams, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <Image src="/logo.png" alt="" width={31} height={44} className="h-11 w-auto" />
            <span className="font-display text-lg font-extrabold tracking-tight">
              LEIDEN<span className="text-red"> LIONS</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-hero-muted">
            {site.fullName}. {site.tagline}, elke zaterdag in {site.rink.name}.
          </p>
        </div>

        <FooterCol title="Jeugd" links={jeugdTeams.map((t) => ({ label: t.name, href: `/jeugd/${t.slug}` }))} />
        <FooterCol title="Senioren" links={seniorenTeams.slice(0, 6).map((t) => ({ label: t.name, href: `/senioren/${t.slug}` }))} />

        <div>
          <h3 className="label-mono mb-4 text-hero-muted">Contact</h3>
          <address className="space-y-1 text-sm not-italic leading-relaxed text-hero-muted">
            <div className="font-semibold text-white">{site.rink.name}</div>
            <div>{site.rink.street}</div>
            <div>{site.rink.postal}</div>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
          </address>
          <Link href="/inschrijven" className="btn btn-primary mt-5 text-[0.9rem]">
            Word lid
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-hero-muted sm:flex-row">
          <span>
            &copy; {year} {site.fullName}
          </span>
          <span className="font-mono text-[0.7rem] tracking-wide">
            {site.domain}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="label-mono mb-4 text-hero-muted">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-hero-muted transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
