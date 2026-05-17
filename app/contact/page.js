"use client";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactPage() {
  const contactInfo = [
    {
      icon: "phone",
      title: "Call Us",
      details: "8967576097",
      href: "tel:8967576097"
    },
    {
      icon: "whatsapp",
      title: "WhatsApp",
      details: "8967576097",
      href: "https://wa.me/918967576097"
    },
    {
      icon: "mail",
      title: "Email Us",
      details: "imma.academy2025@gmail.com",
      href: "mailto:imma.academy2025@gmail.com"
    },
    {
      icon: "location",
      title: "Visit Us",
      details: "INDIAN MIND MELD ACADEMY Pvt. Ltd., Haldia, Purba Medinipur, West Bengal - 721654",
      href: "https://www.google.com/maps/place/INDIAN+MIND+MELD+ACADEMY+Pvt.+Ltd./@22.0797412,88.1334886,19.54z/data=!4m6!3m5!1s0x3a02f76e7494fd3b:0xe7b4e6462c245e84!8m2!3d22.079875!4d88.1336556!16s%2Fg%2F11mkrr87cv?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, name: "Facebook", href: "https://www.facebook.com/share/1cYs75PRN7/" },
    { icon: <InstagramIcon />, name: "Instagram", href: "https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg==" },
    { icon: <YoutubeIcon />, name: "YouTube", href: "https://www.youtube.com/@imma2025" }
  ];

  function renderContactIcon(icon) {
    const cls = "w-6 h-6";
    if (icon === "phone") return <Phone className={cls} />;
    if (icon === "whatsapp") return <MessageSquare className={cls} />;
    if (icon === "mail") return <Mail className={cls} />;
    if (icon === "location") return <MapPin className={cls} />;
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: "#fafafa" }}>
      <div className="container mx-auto px-4" style={{ maxWidth: "1000px" }}>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We&apos;re here to help you on your learning journey.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="mb-12 contact-grid">
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:translate-x-1 group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="p-3 rounded-xl mr-5 group-hover:bg-primary group-hover:text-white transition-colors" style={{ background: "rgba(var(--color-primary-rgb,79,70,229),0.1)", color: "var(--color-primary, #4f46e5)", flexShrink: 0 }}>
                    {renderContactIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.details}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media & Support */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Community</h2>
              <p className="text-gray-600 mb-8">
                Stay updated with the latest workshops, skill-development tips, and academy news by following us on social media.
              </p>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                    style={{ background: "#f9fafb", textDecoration: "none" }}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl" style={{ background: "rgba(var(--color-primary-rgb,79,70,229),0.05)", border: "1px solid rgba(var(--color-primary-rgb,79,70,229),0.1)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--color-primary, #4f46e5)" }}>Student Support</h3>
              <p className="text-sm text-gray-600">
                Are you an enrolled student with technical issues? Reach out directly via WhatsApp for faster resolution.
              </p>
              <a
                href="https://wa.me/918967576097"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-bold hover:underline"
                style={{ color: "var(--color-primary, #4f46e5)" }}
              >
                Chat with Support →
              </a>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center py-12" style={{ borderTop: "1px solid #f0f0f0" }}>
          <p className="text-gray-500 italic">&quot;Empowering Young Minds for a Brighter Future&quot;</p>
          <p className="text-sm text-gray-400 mt-2">Indian Mind Meld Academy Pvt. Ltd.</p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
