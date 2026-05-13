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
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-4xl px-6 py-14">
        <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-foreground">{course.title} - Content Access</h1>
        <p className="mt-2 text-base text-muted">
          These links are visible only for students with completed payment.
        </p>

        <section className="mt-8 rounded-md border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Live Meet Classes</h2>
          {course.resources.liveClasses && course.resources.liveClasses.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {course.resources.liveClasses.map((liveClass, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md border border-border bg-background p-4 gap-4 transition-all hover:border-primary hover:shadow-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">Class {liveClass.class_no}</p>
                    <p className="text-sm text-muted">{liveClass.day} • {liveClass.time}</p>
                  </div>
                  <a
                    href={liveClass.meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover shrink-0 text-center justify-center shadow-sm"
                  >
                    Join Class
                  </a>
                </li>
              ))}
            </ul>
          ) : course.resources.meetLink ? (
            <a
              href={course.resources.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
            >
              Join Class
            </a>
          ) : (
            <p className="mt-3 text-sm text-muted">Meet link will be shared soon.</p>
          )}
        </section>

        <section className="mt-6 rounded-md border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Pre-recorded Videos</h2>
          {course.resources.videos.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {course.resources.videos.map((video) => (
                <li key={video.url} className="rounded-md border border-border bg-background p-4 transition-all hover:border-primary">
                  <p className="text-sm font-medium text-foreground">{video.title}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    Watch video →
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">Videos will be added soon.</p>
          )}
        </section>

        <section className="mt-6 rounded-md border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">PDF Notes</h2>
          {course.resources.pdfs.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {course.resources.pdfs.map((pdf) => (
                <li key={pdf.url} className="rounded-md border border-border bg-background p-4 transition-all hover:border-primary">
                  <p className="text-sm font-medium text-foreground">{pdf.title}</p>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    Open PDF →
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">PDF notes will be added soon.</p>
          )}
        </section>
      </main>
    </div>
  );
}
