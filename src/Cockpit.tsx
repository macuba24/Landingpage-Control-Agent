import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function Cockpit() {
  return (
    <main style={styles.page}>
      <style>{`
        @keyframes pulse-yellow {
          0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.65); transform: scale(1); }
          70% { box-shadow: 0 0 0 18px rgba(250, 204, 21, 0); transform: scale(1.06); }
          100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); transform: scale(1); }
        }
      `}</style>

      <section style={styles.headerRow}>
        <div>
          <p style={styles.kicker}>Operations Cockpit</p>
          <h1 style={styles.title}>Executive Dashboard</h1>
        </div>
        <div style={styles.headerActions}>
          <Link to="/info" style={styles.aboutLink}>
            About Control Agent
          </Link>
          <button type="button" style={styles.reportButton}>
            Generate Executive Report
          </button>
        </div>
      </section>

      <section style={styles.grid}>
        <article style={styles.card}>
          <p style={styles.label}>Traffic Light</p>
          <div style={styles.trafficContainer}>
            <span style={styles.redLight} />
            <span style={styles.yellowLight} />
            <span style={styles.greenLight} />
          </div>
          <p style={styles.value}>YELLOW - Monitor Closely</p>
        </article>

        <article style={styles.card}>
          <p style={styles.label}>Risk Score</p>
          <p style={styles.metric}>14</p>
        </article>

        <article style={styles.card}>
          <p style={styles.label}>Downtime Cost</p>
          <p style={styles.metric}>$1,340 / hour</p>
        </article>

        <article style={styles.card}>
          <p style={styles.label}>EBITDA Loss Prevented</p>
          <p style={styles.metric}>$14,450</p>
        </article>

        <article style={styles.card}>
          <p style={styles.label}>SAP-MARD Status</p>
          <p style={styles.secure}>
            <span style={styles.secureIcon}>●</span> Secure
          </p>
          <p style={styles.latency}>Latency: 140ms</p>
        </article>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "2rem",
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "Inter, Arial, sans-serif",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.6rem",
    flexWrap: "wrap",
  },
  kicker: {
    margin: 0,
    color: "#93c5fd",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0.4rem 0 0",
    color: "#f8fafc",
    fontSize: "clamp(1.7rem, 2.6vw, 2.5rem)",
  },
  reportButton: {
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#eff6ff",
    fontWeight: 700,
    padding: "0.75rem 1rem",
    cursor: "pointer",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    flexWrap: "wrap",
  },
  aboutLink: {
    textDecoration: "none",
    color: "#cbd5e1",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    borderRadius: "10px",
    padding: "0.65rem 0.9rem",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "1rem",
  },
  card: {
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    backgroundColor: "#111827",
    padding: "1rem",
    boxShadow: "0 12px 32px rgba(2, 6, 23, 0.38)",
  },
  label: {
    margin: 0,
    color: "#94a3b8",
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  metric: {
    margin: "0.6rem 0 0",
    color: "#f8fafc",
    fontSize: "1.65rem",
    fontWeight: 800,
  },
  trafficContainer: {
    marginTop: "0.8rem",
    display: "flex",
    gap: "0.6rem",
  },
  redLight: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#7f1d1d",
  },
  yellowLight: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#facc15",
    animation: "pulse-yellow 1.5s infinite",
  },
  greenLight: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#14532d",
  },
  value: {
    margin: "0.7rem 0 0",
    color: "#fde68a",
    fontWeight: 700,
  },
  secure: {
    margin: "0.7rem 0 0",
    color: "#bbf7d0",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
  },
  secureIcon: {
    color: "#22c55e",
  },
  latency: {
    margin: "0.35rem 0 0",
    color: "#cbd5e1",
  },
};
