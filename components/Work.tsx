import { links } from "@/lib/links";
import { Reveal } from "./Reveal";
import { WorkMixChart } from "./WorkChart";
import {
  BarsArt,
  BrowserArt,
  ChatArt,
  FlowDiagram,
  Marquee,
  Parallax,
  PipeArt,
  ProcessDeck,
  RingArt,
  ScrollProgress,
  Tilt,
  TrendArt,
} from "./work-visuals";

// Metrics with "~" or ranges are honest placeholders — swap in real numbers before shipping.
type Project = {
  art: () => React.JSX.Element;
  title: string;
  problem: string;
  built: string;
  result: string;
  tags: string[];
  span?: string;
};

const stages: Project[] = [
  {
    art: ChatArt,
    title: "Chat support agent",
    problem: "Same questions all day. Replies took hours; overnight ones waited until morning.",
    built: "An agent on the client's own docs and live order data. A human joins only when it's unsure.",
    result: "First reply in seconds, 24/7.",
    tags: ["AI agent", "Chat API", "Multilingual"],
  },
  {
    art: BarsArt,
    title: "Daily business intelligence",
    problem: "Sales, stock and claims lived in three tools. Problems surfaced days late.",
    built: "One sheet pulls every source on schedule. A morning summary: what changed, what needs a decision.",
    result: "Summary by 9:00 daily. Prep: 3 hours to 10 minutes a week.",
    tags: ["n8n", "Reports", "Sheets + APIs"],
  },
];

const grid: Project[] = [
  {
    art: TrendArt,
    title: "SEO reporting system",
    problem: "Reports assembled by hand monthly. Delivery dates slipped.",
    built: "GSC + GA4 pull automatically into one client-ready report.",
    result: "3 hours to 20 minutes per week.",
    tags: ["GSC", "GA4", "Automation"],
    span: "lg:col-span-4",
  },
  {
    art: RingArt,
    title: "Scope-creep tracker",
    problem: "Five-minute extras added up to unpaid days.",
    built: "Requests log against scope. Out-of-scope is flagged before it starts.",
    result: "~14 h of extras caught and billed, month one.",
    tags: ["Scope control", "Fixed scope"],
    span: "lg:col-span-2",
  },
  {
    art: BrowserArt,
    title: "Travel site + operations",
    problem: "Bookings and follow-ups ran through one inbox.",
    built: "Booking site plus an ops view: every booking's status, today's actions.",
    result: "Nothing missed. One place to look.",
    tags: ["Website", "Ops design", "Bookings"],
    span: "lg:col-span-2",
  },
  {
    art: PipeArt,
    title: "Research pipelines",
    problem: "Hours of manual digging. AI drafts needed full re-checks.",
    built: "Searches, extracts sourced facts, returns drafts ready to edit.",
    result: "~4 hours to 45 minutes per piece.",
    tags: ["Research", "Structured outputs"],
    span: "lg:col-span-4",
  },
];

const steps = [
  {
    n: "01",
    t: "Spot the leak",
    d: "Short call. We find where time or money actually drains.",
  },
  {
    n: "02",
    t: "Build the simple fix",
    d: "n8n, APIs, sheets, chat. Wired, scheduled, logged.",
  },
  {
    n: "03",
    t: "Hand over control",
    d: "Plain docs, walkthrough. Humans decide.",
  },
];

const capabilities = [
  "n8n automations",
  "AI agents",
  "Chat agents",
  "Sheets reporting",
  "SEO pipelines",
  "Scope tracking",
  "Chat support",
  "Ops dashboards",
];

const dotted = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

function CaseFact({
  label,
  body,
  strong,
  compact,
}: {
  label: string;
  body: string;
  strong?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-mono uppercase tracking-[0.16em] text-stone-500 ${
          compact ? "text-[10px]" : "text-[10.5px]"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-[3px] leading-relaxed ${
          compact ? "text-[13.5px]" : "text-[15px]"
        } ${strong ? "font-medium text-stone-950" : "text-stone-600"}`}
      >
        {body}
      </p>
    </div>
  );
}

function Stage({ p, flip }: { p: Project; flip?: boolean }) {
  const Art = p.art;
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] lg:grid-cols-2">
        <div
          aria-hidden="true"
          className={`relative h-72 overflow-hidden bg-white/[0.02] sm:h-[24rem] ${flip ? "lg:order-2" : ""}`}
          style={dotted}
        >
          <Parallax amount={26} className="h-full">
            <div className="-my-8 h-[calc(100%+4rem)]">
              <Art />
            </div>
          </Parallax>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
            {p.title}
          </h3>
          <div className="mt-5 grid gap-4">
            <CaseFact label="Problem" body={p.problem} />
            <CaseFact label="Built" body={p.built} />
            <CaseFact label="Result" body={p.result} strong />
          </div>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 font-mono text-[11px] text-stone-600"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="relative overflow-hidden border-t border-black/10">
      <ScrollProgress />
      {/* soft amber glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(60,110,113,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
        <div className="relative z-10 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.08)] sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                Selected work
              </p>
              <h1
                id="work-h"
                className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tighter text-stone-950 sm:text-6xl lg:text-7xl"
              >
                Built for Speed
                <br />
                Designed for Scale
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-stone-600">
                Deploy AI agents that plan, act through your tools, and report
                outcomes — without changing how your teams work.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mx-auto w-full max-w-md">
                <WorkMixChart />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 lg:mt-12">
        <Marquee items={capabilities} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* feature stages — large, scroll-driven */}
        <div className="relative z-10 flex flex-col gap-4 pt-10 lg:pt-14">
          <Stage p={stages[0]} />
          <Stage p={stages[1]} flip />
        </div>

        {/* bento grid — asymmetric rhythm */}
        <div className="relative z-10 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {grid.map((p, i) => (
              <Reveal
                key={p.title}
                delay={Math.min(i * 0.06, 0.24)}
                className={p.span}
              >
                <Tilt className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_24px_45px_-24px_rgba(0,0,0,0.35)]">
                    <div
                      aria-hidden="true"
                      className="h-52 border-b border-black/10 bg-white/[0.02]"
                      style={dotted}
                    >
                      <p.art />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[17px] font-semibold tracking-tight text-stone-950">
                        {p.title}
                      </h3>
                      <div className="mt-3 grid gap-2.5">
                        <CaseFact label="Problem" body={p.problem} compact />
                        <CaseFact label="Built" body={p.built} compact />
                        <CaseFact label="Result" body={p.result} strong compact />
                      </div>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Stack">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 font-mono text-[11px] text-stone-600"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        {/* pipeline — bottleneck to running system */}
        <div className="relative z-10 py-14 lg:py-20">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tighter text-stone-950 sm:text-4xl">
              Bottleneck in. System out.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8">
              <FlowDiagram />
            </div>
          </Reveal>
        </div>

        {/* engagement — 3D process deck */}
        <div id="process" className="relative z-10 scroll-mt-24 pb-14 lg:pb-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tighter text-stone-950 sm:text-3xl">
              How an engagement runs
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8">
              <ProcessDeck steps={steps} />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="relative z-10 pb-16 text-[15px] text-stone-600 lg:pb-24">
            Harder problems. Same process. Same bar. See a bottleneck you recognize? Email me —{" "}
            <a
              href={links.emailHref}
              className="font-medium text-stone-900 underline underline-offset-4 hover:text-accent-ink"
            >
              {links.email}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
