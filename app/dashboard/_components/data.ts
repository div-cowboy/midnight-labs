export type Workspace = {
  name: string;
  sub: string;
  tag: string;
  color: string;
  active?: boolean;
};

export const workspaces: Workspace[] = [
  {
    name: "Acme Corp",
    sub: "Engagement · Day 8 of 60",
    tag: "AC",
    color: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    active: true,
  },
  {
    name: "Vireo Health",
    sub: "Retainer · Month 3",
    tag: "VH",
    color: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
  {
    name: "Polaris Robotics",
    sub: "Engagement · Day 3 of 28",
    tag: "PR",
    color: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
];

export function fmtMoney(n: number): string {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const TWEAKS = {
  density: "compact" as "comfortable" | "compact",
  playerSize: 65,
  playbackSpeed: 1,
  captions: true,
};
