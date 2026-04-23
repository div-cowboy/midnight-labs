"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icons } from "../../../_components/icons";
import { InstructorChip } from "../../../_components/portrait";
import { TWEAKS } from "../../../_components/data";
import { transcript } from "../../../_components/learn-data";
import type { UICourse } from "@/app/_lib/sanity/transformers";

function parseTimestamp(s: string) {
  const [m, sec] = s.split(":").map(Number);
  return (m || 0) * 60 + (sec || 0);
}

type Lesson = UICourse["lessons"][number];

export function CoursePlayer({ course }: { course: UICourse }) {
  const initialLesson = Math.max(
    0,
    course.lessons.findIndex((l) => l.current),
  );
  const [lessonIdx, setLessonIdx] = useState(initialLesson);
  const [tab, setTab] = useState<
    "transcript" | "notes" | "resources" | "discussion"
  >("transcript");
  const [query, setQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const lesson = course.lessons[lessonIdx];

  const filtered = useMemo(
    () =>
      query
        ? transcript.filter((t) =>
            t.text.toLowerCase().includes(query.toLowerCase()),
          )
        : transcript,
    [query],
  );

  const currentTranscriptIdx = useMemo(() => {
    for (let i = transcript.length - 1; i >= 0; i--) {
      if (parseTimestamp(transcript[i].t) <= currentTime) return i;
    }
    return 0;
  }, [currentTime]);

  return (
    <div className="fade-enter">
      <div className="player-breadcrumb">
        <Link href="/dashboard/learn/library">Course library</Link>
        <span className="sep">/</span>
        <Link href="/dashboard/learn/library">{course.track}</Link>
        <span className="sep">/</span>
        <span style={{ color: "var(--fg-1)" }}>{course.title}</span>
      </div>

      <div className="player-lesson-head">
        <div>
          <h1 className="player-lesson-title">{lesson.title}</h1>
          <div className="player-lesson-sub">
            <span>
              Lesson {lessonIdx + 1} of {course.lessons.length}
            </span>
            <span className="sep">·</span>
            <InstructorChip instructor={course.instructor} size={20} />
            <span className="sep">·</span>
            <span
              className="mono"
              style={{ fontSize: 11.5, color: "var(--fg-3)" }}
            >
              {lesson.dur}
            </span>
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button
            className="btn"
            onClick={() => setLessonIdx(Math.max(0, lessonIdx - 1))}
            disabled={lessonIdx === 0}
          >
            ← Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              setLessonIdx(Math.min(course.lessons.length - 1, lessonIdx + 1))
            }
          >
            Next lesson →
          </button>
        </div>
      </div>

      <div className="player-layout" data-size={TWEAKS.playerSize}>
        <div className="player-main">
          <VideoPlayer
            lesson={lesson}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            caption={transcript[currentTranscriptIdx]?.text ?? ""}
            instructorName={course.instructor.name}
          />

          <div className="player-tabs">
            <div className="player-tabs-bar">
              <button
                className="player-tab"
                data-active={tab === "transcript"}
                onClick={() => setTab("transcript")}
              >
                Transcript <span className="count">{transcript.length}</span>
              </button>
              <button
                className="player-tab"
                data-active={tab === "notes"}
                onClick={() => setTab("notes")}
              >
                Notes
              </button>
              <button
                className="player-tab"
                data-active={tab === "resources"}
                onClick={() => setTab("resources")}
              >
                Resources
              </button>
              <button
                className="player-tab"
                data-active={tab === "discussion"}
                onClick={() => setTab("discussion")}
              >
                Discussion <span className="count">0</span>
              </button>
            </div>
            <div className="player-tab-body">
              {tab === "transcript" && (
                <>
                  <div className="transcript-search">
                    <Icons.search />
                    <input
                      placeholder="Search transcript…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <span
                      className="mono"
                      style={{ fontSize: 10.5, color: "var(--fg-3)" }}
                    >
                      {filtered.length} results
                    </span>
                  </div>
                  <div className="transcript-list">
                    {filtered.map((line, i) => {
                      const isCurrent =
                        !query &&
                        transcript.indexOf(line) === currentTranscriptIdx;
                      return (
                        <div
                          key={i}
                          className="transcript-line"
                          data-current={isCurrent ? "true" : "false"}
                          onClick={() => setCurrentTime(parseTimestamp(line.t))}
                        >
                          <span className="t">{line.t}</span>
                          <span>
                            {query ? (
                              <HighlightedText text={line.text} q={query} />
                            ) : (
                              line.text
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {tab === "notes" && (
                <>
                  <textarea
                    className="notes-area"
                    placeholder="Take notes for this lesson. They're private and saved automatically."
                  />
                  <div className="notes-meta">
                    <span>Private to you</span>
                    <span>Saved · just now</span>
                  </div>
                </>
              )}
              {tab === "resources" && (
                <div
                  style={{ padding: 18, color: "var(--fg-3)", fontSize: 13 }}
                >
                  Resources for this lesson will appear here. Ask your Midnight
                  lead to upload the spec template and example repo in Sanity
                  Studio.
                </div>
              )}
              {tab === "discussion" && (
                <div className="discussion-empty">
                  No discussion yet on this lesson.{" "}
                  <Link
                    href="/dashboard/community"
                    style={{
                      color: "var(--fg-1)",
                      borderBottom: "1px dashed var(--line-3)",
                      cursor: "pointer",
                    }}
                  >
                    Start one →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <Playlist
          course={course}
          lessonIdx={lessonIdx}
          setLessonIdx={setLessonIdx}
        />
      </div>
    </div>
  );
}

function VideoPlayer({
  lesson,
  currentTime,
  setCurrentTime,
  caption,
  instructorName,
}: {
  lesson: Lesson;
  currentTime: number;
  setCurrentTime: (n: number) => void;
  caption: string;
  instructorName: string;
}) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(TWEAKS.playbackSpeed);
  const [cc, setCc] = useState<boolean>(TWEAKS.captions);

  const totalSec = useMemo(() => parseTimestamp(lesson.dur), [lesson.dur]) || 1;
  const pct = Math.min(100, (currentTime / totalSec) * 100);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const idx = speeds.indexOf(speed);
    setSpeed(speeds[(idx + 1) % speeds.length]);
  };

  return (
    <div
      className="player-surface"
      data-active={active || playing ? "true" : "false"}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="player-stage">
        <div className="player-frame">
          <div className="player-frame-editor">
            <div className="player-code">
              <div>
                <span className="cm">// {lesson.title}</span>
              </div>
              <div>&nbsp;</div>
              <div className="cm" style={{ whiteSpace: "pre-wrap" }}>
                {lesson.dur} · paste the Sanity videoUrl to swap this placeholder
                for a real player.
              </div>
            </div>
          </div>
          <div className="player-frame-person">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 300"
              preserveAspectRatio="xMidYMid slice"
              style={{ display: "block" }}
            >
              <defs>
                <radialGradient id="bgj" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#2a2a3a" />
                  <stop offset="100%" stopColor="#0a0a12" />
                </radialGradient>
              </defs>
              <rect width="200" height="300" fill="url(#bgj)" />
              <circle cx="100" cy="120" r="42" fill="#1a1a24" />
              <path
                d="M40 300 Q40 200 100 200 Q160 200 160 300 Z"
                fill="#1a1a24"
              />
              <circle
                cx="100"
                cy="118"
                r="38"
                fill="rgba(139,92,246,0.15)"
              />
            </svg>
            <div className="player-frame-person-name">
              <span>{instructorName}</span>
              <span className="player-frame-person-live">REC</span>
            </div>
          </div>
        </div>
      </div>

      {cc && <div className="player-captions">{caption}</div>}

      <div className="player-controls">
        <div
          className="player-scrub"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const p = (e.clientX - rect.left) / rect.width;
            setCurrentTime(Math.max(0, Math.min(totalSec, totalSec * p)));
          }}
        >
          <div
            className="player-scrub-buffered"
            style={{ width: `${Math.min(100, pct + 8)}%` }}
          />
          <div className="player-scrub-filled" style={{ width: `${pct}%` }} />
          <div className="player-scrub-head" style={{ left: `${pct}%` }} />
        </div>
        <div className="player-controls-row">
          <button
            className="player-btn player-btn-big"
            onClick={() => setPlaying((p) => !p)}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="3.5" height="12" />
                <rect x="9.5" y="2" width="3.5" height="12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2L13 8L4 14Z" />
              </svg>
            )}
          </button>
          <div className="player-time">
            {fmtTime(currentTime)}
            <span className="sep">/</span>
            {lesson.dur}
          </div>
          <div className="player-controls-spacer" />
          <button className="player-speed" onClick={cycleSpeed}>
            {speed}×
          </button>
          <button
            className="player-btn player-cc"
            data-on={cc ? "true" : "false"}
            onClick={() => setCc((v) => !v)}
            title="Captions"
          >
            CC
          </button>
        </div>
      </div>
    </div>
  );
}

function Playlist({
  course,
  lessonIdx,
  setLessonIdx,
}: {
  course: UICourse;
  lessonIdx: number;
  setLessonIdx: (n: number) => void;
}) {
  const done = course.lessons.filter((l) => l.done).length;
  return (
    <div className="playlist">
      <div className="playlist-head">
        <div>
          <div className="playlist-course">{course.title}</div>
          <div className="playlist-progress">
            {done} / {course.lessons.length} complete ·{" "}
            {Math.round(course.progress * 100)}%
          </div>
          <div className="playlist-progress-bar">
            <div
              className="playlist-progress-bar-fill"
              style={{ width: `${course.progress * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="playlist-list">
        {course.lessons.map((l, i) => {
          const current = i === lessonIdx;
          return (
            <div
              key={i}
              className="playlist-item"
              data-done={l.done ? "true" : "false"}
              data-current={current ? "true" : "false"}
              onClick={() => setLessonIdx(i)}
            >
              <div className="playlist-item-idx">
                {l.done ? <Icons.check /> : i + 1}
              </div>
              <div className="playlist-item-title">{l.title}</div>
              <div className="playlist-item-dur">{l.dur}</div>
            </div>
          );
        })}
      </div>
      <div className="playlist-foot">
        <span>{course.runtime} total</span>
      </div>
    </div>
  );
}

function HighlightedText({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : p,
      )}
    </>
  );
}
