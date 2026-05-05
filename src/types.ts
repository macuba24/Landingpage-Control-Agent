export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type SupplySnapshot = {
  partId: string;
  stock: number;
  transit: number;
  riskLevel: RiskLevel;
  updatedAt: string;
};

export type FlowSnapshot = {
  processId: string;
  cycleTimeMinutes: number;
  bottleneck: boolean;
  outputPerHour: number;
  updatedAt: string;
};

export type TraceLink = {
  partId: string;
  processId: string;
};

export type SapQalsInspectionLot = {
  inspectionLotId: string;
  materialId: string;
  defectCode: string;
  defectText: string;
  lotStatus: "OPEN" | "CLOSED";
};

export type SapMardStorage = {
  materialId: string;
  storageLocation: string;
  unrestrictedStock: number;
  blockedStock: number;
};

export type SapAfkoOrder = {
  orderId: string;
  workCenter: string;
  equipmentId: string;
  plannedQty: number;
};

export type SapEketScheduleLine = {
  agreementId: string;
  materialId: string;
  inboundQty: number;
  dueDate: string;
  batchId: string;
};

export type MachineTelemetry = {
  processId: string;
  outputPerHourRealtime: number;
  targetOutputPerHour: number;
  cycleTimeRealtimeMinutes: number;
  scrapRatePct: number;
  oeePct: number;
  operator: string;
  lineId: string;
  machineState: "RUNNING" | "STOPPED" | "DEGRADED";
  timestamp: string;
};

export type QualityDeviation = {
  partId: string;
  processId: string;
  reason: string;
  severity: "MINOR" | "MAJOR" | "CRITICAL";
};

export type EightDReport = {
  reportId: string;
  createdAt: string;
  deviation: QualityDeviation;
  sourceTables: {
    d2: "QALS";
    d3: "MARD";
    d4: "AFKO";
  };
  d1Team: string;
  d2ProblemDescription: string;
  d3ContainmentAction: string;
  d4RootCause: string;
  d5CorrectiveAction: string;
  d6ValidationPlan: string;
  d7PreventionAction: string;
  d8Closure: string;
};

export type EightDStatus = "OPEN" | "IN_PROGRESS" | "CONTAINED" | "CLOSED";

export type DStepId = "D1" | "D2" | "D3" | "D4" | "D5" | "D6" | "D7" | "D8";

export type DStepOwnership = {
  stepId: DStepId;
  dStepOwner: string; // email
  sapUserId: string | null;
  deadlineAt: string;
  updatedAt: string;
};

export type DStepSignOff = {
  stepId: DStepId;
  signed: boolean;
  signedBy: string | null;
  signedAt: string | null;
};

export type ActorRole = "TEAM_MEMBER" | "CONTROL_MASTER" | "FMEA_PROCESS_OWNER";

export type ActorContext = {
  userId: string;
  email: string;
  role: ActorRole;
};

export type EscalationNotification = {
  notificationId: string;
  reportId: string;
  stepId: DStepId;
  ownerEmail: string;
  departmentLeadEmail: string;
  controlMasterEmail: string;
  kind: "REMINDER" | "ESCALATION";
  message: string;
  createdAt: string;
};

export type FinancialRiskAlert = {
  alertId: string;
  reportId: string;
  stepId: DStepId;
  overdueHours: number;
  estimatedImpactEur: number;
  createdAt: string;
};

export type PublicQualityWallItem = {
  report: EightDReport;
  trace: TraceLink;
  status: EightDStatus;
  ownerDepartmentLead: string;
  stepOwnership: Record<DStepId, DStepOwnership | null>;
  stepSignOff: Record<DStepId, DStepSignOff>;
  d3TransactionIds: string[];
  d7FmeaAction: D7FmeaAction | null;
  lastUpdatedAt: string;
};

export type D4Analytics = {
  sameMachine: boolean;
  sameBatch: boolean;
  sameShift: boolean;
  denominators: string[];
  summary: string;
};

export type Pre8DWarning = {
  warningId: string;
  partId: string;
  processId: string;
  createdAt: string;
  reason: string;
  severity: "EARLY" | "ESCALATED";
  notify: "MANAGEMENT_BOARD";
};

export type AuditAction = "READ" | "EDIT" | "MISSED_DEADLINE";

export type AuditEvent = {
  eventId: string;
  actorName: string;
  actorEmail: string;
  action: AuditAction;
  target: string;
  timestampMs: number;
  timestampIso: string;
};

export type MonthlyPerformanceReport = {
  monthKey: string;
  missedDeadlineCount: number;
  affectedReports: string[];
  generatedAt: string;
};

export type PenaltyConfig = {
  stepId: DStepId;
  hourlyPenaltyEur: number;
  source: "SAP" | "MANUAL";
  updatedAt: string;
};

export type FinancialRiskGauge = {
  level: "GREEN" | "YELLOW" | "ORANGE" | "DARK_RED";
  colorHex: string;
  impactScoreEur: number;
  maxOverdueHours: number;
  reportId: string | null;
  stepId: DStepId | null;
};

export type WeeklyCostSummary = {
  windowStart: string;
  windowEnd: string;
  preventedCostsEur: number;
  actualDelayCostsEur: number;
  generatedAt: string;
};

export type EightDPdfPackage = {
  reportId: string;
  template: "VDA_IATF_8D_PDF";
  generatedAt: string;
  fileName: string;
  contentBase64: string;
  attachments: {
    flowProcessChart: {
      cycleTimeMinutes: number;
      outputPerHour: number;
      bottleneck: boolean;
    };
    supplyStockLog: {
      stock: number;
      transit: number;
      riskLevel: RiskLevel;
    };
  };
};

export type ArchivedQualityRecord = {
  archiveId: string;
  reportId: string;
  archivedAt: string;
  location: "Internal_Quality_History";
  pdf: EightDPdfPackage;
};

export type DistributionReceipt = {
  receiptId: string;
  reportId: string;
  sentTo: string;
  sentAt: string;
  channel: "EMAIL_API";
};

export type FmeaUpdateStatus = "UPDATED" | "NOT_REQUIRED" | "PENDING";

export type D7FmeaAction = {
  classification: "Internal_Strict";
  fmeaProcessOwner: string;
  fmeaUpdateStatus: FmeaUpdateStatus;
  documentReference: string;
  verificationDate: string;
  confirmedBy: string;
  confirmedAt: string;
};
