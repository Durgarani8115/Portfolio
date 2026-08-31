/*
  layout.tsx
  ----------
  Root layout for the entire app.
  - Sets the HTML metadata (title, description, keywords)
  - Loads Geist font variables (used by Next.js default setup)
  - Wraps all pages with the global CSS
*/

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ─── Font Configuration ─────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ─── SEO Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Durga Rani — Full Stack Developer",
  description:
    "Portfolio of Durga Rani, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and cloud technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Durga Rani",
  ],
  authors: [{ name: "Durga Rani" }],
  openGraph: {
    title: "Durga Rani — Full Stack Developer",
    description: "Less talk. More proof.",
    type: "website",
  },
};

/* ─── Root Layout Component ──────────────────────────────────────────────── */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
