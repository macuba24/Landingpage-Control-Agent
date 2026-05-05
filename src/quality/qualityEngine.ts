import type {
  D4Analytics,
  EightDReport,
  FlowSnapshot,
  MachineTelemetry,
  QualityDeviation,
  SapAfkoOrder,
  SapEketScheduleLine,
  SapMardStorage,
  SapQalsInspectionLot,
  SupplySnapshot,
  TraceLink,
} from "../types";

/**
 * QUALITY_ENGINE: Located in ControlAgent.
 * Uses supply + flow sensor data to detect deviations
 * and create 8D reports.
 */
export class QualityEngine {
  private shiftBucket(iso: string): "SHIFT_A" | "SHIFT_B" | "SHIFT_C" {
    const hour = new Date(iso).getHours();
    if (hour >= 6 && hour < 14) return "SHIFT_A";
    if (hour >= 14 && hour < 22) return "SHIFT_B";
    return "SHIFT_C";
  }

  detectDeviation(
    supply: SupplySnapshot,
    flow: FlowSnapshot,
    trace: TraceLink,
  ): QualityDeviation | null {
    if (trace.partId !== supply.partId || trace.processId !== flow.processId) {
      return {
        partId: trace.partId,
        processId: trace.processId,
        reason: "Trace link mismatch between Supply and Flow streams.",
        severity: "CRITICAL",
      };
    }

    if (supply.riskLevel === "HIGH" && flow.bottleneck) {
      return {
        partId: supply.partId,
        processId: flow.processId,
        reason: "High supply risk collides with active process bottleneck.",
        severity: "MAJOR",
      };
    }

    return null;
  }

  generate8D(
    deviation: QualityDeviation,
    sap: {
      qals: SapQalsInspectionLot;
      mard: SapMardStorage;
      afko: SapAfkoOrder;
    },
  ): EightDReport {
    const now = new Date().toISOString();
    return {
      reportId: `8D-${Date.now()}`,
      createdAt: now,
      deviation,
      sourceTables: {
        d2: "QALS",
        d3: "MARD",
        d4: "AFKO",
      },
      d1Team: "Quality Lead, Process Engineer, Supply Planner",
      d2ProblemDescription: `QALS lot ${sap.qals.inspectionLotId}: ${sap.qals.defectCode} - ${sap.qals.defectText}`,
      d3ContainmentAction: `MARD ${sap.mard.storageLocation}: isolate blocked stock (${sap.mard.blockedStock}) and release only unrestricted stock (${sap.mard.unrestrictedStock}).`,
      d4RootCause: `AFKO order ${sap.afko.orderId} at equipment ${sap.afko.equipmentId} / work center ${sap.afko.workCenter}.`,
      d5CorrectiveAction: "Adjust process handoff and replenishment trigger logic.",
      d6ValidationPlan: "Track cycle-time and stock-risk trend over next 3 shifts.",
      d7PreventionAction: "Introduce early warning thresholds in ControlAgent.",
      d8Closure: "Close report after stable KPI recovery and stakeholder sign-off.",
    };
  }

  analyzeD4RootCause(
    qals: SapQalsInspectionLot,
    afko: SapAfkoOrder,
    eket: SapEketScheduleLine[],
    telemetry: MachineTelemetry,
  ): D4Analytics {
    const sameMachine = afko.equipmentId.length > 0;
    const sameBatch = eket.some((s) => s.batchId.toUpperCase().includes("BAD-BATCH"));
    const sameShift = this.shiftBucket(telemetry.timestamp) === "SHIFT_B";

    const denominators: string[] = [];
    if (sameMachine) denominators.push(`Machine ${afko.equipmentId}`);
    if (sameBatch) denominators.push("Batch cluster contains BAD-BATCH");
    if (sameShift) denominators.push(`Shift ${this.shiftBucket(telemetry.timestamp)}`);
    if (qals.defectCode) denominators.push(`QALS defect ${qals.defectCode}`);

    return {
      sameMachine,
      sameBatch,
      sameShift,
      denominators,
      summary:
        denominators.length > 0
          ? `Common denominators detected: ${denominators.join(" | ")}`
          : "No dominant common denominator detected yet.",
    };
  }
}
