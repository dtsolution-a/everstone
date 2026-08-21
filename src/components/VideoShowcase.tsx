"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const CLIPS = [
  { src: "/hero-video-1.mp4", label: "The Showroom Experience" },
  { src: "/hero-video-2.mp4", label: "Inside The Facility" },
  { src: "/hero-video-3.mp4", label: "Finished Spaces" },
  { src: "/hero-video-4.mp4", label: "The Everstone Standard" },
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mb-16">
        <p className="video-reveal eyebrow mb-4">In Motion</p>
        <h2 className="video-reveal font-display font-light text-4xl md:text-5xl text-cream max-w-xl">
          Craft you can watch <em className="text-gold-light not-italic">move</em>.
        </h2>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid sm:grid-cols-2 gap-6 md:gap-8">
        {CLIPS.map((clip) => (
          <VideoCard key={clip.src} {...clip} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <div className="video-reveal group relative aspect-video overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        disablePictureInPicture
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/60 border border-cream/30 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {muted ? <MutedIcon /> : <SoundIcon />}
      </button>

      <p className="absolute bottom-4 left-4 text-cream text-sm tracking-wide">
        {label}
      </p>
    </div>
  );
}

function MutedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M23 9 17 15M17 9l6 6" strokeLinecap="round" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
    </svg>
  );
}
