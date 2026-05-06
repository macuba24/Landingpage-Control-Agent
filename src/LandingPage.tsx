import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main style={styles.page}>
      <section style={styles.heroCard}>
        <p style={styles.kicker}>Control Agent</p>
        <h1 style={styles.headline}>You log in. You act. Done.</h1>
        <p style={styles.subheadline}>
          Operational risk clarity in seconds. Move from raw plant telemetry to
          confident executive action with one cockpit.
        </p>

        <div style={styles.buttonRow}>
          <Link to="/" style={styles.primaryButton}>
            View Demo
          </Link>
          <Link to="/" style={styles.secondaryButton}>
            View My Risk Number
          </Link>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "2rem",
    background:
      "radial-gradient(circle at top, rgba(56, 189, 248, 0.14), rgba(2, 6, 23, 1) 52%)",
    color: "#e2e8f0",
    fontFamily: "Inter, Arial, sans-serif",
  },
  heroCard: {
    width: "100%",
    maxWidth: "900px",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    borderRadius: "20px",
    padding: "3rem",
    backgroundColor: "rgba(15, 23, 42, 0.82)",
    boxShadow: "0 24px 60px rgba(2, 6, 23, 0.45)",
  },
  kicker: {
    margin: 0,
    color: "#38bdf8",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  headline: {
    marginTop: "0.7rem",
    marginBottom: "0.8rem",
    fontSize: "clamp(2rem, 4vw, 3.3rem)",
    lineHeight: 1.1,
    color: "#f8fafc",
  },
  subheadline: {
    margin: 0,
    fontSize: "1.08rem",
    maxWidth: "700px",
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  buttonRow: {
    marginTop: "2rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.9rem",
  },
  primaryButton: {
    textDecoration: "none",
    backgroundColor: "#facc15",
    color: "#111827",
    fontWeight: 700,
    borderRadius: "10px",
    padding: "0.8rem 1.2rem",
  },
  secondaryButton: {
    textDecoration: "none",
    backgroundColor: "transparent",
    color: "#e2e8f0",
    fontWeight: 600,
    border: "1px solid rgba(148, 163, 184, 0.4)",
    borderRadius: "10px",
    padding: "0.8rem 1.2rem",
  },
};
