import { client } from "@/sanity/lib/client";
import {
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
  COURSES_QUERY,
  DEFAULT_ENGAGEMENT_QUERY,
  ENGAGEMENT_BY_SLUG_QUERY,
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
