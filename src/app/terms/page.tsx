import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LegalAccordion from "@/components/LegalAccordion";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service | Everstone",
  description: "Terms governing the use of the Everstone Building Materials LLC website and services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using the Everstone website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
  },
  {
    title: "2. Use of Website",
    content:
      "You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of its availability or accessibility.",
  },
  {
    title: "3. Product Information",
    content:
      "All product descriptions, images and specifications on our website — including our Exclusive and Geogres showroom collections — are for informational purposes only. Actual products may vary. We reserve the right to modify product offerings without notice. Prices and availability are subject to change.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content on this website, including text, graphics, logos and images, is the property of Everstone Building Materials LLC (or its respective brand partners) and is protected by UAE and international copyright laws. You may not reproduce, distribute or create derivative works without written permission.",
  },
  {
    title: "5. Enquiry Terms",
    content:
      "Enquiries submitted through our website are subject to review by our team. Submission of an enquiry does not guarantee product availability or pricing. Everstone reserves the right to respond at its discretion.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "Everstone shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of, or inability to use, our website or services.",
  },
  {
    title: "7. Privacy",
    content:
      "Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of the UAE.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Continued use of the website after changes constitutes acceptance of the new terms.",
  },
  {
    title: "10. Contact",
    content: `For questions about these Terms of Service, contact us at ${contact.email} or via WhatsApp at ${contact.phone}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Legal" title="Terms of" highlight="Service." body="Last updated: August 2026 · Everstone Building Materials LLC" />
        <section className="bg-cream text-ink py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <div className="border border-ink/10 p-8 mb-8">
              <p className="text-ink/70 leading-relaxed">
                Please read these Terms of Service carefully before using the
                Everstone website. These terms govern your use of our website
                and services.
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
