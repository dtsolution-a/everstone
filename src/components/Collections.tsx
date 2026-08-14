"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { collections } from "@/data/site";

export default function Collections() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const distance = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 0.6}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {};
      });

      mm.add("(max-width: 899px)", () => {
        gsap.from(".collection-card", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 80%",
          },
        });
        return () => {};
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative bg-ink py-20 md:py-0 md:h-screen md:overflow-hidden"
    >
      <div className="px-6 md:px-10 pt-4 md:pt-16 pb-10 md:pb-6 max-w-[1440px] mx-auto">
        <p className="eyebrow mb-4">Curated Collections</p>
        <h2 className="font-display font-light text-4xl md:text-5xl text-cream max-w-xl">
          Formats built for{" "}
          <em className="text-gold-light not-italic">every surface</em>.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-8 md:gap-6 px-6 md:px-10 md:w-max"
      >
        {collections.map((c) => (
          <article
            key={c.name}
            className="collection-card group relative w-full md:w-[420px] shrink-0 overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(min-width: 768px) 420px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[11px] tracking-[0.25em] uppercase text-gold-light mb-2">
                  {c.finish}
                </p>
                <h3 className="font-display text-2xl text-cream mb-2">
                  {c.name}
                </h3>
                <p className="text-cream/60 text-sm">{c.size}</p>
              </div>
            </div>
          </article>
        ))}

        <div className="collection-card w-full md:w-[280px] shrink-0 flex flex-col justify-center pb-10 md:pb-0">
          <p className="text-cream/60 text-sm leading-relaxed mb-6">
            Full specification sheets and dealer catalogues are available on
            request.
          </p>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-3 border border-gold-light/50 text-gold-light text-xs tracking-[0.2em] uppercase px-6 py-4 hover:bg-gold-light hover:text-ink transition-colors duration-300"
          >
            Request Catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
