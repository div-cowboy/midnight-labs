import Link from "next/link";
import { Icons } from "../_components/icons";
import { getThreads } from "@/app/_lib/sanity/fetch";
import { getWorkspaceSlug } from "@/app/_lib/workspace";
import { timeAgo } from "@/app/_lib/time";
import type { SanityThreadCard } from "@/app/_lib/sanity/types";

export const revalidate = 10;

export default async function CommunityPage() {
  const workspace = await getWorkspaceSlug();

  if (!workspace) {
    return <NoWorkspaceState />;
  }

  const threads = (await getThreads(workspace)) as SanityThreadCard[];

  return (
    <div className="fade-enter">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Community · {workspace}</div>
            <h1 className="page-title">Questions, tips, and what you found.</h1>
            <div className="page-sub">
              Private to your engagement. Your Midnight leads are in here too —
              tag them in if you&apos;re stuck.
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link
              href="/dashboard/community/new"
              className="btn btn-primary"
            >
              <Icons.plus /> New post
            </Link>
          </div>
        </div>
      </div>

      {threads.length === 0 ? (
        <div
          style={{
            marginTop: 24,
            padding: 40,
            border: "1px dashed var(--line-3)",
            borderRadius: 12,
            textAlign: "center",
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          No threads yet. Start the conversation.
        </div>
      ) : (
        <div
          className="card"
          style={{ marginTop: 24, padding: 0, overflow: "hidden" }}
        >
          {threads.map((t, i) => (
            <Link
              key={t._id}
              href={`/dashboard/community/${t._id}`}
              className="thread-row"
              style={{
                display: "grid",
                gridTemplateColumns: "52px 1fr auto",
                gap: 14,
                padding: "14px 18px",
                borderTop:
                  i === 0 ? "none" : "1px solid var(--line)",
                alignItems: "center",
                transition: "background 120ms",
              }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  padding: "6px 0",
                  borderRadius: 8,
                  background: "var(--bg-1)",
                  border: "1px solid var(--line-2)",
                  fontFamily: "var(--mono)",
                }}
              >
                <div style={{ fontSize: 15, color: "var(--fg)" }}>
                  {t.upvotes ?? 0}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "var(--fg-3)",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  up
                </div>
              </div>

              <div style={{ minWidth: 0 }}>
                <div className="row" style={{ gap: 8, alignItems: "center" }}>
                  {t.isPinned && (
                    <span
                      className="chip"
                      style={{ fontSize: 10, padding: "1px 6px" }}
                    >
                      Pinned
                    </span>
                  )}
                  <span
                    className="chip"
                    style={{
                      fontSize: 10,
                      padding: "1px 6px",
                      textTransform: "capitalize",
                    }}
                  >
                    {t.kind}
                  </span>
                  {t.isResolved && (
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
                </div>
                <div
                  style={{
                    fontSize: 14.5,
                    color: "var(--fg)",
                    fontWeight: 500,
                    marginTop: 4,
                  }}
                >
                  {t.title}
                </div>
                <div
                  className="row"
                  style={{
                    gap: 10,
                    marginTop: 4,
                    fontSize: 11.5,
                    color: "var(--fg-3)",
                    flexWrap: "wrap",
                  }}
                >
                  <span>{t.author.displayName}</span>
                  {t.author.isMidnightStaff && (
                    <span className="mono" style={{ color: "var(--fg-2)" }}>
                      · Midnight
                    </span>
                  )}
                  <span style={{ color: "var(--fg-4)" }}>·</span>
                  <span>{timeAgo(t._createdAt)}</span>
                  {t.tags && t.tags.length > 0 && (
                    <>
                      <span style={{ color: "var(--fg-4)" }}>·</span>
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "var(--mono)",
                            color: "var(--fg-2)",
                            fontSize: 10.5,
                            padding: "1px 6px",
                            border: "1px solid var(--line-2)",
                            borderRadius: 4,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--fg-3)",
                }}
              >
                <div
                  style={{ fontSize: 13, color: "var(--fg-1)", fontWeight: 500 }}
                >
                  {t.replyCount}
                </div>
                <div style={{ fontSize: 10, textTransform: "uppercase" }}>
                  {t.replyCount === 1 ? "reply" : "replies"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function NoWorkspaceState() {
  return (
    <div className="fade-enter">
      <div className="page-head">
        <div>
          <div className="page-eyebrow">Community</div>
          <h1 className="page-title">Not scoped to a workspace yet.</h1>
          <div className="page-sub">
            Community is private per engagement. Ask your Midnight lead to bind
            your account to a workspace.
          </div>
        </div>
      </div>
    </div>
  );
}
