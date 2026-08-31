/*
  Hero.tsx
  --------
  Full-screen landing section — the first thing visitors see.

  Features:
  - Animated greeting text ("नमस्ते" / "Hello" cycling)
  - Name displayed with gradient effect
  - Role text with typewriter animation
  - Tagline: "Less talk. More proof."
  - CTA buttons: View Projects / Contact Me
  - Scroll-down indicator arrow
  - Decorative floating gradient orbs in background
*/

"use client"; // Interactive: typewriter animation uses state

import { useState, useEffect } from "react";

/* ─── Greeting Cycle Data ────────────────────────────────────────────────── */
/* Greetings in different languages to cycle through */
const GREETINGS = [
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "Hola", lang: "Spanish" },
];

/* ─── Typewriter Roles Data ──────────────────────────────────────────────── */
const ROLES = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "AI & SaaS Tools Builder",
  "System Design & AWS Specialist",
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* Cycle through greeting languages every 2.5 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* Typewriter effect for role text */
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentRole.length) {
      // Type next character
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (isDeleting && charIndex > 0) {
      // Delete character
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    setDisplayedRole(currentRole.slice(0, charIndex));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  /* Smooth scroll to projects section */
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "calc(var(--navbar-height) + 2rem) 1.5rem 4rem",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* ── Decorative Background Orbs ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 63, 142, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* ── Availability Badge (top of hero) ── */}
      <div
        style={{ animation: "fadeInUp 0.6s ease both", animationDelay: "0.1s", marginBottom: "2rem" }}
      >
        <span className="availability-badge">
          <span className="availability-dot" />
          Available for new projects
        </span>
      </div>

      {/* ── Greeting (Animated, cycles languages) ── */}
      <div
        key={greetingIndex}
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
          fontWeight: 400,
          color: "var(--text-muted)",
          marginBottom: "0.75rem",
          animation: "fadeIn 0.5s ease both",
          letterSpacing: "0.05em",
        }}
      >
        {GREETINGS[greetingIndex].text}
      </div>

      {/* ── Main Name Heading ── */}
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: "1.25rem",
          animation: "fadeInUp 0.7s ease both",
          animationDelay: "0.2s",
          background: "var(--gradient-hero-text)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Durga Rani
      </h1>

      {/* ── Animated Role Title ── */}
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          fontWeight: 600,
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          minHeight: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          animation: "fadeInUp 0.7s ease both",
          animationDelay: "0.3s",
        }}
      >
        {displayedRole}
        {/* Blinking cursor */}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1.2em",
            background: "var(--accent-primary)",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>

      {/* ── Tagline ── */}
      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "var(--text-muted)",
          maxWidth: "480px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
          animation: "fadeInUp 0.7s ease both",
          animationDelay: "0.4s",
        }}
      >
        Less talk.{" "}
        <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
          More proof.
        </span>
      </p>

      {/* ── CTA Buttons ── */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fadeInUp 0.7s ease both",
          animationDelay: "0.5s",
        }}
      >
        <button id="hero-view-projects" onClick={scrollToProjects} className="btn-primary">
          View My Work ↗
        </button>
        <button id="hero-contact" onClick={scrollToContact} className="btn-outline">
          Get In Touch
        </button>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          animation: "fadeIn 1s ease both 1s",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--accent-primary), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
