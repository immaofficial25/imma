"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/courses/${course.id}`}
        aria-label={`Open ${course.title}`}
        className="block group outline-none"
      >
        <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          {/* Decorative background glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          
          <div className="relative flex flex-col h-full gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h2>
                </div>
                {course.subtitle && (
                  <p className="text-sm leading-relaxed text-muted font-medium">
                    {course.subtitle}
                  </p>
                )}
              </div>
              {course.price && (
                <div className="shrink-0 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary ring-1 ring-primary/20">
                  {course.price}
                </div>
              )}
            </div>

            {Array.isArray(course.features) && course.features.length > 0 && (
              <ul className="mt-2 space-y-3">
                {course.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-center text-sm text-muted/90 font-medium">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <ChevronRight className="size-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto pt-6">
              <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Explore Course
                <ChevronRight className="size-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
