"use client";

import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  X,
  Phone,
  User,
  ShieldCheck,
  ChevronRight,
  Info
} from "lucide-react";

import classLinks from "@/app/courses/data/classLinks";
import ContinueWithGoogleButton from "@/components/ContinueWithGoogleButton";
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      // If script exists but window.Razorpay isn't ready yet
      const interval = setInterval(() => {
        if (window.Razorpay) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        resolve(!!window.Razorpay);
      }, 10000); // 10 seconds timeout
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function parseRupeesAmount(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  const numeric = value.replace(/[^0-9.]/g, "");
  return Number(numeric);
}

export default function CoursePageClient({ course, hasPurchased }) {
  const { data: session, status } = useSession();
  const [showFlow, setShowFlow] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [language, setLanguage] = useState('bengali');
  const [links, setLinks] = useState(classLinks[language] ?? []);

  useEffect(() => {
    setLinks(classLinks[language] ?? []);
  }, [language]);

  useEffect(() => {
    if (showFlow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFlow]);

  if (!course) return null;

  async function handlePayment(e) {
    e.preventDefault();
    if (status !== "authenticated") return;

    const formEl = e.currentTarget;
    if (!(formEl instanceof HTMLFormElement)) {
      alert("Unexpected form submission target");
      return;
    }

    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const referralNumber = String(form.get("referralNumber") ?? "");

    const ok = await loadRazorpayScript();
    if (!ok) {
      alert("Razorpay failed to load");
      return;
    }

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      alert("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID");
      return;
    }

    const amountRupees = parseRupeesAmount(course.price);
    if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
      alert("Invalid course price");
      return;
    }

    setIsPaying(true);
    try {
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountRupees,
          courseId: course.id,
          name: name,
          phone: phone,
          referralNumber: referralNumber,
        }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok) {
        alert(order?.error ?? "Failed to create order");
        return;
      }

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "IMMA Courses",
        description: course.title,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              window.location.reload();
            } else {
              alert(verifyData?.error ?? "Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during payment verification");
          }
        },
        prefill: {
          name,
          contact: phone,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: function () {
            setIsPaying(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setIsPaying(false);
      });
      paymentObject.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert(err instanceof Error ? err.message : "Failed to open payment gateway");
      setIsPaying(false);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background font-sans">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <main className="relative mx-auto w-full max-w-4xl px-6 py-12 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Courses
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="language-select" className="text-sm font-medium text-muted">Language</label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-md border border-border bg-background px-2 py-1 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="bengali">Bengali</option>
                  <option value="odia">Odia</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              {links.length > 0 && (
                <section className="mt-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">Class Links ({language.charAt(0).toUpperCase() + language.slice(1)})</h2>
                  <ul className="list-disc list-inside space-y-1">
                    {links.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-xl text-muted leading-relaxed">
                  {course.subtitle}
                </p>
              )}
            </header>

            <section className="glass rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-2">
                <Info className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  What you&apos;ll learn
                </h2>
              </div>

              {Array.isArray(course.features) && course.features.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex gap-4 items-start text-muted">
                      <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="size-3.5" />
                      </div>
                      <span className="text-base font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted italic">Detailed curriculum coming soon.</p>
              )}
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 overflow-hidden rounded-2xl bg-surface border border-border shadow-premium">
              <div className="p-8 space-y-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-muted uppercase tracking-widest">Price</span>
                  <span className="text-4xl font-black text-foreground">{course.price}</span>
                </div>

                {hasPurchased ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-xl bg-green-500/10 p-4 text-green-600 ring-1 ring-green-500/20">
                      <ShieldCheck className="size-6" />
                      <span className="text-sm font-bold">You own this course</span>
                    </div>
                    <Link
                      href={`/courses/${course.id}/content`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Access Course
                      <ChevronRight className="size-5" />
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFlow(true)}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                    Enroll Now
                    <CreditCard className="size-5" />
                  </button>
                )}

                <div className="pt-6 border-t border-black/5 space-y-4">
                  <p className="text-xs font-medium text-muted/60 text-center">
                    Secure checkout powered by Razorpay
                  </p>
                  <div className="flex justify-center gap-6 opacity-30 grayscale contrast-125">
                    {/* Placeholder for card icons if needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        <AnimatePresence>
          {showFlow && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFlow(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface p-8 shadow-2xl ring-1 ring-black/5"
              >
                <button
                  onClick={() => setShowFlow(false)}
                  className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-black/5 text-muted transition-all hover:bg-black/10 hover:text-foreground"
                >
                  <X className="size-4" />
                </button>

                <div className="mb-8 space-y-2">
                  <h2 className="text-2xl font-black text-foreground">
                    Enroll in Course
                  </h2>
                  <p className="text-muted font-medium">
                    Secure your spot and start learning today.
                  </p>
                </div>

                {(status === "unauthenticated" || status === "loading") ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                      <User className="size-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-foreground">Sign in Required</p>
                      <p className="text-xs text-muted leading-relaxed">
                        To track your progress and access course materials, please sign in with your Google account.
                      </p>
                    </div>
                    <ContinueWithGoogleButton
                      className="!w-full !rounded-xl !py-6"
                      disabled={status === "loading"}
                    />
                  </div>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted ml-1">
                        <User className="size-3" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={status === "authenticated" ? (session?.user?.name || "") : ""}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-border bg-background px-4 py-4 text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted ml-1">
                        <Phone className="size-3" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 9876543210"
                        className="w-full rounded-xl border border-border bg-background px-4 py-4 text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted ml-1">
                        <ShieldCheck className="size-3" />
                        Referral Number (Optional)
                      </label>
                      <input
                        type="text"
                        name="referralNumber"
                        placeholder="Enter code if any"
                        className="w-full rounded-xl border border-border bg-background px-4 py-4 text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPaying}
                      className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isPaying ? (
                        <div className="flex items-center gap-3">
                          <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          Complete Enrollment
                          <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
