"use client";

import { HelpCircle, BookOpen, CreditCard, UserCheck, PlayCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      icon: "enroll",
      question: "How do I enroll in a course?",
      answer: "Browse our courses on the home page, select the one you're interested in, and click 'Enroll Now'. You'll need to sign in with your Google account and complete the payment process."
    },
    {
      icon: "payment",
      question: "What are the payment options?",
      answer: "We use Razorpay to process payments securely. You can pay using UPI, Credit/Debit cards, Net Banking, and various digital wallets."
    },
    {
      icon: "access",
      question: "How do I access my course content?",
      answer: "Once your payment is verified, you can find your enrolled courses in your dashboard. Click on 'Start Learning' to access the videos and materials."
    },
    {
      icon: "certificate",
      question: "Is there a certificate of completion?",
      answer: "Yes! Students who complete all the course modules and workshops will receive a digital certificate from Indian Mind Meld Academy Pvt. Ltd."
    },
    {
      icon: "refund",
      question: "What is the refund policy?",
      answer: "Fees once paid are generally non-refundable as our courses provide immediate access to digital content. Please refer to our Terms of Service for more details."
    }
  ];

  function renderIcon(icon) {
    const cls = "w-6 h-6";
    if (icon === "enroll") return <UserCheck className={cls} />;
    if (icon === "payment") return <CreditCard className={cls} />;
    if (icon === "access") return <PlayCircle className={cls} />;
    if (icon === "certificate") return <BookOpen className={cls} />;
    if (icon === "refund") return <ShieldAlert className={cls} />;
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: "#fafafa" }}>
      <div className="container mx-auto px-4" style={{ maxWidth: "900px" }}>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "rgba(var(--color-primary-rgb,79,70,229),0.1)" }}>
            <HelpCircle className="w-8 h-8" style={{ color: "var(--color-primary, #4f46e5)" }} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help &amp; Support</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our platform.</p>
        </div>

        {/* FAQ Cards */}
        <div className="mb-16" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex gap-4 mb-4">
                <div className="p-2 rounded-lg" style={{ background: "rgba(var(--color-primary-rgb,79,70,229),0.05)", color: "var(--color-primary, #4f46e5)", flexShrink: 0, height: "fit-content" }}>
                  {renderIcon(faq.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{faq.question}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed ml-12">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="p-12 text-center text-white rounded-3xl"
          style={{ background: "var(--color-primary, #4f46e5)", boxShadow: "0 20px 60px rgba(79,70,229,0.25)" }}
        >
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-8 opacity-80 mx-auto" style={{ maxWidth: "28rem" }}>
            Our support team is available from 10 AM to 6 PM (IST) to assist you with any inquiries.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <Link
              href="/contact"
              className="px-8 py-3 font-bold rounded-xl transition-colors"
              style={{ background: "#fff", color: "var(--color-primary, #4f46e5)" }}
            >
              Contact Support
            </Link>
            <a
              href="https://wa.me/918967576097"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-bold rounded-xl transition-colors"
              style={{ background: "#22c55e", color: "#fff", textDecoration: "none" }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
