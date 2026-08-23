import type { Profile } from "@/types/content";

export const SITE = {
  url: "https://jayeshkaithwas.github.io",
  title: "Jayesh Kaithwas — AI Automation Specialist & Backend Engineer",
  shortTitle: "Jayesh Kaithwas",
  description:
    "AI Automation Specialist and Backend Engineer. I build agent infrastructure, " +
    "automation pipelines and internal systems that remove manual work — 100+ workflows " +
    "in production and 80%+ of repetitive operations eliminated.",
  locale: "en_IN",
} as const;

export const PROFILE: Profile = {
  name: "Jayesh Kaithwas",
  title: "AI Automation Specialist & Backend Engineer",
  thesis: "I build the processes that run when nobody is watching.",
  location: "Vadodara, Gujarat 390002, India",
  locationShort: "Vadodara, IN",
  email: "jayeshkaithwas1234@gmail.com",
  phone: "+91 74340-27313",
  availability: "Open to automation and backend work",

  summary:
    "I design and build end-to-end automation systems, AI-powered dashboards and " +
    "scalable workflows. My work centres on LLM integration, agent development and " +
    "business process automation, on a foundation of cybersecurity and system design. " +
    "I have built centralised systems that cut manual operations by more than 80% and " +
    "turn messy cross-platform data into a single interface people can actually decide from.",

  pillars: [
    {
      glyph: "agents",
      label: "Agents",
      body:
        "Multi-agent infrastructure with Claude Code and the Hermes Agent SDK — Claude " +
        "orchestrates task routing, Hermes executes autonomously. Agents and custom skills " +
        "run inside Slack, so operators trigger real workflows by talking.",
    },
    {
      glyph: "systems",
      label: "Systems",
      body:
        "100+ workflows across n8n, Make and GoHighLevel, wiring CRM, calling platforms, " +
        "Slack and internal tools into one operational pipeline. Onboarding that took hours " +
        "of checklist work now provisions a full client account in under two minutes, " +
        "behind one deliberate human approval.",
    },
    {
      glyph: "security",
      label: "Security",
      body:
        "CEH v12, CAP and CNSP. VAPT with Burp Suite, Nmap, Nessus and Acunetix; OWASP Top 10, " +
        "secure coding, packet analysis and malware analysis. Automation that handles client " +
        "data should be built by someone who knows how it gets attacked.",
    },
  ],

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/jayeshkaithwas",
      handle: "jayeshkaithwas",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jayeshkaithwas",
      handle: "in/jayeshkaithwas",
      icon: "linkedin",
    },
    {
      label: "Telegram",
      href: "https://t.me/j4y35h",
      handle: "@j4y35h",
      icon: "telegram",
    },
    {
      label: "Email",
      href: "mailto:jayeshkaithwas1234@gmail.com",
      handle: "jayeshkaithwas1234@gmail.com",
      icon: "mail",
    },
    {
      label: "CodePen",
      href: "https://codepen.io/jayeshkaithwas",
      handle: "jayeshkaithwas",
      icon: "codepen",
    },
  ],

  resume: "/projects/Jayesh-Resume.pdf",
  resumeLegacy: "/projects/Jayesh-Resume.pdf",

  /**
   * Three, not four. Each has to survive the question "so what?" on its own —
   * a count of departments does not, so it lives in the case study instead.
   */
  headlineMetrics: [
    {
      value: "80%+",
      label: "manual work removed",
      detail: "Repetitive operations eliminated across a whole company.",
    },
    {
      value: "100+",
      label: "workflows in production",
      detail: "Running unattended on n8n, Make and GoHighLevel.",
    },
    {
      value: "90%+",
      label: "faster per application",
      detail: "Government visa forms, filled from PDFs instead of by hand.",
    },
  ],
};

/** HackLab is a separate repo serving at /hacklab/. Featured, never duplicated. */
export const HACKLAB = {
  title: "HackLab",
  glyph: "実験",
  href: "https://jayeshkaithwas.github.io/hacklab/",
  repo: "https://github.com/jayeshkaithwas/hacklab",
  tagline: "Notes, write-ups and tools from the security side of the desk.",
  body:
    "My personal notebook on cybersecurity: notes, blog posts, tools and CTF write-ups. " +
    "Built with TypeScript as a living record of what I am learning, breaking and fixing.",
  tags: ["Notes", "CTF write-ups", "Tooling", "TypeScript"],
} as const;
