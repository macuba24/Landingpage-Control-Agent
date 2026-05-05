import cors from "cors";
import express from "express";
import path from "path";
import { z } from "zod";
import { ControlAgent } from "./controlAgent";
import { liveDataStore } from "./integration/liveDataStore";
import type { ActorContext, DStepId } from "./types";

const app = express();
const port = 4010;
const controlAgent = new ControlAgent();
const UI_ROLES = new Set(["TEAM_MEMBER", "CONTROL_OFFICER", "MANAGER", "CONTROL_MASTER", "FMEA_PROCESS_OWNER"]);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const rawRole = req.header("x-user-role");
  if (rawRole) {
    const normalized = rawRole.trim().toUpperCase();
    if (UI_ROLES.has(normalized)) {
      res.setHeader("Set-Cookie", `control_agent_role=${normalized}; Path=/; SameSite=Lax`);
    }
  }
  next();
});
app.use(express.static(path.resolve(process.cwd(), "public")));

function readRoleCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const pairs = cookieHeader.split(";").map((item) => item.trim());
  for (const pair of pairs) {
    if (pair.startsWith("control_agent_role=")) {
      const value = pair.slice("control_agent_role=".length).trim().toUpperCase();
      return UI_ROLES.has(value) ? value : null;
    }
  }
  return null;
}

const traceSchema = z.object({
  partId: z.string().min(1),
  processId: z.string().min(1),
});

const sapIngestionSchema = z.object({
  partId: z.string().min(1),
  processId: z.string().min(1),
  source: z.enum(["JSON_STREAM", "SQL_STREAM"]).default("JSON_STREAM"),
  qals: z.object({
    inspectionLotId: z.string().min(1),
    materialId: z.string().min(1),
    defectCode: z.string().min(1),
    defectText: z.string().min(1),
    lotStatus: z.enum(["OPEN", "CLOSED"]),
  }),
  mard: z.object({
    materialId: z.string().min(1),
    storageLocation: z.string().min(1),
    unrestrictedStock: z.number(),
    blockedStock: z.number(),
  }),
  afko: z.object({
    orderId: z.string().min(1),
    workCenter: z.string().min(1),
    equipmentId: z.string().min(1),
    plannedQty: z.number(),
  }),
  eket: z.array(
    z.object({
      agreementId: z.string().min(1),
      materialId: z.string().min(1),
      inboundQty: z.number(),
      dueDate: z.string().min(1),
      batchId: z.string().min(1),
    }),
  ),
});

const telemetryIngestionSchema = z.object({
  processId: z.string().min(1),
  outputPerHourRealtime: z.number(),
  targetOutputPerHour: z.number().default(52),
  cycleTimeRealtimeMinutes: z.number(),
  scrapRatePct: z.number().default(2.5),
  oeePct: z.number().default(78),
  operator: z.string().default("Carlos Mendez"),
  lineId: z.string().default("LINE-MEX-04"),
  machineState: z.enum(["RUNNING", "STOPPED", "DEGRADED"]),
  timestamp: z.string().min(1),
});

const stepOwnerSchema = z.object({
  stepId: z.enum(["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"]),
  dStepOwner: z.string().email(),
  deadlineAt: z.string().min(1),
});

const penaltyConfigSchema = z.object({
  stepId: z.enum(["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"]),
  hourlyPenaltyEur: z.number().nonnegative(),
  source: z.enum(["SAP", "MANUAL"]).default("MANUAL"),
});

const d7FmeaSchema = z.object({
  fmeaUpdateStatus: z.enum(["UPDATED", "NOT_REQUIRED", "PENDING"]),
  documentReference: z.string().min(1),
  verificationDate: z.string().min(1),
});

function actorFromHeaders(req: express.Request): ActorContext | null {
  const userId = req.header("x-user-id") ?? "";
  const email = req.header("x-user-email") ?? "";
  const rawRole = req.header("x-user-role") ?? "TEAM_MEMBER";
  const role =
    rawRole === "CONTROL_MASTER"
      ? "CONTROL_MASTER"
      : rawRole === "FMEA_PROCESS_OWNER"
        ? "FMEA_PROCESS_OWNER"
        : "TEAM_MEMBER";
  if (!userId || !email) return null;
  return { userId, email, role };
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "control-agent-master" });
});

app.get("/session/me", (req, res) => {
  const headerRole = (req.header("x-user-role") ?? "").trim().toUpperCase();
  if (UI_ROLES.has(headerRole)) {
    return res.json({ role: headerRole, source: "header" });
  }
  const cookieRole = readRoleCookie(req.header("cookie"));
  if (cookieRole) {
    return res.json({ role: cookieRole, source: "session-cookie" });
  }
  return res.json({ role: "TEAM_MEMBER", source: "default" });
});

/**
 * External SAP ingestion endpoint (preferred JSON/SQL stream over CSV).
 */
app.post("/ingestion/sap", (req, res) => {
  const parsed = sapIngestionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const payload = parsed.data;
  liveDataStore.upsertSap(
    { partId: payload.partId, processId: payload.processId },
    {
      qals: payload.qals,
      mard: payload.mard,
      afko: payload.afko,
      eket: payload.eket,
      source: payload.source,
      updatedAt: new Date().toISOString(),
    },
  );

  return res.status(202).json({
    message: "SAP stream payload accepted.",
    trace: { partId: payload.partId, processId: payload.processId },
    source: payload.source,
  });
});

/**
 * Real-time machine telemetry ingestion endpoint.
 */
app.post("/ingestion/telemetry", (req, res) => {
  const parsed = telemetryIngestionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const payload = parsed.data;

  liveDataStore.upsertTelemetry(payload.processId, payload);
  return res.status(202).json({
    message: "Telemetry payload accepted.",
    processId: payload.processId,
  });
});

/**
 * VIEW 1: Supply Chain Map (real-time supply monitoring)
 */
app.get("/dashboard/supply", (req, res) => {
  const parsed = traceSchema.safeParse({
    partId: req.query.partId ?? "PART-1001",
    processId: req.query.processId ?? "PROC-A01",
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const auditMode = String(req.query.auditMode ?? "false").toLowerCase() === "true";
  const supplyState = controlAgent.getSupplyDashboardState(parsed.data, auditMode);
  return res.json({
    view: "Supply Chain Map",
    stock: supplyState.stock,
    transit: supplyState.transit,
    riskLevel: supplyState.riskLevel,
    systemHealth: supplyState.systemHealth,
    eketScheduling: supplyState.supplyRows,
    complianceSummary: supplyState.complianceSummary,
    scenarioAExists: supplyState.scenarioAExists,
    flaggedIncomingShipments: supplyState.flaggedIncomingShipments,
    updatedAt: supplyState.updatedAt,
  });
});

app.post("/supply/demo-trigger-critical", (_req, res) => {
  controlAgent.resetSupplyDemoToCritical();
  return res.json({
    message: "Demo trigger executed. All mock scenarios reset to CRITICAL.",
  });
});

/**
 * VIEW 2: Internal Flow (bottleneck detection)
 */
app.get("/dashboard/flow", (req, res) => {
  const parsed = traceSchema.safeParse({
    partId: req.query.partId ?? "PART-1001",
    processId: req.query.processId ?? "PROC-A01",
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const state = controlAgent.getUnifiedState(parsed.data);
  return res.json({
    view: "Internal Flow",
    cycleTimeMinutes: state.flow.cycleTimeMinutes,
    bottleneck: state.flow.bottleneck,
    outputPerHour: state.flow.outputPerHour,
    telemetry: state.telemetry,
    deltaOutputPerHour: state.flowDelta.deltaOutputPerHour,
    pre8dDriftDetected: state.pre8d.driftDetected,
    latestPre8DWarning: state.pre8d.latestWarning,
    updatedAt: state.flow.updatedAt,
  });
});

app.post("/automation/flow-auto-8d", (req, res) => {
  const schema = traceSchema.extend({
    downtimeCostPerHourUsd: z.number().positive().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const result = controlAgent.evaluateFlowAutomation(
    { partId: parsed.data.partId, processId: parsed.data.processId },
    parsed.data.downtimeCostPerHourUsd ?? 50000,
  );
  return res.json({
    monitor: "Flow-to-8D Automation",
    threshold: "Realtime < 90% of Target OR Scrap > 4%",
    ...result,
  });
});

/**
 * VIEW 3: Risk-Control (monetary impact)
 */
app.get("/dashboard/risk", (req, res) => {
  const parsed = traceSchema.safeParse({
    partId: req.query.partId ?? "PART-1001",
    processId: req.query.processId ?? "PROC-A01",
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const state = controlAgent.getUnifiedState(parsed.data);
  return res.json({
    view: "Risk-Control",
    riskImpactEur: state.riskImpactEur,
    qualityDeviation: state.deviation,
    showGenerate8DButton: state.canGenerate8D,
  });
});

/**
 * Financial Risk Gauge for main dashboard.
 */
app.get("/dashboard/financial-gauge", (req, res) => {
  const reportId = typeof req.query.reportId === "string" ? req.query.reportId : undefined;
  const rawStepId = typeof req.query.stepId === "string" ? req.query.stepId : undefined;
  const stepId = rawStepId && ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"].includes(rawStepId)
    ? (rawStepId as DStepId)
    : undefined;

  return res.json({
    component: "Financial Risk Gauge",
    gauge: controlAgent.getFinancialRiskGauge(reportId, stepId),
  });
});

/**
 * ACTION: Generate 8D only when deviation exists.
 */
app.post("/quality/generate-8d", (req, res) => {
  const parsed = traceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const report = controlAgent.generate8DIfNeeded(parsed.data);
  if (!report) {
    return res.status(409).json({
      message: "No quality deviation detected. 8D generation disabled.",
      showGenerate8DButton: false,
    });
  }

  return res.status(201).json({
    message: "8D report generated.",
    showGenerate8DButton: true,
    report,
  });
});

/**
 * SAP 8D mapping visibility endpoint (QALS/MARD/AFKO).
 */
app.get("/quality/sap-8d-map", (req, res) => {
  const parsed = traceSchema.safeParse({
    partId: req.query.partId ?? "PART-1001",
    processId: req.query.processId ?? "PROC-A01",
  });
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const state = controlAgent.getUnifiedState(parsed.data);
  return res.json({
    mapping: {
      D2_ProblemDescription: { sourceTable: "QALS", data: state.sap.qals },
      D3_Containment: { sourceTable: "MARD", data: state.sap.mard },
      D4_RootCauseEquipment: { sourceTable: "AFKO", data: state.sap.afko },
    },
    d4Analytics: state.d4Analytics,
  });
});

/**
 * IATF transparency dashboard / public quality wall.
 * Access intent: all department leads (IATF 16949 Chapter 10.2 context).
 */
app.get("/quality/public-wall", (_req, res) => {
  // VIEW_ALL: all authenticated team members can see all data.
  return res.json({
    view: "Public Quality Wall",
    access: "ALL_DEPARTMENT_LEADS",
    open8DReports: controlAgent.getPublicQualityWall().filter((i) => i.status !== "CLOSED"),
  });
});

/**
 * D3 immediate containment helper (one-click SAP block transaction).
 */
app.post("/quality/d3-one-click-block", (req, res) => {
  const schema = z.object({
    partId: z.string().min(1),
    processId: z.string().min(1),
    batchId: z.string().min(1),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const blockResult = controlAgent.runSupplyEmergencyBlock(
    { partId: parsed.data.partId, processId: parsed.data.processId },
    parsed.data.batchId,
  );
  return res.json({
    message: blockResult.message,
    transaction: blockResult.transaction,
    emulatorUpdated: blockResult.emulatorUpdated,
  });
});

/**
 * Owner assignment / D-step edit matrix
 */
app.put("/quality/8d/:reportId/step-owner", (req, res) => {
  const actor = actorFromHeaders(req);
  if (!actor) {
    return res.status(401).json({ message: "Authentication required." });
  }
  const parsed = stepOwnerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const item = controlAgent.assignStepOwner(
      req.params.reportId,
      parsed.data.stepId as DStepId,
      parsed.data.dStepOwner,
      parsed.data.deadlineAt,
      actor,
    );
    return res.json({
      message: "D-step owner saved.",
      item,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    if (code === "OWNER_REQUIRED") return res.status(400).json({ message: code });
    if (code === "EDIT_FORBIDDEN") {
      return res.status(403).json({
        message:
          "Edit rights are restricted to D_Step_Owner or CONTROL_MASTER override.",
      });
    }
    return res.status(500).json({ message: "Unhandled assignment error." });
  }
});

app.put("/quality/8d/:reportId/step-signoff", (req, res) => {
  const actor = actorFromHeaders(req);
  if (!actor) return res.status(401).json({ message: "Authentication required." });
  const schema = z.object({
    stepId: z.enum(["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"]),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const item = controlAgent.signOffStep(
      req.params.reportId,
      parsed.data.stepId as DStepId,
      actor,
    );
    return res.json({ message: "Owner sign-off saved.", item });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    if (code === "OWNER_REQUIRED") return res.status(400).json({ message: code });
    if (code === "EDIT_FORBIDDEN") return res.status(403).json({ message: code });
    return res.status(500).json({ message: "Unhandled sign-off error." });
  }
});

app.post("/quality/8d/:reportId/d3-transaction", (req, res) => {
  const actor = actorFromHeaders(req);
  if (!actor) return res.status(401).json({ message: "Authentication required." });
  const schema = z.object({
    transactionId: z.string().min(1),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const item = controlAgent.addD3TransactionId(
      req.params.reportId,
      parsed.data.transactionId,
      actor,
    );
    return res.json({ message: "D3 transaction documented.", item });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    if (code === "TX_REQUIRED") return res.status(400).json({ message: code });
    if (code === "EDIT_FORBIDDEN") return res.status(403).json({ message: code });
    return res.status(500).json({ message: "Unhandled D3 transaction error." });
  }
});

app.put("/quality/8d/:reportId/d7-fmea-action", (req, res) => {
  const actor = actorFromHeaders(req);
  if (!actor) return res.status(401).json({ message: "Authentication required." });
  const parsed = d7FmeaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const item = controlAgent.setD7FmeaAction(req.params.reportId, parsed.data, actor);
    return res.json({
      message: "D7 preventive action saved.",
      item,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    if (code === "EDIT_FORBIDDEN") return res.status(403).json({ message: code });
    return res.status(500).json({ message: "Unhandled D7 update error." });
  }
});

/**
 * Early warning board feed for management.
 */
app.get("/quality/pre8d-warnings", (_req, res) => {
  return res.json({
    notify: "MANAGEMENT_BOARD",
    warnings: controlAgent.getPre8DWarnings(),
  });
});

/**
 * Execute reminder/escalation sweep (email/ticket simulation).
 */
app.post("/quality/run-escalation-cycle", (_req, res) => {
  const generated = controlAgent.evaluateDeadlineEscalations(new Date().toISOString());
  return res.json({
    message: "Escalation cycle executed.",
    generatedCount: generated.length,
    notifications: generated,
  });
});

app.get("/quality/notifications", (_req, res) => {
  return res.json({
    notifications: controlAgent.listNotifications(),
  });
});

app.get("/quality/financial-risk-alerts", (_req, res) => {
  return res.json({
    alerts: controlAgent.listFinancialRiskAlerts(),
  });
});

app.get("/config/penalties", (_req, res) => {
  return res.json({
    rates: controlAgent.listPenaltyRates(),
  });
});

app.put("/config/penalties", (req, res) => {
  const parsed = penaltyConfigSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const updated = controlAgent.setPenaltyRate(
    parsed.data.stepId as DStepId,
    parsed.data.hourlyPenaltyEur,
    parsed.data.source,
  );
  return res.json({
    message: "Penalty rate updated.",
    updated,
  });
});

app.get("/audit/trail", (_req, res) => {
  return res.json({
    events: controlAgent.listAuditTrail(),
  });
});

app.get("/audit/monthly-performance", (req, res) => {
  const monthKey = typeof req.query.monthKey === "string" ? req.query.monthKey : new Date().toISOString().slice(0, 7);
  return res.json(controlAgent.getMonthlyPerformanceReport(monthKey));
});

app.get("/reports/weekly-cost-summary", (_req, res) => {
  return res.json(controlAgent.getWeeklyCostSummary(new Date().toISOString()));
});

app.post("/quality/8d/:reportId/generate-final-pdf", (req, res) => {
  try {
    const pdf = controlAgent.generateFinal8DPdf(req.params.reportId);
    const archived = controlAgent.archiveFinal8D(pdf);
    return res.json({
      message: "Final 8D PDF generated and archived.",
      pdf,
      archived,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code.startsWith("OWNER_SIGN_OFF_MISSING:")) {
      return res.status(409).json({
        message: "PDF blocked: mandatory Owner_Sign_Off missing.",
        code,
      });
    }
    if (code === "D3_TRANSACTION_IDS_MISSING") {
      return res.status(409).json({
        message: "PDF blocked: D3 SAP transaction IDs are missing.",
        code,
      });
    }
    if (code === "D7_MANUAL_ENTRY_REQUIRED" || code === "D7_PENDING_FMEA") {
      return res.status(409).json({
        message: "PDF blocked: D7 FMEA preventive action is incomplete.",
        code,
      });
    }
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    return res.status(500).json({ message: "Unhandled PDF generation error." });
  }
});

app.post("/quality/8d/:reportId/send-customer", (req, res) => {
  const schema = z.object({
    recipientEmail: z.string().email(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  try {
    const result = controlAgent.sendToCustomer(req.params.reportId, parsed.data.recipientEmail);
    return res.json({
      message: "One-click customer send completed via Email API.",
      ...result,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code.startsWith("OWNER_SIGN_OFF_MISSING:")) {
      return res.status(409).json({
        message: "Send blocked: mandatory Owner_Sign_Off missing.",
        code,
      });
    }
    if (code === "D3_TRANSACTION_IDS_MISSING") {
      return res.status(409).json({
        message: "Send blocked: D3 SAP transaction IDs are missing.",
        code,
      });
    }
    if (code === "FMEA_EXPORT_BLOCKED") {
      return res.status(409).json({
        message:
          "Internal documents (FMEA) remain in-house as per IP policy.",
        code,
      });
    }
    if (code === "D7_MANUAL_ENTRY_REQUIRED" || code === "D7_PENDING_FMEA") {
      return res.status(409).json({
        message: "Send blocked: D7 FMEA preventive action is incomplete.",
        code,
      });
    }
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    return res.status(500).json({ message: "Unhandled customer send error." });
  }
});

app.get("/quality/internal-history", (_req, res) => {
  return res.json({
    records: controlAgent.listInternalQualityHistory(),
  });
});

app.get("/quality/distribution-receipts", (_req, res) => {
  return res.json({
    receipts: controlAgent.listDistributionReceipts(),
  });
});

/**
 * Security policy audit view: show only who/when for FMEA updates.
 */
app.get("/quality/8d/:reportId/d7-audit-view", (req, res) => {
  try {
    const view = controlAgent.getD7AuditView(req.params.reportId);
    return res.json({
      view,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "REPORT_NOT_FOUND") return res.status(404).json({ message: code });
    if (code === "D7_MANUAL_ENTRY_REQUIRED") return res.status(409).json({ message: code });
    return res.status(500).json({ message: "Unhandled D7 audit view error." });
  }
});

app.listen(port, () => {
  console.log(`Control Agent Master running at http://localhost:${port}`);
});
