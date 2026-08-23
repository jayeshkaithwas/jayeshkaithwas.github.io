import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternalLink, Label, Tag } from "@/components/ui/primitives";
import { caseStudyBodies, hasCaseStudy } from "@/content/case-studies";
import { caseStudies, projectBySlug } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project || !hasCaseStudy(slug)) notFound();

  const { default: Body } = await caseStudyBodies[slug]();

  return (
    <article className="bleed pt-24 pb-24 sm:pt-28 rail-clear">
      {/* No bottom rule: the first MDX <h2> carries its own top rule, and both
          together render as a doubled line. */}
      <header className="pb-2">
        <div className="flex flex-wrap items-center gap-3">
          <Tag tone={project.confidential ? "default" : "accent"}>
            {project.confidential ? "private / NDA" : project.status}
          </Tag>
          <span className="label tnum text-ink-3">{project.year}</span>
        </div>

        <h1 className="display mt-5 max-w-[16ch] t-title text-ink">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[46ch] font-sans t-statement text-ink">
          {project.tagline}
        </p>

        <div className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {project.role ? (
            <div>
              <Label>Role</Label>
              <p className="mt-1 text-sm text-ink">{project.role}</p>
            </div>
          ) : null}
          {project.metrics?.map((m) => (
            <div key={m.label}>
              <Label>{m.label}</Label>
              <p className="display tnum mt-1 text-2xl text-burnt">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </header>

      <div className="mt-2">
        <Body />
      </div>

      <footer className="mt-16 border-t-2 border-ink pt-6">
        <InternalLink href="/projects/">All work</InternalLink>
      </footer>
    </article>
  );
}
