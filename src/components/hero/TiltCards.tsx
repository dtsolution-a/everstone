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
 */
const CARDS = [
  {
    image: "/col-wooden.jpg",
    className: "left-[6%] top-[14%] w-[34%] sm:w-[30%]",
    restTransform: "rotateY(18deg) rotateX(4deg) translateZ(-40px)",
  },
  {
    image: "/col-porcelain.jpg",
    className: "left-[30%] top-[6%] w-[36%] sm:w-[32%] z-10",
    restTransform: "rotateY(2deg) rotateX(1deg) translateZ(20px)",
  },
  {
    image: "/col-outdoor.jpg",
    className: "left-[56%] top-[20%] w-[34%] sm:w-[30%]",
    restTransform: "rotateY(-16deg) rotateX(-3deg) translateZ(-30px)",
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
      className="absolute inset-0 hidden sm:block"
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
            style={{
              transform: c.restTransform,
              transformStyle: "preserve-3d",
            }}
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
