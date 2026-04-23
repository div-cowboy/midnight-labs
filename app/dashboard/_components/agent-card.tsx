import Link from "next/link";
import { initials } from "./data";
import { AgentStatBars } from "./agent-stats";
import { tierColors } from "./learn-data";
import type { UIAgent } from "@/app/_lib/sanity/transformers";

export function AgentCard({
  agent,
  showTier = true,
}: {
  agent: UIAgent;
  showTier?: boolean;
}) {
  return (
    <Link
      href={`/dashboard/learn/agents/${agent.slug}`}
      className="agent-card"
      data-tier={agent.tier}
    >
      <div className="agent-card-sheen" />
      <div className="agent-card-head">
        <div className="agent-mark" style={{ background: tierColors[agent.tier] }}>
          {initials(agent.name)}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="agent-name">{agent.name}</div>
        </div>
        {showTier && (
          <div className="agent-tier-tag" data-tier={agent.tier}>
            {agent.tier}
          </div>
        )}
      </div>
      <div className="agent-card-body">
        <div className="agent-tagline">{agent.tagline}</div>
        <AgentStatBars stats={agent.stats} variant="compact" />
      </div>
      <div className="agent-card-foot">
        <span className="agent-model">{agent.modelLabel}</span>
        <span className="agent-tool-count">
          {(agent.tools?.length ?? 0)} tools
        </span>
        {agent.author && <span className="agent-installs">{agent.author}</span>}
      </div>
    </Link>
  );
}
