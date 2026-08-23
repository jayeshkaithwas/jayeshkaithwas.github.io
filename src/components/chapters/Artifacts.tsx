import { ChapterSection, ExternalLink, Label } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { chapterBySlug } from "@/content/chapters";
import { codepenProjects, openSourceProjects } from "@/content/projects";
import { PROFILE } from "@/content/site";

/** 0x05 — the public repos, where the source is actually readable. */
export function Artifacts() {
  const chapter = chapterBySlug("artifacts")!;
  const github = PROFILE.socials.find((s) => s.icon === "github")!;
  const codepen = PROFILE.socials.find((s) => s.icon === "codepen")!;

  return (
    <ChapterSection chapter={chapter}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[60ch] t-body text-ink-2">
          Tools, experiments and utilities that ship in public.
        </p>
        <ExternalLink href={github.href}>{github.handle}</ExternalLink>
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {openSourceProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5">
          <Label>Pens</Label>
          <ExternalLink href={codepen.href}>codepen/{codepen.handle}</ExternalLink>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {codepenProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </ChapterSection>
  );
}
