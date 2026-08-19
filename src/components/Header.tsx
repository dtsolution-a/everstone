"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, contact } from "@/data/site";
import TextRoll from "./ui/TextRoll";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink border-b border-gold-deep/30 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Everstone"
            width={180}
            height={180}
            className={`object-contain transition-all duration-500 ${
              scrolled
                ? "h-20 w-20 md:h-24 md:w-24"
                : "h-32 w-32 md:h-40 md:w-40"
            }`}
            priority
          />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-cream/80 hover:text-gold-light transition-colors relative group"
            >
              <TextRoll>{item.label}</TextRoll>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={contact.phoneHref}
          className="hidden lg:inline-flex items-center border border-gold-light/50 text-gold-light text-xs tracking-[0.2em] uppercase px-5 py-3 hover:bg-gold-light hover:text-ink transition-colors duration-300"
        >
          Enquire Now
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 w-8"
        >
          <span
            className={`h-px w-full bg-cream transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-full bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-full bg-cream transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 pb-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-cream/85 text-sm tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <a href={contact.phoneHref} className="text-gold-light text-sm">
            {contact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
