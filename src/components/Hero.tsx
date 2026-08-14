"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contact } from "@/data/site";
import TiltCards from "./hero/TiltCards";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.8, delay: 0.3 })
        .from(
          ".hero-line",
          { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.12 },
          "-=0.4"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-scroll-cue",
          { opacity: 0, duration: 1 },
          "-=0.4"
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[170vh] w-full bg-ink"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient base image behind the tilted card fan for depth + texture */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-110"
            style={{ backgroundImage: "url('/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink/60" />
        </div>

        <TiltCards sectionRef={sectionRef} />

        {/*
          Sits above the card fan but below the text, so the headline
          column always stays readable even where a card drifts underneath.
        */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/75 sm:via-40% to-transparent" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-center">
          <p className="hero-eyebrow eyebrow mb-6">
            Everstone Building Materials LLC — Est. 2013
          </p>
          <h1
            ref={headlineRef}
            className="font-display font-light text-[13vw] sm:text-[9vw] lg:text-[6.4vw] leading-[0.95] text-cream max-w-4xl"
          >
            <span className="block overflow-hidden">
              <span className="hero-line block">Surfaces that</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic text-gold-light">
                outlast the trend.
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-md text-cream/70 text-base md:text-lg leading-relaxed">
            Large-format porcelain, engineered in India and warehoused
            across the UAE — curated for architects, contractors and
            homeowners who build for the long term.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#collections"
              className="inline-flex items-center gap-3 bg-gold-light text-ink text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-cream transition-colors duration-300"
            >
              View Collections
            </a>
            <a
              href={contact.phoneHref}
              className="text-cream/80 text-sm tracking-wide hover:text-gold-light transition-colors border-b border-cream/30 pb-1"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="hero-scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/50">
          <span className="text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <span className="w-px h-12 bg-gradient-to-b from-gold-light to-transparent" />
        </div>
      </div>
    </section>
  );
}
