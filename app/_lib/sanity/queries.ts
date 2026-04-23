import { defineQuery } from "next-sanity";

const teamMemberProjection = /* groq */ `
  _id,
  name,
  role,
  bio,
  tier,
  logos,
  "avatarUrl": avatar.asset->url
`;

const courseCardProjection = /* groq */ `
  _id,
  "id": slug.current,
  title,
  "slug": slug.current,
  summary,
  accentColor,
  order,
  "trackTitle": track->title,
  "trackSlug": track->slug.current,
  "trackOrder": track->order,
  "lessonCount": count(lessons),
  lessons[]{
    _key,
    title,
    duration,
    videoUrl,
    summary
  },
  "instructor": instructor->{${teamMemberProjection}}
`;

const articleCardProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  accentColor,
  readTime,
  tags,
  publishedAt,
  "author": author->{${teamMemberProjection}},
  "thumbnailUrl": thumbnail.asset->url
`;

export const ENGAGEMENT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "engagement" && slug.current == $slug][0]{
    _id,
    client,
    "slug": slug.current,
    headline,
    startDate,
    endDate,
    currentDay,
    slackChannel,
    "lead": lead->{${teamMemberProjection}},
    "bench": bench[]->{${teamMemberProjection}},
    pillars[]{
      _key,
      name,
      status,
      summary,
      deliverables[]{
        _key,
        name,
        done,
        due
      }
    },
    "pinnedCourses": pinnedCourses[]->{${courseCardProjection}},
    "pinnedArticles": pinnedArticles[]->{${articleCardProjection}}
  }
`);

export const DEFAULT_ENGAGEMENT_QUERY = defineQuery(/* groq */ `
  *[_type == "engagement"] | order(_createdAt asc)[0]{
    _id,
    client,
    "slug": slug.current,
    headline,
    startDate,
    endDate,
    currentDay,
    slackChannel,
    "lead": lead->{${teamMemberProjection}},
    "bench": bench[]->{${teamMemberProjection}},
    pillars[]{
      _key,
      name,
      status,
      summary,
      deliverables[]{
        _key,
        name,
        done,
        due
      }
    },
    "pinnedCourses": pinnedCourses[]->{${courseCardProjection}},
    "pinnedArticles": pinnedArticles[]->{${articleCardProjection}}
  }
`);

export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course"] | order(coalesce(track->order, 999) asc, order asc, title asc){
    ${courseCardProjection}
  }
`);

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    ${courseCardProjection},
    body
  }
`);

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`);

export const ARTICLES_QUERY = defineQuery(/* groq */ `
  *[_type == "article"] | order(publishedAt desc){
    ${articleCardProjection}
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug][0]{
    ${articleCardProjection},
    body
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`);
