"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { contact, nav } from "@/data/site";

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
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center gap-3 bg-gold-light text-ink text-xs tracking-[0.2em] uppercase px-8 py-5 hover:bg-cream transition-colors duration-300"
            >
              Enquire Now
            </a>
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
              <li className="max-w-xs">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="footer-reveal py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>
            © {new Date().getFullYear()} Everstone Building Materials LLC.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p>Crafted with care in Abu Dhabi.</p>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex items-center gap-2 border border-cream/20 rounded-full pl-4 pr-1.5 py-1.5 hover:border-gold-light hover:text-gold-light transition-colors"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Oversized ghost wordmark for scale/brand presence */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-outline font-display font-light leading-none text-center pb-2"
        style={{ fontSize: "clamp(3.5rem, 16vw, 13rem)", opacity: 0.06 }}
      >
        EVERSTONE
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
