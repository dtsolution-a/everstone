import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | Everstone",
  description:
    "Guides, trends and updates from Everstone — porcelain surfaces, large-format tiles, and our Exclusive and Geogres showroom brands.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Journal"
          title="Insights on"
          highlight="surfaces & design."
          body="Guides, trends and updates from Everstone — including our Exclusive and Geogres showroom brands."
        />

        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            {/* Featured post */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-8 items-center mb-20 pb-16 border-b border-ink/10"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-gold-deep mb-4">
                  {featured.category} · {formatDate(featured.date)}
                </p>
                <h2 className="font-display font-light text-3xl md:text-4xl mb-4 leading-tight group-hover:text-gold-deep transition-colors">
                  {featured.title}
                </h2>
                <p className="text-ink/60 leading-relaxed max-w-lg">
                  {featured.excerpt}
                </p>
              </div>
            </Link>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gold-deep mb-2">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-gold-deep transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ink/55 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
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
