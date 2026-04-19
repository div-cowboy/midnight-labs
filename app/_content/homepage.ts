export const hero = {
  eyebrow: "Midnight AI",
  headline: "Your company, AI-native. In 90 days.",
  sub: "The Midnight Protocol is a multi-week transformation engagement for mid-market companies — run by operators who've shipped at NASA, Vercel, Shopify, WordPress, and Nielsen.",
  primary: { label: "Book a discovery call", href: "/book" },
  secondary: { label: "Read The Protocol", href: "#protocol" },
};

export const benchLogos = [
  "NASA",
  "Vercel",
  "Shopify",
  "WordPress",
  "Nielsen",
];

export const benchLabel =
  "Our founder and instructor bench have shipped at:";

export const positioning = {
  eyebrow: "The problem",
  title: "Most AI training is a slide deck. You need a shipping plan.",
  body: [
    "Your team doesn't need another webinar on prompt engineering. They need to know which tool to use, when, for which task — and your org needs the shared operating rhythm to actually pull value out of AI, every day.",
    "Generic training treats AI as a topic to learn. The Midnight Protocol treats it as infrastructure to install.",
  ],
};

export type Pillar = {
  id: string;
  number: string;
  name: string;
  oneLiner: string;
};

export const protocol: { name: string; pillars: Pillar[] } = {
  name: "The Midnight Protocol",
  pillars: [
    {
      id: "audit",
      number: "01",
      name: "The Audit Protocol",
      oneLiner:
        "Diagnose your org's AI readiness, capability gaps, and the real bottlenecks slowing adoption.",
    },
    {
      id: "tooling",
      number: "02",
      name: "The Tooling Protocol",
      oneLiner:
        "Select, deploy, and secure the right AI stack per role — Claude, Claude Code, Cursor, Codex, OpenAI, and more.",
    },
    {
      id: "practice",
      number: "03",
      name: "The Practice Protocol",
      oneLiner:
        "Operator-level fluency across engineering, product, ops, and the exec team — not theory, actual use.",
    },
    {
      id: "scale",
      number: "04",
      name: "The Scale Protocol",
      oneLiner:
        "Embed AI into the workflows that matter and measure what shipped.",
    },
  ],
};

export type Phase = {
  number: string;
  name: string;
  duration: string;
  protocol: string;
  outcomes: string[];
};

export const phases: Phase[] = [
  {
    number: "01",
    name: "Diagnose",
    duration: "~2 weeks",
    protocol: "The Audit Protocol",
    outcomes: [
      "Current-state map of AI usage across teams",
      "Capability gap analysis per role",
      "Ranked opportunity backlog",
    ],
  },
  {
    number: "02",
    name: "Deploy",
    duration: "~3 weeks",
    protocol: "The Tooling Protocol",
    outcomes: [
      "Tool stack selected, licensed, and rolled out",
      "Access, SSO, and security posture in place",
      "Role-based starter prompts and repo templates",
    ],
  },
  {
    number: "03",
    name: "Practice",
    duration: "~4 weeks",
    protocol: "The Practice Protocol",
    outcomes: [
      "Role-specific intensives across eng, product, ops, exec",
      "Hands-on builds inside your real codebase and systems",
      "Shared vocabulary, shared patterns, shared standards",
    ],
  },
  {
    number: "04",
    name: "Scale",
    duration: "~3 weeks",
    protocol: "The Scale Protocol",
    outcomes: [
      "AI embedded into the workflows that actually matter",
      "Measurement harness wired to real business outcomes",
      "Internal champions ready to run the Protocol without us",
    ],
  },
];

export const phaseNote = "Calibrated per engagement. Phases overlap.";

export type Tool = { name: string; blurb: string };

export const toolsGroups: { label: string; tools: Tool[] }[] = [
  {
    label: "Reasoning models",
    tools: [
      { name: "Claude", blurb: "Anthropic's flagship — long context, deep reasoning" },
      { name: "OpenAI", blurb: "GPT-5, o-series, and the Codex family" },
    ],
  },
  {
    label: "Coding agents",
    tools: [
      { name: "Claude Code", blurb: "Agentic coding in the terminal" },
      { name: "Codex", blurb: "OpenAI's coding agent" },
      { name: "Cursor", blurb: "Agent-native IDE for shipping teams" },
    ],
  },
  {
    label: "And the rest of the stack",
    tools: [
      { name: "Workflow agents", blurb: "Zapier, n8n, and custom orchestration" },
      { name: "Voice & vision", blurb: "Whisper, ElevenLabs, multimodal pipelines" },
      { name: "Your stack", blurb: "Calibrated per engagement" },
    ],
  },
];

export const forWho = {
  fit: {
    title: "You if…",
    items: [
      "You run a 30–500 person company and AI adoption is stuck at \"a few people using ChatGPT\"",
      "You've tried internal brown-bags and watched them fade in three weeks",
      "You want engineering, product, ops, and the exec team on the same operating picture",
      "You care about what shipped, not how many people attended the training",
    ],
  },
  notFit: {
    title: "Not for you if…",
    items: [
      "You want a one-day keynote for morale",
      "You're pre-product and still figuring out what you do",
      "You want a cert program for HR to file",
    ],
  },
};

export const founder = {
  name: "Sam Davidoff",
  title: "Founder",
  logos: ["Shopify", "WordPress", "Nielsen"],
  letter: [
    "I've spent my career shipping platforms that other companies build on — at Shopify, WordPress, and Nielsen. Every major platform shift I've lived through has had the same pattern: the companies that win are the ones that install the new thing as infrastructure, not treat it as a topic.",
    "Midnight AI exists because most AI consulting is still stuck in the topic mindset. The Protocol is how we install it as infrastructure — and leave your team running it without us.",
  ],
};

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "How much does a Midnight Protocol engagement cost?",
    a: "Engagements are priced per org and scoped in the discovery call. Most land in the mid-five to low-six figure range depending on company size, phase scope, and whether the engagement is remote or onsite. We price for outcomes, not headcount.",
  },
  {
    q: "How long does it take?",
    a: "Around 90 days end-to-end, calibrated per engagement. Some phases overlap. We don't stretch to fill time — if your org is ready to skip a phase, we skip it and price accordingly.",
  },
  {
    q: "Is this remote or onsite?",
    a: "Both. The Practice phase usually benefits from in-person intensives; Audit and Scale work well remote. We'll recommend the shape in the discovery call.",
  },
  {
    q: "Who actually delivers the work?",
    a: "Sam leads every engagement. Specialists from our instructor bench — operators and engineers from NASA, Vercel, Shopify, WordPress, Nielsen, and more — are paired in based on what your org needs.",
  },
  {
    q: "Will we become dependent on you?",
    a: "No. The Scale Protocol explicitly exists to install internal champions who can run the Protocol without us. If you still need us after 90 days, we charged you wrong.",
  },
  {
    q: "What tools do you teach?",
    a: "The ones your team should actually be using: Claude and Claude Code, OpenAI and Codex, Cursor, plus whatever else fits your stack. We don't have vendor relationships — we recommend what works.",
  },
  {
    q: "Do you work with companies outside the US?",
    a: "Yes. We run engagements globally. Scheduling and timezone logistics come up in the discovery call.",
  },
  {
    q: "What does the discovery call cover?",
    a: "30 minutes. We ask about your org, your current AI usage, and what you want shipped in 90 days. You ask us anything. No pitch deck.",
  },
];

export const footer = {
  newsletter: {
    eyebrow: "Midnight Dispatch",
    blurb: "One high-signal email a week on how serious teams are shipping with AI. No hype.",
    cta: "Subscribe",
  },
  company: "Midnight AI",
  domain: "trymidnightai.com",
};
