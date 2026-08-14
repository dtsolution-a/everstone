"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { applications } from "@/data/site";

export default function Applications() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".app-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative bg-cream-dim text-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-16">
        <p className="eyebrow !text-gold-deep mb-4">Where It Belongs</p>
        <h2 className="font-display font-light text-4xl md:text-5xl max-w-xl">
          One material,{" "}
          <em className="text-gold-deep not-italic">three worlds</em>.
        </h2>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-3 gap-6">
        {applications.map((a) => (
          <article key={a.name} className="app-card group relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={a.image}
                alt={a.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors duration-500" />
            </div>
            <div className="pt-6">
              <h3 className="font-display text-2xl mb-2">{a.name}</h3>
              <p className="text-ink/60 text-sm leading-relaxed max-w-sm">
                {a.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
