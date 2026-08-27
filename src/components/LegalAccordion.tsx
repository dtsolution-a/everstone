"use client";

import { useState } from "react";

export type LegalSection = { title: string; content: string };

export default function LegalAccordion({ sections }: { sections: LegalSection[] }) {
  return (
    <div>
      {sections.map((s, i) => (
        <Item key={i} item={s} />
      ))}
    </div>
  );
}

function Item({ item }: { item: LegalSection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-ink/10 mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-ink/[0.03] transition-colors text-left gap-4"
      >
        <span className="font-display text-lg text-ink">{item.title}</span>
        <span
          className={`text-gold-deep shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-6 pb-5 text-ink/60 text-sm leading-relaxed border-t border-ink/10 pt-4">
          {item.content}
        </div>
      </div>
    </div>
  );
}
