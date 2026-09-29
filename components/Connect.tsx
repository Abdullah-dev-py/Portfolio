import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { links } from "@/lib/links";
import { Reveal } from "./Reveal";

const items = [
  { icon: EnvelopeSimple, label: links.email, href: links.emailHref, external: false },
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
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="flex flex-col gap-2.5">
            {items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex max-w-full items-center gap-2.5 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/35 hover:bg-white/10"
                >
                  <item.icon size={18} aria-hidden className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
