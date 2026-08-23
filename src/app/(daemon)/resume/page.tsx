import type { Metadata } from "next";

import { CertValidity, ExternalLink, Label, Tag, UnitState } from "@/components/ui/primitives";
import { CERTIFICATIONS } from "@/content/certifications";
import { EXPERIENCE } from "@/content/experience";
import { PROFILE } from "@/content/site";
import { SKILL_GROUPS } from "@/content/skills";
import { formatRange } from "@/lib/cn";

/**
 * /resume/ — the calm route.
 *
 * Deliberately low-motion, high-density and scannable. This is where a
 * recruiter who does not want the chaptered narrative should land, and it is
 * linked from the HUD on every page.
 */
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Jayesh Kaithwas — AI Automation Specialist and Backend Engineer. Experience, " +
    "skills, education and certifications.",
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <div className="bleed pt-24 pb-24 sm:pt-28 rail-clear">
      <header className="border-b-2 border-ink pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="display t-title text-ink">Jayesh Kaithwas</h1>
            <p className="label mt-3 text-burnt">{PROFILE.title}</p>
          </div>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="label inline-flex min-h-11 shrink-0 items-center bg-ink px-4 text-paper transition-colors hover:bg-burnt"
          >
            Download PDF ↓
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <li className="label text-ink-2">{PROFILE.location}</li>
          <li>
            <a
              href={`mailto:${PROFILE.email}`}
              className="label tap border-b-2 border-burnt text-burnt hover:bg-burnt hover:text-paper"
            >
              {PROFILE.email}
            </a>
          </li>
          {PROFILE.socials
            .filter((s) => s.icon === "github" || s.icon === "linkedin")
            .map((s) => (
              <li key={s.label}>
                <ExternalLink href={s.href}>{s.handle}</ExternalLink>
              </li>
            ))}
        </ul>
      </header>

      <Block title="Summary">
        <p className="max-w-[75ch] t-body text-ink-2">{PROFILE.summary}</p>
      </Block>

      <Block title="Experience">
        <ol className="space-y-10">
          {EXPERIENCE.map((role) => (
            <li key={role.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="display t-heading text-ink">
                  {role.role} <span className="text-burnt">/ {role.org}</span>
                </h3>
                <div className="flex items-center gap-3">
                  <UnitState state={role.state} />
                  <span className="label tnum text-ink-3">
                    {formatRange(role.start, role.end)}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-3 t-sm text-ink-2">
                    <span aria-hidden className="mt-1.5 h-1.5 w-3 shrink-0 bg-burnt" />
                    <span className="max-w-[80ch]">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {role.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Skills">
        <dl className="grid gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
          {SKILL_GROUPS.map((g) => (
            <div key={g.id}>
              <dt className="label text-burnt">{g.label}</dt>
              <dd className="mt-2 t-sm text-ink-2">
                {g.items.map((i) => i.name).join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Block>


      <Block title={`Certifications (${CERTIFICATIONS.length})`}>
        <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <li key={c.id}>
              <span className={c.featured ? "text-sm text-ink" : "text-sm text-ink-2"}>
                {c.name}
              </span>
              <span className="text-sm text-ink-3"> — {c.issuer}</span>
              <CertValidity cert={c} />
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t-2 border-ink pt-6">
      <Label>{title}</Label>
      <div className="mt-5">{children}</div>
    </section>
  );
}
