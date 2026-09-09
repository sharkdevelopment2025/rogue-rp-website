"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/config";
import { cn } from "@/lib/utils";
import { PlayerCount } from "@/components/server/PlayerCount";
import type { PublicUser } from "@/types";

export function Navbar({
  user,
  discordHref,
  isStaff = false,
}: {
  user: PublicUser | null;
  discordHref: string;
  isStaff?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openFor, setOpenFor] = useState(pathname);
  if (openFor !== pathname) {
    setOpenFor(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", open);
    return () => document.body.classList.remove("lock-scroll");
  }, [open]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-6">
      <div className="nav-blur mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-2 md:px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Rogue RP home">
          <Image
            src="/logo.jpg"
            alt=""
            width={42}
            height={42}
            className="rounded-full border border-rogue-blue/40 object-cover"
            priority
          />
          <span className="font-display text-lg uppercase tracking-[0.2em] text-white">
            Rogue RP
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navigation.primary.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2 py-2 font-display text-sm uppercase tracking-[0.12em] text-rogue-muted transition hover:text-white md:px-2.5",
                  active && "text-white after:mt-1 after:block after:h-px after:bg-rogue-blue",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PlayerCount />
          <Link
            href={discordHref}
            className="font-display text-sm uppercase tracking-[0.16em] text-rogue-blue hover:text-white"
            {...(discordHref.startsWith("http")
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            Discord
          </Link>
          {isStaff ? (
            <Link
              href="/admin"
              className="font-display text-sm uppercase tracking-[0.16em] text-white hover:text-rogue-blue"
            >
              Admin
            </Link>
          ) : null}
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : null}
              <span className="font-display text-sm uppercase tracking-[0.12em] text-white">
                {user.displayName}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn-primary px-4 py-2 font-display text-sm uppercase tracking-[0.16em]"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="font-display text-sm uppercase tracking-[0.2em] text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="nav-blur mt-2 max-h-[80vh] overflow-y-auto p-6 lg:hidden"
        >
          <nav className="grid gap-2" aria-label="Mobile">
            {navigation.mobile.map((item) => {
              const href = item.href === "/discord" ? discordHref : item.href;
              const external = href.startsWith("http");
              return (
                <Link
                  key={item.href}
                  href={href}
                  className="border-b border-white/10 py-3 font-display text-2xl uppercase text-white"
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  {item.label}
                </Link>
              );
            })}
            {isStaff ? (
              <Link href="/admin" className="py-3 font-display text-2xl uppercase text-white">
                Admin
              </Link>
            ) : null}
            <Link
              href={user ? "/dashboard" : "/login"}
              className="py-3 font-display text-2xl uppercase text-rogue-blue"
            >
              {user ? "Dashboard" : "Login"}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
