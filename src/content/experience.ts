import type { Experience } from "@/types/content";

/** Newest first. None of this appears anywhere on the current live site. */
export const EXPERIENCE: Experience[] = [
  {
    id: "maalibu-sphere",
    role: "AI Automation Specialist",
    org: "Maalibu Sphere Pvt. Ltd.",
    start: "2025-09",
    end: "present",
    state: "active",
    summary:
      "Own the automation and AI agent infrastructure end to end — from the workflows that " +
      "move a lead through the business to the multi-agent system the leadership team talks to.",
    highlights: [
      "Architected and designed the complete AI agent infrastructure, including multi-agent delegation workflows using Claude Code and the Hermes Agent SDK.",
      "Implemented agent delegation patterns where Claude orchestrates task routing and Hermes handles autonomous execution, enabling end-to-end process automation with minimal human intervention.",
      "Built an AI-powered Executive Dashboard letting CEOs and Product Managers monitor teams, track KPIs and gain actionable insights, centralising company operations into a single intelligent interface.",
      "Built and deployed multiple AI agents and custom skills directly inside Slack, so team members execute complex workflows, generate reports and complete operational tasks through natural conversation.",
      "Automated end-to-end business operations using 100+ workflows across n8n, Make and GoHighLevel.",
      "Developed a custom Slack Dialer App for real-time lead assignment and agent coordination.",
      "Designed multi-department dashboards for Call Center, Marketing, Sales and Fulfillment tracking.",
      "Engineered a fully automated client onboarding system enabling instant access provisioning.",
      "Integrated cross-platform APIs into a unified operational pipeline with minimal manual intervention.",
    ],
    metrics: [
      { value: "80%+", label: "productivity gain", detail: "By eliminating repetitive workflows and manual processes." },
      { value: "100+", label: "workflows" },
      { value: "4", label: "departments unified" },
    ],
    stack: [
      "Claude Code",
      "Hermes Agent SDK",
      "n8n",
      "Make",
      "GoHighLevel",
      "Slack API",
      "Node.js",
      "REST APIs",
      "Webhooks",
    ],
  },
  {
    id: "freelance",
    role: "Freelancer — AI Automation & Development",
    org: "Independent",
    start: "2024-08",
    end: "present",
    state: "active",
    summary:
      "Automation, internal tooling and security work for small businesses — the kind of " +
      "problems where one well-placed script removes a person-week a month.",
    highlights: [
      "Built a Chrome extension for a visa consultancy processing 50-60 applications daily that parses client PDFs and auto-fills multi-page government visa forms, cutting per-application time by 90%+.",
      "Developed WhatsApp automation bots, lead scraping tools and custom ERP systems.",
      "Built business automation workflows using n8n, the Gemini API and Google Apps Script.",
      "Designed and deployed web applications with Flask, Node.js and Firebase.",
      "Conducted security assessments and system hardening for client applications.",
      "Delivered automation solutions reducing operational overhead for small businesses.",
    ],
    metrics: [
      { value: "90%+", label: "data entry removed", detail: "Visa application auto-fill, at near-zero transcription error." },
      { value: "50-60", label: "applications / day" },
    ],
    stack: [
      "Python",
      "Flask",
      "Node.js",
      "Firebase",
      "n8n",
      "Gemini API",
      "Google Apps Script",
      "Chrome Extensions",
      "Selenium",
    ],
  },
  {
    id: "prompt-erp",
    role: "Customer Support Engineer",
    org: "Prompt ERP Ltd.",
    start: "2023-12",
    end: "2024-07",
    state: "completed",
    summary:
      "Frontline ERP support. Where I learned that most 'software problems' are really " +
      "someone's process problem, and that the fix usually belongs upstream.",
    highlights: [
      "Provided technical support and resolved ERP software issues for clients.",
      "Worked with SQL databases, debugging and backend troubleshooting.",
      "Strengthened communication, issue diagnosis and client-handling skills.",
    ],
    stack: ["SQL", "ERP Systems", "Debugging"],
  },
];
