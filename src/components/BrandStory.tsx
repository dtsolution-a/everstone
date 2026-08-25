"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
  { value: "15+", label: "Years of Craft" },
  { value: "2", label: "Countries of Operation" },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // A cream bar wipes off the image left-to-right as it comes into
      // view, revealing the photo rather than a plain fade.
      gsap.fromTo(
        ".story-wipe",
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.1,
          ease: "power4.inOut",
          transformOrigin: "right",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.from(".story-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.to(".story-image", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream text-ink py-28 md:py-40 overflow-hidden"
    >
      {/* Oversized ghost year mark for editorial scale */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 md:-top-16 left-1/2 -translate-x-1/2 text-outline-dark font-display font-light leading-none opacity-[0.05] whitespace-nowrap"
        style={{ fontSize: "clamp(6rem, 20vw, 20rem)" }}
      >
        15+ Years
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/hero.jpg"
              alt="Everstone surfaces"
              fill
              className="story-image object-cover scale-[1.15]"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div className="absolute inset-0 border border-ink/10" />
            {/* Wipe reveal cover */}
            <div className="story-wipe absolute inset-0 bg-cream" />
          </div>

          {/* Floating stat card overlapping the image corner */}
          <div className="story-card absolute -bottom-8 -right-4 sm:-right-8 bg-ink text-cream px-7 py-6 max-w-[210px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.4)]">
            <p className="font-display text-4xl text-gold-light leading-none">
              15+
            </p>
            <p className="text-xs tracking-wide text-cream/60 mt-2">
              Years engineering porcelain surfaces
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <p className="story-reveal eyebrow !text-gold-deep mb-6">
            Our Story
          </p>
          <h2 className="story-reveal font-display font-light text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] mb-8">
            Over 15 years of{" "}
            <em className="text-gold-deep not-italic font-normal">
              precision craftsmanship
            </em>
            .
          </h2>
          <p className="story-reveal text-ink/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            With over 15 years of industry experience, Everstone Building
            Materials LLC has grown into a premier porcelain tile brand —
            dedicated to the curation of sophisticated surface solutions
            for the region&rsquo;s most demanding projects.
          </p>
          <p className="story-reveal text-ink/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Our manufacturing facilities in India give us direct control
            over quality at every stage, while dedicated warehousing across
            the UAE keeps dealers, contractors and developers stocked
            without compromise.
          </p>

          <div className="story-reveal flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-ink/10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-gold-deep">
                  {s.value}
                </p>
                <p className="text-xs tracking-wide text-ink/50 mt-1 max-w-[9rem]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
