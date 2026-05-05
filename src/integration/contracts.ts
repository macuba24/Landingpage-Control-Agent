import type {
  MachineTelemetry,
  SapAfkoOrder,
  SapEketScheduleLine,
  SapMardStorage,
  SapQalsInspectionLot,
  TraceLink,
} from "../types";

export interface SapIngestionPort {
  getQalsInspectionLot(trace: TraceLink): SapQalsInspectionLot;
  getMardStorage(trace: TraceLink): SapMardStorage;
  getAfkoOrder(trace: TraceLink): SapAfkoOrder;
  getEketScheduleLines(trace: TraceLink): SapEketScheduleLine[];
}

export interface TelemetryIngestionPort {
  getRealtime(processId: string): MachineTelemetry;
}
