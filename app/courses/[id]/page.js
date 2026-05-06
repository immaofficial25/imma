import { notFound } from "next/navigation";
import { getCourseById, getCourses } from "@/lib/courses";
import CoursePageClient from "./CoursePageClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { hasCompletedCoursePayment } from "@/lib/course-access";

export async function generateStaticParams() {
  return getCourses().map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const hasPurchased = await hasCompletedCoursePayment({
    userId: session?.user?.id,
    courseId: id,
  });

  return <CoursePageClient course={course} hasPurchased={hasPurchased} />;
}

