import Link from "next/link";
import { getArticles } from "@/app/_lib/sanity/fetch";
import { toUIArticle } from "@/app/_lib/sanity/transformers";
import type { SanityArticleCard } from "@/app/_lib/sanity/types";
import { ArticleCard } from "../../_components/article-card";

export const revalidate = 60;

export default async function ArticlesPage() {
  const raw = (await getArticles()) as SanityArticleCard[];
  const articles = raw.map(toUIArticle);

  return (
    <div className="fade-enter">
      <div className="page-head learn-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Field notes</div>
            <h1 className="page-title">Short reads from the engagement.</h1>
            <div className="page-sub">
              Patterns, retros, and what we&apos;ve seen work. Written by the team
              delivering your install.
            </div>
          </div>
        </div>
      </div>

      {articles.length === 0 ? (
        <div
          style={{
            marginTop: 32,
            padding: 40,
            border: "1px dashed var(--line-3)",
            borderRadius: 12,
            textAlign: "center",
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          No articles yet. Publish one in{" "}
          <Link href="/studio" style={{ color: "var(--fg-1)" }}>
            Sanity Studio
          </Link>
          .
        </div>
      ) : (
        <div className="course-section">
          <div className="course-grid">
            {articles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
