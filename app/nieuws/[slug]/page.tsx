import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PhotoSlot } from "@/components/Bits";
import { newsHighlights, highlightBySlug, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return newsHighlights.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = highlightBySlug(params.slug);
  if (!item) return {};
  return { title: item.title, description: item.blurb };
}

export default function NieuwsItemPage({ params }: { params: { slug: string } }) {
  const item = highlightBySlug(params.slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow={item.kicker}
        title={item.title}
        crumbs={[{ label: "Home", href: "/" }, { label: item.title }]}
      />

      <section className="bg-surface py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <article className="max-w-prose">
            {item.body.map((p, i) => (
              <p key={i} className="mb-4 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                Neem contact op
              </a>
              <Link href="/" className="btn btn-ghost">
                Terug naar home
              </Link>
            </div>
          </article>

          <PhotoSlot
            src={item.image}
            alt=""
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="aspect-[4/3] w-full rounded-2xl"
          />
        </div>
      </section>
    </>
  );
}
