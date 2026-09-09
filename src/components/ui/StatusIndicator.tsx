import { cn } from "@/lib/utils";

export function StatusIndicator({
  state,
  label,
}: {
  state: "online" | "offline" | "pending" | "ok" | "unconfigured" | "error";
  label: string;
}) {
  const colour =
    state === "online" || state === "ok"
      ? "bg-rogue-ok"
      : state === "pending" || state === "unconfigured"
        ? "bg-amber-400"
        : "bg-rogue-danger";

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white">
      <span
        className={cn("pulse-dot h-2.5 w-2.5 rounded-full", colour)}
        data-state={state === "online" || state === "ok" ? "online" : "offline"}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
