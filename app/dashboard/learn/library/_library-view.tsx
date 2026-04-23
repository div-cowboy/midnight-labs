"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icons } from "../../_components/icons";
import { CourseCard } from "../../_components/course-card";
import { trackPalette } from "../../_components/learn-data";
import type { UICourse } from "@/app/_lib/sanity/transformers";

function trackDesc(track: string): string {
  const map: Record<string, string> = {
    Foundations: "The mental model. Start here if you're new.",
    "Claude Code": "Day-to-day work in Claude Code.",
    "Custom Agents": "Designing, shipping, and maintaining your own agents.",
    MCP: "Connecting Claude to the systems your company already runs.",
    "Advanced Patterns": "What we've learned deploying this at scale.",
  };
  return map[track] || "";
}

export function LibraryView({ courses }: { courses: UICourse[] }) {
  const trackList = useMemo(() => {
    const names = Array.from(new Set(courses.map((c) => c.track))).sort();
    return ["All", ...names];
  }, [courses]);

  const [active, setActive] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const shown = useMemo(
    () => (active === "All" ? courses : courses.filter((c) => c.track === active)),
    [active, courses],
  );

  const byTrack = useMemo(() => {
    const map: Record<string, UICourse[]> = {};
    for (const c of shown) {
      (map[c.track] ||= []).push(c);
    }
    return map;
  }, [shown]);

  const continueWatching = useMemo(
    () => courses.filter((c) => c.progress > 0 && c.progress < 1).slice(0, 4),
    [courses],
  );

  return (
    <>
      <div className="page-head learn-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Course library</div>
            <h1 className="page-title">Working knowledge, end to end.</h1>
            <div className="page-sub">
              Watch in order, or skip to what you need. New lessons ship during your engagement.
            </div>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <div className="view-toggle">
              <button data-active={view === "grid"} onClick={() => setView("grid")}>
                <Icons.overview /> Grid
              </button>
              <button data-active={view === "list"} onClick={() => setView("list")}>
                ≡ List
              </button>
            </div>
          </div>
        </div>
      </div>

      {continueWatching.length > 0 && (
        <div className="continue-row">
          <div className="continue-head">
            <div>
              <div className="continue-title">Continue watching</div>
              <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 2 }}>
                {continueWatching.length} lessons in progress
              </div>
            </div>
          </div>
          <div className="continue-cards">
            {continueWatching.map((c) => {
              const [c1, c2] =
                trackPalette[c.track] ?? ["#1e1e28", "#2e2e3a"];
              const current =
                c.lessons.find((l) => l.current) ?? c.lessons[0];
              return (
                <Link
                  key={c._id}
                  href={`/dashboard/learn/library/${c.slug}`}
                  className="continue-card"
                >
                  <div
                    className="continue-thumb"
                    style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                  >
                    <div className="continue-card-play">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 5L19 12L7 19Z" />
                      </svg>
                    </div>
                    <div className="continue-thumb-progress">
                      <div
                        className="continue-thumb-progress-fill"
                        style={{ width: `${c.progress * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="continue-card-meta">
                    <div className="continue-card-course">{c.title}</div>
                    <div className="continue-card-lesson">{current?.title}</div>
                    <div className="continue-card-sub">
                      {current?.dur} · {Math.round(c.progress * 100)}% through course
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="track-nav">
        {trackList.map((t) => (
          <button
            key={t}
            data-active={active === t}
            onClick={() => setActive(t)}
          >
            {t}
            <span className="count">
              {t === "All"
                ? courses.length
                : courses.filter((c) => c.track === t).length}
            </span>
          </button>
        ))}
      </div>

      {Object.entries(byTrack).map(([track, cs]) => (
        <div className="course-section" key={track}>
          {active === "All" && (
            <div className="course-section-head">
              <div>
                <div className="course-section-title">{track}</div>
                <div className="course-section-sub">{trackDesc(track)}</div>
              </div>
              <span className="mono muted" style={{ fontSize: 11 }}>
                {cs.length} courses
              </span>
            </div>
          )}
          <div className="course-grid" data-view={view}>
            {cs.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </div>
      ))}

      {courses.length === 0 && (
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
          No courses yet. Add one in{" "}
          <Link href="/studio" style={{ color: "var(--fg-1)" }}>
            Sanity Studio
          </Link>
          .
        </div>
      )}
    </>
  );
}
