import type { Metadata } from "next";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How this site handles data: a static site with no analytics, no cookies and no stored personal data. Contact happens directly by email or social messages.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "/privacy",
    title: "Privacy policy — Abdullah Faisal",
    description:
      "A static site with no analytics, no cookies and no stored personal data. Contact happens directly by email or social messages.",
  },
};

const sections = [
  {
    title: "The short version",
    body: [
      "This site is static. There is no analytics, no cookies, no tracking scripts and no forms that store anything on a server. I cannot see who visits this site, only that it gets visits in aggregate through my hosting provider's basic traffic overview.",
    ],
  },
  {
    title: "What is collected",
    body: [
      "Nothing automatically. If you contact me by email, LinkedIn or Instagram, I receive only what you choose to send: your message, your name and contact details if you include them.",
    ],
  },
  {
    title: "How your data is used",
    body: [
      "Messages are used to reply to you and, where relevant, to prepare proposals. I do not sell, rent or share your details with third parties. Message threads are kept in my email or social inboxes for as long as our conversation is useful and are deleted on request.",
    ],
  },
  {
    title: "Hosting",
    body: [
      "The site is served by Cloudflare Pages. Cloudflare processes standard technical request data (IP address, user agent, requested URL) to deliver pages and protect against abuse, under its own privacy policy. No other party receives data about your visit.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If anything about this site's data handling changes, for example adding analytics or a contact form, this page will be updated to describe it before that feature ships.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <section aria-labelledby="privacy-h" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
          Legal
        </p>
        <h1
          id="privacy-h"
          className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tighter text-stone-950 sm:text-5xl lg:text-6xl"
        >
          Privacy policy
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-stone-600">
          Plain terms, no legalese. Last updated November 2026.
        </p>

        <div className="mt-12 max-w-2xl">
          {sections.map((s) => (
            <section key={s.title} className="border-t border-black/10 py-7 first:border-t-0 first:pt-0">
              <h2 className="text-lg font-semibold tracking-tight text-stone-950">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-[15px] leading-relaxed text-stone-600">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <section className="border-t border-black/10 py-7 first:border-t-0">
            <h2 className="text-lg font-semibold tracking-tight text-stone-950">Contact</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
              Questions about this policy, or a request to delete a conversation:{" "}
              <a
                href={links.emailHref}
                className="font-medium text-stone-950 underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-ink"
              >
                {links.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
