import React from "react";
import { HelpCircle, MessageCircle, BookOpen, GraduationCap, Monitor, Target } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "FAQ | Indian Mind Meld Academy",
  description: "Frequently Asked Questions about IMMA courses, enrollment, certificates, and more.",
};

const faqs = [
  {
    question: "How can I enroll in this course?",
    answer: "You can easily enroll by contacting our admission team through WhatsApp or phone call. You can also visit our Courses page, select your preferred class or course, and complete the direct enrollment process online.",
    icon: <MessageCircle className="size-6" />,
  },
  {
    question: "What is the duration of the courses?",
    answer: "Most of our courses are designed with a duration of 1 year.",
    icon: <Target className="size-6" />,
  },
  {
    question: "Do you provide a certificate after course completion?",
    answer: "Yes, we provide a professional Course Completion Certificate after successfully completing the training program, assignments, and evaluations.",
    icon: <GraduationCap className="size-6" />,
  },
  {
    question: "Do you provide study materials?",
    answer: "Yes, students receive class notes and learning materials during live classes. Additionally, students can purchase our books and extra study resources for better learning support.",
    icon: <BookOpen className="size-6" />,
  },
  {
    question: "Do you provide computer courses?",
    answer: "Yes, we offer Computer Courses in both online and offline modes at affordable fees, suitable for beginners as well as advanced learners.",
    icon: <Monitor className="size-6" />,
  },
  {
    question: "Do you provide Digital Marketing and AI courses?",
    answer: (
      <>
        Yes, we provide industry-oriented Digital Marketing and Artificial Intelligence (AI) courses for both beginners and professionals. Our training includes:
        <ul className="mt-4 space-y-2 list-disc list-inside text-muted/90 font-medium">
          <li>Digital Marketing</li>
          <li>Modern AI & ChatGPT tools</li>
          <li>Social Media Marketing</li>
          <li>SEO (Search Engine Optimization)</li>
          <li>Canva Design & Ai Video Creation</li>
          <li>Affiliate Marketing</li>
          <li>Live projects and with earning process</li>
          <li>& Many More....</li>
        </ul>
        <p className="mt-4">
          These courses are designed to help students build future-ready digital skills and career opportunities.
        </p>
      </>
    ),
    icon: <HelpCircle className="size-6" />,
  },
];

export default function FaqPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <HelpCircle className="size-4" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our courses, enrollment process, study materials, and more.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-6 mb-24">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-surface border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="size-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {faq.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </h2>
                  <div className="text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25"
            >
              Contact Us
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 rounded-full bg-surface border-2 border-border text-foreground font-bold hover:bg-muted/10 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
