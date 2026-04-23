import { notFound } from "next/navigation";
import { getCourse, getCourseSlugs } from "@/app/_lib/sanity/fetch";
import { getProgressMap } from "@/app/_lib/progress";
import { toUICourse } from "@/app/_lib/sanity/transformers";
import type { SanityCourseDetail } from "@/app/_lib/sanity/types";
import { CoursePlayer } from "./_course-player";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((s) => ({ courseId: s.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const [rawCourse, progress] = await Promise.all([
    getCourse(courseId) as Promise<SanityCourseDetail | null>,
    getProgressMap(),
  ]);

  if (!rawCourse) notFound();
  if (!rawCourse.lessons || rawCourse.lessons.length === 0) notFound();

  const course = toUICourse(rawCourse, progress);
  return <CoursePlayer course={course} />;
}
