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

export const ENGAGEMENT_HEADER_QUERY = defineQuery(/* groq */ `
  *[_type == "engagement" && (!defined($slug) || slug.current == $slug)]
  | order(_createdAt asc)[0]{
    _id,
    client,
    "slug": slug.current,
    startDate,
    endDate,
    currentDay
  }
`);

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

const agentCardProjection = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  tier,
  tagline,
  description,
  model,
  tools,
  tags,
  stats,
  author,
  "workspaceSlug": workspace->slug.current
`;

export const AGENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "agent" && (
    tier != "custom" ||
    workspace._ref in *[_type == "engagement" && slug.current == $workspace]._id
  )]
  | order(tier asc, name asc) {
    ${agentCardProjection}
  }
`);

export const AGENT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "agent" && slug.current == $slug][0]{
    ${agentCardProjection},
    systemPrompt,
    example,
    "relatedCourses": relatedCourses[]->{
      _id,
      "id": slug.current,
      title,
      "slug": slug.current,
      "trackTitle": track->title,
      "lessonCount": count(lessons)
    }
  }
`);

export const AGENT_FOR_DOWNLOAD_QUERY = defineQuery(/* groq */ `
  *[_type == "agent" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    description,
    model,
    tools,
    systemPrompt,
    tier,
    "workspaceSlug": workspace->slug.current
  }
`);

export const AGENT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "agent" && defined(slug.current) && tier != "custom"]{
    "slug": slug.current
  }
`);

const authorProjection = /* groq */ `
  author {
    clerkUserId,
    displayName,
    email,
    isMidnightStaff
  }
`;

const threadCardProjection = /* groq */ `
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  kind,
  tags,
  upvotes,
  isPinned,
  isResolved,
  ${authorProjection},
  "replyCount": count(*[_type == "reply" && thread._ref == ^._id])
`;

export const THREADS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "thread" &&
    workspace._ref in *[_type == "engagement" && slug.current == $workspace]._id
  ]
  | order(isPinned desc, _createdAt desc) {
    ${threadCardProjection}
  }
`);

export const THREAD_BY_ID_QUERY = defineQuery(/* groq */ `
  *[
    _type == "thread" &&
    _id == $id &&
    workspace._ref in *[_type == "engagement" && slug.current == $workspace]._id
  ][0]{
    ${threadCardProjection},
    body,
    "workspaceId": workspace._ref,
    "replies": *[_type == "reply" && thread._ref == ^._id]
      | order(isOfficial desc, upvotes desc, _createdAt asc) {
        _id,
        _createdAt,
        body,
        upvotes,
        isOfficial,
        ${authorProjection}
      }
  }
`);
