export function ProgressRing({
  progress,
  size = 40,
  stroke = 3,
}: {
  progress: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  return (
    <svg
      className="course-thumb-progress-ring"
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: size, height: size }}
    >
      <circle className="bg" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
      {progress > 0 && (
        <circle
          className="fg"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      )}
      <text x={size / 2} y={size / 2 + 0.5}>
        {progress === 1 ? "✓" : progress === 0 ? "—" : `${Math.round(progress * 100)}`}
      </text>
    </svg>
  );
}
