import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand-link">
              <span className="brand-icon">IM</span>
              <span className="brand-name">IMMA Courses</span>
            </Link>
            <p className="brand-description">
              Quality education for Class 1 to 6. Empowering the next generation with structured learning and expert guidance.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h3>Platform</h3>
              <ul>
                <li><Link href="/" id="footer-link-home">Home</Link></li>
                <li><Link href="/#courses" id="footer-link-courses">Courses</Link></li>
                <li><Link href="/about" id="footer-link-about">About Us</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Support</h3>
              <ul>
                <li><Link href="/contact" id="footer-link-contact">Contact</Link></li>
                <li><Link href="/help" id="footer-link-help">Help Center</Link></li>
                <li><Link href="/faq" id="footer-link-faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Legal</h3>
              <ul>
                <li><Link href="/privacy" id="footer-link-privacy">Privacy Policy</Link></li>
                <li><Link href="/terms" id="footer-link-terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} IMMA Courses. All rights reserved.
          </p>
          <div className="social-links">
            <Link
              href="/marketer/login"
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              Marketer Login
            </Link>
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
