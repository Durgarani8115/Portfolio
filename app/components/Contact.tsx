/*
  Contact.tsx
  -----------
  Contact section — allows visitors to reach out.
  Inspired by gyanendra.in's two-column contact layout.

  Layout:
  - Left: Contact form (Name, Email, Subject, Message)
  - Right: Contact info cards (email, GitHub, LinkedIn) + availability status

  Features:
  - Form state management (controlled inputs)
  - Simulated form submission with success state
  - Scroll reveal animations
  - Live clock showing current time and timezone
*/

"use client"; // Interactive: form state, live clock

import { useEffect, useRef, useState } from "react";

/* ─── Contact Info Data ──────────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    id: "contact-email-primary",
    icon: "✉",
    label: "Email",
    value: "durgarani8115@gmail.com",
    href: "mailto:durgarani8115@gmail.com",
    copyable: true,
  },
  {
    id: "contact-github",
    icon: "⌥",
    label: "GitHub",
    value: "github.com/Durgarani8115",
    href: "https://github.com/Durgarani8115",
    copyable: false,
  },
  {
    id: "contact-linkedin",
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/durgarani8115",
    href: "https://www.linkedin.com/in/durgarani8115/",
    copyable: false,
  },
  {
    id: "contact-leetcode",
    icon: "LC",
    label: "LeetCode",
    value: "leetcode.com/u/anumodi8115",
    href: "https://leetcode.com/u/anumodi8115/",
    copyable: false,
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Form State */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* Live Clock */
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Scroll Reveal */
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

  /* Handle input changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* Handle form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    /* Simulate network request — replace with real API call (e.g., EmailJS, Formspree) */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  /* Shared input style */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "var(--bg-glass)",
    border: "1px solid var(--border-card)",
    borderRadius: "var(--radius-md)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color var(--transition-fast)",
  };

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal">
          <div className="divider" />
          <span className="section-label">Let&apos;s Work Together</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            Get In{" "}
            <span className="section-title--gradient">Touch.</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              marginTop: "0.75rem",
              maxWidth: "480px",
            }}
          >
            Have a project in mind or want to collaborate? I&apos;d love to
            hear from you. Replies within 24 hours.
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "2rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* ── LEFT: Contact Form ── */}
          <div className="reveal reveal-delay-1">
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
              }}
            >
              {/* ── Success State ── */}
              {isSubmitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 2rem",
                    animation: "fadeInUp 0.5s ease both",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Thanks for reaching out. I&apos;ll get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="btn-outline"
                    style={{ marginTop: "1.5rem" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit}>
                  <div
                    style={{ marginBottom: "0.75rem" }}
                    className="section-label"
                  >
                    — GET IN TOUCH
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Send me a message
                  </h3>

                  {/* Name */}
                  <div style={{ marginBottom: "1rem" }}>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-primary)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-card)")
                      }
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "1rem" }}>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-primary)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-card)")
                      }
                    />
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: "1rem" }}>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239090b0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="" style={{ background: "#0d0d18" }}>
                        What can I help you with?
                      </option>
                      <option value="fulltime" style={{ background: "#0d0d18" }}>
                        Full-time Opportunity
                      </option>
                      <option value="freelance" style={{ background: "#0d0d18" }}>
                        Freelance Project
                      </option>
                      <option value="collab" style={{ background: "#0d0d18" }}>
                        Collaboration
                      </option>
                      <option value="other" style={{ background: "#0d0d18" }}>
                        Just saying hi!
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Share your thoughts..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--accent-primary)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--border-card)")
                      }
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ flex: "0 0 auto" }}
                    >
                      Download CV ↓
                    </a>
                    <button
                      id="contact-submit"
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: "center" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: Contact Info Panel ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            className="reveal reveal-delay-2"
          >
            {/* Live Clock */}
            <div
              style={{
                padding: "0.875rem 1.25rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>🕐</span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>{currentTime}</strong>{" "}
                IST, (India)
              </span>
            </div>

            {/* Status Cards */}
            <div
              style={{
                padding: "1rem 1.25rem",
                background: "var(--bg-card)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.875rem",
                color: "#4ade80",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#22c55e",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }}
              />
              Available for remote opportunities.
            </div>

            <div
              style={{
                padding: "1rem 1.25rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>📩</span>
              Replies within 24 hours
            </div>

            {/* Contact Links */}
            {CONTACT_INFO.map((info) => (
              <a
                key={info.id}
                id={info.id}
                href={info.href}
                target={info.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{
                  padding: "1rem 1.25rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  textDecoration: "none",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-card)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--gradient-accent-soft)",
                    border: "1px solid var(--border-accent)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                    flexShrink: 0,
                  }}
                >
                  {info.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {info.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginTop: "0.1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {info.value}
                  </div>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
