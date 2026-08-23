/**
 * Explicit slug -> importer map.
 *
 * Deliberately not a template-literal dynamic import: those are fragile under
 * bundler analysis and can silently produce empty pages in a static export.
 * If a case study is missing here, the build fails loudly instead.
 */
export const caseStudyBodies = {
  "ai-executive-dashboard": () => import("./ai-executive-dashboard.mdx"),
  "visa-form-autofill": () => import("./visa-form-autofill.mdx"),
  "client-onboarding": () => import("./client-onboarding.mdx"),
  "kpi-dashboards": () => import("./kpi-dashboards.mdx"),
  "slack-dialer": () => import("./slack-dialer.mdx"),
  newsflow: () => import("./newsflow.mdx"),
} as const;

export type CaseStudySlug = keyof typeof caseStudyBodies;

export const hasCaseStudy = (slug: string): slug is CaseStudySlug => slug in caseStudyBodies;
