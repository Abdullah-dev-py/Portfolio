import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
  title: "Abdullah Faisal — systems and websites that fix bottlenecks",
  description:
    "Abdullah Faisal builds automation, AI workflows, reporting systems and clean websites for agencies, e-commerce brands and service companies. Karachi, Pakistan · remote.",
  metadataBase: new URL("https://abdullah.dev"),
  openGraph: {
    title: "Abdullah Faisal — I fix real business bottlenecks",
    description:
      "Automation, AI workflows, reporting systems and websites that remove operational friction.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Faisal",
  jobTitle: "Systems builder and web developer",
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  email: "mailto:abdulahfaysal04@gmail.com",
  sameAs: [
    "https://www.instagram.com/abdulah._faisal_/",
    "https://www.linkedin.com/in/abdullah-faisal-bb0263282/",
  ],
  knowsAbout: ["n8n", "automation", "AI workflows", "reporting systems", "web development"],
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
