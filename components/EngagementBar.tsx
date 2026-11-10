import {
  EnvelopeSimple,
  FileText,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const facts = [
  { icon: EnvelopeSimple, text: "Replies within one working day" },
  { icon: FileText, text: "Scoped builds, documented end to end" },
  { icon: Handshake, text: "Handover walkthrough, maintained after launch" },
];

export function EngagementBar() {
  return (
    <section aria-label="How engagements work" className="border-t border-black/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
            How it goes
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 lg:justify-end">
            {facts.map((f) => (
              <li key={f.text} className="flex items-center gap-2.5 text-sm text-stone-700">
                <f.icon size={18} aria-hidden="true" className="shrink-0 text-accent-ink" />
                {f.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
