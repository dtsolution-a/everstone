"use client";

/**
 * Character-roll hover effect (inspired by Skiper UI's "Text Roll"
 * component) — rebuilt natively with Tailwind's group-hover + CSS
 * transitions instead of pulling in framer-motion + the shadcn CLI
 * scaffolding that component ships with. Zero extra dependencies, same
 * visual result, stays consistent with the rest of the site's GSAP-only
 * animation stack.
 */
export default function TextRoll({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`group relative inline-block overflow-hidden align-top ${className}`}
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
