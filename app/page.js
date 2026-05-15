"use client";

import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function Home() {
  const courses = getCourses();
  
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[50%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 py-20 sm:px-10 lg:py-32">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20"
          >
            <GraduationCap className="size-4" />
            Empowering Future Leaders
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Master Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Expert Courses</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Unlock your potential with our meticulously structured lessons designed for Class 4 to 8 students. Start your journey to academic excellence today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a 
              href="#courses" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95"
            >
              Browse Courses
              <ArrowRight className="ml-2 size-4" />
            </a>
            <div className="text-sm font-medium text-muted">
              Over <span className="text-foreground font-bold">500+</span> active students
            </div>
          </motion.div>
        </header>

        {/* Courses Section */}
        <section id="courses" className="scroll-mt-32 space-y-10">
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Available Classes</h2>
              <p className="text-muted font-medium">Select your grade to see tailored curriculum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
