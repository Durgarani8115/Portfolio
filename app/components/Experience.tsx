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
    id: "exp-groomera",
    company: "Groomera India Pvt. Ltd",
    companyUrl: "#",
    role: "Frontend Developer Intern",
    period: "10 Jan 2026 — 10 Mar 2026",
    type: "Internship",
    location: "Noida, India",
    description:
      "Designed and implemented high-performance, data-driven web dashboards and scalable frontend architecture for web applications.",
    responsibilities: [
      "Built responsive user interfaces using React and Next.js for data-driven dashboards (revenue, retention, performance).",
      "Designed 25+ web pages and developed 70+ reusable components in React for scalable and consistent UI development.",
      "Developed reusable UI components and improved layout structure for better user experience and maintainability.",
    ],
    techStack: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs"],
    accentColor: "#f43f8e",
  },
  {
    id: "exp-education",
    company: "Noida International University",
    companyUrl: "#",
    role: "B.Tech in Computer Science Engineering",
    period: "2023 — 2027",
    type: "Degree (CGPA: 8.83)",
    location: "Greater Noida, India",
    description:
      "Specializing in Computer Science Engineering with a strong focus on Full Stack Development, AWS, System Design, and AI-integrated tools.",
    responsibilities: [
      "Maintained a strong CGPA of 8.83 through 6th semester in Computer Science Engineering.",
      "Studied Core Concepts: Data Structures & Algorithms, OOP, System Design, Authentication & Authorization (JWT, OAuth).",
      "Architected production-ready full-stack projects including Clove (AI Project Management) and Trakex (AI Financial Manager).",
    ],
    techStack: ["C++", "JavaScript", "TypeScript", "Go", "SQL", "System Design", "Algorithms"],
    accentColor: "#818cf8",
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
