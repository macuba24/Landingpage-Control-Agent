import type { MachineTelemetry } from "../types";
import type { TelemetryIngestionPort } from "./contracts";
import { liveDataStore } from "./liveDataStore";
const { getLineMex04Telemetry } = require("../core/flow/logic/flowTelemetry.js");

/**
 * FLOW_AGENT interface bridge to machine telemetry.
 */
export class TelemetryAdapter implements TelemetryIngestionPort {
  getRealtime(processId: string): MachineTelemetry {
    const live = liveDataStore.getTelemetry(processId);
    if (live) return live;
    const line = getLineMex04Telemetry();
    return {
      processId,
      outputPerHourRealtime: line.realtimeOutputPerHour,
      targetOutputPerHour: line.targetOutputPerHour,
      cycleTimeRealtimeMinutes: line.cycleTimeMinutes,
      scrapRatePct: line.scrapRatePct,
      oeePct: line.oeePct,
      operator: line.operator,
      lineId: line.lineId,
      machineState: "DEGRADED",
      timestamp: new Date().toISOString(),
    };
  }
}
