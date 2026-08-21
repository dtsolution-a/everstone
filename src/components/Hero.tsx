"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contact } from "@/data/site";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const luxuryRef = useRef<HTMLSpanElement | null>(null);
  const servedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const playIntro = () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.8 })
          .from(".hero-headline", { yPercent: 120, opacity: 0, duration: 1.1 }, "-=0.4")
          .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.5")
          .from(".hero-cta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.6")
          .from(".hero-scroll-cue", { opacity: 0, duration: 1 }, "-=0.4");
      };

      // The headline entrance waits for PeelReveal's intro to finish so
      // it doesn't animate in behind the still-closed peel panels — see
      // PeelReveal.tsx, which dispatches this once the reveal completes
      // (or immediately, if the intro already played earlier this session).
      if (typeof window !== "undefined" && sessionStorage.getItem("everstone-intro-seen")) {
        playIntro();
      } else {
        window.addEventListener("everstone:revealed", playIntro, { once: true });
      }

      // "Luxury" swaps for "Served" over the first stretch of scroll.
      gsap.set(servedRef.current, { yPercent: 100, opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            // A plain "+=60%" end isn't reliably resolved by ScrollTrigger
            // without a reference point — use an explicit pixel distance
            // (60% of the viewport height) instead, which is unambiguous.
            end: `+=${Math.round(window.innerHeight * 0.6)}`,
            scrub: true,
          },
        })
        .to(luxuryRef.current, { yPercent: -100, opacity: 0, ease: "none" }, 0)
        .to(servedRef.current, { yPercent: 0, opacity: 1, ease: "none" }, 0);

      return () => window.removeEventListener("everstone:revealed", playIntro);
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
        {/* Full-bleed looping video behind the hero copy */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero-video-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-ink/70" />
        </div>

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-center">
          <p className="hero-eyebrow eyebrow mb-6">
            Everstone Building Materials LLC — Est. 2013
          </p>
          <h1
            ref={headlineRef}
            className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-none text-cream"
          >
            <span className="hero-headline relative block overflow-hidden h-[1.15em]">
              <span
                ref={luxuryRef}
                className="absolute inset-0 flex items-center tracking-[0.04em]"
              >
                Luxury
              </span>
              <span
                ref={servedRef}
                className="absolute inset-0 flex items-center italic text-gold-light tracking-[0.04em]"
              >
                Served
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
