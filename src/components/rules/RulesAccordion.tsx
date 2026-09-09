"use client";

import { useState } from "react";

export function RulesAccordion({
  categories,
}: {
  categories: Array<{
    id: string;
    title: string;
    summary: string;
    items: Array<{ id: string; title: string; body: string }>;
  }>;
}) {
  const [open, setOpen] = useState<string | null>(categories[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const expanded = open === category.id;
        return (
          <section key={category.id} className="panel overflow-hidden">
            <h2>
              <button
                className="flex w-full items-start justify-between gap-4 p-6 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : category.id)}
              >
                <span>
                  <span className="block font-display text-2xl uppercase text-white">
                    {category.title}
                  </span>
                  <span className="mt-2 block text-sm text-rogue-muted">{category.summary}</span>
                </span>
                <span className="font-mono text-rogue-blue">{expanded ? "−" : "+"}</span>
              </button>
            </h2>
            {expanded ? (
              <ol className="space-y-5 border-t border-white/10 px-6 py-6">
                {category.items.map((item, index) => (
                  <li key={item.id}>
                    <p className="font-display text-lg uppercase text-white">
                      {index + 1}. {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-rogue-muted">{item.body}</p>
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
