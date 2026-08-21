"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Full-screen intro: two panels covering the viewport peel apart
 * (top slides up, bottom slides down) to reveal the hero video already
 * sitting behind them. The Everstone mark sits centered on the seam,
 * snapping its letter-spacing tight before the peel, then fading as it
 * pulls apart — the same "horizon peel" mechanic as the reference
 * animation this was adapted from, rebuilt from scratch in our own
 * component with our own branding instead of copying its markup/CSS.
 *
 * On completion (or after a 6s failsafe, in case a backgrounded/throttled
 * tab or slow device keeps the timeline from ever naturally finishing) it
 * dispatches "everstone:revealed" on `window` so the Hero's own content
 * timeline knows when to start.
 */
export default function PeelReveal() {
  const [hide, setHide] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("everstone-intro-seen")) {
      setHide(true);
      window.dispatchEvent(new CustomEvent("everstone:revealed"));
      return;
    }

    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("everstone-intro-seen", "1");
      setHide(true);
      window.dispatchEvent(new CustomEvent("everstone:revealed"));
    };

    gsap.set(markRef.current, { opacity: 0, letterSpacing: "0.35em" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

    tl.to(markRef.current, { opacity: 1, duration: 0.6, delay: 0.2 })
      .to(markRef.current, { letterSpacing: "0.08em", duration: 0.7, ease: "power3.inOut" }, "+=0.25")
      .to(topRef.current, { yPercent: -100, duration: 1.2, ease: "power3.inOut" }, "+=0.2")
      .to(bottomRef.current, { yPercent: 100, duration: 1.2, ease: "power3.inOut" }, "<")
      .to(markRef.current, { opacity: 0, scale: 0.96, duration: 0.5, ease: "power2.in" }, "<0.1");

    const failsafe = window.setTimeout(finish, 6000);

    return () => {
      tl.kill();
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div
        ref={markRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
      >
        <Image
          src="/logo.png"
          alt=""
          width={56}
          height={56}
          className="h-12 w-12 object-contain brightness-0 invert"
        />
        <p className="font-display font-light text-2xl md:text-3xl text-cream uppercase whitespace-nowrap">
          Everstone
        </p>
      </div>
    </div>
  );
}
