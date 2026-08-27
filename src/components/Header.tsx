"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/data/site";
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
          ? "bg-ink border-b border-gold-deep/30 py-[clamp(8px,2vh,12px)]"
          : "bg-transparent py-[clamp(12px,3vh,24px)]"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          {/*
            Sized with clamp() against viewport HEIGHT (vh), not just
            width — a large logo is what was eating the vertical space
            that caused the header to collide with the hero text on short
            viewports (laptops, resized windows). Scaling it down as
            height shrinks keeps a real gap at any window size, rather
            than just at the widths this happened to be tested at.
          */}
          <Image
            src="/logo.png"
            alt="Everstone"
            width={180}
            height={180}
            className={`object-contain brightness-0 invert transition-all duration-500 ${
              scrolled
                ? "h-[clamp(96px,14vh,192px)] w-[clamp(96px,14vh,192px)]"
                : "h-[clamp(64px,12vh,160px)] w-[clamp(64px,12vh,160px)]"
            }`}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.map((item) =>
            item.logo ? (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="flex items-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={item.logo}
                  alt={item.label}
                  width={100}
                  height={28}
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-cream/80 hover:text-gold-light transition-colors relative group"
              >
                <TextRoll>{item.label}</TextRoll>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center border border-gold-light/50 text-gold-light text-xs tracking-[0.2em] uppercase px-5 py-3 hover:bg-gold-light hover:text-ink transition-colors duration-300"
        >
          Enquire Now
        </Link>

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
          open ? "max-h-[28rem] mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 pb-6">
          {mainNav.map((item) =>
            item.logo ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center"
              >
                <Image
                  src={item.logo}
                  alt={item.label}
                  width={100}
                  height={28}
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-cream/85 text-sm tracking-wide"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-gold-light text-sm"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
