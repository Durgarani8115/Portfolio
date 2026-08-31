/*
  Navbar.tsx
  ----------
  Fixed navigation bar at the top of the page.

  Features:
  - Logo (brand name) on the left
  - Navigation links in the center
  - "Available for new projects" badge + "Download CV" button on the right
  - Transparent initially, blurs/darkens on scroll
  - Highlights the active section while scrolling (active link indicator)
*/

"use client"; // Interactive: uses scroll events and state

import { useState, useEffect } from "react";

/* ─── Navigation Links Data ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);       // track scroll position
  const [activeSection, setActiveSection] = useState("home"); // track active section
  const [menuOpen, setMenuOpen] = useState(false);        // mobile menu toggle

  /* Listen for scroll to apply blur/dark background */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Track which section is currently in view to highlight nav link */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Smooth scroll to section and close mobile menu */
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--navbar-height)",
          display: "flex",
          alignItems: "center",
          transition: "background var(--transition-medium), border-color var(--transition-medium), box-shadow var(--transition-medium)",
          background: scrolled
            ? "rgba(5, 5, 8, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* ── Brand Logo ── */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("#home")}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            Durga
            <span style={{ color: "var(--accent-primary)" }}>.</span>
          </button>

          {/* ── Desktop Navigation Links ── */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    id={`nav-${link.label.toLowerCase()}`}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      background: isActive ? "var(--bg-glass-hover)" : "transparent",
                      border: isActive ? "1px solid var(--border-card)" : "1px solid transparent",
                      transition: "all var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                      }
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Right Side: Badge + CTA Button ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Availability Badge */}
            <span className="availability-badge nav-badge-desktop">
              <span className="availability-dot" />
              Available for new projects
            </span>

            {/* Download CV Button */}
            <a
              id="nav-download-cv"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "0.8rem", padding: "0.55rem 1.25rem" }}
            >
              Download CV ↓
            </a>

            {/* ── Mobile Hamburger Menu Toggle ── */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-hamburger"
              aria-label="Toggle mobile menu"
              style={{
                display: "none",
                flexDirection: "column",
                gap: "5px",
                padding: "0.4rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "2px",
                  transition: "transform var(--transition-fast), opacity var(--transition-fast)",
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "2px",
                  transition: "opacity var(--transition-fast)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "2px",
                  transition: "transform var(--transition-fast)",
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--navbar-height)",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(5, 5, 8, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "1rem" }}>
            <span className="availability-badge">
              <span className="availability-dot" />
              Available for new projects
            </span>
          </div>
        </div>
      )}

      {/* ── Responsive Styles (injected as a style tag for mobile) ── */}
      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-badge-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
