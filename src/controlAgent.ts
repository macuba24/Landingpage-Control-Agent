import { FlowAgent } from "./agents/flowAgent";
import { SupplyEngine } from "./core/supply/SupplyEngine";
import { SapAdapter } from "./integration/sapAdapter";
import { TelemetryAdapter } from "./integration/telemetryAdapter";
import { QualityEngine } from "./quality/qualityEngine";
import type {
  ActorContext,
  AuditEvent,
  D7FmeaAction,
  DistributionReceipt,
  DStepId,
  DStepSignOff,
  DStepOwnership,
  EscalationNotification,
  EightDPdfPackage,
  EightDReport,
  FinancialRiskAlert,
  MonthlyPerformanceReport,
  PenaltyConfig,
  Pre8DWarning,
  PublicQualityWallItem,
  TraceLink,
  FinancialRiskGauge,
  WeeklyCostSummary,
  ArchivedQualityRecord,
} from "./types";

/**
 * CENTRAL_COMMAND: Source of truth.
 * Orchestrates supply + flow sensors and quality engine.
 */
export class ControlAgent {
  private readonly supplyEngine = new SupplyEngine();
  private readonly flowAgent = new FlowAgent();
  private readonly sapAdapter = new SapAdapter();
  private readonly telemetryAdapter = new TelemetryAdapter();
  private readonly qualityEngine = new QualityEngine();
  private readonly qualityWall: PublicQualityWallItem[] = [];
  private readonly pre8dWarnings: Pre8DWarning[] = [];
  private readonly notifications: EscalationNotification[] = [];
  private readonly financialRiskAlerts: FinancialRiskAlert[] = [];
  private readonly auditTrail: AuditEvent[] = [];
  private readonly internalQualityHistory: ArchivedQualityRecord[] = [];
  private readonly distributionReceipts: DistributionReceipt[] = [];
  private readonly penaltyRates = new Map<DStepId, PenaltyConfig>([
    [
      "D3",
      {
        stepId: "D3",
        hourlyPenaltyEur: 1500,
        source: "MANUAL",
        updatedAt: new Date().toISOString(),
      },
    ],
    [
      "D4",
      {
        stepId: "D4",
        hourlyPenaltyEur: 2200,
        source: "MANUAL",
        updatedAt: new Date().toISOString(),
      },
    ],
  ]);
  private readonly flowDeltaHistory = new Map<string, number[]>();
  private readonly sapUserDirectory = new Map<string, string>([
    ["qa.lead@company.com", "SAP-QA-100"],
    ["prod.lead@company.com", "SAP-PR-201"],
    ["supply.lead@company.com", "SAP-SC-332"],
  ]);
  private readonly controlMasterEmail = "control.master@company.com";
  private readonly mandatoryFmeaOwner = "qa.lead@company.com";
  private auto8dSequence = 1;

  private emptyStepOwnership(): Record<DStepId, DStepOwnership | null> {
    const now = Date.now();
    return {
      D1: null,
      D2: null,
      D3: {
        stepId: "D3",
        dStepOwner: "supply.lead@company.com",
        sapUserId: "SAP-SC-332",
        // Keep demo posture realistic: active containment is slightly overdue (yellow risk).
        deadlineAt: new Date(now - 75 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      D4: {
        stepId: "D4",
        dStepOwner: "qa.lead@company.com",
        sapUserId: "SAP-QA-100",
        deadlineAt: new Date(now + 20 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      D5: null,
      D6: null,
      D7: null,
      D8: null,
    };
  }

  private emptyStepSignOff(): Record<DStepId, DStepSignOff> {
    const mk = (stepId: DStepId): DStepSignOff => ({
      stepId,
      signed: false,
      signedBy: null,
      signedAt: null,
    });
    return {
      D1: mk("D1"),
      D2: mk("D2"),
      D3: mk("D3"),
      D4: mk("D4"),
      D5: mk("D5"),
      D6: mk("D6"),
      D7: mk("D7"),
      D8: mk("D8"),
    };
  }

  private addAudit(
    action: AuditEvent["action"],
    target: string,
    actorName = "system",
    actorEmail = "system@control-agent.local",
  ): void {
    const now = Date.now();
    this.auditTrail.unshift({
      eventId: `AUD-${now}-${Math.random().toString(36).slice(2, 7)}`,
      actorName,
      actorEmail,
      action,
      target,
      timestampMs: now,
      timestampIso: new Date(now).toISOString(),
    });
    if (this.auditTrail.length > 2000) this.auditTrail.length = 2000;
  }

  private recomputeWallStatus(item: PublicQualityWallItem): void {
    const allSigned = (Object.keys(item.stepSignOff) as DStepId[]).every(
      (s) => item.stepSignOff[s].signed,
    );
    const d7Ready = item.d7FmeaAction != null;
    item.status = allSigned && d7Ready ? "CONTAINED" : "IN_PROGRESS";
  }

  getUnifiedState(trace: TraceLink) {
    const qals = this.sapAdapter.getQalsInspectionLot(trace);
    const mard = this.sapAdapter.getMardStorage(trace);
    const afko = this.sapAdapter.getAfkoOrder(trace);
    const eket = this.sapAdapter.getEketScheduleLines(trace);
    const supply = this.supplyEngine.buildSnapshot(trace.partId, mard, eket);
    const flow = this.flowAgent.getSnapshot(trace.processId);
    const telemetry = this.telemetryAdapter.getRealtime(trace.processId);
    const deviation = this.qualityEngine.detectDeviation(supply, flow, trace);
    const badBatchShipments = eket.filter((s) => s.batchId.toUpperCase().includes("BAD_BATCH") || s.batchId.toUpperCase().includes("BAD-BATCH"));
    const deltaOutput = flow.outputPerHour - telemetry.outputPerHourRealtime;
    const d4Analytics = this.qualityEngine.analyzeD4RootCause(qals, afko, eket, telemetry);

    const histKey = `${trace.partId}::${trace.processId}`;
    const history = this.flowDeltaHistory.get(histKey) ?? [];
    history.push(deltaOutput);
    if (history.length > 12) history.shift();
    this.flowDeltaHistory.set(histKey, history);

    const avgAbsDelta =
      history.length === 0
        ? 0
        : history.reduce((acc, n) => acc + Math.abs(n), 0) / history.length;
    const driftDetected = Math.abs(deltaOutput) >= 8 || avgAbsDelta >= 6 || flow.cycleTimeMinutes >= 10;
    if (driftDetected) {
      const warning: Pre8DWarning = {
        warningId: `PRE8D-${Date.now()}`,
        partId: trace.partId,
        processId: trace.processId,
        createdAt: new Date().toISOString(),
        reason: `Flow drift detected: delta=${deltaOutput.toFixed(2)} / avgAbsDelta=${avgAbsDelta.toFixed(2)} / cycle=${flow.cycleTimeMinutes.toFixed(2)}min`,
        severity: avgAbsDelta >= 8 || flow.cycleTimeMinutes >= 11 ? "ESCALATED" : "EARLY",
        notify: "MANAGEMENT_BOARD",
      };
      this.pre8dWarnings.unshift(warning);
      if (this.pre8dWarnings.length > 100) this.pre8dWarnings.pop();
    }

    const riskImpact =
      (supply.riskLevel === "HIGH" ? 25000 : supply.riskLevel === "MEDIUM" ? 12000 : 4000) +
      (flow.bottleneck ? 15000 : 0);

    return {
      trace,
      supply,
      flow,
      sap: { qals, mard, afko, eket },
      telemetry,
      flowDelta: {
        plannedOutputPerHour: flow.outputPerHour,
        realtimeOutputPerHour: telemetry.outputPerHourRealtime,
        deltaOutputPerHour: deltaOutput,
      },
      supplyFlags: {
        badBatchShipments,
      },
      d4Analytics,
      pre8d: {
        driftDetected,
        latestWarning: this.pre8dWarnings[0] ?? null,
      },
      deviation,
      riskImpactEur: riskImpact,
      canGenerate8D: Boolean(deviation),
      generatedAt: new Date().toISOString(),
    };
  }

  evaluateFlowAutomation(
    trace: TraceLink,
    downtimeCostPerHourUsd = 50000,
  ): {
    triggered: boolean;
    created: boolean;
    message: string;
    ratio: number;
    totalLossUsd: number;
    report: EightDReport | null;
  } {
    const state = this.getUnifiedState(trace);
    const target = state.flow.outputPerHour;
    const realtime = state.telemetry.outputPerHourRealtime;
    const ratio = target > 0 ? realtime / target : 1;
    const materialValuePart1001 = 120;
    const lossOutput = Math.max(0, target - realtime) * (downtimeCostPerHourUsd / Math.max(target, 1));
    const lossScrap = (realtime * (state.telemetry.scrapRatePct / 100)) * materialValuePart1001;
    const totalLossUsd = Math.round((lossOutput + lossScrap) * 100) / 100;
    const triggered = ratio < 0.9 || state.telemetry.scrapRatePct > 4;
    if (!triggered) {
      return {
        triggered: false,
        created: false,
        message: "Flow monitor healthy. No auto 8D draft needed.",
        ratio: Number(ratio.toFixed(3)),
        totalLossUsd,
        report: null,
      };
    }

    const existing = this.qualityWall.find(
      (item) =>
        item.trace.partId === trace.partId &&
        item.trace.processId === trace.processId &&
        item.status !== "CLOSED" &&
        item.report.d2ProblemDescription.includes(
          "Automated alert: Machine DEGRADED. Delta Output detected",
        ),
    );
    if (existing) {
      return {
        triggered: true,
        created: false,
        message: "Flow monitor triggered. Existing auto 8D draft already active.",
        ratio: Number(ratio.toFixed(3)),
        totalLossUsd,
        report: existing.report,
      };
    }

    const reportId = `2026-${String(this.auto8dSequence).padStart(3, "0")}`;
    this.auto8dSequence += 1;
    const now = new Date().toISOString();
    const autoReport: EightDReport = {
      reportId,
      createdAt: now,
      deviation: {
        partId: "PART-1001",
        processId: "LINE-MEX-04 Telemetry Alert",
        reason: "Automated alert: Machine DEGRADED. Delta Output detected",
        severity: "CRITICAL",
      },
      sourceTables: { d2: "QALS", d3: "MARD", d4: "AFKO" },
      d1Team: "Auto-created by Flow-to-8D Automation Engine",
      d2ProblemDescription: `Performance Gap Detected. OEE dropped to ${state.telemetry.oeePct.toFixed(1)}%. Potential Loss: ${totalLossUsd.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
      d3ContainmentAction:
        "Immediate containment suggested: enforce supply check and line stabilization.",
      d4RootCause:
        `Realtime output fell below 90% threshold (${(ratio * 100).toFixed(1)}% of target).`,
      d5CorrectiveAction: "Dispatch maintenance and adjust process tuning.",
      d6ValidationPlan: "Monitor target-vs-realtime gap over next 2 hours.",
      d7PreventionAction: "Enable proactive trigger policy in Flow Agent.",
      d8Closure: "Close after stable output recovery and owner sign-off.",
    };

    this.qualityWall.unshift({
      report: autoReport,
      trace,
      status: "OPEN",
      ownerDepartmentLead: "Quality Department Lead",
      stepOwnership: this.emptyStepOwnership(),
      stepSignOff: this.emptyStepSignOff(),
      d3TransactionIds: [],
      d7FmeaAction: null,
      lastUpdatedAt: now,
    });
    if (this.qualityWall.length > 300) this.qualityWall.pop();
    this.addAudit("EDIT", `automation/flow-auto-8d/${reportId}`);

    return {
      triggered: true,
      created: true,
      message: "System created 8D-Report for Performance Gap",
      ratio: Number(ratio.toFixed(3)),
      totalLossUsd,
      report: autoReport,
    };
  }

  getSupplyDashboardState(trace: TraceLink, auditMode: boolean) {
    const state = this.getUnifiedState(trace);
    const dashboard = this.supplyEngine.buildSupplyDashboardModel(
      trace.partId,
      state.sap.mard,
      state.sap.eket,
      auditMode,
    );
    return {
      stock: state.supply.stock,
      transit: state.supply.transit,
      riskLevel: state.supply.riskLevel,
      updatedAt: state.supply.updatedAt,
      supplyRows: dashboard.rows,
      complianceSummary: dashboard.complianceSummary,
      systemHealth: dashboard.health,
      scenarioAExists: dashboard.scenarioAExists,
      flaggedIncomingShipments: state.supplyFlags.badBatchShipments,
    };
  }

  generate8DIfNeeded(trace: TraceLink): EightDReport | null {
    const state = this.getUnifiedState(trace);
    if (!state.deviation) return null;
    const report = this.qualityEngine.generate8D(state.deviation, {
      qals: state.sap.qals,
      mard: state.sap.mard,
      afko: state.sap.afko,
    });
    this.qualityWall.unshift({
      report,
      trace,
      status: "OPEN",
      ownerDepartmentLead: "Quality Department Lead",
      stepOwnership: this.emptyStepOwnership(),
      stepSignOff: this.emptyStepSignOff(),
      d3TransactionIds: [],
      d7FmeaAction: null,
      lastUpdatedAt: new Date().toISOString(),
    });
    if (this.qualityWall.length > 300) this.qualityWall.pop();
    return report;
  }

  getPublicQualityWall(): PublicQualityWallItem[] {
    this.addAudit("READ", "quality/public-wall");
    return this.qualityWall;
  }

  getPre8DWarnings(): Pre8DWarning[] {
    return this.pre8dWarnings;
  }

  listNotifications(): EscalationNotification[] {
    this.addAudit("READ", "quality/notifications");
    return this.notifications;
  }

  assignStepOwner(
    reportId: string,
    stepId: DStepId,
    ownerEmail: string,
    deadlineAt: string,
    actor: ActorContext,
  ): PublicQualityWallItem {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    if (!ownerEmail) throw new Error("OWNER_REQUIRED");

    const existing = item.stepOwnership[stepId];
    if (existing && existing.dStepOwner !== actor.email && actor.role !== "CONTROL_MASTER") {
      throw new Error("EDIT_FORBIDDEN");
    }

    item.stepOwnership[stepId] = {
      stepId,
      dStepOwner: ownerEmail,
      sapUserId: this.sapUserDirectory.get(ownerEmail) ?? null,
      deadlineAt,
      updatedAt: new Date().toISOString(),
    };
    item.lastUpdatedAt = new Date().toISOString();
    if (item.status === "OPEN") item.status = "IN_PROGRESS";
    this.addAudit("EDIT", `quality/8d/${reportId}/${stepId}`, actor.email, actor.email);
    return item;
  }

  signOffStep(
    reportId: string,
    stepId: DStepId,
    actor: ActorContext,
  ): PublicQualityWallItem {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    const ownership = item.stepOwnership[stepId];
    if (!ownership) throw new Error("OWNER_REQUIRED");

    if (stepId === "D7" && !item.d7FmeaAction) {
      throw new Error("D7_MANUAL_ENTRY_REQUIRED");
    }

    const allowed =
      actor.role === "CONTROL_MASTER" || ownership.dStepOwner === actor.email;
    if (!allowed) throw new Error("EDIT_FORBIDDEN");

    item.stepSignOff[stepId] = {
      stepId,
      signed: true,
      signedBy: actor.email,
      signedAt: new Date().toISOString(),
    };
    item.lastUpdatedAt = new Date().toISOString();
    this.recomputeWallStatus(item);
    this.addAudit("EDIT", `quality/8d/${reportId}/${stepId}/signoff`, actor.email, actor.email);
    return item;
  }

  setD7FmeaAction(
    reportId: string,
    action: Omit<D7FmeaAction, "classification" | "confirmedBy" | "confirmedAt" | "fmeaProcessOwner">,
    actor: ActorContext,
  ): PublicQualityWallItem {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");

    const allowed =
      actor.role === "CONTROL_MASTER" || actor.role === "FMEA_PROCESS_OWNER";
    if (!allowed) throw new Error("EDIT_FORBIDDEN");

    item.d7FmeaAction = {
      classification: "Internal_Strict",
      fmeaProcessOwner: this.mandatoryFmeaOwner,
      fmeaUpdateStatus: action.fmeaUpdateStatus,
      documentReference: action.documentReference,
      verificationDate: action.verificationDate,
      confirmedBy: actor.email,
      confirmedAt: new Date().toISOString(),
    };
    item.lastUpdatedAt = new Date().toISOString();
    this.recomputeWallStatus(item);
    this.addAudit("EDIT", `quality/8d/${reportId}/d7-fmea-action`, actor.email, actor.email);
    return item;
  }

  addD3TransactionId(reportId: string, transactionId: string, actor: ActorContext): PublicQualityWallItem {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    if (!transactionId) throw new Error("TX_REQUIRED");
    const d3Owner = item.stepOwnership.D3?.dStepOwner;
    const allowed = actor.role === "CONTROL_MASTER" || d3Owner === actor.email;
    if (!allowed) throw new Error("EDIT_FORBIDDEN");
    if (!item.d3TransactionIds.includes(transactionId)) item.d3TransactionIds.push(transactionId);
    item.lastUpdatedAt = new Date().toISOString();
    this.addAudit("EDIT", `quality/8d/${reportId}/d3-tx`, actor.email, actor.email);
    return item;
  }

  evaluateDeadlineEscalations(nowIso: string): EscalationNotification[] {
    const now = new Date(nowIso).getTime();
    const out: EscalationNotification[] = [];

    for (const wall of this.qualityWall) {
      for (const stepId of Object.keys(wall.stepOwnership) as DStepId[]) {
        const step = wall.stepOwnership[stepId];
        if (!step) continue;
        const deadline = new Date(step.deadlineAt).getTime();
        const hoursLeft = (deadline - now) / (1000 * 60 * 60);

        if (hoursLeft <= 24 && hoursLeft > 0) {
          const reminder: EscalationNotification = {
            notificationId: `NOTIF-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            reportId: wall.report.reportId,
            stepId,
            ownerEmail: step.dStepOwner,
            departmentLeadEmail: "department.lead@company.com",
            controlMasterEmail: this.controlMasterEmail,
            kind: "REMINDER",
            message: `Deadline approaching for ${stepId} (${hoursLeft.toFixed(1)}h left). Auto-email to owner.`,
            createdAt: new Date().toISOString(),
          };
          out.push(reminder);
          this.notifications.unshift(reminder);
        } else if (hoursLeft <= 0) {
          const escalation: EscalationNotification = {
            notificationId: `NOTIF-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            reportId: wall.report.reportId,
            stepId,
            ownerEmail: step.dStepOwner,
            departmentLeadEmail: "department.lead@company.com",
            controlMasterEmail: this.controlMasterEmail,
            kind: "ESCALATION",
            message:
              "Deadline exceeded. Auto-notify Control_Master and CC Department Lead.",
            createdAt: new Date().toISOString(),
          };
          out.push(escalation);
          this.notifications.unshift(escalation);
          this.addAudit(
            "MISSED_DEADLINE",
            `quality/8d/${wall.report.reportId}/${stepId}`,
            "system",
            "system@control-agent.local",
          );
          const overdueHours = Math.abs(hoursLeft);
          if (overdueHours > 4) {
            this.financialRiskAlerts.unshift({
              alertId: `FRA-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              reportId: wall.report.reportId,
              stepId,
              overdueHours,
              estimatedImpactEur: Math.round(overdueHours * 1200),
              createdAt: new Date().toISOString(),
            });
          }
        }
      }
    }
    if (this.notifications.length > 500) this.notifications.length = 500;
    if (this.financialRiskAlerts.length > 500) this.financialRiskAlerts.length = 500;
    return out;
  }

  listFinancialRiskAlerts(): FinancialRiskAlert[] {
    this.addAudit("READ", "quality/financial-risk-alerts");
    return this.financialRiskAlerts;
  }

  listPenaltyRates(): PenaltyConfig[] {
    return Array.from(this.penaltyRates.values());
  }

  setPenaltyRate(stepId: DStepId, hourlyPenaltyEur: number, source: "SAP" | "MANUAL"): PenaltyConfig {
    const cfg: PenaltyConfig = {
      stepId,
      hourlyPenaltyEur,
      source,
      updatedAt: new Date().toISOString(),
    };
    this.penaltyRates.set(stepId, cfg);
    this.addAudit("EDIT", `config/penalties/${stepId}`);
    return cfg;
  }

  getFinancialRiskGauge(reportId?: string, stepId?: DStepId): FinancialRiskGauge {
    const now = Date.now();
    let maxOverdueHours = 0;
    let impactScoreEur = 0;
    let selectedReportId: string | null = null;
    let selectedStepId: DStepId | null = null;

    for (const wall of this.qualityWall) {
      if (reportId && wall.report.reportId !== reportId) continue;
      for (const sid of Object.keys(wall.stepOwnership) as DStepId[]) {
        if (stepId && sid !== stepId) continue;
        const ownership = wall.stepOwnership[sid];
        if (!ownership) continue;
        const overdueHours = Math.max(0, (now - new Date(ownership.deadlineAt).getTime()) / (1000 * 60 * 60));
        if (overdueHours > maxOverdueHours) {
          maxOverdueHours = overdueHours;
          selectedReportId = wall.report.reportId;
          selectedStepId = sid;
        }
        const penalty = this.penaltyRates.get(sid)?.hourlyPenaltyEur ?? 0;
        impactScoreEur += overdueHours * penalty;
      }
    }

    let level: FinancialRiskGauge["level"] = "GREEN";
    let colorHex = "#22c55e";
    if (maxOverdueHours > 4) {
      level = "DARK_RED";
      colorHex = "#7f1d1d";
    } else if (maxOverdueHours > 2) {
      level = "ORANGE";
      colorHex = "#ea580c";
    } else if (maxOverdueHours > 0) {
      level = "YELLOW";
      colorHex = "#eab308";
    }

    this.addAudit("READ", "dashboard/financial-gauge");
    return {
      level,
      colorHex,
      impactScoreEur: Math.round(impactScoreEur),
      maxOverdueHours: Number(maxOverdueHours.toFixed(2)),
      reportId: selectedReportId,
      stepId: selectedStepId,
    };
  }

  listAuditTrail(): AuditEvent[] {
    return this.auditTrail;
  }

  getMonthlyPerformanceReport(monthKey: string): MonthlyPerformanceReport {
    const hits = this.auditTrail.filter(
      (e) => e.action === "MISSED_DEADLINE" && e.timestampIso.slice(0, 7) === monthKey,
    );
    const reportIds = Array.from(
      new Set(
        hits.map((h) => {
          const parts = h.target.split("/");
          return parts.length >= 4 ? parts[3] : "UNKNOWN";
        }),
      ),
    );
    return {
      monthKey,
      missedDeadlineCount: hits.length,
      affectedReports: reportIds,
      generatedAt: new Date().toISOString(),
    };
  }

  getWeeklyCostSummary(nowIso: string): WeeklyCostSummary {
    const end = new Date(nowIso).getTime();
    const start = end - 7 * 24 * 60 * 60 * 1000;

    const actualDelayCostsEur = this.financialRiskAlerts
      .filter((a) => {
        const t = new Date(a.createdAt).getTime();
        return t >= start && t <= end;
      })
      .reduce((acc, a) => acc + a.estimatedImpactEur, 0);

    const preventedCostsEur = this.notifications
      .filter((n) => {
        const t = new Date(n.createdAt).getTime();
        return t >= start && t <= end && n.kind === "REMINDER";
      })
      .reduce((acc, n) => {
        const penalty = this.penaltyRates.get(n.stepId)?.hourlyPenaltyEur ?? 0;
        return acc + penalty * 4;
      }, 0);

    return {
      windowStart: new Date(start).toISOString(),
      windowEnd: new Date(end).toISOString(),
      preventedCostsEur: Math.round(preventedCostsEur),
      actualDelayCostsEur: Math.round(actualDelayCostsEur),
      generatedAt: new Date().toISOString(),
    };
  }

  private ensureFinalGate(item: PublicQualityWallItem): void {
    for (const stepId of Object.keys(item.stepOwnership) as DStepId[]) {
      const owner = item.stepOwnership[stepId];
      if (!owner || !owner.dStepOwner || owner.dStepOwner === "unassigned@company.com") {
        throw new Error(`OWNER_SIGN_OFF_MISSING:${stepId}`);
      }
      const signed = item.stepSignOff[stepId];
      if (!signed?.signed) {
        throw new Error(`OWNER_SIGN_OFF_MISSING:${stepId}`);
      }
    }
    if (item.d3TransactionIds.length === 0) {
      throw new Error("D3_TRANSACTION_IDS_MISSING");
    }
    if (!item.d7FmeaAction) {
      throw new Error("D7_MANUAL_ENTRY_REQUIRED");
    }
    if (item.d7FmeaAction.fmeaUpdateStatus === "PENDING") {
      throw new Error("D7_PENDING_FMEA");
    }
  }

  generateFinal8DPdf(reportId: string): EightDPdfPackage {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    this.ensureFinalGate(item);

    const state = this.getUnifiedState(item.trace);
    const payload = {
      template: "VDA_IATF_8D_PDF",
      report: item.report,
      trace: item.trace,
      owners: item.stepOwnership,
      signOff: item.stepSignOff,
      d3TransactionIds: item.d3TransactionIds,
      attachments: {
        flowProcessChart: {
          cycleTimeMinutes: state.flow.cycleTimeMinutes,
          outputPerHour: state.flow.outputPerHour,
          bottleneck: state.flow.bottleneck,
        },
        supplyStockLog: {
          stock: state.supply.stock,
          transit: state.supply.transit,
          riskLevel: state.supply.riskLevel,
        },
      },
    };
    const contentBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const pdf: EightDPdfPackage = {
      reportId,
      template: "VDA_IATF_8D_PDF",
      generatedAt: new Date().toISOString(),
      fileName: `${reportId}-VDA-IATF-8D.pdf`,
      contentBase64,
      attachments: payload.attachments,
    };
    return pdf;
  }

  generateCustomerFacing8DPdf(reportId: string): EightDPdfPackage {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    this.ensureFinalGate(item);

    const state = this.getUnifiedState(item.trace);
    const payload = {
      template: "VDA_IATF_8D_PDF",
      report: item.report,
      trace: item.trace,
      owners: item.stepOwnership,
      signOff: item.stepSignOff,
      d3TransactionIds: item.d3TransactionIds,
      // SECURITY POLICY: FMEA is internal only in customer-facing output.
      d7Fmea: {
        classification: "Internal_Strict",
        masked: true,
      },
      attachments: {
        flowProcessChart: {
          cycleTimeMinutes: state.flow.cycleTimeMinutes,
          outputPerHour: state.flow.outputPerHour,
          bottleneck: state.flow.bottleneck,
        },
        supplyStockLog: {
          stock: state.supply.stock,
          transit: state.supply.transit,
          riskLevel: state.supply.riskLevel,
        },
      },
    };
    const contentBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    return {
      reportId,
      template: "VDA_IATF_8D_PDF",
      generatedAt: new Date().toISOString(),
      fileName: `${reportId}-VDA-IATF-8D-customer.pdf`,
      contentBase64,
      attachments: payload.attachments,
    };
  }

  archiveFinal8D(pdf: EightDPdfPackage): ArchivedQualityRecord {
    const archived: ArchivedQualityRecord = {
      archiveId: `ARCH-${Date.now()}`,
      reportId: pdf.reportId,
      archivedAt: new Date().toISOString(),
      location: "Internal_Quality_History",
      pdf,
    };
    this.internalQualityHistory.unshift(archived);
    if (this.internalQualityHistory.length > 1000) this.internalQualityHistory.length = 1000;
    return archived;
  }

  sendToCustomer(reportId: string, recipientEmail: string): { pdf: EightDPdfPackage; receipt: DistributionReceipt; archived: ArchivedQualityRecord } {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    const fmeaRef = item.d7FmeaAction?.documentReference ?? "";
    if (fmeaRef.toUpperCase().includes("FMEA")) {
      throw new Error("FMEA_EXPORT_BLOCKED");
    }
    const pdf = this.generateCustomerFacing8DPdf(reportId);
    const receipt: DistributionReceipt = {
      receiptId: `MAIL-${Date.now()}`,
      reportId,
      sentTo: recipientEmail,
      sentAt: new Date().toISOString(),
      channel: "EMAIL_API",
    };
    this.distributionReceipts.unshift(receipt);
    if (this.distributionReceipts.length > 1000) this.distributionReceipts.length = 1000;
    const archived = this.archiveFinal8D(pdf);
    this.addAudit("EDIT", `quality/8d/${reportId}/send-customer`, "email-api", "email-api@control-agent.local");
    return { pdf, receipt, archived };
  }

  listInternalQualityHistory(): ArchivedQualityRecord[] {
    this.addAudit("READ", "quality/internal-history");
    return this.internalQualityHistory;
  }

  listDistributionReceipts(): DistributionReceipt[] {
    this.addAudit("READ", "quality/distribution-receipts");
    return this.distributionReceipts;
  }

  getD7AuditView(reportId: string): {
    reportId: string;
    classification: "Internal_Strict";
    fmeaUpdateStatus: string;
    confirmedBy: string | null;
    confirmedAt: string | null;
  } {
    const item = this.qualityWall.find((w) => w.report.reportId === reportId);
    if (!item) throw new Error("REPORT_NOT_FOUND");
    const fmea = item.d7FmeaAction;
    if (!fmea) throw new Error("D7_MANUAL_ENTRY_REQUIRED");
    this.addAudit("READ", `quality/8d/${reportId}/d7-audit-view`);
    return {
      reportId,
      classification: "Internal_Strict",
      fmeaUpdateStatus: fmea.fmeaUpdateStatus,
      confirmedBy: fmea.confirmedBy,
      confirmedAt: fmea.confirmedAt,
    };
  }

  generateOneClickBlockTransaction(trace: TraceLink, batchId: string): string {
    const state = this.getUnifiedState(trace);
    return this.supplyEngine.executeEmergencyBlockAndUpdate(
      trace,
      batchId,
      state.sap.mard,
      state.sap.eket,
    ).transaction;
  }

  runSupplyEmergencyBlock(trace: TraceLink, batchId: string): {
    transaction: string;
    emulatorUpdated: boolean;
    message: string;
  } {
    const state = this.getUnifiedState(trace);
    return this.supplyEngine.executeEmergencyBlockAndUpdate(
      trace,
      batchId,
      state.sap.mard,
      state.sap.eket,
    );
  }

  resetSupplyDemoToCritical(): void {
    this.supplyEngine.resetMockToCritical();
    this.addAudit("EDIT", "supply/demo-trigger-critical");
  }
}
