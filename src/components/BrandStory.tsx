"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden">
          <Image
            src="/factory.jpg"
            alt="Everstone manufacturing facility"
            fill
            className="story-image object-cover scale-[1.15]"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
          <div className="absolute inset-0 border border-ink/10" />
        </div>

        <div className="lg:col-span-6">
          <p className="story-reveal eyebrow !text-gold-deep mb-6">
            Our Story
          </p>
          <h2 className="story-reveal font-display font-light text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] mb-8">
            Thirteen years of{" "}
            <em className="text-gold-deep not-italic font-normal">
              precision manufacturing
            </em>
            .
          </h2>
          <p className="story-reveal text-ink/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            Since 2013, Everstone Building Materials LLC has grown into a
            premier porcelain tile brand — dedicated to the curation of
            sophisticated surface solutions for the region&rsquo;s most
            demanding projects.
          </p>
          <p className="story-reveal text-ink/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Our manufacturing facilities in India give us direct control
            over quality at every stage, while dedicated warehousing across
            the UAE keeps dealers, contractors and developers stocked
            without compromise.
          </p>

          <div className="story-reveal grid grid-cols-2 gap-8 max-w-md">
            <div>
              <p className="font-display text-3xl text-gold-deep">2013</p>
              <p className="text-xs tracking-wide text-ink/50 mt-1">
                Founded
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-gold-deep">2</p>
              <p className="text-xs tracking-wide text-ink/50 mt-1">
                Countries of Operation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
