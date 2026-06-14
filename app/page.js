"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Monitor,
  Users,
  CheckCircle,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function Home() {
  const outcomes = [
    "Better Communication Skills",
    "English Speaking Confidence",
    "Personality Development",
    "Internet Safety Awareness",
    "Teamwork & Leadership",
    "Positive Thinking & Discipline",
    "Knowledge Beyond School Books",
  ];

  const whyChoose = [
    "Student-Friendly Learning Environment",
    "Modern & Practical Teaching Methods",
    "Experienced Mentors & Trainers",
    "Online Learning Support",
    "Skill Development Focused Programs",
    "Interactive Activities & Smart Classes",
    "Affordable & Quality Education",
  ];

  const learningModes = [
    "Online Classes",
    "Live Interactive Sessions",
    "Smart Learning Activities",
    "Practical Skill Development",
  ];

  const parentSupport = [
    "Student Progress Updates",
    "Academic Guidance",
    "Counseling Support",
    "Learning Assistance",
    "Parent-Teacher Communication",
  ];

  const baseMarqueeItems = [
    { icon: GraduationCap, title: "Smart Learning", desc: "Better Understanding" },
    { icon: BookOpen, title: "Strong Foundation", desc: "Bright Future" },
    { icon: ShieldCheck, title: "Safe & Supportive", desc: "Environment" },
    { icon: TrendingUp, title: "Activity Based", desc: "Practical Learning" },
    { icon: Trophy, title: "Empowering Young Minds", desc: "For A Better Tomorrow" },
  ];
  // Duplicate items enough times so one set is wider than an ultra-wide screen
  const marqueeItems = [...baseMarqueeItems, ...baseMarqueeItems, ...baseMarqueeItems];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 sm:px-10 lg:py-24">

        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Indian Mind Meld Academy Pvt. Ltd.
              </span>
            </h1>

            <p className="mt-6 text-xl font-semibold italic text-foreground/80 sm:text-2xl">
              “Empowering Young Minds with Smart Education & Future Skills”
            </p>

            <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/hero_image.png"
                alt="IMMA Hero Image"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="mt-10">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                Browse Courses
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* MARQUEE SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-[#002D72] py-4 sm:py-6 shadow-lg">
          <div className="absolute left-0 top-0 z-10 h-full w-8 sm:w-24 bg-gradient-to-r from-[#002D72] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-10 h-full w-8 sm:w-24 bg-gradient-to-l from-[#002D72] to-transparent pointer-events-none" />
          
          <div className="marquee-container">
            {/* First Set */}
            <div className="flex w-max shrink-0 items-center gap-8 px-4 sm:gap-16 sm:px-8">
              {marqueeItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex shrink-0 items-center gap-3 text-white">
                    <Icon size={40} />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Duplicate Set for Infinite Loop */}
            <div className="flex w-max shrink-0 items-center gap-8 px-4 sm:gap-16 sm:px-8">
              {marqueeItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex shrink-0 items-center gap-3 text-white">
                    <Icon size={40} />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHAT STUDENTS WILL LEARN */}
        <section className="rounded-3xl border border-border bg-surface p-8 shadow-sm lg:p-10">
          <div className="mb-8 flex items-center gap-3">
            <Lightbulb className="size-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-foreground">
              What Students Will Learn
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {outcomes.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/5 p-4"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-sm lg:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              🌟 Why Choose Indian Mind Meld Academy?
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-background/70 p-4"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* LEARNING MODES + PARENT SUPPORT */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Learning Modes */}
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm lg:p-10">
            <div className="mb-6 flex items-center gap-3">
              <Monitor className="size-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Learning Modes We Provide
              </h2>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {learningModes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/5 p-4"
                >
                  <div className="size-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Parent Support */}
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm lg:p-10">
            <div className="mb-6 flex items-center gap-3">
              <Users className="size-8 text-orange-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Parent Support
              </h2>
            </div>

            <p className="mb-6 text-muted">
              We believe parents are important partners in every child&apos;s
              success.
            </p>

            <ul className="space-y-4">
              {parentSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-orange-500" />
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* COURSE PAGE BUTTON */}
        <section className="flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
          >
            Go To Course Page
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </section>

      </main>
    </div>
  );
}