"use client";

import { useState } from "react";

export function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-display text-xl uppercase text-white">{question}</span>
        <span className="font-mono text-rogue-blue">{open ? "−" : "+"}</span>
      </button>
      {open ? <p className="pb-5 text-rogue-muted">{answer}</p> : null}
    </div>
  );
}
