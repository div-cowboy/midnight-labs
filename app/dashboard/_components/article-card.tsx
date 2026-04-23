import Link from "next/link";
import Image from "next/image";
import { InstructorChip } from "./portrait";
import type { UIArticle } from "@/app/_lib/sanity/transformers";

function ArticleThumb({ article }: { article: UIArticle }) {
  const accent = article.accentColor ?? article.instructor.color;
  const accent2 = article.instructor.color2;
  if (article.thumbnailUrl) {
    return (
      <div className="course-thumb" style={{ position: "relative" }}>
        <Image
          src={article.thumbnailUrl}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 960px) 320px, 50vw"
        />
      </div>
    );
  }
  const initial =
    article.title
      .split(" ")
      .find((w) => w.length > 2)?.[0]
      ?.toUpperCase() || article.title[0];
  return (
    <div
      className="course-thumb"
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}
    >
      <div className="course-thumb-dots" />
      <div className="course-thumb-glyph">{initial}</div>
    </div>
  );
}

export function ArticleCard({ article }: { article: UIArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Link href={`/dashboard/learn/articles/${article.slug}`} className="course-card">
      <ArticleThumb article={article} />
      <div className="course-card-body">
        <div className="course-card-track">
          {article.tags?.[0] ?? "Field notes"}
        </div>
        <div className="course-card-title">{article.title}</div>
        <div className="course-card-tagline">{article.summary}</div>
      </div>
      <div className="course-card-foot">
        <InstructorChip instructor={article.instructor} />
        <div className="course-card-meta-right">
          <span>{article.readTime ?? "—"}</span>
          <span style={{ color: "var(--fg-4)" }}>·</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
