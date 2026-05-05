import type { SapEketScheduleLine, SapMardStorage, TraceLink } from "../../../types";

export function buildD3EmergencyBlockTransaction(
  trace: TraceLink,
  batchId: string,
  mard: SapMardStorage,
  eket: SapEketScheduleLine[],
): string {
  const inTransit = eket
    .filter((line) => line.batchId === batchId)
    .reduce((acc, line) => acc + line.inboundQty, 0);

  return `MB1B;MOVE_TO_RESTRICTED;MAT=${trace.partId};BATCH=${batchId};FROM_LOC=${mard.storageLocation};QTY_BLOCK=${mard.unrestrictedStock};IN_TRANSIT=${inTransit}`;
}
