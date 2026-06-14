"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

// Brand icons as SVGs since lucide-react removed them in v1.0
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
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/20 bg-sky-900 text-slate-200 pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 inline-block">
              <div className="bg-white p-2 rounded-xl shadow-md inline-flex">
                <Image
                  src="/footer_logo.png"
                  alt="IMMA Footer Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            </Link>

            <p className="max-w-xs break-words text-sm leading-relaxed text-slate-200">
              Empowering students from Class 4 to 8 with high-quality,
              structured learning materials and expert guidance for a brighter
              academic future.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1cYs75PRN7/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#1877F2] ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-[#1877F2]/10 hover:ring-[#1877F2]/50"
              >
                <FacebookIcon className="size-4" />
              </a>

              <a
                href="https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#E4405F] ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-[#E4405F]/10 hover:ring-[#E4405F]/50"
              >
                <InstagramIcon className="size-4" />
              </a>

              <a
                href="https://www.youtube.com/@imma2025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#FF0000] ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-[#FF0000]/10 hover:ring-[#FF0000]/50"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-3">
            {/* Platform */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Platform
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/courses"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    Courses
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Support
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    href="/help"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sky-300" />
                  <span className="break-words">
                    INDIAN MIND MELD ACADEMY Pvt. Ltd., Haldia, Purba Medinipur,
                    West Bengal - 721654
                  </span>
                </li>

                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Mail className="size-4 shrink-0 text-sky-300" />
                  <span className="break-words">
                    imma.academy2025@gmail.com
                  </span>
                </li>

                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Phone className="size-4 shrink-0 text-sky-300" />
                  <span>+91 89675 76097</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-10 sm:flex-row">
          <p className="text-xs text-slate-300">
            &copy; {currentYear} IMMA Courses. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm font-semibold text-white transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm font-semibold text-white transition-colors hover:text-slate-300"
            >
              Terms of Service
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link
              href="/marketer/login"
              className="rounded-full bg-sky-500 px-4 py-2 text-xs font-bold text-white transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-lg"
            >
              Marketer Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}