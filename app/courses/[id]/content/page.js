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

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Live Meet Classes</h2>
          </div>
          <div className="p-6">
            {course.resources.liveClasses && course.resources.liveClasses.length > 0 ? (
              <ul className="space-y-3">
                {course.resources.liveClasses.map((liveClass, idx) => (
                  <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-border bg-background p-5 gap-4 transition-all hover:border-primary/30 hover:shadow-md group">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-foreground">Class {liveClass.class_no}</p>
                      <p className="text-sm text-muted">{liveClass.day} • {liveClass.time}</p>
                    </div>
                    <a
                      href={liveClass.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:scale-105 active:scale-95 shrink-0 text-center justify-center shadow-lg shadow-primary/20"
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
                className="inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Join Class
              </a>
            ) : (
              <p className="text-sm text-muted italic">Meet link will be shared soon.</p>
            )}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Pre-recorded Videos</h2>
          </div>
          <div className="p-6">
            {course.resources.videos.length > 0 ? (
              <ul className="space-y-3">
                {course.resources.videos.map((video) => (
                  <li key={video.url} className="rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 group">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-bold text-foreground">{video.title}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary/10 px-4 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        Watch now
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted italic">Videos will be added soon.</p>
            )}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">PDF Notes</h2>
          </div>
          <div className="p-6">
            {course.resources.pdfs.length > 0 ? (
              <ul className="space-y-3">
                {course.resources.pdfs.map((pdf) => (
                  <li key={pdf.url} className="rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 group">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-bold text-foreground">{pdf.title}</p>
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary/10 px-4 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        Download PDF
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted italic">PDF notes will be added soon.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
