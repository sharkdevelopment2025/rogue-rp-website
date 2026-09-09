import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "ok" | "warn" | "danger" | "muted";
}) {
  const tones = {
    blue: "border-rogue-blue/30 text-rogue-blue",
    ok: "border-rogue-ok/30 text-rogue-ok",
    warn: "border-amber-400/30 text-amber-300",
    danger: "border-rogue-danger/30 text-rogue-danger",
    muted: "border-white/10 text-rogue-muted",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
