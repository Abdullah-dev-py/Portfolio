"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* Shared shell */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center p-5">
      {children}
    </div>
  );
}

/* 01 — Agencies: health-sorted digest (bars slide to random widths every 2s) */
export function AgencyArt() {
  const reduce = useReducedMotion();
  const [widths, setWidths] = useState([88, 64, 34]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setWidths([0, 1, 2].map(() => Math.round(15 + Math.random() * 80)));
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const rows = widths.map((w) => ({ w: `${w}%`, ok: w >= 50 }));

  return (
    <Shell>
      <div className="w-full max-w-[260px] rounded-xl border border-black/10 bg-white/85 p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent" />
          <div className="h-1.5 w-24 rounded bg-black/15" />
        </div>
        {rows.map((r, i) => (
          <div key={i} className="mb-1.5 flex items-center gap-2">
            <span className={`size-2 shrink-0 rounded-full transition-colors duration-1000 ${r.ok ? "bg-accent" : "bg-[#B3261E]"}`} />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
              <div
                className="h-full rounded-full bg-[#284B63] transition-[width] duration-1000 ease-in-out"
                style={{ width: r.w }}
              />
            </div>
          </div>
        ))}
        <div className="wv-flow-x mt-2 h-[3px] w-full" />
      </div>
    </Shell>
  );
}

/* 02 — Solo: proposal nudges (live type-and-send chat, endless feed) */
type ChatMsg = { text: string; check: string; teal: boolean };
const CHAT_SCRIPT: ChatMsg[] = [
  { text: "Proposal sent", check: "✓✓", teal: false },
  { text: "Day 3 → sent", check: "✓✓", teal: false },
  { text: "Day 7 → sent", check: "", teal: true },
];
type ChatItem = { id: number; kind: "msg" | "typing"; m: ChatMsg };
const CHAT_PITCH = 72; // h-16 bubble + 8px gap

function ChatBubbleBody({ m }: { m: ChatMsg }) {
  return (
    <>
      <div className={`h-1.5 rounded ${m.teal ? "w-2/3 bg-white/80" : "w-3/4 bg-white/70"}`} />
      <div className={`mt-1 flex items-center gap-1 font-mono text-[9px] ${m.teal ? "text-white/80" : "text-white/70"}`}>
        <span>{m.text}</span>
        {m.check && <span className="text-white">{m.check}</span>}
      </div>
    </>
  );
}

export function SoloArt() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<ChatItem[]>([
    { id: 0, kind: "msg", m: CHAT_SCRIPT[0] },
    { id: 1, kind: "msg", m: CHAT_SCRIPT[1] },
    { id: 2, kind: "msg", m: CHAT_SCRIPT[2] },
  ]);
  const [sliding, setSliding] = useState(false);
  const nextId = useRef(3);

  useEffect(() => {
    if (reduce) return;
    let timeout = 0;
    const iv = window.setInterval(() => {
      const id = nextId.current++;
      const m = CHAT_SCRIPT[id % CHAT_SCRIPT.length];
      // typing indicator slides in below the fold…
      setItems((prev) => [...prev, { id, kind: "typing", m }]);
      setSliding(true);
      timeout = window.setTimeout(() => {
        // …then the sent text pops in as the top message scrolls away
        setItems((prev) => prev.slice(1).map((it) => (it.id === id ? { ...it, kind: "msg" } : it)));
        setSliding(false);
      }, 680);
    }, 2600);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(timeout);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <Shell>
        <div className="w-full max-w-[240px] space-y-2">
          {CHAT_SCRIPT.map((m) => (
            <div
              key={m.text}
              className={`${m.teal ? "ml-auto w-3/5 rounded-xl rounded-br-sm bg-accent" : "w-4/5 rounded-xl rounded-bl-sm bg-[#284B63]"} h-16 p-2.5`}
            >
              <ChatBubbleBody m={m} />
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="relative h-[208px] w-full max-w-[240px] overflow-hidden">
        <div
          style={{
            transform: sliding ? `translateY(-${CHAT_PITCH}px)` : "translateY(0)",
            transition: sliding ? "transform 680ms cubic-bezier(0.16,1,0.3,1)" : "none",
          }}
        >
          <div className="flex h-max flex-col">
          {items.map((it) => (
            <div key={it.id} className="pb-2">
              <div
                className={`${it.m.teal ? "ml-auto w-3/5 rounded-xl rounded-br-sm bg-accent" : "w-4/5 rounded-xl rounded-bl-sm bg-[#284B63]"} relative h-16`}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-300 ${
                    it.kind === "typing" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="wv-typing-dot size-1.5 rounded-full bg-white"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
                <div
                  className={`absolute inset-0 p-2.5 transition-all duration-300 ${
                    it.kind === "typing" ? "scale-95 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  <ChatBubbleBody m={it.m} />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </Shell>
  );
}

/* 03 — Shops: WhatsApp order phone (checking → in-stock → confirmed pulse) */
export function ShopArt() {
  const reduce = useReducedMotion();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setChecking((c) => !c), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <Shell>
      <div className="w-[150px] rounded-2xl border border-black/15 bg-white p-2 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.35)]">
        <div className="rounded-xl bg-[#FAF7F0] p-2">
          <div className="rounded-lg rounded-tl-sm bg-white p-2 shadow-sm">
            <div className="h-1.5 w-full rounded bg-black/15" />
            <div className="mt-1 h-1.5 w-2/3 rounded bg-black/10" />
          </div>
          <div className="relative mt-1.5 h-4">
            <div
              className={`absolute inset-0 flex items-center gap-1.5 transition-opacity duration-500 ${
                checking && !reduce ? "opacity-100" : "opacity-0"
              }`}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="wv-blink size-1.5 rounded-full bg-accent"
                  style={{ animationDelay: `${d * 0.2}s` }}
                />
              ))}
              <span className="font-mono text-[8px] text-stone-500">checking</span>
            </div>
            <div
              className={`absolute inset-0 flex items-center gap-1.5 transition-opacity duration-500 ${
                checking && !reduce ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="flex size-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
                ✓
              </span>
              <span className="font-mono text-[8px] text-stone-600">In stock · 14 left</span>
            </div>
          </div>
          <div
            className={`mt-1.5 rounded-lg rounded-br-sm bg-accent p-2 transition-all duration-500 ${
              checking || reduce ? "" : "shadow-[0_0_14px_rgba(60,110,113,0.55)]"
            }`}
          >
            <div className="h-1.5 w-4/5 rounded bg-white/85" />
            <div className="mt-1 font-mono text-[8px] text-white">Confirmed ✓✓</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* 04 — Clinics: calendar + waitlist (slow random breathing cells) */
export function ClinicArt() {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState<{ i: number; tone: "teal" | "red" }[]>([
    { i: 4, tone: "teal" },
    { i: 9, tone: "red" },
  ]);

  useEffect(() => {
    if (reduce) return;
    // Slow breathing pace: new random cell(s) every ~2s, colors cross-fade
    // over 1s via transition-colors below.
    const id = window.setInterval(() => {
      const count = Math.random() < 0.35 ? 2 : 1;
      const picks = new Set<number>();
      while (picks.size < count) picks.add(Math.floor(Math.random() * 14));
      setLit(
        [...picks].map((i) => ({
          i,
          tone: Math.random() < 0.68 ? ("teal" as const) : ("red" as const),
        })),
      );
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const toneOf = (i: number) => lit.find((l) => l.i === i)?.tone ?? null;

  return (
    <Shell>
      <div className="w-full max-w-[300px] rounded-xl border border-black/10 bg-white/85 p-4">
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => {
            const tone = toneOf(i);
            return (
              <span
                key={i}
                className={`flex aspect-square items-center justify-center rounded-md text-[10px] transition-colors duration-1000 ${
                  tone === "teal"
                    ? "bg-accent font-bold text-white"
                    : tone === "red"
                      ? "bg-[#B3261E]/15 text-[#B3261E]"
                      : "bg-black/[0.05] text-stone-600"
                }`}
              >
                {tone === "teal" ? "✓" : tone === "red" ? "↻" : "·"}
              </span>
            );
          })}
        </div>
        <div className="wv-flow-x mt-2 h-[3px]" />
        <p className="mt-1.5 font-mono text-[9px] text-stone-600">cancel → waitlist filled</p>
      </div>
    </Shell>
  );
}

/* 05 — Schools: vouchers matched */
export function SchoolArt() {
  return (
    <Shell>
      <div className="relative w-full max-w-[230px]">
        <div className="rotate-[-4deg] rounded-xl border border-black/10 bg-white p-2.5 shadow-sm">
          <div className="h-1.5 w-2/3 rounded bg-black/15" />
          <div className="mt-1 h-1.5 w-1/2 rounded bg-black/10" />
        </div>
        <div className="absolute inset-x-6 -bottom-7 rotate-[3deg] rounded-xl border border-black/10 bg-[#284B63] p-2.5 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">✓</span>
            <div className="h-1.5 w-20 rounded bg-white/70" />
          </div>
          <p className="mt-1 font-mono text-[8px] text-white/70">proof matched</p>
        </div>
      </div>
    </Shell>
  );
}

/* 06 — Ads: live workflow runner.
   Original concept inspired by node-editor behavior (bezier connections,
   execution-path highlight, per-node running states). No branding copied:
   own palette, own icons, own timing. declarative SMIL + CSS only. */
const FLOW_PATH = "M45,40 L140,40 L235,40 C259,40 259,128 235,128 L140,128 L45,128";

function FlowIcon({ d, fill }: { d: React.ReactNode; fill?: boolean }) {
  return (
    <g
      transform="translate(-7,-7)"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d}
    </g>
  );
}

const FLOW_NODES: {
  x: number;
  y: number;
  label: string;
  delay: number;
  icon: React.ReactNode;
  iconFill?: boolean;
}[] = [
  {
    x: 45,
    y: 40,
    label: "DATA RETRIEVAL",
    delay: 5.7,
    icon: <path d="M8 1 3.5 8h3.1L5.8 13l5-7.2H7.6Z" />,
    iconFill: true,
  },
  {
    x: 140,
    y: 40,
    label: "CLEAN",
    delay: 0.86,
    icon: (
      <>
        <path d="M2 4.5h10" />
        <path d="M2 7.5h10" />
        <path d="M2 10.5h6" />
      </>
    ),
  },
  {
    x: 235,
    y: 40,
    label: "FILTER",
    delay: 2.03,
    icon: <path d="M2 2.5h10L8 7.5v3.5L6 9.6V7.5Z" />,
  },
  {
    x: 235,
    y: 128,
    label: "APPLY LOGIC",
    delay: 3.37,
    icon: <path d="M7 1.5l1.4 4.1 4.1 1.4-4.1 1.4L7 12.5 5.6 8.4 1.5 7l4.1-1.4Z" />,
  },
  {
    x: 140,
    y: 128,
    label: "DATABASE",
    delay: 4.54,
    icon: (
      <>
        <ellipse cx="7" cy="3.4" rx="4.6" ry="1.9" />
        <path d="M2.4 3.4v7.2c0 1 2.1 1.9 4.6 1.9s4.6-.9 4.6-1.9V3.4" />
      </>
    ),
  },
  {
    x: 45,
    y: 128,
    label: "EXECUTION",
    delay: 5.7,
    icon: (
      <>
        <rect x="1.8" y="2.6" width="10.4" height="7" rx="2" />
        <path d="M4.6 9.6 3.7 12l2.7-1" />
      </>
    ),
  },
];

export function AdsArt() {
  const reduce = useReducedMotion();
  return (
    <Shell>
      <div className="w-full max-w-[280px]">
        <svg
          viewBox="0 0 280 176"
          className="w-full"
          role="img"
          aria-label="Animated automation workflow: data retrieval flows through cleaning, filter, applied logic and database into execution"
        >
          {/* base connection */}
          <path d={FLOW_PATH} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          {/* live execution-path highlight */}
          {!reduce && (
            <path
              d={FLOW_PATH}
              fill="none"
              stroke="#3C6E71"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
              className="wv-dash-flow"
            />
          )}
          {/* data particles */}
          {!reduce &&
            ["0s", "-3s"].map((begin) => (
              <circle key={begin} r="3" fill="#3C6E71" opacity="0.9">
                <animateMotion dur="6s" begin={begin} repeatCount="indefinite" path={FLOW_PATH} />
              </circle>
            ))}
          {FLOW_NODES.map((n) => (
            <g key={n.label}>
              {!reduce && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="22"
                  fill="none"
                  stroke="#3C6E71"
                  strokeWidth="1.5"
                  className="wv-node-ring"
                  style={{ animationDelay: `${n.delay}s` }}
                />
              )}
              <rect
                x={n.x - 17}
                y={n.y - 17}
                width="34"
                height="34"
                rx="10"
                strokeWidth="1.5"
                fill="#fff"
                stroke="rgba(0,0,0,0.1)"
                className={reduce ? undefined : "wv-node-card"}
                style={reduce ? undefined : { animationDelay: `${n.delay}s` }}
              />
              {/* port handles */}
              <circle cx={n.x - 17} cy={n.y} r="2.5" fill="#FAF7F0" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <circle cx={n.x + 17} cy={n.y} r="2.5" fill="#FAF7F0" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <g
                transform={`translate(${n.x},${n.y})`}
                color="#616161"
                className={reduce ? undefined : "wv-node-icon"}
                style={reduce ? undefined : { animationDelay: `${n.delay}s` }}
              >
                <FlowIcon d={n.icon} fill={n.iconFill} />
              </g>
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fontSize="7.5"
                letterSpacing="1"
                fill="#525252"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
        <p className="pt-0.5 text-center font-mono text-[9px] text-stone-600">
          lead in · scored · routed
        </p>
      </div>
    </Shell>
  );
}

/* Catmull-Rom → bezier smoothing for chart lines */
function smoothLine(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return d;
}

/* 07 — Ops: workload vs output area graph (static SVG, performance-overview style) */
export function OpsArt() {
  const reduce = useReducedMotion();
  const W = 260;
  const H = 148;
  const PL = 4;
  const PR = 4;
  const PT = 14;
  const PB = 20;
  const completed = [42, 48, 45, 55, 62, 58, 70, 66, 78, 74, 86, 92];
  const assigned = [30, 34, 32, 38, 44, 40, 48, 52, 50, 56, 60, 64];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const X = (i: number) => PL + (i * (W - PL - PR)) / (completed.length - 1);
  const Y = (v: number) => PT + (1 - v / 100) * (H - PT - PB);
  const pA = completed.map((v, i) => ({ x: X(i), y: Y(v) }));
  const pB = assigned.map((v, i) => ({ x: X(i), y: Y(v) }));
  const lineA = smoothLine(pA);
  const lineB = smoothLine(pB);
  const base = H - PB;
  const areaA = `${lineA}L${X(11)},${base}L${X(0)},${base}Z`;
  const areaB = `${lineB}L${X(11)},${base}L${X(0)},${base}Z`;
  const peak = pA.reduce((m, p) => (p.y < m.y ? p : m));
  return (
    <Shell>
      <div className="w-full max-w-[440px] px-2 py-2">
        <div className="mb-1 flex items-center justify-between px-0.5">
          <p className="text-[11px] font-semibold tracking-tight text-stone-900">Team load</p>
          <p className="font-mono text-[8px] uppercase tracking-wider text-stone-600">Jan – Dec</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Area chart of completed versus assigned work rising through the year">
          <defs>
            <linearGradient id="ops-fill-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3C6E71" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3C6E71" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="ops-fill-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#284B63" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#284B63" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((t) => {
            const y = PT + t * (H - PT - PB);
            return (
              <line key={t} x1={PL} x2={W - PR} y1={y} y2={y} stroke="rgba(0,0,0,0.08)" strokeDasharray="3 3" strokeWidth="1" />
            );
          })}
          <path d={areaB} fill="url(#ops-fill-b)" />
          <path d={areaA} fill="url(#ops-fill-a)" />
          <path d={lineB} fill="none" stroke="#284B63" strokeWidth="2" strokeLinecap="round" />
          <path d={lineA} fill="none" stroke="#3C6E71" strokeWidth="2" strokeLinecap="round" />
          {!reduce && (
            <>
              <path d={lineB} fill="none" stroke="#284B63" strokeWidth="2" strokeLinecap="round" opacity="0.55" className="wv-dash-flow" />
              <path d={lineA} fill="none" stroke="#7FB3B5" strokeWidth="2" strokeLinecap="round" opacity="0.8" className="wv-dash-flow" />
              <circle r="3" fill="#3C6E71" opacity="0.9">
                <animateMotion dur="5s" repeatCount="indefinite" path={lineA} />
              </circle>
            </>
          )}
          <circle cx={peak.x} cy={peak.y} r="3.5" fill="#3C6E71" stroke="#fff" strokeWidth="1.5" />
          {months.map((m, i) => (
            <text key={m} x={X(i)} y={H - 6} textAnchor="middle" fontSize="7" fill="#616161">
              {m}
            </text>
          ))}
        </svg>
        <div className="mt-1 flex items-center gap-3 px-0.5">
          <span className="flex items-center gap-1.5 font-mono text-[8px] text-stone-600">
            <span className="size-1.5 rounded-full bg-accent" /> Completed
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8px] text-stone-600">
            <span className="size-1.5 rounded-full bg-[#284B63]" /> Assigned
          </span>
        </div>
      </div>
    </Shell>
  );
}

/* Hero: orbiting system map */
export function ServicesHeroArt() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[320px]">
      <div className="absolute inset-0 rounded-full border border-black/10" />
      <div className="absolute inset-6 rounded-full border border-dashed border-accent/30" />
      {!reduce && (
        <div className="wv-orbit absolute inset-6">
          <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_rgba(60,110,113,0.7)]" />
          <span className="absolute top-1/2 -right-1.5 size-2 -translate-y-1/2 rounded-full bg-[#284B63]" />
          <span className="absolute bottom-4 left-6 size-2 rounded-full bg-[#284B63]/70" />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={reduce ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-center shadow-[0_24px_45px_-24px_rgba(0,0,0,0.25)]"
        >
          <span
            aria-hidden="true"
            className="mx-auto flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
          >
            ✓
          </span>
          <p className="mt-1.5 text-lg font-semibold tracking-tight text-stone-950">Built to run</p>
          <p className="mt-0.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] text-accent-ink sm:tracking-[0.18em]">
            Designed · Tested · Maintained
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export const groupArts: Record<string, () => React.JSX.Element> = {
  agencies: AgencyArt,
  freelancers: SoloArt,
  ecommerce: ShopArt,
  services: ClinicArt,
  schools: SchoolArt,
  marketing: AdsArt,
  ops: OpsArt,
};
