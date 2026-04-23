import type { AgentStats } from "./learn-data";

const KEYS: { k: keyof AgentStats; l: string }[] = [
  { k: "power", l: "Power" },
  { k: "speed", l: "Speed" },
  { k: "depth", l: "Depth" },
];

export function AgentStatBars({
  stats,
  variant = "compact",
}: {
  stats: AgentStats;
  variant?: "compact" | "detail";
}) {
  if (variant === "detail") {
    return (
      <div
        style={{
          padding: "12px 16px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {KEYS.map(({ k, l }) => (
          <div key={k}>
            <div
              className="row"
              style={{
                justifyContent: "space-between",
                fontSize: 11.5,
                color: "var(--fg-2)",
                marginBottom: 4,
              }}
            >
              <span>{l}</span>
              <span className="mono" style={{ color: "var(--fg-3)" }}>
                {stats[k]} / 5
              </span>
            </div>
            <Pips value={stats[k]} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="agent-stats">
      {KEYS.map(({ k, l }) => (
        <div key={k}>
          <div className="agent-stat-label">{l}</div>
          <Pips value={stats[k]} />
        </div>
      ))}
    </div>
  );
}

function Pips({ value }: { value: number }) {
  return (
    <div className="agent-stat-bar">
      {[1, 2, 3, 4, 5].map((p) => (
        <div key={p} className="agent-stat-pip" data-on={value >= p ? "true" : "false"} />
      ))}
    </div>
  );
}
