import type { SapEketScheduleLine, SapMardStorage } from "../../../types";

export type SupplyKrakenRow = {
  material_id: string;
  batch_number: string;
  stock_level: number;
  transit_qty: number;
  lock_status: "Available" | "Critical" | "BLOCKED";
};

export type SapMockRow = {
  scenario_id?: "A" | "B" | "C";
  material_id: string;
  batch_number: string;
  stock_level: number;
  transit_qty: number;
  eta_hours?: number;
  risk?: "HIGH" | "MEDIUM" | "LOW";
  status: "Available" | "Critical" | "BLOCKED";
};

export function mapSapToKrakenRows(
  mard: SapMardStorage,
  eket: SapEketScheduleLine[],
): SupplyKrakenRow[] {
  if (eket.length === 0) {
    return [
      {
        material_id: mard.materialId,
        batch_number: "NO_BATCH",
        stock_level: mard.unrestrictedStock,
        transit_qty: 0,
        lock_status: mard.blockedStock > 0 ? "Critical" : "Available",
      },
    ];
  }

  return eket.map((line) => ({
    material_id: line.materialId,
    batch_number: line.batchId,
    stock_level: mard.unrestrictedStock,
    transit_qty: line.inboundQty,
    lock_status: mard.blockedStock > 0 ? "Critical" : "Available",
  }));
}

export function mapMockToKrakenRows(rows: SapMockRow[]): SupplyKrakenRow[] {
  return rows.map((row) => ({
    material_id: row.material_id,
    batch_number: row.batch_number,
    stock_level: row.stock_level,
    transit_qty: row.transit_qty,
    lock_status:
      row.status === "BLOCKED"
        ? "BLOCKED"
        : row.status === "Critical"
          ? "Critical"
          : "Available",
  }));
}
