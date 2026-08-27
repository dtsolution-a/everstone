import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us | Everstone",
  description:
    "Get in touch with Everstone Building Materials LLC — enquiries, showroom visits and specification support across the UAE.",
};

const CARDS = [
  {
    title: "Call Us",
    lines: [contact.phone],
    href: contact.phoneHref,
    action: "Call Now",
  },
  {
    title: "Email Us",
    lines: [contact.email],
    href: `mailto:${contact.email}`,
    action: "Send Email",
  },
  {
    title: "WhatsApp",
    lines: ["Chat with our team"],
    href: contact.whatsapp,
    action: "Start Chat",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Reach Out"
          title="Let's talk about"
          highlight="your project."
          body="Ready to specify Everstone, Exclusive or Geogres surfaces for your next project? Our team is here to help with enquiries, showroom visits and bulk orders."
        />

        <section className="bg-cream text-ink py-20 md:py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid md:grid-cols-3 gap-6 mb-20">
            {CARDS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group border border-ink/10 p-8 hover:border-gold-deep transition-colors duration-300"
              >
                <h3 className="font-display text-2xl mb-3">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-ink/60 mb-4">
                    {l}
                  </p>
                ))}
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-deep">
                  {c.action}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <p className="eyebrow !text-gold-deep mb-6">Visit Our Showroom</p>
              <h2 className="font-display font-light text-3xl md:text-4xl mb-6 leading-tight">
                Everstone Showroom
              </h2>
              <p className="text-ink/70 leading-relaxed mb-6 max-w-sm">
                {contact.address}
              </p>
              <ul className="space-y-3 text-ink/70">
                <li>
                  <a href={contact.phoneHref} className="hover:text-gold-deep transition-colors">
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-gold-deep transition-colors">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
