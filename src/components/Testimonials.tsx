"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const REVIEWS = [
  {
    name: "Ar. Rohan Mehta",
    role: "Principal Architect, Studio Mehta",
    quote:
      "Everstone's large-format porcelain gave us the seamless, monolithic look our client wanted — without compromising on lead times.",
  },
  {
    name: "Faisal Al Marri",
    role: "Project Director, Al Marri Contracting",
    quote:
      "Consistent batch quality and a warehouse that actually has stock when you need it. That's rare in this market.",
  },
  {
    name: "Priya Nair",
    role: "Interior Designer, Nair & Co.",
    quote:
      "The wooden-finish collection is indistinguishable from real timber in photographs — clients are consistently surprised.",
  },
  {
    name: "Omar Haddad",
    role: "Development Manager, Haddad Properties",
    quote:
      "We've specified Everstone across three residential towers now. Zero batch-to-batch shade variance complaints.",
  },
  {
    name: "Sana Iqbal",
    role: "Design Lead, Iqbal Interiors",
    quote:
      "Their outdoor anti-slip range solved a poolside safety brief that three other suppliers couldn't.",
  },
  {
    name: "Karan Sethi",
    role: "Site Engineer, Sethi Build",
    quote:
      "Straightforward specification documents, fast dealer support, and tiles that arrive exactly as sampled.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testi-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Two independent infinite marquees, opposite directions, each
      // built from a doubled card list so the loop point is invisible.
      const marquee = (el: HTMLDivElement | null, reverse: boolean, duration: number) => {
        if (!el) return;
        const distance = el.scrollWidth / 2;
        gsap.fromTo(
          el,
          { x: reverse ? -distance : 0 },
          {
            x: reverse ? 0 : -distance,
            duration,
            ease: "none",
            repeat: -1,
          }
        );
      };

      marquee(row1Ref.current, false, 42);
      marquee(row2Ref.current, true, 50);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const first = REVIEWS.slice(0, 3);
  const second = REVIEWS.slice(3);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-cream-dim text-ink py-28 md:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-16">
        <p className="testi-reveal eyebrow !text-gold-deep mb-4">
          Client Reviews
        </p>
        <h2 className="testi-reveal font-display font-light text-4xl md:text-5xl max-w-xl">
          Trusted by <em className="text-gold-deep not-italic">architects & builders</em>.
        </h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden">
          <div ref={row1Ref} className="flex gap-6 w-max px-6 md:px-10">
            {[...first, ...first].map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={row2Ref} className="flex gap-6 w-max px-6 md:px-10">
            {[...second, ...second].map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="w-[320px] md:w-[400px] shrink-0 bg-cream p-8 border border-ink/10">
      <div className="flex gap-1 text-gold-deep mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="text-ink/75 leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
      <p className="font-display text-lg">{name}</p>
      <p className="text-xs tracking-wide text-ink/50 mt-0.5">{role}</p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7L12 2z" />
    </svg>
  );
}
