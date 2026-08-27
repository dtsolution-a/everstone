"use client";

import { useState } from "react";
import { contact } from "@/data/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Enquiry from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className="grid sm:grid-cols-2 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref();
      }}
    >
      <Field
        label="Name"
        value={form.name}
        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
      />
      <Field
        label="Email"
        type="email"
        value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
      />
      <Field
        label="Phone"
        className="sm:col-span-2"
        value={form.phone}
        onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
      />
      <div className="sm:col-span-2">
        <label className="text-xs tracking-[0.2em] uppercase text-ink/50 mb-2 block">
          Message
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full bg-transparent border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-deep transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-ink text-cream text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-deep transition-colors duration-300"
        >
          Send Enquiry
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs tracking-[0.2em] uppercase text-ink/50 mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-ink/20 px-4 py-3 text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-deep transition-colors"
      />
    </div>
  );
}
