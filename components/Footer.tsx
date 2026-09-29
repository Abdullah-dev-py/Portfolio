import Link from "next/link";
import { links } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-stone-600">
          © {new Date().getFullYear()} · Working remotely, worldwide
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-600">
          <Link className="hover:text-stone-900" href="/">Home</Link>
          <Link className="hover:text-stone-900" href="/work">Work</Link>
          <Link className="hover:text-stone-900" href="/services">Services</Link>
          <a className="hover:text-stone-900" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
