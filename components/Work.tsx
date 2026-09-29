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

type Project = {
  art: () => React.JSX.Element;
  title: string;
  line: string;
  tags: string[];
  span?: string;
};

const stages: Project[] = [
  {
    art: ChatArt,
    title: "Chat support agent",
    line: "Instant answers in any language.",
    tags: ["AI agent", "Chat API", "Multilingual"],
  },
  {
    art: BarsArt,
    title: "Daily business intelligence",
    line: "One morning check. Zero digging.",
    tags: ["n8n", "Reports", "Sheets + APIs"],
  },
];

const grid: Project[] = [
  {
    art: TrendArt,
    title: "SEO reporting system",
    line: "Client-ready reports, on schedule.",
    tags: ["GSC", "GA4", "Automation"],
    span: "lg:col-span-4",
  },
  {
    art: RingArt,
    title: "Scope-creep tracker",
    line: "Overruns flagged before margin slips.",
    tags: ["Scope control", "Fixed scope"],
    span: "lg:col-span-2",
  },
  {
    art: BrowserArt,
    title: "Travel site + operations",
    line: "Site plus daily ops visibility.",
    tags: ["Website", "Ops design"],
    span: "lg:col-span-2",
  },
  {
    art: PipeArt,
    title: "Research pipelines",
    line: "Drafts without the slop.",
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
  "WhatsApp bots",
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

function Stage({ p, flip }: { p: Project; flip?: boolean }) {
  const Art = p.art;
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] lg:grid-cols-2">
        <div
          aria-hidden="true"
          className={`relative h-64 overflow-hidden bg-white/[0.02] sm:h-80 ${flip ? "lg:order-2" : ""}`}
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
          <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{p.line}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
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
                      className="h-40 border-b border-black/10 bg-white/[0.02]"
                      style={dotted}
                    >
                      <p.art />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[17px] font-semibold tracking-tight text-stone-950">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-stone-600">
                        {p.line}
                      </p>
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
            See a bottleneck you recognize? Email me —{" "}
            <a
              href="mailto:abdulahfaysal04@gmail.com"
              className="font-medium text-stone-900 underline underline-offset-4 hover:text-accent-ink"
            >
              abdulahfaysal04@gmail.com
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
