import { instructors } from "./learn-data";

type InstructorInput =
  | string
  | { id: string; name: string; color: string; color2: string };

function resolve(input: InstructorInput) {
  if (typeof input === "string") {
    const ins = instructors[input];
    if (!ins) return null;
    return { id: input, name: ins.name, color: ins.color, color2: ins.color2 };
  }
  return input;
}

export function Portrait({
  instructor,
  size = 40,
}: {
  instructor: InstructorInput;
  size?: number;
}) {
  const ins = resolve(instructor);
  if (!ins) return null;
  const seed =
    (ins.id.charCodeAt(0) || 0) + (ins.id.charCodeAt(Math.min(1, ins.id.length - 1)) || 0);
  const accent = seed % 3;
  const gradId = `pt-${ins.id}`;
  return (
    <div className="portrait" style={{ width: size, height: size, flex: "none" }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ins.color} />
            <stop offset="100%" stopColor={ins.color2} />
          </linearGradient>
        </defs>
        <rect width="40" height="40" fill={`url(#${gradId})`} />
        <circle cx="20" cy="16" r="6.5" fill="rgba(0,0,0,0.35)" />
        <path d="M8 40 Q8 27 20 27 Q32 27 32 40 Z" fill="rgba(0,0,0,0.35)" />
        {accent === 0 && <circle cx="33" cy="7" r="3" fill="rgba(255,255,255,0.3)" />}
        {accent === 1 && <rect x="3" y="3" width="6" height="6" fill="rgba(255,255,255,0.25)" />}
        {accent === 2 && <path d="M32 32 L38 38 L32 38 Z" fill="rgba(255,255,255,0.25)" />}
      </svg>
    </div>
  );
}

export function InstructorChip({
  instructor,
  size = 22,
}: {
  instructor: InstructorInput;
  size?: number;
}) {
  const ins = resolve(instructor);
  if (!ins) return null;
  return (
    <div className="instructor-chip">
      <Portrait instructor={ins} size={size} />
      <span>{ins.name}</span>
    </div>
  );
}
