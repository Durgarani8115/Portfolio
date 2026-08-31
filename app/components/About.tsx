/*
  About.tsx
  ---------
  About section — introduces Durga Rani to visitors.

  Layout:
  - Left column: Personal intro text, stats (years exp, projects, etc.)
  - Right column: A styled info card with skills, availability, and contact links

  Features:
  - Scroll-reveal animation (via IntersectionObserver)
  - Stats counter row
  - Quick contact links (GitHub, LinkedIn, Email)
*/

"use client"; // Uses IntersectionObserver for scroll animations

import { useEffect, useRef } from "react";

/* ─── Stats Data ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: "3+", label: "Years of\nExperience" },
  { value: "25+", label: "Web Pages\nBuilt" },
  { value: "70+", label: "Reusable\nComponents" },
  { value: "AI & SaaS", label: "Full-Stack\nFocus" },
];

/* ─── Quick Links Data ───────────────────────────────────────────────────── */
const QUICK_LINKS = [
  {
    id: "about-github",
    icon: "⌥",
    label: "GitHub",
    value: "github.com/Durgarani8115",
    href: "https://github.com/Durgarani8115",
  },
  {
    id: "about-linkedin",
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/durgarani8115",
    href: "https://www.linkedin.com/in/durgarani8115/",
  },
  {
    id: "about-email",
    icon: "@",
    label: "Email",
    value: "durgarani8115@gmail.com",
    href: "mailto:durgarani8115@gmail.com",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll Reveal: observe elements with .reveal class */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal">
          <div className="divider" />
          <span className="section-label">Who I Am</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            About{" "}
            <span className="section-title--gradient">Me.</span>
          </h2>
        </div>

        {/* ── Two-column Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* ── LEFT: Bio Text ── */}
          <div>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                Durga Rani
              </span>
              , a Full-Stack Developer passionate about building modern, scalable,
              and user-friendly web applications.
            </p>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: "1.025rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              I specialize in{" "}
              <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                React, Next.js, JavaScript, Tailwind CSS, Node.js, and REST APIs
              </span>
              , with hands-on experience building responsive websites, reusable UI
              components, dashboards, and full-stack applications. I also enjoy
              working with{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                AI-powered features and SaaS products
              </span>
              , turning ideas into practical and production-ready solutions.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontSize: "1.025rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.75rem",
              }}
            >
              I focus on writing{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                clean, reusable, and maintainable code
              </span>{" "}
              while creating interfaces that are fast, responsive, and easy to use.
              I&apos;m always learning new technologies and looking for
              opportunities to solve real-world problems through software.
            </p>

            {/* ── Highlight Badge Bar ── */}
            <div
              className="reveal reveal-delay-3"
              style={{
                padding: "0.85rem 1.25rem",
                background: "var(--gradient-accent-soft)",
                border: "1px solid var(--border-accent)",
                borderRadius: "var(--radius-md)",
                marginBottom: "2rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span style={{ color: "var(--accent-primary)" }}>⚡</span>
              <span>25+ web pages</span>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span>70+ reusable components</span>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ color: "var(--accent-primary)" }}>
                Full-stack &amp; AI projects
              </span>
            </div>

            {/* ── Stats Row ── */}
            <div
              className="reveal reveal-delay-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2.1rem",
                      fontWeight: 800,
                      background: "var(--gradient-accent)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      marginTop: "0.4rem",
                      whiteSpace: "pre-line",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info Card ── */}
          <div className="reveal reveal-delay-2">
            <div
              className="card"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-card)",
                padding: "2rem",
              }}
            >
              {/* Availability */}
              <div style={{ marginBottom: "2rem" }}>
                <span className="section-label">Current Status</span>
                <div style={{ marginTop: "0.75rem" }}>
                  <span className="availability-badge">
                    <span className="availability-dot" />
                    Available for remote opportunities
                  </span>
                </div>
              </div>

              {/* Contact Links */}
              <div style={{ marginBottom: "2rem" }}>
                <span className="section-label">Connect</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {QUICK_LINKS.map((link) => (
                    <a
                      key={link.id}
                      id={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.875rem 1rem",
                        background: "var(--bg-glass)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        transition: "all var(--transition-fast)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-accent)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--gradient-accent-soft)",
                          border: "1px solid var(--border-accent)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--accent-primary)",
                          flexShrink: 0,
                        }}
                      >
                        {link.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {link.label}
                        </div>
                        <div style={{ fontWeight: 500, marginTop: "0.1rem" }}>
                          {link.value}
                        </div>
                      </div>
                      <span
                        style={{
                          marginLeft: "auto",
                          color: "var(--text-muted)",
                          fontSize: "0.8rem",
                        }}
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Download CV */}
              <a
                id="about-download-cv"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Download Resume ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
