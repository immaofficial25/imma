import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10">
        <header className="mb-12 flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Shield className="size-3" /> Privacy & Safety
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg font-medium text-accent">
            For Indian Mind Meld Academy Pvt. Ltd.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-muted leading-relaxed">
            <p>
              We value the privacy and safety of our students, parents, teachers, partners, and website visitors.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, protect, and manage your personal information when you use our educational services, training programs, websites, mobile platforms, and related services.
            </p>
          </div>
        </header>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-sm text-accent">1</span>
              Information We Collect
            </h2>
            <div className="ml-11 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-foreground flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent" /> Student Information
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Student name & DOB</li>
                  <li>Class/grade details</li>
                  <li>Academic performance</li>
                  <li>Attendance records</li>
                  <li>Course enrollment details</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-foreground flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent" /> Parent/Guardian
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Full name & contact</li>
                  <li>Email address</li>
                  <li>Billing/payment info</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </div>
            <div className="ml-11 rounded-2xl border border-border bg-muted/10 p-6">
              <h3 className="mb-4 font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
                Technical Information
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                IP address, Browser type, Device info, Website usage data, and Cookies/analytics data.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-sm text-accent">2</span>
              How We Use Information
            </h2>
            <div className="ml-11">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-muted">
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Admission & Enrollment
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Conducting Classes
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Evaluation & Certification
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Parent Communication
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Fee Management & Billing
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Technical Support
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Safety & Security
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-accent/40" /> Legal Compliance
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Children Privacy */}
          <section className="space-y-4 rounded-3xl bg-accent p-8 text-white shadow-xl shadow-accent/20">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-white/20 text-sm text-white">3</span>
              Children&apos;s Privacy
            </h2>
            <div className="ml-11 space-y-4 text-white/90 leading-relaxed">
              <p className="font-medium text-lg">We are committed to protecting children&apos;s privacy.</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <Shield className="size-5 shrink-0" />
                  <span>We collect student information only with parent/guardian consent.</span>
                </li>
                <li className="flex gap-3">
                  <Shield className="size-5 shrink-0" />
                  <span>We do not knowingly sell or misuse children&apos;s personal data.</span>
                </li>
                <li className="flex gap-3">
                  <Shield className="size-5 shrink-0" />
                  <span>Parents may request correction or deletion of student data where permitted.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Sections 4, 5, 6, 7 */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-xs text-accent">4</span>
                Sharing Information
              </h2>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                We do not sell personal information. Sharing is limited to authorized staff, certification authorities, and payment partners, or when required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-xs text-accent">5</span>
                Data Security
              </h2>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                We implement reasonable security measures against unauthorized access and cyber threats. No digital system is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-xs text-accent">6</span>
                Cookies
              </h2>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                We use cookies to improve experience and understand visitor activity. Users may disable cookies through browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-xs text-accent">7</span>
                Third-Party Services
              </h2>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                Links to platforms like video conferencing or payment gateways are provided. We are not responsible for their privacy practices.
              </p>
            </section>
          </div>

          {/* Section 8 - Photos & Media */}
          <section className="space-y-4 rounded-3xl border border-border bg-surface p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-sm text-white">8</span>
              Photos & Media Usage
            </h2>
            <div className="ml-11 space-y-4">
              <p className="text-muted leading-relaxed">
                With permission, we may use student photographs, classroom videos, and achievement media for:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Website", "Social Media", "Brochures", "Advertisements"].map((item) => (
                  <span key={item} className="rounded-full bg-muted/10 px-4 py-1.5 text-xs font-bold text-muted ring-1 ring-border">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-accent">
                Parents may request exclusion by written notice.
              </p>
            </div>
          </section>

          {/* Section 9, 10, 11 */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-lg bg-accent/10 text-[10px] text-accent">9</span>
                Data Retention
              </h3>
              <p className="ml-9 text-xs text-muted leading-relaxed">
                Records are kept only as long as needed for educational, legal, or administrative purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-lg bg-accent/10 text-[10px] text-accent">10</span>
                User Rights
              </h3>
              <p className="ml-9 text-xs text-muted leading-relaxed">
                Access, correction, deletion, and withdrawal of consent can be requested through official channels.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-lg bg-accent/10 text-[10px] text-accent">11</span>
                Policy Updates
              </h3>
              <p className="ml-9 text-xs text-muted leading-relaxed">
                We may update this policy periodically. Updated versions will be posted on our official platforms.
              </p>
            </section>
          </div>
        </div>

        <footer className="mt-20 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-sm font-bold text-foreground hover:bg-background transition-all">
              Home
            </Link>
            <Link href="/terms" className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-95">
              Terms of Service
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
