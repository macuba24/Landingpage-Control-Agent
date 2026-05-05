const STEP_META = [
  { id: "D1", title: "D1 - Team Formation" },
  { id: "D2", title: "D2 - Problem Description" },
  { id: "D3", title: "D3 - Containment Actions" },
  { id: "D4", title: "D4 - Root Cause Analysis" },
  { id: "D5", title: "D5 - Corrective Actions" },
  { id: "D6", title: "D6 - Validation" },
  { id: "D7", title: "D7 - Preventive Actions" },
  { id: "D8", title: "D8 - Closure & Recognition" },
];

const state = {
  partId: "PART-1001",
  processId: "PROC-A01",
  auditMode: false,
  financialVisible: false,
  financialValueEur: 0,
  userRole: "TEAM_MEMBER",
  reports: [],
  selectedReportId: null,
  selectedCaseFinancialVisible: false,
  ownershipDrafts: {},
  alertSoundMuted: false,
  scenarioAExists: false,
  stockThreshold: 100,
  downtimeCostPerHour: 50000,
  maintenanceMode: false,
  altSourceShownOnceForMaterial: {},
  supplyCriticalAlertPlayed: false,
  emergencyBlockActive: false,
};

const ALLOWED_FINANCIAL_ROLES = new Set(["CONTROL_OFFICER", "MANAGER"]);
const CAPTAIN_THRESHOLD_USD = 20000;

function usd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function badgeClass(step) {
  if (step?.signed) return "GREEN";
  if (step?.signed === false) return "YELLOW";
  return "RED";
}

function dStepStatus(signOff) {
  if (!signOff) return "Not Started";
  if (signOff.signed) return "Completed";
  return "In Progress";
}

function statusBadgeClass(status) {
  if (status === "Completed") return "GREEN";
  if (status === "In Progress") return "YELLOW";
  return "RED";
}

function toDateInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function countdownText(iso) {
  if (!iso) return "No deadline";
  const ms = new Date(iso).getTime() - Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.ceil(Math.abs(ms) / dayMs);
  if (ms >= 0) return `${days} day(s) left`;
  return `${days} day(s) overdue`;
}

function overdueHours(iso) {
  if (!iso) return 0;
  const diffMs = Date.now() - new Date(iso).getTime();
  return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
}

function getDummyReports() {
  const now = Date.now();
  const inHours = (h) => new Date(now + h * 60 * 60 * 1000).toISOString();
  return [
    {
      report: { reportId: "2026-001" },
      trace: { partId: "PART-1001", processId: "PROC-A01" },
      status: "CRITICAL",
      risk: "HIGH",
      riskImpactEur: 24000,
      stepOwnership: {
        D1: { dStepOwner: "Nina Bauer", deadlineAt: inHours(10), sapUserId: null },
        D2: { dStepOwner: "Ali Demir", deadlineAt: inHours(22), sapUserId: null },
        D3: { dStepOwner: "Rainer Koch", deadlineAt: inHours(6), sapUserId: "SAP-D3-09" },
        D4: { dStepOwner: "Luca Voss", deadlineAt: inHours(34), sapUserId: "SAP-D4-11" },
        D5: { dStepOwner: "Mia Weber", deadlineAt: inHours(45), sapUserId: null },
        D6: { dStepOwner: "Omar Kaya", deadlineAt: inHours(58), sapUserId: null },
        D7: { dStepOwner: "Sara Lind", deadlineAt: inHours(72), sapUserId: null },
        D8: { dStepOwner: "Tom Otto", deadlineAt: inHours(96), sapUserId: null },
      },
      stepSignOff: {
        D1: { signed: true, signedBy: "nina@company.com", signedAt: inHours(-3) },
        D2: { signed: false },
        D3: { signed: false },
        D4: { signed: false },
        D5: { signed: false },
        D6: { signed: false },
        D7: { signed: false },
        D8: { signed: false },
      },
    },
  ];
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
}

function getSelectedReport() {
  return state.reports.find((r) => r.report.reportId === state.selectedReportId) || null;
}

function showView(view) {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${view}`));
}

function bindNavigation() {
  const nav = document.getElementById("main-nav");
  nav.addEventListener("click", (event) => {
    const btn = event.target.closest(".nav-item");
    if (!btn) return;
    showView(btn.dataset.view);
  });
}

function hasFinancialPermission() {
  return ALLOWED_FINANCIAL_ROLES.has(state.userRole);
}

async function loadSessionRole() {
  try {
    const session = await fetchJson("/session/me");
    state.userRole = (session.role || "TEAM_MEMBER").toUpperCase();
  } catch (_error) {
    state.userRole = "TEAM_MEMBER";
  }
}

function renderFinancialCounter() {
  const financial = document.getElementById("financial-counter");
  const unit = document.getElementById("financial-counter-unit");
  const toggle = document.getElementById("financial-privacy-toggle");
  const hint = document.getElementById("financial-permission-hint");
  const allowed = hasFinancialPermission();
  const disabledByAudit = state.auditMode;

  if (disabledByAudit) {
    financial.textContent = "--- USD";
    unit.classList.remove("usd-hot");
    financial.classList.add("masked");
    toggle.disabled = true;
    toggle.textContent = "🙈";
    hint.textContent = "Audit-Mode active: financial value is hidden and locked.";
    return;
  }

  if (!allowed) {
    state.financialVisible = false;
    financial.textContent = "--- USD";
    unit.classList.remove("usd-hot");
    financial.classList.add("masked");
    toggle.disabled = true;
    toggle.textContent = "🔒";
    hint.textContent = `Role ${state.userRole} cannot unmask. Allowed: CONTROL_OFFICER or MANAGER.`;
    return;
  }

  toggle.disabled = false;
  toggle.textContent = state.financialVisible ? "🙈" : "👁";
  hint.textContent = `Role ${state.userRole} can use privacy toggle.`;
  if (state.financialVisible) {
    financial.textContent = usd(state.financialValueEur);
    unit.classList.toggle("usd-hot", state.emergencyBlockActive);
    financial.classList.remove("masked");
  } else {
    financial.textContent = "--- USD";
    unit.classList.remove("usd-hot");
    financial.classList.add("masked");
  }
}

function renderCaseFinancial() {
  const el = document.getElementById("case-financial-impact");
  const btn = document.getElementById("case-financial-toggle");
  const selected = getSelectedReport();
  const allowed = hasFinancialPermission();
  const disabled = state.auditMode || !selected;
  btn.disabled = disabled || !allowed;
  btn.textContent = state.selectedCaseFinancialVisible && !disabled ? "🙈" : allowed ? "👁" : "🔒";
  if (disabled || !allowed || !state.selectedCaseFinancialVisible || state.auditMode) {
    el.textContent = "--- USD";
    el.classList.add("masked");
    return;
  }
  el.textContent = usd(selected.riskImpactEur || state.financialValueEur);
  el.classList.remove("masked");
}

async function loadTopBar() {
  const [risk, gauge, supply] = await Promise.all([
    fetchJson(`/dashboard/risk?partId=${state.partId}&processId=${state.processId}`),
    fetchJson("/dashboard/financial-gauge"),
    fetchJson(`/dashboard/supply?partId=${state.partId}&processId=${state.processId}&auditMode=${state.auditMode}`),
  ]);
  const riskLevel = document.getElementById("risk-level");
  state.scenarioAExists = Boolean(supply.scenarioAExists);
  riskLevel.textContent = state.scenarioAExists ? "CRITICAL" : risk.qualityDeviation?.severity || "LOW";
  const stockBelowThreshold = Number(supply.stock || 0) < Number(state.stockThreshold);
  state.emergencyBlockActive = (supply.eketScheduling || []).some((r) => String(r.lock_status).toUpperCase() === "BLOCKED");
  const riskLabel = String(supply.riskLevel || "").toUpperCase();
  let baseRiskUsd = 0;
  if (state.emergencyBlockActive) {
    baseRiskUsd = state.downtimeCostPerHour * 8;
  } else if (stockBelowThreshold) {
    baseRiskUsd = state.downtimeCostPerHour * 2;
  } else if (riskLabel !== "LOW") {
    baseRiskUsd = Math.max(gauge.gauge.impactScoreEur, risk.riskImpactEur || 0);
  }
  if (state.maintenanceMode) baseRiskUsd = 0;
  state.financialValueEur = baseRiskUsd;
  renderFinancialCounter();
  renderCaseFinancial();
  const criticalPulse = gauge.gauge.level === "DARK_RED" || state.scenarioAExists;
  riskLevel.classList.toggle("risk-pulse", criticalPulse);

  const traffic = document.getElementById("traffic-light");
  traffic.innerHTML = `
    <div class="light-wrap"><div class="light ${!criticalPulse && gauge.gauge.level === "GREEN" ? "on" : ""}" style="background:#22c55e"></div><span class="light-label">Green</span></div>
    <div class="light-wrap"><div class="light ${!criticalPulse && (gauge.gauge.level === "YELLOW" || gauge.gauge.level === "ORANGE") ? "on" : ""}" style="background:#eab308"></div><span class="light-label">Yellow</span></div>
    <div class="light-wrap"><div class="light ${criticalPulse ? "on" : ""}" style="background:#ef4444"></div><span class="light-label">Red</span></div>
  `;
}

function renderAuditHistory(firstReport) {
  const holder = document.getElementById("audit-history");
  if (!firstReport) return (holder.innerHTML = `<p class="muted">No step approvals available.</p>`);
  const entries = STEP_META.map(({ id }) => {
    const sign = firstReport.stepSignOff?.[id];
    if (!sign?.signed || !sign.signedBy || !sign.signedAt) return "";
    return `<div class="metric audit-highlight"><strong>${id}</strong><p>Approved by: ${sign.signedBy}</p><p>Timestamp: ${new Date(sign.signedAt).toLocaleString()}</p></div>`;
  }).filter(Boolean);
  holder.innerHTML = entries.length ? entries.join("") : `<p class="muted">No signed approvals yet.</p>`;
}

function renderCaptainBanner(report) {
  const banner = document.getElementById("captain-banner");
  if (!report) {
    banner.classList.add("hidden");
    return;
  }
  const maxOverdue = Math.max(...STEP_META.map(({ id }) => overdueHours(report.stepOwnership?.[id]?.deadlineAt)), 0);
  const financialImpact = Number(report.riskImpactEur || state.financialValueEur || 0);
  const trigger = financialImpact > CAPTAIN_THRESHOLD_USD || maxOverdue > 4;
  banner.classList.toggle("hidden", !trigger);
}

function statusOptions(current) {
  return ["Not Started", "In Progress", "Completed"]
    .map((opt) => `<option ${opt === current ? "selected" : ""}>${opt}</option>`)
    .join("");
}

function renderDStepDetailCards(report) {
  const host = document.getElementById("dstep-detail-grid");
  const draft = state.ownershipDrafts[report.report.reportId] || {};
  host.innerHTML = STEP_META.map(({ id, title }) => {
    const owner = report.stepOwnership?.[id] || {};
    const stepDraft = draft[id] || {};
    const status = dStepStatus(report.stepSignOff?.[id]);
    const deadline = owner.deadlineAt || "";
    const deadlineCount = countdownText(deadline);
    const defaultEmail = (owner.dStepOwner || "").includes("@") ? owner.dStepOwner : "";
    const defaultName = defaultEmail ? defaultEmail.split("@")[0] : owner.dStepOwner || "";
    const name = stepDraft.name || defaultName;
    const email = stepDraft.email || defaultEmail;
    const telHref = stepDraft.phone ? `tel:${stepDraft.phone}` : "tel:+49000000000";
    const mailHref = email ? `mailto:${email}` : "mailto:";
    return `
      <article class="dstep-card" data-step-id="${id}">
        <div class="rr-row">
          <label>
            <span>${title}</span>
            <input class="step-assignee-name" type="text" value="${name}" placeholder="Assigned person" />
          </label>
          <label>
            <span>Email</span>
            <input class="step-assignee-email" type="email" value="${email}" placeholder="assignee@company.com" />
          </label>
          <label>
            <span>Status</span>
            <select class="step-status">${statusOptions(status)}</select>
          </label>
          <div class="status-row">
            <a class="jump-btn" href="${telHref}" target="_self">Call</a>
            <a class="jump-btn" href="${mailHref}" target="_self">Mail</a>
          </div>
          <label>
            <span>Deadline</span>
            <input class="step-deadline" type="date" value="${toDateInputValue(deadline)}" />
          </label>
          <div class="ru-item full">
            <span>Countdown</span>
            <strong class="step-countdown">${deadlineCount}</strong>
          </div>
        </div>
      </article>
    `;
  }).join("");

  host.querySelectorAll(".step-deadline").forEach((input) => {
    input.addEventListener("change", () => {
      const card = input.closest(".dstep-card");
      const target = card.querySelector(".step-countdown");
      const value = input.value ? new Date(`${input.value}T23:59:59`).toISOString() : "";
      target.textContent = countdownText(value);
    });
  });

  host.querySelectorAll(".step-status").forEach((select) => {
    select.addEventListener("change", () => {
      const card = select.closest(".dstep-card");
      const badge = card.querySelector(".badge");
      const status = select.value;
      badge.textContent = status;
      badge.className = `badge ${statusBadgeClass(status)}`;
    });
  });

  host.querySelectorAll(".step-assignee-name, .step-assignee-email").forEach((input) => {
    input.addEventListener("input", () => {
      const card = input.closest(".dstep-card");
      const reportId = report.report.reportId;
      const stepId = card.dataset.stepId;
      state.ownershipDrafts[reportId] ||= {};
      state.ownershipDrafts[reportId][stepId] ||= {};
      state.ownershipDrafts[reportId][stepId][input.classList.contains("step-assignee-name") ? "name" : "email"] = input.value.trim();
      localStorage.setItem("control-agent-ownership-drafts", JSON.stringify(state.ownershipDrafts));
      const email = state.ownershipDrafts[reportId][stepId].email || "";
      const mailLink = card.querySelector('a[href^="mailto:"]');
      mailLink.setAttribute("href", email ? `mailto:${email}` : "mailto:");
    });
  });
}

function bindAgentDeepLinks() {
  document.querySelectorAll(".agent-link-row .jump-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      showView(btn.dataset.jumpView);
      closeReportDetail();
    });
  });
}

function openReportDetail(reportId) {
  state.selectedReportId = reportId;
  state.selectedCaseFinancialVisible = false;
  const drawer = document.getElementById("report-detail-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  drawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  requestAnimationFrame(() => drawer.classList.add("open"));
  document.querySelectorAll(".report-card").forEach((c) => c.classList.toggle("active", c.dataset.reportId === reportId));
  const report = getSelectedReport();
  document.getElementById("drawer-title").textContent = `8D Detail: #${report.report.reportId}`;
  document.getElementById("drawer-subtitle").textContent = `Material ${report.trace.partId} | Process ${report.trace.processId} | Status ${report.status}`;
  renderDStepDetailCards(report);
  renderCaseFinancial();
}

function closeReportDetail() {
  const drawer = document.getElementById("report-detail-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  drawer.classList.remove("open");
  setTimeout(() => drawer.classList.add("hidden"), 180);
  backdrop.classList.add("hidden");
  state.selectedReportId = null;
  state.selectedCaseFinancialVisible = false;
  document.querySelectorAll(".report-card").forEach((c) => c.classList.remove("active"));
  renderCaseFinancial();
}

async function loadReports() {
  const wall = await fetchJson("/quality/public-wall");
  const live = wall.open8DReports || [];
  state.reports = live.length ? live.map((item) => ({ ...item, riskImpactEur: state.financialValueEur })) : getDummyReports();
  const reportGrid = document.getElementById("report-grid");
  reportGrid.innerHTML = state.reports
    .map(
      (item) => `
      <div class="report-card" data-report-id="${item.report.reportId}">
        <strong>Report #${item.report.reportId}</strong>
        <p>Material: ${item.trace.partId}</p>
        <p>Process: ${item.trace.processId}</p>
        <p>Status: ${item.status}</p>
        <p>Risk: ${item.risk || "HIGH"}</p>
      </div>`,
    )
    .join("");

  reportGrid.querySelectorAll(".report-card").forEach((card) => {
    card.addEventListener("click", () => openReportDetail(card.dataset.reportId));
  });

  const first = state.reports[0];
  const tasks = document.getElementById("task-cards");
  if (!first) {
    tasks.innerHTML = `<p class="muted">Generate an 8D report to populate D-step cards.</p>`;
    renderAuditHistory(null);
    return;
  }

  tasks.innerHTML = STEP_META.map(({ id }) => {
    const ownership = first.stepOwnership[id];
    const signOff = first.stepSignOff[id];
    return `
      <div class="task-card ${badgeClass(signOff) === "RED" && (first.risk || "HIGH") === "HIGH" ? "risk-pulse" : ""}">
        <div class="task-head"><strong>${id}</strong><span class="badge ${badgeClass(signOff)}">${badgeClass(signOff)}</span></div>
        <div class="ru-grid">
          <div class="ru-item"><span>Assignee</span><strong>${ownership?.dStepOwner || "Unassigned"}</strong></div>
          <div class="ru-item"><span>Role</span><strong>${ownership?.sapUserId ? "SAP_USER" : "D_STEP_OWNER"}</strong></div>
          <div class="ru-item full"><span>Deadline</span><strong>${ownership?.deadlineAt ? new Date(ownership.deadlineAt).toLocaleString() : "-"}</strong></div>
        </div>
      </div>`;
  }).join("");
  renderAuditHistory(first);
  renderCaptainBanner(first);
}

async function loadSupply() {
  const supply = await fetchJson(
    `/dashboard/supply?partId=${state.partId}&processId=${state.processId}&auditMode=${state.auditMode}`,
  );
  const shouldShowAltSource =
    Number(supply.stock || 0) <= Number(state.stockThreshold);
  const criticalAlertState = shouldShowAltSource;
  if (criticalAlertState) {
    document.getElementById("risk-level").textContent = "SUPPLY AT RISK";
    if (!state.alertSoundMuted && !state.supplyCriticalAlertPlayed) {
      playAlertTone();
      state.supplyCriticalAlertPlayed = true;
      sessionStorage.setItem("control-agent-supply-critical-alert-played", "1");
    }
  } else {
    state.supplyCriticalAlertPlayed = false;
    sessionStorage.removeItem("control-agent-supply-critical-alert-played");
  }

  document.getElementById("supply-summary").innerHTML = `
    <div class="metric">
      <strong>Material</strong>
      <p>${state.partId}</p>
      ${
        shouldShowAltSource
          ? `<button class="alt-source-btn" data-material="${state.partId}">Source Alternative (AI-Search)</button>`
          : ""
      }
    </div>
    <div class="metric captain-control">
      <label>Captain's Control</label>
      <div class="captain-input-grid">
        <div>
          <label for="stock-threshold-input">ALERT TRIGGER (QTY)</label>
          <input id="stock-threshold-input" type="number" min="0" step="1" value="${state.stockThreshold}" title="Define the minimum stock quantity before AI-Sourcing and Alerts are triggered." />
        </div>
        <div>
          <label for="downtime-cost-input">DOWNTIME COST ($/HR)</label>
          <input id="downtime-cost-input" type="number" min="0" step="100" value="${state.downtimeCostPerHour}" placeholder="50000" title="Enter your plant's hourly downtime cost for accurate risk calculation." />
        </div>
        <div>
          <label for="maintenance-mode-toggle">Maintenance Mode</label>
          <input id="maintenance-mode-toggle" type="checkbox" ${state.maintenanceMode ? "checked" : ""} />
        </div>
      </div>
    </div>
    <div class="metric ${criticalAlertState ? "stock-card-action" : ""}"><strong>Stock</strong><p id="stock-value" class="${criticalAlertState ? "stock-critical" : ""}">${supply.stock}</p></div>
    <div class="metric"><strong>Transit</strong><p>${supply.transit}</p></div>
    <div class="metric"><strong>Risk</strong><p>${supply.riskLevel}</p></div>
    <div class="metric"><strong>System Health</strong><p>${supply.systemHealth === "SAP-EMULATOR-ACTIVE" ? "SAP-Emulator Active" : "Live SAP"}</p></div>`;
  if (state.auditMode && supply.complianceSummary) {
    document.getElementById("d3-stock-lock").innerHTML = `
      <div class="metric">
        <strong>Audit Compliance Summary</strong>
        <p>${supply.complianceSummary.statement}</p>
        <p>Total Batches: ${supply.complianceSummary.totalBatches}</p>
        <p>Restricted: ${supply.complianceSummary.restrictedBatches}</p>
        <p>Transit Qty: ${supply.complianceSummary.totalTransitQty}</p>
      </div>
      <div class="compliance-note">Notice: AI-generated suggestions. Final IATF validation required by purchasing department.</div>`;
    bindAlternativeSourceSearch();
    bindCaptainInputs();
    return;
  }

  const rows = (supply.eketScheduling || [])
    .map(
      (r) =>
        `<tr><td>${r.batch_number || "-"}</td><td>${r.material_id || "-"}</td><td>${Number(r.stock_level ?? 0)}</td><td>${Number(r.transit_qty ?? 0)}</td><td>${lockStatusChip(r.lock_status || "Available")}</td><td><button class="danger-btn" data-batch="${r.batch_number || ""}">Emergency Block</button></td></tr>`,
    )
    .join("");
  document.getElementById("d3-stock-lock").innerHTML = `<table><thead><tr><th>Batch</th><th>Material</th><th>Stock (MARD-LABST)</th><th>Transit (EKET)</th><th>Lock Status</th><th>Action</th></tr></thead><tbody>${rows || "<tr><td colspan='6'>No SAP supply rows.</td></tr>"}</tbody></table><div class="compliance-note">Notice: AI-generated suggestions. Final IATF validation required by purchasing department.</div>`;
  bindAlternativeSourceSearch();
  bindCaptainInputs();
  document.querySelectorAll(".danger-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const batchId = btn.dataset.batch;
      try {
        const result = await fetchJson("/quality/d3-one-click-block", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ partId: state.partId, processId: state.processId, batchId }),
        });
        state.emergencyBlockActive = true;
        const counterCard = document.querySelector(".counter-card");
        if (counterCard) {
          counterCard.classList.remove("risk-flash");
          requestAnimationFrame(() => counterCard.classList.add("risk-flash"));
        }
        alert(`${result.message}\n\nTransaction:\n${result.transaction}`);
        await Promise.all([loadSupply(), loadTopBar()]);
      } catch (err) {
        alert(`Block failed: ${err.message}`);
      }
    });
  });
}

function bindAlternativeSourceSearch() {
  document.querySelectorAll(".alt-source-btn").forEach((button) => {
    const material = button.dataset.material || state.partId;
    if (!state.altSourceShownOnceForMaterial[material]) {
      button.classList.add("pulse-once");
      state.altSourceShownOnceForMaterial[material] = true;
    }
    button.addEventListener("click", () => {
      const query = `IATF 16949 certified supplier for ${material} in Mexico and Southern USA`;
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function lockStatusChip(status) {
  const normalized = String(status || "Available");
  const cls =
    normalized.toUpperCase() === "BLOCKED"
      ? "blocked"
      : normalized.toUpperCase() === "CRITICAL"
        ? "critical"
        : "available";
  return `<span class="lock-chip ${cls}">${normalized}</span>`;
}

function bindStockThresholdInput() {
  const input = document.getElementById("stock-threshold-input");
  if (!input) return;
  input.addEventListener("change", async () => {
    const next = Number(input.value);
    state.stockThreshold = Number.isFinite(next) && next >= 0 ? next : state.stockThreshold;
    sessionStorage.setItem("control-agent-stock-threshold", String(state.stockThreshold));
    await loadSupply();
    await loadTopBar();
  });
}

function bindCaptainInputs() {
  bindStockThresholdInput();
  const input = document.getElementById("downtime-cost-input");
  if (!input) return;
  input.addEventListener("input", async () => {
    const next = Number(input.value);
    state.downtimeCostPerHour =
      Number.isFinite(next) && next >= 0 ? next : state.downtimeCostPerHour;
    sessionStorage.setItem(
      "control-agent-downtime-cost-usd",
      String(state.downtimeCostPerHour),
    );
    await loadTopBar();
  });

  const maintenance = document.getElementById("maintenance-mode-toggle");
  if (maintenance) {
    maintenance.addEventListener("change", async () => {
      state.maintenanceMode = Boolean(maintenance.checked);
      sessionStorage.setItem("control-agent-maintenance-mode", state.maintenanceMode ? "1" : "0");
      await loadTopBar();
    });
  }
}

async function loadFlow() {
  const flow = await fetchJson(`/dashboard/flow?partId=${state.partId}&processId=${state.processId}`);
  document.getElementById("flow-content").innerHTML = `
    <div class="metric"><strong>Cycle Time</strong><p>${flow.cycleTimeMinutes ?? 0} min</p></div>
    <div class="metric"><strong>Output</strong><p>${flow.outputPerHour ?? 0} / h</p></div>
    <div class="metric"><strong>Realtime Output</strong><p>${flow.telemetry?.outputPerHourRealtime ?? 0} / h</p></div>
    <div class="metric"><strong>Machine</strong><p>${flow.telemetry?.machineState ?? "UNKNOWN"}</p></div>
    <div class="metric"><strong>Delta Output</strong><p>${flow.deltaOutputPerHour ?? 0}</p></div>
    <div class="metric"><strong>Scrap Rate</strong><p>${flow.telemetry?.scrapRatePct ?? 0}%</p></div>
    <div class="metric"><strong>OEE</strong><p>${flow.telemetry?.oeePct ?? 0}%</p></div>
    <div class="metric"><strong>Operator</strong><p>${flow.telemetry?.operator ?? "-"}</p></div>`;

  document.getElementById("flow-table").innerHTML = `<table><thead><tr><th>Line</th><th>Target</th><th>Realtime</th><th>Cycle Time</th><th>Scrap Rate</th><th>OEE</th><th>Operator</th></tr></thead><tbody><tr><td>${flow.telemetry?.lineId ?? "LINE-MEX-04"}</td><td>${flow.outputPerHour ?? 0}</td><td>${flow.telemetry?.outputPerHourRealtime ?? 0}</td><td>${flow.cycleTimeMinutes ?? 0}</td><td>${flow.telemetry?.scrapRatePct ?? 0}%</td><td>${flow.telemetry?.oeePct ?? 0}%</td><td>${flow.telemetry?.operator ?? "-"}</td></tr></tbody></table>`;
}

async function runFlowAutomation() {
  const notice = document.getElementById("auto8d-notice");
  try {
    const result = await fetchJson("/automation/flow-auto-8d", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partId: "PART-1001",
        processId: "LINE-MEX-04",
        downtimeCostPerHourUsd: state.downtimeCostPerHour,
      }),
    });
    state.financialValueEur = result.totalLossUsd ?? state.financialValueEur;
    renderFinancialCounter();
    if (result.created) {
      notice.textContent = "System created 8D-Report for Performance Gap";
      notice.classList.remove("hidden");
      await loadReports();
      return;
    }
    notice.classList.add("hidden");
  } catch (_error) {
    notice.classList.add("hidden");
  }
}

async function loadQuality() {
  const [history, receipts] = await Promise.all([fetchJson("/quality/internal-history"), fetchJson("/quality/distribution-receipts")]);
  document.getElementById("quality-content").innerHTML = `
    <div class="metric"><strong>Archived 8D PDFs</strong><p>${history.records.length}</p></div>
    <div class="metric"><strong>Distribution Receipts</strong><p>${receipts.receipts.length}</p></div>
    <div class="metric"><strong>Export Policy</strong><p>FMEA blocked for customer send</p></div>`;
  document.getElementById("quality-internal-links").innerHTML = `<div class="metric"><strong>Internal FMEA Reference</strong><p><a href="#" onclick="return false;">Open FMEA Process Document</a></p></div>`;
}

function applyAuditMode() {
  document.body.classList.toggle("audit-mode", state.auditMode);
  renderFinancialCounter();
  renderCaseFinancial();
}

function bindAuditToggle() {
  document.getElementById("audit-mode-toggle").addEventListener("change", async (event) => {
    state.auditMode = Boolean(event.target.checked);
    applyAuditMode();
    await Promise.all([loadTopBar(), loadSupply()]);
  });
}

function bindFinancialToggle() {
  document.getElementById("financial-privacy-toggle").addEventListener("click", () => {
    if (!hasFinancialPermission() || state.auditMode) return;
    state.financialVisible = !state.financialVisible;
    renderFinancialCounter();
  });
}

function bindReportDrawerActions() {
  document.getElementById("drawer-close").addEventListener("click", closeReportDetail);
  document.getElementById("drawer-backdrop").addEventListener("click", closeReportDetail);
  document.getElementById("case-financial-toggle").addEventListener("click", () => {
    if (state.auditMode || !hasFinancialPermission() || !state.selectedReportId) return;
    state.selectedCaseFinancialVisible = !state.selectedCaseFinancialVisible;
    renderCaseFinancial();
  });
}

function playAlertTone() {
  try {
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) return;
    const ctx = new audioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 880;
    gain.gain.value = 0.06;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (_error) {
    // Audio can be blocked by browser policy.
  }
}

async function checkCriticalEscalationAlert() {
  try {
    const payload = await fetchJson("/quality/financial-risk-alerts");
    const alerts = payload.alerts || [];
    const level3 = alerts.filter((a) => Number(a.overdueHours || 0) > 4);
    if (!level3.length) return;
    const seen = new Set(JSON.parse(localStorage.getItem("control-agent-seen-l3-alerts") || "[]"));
    const unseen = level3.filter((a) => !seen.has(a.alertId));
    if (!unseen.length) return;
    unseen.forEach((a) => seen.add(a.alertId));
    localStorage.setItem("control-agent-seen-l3-alerts", JSON.stringify(Array.from(seen)));
    if (!state.alertSoundMuted) playAlertTone();
  } catch (_error) {
    // Non-blocking.
  }
}

function bindAlertSilence() {
  const button = document.getElementById("silence-alerts-btn");
  button.addEventListener("click", () => {
    state.alertSoundMuted = true;
    sessionStorage.setItem("control-agent-alert-muted", "1");
    button.textContent = "Alerts Silenced";
  });
  if (state.alertSoundMuted) button.textContent = "Alerts Silenced";
}

function bindDemoTrigger() {
  document.addEventListener("keydown", async (event) => {
    if (event.key.toLowerCase() !== "d") return;
    try {
      const result = await fetchJson("/supply/demo-trigger-critical", { method: "POST" });
      alert(result.message);
      await Promise.all([loadSupply(), loadTopBar()]);
    } catch (_error) {
      // Non-blocking hidden trigger.
    }
  });
}

async function init() {
  try {
    state.ownershipDrafts = JSON.parse(localStorage.getItem("control-agent-ownership-drafts") || "{}");
  } catch (_error) {
    state.ownershipDrafts = {};
  }
  state.stockThreshold = Number(sessionStorage.getItem("control-agent-stock-threshold") || "100") || 100;
  state.downtimeCostPerHour =
    Number(sessionStorage.getItem("control-agent-downtime-cost-usd") || "50000") || 50000;
  state.maintenanceMode = sessionStorage.getItem("control-agent-maintenance-mode") === "1";
  state.alertSoundMuted = sessionStorage.getItem("control-agent-alert-muted") === "1";
  state.supplyCriticalAlertPlayed =
    sessionStorage.getItem("control-agent-supply-critical-alert-played") === "1";
  await loadSessionRole();
  bindNavigation();
  bindAuditToggle();
  bindFinancialToggle();
  bindReportDrawerActions();
  bindAgentDeepLinks();
  bindAlertSilence();
  bindDemoTrigger();
  try {
    await Promise.all([loadTopBar(), loadReports(), loadSupply(), loadFlow(), loadQuality()]);
    await runFlowAutomation();
    applyAuditMode();
    await checkCriticalEscalationAlert();
  } catch (error) {
    console.error(error);
    document.getElementById("risk-level").textContent = "ERROR";
  }
}

init();
