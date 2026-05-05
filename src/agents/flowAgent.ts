import type { FlowSnapshot } from "../types";

/**
 * FLOW_AGENT: Pure process sensor.
 * Only reports cycle time, bottleneck and output.
 */
export class FlowAgent {
  getSnapshot(processId: string): FlowSnapshot {
    const cycleTimeMinutes = 9.5;
    const outputPerHour = 52;
    const bottleneck = cycleTimeMinutes > 8;

    return {
      processId,
      cycleTimeMinutes,
      bottleneck,
      outputPerHour,
      updatedAt: new Date().toISOString(),
    };
  }
}
