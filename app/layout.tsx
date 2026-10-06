import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SampleBanner from "@/components/SampleBanner";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import { profile } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.subhead,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.subhead,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-bg text-ink">
        <Nav />
        <ScrollToTopOnLoad />
        <ScrollProgress />
        <Cursor />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer />
        <SampleBanner />
      </body>
    </html>
  );
}
