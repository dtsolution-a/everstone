"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// A native-GSAP recreation of the "words preloader" concept (cycling
// brand words before the page reveals) — same idea as Skiper UI's
// framer-motion component, rebuilt here so it stays on the one animation
// library the rest of the site already uses.
const WORDS = ["Precision", "Craftsmanship", "Legacy", "Everstone"];

export default function Preloader() {
  const [hide, setHide] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Only show once per browser session — a repeat visitor shouldn't
    // sit through it again on every reload while testing/browsing.
    if (typeof window !== "undefined" && sessionStorage.getItem("everstone-intro-seen")) {
      setHide(true);
      return;
    }

    document.body.style.overflow = "hidden";
    gsap.set(wordRefs.current, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        sessionStorage.setItem("everstone-intro-seen", "1");
        setHide(true);
      },
    });

    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
      if (i < WORDS.length - 1) {
        tl.to(
          el,
          { yPercent: -100, opacity: 0, duration: 0.45, ease: "power3.in" },
          "+=0.35"
        );
      }
    });

    tl.to(wrapRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      delay: 0.3,
    });

    // Safety net: a backgrounded tab, a slow device, or any animation
    // hiccup should never be able to trap someone behind this overlay
    // indefinitely. Force it away after a generous ceiling regardless.
    const failsafe = window.setTimeout(() => {
      document.body.style.overflow = "";
      sessionStorage.setItem("everstone-intro-seen", "1");
      setHide(true);
    }, 6000);

    return () => {
      tl.kill();
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  if (hide) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
    >
      <div className="relative h-[1.3em] overflow-hidden px-6">
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`absolute inset-0 flex items-center justify-center font-display font-light text-4xl md:text-6xl whitespace-nowrap ${
              i === WORDS.length - 1 ? "italic text-gold-light" : "text-cream"
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
