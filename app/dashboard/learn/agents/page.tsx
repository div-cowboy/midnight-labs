import Link from "next/link";
import { Icons } from "../../_components/icons";
import { AgentCard } from "../../_components/agent-card";
import { getAgents } from "@/app/_lib/sanity/fetch";
import { toUIAgent } from "@/app/_lib/sanity/transformers";
import type { SanityAgentCard } from "@/app/_lib/sanity/types";
import { getWorkspaceSlug } from "@/app/_lib/workspace";

export const revalidate = 60;

const TIERS = [
  {
    key: "core",
    name: "Core",
    desc: "Ships with Claude Code. Widely applicable, conservative by design.",
  },
  {
    key: "advanced",
    name: "Advanced",
    desc: "Opinionated workflows from the Midnight library. Powerful, with more guardrails needed.",
  },
  {
    key: "custom",
    name: "Custom",
    desc: "Built for your engagement, by your team.",
  },
] as const;

export default async function AgentLibraryPage() {
  const workspace = await getWorkspaceSlug();
  const rawAgents = (await getAgents(workspace)) as SanityAgentCard[];
  const agents = rawAgents.map(toUIAgent);
  const byTier = {
    core: agents.filter((a) => a.tier === "core"),
    advanced: agents.filter((a) => a.tier === "advanced"),
    custom: agents.filter((a) => a.tier === "custom"),
  };

  return (
    <div className="fade-enter">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Agent library</div>
            <h1 className="page-title">
              {agents.length} agent{agents.length === 1 ? "" : "s"} your team can
              use today.
            </h1>
            <div className="page-sub">
              Core agents ship with Claude Code. Midnight&apos;s Advanced library
              adds opinionated workflows. Custom agents are built during your
              engagement.
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link href="/dashboard/learn/agents/new" className="btn">
              <Icons.plus /> Author a new agent
            </Link>
          </div>
        </div>
      </div>

      {agents.length === 0 && (
        <div
          style={{
            marginTop: 24,
            padding: 40,
            border: "1px dashed var(--line-3)",
            borderRadius: 12,
            textAlign: "center",
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          No agents yet. Add one in{" "}
          <Link href="/studio" style={{ color: "var(--fg-1)" }}>
            Sanity Studio
          </Link>{" "}
          or{" "}
          <Link
            href="/dashboard/learn/agents/new"
            style={{ color: "var(--fg-1)" }}
          >
            author one here
          </Link>
          .
        </div>
      )}

      {TIERS.map((t) => {
        const items = byTier[t.key];
        if (!items || items.length === 0) return null;
        return (
          <div key={t.key} className="agent-tier">
            <div className="agent-tier-head">
              <span className="agent-tier-badge" data-tier={t.key}>
                {t.name}
              </span>
              <div className="agent-tier-name">{t.name} agents</div>
              <div className="agent-tier-sub">{t.desc}</div>
              <span
                className="mono muted"
                style={{ marginLeft: "auto", fontSize: 11 }}
              >
                {items.length}
              </span>
            </div>
            <div className="agent-grid">
              {items.map((a) => (
                <AgentCard key={a._id} agent={a} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
