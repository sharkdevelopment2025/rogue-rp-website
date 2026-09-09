import type { StaffGroup, TeamMember } from "@/types";

export const staffGroups = [
  {
    name: "Owner",
    summary: "Community ownership and the final call on Rogue RP.",
  },
  {
    name: "Co Owner",
    summary: "Shares ownership of the community and supports the Owner.",
  },
  {
    name: "Senior Admin",
    summary: "Senior administration across staff, standards and operations.",
  },
  {
    name: "Admin",
    summary: "Day-to-day administration, tools and community records.",
  },
  {
    name: "Moderator",
    summary: "Reports, player conduct and out-of-character support.",
  },
] as const satisfies ReadonlyArray<{ name: StaffGroup; summary: string }>;

export const teamGroups = staffGroups.map((group) => group.name);

const staffGroupNames = new Set<string>(teamGroups);

const legacyStaffGroups: Record<string, StaffGroup> = {
  Owner: "Owner",
  "Co Owner": "Co Owner",
  "Co-Owner": "Co Owner",
  "Senior Admin": "Senior Admin",
  "Senior admin": "Senior Admin",
  Admin: "Admin",
  Moderator: "Moderator",
  Director: "Co Owner",
  Management: "Senior Admin",
  Administration: "Admin",
  Moderation: "Moderator",
  Development: "Admin",
  "Department Command": "Admin",
};

export function normalizeStaffGroup(value: string): StaffGroup {
  if (staffGroupNames.has(value)) {
    return value as StaffGroup;
  }
  return legacyStaffGroups[value] ?? "Admin";
}

export const teamSeed: TeamMember[] = [
  {
    id: "owner-brand",
    discordName: "Rogue メ Shark",
    role: "Owner",
    group: "Owner",
    avatar: "/staff/rogue-shark.jpg",
    description:
      "Owner of Rogue RP. Community direction, final call, and the person behind the city.",
    socials: [],
    order: 1,
  },
  {
    id: "owner-eggie",
    discordName: "Eggie",
    role: "Owner",
    group: "Owner",
    avatar: "/staff/eggie.jpg",
    description:
      "Owner of Rogue RP. Community direction, final call, and the person behind the city.",
    socials: [],
    order: 2,
  },
  {
    id: "co-owner-poseidon",
    discordName: "Poseidon",
    role: "Co Owner",
    group: "Co Owner",
    avatar: "/staff/poseidon.jpg",
    description:
      "Co Owner of Rogue RP. Supports community direction and the running of the city.",
    socials: [],
    order: 3,
  },
  {
    id: "senior-admin-laureen",
    discordName: "Laureen",
    role: "Senior Admin",
    group: "Senior Admin",
    avatar: "/staff/laureen.jpg",
    description:
      "Senior Admin of Rogue RP. Helps set staff standards and keep community operations running.",
    socials: [],
    order: 4,
  },
  {
    id: "admin-bob",
    discordName: "Bob",
    role: "Admin",
    group: "Admin",
    avatar: "/staff/bob.jpg",
    description:
      "Admin of Rogue RP. Handles day-to-day administration, tools and community records.",
    socials: [],
    order: 5,
  },
  {
    id: "admin-loulou",
    discordName: "LouLou",
    role: "Admin",
    group: "Admin",
    avatar: "/staff/loulou.jpg",
    description:
      "Admin of Rogue RP. Handles day-to-day administration, tools and community records.",
    socials: [],
    order: 6,
  },
  {
    id: "admin-mayhemgamez",
    discordName: "MayhemGamez",
    role: "Admin",
    group: "Admin",
    avatar: "/staff/mayhemgamez.jpg",
    description:
      "Admin of Rogue RP. Handles day-to-day administration, tools and community records.",
    socials: [],
    order: 7,
  },
  {
    id: "moderator-kieran",
    discordName: "Kieran",
    role: "Moderator",
    group: "Moderator",
    avatar: "/staff/kieran.jpg",
    description:
      "Moderator of Rogue RP. Handles reports, player conduct and out-of-character support.",
    socials: [],
    order: 8,
  },
];
