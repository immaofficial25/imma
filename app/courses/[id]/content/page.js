import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCourseById, getCourseContentByLanguage } from "@/lib/courses";
import { hasCompletedCoursePayment } from "@/lib/course-access";
import CourseContentClient from "./CourseContentClient";
export default async function CourseContentPage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/courses/${id}`);
  }

  const hasPurchased = await hasCompletedCoursePayment({
    userId: session.user.id,
    courseId: id,
  });

  if (!hasPurchased) {
    redirect(`/courses/${id}`);
  }

  const languageResources = getCourseContentByLanguage(id);

  return <CourseContentClient course={course} languageResources={languageResources} />;
}
