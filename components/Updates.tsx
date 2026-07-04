import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/Bits";
import { updates } from "@/lib/site";

/**
 * Updates: club news cards. Titles, dates and categories mirror the live site;
 * images use real photography. Display-only for now (no article pages yet) so
 * there are no dead links.
 */
export function Updates() {
  return (
    <section id="updates" className="bg-ice py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="mb-10 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-[-0.02em]">
            Updates
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((u, i) => (
            <Reveal key={u.title} delay={(i % 3) * 60}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <PhotoSlot
                  src={u.image}
                  alt=""
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {u.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded bg-navy-900 px-2 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.01em]">
                    {u.title}
                  </h3>
                  <time className="mt-auto pt-4 font-mono text-xs text-steel">{u.date}</time>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
