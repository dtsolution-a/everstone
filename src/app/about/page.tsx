import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "About Us | Everstone",
  description:
    "15+ years of precision porcelain craftsmanship — Everstone Building Materials LLC, home to Exclusive and Geogres, our prime showroom brands.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Story"
          title="15+ years of"
          highlight="precision craftsmanship."
          body="Everstone Building Materials LLC has grown into a premier porcelain tile brand — dedicated to the curation of sophisticated surface solutions for the region's most demanding projects."
        />

        {/* Story */}
        <section className="bg-cream text-ink py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden">
              <Image
                src="/factory.jpg"
                alt="Everstone facility"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
            <div className="lg:col-span-6">
              <p className="eyebrow !text-gold-deep mb-6">Who We Are</p>
              <h2 className="font-display font-light text-3xl md:text-4xl mb-6 leading-tight">
                From raw material to finished slab —{" "}
                <em className="text-gold-deep not-italic">full control</em>.
              </h2>
              <p className="text-ink/70 leading-relaxed mb-5 max-w-xl">
                Our manufacturing facilities in India give us direct control
                over quality at every stage, while dedicated warehousing
                across the UAE keeps dealers, contractors and developers
                stocked without compromise.
              </p>
              <p className="text-ink/70 leading-relaxed mb-5 max-w-xl">
                Everstone operates as a showroom for two prime surface
                brands, bringing curated, large-format porcelain
                collections to homes, hospitality and commercial projects
                across the region.
              </p>
              <div className="flex flex-wrap items-center gap-8 mb-2">
                <Image
                  src={brands.exclusive.logo}
                  alt={brands.exclusive.name}
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                <Image
                  src={brands.geogres.logo}
                  alt={brands.geogres.name}
                  width={140}
                  height={40}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/exclusive"
                  className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm tracking-widest uppercase hover:border-gold-deep hover:text-gold-deep transition-colors"
                >
                  Explore Exclusive
                </Link>
                <Link
                  href="/geogres"
                  className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm tracking-widest uppercase hover:border-gold-deep hover:text-gold-deep transition-colors"
                >
                  Explore Geogres
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cream-dim text-ink py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <p className="eyebrow !text-gold-deep mb-4">What Drives Us</p>
            <h2 className="font-display font-light text-3xl md:text-4xl max-w-xl mb-14">
              Built for specification-grade projects.
            </h2>
            <div className="grid sm:grid-cols-3 gap-px bg-ink/10">
              {[
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
              ].map((p) => (
                <div key={p.title} className="bg-cream-dim p-8">
                  <h3 className="font-display text-xl mb-3">{p.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    {p.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <p className="eyebrow mb-4">Our Showroom Brands</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-cream max-w-xl mb-14">
              Prime brands, one address.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[brands.exclusive, brands.geogres].map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.slug}`}
                  className="group relative overflow-hidden aspect-[16/10]"
                >
                  <Image
                    src={b.heroImage}
                    alt={b.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-7">
                    <Image
                      src={b.logo}
                      alt={b.name}
                      width={140}
                      height={40}
                      className="h-8 w-auto object-contain mb-3 brightness-0 invert"
                    />
                    <p className="text-cream/60 text-sm max-w-xs">
                      {b.blurb}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
