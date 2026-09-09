import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function DashboardCard({
  title,
  children,
  href,
}: {
  title: string;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <Card className="h-full">
      <h2 className="font-display text-2xl uppercase text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-rogue-muted">{children}</div>
    </Card>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
