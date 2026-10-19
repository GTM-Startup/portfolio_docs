/**
 * Coherent sample data shared by every product mockup so the interfaces
 * feel like one product family. Purely illustrative — none of these
 * numbers describe real clients or real performance.
 */

export const workspaceMetrics = [
  { label: "Active projects", value: "12", delta: "+2" },
  { label: "Open tasks", value: "48", delta: "-6" },
  { label: "On track", value: "92%", delta: "+4%" },
  { label: "Team load", value: "76%", delta: "steady" },
];

export const workspaceTasks = [
  { title: "Finalise onboarding flow", status: "In review", owner: "AM", priority: "High" },
  { title: "Import client records", status: "In progress", owner: "JR", priority: "Medium" },
  { title: "Billing portal — edge cases", status: "In progress", owner: "SL", priority: "High" },
  { title: "Q3 reporting templates", status: "Backlog", owner: "KT", priority: "Low" },
  { title: "Warehouse sync — v2", status: "Done", owner: "AM", priority: "Medium" },
];

export const workspaceActivity = [
  { who: "JR", what: "moved “Import client records” to In progress", when: "12m ago" },
  { who: "SL", what: "commented on Billing portal — edge cases", when: "48m ago" },
  { who: "KT", what: "created Q3 reporting templates", when: "2h ago" },
  { who: "AM", what: "shipped Warehouse sync — v2", when: "Yesterday" },
];

export const crmClients = [
  { name: "Harlow & Co.", contact: "Dana Harlow", stage: "Proposal", value: "$24,000", owner: "AM" },
  { name: "Beacon Studios", contact: "Iris Nadel", stage: "Qualified", value: "$12,500", owner: "JR" },
  { name: "Ridgeway Logistics", contact: "Omar Ridgeway", stage: "Negotiation", value: "$46,200", owner: "SL" },
  { name: "Fieldnote Media", contact: "June Park", stage: "Discovery", value: "$8,400", owner: "KT" },
  { name: "Alder Dental", contact: "Sam Ortega", stage: "Won", value: "$19,750", owner: "AM" },
  { name: "Kestrel Fitness", contact: "Tomas Kestrel", stage: "Qualified", value: "$6,900", owner: "JR" },
];

export const crmPipeline = [
  { stage: "Discovery", count: 8, total: "$31k", cards: ["Fieldnote Media", "Juniper Bakes", "Loop Rentals"] },
  { stage: "Qualified", count: 6, total: "$42k", cards: ["Beacon Studios", "Kestrel Fitness", "Tide & Timber"] },
  { stage: "Proposal", count: 4, total: "$58k", cards: ["Harlow & Co.", "Palmer Print"] },
  { stage: "Negotiation", count: 3, total: "$71k", cards: ["Ridgeway Logistics"] },
];

export const crmActivity = [
  { when: "Today, 09:24", what: "Follow-up call scheduled with Dana Harlow" },
  { when: "Yesterday", what: "Proposal v2 sent to Ridgeway Logistics" },
  { when: "Mon", what: "Discovery notes added — Fieldnote Media" },
];

export const adminRows = [
  { id: "REC-2418", name: "Spring intake — Cohort B", status: "Approved", owner: "Registrar", updated: "2h ago" },
  { id: "REC-2417", name: "Faculty timesheet batch", status: "Pending", owner: "Finance", updated: "4h ago" },
  { id: "REC-2412", name: "Scholarship review — round 2", status: "In review", owner: "Admissions", updated: "Yesterday" },
  { id: "REC-2409", name: "Facility request — Lab 4", status: "Escalated", owner: "Operations", updated: "Yesterday" },
  { id: "REC-2405", name: "Vendor renewal — catering", status: "Approved", owner: "Procurement", updated: "Mon" },
  { id: "REC-2398", name: "Attendance audit — May", status: "Pending", owner: "Registrar", updated: "Mon" },
];

export const adminMetrics = [
  { label: "Records processed", value: "1,284", trend: "+12% vs. last week" },
  { label: "Awaiting approval", value: "37", trend: "9 due today" },
  { label: "Avg. cycle time", value: "1.8d", trend: "-0.4d vs. last week" },
];

/** Monthly revenue series used by the analytics / dashboard mockups. */
export const revenueSeries = [42, 48, 45, 58, 63, 61, 72, 78, 74, 86, 92, 98];

/** Weekly active users used by bar charts. */
export const activityBars = [38, 55, 47, 68, 61, 79, 72, 88, 74, 92, 84, 96];

export const analyticsKpis = [
  { label: "Revenue MTD", value: "$98.2k", change: "+14%" },
  { label: "Active accounts", value: "1,904", change: "+6%" },
  { label: "Conversion", value: "3.8%", change: "+0.4pt" },
  { label: "Churn", value: "1.2%", change: "-0.2pt" },
];

export const funnelSteps = [
  { label: "Visited", value: 100 },
  { label: "Signed up", value: 42 },
  { label: "Activated", value: 27 },
  { label: "Paying", value: 11 },
];

export const portfolioProjects = [
  { title: "Field studies in public space", year: "2025", tag: "Research" },
  { title: "Identity for a print workshop", year: "2025", tag: "Brand" },
  { title: "A typeface for wayfinding", year: "2024", tag: "Type" },
];

export const appName = "Northwind Workspace";
export const crmName = "Meridian CRM";
export const analyticsName = "Pulse Analytics";
export const adminName = "Northwind Admin";
