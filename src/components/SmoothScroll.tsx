"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGsapSetup } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useGsapSetup();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Lenis measures the scrollable height once at startup. Sections that
    // pin (the Collections carousel) or reflow after custom fonts/images
    // land add height *after* that first measurement, so without a nudge
    // Lenis keeps capping scroll short of the real page bottom — the
    // footer becomes unreachable even though it's genuinely there.
    //
    // Deliberately calling lenis.resize() directly here, NOT
    // ScrollTrigger.refresh(): refresh() recalculates every trigger's
    // start/end at once, and doing that while the hero's scroll-driven 3D
    // scene is live throws it into a corrupted extreme pose for a frame.
    // resize() only re-measures Lenis's own scroll limit, which is all the
    // footer issue actually needed.
    const resize = () => lenis.resize();
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(resize));
    window.addEventListener("load", resize);
    document.fonts?.ready?.then(resize);

    // Let in-page anchor links (#collections etc.) use Lenis' smooth scroll.
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", resize);
      cancelAnimationFrame(raf1);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
