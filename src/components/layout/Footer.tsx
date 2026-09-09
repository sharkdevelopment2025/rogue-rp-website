import Link from "next/link";
import Image from "next/image";
import { brand, navigation } from "@/lib/config";

export function Footer({ discordHref }: { discordHref: string }) {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="" width={48} height={48} className="rounded-full object-cover" />
            <p className="font-display text-xl uppercase tracking-[0.18em] text-white">
              {brand.shortName}
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-rogue-muted">
            {brand.footerTagline}
          </p>
        </div>
        <FooterColumn title="Navigation" links={navigation.footer.navigation} />
        <FooterColumn
          title="Community"
          links={[...navigation.footer.community.filter((item) => item.href !== "/discord"), { href: discordHref, label: "Discord" }]}
        />
        <FooterColumn title="Legal" links={navigation.footer.legal} />
      </div>
      <div className="border-t border-white/10 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-rogue-muted">
        © {new Date().getFullYear()} Rogue RP
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h2 className="font-display text-sm uppercase tracking-[0.22em] text-white">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-rogue-muted hover:text-white"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
