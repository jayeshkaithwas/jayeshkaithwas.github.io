import { ChapterSection, InternalLink } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { chapterBySlug } from "@/content/chapters";
import { clientProjects } from "@/content/projects";

/** 0x04 — client systems. Under NDA, so the outcomes carry the argument. */
export function Workshop() {
  const chapter = chapterBySlug("workshop")!;

  return (
    <ChapterSection chapter={chapter}>
      <p className="mb-10 max-w-[60ch] t-body text-ink-2">
        Systems built for clients and employers. The code and screenshots are under NDA — what
        follows is what they changed.
      </p>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {clientProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-12">
        <InternalLink href="/projects/">All work</InternalLink>
      </div>
    </ChapterSection>
  );
}
