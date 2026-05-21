import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export const metadata = {
  title: "Courses | Indian Mind Meld Academy",
  description: "Browse available classes at Indian Mind Meld Academy.",
};

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[50%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-16 sm:px-10 lg:py-24">
        <header className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Available Classes
          </h1>
          <p className="text-muted font-medium">
            Select your grade to see tailored curriculum
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </div>
  );
}

