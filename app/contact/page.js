"use client";

import { Mail, Phone, MapPin } from "lucide-react";

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
  >
    <path d="M19.11 17.24c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.18-1.35-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.64 1.11 2.82.14.18 1.9 2.9 4.61 4.07.64.28 1.14.45 1.53.58.65.2 1.24.17 1.7.1.52-.07 1.6-.65 1.82-1.28.23-.63.23-1.16.16-1.27-.07-.11-.25-.18-.52-.32z" />
    <path d="M16.02 3C8.83 3 3 8.83 3 16c0 2.3.61 4.55 1.77 6.53L3 29l6.65-1.74A12.95 12.95 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3zm0 23.64c-2 0-3.95-.54-5.66-1.57l-.41-.24-3.95 1.03 1.06-3.85-.27-.4A10.62 10.62 0 0 1 5.38 16c0-5.87 4.77-10.64 10.64-10.64 2.84 0 5.5 1.1 7.5 3.12A10.56 10.56 0 0 1 26.64 16c0 5.87-4.76 10.64-10.62 10.64z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "8967576097",
      href: "tel:8967576097",
    },
    {
      icon: <WhatsAppIcon className="w-6 h-6" />,
      title: "WhatsApp",
      details: "8967576097",
      href: "https://wa.me/918967576097",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "imma.academy2025@gmail.com",
      href: "mailto:imma.academy2025@gmail.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details:
        "INDIAN MIND MELD ACADEMY Pvt. Ltd., Haldia, Purba Medinipur, West Bengal - 721654",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help you on your learning journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>

            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.details}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Our Community
              </h2>

              <p className="text-gray-600 mb-8">
                Stay updated with the latest workshops,
                skill-development tips, and academy news.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mb-10">

                <a
                  href="https://www.facebook.com/share/1cYs75PRN7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-12 items-center justify-center rounded-full bg-white shadow-md text-[#1877F2] transition-all duration-300 hover:scale-110 hover:shadow-xl ring-1 ring-gray-200"
                >
                  <FacebookIcon className="size-5" />
                </a>

                <a
                  href="https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-12 items-center justify-center rounded-full bg-white shadow-md text-[#E4405F] transition-all duration-300 hover:scale-110 hover:shadow-xl ring-1 ring-gray-200"
                >
                  <InstagramIcon className="size-5" />
                </a>

                <a
                  href="https://www.youtube.com/@imma2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-12 items-center justify-center rounded-full bg-white shadow-md text-[#FF0000] transition-all duration-300 hover:scale-110 hover:shadow-xl ring-1 ring-gray-200"
                >
                  <YoutubeIcon className="size-5" />
                </a>

              </div>
            </div>

            {/* Student Support */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h3 className="font-bold text-indigo-700 mb-2">
                Student Support
              </h3>

              <p className="text-gray-600 text-sm">
                Are you an enrolled student with technical issues?
                Reach out directly via WhatsApp for faster resolution.
              </p>

              <a
                href="https://wa.me/918967576097"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-semibold text-indigo-600 hover:underline"
              >
                Chat with Support →
              </a>
            </div>
          </div>

        </div>

        {/* Footer Text */}
        <div className="mt-16 pt-10 border-t border-gray-300">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-wide">
              Empowering Young Minds for a Brighter Future
            </h2>

            <p className="mt-3 text-lg md:text-xl font-bold text-black">
              Indian Mind Meld Academy Pvt. Ltd.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}