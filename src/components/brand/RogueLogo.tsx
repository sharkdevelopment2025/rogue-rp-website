import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RogueLogo({
  size = 48,
  className,
  priority = false,
  href = "/",
}: {
  size?: number;
  className?: string;
  priority?: boolean;
  href?: string | null;
}) {
  const mark = (
    <Image
      src="/logo.jpg"
      alt="Rogue RP"
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "rounded-full border border-rogue-blue/40 object-cover shadow-[0_0_24px_rgba(0,163,255,0.35)]",
        className,
      )}
    />
  );

  if (!href) {
    return mark;
  }

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="Rogue RP home">
      {mark}
    </Link>
  );
}
