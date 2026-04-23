export type InstructorFallback = {
  name: string;
  role: string;
  bio: string;
  color: string;
  color2: string;
};

export const fallbackInstructors: Record<string, InstructorFallback> = {
  rae: {
    name: "Rae Castellanos",
    role: "Principal, Midnight",
    bio: "",
    color: "#8b5cf6",
    color2: "#3b82f6",
  },
  kenji: {
    name: "Kenji Watanabe",
    role: "Claude Code lead, Midnight",
    bio: "",
    color: "#ec4899",
    color2: "#8b5cf6",
  },
  amara: {
    name: "Amara Dembélé",
    role: "Agents practice, Midnight",
    bio: "",
    color: "#f59e0b",
    color2: "#ef4444",
  },
  jules: {
    name: "Jules Park",
    role: "Adoption research, Midnight",
    bio: "",
    color: "#22d3ee",
    color2: "#3b82f6",
  },
  noor: {
    name: "Noor Haidari",
    role: "Evals & safety, Midnight",
    bio: "",
    color: "#10b981",
    color2: "#22d3ee",
  },
  marcus: {
    name: "Marcus Wei",
    role: "Platform engineering, Midnight",
    bio: "",
    color: "#6366f1",
    color2: "#8b5cf6",
  },
};

export const ACCENT_FALLBACKS: [string, string][] = [
  ["#8b5cf6", "#3b82f6"],
  ["#ec4899", "#8b5cf6"],
  ["#f59e0b", "#ef4444"],
  ["#22d3ee", "#3b82f6"],
  ["#10b981", "#22d3ee"],
  ["#6366f1", "#8b5cf6"],
];
