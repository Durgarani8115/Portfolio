/*
  Experience.tsx
  --------------
  Work experience / career timeline section.
  Inspired by gyanendra.in's horizontal card-based layout.

  Layout:
  - Section header
  - Two-column: left = timeline list of companies, right = detail panel for selected job
  - Each timeline item: company name, role, period, tech stack tags
  - Clicking a timeline item updates the detail panel

  Features:
  - Interactive tab/timeline selector
  - Detail panel with roles & responsibilities list
  - Animated transitions between selected jobs
  - Scroll reveal
*/

"use client"; // Interactive: active job selection via state

import { useEffect, useRef, useState } from "react";

/* ─── Experience Data ────────────────────────────────────────────────────── */
/* Add your real work experiences here */
const EXPERIENCES = [
  {
    id: "exp-current",
    company: "Acme Corp",
    companyUrl: "https://example.com",
    role: "Full Stack Developer",
    period: "2023 — Present",
    type: "Full-time",
    location: "Remote",
    description:
      "Building scalable web applications for enterprise clients using React, Next.js, and Node.js. Leading frontend architecture decisions and mentoring junior developers.",
    responsibilities: [
      "Developed end-to-end features using React, Node.js, and PostgreSQL.",
      "Architected RESTful APIs serving 50,000+ daily active users.",
      "Improved application performance by 40% through code optimization.",
      "Conducted code reviews and mentored 3 junior developers.",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    accentColor: "#f43f8e",
  },
  {
    id: "exp-prev1",
    company: "TechStart Solutions",
    companyUrl: "https://example.com",
    role: "Frontend Developer",
    period: "2022 — 2023",
    type: "Full-time",
    location: "Hybrid",
    description:
      "Worked on a SaaS product dashboard, building React components and integrating third-party APIs for data visualization and reporting.",
    responsibilities: [
      "Built reusable React component library used across 3 products.",
      "Integrated Chart.js and D3.js for interactive data dashboards.",
      "Optimized bundle size by 35% using code splitting and lazy loading.",
      "Collaborated with UI/UX designers to implement pixel-perfect designs.",
    ],
    techStack: ["React", "JavaScript", "Chart.js", "SCSS", "REST APIs"],
    accentColor: "#818cf8",
  },
  {
    id: "exp-prev2",
    company: "Freelance",
    companyUrl: "#",
    role: "Web Developer",
    period: "2021 — 2022",
    type: "Freelance",
    location: "Remote",
    description:
      "Delivered custom web solutions for small businesses, including e-commerce sites, portfolio websites, and landing pages.",
    responsibilities: [
      "Designed and developed 10+ websites for clients across various industries.",
      "Implemented payment integrations using Razorpay and Stripe.",
      "Set up deployment pipelines on Vercel and Netlify.",
      "Maintained client relationships and provided post-launch support.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "WordPress", "Stripe"],
    accentColor: "#34d399",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);

  /* Get the currently selected experience object */
  const activeExp = EXPERIENCES.find((e) => e.id === activeId)!;

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal">
          <div className="divider" />
          <span className="section-label">Career Journey</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            Work{" "}
            <span className="section-title--gradient">Experience.</span>
          </h2>
        </div>

        {/* ── Two-Column Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="experience-grid reveal"
        >
          {/* ── LEFT: Timeline List ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              position: "sticky",
              top: "calc(var(--navbar-height) + 2rem)",
            }}
            className="experience-timeline"
          >
            {EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeId;
              return (
                <button
                  key={exp.id}
                  id={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  style={{
                    textAlign: "left",
                    padding: "1.1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: isActive ? "var(--bg-card)" : "transparent",
                    border: isActive
                      ? `1px solid ${exp.accentColor}40`
                      : "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--bg-glass)";
                      e.currentTarget.style.borderColor = "var(--border-card)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }
                  }}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "3px",
                        background: exp.accentColor,
                        borderRadius: "0 2px 2px 0",
                      }}
                    />
                  )}

                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: isActive ? exp.accentColor : "var(--text-muted)",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {exp.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {exp.company}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: isActive ? "var(--text-secondary)" : "var(--text-muted)",
                    }}
                  >
                    {exp.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Detail Panel ── */}
          <div
            key={activeId} // key change triggers remount for animation
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${activeExp.accentColor}30`,
              borderRadius: "var(--radius-xl)",
              padding: "2rem",
              animation: "fadeInUp 0.4s ease both",
            }}
          >
            {/* Job Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: activeExp.accentColor,
                    lineHeight: 1.2,
                  }}
                >
                  {activeExp.role}
                </h3>
                <a
                  href={activeExp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    marginTop: "0.25rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {activeExp.company} ↗
                </a>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: `${activeExp.accentColor}15`,
                    border: `1px solid ${activeExp.accentColor}30`,
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    color: activeExp.accentColor,
                    fontWeight: 500,
                  }}
                >
                  {activeExp.type}
                </span>
                <span
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {activeExp.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                marginTop: "0.75rem",
              }}
            >
              {activeExp.description}
            </p>

            {/* Responsibilities */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="section-label" style={{ marginBottom: "0.75rem", display: "block" }}>
                Roles &amp; Responsibilities
              </span>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {activeExp.responsibilities.map((resp) => (
                  <li
                    key={resp}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: activeExp.accentColor,
                        flexShrink: 0,
                        marginTop: "0.3rem",
                        fontSize: "0.5rem",
                        lineHeight: 1,
                      }}
                    >
                      ●
                    </span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="section-label" style={{ marginBottom: "0.6rem", display: "block" }}>
                Tech Stack
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {activeExp.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "0.3rem 0.75rem",
                      background: `${activeExp.accentColor}10`,
                      border: `1px solid ${activeExp.accentColor}25`,
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: activeExp.accentColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
          }
          .experience-timeline {
            position: static !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 0.5rem !important;
          }
          .experience-timeline > button {
            min-width: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
