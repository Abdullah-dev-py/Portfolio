export type ServiceItem = {
  title: string;
  get: string;
  build: string;
  freq: string;
};

export type ServiceGroup = {
  id: string;
  index: string;
  title: string;
  short: string;
  line: string;
  services: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "agencies",
    index: "01",
    title: "Digital agencies",
    short: "Agencies",
    line: "Stop opening five tabs to answer “how’s client X?”",
    services: [
      { title: "Client status consolidator", get: "5-min owner briefing, not 30-min dig", build: "Weekly pull of SEO, ads, social + video into one health-sorted digest.", freq: "Weekly" },
      { title: "Approval loop with proof", get: "Every approval logged. No disputes", build: "Drafts sent with Approve / Request Changes. Version + timestamp logged.", freq: "Real-time" },
      { title: "Scope + overage tracker", get: "Margin protected with proof", build: "Per-client scope register. Requests classed in / out. Auto change-order draft.", freq: "Real-time" },
      { title: "Month-end invoice builder", get: "Invoices on time, follow-ups handled", build: "Delivered + approved extras compiled. Sent day 1, reminded day 7 / 14 / 21.", freq: "Monthly" },
      { title: "Client risk early warning", get: "Know who needs attention first", build: "Weekly score on overage + payment speed. Fine / check-in / escalate.", freq: "Weekly" },
      { title: "Onboarding pack", get: "Live in days, not weeks", build: "Folder + checklist auto-created on sign. Missing items chased every 2 days.", freq: "On sign" },
      { title: "Multi-service digest", get: "One 5-min read replaces 3 calls", build: "Week’s key metrics per service, assembled into one owner summary.", freq: "Weekly" },
    ],
  },
  {
    id: "freelancers",
    index: "02",
    title: "Freelancers",
    short: "Solo",
    line: "No more cold leads from forgotten follow-ups",
    services: [
      { title: "Proposal follow-up", get: "Every proposal gets 2 follow-ups", build: "Daily check. Auto nudge at day 3 + 7 in your tone. Cold after day 7.", freq: "Daily" },
      { title: "Invoice reminders", get: "Paid without the awkward follow-up", build: "Friendly before due, firm at 7 + 14 days late. Stops when paid.", freq: "Auto" },
      { title: "Project setup", get: "Ready to start in 10 minutes", build: "Form submit → folder + contract draft + tasks + kickoff message.", freq: "Real-time" },
      { title: "Client info organizer", get: "One place, not five tools", build: "Emails + messages + notes pulled into one space. Actions extracted.", freq: "Daily" },
    ],
  },
  {
    id: "ecommerce",
    index: "03",
    title: "E-commerce",
    short: "Shops",
    line: "Orders confirmed before dispatch — unconfirmed orders held",
    services: [
      { title: "Chat sales agent", get: "Orders 24/7, stock synced", build: "Instant replies, live price + stock from Sheets, inventory updated.", freq: "Real-time" },
      { title: "Daily sales + stock report", get: "8 AM brief with actions", build: "Orders + inventory + claims read daily. Plain-English next steps.", freq: "Daily 8 AM" },
      { title: "Pre-dispatch confirmation", get: "No wasted courier fees", build: "Pre-dispatch confirmation + address check. Unconfirmed orders held.", freq: "Real-time" },
      { title: "Courier + reconciliation", get: "Booking file + weekly match", build: "Daily courier-ready upload. Weekly settlement matched: paid / short / missing.", freq: "Daily" },
      { title: "Stock sync", get: "Same count everywhere", build: "One master sheet pushes quantity to every channel automatically.", freq: "15 min" },
      { title: "Restock drafter", get: "Purchase orders, pre-drafted", build: "Sales + stock + lead times → supplier orders ready to approve.", freq: "Weekly" },
      { title: "Listing writer", get: "Import-ready CSV, no typing", build: "Raw supplier sheet → clean titles, descriptions, SEO tags.", freq: "On demand" },
    ],
  },
  {
    id: "services",
    index: "04",
    title: "Clinics + services",
    short: "Clinics",
    line: "Full slots, fewer no-shows, one morning check",
    services: [
      { title: "Appointment + waitlist fill", get: "No empty slots from cancels", build: "Evening and morning confirmations. Cancels auto-filled from waitlist.", freq: "Real-time" },
      { title: "Document checklist chaser", get: "Complete files, no delays", build: "Per-case checklist. Client told exactly what’s missing, every 2 days.", freq: "2 days" },
      { title: "Owner’s morning brief", get: "2-min morning brief, day sorted", build: "Due today + pending payments + new inquiries + missing docs.", freq: "Daily" },
    ],
  },
  {
    id: "schools",
    index: "05",
    title: "Invoicing + cash flow",
    short: "Billing",
    line: "Invoices sent, proof matched, cash flow visible",
    services: [
      { title: "Invoice + payment proof matching", get: "Cash flow tracked daily", build: "Monthly invoices sent. Payment proof read + matched to open invoices.", freq: "Monthly" },
      { title: "Unpaid invoice tracker", get: "Escalating pressure, auto", build: "Per-account status. Reminders at 1 / 2 / 3 weeks + owner report.", freq: "Daily" },
    ],
  },
  {
    id: "marketing",
    index: "06",
    title: "Lead gen + ads",
    short: "Ads",
    line: "Hot leads in minutes — ads learn what closed",
    services: [
      { title: "Speed-to-lead responder", get: "Qualified in minutes, not days", build: "Instant reply with 2 qualifying questions. Scores + hands hot to sales.", freq: "Real-time" },
      { title: "Quality feedback loop", get: "Cheaper qualified leads", build: "Sales marks qualified / junk / closed → sent back to ad platform.", freq: "Hourly" },
      { title: "Spend pacing monitor", get: "Budgets fixed same-day", build: "Every 4h vs pro-rated budget. Flag fix via reply “1”.", freq: "4 hours" },
      { title: "Creative test library", get: "Stop retesting losers", build: "Weekly ad pull, ranked. Hook + angle + format logged + searchable.", freq: "Weekly" },
    ],
  },
  {
    id: "ops",
    index: "07",
    title: "Team ops",
    short: "Ops",
    line: "Updates without chasing. Crunch seen early",
    services: [
      { title: "Daily update collector", get: "Team summary, no pings", build: "Timed check-in prompt per person. One sheet + manager summary.", freq: "Daily" },
      { title: "Meeting recap + tasks", get: "Tasks + recap in minutes", build: "Transcript → decisions + owners + board tasks + recap email.", freq: "After call" },
      { title: "Profitability report", get: "Keep, reprice, or drop", build: "Fees vs hours + extras. Ranked by margin with next step.", freq: "Monthly" },
      { title: "Capacity planner", get: "Next week’s overload, early", build: "Task hours per person summed. Rebalancing plan drafted.", freq: "Weekly" },
    ],
  },
];

export const pricingTiers = [
  {
    name: "Small",
    desc: "1–2 sheets, single client, basic logic",
    build: "$100–200",
    run: "$10–30/mo",
    tags: ["Reminders", "Digests", "Setups"],
  },
  {
    name: "Medium",
    desc: "Multi-client, approvals, real-time",
    build: "$300–600",
    run: "$50–100/mo",
    tags: ["Agents", "Approvals", "Sync"],
    featured: true,
  },
  {
    name: "Large",
    desc: "Complex logic, multi-integration",
    build: "$800–1,500",
    run: "$150–300/mo",
    tags: ["Reconciliation", "Pipelines", "Ops"],
  },
];
