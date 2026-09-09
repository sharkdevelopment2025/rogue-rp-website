import { normalizeStaffGroup, teamSeed } from "@/data/team";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { TeamMember } from "@/types";

const KEY = "team";

export function isSeededTeamMember(id: string): boolean {
  return teamSeed.some((member) => member.id === id);
}

export async function listTeam(): Promise<TeamMember[]> {
  const members = await storeGet<TeamMember[]>(KEY, teamSeed);
  const seen = new Set(members.map((member) => member.id));
  const merged = [
    ...members.map((member) => ({
      ...member,
      group: normalizeStaffGroup(String(member.group)),
    })),
    ...teamSeed.filter((member) => !seen.has(member.id)),
  ];

  return merged.sort((a, b) => a.order - b.order);
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const members = await listTeam();
  return members.find((member) => member.id === id) ?? null;
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  const members = await listTeam();
  const exists = members.some((item) => item.id === member.id);
  const next = exists
    ? members.map((item) => (item.id === member.id ? member : item))
    : [...members, member];
  await storeSet(KEY, next);
  return member;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (isSeededTeamMember(id)) {
    return false;
  }
  const members = await listTeam();
  const next = members.filter((member) => member.id !== id);
  if (next.length === members.length) {
    return false;
  }
  await storeSet(KEY, next);
  return true;
}
