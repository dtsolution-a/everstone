import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Sitemap | Everstone",
  description: "A complete overview of all pages and sections on the Everstone website.",
};

const siteMap = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Collection", href: "/collection" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    category: "Showroom Brands",
    links: [
      { label: "Exclusive", href: "/exclusive" },
      { label: "Geogres", href: "/geogres" },
    ],
  },
  {
    category: "Homepage Sections",
    links: [
      { label: "Collections", href: "/#collections" },
      { label: "Applications", href: "/#applications" },
      { label: "About", href: "/#about" },
      { label: "Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    category: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    category: "Contact",
    links: [
      { label: "WhatsApp Us", href: contact.whatsapp },
      { label: `Email: ${contact.email}`, href: `mailto:${contact.email}` },
      { label: `Call: ${contact.phone}`, href: contact.phoneHref },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Sitemap", href: "/sitemap-page" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Navigate"
          title="Site"
          highlight="Map."
          body="A complete overview of all pages and sections on the Everstone website."
        />
        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteMap.map((cat) => (
              <div key={cat.category} className="border border-ink/10 overflow-hidden">
                <div className="px-6 py-4 bg-ink">
                  <h3 className="text-cream text-sm tracking-wide font-medium">
                    {cat.category}
                  </h3>
                </div>
                <ul className="p-4 space-y-1">
                  {cat.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 px-3 py-2.5 text-ink/60 hover:text-gold-deep hover:bg-gold-deep/5 transition-colors text-sm group"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-deep/40 group-hover:bg-gold-deep transition-colors shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
