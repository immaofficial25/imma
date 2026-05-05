"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import ContinueWithGoogleButton from "@/components/ContinueWithGoogleButton";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      resolve(true);
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
  const { status } = useSession();
  const [showFlow, setShowFlow] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

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
        name: "Your Course Platform",
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
              alert("Payment verified and completed successfully!");
              window.location.reload(); // Or redirect to a success page
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
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans">
      <main className="mx-auto w-full max-w-3xl px-6 py-14">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-950">
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-bold">{course.title}</h1>
        {course.subtitle ? (
          <p className="mt-2 text-base text-zinc-600">{course.subtitle}</p>
        ) : null}

        {Array.isArray(course.features) && course.features.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">
              Course details
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {course.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-zinc-400/70" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">
              Course details
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Details will be added soon.
            </p>
          </section>
        )}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{course.price}</span>

            {hasPurchased ? (
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Purchased
                </span>
                <Link
                  href={`/courses/${course.id}/content`}
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Access Course
                </Link>
              </div>
            ) : (
              <button
                onClick={async () => {
                  if (status === "unauthenticated") {
                    signIn("google", { callbackUrl: window.location.href });
                  } else if (status === "authenticated") {
                    setShowFlow(true);
                  } else {
                    const session = await getSession();
                    if (!session) {
                      signIn("google", { callbackUrl: window.location.href });
                    } else {
                      setShowFlow(true);
                    }
                  }
                }}
                className="rounded-xl bg-black px-6 py-3 text-white"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>


        {showFlow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setShowFlow(false)}
                className="absolute right-6 top-6 size-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-950 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-950">
                  Complete Registration
                </h2>
                <p className="mt-2 text-zinc-600">
                  Please provide your details to continue with the purchase.
                </p>
              </div>

              {status === "unauthenticated" && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-zinc-600 font-medium">
                    Sign in to secure your account
                  </p>
                  <ContinueWithGoogleButton />
                </div>
              )}

              {status === "authenticated" && (
                <form onSubmit={handlePayment} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-900 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-zinc-950 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-900 ml-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 9876543210"
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-zinc-950 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-900 ml-1">
                      Referral Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="referralNumber"
                      placeholder="Enter referral code if any"
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-zinc-950 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="mt-4 flex w-full items-center justify-center rounded-2xl bg-black py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800 disabled:bg-zinc-400 active:scale-[0.98]"
                  >
                    {isPaying ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Opening Razorpay...
                      </span>
                    ) : (
                      "Continue to Pay"
                    )}
                  </button>
                </form>
              )}

              {status === "loading" && (
                <div className="flex flex-col items-center py-10">
                  <div className="size-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />
                  <p className="mt-4 text-sm font-medium text-zinc-500">
                    Checking session...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
