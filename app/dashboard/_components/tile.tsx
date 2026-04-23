import type { ReactNode } from "react";

export function Tile({
  label,
  chip,
  value,
  delta,
  foot,
}: {
  label: ReactNode;
  chip?: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <div className="tile">
      <div className="tile-label">
        <span>{label}</span>
        {chip}
      </div>
      <div className="tile-value">{value}</div>
      <div className="tile-delta">{delta}</div>
      <div className="tile-foot">{foot}</div>
    </div>
  );
}
