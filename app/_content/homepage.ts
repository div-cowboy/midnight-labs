export const hero = {
  eyebrow: "Now booking Q2 2026 engagements",
  headline: "Built by operators. Installed in your company.",
  sub: "The Midnight Protocol turns mid-market companies into AI-native ones — designed and run by engineers who've shipped at NASA, Vercel, Shopify, WordPress, and Nielsen. Not a deck. Not a framework. An installation.",
  primary: { label: "Book a 30-min call", href: "/book" },
  secondary: { label: "Read the Protocol", href: "#protocol" },
};

export const benchLogos = [
  "NASA",
  "Vercel",
  "Shopify",
  "WordPress",
  "Nielsen",
];

export const benchLabel = "Shipped at";

/* ─────────────── The math (new) */

export type MathStat = {
  value: string;
  caption: string;
};

export const math = {
  eyebrow: "Why now",
  headline:
    "A 10% productivity lift on a 50-person eng org is worth ~$5M/year.",
  body: "Most companies are leaving that on the table because their teams are using AI like a search engine instead of a force multiplier. The gap between \u201Cwe have Claude licenses\u201D and \u201Cour team ships meaningfully faster with AI\u201D is where Midnight lives.",
  stats: [
    {
      value: "3\u20135x",
      caption:
        "Faster cycle time on routine PRs once Claude Code is properly installed in a workflow",
    },
    {
      value: "Day 1",
      caption:
        "Every engineer ships a real PR with Claude on the first day of the engagement",
    },
    {
      value: "30 days",
      caption:
        "From first call to internal champions running the protocol without us",
    },
  ] satisfies MathStat[],
};

/* ─────────────── The engagement / tiers (new) */

export type Tier = {
  id: string;
  number: string;
  name: string;
  duration: string;
  badge?: string;
  description: string;
  bestFor: string;
};

export const tiers: {
  eyebrow: string;
  headline: string;
  sub: string;
  tiers: Tier[];
  footnote: string;
} = {
  eyebrow: "The engagement",
  headline: "Three ways to install it. All built from the same protocol.",
  sub: "Every engagement runs the same playbook \u2014 audit, deploy, practice, scale. The tier sets the depth, the team size, and how much we customize. Not sure which fits? That\u2019s what the call is for.",
  tiers: [
    {
      id: "spark",
      number: "01",
      name: "Midnight Spark",
      duration: "1 week",
      description:
        "A focused pilot for small teams ready to move fast. Onsite kickoff, full tooling setup, custom agents tuned to your codebase, and a 30-day forward plan. The fastest way to see what\u2019s possible.",
      bestFor: "5\u201325 person teams \u00B7 single department pilots",
    },
    {
      id: "sprint",
      number: "02",
      name: "Midnight Sprint",
      duration: "2 weeks",
      badge: "Most popular",
      description:
        "Real adoption across a mid-sized engineering org. Audit, deploy, role-specific practice, and measurement \u2014 compressed into two weeks of focused work. Includes a mid-engagement demo day where your team shows each other what they\u2019ve built.",
      bestFor: "25\u201375 person eng orgs \u00B7 serious about adoption",
    },
    {
      id: "protocol",
      number: "03",
      name: "Midnight Protocol",
      duration: "30 days",
      description:
        "The full installation. Org-wide fluency, custom agents built across departments, internal champions trained to run the protocol after we leave, business outcomes measured and reported to leadership. For companies committed to becoming AI-native.",
      bestFor: "75+ person companies \u00B7 full transformation",
    },
  ],
  footnote: "Not sure which fits? Book the call.",
};

/* ─────────────── Phases */

export const phasesSection = {
  eyebrow: "Inside the protocol",
  headline: "Four phases. Compressed or expanded to fit the tier.",
};

export type Phase = {
  number: string;
  name: string;
  duration: string;
  protocol: string;
  outcomes: string[];
  description: string;
  timings: { label: string; value: string }[];
};

export const phases: Phase[] = [
  {
    number: "01",
    name: "Audit",
    duration: "~1 week",
    protocol: "The Audit Protocol",
    outcomes: [
      "Current-state map of AI usage across teams",
      "Capability gap analysis per role",
      "Ranked opportunity backlog",
    ],
    description:
      "We embed with your team, read your codebase, and shadow your workflows. You get a current-state map, capability gap analysis per role, and a ranked opportunity backlog.",
    timings: [
      { label: "Spark", value: "1 day" },
      { label: "Sprint", value: "3 days" },
      { label: "Protocol", value: "1 week" },
    ],
  },
  {
    number: "02",
    name: "Deploy",
    duration: "~1 week",
    protocol: "The Tooling Protocol",
    outcomes: [
      "Tool stack selected, licensed, and rolled out",
      "Access, SSO, and security posture in place",
      "Role-based starter prompts and repo templates",
    ],
    description:
      "The right stack, configured for your stack. Claude Code, Cursor, Codex, MCP integrations, custom skills built against your conventions. SSO and security handled. By end of this phase, every engineer is shipping production work with AI in the loop.",
    timings: [
      { label: "Spark", value: "2 days" },
      { label: "Sprint", value: "4 days" },
      { label: "Protocol", value: "1 week" },
    ],
  },
  {
    number: "03",
    name: "Practice",
    duration: "~1 week",
    protocol: "The Practice Protocol",
    outcomes: [
      "Role-specific intensives across eng, product, ops, exec",
      "Hands-on builds inside your real codebase and systems",
      "Shared vocabulary, shared patterns, shared standards",
    ],
    description:
      "Role-specific intensives, hands-on builds inside your real codebase, daily office hours, and an internal #ai-wins channel we seed and run. This is where excitement compounds and adoption locks in.",
    timings: [
      { label: "Spark", value: "2 days" },
      { label: "Sprint", value: "1 week" },
      { label: "Protocol", value: "1 week" },
    ],
  },
  {
    number: "04",
    name: "Scale",
    duration: "~1 week",
    protocol: "The Scale Protocol",
    outcomes: [
      "AI embedded into the workflows that actually matter",
      "Measurement harness wired to real business outcomes",
      "Internal champions ready to run the Protocol without us",
    ],
    description:
      "Custom agents embedded into the workflows that matter, measurement harness wired to real business outcomes, internal champions trained to extend the protocol after we leave. You get a forward roadmap and an exec readout.",
    timings: [
      { label: "Spark", value: "roadmap only" },
      { label: "Sprint", value: "lite" },
      { label: "Protocol", value: "full" },
    ],
  },
];

export const phaseNote = "Calibrated per engagement. Phases overlap.";

/* ─────────────── Library section copy (new) */

export const library = {
  eyebrow: "What you keep",
  headline:
    "A library of Claude Code agents we built, battle-tested, and ship to every engagement.",
  body: "One-command install into any repo. Pick a specialist, drop it in, get to work. Your engineers get the full library on Day 1 of any tier \u2014 and we build custom agents specific to your codebase during the engagement.",
};

/* ─────────────── Why Midnight (new) */

export type WhyPillar = {
  title: string;
  body: string;
};

export const whyMidnight: {
  eyebrow: string;
  headline: string;
  pillars: WhyPillar[];
} = {
  eyebrow: "Why us",
  headline: "We\u2019re the team that ships, teaching the team that ships.",
  pillars: [
    {
      title: "Operators, not consultants.",
      body: "The people running your engagement have shipped at scale. We\u2019ve architected commerce platforms, built AI products in production, and launched apps used by millions. We teach AI fluency because we use it every day to build real things.",
    },
    {
      title: "Excitement over mandate.",
      body: "We don\u2019t force adoption \u2014 we engineer the moments that make engineers want this. Day 1 wins, custom agents that solve your team\u2019s specific complaints, a #ai-wins channel that gets self-sustaining within a week. Skeptics become evangelists when the leverage is real.",
    },
    {
      title: "Composable, not cookie-cutter.",
      body: "Three tiers and a menu of add-ons mean we fit the engagement to your org instead of the other way around. Custom agent packs, executive tracks, champions programs, ongoing retainers \u2014 all available as bolt-ons to any tier.",
    },
    {
      title: "Measured, not hand-waved.",
      body: "Every engagement ends with a written impact report \u2014 what shipped, how much faster, what\u2019s possible next. No vibes. The math is the deliverable.",
    },
  ],
};

/* ─────────────── Final CTA (new) */

export const finalCta = {
  eyebrow: "Next step",
  headline: "Thirty minutes. No pitch deck.",
  body: "We\u2019ll ask about your org, your current AI usage, and what you\u2019d want shipped in your engagement. We\u2019ll recommend a tier, scope the work, and send a proposal within a week. If we\u2019re not the right fit, we\u2019ll tell you who is.",
  footnote:
    "Calibrated per engagement. Remote + onsite. Q2 2026 \u2014 limited slots.",
};

/* ─────────────── Legacy exports — still referenced by /(directions) drafts */

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
    blurb:
      "One high-signal email a week on how serious teams are shipping with AI. No hype.",
    cta: "Subscribe",
  },
  company: "Midnight AI",
  domain: "trymidnightai.com",
};
