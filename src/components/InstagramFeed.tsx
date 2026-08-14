"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { contact } from "@/data/site";

// Real Instagram permalinks and the client's own campaign creative for
// each post. Instagram's official embed widget doesn't allow hiding its
// own chrome (follower count, likes, comment box) — there's no supported
// way to show just the photo — so instead of fighting that, each card
// here shows the actual creative directly and links out to the real post.
const POSTS = [
  { url: "https://www.instagram.com/p/DZ-h-7CsipI/", image: "/insta-1.jpg" },
  { url: "https://www.instagram.com/p/DbV2z92MB2v/", image: "/insta-2.jpg" },
  { url: "https://www.instagram.com/p/DbTjqqSDkVT/", image: "/insta-3.jpg" },
  { url: "https://www.instagram.com/p/Db8wdXpgHNQ/", image: "/insta-4.jpg" },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".insta-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Alternating cards drift at slightly different speeds while the
      // section scrolls past — a subtle parallax without touching layout.
      gsap.utils.toArray<HTMLElement>(".insta-card").forEach((card, i) => {
        gsap.to(card, {
          yPercent: i % 2 === 0 ? -8 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink py-28 md:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="insta-reveal eyebrow mb-4">Follow The Story</p>
          <h2 className="insta-reveal font-display font-light text-4xl md:text-5xl text-cream max-w-xl">
            As seen on <em className="text-gold-light not-italic">Instagram</em>.
          </h2>
        </div>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="insta-reveal inline-flex w-fit items-center gap-3 border border-gold-light/50 text-gold-light text-xs tracking-[0.2em] uppercase px-6 py-4 hover:bg-gold-light hover:text-ink transition-colors duration-300"
        >
          Follow Us
        </a>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {POSTS.map((post, i) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`insta-reveal insta-card group relative block aspect-[4/5] overflow-hidden ${
              i % 2 === 1 ? "lg:mt-10" : ""
            }`}
          >
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/60 border border-cream/30 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <InstaIcon />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-cream">
                View Post
                <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function InstaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
