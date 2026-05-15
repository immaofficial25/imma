"use client";

import { Mail, Phone, MapPin, MessageSquare, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Call Us",
      details: "8967576097",
      href: "tel:8967576097"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "WhatsApp",
      details: "8967576097",
      href: "https://wa.me/918967576097"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Us",
      details: "imma.official25@gmail.com",
      href: "mailto:imma.official25@gmail.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Visit Us",
      details: "Dhandighi, Contai, Purba Medinipur, West Bengal, 721401",
      href: "https://maps.google.com/?q=Dhandighi,Contai,Purba+Medinipur,West+Bengal,721401"
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, name: "Facebook", href: "https://www.facebook.com/share/1cYs75PRN7/" },
    { icon: <Instagram />, name: "Instagram", href: "https://www.instagram.com/imma.academy.official_?igsh=MTk5dTViNnJ5MGRlMg==" },
    { icon: <Youtube />, name: "YouTube", href: "https://www.youtube.com/@imma2025" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We're here to help you on your learning journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 5 }}
                className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md group"
              >
                <div className="p-3 bg-primary/10 rounded-xl mr-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.details}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Media & Support */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Community</h2>
              <p className="text-gray-600 mb-8">
                Stay updated with the latest workshops, skill-development tips, and academy news by following us on social media.
              </p>
              <div className="flex gap-4 mb-12">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <h3 className="font-bold text-primary mb-2">Student Support</h3>
              <p className="text-sm text-gray-600">
                Are you an enrolled student with technical issues? Reach out directly via WhatsApp for faster resolution.
              </p>
              <a 
                href="https://wa.me/918967576097" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary font-bold hover:underline"
              >
                Chat with Support →
              </a>
            </div>
          </div>
        </div>

        {/* Map Placeholder or Closing Statement */}
        <div className="text-center py-12 border-t border-gray-100">
          <p className="text-gray-500 italic">
            "Empowering Young Minds for a Brighter Future"
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Indian Mind Meld Academy Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
