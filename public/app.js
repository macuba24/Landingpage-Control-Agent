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
    "brand.tagline": "Manufacturing Execution & Supply Chain Intelligence · Automotive Tier 1/2",
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
    "landing.kicker": "Automotive Tier 1/2 · USA & Mexico",
    "landing.timestampBadge": "2:47 AM",
    "landing.heroHeadline": "It's 2:47 AM. Your line is down. Your phone won't stop ringing.",
    "landing.heroHeadlineAccent": "And your SAP shows nothing.",
    "landing.heroSubLead": "Most plant managers see the crisis after it costs them",
    "landing.heroSubTail":
      "Control Agent shows you the risk before the call comes in - in real-time, in one cockpit.",
    "landing.heroSub":
      "Most plant managers see the crisis after it costs them $80,000. Control Agent shows you the risk before the call comes in - in real-time, in one cockpit.",
    "landing.heroBody": "Supply. Flow. Quality. 8D traceability. One screen. Zero surprises.",
    "landing.ctaDemo": "See My Risk Right Now →",
    "landing.ctaTrust": "No commitment. No sales call. Just your number.",
    "landing.trustBox":
      "15+ Years in Automotive Tier-1. I built this because I've been in your shoes at 2 AM.",
    "landing.enter": "Open Dashboard",
    "nav.mobile.hero": "Hero",
    "nav.mobile.story": "Story",
    "nav.mobile.triad": "Product",
    "nav.mobile.roi": "ROI",
    "nav.mobile.pricing": "Pricing",
    "nav.mobile.contact": "Contact",
    "mobile.riskScoreTitle": "Financial Risk Score",
    "mobile.riskLevel.low": "Low",
    "mobile.riskLevel.watch": "Watch",
    "mobile.riskLevel.elevated": "Elevated",
    "mobile.riskLevel.critical": "Critical",
    "mobile.riskHint.low": "Operations within normal tolerance. Keep monitoring supply and flow.",
    "mobile.riskHint.watch": "Early stress signals. Validate stock, scheduling locks, and line output.",
    "mobile.riskHint.elevated": "Material financial exposure. Prioritize containment and captain review.",
    "mobile.riskHint.critical": "Immediate escalation posture — financial counter and supply locks are driving exposure.",
    "mobile.supplyCardTitle": "Supply / batch",
    "mobile.flowCardTitle": "Flow / line",
    "mobile.stock": "Stock",
    "mobile.transit": "Transit",
    "mobile.lock": "Lock",
    "mobile.batch": "Batch",
    "mobile.emergencyBlock": "Emergency block",
    "mobile.targetOut": "Target out",
    "mobile.realtimeOut": "Realtime out",
    "mobile.oee": "OEE",
    "mobile.scrap": "Scrap",
    "landing.heroFootnote":
      "Deployed on US-region infrastructure to reduce latency for Mexico and US operations teams.",
    "landing.riskBadge": "Risk signal",
    "landing.riskTitle": "One hour of downtime can erase a quarter of margin.",
    "landing.bullet1": "SAP-aligned traceability (MARD / batch / containment) with Captain thresholds.",
    "landing.bullet2": "Flow telemetry, OEE, scrap — tied to financial counter in USD.",
    "landing.bullet3": "Auto-8D drafting path aligned with IATF 10.2 discipline (audit-ready mode).",
    "founder.scarsTitle": "Built in the Trenches",
    "founder.scarsKicker": "From a 3:00 AM plant call — not a slide deck.",
    "founder.keyline": "I don't sell software. I sell the sleep you lost.",
    "founder.trustQuote":
      "I've spent 20 years on the shop floor in Tier-1 Automotive. I didn't build this to sell software; I built it to stop the 2 AM phone calls and the $50k/hour penalties.",
    "founder.trustName": "Rainer Hampicke, Founder & Industry Expert.",
    "founder.story":
      "The phone rang at 3:00 AM. Another line down — and SAP screens full of “undefined” fields while operations waited for a decision. That night, Control Agent stopped being an idea. It became the Captain’s view I wished I had: supply reality, flow truth, and quality discipline in one place — before the line pays the invoice.",
    "triad.title": "The Tool Triad",
    "triad.subtitle": "Three agents. One command posture. Built for automotive operations.",
    "triad.supplyTitle": "Supply Agent",
    "triad.supplyBody":
      "SAP MARD-live sync plus an AI-intelligence gateway for alternative sourcing (US/MEX).",
    "triad.flowTitle": "Flow Agent",
    "triad.flowBody":
      "Performance telemetry, OEE, scrap analysis, and operator traceability — tied to escalation logic.",
    "triad.qualityTitle": "Quality Agent",
    "triad.qualityBody":
      "Auto-8D report path (IATF 10.2 aligned) plus a global financial counter in USD for leadership alignment.",
    "roi.title": "Interactive ROI Calculator",
    "roi.subtitle":
      "If Control Agent helps reduce downtime cost exposure by just 5% annually, what does that return?",
    "roi.hint": "Illustrative model for executive conversations — not a guarantee.",
    "roi.sliderLabel": "Your hourly downtime cost ($ USD)",
    "roi.hourlyPrefix": "Hourly exposure",
    "roi.annualLabel": "Estimated annual value of a 5% downtime reduction",
    "roi.vsPro":
      "That annual upside is about {ratio}× the Professional plan ({pro}/mo) — before counting faster response, audit readiness, and supplier containment.",
    "compliance.iatf": "IATF 16949 Compliant Architecture",
    "compliance.usHost": "US-Based Data Hosting",
    "compliance.iatfFooter": "IATF 16949 compliant architecture (discipline-first design).",
    "compliance.renderUs": "Hosted on US-region infrastructure (e.g. Render.com).",
    "pricing.pageTitle": "Pricing",
    "pricing.pageSubtitle": "USD SaaS tiers for Tier 1/2 automotive operations.",
    "pricing.title": "Investment & ROI (Value-Based Pricing)",
    "pricing.subtitle": "Clean 3-column pricing grid in USD.",
    "pricing.popular": "Most Popular",
    "pricing.tier1.name": "PILOT",
    "pricing.tier1.price": "$990 / month",
    "pricing.tier1.billing": "billed annually",
    "pricing.tier1.f1": "Basic Supply Agent",
    "pricing.tier1.f2": "AI sourcing gateway",
    "pricing.tier1.f3": "SAP-Mock Connector",
    "pricing.tier1.target": "Target: Smaller production sites.",
    "pricing.tier2.name": "PROFESSIONAL",
    "pricing.tier2.price": "$1,850 / month",
    "pricing.tier2.f1": "Full Supply & Flow",
    "pricing.tier2.f2": "Financial Counter (USD)",
    "pricing.tier2.f3": "Captain thresholds & alerts",
    "pricing.tier2.f4": "Custom Alert Thresholds",
    "pricing.tier2.target": "Target: Core automotive suppliers in MEX/USA.",
    "pricing.tier3.name": "ENTERPRISE",
    "pricing.tier3.price": "Contact Sales",
    "pricing.tier3.billing": "Multi-plant · full automation path",
    "pricing.tier3.f1": "Multi-plant support",
    "pricing.tier3.f2": "Full IATF 10.2 automation suite",
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
    "contact.riskLabel": "Estimated hourly downtime cost ($ USD)",
    "contact.submit": "Get My Control Back",
    "contact.invalidEmail":
      "Please use a company email. Free email providers (Gmail/Hotmail/etc.) are not accepted.",
    "contact.criticalRisk":
      "Critical Risk detected. Our Captain's Control module is designed for your scale.",
    "contact.thankYou":
      "Based on your {risk}/hour risk, the Control Agent can save you approximately {saving} per month by reducing response time by 40%.",
    "monster.costKicker": "Cost of Silence",
    "monster.costHeadline": "Every minute of downtime costs up to $833.",
    "monster.costBody":
      "While your SAP is \"syncing\", you are losing money. Control Agent bridges the gap between ERP lag and shop-floor reality.",
    "monster.pillarsTitle": "The 3-Pillar Solution",
    "monster.pillar1Title": "Supply Agent",
    "monster.pillar1Body": "AI-driven risk detection before the truck even leaves the supplier.",
    "monster.pillar2Title": "Flow Agent",
    "monster.pillar2Body": "Real-time bottleneck analysis. No more guessing where the parts are.",
    "monster.pillar3Title": "Quality Agent",
    "monster.pillar3Body": "Instant 8D-transparency. Stop defects before they hit the assembly line.",
    "monster.techTitle": "Hosted on US-West (Oregon) for ultra-low latency in North America.",
    "monster.techB1": "Cloud-native",
    "monster.techB2": "SOC2 compliant",
    "monster.techB3": "Zero-config SAP integration",
    "monster.finalHeadline": "Don't wait for the next 2:47 AM call.",
    "monster.finalCta": "Secure My Production Now",
    "alerts.captain": "ATTENTION CAPTAIN: Immediate Action Required for Step D4!",
    "alerts.auto8d": "System created 8D-Report for Performance Gap",
  },
  es: {
    "brand.masterConsole": "Consola Maestra",
    "brand.tagline": "MES & inteligencia de cadena de suministro · Tier 1/2 automotriz",
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
    "landing.kicker": "Tier 1/2 automotriz · USA y Mexico",
    "landing.timestampBadge": "2:47 AM",
    "landing.heroHeadline": "Son las 2:47 AM. Su linea esta detenida. Su telefono no deja de sonar.",
    "landing.heroHeadlineAccent": "Y su SAP no muestra nada.",
    "landing.heroSubLead": "La mayoria de gerentes ve la crisis cuando ya costo",
    "landing.heroSubTail":
      "Control Agent le muestra el riesgo antes de que llegue la llamada, en tiempo real y en un solo cockpit.",
    "landing.heroSub":
      "La mayoria de gerentes ve la crisis cuando ya costo $80,000. Control Agent le muestra el riesgo antes de que llegue la llamada, en tiempo real y en un solo cockpit.",
    "landing.ctaDemo": "Iniciar Mission Control",
    "landing.trustBox":
      "15+ anos en Tier-1 automotriz. Construi esto porque estuve en tus zapatos a las 2 AM.",
    "landing.enter": "Abrir panel",
    "nav.mobile.hero": "Inicio",
    "nav.mobile.story": "Historia",
    "nav.mobile.triad": "Producto",
    "nav.mobile.roi": "ROI",
    "nav.mobile.pricing": "Precios",
    "nav.mobile.contact": "Contacto",
    "mobile.riskScoreTitle": "Puntuacion de riesgo financiero",
    "mobile.riskLevel.low": "Bajo",
    "mobile.riskLevel.watch": "Atencion",
    "mobile.riskLevel.elevated": "Elevado",
    "mobile.riskLevel.critical": "Critico",
    "mobile.riskHint.low": "Operacion en tolerancia normal. Siga monitoreando suministro y flujo.",
    "mobile.riskHint.watch": "Senales tempranas. Valide stock, bloqueos de programacion y salida de linea.",
    "mobile.riskHint.elevated": "Exposicion financiera material. Priorice contencion y revision de capitan.",
    "mobile.riskHint.critical": "Postura de escalamiento inmediato — contador y bloqueos de suministro elevan el riesgo.",
    "mobile.supplyCardTitle": "Suministro / lote",
    "mobile.flowCardTitle": "Flujo / linea",
    "mobile.stock": "Stock",
    "mobile.transit": "Transito",
    "mobile.lock": "Bloqueo",
    "mobile.batch": "Lote",
    "mobile.emergencyBlock": "Bloqueo de emergencia",
    "mobile.targetOut": "Salida objetivo",
    "mobile.realtimeOut": "Salida en tiempo real",
    "mobile.oee": "OEE",
    "mobile.scrap": "Scrap",
    "landing.heroFootnote":
      "Desplegado en infraestructura en region de EE.UU. para reducir latencia a equipos en Mexico y EE.UU.",
    "landing.riskBadge": "Senal de riesgo",
    "landing.riskTitle": "Una hora de paro puede borrar un trimestre de margen.",
    "landing.bullet1":
      "Trazabilidad alineada a SAP (MARD / lote / contencion) con umbrales de Capitan.",
    "landing.bullet2": "Telemetria de flujo, OEE, scrap — ligada a contador financiero en USD.",
    "landing.bullet3":
      "Camino de borrador 8D alineado a disciplina IATF 10.2 (modo auditoria).",
    "founder.scarsTitle": "Construido en la trinchera",
    "founder.scarsKicker": "Desde una llamada a las 3:00 AM en planta — no desde un PowerPoint.",
    "founder.keyline": "No vendo software. Vendo el sueno que perdio.",
    "founder.trustQuote":
      "Pase 20 anos en piso de planta Tier-1 automotriz. No construi esto para vender software; lo construi para detener las llamadas de las 2 AM y las penalizaciones de $50k/h.",
    "founder.trustName": "Rainer Hampicke, Fundador y Experto de la Industria.",
    "founder.story":
      "Sonaron las 3:00 AM. Otra linea abajo — y pantallas SAP llenas de campos “indefinidos” mientras operaciones esperaba una decision. Esa noche, Control Agent dejo de ser una idea. Se volvio la vista de Capitan que hubiera querido tener: realidad de suministro, verdad de flujo y disciplina de calidad en un solo lugar — antes de que la linea pague la factura.",
    "triad.title": "La triada de herramientas",
    "triad.subtitle": "Tres agentes. Un solo mando. Pensado para operaciones automotrices.",
    "triad.supplyTitle": "Supply Agent",
    "triad.supplyBody":
      "Sincronizacion MARD en vivo mas gateway de inteligencia AI para abastecimiento alternativo (US/MEX).",
    "triad.flowTitle": "Flow Agent",
    "triad.flowBody":
      "Telemetria de desempeno, OEE, analisis de scrap y trazabilidad del operador — ligada a escalamiento.",
    "triad.qualityTitle": "Quality Agent",
    "triad.qualityBody":
      "Camino de reporte 8D automatico (alineado IATF 10.2) mas contador financiero global en USD.",
    "roi.title": "Calculadora interactiva de ROI",
    "roi.subtitle":
      "Si Control Agent ayuda a reducir solo 5% la exposicion anual a costo por paros, cual es el retorno?",
    "roi.hint": "Modelo ilustrativo para conversaciones ejecutivas — no es garantia.",
    "roi.sliderLabel": "Su costo horario por paro ($ USD)",
    "roi.hourlyPrefix": "Exposicion horaria",
    "roi.annualLabel": "Valor anual estimado de reducir paros 5%",
    "roi.vsPro":
      "Ese upside anual es ~{ratio}× el plan Professional ({pro}/mes) — antes de contar respuesta mas rapida, auditoria y contencion con proveedores.",
    "compliance.iatf": "Arquitectura alineada a IATF 16949",
    "compliance.usHost": "Alojamiento de datos en EE.UU.",
    "compliance.iatfFooter": "Arquitectura alineada a IATF 16949 (diseno disciplina primero).",
    "compliance.renderUs": "Alojado en infraestructura en region EE.UU. (p. ej. Render.com).",
    "pricing.pageTitle": "Precios",
    "pricing.pageSubtitle": "SaaS en USD para operaciones Tier 1/2.",
    "pricing.title": "Inversion y ROI (Precio Basado en Valor)",
    "pricing.subtitle": "Cuadricula limpia de 3 columnas en USD.",
    "pricing.popular": "Mas Popular",
    "pricing.tier1.name": "PILOTO",
    "pricing.tier1.price": "$990 / mes",
    "pricing.tier1.billing": "facturado anualmente",
    "pricing.tier1.f1": "Supply Agent basico",
    "pricing.tier1.f2": "Gateway AI de abastecimiento",
    "pricing.tier1.f3": "Conector SAP-Mock",
    "pricing.tier1.target": "Objetivo: Plantas de produccion pequenas.",
    "pricing.tier2.name": "PROFESIONAL",
    "pricing.tier2.price": "$1,850 / mes",
    "pricing.tier2.f1": "Supply y Flow completos",
    "pricing.tier2.f2": "Contador financiero (USD)",
    "pricing.tier2.f3": "Umbrales y alertas de Capitan",
    "pricing.tier2.f4": "Umbrales de alerta personalizados",
    "pricing.tier2.target": "Objetivo: Proveedores automotrices clave en MEX/USA.",
    "pricing.tier3.name": "EMPRESARIAL",
    "pricing.tier3.price": "Contactar ventas",
    "pricing.tier3.billing": "Multi-planta · automatizacion completa",
    "pricing.tier3.f1": "Soporte multi-planta",
    "pricing.tier3.f2": "Suite completa de automatizacion IATF 10.2",
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
    "contact.riskLabel": "Costo horario estimado por paro ($ USD)",
    "contact.submit": "Recuperar el control",
    "contact.invalidEmail":
      "Use un correo corporativo. No se aceptan correos gratuitos (Gmail/Hotmail/etc.).",
    "contact.criticalRisk":
      "Riesgo critico detectado. Nuestro modulo Captain's Control esta disenado para su escala.",
    "contact.thankYou":
      "Con base en su riesgo de {risk}/hora, Control Agent puede ahorrarle aproximadamente {saving} por mes al reducir el tiempo de respuesta en 40%.",
    "alerts.captain": "ATENCION CAPITAN: Accion inmediata requerida para el Paso D4.",
    "alerts.auto8d": "El sistema creo un reporte 8D por brecha de rendimiento",
  },
  de: {
    "brand.masterConsole": "Master Konsole",
    "brand.tagline": "MES & Supply-Chain-Intelligence · Automotive Tier 1/2",
    "nav.overview": "Dashboard Übersicht",
    "nav.reports": "Aktive 8D-Reports",
    "nav.supply": "Supply Agent",
    "nav.flow": "Flow Agent",
    "nav.quality": "Quality Agent",
    "nav.investment": "Investment & ROI",
    "top.globalRisk": "Globales Risiko-Level",
    "top.auditMode": "Audit-Modus aktivieren",
    "top.language": "Sprache",
    "top.silenceAlerts": "Alarme stummschalten",
    "top.financialCounter": "Finanzzähler",
    "overview.controlBoard": "Das Control Board",
    "overview.controlBoardSub": "D1-D8-Aufgabenkarten mit Verantwortlichkeiten.",
    "overview.trafficLight": "Ampelstatus",
    "overview.trafficLightSub": "Sofortiges Risikosignal für den Betrieb.",
    "overview.timestampedHistory": "Zeitgestempelte Historie",
    "overview.timestampedHistorySub": "Zeigt, wer welchen Schritt wann freigegeben hat.",
    "landing.kicker": "Automotive Tier 1/2 · USA & Mexiko",
    "landing.timestampBadge": "2:47 AM",
    "landing.heroHeadline": "Es ist 2:47 Uhr. Ihre Linie steht. Ihr Telefon hört nicht auf zu klingeln.",
    "landing.heroHeadlineAccent": "Und SAP zeigt nichts.",
    "landing.heroSubLead": "Die meisten Werksleiter sehen die Krise erst, wenn sie",
    "landing.heroSubTail":
      "Control Agent zeigt Ihnen das Risiko, bevor der Anruf kommt - in Echtzeit und in einem Cockpit.",
    "landing.heroSub":
      "Die meisten Werksleiter sehen die Krise erst, wenn sie 80.000 $ kostet. Control Agent zeigt Ihnen das Risiko, bevor der Anruf kommt - in Echtzeit und in einem Cockpit.",
    "landing.ctaDemo": "Mission Control starten",
    "landing.trustBox":
      "15+ Jahre in Automotive Tier-1. Ich habe das gebaut, weil ich um 2 Uhr nachts selbst in Ihrer Lage war.",
    "landing.enter": "Dashboard öffnen",
    "nav.mobile.hero": "Start",
    "nav.mobile.story": "Story",
    "nav.mobile.triad": "Produkt",
    "nav.mobile.roi": "ROI",
    "nav.mobile.pricing": "Preise",
    "nav.mobile.contact": "Kontakt",
    "mobile.riskScoreTitle": "Finanzrisiko-Score",
    "mobile.riskLevel.low": "Niedrig",
    "mobile.riskLevel.watch": "Beobachten",
    "mobile.riskLevel.elevated": "Erhöht",
    "mobile.riskLevel.critical": "Kritisch",
    "mobile.riskHint.low": "Betrieb im normalen Toleranzband. Supply und Flow weiter beobachten.",
    "mobile.riskHint.watch": "Frühsignale. Bestand, Scheduling-Locks und Linienoutput prüfen.",
    "mobile.riskHint.elevated": "Materielle finanzielle Exposition. Containment und Captain-Review priorisieren.",
    "mobile.riskHint.critical": "Sofortige Eskalation — Finanzzähler und Supply-Locks treiben die Exposition.",
    "mobile.supplyCardTitle": "Supply / Charge",
    "mobile.flowCardTitle": "Flow / Linie",
    "mobile.stock": "Bestand",
    "mobile.transit": "Transit",
    "mobile.lock": "Lock",
    "mobile.batch": "Charge",
    "mobile.emergencyBlock": "Notfall-Block",
    "mobile.targetOut": "Soll-Output",
    "mobile.realtimeOut": "Echtzeit-Output",
    "mobile.oee": "OEE",
    "mobile.scrap": "Scrap",
    "landing.heroFootnote":
      "Ausrollung auf US-Region-Infrastruktur für geringere Latenz für Teams in Mexiko und den USA.",
    "landing.riskBadge": "Risikosignal",
    "landing.riskTitle": "Eine Stunde Stillstand kann eine Quartalsmarge ausradieren.",
    "landing.bullet1":
      "SAP-nahe Traceability (MARD / Charge / Containment) mit Captain-Schwellwerten.",
    "landing.bullet2": "Flow-Telemetrie, OEE, Scrap — gekoppelt an Financial Counter in USD.",
    "landing.bullet3":
      "Auto-8D-Entwurfslogik im IATF-10.2-Kontext (Audit-Mode).",
    "founder.scarsTitle": "In der Praxis gebaut",
    "founder.scarsKicker": "Aus einem Anruf um 3:00 Uhr in der Produktion — nicht aus einer Folie.",
    "founder.keyline": "Ich verkaufe keine Software. Ich verkaufe den Schlaf, den Sie verloren haben.",
    "founder.trustQuote":
      "Ich habe 20 Jahre auf dem Shopfloor in der Tier-1-Automobilindustrie verbracht. Ich habe das nicht gebaut, um Software zu verkaufen, sondern um 2-Uhr-Anrufe und 50k$/h-Strafen zu stoppen.",
    "founder.trustName": "Rainer Hampicke, Gründer & Industrieexperte.",
    "founder.story":
      "Um 3:00 Uhr klingelte das Telefon. Wieder eine Linie unten — und SAP voller „undefinierter“ Felder, während die Produktion auf eine Entscheidung wartete. In dieser Nacht hörte Control Agent auf, nur eine Idee zu sein. Es wurde die Captain’s View, die ich mir gewünscht hätte: Supply-Wahrheit, Flow-Wahrheit und Qualitätsdisziplin an einem Ort — bevor die Linie die Rechnung zahlt.",
    "triad.title": "Die Tool-Triade",
    "triad.subtitle": "Drei Agents. Ein Kommando. Für Automotive-Operations.",
    "triad.supplyTitle": "Supply Agent",
    "triad.supplyBody":
      "SAP-MARD-Live-Sync plus AI-Gateway für alternatives Sourcing (US/MEX).",
    "triad.flowTitle": "Flow Agent",
    "triad.flowBody":
      "Performance-Telemetrie, OEE, Scrap-Analyse und Operator-Traceability — mit Eskalationslogik.",
    "triad.qualityTitle": "Quality Agent",
    "triad.qualityBody":
      "Auto-8D-Pfad (IATF 10.2) plus globaler Financial Counter in USD für das Leadership-Team.",
    "roi.title": "Interaktiver ROI-Rechner",
    "roi.subtitle":
      "Wenn Control Agent die jährliche Downtime-Kostenexposition nur um 5% senkt — was ist dann der Return?",
    "roi.hint": "Illustratives Modell für Führungsgespräche — keine Garantie.",
    "roi.sliderLabel": "Ihre Stundenkosten bei Bandstillstand ($ USD)",
    "roi.hourlyPrefix": "Stunden-Exposure",
    "roi.annualLabel": "Schätzwert jährlich bei 5% weniger Downtime-Kostenexposure",
    "roi.vsPro":
      "Dieses jährliche Upside entspricht ca. {ratio}× dem Professional-Plan ({pro}/Monat) — noch ohne schnellere Reaktion, Audit-Readiness und Supplier-Containment.",
    "compliance.iatf": "IATF-16949-konforme Architektur",
    "compliance.usHost": "Daten-Hosting in den USA",
    "compliance.iatfFooter": "IATF-16949-konforme Architektur (Disziplin-first Design).",
    "compliance.renderUs": "Gehostet auf US-Region-Infrastruktur (z. B. Render.com).",
    "pricing.pageTitle": "Preise",
    "pricing.pageSubtitle": "USD-SaaS für Tier-1/2-Automotive-Operations.",
    "pricing.title": "Investition & ROI (Value-Based Pricing)",
    "pricing.subtitle": "Sauberes 3-Spalten-Preismodell in USD.",
    "pricing.popular": "Am beliebtesten",
    "pricing.tier1.name": "PILOT",
    "pricing.tier1.price": "$990 / Monat",
    "pricing.tier1.billing": "jährliche Abrechnung",
    "pricing.tier1.f1": "Supply Agent Basis",
    "pricing.tier1.f2": "AI-Sourcing-Gateway",
    "pricing.tier1.f3": "SAP-Mock Connector",
    "pricing.tier1.target": "Ziel: Kleinere Produktionsstandorte.",
    "pricing.tier2.name": "PROFESSIONAL",
    "pricing.tier2.price": "$1,850 / Monat",
    "pricing.tier2.f1": "Voller Supply & Flow",
    "pricing.tier2.f2": "Financial Counter (USD)",
    "pricing.tier2.f3": "Captain-Schwellwerte & Alerts",
    "pricing.tier2.f4": "Individuelle Alert-Schwellenwerte",
    "pricing.tier2.target": "Ziel: Kern-Zulieferer Automotive in MEX/USA.",
    "pricing.tier3.name": "ENTERPRISE",
    "pricing.tier3.price": "Sales kontaktieren",
    "pricing.tier3.billing": "Multi-Werk · volle Automatisierung",
    "pricing.tier3.f1": "Multi-Werk-Support",
    "pricing.tier3.f2": "Volle IATF-10.2-Automatisierungs-Suite",
    "pricing.tier3.f3": "Multi-Line Support",
    "pricing.tier3.f4": "IATF 10.2 Compliance Suite",
    "pricing.tier3.target": "Ziel: Tier-1 Mega Plants.",
    "pricing.roiTitle": "ROI-Box",
    "pricing.roiText":
      "Wenn Control Agent nur EINE Stunde Downtime verhindert (im Schnitt $50,000), bezahlt sich das gesamte Jahresabo in den ersten 15 Minuten einer Krise.",
    "contact.title": "Sichern Sie Ihre Wertschöpfung ab.",
    "contact.subtitle": "Teilen Sie Ihr aktuelles Risikoprofil und erhalten Sie eine wertbasierte Einschätzung.",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Firmen-E-Mail",
    "contact.locationLabel": "Standort Werk",
    "contact.locMexico": "Mexiko",
    "contact.locUsa": "USA",
    "contact.locGermany": "Deutschland",
    "contact.locOther": "Sonstiges",
    "contact.riskLabel": "Schätzwert Stundenkosten bei Linienstopp ($ USD)",
    "contact.submit": "Kontrolle zurückholen",
    "contact.invalidEmail":
      "Bitte verwenden Sie eine Firmen-E-Mail. Freemailer (Gmail/Hotmail/etc.) sind nicht erlaubt.",
    "contact.criticalRisk":
      "Kritisches Risiko erkannt. Unser Captain's-Control-Modul ist für Ihre Größenordnung ausgelegt.",
    "contact.thankYou":
      "Basierend auf Ihrem Risiko von {risk}/Stunde kann Control Agent durch 40% schnellere Reaktionszeit ungefähr {saving} pro Monat einsparen.",
    "alerts.captain": "ACHTUNG CAPTAIN: Sofortiges Handeln für Schritt D4 erforderlich!",
    "alerts.auto8d": "System hat 8D-Report für Performance-Lücke erstellt",
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

function refreshLucideIcons() {
  try {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  } catch (_error) {
    // Non-blocking if CDN blocked.
  }
}

function clampHourlyCost(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 50000;
  return Math.max(10000, Math.min(250000, n));
}

function getRoiHourlyFromInputs() {
  const mobile = document.getElementById("roi-mobile-input");
  const slider = document.getElementById("roi-slider");
  const raw = mobile?.value ?? slider?.value ?? 50000;
  return clampHourlyCost(Number(raw));
}

function syncHourlyCostAcrossUi(value) {
  const bounded = clampHourlyCost(value);
  const slider = document.getElementById("roi-slider");
  const mobileRoi = document.getElementById("roi-mobile-input");
  const contactRisk = document.getElementById("contact-risk");
  if (slider) slider.value = String(bounded);
  if (mobileRoi) mobileRoi.value = String(bounded);
  if (contactRisk) contactRisk.value = String(bounded);
  updateRiskUi(bounded);
  updateRoiDisplay(bounded);
}

function updateRoiDisplay(hourlyCost) {
  const hourlyEl = document.getElementById("roi-hourly-display");
  const annualEl = document.getElementById("roi-annual-savings");
  const vsProEl = document.getElementById("roi-vs-pro");
  if (!hourlyEl || !annualEl || !vsProEl) return;

  const hoursPerYear = 365 * 24;
  const annualExposure = hourlyCost * hoursPerYear;
  const annualSavings = annualExposure * 0.05;
  hourlyEl.textContent = usd(hourlyCost);
  annualEl.textContent = usd(annualSavings);

  const proMonthly = 1850;
  const ratio =
    proMonthly > 0 ? Math.max(0, annualSavings / (proMonthly * 12)) : 0;
  vsProEl.textContent = tf("roi.vsPro", {
    ratio: ratio.toFixed(1),
    pro: usd(proMonthly),
  });
}

function applyI18nStatic() {
  document.documentElement.setAttribute("lang", state.language);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });
  document.querySelectorAll(".js-lang-select").forEach((sel) => {
    sel.value = state.language;
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
  updateRoiDisplay(getRoiHourlyFromInputs());
  refreshLucideIcons();
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

function bindLandingMobileNav() {
  const toggle = document.getElementById("landing-menu-toggle");
  const panel = document.getElementById("landing-mobile-nav");
  const dashboardBtn = document.getElementById("landing-menu-dashboard");
  const header = document.getElementById("landing-sticky-header");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    const icon = toggle.querySelector("[data-lucide]");
    if (icon) icon.setAttribute("data-lucide", open ? "x" : "menu");
    refreshLucideIcons();
  };

  toggle.addEventListener("click", () => {
    const next = panel.classList.contains("hidden");
    setOpen(next);
  });

  panel.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      setOpen(false);
      document.querySelector(".app-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!header?.contains(target)) setOpen(false);
  });
}

function bindScheduleDemoVisibility() {
  const appShell = document.querySelector(".app-shell");
  const fixedCta = document.getElementById("schedule-demo-fixed");
  if (!appShell || !fixedCta || typeof IntersectionObserver === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      const hit = entries.some((e) => e.isIntersecting);
      document.body.classList.toggle("dashboard-in-view", hit);
    },
    { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(appShell);
}

function bindScrollReveal() {
  const items = Array.from(document.querySelectorAll(".reveal-on-scroll"));
  if (!items.length) return;
  if (typeof IntersectionObserver === "undefined") {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
  );
  items.forEach((el) => observer.observe(el));
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
    const bounded = clampHourlyCost(parsed);
    syncHourlyCostAcrossUi(bounded);
  });
  syncHourlyCostAcrossUi(Number(riskInput.value || 50000));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEl.classList.add("hidden");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const location = locationInput.value;
    const parsed = Number(riskInput.value || 0);
    const risk = clampHourlyCost(parsed);
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

function bindRoiCalculator() {
  const slider = document.getElementById("roi-slider");
  const mobileRoi = document.getElementById("roi-mobile-input");
  if (slider) {
    slider.addEventListener("input", () => {
      syncHourlyCostAcrossUi(Number(slider.value || 50000));
    });
  }
  if (mobileRoi) {
    mobileRoi.addEventListener("input", () => {
      syncHourlyCostAcrossUi(Number(mobileRoi.value || 50000));
    });
  }
  if (!slider && !mobileRoi) return;
  syncHourlyCostAcrossUi(getRoiHourlyFromInputs());
}

function bindLanguageSelector() {
  const selects = document.querySelectorAll(".js-lang-select");
  if (!selects.length) return;
  selects.forEach((select) => {
    select.value = state.language;
    select.addEventListener("change", async () => {
      const next = select.value || "en";
      state.language = I18N[next] ? next : "en";
      localStorage.setItem("control-agent-language", state.language);
      selects.forEach((s) => {
        if (s !== select) s.value = state.language;
      });
      applyI18nStatic();
      await Promise.all([loadReports(), loadSupply(), loadFlow(), loadQuality(), loadTopBar()]);
    });
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

function gaugeBaseScore(level) {
  const lv = String(level || "").toUpperCase();
  if (lv === "DARK_RED" || lv === "RED") return 82;
  if (lv === "ORANGE") return 64;
  if (lv === "YELLOW") return 48;
  if (lv === "GREEN") return 18;
  return 32;
}

function qualitySeverityScore(sev) {
  const s = String(sev || "").toUpperCase();
  if (s === "CRITICAL" || s === "HIGH") return 22;
  if (s === "MEDIUM") return 12;
  if (s === "LOW") return 0;
  return 8;
}

function renderMobileFinancialRiskScore({ risk, gauge, supply }) {
  const valueEl = document.getElementById("mobile-risk-score-value");
  const levelEl = document.getElementById("mobile-risk-score-level");
  const hintEl = document.getElementById("mobile-risk-score-hint");
  if (!valueEl || !levelEl || !hintEl) return;

  if (state.maintenanceMode) {
    valueEl.textContent = "0";
    levelEl.textContent = t("mobile.riskLevel.low");
    levelEl.className = "mobile-risk-score-level level-low";
    hintEl.textContent = t("mobile.riskHint.low");
    return;
  }

  const gaugeLevel = gauge?.gauge?.level;
  let score = gaugeBaseScore(gaugeLevel);
  score = Math.max(score, qualitySeverityScore(risk?.qualityDeviation?.severity));

  const riskLabel = String(supply?.riskLevel || "").toUpperCase();
  if (riskLabel && riskLabel !== "LOW") score += 14;
  if (state.scenarioAExists) score += 22;
  const stockBelow = Number(supply?.stock || 0) < Number(state.stockThreshold);
  if (stockBelow) score += 12;
  if (state.emergencyBlockActive) score += 18;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let band = "low";
  if (score >= 75) band = "critical";
  else if (score >= 50) band = "elevated";
  else if (score >= 25) band = "watch";

  const levelText = t(`mobile.riskLevel.${band}`);
  const hintText = t(`mobile.riskHint.${band}`);

  valueEl.textContent = String(score);
  levelEl.textContent = levelText;
  levelEl.className = `mobile-risk-score-level level-${band}`;
  hintEl.textContent = hintText;
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
  renderMobileFinancialRiskScore({ risk, gauge, supply });
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
  const stockLockMobile = document.getElementById("d3-stock-lock-mobile");
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
    const summary = supply.complianceSummary;
    const restricted = Number(summary.restrictedBatches || 0);
    const total = Math.max(1, Number(summary.totalBatches || 0));
    const auditCardClass =
      restricted / total > 0.2 ? "status-red" : restricted > 0 ? "status-yellow" : "status-green";
    if (stockLockMobile) {
      stockLockMobile.innerHTML = `
        <article class="mobile-status-card ${auditCardClass}">
          <h4>${t("mobile.supplyCardTitle")} · Audit</h4>
          <p class="muted" style="margin:0 0 8px;font-size:13px;line-height:1.45">${summary.statement}</p>
          <div class="row"><span>Total batches</span><strong>${summary.totalBatches}</strong></div>
          <div class="row"><span>Restricted</span><strong>${summary.restrictedBatches}</strong></div>
          <div class="row"><span>Transit qty</span><strong>${summary.totalTransitQty}</strong></div>
        </article>`;
    }
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

  const eket = supply.eketScheduling || [];
  const rows = eket
    .map(
      (r) =>
        `<tr><td>${r.batch_number || "-"}</td><td>${r.material_id || "-"}</td><td>${Number(r.stock_level ?? 0)}</td><td>${Number(r.transit_qty ?? 0)}</td><td>${lockStatusChip(r.lock_status || "Available")}</td><td><button class="danger-btn" data-batch="${r.batch_number || ""}">Emergency Block</button></td></tr>`,
    )
    .join("");
  if (stockLockMobile) {
    if (!eket.length) {
      stockLockMobile.innerHTML = `<p class="muted">No SAP supply rows.</p>`;
    } else {
      stockLockMobile.innerHTML = eket
        .map((r) => {
          const lock = r.lock_status || "Available";
          const cardClass = supplyRowStatusCardClass(lock);
          const batch = r.batch_number || "-";
          return `
            <article class="mobile-status-card ${cardClass}">
              <h4>${t("mobile.supplyCardTitle")}</h4>
              <div class="row"><span>${t("mobile.batch")}</span><strong>${batch}</strong></div>
              <div class="row"><span>Material</span><strong>${r.material_id || "-"}</strong></div>
              <div class="row"><span>${t("mobile.stock")}</span><strong>${Number(r.stock_level ?? 0)}</strong></div>
              <div class="row"><span>${t("mobile.transit")}</span><strong>${Number(r.transit_qty ?? 0)}</strong></div>
              <div class="row" style="margin-top:8px;align-items:center">
                <span>${t("mobile.lock")}</span>
                <span class="pill" style="background:${cardClass === "status-red" ? "rgba(239,68,68,0.15)" : cardClass === "status-yellow" ? "rgba(234,179,8,0.15)" : "rgba(34,197,94,0.15)"};color:var(--text)">${String(lock)}</span>
              </div>
              <button type="button" class="danger-btn" style="margin-top:12px;width:100%" data-batch="${r.batch_number || ""}">${t("mobile.emergencyBlock")}</button>
            </article>`;
        })
        .join("");
    }
  }
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

function supplyRowStatusCardClass(lockStatus) {
  const s = String(lockStatus || "").toUpperCase();
  if (s === "BLOCKED" || s === "CRITICAL") return "status-red";
  if (s === "AVAILABLE" || s === "OPEN" || s === "RELEASED" || s === "OK") return "status-green";
  return "status-yellow";
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
  const flowMobile = document.getElementById("flow-table-mobile");
  const oee = Number(flow.telemetry?.oeePct ?? 0);
  const scrap = Number(flow.telemetry?.scrapRatePct ?? 0);
  let flowCardClass = "status-green";
  if (scrap >= 5 || oee < 70) flowCardClass = "status-red";
  else if (scrap >= 2 || oee < 80) flowCardClass = "status-yellow";

  if (flowMobile) {
    const line = flow.telemetry?.lineId ?? "LINE-MEX-04";
    flowMobile.innerHTML = `
      <article class="mobile-status-card ${flowCardClass}">
        <h4>${t("mobile.flowCardTitle")}</h4>
        <div class="row"><span>Line</span><strong>${line}</strong></div>
        <div class="row"><span>${t("mobile.targetOut")}</span><strong>${flow.outputPerHour ?? 0} / h</strong></div>
        <div class="row"><span>${t("mobile.realtimeOut")}</span><strong>${flow.telemetry?.outputPerHourRealtime ?? 0} / h</strong></div>
        <div class="row"><span>${t("mobile.oee")}</span><strong>${oee}%</strong></div>
        <div class="row"><span>${t("mobile.scrap")}</span><strong>${scrap}%</strong></div>
        <div class="row"><span>Machine</span><strong>${flow.telemetry?.machineState ?? "UNKNOWN"}</strong></div>
      </article>`;
  }

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
  bindLandingMobileNav();
  bindScheduleDemoVisibility();
  bindScrollReveal();
  bindContactForm();
  bindRoiCalculator();
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
