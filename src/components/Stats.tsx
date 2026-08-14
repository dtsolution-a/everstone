"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { stats } from "@/data/site";

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });

      gsap.to(".stats-bg", {
        yPercent: 15,
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
      ref={sectionRef}
      className="relative bg-ink py-28 md:py-40 overflow-hidden"
    >
      <div
        className="stats-bg absolute inset-0 bg-cover bg-center opacity-25 scale-125"
        style={{ backgroundImage: "url('/factory.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <p className="eyebrow mb-4 text-center">By The Numbers</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-cream text-center max-w-2xl mx-auto mb-16">
          Full control from raw material to finished slab.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-light text-5xl md:text-6xl text-gold-light">
                <span className="stat-value" data-value={s.value}>
                  0
                </span>
                {s.suffix}
              </p>
              <p className="mt-3 text-xs md:text-sm tracking-wide text-cream/50 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
