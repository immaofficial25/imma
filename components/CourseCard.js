import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      aria-label={`Open ${course.title}`}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <article className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-zinc-950">
              {course.title}
            </h2>
            {course.subtitle ? (
              <p className="text-sm text-zinc-600">
                {course.subtitle}
              </p>
            ) : null}
          </div>
          {course.price ? (
            <div className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900">
              {course.price}
            </div>
          ) : null}
        </div>

        {Array.isArray(course.features) && course.features.length > 0 ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-700">
            {course.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-zinc-400/70" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Link>
  );
}
