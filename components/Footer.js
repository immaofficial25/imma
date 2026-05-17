"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

// Brand icons as SVGs since lucide-react removed them in v1.0
const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
    <footer className="relative z-10 border-t border-border bg-sky-100/40 backdrop-blur-md pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/footer_logo.png"
                alt="IMMA Footer Logo"
                width={200}
                height={200}
                className="object-contain drop-shadow-lg"
                style={{ width: '200px', height: 'auto' }}
              />
              {/* <span className="text-xl font-bold tracking-tight text-foreground">
                IMMA <span className="text-primary">Courses</span>
              </span> */}
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-xs break-words">
              Empowering students from Class 4 to 8 with high-quality, structured learning materials and expert guidance for a brighter academic future.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1cYs75PRN7/" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-muted/10 text-muted transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border">
                <FacebookIcon className="size-4" />
              </a>
              <a href="https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg==" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-muted/10 text-muted transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border">
                <InstagramIcon className="size-4" />
              </a>
              <a href="https://www.youtube.com/@imma2025" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-muted/10 text-muted transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border">
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-sm text-muted hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/#courses" className="text-sm text-muted hover:text-primary transition-colors">Courses</Link></li>
                <li><Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/help" className="text-sm text-muted hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/faq" className="text-sm text-muted hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start text-sm text-muted">
                  <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="break-words max-w-full">INDIAN MIND MELD ACADEMY Pvt. Ltd., Haldia, Purba Medinipur, West Bengal - 721654</span>
                </li>
                <li className="flex gap-3 items-center text-sm text-muted">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <span className="break-words max-w-full">imma.academy2025@gmail.com</span>
                </li>
                <li className="flex gap-3 items-center text-sm text-muted">
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+91 89675 76097</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 sm:flex-row">
          <p className="text-xs text-muted/60">
            &copy; {currentYear} IMMA Courses. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted/60 hover:text-primary transition-colors">Terms of Service</Link>
            <div className="h-4 w-px bg-border" />
            <Link
              href="/marketer/login"
              className="text-xs font-bold text-muted hover:text-primary transition-colors"
            >
              Marketer Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
