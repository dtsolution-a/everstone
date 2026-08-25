"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data/site";

/**
 * Bottom-right floating action stack: a "back to top" button that only
 * shows once you've scrolled away from the top (no point offering it at
 * the top), and a WhatsApp button that hides once the footer scrolls
 * into view — the footer already carries WhatsApp/contact info, so a
 * floating duplicate over it is redundant clutter rather than a shortcut.
 */
export default function FloatingActions() {
  const [pastTop, setPastTop] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href="#top"
        aria-label="Scroll to top"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-gold-light/40 bg-ink text-gold-light shadow-lg transition-all duration-300 hover:bg-gold-light hover:text-ink ${
          pastTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <TopIcon />
      </a>

      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 ${
          nearFooter ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function TopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.48 1.34 4.995L2 22l5.117-1.342a9.96 9.96 0 0 0 4.887 1.246h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.928-7.069a9.935 9.935 0 0 0-7.073-2.835Zm5.845 15.842c-.712.712-1.664 1.211-2.71 1.412a9.28 9.28 0 0 1-1.808.163 8.26 8.26 0 0 1-4.147-1.116l-.297-.176-3.037.797.812-2.96-.194-.304a8.246 8.246 0 0 1-1.264-4.418c0-4.577 3.723-8.3 8.302-8.3a8.24 8.24 0 0 1 5.87 2.432 8.24 8.24 0 0 1 2.428 5.872c0 2.218-.862 4.303-2.427 5.87l.072.058-.6.67Z" />
    </svg>
  );
}
