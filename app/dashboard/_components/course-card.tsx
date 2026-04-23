import Link from "next/link";
import { InstructorChip } from "./portrait";
import { ProgressRing } from "./progress-ring";
import { trackPalette } from "./learn-data";
import type { UICourse } from "@/app/_lib/sanity/transformers";

function CourseThumb({ course }: { course: UICourse }) {
  const [c1, c2] = trackPalette[course.track] ?? ["#1e1e28", "#2e2e3a"];
  const initial =
    course.title
      .split(" ")
      .find((w) => w.length > 2)?.[0]
      ?.toUpperCase() || course.title[0];

  return (
    <div
      className="course-thumb"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <div className="course-thumb-dots" />
      <div className="course-thumb-glyph">{initial}</div>
      <ProgressRing progress={course.progress} />
    </div>
  );
}

export function CourseCard({ course }: { course: UICourse }) {
  return (
    <Link href={`/dashboard/learn/library/${course.slug}`} className="course-card">
      <CourseThumb course={course} />
      <div className="course-card-body">
        <div className="course-card-track">{course.track}</div>
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-tagline">{course.tagline}</div>
      </div>
      <div className="course-card-foot">
        <InstructorChip instructor={course.instructor} />
        <div className="course-card-meta-right">
          <span>{course.lessonCount} lessons</span>
          <span style={{ color: "var(--fg-4)" }}>·</span>
          <span>{course.runtime}</span>
        </div>
      </div>
    </Link>
  );
}
