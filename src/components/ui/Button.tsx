import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "discord" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary border border-cyan-300/20 font-display font-semibold tracking-[0.14em] uppercase",
  secondary:
    "border border-rogue-blue/35 bg-white/5 font-display font-semibold tracking-[0.14em] uppercase text-white hover:bg-white/10",
  ghost:
    "border border-transparent bg-transparent font-display tracking-[0.12em] uppercase text-rogue-chrome hover:text-white",
  discord:
    "border border-[#5865F2]/40 bg-[#5865F2] font-display font-semibold tracking-[0.12em] uppercase text-white hover:brightness-110",
  danger:
    "border border-rogue-danger/40 bg-rogue-danger/10 font-display tracking-[0.12em] uppercase text-rogue-danger hover:bg-rogue-danger/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  external = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
