"use client";

import { useMemo, useState } from "react";

import { Lightbox } from "@/components/ui/Lightbox";
import { CertValidity, Tag } from "@/components/ui/primitives";
import { CERT_CATEGORIES, CERTIFICATIONS } from "@/content/certifications";
import certificateImages from "@/content/generated/certificate-images.json";
import { cn } from "@/lib/cn";

type Category = (typeof CERT_CATEGORIES)[number]["id"];
const images: Record<string, { src: string; width: number; height: number }> = certificateImages;

/**
 * Replaces the old Isotope + Magnific Popup + jQuery + Bootstrap stack (five
 * libraries) with a filter and a dialog. Every card ships explicit intrinsic
 * dimensions from the sharp pipeline, so filtering never shifts layout.
 */
export function CertificateGallery() {
  const [active, setActive] = useState<Category>("all");
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () => (active === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.category === active)),
    [active],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>([["all", CERTIFICATIONS.length]]);
    for (const c of CERTIFICATIONS) map.set(c.category, (map.get(c.category) ?? 0) + 1);
    return map;
  }, []);

  const openCert = open ? CERTIFICATIONS.find((c) => c.id === open) : null;
  const openImage = openCert?.image ? images[openCert.image] : null;

  return (
    <>
      <div role="group" aria-label="Filter certificates" className="flex flex-wrap gap-2">
        {CERT_CATEGORIES.map((cat) => {
          const count = counts.get(cat.id) ?? 0;
          if (count === 0) return null;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(cat.id)}
              className={cn(
                "label inline-flex min-h-10 items-center border-2 px-3 transition-colors",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/25 text-ink-2 hover:border-ink hover:text-ink",
              )}
            >
              {cat.label} <span className="tnum opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((cert) => {
          const img = cert.image ? images[cert.image] : null;
          return (
            <li key={cert.id} className="flex flex-col border-t-2 border-ink">
              {img ? (
                <button
                  type="button"
                  onClick={() => setOpen(cert.id)}
                  /* Fixed ratio: sources range from portrait to wide landscape,
                     and a natural-height grid leaves ragged rows. */
                  className="mt-4 block aspect-[4/3] w-full shrink-0 cursor-zoom-in overflow-hidden border-2 border-ink/15 bg-paper-sunk"
                  aria-label={`View ${cert.name} certificate`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt=""
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-top transition-transform duration-300 hover:scale-[1.03]"
                  />
                </button>
              ) : null}
              <div className="flex grow flex-col pt-4">
                <div className="flex flex-wrap gap-2">
                  <Tag>{cert.issuer}</Tag>
                </div>
                <h3 className="text-balance mt-3 font-sans text-sm leading-snug text-ink">
                  {cert.name}
                </h3>
                <CertValidity cert={cert} />
                {cert.credentialId ? (
                  <p className="label tnum mt-1 text-ink-3/70">ID {cert.credentialId}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {openCert && openImage ? (
        <Lightbox
          image={{ ...openImage, alt: `${openCert.name} — ${openCert.issuer}` }}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
