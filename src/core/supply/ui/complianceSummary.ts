import type { SupplyKrakenRow } from "../logic/sapSupplyMapper";

export function buildSupplyComplianceSummary(rows: SupplyKrakenRow[]) {
  const restrictedBatches = rows.filter(
    (r) => r.lock_status === "Critical" || r.lock_status === "BLOCKED",
  ).length;
  const totalTransit = rows.reduce((acc, r) => acc + r.transit_qty, 0);
  return {
    mode: "AUDIT_COMPLIANCE_SUMMARY",
    totalBatches: rows.length,
    restrictedBatches,
    unrestrictedBatches: rows.length - restrictedBatches,
    totalTransitQty: totalTransit,
    statement:
      "Audit mode active: technical SAP table hidden, compliance-level summary shown.",
  };
}
