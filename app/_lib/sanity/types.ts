import type { PortableTextBlock } from "next-sanity";

export type SanityTeamMember = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  tier?: "lead" | "bench" | "founder";
  logos?: string[];
  avatarUrl?: string | null;
};

export type SanityLesson = {
  _key: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  summary?: string;
};

export type SanityCourseCard = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  summary?: string;
  accentColor?: string;
  order?: number;
  trackTitle?: string;
  trackSlug?: string;
  trackOrder?: number;
  lessonCount: number;
  lessons?: SanityLesson[];
  instructor?: SanityTeamMember | null;
};

export type SanityCourseDetail = SanityCourseCard & {
  body?: PortableTextBlock[];
};

export type SanityArticleCard = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  accentColor?: string;
  readTime?: string;
  tags?: string[];
  publishedAt: string;
  author?: SanityTeamMember | null;
  thumbnailUrl?: string | null;
};

export type SanityArticleDetail = SanityArticleCard & {
  body?: PortableTextBlock[];
};

export type SanityPillarStatus = "upcoming" | "active" | "done";

export type SanityPillar = {
  _key: string;
  name: string;
  status: SanityPillarStatus;
  summary?: string;
  deliverables?: Array<{
    _key: string;
    name: string;
    done?: boolean;
    due?: string;
  }>;
};

export type SanityAgentTier = "core" | "advanced" | "custom";

export type SanityAgentStats = {
  power?: number;
  speed?: number;
  depth?: number;
};

export type SanityAgentCard = {
  _id: string;
  name: string;
  slug: string;
  tier: SanityAgentTier;
  tagline?: string;
  description?: string;
  model?: "haiku" | "sonnet" | "opus";
  tools?: string[];
  tags?: string[];
  stats?: SanityAgentStats;
  author?: string;
  workspaceSlug?: string | null;
};

export type SanityAgentRelatedCourse = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  trackTitle?: string;
  lessonCount: number;
};

export type SanityAgentDetail = SanityAgentCard & {
  systemPrompt?: string;
  example?: string;
  relatedCourses?: SanityAgentRelatedCourse[];
};

export type SanityAgentForDownload = {
  name: string;
  slug: string;
  description?: string;
  model?: "haiku" | "sonnet" | "opus";
  tools?: string[];
  systemPrompt?: string;
  tier: SanityAgentTier;
  workspaceSlug?: string | null;
};

export type SanityAuthor = {
  clerkUserId: string;
  displayName: string;
  email?: string;
  isMidnightStaff?: boolean;
};

export type SanityThreadCard = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  kind: "question" | "tip";
  tags?: string[];
  upvotes?: number;
  isPinned?: boolean;
  isResolved?: boolean;
  author: SanityAuthor;
  replyCount: number;
};

export type SanityReply = {
  _id: string;
  _createdAt: string;
  body: string;
  upvotes?: number;
  isOfficial?: boolean;
  author: SanityAuthor;
};

export type SanityThreadDetail = SanityThreadCard & {
  body: string;
  workspaceId: string;
  replies: SanityReply[];
};

export type SanityEngagementHeader = {
  _id: string;
  client: string;
  slug: string;
  startDate: string;
  endDate: string;
  currentDay?: number;
};

export type SanityEngagement = {
  _id: string;
  client: string;
  slug: string;
  headline?: string;
  startDate: string;
  endDate: string;
  currentDay?: number;
  slackChannel?: string;
  lead?: SanityTeamMember | null;
  bench?: SanityTeamMember[];
  pillars?: SanityPillar[];
  pinnedCourses?: SanityCourseCard[];
  pinnedArticles?: SanityArticleCard[];
};
