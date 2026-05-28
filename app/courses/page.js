import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

import {
  MessageCircle,
  Globe,
  Newspaper,
  Users,
  ShieldCheck,
  Map,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Courses | Indian Mind Meld Academy",
  description: "Browse available classes at Indian Mind Meld Academy.",
};

export default function CoursesPage() {
  const courses = getCourses();

  const curriculumFeatures = [
    {
      title: "Spoken English",
      description:
        "Improve speaking confidence, pronunciation, vocabulary, grammar, and daily communication skills.",
      icon: MessageCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "General Knowledge (GK)",
      description:
        "Learn important facts about India, the world, science, history, inventions, sports, and more.",
      icon: Globe,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Current Affairs",
      description:
        "Stay updated with educational, national, and international news and important events.",
      icon: Newspaper,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Soft Skills Development",
      description:
        "Develop confidence, teamwork, leadership, communication, discipline, and positive personality traits.",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Cyber Security Basics",
      description:
        "Learn internet safety, password security, cyber awareness, safe online practices, and digital responsibility.",
      icon: ShieldCheck,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "National Geography",
      description:
        "Understand India's geography, states, capitals, rivers, mountains, climate, culture, and important locations.",
      icon: Map,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
    {
      title: "Social Responsibility Awareness",
      description:
        "Encourage respect, kindness, environmental awareness, social values, and responsible citizenship.",
      icon: Heart,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[50%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16 sm:px-10 lg:py-24">

        {/* OUR COURSES & PROGRAMS */}
        <section className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Our Courses & Programs
            </h2>

            <p className="text-muted text-lg">
              Comprehensive curriculum designed to build essential life skills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {curriculumFeatures.map((feature, idx) => {
              const Icon = feature.icon;

              return (
                <div
                  key={idx}
                  className="group rounded-3xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-6 flex size-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* AVAILABLE CLASSES */}
        <section className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Available Classes
            </h1>

            <p className="font-medium text-muted">
              Select your grade to see tailored curriculum
            </p>
          </header>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </section>
        </section>
      </main>
    </div>
  );
}