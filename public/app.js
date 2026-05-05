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

const I18N = {
  en: {
    "brand.masterConsole": "Master Console",
    "nav.overview": "Dashboard Overview",
    "nav.reports": "Active 8D-Reports",
    "nav.supply": "Supply Agent",
    "nav.flow": "Flow Agent",
    "nav.quality": "Quality Agent",
    "nav.investment": "Investment & ROI",
    "top.globalRisk": "Global Risk Level",
    "top.auditMode": "Enable Audit-Mode",
    "top.language": "Language",
    "top.silenceAlerts": "Silence Alerts",
    "top.financialCounter": "Financial Counter",
    "overview.controlBoard": "The Control Board",
    "overview.controlBoardSub": "D1-D8 task cards with ownership details.",
    "overview.trafficLight": "Traffic Light Status",
    "overview.trafficLightSub": "Immediate risk signal for operations.",
    "overview.timestampedHistory": "Timestamped History",
    "overview.timestampedHistorySub": "Shows who approved which step and when.",
    "landing.kicker": "Real-time quality and supply command center",
    "landing.title": "Stop escalation before it stops production.",
    "landing.copy":
      "Control Agent connects Supply, Flow, and Quality into one operational cockpit with 8D traceability, risk signals, and immediate containment actions.",
    "landing.enter": "Open Dashboard",
    "pricing.title": "Investment & ROI (Value-Based Pricing)",
    "pricing.subtitle": "Clean 3-column pricing grid in USD.",
    "pricing.popular": "Most Popular",
    "pricing.tier1.name": "PILOT / TIER 2",
    "pricing.tier1.price": "$990 / month",
    "pricing.tier1.billing": "(billed annually)",
    "pricing.tier1.f1": "Supply Agent basic",
    "pricing.tier1.f2": "AI-Sourcing link",
    "pricing.tier1.f3": "SAP-Mock Connector",
    "pricing.tier1.target": "Target: Smaller production sites.",
    "pricing.tier2.name": "PROFESSIONAL / CAPTAIN'S CHOICE",
    "pricing.tier2.price": "$1,850 / month",
    "pricing.tier2.f1": "Full Supply & Flow Agent",
    "pricing.tier2.f2": "OEE Tracking",
    "pricing.tier2.f3": "Financial Counter",
    "pricing.tier2.f4": "Custom Alert Thresholds",
    "pricing.tier2.target": "Target: Core automotive suppliers in MEX/USA.",
    "pricing.tier3.name": "ENTERPRISE / AUDIT READY",
    "pricing.tier3.price": "Contact Sales",
    "pricing.tier3.billing": "(starts at $3,500/month)",
    "pricing.tier3.f1": "Full Suite",
    "pricing.tier3.f2": "Auto-8D Generation",
    "pricing.tier3.f3": "Multi-Line Support",
    "pricing.tier3.f4": "IATF 10.2 Compliance Suite",
    "pricing.tier3.target": "Target: Tier-1 Mega Plants.",
    "pricing.roiTitle": "ROI Callout",
    "pricing.roiText":
      "If Control Agent prevents just ONE hour of downtime ($50,000 avg.), it pays for its entire annual subscription in the first 15 minutes of a crisis.",
    "contact.title": "Protect your Production Value.",
    "contact.subtitle": "Tell us your current risk profile and receive a value-based estimate.",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Company Email",
    "contact.locationLabel": "Plant Location",
    "contact.locMexico": "Mexico",
    "contact.locUsa": "USA",
    "contact.locGermany": "Germany",
    "contact.locOther": "Other",
    "contact.riskLabel": "What is your hourly risk in case of a line stop?",
    "contact.submit": "Get My ROI Estimate",
    "contact.invalidEmail":
      "Please use a company email. Free email providers (Gmail/Hotmail/etc.) are not accepted.",
    "contact.criticalRisk":
      "Critical Risk detected. Our Captain's Control module is designed for your scale.",
    "contact.thankYou":
      "Based on your {risk}/hour risk, the Control Agent can save you approximately {saving} per month by reducing response time by 40%.",
    "founder.title": "Built in the Trenches, not in a Boardroom.",
    "founder.story":
      "I've been there. I've felt the pressure of a standing production line and the chaos of missing SAP data. The Control Agent wasn't born in a lab-it was born on the shop floor during a midnight shift when I realized that managers need a 'Captain's View,' not just a spreadsheet.",
    "founder.core":
      "I don't want to sell you software. I want to give you back the sleep I lost. My tool identifies the supply gap, monitors your machine flow, and calculates your risk in real-time USD-so you can lead with confidence.",
    "founder.signoff":
      "Let's secure your production together. Because I know exactly what's at stake.",
    "alerts.captain": "ATTENTION CAPTAIN: Immediate Action Required for Step D4!",
    "alerts.auto8d": "System created 8D-Report for Performance Gap",
  },
  es: {
    "brand.masterConsole": "Consola Maestra",
    "nav.overview": "Resumen del Panel",
    "nav.reports": "Reportes 8D Activos",
    "nav.supply": "Agente de Suministro",
    "nav.flow": "Agente de Flujo",
    "nav.quality": "Agente de Calidad",
    "nav.investment": "Inversion y ROI",
    "top.globalRisk": "Nivel Global de Riesgo",
    "top.auditMode": "Activar Modo Auditoria",
    "top.language": "Idioma",
    "top.silenceAlerts": "Silenciar Alertas",
    "top.financialCounter": "Contador Financiero",
    "overview.controlBoard": "El Tablero de Control",
    "overview.controlBoardSub": "Tarjetas de tareas D1-D8 con detalles de responsables.",
    "overview.trafficLight": "Estado de Semaforo",
    "overview.trafficLightSub": "Senal inmediata de riesgo para operaciones.",
    "overview.timestampedHistory": "Historial con Marca de Tiempo",
    "overview.timestampedHistorySub": "Muestra quien aprobo cada paso y cuando.",
    "landing.kicker": "Centro de mando en tiempo real para calidad y suministro",
    "landing.title": "Deten la escalacion antes de que detenga la produccion.",
    "landing.copy":
      "Control Agent conecta Suministro, Flujo y Calidad en una sola cabina operativa con trazabilidad 8D, senales de riesgo y acciones inmediatas de contencion.",
    "landing.enter": "Abrir Dashboard",
    "pricing.title": "Inversion y ROI (Precio Basado en Valor)",
    "pricing.subtitle": "Cuadricula limpia de 3 columnas en USD.",
    "pricing.popular": "Mas Popular",
    "pricing.tier1.name": "PILOT / TIER 2",
    "pricing.tier1.price": "$990 / mes",
    "pricing.tier1.billing": "(facturado anualmente)",
    "pricing.tier1.f1": "Supply Agent basico",
    "pricing.tier1.f2": "Enlace AI-Sourcing",
    "pricing.tier1.f3": "Conector SAP-Mock",
    "pricing.tier1.target": "Objetivo: Plantas de produccion pequenas.",
    "pricing.tier2.name": "PROFESSIONAL / CAPTAIN'S CHOICE",
    "pricing.tier2.price": "$1,850 / mes",
    "pricing.tier2.f1": "Supply & Flow Agent completos",
    "pricing.tier2.f2": "Seguimiento OEE",
    "pricing.tier2.f3": "Contador Financiero",
    "pricing.tier2.f4": "Umbrales de alerta personalizados",
    "pricing.tier2.target": "Objetivo: Proveedores automotrices clave en MEX/USA.",
    "pricing.tier3.name": "ENTERPRISE / AUDIT READY",
    "pricing.tier3.price": "Contactar Ventas",
    "pricing.tier3.billing": "(desde $3,500/mes)",
    "pricing.tier3.f1": "Suite completa",
    "pricing.tier3.f2": "Generacion Auto-8D",
    "pricing.tier3.f3": "Soporte multi-linea",
    "pricing.tier3.f4": "Suite de Cumplimiento IATF 10.2",
    "pricing.tier3.target": "Objetivo: Mega Plantas Tier-1.",
    "pricing.roiTitle": "ROI",
    "pricing.roiText":
      "Si Control Agent evita solo UNA hora de inactividad ($50,000 promedio), paga toda su suscripcion anual en los primeros 15 minutos de una crisis.",
    "contact.title": "Proteja el valor de su produccion.",
    "contact.subtitle": "Comparta su perfil de riesgo actual y reciba una estimacion basada en valor.",
    "contact.nameLabel": "Nombre",
    "contact.emailLabel": "Correo corporativo",
    "contact.locationLabel": "Ubicacion de planta",
    "contact.locMexico": "Mexico",
    "contact.locUsa": "USA",
    "contact.locGermany": "Alemania",
    "contact.locOther": "Otro",
    "contact.riskLabel": "Cual es su riesgo por hora en caso de paro de linea?",
    "contact.submit": "Obtener estimacion ROI",
    "contact.invalidEmail":
      "Use un correo corporativo. No se aceptan correos gratuitos (Gmail/Hotmail/etc.).",
    "contact.criticalRisk":
      "Riesgo critico detectado. Nuestro modulo Captain's Control esta disenado para su escala.",
    "contact.thankYou":
      "Con base en su riesgo de {risk}/hora, Control Agent puede ahorrarle aproximadamente {saving} por mes al reducir el tiempo de respuesta en 40%.",
    "founder.title": "Construido en la Trinchera, no en una Sala de Juntas.",
    "founder.story":
      "He estado ahi. Senti la presion de una linea de produccion detenida y el caos por datos SAP faltantes. Control Agent no nacio en un laboratorio: nacio en el piso de planta durante un turno de medianoche cuando entendi que los lideres necesitan una 'Vista de Capitan', no solo una hoja de calculo.",
    "founder.core":
      "No quiero venderte software. Quiero devolverte el sueno que yo perdi. Mi herramienta identifica la brecha de suministro, monitorea el flujo de maquina y calcula tu riesgo en USD en tiempo real para que lideres con confianza.",
    "founder.signoff":
      "Aseguremos tu produccion juntos. Porque se exactamente lo que esta en juego.",
    "alerts.captain": "ATENCION CAPITAN: Accion inmediata requerida para el Paso D4.",
    "alerts.auto8d": "El sistema creo un reporte 8D por brecha de rendimiento",
  },
  de: {
    "brand.masterConsole": "Master Konsole",
    "nav.overview": "Dashboard Ubersicht",
    "nav.reports": "Aktive 8D-Reports",
    "nav.supply": "Supply Agent",
    "nav.flow": "Flow Agent",
    "nav.quality": "Quality Agent",
    "nav.investment": "Investment & ROI",
    "top.globalRisk": "Globales Risiko-Level",
    "top.auditMode": "Audit-Modus aktivieren",
    "top.language": "Sprache",
    "top.silenceAlerts": "Alarme stummschalten",
    "top.financialCounter": "Finanzzaehler",
    "overview.controlBoard": "Das Control Board",
    "overview.controlBoardSub": "D1-D8 Aufgabenkarten mit Verantwortlichkeiten.",
    "overview.trafficLight": "Ampelstatus",
    "overview.trafficLightSub": "Sofortiges Risikosignal fuer den Betrieb.",
    "overview.timestampedHistory": "Zeitgestempelte Historie",
    "overview.timestampedHistorySub": "Zeigt, wer welchen Schritt wann freigegeben hat.",
    "landing.kicker": "Echtzeit-Leitzentrale fuer Qualitaet und Supply",
    "landing.title": "Stoppe Eskalation, bevor die Produktion stoppt.",
    "landing.copy":
      "Control Agent verbindet Supply, Flow und Quality in einem operativen Cockpit mit 8D-Traceability, Risikosignalen und sofortigen Containment-Aktionen.",
    "landing.enter": "Dashboard oeffnen",
    "pricing.title": "Investition & ROI (Value-Based Pricing)",
    "pricing.subtitle": "Sauberes 3-Spalten-Preismodell in USD.",
    "pricing.popular": "Am beliebtesten",
    "pricing.tier1.name": "PILOT / TIER 2",
    "pricing.tier1.price": "$990 / Monat",
    "pricing.tier1.billing": "(jaehrliche Abrechnung)",
    "pricing.tier1.f1": "Supply Agent basic",
    "pricing.tier1.f2": "AI-Sourcing Link",
    "pricing.tier1.f3": "SAP-Mock Connector",
    "pricing.tier1.target": "Ziel: Kleinere Produktionsstandorte.",
    "pricing.tier2.name": "PROFESSIONAL / CAPTAIN'S CHOICE",
    "pricing.tier2.price": "$1,850 / Monat",
    "pricing.tier2.f1": "Voller Supply & Flow Agent",
    "pricing.tier2.f2": "OEE Tracking",
    "pricing.tier2.f3": "Financial Counter",
    "pricing.tier2.f4": "Individuelle Alert-Schwellwerte",
    "pricing.tier2.target": "Ziel: Kern-Zulieferer Automotive in MEX/USA.",
    "pricing.tier3.name": "ENTERPRISE / AUDIT READY",
    "pricing.tier3.price": "Sales kontaktieren",
    "pricing.tier3.billing": "(ab $3,500/Monat)",
    "pricing.tier3.f1": "Full Suite",
    "pricing.tier3.f2": "Auto-8D Generierung",
    "pricing.tier3.f3": "Multi-Line Support",
    "pricing.tier3.f4": "IATF 10.2 Compliance Suite",
    "pricing.tier3.target": "Ziel: Tier-1 Mega Plants.",
    "pricing.roiTitle": "ROI-Box",
    "pricing.roiText":
      "Wenn Control Agent nur EINE Stunde Downtime verhindert (im Schnitt $50,000), bezahlt sich das gesamte Jahresabo in den ersten 15 Minuten einer Krise.",
    "contact.title": "Sichern Sie Ihre Wertschoepfung ab.",
    "contact.subtitle": "Teilen Sie Ihr aktuelles Risikoprofil und erhalten Sie eine wertbasierte Einschaetzung.",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Firmen-E-Mail",
    "contact.locationLabel": "Standort Werk",
    "contact.locMexico": "Mexiko",
    "contact.locUsa": "USA",
    "contact.locGermany": "Deutschland",
    "contact.locOther": "Sonstiges",
    "contact.riskLabel": "Wie hoch ist Ihr stündliches Risiko bei einem Linienstopp?",
    "contact.submit": "ROI-Einschaetzung erhalten",
    "contact.invalidEmail":
      "Bitte verwenden Sie eine Firmen-E-Mail. Freemailer (Gmail/Hotmail/etc.) sind nicht erlaubt.",
    "contact.criticalRisk":
      "Kritisches Risiko erkannt. Unser Captain's-Control-Modul ist fuer Ihre Groessenordnung ausgelegt.",
    "contact.thankYou":
      "Basierend auf Ihrem Risiko von {risk}/Stunde kann Control Agent durch 40% schnellere Reaktionszeit ungefaehr {saving} pro Monat einsparen.",
    "founder.title": "In der Praxis gebaut, nicht im Konferenzraum.",
    "founder.story":
      "Ich war dort. Ich kenne den Druck bei stillstehender Produktion und das Chaos durch fehlende SAP-Daten. Control Agent wurde nicht im Labor gebaut - sondern in der Nachtschicht auf dem Shopfloor, als ich merkte: Fuehrung braucht eine 'Captain's View' und nicht nur Tabellen.",
    "founder.core":
      "Ich will dir keine Software verkaufen. Ich will dir den Schlaf zurueckgeben, den ich verloren habe. Mein Tool erkennt Versorgungsluecken, ueberwacht den Maschinenfluss und berechnet dein Risiko in Echtzeit in USD - damit du sicher fuehren kannst.",
    "founder.signoff":
      "Lass uns deine Produktion gemeinsam absichern. Weil ich genau weiss, was auf dem Spiel steht.",
    "alerts.captain": "ACHTUNG CAPTAIN: Sofortiges Handeln fuer Schritt D4 erforderlich!",
    "alerts.auto8d": "System hat 8D-Report fuer Performance-Luecke erstellt",
  },
};

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
  language: "en",
};

const ALLOWED_FINANCIAL_ROLES = new Set(["CONTROL_OFFICER", "MANAGER"]);
const CAPTAIN_THRESHOLD_USD = 20000;

function t(key) {
  const dict = I18N[state.language] || I18N.en;
  return dict[key] || I18N.en[key] || key;
}

function tf(key, vars) {
  let str = t(key);
  Object.entries(vars || {}).forEach(([k, v]) => {
    str = str.replaceAll(`{${k}}`, String(v));
  });
  return str;
}

function applyI18nStatic() {
  document.documentElement.setAttribute("lang", state.language);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });
  document.getElementById("captain-banner").textContent = t("alerts.captain");
  document.getElementById("auto8d-notice").textContent = t("alerts.auto8d");
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const riskInput = document.getElementById("contact-risk");
    if (riskInput) {
      updateRiskUi(Number(riskInput.value || 0));
    }
  }
}

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

function bindLandingActions() {
  const enter = document.getElementById("enter-dashboard-btn");
  if (!enter) return;
  enter.addEventListener("click", () => {
    document.querySelector(".app-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function isCorporateEmail(email) {
  const domain = String(email || "").split("@")[1]?.toLowerCase() || "";
  const freeDomains = new Set([
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "yahoo.com",
    "icloud.com",
    "gmx.de",
    "web.de",
    "aol.com",
    "proton.me",
    "protonmail.com",
  ]);
  return Boolean(domain) && !freeDomains.has(domain);
}

function updateRiskUi(riskValue) {
  const riskValueEl = document.getElementById("contact-risk-value");
  const micro = document.getElementById("contact-risk-micro");
  if (!riskValueEl || !micro) return;
  riskValueEl.textContent = `${usd(riskValue)} / hour`;
  if (riskValue > 50000) {
    micro.textContent = t("contact.criticalRisk");
    micro.classList.remove("hidden");
  } else {
    micro.classList.add("hidden");
  }
}

function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const locationInput = document.getElementById("contact-location");
  const riskInput = document.getElementById("contact-risk");
  const errorEl = document.getElementById("contact-error");
  const thankYouEl = document.getElementById("contact-thankyou");
  riskInput.addEventListener("input", () => {
    const parsed = Number(riskInput.value || 0);
    const bounded = Math.max(10000, Math.min(250000, Number.isFinite(parsed) ? parsed : 50000));
    updateRiskUi(bounded);
  });
  updateRiskUi(Number(riskInput.value || 50000));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.classList.add("hidden");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const location = locationInput.value;
    const parsed = Number(riskInput.value || 0);
    const risk = Math.max(10000, Math.min(250000, Number.isFinite(parsed) ? parsed : 50000));
    if (!name || !email || !location) {
      errorEl.textContent = "Please complete all fields.";
      errorEl.classList.remove("hidden");
      return;
    }
    if (!isCorporateEmail(email)) {
      errorEl.textContent = t("contact.invalidEmail");
      errorEl.classList.remove("hidden");
      return;
    }
    const monthlySaving = risk * 0.4 * 30 * 24;
    thankYouEl.textContent = tf("contact.thankYou", {
      risk: usd(risk),
      saving: usd(monthlySaving),
    });
    thankYouEl.classList.remove("hidden");
    form.classList.add("hidden");
  });
}

function bindLanguageSelector() {
  const select = document.getElementById("language-select");
  if (!select) return;
  select.value = state.language;
  select.addEventListener("change", async () => {
    state.language = select.value || "en";
    localStorage.setItem("control-agent-language", state.language);
    applyI18nStatic();
    await Promise.all([loadReports(), loadSupply(), loadFlow(), loadQuality(), loadTopBar()]);
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
      notice.textContent = t("alerts.auto8d");
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
    button.textContent = state.language === "es" ? "Alertas silenciadas" : state.language === "de" ? "Alarme stumm" : "Alerts Silenced";
  });
  if (state.alertSoundMuted) {
    button.textContent = state.language === "es" ? "Alertas silenciadas" : state.language === "de" ? "Alarme stumm" : "Alerts Silenced";
  }
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
  state.language = localStorage.getItem("control-agent-language") || "en";
  if (!I18N[state.language]) state.language = "en";
  applyI18nStatic();
  await loadSessionRole();
  bindNavigation();
  bindLandingActions();
  bindContactForm();
  bindLanguageSelector();
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
