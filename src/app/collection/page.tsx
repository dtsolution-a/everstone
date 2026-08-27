"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { COLLECTION_ITEMS, BRAND_META, FILTERS } from "@/data/collection";

export default function CollectionPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filtered =
    filter === "All"
      ? COLLECTION_ITEMS
      : COLLECTION_ITEMS.filter((i) => i.brand === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.045,
        ease: "power3.out",
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Collection"
          title="A gallery of"
          highlight="finished surfaces."
          body="A curated look at our range across Everstone, Exclusive and Geogres — captured in real spaces. Full specification sheets are available on request."
        />

        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition-colors duration-300 ${
                      filter === f
                        ? "bg-ink text-cream border-ink"
                        : "border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-ink/40">
                {filtered.length} Surfaces
              </p>
            </div>

            <div
              ref={gridRef}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]"
            >
              {filtered.map((item) => {
                const meta = BRAND_META[item.brand];
                return (
                  <div
                    key={item.src}
                    className={`gallery-item group relative mb-4 break-inside-avoid overflow-hidden ${
                      item.tall ? "aspect-[3/4.4]" : "aspect-[3/3.6]"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />

                    {/* Brand badge — always visible, top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1.5">
                      {meta.logo && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shrink-0">
                          <Image
                            src={meta.logo}
                            alt={item.brand}
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 object-contain"
                          />
                        </span>
                      )}
                      <span className="text-[10px] tracking-widest uppercase text-white">
                        {item.brand}
                      </span>
                    </div>

                    {/* Hover overlay — name, finish, size */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <p
                        className="text-[10px] tracking-widest uppercase mb-1"
                        style={{ color: meta.accent }}
                      >
                        {item.finish}
                      </p>
                      <h3 className="text-white text-base font-medium mb-1">
                        {item.name}
                      </h3>
                      <p className="text-white/60 text-xs tracking-wide">
                        {item.size}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <p className="eyebrow mb-4">Want The Full Range?</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-cream mb-8">
              Visit our showroom or request specification sheets.
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold-light text-ink text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-cream transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
