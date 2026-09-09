import { publicEnv } from "@/lib/env";

export const brand = {
  name: "Rogue RP",
  shortName: "ROGUE RP",
  tagline: "SERIOUS ROLEPLAY. REALISTIC STORIES. YOUR CHOICE.",
  footerTagline: "Serious Roleplay. Realistic Stories. Your Choice.",
  description:
    "Rogue RP is a serious British FiveM roleplay community built around immersive, realistic and player-driven stories.",
  location: "United Kingdom",
  platform: "FiveM",
  roleplayStyle: "Serious RP",
  slots: 64,
  logo: "/logo.jpg",
  emailPlaceholder: "Not published. Use Discord for support.",
} as const;

export const navigation = {
  primary: [
    { href: "/", label: "Home" },
    { href: "/server", label: "Server" },
    { href: "/departments", label: "Departments" },
    { href: "/staff", label: "Staff" },
    { href: "/rules", label: "Rules" },
    { href: "/whitelist", label: "Whitelist" },
    { href: "/applications", label: "Applications" },
    { href: "/news", label: "News" },
    { href: "/media", label: "Media" },
  ],
  extra: [
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  mobile: [
    { href: "/", label: "Home" },
    { href: "/server", label: "Server" },
    { href: "/departments", label: "Departments" },
    { href: "/staff", label: "Staff" },
    { href: "/whitelist", label: "Whitelist" },
    { href: "/applications", label: "Applications" },
    { href: "/rules", label: "Rules" },
    { href: "/news", label: "News" },
    { href: "/media", label: "Media" },
    { href: "/discord", label: "Discord" },
  ],
  footer: {
    navigation: [
      { href: "/", label: "Home" },
      { href: "/server", label: "Server" },
      { href: "/rules", label: "Rules" },
      { href: "/whitelist", label: "Whitelist" },
      { href: "/applications", label: "Applications" },
      { href: "/news", label: "News" },
    ],
    community: [
      { href: "/discord", label: "Discord" },
      { href: "/staff", label: "Staff" },
      { href: "/media", label: "Media" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
} as const;

export const adminNavigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/whitelist", label: "Whitelist" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/team", label: "Staff" },
  { href: "/admin/departments", label: "Departments" },
  { href: "/admin/rules", label: "Rules" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/server", label: "Server" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/audit", label: "Audit Logs" },
] as const;

export type StaffRoleKey =
  | "owner"
  | "director"
  | "management"
  | "administrator"
  | "moderator"
  | "development";

export const staffRoleLabels: Record<StaffRoleKey, string> = {
  owner: "Owner",
  director: "Director",
  management: "Management",
  administrator: "Administrator",
  moderator: "Moderator",
  development: "Development",
};

export const adminPermissions = {
  full: ["owner", "director", "management", "administrator"] as StaffRoleKey[],
  applications: [
    "owner",
    "director",
    "management",
    "administrator",
    "moderator",
  ] as StaffRoleKey[],
  users: [
    "owner",
    "director",
    "management",
    "administrator",
    "moderator",
  ] as StaffRoleKey[],
  content: ["owner", "director", "management", "administrator"] as StaffRoleKey[],
  settings: ["owner", "director", "management"] as StaffRoleKey[],
  server: [
    "owner",
    "director",
    "management",
    "administrator",
    "development",
  ] as StaffRoleKey[],
};

export function getDiscordInvite(): string {
  return publicEnv.discordInvite;
}

export function hasDiscordInvite(): boolean {
  return Boolean(publicEnv.discordInvite);
}
