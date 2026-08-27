"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGsapSetup } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
    // Also matches cross-page anchors (e.g. a footer link on /about
    // pointing to "/#faq") once Next.js has already routed to "/" —
    // by then the browser sees the link's href resolved against the
    // current page, so a same-page "#faq" and a cross-page "/#faq"
    // both end up matching here after the navigation completes.
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

  // Cross-page anchor links (footer "/#faq" clicked from e.g. /about)
  // land here as a full page load of "/#faq" (that Footer list uses plain
  // <a> tags, not <Link>, so it's a real navigation, not a client-side
  // route change). At that point ScrollTrigger-pinned sections above the
  // target (the Collections carousel in particular) haven't registered
  // their extra scroll distance yet, so resizing/scrolling Lenis too
  // early lands short of the real section — same symptom as the
  // page-bottom issue the initial resize() already works around above.
  // Retry on a short interval until the target section stops moving
  // (layout has settled), then do the final scroll.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;

    let lastTop = -Infinity;
    let stableCount = 0;
    const id = window.setInterval(() => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      lenis.resize();
      const top = el.getBoundingClientRect().top;
      if (Math.abs(top - lastTop) < 1) {
        stableCount += 1;
      } else {
        stableCount = 0;
      }
      lastTop = top;
      lenis.scrollTo(el, { offset: -80, immediate: true });
      if (stableCount >= 2) window.clearInterval(id);
    }, 150);

    // Hard stop after 3s so this never lingers indefinitely.
    const timeout = window.setTimeout(() => window.clearInterval(id), 3000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return <>{children}</>;
}
