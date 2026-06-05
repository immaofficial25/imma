import { canAccessCourse } from "@/lib/course-access";

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const hasPurchased = await canAccessCourse({
    userId: session?.user?.id,
    courseId: id,
  });

  if (hasPurchased) {
    redirect(`/courses/${id}/content`);
  }

  return <CoursePageClient course={course} hasPurchased={hasPurchased} />;
}

