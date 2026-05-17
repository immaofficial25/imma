"use client";

import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Target, Lightbulb, Monitor, Users, CheckCircle, ShieldCheck, MessageCircle, Globe, Newspaper, Heart, Map } from "lucide-react";

export default function Home() {
  const courses = getCourses();

  const curriculumFeatures = [
    {
      title: "Spoken English",
      description: "Improve speaking confidence, pronunciation, vocabulary, grammar, and daily communication skills.",
      icon: MessageCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "General Knowledge (GK)",
      description: "Learn important facts about India, the world, science, history, inventions, sports, and more.",
      icon: Globe,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Current Affairs",
      description: "Stay updated with educational, national, and international news and important events.",
      icon: Newspaper,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Soft Skills Development",
      description: "Develop confidence, teamwork, leadership, communication, discipline, and positive personality traits.",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Cyber Security Basics",
      description: "Learn internet safety, password security, cyber awareness, safe online practices, and digital responsibility.",
      icon: ShieldCheck,
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      title: "National Geography",
      description: "Understand India's geography, states, capitals, rivers, mountains, climate, culture, and important locations.",
      icon: Map,
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    },
    {
      title: "Social Responsibility Awareness",
      description: "Encourage respect, kindness, environmental awareness, social values, and responsible citizenship.",
      icon: Heart,
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    }
  ];

  const outcomes = [
    "Better Communication Skills",
    "English Speaking Confidence",
    "Personality Development",
    "Internet Safety Awareness",
    "Teamwork & Leadership",
    "Positive Thinking & Discipline",
    "Knowledge Beyond School Books"
  ];

  const learningModes = [
    "Online Classes",
    "Live Interactive Sessions",
    "Smart Learning Activities",
    "Practical Skill Development"
  ];

  const parentSupport = [
    "Student Progress Updates",
    "Academic Guidance",
    "Counseling Support",
    "Learning Assistance",
    "Parent-Teacher Communication"
  ];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[50%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 py-20 sm:px-10 lg:py-32">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20"
          >
            <GraduationCap className="size-4" />
            Empowering Young Minds
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Welcome to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Indian Mind Meld Academy</span>
            </h1>
            <p className="text-xl font-semibold text-foreground/80 max-w-3xl mx-auto italic">
              "Empowering Young Minds with Smart Education & Future Skills"
            </p>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              At Indian Mind Meld Academy Pvt. Ltd., we are dedicated to building confident, knowledgeable, and skilled students from Class 4 to Class 8 through modern learning methods and value-based education. Our mission is to prepare students not only for academic success but also for real-life challenges through practical skills, personality development, and digital awareness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
          >
            <a
              href="#courses"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95"
            >
              Browse Classes
              <ArrowRight className="ml-2 size-4" />
            </a>
          </motion.div>
        </header>

        {/* Our Courses & Programs Details */}
        <section className="space-y-12 pt-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Courses & Programs</h2>
            <p className="text-muted text-lg">Comprehensive curriculum designed to build essential life skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-surface border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className={`size-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vision, Outcomes, Modes, Support Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Target className="size-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted text-lg leading-relaxed">
                To create a new generation of smart, confident, skilled, and responsible students through modern education and practical knowledge.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="size-8 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">What Students Will Learn</h2>
              </div>
              <ul className="space-y-4">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="size-6 text-green-500 shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-surface border border-border rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="size-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-foreground">Learning Modes We Provide</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningModes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-muted/5 p-4 rounded-2xl border border-border/50">
                    <div className="size-2 rounded-full bg-blue-500" />
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Users className="size-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-foreground">Parent Support</h2>
              </div>
              <p className="text-muted mb-6">We believe parents are important partners in every child's success.</p>
              <div className="space-y-4">
                <div className="font-semibold text-foreground mb-4">Parents receive:</div>
                <ul className="space-y-4">
                  {parentSupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-muted font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="scroll-mt-32 space-y-10 pt-10">
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
