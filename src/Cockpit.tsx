import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  "Dashboard Overview",
  "Active 8D-Reports",
  "Supply Agent",
  "Flow Agent",
  "Quality Agent",
  "Investment & ROI",
] as const;

const CONTROL_BOARD_TASKS: {
  phase: string;
  title: string;
  assignee: string;
  role: string;
  tag: string;
}[] = [
  {
    phase: "D1",
    title: "Establish the Team",
    assignee: "S. Weber",
    role: "8D Champion",
    tag: "In Review",
  },
  {
    phase: "D2",
    title: "Describe the Problem",
    assignee: "M. Chen",
    role: "Quality Lead",
    tag: "Open",
  },
  {
    phase: "D3",
    title: "Interim Containment",
    assignee: "K. Novak",
    role: "Operations",
    tag: "Action Due",
  },
  {
    phase: "D4",
    title: "Root Cause Analysis",
    assignee: "A. Fischer",
    role: "Engineering",
    tag: "Pending",
  },
  {
    phase: "D5",
    title: "Define Corrective Actions",
    assignee: "L. Rossi",
    role: "Process Owner",
    tag: "Draft",
  },
  {
    phase: "D6",
    title: "Implement & Verify",
    assignee: "J. Patel",
    role: "Plant Manager",
    tag: "Scheduled",
  },
  {
    phase: "D7",
    title: "Prevent Recurrence",
    assignee: "R. Klein",
    role: "Systems",
    tag: "Queued",
  },
  {
    phase: "D8",
    title: "Recognize the Team",
    assignee: "E. Santos",
    role: "HR / Leadership",
    tag: "Awaiting",
  },
];

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BellOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.7 3a6 6 0 0 1 9.8 5" />
      <path d="M6.3 6.3A6 6 0 0 0 6 10v3l-2 2h16" />
      <path d="M10 18a2 2 0 0 0 4 0" />
      <path d="M2 2l20 20" />
    </svg>
  );
}

export default function Cockpit() {
  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar} aria-label="Main navigation">
        <div style={styles.sidebarBrand}>
          <span style={styles.brandMark} />
          <div>
            <div style={styles.brandTitle}>Master Console</div>
            <div style={styles.brandSub}>Control Agent</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map((label, i) => (
            <button
              key={label}
              type="button"
              style={{
                ...styles.navItem,
                ...(i === 0 ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navBullet} />
              {label}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <Link to="/info" style={styles.sidebarLink}>
            About Control Agent
          </Link>
        </div>
      </aside>

      <div style={styles.mainWrap}>
        <header style={styles.topBar}>
          <div style={styles.topBarLeft} />
          <div style={styles.topBarCenter}>
            <div style={styles.riskPill}>
              <span style={styles.riskLabel}>Global Risk Level</span>
              <span style={styles.riskValue}>LOW</span>
            </div>
            <span style={styles.iatfBadge}>IATF 10.2 COMPLIANT</span>
            <div style={styles.langSwitch} role="group" aria-label="Language">
              <button type="button" style={{ ...styles.langBtn, ...styles.langBtnActive }}>
                EN
              </button>
              <button type="button" style={styles.langBtn}>DE</button>
            </div>
            <button type="button" style={styles.silenceBtn}>
              <BellOffIcon />
              <span>Silence Alerts</span>
            </button>
          </div>
          <div style={styles.topBarRight}>
            <div style={styles.financialCounter}>
              <LockIcon />
              <span style={styles.financialText}>--- USD USD</span>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.mainGrid}>
            <div style={styles.mainCol}>
              <div style={styles.notifyBar} role="status">
                System created 8D-Report for Performance Gap
              </div>

              <section style={styles.boardSection}>
                <div style={styles.sectionHead}>
                  <h2 style={styles.sectionTitle}>The Control Board</h2>
                  <span style={styles.sectionMeta}>8D workflow · Live</span>
                </div>
                <div style={styles.taskGrid}>
                  {CONTROL_BOARD_TASKS.map((t) => (
                    <article key={t.phase} style={styles.taskCard}>
                      <div style={styles.taskCardTop}>
                        <span style={styles.phaseBadge}>{t.phase}</span>
                        <span style={styles.statusTag}>{t.tag}</span>
                      </div>
                      <h3 style={styles.taskTitle}>{t.title}</h3>
                      <dl style={styles.taskMeta}>
                        <div style={styles.metaRow}>
                          <dt style={styles.metaDt}>Assignee</dt>
                          <dd style={styles.metaDd}>{t.assignee}</dd>
                        </div>
                        <div style={styles.metaRow}>
                          <dt style={styles.metaDt}>Role</dt>
                          <dd style={styles.metaDd}>{t.role}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside style={styles.trafficAside} aria-label="Traffic light status">
              <h2 style={styles.trafficTitle}>Traffic Light Status</h2>
              <p style={styles.trafficHint}>Plant-wide composite</p>
              <div style={styles.trafficLights}>
                <div style={styles.trafficCol}>
                  <div style={{ ...styles.trafficOrb, ...styles.orbGreen, ...styles.orbActive }} />
                  <span style={styles.trafficLabel}>Green</span>
                </div>
                <div style={styles.trafficCol}>
                  <div style={{ ...styles.trafficOrb, ...styles.orbYellow }} />
                  <span style={styles.trafficLabel}>Yellow</span>
                </div>
                <div style={styles.trafficCol}>
                  <div style={{ ...styles.trafficOrb, ...styles.orbRed }} />
                  <span style={styles.trafficLabel}>Red</span>
                </div>
              </div>
              <div style={styles.trafficFooter}>
                <span style={styles.trafficSummary}>Overall: LOW risk</span>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

const borderCard = "1px solid rgba(56, 78, 110, 0.85)";
const bgNavy = "#0a1220";
const bgPanel = "#0f1a2d";
const bgCard = "#111f36";

const styles: Record<string, CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: bgNavy,
    color: "#e8eef7",
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  sidebar: {
    width: "260px",
    flexShrink: 0,
    background: "linear-gradient(180deg, #0c1628 0%, #0a1220 100%)",
    borderRight: borderCard,
    display: "flex",
    flexDirection: "column",
    padding: "1.25rem 0",
  },
  sidebarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0 1.25rem 1.25rem",
    borderBottom: borderCard,
    marginBottom: "0.5rem",
  },
  brandMark: {
    width: "10px",
    height: "36px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #38bdf8, #2563eb)",
  },
  brandTitle: {
    fontWeight: 800,
    fontSize: "0.95rem",
    letterSpacing: "0.02em",
    color: "#f8fafc",
  },
  brandSub: {
    fontSize: "0.72rem",
    color: "#7b8fab",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginTop: "2px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "0 0.65rem",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    border: "none",
    borderRadius: "8px",
    padding: "0.65rem 0.85rem",
    background: "transparent",
    color: "#9fb0c8",
    fontSize: "0.82rem",
    fontWeight: 600,
    textAlign: "left",
    cursor: "pointer",
  },
  navItemActive: {
    background: "rgba(37, 99, 235, 0.18)",
    color: "#e8f0ff",
    boxShadow: "inset 0 0 0 1px rgba(56, 130, 246, 0.35)",
  },
  navBullet: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#3d5a80",
    flexShrink: 0,
  },
  sidebarFooter: {
    padding: "1rem 1.25rem 0",
    borderTop: borderCard,
    marginTop: "auto",
  },
  sidebarLink: {
    fontSize: "0.78rem",
    color: "#7b8fab",
    textDecoration: "none",
    fontWeight: 600,
  },
  mainWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  topBar: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "1rem",
    padding: "0.85rem 1.5rem",
    background: bgPanel,
    borderBottom: borderCard,
  },
  topBarLeft: { minHeight: "1px" },
  topBarCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.65rem",
  },
  topBarRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  riskPill: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(22, 163, 74, 0.12)",
    border: "1px solid rgba(34, 197, 94, 0.45)",
    borderRadius: "999px",
    padding: "0.35rem 0.85rem",
  },
  riskLabel: {
    fontSize: "0.68rem",
    color: "#86efac",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: 700,
  },
  riskValue: {
    fontSize: "0.85rem",
    fontWeight: 800,
    color: "#4ade80",
  },
  iatfBadge: {
    fontSize: "0.65rem",
    fontWeight: 800,
    letterSpacing: "0.05em",
    color: "#0f172a",
    background: "linear-gradient(90deg, #4ade80, #22c55e)",
    padding: "0.4rem 0.65rem",
    borderRadius: "6px",
  },
  langSwitch: {
    display: "flex",
    borderRadius: "8px",
    overflow: "hidden",
    border: borderCard,
  },
  langBtn: {
    border: "none",
    background: "transparent",
    color: "#8fa3bf",
    fontSize: "0.72rem",
    fontWeight: 700,
    padding: "0.4rem 0.65rem",
    cursor: "pointer",
  },
  langBtnActive: {
    background: "rgba(56, 130, 246, 0.25)",
    color: "#dbeafe",
  },
  silenceBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    border: borderCard,
    borderRadius: "8px",
    background: "rgba(15, 23, 42, 0.5)",
    color: "#cbd5e1",
    fontSize: "0.72rem",
    fontWeight: 600,
    padding: "0.4rem 0.75rem",
    cursor: "pointer",
  },
  financialCounter: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#94a3b8",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    padding: "0.45rem 0.85rem",
    borderRadius: "10px",
    border: borderCard,
    background: "rgba(10, 18, 32, 0.6)",
  },
  financialText: {
    color: "#cbd5e1",
  },
  main: {
    flex: 1,
    padding: "1.25rem 1.5rem 1.5rem",
    overflow: "auto",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr minmax(220px, 280px)",
    gap: "1.25rem",
    alignItems: "start",
  },
  mainCol: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  notifyBar: {
    background: "linear-gradient(90deg, rgba(22, 163, 74, 0.25), rgba(34, 197, 94, 0.12))",
    border: "1px solid rgba(34, 197, 94, 0.45)",
    color: "#bbf7d0",
    fontSize: "0.82rem",
    fontWeight: 600,
    padding: "0.65rem 1rem",
    borderRadius: "10px",
  },
  boardSection: {
    background: bgPanel,
    border: borderCard,
    borderRadius: "12px",
    padding: "1.1rem 1.15rem 1.25rem",
  },
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "1rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#f1f5f9",
  },
  sectionMeta: {
    fontSize: "0.72rem",
    color: "#64748b",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "0.75rem",
  },
  taskCard: {
    background: bgCard,
    border: borderCard,
    borderRadius: "10px",
    padding: "0.85rem 0.9rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
  },
  taskCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  phaseBadge: {
    fontSize: "0.7rem",
    fontWeight: 800,
    color: "#93c5fd",
    letterSpacing: "0.06em",
  },
  statusTag: {
    fontSize: "0.62rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#422006",
    background: "#facc15",
    border: "1px solid rgba(250, 204, 21, 0.6)",
    padding: "0.2rem 0.45rem",
    borderRadius: "6px",
  },
  taskTitle: {
    margin: "0 0 0.65rem",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#e2e8f0",
    lineHeight: 1.35,
  },
  taskMeta: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  metaRow: {
    display: "grid",
    gridTemplateColumns: "72px 1fr",
    gap: "0.35rem",
    fontSize: "0.72rem",
  },
  metaDt: {
    margin: 0,
    color: "#64748b",
    fontWeight: 600,
  },
  metaDd: {
    margin: 0,
    color: "#cbd5e1",
    fontWeight: 600,
  },
  trafficAside: {
    background: bgPanel,
    border: borderCard,
    borderRadius: "12px",
    padding: "1.1rem",
    position: "sticky",
    top: "1rem",
  },
  trafficTitle: {
    margin: "0 0 0.25rem",
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "#f8fafc",
  },
  trafficHint: {
    margin: "0 0 1rem",
    fontSize: "0.72rem",
    color: "#64748b",
    fontWeight: 600,
  },
  trafficLights: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  trafficCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.45rem",
    width: "100%",
  },
  trafficOrb: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    border: "3px solid rgba(30, 41, 59, 0.9)",
    boxSizing: "border-box",
  },
  orbGreen: {
    background: "radial-gradient(circle at 30% 30%, #86efac, #16a34a)",
  },
  orbYellow: {
    background: "radial-gradient(circle at 30% 30%, #fde047, #ca8a04)",
    opacity: 0.45,
  },
  orbRed: {
    background: "radial-gradient(circle at 30% 30%, #fca5a5, #b91c1c)",
    opacity: 0.35,
  },
  orbActive: {
    boxShadow: "0 0 28px rgba(34, 197, 94, 0.55)",
    opacity: 1,
  },
  trafficLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  trafficFooter: {
    marginTop: "1.1rem",
    paddingTop: "0.85rem",
    borderTop: borderCard,
    textAlign: "center",
  },
  trafficSummary: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#4ade80",
  },
};
