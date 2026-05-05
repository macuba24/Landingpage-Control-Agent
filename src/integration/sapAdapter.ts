import type {
  SapAfkoOrder,
  SapEketScheduleLine,
  SapMardStorage,
  SapQalsInspectionLot,
  TraceLink,
} from "../types";
import type { SapIngestionPort } from "./contracts";
import { liveDataStore } from "./liveDataStore";

/**
 * DATA_INGESTION adapter placeholder for SAP.
 * Production version should switch to JSON/SQL stream ingestion.
 */
export class SapAdapter implements SapIngestionPort {
  getQalsInspectionLot(trace: TraceLink): SapQalsInspectionLot {
    const live = liveDataStore.getSap(trace);
    if (live) return live.qals;
    return {
      inspectionLotId: `LOT-${trace.partId}-001`,
      materialId: trace.partId,
      defectCode: "DIM_VARIANCE",
      defectText: "Measured dimensions out of tolerance window.",
      lotStatus: "OPEN",
    };
  }

  getMardStorage(trace: TraceLink): SapMardStorage {
    const live = liveDataStore.getSap(trace);
    if (live) return live.mard;
    return {
      materialId: trace.partId,
      storageLocation: "SL-100",
      unrestrictedStock: 82,
      blockedStock: 11,
    };
  }

  getAfkoOrder(trace: TraceLink): SapAfkoOrder {
    const live = liveDataStore.getSap(trace);
    if (live) return live.afko;
    return {
      orderId: `PO-${trace.processId}-449`,
      workCenter: "WC-21A",
      equipmentId: "EQ-8831",
      plannedQty: 560,
    };
  }

  getEketScheduleLines(trace: TraceLink): SapEketScheduleLine[] {
    const live = liveDataStore.getSap(trace);
    if (live) return live.eket;
    return [
      {
        agreementId: "SA-2026-441",
        materialId: trace.partId,
        inboundQty: 140,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        batchId: "BATCH-A9",
      },
      {
        agreementId: "SA-2026-441",
        materialId: trace.partId,
        inboundQty: 90,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        batchId: "BAD-BATCH-17",
      },
    ];
  }
}
