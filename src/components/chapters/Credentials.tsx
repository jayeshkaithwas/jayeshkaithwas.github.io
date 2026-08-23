import { CertValidity, ChapterSection, InternalLink, Tag } from "@/components/ui/primitives";
import { chapterBySlug } from "@/content/chapters";
import { CERTIFICATIONS, featuredCertifications } from "@/content/certifications";

/** 0x07 — the paper. Featured here, all 26 behind /certificates/. */
export function Credentials() {
  const chapter = chapterBySlug("credentials")!;

  return (
    <ChapterSection chapter={chapter}>
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {featuredCertifications.map((cert) => (
          <article key={cert.id} className="border-t-2 border-ink pt-4">
            <Tag>{cert.issuer}</Tag>
            <h3 className="display mt-3 t-heading text-ink">{cert.name}</h3>
            <CertValidity cert={cert} />
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
        <InternalLink href="/certificates/">All {CERTIFICATIONS.length} certificates</InternalLink>
        <span className="label text-ink-3">
          Education in{" "}
          <a href="#deployments" className="text-burnt underline underline-offset-2">
            0x03
          </a>
        </span>
      </div>
    </ChapterSection>
  );
}
