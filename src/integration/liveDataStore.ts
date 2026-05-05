import type {
  MachineTelemetry,
  SapAfkoOrder,
  SapEketScheduleLine,
  SapMardStorage,
  SapQalsInspectionLot,
  TraceLink,
} from "../types";

type SapBundle = {
  qals: SapQalsInspectionLot;
  mard: SapMardStorage;
  afko: SapAfkoOrder;
  eket: SapEketScheduleLine[];
  updatedAt: string;
  source: "JSON_STREAM" | "SQL_STREAM";
};

/**
 * In-memory runtime store for ingested SAP/telemetry data.
 * Can be replaced by Redis/DB in production.
 */
export class LiveDataStore {
  private readonly sapByTrace = new Map<string, SapBundle>();
  private readonly telemetryByProcess = new Map<string, MachineTelemetry>();

  private traceKey(trace: TraceLink): string {
    return `${trace.partId}::${trace.processId}`;
  }

  upsertSap(trace: TraceLink, bundle: SapBundle): void {
    this.sapByTrace.set(this.traceKey(trace), bundle);
  }

  getSap(trace: TraceLink): SapBundle | null {
    return this.sapByTrace.get(this.traceKey(trace)) ?? null;
  }

  upsertTelemetry(processId: string, telemetry: MachineTelemetry): void {
    this.telemetryByProcess.set(processId, telemetry);
  }

  getTelemetry(processId: string): MachineTelemetry | null {
    return this.telemetryByProcess.get(processId) ?? null;
  }
}

export const liveDataStore = new LiveDataStore();
