export type Lesson = { title: string; dur: string; done: boolean; current: boolean };
export type Instructor = {
  name: string;
  role: string;
  bio: string;
  color: string;
  color2: string;
};

export type AgentStats = { power: number; speed: number; depth: number };
export type AgentTier = "core" | "advanced" | "custom";

export const tierColors: Record<AgentTier, string> = {
  core: "linear-gradient(135deg, #6366f1, #3b82f6)",
  advanced: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  custom: "linear-gradient(135deg, #f59e0b, #ef4444)",
};

export type Agent = {
  id: string;
  tier: AgentTier;
  name: string;
  tagline: string;
  description: string;
  model: string;
  tools: string[];
  stats: AgentStats;
  installs: number;
  author: string;
  relatedCourses: string[];
  relatedAgents: string[];
  example?: string;
};

export type TranscriptLine = { t: string; text: string };

export const instructors: Record<string, Instructor> = {
  rae: {
    name: "Rae Castellanos",
    role: "Principal, Midnight",
    bio: "Former staff engineer at Stripe and Linear; leads engagement delivery.",
    color: "#8b5cf6",
    color2: "#3b82f6",
  },
  kenji: {
    name: "Kenji Watanabe",
    role: "Claude Code lead, Midnight",
    bio: "Ex-Vercel DX; shipped the original Claude Code onboarding protocol.",
    color: "#ec4899",
    color2: "#8b5cf6",
  },
  amara: {
    name: "Amara Dembélé",
    role: "Agents practice, Midnight",
    bio: "Built the first production MCP deployments at three Fortune 500 orgs.",
    color: "#f59e0b",
    color2: "#ef4444",
  },
  jules: {
    name: "Jules Park",
    role: "Adoption research, Midnight",
    bio: "Studies how engineering orgs actually adopt AI — and where they stall.",
    color: "#22d3ee",
    color2: "#3b82f6",
  },
  noor: {
    name: "Noor Haidari",
    role: "Evals & safety, Midnight",
    bio: "Ran the internal evals team at Anthropic before joining Midnight.",
    color: "#10b981",
    color2: "#22d3ee",
  },
  marcus: {
    name: "Marcus Wei",
    role: "Platform engineering, Midnight",
    bio: "20 years in infra; built the tooling that Midnight teaches with.",
    color: "#6366f1",
    color2: "#8b5cf6",
  },
};

export const transcript: TranscriptLine[] = [
  { t: "0:00", text: "A long session with Claude doesn't have to feel like a long session." },
  { t: "0:06", text: "Most people treat pairing like a monologue — they dump a problem, wait for the output, paste the next thing." },
  { t: "0:14", text: "That works for ten minutes. At hour three, you're debugging your own ghost." },
  { t: "0:22", text: "The pattern I'm going to show you is called 'checkpointing.' It's three moves." },
  { t: "0:29", text: "First: you name the unit of work explicitly, before you start." },
  { t: "0:35", text: "Not 'refactor the auth module' — that's a project. Something like 'move the session-cookie read off the request object and into a middleware.'" },
  { t: "0:47", text: "Specific enough that you could write a PR title for it right now." },
  { t: "0:53", text: "Second: you establish a written spec. Ten lines is fine. Sometimes two." },
  { t: "1:01", text: "The goal isn't documentation. The goal is that thirty minutes from now, when you've drifted, you can both come back to it." },
  { t: "1:12", text: "Third, and this is the one people skip — you ask Claude to read the spec back to you." },
  { t: "1:20", text: "In its own words. No paraphrase-shaped agreement. A real restatement." },
  { t: "1:28", text: "If what comes back doesn't match what you meant, you have a spec problem, and you fix it now — not at minute forty-five when you're unwinding three bad PRs." },
  { t: "1:42", text: "Okay. Let's do this live, in a real codebase." },
  { t: "1:48", text: "I've got a rate limiter here that we're going to move from in-memory to Redis. You can see the shape of it." },
  { t: "1:59", text: "I'm going to write the spec in this file — right here, inline, as a comment block." },
  { t: "2:11", text: "Notice what I'm not doing. I'm not opening a Google doc. I'm not going to Notion. The spec lives next to the code." },
  { t: "2:22", text: "This is going to matter in a minute." },
];

export const trackPalette: Record<string, [string, string]> = {
  Foundations: ["#1e293b", "#334155"],
  "Claude Code": ["#3b1e5a", "#6b3aaf"],
  "Custom Agents": ["#5a1e3b", "#a73a6b"],
  MCP: ["#1e3b5a", "#3a6ba7"],
  "Advanced Patterns": ["#5a3b1e", "#a76b3a"],
};

export const agents: Agent[] = [
  {
    id: "explain-this",
    tier: "core",
    name: "Explain this",
    tagline: "Understand any block of code in context.",
    description:
      "Reads the file, traces callers, and explains what the code actually does — not just what it claims.",
    model: "Sonnet 4.5",
    tools: ["read", "grep", "git"],
    stats: { power: 3, speed: 5, depth: 3 },
    installs: 4812,
    author: "Anthropic",
    relatedCourses: [],
    relatedAgents: [],
  },
  {
    id: "write-tests",
    tier: "core",
    name: "Write tests",
    tagline: "Cover a function with the tests you'd have written.",
    description:
      "Reads the function, identifies branches and edge cases, generates tests in your existing framework.",
    model: "Sonnet 4.5",
    tools: ["read", "write", "bash"],
    stats: { power: 4, speed: 4, depth: 4 },
    installs: 6241,
    author: "Anthropic",
    relatedCourses: [],
    relatedAgents: [],
  },
  {
    id: "pr-review",
    tier: "core",
    name: "PR review",
    tagline: "A first pass before your teammates see it.",
    description:
      "Reviews diffs for logic errors, style, and edge cases. Comments inline; doesn't block merge.",
    model: "Sonnet 4.5",
    tools: ["read", "grep", "git"],
    stats: { power: 3, speed: 5, depth: 3 },
    installs: 3984,
    author: "Midnight",
    relatedCourses: [],
    relatedAgents: [],
  },
];

export const agentsByTier: Record<AgentTier, Agent[]> = {
  core: agents.filter((a) => a.tier === "core"),
  advanced: agents.filter((a) => a.tier === "advanced"),
  custom: agents.filter((a) => a.tier === "custom"),
};
