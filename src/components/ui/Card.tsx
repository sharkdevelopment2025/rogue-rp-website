import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <section className={cn("panel p-6 md:p-8", glow && "panel-glow", className)}>
      {children}
    </section>
  );
}
