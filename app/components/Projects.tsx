/*
  Projects.tsx
  ------------
  Featured projects section — showcases Durga Rani's best work.

  Layout:
  - Section header
  - Grid of project cards (2 columns on desktop, 1 on mobile)
  - Each card shows: project image/mockup, title, description, tech stack, links

  Features:
  - Hover lift effect on cards
  - Gradient accent border on hover
  - External link (↗) and GitHub link icons
  - "Featured" badge on highlighted projects
  - Scroll reveal animation
*/

"use client"; // Uses IntersectionObserver + hover state

import { useEffect, useRef, useState } from "react";

/* ─── Projects Data ──────────────────────────────────────────────────────── */
/* Replace these placeholders with your real projects */
const PROJECTS = [
  {
    id: "project-clove",
    title: "Clove — AI Project Management",
    description:
      "A green-powered, minimalist workspace built for agile teams to plan projects, track deliverables, and achieve goals together. Features drag-and-drop Kanban boards, RBAC, real-time push notifications via FCM, and a global Cmd+K command palette.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TanStack Query", "Firebase FCM", "Tailwind CSS"],
    featured: true,
    liveUrl: "https://clove-ai-project-management.vercel.app/",
    githubUrl: "https://github.com/Durgarani8115",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))",
    accentColor: "#10b981",
    emoji: "🌿",
  },
  {
    id: "project-trakex",
    title: "Trakex — Personal Finance Manager",
    description:
      "A smart personal finance dashboard to track accounts, record income & expenses, manage monthly budgets, and scan receipts using Google Gemini AI vision technology. Includes a split expense hub and an interactive ROI calculator.",
    tags: ["React", "Next.js", "Google Gemini AI", "Tailwind CSS", "TypeScript"],
    featured: true,
    liveUrl: "https://mytrakex.vercel.app/",
    githubUrl: "https://github.com/Durgarani8115",
    gradient: "linear-gradient(135deg, rgba(244, 63, 142, 0.15), rgba(139, 92, 246, 0.15))",
    accentColor: "#f43f8e",
    emoji: "💰",
  },
  {
    id: "project-idashboard",
    title: "iDashboard — Business Admin Panel",
    description:
      "A full-featured business operations dashboard for managing orders, inventory, transactions, invoices & taxes, payouts, customers, and support tickets — with PDF invoice generation and interactive sales analytics charts.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Vercel"],
    featured: false,
    liveUrl: "https://i-dashboard.vercel.app/",
    githubUrl: "https://github.com/Durgarani8115",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.15))",
    accentColor: "#818cf8",
    emoji: "📊",
  },
];

/* ─── Single Project Card ────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={project.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? project.accentColor + "40" : "var(--border-card)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform var(--transition-medium), border-color var(--transition-medium), box-shadow var(--transition-medium)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px ${project.accentColor}20`
          : "var(--shadow-card)",
        position: "relative",
      }}
    >
      {/* ── Project Visual Header ── */}
      <div
        style={{
          height: "180px",
          background: project.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "4rem",
          position: "relative",
          borderBottom: "1px solid var(--border-subtle)",
          overflow: "hidden",
        }}
      >
        {/* Background decorative text */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            fontSize: "8rem",
            opacity: 0.06,
            userSelect: "none",
            transform: "rotate(-10deg)",
          }}
        >
          {project.emoji}
        </span>
        {/* Main emoji */}
        <span style={{ position: "relative", zIndex: 1 }}>{project.emoji}</span>

        {/* Featured Badge */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              padding: "0.25rem 0.7rem",
              background: "rgba(244, 63, 142, 0.15)",
              border: "1px solid rgba(244, 63, 142, 0.3)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--accent-primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            ★ Featured
          </div>
        )}
      </div>

      {/* ── Card Content ── */}
      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Project Title */}
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.6rem",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        {/* Project Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1.25rem",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1.25rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.2rem 0.65rem",
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}25`,
                borderRadius: "var(--radius-full)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: project.accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              flex: 1,
              justifyContent: "center",
              fontSize: "0.8rem",
              padding: "0.6rem 1rem",
              background: hovered
                ? `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}aa)`
                : "var(--gradient-accent)",
            }}
          >
            Live Demo ↗
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.6rem 1rem" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal">
          <div className="divider" />
          <span className="section-label">What I&apos;ve Built</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            Featured{" "}
            <span className="section-title--gradient">Projects.</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              marginTop: "0.75rem",
              maxWidth: "480px",
            }}
          >
            A selection of real-world projects that demonstrate my skills and
            problem-solving approach.
          </p>
        </div>

        {/* ── Projects Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`reveal reveal-delay-${(index % 3) + 1}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* ── See More on GitHub CTA ── */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            id="projects-github-link"
            href="https://github.com/Durgarani8115"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See All Projects on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
