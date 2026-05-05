import fs from "node:fs";
import path from "node:path";
import type {
  SapEketScheduleLine,
  SapMardStorage,
  SupplySnapshot,
  TraceLink,
} from "../../types";
import { buildD3EmergencyBlockTransaction } from "./logic/d3BlockService";
import {
  mapMockToKrakenRows,
  mapSapToKrakenRows,
  type SapMockRow,
} from "./logic/sapSupplyMapper";
import { buildSupplyComplianceSummary } from "./ui/complianceSummary";

/**
 * SupplyEngine is the core supply service.
 * Data flow: SAP tables -> SupplyEngine -> Control Dashboard.
 */
export class SupplyEngine {
  private readonly sapMockRows: SapMockRow[];

  constructor() {
    this.sapMockRows = this.loadMockRows();
  }

  private loadMockRows(): SapMockRow[] {
    try {
      const filePath = path.resolve(
        process.cwd(),
        "src",
        "core",
        "supply",
        "logic",
        "sapMockData.json",
      );
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw) as SapMockRow[];
      if (!Array.isArray(parsed)) return [];
      return parsed.map((row) => ({
        scenario_id: row.scenario_id,
        material_id: row.material_id,
        batch_number: row.batch_number,
        stock_level: Number(row.stock_level ?? 0),
        transit_qty: Number(row.transit_qty ?? 0),
        eta_hours: Number(row.eta_hours ?? 0),
        risk: row.risk ?? "MEDIUM",
        status: row.status ?? "Available",
      }));
    } catch {
      return [];
    }
  }

  private fetchFromSapEmulator(partId: string): SapMockRow[] {
    const rows = this.sapMockRows.filter((row) => row.material_id === partId);
    if (rows.length > 0) return rows;
    return this.sapMockRows;
  }

  buildSnapshot(
    partId: string,
    mard: SapMardStorage,
    eket: SapEketScheduleLine[],
  ): SupplySnapshot {
    const mockRows = this.fetchFromSapEmulator(partId);
    if (mockRows.length > 0) {
      const primary = mockRows[0];
      const stock = Number(primary.stock_level ?? 0);
      const transit = Number(primary.transit_qty ?? 0);
      const blocked = mockRows.some((row) => row.status === "BLOCKED");
      const hasHighRisk = mockRows.some((row) => (row.risk ?? "MEDIUM") === "HIGH");
      const riskLevel = blocked ? "MEDIUM" : hasHighRisk ? "HIGH" : stock < 100 ? "MEDIUM" : "LOW";
      return {
        partId,
        stock,
        transit,
        riskLevel,
        updatedAt: new Date().toISOString(),
      };
    }
    const stock = mard.unrestrictedStock;
    const transit = eket.reduce((acc, line) => acc + line.inboundQty, 0);
    const riskLevel = stock < 50 ? "HIGH" : stock < 100 ? "MEDIUM" : "LOW";
    return {
      partId,
      stock,
      transit,
      riskLevel,
      updatedAt: new Date().toISOString(),
    };
  }

  buildEmergencyBlockTransaction(
    trace: TraceLink,
    batchId: string,
    mard: SapMardStorage,
    eket: SapEketScheduleLine[],
  ): string {
    return buildD3EmergencyBlockTransaction(trace, batchId, mard, eket);
  }

  buildSupplyDashboardModel(
    partId: string,
    mard: SapMardStorage,
    eket: SapEketScheduleLine[],
    auditMode: boolean,
  ): {
    rows: ReturnType<typeof mapSapToKrakenRows>;
    complianceSummary: ReturnType<typeof buildSupplyComplianceSummary> | null;
    health: "SAP-EMULATOR-ACTIVE" | "LIVE-SAP";
    scenarioAExists: boolean;
  } {
    const liveRows = mapSapToKrakenRows(mard, eket);
    const emulatorRows = this.fetchFromSapEmulator(partId);
    const useEmulator =
      emulatorRows.length > 0 ||
      liveRows.length === 0 ||
      (mard.unrestrictedStock === 0 && eket.length === 0);
    const rows = useEmulator ? mapMockToKrakenRows(emulatorRows) : liveRows;
    return {
      rows,
      complianceSummary: auditMode ? buildSupplyComplianceSummary(rows) : null,
      health: useEmulator ? "SAP-EMULATOR-ACTIVE" : "LIVE-SAP",
      scenarioAExists: this.sapMockRows.some(
        (row) =>
          row.scenario_id === "A" &&
          row.material_id === "PART-1001" &&
          (row.risk ?? "MEDIUM") === "HIGH" &&
          row.status !== "BLOCKED",
      ),
    };
  }

  executeEmergencyBlockAndUpdate(
    trace: TraceLink,
    batchId: string,
    mard: SapMardStorage,
    eket: SapEketScheduleLine[],
  ): { transaction: string; emulatorUpdated: boolean; message: string } {
    const transaction = buildD3EmergencyBlockTransaction(trace, batchId, mard, eket);
    const target = this.sapMockRows.find(
      (row) => row.material_id === trace.partId && row.batch_number === batchId,
    );
    if (!target) {
      return {
        transaction,
        emulatorUpdated: false,
        message: "Emergency block created. No SAP emulator row matched for local status update.",
      };
    }
    target.status = "BLOCKED";
    return {
      transaction,
      emulatorUpdated: true,
      message: `Emergency block successful. SAP emulator state updated to BLOCKED for ${batchId}.`,
    };
  }

  resetMockToCritical(): void {
    for (const row of this.sapMockRows) {
      row.status = "Critical";
      row.risk = "HIGH";
    }
  }
}
