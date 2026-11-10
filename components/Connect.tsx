import {
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { links } from "@/lib/links";
import { Reveal } from "./Reveal";

const items = [
  { icon: InstagramLogo, label: "Instagram", href: links.instagram, external: true },
  { icon: LinkedinLogo, label: "LinkedIn", href: links.linkedin, external: true },
];

export function Connect() {
  return (
    <section aria-labelledby="connect-h" className="border-t border-black/10 bg-[#284B63]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <Reveal>
          <h2 id="connect-h" className="max-w-xl text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
            Work with me
          </h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/75">
            One message about your bottleneck is enough. I reply within one working day.
          </p>
          <p className="mt-4 max-w-md font-mono text-xs tracking-wide text-white/55">
            Documentation · handover walkthrough · maintenance after launch
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-col items-start gap-3">
            <a
              href={links.emailHref}
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-[#FAF7F0] active:translate-y-[1px]"
            >
              Email me
            </a>
            <p className="font-mono text-xs text-white/60">{links.email}</p>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-[13px] font-medium text-white/80 transition-colors hover:border-white/35 hover:bg-white/10 hover:text-white"
                  >
                    <item.icon size={15} aria-hidden className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
