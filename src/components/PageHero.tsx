"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  body,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  body?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-hero-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative bg-ink pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <p className="page-hero-reveal eyebrow mb-5">{eyebrow}</p>
        <h1 className="page-hero-reveal font-display font-light text-4xl md:text-6xl text-cream max-w-2xl leading-[1.05]">
          {title}{" "}
          {highlight && (
            <em className="text-gold-light not-italic">{highlight}</em>
          )}
        </h1>
        {body && (
          <p className="page-hero-reveal mt-6 text-cream/60 max-w-xl leading-relaxed">
            {body}
          </p>
        )}
      </div>
    </div>
  );
}
