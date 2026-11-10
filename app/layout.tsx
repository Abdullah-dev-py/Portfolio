import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { links } from "@/lib/links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} — ${SITE.titleSuffix}`,
    template: `%s — ${SITE.titleSuffix}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: `${SITE.title} — ${SITE.titleSuffix}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "en-US",
      description:
        "Automation systems, AI workflows, reporting pipelines and clean websites that remove real business bottlenecks.",
      publisher: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.name,
      url: `${SITE.url}/`,
      email: links.email,
      jobTitle: "Systems builder and web developer",
      sameAs: [links.linkedin, links.instagram],
      knowsAbout: [
        "n8n",
        "automation",
        "AI workflows",
        "reporting systems",
        "web development",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: SITE.name,
      url: `${SITE.url}/`,
      email: links.email,
      description:
        "Automation systems, AI chat agents, reporting pipelines and websites for agencies, e-commerce brands and service companies.",
      founder: { "@id": `${SITE.url}/#person` },
      areaServed: "Worldwide",
      sameAs: [links.linkedin, links.instagram],
      knowsAbout: [
        "n8n",
        "automation",
        "AI workflows",
        "reporting systems",
        "web development",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#FAF7F0] text-stone-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="wv-dots-bg absolute -inset-[22px]" />
          <div className="wv-ambient-a absolute -top-[10vmax] -left-[10vmax] h-[55vmax] w-[55vmax]" />
          <div className="wv-ambient-b absolute top-[30%] -right-[15vmax] h-[50vmax] w-[50vmax]" />
          <div className="wv-ambient-c absolute -bottom-[15vmax] left-[20%] h-[45vmax] w-[45vmax]" />
        </div>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
