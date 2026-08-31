/*
  Footer.tsx
  ----------
  Site footer — minimal and clean.

  Layout:
  - Top row: Brand name + nav links
  - Bottom row: Copyright + social icon links
  - Decorative gradient line at the top of the footer

  Features:
  - Smooth scroll to sections via footer nav links
  - Social links with hover effects
*/

"use client"; // Uses smooth scroll handlers

/* ─── Footer Navigation Data ─────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ─── Social Links Data ──────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    id: "footer-github",
    label: "GitHub",
    icon: "⌥",
    href: "https://github.com/Durgarani8115",
  },
  {
    id: "footer-linkedin",
    label: "LinkedIn",
    icon: "in",
    href: "https://www.linkedin.com/in/durgarani8115/",
  },
  {
    id: "footer-email",
    label: "Email",
    icon: "✉",
    href: "mailto:durga@example.com",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* Smooth scroll to section */
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "2rem",
      }}
    >
      {/* Decorative gradient top border */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          maxWidth: "400px",
          height: "1px",
          background: "var(--gradient-accent)",
          opacity: 0.5,
        }}
      />

      <div className="container">
        {/* ── Top Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2.5rem 0 1.5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Brand */}
          <button
            id="footer-logo"
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Durga
            <span style={{ color: "var(--accent-primary)" }}>.</span>
          </button>

          {/* Footer Nav Links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25rem",
              }}
            >
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    id={`footer-${link.label.toLowerCase()}`}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      borderRadius: "var(--radius-full)",
                      transition: "color var(--transition-fast), background var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.background = "var(--bg-glass)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border-subtle)",
          }}
        />

        {/* ── Bottom Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 0",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            © {currentYear} Durga Rani. Built with{" "}
            <span style={{ color: "var(--accent-primary)" }}>♥</span> using{" "}
            <span style={{ color: "var(--text-secondary)" }}>Next.js</span>.
          </p>

          {/* Social Links */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                id={social.id}
                href={social.href}
                target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-glass)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  transition: "all var(--transition-fast)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.color = "var(--accent-primary)";
                  e.currentTarget.style.background = "rgba(244, 63, 142, 0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "var(--bg-glass)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
