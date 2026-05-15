"use client";

import { motion } from "framer-motion";
import { 
  HelpCircle, 
  BookOpen, 
  CreditCard, 
  UserCheck, 
  PlayCircle,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      question: "How do I enroll in a course?",
      answer: "Browse our courses on the home page, select the one you're interested in, and click 'Enroll Now'. You'll need to sign in with your Google account and complete the payment process."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      question: "What are the payment options?",
      answer: "We use Razorpay to process payments securely. You can pay using UPI, Credit/Debit cards, Net Banking, and various digital wallets."
    },
    {
      icon: <PlayCircle className="w-6 h-6 text-primary" />,
      question: "How do I access my course content?",
      answer: "Once your payment is verified, you can find your enrolled courses in your dashboard. Click on 'Start Learning' to access the videos and materials."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      question: "Is there a certificate of completion?",
      answer: "Yes! Students who complete all the course modules and workshops will receive a digital certificate from Indian Mind Meld Academy Pvt. Ltd."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      question: "What is the refund policy?",
      answer: "Fees once paid are generally non-refundable as our courses provide immediate access to digital content. Please refer to our Terms of Service for more details."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our platform.</p>
        </motion.div>

        <div className="space-y-6 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex gap-4 mb-4">
                <div className="p-2 bg-primary/5 rounded-lg h-fit">
                  {faq.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{faq.question}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed ml-12">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary rounded-3xl p-12 text-center text-white shadow-xl shadow-primary/20">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Our support team is available from 10 AM to 6 PM (IST) to assist you with any inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
            <a 
              href="https://wa.me/918967576097" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
