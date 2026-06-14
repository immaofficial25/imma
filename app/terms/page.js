import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10">
        <header className="mb-12 flex flex-col gap-4">
          {/* <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Legal Document
          </div> */}
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg font-medium text-primary">
            For Indian Mind Meld Academy Pvt. Ltd.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-muted leading-relaxed">
            <p>
              These Terms of Service govern the use of educational services provided by Indian Mind Meld Academy Pvt. Ltd.
            </p>
            <p>
              By enrolling in our programs or using our services, students and parents agree to these terms.
            </p>
          </div>
        </header>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">1</span>
              Services Offered
            </h2>
            <div className="ml-11 space-y-3">
              <p className="text-muted leading-relaxed">
                We provide educational and skill-development programs including:
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm font-medium text-foreground/80">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Career support education
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Computer education
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Soft skill training
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Spoken English
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> GK & current affairs
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Cyber safety awareness
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Personality development
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Digital & AI learning programs
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" /> Workshops and seminars
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 & 3 */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">2</span>
                Student Eligibility
              </h2>
              <p className="ml-11 text-muted leading-relaxed">
                Students enrolled may participate with parent/guardian consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">3</span>
                Admission & Enrollment
              </h2>
              <ul className="ml-11 list-disc space-y-2 text-muted marker:text-primary/50">
                <li>Correct information must be provided during registration.</li>
                <li>The academy reserves the right to reject or cancel admission if false information is submitted.</li>
              </ul>
            </section>
          </div>

          {/* Section 4 & 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">4</span>
              Fees & Payments
            </h2>
            <ul className="ml-11 list-disc space-y-2 text-muted marker:text-primary/50">
              <li>Course fees must be paid at a time.</li>
              <li>Fees once paid may be non-refundable unless otherwise stated.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-border bg-surface p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm text-white">5</span>
              Student Conduct
            </h2>
            <div className="ml-11 space-y-4">
              <p className="text-muted leading-relaxed">
                Students are expected to:
              </p>
              <ul className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <li className="rounded-xl border border-border bg-background p-4 flex flex-col gap-1">
                  <span className="font-bold text-foreground">Respect</span>
                  <span className="text-muted">Respect teachers and classmates</span>
                </li>
                <li className="rounded-xl border border-border bg-background p-4 flex flex-col gap-1">
                  <span className="font-bold text-foreground">Discipline</span>
                  <span className="text-muted">Maintain discipline at all times</span>
                </li>
                <li className="rounded-xl border border-border bg-background p-4 flex flex-col gap-1">
                  <span className="font-bold text-foreground">Safety</span>
                  <span className="text-muted">Avoid abusive or harmful behavior</span>
                </li>
                <li className="rounded-xl border border-border bg-background p-4 flex flex-col gap-1">
                  <span className="font-bold text-foreground">Responsibility</span>
                  <span className="text-muted">Use digital platforms responsibly</span>
                </li>
              </ul>
              <p className="text-sm font-medium text-accent">
                Note: The academy may suspend or terminate access for serious misconduct.
              </p>
            </div>
          </section>

          {/* Section 6 & 7 */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">6</span>
                Online Classes
              </h2>
              <ul className="ml-11 list-disc space-y-2 text-muted marker:text-primary/50">
                <li>Students should join classes respectfully.</li>
                <li>Unauthorized recording or sharing of classes is prohibited.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">7</span>
                Intellectual Property
              </h2>
              <div className="ml-11 space-y-3 text-muted leading-relaxed">
                <p>All materials including notes, videos, presentations, and course modules remain the intellectual property of Indian Mind Meld Academy Pvt. Ltd.</p>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">No unauthorized copying or distribution.</p>
              </div>
            </section>
          </div>

          {/* Section 8, 9, 10, 11 */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs text-primary">8</span>
                Certificates
              </h3>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                Issued upon successful completion and attendance compliance.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs text-primary">9</span>
                Liability
              </h3>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                The academy is not liable for internet disruptions, technical failures, or misuse of services.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs text-primary">10</span>
                Termination
              </h3>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                We reserve the right to suspend services for violation of rules, misconduct, or illegal activities.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-xs text-primary">11</span>
                Program Changes
              </h3>
              <p className="ml-10 text-sm text-muted leading-relaxed">
                The academy may modify course structure, timings, faculty, or fees for operational improvement.
              </p>
            </section>
          </div>

          {/* Governing Law */}
          <section className="mt-16 rounded-3xl bg-foreground p-8 text-background">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">12. Governing Law</h2>
                <p className="text-sm opacity-80">Legal jurisdiction and compliance</p>
              </div>
              <div className="h-px w-full bg-background/20 sm:h-12 sm:w-px" />
              <div className="text-sm leading-relaxed opacity-90 sm:max-w-[40%]">
                These terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of Indian courts.
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-20 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-6">
            <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover active:scale-95">
              Return Home
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
