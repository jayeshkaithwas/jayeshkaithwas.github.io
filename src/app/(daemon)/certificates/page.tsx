import type { Metadata } from "next";

import { CertificateGallery } from "@/components/CertificateGallery";
import { Label } from "@/components/ui/primitives";
import { CERTIFICATIONS } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Certifications held by Jayesh Kaithwas — CEH Practical, Certified AppSec Practitioner (CAP), " +
    "Certified Network Security Practitioner (CNSP), STAR, Forage simulations and more.",
  alternates: { canonical: "/certificates/" },
};

export default function CertificatesPage() {
  return (
    <div className="bleed pt-24 pb-24 sm:pt-28 rail-clear">
      <header className="mb-10 border-b-2 border-ink pb-8">
        <Label>Proof</Label>
        <h1 className="display mt-3 t-title text-ink">Certificates</h1>
        <p className="text-balance mt-6 max-w-[58ch] t-lead text-ink-2">
          {CERTIFICATIONS.length} certifications, weighted toward offensive security and secure
          development. Issue and expiry dates are shown as the certificates state them.
        </p>
      </header>

      <CertificateGallery />

    </div>
  );
}
