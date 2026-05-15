import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Indian Mind Meld Academy | IMMA",
  description: "Modern online learning platform for Class 4–8 students focused on skill-based and career-oriented education.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Navbar />
          <div className="flex flex-1 flex-col pt-24">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
