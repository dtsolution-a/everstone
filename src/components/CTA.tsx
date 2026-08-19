"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contact } from "@/data/site";
import TextRoll from "./ui/TextRoll";

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.to(".cta-bg", {
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
      className="relative py-40 md:py-56 overflow-hidden bg-ink"
    >
      <div
        className="cta-bg absolute inset-0 bg-cover bg-center opacity-40 scale-125"
        style={{ backgroundImage: "url('/app-hospitality.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="cta-reveal eyebrow mb-6">Request A Sample</p>
        <h2 className="cta-reveal font-display font-light text-4xl md:text-6xl text-cream leading-[1.1] mb-10">
          See it, feel it,{" "}
          <em className="text-gold-light not-italic">before you spec it</em>.
        </h2>
        <div className="cta-reveal flex flex-wrap items-center justify-center gap-6">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-3 bg-gold-light text-ink text-xs tracking-[0.2em] uppercase px-8 py-5 hover:bg-cream transition-colors duration-300"
          >
            <TextRoll>Request A Sample</TextRoll>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-cream/80 text-sm tracking-wide hover:text-gold-light transition-colors border-b border-cream/30 pb-1"
          >
            <TextRoll>{contact.email}</TextRoll>
          </a>
        </div>
      </div>
    </section>
  );
}
