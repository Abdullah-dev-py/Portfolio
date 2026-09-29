import { Reveal } from "./Reveal";
import { Tilt } from "./work-visuals";

const groups = [
  {
    t: "Automation and systems",
    d: "n8n · APIs · webhooks · Google Sheets · scheduled workflows · reporting pipelines",
    tint: "bg-accent/[0.06]",
  },
  {
    t: "AI, used sparingly",
    d: "OpenRouter · Gemini · Groq · Ollama local · agentic checks · structured outputs · language-aware replies",
    tint: "bg-[#284B63]/[0.05]",
  },
  {
    t: "Web",
    d: "HTML · CSS · JavaScript · WordPress · Elementor · Cloudflare Pages · responsive builds",
    tint: "bg-black/[0.03]",
  },
  {
    t: "Data and platforms",
    d: "GA4 · Search Console · Meta and Google Ads · Shopify · Messaging APIs",
    tint: "bg-accent/[0.06]",
  },
  {
    t: "Programming",
    d: "Python · JavaScript · TypeScript · Git · Docker",
    tint: "bg-[#284B63]/[0.05]",
  },
];

/* Mini workflow strip: three nodes, live dash flow between them */
function FlowStrip() {
  return (
    <svg viewBox="0 0 220 64" className="h-full w-full" aria-hidden="true">
      <line x1="46" y1="32" x2="96" y2="32" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
      <line x1="124" y1="32" x2="174" y2="32" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
      <line x1="46" y1="32" x2="96" y2="32" stroke="#3C6E71" strokeWidth="2" strokeLinecap="round" opacity="0.6" className="wv-dash-flow" />
      <line x1="124" y1="32" x2="174" y2="32" stroke="#3C6E71" strokeWidth="2" strokeLinecap="round" opacity="0.6" className="wv-dash-flow" />
      {[34, 110, 186].map((x, i) => (
        <g key={x}>
          <rect x={x - 12} y={20} width="24" height="24" rx="7" fill="#fff" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
          <circle cx={x} cy={32} r="3.5" fill={i === 2 ? "#3C6E71" : "#284B63"} />
        </g>
      ))}
    </svg>
  );
}

/* AI orbit: pulsing core inside signal rings */
function AiOrbit() {
  return (
    <div aria-hidden="true" className="relative flex h-full items-center justify-center">
      <span className="absolute size-16 rounded-full border border-accent/25" />
      <span className="absolute size-10 rounded-full border border-dashed border-accent/40" />
      <span className="relative flex size-4 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30" />
        <span className="relative size-2.5 rounded-full bg-accent" />
      </span>
    </div>
  );
}

/* Web mock: tiny browser with layout blocks */
function WebMock() {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-[170px] rounded-lg border border-black/10 bg-white/90 p-2 shadow-sm">
        <div className="mb-1.5 flex gap-1">
          <span className="size-1.5 rounded-full bg-black/15" />
          <span className="size-1.5 rounded-full bg-black/15" />
          <span className="size-1.5 rounded-full bg-black/15" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="wv-arrange col-span-1 h-8 rounded bg-[#284B63]" />
          <div className="col-span-2 flex flex-col gap-1">
            <div className="wv-arrange h-2 rounded bg-black/15" style={{ animationDelay: "0.25s" }} />
            <div className="wv-arrange h-2 w-4/5 rounded bg-black/10" style={{ animationDelay: "0.4s" }} />
            <div className="wv-arrange h-3.5 w-10 rounded bg-accent" style={{ animationDelay: "0.55s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Data spark: single trend line with live end dot */
function DataSpark() {
  return (
    <svg viewBox="0 0 200 64" className="h-full w-full p-3" aria-hidden="true">
      <polyline
        points="6,50 34,42 62,45 90,30 118,34 146,20 178,24"
        fill="none"
        stroke="#284B63"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="wv-spark-draw"
      />
      <circle cx="178" cy="24" r="4.5" fill="#3C6E71" stroke="#fff" strokeWidth="2" className="wv-spark-dot" />
      {[34, 90, 146].map((x) => (
        <circle key={x} cx={x} cy={x === 34 ? 42 : x === 90 ? 30 : 20} r="2" fill="rgba(0,0,0,0.15)" />
      ))}
    </svg>
  );
}

/* Code terminal: dark window, code lines, blinking cursor */
function CodeTerm() {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-[170px] rounded-lg bg-[#284B63] p-2.5 shadow-sm">
        <div className="mb-1.5 flex gap-1">
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </div>
        <div className="h-1.5 w-11/12 rounded bg-white/70" />
        <div className="mt-1 h-1.5 w-2/3 rounded bg-[#7FB3B5]" />
        <div className="mt-1.5 flex items-center gap-1">
          <span className="font-mono text-[10px] leading-none text-white/70">$</span>
          <span className="wv-blink h-2.5 w-1.5 rounded-[1px] bg-white" />
        </div>
      </div>
    </div>
  );
}

const visualFor = [FlowStrip, AiOrbit, WebMock, DataSpark, CodeTerm];
// pipeline sequence: code → systems → intelligence → insight → interface
const order = [4, 0, 1, 3, 2];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <h2 id="skills-h" className="text-3xl font-semibold tracking-tighter">
            Tools I reach for
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {order.map((gi, i) => {
            const g = groups[gi];
            const Visual = visualFor[gi];
            return (
              <li key={g.t} className="h-full">
                <Reveal delay={i * 0.05} className="h-full">
                  <Tilt className="h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_20px_45px_-24px_rgba(0,0,0,0.10)]">
                      <div className={`h-28 border-b border-black/10 ${g.tint}`} aria-hidden="true">
                        <Visual />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-[15px] font-semibold tracking-tight text-stone-950">
                          {g.t}
                        </h3>
                        <ul aria-label={`${g.t} tools`} className="mt-3 flex flex-wrap gap-1.5">
                          {g.d.split("·").map((tool) => (
                            <li
                              key={tool.trim()}
                              className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 font-mono text-[11px] text-stone-600"
                            >
                              {tool.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
