import Link from "next/link";
import { Icons } from "./_components/icons";
import { Portrait } from "./_components/portrait";
import { CourseCard } from "./_components/course-card";
import { ArticleCard } from "./_components/article-card";
import { getEngagement } from "@/app/_lib/sanity/fetch";
import type { SanityEngagement } from "@/app/_lib/sanity/types";
import { toInstructor, toUIArticle, toUICourse } from "@/app/_lib/sanity/transformers";

export const revalidate = 60;

function dateRange(start: string, end: string): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} → ${fmt(end)}`;
}

function totalDays(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
}

export default async function EngagementHomePage() {
  const engagement = (await getEngagement()) as SanityEngagement | null;
  if (!engagement) {
    return <EmptyState />;
  }

  const days = totalDays(engagement.startDate, engagement.endDate);
  const currentDay = Math.max(1, Math.min(days, engagement.currentDay ?? 1));
  const progressPct = (currentDay / days) * 100;

  const pillars = engagement.pillars ?? [];
  const pinnedCourses = (engagement.pinnedCourses ?? []).map((c) => toUICourse(c));
  const pinnedArticles = (engagement.pinnedArticles ?? []).map(toUIArticle);
  const lead = engagement.lead ? toInstructor(engagement.lead) : null;
  const bench = (engagement.bench ?? []).map((m) => ({
    member: m,
    instructor: toInstructor(m),
  }));

  return (
    <div className="fade-enter">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Engagement · {engagement.client}</div>
            <h1 className="page-title">
              {engagement.headline ??
                `Day ${currentDay} of ${days}. Here's where we are.`}
            </h1>
            <div className="page-sub">
              {dateRange(engagement.startDate, engagement.endDate)}
              {engagement.slackChannel ? ` · ${engagement.slackChannel}` : ""}
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link href="/dashboard/learn/library" className="btn">
              <Icons.library /> Browse library
            </Link>
            <Link
              href="/dashboard/community"
              className="btn btn-primary"
            >
              <Icons.community /> Ask the team
            </Link>
          </div>
        </div>
      </div>

      <div className="card timeline-card">
        <div className="timeline-head">
          <div>
            <div className="card-title">The Midnight Protocol</div>
            <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 4 }}>
              Audit → Tooling → Practice → Scale · your engagement&apos;s current
              shape
            </div>
          </div>
          <div
            className="row"
            style={{
              gap: 16,
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--fg-3)",
            }}
          >
            <span>
              Day {currentDay} / {days}
            </span>
          </div>
        </div>
        <div className="timeline-wrap">
          <div className="timeline-track">
            <div className="timeline-rail" />
            <div
              className="timeline-rail-done"
              style={{ width: `${progressPct}%` }}
            />
            <div
              className="timeline-today"
              style={{ left: `${progressPct}%` }}
            >
              <div className="timeline-today-label">
                TODAY · DAY {currentDay}
              </div>
            </div>
          </div>
        </div>

        <div className="phase-list" style={{ marginTop: 16 }}>
          {pillars.length === 0 && (
            <div
              style={{
                padding: 24,
                color: "var(--fg-3)",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              No pillars have been set for this engagement yet.{" "}
              <Link href="/studio" style={{ color: "var(--fg-1)" }}>
                Open Studio
              </Link>{" "}
              to scope them.
            </div>
          )}
          {pillars.map((p, i) => {
            const deliverables = p.deliverables ?? [];
            const done = deliverables.filter((d) => d.done).length;
            const total = deliverables.length || 1;
            const pct = (done / total) * 100;
            return (
              <div
                key={p._key}
                className="phase"
                data-state={p.status}
                data-expanded="false"
              >
                <div className="phase-head" style={{ cursor: "default" }}>
                  <div className="phase-num">
                    {p.status === "done" ? <Icons.check /> : i + 1}
                  </div>
                  <div className="phase-meta">
                    <div className="phase-name">{p.name}</div>
                    <div className="phase-dates">
                      {p.summary ??
                        (p.status === "done"
                          ? "Complete"
                          : p.status === "active"
                            ? "In progress"
                            : "Upcoming")}
                    </div>
                  </div>
                  <div className="phase-right">
                    <div>
                      <div className="phase-progress">
                        {done} / {deliverables.length}
                      </div>
                      <div className="phase-progress-bar">
                        <div
                          className="phase-progress-bar-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {(lead || bench.length > 0) && (
        <div className="card" style={{ marginTop: 18 }}>
          <div
            className="card-head"
            style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}
          >
            <div>
              <div className="card-title">On your engagement</div>
              <div
                style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 4 }}
              >
                One engagement lead plus the bench, calibrated to your scope.
              </div>
            </div>
          </div>
          <div
            style={{
              padding: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {lead && engagement.lead && (
              <TeamCard instructor={lead} member={engagement.lead} isLead />
            )}
            {bench.map(({ member, instructor }) => (
              <TeamCard
                key={member._id}
                instructor={instructor}
                member={member}
              />
            ))}
          </div>
        </div>
      )}

      {pinnedCourses.length > 0 && (
        <section className="course-section">
          <div className="course-section-head">
            <div>
              <div className="course-section-title">Pinned for this engagement</div>
              <div className="course-section-sub">
                Your Midnight lead has queued these up for the team.
              </div>
            </div>
            <Link
              href="/dashboard/learn/library"
              className="mono"
              style={{
                color: "var(--fg-2)",
                fontSize: 12,
                borderBottom: "1px dashed var(--line-3)",
              }}
            >
              Browse all →
            </Link>
          </div>
          <div className="course-grid">
            {pinnedCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </section>
      )}

      {pinnedArticles.length > 0 && (
        <section className="course-section">
          <div className="course-section-head">
            <div>
              <div className="course-section-title">Reading list</div>
              <div className="course-section-sub">
                Short reads worth your morning coffee.
              </div>
            </div>
            <Link
              href="/dashboard/learn/articles"
              className="mono"
              style={{
                color: "var(--fg-2)",
                fontSize: 12,
                borderBottom: "1px dashed var(--line-3)",
              }}
            >
              All articles →
            </Link>
          </div>
          <div className="course-grid">
            {pinnedArticles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TeamCard({
  instructor,
  member,
  isLead,
}: {
  instructor: ReturnType<typeof toInstructor>;
  member: SanityEngagement["lead"];
  isLead?: boolean;
}) {
  if (!member) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px",
        borderRadius: 10,
        background: "var(--bg-1)",
        border: "1px solid var(--line)",
      }}
    >
      <Portrait instructor={instructor} size={44} />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 10.5,
            fontFamily: "var(--mono)",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: isLead ? "var(--fg-1)" : "var(--fg-3)",
          }}
        >
          {isLead ? "Lead" : member.tier === "bench" ? "Bench" : member.role ?? "Team"}
        </div>
        <div style={{ fontSize: 13, color: "var(--fg)", fontWeight: 500, marginTop: 2 }}>
          {member.name}
        </div>
        {member.role && (
          <div style={{ fontSize: 11.5, color: "var(--fg-3)", marginTop: 2 }}>
            {member.role}
          </div>
        )}
        {member.logos && member.logos.length > 0 && (
          <div
            className="row"
            style={{
              gap: 6,
              marginTop: 6,
              flexWrap: "wrap",
              fontSize: 10,
              fontFamily: "var(--mono)",
              color: "var(--fg-3)",
            }}
          >
            {member.logos.map((logo) => (
              <span
                key={logo}
                style={{
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid var(--line-2)",
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="fade-enter">
      <div className="page-head">
        <div>
          <div className="page-eyebrow">Engagement</div>
          <h1 className="page-title">Nothing to show here yet.</h1>
          <div className="page-sub">
            Your Midnight lead will scope your engagement in Sanity Studio.
            Once they do, this page populates automatically.
          </div>
        </div>
      </div>
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
        <Link
          href="/studio"
          style={{ color: "var(--fg-1)", borderBottom: "1px dashed var(--line-3)" }}
        >
          Open Sanity Studio →
        </Link>
      </div>
    </div>
  );
}
