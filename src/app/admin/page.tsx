import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { requireAnyStaff } from "@/lib/auth/guards";
import { listUsers } from "@/lib/repositories/users";
import { listNews } from "@/lib/repositories/news";
import { listTeam } from "@/lib/repositories/team";
import { getApplications } from "@/lib/applications/client";
import { getPlayerCount } from "@/lib/fivem/status";
import { createMetadata } from "@/lib/metadata";
import { isPersistentStore } from "@/lib/repositories/store";

export const metadata = createMetadata({
  title: "Admin",
  description: "Rogue RP staff dashboard.",
  path: "/admin",
});

const cms = [
  {
    href: "/admin/news/new",
    title: "Post news",
    body: "Write an update and publish it to the News page.",
  },
  {
    href: "/admin/news",
    title: "Edit news",
    body: "Change, publish or take down existing articles.",
  },
  {
    href: "/admin/team",
    title: "Edit staff",
    body: "Update names, ranks, photos and bios on the Staff page.",
  },
  {
    href: "/admin/media",
    title: "Post media",
    body: "Add screenshots, videos and community photos.",
  },
  {
    href: "/admin/rules",
    title: "Edit rules",
    body: "Add or change rules shown to players.",
  },
  {
    href: "/admin/faq",
    title: "Edit FAQ",
    body: "Keep the frequently asked questions current.",
  },
  {
    href: "/admin/departments",
    title: "Edit departments",
    body: "Add, update or remove department pages, logos and leadership.",
  },
  {
    href: "/admin/settings",
    title: "Site settings",
    body: "Discord invite, player cap and maintenance message.",
  },
];

export default async function AdminHomePage() {
  const staff = await requireAnyStaff();
  const [users, news, team, applications, players] = await Promise.all([
    listUsers(),
    listNews({ includeUnpublished: true }),
    listTeam(),
    getApplications(),
    getPlayerCount(),
  ]);

  const pending = applications.items.filter(
    (item) => item.status === "submitted" || item.status === "under_review" || item.status === "interview",
  ).length;
  const approved = applications.items.filter((item) => item.status === "approved").length;

  const stats = [
    ["Registered Users", String(users.length)],
    ["Applications", applications.configured ? String(applications.items.length) : "Not connected"],
    ["Pending Applications", applications.configured ? String(pending) : "—"],
    ["Approved Applications", applications.configured ? String(approved) : "—"],
    [
      "Online Players",
      players.health === "online" ? `${players.players} / ${players.maxPlayers}` : players.health,
    ],
    ["News Articles", String(news.length)],
    ["Staff Members", String(team.length)],
  ];

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-rogue-blue">Staff</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-white">Website editor</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-rogue-muted">
        Welcome back, {staff.user.globalName || staff.user.username}. Post and edit public site
        content here.
        {isPersistentStore()
          ? " Changes save on this machine."
          : " This host has no attached database, so saves last for the current instance only."}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admin/news/new" prefetch={false}>
          Post news
        </Button>
        <Button href="/admin/team" variant="secondary" prefetch={false}>
          Edit staff
        </Button>
        <Button href="/admin/media" variant="secondary" prefetch={false}>
          Post media
        </Button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cms.map((item) => (
          <Link key={item.href} href={item.href} prefetch={false} className="panel block p-5 transition hover:border-rogue-blue/50">
            <h2 className="font-display text-xl uppercase text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-rogue-muted">{item.body}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">{label}</p>
            <p className="mt-3 font-display text-3xl uppercase text-white">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
