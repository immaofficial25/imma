import React from "react";
import { 
  Rocket, 
  Target, 
  Users, 
  CheckCircle, 
  BookOpen, 
  Monitor, 
  ShieldCheck, 
  Heart 
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Indian Mind Meld Academy",
  description: "Learn more about Indian Mind Meld Academy Pvt. Ltd. and our mission to empower young minds.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Rocket className="size-4" />
            <span>Empowering Young Minds</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Indian Mind Meld <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Academy Pvt. Ltd.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            A modern online learning platform dedicated to developing students beyond traditional education. 
            We prepare the next generation for real-world challenges through skill-based learning.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="group relative p-8 rounded-3xl bg-surface border border-border hover:border-primary/30 transition-all duration-300">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <Target className="size-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              To build confident, skilled, and responsible individuals through affordable and accessible education. 
              We believe that every child deserves the opportunity to excel, regardless of their location.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-surface border border-border hover:border-accent/30 transition-all duration-300">
            <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              <Users className="size-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted leading-relaxed">
              Developing students beyond traditional textbooks. We focus on practical knowledge, life skills, 
              and personality development to ensure our students are ready for the future.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose IMMA?</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Monitor className="size-6" />, 
                title: "100% Online", 
                desc: "Learn from the comfort of your home with interactive digital classes." 
              },
              { 
                icon: <BookOpen className="size-6" />, 
                title: "Skill-Based", 
                desc: "Focused on developing real-world skills like soft skills and AI learning." 
              },
              { 
                icon: <Heart className="size-6" />, 
                title: "Affordable", 
                desc: "High-quality education made accessible to every family." 
              },
              { 
                icon: <CheckCircle className="size-6" />, 
                title: "Career-Oriented", 
                desc: "Programs designed to build a strong foundation for future careers." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface/50 border border-border hover:bg-surface transition-colors text-center">
                <div className="size-12 rounded-xl bg-muted/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="relative p-12 rounded-[40px] bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10 overflow-hidden text-center mb-32">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Designed for Young Achievers</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Specially curated programs for students from <span className="text-foreground font-bold underline decoration-primary">Class 4 to 8</span>. 
              We bridge the gap between school curriculum and modern life requirements.
            </p>
            <div className="inline-flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="size-4 text-green-400" />
                <span>Cyber Safety Aware</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                <ShieldCheck className="size-4 text-blue-400" />
                <span>Personality Focused</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-surface border-2 border-primary/20 shadow-2xl shadow-primary/5 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-muted mb-8">
            Have questions? Our team is here to help you choose the right program for your child.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Call / WhatsApp</span>
              <a href="tel:+918967576097" className="text-xl font-bold text-primary hover:underline">+91 89675 76097</a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Email Address</span>
              <a href="mailto:imma.official25@gmail.com" className="text-xl font-bold text-accent hover:underline">imma.official25@gmail.com</a>
            </div>
            <div className="hidden lg:block w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Follow Us</span>
              <div className="flex items-center gap-6">
                <a href="https://www.facebook.com/share/1cYs75PRN7/" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg==" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@imma2025" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/#courses" className="inline-block px-8 py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
