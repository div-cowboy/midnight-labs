import Link from "next/link";
import { initials } from "./data";
import { AgentStatBars } from "./agent-stats";
import type { Agent } from "./learn-data";
import { tierColors } from "./learn-data";

export function AgentCard({
  agent,
  showTier = true,
}: {
  agent: Agent;
  showTier?: boolean;
}) {
  return (
    <Link
      href={`/dashboard/learn/agents/${agent.id}`}
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
        <span className="agent-model">{agent.model}</span>
        <span className="agent-tool-count">{agent.tools.length} tools</span>
        <span className="agent-installs">
          {agent.installs.toLocaleString()} installs
        </span>
      </div>
    </Link>
  );
}
