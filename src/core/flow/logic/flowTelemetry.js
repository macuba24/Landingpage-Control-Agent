function calculateOeePercent(availability, performance, quality) {
  return Math.round(availability * performance * quality * 1000) / 10;
}

function getLineMex04Telemetry() {
  const availability = 0.92;
  const performance = 0.89;
  const quality = 0.95;
  return {
    lineId: "LINE-MEX-04",
    site: "Queretaro",
    targetOutputPerHour: 52,
    realtimeOutputPerHour: 46,
    cycleTimeMinutes: 9.5,
    scrapRatePct: 2.5,
    oeePct: calculateOeePercent(availability, performance, quality),
    operator: "Carlos Mendez",
  };
}

module.exports = {
  getLineMex04Telemetry,
  calculateOeePercent,
};
