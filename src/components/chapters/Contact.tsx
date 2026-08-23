import { CopyEmail } from "@/components/ui/CopyEmail";
import { Label } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { PROFILE } from "@/content/site";

/**
 * 0x0A — contact.
 *
 * No form. A static site with a third-party form endpoint buys lower friction
 * at the cost of an external dependency and a spam surface; an oversized mailto
 * with copy-to-clipboard does the same job with nothing to break.
 */
export function Contact() {
  const chapter = chapterBySlug("contact")!;
  const links = PROFILE.socials.filter((s) => s.icon !== "mail");

  return (
    <section
      id={chapter.slug}
      aria-labelledby="contact-title"
      className="relative border-t-2 border-ink"
    >
      <div className="bleed py-20 sm:py-28 rail-clear">
        <div className="flex items-center gap-4">
          <span className="label tnum text-burnt">{chapter.id}</span>
          <span aria-hidden className="h-px flex-1 bg-ink/20" />
          <Label>{chapter.kicker}</Label>
        </div>

        <h2 id="contact-title" className="display mt-4 t-title text-ink">
          {chapter.title}
        </h2>

        <p className="text-balance mt-6 max-w-[46ch] t-lead text-ink-2">
          If you have manual work that should not be manual, or a system that needs building
          properly, I would like to hear about it.
        </p>

        <div className="mt-12 border-t-2 border-ink pt-8">
          <CopyEmail email={PROFILE.email} />
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {links.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group border-t-2 border-ink pt-4 transition-colors hover:bg-paper-sunk"
            >
              <Label>{s.label}</Label>
              <p className="mt-1 truncate font-sans text-base text-ink transition-colors group-hover:text-burnt">
                {s.handle} <span aria-hidden className="text-ink-3">↗</span>
              </p>
            </a>
          ))}
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5">
          <p className="label text-ink-3">
            Designed and built by Jayesh Kaithwas · {PROFILE.locationShort}
          </p>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="label tap border-b-2 border-burnt pb-0.5 text-burnt transition-colors hover:bg-burnt hover:text-paper"
          >
            Resume ↓
          </a>
        </footer>
      </div>
    </section>
  );
}
