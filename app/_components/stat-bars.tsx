import { statLabels, type Stats } from "../_content/agents";

export function StatBars({
  stats,
  accent,
  compact = false,
}: {
  stats: Stats;
  accent: { from: string; to: string };
  compact?: boolean;
}) {
  const keys = Object.keys(stats) as Array<keyof Stats>;
  return (
    <dl className={compact ? "space-y-1.5" : "space-y-2.5"}>
      {keys.map((key) => (
        <div key={key} className="flex items-center gap-3">
          <dt className="w-20 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            {statLabels[key]}
          </dt>
          <dd className="flex flex-1 gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < stats[key];
              return (
                <span
                  key={i}
                  className={`${
                    compact ? "h-1" : "h-1.5"
                  } flex-1 rounded-full`}
                  style={{
                    background: filled
                      ? `linear-gradient(90deg, ${accent.from}, ${accent.to})`
                      : "rgba(255,255,255,0.06)",
                  }}
                />
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}
