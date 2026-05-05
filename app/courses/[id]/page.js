import { notFound } from "next/navigation";
import { getCourseById, getCourses } from "@/lib/courses";
import CoursePageClient from "./CoursePageClient";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function generateStaticParams() {
  return getCourses().map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const session = await getServerSession();
  let hasPurchased = false;

  if (session?.user?.id) {
    await connectDB();
    const payment = await Payment.findOne({
      userId: session.user.id,
      courseId: id,
      status: "completed",
    });
    if (payment) {
      hasPurchased = true;
    }
  }

  return <CoursePageClient course={course} hasPurchased={hasPurchased} />;
}

