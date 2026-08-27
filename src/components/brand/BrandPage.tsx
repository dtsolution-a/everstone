"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { BrandConfig } from "@/data/brands";

const OTHER_BRAND = {
  exclusive: { slug: "geogres", name: "Geogres" },
  geogres: { slug: "exclusive", name: "Exclusive" },
} as const;

export default function BrandPage({ brand }: { brand: BrandConfig }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const other = OTHER_BRAND[brand.slug];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".brand-reveal").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".brand-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [brand.slug]);

  return (
    <div ref={rootRef} className="bg-cream text-ink">
      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between bg-cream/90 backdrop-blur-md border-b border-ink/10">
        <Link href={`/${brand.slug}`} className="flex items-center">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-ink/50">
          {["Collections", "Surfaces", "Inspiration"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-ink transition-colors duration-300"
            >
              {l}
            </a>
          ))}
          <Link
            href={`/${other.slug}`}
            className="hover:text-ink transition-colors duration-300"
          >
            {other.name}
          </Link>
          <Link href="/contact" className="hover:text-ink transition-colors duration-300">
            Contact
          </Link>
        </div>

        <Link
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-ink/50 hover:text-ink transition-colors border border-ink/20 rounded-full px-4 py-1.5"
        >
          ← Back to Everstone
        </Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={brand.heroImage}
            alt={`${brand.name} hero`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/45 to-transparent" />
        </div>

        <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-10 flex items-center pt-20">
          <div className="max-w-lg">
            <p className="brand-reveal text-xs tracking-[0.35em] uppercase text-ink/40 mb-6">
              — {brand.eyebrow}
            </p>
            <h1 className="brand-reveal font-display font-light text-6xl md:text-[80px] leading-[0.9] text-ink mb-3">
              {brand.heroTitleTop}
            </h1>
            <h1
              className="brand-reveal font-display font-light text-6xl md:text-[80px] leading-[0.9] italic mb-8"
              style={{ color: brand.accent }}
            >
              {brand.heroTitleBottom}
            </h1>
            <p className="brand-reveal text-sm text-ink/60 leading-relaxed max-w-xs mb-10">
              {brand.heroBody}
            </p>
            <a
              href="#collections"
              className="brand-reveal inline-flex items-center gap-3 px-7 py-3.5 text-white text-sm tracking-wider uppercase transition-colors"
              style={{ backgroundColor: brand.accent }}
            >
              Explore Collection
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-ink/25 animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase text-ink/35">Scroll</span>
        </div>
      </section>

      {/* ── COLLECTIONS ─────────────────────────────────────────────── */}
      <section id="collections" className="py-24 md:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="brand-reveal mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-ink/40 mb-3">
              — {brand.collectionsEyebrow}
            </p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-ink">
              {brand.collectionsTitle}{" "}
              <em className="not-italic" style={{ color: brand.accent }}>
                {brand.collectionsHighlight}
              </em>
            </h2>
          </div>

          <div className="brand-stagger grid grid-cols-1 md:grid-cols-3 gap-4">
            {brand.collections.map((col, i) => (
              <div
                key={col.number}
                className={`group relative overflow-hidden ${i === 1 ? "md:mt-8" : ""}`}
                style={{ height: i === 1 ? 460 : 400 }}
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-4xl font-display font-light text-white/40 mb-1">
                    {col.number}
                  </p>
                  <h3 className="text-xl font-semibold text-white uppercase tracking-wider mb-1">
                    {col.title}
                  </h3>
                  <p className="text-sm text-white/70 mb-2">{col.subtitle}</p>
                  <p className="text-[11px] tracking-widest uppercase text-white/50">
                    {col.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SURFACES ───────────────────────────────────────── */}
      <section id="surfaces" className="py-24 md:py-28 bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="brand-reveal grid lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
                — {brand.surfacesEyebrow}
              </p>
              <h2 className="font-display font-light text-4xl md:text-5xl text-ink leading-tight">
                {brand.surfacesTitleTop}
                <br />
                in every{" "}
                <em className="not-italic" style={{ color: brand.accent }}>
                  {brand.surfacesHighlight}
                </em>
              </h2>
            </div>
            <div className="flex lg:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase border border-ink/30 px-6 py-3 hover:bg-ink hover:text-cream hover:border-ink transition-all duration-300"
              >
                View All Products
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="brand-stagger grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {brand.surfaces.slice(0, 3).map((s) => (
              <div key={s.name} className="group relative overflow-hidden" style={{ height: 280 }}>
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">{s.type}</p>
                  <h4 className="text-lg font-semibold text-white mb-1">{s.name}</h4>
                  <p className="text-xs text-white/50">{s.size}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="brand-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.surfaces.slice(3).map((s) => (
              <div key={s.name} className="group relative overflow-hidden" style={{ height: 260 }}>
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">{s.type}</p>
                  <h4 className="text-lg font-semibold text-white mb-1">{s.name}</h4>
                  <p className="text-xs text-white/50">{s.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSPIRATION / SIZE GALLERY ──────────────────────────────── */}
      <section id="inspiration" className="py-24 md:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="brand-reveal text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
              — {brand.galleryEyebrow}
            </p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-ink">
              {brand.galleryTitle}{" "}
              <em className="not-italic" style={{ color: brand.accent }}>
                {brand.galleryHighlight}
              </em>
            </h2>
          </div>

          <div className="brand-stagger grid grid-cols-2 md:grid-cols-4 gap-3">
            {brand.gallery.map((f, i) => (
              <div
                key={f.label + i}
                className="group relative overflow-hidden"
                style={{ height: i % 2 === 0 ? 360 : 300 }}
              >
                <Image
                  src={f.image}
                  alt={f.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs tracking-widest uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    {f.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY BANNER ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-32 overflow-hidden" style={{ backgroundColor: brand.accent }}>
        <div className="absolute inset-0">
          <Image src={brand.philosophyImage} alt="Philosophy" fill className="object-cover opacity-20" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="brand-reveal max-w-2xl">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6">
              — {brand.philosophyEyebrow}
            </p>
            <h2 className="font-display font-light text-4xl md:text-[56px] leading-tight text-white mb-8">
              {brand.philosophyTitle}
            </h2>
            <p className="text-base text-white/75 leading-relaxed mb-10 max-w-sm">
              {brand.philosophyBody}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-white/50 text-white text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/15 transition-all duration-300"
            >
              Discover Our Story
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-28 bg-white text-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="brand-reveal">
            <p className="text-xs tracking-[0.35em] uppercase text-ink/40 mb-6">
              — {brand.ctaEyebrow}
            </p>
            <h2 className="font-display font-light text-5xl md:text-[64px] leading-tight text-ink mb-10">
              {brand.ctaTitleTop}
              <br />
              With{" "}
              <em className="not-italic" style={{ color: brand.accent }}>
                {brand.ctaHighlight}
              </em>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-white text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300"
              style={{ backgroundColor: brand.accent }}
            >
              Enquire Now
              <ArrowIcon />
            </Link>
          </div>

          <div className="brand-stagger grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-ink/10">
            {brand.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <span className="text-2xl" style={{ color: brand.accent }}>
                  {s.icon}
                </span>
                <p className="text-sm font-semibold text-ink">{s.label}</p>
                <p className="text-xs text-ink/45">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-BRAND STRIP ────────────────────────────────────────── */}
      <section className="bg-ink py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="eyebrow mb-3">Also At Everstone</p>
            <h3 className="font-display font-light text-2xl md:text-3xl text-cream">
              Explore our {other.name} showroom line.
            </h3>
          </div>
          <Link
            href={`/${other.slug}`}
            className="inline-flex items-center gap-3 border border-gold-light/50 text-gold-light text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-gold-light hover:text-ink transition-colors duration-300 shrink-0"
          >
            View {other.name}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
