"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Gear,
  MagnifyingGlass,
  Play,
  Robot,
} from "@phosphor-icons/react";

/* ---------------- 3D pointer tilt (fine pointers, motion-safe) ---------------- */

export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const on = !reduce && fine;

  return (
    <motion.div
      className={className}
      style={
        on
          ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          : undefined
      }
      onMouseMove={(e) => {
        if (!on) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- capability marquee (single, slow) ---------------- */

export function Marquee({ items, duration = "24s" }: { items: string[]; duration?: string }) {
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);

  useEffect(() => {
    const measure = () => {
      const w = copyRef.current?.offsetWidth ?? 0;
      if (!w) return;
      const needed = Math.ceil((window.innerWidth * 2) / w);
      setCopies(Math.max(2, needed % 2 === 0 ? needed : needed + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (copyRef.current) ro.observe(copyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-black/10 py-3 select-none">
      <div
        className="wv-marquee flex w-max will-change-transform"
        style={{ animationDuration: duration }}
      >
        {Array.from({ length: copies }, (_, half) => (
          <div
            key={half}
            ref={half === 0 ? copyRef : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((t) => (
              <span
                key={`${half}-${t}`}
                className="flex items-center px-4 font-mono text-xs tracking-wide whitespace-nowrap text-stone-600"
              >
                <span className="mr-4 size-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- mini system diagrams (pure SVG/CSS, looping) ---------------- */

/* Stage chat: endless support conveyor inside a messenger frame.
   A typing bubble slides in on the sender's side every beat, then pops into
   its message while the oldest message slides up through the fade mask.
   No reset frame — messages keep arriving, one after another. */
type SupportMsg = { text: string; mine: boolean };
const SUPPORT_SCRIPT: SupportMsg[] = [
  { text: "Where is my order #2141?", mine: false },
  { text: "It ships today, arriving Thursday.", mine: true },
  { text: "Can I change the address?", mine: false },
  { text: "Done — updating it now.", mine: true },
  { text: "Great, thanks!", mine: false },
  { text: "Anything else, I'm here 24/7.", mine: true },
  { text: "When does tracking arrive?", mine: false },
  { text: "Tonight, by email.", mine: true },
];
type SupportItem = { id: number; kind: "msg" | "typing"; m: SupportMsg };
const CHAT_PITCH = 46; // h-10 bubble + 6px gap

function supportCls(m: SupportMsg) {
  return m.mine
    ? "ml-auto rounded-xl rounded-br-[4px] bg-[#284B63]"
    : "rounded-xl rounded-bl-[4px] border border-black/10 bg-white";
}

export function ChatArt() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<SupportItem[]>([
    { id: 0, kind: "msg", m: SUPPORT_SCRIPT[0] },
    { id: 1, kind: "msg", m: SUPPORT_SCRIPT[1] },
    { id: 2, kind: "msg", m: SUPPORT_SCRIPT[2] },
    { id: 3, kind: "msg", m: SUPPORT_SCRIPT[3] },
  ]);
  const [sliding, setSliding] = useState(false);
  const nextId = useRef(4);

  useEffect(() => {
    if (reduce) return;
    let timeout = 0;
    const iv = window.setInterval(() => {
      const id = nextId.current++;
      const m = SUPPORT_SCRIPT[id % SUPPORT_SCRIPT.length];
      // typing bubble slides in on the sender's side…
      setItems((prev) => [...prev, { id, kind: "typing", m }]);
      setSliding(true);
      timeout = window.setTimeout(() => {
        // …then the sent text pops in as the top message slides away
        setItems((prev) => prev.slice(1).map((it) => (it.id === id ? { ...it, kind: "msg" } : it)));
        setSliding(false);
      }, 640);
    }, 2700);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(timeout);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div aria-hidden="true" className="flex h-full items-center justify-center px-4 py-6 sm:px-6">
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_44px_-26px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-2.5 border-b border-black/10 bg-white px-4 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#284B63] font-mono text-[10px] font-semibold text-white">
              C
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-none text-stone-900">
                Customer
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] leading-none text-stone-500">
                <span className="size-1.5 rounded-full bg-accent" />
                online
              </p>
            </div>
            <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[10px] text-stone-600">
              AI agent
            </span>
          </div>
          <div className="flex h-48 flex-col gap-1.5 px-3.5 pb-4 pt-3 sm:h-56">
            {SUPPORT_SCRIPT.slice(0, 4).map((m) => (
              <div key={m.text} className={`${supportCls(m)} flex h-10 items-center px-3`}>
                <span
                  className={`whitespace-nowrap text-[11px] font-medium leading-none ${
                    m.mine ? "text-white" : "text-stone-700"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center px-4 py-6 sm:px-6">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_44px_-26px_rgba(0,0,0,0.28)]">
        <div className="flex items-center gap-2.5 border-b border-black/10 bg-white px-4 py-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#284B63] font-mono text-[10px] font-semibold text-white">
            C
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold leading-none text-stone-900">
              Customer
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[10px] leading-none text-accent-ink">
              <span className="wv-blink size-1.5 rounded-full bg-accent" />
              online
            </p>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-black/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[10px] text-stone-600">
            AI agent
          </span>
        </div>
        <div className="h-48 overflow-hidden px-3.5 pb-4 pt-2 sm:h-56">
          <div
            className="flex flex-col gap-1.5"
            style={{
              transform: sliding ? `translateY(-${CHAT_PITCH}px)` : "translateY(0)",
              transition: sliding ? "transform 640ms cubic-bezier(0.16,1,0.3,1)" : "none",
            }}
          >
            {items.map((it) => (
              <div key={it.id} className="flex">
                <div className={`${supportCls(it.m)} relative flex h-10 w-fit items-center`}>
                  {/* message text — in flow, defines the bubble's width */}
                  <div
                    className={`flex items-center px-3 transition-all duration-300 ${
                      it.kind === "typing" ? "scale-95 opacity-0" : "scale-100 opacity-100"
                    }`}
                  >
                    <span
                      className={`whitespace-nowrap text-[11px] font-medium leading-none ${
                        it.m.mine ? "text-white" : "text-stone-700"
                      }`}
                    >
                      {it.m.text}
                    </span>
                  </div>
                  {/* typing indicator — same slot, side-colored dots */}
                  <div
                    className={`absolute inset-0 flex items-center px-3 transition-opacity duration-300 ${
                      it.kind === "typing" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className={`wv-typing-dot size-1.5 rounded-full ${
                          it.m.mine ? "bg-white/90" : "bg-stone-400"
                        }`}
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BarsArt() {
  const bars = [38, 62, 48, 80, 58, 92, 70];
  return (
    <div aria-hidden="true" className="flex h-full items-end justify-center gap-3 px-8 pb-10 pt-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`wv-bar w-7 rounded-t-sm sm:w-8 ${i === 5 ? "bg-accent" : "bg-[#284B63]"}`}
          style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function TrendArt() {
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polyline
          points="10,102 58,86 96,92 140,60 188,66 236,46 288,30 308,24"
          fill="none"
          stroke="#3C6E71"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="wv-pingdot absolute h-3.5 w-3.5 rounded-full bg-[#284B63]"
        style={{ left: "calc(96.2% - 7px)", top: "calc(20% - 7px)" }}
      />
    </div>
  );
}

export function RingArt() {
  const c = 2 * Math.PI * 46;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="mx-auto h-full py-3"
    >
      <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="12" />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="#3C6E71"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${0.78 * c} ${c}`}
        transform="rotate(-90 60 60)"
      />
      <g className="wv-orbit" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="14" r="5" fill="#ffffff" stroke="#3C6E71" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function BrowserArt() {
  const rows = [84, 66, 78, 52];
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden px-5 py-5">
      <div className="h-full rounded-xl border border-black/10 bg-white/90 p-4">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
        </div>
        {rows.map((w, i) => (
          <div key={i} className="mb-3 flex items-center gap-2.5">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              ✓
            </span>
            <div className="h-2 rounded bg-black/15" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="wv-scan pointer-events-none absolute inset-x-5 top-5 h-8 bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
    </div>
  );
}

export function PipeArt() {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center gap-5 px-8">
      <div className="flex flex-col gap-2.5">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="wv-blink size-3 rounded-full bg-[#284B63]"
            style={{ animationDelay: `${d * 0.25}s` }}
          />
        ))}
      </div>
      <svg width="96" height="72" viewBox="0 0 96 72" fill="none" className="max-w-[34%] flex-1">
        <path
          d="M2 14 L94 36 M2 36 H94 M2 58 L94 36"
          stroke="#3C6E71"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="wv-dash-flow"
        />
      </svg>
      <div className="w-32 space-y-2 rounded-lg border border-black/10 bg-white/90 p-3 shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] sm:w-40">
        <div className="h-2 w-full rounded bg-black/20" />
        <div className="h-2 w-5/6 rounded bg-black/15" />
        <div className="h-2 w-4/6 rounded bg-black/15" />
        <div className="h-2 w-3/6 rounded bg-accent" />
      </div>
    </div>
  );
}

/* ---------------- animated pipeline: bottleneck → report ---------------- */

const flowNodes = [
  { icon: MagnifyingGlass, label: "Spot the bottleneck" },
  { icon: Robot, label: "Agent does the work" },
  { icon: Gear, label: "Wired into your tools" },
  { icon: Play, label: "The system executes" },
];

export function FlowDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-center">
      {flowNodes.map((n, i) => (
        <Fragment key={n.label}>
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-4">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-ink"
            >
              <n.icon size={20} />
            </span>
            <p className="text-sm font-medium text-stone-900">{n.label}</p>
            <span
              aria-hidden="true"
              className="wv-blink ml-auto size-2 shrink-0 rounded-full bg-accent"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </div>
          {i < flowNodes.length - 1 && (
            <Fragment>
              <div aria-hidden="true" className="wv-flow-y mx-auto h-7 w-[3px] md:hidden" />
              <div aria-hidden="true" className="wv-flow-x hidden h-[3px] w-10 shrink-0 md:block" />
            </Fragment>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ---------------- 3D process deck (true loop, canted, motion-safe) ---------------- */

export type DeckStep = { n: string; t: string; d: string };

export function ProcessDeck({ steps }: { steps: DeckStep[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const goTo = (i: number) => {
    setExiting(active);
    setActive(((i % steps.length) + steps.length) % steps.length);
  };

  useEffect(() => {
    if (exiting === null) return;
    const t = window.setTimeout(() => setExiting(null), 800);
    return () => window.clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      goTo(active + 1);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduce, paused, steps.length, active]);

  if (reduce) {
    return (
      <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {steps.map((s) => (
          <li key={s.n} className="border-t-2 border-stone-900/80 pt-4">
            <p aria-hidden="true" className="font-mono text-xs text-accent-ink">
              {s.n}
            </p>
            <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-stone-950">
              {s.t}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-stone-600">{s.d}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div style={{ perspective: 1600 }}>
      <div
        className="[transform:rotateX(9deg)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="grid" style={{ perspective: 1400 }}>
          {steps.map((s, i) => {
            const offset = (i - active + steps.length) % steps.length;
            const leaving = i === exiting && offset !== 0;
            return (
              <motion.article
                key={s.n}
                aria-hidden={offset !== 0}
                className="col-start-1 row-start-1 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_45px_-28px_rgba(0,0,0,0.10)] [backface-visibility:hidden] sm:p-8"
                initial={false}
                animate={
                  offset === 0
                    ? { z: 0, y: 0, scale: 1, opacity: 1, zIndex: 3 }
                    : leaving
                      ? {
                          z: [0, -120, -240],
                          y: [0, 84, 48],
                          scale: [1, 0.9, 0.88],
                          opacity: [1, 0.85, 0.6],
                          zIndex: 1,
                        }
                      : offset === 1
                        ? { z: -120, y: 24, scale: 0.94, opacity: 0.85, zIndex: 2 }
                        : { z: -240, y: 48, scale: 0.88, opacity: 0.6, zIndex: 1 }
                }
                transition={
                  leaving
                    ? { duration: 0.85, times: [0, 0.55, 1], ease: "easeInOut" }
                    : { type: "spring", stiffness: 160, damping: 22 }
                }
              >
                <p aria-hidden="true" className="font-mono text-xs text-accent-ink">
                  {s.n}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">
                  {s.t}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-stone-600">
                  {s.d}
                </p>
              </motion.article>
            );
          })}
        </div>
      <div className="relative z-10 mt-8 flex items-center gap-2" role="group" aria-label="Process steps">
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => goTo(i)}
            aria-pressed={i === active}
            aria-label={`Show step ${s.n}: ${s.t}`}
            className={`flex h-11 min-w-11 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-300 ${
              i === active
                ? "border-[#353535] bg-[#353535] text-white"
                : "border-black/15 bg-white/60 text-stone-600 hover:border-black/30"
            }`}
            >
              {s.n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- scroll-linked motion (transform-only, motion-safe) ---------------- */

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

export function Parallax({
  children,
  className,
  amount = 28,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
