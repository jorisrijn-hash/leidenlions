import Link from "next/link";
import { RinkLine } from "@/components/Bits";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  intro,
  eyebrow,
  crumbs,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page pb-14 pt-12">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-hero-muted">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-white/30">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="label-mono mb-3 text-red">{eyebrow}</p>}

        <h1 className="max-w-4xl font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
          {title}
        </h1>

        {intro && <p className="mt-6 max-w-prose text-lg leading-relaxed text-hero-muted">{intro}</p>}

        <RinkLine className="mt-10 max-w-xl opacity-70" />
      </div>
    </section>
  );
}
