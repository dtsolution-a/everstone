"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * A CSS-transform "3D" card fan — no WebGL involved. Achieves the same
 * fanned, receding-on-scroll tile stack as a real 3D scene would, but
 * runs on pure `transform: perspective()/rotate()/translate()`, so it's
 * immune to the WebGL context-loss issues some GPU/driver combinations
 * hit (multi-GPU laptops, remote sessions, sandboxed browsers, etc.).
 * Every browser that can run CSS can run this.
 *
 * Positions are percentages of the RIG's own box, not the viewport — the
 * rig itself is anchored to the right portion of the screen (see the
 * wrapper below). Sizing cards relative to the full viewport was the bug:
 * on laptop/medium widths the text column eats a bigger share of the
 * screen than on an ultra-wide monitor, so viewport-relative card
 * positions would drift left into the headline. Confining the whole fan
 * to its own right-anchored box keeps it clear of the text at any width.
 */
const CARDS = [
  {
    image: "/col-wooden.jpg",
    className: "left-0 top-[14%] w-[38%]",
    rest: { rotateY: 18, rotateX: 4, z: -40 },
  },
  {
    image: "/col-porcelain.jpg",
    className: "left-[30%] top-[6%] w-[40%] z-10",
    rest: { rotateY: 2, rotateX: 1, z: 20 },
  },
  {
    image: "/col-outdoor.jpg",
    className: "left-[60%] top-[20%] w-[38%]",
    rest: { rotateY: -16, rotateX: -3, z: -30 },
  },
] as const;

export default function TiltCards({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const rigRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !rigRef.current) return;

    const ctx = gsap.context(() => {
      // Establish each card's resting pose through GSAP's own transform
      // property system (not a raw inline `transform` string) — this is
      // what the later gsap.to() scroll/idle tweens below animate on top
      // of. Setting it any other way makes GSAP re-derive rotateX/rotateY
      // from the DOM every tween, which is unreliable across browsers and
      // throws "not eligible for reset" warnings.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, CARDS[i].rest);
      });

      // Scroll-driven: cards separate, tilt further and recede as the
      // hero scrolls past — mirrors the motion the 3D scene used to do.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(card, {
          xPercent: dir * 22,
          yPercent: -18,
          rotateY: `+=${dir * 14}`,
          z: -160,
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Mouse parallax on the whole rig, like a subtle product-shot tilt.
      const quickX = gsap.quickTo(rigRef.current, "rotateY", {
        duration: 0.6,
        ease: "power3.out",
      });
      const quickY = gsap.quickTo(rigRef.current, "rotateX", {
        duration: 0.6,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        quickX(nx * 6);
        quickY(-ny * 4);
      };
      window.addEventListener("mousemove", onMove);

      // Gentle idle float so the fan doesn't feel static.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: "+=10",
          duration: 2.6 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      className="absolute inset-y-0 right-0 w-[62%] sm:w-[58%] lg:w-[52%] hidden md:block"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={rigRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {CARDS.map((c, i) => (
          <div
            key={c.image}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`absolute aspect-[3/4] overflow-hidden rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-cream/10 ${c.className}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={c.image}
              alt=""
              fill
              className="object-cover"
              sizes="34vw"
              priority={i === 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
