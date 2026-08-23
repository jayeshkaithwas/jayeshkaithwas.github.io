import { Arsenal } from "@/components/chapters/Arsenal";
import { Artifacts } from "@/components/chapters/Artifacts";
import { Contact } from "@/components/chapters/Contact";
import { Credentials } from "@/components/chapters/Credentials";
import { Deployments } from "@/components/chapters/Deployments";
import { Identity } from "@/components/chapters/Identity";
import { Ignition } from "@/components/chapters/Ignition";
import { Lab } from "@/components/chapters/Lab";
import { Signals } from "@/components/chapters/Signals";
import { Workshop } from "@/components/chapters/Workshop";
import { ChapterRail } from "@/components/hud/ChapterRail";
import { Marquee } from "@/components/motion/Marquee";

const MARQUEE_CAPABILITIES = [
  "AI Agents",
  "Workflow Automation",
  "Backend Engineering",
  "LLM Integration",
  "Offensive Security",
  "Systems Design",
];

const MARQUEE_PROOF = [
  "80%+ manual work removed",
  "100+ workflows in production",
  "90%+ faster per application",
  "CEH · CAP · CNSP",
];
import { EXPERIENCE } from "@/content/experience";
import { PROFILE, SITE } from "@/content/site";

/** JSON-LD so the facts are machine-readable, not just rendered. */
function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    url: SITE.url,
    jobTitle: PROFILE.title,
    email: `mailto:${PROFILE.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
    sameAs: PROFILE.socials.filter((s) => s.icon !== "mail").map((s) => s.href),
    worksFor: { "@type": "Organization", name: EXPERIENCE[0].org },
    knowsAbout: [
      "AI Automation",
      "Multi-Agent Systems",
      "LLM Integration",
      "Backend Engineering",
      "Cybersecurity",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <PersonSchema />
      <ChapterRail />
      <Ignition />
      <Identity />

      {/* Ticker bands break the page's rhythm and carry the loudest motion on
          the site for zero JavaScript. */}
      <Marquee items={MARQUEE_CAPABILITIES} speed={44} />

      <Deployments />
      <Workshop />
      <Artifacts />
      <Arsenal />

      <Marquee items={MARQUEE_PROOF} speed={38} invert reverse />

      <Credentials />
      <Lab />
      <Signals />
      <Contact />
    </>
  );
}
