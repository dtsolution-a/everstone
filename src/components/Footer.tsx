"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { contact, nav } from "@/data/site";
import { brands } from "@/data/brands";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="relative bg-ink text-cream overflow-hidden">
      {/* CTA banner */}
      <div className="relative border-b border-cream/10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-20 md:py-28 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="footer-reveal eyebrow mb-5">Start Your Project</p>
            <h2 className="footer-reveal font-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
              Let&rsquo;s build a space that{" "}
              <em className="text-gold-light not-italic">outlasts the trend</em>.
            </h2>
          </div>
          <div className="footer-reveal flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-gold-light text-ink text-xs tracking-[0.2em] uppercase px-8 py-5 hover:bg-cream transition-colors duration-300"
            >
              Enquire Now
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-3 border border-cream/25 text-cream text-xs tracking-[0.2em] uppercase px-8 py-5 hover:border-gold-light hover:text-gold-light transition-colors duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 py-16 border-b border-cream/10">
          <div className="footer-reveal lg:col-span-5">
            <Image
              src="/logo.png"
              alt="Everstone"
              width={168}
              height={168}
              className="h-36 w-36 object-contain brightness-0 invert mb-6"
            />
            <p className="text-cream/60 leading-relaxed max-w-sm mb-8">
              Premier porcelain tile brand dedicated to the curation of
              sophisticated surface solutions — manufactured in India,
              delivered across the UAE.
            </p>
            <div className="flex gap-3">
              <SocialLink href={contact.instagram} label="Instagram">
                <IgIcon />
              </SocialLink>
              <SocialLink href={contact.facebook} label="Facebook">
                <FbIcon />
              </SocialLink>
              <SocialLink href={contact.whatsapp} label="WhatsApp">
                <WaIcon />
              </SocialLink>
            </div>
          </div>

          <div className="footer-reveal lg:col-span-3">
            <p className="eyebrow mb-6">Navigate</p>
            <ul className="space-y-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-cream/70 hover:text-gold-light transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-4" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-10 mb-6">Showroom Brands</p>
            <div className="flex flex-wrap items-center gap-3">
              {[brands.exclusive, brands.geogres].map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.slug}`}
                  aria-label={b.name}
                  className="inline-flex items-center bg-cream rounded-md px-3.5 py-2.5 hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={110}
                    height={30}
                    className="h-5 w-auto object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-reveal lg:col-span-4">
            <p className="eyebrow mb-6">Get In Touch</p>
            <ul className="space-y-4 text-cream/70">
              <li>
                <a
                  href={contact.phoneHref}
                  className="hover:text-gold-light transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-gold-light transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="max-w-xs">Everstone, {contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="footer-reveal py-6 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-cream/40 border-b border-cream/10">
          <Link href="/privacy-policy" className="hover:text-gold-light transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gold-light transition-colors">
            Terms of Service
          </Link>
          <Link href="/sitemap-page" className="hover:text-gold-light transition-colors">
            Sitemap
          </Link>
          <Link href="/blog" className="hover:text-gold-light transition-colors">
            Blog
          </Link>
        </div>

        <div className="footer-reveal py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>
            © {new Date().getFullYear()} Everstone Building Materials LLC.
            All rights reserved.
          </p>
          <p>Crafted with care in Abu Dhabi.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold-light hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </a>
  );
}

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 9h3V5.5h-3c-2 0-3.5 1.5-3.5 3.5v2H8v3.5h2.5V21H14v-6.5h2.7l.5-3.5H14V9c0-.5.2-1 1-1Z" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.004 3C9.02 3 3.354 8.665 3.354 15.65c0 2.25.59 4.396 1.71 6.29L3 29l7.24-1.987a12.58 12.58 0 0 0 5.764 1.418h.005c6.984 0 12.65-5.665 12.65-12.65C28.658 8.665 22.988 3 16.004 3Zm0 22.94a10.24 10.24 0 0 1-5.221-1.43l-.374-.222-4.297 1.178 1.148-4.19-.244-.43a10.24 10.24 0 0 1-1.564-5.396c0-5.666 4.611-10.276 10.277-10.276 5.666 0 10.276 4.61 10.276 10.276S21.67 25.94 16.004 25.94Z" />
      <path d="M21.62 18.318c-.307-.154-1.814-.895-2.096-.998-.281-.102-.486-.153-.69.153-.204.307-.792.997-.97 1.203-.179.205-.358.23-.665.077-.307-.154-1.295-.478-2.467-1.522-.912-.813-1.528-1.817-1.706-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.103-.205.052-.384-.025-.538-.077-.153-.69-1.665-.946-2.281-.249-.598-.502-.517-.69-.527-.179-.008-.383-.01-.588-.01-.204 0-.537.077-.818.384-.281.307-1.073 1.049-1.073 2.56 0 1.51 1.099 2.968 1.252 3.173.153.204 2.164 3.306 5.244 4.635.732.316 1.303.505 1.749.646.735.234 1.404.201 1.933.122.59-.088 1.814-.742 2.07-1.459.256-.716.256-1.33.179-1.459-.077-.128-.282-.204-.59-.358Z" />
    </svg>
  );
}
