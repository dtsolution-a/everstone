"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { brands } from "@/data/brands";

export default function OurBrands() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-card-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const list = [brands.exclusive, brands.geogres];

  return (
    <section ref={sectionRef} className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-14">
        <p className="eyebrow mb-4">Our Showroom Brands</p>
        <h2 className="font-display font-light text-4xl md:text-5xl text-cream max-w-2xl">
          Prime brands, housed under{" "}
          <em className="text-gold-light not-italic">one showroom</em>.
        </h2>
        <p className="mt-5 text-cream/55 max-w-xl leading-relaxed">
          Everstone showcases two prime surface brands — each with their
          own distinct collections — alongside our own porcelain range.
        </p>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-2 gap-6">
        {list.map((b) => (
          <Link
            key={b.slug}
            href={`/${b.slug}`}
            className="brand-card-reveal group relative overflow-hidden aspect-[4/3] md:aspect-[16/11]"
          >
            <Image
              src={b.heroImage}
              alt={b.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                style={{ color: b.accent }}
              >
                Showroom Brand
              </p>
              <span className="inline-flex w-fit items-center bg-cream rounded-md px-4 py-2.5 mb-4 shadow-lg">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={160}
                  height={44}
                  className="h-8 w-auto object-contain"
                />
              </span>
              <p className="text-cream/80 text-sm max-w-sm mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{b.blurb}</p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-cream/80 group-hover:text-gold-light transition-colors w-fit">
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
