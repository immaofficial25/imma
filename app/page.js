import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export default function Home() {
  const courses = getCourses();
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-14 sm:px-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Courses</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Class 4 to 8 Courses
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Pick your class and start learning with structured lessons and
            practice.
          </p>
        </header>

        <section id="courses" aria-label="Course list" className="scroll-mt-28">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
