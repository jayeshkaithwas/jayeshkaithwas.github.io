import type { Project } from "@/types/content";

/**
 * Three tracks:
 *   client      — 0x04 Workshop. Under NDA: outcomes shown, code and screenshots not.
 *   open-source — 0x05 Artifacts. Public repos and live deployments.
 *   codepen     — 0x05 Artifacts, secondary row.
 *
 * `kind: "case-study"` generates a page at /projects/<slug>/.
 */
export const PROJECTS: Project[] = [
  // ── Client systems ────────────────────────────────────────────────────────
  {
    slug: "ai-executive-dashboard",
    title: "AI Executive Dashboard",
    tagline: "One interface for a whole company's operations.",
    track: "client",
    kind: "case-study",
    status: "internal",
    year: "2026",
    role: "Architecture, agent infrastructure, implementation",
    confidential: true,
    featured: true,
    summary:
      "A centralised, AI-powered dashboard for CEOs and Product Managers to monitor teams, " +
      "track KPIs and gain actionable insights across Call Center, Marketing, Sales and " +
      "Fulfillment — unifying complete company operations into a single intelligent interface.",
    stack: ["n8n", "GoHighLevel", "Slack API", "LLM APIs", "Node.js"],
    /* Client, team-member and company names are redacted, as are the employer's
       absolute revenue figures. */
    shots: [
      { image: "exec-ceo-dashboard", alt: "CEO dashboard — KPIs per department against target, each with an owner and a source" },
      { image: "exec-clients", alt: "Client management — account cards with retainer, cost per lead, show rate and health" },
      { image: "exec-board", alt: "Fulfillment board — client requests as a kanban across five columns" },
      { image: "exec-marketing", alt: "Marketing tracker — spend, leads, cost per lead and show rate per client" },
    ],
    metrics: [
      { value: "4", label: "departments", detail: "Call Center, Marketing, Sales, Fulfillment." },
      { value: "real-time", label: "visibility" },
      { value: "auto", label: "reporting" },
    ],
  },
  {
    slug: "visa-form-autofill",
    title: "Visa Form Auto-Fill",
    tagline: "40 minutes of government forms, compiled down to seconds.",
    track: "client",
    kind: "case-study",
    status: "internal",
    year: "2025",
    role: "Sole engineer",
    confidential: true,
    featured: true,
    summary:
      "A Chrome extension for a visa consultancy processing 50-60 applications daily. It parses " +
      "client data from uploaded PDFs and auto-fills complex multi-page government visa forms, " +
      "cutting per-application processing time from minutes to seconds.",
    stack: ["Chrome Extension APIs", "JavaScript", "PDF Parsing", "DOM Manipulation"],
    shots: [
      { image: "visafill-prototype", alt: "Prototype — a government visa form beside the extension panel, showing an extracted profile and a per-field mapping log" },
    ],
    metrics: [
      { value: "90%+", label: "manual entry removed" },
      { value: "50-60", label: "applications / day" },
      { value: "~0", label: "transcription errors", detail: "Across thousands of monthly submissions." },
    ],
  },
  {
    slug: "slack-dialer",
    title: "The Dialer — Priority Call Queue",
    tagline: "One ordered queue per caller, and nothing rung twice by accident.",
    track: "client",
    kind: "case-study",
    status: "internal",
    year: "2026",
    role: "Architecture and implementation",
    confidential: true,
    summary:
      "An in-house priority call queue for clinic callers. CRM events flow in, the queue decides " +
      "who gets called next and when, and callers dial straight from the browser — with every " +
      "dial, outcome and note written back to the CRM. Started as a Slack app; became a screen.",
    stack: [
      "Slack API",
      "GoHighLevel",
      "Webhooks",
      "n8n",
      "Browser softphone",
      "Calling Platform APIs",
    ],
    metrics: [
      { value: "3,180", label: "dials placed", detail: "Against 3,077 calls logged with an outcome." },
      { value: "862", label: "leads cached", detail: "293 of them ready to call at any moment." },
      { value: "7", label: "clinics, 3 callers", detail: "One ordered queue each; a task is never offered to two people." },
    ],
    shots: [
      { image: "dialer-queue", alt: "Queue screen — lead card with multi-number picker on the left, disposition panel on the right" },
      { image: "dialer-dashboard", alt: "Dialer dashboard — queue depth, dials, connect rate and talk time" },
    ],
  },
  {
    slug: "client-onboarding",
    title: "Automated Client Onboarding",
    tagline: "One command, an interview on WhatsApp, and a client account exists.",
    track: "client",
    kind: "case-study",
    status: "internal",
    year: "2026",
    role: "Architecture, agent design, implementation",
    confidential: true,
    featured: true,
    summary:
      "A conversational onboarding rail. An operator runs one command; an agent interviews the " +
      "client on WhatsApp until a deterministic check says nothing is missing; and after one " +
      "human approval it provisions the CRM sub-account, knowledge base, shared drive, chat " +
      "channels, auth tokens, calendars and dialer access as fourteen recorded steps.",
    stack: [
      "Python / FastAPI",
      "PostgreSQL",
      "SQLite",
      "Slack API",
      "WhatsApp (Go bridge)",
      "GoHighLevel API",
      "Playwright",
      "Claude Sonnet 4.5",
      "Docker",
    ],
    metrics: [
      {
        value: "112s",
        label: "to provision an account",
        detail:
          "Sub-account, client record, knowledge base, shared drive, three chat channels, a " +
          "browser-minted API token and eighteen CRM fields.",
      },
      {
        value: "14",
        label: "provisioning steps",
        detail: "Three critical, eleven best-effort — a failure in the eleven costs that step, not the run.",
      },
      {
        value: "2",
        label: "human gates",
        detail: "One person enrols the client, one person approves. Nothing irreversible runs on the model's say-so.",
      },
    ],
  },
  {
    slug: "kpi-dashboards",
    title: "Multi-Department KPI Dashboards",
    tagline: "Every team's numbers, without a single cross-team ping.",
    track: "client",
    kind: "case-study",
    status: "internal",
    year: "2026",
    confidential: true,
    summary:
      "Live dashboards for Call Center, Marketing, Sales and Fulfillment, consolidating metrics " +
      "from CRM, calling platforms and internal tools into role-specific views. Every figure is " +
      "derived — the operators enter activity, not numbers, and the roll-ups compute themselves.",
    stack: ["GoHighLevel", "Google Sheets", "n8n", "Custom Reporting Layer"],
    metrics: [{ value: "4", label: "department views" }],
    /* Shot from the blank templates with sample figures filled in. The live
       instances hold client revenue, so nothing real can be shown here. */
    shots: [
      {
        image: "kpi-executive-month",
        alt: "Monthly executive view: metrics by week, actual against target, RAG status column",
        caption:
          "The executive month view. Weekly entry on the left, monthly actual against target on " +
          "the right, and a status column that colours itself from the variance.",
        sampleData: true,
      },
      {
        image: "kpi-year-roll-up",
        alt: "Annual roll-up: goal and actual columns for each month across every tracked metric",
        caption:
          "The annual roll-up. Every cell reads through from the month tabs, so closing a month " +
          "updates the year view with no re-entry.",
        sampleData: true,
      },
      {
        image: "kpi-sales-team",
        alt: "Sales dashboard: headline tiles, two trend charts, and a monthly close-rate funnel",
        caption:
          "The sales view — headline tiles and trend charts driven off the same funnel table, " +
          "from scheduled calls through to cash collected.",
        sampleData: true,
      },
      {
        image: "kpi-acquisition",
        alt: "Paid acquisition dashboard: monthly ad spend, leads, cost per lead and call show rate",
        caption:
          "Paid acquisition. Spend and lead volume aggregate out of the raw ad and call exports; " +
          "cost per lead, DQ rate and show rate are all derived.",
        sampleData: true,
      },
      {
        image: "kpi-call-centre",
        alt: "Call centre funnel by month: dials, conversations, demos booked, show rate, closes",
        caption:
          "The call-centre funnel, month by month — dials through to cash collected, with the " +
          "conversion rate at each step.",
        sampleData: true,
      },
    ],
  },
  {
    slug: "cross-platform-automation",
    title: "Cross-Platform Business Automation",
    tagline: "100+ workflows holding one operational pipeline together.",
    track: "client",
    kind: "card",
    status: "internal",
    year: "2026",
    confidential: true,
    summary:
      "100+ automation workflows across n8n, Make and GoHighLevel, integrating CRM, calling " +
      "platforms, Slack and internal tools into a unified operational pipeline with minimal " +
      "manual intervention.",
    stack: ["n8n", "Make (Integromat)", "GoHighLevel", "Slack", "REST APIs", "Webhooks"],
    metrics: [
      { value: "100+", label: "workflows" },
      { value: "80%+", label: "manual ops removed" },
    ],
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation & Lead Tooling",
    tagline: "Bots, scrapers and small ERPs for businesses without an IT team.",
    track: "client",
    kind: "card",
    status: "internal",
    year: "2025",
    confidential: true,
    summary:
      "WhatsApp automation bots, lead-scraping utilities and custom ERP systems for small " +
      "businesses, plus security assessments and system hardening for client applications.",
    stack: ["WAHA", "Evolution API", "GoGHL.ai", "n8n", "Gemini API", "Google Apps Script", "Python"],
  },

  // ── Open source ───────────────────────────────────────────────────────────
  {
    slug: "newsflow",
    title: "NewsFlow",
    tagline: "Tech news, fetched, categorised and summarised without me.",
    track: "open-source",
    kind: "case-study",
    status: "live",
    year: "2025",
    featured: true,
    summary:
      "An AI-powered news aggregation and summarisation tool integrating n8n workflows with the " +
      "Google Gemini API. Automates fetching, categorisation and summarisation of tech news into " +
      "a single dashboard for fast daily insight.",
    stack: ["n8n", "Gemini API", "LLM APIs", "Vercel"],
    links: { live: "https://news-flow-liard.vercel.app/" },
  },
  {
    slug: "email-pitch-generator",
    title: "EmailPitchGenerator-Bot",
    tagline: "Market research in, cold email out.",
    track: "open-source",
    kind: "card",
    status: "live",
    year: "2025",
    summary:
      "A Flask app deployed on Render demonstrating how agents are created using Google's Gemini " +
      "APIs to generate a cold email from market research.",
    stack: ["Python", "Flask", "Bootstrap", "Gemini API", "Render"],
    links: { live: "https://emailpitchgenerator-bot.onrender.com" },
  },
  {
    slug: "whatsapp-web-extension",
    title: "WhatsApp Web Bulk Message Sender",
    tagline: "A free Chrome extension for bulk WhatsApp outreach.",
    track: "open-source",
    kind: "card",
    status: "open-source",
    year: "2024",
    summary:
      "A completely free Chrome extension that helps you connect with your customers by sending " +
      "bulk messages via WhatsApp. Built on Selenium, with secure session handling and input validation.",
    stack: ["JavaScript", "Selenium", "Chrome Extensions"],
    links: { repo: "https://github.com/jayeshkaithwas/WhatsApp-Web-Extension" },
  },
  {
    slug: "networking-python",
    title: "Networking — Python",
    tagline: "TCP/UDP clients, proxy servers and packet sniffers.",
    track: "open-source",
    kind: "card",
    status: "open-source",
    year: "2024",
    summary:
      "A toolkit of network utilities — TCP/UDP clients, proxy servers and packet sniffers — " +
      "focused on network protocols and packet-level analysis. A repository about how devices " +
      "actually communicate across a network.",
    stack: ["Python", "Sockets", "TCP/IP", "Packet Analysis"],
    links: { repo: "https://github.com/jayeshkaithwas/Networking-Python" },
  },
  {
    slug: "email-permutator",
    title: "Email-Permutator",
    tagline: "Name plus domain in, candidate addresses out.",
    track: "open-source",
    kind: "card",
    status: "open-source",
    year: "2024",
    summary:
      "A Python utility that generates email permutations from a person's name and a domain, " +
      "outputting to a file or the console. Useful for outreach workflows, lead-enrichment " +
      "pipelines and data-collection tasks.",
    stack: ["Python"],
    links: { repo: "https://github.com/jayeshkaithwas/Email-Permutator" },
  },
  {
    slug: "clap-detector",
    title: "Clap Detector",
    tagline: "Double-clap to open an AI coding session.",
    track: "open-source",
    kind: "card",
    status: "open-source",
    year: "2025",
    summary:
      "A Linux system-tray app in Python that listens for a double-clap and instantly opens " +
      "Cursor IDE with a terminal running Claude. A tiny hack to make an AI coding session one " +
      "gesture away.",
    stack: ["Python", "Linux", "Audio DSP"],
    links: { repo: "https://github.com/jayeshkaithwas/clap-detector" },
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "A full library operations system in C# and .NET.",
    track: "open-source",
    kind: "card",
    status: "open-source",
    year: "2023",
    summary:
      "A comprehensive system for managing library operations, built using C# with the .NET WPS " +
      "and MVC frameworks.",
    stack: ["C#", ".NET", "MVC"],
    links: { repo: "https://github.com/jayeshkaithwas/Library-Management-System" },
  },
  {
    slug: "mouse-animation",
    title: "Mouse-Animation",
    tagline: "Drop-in customisable cursor animations.",
    track: "open-source",
    kind: "card",
    status: "live",
    year: "2023",
    summary:
      "A versatile solution for adding customisable mouse animations to websites and web apps.",
    stack: ["JavaScript", "Canvas", "CSS"],
    links: {
      live: "https://jayeshkaithwas.github.io/Mouse-Animation/",
      repo: "https://github.com/jayeshkaithwas/Mouse-Animation",
    },
  },
  {
    slug: "words-globe",
    title: "Words-globe",
    tagline: "Words from every language, orbiting.",
    track: "open-source",
    kind: "card",
    status: "live",
    year: "2023",
    summary:
      "A captivating animation representing words from different languages in a globe-like " +
      "visualisation.",
    stack: ["JavaScript", "CSS", "Animation"],
    links: {
      live: "https://jayeshkaithwas.github.io/Words-globe/",
      repo: "https://github.com/jayeshkaithwas/Words-globe",
    },
  },
  {
    slug: "petmate",
    title: "Website-PetMate",
    tagline: "Companionship, for dogs.",
    track: "open-source",
    kind: "card",
    status: "live",
    year: "2023",
    summary:
      "A website project that aims to connect dogs from all walks of life, helping them find " +
      "their perfect companionship — a safe and enjoyable space to connect with other dogs in " +
      "their area.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: { live: "https://jayeshkaithwas.github.io/Website-PetMate/" },
  },

  // ── CodePen ───────────────────────────────────────────────────────────────
  {
    slug: "fox-animation",
    title: "Fox-animation",
    tagline: "A fox face that follows your cursor.",
    track: "codepen",
    kind: "card",
    status: "live",
    year: "2023",
    summary:
      "HTML, CSS and JavaScript making a cute fox face move around in the direction you move " +
      "your mouse cursor.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: { demo: "https://codepen.io/jayeshkaithwas/full/vYvgOQe" },
  },
  {
    slug: "matrix-animation",
    title: "Matrix-Animation",
    tagline: "Letters whirl, then resolve into the answer.",
    track: "codepen",
    kind: "card",
    status: "live",
    year: "2023",
    summary:
      "A mesmerising Matrix-style animation where letters whirl in a visual spectacle before " +
      "displaying the intended result.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: { demo: "https://codepen.io/jayeshkaithwas/full/dywNoLR" },
  },
  {
    slug: "qr-code",
    title: "qr-code",
    tagline: "Generate a QR code in the browser.",
    track: "codepen",
    kind: "card",
    status: "live",
    year: "2023",
    summary: "A simple generator, written in HTML, CSS and Java, which enables you to create QR codes.",
    stack: ["HTML", "CSS", "Java"],
    links: { demo: "https://codepen.io/jayeshkaithwas/full/BagRLbX" },
  },
];

export const caseStudies = PROJECTS.filter((p) => p.kind === "case-study");
export const clientProjects = PROJECTS.filter((p) => p.track === "client");
export const openSourceProjects = PROJECTS.filter((p) => p.track === "open-source");
export const codepenProjects = PROJECTS.filter((p) => p.track === "codepen");
export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
