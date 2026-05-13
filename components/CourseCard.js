import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      aria-label={`Open ${course.title}`}
      className="block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="group h-full rounded-md border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-foreground">
              {course.title}
            </h2>
            {course.subtitle ? (
              <p className="text-sm text-muted">
                {course.subtitle}
              </p>
            ) : null}
          </div>
          {course.price ? (
            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {course.price}
            </div>
          ) : null}
        </div>

        {Array.isArray(course.features) && course.features.length > 0 ? (
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {course.features.map((feature) => (
              <li key={feature} className="flex gap-2 items-center">
                <span className="shrink-0 rounded-full bg-primary/60 w-1.5 h-1.5" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Link>
  );
}
