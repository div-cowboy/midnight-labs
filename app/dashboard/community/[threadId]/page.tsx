import Link from "next/link";
import { notFound } from "next/navigation";
import { getThread } from "@/app/_lib/sanity/fetch";
import { getCurrentAuthor } from "@/app/_lib/workspace";
import { timeAgo } from "@/app/_lib/time";
import type { SanityThreadDetail } from "@/app/_lib/sanity/types";
import { UpvoteButton } from "./_upvote-button";
import { ReplyForm } from "./_reply-form";

export const revalidate = 10;

export default async function ThreadDetailPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const author = await getCurrentAuthor();
  const workspace = author?.workspace;
  const staff = author?.isMidnightStaff ?? false;

  if (!workspace) {
    return (
      <div className="fade-enter">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">Community</div>
            <h1 className="page-title">
              You need a workspace to view this thread.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const thread = (await getThread(threadId, workspace)) as SanityThreadDetail | null;
  if (!thread) notFound();

  return (
    <div className="fade-enter" style={{ maxWidth: 860 }}>
      <div className="player-breadcrumb">
        <Link href="/dashboard/community">Community</Link>
        <span className="sep">/</span>
        <span style={{ color: "var(--fg-1)" }}>{thread.title}</span>
      </div>

      <div
        className="card"
        style={{ padding: 22, display: "grid", gridTemplateColumns: "auto 1fr", gap: 18 }}
      >
        <UpvoteButton
          targetId={thread._id}
          targetType="thread"
          count={thread.upvotes ?? 0}
        />
        <div style={{ minWidth: 0 }}>
          <div
            className="row"
            style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}
          >
            <span
              className="chip"
              style={{
                fontSize: 10,
                padding: "1px 6px",
                textTransform: "capitalize",
              }}
            >
              {thread.kind}
            </span>
            {thread.isResolved && (
              <span
                className="chip"
                style={{
                  fontSize: 10,
                  padding: "1px 6px",
                  background: "rgba(16,185,129,0.15)",
                  color: "#6ee7b7",
                }}
              >
                Resolved
              </span>
            )}
            {thread.tags?.map((tag) => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize: 10.5,
                  padding: "1px 6px",
                  border: "1px solid var(--line-2)",
                  borderRadius: 4,
                  color: "var(--fg-2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: 26,
              letterSpacing: "-0.01em",
              marginTop: 10,
              color: "var(--fg)",
              fontWeight: 500,
            }}
          >
            {thread.title}
          </h1>
          <div
            className="row"
            style={{
              gap: 10,
              marginTop: 6,
              fontSize: 12,
              color: "var(--fg-3)",
            }}
          >
            <span style={{ color: "var(--fg-1)" }}>
              {thread.author.displayName}
            </span>
            {thread.author.isMidnightStaff && (
              <span className="mono" style={{ color: "var(--fg-2)" }}>
                · Midnight
              </span>
            )}
            <span style={{ color: "var(--fg-4)" }}>·</span>
            <span>{timeAgo(thread._createdAt)}</span>
          </div>
          <div
            style={{
              whiteSpace: "pre-wrap",
              marginTop: 16,
              fontSize: 14.5,
              color: "var(--fg-1)",
              lineHeight: 1.65,
            }}
          >
            {thread.body}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div
          style={{
            fontSize: 12,
            fontFamily: "var(--mono)",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: "var(--fg-3)",
            marginBottom: 10,
          }}
        >
          {thread.replies.length}{" "}
          {thread.replies.length === 1 ? "reply" : "replies"}
        </div>

        {thread.replies.map((r) => (
          <div
            key={r._id}
            className="card"
            style={{
              marginBottom: 12,
              padding: 18,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 16,
              borderColor: r.isOfficial
                ? "rgba(139,92,246,0.55)"
                : undefined,
              boxShadow: r.isOfficial
                ? "0 0 0 1px rgba(139,92,246,0.25) inset"
                : undefined,
            }}
          >
            <UpvoteButton
              targetId={r._id}
              targetType="reply"
              count={r.upvotes ?? 0}
            />
            <div style={{ minWidth: 0 }}>
              <div className="row" style={{ gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--fg-1)", fontWeight: 500 }}>
                  {r.author.displayName}
                </span>
                {r.isOfficial && (
                  <span
                    className="chip"
                    style={{
                      fontSize: 10,
                      padding: "1px 6px",
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
                      color: "#e0e7ff",
                      border: "1px solid rgba(139,92,246,0.55)",
                    }}
                  >
                    ★ Official answer
                  </span>
                )}
                {!r.isOfficial && r.author.isMidnightStaff && (
                  <span className="mono" style={{ color: "var(--fg-2)", fontSize: 11 }}>
                    · Midnight
                  </span>
                )}
                <span style={{ color: "var(--fg-4)" }}>·</span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--fg-3)" }}
                >
                  {timeAgo(r._createdAt)}
                </span>
              </div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: 10,
                  fontSize: 14,
                  color: "var(--fg-1)",
                  lineHeight: 1.6,
                }}
              >
                {r.body}
              </div>
            </div>
          </div>
        ))}

        <ReplyForm
          threadId={thread._id}
          canReply={Boolean(author)}
          isMidnightStaff={staff}
        />
      </div>
    </div>
  );
}
