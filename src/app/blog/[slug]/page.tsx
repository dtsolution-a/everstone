import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Everstone Blog`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <div className="relative h-[50vh] min-h-[420px] overflow-hidden">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-[900px] w-full px-6 md:px-10 pb-14">
              <p className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">
                {post.category} · {formatDate(post.date)}
              </p>
              <h1 className="font-display font-light text-3xl md:text-5xl text-cream leading-tight max-w-3xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-[760px] px-6 md:px-10">
            <p className="text-lg text-ink/70 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <p className="text-ink/70 leading-relaxed mb-6">
              At Everstone, every surface we bring to market — whether under
              our own name or through our showroom brands Exclusive and
              Geogres — is chosen for how it performs in real spaces, not
              just how it photographs. This piece is part of our ongoing
              series on specification, finish and material choice for
              residential, commercial and hospitality projects across the
              UAE.
            </p>
            <p className="text-ink/70 leading-relaxed mb-10">
              For product-specific guidance or to request specification
              sheets, reach out to our team directly — we're happy to walk
              through the right option for your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-ink text-cream text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-deep transition-colors duration-300"
            >
              Talk To Our Team
            </Link>
          </div>
        </section>

        <section className="bg-cream-dim py-16">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <p className="eyebrow !text-gold-deep mb-8">More From The Journal</p>
            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-gold-deep transition-colors">
                    {p.title}
                  </h3>
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
