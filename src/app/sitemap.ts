import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/projects";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/projects/", priority: 0.9 },
    { path: "/resume/", priority: 0.8 },
    { path: "/certificates/", priority: 0.6 },
    ...caseStudies.map((p) => ({ path: `/projects/${p.slug}/`, priority: 0.7 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
