"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Sourcing",
    copy: "Premium raw materials selected from trusted quarries, tested for consistency before a single slab is pressed.",
  },
  {
    n: "02",
    title: "Manufacturing",
    copy: "High-pressure pressing and digital printing at our India facilities — full control over every batch.",
  },
  {
    n: "03",
    title: "Quality Check",
    copy: "Each run is inspected for shade, caliber and surface integrity before it clears the warehouse floor.",
  },
  {
    n: "04",
    title: "Delivery",
    copy: "Dedicated UAE warehousing keeps dealers, contractors and developers stocked, on schedule.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.fromTo(
        ".process-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-20">
        <p className="process-reveal eyebrow mb-4">How It&rsquo;s Made</p>
        <h2 className="process-reveal font-display font-light text-4xl md:text-5xl text-cream max-w-xl">
          From quarry to <em className="text-gold-light not-italic">your project</em>.
        </h2>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="absolute top-6 left-6 right-6 md:left-10 md:right-10 h-px bg-cream/10 hidden lg:block">
          <div
            className="process-line-fill h-full bg-gold-light origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="process-reveal relative">
              <div className="relative z-10 w-12 h-12 rounded-full border border-gold-light/40 bg-ink flex items-center justify-center text-gold-light font-display mb-6">
                {s.n}
              </div>
              <h3 className="font-display text-xl text-cream mb-3">
                {s.title}
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
                {s.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
