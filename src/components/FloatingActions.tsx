"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data/site";

/**
 * Bottom-right floating action stack: a "scroll to top" button that only
 * shows once you've scrolled away from the top, and a WhatsApp button
 * that hides once the footer scrolls into view — the footer already
 * carries WhatsApp/contact info, so a floating duplicate over it would
 * be redundant.
 *
 * Visibility is driven by plain scroll-position math (footer's distance
 * from the viewport) rather than IntersectionObserver — the observer
 * version never reliably fired in production, so this sticks to the
 * same scroll-listener approach already proven to work for "past top".
 */
export default function FloatingActions() {
  const [pastTop, setPastTop] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastTop(window.scrollY > 400);

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setNearFooter(footerTop < window.innerHeight * 0.85);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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

// A simplified, cleanly-recognizable "chat bubble + handset" glyph — the
// standard functional pictogram used across business sites to link out
// to WhatsApp, redrawn as a plain shape rather than a fussy hand-traced
// path (which was rendering as a slightly warped blob at small sizes).
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.004 3C9.02 3 3.354 8.665 3.354 15.65c0 2.25.59 4.396 1.71 6.29L3 29l7.24-1.987a12.58 12.58 0 0 0 5.764 1.418h.005c6.984 0 12.65-5.665 12.65-12.65C28.658 8.665 22.988 3 16.004 3Zm0 22.94a10.24 10.24 0 0 1-5.221-1.43l-.374-.222-4.297 1.178 1.148-4.19-.244-.43a10.24 10.24 0 0 1-1.564-5.396c0-5.666 4.611-10.276 10.277-10.276 5.666 0 10.276 4.61 10.276 10.276S21.67 25.94 16.004 25.94Z" />
      <path d="M21.62 18.318c-.307-.154-1.814-.895-2.096-.998-.281-.102-.486-.153-.69.153-.204.307-.792.997-.97 1.203-.179.205-.358.23-.665.077-.307-.154-1.295-.478-2.467-1.522-.912-.813-1.528-1.817-1.706-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.103-.205.052-.384-.025-.538-.077-.153-.69-1.665-.946-2.281-.249-.598-.502-.517-.69-.527-.179-.008-.383-.01-.588-.01-.204 0-.537.077-.818.384-.281.307-1.073 1.049-1.073 2.56 0 1.51 1.099 2.968 1.252 3.173.153.204 2.164 3.306 5.244 4.635.732.316 1.303.505 1.749.646.735.234 1.404.201 1.933.122.59-.088 1.814-.742 2.07-1.459.256-.716.256-1.33.179-1.459-.077-.128-.282-.204-.59-.358Z" />
    </svg>
  );
}
