import type { Metadata } from "next";

import { ExternalLink, Label } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { clientProjects, codepenProjects, openSourceProjects } from "@/content/projects";
import { PROFILE } from "@/content/site";

/**
 * /projects/ — kept at its original URL.
 *
 * The old site published this path and it has inbound links, so it stays a real
 * route rather than a redirect to a renamed one.
 */
export const metadata: Metadata = {
  title: "Work",
  description:
    "Client automation systems, open-source tools and experiments by Jayesh Kaithwas — " +
    "AI agent infrastructure, workflow automation and backend engineering.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  const github = PROFILE.socials.find((s) => s.icon === "github")!;

  return (
    <div className="bleed pt-24 pb-24 sm:pt-28 rail-clear">
      <header className="border-b-2 border-ink pb-8">
        <Label>All work</Label>
        <h1 className="display mt-3 t-title text-ink">Work</h1>
        <p className="text-balance mt-6 max-w-[58ch] t-lead text-ink-2">
          Automation systems, agent infrastructure and the tools around them. Client work is under
          NDA — those entries show outcomes and stack, not code.
        </p>
      </header>

      <Section title="Client systems" count={clientProjects.length}>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {clientProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        title="Open source"
        count={openSourceProjects.length}
        aside={<ExternalLink href={github.href}>{github.handle}</ExternalLink>}
      >
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {openSourceProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="Pens" count={codepenProjects.length}>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {codepenProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  count,
  aside,
  children,
}: {
  title: string;
  count: number;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="label text-burnt">
          {title} <span className="tnum text-ink-3">({count})</span>
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
