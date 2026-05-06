import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCourseById } from "@/lib/courses";
import { hasCompletedCoursePayment } from "@/lib/course-access";

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

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans">
      <main className="mx-auto w-full max-w-4xl px-6 py-14">
        <Link href={`/courses/${id}`} className="text-sm text-zinc-600 hover:text-zinc-950">
          ← Back to course
        </Link>

        <h1 className="mt-6 text-3xl font-bold">{course.title} - Content Access</h1>
        <p className="mt-2 text-base text-zinc-600">
          These links are visible only for students with completed payment.
        </p>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">Live Meet Class</h2>
          {course.resources.meetLink ? (
            <a
              href={course.resources.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-black px-5 py-3 text-white hover:bg-zinc-800"
            >
              Join Live Class
            </a>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">Meet link will be shared soon.</p>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">Pre-recorded Videos</h2>
          {course.resources.videos.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {course.resources.videos.map((video) => (
                <li key={video.url} className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-sm font-medium text-zinc-900">{video.title}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm text-blue-700 underline underline-offset-4"
                  >
                    Watch video
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">Videos will be added soon.</p>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">PDF Notes</h2>
          {course.resources.pdfs.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {course.resources.pdfs.map((pdf) => (
                <li key={pdf.url} className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-sm font-medium text-zinc-900">{pdf.title}</p>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm text-blue-700 underline underline-offset-4"
                  >
                    Open PDF
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">PDF notes will be added soon.</p>
          )}
        </section>
      </main>
    </div>
  );
}
