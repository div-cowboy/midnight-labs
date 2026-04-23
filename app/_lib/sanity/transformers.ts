import type { Instructor, Lesson } from "@/app/dashboard/_components/learn-data";
import { instructors as fallbackInstructors } from "@/app/dashboard/_components/learn-data";
import type {
  SanityAgentCard,
  SanityAgentDetail,
  SanityArticleCard,
  SanityArticleDetail,
  SanityCourseCard,
  SanityTeamMember,
} from "./types";

export type UICourse = {
  _id: string;
  id: string;
  slug: string;
  track: string;
  trackSlug?: string;
  trackOrder?: number;
  title: string;
  tagline: string;
  instructor: Instructor & { id: string };
  runtime: string;
  lessonCount: number;
  progress: number;
  lessons: Lesson[];
};

export type UIArticle = SanityArticleDetail & {
  instructor: Instructor & { id: string };
};

export type UIAgent = SanityAgentCard & {
  id: string;
  modelLabel: string;
  stats: { power: number; speed: number; depth: number };
};

export type UIAgentDetail = UIAgent & {
  systemPrompt?: string;
  example?: string;
  relatedCourses: NonNullable<SanityAgentDetail["relatedCourses"]>;
};

const ACCENT_FALLBACKS: [string, string][] = [
  ["#8b5cf6", "#3b82f6"],
  ["#ec4899", "#8b5cf6"],
  ["#f59e0b", "#ef4444"],
  ["#22d3ee", "#3b82f6"],
  ["#10b981", "#22d3ee"],
  ["#6366f1", "#8b5cf6"],
];

function instructorIdFromName(name: string): string {
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z]/g, ""))
    .join("-")
    .slice(0, 48) || "midnight";
}

export function toInstructor(
  member: SanityTeamMember | null | undefined,
): Instructor & { id: string } {
  if (member) {
    const id = instructorIdFromName(member.name);
    const fallback = fallbackInstructors[id];
    const hash = member._id
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const [color, color2] =
      fallback
        ? [fallback.color, fallback.color2]
        : ACCENT_FALLBACKS[hash % ACCENT_FALLBACKS.length];
    return {
      id,
      name: member.name,
      role: member.role ?? "Midnight team",
      bio: member.bio ?? "",
      color,
      color2,
    };
  }
  return {
    id: "midnight",
    name: "Midnight team",
    role: "Engagement delivery",
    bio: "",
    color: "#8b5cf6",
    color2: "#3b82f6",
  };
}

function sumDuration(lessons?: { duration?: string }[]): string {
  if (!lessons?.length) return "—";
  let seconds = 0;
  for (const l of lessons) {
    const d = l.duration ?? "";
    const m = d.match(/(\d+)\s*m/i);
    const s = d.match(/(\d+)\s*s/i);
    const colon = d.match(/^(\d+):(\d+)$/);
    if (colon) {
      seconds += parseInt(colon[1]) * 60 + parseInt(colon[2]);
    } else {
      if (m) seconds += parseInt(m[1]) * 60;
      if (s) seconds += parseInt(s[1]);
    }
  }
  if (!seconds) return "—";
  const h = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${mins.toString().padStart(2, "0")}m` : `${mins}m`;
}

export function toUICourse(
  course: SanityCourseCard,
  progressMap?: Record<string, number>,
): UICourse {
  const instructor = toInstructor(course.instructor ?? null);
  const progress = progressMap?.[course.slug] ?? 0;
  const lessons: Lesson[] = (course.lessons ?? []).map((l, i) => ({
    title: l.title,
    dur: l.duration ?? "—",
    done: progress >= (i + 1) / Math.max(course.lessons?.length ?? 1, 1),
    current: false,
  }));
  if (progress > 0 && progress < 1 && lessons.length) {
    const currentIdx = Math.min(
      lessons.length - 1,
      Math.floor(progress * lessons.length),
    );
    lessons[currentIdx].current = true;
    lessons[currentIdx].done = false;
  }
  return {
    _id: course._id,
    id: course.slug,
    slug: course.slug,
    title: course.title,
    tagline: course.summary ?? "",
    track: course.trackTitle ?? "General",
    trackSlug: course.trackSlug,
    trackOrder: course.trackOrder,
    instructor,
    runtime: sumDuration(course.lessons),
    lessonCount: course.lessonCount,
    progress,
    lessons,
  };
}

export function toUIArticle(
  article: SanityArticleCard | SanityArticleDetail,
): UIArticle {
  return {
    ...(article as SanityArticleDetail),
    instructor: toInstructor(article.author ?? null),
  };
}

const MODEL_LABELS: Record<string, string> = {
  haiku: "Haiku 4.5",
  sonnet: "Sonnet 4.6",
  opus: "Opus 4.7",
};

export function toUIAgent(agent: SanityAgentCard): UIAgent {
  return {
    ...agent,
    id: agent.slug,
    modelLabel: MODEL_LABELS[agent.model ?? "sonnet"] ?? "Sonnet 4.6",
    stats: {
      power: agent.stats?.power ?? 3,
      speed: agent.stats?.speed ?? 3,
      depth: agent.stats?.depth ?? 3,
    },
  };
}

export function toUIAgentDetail(agent: SanityAgentDetail): UIAgentDetail {
  return {
    ...toUIAgent(agent),
    systemPrompt: agent.systemPrompt,
    example: agent.example,
    relatedCourses: agent.relatedCourses ?? [],
  };
}
