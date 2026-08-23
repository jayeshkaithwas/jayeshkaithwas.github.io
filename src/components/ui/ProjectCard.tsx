import { ExternalLink, InternalLink, Tag } from "@/components/ui/primitives";
import { ProjectShots } from "@/components/ui/ProjectShots";
import type { Project } from "@/types/content";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "live",
  internal: "private / NDA",
  "open-source": "open source",
  archived: "archived",
};

/**
 * One card shape for every project. Confidential client work shows outcomes and
 * stack but never links — the constraint is stated, not worked around. Shots are
 * opt-in per project and only ever show sanitised or sample-data screens.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;
  const hasLinks = Boolean(links?.live || links?.repo || links?.demo);

  return (
    <article className="sweep group relative flex flex-col border-t-2 border-ink px-3 pt-5 pb-3 -mx-3">
      <div className="flex items-center justify-between gap-4">
        <Tag tone={project.confidential ? "default" : "accent"}>
          {STATUS_LABEL[project.status]}
        </Tag>
        <span className="label tnum text-ink-3">{project.year}</span>
      </div>

      <h3 className="display mt-4 t-heading text-ink">{project.title}</h3>
      <p className="mt-2 font-sans t-lead text-ink">{project.tagline}</p>
      <p className="mt-4 t-sm text-ink-2">{project.summary}</p>

      {project.shots ? <ProjectShots shots={project.shots} title={project.title} /> : null}

      {project.metrics ? (
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {project.metrics.map((m) => (
            <li key={m.label} className="label text-ink">
              <span className="tnum text-burnt">{m.value}</span> {m.label}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      {/* mt-auto pins the link row to the bottom so cards in a row align. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/15 pt-4">
        {project.kind === "case-study" ? (
          <InternalLink href={`/projects/${project.slug}/`}>Case study</InternalLink>
        ) : null}
        {links?.live ? <ExternalLink href={links.live}>Live</ExternalLink> : null}
        {links?.demo ? <ExternalLink href={links.demo}>Demo</ExternalLink> : null}
        {links?.repo ? <ExternalLink href={links.repo}>Source</ExternalLink> : null}
        {!hasLinks && project.kind !== "case-study" ? (
          <span className="label text-ink-3">Code under NDA — outcomes only</span>
        ) : null}
      </div>
    </article>
  );
}
