import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LegalAccordion from "@/components/LegalAccordion";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Everstone",
  description: "How Everstone Building Materials LLC collects, uses and protects your information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly to us, including name, email address, phone number, and project details when you contact us, fill out a form, or request specification sheets. We may also collect usage data automatically when you visit our website.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to respond to your inquiries, process specification and showroom-visit requests, share product updates (with your consent), improve our website, and comply with legal obligations.",
  },
  {
    title: "3. Information Sharing",
    content:
      "We do not sell, trade or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and business, subject to confidentiality agreements.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure or destruction. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    title: "5. Cookies",
    content:
      "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some functionality of the website.",
  },
  {
    title: "6. Third-Party Links",
    content:
      "Our website may contain links to third-party websites, including our showroom brands Exclusive and Geogres. We are not responsible for the privacy practices of these websites and encourage you to review their privacy policies.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.",
  },
  {
    title: "8. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at ${contact.email} or via WhatsApp at ${contact.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Legal" title="Privacy" highlight="Policy." body="Last updated: August 2026 · Everstone Building Materials LLC" />
        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <div className="border border-ink/10 p-8 mb-8">
              <p className="text-ink/70 leading-relaxed">
                Everstone Building Materials LLC (&ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use and safeguard your information when you visit
                our website or interact with our business.
              </p>
            </div>
            <LegalAccordion sections={sections} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
