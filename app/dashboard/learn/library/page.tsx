import { getCourses } from "@/app/_lib/sanity/fetch";
import { getProgressMap } from "@/app/_lib/progress";
import { toUICourse } from "@/app/_lib/sanity/transformers";
import type { SanityCourseCard } from "@/app/_lib/sanity/types";
import { LibraryView } from "./_library-view";

export const revalidate = 60;

export default async function CourseLibraryPage() {
  const [rawCourses, progress] = await Promise.all([
    getCourses() as Promise<SanityCourseCard[]>,
    getProgressMap(),
  ]);
  const courses = rawCourses.map((c) => toUICourse(c, progress));
  return (
    <div className="fade-enter">
      <LibraryView courses={courses} />
    </div>
  );
}
