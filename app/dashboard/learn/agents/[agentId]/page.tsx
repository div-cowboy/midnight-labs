import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "../../../_components/icons";
import { AgentStatBars } from "../../../_components/agent-stats";
import { initials } from "../../../_components/data";
import { agents, tierColors } from "../../../_components/learn-data";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) notFound();

  const relatedCourses: { id: string; title: string; lessonCount: number; runtime: string }[] = [];
  const relatedAgents = agent.relatedAgents
    .map((id) => agents.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const example =
    agent.example ||
    `> /${agent.id}\n\nAnalyzing…\n✓ Done. See output above.`;

  return (
    <div className="fade-enter">
      <div className="player-breadcrumb">
        <Link href="/dashboard/learn/agents">Agent library</Link>
        <span className="sep">/</span>
        <span style={{ color: "var(--fg-3)", textTransform: "capitalize" }}>
          {agent.tier}
        </span>
        <span className="sep">/</span>
        <span style={{ color: "var(--fg-1)" }}>{agent.name}</span>
      </div>

      <div className="agent-detail">
        <div>
          <div className="agent-hero" data-tier={agent.tier}>
            <div className="agent-hero-row">
              <div
                className="agent-hero-mark"
                style={{ background: tierColors[agent.tier] }}
              >
                {initials(agent.name)}
              </div>
              <div className="agent-hero-meta">
                <div className="row" style={{ gap: 10, marginBottom: 4 }}>
                  <div className="agent-tier-tag" data-tier={agent.tier}>
                    {agent.tier}
                  </div>
                  <span className="mono muted" style={{ fontSize: 11 }}>
                    by {agent.author}
                  </span>
                </div>
                <div className="agent-hero-title">{agent.name}</div>
                <div className="agent-hero-tagline">{agent.tagline}</div>
                <div className="agent-hero-desc">{agent.description}</div>
                <div
                  className="row"
                  style={{
                    gap: 8,
                    marginTop: 18,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <button className="btn btn-primary">
                    <Icons.download /> Install for my team
                  </button>
                  <button className="btn">Copy invocation</button>
                </div>
              </div>
            </div>
          </div>

          <div className="agent-kv-grid">
            <div className="agent-kv">
              <div className="agent-kv-label">Model</div>
              <div className="agent-kv-value">{agent.model}</div>
            </div>
            <div className="agent-kv">
              <div className="agent-kv-label">Tools</div>
              <div className="agent-kv-value">{agent.tools.join(", ")}</div>
            </div>
            <div className="agent-kv">
              <div className="agent-kv-label">Installs</div>
              <div className="agent-kv-value">
                {agent.installs.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="agent-install-card" style={{ marginTop: 16 }}>
            <div className="agent-install-title">Example invocation</div>
            <pre className="code-block" style={{ margin: 0 }}>
              {example.split("\n").map((line, i) => (
                <div key={i}>
                  {line.startsWith(">") ? (
                    <span className="prompt">{line}</span>
                  ) : line.startsWith("//") || line.startsWith("#") ? (
                    <span className="comment">{line}</span>
                  ) : line.startsWith("✓") ? (
                    <span className="accent">{line}</span>
                  ) : (
                    <span className="out">{line || "\u00A0"}</span>
                  )}
                </div>
              ))}
            </pre>
          </div>

          <div className="agent-install-card" style={{ marginTop: 16 }}>
            <div className="agent-install-title">Install</div>
            <pre className="code-block" style={{ margin: 0 }}>
              <div>
                <span className="comment"># From your terminal, inside your repo:</span>
              </div>
              <div>
                <span className="prompt">$</span> claude agents install{" "}
                <span className="accent">
                  {agent.tier === "custom"
                    ? `acme/${agent.id}`
                    : `midnight/${agent.id}`}
                </span>
              </div>
              <div className="out">
                Installed. Invoke with{" "}
                <span style={{ color: "#c7d2fe" }}>/{agent.id}</span> in a Claude
                Code session.
              </div>
            </pre>
          </div>
        </div>

        <div className="agent-side">
          {relatedCourses.length > 0 && (
            <div className="side-card">
              <div className="side-card-head">Lessons that teach this</div>
              <div className="side-card-body">
                {relatedCourses.map((c) => (
                  <Link
                    key={c.id}
                    href={`/dashboard/learn/library/${c.id}`}
                    className="side-link"
                  >
                    <div className="side-link-mark"><Icons.learn /></div>
                    <div style={{ minWidth: 0 }}>
                      <div className="side-link-title">{c.title}</div>
                      <div className="side-link-sub">
                        {c.lessonCount} lessons · {c.runtime}
                      </div>
                    </div>
                    <div className="side-link-arrow"><Icons.caret /></div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedAgents.length > 0 && (
            <div className="side-card">
              <div className="side-card-head">Pairs well with</div>
              <div className="side-card-body">
                {relatedAgents.map((a) => (
                  <Link
                    key={a.id}
                    href={`/dashboard/learn/agents/${a.id}`}
                    className="side-link"
                  >
                    <div
                      className="side-link-mark"
                      style={{
                        background: tierColors[a.tier],
                        color: "#fff",
                        border: "none",
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {initials(a.name)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="side-link-title">{a.name}</div>
                      <div className="side-link-sub">
                        {a.tier} · {a.installs.toLocaleString()} installs
                      </div>
                    </div>
                    <div className="side-link-arrow"><Icons.caret /></div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="side-card">
            <div className="side-card-head">Stats</div>
            <AgentStatBars stats={agent.stats} variant="detail" />
          </div>
        </div>
      </div>
    </div>
  );
}
