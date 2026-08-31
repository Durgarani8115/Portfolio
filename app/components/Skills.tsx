/*
  Skills.tsx
  ----------
  Skills section — displays tech stack organized by category.
  Inspired by gyanendra.in's node-map layout.

  Layout:
  - Section title + label
  - Category cards arranged in a CSS grid
  - Each card has: icon, category name, skill count, skill pills
  - Center "Core" card with gradient border

  Categories:
  - Frontend, Backend, Database, DevOps & Cloud, Testing & Tools, Design
*/

"use client"; // Uses IntersectionObserver for scroll animations

import { useEffect, useRef } from "react";
import SpotlightCard from "./SpotlightCard";

/* ─── Skills Data ────────────────────────────────────────────────────────── */
/* Each skill has a name, emoji icon, and color for the icon background */
const SKILL_CATEGORIES = [
  {
    id: "languages",
    icon: "💻",
    iconBg: "rgba(244, 63, 142, 0.15)",
    iconColor: "#f43f8e",
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "JS" },
      { name: "TypeScript", icon: "TS" },
      { name: "Go", icon: "GO" },
      { name: "C++", icon: "C++" },
      { name: "C", icon: "C" },
      { name: "Python", icon: "Py" },
      { name: "Java", icon: "J" },
      { name: "SQL", icon: "DB" },
    ],
  },
  {
    id: "frontend",
    icon: "🖥️",
    iconBg: "rgba(99, 102, 241, 0.15)",
    iconColor: "#818cf8",
    title: "Frontend",
    skills: [
      { name: "React.js", icon: "⚛" },
      { name: "Next.js", icon: "▲" },
      { name: "Tailwind CSS", icon: "~" },
      { name: "HTML5 & CSS3", icon: "H" },
      { name: "Bootstrap", icon: "B" },
    ],
  },
  {
    id: "backend",
    icon: "⚙️",
    iconBg: "rgba(16, 185, 129, 0.15)",
    iconColor: "#34d399",
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", icon: "N" },
      { name: "Express.js", icon: "Ex" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Prisma ORM", icon: "P" },
    ],
  },
  {
    id: "ai-apis",
    icon: "🤖",
    iconBg: "rgba(251, 146, 60, 0.15)",
    iconColor: "#fb923c",
    title: "AI & Integrations",
    skills: [
      { name: "Google Gemini AI", icon: "✨" },
      { name: "OpenAI API", icon: "🤖" },
      { name: "REST APIs", icon: "⟨⟩" },
      { name: "Inngest Cron", icon: "⚡" },
      { name: "Arcjet Security", icon: "🛡" },
    ],
  },
  {
    id: "tools-concepts",
    icon: "🛠️",
    iconBg: "rgba(139, 92, 246, 0.15)",
    iconColor: "#a78bfa",
    title: "Concepts & Tools",
    skills: [
      { name: "System Design", icon: "📐" },
      { name: "DSA & Algorithms", icon: "🧠" },
      { name: "JWT & OAuth", icon: "🔑" },
      { name: "Git & GitHub", icon: "⎇" },
      { name: "Vercel", icon: "▲" },
      { name: "Postman", icon: "P" },
    ],
  },
];

/* ─── Core Stack Highlights ─────────────────────────────────────────────── */
const CORE_STACK = [
  "React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Google Gemini AI", "System Design",
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal for section elements */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal">
          <div className="divider" />
          <span className="section-label">What I Work With</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            Skills{" "}
            <span className="section-title--gradient">&amp; Stack.</span>
          </h2>
        </div>

        {/* ── Core Stack Pill Row ── */}
        <div
          className="reveal reveal-delay-1"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              alignSelf: "center",
              marginRight: "0.5rem",
            }}
          >
            Core Stack:
          </span>
          {CORE_STACK.map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>

        {/* ── Skill Category Cards Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={category.id} className={`reveal reveal-delay-${(index % 4) + 1}`}>
              <SpotlightCard
                spotlightColor={`${category.iconColor}30`}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                }}
              >
                {/* Card Header: Icon + Title + Skill Count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    marginBottom: "1.25rem",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {/* Category Icon */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: category.iconBg,
                      border: `1px solid ${category.iconColor}30`,
                      borderRadius: "var(--radius-md)",
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    {category.icon}
                  </div>

                  {/* Title + Count */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {category.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: "0.1rem",
                      }}
                    >
                      {category.skills.length} skills
                    </div>
                  </div>
                </div>

                {/* Skill Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.45rem",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.3rem 0.7rem",
                        background: category.iconBg,
                        border: `1px solid ${category.iconColor}20`,
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        transition: "all var(--transition-fast)",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${category.iconColor}60`;
                        e.currentTarget.style.color = category.iconColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${category.iconColor}20`;
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: category.iconColor,
                          fontWeight: 700,
                        }}
                      >
                        {skill.icon}
                      </span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* ── Bottom Tagline ── */}
        <div
          className="reveal"
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "1.5rem",
            background: "var(--gradient-accent-soft)",
            border: "1px solid var(--border-accent)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
            }}
          >
            Always learning.{" "}
            <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
              Currently exploring AI/ML integrations and serverless architectures.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
