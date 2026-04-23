import { Icons } from "../../_components/icons";
import { AgentCard } from "../../_components/agent-card";
import { agentsByTier } from "../../_components/learn-data";

const TIERS = [
  { key: "core", name: "Core", desc: "Ships with Claude Code. Widely applicable, conservative by design." },
  { key: "advanced", name: "Advanced", desc: "Opinionated workflows from the Midnight library. Powerful, with more guardrails needed." },
  { key: "custom", name: "Custom", desc: "Built for Acme Corp during this engagement. Authored by your team." },
] as const;

export default function AgentLibraryPage() {
  return (
    <div className="fade-enter">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Agent library</div>
            <h1 className="page-title">Eleven agents your team can use today.</h1>
            <div className="page-sub">
              Three ship with Claude Code. Four from the Midnight library. Four built here,
              with your team.
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn"><Icons.plus /> Author a new agent</button>
          </div>
        </div>
      </div>

      {TIERS.map((t) => {
        const items = agentsByTier[t.key];
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
                <AgentCard key={a.id} agent={a} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
