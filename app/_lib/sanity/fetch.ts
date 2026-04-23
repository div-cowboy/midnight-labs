import { client } from "@/sanity/lib/client";
import {
  AGENT_BY_SLUG_QUERY,
  AGENT_FOR_DOWNLOAD_QUERY,
  AGENT_SLUGS_QUERY,
  AGENTS_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
  COURSES_QUERY,
  DEFAULT_ENGAGEMENT_QUERY,
  ENGAGEMENT_BY_SLUG_QUERY,
  THREAD_BY_ID_QUERY,
  THREADS_QUERY,
} from "./queries";

type FetchOptions = { tags?: string[]; revalidate?: number };

function fetchWith<T>(
  query: string,
  params: Record<string, unknown>,
  { tags = [], revalidate = 60 }: FetchOptions = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate },
  });
}

export const getEngagement = (slug?: string) =>
  slug
    ? fetchWith(ENGAGEMENT_BY_SLUG_QUERY, { slug }, { tags: ["engagement", `engagement:${slug}`] })
    : fetchWith(DEFAULT_ENGAGEMENT_QUERY, {}, { tags: ["engagement"] });

export const getCourses = () =>
  fetchWith(COURSES_QUERY, {}, { tags: ["course", "track", "teamMember"] });

export const getCourse = (slug: string) =>
  fetchWith(
    COURSE_BY_SLUG_QUERY,
    { slug },
    { tags: ["course", `course:${slug}`, "track", "teamMember"] },
  );

export const getCourseSlugs = () =>
  fetchWith<{ slug: string }[]>(
    COURSE_SLUGS_QUERY,
    {},
    { revalidate: 300, tags: ["course"] },
  );

export const getArticles = () =>
  fetchWith(ARTICLES_QUERY, {}, { tags: ["article", "teamMember"] });

export const getArticle = (slug: string) =>
  fetchWith(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
    { tags: ["article", `article:${slug}`, "teamMember"] },
  );

export const getArticleSlugs = () =>
  fetchWith<{ slug: string }[]>(
    ARTICLE_SLUGS_QUERY,
    {},
    { revalidate: 300, tags: ["article"] },
  );

export const getAgents = (workspace?: string) =>
  fetchWith(
    AGENTS_QUERY,
    { workspace: workspace ?? "__none__" },
    { tags: ["agent", workspace ? `agent:workspace:${workspace}` : "agent:core"] },
  );

export const getAgent = (slug: string) =>
  fetchWith(
    AGENT_BY_SLUG_QUERY,
    { slug },
    { tags: ["agent", `agent:${slug}`, "course"] },
  );

export const getAgentForDownload = (slug: string) =>
  fetchWith(
    AGENT_FOR_DOWNLOAD_QUERY,
    { slug },
    { tags: ["agent", `agent:${slug}`] },
  );

export const getAgentSlugs = () =>
  fetchWith<{ slug: string }[]>(
    AGENT_SLUGS_QUERY,
    {},
    { revalidate: 300, tags: ["agent"] },
  );

export const getThreads = (workspace: string) =>
  fetchWith(
    THREADS_QUERY,
    { workspace },
    { tags: ["thread", `thread:workspace:${workspace}`], revalidate: 10 },
  );

export const getThread = (id: string, workspace: string) =>
  fetchWith(
    THREAD_BY_ID_QUERY,
    { id, workspace },
    { tags: ["thread", "reply", `thread:${id}`], revalidate: 10 },
  );
