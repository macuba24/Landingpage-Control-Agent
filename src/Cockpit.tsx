import { useEffect, useRef, useState, type CSSProperties } from "react";

const NAV_ITEMS = [
  "Dashboard Overview",
  "Active 8D-Reports",
  "Supply Agent",
  "Flow Agent",
  "Quality Agent",
  "Investment & ROI",
] as const;

type NavKey = (typeof NAV_ITEMS)[number];

type EightDReport = {
  id: string;
  title: string;
  owner: string;
  status: string;
};

type SupplySnapshot = {
  stockRiskPercent: number;
  delayAlertCount: number;
};

const STOCK_RISK_THRESHOLD_PCT = 5;

const INITIAL_REPORTS: EightDReport[] = [
  {
    id: "8d-1042",
    title: "8D-1042 · Supplier Variance",
    owner: "Quality Agent",
    status: "Open",
  },
  {
    id: "8d-1041",
    title: "8D-1041 · Torque Drift Line B",
    owner: "Quality Agent",
    status: "Open",
  },
  {
    id: "8d-1039",
    title: "8D-1039 · Surface Finish Deviation",
    owner: "Quality Agent",
    status: "Open",
  },
];

/** Replace with Supply Agent / inventory API response mapping. */
async function fetchSupplySnapshot(): Promise<SupplySnapshot> {
  return { stockRiskPercent: 2.1, delayAlertCount: 0 };
}

function randomSapLatencyNormal(): number {
  return Math.floor(135 + Math.random() * 21);
}

function randomSapLatencyGlitch(): number {
  return Math.floor(181 + Math.random() * 25);
}

const INVESTMENT_METRICS = {
  primary: "EBITDA Loss Prevented: $14,450",
  secondary: "Downtime Cost: $1,340 / hour",
  tertiary: "Annualized ROI: 27.6%",
} as const;

type FlowTelemetry = {
  lines: {
    id: string;
    label: string;
    lineSpeedPct: number;
    taktSec: number;
    wipUnits: number;
  }[];
  bottleneckAlerts: {
    id: string;
    station: string;
    queueDepth: number;
    severity: "watch" | "elevated";
  }[];
};

const INITIAL_FLOW_TELEMETRY: FlowTelemetry = {
  lines: [
    {
      id: "LA",
      label: "Line A — Final Assembly",
      lineSpeedPct: 94.8,
      taktSec: 58,
      wipUnits: 122,
    },
    {
      id: "LB",
      label: "Line B — Powertrain",
      lineSpeedPct: 91.2,
      taktSec: 52,
      wipUnits: 84,
    },
    {
      id: "LC",
      label: "Line C — Sub-assembly",
      lineSpeedPct: 97.1,
      taktSec: 44,
      wipUnits: 56,
    },
  ],
  bottleneckAlerts: [
    {
      id: "b1",
      station: "OP-240 · Weld cell",
      queueDepth: 14,
      severity: "elevated",
    },
    {
      id: "b2",
      station: "OP-110 · Stamping",
      queueDepth: 6,
      severity: "watch",
    },
  ],
};

type QualityBoard = {
  fpy: number;
  openNcr: number;
  criticalDefects: number;
  inspections: {
    id: string;
    title: string;
    result: string;
    owner: string;
  }[];
};

const INITIAL_QUALITY_BOARD: QualityBoard = {
  fpy: 98.4,
  openNcr: 3,
  criticalDefects: 0,
  inspections: [
    {
      id: "insp-1",
      title: "First-piece layout · Door panel LH",
      result: "Pass",
      owner: "Shift 1",
    },
    {
      id: "insp-2",
      title: "Torque audit · OP-180",
      result: "Hold",
      owner: "Shift 2",
    },
    {
      id: "insp-3",
      title: "Surface scan · Hood outer",
      result: "Pass",
      owner: "Shift 1",
    },
  ],
};

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

function supplyIsStable(s: SupplySnapshot): boolean {
  return (
    s.stockRiskPercent < STOCK_RISK_THRESHOLD_PCT && s.delayAlertCount === 0
  );
}

function buildSupplyMetrics(
  supply: SupplySnapshot,
  sapMardLatencyMs: number | null,
): { primary: string; secondary: string; tertiary: string } {
  return {
    primary: `Stock Risk: ${supply.stockRiskPercent.toFixed(1)}%`,
    secondary: `Supplier Delay Alerts: ${supply.delayAlertCount}`,
    tertiary:
      sapMardLatencyMs != null
        ? `SAP-MARD Latency: ${sapMardLatencyMs}ms`
        : "SAP-MARD Latency: …",
  };
}

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
  const [activeNav, setActiveNav] = useState<NavKey>("Dashboard Overview");
  const [sapMardLatencyMs, setSapMardLatencyMs] = useState<number | null>(145);
  const [supplySnapshot, setSupplySnapshot] = useState<SupplySnapshot>({
    stockRiskPercent: 2.1,
    delayAlertCount: 0,
  });
  const [reports, setReports] = useState<EightDReport[]>(INITIAL_REPORTS);
  const [supplyStressNonce, setSupplyStressNonce] = useState(0);
  const [flowTelemetry, setFlowTelemetry] = useState<FlowTelemetry>(
    INITIAL_FLOW_TELEMETRY,
  );
  const [qualityBoard, setQualityBoard] = useState<QualityBoard>(
    INITIAL_QUALITY_BOARD,
  );

  const prevSupplyStableRef = useRef<boolean | null>(null);

  /**
   * Live simulations (SAP, supply pulse, flow, quality) mount once and keep running
   * while you switch sidebar views — `activeNav` does not start/stop these intervals.
   */
  /** SAP-MARD latency: ~135–155ms every 3s; occasional simulated glitch >180ms. */
  useEffect(() => {
    const GLITCH_CHANCE = 0.12;

    function tick() {
      setSapMardLatencyMs(() => {
        const glitch = Math.random() < GLITCH_CHANCE;
        return glitch ? randomSapLatencyGlitch() : randomSapLatencyNormal();
      });
    }

    tick();
    const id = window.setInterval(tick, 3000);
    return () => window.clearInterval(id);
  }, []);

  /** Flow Agent telemetry pulse (always on — view switching does not stop updates). */
  useEffect(() => {
    const id = window.setInterval(() => {
      setFlowTelemetry((prev) => ({
        lines: prev.lines.map((line) => {
          const delta = (Math.random() - 0.5) * 0.9;
          const next = Math.min(100, Math.max(82, line.lineSpeedPct + delta));
          return {
            ...line,
            lineSpeedPct: Math.round(next * 10) / 10,
            wipUnits: Math.max(
              20,
              Math.round(line.wipUnits + (Math.random() - 0.5) * 6),
            ),
          };
        }),
        bottleneckAlerts: prev.bottleneckAlerts.map((b) => ({
          ...b,
          queueDepth: Math.max(
            0,
            Math.round(b.queueDepth + (Math.random() - 0.5) * 3),
          ),
        })),
      }));
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  /** Quality board micro-pulse (always on). */
  useEffect(() => {
    const id = window.setInterval(() => {
      setQualityBoard((prev) => {
        const fpyDelta = (Math.random() - 0.5) * 0.12;
        const nextFpy = Math.min(99.5, Math.max(96.5, prev.fpy + fpyDelta));
        return {
          ...prev,
          fpy: Math.round(nextFpy * 10) / 10,
        };
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  /** Supply Agent: stock risk micro-pulse while plant is in normal (non-stress) range. */
  useEffect(() => {
    const id = window.setInterval(() => {
      setSupplySnapshot((prev) => {
        if (
          prev.stockRiskPercent >= STOCK_RISK_THRESHOLD_PCT ||
          prev.delayAlertCount > 0
        ) {
          return prev;
        }
        const next = 2.0 + Math.random() * 0.3;
        return {
          ...prev,
          stockRiskPercent: Math.round(next * 10) / 10,
        };
      });
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSupply() {
      try {
        const snap = await fetchSupplySnapshot();
        if (!cancelled) setSupplySnapshot(snap);
      } catch {
        /* keep last snapshot; real app should surface error UI */
      }
    }

    loadSupply();
    return () => {
      cancelled = true;
    };
  }, [supplyStressNonce]);

  useEffect(() => {
    const stable = supplyIsStable(supplySnapshot);
    const prev = prevSupplyStableRef.current;

    if (prev === true && stable === false) {
      const reasons: string[] = [];
      if (supplySnapshot.stockRiskPercent >= STOCK_RISK_THRESHOLD_PCT) {
        reasons.push(`Stock risk ${supplySnapshot.stockRiskPercent.toFixed(1)}%`);
      }
      if (supplySnapshot.delayAlertCount > 0) {
        reasons.push(
          `${supplySnapshot.delayAlertCount} supplier delay alert(s)`,
        );
      }
      const suffix = reasons.join(" · ");
      const serial = Date.now().toString().slice(-6);
      const id = `8d-supply-${serial}`;
      const title = `8D-${serial} · Supply risk: ${suffix}`;

      setReports((prevReports) => {
        if (prevReports.some((r) => r.id === id)) return prevReports;
        return [
          {
            id,
            title,
            owner: "Supply Agent",
            status: "Open",
          },
          ...prevReports,
        ];
      });
    }

    prevSupplyStableRef.current = stable;
  }, [supplySnapshot]);

  const sectionTitle =
    activeNav === "Dashboard Overview" ? "The Control Board" : activeNav;

  const isDashboard = activeNav === "Dashboard Overview";
  const isReports = activeNav === "Active 8D-Reports";

  const supplyStable = supplyIsStable(supplySnapshot);

  /** SAP glitch still tracked for latency display; baseline ops = yellow “monitor” lamp. */
  const sapLatencyHigh =
    sapMardLatencyMs != null && sapMardLatencyMs > 180;
  const trafficYellowBaseline = true;
  const globalRiskLevel =
    trafficYellowBaseline || sapLatencyHigh ? "MEDIUM" : "LOW";

  const notificationMessage = (() => {
    if (!supplyStable) {
      return "Supply Agent escalated inventory risk — new 8D report logged";
    }
    switch (activeNav) {
      case "Supply Agent":
        return "Supply Agent detected stable inventory flow";
      case "Dashboard Overview":
        return "System created 8D-Report for Performance Gap";
      case "Active 8D-Reports":
        return "8D pipeline synchronized with latest factory updates";
      case "Flow Agent":
        return "Flow Agent confirms balanced throughput on active lines";
      case "Quality Agent":
        return "Quality Agent flagged zero critical non-conformities";
      case "Investment & ROI":
        return "ROI model refreshed with latest prevention savings";
      default:
        return "";
    }
  })();

  const notifyBarStyle = supplyStable
    ? styles.notifyBar
    : { ...styles.notifyBar, ...styles.notifyBarRisk };

  const supplyMetrics =
    activeNav === "Supply Agent"
      ? buildSupplyMetrics(supplySnapshot, sapMardLatencyMs)
      : null;

  const sectionMeta = (() => {
    switch (activeNav) {
      case "Dashboard Overview":
        return "8D workflow · Live";
      case "Active 8D-Reports":
        return `${reports.length} active reports · queue`;
      case "Supply Agent":
        return "Inventory + SAP-MARD stream";
      case "Flow Agent":
        return "Throughput + bottleneck monitor";
      case "Quality Agent":
        return "Inspection + NCR cockpit";
      case "Investment & ROI":
        return "Prevention economics";
    }
  })();

  function runSupplyStressDemo() {
    setSupplySnapshot((prev) => ({
      stockRiskPercent: Math.max(prev.stockRiskPercent, 6.2),
      delayAlertCount: Math.max(prev.delayAlertCount, 2),
    }));
  }

  const riskPillStyle = {
    ...styles.riskPill,
    ...(trafficYellowBaseline || sapLatencyHigh ? styles.riskPillMedium : {}),
  };
  const riskValueStyle = {
    ...styles.riskValue,
    ...(trafficYellowBaseline || sapLatencyHigh ? styles.riskValueMedium : {}),
  };

  return (
    <div style={styles.shell}>
      <style>{`
        @keyframes live-dot-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.65); }
          50% { opacity: 0.3; box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
        }
        @keyframes traffic-yellow-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(250, 204, 21, 0.55); transform: scale(1); }
          50% { box-shadow: 0 0 28px rgba(250, 204, 21, 0.85); transform: scale(1.04); }
        }
        @keyframes return-cta-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.5); transform: translateY(0); }
          50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); transform: translateY(-1px); }
        }
      `}</style>
      <aside style={styles.sidebar} aria-label="Main navigation">
        <div style={styles.sidebarBrand}>
          <span style={styles.brandMark} />
          <div>
            <div style={styles.brandTitle}>Master Console</div>
            <div style={styles.brandSub}>Control Agent</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveNav(label)}
              style={{
                ...styles.navItem,
                ...(label === activeNav ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navBullet} />
              {label}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <span style={styles.sidebarFooterNote}>Control Agent · Master Console</span>
        </div>
      </aside>

      <div style={styles.mainWrap}>
        <div style={styles.returnBar}>
          <span style={styles.returnBarTitle}>Master Console</span>
          <a
            href="https://landingpage-control-agent.onrender.com/#audit"
            style={styles.returnCta}
          >
            ← ZURUECK ZUM RISIKO-AUDIT
          </a>
        </div>
        <header style={styles.topBar}>
          <div style={styles.topBarLeft} />
          <div style={styles.topBarCenter}>
            <div style={riskPillStyle}>
              <span style={styles.riskLabel}>Global Risk Level</span>
              <span style={riskValueStyle}>{globalRiskLevel}</span>
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
              <div style={notifyBarStyle} role="status">
                {notificationMessage}
              </div>

              <section style={styles.boardSection}>
                <div style={styles.sectionHead}>
                  <h2 style={styles.sectionTitle}>{sectionTitle}</h2>
                  <span style={styles.sectionMeta}>{sectionMeta}</span>
                </div>

                {isDashboard && (
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
                )}

                {isReports && (
                  <div style={styles.reportsList}>
                    {reports.map((report) => (
                      <article key={report.id} style={styles.reportCard}>
                        <div style={styles.reportTitle}>{report.title}</div>
                        <div style={styles.reportMetaRow}>
                          <span style={styles.reportMeta}>Owner: {report.owner}</span>
                          <span style={styles.statusTag}>{report.status}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {activeNav === "Supply Agent" && supplyMetrics && (
                  <div style={styles.agentPanel}>
                    <div style={styles.sapStatusRow}>
                      <span style={styles.liveDot} aria-hidden />
                      <span style={styles.sapStatusText}>
                        SAP-MARD Status: Secure
                      </span>
                      {sapMardLatencyMs != null && (
                        <span style={styles.sapLatencyInline}>
                          {sapMardLatencyMs}ms
                        </span>
                      )}
                      <span style={styles.liveBadge}>Live</span>
                    </div>
                    <div style={styles.agentMetrics}>
                      <div style={styles.agentMetricCard}>{supplyMetrics.primary}</div>
                      <div style={styles.agentMetricCard}>{supplyMetrics.secondary}</div>
                      <div style={styles.agentMetricCard}>{supplyMetrics.tertiary}</div>
                    </div>
                    <div style={styles.agentActions}>
                      <button
                        type="button"
                        style={styles.actionBtn}
                        onClick={() => runSupplyStressDemo()}
                      >
                        Run Analysis
                      </button>
                      <button type="button" style={styles.actionBtn}>
                        Open Detailed View
                      </button>
                      <button
                        type="button"
                        style={styles.actionBtnSecondary}
                        onClick={() => setSupplyStressNonce((n) => n + 1)}
                      >
                        Refresh supply data
                      </button>
                    </div>
                  </div>
                )}

                {activeNav === "Flow Agent" && (
                  <div style={styles.agentPanel}>
                    <p style={styles.agentIntro}>
                      Live production flow — line speed vs target takt, WIP exposure, and
                      bottleneck queue depth (placeholder telemetry; replace with line
                      SCADA / MES feed).
                    </p>
                    <div style={styles.subsectionLabel}>Production lines</div>
                    <div style={styles.flowLineGrid}>
                      {flowTelemetry.lines.map((line) => (
                        <article key={line.id} style={styles.flowLineCard}>
                          <div style={styles.flowLineTitle}>{line.label}</div>
                          <div style={styles.flowLineMetrics}>
                            <span>
                              Line speed:{" "}
                              <strong>{line.lineSpeedPct.toFixed(1)}%</strong> of target
                            </span>
                            <span>
                              Takt: <strong>{line.taktSec}s</strong>
                            </span>
                            <span>
                              WIP: <strong>{line.wipUnits}</strong> units
                            </span>
                          </div>
                          <span
                            style={{
                              ...styles.flowStatusPill,
                              ...(line.lineSpeedPct < 92
                                ? styles.flowStatusWarn
                                : {}),
                            }}
                          >
                            {line.lineSpeedPct < 92 ? "Watch" : "Nominal"}
                          </span>
                        </article>
                      ))}
                    </div>
                    <div style={styles.subsectionLabel}>Bottleneck alerts</div>
                    <div style={styles.tableWrap}>
                      <table style={styles.dataTable}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Station</th>
                            <th style={styles.th}>Queue depth</th>
                            <th style={styles.th}>Severity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {flowTelemetry.bottleneckAlerts.map((b) => (
                            <tr key={b.id}>
                              <td style={styles.td}>{b.station}</td>
                              <td style={styles.td}>{b.queueDepth} jobs</td>
                              <td style={styles.td}>
                                <span
                                  style={{
                                    ...styles.severityPill,
                                    ...(b.severity === "elevated"
                                      ? styles.severityElevated
                                      : styles.severityWatch),
                                  }}
                                >
                                  {b.severity}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={styles.agentActions}>
                      <button type="button" style={styles.actionBtn}>
                        Run Analysis
                      </button>
                      <button type="button" style={styles.actionBtn}>
                        Open Detailed View
                      </button>
                    </div>
                  </div>
                )}

                {activeNav === "Quality Agent" && (
                  <div style={styles.agentPanel}>
                    <p style={styles.agentIntro}>
                      Quality cockpit — first-pass yield, containment, and inspection
                      queue (placeholder; connect to QMS / LIMS).
                    </p>
                    <div style={styles.agentMetrics}>
                      <div style={styles.agentMetricCard}>
                        FPY: {qualityBoard.fpy.toFixed(1)}%
                      </div>
                      <div style={styles.agentMetricCard}>
                        Open NCR: {qualityBoard.openNcr}
                      </div>
                      <div style={styles.agentMetricCard}>
                        Critical defects: {qualityBoard.criticalDefects}
                      </div>
                    </div>
                    <div style={styles.subsectionLabel}>Inspection queue</div>
                    <div style={styles.reportsList}>
                      {qualityBoard.inspections.map((row) => (
                        <article key={row.id} style={styles.reportCard}>
                          <div style={styles.reportTitle}>{row.title}</div>
                          <div style={styles.reportMetaRow}>
                            <span style={styles.reportMeta}>
                              {row.owner} · Result: {row.result}
                            </span>
                            <span
                              style={{
                                ...styles.statusTag,
                                ...(row.result === "Hold"
                                  ? styles.statusTagAlert
                                  : {}),
                              }}
                            >
                              {row.result}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div style={styles.agentActions}>
                      <button type="button" style={styles.actionBtn}>
                        Run Analysis
                      </button>
                      <button type="button" style={styles.actionBtn}>
                        Open Detailed View
                      </button>
                    </div>
                  </div>
                )}

                {activeNav === "Investment & ROI" && (
                  <div style={styles.agentPanel}>
                    <p style={styles.agentIntro}>
                      Financial prevention view — EBITDA protected, downtime cost, and
                      ROI model (static placeholder metrics).
                    </p>
                    <div style={styles.agentMetrics}>
                      <div style={styles.agentMetricCard}>
                        {INVESTMENT_METRICS.primary}
                      </div>
                      <div style={styles.agentMetricCard}>
                        {INVESTMENT_METRICS.secondary}
                      </div>
                      <div style={styles.agentMetricCard}>
                        {INVESTMENT_METRICS.tertiary}
                      </div>
                    </div>
                    <div style={styles.agentActions}>
                      <button type="button" style={styles.actionBtn}>
                        Run Analysis
                      </button>
                      <button type="button" style={styles.actionBtn}>
                        Open Detailed View
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <aside style={styles.trafficAside} aria-label="Traffic light status">
              <h2 style={styles.trafficTitle}>Traffic Light Status</h2>
              <p style={styles.trafficHint}>Plant-wide composite</p>
              <div style={styles.trafficLights}>
                <div style={styles.trafficCol}>
                  <div
                    style={{
                      ...styles.trafficOrb,
                      ...styles.orbGreen,
                      ...(trafficYellowBaseline ? styles.orbDim : styles.orbActive),
                    }}
                  />
                  <span style={styles.trafficLabel}>Green</span>
                </div>
                <div style={styles.trafficCol}>
                  <div
                    style={{
                      ...styles.trafficOrb,
                      ...styles.orbYellow,
                      ...styles.orbYellowActive,
                      opacity: 1,
                      animation: "traffic-yellow-pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span style={styles.trafficLabel}>Yellow</span>
                </div>
                <div style={styles.trafficCol}>
                  <div style={{ ...styles.trafficOrb, ...styles.orbRed, ...styles.orbDim }} />
                  <span style={styles.trafficLabel}>Red</span>
                </div>
              </div>
              <div style={styles.trafficFooter}>
                <span
                  style={
                    trafficYellowBaseline || sapLatencyHigh
                      ? { ...styles.trafficSummary, ...styles.trafficSummaryMedium }
                      : styles.trafficSummary
                  }
                >
                  Overall: {globalRiskLevel} risk · Monitor
                </span>
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
  sidebarFooterNote: {
    fontSize: "0.72rem",
    color: "#64748b",
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  mainWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  returnBar: {
    position: "sticky",
    top: 0,
    zIndex: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.7rem 1.5rem",
    background: "#06090E",
    borderBottom: borderCard,
  },
  returnBarTitle: {
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8FA3BF",
  },
  returnCta: {
    textDecoration: "none",
    background: "#DC2626",
    color: "#FFFFFF",
    border: "1px solid rgba(248, 113, 113, 0.45)",
    borderRadius: "8px",
    padding: "0.45rem 0.8rem",
    fontSize: "0.7rem",
    fontWeight: 800,
    letterSpacing: "0.04em",
    animation: "return-cta-pulse 1.7s ease-in-out infinite",
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
  riskPillMedium: {
    background: "rgba(234, 179, 8, 0.14)",
    border: "1px solid rgba(250, 204, 21, 0.55)",
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
  riskValueMedium: {
    color: "#facc15",
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
  notifyBarRisk: {
    background: "linear-gradient(90deg, rgba(234, 179, 8, 0.22), rgba(234, 179, 8, 0.08))",
    border: "1px solid rgba(250, 204, 21, 0.55)",
    color: "#fef08a",
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
  orbYellowActive: {
    boxShadow: "0 0 26px rgba(250, 204, 21, 0.65)",
  },
  orbRed: {
    background: "radial-gradient(circle at 30% 30%, #fca5a5, #b91c1c)",
    opacity: 0.35,
  },
  orbActive: {
    boxShadow: "0 0 28px rgba(34, 197, 94, 0.55)",
    opacity: 1,
  },
  orbDim: {
    opacity: 0.38,
    boxShadow: "none",
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
  trafficSummaryMedium: {
    color: "#facc15",
  },
  reportsList: {
    display: "grid",
    gap: "0.7rem",
  },
  reportCard: {
    background: bgCard,
    border: borderCard,
    borderRadius: "10px",
    padding: "0.85rem 0.9rem",
    display: "grid",
    gap: "0.5rem",
  },
  reportTitle: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  reportMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.8rem",
    flexWrap: "wrap",
  },
  reportMeta: {
    fontSize: "0.72rem",
    color: "#94a3b8",
    fontWeight: 600,
  },
  agentPanel: {
    display: "grid",
    gap: "0.9rem",
  },
  sapStatusRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    border: borderCard,
    background: "rgba(10, 18, 32, 0.55)",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#22c55e",
    animation: "live-dot-pulse 1.2s ease-in-out infinite",
    flexShrink: 0,
  },
  sapStatusText: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#cbd5e1",
  },
  liveBadge: {
    marginLeft: "auto",
    fontSize: "0.62rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "#86efac",
    textTransform: "uppercase",
  },
  sapLatencyInline: {
    fontSize: "0.72rem",
    color: "#7b8fab",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  agentIntro: {
    margin: 0,
    fontSize: "0.78rem",
    lineHeight: 1.5,
    color: "#94a3b8",
  },
  subsectionLabel: {
    fontSize: "0.68rem",
    fontWeight: 800,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#64748b",
  },
  flowLineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "0.65rem",
  },
  flowLineCard: {
    background: bgCard,
    border: borderCard,
    borderRadius: "10px",
    padding: "0.85rem",
    display: "grid",
    gap: "0.55rem",
    position: "relative",
  },
  flowLineTitle: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  flowLineMetrics: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.72rem",
    color: "#94a3b8",
  },
  flowStatusPill: {
    alignSelf: "flex-start",
    fontSize: "0.6rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "0.2rem 0.45rem",
    borderRadius: "6px",
    background: "rgba(34, 197, 94, 0.15)",
    color: "#86efac",
    border: "1px solid rgba(34, 197, 94, 0.35)",
  },
  flowStatusWarn: {
    background: "rgba(234, 179, 8, 0.12)",
    color: "#facc15",
    border: "1px solid rgba(250, 204, 21, 0.4)",
  },
  tableWrap: {
    borderRadius: "10px",
    border: borderCard,
    overflow: "hidden",
    background: bgCard,
  },
  dataTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.74rem",
  },
  th: {
    textAlign: "left",
    padding: "0.55rem 0.75rem",
    color: "#7b8fab",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    background: "rgba(10, 18, 32, 0.65)",
    borderBottom: borderCard,
  },
  td: {
    padding: "0.55rem 0.75rem",
    color: "#cbd5e1",
    borderBottom: borderCard,
  },
  severityPill: {
    fontSize: "0.58rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "0.15rem 0.4rem",
    borderRadius: "6px",
  },
  severityWatch: {
    background: "rgba(56, 130, 246, 0.15)",
    color: "#93c5fd",
  },
  severityElevated: {
    background: "rgba(234, 179, 8, 0.18)",
    color: "#facc15",
  },
  statusTagAlert: {
    color: "#7f1d1d",
    background: "#fecaca",
    border: "1px solid rgba(248, 113, 113, 0.55)",
  },
  agentMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "0.7rem",
  },
  agentMetricCard: {
    background: bgCard,
    border: borderCard,
    borderRadius: "10px",
    padding: "0.8rem",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#dbe7f5",
  },
  agentActions: {
    display: "flex",
    gap: "0.6rem",
    flexWrap: "wrap",
  },
  actionBtn: {
    border: borderCard,
    background: "rgba(37, 99, 235, 0.18)",
    color: "#dbeafe",
    borderRadius: "8px",
    padding: "0.45rem 0.75rem",
    fontSize: "0.74rem",
    fontWeight: 700,
    cursor: "pointer",
  },
  actionBtnSecondary: {
    border: borderCard,
    background: "rgba(15, 23, 42, 0.55)",
    color: "#cbd5e1",
    borderRadius: "8px",
    padding: "0.45rem 0.75rem",
    fontSize: "0.74rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};
