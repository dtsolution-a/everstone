"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * "Telescope zoom" scroll effect — a stack of progressively smaller,
 * circularly-masked images nested inside each other, scattered thumbnails
 * flying outward in 3D as you scroll, and a heading that splits apart.
 * Adapted from an Awwwards reference's general technique (a CSS custom
 * property driven by ScrollTrigger's progress, animating scale/blur/3D
 * z-translate) — rebuilt from scratch with our own images and a native
 * CSS radial-gradient mask instead of their painterly mask asset.
 */
const FRONT_STACK = [
  { src: "/new/2056.jpg", scale: 1 },
  { src: "/factory.jpg", scale: 0.8 },
  { src: "/app-hospitality.jpg", scale: 0.6 },
  { src: "/col-porcelain.jpg", scale: 0.42 },
  { src: "/new/2136.jpg", scale: 0.28 },
] as const;

const SCATTERED = [
  { src: "/col-glazed.jpg", style: { top: "12%", left: "6%", width: "9vw" } },
  { src: "/col-outdoor.jpg", style: { top: "8%", right: "10%", width: "8vw" } },
  { src: "/app-commercial.jpg", style: { top: "20%", right: "22%", width: "7vw" } },
  { src: "/col-wooden.jpg", style: { bottom: "10%", left: "10%", width: "8vw" } },
  { src: "/new/2185.jpg", style: { bottom: "6%", left: "30%", width: "9vw" } },
  { src: "/app-residential.jpg", style: { bottom: "14%", right: "8%", width: "8vw" } },
] as const;

export default function TelescopeZoom() {
  const outerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const scatteredRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(scatteredRefs.current, {
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const eased = gsap.parseEase("power1.inOut")(self.progress);
            stageRef.current?.style.setProperty("--progress", String(eased));
          },
        },
      });

      tl.to(scatteredRefs.current, {
        z: "100vh",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: { amount: 0.2, from: "center" },
      }, 0)
        .to(".telescope-front", { scale: 1, duration: 1, ease: "power1.inOut" }, 0.6)
        .to(
          ".telescope-front",
          {
            filter: "blur(0px)",
            duration: 1,
            ease: "power1.inOut",
            stagger: { amount: 0.2, from: "end" },
          },
          0.6
        );
    }, outerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={outerRef} className="relative h-[250vh] w-full bg-ink">
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ "--progress": 0 } as React.CSSProperties}
      >
        <div
          ref={mediaRef}
          className="absolute inset-0"
          style={{ transform: "scale(var(--progress))" }}
        >
          {FRONT_STACK.map((f) => (
            <div
              key={f.src}
              className="telescope-front absolute inset-0"
              style={{ transform: `scale(${f.scale})`, filter: "blur(2px)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    "radial-gradient(circle, black 68%, transparent 72%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, black 68%, transparent 72%)",
                }}
              >
                <Image src={f.src} alt="" fill className="object-cover" sizes="100vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0" style={{ perspective: "100vh" }}>
          {SCATTERED.map((s, i) => (
            <div
              key={s.src}
              ref={(el) => {
                scatteredRefs.current[i] = el;
              }}
              className="absolute aspect-[3/4] overflow-hidden rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
              style={s.style}
            >
              <Image src={s.src} alt="" fill className="object-cover" sizes="10vw" />
            </div>
          ))}
        </div>

        <h2 className="relative z-10 font-display font-light text-cream flex flex-col items-center pointer-events-none select-none">
          <span
            className="block text-[9vw] sm:text-[6vw] leading-none"
            style={{
              transform:
                "translate3d(calc(var(--progress) * (-66vw + 100%) - 0.5vw), 0, 0)",
            }}
          >
            One Material.
          </span>
          <span
            className="block text-[9vw] sm:text-[6vw] leading-none italic text-gold-light mt-2"
            style={{
              transform: "translate3d(calc(var(--progress) * (66vw - 100%)), 0, 0)",
            }}
          >
            Endless Spaces.
          </span>
        </h2>
      </div>
    </section>
  );
}
