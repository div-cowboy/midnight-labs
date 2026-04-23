import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { getArticle, getArticleSlugs } from "@/app/_lib/sanity/fetch";
import { toUIArticle } from "@/app/_lib/sanity/transformers";
import { urlFor } from "@/sanity/lib/image";
import type { SanityArticleDetail } from "@/app/_lib/sanity/types";
import { InstructorChip } from "../../../_components/portrait";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: "24px 0" }}>
          <Image
            src={urlFor(value).width(960).url()}
            alt={value.alt ?? ""}
            width={960}
            height={540}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              border: "1px solid var(--line)",
            }}
          />
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          marginTop: 32,
          marginBottom: 12,
          color: "var(--fg)",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: 17,
          fontWeight: 500,
          marginTop: 24,
          marginBottom: 8,
          color: "var(--fg)",
        }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ lineHeight: 1.7, color: "var(--fg-1)", marginBottom: 14 }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid var(--line-3)",
          padding: "4px 16px",
          margin: "18px 0",
          color: "var(--fg-2)",
          fontStyle: "italic",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code
        style={{
          fontFamily: "var(--mono)",
          background: "var(--bg-2)",
          padding: "1px 6px",
          borderRadius: 4,
          fontSize: "0.92em",
        }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        style={{
          color: "var(--fg-1)",
          borderBottom: "1px dashed var(--line-3)",
        }}
      >
        {children}
      </a>
    ),
  },
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = (await getArticle(slug)) as SanityArticleDetail | null;
  if (!raw) notFound();

  const article = toUIArticle(raw);
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fade-enter" style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="player-breadcrumb">
        <Link href="/dashboard/learn/articles">Articles</Link>
        <span className="sep">/</span>
        <span style={{ color: "var(--fg-1)" }}>{article.title}</span>
      </div>
      <div className="page-head">
        <div
          className="page-eyebrow"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          <span>{article.tags?.[0] ?? "Field notes"}</span>
          <span style={{ color: "var(--fg-4)" }}>·</span>
          <span className="mono">{date}</span>
          {article.readTime && (
            <>
              <span style={{ color: "var(--fg-4)" }}>·</span>
              <span className="mono">{article.readTime}</span>
            </>
          )}
        </div>
        <h1 className="page-title" style={{ marginTop: 8 }}>
          {article.title}
        </h1>
        {article.summary && (
          <div
            className="page-sub"
            style={{ fontSize: 17, color: "var(--fg-2)", marginTop: 10 }}
          >
            {article.summary}
          </div>
        )}
        <div style={{ marginTop: 14 }}>
          <InstructorChip instructor={article.instructor} size={26} />
        </div>
      </div>

      {article.body && (
        <div style={{ fontSize: 15, marginTop: 18 }}>
          <PortableText value={article.body} components={portableComponents} />
        </div>
      )}
    </div>
  );
}
