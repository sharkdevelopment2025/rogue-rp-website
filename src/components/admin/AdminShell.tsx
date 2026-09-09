import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { adminNavigation, brand } from "@/lib/config";
import { staffRoleName } from "@/lib/discord/roles";
import type { StaffRoleKey } from "@/lib/config";

export function AdminShell({
  children,
  roles,
  name,
}: {
  children: ReactNode;
  roles: StaffRoleKey[];
  name: string;
}) {
  return (
    <div className="min-h-screen bg-rogue-void">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 px-5 py-5">
            <Image src="/logo.jpg" alt="" width={36} height={36} className="rounded-full object-cover" />
            <div>
              <p className="font-display text-sm uppercase tracking-[0.18em] text-white">{brand.shortName}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rogue-blue">Staff</p>
            </div>
          </div>
          <nav className="grid px-3 pb-6" aria-label="Admin">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 font-display text-sm uppercase tracking-[0.14em] text-rogue-muted hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" className="mt-4 px-3 py-2 font-display text-sm uppercase tracking-[0.14em] text-rogue-blue">
              Back to site
            </Link>
          </nav>
        </aside>
        <div>
          <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-rogue-muted">
              Signed in as {name}
            </p>
            <div className="flex items-center gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-blue">
                {roles.map(staffRoleName).join(" · ")}
              </p>
              <Link
                href="/api/auth/logout"
                className="font-display text-sm uppercase tracking-[0.14em] text-rogue-muted hover:text-white"
              >
                Sign out
              </Link>
            </div>
          </header>
          <div className="px-6 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
