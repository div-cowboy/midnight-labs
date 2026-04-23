import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "../../../_components/icons";
import { AgentStatBars } from "../../../_components/agent-stats";
import { initials } from "../../../_components/data";
import { tierColors } from "../../../_components/learn-data";
import { getAgent, getAgentSlugs } from "@/app/_lib/sanity/fetch";
import { toUIAgentDetail } from "@/app/_lib/sanity/transformers";
import type { SanityAgentDetail } from "@/app/_lib/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAgentSlugs();
  return slugs.map((s) => ({ agentId: s.slug }));
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const raw = (await getAgent(agentId)) as SanityAgentDetail | null;
  if (!raw) notFound();

  const agent = toUIAgentDetail(raw);

  const example =
    agent.example ||
    `> /${agent.slug}\n\nAnalyzing…\n✓ Done. See output above.`;

  const TIER_NAMESPACE: Record<typeof agent.tier, string> = {
    core: "anthropic",
    advanced: "midnight",
    custom: agent.workspaceSlug ?? "your-workspace",
  };
  const installNamespace = TIER_NAMESPACE[agent.tier];

  const LINE_PREFIX_CLASS: { prefix: string; className: string }[] = [
    { prefix: ">", className: "prompt" },
    { prefix: "//", className: "comment" },
    { prefix: "#", className: "comment" },
    { prefix: "✓", className: "accent" },
  ];
  const classifyLine = (line: string) =>
    LINE_PREFIX_CLASS.find((m) => line.startsWith(m.prefix))?.className ?? "out";

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
                  {agent.author && (
                    <span className="mono muted" style={{ fontSize: 11 }}>
                      by {agent.author}
                    </span>
                  )}
                </div>
                <div className="agent-hero-title">{agent.name}</div>
                <div className="agent-hero-tagline">{agent.tagline}</div>
                {agent.description && (
                  <div className="agent-hero-desc">{agent.description}</div>
                )}
                <div
                  className="row"
                  style={{
                    gap: 8,
                    marginTop: 18,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <a
                    href={`/api/agents/${agent.slug}/download`}
                    className="btn btn-primary"
                    download={`${agent.slug}.md`}
                  >
                    <Icons.download /> Download for Claude Code
                  </a>
                  <Link
                    href={`/dashboard/learn/agents/${agent.slug}#install`}
                    className="btn"
                  >
                    How to install
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="agent-kv-grid">
            <div className="agent-kv">
              <div className="agent-kv-label">Model</div>
              <div className="agent-kv-value">{agent.modelLabel}</div>
            </div>
            <div className="agent-kv">
              <div className="agent-kv-label">Tools</div>
              <div className="agent-kv-value">
                {(agent.tools ?? []).join(", ") || "—"}
              </div>
            </div>
            <div className="agent-kv">
              <div className="agent-kv-label">Tags</div>
              <div className="agent-kv-value">
                {(agent.tags ?? []).join(", ") || "—"}
              </div>
            </div>
          </div>

          <div className="agent-install-card" style={{ marginTop: 16 }}>
            <div className="agent-install-title">Example invocation</div>
            <pre className="code-block" style={{ margin: 0 }}>
              {example.split("\n").map((line, i) => (
                <div key={i}>
                  <span className={classifyLine(line)}>{line || " "}</span>
                </div>
              ))}
            </pre>
          </div>

          <div
            id="install"
            className="agent-install-card"
            style={{ marginTop: 16 }}
          >
            <div className="agent-install-title">Install</div>
            <pre className="code-block" style={{ margin: 0 }}>
              <div>
                <span className="comment">
                  # From your repo root, download the agent file:
                </span>
              </div>
              <div>
                <span className="prompt">$</span> mkdir -p .claude/agents && curl{" "}
                <span className="accent">
                  https://trymidnightai.com/api/agents/{agent.slug}/download
                </span>{" "}
                -o .claude/agents/{agent.slug}.md
              </div>
              <div className="out">
                Commit it in with your team, then invoke{" "}
                <span style={{ color: "#c7d2fe" }}>/{agent.slug}</span> inside a
                Claude Code session.
              </div>
              <div>&nbsp;</div>
              <div>
                <span className="comment">
                  # (npx midnight install {installNamespace}/{agent.slug} is
                  coming — V1.1.)
                </span>
              </div>
            </pre>
          </div>

          {agent.systemPrompt && (
            <div className="agent-install-card" style={{ marginTop: 16 }}>
              <div className="agent-install-title">System prompt (preview)</div>
              <pre
                className="code-block"
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  maxHeight: 320,
                  overflow: "auto",
                }}
              >
                {agent.systemPrompt}
              </pre>
            </div>
          )}
        </div>

        <div className="agent-side">
          {agent.relatedCourses.length > 0 && (
            <div className="side-card">
              <div className="side-card-head">Lessons that teach this</div>
              <div className="side-card-body">
                {agent.relatedCourses.map((c) => (
                  <Link
                    key={c._id}
                    href={`/dashboard/learn/library/${c.slug}`}
                    className="side-link"
                  >
                    <div className="side-link-mark">
                      <Icons.learn />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="side-link-title">{c.title}</div>
                      <div className="side-link-sub">
                        {c.trackTitle} · {c.lessonCount} lessons
                      </div>
                    </div>
                    <div className="side-link-arrow">
                      <Icons.caret />
                    </div>
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
