/*
  page.tsx
  --------
  The main portfolio page.

  This is the root page component for the Next.js App Router.
  It assembles all the section components in order:

  Structure:
  ┌─────────────────────────────────────────────────────┐
  │  <Navbar />        ← Fixed at the top               │
  │  <main>                                             │
  │    <Hero />        ← Landing / intro                │
  │    <About />       ← About me + stats               │
  │    <Skills />      ← Tech stack by category         │
  │    <Projects />    ← Featured project cards         │
  │    <Experience />  ← Work history timeline          │
  │    <Contact />     ← Contact form + info            │
  │  </main>                                            │
  │  <Footer />        ← Bottom credits + links         │
  └─────────────────────────────────────────────────────┘

  Note:
  - All interactive components use "use client" in their own files
  - This page itself does NOT need "use client" — it's a Server Component
*/

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* ─── Main Page Component ────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. Hero — Full-screen landing with animated name + role */}
        <Hero />

        {/* 2. About — Bio, stats, and contact links */}
        <About />

        {/* 3. Skills — Tech stack organized by category */}
        <Skills />

        {/* 4. Projects — Featured project showcase cards */}
        <Projects />

        {/* 5. Experience — Interactive work history timeline */}
        <Experience />

        {/* 6. Contact — Form + contact info panel */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
