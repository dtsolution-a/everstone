"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TextRoll from "./ui/TextRoll";

const POINTS = [
  {
    title: "Pan-India Manufacturing",
    copy: "Full production control across our own facilities — no third-party inconsistency.",
  },
  {
    title: "UAE Warehousing",
    copy: "Dedicated stock across the Emirates, so specification never stalls a project.",
  },
  {
    title: "Large-Format Specialists",
    copy: "Slabs engineered for seamless, joint-free surfaces at scale.",
  },
  {
    title: "Prime Showroom Brands",
    copy: "Home to Exclusive and Geogres — curated lines for luxury and large-format projects.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cream text-ink py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-16">
        <p className="why-reveal eyebrow !text-gold-deep mb-4">
          Why Everstone
        </p>
        <h2 className="why-reveal font-display font-light text-4xl md:text-5xl max-w-xl">
          Built for <em className="text-gold-deep not-italic">specification-grade</em> projects.
        </h2>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
        {POINTS.map((p) => (
          <div
            key={p.title}
            className="why-reveal group bg-cream p-8 hover:bg-ink transition-colors duration-500"
          >
            <h3 className="font-display text-xl mb-3 group-hover:text-cream transition-colors duration-500">
              <TextRoll>{p.title}</TextRoll>
            </h3>
            <p className="text-ink/60 group-hover:text-cream/60 text-sm leading-relaxed transition-colors duration-500">
              {p.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
