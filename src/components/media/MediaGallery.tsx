"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { MediaItem, MediaKind } from "@/types";

const filters: Array<{ id: "all" | MediaKind; label: string }> = [
  { id: "all", label: "All" },
  { id: "screenshot", label: "Screenshots" },
  { id: "video", label: "Videos" },
  { id: "event", label: "Events" },
  { id: "community", label: "Community" },
  { id: "trailer", label: "Trailers" },
];

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = useMemo(
    () => items.filter((item) => filter === "all" || item.kind === filter),
    [filter, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Media filters">
        {filters.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={filter === item.id}
            className={`px-4 py-2 font-display text-sm uppercase tracking-[0.16em] ${
              filter === item.id
                ? "bg-rogue-blue text-rogue-void"
                : "border border-white/10 text-rogue-muted"
            }`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => {
          const inner = (
            <article className="panel overflow-hidden">
              <div className="relative h-56 bg-rogue-ink">
                <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" unoptimized={item.src.endsWith(".svg")} />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rogue-blue">
                  {item.kind}
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase text-white">{item.title}</h3>
              </div>
            </article>
          );
          return item.href ? (
            <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
              {inner}
            </a>
          ) : (
            <div key={item.id}>{inner}</div>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-rogue-muted">No media in this category yet.</p>
      ) : null}
    </div>
  );
}
