import type { Lesson } from "@/app/dashboard/_components/learn-data";
import {
  ACCENT_FALLBACKS,
  fallbackInstructors,
  type InstructorFallback,
} from "./instructor-fallbacks";
import type {
  SanityAgentCard,
  SanityAgentDetail,
  SanityArticleCard,
  SanityArticleDetail,
  SanityCourseCard,
  SanityTeamMember,
} from "./types";

export type UIInstructor = InstructorFallback & { id: string };

export type UICourse = {
  _id: string;
  id: string;
  slug: string;
  track: string;
  trackSlug?: string;
  trackOrder?: number;
  title: string;
  tagline: string;
  instructor: UIInstructor;
  runtime: string;
  lessonCount: number;
  progress: number;
  lessons: Lesson[];
};

export type UIArticleCard = SanityArticleCard & { instructor: UIInstructor };
export type UIArticleDetail = SanityArticleDetail & { instructor: UIInstructor };
export type UIArticle = UIArticleCard | UIArticleDetail;

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

function instructorIdFromName(name: string): string {
  return (
    name
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[^a-z]/g, ""))
      .join("-")
      .slice(0, 48) || "midnight"
  );
}

const DEFAULT_INSTRUCTOR: UIInstructor = {
  id: "midnight",
  name: "Midnight team",
  role: "Engagement delivery",
  bio: "",
  color: "#8b5cf6",
  color2: "#3b82f6",
};

export function toInstructor(
  member: SanityTeamMember | null | undefined,
): UIInstructor {
  if (!member) return DEFAULT_INSTRUCTOR;
  const id = instructorIdFromName(member.name);
  const fallback = fallbackInstructors[id];
  const hash = member._id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const [color, color2] = fallback
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

function sumDuration(lessons?: { duration?: string }[]): string {
  if (!lessons?.length) return "—";
  let seconds = 0;
  for (const l of lessons) {
    const d = l.duration ?? "";
    const colon = d.match(/^(\d+):(\d+)$/);
    if (colon) {
      seconds += parseInt(colon[1]) * 60 + parseInt(colon[2]);
      continue;
    }
    const m = d.match(/(\d+)\s*m/i);
    const s = d.match(/(\d+)\s*s/i);
    if (m) seconds += parseInt(m[1]) * 60;
    if (s) seconds += parseInt(s[1]);
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
  const rawLessons = course.lessons ?? [];
  const total = rawLessons.length;
  const progress = progressMap?.[course.slug] ?? 0;
  const currentIdx =
    progress > 0 && progress < 1 && total
      ? Math.min(total - 1, Math.floor(progress * total))
      : -1;
  const lessons: Lesson[] = rawLessons.map((l, i) => ({
    title: l.title,
    dur: l.duration ?? "—",
    done: i !== currentIdx && progress >= (i + 1) / (total || 1),
    current: i === currentIdx,
  }));
  return {
    _id: course._id,
    id: course.slug,
    slug: course.slug,
    title: course.title,
    tagline: course.summary ?? "",
    track: course.trackTitle ?? "General",
    trackSlug: course.trackSlug,
    trackOrder: course.trackOrder,
    instructor: toInstructor(course.instructor ?? null),
    runtime: sumDuration(rawLessons),
    lessonCount: course.lessonCount,
    progress,
    lessons,
  };
}

export function toUIArticleCard(article: SanityArticleCard): UIArticleCard {
  return { ...article, instructor: toInstructor(article.author ?? null) };
}

export function toUIArticleDetail(
  article: SanityArticleDetail,
): UIArticleDetail {
  return { ...article, instructor: toInstructor(article.author ?? null) };
}

export const MODELS = ["haiku", "sonnet", "opus"] as const;
export type Model = (typeof MODELS)[number];
export const MODEL_LABELS: Record<Model, string> = {
  haiku: "Haiku 4.5",
  sonnet: "Sonnet 4.6",
  opus: "Opus 4.7",
};

export function toUIAgent(agent: SanityAgentCard): UIAgent {
  const model = (agent.model ?? "sonnet") as Model;
  return {
    ...agent,
    id: agent.slug,
    modelLabel: MODEL_LABELS[model] ?? MODEL_LABELS.sonnet,
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
