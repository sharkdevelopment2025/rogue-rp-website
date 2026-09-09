import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  message = "Loading Rogue RP...",
  rows = 3,
}: {
  message?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-rogue-blue">{message}</p>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={cn("h-16 animate-pulse bg-white/5", index === 0 && "h-24")}
        />
      ))}
    </div>
  );
}
