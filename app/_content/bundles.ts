import type { Agent } from "./agents";
import { agents } from "./agents";

export type Bundle = {
  slug: string;
  name: string;
  codename: string;
  tagline: string;
  role: string;
  summary: string;
  accent: { from: string; to: string; ring: string };
  agentSlugs: string[];
  playbook: string[];
};

export const bundles: Bundle[] = [
  {
    slug: "launch-crew",
    name: "The Launch Crew",
    codename: "CREW-L01",
    tagline: "Ship v1 without the usual fires.",
    role: "Launch operations",
    summary:
      "Plans the build, scaffolds the integrations, closes the release. The crew you want on the job from kickoff to GA.",
    accent: {
      from: "#a78bfa",
      to: "#06b6d4",
      ring: "rgba(167,139,250,0.35)",
    },
    agentSlugs: ["architect", "broker", "closer"],
    playbook: [
      "Architect breaks the scope into a dependency-ordered plan",
      "Broker stands up typed clients for every third-party surface",
      "Closer drafts release notes, runs ship checks, calls the go",
    ],
  },
  {
    slug: "post-incident-crew",
    name: "The Post-Incident Crew",
    codename: "CREW-I02",
    tagline: "Find it, fix it, prevent it.",
    role: "Incident forensics",
    summary:
      "Kicks off the moment the pager goes off. Traces root cause, audits for the next vulnerability, wires the data layer back up cleanly.",
    accent: {
      from: "#22d3ee",
      to: "#f43f5e",
      ring: "rgba(244,63,94,0.35)",
    },
    agentSlugs: ["ghost", "cipher", "wire"],
    playbook: [
      "Ghost finds the actual root cause, not just the symptom",
      "Cipher audits the adjacent surface for the same class of mistake",
      "Wire plans any data-layer remediation with a rollback path",
    ],
  },
  {
    slug: "migration-crew",
    name: "The Migration Crew",
    codename: "CREW-M03",
    tagline: "Move the plumbing without dropping a packet.",
    role: "Refactor & migration",
    summary:
      "Plans the move, sequences the schema, ships the cutover. Built for the refactors that span weeks and can't afford a bad weekend.",
    accent: {
      from: "#8b5cf6",
      to: "#1d4ed8",
      ring: "rgba(96,165,250,0.35)",
    },
    agentSlugs: ["architect", "wire", "closer"],
    playbook: [
      "Architect maps the full migration path including the expand/contract phases",
      "Wire plans every schema change with forward + rollback sequencing",
      "Closer owns the deploy windows and release-note narrative across the cutover",
    ],
  },
];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function bundleAgents(bundle: Bundle): Agent[] {
  return bundle.agentSlugs
    .map((slug) => agents.find((a) => a.slug === slug))
    .filter((a): a is Agent => Boolean(a));
}

export function bundleSlugs(): string[] {
  return bundles.map((b) => b.slug);
}
